const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');
const ordersRoutes = require('./ordersRoutes');

usersRoutes(router);

productsRoutes(router);

ordersRoutes(router);

module.exports = router;
