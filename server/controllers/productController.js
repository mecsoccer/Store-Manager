import pool from '../models/migration';

class ProductController {
  static getAllProducts(req, res) {
    const query = {
      text: 'SELECT * FROM products ORDER BY productName',
      values: [],
    };

    pool.query(query)
      .then((all) => {
        const allProducts = all.rows;
        res.status(200).json({ allProducts });
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  static getAvailableProducts(req, res) {
    const query = {
      text: 'SELECT * FROM products WHERE quantityleft>0 ORDER BY productName',
    };

    pool.query(query)
      .then((available) => {
        const availableProducts = available.rows;
        res.status(200).json({ availableProducts });
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  static getFinishedProducts(req, res) {
    const query = {
      text: 'SELECT * FROM products where quantityLeft < 1 ORDER BY productName',
    };

    pool.query(query)
      .then((finished) => {
        const finishedProducts = finished.rows;
        res.status(200).json({ finishedProducts });
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  static getSpecificProduct(req, res) {
    const { productId } = req.params;

    const query = {
      text: 'SELECT * FROM products WHERE id = $1;',
      values: [productId],
    };

    pool.query(query)
      .then((productArray) => {
        const product = productArray.rows[0];
        if (product) {
          res.status(200).json({ product });
        } else {
          res.status(404).json({ error: `product with id of '${productId}' does not exist` });
        }
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  static addProduct(req, res) {
    const {
      productName, productCategory, quantityLeft, quantitySold, price, minQuantity,
    } = req.body;

    const query = {
      text: 'INSERT INTO products(productName, productCategory, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [productName, productCategory, quantityLeft, quantitySold, price, minQuantity],
    };

    // check if product name already exists. product name should be unique
    pool.query('SELECT * FROM products WHERE productName=$1;', [productName])
      .then((data) => {
        if (!data.rows[0]) {
          pool.query(query)
            .then((productArray) => {
              const newProduct = productArray.rows[0];
              res.status(201).json({ newProduct });
            })
            .catch((err) => {
              /* istanbul ignore next */res.status(500).json(err);
            });
        } else {
          res.status(409).json({ error: 'product name alread exists. choose another name' });
        }
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  static updateProductDetails(req, res) {
    const {
      productName, productCategory, quantityLeft, price, minQuantity,
    } = req.body;
    const { productId } = req.params;

    const query = {
      text: 'UPDATE products SET productName = $1, productCategory =$2, quantityLeft = $3, price = $4, minQuantity = $5 WHERE id = $6 RETURNING *;',
      values: [productName, productCategory, quantityLeft, price, minQuantity, productId],
    };

    pool.query(query)
      .then((productArray) => {
        const updatedProduct = productArray.rows[0];
        if (!productArray.rows[0]) {
          return res.status(404).json({ error: 'product with supplied id does not exist' });
        }
        return res.status(200).json({ updatedProduct });
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  static updateQuantitySold(req, res) {
    const { quantitySold } = req.body;
    const { productId } = req.params;

    pool.query('SELECT quantityLeft, quantitySold FROM products WHERE id = $1;', [productId])
      .then((data) => {
        if (data.rowCount) {
          const { quantityleft, quantitysold: dbQuantitySold } = data.rows[0];
          const newQuantityLeft = Number(quantityleft) - Number(quantitySold);

          if (newQuantityLeft >= 0) {
            const newQuantitySold = Number(quantitySold) + Number(dbQuantitySold);
            const queryText = 'UPDATE products SET quantityLeft=$1, quantitySold=$2 WHERE id=$3 RETURNING *;';
            const queryValues = [newQuantityLeft, newQuantitySold, productId];

            pool.query(queryText, queryValues)
              .then((productArray) => {
                const updatedProduct = productArray.rows[0];
                if (updatedProduct) {
                  res.status(200).json({ updatedProduct });
                } else {
                  res.status(404).json({ error: 'product id supplied does not exist' });
                }
              })
              .catch(/* istanbul ignore next */err => res.status(500).json(err));
          } else {
            res.status(422).json({ error: 'quantity sold surpasses available quantity' });
          }
        } else {
          res.status(404).json({ error: 'product id supplied does not exist' });
        }
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }

  static deleteProduct(req, res) {
    const { productId } = req.params;

    pool.query('DELETE FROM products WHERE id = $1 RETURNING *;', [productId])
      .then((productArray) => {
        const deletedProduct = productArray.rows[0];
        if (deletedProduct) {
          res.status(200).json({ deletedProduct });
        } else {
          res.status(404).json({ error: 'product with supplied id does not exist' });
        }
      })
      .catch(/* istanbul ignore next */err => res.status(500).json(err));
  }
}

export default ProductController;
