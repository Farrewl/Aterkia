// Robot data — update photos in public/images/robots/
export const robotCategories = ["All", "ASV", "AUV"];

export const robotsData = [
  {
    id: "asv-baruna",
    name: "Aterolas",
    category: "ASV",
    year: "2025 — Present",
    status: "Active",
    image: "/images/robots/robot-asv-1.png",
    description: "Aterolas is Aterkia's flagship autonomous surface vehicle, purpose-built for high-speed maritime competitions. It features a lightweight carbon fiber Catamaran hull design that provides exceptional stability and speed in open water conditions. Equipped with dual GPS-RTK modules for centimeter-level positioning accuracy and a forward-facing AI camera system for real-time obstacle detection and avoidance. The dual brushless thruster setup delivers responsive maneuverability, allowing the vessel to navigate complex waypoint courses autonomously. Aterolas represents the culmination of years of iterative design, testing, and competition experience, and continues to evolve with each season as new sensor integrations and software optimizations are developed by the team.",
    snippet: "Autonomous surface vehicle with AI navigation and obstacle detection for KRI Competitions.",
    specs: {
      "Category": "Surface Vessel (ASV)",
      "Year": "2025/2026",
      "Hull": "Catamaran Carbon Fiber",
      "Navigation": "Computer Vision & Dual GPS-RTK",
      "Propulsion": "Dual Brushless Thrusters",
      "Competition": "KKCTBN, RoboBoat"
    },
    achievements: ["1st Place KKCTBN", "Best Autonomous Navigation"]
  },
  {
    id: "auv-cakra",
    name: "Feby Finance",
    category: "AUV",
    year: "2025 — Present",
    status: "Active",
    image: "/images/robots/testblow.png",
    description: "Cakra Subsea is Aterkia's autonomous underwater vehicle designed for deep-water inspection and competition missions. Housed in a pressure-rated IP68 acrylic enclosure, it is built to withstand sustained submersion at depths of up to 15 meters. The 6-DOF vectoring thruster configuration enables full freedom of movement — forward, backward, lateral, yaw, pitch, and roll — making it highly maneuverable in complex underwater environments. An integrated underwater camera and depth sensor provide real-time feedback for autonomous depth-hold, path tracking, and object detection tasks. Cakra Subsea has been developed to compete in international AUV competitions such as SAUVC in Singapore and RoboSub, where precision control and reliable sensor fusion are critical to success.",
    snippet: "Underwater robot with 6-DOF control and depth sensors for SAUVC & RoboSub.",
    specs: {
      "Category": "Underwater Robot (AUV)",
      "Year": "2025/2026",
      "Structure": "IP68 Acrylic Enclosure",
      "Control": "6-DOF Vectoring Thrusters",
      "Sensors": "Underwater Camera & Depth Sensor",
      "Competition": "SAUVC, RoboSub"
    },
    achievements: ["SAUVC Singapore Finalist"]
  },
  {
    id: "asv-nala",
    name: "AmbaBoat",
    category: "ASV",
    year: "2024",
    status: "Legacy",
    image: "/images/robots/testblow.png",
    description: "Nala-01 was the very first autonomous surface vehicle designed and built by the Aterkia team, marking the beginning of the team's journey into maritime robotics. It features a Deep-V monohull fiberglass hull optimized for straight-line speed and stability in choppy water conditions. The navigation system relies on waypoint GPS combined with an IMU for heading and attitude estimation, enabling basic autonomous path-following capabilities. Twin brushless thrusters provide propulsion, and the onboard electronics are housed in a waterproof enclosure for reliability during field testing. Although Nala-01 has been retired from active competition, it remains an important part of the team's heritage and served as the foundational platform for testing early autonomous navigation algorithms.",
    snippet: "First monohull boat with Deep-V design for KKCTBN 2024.",
    specs: {
      "Category": "Surface Vessel (ASV)",
      "Year": "2024",
      "Hull": "Deep-V Monohull Fiberglass",
      "Navigation": "Waypoint GPS & IMU",
      "Propulsion": "Twin Brushless Thrusters",
      "Competition": "KKCTBN 2024"
    },
    achievements: ["Best Hull Design Nomination"]
  },
  {
    id: "auv-makara",
    name: "Muhammad Ibnu",
    category: "AUV",
    year: "2026/2027 (R&D)",
    status: "In Development",
    image: "/images/robots/robot-asv-1.png",
    description: "Makara-X is Aterkia's next-generation autonomous underwater vehicle, currently under active research and development. It is being designed with a modular enclosure architecture that allows rapid reconfiguration of sensors, propulsion, and payload modules for different mission profiles. The primary innovation is an integrated manipulator gripper arm capable of performing basic underwater manipulation tasks such as object retrieval and valve turning. A hydrophone array and enhanced underwater vision system provide advanced sensing capabilities for acoustic target detection and visual inspection in low-visibility environments. With an 8-thruster matrix for superior maneuverability, Makara-X aims to push the boundaries of what a student-built AUV can achieve in both competition and real-world maritime applications.",
    snippet: "Next-gen AUV with manipulator gripper for SAUVC & inspection missions.",
    specs: {
      "Category": "Underwater Robot (AUV)",
      "Year": "2026/2027",
      "Structure": "Modular Enclosure",
      "Sensors": "Hydrophone & Underwater Vision",
      "Propulsion": "8x Thruster Matrix",
      "Competition": "Research"
    },
    achievements: []
  }
];
