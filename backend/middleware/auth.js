import { verifyAccessToken } from '../utils/jwt.js';
import { query } from '../config/database.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      code: 'UNAUTHORIZED',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);

    const result = await query(
      'SELECT id, email, name, avatar_url, role, division, is_active FROM users WHERE id = $1',
      [decoded.sub]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
        code: 'USER_NOT_FOUND',
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        error: 'Account deactivated',
        code: 'ACCOUNT_DEACTIVATED',
      });
    }

    req.user = user;
    req.accessToken = token;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Access token expired',
        code: 'TOKEN_EXPIRED',
      });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid access token',
        code: 'INVALID_TOKEN',
      });
    }
    console.error('[Auth] Middleware error:', err);
    return res.status(500).json({
      success: false,
      error: 'Authentication error',
      code: 'AUTH_ERROR',
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    const result = await query(
      'SELECT id, email, name, avatar_url, role, division, is_active FROM users WHERE id = $1',
      [decoded.sub]
    );

    if (result.rows.length > 0 && result.rows[0].is_active) {
      req.user = result.rows[0];
      req.accessToken = token;
    }
  } catch {
    // Ignore invalid tokens for optional auth
  }

  next();
};