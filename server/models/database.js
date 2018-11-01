import pg from 'pg';
import dotenv from 'dotenv';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:06384579hf@localhost:5432/postgres';
let ssl = false;

if (process.env.NODE_ENV) ssl = true;

const { Pool } = pg;
const pool = new Pool({ connectionString, ssl });

export default pool;
