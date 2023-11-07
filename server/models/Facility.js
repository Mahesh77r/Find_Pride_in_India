const mongoose = require('mongoose');

const Facility = new mongoose.Schema({
    
    facility_name: { type: String ,require:true},
    facility_number: { type: Number },
    facility_location: { type: String },
    city:{ type: String },
    state: { type: String },
    dest_name: { type: String },
    filename: { type: String },
    path: { type: String },
})

module.exports = mongoose.model("facilities", Facility)