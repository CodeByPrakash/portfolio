'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import LoadingScreen from '../components/LoadingScreen'

const Journey = dynamic(() => import('../components/Journey'), {
  ssr: true,
})
const Achievements = dynamic(() => import('../components/Achievements'), {
  ssr: true,
})
const Blog = dynamic(() => import('../components/Blog'), {
  ssr: true,
})
const Contact = dynamic(() => import('../components/Contact'), {
  ssr: true,
})
const Footer = dynamic(() => import('../components/Footer'), {
  ssr: true,
})

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Achievements />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
