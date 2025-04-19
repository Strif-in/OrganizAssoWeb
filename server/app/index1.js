const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// ROUTES
app.get('/', (req, res) => {
  res.send('Tout va à merveille');
});

app.get('/test1', (req, res) => {
  res.send('Tout marche à merveille pour cette page 1');
});

app.get('/essai:num', (req, res) => {
  res.send('Tout marche à merveille pour cette page ' + req.params.num);
});

app.get('/test.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

app.get('/databases', async (req, res) => {
  try {
    await client.connect();
    const databases = await client.db().admin().listDatabases();
    res.json(databases.map(db => db.name));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    await client.close();
  }
});

app.use((req, res) => {
  res.status(404).send("Cette page n'existe pas.");
});

app.listen(port, () => {
  console.log(`Serveur Express lancé sur http://localhost:${port}`);
});
