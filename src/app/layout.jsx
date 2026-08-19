import '../index.css'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeContext'
import ScrollManager from '../components/ScrollManager'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const viewport = {
  themeColor: '#FF6B00',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://omprakashbehera.me'),
  title: 'Om Prakash Behera — Computer Science Engineer | Full-Stack Developer, AI & Cyber Security',
  description:
    'Official portfolio of Om Prakash Behera (CodeByPrakash) — Computer Science & Engineering (CSE) student at Government College of Engineering Kalahandi (GCEK), Odisha, India. Diploma in CSE with First Class Distinction. Building AI/ML systems, full-stack web applications, computer vision, and secure architectures. Winner of YOUTH@2050 1st Prize, ISRO BAH 2026 PS-07, SIH 2025 Team CodeNova. 30+ projects, 100+ GitHub repositories.',
  keywords: [
    'Om Prakash Behera',
    'OmPrakash Behera',
    'Om Prakash',
    'Omprakash',
    'OMPRAKASH',
    'OMPRAKASH BEHERA',
    'OM PRAKASH BEHERA',
    'CodeByPrakash',
    'codebyprakash',
    'Prakash Behera',
    'Quasar Om',
    'quasar_om',
    'OP Behera',
    'O.P. Behera',
    'OPB',
    'omprakash gamer',
    'Om Prakash Gamer',
    'OmPrakash Gamer',
    'omprakash gaming',
    'Om Prakash Gaming',
    'omprakash pc gamer',
    'Om Prakash PC Gamer',
    'omprakash pro gamer',
    'omprakash esports',
    'CodeByPrakash Gaming',
    'CodeByPrakash Gamer',
    'Quasar Om Gamer',
    'quasar_om gamer',
    'omprakash gamer odisha',
    'omprakash gamer india',
    'omprakash pc',
    'Om Prakash PC',
    'OmPrakash PC',
    'omprakash computer',
    'Om Prakash Computer',
    'OmPrakash Computer',
    'omprakash pc build',
    'omprakash pc setup',
    'omprakash computer science',
    'omprakash computer engineer',
    'omprakash computer programmer',
    'omprakash workstation',
    'omprakash laptop',
    'omprakash pc specs',
    'omprakash computer developer',
    'codebyprakash pc',
    'codebyprakash computer',
    'diploma in cse',
    'diploma cse',
    'diploma computer science',
    'diploma in computer science engineering',
    'diploma computer science and engineering',
    'diploma in computer engineering',
    'diploma cse odisha',
    'diploma cse sctevt',
    'diploma cse distinction',
    'diploma cse topper',
    'diploma cse projects',
    'diploma cse lateral entry',
    'diploma cse to btech cse',
    'diploma cse ojee',
    'diploma cse student portfolio',
    'polytechnic cse',
    'polytechnic diploma cse',
    'polytechnic computer science',
    'omprakash diploma cse',
    'om prakash behera diploma cse',
    'diploma cse first class with distinction',
    'ଓମ ପ୍ରକାଶ ବେହେରା',
    'ଓମ୍ ପ୍ରକାଶ ବେହେରା',
    'ପ୍ରକାଶ ବେହେରା',
    'ओम प्रकाश बेहरा',
    'ओमप्रकाश बेहरा',
    'प्रकाश बेहरा',
    'Government College of Engineering Kalahandi',
    'GCEK',
    'GCEK CSE',
    'GCEK Kalahandi',
    'GCEK Jaipatna',
    'GCEK Bhawanipatna',
    'BPUT',
    'Biju Patnaik University of Technology',
    'SCTE&VT Odisha',
    'State Council for Technical Education and Vocational Training',
    'Diploma in Computer Science Engineering',
    'Diploma CSE Distinction',
    'BTech CSE Lateral Entry',
    'OJEE Lateral Entry CSE',
    'Computer Science Engineer',
    'CSE Student Odisha',
    'Full-Stack Developer Odisha',
    'Web Developer Bhadrak',
    'Developer Bhadrak',
    'Developer Kalahandi',
    'Developer Bhawanipatna',
    'Developer Bhubaneswar',
    'Developer Cuttack',
    'Developer Odisha',
    'Odia Developer',
    'Odia Coder',
    'Indian Software Engineer',
    'AI Engineer India',
    'Machine Learning Engineer',
    'YOUTH@2050 1st Prize Winner',
    'MRS-AI Medicine Recommender System',
    'ISRO BAH 2026 PS-07',
    'Smart India Hackathon SIH 2025',
    'AttendTrue Analytics Team CodeNova',
    '100+ GitHub Repositories',
    'omprakashbehera.me',
    'omprakashbehera.cse@gmail.com',
    'Hire Developer Odisha',
    'Freelance Web Developer India',
    'Contact Om Prakash Behera',
    'AR Hand Gesture Canvas',
    'UnVoiced Sign Language AI',
    'StadiumAI Vision',
    'Stock Predictor AI',
    'Local LLM ChatUI',
    'Open E-Commerce Platform',
    'best computer science student portfolio India',
    'hire AI developer from Odisha',
    'top BTech CSE student projects 2026',
    'machine learning engineer portfolio website',
    'computer vision developer India portfolio',
    'full-stack developer resume Odisha',
    'MERN stack developer available for hire',
    'deep learning projects by Indian student',
    'best engineering student portfolio website',
    'AI ML developer open to freelance India',
    'React developer Odisha hire',
    'Python AI developer portfolio',
    'hackathon winner developer India',
    'ISRO hackathon finalist developer',
    'SIH selected team developer portfolio',
    'exoplanet detection machine learning project',
    'sign language translator AI project India',
    'medicine recommender system AI healthcare',
    'crowd density detection computer vision',
    'stock market prediction LSTM deep learning',
    'campus placement prediction machine learning',
    'blockchain carbon credit MRV system',
    'real-time hand gesture recognition MediaPipe',
    'face recognition attendance system OpenCV',
    'software engineer fresher resume India 2026',
    'BTech CSE lateral entry student Odisha BPUT',
    'computer science engineer portfolio Bhawanipatna Kalahandi',
    'young Indian developer AI projects GitHub',
    'top open-source contributor Odisha developer',
  ],
  authors: [{ name: 'Om Prakash Behera', url: 'https://omprakashbehera.me' }],
  creator: 'Om Prakash Behera',
  publisher: 'Om Prakash Behera',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://omprakashbehera.me/',
    languages: {
      'en': 'https://omprakashbehera.me/',
      'en-IN': 'https://omprakashbehera.me/',
      'x-default': 'https://omprakashbehera.me/',
    },
  },
  openGraph: {
    title: 'Om Prakash Behera — Computer Science Engineer (CSE) | Full-Stack & AI Developer',
    description:
      'Computer Science Engineering student & Full-Stack Developer from Odisha. Building AI-driven systems, ML models, computer vision apps & secure web architectures. 30+ projects, 100+ GitHub repos. Open for freelance.',
    url: 'https://omprakashbehera.me/',
    siteName: 'Om Prakash Behera — CSE Portfolio',
    locale: 'en_IN',
    alternateLocale: ['en_US'],
    type: 'profile',
    firstName: 'Om Prakash',
    lastName: 'Behera',
    username: 'CodeByPrakash',
    gender: 'male',
    images: [
      {
        url: 'https://omprakashbehera.me/omprakash.png',
        width: 1200,
        height: 630,
        alt: 'Om Prakash Behera — Computer Science Engineer Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Prakash Behera — Computer Science Engineer | AI & Full-Stack Developer',
    description:
      'CSE student & developer from Odisha building AI systems, ML models, and full-stack applications. 30+ projects, 100+ repos on GitHub. Open for work.',
    creator: '@quasar_om',
    site: '@quasar_om',
    images: ['https://omprakashbehera.me/omprakash.png'],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.VITE_GOOGLE_SITE_VERIFICATION || '',
    other: {
      'msvalidate.01': [
        process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
        process.env.VITE_BING_SITE_VERIFICATION ||
        '1EC161F20719A39A3AFC3EE28FDCCB43',
      ],
    },
  },
  other: {
    'geo.region': 'IN-OR',
    'geo.placename': 'Odisha, India',
    'geo.position': '20.2961;83.8245',
    'ICBM': '20.2961, 83.8245',
    'rating': 'General',
    'distribution': 'global',
    'target': 'all',
    'HandheldFriendly': 'true',
    'MobileOptimized': 'width',
    'subject': 'Computer Science Engineering Portfolio - Full-Stack Developer & AI Engineer',
    'classification': 'Portfolio, Technology, Software Engineering, Artificial Intelligence',
    'category': 'Technology',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://omprakashbehera.me/#person',
      name: 'Om Prakash Behera',
      alternateName: [
        'CodeByPrakash',
        'codebyprakash',
        'OmPrakash Behera',
        'Om Prakash',
        'Omprakash',
        'OMPRAKASH',
        'OMPRAKASH BEHERA',
        'OM PRAKASH BEHERA',
        'Prakash Behera',
        'Quasar Om',
        'quasar_om',
        'QuasarOm',
        'OP Behera',
        'O.P. Behera',
        'OPB',
        'Om Prakash Gamer',
        'omprakash gamer',
        'Quasar Om Gamer',
        'Om Prakash PC',
        'omprakash pc',
        'Om Prakash Computer',
        'omprakash computer',
        'ଓମ ପ୍ରକାଶ ବେହେରା',
        'ଓମ୍ ପ୍ରକାଶ ବେହେରା',
        'ପ୍ରକାଶ ବେହେରା',
        'ओम प्रकाश बेहरा',
        'ओमप्रकाश बेहरा',
        'प्रकाश बेहरा',
      ],
      url: 'https://omprakashbehera.me/',
      image: {
        '@type': 'ImageObject',
        url: 'https://omprakashbehera.me/omprakash.png',
        width: 1200,
        height: 630,
        caption: 'Om Prakash Behera — Computer Science Engineer and Full-Stack AI Developer',
      },
      email: 'omprakashbehera.cse@gmail.com',
      jobTitle: 'Computer Science Engineer & Full-Stack Developer',
      description:
        'Computer Science & Engineering (CSE) student at Government College of Engineering Kalahandi (GCEK) and Full-Stack Developer from Odisha, India. Diploma in CSE with First Class Distinction from SCTE&VT Odisha. Creator of 30+ engineering projects with 100+ GitHub repositories.',
      birthPlace: {
        '@type': 'Place',
        name: 'Bhadrak, Odisha, India',
      },
      homeLocation: {
        '@type': 'Place',
        name: 'Bhadrak, Odisha, India',
      },
      workLocation: {
        '@type': 'Place',
        name: 'Bhawanipatna, Kalahandi, Odisha, India',
      },
      knowsAbout: [
        'Computer Science and Engineering (CSE)',
        'Software Engineering',
        'Artificial Intelligence (AI)',
        'Machine Learning (ML)',
        'Deep Learning',
        'Convolutional Neural Networks (CNN)',
        'Recurrent Neural Networks (RNN)',
        'Long Short-Term Memory (LSTM)',
        'Large Language Models (LLM)',
        'Natural Language Processing (NLP)',
        'Computer Vision',
        'MediaPipe',
        'OpenCV',
        'Object Detection (YOLOv8)',
        'Full-Stack Web Development',
        'MERN Stack',
        'React.js',
        'Next.js',
        'Node.js',
        'Express.js',
        'Python',
        'Flask',
        'FastAPI',
        'PHP',
        'MongoDB',
        'PostgreSQL',
        'MySQL',
        'SQLite',
        'REST API Design',
        'TypeScript',
        'JavaScript',
        'Cyber Security',
        'Ethical Hacking',
        'System Security',
        'Network Security',
        'Blockchain (Solidity)',
        'Data Structures & Algorithms',
        'System Design',
        'Git & GitHub',
        'Streamlit',
        'TensorFlow',
        'PyTorch',
        'Scikit-learn',
        'Pandas',
      ],
      knowsLanguage: [
        { '@type': 'Language', name: 'English' },
        { '@type': 'Language', name: 'Odia' },
        { '@type': 'Language', name: 'Hindi' },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'Bachelor of Technology in Computer Science and Engineering (BTech CSE)',
          educationalLevel: "Bachelor's Degree",
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: 'Biju Patnaik University of Technology (BPUT Odisha)',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'diploma',
          name: 'Diploma in Computer Science & Engineering (CSE) — First Class with Distinction',
          educationalLevel: 'Diploma',
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: 'State Council for Technical Education & Vocational Training (SCTE&VT Odisha)',
          },
        },
      ],
      hasOccupation: [
        {
          '@type': 'Occupation',
          name: 'Full-Stack Developer',
          occupationLocation: { '@type': 'Country', name: 'India' },
          skills: 'React.js, Node.js, Python, Flask, MongoDB, PostgreSQL, REST API, TypeScript',
        },
        {
          '@type': 'Occupation',
          name: 'AI/ML Engineer',
          occupationLocation: { '@type': 'Country', name: 'India' },
          skills: 'TensorFlow, PyTorch, Computer Vision, NLP, Deep Learning, CNN, LSTM',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhadrak',
        addressRegion: 'Odisha',
        addressCountry: 'IN',
      },
      nationality: {
        '@type': 'Country',
        name: 'India',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Government College of Engineering, Kalahandi (GCEK)',
          url: 'https://gcekjaipatna.odisha.gov.in/',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'State Council for Technical Education & Vocational Training (SCTE&VT Odisha)',
          url: 'https://sctevtodisha.nic.in/',
        },
      ],
      award: [
        '1st Prize with 7000 Rs Prize Pool — YOUTH@2050 District Level Software Exhibition (MRS-AI Medicine Recommender System)',
        'Smart India Hackathon 2025 — Team CodeNova Selection (AttendTrue Analytics)',
        'ISRO BAH 2026 PS-07 — Exoplanet Transit Detection using Machine Learning (1D-CNN)',
        'Diploma in Computer Science Engineering — First Class with Distinction (Honours)',
        '100+ GitHub Repositories Milestone',
      ],
      sameAs: [
        'https://github.com/CodeByPrakash',
        'https://linkedin.com/in/omprakash-cse',
        'https://orcid.org/0009-0002-2403-2907',
        'https://instagram.com/quasar_om',
        'https://open-ecommerce.vercel.app',
        'https://arhandgesture.vercel.app',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://omprakashbehera.me/#website',
      url: 'https://omprakashbehera.me/',
      name: 'Om Prakash Behera — Computer Science Engineering Portfolio',
      description:
        'Official portfolio of Om Prakash Behera showcasing 30+ full-stack web development, AI/ML projects, computer vision applications, and software engineering work. Open for freelance & collaboration.',
      publisher: {
        '@id': 'https://omprakashbehera.me/#person',
      },
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://omprakashbehera.me/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://omprakashbehera.me/#profilepage',
      url: 'https://omprakashbehera.me/',
      name: 'Om Prakash Behera — Developer Portfolio Profile',
      dateCreated: '2026-01-01',
      dateModified: '2026-08-18',
      isPartOf: {
        '@id': 'https://omprakashbehera.me/#website',
      },
      mainEntity: {
        '@id': 'https://omprakashbehera.me/#person',
      },
      breadcrumb: {
        '@id': 'https://omprakashbehera.me/#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://omprakashbehera.me/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://omprakashbehera.me/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://omprakashbehera.me/#about',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Skills',
          item: 'https://omprakashbehera.me/#skills',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Projects',
          item: 'https://omprakashbehera.me/#projects',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Blog',
          item: 'https://omprakashbehera.me/blog',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Contact',
          item: 'https://omprakashbehera.me/#contact',
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Featured Engineering Projects by Om Prakash Behera',
      description: 'Selected software engineering, AI/ML, and full-stack development projects',
      numberOfItems: 18,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ISRO Exoplanet ML — BAH 2026 PS-07',
          description:
            'Exoplanet transit detection engine using 1D-CNN, Kepler photometry and BLS for ISRO BAH 2026 Problem Statement 07',
          url: 'https://github.com/CodeByPrakash/ISRO_PS07',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AttendTrue Analytics — Smart India Hackathon',
          description:
            'AI-driven smart automated attendance tracking and institutional behavioral analytics platform engineered for Smart India Hackathon 2025 by Team CodeNova',
          url: 'https://github.com/CodeByPrakash/AttendTrue-Analytic',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'MRS-AI — AI Healthcare Medicine Recommender System (1st Prize)',
          description:
            'Award-winning AI-powered medicine recommender system using SVC machine learning model with symptom-based disease prediction. Won 1st Prize at YOUTH@2050',
          url: 'https://github.com/CodeByPrakash/MRS-AI',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'AR Hand Gesture Canvas',
          description:
            'Real-time AR hand-tracking canvas for gesture-based air-drawing using Google MediaPipe computer vision with 21-joint tracking and Bézier curves',
          url: 'https://arhandgesture.vercel.app/',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'UnVoiced — Indian Sign Language AI Translator',
          description:
            'Real-time Indian Sign Language (ISL) gesture recognition and text-to-speech translator with OpenCV for accessibility',
          url: 'https://github.com/CodeByPrakash/UnVoiced',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'StadiumAI Vision — Crowd Density Monitoring',
          description:
            'Real-time pedestrian crowd density monitoring with homography bird’s-eye mapping and YOLOv8 surge tracking',
          url: 'https://github.com/CodeByPrakash/StadiumAI-C4',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Local LLM ChatUI',
          description:
            'High-throughput local LLM execution interface with GGUF quantization and VRAM layer offloading using Ollama',
          url: 'https://github.com/CodeByPrakash/Local-LLM-ChatUI',
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'Stock Price Predictor AI',
          description:
            'Bidirectional LSTM neural network forecasting stock trends with RSI, MACD and NATR technical indicator features',
          url: 'https://github.com/CodeByPrakash/stock_price_prediction_application',
        },
        {
          '@type': 'ListItem',
          position: 9,
          name: 'SmartPlacement — Campus Recruitment Predictor',
          description:
            'Campus recruitment readiness engine predicting placement probabilities and student skill gap roadmaps',
          url: 'https://github.com/CodeByPrakash/SmartPlacement',
        },
        {
          '@type': 'ListItem',
          position: 10,
          name: 'Public DNS Switcher',
          description:
            'Windows network stack orchestrator via netsh with live RTT latency benchmarking for fast DNS switching',
          url: 'https://github.com/CodeByPrakash/Public_DNS_Switcher',
        },
        {
          '@type': 'ListItem',
          position: 11,
          name: 'Biometric Face Recognition Attendance System',
          description:
            'Contactless face recognition attendance logger with Haar cascades, 128D deep embeddings and SQLite database',
          url: 'https://github.com/CodeByPrakash/Simple_FaceRecoginition_Attendance_Sys',
        },
        {
          '@type': 'ListItem',
          position: 12,
          name: 'Privacy Dashboard System',
          description:
            'Comprehensive privacy management dashboard tracking telemetry, web activity, and protecting user data from surveillance',
          url: 'https://github.com/CodeByPrakash/privacy_dashboard',
        },
        {
          '@type': 'ListItem',
          position: 13,
          name: 'Movie Recommender System',
          description:
            'ML-powered content-based and collaborative filtering movie recommendation engine using TF-IDF vectorization and cosine similarity',
          url: 'https://github.com/CodeByPrakash/Movie-Recommender-System',
        },
        {
          '@type': 'ListItem',
          position: 14,
          name: 'Open E-Commerce Platform',
          description:
            'Full-featured interactive e-commerce web application built with React, Framer Motion, and modern UI architecture',
          url: 'https://open-ecommerce.vercel.app',
        },
        {
          '@type': 'ListItem',
          position: 15,
          name: 'GCEK Vendor — Campus Marketplace',
          description:
            'Campus peer-to-peer rental and exchange platform for college hostel students with real-time listings',
          url: 'https://gcekvendor.vercel.app',
        },
        {
          '@type': 'ListItem',
          position: 16,
          name: 'Resume Builder React',
          description:
            'Modern ATS-friendly resume generator with live PDF compilation and modular design layouts',
          url: 'https://github.com/CodeByPrakash/ResumeBuilder-React',
        },
        {
          '@type': 'ListItem',
          position: 17,
          name: 'Computer Lab Management System',
          description:
            'Multi-lab device tracking, hardware fault ticketing, and inventory management with 3NF relational MySQL database',
          url: 'https://github.com/CodeByPrakash/LMS',
        },
        {
          '@type': 'ListItem',
          position: 18,
          name: 'Odisha Tourism Management System',
          description:
            'Comprehensive tourism portal for Odisha heritage, hotel reservations, package bookings, and visitor reviews',
          url: 'https://github.com/CodeByPrakash/OTM',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Om Prakash Behera (CodeByPrakash)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Om Prakash Behera (also known as CodeByPrakash and Quasar Om) is a Computer Science & Engineering (CSE) student, Full-Stack Developer, and AI/ML Engineer from Bhadrak, Odisha, India. He builds production-grade web applications, AI models, computer vision systems, and cybersecurity tools with 30+ engineering projects and 100+ GitHub repositories.',
          },
        },
        {
          '@type': 'Question',
          name: "What is Om Prakash Behera's educational background and degree?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Om Prakash Behera completed his Diploma in Computer Science & Engineering (CSE) from State Council for Technical Education & Vocational Training (SCTE&VT Odisha) with First Class Honours and Distinction (2022-2025). He is currently pursuing his Bachelor of Technology in Computer Science & Engineering (BTech CSE, 2025-2028) through state-level Lateral Entry at Government College of Engineering, Kalahandi (GCEK), affiliated with Biju Patnaik University of Technology (BPUT Odisha).',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Om Prakash Behera from and where is he based?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Om Prakash Behera's hometown is Bhadrak, Odisha, India. He is currently based in Bhawanipatna, Kalahandi, Odisha, where he attends Government College of Engineering, Kalahandi (GCEK). He works remotely with clients and teams worldwide.",
          },
        },
        {
          '@type': 'Question',
          name: 'How can I contact or hire Om Prakash Behera?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can contact Om Prakash Behera directly via email at omprakashbehera.cse@gmail.com, connect on LinkedIn at https://linkedin.com/in/omprakash-cse, explore his code on GitHub at https://github.com/CodeByPrakash, follow him on Instagram @quasar_om, or submit a message through his official portfolio contact form at https://omprakashbehera.me/#contact. He is open for freelance projects, internships, and full-stack engineering collaborations.',
          },
        },
        {
          '@type': 'Question',
          name: "What are Om Prakash Behera's major awards and hackathon achievements?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: '1) 1st Prize Winner (7000 Rs Prize Pool) at YOUTH@2050 District Level Project Software Exhibition for MRS-AI Medicine Recommender System. 2) Selected for Smart India Hackathon (SIH 2025) Internal Hackathon with Team CodeNova for AttendTrue Analytics. 3) ISRO BAH 2026 PS-07 Participant for Exoplanet Transit Detection using Deep Learning. 4) First Class Honours with Distinction in Diploma CSE. 5) 100+ GitHub repositories milestone.',
          },
        },
        {
          '@type': 'Question',
          name: 'What technologies and programming skills does Om Prakash Behera have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Languages & Frontend: React.js, React 19, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Framer Motion. Backend & Databases: Node.js, Express.js, Python, Flask, FastAPI, PHP, MongoDB, PostgreSQL, MySQL, SQLite, REST APIs. AI/ML: TensorFlow, PyTorch, Scikit-learn, CNN, LSTM, OpenCV, MediaPipe, YOLOv8. Systems & Security: Cyber Security, Ethical Hacking, Linux, Git, Docker, Cloudflare Workers, Vercel.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      prefix="og: http://ogp.me/ns# profile: http://ogp.me/ns/profile#"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//github.com" />
        {/* RSS & Atom Feeds for Google Discover & Feed Readers */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Om Prakash Behera — Technical Blog RSS Feed"
          href="https://omprakashbehera.me/rss.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Om Prakash Behera — Technical Blog Feed"
          href="https://omprakashbehera.me/feed.xml"
        />
        {/* JSON-LD Rich Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Noscript fallback for SEO crawlers and text browsers */}
        <noscript>
          <header>
            <h1>Om Prakash Behera — Computer Science Engineer, Full-Stack Developer &amp; AI Innovator</h1>
            <p><strong>BTech CSE Student at GCEK Kalahandi | Diploma in CSE with Distinction | Developer &amp; Open-Source Creator</strong></p>
            <p><em>Also known as: CodeByPrakash | Quasar Om | ଓମ ପ୍ରକାଶ ବେହେରା | ओम प्रकाश बेहरा</em></p>
          </header>
          <main>
            <section>
              <h2>About &amp; Biography</h2>
              <p>Om Prakash Behera is a passionate Computer Science &amp; Engineering (CSE) student, full-stack developer, and artificial intelligence researcher from Bhadrak, Odisha, India. With over 3 years of hands-on software development experience since 2022, he has engineered 30+ comprehensive software projects and maintains 100+ open-source GitHub repositories under the handle <strong>CodeByPrakash</strong>.</p>
            </section>
            <section>
              <h2>Education &amp; Academic Background</h2>
              <ul>
                <li><strong>B.Tech in Computer Science &amp; Engineering (2025 – Present):</strong> Government College of Engineering, Kalahandi (GCEK Bhawanipatna, Odisha) — Affiliated with Biju Patnaik University of Technology (BPUT Odisha). Admitted through State-Level Lateral Entry (OJEE).</li>
                <li><strong>Diploma in Computer Science &amp; Engineering (2022 – 2025):</strong> State Council for Technical Education &amp; Vocational Training (SCTE&amp;VT Odisha) — Graduated with <strong>First Class Honours with Distinction</strong>.</li>
              </ul>
            </section>
            <section>
              <h2>Featured Engineering Projects</h2>
              <ul>
                <li><a href="https://github.com/CodeByPrakash/ISRO_PS07">ISRO Exoplanet ML</a> — 1D-CNN exoplanet transit detection for ISRO BAH 2026</li>
                <li><a href="https://github.com/CodeByPrakash/AttendTrue-Analytic">AttendTrue Analytics</a> — AI-powered smart attendance and institutional analytics for Smart India Hackathon</li>
                <li><a href="https://github.com/CodeByPrakash/MRS-AI">MRS-AI Healthcare</a> — Award-winning AI medicine recommender (1st Prize)</li>
                <li><a href="https://arhandgesture.vercel.app/">AR Hand Gesture Canvas</a> — MediaPipe real-time AR drawing</li>
                <li><a href="https://github.com/CodeByPrakash/UnVoiced">UnVoiced ISL Translator</a> — Indian Sign Language recognition</li>
                <li><a href="https://github.com/CodeByPrakash/StadiumAI-C4">StadiumAI Vision</a> — YOLOv8 crowd density monitoring</li>
                <li><a href="https://github.com/CodeByPrakash/Local-LLM-ChatUI">Local LLM ChatUI</a> — Local LLM execution interface</li>
                <li><a href="https://github.com/CodeByPrakash/stock_price_prediction_application">Stock Predictor AI</a> — LSTM stock price forecasting</li>
                <li><a href="https://open-ecommerce.vercel.app">Open E-Commerce</a> — Full-featured React e-commerce platform</li>
                <li><a href="https://gcekvendor.vercel.app">GCEK Vendor</a> — Campus peer-to-peer marketplace</li>
                <li><a href="https://github.com/CodeByPrakash/privacy_dashboard">Privacy Dashboard</a> — Privacy management system</li>
              </ul>
            </section>
            <section>
              <h2>Direct Contact &amp; Socials</h2>
              <ul>
                <li><strong>Website:</strong> <a href="https://omprakashbehera.me">https://omprakashbehera.me</a></li>
                <li><strong>Email:</strong> <a href="mailto:omprakashbehera.cse@gmail.com">omprakashbehera.cse@gmail.com</a></li>
                <li><strong>GitHub:</strong> <a href="https://github.com/CodeByPrakash">github.com/CodeByPrakash</a></li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/omprakash-cse">linkedin.com/in/omprakash-cse</a></li>
                <li><strong>Instagram:</strong> <a href="https://instagram.com/quasar_om">@quasar_om</a></li>
                <li><strong>Resume:</strong> <a href="/resume.pdf">Download Resume (PDF)</a></li>
              </ul>
            </section>
          </main>
        </noscript>
        <ThemeProvider>
          <ScrollManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
