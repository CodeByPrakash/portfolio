'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import styles from './CustomCursor.module.css'

export default function CustomCursor({
  accentColor = '#FF6B00',
  accentHoverColor = '#FF8533',
}) {
  const { isDark } = useTheme()
  const pointerRef = useRef(null)
  const rippleContainerRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState('default') // 'default' | 'pointer' | 'text' | 'drag'
  const [cursorLabel, setCursorLabel] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  // Color values based on theme:
  // Light / White mode: Solid Black body, Orange tip dot
  // Dark mode: Solid Orange body, Dark tip dot
  const themeBodyFill = isDark ? '#FF6B00' : '#000000'
  const themeTipFill = isDark ? '#000000' : '#FF6B00'

  useEffect(() => {
    // Disable on touch / mobile devices
    const isTouch = window.matchMedia('(pointer: coarse), (hover: none)').matches
    if (isTouch) return

    let mouseX = -100
    let mouseY = -100

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Instant 0-delay tracking for the pointer tip
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      if (!isVisible) setIsVisible(true)
    }

    // Handle mouse down & click shockwave event
    const onMouseDown = (e) => {
      setIsClicked(true)
      createClickRipple(e.clientX, e.clientY)
    }

    const onMouseUp = () => {
      setIsClicked(false)
    }

    // Spawn animated orange shockwave ring from the tip
    const createClickRipple = (x, y) => {
      if (!rippleContainerRef.current) return

      const ripple = document.createElement('div')
      ripple.className = styles.clickRipple
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      rippleContainerRef.current.appendChild(ripple)

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 550)
    }

    // Element inspection for interactive states
    const handleMouseOver = (e) => {
      const target = e.target
      if (!target || !(target instanceof Element)) return

      // 1. Action Text label (e.g. data-cursor-text="VIEW")
      const labelTarget = target.closest('[data-cursor-text], [data-cursor-label]')
      if (labelTarget) {
        const text =
          labelTarget.getAttribute('data-cursor-text') ||
          labelTarget.getAttribute('data-cursor-label') ||
          ''
        setCursorLabel(text)
        setCursorState('pointer')
        return
      }

      // 2. Drag elements
      if (target.closest('[data-cursor="drag"], [data-cursor="grab"], .carousel, .slider')) {
        setCursorLabel('DRAG')
        setCursorState('drag')
        return
      }

      // 3. Clickable Buttons & Links -> Pointing Hand cursor
      if (
        target.closest(
          'a, button, input[type="submit"], input[type="button"], [role="button"], [data-cursor="pointer"], .btn, .clickable, select, summary, label'
        )
      ) {
        setCursorLabel('')
        setCursorState('pointer')
        return
      }

      // 4. Text Input Boxes, Textareas & Editable Text -> I-Beam cursor
      if (
        target.closest(
          'input, textarea, [contenteditable="true"], .input, .textarea, [data-cursor="text"]'
        )
      ) {
        setCursorLabel('')
        setCursorState('text')
        return
      }

      // Default state -> Rounded Triangle
      setCursorLabel('')
      setCursorState('default')
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => {
      setIsVisible(false)
      setCursorState('default')
      setCursorLabel('')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [isVisible])

  return (
    <>
      {/* Click Ripple Layer */}
      <div ref={rippleContainerRef} className={styles.rippleContainer} aria-hidden="true" />

      {/* Main Cursor Layer */}
      <div
        className={`${styles.cursorWrapper} ${isVisible ? styles.visible : styles.hidden}`}
        aria-hidden="true"
      >
        {/* Themed Pointer Body (Zero Latency) */}
        <div
          ref={pointerRef}
          className={`
            ${styles.pointerBody}
            ${isDark ? styles.darkTheme : styles.lightTheme}
            ${styles[`state_${cursorState}`] || ''}
            ${isClicked ? styles.pointerClicked : ''}
          `}
          style={{
            '--cursor-accent': accentColor,
            '--cursor-hover': accentHoverColor,
          }}
        >
          {/* State 1: Default Mode -> Rounded Triangle (No Border, Matte Clean) */}
          {cursorState === 'default' && (
            <svg
              className={styles.pointerSvg}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.trianglePath}
                d="M 5 2.5 
                   C 3.6 1.3, 1.5 2.3, 1.5 4.2 
                   L 1.5 22.8 
                   C 1.5 24.6, 3.7 25.6, 5.1 24.6 
                   L 23.5 15.2 
                   C 25.1 14.3, 24.8 11.9, 23.1 11.3 
                   Z"
                fill={themeBodyFill}
              />
              <circle
                className={styles.tipCircle}
                cx="3.8"
                cy="3.8"
                r="2.2"
                fill={themeTipFill}
              />
            </svg>
          )}

          {/* State 2: Pointer / Hover Mode -> Themed Pointing Hand */}
          {cursorState === 'pointer' && (
            <svg
              className={`${styles.pointerSvg} ${styles.handSvg}`}
              width="28"
              height="30"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginTop: '-2px', marginLeft: '-8px' }}
            >
              <path
                className={styles.trianglePath}
                d="M 8.5 2 
                   C 7.1 2, 6 3.1, 6 4.5 
                   L 6 13.8 
                   L 5 12.8 
                   C 4.1 11.9, 2.7 11.9, 1.8 12.8 
                   C 0.9 13.7, 0.9 15.1, 1.8 16 
                   L 7.8 23 
                   C 9.6 25.1, 12.2 26.5, 15 26.5 
                   L 18.5 26.5 
                   C 22.1 26.5, 25 23.6, 25 20 
                   L 25 13 
                   C 25 11.6, 23.9 10.5, 22.5 10.5 
                   C 22.1 10.5, 21.7 10.6, 21.4 10.8 
                   C 21 9.4, 19.8 8.5, 18.2 8.5 
                   C 17.8 8.5, 17.5 8.6, 17.2 8.8 
                   C 16.7 7.4, 15.4 6.5, 13.9 6.5 
                   C 13.5 6.5, 13.2 6.6, 12.8 6.7 
                   L 12.8 4.5 
                   C 12.8 3.1, 11.7 2, 10.3 2 
                   Z"
                fill={themeBodyFill}
              />
              <circle
                className={styles.tipCircle}
                cx="8.5"
                cy="4"
                r="2"
                fill={themeTipFill}
              />
            </svg>
          )}

          {/* State 3: Text Input / Textarea Mode -> Themed I-Beam */}
          {cursorState === 'text' && (
            <svg
              className={styles.pointerSvg}
              width="22"
              height="28"
              viewBox="0 0 22 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginTop: '-14px', marginLeft: '-11px' }}
            >
              <rect x="9.5" y="2" width="3" height="24" rx="1.5" fill={themeBodyFill} />
              <rect x="3" y="2" width="16" height="3" rx="1.5" fill={themeBodyFill} />
              <rect x="3" y="23" width="16" height="3" rx="1.5" fill={themeBodyFill} />
              <circle cx="11" cy="14" r="2" fill={themeTipFill} />
            </svg>
          )}

          {/* State 4: Drag Mode */}
          {cursorState === 'drag' && (
            <svg
              className={styles.pointerSvg}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="14" cy="14" r="12" fill={themeBodyFill} />
              <path
                d="M8 14H20M8 14L11 11M8 14L11 17M20 14L17 11M20 14L17 17"
                stroke={themeTipFill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* Floating Action Badge */}
          {cursorLabel && (
            <div className={`${styles.badge} ${isDark ? styles.badgeDark : ''}`}>
              <span>{cursorLabel}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
