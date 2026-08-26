import express from 'express';
import crypto from 'crypto';
import { query } from '../config/database.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { setRefreshTokenCookie, clearRefreshTokenCookie, getRefreshTokenFromCookie } from '../utils/cookies.js';
import { verifyGoogleIdToken } from '../config/google.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const createUserSession = async (userId) => {
  const accessToken = signAccessToken({ sub: userId });
  const refreshToken = signRefreshToken({ sub: userId, type: 'refresh' });
  const refreshTokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
    [userId, refreshTokenHash, expiresAt]
  );

  return { accessToken, refreshToken };
};

const revokeRefreshToken = async (tokenHash) => {
  await query(
    `UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = $1`,
    [tokenHash]
  );
};

const revokeAllUserTokens = async (userId) => {
  await query(
    `UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL`,
    [userId]
  );
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Email, password, and name are required',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters',
      });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
      });
    }

    const passwordHash = await hashPassword(password);

    const result = await query(
      `INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)
       RETURNING id, email, name, avatar_url, role, division, created_at`,
      [email.toLowerCase(), passwordHash, name]
    );

    const user = result.rows[0];
    const { accessToken, refreshToken } = await createUserSession(user.id);

    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar_url,
          role: user.role,
          division: user.division,
        },
        accessToken,
      },
    });
  } catch (err) {
    console.error('[Auth] Register error:', err);
    return res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    const result = await query(
      `SELECT id, email, password_hash, name, avatar_url, role, division, is_active
       FROM users WHERE email = $1`,
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        error: 'Account deactivated',
      });
    }

    if (!user.password_hash) {
      return res.status(401).json({
        success: false,
        error: 'This account uses Google login. Please use "Continue with Google".',
      });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const { accessToken, refreshToken } = await createUserSession(user.id);

    setRefreshTokenCookie(res, refreshToken);

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar_url,
          role: user.role,
          division: user.division,
        },
        accessToken,
      },
    });
  } catch (err) {
    console.error('[Auth] Login error:', err);
    return res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ success: false, error: 'Google credential required' });
    }

    const payload = await verifyGoogleIdToken(credential);

    if (!payload.email_verified) {
      return res.status(400).json({ success: false, error: 'Google email not verified' });
    }

    const email = payload.email.toLowerCase();
    const googleId = payload.sub;
    const name = payload.name;
    const avatar = payload.picture;

    let result = await query(
      `SELECT id, email, name, avatar_url, role, division, is_active, google_id
       FROM users WHERE email = $1 OR google_id = $2`,
      [email, googleId]
    );

    let user;

    const isAdminEmail = email === 'ibnufirdaus2030@gmail.com';

    if (result.rows.length === 0) {
      const insertResult = await query(
        `INSERT INTO users (email, google_id, name, avatar_url, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, name, avatar_url, role, division, created_at`,
        [email, googleId, name, avatar, isAdminEmail ? 'admin' : 'user']
      );
      user = insertResult.rows[0];
    } else {
      user = result.rows[0];

      if (isAdminEmail && user.role !== 'admin') {
        await query('UPDATE users SET role = $1 WHERE id = $2', ['admin', user.id]);
        user.role = 'admin';
      }

      if (!user.google_id) {
        await query('UPDATE users SET google_id = $1 WHERE id = $2', [googleId, user.id]);
      }

      if (avatar && avatar !== user.avatar_url) {
        await query('UPDATE users SET avatar_url = $1 WHERE id = $2', [avatar, user.id]);
        user.avatar_url = avatar;
      }
    }

    if (!user.is_active) {
      return res.status(403).json({ success: false, error: 'Account deactivated' });
    }

    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const { accessToken, refreshToken } = await createUserSession(user.id);

    setRefreshTokenCookie(res, refreshToken);

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar_url,
          role: user.role,
          division: user.division,
        },
        accessToken,
      },
    });
  } catch (err) {
    console.error('[Auth] Google login error:', err);
    return res.status(500).json({ success: false, error: 'Google login failed' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = getRefreshTokenFromCookie(req);

    if (!refreshToken) {
      return res.status(401).json({ success: false, error: 'Refresh token required' });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({ success: false, error: 'Invalid refresh token', code: 'INVALID_REFRESH' });
    }

    const tokenHash = hashToken(refreshToken);

    const result = await query(
      `SELECT rt.id, rt.user_id, rt.expires_at, rt.revoked_at, u.is_active, u.email, u.name, u.avatar_url, u.role, u.division
       FROM refresh_tokens rt
       JOIN users u ON u.id = rt.user_id
       WHERE rt.token_hash = $1`,
      [tokenHash]
    );

    if (result.rows.length === 0) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({ success: false, error: 'Refresh token not found', code: 'TOKEN_NOT_FOUND' });
    }

    const tokenData = result.rows[0];

    if (tokenData.revoked_at) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({ success: false, error: 'Token revoked', code: 'TOKEN_REVOKED' });
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({ success: false, error: 'Refresh token expired', code: 'REFRESH_EXPIRED' });
    }

    if (!tokenData.is_active) {
      clearRefreshTokenCookie(res);
      return res.status(403).json({ success: false, error: 'Account deactivated' });
    }

    await revokeRefreshToken(tokenHash);

    const { accessToken, refreshToken: newRefreshToken } = await createUserSession(tokenData.user_id);

    setRefreshTokenCookie(res, newRefreshToken);

    return res.json({
      success: true,
      data: {
        user: {
          id: tokenData.user_id,
          email: tokenData.email,
          name: tokenData.name,
          avatar: tokenData.avatar_url,
          role: tokenData.role,
          division: tokenData.division,
        },
        accessToken,
      },
    });
  } catch (err) {
    console.error('[Auth] Refresh error:', err);
    return res.status(500).json({ success: false, error: 'Token refresh failed' });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req, res) => {
  try {
    const refreshToken = getRefreshTokenFromCookie(req);

    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await revokeRefreshToken(tokenHash);
    }

    clearRefreshTokenCookie(res);

    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error('[Auth] Logout error:', err);
    return res.status(500).json({ success: false, error: 'Logout failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    return res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          email: req.user.email,
          name: req.user.name,
          avatar: req.user.avatar_url,
          role: req.user.role,
          division: req.user.division,
        },
      },
    });
  } catch (err) {
    console.error('[Auth] Me error:', err);
    return res.status(500).json({ success: false, error: 'Failed to get user' });
  }
});

// PUT /api/auth/me
router.put('/me', authenticate, async (req, res) => {
  try {
    const { name, division } = req.body;
    const updates = [];
    const params = [req.user.id];
    let paramIndex = 2;

    if (name) {
      updates.push(`name = $${paramIndex++}`);
      params.push(name);
    }
    if (division) {
      updates.push(`division = $${paramIndex++}`);
      params.push(division);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, error: 'No fields to update' });
    }

    updates.push(`updated_at = NOW()`);

    const result = await query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $1 RETURNING id, email, name, avatar_url, role, division`,
      params
    );

    return res.json({
      success: true,
      data: { user: result.rows[0] },
    });
  } catch (err) {
    console.error('[Auth] Update profile error:', err);
    return res.status(500).json({ success: false, error: 'Update failed' });
  }
});

export default router;