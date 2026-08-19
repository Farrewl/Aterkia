/**
 * ============================================================================
 * ATERKIA ROBOTICS TEAM — EXPRESS BACKEND REST API SERVER
 * ============================================================================
 * 
 * REST API untuk website profil Aterkia (Mencakup Divisi ASV & AUV).
 * ============================================================================
 */

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import { initDb } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// In-Memory Database Fallback (for legacy endpoints)
const db = {
  sponsors: [
    {
      id: "sp-01",
      name: "Universitas / Fakultas Teknik",
      role: "Home Institution & Funding Partner",
      logo: "/images/sponsors/univ-logo.png",
      website: "https://example.edu/"
    },
    {
      id: "sp-02",
      name: "Pusat Riset Robotika Maritim",
      role: "Research Facility Partner",
      logo: "/images/sponsors/maritime-lab.png",
      website: "#"
    },
    {
      id: "sp-03",
      name: "Apex Composite Technologies",
      role: "Carbon Fiber Sponsor",
      logo: "/images/sponsors/apex-composite.png",
      website: "#"
    }
  ],

  robots: [
    {
      id: "asv-baruna",
      name: "Aterkia ASV: BARUNA",
      category: "ASV (Surface)",
      typeLabel: "Autonomous Surface Vehicle",
      version: "Generasi 2025/2026",
      image: "/images/robots/asv-baruna.jpg",
      description: "Wahana kapal cepat otonom permukaan laut dengan lambung ganda (Catamaran) berbahan komposit serat karbon."
    },
    {
      id: "auv-cakra",
      name: "Aterkia AUV: CAKRA SUBSEA",
      category: "AUV (Underwater)",
      typeLabel: "Autonomous Underwater Vehicle",
      version: "Generasi 2025/2026",
      image: "/images/robots/auv-cakra.jpg",
      description: "Wahana robot selam bawah air nirawak otonom dengan tabung tekanan akrilik kedap air IP68 dan konfigurasi 6 pendorong (thruster)."
    }
  ],

  team: [
    {
      id: "lead-01",
      fullName: "Muhammad Rayhan Pratama",
      role: "General Team Leader & Project Manager",
      division: "Leadership",
      photo: "/images/team/lead-rayhan.jpg",
      bio: "Memimpin koordinasi riset terpadu divisi ASV dan AUV.",
      socials: {
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
        instagram: "https://instagram.com/",
        email: "leader@aterkia.org"
      }
    },
    {
      id: "asv-01",
      fullName: "Farhan Arya Maulana",
      role: "ASV Division Lead",
      division: "ASV Division",
      photo: "/images/team/asv-farhan.jpg",
      bio: "Bertanggung jawab atas riset navigasi otonom kapal permukaan (ASV).",
      socials: {
        linkedin: "https://linkedin.com/",
        email: "asv@aterkia.org"
      }
    },
    {
      id: "auv-01",
      fullName: "Satria Dewantara",
      role: "AUV Division Lead",
      division: "AUV Division",
      photo: "/images/team/auv-satria.jpg",
      bio: "Memimpin perancangan robot selam bawah air otonom (AUV).",
      socials: {
        linkedin: "https://linkedin.com/",
        email: "auv@aterkia.org"
      }
    }
  ],

  news: [
    {
      id: "news-01",
      title: "Uji Coba Lapangan Perdana Wahana ASV & AUV Tim Aterkia",
      category: "Riset & Uji Coba",
      date: "14 Agustus 2026",
      readTime: "3 Menit Baca",
      image: "/images/news/sea-trial-test.jpg",
      snippet: "Pengujian terpadu wahana kapal permukaan dan robot selam di fasilitas kolam pengujian maritim."
    }
  ],

  inquiries: []
};

// Legacy API Endpoints
app.get('/', (req, res) => {
  res.json({
    status: "online",
    team: "Aterkia Maritime Robotics Team (ASV & AUV)",
    timestamp: new Date().toISOString()
  });
});

app.get('/api/team', (req, res) => res.json({ success: true, data: db.team }));
app.get('/api/robots', (req, res) => res.json({ success: true, data: db.robots }));
app.get('/api/news', (req, res) => res.json({ success: true, data: db.news }));
app.get('/api/sponsors', (req, res) => res.json({ success: true, data: db.sponsors }));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Harap isi nama, email, dan pesan." });
  }
  db.inquiries.push({ name, email, message, date: new Date().toISOString() });
  res.json({ success: true, message: "Pesan berhasil diterima." });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`[Aterkia Backend] Server running on port ${PORT}`);
      console.log(`[Aterkia Backend] Auth endpoints: /api/auth/*`);
    });
  } catch (err) {
    console.error('[Aterkia Backend] Failed to start:', err);
    process.exit(1);
  }
};

startServer();