import uniqid from 'uniqid';
import pool from '../models/migration';

function getAllSales(req, res) {
  const seller = req.query.seller === '' ? '%' : req.query.seller;
  const productId = req.query.productId === '' ? '%' : req.query.productId;
  const from = req.query.from ? req.query.from : '2014-08-18';
  const to = req.query.to ? req.query.to : '2019-12-14';

  const query = {
    text: `SELECT * FROM sales
    WHERE (seller LIKE $1 AND productId LIKE $2 AND DATE(date) >= $3 AND DATE(date) <= $4)`,
    values: [seller, productId, from, to],
  };

  pool.query(query)
    .then((sale) => {
      const allSales = sale.rows;
      res.status(200).json({ allSales });
    })
    .catch(/* istanbul ignore next */() => res.status(500).json({ error: 'error occured' }));
}

function getSpecificSale(req, res) {
  const { saleId } = req.params;

  const query = {
    text: 'SELECT * FROM sales WHERE orderId = $1;',
    values: [saleId],
  };

  pool.query(query)
    .then((sales) => {
      const sale = sales.rows;
      res.status(200).json({ sale });
    })
    .catch(/* istanbul ignore next */err => res.status(500).json({ err: err.message }));
}

function updateSoldProducts(id, quantitySold) {
  pool.query('SELECT quantityleft,quantitysold FROM products WHERE id=$1', [id])
    .then((data) => {
      const { quantityleft: rem, quantitysold: sold } = data.rows[0];
      pool.query('UPDATE products SET quantitysold = $1,quantityleft=$2 WHERE id = $3 RETURNING quantityleft,quantitysold;', [sold + quantitySold, rem - quantitySold, id])
        .then().catch();
    }).catch(err => err);
}

function addSale(req, res) {
  const { sales } = req.body;

  if (!sales.length) return res.status(200).json({ message: 'ok' });

  const salesQueryText = 'INSERT INTO sales(seller, productId, orderId, quantity, unitprice, totalprice, productName) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';

  const orderId = uniqid();

  sales.forEach((sale) => {
    const { seller, productId, productName, quantity, unitPrce, totalPrice } = sale;

    pool.query(salesQueryText, [seller, productId, orderId, quantity, unitPrce, totalPrice, productName])
      .then(() => updateSoldProducts(productId, quantity))
      .then(() => res.status(200).json({ status: 'success', orderId }))
      .catch(/* istanbul ignore next */err => res.status(500).json({ error: err.message }));
  });

  return true;
}

export default { getAllSales, getSpecificSale, addSale };
