import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URI;
let ssl = false;

if (process.env.NODE_ENV === 'production') ssl = true;

const { Pool } = pg;
const pool = new Pool({ connectionString, ssl });

export default pool;
