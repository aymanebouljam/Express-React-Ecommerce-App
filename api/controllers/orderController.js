const Order = require('../models/Order');
const {
  Types: { ObjectId },
} = require('mongoose');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress, taxPrice, shippingPrice, totalPrice } = req.body;

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    res.status(400);
    throw new Error('No Item was Ordered');
  }
  let subTotal = 0;

  orderItems.forEach(async (item) => {
    const price = Product.findById(item?.product)?.price;
    if (!price || item?.price !== price) {
      res.status(400);
      throw new Error('Item price is Invalid');
    } else if (!item.quantity || item.quantity === 0) {
      res.status(400);
      throw new Error('Item quantity cannot be null');
    } else {
      subTotal += price * item.quantity;
    }
  });

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

exports.updateOrderPayment = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid order ID');
  }

  const order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error('Order Not Found');
  }

  order.paymentDetails = {
    id: req.body.id,
    status: req.body.status,
    updated_time: req.body.updated_time,
    email_address: req.body.email_address,
  };

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  return res.status(200).json(updatedOrder);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });

  return res.status(200).json(orders);
};

exports.getSingleOrder = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid Order Id');
  }
  const order = await Order.findOne({ _id: id, user: req.user._id }).populate('user', 'email');

  if (!order) {
    res.status(404);
    throw new Error('Order Not Found');
  }

  return res.status(200).json(order);
};
