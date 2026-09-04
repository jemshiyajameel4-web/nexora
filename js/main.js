import { initInterior3DAnimation } from './interior-3d.js';
import { initPhotoWave } from './photo-wave.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCustomCursor();
  initInterior3DAnimation();
  initLogo3DShowcaseAnimation();
  initHolaOverviewAnimation();
  initWhyNexoraPillarsAnimation();
  initServicesData();
  initProjectsData();
  initPhotoWave();
  initImageScrollParallax();
  initGoogleReviews();
  initVideoControls();
  initContactForm();
  initScrollAnimations();
  initHashRouting();

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});

/* ===================================================================
   DATA STRUCTURES (DATA-DRIVEN ARCHITECTURE)
   =================================================================== */

const SERVICES_DATA = [
  {
    id: 'led-signboards',
    title: 'LED Signboards & Light Boxes',
    category: 'Signage & Lighting',
    shortDesc: 'High-visibility illuminated 3D acrylic and ACP LED signboards engineered for maximum daytime impact and luminous night-time brilliance.',
    image: 'assets/images/nexora-service-led-signage.jpg',
    fullDesc: 'We design, fabricate, and install custom LED signboards and illuminated lightboxes that deliver exceptional visibility around the clock. Using premium Samsung/Epistar LEDs, high-grade acrylic lettering, weather-resistant ACP backing, and precision waterproof transformers, our signage ensures your brand stands out in the competitive Kerala market.',
    deliverables: [
      '3D Acrylic LED Glow Letters',
      'Front-lit, Back-lit & Edge-lit Lightboxes',
      'Weatherproof IP67 LED Modules & Power Supply',
      'High-grade Aluminum Composite Panel (ACP) Framing',
      'Professional On-site Civil & Electrical Installation'
    ],
    materials: 'Cast Acrylic, ACP, Samsung LED Modules, Aluminum Framing, MeanWell SMPS',
    turnaround: '5 - 10 Business Days'
  },
  {
    id: '3d-name-boards',
    title: '3D Letter Name Boards',
    category: 'Interior & Reception',
    shortDesc: 'Luxurious metallic, gold finish, stainless steel, and acrylic dimensional lettering for premium office receptions and boutique studios.',
    image: 'assets/images/nexora-service-3d-letters.jpg',
    fullDesc: 'Elevate your reception area and corporate spaces with our luxury 3D dimensional lettering. Available in mirror gold stainless steel, brushed titanium, matte black acrylic, and warm backlit architectural finishes that project sophistication and prestige from the moment a client walks through your doors.',
    deliverables: [
      'Mirror Gold & Rose Gold SS 304 Lettering',
      'Precision Laser & CNC Cut Acrylic Typography',
      'Floating Standoff Mounting with Concealed Fasteners',
      'Warm Architectural Backlight Illumination',
      'Custom Patterned Wallpaper & Fluted Panel Integration'
    ],
    materials: 'Titanium-coated Stainless Steel 304, Cast Acrylic, Warm 3000K LED Strips',
    turnaround: '4 - 7 Business Days'
  },
  {
    id: 'retail-branding',
    title: 'Retail Interior Branding & Displays',
    category: 'Retail & Commercial',
    shortDesc: 'End-to-end supermarket, boutique, and showroom visual merchandising, category headers, and custom point-of-sale display fixtures.',
    image: 'assets/images/nexora-service-retail-branding.jpg',
    fullDesc: 'Complete spatial interior branding for hypermarkets, retail stores, and department stores. From vibrant department header signage to checkout counter wraps, shelf talkers, and promotional displays, we design retail environments that drive foot traffic and enhance customer journey.',
    deliverables: [
      'Departmental Section Signage (Fruits, Bakery, Dairy, etc.)',
      'Cash Counter & Customer Service Desk Full Wraps',
      'Directional Aisle Markers & Overhead Signage',
      'High-resolution Vinyl Wall Murals & Floor Graphics',
      'Modular Display Shelving Headers & Price Channel Rails'
    ],
    materials: 'High-Density Forex, Eco-Solvent Vinyl with Matte Lamination, Wood Slat Paneling',
    turnaround: '7 - 14 Business Days'
  },
  {
    id: 'office-corporate-signage',
    title: 'Office & Corporate Identity Signage',
    category: 'Corporate Workspaces',
    shortDesc: 'Refined brand statements, conference room frosting, executive nameplates, and corporate lobby identity walls for tech companies and MNCs.',
    image: 'assets/images/nexora-service-corporate-office.jpg',
    fullDesc: 'Corporate environments require understated elegance and brand consistency. We craft executive lobby logos, glass manifestation films for privacy, meeting room identifiers, and acoustic wall branding tailored to modern office architecture.',
    deliverables: [
      'Corporate Lobby Feature Wall Signage',
      'Frosted Glass Vinyl Manifestation & Privacy Films',
      'Departmental & Meeting Room Nameplates',
      'Mission Statement & Brand Value Wall Murals',
      'Modular Architectural Slat Framing & Lighting'
    ],
    materials: 'Solid Acrylic, Frosted Dusted Crystal Film, Solid Teak / Metal Trims',
    turnaround: '4 - 8 Business Days'
  },
  {
    id: 'shopfront-facade-graphics',
    title: 'Shopfront & Building Facade Graphics',
    category: 'Outdoor & Facades',
    shortDesc: 'Turnkey architectural facade treatments, glass one-way vision graphics, main entrance canopies, and comprehensive building identity.',
    image: 'assets/images/nexora-service-shopfront-facade.jpg',
    fullDesc: 'Make your business location impossible to miss. We engineer large-format exterior storefront graphics, glass shopfront branding, window graphics, and exterior structural signage built to withstand Kerala’s heavy monsoon rains and intense tropical sun.',
    deliverables: [
      'Full Glass Shopfront Window Graphics & Decals',
      'One-Way Vision Perforated Films',
      'Exterior Building Nameplates & Slat Elevation Treatments',
      'Weather-resistant Fascia ACP Paneling',
      'High-impact Outdoor Entryway Canopies'
    ],
    materials: '3M / Avery Cast Vinyls, UV-resistant Laminate, Structural Steel Framework',
    turnaround: '7 - 12 Business Days'
  },
  {
    id: 'wayfinding-systems',
    title: 'Wayfinding & Directional Systems',
    category: 'Commercial & Public Spaces',
    shortDesc: 'Intuitive architectural wayfinding signage, multi-level directory boards, theater screen indicators, and parking guidance systems.',
    image: 'assets/images/nexora-service-wayfinding.jpg',
    fullDesc: 'Wayfinding is where architecture meets clarity. We design and install cohesive directional signage systems for multiplexes, hospitals, educational institutions, shopping malls, and corporate campuses that guide visitors seamlessly through complex environments.',
    deliverables: [
      'Corner-mount Architectural Directional Cubes',
      'Theater & Screen Number Indicators with LED Illumination',
      'Restroom, Elevator & Emergency Exit Signage',
      'Multi-tenant Directory Boards with Magnetic / Interchangeable Slats',
      'Braille & Tactile ADA-compliant Signage'
    ],
    materials: 'Anodized Aluminum, CNC Routed Acrylic, Dual-tone Metal Laminates',
    turnaround: '5 - 10 Business Days'
  },
  {
    id: 'outdoor-advertising',
    title: 'Outdoor Hoardings & Advertising Displays',
    category: 'Advertising & Outdoor',
    shortDesc: 'High-impact outdoor promotional hoardings, flex and vinyl banners, road-facing unipoles, and custom event display systems.',
    image: 'assets/images/nexora-service-outdoor-media.jpg',
    fullDesc: 'Command public attention across prime traffic locations. We handle full structural fabrication, high-resolution printing, lighting setup, and routine maintenance for large-scale outdoor advertising campaigns across Ernakulam and Kerala.',
    deliverables: [
      'Structural Steel Hoarding Fabrication & Installation',
      'High-definition Star Flex & Front-lit Vinyl Printing',
      'Energy-efficient Exterior Floodlight Lighting Fixtures',
      'Periodic Maintenance & Canvas Replacement Services',
      'Local Municipality Compliance & Engineering Standards'
    ],
    materials: 'Galvanized Structural Iron, Heavy-duty Star Flex, 100W IP66 LED Floodlights',
    turnaround: '3 - 7 Business Days'
  },
  {
    id: 'custom-furniture-interiors',
    title: 'Custom Interior Slat Paneling & Counters',
    category: 'Interior Branding',
    shortDesc: 'Fluted wooden slats, customized reception desks, cashier stations, and architectural interior cladding integrated with lighting.',
    image: 'assets/images/nexora-service-custom-interiors.jpg',
    fullDesc: 'Seamlessly merging interior design craftsmanship with brand identity. We custom fabricate fluted timber wall panels, curved reception counters, product display fixtures, and checkout islands tailored to your brand colors and architectural blueprint.',
    deliverables: [
      'Curved & Fluted Reception Counter Fabrication',
      'Natural Teak / WPC Louver & Slat Wall Elevations',
      'Integrated LED Channel Lighting & Power Management',
      'Durable High-pressure Laminate & Quartz Countertops',
      'Custom Point-of-Sale Checkout Islands'
    ],
    materials: 'Marine Grade Plywood, Merino Laminates, WPC Fluted Louvers, Solid Surface',
    turnaround: '10 - 18 Business Days'
  }
];

