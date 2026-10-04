'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'
import styles from './Hero.module.css'
import PixelBlast from './PixelBlast'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero({ isLoading = false }) {
  const { isDark, toggleTheme } = useTheme()
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const timelineRef = useRef(null)

  // Background Parallax
  const bgParallaxRef = useRef(null)
  const geoLinesRef = useRef(null)

  // Scene 1 Elements
  const scene1ContainerRef = useRef(null)
  const scene1ImgRef = useRef(null)
  const scene1OverlayRef = useRef(null)
  const scene1IntroCardRef = useRef(null)
  const scene1ProfileCardRef = useRef(null)

  // Scene 2 Elements
  const scene2ContainerRef = useRef(null)
  const scene2ImgRef = useRef(null)
  const scene2OverlayRef = useRef(null)
  const scene2CardRef = useRef(null)

  const [activeScene, setActiveScene] = useState(1)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const pinContainer = pinContainerRef.current
    if (!section || !pinContainer) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024

      if (!isMobile) {
        // Desktop Pinned Parallax Scroll Animation Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pinContainer,
            start: 'top top',
            end: '+=260%',
            scrub: 1.15,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (self.progress < 0.48) {
                setActiveScene(1)
              } else {
                setActiveScene(2)
              }
            },
          },
        })

        timelineRef.current = tl

        // 1. Background Mystic Mountains & Dots Parallax Glide
        tl.to(
          bgParallaxRef.current,
          {
            y: -110,
            scale: 1.08,
            ease: 'none',
            duration: 3,
          },
          0
        ).to(
          geoLinesRef.current,
          {
            y: -50,
            ease: 'none',
            duration: 3,
          },
          0
        )

        // 2. Initial States for Desktop
        gsap.set(scene1ImgRef.current, { scale: 1, filter: 'blur(0px)', opacity: 1, x: 0 })
        gsap.set(scene1OverlayRef.current, { opacity: 0.08 })
        gsap.set(scene1IntroCardRef.current, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' })
        gsap.set(scene1ProfileCardRef.current, { opacity: 0, y: 35, scale: 0.96, pointerEvents: 'none' })

        gsap.set(scene2ContainerRef.current, { opacity: 0, pointerEvents: 'none' })
        gsap.set(scene2ImgRef.current, { scale: 1.0, filter: 'blur(0px)', opacity: 0, x: 20 })
        gsap.set(scene2OverlayRef.current, { opacity: 0.1 })
        gsap.set(scene2CardRef.current, { x: -80, opacity: 0, scale: 0.95, pointerEvents: 'none' })

        // ─── PHASE 1: Left Shrine Zooms & Blurs; Intro Card Morphs into Profile Card Overlaid on Image
        tl.to(
          scene1ImgRef.current,
          {
            scale: 1.07,
            filter: 'blur(7px)',
            x: 0,
            ease: 'power2.inOut',
            duration: 1.2,
          },
          0
        )
          .to(
            scene1OverlayRef.current,
            {
              opacity: 0.35,
              ease: 'power2.inOut',
              duration: 1.2,
            },
            0
          )
          .to(
            scene1IntroCardRef.current,
            {
              opacity: 0,
              y: -30,
              scale: 0.94,
              pointerEvents: 'none',
              ease: 'power2.inOut',
              duration: 0.6,
            },
            0
          )
          .to(
            scene1ProfileCardRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: 'auto',
              ease: 'power3.out',
              duration: 1.0,
            },
            0.3
          )

        // ─── PHASE 2: Transition from Scene 1 to Scene 2
        tl.to(
          scene1ContainerRef.current,
          {
            opacity: 0,
            y: -40,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 0.8,
          },
          1.4
        )
          .to(
            scene2ContainerRef.current,
            {
              opacity: 1,
              pointerEvents: 'auto',
              ease: 'power2.inOut',
              duration: 0.6,
            },
            1.6
          )
          .fromTo(
            scene2ImgRef.current,
            { opacity: 0, scale: 0.95, filter: 'blur(0px)', x: 20 },
            { opacity: 1, scale: 1.0, filter: 'blur(0px)', x: 0, ease: 'power2.out', duration: 0.8 },
            1.6
          )

        // ─── PHASE 3: Right Samurai Torii Image Zooms Gently with Clean Fitting; Left Card Slides IN
        tl.to(
          scene2ImgRef.current,
            {
              scale: 1.04,
              filter: 'blur(6px)',
              x: 6,
              ease: 'power2.inOut',
              duration: 1.2,
            },
            2.2
          )
          .to(
            scene2OverlayRef.current,
            {
              opacity: 0.45,
              ease: 'power2.inOut',
              duration: 1.2,
            },
            2.2
          )
          .to(
            scene2CardRef.current,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              pointerEvents: 'auto',
              ease: 'power3.out',
              duration: 1.2,
            },
            2.4
          )
      } else {
        // Mobile / Tablet: Fully visible natural layout, zero cutoffs
        gsap.set(
          [
            scene1ContainerRef.current,
            scene2ContainerRef.current,
            scene1ImgRef.current,
            scene2ImgRef.current,
            scene1IntroCardRef.current,
            scene1ProfileCardRef.current,
            scene2CardRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clearProps: 'transform,opacity,filter',
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className={styles.heroSection}
      id="hero"
      ref={sectionRef}
      aria-label="Hero — Om Prakash Behera, Computer Science Engineer"
    >
      {/* Pinned Viewport Container (Normal flow on mobile/tablet) */}
      <div className={styles.pinContainer} ref={pinContainerRef}>
        {/* ─── 1. Parallax Matrix Background: Dim Blurry Mystic Mountains + WebGL + Dots Grid ─── */}
        <div className={styles.bgMatrixLayer} ref={bgParallaxRef} aria-hidden="true">
          <div className={styles.mysticBgWrapper}>
            <Image
              src="/hero/Mystic Mountains Beneath the Ember Moon.png"
              alt="Mystic Mountains Beneath the Ember Moon"
              fill
              priority
              className={styles.mysticBgImage}
              sizes="100vw"
            />
            <div className={styles.mysticBgDimmer} />
          </div>

          <div className={styles.pixelBlastBg}>
            <PixelBlast
              variant="square"
              pixelSize={4}
              color="#FF6B00"
              patternScale={1.8}
              patternDensity={0.65}
              pixelSizeJitter={0}
              enableRipples={true}
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid={false}
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.4}
              edgeFade={0.28}
              transparent
            />
          </div>

          <div className={styles.dotsGridPattern} />
        </div>

        {/* Technical Geometries Lines & Crosshairs */}
        <div className={styles.geoLinesContainer} ref={geoLinesRef} aria-hidden="true">
          <div className={styles.geoLineH1} />
          <div className={styles.geoLineH2} />
          <div className={styles.geoLineV1} />
          <div className={styles.geoLineV2} />

          <span className={`${styles.cornerMark} ${styles.markTL}`}>+</span>
          <span className={`${styles.cornerMark} ${styles.markTR}`}>+</span>
          <span className={`${styles.cornerMark} ${styles.markBL}`}>+</span>
          <span className={`${styles.cornerMark} ${styles.markBR}`}>+</span>
        </div>

        {/* Telemetry Coordinate HUD (Desktop) */}
        <div className={styles.telemetryHUD}>

          <div className={styles.telemetryTopRight}>
            <button
              type="button"
              className={`${styles.themeToggleBtn} ${isDark ? styles.themeDark : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light theme"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode (🦇)`}
            >
              <span className={styles.themeEmoji}>🦇</span>
              <span className={styles.themeLabel}>{isDark ? 'DARK_MODE' : 'LIGHT_MODE'}</span>
            </button>
          </div>
        </div>

        {/* ─── 2. SCENE 1: Left Autumn Shrine + Right Profile Cards ─── */}
        <div className={styles.sceneWrapper} data-scene="1" ref={scene1ContainerRef}>
          {/* Left-Anchored Image Canvas */}
          <div className={styles.scene1ImageStage}>
            <div className={styles.imageInnerRef} ref={scene1ImgRef}>
              <Image
                src="/hero/Autumn Shrine Contemplation Sticker.png"
                alt="Glowing Autumn Shrine Under Blossoms"
                fill
                priority
                className={styles.cinematicImageCover}
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            </div>
            <div className={styles.imageAtmosphereOverlay} ref={scene1OverlayRef} />
            {/* Atmospheric Left Edge Mist / Fog */}
            <div className={styles.scene1LeftFog} aria-hidden="true" />
          </div>

          {/* Right Side Card Stage */}
          <div className={styles.scene1RightStage}>
            {/* 1A. Initial "INTELLIGENT SYSTEMS" Card */}
            <div className={styles.initialIntroCard} ref={scene1IntroCardRef}>
              <div className={styles.cardHeader}>
                <div className={styles.sceneEyebrow}>
                  <span className={styles.eyebrowDash} />
                  <span>EXPLORE THE ARCHITECT</span>
                </div>
                <div className={styles.locationChip}>
                  <span className={styles.locationDot}>•</span>
                  <span>BHAWANIPATNA, IN</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h1 className={styles.sceneMainHeadline}>
                  <span>INTELLIGENT</span>
                  <span className={styles.headlineAccent}>
                    SYSTEMS<span className={styles.accentDot}>.</span>
                  </span>
                </h1>
                <p className={styles.sceneSubcopy}>
                  Building AI-driven platforms, resilient full-stack systems, and computer vision architectures for real-world impact.
                </p>

                <div className={styles.scrollHintPill}>
                  <span className={styles.scrollMouseIcon}>
                    <span className={styles.scrollWheel} />
                  </span>
                  <span>SCROLL TO UNVEIL PROFILE</span>
                  <span className={styles.scrollArrow}>↓</span>
                </div>
              </div>
            </div>

            {/* 1B. Detailed Profile Card */}
            <div className={styles.editorialCard} ref={scene1ProfileCardRef}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIndexBadge}>
                  <span className={styles.badgeNumber}>01</span>
                  <span className={styles.badgeSlash}>/</span>
                  <span className={styles.badgeTotal}>PROFILE</span>
                </div>
                <div className={styles.locationChip}>
                  <span className={styles.locationDot}>•</span>
                  <span>BHAWANIPATNA, IN</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.roleTagWrap}>
                  <span className={styles.roleTag}>TECH HEAD @ CODEBREAKERS</span>
                  <span className={styles.roleTagAccent}>• BTECH CSE</span>
                </div>
                <h2 className={styles.cardName}>OM PRAKASH BEHERA</h2>
                <p className={styles.cardBio}>
                  Lead architect building <strong>HackVerse &apos;26</strong> (flagship 24H state tech fest). Engineering high-performance AI/ML systems, computer vision pipelines, and resilient full-stack web architectures that solve real-world problems.
                </p>

                {/* Milestone Badges */}
                <div className={styles.milestoneGrid}>
                  <a
                    href="https://hackverse.codebreakersgcek.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.milestonePill}
                    title="HackVerse '26 Flagship 24H Fest"
                  >
                    <span className={styles.milestoneIcon}>⚡</span>
                    <span className={styles.milestoneText}>
                      <strong>HackVerse &apos;26</strong> Lead
                    </span>
                    <span className={styles.milestoneArrow}>↗</span>
                  </a>
                  <a
                    href="#achievements"
                    className={styles.milestonePill}
                    title="IIM Sambalpur 7-Day IDE Bootcamp"
                  >
                    <span className={styles.milestoneIcon}>✦</span>
                    <span className={styles.milestoneText}>
                      <strong>IIM Sambalpur</strong> IDE Fellow
                    </span>
                    <span className={styles.milestoneArrow}>↗</span>
                  </a>
                  <div className={styles.milestonePill}>
                    <span className={styles.milestoneIcon}>🏆</span>
                    <span className={styles.milestoneText}>
                      <strong>ISRO BAH &apos;26</strong> PS-07
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className={styles.cardCtaRow}>
                  <a href="#projects" className={styles.primaryCtaBtn}>
                    <span>Explore Work</span>
                    <span className={styles.btnArrow}>↓</span>
                  </a>
                  <a href="/resume.pdf" download className={styles.secondaryCtaBtn}>
                    <span>Resume</span>
                    <span className={styles.btnArrow}>↓</span>
                  </a>
                  <a
                    href="https://omprakashbehera-3d.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.tertiaryCtaBtn}
                    title="Experience 3D Terminal Portfolio"
                  >
                    <span>3D OS</span>
                    <span className={styles.btnArrow}>↗</span>
                  </a>
                </div>

                {/* Quick Telemetry Counters */}
                <div className={styles.cardFooterStats}>
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>30+</span>
                    <span className={styles.miniStatLbl}>PROJECTS</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>3+</span>
                    <span className={styles.miniStatLbl}>YEARS EXP</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>100+</span>
                    <span className={styles.miniStatLbl}>REPOSITORIES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. SCENE 2: Right Fiery Autumn Samurai + Left Core Architecture Card ─── */}
        <div className={styles.sceneWrapper} data-scene="2" ref={scene2ContainerRef}>
          {/* Right-Anchored Image Canvas */}
          <div className={styles.scene2ImageStage}>
            <div className={styles.scene2ImageInnerRef} ref={scene2ImgRef}>
              <Image
                src="/hero/Fiery Autumn Samurai Selfie Overlay.png"
                alt="Fiery Autumn Samurai Selfie Overlay"
                fill
                className={styles.scene2ImageCover}
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            </div>
            <div className={styles.imageAtmosphereOverlay} ref={scene2OverlayRef} />
          </div>

          {/* Left Card Stage */}
          <div className={styles.scene2CardWrapper} ref={scene2CardRef}>
            <div className={styles.editorialCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIndexBadge}>
                  <span className={styles.badgeNumber}>02</span>
                  <span className={styles.badgeSlash}>/</span>
                  <span className={styles.badgeTotal}>CAPABILITIES</span>
                </div>
                <div className={styles.locationChip}>
                  <span className={styles.locationPulseGreen} />
                  <span>OPEN FOR COLLABORATION</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.roleTagWrap}>
                  <span className={styles.roleTag}>SYSTEMS & CAPABILITIES</span>
                  <span className={styles.roleTagAccent}>• FULL SPECTRUM</span>
                </div>
                <h2 className={styles.cardName}>CORE ARCHITECTURE</h2>
                <p className={styles.cardBio}>
                  Specialized in architecting autonomous AI pipelines, real-time distributed applications, and high-security enterprise solutions.
                </p>

                {/* Capabilities Grid */}
                <div className={styles.capabilitiesGrid}>
                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>AI & Machine Learning</strong>
                    </div>
                    <span className={styles.capDesc}>
                      PyTorch, OpenCV, Computer Vision, Gemini APIs, LLM Agents
                    </span>
                  </div>

                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>Full-Stack Architecture</strong>
                    </div>
                    <span className={styles.capDesc}>
                      Next.js 15, React 19, TypeScript, Node.js, Express, TailwindCSS
                    </span>
                  </div>

                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>Cloud & Data Systems</strong>
                    </div>
                    <span className={styles.capDesc}>
                      Docker, PostgreSQL, Cloud Firestore, REST APIs, Microservices
                    </span>
                  </div>

                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>Engineering Leadership</strong>
                    </div>
                    <span className={styles.capDesc}>
                      Tech Head CodeBreakers, HackVerse Organizer, Mentorship
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className={styles.cardCtaRow}>
                  <a href="#achievements" className={styles.primaryCtaBtn}>
                    <span>View Achievements</span>
                    <span className={styles.btnArrow}>→</span>
                  </a>
                  <a href="#contact" className={styles.secondaryCtaBtn}>
                    <span>Get In Touch</span>
                    <span className={styles.btnArrow}>↗</span>
                  </a>
                </div>

                {/* Highlights Footer */}
                <div className={styles.cardFooterStats}>
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>1st</span>
                    <span className={styles.miniStatLbl}>YOUTH@2050</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>SIH &apos;25</span>
                    <span className={styles.miniStatLbl}>TEAM CODENOVA</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>GCEK</span>
                    <span className={styles.miniStatLbl}>BHAWANIPATNA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
