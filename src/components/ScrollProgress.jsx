'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [hasScrolled, setHasScrolled] = useState(false)

  // Spring physics for buttery-smooth progress transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  // Track scroll start to fade in smoothly
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      setHasScrolled(val > 0.003)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const rightHeadTop = useTransform(smoothProgress, (val) => `${Math.min(100, Math.max(0, val * 100))}%`)

  return (
    /* Right Edge Vertical Progress Track (Transparent with dynamic fluid progress) */
    <div className={`${styles.rightTrack} ${hasScrolled ? styles.visible : ''}`} aria-hidden="true">
      <motion.div
        className={styles.rightFill}
        style={{ scaleY: smoothProgress }}
      />
      <motion.div
        className={styles.rightGlowHead}
        style={{ top: rightHeadTop }}
      />
    </div>
  )
}
