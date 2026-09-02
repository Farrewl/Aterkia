# Aterkia RoboBoat — Website Profil Resmi (Universitas Diponegoro)

> Website profil resmi untuk **Aterkia Maritime Robotics Team**, Universitas Diponegoro (Undip).
> Dibangun dengan **React 18 + Vite + Tailwind CSS + Supabase**, dirancang modern, responsif, dan multi-page routing.
> Repo ini **frontend-only**: backend Express yang lama sudah dihapus — autentikasi, database, dan storage kini sepenuhnya ditangani Supabase.

---

## Tech Stack

| Layer        | Teknologi |
|:-------------|:----------|
| Frontend     | React 18, Vite 5, React Router 7, Tailwind CSS 3, Lucide React |
| Maps         | react-leaflet 4 + Leaflet (lazy-loaded, hanya dimuat saat detail Research HQ dibuka) |
| Auth & DB    | Supabase Auth (Google OAuth), PostgreSQL, Storage |
| Contact      | Formspree + Supabase Storage |
| Anti-bot     | Cloudflare Turnstile + Supabase Edge Function `verify-turnstile` |
| 3D Robot     | @google/model-viewer (GLB) |

---

## Halaman & Route

| Halaman       | Route       | Kelas akses | Deskripsi |
|:--------------|:------------|:------------|:----------|
| **Home**      | `/`         | publik      | Hero ASV & AUV, sponsor marquee, carousel robot & berita, roadmap |
| **About**     | `/about`    | publik      | Visi & Misi, pencapaian, divisi, kegiatan, roadmap, kenapa Aterkia |
| **History**   | `/history`  | publik      | Timeline perjalanan sejak 2023 (interaktif berbasis scroll) |
| **Robot**     | `/robots`   | publik      | Arsip robot (ASV & AUV), filter, spesifikasi, model 3D |
| **Tim**       | `/team`     | publik      | Struktur organisasi, jalur teknis/nonteknis, divisi, profil anggota |
| **Contact**   | `/contact`  | publik      | Form kontak, sekretariat (map), sponsor, lampiran |
| **Login**     | `/login`    | publik      | Login Google + Turnstile |
| **Profile**   | `/profile`  | user/admin  | Profil pengguna terautentikasi |
| **Dashboard** | `/dashboard`| user/admin  | Monitoring beranda (lazy-loaded) |
| *404*         | `*`         | publik      | NotFoundPage |

---

## Cara Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/aterkia-website.git
cd aterkia-website

# 2. Install dependensi
cd frontend
npm install

# 3. Siapkan environment
cp .env.example .env          # lalu isi nilai sesuai kebutuhan

# 4. Jalankan dev server
npm run dev                   # → http://localhost:5173

# Build produksi
npm run build
npm run preview
```

> `.env` **tidak boleh di-commit** (sudah di-abuse di `.gitignore`). Hanya `.env.example` (placeholder) yang di-track.

---

## Konfigurasi Environment (`frontend/.env`)

| Variabel | Deskripsi |
|:---------|:----------|
| `VITE_SUPABASE_URL` | URL project Supabase (mis. `https://xxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Anon (publik) key — **jangan pernah** pakai `service_role` di frontend |
| `VITE_SUPABASE_CONTACT_BUCKET` | Bucket Storage publik untuk lampiran (default: `Aterkia`) |
| `VITE_FORMSPREE_ID` | ID form Formspree atau URL lengkap |
| `VITE_TURNSTILE_SITE_KEY` | Site key Turnstile (bukan secret) |

---

## Setup Supabase

1. Buat project Supabase gratis.
2. Di **SQL Editor**, jalankan `supabase/schema.sql` (membuat tabel `profiles`, RLS, trigger role protection).
3. **Auth → Providers** → aktifkan **Google**, tambahkan callback URL:
   - Lokal: `http://localhost:5173/login`
   - Produksi: `https://<domain>/login`
4. Buat bucket publik **`Aterkia`**, lalu jalankan `supabase/storage-policies.sql` (policy upload anonim ke `contact/` dengan batas tipe & ukuran).
5. Deploy Edge Function **Turnstile** (verifikasi server-side):
   ```bash
   supabase login
   supabase functions deploy verify-turnstile
   supabase secrets set TURNSTILE_SECRET_KEY=<secret-key-turnstile>
   ```
   - Fungsi: `supabase/functions/verify-turnstile/index.ts`
   - Ukuran lampiran dibatasi 3 file, masing-masing maksimal 25 MB, tipe PDF/DOC/DOCX/PNG/JPG/ZIP.

---

## Arsitektur Direktori

```
Aterkia/
├── .gitignore                     ← hindari kebocoran .env / secret
├── README.MD
│
├── frontend/
│   ├── public/
│   │   ├── assets/                ← profile.png (logo), *.glb (model 3D robot)
│   │   ├── images/
│   │   │   ├── activities/        ← ⚠ foto kegiatan (siapkan di sini)
│   │   │   ├── team/              ← foto anggota tim
│   │   │   ├── robots/            ← foto robot
│   │   │   ├── news/              ← foto berita
│   │   │   └── sponsors/          ← logo sponsor
│   │   └── videos/                ← video (tidak di-commit, upload manual/CDN)
│   ├── src/
│   │   ├── components/            ← UI reusable
│   │   │   ├── auth/              ← ProtectedRoute, UserAvatar
│   │   │   ├── Navbar.jsx, Footer.jsx, Preloader.jsx, ScrollToTop.jsx
│   │   │   ├── ImageWithFallback.jsx
│   │   │   ├── motion.jsx         ← TiltCard, Spotlight, CountUp, useReveal
│   │   │   ├── OrgChart.jsx       ← bagan organisasi (Tim)
│   │   │   ├── ActivitiesSection.jsx, Divisions.jsx, RoadmapSection.jsx
│   │   │   ├── RobotModal.jsx, GLBViewer.jsx
│   │   │   └── SecretariatMap.jsx / SecretariatMapInner.jsx (leaflet)
│   │   ├── pages/                 ← halaman (TeamPage.jsx + CSS lama SUDAH dihapus)
│   │   │   ├── auth/              ← DashboardPage, ProfilePage
│   │   ├── data/                  ← semua konten di sini (lihat "Panduan Update")
│   │   ├── context/AuthContext.jsx ← autentikasi + role
│   │   ├── hooks/index.js
│   │   ├── services/supabase.js   ← supabase client, upload, turnstile verify
│   │   ├── App.jsx                ← React Router
│   │   ├── main.jsx
│   │   └── index.css              ← Tailwind + custom utilities (reveal, photo fan)
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── supabase/
    ├── schema.sql                 ← tabel profiles + RLS
    ├── storage-policies.sql       ← policy upload lampiran
    └── functions/verify-turnstile/index.ts ← verifikasi Turnstile
```

