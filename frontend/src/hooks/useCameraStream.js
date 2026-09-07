import { useEffect, useRef, useState, useCallback } from 'react';

const DEFAULT_URL = () => {
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.hostname}:8000/ws/camera`;
};

export function useCameraStream({ url } = {}) {
  const streamRef = useRef(null);
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const attemptRef = useRef(0);
  const frameTimingRef = useRef({ last: 0, ema: 0 });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [detections, setDetections] = useState([]);
  const [latestInfo, setLatestInfo] = useState(null);
  const [frameVersion, setFrameVersion] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [robot, setRobot] = useState('Aterolas');
  const [robots, setRobots] = useState(['Aterolas']);
  const cameraEnabledRef = useRef(false);
  const robotRef = useRef('Aterolas');

  const setCameraEnabledState = useCallback((enabled) => {
    cameraEnabledRef.current = enabled;
    setCameraEnabled(enabled);
  }, []);

  const setRobotState = useCallback((name) => {
    robotRef.current = name;
    setRobot(name);
  }, []);

  const send = useCallback((payload) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }, []);

  const toggleCamera = useCallback(() => {
    send({ cmd: 'camera', enabled: !cameraEnabledRef.current });
  }, [send]);

  const selectRobot = useCallback((name) => {
    setRobotState(name);
    send({ cmd: 'select_robot', robot: name });
  }, [send, setRobotState]);

  const connect = useCallback(() => {
    if (wsRef.current) {
      try { wsRef.current.close(); } catch { /* noop */ }
    }
    setStatus('connecting');

    const params = new URLSearchParams(window.location.search);
    const endpoint = url || params.get('camera') || DEFAULT_URL();

    let ws;
    try {
      ws = new WebSocket(endpoint);
    } catch (e) {
      setError('Invalid WebSocket URL');
      setStatus('offline');
      return;
    }
    wsRef.current = ws;

    ws.onopen = () => {
      attemptRef.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'frame') {
          const now = performance.now();
          if (frameTimingRef.current.last) {
            const dt = now - frameTimingRef.current.last;
            const ema = frameTimingRef.current.ema || dt;
            frameTimingRef.current.ema = ema * 0.75 + dt * 0.25;
            setLatestInfo((prev) => ({ ...(prev || {}), fps: Math.round(1000 / frameTimingRef.current.ema) }));
          }
          frameTimingRef.current.last = now;
          const img = new Image();
          streamRef.current = img;
          setDetections(msg.dets || []);
          setLatestInfo((prev) => ({
            ...(prev || {}),
            w: msg.w,
            h: msg.h,
            robot: msg.robot || prev?.robot,
          }));
          if (msg.img) {
            img.onload = () => setFrameVersion((v) => v + 1);
            img.src = `data:image/jpeg;base64,${msg.img}`;
          }
          setStatus('live');
          setError(null);
        } else if (msg.type === 'status') {
          if (typeof msg.camera_enabled === 'boolean') {
            setCameraEnabledState(msg.camera_enabled);
            setStatus(msg.camera_enabled ? (msg.online ? 'live' : 'starting') : 'idle');
          } else if (msg.camera_enabled === false) {
            setCameraEnabledState(false);
            setStatus('idle');
          }
          if (msg.robot) setRobotState(msg.robot);
          if (Array.isArray(msg.robots) && msg.robots.length) setRobots(msg.robots);
          setLatestInfo((prev) => ({
            ...(prev || {}),
            fps_target: msg.fps_target || 0,
            model_ready: msg.model_ready,
            camera_enabled: msg.camera_enabled,
            robot: msg.robot,
          }));
          if (msg.error) setError(msg.error);
        }
      } catch {
        /* non-JSON, ignore */
      }
    };

    ws.onerror = () => {
      // onclose akan menangani reconnect
    };

    ws.onclose = () => {
      if (streamRef.current) streamRef.current = null;
      wsRef.current = null;
      setStatus('offline');
      setError('Status stream terputus. Menghubungkan ulang…');
      const delay = Math.min(15000, 1000 * 2 ** Math.min(attemptRef.current, 5));
      attemptRef.current += 1;
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = setTimeout(connect, delay);
    };
  }, [url, setCameraEnabledState, setRobotState]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        try { wsRef.current.close(); } catch { /* noop */ }
      }
      wsRef.current = null;
      streamRef.current = null;
    };
  }, [connect]);

  return {
    status, error, detections, latestInfo, streamRef, frameVersion,
    cameraEnabled, robot, robots,
    reconnect: connect, toggleCamera, selectRobot,
  };
}