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

var ValidateProductInput =
/*#__PURE__*/
function () {
  function ValidateProductInput() {
    _classCallCheck(this, ValidateProductInput);
  }

  _createClass(ValidateProductInput, null, [{
    key: "validateAddProduct",
    value: function validateAddProduct(req, res, next) {
      var _req$body = req.body,
          productName = _req$body.productName,
          productCategory = _req$body.productCategory,
          quantityLeft = _req$body.quantityLeft,
          quantitySold = _req$body.quantitySold,
          price = _req$body.price,
          minQuantity = _req$body.minQuantity;
      var productNameValid = validateTextField('productName', productName, 2, 30, /^\w+$/, 'sugar_23g, sugar, 3233, shirt');
      var productCategoryValid = validateTextField('productCategory', productCategory, 2, 15, /^\w+$/, 'provisions, clothing');
      var quantityLeftValid = validateNumberField('quantityLeft', quantityLeft, 0, 10000000, /^\d+$/, '4 or 64');
      var quantitySoldValid = validateNumberField('quantitySold', quantitySold, 0, 10000000, /^\d+$/, '4, 18');
      var priceValid = validateNumberField('price', price, 0.01, 100000000, /^\d+.\d\d$/, '30.00, 23.34');
      var minQuantityValid = validateNumberField('minQuantity', minQuantity, 1, 100000000, /^\d+$/, '4, 18');

      if (productNameValid !== true) {
        res.status(422).json({
          error: productNameValid
        });
      } else if (productCategoryValid !== true) {
        res.status(422).json({
          error: productCategoryValid
        });
      } else if (quantityLeftValid !== true) {
        res.status(422).json({
          error: quantityLeftValid
        });
      } else if (quantitySoldValid !== true) {
        res.status(422).json({
          error: quantitySoldValid
        });
      } else if (priceValid !== true) {
        res.status(422).json({
          error: priceValid
        });
      } else if (minQuantityValid !== true) {
        res.status(422).json({
          error: minQuantityValid
        });
      } else {
        next();
      }
    }
  }, {
    key: "validateUpdateDetails",
    value: function validateUpdateDetails(req, res, next) {
      var _req$body2 = req.body,
          productName = _req$body2.productName,
          productCategory = _req$body2.productCategory,
          quantityLeft = _req$body2.quantityLeft,
          price = _req$body2.price,
          minQuantity = _req$body2.minQuantity;
      var productId = req.params.productId;
      var productIdValid = validateNumberField('productId', productId, 1, 100000, /^\d+$/, '3, 4, 100');
      var productNameValid = validateTextField('productName', productName, 2, 30, /^\w+$/, 'sugar_23g, sugar, 3233, shirt');
      var productCategoryValid = validateTextField('productCategory', productCategory, 2, 15, /^\w+$/, 'provisions, clothing');
      var quantityLeftValid = validateNumberField('quantityLeft', quantityLeft, 0, 10000000, /^\d+$/, '4 or 64');
      var priceValid = validateNumberField('price', price, 0.01, 100000000, /^\d+.\d\d$/, '30.00, 23.34');
      var minQuantityValid = validateNumberField('minQuantity', minQuantity, 1, 100000000, /^\d+$/, '4, 18');

      if (productIdValid !== true) {
        res.status(422).json({
          error: 'productId parameter invalid'
        });
      } else if (productNameValid !== true) {
        res.status(422).json({
          error: productNameValid
        });
      } else if (productCategoryValid !== true) {
        res.status(422).json({
          error: productCategoryValid
        });
      } else if (quantityLeftValid !== true) {
        res.status(422).json({
          error: quantityLeftValid
        });
      } else if (priceValid !== true) {
        res.status(422).json({
          error: priceValid
        });
      } else if (minQuantityValid !== true) {
        res.status(422).json({
          error: minQuantityValid
        });
      } else {
        next();
      }
    }
  }, {
    key: "validateProductSold",
    value: function validateProductSold(req, res, next) {
      var quantitySold = req.body.quantitySold;
      var productId = req.params.productId;
      var productIdValid = validateNumberField('productId', productId, 1, 100000, /^\d+$/, '3, 4, 100');
      var quantitySoldValid = validateNumberField('quantitySold', quantitySold, 1, 10000000, /^\d+$/, '4, 18');

      if (productIdValid !== true) {
        res.status(422).json({
          error: 'productId parameter invalid'
        });
      } else if (quantitySoldValid !== true) {
        res.status(422).json({
          error: quantitySoldValid
        });
      } else {
        next();
      }
    }
  }, {
    key: "validateProductId",
    value: function validateProductId(req, res, next) {
      var productId = req.params.productId;
      var productIdValid = validateNumberField('productId', productId, 1, 100000, /^\d+$/, '3, 4, 100');

      if (productIdValid !== true) {
        res.status(422).json({
          error: 'productId parameter invalid'
        });
      } else {
        next();
      }
    }
  }]);

  return ValidateProductInput;
}();

var _default = ValidateProductInput;
exports.default = _default;
//# sourceMappingURL=validateProduct.js.map