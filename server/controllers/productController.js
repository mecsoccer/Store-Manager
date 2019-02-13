import pool from '../models/migration';

class ProductController {
  static getAllProducts(req, res) {
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

  static getAvailableProducts(req, res) {
    const query = {
      text: 'SELECT * FROM products where quantityLeft > 0',
    };

    pool.query(query)
      .then((available) => {
        const availableProducts = available.rows;
        res.status(200).json({ availableProducts });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getFinishedProducts(req, res) {
    const query = {
      text: 'SELECT * FROM products where quantityLeft < 1',
    };

    pool.query(query)
      .then((finished) => {
        const finishedProducts = finished.rows;
        res.status(200).json({ finishedProducts });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static getSpecificProduct(req, res) {
    const { productId } = req.params;

    const query = {
      text: 'SELECT * FROM products WHERE id = $1;',
      values: [productId],
    };

    pool.query(query)
      .then((requestedProduct) => {
        const product = requestedProduct.rows[0];
        return product;
      })
      .then((product) => {
        const { id } = product;
        if (typeof id === 'number') {
          return res.status(200).json({ product });
        }
      })
      .catch(() => {
        res.status(404).json({ message: 'sorry, product does not exist' });
      });
  }

  static addProduct(req, res) {
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

  static updateProduct(req, res) {
    const {
      name, category, quantityLeft, price, minQuantity,
    } = req.body;
    const { productId } = req.params;

    const query = {
      text: 'UPDATE products SET name = $1, category =$2, quantityLeft = $3, price = $4, minQuantity = $5 WHERE id = $6;',
      values: [name, category, quantityLeft, price, minQuantity, productId],
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

  static deleteProduct(req, res) {
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
}

export default ProductController;
