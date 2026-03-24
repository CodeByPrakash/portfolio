import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { fadeIn, staggerContainer } from '../utils/motion'
import styles from './Journey.module.css'

const milestones = [
    {
        year: '2020',
        title: '🎓 Started Diploma in CSE',
        desc: 'Began my Computer Science journey — learned programming fundamentals, C, and basic web development.',
        side: 'left',
        color: 'blue',
    },
    {
        year: '2021',
        title: '💻 First Real Project',
        desc: 'Built my first full project — a Student Management System using Microsoft Access. Fell in love with building things.',
        side: 'right',
        color: 'yellow',
    },
    {
        year: '2022',
        title: '🌐 Web Development Deep Dive',
        desc: 'Mastered HTML, CSS, JavaScript, PHP, and MySQL. Built the Odisha Tourist Management System and Computer Lab Management System.',
        side: 'left',
        color: 'green',
    },
    {
        year: '2023',
        title: '⚛️ React & Modern Stack',
        desc: 'Transitioned to modern frameworks — React, Next.js, Tailwind. Built GCEK Vendor, a community rental platform.',
        side: 'right',
        color: 'purple',
    },
    {
        year: '2024',
        title: '🤖 AI & Machine Learning',
        desc: 'Explored AI/ML with Python, Flask, and Streamlit. Created Movie & Medicine Recommender Systems using real ML models.',
        side: 'left',
        color: 'red',
    },
    {
        year: '2025',
        title: '🚀 Full-Stack & Beyond',
        desc: 'Building complete systems — from hand gesture controllers to DNS switchers. Currently pursuing BTech and open for freelance.',
        side: 'right',
        color: 'yellow',
    },
    {
        year: '2026',
        title: '🔮 The Road Ahead',
        desc: 'Focusing on AI-driven systems, secure architectures, and impactful products. The best is yet to come.',
        side: 'left',
        color: 'blue',
    },
]

const TOTAL = milestones.length

function MilestoneCard({ m, index, active }) {
    return (
        <motion.div
            className={`${styles.milestone} ${styles[m.side]}`}
            initial={{ opacity: 0, x: m.side === 'left' ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 18 }}
        >
            {/* Dot */}
            <div className={styles.dot}>
                <div
                    className={styles.dotInner}
                    style={{
                        background: active ? `var(--${m.color})` : '#999',
                        boxShadow: active
                            ? `0 0 0 4px var(--${m.color}-pale), 0 0 14px var(--${m.color})`
                            : '0 0 0 3px rgba(0,0,0,.08)',
                        transition: 'background 0.4s, box-shadow 0.5s',
                    }}
                />
            </div>

            {/* Card */}
            <div
                className={styles.card}
                style={{
                    background: active ? `var(--${m.color}-pale)` : '#e8e6e2',
                    color: active ? 'var(--ink)' : '#aaa',
                    boxShadow: active ? 'var(--shadow-md)' : '4px 4px 0 rgba(0,0,0,.08)',
                    transition: 'background 0.5s, color 0.5s, box-shadow 0.5s',
                }}
            >
                <span className={styles.year}>{m.year}</span>
                <h3 className={styles.cardTitle} style={{ color: active ? 'var(--ink)' : '#bbb', transition: 'color 0.5s' }}>{m.title}</h3>
                <p className={styles.cardDesc} style={{ color: active ? 'var(--ink-light)' : '#b0b0b0', transition: 'color 0.5s' }}>{m.desc}</p>
            </div>
        </motion.div>
    )
}

export default function Journey() {
    const containerRef = useRef(null)
    const [activeCount, setActiveCount] = useState(0)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80%', 'end 20%'],
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1])

    // Track how many milestones the line has reached
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        // Each milestone activates at evenly spaced thresholds
        const count = Math.ceil(v * TOTAL)
        setActiveCount(count)
    })

    return (
        <section id="journey" className={styles.journey} ref={containerRef}>
            <motion.div
                className="section-wrap"
                variants={staggerContainer(0.1, 0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.05 }}
            >
                <motion.span className="section-tag" variants={fadeIn('down', 0)}>
                    ✦ Journey
                </motion.span>
                <motion.h2 className={styles.heading} variants={fadeIn('up', 0)}>
                    My <span className={styles.accent}>Path.</span>
                </motion.h2>
                <motion.p className={styles.sub} variants={fadeIn('up', 0)}>
                    From first lines of code to building intelligent systems — here's where the road has taken me.
                </motion.p>
            </motion.div>

            <div className={`section-wrap ${styles.timeline}`}>
                <div className={styles.lineTrack}>
                    <motion.div
                        className={styles.lineFill}
                        style={{ height: lineHeight, opacity: glowOpacity }}
                    />
                </div>

                {milestones.map((m, i) => (
                    <MilestoneCard
                        key={m.year}
                        m={m}
                        index={i}
                        active={i < activeCount}
                    />
                ))}
            </div>
        </section>
    )
}
