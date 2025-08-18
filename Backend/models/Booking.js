const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  enquiryCount: { type: Number, default: 0 },
  people: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
