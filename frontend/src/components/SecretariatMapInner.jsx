import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const pinIcon = L.divIcon({
  className: '',
  html: `<svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));">
    <path d="M20 1C10.7 1 3.2 8.6 3.2 18c0 11.6 16.8 30.5 16.8 30.5S36.8 29.6 36.8 18C36.8 8.6 29.3 1 20 1z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
    <circle cx="20" cy="18" r="6.5" fill="white"/>
    <circle cx="17.2" cy="15.6" r="2.2" fill="#dc2626" opacity="0.55"/>
  </svg>`,
  iconSize: [40, 50],
  iconAnchor: [20, 48],
  popupAnchor: [0, -42],
});

function Recenter({ coords }) {
  const map = useMap();
  const lat = coords.lat;
  const lng = coords.lng;

  useEffect(() => {
    const timers = [];

    const fix = () => {
      map.invalidateSize();
      map.panTo([lat, lng], { animate: false });
    };

    // Map di-render saat accordion (max-height) mulai terbuka — container belum
    // punya tinggi final. Ukur ulang beberapa kali sampai transisi selesai agar
    // semua tile ter-render (menghilangkan kotak putih sebagian).
    timers.push(requestAnimationFrame(() => fix()));
    timers.push(setTimeout(fix, 300));
    timers.push(setTimeout(fix, 650));
    timers.push(setTimeout(fix, 900)); // akhir transisi max-height duration-500

    const el = map.getContainer();
    const ro = new ResizeObserver(() => fix());
    ro.observe(el);

    const onDragEnd = () => {
      map.panTo([lat, lng], { animate: true, duration: 0.35, easeLinearity: 0.15 });
    };
    map.on('dragend', onDragEnd);

    return () => {
      timers.forEach((t) => {
        if (typeof t === 'number') cancelAnimationFrame(t);
        else clearTimeout(t);
      });
      ro.disconnect();
      map.off('dragend', onDragEnd);
    };
  }, [map, lat, lng]);

  return null;
}

export function LeafletMap({ coords, zoom = 15 }) {
  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={zoom}
      minZoom={zoom - 4}
      maxZoom={19}
      scrollWheelZoom={false}
      dragging
      style={{ width: '100%', height: '100%' }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lng]} icon={pinIcon}>
        <Popup>
          <strong>Aterkia Robotics Activity Center</strong>
          <br />
          Pusat kegiatan robotik Aterkia
        </Popup>
      </Marker>
      <Recenter coords={coords} />
    </MapContainer>
  );
}