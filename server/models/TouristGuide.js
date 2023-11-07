const mongoose = require('mongoose');

const TouristGuide = new mongoose.Schema({
    
    guide_name: { type: String ,require:true},
    guide_price: { type: Number },
    contact: {type: Number},
    city:{ type: String },
    state: { type: String },
    dest_name: { type: String },
    filename: { type: String },
    path: { type: String },
})

module.exports = mongoose.model("touristguides", TouristGuide)