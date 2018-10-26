function validateSales(req, res, next) {
  const {
    date, creator, productName, quantity, price, total,
  } = req.body;

  let valid = 0;

  const errors = [];

  if (date.length === 10) {
    valid += 1;
  } else {
    errors.push('date should be 10 characters long.');
  }

  if (creator.length > 1) {
    valid += 1;
  } else {
    errors.push('creator should be more than one character long.');
  }

  if (productName.length > 1) {
    valid += 1;
  } else {
    errors.push('productName should be more than one character long.');
  }

  if (typeof quantity === 'number' && quantity > 0) {
    valid += 1;
  } else {
    errors.push('quantity should be a number greater than zero');
  }

  if (typeof price === 'number') {
    valid += 1;
  } else {
    errors.push('price should be a number');
  }

  if (typeof total === 'number' && total === price * quantity) {
    valid += 1;
  } else {
    errors.push('total should be a number equal to price times quantity');
  }

  if (valid < 6) {
    return res.status(422).send({ message: 'Invalid inputs', errors });
  }

  return next();
}

export default validateSales;
