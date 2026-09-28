'use client'

import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '../utils/motion'
import TechText from './TechText'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`section-wrap ${styles.inner}`}
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
      >
        {/* Top row */}
        <div className={styles.topRow}>
          <motion.div className={styles.left} variants={fadeIn('up', 0)}>
            <span className={styles.logo}>
              <span className={styles.logoBox}>OPB</span>
              OMPRAKASH BEHERA
            </span>
            <p className={styles.copy}>© 2026 OMPRAKASH BEHERA. All rights reserved.</p>
          </motion.div>

          <motion.div className={styles.center} variants={fadeIn('up', 0)}>
            <span className={styles.madeWith}>
              Made with <span style={{ color: 'var(--accent)' }}>♥</span> &amp; Next.js
            </span>
          </motion.div>

          <motion.div className={styles.right} variants={fadeIn('up', 0)}>
            {[
              { label: 'GitHub', href: 'https://github.com/CodeByPrakash' },
              { label: 'Instagram', href: 'https://instagram.com/quasar_om' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/omprakash-cse' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Big interactive TechText at bottom */}
        <motion.div
          className={styles.bigTextContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TechText
            text="PRAKASH"
            fontWeight={400}
            fontSize={240}
            reveal="letter"
            dashLength={5}
            dashGap={3}
            specks={20}
            fontFamily="Amiga, sans-serif"
            color="rgba(255, 255, 255, 0.2)"
            accentColor="#fb6600"
            letterSpacing={0.03}
            reach={220}
            softness={0.7}
            strokeWidth={1.8}
            speed={1}
            lineStyle="dashed"
            selection
            labels
            draggable
            sweep
          />
        </motion.div>
      </motion.div>
    </motion.footer>
  )
}
