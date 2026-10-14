'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Briefcase, Bot, Sparkles, ArrowRight } from 'lucide-react'
import styles from './TopModeSwitcher.module.css'

export default function TopModeSwitcher({ forceMode, sticky = false }) {
  const pathname = usePathname()

  // Resolve mode: 'personal' | 'business' | 'ai'
  const currentMode =
    forceMode ||
    (pathname.startsWith('/services')
      ? 'business'
      : pathname.startsWith('/ai')
        ? 'ai'
        : 'personal')

  return (
    <div
      className={`${styles.wrapper} ${sticky ? styles.stickyWrapper : ''}`}
      role="region"
      aria-label="Portfolio, Business, and AI Mode Switcher"
    >
      <div className={styles.container}>
        {/* Left Notice / Status Banner */}
        <div className={styles.leftMeta}>
          <span className={styles.sparkleBadge}>
            <Sparkles size={13} className={styles.sparkleIcon} />
            <span>
              {currentMode === 'ai'
                ? 'Prakash AI Studio'
                : currentMode === 'business'
                  ? 'Business & Client Services'
                  : 'Need Client Services or AI?'}
            </span>
          </span>
        </div>

        {/* Center / Right Mode Switcher Segmented Control (3 Modes) */}
        <div className={styles.switchControl}>
          <span className={styles.switchLabel}>Mode:</span>
          <div className={styles.pillGroup}>
            {/* 1. Personal Mode Link */}
            <Link
              href="/"
              className={`${styles.modeBtn} ${currentMode === 'personal' ? styles.activeMode : ''}`}
              aria-current={currentMode === 'personal' ? 'page' : undefined}
            >
              {currentMode === 'personal' && (
                <motion.div
                  layoutId="activeModeIndicator"
                  className={styles.activeBackground}
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className={styles.btnContent}>
                <User size={13} className={styles.btnIcon} />
                <span className={styles.btnText}>Personal</span>
              </span>
            </Link>

            {/* 2. Business Mode Link */}
            <Link
              href="/services"
              className={`${styles.modeBtn} ${currentMode === 'business' ? styles.activeMode : ''}`}
              aria-current={currentMode === 'business' ? 'page' : undefined}
            >
              {currentMode === 'business' && (
                <motion.div
                  layoutId="activeModeIndicator"
                  className={styles.activeBackground}
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className={styles.btnContent}>
                <Briefcase size={13} className={styles.btnIcon} />
                <span className={styles.btnText}>Business</span>
                <span className={styles.newBadge}>Pricing</span>
              </span>
            </Link>

            {/* 3. AI Assistant Mode Link */}
            <Link
              href="/ai"
              className={`${styles.modeBtn} ${currentMode === 'ai' ? styles.activeMode : ''}`}
              aria-current={currentMode === 'ai' ? 'page' : undefined}
            >
              {currentMode === 'ai' && (
                <motion.div
                  layoutId="activeModeIndicator"
                  className={styles.activeBackground}
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className={styles.btnContent}>
                <Bot size={13} className={styles.btnIcon} />
                <span className={styles.btnText}>AI Assistant</span>
                <span className={styles.aiBadge}>120B</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Quick CTA */}
        <div className={styles.rightAction}>
          {currentMode === 'ai' ? (
            <Link href="/services" className={styles.quickLink}>
              <span>Explore Services &amp; Pricing</span>
              <ArrowRight size={13} />
            </Link>
          ) : currentMode === 'business' ? (
            <Link href="/ai" className={styles.quickLink}>
              <span>Chat with Prakash AI</span>
              <ArrowRight size={13} />
            </Link>
          ) : (
            <Link href="/ai" className={styles.quickLink}>
              <span>Launch AI Assistant</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
