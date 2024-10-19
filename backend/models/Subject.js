const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a subject name'],
  },
  code: {
    type: String,
    required: [true, 'Please add a subject code'],
    unique: true,
  },
  semester: {
    type: Number,
    required: [true, 'Please specify the semester'],
    min: 1,
    max: 8,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subject', subjectSchema);
