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

  _migration.default.query(query).then(function (sale) {
    var requestedSale = sale.rows[0];
    return requestedSale;
  }).then(function (sale) {
    var id = sale.id;

    if (typeof id === 'number') {
      return res.status(200).json({
        sale: sale
      });
    }

    return res.status(404).json({
      message: 'sorry, the sale record does not exist'
    });
  }).catch(function () {
    res.status(404).json({
      message: 'sorry, the sale record does not exist'
    });
  });
}

function addSale(req, res) {
  var _req$body = req.body,
      seller = _req$body.seller,
      productName = _req$body.productName,
      quantitySold = _req$body.quantitySold,
      price = _req$body.price,
      total = _req$body.total,
      productId = _req$body.productId;
  var query = {
    text: 'INSERT INTO sales(seller, productName, quantity, price, total) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [seller, productName, quantitySold, price, total]
  };

  _migration.default.query(query).then(function (sale) {
    var newSale = sale.rows[0];
    return newSale;
  }).then(function (newSale) {
    var query1 = {
      text: 'SELECT quantityleft,quantitysold FROM products WHERE id = $1;',
      values: [productId]
    };

    _migration.default.query(query1).then(function (data) {
      var _data$rows$ = data.rows[0],
          quantityleft = _data$rows$.quantityleft,
          quantitysold = _data$rows$.quantitysold;
      var newQuantityLeft = Number(quantityleft) - Number(quantitySold);
      var newQuantitySold = Number(quantitysold) + Number(quantitySold);
      return {
        newQuantityLeft: newQuantityLeft,
        newQuantitySold: newQuantitySold
      };
    }).then(function (data) {
      var newQuantityLeft = data.newQuantityLeft,
          newQuantitySold = data.newQuantitySold;
      var query2 = {
        text: 'UPDATE products SET quantityleft = $1, quantitysold = $2 WHERE id = $3;',
        values: [newQuantityLeft, newQuantitySold, productId]
      };

      _migration.default.query(query2).then(function (product) {
        var updatedProduct = product;
        return updatedProduct;
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }).catch(function (err) {
      res.status(500).json(err);
    });

    return newSale;
  }).then(function (newSale) {
    res.status(201).json({
      newSale: newSale
    });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

var _default = {
  getAllSales: getAllSales,
  getSpecificSale: getSpecificSale,
  addSale: addSale
};
exports.default = _default;
//# sourceMappingURL=salesController.js.map