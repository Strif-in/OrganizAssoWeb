const { connectToDB,} = require('../db');

async function getAllUsers(req, res) {
  const db = await connectToDB();
  try {

    const users = await db.collection('users').find().toArray();
    
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}

async function getUserByUsername(req, res) {
  const {username} = req.body;
  if (!username) return res.status(400).send('Champs requis manquants');
  const db = await connectToDB();
  try {
    const user = await db.collection('users').findOne({username : username});
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


async function createUser(req, res) {
  const { username, password, email, nom, prenom } = req.body;
  if (!username || !password || !email || !nom || !prenom) {
    return res.status(400).send('Champs requis manquants');
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).send('Email invalide');
  }
  

  const db = await connectToDB();
  const userExist = await db.collection('users').findOne({ username });
    if (userExist) {
        return res.status(409).json({ message: 'Username already exists' });
    }
  try {
    const newUser = {
        username, 
        password,
        email,
        nom,
        prenom,
        isAdmin: false,
        isMember: false,
        createdAt: new Date(),
    };
    await db.collection('users').insertOne(newUser);
    return res.status(201).json(newUser);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}

async function deleteUser(req, res) {
  const {username} = req.body;
  if (!username) return res.status(400).send('Champs requis manquants');
  const db = await connectToDB();
  try {
    const result = await db.collection('users').deleteOne({ username : username });
    if (!result) return res.status(404).send('Utilisateur non trouvé');
    return res.status(200).send('Utilisateur supprimé');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Champs requis manquants');
  
    try {
      const db = await connectToDB();
  
      const user = await db.collection('users').findOne({ username:username, password:password });
  
      if (!user) return res.status(401).send('Identifiants incorrects');
      if (user.isMember === false) return res.status(403).send('En attente de validation admin');
      if (user.isAdmin === true) return res.status(201).send('connexion admin');
      else {
        return res.status(200).send('connexion membre');
      }
    } catch (err) {
      res.status(500).send('Erreur serveur');
    }
}

async function approveUser(req, res) {  
    const { username } = req.body;  
    if (!username) return res.status(400).send('Champs requis manquants');
    
    try {
      const db = await connectToDB();
      const result = await db.collection('users').updateOne(
        { username: username },
        { $set: { isMember: true } }
      );
      
      if (result.matchedCount === 0) return res.status(404).send('Utilisateur non trouvé');
      return res.status(200).send('Utilisateur validé');
    } catch (err) {
      res.status(500).send('Erreur serveur');
    }
}

async function promoteUser(req, res) {  
  const { username } = req.body;  
  if (!username) return res.status(400).send('Champs requis manquants');
  
  try {
    const db = await connectToDB();
    const result = await db.collection('users').updateOne(
      { username: username },
      { $set: { isAdmin: true } }
    );
    
    if (result.matchedCount === 0) return res.status(404).send('Utilisateur non trouvé');
    return res.status(200).send('Utilisateur promue');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
}

async function demoteUser(req, res) {  
  const { username } = req.body;  
  if (!username) return res.status(400).send('Champs requis manquants');
  
  try {
    const db = await connectToDB();
    const result = await db.collection('users').updateOne(
      { username: username },
      { $set: { isAdmin: false } }
    );
    
    if (result.matchedCount === 0) return res.status(404).send('Utilisateur non trouvé');
    return res.status(200).send('Utilisateur depromue');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  deleteUser,
  loginUser,
  approveUser,
  promoteUser,
  demoteUser,
};