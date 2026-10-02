'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import styles from './CharacterVideoScroll.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CharacterVideoScroll() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const leftPanelRef = useRef(null)
  const rightPanelRef = useRef(null)
  const centerTextRef = useRef(null)
  const scrollHintRef = useRef(null)
  const progressBarRef = useRef(null)

  const [scrubProgress, setScrubProgress] = useState(0)
  const [currentFps, setCurrentFps] = useState(60)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // ── 1. Lenis Smooth Scroll Engine (Synced with GSAP Ticker) ──
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    let gsapCtx

    const initScrollTrigger = () => {
      const duration = video.duration || 9.95

      gsapCtx = gsap.context(() => {
        // Master Timeline: Locks the screen in place until all video frames finish
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=300%', // Locks the screen for 3x viewport height while scrubbing
            pin: true,
            pinSpacing: true,
            scrub: 0.8, // Snappy yet silky eased scrub catch-up
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress
              setScrubProgress(Math.round(p * 100))

              if (video && isFinite(video.duration) && video.duration > 0) {
                video.currentTime = Math.min(p * video.duration, video.duration - 0.02)
              }

              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${p * 100}%`
              }
            },
          },
        })

        // Animate video from frame 0 → 100%
        tl.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: duration, ease: 'none' },
          0
        )

        // Center "BEYOND CODE" text parallax fade out during the first 30%
        tl.fromTo(
          centerTextRef.current,
          { opacity: 1, scale: 1, y: 0 },
          { opacity: 0, scale: 1.15, y: -60, ease: 'power2.inOut', duration: 0.28 },
          0
        )

        // Left Glass Panel: Active throughout middle phase then floats away gracefully
        tl.fromTo(
          leftPanelRef.current,
          { opacity: 0.9, x: 0, y: 0 },
          { opacity: 1, x: 0, y: -15, ease: 'none', duration: 0.5 },
          0
        ).to(
          leftPanelRef.current,
          { opacity: 0.2, x: -40, ease: 'power2.in', duration: 0.35 },
          0.65
        )

        // Right Glass Panel: Active throughout middle phase then floats away gracefully
        tl.fromTo(
          rightPanelRef.current,
          { opacity: 0.9, x: 0, y: 0 },
          { opacity: 1, x: 0, y: -15, ease: 'none', duration: 0.5 },
          0
        ).to(
          rightPanelRef.current,
          { opacity: 0.2, x: 40, ease: 'power2.in', duration: 0.35 },
          0.65
        )
      }, container)
    }

    if (video.readyState >= 1) {
      initScrollTrigger()
    } else {
      const handleLoaded = () => {
        initScrollTrigger()
        video.removeEventListener('loadedmetadata', handleLoaded)
      }
      video.addEventListener('loadedmetadata', handleLoaded)
    }

    return () => {
      if (gsapCtx) gsapCtx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.videoScrubber} id="character-experience">
      {/* ── 100vh Full Background Covered Video (All-Intra Fast Seek) ── */}
      <video
        ref={videoRef}
        src="/about/character_scrub.mp4"
        muted
        playsInline
        preload="auto"
        className={styles.videoBg}
        aria-label="Interactive frame-by-frame 3D character scroll video background"
      />

      {/* ── Cinematic Dark Vignette & Ambient Gradient Overlays ── */}
      <div className={styles.ambientVignette} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />

      {/* ── Top HUD Telemetry Bar ── */}
      <div className={styles.topHud}>
        <div className={styles.hudBadge}>
          <span className={styles.hudPulse} />
          <span>CHARACTER OS // FRAME SCRUB ENGINE</span>
        </div>
        <div className={styles.hudMeta}>
          <span>UNIT: OM PRAKASH BEHERA</span>
          <span className={styles.hudDot}>•</span>
          <span>TECH HEAD @ CODEBREAKERS</span>
          <span className={styles.hudDot}>•</span>
          <span>FRAME: {String(Math.min(Math.round((scrubProgress / 100) * 239), 239)).padStart(3, '0')} / 239</span>
        </div>
      </div>

      {/* ── Left Frosted Glass Panel (Reference Style) ── */}
      <div ref={leftPanelRef} className={`${styles.glassPanel} ${styles.panelLeft}`}>
        <div className={styles.panelHead}>
          <span className={styles.panelTag}>001</span>
          <span className={styles.panelBadge}>IDENTITY</span>
        </div>
        <h3 className={styles.panelTitle}>
          System<br />Architect
        </h3>
        <p className={styles.panelBody}>
          Tech Head at <strong>CodeBreakers GCEK</strong>. Building{' '}
          <a
            href="https://hackverse.codebreakersgcek.tech"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.accentLink}
          >
            HackVerse &apos;26
          </a>
          . Engineering AI-driven systems and resilient full-stack platforms.
        </p>
        <div className={styles.panelDivider} />
        <span className={styles.panelMeta}>Scroll · Scrub · Explore Matrix</span>
      </div>

      {/* ── Right Frosted Glass Panel (Reference Style) ── */}
      <div ref={rightPanelRef} className={`${styles.glassPanel} ${styles.panelRight}`}>
        <div className={styles.panelHead}>
          <span className={styles.panelTag}>002</span>
          <span className={styles.panelBadge}>COMBAT SPEC</span>
        </div>
        <h3 className={styles.panelTitle}>
          Motion &amp;<br />AI Matrix
        </h3>
        <p className={styles.panelBody}>
          Smooth frame interpolation between 239 keyframes synced to scroll momentum.
        </p>
        <div className={styles.panelDivider} />
        <div className={styles.panelStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>60</span>
            <span className={styles.statLabel}>FPS</span>
          </div>
          <div className={styles.statDividerVertical} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>1s</span>
            <span className={styles.statLabel}>Scrub</span>
          </div>
          <div className={styles.statDividerVertical} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>30+</span>
            <span className={styles.statLabel}>Builds</span>
          </div>
        </div>
      </div>

      {/* ── Cinematic Center Dive Headline ── */}
      <div ref={centerTextRef} className={styles.diveText}>
        <span className={styles.diveWord}>BEYOND</span>
        <span className={styles.diveDot} />
        <span className={styles.diveWord}>CODE</span>
      </div>

      {/* ── Bottom Scroll Telemetry & Progress Track ── */}
      <div ref={scrollHintRef} className={styles.bottomOverlay}>
        <div className={styles.telemetryBar}>
          <div className={styles.telemetryItem}>
            <span className={styles.telemetryLabel}>SCROLL PROGRESSION</span>
            <span className={styles.telemetryVal}>{scrubProgress}%</span>
          </div>
          <div className={styles.scrollHint}>
            <span>SCROLL TO EXPLORE 3D CHARACTER</span>
            <svg
              className={styles.scrollArrow}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className={styles.scrubberTrack}>
          <div ref={progressBarRef} className={styles.scrubberFill} />
        </div>
      </div>
    </div>
  )
}
