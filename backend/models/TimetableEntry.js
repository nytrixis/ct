const mongoose = require('mongoose');

const timetableEntrySchema = mongoose.Schema({
  semester: { type: Number, required: true },
  classType: { type: String, required: true },
  batch: { type: String, required: true },
  subSection: { type: String, required: true },
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true }],
  room: { type: String, required: true }
}, {
  timestamps: true
});

const TimetableEntry = mongoose.model('TimetableEntry', timetableEntrySchema);

module.exports = TimetableEntry;
