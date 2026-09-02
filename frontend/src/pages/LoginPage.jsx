import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks';
import TurnstileWidget from '../components/TurnstileWidget';
import { verifyTurnstileToken } from '../services/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, isAuthenticated } = useAuth();

  const [phase, setPhase] = useState('form');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileFailed, setTurnstileFailed] = useState(false);

  const siteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY || '').trim();
  const turnstileEnabled = siteKey.length > 0;

  const handleTurnstileError = useCallback((err) => {
    setTurnstileFailed(true);
    setError(err.message);
  }, []);

  useEffect(() => {
    if (isAuthenticated && phase === 'form') navigate('/');
  }, [isAuthenticated, navigate, phase]);

  useEffect(() => {
    if (phase === 'diving') {
      const t1 = setTimeout(() => setPhase('ocean'), 800);
      const t2 = setTimeout(() => navigate('/'), 3400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase, navigate]);

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setError('');

    // Turnstile harus diverifikasi server-side sebelum OAuth diizinkan.
    // Jika Turnstile gagal load (ad blocker), lanjutkan tanpa verifikasi.
    if (turnstileEnabled && !turnstileFailed) {
      if (!turnstileToken) {
        setError('Please complete the security check first.');
        setIsSubmitting(false);
        return;
      }
      const verification = await verifyTurnstileToken(turnstileToken);
      if (!verification.success) {
        setIsSubmitting(false);
        setError(verification.error || 'Security check failed.');
        return;
      }
    }

    const result = await loginWithGoogle();
    if (!result.success) {
      setIsSubmitting(false);
      setError(result.error || 'Google login failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-olympic-950 via-slate-900 to-olympic-900 pt-20 pb-12 px-4">

      {/* === ANIMATED OCEAN BACKGROUND === */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-olympic-950 via-slate-900 to-olympic-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-olympic-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-olympic-400/5 rounded-full blur-3xl animate-pulse-glow" />
        <ParticleField count={30} className="absolute inset-0" />
        <ParallaxASV />
        <ParallaxAUV />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-olympic-950/60 via-transparent to-olympic-950/60 pointer-events-none" />
      </div>

      {/* === CENTERED GLASS CARD === */}
      <div
        className={`relative z-10 w-full max-w-md px-4 sm:px-0 transform transition-all duration-700 ease-out ${
          phase !== 'form' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div
          className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-black/30 overflow-hidden animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olympic-500 via-sky-400 to-olympic-500" />

          <div className="p-8 sm:p-10 space-y-6">

            {/* Header */}
            <div className="text-center space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-olympic-500/20 border border-olympic-500/30 shadow-lg shadow-olympic-500/10">
                <img src="/assets/profile.png" alt="Aterkia" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                  Login
                </h1>
                <p className="text-olympic-200/80 text-sm mt-1.5 font-light">
                  Sign in to the Aterkia robot dashboard
                </p>
              </div>
            </div>

                {/* Supabase manages the OAuth redirect and session. */}
            <div className="space-y-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                  <span className="text-xs text-sky-300/80">Continue securely with Google via Supabase</span>
                </div>

                {turnstileEnabled && (
                  <div className="flex justify-center">
                    <TurnstileWidget
                      siteKey={siteKey}
                      onToken={setTurnstileToken}
                      onError={handleTurnstileError}
                    />
                  </div>
                )}

                <button type="button" onClick={handleGoogleLogin} disabled={isSubmitting || (turnstileEnabled && !turnstileToken && !turnstileFailed)} className="w-full py-3 rounded-xl bg-white text-slate-800 font-bold text-sm hover:bg-sky-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                  <GoogleIcon />
                  Continue with Google
                </button>
                {isSubmitting && <p className="text-center text-xs text-sky-300/70">Verifying &amp; redirecting to Google...</p>}
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-shake" role="alert">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>

      {/* === DIVING ANIMATION OVERLAY === */}
      {phase === 'diving' && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 animate-dive-expand origin-center" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center animate-fade-in">
              <h2 className="text-5xl sm:text-6xl font-black text-white font-display drop-shadow-2xl tracking-tight">Welcome Back</h2>
              <p className="text-white/80 text-lg mt-3 font-light drop-shadow-lg">Diving into the Aterkia world</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42Z" />
      <path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.7Z" />
      <path fill="#FBBC05" d="M6.53 13.78A5.85 5.85 0 0 1 6.22 12c0-.62.11-1.22.31-1.78V7.69H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.31l3.25-2.53Z" />
      <path fill="#EA4335" d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.28 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.72 5.39l3.25 2.53C7.3 7.91 9.46 6.19 12 6.19Z" />
    </svg>
  );
}

/* ── Background particles ── */
function ParticleField({ count, className }) {
  const particles = useRef([]);
  useEffect(() => {
    particles.current = [...Array(count)].map(() => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: 1 + Math.random() * 3, speed: 0.1 + Math.random() * 0.3,
      opacity: 0.1 + Math.random() * 0.3, delay: Math.random() * 5,
    }));
  }, [count]);
  return (
    <div className={className} aria-hidden="true">
      {particles.current.map((p, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity, animation: `float-particle ${10 + p.speed * 20}s ease-in-out ${p.delay}s infinite` }} />
      ))}
    </div>
  );
}

function ParallaxASV() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => { setOffset({ x: (e.clientX / innerWidth - 0.5) * 30, y: (e.clientY / innerHeight - 0.5) * 20 }); };
    addEventListener('mousemove', h); return () => removeEventListener('mousemove', h);
  }, []);
  return (
    <svg className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" width="200" height="90" viewBox="0 0 110 50"
      style={{ transform: `translate(-50%, calc(-50% + ${offset.y}px))` }}>
      <path d="M15,35 L25,28 L85,28 L95,35 L90,38 L20,38 Z" fill="#005EB8" />
      <path d="M20,38 L25,42 L40,42 L38,38 Z" fill="#003D7A" />
      <path d="M70,38 L75,42 L90,42 L85,38 Z" fill="#003D7A" />
      <rect x="42" y="18" width="26" height="10" rx="3" fill="#0050A0" />
      <rect x="45" y="12" width="20" height="6" rx="2" fill="#003D7A" />
      <line x1="55" y1="12" x2="55" y2="4" stroke="#003D7A" strokeWidth="1.5" />
      <circle cx="55" cy="3" r="2" fill="#FF6B35" />
    </svg>
  );
}

function ParallaxAUV() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => { setOffset({ x: (e.clientX / innerWidth - 0.5) * -20, y: (e.clientY / innerHeight - 0.5) * -15 }); };
    addEventListener('mousemove', h); return () => removeEventListener('mousemove', h);
  }, []);
  return (
    <svg className="absolute top-20 right-1/4 opacity-15 pointer-events-none" width="140" height="70" viewBox="0 0 90 45"
      style={{ transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))` }}>
      <ellipse cx="45" cy="22" rx="38" ry="12" fill="#003D7A" />
      <ellipse cx="45" cy="22" rx="35" ry="10" fill="#0050A0" />
      <ellipse cx="80" cy="22" rx="10" ry="10" fill="#0ea5e9" opacity="0.4" />
      <circle cx="82" cy="22" r="3" fill="#06b6d4" />
    </svg>
  );
}
