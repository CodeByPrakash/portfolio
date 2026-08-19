'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'
import styles from './GoogleTranslate.module.css'

export const LANGUAGES = [
  // Primary Indian Regional Languages
  { code: 'en', name: 'English', native: 'English', flag: '🌐', group: 'Default' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳', group: 'Indian' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', group: 'Indian' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳', group: 'Indian' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', group: 'Indian' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', group: 'Indian' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', group: 'Indian' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', group: 'Indian' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', group: 'Indian' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', group: 'Indian' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', group: 'Indian' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇮🇳', group: 'Indian' },

  // Global International Languages
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', group: 'Global' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', group: 'Global' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', group: 'Global' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', group: 'Global' },
  { code: 'zh-CN', name: 'Chinese', native: '简体中文', flag: '🇨🇳', group: 'Global' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', group: 'Global' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', group: 'Global' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹', group: 'Global' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', group: 'Global' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹', group: 'Global' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱', group: 'Global' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷', group: 'Global' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩', group: 'Global' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳', group: 'Global' },
]

export default function GoogleTranslate({ variant = 'floating' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const dropdownRef = useRef(null)

  // Detect current language from googtrans cookie on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'))
      return match ? decodeURIComponent(match[2]) : null
    }

    const googtrans = getCookie('googtrans')
    if (googtrans) {
      const parts = googtrans.split('/')
      const code = parts[parts.length - 1]
      if (code) setCurrentLang(code)
    }

    // Set up Google Translate callback function
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: LANGUAGES.map((l) => l.code).join(','),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        )
      }
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Change language via cookie and trigger Google Translate
  const changeLanguage = (langCode) => {
    setCurrentLang(langCode)
    setIsOpen(false)

    if (typeof window === 'undefined') return

    const hostname = window.location.hostname
    const rootDomain = hostname.split('.').slice(-2).join('.')

    if (langCode === 'en') {
      // Clear cookie to restore default English
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`
    } else {
      const cookieValue = `/en/${langCode}`
      document.cookie = `googtrans=${cookieValue}; path=/;`
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${rootDomain};`
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${hostname};`
    }

    // Attempt to select language directly in Google's hidden dropdown if available
    const selectEl = document.querySelector('.goog-te-combo')
    if (selectEl) {
      selectEl.value = langCode
      selectEl.dispatchEvent(new Event('change'))
    } else {
      // Reload page to apply translation smoothly
      window.location.reload()
    }
  }

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0]

  const filteredLanguages = LANGUAGES.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'indian') return matchesSearch && l.group === 'Indian'
    if (activeTab === 'global') return matchesSearch && (l.group === 'Global' || l.group === 'Default')
    return matchesSearch
  })

  // Render for navbar or floating mode
  return (
    <div
      ref={dropdownRef}
      className={`${styles.container} ${variant === 'navbar' ? styles.navVariant : styles.floatingVariant}`}
    >
      {/* Hidden container where Google Translate initializes */}
      <div id="google_translate_element" className={styles.hiddenGoogleWidget} />

      {/* Google Translate API Script (Lazy Loaded) */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />

      {/* Trigger Button */}
      <motion.button
        type="button"
        className={`${styles.triggerBtn} ${isOpen ? styles.triggerActive : ''} ${currentLang !== 'en' ? styles.triggerTranslated : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language — Google Translate"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className={styles.globeIcon} aria-hidden="true">🌐</span>
        <span className={styles.langName}>{activeLangObj.native || activeLangObj.name}</span>
        <span className={styles.langBadge}>{activeLangObj.code.toUpperCase()}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">
          ▾
        </span>
      </motion.button>

      {/* Dropdown Modal Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: variant === 'navbar' ? 12 : -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: variant === 'navbar' ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <span className={styles.headerIcon}>🌐</span>
                <div>
                  <h4>Translate Website</h4>
                  <p>Powered by Google Translate</p>
                </div>
              </div>

              {currentLang !== 'en' && (
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => changeLanguage('en')}
                  title="Reset to Original English"
                >
                  Reset (EN)
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search language (e.g., Odia, Hindi, Spanish)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className={styles.tabs}>
              <button
                type="button"
                className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({LANGUAGES.length})
              </button>
              <button
                type="button"
                className={`${styles.tab} ${activeTab === 'indian' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('indian')}
              >
                🇮🇳 Indian ({LANGUAGES.filter((l) => l.group === 'Indian').length})
              </button>
              <button
                type="button"
                className={`${styles.tab} ${activeTab === 'global' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('global')}
              >
                🌍 Global ({LANGUAGES.filter((l) => l.group === 'Global' || l.group === 'Default').length})
              </button>
            </div>

            {/* Language Grid */}
            <div className={styles.languageList}>
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => {
                  const isSelected = currentLang === lang.code
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      className={`${styles.langItem} ${isSelected ? styles.langItemSelected : ''}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      <span className={styles.langFlag}>{lang.flag}</span>
                      <div className={styles.langLabels}>
                        <span className={styles.nativeLabel}>{lang.native}</span>
                        <span className={styles.englishLabel}>{lang.name}</span>
                      </div>
                      {isSelected && <span className={styles.activeCheck}>✓</span>}
                    </button>
                  )
                })
              ) : (
                <div className={styles.noResults}>
                  <p>No languages matching "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <span>✨ Instant AI Translation</span>
              <a
                href="https://translate.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gLink}
              >
                Google Translate ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
