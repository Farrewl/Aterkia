import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, ChevronRight, ChevronLeft, ExternalLink, Trophy, Flag, Users, Anchor, Handshake } from 'lucide-react';
import { robotsData } from '../data/robotsData';
import { newsData } from '../data/newsData';
import { sponsorsData } from '../data/sponsorsData';
import { aboutData } from '../data/aboutData';
import ImageWithFallback from '../components/ImageWithFallback';
import ActivitiesSection from '../components/ActivitiesSection';
import { useReveal } from '../components/motion';
import { useTranslation } from '../i18n';

export default function HomePage() {
  const navigate = useNavigate();
  const newsScrollRef = useRef(null);
  const { t } = useTranslation();
  useReveal();

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroVideoY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const [newsCanLeft, setNewsCanLeft] = useState(false);
  const [newsCanRight, setNewsCanRight] = useState(true);

  const marqueeSponsors = [...sponsorsData, ...sponsorsData];

  useEffect(() => {
    const el = newsScrollRef.current;
    if (!el) return;
    const timer = setInterval(() => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = el.firstChild?.offsetWidth || 320;
        el.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const checkScroll = (ref, setLeft, setRight) => {
    const el = ref.current;
    if (!el) return;
    setLeft(el.scrollLeft > 5);
    setRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scroll = (ref, direction, setLeft, setRight) => {
    if (!ref.current) return;
    const cardWidth = ref.current.firstChild?.offsetWidth || 320;
    const gap = 24;
    ref.current.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
    setTimeout(() => checkScroll(ref, setLeft, setRight), 400);
  };

  return (
    <div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute top-20 right-[15%] w-80 h-80 bg-olympic-100/60 rounded-full blur-3xl animate-pulse-glow" style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }} />
        <motion.div className="absolute bottom-20 left-[10%] w-64 h-64 bg-olympic-200/40 blob-1 blur-2xl animate-float" style={{ y: useTransform(scrollY, [0, 500], [0, 80]) }} />
        <div className="absolute inset-0 dot-pattern opacity-40" />

        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-br from-olympic-900 via-sky-900 to-olympic-950"
          style={{ y: heroVideoY, scale: heroScale }}
        >
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover opacity-40" onLoadedData={() => window.dispatchEvent(new Event('hero-video-ready'))}>
            <source src={`/videos/Copy of Aterkia\u2019s Video.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          style={{ y: heroTextY }}
        >
          <div className="max-w-2xl text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display text-balance drop-shadow-lg leading-tight">
              <span className="text-white block">{t('hero.title')}</span>
              <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent drop-shadow-lg block mt-2">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-white/90 text-lg sm:text-xl mt-6 max-w-xl font-medium leading-relaxed drop-shadow-md">
              {t('hero.description')}
            </p>

            <div className="flex flex-row items-center gap-4 mt-10">
              <a href="#robots" className="btn-primary text-sm px-8 py-3.5">
                {t('hero.viewRobots')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/about" className="btn-secondary text-sm px-8 py-3.5">
                {t('hero.aboutAterkia')}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. WAVE DIVIDER + SPONSORS */}
      <div className="relative bg-olympic-900 -mt-1 pt-12 pb-12">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-full">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
            <path d="M0,80 L1440,80 L1440,20 C1080,60 720,-20 360,40 C180,60 60,70 0,60 Z" fill="#060d1a" />
          </svg>
        </div>

        <div className="relative z-10 text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-white to-sky-400 bg-[length:200%_auto] animate-shimmer">
            OUR SPONSORS
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-2 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50" />
        </div>
        
        <div className="relative z-10 overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...marqueeSponsors, ...marqueeSponsors].map((sponsor, idx) => (
              <a
                key={`${sponsor.id}-${idx}`}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                aria-label={sponsor.name}
                className="shrink-0 mx-8 sm:mx-12 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <ImageWithFallback
                  src={sponsor.logo}
                  alt={sponsor.name}
                  name={sponsor.name}
                  type="sponsor"
                  className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-full">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
            <path d="M0,0 L1440,0 L1440,60 C1080,20 720,100 360,40 C180,20 60,10 0,20 Z" fill="#0a1628" />
          </svg>
        </div>
      </div>

      {/* 3. ROBOTS — Interactive Cockpit */}
      <RobotsCockpit />

      {/* Soft seam: deep ocean robots → activity deck */}
      <div className="relative">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: '120px' }}>
          <path d="M0,0 L1440,0 L1440,60 C1320,80 1200,20 1080,50 C960,80 840,10 720,40 C600,70 480,15 360,45 C240,75 120,25 0,55 Z" fill="#0c1e38" />
          <path d="M0,55 C120,25 240,75 360,45 C480,15 600,70 720,40 C840,10 960,80 1080,50 C1200,20 1320,80 1440,60 L1440,100 L0,100 Z" fill="#0a1628" />
          <path d="M0,80 C180,50 360,110 540,75 C720,40 900,100 1080,70 C1260,40 1380,85 1440,65 L1440,120 L0,120 Z" fill="#060d1a" />
        </svg>
      </div>

      {/* 3.5 OUR ACTIVITY — Next Mission */}
      <ActivitiesSection />

      {/* Seamless wave: deep ocean robots → light news */}
      <div className="relative">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full block" style={{ height: '120px' }}>
          <path d="M0,20 C120,4 240,36 360,16 C480,2 600,30 720,12 C840,30 960,2 1080,16 C1200,36 1320,4 1440,20 L1440,60 C1320,80 1200,20 1080,50 C960,80 840,10 720,40 C600,70 480,15 360,45 C240,75 120,25 0,55 Z" fill="#0c1e38" />
          <path d="M0,55 C120,25 240,75 360,45 C480,15 600,70 720,40 C840,10 960,80 1080,50 C1200,20 1320,80 1440,60 L1440,100 L0,100 Z" fill="#1e3a5f" />
          <path d="M0,80 C180,50 360,110 540,75 C720,40 900,100 1080,70 C1260,40 1380,85 1440,65 L1440,120 L0,120 Z" fill="#3b6a8f" />
          <path d="M0,100 C240,75 480,130 720,95 C960,60 1200,110 1440,80 L1440,140 L0,140 Z" fill="#7baac4" />
          <path d="M0,120 C360,95 720,145 1080,110 C1260,95 1380,125 1440,105 L1440,160 L0,160 Z" fill="#b8d4e4" />
          <path d="M0,140 C240,120 480,155 720,135 C960,115 1200,150 1440,130 L1440,180 L0,180 Z" fill="#dfe9f0" />
          <path d="M0,160 C180,145 360,170 540,155 C720,140 900,165 1080,150 C1260,135 1380,160 1440,148 L1440,200 L0,200 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* 4. NEWS SECTION — Robot News */}
      <section className="bg-[#f8fafc]">
        <div className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl sm:text-5xl font-black font-display text-olympic-900 tracking-tight leading-tight">
                  <span className="gradient-text">{t('news.title')}</span>{' '}
                  {t('news.titleGradient')}{' '}
                </h2>
                <p className="text-slate-500 text-base sm:text-lg mt-2 font-light max-w-xl">
                  {t('news.desc')}
                </p>
              </div>
            </div>

          {/* Carousel with inner arrows */}
          <div className="relative group/carousel">
            {newsCanLeft && (
              <button
                onClick={() => scroll(newsScrollRef, -1, setNewsCanLeft, setNewsCanRight)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-olympic-50 hover:border-olympic-300 hover:scale-110 -ml-1"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
            )}
            {newsCanRight && (
              <button
                onClick={() => scroll(newsScrollRef, 1, setNewsCanLeft, setNewsCanRight)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-olympic-50 hover:border-olympic-300 hover:scale-110 -mr-1"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            )}

            <div
              ref={newsScrollRef}
              onScroll={() => checkScroll(newsScrollRef, setNewsCanLeft, setNewsCanRight)}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1"
            >
              {newsData.map((news) => (
                <a
                  key={news.id}
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="snap-start shrink-0 w-[calc(25%-18px)] min-w-[260px] group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-olympic-200/60 transition-all duration-500 hover:-translate-y-2 cursor-pointer block"
                >
                  <div className="relative h-44 w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={news.image}
                      alt={news.title}
                      type="news"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-3.5 h-3.5 text-olympic-600" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-olympic-400" />
                      <span className="font-medium">{news.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-olympic-50 text-olympic-600 font-semibold text-[10px] uppercase tracking-wide border border-olympic-100">{news.publisher}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-olympic-900 leading-snug group-hover:text-olympic-600 transition-colors line-clamp-2 mb-2">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-2">
                      {news.snippet}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Seamless wave into footer */}
        <div className="relative w-full mt-8">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full block" style={{ height: '100px' }}>
            <path d="M0,0 L1440,0 L1440,140 L0,140 Z" fill="#f8fafc" />
            <path d="M0,40 C180,80 360,10 540,50 C720,90 900,20 1080,60 C1200,80 1320,30 1440,50 L1440,140 L0,140 Z" fill="#e2e8f0" />
            <path d="M0,60 C200,90 400,30 600,60 C800,90 1000,20 1200,50 C1320,65 1380,40 1440,55 L1440,140 L0,140 Z" fill="#94a3b8" />
            <path d="M0,85 C160,110 320,70 480,90 C640,110 800,65 960,85 C1120,105 1280,75 1440,90 L1440,140 L0,140 Z" fill="#475569" />
            <path d="M0,110 C240,90 480,120 720,100 C960,80 1200,110 1440,95 L1440,140 L0,140 Z" fill="#1e293b" />
            <path d="M0,125 C180,115 360,130 540,120 C720,110 900,130 1080,120 C1260,110 1380,125 1440,118 L1440,140 L0,140 Z" fill="#111d32" />
            <path d="M0,135 C240,128 480,138 720,133 C960,128 1200,138 1440,133 L1440,140 L0,140 Z" fill="#0A1628" />
          </svg>
        </div>
      </section>

      {/* Modals */}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROBOTS COCKPIT — Centered layout with hover-to-reveal snippet.
   ═══════════════════════════════════════════════════════════════════════════ */

function RobotsCockpit() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageKey, setImageKey] = useState(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(null);

  const robot = robotsData[activeIdx] || robotsData[0];

  const pauseRotation = () => {
    clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  };

  const scheduleResume = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIdx(prev => (prev + 1) % robotsData.length);
        setImageKey(k => k + 1);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const selectRobot = useCallback((idx) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    setImageKey(k => k + 1);
  }, [activeIdx]);

  if (!robot) return null;

  const isASV = robot.category === 'ASV';

  return (
    <section id="robots" className="relative overflow-hidden bg-gradient-to-b from-[#060d1a] via-[#0a1628] to-[#0c1e38]">
     
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* ── Heading ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight">
              <span className="text-white">{t('robots.heading')}</span>{' '}
              <span className="gradient-text">{t('robots.headingGradient')}</span>
            </h2>
            <p className="text-sky-300/50 mt-3 text-sm sm:text-base max-w-md">
              {t('robots.subtitle')}
            </p>
          </div>
          <Link
            to="/robots"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group shrink-0 ml-4"
          >
            {t('robots.more')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Main Content: Image + Side Panel ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: Main robot image + thumbnails */}
          <div className="w-full lg:w-[60%]" onMouseEnter={pauseRotation} onMouseLeave={scheduleResume}>
            <div
              className="relative cursor-pointer group"
              onClick={() => navigate('/robots', { state: { selectedRobotId: robot.id } })}
            >
              {/* Glow behind image */}
              <div
                className={`absolute -inset-4 rounded-3xl blur-2xl opacity-20 transition-colors duration-700 ${
                  isASV ? 'bg-sky-300/40' : 'bg-teal-300/40'
                } animate-cockpit-glow`}
              />

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden bg-sky-900/30 backdrop-blur-sm border border-sky-300/10 shadow-lg shadow-black/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-sky-500/10">
                <div className="relative w-full aspect-[16/10]">
                  <ImageWithFallback
                    key={imageKey}
                    src={robot.image}
                    alt={robot.name}
                    name={robot.name}
                    category={robot.category}
                    type="robot"
                    className="w-full h-full object-contain p-4 sm:p-6 transition-opacity duration-300"
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* ── Thumbnail Selector ── */}
            <div className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {robotsData.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => selectRobot(i)}
                    className={`
                      group/thumb relative aspect-[3/2] rounded-xl overflow-hidden
                      transition-all duration-300 border
                      ${i === activeIdx
                        ? 'border-sky-300/40 shadow-md shadow-sky-300/10 scale-[1.02] ring-2 ring-sky-300/15'
                        : 'border-sky-300/10 opacity-40 hover:opacity-70 hover:border-sky-300/25 hover:shadow-sm'
                      }
                    `}
                    aria-label={r.name}
                  >
                    <ImageWithFallback
                      src={r.image}
                      alt={r.name}
                      name={r.name}
                      category={r.category}
                      type="robot"
                      className="w-full h-full object-contain p-3"
                      containerClassName="w-full h-full bg-sky-900/20"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Robot info panel */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-28">
            <div key={imageKey} className="animate-fade-up space-y-4">
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest ${
                  isASV ? 'text-sky-300' : 'text-teal-300'
                }`}>
                  {robot.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white leading-tight mt-1">
                  {robot.name}
                </h3>
              </div>
              <p className="text-sky-100/70 text-sm leading-relaxed font-light">
                {robot.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
