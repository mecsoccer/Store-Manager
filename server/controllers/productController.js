import products from '../models/products';

const { body, validationResult } = require('express-validator/check');

exports.getAll = function (req, res) {
  return res.status(200).json(products);
};

exports.getProduct = function (req, res) {
  const productId = req.params.productId;
  let requiredProduct = null;

  products.forEach((product) => {
    if (product.id == productId) {
      requiredProduct = product;
    }
  });

  return res.status(200).json(requiredProduct);
};

exports.addProduct = [

  body('name', 'product name is required').isLength({ min: 1 }).trim(),
  body('category', 'product category is required').isLength({ min: 1 }),
  body('qty_left', 'qty_left should be a number').isNumeric(),
  body('qty_sold', 'qty_sold should be a number').isNumeric(),
  body('price', 'price should be a number').isNumeric(),
  body('min_qty', 'min_qty should be a number').isNumeric(),

  function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      res.status(422).send('problem with data supplied');
    }

    const {
      name, category, qty_left, qty_sold, price, min_qty,
    } = req.body;
    const id = products.length + 1;

    const newProduct = {
      id, name, category, qty_left, qty_sold, price, min_qty,
    };

    products.push(newProduct);
    return res.status(201).json({ created: newProduct, success: true });
  },

];
