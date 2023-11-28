const Event = require("../models/Event");
const { asyncParse, UploadMultipleFiles } = require("./FileUpload");

const addEvent = async (req, res) => {
  try {
    let parseData = await asyncParse(req);
    let ImageInformation = parseData.files.image;
    let data = JSON.parse(parseData.fields.data);

    try {
      // Assuming you have data and file in the form data
      await UploadMultipleFiles(ImageInformation, 'events').then((response) => {
        data.imagePath = response;
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded: ${error}` });
    }

    // Create a new event object
    const newEvent = new Event({
      event_name: data.event_name,
      event_date: data.event_date,
      event_des: data.event_des,
      city: data.city,
      state: data.state,
      dest_name: data.dest_name,
      path: data.imagePath,
    });

    // Save the event to the database
    await newEvent.save();

    return res.status(201).json({
      success: true,
      data: newEvent,
      message: "Event added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error adding event: ${error}` });
  }
};

const getEvent = async (req, res) => {
  const dest_name = req.params.dest_name;
  try {
    // Fetch all events from the database
    if (dest_name) {
      const Events = await Event.find({ dest_name: req.params.dest_name });

      res.status(200).json({
        success: true,
        data: Events,
      });
    } else {
      const Events = await Event.find();

      res.status(200).json({
        success: true,
        data: Events,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error fetching Event" });
  }
};


const updateEvent = async (req, res) => {
  try {
    const data = req.body;

    // Find and update the event by ID
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          event_name: data.event_name,
          event_date: data.event_date,
          event_des: data.event_des,
          city: data.city,
          state: data.state,
          dest_name: data.dest_name,
          path: data.imagePath,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    // Check if the event name is being updated and if it conflicts with an existing event
    if (data.event_name && data.event_name !== updatedEvent.event_name) {
      const eventNameConflict = await Event.findOne({
        event_name: data.event_name,
        dest_name: data.dest_name,
      });

      if (eventNameConflict) {
        return res.status(202).json({ success: false, error: "Event name already exists" });
      }
    }

    return res.status(200).json({
      success: true,
      data: updatedEvent,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error updating event: ${error}` });
  }
};

const deleteEvent = async (req, res) => {
  try {
    // Extract event ID from the request parameters
    const eventId = req.params.id;

    // Find the event by ID
    const eventToDelete = await Event.findById(eventId);

    if (!eventToDelete) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    try {
      await deleteImageByUrl(eventToDelete.path[0], 'events');
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not deleted: ${error}` });
    }

    // Perform the delete operation
    await eventToDelete.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error deleting event: ${error}` });
  }
};

module.exports = { addEvent, getEvent,updateEvent, deleteEvent };
