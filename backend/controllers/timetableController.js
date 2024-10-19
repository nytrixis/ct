const TimetableEntry = require('../models/TimetableEntry');

// @desc    Add a new timetable entry
// @route   POST /api/timetable
// @access  Public
const addTimetableEntry = async (req, res) => {
  try {
    const { semester, classType, batch, subSection, day, timeSlot, subject, faculty, room } = req.body;

    console.log('Request Body:', req.body); // Log the request body

    const timetableEntry = await TimetableEntry.create({
      semester,
      classType,
      batch,
      subSection,
      day,
      timeSlot,
      subject,
      faculty,
      room
    });

    if (timetableEntry) {
      res.status(201).json(timetableEntry);
    } else {
      res.status(400).json({ message: 'Invalid timetable entry data' });
    }
  } catch (error) {
    console.error('Error adding timetable entry:', error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get timetable entries for a specific semester
// @route   GET /api/timetable/:semester
// @access  Public
const getTimetableEntries = async (req, res) => {
  try {
    const { semester } = req.params;
    console.log('Fetching timetable entries for semester:', semester); // Log the semester

    const timetableEntries = await TimetableEntry.find({ semester: parseInt(semester) })
      .populate('subject', 'name code')
      .populate('faculty', 'name shortForm')
      .populate('room', 'name');

    console.log('Timetable Entries:', timetableEntries); // Log the fetched entries

    res.json(timetableEntries);
  } catch (error) {
    console.error('Error fetching timetable entries:', error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addTimetableEntry,
  getTimetableEntries
};
