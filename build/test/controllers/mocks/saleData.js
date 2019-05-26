"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var salesData = {
  exampleSale: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: '2',
    price: '20.00',
    total: '40.00'
  },
  omittedField: {
    seller: 'jaachimma',
    quantity: '2',
    price: '20.00',
    total: '40.00'
  },
  wrongSellerName: {
    seller: 'Jaachimma',
    productName: 'bag',
    quantity: '2',
    price: '20.00',
    total: '40.00'
  },
  wrongProductName: {
    seller: 'jaachimma',
    productName: '---bag',
    quantity: '2',
    price: '20.00',
    total: '40.00'
  },
  wrongQuantity: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: 'two',
    price: '20.00',
    total: '40.00'
  },
  wrongPrice: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: '2',
    price: 'twenty',
    total: '40.00'
  },
  wrongTotal: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: '2',
    price: '20.00',
    total: 'forty'
  },
  longSellerName: {
    seller: 'jaachimmaonyenzendukwaoguguoonyenzennanyerechiomajaneonyenze'
  },
  zeroQuantity: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: '0',
    price: '20.00',
    total: 'forty'
  }
};
var _default = salesData;
exports.default = _default;
//# sourceMappingURL=saleData.js.map