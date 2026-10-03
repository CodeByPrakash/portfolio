'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ACTIVITIES, ACTIVITY_CATEGORIES } from '../data/activities'
import styles from './Activity.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const YEARS = ['All Years', '2026', '2025', '2024', '2023']

export default function Activity() {
  // ── Stream Feed States ───────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeYear, setActiveYear] = useState('All Years')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('timeline') // 'timeline' | 'grid'
  const [sortOrder, setSortOrder] = useState('desc') // 'desc' | 'asc'
  const [expandedId, setExpandedId] = useState(null)
  const [modalActivity, setModalActivity] = useState(null)

  // ── Video Scrubber States ────────────────────────────────
  const [activeScrubIndex, setActiveScrubIndex] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  const videoRef = useRef(null)
  const videoPinSectionRef = useRef(null)
  const feedSectionRef = useRef(null)
  const lenisRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  // Featured milestones for the video timeline scrubbing
  const featuredMilestones = useMemo(() => {
    return ACTIVITIES.slice(0, 8)
  }, [])

  // Relative time helper
  const getRelativeTime = (timestamp) => {
    try {
      const now = new Date('2026-09-10T12:00:00+05:30').getTime()
      const then = new Date(timestamp).getTime()
      const diffMs = now - then
      if (diffMs < 0) return 'Just now'
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return 'Today'
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
      return `${Math.floor(diffDays / 365)} years ago`
    } catch {
      return ''
    }
  }

  // Filter & sort activities for full stream
  const filteredActivities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    let list = ACTIVITIES.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' ||
        item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        item.type.toLowerCase().includes(activeCategory.toLowerCase())

      const matchesYear = activeYear === 'All Years' || item.year === activeYear

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query)) ||
        item.category.toLowerCase().includes(query) ||
        item.displayDate.toLowerCase().includes(query)

      return matchesCategory && matchesYear && matchesSearch
    })

    list.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime()
      const timeB = new Date(b.timestamp).getTime()
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB
    })

    return list
  }, [activeCategory, activeYear, searchQuery, sortOrder])

  // ── Lenis & GSAP ScrollTrigger Video Scrubbing Setup ─────
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    const video = videoRef.current
    const pinSection = videoPinSectionRef.current

    if (pinSection && video) {
      let targetTime = 0
      let smoothedTime = 0
      let rafId = null

      const onSeeked = () => {
        if (!video || !video.duration) return
        if (Math.abs(video.currentTime - smoothedTime) > 0.02) {
          try {
            if ('fastSeek' in video) {
              video.fastSeek(smoothedTime)
            } else {
              video.currentTime = smoothedTime
            }
          } catch {}
        }
      }

      video.addEventListener('seeked', onSeeked)

      const smoothSeekLoop = () => {
        if (video && video.duration) {
          const diff = targetTime - smoothedTime
          if (Math.abs(diff) > 0.001) {
            smoothedTime += diff * 0.22 // Smooth responsive catch-up
          }

          if (!video.seeking && Math.abs(video.currentTime - smoothedTime) > 0.02) {
            try {
              if ('fastSeek' in video) {
                video.fastSeek(smoothedTime)
              } else {
                video.currentTime = smoothedTime
              }
            } catch {}
          }
        }
        rafId = requestAnimationFrame(smoothSeekLoop)
      }
      rafId = requestAnimationFrame(smoothSeekLoop)

      const totalScrollDistance = window.innerHeight * 3.5

      const trigger = ScrollTrigger.create({
        trigger: pinSection,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: prefersReducedMotion ? true : 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          setVideoProgress(self.progress)
          if (video.duration) {
            targetTime = Math.max(0, Math.min(video.duration - 0.05, self.progress * video.duration))
          }
          // Segment progress to determine active milestone index
          const count = featuredMilestones.length
          const idx = Math.min(count - 1, Math.floor(self.progress * count))
          setActiveScrubIndex(idx)
        },
      })
      scrollTriggerRef.current = trigger

      return () => {
        cancelAnimationFrame(rafId)
        video.removeEventListener('seeked', onSeeked)
        trigger.kill()
        gsap.ticker.remove(tickerCb)
        lenis.destroy()
      }
    }

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
    }
  }, [featuredMilestones.length])

  // Handle Video Metadata Loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 1)
      setIsVideoReady(true)
      videoRef.current.currentTime = 0
    }
  }

  // Jump to specific milestone on video scrub timeline
  const handleJumpToMilestone = (idx) => {
    if (!scrollTriggerRef.current || !lenisRef.current) return
    const count = featuredMilestones.length
    const progress = (idx + 0.5) / count
    const trigger = scrollTriggerRef.current
    const targetScroll = trigger.start + progress * (trigger.end - trigger.start)
    lenisRef.current.scrollTo(targetScroll, { duration: 1.2 })
  }

  // Scroll smoothly to full stream feed
  const scrollToStream = () => {
    if (feedSectionRef.current && lenisRef.current) {
      lenisRef.current.scrollTo(feedSectionRef.current, { duration: 1.4, offset: -40 })
    }
  }

  // Auto-play demo simulation
  const toggleAutoPlay = () => {
    if (!videoRef.current) return
    if (isAutoPlaying) {
      videoRef.current.pause()
      setIsAutoPlaying(false)
    } else {
      videoRef.current.play()
      setIsAutoPlaying(true)
    }
  }

  const activeMilestone = featuredMilestones[activeScrubIndex] || featuredMilestones[0]

  return (
    <div className={styles.pageWrapper}>
      {/* ── SECTION 1: GSAP & LENIS PINNED MINECRAFT VIDEO THEATER ── */}
      <section ref={videoPinSectionRef} className={styles.videoTheaterSection}>
        {/* Ambient Top Glow */}
        <div className={styles.theaterTopGlow} aria-hidden="true" />

        {/* Video Canvas Layer */}
        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            src="/activity/activity_minecraft.mp4"
            className={styles.videoPlayer}
            playsInline
            muted
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
          />
          {/* Spatial Vignette Gradients */}
          <div className={styles.videoVignette} aria-hidden="true" />
          <div className={styles.videoScanlines} aria-hidden="true" />
        </div>

        {/* Theater Header HUD */}
        <div className={styles.theaterHeaderHud}>
          <div className={styles.theaterBadge}>
            <span className={styles.theaterPulseDot} />
            <span className={styles.theaterBadgeText}>Interactive Timeline Scrubber • GSAP + Lenis</span>
          </div>
          <h1 className={styles.theaterMainTitle}>
            Engineering <span className={styles.gradientAccent}>Chronicles</span>
          </h1>
          <p className={styles.theaterSubTitle}>
            Scroll through time in the spatial Minecraft realm to uncover major milestones, research models &amp; releases.
          </p>
        </div>

        {/* ── CENTER FLOATING AREA: DYNAMIC ACTIVITY POPUP & CARD ── */}
        <div className={styles.centerFloatingSpace}>
          <AnimatePresence mode="wait">
            {activeMilestone && (
              <motion.div
                key={activeMilestone.id}
                className={styles.centerActivityCard}
                initial={{ opacity: 0, y: 35, scale: 0.94, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, scale: 0.95, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setModalActivity(activeMilestone)}
              >
                {/* Glowing Card Border & Header */}
                <div className={styles.centerCardHeader}>
                  <div className={styles.centerMilestoneMeta}>
                    <span className={styles.milestoneIndexTag}>
                      MILESTONE 0{activeScrubIndex + 1} // {activeMilestone.year}
                    </span>
                    <span className={styles.centerDisplayDate}>
                      {activeMilestone.displayDate}
                    </span>
                  </div>

                  <span className={`${styles.centerStatusBadge} ${styles[`status_${activeMilestone.status.toLowerCase().replace(/\s+/g, '_')}`] || ''}`}>
                    {activeMilestone.status}
                  </span>
                </div>

                {/* Main Milestone Title */}
                <h2 className={styles.centerMilestoneTitle}>{activeMilestone.title}</h2>

                {/* Concise Summary */}
                <p className={styles.centerMilestoneSummary}>{activeMilestone.summary}</p>

                {/* Milestone Footer / Metrics & Popup Trigger */}
                <div className={styles.centerCardFooter}>
                  {activeMilestone.stats && (
                    <div className={styles.centerStatPill}>
                      <span className={styles.centerStatMetric}>{activeMilestone.stats.metric}</span>
                      <span className={styles.centerStatLabel}>{activeMilestone.stats.label}</span>
                    </div>
                  )}

                  <div className={styles.centerTagList}>
                    {activeMilestone.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.centerTagItem}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.openDetailsBtn}
                    onClick={(e) => {
                      e.stopPropagation()
                      setModalActivity(activeMilestone)
                    }}
                    aria-label={`Open details for ${activeMilestone.title}`}
                  >
                    <span>View Details</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>

                {/* Hover Click Hint */}
                <div className={styles.cardClickHint}>
                  <span>✦ Click to expand full popup</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── BOTTOM THEATER HUD & TIMELINE SCRUBBER ── */}
        <div className={styles.theaterBottomHud}>
          {/* Timeline Step Indicators */}
          <div className={styles.scrubberDotsContainer} role="tablist" aria-label="Milestones timeline">
            {featuredMilestones.map((m, idx) => {
              const isActive = idx === activeScrubIndex
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.scrubberDotBtn} ${isActive ? styles.scrubberDotActive : ''}`}
                  onClick={() => handleJumpToMilestone(idx)}
                  title={`${m.displayDate}: ${m.title}`}
                >
                  <span className={styles.dotNum}>0{idx + 1}</span>
                  <span className={styles.dotIndicator} />
                  <span className={styles.dotDateLabel}>{m.displayDate}</span>
                </button>
              )
            })}
          </div>

          {/* Progress Bar & Jump Down Button */}
          <div className={styles.theaterControlsRow}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{ width: `${Math.max(0, Math.min(100, videoProgress * 100))}%` }}
              />
            </div>

            <div className={styles.theaterActionButtons}>
              <button
                type="button"
                className={styles.scrollDownBtn}
                onClick={scrollToStream}
                title="Scroll down to all activities feed"
              >
                <span>Full Activity Feed ({ACTIVITIES.length})</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: FULL COMPREHENSIVE ACTIVITY STREAM FEED ── */}
      <section ref={feedSectionRef} className={styles.activitySection} id="feed">
        {/* Ambient background clay shapes */}
        <div className={`${styles.clayShape} ${styles.clayShape1}`} aria-hidden="true" />
        <div className={`${styles.clayShape} ${styles.clayShape2}`} aria-hidden="true" />

        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>All Activity Stream</span>
          </nav>

          {/* Stream Header */}
          <div className={styles.header}>
            <div className={styles.liveBeaconWrapper}>
              <div className={styles.liveBeacon}>
                <span className={styles.pulseDot} />
                <span className={styles.liveBeaconText}>
                  <strong>Live Status:</strong> Building Space ML &amp; Computer Vision Architectures
                </span>
              </div>
              <span className={styles.lastUpdatedText}>
                Last active: <strong>Sep 08, 2026</strong>
              </span>
            </div>

            <h2 className={styles.title}>
              All Engineering <span className={styles.accentText}>Logs</span> &amp; Stream
            </h2>
            <p className={styles.subtitle}>
              Timestamped record of production deployments, AI/ML models, open-source repositories, hackathons, and technical architecture writes.
            </p>

            {/* Quick Metrics Bar */}
            <div className={styles.metricsBar}>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>{ACTIVITIES.length}+</span>
                <span className={styles.metricLabel}>Milestones Logged</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>13</span>
                <span className={styles.metricLabel}>Projects &amp; Models</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>2</span>
                <span className={styles.metricLabel}>National Hackathons</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>100%</span>
                <span className={styles.metricLabel}>Open Source Verified</span>
              </div>
            </div>
          </div>

          {/* Search, Filter & Controls Toolbar */}
          <div className={styles.toolbar}>
            {/* Search Input */}
            <div className={styles.searchWrap}>
              <svg
                className={styles.searchIcon}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search activities, keywords, models, hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search activities"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode & Sort Controls */}
            <div className={styles.viewControls}>
              {/* View Mode Toggle */}
              <div className={styles.toggleGroup} role="group" aria-label="View Mode">
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${viewMode === 'timeline' ? styles.toggleBtnActive : ''}`}
                  onClick={() => setViewMode('timeline')}
                  aria-label="Timeline view"
                  title="Timeline View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <circle cx="12" cy="6" r="3" />
                    <circle cx="12" cy="18" r="3" />
                  </svg>
                  <span className={styles.toggleText}>Timeline</span>
                </button>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleBtnActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  title="Grid View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span className={styles.toggleText}>Grid</span>
                </button>
              </div>

              {/* Sort Order Toggle */}
              <button
                type="button"
                className={styles.sortBtn}
                onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                title={`Sort by date: ${sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {sortOrder === 'desc' ? (
                    <>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </>
                  ) : (
                    <>
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </>
                  )}
                </svg>
                <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className={styles.filterSection}>
            <div className={styles.categoryFilters}>
              {ACTIVITY_CATEGORIES.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ''}`}
                  >
                    {isActive && (
                      <motion.div
                        className={styles.activeCategoryPill}
                        layoutId="activeActivityCategoryPill"
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span className={styles.categoryBtnText}>{category}</span>
                  </button>
                )
              })}
            </div>

            {/* Year Filter Tabs */}
            <div className={styles.yearFilters}>
              {YEARS.map((year) => {
                const isActive = activeYear === year
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setActiveYear(year)}
                    className={`${styles.yearBtn} ${isActive ? styles.yearBtnActive : ''}`}
                  >
                    {year}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results Counter / Filter Status */}
          <div className={styles.resultsInfo}>
            <span>
              Showing <strong className={styles.highlight}>{filteredActivities.length}</strong> {filteredActivities.length === 1 ? 'entry' : 'entries'}
              {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
              {activeYear !== 'All Years' && <span> for <strong>{activeYear}</strong></span>}
            </span>
            {(activeCategory !== 'All' || activeYear !== 'All Years' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All')
                  setActiveYear('All Years')
                  setSearchQuery('')
                }}
                className={styles.resetBtn}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Activity Stream Feed */}
          {filteredActivities.length > 0 ? (
            <div className={viewMode === 'timeline' ? styles.timelineContainer : styles.gridContainer}>
              {viewMode === 'timeline' && <div className={styles.timelineLine} aria-hidden="true" />}

              {filteredActivities.map((activity, index) => {
                const isExpanded = expandedId === activity.id
                const relativeTime = getRelativeTime(activity.timestamp)

                return (
                  <motion.article
                    key={activity.id}
                    id={activity.id}
                    className={`${styles.activityCard} ${viewMode === 'timeline' ? styles.timelineCard : styles.gridCard} ${styles[`color_${activity.color}`] || ''}`}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                  >
                    {/* Timeline Anchor Node (in timeline mode) */}
                    {viewMode === 'timeline' && (
                      <div className={styles.timelineNode} aria-hidden="true">
                        <div className={styles.timelineNodeDot} />
                      </div>
                    )}

                    {/* Card Header & Timestamp */}
                    <div className={styles.cardHeader}>
                      <div className={styles.timestampWrap}>
                        <div className={styles.timestampBadge}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <time dateTime={activity.timestamp} className={styles.exactTime}>
                            {activity.displayDate} • {activity.time}
                          </time>
                        </div>
                        {relativeTime && (
                          <span className={styles.relativeTime}>{relativeTime}</span>
                        )}
                      </div>

                      {/* Status / Category Badges */}
                      <div className={styles.badgeGroup}>
                        <span className={`${styles.statusBadge} ${styles[`status_${activity.status.toLowerCase().replace(/\s+/g, '_')}`] || ''}`}>
                          {activity.status}
                        </span>
                        <span className={styles.typeBadge}>{activity.category}</span>
                      </div>
                    </div>

                    {/* Activity Title */}
                    <h3 className={styles.activityTitle}>{activity.title}</h3>

                    {/* Summary */}
                    <p className={styles.activitySummary}>{activity.summary}</p>

                    {/* Expanded Detailed Highlights */}
                    <AnimatePresence>
                      {isExpanded && activity.details && activity.details.length > 0 && (
                        <motion.div
                          className={styles.expandedDetails}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h4 className={styles.detailsHeading}>Key Technical Highlights:</h4>
                          <ul className={styles.detailsList}>
                            {activity.details.map((detail, dIdx) => (
                              <li key={dIdx} className={styles.detailItem}>
                                <span className={styles.detailBullet}>▸</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Details Toggle Button */}
                    {activity.details && activity.details.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedId((prev) => (prev === activity.id ? null : activity.id))}
                        className={styles.expandBtn}
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? 'Hide Technical Details' : 'View Technical Details'}</span>
                        <svg
                          className={`${styles.expandIcon} ${isExpanded ? styles.expandIconRotated : ''}`}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    )}

                    {/* Tags */}
                    {activity.tags && activity.tags.length > 0 && (
                      <div className={styles.tagsWrap}>
                        {activity.tags.map((tag) => (
                          <span key={tag} className={styles.tagItem}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer Stats & Action Links */}
                    <div className={styles.cardFooter}>
                      {activity.stats && (
                        <div className={styles.statPill}>
                          <span className={styles.statMetric}>{activity.stats.metric}</span>
                          <span className={styles.statLabel}>{activity.stats.label}</span>
                        </div>
                      )}

                      {activity.links && activity.links.length > 0 && (
                        <div className={styles.linksGroup}>
                          {activity.links.map((link) => {
                            const isInternal = link.type === 'internal'
                            if (isInternal) {
                              return (
                                <Link
                                  key={link.url}
                                  href={link.url}
                                  className={`${styles.actionLink} ${styles.actionLinkInternal}`}
                                >
                                  <span>{link.label}</span>
                                  <span>↗</span>
                                </Link>
                              )
                            }
                            return (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.actionLink}
                              >
                                {link.type === 'github' && (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                  </svg>
                                )}
                                <span>{link.label}</span>
                                <span>↗</span>
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          ) : (
            /* Empty State */
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>No matching activity logs found</h3>
              <p className={styles.emptyText}>
                Try adjusting your search terms or resetting the active filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All')
                  setActiveYear('All Years')
                  setSearchQuery('')
                }}
                className={styles.resetBtnBig}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 3: INTERACTIVE ACTIVITY MODAL / POPUP ── */}
      <AnimatePresence>
        {modalActivity && (
          <div
            className={styles.modalBackdrop}
            onClick={() => setModalActivity(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-activity-title"
          >
            <motion.div
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setModalActivity(null)}
                aria-label="Close details popup"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <div className={styles.modalMetaRow}>
                  <span className={styles.modalDateTag}>
                    {modalActivity.displayDate} • {modalActivity.time}
                  </span>
                  <span className={`${styles.statusBadge} ${styles[`status_${modalActivity.status.toLowerCase().replace(/\s+/g, '_')}`] || ''}`}>
                    {modalActivity.status}
                  </span>
                  <span className={styles.typeBadge}>{modalActivity.category}</span>
                </div>
                <h2 id="modal-activity-title" className={styles.modalTitle}>
                  {modalActivity.title}
                </h2>
              </div>

              {/* Modal Body */}
              <div className={styles.modalBody}>
                <p className={styles.modalSummary}>{modalActivity.summary}</p>

                {modalActivity.details && modalActivity.details.length > 0 && (
                  <div className={styles.modalDetailsSection}>
                    <h3 className={styles.modalDetailsHeading}>Technical Architecture &amp; Highlights</h3>
                    <ul className={styles.modalDetailsList}>
                      {modalActivity.details.map((detail, idx) => (
                        <li key={idx} className={styles.modalDetailItem}>
                          <span className={styles.modalBullet}>▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {modalActivity.tags && modalActivity.tags.length > 0 && (
                  <div className={styles.modalTagsWrap}>
                    {modalActivity.tags.map((tag) => (
                      <span key={tag} className={styles.modalTagItem}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className={styles.modalFooter}>
                {modalActivity.stats && (
                  <div className={styles.statPill}>
                    <span className={styles.statMetric}>{modalActivity.stats.metric}</span>
                    <span className={styles.statLabel}>{modalActivity.stats.label}</span>
                  </div>
                )}

                {modalActivity.links && modalActivity.links.length > 0 && (
                  <div className={styles.modalLinksGroup}>
                    {modalActivity.links.map((link) => {
                      if (link.type === 'internal') {
                        return (
                          <Link
                            key={link.url}
                            href={link.url}
                            className={`${styles.actionLink} ${styles.actionLinkInternal}`}
                            onClick={() => setModalActivity(null)}
                          >
                            <span>{link.label}</span>
                            <span>↗</span>
                          </Link>
                        )
                      }
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionLink}
                        >
                          <span>{link.label}</span>
                          <span>↗</span>
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
