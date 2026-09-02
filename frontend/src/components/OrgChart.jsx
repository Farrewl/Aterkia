import React from 'react';
import { divisionTeams } from '../data/teamData';
import { Anchor, Waves, Users, Cpu, Crown, ArrowDown } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const PRESIDENT = {
  fullName: 'Muhammad Bintang Tri Surya',
  role: 'President',
  photo: '/images/team/president/muhammad-bintang-tri-surya.webp',
  division: 'Leadership',
};

const LEVEL_ACCENT = {
  president: 'from-amber-400/20 to-orange-400/10 border-amber-400/30 text-amber-300',
  chair: 'from-sky-400/20 to-cyan-400/10 border-sky-400/30 text-sky-300',
  sub: 'from-cyan-400/15 to-teal-400/10 border-cyan-400/25 text-cyan-300',
  member: 'from-white/[0.06] to-white/[0.02] border-white/10 text-white/80',
};

function PersonNode({ person, level, fallbackShape }) {
  const roleKey = person.role || '';
  const isAUV = (person.division || '').includes('AUV');
  const isNonTech = (person.division || '').includes('NONTEKNIS') || !person.division;
  const icon = isAUV ? <Waves className={fallbackShape ? 'w-4 h-4' : 'w-5 h-5'} /> : isNonTech ? <Users className={fallbackShape ? 'w-4 h-4' : 'w-5 h-5'} /> : <Anchor className={fallbackShape ? 'w-4 h-4' : 'w-5 h-5'} />;

  return (
    <div
      className={`relative flex flex-col items-center text-center rounded-2xl border bg-gradient-to-b p-4 ${LEVEL_ACCENT[level]} transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className={`${fallbackShape ? 'w-8 h-8' : 'w-10 h-10'} rounded-full overflow-hidden bg-white/10 border border-white/15 mb-2 relative z-10`}>
        {person.photo && !person.photo.includes('placeholder') ? (
          <ImageWithFallback src={person.photo} alt={person.fullName} name={person.fullName} division={person.division} type="team" className="w-full h-full object-cover object-top" containerClassName="w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <strong className="leading-tight text-sm font-semibold">{person.fullName}</strong>
      <span className="text-[10px] opacity-80 mt-0.5 leading-tight">{person.role}</span>
    </div>
  );
}

function BranchLabel({ children }) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">
      <ArrowDown className="w-3 h-3" />
      {children}
    </div>
  );
}

export default function OrgChart() {
  const tech = [divisionTeams.ASV, divisionTeams.AUV].filter(Boolean);
  const nonTech = [divisionTeams.SECRETARY_TREASURER, divisionTeams.OFFICIAL].filter(Boolean);

  const DivisionBranch = ({ team }) => {
    const hasSubs = team.subdivisions && Object.keys(team.subdivisions).length > 0;
    return (
      <div className="flex flex-col items-center">
        <BranchLabel>{team.fullName || team.name}</BranchLabel>
        <div className="flex flex-col items-center gap-2 mb-3">
          {team.chair && <PersonNode person={team.chair} level="chair" />}
          {team.viceChair && <PersonNode person={team.viceChair} level="chair" fallbackShape />}
        </div>

        {hasSubs && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
            {Object.values(team.subdivisions).map((sub) => (
              <div key={sub.id} className="flex flex-col items-center">
                <BranchLabel>{sub.name} · {sub.fullName}</BranchLabel>
                {sub.leader && <PersonNode person={sub.leader} level="sub" fallbackShape />}
                <div className="grid grid-cols-1 gap-2 mt-3 w-full">
                  {team.members
                    .filter((m) => (sub.memberIds || []).includes(m.id))
                    .map((m) => <PersonNode key={m.id} person={m} level="member" fallbackShape />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasSubs && team.members && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
            {team.members.map((m) => <PersonNode key={m.id} person={m} level="member" fallbackShape />)}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative py-20 bg-[#060d1a] overflow-hidden" aria-labelledby="org-chart-title">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
            <Crown className="w-4 h-4" />
            Organization Chart
          </span>
          <h2 id="org-chart-title" className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Arsitektur{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Tim Aterkia</span>
          </h2>
          <p className="text-white/40 text-sm font-light mt-3">
            Struktur hierarki lengkap — dari ketua umum hingga setiap anggota beserta posisinya.
          </p>
        </div>

        {/* President node */}
        <div className="flex justify-center mb-8">
          <div className="w-56">
            <PersonNode person={PRESIDENT} level="president" />
          </div>
        </div>

        {/* Connector line */}
        <div className="flex justify-center mb-8">
          <div className="w-px h-8 bg-gradient-to-b from-amber-400/50 to-sky-400/30" />
        </div>

        {/* Technical + Non-technical branches */}
        <div className="space-y-12">
          <div>
            <BranchLabel>
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> Teknis — Engineering & Robotics</span>
            </BranchLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {tech.map((t) => t && <DivisionBranch key={t.id} team={t} />)}
            </div>
          </div>

          <div>
            <BranchLabel>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Non-teknis — Operations & Organization</span>
            </BranchLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {nonTech.map((t) => t && <DivisionBranch key={t.id} team={t} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
