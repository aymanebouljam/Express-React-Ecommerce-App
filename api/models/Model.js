const { Schema, model } = require('mongoose');

module.exports = model(
  'User',
  new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true },
  ),
);
