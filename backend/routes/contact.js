import { Router } from 'express';
import { query } from '../config/database.js';

const router = Router();

const CATEGORIES = ['Sponsorship', 'ASV Collaboration', 'AUV Collaboration', 'Media', 'General'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple in-memory rate limit: max 3 submissions per IP per 10 minutes
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 3 };
const rateMap = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const entries = (rateMap.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (entries.length >= RATE_LIMIT.max) {
    rateMap.set(ip, entries);
    return true;
  }
  entries.push(now);
  rateMap.set(ip, entries);
  return false;
};

const validate = ({ name, email, category, message }) => {
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120) {
    return 'Please provide your full name or organization (2-120 characters).';
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > 254) {
    return 'Please provide a valid email address.';
  }
  if (category && !CATEGORIES.includes(category)) {
    return 'Invalid inquiry category.';
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 2000) {
    return 'Your message must be between 10 and 2000 characters.';
  }
  return null;
};

// Ensure the table exists (safe to call repeatedly)
export const ensureContactTable = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(254) NOT NULL,
      category VARCHAR(50) NOT NULL DEFAULT 'General',
      message TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

router.post('/', async (req, res) => {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages sent. Please try again later.',
    });
  }

  const { name, email, category, message } = req.body || {};
  const validationError = validate({ name, email, category, message });
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    await ensureContactTable();
    await query(
      `INSERT INTO contact_messages (name, email, category, message)
       VALUES ($1, $2, $3, $4)`,
      [name.trim(), email.trim().toLowerCase(), category || 'General', message.trim()]
    );
    return res.status(201).json({
      success: true,
      message: 'Message received. The Aterkia team will follow up shortly.',
    });
  } catch (err) {
    console.error('[Contact] Failed to store message:', err.message);
    return res.status(503).json({
      success: false,
      message: 'Our inbox is temporarily unreachable. Please email us directly.',
    });
  }
});

export default router;
