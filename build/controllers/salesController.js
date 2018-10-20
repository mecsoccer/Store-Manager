'use strict';

var _sales = require('../models/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getAll = function (req, res) {
  return res.status(200).json(_sales2.default);
};

exports.getSale = function (req, res) {
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
};

exports.addSale = function (req, res) {
  var _req$body = req.body,
      attendant = _req$body.attendant,
      no_of_sales = _req$body.no_of_sales,
      products_sold = _req$body.products_sold,
      worth_of_sales = _req$body.worth_of_sales;

  var id = _sales2.default.length + 1;

  var newRecord = {
    id: id, attendant: attendant, no_of_sales: no_of_sales, products_sold: products_sold, worth_of_sales: worth_of_sales
  };

  _sales2.default.push(newRecord);
  return res.status(201).json({ newRecord: newRecord, message: 'New record created' });
};
//# sourceMappingURL=salesController.js.map