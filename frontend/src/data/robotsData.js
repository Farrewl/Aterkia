// Data robot — ganti foto di public/images/robots/
export const robotCategories = ["Semua", "ASV", "AUV"];

export const robotsData = [
  {
    id: "asv-baruna",
    name: "Baruna",
    category: "ASV",
    typeLabel: "Autonomous Surface Vehicle",
    year: "2025 — Sekarang",
    status: "Aktif",
    tagline: "Kapal Cepat Permukaan Otonom",
    image: "/images/robots/robot-asv-1.png",
    description: "Kapal otonom generasi terbaru dengan lambung Catamaran serat karbon. Dilengkapi kamera AI dan sensor navigasi untuk deteksi rintangan secara mandiri.",
    specs: {
      "Kategori": "Kapal Permukaan (ASV)",
      "Tahun": "2025/2026",
      "Lambung": "Catamaran Carbon Fiber",
      "Navigasi": "Computer Vision & Dual GPS-RTK",
      "Propulsi": "Dual Brushless Thrusters",
      "Kompetisi": "KKCTBN, RoboBoat"
    },
    achievements: ["Juara 1 KKCTBN", "Navigasi Otonom Terbaik"]
  },
  {
    id: "auv-cakra",
    name: "Cakra Subsea",
    category: "AUV",
    typeLabel: "Autonomous Underwater Vehicle",
    year: "2025 — Sekarang",
    status: "Aktif",
    tagline: "Robot Selam Bawah Air Otonom",
    image: "/images/robots/robot-av-subsea.png",
    description: "Robot selam dengan tabung akrilik tahan tekanan air (IP68). Memiliki 6 pendorong untuk gerak bebas 6 arah (6-DOF) dan kamera bawah air.",
    specs: {
      "Kategori": "Robot Selam (AUV)",
      "Tahun": "2025/2026",
      "Struktur": "IP68 Acrylic Enclosure",
      "Kendali": "6-DOF Vectoring Thrusters",
      "Sensor": "Underwater Camera & Depth Sensor",
      "Kompetisi": "SAUVC, RoboSub"
    },
    achievements: ["Finalis SAUVC Singapore"]
  },
  {
    id: "asv-nala",
    name: "Nala-01",
    category: "ASV",
    typeLabel: "Autonomous Surface Vehicle",
    year: "2024",
    status: "Legacy",
    tagline: "Kapal Monohull Pertama",
    image: "/images/robots/robot-asv-nala.png",
    description: "Wahana kapal pertama yang dirancang Aterkia untuk KKCTBN 2024 dengan lambung Deep-V Monohull fiberglass.",
    specs: {
      "Kategori": "Kapal Permukaan (ASV)",
      "Tahun": "2024",
      "Lambung": "Deep-V Monohull Fiberglass",
      "Navigasi": "Waypoint GPS & IMU",
      "Propulsi": "Twin Brushless Thrusters",
      "Kompetisi": "KKCTBN 2024"
    },
    achievements: ["Nominasi Desain Lambung Terbaik"]
  },
  {
    id: "auv-makara",
    name: "Makara-X",
    category: "AUV",
    typeLabel: "Autonomous Underwater Vehicle",
    year: "2026/2027 (R&D)",
    status: "Dalam Pengembangan",
    tagline: "Robot Selam Generasi Baru",
    image: "/images/robots/robot-auv-makara.png",
    description: "Riset robot selam dengan manipulator gripper dan sensor akustik. Masih dalam tahap pengembangan.",
    specs: {
      "Kategori": "Robot Selam (AUV)",
      "Tahun": "2026/2027",
      "Struktur": "Modular Enclosure",
      "Sensor": "Hydrophone & Underwater Vision",
      "Propulsi": "8x Thruster Matrix",
      "Kompetisi": "Riset"
    },
    achievements: []
  }
];
