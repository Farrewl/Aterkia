import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import { api } from '../../services/api';
import {
  Ship, Anchor, Activity, Wifi, Cpu, HardDrive,
  TrendingUp, AlertTriangle, CheckCircle, RefreshCw,
  BarChart3, MapPin, Settings, Terminal
} from 'lucide-react';

export default function DashboardPage() {
  const { user, hasRole } = useAuth();
  const [telemetry, setTelemetry] = useState({
    asv: { connected: true, lat: -6.98, lng: 110.42, speed: 3.2, heading: 45, battery: 87, depth: 0 },
    auv: { connected: true, lat: -6.98, lng: 110.43, speed: 1.8, heading: 120, battery: 92, depth: 12.5 },
  });
  const [missions, setMissions] = useState([
    { id: 'm-01', name: 'Survey Jalur Lombok', robot: 'Baruna ASV', status: 'active', progress: 65 },
    { id: 'm-02', name: 'Inspeksi Pipa Bawah Laut', robot: 'Cakra Subsea AUV', status: 'pending', progress: 0 },
    { id: 'm-03', name: 'Pemetaan Terumbu Karang', robot: 'Nala-01 ASV', status: 'completed', progress: 100 },
  ]);
  const [logs, setLogs] = useState([
    { time: '10:42:15', level: 'info', source: 'ASV-Baruna', msg: 'Waypoint #3 reached, proceeding to #4' },
    { time: '10:41:08', level: 'warn', source: 'AUV-Cakra', msg: 'Current drift detected, adjusting heading +5°' },
    { time: '10:39:52', level: 'info', source: 'ASV-Baruna', msg: 'Battery at 87%, estimated 4.2h remaining' },
    { time: '10:38:21', level: 'info', source: 'System', msg: 'Mission "Survey Jalur Lombok" started' },
    { time: '10:35:00', level: 'error', source: 'AUV-Cakra', msg: 'Sonar ping timeout, retrying...' },
  ]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        asv: {
          ...prev.asv,
          lat: prev.asv.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.asv.lng + (Math.random() - 0.5) * 0.0001,
          speed: Math.max(0, prev.asv.speed + (Math.random() - 0.5) * 0.3),
          heading: (prev.asv.heading + (Math.random() - 0.5) * 10 + 360) % 360,
          battery: Math.max(0, prev.asv.battery - Math.random() * 0.1),
        },
        auv: {
          ...prev.auv,
          lat: prev.auv.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.auv.lng + (Math.random() - 0.5) * 0.0001,
          speed: Math.max(0, prev.auv.speed + (Math.random() - 0.5) * 0.2),
          heading: (prev.auv.heading + (Math.random() - 0.5) * 8 + 360) % 360,
          battery: Math.max(0, prev.auv.battery - Math.random() * 0.08),
          depth: Math.max(0, Math.min(30, prev.auv.depth + (Math.random() - 0.5) * 0.5)),
        },
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-500';
      case 'completed': return 'bg-sky-500';
      default: return 'bg-slate-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'pending': return 'Menunggu';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-olympic-950 text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-olympic-500/20 flex items-center justify-center">
                <Ship className="w-5 h-5 text-olympic-300" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-white">Aterkia Dashboard</h1>
                <p className="text-[11px] text-olympic-300">Robot Monitoring & Control Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </div>
              <span className="text-xs text-slate-400 hidden sm:block">Selamat datang, {user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel - Robot Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            {/* ASV Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                    <Ship className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg">Baruna ASV</h2>
                    <p className="text-xs text-slate-400">Autonomous Surface Vehicle</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${telemetry.asv.connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${telemetry.asv.connected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  {telemetry.asv.connected ? 'Online' : 'Offline'}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <TelemetryItem icon={Activity} label="Kecepatan" value={`${telemetry.asv.speed.toFixed(1)} kn`} color="text-sky-400" />
                <TelemetryItem icon={MapPin} label="Heading" value={`${telemetry.asv.heading.toFixed(0)}°`} color="text-sky-400" />
                <TelemetryItem icon={HardDrive} label="Baterai" value={`${telemetry.asv.battery.toFixed(0)}%`} color="text-sky-400" />
                <TelemetryItem icon={Wifi} label="Signal" value={`${(telemetry.asv.connected ? 85 + Math.random() * 10 : 0).toFixed(0)}%`} color="text-sky-400" />
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {telemetry.asv.lat.toFixed(4)}, {telemetry.asv.lng.toFixed(4)}</span>
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Mode: Auto</span>
              </div>
            </div>

            {/* AUV Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Anchor className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg">Cakra Subsea AUV</h2>
                    <p className="text-xs text-slate-400">Autonomous Underwater Vehicle</p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${telemetry.auv.connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${telemetry.auv.connected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  {telemetry.auv.connected ? 'Online' : 'Offline'}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <TelemetryItem icon={Activity} label="Kecepatan" value={`${telemetry.auv.speed.toFixed(1)} kn`} color="text-blue-400" />
                <TelemetryItem icon={MapPin} label="Heading" value={`${telemetry.auv.heading.toFixed(0)}°`} color="text-blue-400" />
                <TelemetryItem icon={HardDrive} label="Baterai" value={`${telemetry.auv.battery.toFixed(0)}%`} color="text-blue-400" />
                <TelemetryItem icon={Wifi} label="Signal" value={telemetry.auv.connected ? `${(78 + Math.random() * 15).toFixed(0)}%` : '0%'} color="text-blue-400" />
                <TelemetryItem icon={TrendingUp} label="Kedalaman" value={`${telemetry.auv.depth.toFixed(1)} m`} color="text-blue-400" />
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {telemetry.auv.lat.toFixed(4)}, {telemetry.auv.lng.toFixed(4)}</span>
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Mode: Auto</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Missions & Logs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Missions */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg">Misi Aktif</h2>
                <Button variant="ghost" size="sm"><RefreshCw className="w-4 h-4" /></Button>
              </div>

              <div className="space-y-3">
                {missions.map((mission) => (
                  <div key={mission.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{mission.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{mission.robot}</p>
                        <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-olympic-500 to-sky-400 transition-all duration-500"
                            style={{ width: `${mission.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{mission.progress}% selesai</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusColor(mission.status)}`}>
                        {getStatusLabel(mission.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Logs */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg">Log Sistem</h2>
                <Button variant="ghost" size="sm"><BarChart3 className="w-4 h-4" /></Button>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10 font-mono text-xs">
                    <div className="flex items-start gap-3">
                      <span className="text-slate-500 shrink-0">{log.time}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                        log.level === 'error' ? 'bg-red-500/20 text-red-400' :
                        log.level === 'warn' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-olympic-300 shrink-0">[{log.source}]</span>
                      <span className="text-slate-300 truncate">{log.msg}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function TelemetryItem({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <div className={`font-display font-bold text-xl ${color}`}>{value}</div>
    </div>
  );
}

function Button({ variant = 'primary', size = 'md', children, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-olympic-500/30';
  const variants = {
    primary: 'bg-olympic-500 hover:bg-olympic-600 text-white shadow-lg shadow-olympic-500/25',
    ghost: 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}