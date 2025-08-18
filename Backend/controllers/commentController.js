const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, user: req.user._id });
    res.status(201).json(await comment.save());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'name email');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
