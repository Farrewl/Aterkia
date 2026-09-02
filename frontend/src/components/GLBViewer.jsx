import { Box, Sparkles } from 'lucide-react';

// Slot 3D untuk robot. Jika `src` (file .glb) tersedia -> render model interaktif.
// Jika belum ada -> tampilkan placeholder agar bobot visual tetap rapi.
export default function GLBViewer({ src, alt = '3D model', height = '100%', showPlaceholder = false }) {
  if (!src) {
    if (!showPlaceholder) return null;
    return (
      <div className="flex flex-col items-center justify-center bg-slate-50 p-6 text-center" style={{ width: '100%', height }}>
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3 text-brand-600">
          <Box className="w-7 h-7" />
        </div>
        <span className="font-display font-bold text-sm text-slate-700">3D Model</span>
        <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Segera hadir
        </span>
      </div>
    );
  }

  return (
    <model-viewer
      src={src}
      alt={alt}
      camera-controls
      auto-rotate
      auto-rotate-delay="0"
      rotation-per-second="12deg"
      shadow-intensity="1"
      exposure="1.1"
      style={{ width: '100%', height, backgroundColor: '#0a0f1e' }}
    />
  );
}
