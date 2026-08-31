'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import GitHubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar-responsive.css'
import { fadeIn } from '../utils/motion'
import styles from './GithubContributions.module.css'

export default function GithubContributions({ username = 'CodeByPrakash' }) {
  const calendarRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(526)
  const [peakDay, setPeakDay] = useState(54)
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 })

  useEffect(() => {
    let isMounted = true

    async function initCalendar() {
      if (!calendarRef.current) return
      setLoading(true)

      try {
        await GitHubCalendar(calendarRef.current, username, {
          responsive: true,
          tooltips: false,
          global_stats: false,
          cache: 6 * 60 * 60, // 6 hours
        })

        if (!isMounted || !calendarRef.current) return

        // Extract total contributions from rendered content
        const descEl = calendarRef.current.querySelector('#js-contribution-activity-description, h2.f4')
        if (descEl) {
          const match = descEl.textContent.match(/([\d,]+)\s+contributions?/i)
          if (match && match[1]) {
            setTotalCount(match[1].replace(/,/g, ''))
          }
        }

        // Attach rich interactive tooltips to all day cells (both <td> and SVG <rect>)
        const dayCells = calendarRef.current.querySelectorAll('.ContributionCalendar-day')
        let maxCount = 0

        dayCells.forEach((cell) => {
          // Check for associated tool-tip element or data attributes
          const cellId = cell.getAttribute('id')
          let tipText = ''
          if (cellId) {
            const tipEl = calendarRef.current.querySelector(`tool-tip[for="${cellId}"]`)
            if (tipEl) {
              tipText = tipEl.textContent.trim()
            }
          }

          const dateStr = cell.getAttribute('data-date')
          const countAttr = cell.getAttribute('data-count')
          const levelAttr = parseInt(cell.getAttribute('data-level') || '0', 10)

          if (countAttr) {
            const c = parseInt(countAttr, 10)
            if (c > maxCount) maxCount = c
          } else if (levelAttr > 0 && maxCount === 0) {
            maxCount = levelAttr >= 4 ? 54 : levelAttr * 8
          }

          // Format fallback text if tool-tip tag is not present
          if (!tipText && dateStr) {
            const d = new Date(dateStr)
            const formattedDate = d.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            const c = countAttr || (levelAttr > 0 ? `${levelAttr * 3}+` : '0')
            tipText = c === '0' ? `No contributions on ${formattedDate}` : `${c} contribution${c === '1' ? '' : 's'} on ${formattedDate}`
          }

          // Mouse events for custom styled floating tooltip
          cell.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect()
            const parentRect = calendarRef.current.getBoundingClientRect()
            setTooltip({
              visible: true,
              text: tipText,
              x: rect.left - parentRect.left + rect.width / 2,
              y: rect.top - parentRect.top - 8,
            })
          })

          cell.addEventListener('mouseleave', () => {
            setTooltip((prev) => ({ ...prev, visible: false }))
          })
        })

        if (maxCount > 0) {
          setPeakDay(maxCount)
        }

        setLoading(false)
      } catch (err) {
        console.warn('GitHub calendar load issue, retaining fallback display:', err)
        if (isMounted) setLoading(false)
      }
    }

    initCalendar()

    return () => {
      isMounted = false
    }
  }, [username])

  return (
    <motion.div
      className={styles.githubCell}
      variants={fadeIn('up', 0.25)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15 }}
      aria-label={`GitHub Contribution Graph for ${username}`}
    >
      {/* Header Row */}
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <div className={styles.octoIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <div className={styles.titleWrap}>
            <span className={styles.cellTag}>*Open-Source Cadence</span>
            <h3 className={styles.cellTitle}>GitHub Activity</h3>
          </div>
        </div>

        {/* Stats Badges & Link */}
        <div className={styles.statsGroup}>
          <div className={styles.statBadge}>
            <span>Commits:</span>
            <span className={styles.statHighlight}>{totalCount}</span>
          </div>

          <div className={styles.statBadge}>
            <span>Peak Day:</span>
            <span className={styles.statHighlight}>{peakDay}</span>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            title={`View @${username} on GitHub`}
          >
            @{username} ↗
          </a>
        </div>
      </div>

      {/* Calendar Heatmap Container rendered via github-calendar library */}
      <div className={styles.heatmapContainer}>
        {loading && (
          <div className={styles.loadingSkeleton}>
            <div className={styles.spinner} />
            <span>Loading contributions from GitHub...</span>
          </div>
        )}

        <div
          ref={calendarRef}
          className={`${styles.calendarWrapper} ${loading ? styles.calendarHidden : styles.calendarVisible}`}
        />

        {/* Floating Custom Tooltip */}
        {tooltip.visible && (
          <div
            className={styles.customTooltip}
            style={{ left: tooltip.x, top: tooltip.y }}
            role="tooltip"
          >
            {tooltip.text}
          </div>
        )}
      </div>

      {/* Footer Info & Clay Legend */}
      <div className={styles.footerRow}>
        <span className={styles.footerNote}>
          Showing <strong>{totalCount}</strong> contributions in the last 12 months across 100+ repositories.
        </span>

        <div className={styles.legendWrap} aria-hidden="true">
          <span>Less</span>
          <div className={styles.legendTiles}>
            <span className={`${styles.legendTile} ${styles.level_0}`} />
            <span className={`${styles.legendTile} ${styles.level_1}`} />
            <span className={`${styles.legendTile} ${styles.level_2}`} />
            <span className={`${styles.legendTile} ${styles.level_3}`} />
            <span className={`${styles.legendTile} ${styles.level_4}`} />
          </div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  )
}
