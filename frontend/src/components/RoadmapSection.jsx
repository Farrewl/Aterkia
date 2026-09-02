import React from 'react';
import { missionData } from '../data/missionData';
import { Compass, ArrowRight } from 'lucide-react';

export default function RoadmapSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#060d1a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] right-[10%] w-72 h-72 bg-sky-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
              <Compass className="w-4 h-4" />
              Next Mission
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Our{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Roadmap</span>
            </h2>
          </div>
          <ArrowRight className="hidden sm:block w-6 h-6 text-white/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missionData.map((m, idx) => (
            <div
              key={m.year + m.title}
              className={`group relative ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.06] hover:border-sky-500/25 transition-all duration-500 hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-black font-display text-sky-400 group-hover:text-sky-300 transition-colors">
                  {m.year}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-400/20 text-sky-300">
                  {m.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-sky-300 transition-colors">
                {m.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed font-light">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
