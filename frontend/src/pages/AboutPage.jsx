import React, { useState, useEffect, useRef } from 'react';
import { aboutData } from '../data/aboutData';
import { Trophy, Target, Compass, ChevronLeft, ChevronRight, Waves, Users } from 'lucide-react';
import { TiltCard, Spotlight, useReveal } from '../components/motion';
import Divisions from '../components/Divisions';
import ActivitiesSection from '../components/ActivitiesSection';
import RoadmapSection from '../components/RoadmapSection';

const whyIcons = { Waves, Trophy, Users };

export default function AboutPage() {
  const addSectionRef = useReveal();

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-olympic-900 to-olympic-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-sky-500/8 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-[15%] right-[10%] w-56 h-56 bg-blue-400/6 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-5">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-display text-white tracking-tight leading-[1.1] animate-fade-up">
                <span className="inline-block">About</span>{' '}
                <span className="inline-block gradient-text">Aterkia</span>
              </h1>
            </div>

            <div className="overflow-hidden mb-4">
              <p className="text-sky-300/80 text-lg sm:text-xl font-medium animate-fade-up" style={{ animationDelay: '150ms' }}>
                {aboutData.subtitle}
              </p>
            </div>

            <div className="overflow-hidden">
              <p className="text-white/40 text-base sm:text-lg leading-relaxed font-light max-w-2xl animate-fade-up" style={{ animationDelay: '300ms' }}>
                {aboutData.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 animate-fade-up" style={{ animationDelay: '450ms' }}>
              {[
                { value: '4+', label: 'Years Active' },
                { value: '6+', label: 'Competitions' },
                { value: '20+', label: 'Team Members' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black font-display text-white">{stat.value}</div>
                  <div className="text-xs text-white/30 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="relative py-20 bg-gradient-to-b from-olympic-950 to-[#060d1a]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-[25%] left-[12%] w-2 h-2 rounded-full border border-white/8 animate-bubble-rise" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[30%] right-[8%] w-1.5 h-1.5 bg-sky-300/10 rounded-full animate-float" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Vision */}
            <Spotlight className="lg:col-span-5 reveal">
              <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-sky-500/25 transition-colors duration-500 overflow-hidden group">
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
                  <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-sky-400">
                    <circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0020 0h-3" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                    Our Vision
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-6">
                    Where We're Heading
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

            {/* Mission */}
            <MissionStepper />
          </div>
        </div>
      </section>

      {/* Wave: dark → light */}
      <div className="relative leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block h-14 sm:h-20" style={{ background: '#060d1a' }}>
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ── Achievements ── */}
      <section className="relative py-16 sm:py-20 bg-[#f8fafc] overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 reveal" ref={addSectionRef}>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-3">
                <Trophy className="w-4 h-4" />
                Competition Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-olympic-900 tracking-tight">
                Achievements{' '}
                <span className="gradient-text">So Far</span>
              </h2>
            </div>
            <div className="hidden sm:flex gap-2" id="achievement-nav">
              <button onClick={() => scrollAchievements(-1)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-olympic-700 hover:border-olympic-200 transition-all duration-300 shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollAchievements(1)} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-olympic-700 hover:border-olympic-200 transition-all duration-300 shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AchievementScroll achievements={aboutData.achievements} />
        </div>
      </section>

      {/* Wave: light → dark */}
      <div className="relative leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block h-14 sm:h-20" style={{ background: '#f8fafc' }}>
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#060d1a" />
        </svg>
      </div>

      {/* ── Divisions ── */}
      <Divisions />

      {/* ── Kegiatan ── */}
      <ActivitiesSection />

      {/* ── Roadmap ── */}
      <RoadmapSection />

      {/* ── Why Aterkia ── */}
      <section className="relative py-20 bg-gradient-to-b from-[#060d1a] to-olympic-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[35%] left-[45%] w-64 h-64 bg-sky-500/4 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 reveal" ref={addSectionRef}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
              <Compass className="w-4 h-4" />
              Why Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              Why{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Aterkia</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {aboutData.whyAterkia.map((item, idx) => {
              const Icon = whyIcons[item.icon] || Waves;
              return (
                <div key={idx} className="reveal-zoom" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <Spotlight color="56,189,248" opacity={0.08} className="h-full rounded-2xl">
                    <div className="group relative h-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl p-7 hover:border-sky-500/20 hover:bg-white/[0.07] transition-all duration-500">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </Spotlight>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Slogan ── */}
      <section className="relative overflow-hidden border-t border-sky-400/10 bg-[#050b16] py-12 sm:py-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400">Our spirit</span>
            <span className="hidden text-xs font-light text-white/30 sm:block">Scroll to explore the journey</span>
          </div>

          <div className="overflow-hidden pb-3">
            <div className="flex w-full items-center justify-between gap-2 sm:gap-5">
              {aboutData.slogan.lines.map((line, idx) => (
                <React.Fragment key={line}>
                  <h2
                    className={`min-w-0 flex-1 whitespace-nowrap text-center text-[clamp(1.05rem,5.8vw,4.5rem)] font-black font-display tracking-[-0.07em] ${
                      idx === 0
                        ? 'bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent'
                        : idx === 1
                        ? 'text-white/75'
                        : 'bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent'
                    }`}
                  >
                    {line}
                  </h2>
                  {idx < aboutData.slogan.lines.length - 1 && (
                    <span className="shrink-0 text-base font-light text-white/20 sm:text-3xl" aria-hidden="true">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-xl text-xs font-light leading-relaxed text-white/35 sm:text-sm">
            {aboutData.slogan.subtitle}
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── Achievement horizontal scroll ── */
function AchievementScroll({ achievements }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollAchievements = scroll;
    return () => { delete window.scrollAchievements; };
  }, []);

  return (
    <div ref={scrollRef}
      className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {achievements.map((item, idx) => (
        <div key={idx} className="snap-start shrink-0 w-[300px] sm:w-[340px] reveal-zoom" style={{ transitionDelay: `${idx * 80}ms` }}>
          <TiltCard maxTilt={3} className="h-full">
            <div className="group relative h-full bg-white border border-slate-100 rounded-3xl p-7 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-olympic-100 transition-all duration-500">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-olympic-50 border border-olympic-100 text-olympic-600 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="shine-wrap w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-200">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-black text-olympic-900 font-display block">{item.year}</span>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg text-olympic-900 mb-3 leading-snug group-hover:text-olympic-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed font-light">
                {item.description}
              </p>

              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
            </div>
          </TiltCard>
        </div>
      ))}
    </div>
  );
}

function scrollAchievements(dir) {
  const scrollRef = document.querySelector('.scrollbar-hide');
  if (scrollRef) scrollRef.scrollBy({ left: dir * 340, behavior: 'smooth' });
}

/* ── Mission stepper ── */
function MissionStepper() {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
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
