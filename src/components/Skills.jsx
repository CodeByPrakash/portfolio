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
      <div className="section-wrap">
        <span className="section-tag">⚔ Skills &amp; Abilities</span>
        <h2 className={styles.heading}>Character<br /><span className={styles.accent}>Stats.</span></h2>
        <p className={styles.sub}>
          Every project levels up my abilities. Here's the current skill tree.
        </p>

        <div className={styles.grid}>
          {categories.map(cat => (
            <div key={cat.title} className={`${styles.card} ${styles[`card_${cat.color}`]}`}>
              {/* Card header */}
              <div className={styles.cardHead}>
                <span className={styles.icon}>{cat.icon}</span>
                <span className={styles.catTitle}>{cat.title}</span>
                <span className={`${styles.levelPill} ${styles[`lp_${levelColors[cat.level]}`]}`}>
                  {cat.level}
                </span>
              </div>

              {/* Skill bars */}
              <div className={styles.bars}>
                {cat.skills.map(sk => (
                  <div key={sk.name} className={styles.barRow}>
                    <div className={styles.barMeta}>
                      <span className={styles.barName}>{sk.name}</span>
                      <span className={styles.barVal}>{sk.xp}</span>
                    </div>
                    <div className={styles.track}>
                      <div
                        className={`${styles.fill} ${styles[`fill_${cat.color}`]}`}
                        style={{ width: `${sk.xp}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
