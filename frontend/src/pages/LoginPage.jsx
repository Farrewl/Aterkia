import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Anchor, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import { useAuth } from '../hooks';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phase, setPhase] = useState('form');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const cardRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (phase === 'diving') {
      const t1 = setTimeout(() => setPhase('ocean'), 800);
      const t2 = setTimeout(() => setPhase('done'), 2600);
      const t3 = setTimeout(() => navigate('/'), 3400);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [phase, navigate]);

  const validateForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      errors.email = 'Email harus diisi';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Format email tidak valid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password harus diisi';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    const result = await login(email, password);

    setIsSubmitting(false);

    if (result.success) {
      setPhase('diving');
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLogin = async (result) => {
    if (result.success) {
      setPhase('diving');
    } else {
      setError(result.error);
    }
  };

  const inputFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'tim@aterkia.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      error: formErrors.email,
      value: email,
      onChange: (e) => setEmail(e.target.value),
      autoComplete: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Masukkan password',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      error: formErrors.password,
      value: password,
      onChange: (e) => setPassword(e.target.value),
      autoComplete: 'current-password',
      showToggle: true,
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-olympic-950 via-slate-900 to-olympic-900">

      {/* === FULL-SCREEN ANIMATED OCEAN BACKGROUND === */}
      <div className="absolute inset-0 z-0">
        {/* Deep ocean gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-olympic-950 via-slate-900 to-olympic-900" />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-olympic-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-olympic-400/5 rounded-full blur-3xl animate-pulse-glow" />

        {/* Floating particles */}
        <ParticleField count={30} className="absolute inset-0" />

        {/* Parallax ASV silhouette */}
        <ParallaxASV />

        {/* Parallax AUV silhouette */}
        <ParallaxAUV />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-20" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-olympic-950/60 via-transparent to-olympic-950/60 pointer-events-none" />
      </div>

      {/* === CENTERED GLASSMORPHISM CARD === */}
      <div
        ref={cardRef}
        className={`relative z-10 w-full max-w-md px-4 transform transition-all duration-700 ease-out ${
          phase !== 'form' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div
          ref={formRef}
          className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-black/30 overflow-hidden animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olympic-500 via-sky-400 to-olympic-500" />

          <div className="p-8 sm:p-10 space-y-8">

            {/* Header */}
            <div className="text-center space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-olympic-500/20 border border-olympic-500/30 shadow-lg shadow-olympic-500/10">
                <img src="/assets/profile.png" alt="Aterkia" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                  Selamat Datang
                </h1>
                <p className="text-olympic-200/80 text-sm mt-1.5 font-light">
                  Masuk ke dashboard robot Aterkia
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5 animate-fade-up" style={{ animationDelay: '300ms' }}>
              {inputFields.map((field, idx) => (
                <AnimatedInput
                  key={field.name}
                  index={idx}
                  field={field}
                  showPassword={showPassword}
                  onToggleShow={() => setShowPassword(!showPassword)}
                />
              ))}

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-shake" role="alert">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-olympic-500 to-olympic-600 hover:from-olympic-600 hover:to-olympic-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-olympic-500/30 hover:shadow-xl hover:shadow-olympic-500/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk</span>
                    <Anchor className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white/5 backdrop-blur-xl text-olympic-300/60 font-medium">atau</span>
              </div>
            </div>

            {/* Google Login Button */}
            <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
              <GoogleLoginButton
                onSuccess={handleGoogleLogin}
                onError={(err) => setError('Gagal login dengan Google')}
                disabled={isSubmitting}
              />
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-olympic-200/60 animate-fade-up" style={{ animationDelay: '600ms' }}>
              Belum punya akun?{' '}
              <Link to="/login?register=true" className="text-olympic-400 hover:text-olympic-300 font-semibold transition-colors">
                Daftar sekarang
              </Link>
            </p>

            {/* Footer note */}
            <p className="text-center text-[11px] text-olympic-300/50 animate-fade-up" style={{ animationDelay: '700ms' }}>
              Tim Aterkia RoboBoat &middot; Universitas Diponegoro
            </p>
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
            {/* Top half — Water Surface + ASV */}
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
                <path d="M10,38 Q5,40 2,44" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M100,38 Q105,40 108,44" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <rect x="70" y="10" width="3" height="18" rx="1" fill="#003D7A" />
                <circle cx="71.5" cy="8" r="3" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
                <circle cx="71.5" cy="8" r="6" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>

            {/* Bottom half — Underwater + AUV */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-500 via-blue-600 to-olympic-900 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-16 h-full bg-gradient-to-b from-white/15 to-transparent transform -skew-x-12" />
              <div className="absolute top-0 left-1/2 w-10 h-full bg-gradient-to-b from-white/10 to-transparent transform skew-x-6" />
              <div className="absolute top-0 right-1/4 w-12 h-full bg-gradient-to-b from-white/10 to-transparent transform -skew-x-6" />

              {[...Array(12)].map((_, i) => (
                <svg
                  key={i}
                  className="absolute opacity-30 animate-float"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                  }}
                  width={6 + Math.random() * 10}
                  height={6 + Math.random() * 10}
                  viewBox="0 0 12 12"
                >
                  <circle cx="6" cy="6" r="5" fill="none" stroke="white" strokeWidth="0.8" />
                </svg>
              ))}

              <svg className="absolute bottom-0 left-[5%] animate-sway origin-bottom" width="120" height="100" viewBox="0 0 50 45" opacity="0.7">
                <path d="M10,45 C10,35 5,28 10,20 C12,16 8,10 12,5 C14,2 16,5 15,10 C14,15 18,18 16,25 C14,32 18,38 15,45" fill="#f97316" />
                <path d="M20,45 C20,38 18,32 22,25 C24,20 20,14 24,8 C25,5 28,8 26,14 C24,20 28,24 26,32 C24,38 27,42 25,45" fill="#fb923c" />
                <path d="M30,45 C30,40 28,35 30,28 C31,24 29,20 31,15 C32,12 34,15 33,20 C32,25 34,30 32,38 L32,45" fill="#f97316" opacity="0.8" />
                <ellipse cx="12" cy="5" rx="3" ry="2" fill="#fbbf24" />
                <ellipse cx="24" cy="8" rx="3" ry="2" fill="#fbbf24" />
              </svg>

              <svg className="absolute bottom-0 right-[8%] animate-sway-delayed origin-bottom" width="100" height="80" viewBox="0 0 40 35" opacity="0.6">
                <path d="M8,35 C8,28 4,22 8,15 C10,10 6,5 10,2 C12,0 14,3 12,8 C10,14 14,18 12,25 C10,30 12,34 10,35" fill="#ef4444" opacity="0.7" />
                <path d="M20,35 C20,30 16,24 20,18 C22,14 18,8 22,4 C23,2 26,5 24,10 C22,16 26,20 24,28 L24,35" fill="#f87171" opacity="0.6" />
                <circle cx="10" cy="2" r="2.5" fill="#fbbf24" opacity="0.8" />
                <circle cx="22" cy="4" r="2" fill="#fbbf24" opacity="0.7" />
              </svg>

              <svg className="absolute bottom-0 left-[15%] animate-sway origin-bottom" width="40" height="100" viewBox="0 0 20 50" opacity="0.5">
                <path d="M10,50 Q5,40 10,30 Q15,20 10,10 Q8,5 10,0" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <path d="M6,50 Q1,42 6,32 Q11,22 6,12" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </svg>
              <svg className="absolute bottom-0 right-[15%] origin-bottom" width="30" height="80" viewBox="0 0 16 40" opacity="0.4">
                <path d="M8,40 Q3,32 8,24 Q13,16 8,8 Q6,4 8,0" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-cruise" width="160" height="80" viewBox="0 0 90 45">
                <ellipse cx="45" cy="22" rx="38" ry="12" fill="#003D7A" />
                <ellipse cx="45" cy="22" rx="35" ry="10" fill="#0050A0" />
                <ellipse cx="80" cy="22" rx="10" ry="10" fill="#0ea5e9" opacity="0.4" />
                <ellipse cx="80" cy="22" rx="7" ry="7" fill="#38bdf8" opacity="0.3" />
                <circle cx="82" cy="22" r="3" fill="#06b6d4" />
                <circle cx="82" cy="22" r="1.5" fill="white" opacity="0.8" />
                <path d="M35,12 L45,4 L55,12" fill="#003D7A" />
                <path d="M25,32 L18,42 L30,35" fill="#003D7A" opacity="0.8" />
                <path d="M55,32 L62,42 L50,35" fill="#003D7A" opacity="0.8" />
                <path d="M7,18 L3,14 M7,22 L2,22 M7,26 L3,30" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10,16 L5,10 M10,28 L5,34" stroke="#003D7A" strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="18" x2="30" y2="26" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                <line x1="40" y1="16" x2="40" y2="28" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                <line x1="50" y1="16" x2="50" y2="28" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                <line x1="60" y1="17" x2="60" y2="27" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                <circle cx="75" cy="18" r="1.5" fill="#22c55e" opacity="0.8" />
                <circle cx="75" cy="26" r="1.5" fill="#22c55e" opacity="0.8" />
              </svg>

              <svg className="absolute bottom-[20%] left-[25%] opacity-40 animate-swim" width="40" height="20" viewBox="0 0 20 10">
                <path d="M15,5 Q18,2 20,5 Q18,8 15,5 Z M10,3 Q12,0 14,2 L14,8 Q12,10 10,7 Z" fill="white" opacity="0.5" />
              </svg>
              <svg className="absolute top-[30%] right-[20%] opacity-30 animate-swim-delayed" width="32" height="16" viewBox="0 0 16 8">
                <path d="M12,4 Q14,1 16,4 Q14,7 12,4 Z M8,2 Q10,0 12,1.5 L12,6.5 Q10,8 8,6 Z" fill="white" opacity="0.4" />
              </svg>
            </div>

            {/* Water surface divider */}
            <div className="absolute top-1/2 left-0 right-0 h-[4px] z-10 shadow-lg shadow-sky-400/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 animate-wave-1" />
            </div>

            {/* Welcome text during ocean phase */}
            {phase === 'ocean' && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center animate-fade-in">
                  <h2 className="text-5xl sm:text-6xl font-black text-white font-display drop-shadow-2xl tracking-tight">
                    Selamat Datang
                  </h2>
                  <p className="text-white/80 text-lg mt-3 font-light drop-shadow-lg">
                    Menyelam ke dunia Aterkia RoboBoat
                  </p>
                </div>
              </div>
            )}

            {/* Success state */}
            {phase === 'done' && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-black text-white font-display drop-shadow-xl">Berhasil Masuk!</h2>
                  <p className="text-white/70 text-lg mt-2 font-light">Mengarahkan ke dashboard...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedInput({ index, field, showPassword, onToggleShow }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const hasError = !!field.error;
  const hasValue = !!field.value;

  return (
    <div className="relative" style={{ animationDelay: `${300 + index * 100}ms` }}>
      <label
        htmlFor={field.name}
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none transition-all duration-200 origin-left ${
          isFocused || hasValue
            ? '-translate-y-full scale-75 text-olympic-400'
            : 'text-slate-400'
        }`}
      >
        {field.label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200">
          {field.icon}
        </div>

        <input
          ref={inputRef}
          id={field.name}
          name={field.name}
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={hasValue ? '' : field.placeholder}
          autoComplete={field.autoComplete}
          className={`w-full pl-10 pr-${field.showToggle ? '12' : '4'} py-3.5 rounded-xl
            bg-white/5 border-2 transition-all duration-300
            text-white placeholder:text-slate-500/50
            focus:outline-none focus:ring-2 focus:ring-olympic-500/30
            ${
              hasError
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
                : isFocused
                  ? 'border-olympic-500/80 bg-white/10'
                  : hasValue
                    ? 'border-white/20 bg-white/5'
                    : 'border-white/10 bg-white/5'
            }`}
        />

        {field.showToggle && (
          <button
            type="button"
            onClick={onToggleShow}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {field.error && (
          <div className="absolute -bottom-6 left-0 text-[11px] text-red-400 flex items-center gap-1 animate-fade-in">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{field.error}</span>
          </div>
        )}
      </div>

      {/* Focus ring animation */}
      {isFocused && !hasError && (
        <div className="absolute inset-0 rounded-xl border-2 border-olympic-500/50 animate-pulse-ring pointer-events-none" />
      )}
    </div>
  );
}

function ParticleField({ count, className }) {
  const particles = useRef([]);

  useEffect(() => {
    particles.current = [...Array(count)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 0.1 + Math.random() * 0.3,
      opacity: 0.1 + Math.random() * 0.3,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className={className} aria-hidden="true">
      {particles.current.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-particle ${10 + p.speed * 20}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ParallaxASV() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <svg
      className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none"
      width="200"
      height="90"
      viewBox="0 0 110 50"
      style={{ transform: `translate(-50%, calc(-50% + ${offset.y}px))` }}
    >
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
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -20;
      const y = (e.clientY / window.innerHeight - 0.5) * -15;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <svg
      className="absolute top-20 right-1/4 opacity-15 pointer-events-none"
      width="140"
      height="70"
      viewBox="0 0 90 45"
      style={{ transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))` }}
    >
      <ellipse cx="45" cy="22" rx="38" ry="12" fill="#003D7A" />
      <ellipse cx="45" cy="22" rx="35" ry="10" fill="#0050A0" />
      <ellipse cx="80" cy="22" rx="10" ry="10" fill="#0ea5e9" opacity="0.4" />
      <ellipse cx="80" cy="22" rx="7" ry="7" fill="#38bdf8" opacity="0.3" />
      <circle cx="82" cy="22" r="3" fill="#06b6d4" />
    </svg>
  );
}