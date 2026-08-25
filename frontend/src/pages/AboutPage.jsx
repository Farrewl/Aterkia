import React, { useEffect, useRef, useCallback } from 'react';
import { aboutData } from '../data/aboutData';
import { Trophy, Target, Compass, Zap, BookOpen, TestTube, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const sectionRefs = useRef([]);

  const addSectionRef = useCallback((el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-olympic-900 to-olympic-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-sky-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-[15%] right-[10%] w-56 h-56 bg-blue-400/6 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5">
              About <span className='gradient-text'>Aterkia</span>
            </h1>
            <p className="text-sky-300/80 text-lg font-medium mb-4">
              {aboutData.subtitle}
            </p>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Vision */}
            <div className="lg:col-span-5 reveal" ref={addSectionRef}>
              <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 hover:bg-white/8 hover:border-white/15 transition-all duration-500">
                {/* Gradient border top */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

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

            {/* Mission */}
            <div className="lg:col-span-7 reveal" ref={addSectionRef} style={{ transitionDelay: '150ms' }}>
              <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 hover:bg-white/8 hover:border-white/15 transition-all duration-500">
                {/* Left accent line */}
                <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-sky-400/40 to-transparent" />

                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-6">
                  <Compass className="w-7 h-7" />
                </div>

                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
                  Our Missions
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-8">
                  Aterkia Mission
                </h2>

                <div className="space-y-5">
                  {aboutData.missions.map((mission, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-sky-500/20 transition-colors duration-300">
                        {idx + 1}
                      </div>
                      <p className="text-white/50 text-sm sm:text-base leading-relaxed font-light pt-1">
                        {mission}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave transition: dark vision/mission → light achievements */}
      <div className="relative leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block h-14 sm:h-20" style={{ background: '#060d1a' }}>
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* Achievements — LIGHT */}
      <section className="relative py-16 sm:py-20 bg-[#f8fafc]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.achievements.map((item, idx) => (
              <div
                key={idx}
                ref={addSectionRef}
                className="reveal group relative bg-white border border-slate-100 rounded-3xl p-7 sm:p-8 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-olympic-100 hover:border-olympic-100 transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-3xl pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-100 rotate-45" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-200">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave transition: light achievements → dark core values */}
      <div className="relative leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block h-14 sm:h-20" style={{ background: '#f8fafc' }}>
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#060d1a" />
        </svg>
      </div>

      {/* Core Values */}
      <section className="relative py-20 bg-gradient-to-b from-[#060d1a] to-olympic-950">
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
                  className="reveal group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/8 hover:border-white/20 hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500 hover:-translate-y-2"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-black font-display text-white/5 group-hover:text-white/10 transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/15 transition-all duration-300">
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
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
