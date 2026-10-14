'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DEVELOPMENT_PROCESS_STEPS } from '../../data/servicesData'
import styles from './HowProjectsWork.module.css'

export default function HowProjectsWork() {
  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>HOW PROJECTS WORK</span>
          </div>
          <h2 className={styles.heading}>
            A clear process from{' '}
            <span className={styles.highlight}>first conversation</span> to launch.
          </h2>
          <p className={styles.subtext}>
            The timeline begins after scope approval, required content, and initial
            payment are received.
          </p>
        </div>

        {/* 5-Step Timeline Grid */}
        <div className={styles.timelineGrid}>
          {DEVELOPMENT_PROCESS_STEPS.map((stepItem, idx) => (
            <motion.div
              key={stepItem.step}
              className={styles.stepCol}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              {/* Marker & Connector */}
              <div className={styles.markerTrack}>
                <div className={styles.markerCircle}>
                  <span>{stepItem.step}</span>
                </div>
                {idx < DEVELOPMENT_PROCESS_STEPS.length - 1 && (
                  <div className={styles.connectorLine} />
                )}
              </div>

              {/* Text Body */}
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{stepItem.title}</h3>
                <p className={styles.stepDesc}>{stepItem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
