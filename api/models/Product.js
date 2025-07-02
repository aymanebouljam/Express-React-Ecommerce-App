const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

module.exports = model(
  'Product',
  new Schema(
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      rating: { type: Number, required: true, default: 0 },
      price: { type: Number, required: true, default: 0 },
      countInStock: { type: Number, required: true, default: 0 },

      reviews: [reviewSchema],
    },
    { timestamps: true },
  ),
);
