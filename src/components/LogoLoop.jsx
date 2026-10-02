'use client'

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react'

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
}

const toCssLength = (value) => (typeof value === 'number' ? `${value}px` : (value ?? undefined))

const cx = (...parts) => parts.filter(Boolean).join(' ')

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.ResizeObserver) {
      const handleResize = () => callback()
      window.addEventListener('resize', handleResize)
      callback()
      return () => window.removeEventListener('resize', handleResize)
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null
      const observer = new ResizeObserver(callback)
      observer.observe(ref.current)
      return observer
    })

    callback()
    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [callback, elements, dependencies])
}

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? []

    if (images.length === 0) {
      onLoad()
      return
    }

    let remainingImages = images.length
    const handleImageLoad = () => {
      remainingImages -= 1
      if (remainingImages === 0) {
        onLoad()
      }
    }

    images.forEach((img) => {
      const htmlImg = img
      if (htmlImg.complete) {
        handleImageLoad()
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true })
        htmlImg.addEventListener('error', handleImageLoad, { once: true })
      }
    })

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad)
        img.removeEventListener('error', handleImageLoad)
      });
    }
  }, [onLoad, seqRef, dependencies])
}

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null)
  const lastTimestampRef = useRef(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const seqSize = isVertical ? seqHeight : seqWidth

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`
      track.style.transform = transformValue
    }

    if (prefersReduced) {
      track.style.transform = isVertical ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)'
      return () => {
        lastTimestampRef.current = null
      }
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000
      lastTimestampRef.current = timestamp

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * easingFactor

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize
        offsetRef.current = nextOffset

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`
        track.style.transform = transformValue
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastTimestampRef.current = null
    }
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef])
}

export const LogoLoop = memo(
  ({
    logos = [],
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style,
  }) => {
    const containerRef = useRef(null)
    const trackRef = useRef(null)
    const seqRef = useRef(null)

    const [seqWidth, setSeqWidth] = useState(0)
    const [seqHeight, setSeqHeight] = useState(0)
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES)
    const [isHovered, setIsHovered] = useState(false)

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed
      if (pauseOnHover === true) return 0
      if (pauseOnHover === false) return undefined
      return 0
    }, [hoverSpeed, pauseOnHover])

    const isVertical = direction === 'up' || direction === 'down'

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed)
      let directionMultiplier
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1
      }
      const speedMultiplier = speed < 0 ? -1 : 1
      return magnitude * directionMultiplier * speedMultiplier
    }, [speed, direction, isVertical])

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0
      const sequenceRect = seqRef.current?.getBoundingClientRect?.()
      const sequenceWidth = sequenceRect?.width ?? 0
      const sequenceHeight = sequenceRect?.height ?? 0
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight)
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight))
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth))
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
      }
    }, [isVertical])

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical])

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical])

    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical)

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
      }),
      [gap, logoHeight, fadeOutColor]
    )

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true)
    }, [effectiveHoverSpeed])
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false)
    }, [effectiveHoverSpeed])

    const renderLogoItem = useCallback(
      (item, key) => {
        if (renderItem) {
          return (
            <li
              style={{
                flex: 'none',
                fontSize: `${logoHeight}px`,
                lineHeight: 1,
                marginBottom: isVertical ? `${gap}px` : undefined,
                marginRight: !isVertical ? `${gap}px` : undefined,
                listStyle: 'none',
              }}
              key={key}
              role="listitem"
            >
              {renderItem(item, key)}
            </li>
          )
        }

        const isNodeItem = 'node' in item

        const content = isNodeItem ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${logoHeight}px`,
              transition: scaleOnHover ? 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' : 'none',
            }}
            aria-hidden={!!item.href && !item.ariaLabel}
          >
            {item.node}
          </span>
        ) : (
          <img
            style={{
              height: `${logoHeight}px`,
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
              userSelect: 'none',
              pointerEvents: 'none',
              transition: scaleOnHover ? 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' : 'none',
            }}
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ''}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )

        const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title)

        const inner = item.href ? (
          <a
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: '6px',
              transition: 'opacity 0.2s linear, transform 0.2s ease',
            }}
            href={item.href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
            title={item.title}
          >
            {content}
          </a>
        ) : (
          content
        )

        return (
          <li
            style={{
              flex: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${logoHeight}px`,
              lineHeight: 1,
              marginBottom: isVertical ? `${gap}px` : undefined,
              marginRight: !isVertical ? `${gap}px` : undefined,
              listStyle: 'none',
            }}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        )
      },
      [isVertical, scaleOnHover, renderItem, logoHeight, gap]
    )

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: isVertical ? 'column' : 'row',
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, isVertical]
    )

    const containerStyle = useMemo(
      () => ({
        position: 'relative',
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        overflow: isVertical ? 'hidden' : 'hidden',
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style, isVertical]
    )

    return (
      <div
        ref={containerRef}
        className={cx('logoloop-container', className)}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            {isVertical ? (
              <>
                <div
                  aria-hidden
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '40px',
                    zIndex: 10,
                    background: `linear-gradient(to bottom, var(--logoloop-fadeColor, var(--bg-primary, #ffffff)) 0%, rgba(0,0,0,0) 100%)`,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '40px',
                    zIndex: 10,
                    background: `linear-gradient(to top, var(--logoloop-fadeColor, var(--bg-primary, #ffffff)) 0%, rgba(0,0,0,0) 100%)`,
                  }}
                />
              </>
            ) : (
              <>
                <div
                  aria-hidden
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '80px',
                    zIndex: 10,
                    background: `linear-gradient(to right, var(--logoloop-fadeColor, var(--bg-primary, #ffffff)) 0%, rgba(0,0,0,0) 100%)`,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: '80px',
                    zIndex: 10,
                    background: `linear-gradient(to left, var(--logoloop-fadeColor, var(--bg-primary, #ffffff)) 0%, rgba(0,0,0,0) 100%)`,
                  }}
                />
              </>
            )}
          </>
        )}

        <div
          style={{
            display: 'flex',
            willChange: 'transform',
            userSelect: 'none',
            position: 'relative',
            zIndex: 1,
            flexDirection: isVertical ? 'column' : 'row',
            width: isVertical ? '100%' : 'max-content',
            height: isVertical ? 'max-content' : '100%',
            alignItems: 'center',
          }}
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    )
  }
)

LogoLoop.displayName = 'LogoLoop'

export default LogoLoop
