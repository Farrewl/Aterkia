import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { robotsData, robotCategories } from '../data/robotsData';
import ImageWithFallback from '../components/ImageWithFallback';
import RobotModal from '../components/RobotModal';
import { Anchor, Waves, ArrowRight } from 'lucide-react';

export default function RobotsPage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRobot, setSelectedRobot] = useState(null);
  const robotRefs = useRef({});
  const hasScrolled = useRef(false);
  const sectionRefs = useRef([]);

  const filteredRobots = activeCategory === 'All'
    ? robotsData
    : robotsData.filter(r => r.category === activeCategory);

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
  }, [filteredRobots]);

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
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-olympic-900 to-olympic-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-sky-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] right-[15%] w-48 h-48 bg-blue-500/6 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5">
                Aterkia Robots{' '}
                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Year by Year</span>
              </h1>
              <p className="text-white/45 text-base sm:text-lg font-light max-w-xl leading-relaxed">
                The complete collection of surface vehicles (ASV) and underwater robots (AUV) designed and built by Team Aterkia.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-sm self-start lg:self-auto">
              {robotCategories.map((cat) => {
                const isSelected = activeCategory === cat;
                const count = cat === 'All' ? robotsData.length : robotsData.filter(r => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                        : 'text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'
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

      {/* Robot Grid */}
      <section className="relative py-20 bg-gradient-to-b from-olympic-950 via-[#060d1a] to-[#0a1628]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full border border-white/8 animate-bubble-rise" style={{ animationDuration: '7s' }} />
          <div className="absolute bottom-[10%] right-[25%] w-3 h-3 rounded-full border border-white/6 animate-bubble-rise" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRobots.map((robot, idx) => {
              const isAUV = robot.category === 'AUV';
              return (
                <div
                  key={robot.id}
                  ref={(el) => { robotRefs.current[robot.id] = el; addSectionRef(el); }}
                  className={`reveal group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-2`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    isAUV
                      ? 'bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300'
                      : 'bg-gradient-to-r from-olympic-700 via-sky-500 to-sky-300'
                  }`} />

                  {/* Image */}
                  <div className="relative h-56 w-full bg-white/5 overflow-hidden">
                    <ImageWithFallback
                      src={robot.image}
                      alt={robot.name}
                      name={robot.name}
                      category={robot.category}
                      type="robot"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-xl uppercase backdrop-blur-sm ${
                        isAUV
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {isAUV ? <Waves className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                        {robot.category}
                      </span>
                      <span className="text-[11px] font-bold px-3 py-2 rounded-xl bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm">
                        {robot.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 sm:p-8">
                    <h2 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-sky-300 transition-colors">
                      {robot.name}
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                      {robot.description}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {Object.entries(robot.specs).slice(0, 4).map(([k, v]) => (
                        <span key={k} className="text-xs bg-white/5 border border-white/10 text-white/50 px-3 py-2 rounded-xl hover:border-sky-500/30 hover:text-white/70 transition-colors">
                          <span className="text-white/30 font-medium">{k}:</span>{' '}
                          <span className="font-semibold text-white/60">{v}</span>
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedRobot(robot)}
                      className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:bg-sky-500/10 hover:border-sky-500/25 hover:text-sky-300"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
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
