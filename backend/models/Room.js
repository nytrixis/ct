const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: [true, 'Please add a room number'],
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

module.exports = mongoose.model('Room', roomSchema);
