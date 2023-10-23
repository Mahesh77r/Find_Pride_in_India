const User = require("../models/touristModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const OtpSchema = require("../models/touristOTPModal");
require("dotenv").config();

const getHello = async (req, res) => {
  res.json({
    message: "User Already Exist. Please verify otp",
  });
}

//  Register function 
const touristRegister = async (req, res, next) => {
  // Get user input
  const { tourist_name, tourist_email, tourist_password, tourist_country, tourist_state, tourist_age, tourist_gender, tourist_work } = req.body;

  // Validate user input
  if (!(tourist_email && tourist_password && tourist_name && tourist_country && tourist_state && tourist_age && tourist_gender && tourist_work)) {
    return res.status(400).send("All input is required");
  }

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ tourist_email: tourist_email });
  // console.log(oldUser)
  if (oldUser) {
    //otp verifiaction is done then user only need to login
    if (oldUser.verified) {
      res.status(400).json({
        message: "User Already Exist. Please Login",
      });
      return;
    }
    //otp verifiaction is not done then user only need to verify and then login
    else {
      res.json({
        message: "User Already Exist. Please verify otp",
        userStatus: "PENDING",
      });
      // return;
    }
  }
  //Encrypt user password
  try {
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(tourist_password, salt);

    // Create user in our database
    const user = await User.create({
      tourist_name,
      tourist_email: tourist_email.toLowerCase(), // sanitize: convert email to lowercase
      tourist_password: encryptedPassword,
      tourist_age,
      tourist_country,
      tourist_gender,
      tourist_state,
      tourist_work
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, tourist_email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    const otpResult = await sendOtp(req, res);
    // return new user
    return res
      .status(201)
      .json({
        user: user,
        otp: otpResult,
        userStatus: "PENDING",
        message: "you are register successfull , please verify Otp",
      });
  } catch (err) {
    return res.status(400).json({ message: "duplicate key" });
  }
};

//   Login function 

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// to send otp on email
const sendOtp = async (req, res) => {
  try {
    const { tourist_email } = req.body; // take value from user
    //   console.log(email);
    // mail configuration
    const transporter = nodemailer.createTransport({
      // Replace with your email provider settings
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Replace with your email address
        pass: process.env.PASSWORD, // Replace with your email password or use an app-specific password
      },
    });
    const generatedOTP = generateOTP(); //calling generated function
    const mailOptions = {
      from: process.env.EMAIL, // Replace with your email address
      to: tourist_email,
      subject: "OTP Verification for Register",
      text: `
        Hello from Finding Pride in India!

        Thank you for choosing our app. To complete your registration and unlock all the amazing features, please enter the following OTP within the next 5 minutes:
        
        ${generatedOTP}
        
        This OTP is set to expire after 5 minutes, so be sure to use it promptly. We're excited to have you as part of our community and explore the pride of India together!
        
        Happy exploring,
        The Finding Pride in India Team`,
    };
    // if old otp is there then remove it
    const oldUser = await OtpSchema.findOne({ tourist_email: tourist_email });
    console.log(oldUser);
    if (oldUser) {
      await OtpSchema.deleteMany({ tourist_email: tourist_email });
    }

    //Encrypt user password
    const salt = await bcrypt.genSalt(10);
    encryptedOtp = await bcrypt.hash(generatedOTP, salt);

    // Create user in our database
    const otp = await OtpSchema.create({
      otp: encryptedOtp,
      tourist_email: tourist_email.toLowerCase(), // sanitize: convert email to lowercase
      createdAt: Date.now(),
      expiresAt: Date.now() + 360000, /// valide for 6 hour
    });
    await transporter.sendMail(mailOptions);
    return 1;
  } catch (error) {
    console.error("Error sending email:", error);
    return -1; //error in processing

    // return res.status(400).json({
    //   success:false,
    //   message:"otp send sucessfull"
    // })
  }
};


// verify otp
const verifyOtp = async (req, res) => {
  const { otp, tourist_email } = req.body;
  try {
    const oldUser = await OtpSchema.findOne({ tourist_email: tourist_email });
    // check expire date is less than date.now if less that is otp is expire ask to user resend it
    if (oldUser.expiresAt < Date.now()) {
      res.status(400).json({
        success: "Not verified",
        message: "otp verification time out",
      });
    }
    if (oldUser && (await bcrypt.compare(otp, oldUser.otp))) {
      await OtpSchema.deleteMany({ tourist_email: tourist_email });
      await User.updateOne({ tourist_email: tourist_email }, { verified: true }); //update verified status true

      res.status(200).json({
        success: "verified",
        message: "otp verified sucessfull",
      });
    } else {
      res.status(400).json({
        success: "Not verified",
        message: "otp code is incorrect",
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(400).json({
      success: false,
      message: "otp verification failed",
    });
  }
};
// login
const touristLogin = async (req, res, next) => {
  // res.send("login Route");
  try {
    // Get user input
    const { tourist_email, tourist_password } = req.body;

    // Validate user input
    if (!(tourist_email && tourist_password)) {
      res.status(400).send("All input is required");
      return;
    }
    // Validate if user exist in our database
    const user = await User.findOne({ tourist_email: tourist_email });
    // check user is verified or not if verified then processed login functionality
    if (user.verified) {
      if (user && (await bcrypt.compare(tourist_password, user.tourist_password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, tourist_email },
          process.env.TOKEN_KEY

        );

        // save user token
        user.token = token;
        return res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "none", // Add this line to allow cross-site cookies (if needed)
          })
          .status(200)
          .json(user);
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    }
    // if not verify ask user to verify otp
    else {
      return res.status(400).json({ message: "please verify otp" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// forgot password

const forgotpassword = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL, // Replace with your email address
      pass: process.env.PASSWORD, // Replace with your email password or use an app-specific password
    },
  });
  try {
    const { tourist_email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ tourist_email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set the reset token and expiration time in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

    // Save the updated user document
    await user.save();

    // Send the reset token to the user's email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: tourist_email,
      subject: "Password Reset",
      html: `<p>
      Hello from Finding Pride in India!<br/>
      You recently requested to reset your password for your account with us. <br/>
      <b>To reset your password, please click on the link below within the next 5 minutes:</b><br/>
      <a href="https://find-pride-in-india-mqtp.vercel.app/resetpassword/${resetToken}">Click here</a><br/>
      This link will expire after 5 minutes, so please act promptly. If you did not make this request, you can safely ignore this message.<br/>
    
     Thank you for using Finding Pride in India. We're here to help you explore and rediscover the pride of India.<br/>

     Best regards,<br/>
     The Finding Pride in India Team
      </p>`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending reset token:", error);
    res.status(500).json({ error: "Failed to send reset token" });
  }
};


const resetpassword = async (req, res, next) => {
  console.log("resent");
  try {
    const token = req.params.token; // take url value
    const { password } = req.body;
    // console.log(token)
    // Find the user with the provided reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and reset token fields
    user.tourist_password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    // Save the updated user document
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
};
module.exports = {
  touristRegister,
  sendOtp,
  verifyOtp,
  touristLogin,
  forgotpassword,
  resetpassword,
  getHello
};