const User = require("../models/placeAdminModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Register function to register user
const placeAdminRegister = async (req, res) => {
  try {
    // Check if request body and file exist
    if (!req.body || !req.file) {
      return res.status(400).json({ success: false, message: "Missing request data" });
    }

    // Parse request data
    const proData = JSON.parse(req.body.data);
    const { adminName, email, password, mobileNumber, destinationName, state, city } = proData;

    // Validate user input
    if (!(adminName && email && password && mobileNumber && destinationName)) {
      return res.status(400).json({ success: false, message: "All input fields are required" });
    }

    // Check if user with the same email or destination name already exists
    const existingUser = await User.findOne({ $or: [{ email: email }, { destinationName: destinationName }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email or Destination Name already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      adminName: adminName,
      email: email.toLowerCase(), // Sanitize email to lowercase
      password: encryptedPassword,
      mobileNumber: mobileNumber,
      destinationName: destinationName,
      state: state,
      city: city,
      filename: req.file.filename,
      path: req.file.path,
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
  const { email, password } = req.body;

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


module.exports = { placeAdminRegister, placeAdminlogin, wlcom };
