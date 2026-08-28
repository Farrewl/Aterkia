import { Router } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';

const router = Router();

const CATEGORIES = ['Sponsorship', 'ASV Collaboration', 'AUV Collaboration', 'Media', 'General'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple in-memory rate limit: max 3 submissions per IP per 10 minutes
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 3 };
const rateMap = new Map();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'application/zip'];
    cb(allowed.includes(file.mimetype) ? null : new Error('UNSUPPORTED_FILE'), allowed.includes(file.mimetype));
  },
});

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const formatMessageHtml = (message) => escapeHtml(message)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/__(.+?)__/g, '<u>$1</u>')
  .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
  .replace(/\n/g, '<br>');

const getTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
};

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

router.post('/', (req, res) => upload.single('attachment')(req, res, async (uploadError) => {
  if (uploadError) {
    const message = uploadError.code === 'LIMIT_FILE_SIZE'
      ? 'Attachment must be 5 MB or smaller.'
      : 'Unsupported attachment. Use PDF, DOC, DOCX, PNG, JPG, or ZIP.';
    return res.status(400).json({ success: false, message });
  }
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
    const transporter = getTransporter();
    if (!transporter || !process.env.CONTACT_TO_EMAIL) {
      return res.status(503).json({ success: false, message: 'Email service is not configured yet.' });
    }
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email.trim().toLowerCase(),
      subject: `[Aterkia Contact] ${category || 'General'} from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nCategory: ${category || 'General'}\n\n${message.trim()}`,
      html: `<h2>Aterkia Contact Message</h2><p><strong>Name:</strong> ${escapeHtml(name.trim())}</p><p><strong>Email:</strong> ${escapeHtml(email.trim().toLowerCase())}</p><p><strong>Category:</strong> ${escapeHtml(category || 'General')}</p><hr><p>${formatMessageHtml(message.trim())}</p>`,
      attachments: req.file ? [{ filename: req.file.originalname, content: req.file.buffer, contentType: req.file.mimetype }] : [],
    });
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
}));

export default router;
