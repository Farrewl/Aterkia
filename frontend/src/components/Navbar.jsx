import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronRight, Anchor } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { to: '/robots', label: 'Robot' },
    { to: '/team', label: 'Tim' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'py-2.5 bg-white/90 backdrop-blur-xl border-b border-olympic-100 shadow-lg shadow-olympic-500/5'
        : 'py-3.5 bg-white/70 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Aterkia Home">
            <div className="relative">
              <img src="/assets/profile.png" alt="Aterkia Logo" className="h-10 w-10 object-contain rounded-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white" style={{ background: '#FF6B35' }} />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-extrabold text-lg tracking-tight text-olympic-900 block leading-none">
                ATERKIA
              </span>
              <span className="text-[9px] font-semibold text-olympic-400 uppercase tracking-[0.2em]">
                RoboBoat Team
              </span>
            </div>
          </Link>

          {/* Menu Tengah */}
          <nav className="hidden md:flex items-center gap-0.5 bg-slate-50 border border-slate-100 px-2 py-1.5 rounded-2xl shadow-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-[13px] font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-olympic-500 text-white shadow-md shadow-olympic-500/25'
                      : 'text-slate-500 hover:text-olympic-600 hover:bg-olympic-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Kanan: Contact Us */}
          <div className="hidden md:flex items-center">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-olympic-900 text-white shadow-lg'
                    : 'bg-olympic-500 hover:bg-olympic-600 text-white shadow-md shadow-olympic-500/25 hover:shadow-lg hover:shadow-olympic-500/30 hover:scale-[1.02]'
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
              className="p-2.5 rounded-xl bg-olympic-50 border border-olympic-100 text-olympic-600 hover:bg-olympic-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer menu HP */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-3 pb-6 mt-1 shadow-xl animate-fade-in rounded-b-3xl">
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
            <div className="pt-3 border-t border-slate-100 mt-2">
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
