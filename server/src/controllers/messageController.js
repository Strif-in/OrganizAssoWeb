const { connectToDB } = require('../db');
const crypto = require('crypto');

async function createMessage(req, res) {
    const { threadId, forumId, authorId, content, date, parentMessageId } = req.body;
    // Vérification des données
    if (!content || !threadId) {
        return res.status(400).json({ message: 'missing field' });
    }
    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    const userCollection = db.collection('users');

     // Récupération de l'ID de l'utilisateur   
    const username = authorId; // Assurez-vous que l'ID de l'utilisateur est récupéré correctement

    // Vérification si l'utilisateur existe déjà
    const existingUser = await userCollection.findOne({ username: username });
    if (!existingUser) {
        return res.status(409).json({ message: 'User does not exist' });
    }

    const hash = crypto.createHash('sha256');
    hash.update(username + content + threadId + date); // Concatenate authorId and title
    const msgId = hash.digest('hex');

    // Vérification si le message existe déjà
    const messageExists = await collection.findOne({ id: msgId });
    console.log("messageExists", messageExists);
    if (messageExists) {
        console.log("le message existe déjà")
        return res.status(409).json({ message: 'Message already exists' });
    }

    
    // Création du message
    const newMessage = {
        id: msgId,
        forumId : forumId,
        content : content,
        threadId: threadId,
        authorId : username,
        createdAt: date,
        parentMessageId: parentMessageId
    };

    await collection.insertOne(newMessage)
        .then(() => {
            return res.status(201).json({ message: 'message registered successfully', message: newMessage });
        })
        .catch((error) => {
            console.error('Error registering message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        });
}

async function getMessages(req, res) {
    const { threadId } = req.params;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Récupération des messages du thread
    const messages = await collection.find({ threadId }).toArray();

    // Envoi de la réponse
    return res.status(200).json({messages : messages });
}

async function deleteMessage(req, res) {
    const { messageId } = req.params;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Suppression du message
    await collection.deleteOne({ _id: messageId })
        .then(() => {
            return res.status(200).json({ message: 'message deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        });
}

async function updateMessage(req, res) {
    const { messageId } = req.params;
    const { content } = req.body;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Mise à jour du message
    await collection.updateOne({ _id: messageId }, { $set: { content } })
        .then(() => {
            return res.status(200).json({ message: 'message updated successfully' });
        })
        .catch((error) => {
            console.error('Error updating message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        });
}
async function getMessage(req, res) {
    const { messageId } = req.params;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Récupération du message
    const message = await collection.findOne({ _id: messageId });

    if (!message) {
        return res.status(404).json({ message: 'message not found' });
    }

    // Envoi de la réponse
    return res.status(200).json({messages : messages });
}

async function getAllMessages(req, res) {
    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Récupération de tous les messages
    const messages = await collection.find().toArray();

    // Envoi de la réponse
    return res.status(200).json({messages : messages });
}
async function getMessagesByUser(req, res) {
    const { userId } = req.params;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Récupération des messages de l'utilisateur
    const messages = await collection.find({ authorId: userId }).toArray();

    // Envoi de la réponse
    return res.status(200).json({messages : messages });
}
async function getMessagesByThread(req, res) {
    console.log("getMessagesByThread called", req.body);
    const { threadId } = req.body;
    console.log("Thread ID:", threadId);
      

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Récupération des messages du thread
    const messages = await collection.find({ threadId }).toArray();
    console.log("Messages:", messages);

    // Envoi de la réponse
    return res.status(200).json({messages : messages });
}


module.exports = {
    createMessage,
    getMessages,
    deleteMessage,
    updateMessage,
    getMessage,
    getAllMessages,
    getMessagesByUser,
    getMessagesByThread
};

