const mongoose = require('mongoose');

const placeAdminSchema = new mongoose.Schema({
    // form data
    adminName: { type: String, default: null },
    email: { type: String},
    password: { type: String },
    role : {type : String, default : "placeadmin"},
    mobileNumber:{type:String},
    destinationName:{type:String },
    state:{type:String },
    city:{type:String },
    filename:{type:String},
    path :{type:String},

    // 
    verified :{type:Boolean , default:false},
    token: { type: String },
    resetToken: String,
    resetTokenExpiration: Date,
})

module.exports = mongoose.model("placeAdmin", placeAdminSchema)