'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { FAQS } from '../../data/servicesData'
import styles from './ServicesFAQ.module.css'

export default function ServicesFAQ() {
  const [openIndices, setOpenIndices] = useState([0]) // First item expanded by default

  const toggleFaq = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  // Split FAQs into two columns for desktop
  const midPoint = Math.ceil(FAQS.length / 2)
  const leftFaqs = FAQS.slice(0, midPoint)
  const rightFaqs = FAQS.slice(midPoint)

  const renderFaqItem = (faq, originalIdx) => {
    const isOpen = openIndices.includes(originalIdx)
    return (
      <div
        key={faq.question}
        className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ''}`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(originalIdx)}
          className={styles.faqQuestionBtn}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${originalIdx}`}
          id={`faq-btn-${originalIdx}`}
        >
          <span className={styles.questionText}>{faq.question}</span>
          <span className={`${styles.chevronWrapper} ${isOpen ? styles.chevronRotated : ''}`}>
            <ChevronDown size={18} />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-answer-${originalIdx}`}
              role="region"
              aria-labelledby={`faq-btn-${originalIdx}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={styles.faqAnswerWrapper}
            >
              <div className={styles.answerText}>{faq.answer}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className={styles.heading}>
            Everything you need to know{' '}
            <span className={styles.highlight}>before we start.</span>
          </h2>
          <p className={styles.subtext}>
            Transparent answers regarding development timelines, technical deliverables,
            pricing structures, and code ownership.
          </p>
        </div>

        {/* 2-Column Accordion */}
        <div className={styles.accordionTwoCol}>
          <div className={styles.column}>
            {leftFaqs.map((faq, idx) => renderFaqItem(faq, idx))}
          </div>
          <div className={styles.column}>
            {rightFaqs.map((faq, idx) => renderFaqItem(faq, midPoint + idx))}
          </div>
        </div>
      </div>
    </section>
  )
}
