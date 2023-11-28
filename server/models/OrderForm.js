const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    
    tourist_id: { type: String ,require:true},
    tourist_name: { type: String ,require:true},
    tourist_email: { type: String ,require:true},
    tourist_state:{ type: String ,require:true},
    tourist_city:{ type: String ,require:true},
    tourist_pincode:{ type: String ,require:true},
    tourist_address: { type: String ,require:true},
    tourist_phone_main: { type: String },
    tourist_phone_opt: { type: String },
    order_date:{type:Date , default: Date.now},
    product_name:{type: String ,require:true},
    product_quantity:{type: Number ,require:true},
    product_price:{type: Number ,require:true},
    product_dest_id: { type: String ,require:true},

    shipped_status:{type:Boolean , default:false}

})

module.exports = mongoose.model("orders", Order)


