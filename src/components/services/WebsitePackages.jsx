'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Code, Atom, Layers, Sparkles } from 'lucide-react'
import { WEBSITE_PACKAGES } from '../../data/servicesData'
import styles from './WebsitePackages.module.css'

const PACKAGE_ICONS = {
  Code,
  Atom,
  Layers,
}

export default function WebsitePackages({ onSelectPackage }) {
  const handlePackageClick = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage(pkg)
    } else {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        if (window.__lenis) {
          window.__lenis.scrollTo(contactSection, { offset: -80, duration: 1.1 })
        } else {
          const y = contactSection.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <section className={styles.section} id="packages">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>WEBSITE DEVELOPMENT PACKAGES</span>
          </div>
          <h2 className={styles.heading}>
            Choose the <span className={styles.highlight}>right foundation</span>{' '}
            for your next website.
          </h2>
          <p className={styles.subtext}>
            Each package is designed for different goals. Choose what fits your
            needs or request a custom quote.
          </p>
        </div>

        {/* 3 Horizontally Aligned Cards */}
        <div className={styles.packagesGrid}>
          {WEBSITE_PACKAGES.map((pkg, idx) => {
            const IconComponent = PACKAGE_ICONS[pkg.iconName] || Code
            return (
              <motion.div
                key={pkg.id}
                className={`${styles.card} ${pkg.isPopular ? styles.popularCard : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Popular Ribbon / Badge */}
                {pkg.isPopular && (
                  <div className={styles.popularBadge}>
                    <Sparkles size={12} className={styles.popularIcon} />
                    <span>{pkg.popularLabel}</span>
                  </div>
                )}

                {/* Card Top: Icon & Title */}
                <div className={styles.cardTop}>
                  <div className={styles.iconBox}>
                    <IconComponent size={22} className={styles.pkgIcon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>{pkg.title}</h3>
                    <span className={styles.cardBadge}>{pkg.badge}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className={styles.priceContainer}>
                  <div className={styles.priceRow}>
                    <span className={styles.priceValue}>{pkg.priceFormatted}</span>
                    <span className={styles.priceUnit}>{pkg.unit}</span>
                  </div>
                  <span className={styles.priceNotice}>
                    *Configurable starting estimate based on project scope
                  </span>
                </div>

                {/* Deliverables Checklist */}
                <div className={styles.featuresSection}>
                  <span className={styles.featuresTitle}>What&apos;s Included:</span>
                  <ul className={styles.featuresList}>
                    {pkg.deliverables.map((item) => (
                      <li key={item} className={styles.featureItem}>
                        <div className={styles.checkWrapper}>
                          <Check size={14} className={styles.checkIcon} />
                        </div>
                        <span className={styles.featureText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action */}
                <div className={styles.cardAction}>
                  <button
                    onClick={() => handlePackageClick(pkg)}
                    className={pkg.isPopular ? styles.popularBtn : styles.standardBtn}
                    aria-label={`Select ${pkg.title}`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight size={15} className={styles.ctaArrow} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
