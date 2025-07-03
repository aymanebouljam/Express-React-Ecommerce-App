const handler = require('express-async-handler');
const { login, register, getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middlewares/auth');

module.exports = (router) => {
  router.post('/users/login', handler(login));

  router.post('/users/', handler(register));

  router.get('/users/profile', auth, handler(getProfile));

  router.patch('/users/profile', auth, handler(updateProfile));
};
