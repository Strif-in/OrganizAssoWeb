const { enregistrerMessage } = require('../db');

async function createMessage(req, res) {
  const { texte } = req.body;

  // Verification de la presence du champ "texte"
  if (!texte) {
    console.warn('[WARN] POST sans champ "texte"');
    return res.status(400).send('Champ "texte" manquant');
  }

  console.log('[INFO] POST recu - Message : ' + texte);

  // Tentative d’insertion dans MongoDB
  try {
    await enregistrerMessage(texte);
    return res.status(201).send('Message bien recu et enregistre');
  } catch (error) {
    console.error('[ERREUR] MongoDB : ', error);
    return res.status(500).send('Erreur serveur');
  }
}

module.exports = {
  createMessage,
};