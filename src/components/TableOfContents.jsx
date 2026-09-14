'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './TableOfContents.module.css'

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || '')
  const [nodes, setNodes] = useState([])
  const [bgPathD, setBgPathD] = useState('')
  const [activeStemD, setActiveStemD] = useState('')
  const [activeCoord, setActiveCoord] = useState(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const listRef = useRef(null)
  const itemRefs = useRef({})

  // Determine minimum heading level for hierarchical depth
  const minLevel = headings.length > 0
    ? Math.min(...headings.map((h) => h.level || 3))
    : 3

  // Measure all item centers relative to the list container
  const updateGeometry = useCallback(() => {
    if (!listRef.current || headings.length === 0) return

    const listRect = listRef.current.getBoundingClientRect()
    const measured = []

    headings.forEach((heading) => {
      const el = itemRefs.current[heading.id]
      if (el) {
        const rect = el.getBoundingClientRect()
        const y = rect.top - listRect.top + rect.height / 2
        // Main level (depth 0) at x=4, Sub level (depth 1+) at x=14
        const isIndented = (heading.level || 3) > minLevel
        const x = isIndented ? 14 : 4
        measured.push({
          id: heading.id,
          x,
          y,
          isIndented,
        })
      }
    })

    if (measured.length === 0) return
    setNodes(measured)

    // Build continuous guide path with smooth cubic Bézier S-curves
    let d = `M ${measured[0].x} ${Math.max(0, measured[0].y - 22)} V ${measured[0].y}`
    for (let i = 0; i < measured.length - 1; i++) {
      const curr = measured[i]
      const next = measured[i + 1]

      if (curr.x === next.x) {
        d += ` V ${next.y}`
      } else {
        const midY = (curr.y + next.y) / 2
        d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`
      }
    }
    setBgPathD(d)

    // Calculate active dot & active stem
    const activeTargetId = activeId || headings[0]?.id
    const activeIndex = measured.findIndex((n) => n.id === activeTargetId)
    const activeNode = activeIndex >= 0 ? measured[activeIndex] : measured[0]

    if (activeNode) {
      setActiveCoord({ x: activeNode.x, y: activeNode.y })

      // Active stem extends ~24px vertically above the dot into the glowing head
      const stemTop = Math.max(0, activeNode.y - 24)
      setActiveStemD(`M ${activeNode.x} ${stemTop} V ${activeNode.y}`)
    }
  }, [headings, minLevel, activeId])

  // Scrollspy to detect active heading
  useEffect(() => {
    if (!headings || headings.length === 0) return

    const handleScroll = () => {
      if (window.scrollY < 180) {
        if (headings[0]) setActiveId(headings[0].id)
        return
      }

      const triggerPoint = window.scrollY + 130
      let currentId = headings[0].id

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id)
        if (el) {
          const elTop = el.getBoundingClientRect().top + window.pageYOffset
          if (elTop <= triggerPoint) {
            currentId = headings[i].id
          } else {
            break
          }
        }
      }

      setActiveId(currentId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateGeometry, { passive: true })

    handleScroll()
    const timer = setTimeout(updateGeometry, 80)

    // ResizeObserver for dynamic font or layout adjustments
    let ro = null
    if (typeof ResizeObserver !== 'undefined' && listRef.current) {
      ro = new ResizeObserver(updateGeometry)
      ro.observe(listRef.current)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateGeometry)
      clearTimeout(timer)
      if (ro) ro.disconnect()
    }
  }, [headings, updateGeometry])

  // Update active stem & dot whenever activeId changes
  useEffect(() => {
    if (nodes.length === 0) {
      updateGeometry()
      return
    }

    const activeIndex = nodes.findIndex((n) => n.id === activeId)
    const activeNode = activeIndex >= 0 ? nodes[activeIndex] : nodes[0]

    if (activeNode) {
      setActiveCoord({ x: activeNode.x, y: activeNode.y })
      const stemTop = Math.max(0, activeNode.y - 24)
      setActiveStemD(`M ${activeNode.x} ${stemTop} V ${activeNode.y}`)

      // Auto-scroll TOC container if item is out of view
      const activeEl = itemRefs.current[activeNode.id]
      if (activeEl && listRef.current) {
        const listEl = listRef.current
        const itemTop = activeEl.offsetTop
        const itemHeight = activeEl.offsetHeight
        const listScroll = listEl.scrollTop
        const listHeight = listEl.clientHeight

        if (itemTop < listScroll || itemTop + itemHeight > listScroll + listHeight) {
          listEl.scrollTo({
            top: itemTop - listHeight / 2 + itemHeight / 2,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [activeId, nodes, updateGeometry])

  // Smooth scroll to heading on click
  const handleScrollTo = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const navOffset = 110
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })

      setActiveId(id)
      setIsMobileOpen(false)

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${id}`)
      }

      // Temporary pulse animation on the target heading
      target.classList.add('headingPulse')
      setTimeout(() => {
        target.classList.remove('headingPulse')
      }, 2000)
    }
  }

  // Smooth scroll back to top
  const handleBackToTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (headings[0]) {
      setActiveId(headings[0].id)
    }
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  if (!headings || headings.length === 0) {
    return null
  }

  return (
    <nav className={styles.tocWrapper} aria-label="Table of contents">
      {/* Mobile Bar */}
      <div className={styles.mobileBar}>
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className={styles.mobileToggleBtn}
          aria-expanded={isMobileOpen}
        >
          <span className={styles.mobileToggleIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </span>
          <span className={styles.mobileToggleText}>ON THIS PAGE</span>
          <span className={`${styles.mobileChevron} ${isMobileOpen ? styles.chevronOpen : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Main TOC Card */}
      <div className={`${styles.tocBody} ${isMobileOpen ? styles.tocBodyMobileOpen : ''}`}>
        <div className={styles.trackContainer}>
          {/* Dynamic Geometric SVG Curved Track Canvas */}
          <svg className={styles.svgCanvas} aria-hidden="true">
            {/* Guide background track with cubic Bézier S-curves */}
            {bgPathD && (
              <path
                d={bgPathD}
                className={styles.bgPath}
                fill="none"
              />
            )}

            {/* Glowing active highlight stem extending upward */}
            {activeStemD && (
              <path
                d={activeStemD}
                className={styles.activeStem}
                fill="none"
              />
            )}

            {/* Glowing active dot matching attached image */}
            {activeCoord && (
              <g className={styles.activeDotGroup}>
                <circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r="7.5"
                  className={styles.activeHalo}
                />
                <circle
                  cx={activeCoord.x}
                  cy={activeCoord.y}
                  r="3.8"
                  className={styles.activeDot}
                />
              </g>
            )}
          </svg>

          {/* Headings List */}
          <ul ref={listRef} className={styles.headingsList}>
            {headings.map((heading) => {
              const isActive = activeId === heading.id
              const isIndented = (heading.level || 3) > minLevel

              return (
                <li
                  key={heading.id}
                  ref={(el) => {
                    itemRefs.current[heading.id] = el
                  }}
                  className={`${styles.headingItem} ${isIndented ? styles.indentedItem : ''}`}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleScrollTo(e, heading.id)}
                    className={`${styles.headingLink} ${isActive ? styles.activeLink : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {heading.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Divider & Back to top button */}
        <div className={styles.tocFooter}>
          <div className={styles.footerDivider} />
          <button
            type="button"
            onClick={handleBackToTop}
            className={styles.backToTopBtn}
            aria-label="Scroll back to top of article"
          >
            <span className={styles.upChevron}>^</span>
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
