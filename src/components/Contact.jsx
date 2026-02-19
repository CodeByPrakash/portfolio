import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => {
    e.preventDefault()
    setSent(true)
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
            <div className={styles.availCard}>
              <span className={styles.availDot} />
              <div>
                <span className={styles.availTitle}>Available for Projects</span>
                <span className={styles.availSub}>Next availability: March 2026</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formWrap}>
            {sent ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>🎉</span>
                <h3>Message sent!</h3>
                <p>I'll get back to you within 24 hours.</p>
                <button className="btn" onClick={() => setSent(false)}>Send another</button>
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
                <button type="submit" className="btn btn-yellow" style={{ width: '100%', justifyContent: 'center' }}>
                  Send message ↗
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
