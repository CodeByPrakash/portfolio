'use client'

import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import styles from './Projects.module.css'

const projects = [
  {
    id: '01',
    title: 'CyberTerminal OS',
    desc: 'Cybernetic command terminal & biometric HUD interface with live interactive BASH console, HTOP telemetry & CRT shaders.',
    tags: ['Cyber Terminal', 'Next.js', 'Web Shell', 'CRT Shader', 'Live HUD'],
    color: 'green',
    featuredBadge: '>_ Terminal',
    isCli: true,
    stats: { users: '3.2K', stars: '128', tech: '6', year: '2026' },
    link: 'https://vintageprixu.vercel.app',
  },
  {
    id: '02',
    title: 'VoxelCam 3D',
    desc: 'When developer got free time to do nothing — transforms real-time webcam video stream into dynamic 3D voxel pixel blocks.',
    tags: ['Three.js', 'WebGL', '3D Voxels', 'WebRTC'],
    color: 'orange',
    stats: { users: '1.2K', stars: '45', tech: '4', year: '2026' },
    link: 'https://voxelcam.vercel.app/',
  },
  {
    id: '03',
    title: 'ISRO Exoplanet ML',
    desc: 'Exoplanet transit detection engine using 1D-CNN, Kepler photometry & BLS for ISRO BAH 2026 (PS-07).',
    tags: ['Python', 'ISRO PS-07', '1D-CNN', 'Astrophysics'],
    color: 'purple',
    stats: { users: '1.5K', stars: '85', tech: '6', year: '2026' },
    link: 'https://github.com/CodeByPrakash/ISRO_PS07',
  },
  {
    id: '04',
    title: 'AttendTrue Analytics',
    desc: 'AI-driven smart attendance tracking & behavioral analytics platform engineered for SIH 2025 with Team CodeNova.',
    tags: ['AI Analytics', 'Computer Vision', 'Next.js', 'Team CodeNova'],
    color: 'blue',
    stats: { users: '2.4K', stars: '92', tech: '5', year: '2025' },
    link: 'https://github.com/CodeByPrakash/AttendTrue-Analytic',
  },
  {
    id: '05',
    title: 'MRS-AI Medicine',
    desc: 'Awarded 1st Prize at YOUTH@2050. Multi-class symptom diagnosis & pharmaceutical regimen recommender.',
    tags: ['Python', 'Flask', 'SVC', '1st Prize'],
    color: 'green',
    stats: { users: '3.1K', stars: '74', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/MRS-AI',
  },
  {
    id: '06',
    title: 'AR Hand Canvas',
    desc: 'Zero-latency browser AR air-drawing canvas with Google MediaPipe 21-joint tracking & Bézier curves.',
    tags: ['JavaScript', 'MediaPipe', 'Canvas API'],
    color: 'orange',
    stats: { users: '1.8K', stars: '58', tech: '5', year: '2026' },
    link: 'https://arhandgesture.vercel.app/',
  },
  {
    id: '07',
    title: 'UnVoiced Sign AI',
    desc: 'Real-time Indian Sign Language (ISL) gesture recognition & text-to-speech translator with OpenCV.',
    tags: ['Python', 'OpenCV', 'Accessibility', 'TTS'],
    color: 'red',
    stats: { users: '950', stars: '44', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/UnVoiced',
  },
  {
    id: '08',
    title: 'StadiumAI Vision',
    desc: 'Real-time pedestrian crowd density monitoring, homography bird’s-eye mapping, and YOLO surge tracking.',
    tags: ['YOLOv8', 'OpenCV', 'PyTorch', 'Analytics'],
    color: 'purple',
    stats: { users: '620', stars: '38', tech: '5', year: '2025' },
    link: 'https://github.com/CodeByPrakash/StadiumAI-C4',
  },
  {
    id: '09',
    title: 'Local LLM ChatUI',
    desc: 'High-throughput local LLM execution interface with GGUF quantization and VRAM layer offloading.',
    tags: ['React', 'CUDA', 'Ollama', 'GGUF'],
    color: 'blue',
    stats: { users: '1.1K', stars: '52', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Local-LLM-ChatUI',
  },
  {
    id: '10',
    title: 'Stock Predictor AI',
    desc: 'Bidirectional LSTM neural network forecasting non-stationary stock trends with RSI, MACD & NATR features.',
    tags: ['PyTorch', 'LSTM', 'Time-Series', 'Finance'],
    color: 'green',
    stats: { users: '820', stars: '39', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/stock_price_prediction_application',
  },
  {
    id: '11',
    title: 'SmartPlacement',
    desc: 'Campus recruitment readiness engine predicting placement probabilities and student skill gap roadmaps.',
    tags: ['TypeScript', 'React', 'ML', 'Analytics'],
    color: 'orange',
    stats: { users: '750', stars: '36', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/SmartPlacement',
  },
  {
    id: '12',
    title: 'Public DNS Switcher',
    desc: 'Windows network stack orchestrator via netsh with live RTT latency benchmarking for fast DNS switching.',
    tags: ['Python', 'Flask', 'Windows API', 'Security'],
    color: 'red',
    stats: { users: '680', stars: '31', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Public_DNS_Switcher',
  },
  {
    id: '13',
    title: 'Biometric Attendance',
    desc: 'Contactless face recognition attendance logger with Haar cascades, 128D deep embeddings & SQLite.',
    tags: ['OpenCV', 'Python', 'SQLite', 'Biometrics'],
    color: 'ink',
    stats: { users: '580', stars: '27', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Simple_FaceRecoginition_Attendance_Sys',
  },
  {
    id: '14',
    title: 'Privacy Dashboard',
    desc: 'Tracks telemetry, web activity, and protects user data from online surveillance & tracking scripts.',
    tags: ['React.js', 'TypeScript', 'MySQL'],
    color: 'purple',
    stats: { users: '520', stars: '24', tech: '3', year: '2026' },
    link: 'https://github.com/CodeByPrakash/privacy_dashboard',
  },
  {
    id: '15',
    title: 'Movie Recommender',
    desc: 'Content-based and collaborative filtering recommender utilizing TF-IDF vectorization and cosine similarity.',
    tags: ['Pandas', 'Scikit-Learn', 'Python'],
    color: 'blue',
    stats: { users: '890', stars: '35', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Movie-Recommender-System',
  },
  {
    id: '16',
    title: 'Open Ecommerce',
    desc: 'High-performance interactive ecommerce application with React, cart persistence, and micro-animations.',
    tags: ['React', 'Framer Motion', 'CSS3'],
    color: 'green',
    stats: { users: '2.3K', stars: '61', tech: '4', year: '2026' },
    link: 'https://open-ecommerce.vercel.app',
  },
  {
    id: '17',
    title: 'GCEK Vendor',
    desc: 'Campus peer-to-peer rental, used gear, and exchange marketplace for engineering students.',
    tags: ['Next.js', 'MongoDB', 'Tailwind'],
    color: 'orange',
    stats: { users: '1.4K', stars: '48', tech: '4', year: '2025' },
    link: 'https://gcekvendor.vercel.app',
  },
  {
    id: '18',
    title: 'Resume Builder',
    desc: 'ATS-friendly resume generator with live markdown preview, modular sections, and PDF compilation.',
    tags: ['React', 'Tailwind CSS', 'PDF Gen'],
    color: 'blue',
    stats: { users: '1.7K', stars: '54', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/ResumeBuilder-React',
  },
  {
    id: '19',
    title: 'Computer Lab LMS',
    desc: 'Multi-lab device tracking, hardware fault ticketing, and inventory management with 3NF relational MySQL.',
    tags: ['PHP', 'MySQL', 'Hardware Mgmt'],
    color: 'ink',
    stats: { users: '340', stars: '19', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/LMS',
  },
  {
    id: '20',
    title: 'Odisha Tourism OTM',
    desc: 'Comprehensive tourism portal for Odisha heritage, hotel reservations, package bookings, and reviews.',
    tags: ['PHP', 'MySQL', 'Full Stack'],
    color: 'purple',
    stats: { users: '280', stars: '16', tech: '3', year: '2024' },
    link: 'https://github.com/CodeByPrakash/OTM',
  },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.projects} aria-label="Portfolio — 20 Engineering Projects in AI, Machine Learning, Full-Stack Development, and Cyber Security">
      {/* Floating 3D Clay Morphism Edge Geometrics */}
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapeTorus}`}
        animate={{ y: [0, 36, 0], rotate: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapeOrb}`}
        animate={{ y: [0, -30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapePill}`}
        animate={{ y: [0, 24, 0], rotate: [-15, 20, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="section-wrap">
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4 }}
        >
          ◉ Our Incubations
        </motion.span>

        {/* Header — like reference "PORTFOLIO" section */}
        <motion.div
          className={styles.headRow}
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2 className={styles.heading} variants={fadeIn('left', 0)}>
            <span className={styles.accent}>Port</span>folio
          </motion.h2>
          <motion.div className={styles.headRight} variants={fadeIn('right', 0)}>
            <div className={styles.countCard}>
              <span className={styles.countLabel}>All Projects</span>
              <span className={styles.countNum}>{projects.length}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Project cards grid — matching reference with stat rows */}
        <motion.div
          className={styles.grid}
          variants={staggerContainer(0.06, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.05 }}
        >
          {projects.map(p => (
            <motion.a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${p.isCli ? styles.cardCliFeatured : ''}`}
              variants={scaleIn(0)}
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              {/* Logo / Thumbnail */}
              <div className={styles.cardTop}>
                <div className={`${styles.logoCircle} ${p.isCli ? styles.logoCli : styles[`logo_${p.color}`]}`}>
                  <span className={`${styles.logoLetter} ${p.isCli ? styles.logoCliLetter : ''}`}>
                    {p.isCli ? '>_' : p.title.charAt(0)}
                  </span>
                </div>
                <div className={styles.nameWrap}>
                  <span className={styles.projName}>{p.title}</span>
                  {p.featuredBadge && (
                    <span className={styles.terminalBadge}>{p.featuredBadge}</span>
                  )}
                </div>
                <span className={styles.arrow}>↗</span>
              </div>

              {/* Description */}
              <p className={styles.desc}>{p.desc}</p>

              {/* Tags */}
              <div className={styles.tagRow}>
                {p.tags.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>

              {/* Stats row — like reference project cards */}
              <div className={styles.statsRow}>
                <div className={styles.statCell}>
                  <span className={styles.statVal}>{p.stats.users}</span>
                  <span className={styles.statKey}>Users</span>
                </div>
                <div className={styles.statCell}>
                  <span className={styles.statVal}>{p.stats.stars}</span>
                  <span className={styles.statKey}>Stars</span>
                </div>
                <div className={styles.statCell}>
                  <span className={styles.statVal}>{p.stats.tech}</span>
                  <span className={styles.statKey}>Tech</span>
                </div>
                <div className={styles.statCell}>
                  <span className={styles.statVal}>{p.stats.year}</span>
                  <span className={styles.statKey}>Year</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
