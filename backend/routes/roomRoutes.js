const express = require('express');
const router = express.Router();
const { addRoom, getRooms } = require('../controllers/roomController');

router.post('/', addRoom);
router.get('/', getRooms);

module.exports = router;
