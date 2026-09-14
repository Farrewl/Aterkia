import React from 'react';
import { Target, Flag } from 'lucide-react';
import { useTranslation } from '../i18n';

const ROADMAP_ITEMS = [
  {
    year: '2026',
    title: 'Autonomous Navigation & Sonar Integration',
    desc: 'Enhance SLAM algorithms, integrate multi-beam sonar for ASV, and achieve full pool qualification for RoboBoat.',
    status: 'In Progress'
  },
  {
    year: '2027',
    title: 'Deep-Sea Autonomous Maneuvering',
    desc: 'Deploy custom subsea thruster arrays and real-time computer vision object tracking for international AUV challenges.',
    status: 'Upcoming'
  }
];

export default function RoadmapSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 bg-[#060d1a] border-t border-sky-500/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Future Milestones</span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white mt-2">
            Strategic <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-sky-200/60 text-sm sm:text-base mt-3">
            Focus areas and key goals planned for 2026 and 2027.
          </p>
        </div>

        {/* Minimal Flow Line (Non-card layout) */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-sky-400/40 before:via-sky-400/20 before:to-transparent">
          {ROADMAP_ITEMS.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 group`}>
                
                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#0a1628] border-2 border-sky-400 shadow-lg shadow-sky-400/20 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                </div>

                {/* Content Side */}
                <div className={`pl-16 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <span className="inline-block px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-xs font-bold text-sky-400 mb-2">
                    {item.year} • {item.status}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-sky-200/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
