const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  message: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
