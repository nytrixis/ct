const express = require('express');
const router = express.Router();
const { addTimetableEntry, getTimetableEntries } = require('../controllers/timetableController');

router.post('/', addTimetableEntry);
router.get('/:semester', getTimetableEntries);

module.exports = router;
