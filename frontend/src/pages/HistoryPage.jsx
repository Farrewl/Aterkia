import React, { useState, useEffect, useRef } from 'react';
import { historyData } from '../data/historyData';
import { CheckCircle2 } from 'lucide-react';

const CABLE_INSET = 96;

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* ── Submarine marker (side view, nose pointing right).
      Pitch + propeller + bubble trail + lights are driven from
      outside via refs — no re-renders while scrolling.
      When `docked`, it powers down at the end of the cable. ── */
function Submarine({ size = 'desktop', topPx, docked, svgRef, propRef, trailRef, lightRef }) {
  const isDesk = size === 'desktop';
  return (
    <div
      aria-hidden="true"
      className={`absolute z-[2] pointer-events-none ${isDesk ? 'hidden md:block left-1/2 -ml-[58px]' : 'md:hidden left-6 -ml-[36px]'}`}
      style={{ top: `${topPx}px` }}
    >
      {/* bubble trail — opacity follows scroll speed */}
      <div
        ref={trailRef}
        className="absolute right-full top-1/2 -translate-y-1/2 mr-1.5 flex flex-col gap-2"
        style={{ opacity: 0 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="trail-bubble block w-1.5 h-1.5 rounded-full bg-sky-200/80"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
        ))}
      </div>

      <svg
        ref={svgRef}
        width={isDesk ? 116 : 72}
        height={isDesk ? 58 : 36}
        viewBox="0 0 130 64"
        fill="none"
        style={{ transformOrigin: '50% 55%', display: 'block' }}
      >
        <defs>
          <linearGradient id={`beam-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* lights group — dims when docked */}
        <g ref={lightRef} style={{ transition: 'opacity 0.9s ease' }}>
          <path d="M100 28 L128 40 L128 60 L102 38 Z" fill={`url(#beam-${size})`} />
          <circle cx="99" cy="32" r="3" fill="#fde68a" opacity="0.9" />
        </g>

        {/* hull */}
        <rect x="18" y="18" width="84" height="28" rx="14"
          fill="rgba(255,255,255,0.07)" stroke="#7dd3fc" strokeWidth="2" />
        {/* conning tower + periscope */}
        <rect x="52" y="6" width="22" height="14" rx="3"
          fill="rgba(255,255,255,0.07)" stroke="#7dd3fc" strokeWidth="2" />
        <path d="M70 6 V1 H77" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
        <circle cx="63" cy="13" r="3" fill="#38bdf8" />
        {/* portholes */}
        {[36, 54, 72].map((cx) => (
          <circle key={cx} cx={cx} cy="32" r="3.4"
            stroke="#7dd3fc" strokeWidth="1.6" fill="rgba(56,189,248,0.25)" />
        ))}
        {/* tail fin */}
        <path d="M18 24 L8 18 V46 L18 40 Z" stroke="#7dd3fc" strokeWidth="2"
          strokeLinejoin="round" fill="rgba(125,211,252,0.08)" />
        {/* propeller — animationDuration set from scroll velocity; stalls when docked */}
        <g
          ref={propRef}
          className="animate-spin"
          style={{ transformOrigin: '11px 32px', animationDuration: '1.1s', animationTimingFunction: 'linear' }}
        >
          <ellipse cx="11" cy="32" rx="2.6" ry="9" stroke="#7dd3fc" strokeWidth="1.8" fill="rgba(125,211,252,0.15)" />
        </g>
        <circle cx="11" cy="32" r="2.4" fill="#7dd3fc" />
      </svg>
    </div>
  );
}

export default function HistoryPage() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const dotRefs = useRef([]);
  const dotOffsetsRef = useRef(null);

  const [lineHeight, setLineHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [litDots, setLitDots] = useState([]);
  const [docked, setDocked] = useState(false);
  const [cableMax, setCableMax] = useState(0);
  const [passedCards, setPassedCards] = useState([]);

  // Submarine pose — written straight to DOM nodes inside the rAF loop
  const subDeskRef = useRef(null);
  const subMobRef = useRef(null);
  const propDeskRef = useRef(null);
  const propMobRef = useRef(null);
  const trailDeskRef = useRef(null);
  const trailMobRef = useRef(null);
  const lightDeskRef = useRef(null);
  const lightMobRef = useRef(null);
  const scrollData = useRef({ lastY: null, lastT: 0, vy: 0 });
  const dockedRef = useRef(false);

  /* Measure each dot's relative position once (and on resize) */
  useEffect(() => {
    const measureDots = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;
      const tRect = timeline.getBoundingClientRect();
      dotOffsetsRef.current = dotRefs.current.map((ref) => {
        if (!ref) return 0;
        const dRect = ref.getBoundingClientRect();
        return (dRect.top + dRect.height / 2 - tRect.top) / tRect.height;
      });
    };
    const timer = setTimeout(measureDots, 300);
    window.addEventListener('resize', measureDots);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measureDots); };
  }, []);

  /* Reveal observer — rows register via .reveal-row */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal-row').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Scroll → progress, line height (clamped to cable), lit dots, velocity */
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const timeline = timelineRef.current;
      if (!container || !timeline) return;

      const containerRect = container.getBoundingClientRect();
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top - containerRect.top;
      const timelineHeight = timelineRect.height;
      const cableTravel = Math.max(0, timelineHeight - CABLE_INSET);

      const scrollY = -containerRect.top;
      const viewportMiddle = window.innerHeight / 2;

      const rawProgress = (scrollY + viewportMiddle - timelineTop) / timelineHeight;
      const p = Math.min(1, Math.max(0, rawProgress));

      const travelPx = Math.min(p * cableTravel, cableTravel);

      setLineHeight(travelPx);
      setProgress(p);
      setCableMax(cableTravel);

      const offsets = dotOffsetsRef.current;
      if (offsets) {
        const newLit = offsets.map((o) => travelPx >= o * cableTravel);
        setLitDots((prev) => {
          const newPassed = newLit.map((l, i) => l || (prev[i] ?? false));
          if (JSON.stringify(newPassed) !== JSON.stringify(passedCards)) {
            setPassedCards(newPassed);
          }
          return newLit;
        });
      }

      const nowDocked = travelPx >= cableTravel - 4;
      if (nowDocked !== dockedRef.current) {
        dockedRef.current = nowDocked;
        setDocked(nowDocked);
      }

      // smoothed velocity (px per ~frame)
      const now = performance.now();
      const sd = scrollData.current;
      if (sd.lastY !== null) {
        const dt = Math.max(8, now - sd.lastT);
        const instV = ((window.scrollY - sd.lastY) / dt) * 16.7;
        sd.vy = sd.vy * 0.72 + instV * 0.28;
      }
      sd.lastY = window.scrollY;
      sd.lastT = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Submarine pose loop — lerped pitch/speed applied directly to DOM.
     When docked: levels out, propeller stalls, lights and trail shut down. */
  useEffect(() => {
    let raf;
    const pose = { pitch: 0, speed: 0.18 };

    const tick = () => {
      const sd = scrollData.current;
      sd.vy *= 0.93;
      const isDocked = dockedRef.current;

      const targetPitch = isDocked ? 0 : Math.max(-12, Math.min(12, sd.vy * 0.5));
      const targetSpeed = isDocked ? 0.05 : Math.max(0.18, Math.min(2.6, Math.abs(sd.vy) / 20));

      pose.pitch += (targetPitch - pose.pitch) * 0.07;
      pose.speed += (targetSpeed - pose.speed) * 0.09;

      const rot = `rotate(${pose.pitch.toFixed(2)}deg)`;
      if (subDeskRef.current) subDeskRef.current.style.transform = rot;
      if (subMobRef.current) subMobRef.current.style.transform = rot;

      // stall the propeller almost fully when docked
      const dur = `${Math.max(14, 1.1 / pose.speed).toFixed(2)}s`;
      if (propDeskRef.current) propDeskRef.current.style.animationDuration = dur;
      if (propMobRef.current) propMobRef.current.style.animationDuration = dur;

      const trailOp = isDocked ? 0 : Math.min(0.95, Math.max(0, (pose.speed - 0.3) / 1.5)).toFixed(2);
      if (trailDeskRef.current) trailDeskRef.current.style.opacity = trailOp;
      if (trailMobRef.current) trailMobRef.current.style.opacity = trailOp;

      const lightOp = isDocked ? 0.12 : 1;
      if (lightDeskRef.current) lightDeskRef.current.style.opacity = lightOp;
      if (lightMobRef.current) lightMobRef.current.style.opacity = lightOp;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Depth-zone opacities derived from progress */
  const midnightOp = clamp01((progress - 0.42) / 0.28) * 0.45;
  const abyssOp = clamp01((progress - 0.68) / 0.3) * 0.55;
  const bioOp = clamp01((progress - 0.5) / 0.35);

  const isDeskViewport = typeof window !== 'undefined' && window.innerWidth >= 768;
  const subH = isDeskViewport ? 58 : 36;
  const subHalf = subH * 0.45;
  // ride with center on the tip, but never let the hull pass the cable's end
  const rawTop = lineHeight - subHalf;
  const maxTop = Math.max(0, cableMax - subH);
  const subTop = Math.max(0, Math.min(rawTop, maxTop));

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-[#0c4a6e] via-[#0a1628] to-[#060d1a] overflow-x-hidden">

      {/* ── Depth zone overlays (above background, below content) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[5]">
        <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: midnightOp, background: 'linear-gradient(to bottom, #04101f, #03101d)' }} />
        <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: abyssOp, background: '#02060c' }} />

        {/* bioluminescent particles — wake up in the midnight zone */}
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: bioOp }}>
          {[
            { top: '18%', left: '14%', s: 3, d: '0s' }, { top: '32%', left: '78%', s: 2, d: '.6s' },
            { top: '46%', left: '8%', s: 4, d: '1.1s' }, { top: '58%', left: '88%', s: 2.5, d: '.3s' },
            { top: '66%', left: '22%', s: 3, d: '1.5s' }, { top: '74%', left: '62%', s: 2, d: '.9s' },
            { top: '84%', left: '34%', s: 3.5, d: '1.8s' }, { top: '90%', left: '74%', s: 2.5, d: '.4s' },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                top: p.top, left: p.left, width: p.s, height: p.s,
                background: '#67e8f9',
                boxShadow: '0 0 6px 1px rgba(103,232,249,0.65)',
                animationDelay: p.d,
                animationDuration: '7s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Underwater ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[15%] left-[12%] w-3 h-3 rounded-full border border-white/12 animate-bubble-rise" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-[8%] left-[30%] w-2 h-2 rounded-full border border-white/10 animate-bubble-rise" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] right-[18%] w-4 h-4 rounded-full border border-white/8 animate-bubble-rise" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute bottom-[10%] right-[35%] w-2.5 h-2.5 rounded-full border border-white/10 animate-bubble-rise" style={{ animationDuration: '10s', animationDelay: '3s' }} />
        <div className="absolute bottom-[25%] left-[50%] w-1.5 h-1.5 rounded-full border border-white/12 animate-bubble-rise" style={{ animationDuration: '6s', animationDelay: '4s' }} />
      </div>

      {/* Hero Header — surface briefing */}
      <section className="relative py-20 overflow-hidden z-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
              Our{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">History</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light max-w-2xl animate-fade-up" style={{ animationDelay: '240ms' }}>
              Our journey from our founding to the present
            </p>
          </div>
        </div>
      </section>

      {/* ── Timeline: the dive path ── */}
      <section className="relative py-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={timelineRef} className="relative pb-44">

            {/* Cable track — desktop center */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-24 w-[3px] -translate-x-1/2 rounded-full"
              style={{ background: 'repeating-linear-gradient(to bottom, rgba(148,163,184,0.16) 0px, rgba(148,163,184,0.16) 10px, transparent 10px, transparent 18px)' }}
            />
            <div
              className="hidden md:block absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full"
              style={{ height: `${lineHeight}px`, background: 'linear-gradient(to bottom, rgba(56,189,248,0.85), rgba(56,189,248,0.45))' }}
            >
              <div className="absolute inset-0 line-flow opacity-70 rounded-full" />
            </div>

            {/* Cable track — mobile left */}
            <div
              className="md:hidden absolute left-6 top-0 bottom-24 w-[3px] -translate-x-1/2 rounded-full"
              style={{ background: 'repeating-linear-gradient(to bottom, rgba(148,163,184,0.16) 0px, rgba(148,163,184,0.16) 10px, transparent 10px, transparent 18px)' }}
            />
            <div
              className="md:hidden absolute left-6 top-0 w-[3px] -translate-x-1/2 rounded-full"
              style={{ height: `${lineHeight}px`, background: 'linear-gradient(to bottom, rgba(56,189,248,0.85), rgba(56,189,248,0.45))' }}
            >
              <div className="absolute inset-0 line-flow opacity-70 rounded-full" />
            </div>

            {/* THE SUBMARINE — rides the cable, docks at its end */}
            <Submarine
              size="desktop"
              topPx={subTop}
              docked={docked}
              svgRef={subDeskRef}
              propRef={propDeskRef}
              trailRef={trailDeskRef}
              lightRef={lightDeskRef}
            />
            <Submarine
              size="mobile"
              topPx={subTop}
              docked={docked}
              svgRef={subMobRef}
              propRef={propMobRef}
              trailRef={trailMobRef}
              lightRef={lightMobRef}
            />

            <div className="space-y-24 relative">
              {historyData.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const lit = litDots[idx];
                const passed = passedCards[idx];
                const photos = (item.photos || []).slice(0, 5);

                return (
                  <div
                    key={idx}
                    className={`reveal-row relative flex items-start gap-8 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    style={{ '--emerge': isLeft ? '72px' : '-72px', '--origin': isLeft ? 'right' : 'left' }}
                  >

                    {/* Sonar contact log card — emerges outward from the cable */}
                    <div className={`flex-1 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div
                        className={`log-card group relative rounded-3xl p-7 sm:p-8 border transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.09]
                          bg-white/[0.06] backdrop-blur-md border-white/12
                          ${lit ? '!border-sky-400/30 shadow-xl shadow-sky-500/5' : ''}
                          ${passed ? 'spotlight-card' : ''}
                          hover:border-sky-400/30 hover:shadow-2xl hover:shadow-sky-500/10`}
                      >
                        {/* Spotlight sweep overlay — smooth light beam when passed */}
                        {passed && <div className="spotlight-sweep" aria-hidden="true" />}

                        <div className="relative z-10">
                          {/* stamped log header */}
                          <div className={`inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] px-3.5 py-2 rounded-lg border mb-5 ${
                            lit
                              ? 'border-sky-400/40 bg-sky-500/10 text-sky-200'
                              : 'border-white/15 bg-white/5 text-white/40'
                          } ${isLeft ? 'md:ml-auto' : ''}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${lit ? 'bg-sky-400 animate-pulse' : 'bg-white/25'}`} />
                            {item.year}
                          </div>

                          {/* Stacked polaroid photos — fan out on hover */}
                          {photos.length > 0 && (
                            <div className="photo-stack photo-stack-float relative h-72 sm:h-80 mb-6">
                              {/* Tether line to timeline cable */}
                              <div className={`photo-tether ${isLeft ? 'photo-tether-right' : 'photo-tether-left'}`} />

                              {/* Photos fanned from back to front */}
                              {photos.map((src, pIdx) => {
                                const total = photos.length;
                                const isLast = pIdx === total - 1;
                                const z = pIdx + 1;
                                return (
                                  <div
                                    key={pIdx}
                                    className={`photo-layer ${isLast ? 'photo-layer-front' : ''}`}
                                    style={{ zIndex: z }}
                                  >
                                    <img src={src} alt="" loading="lazy" />
                                  </div>
                                );
                              })}

                              {/* Sonar ping effect on hover */}
                              <span className="photo-sonar" />
                            </div>
                          )}

                          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-3 leading-snug group-hover:text-sky-300 transition-colors">
                            {item.title}
                          </h2>

                          <p className="text-white/55 text-sm leading-relaxed font-light mb-6">
                            {item.description}
                          </p>

                          {item.milestones && item.milestones.length > 0 && (
                            <div className="pt-5 border-t border-white/10 space-y-2.5">
                              <span className="text-xs font-bold text-white/30 uppercase tracking-wider block mb-1">
                                Key Achievements:
                              </span>
                              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${isLeft ? 'md:text-left' : ''}`}>
                                {item.milestones.map((m, mIdx) => (
                                  <div key={mIdx} className={`flex items-start gap-2 text-xs text-white/60 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}>
                                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${lit ? 'text-sky-400/90' : 'text-sky-400/40'}`} />
                                    <span>{m}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dotted connector: draws from the cable outward to the card */}
                    <div
                      aria-hidden="true"
                      className={`log-conn hidden md:block absolute top-9 border-t-2 border-dashed transition-colors duration-500 ${
                        lit ? 'border-sky-400/35' : 'border-white/10'
                      } ${isLeft ? 'right-1/2 mr-4' : 'left-1/2 ml-4'} w-12`}
                    />

                    {/* Center sonar dot — desktop */}
                    <div
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-7 z-10"
                      ref={(el) => { dotRefs.current[idx] = el; }}
                    >
                      <div className="relative">
                        {lit && <span className="sonar-ring" />}
                        <div
                          className={`w-5 h-5 rounded-full ring-4 flex items-center justify-center transition-all duration-500 ${
                            lit
                              ? 'dot-lit bg-gradient-to-br from-sky-400 to-blue-500 ring-sky-400/25'
                              : 'bg-white/10 ring-white/10'
                          }`}
                          style={lit ? { boxShadow: '0 0 18px rgba(56,189,248,0.5)' } : {}}
                        >
                          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${lit ? 'bg-white' : 'bg-white/30'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Mobile dot */}
                    <div className="md:hidden absolute left-6 -translate-x-1/2 top-7 z-10">
                      <div className="relative">
                        {lit && <span className="sonar-ring" />}
                        <div
                          className={`w-4 h-4 rounded-full ring-4 flex items-center justify-center transition-all duration-500 ${
                            lit
                              ? 'dot-lit bg-gradient-to-br from-sky-400 to-blue-500 ring-sky-400/25'
                              : 'bg-white/10 ring-white/10'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${lit ? 'bg-white' : 'bg-white/30'}`} />
                        </div>
                      </div>
                    </div>

                    {/* Empty spacer */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                );
              })}
            </div>

            {/* ── Bioluminescent particles — ambient deep-sea glow ── */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
              {[
                { top: '5%', left: '8%', size: 3, dur: '8s', delay: '0s' },
                { top: '12%', left: '72%', size: 2, dur: '10s', delay: '1.5s' },
                { top: '20%', left: '35%', size: 4, dur: '7s', delay: '3s' },
                { top: '28%', left: '88%', size: 2, dur: '9s', delay: '0.5s' },
                { top: '35%', left: '15%', size: 3, dur: '11s', delay: '2s' },
                { top: '42%', left: '60%', size: 2, dur: '8s', delay: '4s' },
                { top: '50%', left: '5%', size: 3, dur: '10s', delay: '1s' },
                { top: '55%', left: '82%', size: 4, dur: '7s', delay: '2.5s' },
                { top: '62%', left: '45%', size: 2, dur: '9s', delay: '3.5s' },
                { top: '68%', left: '92%', size: 3, dur: '11s', delay: '0.8s' },
                { top: '75%', left: '20%', size: 2, dur: '8s', delay: '4.5s' },
                { top: '80%', left: '68%', size: 3, dur: '10s', delay: '1.8s' },
                { top: '85%', left: '10%', size: 4, dur: '7s', delay: '3.2s' },
                { top: '90%', left: '50%', size: 2, dur: '9s', delay: '0.3s' },
                { top: '95%', left: '78%', size: 3, dur: '11s', delay: '2.8s' },
              ].map((p, i) => (
                <span
                  key={i}
                  className="bio-particle"
                  style={{
                    top: p.top,
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    animationDuration: p.dur,
                    animationDelay: p.delay,
                  }}
                />
              ))}
            </div>

            {/* Seafloor — welcomes the final log entry in the abyssal zone */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] max-w-none pointer-events-none transition-opacity duration-700"
              style={{ opacity: 0.45 + abyssOp * 0.55 }}
            >
              <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-36 sm:h-44 block">
                {/* kelp strands */}
                <path d="M180 160 C175 120 190 95 178 62 C174 50 182 44 186 52 C196 86 184 118 192 160 Z" fill="#071a29" />
                <path d="M1240 160 C1248 115 1230 92 1246 58 C1250 48 1242 42 1238 52 C1228 84 1242 120 1232 160 Z" fill="#071a29" />
                <path d="M420 160 C416 130 428 112 420 88 C417 80 423 76 426 82 C433 104 424 132 430 160 Z" fill="#081e30" />
                <path d="M1020 160 C1026 128 1012 108 1024 84 C1027 76 1021 72 1018 79 C1010 100 1022 134 1014 160 Z" fill="#081e30" />
                {/* seabed */}
                <path d="M0,160 L0,124 Q140,106 300,120 T620,116 T960,122 T1260,114 T1440,122 L1440,160 Z" fill="#030a13" />
                <path d="M0,160 L0,138 Q240,126 480,136 T960,134 T1440,138 L1440,160 Z" fill="#0A1628" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
