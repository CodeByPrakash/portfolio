'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const register = () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            // Check for updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      // New content is available; please refresh.
                      console.log('New content is available; please refresh.')
                    } else {
                      // Content is cached for offline use.
                      console.log('Content is cached for offline use.')
                    }
                  }
                }
              }
            }
          })
          .catch((error) => {
            console.warn('Service worker registration failed:', error)
          })
      }

      if (document.readyState === 'complete') {
        register()
      } else {
        window.addEventListener('load', register)
        return () => window.removeEventListener('load', register)
      }
    }
  }, [])

  return null
}
