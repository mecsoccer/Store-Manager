import validationLibrary from './library/validationLibrary';

const { validateTextField, validateNumberField } = validationLibrary;

class ValidateProduct {
  static validateAddProduct(req, res, next) {
    const {
      productName, productCategory, quantityLeft, quantitySold, price, minQuantity,
    } = req.body;

    const productNameValid = validateTextField('productName', productName, 2, 30, /^\w+$/, 'sugar_23g, sugar, 3233, shirt');
    const productCategoryValid = validateTextField('productCategory', productCategory, 2, 15, /^\w+$/, 'provisions, clothing');
    const quantityLeftValid = validateNumberField('quantityLeft', quantityLeft, 0, 10000000, /^\d+$/, '4 or 64');
    const quantitySoldValid = validateNumberField('quantitySold', quantitySold, 0, 10000000, /^\d+$/, '4, 18');
    const priceValid = validateNumberField('price', price, 0.01, 100000000, /^\d+.\d\d$/, '30.00, 23.34');
    const minQuantityValid = validateNumberField('minQuantity', minQuantity, 1, 100000000, /^\d+$/, '4, 18');

    if (productNameValid !== true) {
      res.status(422).json({ error: productNameValid });
    } else if (productCategoryValid !== true) {
      res.status(422).json({ error: productCategoryValid });
    } else if (quantityLeftValid !== true) {
      res.status(422).json({ error: quantityLeftValid });
    } else if (quantitySoldValid !== true) {
      res.status(422).json({ error: quantitySoldValid });
    } else if (priceValid !== true) {
      res.status(422).json({ error: priceValid });
    } else if (minQuantityValid !== true) {
      res.status(422).json({ error: minQuantityValid });
    } else {
      next();
    }
  }

  static validateUpdateDetails(req, res, next) {
    const {
      productName, productCategory, quantityLeft, price, minQuantity,
    } = req.body;
    const { productId } = req.params;

    const productIdValid = validateNumberField('productId', productId, 1, 100000, /^\d+$/, '3, 4, 100');
    const productNameValid = validateTextField('productName', productName, 2, 30, /^\w+$/, 'sugar_23g, sugar, 3233, shirt');
    const productCategoryValid = validateTextField('productCategory', productCategory, 2, 15, /^\w+$/, 'provisions, clothing');
    const quantityLeftValid = validateNumberField('quantityLeft', quantityLeft, 0, 10000000, /^\d+$/, '4 or 64');
    const priceValid = validateNumberField('price', price, 0.01, 100000000, /^\d+.\d\d$/, '30.00, 23.34');
    const minQuantityValid = validateNumberField('minQuantity', minQuantity, 1, 100000000, /^\d+$/, '4, 18');

    if (productIdValid !== true) {
      res.status(422).json({ error: 'productId parameter invalid' });
    } else if (productNameValid !== true) {
      res.status(422).json({ error: productNameValid });
    } else if (productCategoryValid !== true) {
      res.status(422).json({ error: productCategoryValid });
    } else if (quantityLeftValid !== true) {
      res.status(422).json({ error: quantityLeftValid });
    } else if (priceValid !== true) {
      res.status(422).json({ error: priceValid });
    } else if (minQuantityValid !== true) {
      res.status(422).json({ error: minQuantityValid });
    } else {
      next();
    }
  }

  static validateSalesData(req, res, next) {
    const { quantitySold } = req.body;
    const { productId } = req.params;

    const productIdValid = validateNumberField('productId', productId, 1, 100000, /^\d+$/, '3, 4, 100');
    const quantitySoldValid = validateNumberField('quantitySold', quantitySold, 1, 10000000, /^\d+$/, '4, 18');

    if (productIdValid !== true) {
      res.status(422).json({ error: 'productId parameter invalid' });
    } else if (quantitySoldValid !== true) {
      res.status(422).json({ error: quantitySoldValid });
    } else {
      next();
    }
  }

  static validateProductId(req, res, next) {
    const { productId } = req.params;

    const productIdValid = validateNumberField('productId', productId, 1, 100000, /^\d+$/, '3, 4, 100');

    if (productIdValid !== true) {
      res.status(422).json({ error: 'productId parameter invalid' });
    } else {
      next();
    }
  }
}

export default ValidateProduct;
