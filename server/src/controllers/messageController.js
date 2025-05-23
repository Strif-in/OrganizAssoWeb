const { connectToDB } = require('../db');
const crypto = require('crypto');

async function createMessage(req, res) {
    const { forumId, username, content, parentMessageId } = req.body;
    if (!content || !forumId) {
        return res.status(400).json({ message: 'missing field' });
    }
    
    const db = await connectToDB();
    const collection = db.collection('messages');

    const userCollection = db.collection('users');

    const existingUser = await userCollection.findOne({ username: username });
    if (!existingUser) {
        return res.status(409).json({ message: 'User does not exist' });
    }

    const hash = crypto.createHash('sha256');
    hash.update(username + content + forumId);
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
        msgId: msgId,
        content : content,
        forumId: forumId,
        username : username,
        createdAt: new Date(),
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

async function getAllMessages(req, res) {

    const db = await connectToDB();
    try{
    
        const messages = await db.collection('messages').find().toArray();
        return res.status(200).json({messages : messages });
    }
    catch (error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteMessage(req, res) {
    const { msgId } = req.body;

    const db = await connectToDB();
    const collection = db.collection('messages');
    const message = await collection.findOne({ msgId: msgId });
    if (!message) { 
        return res.status(404).json({ message: 'Message not found' });
    }
    // Suppression du message
    await collection.deleteOne({ msgId: msgId })
        .then(() => {
            return res.status(200).json({ message: 'message deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting message:', error);
            return res.status(500).json({ message: 'Internal server error' });
        });
}
/*
async function getMessage(req, res) {
    const { msgId } = req.body;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    // Récupération du message
    const message = await collection.findOne({ msgId: msgId });

    if (!message) {
        return res.status(404).json({ message: 'message not found' });
    }

    return res.status(200).json({message : message });
}
*/
async function getMessagesByUser(req, res) {
    const { username } = req.body;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('messages');

    try{
        const messages = await collection.find({ username: username }).toArray();
        const user = await db.collection('users').findOne({ username: username });
        if (!user) {   
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({messages : messages });
    }catch(error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
async function getMessagesByThread(req, res) {

    const { threadId } = req.body;

      
    const db = await connectToDB();
    const collection = db.collection('messages');
    try{
        const thread = await db.collection('threads').findOne({ msgId : msgId });
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        const messages = await collection.find({ threadId :threadId }).toArray();
        return res.status(200).json({messages : messages });
    }catch (error) {    
        console.error('Error retrieving thread:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
*/

module.exports = {
    createMessage,
    deleteMessage,
    //getMessage,
    getAllMessages,
    getMessagesByUser,
    //getMessagesByThread
};

