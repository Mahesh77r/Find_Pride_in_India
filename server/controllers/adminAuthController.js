const User = require("../models/placeAdminModal");
const CheckpointSchema = require("../models/Checkpoints");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Register function to register user
const placeAdminRegister = async (req, res) => {
  try {
    let parseData = await asyncParse(req)
    let ImageInformation = parseData.files.image
    let data = JSON.parse(parseData.fields.data)
    if (!parseData) {
      return res.status(400).json({ success: false, message: "Missing request data" });
    }
    try {
      const existingProduct = await ProductSchema.findOne({ $and: [{ product_name: data.product_name }, { dest_name: data.dest_name }] });

      if (existingProduct) {
        return res.status(202).json({ success: false, error: `Product already exists` });

      }
      //   uploading Images
      await UploadMultipleFiles(ImageInformation, 'doms').then((response) => { data.imagePath = response })


    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
    }

    const { adminName, email, mobileNumber, destinationName, state, city, summary, imagePath } = data;

    // Validate user input
    if (!(adminName && email && mobileNumber && destinationName)) {
      return res.status(400).json({ success: false, message: "All input fields are required" });
    }

    // Check if user with the same email or destination name already exists
    const existingUser = await User.findOne({ $or: [{ email: email }, { destinationName: destinationName }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email or Destination Name already exists" });
    }

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // const encryptedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      adminName: adminName,
      email: email.toLowerCase(), // Sanitize email to lowercase
      mobileNumber: mobileNumber,
      destinationName: destinationName,
      state: state,
      city: city,
      summary: summary,
      path: imagePath,
    });

    // Save the new user
    await newUser.save();

    return res.status(201).json({ success: true, data: newUser, message: "Registration successful" });
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
      'numbercheckpoints'
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


module.exports = { placeAdminRegister, placeAdminlogin, wlcom, getPlaces };
