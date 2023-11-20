const mongoose = require('mongoose');

const Checkpoint = new mongoose.Schema({
    
    point_name: { type: String ,require:true},
    point_number: { type: Number ,require:true},
    point_descp:{ type: String ,require:true},
    point_city:{ type: String },
    point_state: { type: String },
    dest_name: { type: String },
    dest_id: { type: String },

    image_path: { type: Array },
    audio_path: { type: Array },
})

module.exports = mongoose.model("checkpoints", Checkpoint)


