import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Ship, Anchor, Activity, Wifi, HardDrive,
  TrendingUp, RefreshCw,
  BarChart3, MapPin, Terminal, ShieldCheck, Eye, Lock
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createMqttPoller } from '../services/mqtt';

const EMPTY_ASV = { connected: false, lat: null, lng: null, speed: 0, heading: 0, battery: 0, depth: 0, signal: 0, mode: 'STANDBY', ts: null };
const EMPTY_AUV = { ...EMPTY_ASV };

const INITIAL_MISSIONS = [
  { id: 'm-01', name: 'Route Survey', robot: 'Aterolas', status: 'pending', progress: 0 },
  { id: 'm-02', name: 'Subsea Inspection', robot: 'Ateravinoleum', status: 'pending', progress: 0 },
];

export default function DashboardPage() {
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole('admin');

  const [telemetry, setTelemetry] = useState({ asv: EMPTY_ASV, auv: EMPTY_AUV });
  const [status, setStatus] = useState({ broker: false, asv: false, auv: false });
  const [logs, setLogs] = useState([
    { time: new Date().toTimeString().slice(0, 8), level: 'info', source: 'System', msg: 'Monitoring console ready. Waiting for vehicle telemetry...' },
  ]);
  const [clock, setClock] = useState(() => new Date());
  const pollerRef = useRef(null);
  const isAdminRef = useRef(isAdmin);
  isAdminRef.current = isAdmin;

  const appendLog = useCallback((level, source, msg) => {
    const now = new Date().toTimeString().slice(0, 8);
    setLogs((prev) => [{ time: now, level, source, msg }, ...prev].slice(0, 40));
  }, []);

  useEffect(() => {
    const onTelemetry = (key, data) => {
      setTelemetry((prev) => ({ ...prev, [key]: data }));
      appendLog('info', 'MQTT', `${key === 'asv' ? 'Aterolas (ASV)' : 'Ateravinoleum (AUV)'} telemetry received` + (data.speed != null ? ` · ${data.speed.toFixed(1)} kn` : ''));
    };

    const onStatus = (s) => {
      if (typeof s.broker === 'boolean') appendLog('info', 'MQTT', s.broker ? 'Connected to telemetry broker' : 'Broker connection lost');
      setStatus((prev) => ({ ...prev, ...s }));
    };

    const poller = createMqttPoller({ onTelemetry, onStatus });
    pollerRef.current = poller;

    const clockTimer = setInterval(() => setClock(new Date()), 1000);

    return () => {
      clearInterval(clockTimer);
      poller.close();
      pollerRef.current = null;
    };
  }, [appendLog]);

  const getStatusStyle = (name, online) => {
    if (name === 'broker') {
      return online
        ? { dot: 'bg-emerald-500', chip: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25', label: 'Broker Live' }
        : { dot: 'bg-red-500', chip: 'bg-red-500/15 text-red-400 border border-red-500/25', label: 'Broker Offline' };
    }
    return online
      ? { dot: 'bg-emerald-500', chip: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25', label: 'Online' }
      : { dot: 'bg-slate-500', chip: 'bg-slate-500/15 text-slate-300 border border-slate-500/25', label: 'Offline' };
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
                <p className="text-[11px] text-white/35">Robot Monitoring &amp; Control Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
                {clock.toTimeString().slice(0, 8)} WIB
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
            Viewing telemetry in read-only mode.
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
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400" /> Aterolas</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Ateravinoleum</span>
                </div>
              </div>
              <div className="map-dark rounded-xl overflow-hidden border border-white/10 h-72 z-0">
                <LiveMap asv={telemetry.asv} auv={telemetry.auv} />
              </div>
              <div className="flex items-center gap-4 mt-3 px-1 text-[10px] font-medium">
                <span className={`flex items-center gap-1.5 ${getStatusStyle('broker', status.broker).label === 'Broker Live' ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${getStatusStyle('broker', status.broker).dot}`} /> {getStatusStyle('broker', status.broker).label}
                </span>
                <span className={`flex items-center gap-1.5 ${status.asv ? 'text-sky-400' : 'text-slate-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${status.asv ? 'bg-sky-400' : 'bg-slate-500'}`} /> Aterolas {status.asv ? 'Online' : 'Offline'}
                </span>
                <span className={`flex items-center gap-1.5 ${status.auv ? 'text-blue-400' : 'text-slate-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${status.auv ? 'bg-blue-500' : 'bg-slate-500'}`} /> Ateravinoleum {status.auv ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            {/* ASV Card */}
            <RobotTelemetryCard
              icon={Ship}
              title="Aterolas"
              subtitle="Autonomous Surface Vehicle"
              iconColor="text-sky-400"
              iconBg="bg-sky-500/20"
              accent="text-sky-400"
              data={telemetry.asv}
              online={status.asv}
              metrics={[
                { icon: Activity, label: 'Speed', value: telemetry.asv.speed != null ? `${telemetry.asv.speed.toFixed(1)} kn` : '—' },
                { icon: MapPin, label: 'Heading', value: telemetry.asv.heading != null ? `${telemetry.asv.heading.toFixed(0)}°` : '—' },
                { icon: HardDrive, label: 'Battery', value: telemetry.asv.battery != null ? `${telemetry.asv.battery.toFixed(0)}%` : '—' },
                { icon: Wifi, label: 'Signal', value: telemetry.asv.signal != null ? `${telemetry.asv.signal}%` : '—' },
              ]}
            />

            {/* AUV Card */}
            <RobotTelemetryCard
              icon={Anchor}
              title="Ateravinoleum"
              subtitle="Autonomous Underwater Vehicle"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/20"
              accent="text-blue-400"
              data={telemetry.auv}
              online={status.auv}
              metrics={[
                { icon: Activity, label: 'Speed', value: telemetry.auv.speed != null ? `${telemetry.auv.speed.toFixed(1)} kn` : '—' },
                { icon: MapPin, label: 'Heading', value: telemetry.auv.heading != null ? `${telemetry.auv.heading.toFixed(0)}°` : '—' },
                { icon: HardDrive, label: 'Battery', value: telemetry.auv.battery != null ? `${telemetry.auv.battery.toFixed(0)}%` : '—' },
                { icon: Wifi, label: 'Signal', value: telemetry.auv.signal != null ? `${telemetry.auv.signal}%` : '—' },
                { icon: TrendingUp, label: 'Depth', value: telemetry.auv.depth != null ? `${telemetry.auv.depth.toFixed(1)} m` : '—' },
              ]}
            />
          </div>

          {/* Right column — active missions + logs */}
          <div className="lg:col-span-5 space-y-6">

            {/* Active Missions (read-only for now) */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-display font-bold text-lg">Active Missions</h2>
                <button
                  onClick={() => appendLog('info', 'System', 'Telemetry refresh requested')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-colors"
                  aria-label="Refresh"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-white/30 mb-4">
                Read-only view. Mission commands are coming soon.
              </p>

              <div className="space-y-3">
                {INITIAL_MISSIONS.map((mission) => {
                  const st = getStatusStyle(mission.name === 'Route Survey' ? 'active' : 'pending', true);
                  return (
                    <div key={mission.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{mission.name}</h3>
                          <p className="text-xs text-white/35 mt-0.5">{mission.robot}</p>
                          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-olympic-500 to-sky-400" style={{ width: `${mission.status === 'active' ? 100 : 0}%` }} />
                          </div>
                        </div>
                        <span className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.chip}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </span>
                      </div>
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
          Live telemetry via MQTT. Offline when no update for 15s.
        </p>
      </main>
    </div>
  );
}

/* ── Leaflet map with two real markers ── */
function LiveMap({ asv, auv }) {
  const center = [-6.9827, 110.4224];
  const hasAsv = asv.lat != null && asv.lng != null;
  const hasAuv = auv.lat != null && auv.lng != null;

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
      {hasAsv && (
        <CircleMarker
          center={[asv.lat, asv.lng]}
          radius={9}
          pathOptions={{ color: '#38bdf8', fillColor: '#38bdf8', fillOpacity: 0.85, weight: 2 }}
        >
          <Popup>
            <strong>Aterolas (ASV)</strong><br />
            {asv.lat.toFixed(5)}, {asv.lng.toFixed(5)}<br />
            {asv.speed != null ? asv.speed.toFixed(1) : '—'} kn · HDG {asv.heading != null ? asv.heading.toFixed(0) : '—'}° · BAT {asv.battery != null ? asv.battery.toFixed(0) : '—'}%
          </Popup>
        </CircleMarker>
      )}
      {hasAuv && (
        <CircleMarker
          center={[auv.lat, auv.lng]}
          radius={9}
          pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.85, weight: 2 }}
        >
          <Popup>
            <strong>Ateravinoleum (AUV)</strong><br />
            {auv.lat.toFixed(5)}, {auv.lng.toFixed(5)}<br />
            Depth {auv.depth != null ? auv.depth.toFixed(1) : '—'} m · BAT {auv.battery != null ? auv.battery.toFixed(0) : '—'}%
          </Popup>
        </CircleMarker>
      )}
    </MapContainer>
  );
}

/* ── Reusable robot telemetry card ── */
function RobotTelemetryCard({ icon: Icon, title, subtitle, iconColor, iconBg, accent, data, online, metrics }) {
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
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${online ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-slate-500/15 text-slate-300 border border-slate-500/25'}`}>
          <span className={`w-2 h-2 rounded-full ${online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
          {online ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-4 ${metrics.length > 4 ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
        {metrics.map((m) => <TelemetryItem key={m.label} icon={m.icon} label={m.label} value={m.value} color={accent} />)}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/35">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {data.lat != null && data.lng != null ? `${data.lat.toFixed(4)}, ${data.lng.toFixed(4)}` : 'Position unavailable'}
        </span>
        <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Mode: {data.mode || 'STANDBY'}</span>
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
