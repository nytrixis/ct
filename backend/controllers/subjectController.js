const Subject = require('../models/Subject');

// @desc    Add a new subject
// @route   POST /api/subjects
// @access  Public
const addSubject = async (req, res) => {
  try {
    const { name, code, semester } = req.body;

    const subjectExists = await Subject.findOne({ code });

    if (subjectExists) {
      return res.status(400).json({ message: 'Subject with this code already exists' });
    }

    const subject = await Subject.create({
      name,
      code,
      semester,
    });

    if (subject) {
      res.status(201).json({
        _id: subject._id,
        name: subject.name,
        code: subject.code,
        semester: subject.semester,
      });
    } else {
      res.status(400).json({ message: 'Invalid subject data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get subjects for a specific semester
// @route   GET /api/subjects/:semester
// @access  Public
const getSubjects = async (req, res) => {
  try {
    const { semester } = req.params;
    const subjects = await Subject.find({ semester: parseInt(semester) });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addSubject,
  getSubjects,
};
