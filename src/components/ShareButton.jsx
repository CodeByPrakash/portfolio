'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './ShareButton.module.css'

export default function ShareButton({
  url,
  title,
  excerpt = '',
  category = '',
  className = '',
  variant = 'compact', // 'compact' | 'full'
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef(null)

  // Full share URL
  const shareUrl = url.startsWith('http')
    ? url
    : `https://omprakashbehera.me${url.startsWith('/') ? url : `/${url}`}`

  const displayUrl = shareUrl.replace('https://', '')
  const shareText = `Check out "${title}" by Om Prakash Behera (@CodeByPrakash)`

  // Handle native Web Share or toggle popover
  const handleShareClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Web Share API: passing url directly triggers rich native OpenGraph attachment in iOS & Android
    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        })
        return
      } catch (err) {
        if (err.name !== 'AbortError') {
          setIsOpen((prev) => !prev)
        }
      }
    } else {
      setIsOpen((prev) => !prev)
    }
  }

  // Copy to clipboard
  const handleCopyLink = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = shareUrl
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }

      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2200)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // Social share URLs engineered for instantaneous OpenGraph card generation
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(title)}&via=quasar_om&hashtags=CodeByPrakash,Engineering`

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`

  // WhatsApp: Sending the direct URL triggers WhatsApp's OpenGraph scraper to fetch og:image & og:title
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(title)}`

  const redditShareUrl = `https://reddit.com/submit?url=${encodeURIComponent(
    shareUrl
  )}&title=${encodeURIComponent(title)}`

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={`${styles.shareWrapper} ${className}`} ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className={`${styles.shareTriggerBtn} ${variant === 'full' ? styles.shareTriggerFull : styles.shareTriggerCompact} ${isOpen ? styles.shareTriggerActive : ''}`}
        onClick={handleShareClick}
        aria-label={`Share "${title}"`}
        aria-expanded={isOpen}
        title="Share article & copy link"
      >
        <svg
          width={variant === 'full' ? '15' : '13'}
          height={variant === 'full' ? '15' : '13'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{copied ? 'Copied! ✓' : variant === 'full' ? 'Share Article' : 'Share'}</span>
      </button>

      {/* Sleek Compact Share Popover */}
      {isOpen && (
        <div className={styles.sharePopover} role="menu" aria-label="Share Options">
          {/* Header */}
          <div className={styles.popoverHeader}>
            <div className={styles.headerTitleWrap}>
              <span className={styles.popoverTitle}>Share Article</span>
              <span className={styles.popoverHint}>Includes author preview</span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close share menu"
            >
              ✕
            </button>
          </div>

          {/* 1-Click Copy Bar */}
          <div className={styles.copyBar}>
            <div className={styles.urlPreview} title={shareUrl}>
              {displayUrl}
            </div>
            <button
              type="button"
              className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
              onClick={handleCopyLink}
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Horizontal Social Icons Bar */}
          <div className={styles.socialRow}>
            {/* WhatsApp */}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIconBtn} ${styles.socialWhatsapp}`}
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
              onClick={() => setIsOpen(false)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIconBtn} ${styles.socialTwitter}`}
              title="Share on 𝕏 (Twitter)"
              aria-label="Share on 𝕏 (Twitter)"
              onClick={() => setIsOpen(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIconBtn} ${styles.socialLinkedin}`}
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn"
              onClick={() => setIsOpen(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIconBtn} ${styles.socialTelegram}`}
              title="Share on Telegram"
              aria-label="Share on Telegram"
              onClick={() => setIsOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>

            {/* Reddit */}
            <a
              href={redditShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIconBtn} ${styles.socialReddit}`}
              title="Share on Reddit"
              aria-label="Share on Reddit"
              onClick={() => setIsOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M17 13c0-1.66-1.34-3-3-3-.45 0-.87.1-1.25.28L14 7l-4 1" />
                <circle cx="9" cy="13" r="1" />
                <circle cx="15" cy="13" r="1" />
                <path d="M9.5 16.5c1 .8 2 1 2.5 1s1.5-.2 2.5-1" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
