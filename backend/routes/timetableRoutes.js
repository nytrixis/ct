const express = require('express');
const router = express.Router();
const { addTimetableEntry, getTimetableEntries } = require('../controllers/timetableController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, addTimetableEntry);
router.get('/:semester', getTimetableEntries);

module.exports = router;
