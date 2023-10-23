const mongoose = require('mongoose');

const placeAdminSchema = new mongoose.Schema({
    // form data
    adminName: { type: String, default: null },
    email: { type: String},
    password: { type: String },
    role : {type : String, default : "placeadmin"},
    mobileNumber:{type:String},
    destinationName:{type:String },
    // location:{
    //     type: {
    //       type: String, // Don't do `{ location: { type: String } }`
    //       enum: ['Point'], // 'location.type' must be 'Point'
    //       required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    //   },
    //   image data
    filename:{type:String},
    path :{type:String},

    // 
    verified :{type:Boolean , default:false},
    token: { type: String },
    resetToken: String,
    resetTokenExpiration: Date,
})

module.exports = mongoose.model("placeAdmin", placeAdminSchema)