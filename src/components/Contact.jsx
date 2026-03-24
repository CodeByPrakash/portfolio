import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, slideIn, scaleIn } from '../utils/motion'
import styles from './Contact.module.css'

// ─────────────────────────────────────────────────────────────
// CONTACT FORM CONFIG
const PROVIDER = 'demo'
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'
const FORMSPREE_URL = 'https://formspree.io/f/XXXXXX'

async function sendMessage(data) {
  if (PROVIDER === 'web3forms') {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...data }),
    })
    const json = await res.json()
    if (!res.ok || json.success === false) throw new Error(json.message || 'Failed')
    return
  }

  if (PROVIDER === 'formspree') {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to send')
    return
  }

  // demo — simulate a short delay then succeed
  await new Promise(r => setTimeout(r, 900))
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
    { icon: '✉', label: 'Email', val: 'omprakashbehera.cse@gmail.com' },
    { icon: '📱', label: 'Phone', val: '+91 7205252871' },
    { icon: '🐱', label: 'GitHub', val: 'CodeByPrakash' },
    { icon: '⚜️', label: 'Instagram', val: '@quasar_om' },
    { icon: '💼', label: 'LinkedIn', val: '/in/omprakash-cse' },
  ]

  return (
    <section id="contact" className={styles.contact}>
      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>✉ Contact</motion.span>

        <div className={styles.grid}>
          {/* Left — slides from left */}
          <motion.div className={styles.left} variants={slideIn('left', 0.1)}>
            <h2 className={styles.heading}>
              Let's build<br />
              something<br />
              <span className={styles.accent}>great.</span>
            </h2>
            <p className={styles.sub}>
              Whether it's a fresh product, a redesign, or freelance consulting —
              I'd love to hear about your project.
            </p>

            <motion.div
              className={styles.channels}
              variants={staggerContainer(0.07, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
            >
              {channels.map(c => (
                <motion.div key={c.label} className={styles.channel} variants={fadeIn('left', 0)}>
                  <span className={styles.chIcon}>{c.icon}</span>
                  <div>
                    <span className={styles.chLabel}>{c.label}</span>
                    <span className={styles.chVal}>{c.val}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form — slides from right */}
          <motion.div className={styles.formWrap} variants={slideIn('right', 0.2)}>
            {status === 'sent' ? (
              <motion.div
                className={styles.success}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <span className={styles.successIcon}>🎉</span>
                <h3>Message sent!</h3>
                <p>I'll get back to you within 24 hours.</p>
                <button className="btn" onClick={() => setStatus('idle')}>Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className={styles.form}>
                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="Your name"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="your@email.com"
                      required
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                    className={styles.textarea}
                  />
                </div>

                {/* Error banner */}
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
                  className="btn btn-yellow"
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? .65 : 1 }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message ↗'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
