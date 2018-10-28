import pg from 'pg';

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/testdb';
// const client = new pg.Client(connectionString);

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: '06384579hf',
  port: 5432,
})
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)',
);
query.on('end', () => { client.end(); });
