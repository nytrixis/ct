const Teacher = require('../models/Teacher');

// Async handler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// @desc    Add a new teacher
// @route   POST /api/teachers
// @access  Public
const addTeacher = asyncHandler(async (req, res) => {
  const { name, shortForm } = req.body;

  const teacherExists = await Teacher.findOne({ shortForm });

  if (teacherExists) {
    res.status(400);
    throw new Error('Teacher with this short form already exists');
  }

  const teacher = await Teacher.create({
    name,
    shortForm,
  });

  if (teacher) {
    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      shortForm: teacher.shortForm,
    });
  } else {
    res.status(400);
    throw new Error('Invalid teacher data');
  }
});

module.exports = {
  addTeacher,
};
