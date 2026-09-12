import React from 'react';
import { useTranslation } from '../i18n';
import ImageWithFallback from '../components/ImageWithFallback';

const PRESIDENT = {
  name: 'Muhammad Bintang Tri Surya',
  role: 'Ketua Aterkia (Captain)',
  photo: '/images/team/president/muhammad-bintang-tri-surya.webp',
};

const SECRETARY_TREASURER = [
  { name: 'Sekretaris', role: 'Sekretaris Tim', photo: '/assets/profile.png' },
  { name: 'Feby', role: 'Bendahara Tim', photo: '/images/team/auv/feby-finance-clean.webp' }
];

const OFFICIAL_LEAD = {
  name: 'Ketua Official',
  role: 'Head of Operations & Media',
  photo: '/assets/profile.png',
  subteams: ['Media Team', 'Sponsorship Team']
};

const DIVISIONS = [
  {
    name: 'ASV Division',
    lead: 'Ketua ASV',
    subdivisions: [
      { name: 'Mekanik ASV', lead: 'Ketua Mekanik ASV', members: ['Anggota 1', 'Anggota 2'] },
      { name: 'Elkapro ASV', lead: 'Ketua Elkapro ASV', members: ['Anggota 1', 'Anggota 2'] }
    ]
  },
  {
    name: 'AUV Division',
    lead: 'Ketua AUV',
    subdivisions: [
      { name: 'Mekanik AUV', lead: 'Ketua Mekanik AUV', members: ['Anggota 1', 'Anggota 2'] },
      { name: 'Elkapro AUV', lead: 'Ketua Elkapro AUV', members: ['Anggota 1', 'Anggota 2'] }
    ]
  }
];

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#060d1a] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">The Vessel & Crew</span>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight">
            Aterkia <span className="gradient-text">Command Structure</span>
          </h1>
          <p className="text-sky-200/60 max-w-xl mx-auto text-sm sm:text-base">
            Floating hierarchy of our autonomous maritime robotics fleet.
          </p>
        </div>

        {/* 1. THE CAPTAIN (Ketua Aterkia) */}
        <div className="flex flex-col items-center">
          <div className="relative group p-1 rounded-3xl bg-gradient-to-b from-sky-400/30 to-transparent border border-sky-400/20 backdrop-blur-md">
            <div className="bg-[#0a1628]/80 rounded-2xl p-6 flex flex-col items-center text-center w-72 sm:w-80 shadow-2xl">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-sky-400/40 p-1 mb-4">
                <ImageWithFallback
                  src={PRESIDENT.photo}
                  alt={PRESIDENT.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">{PRESIDENT.role}</span>
              <h3 className="text-lg font-bold text-white leading-snug">{PRESIDENT.name}</h3>
            </div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="w-px h-12 bg-gradient-to-b from-sky-400/40 to-sky-400/10 mx-auto" />

        {/* 2. CORE STAFF (Sekretaris, Bendahara, Official) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {SECRETARY_TREASURER.map((staff, idx) => (
            <div key={idx} className="bg-sky-950/20 border border-sky-500/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-sky-400/30 shrink-0">
                <ImageWithFallback src={staff.photo} alt={staff.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{staff.name}</h4>
                <p className="text-xs text-sky-300/70">{staff.role}</p>
              </div>
            </div>
          ))}

          {/* Official Lead */}
          <div className="bg-sky-950/20 border border-sky-500/10 rounded-2xl p-5 flex flex-col justify-center">
            <h4 className="text-sm font-bold text-white">{OFFICIAL_LEAD.name}</h4>
            <p className="text-xs text-sky-300/70 mb-2">{OFFICIAL_LEAD.role}</p>
            <div className="flex gap-2">
              {OFFICIAL_LEAD.subteams.map((sub, i) => (
                <span key={i} className="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="w-px h-12 bg-gradient-to-b from-sky-400/40 to-sky-400/10 mx-auto" />

        {/* 3. TECHNICAL DIVISIONS (ASV & AUV) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DIVISIONS.map((div, i) => (
            <div key={i} className="bg-[#0a1628]/60 border border-sky-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-sky-500/10 pb-4 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold uppercase text-sky-400 tracking-wider">Division</span>
                  <h3 className="text-2xl font-black font-display text-white">{div.name}</h3>
                </div>
                <span className="text-xs px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-300 rounded-full font-semibold">
                  {div.lead}
                </span>
              </div>

              {/* Subdivisions: Mekanik & Elkapro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {div.subdivisions.map((sub, j) => (
                  <div key={j} className="bg-sky-950/30 border border-sky-500/10 rounded-xl p-4 space-y-2">
                    <h5 className="font-bold text-sm text-white">{sub.name}</h5>
                    <p className="text-xs text-sky-300/80 font-medium">{sub.lead}</p>
                    <div className="pt-2 border-t border-sky-500/10">
                      <span className="text-[10px] text-sky-200/50 uppercase tracking-wider block mb-1">Crew</span>
                      <ul className="text-xs text-sky-200/70 space-y-0.5">
                        {sub.members.map((m, k) => (
                          <li key={k} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-sky-400" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
