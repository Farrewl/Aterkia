import React, { lazy, Suspense } from 'react';

// Lazy-load leaflet so the main bundle stays small (same pattern as DashboardPage).
const LeafletMap = lazy(() =>
  import('./SecretariatMapInner').then((m) => ({ default: m.LeafletMap }))
);

export default function SecretariatMap({ coords, zoom = 15 }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-200 relative">
      <Suspense
        fallback={
          <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-xs text-slate-400">
            Loading map...
          </div>
        }
      >
        <LeafletMap coords={coords} zoom={zoom} />
      </Suspense>
    </div>
  );
}