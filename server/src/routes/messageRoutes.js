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
router.post('/create', createMessage);            
router.get('/readAll', getAllMessages);              
router.get('/readOne', getMessageById);          
router.delete('/delete', deleteMessage);         
router.patch('/update', updateMessage);          

module.exports = router;
