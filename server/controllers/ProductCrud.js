const ProductSchema = require("../models/Product");
const { asyncParse,  UploadMultipleFiles} = require("./FileUpload")

const getProducts = async (req, res) => {
  const dest_name = req.params.dest_name;

  try {
    // Fetch all products from the 
    // for filter data
    if (dest_name) {
      const products = await ProductSchema.find({ destination_name: dest_name })

      res.status(200).json({
        success: true,
        data: products,
      });
    }
    // unfilter data
    else {
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

const updateProduct = async (req, res) => {
  try {

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
      category: data.category,
      state: data.state,
      city: data.city,
      admin_name: data.admin_name,
      filename: filename,
      path: path,
    });
    // 
    await ProductSchema.updateOne({ _id: req.params.id }, updatedData)
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
const deleteProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    // deleteData = await ProductSchema.deleteOne({_id:req.params.id})

    // res.status(200).json({
    //   success: true,
    //   data:deleteData
    // });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error deleting  products ${error}` });
  }
}

const addProductWithFirebase = async (req, res) => {
  try {
    let parseData = await asyncParse(req)
    let ImageInformation = parseData.files.image
    let data = JSON.parse(parseData.fields.data)
    try {
    const existingProduct = await ProductSchema.findOne({ $and: [{ product_name: data.product_name }, { dest_name: data.dest_name }] });

      if(existingProduct){
        return res.status(202).json({ success: false, error: `Product already exists` });

      }
      //   uploading Images
        await UploadMultipleFiles(ImageInformation,'products').then((response) => { data.imagePath = response })
      

    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded : ${error}` });
    }
    // Create a new product object
    const newProduct = new ProductSchema({
      product_name: data.product_name,
      product_price: data.product_price,
      product_descp: data.product_descp,
      quantity_available: data.quantity_available,
      category: data.category,
      state: data.state,
      city: data.city,
      dest_name: data.dest_name,
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


module.exports = { getProducts, updateProduct, deleteProduct, addProductWithFirebase };