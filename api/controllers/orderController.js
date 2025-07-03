const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!orderItems || Array.isArray(orderItems)?.length === 0) {
    res.status(400);
    throw new Error('No Item was Ordered');
  }

  const order = await new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalPrice,
  }).save();

  return res.status(201).json(order);
};
