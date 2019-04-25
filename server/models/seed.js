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

function migrateProduct(name, category, quantityLeft, quantitySold, price, minQuantity) {
  const query = {
    text: 'INSERT INTO products(name, category, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [name, category, quantityLeft, quantitySold, price, minQuantity],
  };

  pool.query(query);
}

function migrateSale(seller, productName, quantitySold, price, total) {
  const query = {
    text: 'INSERT INTO sales(seller, productName, quantity, price, total) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [seller, productName, quantitySold, price, total],
  };
  pool.query(query);
}

const migrateUserPromise = new Promise((resolve) => {
  migrateUser('admin', 'admin123ABC#', 'ad@jmail.com', 'admin');
  resolve(true);
});

migrateUserPromise
  .then((res) => {
    migrateUser('attendant', 'attendant1A#', 'atten@jmail.com', 'attendant');
    return res;
  })
  .then(() => {
    migrateUser('anonimous', 'anonimous123ABC#', 'anonimous@jmail.com', 'attendant');
  });

migrateProduct('charger', 'electronics', 50, 1, '10.00', 1);
migrateProduct('chair', 'furniture', 50, 1, '10.00', 1);

migrateSale('anonimous', 'charger', 3, '10.00', '30.00');
migrateSale('anonimous', 'chair', 3, '10.00', '30.00');
migrateSale('anonimous', 'chair', 3, '10.00', '30.00');
