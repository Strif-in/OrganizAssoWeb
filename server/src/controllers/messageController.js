const {
  enregistrerMessage,
  getAllMessagesFromDB,
  getMessageByIdFromDB,
  deleteMessageFromDB,
  updateMessageInDB
} = require('../models/db');

const { ObjectId } = require('mongodb');

async function createMessage(req, res) {
  const { texte } = req.body;
  if (!texte) {
    console.warn('[WARN] POST sans champ "texte"');
    return res.status(400).send('Champ "texte" manquant');
  }

  console.log('[INFO] POST recu - Message : ' + texte);

  try {
    const result = await enregistrerMessage(texte);
    return res.status(201).json(result);
  } catch (err) {
    console.error('[ERREUR] MongoDB : ', err);
    return res.status(500).send('Erreur serveur');
  }
}

async function getAllMessages(req, res) {
  try {
    const messages = await getAllMessagesFromDB();
    return res.json(messages);
  } catch (err) {
    return res.status(500).send('Erreur serveur');
  }
}

async function getMessageById(req, res) {
  try {
    const message = await getMessageByIdFromDB(req.params.id);
    if (!message) return res.status(404).send('Message non trouvé');
    res.json(message);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
}

async function deleteMessage(req, res) {
  try {
    const success = await deleteMessageFromDB(req.params.id);
    if (!success) return res.status(404).send('Message non trouvé');
    res.send('Message supprimé');
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
}

async function updateMessage(req, res) {
  const { texte } = req.body;
  if (!texte) return res.status(400).send('Champ "texte" manquant');
  try {
    const success = await updateMessageInDB(req.params.id, texte);
    if (!success) return res.status(404).send('Message non trouvé');
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
