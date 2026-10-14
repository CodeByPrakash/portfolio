import React from 'react'
import ServicesPageClient from './ServicesPageClient'

export const metadata = {
  title: 'Web Development, AI & Digital Solutions | Prakash',
  description:
    'Explore website development, business digitalization, custom AI, machine learning, SEO, and digital design services by Prakash.',
  alternates: {
    canonical: 'https://omprakashbehera.me/services',
  },
  openGraph: {
    title: 'Web Development, AI & Digital Solutions | Prakash',
    description:
      'Explore website development, business digitalization, custom AI, machine learning, SEO, and digital design services by Prakash.',
    url: 'https://omprakashbehera.me/services',
    siteName: 'Prakash Services & Digital Solutions',
    type: 'website',
    images: [
      {
        url: '/services/real-estate.jpg',
        width: 1200,
        height: 630,
        alt: 'Prakash Web Development & AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development, AI & Digital Solutions | Prakash',
    description:
      'Explore website development, business digitalization, custom AI, machine learning, SEO, and digital design services by Prakash.',
    creator: '@quasar_om',
    images: ['/services/real-estate.jpg'],
  },
}

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Prakash - Web Development, AI & Digital Solutions',
    url: 'https://omprakashbehera.me/services',
    image: 'https://omprakashbehera.me/services/real-estate.jpg',
    description:
      'Explore website development, business digitalization, custom AI, machine learning, SEO, and digital design services by Prakash.',
    founder: {
      '@type': 'Person',
      name: 'Om Prakash Behera',
      alternateName: ['Prakash', 'CodeByPrakash', 'Quasar Om'],
      url: 'https://omprakashbehera.me',
      sameAs: [
        'https://github.com/CodeByPrakash',
        'https://linkedin.com/in/omprakash-cse',
        'https://instagram.com/quasar_om',
      ],
    },
    priceRange: '₹3,000 – ₹50,000',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development and Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Website Development',
            description: 'Custom websites for Real Estate, Hotels, Cafes, and Small Businesses.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'React and Next.js Web Applications',
            description: 'High-performance interactive web apps with modern architecture.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI Assistant & Machine Learning',
            description: 'Domain-adapted RAG chatbots, predictive models, and workflow automation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO & Search Engine Growth',
            description: 'Technical SEO, Google Business Profile optimization, and local ranking.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Design & Branding',
            description: 'QR menus, brand identity, social creatives, and Figma UI/UX design.',
          },
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageClient />
    </>
  )
}
