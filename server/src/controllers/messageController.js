const {
  connectToDB,
  closeDB,
} = require('../models/db');

const { ObjectId } = require('mongodb');

async function createMessage(req, res) {
  const { texte } = req.body;
  if (!texte) {

    console.warn('[WARN] POST sans champ "texte"');
    return res.status(400).send('Champ "texte" manquant');
  }
  const db = await connectToDB();
  const collection = db.collection('messages');

  console.log('[INFO] POST recu - Message : ' + texte);

  try {
    const result = await collection.insertOne({
      texte,
      date: new Date(),
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error('[ERREUR] MongoDB : ', err);
    return res.status(500).send('Erreur serveur');
  }
}

async function getAllMessages(req, res) {
  try {
    
    const db = await connectToDB();
    const messages = db.collection('messages').find().toArray();
    return res.json(messages);
  } catch (err) {
    return res.status(500).send('Erreur serveur');
  }
}

async function getMessageById(req, res) {
  try {
    const db = await connectToDB();
    
    const message = await db.collection('messages').findOne({ _id: new ObjectId(id) });

    if (!message) return res.status(404).send('Message non trouvé');
    res.json(message);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
}

async function deleteMessage(req, res) {
  const db = await connectToDB();
  try {
    const result = await db.collection('messages').deleteOne({ _id: new ObjectId(id) });

    if (!result) return res.status(404).send('Message non trouvé');
    res.send('Message supprimé');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
}

async function updateMessage(req, res) {
  const { texte } = req.body;
  if (!texte) return res.status(400).send('Champ "texte" manquant');
  try {
    const db = await connectToDB();
    const result = await db.collection('messages').updateOne(
      { _id: new ObjectId(id) },
      { $set: { texte: newTexte, editedAt: new Date() } }
    );
    if (!result) return res.status(404).send('Message non trouvé');
    res.send('Message modifié');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
}

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
  updateMessage
};
