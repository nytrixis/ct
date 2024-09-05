const Lab = require('../models/Lab');

// @desc    Add a new lab
// @route   POST /api/labs
// @access  Public
const addLab = async (req, res) => {
  try {
    const { labNo, floor, capacity } = req.body;

    const labExists = await Lab.findOne({ labNo });

    if (labExists) {
      return res.status(400).json({ message: 'Lab with this number already exists' });
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
      res.status(400).json({ message: 'Invalid lab data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addLab,
};