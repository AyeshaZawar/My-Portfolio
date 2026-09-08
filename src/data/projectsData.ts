import type { ProjectItem, CategoryCardData } from '../types/projects';

// The 3 Top-Level Stacked Category Cards for Level 1
export const categoryCardsData: CategoryCardData[] = [
  {
    id: 'templates',
    number: '01',
    title: 'Templates / Practice Templates',
    categoryLabel: 'FRONTEND STARTERS • EXPERIMENTAL TEMPLATES',
    description:
      'A collection of smaller frontend templates, starter projects, experimental website layouts, and practice portfolio templates designed for rapid prototyping.',
    count: 4,
    highlight: false,
    tags: ['React', 'HTML5/CSS3', 'Boilerplates', 'Responsive Layouts', 'UI Testing'],
    features: ['Modular Starter Templates', 'Practice Portfolio Prototypes', 'Clean Lightweight Footprint'],
    route: '/projects/templates',
  },
  {
    id: 'learning',
    number: '02',
    title: 'Learning Projects',
    categoryLabel: 'PYTHON SCRIPTS • ALGORITHMS & LOGIC',
    description:
      'Dedicated learning repositories and Python practice projects exploring operator evaluation, control flow, automation scripts, dataset validation, and algorithmic data structures.',
    count: 5,
    highlight: false,
    tags: ['Python 3.12', 'Algorithms', 'Logic Operators', 'File I/O', 'Data Validation'],
    features: ['Algorithmic Problem Solvers', 'Comprehensive Test Routines', 'Clean Modularity'],
    route: '/projects/learning',
  },
  {
    id: 'main',
    number: '03',
    title: 'Main Projects',
    categoryLabel: 'FEATURED • FULL-STACK & ENTERPRISE PLATFORMS',
    description:
      'Primary professional engineering projects, full-stack recruitment platforms with AI resume analysis, commercial catering business websites, and digital studio solutions.',
    count: 5,
    highlight: true,
    tags: ['React.js', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'MongoDB', 'REST APIs', 'GSAP'],
    features: ['Full-Stack Recruitment Platforms', 'Commercial Business Websites', 'End-to-End Workflows'],
    route: '/projects/main',
  },
];

