const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: String,
  type: String, // Full time, part time
  vacancies: Number,
  salary: String,
  description: String,
  requirements: [String]
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
