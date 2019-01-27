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
    seller, productName, quantity, price, total,
  } = req.body;

  const query = {
    text: 'INSERT INTO sales(seller, productName, quantity, price, total) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [seller, productName, quantity, price, total],
  };

  pool.query(query)
    .then((sale) => {
      const newSale = sale.rows[0];
      return res.status(201).json({ newSale });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

export default { getAllSales, getSpecificSale, addSale };
