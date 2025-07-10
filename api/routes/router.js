const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const productsRoutes = require('./productsRoutes');
const ordersRoutes = require('./ordersRoutes');
const billingRoutes = require('./billingRoutes');

usersRoutes(router);

productsRoutes(router);

ordersRoutes(router);

billingRoutes(router);

module.exports = router;
