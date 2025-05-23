const express = require('express');

const { 
    createMessage,
    deleteMessage,
    getMessage,
    getAllMessages,
    getMessagesByUser,
    //getMessagesByThread 
} = require('../controllers/messageController');

const router = express.Router();

router.post('/create', createMessage);
router.post('/getOne', getMessage);
router.post('/getByUser', getMessagesByUser); 
//router.get('/threadMessages', getMessagesByThread);
router.delete('/delete', deleteMessage);
router.get('/getAll', getAllMessages);


module.exports = router;

