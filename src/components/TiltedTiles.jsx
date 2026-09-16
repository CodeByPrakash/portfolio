'use client'

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import styles from './TiltedTiles.module.css'

/**
 * TiltedTiles — A 3D tilted grid of infinitely scrolling image columns.
 *
 * Columns auto-scroll vertically, alternating direction. Mouse parallax
 * tilts the entire plane. Top/bottom gradient fades mask the edges.
 *
 * All props documented in the Gallery page.
 */
export default function TiltedTiles({
  images = [],
  columns = 16,
  mobileColumns,
  tabletColumns,
  tilesPerColumn = 5,
  tileAspect = 1,
  rowGap = 8,
  columnGap = 8,
  borderRadius = 0,
  perspective = 1600,
  rotateX = 40,
  rotateY = 16,
  rotateZ = -20,
  offsetX = -40,
  offsetY = 0,
  offsetZ = 0,
  planeWidth = 280,
  planeHeight = 260,
  stagger = 20,
  duration = 25,
  alternate = true,
  fadeTop = 22,
  fadeBottom = 0,
  parallax = true,
  parallaxStrength = 8,
  pauseOnHover = false,
  saturation = 1,
  width = '100%',
  height = '100%',
  className = '',
  responsive = true,
}) {
  const containerRef = useRef(null)
  const planeRef = useRef(null)
  const [deviceType, setDeviceType] = useState('desktop') // 'mobile' | 'tablet' | 'desktop'
  const [isPaused, setIsPaused] = useState(false)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  // ──────────────────────────────── Viewport Detection ─────
  useEffect(() => {
    if (!responsive) return

    const checkDevice = () => {
      const w = window.innerWidth
      if (w < 640) {
        setDeviceType('mobile')
      } else if (w < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    checkDevice()
    window.addEventListener('resize', checkDevice, { passive: true })
    return () => window.removeEventListener('resize', checkDevice)
  }, [responsive])

  // ──────────────────────────────── Responsive Config ──────
  const effectiveConfig = useMemo(() => {
    if (!responsive || deviceType === 'desktop') {
      return {
        columns,
        planeWidth,
        planeHeight,
        rotateX,
        rotateY,
        rotateZ,
        offsetX,
        offsetY,
        offsetZ,
        perspective,
        rowGap,
        columnGap,
        borderRadius,
        parallaxStrength,
        duration,
      }
    }

    if (deviceType === 'mobile') {
      return {
        columns: mobileColumns ?? Math.min(columns, 7),
        planeWidth: 230,
        planeHeight: 240,
        rotateX: 28,
        rotateY: 8,
        rotateZ: -10,
        offsetX: -15,
        offsetY: 0,
        offsetZ: 0,
        perspective: 1000,
        rowGap: Math.min(rowGap, 6),
        columnGap: Math.min(columnGap, 6),
        borderRadius: Math.max(borderRadius, 8),
        parallaxStrength: 12,
        duration: Math.max(18, duration - 4),
      }
    }

    // Tablet
    return {
      columns: tabletColumns ?? Math.min(columns, 11),
      planeWidth: 255,
      planeHeight: 250,
      rotateX: 34,
      rotateY: 12,
      rotateZ: -14,
      offsetX: -25,
      offsetY: 0,
      offsetZ: 0,
      perspective: 1350,
      rowGap: Math.min(rowGap, 8),
      columnGap: Math.min(columnGap, 8),
      borderRadius: Math.max(borderRadius, 8),
      parallaxStrength: 10,
      duration: Math.max(20, duration - 2),
    }
  }, [
    responsive,
    deviceType,
    columns,
    mobileColumns,
    tabletColumns,
    planeWidth,
    planeHeight,
    rotateX,
    rotateY,
    rotateZ,
    offsetX,
    offsetY,
    offsetZ,
    perspective,
    rowGap,
    columnGap,
    borderRadius,
    parallaxStrength,
    duration,
  ])

  // ──────────────────────────────── Parallax RAF ───────────
  useEffect(() => {
    if (!parallax || !planeRef.current) return

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.06)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.06)

      if (planeRef.current) {
        const rx = effectiveConfig.rotateX + currentRef.current.y * effectiveConfig.parallaxStrength
        const ry = effectiveConfig.rotateY + currentRef.current.x * effectiveConfig.parallaxStrength
        planeRef.current.style.transform = `
          translate3d(${effectiveConfig.offsetX}px, ${effectiveConfig.offsetY}px, ${effectiveConfig.offsetZ}px)
          rotateX(${rx}deg)
          rotateY(${ry}deg)
          rotateZ(${effectiveConfig.rotateZ}deg)
        `
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [
    parallax,
    effectiveConfig.parallaxStrength,
    effectiveConfig.rotateX,
    effectiveConfig.rotateY,
    effectiveConfig.rotateZ,
    effectiveConfig.offsetX,
    effectiveConfig.offsetY,
    effectiveConfig.offsetZ,
  ])

  // ──────────────────────────────── Mouse & Touch Tracking ─
  const handleMouseMove = useCallback(
    (e) => {
      if (!parallax) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      // Normalize -1 → 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      targetRef.current = { x, y }
    },
    [parallax],
  )

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 }
  }, [])

  const handleTouchStart = useCallback(
    (e) => {
      if (!parallax || !e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1
      targetRef.current = {
        x: Math.max(-1, Math.min(1, x * 1.2)),
        y: Math.max(-1, Math.min(1, y * 1.2)),
      }
    },
    [parallax],
  )

  const handleTouchMove = useCallback(
    (e) => {
      if (!parallax || !e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1
      targetRef.current = {
        x: Math.max(-1, Math.min(1, x * 1.3)),
        y: Math.max(-1, Math.min(1, y * 1.3)),
      }
    },
    [parallax],
  )

  const handleTouchEnd = useCallback(() => {
    targetRef.current = { x: 0, y: 0 }
  }, [])

  // ──────────────────────────────── Column Data ────────────
  const columnData = useMemo(() => {
    if (!images.length) return []

    return Array.from({ length: effectiveConfig.columns }, (_, colIdx) => {
      // Pick tiles cycling through the images array
      const tiles = Array.from({ length: tilesPerColumn }, (_, tileIdx) => {
        const imgIdx = (colIdx * tilesPerColumn + tileIdx) % images.length
        return images[imgIdx]
      })

      // Alternate direction
      const reverse = alternate && colIdx % 2 === 1

      return { tiles, reverse, colIdx }
    })
  }, [images, effectiveConfig.columns, tilesPerColumn, alternate])

  // ──────────────────────────────── Fade Masks ─────────────
  const fadeStyle = useMemo(() => {
    const stops = []
    if (fadeTop > 0) {
      stops.push(`transparent 0%`, `black ${fadeTop}%`)
    } else {
      stops.push(`black 0%`)
    }
    if (fadeBottom > 0) {
      stops.push(`black ${100 - fadeBottom}%`, `transparent 100%`)
    } else {
      stops.push(`black 100%`)
    }
    return {
      maskImage: `linear-gradient(to bottom, ${stops.join(', ')})`,
      WebkitMaskImage: `linear-gradient(to bottom, ${stops.join(', ')})`,
    }
  }, [fadeTop, fadeBottom])

  // ──────────────────────────────── Render ──────────────────
  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    perspective: `${effectiveConfig.perspective}px`,
  }

  const planeStyle = {
    width: `${effectiveConfig.planeWidth}%`,
    height: `${effectiveConfig.planeHeight}%`,
    transform: `
      translate3d(${effectiveConfig.offsetX}px, ${effectiveConfig.offsetY}px, ${effectiveConfig.offsetZ}px)
      rotateX(${effectiveConfig.rotateX}deg)
      rotateY(${effectiveConfig.rotateY}deg)
      rotateZ(${effectiveConfig.rotateZ}deg)
    `,
    gap: `0 ${effectiveConfig.columnGap}px`,
    filter: saturation !== 1 ? `saturate(${saturation})` : undefined,
    ...fadeStyle,
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div ref={planeRef} className={styles.plane} style={planeStyle}>
        {columnData.map(({ tiles, reverse, colIdx }) => (
          <div
            key={colIdx}
            className={styles.column}
            style={{
              '--stagger': reverse ? `-${stagger}%` : '0%',
            }}
          >
            {/* Double the tiles for seamless loop */}
            <div
              className={`${styles.track} ${reverse ? styles.trackReverse : ''} ${isPaused ? styles.trackPaused : ''}`}
              style={{
                '--duration': `${effectiveConfig.duration}s`,
                gap: `${effectiveConfig.rowGap}px`,
              }}
            >
              {[...tiles, ...tiles].map((src, i) => (
                <div
                  key={i}
                  className={styles.tile}
                  style={{
                    aspectRatio: `${tileAspect}`,
                    borderRadius: `${effectiveConfig.borderRadius}px`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className={styles.tileImg}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
