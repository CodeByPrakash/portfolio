/**
 * Service Worker for Om Prakash Behera (CodeByPrakash) Portfolio & Studio
 * Version: 1.0.0
 * Provides offline caching, network-first page navigation, and cache-first static assets.
 */

const CACHE_NAME = 'opb-portfolio-cache-v1'

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/services',
  '/ai',
  '/manifest.json',
  '/site.webmanifest',
  '/favicon.ico',
  '/logo.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/font/AtAmigaTRIAL-Regular.otf',
]

// Install Event: Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('SW Pre-cache error:', err)
      })
  )
})

// Activate Event: Clean up stale caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch Event: Intelligent routing & caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 1. Only handle GET requests
  if (request.method !== 'GET') {
    return
  }

  // 2. Never cache dynamic streaming API endpoints or non-HTTP protocols
  if (
    url.pathname.startsWith('/api/') ||
    url.protocol.startsWith('chrome-extension') ||
    url.hostname.includes('vercel.app') ||
    url.hostname.includes('workers.dev')
  ) {
    return
  }

  // 3. Navigation requests (HTML pages): Network-First, fallback to Cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return networkResponse
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request)
          if (cachedResponse) {
            return cachedResponse
          }
          // Fallback to home page if available in cache
          return caches.match('/')
        })
    )
    return
  }

  // 4. Static assets (images, fonts, scripts, styles): Cache-First with Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/font/') ||
    url.pathname.startsWith('/hero/') ||
    url.pathname.startsWith('/services/') ||
    url.pathname.startsWith('/projects/') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone)
              })
            }
            return networkResponse
          })
          .catch(() => cachedResponse)

        return cachedResponse || fetchPromise
      })
    )
    return
  }

  // 5. Default: Network with Cache Fallback
  event.respondWith(
    fetch(request).catch(async () => {
      return caches.match(request)
    })
  )
})

// Listen for skipWaiting messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
