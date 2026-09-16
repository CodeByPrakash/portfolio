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
}) {
  const containerRef = useRef(null)
  const planeRef = useRef(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  // ──────────────────────────────── Parallax RAF ───────────
  useEffect(() => {
    if (!parallax || !planeRef.current) return

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.06)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.06)

      if (planeRef.current) {
        const rx = rotateX + currentRef.current.y * parallaxStrength
        const ry = rotateY + currentRef.current.x * parallaxStrength
        planeRef.current.style.transform = `
          translate3d(${offsetX}px, ${offsetY}px, ${offsetZ}px)
          rotateX(${rx}deg)
          rotateY(${ry}deg)
          rotateZ(${rotateZ}deg)
        `
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [parallax, parallaxStrength, rotateX, rotateY, rotateZ, offsetX, offsetY, offsetZ])

  // ──────────────────────────────── Mouse Tracking ─────────
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

  // ──────────────────────────────── Column Data ────────────
  const columnData = useMemo(() => {
    if (!images.length) return []

    return Array.from({ length: columns }, (_, colIdx) => {
      // Pick tiles cycling through the images array
      const tiles = Array.from({ length: tilesPerColumn }, (_, tileIdx) => {
        const imgIdx = (colIdx * tilesPerColumn + tileIdx) % images.length
        return images[imgIdx]
      })

      // Alternate direction
      const reverse = alternate && colIdx % 2 === 1

      return { tiles, reverse, colIdx }
    })
  }, [images, columns, tilesPerColumn, alternate])

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
    perspective: `${perspective}px`,
  }

  const planeStyle = {
    width: `${planeWidth}%`,
    height: `${planeHeight}%`,
    transform: `
      translate3d(${offsetX}px, ${offsetY}px, ${offsetZ}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      rotateZ(${rotateZ}deg)
    `,
    gap: `0 ${columnGap}px`,
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
                '--duration': `${duration}s`,
                gap: `${rowGap}px`,
              }}
            >
              {[...tiles, ...tiles].map((src, i) => (
                <div
                  key={i}
                  className={styles.tile}
                  style={{
                    aspectRatio: `${tileAspect}`,
                    borderRadius: `${borderRadius}px`,
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
