const express = require('express');
const router = express.Router();
const { addLab } = require('../controllers/labController');

router.post('/', addLab);

module.exports = router;
