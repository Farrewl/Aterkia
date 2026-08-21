import jwt from 'jsonwebtoken';

const getSecrets = () => {
  const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
  const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
  if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error('JWT secrets not configured');
  }
  return {
    ACCESS_SECRET,
    REFRESH_SECRET,
    ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
    REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
  };
};

export const signAccessToken = (payload) => {
  const { ACCESS_SECRET, ACCESS_EXPIRY } = getSecrets();
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
};

export const signRefreshToken = (payload) => {
  const { REFRESH_SECRET, REFRESH_EXPIRY } = getSecrets();
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
};

export const verifyAccessToken = (token) => {
  const { ACCESS_SECRET } = getSecrets();
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  const { REFRESH_SECRET } = getSecrets();
  return jwt.verify(token, REFRESH_SECRET);
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const getTokenExpiry = (token) => {
  const decoded = jwt.decode(token);
  return decoded?.exp ? decoded.exp * 1000 : null;
};