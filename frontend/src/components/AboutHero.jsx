import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../data/aboutData';
import { useTranslation } from '../i18n';

export default function AboutHero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-20 px-4 bg-[#060D17]">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-white text-5xl md:text-8xl font-black font-display tracking-tight">{t('about.weAre')}</h1>
          <h1 className="text-sky-400 text-6xl md:text-9xl font-black font-display tracking-tight">{aboutData.teamName}</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-block border border-white/20 p-4 rounded-lg mb-8">
          <p className="text-white font-bold text-xl md:text-2xl italic">"{aboutData.slogan || '...'}"</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-end">
          <p className="text-gray-400 max-w-lg text-lg leading-relaxed">{aboutData.heroDescription || ''}</p>
          
          <div className="grid grid-cols-2 gap-4">
            {(aboutData.stats || []).map((stat, i) => (
              <div key={i} className="border-t border-white/20 pt-2">
                <div className="text-gray-500 text-xs tracking-widest">{stat.label}</div>
                <div className="text-white font-bold text-lg">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
