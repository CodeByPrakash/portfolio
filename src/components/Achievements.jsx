'use client'

import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import styles from './Achievements.module.css'

const achievementsList = [
  {
    id: 1,
    title: '1st Prize — YOUTH@2050 Software Expo',
    issuer: 'District Level Science & Tech Innovation',
    year: '2024',
    desc: 'Awarded 1st Prize with 7000 Rs. Prize Pool at the District Level Software Expo for developing MRS-AI — an AI-powered medicine recommender system with symptom prediction.',
    color: 'green',
    tags: ['1st Prize', '7000Rs', 'YOUTH@2050', 'Healthcare AI', 'Winner'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'ISRO BAH 2026 — Exoplanet Detection',
    issuer: 'Bharatiya Antariksh Hackathon — Problem Statement PS-07',
    year: '2026',
    desc: 'Participated in ISRO national hackathon solving PS-07: Exoplanet Detection using Machine Learning, classifying deep space planetary transit light curves.',
    color: 'purple',
    tags: ['ISRO', 'BAH 2026', 'PS-07', 'Space ML', 'Deep Learning'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Smart India Hackathon (SIH) 2025',
    issuer: 'Ministry of Education & AICTE — Team CodeNova',
    year: '2025',
    desc: 'Participated in India’s premier national hackathon as part of Team CodeNova, engineering AttendTrue Analytics — an AI-powered smart attendance and institutional analytics system.',
    color: 'blue',
    tags: ['SIH 2025', 'Team CodeNova', 'AttendTrue', 'AI Analytics', 'Govt of India'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'B.Tech CSE — Lateral Entry',
    issuer: 'Government College of Engineering, Kalahandi',
    year: '2025 - Present',
    desc: 'Secured admission into B.Tech Computer Science & Engineering at GCEK through state-level Lateral Entry based on academic excellence.',
    color: 'orange',
    tags: ['Academics', 'B.Tech', 'GCEK', 'CSE'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Diploma in CSE — Distinction',
    issuer: 'State Council for Technical Education',
    year: '2022 - 2025',
    desc: 'Graduated with First Class Honours with Distinction in Computer Science & Engineering, mastering algorithms and core system architecture.',
    color: 'green',
    tags: ['Diploma', 'Honours', 'Distinction', 'CSE Core'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 6,
    title: '30+ Open-Source Projects Built',
    issuer: 'GitHub Creator & Open Source Community',
    year: '2023 - 2026',
    desc: 'Engineered and published 30+ public repositories across AI/ML, computer vision, web applications, and system utilities.',
    color: 'red',
    tags: ['Open Source', '100+ Repos', 'GitHub', 'Builder'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className={styles.achievements}>
      {/* Floating 3D Clay Shapes */}
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapeOrb}`}
        animate={{ y: [0, -28, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapeTorus}`}
        animate={{ rotate: [0, 360], y: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>
          ✦ Honors &amp; Milestones
        </motion.span>

        <motion.h2 className={styles.heading} variants={fadeIn('up', 0)}>
          Achievements &amp; <span className={styles.accent}>Credentials.</span>
        </motion.h2>

        <motion.p className={styles.sub} variants={fadeIn('up', 0.1)}>
          A track record of consistent hands-on building, academic discipline, and open-source contributions.
        </motion.p>

        {/* Overview Stats Banner */}
        <motion.div className={styles.overviewBanner} variants={fadeIn('up', 0.15)}>
          <div className={styles.overviewText}>
            <span className={styles.bannerTag}>*Verified Milestones</span>
            <h3 className={styles.bannerHeadline}>Building with Distinction</h3>
            <p className={styles.bannerDesc}>
              Combining strong engineering fundamentals with practical project execution.
            </p>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>100+</span>
              <span className={styles.statLabel}>GitHub Repos</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Years Coding</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>B.Tech</span>
              <span className={styles.statLabel}>CSE Degree</span>
            </div>
          </div>
        </motion.div>

        {/* 3D Clay Achievements Grid */}
        <motion.div className={styles.grid} variants={staggerContainer(0.1, 0.2)}>
          {achievementsList.map((item) => (
            <motion.div
              key={item.id}
              className={styles.card}
              variants={scaleIn(0)}
            >
              <div className={styles.cardHead}>
                <div className={`${styles.iconBadge} ${styles[`icon_${item.color}`]}`}>
                  {item.icon}
                </div>
                <span className={styles.yearPill}>{item.year}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <span className={styles.issuer}>{item.issuer}</span>
              <p className={styles.cardDesc}>{item.desc}</p>

              <div className={styles.cardTags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
