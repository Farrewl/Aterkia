# Aterkia RoboBoat — Website Profil Resmi (Universitas Diponegoro)

> Website profil resmi untuk **Aterkia Maritime Robotics Team**, Universitas Diponegoro (Undip).
> Dibangun dengan **React 18 + Vite + Tailwind CSS**, dirancang modern, responsif, dan multi-page routing.

---

## Struktur Halaman Website

| Halaman | Route | Deskripsi |
|:--------|:------|:----------|
| **Home** | `/` | Hero dengan ilustrasi split-view ASV & AUV, sponsor marquee, carousel robot (3 card), carousel berita (4 card) |
| **About** | `/about` | Visi & Misi, pencapaian/kompetisi, nilai-nilai tim |
| **History** | `/history` | Timeline perjalanan Aterkia sejak 2023 |
| **Robot** | `/robots` | Arsip lengkap robot (ASV & AUV) dengan filter & spesifikasi |
| **Tim** | `/team` | Struktur organisasi, filter divisi, foto & profil anggota |
| **Contact** | `/contact` | Form kontak, info sekretariat, kolaborasi & sponsorship |

---

## Tech Stack

| Layer | Teknologi |
|:------|:----------|
| Frontend | React 18, Vite 5, React Router DOM 7, Tailwind CSS 3, Lucide React |
| Backend | Node.js, Express.js, CORS |
| Database | In-memory fallback (siap migrasi ke PostgreSQL/Supabase) |

---

## Cara Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/aterkia-website.git
cd aterkia-website

# 2. Install & jalankan Frontend
cd frontend
npm install
npm run dev          # → http://localhost:5173

# 3. (Opsional) Install & jalankan Backend
cd ../backend
npm install
node server.js       # → http://localhost:5000
```

---

## Arsitektur Direktori

```
Aterkia/
├── .gitignore
├── README.MD
│
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   └── profile.png          ← Logo tim (navbar)
│   │   └── images/
│   │       ├── team/                ← Foto anggota tim
│   │       ├── robots/              ← Foto robot
│   │       ├── news/                ← Foto berita
│   │       └── sponsors/            ← Logo sponsor
│   ├── src/
│   │   ├── components/              ← UI reusable
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ImageWithFallback.jsx
│   │   │   ├── RobotModal.jsx
│   │   │   ├── NewsDrawer.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── pages/                   ← Halaman
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── RobotsPage.jsx
│   │   │   ├── TeamPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── data/                    ← Semua data konten
│   │   │   ├── siteConfig.js
│   │   │   ├── aboutData.js
│   │   │   ├── historyData.js
│   │   │   ├── robotsData.js
│   │   │   ├── teamData.js
│   │   │   ├── newsData.js
│   │   │   ├── sponsorsData.js
│   │   ├── App.jsx                  ← React Router setup
│   │   ├── main.jsx
│   │   └── index.css                ← Tailwind + custom utilities
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── server.js                    ← Express REST API
│   ├── database/
│   │   └── schema.sql               ← PostgreSQL schema (Supabase-ready)
│   └── package.json
```

---

## Panduan Update Konten

### Foto Anggota Tim
1. Simpan foto ke `frontend/public/images/team/` (contoh: `lead-rayhan.jpg`)
2. Edit `frontend/src/data/teamData.js` → ubah field `photo` pada anggota yang bersangkutan

### Foto Robot
1. Simpan foto ke `frontend/public/images/robots/`
2. Edit `frontend/src/data/robotsData.js` → ubah field `image`

### Foto Berita
1. Simpan foto ke `frontend/public/images/news/`
2. Edit `frontend/src/data/newsData.js` → ubah field `image`

### Logo Sponsor
1. Simpan logo ke `frontend/public/images/sponsors/`
2. Edit `frontend/src/data/sponsorsData.js` → ubah field `logo`

### History Timeline
Edit `frontend/src/data/historyData.js` → tambah/ubah entri timeline

### Visi, Misi & Prestasi
Edit `frontend/src/data/aboutData.js`

---

## Catatan Penting

- **Video hero** (`frontend/public/videos/`) tidak di-commit ke GitHub karena ukuran besar. Upload secara manual atau gunakan CDN/external hosting.
- **Gambar belum tersedia** — semua folder gambar (`team/`, `robots/`, `news/`, `sponsors/`) masih kosong. Component `ImageWithFallback` akan menampilkan fallback (inisial/ikon) sampai foto diunggah.
- **Backend** menggunakan in-memory database + PostgreSQL fallback. Untuk production, pastikan PostgreSQL tersedia.

---

## Lisensi

Proyek internal Tim Aterkia — Universitas Diponegoro.
