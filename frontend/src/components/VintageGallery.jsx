import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Anchor } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import SocialLinks from './SocialLinks';

// --- Data Structure ---

const LEADERSHIP = {
  founder: {
    id: 'founder',
    name: 'Muhammad Bintang Tri Surya',
    role: 'Chief Captain / Founder',
    frameType: 'oval',
    imageSrc: '/images/team/president/muhammad-bintang-tri-surya.webp',
  },
  secretary: {
    id: 'secretary',
    name: 'Secretary Name',
    role: 'Master Scribe / Secretary',
    frameType: 'rectangular',
    imageSrc: '/images/team/nontechnical/secretary.jpg',
  },
  treasurer: {
    id: 'treasurer',
    name: 'Feby Finance',
    role: 'Grand Treasurer / Finance',
    frameType: 'oval',
    imageSrc: '/images/team/auv/feby-finance-clean.webp',
  }
};

const COMMANDERS = [
  {
    id: 'official-lead',
    name: 'Official Lead',
    role: 'Operations Commander',
    frameType: 'rectangular',
    imageSrc: '/images/team/nontechnical/official-coordinator.jpg',
    division: 'OFFICIAL',
    subdivisions: [
      { name: 'Media', count: 3 },
      { name: 'Sponsor', count: 3 }
    ]
  },
  {
    id: 'asv-lead',
    name: 'ASV Lead',
    role: 'ASV Commander',
    frameType: 'oval',
    imageSrc: '/images/team/asv/ketua.jpg',
    division: 'ASV',
    subdivisions: [
      { name: 'Mechanical', count: 7 },
      { name: 'Elkapro', count: 13 }
    ]
  },
  {
    id: 'auv-lead',
    name: 'AUV Lead',
    role: 'AUV Commander',
    frameType: 'rectangular',
    imageSrc: '/images/team/auv/feby-finance-clean.webp', // Using same for placeholder
    division: 'AUV',
    subdivisions: [
      { name: 'Mechanical', count: 6 },
      { name: 'Elkapro', count: 9 }
    ]
  }
];

// --- Components ---

const PortraitFrame = ({ member, size = 'md', isCaptain = false }) => {
  const isOval = member.frameType === 'oval';
  
  // Dimensions
  const containerClasses = {
    lg: 'w-72 sm:w-80 h-[420px] sm:h-[480px]',
    md: 'w-64 sm:w-72 h-80 sm:h-96',
    sm: 'w-40 sm:w-48 h-56 sm:h-64'
  }[size];

  return (
    <div className={`relative ${containerClasses} flex items-center justify-center p-2 mb-4 transition-transform duration-500 group-hover:-translate-y-2`}>
      {/* Outer Frame Effect */}
      {isOval ? (
        <div className="absolute inset-0 border-[10px] border-[#8B5A2B] rounded-[50%] shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_10px_25px_rgba(0,0,0,0.7)] z-20 pointer-events-none ring-1 ring-[#D4AF37]/30" />
      ) : (
        <div className="absolute inset-0 border-[10px] border-[#4A2F13] shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_10px_25px_rgba(0,0,0,0.7)] z-20 pointer-events-none ring-1 ring-[#D4AF37]/30">
          <span className="absolute -top-1 -left-1 text-[#D4AF37] text-[10px]">◆</span>
          <span className="absolute -top-1 -right-1 text-[#D4AF37] text-[10px]">◆</span>
          <span className="absolute -bottom-1 -left-1 text-[#D4AF37] text-[10px]">◆</span>
          <span className="absolute -bottom-1 -right-1 text-[#D4AF37] text-[10px]">◆</span>
        </div>
      )}

      {/* Inner Photo Stage */}
      <div className={`relative w-full h-full overflow-hidden bg-[#0B131D] ${isOval ? 'rounded-[50%]' : 'rounded-sm'}`}>
        <ImageWithFallback
          src={member.imageSrc || '/assets/profile.png'}
          alt={member.name}
          name={member.name}
          className="w-full h-full object-cover grayscale-[15%] sepia-[20%] contrast-110 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, transparent 40%, rgba(11,19,29,0.85) 100%)' }} />
      </div>
    </div>
  );
};

const MemberCard = ({ member, size = 'sm' }) => (
  <motion.article
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex flex-col items-center group"
  >
    <PortraitFrame member={member} size={size} />
    <div className="text-center max-w-[180px]">
      <h3 className={`${size === 'sm' ? 'text-sm' : 'text-lg'} font-display font-bold text-white leading-tight truncate w-full`}>
        {member.name}
      </h3>
      <p className={`${size === 'sm' ? 'text-[10px]' : 'text-xs'} font-medium italic gradient-text uppercase tracking-wider`}>
        {member.role}
      </p>
    </div>
  </motion.article>
);

export default function VintageGallery() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0B131D] via-[#120E0B] to-[#0B131D] text-[#F4EBD9] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Watermark & Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(244, 235, 217, 0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] opacity-[0.03] pointer-events-none">
        <Compass size="100%" strokeWidth={0.4} className="animate-spin" style={{ animationDuration: '180s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
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

        {/* 1. Leadership Triangle */}
        <div className="flex flex-col items-center mb-32">
          <div className="relative">
            {/* Founder - Center Top */}
            <div className="flex justify-center mb-[-40px] relative z-10">
              <MemberCard member={LEADERSHIP.founder} size="lg" />
            </div>
            
            {/* Sec & Treas - Bottom Left & Right */}
            <div className="flex gap-12 sm:gap-32 mt-[-20px]">
              <div className="translate-y-10 -rotate-3 hover:rotate-0 transition-transform duration-500">
                <MemberCard member={LEADERSHIP.treasurer} size="md" />
              </div>
              <div className="translate-y-10 rotate-3 hover:rotate-0 transition-transform duration-500">
                <MemberCard member={LEADERSHIP.secretary} size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Commanders & Their Crews */}
        <div className="space-y-40">
          {COMMANDERS.map((commander) => (
            <div key={commander.id} className="space-y-16">
              {/* Commander Header */}
              <div className="flex flex-col items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
                <MemberCard member={commander} size="md" />
              </div>

              {/* Crew Grids */}
              <div className="flex flex-col gap-12">
                {commander.subdivisions.map((sub) => (
                  <div key={sub.name} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-sky-400/20" />
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400/60">
                        {commander.division} {sub.name} <span className="opacity-40">/ {sub.count} Units</span>
                      </h4>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-sky-400/20" />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 justify-items-center">
                      {Array.from({ length: sub.count }).map((_, i) => (
                        <MemberCard 
                          key={i} 
                          member={{
                            name: 'Crew Member',
                            role: sub.name,
                            frameType: (i + (sub.name === 'Elkapro' ? 1 : 0)) % 2 === 0 ? 'oval' : 'rectangular',
                            imageSrc: null
                          }} 
                          size="sm" 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
