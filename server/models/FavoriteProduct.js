const mongoose = require('mongoose');

const favoriteProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products', // Assuming you have a Product model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tourists', // Assuming you have a User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FavoriteProduct = mongoose.model('favoriteproducts', favoriteProductSchema);

module.exports = FavoriteProduct;
