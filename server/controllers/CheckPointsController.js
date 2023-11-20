const CheckpointSchema = require("../models/Checkpoints");
const { asyncParse, UploadMultipleFiles } = require("./FileUpload")
const PlaceAdmin = require("../models/placeAdminModal");


const getCheckpoint = async (req, res) => {
  const dest_id = req.params.dest_id;

  try {

    if (dest_id) {
      const checkpointsData = await CheckpointSchema.find({ dest_id: dest_id })

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

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error Updating Product ${error}` });
  }
}
const deleteCheckpoint = async (req, res) => {
  try {
    console.log(req.params.id);
    // deleteData = await ProductSchema.deleteOne({_id:req.params.id})

    // res.status(200).json({
    //   success: true,
    //   data:deleteData
    // });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error deleting  products ${error}` });
  }
}

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

    return res.status(201).json({
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