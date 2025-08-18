const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postTitle: { type: String, required: true }, // comment about package/blog
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
