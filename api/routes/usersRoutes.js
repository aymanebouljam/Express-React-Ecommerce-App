const router = require('express').Router();
const handler = require('express-async-handler');
const User = require('../models/User');

router.post(
  '/login',
  handler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      res.status(403);
      throw new Error('Invalid credentials');
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: null,
      createdAt: new Date(user.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }),
);

router.post(
  '/',
  handler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    if (await User.findOne({ email })) {
      res.status(403);
      throw new Error('A user was already registered with this email');
    }

    await new User({
      name,
      email,
      password,
    }).save();

    return res.status(201).json({ message: 'User registered successfully' });
  }),
);

module.exports = router;
