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
            <div className="w-28 h-28 mx-auto mb-4 relative">
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
      {children}
    </>
  );
}