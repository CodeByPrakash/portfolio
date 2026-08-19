export default function manifest() {
  return {
    name: 'Om Prakash Behera — Computer Science Engineer & Full-Stack AI Developer',
    short_name: 'Om Prakash Behera',
    description:
      'Official portfolio of Om Prakash Behera (CodeByPrakash) — Computer Science Engineer, Full-Stack Developer, and AI Engineer from Odisha, India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090B0E',
    theme_color: '#FF6B00',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
