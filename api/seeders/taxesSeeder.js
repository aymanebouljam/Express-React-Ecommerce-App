const mongoose = require('mongoose');
const { taxes } = require('../data/billingDetails');
const Tax = require('../models/Tax');

require('dotenv').config();

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  await Tax.deleteMany({});

  console.log(taxes);

  return await Tax.insertMany(taxes);
};
