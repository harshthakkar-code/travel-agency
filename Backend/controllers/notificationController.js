const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const notes = await Notification.find({ user: req.user._id });
  res.json(notes);
};

exports.markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: 'Marked as read' });
};
