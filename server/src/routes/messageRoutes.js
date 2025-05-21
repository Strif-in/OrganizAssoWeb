const express = require('express');

const { createMessage,
    getMessages,
    deleteMessage,
    updateMessage,
    getMessage,
    getAllMessages,
    getMessagesByUser,
    getMessagesByThread } = require('../controllers/messageController');

const router = express.Router();

// Route pour créer un message
router.post('/create', createMessage);
// Route pour récupérer tous les messages
router.get('/', getAllMessages);
// Route pour récupérer un message par son ID
router.get('/:messageId', getMessage);
// Route pour récupérer les messages d'un utilisateur
router.get('/user/:userId', getMessagesByUser);
// Route pour récupérer les messages d'un thread
router.post('/thread', getMessagesByThread);
// Route pour supprimer un message
router.delete('/:messageId', deleteMessage);
// Route pour mettre à jour un message
router.put('/:messageId', updateMessage);
// Route pour récupérer tous les messages
router.get('/', getMessages);


module.exports = router;

