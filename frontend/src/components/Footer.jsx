import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { ArrowUp, Anchor, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-olympic-900 text-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-olympic-700/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-olympic-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

            {/* Brand — large */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <img src="/assets/profile.png" alt="Aterkia Logo" className="w-12 h-12 object-contain rounded-lg" />
                <div>
                  <span className="font-display font-extrabold text-2xl tracking-tight block leading-none">ATERKIA</span>
                  <span className="text-[10px] font-semibold text-olympic-300 uppercase tracking-[0.2em]">RoboBoat Team</span>
                </div>
              </div>
              <p className="text-olympic-300 text-sm leading-relaxed max-w-sm">
                An Undip student maritime robotics team developing autonomous surface vehicles (ASV) and underwater robots (AUV) for national and international competitions.
              </p>
              <div className="flex gap-2.5">
                {[
                  { href: siteConfig.socials.github, label: 'GitHub', d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                  { href: siteConfig.socials.instagram, label: 'IG', d: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z' },
                  { href: siteConfig.socials.linkedin, label: 'LI', d: 'M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
                  { href: siteConfig.socials.youtube, label: 'YT', d: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-olympic-800 border border-olympic-700 text-olympic-300 hover:text-white hover:bg-olympic-600 hover:border-olympic-500 flex items-center justify-center transition-all duration-200 hover:scale-105">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigasi */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-bold text-olympic-200 uppercase text-xs tracking-wider">Navigation</h4>
              <ul className="space-y-2.5">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About' },
                  { to: '/history', label: 'History' },
                  { to: '/robots', label: 'Robots' },
                  { to: '/team', label: 'Team' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-olympic-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-bold text-olympic-200 uppercase text-xs tracking-wider">Contact</h4>
              <div className="space-y-3 text-sm text-olympic-400">
                <a href={`mailto:${siteConfig.email}`} className="block hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
                <a href={`mailto:${siteConfig.partnershipEmail}`} className="block hover:text-white transition-colors">
                  {siteConfig.partnershipEmail}
                </a>
                <p className="text-olympic-500 text-xs leading-relaxed">
                  Student Center, Universitas Diponegoro
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-olympic-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-olympic-500 text-xs">
            <span className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Aterkia Roboboat
            </span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-xl bg-olympic-800 border border-olympic-700 text-olympic-400 hover:text-white hover:bg-olympic-600 transition-all duration-200 hover:scale-105" aria-label="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
