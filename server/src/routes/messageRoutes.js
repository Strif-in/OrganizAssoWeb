const express = require('express');
const { createMessage } = require('../controllers/messageController');
const router = express.Router();

// Route POST /messages
router.post('/', createMessage);

module.exports = router;