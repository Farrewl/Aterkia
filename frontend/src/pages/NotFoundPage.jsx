import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Anchor, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0c4a6e] via-[#0a1628] to-[#060d1a] flex items-center justify-center overflow-hidden px-4">
      {/* Light rays */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 left-[15%] w-40 h-[120%] bg-gradient-to-b from-sky-300/6 to-transparent rotate-12 blur-xl" />
        <div className="absolute -top-20 left-[45%] w-24 h-[110%] bg-gradient-to-b from-cyan-200/5 to-transparent -rotate-3 blur-lg" />
        <div className="absolute -top-20 right-[18%] w-32 h-[115%] bg-gradient-to-b from-sky-400/5 to-transparent rotate-6 blur-xl" />
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { left: '12%', size: 14, dur: '8s', delay: '0s' },
          { left: '28%', size: 8, dur: '10s', delay: '2s' },
          { left: '55%', size: 11, dur: '9s', delay: '1s' },
          { left: '72%', size: 7, dur: '11s', delay: '3s' },
          { left: '86%', size: 12, dur: '7s', delay: '1.5s' },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full border border-white/15"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animation: `bubbleRise ${b.dur} ease-in ${b.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto animate-fade-up">
        {/* Lost submarine illustration */}
        <div className="mx-auto mb-8 w-56 h-32 text-white/25 animate-float" aria-hidden="true">
          <svg viewBox="0 0 220 120" fill="none" className="w-full h-full">
            {/* sonar rings */}
            <circle cx="185" cy="45" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <circle cx="185" cy="45" r="22" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="185" cy="45" r="32" stroke="currentColor" strokeWidth="0.75" opacity="0.15" />
            {/* hull */}
            <path d="M30 70 Q35 42 90 40 L140 40 Q175 44 180 62 Q182 74 160 82 L55 84 Q32 80 30 70 Z"
              stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="rgba(255,255,255,0.03)" />
            {/* conning tower */}
            <path d="M85 40 L88 22 L122 22 L127 40" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <rect x="96" y="27" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
            {/* periscope */}
            <path d="M118 22 L118 10 L128 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* propeller */}
            <path d="M30 62 L16 54 M30 62 L14 66 M30 62 L18 76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* portholes */}
            <circle cx="65" cy="61" r="6" stroke="currentColor" strokeWidth="2" />
            <circle cx="95" cy="61" r="6" stroke="currentColor" strokeWidth="2" />
            <circle cx="125" cy="61" r="6" stroke="currentColor" strokeWidth="2" />
            {/* question mark ping */}
            <text x="183" y="51" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#38bdf8">?</text>
          </svg>
        </div>

        <p className="text-7xl sm:text-8xl font-black font-display tracking-tight bg-gradient-to-b from-white/90 to-white/20 bg-clip-text text-transparent select-none">
          404
        </p>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold font-display text-white">
          You've Drifted into Uncharted Waters
        </h1>
        <p className="mt-3 text-white/40 text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto">
          The page you're looking for sank below the surface, or never left the harbor. Let's get you back to safer seas.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            Back to Harbor
          </Link>
          <Link
            to="/robots"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            Explore Robots
          </Link>
        </div>

        <div className="mt-10 inline-flex items-center gap-2 text-white/20 text-xs font-medium uppercase tracking-widest">
          <Anchor className="w-3.5 h-3.5" />
          Aterkia RoboBoat Team
        </div>
      </div>
    </div>
  );
}
