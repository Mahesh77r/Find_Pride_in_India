const ProductSchema = require("../models/Product");

// const addProduct = async (req, res) => {
//     try {
//       // Ensure the incoming data is correctly formatted JSON
//       let data;
//       try {
//         data = JSON.parse(req.body.data);
//       } catch (error) {
//         return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
//       }
  
//       const { filename, path } = req.file;
  
//       // Create a new product object
//       const newProduct = new ProductSchema({
//         product_name: data.product_name,
//         product_price: data.product_price,
//         product_descp: data.product_descp,
//         quantity_available: data.quantity_available,
//         category:data.category,
//         state:data.state,
//         city:data.city,
//         admin_name:data.admin_name,
//         filename: filename,
//         path: path,
//       });
  
//       // Save the product to the database
//       await newProduct.save();
  
//       return res.status(201).json({
//         success: true,
//         data: newProduct,
//         message: "File uploaded successfully",
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, error: `Error Adding Product ${error}` });
//     }
//   };   
  
  const getProducts = async (req, res) => {
    const admin_name=req.params.admin_name;
    
    try {
      // Fetch all products from the 
      // for filter data
      if(admin_name){
        const products = await ProductSchema.find({destination_name:req.params.dest_name})

        res.status(200).json({
          success: true,
          data: products,
        });
      }
      // unfilter data
      else{
        const products = await ProductSchema.find()

        res.status(200).json({
          success: true,
          data: products,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: `Error fetching  products ${error}` });
    }
  };
  
  const updateProduct = async(req,res) => {
    try{

       let data;
       try {
         data = JSON.parse(req.body.data);
       } catch (error) {
         return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
       }
      //  
      const { filename, path } = req.file;
      //  
      const updatedData = new ProductSchema({
        id: data.id,
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
      // 
      await ProductSchema.updateOne({_id:req.params.id},updatedData)
      res.status(200).json({
        success: true,
        data: updatedData,
      });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: `Error Updating Product ${error}` });
    }
  }
  const deleteProduct = async(req,res) =>{
    try{
      console.log(req.params.id);
      // deleteData = await ProductSchema.deleteOne({_id:req.params.id})

      // res.status(200).json({
      //   success: true,
      //   data:deleteData
      // });
    }
    catch(error){
      console.error(error);
      res.status(500).json({ success: false, error: `Error deleting  products ${error}` });
    }
  }

  const addProductWithFirebase = async(req, res) => {
    try {
      // console.log(req.body)
      // Ensure the incoming data is correctly formatted JSON
      let data;
      try {
        data = req.body;
        console.log(data)
      } catch (error) {
        return res.status(400).json({ success: false, error: `Invalid JSON data ${error}` });
      }
  
  
      // Create a new product object
      const newProduct = new ProductSchema({
        product_name: data.product_name,
        product_price: data.product_price,
        product_descp: data.product_descp,
        quantity_available: data.quantity_available,
        category:data.category,
        state:data.state,
        city:data.city,
        destination_name:data.destination_name,
        path: data.imagePath,
      });
  
      // Save the product to the database
      await newProduct.save();
  
      return res.status(201).json({
        success: true,
        data: newProduct,
        message: "Product added successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: `Error Adding Product ${error}` });
    }

  };




  module.exports = { getProducts, updateProduct ,deleteProduct,addProductWithFirebase};