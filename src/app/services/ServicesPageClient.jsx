'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import TopModeSwitcher from '../../components/TopModeSwitcher'
import ServicesHero from '../../components/services/ServicesHero'
import WorkingApproach from '../../components/services/WorkingApproach'
import BusinessWebsites from '../../components/services/BusinessWebsites'
import WebsitePackages from '../../components/services/WebsitePackages'
import AIMLSection from '../../components/services/AIMLSection'
import DigitalDesign from '../../components/services/DigitalDesign'
import SEOAndEstimator from '../../components/services/SEOAndEstimator'
import HowProjectsWork from '../../components/services/HowProjectsWork'
import ServicesFAQ from '../../components/services/ServicesFAQ'
import ServicesContact from '../../components/services/ServicesContact'

const Footer = dynamic(() => import('../../components/Footer'), {
  ssr: true,
})

export default function ServicesPageClient() {
  const [prefilledData, setPrefilledData] = useState(null)

  const scrollToContact = (customData = null) => {
    if (customData) {
      setPrefilledData(customData)
    }

    const contactEl = document.getElementById('contact')
    if (contactEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(contactEl, { offset: -70, duration: 1.1 })
      } else {
        const top = contactEl.getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  const handleSelectService = (service) => {
    scrollToContact({
      service: service.title,
      budget: service.priceFormatted,
      description: `Inquiring about ${service.title} (${service.description})`,
    })
  }

  const handleSelectPackage = (pkg) => {
    scrollToContact({
      service: pkg.title,
      budget: pkg.priceFormatted,
      description: `Interested in the ${pkg.title} (${pkg.badge}). Deliverables include: ${pkg.deliverables.slice(0, 3).join(', ')}.`,
    })
  }

  const handleSendRequirements = (estimate) => {
    scrollToContact({
      service: `${estimate.category} - ${estimate.type}`,
      budget: estimate.estimatedRange,
      timeline: estimate.timeline,
      description: `Project Estimator Details:\nCategory: ${estimate.category}\nType: ${estimate.type}\nSelected Features: ${estimate.features.join(', ')}\nEstimated Budget: ${estimate.estimatedRange}`,
    })
  }

  return (
    <div style={{ background: '#FFF8EF', minHeight: '100vh', color: '#171512' }}>
      {/* 1. Top Mode Switcher (Personal ⇄ Business) */}
      <TopModeSwitcher forceMode="business" sticky />

      <main id="main-content">
        {/* 2. Hero Section */}
        <ServicesHero
          onExploreClick={() => {
            const el = document.getElementById('business-websites')
            if (el) {
              if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80, duration: 1.1 })
              else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
            }
          }}
          onDiscussClick={() => scrollToContact()}
        />

        {/* 3. Working Approach (Dark Section) */}
        <WorkingApproach />

        {/* 4. Business Website Solutions (5 Image Cards) */}
        <BusinessWebsites onSelectService={handleSelectService} />

        {/* 5. Website Development Packages (3 Pricing Tiers) */}
        <WebsitePackages onSelectPackage={handleSelectPackage} />

        {/* 6. AI & Machine Learning Solutions (Dark Section) */}
        <AIMLSection onSelectService={handleSelectService} />

        {/* 7. Digital Design Services (6 Thumbnail Cards) */}
        <DigitalDesign onSelectService={handleSelectService} />

        {/* 8. SEO & Interactive Project Estimator (2 Columns) */}
        <SEOAndEstimator onSendRequirements={handleSendRequirements} />

        {/* 9. Development Process (5-step Timeline) */}
        <HowProjectsWork />

        {/* 10. Frequently Asked Questions (2-column Accordion) */}
        <ServicesFAQ />

        {/* 11. Contact Section & Direct Communication Panels */}
        <ServicesContact prefilledData={prefilledData} />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  )
}
