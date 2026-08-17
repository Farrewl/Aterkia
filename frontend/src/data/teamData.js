// Data Anggota Tim Aterkia
// Ganti foto dengan memasukkan file ke public/images/team/ dan update baris photo
export const teamDivisions = [
  { id: "All", label: "Semua Anggota" },
  { id: "Leadership", label: "Leadership" },
  { id: "ASV Division", label: "Divisi ASV" },
  { id: "AUV Division", label: "Divisi AUV" },
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
    photo: "/images/team/lead-rayhan.jpg",
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
    photo: "/images/team/vice-annisa.jpg",
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
    photo: "/images/team/asv-farhan.jpg",
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
    photo: "/images/team/asv-bayu.jpg",
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
    photo: "/images/team/auv-satria.jpg",
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
    photo: "/images/team/auv-citra.jpg",
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
    photo: "/images/team/soft-dimas.jpg",
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
    photo: "/images/team/elec-rizky.jpg",
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
    photo: "/images/team/mech-ilham.jpg",
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
    photo: "/images/team/media-nabila.jpg",
    bio: "Dokumentasi visual, video uji coba, dan publikasi media sosial.",
    specialty: "Videography & Branding",
    socials: {
      instagram: "https://instagram.com/",
      email: "media@aterkia-undip.org"
    }
  }
];