> **Catatan:** `TeamPage.css` (10.788 baris, sumber lag) sudah **dihapus** dan seluruh halaman Tim di-rebuild murni Tailwind. Jangan menambah CSS besar per-halaman; gunakan utility Tailwind + keyframes global di `index.css`.

---

## Panduan Update Konten (untuk pengelola selanjutnya)

Semua konten disimpan di `frontend/src/data/*.js`. Foto disimpan di `frontend/public/images/<kategori>/`.

### Anggota Tim
1. Simpan foto ke `frontend/public/images/team/<divisi>/` (mis. `auv/`, `president/`).
2. Edit `frontend/src/data/teamData.js` → 4 blok divisi (`ASV`, `AUV`, `SECRETARY_TREASURER`, `OFFICIAL`).
   - `advisor` / `chair` / `viceChair`: profil pemimpin & pembimbing.
   - `subdivisions`: `MECHANICAL`, `ELKAPRO`.
   - `members`: `[id, fullName, role]` + `photo` otomatis.
3. Wajib punya `photo`, `role`, `expertise`, `bio`, `instagram`.

### Foto Kegiatan (About → "Kegiatan Aterkia")
1. Untuk tiap aktivitas, simpan **3 foto** ke `frontend/public/images/activities/` (contoh: `design-hull.jpg`, `testing-pool.jpg`, ...).
2. Edit `frontend/src/components/ActivitiesSection.jsx` → isi array `photos` pada tiap kartu.
3. Foto muncul sebagai **stack polaroid yang melebar saat hover** (`photo-stack`/`photo-layer`, reuse dari HistoryPage). Kosongkan `photos: []` jika belum ada foto — kartu tetap tampil dengan ikon.

### Robot
- Foto: `frontend/public/images/robots/`, data: `frontend/src/data/robotsData.js` (field `image`, `model3D` → `.glb` di `public/assets/`).

### Berita & Sponsor
- Berita: `frontend/public/images/news/` + `frontend/src/data/newsData.js`.
- Sponsor: `frontend/public/images/sponsors/` + `frontend/src/data/sponsorsData.js` (disable `url` untuk non-link).

### Timeline History
- Edit `frontend/src/data/historyData.js`. Format: `year`, `title`, `description`, `photos[]` (maks 5 untuk efek fan), `milestones[]`. Urutan **terbaru di atas**.

### Visi, Misi & Prestasi
- Edit `frontend/src/data/aboutData.js` (visi, misi, achievements, whyAterkia, slogan, substitle, intro).

### Pin Map Sekretariat (Contact)
- Edit `frontend/src/data/siteConfig.js` → `coords: { lat, lng }`. Tile OSM, zoom awal 15, bisa di-drag (menuaut kembali ke pin di `dragend`).

---

## Panduan Developer

### Design Tokens yang Dipakai
- Warna marine: palet `olympic-*` (500 `#005EB8`, 900 `#0A1628`, 950 `#060D1A`) di `tailwind.config.js`.
- Font: `font-display` (Plus Jakarta Sans) untuk heading, `font-sans` (Inter) untuk body.
- Utility global: `gradient-text`, `reveal` / `reveal-left` / `reveal-right` / `reveal-zoom`, `animate-*` (fade-up, float, bubble-rise, ...).

### Pola Umum yang Wajib Diikuti
- **Semua halaman Tailwind**: gunakan utility class, bukan CSS file custom per-halaman.
- **Animasi scroll**: pakai `reveal`/`reveal-zoom` + `useReveal()` dari `components/motion.jsx`.
- **Gambar dengan fallback**: selalu pakai `ImageWithFallback` (fallback inisial/ikon bila file hilang).
- **Hero baru**: tambahkan ke `Navbar.jsx` + route di `App.jsx`.
- **Lazy-load dependency berat**: contoh leaflet (Contact) & DashboardPage — jangan tarik ke bundle utama.

### Verifikasi
```bash
cd frontend
npx vite build        # pastikan hijau sebelum commit
```

---

## Catatan Penting

- **Jangan commit `.env`** atau secret apa pun (sudah di-ignore; hanya `.env.example` yang boleh masuk repo).
- Video hero `frontend/public/videos/` tidak di-commit (ukuran besar) — unggah manual atau hosting CDN.
- Supabase menangani Auth, DB, dan Storage. **Anon key saja cukup di frontend**; `service_role` hanya untuk server/admin.
- `RecruitmentPage.jsx` & `recruitmentData.js` sudah dihapus (tidak punya route) — jika fitur rekrutmen dibutuhkan lagi, bangun ulang via route di `App.jsx`.

---

## Lisensi

Proyek internal Tim Aterkia — Universitas Diponegoro.