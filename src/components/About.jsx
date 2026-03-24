import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, slideIn, popIn } from '../utils/motion'
import styles from './About.module.css'

const tools = ['Figma', 'React', 'TypeScript', 'Node.js', 'CSS/Sass', 'Framer', 'Git', 'Tailwind', 'PHP', 'Python', 'Flask', 'mongoDB', 'mySQL', 'Streamlit', 'CANVA', 'BLENDER']

export default function About() {
  return (
    <section id="about" className={styles.about}>
      {/* Circuit-node wire background */}
      <svg className={styles.wireBg} viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="aboutWire1" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--blue)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aboutWire2" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--yellow)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--yellow)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--yellow)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Horizontal circuit lines */}
        <path className={styles.wireLine} d="M0 200 H400 L440 240 H700 L740 200 H1440" stroke="url(#aboutWire1)" strokeWidth="1" />
        <path className={styles.wireLine} d="M0 550 H300 L330 520 H600 L630 550 H900 L930 520 H1440" stroke="url(#aboutWire1)" strokeWidth="1" strokeDasharray="6 10" />
        {/* Vertical connections */}
        <path className={styles.wireLineV} d="M440 0 V240" stroke="url(#aboutWire2)" strokeWidth="1" />
        <path className={styles.wireLineV} d="M740 200 V500" stroke="url(#aboutWire2)" strokeWidth="1" strokeDasharray="4 8" />
        <path className={styles.wireLineV} d="M330 520 V800" stroke="url(#aboutWire2)" strokeWidth="1" />
        {/* Junction dots */}
        <circle cx="440" cy="240" r="3.5" fill="var(--blue)" opacity="0.18" />
        <circle cx="740" cy="200" r="3.5" fill="var(--blue)" opacity="0.18" />
        <circle cx="330" cy="520" r="3" fill="var(--yellow)" opacity="0.2" />
        <circle cx="630" cy="550" r="3" fill="var(--yellow)" opacity="0.2" />
        <circle cx="930" cy="520" r="3" fill="var(--blue)" opacity="0.15" />
      </svg>

      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>◈ About me</motion.span>

        <div className={styles.grid}>
          {/* Avatar card — slides from left */}
          <motion.div className={styles.avatarWrap} variants={slideIn('left', 0.1)}>
            <div className={styles.avatarCard}>
              <div className={styles.avatar}>
                <img src="/admin.jpg" alt="Om Prakash Behera" className={styles.avatarImg} />
              </div>
              {/* Level badge */}
              <div className={styles.levelBadge}>
                <span className={styles.levelLabel}>LEVEL</span>
                <span className={styles.levelNum}>38</span>
              </div>
              {/* XP bar */}
              <div className={styles.xpRow}>
                <span className={styles.xpLabel}>XP</span>
                <div className={styles.xpTrack}>
                  <motion.div
                    className={styles.xpFill}
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <span className={styles.xpVal}>60%</span>
              </div>
            </div>
            {/* Floating info card */}
            <motion.div className={styles.infoCard} variants={fadeIn('up', 0.3)}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <span>Bhawanipatna, Odisha</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>🎓</span>
                <span>BTech in CSE</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>💼</span>
                <span>Open to freelance</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>🧑‍🎓</span>
                <span>Status: A Student</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content — slides from right */}
          <motion.div className={styles.content} variants={slideIn('right', 0.2)}>
            <h2 className={styles.heading}>
              Think, Learn <br />
              <span className={styles.accent}>Work..</span>
            </h2>
            <p className={styles.body}>
              I am a Computer Science diploma graduate and a hands-on developer who believes in building real,
              working systems rather than just learning theory. I enjoy designing practical solutions that solve
              real-world problems with clean structure, security, and scalability in mind.
            </p>
            <p className={styles.body}>
              My core interests lie in AI, automation, and intelligent system design.
              I have worked on projects such as multi-factor secure attendance systems (QR + BLE + biometric verification),
              face recognition-based applications, management systems, and AI-driven tools. I work with Python, React, PHP,
              Flask, SQL, and machine learning concepts to create full-stack, end-to-end solutions.
            </p>

            {/* Toolkit — stagger pop-in */}
            <div className={styles.toolkit}>
              <span className={styles.toolkitLabel}>Toolkit</span>
              <motion.div
                className={styles.toolList}
                variants={staggerContainer(0.04, 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
              >
                {tools.map(t => (
                  <motion.span key={t} className={styles.tool} variants={popIn(0)}>
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <a href="#contact" className="btn" style={{ marginTop: '.5rem' }}>
              Let's work together ↗
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
