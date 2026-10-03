'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import FlexCarousel from '../../components/FlexCarousel'
import styles from './gallery.module.css'

const GALLERY_ITEMS = [
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547413/omprakash_mn.png',
    alt: 'Omprakash Behera Portrait',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547413/IMG_20260915_015543.jpg',
    alt: 'Late Night Hackathon Sprint',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547413/ChatGPT_Image_Jul_11_2026_04_59_12_PM.png',
    alt: 'AI & Creative Concepts',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547414/IMG20260131160900.jpg',
    alt: 'Outreach & Community',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548424/copy_of_snapchat-1712915960.jpg',
    alt: 'Personal Journey',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548538/IMG_20260615_181038_567.webp',
    alt: 'Tech Summit & Presentations',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547436/IMG20260311201226.jpg',
    alt: 'Hardware & Prototyping',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789547982/IMG-20260508-WA0016.jpg',
    alt: 'Hackathon Team Spirit',

  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548246/IMG20260817121502.jpg',
    alt: 'Recognition & Awards',
  },
  {
    src: 'https://res.cloudinary.com/de1yp5y9e/image/upload/v1789548665/Screenshot_2026-05-04_144051.png',
    alt: 'Product Design & UI Craft',
  }
]

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      {/* ── Back Button ──────────────────────────────────── */}
      <Link href="/" className={styles.backBtn} aria-label="Back to Portfolio">
        <ArrowLeft size={18} />
        <span>Back</span>
      </Link>


      {/* ── FlexCarousel WebGL Carousel (Large Prominent Responsive Container) ── */}
      <div className={styles.carouselContainer}>
        <FlexCarousel
          items={GALLERY_ITEMS}
          preset="liquid"
          intro="rise"
          cardHeight={0.68}
          gap={20}
          squeeze={0.12}
          focusOnClick
          captions
          fit="natural"
          radius={4}
          lensWidth={0.76}
          lensHeight={1.12}
          tilt={48}
          roundness={1}
          bend={0.32}
          reach={0.36}
          curl="twist"
          dispersion={0.42}
          liquid={0.04}
          followCursor={false}
          autoplay={false}
          interval={4}
          captureWheel
        />
      </div>

      {/* ── Glass Info Card ──────────────────────────────── */}
      <div className={styles.glassCard}>
        <span className={styles.glassAccent}>Memories</span>
        <h2 className={styles.glassName}>OMPRAKASH</h2>
      </div>
    </div>
  )
}
