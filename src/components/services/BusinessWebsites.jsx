'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Building2,
  Palmtree,
  UtensilsCrossed,
  Store,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { BUSINESS_WEBSITES } from '../../data/servicesData'
import styles from './BusinessWebsites.module.css'

const ICONS = {
  Building2,
  Palmtree,
  UtensilsCrossed,
  Store,
  Rocket,
}

export default function BusinessWebsites({ onSelectService }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filterOptions = [
    { id: 'all', label: 'All Solutions' },
    { id: 'real-estate', label: 'Real Estate' },
    { id: 'hotel-resort', label: 'Hotels & Resorts' },
    { id: 'cafe-restaurant', label: 'Cafes & Dining' },
    { id: 'small-business', label: 'Small Business' },
    { id: 'landing-pages', label: 'Landing Pages' },
  ]

  const filteredItems =
    activeFilter === 'all'
      ? BUSINESS_WEBSITES
      : BUSINESS_WEBSITES.filter((item) => item.id === activeFilter)

  const handleCtaClick = (service) => {
    if (onSelectService) {
      onSelectService(service)
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
    <section className={styles.section} id="business-websites">
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headTextGroup}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>BUSINESS WEBSITE SOLUTIONS</span>
            </div>
            <h2 className={styles.heading}>
              Give your business a{' '}
              <span className={styles.highlight}>better digital presence.</span>
            </h2>
            <p className={styles.subtext}>
              From a simple business website to a complete digital experience, choose
              the level of functionality that matches your business.
            </p>
          </div>

          <button
            onClick={() => setActiveFilter('all')}
            className={styles.viewAllBtn}
          >
            <span>View All Business Solutions</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterBar}>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`${styles.filterPill} ${activeFilter === opt.id ? styles.activeFilterPill : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 5 Image-based Cards Grid */}
        <div className={styles.cardsGrid}>
          {filteredItems.map((item, idx) => {
            const IconComponent = ICONS[item.iconName] || Building2
            return (
              <motion.div
                key={item.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                {/* Image Container with Consistent Aspect Ratio */}
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className={styles.cardImage}
                  />
                  <span className={styles.badgeTag}>{item.badge}</span>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  {/* Icon & Title */}
                  <div className={styles.titleRow}>
                    <div className={styles.iconBox}>
                      <IconComponent size={18} className={styles.cardIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                  </div>

                  {/* Two-line description */}
                  <p className={styles.cardDesc}>{item.description}</p>

                  {/* Key Highlights */}
                  <ul className={styles.featureList}>
                    {item.features.slice(0, 2).map((feat) => (
                      <li key={feat} className={styles.featureItem}>
                        <CheckCircle2 size={13} className={styles.checkIcon} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA Footer */}
                  <div className={styles.cardFooter}>
                    <div className={styles.priceGroup}>
                      <span className={styles.pricePrefix}>{item.pricePrefix}</span>
                      <span className={styles.priceValue}>{item.priceFormatted}</span>
                    </div>

                    <button
                      onClick={() => handleCtaClick(item)}
                      className={styles.outlineCtaBtn}
                      aria-label={`${item.ctaText} for ${item.title}`}
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight size={14} className={styles.ctaArrow} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
