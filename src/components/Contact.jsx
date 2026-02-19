import { useState } from 'react'
import styles from './Contact.module.css'

// ─────────────────────────────────────────────────────────────
// CONTACT FORM CONFIG
// Pick one provider, add your key/URL, set PROVIDER to match.
//
// Option A — Web3Forms (free 250 msgs/mo)
//   1. Go to https://web3forms.com → enter your email → copy key
//   2. Paste it below, set PROVIDER = 'web3forms'
//
// Option B — Formspree (free 50 msgs/mo)
//   1. Go to https://formspree.io → create form → copy endpoint
//   2. Paste it below, set PROVIDER = 'formspree'
//
// Option C — Demo mode (no real sending, UI only)
//   Set PROVIDER = 'demo'
// ─────────────────────────────────────────────────────────────
const PROVIDER         = 'demo'                           // 'web3forms' | 'formspree' | 'demo'
const WEB3FORMS_KEY    = 'YOUR_WEB3FORMS_ACCESS_KEY'      // only needed when PROVIDER = 'web3forms'
const FORMSPREE_URL    = 'https://formspree.io/f/XXXXXX'  // only needed when PROVIDER = 'formspree'

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
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
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

  return (
    <section id="contact" className={styles.contact}>
      <div className="section-wrap">
        <span className="section-tag">✉ Contact</span>

        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.left}>
            <h2 className={styles.heading}>
              Let's build<br />
              something<br />
              <span className={styles.accent}>great.</span>
            </h2>
            <p className={styles.sub}>
              Whether it's a fresh product, a redesign, or freelance consulting —
              I'd love to hear about your project.
            </p>

            <div className={styles.channels}>
              {[
                { icon: '✉', label: 'Email', val: 'omprakashbehera.cse@gmail.com' },
                { icon: '📱', label: 'Phone', val: '+91 7205252871' },
                { icon: '🐱', label: 'GitHub', val: 'CodeByPrakash' },
                { icon: '⚜️', label: 'Instagram', val: '@quasar_om' },
                { icon: '💼', label: 'LinkedIn', val: '/in/omprakash-cse' },
              ].map(c => (
                <div key={c.label} className={styles.channel}>
                  <span className={styles.chIcon}>{c.icon}</span>
                  <div>
                    <span className={styles.chLabel}>{c.label}</span>
                    <span className={styles.chVal}>{c.val}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability card */}
            {/* <div className={styles.availCard}>
              <span className={styles.availDot} />
              <div>
                <span className={styles.availTitle}>Available for Projects</span>
                <span className={styles.availSub}>Next availability: March 2026</span>
              </div>
            </div> */}
          </div>

          {/* Form */}
          <div className={styles.formWrap}>
            {status === 'sent' ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>🎉</span>
                <h3>Message sent!</h3>
                <p>I'll get back to you within 24 hours.</p>
                <button className="btn" onClick={() => setStatus('idle')}>Send another</button>
              </div>
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
                  <div className={styles.errorBanner}>⚠ {errMsg}</div>
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
          </div>
        </div>
      </div>
    </section>
  )
}
