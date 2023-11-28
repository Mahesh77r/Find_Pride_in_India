const ProductSchema = require("../models/Product");
const { asyncParse, UploadMultipleFiles } = require("./FileUpload");
const FavoriteProduct = require('../models/FavoriteProduct');

const getProducts = async (req, res) => {
  const dest_name = req.params.dest_name;

  try {
    // Fetch all products
    if (dest_name) {
      const products = await ProductSchema.find({ dest_name: dest_name });

      res.status(200).json({
        success: true,
        data: products,
      });
    } else {
      const products = await ProductSchema.find();

      res.status(200).json({
        success: true,
        data: products,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Error fetching products: ${error}` });
  }
};

const updateProduct = async (req, res) => {
  try {
    const data = req.body;

    // Find and update the product by ID
    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          product_name: data.product_name,
          product_price: data.product_price,
          product_descp: data.product_descp,
          quantity_available: data.quantity_available,
          category: data.category,
          state: data.state,
          city: data.city,
          admin_name: data.admin_name,
          path: data.imagePath,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Check if the product name is being updated and if it conflicts with an existing product
    if (data.product_name && data.product_name !== updatedProduct.product_name) {
      const productNameConflict = await ProductSchema.findOne({
        product_name: data.product_name,
        dest_name: data.dest_name,
      });

      if (productNameConflict) {
        return res.status(202).json({ success: false, error: "Product name already exists" });
      }
    }

    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error updating product: ${error}` });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Extract product ID from the request parameters
    const productId = req.params.id;

    // Find the product by ID
    const productToDelete = await ProductSchema.findById(productId);

    if (!productToDelete) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Perform the delete operation
    await productToDelete.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error deleting product: ${error}` });
  }
};

const addProduct = async (req, res) => {
  try {
    let parseData = await asyncParse(req);
    let ImageInformation = parseData.files.image;
    let data = JSON.parse(parseData.fields.data);

    // Check for null values
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === null) {
        return res.status(400).json({ success: false, error: `${key} cannot be null` });
      }
    }

    try {
      const existingProduct = await ProductSchema.findOne({
        $and: [{ product_name: data.product_name }, { dest_name: data.dest_name }],
      });

      if (existingProduct) {
        return res.status(202).json({ success: false, error: "Product already exists" });
      }

      // Upload Images
      await UploadMultipleFiles(ImageInformation, 'products').then((response) => {
        data.imagePath = response;
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: `Image not uploaded: ${error}` });
    }

    // Create a new product object
    const newProduct = new ProductSchema({
      dest_id: data.dest_id,
      dest_name: data.dest_name,
      product_name: data.product_name,
      product_price: data.product_price,
      product_descp: data.product_descp,
      quantity_available: data.quantity_available,
      category: data.category,
      state: data.state,
      city: data.city,
      admin_name: data.admin_name,
      path: data.imagePath,
    });

    // Save the product to the database
    await newProduct.save();

    return res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: `Error Adding Product ${error}` });
  }
};



// Controller to add a product to favorites
const addFavoriteProduct = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.user_id; // Assuming you have user authentication middleware

  try {
    // Check if the product is already in favorites
    const existingFavorite = await FavoriteProduct.findOne({ productId, userId });

    if (existingFavorite) {
      return res.status(400).json({ error: 'Product is already in favorites' });
    }

    // Add the product to favorites
    const newFavorite = new FavoriteProduct({ productId, userId });
    await newFavorite.save();

    res.status(201).json({ message: 'Product added to favorites successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all favorite products for a user
const getFavoriteProducts = async (req, res) => {
  const userId = req.user.user_id; // Assuming you have user authentication middleware
  console.log(userId)
  try {
    const favoriteProducts = await FavoriteProduct.find({ userId:userId })
      .populate('productId'); // Populate the 'productId' field with actual product details

    res.status(200).json({ favoriteProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { addFavoriteProduct,getFavoriteProducts,getProducts, updateProduct, deleteProduct, addProduct };
