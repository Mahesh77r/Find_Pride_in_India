const CheckpointSchema = require("../models/Checkpoints");
const { asyncParse, UploadMultipleFiles,deleteFileByUrl } = require("./FileUpload")
const PlaceAdmin = require("../models/placeAdminModal");


const getCheckpoint = async (req, res) => {
  const dest_id = req.params.dest_id;

  try {

    if (dest_id) {
      const checkpointsData = await CheckpointSchema.find({ dest_name: dest_id })

      res.status(200).json({
        success: true,
        data: checkpointsData,
      });
    }
    // unfilter data
    else {
      const checkpointsData = await CheckpointSchema.find()

      res.status(200).json({
        success: true,
        data: checkpointsData,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error fetching  products ${error}` });
  }
};

const updateCheckpoint = async (req, res) => {
  try {
    const data = req.body;

    // Find and update the checkpoint by ID
    const updatedCheckpoint = await CheckpointSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          point_name: data.point_name,
          point_number: data.point_number,
          point_descp: data.point_descp,
          point_city: data.point_city,
          point_state: data.point_state,
          dest_name: data.dest_name,
          image_path: data.imagePath,
          audio_path: data.audioPath,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedCheckpoint) {
      return res.status(404).json({ success: false, error: "Checkpoint not found" });
    }

    // Check if the point name is being updated and if it conflicts with an existing checkpoint
    if (data.point_name && data.point_name !== updatedCheckpoint.point_name) {
      const pointNameConflict = await CheckpointSchema.findOne({
        point_name: data.point_name,
        dest_name: data.dest_name,
      });

      if (pointNameConflict) {
        return res.status(202).json({ success: false, error: "Checkpoint name already exists" });
      }
    }

    return res.status(200).json({
      success: true,
      data: updatedCheckpoint,
      message: "Checkpoint updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error updating checkpoint: ${error}` });
  }
};

const deleteCheckpoint = async (req, res) => {
  try {
    // Extract checkpoint ID from the request parameters
    const checkpointId = req.params.id;

    // Find the checkpoint by ID
    const checkpointToDelete = await CheckpointSchema.findById(checkpointId);

    if (!checkpointToDelete) {
      return res.status(404).json({ success: false, error: "Checkpoint not found" });
    }

    try {
      // Assuming you have a function to delete the image associated with the checkpoint
      await deleteFileByUrl(checkpointToDelete.image_path, 'checkpoints/images');

      // Assuming you have a function to delete the audio associated with the checkpoint
      await deleteFileByUrl(checkpointToDelete.audio_path, 'checkpoints/audios');
    } catch (error) {
      return res.status(400).json({ success: false, error: `Media files not deleted: ${error}` });
    }

    // Perform the delete operation
    await checkpointToDelete.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
      message: "Checkpoint deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error deleting checkpoint: ${error}` });
  }
};


const addCheckpoint = async (req, res) => {
  try {
    let parseData = await asyncParse(req)
    let ImageInformation = parseData.files.image
    let AudioInformation = parseData.files.audio
    let data = JSON.parse(parseData.fields.data)
    
    try {
      const existingPointOnThePlace = await CheckpointSchema.findOne({ $and: [{ point_name: data.point_name }, { dest_id: data.dest_id }] });
      const existingPointNumber = await CheckpointSchema.findOne({ $and: [{ point_number: data.point_number }, { dest_id: data.dest_id }] });

      if (existingPointNumber || existingPointOnThePlace) {
        return res.status(202).json({ success: false, error: `Checkpoint already exists` });
      }
      //   uploading Images
      await UploadMultipleFiles(ImageInformation, 'checkpoints/images').then((response) => { data.imagePath = response });

      //   uploading audio
      await UploadMultipleFiles(AudioInformation, 'checkpoints/audios').then((response) => { data.audioPath = response });

    } catch (error) {
      return res.status(400).json({ success: false, error: `Files are not uploaded: ${error}` });
    }

    // Create a new product object
    const newCheckpoint = new CheckpointSchema({
      point_name: data.point_name,
      point_number: data.point_number,
      point_descp: data.point_descp,
      point_city: data.point_city,
      point_state: data.point_state,
      dest_name: data.dest_name,
      dest_id: data.dest_id,

      image_path: data.imagePath,
      audio_path: data.audioPath,
    });

    // Save the product to the database
    await newCheckpoint.save();

    // Count the number of documents for the specific dest_id
    const numberOfCheckpoints = await CheckpointSchema.countDocuments({ dest_id: data.dest_id });

    // Update the number of checkpoints in PlaceAdmin
    try {
      await PlaceAdmin.updateOne({ _id: data.dest_id }, { $set: { numbercheckpoints: numberOfCheckpoints } });
    } catch (error) {
      return res.status(500).json({ success: false, error: `Error updating number of checkpoints ${error}` });
    }

    return res.status(200).json({
      success: true,
      data: newCheckpoint,
      message: "Checkpoint added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error Adding new Checkpoint ${error}` });
  }
};



module.exports = { addCheckpoint, getCheckpoint, updateCheckpoint, deleteCheckpoint };