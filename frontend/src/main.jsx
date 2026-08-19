import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import './index.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const hasGoogle = clientId && clientId.length > 10 && !clientId.startsWith('your-');

const Root = hasGoogle
  ? ({ children }) => <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  : ({ children }) => <>{children}</>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
);