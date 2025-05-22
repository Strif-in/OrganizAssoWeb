const { connectToDB } = require('../db');
const crypto = require('crypto');

async function createThread(req, res) {

    const { forumId ,title , username } = req.body;

    // Vérification des données
    if (!title) {
        return res.status(400).json({ message: 'missing field' });
    }
    // Connexion à la base de données
    
    const db = await connectToDB();
    const collection = db.collection('threads');
    const userCollection = db.collection('users');


    // Vérification si l'utilisateur existe déjà
    const existingUser = await userCollection.findOne({ username: username });

    if (!existingUser) {
        return res.status(409).json({ message: 'User does not exist' });
    }

    const hash = crypto.createHash('sha256');
    hash.update(username + title + forumId); // Concatenate authorId and title
    const threadId = hash.digest('hex');

    const threadExists = await collection.findOne({ id: threadId });
    if (threadExists) {
        return res.status(409).json({ message: 'Thread already exists' });
    }

    if (forumId=="forumAdmin" && existingUser.isAdmin == false) {
        return res.status(403).json({ message: 'User is not admin' });
    }
    // Création du thread

    const newThread = {
        id: threadId,
        forumId: forumId,
        title: title,
        username: username,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    await collection.insertOne(newThread)
        .then(() => {
            return res.status(201).json({ message: 'thread registered successfully' , thread: newThread});
        })
        .catch((error) => {
            console.error('Error registering thread:', error);
            return res.status(500).json({ message: 'Internal server error' });
        });
    
    
    
}

async function getThreadById(req, res) {
    const { threadId } = req.body;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('threads');

    try{
        // Vérification si le thread existe déjà
        const thread = await collection.findOne({ id: threadId });
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        return res.status(200).json(thread);
    }catch (error){
        return res.status(500).json({ message: 'Internal server error' });
    }

    
}
async function getThreadsByForumId(req, res) {
    const { forumId } = req.body;
    const db = await connectToDB();
    const collection = db.collection('threads');
    try{
        const threadList = await collection.find({ forumId }).toArray();
        return res.status(200).json({threads: threadList});
    }catch (error){
        return res.status(500).json({ message: 'Internal server error' });
    }
}

    

module.exports = {
    createThread,
    getThreadById,
    getThreadsByForumId,
};