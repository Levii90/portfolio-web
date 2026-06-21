import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 'cybervault',
    title: 'CyberVault',
    category: 'Cybersecurity / Smart City',
    status: 'In Development',
    description:
      'Platform literasi keamanan digital, asesmen keamanan, dan pelaporan insiden siber untuk membantu masyarakat memahami ancaman digital secara lebih cepat, mudah, dan terarah.',
    problem:
      'Masyarakat masih bingung harus melakukan apa ketika terkena kejahatan siber, informasi keamanan digital tersebar, dan edukasi yang tersedia sering tidak praktis.',
    tech: ['React', 'PHP', 'CodeIgniter 3', 'MySQL', 'Bootstrap', 'Figma'],
    features: [
      'Cyber Learning Center',
      'Security Readiness Assessment',
      'Real-Time Incident Reporting',
      'Cyber News & Alerts',
      'Digital Identity Vault',
      'CSIRT Learning Hub'
    ],
    githubUrl: 'https://github.com/Levii90',
    liveUrl: '',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    tags: ['React', 'Cybersecurity', 'Smart City']
  },
  {
    id: 'activity-list',
    title: 'Activity List App',
    category: 'React Project',
    status: 'Completed',
    description:
      'Aplikasi sederhana untuk mencatat aktivitas harian menggunakan React component, state, props, dan form handling.',
    problem: 'Perlu alat sederhana untuk mengelola dan mencatat aktivitas harian dengan antarmuka intuitif.',
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    features: ['Add activity', 'Delete activity', 'Display activity list', 'Component-based structure'],
    githubUrl: 'https://github.com/Levii90',
    liveUrl: '',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    tags: ['React', 'UI/UX']
  },
  {
    id: 'ci3-crud-dashboard',
    title: 'CI3 CRUD Dashboard',
    category: 'PHP / CodeIgniter',
    status: 'Completed',
    description:
      'Dashboard CRUD sederhana menggunakan CodeIgniter 3, PHP, MySQL, dan Bootstrap sebagai latihan backend web programming.',
    problem: 'Butuh praktik CRUD terstruktur dengan pola MVC di PHP untuk memantapkan pemahaman backend.',
    tech: ['PHP', 'CodeIgniter 3', 'MySQL', 'Bootstrap'],
    features: ['Create data', 'Read data', 'Update data', 'Delete data', 'MVC structure'],
    githubUrl: 'https://github.com/Levii90',
    liveUrl: '',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    tags: ['PHP', 'CodeIgniter']
  },
  {
    id: 'cybervault-uiux',
    title: 'CyberVault UI/UX Case Study',
    category: 'UI/UX Design',
    status: 'Academic Project',
    description:
      'Dokumentasi proses UX CyberVault menggunakan pendekatan Strategy Plane, Scope Plane, Structure Plane, Skeleton Plane, dan Surface Plane.',
    problem: 'Perlu panduan desain UX untuk memetakan produk keamanan digital dan memastikan pengalaman pengguna yang terarah.',
    tech: ['Figma', 'UX Research', 'Wireframing', 'User Flow', 'Information Architecture'],
    features: ['User persona', 'Empathy map', 'Customer journey map', 'Sitemap', 'Wireframe', 'High fidelity design'],
    githubUrl: 'https://github.com/Levii90',
    liveUrl: '',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
    tags: ['UI/UX', 'Design']
  },
  {
    id: 'smarthome-monitoring',
    title: 'SmartHome Monitoring',
    category: 'Java / OOP',
    status: 'Academic Project',
    description:
      'Project latihan Object-Oriented Programming untuk simulasi monitoring perangkat listrik rumah pintar.',
    problem: 'Membutuhkan latihan konsep OOP dengan penerapan logika monitoring perangkat rumah pintar secara terstruktur.',
    tech: ['Java', 'OOP', 'NetBeans'],
    features: ['Abstract class', 'Interface', 'Inheritance', 'Composition', 'ArrayList'],
    githubUrl: 'https://github.com/Levii90',
    liveUrl: '',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    tags: ['Academic', 'Java']
  },
  {
    id: 'tontonin-dong',
    title: 'TontoninDong',
    category: 'Media Catalog / API Integration',
    status: 'Concept Project',
    description:
      'Konsep media catalog web app untuk menjelajahi anime, film, dan TV series dengan integrasi API open-source, watchlist lokal, continue watching, dan UI dark night-sky.',
    problem:
      'Banyak media catalog memiliki pengalaman eksplplorasi yang terpisah antara anime, film, dan TV series. Project ini mengeksplorasi bagaimana katalog lintas mode dapat dibuat lebih terstruktur, personal, dan responsive.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'API Wrapper'],
    features: [
      'Anime and movie catalog',
      'Open-source API integration',
      'Search and browse',
      'Local watchlist',
      'Continue watching',
      'Dark night-sky responsive UI'
    ],
    githubUrl: 'https://github.com/Levii90/portfolio-web',
    liveUrl: '',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    tags: ['React', 'API Integration', 'Media Catalog']
  }
];
