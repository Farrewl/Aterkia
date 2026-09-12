import React from 'react';

export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-[#060d1a] text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Live Telemetry</span>
          <h1 className="text-4xl sm:text-5xl font-black font-display mt-2">
            System <span className="gradient-text">Monitoring</span>
          </h1>
          <p className="text-sky-200/60 mt-4 text-sm sm:text-base">
            Real-time status and sensor telemetry dashboard for Aterkia maritime robotics fleet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ASV Status Card */}
          <div className="bg-sky-950/30 border border-sky-500/20 rounded-2xl p-6 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-display text-white">ASV Fleet Status</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Standby / Ready
              </span>
            </div>
            <div className="space-y-4 text-sm text-sky-200/80">
              <div className="flex justify-between py-2 border-b border-sky-500/10">
                <span>Battery Level:</span>
                <span className="font-mono font-bold text-white">100% (12.6V)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-500/10">
                <span>GPS Signal:</span>
                <span className="font-mono font-bold text-emerald-400">Optimal (12 Sats)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-500/10">
                <span>Comms Link:</span>
                <span className="font-mono font-bold text-sky-400">Connected (5.8GHz)</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Autonomy Mode:</span>
                <span className="font-mono font-bold text-amber-400">MANUAL OVERRIDE</span>
              </div>
            </div>
          </div>

          {/* AUV Status Card */}
          <div className="bg-sky-950/30 border border-sky-500/20 rounded-2xl p-6 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-display text-white">AUV Dive Status</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Standby / Ready
              </span>
            </div>
            <div className="space-y-4 text-sm text-sky-200/80">
              <div className="flex justify-between py-2 border-b border-sky-500/10">
                <span>Internal Pressure:</span>
                <span className="font-mono font-bold text-white">1.01 atm (Safe)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-500/10">
                <span>Depth Sensor:</span>
                <span className="font-mono font-bold text-emerald-400">0.00 m (Surface)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sky-500/10">
                <span>Leak Detector:</span>
                <span className="font-mono font-bold text-emerald-400">Dry (Normal)</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Mission State:</span>
                <span className="font-mono font-bold text-sky-400">IDLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
