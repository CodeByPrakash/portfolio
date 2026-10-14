'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MessageSquare,
  Globe,
  Briefcase,
  Bot,
  Palette,
  Cpu,
  TrendingUp,
  Sparkles,
  Terminal,
  Code2,
} from 'lucide-react'
import styles from './ServicesHero.module.css'

const HERO_PILLS = [
  { icon: Globe, label: 'Web Development', target: '#packages' },
  { icon: Briefcase, label: 'Business Websites', target: '#business-websites' },
  { icon: Bot, label: 'AI & Machine Learning', target: '#ai-ml' },
  { icon: Palette, label: 'Digital Design', target: '#digital-design' },
  { icon: Cpu, label: 'Technical Consulting', target: '#contact' },
]

export default function ServicesHero({ onExploreClick, onDiscussClick }) {
  const scrollTo = (targetId) => {
    const el = document.getElementById(targetId.replace('#', ''))
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.1 })
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className={styles.hero} id="hero">
      {/* Background Subtle Dotted Grid Texture */}
      <div className={styles.dotGridOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Left Column: Copy & CTAs */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>INDEPENDENT DEVELOPER · DIGITAL SOLUTIONS · AI ENGINEERING</span>
            </div>

            {/* Headline */}
            <h1 className={styles.headline}>
              From business ideas to{' '}
              <span className={styles.highlightText}>digital products</span> that
              work.
            </h1>

            {/* Description */}
            <p className={styles.description}>
              I build modern websites, business platforms, and AI-powered solutions
              that help businesses establish their online presence, streamline
              workflows, and solve real-world problems.
            </p>

            {/* Buttons */}
            <div className={styles.buttonGroup}>
              <button
                onClick={onExploreClick || (() => scrollTo('#business-websites'))}
                className={styles.primaryBtn}
              >
                <span>Explore Services</span>
                <ArrowRight size={16} className={styles.btnIcon} />
              </button>

              <button
                onClick={onDiscussClick || (() => scrollTo('#contact'))}
                className={styles.secondaryBtn}
              >
                <MessageSquare size={16} className={styles.btnIcon} />
                <span>Discuss Your Project</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Layered Browser & Mockup Composition */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.compositionStage}>
              {/* Layer 1: Dark Code Editor (Top/Back) */}
              <div className={styles.codeEditorCard}>
                <div className={styles.windowHeader}>
                  <div className={styles.windowDots}>
                    <span className={`${styles.dot} ${styles.dotRed}`} />
                    <span className={`${styles.dot} ${styles.dotYellow}`} />
                    <span className={`${styles.dot} ${styles.dotGreen}`} />
                  </div>
                  <span className={styles.windowTitle}>services.config.ts</span>
                  <div className={styles.editorTag}>TS / Next.js</div>
                </div>
                <div className={styles.codeBody}>
                  <div className={styles.codeLine}>
                    <span className={styles.codeKeyword}>const</span>{' '}
                    <span className={styles.codeVar}>app</span> ={' '}
                    <span className={styles.codeFunc}>createSolution</span>({'{'}
                  </div>
                  <div className={styles.codeLineIndent}>
                    <span className={styles.codeProp}>business</span>:{' '}
                    <span className={styles.codeString}>&apos;Client Venture&apos;</span>,
                  </div>
                  <div className={styles.codeLineIndent}>
                    <span className={styles.codeProp}>architecture</span>:{' '}
                    <span className={styles.codeString}>&apos;Next.js + AI Models&apos;</span>,
                  </div>
                  <div className={styles.codeLineIndent}>
                    <span className={styles.codeProp}>status</span>:{' '}
                    <span className={styles.codeSuccess}>&apos;Ready for Scale&apos;</span>
                  </div>
                  <div className={styles.codeLine}>{'}'})</div>
                </div>
              </div>

              {/* Layer 2: Modern Digital Solutions Preview Card (Center) */}
              <div className={styles.previewWebsiteCard}>
                <div className={styles.previewHeader}>
                  <div className={styles.previewUrlPill}>
                    <Globe size={11} className={styles.urlIcon} />
                    <span>modern-digital-solutions.com</span>
                  </div>
                  <span className={styles.liveBadge}>LIVE</span>
                </div>
                <div className={styles.previewImageWrap}>
                  <Image
                    src="/services/hero-building.jpg"
                    alt="Modern architecture commercial building"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className={styles.buildingPhoto}
                    priority
                  />
                  <div className={styles.previewOverlayContent}>
                    <h3 className={styles.previewCardTitle}>Modern Digital Solutions</h3>
                    <p className={styles.previewCardSub}>
                      Engineered for performance and revenue growth.
                    </p>
                    <span className={styles.previewMiniCta}>
                      Get Started <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Layer 3: Floating Growth Metric Badge (Bottom Right) */}
              <motion.div
                className={styles.growthBadge}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className={styles.growthHeader}>
                  <span className={styles.growthLabel}>Business Growth</span>
                  <TrendingUp size={14} className={styles.trendIcon} />
                </div>
                <div className={styles.growthVal}>+62%</div>
                <div className={styles.miniBarChart}>
                  <span className={styles.bar} style={{ height: '35%' }} />
                  <span className={styles.bar} style={{ height: '55%' }} />
                  <span className={styles.bar} style={{ height: '45%' }} />
                  <span className={styles.bar} style={{ height: '75%' }} />
                  <span className={`${styles.bar} ${styles.activeBar}`} style={{ height: '100%' }} />
                </div>
              </motion.div>

              {/* Layer 4: Floating Micro Badge (Top Right) */}
              <motion.div
                className={styles.floatingMicroBadge}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Sparkles size={13} className={styles.badgeSparkle} />
                <span>Fast 3–7 Day Delivery</span>
              </motion.div>

              {/* Hand-drawn Process Curve & Annotation */}
              <div className={styles.processAnnotation} aria-hidden="true">
                <svg
                  className={styles.curveSvg}
                  viewBox="0 0 160 50"
                  fill="none"
                  stroke="#FF6A00"
                  strokeWidth="1.6"
                  strokeDasharray="4 3"
                >
                  <path d="M 10 40 Q 80 5 150 25" />
                  <polygon points="152,25 142,20 144,30" fill="#FF6A00" />
                </svg>
                <span className={styles.annotationText}>
                  Ideas · Design · Develop · Launch
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Below Hero: Compact Service Pills */}
        <motion.div
          className={styles.servicesPillsRow}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {HERO_PILLS.map((pill) => {
            const IconComponent = pill.icon
            return (
              <button
                key={pill.label}
                onClick={() => scrollTo(pill.target)}
                className={styles.servicePill}
              >
                <IconComponent size={14} className={styles.pillIcon} />
                <span>{pill.label}</span>
              </button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
