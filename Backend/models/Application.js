const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
  name: String,
  email: String,
  phone: String,
  coverLetter: String,
  resumeUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