const PROJECTS_DATA = [
  {
    id: 'aeterna-led-storefront',
    title: 'Aeterna Boutique — Halo-Lit 3D Facade',
    category: 'led-signboards',
    categoryName: 'LED Signage',
    client: 'Aeterna Luxury Apparel',
    location: 'Panampilly Nagar, Kochi',
    year: '2026',
    image: 'assets/images/nexora-service-led-signage.jpg',
    featured: true,
    wide: false,
    description: 'Bespoke 3D illuminated channel letters with warm golden amber halo backlighting on dark charcoal fluted architectural panels with crystal glass storefront.',
    highlights: ['Warm 3000K LED Halo Glow', 'Charcoal Micro-Fluted Fascia', 'High-Impact Twilight Visibility']
  },
  {
    id: 'saaveri-brand-identity',
    title: 'Saaveri — Gold 3D Letter Reception',
    category: '3d-name-boards',
    categoryName: '3D Name Board',
    client: 'Saaveri Couture & Boutique',
    location: 'Panampilly Nagar, Kochi',
    year: '2026',
    image: 'assets/images/saaveri-gold-letter-signage.jpg',
    featured: true,
    wide: false,
    description: 'High-gloss mirror gold titanium 3D letter signage mounted with concealed floating studs on a textured stone-finish feature wall, illuminated by warm pendant lighting.',
    highlights: ['Titanium Mirror Finish SS 304', 'Concealed Floating Mount', 'Textured Stone Feature Wall Integration']
  },
  {
    id: 'avant-garde-headquarters',
    title: 'Avant Garde Capital — Executive Wall',
    category: 'office-corporate-signage',
    categoryName: 'Corporate Office',
    client: 'Avant Garde Capital Holdings',
    location: 'Infopark / Kakkanad, Kochi',
    year: '2026',
    image: 'assets/images/nexora-service-corporate-office.jpg',
    featured: true,
    wide: false,
    description: 'Multi-layer 3D brushed titanium and navy blue corporate emblem with precision halo backlighting mounted on dark vertical acoustic fluting.',
    highlights: ['Brushed Titanium Dual-Tone Emblem', 'Acoustic Slat Feature Wall', 'Architectural Linear Recessed Lighting']
  },
  {
    id: 'ignite-study-abroad',
    title: 'Ignite Study Abroad — Corporate 3D Letters',
    category: 'office-corporate-signage',
    categoryName: 'Office Branding',
    client: 'Ignite Study Abroad Private Limited',
    location: 'Kadavanthra, Kochi',
    year: '2026',
    image: 'assets/images/ignite-study-abroad-3d-acrylic.jpg',
    featured: true,
    wide: false,
    description: 'Deep cobalt blue precision CNC-cut 3D dimensional acrylic branding on a subtle textured acoustic wall, establishing an authoritative international consultancy presence.',
    highlights: ['High-gloss Solid Acrylic', 'Multi-depth Letter Geometry', 'Flush Architectural Wall Installation']
  },
  {
    id: 'artisan-market-branding',
    title: 'Artisan Food Hall — Curved Timber Canopy',
    category: 'retail-branding',
    categoryName: 'Retail Branding',
    client: 'Artisan Market & Bakery',
    location: 'Kakkanad, Kochi',
    year: '2026',
    image: 'assets/images/nexora-service-retail-branding.jpg',
    featured: true,
    wide: false,
    description: 'Bespoke sculptural wood-slat overhead canopy with illuminated warm 3D departmental typography, dark steel display cases, and directional spotlights.',
    highlights: ['Parametric S-Curved Timber Canopy', 'Warm 3D Category Header Illumination', 'Complete Commercial Merchandising Fitout']
  },
  {
    id: 'archetype-boutique-facade',
    title: 'Archetype Flagship — Architectural Facade',
    category: 'shopfront-facade-graphics',
    categoryName: 'Architectural Facade',
    client: 'Archetype Luxury Living',
    location: 'MG Road, Ernakulam',
    year: '2026',
    image: 'assets/images/nexora-service-shopfront-facade.jpg',
    featured: true,
    wide: true,
    description: 'Multi-level charcoal composite architectural facade with vertical warm teak louvers, floor-to-ceiling showroom glazing, and cantilever entrance canopy.',
    highlights: ['Charcoal Architectural Cladding', 'Vertical Teak Louver Integration', 'Illuminated Cantilever Canopy Box']
  },
  {
    id: 'aurora-executive-lobby',
    title: 'Aurora Lobby — 3D Gold on Textured Slate',
    category: '3d-name-boards',
    categoryName: '3D Name Board',
    client: 'Aurora Heights & Hospitality',
    location: 'Panampilly Nagar, Kochi',
    year: '2026',
    image: 'assets/images/nexora-service-3d-letters.jpg',
    featured: true,
    wide: false,
    description: 'Hand-finished brushed gold titanium dimensional typography mounted on dark textured split-face slate and vertical walnut slats with directional track spotlights.',
    highlights: ['Titanium Gold Dimensional Lettering', 'Split-Face Slate Feature Wall', 'Concealed LED Warm Halo Glow']
  },
  {
    id: 'elara-boutique-counter',
    title: 'Elara Hotel — Curved Slat Reception',
    category: 'custom-furniture-interiors',
    categoryName: 'Custom Interiors',
    client: 'Elara Boutique Hotel',
    location: 'Fort Kochi, Kerala',
    year: '2026',
    image: 'assets/images/nexora-service-custom-interiors.jpg',
    featured: true,
    wide: false,
    description: 'Custom curved reception desk with vertical dark walnut fluted slats, brushed brass metallic inlay trim, and solid quartz countertop with ambient underglow.',
    highlights: ['Curved Walnut Fluted Frontage', 'Solid Quartz Countertop with Underglow', 'Brushed Brass Inlay Trims']
  },
  {
    id: 'cinema-monolith-wayfinding',
    title: 'Cinema Gallery — Architectural Monolith',
    category: 'wayfinding-systems',
    categoryName: 'Wayfinding System',
    client: 'Cinema Gallery & PVR',
    location: 'Edappally / Kochi',
    year: '2026',
    image: 'assets/images/nexora-service-wayfinding.jpg',
    featured: true,
    wide: false,
    description: 'Brushed titanium and matte black floor monolith with warm backlit laser typography, screen directions, and floor indicators for high-traffic public spaces.',
    highlights: ['Anodized Titanium Finish', 'Concealed Warm Backlit Typography', 'Heavy-Duty Freestanding Monolith Base']
  },
  {
    id: 'aurora-acrylic-signage',
    title: 'Aurora Design — Cobalt & Gold 3D Letters',
    category: '3d-name-boards',
    categoryName: 'Precision Signage',
    client: 'Aurora Creative Agency',
    location: 'Ernakulam, Kerala',
    year: '2026',
    image: 'assets/images/nexora-showcase-acrylic-cobalt.jpg',
    featured: true,
    wide: false,
    description: 'Precision dual-layer acrylic dimensional lettering featuring mirror gold face and cobalt blue core, mounted on acoustic dark charcoal micro-ribbed panels.',
    highlights: ['Dual-Layer Cobalt & Gold Lettering', 'Micro-Ribbed Acoustic Charcoal Felt', 'Razor-Sharp Laser Beveled Edges']
  },
  {
    id: 'executive-glass-manifestation',
    title: 'Executive Suite — Geometric Glass Glazing',
    category: 'shopfront-facade-graphics',
    categoryName: 'Glass Manifestation',
    client: 'The Executive Suite',
    location: 'Infopark, Kakkanad',
    year: '2026',
    image: 'assets/images/nexora-showcase-glass-manifestation.jpg',
    featured: false,
    wide: false,
    description: 'Architectural privacy frosted glass manifestation films featuring refined linear geometric line patterns, bronze door handles, and warm interior lighting.',
    highlights: ['Frosted Dusted Crystal Vinyl', 'Precision Plotter-Cut Linear Geometry', 'Contemporary Executive Privacy Solution']
  },

  {
    id: 'saaveri-reception-counter',
    title: 'Saaveri — Architectural Reception Desk',
    category: 'custom-furniture-interiors',
    categoryName: 'Interior & Counters',
    client: 'Saaveri Boutique',
    location: 'Panampilly Nagar, Kochi',
    year: '2026',
    image: 'assets/images/saaveri-reception-counter.jpg',
    featured: true,
    wide: false,
    description: 'Custom fluted green and crisp white reception counter with solid acrylic top, perfectly harmonizing with the wall-mounted gold brand insignia above.',
    highlights: ['Curved Fluted Frontage', 'Seamless White Solid Surface', 'Integrated Concealed Cable Management']
  },
  {
    id: 'ennidam-mind-care',
    title: 'Ennidam Mind Care — Multi-Level Facade',
    category: 'shopfront-facade-graphics',
    categoryName: 'Architectural Facade',
    client: 'Ennidam Mind Care Valley',
    location: 'Ernakulam, Kerala',
    year: '2026',
    image: 'assets/images/ennidam-mind-care-facade.jpg',
    featured: true,
    wide: true,
    description: 'Complete commercial building facade integration featuring vertical natural timber-tone louvers, structural glass curtain walls, and illuminated main entry fascia signage.',
    highlights: ['Vertical Louver Cladding', 'Warm Wood-Tone Fascia Box', 'Architectural Exterior Signage']
  },
  {
    id: 'metro-gadgetz-led',
    title: 'Metro Gadgetz — The Apple Expert Facade',
    category: 'led-signboards',
    categoryName: 'LED Signage & Retail',
    client: 'Metro Gadgetz',
    location: 'Ernakulam, Kerala',
    year: '2026',
    image: 'assets/images/metro-gadgetz-led-signboard.jpg',
    featured: true,
    wide: false,
    description: 'High-impact illuminated retail store facade featuring a luminous 3D Apple-themed emblem, precision halo-lit acrylic channel letters, and architectural spotlighting.',
    highlights: ['Luminous 3D Halo-Lit Lettering', 'Custom Laser-Cut Apple Emblem', 'Integrated Warm Showroom Illumination']
  },
  {
    id: 'aqes-corporate-signage',
    title: 'AQES ERP Solutions — Executive Lobby Wall',
    category: 'office-corporate-signage',
    categoryName: 'Corporate Office',
    client: 'AQUTECH ERP Solutions',
    location: 'Infopark / Kakkanad, Kochi',
    year: '2026',
    image: 'assets/images/aqes-corporate-signage.jpg',
    featured: true,
    wide: false,
    description: 'Multi-layer 3D globe emblem and precision typography framed by dark walnut vertical slat trims against an understated geometric wallpaper feature.',
    highlights: ['3D Globe Segmented Emblem', 'Gloss Acrylic Letters on Geometric Background', 'Architectural Timber Slat Framing']
  },
  {
    id: 'cinema-multiplex-wayfinding',
    title: 'PVR Multiplex — Dual-Faceted Wayfinding',
    category: 'wayfinding-systems',
    categoryName: 'Wayfinding System',
    client: 'Prestige Multiplex Theaters',
    location: 'Kochi, Kerala',
    year: '2026',
    image: 'assets/images/cinema-multiplex-wayfinding.jpg',
    featured: false,
    wide: false,
    description: 'Corner architectural directional signage box with raised black gloss acrylic directional arrows, screen markers, and pictogram identifiers on brushed metallic panels.',
    highlights: ['Corner-wrap 90° Dual Panel', 'Tactile Gloss Raised Lettering', 'Industrial Bronze & Titanium Finish']
  },
  {
    id: 'karthika-residence-nameplate',
    title: 'Karthika Residence — Laser-Cut Wood Acrylic Plate',
    category: '3d-name-boards',
    categoryName: '3D Name Boards',
    client: "Ravi & Sheeja's Residence",
    location: 'Kochi, Kerala',
    year: '2026',
    image: 'assets/images/karthika-residence-custom-wooden-nameplate.jpg',
    featured: false,
    wide: false,
    description: 'Architectural residential nameplate crafted from wood-textured composite paneling with laser-cut silhouette house motif, 3D raised white cursive typography, and stainless steel standoffs.',
    highlights: ['Natural Wood Grain Composite Finish', '3D Raised Cursive Acrylic Script', 'Stainless Steel Standoff Fasteners']
  }
];

