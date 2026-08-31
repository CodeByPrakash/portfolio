import Navbar from '../../components/Navbar'
import Blog from '../../components/Blog'
import Footer from '../../components/Footer'
import { BLOG_POSTS } from '../../data/blogPosts'
import { BLOG_PAGE_KEYWORDS } from '../../utils/seoKeywords'

export const metadata = {
  title: 'Technical Blog & Engineering Articles — Om Prakash Behera',
  description:
    'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Om Prakash Behera (CodeByPrakash).',
  keywords: BLOG_PAGE_KEYWORDS,
  alternates: {
    canonical: 'https://omprakashbehera.me/blog',
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
    title: 'Technical Blog & Engineering Articles — Om Prakash Behera',
    description:
      'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Om Prakash Behera.',
    url: 'https://omprakashbehera.me/blog',
    type: 'website',
    siteName: 'Om Prakash Behera Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: 'https://omprakashbehera.me/omprakash.png',
        width: 1200,
        height: 630,
        alt: 'Om Prakash Behera Technical Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog & Engineering Articles — Om Prakash Behera',
    description:
      'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Om Prakash Behera.',
    creator: '@quasar_om',
    site: '@quasar_om',
    images: ['https://omprakashbehera.me/omprakash.png'],
  },
}

const blogIndexJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://omprakashbehera.me/blog#collection',
      url: 'https://omprakashbehera.me/blog',
      name: 'Technical Blog & Engineering Articles — Om Prakash Behera',
      description:
        'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Om Prakash Behera.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://omprakashbehera.me/#website',
        name: 'Om Prakash Behera — Portfolio',
        url: 'https://omprakashbehera.me',
      },
      breadcrumb: {
        '@id': 'https://omprakashbehera.me/blog#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://omprakashbehera.me/blog#breadcrumb',
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
          name: 'Technical Blog',
          item: 'https://omprakashbehera.me/blog',
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Technical Articles & Engineering Deep Dives by Om Prakash Behera',
      numberOfItems: BLOG_POSTS.length,
      itemListElement: BLOG_POSTS.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        description: post.excerpt,
        url: `https://omprakashbehera.me/blog/${post.slug}`,
      })),
    },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script
        id="blog-schema-ldjson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
        suppressHydrationWarning
      />
      <Navbar />
      <main id="main-content" style={{ minHeight: '80vh' }}>
        <Blog isStandalone />
      </main>
      <Footer />
    </>
  )
}
