const Faculty = require('../models/Faculty');

// Async handler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// @desc    Add a new teacher
// @route   POST /api/teachers
// @access  Public
const addFaculty = asyncHandler(async (req, res) => {
  const { name, shortForm } = req.body;

  const facultyExists = await Faculty.findOne({ shortForm });

  if (facultyExists) {
    res.status(400);
    throw new Error('Faculty with this short form already exists');
  }

  const faculty = await Faculty.create({
    name,
    shortForm,
  });

  if (faculty) {
    res.status(201).json({
      _id: faculty._id,
      name: faculty.name,
      shortForm: faculty.shortForm,
    });
  } else {
    res.status(400);
    throw new Error('Invalid faculty data');
  }
});

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
const getFaculties = asyncHandler(async (req, res) => {
  const faculties = await Faculty.find({});
  res.json(faculties);
});

module.exports = {
  addFaculty,
  getFaculties,
};
