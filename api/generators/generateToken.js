const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (id, name) => jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '15d' });
