const { Schema, model } = require('mongoose');

module.exports = model(
  'Tax',
  new Schema({
    country: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  }),
);
