import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './database';

dotenv.config();

function migrateUser(username, password, email, role) {
  const hash = bcrypt.hashSync(password, 10);
  const query = {
    text: ` INSERT INTO
            users(username, password, email, productSold, noOfSales, worthOfSales, role)
            VALUES($1, $2, $3, $4, $5, $6, $7);`,
    values: [username, hash, email, 0, 0, 0, role],
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

function migrateSale(seller, productName, quantitySold, price, total, productId) {
  const query = {
    text: 'INSERT INTO sales(seller, productName, quantity, price, total) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [seller, productName, quantitySold, price, total],
  };
  pool.query(query);
}

migrateUser('admin', 'admin', 'theadmin@jmail.com', 'admin');
migrateUser('attendant', 'attendant', 'theattendant@jmail.com', 'attendant');

migrateProduct('charger', 'electronics', 50, 1, '10.00', 1);
migrateProduct('chair', 'furniture', 50, 1, '10.00', 1);

migrateSale('attendant', 'charger', 3, '10.00', '30.00');
migrateSale('attendant', 'chair', 3, '10.00', '30.00');
