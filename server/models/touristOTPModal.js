const mongoose = require('mongoose')

const userOtp = new mongoose.Schema({
    tourist_email: { type: String },
    otp : {type:String},
    createdAt : Date,
    expiresAt : Date,
})
module.exports = mongoose.model("userOtp", userOtp);