import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
let ssl = false;

connectionString = process.env.DATABASE_URI;
if (process.env.NODE_ENV === 'test') connectionString = 'postgres://jaachimma:password@localhost:5432/store_manager';
if (process.env.NODE_ENV === 'production') ssl = true;

const { Pool } = pg;
const pool = new Pool({ connectionString, ssl });

export default pool;
