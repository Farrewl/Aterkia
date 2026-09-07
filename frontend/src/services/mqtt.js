import mqtt from 'mqtt';

// Broker public MQTT over WebSocket (dev). Untuk produksi lapangan ganti ke
// broker Anda (mis. Mosquitto self-host) via VITE_MQTT_URL.
const DEFAULT_URL = 'wss://broker.emqx.io:8084/mqtt';

const TOPICS = {
  ASV: 'aterkia/aterolas/telemetry',
  AUV: 'aterkia/ateravinoleum/telemetry',
};

function emptyState() {
  return {
    connected: false,
    lat: null,
    lng: null,
    speed: 0,
    heading: 0,
    battery: 0,
    depth: 0,
    signal: 0,
    mode: 'STANDBY',
    ts: null,
  };
}

export function createMqttPoller({ onTelemetry, onStatus }) {
  const url = (import.meta.env.VITE_MQTT_URL || DEFAULT_URL).trim();
  const client = mqtt.connect(url, {
    clean: true,
    reconnectPeriod: 4000,
    connectTimeout: 10000,
  });

  const lastSeen = { asv: 0, auv: 0 };
  let onlineTimer = null;
  let destroyed = false;

  const emitState = () => {
    if (!onStatus) return;
    onStatus({ asv: Date.now() - lastSeen.asv < 15000, auv: Date.now() - lastSeen.auv < 15000 });
  };

  const checkOnline = () => {
    if (destroyed) return;
    emitState();
  };

  client.on('connect', () => {
    client.subscribe([TOPICS.ASV, TOPICS.AUV], (err) => {
      if (onStatus) onStatus({ broker: !err });
    });
  });

  client.on('message', (topic, payload) => {
    try {
      const data = JSON.parse(payload.toString());
      if (topic === TOPICS.ASV) {
        lastSeen.asv = Date.now();
        onTelemetry?.('asv', { ...emptyState(), ...data, connected: true });
      } else if (topic === TOPICS.AUV) {
        lastSeen.auv = Date.now();
        onTelemetry?.('auv', { ...emptyState(), ...data, connected: true });
      }
    } catch {
      /* non-JSON, ignore */
    }
  });

  client.on('error', () => {
    if (onStatus) onStatus({ broker: false });
  });

  // Cek online/offline tiap 5 detik (data telat >15s = offline).
  onlineTimer = setInterval(checkOnline, 5000);

  return {
    close: () => {
      destroyed = true;
      if (onlineTimer) clearInterval(onlineTimer);
      try { client.end(true); } catch { /* noop */ }
    },
  };
}
