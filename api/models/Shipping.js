const { Schema, model } = require('mongoose');

module.exports = model(
  'Shipping',
  new Schema({
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    minDays: {
      type: Number,
      required: true,
    },
    maxDays: {
      type: Number,
      required: true,
    },
  }),
);
