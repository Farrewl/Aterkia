import React from 'react';
import { aboutData } from '../data/aboutData';
import { useTranslation } from '../i18n';

export default function AboutRoadmap() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-4 bg-[#060D17] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black font-display mb-16">{t('about.futureRoadmap')}</h2>

        <div className="space-y-6 max-w-3xl">
          {(aboutData.roadmap || []).map((item, i) => (
            <div key={i} className="border border-dashed border-white/20 rounded-2xl p-6 bg-white/[0.01] flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500 font-mono">{item.year}</span>
                <h3 className="text-lg font-bold mt-1">{item.goal}</h3>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                item.status === 'Achieved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
