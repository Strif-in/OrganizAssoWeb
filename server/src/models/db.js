const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.DB_URI || 'mongodb://localhost';
const dbName = process.env.DB_NAME || 'asso_db';
const client = new MongoClient(uri, { connectTimeoutMS: 5000 });

let db = null;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log('[MONGODB] Connecté à la base ' + dbName);
  }
  return db;
}

// Messages
async function enregistrerMessage(texte) {
  const database = await connectToDB();
  const collection = database.collection('messages');
  const result = await collection.insertOne({
    texte: texte,
    date: new Date(),
  });
  console.log('[MONGODB] Message inséré avec ID : ' + result.insertedId);
}

async function getAllMessagesFromDB() {
  const db = await connectToDB();
  return db.collection('messages').find().toArray();
}

async function getMessageByIdFromDB(id) {
  const db = await connectToDB();
  try {
    return await db.collection('messages').findOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.error('[ERREUR] ID invalide pour MongoDB:', err);
    return null;
  }
}

async function deleteMessageFromDB(id) {
  const db = await connectToDB();
  try {
    const result = await db.collection('messages').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (err) {
    console.error('[ERREUR] Suppression échouée:', err);
    return false;
  }
}

async function updateMessageInDB(id, newTexte) {
  const db = await connectToDB();
  try {
    const result = await db.collection('messages').updateOne(
      { _id: new ObjectId(id) },
      { $set: { texte: newTexte, editedAt: new Date() } }
    );
    return result.matchedCount > 0;
  } catch (err) {
    console.error('[ERREUR] Mise à jour échouée:', err);
    return false;
  }
}


// Users
async function getUsersFromDB() {
  const database = await connectToDB();
  return database.collection('users').find().toArray();
}

async function getUserByIdFromDB(id) {
  const database = await connectToDB();
  try {
    return await database.collection('users').findOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.error('[ERREUR] Mauvais format ID MongoDB:', id);
    return null;
  }
}

async function insertUserToDB(user) {
  const database = await connectToDB();
  const result = await database.collection('users').insertOne(user);
  return { _id: result.insertedId, ...user };
}

async function deleteUserFromDB(id) {
  const database = await connectToDB();
  try {
    const result = await database.collection('users').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (err) {
    console.error('[ERREUR] Suppression utilisateur:', err);
    return false;
  }
}

module.exports = {
  enregistrerMessage,
  getAllMessagesFromDB,
  getMessageByIdFromDB,
  deleteMessageFromDB,
  updateMessageInDB,
  getUsersFromDB,
  getUserByIdFromDB,
  insertUserToDB,
  deleteUserFromDB,
};
