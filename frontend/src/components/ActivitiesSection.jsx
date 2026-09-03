import React from 'react';
import { Anchor, Waves, Cpu, FlaskConical, Activity, Users2, Camera } from 'lucide-react';
import { useTranslation } from '../i18n';

const ICONS = [
  Anchor,
  Cpu,
  Waves,
  Activity,
  FlaskConical,
  Users2,
];

export default function ActivitiesSection() {
  const { t } = useTranslation();
  const activities = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`activities.items.${i}.title`),
    description: t(`activities.items.${i}.desc`),
    icon: ICONS[i],
    photos: [],
  }));

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#060d1a] via-olympic-950 to-[#060d1a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[25%] right-[8%] w-64 h-64 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 reveal">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
            <Activity className="w-4 h-4" />
            {t('activities.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            {t('activities.title')}{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">{t('activities.titleGradient')}</span>
          </h2>
          <p className="text-white/40 text-sm font-light mt-3">
            {t('activities.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((item, idx) => {
            const Icon = item.icon;
            const photos = (item.photos || []).slice(0, 3);
            return (
              <div key={item.title} className="reveal-zoom" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="log-card group relative h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 hover:border-sky-500/25 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                  {photos.length > 0 && (
                    <div className="photo-stack relative h-44 mb-6">
                      {photos.map((src, pIdx) => (
                        <div
                          key={pIdx}
                          className={`photo-layer ${pIdx === photos.length - 1 ? 'photo-layer-front' : ''}`}
                          style={{ zIndex: pIdx + 1 }}
                        >
                          <img src={src} alt="" loading="lazy" />
                        </div>
                      ))}
                      <span className="photo-sonar" aria-hidden="true" />
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>

                  {photos.length === 0 && (
                    <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-white/25">
                      <Camera className="w-3.5 h-3.5" /> {t('activities.photosSoon')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
