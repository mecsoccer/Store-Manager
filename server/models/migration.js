import pool from './database';

pool.query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY NOT NULL, username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,email VARCHAR(50) NOT NULL UNIQUE,role TEXT NOT NULL)`);
pool.query(`CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY NOT NULL,
    productName TEXT NOT NULL UNIQUE,productCategory TEXT NOT NULL, quantityLeft INT NOT NULL, quantitySold INT NOT NULL,
    price NUMERIC(20,2),minQuantity INT NOT NULL)`);
pool.query(`CREATE TABLE IF NOT EXISTS sales(orderId TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,seller TEXT NOT NULL, productId TEXT NOT NULL, productName TEXT NOT NULL,
    quantity INT NOT NULL,unitprice NUMERIC(20,2), totalprice NUMERIC(20,2))`);

export default pool;
