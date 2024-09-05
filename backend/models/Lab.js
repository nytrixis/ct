const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  labNo: {
    type: String,
    required: [true, 'Please add a lab number'],
    unique: true,
  },
  floor: {
    type: String,
    required: [true, 'Please add a floor'],
  },
  capacity: {
    type: Number,
    required: [true, 'Please add a capacity'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Lab', labSchema);
