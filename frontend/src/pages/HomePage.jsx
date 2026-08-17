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
  const robotScrollRef = useRef(null);
  const newsScrollRef = useRef(null);

  const [robotCanLeft, setRobotCanLeft] = useState(false);
  const [robotCanRight, setRobotCanRight] = useState(true);
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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">

        <div className="absolute top-20 right-[15%] w-80 h-80 bg-olympic-100/60 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-[10%] w-64 h-64 bg-olympic-200/40 blob-1 blur-2xl animate-float" />
        <div className="absolute inset-0 dot-pattern opacity-40" />

        <div className="absolute inset-0 z-0 bg-black">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
            <source src="/videos/Copy of Aterkia’s Video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left — Text */}
            <div className="lg:col-span-7 space-y-6">

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[0.9] text-balance drop-shadow-lg">
                <span className="text-white">Aterkia</span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-lg">RoboBoat</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed font-light drop-shadow-sm">
                Tim riset robotika maritim yang mengembangkan{' '}
                <span className="font-semibold text-white">wahana otonom laut</span>{' '}
                untuk kompetisi nasional & internasional.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#robots" className="btn-primary text-sm px-8 py-3.5">
                  Lihat Robot Kami
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link to="/about" className="btn-secondary text-sm px-8 py-3.5">
                  Tentang Aterkia
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <span className="block text-3xl font-black text-white font-display drop-shadow-md" style={{ color: 'black'}}>4+</span>
                  <span className="text-xs text-primary/60 font-medium">Robot Dikembangkan</span>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-center">
                  <span className="block text-3xl font-black text-white font-display drop-shadow-md" style={{ color: 'black'}}>10+</span>
                  <span className="text-xs text-primary/60 font-medium">Anggota Aktif</span>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-center">
                  <span className="block text-3xl font-black font-display drop-shadow-md" style={{ color: '#FF6B35' }}>3</span>
                  <span className="text-xs text-primary/60 font-medium">Tahun Riset</span>
                </div>
              </div>
            </div>

            {/* Right — Split Ocean Visual */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center relative">
              <div className="relative w-[340px] h-[340px]">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-olympic-400/20 blur-3xl animate-pulse-glow" />

                {/* Clip circle container */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/50">

                  {/* === TOP HALF: Water Surface + ASV === */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 overflow-hidden">
                    {/* Sky gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-sky-200 to-cyan-200" />

                    {/* Clouds */}
                    <div className="absolute top-3 left-6 w-12 h-4 bg-white/60 rounded-full blur-sm" />
                    <div className="absolute top-5 left-10 w-8 h-3 bg-white/40 rounded-full blur-sm" />
                    <div className="absolute top-2 right-10 w-10 h-4 bg-white/50 rounded-full blur-sm" />

                    {/* Water surface wave line */}
                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 340 30" preserveAspectRatio="none" style={{ height: '30px' }}>
                      <path d="M0,15 Q40,5 85,15 T170,15 T255,15 T340,15 V30 H0 Z" fill="#0ea5e9" opacity="0.5" />
                      <path d="M0,18 Q50,8 100,18 T200,18 T300,18 T340,18 V30 H0 Z" fill="#0284c7" opacity="0.4" />
                      <path d="M0,22 Q30,14 70,22 T150,22 T240,22 T340,22 V30 H0 Z" fill="#0369a1" opacity="0.6" />
                    </svg>

                    {/* ASV Ship */}
                    <svg className="absolute bottom-5 left-1/2 -translate-x-1/2" width="110" height="50" viewBox="0 0 110 50">
                      {/* Hull - Catamaran */}
                      <path d="M15,35 L25,28 L85,28 L95,35 L90,38 L20,38 Z" fill="#005EB8" />
                      <path d="M20,38 L25,42 L40,42 L38,38 Z" fill="#003D7A" />
                      <path d="M70,38 L75,42 L90,42 L85,38 Z" fill="#003D7A" />
                      {/* Cabin */}
                      <rect x="42" y="18" width="26" height="10" rx="3" fill="#0050A0" />
                      <rect x="45" y="12" width="20" height="6" rx="2" fill="#003D7A" />
                      {/* Antenna */}
                      <line x1="55" y1="12" x2="55" y2="4" stroke="#003D7A" strokeWidth="1.5" />
                      <circle cx="55" cy="3" r="2" fill="#FF6B35" />
                      {/* Windows */}
                      <rect x="45" y="20" width="5" height="4" rx="1" fill="#93c5fd" opacity="0.8" />
                      <rect x="53" y="20" width="5" height="4" rx="1" fill="#93c5fd" opacity="0.8" />
                      <rect x="61" y="20" width="5" height="4" rx="1" fill="#93c5fd" opacity="0.8" />
                      {/* Wake effect */}
                      <path d="M10,38 Q5,40 2,44" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                      <path d="M100,38 Q105,40 108,44" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                      {/* GPS Tower */}
                      <rect x="70" y="10" width="3" height="18" rx="1" fill="#003D7A" />
                      <circle cx="71.5" cy="8" r="3" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
                      <circle cx="71.5" cy="8" r="6" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                    </svg>

                    {/* Floating label ASV */}
                    <Link
                      to="/robots"
                      className="absolute bottom-8 right-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-sky-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="text-[10px] font-bold text-olympic-600 block leading-tight">ASV</span>
                      <span className="text-[8px] text-slate-500 group-hover:text-olympic-600 transition-colors">Baruna →</span>
                    </Link>
                  </div>

                  {/* === BOTTOM HALF: Underwater + AUV === */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-500 via-blue-600 to-olympic-900 overflow-hidden">
                    {/* Light rays from surface */}
                    <div className="absolute top-0 left-1/4 w-16 h-full bg-gradient-to-b from-white/15 to-transparent transform -skew-x-12" />
                    <div className="absolute top-0 left-1/2 w-10 h-full bg-gradient-to-b from-white/10 to-transparent transform skew-x-6" />
                    <div className="absolute top-0 right-1/4 w-12 h-full bg-gradient-to-b from-white/10 to-transparent transform -skew-x-6" />

                    {/* Bubbles */}
                    <svg className="absolute top-4 left-8 opacity-40 animate-float" width="12" height="12" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="5" fill="none" stroke="white" strokeWidth="1" />
                    </svg>
                    <svg className="absolute top-10 right-12 opacity-30 animate-float-delayed" width="8" height="8" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" fill="none" stroke="white" strokeWidth="0.8" />
                    </svg>
                    <svg className="absolute top-6 right-20 opacity-25 animate-float" width="6" height="6" viewBox="0 0 6 6">
                      <circle cx="3" cy="3" r="2.5" fill="none" stroke="white" strokeWidth="0.6" />
                    </svg>

                    {/* Coral & Seaweed decorations */}
                    {/* Coral left */}
                    <svg className="absolute bottom-0 left-4" width="50" height="45" viewBox="0 0 50 45" opacity="0.7">
                      <path d="M10,45 C10,35 5,28 10,20 C12,16 8,10 12,5 C14,2 16,5 15,10 C14,15 18,18 16,25 C14,32 18,38 15,45" fill="#f97316" />
                      <path d="M20,45 C20,38 18,32 22,25 C24,20 20,14 24,8 C25,5 28,8 26,14 C24,20 28,24 26,32 C24,38 27,42 25,45" fill="#fb923c" />
                      <path d="M30,45 C30,40 28,35 30,28 C31,24 29,20 31,15 C32,12 34,15 33,20 C32,25 34,30 32,38 L32,45" fill="#f97316" opacity="0.8" />
                      <ellipse cx="12" cy="5" rx="3" ry="2" fill="#fbbf24" />
                      <ellipse cx="24" cy="8" rx="3" ry="2" fill="#fbbf24" />
                    </svg>

                    {/* Coral right */}
                    <svg className="absolute bottom-0 right-6" width="40" height="35" viewBox="0 0 40 35" opacity="0.6">
                      <path d="M8,35 C8,28 4,22 8,15 C10,10 6,5 10,2 C12,0 14,3 12,8 C10,14 14,18 12,25 C10,30 12,34 10,35" fill="#ef4444" opacity="0.7" />
                      <path d="M20,35 C20,30 16,24 20,18 C22,14 18,8 22,4 C23,2 26,5 24,10 C22,16 26,20 24,28 L24,35" fill="#f87171" opacity="0.6" />
                      <circle cx="10" cy="2" r="2.5" fill="#fbbf24" opacity="0.8" />
                      <circle cx="22" cy="4" r="2" fill="#fbbf24" opacity="0.7" />
                    </svg>

                    {/* Seaweed */}
                    <svg className="absolute bottom-0 left-16" width="20" height="50" viewBox="0 0 20 50" opacity="0.5">
                      <path d="M10,50 Q5,40 10,30 Q15,20 10,10 Q8,5 10,0" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                      <path d="M6,50 Q1,42 6,32 Q11,22 6,12" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    </svg>
                    <svg className="absolute bottom-0 right-16" width="16" height="40" viewBox="0 0 16 40" opacity="0.4">
                      <path d="M8,40 Q3,32 8,24 Q13,16 8,8 Q6,4 8,0" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>

                    {/* AUV Robot */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width="90" height="45" viewBox="0 0 90 45">
                      {/* Main body - torpedo shape */}
                      <ellipse cx="45" cy="22" rx="38" ry="12" fill="#003D7A" />
                      <ellipse cx="45" cy="22" rx="35" ry="10" fill="#0050A0" />
                      {/* Front dome */}
                      <ellipse cx="80" cy="22" rx="10" ry="10" fill="#0ea5e9" opacity="0.4" />
                      <ellipse cx="80" cy="22" rx="7" ry="7" fill="#38bdf8" opacity="0.3" />
                      {/* Camera/sensor eye */}
                      <circle cx="82" cy="22" r="3" fill="#06b6d4" />
                      <circle cx="82" cy="22" r="1.5" fill="white" opacity="0.8" />
                      {/* Top fin */}
                      <path d="M35,12 L45,4 L55,12" fill="#003D7A" />
                      {/* Side fins */}
                      <path d="M25,32 L18,42 L30,35" fill="#003D7A" opacity="0.8" />
                      <path d="M55,32 L62,42 L50,35" fill="#003D7A" opacity="0.8" />
                      {/* Propeller */}
                      <path d="M7,18 L3,14 M7,22 L2,22 M7,26 L3,30" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                      {/* Tail */}
                      <path d="M10,16 L5,10 M10,28 L5,34" stroke="#003D7A" strokeWidth="2" strokeLinecap="round" />
                      {/* Body details */}
                      <line x1="30" y1="18" x2="30" y2="26" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                      <line x1="40" y1="16" x2="40" y2="28" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                      <line x1="50" y1="16" x2="50" y2="28" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                      <line x1="60" y1="17" x2="60" y2="27" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.4" />
                      {/* LED lights */}
                      <circle cx="75" cy="18" r="1.5" fill="#22c55e" opacity="0.8" />
                      <circle cx="75" cy="26" r="1.5" fill="#22c55e" opacity="0.8" />
                    </svg>

                    {/* Floating label AUV */}
                    <Link
                      to="/robots"
                      className="absolute top-6 left-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-cyan-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="text-[10px] font-bold block leading-tight" style={{ color: '#FF6B35' }}>AUV</span>
                      <span className="text-[8px] text-slate-500 group-hover:text-olympic-600 transition-colors">Cakra Subsea →</span>
                    </Link>

                    {/* Small fish */}
                    <svg className="absolute bottom-10 left-1/3 opacity-40 animate-float" width="20" height="10" viewBox="0 0 20 10">
                      <path d="M15,5 Q18,2 20,5 Q18,8 15,5 Z M10,3 Q12,0 14,2 L14,8 Q12,10 10,7 Z" fill="white" opacity="0.5" />
                    </svg>
                    <svg className="absolute top-16 right-10 opacity-30 animate-float-delayed" width="16" height="8" viewBox="0 0 16 8">
                      <path d="M12,4 Q14,1 16,4 Q14,7 12,4 Z M8,2 Q10,0 12,1.5 L12,6.5 Q10,8 8,6 Z" fill="white" opacity="0.4" />
                    </svg>
                  </div>

                  {/* Water surface divider line */}
                  <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 z-10 shadow-lg shadow-sky-400/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#0A1628" />
        </svg>
      </div>

      {/* 2. SPONSORS STRIP */}
      <section className="py-10 bg-olympic-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <span className="text-xs font-bold text-olympic-400 uppercase tracking-wider">
            Didukung Oleh Mitra & Sponsor Resmi
          </span>
        </div>
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_80px,_black_calc(100%-80px),transparent_100%)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-5 py-1">
            {marqueeSponsors.map((sponsor, idx) => (
              <div
                key={`${sponsor.id}-${idx}`}
                className="glass-dark rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-olympic-800/60 transition-colors cursor-default"
              >
                <div className="w-9 h-9 rounded-xl bg-olympic-800 flex items-center justify-center p-1 overflow-hidden border border-olympic-700">
                  <ImageWithFallback src={sponsor.logo} alt={sponsor.name} name={sponsor.name} type="sponsor" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-white block">{sponsor.name}</span>
                  <span className="text-[10px] text-olympic-400">{sponsor.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ROBOTS SECTION — Carousel 3 cards */}
      <section id="robots" className="relative py-20 bg-gradient-to-b from-slate-50 to-blue-50/50 overflow-hidden">
        <div className="absolute top-10 right-0 w-96 h-96 bg-olympic-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-3">
                Wahana Robotik
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-olympic-900 tracking-tight leading-tight">
                Armada Robot{' '}
                <span className="gradient-text">Aterkia</span>
              </h2>
              <p className="text-slate-500 text-base mt-3 font-light">
                Dua fokus wahana utama: Kapal Cepat Permukaan (ASV) dan Robot Selam Bawah Air (AUV).
              </p>
            </div>
          </div>

          {/* Carousel with inner arrows */}
          <div className="relative group/carousel">
            {/* Left arrow */}
            {robotCanLeft && (
              <button
                onClick={() => scroll(robotScrollRef, -1, setRobotCanLeft, setRobotCanRight)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-olympic-50 hover:border-olympic-300 hover:scale-110 -ml-1"
                aria-label="Scroll kiri"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
            )}
            {/* Right arrow */}
            {robotCanRight && (
              <button
                onClick={() => scroll(robotScrollRef, 1, setRobotCanLeft, setRobotCanRight)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-olympic-50 hover:border-olympic-300 hover:scale-110 -mr-1"
                aria-label="Scroll kanan"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            )}

            <div
              ref={robotScrollRef}
              onScroll={() => checkScroll(robotScrollRef, setRobotCanLeft, setRobotCanRight)}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1"
            >
            {robotsData.map((robot, idx) => {
              const isAUV = robot.category === 'AUV';
              return (
                <div
                  key={robot.id}
                  className="snap-start shrink-0 w-[calc(33.333%-16px)] min-w-[280px] group relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md shadow-slate-200/60 hover:shadow-2xl hover:shadow-olympic-200/60 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${isAUV ? 'bg-gradient-to-r from-olympic-500 to-blue-400' : 'bg-gradient-to-r from-olympic-600 to-olympic-400'}`} />

                  <div>
                    <div className="relative h-52 w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                      <ImageWithFallback
                        src={robot.image}
                        alt={robot.name}
                        name={robot.name}
                        category={robot.category}
                        type="robot"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`text-[11px] font-bold px-3.5 py-1.5 rounded-xl uppercase shadow-lg ${
                          isAUV ? 'bg-olympic-500 text-white' : 'bg-olympic-600 text-white'
                        }`}>
                          {robot.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-semibold text-olympic-500 block mb-1">
                        {robot.tagline}
                      </span>
                      <h3 className="font-display font-bold text-xl text-olympic-900 mb-2 group-hover:text-olympic-600 transition-colors">
                        {robot.name}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-light mb-5 line-clamp-3">
                        {robot.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {Object.entries(robot.specs).slice(0, 2).map(([k, v]) => (
                          <span key={k} className="text-xs bg-slate-50 border border-slate-100 text-slate-600 px-3 py-1.5 rounded-xl">
                            <span className="text-slate-400">{k}:</span>{' '}
                            <span className="font-semibold">{v}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      onClick={() => setSelectedRobot(robot)}
                      className="w-full py-3 rounded-xl bg-olympic-50 hover:bg-olympic-500 hover:text-white text-olympic-600 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
                    >
                      <span>Spesifikasi Lengkap</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative -mt-1 bg-gradient-to-b from-slate-50 to-blue-50/50">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 0 720 80 1080 40C1260 20 1380 30 1440 40V0H0V40Z" fill="#eef2f7" />
        </svg>
      </div>

      {/* 4. NEWS SECTION — Carousel 4 cards */}
      <section className="py-20 bg-[#eef2f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FF6B35' }}>
                <Sparkles className="w-4 h-4" />
                Berita & Kegiatan
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-olympic-900 tracking-tight leading-tight">
                Kabar Terbaru{' '}
                <span className="gradient-text">Aterkia</span>
              </h2>
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
