import React from 'react';
import VintageGallery from '../components/VintageGallery';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0B131D] text-white">
      {/* ── Header Full-Bleed Hero Section ── */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] overflow-hidden">
        {/* Full Viewport Group Photo */}
        <img
          src="/images/team/aterkia-team-group.png"
          alt="Aterkia Fleet Crew"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Vintage Dark Ocean Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B131D] via-[#0B131D]/40 to-black/60" />

        {/* Center Content Over Group Photo */}
        <div className="absolute inset-0 flex items-center justify-center pt-16 px-4">
          <div className="text-center space-y-4 max-w-4xl p-6 rounded-3xl">
            <h1 className="text-4xl sm:text-7xl font-serif font-black tracking-tight text-[#F4EBD9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              WE ARE ATERKIA
            </h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto opacity-80" />
          </div>
        </div>

        {/* Bottom Fade Transition to Captain's Quarters */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0B131D] to-transparent pointer-events-none" />
      </section>

      {/* ── The Captain's Quarters & Portrait Wall ── */}
      <div className="bg-gradient-to-b from-[#0B131D] via-[#060D1A] to-[#0B131D]">
        <VintageGallery />
      </div>
    </div>
  );
}
