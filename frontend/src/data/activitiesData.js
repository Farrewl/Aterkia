// Activities data — riset, trial, studi banding, lomba
// Images reuse existing assets in /public/images

export const activitiesData = [
  {
    id: 'research',
    title: 'Research & Development',
    description: 'Designing hulls, electronics, and autonomous navigation algorithms. Long nights of CAD, soldering, and simulation before anything touches water.',
    images: [
      '/images/robots/robot-asv-1.png',
      '/images/news/foto1-768x496.webp',
      '/images/news/images.png',
    ],
  },
  {
    id: 'trial',
    title: 'Robot Trial',
    description: 'Field-testing the ASV and AUV in real waters — calibrating sensors, tuning PID, and pushing the boat until something breaks (so it does not break at the contest).',
    images: [
      '/images/team/aterkia-team-group.webp',
      '/images/news/foto1-768x496.webp',
      '/images/robots/robot-asv-1.png',
    ],
  },
  {
    id: 'study',
    title: 'Studi Banding',
    description: 'Cross-team visits and knowledge exchange with other robotics teams and institutions. Learning what works, what fails, and how to ship a better robot next season.',
    images: [
      '/images/news/Pelepasan-Kontingen-KKI-Undip-2025-1536x862.webp',
      '/images/team/aterkia-team-group.webp',
      '/images/news/foto1-768x496.webp',
    ],
  },
  {
    id: 'competition',
    title: 'Kompetisi',
    description: 'KKCTBN, RoboBoat, SAUVC. National and international contests where the work actually meets the water — and the clock.',
    images: [
      '/images/news/Pelepasan-Kontingen-KKI-Undip-2025-1536x862.webp',
      '/images/news/images.png',
      '/images/team/aterkia-team-group.webp',
    ],
  },
];

export default activitiesData;
