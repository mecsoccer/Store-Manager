import products from '../models/products';

function getAllProducts(req, res) {
  return res.status(200).json(products);
}

function getSpecificProduct(req, res) {
  const { productId } = req.params;
  let requestedProduct = null;

  products.forEach((product) => {
    if (product.id == productId) {
      requestedProduct = product;
    }
  });

  if (requestedProduct === null) return res.status(404).json({ message: 'Sorry, product does not exist' });

  return res.status(200).json(requestedProduct);
}

function addProduct(req, res) {
  const {
    name, category, quantityLeft, quantitySold, price, minQuantity,
  } = req.body;

  const id = products.length + 1;

  const newProduct = {
    id, name, category, quantityLeft, quantitySold, price, minQuantity,
  };

  products.push(newProduct);
  return res.status(201).json({ message: 'product successfully created', newProduct });
}

export default { getAllProducts, getSpecificProduct, addProduct };
