const FacilitySchema = require("../models/Facility");
const { asyncParse, uploadSingleFile } = require("./FileUpload");

const addFacility = async (req, res) => {
  try {
    let parseData = await asyncParse(req);
    let ImageInformation = parseData.files.image;
    let data = JSON.parse(parseData.fields.data);

    try {
      // Assuming you have data and file in the form data
      await uploadSingleFile(ImageInformation, 'facilities').then((response) => {
        data.imagePath = response;
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
    }

    // Create a new facility
    const newFacility = new FacilitySchema({
      facility_name: data.facility_name,
      facility_number: data.facility_number,
      facility_location: data.facility_location,
      city: data.city,
      state: data.state,
      dest_name: data.dest_name,
      path: data.imagePath,
    });

    // Save the facility to the database
    await newFacility.save();

    return res.status(201).json({
      success: true,
      data: newFacility,
      message: "Facility added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error creating facility: ${error}` });
  }
};

const getFacility = async (req, res) => {
  const dest_name = req.params.dest_name;

  try {
    // Fetch all facilities from the database
    if (dest_name) {
      const facilities = await FacilitySchema.find({ dest_name: req.params.dest_name });

      res.status(200).json({
        success: true,
        data: facilities,
      });
    } else {
      const facilities = await FacilitySchema.find();

      res.status(200).json({
        success: true,
        data: facilities,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error fetching facilities: ${error}` });
  }
};

const updateFacility = async (req, res) => {
  try {
    const data = req.body;

    // Find and update the facility by ID
    const updatedFacility = await FacilitySchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          facility_name: data.facility_name,
          facility_number: data.facility_number,
          facility_location: data.facility_location,
          city: data.city,
          state: data.state,
          dest_name: data.dest_name,
          path: data.imagePath,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedFacility) {
      return res.status(404).json({ success: false, error: "Facility not found" });
    }

    // Check if the facility name is being updated and if it conflicts with an existing facility
    if (data.facility_name && data.facility_name !== updatedFacility.facility_name) {
      const facilityNameConflict = await FacilitySchema.findOne({
        facility_name: data.facility_name,
        dest_name: data.dest_name,
      });

      if (facilityNameConflict) {
        return res.status(202).json({ success: false, error: "Facility name already exists" });
      }
    }

    return res.status(200).json({
      success: true,
      data: updatedFacility,
      message: "Facility updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error updating facility: ${error}` });
  }
};

const deleteFacility = async (req, res) => {
  try {
    // Extract facility ID from the request parameters
    const facilityId = req.params.id;

    // Find the facility by ID
    const facilityToDelete = await FacilitySchema.findById(facilityId);

    if (!facilityToDelete) {
      return res.status(404).json({ success: false, error: "Facility not found" });
    }

    try {
      await deleteImageByUrl(facilityToDelete.path[0], 'facilities');
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not deleted: ${error}` });
    }

    // Perform the delete operation
    await facilityToDelete.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
      message: "Facility deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error deleting facility: ${error}` });
  }
};

module.exports = { addFacility, getFacility, updateFacility, deleteFacility };
