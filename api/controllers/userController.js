const User = require('../models/User');
const generateToken = require('../generators/generateToken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(403);
    throw new Error('Invalid credentials');
  }

  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id, user.name),
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  if (await User.findOne({ email })) {
    res.status(403);
    throw new Error('A user was already registered with this email');
  }

  const user = await new User({
    name,
    email,
    password,
  }).save();

  return res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: generateToken(user._id, user.name),
  });
};

exports.getProfile = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  });
};

exports.updateProfile = async (req, res) => {
  const user = req.user;

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const { _id, name, email, updatedAt } = await user.save();

  return res.status(200).json({
    id: _id,
    name,
    email,
    token: generateToken(_id, name),
    updatedAt: new Date(updatedAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  });
};
