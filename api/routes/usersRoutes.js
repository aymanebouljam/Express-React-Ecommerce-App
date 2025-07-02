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

module.exports = router;
