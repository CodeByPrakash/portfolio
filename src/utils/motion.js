// ─── Reusable Framer Motion Variants ───────────────────────

/** Fade in from a direction */
export const fadeIn = (direction = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.5,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
})

/** Stagger container — orchestrates children */
export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
})

/** Scale in with fade */
export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay,
    },
  },
})

/** Slide in from off-screen */
export const slideIn = (direction = 'left', delay = 0) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -80 : direction === 'right' ? 80 : 0,
    y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
      delay,
    },
  },
})

/** Pop effect for pills/badges */
export const popIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 15,
      delay,
    },
  },
})

/** Float animation — perpetual bobbing (use with animate directly) */
export const floatAnimation = (delay = 0) => ({
  y: [0, -12, 0],
  transition: {
    duration: 3.5,
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'easeInOut',
    delay,
  },
})
