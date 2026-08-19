'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, slideIn } from '../utils/motion'
import styles from './Contact.module.css'

// ─────────────────────────────────────────────────────────────
// CONTACT FORM CONFIG

const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL ||
  process.env.VITE_WORKER_URL ||
  'https://portfolio-contact-api.omprakashbehera.workers.dev'

async function sendMessage(data) {
  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  let json
  try {
    json = await res.json()
  } catch {
    const text = await res.text()
    throw new Error(text || 'Invalid server response. Please try again.')
  }

  if (!res.ok || json.error) {
    throw new Error(json.error || json.message || 'Failed to send message')
  }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')
    try {
      await sendMessage(form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const channels = [
    {
      label: 'Email',
      val: 'omprakashbehera.cse@gmail.com',
      href: 'mailto:omprakashbehera.cse@gmail.com',
      color: 'orange',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      val: 'CodeByPrakash',
      href: 'https://github.com/CodeByPrakash',
      color: 'purple',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      val: '/in/omprakash-cse',
      href: 'https://linkedin.com/in/omprakash-cse',
      color: 'blue',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      val: '@quasar_om',
      href: 'https://instagram.com/quasar_om',
      color: 'red',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className={styles.contact}>
      {/* ─── Floating 3D Clay Morphism Edge Geometrics ─── */}
      <motion.div
        className={`${styles.clayShape} ${styles.clayOrb1}`}
        animate={{ y: [0, -28, 0], rotate: [0, 18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayTorus}`}
        animate={{ y: [0, 32, 0], rotate: [-10, 20, -10] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayPill}`}
        animate={{ y: [0, -35, 0], rotate: [25, 45, 25] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayCube}`}
        animate={{ y: [0, 26, 0], rotate: [-15, 5, -15], scale: [1, 0.96, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayMiniOrb}`}
        animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      <motion.div
        className={`section-wrap ${styles.innerWrap}`}
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>
          ✉ Direct Transmission
        </motion.span>

        <div className={styles.clayContainer}>
          {/* Left Panel: Information & Clay Capsules */}
          <motion.div className={styles.leftPanel} variants={slideIn('left', 0.1)}>
            <div className={styles.statusPill}>
              <span className={styles.statusDot} />
              <span>Available for Freelance &amp; Projects</span>
            </div>

            <h2 className={styles.heading}>
              Let's build<br />
              something<br />
              <span className={styles.accent}>great.</span>
            </h2>
            <p className={styles.sub}>
              Have an idea, an AI model in mind, or a scalable web app to build?
              Drop a message and let's craft an impactful digital experience together.
            </p>

            <motion.div
              className={styles.channels}
              variants={staggerContainer(0.06, 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
            >
              {channels.map(c => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`${styles.channelCard} ${styles[`card_${c.color}`]}`}
                  variants={fadeIn('left', 0)}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={styles.clayIconBox}>
                    {c.icon}
                  </div>
                  <div className={styles.chText}>
                    <span className={styles.chLabel}>{c.label}</span>
                    <span className={styles.chVal}>{c.val}</span>
                  </div>
                  <span className={styles.chArrow}>↗</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Panel: Claymorphic Form */}
          <motion.div className={styles.formPanel} variants={slideIn('right', 0.2)}>
            {status === 'sent' ? (
              <motion.div
                className={styles.successCard}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              >
                <div className={styles.successClayBadge}>🎉</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to your inbox within 24 hours.</p>
                <button className={`btn btn-accent ${styles.clayBtn}`} onClick={() => setStatus('idle')}>
                  Send Another Message ↗
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className={styles.form}>
                <div className={styles.formTitleGroup}>
                  <h3 className={styles.formTitle}>Send a Message</h3>
                  <span className={styles.formSub}>All fields are required</span>
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label className={styles.label}>Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="e.g. Alex Smith"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Your Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="alex@company.com"
                      required
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Project Scope / Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="Tell me about your project, timeline, and goals..."
                    rows={5}
                    required
                    className={styles.textarea}
                  />
                </div>

                {status === 'error' && (
                  <motion.div
                    className={styles.errorBanner}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ⚠ {errMsg}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className={`btn btn-accent ${styles.claySubmitBtn}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span className={styles.btnLoading}>
                      <span className={styles.spinner} /> Sending Message...
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className={styles.submitArrow}>↗</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
