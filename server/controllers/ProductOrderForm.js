const Order = require('../models/OrderForm');

const createOrderForm = async (req, res) => {
  try {
    // Ensure the incoming data is correctly formatted JSON
    let data;
    try {
      data = req.body;
      // Additional validation can be added here based on your requirements
      if (!data.tourist_name || !data.tourist_email || !data.product_name || !data.product_quantity || !data.product_price || !data.tourist_phone_main || !data.tourist_address) {
        return res.status(400).json({ success: false, error: "Incomplete data. Please provide all required fields." });
      }
    } catch (error) {
      return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
    }

    // Create a new order object
    const newOrder = new Order({
      tourist_name: data.tourist_name,
      tourist_email: data.tourist_email,
      tourist_state: data.tourist_state,
      tourist_city: data.tourist_city,
      tourist_pincode: data.tourist_pincode,
      tourist_address: data.tourist_address,
      tourist_phone_main: data.tourist_phone_main,
      tourist_phone_opt: data.tourist_phone_opt,
      order_date: data.order_date,
      product_name: data.product_name,
      product_quantity: data.product_quantity,
      product_price: data.product_price,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    return res.status(200).json({
      success: true,
      data: savedOrder,
      message: "Order form submitted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error submitting order form ${error.message}` });
  }
};

module.exports = { createOrderForm };
