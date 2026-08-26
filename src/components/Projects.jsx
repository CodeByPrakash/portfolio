'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import styles from './Projects.module.css'

const projects = [
  {
    id: '01',
    title: '3D GSAP Portfolio',
    desc: 'Immersive 3D interactive web portfolio built with GSAP animations, WebGL/Three.js spatial scenes & dynamic camera physics.',
    tags: ['GSAP', 'Three.js', 'WebGL', 'React'],
    color: 'purple',
    featuredBadge: '✨ 3D Experience',
    stats: { users: '2.8K', stars: '64', tech: '5', year: '2026' },
    link: 'https://omprakashbehera-3d.vercel.app/',
  },
  {
    id: '02',
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
    id: '03',
    title: 'VoxelCam 3D',
    desc: 'When developer got free time to do nothing — transforms real-time webcam video stream into dynamic 3D voxel pixel blocks.',
    tags: ['Three.js', 'WebGL', '3D Voxels', 'WebRTC'],
    color: 'orange',
    stats: { users: '1.2K', stars: '45', tech: '4', year: '2026' },
    link: 'https://voxelcam.vercel.app/',
  },
  {
    id: '04',
    title: 'ISRO Exoplanet ML',
    desc: 'Exoplanet transit detection engine using 1D-CNN, Kepler photometry & BLS for ISRO BAH 2026 (PS-07).',
    tags: ['Python', 'ISRO PS-07', '1D-CNN', 'Astrophysics'],
    color: 'purple',
    stats: { users: '1.5K', stars: '85', tech: '6', year: '2026' },
    link: 'https://github.com/CodeByPrakash/ISRO_PS07',
  },
  {
    id: '05',
    title: 'AttendTrue Analytics',
    desc: 'AI-driven smart attendance tracking & behavioral analytics platform engineered for SIH 2025 with Team CodeNova.',
    tags: ['AI Analytics', 'Computer Vision', 'Next.js', 'Team CodeNova'],
    color: 'blue',
    stats: { users: '2.4K', stars: '92', tech: '5', year: '2025' },
    link: 'https://github.com/CodeByPrakash/AttendTrue-Analytic',
  },
  {
    id: '06',
    title: 'MRS-AI Medicine',
    desc: 'Awarded 1st Prize at YOUTH@2050. Multi-class symptom diagnosis & pharmaceutical regimen recommender.',
    tags: ['Python', 'Flask', 'SVC', '1st Prize'],
    color: 'green',
    stats: { users: '3.1K', stars: '74', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/MRS-AI',
  },
  {
    id: '07',
    title: 'AR Hand Canvas',
    desc: 'Zero-latency browser AR air-drawing canvas with Google MediaPipe 21-joint tracking & Bézier curves.',
    tags: ['JavaScript', 'MediaPipe', 'Canvas API'],
    color: 'orange',
    stats: { users: '1.8K', stars: '58', tech: '5', year: '2026' },
    link: 'https://arhandgesture.vercel.app/',
  },
  {
    id: '08',
    title: 'UnVoiced Sign AI',
    desc: 'Real-time Indian Sign Language (ISL) gesture recognition & text-to-speech translator with OpenCV.',
    tags: ['Python', 'OpenCV', 'Accessibility', 'TTS'],
    color: 'red',
    stats: { users: '950', stars: '44', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/UnVoiced',
  },
  {
    id: '09',
    title: 'StadiumAI Vision',
    desc: 'Real-time pedestrian crowd density monitoring, homography bird’s-eye mapping, and YOLO surge tracking.',
    tags: ['YOLOv8', 'OpenCV', 'PyTorch', 'Analytics'],
    color: 'purple',
    stats: { users: '620', stars: '38', tech: '5', year: '2025' },
    link: 'https://github.com/CodeByPrakash/StadiumAI-C4',
  },
  {
    id: '10',
    title: 'Local LLM ChatUI',
    desc: 'High-throughput local LLM execution interface with GGUF quantization and VRAM layer offloading.',
    tags: ['React', 'CUDA', 'Ollama', 'GGUF'],
    color: 'blue',
    stats: { users: '1.1K', stars: '52', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Local-LLM-ChatUI',
  },
  {
    id: '11',
    title: 'Stock Predictor AI',
    desc: 'Bidirectional LSTM neural network forecasting non-stationary stock trends with RSI, MACD & NATR features.',
    tags: ['PyTorch', 'LSTM', 'Time-Series', 'Finance'],
    color: 'green',
    stats: { users: '820', stars: '39', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/stock_price_prediction_application',
  },
  {
    id: '12',
    title: 'SmartPlacement',
    desc: 'Campus recruitment readiness engine predicting placement probabilities and student skill gap roadmaps.',
    tags: ['TypeScript', 'React', 'ML', 'Analytics'],
    color: 'orange',
    stats: { users: '750', stars: '36', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/SmartPlacement',
  },
  {
    id: '13',
    title: 'Public DNS Switcher',
    desc: 'Windows network stack orchestrator via netsh with live RTT latency benchmarking for fast DNS switching.',
    tags: ['Python', 'Flask', 'Windows API', 'Security'],
    color: 'red',
    stats: { users: '680', stars: '31', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Public_DNS_Switcher',
  },
  {
    id: '14',
    title: 'Biometric Attendance',
    desc: 'Contactless face recognition attendance logger with Haar cascades, 128D deep embeddings & SQLite.',
    tags: ['OpenCV', 'Python', 'SQLite', 'Biometrics'],
    color: 'ink',
    stats: { users: '580', stars: '27', tech: '4', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Simple_FaceRecoginition_Attendance_Sys',
  },
  {
    id: '15',
    title: 'Privacy Dashboard',
    desc: 'Tracks telemetry, web activity, and protects user data from online surveillance & tracking scripts.',
    tags: ['React.js', 'TypeScript', 'MySQL'],
    color: 'purple',
    stats: { users: '520', stars: '24', tech: '3', year: '2026' },
    link: 'https://github.com/CodeByPrakash/privacy_dashboard',
  },
  {
    id: '16',
    title: 'Movie Recommender',
    desc: 'Content-based and collaborative filtering recommender utilizing TF-IDF vectorization and cosine similarity.',
    tags: ['Pandas', 'Scikit-Learn', 'Python'],
    color: 'blue',
    stats: { users: '890', stars: '35', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/Movie-Recommender-System',
  },
  {
    id: '17',
    title: 'Open Ecommerce',
    desc: 'High-performance interactive ecommerce application with React, cart persistence, and micro-animations.',
    tags: ['React', 'Framer Motion', 'CSS3'],
    color: 'green',
    stats: { users: '2.3K', stars: '61', tech: '4', year: '2026' },
    link: 'https://open-ecommerce.vercel.app',
  },
  {
    id: '18',
    title: 'GCEK Vendor',
    desc: 'Campus peer-to-peer rental, used gear, and exchange marketplace for engineering students.',
    tags: ['Next.js', 'MongoDB', 'Tailwind'],
    color: 'orange',
    stats: { users: '1.4K', stars: '48', tech: '4', year: '2025' },
    link: 'https://gcekvendor.vercel.app',
  },
  {
    id: '19',
    title: 'Resume Builder',
    desc: 'ATS-friendly resume generator with live markdown preview, modular sections, and PDF compilation.',
    tags: ['React', 'Tailwind CSS', 'PDF Gen'],
    color: 'blue',
    stats: { users: '1.7K', stars: '54', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/ResumeBuilder-React',
  },
  {
    id: '20',
    title: 'Computer Lab LMS',
    desc: 'Multi-lab device tracking, hardware fault ticketing, and inventory management with 3NF relational MySQL.',
    tags: ['PHP', 'MySQL', 'Hardware Mgmt'],
    color: 'ink',
    stats: { users: '340', stars: '19', tech: '3', year: '2025' },
    link: 'https://github.com/CodeByPrakash/LMS',
  },
]

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const sectionRef = useRef(null)

  // Detect Mobile vs Desktop for responsive item count (4 on mobile, 6 on desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(6)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(projects.length / itemsPerPage)

  // Ensure valid page when itemsPerPage changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1)
    }
  }, [totalPages, currentPage])

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={styles.projects}
      aria-label="Portfolio — Engineering Projects in AI, Machine Learning, and Full-Stack Systems"
    >
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

        {/* Header */}
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
              <span className={styles.countLabel}>Page {currentPage} of {totalPages}</span>
              <span className={styles.countNum}>{projects.length} <span className={styles.countSub}>Total</span></span>
            </div>
          </motion.div>
        </motion.div>

        {/* Project cards grid — 6 per page on desktop, 4 on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className={styles.grid}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentProjects.map(p => (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.card} ${p.isCli ? styles.cardCliFeatured : ''}`}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
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

                {/* Stats row */}
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
        </AnimatePresence>

        {/* Pagination Navigation Controls */}
        <div className={styles.paginationRow}>
          <button
            type="button"
            className={`${styles.pageBtn} ${styles.prevNextBtn}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            ← Previous
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                type="button"
                className={`${styles.pageNumberBtn} ${pageNum === currentPage ? styles.pageNumberActive : ''}`}
                onClick={() => handlePageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.pageBtn} ${styles.prevNextBtn}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  )
}

