import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { robotsData, robotCategories } from '../data/robotsData';
import ImageWithFallback from '../components/ImageWithFallback';
import RobotModal from '../components/RobotModal';
import { Anchor, Waves, ArrowRight, Radar, Award, Cpu, Gauge } from 'lucide-react';
import { TiltCard } from '../components/motion';

const statusColors = {
  Active: 'bg-emerald-500/90 text-white',
  Legacy: 'bg-amber-500/90 text-white',
  'In Development': 'bg-sky-500/90 text-white',
};

const statusDots = {
  Active: 'bg-emerald-400',
  Legacy: 'bg-amber-400',
  'In Development': 'bg-sky-400',
};

export default function RobotsPage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const robotRefs = useRef({});
  const hasScrolled = useRef(false);

  const pillWrapRef = useRef(null);
  const pillBtnRefs = useRef({});
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const updatePill = () => {
      const wrap = pillWrapRef.current;
      const btn = pillBtnRefs.current[activeCategory];
      if (!wrap || !btn) return;
      setPill({ left: btn.offsetLeft, width: btn.offsetWidth, visible: true });
    };
    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [activeCategory]);

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

  const featured = filteredRobots[0];
  const rest = filteredRobots.slice(1);

  return (
    <div className="min-h-screen bg-[#060d1a]">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-olympic-900 to-[#060d1a]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-sky-500/8 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-[10%] right-[15%] w-48 h-48 bg-blue-500/6 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="absolute right-[12%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none" aria-hidden="true">
          <div className="relative w-40 h-40">
            {[0, 1, 2].map((i) => (
              <span key={i} className="absolute inset-0 rounded-full border border-sky-400/20"
                style={{ animation: `sonarPing 3.6s cubic-bezier(0, 0.2, 0.8, 1) ${i * 1.2}s infinite` }} />
            ))}
            <Radar className="absolute inset-0 m-auto w-7 h-7 text-sky-400/50" />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute bottom-0 left-[18%] w-2 h-2 rounded-full border border-white/15 animate-bubble-rise" style={{ animationDuration: '7s' }} />
          <div className="absolute bottom-0 left-[42%] w-3 h-3 rounded-full border border-white/10 animate-bubble-rise" style={{ animationDuration: '9s', animationDelay: '2s' }} />
          <div className="absolute bottom-0 right-[28%] w-2 h-2 rounded-full border border-white/12 animate-bubble-rise" style={{ animationDuration: '8s', animationDelay: '4s' }} />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5 animate-fade-up">
                Aterkia Robots{' '}
                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Year by Year</span>
              </h1>
              <p className="text-white/45 text-base sm:text-lg font-light max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '150ms' }}>
                The complete collection of surface vehicles (ASV) and underwater robots (AUV) designed and built by Team Aterkia.
              </p>
            </div>

            <div
              ref={pillWrapRef}
              className="relative flex items-center bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-sm self-start lg:self-auto animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <div
                className="absolute top-1.5 bottom-1.5 rounded-xl bg-sky-500 shadow-lg shadow-sky-500/25 transition-all duration-300 ease-out"
                style={{ left: `${pill.left}px`, width: `${pill.width}px`, opacity: pill.visible ? 1 : 0 }}
              />
              {robotCategories.map((cat) => {
                const isSelected = activeCategory === cat;
                const count = cat === 'All' ? robotsData.length : robotsData.filter(r => r.category === cat).length;
                return (
                  <button key={cat} ref={(el) => { pillBtnRefs.current[cat] = el; }}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative z-10 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 ${
                      isSelected ? 'text-white' : 'text-white/45 hover:text-white'
                    }`}>
                    <span>{cat}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-white/25 text-white' : 'bg-white/10 text-white/35'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Robot Grid — DARK glass cards */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Featured robot — full-width horizontal card */}
          {featured && (
            <div ref={(el) => { robotRefs.current[featured.id] = el; }} className="reveal-zoom">
              <TiltCard maxTilt={3}>
                <div
                  onClick={() => setSelectedRobot(featured)}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-sky-400/25 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-sky-500/10"
                >
                  {/* Accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 z-10 ${
                    featured.category === 'AUV'
                      ? 'bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300'
                      : 'bg-gradient-to-r from-olympic-700 via-sky-500 to-sky-300'
                  }`} />

                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-1/2 h-64 sm:h-72 md:h-auto min-h-[280px] overflow-hidden">
                      <ImageWithFallback
                        src={featured.image} alt={featured.name} name={featured.name}
                        category={featured.category} type="robot"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#060d1a]/60" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase backdrop-blur-sm ${featured.category === 'AUV' ? 'bg-blue-500/80 text-white' : 'bg-olympic-600/80 text-white'}`}>
                          {featured.category === 'AUV' ? <Waves className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                          {featured.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg uppercase backdrop-blur-sm ${statusColors[featured.status]}`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${statusDots[featured.status]}`} />
                          {featured.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-1/2 p-7 sm:p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/30 font-mono">{featured.year}</span>
                      </div>
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 group-hover:text-sky-300 transition-colors">
                        {featured.name}
                      </h2>
                      <p className="text-sky-300/60 text-sm font-medium mb-4">{featured.snippet}</p>
                      <p className="text-white/40 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                        {featured.description}
                      </p>

                      {/* Specs mini-grid */}
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {Object.entries(featured.specs).slice(0, 4).map(([k, v]) => (
                          <div key={k} className="bg-white/[0.04] border border-white/8 rounded-xl p-3">
                            <span className="text-[10px] text-white/30 uppercase block mb-0.5">{k}</span>
                            <span className="text-xs text-white/70 font-medium">{v}</span>
                          </div>
                        ))}
                      </div>

                      {/* Achievements */}
                      {featured.achievements.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featured.achievements.map((a, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/20">
                              <Award className="w-3 h-3" /> {a}
                            </span>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedRobot(featured); }}
                        className="self-start flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group/btn"
                      >
                        <span>View Full Specifications</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          )}

          {/* Remaining robots — 2-column dark glass grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((robot, idx) => {
                const isAUV = robot.category === 'AUV';
                const isOdd = idx % 2 === 1;
                return (
                  <div key={robot.id} className={isOdd ? 'md:mt-8' : ''}>
                    <div
                      ref={(el) => { robotRefs.current[robot.id] = el; }}
                      className={`${isOdd ? 'reveal-right' : 'reveal-left'}`}
                      style={{ transitionDelay: `${(idx % 2) * 120}ms` }}
                    >
                      <TiltCard maxTilt={4}>
                        <div
                          onClick={() => setSelectedRobot(robot)}
                          className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-sky-400/25 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-sky-500/10"
                        >
                          {/* Accent line */}
                          <div className={`absolute top-0 left-0 right-0 h-0.5 z-10 ${
                            isAUV ? 'bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300'
                              : 'bg-gradient-to-r from-olympic-700 via-sky-500 to-sky-300'
                          }`} />

                          {/* Image */}
                          <div className="relative h-48 w-full overflow-hidden">
                            <ImageWithFallback
                              src={robot.image} alt={robot.name} name={robot.name}
                              category={robot.category} type="robot"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              containerClassName="w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/70 via-transparent to-transparent" />

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex gap-1.5">
                              <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase backdrop-blur-sm ${
                                isAUV ? 'bg-blue-500/80 text-white' : 'bg-olympic-600/80 text-white'
                              }`}>
                                {isAUV ? <Waves className="w-3 h-3" /> : <Anchor className="w-3 h-3" />}
                                {robot.category}
                              </span>
                            </div>

                            {/* Status dot */}
                            <div className="absolute top-3 right-3">
                              <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm ${statusColors[robot.status]}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusDots[robot.status]}`} />
                                {robot.status}
                              </span>
                            </div>

                            {/* Hover arrow */}
                            <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              <ArrowRight className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] text-white/25 font-mono">{robot.year}</span>
                            </div>
                            <h2 className="font-display font-bold text-lg text-white mb-1 group-hover:text-sky-300 transition-colors">
                              {robot.name}
                            </h2>
                            <p className="text-sky-300/50 text-xs font-medium mb-3">{robot.snippet}</p>

                            {/* Specs mini-grid */}
                            <div className="grid grid-cols-2 gap-1.5 mb-4">
                              {Object.entries(robot.specs).slice(0, 4).map(([k, v]) => (
                                <div key={k} className="bg-white/[0.03] border border-white/6 rounded-lg px-2.5 py-2">
                                  <span className="text-[9px] text-white/25 uppercase block">{k}</span>
                                  <span className="text-[11px] text-white/60 font-medium">{v}</span>
                                </div>
                              ))}
                            </div>

                            {/* Achievements */}
                            {robot.achievements.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {robot.achievements.map((a, i) => (
                                  <span key={i} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md bg-amber-500/10 text-amber-400/80 border border-amber-500/15">
                                    <Award className="w-2.5 h-2.5" /> {a}
                                  </span>
                                ))}
                              </div>
                            )}

                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedRobot(robot); }}
                              className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-sky-500/20 text-white/50 hover:text-sky-300 text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 hover:border-sky-400/20"
                            >
                              <span>View Specifications</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedRobot && (
        <RobotModal robot={selectedRobot} onClose={() => {
          setSelectedRobot(null);
          window.history.replaceState({}, '', '/robots');
        }} />
      )}
    </div>
  );
}
