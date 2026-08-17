import React, { useState } from 'react';
import { robotsData, robotCategories } from '../data/robotsData';
import ImageWithFallback from '../components/ImageWithFallback';
import RobotModal from '../components/RobotModal';
import { ChevronRight, Bot, Anchor, Waves } from 'lucide-react';

export default function RobotsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedRobot, setSelectedRobot] = useState(null);

  const filteredRobots = activeCategory === 'Semua'
    ? robotsData
    : robotsData.filter(r => r.category === activeCategory);

  return (
    <div>

      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-br from-olympic-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-olympic-100/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-olympic-500 uppercase tracking-widest mb-4">
                <Bot className="w-4 h-4" />
                Arsip Wahana Robot
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-olympic-900 tracking-tight leading-tight">
                Robot Aterkia dari{' '}
                <span className="gradient-text">Tahun ke Tahun</span>
              </h1>
              <p className="text-slate-500 text-base sm:text-lg mt-4 font-light max-w-xl">
                Koleksi lengkap wahana kapal permukaan (ASV) dan robot selam (AUV) yang pernah dirancang oleh tim Aterkia.
              </p>
            </div>

            {/* Filter Tabs — pill style */}
            <div className="flex items-center gap-2 bg-white border border-slate-100 p-1.5 rounded-2xl shadow-md shadow-slate-100/50 self-start md:self-auto">
              {robotCategories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-olympic-500 text-white shadow-md shadow-olympic-500/25'
                        : 'text-slate-500 hover:text-olympic-600 hover:bg-olympic-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Robots Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredRobots.map((robot, idx) => {
              const isAUV = robot.category === 'AUV';
              return (
                <div
                  key={robot.id}
                  className={`group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:shadow-olympic-100/80 transition-all duration-500 hover:-translate-y-3 ${
                    idx % 2 === 1 ? 'md:translate-y-8' : ''
                  }`}
                >
                  {/* Top color bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${isAUV ? 'bg-gradient-to-r from-olympic-500 via-blue-400 to-olympic-300' : 'bg-gradient-to-r from-olympic-700 via-olympic-500 to-olympic-300'}`} />

                  {/* Image */}
                  <div className="relative h-64 w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={robot.image}
                      alt={robot.name}
                      name={robot.name}
                      category={robot.category}
                      type="robot"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 flex gap-2">
                      <span className={`flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-xl uppercase shadow-lg backdrop-blur-sm ${
                        isAUV ? 'bg-olympic-500/90 text-white' : 'bg-olympic-600/90 text-white'
                      }`}>
                        {isAUV ? <Waves className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                        {robot.category}
                      </span>
                      <span className="text-[11px] font-bold px-3 py-2 rounded-xl bg-white/90 text-olympic-600 shadow-lg backdrop-blur-sm">
                        {robot.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 sm:p-8">
                    <span className="text-xs font-semibold text-olympic-500 block mb-2">
                      {robot.tagline}
                    </span>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-olympic-900 mb-3 group-hover:text-olympic-600 transition-colors">
                      {robot.name}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed font-light mb-6">
                      {robot.description}
                    </p>

                    {/* Specs — horizontal pills */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {Object.entries(robot.specs).map(([k, v]) => (
                        <span key={k} className="text-xs bg-slate-50 border border-slate-100 text-slate-600 px-3 py-2 rounded-xl hover:border-olympic-200 hover:bg-olympic-50/50 transition-colors">
                          <span className="text-slate-400 font-medium">{k}:</span>{' '}
                          <span className="font-semibold">{v}</span>
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedRobot(robot)}
                      className="w-full py-3.5 rounded-xl bg-olympic-50 hover:bg-olympic-500 hover:text-white text-olympic-600 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
                    >
                      <span>Lihat Detail Spesifikasi</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedRobot && (
        <RobotModal robot={selectedRobot} onClose={() => setSelectedRobot(null)} />
      )}

    </div>
  );
}
