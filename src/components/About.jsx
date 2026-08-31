'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, slideIn, popIn } from '../utils/motion'
import GithubContributions from './GithubContributions'
import styles from './About.module.css'

const tools = ['Figma', 'React', 'TypeScript', 'Node.js', 'CSS/Sass', 'Framer', 'Git', 'Tailwind', 'PHP', 'Python', 'Flask', 'mongoDB', 'mySQL', 'Streamlit', 'CANVA', 'BLENDER']

const highlights = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
      </svg>
    ),
    text: 'AI-Driven Solutions',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    text: 'Secure Architecture',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    text: 'Full-Stack Builds',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'End-to-End Delivery',
  },
]

export default function About() {
  return (
    <section id="about" className={styles.about} aria-label="About Om Prakash Behera — Computer Science Engineer, Full-Stack Developer and AI Enthusiast from Odisha, India">
      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>◈ About me</motion.span>

        {/* Section heading row */}
        <motion.h2 className={styles.sectionHeading} variants={fadeIn('up', 0)}>
          Beyond Code
        </motion.h2>

        {/* Main bento grid — like reference "BEYOND CAPITAL" */}
        <div className={styles.bento}>
          {/* Row 1: Left big cell + Right column */}
          <motion.div className={styles.cellMain} variants={slideIn('left', 0.1)}>
            <span className={styles.cellTag}>*Supercharging Ideas into Reality</span>
            <h3 className={styles.cellTitle}>Think, Learn<br />Work..</h3>
            <p className={styles.cellBody}>
              I am a Computer Science diploma graduate and a hands-on developer who believes in building real,
              working systems rather than just learning theory.
            </p>
            <div className={styles.bulletList}>
              {highlights.map(h => (
                <div key={h.text} className={styles.bullet}>
                  <span className={styles.bulletIcon}>{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className={`btn btn-accent ${styles.ctaBtn}`}>
              Let's work together ↗
            </a>
          </motion.div>

          <div className={styles.rightCol}>
            <motion.div className={styles.cellDesc} variants={fadeIn('right', 0.2)}>
              <span className={styles.cellTag}>*About Me</span>
              <p className={styles.cellBody}>
                My core interests lie in AI, automation, and intelligent system design.
                I have worked on multi-factor secure attendance systems, face recognition apps,
                management systems, and AI-driven tools using Python, React, PHP, Flask, SQL, and ML.
              </p>
            </motion.div>

            <div className={styles.cellRow}>
              <motion.div className={styles.cellSmall} variants={fadeIn('up', 0.3)}>
                <span className={styles.cellSmallLabel}>Education</span>
                <span className={styles.cellSmallValue}>BTech CSE</span>
                <span className={styles.cellSmallSub}>Computer Science</span>
              </motion.div>
              <motion.div className={styles.cellSmall} variants={fadeIn('up', 0.35)}>
                <span className={styles.cellSmallLabel}>Experience</span>
                <span className={styles.cellSmallValue}>3+ Years</span>
                <span className={styles.cellSmallSub}>Building & Shipping</span>
              </motion.div>
            </div>
          </div>

          {/* Row 2: Avatar + Info cards + Toolkit */}
          <motion.div className={styles.cellAvatar} variants={fadeIn('up', 0.2)}>
            <Image
              src="/omprakash.webp"
              alt="Om Prakash Behera - Computer Science Engineer (CSE) and Full-Stack AI Developer"
              className={styles.avatarImg}
              width={320}
              height={320}
              quality={85}
              loading="lazy"
              sizes="(max-width: 640px) 240px, 320px"
            />
            <div className={styles.avatarMeta}>
              <span className={styles.avatarName}>Om Prakash Behera</span>
              <span className={styles.avatarRole}>Full-Stack Developer & AI Enthusiast</span>
            </div>
          </motion.div>

          <motion.div className={styles.cellInfo} variants={fadeIn('up', 0.25)}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoVal}>Bhawanipatna, Odisha</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </span>
                <div>
                  <span className={styles.infoLabel}>Education</span>
                  <span className={styles.infoVal}>BTech in CSE</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </span>
                <div>
                  <span className={styles.infoLabel}>Status</span>
                  <span className={styles.infoVal}>Open to freelance</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                  </svg>
                </span>
                <div>
                  <span className={styles.infoLabel}>Currently</span>
                  <span className={styles.infoVal}>A Student</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className={styles.cellToolkit} variants={fadeIn('up', 0.3)}>
            <span className={styles.cellTag}>*Toolkit</span>
            <motion.div
              className={styles.toolList}
              variants={staggerContainer(0.03, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
            >
              {tools.map(t => (
                <motion.span key={t} className={styles.tool} variants={popIn(0)}>
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Row 3: 3D Clay Morphism Showcase Cells */}
          <motion.div className={styles.cellClay1} variants={fadeIn('up', 0.35)}>
            <motion.div
              className={styles.clayInnerOrb}
              animate={{ y: [0, -12, 0], rotate: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className={styles.clayCellLabel}>AI Architecture</span>
          </motion.div>

          <motion.div className={styles.cellClay2} variants={fadeIn('up', 0.4)}>
            <motion.div
              className={styles.clayInnerTorus}
              animate={{ rotate: [0, 360], scale: [1, 1.06, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <span className={styles.clayCellLabel}>Full-Stack Core</span>
          </motion.div>

          <motion.div className={styles.cellClay3} variants={fadeIn('up', 0.45)}>
            <motion.div
              className={styles.clayInnerCapsule}
              animate={{ y: [0, 10, 0], rotate: [-10, 15, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className={styles.clayCellLabel}>Secure Systems</span>
          </motion.div>

          {/* Row 4: GitHub Contributions Graph (Full Width Bento Cell) */}
          <GithubContributions username="CodeByPrakash" />

        </div>
      </motion.div>

      {/* Floating 3D Clay Morphism Edge Geometrics */}
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapeOrb}`}
        animate={{ y: [0, -26, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapePill}`}
        animate={{ y: [0, 28, 0], rotate: [-15, 25, -15] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </section>
  )
}
