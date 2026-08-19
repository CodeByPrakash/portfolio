'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollManager handles silky smooth scrolling across all pages,
 * route transitions, hash anchor navigation, and scroll padding in Next.js.
 */
export default function ScrollManager() {
  const pathname = usePathname()

  useEffect(() => {
    // If hash is present in browser location (e.g. #projects, #journey, #contact)
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '')
      const element = document.getElementById(targetId)

      if (element) {
        // Allow DOM to settle before scrolling
        const timer = setTimeout(() => {
          const navbarHeight = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = Math.max(0, elementPosition - navbarHeight)

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }, 80)

        return () => clearTimeout(timer)
      }
    } else if (typeof window !== 'undefined') {
      // If route changed without a hash, smoothly scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [pathname])

  useEffect(() => {
    // Global listener for smooth scrolling on internal anchor clicks
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1)
        const targetEl = document.getElementById(targetId)

        if (targetEl) {
          e.preventDefault()
          const navbarHeight = 80
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = Math.max(0, elementPosition - navbarHeight)

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })

          // Update URL hash without jumping
          window.history.pushState(null, '', href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return null
}
