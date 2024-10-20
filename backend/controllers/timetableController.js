const TimetableEntry = require('../models/TimetableEntry');

const isFacultyAvailable = async (faculty, day, timeSlot) => {
  const existingEntry = await TimetableEntry.findOne({
    faculty: { $in: faculty },
    day: day,
    timeSlot: timeSlot
  });

  if (existingEntry) {
    console.log('Faculty clash detected:', existingEntry);
  }

  return !existingEntry;
};

const isRoomOrLabAvailable = async (room, day, timeSlot) => {
  const existingEntry = await TimetableEntry.findOne({
    room: room,
    day: day,
    timeSlot: timeSlot
  });

  if (existingEntry) {
    console.log('Room or Lab clash detected:', existingEntry);
  }

  return !existingEntry;
};

const addTimetableEntry = async (req, res) => {
  try {
    const { semester, classType, batch, subSection, day, timeSlot, subject, faculty, room } = req.body;

    console.log('Request Body:', req.body);
    console.log('Checking availability for faculty:', faculty, 'on', day, 'at', timeSlot);

    const isFacultyAvail = await isFacultyAvailable(faculty, day, timeSlot);
    console.log('Faculty availability:', isFacultyAvail);

    if (!isFacultyAvail) {
      return res.status(409).json({ message: 'Faculty is not available at this time slot due to a scheduling conflict.' });
    }

    const isRoomAvail = await isRoomOrLabAvailable(room, day, timeSlot);
    console.log('Room/Lab availability:', isRoomAvail);

    if (!isRoomAvail) {
      return res.status(409).json({ message: 'Room or Lab is not available at this time slot due to a scheduling conflict.' });
    }

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
    console.error('Error adding timetable entry:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTimetableEntries = async (req, res) => {
  try {
    const { semester } = req.params;
    console.log('Fetching timetable entries for semester:', semester);

    const timetableEntries = await TimetableEntry.find({ semester: parseInt(semester) })
      .populate('subject', 'name code')
      .populate('faculty', 'name shortForm')
      .populate('room', 'name');

    console.log('Timetable Entries:', timetableEntries);
    res.json(timetableEntries);
  } catch (error) {
    console.error('Error fetching timetable entries:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addTimetableEntry,
  getTimetableEntries
};
