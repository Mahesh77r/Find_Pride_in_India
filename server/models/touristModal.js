const mongoose = require('mongoose');

const touristSchema = new mongoose.Schema({
    // form data
    tourist_name: { type: String, default: null },
    tourist_email: { type: String, unique: true },
    tourist_password: { type: String },
    // 
    verified :{type:Boolean , default:false},
    token: { type: String },
    resetToken: String,
    resetTokenExpiration: Date,
})

module.exports = mongoose.model("tourist", touristSchema)