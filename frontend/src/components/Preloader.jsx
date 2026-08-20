import React, { useState, useEffect } from 'react';

export default function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAssetsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (assetsLoaded) {
      const t = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(t);
    }
  }, [assetsLoaded]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-28 h-28 mx-auto mb-3 relative">
              <svg viewBox="0 0 200 100" className="w-full h-full animate-sail" style={{ transformOrigin: 'center' }}>
                <defs>
                  <linearGradient id="psGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#005EB8" />
                    <stop offset="100%" stopColor="#003D7A" />
                  </linearGradient>
                </defs>
                <path d="M30,65 L45,55 L155,55 L170,65 L165,68 L35,68 Z" fill="url(#psGrad)" />
                <path d="M50,65 L60,70 L85,70 L80,65 Z" fill="#003D7A" />
                <path d="M115,65 L125,70 L150,70 L145,65 Z" fill="#003D7A" />
                <rect x="75" y="35" width="50" height="20" rx="6" fill="#0050A0" />
                <rect x="82" y="24" width="36" height="11" rx="4" fill="#003D7A" />
                <line x1="100" y1="24" x2="100" y2="15" stroke="#003D7A" strokeWidth="3" />
                <circle cx="100" cy="12" r="4" fill="#FF6B35" />
                <rect x="85" y="38" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                <rect x="97" y="38" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                <rect x="109" y="38" width="8" height="8" rx="2" fill="#93c5fd" opacity="0.8" />
                <rect x="125" y="20" width="5" height="30" rx="2" fill="#003D7A" />
                <ellipse cx="127.5" cy="18" rx="6" ry="3" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <ellipse cx="127.5" cy="18" rx="10" ry="5" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.3" />
                <path d="M20,65 Q10,68 5,72" stroke="#005EB8" strokeWidth="2" fill="none" opacity="0.5" />
                <path d="M180,65 Q190,68 195,72" stroke="#005EB8" strokeWidth="2" fill="none" opacity="0.5" />
              </svg>
              <svg viewBox="0 0 200 40" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-10 animate-wave-1" style={{ opacity: 0.35 }}>
                <path d="M0,20 Q30,5 60,20 T120,20 T180,20 T200,20 V40 H0 Z" fill="#0ea5e9" />
              </svg>
            </div>
            <p className="text-olympic-600 text-sm font-semibold tracking-wide">Memuat Aterkia RoboBoat...</p>
          </div>
        </div>
      )}
      {children}
    </>
  );
}