// All verified project items across the 3 categories
export const allProjectsData: ProjectItem[] = [
  // ================= MAIN PROJECTS =================
  {
    id: 'main-bnb',
    slug: 'bnb',
    name: 'BNB — Bucks n Bricks',
    category: 'main',
    categoryLabel: 'MAIN PROJECT // FULL-STACK PLATFORM',
    typeLabel: 'RECRUITMENT & HR PLATFORM',
    shortDescription:
      'Bucks n Bricks is a recruitment-focused platform where users can explore vacancies, apply for jobs, and use an AI-powered resume checking feature. The platform also includes a chatbot and recruitment-related information/services.',
    detailedDescription:
      'A major full-stack recruitment platform engineered to connect job seekers and corporate recruiters. The platform combines public vacancy exploration, responsive candidate application workflows, automated AI-assisted resume check and scoring functionality, interactive recruitment chatbot assistance, and robust backend administrative services.',
    githubUrl: 'https://github.com/AyeshaZawar/bnb-final',
    liveUrl: 'https://bnb-final-gray.vercel.app/',
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB Atlas', 'AI Resume Scoring', 'REST APIs', 'Chatbot Engine', 'Tailwind CSS'],
    features: [
      'Job & Vacancy Listings Browsing',
      'Direct Job Application Workflows',
      'Resume Upload & File Processing',
      'AI Resume Score / Check Functionality',
      'Interactive Recruitment Chatbot',
      'Recruitment Services & Corporate Details',
      'Administrative & Backend Management',
    ],
    videos: [
      {
        id: 'bnb-vid-1',
        type: 'video',
        title: 'Full Platform Walkthrough & Resume AI Demo',
        caption: 'Screen recording demonstrating vacancy browsing, candidate job submission, AI resume scoring, and chatbot interactions.',
        aspectRatio: '16/9',
      },
    ],
    images: [
      {
        id: 'bnb-img-1',
        type: 'image',
        title: 'Homepage & Primary Vacancy Showcase',
        caption: 'Executive recruitment landing view presenting active vacancies, service catalog, and candidate search bar.',
        aspectRatio: '16/9',
      },
      {
        id: 'bnb-img-2',
        type: 'image',
        title: 'Job Vacancy Details & Application Modal',
        caption: 'Detailed job requirements view with instant application form and document attachment.',
        aspectRatio: '16/9',
      },
      {
        id: 'bnb-img-3',
        type: 'image',
        title: 'AI Resume Analyzer & Feedback Dashboard',
        caption: 'Interactive scoring metric calculating candidate compatibility, keyword density, and recommendations.',
        aspectRatio: '16/9',
      },
      {
        id: 'bnb-img-4',
        type: 'image',
        title: 'Interactive Recruitment Assistant Chatbot',
        caption: 'Real-time assistant answering candidate queries and guiding vacancy selection.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'main-alnajaf',
    slug: 'al-najaf-catering',
    name: 'Al Najaf Catering',
    category: 'main',
    categoryLabel: 'MAIN PROJECT // COMMERCIAL WEBSITE',
    typeLabel: 'CATERING / FOOD-SERVICE BUSINESS WEBSITE',
    shortDescription:
      'A professional catering and business website created for a catering-related business with interactive menus, quotation forms, and fluid motion design.',
    detailedDescription:
      'Engineered as a commercial catering and food-service business website. Features structured menu catalogs, custom inquiry & booking forms, fluid scroll animations powered by GSAP and Framer Motion, and robust database integration with Supabase.',
    githubUrl: 'https://github.com/AyeshaZawar/Al_Najaf_catering_website',
    liveUrl: 'https://al-najaf-site.vercel.app/',
    technologies: ['React', 'TypeScript', 'Supabase', 'Framer Motion', 'GSAP', 'React Query', 'Forms / Validation', 'Modern UI'],
    features: [
      'Commercial Catering Showcase',
      'Interactive Catering Menu Displays',
      'Validated Booking & Inquiry Forms',
      'GSAP & Framer Motion Smooth Choreography',
      'Supabase Database Integration',
      'Responsive Multi-Device Layout',
    ],
    videos: [
      {
        id: 'alnajaf-vid-1',
        type: 'video',
        title: 'Motion Choreography & Menu Walkthrough',
        caption: 'High-definition screen recording highlighting GSAP animations, package selection, and inquiry validation.',
        aspectRatio: '16/9',
      },
    ],
    images: [
      {
        id: 'alnajaf-img-1',
        type: 'image',
        title: 'Commercial Landing Page & Hero Section',
        caption: 'Refined brand presentation featuring high-contrast layout and hospitality service tiers.',
        aspectRatio: '16/9',
      },
      {
        id: 'alnajaf-img-2',
        type: 'image',
        title: 'Categorized Menu Catalog',
        caption: 'Interactive culinary menu listings with portion sizing and event package options.',
        aspectRatio: '16/9',
      },
      {
        id: 'alnajaf-img-3',
        type: 'image',
        title: 'Validated Client Booking Interface',
        caption: 'Dynamic date picker and guest estimation calculator with instant form validation.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'main-horizon',
    slug: 'horizon-group',
    name: 'Horizon Group',
    category: 'main',
    categoryLabel: 'MAIN PROJECT // COMMERCIAL WEBSITE',
    typeLabel: 'CATERING & BUSINESS WEBSITE',
    shortDescription:
      'Horizon Group is a catering and business-style website showcasing enterprise culinary services, custom event packages, and structured client inquiry workflows.',
    detailedDescription:
      'A professional corporate catering and business website engineered for commercial client engagements, highlighting hospitality solutions, event packages, and responsive multi-column layouts.',
    githubUrl: 'https://github.com/AyeshaZawar/Horizon-Group',
    liveUrl: 'https://horizon-group-nine.vercel.app/',
    technologies: ['JavaScript', 'React', 'CSS3', 'Tailwind CSS', 'Responsive UI', 'REST Integration'],
    features: [
      'Corporate & Hospitality Services Showcase',
      'Client Inquiry & Contact Flow',
      'Responsive Mobile-First Architecture',
      'High-Performance Lightweight Footprint',
      'Modern Typography & Spacing Hierarchy',
    ],
    videos: [
      {
        id: 'horizon-vid-1',
        type: 'video',
        title: 'Live Vercel Production Walkthrough',
        caption: 'Screen recording demonstrating production deployment navigation, services explorer, and contact forms.',
        aspectRatio: '16/9',
      },
    ],
    images: [
      {
        id: 'horizon-img-1',
        type: 'image',
        title: 'Executive Landing & Services Grid',
        caption: 'Clean corporate layout highlighting catering tiers, event venues, and credentials.',
        aspectRatio: '16/9',
      },
      {
        id: 'horizon-img-2',
        type: 'image',
        title: 'Event Packages & Inquiry Form',
        caption: 'Interactive client inquiry interface with custom date, guest count, and service specifications.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'main-ads',
    slug: 'ads',
    name: 'ADS',
    category: 'main',
    categoryLabel: 'MAIN PROJECT // STUDIO PLATFORM',
    typeLabel: 'DESIGN STUDIO & PORTFOLIO',
    shortDescription:
      'Digital design and studio web platform presenting architectural projects, interactive case studies, and modern visual media layouts.',
    detailedDescription:
      'A sleek portfolio and studio platform engineered to highlight visual design work, architectural layout systems, and interactive galleries with high-contrast typography.',
    githubUrl: 'https://github.com/AyeshaZawar/A_D_S',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Modern UI Standards', 'Responsive Media Showcase'],
    features: [
      'Visual Project Case Studies',
      'Interactive Media Galleries',
      'Editorial Grid & Typography',
      'Cross-Device Compatibility',
    ],
    videos: [
      {
        id: 'ads-vid-1',
        type: 'video',
        title: 'Studio Showcase Interactive Walkthrough',
        caption: 'Screen recording demonstrating gallery interactions, case study navigation, and editorial animations.',
        aspectRatio: '16/9',
      },
    ],
    images: [
      {
        id: 'ads-img-1',
        type: 'image',
        title: 'Studio Showcase & Project Grid',
        caption: 'Curated architectural project showcase with high-resolution imagery and clean typography.',
        aspectRatio: '16/9',
      },
      {
        id: 'ads-img-2',
        type: 'image',
        title: 'Detailed Case Study View',
        caption: 'Deep-dive project overview detailing conceptual design, technical blueprints, and execution.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'main-pixelport',
    slug: 'pixelport',
    name: 'Pixelport',
    category: 'main',
    categoryLabel: 'MAIN PROJECT // DIGITAL PLATFORM',
    typeLabel: 'DIGITAL SHOWCASE PLATFORM',
    shortDescription:
      'Modern web showcase platform designed with structured project displays, fluid typography, and clean responsive navigation.',
    detailedDescription:
      'A dedicated digital showcase platform presenting curated creative assets, responsive layouts, and intuitive navigation structures built for optimal performance.',
    githubUrl: 'https://github.com/AyeshaZawar/Pixelport',
    liveUrl: 'https://p-f-rust.vercel.app/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Modern UI Architecture'],
    features: [
      'Curated Project Showcase Cards',
      'Fluid Typography & Responsive Layout',
      'Clean Dark-Mode Aesthetic',
      'Fast Client-Side Routing',
    ],
    videos: [
      {
        id: 'pixelport-vid-1',
        type: 'video',
        title: 'Showcase Navigation & Asset Explorer',
        caption: 'Screen recording demonstrating fast client-side transitions and responsive card interactions.',
        aspectRatio: '16/9',
      },
    ],
    images: [
      {
        id: 'pixelport-img-1',
        type: 'image',
        title: 'Portfolio Index & Asset Grid',
        caption: 'Minimalist interface organizing diverse digital creative assets with responsive card containers.',
        aspectRatio: '16/9',
      },
    ],
  },

  // ================= LEARNING PROJECTS =================
  {
    id: 'learn-operators',
    slug: 'python-operators',
    name: 'Python Operators',
    category: 'learning',
    categoryLabel: 'PYTHON LEARNING // MODULE 01',
    typeLabel: 'LOGIC & OPERATORS SUITE',
    shortDescription:
      'Practical programming test suite exploring Python operators, conditional branching, boolean evaluation logic, and mathematical precedence.',
    demonstrates:
      'Demonstrates mastery of core arithmetic, assignment, comparison, logical, identity, membership, and bitwise operators with interactive terminal evaluation routines.',
    detailedDescription:
      'A comprehensive exploration repository for Python 3 operators. Covers mathematical precedence, truthiness evaluation, logical gate chains, and bitwise bit-shift operations with interactive execution scripts.',
    githubUrl: 'https://github.com/AyeshaZawar/Python-Operators',
    technologies: ['Python 3.12', 'CLI', 'Operators Engine', 'Logic Evaluation'],
    features: ['Arithmetic & Bitwise Precedence', 'Boolean Logic Tables', 'Terminal Interactive Prompts'],
    images: [
      {
        id: 'ops-img-1',
        type: 'image',
        title: 'Terminal Evaluation Suite Output',
        caption: 'Console output demonstrating operator precedence and truthiness checks.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'learn-p1',
    slug: '1st-python-project',
    name: '1st Python Project',
    category: 'learning',
    categoryLabel: 'PYTHON LEARNING // MODULE 02',
    typeLabel: 'FOUNDATIONAL ALGORITHMS',
    shortDescription:
      'Foundational Python project demonstrating core algorithmic logic, standard I/O routines, control flow, and data structures.',
    demonstrates:
      'Demonstrates fundamental computer science principles, variable manipulation, loop constructs, branching conditionals, and structured function execution.',
    detailedDescription:
      'Focuses on foundational programming paradigms, standard user input parsing, mathematical algorithms, and structured clean code patterns in Python.',
    githubUrl: 'https://github.com/AyeshaZawar/1st-Python-Project',
    technologies: ['Python', 'Control Flow', 'Data Structures', 'Console I/O'],
    features: ['Loop Iterations & Conditionals', 'Clean Function Separation', 'Console-Driven Interaction'],
    images: [
      {
        id: 'p1-img-1',
        type: 'image',
        title: 'Program Execution & Flow Structure',
        caption: 'Console interaction detailing function execution and control flow validation.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'learn-p2',
    slug: '2nd-python-project',
    name: '2nd Python Project',
    category: 'learning',
    categoryLabel: 'PYTHON LEARNING // MODULE 03',
    typeLabel: 'SCRIPTING & AUTOMATION',
    shortDescription:
      'Scripting and automation routines focusing on modular functions, file operations, string manipulation, and data parsing logic.',
    demonstrates:
      'Demonstrates asynchronous file parsing, modular helper architecture, exception handling routines, and batch processing logic.',
    detailedDescription:
      'Engineered to showcase Python scripting utilities including file reading and writing, JSON payload validation, text parsing routines, and automated batch task handlers.',
    githubUrl: 'https://github.com/AyeshaZawar/2nd-Python-Project',
    technologies: ['Python', 'File I/O', 'String Parsing', 'Automation Helpers'],
    features: ['File Reading & Writing Routines', 'Structured Exception Handling', 'Reusable Function Modules'],
    images: [
      {
        id: 'p2-img-1',
        type: 'image',
        title: 'Batch Processing & Automation Log',
        caption: 'Automated script logs displaying file handling and exception handling checkpoints.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'learn-p3',
    slug: '3rd-python-project',
    name: '3rd Python Project',
    category: 'learning',
    categoryLabel: 'PYTHON LEARNING // MODULE 04',
    typeLabel: 'DATA PROCESSING & VALIDATION',
    shortDescription:
      'Intermediate data processing tool built for dataset validation, tabular calculations, and structured summary generation.',
    demonstrates:
      'Demonstrates tabular data manipulation, list/dictionary comprehension workflows, statistical aggregations, and automated data validation.',
    detailedDescription:
      'A practical data engineering and tabular analysis practice project for parsing CSV datasets, filtering anomalous records, computing summary metrics, and exporting clean formatted summaries.',
    githubUrl: 'https://github.com/AyeshaZawar/3rd-Python-Project',
    technologies: ['Python', 'Data Transformation', 'Validation Pipelines', 'CSV Parsers'],
    features: ['Tabular Dataset Parsing', 'Statistical Summary Engine', 'Data Integrity Checks'],
    images: [
      {
        id: 'p3-img-1',
        type: 'image',
        title: 'Data Parsing & Summary Metrics Report',
        caption: 'Generated summary statistical metrics across processed tabular records.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'learn-p4',
    slug: '4th-python-project',
    name: '4th Python Project',
    category: 'learning',
    categoryLabel: 'PYTHON LEARNING // MODULE 05',
    typeLabel: 'ALGORITHMS & DATA STRUCTURES',
    shortDescription:
      'Algorithmic problem-solving suite featuring recursion trees, search heuristics, array sorting, and modular unit tests.',
    demonstrates:
      'Demonstrates Big-O time and space complexity optimizations, recursive problem decomposition, search algorithms, and comprehensive unit tests.',
    detailedDescription:
      'Advanced algorithm implementation suite covering recursive tree traversals, binary search implementations, sorting benchmarks, and automated unit test assertions.',
    githubUrl: 'https://github.com/AyeshaZawar/4th-Python-Project',
    technologies: ['Python', 'Algorithms', 'Data Structures', 'Unit Testing'],
    features: ['Recursive Problem Solvers', 'Sorting & Search Heuristics', 'Modular Unit Test Suites'],
    images: [
      {
        id: 'p4-img-1',
        type: 'image',
        title: 'Unit Test Execution & Performance Benchmarks',
        caption: 'Passing automated test suites and execution time benchmarks.',
        aspectRatio: '16/9',
      },
    ],
  },

  // ================= TEMPLATES / PRACTICE TEMPLATES =================
  {
    id: 'template-newport',
    slug: 'newport-portfolio',
    name: 'Newport Portfolio',
    category: 'templates',
    categoryLabel: 'PRACTICE TEMPLATE // MODULE 01',
    typeLabel: 'PORTFOLIO PRACTICE TEMPLATE',
    shortDescription:
      'A practice and template portfolio project showcasing modern layout patterns, component structure, and responsive frontend styling.',
    detailedDescription:
      'Built as an experimental portfolio template and practice frontend project exploring responsive container hierarchies, typography contrasts, and component reusability.',
    githubUrl: 'https://github.com/AyeshaZawar/p-f',
    liveUrl: 'https://p-f-rust.vercel.app/',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Layout'],
    features: ['Modular Component Layout', 'Clean Monochrome Aesthetics', 'Mobile-First Responsive Grid'],
    images: [
      {
        id: 'newport-img-1',
        type: 'image',
        title: 'Template Landing View',
        caption: 'Clean portfolio template structure with hero and project grid.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'template-starter',
    slug: 'frontend-starter-template',
    name: 'Frontend Starter Template',
    category: 'templates',
    categoryLabel: 'PRACTICE TEMPLATE // MODULE 02',
    typeLabel: 'STARTER BOILERPLATE',
    shortDescription:
      'Lightweight starter template engineered for rapid prototyping of responsive web layouts with modular CSS and utility grid components.',
    detailedDescription:
      'A clean boilerplate project configured for kickstarting modern web prototypes with minimal overhead, utility layout classes, and semantic HTML5 scaffolding.',
    githubUrl: 'https://github.com/AyeshaZawar',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Utility CSS'],
    features: ['Quick Boilerplate Setup', 'Utility Styling Helpers', 'Zero-Build Dependency'],
    images: [
      {
        id: 'starter-img-1',
        type: 'image',
        title: 'Starter Template Structure',
        caption: 'Scaffolded starter boilerplate components ready for rapid experimentation.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'template-minimal',
    slug: 'minimalist-web-template',
    name: 'Minimalist Web Template',
    category: 'templates',
    categoryLabel: 'PRACTICE TEMPLATE // MODULE 03',
    typeLabel: 'UI / EXPERIMENTAL TEMPLATE',
    shortDescription:
      'Clean baseline frontend template built for rapid experimental website prototyping, micro-interactions, and UI testing.',
    detailedDescription:
      'An experimental practice template focusing on typography balance, whitespace rhythm, and minimalist design patterns.',
    githubUrl: 'https://github.com/AyeshaZawar',
    technologies: ['React', 'Tailwind CSS', 'Modern UI Standards'],
    features: ['Minimalist Card Architecture', 'Fluid Typography Hierarchy', 'Smooth CSS Transitions'],
    images: [
      {
        id: 'minimal-img-1',
        type: 'image',
        title: 'Minimalist Layout Framework',
        caption: 'Minimalist UI layout demonstrating clean whitespace and modern type scaling.',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'template-ads',
    slug: 'ads-template',
    name: 'A_D_S Practice Template',
    category: 'templates',
    categoryLabel: 'PRACTICE TEMPLATE // MODULE 04',
    typeLabel: 'STUDIO LAYOUT TEMPLATE',
    shortDescription:
      'Interactive design agency layout template featuring full-width showcase sections, responsive media grids, and editorial styling.',
    detailedDescription:
      'A layout practice template designed for architectural and creative agencies, with full-bleed hero sections, media grids, and editorial styling.',
    githubUrl: 'https://github.com/AyeshaZawar/A_D_S',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Grid Layouts'],
    features: ['Full-Width Showcase Grids', 'Editorial Typography Pairing', 'Touch-Optimized Layout'],
    images: [
      {
        id: 'ads-temp-img-1',
        type: 'image',
        title: 'Editorial Showcase Grid',
        caption: 'Full-bleed responsive media container and typography pairing.',
        aspectRatio: '16/9',
      },
    ],
  },
];
