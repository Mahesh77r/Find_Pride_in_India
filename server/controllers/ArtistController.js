const ArtistSchema = require("../models/Artist");
const { asyncParse,  UploadMultipleFiles, deleteImageByUrl} = require("./FileUpload")

const getArtist = async (req, res) => {
    const dest_name = req.params.dest_name;

  try {
    // for filter data
    if (dest_name) {
      const artists = await ArtistSchema.find({ dest_name: dest_name })

      res.status(200).json({
        success: true,
        data: artists,
      });
    }
    // unfilter data
    else {
      const artists = await ArtistSchema.find()

      res.status(200).json({
        success: true,
        data: artists,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error fetching  artists ${error}` });
  }
};

const updateArtist = async (req, res) => {
  try {
    // Parse the incoming data
    let parseData = await asyncParse(req);
    let ImageInformation = parseData.files.image;
    let data = JSON.parse(parseData.fields.data);

    // Find the artist to be updated by ID
    const existingArtist = await ArtistSchema.findById(req.params.id);
    if (!existingArtist) {
      return res.status(404).json({ success: false, error: "Artist not found" });
    }

    // Check if the artist name is being updated and if it conflicts with an existing artist
    if (data.artist_name && data.artist_name !== existingArtist.artist_name) {
      const artistNameConflict = await ArtistSchema.findOne({
        $and: [{ artist_name: data.artist_name }, { dest_name: data.dest_name }],
      });

      if (artistNameConflict) {
        return res.status(202).json({ success: false, error: "Artist name already exists" });
      }
    }

    // Handle image upload
    try {
      await UploadMultipleFiles(ImageInformation, 'artists').then((response) => {
        data.imagePath = response;
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded: ${error}` });
    }

    // Update the artist data
    existingArtist.artist_name = data.artist_name || existingArtist.artist_name;
    existingArtist.artist_contact = data.artist_contact || existingArtist.artist_contact;
    existingArtist.artist_address = data.artist_address || existingArtist.artist_address;
    existingArtist.state = data.state || existingArtist.state;
    existingArtist.city = data.city || existingArtist.city;
    existingArtist.admin_name = data.admin_name || existingArtist.admin_name;
    existingArtist.path = data.imagePath || existingArtist.path;

    // Save the updated artist to the database
    await existingArtist.save();

    return res.status(200).json({
      success: true,
      data: existingArtist,
      message: "Artist updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error updating artist: ${error}` });
  }
};

const deleteArtist = async (req, res) => {
  try {
    // Extract artist ID from the request parameters
    const artistId = req.params.id;

    // Find the artist by ID
    const artistToDelete = await ArtistSchema.findById(artistId);
    
    if (!artistToDelete) {
      return res.status(404).json({ success: false, error: "Artist not found" });
    }

    try {
        await deleteImageByUrl(artistToDelete.path[0],'artists');
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not deleted : ${error}` });
    }
    // Perform the delete operation
    await artistToDelete.deleteOne();


    return res.status(200).json({
      success: true,
      data: {},
      message: "Artist deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error deleting artist: ${error}` });
  }
};

module.exports = { deleteArtist };


const addArtist = async (req, res) => {
  try {
    console.log("first")
    let parseData = await asyncParse(req)
    console.log("first")
    let ImageInformation = parseData.files.image
    let data = JSON.parse(parseData.fields.data)
    try {
    const existingArtist = await ArtistSchema.findOne({ $and: [{ artist_name: data.artist_name}, { dest_name: data.dest_name }] });

      if(existingArtist){
        return res.status(202).json({ success: false, error: `Artist already exists` });

      }
      //   uploading Images
        await UploadMultipleFiles(ImageInformation,'artists').then((response) => { data.imagePath = response })
      

    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
    }
    // Create a new product object
    const newArtist = new ArtistSchema({
        dest_id: data.dest_id,
        dest_name:data.dest_name,
        artist_name: data.artist_name,
        artist_contact: data.artist_contact,
        artist_address : data.artist_address ,
        state: data.state,
        city: data.city,
        admin_name: data.admin_name,
        path: data.imagePath,
    });

    // Save the product to the database
    await newArtist.save();

    return res.status(200).json({
      success: true,
      data: newArtist,
      message: "Artist added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error Adding Artist ${error}` });
  }

};

module.exports = { addArtist, getArtist,updateArtist,deleteArtist};