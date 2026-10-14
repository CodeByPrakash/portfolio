'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WORKING_APPROACH_STEPS } from '../../data/servicesData'
import styles from './WorkingApproach.module.css'

export default function WorkingApproach() {
  return (
    <section className={styles.section} id="approach">
      <div className={styles.container}>
        <motion.div
          className={styles.darkBanner}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.leftHead}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                <span>WORKING APPROACH</span>
              </div>
              <h2 className={styles.heading}>
                More than code.{' '}
                <span className={styles.highlight}>A solution</span> built around
                your <span className={styles.highlight}>goals.</span>
              </h2>
            </div>
            <p className={styles.subtext}>
              I follow a clear and collaborative process to make sure the final
              product is useful, scalable, and aligned with your business goals.
            </p>
          </div>

          {/* Steps Track with Connector Lines */}
          <div className={styles.stepsGrid}>
            {WORKING_APPROACH_STEPS.map((stepItem, idx) => (
              <div key={stepItem.step} className={styles.stepCard}>
                {/* Number Circle and Horizontal Connector Line */}
                <div className={styles.stepTrack}>
                  <div className={styles.stepCircle}>
                    <span>{stepItem.step}</span>
                  </div>
                  {idx < WORKING_APPROACH_STEPS.length - 1 && (
                    <div className={styles.connectorLine} />
                  )}
                </div>

                {/* Step Content */}
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{stepItem.title}</h3>
                  <p className={styles.stepDesc}>{stepItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
