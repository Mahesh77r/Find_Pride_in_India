const Event = require("../models/Event");
const { asyncParse,  UploadMultipleFiles,uploadSingleFile} = require("./FileUpload")


const addEvent = async (req, res) => {
    try {
    let parseData = await asyncParse(req)
    let ImageInformation = parseData.files.image
    let data = JSON.parse(parseData.fields.data)
      try {
        
      // Assuming you have data and file in the form data
      await UploadMultipleFiles(ImageInformation,'events').then((response) => { data.imagePath = response })
      } catch (error) {
        return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
      }
  
      // Create a new product object
      const newEvent = new Event({
        event_name: data.event_name,
        event_date: data.event_date,
        event_des: data.event_des,
        city: data.city,
        state: data.state,
        dest_name: data.dest_name,
        path: data.imagePath,
      });
  
      // Save the product to the database
      await newEvent.save();
  
      return res.status(201).json({
        success: true,
        data: newEvent,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: ` error uploading file ${error}` });
    }
  };
   
  
  const getEvent = async (req, res) => {
    const dest_name = req.params.dest_name;
    try {
      // Fetch all products from the database
      if(dest_name){
        const Events = await Event.find({dest_name:req.params.dest_name});
        
        res.status(200).json({
          success: true,
          data: Events,
        });
      }
      else{
        const Events = await Event.find();
        
        res.status(200).json({
          success: true,
          data: Events,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Error fetching Guide" });
    }
  };
  
  module.exports = {addEvent, getEvent };