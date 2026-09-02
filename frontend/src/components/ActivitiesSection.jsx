import React from 'react';
import { Anchor, Waves, Cpu, FlaskConical, Activity, Users2, Camera } from 'lucide-react';

const ACTIVITIES = [
  {
    title: 'Desain & Konstruksi',
    description:
      'Merancang dan membangun hull kapal (ASV) serta robot bawah air (AUV) — mulai dari struktur mekanik, kelistrikan, hingga integrasi sistem secara menyeluruh.',
    icon: Anchor,
    photos: [],
  },
  {
    title: 'Pemrograman & AI',
    description:
      'Mengembangkan sistem kendali, navigasi otonom, computer vision, dan SLAM agar kapal dapat bernavigasi serta mendeteksi rintangan secara mandiri.',
    icon: Cpu,
    photos: [],
  },
  {
    title: 'Uji Coba Lapangan',
    description:
      'Menguji kendaraan di kolam, sungai, dan laut untuk memvalidasi sensor, kestabilan, serta performa di kondisi nyata sebelum bertanding.',
    icon: Waves,
    photos: [],
  },
  {
    title: 'Kompetisi',
    description:
      'Berlaga di kompetisi nasional dan internasional seperti KKCTBN, RoboBoat, dan SAUVC untuk membuktikan karya serta kemampuan tim.',
    icon: Activity,
    photos: [],
  },
  {
    title: 'Riset & Pengembangan',
    description:
      'Mengeksplorasi integrasi sensor baru dan algoritma terbaru, lalu mendokumentasikan setiap temuan untuk iterasi desain berikutnya.',
    icon: FlaskConical,
    photos: [],
  },
  {
    title: 'Pengembangan Tim',
    description:
      'Mentoring anggota baru, mengadakan workshop, dan berbagi pengetahuan antar-divisi agar kapabilitas teknis tim terus bertumbuh.',
    icon: Users2,
    photos: [],
  },
];

export default function ActivitiesSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#060d1a] via-olympic-950 to-[#060d1a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[25%] right-[8%] w-64 h-64 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 reveal">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
            <Activity className="w-4 h-4" />
            Apa yang Kami Lakukan
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Kegiatan{' '}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Aterkia</span>
          </h2>
          <p className="text-white/40 text-sm font-light mt-3">
            Dari bangku desain hingga panggung kompetisi internasional — ini kegiatan yang kami jalankan sehari-hari.
            Arahkan kursor ke foto kegiatan untuk melihat detailnya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIVITIES.map((item, idx) => {
            const Icon = item.icon;
            const photos = (item.photos || []).slice(0, 3);
            return (
              <div key={item.title} className="reveal-zoom" style={{ transitionDelay: `${idx * 80}ms` }}>
                {/* `.log-card` reuses the global hover-fan photo pattern (see index.css) */}
                <div className="log-card group relative h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 hover:border-sky-500/25 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                  {/* Photo stack — mirrors HistoryPage polaroid fan */}
                  {photos.length > 0 && (
                    <div className="photo-stack relative h-44 mb-6">
                      {photos.map((src, pIdx) => (
                        <div
                          key={pIdx}
                          className={`photo-layer ${pIdx === photos.length - 1 ? 'photo-layer-front' : ''}`}
                          style={{ zIndex: pIdx + 1 }}
                        >
                          <img src={src} alt="" loading="lazy" />
                        </div>
                      ))}
                      <span className="photo-sonar" aria-hidden="true" />
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>

                  {photos.length === 0 && (
                    <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-white/25">
                      <Camera className="w-3.5 h-3.5" /> Foto kegiatan menyusul
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
