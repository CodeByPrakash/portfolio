import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`section-wrap ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.logo}>
            <span className={styles.logoBox}>OPB</span>
            OMPRAKASH BEHERA
          </span>
          <p className={styles.copy}>© 2026 OMPRAKASH BEHERA. All rights reserved.</p>
        </div>

        <div className={styles.center}>
          <span className={styles.madeWith}>
            Made with <span style={{ color: 'var(--red)' }}>♥</span> &amp; React
          </span>
        </div>

        <div className={styles.right}>
          {[
            { label: 'GitHub',   href: 'https://github.com/CodeByPrakash' },
            { label: 'Instagram', href: 'https://instagram.com/quasar_om' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/omprakash-cse' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
