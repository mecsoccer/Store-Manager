'use strict';

var _products = require('../models/products');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('express-validator/check'),
    body = _require.body,
    validationResult = _require.validationResult;

exports.getAll = function (req, res) {
  return res.status(200).json(_products2.default);
};

exports.getProduct = function (req, res) {
  var productId = req.params.productId;
  var requiredProduct = null;

  _products2.default.forEach(function (product) {
    if (product.id == productId) {
      requiredProduct = product;
    }
  });

  if (requiredProduct === null) return res.status(404).json({ message: 'Sorry, product does not exist' });

  return res.status(200).json(requiredProduct);
};

exports.addProduct = [body('name', 'product name is required').isLength({ min: 1 }).trim(), body('category', 'product category is required').isLength({ min: 1 }), body('qty_left', 'qty_left should be a number').isNumeric(), body('qty_sold', 'qty_sold should be a number').isNumeric(), body('price', 'price should be a number').isNumeric(), body('min_qty', 'min_qty should be a number').isNumeric(), function (req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty) {
    res.status(422).send('Invalid data supplied');
  }

  var _req$body = req.body,
      name = _req$body.name,
      category = _req$body.category,
      qty_left = _req$body.qty_left,
      qty_sold = _req$body.qty_sold,
      price = _req$body.price,
      min_qty = _req$body.min_qty;


  var id = _products2.default.length + 1;

  var newProduct = {
    id: id, name: name, category: category, qty_left: qty_left, qty_sold: qty_sold, price: price, min_qty: min_qty
  };

  _products2.default.push(newProduct);
  return res.status(201).json({ newProduct: newProduct, message: 'product successfully created' });
}];
//# sourceMappingURL=productController.js.map