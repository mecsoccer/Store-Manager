'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _products = require('../models/products');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllProducts(req, res) {
  return res.status(200).json(_products2.default);
}

function getSpecificProduct(req, res) {
  var productId = req.params.productId;

  var requestedProduct = null;

  _products2.default.forEach(function (product) {
    if (product.id == productId) {
      requestedProduct = product;
    }
  });

  if (requestedProduct === null) return res.status(404).json({ message: 'Sorry, product does not exist' });

  return res.status(200).json(requestedProduct);
}

function addProduct(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      category = _req$body.category,
      quantityLeft = _req$body.quantityLeft,
      quantitySold = _req$body.quantitySold,
      price = _req$body.price,
      minQuantity = _req$body.minQuantity;


  var id = _products2.default.length + 1;

  var newProduct = {
    id: id, name: name, category: category, quantityLeft: quantityLeft, quantitySold: quantitySold, price: price, minQuantity: minQuantity
  };

  _products2.default.push(newProduct);
  return res.status(201).json({ message: 'product successfully created', newProduct: newProduct });
}

exports.default = { getAllProducts: getAllProducts, getSpecificProduct: getSpecificProduct, addProduct: addProduct };
//# sourceMappingURL=productController.js.map