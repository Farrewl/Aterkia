import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const pinIcon = L.divIcon({
  className: '',
  html: `<svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1C9.3 1 3 7.3 3 15c0 10.5 14 28 14 28s14-17.5 14-28C31 7.3 24.7 1 17 1z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
    <circle cx="17" cy="15" r="6" fill="white"/>
  </svg>`,
  iconSize: [34, 44],
  iconAnchor: [17, 44],
  popupAnchor: [0, -40],
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

    // Ukur ulang + kunci viewport ke pin BEBBERAP saat setelah accordion buka,
    // supaya buka meninggalkan ukuran container yang salah/tile misaligned.
    timers.push(requestAnimationFrame(() => fix()));
    timers.push(setTimeout(fix, 300));
    timers.push(setTimeout(fix, 650));

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
          <strong>URDC Undip</strong>
          <br />
          Undip Robotic Development Center, Tembalang, Semarang
        </Popup>
      </Marker>
      <Recenter coords={coords} />
    </MapContainer>
  );
}