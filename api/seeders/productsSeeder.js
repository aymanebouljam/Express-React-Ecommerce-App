const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('../data/products');
require('dotenv').config();

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  await Product.deleteMany({});

  return await Product.insertMany(products);
};
