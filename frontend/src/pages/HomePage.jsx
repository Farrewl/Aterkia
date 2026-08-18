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
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display text-balance drop-shadow-lg">
                <span className="text-white">Aterkia</span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent drop-shadow-lg">RoboBoat</span>
              </h1>

              <p className="text-lg sm:text-xl gradient-text/80 max-w-xl leading-relaxed font-light drop-shadow-sm">
                Tim riset robotika maritim yang mengembangkan{' '}
                <span className="font-semibold gradient-text">wahana otonom laut</span>{' '}
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
                  <span className="block text-3xl font-black gradient-text font-display drop-shadow-md">4+</span>
                  <span className="text-xs gradient-text/60 font-medium">Robot Dikembangkan</span>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-center">
                  <span className="block text-3xl font-black gradient-text font-display drop-shadow-md">10+</span>
                  <span className="text-xs gradient-text/60 font-medium">Anggota Aktif</span>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-center">
                  <span className="block text-3xl font-black font-display drop-shadow-md" style={{ color: '#FF6B35' }}>3</span>
                  <span className="text-xs gradient-text/60 font-medium">Tahun Riset</span>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Wave Divider + Sponsors — combined shape */}
      <div className="relative bg-olympic-900">
        {/* Top wave — white hero bg cutting into dark sponsors */}
        <div className="relative w-full">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: '80px', marginBottom: '-1px' }}>
            <path d="M0,0 L1440,0 L1440,35 Q1200,75 960,35 Q720,0 480,35 Q240,75 0,35 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Sponsors logos — filling the wave area */}
        <div className="relative z-10 px-8 py-6 sm:py-8 overflow-hidden">
          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-10 sm:gap-14 py-2">
              {marqueeSponsors.map((sponsor, idx) => (
                <div
                  key={`${sponsor.id}-${idx}`}
                  className="shrink-0 opacity-50 hover:opacity-90 transition-opacity duration-300 cursor-default"
                >
                  <ImageWithFallback
                    src={sponsor.logo}
                    alt={sponsor.name}
                    name={sponsor.name}
                    type="sponsor"
                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave — dark sponsors bg cutting into white robots section */}
        <div className="relative w-full">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: '80px', marginTop: '-1px' }}>
            <path d="M0,45 Q240,5 480,45 Q720,80 960,45 Q1200,5 1440,45 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

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
