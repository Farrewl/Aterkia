import React, { useState, useEffect } from 'react';

const SPLASH_KEY = 'aterkia-splash-seen';

export default function Preloader({ children }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Splash hanya muncul SEKALI per session (sessionStorage). Setelah itu pakai spinner ringan.
  useEffect(() => {
    const splashSeen = sessionStorage.getItem(SPLASH_KEY);
    if (splashSeen) {
      setShowSpinner(true);
      const t = setTimeout(() => {
        setShowSpinner(false);
        setIsReady(true);
      }, 400);
      return () => clearTimeout(t);
    }
    setShowSplash(true);
    const t1 = setTimeout(() => setIsHiding(true), 2300);
    const t2 = setTimeout(() => {
      sessionStorage.setItem(SPLASH_KEY, '1');
      setShowSplash(false);
      setIsReady(true);
    }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {showSplash && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
            isHiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 40%, #0c2542 0%, #060d1a 55%, #03070f 100%)',
          }}
          aria-hidden="true"
        >
          <div className="relative z-10 flex flex-col items-center px-6" style={{ animation: 'aterkiaLogoReveal 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards', opacity: 0 }}>
            <img
              src="/assets/profile.png"
              alt="Aterkia"
              className="w-28 sm:w-36 md:w-44 h-auto object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]"
            />
            <p className="mt-6 font-display text-2xl sm:text-3xl font-black tracking-[0.35em] text-white/90" style={{ animation: 'aterkiaTextReveal 1200ms 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards', opacity: 0 }}>
              ATERKIA
            </p>
            <div className="mt-2 h-px w-40 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" style={{ animation: 'aterkiaLineGrow 1400ms 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards', transform: 'scaleX(0)' }} />
            <p className="mt-4 text-[11px] sm:text-xs uppercase tracking-[0.4em] text-sky-200/40 font-mono">
              RoboBoat Team
            </p>
          </div>
        </div>
      )}

      {showSpinner && (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center animate-fade-out">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg viewBox="0 0 120 120" className="w-full h-full animate-spin" style={{ animationDuration: '1.2s' }}>
                <circle cx="60" cy="60" r="14" fill="#005EB8" />
                <circle cx="60" cy="60" r="7" fill="#fff" />
                <g>
                  <path d="M60,46 C65,30 75,22 60,18 C45,22 55,30 60,46 Z" fill="#003D7A" />
                  <path d="M74,60 C90,55 98,45 102,60 C98,75 90,65 74,60 Z" fill="#005EB8" />
                  <path d="M60,74 C55,90 45,98 60,102 C75,98 65,90 60,74 Z" fill="#003D7A" />
                  <path d="M46,60 C30,65 22,75 18,60 C22,45 30,55 46,60 Z" fill="#005EB8" />
                  <path d="M68,48 C80,35 92,30 88,44 C84,58 76,52 68,48 Z" fill="#003D7A" opacity="0.7" />
                  <path d="M72,68 C85,80 90,92 76,88 C62,84 68,76 72,68 Z" fill="#005EB8" opacity="0.7" />
                  <path d="M52,72 C40,80 28,88 32,74 C36,60 44,68 52,72 Z" fill="#003D7A" opacity="0.7" />
                  <path d="M48,52 C35,40 30,28 44,32 C58,36 52,44 48,52 Z" fill="#005EB8" opacity="0.7" />
                </g>
              </svg>
            </div>
            <p className="text-olympic-600 text-sm font-semibold tracking-wide">Loading ...</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes aterkiaLogoReveal {
          0%   { transform: scale(0.94); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes aterkiaTextReveal {
          0%   { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes aterkiaLineGrow {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>

      {isReady && children}
    </>
  );
}