const express = require('express');
const router = express.Router();
const { addSubject, getSubjects } = require('../controllers/subjectController');

router.post('/', addSubject);
router.get('/:semester', getSubjects);

module.exports = router;