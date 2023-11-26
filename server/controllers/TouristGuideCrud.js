const GuideSchema = require("../models/TouristGuide");
const { asyncParse, uploadSingleFile} = require("./FileUpload")

const addTouristGuide = async (req, res) => {
    try {
        let parseData = await asyncParse(req)
        let ImageInformation = parseData.files.image
        let data = JSON.parse(parseData.fields.data)
          try {
            
          // Assuming you have data and file in the form data
          await uploadSingleFile(ImageInformation,'events').then((response) => { data.imagePath = response })
          } catch (error) {
            return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
          }
      // Create a new product object
      const newGuide = new GuideSchema({
        guide_name: data.guide_name,
        guide_price: data.guide_price,
        contact: data.contact,
        city:data.city,
        state: data.state,
        dest_name: data.dest_name,
        path: data.imagePath,
      });
  
      // Save the product to the database
      await newGuide.save();
  
      return res.status(201).json({
        success: true,
        data: newGuide,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: ` error uploading file ${error}` });
    }
  };
   
  
  const getTouristGuide = async (req, res) => {
    const dest_name = req.params.dest_name

    try {
      // Fetch all products from the database
      if(dest_name){

        const Guide = await GuideSchema.find({dest_name:req.params.dest_name});
    
        res.status(200).json({
          success: true,
          data: Guide,
        });
      }
      else{
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
  
  module.exports = {addTouristGuide, getTouristGuide };