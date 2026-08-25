import React, { useState, useEffect, useRef } from 'react';
import { aboutData } from '../data/aboutData';
import { Trophy, Target, Compass, Zap, BookOpen, TestTube, ArrowRight, Quote } from 'lucide-react';
import { TiltCard, Spotlight, useReveal } from '../components/motion';

export default function AboutPage() {
  const addSectionRef = useReveal();

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-olympic-900 to-olympic-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-sky-500/8 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-[15%] right-[10%] w-56 h-56 bg-blue-400/6 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5 animate-fade-up">
              About <span className='gradient-text'>Aterkia</span>
            </h1>
            <p className="text-sky-300/80 text-lg font-medium mb-4 animate-fade-up" style={{ animationDelay: '120ms' }}>
              {aboutData.subtitle}
            </p>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed font-light max-w-2xl animate-fade-up" style={{ animationDelay: '240ms' }}>
              {aboutData.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-20 bg-gradient-to-b from-olympic-950 to-[#060d1a]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-[25%] left-[12%] w-2 h-2 rounded-full border border-white/8 animate-bubble-rise" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[15%] right-[20%] w-3 h-3 rounded-full border border-white/6 animate-bubble-rise" style={{ animationDuration: '10s', animationDelay: '3s' }} />
          <div className="absolute top-[30%] right-[8%] w-1.5 h-1.5 bg-sky-300/10 rounded-full animate-float" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Vision — spotlight glass + giant quote watermark */}
            <Spotlight className="lg:col-span-5 reveal" >
              <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-sky-500/25 transition-colors duration-500 overflow-hidden">
                <Quote className="absolute -top-3 -left-2 w-28 h-28 text-white/[0.045] rotate-180 pointer-events-none" strokeWidth={1} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-400 mb-6">
                    <Target className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                    Our Vision
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-6">
                    Aterkia Vision
                  </h2>

                  <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light italic border-l-2 border-sky-500/30 pl-5">
                    "{aboutData.vision}"
                  </p>

                  <div className="pt-6 mt-6 border-t border-white/10 text-xs text-white/30 font-medium">
                    Fakultas Teknik • Universitas Diponegoro
                  </div>
                </div>
              </div>
            </Spotlight>

            {/* Mission — self-drawing stepper */}
            <MissionStepper />
          </div>
        </div>
      </section>

      {/* Wave transition: dark vision/mission → light achievements */}
      <div className="relative leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block h-14 sm:h-20" style={{ background: '#060d1a' }}>
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* Achievements — LIGHT, tilt + shine sweep */}
      <section className="relative py-16 sm:py-20 bg-[#f8fafc] overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 reveal" ref={addSectionRef}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-4">
              <Trophy className="w-4 h-4" />
              Competition Track Record
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-olympic-900 tracking-tight leading-tight">
              Achievements{' '}
              <span className="gradient-text">So Far</span>
            </h2>
            <p className="text-slate-500 text-base mt-3 font-light">
              A collection of awards and achievements by Team Aterkia in national & international competitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {aboutData.achievements.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  ref={addSectionRef}
                  className={isLeft ? 'reveal-left' : 'reveal-right'}
                  style={{ transitionDelay: `${(idx % 2) * 100}ms` }}
                >
                  <TiltCard maxTilt={4} className="h-full group relative bg-white border border-slate-100 rounded-3xl p-7 sm:p-8 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-olympic-100 hover:border-olympic-100 transition-shadow duration-500 cursor-default">
                    {/* Accent corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-3xl pointer-events-none">
                      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-100 rotate-45" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5">
                          <div className="shine-wrap w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-200">
                            <Trophy className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-black text-olympic-900 font-display">{item.year}</span>
                        </div>
                        <span className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-olympic-50 border border-olympic-100 text-olympic-600 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-olympic-900 mb-3 leading-snug group-hover:text-olympic-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-slate-500 text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wave transition: light achievements → dark core values */}
      <div className="relative leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block h-14 sm:h-20" style={{ background: '#f8fafc' }}>
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#060d1a" />
        </svg>
      </div>

      {/* Core Values — floating icons + spotlight */}
      <section className="relative py-20 bg-gradient-to-b from-[#060d1a] to-olympic-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[35%] left-[45%] w-64 h-64 bg-sky-500/4 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 reveal" ref={addSectionRef}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
              <Zap className="w-4 h-4" />
              Research Philosophy
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
              Core Values &{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Principles</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.coreValues.map((val, idx) => {
              const icons = [BookOpen, TestTube, ArrowRight];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  ref={addSectionRef}
                  className="reveal-zoom"
                  style={{ transitionDelay: `${idx * 110}ms` }}
                >
                  <Spotlight color="56,189,248" opacity={0.12} className="h-full rounded-3xl">
                    <div className="group relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-sky-500/25 transition-colors duration-500">
                      {/* Top accent */}
                      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

                      <div className="flex items-center justify-between mb-6">
                        <span className="text-5xl font-black font-display text-white/5 group-hover:text-white/10 transition-colors duration-500">
                          0{idx + 1}
                        </span>
                        <div className="animate-float w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/15 transition-colors duration-300"
                          style={{ animationDelay: `${idx * 0.8}s`, animationDuration: '5s' }}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-sky-300 transition-colors">
                        {val.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-light">
                        {val.description}
                      </p>
                    </div>
                  </Spotlight>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Mission stepper: line draws itself as you scroll, numbers ignite ── */
function MissionStepper() {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: how far viewport middle has traveled through the list
      const raw = (vh * 0.65 - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stepThreshold = (i) => (i + 0.5) / aboutData.missions.length;

  return (
    <div className="lg:col-span-7 reveal" style={{ transitionDelay: '150ms' }}>
      <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-blue-500/25 transition-colors duration-500">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-6">
          <Compass className="w-7 h-7" />
        </div>

        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
          Our Missions
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-8">
          Aterkia Mission
        </h2>

        <div ref={wrapRef} className="relative pl-2">
          {/* track + drawing line */}
          <div className="absolute left-[23px] top-3 bottom-3 w-px bg-white/8" />
          <div
            className="absolute left-[23px] top-3 w-px bg-gradient-to-b from-blue-400 to-sky-400"
            style={{ height: `${progress * 100}%`, maxHeight: 'calc(100% - 24px)' }}
          />

          <div className="space-y-6">
            {aboutData.missions.map((mission, idx) => {
              const lit = progress >= stepThreshold(idx);
              return (
                <div key={idx} className="flex items-start gap-5 relative">
                  <div
                    className={`relative z-10 w-[38px] h-[38px] shrink-0 -ml-[2px] rounded-2xl flex items-center justify-center text-sm font-black border transition-all duration-500 ${
                      lit
                        ? 'bg-gradient-to-br from-blue-500 to-sky-500 border-transparent text-white shadow-lg shadow-sky-500/25 scale-105'
                        : 'bg-[#0a1628] border-white/12 text-white/30'
                    }`}
                    style={{ marginLeft: '-1px' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className={`text-sm sm:text-base leading-relaxed font-light pt-2 transition-colors duration-500 ${
                    lit ? 'text-white/75' : 'text-white/35'
                  }`}>
                    {mission}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