const GOOGLE_REVIEWS_DATA = [
  {
    author: 'Sunil Varghese',
    rating: 5,
    location: 'Panampilly Nagar, Ernakulam',
    date: '2 weeks ago',
    text: 'Ashik and the Nexora team delivered an outstanding 3D gold finish sign for our boutique. The attention to detail, precision laser cutting, and clean lighting installation exceeded our expectations. Highly recommended for premium signage work!'
  },
  {
    author: 'Dr. Joseph Mathew',
    rating: 5,
    location: 'Kochi, Kerala',
    date: '1 month ago',
    text: 'Extremely professional team. They executed our hospital clinic building facade and LED name board on time. The LED illumination is crystal clear and very attractive at night. True craftsmanship!'
  },
  {
    author: 'Rahul K. Menon',
    rating: 5,
    location: 'Kakkanad, Kochi',
    date: '1 month ago',
    text: 'We hired Nexora for our entire supermarket interior branding and checkout counter wraps. The color accuracy, durability of the vinyl, and speed of installation were top notch. Great communication throughout.'
  },
  {
    author: 'Aparna Nair',
    rating: 5,
    location: 'Edappally, Ernakulam',
    date: '2 months ago',
    text: 'Nexora is by far the most creative signage studio in Ernakulam. Their designs don’t look like typical generic flex boards — they provide high-end architectural aesthetics that make your business look like a luxury brand.'
  }
];

window.SERVICES_DATA = SERVICES_DATA;
window.PROJECTS_DATA = PROJECTS_DATA;
window.GOOGLE_REVIEWS_DATA = GOOGLE_REVIEWS_DATA;

/* ===================================================================
   NAVBAR & MOBILE MENU
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 180;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

/* ===================================================================
   HERO LUXURY INTERIOR ANIMATED CANVAS & PARALLAX
   =================================================================== */
