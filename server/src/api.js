const express = require('express');
const router = express.Router();

// Importation des routes
const routeUser = require('./routes/userRoutes');
const routeMessage = require('./routes/messageRoutes');
//const routeThread = require('./routes/threadRoutes');

router.use('/users', routeUser);

//router.use('/threads', routeThread);

router.use('/messages', routeMessage);

module.exports = router;