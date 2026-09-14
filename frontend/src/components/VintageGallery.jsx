import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Waves, Shield, Compass, Radio } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import SocialLinks from './SocialLinks';

const FOUNDER_IMG = '/images/team/president/muhammad-bintang-tri-surya.webp';

const DEFAULT_SOCIALS = {
  github: 'https://github.com',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  portfolio: 'https://aterkia.com'
};

const LEADERSHIP = {
  founder: { id: 'founder', name: 'Bintang Tri Surya', role: 'Chief Captain', major: "Teknik Perkapalan'24", frameType: 'oval', imageSrc: FOUNDER_IMG, socials: DEFAULT_SOCIALS },
  secretary: { id: 'secretary', name: 'Dita', role: 'Secretary', major: "Teknik Elektro'23", frameType: 'arch', imageSrc: FOUNDER_IMG, socials: DEFAULT_SOCIALS },
  treasurer: { id: 'treasurer', name: 'Kayla', role: 'Treasurer', major: "Teknik Elektro'23", frameType: 'hexagon', imageSrc: FOUNDER_IMG, socials: DEFAULT_SOCIALS }
};

const COMMANDERS = [
  {
    id: 'official-lead', name: 'Faza', role: 'Official Team Lead', major: "Teknik Elektro'24", frameType: 'rectangular', imageSrc: FOUNDER_IMG, division: 'OFFICIAL',
    theme: {
      bg: 'bg-gradient-to-b from-blue-950/40 via-blue-900/15 to-transparent',
      border: 'border-blue-500/30',
      patternType: 'grid'
    },
    socials: DEFAULT_SOCIALS,
    subdivisions: [{ name: 'Media', count: 3 }, { name: 'Sponsor', count: 3 }]
  },
  {
    id: 'asv-lead', name: 'Fatih', role: 'ASV Team Lead', major: "Teknik Perkapalan'24", frameType: 'arch', imageSrc: FOUNDER_IMG, division: 'ASV',
    theme: {
      bg: 'bg-gradient-to-b from-sky-950/40 via-sky-900/15 to-transparent',
      border: 'border-sky-500/30',
      patternType: 'waves'
    },
    socials: DEFAULT_SOCIALS,
    subLeads: [
      { name: 'Rafif', role: 'Mekanik Lead', major: "TRKP'23", frameType: 'hexagon', socials: DEFAULT_SOCIALS },
      { name: 'Ikhsan', role: 'Elkapro Lead', major: "Teknik Elektro'23", frameType: 'oval', socials: DEFAULT_SOCIALS }
    ],
    subdivisions: [{ name: 'Mechanical', count: 7 }, { name: 'Elkapro', count: 13 }]
  },
  {
    id: 'auv-lead', name: 'Justin', role: 'AUV Team Lead', major: "Teknik Komputer'23", frameType: 'hexagon', imageSrc: FOUNDER_IMG, division: 'AUV',
    theme: {
      bg: 'bg-gradient-to-b from-teal-950/40 via-teal-900/15 to-transparent',
      border: 'border-teal-500/30',
      patternType: 'sonar'
    },
    socials: DEFAULT_SOCIALS,
    subLeads: [
      { name: 'Mascha', role: 'Mekanik Lead', major: "TRKP'23", frameType: 'rectangular', socials: DEFAULT_SOCIALS },
      { name: 'Cielo', role: 'Elkapro Lead', major: "Teknik Komputer'23", frameType: 'arch', socials: DEFAULT_SOCIALS }
    ],
    subdivisions: [{ name: 'Mechanical', count: 6 }, { name: 'Elkapro', count: 9 }]
  }
];

const getFrameStyle = (type) => {
  switch(type) {
    case 'oval':
      return 'rounded-[50%] border-[6px] border-[#8B5A2B]';
    case 'arch':
      return 'rounded-t-[50%] rounded-b-sm border-[6px] border-[#654321]';
    case 'hexagon':
      return 'rounded-2xl border-[6px] border-[#704214]';
    case 'rectangular':
    default:
      return 'rounded-sm border-[6px] border-[#4A2F13]';
  }
};

