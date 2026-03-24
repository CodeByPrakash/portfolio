import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Animated gradient wire lines background */}
      <svg className={styles.wireLines} viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wire1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--yellow)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--yellow)" stopOpacity="0.35" />
            <stop offset="70%" stopColor="var(--blue-light)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--blue-light)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wire2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--purple)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--purple)" stopOpacity="0.2" />
            <stop offset="60%" stopColor="var(--red)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--red)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wire3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--green)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wire4" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--yellow)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--yellow)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--purple)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main flowing curves */}
        <path className={styles.wirePath1} d="M-50 320 C200 280, 400 450, 720 350 S1100 200, 1500 380" stroke="url(#wire1)" strokeWidth="1.5" />
        <path className={styles.wirePath2} d="M-50 580 C250 500, 500 680, 800 520 S1150 400, 1500 600" stroke="url(#wire2)" strokeWidth="1.2" />
        <path className={styles.wirePath3} d="M1500 150 C1200 250, 900 100, 600 280 S200 400, -50 200" stroke="url(#wire3)" strokeWidth="1" />
        <path className={styles.wirePath4} d="M-50 750 C300 680, 550 820, 850 700 S1200 580, 1500 720" stroke="url(#wire4)" strokeWidth="1" />

        {/* Subtle connection dots at intersections */}
        <circle className={styles.wireDot} cx="720" cy="350" r="3" fill="var(--yellow)" opacity="0.3" />
        <circle className={styles.wireDot} cx="800" cy="520" r="2.5" fill="var(--purple)" opacity="0.25" />
        <circle className={styles.wireDot} cx="600" cy="280" r="2.5" fill="var(--green)" opacity="0.25" />
        <circle className={styles.wireDot} cx="850" cy="700" r="2" fill="var(--yellow)" opacity="0.2" />

        {/* Minimal floating geometric shapes */}
        {/* Rounded square — top right area */}
        <rect className={styles.geoShape1} x="1120" y="120" width="36" height="36" rx="8" fill="none" stroke="var(--yellow)" strokeWidth="1.5" opacity="0.22" />
        {/* Small rounded square — left */}
        <rect className={styles.geoShape2} x="100" y="480" width="24" height="24" rx="6" fill="none" stroke="var(--blue-light)" strokeWidth="1.5" opacity="0.18" />
        {/* Triangle — right mid */}
        <polygon className={styles.geoShape3} points="1300,500 1320,540 1280,540" fill="none" stroke="var(--purple)" strokeWidth="1.5" opacity="0.2" strokeLinejoin="round" />
        {/* Small triangle — top left */}
        <polygon className={styles.geoShape4} points="280,160 296,190 264,190" fill="none" stroke="var(--red)" strokeWidth="1.2" opacity="0.16" strokeLinejoin="round" />
        {/* Circle outline — bottom left */}
        <circle className={styles.geoShape5} cx="180" cy="720" r="16" fill="none" stroke="var(--green)" strokeWidth="1.2" opacity="0.18" />
        {/* Diamond — center right */}
        <polygon className={styles.geoShape6} points="1200,380 1216,400 1200,420 1184,400" fill="none" stroke="var(--yellow)" strokeWidth="1.2" opacity="0.2" strokeLinejoin="round" />
        {/* Tiny circle — top center */}
        <circle className={styles.geoShape7} cx="680" cy="100" r="10" fill="none" stroke="var(--blue-light)" strokeWidth="1" opacity="0.15" />
        {/* Cross/plus — bottom right */}
        <g className={styles.geoShape8} opacity="0.18">
          <line x1="1050" y1="680" x2="1050" y2="710" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1035" y1="695" x2="1065" y2="695" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>

      {/* corner decorations */}
      {['tl', 'tr', 'bl', 'br'].map((pos, i) => (
        <motion.span
          key={pos}
          className={`${styles.corner} ${styles[pos]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className={`section-wrap ${styles.inner}`}
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="show"
      >
        {/* status badge */}
        <motion.div className={styles.status} variants={fadeIn('down', 0)}>
          <span className={styles.statusDot} />
          Available for work
        </motion.div>

        {/* headline */}
        <h1 className={styles.headline}>
          <motion.span className={styles.line1} variants={fadeIn('up', 0)}>
            Building
          </motion.span>
          <motion.span className={styles.line2} variants={fadeIn('up', 0)}>
            Intelligent <span className={styles.highlight}>Systems</span>
          </motion.span>
          <motion.span className={styles.line3} variants={fadeIn('up', 0)}>
            For All.
          </motion.span>
        </h1>

        <motion.p className={styles.sub} variants={fadeIn('up', 0)}>
          Computer Science Engineer building AI-driven systems.
          <br />From architecture to deployment — I create complete solutions.
        </motion.p>

        {/* CTA */}
        <motion.div className={styles.ctas} variants={fadeIn('up', 0)}>
          <a href="#projects" className="btn">See my work ↓</a>
          <a href="#contact" className="btn btn-outline">Get in touch</a>
        </motion.div>

        {/* stats row */}
        <motion.div className={styles.stats} variants={fadeIn('up', 0)}>
          {[
            { n: '3+', l: 'Years exp.' },
            { n: '30+', l: 'Projects' },
            { n: '99%', l: 'Student Satisfaction' },
          ].map(s => (
            <motion.div
              key={s.l}
              className={styles.stat}
              variants={scaleIn(0)}
            >
              <span className={styles.statN}>{s.n}</span>
              <span className={styles.statL}>{s.l}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* floating badges — CSS handles the perpetual float, Framer does the entrance only */}
      <motion.div
        className={styles.badge1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
      >
        <span className={styles.badgeIcon}>🚀</span>
        <span>Developer</span>
      </motion.div>
      <motion.div
        className={styles.badge3}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
      >
        <span className={styles.badgeIcon}>💻</span>
        <span>AI Enthusiast</span>
      </motion.div>
      <motion.div
        className={styles.badge2}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5, ease: 'easeOut' }}
      >
        <span className={styles.badgeIcon}>⚡</span>
        <span>React Expert</span>
      </motion.div>
    </section>
  )
}
