// Data berita robot Aterkia — ganti foto di public/images/news/
export const newsData = [
  {
    id: "news-01",
    title: "Baruna ASV: Uji Navigasi Otonom di Perairan Terbuka",
    category: "ASV",
    date: "14 Agustus 2026",
    readTime: "3 menit",
    image: "/images/news/sea-trial-test.jpg",
    snippet: "Tim berhasil menguji sistem navigasi otonom Baruna di perairan terbuka dengan rute waypoint otomatis.",
    content: "Wahana ASV Baruna menjalani uji coba navigasi otonom menggunakan sistem GPS waypoint di perairan terbuka. Hasil pengujian menunjukkan akurasi posisi rata-rata 1.2 meter dari target waypoint, dengan sistem collision avoidance yang merespons objek statis maupun dinamis.",
    tags: ["ASV", "navigasi-otonom", "uji-coba"]
  },
  {
    id: "news-02",
    title: "Cakra Subsea AUV: Pengujian Sistem Kendali Kedalaman",
    category: "AUV",
    date: "3 Agustus 2026",
    readTime: "2 menit",
    image: "/images/news/workshop-test.jpg",
    snippet: "AUV Cakra Subsea menjalani pengujian sistem depth control di kolam pengujian laut dalam.",
    content: "AUV Cakra Subsea menjalani serangkaian pengujian kendali kedalaman menggunakan PID controller. Sistem mampu mempertahankan kedalaman target dengan toleransi ±10 cm pada kedalaman hingga 15 meter. Sensor tekanan dan IMU terintegrasi dengan stabil.",
    tags: ["AUV", "depth-control", "PID"]
  },
  {
    id: "news-03",
    title: "Manufaktur Lambung Komposit Nala-01 Selesai Dirakit",
    category: "Manufaktur",
    date: "20 Juli 2026",
    readTime: "2 menit",
    image: "/images/news/sea-trial-test.jpg",
    snippet: "Divisi mekanikal menyelesaikan perakitan lambung komposit ASV Nala-01 generasi terbaru.",
    content: "Lambung komposit fiberglas Nala-01 berhasil dirakit dengan teknik vacuum infusion. Bobot lambung turun 15% dari generasi sebelumnya tanpa mengurangi kekakuan struktural. Pengujian waterproofing dilakukan sebelum integrasi elektronik.",
    tags: ["manufaktur", "komposit", "ASV"]
  },
  {
    id: "news-04",
    title: "Makara-X AUV: Integrasi Sensor Sonar dan Kamera Bawah Air",
    category: "AUV",
    date: "10 Juli 2026",
    readTime: "3 menit",
    image: "/images/news/workshop-test.jpg",
    snippet: "Tim mengintegrasikan sistem sonar profil dan kamera bawah air ke dalam AUV Makara-X.",
    content: "AUV generasi terbaru Makara-X mulai menjalani integrasi sensor sonar forward-looking dan kamera underwater 4K. Konfigurasi sensor dirancang untuk misi inspeksi bawah air dan pencarian objek tersembunyi di laut dalam.",
    tags: ["AUV", "sonar", "integrasi-sensor"]
  },
  {
    id: "news-05",
    title: "Tim Aterkia Siap Berkompetisi di KKCTBN & Internasional",
    category: "Kompetisi",
    date: "1 Juli 2026",
    readTime: "2 menit",
    image: "/images/news/sea-trial-test.jpg",
    snippet: "Seluruh divisi mematangkan kesiapan teknis dan non-teknis menuju kompetisi maritim tahun ini.",
    content: "Persiapan intensif dilakukan menjelang kompetisi maritim nasional maupun internasional. Divisi software menyelesaikan misi otonom ASV dan AUV, divisi manufaktur memastikan kesiapan lambung, serta divisi manajemen menyiapkan dokumen presentasi teknis.",
    tags: ["kompetisi", "KKCTBN", "persiapan"]
  },
  {
    id: "news-06",
    title: "Optimasi Algoritma SLAM untuk Navigasi Bawah Air",
    category: "Software",
    date: "20 Juni 2026",
    readTime: "4 menit",
    image: "/images/news/workshop-test.jpg",
    snippet: "Divisi software mengembangkan algoritma SLAM untuk petaan bawah air secara real-time.",
    content: "Tim software mengembangkan implementasi SLAM (Simultaneous Localization and Mapping) untuk AUV menggunakan data sonar dan IMU. Algoritma ini memungkinkan AUV memetakan lingkungan bawah air secara real-time tanpa mengandalkan GPS.",
    tags: ["software", "SLAM", "AUV"]
  },
  {
    id: "news-07",
    title: "Uji Coba Sistem Propulsi ASV di Kolam Pengujian",
    category: "ASV",
    date: "10 Juni 2026",
    readTime: "2 menit",
    image: "/images/news/sea-trial-test.jpg",
    snippet: "Sistem propulsi dual-thruster Baruna diuji untuk efisiensi daya dan manuver belok.",
    content: "Pengujian propulsi dual-thruster pada ASV Baruna dilakukan untuk mengukur konsumsi daya dan radius belok minimum. Hasil uji menunjukkan konsumsi daya optimal pada kecepatan cruise 3 knot dengan manuver belok rata-rata 45 derajat per detik.",
    tags: ["ASV", "propulsi", "efisiensi"]
  },
  {
    id: "news-08",
    title: "Kalibrasi Sensor IMU & Depth untuk Misi Presisi",
    category: "Elektrikal",
    date: "28 Mei 2026",
    readTime: "2 menit",
    image: "/images/news/workshop-test.jpg",
    snippet: "Divisi elektrikal melakukan kalibrasi sensor IMU dan depth untuk memastikan akurasi navigasi.",
    content: "Kalibrasi dilakukan pada IMU BNO085 dan sensor tekanan MS5837 untuk seluruh wahana. Pengujian menunjukkan drift IMU < 0.5°/jam dan akurasi kedalaman ±5 cm pada kedalaman 20 meter.",
    tags: ["elektrikal", "IMU", "kalibrasi"]
  }
];
