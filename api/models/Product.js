const { Schema, model } = require('mongoose');
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

      reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    },
    { timestamps: true },
  ),
);
