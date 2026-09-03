import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Ship, Anchor, Activity, Wifi, HardDrive,
  TrendingUp, RefreshCw,
  BarChart3, MapPin, Terminal, Play, Pause, Square, ShieldCheck, Eye, Lock
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const INITIAL_TELEMETRY = {
  asv: {
    connected: true, lat: -6.9824, lng: 110.4217,
    speed: 3.2, heading: 45, battery: 87, depth: 0, signal: 91,
  },
  auv: {
    connected: true, lat: -6.9831, lng: 110.4231,
    speed: 1.8, heading: 120, battery: 92, depth: 12.5, signal: 84,
  },
};

const INITIAL_MISSIONS = [
  { id: 'm-01', name: 'Lombok Route Survey', robot: 'Baruna ASV', status: 'active', progress: 65 },
  { id: 'm-02', name: 'Subsea Pipeline Inspection', robot: 'Cakra Subsea AUV', status: 'pending', progress: 0 },
  { id: 'm-03', name: 'Coral Reef Mapping', robot: 'Nala-01 ASV', status: 'completed', progress: 100 },
];

const INITIAL_LOGS = [
  { time: '10:42:15', level: 'info', source: 'ASV-Baruna', msg: 'Waypoint #3 reached, proceeding to #4' },
  { time: '10:41:08', level: 'warn', source: 'AUV-Cakra', msg: 'Current drift detected, adjusting heading +5°' },
  { time: '10:39:52', level: 'info', source: 'ASV-Baruna', msg: 'Battery at 87%, estimated 4.2h remaining' },
  { time: '10:38:21', level: 'info', source: 'System', msg: 'Mission "Lombok Route Survey" started' },
  { time: '10:35:00', level: 'error', source: 'AUV-Cakra', msg: 'Sonar ping timeout, retrying...' },
];

