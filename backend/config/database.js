import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const initDb = async (retries = 10, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      try {
        console.log('[DB] Connected to PostgreSQL');
        return;
      } finally {
        client.release();
      }
    } catch (err) {
      console.log(`[DB] Connection attempt ${i + 1}/${retries} failed: ${err.message}`);
      if (i < retries - 1) {
        await sleep(delay);
      }
    }
  }
  throw new Error('Failed to connect to PostgreSQL after retries');
};

export default pool;