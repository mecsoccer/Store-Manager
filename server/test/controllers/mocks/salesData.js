const salesData = {
  exampleSale: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: '2',
    price: '20.00',
    total: '40.00',
    productId: '1',
  },
  wrongSellerName: {
    seller: 'Jaachimma',
    productName: 'bag',
    quantity: '2',
    price: '20.00',
    total: '40.00',
  },
  wrongProductName: {
    seller: 'jaachimma',
    productName: '---bag',
    quantity: '2',
    price: '20.00',
    total: '40.00',
  },
  wrongQuantity: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: 'two',
    price: '20.00',
    total: '40.00',
  },
  wrongPrice: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: '2',
    price: 'twenty',
    total: '40.00',
  },
  wrongTotal: {
    seller: 'jaachimma',
    productName: 'bag',
    quantity: '2',
    price: '20.00',
    total: 'forty',
  },
};

export default salesData;
