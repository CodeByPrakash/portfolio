import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import styles from './Skills.module.css'

const categories = [
  {
    title: 'Design',
    icon: '🎨',
    color: 'yellow',
    level: 'INTERMEDIATE',
    skills: [
      { name: 'HTML & JS', xp: 98 },
      { name: 'CANVA', xp: 87 },
      { name: 'FIGMA', xp: 60 },
      { name: 'UI & UX', xp: 60 },
      { name: 'BLENDER', xp: 20 },
    ],
  },
  {
    title: 'Frontend',
    icon: '⚡',
    color: 'blue',
    level: 'PRO',
    skills: [
      { name: 'CSS / Sass', xp: 96 },
      { name: 'React', xp: 80 },
      { name: 'TypeScript', xp: 67 },
      { name: 'Animation', xp: 56 },
    ],
  },
  {
    title: 'Backend',
    icon: '🔧',
    color: 'red',
    level: 'ADVANCED',
    skills: [
      { name: 'Node.js', xp: 72 },
      { name: 'mongoDB', xp: 70 },
      { name: 'PostgreSQL', xp: 65 },
      { name: 'REST APIs', xp: 50 },
    ],
  },
  {
    title: 'Strategy',
    icon: '♟',
    color: 'purple',
    level: 'MASTER',
    skills: [
      { name: 'Agile / Scrum', xp: 85 },
      { name: 'Client comms', xp: 90 },
      { name: 'Accessibility', xp: 88 },
      { name: 'Performance', xp: 80 },
    ],
  },
]

const levelColors = { MASTER: 'yellow', INTERMEDIATE: 'blue', ADVANCED: 'red', PRO: 'purple' }

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      {/* Zigzag neural wire background */}
      <svg className={styles.wireBg} viewBox="0 0 1440 700" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="skillWire1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--yellow)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--yellow)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--red)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="skillWire2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--purple)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--purple)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Zigzag paths */}
        <polyline className={styles.wireZig} points="-20,100 180,180 320,80 500,200 680,100 860,220 1060,120 1240,200 1460,100" stroke="url(#skillWire1)" strokeWidth="1.2" strokeLinejoin="round" />
        <polyline className={styles.wireZig2} points="-20,500 200,420 380,560 560,440 740,580 920,460 1100,560 1300,440 1460,520" stroke="url(#skillWire2)" strokeWidth="1" strokeLinejoin="round" />
        <polyline className={styles.wireZig} points="200,180 200,420" stroke="url(#skillWire1)" strokeWidth="0.8" strokeDasharray="3 6" />
        <polyline className={styles.wireZig} points="680,100 680,580" stroke="url(#skillWire2)" strokeWidth="0.8" strokeDasharray="3 6" />
        <polyline className={styles.wireZig} points="1060,120 1060,560" stroke="url(#skillWire1)" strokeWidth="0.8" strokeDasharray="3 6" />
        {/* Node dots */}
        <circle cx="180" cy="180" r="3" fill="var(--yellow)" opacity="0.2" />
        <circle cx="500" cy="200" r="3" fill="var(--red)" opacity="0.18" />
        <circle cx="860" cy="220" r="3" fill="var(--yellow)" opacity="0.2" />
        <circle cx="560" cy="440" r="2.5" fill="var(--purple)" opacity="0.18" />
        <circle cx="920" cy="460" r="2.5" fill="var(--blue)" opacity="0.15" />
      </svg>

      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>⚔ Skills &amp; Abilities</motion.span>
        <motion.h2 className={styles.heading} variants={fadeIn('up', 0)}>
          Character<br /><span className={styles.accent}>Stats.</span>
        </motion.h2>
        <motion.p className={styles.sub} variants={fadeIn('up', 0)}>
          Every project levels up my abilities. Here's the current skill tree.
        </motion.p>

        <motion.div
          className={styles.grid}
          variants={staggerContainer(0.15, 0.2)}
        >
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className={`${styles.card} ${styles[`card_${cat.color}`]}`}
              variants={scaleIn(0)}
            >
              {/* Card header */}
              <div className={styles.cardHead}>
                <span className={styles.icon}>{cat.icon}</span>
                <span className={styles.catTitle}>{cat.title}</span>
                <motion.span
                  className={`${styles.levelPill} ${styles[`lp_${levelColors[cat.level]}`]}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 + catIdx * 0.1, type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {cat.level}
                </motion.span>
              </div>

              {/* Skill bars */}
              <div className={styles.bars}>
                {cat.skills.map((sk, skIdx) => (
                  <div key={sk.name} className={styles.barRow}>
                    <div className={styles.barMeta}>
                      <span className={styles.barName}>{sk.name}</span>
                      <span className={styles.barVal}>{sk.xp}</span>
                    </div>
                    <div className={styles.track}>
                      <motion.div
                        className={`${styles.fill} ${styles[`fill_${cat.color}`]}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sk.xp}%` }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + skIdx * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
