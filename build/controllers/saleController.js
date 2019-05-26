"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _migration = _interopRequireDefault(require("../models/migration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllSales(req, res) {
  var query = {
    text: 'SELECT * FROM sales',
    values: []
  };

  _migration.default.query(query).then(function (sale) {
    var allSales = sale.rows;
    res.status(200).json({
      allSales: allSales
    });
  }).catch(
  /* istanbul ignore next */
  function (err) {
    return res.status(500).json(err);
  });
}

function getSpecificSale(req, res) {
  var saleId = req.params.saleId;
  var query = {
    text: 'SELECT * FROM sales WHERE id = $1;',
    values: [saleId]
  };

  _migration.default.query(query).then(function (sales) {
    var sale = sales.rows[0];
    res.status(200).json({
      sale: sale
    });
  }).catch(
  /* istanbul ignore next */
  function (err) {
    return res.status(500).json(err);
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

  _migration.default.query(query).then(function (sale) {
    var newSale = sale.rows[0];
    res.status(201).json({
      newSale: newSale
    });
  }).catch(
  /* istanbul ignore next */
  function (err) {
    return res.status(500).json(err);
  });
}

var _default = {
  getAllSales: getAllSales,
  getSpecificSale: getSpecificSale,
  addSale: addSale
};
exports.default = _default;
//# sourceMappingURL=saleController.js.map