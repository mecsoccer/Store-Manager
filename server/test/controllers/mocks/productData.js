const productData = {
  exampleProduct: {
    productName: 'junk',
    productCategory: 'provisions',
    quantityLeft: '20',
    quantitySold: '10',
    price: '800.00',
    minQuantity: '4',
  },
  invalidProduct: {
    productName: '^$$',
    productCategory: 'provisions',
    quantityLeft: '20',
    quantitySold: '10',
    price: '800.00',
    minQuantity: '4',
  },
  updateProductDetails: {
    productName: 'biscuits',
    productCategory: 'provisions',
    quantityLeft: '50',
    price: '800.00',
    minQuantity: '4',
  },
  invalidProductDetails: {
    productname: 'biscuits',
    productCategory: 'provisions',
    price: '800',
    minQuantity: '4',
  },
  updateQuantitySold: {
    quantitySold: '10',
  },
  invalidQuantitySold: {
    quantityLeft: '50.00',
    quantitysold: '10.00',
  },
};

export default productData;
