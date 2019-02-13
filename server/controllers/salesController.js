import pool from '../models/migration';

function getAllSales(req, res) {
  const query = {
    text: 'SELECT * FROM sales',
    values: [],
  };

  pool.query(query)
    .then((sale) => {
      const allSales = sale.rows;
      res.status(200).json({ allSales });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function getSpecificSale(req, res) {
  const { saleId } = req.params;

  const query = {
    text: 'SELECT * FROM sales WHERE id = $1;',
    values: [saleId],
  };

  pool.query(query)
    .then((sale) => {
      const requestedSale = sale.rows[0];
      return requestedSale;
    })
    .then((sale) => {
      const { id } = sale;
      if (typeof id === 'number') {
        return res.status(200).json({ sale });
      }
      return res.status(404).json({ message: 'sorry, the sale record does not exist' });
    })
    .catch(() => {
      res.status(404).json({ message: 'sorry, the sale record does not exist' });
    });
}

function addSale(req, res) {
  const {
    seller, productName, quantitySold, price, total, productId,
  } = req.body;

  const query = {
    text: 'INSERT INTO sales(seller, productName, quantity, price, total) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [seller, productName, quantitySold, price, total],
  };

  pool.query(query)
    .then((sale) => {
      const newSale = sale.rows[0];
      return newSale;
    })
    .then((newSale) => {
      const query1 = {
        text: 'SELECT quantityleft,quantitysold FROM products WHERE id = $1;',
        values: [productId],
      };
      pool.query(query1)
        .then((data) => {
          const { quantityleft, quantitysold } = data.rows[0];
          const newQuantityLeft = Number(quantityleft) - Number(quantitySold);
          const newQuantitySold = Number(quantitysold) + Number(quantitySold);
          return { newQuantityLeft, newQuantitySold };
        })
        .then((data) => {
          const { newQuantityLeft, newQuantitySold } = data;
          const query2 = {
            text: 'UPDATE products SET quantityleft = $1, quantitysold = $2 WHERE id = $3;',
            values: [newQuantityLeft, newQuantitySold, productId],
          };
          pool.query(query2)
            .then((product) => {
              const updatedProduct = product;
              return updatedProduct;
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
      return newSale;
    })
    .then((newSale) => {
      res.status(201).json({ newSale });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

export default { getAllSales, getSpecificSale, addSale };
