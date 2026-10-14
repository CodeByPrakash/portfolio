/**
 * Centralized Service Catalog & Configuration for Prakash Services
 * Web Development, Business Solutions, AI/ML, Digital Design & SEO
 */

export const CONTACT_CONFIG = {
  name: 'Om Prakash Behera',
  brandName: 'Prakash',
  email: 'omprakashbehera.cse@gmail.com',
  // WhatsApp phone number configuration. Can be overridden via NEXT_PUBLIC_WHATSAPP_NUMBER
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+917205252871',
  website: 'https://omprakashbehera.me',
  github: 'https://github.com/CodeByPrakash',
  linkedin: 'https://linkedin.com/in/omprakash-cse',
  instagram: 'https://instagram.com/quasar_om',
  workerUrl:
    process.env.NEXT_PUBLIC_WORKER_URL ||
    'https://portfolio-contact-api.omprakashbehera.workers.dev',
}

// ─────────────────────────────────────────────────────────────
// 1. BUSINESS WEBSITE SOLUTIONS (Image-based Cards)
// ─────────────────────────────────────────────────────────────
export const BUSINESS_WEBSITES = [
  {
    id: 'real-estate',
    title: 'Real Estate Websites',
    category: 'Business Websites',
    price: 8000,
    priceFormatted: '₹8,000',
    pricePrefix: 'Starting at',
    description: 'Property listings, filters, Google Maps, enquiry forms and more.',
    image: '/services/real-estate.jpg',
    iconName: 'Building2',
    ctaText: 'Build My Website',
    badge: 'Popular for Builders',
    features: [
      'Interactive Property Filters (BHK, Budget, Location)',
      'Google Maps & Neighborhood Highlights',
      'Instant Lead Capture & WhatsApp Connect',
      'Virtual Tour & High-Res Image Galleries',
      'Mobile-First Responsive Layout',
    ],
  },
  {
    id: 'hotel-resort',
    title: 'Hotel & Resort Websites',
    category: 'Business Websites',
    price: 10000,
    priceFormatted: '₹10,000',
    pricePrefix: 'Starting at',
    description: 'Room galleries, amenities, booking enquiry, maps and more.',
    image: '/services/hotel-resort.jpg',
    iconName: 'Palmtree',
    ctaText: 'Build My Hotel Website',
    badge: 'Hospitality Special',
    features: [
      'Room & Suite Showcase with Rates',
      'Direct Booking Inquiry Workflow',
      'Amenities & Local Sightseeing Guide',
      'Guest Reviews & Trust Badges',
      'Zero Commission WhatsApp Direct Booking',
    ],
  },
  {
    id: 'cafe-restaurant',
    title: 'Cafe & Restaurant Websites',
    category: 'Business Websites',
    price: 3000,
    priceFormatted: '₹3,000',
    pricePrefix: 'Starting at',
    description: 'Digital menu, QR menu, ordering integration, and more.',
    image: '/services/cafe-restaurant.jpg',
    iconName: 'UtensilsCrossed',
    ctaText: 'Create My Menu',
    badge: 'Fast 48h Turnaround',
    features: [
      'Digital Food & Beverage Menu with Categories',
      'Table QR Code Printable Generator',
      'Direct Order Dispatch to WhatsApp / Kitchen',
      'Google Map Direction & Opening Telemetry',
      'Daily Specials & Promotions Showcase',
    ],
  },
  {
    id: 'small-business',
    title: 'Small Business Websites',
    category: 'Business Websites',
    price: 5000,
    priceFormatted: '₹5,000',
    pricePrefix: 'Starting at',
    description: 'Gyms, salons, clinics, coaching, travel and more.',
    image: '/services/small-business.jpg',
    iconName: 'Store',
    ctaText: 'Launch My Website',
    badge: 'Local Business Growth',
    features: [
      'Service Offerings & Transparent Pricing',
      'Client Testimonials & Trust Portfolio',
      '1-Tap Call, WhatsApp & Directions',
      'Google Business Profile Integration',
      'Sub-Second Ultra-Fast Loading Pages',
    ],
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    category: 'Business Websites',
    price: 3000,
    priceFormatted: '₹3,000',
    pricePrefix: 'Starting at',
    description: 'Conversion focused pages for products, events and campaigns.',
    image: '/services/landing-pages.jpg',
    iconName: 'Rocket',
    ctaText: 'Build My Landing Page',
    badge: 'High Conversion',
    features: [
      'High-Conversion Persuasive Structure',
      'Lead Form & Newsletter Sync',
      'A/B Testing & Pixel Analytics Ready',
      'Optimized for Google & Meta Ads Traffic',
      'Lightweight, Clean Vanilla / React Code',
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// 2. WEBSITE DEVELOPMENT PACKAGES (Pricing Cards)
// ─────────────────────────────────────────────────────────────
export const WEBSITE_PACKAGES = [
  {
    id: 'static-website',
    title: 'Static Website',
    badge: 'Best for portfolios & small businesses',
    isPopular: false,
    price: 3000,
    priceFormatted: '₹3,000',
    unit: 'starting price',
    iconName: 'Code',
    ctaText: 'Choose Static Website',
    deliverables: [
      'Responsive design across mobile, tablet & desktop',
      'Static content pages (Home, About, Services, Contact)',
      'Direct Contact & WhatsApp integration',
      'Basic SEO setup & metadata tags',
      'Deployment assistance on Vercel / Cloudflare / Netlify',
    ],
  },
  {
    id: 'react-nextjs',
    title: 'React / Next.js Website',
    badge: 'Modern & interactive websites',
    isPopular: true,
    popularLabel: 'Most Popular',
    price: 8000,
    priceFormatted: '₹8,000',
    unit: 'starting price',
    iconName: 'Atom',
    ctaText: 'Choose React / Next.js',
    deliverables: [
      'Component-based scalable React / Next.js architecture',
      'Smooth micro-interactions & polished UI animations',
      'API integration & dynamic data routing (as scoped)',
      'Advanced Technical SEO & Social OpenGraph setup',
      'Deployment, performance audits & 30-day support',
    ],
  },
  {
    id: 'custom-fullstack',
    title: 'Custom Full-Stack Application',
    badge: 'For complex & scalable solutions',
    isPopular: false,
    price: 15000,
    priceFormatted: '₹15,000',
    unit: 'starting price',
    iconName: 'Layers',
    ctaText: 'Discuss Full-Stack Project',
    deliverables: [
      'Frontend (Next.js/React) + Robust Backend (Node/Python)',
      'Secure Database integration (PostgreSQL / MongoDB / Supabase)',
      'Authentication, Authorization & Role-Based Access',
      'Custom Admin Dashboard & Content Controls (as scoped)',
      'Production deployment, CI/CD pipeline & full documentation',
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// 3. AI & MACHINE LEARNING SOLUTIONS (Dark Section)
// ─────────────────────────────────────────────────────────────
export const AI_ML_SERVICES = [
  {
    id: 'custom-ai-assistant',
    title: 'Custom AI Assistant',
    price: 15000,
    priceFormatted: '₹15,000+',
    iconName: 'Bot',
    tagline: 'Chatbots, RAG, document QA',
    description:
      'Domain-adapted chatbots and internal document search systems using Retrieval-Augmented Generation (RAG) with local or cloud LLMs.',
    ctaText: 'Build My AI Assistant',
    popularUseCases: ['Customer Support Bots', 'PDF / Contract Analyzers', 'Internal Company Knowledge Search'],
  },
  {
    id: 'ml-models',
    title: 'Machine Learning Models',
    price: 10000,
    priceFormatted: '₹10,000+',
    iconName: 'Cpu',
    tagline: 'Prediction, classification, etc.',
    description:
      'Trained machine learning models for numerical forecasting, anomaly detection, churn analysis, image classification, or NLP pipelines.',
    ctaText: 'Discuss My ML Project',
    popularUseCases: ['Churn & Sales Prediction', 'Image / Defect Recognition', 'Risk Scoring & Anomaly Detection'],
  },
  {
    id: 'ai-web-apps',
    title: 'AI-Powered Web Apps',
    price: 15000,
    priceFormatted: '₹15,000+',
    iconName: 'Sparkles',
    tagline: 'AI features in your product',
    description:
      'Full-stack applications with native AI capabilities: intelligent autocomplete, automated content synthesis, image processing, or audio transcription.',
    ctaText: 'Add AI to My Product',
    popularUseCases: ['AI SaaS MVPs', 'Automated Content Generators', 'Smart Audio/Video Transcription Tools'],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    price: 5000,
    priceFormatted: '₹5,000+',
    iconName: 'Workflow',
    tagline: 'Automate workflows & reports',
    description:
      'Eliminate repetitive manual tasks by automating data scraping, invoice parsing, CRM synchronization, and scheduled email reports.',
    ctaText: 'Automate My Workflow',
    popularUseCases: ['Invoice & Receipt Extraction', 'Automated Daily Slack/Email Reports', 'Web Data Scraping Pipelines'],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Dashboards',
    price: 8000,
    priceFormatted: '₹8,000+',
    iconName: 'BarChart3',
    tagline: 'KPI dashboards & insights',
    description:
      'Interactive executive dashboards and business telemetry to monitor revenue, customer behavior, retention, and operational efficiency.',
    ctaText: 'Build My Dashboard',
    popularUseCases: ['Live Business KPI Displays', 'Customer Cohort Analysis', 'Operational Telemetry Dashboards'],
  },
  {
    id: 'research-prototypes',
    title: 'Research & Prototypes',
    price: 5000,
    priceFormatted: '₹5,000+',
    iconName: 'FlaskConical',
    tagline: 'Startup Ideas & PoC',
    description:
      'Fast-turnaround functional prototypes and proof-of-concept models to test innovative tech feasibility or present to potential investors.',
    ctaText: 'Discuss a Prototype',
    popularUseCases: ['Investor Pitch MVPs', 'Hackathon Feasibility Prototypes', 'Academic Research Demonstrators'],
  },
]

// ─────────────────────────────────────────────────────────────
// 4. DIGITAL DESIGN SERVICES (Thumbnail Cards)
// ─────────────────────────────────────────────────────────────
export const DIGITAL_DESIGN_SERVICES = [
  {
    id: 'digital-menu',
    title: 'Digital Menu Design',
    price: 500,
    priceFormatted: '₹500+',
    image: '/services/design-menu.jpg',
    description: 'Sleek, legible digital menus formatted for tablets, displays, and smartphones.',
    ctaText: 'Design Menu',
  },
  {
    id: 'qr-menu',
    title: 'Interactive QR Menu',
    price: 1500,
    priceFormatted: '₹1,500+',
    image: '/services/design-qr.jpg',
    description: 'Instant mobile menu loaded via custom branded QR code stand design.',
    ctaText: 'Setup QR Menu',
  },
  {
    id: 'social-creatives',
    title: 'Social Media Creatives',
    price: 1500,
    priceFormatted: '₹1,500+',
    image: '/services/design-social.jpg',
    description: 'High-engagement promotional posts, carousel graphics, and story templates.',
    ctaText: 'Create Graphics',
  },
  {
    id: 'brand-identity',
    title: 'Logo & Brand Identity',
    price: 1000,
    priceFormatted: '₹1,000+',
    image: '/services/design-brand.jpg',
    description: 'Distinctive logo design, color guidelines, typography, and stationery assets.',
    ctaText: 'Craft Brand',
  },
  {
    id: 'ui-ux-design',
    title: 'Website UI/UX Design',
    price: 3000,
    priceFormatted: '₹3,000+',
    image: '/services/design-uiux.jpg',
    description: 'Pixel-perfect wireframes and high-fidelity Figma web & mobile interfaces.',
    ctaText: 'Design Wireframes',
  },
  {
    id: 'banners-graphics',
    title: 'Banners & Graphics',
    price: 500,
    priceFormatted: '₹500+',
    image: '/services/design-banner.jpg',
    description: 'Promotional banners, marketing collateral, hero graphics, and digital flyers.',
    ctaText: 'Order Graphics',
  },
]

// ─────────────────────────────────────────────────────────────
// 5. SEO & VISIBILITY PACKAGES
// ─────────────────────────────────────────────────────────────
export const SEO_SERVICES = [
  {
    id: 'basic-seo',
    title: 'Basic SEO Setup',
    price: 2000,
    priceFormatted: '₹2,000+',
    deliverables: [
      'Meta title, description, and OpenGraph tags',
      'Technical SEO review & sitemap.xml submission',
      'Google Search Console & Bing Webmaster verification',
    ],
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    price: 3000,
    priceFormatted: '₹3,000+',
    deliverables: [
      'Google Business Profile optimization',
      'Local keyword targeting & schema markup',
      'Location page setup for regional search ranking',
    ],
  },
  {
    id: 'ongoing-seo',
    title: 'Ongoing SEO',
    price: 5000,
    priceFormatted: '₹5,000+/month',
    deliverables: [
      'Monthly technical optimization & speed audits',
      'Keyword ranking performance reporting',
      'Continuous backlinks & content structure progress tracking',
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// 6. WORKING APPROACH (Dark Banner Section C)
// ─────────────────────────────────────────────────────────────
export const WORKING_APPROACH_STEPS = [
  {
    step: '01',
    title: 'Understand',
    description: 'Learn about the business, target audience, problem, and desired outcome.',
  },
  {
    step: '02',
    title: 'Plan',
    description: 'Define the scope, architecture, timeline, deliverables, and transparent budget.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Design, develop, integrate, test, and refine the solution with frequent feedback.',
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Deploy the product, provide handover documentation, and discuss ongoing support.',
  },
]

// ─────────────────────────────────────────────────────────────
// 7. DEVELOPMENT PROCESS (Section I - 5 Steps Timeline)
// ─────────────────────────────────────────────────────────────
export const DEVELOPMENT_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Initial consultation to align on vision, audience, tech stack, and goals.',
  },
  {
    step: '02',
    title: 'Scope & Quote',
    description: 'Transparent line-item proposal with milestone timelines and deliverables.',
  },
  {
    step: '03',
    title: 'Design & Development',
    description: 'Interactive prototyping and iterative coding with regular review updates.',
  },
  {
    step: '04',
    title: 'Testing & Delivery',
    description: 'Cross-device QA, security audits, SEO checks, and client sign-off.',
  },
  {
    step: '05',
    title: 'Handover & Support',
    description: 'Domain setup, source-code transfer, walkthrough, and maintenance warranty.',
  },
]

// ─────────────────────────────────────────────────────────────
// 8. FAQ ACCORDION (Section J)
// ─────────────────────────────────────────────────────────────
export const FAQS = [
  {
    question: 'How much does a website cost?',
    answer:
      'Website pricing starts from ₹3,000 for clean static pages and landing pages, ₹5,000–₹8,000 for standard business portals (Real Estate, Cafe, Clinic), and ₹8,000–₹15,000+ for interactive React / Next.js web applications. Final pricing is always transparently scoped based on page count, custom features, and third-party integrations.',
  },
  {
    question: 'How long does development take?',
    answer:
      'Standard business websites and landing pages typically take 3 to 7 business days once content and brand assets are provided. Custom Next.js web applications, client portals, and AI integrations generally take 2 to 4 weeks depending on architectural scope.',
  },
  {
    question: 'Do you build websites for small businesses?',
    answer:
      'Yes! A major portion of my work focuses on small business digitalization — including cafes, restaurants, real estate agencies, salons, clinics, educational coaching centers, and regional boutiques looking for professional digital presence.',
  },
  {
    question: 'Can you add AI to an existing application?',
    answer:
      'Absolutely. I integrate custom AI capabilities into existing web platforms, including OpenAI / Gemini / Claude API connectors, local LLM integrations, Retrieval-Augmented Generation (RAG) over company documents, and automated data pipelines.',
  },
  {
    question: 'Do you provide hosting and domain assistance?',
    answer:
      'Yes. I guide you through domain purchase on platforms like Cloudflare, Namecheap, or GoDaddy, and deploy the website onto reliable, high-performance infrastructure such as Vercel, Cloudflare Pages, AWS, or DigitalOcean, with free SSL certificates included.',
  },
  {
    question: 'Can I request a custom package?',
    answer:
      'Yes. Every business has unique requirements. You can use the Project Estimator tool on this page to customize specific features, or contact me directly to receive a tailored milestone quote.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer:
      'All delivered projects include a 30-day post-launch warranty for bug fixes and minor adjustments. I also offer monthly maintenance retainers covering security updates, content updates, SEO audits, and server monitoring starting at ₹2,500/month.',
  },
  {
    question: 'How do payments and source-code ownership work?',
    answer:
      'Payments follow a milestone structure (typically 50% upfront deposit to initiate development, and 50% upon final staging approval prior to domain DNS handover). You receive 100% full intellectual property and source code ownership upon project completion.',
  },
]

// ─────────────────────────────────────────────────────────────
// 9. PROJECT ESTIMATOR CONFIG & DYNAMIC CALCULATION (Section H)
// ─────────────────────────────────────────────────────────────
export const ESTIMATOR_CATEGORIES = [
  {
    id: 'business-website',
    label: 'Business Website',
    baseMin: 4000,
    baseMax: 10000,
    types: [
      { id: 'real-estate', label: 'Real Estate Portal', min: 8000, max: 14000 },
      { id: 'hotel-resort', label: 'Hotel / Resort Showcase', min: 10000, max: 18000 },
      { id: 'cafe-restaurant', label: 'Cafe / Restaurant & Menu', min: 3000, max: 7000 },
      { id: 'small-business', label: 'Small Business Site', min: 5000, max: 9000 },
      { id: 'landing-page', label: 'Conversion Landing Page', min: 3000, max: 6000 },
    ],
  },
  {
    id: 'web-application',
    label: 'Web Application / Portal',
    baseMin: 8000,
    baseMax: 20000,
    types: [
      { id: 'react-nextjs', label: 'React / Next.js Interactive App', min: 8000, max: 16000 },
      { id: 'custom-fullstack', label: 'Full-Stack App + Database', min: 15000, max: 30000 },
      { id: 'ecommerce', label: 'E-Commerce / Store Catalog', min: 12000, max: 24000 },
      { id: 'saas-mvp', label: 'SaaS MVP Prototype', min: 15000, max: 32000 },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    baseMin: 8000,
    baseMax: 22000,
    types: [
      { id: 'custom-ai-assistant', label: 'Custom AI Assistant / RAG', min: 15000, max: 28000 },
      { id: 'ml-model', label: 'Machine Learning Model', min: 10000, max: 20000 },
      { id: 'ai-web-app', label: 'AI Embedded Web App', min: 15000, max: 30000 },
      { id: 'business-automation', label: 'Workflow & Report Automation', min: 5000, max: 12000 },
      { id: 'analytics-dashboard', label: 'Data Analytics Dashboard', min: 8000, max: 18000 },
    ],
  },
  {
    id: 'digital-design',
    label: 'Digital Design & Branding',
    baseMin: 1000,
    baseMax: 4000,
    types: [
      { id: 'ui-ux-design', label: 'Website UI/UX (Figma)', min: 3000, max: 8000 },
      { id: 'brand-identity', label: 'Logo & Visual Brand Identity', min: 1000, max: 4000 },
      { id: 'digital-qr-menu', label: 'Digital / QR Menu Design', min: 1500, max: 3500 },
      { id: 'social-media-pack', label: 'Social Media Creatives Pack', min: 1500, max: 4000 },
    ],
  },
  {
    id: 'seo-visibility',
    label: 'SEO & Search Visibility',
    baseMin: 2000,
    baseMax: 7000,
    types: [
      { id: 'basic-seo', label: 'Basic SEO & Search Console', min: 2000, max: 4000 },
      { id: 'local-seo', label: 'Local SEO & Google Maps', min: 3000, max: 6000 },
      { id: 'ongoing-seo', label: 'Ongoing Monthly SEO Retainer', min: 5000, max: 10000 },
    ],
  },
]

export const ESTIMATOR_FEATURES = [
  { id: 'auth', label: 'User Authentication & Accounts', costMin: 3000, costMax: 5000 },
  { id: 'cms', label: 'Admin Panel / CMS', costMin: 4000, costMax: 7000 },
  { id: 'payment', label: 'Payment Gateway (Razorpay/Stripe)', costMin: 2500, costMax: 4500 },
  { id: 'whatsapp', label: 'WhatsApp Instant Booking / Orders', costMin: 1000, costMax: 2000 },
  { id: 'ai-assistant', label: 'AI Chatbot / Semantic Search', costMin: 5000, costMax: 9000 },
  { id: 'seo-analytics', label: 'Advanced SEO & Analytics Setup', costMin: 1500, costMax: 3000 },
]

export const ESTIMATOR_TIMELINES = [
  { id: 'standard', label: 'Standard (2–3 weeks)', multiplier: 1.0 },
  { id: 'urgent', label: 'Rush / Urgent (< 1 week)', multiplier: 1.25 },
  { id: 'flexible', label: 'Flexible (1+ month)', multiplier: 0.95 },
]

/**
 * Calculates estimated starting price range based on inputs
 */
export function calculateEstimate({ categoryId, typeId, featureIds = [], timelineId = 'standard' }) {
  const category = ESTIMATOR_CATEGORIES.find((c) => c.id === categoryId) || ESTIMATOR_CATEGORIES[0]
  const type = category.types.find((t) => t.id === typeId) || category.types[0]

  let min = type.min
  let max = type.max

  // Add feature costs
  featureIds.forEach((fId) => {
    const feat = ESTIMATOR_FEATURES.find((f) => f.id === fId)
    if (feat) {
      min += feat.costMin
      max += feat.costMax
    }
  })

  // Apply timeline multiplier
  const timeline = ESTIMATOR_TIMELINES.find((t) => t.id === timelineId) || ESTIMATOR_TIMELINES[0]
  min = Math.round((min * timeline.multiplier) / 500) * 500
  max = Math.round((max * timeline.multiplier) / 500) * 500

  return {
    min,
    max,
    formatted: `₹${min.toLocaleString('en-IN')} – ₹${max.toLocaleString('en-IN')}`,
    categoryLabel: category.label,
    typeLabel: type.label,
    timelineLabel: timeline.label,
  }
}

// ─────────────────────────────────────────────────────────────
// 10. PREFILLED LINK GENERATORS (WhatsApp & Email)
// ─────────────────────────────────────────────────────────────

export function getWhatsAppLink({
  service = 'Web Development / AI Solutions',
  name = '',
  budget = '',
  timeline = '',
  description = '',
} = {}) {
  const cleanPhone = CONTACT_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  let text = `Hi Prakash, I am reaching out from your portfolio website.`
  if (name) text += ` My name is ${name}.`
  if (service) text += `\n\n• Interested in: ${service}`
  if (budget) text += `\n• Estimated Budget: ${budget}`
  if (timeline) text += `\n• Target Timeline: ${timeline}`
  if (description) text += `\n• Project Brief: ${description}`
  text += `\n\nCould we discuss this project?`

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
}

export function getMailtoLink({
  service = 'Project Inquiry',
  name = '',
  budget = '',
  timeline = '',
  description = '',
} = {}) {
  const subject = `[Project Inquiry] ${service}${name ? ` - ${name}` : ''}`
  let body = `Hi Prakash,\n\nI visited your website and would like to discuss a project.\n\n`
  body += `Project Service: ${service}\n`
  if (name) body += `Name: ${name}\n`
  if (budget) body += `Budget: ${budget}\n`
  if (timeline) body += `Timeline: ${timeline}\n`
  if (description) body += `Details:\n${description}\n\n`
  body += `Looking forward to hearing from you.\n`

  return `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
