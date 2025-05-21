const express = require('express');
const {
  createThread,
  getThreadById,
  getThreadsByForumId,
} = require('../controllers/threadController');

const router = express.Router();

// CRUD Routes

router.post('/create', createThread);            
router.get('/readOne', getThreadById);              
router.get('/readAll', getThreadsByForumId); 


module.exports = router;
