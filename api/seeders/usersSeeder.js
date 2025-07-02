const mongoose = require('mongoose');
const User = require('../models/User');
const users = require('../data/users');

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  await User.deleteMany({});

  return await User.insertMany(users);
};
