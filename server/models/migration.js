import pool from './database';

pool.query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY NOT NULL, username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,email VARCHAR(50) NOT NULL,productSold INT NOT NULL,noOfSales INT NOT NULL,
    worthOfSales INT NOT NULL,role TEXT NOT NULL)`);
pool.query(`CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,category TEXT NOT NULL, quantityLeft INT NOT NULL, quantitySold INT NOT NULL,
    price NUMERIC(20,2),minQuantity INT NOT NULL)`);
pool.query(`CREATE TABLE IF NOT EXISTS sales(id SERIAL PRIMARY KEY NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,seller TEXT NOT NULL, productName TEXT NOT NULL,
    quantity INT NOT NULL,price NUMERIC(20,2), total NUMERIC(20,2))`);

export default pool;
