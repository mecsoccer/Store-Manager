import pool from '../models/migration';

function getAllProducts(req, res) {
  const query = {
    text: 'SELECT * FROM products',
    values: [],
  };

  pool.query(query)
    .then((all) => {
      const allProducts = all.rows;
      res.status(200).json({ allProducts });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function getSpecificProduct(req, res) {
  const { productId } = req.params;

  const query = {
    text: 'SELECT * FROM products WHERE id = $1;',
    values: [productId],
  };

  pool.query(query)
    .then((requestedProduct) => {
      const product = requestedProduct.rows[0];
      return res.status(200).json({ product });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function addProduct(req, res) {
  const {
    name, category, quantityLeft, quantitySold, price, minQuantity,
  } = req.body;

  const query = {
    text: 'INSERT INTO products(name, category, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [name, category, quantityLeft, quantitySold, price, minQuantity],
  };

  pool.query(query)
    .then((product) => {
      const newProduct = product.rows[0];
      return res.status(201).json({ newProduct });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function updateProduct(req, res) {
  const {
    name, quantityLeft, quantitySold,
  } = req.body;
  const { productId } = req.params;

  const query = {
    text: 'UPDATE products SET quantityLeft = $1, quantitySold = $2 WHERE name = $3 AND id = $4;',
    values: [quantityLeft, quantitySold, name, productId],
  };

  pool.query(query)
    .then((product) => {
      const updatedProduct = product;
      return res.status(200).json({ updatedProduct });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function deleteProduct(req, res) {
  const { productId } = req.params;
  const { name } = req.body;

  const query = {
    text: 'DELETE FROM products WHERE id = $1 AND name = $2;',
    values: [productId, name],
  };

  pool.query(query)
    .then((product) => {
      const deletedProduct = product;
      return res.status(200).json({ deletedProduct });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
}

export default {
  getAllProducts, getSpecificProduct, addProduct, updateProduct, deleteProduct,
};
