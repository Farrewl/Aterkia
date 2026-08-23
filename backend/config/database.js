import pg from 'pg';

const { Pool } = pg;

const createPool = (connectionString) =>
  new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

let pool;

const resolveDatabaseUrl = () => {
  const primary = process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/aterkia';
  if (primary.includes('@db:')) {
    return { primary, fallback: primary.replace('@db:', '@localhost:') };
  }
  return { primary, fallback: primary };
};

pool = createPool(resolveDatabaseUrl().primary);

pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client', err.message);
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const initDb = async (retries = 10, delay = 2000) => {
  const { primary, fallback } = resolveDatabaseUrl();

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

      if (i === Math.floor(retries / 2) && fallback !== primary) {
        console.log(`[DB] Switching to fallback URL: ${fallback.replace(/\/\/.*@/, '//***@')}`);
        pool.end().catch(() => {});
        pool = createPool(fallback);
        pool.on('error', (e) => console.error('[DB] Unexpected error on idle client', e.message));
      }

      if (i < retries - 1) {
        await sleep(delay);
      }
    }
  }
  throw new Error('Failed to connect to PostgreSQL after retries');
};

export default pool;
