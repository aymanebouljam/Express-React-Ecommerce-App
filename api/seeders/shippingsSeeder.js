const mongoose = require('mongoose');
const { shippingPrices } = require('../data/billingDetails');
const Shipping = require('../models/Shipping');

require('dotenv').config();

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  await Shipping.deleteMany({});

  return await Shipping.insertMany(shippingPrices);
};
