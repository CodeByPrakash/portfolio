
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import styles from './Hero.module.css'

const techLogos = ['React', 'Next.js', 'Python', 'Node.js', 'TensorFlow', 'PostgreSQL', 'FastAPI', 'Docker']

const socialLinks = [
  {
    name: 'GitHub',
    short: 'GitHub',
    href: 'https://github.com/CodeByPrakash',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    short: 'LinkedIn',
    href: 'https://linkedin.com/in/omprakash-cse',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    short: 'Instagram',
    href: 'https://instagram.com/quasar_om',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
      </svg>
    ),
  },
  {
    name: 'Email',
    short: 'Mail',
    href: 'mailto:omprakashbehera.cse@gmail.com',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export default function Hero() {
  const { isDark, toggleTheme } = useTheme()
  const heroRef = useRef(null)

  // Scroll Progress Physics
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  })

  // Subtle Scroll Parallax
  const photoFrameY = useTransform(smoothScrollProgress, [0, 1], [0, 45])
  const personScrollY = useTransform(smoothScrollProgress, [0, 1], [0, -25])
  const bgScrollY = useTransform(smoothScrollProgress, [0, 1], [0, 20])

  return (
    <section
      className={styles.hero}
      id="hero"
      ref={heroRef}
      aria-label="Hero — Om Prakash Behera, Computer Science Engineer building intelligent systems"
    >
      <div className={`section-wrap ${styles.inner}`}>
        {/* 2-Column Minimal Editorial Hero Grid */}
        <div className={styles.heroGrid}>
          {/* Left Column — 55-60% width */}
          <div className={styles.leftCol}>
            {/* Understated Eyebrow with Location & Bat Theme Switcher */}
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>COMPUTER SCIENCE ENGINEER</span>
              <span className={styles.locationTag}>
                <span className={styles.locationPulse} />
                Bhawanipatna, IN
              </span>

              {/* Bat Emoji Theme Toggle */}
              <button
                type="button"
                className={`${styles.themePalmBtn} ${isDark ? styles.themePalmDark : ''}`}
                onClick={toggleTheme}
                aria-label={`Toggle theme: currently ${isDark ? 'Dark Mode' : 'Light Mode'}`}
                title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode (🦇)`}
                suppressHydrationWarning
              >
                <span className={styles.palmEmoji}>🦇</span>
              </button>
            </div>

            {/* IIM Sambalpur IDE Bootcamp Highlight Badge */}
            <a href="#achievements" className={styles.highlightBadge} title="View IIM Sambalpur 7-Day IDE Bootcamp Milestone">
              <span className={styles.highlightBadgeIcon}>✦</span>
              <span className={styles.highlightBadgeText}>
                <strong>IIM Sambalpur</strong> 7-Day IDE Bootcamp (Edition 2 Phase 1)
              </span>
              <span className={styles.highlightBadgeArrow}>↗</span>
            </a>

            {/* Bold Futuristic Headline */}
            <div className={styles.headlineWrapper}>
              <h1 className={styles.headline}>
                <span className={styles.headLine1}>INTELLIGENT</span>
                <span className={styles.headLine2}>
                  SYSTEMS<span className={styles.dotAccent}>.</span>
                </span>
              </h1>
            </div>

            {/* Concise 2-Line Description */}
            <p className={styles.bioText}>
              Building AI-driven systems and resilient full-stack platforms that solve real-world problems.
            </p>

            {/* 4 Social/Contact Buttons */}
            <div className={styles.socialRow}>
              {socialLinks.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  title={s.name}
                  aria-label={s.name}
                >
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <span className={styles.socialLabel}>{s.short}</span>
                </a>
              ))}
            </div>

            {/* Two Primary Statistics Maximum */}
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>Projects Built</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Years Building</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className={styles.ctaRow}>
              <a href="#projects" className="btn btn-accent">Explore Work ↓</a>
              <a href="/resume.pdf" download className="btn btn-outline">Resume ↓</a>
              <a
                href="https://omprakashbehera-3d.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                title="Open 3D Web Portfolio"
              >
                <span className={styles.cliPrompt}>&gt;_</span> 3D ↗
              </a>
            </div>
          </div>

          {/* Right Column: Dominant Portrait in Rounded Frame with Sculpted 3-Circle Notch */}
          <div className={styles.rightCol}>
            <motion.div
              className={styles.photoStageWrap}
              style={{ y: photoFrameY }}
            >
              {/* Main Photo Frame */}
              <div className={styles.photoFrame}>
                {/* Subtle Developer Background Art (Flipped to correct orientation) */}
                <motion.div
                  className={styles.layerBg}
                  style={{ y: bgScrollY, scaleX: -1 }}
                >
                  <Image
                    src="/hero/hero_bg.png"
                    alt="Abstract Technical Blueprint Grid Background"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 540px"
                    className={styles.bgImage}
                  />
                </motion.div>

                {/* Dominant Illustrated Portrait (Flipped to correct natural orientation) */}
                <motion.div
                  className={styles.layerPerson}
                  style={{ y: personScrollY, scaleX: -1 }}
                >
                  <Image
                    src="/hero/hero_person.png"
                    alt="Om Prakash Behera — Computer Science Engineer"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 540px"
                    className={styles.personImage}
                  />
                </motion.div>
              </div>

              {/* Sculpted Left Cutout Notch with 3 Stacked Preview Circles (Reference Design) */}
              <div className={styles.sculptedNotch}>
                {/* 1. Top Preview Circle (Camera / Hand Gadget) */}
                <a
                  href="#journey"
                  className={`${styles.notchCircle} ${styles.notchActionBtn}`}
                  title="Explore Journey"
                  aria-label="Explore Journey"
                >
                  <svg width="64" height="64" style={{ padding: "0.4rem" }} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M133 58H99
       C76 58 59 74 59 96
       C59 118 76 134 99 134
       H185
       C208 134 221 150 221 170
       C221 192 207 211 183 211
       H134"
                      stroke="#ffffffff"
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle cx="198" cy="57" r="32" fill="#ffffffff" />
                    <circle cx="198" cy="57" r="11" fill="#FFFFFF" />

                    <circle cx="70" cy="207" r="32" fill="#ffffffff" />
                    <circle cx="70" cy="207" r="11" fill="#FFFFFF" />
                  </svg>
                </a>

                {/* 2. Middle Preview Circle (Developer Portrait Thumbnail) */}
                <div className={`${styles.notchCircle} ${styles.notchCircle2}`} title="Om Prakash">
                  <div className={styles.notchCircleInner}>
                    <Image
                      src="/omprakash.webp"
                      alt="Om Prakash"
                      width={48}
                      height={48}
                      className={styles.notchThumbImg}
                    />
                  </div>
                </div>

                {/* 3. Bottom Action Button (Diagonal Arrow ↗) */}
                <a
                  href="#projects"
                  className={`${styles.notchCircle} ${styles.notchActionBtn}`}
                  title="Explore Projects"
                  aria-label="Explore Projects"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-Width Horizontal Technical Industrial Ribbon / Ticker */}
      <div className={styles.tapeRibbonWrap} aria-label="Core Engineering Disciplines">
        <div className={styles.tapeRibbonInner}>
          <div className={styles.tapeTrack}>
            {[0, 1, 2, 3].map(i => (
              <span key={i} className={styles.tapeBlock}>
                <span>AI ENGINEERING</span>
                <span className={styles.tapeDot}>◆</span>
                <span>IIM SAMBALPUR IDE BOOTCAMP</span>
                <span className={styles.tapeDot}>◆</span>
                <span>FULL STACK</span>
                <span className={styles.tapeDot}>◆</span>
                <span>MACHINE LEARNING</span>
                <span className={styles.tapeDot}>◆</span>
                <span>SYSTEM DESIGN</span>
                <span className={styles.tapeDot}>◆</span>
                <span>YOUTH@2050 1ST PRIZE</span>
                <span className={styles.tapeDot}>◆</span>
                <span>30+ PROJECTS</span>
                <span className={styles.tapeDot}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
