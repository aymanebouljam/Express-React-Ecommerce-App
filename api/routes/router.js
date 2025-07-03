const router = require('express').Router();
const usersRoutes = require('./usersRoutes');

module.exports = () => {
  usersRoutes(router);
  return router;
};
