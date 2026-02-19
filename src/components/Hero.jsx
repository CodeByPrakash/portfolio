import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* corner decorations */}
      <span className={`${styles.corner} ${styles.tl}`} />
      <span className={`${styles.corner} ${styles.tr}`} />
      <span className={`${styles.corner} ${styles.bl}`} />
      <span className={`${styles.corner} ${styles.br}`} />

      <div className={`section-wrap ${styles.inner}`}>
        {/* status badge */}
        <div className={styles.status}>
          <span className={styles.statusDot} />
          Available for work
        </div>

        {/* headline */}
        <h1 className={styles.headline}>
          <span className={styles.line1}>Building</span>
          <span className={styles.line2}>
            Intelligent <span className={styles.highlight}>Systems</span>
          </span>
          <span className={styles.line3}>For All.</span>
        </h1>

        <p className={styles.sub}>
          Computer Science Engineer building AI-driven systems.
          <br />From architecture to deployment — I create complete solutions.
        </p>

        {/* CTA */}
        <div className={styles.ctas}>
          <a href="#projects" className="btn">See my work ↓</a>
          <a href="#contact" className="btn btn-outline">Get in touch</a>
        </div>

        {/* stats row */}
        <div className={styles.stats}>
          {[
            { n: '3+', l: 'Years exp.' },
            { n: '30+', l: 'Projects' },
            { n: '99%', l: 'Student Satisfaction' },
          ].map(s => (
            <div key={s.l} className={styles.stat}>
              <span className={styles.statN}>{s.n}</span>
              <span className={styles.statL}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* floating badges */}
      <div className={styles.badge1}>
        <span className={styles.badgeIcon}>🚀</span>
        <span>Developer</span>
      </div>
      <div className={styles.badge3}>
        <span className={styles.badgeIcon}>💻</span>
        <span>AI Enthusiast</span>
      </div>
      <div className={styles.badge2}>
        <span className={styles.badgeIcon}>⚡</span>
        <span>React Expert</span>
      </div>
    </section>
  )
}
