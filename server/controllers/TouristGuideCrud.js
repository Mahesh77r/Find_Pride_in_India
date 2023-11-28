const GuideSchema = require("../models/TouristGuide");
const { asyncParse, uploadSingleFile } = require("./FileUpload");

const addTouristGuide = async (req, res) => {
  try {
    let parseData = await asyncParse(req);
    let ImageInformation = parseData.files.image;
    let data = JSON.parse(parseData.fields.data);

    try {
      // Assuming you have data and file in the form data
      await uploadSingleFile(ImageInformation, 'events').then((response) => {
        data.imagePath = response;
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded: ${error}` });
    }

    // Create a new guide object
    const newGuide = new GuideSchema({
      guide_name: data.guide_name,
      guide_price: data.guide_price,
      contact: data.contact,
      city: data.city,
      state: data.state,
      dest_name: data.dest_name,
      path: data.imagePath,
    });

    // Save the guide to the database
    await newGuide.save();

    return res.status(201).json({
      success: true,
      data: newGuide,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error uploading file: ${error}` });
  }
};

const getTouristGuide = async (req, res) => {
  const dest_name = req.params.dest_name;

  try {
    // Fetch all guides from the database
    if (dest_name) {
      const Guide = await GuideSchema.find({ dest_name: req.params.dest_name });

      res.status(200).json({
        success: true,
        data: Guide,
      });
    } else {
      const Guide = await GuideSchema.find();

      res.status(200).json({
        success: true,
        data: Guide,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error fetching Guide" });
  }
};

const updateGuide = async (req, res) => {
  try {
    const data = req.body;

    // Find and update the guide by ID
    const updatedGuide = await GuideSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          guide_name: data.guide_name,
          guide_price: data.guide_price,
          contact: data.contact,
          city: data.city,
          state: data.state,
          dest_name: data.dest_name,
          path: data.imagePath,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedGuide) {
      return res.status(404).json({ success: false, error: "Guide not found" });
    }

    // Check if the guide name is being updated and if it conflicts with an existing guide
    if (data.guide_name && data.guide_name !== updatedGuide.guide_name) {
      const guideNameConflict = await GuideSchema.findOne({
        guide_name: data.guide_name,
        dest_name: data.dest_name,
      });

      if (guideNameConflict) {
        return res.status(202).json({ success: false, error: "Guide name already exists" });
      }
    }

    return res.status(200).json({
      success: true,
      data: updatedGuide,
      message: "Guide updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error updating guide: ${error}` });
  }
};

const deleteGuide = async (req, res) => {
  try {
    // Extract guide ID from the request parameters
    const guideId = req.params.id;

    // Find the guide by ID
    const guideToDelete = await GuideSchema.findById(guideId);

    if (!guideToDelete) {
      return res.status(404).json({ success: false, error: "Guide not found" });
    }

    // Perform the delete operation
    await guideToDelete.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
      message: "Guide deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error deleting guide: ${error}` });
  }
};

module.exports = { addTouristGuide, getTouristGuide, updateGuide, deleteGuide };
