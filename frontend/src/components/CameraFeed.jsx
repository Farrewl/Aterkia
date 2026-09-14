import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Video, Wifi, WifiOff, ScanLine, Maximize2, Minimize2, Loader2, AlertTriangle, Power, ChevronDown
} from 'lucide-react';
import { useCameraStream } from '../hooks';
import { useTranslation } from '../i18n';

const LABEL_COLORS = {
  green_ball: { stroke: '#22c55e', bg: 'rgba(34,197,94,0.25)', text: '#86efac' },
  red_ball: { stroke: '#ef4444', bg: 'rgba(239,68,68,0.25)', text: '#fca5a5' },
};

const DEFAULT_COLOR = { stroke: '#22d3ee', bg: 'rgba(34,211,238,0.25)', text: '#a5f3fc' };

const STATUS_META = {
  live:       { labelKey: 'camera.statusLive',       dot: 'bg-emerald-500 animate-pulse', wrap: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
  connecting: { labelKey: 'camera.statusConnecting', dot: 'bg-amber-400 animate-pulse',   wrap: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
  starting:   { labelKey: 'camera.statusConnecting', dot: 'bg-amber-400 animate-pulse',   wrap: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
  idle:       { labelKey: 'camera.statusIdle',       dot: 'bg-slate-500',                 wrap: 'bg-slate-500/15 text-slate-400 border-slate-500/25' },
  offline:    { labelKey: 'camera.statusOffline',    dot: 'bg-red-500',                   wrap: 'bg-red-500/15 text-red-400 border-red-500/25' },
};

export default function CameraFeed({ className = '' }) {
  const { t } = useTranslation();
  const {
    status, error, detections, latestInfo, streamRef, frameVersion,
    cameraEnabled, robot, robots, toggleCamera, selectRobot,
  } = useCameraStream();
  const wrapRef = useRef(null);
  const overlayRef = useRef(null);
  const [wrapSize, setWrapSize] = useState({ w: 0, h: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const overlay = overlayRef.current;
    if (!wrap || !overlay) return undefined;
    const update = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      overlay.width = Math.max(1, Math.round(r.width * dpr));
      overlay.height = Math.max(1, Math.round(r.height * dpr));
      setWrapSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Draw frame + detection overlay to main canvas
  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas || wrapSize.w === 0) return;
    const ctx = canvas.getContext('2d');
    const W = wrapSize.w;
    const H = wrapSize.h;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const img = streamRef.current;

    const drawPlaceholder = (title, sub) => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(34,211,238,0.15)';
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(10, 10, W - 20, H - 20);
      ctx.textAlign = 'center';
      ctx.font = '13px monospace';
      ctx.fillStyle = 'rgba(148,163,184,0.7)';
      ctx.fillText(title, W / 2, H / 2 - 6);
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(148,163,184,0.4)';
      ctx.fillText(sub, W / 2, H / 2 + 18);
    };

    if (status !== 'live' || !img || !img.complete || !img.naturalWidth) {
      if (status === 'idle') {
        drawPlaceholder('Camera is off', `${t('camera.clickOn')} ${robot}`);
      } else if (status === 'connecting' || status === 'starting') {
        drawPlaceholder(t('camera.statusConnecting'), `${t('camera.connectingTo')} (${robot})`);
      } else if (status === 'offline') {
        drawPlaceholder(t('camera.statusOffline'), error || t('camera.cameraOffline'));
      } else {
        drawPlaceholder(t('camera.placeholderWaiting'), '');
      }
      return;
    }

    // Draw frame with object-contain (letterbox)
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.min(W / iw, H / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const ox = (W - dw) / 2;
    const oy = (H - dh) / 2;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(img, ox, oy, dw, dh);

    if (detections.length === 0) {
      ctx.strokeStyle = 'rgba(34,211,238,0.3)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.strokeRect(ox + 8, oy + 8, dw - 16, dh - 16);
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(148,163,184,0.6)';
      ctx.textAlign = 'center';
      ctx.fillText('NO DETECTION', W / 2, oy + 24);
      return;
    }

    detections.forEach((d) => {
      const [x1, y1, x2, y2] = d.box;
      const color = LABEL_COLORS[d.label] || DEFAULT_COLOR;
      const px = ox + x1 * dw;
      const py = oy + y1 * dh;
      const pw = (x2 - x1) * dw;
      const ph = (y2 - y1) * dh;

      ctx.setLineDash([]);
      ctx.strokeStyle = color.stroke;
      ctx.lineWidth = 3;
      ctx.strokeRect(px, py, pw, ph);

      const labelW = Math.max(pw, Math.min(164, pw + 40));
      const labelH = 22;
      const labelY = py - labelH > oy ? py - labelH : py;
      ctx.fillStyle = color.bg;
      ctx.fillRect(px, labelY, Math.min(labelW, W - px), labelH);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color.stroke;
      ctx.strokeRect(px, labelY, Math.min(labelW, W - px), labelH);
      ctx.fillStyle = color.text;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(
        `${d.label} ${(d.conf * 100).toFixed(1)}%`,
        px + 6,
        labelY + 15
      );
    });
  }, [frameVersion, detections, wrapSize, streamRef, status, robot, error, t]);

  const sm = STATUS_META[status] || STATUS_META.connecting;
  const isBusy = status === 'connecting' || status === 'starting';

  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
            <Video className="w-4.5 h-4.5 text-red-400" />
          </div>
          <div>
            <h2 className="font-display font-bold text-sm flex items-center gap-2">
              {t('camera.visionFeed')}
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${sm.wrap}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                {t(sm.labelKey)}
              </span>
            </h2>
            <p className="text-[10px] text-white/35 font-mono">
              {status === 'live' && latestInfo
                ? `Aterolas CAM · ${latestInfo.w}×${latestInfo.h} · ${detections.length} ${t('camera.detectionCount')}`
                : t('camera.buoyDetection')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Robot selector */}
          <div className="relative">
            <select
              value={robot}
              onChange={(e) => selectRobot(e.target.value)}
              disabled={status === 'live'}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
              aria-label={t('camera.selectRobot')}
            >
              {robots.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-slate-100">{r}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40" />
          </div>

          {/* Power toggle */}
          <button
            onClick={toggleCamera}
            disabled={status === 'connecting'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
              cameraEnabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30'
                : cameraEnabled === false
                  ? 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                  : 'bg-white/5 border-white/10 text-white/40'
            }`}
            aria-label={cameraEnabled ? t('camera.turnOffCamera') : t('camera.turnOnCamera')}
          >
            <Power className={`w-3.5 h-3.5 ${cameraEnabled ? 'text-emerald-400' : 'text-white/40'}`} />
            {cameraEnabled ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-colors"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Video area — canvas render frame + overlay */}
      <div ref={wrapRef} className="relative bg-black" style={{ minHeight: 240 }}>
        <canvas ref={overlayRef} className="block w-full max-h-[420px]" />
        {isBusy && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400/70" />
          </div>
        )}
      </div>

      {/* Footer status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-white/10 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-white/40">
          <ScanLine className="w-3.5 h-3.5 text-sky-400" />
          <span>YOLOv10 · buoy.pt</span>
          <span className="text-white/20">·</span>
          {latestInfo?.model_ready === false ? (
            <span className="text-amber-400/80">{t('camera.detectionOff')}</span>
          ) : (
            <>
              <span>green_ball</span>
              <span className="inline-block w-2 h-2 rounded-sm bg-emerald-500/70" />
              <span>red_ball</span>
              <span className="inline-block w-2 h-2 rounded-sm bg-red-500/70" />
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-white/40">
          {status === 'offline' && (
            <span className="flex items-center gap-1 text-red-400/80">
              <AlertTriangle className="w-3.5 h-3.5" />
              {error || t('camera.cameraOffline')}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Wifi className={`w-3 h-3 ${status === 'live' ? 'text-emerald-400' : status === 'connecting' || status === 'starting' ? 'text-amber-400' : 'text-white/25'}`} />
            {status === 'live' ? t('camera.connected') : status === 'offline' ? t('camera.disconnected') : '—'}
          </span>
          <span>WS · {latestInfo?.fps ? `${latestInfo.fps} fps` : '—'}</span>
        </div>
      </div>
    </div>
  );
}