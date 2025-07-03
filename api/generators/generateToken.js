const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (id, name) => jwt.sign({ id, name }, process.env.privateKey, { expiresIn: '15d' });
