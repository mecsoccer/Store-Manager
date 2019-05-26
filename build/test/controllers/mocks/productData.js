"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var productData = {
  exampleProduct: {
    productName: 'junk',
    productCategory: 'provisions',
    quantityLeft: '20',
    quantitySold: '10',
    price: '800.00',
    minQuantity: '4'
  },
  invalidProductName: {
    productName: '^$$',
    productCategory: 'provisions',
    quantityLeft: '20',
    quantitySold: '10',
    price: '800.00',
    minQuantity: '4'
  },
  invalidProductCategory: {
    productName: 'bread',
    productCategory: '$8provision',
    quantityLeft: '20',
    quantitySold: '10',
    price: '800.00',
    minQuantity: '4'
  },
  invalidProductLeft: {
    productName: 'bread',
    productCategory: 'provisions',
    quantityLeft: 'twenty',
    quantitySold: '10',
    price: '800.00',
    minQuantity: '4'
  },
  invalidProductSold: {
    productName: 'bread',
    productCategory: 'provisions',
    quantityLeft: '20',
    quantitySold: '20.00',
    price: '800.00',
    minQuantity: '4'
  },
  invalidProductPrice: {
    productName: 'bread',
    productCategory: 'provisions',
    quantityLeft: '20',
    quantitySold: '10',
    price: '800',
    minQuantity: '4'
  },
  invalidMinQuantity: {
    productName: 'bread',
    productCategory: 'provisions',
    quantityLeft: '20',
    quantitySold: '10',
    price: '800.00',
    minQuantity: '4.00'
  },
  updateProductDetails: {
    productName: 'biscuits',
    productCategory: 'provisions',
    quantityLeft: '50',
    price: '800.00',
    minQuantity: '4'
  },
  invalidProductDetails: {
    productname: 'biscuits',
    productCategory: 'provisions',
    price: '800',
    minQuantity: '4'
  },
  updateQuantitySold: {
    quantitySold: '10'
  },
  invalidQuantitySold: {
    quantityLeft: '50.00',
    quantitysold: '10.00'
  }
};
var _default = productData;
exports.default = _default;
//# sourceMappingURL=productData.js.map