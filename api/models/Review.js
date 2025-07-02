const { Schema, model } = require('mongoose');

module.exports = model(
  'Review',
  new Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    },
    { timestamps: true },
  ),
);
