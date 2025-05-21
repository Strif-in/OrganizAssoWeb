const { connectToDB } = require('../db');


async function getPendingUsers(req, res) {
    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('users');

    // Vérification des informations d'identification de l'utilisateur
    const user = await collection.find({ isMember: false }).toArray();
    // Envoi de la réponse 
    return res.status(200).json({ message: 'Pending users retrieved successfully', pendingUsers: user });
}

async function approveUsers(req, res) {
    console.log("ca bug la");

    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('users');
    // Vérification des informations d'identification de l'utilisateur
    const user = await collection.findOne({ username: username });
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Vérification si l'utilisateur est déjà membre
    if (user.isMember) {
        return res.status(400).json({ message: 'User is already a member' });
    }
    // Mise à jour de l'utilisateur pour le rendre membre
    await collection.updateOne({ username: username }, { $set: { isMember: true } });
    // Envoi de la réponse
    return res.status(200).json({ message: 'User approved successfully' });
}

async function rejectUsers(req, res) {
    console.log("ca bug ici");

    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('users');
    
    // Vérification des informations d'identification de l'utilisateur
    const user = await collection.findOne({ username: username });
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Vérification si l'utilisateur est déjà membre
    if (user.isMember) {
        return res.status(400).json({ message: 'User is already a member' });
    }
    // Mise à jour de l'utilisateur pour le rendre membre
    await collection.deleteOne({ username: username });
    // Envoi de la réponse
    return res.status(200).json({ message: 'User rejected successfully' });
}


async function retrogradeUsers(req, res) {

    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('users');
    // Vérification des informations d'identification de l'utilisateur
    const user = await collection.findOne({ username: username });
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Vérification si l'utilisateur est déjà membre
    if (!user.isMember) {
        return res.status(400).json({ message: 'User is not a member' });
    }
    // Vérification si l'utilisateur est déjà admin
    if (!user.isAdmin) {
        return res.status(400).json({ message: 'User is not an admin' });
    }
    // Mise à jour de l'utilisateur pour le rendre membre
    await collection.updateOne({ username: username }, { $set: { isAdmin: false } });
    // Envoi de la réponse
    return res.status(200).json({ message: 'User retrograded successfully' });
}

async function upgradeUsers(req, res) {

    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('users');
    // Vérification des informations d'identification de l'utilisateur
    const user = await collection.findOne({ username: username });
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Vérification si l'utilisateur est déjà membre
    if (!user.isMember) {
        return res.status(400).json({ message: 'User is not a member' });
    }
    // Vérification si l'utilisateur est déjà admin
    if (user.isAdmin) {
        return res.status(400).json({ message: 'User is already admin' });
    }
    // Mise à jour de l'utilisateur pour le rendre membre
    await collection.updateOne({ username: username }, { $set: { isAdmin: true } });
    // Envoi de la réponse
    return res.status(200).json({ message: 'User upgraded successfully' });
}

async function listUsers(req, res) {
    // Connexion à la base de données
    const db = await connectToDB();
    const collection = db.collection('users');

    // Vérification des informations d'identification de l'utilisateur
    const user = await collection.find({}).toArray();
    // Envoi de la réponse 
    return res.status(200).json({ message: 'All users retrieved successfully', allUsers: user });
}



module.exports = {
    getPendingUsers,
    approveUsers,
    rejectUsers,
    retrogradeUsers,
    upgradeUsers,
    listUsers,
    // Ajoutez d'autres fonctions de contrôleur ici si nécessaire
};