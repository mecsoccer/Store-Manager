import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '06384579hf',
  port: 5432,
});

export default pool;
