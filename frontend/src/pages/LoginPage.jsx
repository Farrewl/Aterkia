import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phase, setPhase] = useState('form');
  const [error, setError] = useState('');

  useEffect(() => {
    if (phase === 'diving') {
      const t1 = setTimeout(() => setPhase('ocean'), 800);
      const t2 = setTimeout(() => setPhase('done'), 2600);
      const t3 = setTimeout(() => navigate('/'), 3400);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [phase, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Masukkan email dan password');
      return;
    }
    setError('');
    setPhase('diving');
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50">

      {/* Background decorative */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-olympic-100/40 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-[15%] w-64 h-64 bg-sky-100/30 rounded-full blur-3xl animate-float" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Main content — split layout */}
      <div className={`relative z-10 w-full max-w-6xl mx-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-700 ${
        phase !== 'form' ? 'opacity-0 scale-95 pointer-events-none' : ''
      }`}>
        {/* Left — Form */}
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-olympic-500/10 border border-slate-100 p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-olympic-50 border border-olympic-100 mb-4 shadow-lg shadow-olympic-500/10">
                <img src="/assets/profile.png" alt="Aterkia" className="w-12 h-12 object-contain" />
              </div>
              <h1 className="text-2xl font-black font-display text-olympic-900 tracking-tight">
                Selamat Datang
              </h1>
              <p className="text-slate-500 text-sm mt-1.5">
                Masuk ke akun Aterkia RoboBoat Team
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tim@aterkia.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/30 focus:border-olympic-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/30 focus:border-olympic-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs font-medium">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-olympic-500 hover:bg-olympic-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-olympic-500/30 hover:shadow-xl hover:shadow-olympic-500/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>Login</span>
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Tim Aterkia RoboBoat &middot; Universitas Diponegoro
            </p>
          </div>
        </div>

        {/* Right — Ocean Circle Visual */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-[380px] h-[380px]">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-olympic-400/10 blur-3xl animate-pulse-glow" />

            {/* Clip circle */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-black/10 border border-white/20 ring-1 ring-white/10">

              {/* TOP HALF — Water Surface + ASV */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-sky-200 to-cyan-200" />

                {/* Clouds */}
                <div className="absolute top-[8%] left-[15%] w-14 h-5 bg-white/60 rounded-full blur-sm animate-float" />
                <div className="absolute top-[14%] left-[30%] w-10 h-4 bg-white/40 rounded-full blur-sm animate-float-delayed" />
                <div className="absolute top-[6%] right-[20%] w-12 h-4 bg-white/50 rounded-full blur-sm animate-float" />

                {/* Wave lines */}
                <svg className="absolute bottom-0 left-0 w-[120%] -ml-[10%]" viewBox="0 0 420 30" preserveAspectRatio="none" style={{ height: '30px' }}>
                  <path className="animate-wave-1" d="M0,15 Q40,5 85,15 T170,15 T255,15 T340,15 T420,15 V30 H0 Z" fill="#0ea5e9" opacity="0.5" />
                  <path className="animate-wave-2" d="M0,18 Q50,8 100,18 T200,18 T300,18 T420,18 V30 H0 Z" fill="#0284c7" opacity="0.4" />
                  <path className="animate-wave-3" d="M0,22 Q30,14 70,22 T150,22 T240,22 T340,22 T420,22 V30 H0 Z" fill="#0369a1" opacity="0.6" />
                </svg>

                {/* ASV Ship */}
                <svg className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-sail" width="120" height="55" viewBox="0 0 110 50">
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

              {/* BOTTOM HALF — Underwater + AUV */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-500 via-blue-600 to-olympic-900 overflow-hidden">
                {/* Light rays */}
                <div className="absolute top-0 left-1/4 w-16 h-full bg-gradient-to-b from-white/15 to-transparent transform -skew-x-12" />
                <div className="absolute top-0 left-1/2 w-10 h-full bg-gradient-to-b from-white/10 to-transparent transform skew-x-6" />
                <div className="absolute top-0 right-1/4 w-12 h-full bg-gradient-to-b from-white/10 to-transparent transform -skew-x-6" />

                {/* Bubbles */}
                <svg className="absolute top-4 left-8 opacity-40 animate-float" width="12" height="12" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="5" fill="none" stroke="white" strokeWidth="1" />
                </svg>
                <svg className="absolute top-10 right-12 opacity-30 animate-float-delayed" width="8" height="8" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" fill="none" stroke="white" strokeWidth="0.8" />
                </svg>
                <svg className="absolute top-6 right-20 opacity-25 animate-float" width="6" height="6" viewBox="0 0 6 6">
                  <circle cx="3" cy="3" r="2.5" fill="none" stroke="white" strokeWidth="0.6" />
                </svg>

                {/* Coral left */}
                <svg className="absolute bottom-0 left-[5%] animate-sway origin-bottom" width="120" height="100" viewBox="0 0 50 45" opacity="0.7">
                  <path d="M10,45 C10,35 5,28 10,20 C12,16 8,10 12,5 C14,2 16,5 15,10 C14,15 18,18 16,25 C14,32 18,38 15,45" fill="#f97316" />
                  <path d="M20,45 C20,38 18,32 22,25 C24,20 20,14 24,8 C25,5 28,8 26,14 C24,20 28,24 26,32 C24,38 27,42 25,45" fill="#fb923c" />
                  <path d="M30,45 C30,40 28,35 30,28 C31,24 29,20 31,15 C32,12 34,15 33,20 C32,25 34,30 32,38 L32,45" fill="#f97316" opacity="0.8" />
                  <ellipse cx="12" cy="5" rx="3" ry="2" fill="#fbbf24" />
                  <ellipse cx="24" cy="8" rx="3" ry="2" fill="#fbbf24" />
                </svg>

                {/* Coral right */}
                <svg className="absolute bottom-0 right-[8%] animate-sway-delayed origin-bottom" width="100" height="80" viewBox="0 0 40 35" opacity="0.6">
                  <path d="M8,35 C8,28 4,22 8,15 C10,10 6,5 10,2 C12,0 14,3 12,8 C10,14 14,18 12,25 C10,30 12,34 10,35" fill="#ef4444" opacity="0.7" />
                  <path d="M20,35 C20,30 16,24 20,18 C22,14 18,8 22,4 C23,2 26,5 24,10 C22,16 26,20 24,28 L24,35" fill="#f87171" opacity="0.6" />
                  <circle cx="10" cy="2" r="2.5" fill="#fbbf24" opacity="0.8" />
                  <circle cx="22" cy="4" r="2" fill="#fbbf24" opacity="0.7" />
                </svg>

                {/* Seaweed */}
                <svg className="absolute bottom-0 left-[15%] animate-sway origin-bottom" width="40" height="100" viewBox="0 0 20 50" opacity="0.5">
                  <path d="M10,50 Q5,40 10,30 Q15,20 10,10 Q8,5 10,0" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                  <path d="M6,50 Q1,42 6,32 Q11,22 6,12" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </svg>
                <svg className="absolute bottom-0 right-[15%] origin-bottom" width="30" height="80" viewBox="0 0 16 40" opacity="0.4">
                  <path d="M8,40 Q3,32 8,24 Q13,16 8,8 Q6,4 8,0" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* AUV Robot */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-cruise" width="100" height="50" viewBox="0 0 90 45">
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

                {/* Fish */}
                <svg className="absolute bottom-[20%] left-[25%] opacity-40 animate-swim" width="40" height="20" viewBox="0 0 20 10">
                  <path d="M15,5 Q18,2 20,5 Q18,8 15,5 Z M10,3 Q12,0 14,2 L14,8 Q12,10 10,7 Z" fill="white" opacity="0.5" />
                </svg>
                <svg className="absolute top-[30%] right-[20%] opacity-30 animate-swim-delayed" width="32" height="16" viewBox="0 0 16 8">
                  <path d="M12,4 Q14,1 16,4 Q14,7 12,4 Z M8,2 Q10,0 12,1.5 L12,6.5 Q10,8 8,6 Z" fill="white" opacity="0.4" />
                </svg>
              </div>

              {/* Water surface divider */}
              <div className="absolute top-1/2 left-0 right-0 h-[3px] z-10 shadow-lg shadow-sky-400/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 animate-wave-1" />
              </div>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
