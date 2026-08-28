import { OAuth2Client } from 'google-auth-library';

let _client = null;

const getClient = () => {
  if (!_client) {
    const id = process.env.GOOGLE_CLIENT_ID;
    const secret = process.env.GOOGLE_CLIENT_SECRET;
    if (!id) {
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

export const getGoogleAuthUrl = (state) => {
  const client = getClient();
  if (!process.env.GOOGLE_REDIRECT_URI) throw new Error('Google redirect URI not configured');
  const scopes = ['openid', 'email', 'profile'];
  return client.generateAuthUrl({
    access_type: 'offline',
    include_granted_scopes: true,
    state,
    scope: scopes,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  });
};

export const exchangeGoogleCode = async (code) => {
  const client = getClient();
  if (!process.env.GOOGLE_REDIRECT_URI) throw new Error('Google redirect URI not configured');
  const { tokens } = await client.getToken({
    code,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  });
  if (!tokens.id_token) throw new Error('Google did not return an ID token');
  return verifyGoogleIdToken(tokens.id_token);
};
