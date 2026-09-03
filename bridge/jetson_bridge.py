#!/usr/bin/env python3
"""
Aterkia Jetson bridge: PX4 MAVLink -> MQTT telemetry.

Reads vehicle telemetry over MAVLink (serial or UDP), parses the fields the
monitoring dashboard needs, and publishes JSON to MQTT every `interval` seconds.

Usage:
  python jetson_bridge.py --source serial   (default, /dev/ttyACM0 @ 115200)
  python jetson_bridge.py --source udp      (udp://0.0.0.0:14550)

Env overrides (or flags):
  VEHICLE_ROLE   ASV | AUV   (default ASV) -> chooses MQTT topic
  MQTT_URL       broker URL  (default wss://broker.emqx.io:8084/mqtt)
  MQTT_USER / MQTT_PASS optional credentials
"""
import argparse
import json
import os
import signal
import sys
import time

from pymavlink.dialects.v20 import common as mavlink
from pymavlink import mavutil

try:
    import paho.mqtt.client as mqtt
except ImportError:
    print("ERROR: pip install paho-mqtt", file=sys.stderr)
    raise

VEHICLE = os.environ.get("VEHICLE_ROLE", "ASV").upper()
ROLE_OK = {"ASV": "aterkia/aterolas/telemetry", "AUV": "aterkia/ateravinoleum/telemetry"}
if VEHICLE not in ROLE_OK:
    raise SystemExit(f"VEHICLE_ROLE must be ASV or AUV, got {VEHICLE}")
TOPIC = ROLE_OK[VEHICLE]

DEFAULT_MQTT = os.environ.get("MQTT_URL", "wss://broker.emqx.io:8084/mqtt")
INTERVAL = 5.0          # publish cadence (seconds)
STALE_AFTER = 15.0     # no update -> dashboard marks offline

telemetry = {
    "lat": None, "lng": None, "speed": 0.0, "heading": 0.0,
    "battery": 0.0, "depth": 0.0, "signal": 0, "mode": "STANDBY", "ts": None,
}
last_mav = 0.0
stop = False


def on_signal(sig, frame):
    global stop
    stop = True


def publish(client):
    telemetry["ts"] = time.time()
    client.publish(TOPIC, json.dumps(telemetry), qos=0)


def main():
    global last_mav
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", choices=["serial", "udp"], default="serial")
    parser.add_argument("--device", default="/dev/ttyACM0")
    parser.add_argument("--baud", type=int, default=115200)
    parser.add_argument("--udp", default="0.0.0.0:14550")
    args = parser.parse_args()

    signal.signal(signal.SIGINT, on_signal)
    signal.signal(signal.SIGTERM, on_signal)

    # --- MQTT client ---
    client = mqtt.Client()
    client.username_pw_set(os.environ.get("MQTT_USER"), os.environ.get("MQTT_PASS"))
    client.connect(DEFAULT_MQTT, keepalive=60)
    client.loop_start()
    print(f"[bridge] {VEHICLE} -> MQTT {DEFAULT_MQTT} topic {TOPIC}", flush=True)

    # --- MAVLink connection ---
    if args.source == "serial":
        conn = mavutil.mavlink_connection(args.device, baud=args.baud)
    else:
        conn = mavutil.mavlink_connection(args.udp)
    conn.wait_heartbeat()
    print(f"[bridge] MAVLink heartbeats OK (sysid {conn.target_system})", flush=True)

    last_pub = 0.0
    while not stop:
        try:
            msg = conn.recv_match(blocking=False, timeout=0.5)
        except Exception as e:  # noqa: BLE001
            print(f"[bridge] recv error: {e}", flush=True)
            time.sleep(1)
            continue

        if msg is not None:
            last_mav = time.time()
            mtype = msg.get_type()

            if mtype == "HEARTBEAT":
                mode = mavutil.mode_string_v10(msg)
                telemetry["mode"] = mode or telemetry.get("mode", "STANDBY")
                # Rough link quality proxy (0..100). Prefer RSSI if present.
                telemetry["signal"] = max(0, min(100, msg.get_sys_status_count() % 100)) if hasattr(msg, "get_sys_status_count") else 100

            elif mtype == "GLOBAL_POSITION_INT":
                # DEG_INT32: / 1e7 -> degrees
                telemetry["lat"] = msg.lat / 1e7
                telemetry["lng"] = msg.lon / 1e7
                if VEHICLE == "AUV":
                    # altitude above mean sea level; approximate depth relative to
                    # surface. Left-0 at boot; real depth needs baro setup.
                    telemetry["depth"] = abs(msg.relative_alt) / 1000.0  # mm -> m

            elif mtype == "VFR_HUD":
                telemetry["speed"] = msg.groundspeed            # m/s
                telemetry["heading"] = msg.heading              # deg 0-360

            elif mtype == "SYS_STATUS":
                if msg.voltage_battery > 0:
                    # relative to empty 9.6V / full 12.6V (3S LiPo). Tune per pack.
                    vmin, vmax = 9.6, 12.6
                    telemetry["battery"] = max(0.0, min(100.0,
                        (msg.voltage_battery / 1000.0 - vmin) / (vmax - vmin) * 100.0))
                if msg.signal_quality < 255:
                    telemetry["signal"] = msg.signal_quality

        now = time.time()
        if now - last_pub >= INTERVAL:
            publish(client)
            last_pub = now

    print("[bridge] shutting down", flush=True)
    client.loop_stop()
    client.disconnect()


if __name__ == "__main__":
    main()
