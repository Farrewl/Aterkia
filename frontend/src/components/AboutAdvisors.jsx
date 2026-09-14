import React from 'react';
import { aboutData } from '../data/aboutData';

export default function AboutAdvisors() {
  const advisors = aboutData.teamStructure?.advisors || [];

  return (
    <section className="py-24 px-4 bg-[#081424] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-sky-400 block mb-3">Mentorship & Guidance</span>
        <h2 className="text-4xl font-black font-display mb-16">Faculty Advisors</h2>

        <div className="flex flex-wrap justify-center gap-8">
          {advisors.map((adv, i) => (
            <div key={i} className="border border-white/10 rounded-3xl p-8 bg-white/[0.03] backdrop-blur-xl text-center w-80 shadow-2xl hover:border-sky-500/40 transition-all">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30 mx-auto mb-6 flex items-center justify-center text-sky-300 font-bold text-2xl">
                {adv.name ? adv.name.charAt(0) : 'A'}
              </div>
              <h3 className="font-bold text-xl text-white mb-1">{adv.name}</h3>
              <p className="text-xs font-mono text-sky-400 uppercase tracking-widest">{adv.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
