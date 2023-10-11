const User = require("../models/placeAdminModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//  Register function to register user
const placeAdminRegister = async (req, res) => {
  const formData = JSON.parse(req.body.data);

  const { adminName, email, password, mobileNumber,destinationName} = formData;
  const { name, path } = req.file;

  // Validate user input
  if (!( adminName && email && password && mobileNumber && destinationName)) {
    return res.status(400).send("All input is required");
  }
  // find old user exit or not if not exit then create new user
  const oldUser = await User.findOne({ email: email });
  const placeName = await User.findOne({ destinationName: destinationName });
  if (oldUser) {
    res.status(400).json({
      success: false,
      message: "Email Already Exist",
    });
  }
  else if (placeName) {
    res.status(400).json({
      success: false,
      message: "Place Name Already Exist",
    });
  }

  try {
    // bcrypt the password and creating user
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      adminName: adminName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      mobileNumber:mobileNumber,
      destinationName:destinationName,
      filename,
      path

    });
    await newUser.save();

    return res
      .status(201)
      .json({ data: newUser, message: "Registration successfull" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Registration failed" });
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
  }
   else {
    return res.status(202).json({
      success: false,
      message: "login failed",
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

module.exports = { placeAdminRegister, placeAdminlogin, wlcom}