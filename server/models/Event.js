const mongoose = require('mongoose');

const Event = new mongoose.Schema({
    
    event_name: { type: String ,require:true},
    event_date: { type: Date },
    event_des: {type: String},
    city:{ type: String },
    state: { type: String },
    dest_name: { type: String },
    path: { type: Array },
})

module.exports = mongoose.model("events", Event)


