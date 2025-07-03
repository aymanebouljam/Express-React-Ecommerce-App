const router = require('express').Router();
const handler = require('express-async-handler');
const { login, register, getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/login', handler(login));

router.post('/', handler(register));

router.get('/profile', auth, handler(getProfile));

router.patch('/profile', auth, handler(updateProfile));

module.exports = router;
