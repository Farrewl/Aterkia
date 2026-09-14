import React from 'react';
import { Anchor, Waves, Users, ShieldCheck, Camera, Handshake, Cpu } from 'lucide-react';
import { useTranslation } from '../i18n';
import ImageWithFallback from './ImageWithFallback';

const PRESIDENT = {
  name: 'Muhammad Bintang Tri Surya',
  role: 'Ketua Aterkia',
  photo: '/images/team/president/muhammad-bintang-tri-surya.webp',
};

const STAFF = [
  { name: 'Sekretaris', role: 'Sekretaris Tim', photo: '/assets/profile.png', icon: ShieldCheck },
  { name: 'Bendahara', role: 'Bendahara Tim', photo: '/images/team/auv/feby-finance-clean.webp', icon: ShieldCheck },
];

const OFFICIAL = {
  name: 'Ketua Official',
  role: 'Ketua Official (Media & Sponsorship)',
  subteams: [
    { name: 'Media', icon: Camera },
    { name: 'Sponsorship', icon: Handshake },
  ],
};

const DIVISIONS = [
  {
    key: 'ASV',
    name: 'ASV',
    fullName: 'Autonomous Surface Vehicle',
    icon: Anchor,
    lead: 'Ketua ASV',
    leadPhoto: '/assets/profile.png',
    subs: [
      { name: 'Mekanik', lead: 'Ketua Mekanik ASV', icon: Cpu },
      { name: 'Elkapro', lead: 'Ketua Elkapro ASV', icon: Cpu },
    ],
  },
  {
    key: 'AUV',
    name: 'AUV',
    fullName: 'Autonomous Underwater Vehicle',
    icon: Waves,
    lead: 'Ketua AUV',
    leadPhoto: '/images/team/auv/feby-finance-clean.webp',
    subs: [
      { name: 'Mekanik', lead: 'Ketua Mekanik AUV', icon: Cpu },
      { name: 'Elkapro', lead: 'Ketua Elkapro AUV', icon: Cpu },
    ],
  },
];

export default function Divisions() {
  const { t } = useTranslation();

  const RolePill = ({ label }) => (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[10px] font-semibold uppercase tracking-wider text-sky-300">
      {label}
    </span>
  );

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#060d1a] to-olympic-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[40%] left-[10%] w-72 h-72 bg-sky-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 reveal">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
            <Users className="w-4 h-4" />
            {t('divisions.teamStructure')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            {t('divisions.title')}{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">{t('divisions.titleGradient')}</span>
          </h2>
        </div>

        {/* ── Captain / Ketua Aterkia ── */}
        <div className="flex flex-col items-center mb-4">
          <div className="p-1 rounded-3xl bg-gradient-to-b from-sky-400/30 to-transparent">
            <div className="bg-[#0a1628]/80 border border-sky-400/20 rounded-2xl px-8 py-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-400/40 shrink-0">
                <ImageWithFallback src={PRESIDENT.photo} alt={PRESIDENT.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <RolePill label={PRESIDENT.role} />
                <h3 className="text-lg font-bold text-white mt-1">{PRESIDENT.name}</h3>
              </div>
            </div>
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-sky-400/40 to-sky-400/10" />
        </div>

        {/* ── Core Staff + Official Lead ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 max-w-4xl mx-auto">
          {STAFF.map((s, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-3 hover:bg-white/[0.06] transition-colors">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-sky-400/30 shrink-0">
                <ImageWithFallback src={s.photo} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs text-sky-300/80 font-semibold">{s.role}</p>
                <h4 className="text-sm font-bold text-white">{s.name}</h4>
              </div>
            </div>
          ))}

          {/* Official Lead */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 flex flex-col justify-center">
            <p className="text-xs text-sky-300/80 font-semibold">{OFFICIAL.role}</p>
            <h4 className="text-sm font-bold text-white mb-2">{OFFICIAL.name}</h4>
            <div className="flex flex-wrap gap-2">
              {OFFICIAL.subteams.map((sub, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-[10px] text-sky-300 font-semibold">
                  <sub.icon className="w-3 h-3" />
                  {sub.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-px h-10 bg-gradient-to-b from-sky-400/40 to-sky-400/10 mx-auto mb-6" />

        {/* ── Technical Divisions (ASV & AUV) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIVISIONS.map((div) => {
            const DivIcon = div.icon;
            return (
              <div key={div.key} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-6 sm:p-7 hover:bg-white/[0.06] hover:border-sky-500/25 transition-all duration-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center shrink-0">
                    <DivIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">{div.name}</h3>
                    <p className="text-xs text-white/40">{div.fullName}</p>
                  </div>
                  <div className="ml-auto">
                    <RolePill label={div.lead} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {div.subs.map((sub, i) => {
                    const SubIcon = sub.icon;
                    return (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <SubIcon className="w-4 h-4 text-cyan-400/80" />
                          <span className="text-xs font-bold uppercase tracking-wider text-white/70">{sub.name}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider block mb-1">{t('divisions.chair')}</span>
                        <span className="text-xs text-sky-300/80 font-medium">{sub.lead}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}