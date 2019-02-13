import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './database';

dotenv.config();

function migrateUser(username, password, email, role) {
  const hash = bcrypt.hashSync(password, 10);
  const query = {
    text: 'INSERT INTO Users(username,password,email,role) VALUES($1, $2, $3, $4) RETURNING username,email,role',
    values: [username, hash, email, role],
  };

  pool.query(query);
}

function migrateProduct(name, category, quantityLeft, quantitySold, price, minQuantity) {
  const query = {
    text: 'INSERT INTO Products(name, category, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $5, $6) RETURNING *',
    values: [name, category, quantityLeft, quantitySold, price, minQuantity],
  };

  pool.query(query);
}

migrateUser('admin', 'admin', 'theadmin@jmail.com', 'admin');
migrateUser('attendant', 'attendant', 'theattendant@jmail.com', 'attendant');

migrateProduct('charger', 'electronics', 50, 1, '10.00', 1);
