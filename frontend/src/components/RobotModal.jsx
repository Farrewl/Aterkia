import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Ship, Waves, Award, Check } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function RobotModal({ robot, onClose }) {
  const navigate = useNavigate();
  if (!robot) return null;
  const isAUV = robot.category.includes('AUV');

  const handleSelengkapnya = () => {
    onClose();
    navigate(`/robots?robotId=${robot.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/30 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAUV ? 'bg-blue-50 text-blue-600' : 'bg-sky-50 text-sky-600'}`}>
              {isAUV ? <Waves className="w-5 h-5" /> : <Ship className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-800">{robot.name}</h3>
              <p className="text-xs text-slate-400">{robot.year}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-5">
          <div className="rounded-xl overflow-hidden border border-slate-200 h-64 sm:h-72 w-full bg-slate-50">
            <ImageWithFallback src={robot.image} alt={robot.name} name={robot.name} category={robot.category} type="robot" className="w-full h-full object-cover" containerClassName="w-full h-full" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-olympic-500 uppercase tracking-wider mb-1">Deskripsi</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{robot.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-olympic-500 uppercase tracking-wider mb-3">Spesifikasi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {Object.entries(robot.specs).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 uppercase text-[10px] block mb-0.5">{k}</span>
                  <span className="text-slate-700 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {robot.achievements && robot.achievements.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Prestasi
              </h4>
              <ul className="space-y-1.5">
                {robot.achievements.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-olympic-500 shrink-0" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={handleSelengkapnya}
            className="flex-1 py-3 rounded-xl bg-olympic-500 hover:bg-olympic-600 text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            Selengkapnya di Robots Page
          </button>
          <button onClick={onClose} className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
