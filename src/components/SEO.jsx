'use client'

import { useEffect } from 'react'
import { formatKeywords, HOME_PAGE_KEYWORDS } from '../utils/seoKeywords'

const DEFAULT_SEO = {
  title: 'OMPRAKASH BEHERA — Computer Science Engineer | Full-Stack Developer & AI Systems',
  description: 'Portfolio of Omprakash Behera — Computer Science & Engineering (CSE) student and Full-Stack Developer from Odisha, India. Specializing in AI/ML systems, MERN stack, computer vision, cyber security, and scalable software architecture.',
  keywords: HOME_PAGE_KEYWORDS,
  author: 'OMPRAKASH BEHERA',
  canonical: 'https://omprakashbehera.me/',
  ogType: 'website',
  ogImage: 'https://omprakashbehera.me/omprakash.png',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
}

/**
 * Reusable SEO component to dynamically update head metadata, Open Graph,
 * Search Console verification, and structured data per page/view.
 */
export default function SEO({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  extraKeywords = null,
  author = DEFAULT_SEO.author,
  canonical = DEFAULT_SEO.canonical,
  ogType = DEFAULT_SEO.ogType,
  ogImage = DEFAULT_SEO.ogImage,
  robots = DEFAULT_SEO.robots,
  googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.VITE_GOOGLE_SITE_VERIFICATION || '',
  bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || process.env.VITE_BING_SITE_VERIFICATION || '',
  structuredData = null,
}) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title

    // Helper to set or create a meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      if (!content && content !== '') return
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attributeName, attributeValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Helper to set or create a link tag
    const setLinkTag = (rel, href) => {
      if (!href) return
      let element = document.querySelector(`link[rel="${rel}"]`)
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }
      element.setAttribute('href', href)
    }

    // 2. Format Keywords (merging base keywords, easy words, and extra keywords)
    let processedKeywords = keywords
    if (extraKeywords) {
      const combined = Array.isArray(keywords) ? [...keywords] : [keywords]
      if (Array.isArray(extraKeywords)) {
        combined.push(...extraKeywords)
      } else if (typeof extraKeywords === 'string') {
        combined.push(extraKeywords)
      }
      processedKeywords = combined
    }
    const finalKeywordsString = formatKeywords(processedKeywords)

    // 3. Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywordsString)
    setMetaTag('meta[name="author"]', 'name', 'author', author)
    setMetaTag('meta[name="robots"]', 'name', 'robots', robots)

    // 4. Search Engine Console Verification Tags
    if (googleSiteVerification) {
      setMetaTag('meta[name="google-site-verification"]', 'name', 'google-site-verification', googleSiteVerification)
    }
    if (bingSiteVerification) {
      setMetaTag('meta[name="msvalidate.01"]', 'name', 'msvalidate.01', bingSiteVerification)
    }

    // 5. Canonical Link
    if (canonical) {
      setLinkTag('canonical', canonical)
    }

    // 6. Open Graph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType)
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical || window.location.href)
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage)
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Om Prakash Behera — CSE Portfolio')
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN')

    // 7. Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', `${title} Preview`)
    setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@quasar_om')
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@quasar_om')

    // 7b. Open Graph Image Alt
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', `${title} — Portfolio Preview`)

    // 8. Page-Specific JSON-LD Structured Data
    let scriptTag = null
    if (structuredData) {
      // Remove any existing dynamic structured data script
      const existing = document.getElementById('page-structured-data')
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing)
      }

      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.innerHTML = JSON.stringify(structuredData)
      scriptTag.id = 'page-structured-data'
      document.head.appendChild(scriptTag)
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag)
      }
    }
  }, [
    title,
    description,
    keywords,
    extraKeywords,
    author,
    canonical,
    ogType,
    ogImage,
    robots,
    googleSiteVerification,
    bingSiteVerification,
    structuredData,
  ])

  return null
}
