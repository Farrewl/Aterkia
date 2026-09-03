import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function Gate() {
  const { isLoading, isAuthenticated, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060d1a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/40 text-sm font-mono">
          <span className="w-4 h-4 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
          Loading monitoring console...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Shared-origin session: user must log in via the main site (same origin, same localStorage).
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0a1628] to-[#060d1a] flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="text-xl font-bold text-white font-display">Aterkia Monitoring</h1>
          <p className="text-sm text-white/40 mt-2 font-light leading-relaxed">
            You are not signed in. Please sign in via the main website — the monitoring console shares the same session (same origin, same Supabase storage key).
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center mt-6 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold transition-colors"
          >
            Go to main site login
          </a>
          <p className="text-[11px] text-white/20 mt-4">
            After signing in on the main site, return to <span className="text-white/40 font-mono">/monitoring</span> (same origin) — your session will be detected automatically.
          </p>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
