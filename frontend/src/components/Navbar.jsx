import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Globe } from 'lucide-react';
import { UserAvatar } from './auth';
import { useAuth } from '../hooks';
import { useTranslation } from '../i18n';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const { lang, setLang, t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const location = useLocation();
  // Pages with light backgrounds need dark navbar chrome; everything else is dark ocean themed
  const isLightPage = location.pathname.startsWith('/team');
  const showBackground = isScrolled || isHovered || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/history', label: t('nav.history') },
    { to: '/robots', label: t('nav.robots') },
    { to: '/team', label: t('nav.team') }
  ];

  const updateIndicator = () => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('.nav-active');
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        visible: true,
      });
    } else {
      setIndicator(prev => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [location.pathname]);

  // Chrome tone: light pages get dark text, dark ocean pages always use white text
  const chromeLight = isLightPage && showBackground;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBackground
          ? isScrolled && !isLightPage
            ? 'py-2.5 bg-[#060d1a]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
            : 'py-2.5 bg-white/[0.08] backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
          : 'py-4 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Aterkia Home">
            <div className="relative">
              <img src="/assets/profile.png" alt="Aterkia Logo" className="h-12 w-13 object-contain rounded-lg" />
              <div/>
            </div>
            <div className="hidden sm:block">
              <span className={`font-display font-extrabold text-lg tracking-tight block leading-none transition-colors duration-300 ${
                chromeLight ? 'text-olympic-900' : 'text-white drop-shadow-md'
              }`}>
                ATERKIA
              </span>
              <span className={`text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                chromeLight ? 'text-olympic-400' : 'text-white/70 drop-shadow-sm'
              }`}>
                RoboBoat Team
              </span>
            </div>
          </Link>

          {/* Menu Tengah — sliding indicator */}
          <nav ref={navRef} className={`hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-2xl shadow-sm relative transition-all duration-500 ${
            chromeLight
              ? 'bg-slate-50 border border-slate-100'
              : 'bg-white/10 border border-white/15 backdrop-blur-sm'
          }`}>
            {/* Sliding indicator pill */}
            <div
              className="absolute top-1 bottom-1 rounded-xl bg-olympic-500 shadow-md shadow-olympic-500/25 transition-all duration-300 ease-out"
              style={{
                left: `${indicator.left}px`,
                width: `${indicator.width}px`,
                opacity: indicator.visible ? 1 : 0,
              }}
            />
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative z-10 px-4 py-1.5 text-[13px] font-semibold rounded-xl transition-colors duration-200 ${
                    isActive
                      ? 'nav-active text-white'
                      : chromeLight
                        ? 'text-slate-500 hover:text-olympic-600'
                        : 'text-white/75 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Kanan: Language + UserAvatar/Login + Contact Us */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              aria-label="Toggle language"
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 border-2 ${
                chromeLight
                  ? 'border-slate-200 text-slate-500 hover:border-olympic-500 hover:text-olympic-600 hover:bg-olympic-50'
                  : 'border-white/30 text-white/85 hover:bg-white/10 hover:border-white/60'
              }`}
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'ID' : 'EN'}
            </button>
            {isAuthenticated ? (
              <UserAvatar />
            ) : (
              <NavLink
                to="/login"
                state={{ from: location }}
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 border-2 ${
                    isActive
                      ? 'border-olympic-900 text-olympic-900 bg-white'
                      : chromeLight
                        ? 'border-olympic-500 text-olympic-500 hover:bg-olympic-50 hover:border-olympic-600 hover:text-olympic-600'
                        : 'border-white/50 text-white hover:bg-white/10 hover:border-white/70'
                  }`
                }
              >
                {t('nav.login')}
              </NavLink>
            )}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-olympic-900 text-white shadow-lg'
                    : showBackground
                      ? 'bg-olympic-500 hover:bg-olympic-600 text-white shadow-md shadow-olympic-500/25 hover:shadow-lg hover:shadow-olympic-500/30 hover:scale-[1.02]'
                      : 'bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-sm'
                }`
              }
            >
              <span>{t('nav.contact')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {/* Tombol menu HP */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl focus:outline-none transition-all duration-300 ${
                chromeLight
                  ? 'bg-olympic-50 border border-olympic-100 text-olympic-600 hover:bg-olympic-100'
                  : 'bg-white/10 border border-white/15 text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer menu HP */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 px-4 pt-3 pb-6 mt-1 shadow-xl animate-fade-in rounded-b-3xl">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-olympic-500 text-white shadow-md shadow-olympic-500/20'
                      : 'text-slate-600 hover:bg-olympic-50 hover:text-olympic-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm tracking-wider hover:bg-olympic-50 hover:border-olympic-500 hover:text-olympic-600 transition-all"
              >
                <Globe className="w-4 h-4" />
                {lang === 'en' ? 'Bahasa Indonesia' : 'English'}
              </button>
              {isAuthenticated ? (
                <UserAvatar />
              ) : (
                <NavLink
                  to="/login"
                  state={{ from: location }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-olympic-500 text-olympic-500 font-bold text-sm tracking-wider hover:bg-olympic-50 transition-all"
                >
                  {t('nav.login')}
                </NavLink>
              )}
              <NavLink
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-olympic-500 text-white font-bold text-sm tracking-wider shadow-md shadow-olympic-500/20"
              >
                <span>{t('nav.contact')}</span>
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
