'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Cpu,
  Sparkles,
  Workflow,
  BarChart3,
  FlaskConical,
  ArrowRight,
  Info,
} from 'lucide-react'
import { AI_ML_SERVICES } from '../../data/servicesData'
import styles from './AIMLSection.module.css'

const AI_ICONS = {
  Bot,
  Cpu,
  Sparkles,
  Workflow,
  BarChart3,
  FlaskConical,
}

export default function AIMLSection({ onSelectService }) {
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
    <section className={styles.section} id="ai-ml">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>AI &amp; MACHINE LEARNING SOLUTIONS</span>
          </div>
          <h2 className={styles.heading}>
            Bring <span className={styles.highlight}>intelligence</span> into your{' '}
            products and <span className={styles.highlight}>workflows.</span>
          </h2>
          <p className={styles.subtext}>
            I develop tailored AI and machine learning solutions based on your
            specific business problems and requirements.
          </p>
        </div>

        {/* 6 Compact Cards Grid */}
        <div className={styles.cardsGrid}>
          {AI_ML_SERVICES.map((item, idx) => {
            const IconComponent = AI_ICONS[item.iconName] || Bot
            return (
              <motion.div
                key={item.id}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                {/* Top Icon & Price Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox}>
                    <IconComponent size={20} className={styles.cardIcon} />
                  </div>
                  <div className={styles.pricePill}>{item.priceFormatted}</div>
                </div>

                {/* Content */}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <span className={styles.cardTagline}>{item.tagline}</span>
                <p className={styles.cardDesc}>{item.description}</p>

                {/* Popular Use Cases */}
                <div className={styles.useCasesWrap}>
                  {item.popularUseCases.map((uc) => (
                    <span key={uc} className={styles.useCaseChip}>
                      {uc}
                    </span>
                  ))}
                </div>

                {/* Compact CTA Action */}
                <button
                  onClick={() => handleCardClick(item)}
                  className={styles.compactCtaBtn}
                  aria-label={`${item.ctaText} for ${item.title}`}
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight size={14} className={styles.btnArrow} />
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Disclaimer Note */}
        <div className={styles.disclaimerBanner}>
          <Info size={16} className={styles.infoIcon} />
          <span>
            <strong>Pricing Scope Notice:</strong> Data readiness, API usage (OpenAI / Claude / Gemini),
            custom infrastructure hosting, model complexity, and third-party integrations affect the final milestone quote.
          </span>
        </div>
      </div>
    </section>
  )
}
