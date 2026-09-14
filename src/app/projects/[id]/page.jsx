import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ShareButton from '../../../components/ShareButton'
import { PROJECTS_DATA } from '../../../data/projectsData'
import styles from './ProjectView.module.css'

// 1. Static Site Generation for all 21 projects
export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }))
}

// 2. Dynamic Metadata Generation for SEO
export async function generateMetadata({ params }) {
  const { id } = await params
  const project = PROJECTS_DATA.find((p) => p.id === id)

  if (!project) {
    return {
      title: 'Project Not Found | Om Prakash Behera',
      description: 'The requested engineering project could not be found.',
    }
  }

  const canonicalUrl = `https://omprakashbehera.me/projects/${project.id}`
  const pageTitle = `${project.title} — ${project.subtitle} | Om Prakash Behera`
  const metaDescription = project.desc || project.longDesc.slice(0, 155) + '...'

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: [
      project.title,
      project.category,
      ...project.tags,
      'Om Prakash Behera',
      'Software Engineer',
      'Portfolio Project',
    ],
    authors: [{ name: 'Om Prakash Behera', url: 'https://omprakashbehera.me' }],
    creator: 'Om Prakash Behera',
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
      title: pageTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'Om Prakash Behera Portfolio',
      locale: 'en_IN',
      type: 'article',
      images: [
        {
          url: `https://omprakashbehera.me${project.image}`,
          width: 1200,
          height: 630,
          alt: `${project.title} — Om Prakash Behera`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDescription,
      creator: '@quasar_om',
      images: [`https://omprakashbehera.me${project.image}`],
    },
  }
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params
  const project = PROJECTS_DATA.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === id)
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : null

  // Related projects in the same category or with overlapping tags
  const relatedProjects = PROJECTS_DATA.filter(
    (p) => p.id !== project.id && (p.category === project.category || p.tags.some((t) => project.tags.includes(t)))
  ).slice(0, 3)

  const canonicalUrl = `https://omprakashbehera.me/projects/${project.id}`

  // Schema.org SoftwareApplication JSON-LD
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    headline: project.subtitle,
    description: project.longDesc || project.desc,
    applicationCategory: project.category,
    operatingSystem: 'Web, Cross-Platform',
    url: canonicalUrl,
    image: `https://omprakashbehera.me${project.image}`,
    author: {
      '@type': 'Person',
      name: 'Om Prakash Behera',
      url: 'https://omprakashbehera.me',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <Navbar />

      <main id="main-content" className={styles.projectPage}>
        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/projects">Projects</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{project.title}</span>
          </nav>

          {/* Main 3D Clay Project Showcase Card */}
          <article className={styles.projectCardWrapper}>
            {/* Header / Title Row */}
            <header className={styles.header}>
              <div className={styles.metaRow}>
                <span className={`${styles.categoryTag} ${styles[`tag_${project.color}`]}`}>
                  {project.category}
                </span>
                <span className={styles.statusBadge}>
                  <span className={styles.statusDot} />
                  {project.stats.status}
                </span>
                <span className={styles.yearBadge}>Year: {project.stats.year}</span>
              </div>

              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.subtitle}>{project.subtitle}</p>

              {/* Action Buttons */}
              <div className={styles.actionsBar}>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryActionBtn}
                  >
                    <span>Live Demo</span>
                    <span className={styles.btnArrow}>↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryActionBtn}
                  >
                    <span>View Source Code</span>
                    <span className={styles.btnArrow}>↗</span>
                  </a>
                )}
                <ShareButton
                  url={`/projects/${project.id}`}
                  title={`${project.title} — ${project.subtitle}`}
                  excerpt={project.desc}
                  category={project.category}
                  variant="compact"
                />
              </div>
            </header>

            {/* Showcase Visual & Specifications Grid */}
            <div className={styles.showcaseGrid}>
              {/* Media Preview Box */}
              <div className={styles.mediaBox}>
                <img
                  src={project.image}
                  alt={`${project.title} Interface Preview`}
                  className={styles.projectImage}
                />
              </div>

              {/* Technical Specifications Bento Box */}
              <div className={styles.specsBox}>
                <h2 className={styles.sectionHeading}>Technical Blueprint</h2>
                <div className={styles.specsList}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Architecture</span>
                    <span className={styles.specVal}>{project.category}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Release Year</span>
                    <span className={styles.specVal}>{project.stats.year}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Deployment Status</span>
                    <span className={styles.specVal}>{project.stats.status}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Core Technologies</span>
                    <span className={styles.specVal}>{project.stats.tech} Libraries / Tools</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className={styles.techStackSection}>
                  <h3 className={styles.subHeading}>Technologies Deployed</h3>
                  <div className={styles.tagsGrid}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.techPill}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Dive Description & Highlights */}
            <div className={styles.detailsSection}>
              <div className={styles.descriptionBlock}>
                <h2 className={styles.sectionHeading}>Project Architecture &amp; Overview</h2>
                <p className={styles.longDescText}>{project.longDesc}</p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className={styles.highlightsBlock}>
                  <h2 className={styles.sectionHeading}>Key Engineering Milestones</h2>
                  <ul className={styles.highlightsList}>
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className={styles.highlightItem}>
                        <span className={styles.highlightBullet}>✦</span>
                        <span className={styles.highlightText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sequential Navigation (Prev / Next) */}
            {(prevProject || nextProject) && (
              <nav aria-label="Project Navigation" className={styles.paginationNav}>
                {prevProject ? (
                  <Link href={`/projects/${prevProject.id}`} className={styles.navCard}>
                    <span className={styles.navCardLabel}>← Previous Project</span>
                    <span className={styles.navCardTitle}>{prevProject.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.id}`}
                    className={`${styles.navCard} ${styles.navCardNext}`}
                  >
                    <span className={styles.navCardLabel}>Next Project →</span>
                    <span className={styles.navCardTitle}>{nextProject.title}</span>
                  </Link>
                )}
              </nav>
            )}

            {/* Related Projects Section */}
            {relatedProjects.length > 0 && (
              <section className={styles.relatedSection}>
                <h2 className={styles.sectionHeading}>Related Engineering Projects</h2>
                <div className={styles.relatedGrid}>
                  {relatedProjects.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/projects/${rel.id}`}
                      className={styles.relatedCard}
                    >
                      <div className={styles.relatedImgWrap}>
                        <img
                          src={rel.image}
                          alt={`${rel.title} thumbnail`}
                          className={styles.relatedImg}
                        />
                      </div>
                      <div className={styles.relatedContent}>
                        <span className={styles.relatedCat}>{rel.category}</span>
                        <h3 className={styles.relatedTitle}>{rel.title}</h3>
                        <p className={styles.relatedDesc}>{rel.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Footer Actions */}
            <footer className={styles.projectFooter}>
              <Link href="/projects" className={styles.backAllBtn}>
                ← View All Projects Archive
              </Link>
              <Link href="/#contact" className={styles.contactBtn}>
                Discuss Project / Collaboration ✉
              </Link>
            </footer>
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