function initHeroAnimatedCanvas() {
  const canvas = document.getElementById('hero-particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const heroSection = document.getElementById('home');
  const interiorLayer = document.querySelector('.hero-interior-animated-layer');

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    if (!heroSection) return;
    width = heroSection.clientWidth;
    height = heroSection.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  // Parallax on mouse move
  let targetParallaxX = 0, targetParallaxY = 0;
  let currentParallaxX = 0, currentParallaxY = 0;

  if (window.matchMedia('(pointer: fine)').matches && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (width || 1) - 0.5;
      const y = (e.clientY - rect.top) / (height || 1) - 0.5;
      targetParallaxX = x * 24;
      targetParallaxY = y * 16;
    });
    heroSection.addEventListener('mouseleave', () => {
      targetParallaxX = 0;
      targetParallaxY = 0;
    });
  }

  // Golden architectural ambient light particles
  const particleCount = 42;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 800),
      radius: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.45 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulse: Math.random() * Math.PI,
      isGold: Math.random() > 0.3
    });
  }

  let isCanvasVisible = true;
  let canvasAnimId = null;

  if ('IntersectionObserver' in window && heroSection) {
    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !canvasAnimId) {
          animate();
        }
      });
    }, { threshold: 0.05 });
    canvasObserver.observe(heroSection);
  }

  function animate() {
    if (!isCanvasVisible) {
      canvasAnimId = null;
      return;
    }
    canvasAnimId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, width, height);

    // Smooth parallax interpolation for interior background
    if (interiorLayer) {
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.06;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.06;
      interiorLayer.style.transform = `translate3d(${-currentParallaxX}px, ${-currentParallaxY}px, 0)`;
    }

    // Render shimmering architectural particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * (width || 1200);
      }
      if (p.x < -10) p.x = (width || 1200) + 10;
      if (p.x > (width || 1200) + 10) p.x = -10;

      const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold
        ? `rgba(245, 158, 11, ${currentAlpha})`
        : `rgba(255, 255, 255, ${currentAlpha * 0.75})`;
      ctx.shadowBlur = p.radius * 4;
      ctx.shadowColor = p.isGold ? 'rgba(245, 158, 11, 0.8)' : 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
      ctx.restore();
    });

    // Draw subtle dynamic constellation lines between nearby floating particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.18;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].isGold || particles[j].isGold
            ? `rgba(245, 158, 11, ${lineAlpha})`
            : `rgba(56, 189, 248, ${lineAlpha * 0.7})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }
  animate();
}

/* ===================================================================
   CUSTOM CURSOR
   =================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  if (!cursor || !follower) return;

  // Only activate on devices with fine pointer (mouse)
  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function render() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Event delegation for static and dynamically rendered interactive elements
    const interactiveSelector = 'a, button, .service-card, .project-card, .pillar-card, .review-card, input, select, textarea, .filter-btn, .video-control-btn';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) {
        follower.classList.add('hovered');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector)) {
        follower.classList.remove('hovered');
      }
    });
  }
}

/* ===================================================================
   JESPER LANDBERG-STYLE 3D CURVED CYLINDRICAL SERVICES CAROUSEL
   - Mathematical 3D curved perspective ribbon
   - Dynamic rotateY, translateZ, scale, and lighting falloff
   - Physics-based smooth drag, momentum inertia, and wheel scroll
   - Infinite looping ribbon
   - Interactive modal integration
   =================================================================== */
function initServicesData() {
  const stage = document.getElementById('services-3d-stage');
  const track = document.getElementById('services-3d-track');
  const prevBtn = document.getElementById('services-prev-btn');
  const nextBtn = document.getElementById('services-next-btn');
  if (!stage || !track) return;

  const renderServiceCard = (service) => `
    <div class="service-3d-card" data-service-id="${service.id}" onclick="openServiceModal('${service.id}')">
      <img src="${service.image}" alt="${service.title}" class="service-3d-card-bg" loading="lazy" />
      <div class="service-3d-content">
        <span class="service-3d-tag">${service.category}</span>
        <h3 class="service-3d-title">${service.title}</h3>
        <p class="service-3d-desc">${service.shortDesc}</p>
        <div class="service-3d-footer">
          <span>${service.turnaround}</span>
          <span class="service-3d-link">
            Explore 3D Specs
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        </div>
      </div>
    </div>
  `;

  // Render cards (duplicate for infinite ribbon wrap)
  track.innerHTML = SERVICES_DATA.map(renderServiceCard).join('') + SERVICES_DATA.map(renderServiceCard).join('');

  const cards = Array.from(track.querySelectorAll('.service-3d-card'));
  const totalCards = cards.length;
  if (totalCards === 0) return;

  const isMobile = window.innerWidth <= 768;
  const cardSpacing = isMobile ? 310 : 380;
  const totalWidth = totalCards * cardSpacing;

  let progress = 0;
  let targetProgress = 0;
  let isDragging = false;
  let startX = 0;
  let startProgress = 0;
  let isHovered = false;
  let velocity = 0;
  let lastX = 0;
  const autoDriftSpeed = 2.4; // Faster, dynamic smooth auto-glide speed

  function update3DPositions() {
    if (!isDragging && !isHovered) {
      targetProgress += autoDriftSpeed;
    }

    // Smooth inertia interpolation
    progress += (targetProgress - progress) * 0.1;

    const stageWidth = stage.offsetWidth || window.innerWidth;

    cards.forEach((card, i) => {
      // Direct center-relative circular coordinate:
      let offset = (i * cardSpacing - progress) % totalWidth;
      if (offset < -totalWidth / 2) offset += totalWidth;
      if (offset > totalWidth / 2) offset -= totalWidth;

      // Normalized distance from center (-1 to 1 across visible viewport)
      const normDist = offset / (stageWidth * 0.48);

      // Jesper Landberg Curved Arc (Bold, clearly readable, prominent!)
      const rotateY = normDist * -18; // Subtle 3D arc
      const translateZ = -Math.abs(normDist) * 75; // Gentle depth
      const scale = Math.max(0.82, 1 - Math.abs(normDist) * 0.12);
      const opacity = Math.max(0.35, 1 - Math.abs(normDist) * 0.35);
      const brightness = Math.max(0.72, 1 - Math.abs(normDist) * 0.25);

      card.style.transform = `translate(-50%, -50%) translate3d(${offset.toFixed(1)}px, 0px, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `brightness(${brightness.toFixed(3)})`;
    });

    requestAnimationFrame(update3DPositions);
  }

  // Dragging & Gesture Interactions
  stage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    lastX = e.clientX;
    startProgress = targetProgress;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    targetProgress = startProgress - dx * 1.5;
    velocity = e.clientX - lastX;
    lastX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      targetProgress -= velocity * 14; // Momentum throw
    }
  });

  // Touch Support
  stage.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      isDragging = true;
      startX = e.touches[0].clientX;
      lastX = e.touches[0].clientX;
      startProgress = targetProgress;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches || !e.touches[0]) return;
    const dx = e.touches[0].clientX - startX;
    targetProgress = startProgress - dx * 1.5;
    velocity = e.touches[0].clientX - lastX;
    lastX = e.touches[0].clientX;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      targetProgress -= velocity * 12;
    }
  });

  // Mouse Wheel Navigation (Increased responsiveness)
  stage.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 3) {
      targetProgress += delta * 1.5;
    }
  }, { passive: true });

  stage.addEventListener('mouseenter', () => { isHovered = true; });
  stage.addEventListener('mouseleave', () => { isHovered = false; });

  // Prev / Next Button Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      targetProgress -= cardSpacing;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      targetProgress += cardSpacing;
    });
  }

  requestAnimationFrame(update3DPositions);
}

window.openServiceModal = function(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  const modalBackdrop = document.getElementById('service-modal');
  const modalBody = document.getElementById('service-modal-body');
  if (!modalBackdrop || !modalBody) return;

  const waMessage = encodeURIComponent(`Hello Nexora Creative Studio, I am interested in discussing your ${service.title} service.`);
  const waUrl = `https://wa.me/919656885973?text=${waMessage}`;

  modalBody.innerHTML = `
    <img src="${service.image}" alt="${service.title}" class="modal-header-img" />
    <span class="eyebrow">${service.category}</span>
    <h2 class="modal-title">${service.title}</h2>
    
    <div class="modal-meta-row">
      <span>Turnaround: ${service.turnaround}</span>
      <span>•</span>
      <span>Custom Fabrication & Installation</span>
    </div>

    <p class="modal-desc-text">${service.fullDesc}</p>

    <div class="modal-specs-list">
      <h4>Included Deliverables & Specifications:</h4>
      <div class="modal-specs-grid">
        ${service.deliverables.map(d => `
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${d}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="modal-specs-list" style="margin-top: 16px;">
      <h4>Materials & Engineering Standard:</h4>
      <p style="color: var(--text-secondary); font-size: 0.95rem;">${service.materials}</p>
    </div>

    <div style="display: flex; gap: 16px; margin-top: 30px; flex-wrap: wrap;">
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.65.81-.8 1-.15.19-.3.21-.55.08-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z"/>
        </svg>
        Inquire on WhatsApp
      </a>
      <a href="tel:+919656885973" class="btn btn-primary">
        Call Ashik E.A: 9656885973
      </a>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
  window.location.hash = `service-${serviceId}`;
};

