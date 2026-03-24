import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '../utils/motion'
import styles from './Navbar.module.css'

const links = ['About', 'Skills', 'Projects', 'Journey', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <motion.a
          href="#hero"
          className={styles.logo}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className={styles.logoBox}>OPB</span>
          <span className={styles.logoText}>OMPRAKASH BEHERA</span>
        </motion.a>

        {/* Desktop links */}
        <motion.ul
          className={styles.links}
          variants={staggerContainer(0.08, 0.3)}
          initial="hidden"
          animate="show"
        >
          {links.map((l, i) => (
            <motion.li key={l} variants={fadeIn('down', 0)}>
              <a href={`#${l.toLowerCase()}`} className={styles.link}>{l}</a>
            </motion.li>
          ))}
          <motion.li variants={fadeIn('down', 0)}>
            <a href="#contact" className="btn btn-yellow" style={{ padding: '.45rem 1.1rem', fontSize: '.85rem' }}>
              Hire me ↗
            </a>
          </motion.li>
        </motion.ul>

        {/* Hamburger */}
        <button className={styles.ham} onClick={() => setOpen(o => !o)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          className={styles.drawer}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className={styles.drawerLink}
              onClick={() => setOpen(false)}>{l}</a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
