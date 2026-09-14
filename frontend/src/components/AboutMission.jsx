import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../data/aboutData';
import { Target, Compass } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function AboutMission() {
  const { t } = useTranslation();
  return (
    <section className="relative py-28 bg-[#060D17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl flex flex-col justify-between shadow-2xl hover:border-sky-500/30 transition-colors"
          >
            <div>
              <span className="text-xs font-mono tracking-[0.2em] text-sky-400 uppercase block mb-2">{t('about.visionTitle')}</span>
              <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-6">
                {t('about.visionSubtitle')}
              </h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light italic border-l-2 border-sky-500/40 pl-6">
                "{aboutData.vision || ''}"
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl flex flex-col justify-between shadow-2xl hover:border-blue-500/30 transition-colors"
          >
            <div>
              <span className="text-xs font-mono tracking-[0.2em] text-blue-400 uppercase block mb-2">{t('about.missionTitle')}</span>
              <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-8">
                {t('about.missionSubtitle')}
              </h3>
              <div className="space-y-5">
                {(aboutData.missions || []).map((mission, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                      {mission}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
