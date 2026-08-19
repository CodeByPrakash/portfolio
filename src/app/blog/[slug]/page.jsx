import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { BLOG_POSTS } from '../../../data/blogPosts'
import { getBlogPostSeo } from '../../../utils/seoKeywords'
import styles from './ArticleView.module.css'

// 1. Static Site Generation for all 12 blog posts
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

// 2. Dynamic Metadata Generation for Googlebot, Google Discover & Social Networks
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Article Not Found — Om Prakash Behera',
      description: 'The requested technical article could not be found.',
    }
  }

  const seoData = getBlogPostSeo(post.slug)
  const canonicalUrl = seoData.canonicalUrl
  const ogImageUrl = `https://omprakashbehera.me/blog/${post.slug}/opengraph-image`

  return {
    title: `${post.title} — Om Prakash Behera`,
    description: post.excerpt,
    keywords: seoData.keywords,
    authors: [{ name: 'Om Prakash Behera', url: 'https://omprakashbehera.me' }],
    creator: 'Om Prakash Behera',
    publisher: 'Om Prakash Behera',
    alternates: {
      canonical: canonicalUrl,
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
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'Om Prakash Behera — Technical Blog',
      locale: 'en_IN',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date().toISOString(),
      authors: ['https://omprakashbehera.me'],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} — Om Prakash Behera`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@quasar_om',
      site: '@quasar_om',
      images: [ogImageUrl],
    },
  }
}

// Inline Markdown Parser helper for high-performance server rendering
function renderMarkdownContent(content) {
  if (!content) return null

  const lines = content.trim().split('\n')
  const elements = []
  let inCodeBlock = false
  let codeBuffer = []
  let codeLang = 'text'
  let listBuffer = []
  let listType = null // 'bullet' | 'number'

  const renderInline = (text) => {
    if (!text) return ''

    let parts = []
    let lastIndex = 0

    // Combine matches for links, bold text, and inline code
    const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g
    let match

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      if (match[0].startsWith('[')) {
        // Link
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[3]}
            target={match[3].startsWith('http') ? '_blank' : undefined}
            rel={match[3].startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {match[2]}
          </a>
        )
      } else if (match[0].startsWith('**')) {
        // Bold
        parts.push(<strong key={`bold-${match.index}`}>{match[4]}</strong>)
      } else if (match[0].startsWith('`')) {
        // Inline code
        parts.push(
          <code key={`code-${match.index}`} className={styles.inlineCode}>
            {match[5]}
          </code>
        )
      }
      lastIndex = tokenRegex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const flushList = () => {
    if (listBuffer.length > 0 && listType) {
      const key = `list-${elements.length}`
      if (listType === 'bullet') {
        elements.push(
          <ul key={key} className={styles.bulletList}>
            {listBuffer.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>
        )
      } else {
        elements.push(
          <ol key={key} className={styles.numberList}>
            {listBuffer.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ol>
        )
      }
      listBuffer = []
      listType = null
    }
  }

  lines.forEach((line, idx) => {
    if (line.startsWith('```')) {
      flushList()
      if (inCodeBlock) {
        const fullCode = codeBuffer.join('\n')
        elements.push(
          <div key={`code-block-${idx}`} className={styles.codeBlockWrapper}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>{codeLang}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Code Snippet</span>
            </div>
            <pre className={styles.codeContent}>
              <code>{fullCode}</code>
            </pre>
          </div>
        )
        codeBuffer = []
        inCodeBlock = false
      } else {
        codeLang = line.replace('```', '').trim() || 'text'
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      return
    }

    if (line.startsWith('- ')) {
      if (listType && listType !== 'bullet') {
        flushList()
      }
      listType = 'bullet'
      listBuffer.push(line.replace('- ', ''))
      return
    }

    if (/^\d+\.\s/.test(line)) {
      if (listType && listType !== 'number') {
        flushList()
      }
      listType = 'number'
      listBuffer.push(line.replace(/^\d+\.\s/, ''))
      return
    }

    // If not a list item, flush any pending list
    flushList()

    if (line.startsWith('#### ')) {
      elements.push(<h4 key={`h4-${idx}`}>{renderInline(line.replace('#### ', ''))}</h4>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${idx}`}>{renderInline(line.replace('### ', ''))}</h3>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${idx}`}>{renderInline(line.replace('## ', ''))}</h2>)
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={`quote-${idx}`}>
          {renderInline(line.replace('> ', ''))}
        </blockquote>
      )
    } else if (line.trim().length > 0) {
      elements.push(<p key={`p-${idx}`}>{renderInline(line)}</p>)
    }
  })

  flushList()

  return elements
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Sequential previous & next post navigation
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null

  // Find related articles (same category or shared tags)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3)

  const seoData = getBlogPostSeo(post.slug)
  const wordCount = post.content.split(/\s+/).length + post.title.split(/\s+/).length
  const canonicalUrl = seoData.canonicalUrl
  const publishedIso = new Date(post.date).toISOString()
  const modifiedIso = new Date().toISOString()

  // JSON-LD Structured Data for Google Discover & Google Rich Results
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonicalUrl}#article`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://omprakashbehera.me/#website',
      name: 'Om Prakash Behera — Portfolio',
      url: 'https://omprakashbehera.me',
    },
    headline: post.title,
    description: post.excerpt,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    inLanguage: 'en-IN',
    wordCount: wordCount,
    articleSection: post.category,
    keywords: seoData.keywords.join(', '),
    image: {
      '@type': 'ImageObject',
      url: `https://omprakashbehera.me/blog/${post.slug}/opengraph-image`,
      width: 1200,
      height: 630,
      caption: `${post.title} by Om Prakash Behera`,
    },
    author: {
      '@type': 'Person',
      '@id': 'https://omprakashbehera.me/#person',
      name: 'Om Prakash Behera',
      alternateName: ['CodeByPrakash', 'Quasar Om', 'OmPrakash Behera'],
      url: 'https://omprakashbehera.me',
      image: 'https://omprakashbehera.me/omprakash.png',
      jobTitle: 'Computer Science Engineer & Full-Stack Developer',
      alumniOf: 'Government College of Engineering, Kalahandi (GCEK)',
      sameAs: [
        'https://github.com/CodeByPrakash',
        'https://linkedin.com/in/omprakash-cse',
        'https://orcid.org/0009-0002-2403-2907',
        'https://instagram.com/quasar_om',
      ],
    },
    publisher: {
      '@type': 'Person',
      '@id': 'https://omprakashbehera.me/#person',
      name: 'Om Prakash Behera',
      url: 'https://omprakashbehera.me',
      logo: {
        '@type': 'ImageObject',
        url: 'https://omprakashbehera.me/logo.svg',
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <>
      {/* Dynamic Server-Rendered JSON-LD for Crawlers & Discover */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main id="main-content" className={styles.articlePage}>
        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/blog">Blog</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.category}</span>
          </nav>

          {/* Main 3D Clay Article Bento Card */}
          <div className={styles.articleCardWrapper}>
            {/* Article Header */}
            <header className={styles.header}>
              <div className={styles.metaRow}>
                <span className={`${styles.categoryTag} ${styles[`tag_${post.color}`]}`}>
                  {post.category}
                </span>
                <div className={styles.metaInfo}>
                  <time dateTime={publishedIso}>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{wordCount} words</span>
                </div>
              </div>

              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.excerpt}>{post.excerpt}</p>

              {/* Author Byline / E-E-A-T Badge */}
              <div className={styles.authorByline}>
                <div className={styles.authorLeft}>
                  <Image
                    src="/omprakash.png"
                    alt="Om Prakash Behera"
                    className={styles.authorAvatar}
                    width={54}
                    height={54}
                  />
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>Om Prakash Behera</span>
                    <span className={styles.authorRole}>
                      CSE Student at GCEK Kalahandi | Full-Stack &amp; AI Engineer
                    </span>
                  </div>
                </div>

                <div className={styles.authorActions}>
                  <a
                    href="https://github.com/CodeByPrakash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/omprakash-cse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </header>

            {/* Main Article Content */}
            <article className={styles.content}>
              {renderMarkdownContent(post.content)}
            </article>

            {/* Tags */}
            <div className={styles.tagsSection}>
              <span className={styles.tagLabel}>Related Topics:</span>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tagBadge}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Sequential Post Navigation (Prev / Next) */}
            {(prevPost || nextPost) && (
              <nav aria-label="Article navigation" className={styles.postPagination}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className={styles.postNavCard}>
                    <span className={styles.postNavLabel}>← Previous Article</span>
                    <span className={styles.postNavTitle}>{prevPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className={`${styles.postNavCard} ${styles.postNavNext}`}
                  >
                    <span className={styles.postNavLabel}>Next Article →</span>
                    <span className={styles.postNavTitle}>{nextPost.title}</span>
                  </Link>
                )}
              </nav>
            )}

            {/* Article Footer & E-E-A-T Author Card */}
            <footer className={styles.articleFooter}>
              <div className={styles.authorBioBox}>
                <Image
                  src="/omprakash.png"
                  alt="Om Prakash Behera profile photo"
                  className={styles.bioAvatar}
                  width={76}
                  height={76}
                />
                <div className={styles.bioContent}>
                  <h3 className={styles.bioTitle}>Written by Om Prakash Behera (CodeByPrakash)</h3>
                  <p className={styles.bioText}>
                    Computer Science &amp; Engineering student at Government College of Engineering, Kalahandi (GCEK Odisha). First Class Distinction graduate in Diploma CSE. Winner of YOUTH@2050 1st Prize, ISRO BAH 2026 PS-07 participant, and creator of 30+ full-stack and machine learning software systems.
                  </p>
                  <div className={styles.bioActions}>
                    <Link href="/#contact" className={styles.socialBtn}>
                      Contact Author ✉
                    </Link>
                    <a href="/resume.pdf" download className={styles.socialBtn}>
                      View Resume ↓
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Articles for internal link equity */}
              {relatedPosts.length > 0 && (
                <section className={styles.relatedSection} aria-label="Related Engineering Articles">
                  <h3 className={styles.relatedHeading}>Related Engineering Deep Dives</h3>
                  <div className={styles.relatedGrid}>
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className={styles.relatedCard}
                      >
                        <div>
                          <span className={styles.relatedCat}>{rel.category}</span>
                          <h4 className={styles.relatedTitle}>{rel.title}</h4>
                        </div>
                        <div className={styles.relatedMeta}>
                          <span>{rel.date}</span> • <span>{rel.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <div className={styles.footerNavActions}>
                <Link href="/blog" className={styles.backBtn}>
                  ← Back to All Articles
                </Link>
                <Link href="/#projects" className={styles.socialBtn}>
                  Explore Featured Projects ↗
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
