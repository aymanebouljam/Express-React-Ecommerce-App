const jwt = require('jsonwebtoken');
const handler = require('express-async-handler');
const User = require('../models/User');

module.exports = handler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403);
    throw new Error('Unauthorized Access');
  }

  const token = authHeader.split(' ')[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401);
    throw new Error('Invalid or expired token');
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  req.user = user;

  next();
});
