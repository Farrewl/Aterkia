import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { robotsData, robotCategories } from '../data/robotsData';
import ImageWithFallback from '../components/ImageWithFallback';
import RobotModal from '../components/RobotModal';
import { Anchor, Waves, ArrowRight, Radar } from 'lucide-react';
import { TiltCard, useReveal } from '../components/motion';

export default function RobotsPage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const robotRefs = useRef({});
  const hasScrolled = useRef(false);
  const addSectionRef = useReveal();

  // Sliding pill indicator for the category filter
  const pillWrapRef = useRef(null);
  const pillBtnRefs = useRef({});
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const updatePill = () => {
      const wrap = pillWrapRef.current;
      const btn = pillBtnRefs.current[activeCategory];
      if (!wrap || !btn) return;
      setPill({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        visible: true,
      });
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
      const robotId = location.state.selectedRobotId;
      const robot = robotsData.find(r => r.id === robotId);
      if (robot) {
        hasScrolled.current = true;
        setSelectedRobot(robot);
      }
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
          const robotEl = robotRefs.current[robotId];
          if (robotEl) {
            robotEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => setSelectedRobot(robot), 500);
          }
        }, 300);
      }
    }
  }, [location.search, location.state]);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-olympic-900 to-[#060d1a]">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-sky-500/8 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-[10%] right-[15%] w-48 h-48 bg-blue-500/6 rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Sonar rings */}
        <div className="absolute right-[12%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none" aria-hidden="true">
          <div className="relative w-40 h-40">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute inset-0 rounded-full border border-sky-400/20"
                style={{ animation: `sonarPing 3.6s cubic-bezier(0, 0.2, 0.8, 1) ${i * 1.2}s infinite` }}
              />
            ))}
            <Radar className="absolute inset-0 m-auto w-7 h-7 text-sky-400/50" />
          </div>
        </div>

        {/* Bubbles */}
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

            {/* Filter pills — sliding indicator */}
            <div
              ref={pillWrapRef}
              className="relative flex items-center bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-sm self-start lg:self-auto animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <div
                className="absolute top-1.5 bottom-1.5 rounded-xl bg-sky-500 shadow-lg shadow-sky-500/25 transition-all duration-300 ease-out"
                style={{
                  left: `${pill.left}px`,
                  width: `${pill.width}px`,
                  opacity: pill.visible ? 1 : 0,
                }}
              />
              {robotCategories.map((cat) => {
                const isSelected = activeCategory === cat;
                const count = cat === 'All' ? robotsData.length : robotsData.filter(r => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    ref={(el) => { pillBtnRefs.current[cat] = el; }}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative z-10 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 ${
                      isSelected ? 'text-white' : 'text-white/45 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-white/10 text-white/35'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Wave transition: dark hero → light grid */}
      <div className="relative leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block h-14 sm:h-20" style={{ background: '#060d1a' }}>
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* Robot Grid — LIGHT, tilt cards + staggered rhythm */}
      <section className="relative py-16 sm:py-24 bg-[#f8fafc] overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRobots.map((robot, idx) => {
              const isAUV = robot.category === 'AUV';
              const isOdd = idx % 2 === 1;
              return (
                /* Stagger via margin (not transform — keeps reveal + tilt transforms clean) */
                <div key={robot.id} className={isOdd ? 'md:mt-12' : ''}>
                  <div
                    ref={(el) => { robotRefs.current[robot.id] = el; }}
                    className={`${isOdd ? 'reveal-right' : 'reveal-left'}`}
                    style={{ transitionDelay: `${(idx % 2) * 120}ms` }}
                  >
                    <TiltCard maxTilt={4}>
                      <div
                        onClick={() => setSelectedRobot(robot)}
                        className="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-olympic-100/80 hover:border-olympic-100 transition-shadow duration-500 cursor-pointer"
                      >
                        {/* Top gradient accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 z-10 ${
                          isAUV
                            ? 'bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300'
                            : 'bg-gradient-to-r from-olympic-700 via-sky-500 to-sky-300'
                        }`} />

                        {/* Image */}
                        <div className="relative h-56 w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                          <ImageWithFallback
                            src={robot.image}
                            alt={robot.name}
                            name={robot.name}
                            category={robot.category}
                            type="robot"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            containerClassName="w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className={`flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-xl uppercase shadow-lg backdrop-blur-sm ${
                              isAUV ? 'bg-blue-500/90 text-white' : 'bg-olympic-600/90 text-white'
                            }`}>
                              {isAUV ? <Waves className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                              {robot.category}
                            </span>
                            <span className="text-[11px] font-bold px-3 py-2 rounded-xl bg-white/90 text-olympic-600 shadow-lg backdrop-blur-sm">
                              {robot.year}
                            </span>
                          </div>

                          {/* Hover hint */}
                          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-olympic-600" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-7 sm:p-8">
                          <h2 className="font-display font-bold text-2xl text-olympic-900 mb-3 group-hover:text-olympic-600 transition-colors">
                            {robot.name}
                          </h2>
                          <p className="text-slate-500 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                            {robot.description}
                          </p>

                          {/* Specs */}
                          <div className="flex flex-wrap gap-2 mb-7">
                            {Object.entries(robot.specs).slice(0, 4).map(([k, v]) => (
                              <span key={k} className="text-xs bg-slate-50 border border-slate-100 text-slate-600 px-3 py-2 rounded-xl hover:border-olympic-200 hover:bg-olympic-50/50 transition-colors">
                                <span className="text-slate-400 font-medium">{k}:</span>{' '}
                                <span className="font-semibold">{v}</span>
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedRobot(robot); }}
                            className="w-full py-3.5 rounded-xl bg-olympic-50 hover:bg-olympic-500 hover:text-white text-olympic-600 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          >
                            <span>View Specifications</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              );
            })}
          </div>
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
