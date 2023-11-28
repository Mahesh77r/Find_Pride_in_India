const mongoose = require('mongoose');

const favoritePlaceSchema = new mongoose.Schema({
    placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'placeAdmins', // Assuming you have a Product model
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

const FavoriteProduct = mongoose.model('favoriteplaces', favoritePlaceSchema);

module.exports = FavoriteProduct;
