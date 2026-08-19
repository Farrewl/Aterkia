const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === 'true',
  sameSite: process.env.COOKIE_SAME_SITE || 'lax',
  domain: process.env.COOKIE_DOMAIN || undefined,
  path: '/',
};

export const setRefreshTokenCookie = (res, token, expiresIn = '7d') => {
  const maxAge = parseExpiry(expiresIn);
  res.cookie('refreshToken', token, {
    ...COOKIE_OPTIONS,
    maxAge,
  });
};

export const clearRefreshTokenCookie = (res) => {
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
};

export const getRefreshTokenFromCookie = (req) => {
  return req.cookies?.refreshToken || null;
};

const parseExpiry = (expiry) => {
  const match = expiry.match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000;
  const value = parseInt(match[1]);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };
  return value * multipliers[unit];
};