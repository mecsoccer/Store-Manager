import validationLibrary from './library/validationLibrary';

const { validateTextField, validateNumberField } = validationLibrary;

class ValidateSaleInput {
  static validateAddSale(req, res, next) {
    const {
      seller, productName, quantity, price, total,
    } = req.body;

    const sellerValid = validateTextField('seller', seller, 2, 30, /^[a-z]+$/, 'john, doe, jaachi, uche');
    const productNameValid = validateTextField('productName', productName, 2, 30, /^\w+$/, 'sugar_23g, sugar, 3233, shirt');
    const quantityValid = validateNumberField('quantity', quantity, 0, 10000000, /^\d+$/, '4, 18');
    const priceValid = validateNumberField('price', price, 0.01, 100000000.00, /^\d+.\d\d$/, '30.00, 23.34');
    const totalValid = validateNumberField('total', total, 0.01, 100000000.00, /^\d+.\d\d$/, '30000.00, 23500.34');

    if (sellerValid !== true) {
      res.status(422).json({ error: sellerValid });
    } else if (productNameValid !== true) {
      res.status(422).json({ error: productNameValid });
    } else if (quantityValid !== true) {
      res.status(422).json({ error: quantityValid });
    } else if (priceValid !== true) {
      res.status(422).json({ error: priceValid });
    } else if (totalValid !== true) {
      res.status(422).json({ error: totalValid });
    } else {
      next();
    }
  }

  static validateSaleId(req, res, next) {
    const { saleId } = req.params;

    const saleIdValid = validateNumberField('saleId', saleId, 1, 10000000, /^\d+$/, '3, 4, 100');

    if (saleIdValid !== true) {
      res.status(422).json({ error: 'saleId parameter invalid' });
    } else {
      next();
    }
  }
}

export default ValidateSaleInput;
