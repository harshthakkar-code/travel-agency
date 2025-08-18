const ContactMessage = require('../models/ContactMessage');

exports.sendMessage = async (req, res) => {
  const msg = new ContactMessage(req.body);
  await msg.save();
  res.status(201).json({ msg: 'Message sent successfully' });
};
