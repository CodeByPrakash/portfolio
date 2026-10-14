'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  MapPin,
  TrendingUp,
  Check,
  ArrowRight,
  Calculator,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import {
  SEO_SERVICES,
  ESTIMATOR_CATEGORIES,
  ESTIMATOR_FEATURES,
  ESTIMATOR_TIMELINES,
  calculateEstimate,
  getWhatsAppLink,
} from '../../data/servicesData'
import styles from './SEOAndEstimator.module.css'

const SEO_ICONS = {
  'basic-seo': Search,
  'local-seo': MapPin,
  'ongoing-seo': TrendingUp,
}

export default function SEOAndEstimator({ onSendRequirements }) {
  // Estimator State
  const [selectedCategory, setSelectedCategory] = useState(ESTIMATOR_CATEGORIES[0].id)
  const currentCategoryObj = useMemo(
    () => ESTIMATOR_CATEGORIES.find((c) => c.id === selectedCategory) || ESTIMATOR_CATEGORIES[0],
    [selectedCategory]
  )

  const [selectedType, setSelectedType] = useState(currentCategoryObj.types[0]?.id || '')
  const [selectedFeatures, setSelectedFeatures] = useState(['whatsapp', 'seo-analytics'])
  const [selectedTimeline, setSelectedTimeline] = useState('standard')

  // Handle category change (reset selected type to first available in category)
  const handleCategoryChange = (e) => {
    const newCatId = e.target.value
    setSelectedCategory(newCatId)
    const newCat = ESTIMATOR_CATEGORIES.find((c) => c.id === newCatId)
    if (newCat && newCat.types.length > 0) {
      setSelectedType(newCat.types[0].id)
    }
  }

  // Toggle feature selection
  const toggleFeature = (featId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featId) ? prev.filter((id) => id !== featId) : [...prev, featId]
    )
  }

  // Calculate live estimate dynamically
  const estimateResult = useMemo(() => {
    return calculateEstimate({
      categoryId: selectedCategory,
      typeId: selectedType,
      featureIds: selectedFeatures,
      timelineId: selectedTimeline,
    })
  }, [selectedCategory, selectedType, selectedFeatures, selectedTimeline])

  const handleSendEstimate = () => {
    const estimateData = {
      category: estimateResult.categoryLabel,
      type: estimateResult.typeLabel,
      features: selectedFeatures
        .map((fId) => ESTIMATOR_FEATURES.find((f) => f.id === fId)?.label)
        .filter(Boolean),
      timeline: estimateResult.timelineLabel,
      estimatedRange: estimateResult.formatted,
    }

    if (onSendRequirements) {
      onSendRequirements(estimateData)
    } else {
      // Direct WhatsApp link with prefilled estimate details
      const waLink = getWhatsAppLink({
        service: `${estimateData.category} - ${estimateData.type}`,
        budget: estimateData.estimatedRange,
        timeline: estimateData.timeline,
        description: `Selected Features: ${estimateData.features.join(', ')}`,
      })
      window.open(waLink, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className={styles.section} id="estimator">
      <div className={styles.container}>
        <div className={styles.twoColGrid}>
          {/* ─── LEFT COLUMN: SEO & ONLINE VISIBILITY ─── */}
          <div className={styles.leftCol}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>SEO &amp; ONLINE VISIBILITY</span>
            </div>
            <h2 className={styles.heading}>
              Help the <span className={styles.highlight}>right people</span> find
              your business.
            </h2>
            <p className={styles.subtext}>
              Improve your search visibility, ranking higher on Google to convert
              organic search traffic into paying customers.
            </p>

            <div className={styles.seoCardsList}>
              {SEO_SERVICES.map((seoItem) => {
                const IconComponent = SEO_ICONS[seoItem.id] || Search
                return (
                  <div key={seoItem.id} className={styles.seoCard}>
                    <div className={styles.seoCardHead}>
                      <div className={styles.seoIconBox}>
                        <IconComponent size={18} className={styles.seoIcon} />
                      </div>
                      <div className={styles.seoTitleGroup}>
                        <h3 className={styles.seoTitle}>{seoItem.title}</h3>
                        <span className={styles.seoPrice}>{seoItem.priceFormatted}</span>
                      </div>
                    </div>

                    <ul className={styles.deliverablesList}>
                      {seoItem.deliverables.map((del) => (
                        <li key={del} className={styles.deliverableItem}>
                          <Check size={13} className={styles.checkIcon} />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ─── RIGHT COLUMN: INTERACTIVE PROJECT ESTIMATOR ─── */}
          <div className={styles.rightCol}>
            <div className={styles.estimatorCard}>
              <div className={styles.estimatorHeader}>
                <div className={styles.estimatorBadge}>
                  <Calculator size={13} className={styles.calcIcon} />
                  <span>INTERACTIVE TOOL</span>
                </div>
                <h3 className={styles.estimatorTitle}>
                  Get an estimated starting price.
                </h3>
                <p className={styles.estimatorSub}>
                  Select your project parameters below to get a transparent
                  indicative budget range.
                </p>
              </div>

              {/* Form Controls */}
              <div className={styles.formRow}>
                <label className={styles.label}>Project Category</label>
                <div className={styles.selectWrapper}>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className={styles.selectInput}
                  >
                    {ESTIMATOR_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <label className={styles.label}>Project Type</label>
                <div className={styles.selectWrapper}>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className={styles.selectInput}
                  >
                    {currentCategoryObj.types.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label} (Base ₹{t.min.toLocaleString('en-IN')}+)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Required Features Multi-select Chips */}
              <div className={styles.formRow}>
                <label className={styles.label}>Key Features &amp; Add-ons</label>
                <div className={styles.chipsContainer}>
                  {ESTIMATOR_FEATURES.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat.id)
                    return (
                      <button
                        type="button"
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`${styles.featureChip} ${isSelected ? styles.chipSelected : ''}`}
                        aria-pressed={isSelected}
                      >
                        <span className={styles.chipCheck}>
                          {isSelected ? <Check size={11} /> : '+'}
                        </span>
                        <span>{feat.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Preferred Timeline */}
              <div className={styles.formRow}>
                <label className={styles.label}>Preferred Timeline</label>
                <div className={styles.selectWrapper}>
                  <select
                    value={selectedTimeline}
                    onChange={(e) => setSelectedTimeline(e.target.value)}
                    className={styles.selectInput}
                  >
                    {ESTIMATOR_TIMELINES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reactive Dynamic Price Box */}
              <div className={styles.priceEstimateBox}>
                <div className={styles.estimateLabelGroup}>
                  <span className={styles.estimateTitle}>Estimated Starting Price</span>
                  <span className={styles.scopeNotice}>Indicative estimate</span>
                </div>
                <div className={styles.estimateAmount}>{estimateResult.formatted}</div>
                <p className={styles.estimateDisclaimer}>
                  This is an indicative estimate. Final pricing depends on your exact
                  custom requirements, API scopes, and revisions.
                </p>

                <button
                  type="button"
                  onClick={handleSendEstimate}
                  className={styles.sendEstimateBtn}
                >
                  <span>Send Project Requirements</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
