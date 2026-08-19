'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import SEO from './SEO'
import { NOT_FOUND_PAGE_KEYWORDS } from '../utils/seoKeywords'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.pageWrap}>
      <SEO
        title="404 — Page Not Found | Om Prakash Behera"
        description="The requested page could not be found on Om Prakash Behera's portfolio. Explore featured AI, ML, and Full-Stack development projects."
        keywords={NOT_FOUND_PAGE_KEYWORDS}
        robots="noindex, follow"
      />
      <Navbar />
      
      <main className={styles.notFoundContainer}>
        {/* Floating 3D Clay Morphism Edge Geometrics */}
        <motion.div 
          className={`${styles.clayShape} ${styles.clayOrb1}`}
          animate={{ y: [0, -30, 0], rotate: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className={`${styles.clayShape} ${styles.clayTorus}`}
          animate={{ y: [0, 35, 0], rotate: [-15, 15, -15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div 
          className={`${styles.clayShape} ${styles.clayPill}`}
          animate={{ y: [0, -28, 0], rotate: [20, 45, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div 
          className={`${styles.clayShape} ${styles.clayCube}`}
          animate={{ y: [0, 26, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        <div className={`section-wrap ${styles.inner}`}>
          <div className={styles.bento}>
            {/* Top Display Cell */}
            <motion.div 
              className={styles.cellHero}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.badgeWrap}>
                <span className={styles.badge}>*404 ERROR // OUT OF BOUNDS</span>
                <span className={styles.statusDot} />
              </div>
              <h1 className={styles.errorCode}>404</h1>
              <h2 className={styles.errorTitle}>SYSTEM ERROR // PAGE NOT FOUND</h2>
              <p className={styles.errorDesc}>
                The requested endpoint or coordinate does not exist in this architecture. 
                You may have followed a broken link or entered an invalid URL path.
              </p>
            </motion.div>

            {/* Quick Action Bento Row */}
            <motion.div 
              className={styles.bentoRow}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className={`${styles.actionCard} ${styles.actionPrimary}`}>
                <span className={styles.cardTag}>01 // BASE COMMAND</span>
                <div className={styles.cardContent}>
                  <span className={styles.cardTitle}>← Return Home</span>
                  <span className={styles.cardSub}>Navigate back to primary portfolio overview</span>
                </div>
                <span className={styles.arrow}>↗</span>
              </Link>

              <Link href="/#projects" className={styles.actionCard}>
                <span className={styles.cardTag}>02 // INCUBATIONS</span>
                <div className={styles.cardContent}>
                  <span className={styles.cardTitle}>Explore Portfolio</span>
                  <span className={styles.cardSub}>View 12+ full-stack & AI engineering projects</span>
                </div>
                <span className={styles.arrow}>↗</span>
              </Link>

              <Link href="/#contact" className={styles.actionCard}>
                <span className={styles.cardTag}>03 // DIRECT LINK</span>
                <div className={styles.cardContent}>
                  <span className={styles.cardTitle}>Get In Touch</span>
                  <span className={styles.cardSub}>Send a message directly to Om Prakash</span>
                </div>
                <span className={styles.arrow}>↗</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
