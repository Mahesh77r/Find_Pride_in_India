const Order = require('../models/OrderForm');
const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: order.tourist_email,
      subject: 'Order Confirmation',
      text: `
        Hello ${order.tourist_name},
        
        Thank you for your order with Finding Pride in India!
        Order Details:
        Product Name: ${order.product_name}
        Quantity: ${order.product_quantity}
        Total Price: ${order.product_price * order.product_quantity}
        
        Your order has been confirmed. We will process it shortly.
        
        If you have any questions or concerns, please contact our support team.
        
        Happy exploring,
        The Finding Pride in India Team`,
    };

    await transporter.sendMail(mailOptions);
    return 1;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

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
      tourist_id:data.tourist_id,
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
      product_dest_id : data.product_dest_id
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Send order confirmation email
    const emailStatus = await sendOrderConfirmationEmail(savedOrder);

    if (emailStatus === -1) {
      return res.status(500).json({ success: false, error: "Error sending order confirmation email" });
    }

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

// getOrder controller
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error fetching orders: ${error}` });
  }
};

// getOrderByTourist controller
const getOrderByTourist = async (req, res) => {
  try {
    const tourist_id = req.params.tourist_id;

    if (!tourist_id) {
      return res.status(400).json({ success: false, error: 'Missing tourist_id parameter' });
    }

    const orders = await Order.find({ tourist_id: tourist_id });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error fetching orders: ${error}` });
  }
};

// getOrderByDest controller
const getOrderByDest = async (req, res) => {
  try {
    const dest_id = req.params.dest_id;

    if (!dest_id) {
      return res.status(400).json({ success: false, error: 'Missing dest_id parameter' });
    }

    const orders = await Order.find({ product_dest_id: dest_id });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error fetching orders: ${error}` });
  }
};

const updateShippedStatus = async (req, res) => {
  try {
    const orderId = req.params.order_id;

    if (!orderId) {
      return res.status(400).json({ success: false, error: 'Missing order_id parameter' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { shipped_status: true },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Extract relevant data from the request
    const { tourist_email, delivery_date } = req.body;

    // Call sendShippedConfirmation
    await sendShippedConfirmation(tourist_email, delivery_date);

    res.status(200).json({
      success: true,
      // data: updatedOrder,
      message: 'Shipped status updated and confirmation email sent successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error updating shipped status: ${error}` });
  }
};

// sendShippedConfirmation controller
const sendShippedConfirmation = async (tourist_email, delivery_date) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: tourist_email,
      subject: 'Order Shipped Confirmation',
      text: `
        Hello from Finding Pride in India!
        We're excited to let you know that your order has been shipped and is on its way to you.
        It is scheduled to be delivered on ${delivery_date}.
        Thank you for choosing our services. We hope you enjoy your products!
        Happy exploring,
        The Finding Pride in India Team`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Shipped confirmation email sent successfully');
  } catch (error) {
    console.error(`Error sending shipped confirmation email: ${error}`);
  }
};

module.exports = { updateShippedStatus };


// deleteOrderAndNotify controller
const deleteOrderAndNotify = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const { cancellation_reason } = req.body;

    if (!orderId || !cancellation_reason) {
      return res.status(400).json({ success: false, error: 'Missing required parameters' });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: deletedOrder.tourist_email,
      subject: 'Order Cancellation Notification',
      text: `
        Hello from Finding Pride in India!
        We regret to inform you that your order has been canceled due to the following reason:
        ${cancellation_reason}
        If you have any concerns or need further assistance, please contact our support team.
        We apologize for any inconvenience caused.
        Happy exploring,
        The Finding Pride in India Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Order deleted and cancellation email sent successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: `Error deleting order and sending cancellation email: ${error}`,
    });
  }
};



module.exports = { createOrderForm, getOrder, getOrderByTourist, getOrderByDest,updateShippedStatus, sendShippedConfirmation , deleteOrderAndNotify};
