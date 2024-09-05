const express = require('express');
const router = express.Router();
const { addRoom } = require('../controllers/roomController');

router.post('/', addRoom);

module.exports = router;
