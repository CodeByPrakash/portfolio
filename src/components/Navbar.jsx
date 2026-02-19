import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = ['About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo}>
          <span className={styles.logoBox}>OPB</span>
          <span className={styles.logoText}>OMPRAKASH BEHERA</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className={styles.link}>{l}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-yellow" style={{ padding: '.45rem 1.1rem', fontSize: '.85rem' }}>
              Hire me ↗
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button className={styles.ham} onClick={() => setOpen(o => !o)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className={styles.drawerLink}
               onClick={() => setOpen(false)}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  )
}