const PortraitFrame = ({ member, size = 'md', isRevealed, onToggle }) => {
  const frameClass = getFrameStyle(member.frameType);
  const containerClasses = {
    lg: 'w-72 sm:w-80 h-[420px] sm:h-[480px]',
    md: 'w-64 sm:w-72 h-80 sm:h-96',
    sm: 'w-40 sm:w-48 h-52 sm:h-64'
  }[size];

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      onClick={onToggle}
      className={`relative ${containerClasses} flex items-center justify-center p-2 transition-all duration-300 cursor-pointer group`}
    >
      <div className={`absolute inset-0 ${frameClass} z-20 pointer-events-none shadow-2xl ring-1 ring-sky-400/20`} />
      <div className={`relative w-full h-full overflow-hidden bg-[#0B131D] ${member.frameType === 'oval' ? 'rounded-[50%]' : member.frameType === 'arch' ? 'rounded-t-[45%]' : 'rounded-sm'}`}>
        <ImageWithFallback src={member.imageSrc || FOUNDER_IMG} alt={member.name} className="w-full h-full object-cover" />
        
        {/* Hint on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-sky-300 uppercase bg-black/60 px-2 py-1 rounded border border-sky-400/30">
            {isRevealed ? 'Hide Links' : 'View Links'}
          </span>
        </div>
      </div>

      {/* Social Links Reveal */}
      <AnimatePresence>
        {isRevealed && member.socials && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 bg-[#060D17]/95 border border-sky-400/40 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col items-center justify-center"
          >
            <span className="text-[10px] font-mono text-sky-400/70 uppercase tracking-widest mb-2">Connect & Explore</span>
            <SocialLinks socials={member.socials} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MemberCard = ({ member, size = 'sm', className = "" }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div 
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: [0, -8, 0], rotate: [0, (member.index % 2 === 0 ? 2 : -2), 0] }}
      transition={{ duration: 4 + (member.index % 3), repeat: Infinity, ease: "easeInOut" }}
      className={`flex flex-col items-center group ${className}`}
    >
      <PortraitFrame member={member} size={size} isRevealed={isRevealed} onToggle={() => setIsRevealed(!isRevealed)} />
      <div className="text-center mt-2 max-w-[150px]">
        <h3 className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-bold text-white leading-tight truncate`}>{member.name}</h3>
        <p className="text-[9px] font-medium italic text-sky-400 uppercase tracking-widest">{member.role}</p>
        {member.major && <p className="text-[8px] text-white/50 font-mono mt-0.5">{member.major}</p>}
      </div>
    </motion.div>
  );
};

export default function VintageGallery() {
  return (
    <section className="relative min-h-screen bg-[#060D17] text-[#F4EBD9] py-32 px-4 overflow-x-clip">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#0A2647_0%,_#060D17_100%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <header className="text-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white uppercase">
            MEET OUR TEAM
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mt-6" />
        </header>

        {/* Leadership Row */}
        <div className="flex flex-row items-center justify-center gap-8 mb-32">
          <div className="translate-y-12 -rotate-2"><MemberCard member={{...LEADERSHIP.treasurer, index: 0}} size="md" /></div>
          <div className="z-10"><MemberCard member={{...LEADERSHIP.founder, index: 1}} size="lg" /></div>
          <div className="translate-y-12 rotate-2"><MemberCard member={{...LEADERSHIP.secretary, index: 2}} size="md" /></div>
        </div>

        {/* Commanders & Immersive Division Sectors (Clean, No Banners) */}
        <div className="space-y-36">
          {COMMANDERS.map((commander) => {
            const frameTypes = ['rectangular', 'oval', 'arch', 'hexagon'];
            return (
              <div 
                key={commander.id} 
                className={`relative p-8 sm:p-14 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden`}
              >

                {/* Division Content Tree (Commander + SubLeads + Crew Grid) */}
                <div className="relative z-10 flex flex-col items-center" style={{ zIndex: 2 }}>
                  <MemberCard member={{...commander, index: 0}} size="md" />
                  
                  {commander.subLeads && (
                    <div className="flex gap-6 mt-6">
                      {commander.subLeads.map((sl, i) => <MemberCard key={i} member={{...sl, index: i, socials: DEFAULT_SOCIALS}} size="sm" />)}
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12 w-full justify-items-center max-w-[1000px]">
                    {commander.subdivisions.flatMap(sub => 
                      Array.from({ length: sub.count }).map((_, i) => {
                        const assignedFrame = frameTypes[(i + (sub.name === 'Elkapro' ? 2 : 0)) % frameTypes.length];
                        return (
                          <div key={`${sub.name}-${i}`} className={`${i % 3 === 0 ? 'mt-8' : 'mt-0'}`}>
                            <MemberCard member={{ name: 'Crew', role: sub.name, frameType: assignedFrame, index: i, socials: DEFAULT_SOCIALS }} size="sm" />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
