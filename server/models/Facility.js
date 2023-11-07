const mongoose = require('mongoose');

const Facility = new mongoose.Schema({
    
    facility_name: { type: String ,require:true},
    facility_number: { type: String },
    facility_location: { type: String },
    city:{ type: String },
    state: { type: String },
    dest_name: { type: String },
    path: { type: String },
})

module.exports = mongoose.model("facilities", Facility)