const Event = require("../models/Event");

const addEvent = async (req, res) => {
    try {
      // Ensure the incoming data is correctly formatted JSON
      let data;
      try {
        data = JSON.parse(req.body.data);
      } catch (error) {
        return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
      }
  
      const { filename, path } = req.file;
  
      // Create a new product object
      const newEvent = new Event({
        event_name: data.event_name,
        event_date: data.event_date,
        event_des: data.event_des,
        city: data.city,
        state: data.state,
        dest_name: data.dest_name,
        filename: filename,
        path: path,
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