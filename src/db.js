const { MongoClient } = require('mongodb');

// Chargement des variables d’env
// Remarque : Si DB_URI n’est pas defini, la connexion par defaut se fait sur 'mongodb://localhost' (port 27017)
const uri = process.env.DB_URI || 'mongodb://localhost';
const dbName = process.env.DB_NAME || 'asso_db';

// Creation du client MongoDB
const client = new MongoClient(uri, { connectTimeoutMS: 5000 });

let db = null;

// Fonction de connexion a MongoDB (singleton)
async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log('[MONGODB] Connecte a la base ' + dbName);
  }
  return db;
}

// Fonction d’insertion d’un message
async function enregistrerMessage(texte) {
  const database = await connectToDB();
  const collection = database.collection('messages');
  const result = await collection.insertOne({
    texte: texte,
    date: new Date(),
  });
  console.log('[MONGODB] Message insere avec ID : ' + result.insertedId);
}

module.exports = {
  enregistrerMessage,
};