/* ===================================================================
   PROJECTS POPULATION & MODAL
   =================================================================== */
let currentProjectFilter = 'all';
let lastProjectCols = window.innerWidth <= 680 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);

function initProjectsData() {
  const grid = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  renderProjects('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProjectFilter = btn.getAttribute('data-filter') || 'all';
      renderProjects(currentProjectFilter);
    });
  });

  window.addEventListener('resize', () => {
    const newCols = window.innerWidth <= 680 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    if (newCols !== lastProjectCols) {
      lastProjectCols = newCols;
      renderProjects(currentProjectFilter);
    }
  });
}

function renderProjects(filter) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter || (filter === 'featured' && p.featured));

  const isMobile = window.innerWidth <= 680;
  const isTablet = window.innerWidth <= 1024 && !isMobile;
  const numCols = isMobile ? 1 : (isTablet ? 2 : 3);

  // Group items into columns for the asynchronous Hola.design parallax flow
  const cols = Array.from({ length: numCols }, () => []);
  filtered.forEach((project, idx) => {
    cols[idx % numCols].push(project);
  });

  const renderCard = (project, idx) => `
    <div class="project-card ${idx % 2 === 0 ? 'featured-tall' : ''}" data-project-id="${project.id}" onclick="openProjectModal('${project.id}')">
      <img src="${project.image}" alt="${project.title}" class="project-card-img" loading="lazy" />
      <div class="project-card-top-pill">
        <span>${project.categoryName}</span>
      </div>
      <div class="project-card-overlay">
        <h3 class="project-card-title">${project.title}</h3>
        <div class="project-card-meta-line">
          <span>${project.location}</span>
          <span>•</span>
          <span>${project.year}</span>
        </div>
        <span class="project-card-action">
          View Project Case Study
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    </div>
  `;

  grid.innerHTML = cols.map((colItems, colIdx) => `
    <div class="portfolio-parallax-col col-${colIdx + 1}" data-col-index="${colIdx}">
      ${colItems.map((p, i) => renderCard(p, i)).join('')}
    </div>
  `).join('');

  if (typeof updateParallaxItemsFn === 'function') {
    updateParallaxItemsFn();
  }
}

window.openProjectModal = function(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  if (!modalBackdrop || !modalBody) return;

  const waMessage = encodeURIComponent(`Hello Nexora Creative Studio, I saw your project "${project.title}" and would like to get a quote for a similar requirement.`);
  const waUrl = `https://wa.me/919656885973?text=${waMessage}`;

  modalBody.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="modal-header-img" />
    <span class="eyebrow">${project.categoryName}</span>
    <h2 class="modal-title">${project.title}</h2>

    <div class="modal-meta-row">
      <span>Client: ${project.client}</span>
      <span>•</span>
      <span>Location: ${project.location}</span>
      <span>•</span>
      <span>Year: ${project.year}</span>
    </div>

    <p class="modal-desc-text">${project.description}</p>

    <div class="modal-specs-list">
      <h4>Project Highlights & Execution:</h4>
      <div class="modal-specs-grid">
        ${project.highlights.map(h => `
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${h}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 16px; margin-top: 30px; flex-wrap: wrap;">
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.65.81-.8 1-.15.19-.3.21-.55.08-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z"/>
        </svg>
        Request a Similar Quote on WhatsApp
      </a>
      <a href="tel:+919656885973" class="btn btn-outline">
        Call Direct: 9656885973
      </a>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
  window.location.hash = `project-${projectId}`;
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = 'auto';
  history.pushState("", document.title, window.location.pathname + window.location.search);
};

// Handle ESC key and backdrop clicks
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

/* ===================================================================
   GOOGLE REVIEWS POPULATION
   =================================================================== */
function initGoogleReviews() {
  const grid = document.getElementById('google-reviews-grid');
  if (!grid) return;

  grid.innerHTML = GOOGLE_REVIEWS_DATA.map(review => `
    <div class="review-card">
      <div>
        <div class="review-header">
          <div class="reviewer-profile">
            <div class="reviewer-avatar">${review.author.charAt(0)}</div>
            <div>
              <div class="reviewer-name">${review.author}</div>
              <div class="reviewer-location">${review.location}</div>
            </div>
          </div>
          <svg class="google-icon-small" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
        </div>
        <div class="google-stars" style="margin-bottom: 12px;">
          ★★★★★
        </div>
        <p class="review-text">"${review.text}"</p>
      </div>
      <div class="review-footer">
        <span>Verified Google Review</span>
        <span>${review.date}</span>
      </div>
    </div>
  `).join('');
}

/* ===================================================================
   VIDEO CONTROLS
   =================================================================== */
function initVideoControls() {
  const video = document.getElementById('showreel-player');
  const toggleBtn = document.getElementById('video-toggle-btn');
  const muteBtn = document.getElementById('video-mute-btn');

  if (!video) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        toggleBtn.innerHTML = 'Pause Reel';
      } else {
        video.pause();
        toggleBtn.innerHTML = 'Play Reel';
      }
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteBtn.innerHTML = video.muted ? 'Unmute' : 'Mute';
    });
  }
}

/* ===================================================================
   CONTACT FORM & WHATSAPP GENERATOR
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('nexora-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    const compiledText = `Hello Nexora Creative Studio,%0A%0AMy Name: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService Needed: ${encodeURIComponent(service)}%0AProject Details: ${encodeURIComponent(message)}`;
    
    // Redirect to direct WhatsApp with compiled inquiry
    window.open(`https://wa.me/919656885973?text=${compiledText}`, '_blank');

    const formAlert = document.getElementById('form-success-msg');
    if (formAlert) {
      formAlert.style.display = 'block';
      form.reset();
    }
  });
}

/* ===================================================================
   URL HASH ROUTING (Direct deep link to projects or services)
   =================================================================== */
function initHashRouting() {
  const hash = window.location.hash.substring(1);
  if (!hash) return;

  if (hash.startsWith('service-')) {
    const serviceId = hash.replace('service-', '');
    setTimeout(() => openServiceModal(serviceId), 400);
  } else if (hash.startsWith('project-')) {
    const projectId = hash.replace('project-', '');
    setTimeout(() => openProjectModal(projectId), 400);
  }
}

/* ===================================================================
   GSAP SHOWCASE 3D LOGO SECTION — EXPLODED ASSEMBLY & DISPERSION SYSTEM
   - Scroll Down: Dispersed parts fly in from different sides of the screen
     and smoothly assemble / lock into place (Scrubbed with GSAP ScrollTrigger)
   - Scroll Up: Parts fly back out to their dispersed positions
   - Interactive: 60/120fps Gyroscopic Magnetic Tilt + Ambient Levitation
   =================================================================== */
/* ===================================================================
   GSAP SHOWCASE 3D LOGO SECTION — STRICT 4-STEP DISCRETE PINNED REVEAL
   - Screen remains completely pinned/fixed throughout all 4 stages
   - Scroll 1: ONLY "N" appears (nothing else visible)
   - Scroll 2: ONLY the logo mark/symbol is added to "N"
   - Scroll 3: ONLY the "Writings" / brand text is added
   - Scroll 4: The complete, perfectly aligned final logo is revealed
   - After Step 4 (100% complete): Unpins and allows downward scroll
   - Scroll Up Reversal:
       1st upward scroll -> remove final logo extras
       2nd upward scroll -> remove Writings/text
       3rd upward scroll -> remove logo mark
       4th upward scroll -> remove "N", returning to initial clean state
   =================================================================== */
