const ArtistSchema = require("../models/Artist");
const { asyncParse,  UploadMultipleFiles} = require("./FileUpload")

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

    let data;
    try {
      data = JSON.parse(req.body.data);
    } catch (error) {
      return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
    }
    //  
    //  
    const updatedData = new ArtistSchema({
      dest_id: data.dest_id,
      artist_name: data.artist_name,
      artist_contact: data.artist_contact,
      artist_address : data.artist_address ,
      state: data.state,
      city: data.city,
      admin_name: data.admin_name,
      path: path,
    });
    // 
    await ArtistSchema.updateOne({ _id: req.params.id }, updatedData)
    res.status(200).json({
      success: true,
      data: updatedData,
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error Updating Product ${error}` });
  }
}
const deleteArtist = async (req, res) => {
  try {
    console.log(req.params.id);
    // deleteData = await ArtistSchema.deleteOne({_id:req.params.id})

    // res.status(200).json({
    //   success: true,
    //   data:deleteData
    // });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error deleting  artists ${error}` });
  }
}

const addArtist = async (req, res) => {
  try {
    let parseData = await asyncParse(req)
    let ImageInformation = parseData.files.image
    let data = JSON.parse(parseData.fields.data)
    try {
    const existingArtist = await ArtistSchema.findOne({ $and: [{ product_name: data.product_name }, { dest_name: data.dest_name }] });

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

    return res.status(201).json({
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