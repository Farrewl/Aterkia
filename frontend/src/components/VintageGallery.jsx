import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Anchor } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import SocialLinks from './SocialLinks';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Muhammad Bintang Tri Surya',
    role: 'Chief Captain / Founder',
    frameType: 'oval',
    imageSrc: '/images/team/president/muhammad-bintang-tri-surya.webp',
    buttonText: 'VIEW LOGBOOK',
    socials: {
      github: 'https://github.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      portfolio: 'https://aterkia.com'
    }
  },
  {
    id: 2,
    name: 'Sekretaris Tim',
    role: 'Master Scribe / Secretary',
    frameType: 'rectangular',
    imageSrc: '/images/team/president/muhammad-bintang-tri-surya.webp',
    buttonText: 'INSPECT CHARTS',
    socials: {
      github: 'https://github.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 3,
    name: 'Feby',
    role: 'Grand Treasurer / Finance',
    frameType: 'oval',
    imageSrc: '/images/team/president/muhammad-bintang-tri-surya.webp',
    buttonText: 'VIEW LOGBOOK',
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 4,
    name: 'Ketua Official',
    role: 'Operations & Media Commander',
    frameType: 'rectangular',
    imageSrc: '/images/team/president/muhammad-bintang-tri-surya.webp',
    buttonText: 'INSPECT CHARTS',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 5,
    name: 'Ketua ASV',
    role: 'ASV Commander / Mechanical Lead',
    frameType: 'oval',
    imageSrc: '/images/team/president/muhammad-bintang-tri-surya.webp',
    buttonText: 'VIEW LOGBOOK',
    socials: {
      github: 'https://github.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 6,
    name: 'Ketua AUV',
    role: 'AUV Commander / Electronics Lead',
    frameType: 'rectangular',
    imageSrc: '/images/team/president/muhammad-bintang-tri-surya.webp',
    buttonText: 'INSPECT CHARTS',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      portfolio: 'https://aterkia.com'
    }
  },
];

export default function VintageGallery() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0B131D] via-[#120E0B] to-[#0B131D] text-[#F4EBD9] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Watermark & Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(244, 235, 217, 0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] opacity-[0.03] pointer-events-none">
        <Compass size="100%" strokeWidth={0.4} className="animate-spin" style={{ animationDuration: '180s' }} />
      </div>

      {/* Decorative Antique Elements */}
      <div className="absolute top-8 left-8 z-20 opacity-70 hover:opacity-100 transition-opacity">
        <div className="w-12 h-20 border-l border-t border-sky-400/40 pl-2 pt-2">
          <Anchor size={36} className="text-sky-400" />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 z-20 opacity-70 hover:opacity-100 transition-opacity">
        <div className="w-12 h-20 border-r border-b border-sky-400/40 pr-2 pb-2 flex items-end justify-end">
          <Compass size={36} className="text-sky-400 rotate-[-12deg]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-28">
          <span className="text-xs sm:text-sm font-display font-bold tracking-[0.3em] uppercase gradient-text block mb-3">
            Captain's Quarters & Fleet Command
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight mb-6 uppercase text-white">
            THE CAPTAINS & CREW
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mb-6" />
          <p className="font-sans italic text-sky-200/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            "The navigators, cartographers, and engineers steering our fleet through digital and maritime frontiers."
          </p>
        </header>

        {/* Staggered Portrait Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {TEAM_MEMBERS.map((member, index) => {
            // Captain/Founder (index 0) is centered and elevated
            const isCaptain = index === 0;
            const isStaggered = !isCaptain && index % 2 !== 0;

            return (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`flex flex-col items-center group ${isCaptain ? 'md:col-span-2 lg:col-span-3 mb-16' : ''} ${isStaggered ? 'lg:translate-y-12' : ''}`}
              >
                {/* Vintage Frame Container */}
                <div className={`relative ${isCaptain ? 'w-72 sm:w-80 h-[420px] sm:h-[480px]' : 'w-64 sm:w-72 h-80 sm:h-96'} flex items-center justify-center p-3 mb-6 transition-transform duration-500 group-hover:-translate-y-2`}>
                  {/* Outer Frame Effect */}
                  {member.frameType === 'oval' ? (
                    <div className="absolute inset-0 border-[14px] border-[#8B5A2B] rounded-[50%] shadow-[inset_0_0_25px_rgba(0,0,0,0.9),0_15px_35px_rgba(0,0,0,0.7)] z-20 pointer-events-none ring-2 ring-[#D4AF37]/50" />
                  ) : (
                    <div className="absolute inset-0 border-[14px] border-[#4A2F13] shadow-[inset_0_0_25px_rgba(0,0,0,0.9),0_15px_35px_rgba(0,0,0,0.7)] z-20 pointer-events-none ring-2 ring-[#D4AF37]/50">
                      {/* Brass Corner Accents */}
                      <span className="absolute -top-1 -left-1 text-[#D4AF37] text-xs">◆</span>
                      <span className="absolute -top-1 -right-1 text-[#D4AF37] text-xs">◆</span>
                      <span className="absolute -bottom-1 -left-1 text-[#D4AF37] text-xs">◆</span>
                      <span className="absolute -bottom-1 -right-1 text-[#D4AF37] text-xs">◆</span>
                    </div>
                  )}

                  {/* Inner Photo Stage with Candlelight Vignette */}
                  <div className={`relative w-full h-full overflow-hidden bg-[#0B131D] ${member.frameType === 'oval' ? 'rounded-[50%]' : 'rounded-sm'}`}>
                    <ImageWithFallback
                      src={member.imageSrc}
                      alt={member.name}
                      name={member.name}
                      className="w-full h-full object-cover grayscale-[20%] sepia-[30%] contrast-110 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                      containerClassName="w-full h-full"
                    />
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle, transparent 40%, rgba(11,19,29,0.85) 100%)' }} />
                  </div>
                </div>

                {/* Identity & Details */}
                <div className="text-center space-y-1 max-w-xs">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium italic gradient-text">
                    {member.role}
                  </p>
                  
                  {/* Social Links */}
                  <SocialLinks socials={member.socials} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
