'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sales = require('../models/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllSales(req, res) {
  res.status(200).json(_sales2.default);
}

function getSpecificSale(req, res) {
  var saleId = req.params.saleId;

  var requiredRecord = null;

  _sales2.default.forEach(function (sale) {
    if (sale.id == saleId) {
      requiredRecord = sale;
    }
  });

  if (requiredRecord === null) {
    return res.status(404).json({ message: 'Sorry, the sale record does not exist' });
  }

  return res.status(200).json(requiredRecord);
}

function addSale(req, res) {
  var _req$body = req.body,
      date = _req$body.date,
      creator = _req$body.creator,
      productName = _req$body.productName,
      quantity = _req$body.quantity,
      price = _req$body.price,
      total = _req$body.total;


  var id = _sales2.default.length + 1;

  var newRecord = {
    id: id, date: date, creator: creator, productName: productName, quantity: quantity, price: price, total: total
  };

  _sales2.default.push(newRecord);
  return res.status(201).json({ newRecord: newRecord, message: 'New record created' });
}

exports.default = { getAllSales: getAllSales, getSpecificSale: getSpecificSale, addSale: addSale };
//# sourceMappingURL=salesController.js.map