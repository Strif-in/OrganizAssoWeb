const express = require('express');
const router = express.Router();

// Importation des routes
const routeUser = require('./routes/users');
const routeAuth = require('./routes/auth');
const routeMessage = require('./routes/message');
const routeThread = require('./routes/thread');

router.use('/users', routeUser);

router.use('/auth', routeAuth);

router.use('/thread', routeThread);

router.use('/message', routeMessage);

module.exports = router;