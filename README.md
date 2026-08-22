<div align="center">

# 🚀 Om Prakash Behera — Portfolio

**Computer Science Engineer | Full-Stack Developer | AI & ML Engineer**

[![Live Site](https://img.shields.io/badge/🌐_Live-omprakashbehera.me-FF6B00?style=for-the-badge&logoColor=white)](https://omprakashbehera.me)
[![GitHub](https://img.shields.io/badge/GitHub-CodeByPrakash-181717?style=for-the-badge&logo=github)](https://github.com/CodeByPrakash)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-omprakash--cse-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/omprakash-cse)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0002--2403--2907-A6CE39?style=for-the-badge&logo=orcid)](https://orcid.org/0009-0002-2403-2907)

<br />

A premium, animated developer portfolio built with **React 19**, **Framer Motion**, and **3D Claymorphism** design language. Featuring scroll-driven animations, dark/light theme switching, a working contact form, and enterprise-grade SEO.

<br />

</div>

---

## ✨ Features

| Category | Details |
|---|---|
| **Design** | 3D Claymorphism, glassmorphism, floating geometric shapes, clay-morphic bento grid layout |
| **Animations** | Scroll-driven SVG path drawing, staggered entrance animations, parallax effects, micro-interactions |
| **Theme** | Light/Dark mode with a unique 👋 palm emoji toggle and CSS custom properties |
| **Sections** | Hero, About, Skills, Projects (18 cards), Journey timeline, Achievements, Blog, Contact |
| **Contact** | Working form powered by Cloudflare Workers (serverless) |
| **Blog** | Standalone `/blog` route with article cards and tag filtering |
| **SEO** | JSON-LD structured data, FAQPage schema, BreadcrumbList, sitemap, robots.txt, llms.txt, Open Graph, Twitter Cards |
| **Performance** | Lazy-loaded routes, code-split vendor chunks, font-display swap, CSS modules |
| **Accessibility** | Semantic HTML5, ARIA labels, noscript fallback, keyboard-navigable |

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technologies |
|:---:|---|
| **Frontend** | React 19 · React Router 7 · Framer Motion 12 · CSS Modules |
| **Build** | Vite 8 · Rollup (manual chunk splitting) |
| **Fonts** | Space Grotesk · Space Mono · Bebas Neue (Google Fonts) |
| **Backend** | Cloudflare Workers (contact form API) |
| **Deployment** | Vercel |
| **SEO** | JSON-LD · Open Graph · Twitter Cards · Sitemap XML · robots.txt · llms.txt |

</div>

---

## 📂 Project Structure

```
portfolio/
├── public/
│   ├── omprakash.png          # OG image for social previews
│   ├── llms.txt                # AI assistant discovery file
│   ├── logo.svg                # Favicon / PWA icon
│   ├── omprakash.png           # Profile photo
│   ├── resume.pdf              # Downloadable resume
│   ├── robots.txt              # Crawler directives
│   ├── site.webmanifest        # PWA manifest
│   └── sitemap.xml             # XML sitemap
├── src/
│   ├── components/
│   │   ├── Hero.jsx            # Landing section with scroll-driven SVG arrow
│   │   ├── About.jsx           # Bento grid about section with avatar
│   │   ├── Skills.jsx          # Interactive skill cards
│   │   ├── Projects.jsx        # 18-project portfolio grid
│   │   ├── Journey.jsx         # Education & experience timeline
│   │   ├── Achievements.jsx    # Awards & milestones
│   │   ├── Blog.jsx            # Blog section & standalone page
│   │   ├── Contact.jsx         # Contact form (Cloudflare Worker)
│   │   ├── Navbar.jsx          # Sticky navigation bar
│   │   ├── Footer.jsx          # Footer with social links
│   │   ├── SEO.jsx             # Dynamic meta tag manager
│   │   ├── ScrollManager.jsx   # Scroll-to-hash handler
│   │   ├── LoadingScreen.jsx   # Animated loading screen
│   │   ├── NotFound.jsx        # 404 page
│   │   └── *.module.css        # Component-scoped CSS modules
│   ├── context/
│   │   └── ThemeContext.jsx     # Light/Dark theme provider
│   ├── data/
│   │   └── blogPosts.js        # Blog post content data
│   ├── utils/
│   │   ├── motion.js           # Reusable Framer Motion variants
│   │   └── seoKeywords.js      # Categorized SEO keyword system
│   ├── App.jsx                 # Route definitions & page layout
│   ├── App.css                 # Global app styles
│   ├── index.css               # Design system & CSS custom properties
│   └── main.jsx                # React entry point
├── font/                       # Custom font files
├── index.html                  # HTML shell with full SEO markup
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
└── vercel.json                 # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/CodeByPrakash/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
# Cloudflare Worker URL for contact form
VITE_WORKER_URL=your_cloudflare_worker_url

# Search Console verification tokens (optional)
VITE_GOOGLE_SITE_VERIFICATION=your_google_token
VITE_BING_SITE_VERIFICATION=your_bing_token
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
npm run preview    # Preview the production build locally
```

### Linting

```bash
npm run lint
```

---

## 🎨 Design System

The portfolio uses a custom design system built on CSS custom properties:

- **Colors**: Warm neutrals with an orange (`#FF6B00`) accent — fully themed for light/dark
- **Typography**: `Space Grotesk` (headings), `Space Mono` (code/stats), `Bebas Neue` (display text)
- **Effects**: 3D claymorphism shadows, glassmorphic overlays, gradient borders
- **Motion**: Spring physics via Framer Motion, scroll-driven SVG path animations, staggered reveals

---

## 🔍 SEO Architecture

This portfolio implements enterprise-grade SEO:

| Feature | Implementation |
|---|---|
| **Structured Data** | `Person`, `WebSite`, `ProfilePage`, `BreadcrumbList`, `ItemList` (18 projects), `FAQPage` (6 Q&As) |
| **Meta Tags** | Title, description, keywords, author, robots, language, rating, distribution, revisit-after, classification |
| **Social** | Open Graph (profile type), Twitter Cards (summary_large_image), `twitter:creator` |
| **Discovery** | XML Sitemap (with image extensions), robots.txt (per-bot rules), llms.txt, canonical URLs |
| **International** | `hreflang` alternates (en, en-IN, x-default), `geo.*` meta tags, `og:locale` |
| **Keywords** | 200+ categorized keywords across 9 categories including long-tail search phrases |
| **Dynamic SEO** | React `SEO` component dynamically updates all meta tags per page/route |
| **Noscript** | Full semantic HTML fallback with structured sections, skills list, and project links |

---

## 📊 Featured Projects

| # | Project | Tech | Highlight |
|:---:|---|---|---|
| 01 | **ISRO Exoplanet ML** | Python, 1D-CNN | ISRO BAH 2026 PS-07 |
| 02 | **AttendTrue Analytics** | Next.js, Python, AI | Smart India Hackathon |
| 03 | **MRS-AI Medicine** | Python, Flask, SVC | 🥇 1st Prize YOUTH@2050 |
| 04 | **AR Hand Canvas** | JavaScript, MediaPipe | [Live Demo ↗](https://arhandgesture.vercel.app/) |
| 05 | **UnVoiced Sign AI** | Python, OpenCV, TTS | ISL Accessibility |
| 06 | **StadiumAI Vision** | YOLOv8, PyTorch | Crowd Monitoring |
| 07 | **Local LLM ChatUI** | React, Ollama, CUDA | Local AI Interface |
| 08 | **Stock Predictor AI** | PyTorch, LSTM | Time-Series Finance |
| 09 | **SmartPlacement** | TypeScript, React, ML | Campus Analytics |
| 10 | **Public DNS Switcher** | Python, Flask | Network Security |
| 11 | **Biometric Attendance** | OpenCV, Python | Face Recognition |
| 12 | **Privacy Dashboard** | React, TypeScript | Privacy Protection |
| 13 | **Movie Recommender** | Pandas, Scikit-learn | ML Recommendation |
| 14 | **Open E-Commerce** | React, Framer Motion | [Live Demo ↗](https://open-ecommerce.vercel.app) |
| 15 | **GCEK Vendor** | Next.js, MongoDB | [Live Demo ↗](https://gcekvendor.vercel.app) |
| 16 | **Resume Builder** | React, Tailwind | ATS-Friendly PDF |
| 17 | **Computer Lab LMS** | PHP, MySQL | Hardware Management |
| 18 | **Odisha Tourism OTM** | PHP, MySQL | Heritage Portal |

---

## 🚢 Deployment

The site is deployed on **Vercel** with the following configuration:

```json
// vercel.json
{
  "rewrites": [
    { "source": "/((?!assets|.*\\..*).*)", "destination": "/index.html" }
  ]
}
```

This handles client-side routing for React Router — all non-asset paths are rewritten to `index.html`.

---

## 📬 Contact

| Channel | Link |
|---|---|
| 🌐 Portfolio | [omprakashbehera.me](https://omprakashbehera.me) |
| 📧 Email | [omprakashbehera.cse@gmail.com](mailto:omprakashbehera.cse@gmail.com) |
| 💻 GitHub | [CodeByPrakash](https://github.com/CodeByPrakash) |
| 💼 LinkedIn | [omprakash-cse](https://linkedin.com/in/omprakash-cse) |
| 📸 Instagram | [@quasar_om](https://instagram.com/quasar_om) |
| 📄 Resume | [Download PDF](https://omprakashbehera.me/resume.pdf) |

---

## 📄 License

This project is for personal portfolio use. Feel free to use it as inspiration for your own portfolio, but please don't copy it directly without attribution.

---

<div align="center">

**Made with ♥ & React by Om Prakash Behera**

</div>