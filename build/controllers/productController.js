'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _migration = require('../models/migration');

var _migration2 = _interopRequireDefault(_migration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllProducts(req, res) {
  var query = {
    text: 'SELECT * FROM products',
    values: []
  };

  _migration2.default.query(query).then(function (all) {
    var allProducts = all.rows;
    res.status(200).json({ allProducts: allProducts });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function getAvailableProducts(req, res) {
  var query = {
    text: 'SELECT * FROM products where quantityLeft > $1',
    values: [0]
  };

  _migration2.default.query(query).then(function (available) {
    var availableProducts = available.rows;
    res.status(200).json({ availableProducts: availableProducts });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function getSpecificProduct(req, res) {
  var productId = req.params.productId;


  var query = {
    text: 'SELECT * FROM products WHERE id = $1;',
    values: [productId]
  };

  _migration2.default.query(query).then(function (requestedProduct) {
    var product = requestedProduct.rows[0];
    return res.status(200).json({ product: product });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function addProduct(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      category = _req$body.category,
      quantityLeft = _req$body.quantityLeft,
      quantitySold = _req$body.quantitySold,
      price = _req$body.price,
      minQuantity = _req$body.minQuantity;


  var query = {
    text: 'INSERT INTO products(name, category, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [name, category, quantityLeft, quantitySold, price, minQuantity]
  };

  _migration2.default.query(query).then(function (product) {
    var newProduct = product.rows[0];
    return res.status(201).json({ newProduct: newProduct });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function updateProduct(req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      quantityLeft = _req$body2.quantityLeft,
      quantitySold = _req$body2.quantitySold;
  var productId = req.params.productId;


  var query = {
    text: 'UPDATE products SET quantityLeft = $1, quantitySold = $2 WHERE name = $3 AND id = $4;',
    values: [quantityLeft, quantitySold, name, productId]
  };

  _migration2.default.query(query).then(function (product) {
    var updatedProduct = product;
    return res.status(200).json({ updatedProduct: updatedProduct });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function deleteProduct(req, res) {
  var productId = req.params.productId;
  var name = req.body.name;


  var query = {
    text: 'DELETE FROM products WHERE id = $1 AND name = $2;',
    values: [productId, name]
  };

  _migration2.default.query(query).then(function (product) {
    var deletedProduct = product;
    return res.status(200).json({ deletedProduct: deletedProduct });
  }).catch(function (err) {
    res.status(200).json(err);
  });
}

exports.default = {
  getAllProducts: getAllProducts,
  getAvailableProducts: getAvailableProducts,
  getSpecificProduct: getSpecificProduct,
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
};
//# sourceMappingURL=productController.js.map