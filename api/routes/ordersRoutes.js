const auth = require('../middlewares/auth');
const handler = require('express-async-handler');
const {
  createOrder,
  updateOrderPayment,
  getUserOrders,
  getSingleOrder,
} = require('../controllers/orderController');

module.exports = (router) => {
  router.post('/orders', auth, handler(createOrder));
  router.patch('/orders/:id/payment', auth, handler(updateOrderPayment));
  router.get('/orders', auth, handler(getUserOrders));
  router.get('/orders/:id', auth, handler(getSingleOrder));
};
