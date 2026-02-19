import styles from './About.module.css'

const tools = ['Figma','React','TypeScript','Node.js','CSS/Sass','Framer','Git','Tailwind', 'PHP', 'Python', 'Flask', 'mongoDB', 'mySQL', 'Streamlit', 'CANVA', 'BLENDER']

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="section-wrap">
        <span className="section-tag">◈ About me</span>

        <div className={styles.grid}>
          {/* Avatar card */}
          <div className={styles.avatarWrap}>
            <div className={styles.avatarCard}>
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>OPB</span>
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
                  <div className={styles.xpFill} style={{ width: '60%' }} />
                </div>
                <span className={styles.xpVal}>60%</span>
              </div>
            </div>
            {/* Floating info card */}
            <div className={styles.infoCard}>
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
            </div>
          </div>

          {/* Content */}
          <div className={styles.content}>
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

            {/* Toolkit */}
            <div className={styles.toolkit}>
              <span className={styles.toolkitLabel}>Toolkit</span>
              <div className={styles.toolList}>
                {tools.map(t => (
                  <span key={t} className={styles.tool}>{t}</span>
                ))}
              </div>
            </div>

            <a href="#contact" className="btn" style={{ marginTop: '.5rem' }}>
              Let's work together ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
