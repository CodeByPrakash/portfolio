'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import styles from './ScrollConnectingPath.module.css'

export default function ScrollConnectingPath() {
  const containerRef = useRef(null)
  const [docHeight, setDocHeight] = useState(6000)

  // Track global page scroll progress
  const { scrollYProgress } = useScroll()

  // Ultra-smooth spring physics for fluid line drawing on scroll
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  })

  // Measure and update exact page height on load and resize
  useEffect(() => {
    const updateDimensions = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        6000
      )
      setDocHeight(height)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    const timer = setTimeout(updateDimensions, 1000)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearTimeout(timer)
    }
  }, [])

  // Generate a mathematically smooth, radiused serpentine S-curve across the entire page height
  const generateSpinePath = (h) => {
    const w = 1200 // virtual coordinate width
    // Waypoints distributed across all sections (Hero -> About -> Skills -> Projects -> Journey -> Achievements -> Blog -> Contact)
    const points = [
      { x: w * 0.82, y: 80 },          // Hero origin
      { x: w * 0.18, y: 460 },         // Hero headline loop
      { x: w * 0.88, y: h * 0.14 },    // About section entrance
      { x: w * 0.12, y: h * 0.28 },    // Skills section
      { x: w * 0.86, y: h * 0.42 },    // Projects / Incubations
      { x: w * 0.14, y: h * 0.56 },    // Journey milestones
      { x: w * 0.84, y: h * 0.70 },    // Achievements & Credentials
      { x: w * 0.16, y: h * 0.84 },    // Technical Blog / Articles
      { x: w * 0.50, y: h * 0.96 },    // Contact / Let's work together
    ]

    let d = `M ${points[0].x},${points[0].y}`

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const dy = p1.y - p0.y
      // Smooth cubic bezier control points with harmonious vertical curvature
      const cp1x = p0.x
      const cp1y = p0.y + dy * 0.5
      const cp2x = p1.x
      const cp2y = p1.y - dy * 0.5

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`
    }

    return d
  }

  const spinePathD = generateSpinePath(docHeight)

  return (
    <div ref={containerRef} className={styles.spineContainer} aria-hidden="true">
      <svg
        className={styles.spineSvg}
        viewBox={`0 0 1200 ${docHeight}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="globalSpineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="25%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="75%" stopColor="#2DB77B" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>

          <filter id="spineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glowing Track behind the dots */}
        <motion.path
          d={spinePathD}
          stroke="url(#globalSpineGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="0 22"
          filter="url(#spineGlow)"
          opacity="0.28"
          style={{ pathLength }}
        />

        {/* Crisp Radiused Dotted Connecting Spine */}
        <motion.path
          d={spinePathD}
          stroke="url(#globalSpineGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="0 22"
          animate={{ strokeDashoffset: [0, -44] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          style={{ pathLength }}
        />
      </svg>
    </div>
  )
}