function initLogo3DShowcaseAnimation() {
  const pinTrack = document.getElementById('about-pin-track');
  const section = document.getElementById('about');
  const stage = document.getElementById('about-visual-stage');
  const core = document.getElementById('about-logo-card');
  const symbolWrap = document.getElementById('about-logo-symbol-wrap');
  const metaWrap = document.getElementById('about-logo-meta-wrap');
  
  // 1. Letter "N"
  const letterN = document.getElementById('about-letter-n');
  const letterNOrange = document.getElementById('about-letter-n-orange');

  // 2. Logo Mark / Symbol Components
  const arrow = document.getElementById('about-logo-arrow');
  const ringOuter = document.getElementById('about-ring-outer');
  const ringInner = document.getElementById('about-ring-inner');
  const coreCircle = document.getElementById('about-core-circle');

  // 3. Writings / Brand Text Components
  const title = document.getElementById('about-logo-title');
  const sub = document.getElementById('about-logo-sub');
  const motto = document.getElementById('about-logo-motto');
  const pill = document.getElementById('about-logo-pill');

  // 4. Full Logo Completion Extras
  const badge = document.getElementById('about-badge-floating');
  const badgeLeft = document.getElementById('about-badge-floating-left');
  const reticle = document.getElementById('about-reticle');
  const hudTL = document.getElementById('hud-tl');
  const hudTR = document.getElementById('hud-tr');
  const hudBL = document.getElementById('hud-bl');
  const hudBR = document.getElementById('hud-br');
  const glowBlue = document.getElementById('stage-glow-blue');
  const glowGold = document.getElementById('stage-glow-gold');

  const preBeacon = document.getElementById('about-pre-beacon');

  if (!stage || !core || !pinTrack) return;

  let currentStep = 0; // 0 = empty, 1 = N only, 2 = N + Mark, 3 = N + Mark + Text, 4 = Full Logo

  // Discrete Step State Renderer
  function applyStep(step, immediate = false) {
    const dur = immediate ? 0 : 0.55;

    // Stage 0: Pre-Assembly Holographic Beacon (visible at step 0, vanishes as logo animation comes)
    if (preBeacon) {
      if (step === 0) {
        gsap.to(preBeacon, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: dur, ease: 'power2.out', overwrite: 'auto' });
      } else {
        gsap.to(preBeacon, { opacity: 0, scale: 1.8, filter: 'blur(10px)', duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      }
    }

    // Stage 1: Letter "N" (Blue top & Orange bottom)
    const nElements = [letterN, letterNOrange].filter(Boolean);
    if (nElements.length > 0) {
      if (step >= 1) {
        gsap.to(nElements, { opacity: 1, scale: 1, y: 0, rotation: 0, duration: dur, ease: 'back.out(1.4)', overwrite: 'auto' });
      } else {
        gsap.to(nElements, { opacity: 0, scale: 0.2, y: -120, rotation: 35, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      }
    }

    // Stage 2: Logo Mark / Symbol (Arrow, Rings & Shield)
    if (step >= 2) {
      if (coreCircle) gsap.to(coreCircle, { opacity: 1, scale: 1, duration: dur, ease: 'back.out(1.4)', overwrite: 'auto' });
      if (ringOuter) gsap.to(ringOuter, { opacity: 1, scale: 1, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (ringInner) gsap.to(ringInner, { opacity: 1, scale: 1, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (arrow) gsap.to(arrow, { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0, duration: dur, ease: 'back.out(1.4)', overwrite: 'auto' });
    } else {
      if (coreCircle) gsap.to(coreCircle, { opacity: 0, scale: 0.05, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (ringOuter) gsap.to(ringOuter, { opacity: 0, scale: 3.2, rotation: -260, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (ringInner) gsap.to(ringInner, { opacity: 0, scale: 0.02, rotation: 260, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (arrow) gsap.to(arrow, { opacity: 0, scale: 0.15, x: -320, y: 200, rotation: -70, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
    }

    // Stage 3: Writings / Brand Text (NEXORA, CREATIVE STUDIO, motto, pill)
    if (step >= 3) {
      if (title) gsap.to(title, { opacity: 1, y: 0, x: 0, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (sub) gsap.to(sub, { opacity: 1, y: 0, x: 0, letterSpacing: '6px', duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (motto) gsap.to(motto, { opacity: 1, y: 0, scale: 1, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (pill) gsap.to(pill, { opacity: 1, y: 0, scale: 1, duration: dur, ease: 'power2.out', overwrite: 'auto' });
    } else {
      if (title) gsap.to(title, { opacity: 0, y: 120, x: -80, rotation: -12, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (sub) gsap.to(sub, { opacity: 0, y: 80, x: 80, letterSpacing: '16px', duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (motto) gsap.to(motto, { opacity: 0, y: 60, scale: 0.8, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (pill) gsap.to(pill, { opacity: 0, y: 50, scale: 0.6, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
    }

    // Stage 4: Full Logo Completion Extras (Badge, Reticle, HUD Brackets, Glows)
    if (step >= 4) {
      if (glowBlue) gsap.to(glowBlue, { opacity: 1, scale: 1, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (glowGold) gsap.to(glowGold, { opacity: 1, scale: 1, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (hudTL) gsap.to(hudTL, { opacity: 0.85, x: 0, y: 0, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (hudTR) gsap.to(hudTR, { opacity: 0.85, x: 0, y: 0, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (hudBL) gsap.to(hudBL, { opacity: 0.85, x: 0, y: 0, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (hudBR) gsap.to(hudBR, { opacity: 0.85, x: 0, y: 0, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (reticle) gsap.to(reticle, { opacity: 0.6, scale: 1, rotation: 0, duration: dur, ease: 'power2.out', overwrite: 'auto' });
      if (badge) gsap.to(badge, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: dur, ease: 'back.out(1.5)', overwrite: 'auto' });
      if (badgeLeft) gsap.to(badgeLeft, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: dur, ease: 'back.out(1.5)', overwrite: 'auto' });
    } else {
      if (glowBlue) gsap.to(glowBlue, { opacity: 0, scale: 0.15, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (glowGold) gsap.to(glowGold, { opacity: 0, scale: 0.15, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (hudTL) gsap.to(hudTL, { opacity: 0, x: -300, y: -200, rotation: -90, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (hudTR) gsap.to(hudTR, { opacity: 0, x: 300, y: -200, rotation: 90, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (hudBL) gsap.to(hudBL, { opacity: 0, x: -300, y: 200, rotation: 90, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (hudBR) gsap.to(hudBR, { opacity: 0, x: 300, y: 200, rotation: -90, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (reticle) gsap.to(reticle, { opacity: 0, scale: 3.0, rotation: 180, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (badge) gsap.to(badge, { opacity: 0, x: 380, y: 260, rotation: 35, scale: 0.2, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
      if (badgeLeft) gsap.to(badgeLeft, { opacity: 0, x: -380, y: -260, rotation: -35, scale: 0.2, duration: dur * 0.7, ease: 'power2.in', overwrite: 'auto' });
    }
  }

  // Set initial state (0 = clean empty stage)
  applyStep(0, true);

  const isMobileLogo = window.innerWidth <= 768;

  // GSAP ScrollTrigger to firmly pin section and manage discrete 4-step progress
  const stepTrigger = ScrollTrigger.create({
    trigger: pinTrack,
    start: 'top top',
    end: isMobileLogo ? '+=100%' : '+=300%',
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      let targetStep = 0;
      if (self.progress > 0.05 && self.progress <= 0.32) {
        targetStep = 1;
      } else if (self.progress > 0.32 && self.progress <= 0.62) {
        targetStep = 2;
      } else if (self.progress > 0.62 && self.progress <= 0.88) {
        targetStep = 3;
      } else if (self.progress > 0.88) {
        targetStep = 4;
      }

      if (targetStep !== currentStep) {
        currentStep = targetStep;
        applyStep(currentStep);
      }
    },
    ...( ('ontouchstart' in window || navigator.maxTouchPoints > 0) ? {} : {
      snap: {
        snapTo: [0, 0.25, 0.5, 0.75, 1.0],
        duration: { min: 0.3, max: 0.6 },
        ease: 'power2.inOut',
        delay: 0.02
      }
    })
  });



  // 2. High-Performance Gyroscopic 3D Tilt via gsap.quickTo
  const qCoreRotX = gsap.quickTo(core, 'rotationX', { duration: 0.6, ease: 'power3.out' });
  const qCoreRotY = gsap.quickTo(core, 'rotationY', { duration: 0.6, ease: 'power3.out' });
  const qCoreZ = gsap.quickTo(core, 'z', { duration: 0.6, ease: 'power3.out' });

  const qSymbolX = symbolWrap ? gsap.quickTo(symbolWrap, 'x', { duration: 0.7, ease: 'power3.out' }) : null;
  const qSymbolY = symbolWrap ? gsap.quickTo(symbolWrap, 'y', { duration: 0.7, ease: 'power3.out' }) : null;

  const qMetaX = metaWrap ? gsap.quickTo(metaWrap, 'x', { duration: 0.65, ease: 'power3.out' }) : null;
  const qMetaY = metaWrap ? gsap.quickTo(metaWrap, 'y', { duration: 0.65, ease: 'power3.out' }) : null;

  const qBadgeX = badge ? gsap.quickTo(badge, 'x', { duration: 0.8, ease: 'power3.out' }) : null;
  const qBadgeY = badge ? gsap.quickTo(badge, 'y', { duration: 0.8, ease: 'power3.out' }) : null;
  const qBadgeRotX = badge ? gsap.quickTo(badge, 'rotationX', { duration: 0.8, ease: 'power3.out' }) : null;
  const qBadgeRotY = badge ? gsap.quickTo(badge, 'rotationY', { duration: 0.8, ease: 'power3.out' }) : null;

  const qReticleX = reticle ? gsap.quickTo(reticle, 'x', { duration: 0.75, ease: 'power3.out' }) : null;
  const qReticleY = reticle ? gsap.quickTo(reticle, 'y', { duration: 0.75, ease: 'power3.out' }) : null;

  // 3. Ambient Idle 3D Levitation Loop (Active after assembly)
  let isHovered = false;
  const idleLevitation = gsap.timeline({ repeat: -1, yoyo: true, paused: false });
  idleLevitation.to(core, {
    y: -10,
    rotationZ: 0.6,
    duration: 3.6,
    ease: 'sine.inOut'
  });

  let idleBadge = null;
  if (badge) {
    idleBadge = gsap.to(badge, {
      y: 8,
      rotationZ: -0.8,
      duration: 3.0,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  function onPointerMove(e) {
    isHovered = true;
    idleLevitation.pause();
    if (idleBadge) idleBadge.pause();

    const rect = stage.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width / 2);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height / 2);

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const nx = (x / rect.width) - 0.5;   // -0.5 to 0.5
    const ny = (y / rect.height) - 0.5;  // -0.5 to 0.5

    // Tilt calculations (deg)
    const rotY = nx * 22;
    const rotX = -ny * 20;

    qCoreRotX(rotX);
    qCoreRotY(rotY);
    qCoreZ(25);

    // Multi-depth layer translations
    if (qSymbolX && qSymbolY) {
      qSymbolX(nx * 32);
      qSymbolY(ny * 26);
    }

    if (qMetaX && qMetaY) {
      qMetaX(nx * 18);
      qMetaY(ny * 14);
    }

    if (qBadgeX && qBadgeY) {
      qBadgeX(nx * 44);
      qBadgeY(ny * 36);
      if (qBadgeRotX) qBadgeRotX(-ny * 16);
      if (qBadgeRotY) qBadgeRotY(nx * 20);
    }

    if (qReticleX && qReticleY) {
      qReticleX(nx * 20);
      qReticleY(ny * 16);
    }
  }

  function onPointerLeave() {
    isHovered = false;

    qCoreRotX(0);
    qCoreRotY(0);
    qCoreZ(0);

    if (qSymbolX && qSymbolY) {
      qSymbolX(0);
      qSymbolY(0);
    }

    if (qMetaX && qMetaY) {
      qMetaX(0);
      qMetaY(0);
    }

    if (qBadgeX && qBadgeY) {
      qBadgeX(0);
      qBadgeY(0);
      if (qBadgeRotX) qBadgeRotX(0);
      if (qBadgeRotY) qBadgeRotY(0);
    }

    if (qReticleX && qReticleY) {
      qReticleX(0);
      qReticleY(0);
    }

    // Smoothly resume ambient levitation
    gsap.delayedCall(0.4, () => {
      if (!isHovered) {
        idleLevitation.play();
        if (idleBadge) idleBadge.play();
      }
    });
  }

  stage.addEventListener('mousemove', onPointerMove, { passive: true });
  stage.addEventListener('mouseleave', onPointerLeave, { passive: true });

  // Touch Support for mobile / tablets
  stage.addEventListener('touchmove', onPointerMove, { passive: true });
  stage.addEventListener('touchend', onPointerLeave, { passive: true });

  // 4. Click 3D Elastic Pulse
  core.addEventListener('mousedown', () => {
    gsap.to(core, { scale: 0.96, z: -15, duration: 0.15, ease: 'power2.out' });
  });

  window.addEventListener('mouseup', () => {
    if (isHovered) {
      gsap.to(core, { scale: 1, z: 25, duration: 0.35, ease: 'back.out(1.8)' });
    } else {
      gsap.to(core, { scale: 1, z: 0, duration: 0.35, ease: 'power2.out' });
    }
  });
}

/* ===================================================================
   WHY BUSINESSES CHOOSE NEXORA — MULTI-DIRECTIONAL ENTRANCE & EXIT ANIMATION
   - Card 1 (01): Enters from Left
   - Card 2 (02): Enters from Bottom
   - Card 3 (03): Enters from Top
   - Card 4 (04): Enters from Right
   - Card 5 (05): Enters from Right
   - Staggered, smooth, premium 60fps GSAP ScrollTrigger
   - Enter / Leave / EnterBack / LeaveBack: Smoothly moves out on leave, replays on return
   - Normal page scrolling (no pin or lock)
   =================================================================== */
function initWhyNexoraPillarsAnimation() {
  const section = document.getElementById('why-nexora');
  const cards = document.querySelectorAll('#why-nexora .pillar-card');
  if (!section || cards.length < 5) return;

  // Multi-Directional Mapping: Left, Bottom, Top, Right, Far-Right
  const initialTransforms = [
    { x: -160, y: 0, opacity: 0 },  // 01: Left
    { x: 0, y: 140, opacity: 0 },   // 02: Bottom
    { x: 0, y: -140, opacity: 0 },  // 03: Top
    { x: 150, y: 0, opacity: 0 },   // 04: Right
    { x: 210, y: 0, opacity: 0 }    // 05: Right
  ];

  // Set initial hidden transforms
  cards.forEach((card, i) => {
    const t = initialTransforms[i] || { y: 60, opacity: 0 };
    gsap.set(card, { x: t.x, y: t.y, opacity: 0, willChange: 'transform, opacity' });
  });

  const tl = gsap.timeline({
    paused: true
  });

  cards.forEach((card, i) => {
    tl.to(card, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out'
    }, i * 0.12);
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    end: 'bottom 15%',
    onEnter: () => {
      tl.timeScale(1).play();
    },
    onLeave: () => {
      tl.timeScale(1.4).reverse();
    },
    onEnterBack: () => {
      tl.timeScale(1).play();
    },
    onLeaveBack: () => {
      tl.timeScale(1.4).reverse();
    }
  });
}

/* ===================================================================
   SCROLL ANIMATIONS (IntersectionObserver + GSAP ScrollTrigger)
   =================================================================== */
function initScrollAnimations() {

  // GSAP ScrollTrigger for section headers and subtle entrance
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.from('.hero-badge', { opacity: 0, y: -16, duration: 0.9, ease: 'power2.out', delay: 0.2 });
    gsap.from('.hero-headline', { opacity: 0, y: 24, duration: 1, ease: 'power2.out', delay: 0.4 });
    gsap.from('.hero-subheadline', { opacity: 0, y: 24, duration: 1, ease: 'power2.out', delay: 0.55 });
    gsap.from('.hero-cta-group', { opacity: 0, y: 16, duration: 0.9, ease: 'power2.out', delay: 0.7 });

    // Smooth section headers scroll reveal
    gsap.utils.toArray('.section-padding').forEach(section => {
      const headerEls = section.querySelectorAll('.eyebrow, .section-title, .section-subtitle');
      if (headerEls.length > 0) {
        gsap.from(headerEls, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    });
  }
}

/* ===================================================================
   HOLA.DESIGN-STYLE SMOOTH SCROLL PARALLAX SYSTEM
   Dual-layer: Staggered Multi-Column Motion + Internal Image Glides
   =================================================================== */
let updateParallaxItemsFn = null;

function initImageScrollParallax() {
  let imageItems = [];
  let columnItems = [];
  let observer = null;

  function refreshItems() {
    // 1. Column Parallax
    const columns = document.querySelectorAll('.portfolio-parallax-col');
    columnItems = [];
    columns.forEach((col, idx) => {
      // Different column velocity rates for hola.design asymmetric flow
      const rates = [-35, 45, -25];
      const rate = rates[idx % 3] || -20;
      columnItems.push({
        el: col,
        rate,
        currentY: 0,
        targetY: 0,
        isVisible: true
      });
    });

    // 2. Individual Photo Parallax
    const containers = document.querySelectorAll(
      '.project-card, .insta-item, .founder-avatar-box, .service-card'
    );

    if (observer) {
      observer.disconnect();
    }

    imageItems = [];
    containers.forEach(container => {
      const img = container.querySelector(
        '.project-card-img, .insta-img, .founder-portrait-img, .service-card-bg-img'
      );
      if (!img) return;

      const item = {
        container,
        img,
        currentY: 0,
        targetY: 0,
        isVisible: true
      };
      imageItems.push(item);
    });

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const foundImg = imageItems.find(item => item.container === entry.target);
          if (foundImg) {
            foundImg.isVisible = entry.isIntersecting;
          }
          const foundCol = columnItems.find(item => item.el === entry.target);
          if (foundCol) {
            foundCol.isVisible = entry.isIntersecting;
          }
        });
      }, {
        rootMargin: '120px 0px 120px 0px',
        threshold: 0
      });

      imageItems.forEach(item => observer.observe(item.container));
      columnItems.forEach(col => observer.observe(col.el));
    }
  }

  updateParallaxItemsFn = refreshItems;
  refreshItems();

  function updateTargets() {
    const windowH = window.innerHeight || 800;
    const centerY = windowH / 2;

    // Update columns
    columnItems.forEach(col => {
      if (!col.isVisible) return;
      const rect = col.el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const progress = (elementCenter - centerY) / (windowH / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      col.targetY = Math.max(-8, Math.min(50, clamped * col.rate));
    });

    // Update individual images
    imageItems.forEach(item => {
      if (!item.isVisible) return;
      const rect = item.container.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const progress = (elementCenter - centerY) / (windowH / 2);
      const clamped = Math.max(-1.4, Math.min(1.4, progress));
      const maxShift = 32;
      item.targetY = clamped * maxShift;
    });
  }

  function loop() {
    // Animate Columns
    columnItems.forEach(col => {
      if (!col.isVisible) return;
      col.currentY += (col.targetY - col.currentY) * 0.1;
      col.el.style.transform = `translate3d(0, ${col.currentY.toFixed(2)}px, 0)`;
    });

    // Animate Images
    imageItems.forEach(item => {
      if (!item.isVisible) return;
      item.currentY += (item.targetY - item.currentY) * 0.12;
      item.img.style.transform = `translate3d(0, ${-item.currentY.toFixed(2)}px, 0) scale(1.08)`;
    });

    requestAnimationFrame(loop);
  }

  window.addEventListener('scroll', updateTargets, { passive: true });
  window.addEventListener('resize', () => {
    refreshItems();
    updateTargets();
  }, { passive: true });

  updateTargets();
  loop();
}

/* ===================================================================
   PINNED DISCRETE STEP-BY-STEP SCROLL-CONTROLLED STORYTELLING ENGINE
   - GSAP ScrollTrigger with pin: true and scrub: false
   - Physically locks viewport to section until all 5 stages complete
   - Discrete Wheel & Touch Gesture state machine (Stage 0 -> 1 -> 2 -> 3 -> 4)
   - Debounced isAnimating lock completely prevents stage skipping
   - Exact bi-directional reverse scroll support
   =================================================================== */
function initHolaOverviewAnimation() {
  const section = document.getElementById('overview');
  if (!section) return;

  const t1 = document.getElementById('story-text-1');
  const t2 = document.getElementById('story-text-2');
  const t3 = document.getElementById('story-text-3');
  const t4 = document.getElementById('story-text-4');

  const p1 = document.getElementById('story-photo-1');
  const p2 = document.getElementById('story-photo-2');
  const p3 = document.getElementById('story-photo-3');
  const p4 = document.getElementById('story-photo-4');

  if (!t1 || !t2 || !t3 || !t4 || !p1 || !p2 || !p3 || !p4) return;

  const texts = [t1, t2, t3, t4];
  const photos = [p1, p2, p3, p4];

  let currentStage = -1;

  function resetAll() {
    gsap.set(t1, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
    gsap.set([t2, t3, t4], { opacity: 0, y: 25, scale: 0.96, pointerEvents: 'none' });
    gsap.set(p1, { opacity: 1, scale: 1, pointerEvents: 'auto' });
    gsap.set([p2, p3, p4], { opacity: 0, scale: 0.92, pointerEvents: 'none' });
    currentStage = 0;
  }

  resetAll();

  function goToStage(targetStage) {
    if (targetStage === currentStage) return;
    currentStage = targetStage;
    const dur = 0.45;

    // Active text index: Stage 0 & 1 -> t1 (index 0), Stage 2 -> t2 (1), Stage 3 -> t3 (2), Stage 4 -> t4 (3)
    const activeTextIndex = targetStage === 0 ? 0 : targetStage - 1;

    texts.forEach((text, i) => {
      if (i === activeTextIndex) {
        gsap.to(text, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: dur,
          ease: 'power2.out',
          pointerEvents: 'auto',
          overwrite: 'auto'
        });
      } else {
        gsap.to(text, {
          opacity: 0,
          y: i < activeTextIndex ? -25 : 25,
          scale: 0.96,
          duration: dur * 0.7,
          ease: 'power2.in',
          pointerEvents: 'none',
          overwrite: 'auto'
        });
      }
    });

    // Active photo index: Stage 0 -> p1 (0), Stage 1 -> p1 (0), Stage 2 -> p2 (1), Stage 3 -> p3 (2), Stage 4 -> p4 (3)
    const activePhotoIndex = targetStage === 0 ? 0 : targetStage - 1;

    photos.forEach((photo, i) => {
      if (i === activePhotoIndex) {
        gsap.to(photo, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: dur,
          ease: 'power2.out',
          pointerEvents: 'auto',
          overwrite: 'auto'
        });
      } else {
        gsap.to(photo, {
          opacity: 0,
          scale: 0.92,
          duration: dur * 0.7,
          ease: 'power2.in',
          pointerEvents: 'none',
          overwrite: 'auto'
        });
      }
    });
  }

  const isMobileOverview = window.innerWidth <= 768;

  // Pure ScrollTrigger progress tracking mapped across 5 stages (0, 1, 2, 3, 4)
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: isMobileOverview ? '+=1200' : '+=2200',
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const p = self.progress;
      let targetStage = 0;
      if (p < 0.12) {
        targetStage = 0; // Text 1 only
      } else if (p >= 0.12 && p < 0.32) {
        targetStage = 1; // Text 1 + Photo 1
      } else if (p >= 0.32 && p < 0.55) {
        targetStage = 2; // Text 2 + Photo 2
      } else if (p >= 0.55 && p < 0.78) {
        targetStage = 3; // Text 3 + Photo 3
      } else {
        targetStage = 4; // Text 4 + Photo 4
      }
      goToStage(targetStage);
    }
  });

  // Mouse Parallax on desktop
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const relY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      [p1, p3].forEach(el => {
        if (gsap.getProperty(el, 'opacity') > 0.4) {
          gsap.to(el, { x: relX * 18, y: relY * 14, duration: 0.6, ease: 'power1.out' });
        }
      });

      [p2, p4].forEach(el => {
        if (gsap.getProperty(el, 'opacity') > 0.4) {
          gsap.to(el, { x: -relX * 20, y: -relY * 16, duration: 0.6, ease: 'power1.out' });
        }
      });
    }, { passive: true });
  }
}
