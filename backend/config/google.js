import { OAuth2Client } from 'google-auth-library';

let _client = null;

const getClient = () => {
  if (!_client) {
    const id = process.env.GOOGLE_CLIENT_ID;
    const secret = process.env.GOOGLE_CLIENT_SECRET;
    if (!id || !secret) {
      throw new Error('Google OAuth credentials not configured');
    }
    _client = new OAuth2Client(id, secret);
  }
  return _client;
};

export const verifyGoogleIdToken = async (idToken) => {
  const client = getClient();
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
};

export const getGoogleAuthUrl = () => {
  const client = getClient();
  const scopes = ['openid', 'email', 'profile'];
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });
};
