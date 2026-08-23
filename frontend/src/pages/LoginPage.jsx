import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Anchor, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import { useAuth } from '../hooks';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, register, isAuthenticated } = useAuth();

  const [authMode, setAuthMode] = useState('login');
  const [fading, setFading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phase, setPhase] = useState('form');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: '', password: '', name: '' });

  const cardRef = useRef(null);

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
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) };
    }
  }, [phase, navigate]);

  const switchMode = (target) => {
    if (target === authMode) return;
    setFading(true);
    setTimeout(() => {
      setAuthMode(target);
      setError('');
      setFormErrors({});
      setEmail('');
      setPassword('');
      setName('');
      setTimeout(() => setFading(false), 50);
    }, 300);
  };

  const validateForm = () => {
    const errors = { email: '', password: '', name: '' };
    let isValid = true;

    if (authMode === 'signup' && !name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    let result;
    if (authMode === 'signup') {
      result = await register(name, email, password);
    } else {
      result = await login(email, password);
    }

    setIsSubmitting(false);

    if (result.success) {
      setPhase('diving');
    } else {
      setError(result.error);
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

  const loginFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'tim@aterkia.com',
      icon: 'email',
      error: formErrors.email,
      value: email,
      onChange: (e) => setEmail(e.target.value),
      autoComplete: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Enter password',
      icon: 'lock',
      error: formErrors.password,
      value: password,
      onChange: (e) => setPassword(e.target.value),
      autoComplete: 'current-password',
      showToggle: true,
    },
  ];

  const signupFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Your name',
      icon: 'user',
      error: formErrors.name,
      value: name,
      onChange: (e) => setName(e.target.value),
      autoComplete: 'name',
    },
    ...loginFields,
  ];

  const fields = authMode === 'signup' ? signupFields : loginFields;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-olympic-950 via-slate-900 to-olympic-900 pt-20 pb-12 px-4">

      {/* === FULL-SCREEN ANIMATED OCEAN BACKGROUND === */}
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

      {/* === CENTERED GLASSMORPHISM CARD === */}
      <div
        ref={cardRef}
        className={`relative z-10 w-full max-w-lg px-4 sm:px-0 transform transition-all duration-700 ease-out ${
          phase !== 'form' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div
          className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-black/30 overflow-hidden animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olympic-500 via-sky-400 to-olympic-500" />

          <div className={`p-8 sm:p-10 space-y-6 transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}>

            {/* Header */}
            <div className="text-center space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-olympic-500/20 border border-olympic-500/30 shadow-lg shadow-olympic-500/10">
                <img src="/assets/profile.png" alt="Aterkia" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                  {authMode === 'login' ? 'Login' : 'Create Account'}
                </h1>
                <p className="text-olympic-200/80 text-sm mt-1.5 font-light">
                  {authMode === 'login'
                    ? 'Sign in to the Aterkia robot dashboard'
                    : 'Join the Aterkia RoboBoat team'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              {fields.map((field, idx) => (
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
                disabled={isSubmitting || fading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-olympic-500 to-olympic-600 hover:from-olympic-600 hover:to-olympic-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-olympic-500/30 hover:shadow-xl hover:shadow-olympic-500/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{authMode === 'login' ? 'Sign In' : 'Sign Up'}</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white/5 backdrop-blur-xl text-olympic-300/60 font-medium">or</span>
              </div>
            </div>

            {/* Google Login */}
            <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
              <GoogleLoginButton
                onSuccess={handleGoogleLogin}
                onError={(err) => setError('Google login failed')}
                disabled={isSubmitting}
              />
            </div>

            {/* Switch mode */}
            <p className="text-center text-sm text-olympic-200/60 animate-fade-up" style={{ animationDelay: '600ms' }}>
              {authMode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-olympic-400 hover:text-olympic-300 font-semibold transition-colors"
                  >
                    Sign up now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-olympic-400 hover:text-olympic-300 font-semibold transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
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
              </svg>
            </div>

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
                  <h2 className="text-5xl sm:text-6xl font-black text-white font-display drop-shadow-2xl tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-white/80 text-lg mt-3 font-light drop-shadow-lg">
                    Diving into the Aterkia world
                  </p>
                </div>
              </div>
            )}

            {phase === 'done' && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-black text-white font-display drop-shadow-xl">Success!</h2>
                  <p className="text-white/70 text-lg mt-2 font-light">Redirecting to dashboard...</p>
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
  const hasIcon = !!field.icon;

  const getIcon = () => {
    switch (field.icon) {
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'lock':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative" style={{ animationDelay: `${300 + index * 100}ms` }}>
      <div className="relative">
        {/* Icon */}
        {hasIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 z-10">
            {getIcon()}
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          id={field.name}
          name={field.name}
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className={`w-full ${hasIcon ? 'pl-11' : 'pl-4'} ${field.showToggle ? 'pr-12' : 'pr-4'} py-3.5 rounded-xl
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

        {/* Floating label */}
        <label
          htmlFor={field.name}
          className={`absolute ${hasIcon ? 'left-11' : 'left-4'} top-1/2 -translate-y-1/2 text-sm pointer-events-none transition-all duration-200 origin-left ${
            isFocused || hasValue
              ? '-translate-y-[1.6rem] scale-75 opacity-100'
              : 'translate-y-0 scale-100 opacity-0'
          } ${
            isFocused
              ? 'text-olympic-400'
              : hasValue
                ? 'text-olympic-300/60'
                : 'text-slate-400'
          }`}
        >
          {field.label}
        </label>

        {/* Password toggle */}
        {field.showToggle && (
          <button
            type="button"
            onClick={onToggleShow}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors z-10"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}

        {/* Error */}
        {field.error && (
          <div className="absolute -bottom-6 left-0 text-[11px] text-red-400 flex items-center gap-1 animate-fade-in">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{field.error}</span>
          </div>
        )}
      </div>
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
