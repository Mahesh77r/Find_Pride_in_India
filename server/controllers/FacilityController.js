const FacilitySchema = require("../models/Facility");
const { asyncParse, uploadSingleFile} = require("./FileUpload")

const addFacility = async (req, res) => {
  try {
    let parseData = await asyncParse(req)
    let ImageInformation = parseData.files.image
    let data = JSON.parse(parseData.fields.data)
      try {
        
      // Assuming you have data and file in the form data
      await uploadSingleFile(ImageInformation,'facilities').then((response) => { data.imagePath = response })
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