'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Mail,
  Send,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import {
  CONTACT_CONFIG,
  getWhatsAppLink,
  getMailtoLink,
} from '../../data/servicesData'
import styles from './ServicesContact.module.css'

export default function ServicesContact({ prefilledData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Business Website',
    budget: '₹5,000 – ₹10,000',
    timeline: '2–3 weeks',
    description: '',
  })

  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  // Sync prefilled data if passed from Estimator or Service Card
  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        service: prefilledData.service || prefilledData.category || prev.service,
        budget: prefilledData.estimatedRange || prefilledData.budget || prev.budget,
        timeline: prefilledData.timeline || prev.timeline,
        description: prefilledData.description
          ? `${prev.description ? prev.description + '\n' : ''}${prefilledData.description}`
          : prev.description,
      }))
    }
  }, [prefilledData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const payload = {
      name: formData.name,
      email: formData.email,
      service: formData.service,
      budget: formData.budget,
      timeline: formData.timeline,
      message: `[Services & Pricing Enquiry]\nService: ${formData.service}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nDescription: ${formData.description}`,
    }

    try {
      const response = await fetch(CONTACT_CONFIG.workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let json
      try {
        json = await response.json()
      } catch {
        json = null
      }

      if (!response.ok || (json && json.error)) {
        throw new Error(
          json?.error || json?.message || `Server responded with status ${response.status}`
        )
      }

      setStatus('success')
    } catch (err) {
      setErrorMessage(
        err.message || 'Unable to submit enquiry directly to the API endpoint.'
      )
      setStatus('error')
    }
  }

  // Pre-calculated direct link URLs
  const directWhatsAppUrl = getWhatsAppLink({
    service: formData.service,
    name: formData.name,
    budget: formData.budget,
    timeline: formData.timeline,
    description: formData.description,
  })

  const directMailtoUrl = getMailtoLink({
    service: formData.service,
    name: formData.name,
    budget: formData.budget,
    timeline: formData.timeline,
    description: formData.description,
  })

  return (
    <section className={styles.section} id="contact">
      {/* Decorative Warm Ambient Geometry */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.geometricPattern} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>START A PROJECT</span>
          </div>
          <h2 className={styles.heading}>
            Have an idea?{' '}
            <span className={styles.highlight}>Let&apos;s build</span> something
            useful.
          </h2>
          <p className={styles.subtext}>
            Tell me what you&apos;re trying to build, improve, or automate. I&apos;ll
            review the requirements and help define the next steps.
          </p>
        </div>

        {/* 3 Panels Layout */}
        <div className={styles.panelsGrid}>
          {/* Panel 1: WhatsApp Instant Connect */}
          <div className={styles.channelCard}>
            <div className={styles.channelTop}>
              <div className={`${styles.channelIconBox} ${styles.waIconBox}`}>
                <MessageCircle size={24} className={styles.waIcon} />
              </div>
              <span className={styles.fastResponseBadge}>Fastest Response</span>
            </div>

            <h3 className={styles.channelTitle}>Chat on WhatsApp</h3>
            <p className={styles.channelDesc}>
              Ideal for rapid scoping, initial questions, or quick milestone queries.
              Typically reply within 1–2 hours.
            </p>

            <div className={styles.channelMeta}>
              <span className={styles.metaLabel}>Configured Channel:</span>
              <span className={styles.metaValue}>WhatsApp Direct Line</span>
            </div>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waButton}
            >
              <span>Open WhatsApp Chat</span>
              <ExternalLink size={15} />
            </a>
          </div>

          {/* Panel 2: Direct Email Inquiry */}
          <div className={styles.channelCard}>
            <div className={styles.channelTop}>
              <div className={`${styles.channelIconBox} ${styles.emailIconBox}`}>
                <Mail size={24} className={styles.emailIcon} />
              </div>
              <span className={styles.emailBadge}>Official Proposals</span>
            </div>

            <h3 className={styles.channelTitle}>Direct Email</h3>
            <p className={styles.channelDesc}>
              Send detailed project RFPs, architectural documents, or formal business inquiries.
              Expect a line-item reply within 24 hours.
            </p>

            <div className={styles.channelMeta}>
              <span className={styles.metaLabel}>Direct Inbox:</span>
              <span className={styles.metaValue}>{CONTACT_CONFIG.email}</span>
            </div>

            <a href={directMailtoUrl} className={styles.emailButton}>
              <span>Send via Email</span>
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Panel 3: Structured Project Enquiry Form */}
          <div className={styles.formPanel}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Project Enquiry Form</h3>
              <span className={styles.formSub}>
                Fill in details to receive a customized milestone proposal
              </span>
            </div>

            {status === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIconWrapper}>
                  <CheckCircle2 size={36} className={styles.successIcon} />
                </div>
                <h4 className={styles.successHeading}>Enquiry Received!</h4>
                <p className={styles.successMsg}>
                  Thank you, <strong>{formData.name}</strong>. Your project specifications have
                  been dispatched. I will review the scope and reply to{' '}
                  <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle')
                    setFormData({
                      name: '',
                      email: '',
                      service: 'Business Website',
                      budget: '₹5,000 – ₹10,000',
                      timeline: '2–3 weeks',
                      description: '',
                    })
                  }}
                  className={styles.resetBtn}
                >
                  Send Another Project Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.enquiryForm}>
                <div className={styles.formRowTwo}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Work Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formRowTwo}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Service Scope *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={styles.formSelect}
                    >
                      <option value="Business Website">Business Website (Real Estate, Hotel, Cafe)</option>
                      <option value="React / Next.js Web App">React / Next.js Web App</option>
                      <option value="Custom Full-Stack App">Custom Full-Stack Application</option>
                      <option value="AI Assistant / LLM System">Custom AI Assistant / LLM</option>
                      <option value="Machine Learning Model">Machine Learning Model</option>
                      <option value="Workflow Automation">Business Process Automation</option>
                      <option value="Digital & UI/UX Design">Digital &amp; UI/UX Design</option>
                      <option value="SEO & Search Growth">SEO &amp; Search Visibility</option>
                      <option value="Custom Scoped Project">Other Custom Scoped Project</option>
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Target Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={styles.formSelect}
                    >
                      <option value="₹3,000 – ₹5,000">₹3,000 – ₹5,000 (Starter)</option>
                      <option value="₹5,000 – ₹10,000">₹5,000 – ₹10,000 (Standard)</option>
                      <option value="₹10,000 – ₹20,000">₹10,000 – ₹20,000 (Pro)</option>
                      <option value="₹20,000+">₹20,000+ (Enterprise / Full Suite)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Target Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className={styles.formSelect}
                  >
                    <option value="Urgent (< 1 week)">Rush / Urgent (&lt; 1 week)</option>
                    <option value="2–3 weeks">Standard (2–3 weeks)</option>
                    <option value="1+ month">Flexible (1+ month)</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Project Description &amp; Goals *</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe what your business does, key features needed, and desired launch date..."
                    className={styles.formTextarea}
                  />
                </div>

                {status === 'error' && (
                  <div className={styles.errorNotice}>
                    <AlertCircle size={18} className={styles.errorIcon} />
                    <div className={styles.errorTextGroup}>
                      <span>{errorMessage}</span>
                      <div className={styles.errorFallbacks}>
                        <span>Direct alternatives:</span>
                        <a
                          href={directWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.errorLink}
                        >
                          Send via WhatsApp ↗
                        </a>
                        <span>·</span>
                        <a href={directMailtoUrl} className={styles.errorLink}>
                          Send via Email ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={styles.submitBtn}
                >
                  {status === 'submitting' ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Project Enquiry</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
