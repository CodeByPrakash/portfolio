'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X, Sparkles, MessageSquare } from 'lucide-react'
import TopModeSwitcher from '../TopModeSwitcher'
import styles from './ServicesNavbar.module.css'

const SERVICES_NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Services', href: '/services', isActive: true },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '#contact' },
]

export default function ServicesNavbar({ onStartProjectClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (e, targetId) => {
    setMobileOpen(false)
    if (targetId.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(targetId.replace('#', ''))
      if (element) {
        if (window.__lenis) {
          window.__lenis.scrollTo(element, { offset: -90, duration: 1.1 })
        } else {
          const y = element.getBoundingClientRect().top + window.scrollY - 90
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }
    }
  }

  const handleStartProject = (e) => {
    if (onStartProjectClick) {
      e.preventDefault()
      onStartProjectClick()
    } else {
      handleScrollTo(e, '#contact')
    }
  }

  return (
    <div className={styles.outerWrapper}>
      {/* Top Mode Switcher Bar */}
      <TopModeSwitcher forceMode="business" />

      {/* Main Services Navigation Bar */}
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.inner}>
          {/* Left Brand / Logo */}
          <Link href="/services" className={styles.logo}>
            <div className={styles.logoBadge}>
              <span className={styles.logoInitial}>P</span>
            </div>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoTitle}>Prakash</span>
              <span className={styles.logoSub}>Services &amp; Studio</span>
            </div>
          </Link>

          {/* Desktop Center Navigation Links */}
          <ul className={styles.navLinks}>
            {SERVICES_NAV_LINKS.map((link) => {
              const isAnchor = link.href.startsWith('#')
              return (
                <li key={link.name} className={styles.navItem}>
                  {isAnchor ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`${styles.navLink} ${link.isActive ? styles.navLinkActive : ''}`}
                    >
                      {link.name}
                      {link.isActive && (
                        <motion.span
                          layoutId="servicesNavActiveIndicator"
                          className={styles.activeIndicator}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`${styles.navLink} ${link.isActive ? styles.navLinkActive : ''}`}
                    >
                      {link.name}
                      {link.isActive && (
                        <motion.span
                          layoutId="servicesNavActiveIndicator"
                          className={styles.activeIndicator}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Right Status Badge & Primary CTA */}
          <div className={styles.rightActions}>
            <div className={styles.statusPill}>
              <span className={styles.statusDotPulse} />
              <span className={styles.statusText}>Available for new projects</span>
            </div>

            <button
              onClick={handleStartProject}
              className={styles.startProjectBtn}
              aria-label="Start a Project"
            >
              <span>Start a Project</span>
              <ArrowRight size={15} className={styles.btnArrow} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={styles.hamburgerBtn}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileDrawer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.mobileDrawerInner}>
                <div className={styles.mobileStatusRow}>
                  <span className={styles.statusDotPulse} />
                  <span>Available for freelance &amp; business contracts</span>
                </div>

                <div className={styles.mobileLinksList}>
                  {SERVICES_NAV_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`${styles.mobileLink} ${link.isActive ? styles.mobileLinkActive : ''}`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight size={14} />
                    </a>
                  ))}
                </div>

                <div className={styles.mobileDrawerFooter}>
                  <button
                    onClick={handleStartProject}
                    className={styles.mobileCtaBtn}
                  >
                    <span>Start a Project</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}
