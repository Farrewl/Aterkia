import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { robotsData, robotCategories } from '../data/robotsData';
import ImageWithFallback from '../components/ImageWithFallback';
import RobotModal from '../components/RobotModal';
import { Anchor, Waves, ArrowRight, Award, Cpu } from 'lucide-react';

const statusColors = {
  Active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Legacy: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'In Development': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
};

const categoryAccent = {
  ASV: { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20', glow: 'shadow-sky-400/10' },
  AUV: { text: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20', glow: 'shadow-teal-400/10' },
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
    <div className="min-h-screen bg-[#0a0f1e]">

      {/* ── Hero ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px'
          }} />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5 animate-fade-up">
              Aterkia{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Robots</span>
            </h1>
            <p className="text-white/40 text-base sm:text-lg font-light max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '150ms' }}>
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
                      ? 'bg-white/10 text-white border-white/20 shadow-lg shadow-white/5'
                      : 'bg-white/[0.03] text-white/40 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60'
                  }`}>
                  <span>{cat}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${activeCategory === cat ? 'bg-white/10 text-white/70' : 'bg-white/[0.04] text-white/30'}`}>
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
        <section className="relative -mt-4 z-10 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={(el) => { robotRefs.current[featured.id] = el; }}
              onClick={() => setSelectedRobot(featured)}
              className="reveal-zoom group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1"
            >
              {/* Full-width image */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
                <ImageWithFallback src={featured.image} alt={featured.name} name={featured.name}
                  category={featured.category} type="robot"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  containerClassName="w-full h-full bg-[#111827]" />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/60 to-transparent" />
              </div>

              {/* Content overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${categoryAccent[featured.category]?.bg} ${categoryAccent[featured.category]?.border} ${categoryAccent[featured.category]?.text}`}>
                    {featured.category === 'AUV' ? <Waves className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                    {featured.category}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${statusColors[featured.status]}`}>
                    {featured.status}
                  </span>
                  <span className="text-xs text-white/30 font-mono">{featured.year}</span>
                </div>

                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {featured.name}
                </h2>
                <p className="text-sky-300/60 text-sm font-medium mb-2">{featured.snippet}</p>
                <p className="text-white/30 text-sm leading-relaxed font-light mb-5 max-w-xl line-clamp-2">{featured.description}</p>

                {/* Specs row */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {Object.entries(featured.specs).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-xl px-4 py-2.5">
                      <span className="text-[10px] text-white/30 uppercase block mb-0.5">{k}</span>
                      <span className="text-xs text-white/80 font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                {featured.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featured.achievements.map((a, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        <Award className="w-3 h-3" /> {a}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Robot Grid ── */}
      {rest.length > 0 && (
        <section className="relative py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10 reveal-zoom">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 text-sm font-semibold">
                <Cpu className="w-4 h-4" />
                <span>All Robots</span>
              </div>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rest.map((robot, idx) => {
                const accent = categoryAccent[robot.category] || categoryAccent.ASV;
                return (
                  <div key={robot.id}
                    ref={(el) => { robotRefs.current[robot.id] = el; }}
                    className={`${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    <div
                      onClick={() => setSelectedRobot(robot)}
                      className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-xl hover:shadow-sky-400/5 transition-all duration-500 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <div className="aspect-[16/10]">
                          <ImageWithFallback src={robot.image} alt={robot.name} name={robot.name}
                            category={robot.category} type="robot"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            containerClassName="w-full h-full bg-[#111827]" />
                        </div>
                        {/* Badges overlay */}
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md ${accent.bg} ${accent.border} ${accent.text}`}>
                            {robot.category === 'AUV' ? <Waves className="w-3 h-3" /> : <Anchor className="w-3 h-3" />}
                            {robot.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md ${statusColors[robot.status]}`}>
                            {robot.status}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] text-white/30 font-mono">{robot.year}</span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-sky-300 transition-colors">
                          {robot.name}
                        </h3>
                        <p className="text-sky-300/50 text-xs font-medium mb-3">{robot.snippet}</p>

                        {/* Specs mini */}
                        <div className="grid grid-cols-2 gap-1.5 mb-4">
                          {Object.entries(robot.specs).slice(0, 4).map(([k, v]) => (
                            <div key={k} className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-2">
                              <span className="text-[9px] text-white/25 uppercase block">{k}</span>
                              <span className="text-[11px] text-white/70 font-medium">{v}</span>
                            </div>
                          ))}
                        </div>

                        {/* Achievements */}
                        {robot.achievements.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {robot.achievements.map((a, i) => (
                              <span key={i} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20">
                                <Award className="w-2.5 h-2.5" /> {a}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
