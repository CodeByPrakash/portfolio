'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Layers } from 'lucide-react'
import { fadeIn, staggerContainer } from '../utils/motion'
import { PROJECTS_DATA } from '../data/projectsData'
import styles from './Projects.module.css'
import Antigravity from './Antigravity';

export default function Projects() {
  // Showcase only top 4 flagship projects on homepage
  const featuredProjects = PROJECTS_DATA.slice(0, 4)

  return (
    <section
      id="projects"
      className={styles.projects}
      aria-label="Portfolio — Engineering Projects Showcase"
    >
      {/* Interactive 3D Antigravity Particle Field Background */}
      <div className={styles.antigravityBg} aria-hidden="true">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#F97316"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <div className={`section-wrap ${styles.sectionWrap}`}>
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4 }}
        >
          ◉ Engineering Portfolio
        </motion.span>

        {/* Header */}
        <motion.div
          className={styles.headRow}
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2 className={styles.heading} variants={fadeIn('left', 0)}>
            <span className={styles.accent}>Pro</span>jects
          </motion.h2>

          <motion.div variants={fadeIn('right', 0.1)}>
            <Link
              href="/projects"
              className={styles.viewAllTopBtn}
              aria-label="View all projects in dedicated archive"
            >
              <Layers size={15} />
              <span>View All ({PROJECTS_DATA.length})</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Minimized Top 4 Project cards in a horizontal row */}
        <div className={styles.grid}>
          {featuredProjects.map((p) => (
            <motion.div
              key={p.id}
              className={`${styles.card} ${p.isCli ? styles.cardCliFeatured : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              {/* 1. Image */}
              <Link
                href={`/projects/${p.id}`}
                className={styles.imageContainer}
                aria-label={`View details for ${p.title}`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className={styles.projectImg}
                  loading="lazy"
                />
              </Link>

              {/* 2. Heading & 3. Button Details */}
              <div className={styles.cardInfo}>
                <div className={styles.headingWrapper}>
                  <span className={styles.categorySub}>{p.category}</span>
                  <h3 className={styles.projectHeading}>
                    <Link href={`/projects/${p.id}`} className={styles.titleLink}>
                      {p.title}
                    </Link>
                  </h3>
                </div>

                <Link
                  href={`/projects/${p.id}`}
                  className={styles.detailsBtn}
                  aria-label={`View details for ${p.title}`}
                >
                  <span>Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Single Clean View All Projects Button */}
        <motion.div
          className={styles.viewAllWrap}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.35 }}
        >
          <Link href="/projects" className={styles.viewAllMainBtn} aria-label="Open dedicated projects archive">
            <Sparkles size={16} />
            <span>View All Projects ({PROJECTS_DATA.length})</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
