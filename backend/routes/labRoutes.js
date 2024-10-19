const express = require('express');
const router = express.Router();
const { addLab, getLabs } = require('../controllers/labController');

router.post('/', addLab);
router.get('/', getLabs);

module.exports = router;
