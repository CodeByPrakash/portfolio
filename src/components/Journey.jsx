'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { fadeIn, staggerContainer } from '../utils/motion'
import styles from './Journey.module.css'

const milestones = [
  {
    step: '01',
    year: '2022',
    title: 'Started Diploma in CSE',
    desc: 'Began my Computer Science journey — learned programming fundamentals, C, and basic web development.',
    side: 'left',
    color: 'blue',
    tag: 'Foundation',
  },
  {
    step: '02',
    year: '2023',
    title: 'First Real Project',
    desc: 'Built my first full project — a Student Management System using Microsoft Access. Fell in love with building things.',
    side: 'right',
    color: 'orange',
    tag: 'Ignition',
  },
  {
    step: '03',
    year: '2024',
    title: 'Web Development Deep Dive',
    desc: 'Mastered HTML, CSS, JavaScript, PHP, and MySQL. Built the Odisha Tourist Management System and Computer Lab Management System.',
    side: 'left',
    color: 'green',
    tag: 'Expansion',
  },
  {
    step: '04',
    year: '2024',
    title: '7-Day IDE Bootcamp — IIM Sambalpur',
    desc: 'Selected for the intensive residential Innovation, Design & Entrepreneurship (IDE) Bootcamp Edition 2 Phase 1 at IIM Sambalpur organized by MoE Innovation Cell & AICTE.',
    side: 'right',
    color: 'orange',
    tag: 'IIM Sambalpur',
  },
  {
    step: '05',
    year: '2025',
    title: 'B.Tech CSE at GCE Kalahandi',
    desc: 'Joined Government College of Engineering, Kalahandi (GCEK) in Computer Science & Engineering through Lateral Entry.',
    side: 'left',
    color: 'red',
    tag: 'Lateral Entry',
  },
  {
    step: '06',
    year: '2025',
    title: 'React & Modern Stack',
    desc: 'Transitioned to modern frameworks — React, Next.js, Tailwind. Built GCEK Vendor, a community rental platform.',
    side: 'right',
    color: 'purple',
    tag: 'Modern UI',
  },
  {
    step: '07',
    year: '2025',
    title: 'Full-Stack & Beyond',
    desc: 'Building complete systems — from hand gesture controllers to DNS switchers. Scaling system architecture.',
    side: 'left',
    color: 'red',
    tag: 'Scale & Systems',
  },
  {
    step: '08',
    year: '2026',
    title: 'AI & Machine Learning',
    desc: 'Explored AI/ML with Python, Flask, and Streamlit. Created Movie & Medicine Recommender Systems using real ML models.',
    side: 'right',
    color: 'orange',
    tag: 'AI & Data',
  },
  {
    step: '09',
    year: '2026',
    title: 'The Road Ahead',
    desc: 'Focusing on AI-driven systems, secure architectures, and impactful products. The best is yet to come.',
    side: 'left',
    color: 'blue',
    tag: 'Future Horizon',
  },
]

