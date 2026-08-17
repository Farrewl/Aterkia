import React from 'react';
import { X, Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

export default function NewsDrawer({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-navy-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-navy-950">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            {article.category}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Tutup berita"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          <div className="rounded-2xl overflow-hidden border border-slate-700 h-60 sm:h-72 w-full mb-6 bg-slate-950">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              type="news"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>{article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 leading-snug">
            {article.title}
          </h2>

          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-light">
            {article.content}
          </div>

          {article.tags && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-navy-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
