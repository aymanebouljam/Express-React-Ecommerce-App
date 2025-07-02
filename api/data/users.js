const bcrypt = require('bcryptjs');
module.exports = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: bcrypt.hashSync('user', 10),
    isAdmin: true,
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: bcrypt.hashSync('user', 10),
    isAdmin: false,
  },
  {
    name: 'Charlie Lee',
    email: 'charlie@example.com',
    password: bcrypt.hashSync('user', 10),
    isAdmin: false,
  },
];
