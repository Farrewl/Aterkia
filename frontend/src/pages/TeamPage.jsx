import React from 'react';
import VintageGallery from '../components/VintageGallery';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0B131D] text-white">
      {/* ── Header Full-Bleed Hero Section ── */}
      <section className="relative w-full h-[95vh] sm:h-[100vh] overflow-hidden">
        {/* Full Viewport Group Photo */}
        <img
          src="/images/team/aterkia-team-group.png"
          alt="Aterkia Fleet Crew"
          className="absolute inset-0 w-full h-full object-cover object-top scale-105"
        />

        {/* Vintage Dark Ocean Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B131D]/20 to-[#0B131D]" />

        {/* Smooth Fade Transition to Captain's Quarters */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0B131D] to-transparent pointer-events-none" />
      </section>

      {/* ── The Captain's Quarters & Portrait Wall ── */}
      <div className="bg-[#0B131D] mt-[-2rem]">
        <VintageGallery />
      </div>
    </div>
  );
}
