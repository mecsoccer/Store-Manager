function validateProduct(req, res, next) {
  const {
    name, category, quantityLeft, quantitySold, price, minQuantity,
  } = req.body;

  let valid = 0;

  const errors = [];

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
    return res.status(422).send({ message: 'Invalid inputs', errors });
  }

  return next();
}

export default validateProduct;
