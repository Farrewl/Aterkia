import React, { useState, useEffect, useRef, useCallback } from 'react';

const MIN_DURATION = 3000;
const FADE_DURATION = 700;
const HARD_CAP = 15000;

export default function EntryAnimation({ children }) {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('aterkia_entered'));
  const [fading, setFading] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);

  const minDone = useRef(false);
  const assetsDone = useRef(false);
  const fadeStarted = useRef(false);
  const timers = useRef([]);

  const startFade = useCallback(() => {
    if (fadeStarted.current) return;
    fadeStarted.current = true;
    sessionStorage.setItem('aterkia_entered', 'true');
    setVisible(false);
    setFading(true);
    timers.current.push(setTimeout(() => setFading(false), FADE_DURATION));
  }, []);

  useEffect(() => {
    if (!visible) return;

    const loadingTextTimer = setTimeout(() => setShowLoadingText(true), 5000);
    timers.current.push(loadingTextTimer);

    const assetImgs = Array.from(document.images || []);
    const assetVids = Array.from(document.querySelectorAll('video'));
    const promises = [
      ...assetImgs.map((img) =>
        new Promise((res) => {
          if (img.complete && img.naturalWidth > 0) return res();
          img.addEventListener('load', res, { once: true });
          img.addEventListener('error', res, { once: true });
        })
      ),
      ...assetVids.map((vid) =>
        new Promise((res) => {
          if (vid.readyState >= 3) return res();
          vid.addEventListener('canplaythrough', res, { once: true });
          vid.addEventListener('error', res, { once: true });
        })
      ),
    ];

    const tryFade = () => {
      if (minDone.current && assetsDone.current) startFade();
    };

    const assetTimer = setTimeout(() => {
      assetsDone.current = true;
      tryFade();
    }, HARD_CAP);
    timers.current.push(assetTimer);

    Promise.all(promises).then(() => {
      assetsDone.current = true;
      tryFade();
    });

    const minTimer = setTimeout(() => {
      minDone.current = true;
      tryFade();
    }, MIN_DURATION);
    timers.current.push(minTimer);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [startFade]);

  if (!visible && !fading) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700"
      style={{
        background: 'radial-gradient(circle at 50% 40%, #0c2542 0%, #060d1a 55%, #03070f 100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: fading ? 'none' : 'auto',
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center px-6">
        <img
          src="/assets/profile.png"
          alt="Aterkia"
          className="w-28 sm:w-36 md:w-44 h-auto object-contain"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(56,189,248,0.35))',
            animation: 'aterkiaLogoReveal 900ms cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        />
        <p
          className="mt-6 font-display text-2xl sm:text-3xl font-black tracking-[0.35em] text-white/90"
          style={{ animation: 'aterkiaTextReveal 1200ms 300ms cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}
        >
          ATERKIA
        </p>
        <div
          className="mt-2 h-px w-40 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
          style={{ animation: 'aterkiaLineGrow 1400ms 500ms cubic-bezier(0.16,1,0.3,1) forwards', transform: 'scaleX(0)' }}
        />
        {showLoadingText && (
          <p
            className="mt-8 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-sky-300/70 font-mono"
            style={{ animation: 'aterkiaTextReveal 800ms ease-out forwards', opacity: 0 }}
          >
            Loading assets...
          </p>
        )}
      </div>
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
    </div>
  );
}
