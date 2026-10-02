'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SmoothScrollLayout({ children }) {
  const lenisRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Initialize global high-performance Lenis instance
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      autoResize: true,
    })

    lenisRef.current = lenis
    window.__lenis = lenis

    // 2. Sync Lenis to GSAP Ticker for 120 FPS synchronized pinning and reveals
    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // 3. Anchor Click Handling via Lenis (replaces conflicting browser smooth scroll)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1)
        const targetEl = document.getElementById(targetId)

        if (targetEl) {
          e.preventDefault()
          lenis.scrollTo(targetEl, {
            offset: -75,
            duration: 1.2,
          })
          window.history.pushState(null, '', href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  // 4. Handle route changes smoothly with Lenis
  useEffect(() => {
    if (typeof window === 'undefined' || !lenisRef.current) return

    const lenis = lenisRef.current

    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        setTimeout(() => {
          lenis.scrollTo(element, { offset: -75, duration: 1.0 })
          ScrollTrigger.refresh()
        }, 60)
        return
      }
    }

    // Scroll to top on new page navigation
    lenis.scrollTo(0, { immediate: true })
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }, [pathname])

  return <>{children}</>
}
