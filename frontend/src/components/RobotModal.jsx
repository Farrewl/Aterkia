import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Ship, Waves, Award, Check } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const statusColors = {
  Active: 'bg-emerald-500/90 text-white',
  Legacy: 'bg-amber-500/90 text-white',
  'In Development': 'bg-sky-500/90 text-white',
};

const statusDots = {
  Active: 'bg-emerald-400',
  Legacy: 'bg-amber-400',
  'In Development': 'bg-sky-400',
};

export default function RobotModal({ robot, onClose }) {
  const navigate = useNavigate();
  if (!robot) return null;
  const isAUV = robot.category.includes('AUV');

  const handleDetail = () => {
    onClose();
    navigate(`/robots?robotId=${robot.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-[#0a1628]/95 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden my-8 backdrop-blur-xl" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAUV ? 'bg-blue-500/15 text-blue-400' : 'bg-sky-500/15 text-sky-400'}`}>
              {isAUV ? <Waves className="w-5 h-5" /> : <Ship className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">{robot.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs text-white/35">{robot.year}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${statusColors[robot.status]}`}>
                  <span className={`inline-block w-1 h-1 rounded-full mr-1 ${statusDots[robot.status]}`} />
                  {robot.status}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-white/8 h-64 sm:h-72 w-full bg-white/[0.03]">
            <ImageWithFallback src={robot.image} alt={robot.name} name={robot.name} category={robot.category} type="robot" className="w-full h-full object-cover" containerClassName="w-full h-full" />
          </div>

          {/* Snippet */}
          <p className="text-sky-300/60 text-sm font-medium">{robot.snippet}</p>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-sky-400/70 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-white/50 text-sm leading-relaxed">{robot.description}</p>
          </div>

          {/* Specs grid */}
          <div>
            <h4 className="text-xs font-bold text-sky-400/70 uppercase tracking-wider mb-3">Specifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {Object.entries(robot.specs).map(([k, v]) => (
                <div key={k} className="bg-white/[0.04] p-3 rounded-xl border border-white/6">
                  <span className="text-white/30 uppercase text-[10px] block mb-0.5">{k}</span>
                  <span className="text-white/70 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {robot.achievements && robot.achievements.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold text-amber-400/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Achievements
              </h4>
              <ul className="space-y-1.5">
                {robot.achievements.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                    <Check className="w-3.5 h-3.5 text-sky-400/60 shrink-0" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/8 flex gap-3">
          <button
            onClick={handleDetail}
            className="flex-1 py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-sky-500/20"
          >
            View on Robots Page
          </button>
          <button onClick={onClose} className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm font-semibold transition-colors border border-white/8">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
