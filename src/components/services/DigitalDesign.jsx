'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { DIGITAL_DESIGN_SERVICES } from '../../data/servicesData'
import styles from './DigitalDesign.module.css'

export default function DigitalDesign({ onSelectService }) {
  const handleCardClick = (service) => {
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
    <section className={styles.section} id="digital-design">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>DIGITAL DESIGN SERVICES</span>
          </div>
          <h2 className={styles.heading}>
            Make every digital touchpoint look{' '}
            <span className={styles.highlight}>intentional.</span>
          </h2>
          <p className={styles.subtext}>
            Professional design services for your brand, menu, social media and
            more.
          </p>
        </div>

        {/* 6 Compact Cards Grid */}
        <div className={styles.cardsGrid}>
          {DIGITAL_DESIGN_SERVICES.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
            >
              {/* Thumbnail Image Container */}
              <div className={styles.thumbnailContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.thumbnailImage}
                />
              </div>

              {/* Card Meta & Action */}
              <div className={styles.cardContent}>
                <div className={styles.titlePriceRow}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.cardPrice}>{item.priceFormatted}</span>
                </div>
                <p className={styles.cardDesc}>{item.description}</p>

                <button
                  onClick={() => handleCardClick(item)}
                  className={styles.compactBtn}
                  aria-label={`${item.ctaText} for ${item.title}`}
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight size={13} className={styles.btnArrow} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
