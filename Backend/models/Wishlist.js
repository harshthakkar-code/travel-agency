const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user: { type: String, required: true },
  packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
