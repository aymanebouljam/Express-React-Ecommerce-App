const Tax = require('../models/Tax');
const Shipping = require('../models/Shipping');

exports.getTaxes = async (req, res) => {
  const taxes = await Tax.find({});

  return res.status(200).json(taxes);
};

exports.getShippingDetails = async (req, res) => {
  const shippingDetails = await Shipping.find({});

  return res.status(200).json(shippingDetails);
};
