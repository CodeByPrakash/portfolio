'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import styles from './Hero.module.css'

const techLogos = ['React', 'Python', 'Node.js', 'Flask', 'TensorFlow', 'PostgreSQL']

export default function Hero() {
  const { isDark, toggleTheme } = useTheme()
  const heroRef = useRef(null)

  // Track scroll position across the Hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Smooth spring physics for scroll-driven path drawing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  // Dynamic path length drawing & arrow distance linked strictly to scroll
  const pathLength = useTransform(smoothProgress, [0, 0.6], [0.15, 1])
  const arrowDistance = useTransform(smoothProgress, [0, 0.6], ['15%', '100%'])
  const arrowScale = useTransform(smoothProgress, [0, 0.35], [0.9, 1.15])
  const ribbonRotate = useTransform(smoothProgress, [0, 1], [0, 6])
  const ribbonY = useTransform(smoothProgress, [0, 1], [0, 35])

  return (
    <section className={styles.hero} id="hero" ref={heroRef} aria-label="Hero — Om Prakash Behera, Computer Science Engineer building intelligent systems">
      {/* Scrolling marquee — like reference */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marquee}>
          <span>BUILDING INTELLIGENT SYSTEMS — COMPUTER SCIENCE ENGINEER (CSE) — FULL STACK SOFTWARE DEVELOPER — AI & ML ENGINEER — BTECH COMPUTER SCIENCE — </span>
          <span>BUILDING INTELLIGENT SYSTEMS — COMPUTER SCIENCE ENGINEER (CSE) — FULL STACK SOFTWARE DEVELOPER — AI & ML ENGINEER — BTECH COMPUTER SCIENCE — </span>
        </div>
      </div>

      <div className={`section-wrap ${styles.inner}`}>
        {/* Top row: status + nav tabs + unique Hello Palm Dark Mode Switcher */}
        <div className={styles.topRow}>
          <div className={styles.tabGroup}>
            <a href="#about" className={styles.tab}>About</a>
            <a href="#projects" className={`${styles.tab} ${styles.tabActive}`}>Portfolio</a>
            <a href="#skills" className={styles.tab}>Skills</a>
          </div>

          <div className={styles.topRightControls}>
            {/* Unique Hello Palm Emoji Theme Switcher (Emoji Only) */}
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

            <div className={styles.status}>
              <span className={styles.statusDot} />
              Available for work
            </div>
          </div>
        </div>

        {/* Headline with Clean Connected Dotted Arrow & Wave (Rendered BEHIND text) */}
        <div className={styles.headlineWrapper}>
          {/* Unified Connected Dotted Arrow & Triangle Head (Background Layer, z-index: 1) */}
          <motion.svg
            className={styles.unifiedArrowSvg}
            viewBox="0 0 960 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ y: ribbonY, rotate: ribbonRotate }}
            aria-hidden="true"
          >
            <defs>
              {/* Vibrant Linear Gradient along the Dotted Wave */}
              <linearGradient id="arrowLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="35%" stopColor="#8B5CF6" />
                <stop offset="70%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>

              {/* Triangle Head Gradient */}
              <linearGradient id="arrowHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3d3d3dff" />
                <stop offset="100%" stopColor="#5f5f5fff" />
              </linearGradient>

              {/* Scroll Progress Mask — unmasks the true dotted dashes cleanly */}
              <mask id="dottedScrollMask">
                <motion.path
                  d="M 40,190 C 140,190 200,50 330,50 C 460,50 510,270 640,270 C 750,270 800,160 880,70"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  style={{ pathLength }}
                />
              </mask>
            </defs>

            {/* True Dotted / Stroked Line Tail — lengthier rounded dashes unmasked with scroll */}
            <path
              d="M 40,190 C 140,190 200,50 330,50 C 460,50 510,270 640,270 C 750,270 800,160 880,70"
              fill="none"
              stroke="url(#arrowLineGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="10 16"
              mask="url(#dottedScrollMask)"
            />

            {/* Compact Triangle Head — shifted to the left to cleanly cap and cover the line end */}
            <motion.g
              style={{
                offsetPath: "path('M 40,190 C 140,190 200,50 330,50 C 460,50 510,270 640,270 C 750,270 800,160 880,70')",
                offsetRotate: 'auto',
                offsetDistance: arrowDistance,
                scale: arrowScale,
              }}
            >
              {/* Compact Solid Gradient Triangle Arrowhead covering the line end */}
              <path
                d="M 12,0 L -6,-10 L -6,10 Z"
                fill="url(#arrowHeadGrad)"
                stroke="url(#arrowHeadGrad)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </motion.g>
          </motion.svg>

          {/* Main Headline Display Text (Instant Static Paint for 100% Core Web Vitals) */}
          <h1 className={styles.headline}>
            <span className={styles.line1}>Building</span>
            <span className={styles.line2}>
              Intelligent <span className={styles.highlight}>Systems</span>
            </span>
            <span className={styles.line3}>For All.</span>
          </h1>
        </div>

        {/* Sub row: description + CTAs side by side (LCP Element) */}
        <div className={styles.subRow}>
          <p className={styles.sub}>
            Computer Science Engineer building AI-driven systems.
            From architecture to deployment — I create complete solutions
            that solve real-world problems.
          </p>
          <div className={styles.ctaCol}>
            <a href="#projects" className="btn btn-accent">See my work ↓</a>
            <a href="#contact" className="btn">Get in touch</a>
            <a href="/resume.pdf" download className="btn btn-outline">↓ Resume</a>
            <a
              href="https://websitelaunches.com/site/omprakashbehera.me"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.launchBadge}
              aria-label="Established online - Public launch record"
            >
              <img
                src={`https://websitelaunches.com/badge/omprakashbehera.me.svg?theme=${isDark ? 'dark' : 'light'}`}
                alt="Established online - Public launch record"
                width="255"
                height="55"
                className={styles.launchBadgeImg}
              />
            </a>
          </div>
        </div>

        {/* Stats row — 3D Clay Morphism Grid */}
        <div className={styles.stats}>
          {[
            { n: '3+', l: 'Years Experience', color: 'orange' },
            { n: '30+', l: 'Projects Built', color: 'blue' },
            { n: '13+', l: 'Tech Stack Tools', color: 'green' },
            { n: '99%', l: 'Satisfaction Rate', color: 'purple' },
          ].map(s => (
            <div
              key={s.l}
              className={`${styles.stat} ${styles[`stat_${s.color}`]}`}
            >
              <span className={styles.statN}>{s.n}</span>
              <span className={styles.statL}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating 3D Clay Morphism Edge Geometrics (GPU Compositor Animated) */}
      <div className={`${styles.clayShape} ${styles.clayOrb}`} aria-hidden="true" />
      <div className={`${styles.clayShape} ${styles.clayTorus}`} aria-hidden="true" />
      <div className={`${styles.clayShape} ${styles.clayPill}`} aria-hidden="true" />
      <div className={`${styles.clayShape} ${styles.clayCube}`} aria-hidden="true" />
      <div className={`${styles.clayShape} ${styles.clayMiniOrb}`} aria-hidden="true" />

      {/* Tech logos strip — like reference partner strip */}
      <motion.div
        className={styles.logoStrip}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className={styles.logoStripInner}>
          {techLogos.map(t => (
            <span key={t} className={styles.logoItem}>
              <span className={styles.logoDot}>●</span> {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
