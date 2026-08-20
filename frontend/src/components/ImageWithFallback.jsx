import React, { useState } from 'react';
import { Ship, Waves, Newspaper } from 'lucide-react';

// Komponen gambar dengan fallback otomatis
export default function ImageWithFallback({
  src, alt = '', type = 'team', name = '', division = '', category = '',
  className = '', containerClassName = ''
}) {
  const [hasError, setHasError] = useState(!src || src === '');
  const [isLoading, setIsLoading] = useState(true);

  const getInitials = (n) => {
    if (!n) return 'AT';
    const p = n.trim().split(' ');
    return p.length === 1 ? p[0].substring(0, 2).toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
  };

  if (hasError || !src) {
    if (type === 'team') {
      return (
        <div className={`flex flex-col items-center justify-center bg-[#d5dfe4] ${className}`}>
          <span className="font-display text-5xl font-black tracking-[-0.06em] text-[#7c98a7] sm:text-6xl">{getInitials(name || alt)}</span>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#718793]">{division ? division.split(' ')[0] : 'Member'}</span>
        </div>
      );
    }
    if (type === 'robot') {
      const isAUV = (category || '').includes('AUV');
      return (
        <div className={`flex flex-col items-center justify-center bg-slate-50 p-6 text-center ${className}`}>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3 text-brand-600">
            {isAUV ? <Waves className="w-7 h-7" /> : <Ship className="w-7 h-7" />}
          </div>
          <span className="font-display font-bold text-sm text-slate-700">{name || 'Robot'}</span>
          <span className="text-xs text-brand-600 mt-0.5">{category}</span>
        </div>
      );
    }
    if (type === 'news') {
      return (
        <div className={`flex flex-col items-center justify-center bg-slate-50 p-6 ${className}`}>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-2 text-brand-600">
            <Newspaper className="w-6 h-6" />
          </div>
          <span className="text-xs text-slate-400">Foto Dokumentasi</span>
        </div>
      );
    }
    if (type === 'sponsor') {
      return (
        <div className={`flex items-center justify-center bg-slate-50 p-3 ${className}`}>
          <span className="font-semibold text-xs text-slate-500">{name || 'Sponsor'}</span>
        </div>
      );
    }
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center z-10">
          <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src} alt={alt}
        loading="lazy"
        decoding="async"
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => { setIsLoading(false); setHasError(true); }}
      />
    </div>
  );
}
