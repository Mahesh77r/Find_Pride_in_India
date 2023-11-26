const mongoose = require('mongoose');

const Artist = new mongoose.Schema({
    
    artist_name: { type: String ,require:true},
    artist_contact :{type: String ,require:true},
    artist_address :{type: String ,require:true},
    city:{ type: String },
    state: { type: String },
    dest_name: { type: String },
    path: { type: Array },
    dest_id:{ type: String }
})

module.exports = mongoose.model("artists", Artist)


