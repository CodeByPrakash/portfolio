'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowLeft, Search, Layers, CheckCircle2 } from 'lucide-react'
import { PROJECTS_DATA, PROJECT_CATEGORIES } from '../data/projectsData'
import styles from './ProjectsArchive.module.css'

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function ProjectsArchive() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedId, setHighlightedId] = useState('')

  // Handle URL hash anchor on mount (e.g. /projects#isro-exoplanet-ml)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setHighlightedId(hash)
        setTimeout(() => {
          const el = document.getElementById(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 300)
      }
    }
  }, [])

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.desc.toLowerCase().includes(query) ||
        project.longDesc.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <section className={styles.archiveSection} aria-label="Dedicated Projects Archive">
      <div className="section-wrap">
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.topBar}>
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>Projects Archive</span>
            </div>

            <Link href="/" className={styles.backHomeBtn}>
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>

          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Project <span className={styles.accent}>Archive</span>
          </motion.h1>

          <p className={styles.subHeading}>
            Comprehensive technical breakdown, system architecture, open-source repositories, and production deployments engineered by Om Prakash Behera.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className={styles.controlsRow}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by project name, tech stack, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
          </div>

          <div className={styles.filterPills} role="tablist" aria-label="Filter projects by category">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Detailed List */}
        {filteredProjects.length === 0 ? (
          <div className={styles.noResults}>
            <Layers size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3>No projects found matching your criteria.</h3>
            <p>Try searching for a different keyword or resetting the category filter.</p>
          </div>
        ) : (
          <div className={styles.projectsList}>
            <AnimatePresence>
              {filteredProjects.map((p, idx) => (
                <motion.article
                  key={p.id}
                  id={p.id}
                  className={`${styles.projectCard} ${highlightedId === p.id ? styles.highlightCard : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  {/* Left Column: Image Preview Banner */}
                  <div className={styles.imageWrap}>
                    <img
                      src={p.image}
                      alt={`${p.title} Preview Banner`}
                      className={styles.cardImg}
                      loading="lazy"
                    />
                  </div>

                  {/* Right Column: In-Depth Information */}
                  <div className={styles.cardContent}>
                    <div className={styles.metaRow}>
                      <span className={styles.categoryTag}>◈ {p.category}</span>
                      <span className={styles.yearTag}>Year: {p.stats.year}</span>
                    </div>

                    <Link href={`/projects/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h2 className={styles.cardTitle}>{p.title}</h2>
                    </Link>
                    <h3 className={styles.cardSubtitle}>{p.subtitle}</h3>

                    <p className={styles.cardDescription}>
                      {p.longDesc || p.desc}
                    </p>

                    {/* Key Technical Highlights */}
                    {p.highlights && p.highlights.length > 0 && (
                      <ul className={styles.highlightsList}>
                        {p.highlights.map((h, i) => (
                          <li key={i} className={styles.highlightItem}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack Tags */}
                    <div className={styles.tagsRow} aria-label="Technologies used">
                      {p.tags.map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className={styles.actionsRow}>
                      <Link
                        href={`/projects/${p.id}`}
                        className={styles.detailsActionBtn}
                      >
                        Details ↗
                      </Link>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.primaryBtn}
                        >
                          <ExternalLink size={16} /> Live Demo ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.secondaryBtn}
                        >
                          <GithubIcon size={16} /> GitHub Source ↗
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
