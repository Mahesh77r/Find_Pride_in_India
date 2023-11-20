const FacilitySchema = require("../models/Facility");

const addFacility = async (req, res) => {
    try {
      // Ensure the incoming data is correctly formatted JSON
      let data;
      try {
        data = req.body;
      } catch (error) {
        return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
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
        message: "Facility uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: ` error creating facility ${error}` });
    }
  };
   
  
const getFacility = async (req, res) => {
     const dest_name = req.params.dest_name
        
    
    try {
      // Fetch all facility from the database
      if(dest_name){

        const Facility = await FacilitySchema.find({dest_name:req.params.dest_name});
    
        res.status(200).json({
          success: true,
          data: Facility,
        });
      }
      else{
        const Facility = await FacilitySchema.find();
    
        res.status(200).json({
          success: true,
          data: Facility,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: ` error fetching file ${error}` });
    }
  };
  
  module.exports = {addFacility, getFacility };