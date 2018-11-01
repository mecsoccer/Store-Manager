import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_URL_DEV;
} else if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
}

const { Pool } = pg;
const pool = new Pool({ connectionString });

export default pool;
