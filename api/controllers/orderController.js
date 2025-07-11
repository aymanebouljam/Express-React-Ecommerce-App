const Order = require('../models/Order');
const Tax = require('../models/Tax');
const Shipping = require('../models/Shipping');

const {
  Types: { ObjectId },
} = require('mongoose');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress } = req.body;

  console.log(orderItems);

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    res.status(400);
    throw new Error('No Item was Ordered');
  }
  let subTotal = 0;

  for (const item of orderItems) {
    const product = await Product.findById(item?.product);
    if (!product) {
      res.status(400);
      throw new Error('Invalid Product ID');
    }
    if (!item.quantity || item.quantity === 0) {
      res.status(400);
      throw new Error('Quantity cannot be null');
    }

    item.name = product.name;
    item.image = product.image;
    item.price = product.price;

    subTotal += Number(product.price) * Number(item.quantity);
  }

  if (!shippingAddress || Object.keys(shippingAddress).length === 0 || !shippingAddress.country) {
    res.status(400);
    throw new Error('No shipping country was specified');
  }

  const tax = await Tax.findOne({ country: shippingAddress.country });
  if (!tax) {
    res.status(400);
    throw new Error('Invalid country');
  }

  let type = '';
  if (shippingAddress.country === 'Morocco') {
    type = 'local';
  } else {
    type = 'foreign';
  }

  const shipping = await Shipping.findOne({ type });

  if (!shipping) {
    res.status(500);
    throw new Error('Error occured while retrieving shipping');
  }

  const taxPrice = Number((subTotal * tax.rate).toFixed(2));

  const shippingPrice = Number(shipping.price.toFixed(2));

  const totalPrice = Number((subTotal + taxPrice + shippingPrice).toFixed(2));

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

  if (!order.user === req.user.id) {
    res.status(403);
    throw new Error('Unauthorized');
  }

  order.paymentResult = {
    id: req.body.id,
    status: 'COMPLETED',
    updated_time: Date.now(),
    email_address: req.body?.email_address ?? req.user.email,
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
