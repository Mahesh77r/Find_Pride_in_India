const mongoose = require('mongoose');

const addProduct = new mongoose.Schema({
    
    product_name: { type: String ,require:true},
    product_price: { type: Number },
    product_descp: { type: String },
    quantity_available: { type: Number },
    filename: { type: String },
    path: { type: String },
})

module.exports = mongoose.model("products", addProduct)