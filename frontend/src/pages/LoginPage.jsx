import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import { useAuth } from '../hooks';

function generateCaptcha() {
  const ops = ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;
  switch (op) {
    case '+': a = Math.floor(Math.random() * 20) + 1; b = Math.floor(Math.random() * 20) + 1; answer = a + b; break;
    case '-': a = Math.floor(Math.random() * 20) + 10; b = Math.floor(Math.random() * a) + 1; answer = a - b; break;
    case '×': a = Math.floor(Math.random() * 9) + 2; b = Math.floor(Math.random() * 9) + 2; answer = a * b; break;
    default: a = 1; b = 1; answer = 1;
  }
  return { question: `What is ${a} ${op} ${b}?`, answer };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, isAuthenticated } = useAuth();

  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [phase, setPhase] = useState('form');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const captcha = useMemo(() => generateCaptcha(), []);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (phase === 'diving') {
      const t1 = setTimeout(() => setPhase('ocean'), 800);
      const t2 = setTimeout(() => setPhase('ocean'), 2600);
      const t3 = setTimeout(() => navigate('/'), 3400);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [phase, navigate]);

  const handleCaptchaSubmit = () => {
    if (parseInt(captchaInput, 10) === captcha.answer) {
      setCaptchaSolved(true);
      setCaptchaError('');
    } else {
      setCaptchaError('Incorrect answer, try again');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setIsSubmitting(true);
    setError('');
    if (!credentialResponse?.credential) {
      setError('Invalid Google response');
      setIsSubmitting(false);
      return;
    }
    const result = await loginWithGoogle(credentialResponse.credential);
    setIsSubmitting(false);
    if (result.success) {
      setPhase('diving');
    } else {
      setError(result.error);
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

            {/* CAPTCHA or Google */}
            {!captchaSolved ? (
              <div className="space-y-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                  <span className="text-xs text-sky-300/80">Verify you're human before continuing</span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-olympic-200/60 uppercase tracking-wider">
                    {captcha.question}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCaptchaSubmit()}
                      placeholder="Your answer"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder:text-slate-500/50 focus:outline-none focus:border-olympic-500/80 focus:bg-white/10 transition-all"
                    />
                    <button
                      onClick={handleCaptchaSubmit}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-olympic-500 to-olympic-600 hover:from-olympic-600 hover:to-olympic-700 text-white font-bold text-sm shadow-lg shadow-olympic-500/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Verify
                    </button>
                  </div>
                  {captchaError && (
                    <div className="flex items-center gap-2 text-red-400 text-xs animate-shake">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{captchaError}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-300/80">Verification passed — continue with Google</span>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-shake" role="alert">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <GoogleLoginButton
                  onSuccess={handleGoogleLogin}
                  onError={(err) => setError('Google login failed')}
                  disabled={isSubmitting}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === DIVING ANIMATION OVERLAY === */}
      {(phase === 'diving' || phase === 'ocean' || phase === 'done') && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div
            className={`absolute rounded-full overflow-hidden shadow-2xl transition-all ease-[cubic-bezier(0.4,0,0.2,1)] ${
              phase === 'diving'
                ? 'top-1/2 left-1/2 w-0 h-0 -translate-x-1/2 -translate-y-1/2'
                : 'top-1/2 left-1/2 w-[300vmax] h-[300vmax] -translate-x-1/2 -translate-y-1/2'
            }`}
            style={{ transitionDuration: phase === 'diving' ? '800ms' : '1800ms' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-sky-200 to-cyan-200" />
              <div className="absolute top-[8%] left-[20%] w-24 h-8 bg-white/60 rounded-full blur-sm animate-float" />
              <div className="absolute top-[12%] left-[30%] w-16 h-5 bg-white/40 rounded-full blur-sm animate-float-delayed" />
              <div className="absolute top-[6%] right-[25%] w-20 h-7 bg-white/50 rounded-full blur-sm animate-float" />
              <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 30" preserveAspectRatio="none" style={{ height: '5%' }}>
                <path className="animate-wave-1" d="M0,15 Q100,5 200,15 T400,15 T600,15 T800,15 T1000,15 T1200,15 V30 H0 Z" fill="#0ea5e9" opacity="0.5" />
                <path className="animate-wave-2" d="M0,18 Q120,8 240,18 T480,18 T720,18 T960,18 T1200,18 V30 H0 Z" fill="#0284c7" opacity="0.4" />
                <path className="animate-wave-3" d="M0,22 Q80,14 160,22 T360,22 T600,22 T900,22 T1200,22 V30 H0 Z" fill="#0369a1" opacity="0.6" />
              </svg>
              <svg className="absolute bottom-[12%] left-1/2 -translate-x-1/2 animate-sail" width="180" height="80" viewBox="0 0 110 50">
                <path d="M15,35 L25,28 L85,28 L95,35 L90,38 L20,38 Z" fill="#005EB8" />
                <path d="M20,38 L25,42 L40,42 L38,38 Z" fill="#003D7A" />
                <path d="M70,38 L75,42 L90,42 L85,38 Z" fill="#003D7A" />
                <rect x="42" y="18" width="26" height="10" rx="3" fill="#0050A0" />
                <rect x="45" y="12" width="20" height="6" rx="2" fill="#003D7A" />
                <line x1="55" y1="12" x2="55" y2="4" stroke="#003D7A" strokeWidth="1.5" />
                <circle cx="55" cy="3" r="2" fill="#FF6B35" />
                <rect x="45" y="20" width="5" height="4" rx="1" fill="#93c5fd" opacity="0.8" />
                <rect x="53" y="20" width="5" height="4" rx="1" fill="#93c5fd" opacity="0.8" />
                <rect x="61" y="20" width="5" height="4" rx="1" fill="#93c5fd" opacity="0.8" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-500 via-blue-600 to-olympic-900 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-16 h-full bg-gradient-to-b from-white/15 to-transparent transform -skew-x-12" />
              <div className="absolute top-0 left-1/2 w-10 h-full bg-gradient-to-b from-white/10 to-transparent transform skew-x-6" />
              {[...Array(12)].map((_, i) => (
                <svg key={i} className="absolute opacity-30 animate-float"
                  style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 60}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${3 + Math.random() * 3}s` }}
                  width={6 + Math.random() * 10} height={6 + Math.random() * 10} viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="5" fill="none" stroke="white" strokeWidth="0.8" />
                </svg>
              ))}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-cruise" width="160" height="80" viewBox="0 0 90 45">
                <ellipse cx="45" cy="22" rx="38" ry="12" fill="#003D7A" />
                <ellipse cx="45" cy="22" rx="35" ry="10" fill="#0050A0" />
                <ellipse cx="80" cy="22" rx="10" ry="10" fill="#0ea5e9" opacity="0.4" />
                <circle cx="82" cy="22" r="3" fill="#06b6d4" />
                <circle cx="82" cy="22" r="1.5" fill="white" opacity="0.8" />
                <path d="M35,12 L45,4 L55,12" fill="#003D7A" />
              </svg>
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-[4px] z-10 shadow-lg shadow-sky-400/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 animate-wave-1" />
            </div>
            {phase === 'ocean' && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center animate-fade-in">
                  <h2 className="text-5xl sm:text-6xl font-black text-white font-display drop-shadow-2xl tracking-tight">Welcome Back</h2>
                  <p className="text-white/80 text-lg mt-3 font-light drop-shadow-lg">Diving into the Aterkia world</p>
                </div>
              </div>
            )}
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
