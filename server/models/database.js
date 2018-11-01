import pg from 'pg';
import dotenv from 'dotenv';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:06384579hf@localhost:5432/postgres';

const { Pool } = pg;
const pool = new Pool({ connectionString });

export default pool;
