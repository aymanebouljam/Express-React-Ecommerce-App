const { getTaxes, getShippingDetails } = require('../controllers/billingController');
const handler = require('express-async-handler');

module.exports = (router) => {
  router.get('/taxes', handler(getTaxes));
  router.get('/shipping', handler(getShippingDetails));
};
