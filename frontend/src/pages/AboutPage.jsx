import React from 'react';
import { aboutData } from '../data/aboutData';
import { Trophy, Target, Award, Compass, Zap, BookOpen, TestTube, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>

      {/* Hero Header — soft gradient */}
      <section className="relative py-20 bg-gradient-to-br from-olympic-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-olympic-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-olympic-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-4">
              <Target className="w-4 h-4" />
              Profil & Identitas Tim
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-olympic-900 tracking-tight leading-tight mb-5">
              {aboutData.title}
            </h1>
            <p className="text-xl text-olympic-600 font-medium mb-4">
              {aboutData.subtitle}
            </p>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              {aboutData.intro}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visi & Misi — zigzag layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Visi Card — gradient border style */}
            <div className="lg:col-span-5">
              <div className="card-gradient-border">
                <div className="relative bg-white rounded-[1.25rem] p-8 sm:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-olympic-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-olympic-500/20">
                    <Target className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold text-olympic-500 uppercase tracking-widest block mb-2">
                    Visi Kami
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-olympic-900 mb-5">
                    Visi Aterkia
                  </h2>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light italic border-l-4 border-olympic-200 pl-5">
                    "{aboutData.vision}"
                  </p>

                  <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
                    Fakultas Teknik • Universitas Diponegoro
                  </div>
                </div>
              </div>
            </div>

            {/* Misi Card — color bar style */}
            <div className="lg:col-span-7">
              <div className="card-color-bar">
                <div className="p-8 sm:p-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                    <Compass className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">
                    Langkah Nyata
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-olympic-900 mb-8">
                    Misi Aterkia
                  </h2>

                  <div className="space-y-5">
                    {aboutData.missions.map((mission, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="w-8 h-8 rounded-xl bg-olympic-50 text-olympic-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-olympic-500 group-hover:text-white transition-colors duration-300">
                          {idx + 1}
                        </div>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light pt-1">
                          {mission}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Prestasi & Capaian — staggered grid */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-4">
              <Trophy className="w-4 h-4" />
              Rekam Jejak Kompetisi
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-olympic-900 tracking-tight leading-tight">
              Prestasi yang Telah{' '}
              <span className="gradient-text">Dicapai</span>
            </h2>
            <p className="text-slate-500 text-base mt-3 font-light">
              Deretan penghargaan dan pencapaian membanggakan oleh Tim Aterkia di kompetisi nasional & internasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutData.achievements.map((item, idx) => (
              <div
                key={idx}
                className={`group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-olympic-100/60 transition-all duration-500 hover:-translate-y-2 ${
                  idx % 2 === 1 ? 'md:translate-y-6' : ''
                }`}
              >
                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-3xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-olympic-50 to-olympic-100 rotate-45" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-200">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black text-olympic-900 font-display">{item.year}</span>
                    </div>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-xl bg-olympic-50 border border-olympic-100 text-olympic-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-olympic-900 mb-3 leading-snug group-hover:text-olympic-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nilai & Budaya — horizontal scroll cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-4">
              <Zap className="w-4 h-4" />
              Filosofi Kerja
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-olympic-900 tracking-tight leading-tight">
              Prinsip & Nilai{' '}
              <span className="gradient-text">Riset</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.coreValues.map((val, idx) => {
              const icons = [BookOpen, TestTube, ArrowRight];
              const colors = ['from-olympic-500 to-blue-500', 'from-olympic-600 to-olympic-400', 'from-blue-500 to-olympic-500'];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-olympic-100/60 transition-all duration-500 hover:-translate-y-3 hover-tilt"
                >
                  {/* Number + icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-black font-display text-olympic-100 group-hover:text-olympic-200 transition-colors">
                      0{idx + 1}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[idx]} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-olympic-900 mb-3 group-hover:text-olympic-600 transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
