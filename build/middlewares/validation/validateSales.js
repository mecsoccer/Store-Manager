"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validationLibrary = _interopRequireDefault(require("./library/validationLibrary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validateTextField = _validationLibrary.default.validateTextField,
    validateNumberField = _validationLibrary.default.validateNumberField;

var ValidateSaleInput =
/*#__PURE__*/
function () {
  function ValidateSaleInput() {
    _classCallCheck(this, ValidateSaleInput);
  }

  _createClass(ValidateSaleInput, null, [{
    key: "validateAddSale",
    value: function validateAddSale(req, res, next) {
      var _req$body = req.body,
          seller = _req$body.seller,
          productName = _req$body.productName,
          quantity = _req$body.quantity,
          price = _req$body.price,
          total = _req$body.total;
      var sellerValid = validateTextField('seller', seller, 2, 30, /^[a-z]+$/, 'john, doe, jaachi, uche');
      var productNameValid = validateTextField('productName', productName, 2, 30, /^\w+$/, 'sugar_23g, sugar, 3233, shirt');
      var quantityValid = validateNumberField('quantity', quantity, 1, 10000000, /^\d+$/, '4, 18');
      var priceValid = validateNumberField('price', price, 0.01, 100000000.00, /^\d+.\d\d$/, '30.00, 23.34');
      var totalValid = validateNumberField('total', total, 0.01, 100000000.00, /^\d+.\d\d$/, '30000.00, 23500.34');

      if (sellerValid !== true) {
        res.status(422).json({
          error: sellerValid
        });
      } else if (productNameValid !== true) {
        res.status(422).json({
          error: productNameValid
        });
      } else if (quantityValid !== true) {
        res.status(422).json({
          error: quantityValid
        });
      } else if (priceValid !== true) {
        res.status(422).json({
          error: priceValid
        });
      } else if (totalValid !== true) {
        res.status(422).json({
          error: totalValid
        });
      } else {
        next();
      }
    }
  }, {
    key: "validateSaleId",
    value: function validateSaleId(req, res, next) {
      var saleId = req.params.saleId;
      var saleIdValid = validateNumberField('saleId', saleId, 1, 10000000, /^\d+$/, '3, 4, 100');

      if (saleIdValid !== true) {
        res.status(422).json({
          error: 'saleId parameter invalid'
        });
      } else {
        next();
      }
    }
  }]);

  return ValidateSaleInput;
}();

var _default = ValidateSaleInput;
exports.default = _default;
//# sourceMappingURL=validateSales.js.map