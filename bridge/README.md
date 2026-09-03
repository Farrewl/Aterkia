# Aterkia Jetson Bridge

Membaca telemetri kapal (PX4 / MAVLink) dari Jetson dan mem-publish-nya ke
MQTT, yang kemudian dibaca dashboard monitoring (`/monitoring`).

## Arsitektur

```
Jetson (Aterolas/Ateravinoleum)
  │  PX4 autopilot (MAVLink: serial /dev/ttyACM0 atau UDP 14550)
  ▼
jetson_bridge.py  (pymavlink -> paho-mqtt, publish tiap 5 dtk)
  │
  ▼
Broker MQTT (WebSocket)   topik:
  aterkia/aterolas/telemetry        (ASV)
  aterkia/ateravinoleum/telemetry   (AUV)
  │
  ▼
Dashboard monitoring (mqtt.js, WebSocket subscribe)
```

Tanpa QGroundControl — skrip membaca MAVLink mentah langsung dari PX4.

## Instalasi di Jetson

```bash
cd /path/to/bridge
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Menjalankan

```bash
# ASV via serial (default)
VEHICLE_ROLE=ASV python3 jetson_bridge.py --source serial --device /dev/ttyACM0

# AUV via UDP (sama dengan port QGC)
VEHICLE_ROLE=AUV python3 jetson_bridge.py --source udp --udp 0.0.0.0:14550
```

Opsional env: `MQTT_URL` (broker), `MQTT_USER`/`MQTT_PASS` (kredensial).

## Menjalankan sebagai service (systemd)

Buat `/etc/systemd/system/aterkia-bridge.service`:

```ini
[Unit]
Description=Aterkia MAVLink-to-MQTT bridge
After=network.target

[Service]
WorkingDirectory=/home/jetson/Aterkia/bridge
ExecStart=/home/jetson/Aterkia/bridge/.venv/bin/python /home/jetson/Aterkia/bridge/jetson_bridge.py --source serial --device /dev/ttyACM0
Environment=VEHICLE_ROLE=ASV
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now aterkia-bridge
sudo systemctl status aterkia-bridge
```

## Broker MQTT

- **Pengembangan:** public default `wss://broker.emqx.io:8084/mqtt` (WebSocket).
- **Produksi lapangan:** gunakan broker sendiri (mis. Mosquitto) dan set
  `MQTT_URL` + kredensial yang sama di `monitoring/.env`
  (`VITE_MQTT_URL`). Topik tidak berubah.

## Catatan AUV / kedalaman

- AUV di bawah air umumnya **tidak punya GPS** (sinyal tidak tembus air), jadi
  posisi di peta akan hilang begitu kapal menyelam — itu keterbatasan fisik.
- `depth` dihitung dari `relative_alt` dan butuh kalibrasi barometer; nilai
  0 di boot adalah indikasi "belum kalibrasi", bukan bug.

## Payload yang dipublish (JSON)

```json
{
  "lat": -6.9824, "lng": 110.4217,
  "speed": 3.2, "heading": 45.0,
  "battery": 87.5, "depth": 0.0,
  "signal": 91, "mode": "AUTO", "ts": 1710000000.0
}
```

Dashboard menandai kapal **Offline** jika tidak ada update > 15 detik.
