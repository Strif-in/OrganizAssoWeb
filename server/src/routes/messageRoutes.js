const express = require('express');
const {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  updateMessage
} = require('../controllers/messageController');

const router = express.Router();

// CRUD Routes
router.post('/', createMessage);              // Create
router.get('/', getAllMessages);              // Read all
router.get('/:id', getMessageById);           // Read one
router.delete('/:id', deleteMessage);         // Delete
router.patch('/:id', updateMessage);          // Update

module.exports = router;
