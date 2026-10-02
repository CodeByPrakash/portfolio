'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Achievements.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const achievementsList = [
  {
    id: 0,
    number: '01',
    title: 'Tech Head @ CodeBreakers & HackVerse Lead',
    issuer: 'CodeBreakers — Coding Club of Government College of Engineering Kalahandi',
    year: '2026',
    desc: 'Appointed Technical Lead at CodeBreakers (codebreakersgcek.tech). Architecting the digital infrastructure and platform for HackVerse 2026 (hackverse.codebreakersgcek.tech) — Central & Eastern India’s flagship 24H state tech fest & hackathon.',
    color: 'orange',
    tags: ['Tech Head', 'CodeBreakers', 'GCEK', 'HackVerse', 'Platform Lead', 'Coding Club'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 1,
    number: '02',
    title: '1st Prize — YOUTH@2050 Software Expo',
    issuer: 'District Level Science & Tech Innovation',
    year: '2024',
    desc: 'Awarded 1st Prize with 7000 Rs. Prize Pool at the District Level Software Expo for developing MRS-AI — an AI-powered medicine recommender system with symptom prediction.',
    color: 'emerald',
    tags: ['1st Prize', '7000Rs', 'YOUTH@2050', 'Healthcare AI', 'Winner'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    id: 2,
    number: '03',
    title: '7-Day IDE Bootcamp — IIM Sambalpur',
    issuer: 'MoE Innovation Cell (MIC), AICTE & IIM Sambalpur',
    year: '2024',
    desc: 'Completed the intensive 7-day residential Innovation, Design & Entrepreneurship (IDE) Bootcamp Edition 2 Phase 1 at IIM Sambalpur. Mastered design thinking, BMC business modeling, product prototyping, and venture pitch scaling.',
    color: 'teal',
    tags: ['IIM Sambalpur', 'IDE Bootcamp', 'Edition 2 Phase 1', 'Design Thinking', 'Entrepreneurship', 'AICTE & MIC'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    id: 3,
    number: '04',
    title: 'ISRO BAH 2026 — Exoplanet Detection',
    issuer: 'Bharatiya Antariksh Hackathon — Problem Statement PS-07',
    year: '2026',
    desc: 'Participated in ISRO national hackathon solving PS-07: Exoplanet Detection using Machine Learning, classifying deep space planetary transit light curves.',
    color: 'purple',
    tags: ['ISRO', 'BAH 2026', 'PS-07', 'Space ML', 'Deep Learning'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 4,
    number: '05',
    title: 'Smart India Hackathon (SIH) 2025',
    issuer: 'Ministry of Education & AICTE — Team CodeNova',
    year: '2025',
    desc: 'Participated in India’s premier national hackathon as part of Team CodeNova, engineering AttendTrue Analytics — an AI-powered smart attendance and institutional analytics system.',
    color: 'blue',
    tags: ['SIH 2025', 'Team CodeNova', 'AttendTrue', 'AI Analytics', 'Govt of India'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 5,
    number: '06',
    title: 'B.Tech CSE — Lateral Entry',
    issuer: 'Government College of Engineering, Kalahandi',
    year: '2025 - Present',
    desc: 'Secured admission into B.Tech Computer Science & Engineering at GCEK through state-level Lateral Entry based on academic excellence.',
    color: 'rose',
    tags: ['Academics', 'B.Tech', 'GCEK', 'CSE'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 6,
    number: '07',
    title: 'Diploma in CSE — Distinction',
    issuer: 'State Council for Technical Education',
    year: '2022 - 2025',
    desc: 'Graduated with First Class Honours with Distinction in Computer Science & Engineering, mastering algorithms and core system architecture.',
    color: 'mint',
    tags: ['Diploma', 'Honours', 'Distinction', 'CSE Core'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 7,
    number: '08',
    title: '30+ Open-Source Projects Built',
    issuer: 'GitHub Creator & Open Source Community',
    year: '2023 - 2026',
    desc: 'Engineered and published 30+ public repositories across AI/ML, computer vision, web applications, and system utilities.',
    color: 'indigo',
    tags: ['Open Source', '100+ Repos', 'GitHub', 'Builder'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

const cardThemeMap = {
  orange: { accent: '#FF7700', rgb: '255, 119, 0' },
  emerald: { accent: '#10B981', rgb: '16, 185, 129' },
  teal: { accent: '#06B6D4', rgb: '6, 182, 212' },
  purple: { accent: '#A855F7', rgb: '168, 85, 247' },
  blue: { accent: '#3B82F6', rgb: '59, 130, 246' },
  rose: { accent: '#F43F5E', rgb: '244, 63, 94' },
  mint: { accent: '#0D9488', rgb: '13, 148, 136' },
  indigo: { accent: '#6366F1', rgb: '99, 102, 241' },
}

export default function Achievements() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const progressFillRef = useRef(null)
  const counterNumRef = useRef(null)
  const lastActiveIdxRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let gsapCtx

    gsapCtx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)

      // Total horizontal distance to travel
      const totalScrollDistance = () => track.scrollWidth - window.innerWidth + 200

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(totalScrollDistance() + 1400, 2800)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            const idx = Math.min(Math.floor(p * achievementsList.length), achievementsList.length - 1)

            // Zero React re-renders: update DOM directly only when index changes
            if (lastActiveIdxRef.current !== idx) {
              lastActiveIdxRef.current = idx
              if (counterNumRef.current) {
                counterNumRef.current.textContent = String(idx + 1).padStart(2, '0')
              }
            }
          },
        },
      })

      // GPU-accelerated Progress Bar Fill
      if (progressFillRef.current) {
        tl.fromTo(
          progressFillRef.current,
          { scaleX: 0.04 },
          { scaleX: 1, ease: 'none', duration: 3.0 },
          0
        )
      }

      // Phase 1 (Sketch Step 1): All cards swoop in from bottom-right on a curved arc with staggered flow
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          {
            x: 520,
            y: 340,
            rotation: 18,
            scale: 0.75,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.85,
            stagger: 0.12,
          },
          0
        )
      }

      // Phase 2 (Sketch Step 2 - "move"): Horizontal track translation from right to left
      tl.to(
        track,
        {
          x: () => -(track.scrollWidth - window.innerWidth + 140),
          ease: 'none',
          duration: 2.4,
        },
        0.55
      )
    }, section)

    return () => {
      if (gsapCtx) gsapCtx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="achievements" className={styles.horizontalSection} aria-label="Achievements">
      {/* Background Ambience Grid */}
      <div className={styles.ambientGrid} />

      {/* Top Header Row */}
      <div className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.sectionBadge}>
            <span className={styles.pulseDot} />
            <span>HONORS & MILESTONES</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Achievements & <span className={styles.accentText}>Credentials.</span>
          </h2>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.counterBox}>
            <span ref={counterNumRef} className={styles.activeNum}>
              01
            </span>
            <span className={styles.counterDivider}>/</span>
            <span className={styles.totalNum}>
              {String(achievementsList.length).padStart(2, '0')}
            </span>
          </div>

          <div className={styles.scrollIndicator}>
            <span>SCROLL HORIZONTALLY</span>
            <span className={styles.scrollArrow}>➔</span>
          </div>
        </div>
      </div>

      {/* Horizontal Viewport Window (Showing ~3 Cards with Fogged/Masked Edges) */}
      <div className={styles.viewportWindow}>
        {/* Left and Right Fog / Vignette Gradients */}
        <div className={styles.fogLeft} aria-hidden="true" />
        <div className={styles.fogRight} aria-hidden="true" />

        {/* Horizontal Moving Track */}
        <div ref={trackRef} className={styles.horizontalTrack}>
          {achievementsList.map((item, idx) => {
            const theme = cardThemeMap[item.color] || cardThemeMap.orange

            return (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={styles.cardSlide}
                style={{
                  '--card-accent': theme.accent,
                  '--card-accent-rgb': theme.rgb,
                }}
              >
                <div className={`${styles.card} ${styles[`card_${item.color}`] || ''}`}>
                  {/* Top Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap}>
                      <div className={styles.iconBadge}>{item.icon}</div>
                      <span className={styles.cardIndex}>{item.number}</span>
                    </div>

                    <div className={styles.yearBadge}>{item.year}</div>
                  </div>

                  {/* Title & Issuer */}
                  <div className={styles.titleSection}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.issuerText}>{item.issuer}</span>
                  </div>

                  {/* Description Box */}
                  <div className={styles.descBox}>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>

                  {/* Footer Tags & Verified Badge */}
                  <div className={styles.cardFooter}>
                    <div className={styles.tagList}>
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.verifiedRow}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.progressBarTrack}>
          <div ref={progressFillRef} className={styles.progressBarFill} />
        </div>
      </div>
    </section>
  )
}
