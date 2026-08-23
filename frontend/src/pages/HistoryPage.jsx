import React, { useState, useEffect, useRef } from 'react';
import { historyData } from '../data/historyData';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function HistoryPage() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const dotRefs = useRef([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [litDots, setLitDots] = useState([]);
  const dotOffsetsRef = useRef(null);

  const yearColors = [
    { bg: 'bg-olympic-500', shadow: 'shadow-olympic-500/30' },
    { bg: 'bg-blue-500', shadow: 'shadow-blue-500/30' },
    { bg: 'bg-olympic-600', shadow: 'shadow-olympic-600/30' },
    { bg: 'bg-olympic-400', shadow: 'shadow-olympic-400/30' },
  ];

  const measureDots = () => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const tRect = timeline.getBoundingClientRect();
    const offsets = dotRefs.current.map((ref) => {
      if (!ref) return 0;
      const dRect = ref.getBoundingClientRect();
      return (dRect.top + dRect.height / 2 - tRect.top) / tRect.height;
    });
    dotOffsetsRef.current = offsets;
  };

  useEffect(() => {
    const timer = setTimeout(measureDots, 300);
    window.addEventListener('resize', measureDots);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measureDots); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const timeline = timelineRef.current;
      if (!container || !timeline) return;

      const containerRect = container.getBoundingClientRect();
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top - containerRect.top;
      const timelineHeight = timelineRect.height;

      const scrollY = -containerRect.top;
      const viewportMiddle = window.innerHeight / 2;

      const rawProgress = (scrollY + viewportMiddle - timelineTop) / timelineHeight;
      const progress = Math.min(1, Math.max(0, rawProgress));

      setLineHeight(progress * timelineHeight);

      const offsets = dotOffsetsRef.current;
      if (offsets) {
        setLitDots(offsets.map((o) => progress >= o));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-[#0c4a6e] via-[#0a1628] to-[#060d1a]">

      {/* Underwater ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[15%] left-[12%] w-3 h-3 rounded-full border border-white/12 animate-bubble-rise" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-[8%] left-[30%] w-2 h-2 rounded-full border border-white/10 animate-bubble-rise" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] right-[18%] w-4 h-4 rounded-full border border-white/8 animate-bubble-rise" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute bottom-[10%] right-[35%] w-2.5 h-2.5 rounded-full border border-white/10 animate-bubble-rise" style={{ animationDuration: '10s', animationDelay: '3s' }} />
        <div className="absolute bottom-[25%] left-[50%] w-1.5 h-1.5 rounded-full border border-white/12 animate-bubble-rise" style={{ animationDuration: '6s', animationDelay: '4s' }} />

        <div className="absolute top-[30%] left-[18%] w-1 h-1 bg-white/12 rounded-full animate-float" />
        <div className="absolute top-[55%] left-[70%] w-1.5 h-1.5 bg-sky-300/8 rounded-full animate-float-delayed" />
        <div className="absolute top-[42%] right-[20%] w-1 h-1 bg-cyan-300/8 rounded-full animate-float" />
      </div>

      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden z-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5">
              The Journey of{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Aterkia</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              Tracing the development of Aterkia from its founding by engineering students of Universitas Diponegoro to today's maritime research achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={timelineRef} className="relative">

            {/* Background track line — desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/5" />
            {/* Progress fill line — desktop */}
            <div
              className="hidden md:block absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-sky-400/60 via-sky-400/40 to-sky-400/15 transition-none"
              style={{ height: `${lineHeight}px` }}
            />
            {/* Background track line — mobile */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-white/5" />
            {/* Progress fill line — mobile */}
            <div
              className="md:hidden absolute left-6 top-0 w-px bg-gradient-to-b from-sky-400/60 via-sky-400/40 to-sky-400/15 transition-none"
              style={{ height: `${lineHeight}px` }}
            />

            <div className="space-y-16">
              {historyData.map((item, idx) => {
                const color = yearColors[idx % yearColors.length];
                const isLeft = idx % 2 === 0;

                return (
                  <div key={idx} className={`relative flex items-start gap-8 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    {/* Content Card */}
                    <div className={`flex-1 md:w-1/2 ${isLeft ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                      <div className={`group relative rounded-3xl p-7 sm:p-8 border transition-all duration-500 hover:-translate-y-1
                        bg-white/10 backdrop-blur-md border-white/15 hover:bg-white/15 hover:border-white/25 hover:shadow-xl hover:shadow-black/20
                        ${isLeft ? 'md:mr-0' : 'md:ml-0'}`}>
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 border border-white/15 mb-4 ${isLeft ? 'md:ml-auto' : ''}`}>
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-sm font-black text-sky-300 font-display">{item.year}</span>
                        </div>

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
                                <div key={mIdx} className={`flex items-start gap-2 text-xs text-white/60 ${isLeft ? 'md:justify-end' : ''}`}>
                                  {isLeft && <span className="hidden md:inline">{m}</span>}
                                  <CheckCircle2 className={`w-4 h-4 text-sky-400/70 shrink-0 mt-0.5 ${isLeft ? 'md:order-2' : ''}`} />
                                  {(!isLeft || typeof window !== 'undefined') && <span className={isLeft ? 'hidden md:inline md:order-1' : ''}>{m}</span>}
                                  {isLeft && <span className="md:hidden">{m}</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center dot — desktop */}
                    <div
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10"
                      ref={(el) => { dotRefs.current[idx] = el; }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full shadow-lg ring-4 flex items-center justify-center transition-all duration-300 ${
                          litDots[idx]
                            ? `${color.bg} ring-white/25 shadow-sky-400/40`
                            : `bg-white/10 ring-white/10`
                        }`}
                        style={litDots[idx] ? { boxShadow: '0 0 14px rgba(56,189,248,0.4)' } : {}}
                      >
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${litDots[idx] ? 'bg-white' : 'bg-white/30'}`} />
                      </div>
                    </div>

                    {/* Mobile dot */}
                    <div className="md:hidden absolute left-6 -translate-x-1/2 z-10">
                      <div className={`w-4 h-4 rounded-full ${color.bg} shadow-md ring-3 ring-white/15 flex items-center justify-center`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      </div>
                    </div>

                    {/* Empty spacer */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                );
              })}
            </div>

            {/* End dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 z-10">
              <div className="w-3 h-3 rounded-full bg-sky-400/30 ring-4 ring-white/10" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
