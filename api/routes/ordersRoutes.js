const auth = require('../middlewares/auth');
const handler = require('express-async-handler');
const { createOrder } = require('../controllers/orderController');

module.exports = (router) => {
  router.post('/orders', auth, handler(createOrder));
};
