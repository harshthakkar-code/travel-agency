const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  datesAndPrices: String,
  groupSize: Number,
  tripDuration: String,
  category: String,
  adultPrice: Number,
  childPrice: Number,
  couplePrice: Number,
  salePrice: Number,
  regularPrice: Number,
  discount: Number,
  gallery: [String], // Array of image URLs
  location: String,
  mapUrl: String,
  destination: String,
  status: { type: String, enum: ['Active', 'Pending', 'Expired'], default: 'Pending' },
  isPopular: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
