'use client'

import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import styles from './Skills.module.css'

const categories = [
  {
    title: 'Design',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    color: 'orange',
    level: 'INTERMEDIATE',
    skills: [
      { name: 'HTML & JS', xp: 98 },
      { name: 'CANVA', xp: 87 },
      { name: 'FIGMA', xp: 60 },
      { name: 'UI & UX', xp: 60 },
      { name: 'BLENDER', xp: 20 },
    ],
  },
  {
    title: 'Frontend',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" x2="10" y1="4" y2="20" />
      </svg>
    ),
    color: 'blue',
    level: 'PRO',
    skills: [
      { name: 'CSS / Sass', xp: 96 },
      { name: 'React', xp: 80 },
      { name: 'TypeScript', xp: 67 },
      { name: 'Animation', xp: 56 },
    ],
  },
  {
    title: 'Backend',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
    color: 'green',
    level: 'ADVANCED',
    skills: [
      { name: 'Node.js', xp: 72 },
      { name: 'mongoDB', xp: 70 },
      { name: 'PostgreSQL', xp: 65 },
      { name: 'REST APIs', xp: 50 },
    ],
  },
  {
    title: 'Strategy',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    color: 'purple',
    level: 'MASTER',
    skills: [
      { name: 'Agile / Scrum', xp: 85 },
      { name: 'Client comms', xp: 90 },
      { name: 'Accessibility', xp: 88 },
      { name: 'Performance', xp: 80 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      {/* Floating 3D Clay Morphism Edge Geometrics */}
      <motion.div 
        className={`${styles.clayShape} ${styles.clayShapeTorus}`}
        animate={{ y: [0, -32, 0], rotate: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className={`${styles.clayShape} ${styles.clayShapeOrb}`}
        animate={{ y: [0, 28, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div 
        className={`${styles.clayShape} ${styles.clayShapeCapsule}`}
        animate={{ y: [0, -22, 0], rotate: [-15, 15, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>⚔ Skills &amp; Abilities</motion.span>

        {/* Section heading — like reference */}
        <motion.h2 className={styles.sectionHeading} variants={fadeIn('up', 0)}>
          Character Stats
        </motion.h2>

        {/* Bento wrapper */}
        <div className={styles.bentoWrap}>
          {/* Top banner cell */}
          <motion.div className={styles.bannerCell} variants={fadeIn('up', 0)}>
            <span className={styles.bannerTag}>*Skill Overview</span>
            <p className={styles.bannerText}>
              Every project levels up my abilities. Here's the current skill tree — built through 3+ years
              of hands-on experience across design, frontend, backend, and strategy.
            </p>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            className={styles.grid}
            variants={staggerContainer(0.15, 0.2)}
          >
            {categories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                className={styles.card}
                variants={scaleIn(0)}
              >
                {/* Card header */}
                <div className={styles.cardHead}>
                  <span className={`${styles.icon} ${styles[`icon_${cat.color}`]}`}>
                    {cat.icon}
                  </span>
                  <span className={styles.catTitle}>{cat.title}</span>
                  <motion.span
                    className={`${styles.levelPill} ${styles[`lp_${cat.color}`]}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.4 + catIdx * 0.1, type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    {cat.level}
                  </motion.span>
                </div>

                {/* Skill bars */}
                <div className={styles.bars}>
                  {cat.skills.map((sk, skIdx) => (
                    <div key={sk.name} className={styles.barRow}>
                      <div className={styles.barMeta}>
                        <span className={styles.barName}>{sk.name}</span>
                        <span className={styles.barVal}>{sk.xp}</span>
                      </div>
                      <div className={styles.track}>
                        <motion.div
                          className={`${styles.fill} ${styles[`fill_${cat.color}`]}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${sk.xp}%` }}
                          viewport={{ once: false }}
                          transition={{
                            duration: 0.8,
                            delay: 0.3 + skIdx * 0.08,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
