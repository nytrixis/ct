const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

router.post('/', async (req, res) => {
  try {
    const { name, shortForm } = req.body;
    const teacher = new Teacher({ name, shortForm });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
