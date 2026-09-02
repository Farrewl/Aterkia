import React from 'react';
import { divisionTeams } from '../data/teamData';
import { Anchor, Waves, Users, Cpu } from 'lucide-react';

const TECH = ['ASV', 'AUV'];
const SUB_ICONS = { MECHANICAL: Cpu, ELKAPRO: Cpu };

export default function Divisions() {
  const tech = TECH.map((key) => divisionTeams[key]);
  const nonTech = [
    divisionTeams.SECRETARY_TREASURER,
    divisionTeams.OFFICIAL,
  ].filter(Boolean);

  const Card = ({ team }) => {
    const icon = team.name === 'ASV' ? Anchor : team.name === 'AUV' ? Waves : Users;
    const hasSubs = team.subdivisions && Object.keys(team.subdivisions).length > 0;
    return (
      <div className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 sm:p-7 hover:bg-white/[0.06] hover:border-sky-500/25 transition-all duration-500 hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center shrink-0">
            <icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
              {team.name}
            </h3>
            <p className="text-xs text-white/40">{team.fullName}</p>
          </div>
        </div>

        <p className="text-white/50 text-sm leading-relaxed font-light mb-5">{team.tagline}</p>

        {hasSubs ? (
          <div className="space-y-4">
            {Object.values(team.subdivisions).map((sub) => {
              const SubIcon = SUB_ICONS[sub.id] || Cpu;
              return (
                <div key={sub.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <SubIcon className="w-4 h-4 text-cyan-400/80" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white/70">{sub.name}</span>
                  </div>
                  <p className="text-xs text-white/40 font-light">{sub.fullName}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Ketua</span>
                    <span className="text-xs text-sky-300/80 font-medium">
                      {sub.leader?.fullName ? sub.leader.fullName : 'TBD'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-white/40 font-light">
            {team.chair?.role || 'Koordinator'} · {team.members?.length || 0} anggota
          </p>
        )}
      </div>
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#060d1a] to-olympic-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[40%] left-[10%] w-72 h-72 bg-sky-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 reveal">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
            <Users className="w-4 h-4" />
            Team Structure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Our{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Divisions</span>
          </h2>
        </div>

        {/* Technical: ASV & AUV */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {tech.map((team) => team && <Card key={team.id} team={team} />)}
        </div>

        {/* Non-technical */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nonTech.map((team) => team && <Card key={team.id} team={team} />)}
        </div>
      </div>
    </section>
  );
}
