const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    // form data
    admin_name: { type: String, default: null },
    email: { type: String},
    password: { type: String, default:"admin123" },
    role : {type : String, default : "ministry"},
    path :{type:Array},

    // 
    verified :{type:Boolean , default:false},
    token: { type: String },
    resetToken: String,
    resetTokenExpiration: Date,
})

module.exports = mongoose.model("admins", AdminSchema)