import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useAuth } from '../hooks';

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || (
  import.meta.env.DEV ? '1x00000000000000000000AA' : ''
);

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeGoogleRedirectLogin, isAuthenticated } = useAuth();

  const [phase, setPhase] = useState('form');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectStarted = useRef(false);
  const returnToRef = useRef('/');
  const requestedReturnTo = location.state?.from
    ? `${location.state.from.pathname || '/'}${location.state.from.search || ''}`
    : '/';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const token = hash.get('access_token');
    if (token) {
      returnToRef.current = hash.get('return_to') || '/';
      let active = true;
      completeGoogleRedirectLogin(token).then(() => {
        if (!active) return;
        window.history.replaceState({}, document.title, '/login');
        setPhase('diving');
      }).catch(() => {
        if (active) setError('Invalid Google login response');
      });
      return () => { active = false; };
    } else if (params.has('error')) {
      const errorMessages = {
        google_cancelled: 'Google login was cancelled.',
        invalid_oauth_state: 'Login session expired. Please try again.',
        redirect_uri_mismatch: 'Google OAuth redirect URI is not configured correctly.',
        google_credentials_invalid: 'Google OAuth credentials are invalid or incomplete.',
        account_deactivated: 'This account has been deactivated.',
      };
      setError(errorMessages[params.get('error')] || 'Google login could not be completed. Please try again.');
      window.history.replaceState({}, document.title, '/login');
    }
  }, [completeGoogleRedirectLogin]);

  useEffect(() => {
    if (isAuthenticated && phase === 'form') navigate('/');
  }, [isAuthenticated, navigate, phase]);

  useEffect(() => {
    if (phase === 'diving') {
      const t1 = setTimeout(() => setPhase('ocean'), 800);
       const t2 = setTimeout(() => navigate(returnToRef.current), 3400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase, navigate]);

  const handleTurnstileSuccess = async (token) => {
    if (redirectStarted.current) return;
    redirectStarted.current = true;
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          turnstileToken: token,
          returnTo: requestedReturnTo,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.authUrl) throw new Error(result.error || 'Unable to start Google login');
      window.location.assign(result.authUrl);
    } catch (err) {
      redirectStarted.current = false;
      setIsSubmitting(false);
      setError(err.message || 'Google login failed');
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

            {/* Cloudflare Turnstile starts the Google redirect after verification. */}
            <div className="space-y-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                  <span className="text-xs text-sky-300/80">Cloudflare will verify you, then continue with Google</span>
                </div>

                <div className="flex justify-center">
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onSuccess={handleTurnstileSuccess}
                    onExpire={() => { redirectStarted.current = false; setIsSubmitting(false); }}
                    onError={() => { redirectStarted.current = false; setIsSubmitting(false); setError('Cloudflare verification failed'); }}
                    options={{ theme: 'dark' }}
                  />
                </div>
                {isSubmitting && <p className="text-center text-xs text-sky-300/70">Redirecting to Google...</p>}
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
