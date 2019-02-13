"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function validateProduct(req, res, next) {
  var _req$body = req.body,
      name = _req$body.name,
      category = _req$body.category,
      quantityLeft = _req$body.quantityLeft,
      quantitySold = _req$body.quantitySold,
      price = _req$body.price,
      minQuantity = _req$body.minQuantity;
  var valid = 0;
  var errors = [];

  if (name.length > 1) {
    valid += 1;
  } else {
    errors.push('Product name should be more than one character long.');
  }

  if (category.length > 1) {
    valid += 1;
  } else {
    errors.push('Category name should be more than one character long.');
  }

  if (typeof quantityLeft === 'number') {
    valid += 1;
  } else {
    errors.push('quantityLeft should be a number');
  }

  if (typeof quantitySold === 'number') {
    valid += 1;
  } else {
    errors.push('quantitySold should be a number');
  }

  if (typeof price === 'number') {
    valid += 1;
  } else {
    errors.push('price should be a number');
  }

  if (typeof minQuantity === 'number') {
    valid += 1;
  } else {
    errors.push('minQuantity should be a number');
  }

  if (valid < 6) {
    return res.status(422).send({
      message: 'Invalid inputs',
      errors: errors
    });
  }

  return next();
}

var _default = validateProduct;
exports.default = _default;
//# sourceMappingURL=validateProduct.js.map