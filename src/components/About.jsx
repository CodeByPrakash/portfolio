'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './About.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TOTAL_FRAMES = 239

const STEPS_DATA = [
  {
    step: '01',
    name: 'THINK',
    tag: '// SUPERCHARGING IDEAS INTO REALITY',
    lines: ['THINK,', 'LEARN,', 'BUILD,', 'SHIP.'],
    highlightIdx: 2,
    body: 'Turning ideas into real-world solutions through code, creativity and continuous learning.',
    cta: 'EXPLORE MY JOURNEY ↗',
    ctaLink: '#projects',
  },
  {
    step: '02',
    name: 'LEARN',
    tag: '// CONTINUOUS ADAPTATION & INTELLIGENCE',
    lines: ['EXPLORE,', 'MASTER,', 'REFINE,', 'EVOLVE.'],
    highlightIdx: 2,
    body: '7-Day Residential IDE Bootcamp Fellow at IIM Sambalpur. Engineering neural networks, computer vision, and distributed systems.',
    cta: 'VIEW ACHIEVEMENTS ↗',
    ctaLink: '#achievements',
  },
  {
    step: '03',
    name: 'BUILD',
    tag: '// FULL-STACK SYSTEM ENGINEERING',
    lines: ['DESIGN,', 'ARCHITECT,', 'SCALE,', 'SECURE.'],
    highlightIdx: 2,
    body: 'Tech Head at CodeBreakers GCEK. Lead architect engineering HackVerse \'26 and 30+ production systems.',
    cta: 'EXPLORE PROJECTS ↗',
    ctaLink: '#projects',
  },
  {
    step: '04',
    name: 'SHIP',
    tag: '// DELIVERING MEASURABLE IMPACT',
    lines: ['DEPLOY,', 'MEASURE,', 'LEAD,', 'INSPIRE.'],
    highlightIdx: 2,
    body: 'Delivering resilient, high-performance platforms for 500+ developers, state tech fests, and real-world clients.',
    cta: 'CONNECT WITH ME ↗',
    ctaLink: '#contact',
  },
]

export default function About() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const currentFrameRef = useRef(0)
  const [activeStepIdx, setActiveStepIdx] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container) return

    let gsapCtx
    const images = []

    // Fixed 1:1 Canvas buffer sizing & resize listener
    const updateCanvasSize = () => {
      if (!canvas || !container) return
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      renderCanvasFrame(currentFrameRef.current)
    }

    // Full-Page Cover Frame Renderer (matching exact video studio background)
    const renderCanvasFrame = (index) => {
      currentFrameRef.current = index
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const img = images[index]
      if (img && img.complete && img.naturalWidth > 0) {
        const cWidth = canvas.width
        const cHeight = canvas.height

        // Calculate aspect-ratio cover dimensions to fill the 100% canvas area
        const scale = Math.max(cWidth / img.naturalWidth, cHeight / img.naturalHeight)
        const drawWidth = img.naturalWidth * scale
        const drawHeight = img.naturalHeight * scale

        // Position: On desktop, anchor character toward right half; center on mobile
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
        const drawX = isDesktop ? (cWidth - drawWidth) * 0.78 : (cWidth - drawWidth) / 2
        const drawY = (cHeight - drawHeight) / 2

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        // Match base canvas fill to exact video background
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        const bgHex = isDark ? '#0E0D12' : '#EEDECA'

        ctx.fillStyle = bgHex
        ctx.fillRect(0, 0, cWidth, cHeight)

        // Draw full-page covering video frame
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Theme switch observer to immediately update canvas background
    const themeObserver = new MutationObserver(() => {
      renderCanvasFrame(currentFrameRef.current)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // Preload 239 frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(4, '0')
      img.src = `/about/frames/frame_${frameNum}.jpg`
      img.onload = () => {
        if (i === 1) renderCanvasFrame(0)
      }
      images.push(img)
    }

    // Master GSAP Timeline
    gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=300%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress
          const stepIdx = Math.min(Math.floor(p * 4), 3)
          setActiveStepIdx(stepIdx)

          const targetFrame = Math.min(Math.round(p * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
          renderCanvasFrame(targetFrame)
        },
      })
    }, container)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      themeObserver.disconnect()
      if (gsapCtx) gsapCtx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [])

  const currentData = STEPS_DATA[activeStepIdx]

  return (
    <section ref={containerRef} id="about" className={styles.aboutSection} aria-label="About Om Prakash Behera">
      {/* ── 100vh Full-Bleed Background Video Canvas ── */}
      <canvas ref={canvasRef} className={styles.canvasBg} aria-hidden="true" />
      <div className={styles.canvasFogOverlay} aria-hidden="true" />


      {/* Top Header Row */}
      <div className={styles.topRow}>
        <div className={styles.aboutMeBadge}>
          <span className={styles.orangeDot} />
          <span>ABOUT ME</span>
        </div>
        <div className={styles.stepCounter}>
          <span className={styles.activeStepNum}>0{activeStepIdx + 1}</span>
          <span className={styles.slash}>/</span>
          <span>04</span>
        </div>
      </div>

      {/* Left Vertical Step Indicator Timeline */}
      <div className={styles.leftTimeline}>
        {STEPS_DATA.map((s, idx) => {
          const isActive = idx === activeStepIdx
          return (
            <div key={s.step} className={`${styles.timelineNode} ${isActive ? styles.nodeActive : ''}`}>
              <span className={styles.timelineNum}>{s.step}</span>
              <span className={styles.timelineCircle} />
              {idx < STEPS_DATA.length - 1 && <span className={styles.timelineConnector} />}
            </div>
          )
        })}
      </div>

      {/* Right Vertical Step Tracker Menu */}
      <div className={styles.rightStepMenu}>
        {STEPS_DATA.map((s, idx) => {
          const isActive = idx === activeStepIdx
          return (
            <div key={s.name} className={`${styles.stepMenuItem} ${isActive ? styles.menuActive : ''}`}>
              <span className={styles.menuName}>{s.name}</span>
              <span className={styles.menuDash}>—</span>
            </div>
          )
        })}
      </div>

      {/* Left-Side Minimized Overlayed Typography (Single Active Animated Card) */}
      <div className={styles.leftOverlay}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentData.step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={styles.contentWrap}
          >
            <div className={styles.tagline}>{currentData.tag}</div>

            <h2 className={styles.headline}>
              {currentData.lines.map((line, lIdx) => (
                <span
                  key={line}
                  className={`${styles.headlineWord} ${lIdx === currentData.highlightIdx ? styles.headlineHighlight : ''}`}
                >
                  {line}
                </span>
              ))}
            </h2>

            <div className={styles.accentLine} />

            <p className={styles.description}>{currentData.body}</p>

            <a href={currentData.ctaLink} className={styles.ctaButton}>
              {currentData.cta}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
