import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Monitor } from 'lucide-react';
import { UserAvatar } from './auth';
import { useAuth } from '../hooks';

export default function Navbar() {
  const { isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const location = useLocation();
  const useLightTeamHeader = location.pathname === '/team';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/history', label: 'History' },
    { to: '/robots', label: 'Robots' },
    { to: '/team', label: 'Team' }
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

  const showBackground = isScrolled || isHovered || useLightTeamHeader;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBackground
          ? isScrolled
            ? 'py-2.5 bg-white/[0.08] backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
            : 'py-3 bg-white/[0.15] backdrop-blur-xl border-b border-white/[0.1]'
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
                showBackground ? 'text-olympic-900' : 'text-white drop-shadow-md'
              }`}>
                ATERKIA
              </span>
              <span className={`text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                showBackground ? 'text-olympic-400' : 'text-white/70 drop-shadow-sm'
              }`}>
                RoboBoat Team
              </span>
            </div>
          </Link>

          {/* Menu Tengah — sliding indicator */}
          <nav ref={navRef} className={`hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-2xl shadow-sm relative transition-all duration-500 ${
            showBackground
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
                      : showBackground
                        ? 'text-slate-500 hover:text-olympic-600'
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Kanan: Monitor button + UserAvatar/Login + Contact Us */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Monitor button */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginTooltip(true);
                    setTimeout(() => setShowLoginTooltip(false), 2000);
                  } else {
                    navigate('/dashboard');
                  }
                }}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isAuthenticated
                    ? showBackground
                      ? 'bg-olympic-50 border border-olympic-100 text-olympic-600 hover:bg-olympic-100 hover:border-olympic-200'
                      : 'bg-white/10 border border-white/15 text-white hover:bg-white/20'
                    : showBackground
                      ? 'bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed'
                      : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                }`}
                title={!isAuthenticated ? 'Must login first' : hasRole('admin') ? 'Monitor (Admin)' : 'Monitor (View Only)'}
              >
                <Monitor className="w-4.5 h-4.5" />
              </button>
              {showLoginTooltip && (
                <div className="absolute top-full mt-2 right-0 whitespace-nowrap px-3 py-1.5 bg-red-500 text-white text-[11px] font-semibold rounded-lg shadow-lg animate-fade-in z-50">
                  Must login first
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-red-500 rotate-45" />
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <UserAvatar />
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 border-2 ${
                    isActive
                      ? 'border-olympic-900 text-olympic-900 bg-olympic-50'
                      : showBackground
                        ? 'border-olympic-500 text-olympic-500 hover:bg-olympic-50 hover:border-olympic-600 hover:text-olympic-600'
                        : 'border-white/50 text-white hover:bg-white/10 hover:border-white/70'
                  }`
                }
              >
                Login
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
              <span>Contact Us</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          {/* Tombol menu HP */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl focus:outline-none transition-all duration-300 ${
                showBackground
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
              {/* Monitor button — mobile */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (!isAuthenticated) {
                    setShowLoginTooltip(true);
                    setTimeout(() => setShowLoginTooltip(false), 2000);
                  } else {
                    navigate('/dashboard');
                  }
                }}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold tracking-wider transition-all ${
                  isAuthenticated
                    ? 'border-2 border-olympic-500 text-olympic-500 hover:bg-olympic-50'
                    : 'border-2 border-slate-200 text-slate-300 cursor-not-allowed'
                }`}
              >
                <Monitor className="w-4 h-4" />
                {isAuthenticated ? (hasRole('admin') ? 'Monitor (Admin)' : 'Monitor (View)') : 'Monitor'}
              </button>
              {isAuthenticated ? (
                <UserAvatar />
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-olympic-500 text-olympic-500 font-bold text-sm tracking-wider hover:bg-olympic-50 transition-all"
                >
                  Login
                </NavLink>
              )}
              <NavLink
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-olympic-500 text-white font-bold text-sm tracking-wider shadow-md shadow-olympic-500/20"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}