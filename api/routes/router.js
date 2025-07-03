const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');

usersRoutes(router);

productsRoutes(router);

module.exports = router;
