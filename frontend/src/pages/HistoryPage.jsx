import React from 'react';
import { historyData } from '../data/historyData';
import { Calendar, CheckCircle2, Clock, ArrowDown } from 'lucide-react';

export default function HistoryPage() {
  const yearColors = [
    { bg: 'bg-olympic-500', shadow: 'shadow-olympic-500/30' },
    { bg: 'bg-blue-500', shadow: 'shadow-blue-500/30' },
    { bg: 'bg-olympic-600', shadow: 'shadow-olympic-600/30' },
    { bg: 'bg-olympic-400', shadow: 'shadow-olympic-400/30' },
  ];

  return (
    <div>

      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-br from-olympic-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-olympic-100/40 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-olympic-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-4">
              <Clock className="w-4 h-4" />
              Timeline & Milestones
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-olympic-900 tracking-tight leading-tight mb-5">
              Perjalanan{' '}
              <span className="gradient-text">Aterkia</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              Rekam jejak perkembangan tim Aterkia sejak awal dibentuk oleh mahasiswa teknik Universitas Diponegoro hingga pencapaian riset maritim hari ini.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">

            {/* Center line — desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-olympic-200 via-olympic-300 to-olympic-100 -translate-x-1/2" />
            {/* Left line — mobile */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-olympic-200 via-olympic-300 to-olympic-100" />

            <div className="space-y-16">
              {historyData.map((item, idx) => {
                const color = yearColors[idx % yearColors.length];
                const isLeft = idx % 2 === 0;

                return (
                  <div key={idx} className={`relative flex items-start gap-8 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    {/* Content Card */}
                    <div className={`flex-1 md:w-1/2 ${isLeft ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                      <div className={`group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-100 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:shadow-olympic-100/60 transition-all duration-500 hover:-translate-y-1 ${
                        isLeft ? 'md:mr-0' : 'md:ml-0'
                      }`}>
                        {/* Year badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-olympic-50 border border-olympic-100 mb-4 ${isLeft ? 'md:ml-auto' : ''}`}>
                          <Calendar className="w-3.5 h-3.5 text-olympic-500" />
                          <span className="text-sm font-black text-olympic-600 font-display">{item.year}</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold font-display text-olympic-900 mb-3 leading-snug group-hover:text-olympic-600 transition-colors">
                          {item.title}
                        </h2>

                        <p className="text-slate-500 text-sm leading-relaxed font-light mb-6">
                          {item.description}
                        </p>

                        {item.milestones && item.milestones.length > 0 && (
                          <div className="pt-5 border-t border-slate-100 space-y-2.5">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              Capaian Utama:
                            </span>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${isLeft ? 'md:text-left' : ''}`}>
                              {item.milestones.map((m, mIdx) => (
                                <div key={mIdx} className={`flex items-start gap-2 text-xs text-slate-600 ${isLeft ? 'md:justify-end' : ''}`}>
                                  {isLeft && <span className="hidden md:inline">{m}</span>}
                                  <CheckCircle2 className={`w-4 h-4 text-olympic-400 shrink-0 mt-0.5 ${isLeft ? 'md:order-2' : ''}`} />
                                  {(!isLeft || typeof window !== 'undefined') && <span className={isLeft ? 'hidden md:inline md:order-1' : ''}>{m}</span>}
                                  {isLeft && <span className="md:hidden">{m}</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center dot — desktop */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-5 h-5 rounded-full ${color.bg} ${color.shadow} shadow-lg ring-4 ring-white flex items-center justify-center`}>
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Mobile dot */}
                    <div className="md:hidden absolute left-6 -translate-x-1/2 z-10">
                      <div className={`w-4 h-4 rounded-full ${color.bg} shadow-md ring-3 ring-white flex items-center justify-center`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Empty spacer for opposite side */}
                    <div className="hidden md:block flex-1 md:w-1/2" />
                  </div>
                );
              })}
            </div>

            {/* End dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 z-10">
              <div className="w-3 h-3 rounded-full bg-olympic-200 ring-4 ring-white" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
