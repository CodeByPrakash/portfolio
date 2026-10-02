'use client'

import { useEffect, useRef, useState } from 'react'
import './TargetCursor.css'

export default function TargetCursor({
  dotColor = '#FF6B00',
  circleColor = 'rgba(255, 107, 0, 0.45)',
  circleHoverColor = '#FF6B00',
  dotSize = 6,
  circleSize = 34,
  lerp = 0.18,
}) {
  const dotRef = useRef(null)
  const circleRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    // Check if touch device / mobile
    const isTouch = window.matchMedia('(pointer: coarse), (hover: none)').matches
    if (isTouch) return

    let mouseX = -100
    let mouseY = -100
    let circleX = -100
    let circleY = -100
    let rafId = null

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Point follows mouse instantaneously with 0 delay
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      if (!isVisible) setIsVisible(true)
    }

    const onMouseDown = () => setIsClicked(true)
    const onMouseUp = () => setIsClicked(false)

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    // Smooth RAF loop for the follower circle
    const animateCircle = () => {
      circleX += (mouseX - circleX) * lerp
      circleY += (mouseY - circleY) * lerp

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`
      }

      rafId = requestAnimationFrame(animateCircle)
    }

    rafId = requestAnimationFrame(animateCircle)

    // Detect hover over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .btn, label'
        )
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
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
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isVisible, lerp])

  return (
    <div
      className={`cursor-point-circle-wrap ${isVisible ? 'cursor-visible' : 'cursor-hidden'}`}
      aria-hidden="true"
    >
      {/* Zero-latency Instant Point */}
      <div
        ref={dotRef}
        className={`cursor-point ${isHovered ? 'point-hovered' : ''} ${isClicked ? 'point-clicked' : ''}`}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
        }}
      />

      {/* Smooth Trailing Follower Circle */}
      <div
        ref={circleRef}
        className={`cursor-circle ${isHovered ? 'circle-hovered' : ''} ${isClicked ? 'circle-clicked' : ''}`}
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          borderColor: isHovered ? circleHoverColor : circleColor,
        }}
      />
    </div>
  )
}
