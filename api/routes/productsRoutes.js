const handler = require('express-async-handler');
const auth = require('../middlewares/auth');
const { getAllProducts } = require('../controllers/productController.js');

module.exports = (router) => {
  router.get('/products', handler(getAllProducts));
};
