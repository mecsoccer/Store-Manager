import pool from './database';

pool.query('TRUNCATE TABLE users RESTART IDENTITY;');
pool.query('TRUNCATE TABLE products RESTART IDENTITY;');
pool.query('TRUNCATE TABLE sales RESTART IDENTITY;');
