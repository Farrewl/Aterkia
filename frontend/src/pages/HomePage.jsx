import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { robotsData } from '../data/robotsData';
import { newsData } from '../data/newsData';
import { sponsorsData } from '../data/sponsorsData';
import ImageWithFallback from '../components/ImageWithFallback';
import RobotModal from '../components/RobotModal';
import NewsDrawer from '../components/NewsDrawer';

export default function HomePage() {
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const newsScrollRef = useRef(null);

  const [newsCanLeft, setNewsCanLeft] = useState(false);
  const [newsCanRight, setNewsCanRight] = useState(true);

  const marqueeSponsors = [...sponsorsData, ...sponsorsData];

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
      <section className="relative min-h-screen flex items-start overflow-hidden pt-20">
        <div className="absolute top-20 right-[15%] w-80 h-80 bg-olympic-100/60 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-[10%] w-64 h-64 bg-olympic-200/40 blob-1 blur-2xl animate-float" />
        <div className="absolute inset-0 dot-pattern opacity-40" />

        <div className="absolute inset-0 z-0 bg-gradient-to-br from-olympic-900 via-sky-900 to-olympic-950">
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover opacity-40">
            <source src={`/videos/Copy of Aterkia\u2019s Video.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display text-balance drop-shadow-lg leading-tight">
              <span className="text-white block">Aterkia</span>
              <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent drop-shadow-lg block mt-2">RoboBoat</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-20">
              <a href="#robots" className="btn-primary text-sm px-8 py-3.5">
                Lihat Robot Kami
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/about" className="btn-secondary text-sm px-8 py-3.5">
                Tentang Aterkia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WAVE DIVIDER + SPONSORS */}
      <div className="relative bg-olympic-900">
        <div className="relative w-full">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: '80px', marginBottom: '-1px' }}>
            <path d="M0,0 L1440,0 L1440,40 C1320,40 1260,90 1140,80 C1020,70 960,20 840,30 C720,40 660,95 540,85 C420,75 360,25 240,35 C120,45 60,90 0,80 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="relative z-10 text-center pt-1 pb-1">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase gradient-text">
            Our Sponsors
          </span>
        </div>
        <div className="relative z-10 overflow-hidden py-4">
          <div className="flex w-max animate-marquee">
            {[...marqueeSponsors, ...marqueeSponsors].map((sponsor, idx) => (
              <a
                key={`${sponsor.id}-${idx}`}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                aria-label={sponsor.name}
                className="shrink-0 mx-5 sm:mx-7 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <ImageWithFallback
                  src={sponsor.logo}
                  alt={sponsor.name}
                  name={sponsor.name}
                  type="sponsor"
                  className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
        {/* Bottom wave — dark sponsors into ocean sky */}
        <div className="relative w-full">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: '80px', marginTop: '-1px' }}>
            <path d="M0,80 C120,80 180,30 300,35 C420,40 480,95 600,90 C720,85 780,30 900,25 C1020,20 1080,80 1200,85 C1320,90 1380,50 1440,40 L1440,120 L0,120 Z" fill="#e0f2fe" />
          </svg>
        </div>
      </div>

      {/* 3. ROBOTS — Ocean Scene, Asymmetric Placement */}
      <section id="robots" className="relative overflow-hidden">
        <div className="relative w-full" style={{ minHeight: '900px' }}>

          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300" />

          {/* Sun glow */}
          <div className="absolute top-16 right-[15%] w-40 h-40 bg-yellow-100/60 rounded-full blur-3xl" />

          {/* Water surface waves */}
          <div className="absolute left-0 right-0" style={{ top: '32%' }}>
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full" style={{ height: '50px' }}>
              <path d="M0,50 C180,20 360,80 540,50 C720,20 900,80 1080,50 C1260,20 1380,60 1440,50 L1440,100 L0,100 Z" fill="rgba(14,116,144,0.25)" />
            </svg>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{ height: '40px', marginTop: '-25px' }}>
              <path d="M0,60 C240,30 480,70 720,40 C960,10 1200,70 1440,40 L1440,80 L0,80 Z" fill="rgba(14,116,144,0.15)" />
            </svg>
          </div>

          {/* Underwater gradient */}
          <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-b from-sky-400/50 via-blue-800 to-blue-950" style={{ top: '36%' }} />

          {/* Light rays */}
          <div className="absolute left-[18%] top-[38%] w-28 h-80 bg-gradient-to-b from-sky-200/20 to-transparent rotate-12 blur-xl" />
          <div className="absolute right-[25%] top-[40%] w-20 h-64 bg-gradient-to-b from-sky-200/15 to-transparent -rotate-6 blur-xl" />

          {/* Bubbles */}
          <div className="absolute left-[12%] top-[55%] w-3 h-3 rounded-full bg-white/30 animate-bubble-rise" />
          <div className="absolute left-[22%] top-[65%] w-2 h-2 rounded-full bg-white/25 animate-bubble-rise" style={{ animationDelay: '1.5s' }} />
          <div className="absolute right-[18%] top-[58%] w-4 h-4 rounded-full bg-white/20 animate-bubble-rise" style={{ animationDelay: '3s' }} />
          <div className="absolute right-[32%] top-[72%] w-2 h-2 rounded-full bg-white/25 animate-bubble-rise" style={{ animationDelay: '2s' }} />
          <div className="absolute left-[42%] top-[60%] w-3 h-3 rounded-full bg-white/20 animate-bubble-rise" style={{ animationDelay: '4s' }} />

          {/* Title */}
          <div className="absolute top-8 left-0 right-0 z-20 text-center px-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-olympic-900 tracking-tight leading-tight drop-shadow-sm">
              <span className="bg-gradient-to-r from-olympic-600 to-sky-500 bg-clip-text text-transparent">Aterkia</span>
              Robots{' '}
            </h2>
            <p className="text-sky-800/60 text-base mt-2 font-light max-w-lg mx-auto">
              
            </p>
          </div>

          {/* ── Baruna (ASV) — kiri atas, di permukaan ── */}
          <div
            onClick={() => setSelectedRobot(robotsData[0])}
            className="absolute z-10 group cursor-pointer"
            style={{ left: '2%', top: '16%', width: 'clamp(220px, 22vw, 320px)' }}
          >
            <div className="relative animate-bob">
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-3 left-0 w-full" style={{ height: '14px' }}>
                <path d="M0,10 Q60,2 120,10 Q180,18 240,10 Q270,6 300,10" fill="none" stroke="rgba(14,116,144,0.35)" strokeWidth="2" className="animate-sway" />
              </svg>
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/20 border border-white/40 group-hover:scale-105 transition-transform duration-500">
                <ImageWithFallback src={robotsData[0].image} alt={robotsData[0].name} name={robotsData[0].name} category={robotsData[0].category} type="robot" className="w-full aspect-video object-cover" containerClassName="w-full" />
              </div>
            </div>
            <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/60">
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">ASV</span>
              <h3 className="font-display font-bold text-sm sm:text-base text-olympic-900 leading-tight">{robotsData[0].name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{robotsData[0].tagline}</p>
            </div>
          </div>

          {/* ── Nala-01 (ASV) — kanan atas, di permukaan ── */}
          <div
            onClick={() => setSelectedRobot(robotsData[2])}
            className="absolute z-10 group cursor-pointer"
            style={{ right: '4%', top: '12%', width: 'clamp(200px, 20vw, 280px)' }}
          >
            <div className="relative animate-bob" style={{ animationDelay: '1.2s' }}>
              <svg viewBox="0 0 260 18" preserveAspectRatio="none" className="absolute -bottom-2 left-0 w-full" style={{ height: '12px' }}>
                <path d="M0,9 Q50,2 100,9 Q150,16 200,9 Q230,5 260,9" fill="none" stroke="rgba(14,116,144,0.3)" strokeWidth="2" className="animate-sway" style={{ animationDelay: '0.5s' }} />
              </svg>
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/20 border border-white/40 group-hover:scale-105 transition-transform duration-500">
                <ImageWithFallback src={robotsData[2].image} alt={robotsData[2].name} name={robotsData[2].name} category={robotsData[2].category} type="robot" className="w-full aspect-video object-cover" containerClassName="w-full" />
              </div>
            </div>
            <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/60 text-right">
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">ASV &middot; Legacy</span>
              <h3 className="font-display font-bold text-sm sm:text-base text-olympic-900 leading-tight">{robotsData[2].name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{robotsData[2].tagline}</p>
            </div>
          </div>

          {/* ── Cakra Subsea (AUV) — kiri tengah, bawah air ── */}
          <div
            onClick={() => setSelectedRobot(robotsData[1])}
            className="absolute z-10 group cursor-pointer"
            style={{ left: '25%', top: '52%', width: 'clamp(220px, 22vw, 310px)' }}
          >
            <div className="relative animate-float">
              <div className="absolute -top-5 left-8 w-2 h-2 rounded-full bg-white/40 animate-bubble-rise" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -top-8 right-12 w-1.5 h-1.5 rounded-full bg-white/30 animate-bubble-rise" style={{ animationDelay: '2s' }} />
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-950/50 border border-white/20 group-hover:scale-105 transition-transform duration-500">
                <ImageWithFallback src={robotsData[1].image} alt={robotsData[1].name} name={robotsData[1].name} category={robotsData[1].category} type="robot" className="w-full aspect-video object-cover" containerClassName="w-full" />
              </div>
            </div>
            <div className="mt-2 bg-blue-900/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-blue-400/20">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">AUV</span>
              <h3 className="font-display font-bold text-sm sm:text-base text-white leading-tight">{robotsData[1].name}</h3>
              <p className="text-[11px] text-blue-200/70 mt-0.5 line-clamp-1">{robotsData[1].tagline}</p>
            </div>
          </div>

          {/* ── Makara-X (AUV) — kanan bawah, dalam ── */}
          <div
            onClick={() => setSelectedRobot(robotsData[3])}
            className="absolute z-10 group cursor-pointer"
            style={{ right: '6%', top: '60%', width: 'clamp(200px, 20vw, 280px)' }}
          >
            <div className="relative animate-float" style={{ animationDelay: '2s' }}>
              <div className="absolute -top-6 left-6 w-2 h-2 rounded-full bg-white/30 animate-bubble-rise" style={{ animationDelay: '1s' }} />
              <div className="absolute -top-10 right-10 w-1.5 h-1.5 rounded-full bg-white/25 animate-bubble-rise" style={{ animationDelay: '3.5s' }} />
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-950/50 border border-white/15 group-hover:scale-105 transition-transform duration-500">
                <ImageWithFallback src={robotsData[3].image} alt={robotsData[3].name} name={robotsData[3].name} category={robotsData[3].category} type="robot" className="w-full aspect-video object-cover" containerClassName="w-full" />
              </div>
            </div>
            <div className="mt-2 bg-blue-950/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-blue-400/15 text-right">
              <span className="text-[10px] font-bold text-blue-300/70 uppercase tracking-wider">AUV &middot; R&D</span>
              <h3 className="font-display font-bold text-sm sm:text-base text-white/90 leading-tight">{robotsData[3].name}</h3>
              <p className="text-[11px] text-blue-300/50 mt-0.5 line-clamp-1">{robotsData[3].tagline}</p>
            </div>
          </div>

        </div>

        {/* View All — bottom of ocean */}
        <div className="relative z-20 text-center pb-0 pt-6 bg-gradient-to-b from-blue-950 to-slate-900">
          <Link to="/robots" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10">
            Lihat Semua Robot
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Seamless wave into news */}
        <div className="relative w-full -mt-px">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full block" style={{ height: '100px' }}>
            <path d="M0,0 L1440,0 L1440,140 L0,140 Z" fill="#0f172a" />
            <path d="M0,40 C180,80 360,10 540,50 C720,90 900,20 1080,60 C1200,80 1320,30 1440,50 L1440,140 L0,140 Z" fill="#1e293b" />
            <path d="M0,60 C200,90 400,30 600,60 C800,90 1000,20 1200,50 C1320,65 1380,40 1440,55 L1440,140 L0,140 Z" fill="#334155" />
            <path d="M0,85 C160,110 320,70 480,90 C640,110 800,65 960,85 C1120,105 1280,75 1440,90 L1440,140 L0,140 Z" fill="#475569" />
            <path d="M0,110 C240,90 480,120 720,100 C960,80 1200,110 1440,95 L1440,140 L0,140 Z" fill="#94a3b8" />
            <path d="M0,125 C180,115 360,130 540,120 C720,110 900,130 1080,120 C1260,110 1380,125 1440,118 L1440,140 L0,140 Z" fill="#cbd5e1" />
            <path d="M0,133 C200,128 400,136 600,132 C800,128 1000,136 1200,132 C1320,130 1380,134 1440,132 L1440,140 L0,140 Z" fill="#e2e8f0" />
            <path d="M0,138 C240,135 480,140 720,137 C960,134 1200,139 1440,136 L1440,140 L0,140 Z" fill="#f1f5f9" />
            <path d="M0,140 L1440,140 L1440,140 L0,140 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* 4. NEWS SECTION — Robot News */}
      <section className="bg-[#f8fafc]">
        <div className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl sm:text-5xl font-black font-display text-olympic-900 tracking-tight leading-tight">
                  <span className="gradient-text">Aterkia</span>
                  News{' '}
                </h2>
                <p className="text-slate-500 text-base sm:text-lg mt-2 font-light max-w-xl">
                  
                </p>
              </div>
            </div>

          {/* Carousel with inner arrows */}
          <div className="relative group/carousel">
            {newsCanLeft && (
              <button
                onClick={() => scroll(newsScrollRef, -1, setNewsCanLeft, setNewsCanRight)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-olympic-50 hover:border-olympic-300 hover:scale-110 -ml-1"
                aria-label="Scroll kiri"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
            )}
            {newsCanRight && (
              <button
                onClick={() => scroll(newsScrollRef, 1, setNewsCanLeft, setNewsCanRight)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-olympic-50 hover:border-olympic-300 hover:scale-110 -mr-1"
                aria-label="Scroll kanan"
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
                <article
                  key={news.id}
                  className="snap-start shrink-0 w-[calc(25%-18px)] min-w-[260px] group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-olympic-200/60 transition-all duration-500 hover:-translate-y-2"
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
                    <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-olympic-600 shadow-sm">
                      {news.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-olympic-400" />
                      <span className="font-medium">{news.date}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-olympic-900 mb-2 leading-snug group-hover:text-olympic-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-2 mb-5">
                      {news.snippet}
                    </p>
                    <button
                      onClick={() => setSelectedNews(news)}
                      className="text-sm font-semibold text-olympic-500 hover:text-olympic-700 flex items-center gap-1 transition-colors group/link"
                    >
                      <span>Baca Selengkapnya</span>
                      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
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
      {selectedRobot && (
        <RobotModal robot={selectedRobot} onClose={() => setSelectedRobot(null)} />
      )}
      {selectedNews && (
        <NewsDrawer article={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
}
