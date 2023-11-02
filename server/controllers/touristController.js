const User = require('../models/touristModal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const OtpSchema = require('../models/touristOTPModal');
require('dotenv').config();

const getHello = async (req, res) => {
  res.json({
    message: 'User Already Exists. Please verify OTP',
  });
};

const touristRegister = async (req, res, next) => {
  try {
    const {
      tourist_name,
      tourist_email,
      tourist_password,
      tourist_country,
      tourist_state,
      tourist_age,
      tourist_gender,
      tourist_work,
    } = req.body;

    if (!(tourist_email && tourist_password && tourist_name && tourist_country && tourist_state && tourist_age && tourist_gender && tourist_work)) {
      return res.status(400).send('All input is required');
    }

    const oldUser = await User.findOne({ tourist_email: tourist_email });

    if (oldUser) {
      if (oldUser.verified) {
        return res.status(400).json({
          message: 'User Already Exists. Please Login',
        });
      } else {
        const otpResult = await sendOtp(req, res);
        return res.json({
          message: 'User Already Exists. Please verify OTP',
          userStatus: 'PENDING',
          otp: otpResult,
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(tourist_password, salt);

    const user = await User.create({
      tourist_name,
      tourist_email: tourist_email.toLowerCase(),
      tourist_password: encryptedPassword,
      tourist_age,
      tourist_country,
      tourist_gender,
      tourist_state,
      tourist_work,
    });

    const token = jwt.sign(
      { user_id: user._id, tourist_email },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    );

    user.token = token;
    const otpResult = await sendOtp(req, res);

    return res.status(201).json({
      user: user,
      otp: otpResult,
      userStatus: 'PENDING',
      message: 'You are registered successfully. Please verify OTP',
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtp = async (req, res) => {
  try {
    const { tourist_email } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const generatedOTP = generateOTP();
    const mailOptions = {
      from: process.env.EMAIL,
      to: tourist_email,
      subject: 'OTP Verification for Register',
      text: `
        Hello from Finding Pride in India!
        Thank you for choosing our app. To complete your registration and unlock all the amazing features, please enter the following OTP within the next 5 minutes:
        ${generatedOTP}
        This OTP is set to expire after 5 minutes, so be sure to use it promptly. We're excited to have you as part of our community and explore the pride of India together!
        Happy exploring,
        The Finding Pride in India Team`,
    };

    const oldUser = await OtpSchema.findOne({ tourist_email: tourist_email });

    if (oldUser) {
      await OtpSchema.deleteMany({ tourist_email: tourist_email });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedOtp = await bcrypt.hash(generatedOTP, salt);

    const otp = await OtpSchema.create({
      otp: encryptedOtp,
      tourist_email: tourist_email.toLowerCase(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 360000,
    });

    await transporter.sendMail(mailOptions);
    return 1;
  } catch (error) {
    return -1;
  }
};

const verifyOtp = async (req, res) => {
  const { otp, tourist_email } = req.body;

  try {
    const oldUser = await OtpSchema.findOne({ tourist_email: tourist_email });

    if (oldUser.expiresAt < Date.now()) {
      return res.status(400).json({
        success: 'Not verified',
        message: 'OTP verification time out',
      });
    }

    if (oldUser && (await bcrypt.compare(otp, oldUser.otp))) {
      await OtpSchema.deleteMany({ tourist_email: tourist_email });
      await User.updateOne({ tourist_email: tourist_email }, { verified: true });

      return res.status(200).json({
        success: 'Verified',
        message: 'OTP verified successfully',
      });
    } else {
      return res.status(400).json({
        success: 'Not verified',
        message: 'OTP code is incorrect',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'OTP verification failed',
    });
  }
};

const touristLogin = async (req, res, next) => {
  try {
    const { tourist_email, tourist_password } = req.body;

    if (!(tourist_email && tourist_password)) {
      return res.status(400).send('All input is required');
    }

    const user = await User.findOne({ tourist_email: tourist_email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify OTP' });
    }

    if (user && (await bcrypt.compare(tourist_password, user.tourist_password))) {
      const token = jwt.sign(
        { user_id: user._id, tourist_email },
        process.env.TOKEN_KEY
      );

      user.token = token;

      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'none',
        })
        .status(200)
        .json(user);
    } else {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const forgotpassword = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    const { tourist_email } = req.body;
    const user = await User.findOne({ tourist_email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: tourist_email,
      subject: 'Password Reset',
      html: `<p>
      Hello from Finding Pride in India!<br/>
      You recently requested to reset your password for your account with us. <br/>
      <b>To reset your password, please click on the link below within the next 5 minutes:</b><br/>
      <a href="${process.env.CLIENT_URI}/resetpassword/${resetToken}">Click here</a><br/>
      This link will expire after 5 minutes, so please act promptly. If you did not make this request, you can safely ignore this message.<br/>
    
      Thank you for using Finding Pride in India. We're here to help you explore and rediscover the pride of India.<br/>

      Best regards,<br/>
      The Finding Pride in India Team
      </p>`,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reset token' });
  }
};

const resetpassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const { password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.tourist_password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

module.exports = {
  touristRegister,
  sendOtp,
  verifyOtp,
  touristLogin,
  forgotpassword,
  resetpassword,
  getHello,
};