function MilestoneCard({ m, active, isCurrent, touchRef, onClick }) {
  return (
    <motion.div
      className={`${styles.milestone} ${styles[m.side]} ${active ? styles.milestoneActive : ''}`}
      initial={{ opacity: 0, x: m.side === 'left' ? -35 : 35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
      onClick={onClick}
    >
      {/* Connector Touch Point */}
      <div className={styles.touchPoint} ref={touchRef}>
        <div
          className={`${styles.touchRect} ${active ? styles.touchRectActive : ''} ${isCurrent ? styles.touchRectCurrent : ''}`}
          style={{
            background: active ? `var(--${m.color})` : 'var(--bg-secondary)',
            borderColor: active ? 'var(--text-primary)' : 'var(--border-light)',
            boxShadow: active
              ? `0 0 0 5px var(--${m.color}-pale), 0 3px 10px rgba(0,0,0,0.15)`
              : 'none',
          }}
        >
          {isCurrent && <span className={styles.currentPing} style={{ backgroundColor: `var(--${m.color})` }} />}
          <span className={styles.touchInnerDot} style={{ background: active ? '#FFFFFF' : 'var(--border)' }} />
        </div>
      </div>

      {/* Card Content */}
      <div
        className={`${styles.card} ${active ? styles.cardActive : ''} ${isCurrent ? styles.cardCurrent : ''}`}
        style={{
          borderColor: active ? `var(--${m.color})` : 'var(--border)',
          boxShadow: isCurrent
            ? `0 12px 32px rgba(0,0,0,0.09), 0 0 0 2px var(--${m.color})`
            : active
              ? 'var(--shadow-md)'
              : 'none',
        }}
      >
        <div className={styles.cardHeader}>
          <span className={styles.year}>{m.year}</span>
          <span className={`${styles.statusBadge} ${styles[`badge_${m.color}`]}`}>
            {isCurrent ? '✦ ACTIVE CHAPTER' : active ? '✓ PASSED' : `STAGE ${m.step}`}
          </span>
        </div>
        <h3 className={styles.cardTitle}>{m.title}</h3>
        <p className={styles.cardDesc}>{m.desc}</p>
        <div className={styles.cardFooter}>
          <span className={styles.stageTag}>◈ {m.tag}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  const touchRefs = useRef([])

  const [svgSize, setSvgSize] = useState({ width: 1000, height: 1600 })
  const [curlyPathD, setCurlyPathD] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [arrowState, setArrowState] = useState({ x: 0, y: 0, angle: 90, visible: false })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 25%'],
  })

  // Calculate mathematically smooth C1-continuous cubic Bézier S-curves connecting all milestones
  const updateCurve = useCallback(() => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    if (width === 0 || height === 0) return
    setSvgSize({ width, height })

    // Gather coordinates of each touch point relative to timelineContainer
    const points = touchRefs.current
      .map((el, idx) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
          side: milestones[idx].side,
          step: idx,
        }
      })
      .filter(Boolean)

    if (points.length < 2) {
      setCurlyPathD(`M ${width / 2} 0 L ${width / 2} ${height}`)
      return
    }

    const isMobile = width < 768
    const startX = points[0].x
    const startY = Math.max(0, points[0].y - 80)

    let d = `M ${startX} ${startY}`

    // 1. Lead-in curve to first milestone
    const midY0 = (startY + points[0].y) / 2
    d += ` C ${startX} ${midY0}, ${points[0].x} ${midY0}, ${points[0].x} ${points[0].y}`

    // 2. Fluid, professional harmonic S-curves connecting milestones
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i]
      const p2 = points[i + 1]
      const dy = p2.y - p1.y

      if (isMobile) {
        // Subtle, elegant vertical breathing curve along mobile spine
        const waveX = (i % 2 === 0 ? 8 : -8)
        const cp1x = p1.x + waveX
        const cp1y = p1.y + dy * 0.35
        const cp2x = p2.x - waveX
        const cp2y = p2.y - dy * 0.35
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
      } else {
        // Desktop: Harmonic wave weaving gracefully through the central timeline
        // Curves arc gently outwards towards the milestone's card side and ease back into the node
        const curveSign = p1.side === 'left' ? -1 : 1
        const waveAmp = Math.min(width * 0.085, 75) // Adaptive proportional wave amplitude

        // Control point 1 exits p1 with outward curve tension
        const cp1x = p1.x + curveSign * waveAmp
        const cp1y = p1.y + dy * 0.38

        // Control point 2 enters p2 smoothly in alignment with incoming tangent
        const cp2x = p2.x - curveSign * waveAmp
        const cp2y = p2.y - dy * 0.38

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
      }
    }

    // 3. Lead-out tail at the bottom
    const lastP = points[points.length - 1]
    const tailY = Math.min(height, lastP.y + 90)
    const midTailY = (lastP.y + tailY) / 2
    d += ` C ${lastP.x} ${midTailY}, ${lastP.x} ${midTailY}, ${lastP.x} ${tailY}`

    setCurlyPathD(d)
  }, [])

  // Recompute curve on resize and initial render
  useEffect(() => {
    updateCurve()
    const timer = setTimeout(updateCurve, 150)
    const resizeObserver = new ResizeObserver(() => {
      updateCurve()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    window.addEventListener('resize', updateCurve)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateCurve)
    }
  }, [updateCurve])

  // Track arrow position and tangent angle dynamically as user scrolls
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!pathRef.current) return

    const totalLen = pathRef.current.getTotalLength()
    if (!totalLen || totalLen === 0) return

    const curLen = Math.max(0.1, Math.min(totalLen, v * totalLen))
    const pt = pathRef.current.getPointAtLength(curLen)

    // Calculate tangent angle for directional arrow orientation
    const delta = 3
    const ptNext = pathRef.current.getPointAtLength(Math.min(curLen + delta, totalLen))
    const angleRad = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x)
    const angleDeg = angleRad * (180 / Math.PI)

    setArrowState({
      x: pt.x,
      y: pt.y,
      angle: angleDeg,
      visible: v > 0.01 && v < 0.99,
    })

    // Compute active step count based on arrow's vertical progress vs touch points
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      let reached = 0
      let curIdx = 0

      touchRefs.current.forEach((el, idx) => {
        if (el) {
          const r = el.getBoundingClientRect()
          const nodeY = r.top - containerRect.top + r.height / 2
          if (pt.y >= nodeY - 20) {
            reached = idx + 1
            curIdx = idx
          }
        }
      })
      setActiveStep(reached)
      setCurrentStepIdx(curIdx)
    }
  })

  // Scroll to milestone when clicked
  const handleMilestoneClick = (index) => {
    const el = touchRefs.current[index]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section id="journey" className={styles.journey} ref={sectionRef}>
      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.08 }}
      >
        <div className={styles.headerRow}>
          <div>
            <motion.span className="section-tag" variants={fadeIn('down', 0)}>
              ✦ Journey &amp; Roadmap
            </motion.span>
            <motion.h2 className={styles.heading} variants={fadeIn('up', 0)}>
              My <span className={styles.accent}>Path.</span>
            </motion.h2>
          </div>

          {/* Current Step Tracker Display */}
          {/* <motion.div className={styles.stepTracker} variants={fadeIn('left', 0.2)}>
            <div className={styles.trackerBadge}>
              <span className={styles.trackerDot} />
              <span className={styles.trackerLabel}>ACTIVE CHAPTER</span>
            </div>
            <div className={styles.trackerInfo}>
              <span className={styles.trackerStep}>
                STEP 0{currentStepIdx + 1} / 0{milestones.length}
              </span>
              <span className={styles.trackerYear}>{milestones[currentStepIdx]?.year}</span>
            </div>
            <span className={styles.trackerTitle}>{milestones[currentStepIdx]?.title}</span>
          </motion.div> */}
        </div>

        <motion.p className={styles.sub} variants={fadeIn('up', 0.1)}>
          Scroll to trace the journey — follow the navigational energy beam as it flows through milestones from my
          first lines of code to building production AI systems.
        </motion.p>

        {/* Timeline Container with Layered Roadbed & Glowing Beam */}
        <div className={styles.timelineContainer} ref={containerRef}>
          {/* Background Floating Geometric Shapes */}
          <motion.div
            className={`${styles.shape} ${styles.shape1}`}
            animate={{ y: [0, -35, 0], rotate: [0, 30, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className={`${styles.shape} ${styles.shape2}`}
            animate={{ y: [0, 25, 0], rotate: [15, -15, 15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className={`${styles.shape} ${styles.shape3}`}
            animate={{ y: [0, -20, 0], rotate: [-10, 20, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* SVG Roadbed & Connector Layer */}
          <svg
            className={styles.curlySvg}
            width={svgSize.width}
            height={svgSize.height}
            viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
            fill="none"
          >
            <defs>
              {/* Vibrant Multi-stop Linear Gradient */}
              <linearGradient id="journeyBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="22%" stopColor="#FF6B00" />
                <stop offset="45%" stopColor="#10B981" />
                <stop offset="68%" stopColor="#8B5CF6" />
                <stop offset="88%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#FF6B00" />
              </linearGradient>

              {/* Roadbed Ambient Glow Filter */}
              <filter id="roadAuraGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Beacon Shadow */}
              <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#FF6B00" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Layer 1: Ambient Road Glow Aura */}
            {curlyPathD && (
              <path
                d={curlyPathD}
                className={styles.pathGlow}
              />
            )}

            {/* Layer 2: Roadbed Base Conduit Track */}
            {curlyPathD && (
              <path
                d={curlyPathD}
                className={styles.pathRoadbed}
              />
            )}

            {/* Layer 3: Dashed Highway Centerline Track */}
            {curlyPathD && (
              <path
                d={curlyPathD}
                className={styles.pathDashes}
              />
            )}

            {/* Layer 4: Active Scroll Flow Beam */}
            {curlyPathD && (
              <motion.path
                ref={pathRef}
                d={curlyPathD}
                className={styles.pathActive}
                style={{
                  pathLength: scrollYProgress,
                }}
              />
            )}

            {/* Layer 5: Traveling Navigation Beacon */}
            {arrowState.visible && (
              <g
                className={styles.travelingBeaconGroup}
                transform={`translate(${arrowState.x}, ${arrowState.y}) rotate(${arrowState.angle})`}
                filter="url(#beaconGlow)"
              >
                {/* Outer Energy Halo */}
                <circle r="16" className={styles.beaconPulseRing} />

                {/* Inner Core Disc */}
                <circle r="9" className={styles.beaconCenterDisc} />

                {/* Directional Chevron Pointer */}
                <path
                  d="M -3 -4.5 L 4 0 L -3 4.5"
                  className={styles.beaconChevron}
                />
              </g>
            )}
          </svg>

          {/* Floating dynamic year tag following the beacon */}
          {arrowState.visible && (
            <div
              className={styles.floatingArrowTag}
              style={{
                left: `${arrowState.x}px`,
                top: `${arrowState.y - 38}px`,
              }}
            >
              <span>{milestones[currentStepIdx]?.year}</span>
              <span className={styles.arrowTagArrow}>●</span>
            </div>
          )}

          {/* Milestones List */}
          <div className={styles.milestones}>
            {milestones.map((m, i) => (
              <MilestoneCard
                key={m.step || `milestone-${i}`}
                m={m}
                active={i < activeStep}
                isCurrent={i === currentStepIdx && activeStep > 0}
                touchRef={(el) => (touchRefs.current[i] = el)}
                onClick={() => handleMilestoneClick(i)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
