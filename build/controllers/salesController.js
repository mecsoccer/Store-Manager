'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _migration = require('../models/migration');

var _migration2 = _interopRequireDefault(_migration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllSales(req, res) {
  var query = {
    text: 'SELECT * FROM sales',
    values: []
  };

  _migration2.default.query(query).then(function (sale) {
    var allSales = sale.rows;
    res.status(200).json({ allSales: allSales });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function getSpecificSale(req, res) {
  var saleId = req.params.saleId;


  var query = {
    text: 'SELECT * FROM sales WHERE id = $1;',
    values: [saleId]
  };

  _migration2.default.query(query).then(function (sale) {
    var requestedSale = sale.rows[0];
    return res.status(200).json({ requestedSale: requestedSale });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function addSale(req, res) {
  var _req$body = req.body,
      seller = _req$body.seller,
      productName = _req$body.productName,
      quantity = _req$body.quantity,
      price = _req$body.price,
      total = _req$body.total;


  var query = {
    text: 'INSERT INTO sales(seller, productName, quantity, price, total) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [seller, productName, quantity, price, total]
  };

  _migration2.default.query(query).then(function (sale) {
    var newSale = sale.rows[0];
    return res.status(201).json({ newSale: newSale });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

exports.default = { getAllSales: getAllSales, getSpecificSale: getSpecificSale, addSale: addSale };
//# sourceMappingURL=salesController.js.map