export default function DashboardPage() {
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole('admin');

  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);
  const [missions, setMissions] = useState(INITIAL_MISSIONS);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const jitter = (v, amt, min = 0) => Math.max(min, v + (Math.random() - 0.5) * amt);

    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        asv: {
          ...prev.asv,
          lat: prev.asv.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.asv.lng + (Math.random() - 0.5) * 0.0001,
          speed: Math.max(0, prev.asv.speed + (Math.random() - 0.5) * 0.3),
          heading: (prev.asv.heading + (Math.random() - 0.5) * 10 + 360) % 360,
          battery: Math.max(5, prev.asv.battery - Math.random() * 0.05),
          signal: Math.round(Math.min(100, Math.max(60, jitter(prev.asv.signal, 8)))),
        },
        auv: {
          ...prev.auv,
          lat: prev.auv.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.auv.lng + (Math.random() - 0.5) * 0.0001,
          speed: Math.max(0, prev.auv.speed + (Math.random() - 0.5) * 0.2),
          heading: (prev.auv.heading + (Math.random() - 0.5) * 8 + 360) % 360,
          battery: Math.max(5, prev.auv.battery - Math.random() * 0.04),
          depth: Math.max(0, Math.min(30, prev.auv.depth + (Math.random() - 0.5) * 0.5)),
          signal: Math.round(Math.min(100, Math.max(50, jitter(prev.auv.signal, 10)))),
        },
      }));
      setClock(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const appendLog = (level, source, msg) => {
    const now = new Date().toTimeString().slice(0, 8);
    setLogs((prev) => [{ time: now, level, source, msg }, ...prev].slice(0, 40));
  };

  // Admin-only mission control (simulated commands)
  const sendMissionCommand = (mission, action) => {
    const statusMap = { start: 'active', pause: 'pending', stop: 'completed' };
    setMissions((prev) =>
      prev.map((m) =>
        m.id === mission.id
          ? { ...m, status: statusMap[action], progress: action === 'stop' ? 100 : m.progress }
          : m
      )
    );
    appendLog('cmd', 'Operator', `${action.toUpperCase()} command sent to "${mission.name}" (${mission.robot})`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active': return { dot: 'bg-emerald-500', chip: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25', label: 'Active' };
      case 'pending': return { dot: 'bg-amber-500', chip: 'bg-amber-500/15 text-amber-400 border border-amber-500/25', label: 'Standby' };
      case 'completed': return { dot: 'bg-sky-500', chip: 'bg-sky-500/15 text-sky-400 border border-sky-500/25', label: 'Completed' };
      default: return { dot: 'bg-slate-400', chip: 'bg-slate-500/15 text-slate-300 border border-slate-500/25', label: status };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0a1628] to-[#060d1a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-olympic-500/20 flex items-center justify-center">
                <Ship className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-white">Aterkia Dashboard</h1>
                <p className="text-[11px] text-white/35">Robot Monitoring & Control Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
                {clock.toTimeString().slice(0, 8)} WIB
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium border border-emerald-500/25">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </div>
              {isAdmin ? (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/25">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ADMIN
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/45 text-xs font-bold border border-white/10">
                  <Eye className="w-3.5 h-3.5" />
                  VIEW ONLY
                </span>
              )}
              <span className="text-xs text-white/35 hidden lg:block">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {!isAdmin && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/45">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            You are viewing telemetry in read-only mode. Mission control commands require admin access.
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left column — telemetry + map */}
          <div className="lg:col-span-7 space-y-6">

            {/* Live Map */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="font-display font-bold text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  Live Position
                </h2>
                <div className="flex items-center gap-4 text-[10px] font-medium">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400" /> ASV Baruna</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> AUV Cakra</span>
                </div>
              </div>
              <div className="map-dark rounded-xl overflow-hidden border border-white/10 h-72 z-0">
                <LiveMap asv={telemetry.asv} auv={telemetry.auv} />
              </div>
            </div>

            {/* ASV Card */}
            <RobotTelemetryCard
              icon={Ship}
              title="Baruna ASV"
              subtitle="Autonomous Surface Vehicle"
              iconColor="text-sky-400"
              iconBg="bg-sky-500/20"
              accent="text-sky-400"
              data={telemetry.asv}
              metrics={[
                { icon: Activity, label: 'Speed', value: `${telemetry.asv.speed.toFixed(1)} kn` },
                { icon: MapPin, label: 'Heading', value: `${telemetry.asv.heading.toFixed(0)}°` },
                { icon: HardDrive, label: 'Battery', value: `${telemetry.asv.battery.toFixed(0)}%` },
                { icon: Wifi, label: 'Signal', value: `${telemetry.asv.signal}%` },
              ]}
            />

            {/* AUV Card */}
            <RobotTelemetryCard
              icon={Anchor}
              title="Cakra Subsea AUV"
              subtitle="Autonomous Underwater Vehicle"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/20"
              accent="text-blue-400"
              data={telemetry.auv}
              metrics={[
                { icon: Activity, label: 'Speed', value: `${telemetry.auv.speed.toFixed(1)} kn` },
                { icon: MapPin, label: 'Heading', value: `${telemetry.auv.heading.toFixed(0)}°` },
                { icon: HardDrive, label: 'Battery', value: `${telemetry.auv.battery.toFixed(0)}%` },
                { icon: Wifi, label: 'Signal', value: `${telemetry.auv.signal}%` },
                { icon: TrendingUp, label: 'Depth', value: `${telemetry.auv.depth.toFixed(1)} m` },
              ]}
            />
          </div>

          {/* Right column — mission control + logs */}
          <div className="lg:col-span-5 space-y-6">

            {/* Missions / Mission Control */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-display font-bold text-lg">
                  {isAdmin ? 'Mission Control' : 'Active Missions'}
                </h2>
                <button
                  onClick={() => appendLog('info', 'System', 'Telemetry refresh requested')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-colors"
                  aria-label="Refresh"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-white/30 mb-4">
                {isAdmin ? 'Commands are simulated in demo mode.' : 'Read-only view — sign in as admin to control missions.'}
              </p>

              <div className="space-y-3">
                {missions.map((mission) => {
                  const st = getStatusStyle(mission.status);
                  return (
                    <div key={mission.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{mission.name}</h3>
                          <p className="text-xs text-white/35 mt-0.5">{mission.robot}</p>
                          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                mission.status === 'completed'
                                  ? 'bg-gradient-to-r from-sky-500 to-cyan-400'
                                  : 'bg-gradient-to-r from-olympic-500 to-sky-400'
                              }`}
                              style={{ width: `${mission.progress}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-white/30 mt-1">{mission.progress}% complete</p>
                        </div>
                        <span className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.chip}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </span>
                      </div>

                      {isAdmin && (
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
                          <CmdButton icon={Play} label="Start" disabled={mission.status === 'active'}
                            onClick={() => sendMissionCommand(mission, 'start')} />
                          <CmdButton icon={Pause} label="Pause" disabled={mission.status !== 'active'}
                            onClick={() => sendMissionCommand(mission, 'pause')} />
                          <CmdButton icon={Square} label="Stop" disabled={mission.status === 'completed'}
                            onClick={() => sendMissionCommand(mission, 'stop')} danger />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Logs */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg">System Logs</h2>
                <BarChart3 className="w-4 h-4 text-white/25" />
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {logs.map((log, i) => (
                  <div key={`${log.time}-${i}`} className="bg-white/5 rounded-xl p-3 border border-white/10 font-mono text-[11px]">
                    <div className="flex items-start gap-2.5">
                      <span className="text-white/25 shrink-0">{log.time}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                        log.level === 'error' ? 'bg-red-500/20 text-red-400' :
                        log.level === 'warn' ? 'bg-amber-500/20 text-amber-400' :
                        log.level === 'cmd' ? 'bg-violet-500/20 text-violet-300' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-sky-300/80 shrink-0">[{log.source}]</span>
                      <span className="text-white/55 truncate">{log.msg}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <p className="text-center text-[11px] text-white/20 mt-8">
          Demo telemetry — simulated data for presentation purposes. Live vehicle link coming soon.
        </p>
      </main>
    </div>
  );
}

/* ── Leaflet map with two moving markers ── */
function LiveMap({ asv, auv }) {
  const center = [-6.9827, 110.4224];
  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[asv.lat, asv.lng]}
        radius={9}
        pathOptions={{ color: '#38bdf8', fillColor: '#38bdf8', fillOpacity: 0.85, weight: 2 }}
      >
        <Popup>
          <strong>ASV Baruna</strong><br />
          {asv.lat.toFixed(5)}, {asv.lng.toFixed(5)}<br />
          {asv.speed.toFixed(1)} kn · HDG {asv.heading.toFixed(0)}° · BAT {asv.battery.toFixed(0)}%
        </Popup>
      </CircleMarker>
      <CircleMarker
        center={[auv.lat, auv.lng]}
        radius={9}
        pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.85, weight: 2 }}
      >
        <Popup>
          <strong>AUV Cakra Subsea</strong><br />
          {auv.lat.toFixed(5)}, {auv.lng.toFixed(5)}<br />
          Depth {auv.depth.toFixed(1)} m · BAT {auv.battery.toFixed(0)}%
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
}

/* ── Reusable robot telemetry card ── */
function RobotTelemetryCard({ icon: Icon, title, subtitle, iconColor, iconBg, accent, data, metrics }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">{title}</h2>
            <p className="text-xs text-white/35">{subtitle}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${data.connected ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/15 text-red-400 border border-red-500/25'}`}>
          <span className={`w-2 h-2 rounded-full ${data.connected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
          {data.connected ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-4 ${metrics.length > 4 ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
        {metrics.map((m) => (
          <TelemetryItem key={m.label} icon={m.icon} label={m.label} value={m.value} color={accent} />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/35">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.lat.toFixed(4)}, {data.lng.toFixed(4)}</span>
        <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Mode: Auto</span>
      </div>
    </div>
  );
}

function TelemetryItem({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 text-xs text-white/35 mb-1">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <div className={`font-display font-bold text-xl ${color}`}>{value}</div>
    </div>
  );
}

function CmdButton({ icon: Icon, label, onClick, disabled, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${
        danger
          ? 'bg-red-500/10 border-red-500/25 text-red-400 hover:bg-red-500/20 enabled:hover:border-red-500/40'
          : 'bg-white/5 border-white/10 text-white/55 hover:bg-white/10 enabled:hover:text-white'
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
