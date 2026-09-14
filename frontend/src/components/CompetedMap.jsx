import React, { useState, useEffect } from 'react';
import { aboutData } from '../data/aboutData';

function MapFallback({ comp }) {
  if (!comp || !comp.coords) {
    return (
      <div className="w-full h-[350px] flex flex-col items-center justify-center bg-[#0a192f] rounded-2xl border border-white/5">
        <p className="text-sm text-white/40 font-mono">No location data</p>
      </div>
    );
  }
  return (
    <div className="w-full h-[350px] flex flex-col items-center justify-center bg-[#0a192f] rounded-2xl border border-white/5">
      <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-400">
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" />
        </svg>
      </div>
      <p className="text-sm text-sky-400 font-mono">{comp.location}</p>
      <p className="text-xs text-white/40 mt-1">{comp.coords[1].toFixed(2)}°, {comp.coords[0].toFixed(2)}°</p>
    </div>
  );
}

class MapErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <MapFallback comp={this.props.comp} />;
    return this.props.children;
  }
}

function LazyMap({ comp }) {
  const [MapComponent, setMapComponent] = useState(null);

  useEffect(() => {
    let mounted = true;
    import('react-simple-maps').then((mod) => {
      if (mounted) setMapComponent(() => mod);
    }).catch(() => {
      if (mounted) setMapComponent(null);
    });
    return () => { mounted = false; };
  }, []);

  if (!MapComponent) return <MapFallback comp={comp} />;

  const { ComposableMap, Geographies, Geography, Marker } = MapComponent;

  return (
    <ComposableMap projectionConfig={{ scale: 140 }}>
      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#1e293b" stroke="#0f172a" strokeWidth={0.5} />
          ))
        }
      </Geographies>
      {comp && comp.coords && (
        <Marker coordinates={comp.coords}>
          <circle r={6} fill="#38bdf8" />
          <circle r={14} fill="#38bdf8" opacity={0.4} className="animate-ping" />
        </Marker>
      )}
    </ComposableMap>
  );
}

export default function CompetedMap() {
  const [activeComp, setActiveComp] = useState(() => aboutData.competitions?.[0] || null);

  return (
    <section className="py-24 px-4 bg-[#060D17] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black font-display mb-12">Where We've Competed</h2>
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-gray-400 text-sm font-mono mb-6">GLOBAL EXPEDITIONS & ACHIEVEMENTS</p>
            {(aboutData.competitions || []).map((comp, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setActiveComp(comp)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                  activeComp?.name === comp.name ? 'border-sky-500 bg-sky-500/10' : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                }`}
              >
                <div>
                  <h3 className="font-bold text-lg text-white">{comp.name}</h3>
                  <p className="text-sm text-gray-400">{comp.location} • {comp.year}</p>
                  {comp.description && (
                    <p className="text-xs text-white/50 mt-1 max-w-xs">{comp.description}</p>
                  )}
                </div>
                <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs px-3 py-1 rounded-full font-bold self-start mt-1">
                  {comp.result}
                </span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 border border-white/10 rounded-3xl p-6 bg-[#081424] backdrop-blur relative overflow-hidden flex flex-col items-center">
            <div className="w-full h-[350px] flex items-center justify-center">
              <MapErrorBoundary comp={activeComp}>
                <LazyMap comp={activeComp} />
              </MapErrorBoundary>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">{activeComp.location}</span>
              <h4 className="text-xl font-bold mt-1 text-white">{activeComp.name} ({activeComp.year})</h4>
              <p className="text-sm text-gray-400 mt-0.5">Outcome: <span className="text-white font-bold">{activeComp.result}</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
