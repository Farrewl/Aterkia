// Data Anggota Tim Aterkia
// Ganti foto dengan memasukkan file ke public/images/team/ dan update baris photo
export const teamDivisions = [
  { id: "All", label: "Semua Anggota" },
  { id: "Leadership", label: "Leadership" },
  { id: "ASV Division", label: "Divisi ASV" },
  { id: "AUV Division", label: "Divisi AUV" },
  { id: "Secretary & Treasurer", label: "Secretary & Treasurer" },
  { id: "Official", label: "Official" },
  { id: "Software", label: "Software" },
  { id: "Electrical", label: "Electrical" },
  { id: "Mechanical", label: "Mechanical" },
  { id: "Media & Creative", label: "Media" }
];

export const teamMembers = [
  {
    id: "lead-01",
    fullName: "Muhammad Rayhan Pratama",
    role: "General Team Leader",
    division: "Leadership",
    photo: "",
    bio: "Memimpin koordinasi riset divisi ASV dan AUV serta manajemen tim.",
    specialty: "Systems Engineering",
    socials: {
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      instagram: "https://instagram.com/",
      email: "leader@aterkia-undip.org"
    }
  },
  {
    id: "lead-02",
    fullName: "Annisa Rahmawati Putri",
    role: "Vice Leader & Operations",
    division: "Leadership",
    photo: "",
    bio: "Mengelola operasional tim, jadwal pengujian lapangan, dan logistik.",
    specialty: "Operations Management",
    socials: {
      linkedin: "https://linkedin.com/",
      email: "operations@aterkia-undip.org"
    }
  },
  {
    id: "asv-01",
    fullName: "Farhan Arya Maulana",
    role: "ASV Division Lead",
    division: "ASV Division",
    photo: "",
    bio: "Fokus riset navigasi otonom kapal permukaan dan penentuan jalur.",
    specialty: "ROS2 & Path Planning",
    socials: {
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      email: "asv@aterkia-undip.org"
    }
  },
  {
    id: "asv-02",
    fullName: "Bayu Tri Pamungkas",
    role: "ASV Hull & Hydrodynamics",
    division: "ASV Division",
    photo: "",
    bio: "Perancangan lambung Catamaran serat karbon untuk kapal ASV.",
    specialty: "Catamaran CFD & Infusion",
    socials: {
      linkedin: "https://linkedin.com/",
      email: "bayu@aterkia-undip.org"
    }
  },
  {
    id: "auv-01",
    fullName: "Satria Dewantara",
    role: "AUV Division Lead",
    division: "AUV Division",
    photo: "",
    bio: "Perancangan robot selam bawah air dan kendali 6-DOF.",
    specialty: "Underwater Robotics & SAUVC",
    socials: {
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      email: "auv@aterkia-undip.org"
    }
  },
  {
    id: "auv-02",
    fullName: "Citra Amelia Lestari",
    role: "AUV Pressure Hull",
    division: "AUV Division",
    photo: "",
    bio: "Perancangan tabung akrilik tahan air IP68 dan sistem daya apung.",
    specialty: "Pressure Vessel & Buoyancy",
    socials: {
      linkedin: "https://linkedin.com/",
      email: "citra@aterkia-undip.org"
    }
  },
  {
    id: "soft-01",
    fullName: "Dimas Aditya Wicaksono",
    role: "Computer Vision & AI",
    division: "Software",
    photo: "",
    bio: "Pengembangan model deteksi objek pelampung dan target bawah air.",
    specialty: "PyTorch & TensorRT",
    socials: {
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      email: "vision@aterkia-undip.org"
    }
  },
  {
    id: "elec-01",
    fullName: "Rizky Dwi Nugroho",
    role: "Lead Electrical",
    division: "Electrical",
    photo: "",
    bio: "Desain sistem kelistrikan, papan sirkuit PCB, dan distribusi daya.",
    specialty: "PDU & BMS Design",
    socials: {
      linkedin: "https://linkedin.com/",
      email: "electrical@aterkia-undip.org"
    }
  },
  {
    id: "mech-01",
    fullName: "Ilham Fathurrahman",
    role: "Lead Mechanical",
    division: "Mechanical",
    photo: "",
    bio: "Fabrikasi komposit serat karbon dan perakitan mekanik robot.",
    specialty: "Composites & SolidWorks",
    socials: {
      linkedin: "https://linkedin.com/",
      email: "mechanical@aterkia-undip.org"
    }
  },
  {
    id: "media-01",
    fullName: "Nabila Putri Salsabila",
    role: "Lead Media & Creative",
    division: "Media & Creative",
    photo: "",
    bio: "Dokumentasi visual, video uji coba, dan publikasi media sosial.",
    specialty: "Videography & Branding",
    socials: {
      instagram: "https://instagram.com/",
      email: "media@aterkia-undip.org"
    }
  }
];

