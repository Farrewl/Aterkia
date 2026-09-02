import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { robotsData } from '../data/robotsData';
import ImageWithFallback from '../components/ImageWithFallback';
import GLBViewer from '../components/GLBViewer';
import RobotModal from '../components/RobotModal';
import { useReveal } from '../components/motion';
import { useTranslation } from '../i18n';
import { Anchor, Waves, ArrowRight, Award, Box, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const { t } = useTranslation();
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const dockRef = useRef(null);
  const reveal = useReveal();
  const hasScrolled = useRef(false);

  // Robot yang tampil di main helm — default flagship Aterolas (yang punya 3D)
  const [helm, setHelm] = useState(robotsData.find(r => r.model3D) || robotsData[0]);

  useEffect(() => {
    if (hasScrolled.current) return;
    const target = location.state?.selectedRobotId || new URLSearchParams(location.search).get('robotId');
    if (target) {
      const robot = robotsData.find(r => r.id === target);
      if (robot) {
        hasScrolled.current = true;
        setHelm(robot);
        setSelectedSpec(null);
      }
    }
  }, [location.search, location.state]);

  // Reset spec highlight saat ganti helm
  useEffect(() => { setSelectedSpec(null); }, [helm]);

  const dockScroll = useCallback((dir) => {
    if (!dockRef.current) return;
    const cardWidth = dockRef.current.firstChild?.offsetWidth || 280;
    dockRef.current.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  }, []);

  const isAUV = helm.category.includes('AUV');
  const accent = categoryAccent[helm.category] || categoryAccent.ASV;
  const specEntries = Object.entries(helm.specs);

  return (
    <div className="min-h-screen bg-[#0a0f1e]">

      {/* ── Command Deck Header ── */}
      <section className="relative pt-28 sm:pt-36 pb-6 overflow-hidden">
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight animate-fade-up" style={{ animationDelay: '80ms' }}>
                {t('robots.sectionTitle')}{' '}
                <span className="gradient-text bg-clip-text text-transparent">{t('robots.sectionGradient')}</span>
              </h1>
              <p className="text-white/40 text-base sm:text-lg font-light max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '160ms' }}>
                {t('robots.sectionDesc')}
              </p>
            </div>
        </div>
      </section>

      {/* ── Fleet Dock — pilihan vessel ── */}
      <section className="relative pb-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={reveal} className="reveal flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60 text-sm font-semibold">
              <Waves className="w-4 h-4 text-sky-400" />
              <span>{robotsData.length} {t('robots.vessels')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => dockScroll(-1)} aria-label="Scroll dock left"
                className="p-2 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => dockScroll(1)} aria-label="Scroll dock right"
                className="p-2 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal dock */}
          <div ref={dockRef} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
            {robotsData.map((robot) => {
              const rAccent = categoryAccent[robot.category] || categoryAccent.ASV;
              const active = helm.id === robot.id;
              return (
                <div
                  key={robot.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setHelm(robot)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setHelm(robot); } }}
                  className={`group relative shrink-0 w-56 snap-start rounded-2xl overflow-hidden text-left border transition-all duration-300 cursor-pointer ${
                    active
                      ? 'border-sky-400/50 bg-white/[0.08] shadow-lg shadow-sky-400/10 -translate-y-1'
                      : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-y-0.5'
                  }`}
                >
                  {/* Media thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {robot.model3D ? (
                      <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <GLBViewer src={robot.model3D} alt={`${robot.name} 3D`} height="100%" />
                      </div>
                    ) : (
                      <ImageWithFallback src={robot.image} alt={robot.name} name={robot.name}
                        category={robot.category} type="robot"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        containerClassName="w-full h-full bg-[#111827]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border backdrop-blur-md ${rAccent.bg} ${rAccent.border} ${rAccent.text}`}>
                        {robot.category === 'AUV' ? <Waves className="w-3 h-3" /> : <Anchor className="w-3 h-3" />}
                        {robot.category}
                      </span>
                    </div>

                    {/* Vessel name */}
                    <div className="absolute bottom-2 left-3 right-3">
                      <h3 className="font-display font-bold text-base text-white drop-shadow">{robot.name}</h3>
                      <p className="text-[10px] text-white/40 font-mono">{robot.year}</p>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className={`flex items-center justify-between px-3 py-2 bg-white/[0.02] border-t ${active ? 'border-sky-400/30' : 'border-white/[0.05]'}`}>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${statusColors[robot.status]}`}>
                      {robot.status}
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] font-semibold ${active ? 'text-sky-400' : 'text-white/40'} transition-colors`}>
                      {active ? t('robots.selected') : t('robots.select')}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Vessel Deck / Main Helm ── */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={reveal}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedRobot(helm)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedRobot(helm); } }}
            className="reveal relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#0d1526] to-[#0a0f1e] shadow-2xl shadow-black/40 cursor-pointer group"
          >

            {/* Sonar scanning ring */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] sonar-sweep" />
            </div>

            {/* Main media stage */}
            <div className="relative lg:aspect-[21/9] md:aspect-[16/9] aspect-[4/3] overflow-hidden">
              {helm.model3D ? (
                <div className="w-full h-full">
                  <GLBViewer src={helm.model3D} alt={`${helm.name} 3D`} height="100%" />
                </div>
              ) : (
                <ImageWithFallback src={helm.image} alt={helm.name} name={helm.name}
                  category={helm.category} type="robot"
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full bg-[#111827]" />
              )}

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent" />

              {/* Vessel identity overlay */}
              <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${accent.bg} ${accent.border} ${accent.text}`}>
                    {isAUV ? <Waves className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                    {helm.category}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${statusColors[helm.status]}`}>
                    {helm.status}
                  </span>
                  <span className="text-xs text-white/30 font-mono">{helm.year}</span>
                </div>

                <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">{helm.name}</h2>
                <p className="text-sky-300/60 text-sm sm:text-base font-medium mt-1">{helm.snippet}</p>
              </div>
            </div>

            {/* Specs console */}
            <div className="relative p-5 sm:p-8 border-t border-white/[0.06]">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Box className="w-4 h-4 text-sky-400" /> {t('robots.specifications')}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {specEntries.map(([k, v]) => {
                  const active = selectedSpec === k;
                  return (
                    <button
                      key={k}
                      onClick={() => setSelectedSpec(active ? null : k)}
                      className={`text-left rounded-xl px-3.5 py-3 border transition-all duration-300 ${
                        active
                          ? 'bg-sky-500/15 border-sky-400/40 shadow-lg shadow-sky-400/10'
                          : 'bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12]'
                      }`}
                    >
                      <span className={`text-[10px] uppercase block mb-1 ${active ? 'text-sky-300' : 'text-white/30'}`}>{k}</span>
                      <span className={`text-xs font-medium ${active ? 'text-white' : 'text-white/75'}`}>{v}</span>
                    </button>
                  );
                })}
              </div>

              {/* Achievements strip (extra info = detail) */}
              {helm.achievements.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {helm.achievements.map((a, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                      <Award className="w-3 h-3" /> {a}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ── Modal: extra info only ── */}
      {selectedRobot && (
        <RobotModal robot={selectedRobot} onClose={() => {
          setSelectedRobot(null);
          window.history.replaceState({}, '', '/robots');
        }} />
      )}
    </div>
  );
}