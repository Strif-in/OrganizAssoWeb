const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Charge le fichier .env (si present)

const messageRoutes = require('.src/routes/messageRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 8000;

// Autorise toutes les origines (CORS)
app.use(cors({ origin: '*' }));
// Permet de parser du JSON dans les requetes
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
res.type('text/plain; charset=utf-8');
return res.send('Bienvenue sur lAPI');
});

// Routes
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);

// Lancement du serveur
app.listen(port, () => {
console.log('[SERVEUR] En ecoute sur le port ' + port);
});
