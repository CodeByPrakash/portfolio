'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import GoogleTranslate from './GoogleTranslate'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { name: 'About', href: '#about', target: '/#about' },
  { name: 'Skills', href: '#skills', target: '/#skills' },
  { name: 'Projects', href: '#projects', target: '/#projects' },
  { name: 'Journey', href: '#journey', target: '/#journey' },
  { name: 'Achievements', href: '#achievements', target: '/#achievements' },
  { name: 'Blog', href: '#blog', target: '/blog' },
  { name: 'Activity', href: '/activity', target: '/activity' },
  { name: 'Contact', href: '#contact', target: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Detect scroll state for glassmorphic navbar background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    if (pathname.startsWith('/blog')) {
      setActiveSection('blog')
      return
    }

    if (pathname.startsWith('/activity')) {
      setActiveSection('activity')
      return
    }

    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const sectionIds = ['about', 'skills', 'projects', 'journey', 'achievements', 'blog', 'contact']
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    )

    sectionElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Smooth scroll handler with robust mobile compatibility
  const handleNavClick = (e, link) => {
    setOpen(false)

    if (pathname === '/' && link.href.startsWith('#')) {
      const targetId = link.href.substring(1)
      const targetEl = document.getElementById(targetId)

      if (targetEl) {
        e.preventDefault()
        setTimeout(() => {
          const navbarHeight = 75
          const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY
          const offsetPosition = Math.max(0, elementPosition - navbarHeight)

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })

          window.history.pushState(null, '', link.href)
          setActiveSection(targetId)
        }, 60)
      }
    }
  }

  const handleHireClick = (e) => {
    setOpen(false)
    if (pathname === '/') {
      const targetEl = document.getElementById('contact')
      if (targetEl) {
        e.preventDefault()
        setTimeout(() => {
          const navbarHeight = 75
          const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY
          const offsetPosition = Math.max(0, elementPosition - navbarHeight)
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
          window.history.pushState(null, '', '#contact')
          setActiveSection('contact')
        }, 60)
      }
    }
  }

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.navOpen : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top Animated Scroll Progress Indicator */}
      <motion.div className={styles.scrollProgressBar} style={{ scaleX }} />

      <div className={styles.inner}>
        {/* Logo */}
        <Link
          href="/#hero"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.pushState(null, '', '#hero')
              setActiveSection('')
            }
          }}
          className={styles.logo}
        >
          <motion.div
            className={styles.logoBox}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            OPB
          </motion.div>
          <span className={styles.logoText}>OMPRAKASH BEHERA</span>
        </Link>

        {/* Desktop Animated Navigation Links */}
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => {
            const isBlogLink = link.name === 'Blog'
            const isActivityLink = link.name === 'Activity'
            const destination = pathname === '/' ? link.href : link.target
            const isActive = isBlogLink
              ? pathname.startsWith('/blog') || activeSection === 'blog'
              : isActivityLink
              ? pathname.startsWith('/activity') || activeSection === 'activity'
              : activeSection === link.href.substring(1)

            return (
              <li key={link.name} className={styles.linkItem}>
                <Link
                  href={destination}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                >
                  {/* Sliding 3D Clay Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className={styles.activePill}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={styles.linkContent}>{link.name}</span>
                </Link>
              </li>
            )
          })}

          {/* Resume Download Link */}
          <li className={styles.linkItem}>
            <a
              href="/resume.pdf"
              download
              className={`${styles.link} ${styles.resumeLink}`}
            >
              <span className={styles.linkContent}>Resume ↓</span>
            </a>
          </li>

          {/* Google Translate Language Selector */}
          {/* <li className={styles.linkItem}>
            <GoogleTranslate variant="navbar" />
          </li> */}

          {/* Call to Action: Hire Me */}
          <li className={styles.linkItem}>
            <Link
              href={pathname === '/' ? '#contact' : '/#contact'}
              onClick={handleHireClick}
              className={styles.hireBtn}
            >
              Hire Me ↗
            </Link>
          </li>
        </ul>

        {/* Animated Hamburger Button */}
        <button
          className={`${styles.ham} ${open ? styles.hamOpen : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle Menu"
          aria-expanded={open}
        >
          <span className={styles.hamLine1} />
          <span className={styles.hamLine2} />
          <span className={styles.hamLine3} />
        </button>
      </div>

      {/* Animated Mobile Drawer Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.drawerInner}>
              {NAV_LINKS.map((link, idx) => {
                const isBlogLink = link.name === 'Blog'
                const isActivityLink = link.name === 'Activity'
                const destination = pathname === '/' ? link.href : link.target
                const isActive = isBlogLink
                  ? pathname.startsWith('/blog') || activeSection === 'blog'
                  : isActivityLink
                  ? pathname.startsWith('/activity') || activeSection === 'activity'
                  : activeSection === link.href.substring(1)

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.25 }}
                  >
                    <Link
                      href={destination}
                      className={`${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`}
                      onClick={(e) => handleNavClick(e, link)}
                    >
                      <span className={styles.drawerIndex}>0{idx + 1}</span>
                      <span className={styles.drawerText}>{link.name}</span>
                      <span className={styles.drawerArrow}>↗</span>
                    </Link>
                  </motion.div>
                )
              })}

              {/* Mobile Drawer Language Switcher */}
              {/* <div className={styles.drawerTranslateRow}>
                <span className={styles.drawerTranslateLabel}>🌐 Language / ଭାଷା:</span>
                <GoogleTranslate variant="navbar" />
              </div> */}

              <div className={styles.drawerActions}>
                <a
                  href="/resume.pdf"
                  download
                  className={styles.drawerResume}
                  onClick={() => setOpen(false)}
                >
                  Download Resume ↓
                </a>
                <Link
                  href={pathname === '/' ? '#contact' : '/#contact'}
                  className={styles.drawerHire}
                  onClick={handleHireClick}
                >
                  Let&apos;s Connect ↗
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
