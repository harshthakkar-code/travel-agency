const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
