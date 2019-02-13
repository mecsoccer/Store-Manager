function validateSales(req, res, next) {
  const {
    seller, productName, quantitySold, price, total, productId,
  } = req.body;

  const sellerExp = /^[a-z]+$/g;
  const productNameExp = /^\w+$/g;
  const monetaryExp = /^\d+\.\d\d$/;
  const integerExp = /^\d+$/;

  if (sellerExp.test(seller) === false) {
    return res.status(422).json({
      error: true,
      message: 'seller should be a lowercase name without spaces eg. john',
    });
  }

  if (productNameExp.test(productName) === false) {
    return res.status(422).json({
      error: true,
      message: "product name must be a string preceeded by alphabets and can contain spaces, underscores, alphabets, numbers eg. 'dangote cement_50kg'",
    });
  }

  if (integerExp.test(quantitySold) === false) {
    return res.status(422).json({
      error: true,
      message: 'quantitySold must be an integer.',
    });
  }

  if (monetaryExp.test(price) === false) {
    return res.status(422).json({
      error: true,
      message: "price must be a number having two decimal places enclosed in quotes eg. '20.00'",
    });
  }

  if (monetaryExp.test(total) === false) {
    return res.status(422).json({
      error: true,
      message: "total must be a number having two decimal places enclosed in quotes eg. '20.00'",
    });
  }

  if (integerExp.test(productId) === false) {
    return res.status(422).json({
      error: true,
      message: 'productId must be an integer.',
    });
  }

  return next();
}

export default validateSales;
