const Product = require('../models/Product');
const { ObjectId } = require('mongoose').Types;

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  return res.status(200).json(products);
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error('No Product ID was provided');
  }

  if (!ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid Product ID');
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product Not Found');
  }

  return res.status(200).json(product);
};
