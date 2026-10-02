export interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  serviceType: string;
  domain: string;
  shortDescription: string;
  problem: string;
  solution: string;
  features: string[];
  tools: string[];
  image?: string;
  tags: string[];
}

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: 'maison-27',
    title: 'Maison 27',
    category: 'Hospitality & Dining',
    serviceType: 'Business Website',
    domain: 'maison27.dev',
    shortDescription: 'A warm European bistro website featuring an interactive table reservation workflow, seasonal menu displays, and quick mobile directions.',
    problem: 'Traditional hospitality websites frequently rely on static PDF menus and third-party redirect links that introduce friction for mobile diners.',
    solution: 'Designed an interactive responsive menu system with categorized courses, dietary indicators, and a clean in-page table reservation booking engine.',
    features: [
      'Interactive Table Reservation Flow with instant confirmation',
      'Tabbed Seasonal Menu (Starters, Mains, Desserts, Wine)',
      'Dietary & Vegan / Gluten-Free tagging',
      'Sub-0.8s initial page load time on mobile networks',
    ],
    tools: ['React 19', 'Tailwind CSS', 'Accessible Forms', 'Edge Performance'],
    image: '/src/assets/images/bistro_maison_dining_1790934397043.jpg',
    tags: ['Online Booking', 'Menu Showcase', 'Mobile First'],
  },
  {
    id: 'forma-studio',
    title: 'Forma Studio',
    category: 'Health & Wellness',
    serviceType: 'Landing Page',
    domain: 'formastudio.club',
    shortDescription: 'Boutique reformer Pilates studio landing page with interactive weekly timetable, instructor bios, and membership checkout.',
    problem: 'Studio clients found it difficult to scan weekly class availability on small screens, leading to dropped sign-ups and high support inquiries.',
    solution: 'Engineered a day-by-day timetable engine with filterable class types, spot counters, instructor cards, and straightforward membership tiers.',
    features: [
      'Interactive day-by-day timetable (Mon–Sun)',
      'Class filtering by discipline (Reformer, Core, Mat, Stretch)',
      '1-click spot reservation simulation with confirmation modal',
      'Transparent membership tiers (Drop-in, 10-Class, Unlimited)',
    ],
    tools: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Mobile-First Layout'],
    image: '/src/assets/images/pilates_forma_studio_1790934409995.jpg',
    tags: ['Weekly Schedule', 'Memberships', 'Lead Form'],
  },
  {
    id: 'atelier',
    title: 'Atelier',
    category: 'Retail & Fashion',
    serviceType: 'Business Website',
    domain: 'atelier-capsule.store',
    shortDescription: 'A minimalist lookbook and boutique storefront featuring quick product preview drawers, variant pickers, and clean typography.',
    problem: 'Boutique clothing brands often suffer from bloated e-commerce templates with intrusive popups that compromise an editorial luxury aesthetic.',
    solution: 'Created a restrained, high-speed capsule wardrobe experience with instant slide-out product previews and interactive add-to-bag functionality.',
    features: [
      'Editorial lookbook grid with category filtering',
      'Working Add to Bag with live badge counter',
      'Interactive size and color variant selectors',
      'Smooth drawer micro-interactions without page reload',
    ],
    tools: ['React 19', 'Tailwind CSS', 'State Management', 'Micro-interactions'],
    image: '/src/assets/images/atelier_capsule_fashion_1790934421260.jpg',
    tags: ['Editorial Lookbook', 'Product Filtering', 'Fast Load'],
  },
  {
    id: 'nova-ai',
    title: 'NOVA AI',
    category: 'Developer Tools & SaaS',
    serviceType: 'AI-Enhanced Website',
    domain: 'nova-inference.io',
    shortDescription: 'Technical product marketing page with live prompt sandbox simulation, tier comparisons, and warm developer documentation aesthetics.',
    problem: 'Developer SaaS products often hide their core API experience behind gated registration walls, preventing prospective teams from evaluating response speed.',
    solution: 'Integrated an interactive live inference tester and a real-time Monthly vs Annual pricing calculator right on the landing page.',
    features: [
      'Live in-browser prompt inference sandbox with streaming latency simulation',
      'Monthly / Annual pricing toggle with instant savings calculation',
      'Interactive SDK snippet copy utility',
      'Feature matrix with concrete rate limits and token allocations',
    ],
    tools: ['React 19', 'Tailwind CSS', 'TypeScript', 'Dark Mode Architecture'],
    tags: ['Interactive Demo', 'SaaS Pricing', 'Dark Accents'],
  },
  {
    id: 'north-and-oak',
    title: 'North & Oak Architecture',
    category: 'Website Redesign',
    serviceType: 'Website Redesign',
    domain: 'northandoak.archi',
    shortDescription: 'Architectural firm portfolio overhaul comparing an outdated, cluttered layout against modern spatial calm and sub-second load times.',
    problem: 'The firm’s original 2015 website suffered from 18MB uncompressed hero assets, non-standard mobile menus, and a 6.4-second load time.',
    solution: 'Restructured the digital presence with a spatial editorial layout, sub-second edge CDN delivery, and an interactive Before/After comparison tool.',
    features: [
      'Interactive Before & After comparison slider with draggable partition',
      'High-resolution architectural photo viewport with optimized lazy loading',
      'Clean project metadata index with structural details',
      'Fluid mobile typography and zero layout shift (CLS 0.002)',
    ],
    tools: ['React 19', 'Tailwind CSS', 'Image Optimization', 'Responsive Breakpoints'],
    image: '/src/assets/images/architectural_interior_lounge_1790934434073.jpg',
    tags: ['Before / After Redesign', 'Architecture Studio', 'Speed Optimization'],
  },
];
