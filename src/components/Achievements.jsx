'use client'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '../utils/motion'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import styles from './Achievements.module.css'

const achievementsList = [
  {
    id: 0,
    title: 'Tech Head @ CodeBreakers & HackVerse Lead',
    issuer: 'CodeBreakers — Coding Club of Government College of Engineering Kalahandi',
    year: '2026',
    desc: 'Appointed Technical Lead at CodeBreakers (codebreakersgcek.tech). Architecting the digital infrastructure and platform for HackVerse 2026 (hackverse.codebreakersgcek.tech) — Central & Eastern India’s flagship 24H state tech fest & hackathon.',
    color: 'orange',
    tags: ['Tech Head', 'CodeBreakers', 'GCEK', 'HackVerse', 'Platform Lead', 'Coding Club'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 1,
    title: '1st Prize — YOUTH@2050 Software Expo',
    issuer: 'District Level Science & Tech Innovation',
    year: '2024',
    desc: 'Awarded 1st Prize with 7000 Rs. Prize Pool at the District Level Software Expo for developing MRS-AI — an AI-powered medicine recommender system with symptom prediction.',
    color: 'emerald',
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
    title: '7-Day IDE Bootcamp — IIM Sambalpur',
    issuer: 'MoE Innovation Cell (MIC), AICTE & IIM Sambalpur',
    year: '2024',
    desc: 'Completed the intensive 7-day residential Innovation, Design & Entrepreneurship (IDE) Bootcamp Edition 2 Phase 1 at IIM Sambalpur. Mastered design thinking, BMC business modeling, product prototyping, and venture pitch scaling.',
    color: 'teal',
    tags: ['IIM Sambalpur', 'IDE Bootcamp', 'Edition 2 Phase 1', 'Design Thinking', 'Entrepreneurship', 'AICTE & MIC'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    title: 'B.Tech CSE — Lateral Entry',
    issuer: 'Government College of Engineering, Kalahandi',
    year: '2025 - Present',
    desc: 'Secured admission into B.Tech Computer Science & Engineering at GCEK through state-level Lateral Entry based on academic excellence.',
    color: 'rose',
    tags: ['Academics', 'B.Tech', 'GCEK', 'CSE'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Diploma in CSE — Distinction',
    issuer: 'State Council for Technical Education',
    year: '2022 - 2025',
    desc: 'Graduated with First Class Honours with Distinction in Computer Science & Engineering, mastering algorithms and core system architecture.',
    color: 'mint',
    tags: ['Diploma', 'Honours', 'Distinction', 'CSE Core'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 7,
    title: '30+ Open-Source Projects Built',
    issuer: 'GitHub Creator & Open Source Community',
    year: '2023 - 2026',
    desc: 'Engineered and published 30+ public repositories across AI/ML, computer vision, web applications, and system utilities.',
    color: 'indigo',
    tags: ['Open Source', '100+ Repos', 'GitHub', 'Builder'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

const cardThemeMap = {
  orange: { accent: '#FF7700', rgb: '255, 119, 0' },
  emerald: { accent: '#10B981', rgb: '16, 185, 129' },
  teal: { accent: '#06B6D4', rgb: '6, 182, 212' },
  purple: { accent: '#A855F7', rgb: '168, 85, 247' },
  blue: { accent: '#3B82F6', rgb: '59, 130, 246' },
  rose: { accent: '#F43F5E', rgb: '244, 63, 94' },
  mint: { accent: '#0D9488', rgb: '13, 148, 136' },
  indigo: { accent: '#6366F1', rgb: '99, 102, 241' },
}

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
        <div className={styles.headerRow}>
          <div>
            <motion.span className="section-tag" variants={fadeIn('down', 0)}>
              ✦ Honors &amp; Milestones
            </motion.span>

            <motion.h2 className={styles.heading} variants={fadeIn('up', 0)}>
              Achievements &amp; <span className={styles.accent}>Credentials.</span>
            </motion.h2>
          </div>
        </div>

        {/* Overview Stats Banner */}
        <motion.div className={styles.overviewBanner} variants={fadeIn('up', 0.15)}>
          <div className={styles.overviewText}>
            <span className={styles.bannerTag}>*Verified Milestones</span>
            <h3 className={styles.bannerHeadline}>Building with Distinction</h3>
            <p className={styles.bannerDesc}>
              Honored at IIM Sambalpur 7-Day IDE Bootcamp, 1st Prize at YOUTH@2050, ISRO BAH 2026, and Smart India Hackathon.
            </p>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>100+</span>
              <span className={styles.statLabel}>GitHub Repos</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>7 Days</span>
              <span className={styles.statLabel}>IIM Sambalpur</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>B.Tech</span>
              <span className={styles.statLabel}>CSE Degree</span>
            </div>
          </div>
        </motion.div>

        {/* ScrollStack Achievements Cards */}
        <div className={styles.stackContainer}>
          <ScrollStack
            useWindowScroll={true}
            itemDistance={75}
            itemScale={0.038}
            itemStackDistance={30}
            stackPosition="18%"
            scaleEndPosition="8%"
            baseScale={0.88}
            blurAmount={0}
          >
            {achievementsList.map((item) => {
              const theme = cardThemeMap[item.color] || cardThemeMap.orange

              return (
                <ScrollStackItem key={item.id} itemClassName={styles.stackCardWrapper}>
                  <div
                    className={`${styles.card} ${styles.stackCard} ${styles[`card_${item.color}`] || ''}`}
                    style={{
                      '--card-accent': theme.accent,
                      '--card-accent-rgb': theme.rgb,
                    }}
                  >
                    <div className={styles.cardHead}>
                      <div className={styles.headLeft}>
                        <div className={`${styles.iconBadge} ${styles[`icon_${item.color}`]}`}>
                          {item.icon}
                        </div>
                        <div className={styles.titleGroup}>
                          <h3 className={styles.cardTitle}>{item.title}</h3>
                          <span className={styles.issuer}>{item.issuer}</span>
                        </div>
                      </div>

                      <div className={styles.headRight}>
                        <span className={styles.yearPill}>{item.year}</span>
                      </div>
                    </div>

                    <div className={styles.contentInner}>
                      <div className={styles.descBox}>
                        <p className={styles.cardDesc}>{item.desc}</p>
                      </div>

                      <div className={styles.tagsRow}>
                        <div className={styles.cardTags}>
                          {item.tags.map((tag) => (
                            <span key={tag} className={styles.tagPill}>
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className={styles.verifiedBadge}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Verified Milestone</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              )
            })}
          </ScrollStack>
        </div>
      </motion.div>
    </section>
  )
}
