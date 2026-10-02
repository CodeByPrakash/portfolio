'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  children = null,
  className = '',
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)
  const opacity = useSpring(0)
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  })

  const [lastY, setLastY] = useState(0)

  function handleMouse(e) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    rotateX.set(rotationX)
    rotateY.set(rotationY)

    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)

    const velocityY = offsetY - lastY
    rotateFigcaption.set(-velocityY * 0.6)
    setLastY(offsetY)
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover)
    opacity.set(1)
  }

  function handleMouseLeave() {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateFigcaption.set(0)
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-container ${className}`}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        perspective: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            zIndex: 10,
          }}
          className="mobile-warning sm:hidden"
        >
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          scale,
        }}
      >
        {children ? (
          children
        ) : imageSrc ? (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '15px',
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />
        ) : null}

        {displayOverlayContent && overlayContent && (
          <motion.div
            className="tilted-card-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              zIndex: 3,
              pointerEvents: 'none',
              willChange: 'transform',
              transform: 'translateZ(30px)',
            }}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            left: 0,
            top: 0,
            borderRadius: '9999px',
            backgroundColor: 'rgba(30, 30, 30, 0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#ffffff',
            padding: '7px 16px',
            fontSize: '12px',
            fontFamily: 'var(--font-body, -apple-system, sans-serif)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            boxShadow: '0 10px 28px rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 30,
            whiteSpace: 'nowrap',
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  )
}
