/**
 * ============================================================================
 * DATA INOVASI & SUBSISTEM TEKNOLOGI ASV - ATERKIA ASV
 * ============================================================================
 */

export const techSubsystems = [
  {
    id: "tech-nav",
    title: "Autonomous Navigation & ROS2 Stack",
    shortTitle: "ROS2 & Path Planning",
    icon: "Compass",
    badge: "Software Core",
    metrics: { latency: "18 ms", precision: "±0.12 m", rate: "50 Hz" },
    description: "Sistem navigasi terpadu berbasis ROS2 Humble yang mengintegrasikan algoritma Global Planner (A*) dan Local Planner (Dynamic Window Approach / TEB) untuk manuver lintasan dinamis secara real-time.",
    features: [
      "Waypoint GPS-RTK Autonomous Tracking",
      "Dynamic Obstacle Avoidance Matrix",
      "Automated Docking & Station Keeping",
      "Real-time Odometry Fusion (EKF Filter)"
    ]
  },
  {
    id: "tech-ai",
    title: "Edge AI Vision & Sensor Fusion",
    shortTitle: "Computer Vision & LiDAR",
    icon: "Eye",
    badge: "Perception Layer",
    metrics: { fps: "45 FPS", latency: "22 ms", range: "40 m" },
    description: "Model deep learning YOLOv8 terkuantisasi TensorRT yang berjalan di NVIDIA Jetson Orin Nano untuk mengenali pelampung warna (merah, hijau, kuning), gerbang lintasan, serta rintangan tak terduga.",
    features: [
      "Buoy & Maritime Object Classification",
      "Stereo Camera Depth Estimation",
      "3D LiDAR Point Cloud Clustering",
      "Sunlight Glare & Water Reflection Filtering"
    ]
  },
  {
    id: "tech-hull",
    title: "Hydrodynamic Catamaran & Composites",
    shortTitle: "Hull & Hydrodynamics",
    icon: "Anchor",
    badge: "Mechanical Core",
    metrics: { dragReduction: "-32%", weight: "4.8 kg Hull", waveTol: "0.6 m" },
    description: "Desain lambung ganda (Catamaran) hasil simulasi ANSYS Fluent CFD dengan hambatan gelombang rendah, diproduksi menggunakan Vacuum Infusion Carbon Fiber demi rasio kekuatan berbanding berat optimal.",
    features: [
      "Wave Piercing Bow Profile",
      "High Torsional Rigidity Carbon Fiber",
      "IP67 Modular Waterproof Compartments",
      "Optimized Kort Nozzle Thruster Duct"
    ]
  },
  {
    id: "tech-elec",
    title: "High-Current PDU & Fail-Safe Telemetry",
    shortTitle: "Electrical & Hardware",
    icon: "Zap",
    badge: "Hardware Layer",
    metrics: { busVoltage: "24V DC", maxThrust: "18.5 kgf", telemetryRange: "3.5 km" },
    description: "Power Distribution Unit (PDU) terintegrasi dengan proteksi arus berlebih, sistem sensor arus Hall-effect per kanal, dan redundant link komunikasi radio LoRa 433MHz + 5.8GHz video feed.",
    features: [
      "Redundant Digital Radio Link (Fail-Safe RTH)",
      "Smart BMS with Real-time Cell Health Monitor",
      "Optical-Isolated High Speed ESC Controls",
      "Microsecond Hard-Kill Emergency Switch"
    ]
  }
];
