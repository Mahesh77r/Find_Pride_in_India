const User = require("../models/placeAdminModal");
const CheckpointSchema = require("../models/Checkpoints");
const { asyncParse,  UploadMultipleFiles} = require("./FileUpload")
const FavoritePlace = require("../models/FavoritePlace");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Register function to register user
const placeAdminRegister = async (req, res) => {
  try {
    let parseData = await asyncParse(req);
    let ImageInformation = parseData.files.image;
    let data = parseData.fields;
    if (!parseData) {
      return res.status(400).json({ success: false, message: "Missing request data" });
    }

    const { adminName, email, mobileNumber, destinationName, state, city, summary, address } = data;

    // Validate user input
    if (!(adminName && email && mobileNumber && destinationName)) {
      return res.status(400).json({ success: false, message: "All input fields are required" });
    }

    try {
      // Check if user with the same email or destination name already exists
      const existingUser = await User.findOne({ $or: [{ email: email }, { destinationName: destinationName }] });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email or Destination Name already exists" });
      }

      //   uploading Images
      await UploadMultipleFiles(ImageInformation, 'doms').then((response) => { data.imagePath = response });

    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
    }

    // Hash the password
    let password = "admin1234";
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      adminName: adminName[0],
      email: email[0], // Sanitize email to lowercase
      password: encryptedPassword,
      mobileNumber: mobileNumber[0],
      destinationName: destinationName[0],
      state: state[0],
      city: city[0],
      summary: summary[0],
      address: address[0],
      path: data.imagePath,
    });

    // Save the new user
    await newUser.save();

    return res.status(200).json({ success: true, data: newUser, message: "Registration successful" });
  } catch (error) {
    console.error("Error in placeAdminRegister:", error);
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
};


//login functonality to login user
const placeAdminlogin = async (req, res, next) => {
  // take a value from user end
  const { email, password, role } = req.body;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
    return;
  }

  const userExist = await User.findOne({ email: email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    // generate jwt token
    const token = jwt.sign(
      {
        user_id: userExist._id,
        email,
      },
      process.env.TOKEN_KEY
    );

    // save user token
    userExist.token = token;

    // save user token in data base but there is no need to save it
    await userExist.save();

    return res.status(200).json({
      user: userExist,
      success: true,
      message: "login Successfull",
    });
  } else {
    return res.status(202).json({
      success: false,
      message: "Login failed",
    });
  }
};

const wlcom = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.user_id);
    res.json(data);
    // console.log(res.json(product))
  } catch (error) {
    res.json({ message: error });
  }
  // res.send(req.user);
  return;
};

const getPlaces = async (req, res) => {
  const id = req.params.id
  try {
    
    // Specify the fields you want to fetch
    const selectedFields = [
      'adminName',
      'email',
      'mobileNumber',
      'destinationName',
      'state',
      'city',
      'path',
      'summary',
      'numbercheckpoints',
      'address'
    ];

    // Use the select method to fetch only the specified fields
    if (id) {
      // Count the number of documents for the specific dest_id
    const numberOfCheckpoints = await CheckpointSchema.countDocuments({ dest_id: id });
    console.log(numberOfCheckpoints)

    // Update the number of checkpoints in PlaceAdmin
    try {
      await User.updateOne({ _id: id }, { $set: { numbercheckpoints: numberOfCheckpoints } });
    } catch (error) {
      return res.status(500).json({ success: false, error: `Error updating number of checkpoints ${error}` });
    }


      const Places = await User.findById(id).select(selectedFields);
      res.status(200).json({
        success: true,
        data: Places,
      });
    }
    else {
      const Places = await User.find().select(selectedFields);
      res.status(200).json({
        success: true,
        data: Places,
      });
    }


  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error: ${error}`,
    });
  }
};

// Controller to add a product to favorites
const addFavoritePlace = async (req, res) => {
  const { placeId } = req.body;
  const userId = req.user.user_id; // Assuming you have user authentication middleware

  try {
    // Check if the product is already in favorites
    const existingFavorite = await FavoritePlace.findOne({ placeId, userId });

    if (existingFavorite) {
      return res.status(400).json({ error: 'Place is already in favorites' });
    }

    // Add the product to favorites
    const newFavorite = new FavoritePlace({ placeId, userId });
    await newFavorite.save();

    res.status(200).json({ message: 'Place added to favorites successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getFavoritePlaces = async (req, res) => {
  const userId = req.user.user_id; // Assuming you have user authentication middleware

  try {
    // Find all favorite places for the user
    const favoritePlaces = await FavoritePlace.find({ userId })
      .populate({
        path: 'placeId',
        select: 'adminName email path numbercheckpoints destinationName summary state city address',  // Add the fields you want to select
      });

    res.status(200).json(favoritePlaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const removeFavoritePlace = async (req, res) => {
  const { placeId } = req.body;
  const userId = req.user.user_id; // Assuming you have user authentication middleware

  try {
    // Check if the place is in favorites
    const existingFavorite = await FavoritePlace.findOneAndDelete({ placeId, userId });

    if (!existingFavorite) {
      return res.status(404).json({ error: 'Place not found in favorites' });
    }

    res.status(200).json({ message: 'Place removed from favorites successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { getFavoritePlaces, removeFavoritePlace ,addFavoritePlace,placeAdminRegister, placeAdminlogin, wlcom, getPlaces };
