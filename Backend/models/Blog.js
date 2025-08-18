const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  content: String,
  image: String,
  tags: [String],
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
