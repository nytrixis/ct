const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortForm: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Faculty', facultySchema);
