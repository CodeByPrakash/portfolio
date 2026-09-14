import Navbar from '../../components/Navbar'
import ProjectsArchive from '../../components/ProjectsArchive'
import Footer from '../../components/Footer'
import { PROJECTS_PAGE_KEYWORDS } from '../../utils/seoKeywords'
import { PROJECTS_DATA } from '../../data/projectsData'

export const metadata = {
  title: 'Engineering Projects & Case Studies — Om Prakash Behera',
  description:
    'Comprehensive portfolio archive of 21+ engineering projects in AI/ML, computer vision, cyber security, and full-stack web development by Om Prakash Behera (CodeByPrakash).',
  keywords: PROJECTS_PAGE_KEYWORDS,
  alternates: {
    canonical: 'https://omprakashbehera.me/projects',
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
    title: 'Engineering Projects Archive — Om Prakash Behera',
    description:
      'Detailed showcase of full-stack systems, computer vision apps, machine learning models, and hackathon winning solutions by Om Prakash Behera.',
    url: 'https://omprakashbehera.me/projects',
    type: 'website',
    siteName: 'Om Prakash Behera Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: 'https://omprakashbehera.me/omprakash.png',
        width: 1200,
        height: 630,
        alt: 'Om Prakash Behera Projects Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Projects Archive — Om Prakash Behera',
    description:
      'Detailed showcase of full-stack systems, computer vision apps, machine learning models, and hackathon winning solutions by Om Prakash Behera.',
    creator: '@quasar_om',
    site: '@quasar_om',
    images: ['https://omprakashbehera.me/omprakash.png'],
  },
}

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://omprakashbehera.me/projects#collection',
      url: 'https://omprakashbehera.me/projects',
      name: 'Om Prakash Behera — Engineering Projects Archive',
      description:
        'Selected engineering projects across AI/ML, computer vision, cyber security, and modern web architectures.',
      isPartOf: {
        '@id': 'https://omprakashbehera.me/#website',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Engineering Projects by Om Prakash Behera',
      itemListElement: PROJECTS_DATA.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: p.title,
        description: p.desc,
        url: p.link || `https://omprakashbehera.me/projects/${p.id}`,
      })),
    },
  ],
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <ProjectsArchive />
      </main>
      <Footer />
    </>
  )
}
