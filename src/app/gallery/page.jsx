'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import TiltedTiles from '../../components/TiltedTiles'
import styles from './gallery.module.css'

// ── Placeholder images — swap these with your own ───────────────
const GALLERY_IMAGES = [
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547413/omprakash_mn.png',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547413/IMG_20260915_015543.jpg',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547413/ChatGPT_Image_Jul_11_2026_04_59_12_PM.png',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547414/IMG20260131160900.jpg',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548424/copy_of_snapchat-1712915960.jpg',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548538/IMG_20260615_181038_567.webp',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547436/IMG20260311201226.jpg',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547982/IMG-20260508-WA0016.jpg',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547413/omprakash_mn.png',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548246/IMG20260817121502.jpg',
  'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548665/Screenshot_2026-05-04_144051.png',
]

export default function GalleryPage() {
  const lenisRef = useRef(null)

  // ── Lenis smooth-scroll bootstrap ────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className={styles.page}>
      {/* ── Back Button ──────────────────────────────────── */}
      <Link href="/" className={styles.backBtn} aria-label="Back to Portfolio">
        <ArrowLeft size={18} />
        <span>Back</span>
      </Link>

      {/* ── Full-screen Tilted Tiles ──────────────────────── */}
      <TiltedTiles
        images={GALLERY_IMAGES}
        columns={16}
        tilesPerColumn={5}
        tileAspect={1}
        rowGap={8}
        columnGap={8}
        borderRadius={6}
        perspective={1600}
        rotateX={40}
        rotateY={16}
        rotateZ={-20}
        offsetX={-40}
        offsetY={0}
        offsetZ={0}
        planeWidth={280}
        planeHeight={260}
        stagger={20}
        duration={25}
        alternate={true}
        fadeTop={22}
        fadeBottom={0}
        parallax={true}
        parallaxStrength={8}
        pauseOnHover={false}
        saturation={1}
        width="100%"
        height="100%"
      />

      {/* ── Glass Info Card ──────────────────────────────── */}
      <div className={styles.glassCard}>
        <span className={styles.glassAccent}>Memories</span>
        <h2 className={styles.glassName}>OMPRAKASH</h2>
      </div>
    </div>
  )
}
