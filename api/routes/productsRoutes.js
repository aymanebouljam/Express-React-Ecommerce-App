const handler = require('express-async-handler');
const auth = require('../middlewares/auth');
const { getAllProducts, getSingleProduct } = require('../controllers/productController');

module.exports = (router) => {
  router.get('/products', handler(getAllProducts));
  router.get('/products/:id', handler(getSingleProduct));
};
