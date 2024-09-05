const Lab = require('../models/Lab');

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// @desc    Add a new room
// @route   POST /api/rooms
// @access  Public
const addLab = asyncHandler(async (req, res) => {
  const { labNo, floor, capacity } = req.body;

  const labExists = await Lab.findOne({ labNo });

  if (labExists) {
    res.status(400);
    throw new Error('Lab with this number already exists');
  }

  const lab = await Lab.create({
    labNo,
    floor,
    capacity,
  });

  if (lab) {
    res.status(201).json({
      _id: lab._id,
      labNo: lab.labNo,
      floor: lab.floor,
      capacity: lab.capacity,
    });
  } else {
    res.status(400);
    throw new Error('Invalid lab data');
  }
});

module.exports = {
  addLab,
};
