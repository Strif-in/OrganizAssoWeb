const { connectToDB } = require('../db');
const crypto = require('crypto');

async function createThread(req, res) {

    const { forumId ,title ,authorId ,date} = req.body;

    // Vérification des données
    if (!title) {
        return res.status(400).json({ message: 'missing field' });
    }
    // Connexion à la base de données
    
    const db = await connectToDB();
    const collection = db.collection('threads');
    const userCollection = db.collection('users');

     // Récupération de l'ID de l'utilisateur   
     const username = authorId; // Assurez-vous que l'ID de l'utilisateur est récupéré correctement

    // Vérification si l'utilisateur existe déjà
    const existingUser = await userCollection.findOne({ username: username });

    if (!existingUser) {
        return res.status(409).json({ message: 'User does not exist' });
    }

    const hash = crypto.createHash('sha256');
    hash.update(username + title + forumId + date); // Concatenate authorId and title
    const threadId = hash.digest('hex');

    const threadExists = await collection.findOne({ id: threadId });
    if (threadExists) {
        return res.status(409).json({ message: 'Thread already exists' });
    }

    // Création du thread

    const newThread = {
        id: threadId,
        forumId: forumId,
        title: title,
        authorId: authorId,
        createdAt: date,
        updatedAt: date
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
    const { threadId } = req.params;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('threads');

    // Récupération du thread par ID
    const thread = await collection.findOne({ id: threadId });

    return res.status(200).json(thread);
}
async function getThreadsByForumId(req, res) {
    const { forumId } = req.body;

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('threads');
    // Récupération des threads par forumId
    const threadList = await collection.find({ forumId }).toArray();
    return res.status(200).json({threads: threadList});
}

    

module.exports = {
    createThread,
    getThreadById,
    getThreadsByForumId,
};