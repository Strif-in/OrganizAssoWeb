const { 
    getUsersFromDB, 
    getUserByIdFromDB, 
    insertUserToDB, 
    deleteUserFromDB
} = require('../models/db');

async function getAllUsers(req, res) {
  try {
    const users = await getUsersFromDB();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}

async function getUserById(req, res) {
  try {
    const user = await getUserByIdFromDB(req.params.id);
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}

async function createUser(req, res) {
  const { username, email } = req.body;
  if (!username || !email) return res.status(400).send('Champs requis manquants');
  try {
    const newUser = await insertUserToDB({ username, email });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
}

async function deleteUser(req, res) {
  try {
    const result = await deleteUserFromDB(req.params.id);
    if (!result) return res.status(404).send('Utilisateur non trouvé');
    res.send('Utilisateur supprimé');
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
      const user = await db.collection('users').findOne({ username, password });
  
      if (!user) return res.status(401).send('Identifiants incorrects');
      if (user.userStatus === 'pending') return res.status(403).send('En attente de validation admin');
  
      res.json({ message: 'Login réussi', user: { ...user, password: undefined } });
    } catch (err) {
      res.status(500).send('Erreur serveur');
    }
}

async function approveUser(req, res) {
    try {
      const db = await connectToDB();
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { userStatus: 'user' } }
      );
      if (result.matchedCount === 0) return res.status(404).send('Utilisateur non trouvé');
      res.send('Utilisateur validé');
    } catch (err) {
      res.status(500).send('Erreur serveur');
    }
}
  

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  loginUser,
  approveUser,
};
