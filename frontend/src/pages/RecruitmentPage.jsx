import React from 'react';
import { useTranslation } from '../i18n';
import { Users, ArrowRight } from 'lucide-react';

export default function RecruitmentPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#060d1a] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-sky-500/10 border border-sky-500/25 text-sky-400 mb-8">
          <Users className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-3">Recruitment</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight">
          Join <span className="gradient-text">Aterkia</span>
        </h1>
        <p className="text-sky-200/60 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
          {t('hero.recruitment.desc')}
        </p>

        <div className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-sm font-bold shadow-lg shadow-sky-500/25">
          Open Recruitment Coming Soon
          <ArrowRight className="w-4 h-4" />
        </div>

        <p className="mt-6 text-xs text-sky-200/40">
          Formulir pendaftaran akan segera tersedia di halaman ini.
        </p>
      </div>
    </div>
  );
}