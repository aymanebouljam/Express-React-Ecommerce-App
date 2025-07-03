const router = require('express').Router();
const handler = require('express-async-handler');
const { login, register, getProfile } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/login', handler(login));

router.post('/', handler(register));

router.get('/profile', auth, handler(getProfile));

module.exports = router;
