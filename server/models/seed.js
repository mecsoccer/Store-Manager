import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './database';

dotenv.config();

function migrateUser(username, password, email, role) {
  const hash = bcrypt.hashSync(password, 10);
  const query = {
    text: 'INSERT INTO users(username, password, email, role) VALUES($1, $2, $3, $4);',
    values: [username, hash, email, role],
  };

  pool.query(query);
}

function migrateProduct(
  productName, productCategory, quantityLeft, quantitySold, price, minQuantity,
) {
  const query = {
    text: 'INSERT INTO products(productName, productCategory, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [productName, productCategory, quantityLeft, quantitySold, price, minQuantity],
  };

  pool.query(query);
}

function migrateSale(orderId, seller, productId, productName, quantity, unitPrice, totalPrice) {
  const query = {
    text: 'INSERT INTO sales(seller, productId, quantity, unitPrice, totalPrice, orderId, productName) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [seller, productId, quantity, unitPrice, totalPrice, orderId, productName],
  };
  pool.query(query);
}

const migrateUserPromise = new Promise((resolve) => {
  migrateUser('admin', 'admin123ABC#', 'ad@jmail.com', 'admin');
  resolve(true);
});

migrateUserPromise
  .then((res) => {
    migrateUser('attendant', 'attendantA1#', 'atten@jmail.com', 'attendant');
    return res;
  })
  .then(() => {
    migrateUser('anonimous', 'anonimousABC123#', 'anonimous@jmail.com', 'attendant');
  });

migrateProduct('charger', 'electronics', 50, 1, '10.00', 1);
migrateProduct('chair', 'furniture', 50, 1, '10.00', 1);
migrateProduct('sugar', 'provisions', 0, 50, '10.00', 1);

migrateSale('g2pcfj9wk3zs3qf3', '1', '3', 'biscuits', 3, '200.00', '600.00');
migrateSale('g2pcfj9wk3zs3qf3', '1', '1', 'sugar', 3, '200.00', '600.00');
migrateSale('24zuq33ck40z84ba', '3', '3', 'biscuits', 1, '200.00', '600.00');
migrateSale('24zuq33ck40z84ba', '3', '5', 'hp_pavillion_15', 1, '200000.00', '200000.00');
