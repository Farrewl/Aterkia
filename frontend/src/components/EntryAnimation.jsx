import React, { useState, useEffect } from 'react';

export default function EntryAnimation({ children }) {
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setText(true), 5000);

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

    Promise.all(promises).then(() => {
      clearTimeout(textTimer);
      setTimeout(() => setVisible(false), 600);
    });

    const hardCap = setTimeout(() => {
      setVisible(false);
    }, 12000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hardCap);
    };
  }, []);

  if (!visible) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700"
      style={{
        background: 'radial-gradient(circle at 50% 40%, #0c2542 0%, #060d1a 55%, #03070f 100%)',
        opacity: visible ? 1 : 0,
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
        {text && (
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