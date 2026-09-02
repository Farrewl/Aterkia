import React from 'react';
import { X, Ship, Waves, Award, Check, Box } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import GLBViewer from './GLBViewer';

const statusColors = {
  Active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Legacy: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'In Development': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
};

const categoryAccent = {
  ASV: { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
  AUV: { text: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20' },
};

export default function RobotModal({ robot, onClose }) {
  if (!robot) return null;
  const isAUV = robot.category.includes('AUV');
  const accent = categoryAccent[robot.category] || categoryAccent.ASV;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-[#0f1729] rounded-3xl shadow-2xl shadow-black/40 border border-white/[0.08] overflow-hidden my-8" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent.bg} border ${accent.border}`}>
              {isAUV ? <Waves className={`w-5 h-5 ${accent.text}`} /> : <Ship className={`w-5 h-5 ${accent.text}`} />}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">{robot.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs text-white/30 font-mono">{robot.year}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${statusColors[robot.status]}`}>
                  {robot.status}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Media: 3D model bila tersedia, fallback ke gambar */}
          <div className="rounded-xl overflow-hidden border border-white/[0.06] w-full bg-[#111827]">
            {robot.model3D ? (
              <div className="w-full aspect-[4/3]">
                <GLBViewer src={robot.model3D} alt={`${robot.name} 3D model`} height="100%" />
              </div>
            ) : (
              <ImageWithFallback src={robot.image} alt={robot.name} name={robot.name} category={robot.category} type="robot" className="w-full h-auto object-contain max-h-[50vh] p-4" containerClassName="w-full" />
            )}
          </div>
          {/* 3D placeholder pesan */}
          {robot.model3D && (
            <div className="flex items-center gap-2 text-[11px] text-sky-300/60">
              <Box className="w-3.5 h-3.5" /> Interaktif 3D — seret untuk memutar, scroll untuk zoom
            </div>
          )}

          {/* Snippet */}
          <p className="text-sky-300/60 text-sm font-medium">{robot.snippet}</p>

          {/* Story — extra info utama */}
          <div>
            <h4 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2">The Story</h4>
            <p className="text-white/50 text-sm leading-relaxed">{robot.description}</p>
          </div>

          {/* Full specs */}
          <div>
            <h4 className="text-xs font-bold text-white/30 uppercase tracking-wider mb-3">Full Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {Object.entries(robot.specs).map(([k, v]) => (
                <div key={k} className="bg-white/[0.04] p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-white/30 uppercase text-[10px] block mb-0.5">{k}</span>
                  <span className="text-white/80 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {robot.achievements && robot.achievements.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Achievements
              </h4>
              <ul className="space-y-1.5">
                {robot.achievements.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
