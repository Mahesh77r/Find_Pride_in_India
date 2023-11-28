const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    dest_id:{ type: String ,require:true},
    product_name: { type: String ,require:true},
    product_price: { type: Number },
    product_descp: { type: String },
    quantity_available: { type: Number },
    city:{ type: String ,require:true},
    state: { type: String ,require:true},
    dest_name: { type: String ,require:true},
    category:{ type: String ,require:true},
    path: { type: Array },
})

module.exports = mongoose.model("products", ProductSchema)