const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// POST route to add a new teacher
router.post('/', async (req, res) => {
  try {
    const { name, shortForm } = req.body;
    const faculty = new Faculty({ name, shortForm });
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all teachers
router.get('/', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
