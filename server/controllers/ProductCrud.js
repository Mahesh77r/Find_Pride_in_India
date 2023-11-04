const Product = require("../models/Product");


const addProduct = async (req, res) => {
    try {
      // Ensure the incoming data is correctly formatted JSON
      let data;
      try {
        data = JSON.parse(req.body.data);
      } catch (error) {
        return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
      }
  
      const { filename, path } = req.file;
  
      // Create a new product object
      const newProduct = new Product({
        product_name: data.product_name,
        product_price: data.product_price,
        product_descp: data.product_descp,
        quantity_available: data.quantity_available,
        category:data.category,
        state:data.state,
        city:data.city,
        admin_name:data.admin_name,
        filename: filename,
        path: path,
      });
  
      // Save the product to the database
      await newProduct.save();
  
      return res.status(201).json({
        success: true,
        data: newProduct,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Error uploading file" });
    }
  };   
  
  const getProducts = async (req, res) => {
    console.log(req.params.admin_name);
    try {
      // Fetch all products from the database
      const products = await Product.find({admin_name:req.params.admin_name});
  
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Error fetching products" });
    }
  };
  
  module.exports = { addProduct,getProducts };