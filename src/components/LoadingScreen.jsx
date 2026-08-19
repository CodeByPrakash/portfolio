'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LoadingScreen.module.css'

const GREETINGS = [
  { text: 'Hii Prakash', lang: 'English', sub: 'EN' },
  { text: 'नमस्ते प्रकाश', lang: 'Hindi', sub: 'HI' },
  { text: 'Bonjour Prakash', lang: 'French', sub: 'FR' },
  { text: 'こんにちは Prakash', lang: 'Japanese', sub: 'JA' },
  { text: 'Hola Prakash', lang: 'Spanish', sub: 'ES' },
  { text: 'Ciao Prakash', lang: 'Italian', sub: 'IT' },
  { text: 'Hallo Prakash', lang: 'German', sub: 'DE' },
  { text: 'مرحباً Prakash', lang: 'Arabic', sub: 'AR' },
  { text: '你好 Prakash', lang: 'Chinese', sub: 'ZH' },
  { text: 'Olá Prakash', lang: 'Portuguese', sub: 'PT' },
  { text: '안녕하세요 Prakash', lang: 'Korean', sub: 'KO' },
  { text: 'Привет Prakash', lang: 'Russian', sub: 'RU' },
  { text: 'Hej Prakash', lang: 'Swedish', sub: 'SV' },
  { text: 'வணக்கம் Prakash', lang: 'Tamil', sub: 'TA' },
  { text: 'ନମସ୍କାର ପ୍ରକାଶ', lang: 'Welcome', sub: 'READY' },
]

const NAME_WORDS = ['OM', 'PRAKASH', 'BEHERA']

const STAGES = [
  { threshold: 0, step: '[ 01/04 ]', text: 'INITIALIZING ENVIRONMENT' },
  { threshold: 28, step: '[ 02/04 ]', text: 'COMPILING SYSTEM MODULES' },
  { threshold: 60, step: '[ 03/04 ]', text: 'CALIBRATING AI INTERFACES' },
  { threshold: 88, step: '[ 04/04 ]', text: 'FINALIZING PORTFOLIO ASSETS' },
  { threshold: 100, step: '[ 05/05 ]', text: 'SYSTEM READY — WELCOME' },
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [greetingIndex, setGreetingIndex] = useState(0)
  const animationFrameRef = useRef(null)

  // Multilingual greeting rotation synced with loading progress
  useEffect(() => {
    const totalGreetings = GREETINGS.length
    const computedIndex = Math.min(
      totalGreetings - 1,
      Math.floor((progress / 100) * totalGreetings)
    )
    setGreetingIndex(computedIndex)
  }, [progress])

  // Smooth loading progression loop (~5.2s duration to enjoy all language greetings)
  useEffect(() => {
    let startTimestamp = null
    const targetDuration = 5200

    const updateProgress = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp
      const progressRatio = Math.min(elapsed / targetDuration, 1)

      // Custom easing curve: smooth start, steady mid pace, cinematic deceleration into 100
      let easedValue
      if (progressRatio < 0.25) {
        easedValue = (progressRatio / 0.25) * 32
      } else if (progressRatio < 0.65) {
        const midRatio = (progressRatio - 0.25) / 0.4
        easedValue = 32 + midRatio * 44
      } else if (progressRatio < 0.9) {
        const lateRatio = (progressRatio - 0.65) / 0.25
        easedValue = 76 + lateRatio * 20
      } else if (progressRatio < 0.98) {
        const finalRatio = (progressRatio - 0.9) / 0.08
        easedValue = 96 + finalRatio * 3
      } else {
        easedValue = 100
      }

      const currentInt = Math.min(100, Math.floor(easedValue))
      setProgress(currentInt)

      if (progressRatio < 1) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      } else {
        setProgress(100)
        setTimeout(() => {
          setIsFinished(true)
        }, 400)
      }
    }

    animationFrameRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Allow skip via keyboard (Escape, Space, or Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        setProgress(100)
        setIsFinished(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const currentStage = STAGES.slice().reverse().find(s => progress >= s.threshold) || STAGES[0]
  const currentGreeting = GREETINGS[greetingIndex] || GREETINGS[0]

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          className={styles.loaderWrap}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Smooth curtain wipe curve
            },
          }}
        >
          {/* Top Bar */}
          <div className={styles.topBar}>
            <motion.div
              className={styles.brandTag}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className={styles.brandBadge}>OPB</span>
              <span>PORTFOLIO // ©2026</span>
            </motion.div>

            <motion.div
              className={styles.metaInfo}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <span className={styles.livePulse} />
              <span>ODISHA, IN • 20.2961° N</span>
            </motion.div>
          </div>

          {/* Center Content: Multilingual Hello Greeting + Bold Name */}
          <div className={styles.centerContent}>
            {/* Dynamic Multilingual Hello Greeting Box */}
            <motion.div
              className={styles.greetingBox}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className={styles.greetingDot} />
              <div className={styles.greetingTicker}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentGreeting.text}
                    className={styles.greetingText}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    {currentGreeting.text}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className={styles.greetingLangBadge}>
                {currentGreeting.lang}
              </span>
            </motion.div>

            {/* Bold Name with Animated Characters */}
            <div className={styles.nameTitle} role="heading" aria-level={2} aria-label="OMPRAKASH BEHERA">
              {NAME_WORDS.map((word, wordIndex) => (
                <span key={wordIndex} className={styles.nameWord}>
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className={styles.nameChar}
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + (wordIndex * 0.12) + (charIndex * 0.035),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>

            <motion.div
              className={styles.subtitleWrapper}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className={styles.roleTag}>
                COMPUTER SCIENCE ENGINEER • AI SYSTEMS
              </span>
            </motion.div>

            <motion.button
              type="button"
              className={styles.skipHint}
              onClick={() => {
                setProgress(100)
                setIsFinished(true)
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              [ Press Space or Click to Skip ]
            </motion.button>
          </div>

          {/* Bottom Bar: Status on Left, Bold Percentage on Right */}
          <div className={styles.bottomBar}>
            {/* Bottom Left: Loading Phase Status */}
            <div className={styles.statusLeft}>
              <span className={styles.stepCounter}>{currentStage.step}</span>
              <motion.span
                key={currentStage.text}
                className={styles.statusMessage}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentStage.text}
              </motion.span>
            </div>

            {/* Bottom Right: Smooth Percentage Counter & Progress Line */}
            <div className={styles.percentRight}>
              <div className={styles.percentNumber}>
                <span>{String(progress).padStart(2, '0')}</span>
                <span className={styles.percentSymbol}>%</span>
              </div>
              <div
                className={styles.progressBarTrack}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
