import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { robotsData, robotCategories } from '../data/robotsData';
import ImageWithFallback from '../components/ImageWithFallback';
import RobotModal from '../components/RobotModal';
import { Anchor, Waves, ArrowRight, Award, Calendar, Cpu } from 'lucide-react';

const statusColors = {
  Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Legacy: 'bg-amber-100 text-amber-700 border-amber-200',
  'In Development': 'bg-sky-100 text-sky-700 border-sky-200',
};

const categoryAccent = {
  ASV: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600', dot: 'bg-sky-400', line: 'from-sky-400 to-sky-200' },
  AUV: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', dot: 'bg-teal-400', line: 'from-teal-400 to-teal-200' },
};

export default function RobotsPage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const robotRefs = useRef({});
  const hasScrolled = useRef(false);

  const filteredRobots = activeCategory === 'All'
    ? robotsData
    : robotsData.filter(r => r.category === activeCategory);

  useEffect(() => {
    if (hasScrolled.current) return;
    if (location.state?.selectedRobotId) {
      const robot = robotsData.find(r => r.id === location.state.selectedRobotId);
      if (robot) { hasScrolled.current = true; setSelectedRobot(robot); }
      return;
    }
    const params = new URLSearchParams(location.search);
    const robotId = params.get('robotId');
    if (robotId) {
      const robot = robotsData.find(r => r.id === robotId);
      if (robot) {
        hasScrolled.current = true;
        setActiveCategory('All');
        setTimeout(() => {
          const el = robotRefs.current[robotId];
          if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => setSelectedRobot(robot), 500); }
        }, 300);
      }
    }
  }, [location.search, location.state]);

  // Reveal animation
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const els = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-zoom');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filteredRobots]);

  const featured = filteredRobots[0];
  const rest = filteredRobots.slice(1);

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* ── Hero ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-olympic-900 to-olympic-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-sky-500/8 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-[10%] right-[15%] w-48 h-48 bg-blue-500/6 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5 animate-fade-up">
              Aterkia{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Robots</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg font-light max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '150ms' }}>
              Our collection of autonomous surface vehicles and underwater robots, built for national and international competitions.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mt-8 animate-fade-up" style={{ animationDelay: '300ms' }}>
            {robotCategories.map((cat) => {
              const count = cat === 'All' ? robotsData.length : robotsData.filter(r => r.category === cat).length;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-white text-olympic-900 border-white shadow-lg shadow-black/20'
                      : 'bg-white/10 text-white/60 border-white/15 hover:bg-white/20 hover:text-white'
                  }`}>
                  <span>{cat}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${activeCategory === cat ? 'bg-olympic-100 text-olympic-700' : 'bg-white/10 text-white/40'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Robot — full-width hero card ── */}
      {featured && (
        <section className="relative -mt-12 z-10 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={(el) => { robotRefs.current[featured.id] = el; }}
              onClick={() => setSelectedRobot(featured)}
              className="reveal-zoom group relative bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="relative lg:w-[55%] overflow-hidden">
                  <div className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px]">
                    <ImageWithFallback src={featured.image} alt={featured.name} name={featured.name}
                      category={featured.category} type="robot"
                      className="w-full h-full object-contain p-6 sm:p-10 group-hover:scale-105 transition-transform duration-700"
                      containerClassName="w-full h-full bg-gradient-to-br from-slate-50 to-sky-50/50" />
                  </div>
                  {/* Category accent strip */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${categoryAccent[featured.category]?.line || 'from-sky-400 to-sky-200'}`} />
                </div>

                {/* Content */}
                <div className="lg:w-[45%] p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${categoryAccent[featured.category]?.bg} ${categoryAccent[featured.category]?.border} ${categoryAccent[featured.category]?.text}`}>
                      {featured.category === 'AUV' ? <Waves className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                      {featured.category}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${statusColors[featured.status]}`}>
                      {featured.status}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-olympic-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {featured.name}
                  </h2>
                  <p className="text-sky-600/70 text-sm font-medium mb-3">{featured.snippet}</p>
                  <p className="text-slate-500 text-sm leading-relaxed font-light mb-6 line-clamp-3">{featured.description}</p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {Object.entries(featured.specs).slice(0, 4).map(([k, v]) => (
                      <div key={k} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <span className="text-[10px] text-slate-400 uppercase block mb-0.5">{k}</span>
                        <span className="text-xs text-olympic-800 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  {featured.achievements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featured.achievements.map((a, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                          <Award className="w-3 h-3" /> {a}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700 transition-colors">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Timeline — chronological robot history ── */}
      {rest.length > 0 && (
        <section className="relative py-12 sm:py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="flex items-center gap-3 mb-12 reveal-zoom">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-olympic-900 text-white text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                <span>Our Journey</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />

              <div className="space-y-12 sm:space-y-16">
                {rest.map((robot, idx) => {
                  const isLeft = idx % 2 === 0;
                  const accent = categoryAccent[robot.category] || categoryAccent.ASV;
                  return (
                    <div key={robot.id}
                      ref={(el) => { robotRefs.current[robot.id] = el; }}
                      className={`relative flex items-start gap-8 sm:gap-0 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-6 z-10">
                        <div className={`w-3 h-3 rounded-full ${accent.dot} ring-4 ring-[#f8fafc]`} />
                      </div>

                      {/* Card */}
                      <div className={`flex-1 sm:w-1/2 ${isLeft ? 'sm:pr-16 pl-14 sm:pl-0' : 'sm:pl-16 pl-14'}`}>
                        <div className={`${isLeft ? 'reveal-left' : 'reveal-right'}`} style={{ transitionDelay: `${idx * 80}ms` }}>
                          <div
                            onClick={() => setSelectedRobot(robot)}
                            className="group relative bg-white rounded-2xl shadow-md shadow-slate-200/60 border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-sky-100/40 transition-all duration-500 hover:-translate-y-1"
                          >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                              <div className="aspect-[16/9]">
                                <ImageWithFallback src={robot.image} alt={robot.name} name={robot.name}
                                  category={robot.category} type="robot"
                                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                                  containerClassName="w-full h-full bg-gradient-to-br from-slate-50 to-sky-50/30" />
                              </div>
                              {/* Badges overlay */}
                              <div className="absolute top-3 left-3 flex gap-1.5">
                                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-sm ${accent.bg} ${accent.border} ${accent.text}`}>
                                  {robot.category === 'AUV' ? <Waves className="w-3 h-3" /> : <Anchor className="w-3 h-3" />}
                                  {robot.category}
                                </span>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-sm ${statusColors[robot.status]}`}>
                                  {robot.status}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 sm:p-6">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] text-slate-400 font-mono">{robot.year}</span>
                              </div>
                              <h3 className="font-display font-bold text-lg text-olympic-900 mb-1 group-hover:text-sky-700 transition-colors">
                                {robot.name}
                              </h3>
                              <p className="text-sky-600/60 text-xs font-medium mb-3">{robot.snippet}</p>

                              {/* Specs mini */}
                              <div className="grid grid-cols-2 gap-1.5 mb-4">
                                {Object.entries(robot.specs).slice(0, 4).map(([k, v]) => (
                                  <div key={k} className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-2">
                                    <span className="text-[9px] text-slate-400 uppercase block">{k}</span>
                                    <span className="text-[11px] text-olympic-800 font-medium">{v}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Achievements */}
                              {robot.achievements.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {robot.achievements.map((a, i) => (
                                    <span key={i} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                                      <Award className="w-2.5 h-2.5" /> {a}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 group-hover:text-sky-700 transition-colors">
                                <span>View Details</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Empty spacer (desktop) */}
                      <div className="hidden sm:block flex-1 sm:w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Modal ── */}
      {selectedRobot && (
        <RobotModal robot={selectedRobot} onClose={() => {
          setSelectedRobot(null);
          window.history.replaceState({}, '', '/robots');
        }} />
      )}
    </div>
  );
}