// Struktur divisi untuk halaman Team.
// Nama dan foto di bawah ini sengaja berupa placeholder agar mudah diperbarui.
export const divisionTeams = {
  ASV: {
    id: "ASV",
    name: "ASV",
    fullName: "Autonomous Surface Vehicle",
    tagline: "Merancang kapal permukaan otonom yang cerdas, tangguh, dan siap berkompetisi.",
    advisor: {
      id: "asv-advisor",
      fullName: "Nama Dosen Pembimbing ASV",
      role: "Dosen Pembimbing",
      division: "ASV",
      photo: "",
      instagram: "@dosen.asv",
      expertise: ["Riset Maritim", "Validasi Sistem", "Strategi Tim"],
      bio: "Mengarahkan riset, validasi rekayasa, serta pengembangan strategis divisi ASV."
    },
    chair: {
      id: "asv-chair",
      fullName: "Nama Ketua ASV",
      role: "Ketua Divisi ASV",
      division: "ASV",
      photo: "",
      instagram: "@ketua.asv",
      expertise: ["Team Leadership", "System Integration", "Autonomous Navigation"],
      bio: "Memimpin pengembangan sistem ASV dan menyatukan pekerjaan mekanik, elektrik, serta perangkat lunak."
    },
    viceChair: {
      id: "asv-vice-chair",
      fullName: "Nama Wakil Ketua ASV",
      role: "Wakil Ketua Divisi ASV",
      division: "ASV",
      photo: "",
      instagram: "@wakil.asv",
      expertise: ["Project Management", "Field Testing", "Mission Strategy"],
      bio: "Mengawal eksekusi teknis, pengujian lapangan, dan koordinasi harian setiap sub-divisi."
    },
    subdivisions: {
      MECHANICAL: {
        id: "MECHANICAL",
        name: "MEKANIK",
        fullName: "Mechanical Division",
        description: "Merancang struktur, manufaktur, propulsi, dan sistem gerak ASV.",
        leader: {
          id: "asv-mechanical-lead",
          fullName: "Nama Ketua Mekanik ASV",
          role: "Ketua Mekanik ASV",
          division: "ASV",
          photo: "",
          instagram: "@mekanik.asv",
          expertise: ["Hull Design", "Manufacturing", "Propulsion"],
          bio: "Memimpin pengembangan mekanik, manufaktur, dan integrasi struktur ASV."
        },
        memberIds: ["asv-member-02", "asv-member-03", "asv-member-04"]
      },
      ELKAPRO: {
        id: "ELKAPRO",
        name: "ELKAPRO",
        fullName: "Electrical & Programming",
        description: "Mengembangkan kelistrikan, embedded system, navigasi, dan persepsi ASV.",
        leader: {
          id: "asv-elkapro-lead",
          fullName: "Nama Ketua Elkapro ASV",
          role: "Ketua Elkapro ASV",
          division: "ASV",
          photo: "",
          instagram: "@elkapro.asv",
          expertise: ["Electrical System", "Autonomous Program", "Computer Vision"],
          bio: "Memimpin integrasi kelistrikan dan perangkat lunak otonom ASV."
        },
        memberIds: ["asv-member-06", "asv-member-07", "asv-member-08"]
      }
    },
    members: [
      ["asv-member-01", "Anggota ASV 01", "Hull & Mechanical"],
      ["asv-member-02", "Anggota ASV 02", "Manufacturing & Composite"],
      ["asv-member-03", "Anggota ASV 03", "Propulsion & Steering"],
      ["asv-member-04", "Anggota ASV 04", "Mechanical Design"],
      ["asv-member-05", "Anggota ASV 05", "Electrical & Power"],
      ["asv-member-06", "Anggota ASV 06", "Embedded Systems"],
      ["asv-member-07", "Anggota ASV 07", "Autonomy & Computer Vision"],
      ["asv-member-08", "Anggota ASV 08", "Telemetry & Control"]
    ].map(([id, fullName, role], index) => ({
      id,
      fullName,
      role,
      division: "ASV",
      photo: ""
    }))
  },
  AUV: {
    id: "AUV",
    name: "AUV",
    fullName: "Autonomous Underwater Vehicle",
    tagline: "Mengembangkan robot bawah air otonom untuk memahami dan menjelajah lingkungan laut.",
    advisor: {
      id: "auv-advisor",
      fullName: "Nama Dosen Pembimbing AUV",
      role: "Dosen Pembimbing",
      division: "AUV",
      photo: "",
      instagram: "@dosen.auv",
      expertise: ["Underwater Robotics", "System Safety", "Research Direction"],
      bio: "Membimbing arah riset, keselamatan sistem bawah air, dan pengembangan strategis divisi AUV."
    },
    chair: {
      id: "auv-chair",
      fullName: "Feby Finance",
      role: "Ketua Divisi AUV",
      division: "AUV",
      photo: "/images/team/auv/feby-finance-clean.webp",
      instagram: "@febyfinance",
      expertise: ["Team Leadership", "System Integration", "Underwater Robotics"],
      bio: "Memimpin integrasi mekanik, elektronika, persepsi, dan kendali robot bawah air."
    },
    viceChair: {
      id: "auv-vice-chair",
      fullName: "Nama Wakil Ketua AUV",
      role: "Wakil Ketua Divisi AUV",
      division: "AUV",
      photo: "",
      instagram: "@wakil.auv",
      expertise: ["Control Systems", "Pool Testing", "Competition Readiness"],
      bio: "Mengelola implementasi teknis, pengujian kolam, dan kesiapan sistem menuju kompetisi."
    },
    subdivisions: {
      MECHANICAL: {
        id: "MECHANICAL",
        name: "MEKANIK",
        fullName: "Mechanical Division",
        description: "Mengembangkan pressure hull, sealing, propulsi, dan buoyancy AUV.",
        leader: {
          id: "auv-mechanical-lead",
          fullName: "Nama Ketua Mekanik AUV",
          role: "Ketua Mekanik AUV",
          division: "AUV",
          photo: "",
          instagram: "@mekanik.auv",
          expertise: ["Pressure Hull", "Buoyancy", "Mechanical Integration"],
          bio: "Memimpin perancangan mekanik dan integrasi struktur bawah air AUV."
        },
        memberIds: ["auv-member-02", "auv-member-03", "auv-member-04"]
      },
      ELKAPRO: {
        id: "ELKAPRO",
        name: "ELKAPRO",
        fullName: "Electrical & Programming",
        description: "Mengembangkan sistem daya, sensor, kendali, dan computer vision AUV.",
        leader: {
          id: "auv-elkapro-lead",
          fullName: "Nama Ketua Elkapro AUV",
          role: "Ketua Elkapro AUV",
          division: "AUV",
          photo: "",
          instagram: "@elkapro.auv",
          expertise: ["AUV Programming", "Control System", "Computer Vision"],
          bio: "Memimpin sistem elektrik, pemrograman otonom, dan persepsi visual AUV."
        },
        memberIds: ["auv-member-06", "auv-member-07", "auv-member-08"]
      }
    },
    members: [
      ["auv-member-01", "Anggota AUV 01", "Mechanical & Pressure Hull"],
      ["auv-member-02", "Anggota AUV 02", "Manufacturing & Sealing"],
      ["auv-member-03", "Anggota AUV 03", "Propulsion & Buoyancy"],
      ["auv-member-04", "Anggota AUV 04", "Mechanical Integration"],
      ["auv-member-05", "Anggota AUV 05", "Electrical & Power"],
      ["auv-member-06", "Anggota AUV 06", "Embedded & Sensor"],
      ["auv-member-07", "Anggota AUV 07", "Control & Computer Vision"],
      ["auv-member-08", "Anggota AUV 08", "Acoustic & Mission Program"]
    ].map(([id, fullName, role], index) => ({
      id,
      fullName,
      role,
      division: "AUV",
      photo: ""
    }))
  },
  SECRETARY_TREASURER: {
    id: "SECRETARY_TREASURER",
    name: "SEC & TREAS",
    fullName: "Secretary & Treasurer",
    tagline: "Menjaga administrasi, dokumentasi, penganggaran, dan akuntabilitas Aterkia.",
    advisor: {
      id: "secretary-treasurer-advisor",
      fullName: "Nama Dosen Pembimbing Nonteknis",
      role: "Dosen Pembimbing",
      division: "NONTEKNIS",
      photo: "",
      instagram: "@dosen.nonteknis",
      expertise: ["Organization", "Financial Governance", "Team Development"],
      bio: "Mendampingi tata kelola organisasi, administrasi, dan akuntabilitas keuangan tim."
    },
    chair: {
      id: "secretary",
      fullName: "Nama Secretary",
      role: "Secretary",
      division: "NONTEKNIS",
      photo: "",
      instagram: "@secretary.aterkia",
      expertise: ["Administration", "Documentation", "Team Coordination"],
      bio: "Mengelola administrasi, dokumentasi, agenda, dan alur informasi internal Aterkia."
    },
    viceChair: {
      id: "treasurer",
      fullName: "Nama Treasurer",
      role: "Treasurer",
      division: "NONTEKNIS",
      photo: "",
      instagram: "@treasurer.aterkia",
      expertise: ["Budgeting", "Financial Reporting", "Procurement"],
      bio: "Mengelola anggaran, pencatatan transaksi, dan kebutuhan pengadaan tim secara transparan."
    },
    members: [
      ["sec-treas-member-01", "Anggota Sec & Treas 01", "Administration"],
      ["sec-treas-member-02", "Anggota Sec & Treas 02", "Documentation"],
      ["sec-treas-member-03", "Anggota Sec & Treas 03", "Finance"],
      ["sec-treas-member-04", "Anggota Sec & Treas 04", "Procurement"]
    ].map(([id, fullName, role], index) => ({
      id,
      fullName,
      role,
      division: "NONTEKNIS",
      photo: ""
    }))
  },
  OFFICIAL: {
    id: "OFFICIAL",
    name: "OFFICIAL",
    fullName: "Official Team",
    tagline: "Mengelola operasional, komunikasi, acara, dan representasi resmi Aterkia.",
    advisor: {
      id: "official-advisor",
      fullName: "Nama Dosen Pembimbing Nonteknis",
      role: "Dosen Pembimbing",
      division: "NONTEKNIS",
      photo: "",
      instagram: "@dosen.nonteknis",
      expertise: ["Public Relations", "Event Strategy", "Organization"],
      bio: "Mendampingi pengembangan komunikasi, relasi eksternal, dan pelaksanaan agenda resmi tim."
    },
    chair: {
      id: "official-coordinator",
      fullName: "Nama Koordinator Official",
      role: "Official Coordinator",
      division: "NONTEKNIS",
      photo: "",
      instagram: "@official.aterkia",
      expertise: ["Operations", "Public Relations", "Event Management"],
      bio: "Mengoordinasikan kebutuhan operasional, komunikasi publik, dan representasi resmi Aterkia."
    },
    viceChair: {
      id: "official-vice-coordinator",
      fullName: "Nama Wakil Koordinator Official",
      role: "Vice Official Coordinator",
      division: "NONTEKNIS",
      photo: "",
      instagram: "@official.aterkia",
      expertise: ["Media Relations", "Field Operations", "Partnership"],
      bio: "Mendukung pelaksanaan acara, koordinasi lapangan, kemitraan, dan komunikasi eksternal."
    },
    members: [
      ["official-member-01", "Anggota Official 01", "Media & Creative"],
      ["official-member-02", "Anggota Official 02", "Public Relations"],
      ["official-member-03", "Anggota Official 03", "Partnership"],
      ["official-member-04", "Anggota Official 04", "Event Operations"],
      ["official-member-05", "Anggota Official 05", "Documentation"],
      ["official-member-06", "Anggota Official 06", "Content Production"]
    ].map(([id, fullName, role], index) => ({
      id,
      fullName,
      role,
      division: "NONTEKNIS",
      photo: ""
    }))
  }
};
