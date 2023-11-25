const mongoose = require('mongoose');

const placeAdminSchema = new mongoose.Schema({
    // form data
    adminName: { type: String, default: null },
    email: { type: String},
    password: { type: String, default:"place123" },
    role : {type : String, default : "placeadmin"},
    summary:{type:String},
    numbercheckpoints:{type:Number,default:0},
    mobileNumber:{type:String},
    destinationName:{type:String },
    state:{type:String },
    city:{type:String },
    address:{type:String},
    path :{type:Array},

    // 
    verified :{type:Boolean , default:false},
    token: { type: String },
    resetToken: String,
    resetTokenExpiration: Date,
})

module.exports = mongoose.model("placeAdmin", placeAdminSchema)