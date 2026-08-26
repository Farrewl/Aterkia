import React from 'react';
import { X, Ship, Waves, Award, Check } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const statusColors = {
  Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Legacy: 'bg-amber-100 text-amber-700 border-amber-200',
  'In Development': 'bg-sky-100 text-sky-700 border-sky-200',
};

export default function RobotModal({ robot, onClose }) {
  if (!robot) return null;
  const isAUV = robot.category.includes('AUV');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl shadow-black/15 border border-slate-100 overflow-hidden my-8" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAUV ? 'bg-teal-100 text-teal-600' : 'bg-sky-100 text-sky-600'}`}>
              {isAUV ? <Waves className="w-5 h-5" /> : <Ship className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-olympic-900">{robot.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-400">{robot.year}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${statusColors[robot.status]}`}>
                  {robot.status}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-slate-100 w-full bg-gradient-to-br from-slate-50 to-sky-50/30">
            <ImageWithFallback src={robot.image} alt={robot.name} name={robot.name} category={robot.category} type="robot" className="w-full h-auto object-contain max-h-[50vh] p-4" containerClassName="w-full" />
          </div>

          {/* Snippet */}
          <p className="text-sky-600/70 text-sm font-medium">{robot.snippet}</p>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{robot.description}</p>
          </div>

          {/* Specs grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {Object.entries(robot.specs).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 uppercase text-[10px] block mb-0.5">{k}</span>
                  <span className="text-olympic-800 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {robot.achievements && robot.achievements.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Achievements
              </h4>
              <ul className="space-y-1.5">
                {robot.achievements.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {a}
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
