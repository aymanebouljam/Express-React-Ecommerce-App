const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
});

module.exports = model(
  'Order',
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      orderItems: [orderItemSchema],
      shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      paymentMethod: { type: String, required: true, default: 'Paypal' },
      paymentResult: {
        id: { type: String },
        status: { type: String },
        updated_time: { type: Date },
        email_address: { type: String },
      },
      taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      isPaid: { type: Boolean, required: true, default: false },
      paidAt: { type: Date },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: { type: Date },
    },
    { timestamps: true },
  ),
);
