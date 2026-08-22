import Navbar from '../../components/Navbar'
import Activity from '../../components/Activity'
import Footer from '../../components/Footer'
import { ACTIVITIES } from '../../data/activities'

export const metadata = {
  title: 'Engineering Activity Stream & Timestamped Logs — Om Prakash Behera',
  description:
    'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, open-source commits, and technical milestones by Om Prakash Behera (CodeByPrakash).',
  keywords: [
    'Om Prakash Behera Activity',
    'CodeByPrakash Log',
    'Om Prakash Behera Releases',
    'Engineering Updates',
    'AI ML Project Releases',
    'ISRO BAH 2026',
    'SIH 2025 Team CodeNova',
    'YOUTH@2050 1st Prize Winner',
    'Open Source GitHub Feed',
    'Computer Vision Milestones',
  ],
  alternates: {
    canonical: 'https://omprakashbehera.me/activity',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Engineering Activity Stream & Timestamped Logs — Om Prakash Behera',
    description:
      'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, open-source commits, and technical milestones by Om Prakash Behera.',
    url: 'https://omprakashbehera.me/activity',
    type: 'website',
    siteName: 'Om Prakash Behera Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: 'https://omprakashbehera.me/omprakash.png',
        width: 1200,
        height: 630,
        alt: 'Om Prakash Behera Engineering Activity Feed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Activity Stream & Timestamped Logs — Om Prakash Behera',
    description:
      'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, and open-source commits by Om Prakash Behera.',
    creator: '@quasar_om',
    site: '@quasar_om',
    images: ['https://omprakashbehera.me/omprakash.png'],
  },
}

const activityIndexJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://omprakashbehera.me/activity#collection',
      url: 'https://omprakashbehera.me/activity',
      name: 'Engineering Activity Stream & Timestamped Logs — Om Prakash Behera',
      description:
        'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, open-source commits, and technical milestones by Om Prakash Behera.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://omprakashbehera.me/#website',
        name: 'Om Prakash Behera — Portfolio',
        url: 'https://omprakashbehera.me',
      },
      breadcrumb: {
        '@id': 'https://omprakashbehera.me/activity#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://omprakashbehera.me/activity#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://omprakashbehera.me/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Activity Stream',
          item: 'https://omprakashbehera.me/activity',
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Engineering Updates, Releases & Technical Milestones by Om Prakash Behera',
      numberOfItems: ACTIVITIES.length,
      itemListElement: ACTIVITIES.map((act, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: act.title,
        description: act.summary,
        url: 'https://omprakashbehera.me/activity#' + act.id,
      })),
    },
  ],
}

export default function ActivityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activityIndexJsonLd) }}
      />
      <Navbar />
      <main id="main-content" style={{ minHeight: '80vh' }}>
        <Activity />
      </main>
      <Footer />
    </>
  )
}
