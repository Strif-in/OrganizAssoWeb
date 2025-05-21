const { MongoClient } = require('mongodb');

 // Chargement des variables d'env
 // Remarque : Si DB_URI n'est pas defini, la connexion par defaut se fait sur '
//localhost' (port 27017)
const uri = process.env.DB_URI || 'mongodb://localhost:27017';
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

async function closeDB(){
    if (db) {
        await client.close();
        db = null;
        console.log('[MONGODB] Deconnecte de la base ' + dbName);
    }
}

module.exports = {
    connectToDB,
    closeDB,
}
