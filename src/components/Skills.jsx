'use client'

import { motion } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiHtml5,
  SiCss,
  SiFigma,
  SiVercel,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiNodedotjs,
  SiFastapi,
  SiFlask,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiLinux,
  SiPostman,
  SiBlender,
} from 'react-icons/si'
import { fadeIn, staggerContainer, scaleIn } from '../utils/motion'
import LogoLoop from './LogoLoop'
import styles from './Skills.module.css'

const frontendStack = [
  { node: <SiReact color="#61DAFB" />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript color="#3178C6" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiJavascript color="#F7DF1E" />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiTailwindcss color="#06B6D4" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiFramer color="#0055FF" />, title: 'Framer Motion', href: 'https://www.framer.com/motion/' },
  { node: <SiHtml5 color="#E34F26" />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiCss color="#1572B6" />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { node: <SiFigma color="#F24E1E" />, title: 'Figma', href: 'https://www.figma.com' },
  { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
]

const backendAiStack = [
  { node: <SiPython color="#3776AB" />, title: 'Python', href: 'https://www.python.org' },
  { node: <SiTensorflow color="#FF6F00" />, title: 'TensorFlow', href: 'https://www.tensorflow.org' },
  { node: <SiPytorch color="#EE4C2C" />, title: 'PyTorch', href: 'https://pytorch.org' },
  { node: <SiOpencv color="#5C3EE8" />, title: 'OpenCV', href: 'https://opencv.org' },
  { node: <SiScikitlearn color="#F7931E" />, title: 'Scikit-Learn', href: 'https://scikit-learn.org' },
  { node: <SiNodedotjs color="#5FA04E" />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiFastapi color="#009688" />, title: 'FastAPI', href: 'https://fastapi.tiangolo.com' },
  { node: <SiFlask />, title: 'Flask', href: 'https://flask.palletsprojects.com' },
  { node: <SiPostgresql color="#4169E1" />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiMongodb color="#47A248" />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiDocker color="#2496ED" />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiGit color="#F05032" />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiLinux color="#FCC624" />, title: 'Linux', href: 'https://www.kernel.org' },
  { node: <SiPostman color="#FF6C37" />, title: 'Postman', href: 'https://www.postman.com' },
  { node: <SiBlender color="#EA7600" />, title: 'Blender', href: 'https://www.blender.org' },
]

const categories = [
  {
    title: 'Design',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    color: 'orange',
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" x2="10" y1="4" y2="20" />
      </svg>
    ),
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
    color: 'green',
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
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

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      {/* Floating 3D Clay Morphism Edge Geometrics */}
      <div className={`${styles.clayShape} ${styles.clayShapeTorus} ${styles.clayFloat1}`} />
      <div className={`${styles.clayShape} ${styles.clayShapeOrb} ${styles.clayFloat2}`} />
      <div className={`${styles.clayShape} ${styles.clayShapeCapsule} ${styles.clayFloat3}`} />

      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
      >
        <motion.span className="section-tag" variants={fadeIn('down', 0)}>
          ⚔ Skills &amp; Abilities
        </motion.span>

        {/* Section heading */}
        <motion.h2 className={styles.sectionHeading} variants={fadeIn('up', 0)}>
          <span className={styles.accent}>Character</span> Stats
        </motion.h2>

        {/* Bento wrapper */}
        <div className={styles.bentoWrap}>
          {/* Dual-Row Infinite Tech Logo Marquee */}
          <motion.div
            className={styles.tickerContainer}
            variants={scaleIn(0)}
            aria-label="Core Technologies & Frameworks"
          >
            <div className={styles.tickerHeader}>
              <span className={styles.tickerBadge}>*Interactive Tech Arsenal</span>
              <span className={styles.tickerHint}>Hover to inspect • Click to explore docs</span>
            </div>

            {/* Row 1: Frontend, Languages & UI (Flows Left) */}
            <LogoLoop
              logos={frontendStack}
              speed={60}
              direction="left"
              logoHeight={24}
              gap={32}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              ariaLabel="Frontend & UI Technologies"
              renderItem={(item) => (
                <div className={styles.techPill}>
                  <span className={styles.techIcon}>{item.node}</span>
                  <span className={styles.techTitle}>{item.title}</span>
                </div>
              )}
            />

            {/* Row 2: AI/ML, Backend, Databases & DevOps (Flows Right) */}
            <LogoLoop
              logos={backendAiStack}
              speed={55}
              direction="right"
              logoHeight={24}
              gap={32}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              ariaLabel="AI, Backend & Cloud Technologies"
              renderItem={(item) => (
                <div className={styles.techPill}>
                  <span className={styles.techIcon}>{item.node}</span>
                  <span className={styles.techTitle}>{item.title}</span>
                </div>
              )}
            />
          </motion.div>

          {/* Character Skills Grid */}
          <motion.div
            className={styles.grid}
            variants={staggerContainer(0.15, 0.2)}
          >
            {categories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                className={styles.card}
                variants={scaleIn(0)}
              >
                {/* Card header */}
                <div className={styles.cardHead}>
                  <span className={`${styles.icon} ${styles[`icon_${cat.color}`]}`}>
                    {cat.icon}
                  </span>
                  <span className={styles.catTitle}>{cat.title}</span>
                  <motion.span
                    className={`${styles.levelPill} ${styles[`lp_${cat.color}`]}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
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
                          viewport={{ once: true }}
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
        </div>
      </motion.div>
    </section>
  )
}
