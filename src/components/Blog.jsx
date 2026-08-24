'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { fadeIn, staggerContainer } from '../utils/motion'
import { BLOG_POSTS } from '../data/blogPosts'
import styles from './Blog.module.css'

const CATEGORIES = ['All', 'Creative Dev & 3D', 'AI & ML', 'Computer Vision', 'AI & Data', 'Web Architecture', 'Cyber Security']

export default function Blog({ isStandalone = false }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(isStandalone ? 6 : 4)

  // Track viewport to adjust items per page: 4 (Home) / 6 (Standalone) for Desktop, 2/3 for Mobile (<768px)
  useEffect(() => {
    const updatePostsPerPage = () => {
      if (typeof window !== 'undefined') {
        const isMobile = window.matchMedia('(max-width: 768px)').matches
        if (isStandalone) {
          setPostsPerPage(isMobile ? 3 : 6)
        } else {
          setPostsPerPage(isMobile ? 2 : 4)
        }
      }
    }

    updatePostsPerPage()

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleViewportChange = () => {
      updatePostsPerPage()
    }

    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [isStandalone])

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    const activeCatNorm = activeCategory.toLowerCase().trim()

    return BLOG_POSTS.filter((post) => {
      const postCatNorm = post.category.toLowerCase().trim()
      const matchesCat =
        activeCategory === 'All' ||
        postCatNorm === activeCatNorm ||
        post.tags.some((t) => t.toLowerCase().trim() === activeCatNorm)

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        postCatNorm.includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query))

      return matchesCat && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Reset to page 1 whenever category or search filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  // Compute total pages and paginated slice
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedPosts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * postsPerPage
    return filteredPosts.slice(startIdx, startIdx + postsPerPage)
  }, [filteredPosts, safeCurrentPage, postsPerPage])

  // Smooth page change handler with auto-scroll
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== safeCurrentPage) {
      setCurrentPage(newPage)
      const targetElement = isStandalone ? document.getElementById('main-content') : document.getElementById('blog')
      if (targetElement) {
        const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({ top: topOffset, behavior: 'smooth' })
      }
    }
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPost(null)
    }
    if (selectedPost) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedPost])

  // Helper to render inline markdown (links, bold, code)
  const renderInline = (text) => {
    if (!text) return null
    const parts = []
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let lastIdx = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.substring(lastIdx, match.index))
      }
      parts.push(
        <a key={`link-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      )
      lastIdx = linkRegex.lastIndex
    }
    if (lastIdx < text.length) {
      parts.push(text.substring(lastIdx))
    }

    return parts.map((part, i) => {
      if (typeof part !== 'string') return part

      const codeSplits = part.split(/(`[^`]+`)/g)
      return codeSplits.map((seg, j) => {
        if (seg.startsWith('`') && seg.endsWith('`') && seg.length > 2) {
          return <code key={`code-${i}-${j}`}>{seg.slice(1, -1)}</code>
        }
        const boldSplits = seg.split(/(\*\*[^*]+\*\*)/g)
        return boldSplits.map((bSeg, k) => {
          if (bSeg.startsWith('**') && bSeg.endsWith('**') && bSeg.length > 4) {
            return <strong key={`bold-${i}-${j}-${k}`}>{bSeg.slice(2, -2)}</strong>
          }
          return bSeg
        })
      })
    })
  }

  // Helper to render article content cleanly
  const renderFormattedContent = (content) => {
    if (!content) return null

    const lines = content.trim().split('\n')
    const elements = []
    let inCodeBlock = false
    let codeBuffer = []

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${idx}`}>
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          )
          codeBuffer = []
          inCodeBlock = false
        } else {
          inCodeBlock = true
        }
        return
      }

      if (inCodeBlock) {
        codeBuffer.push(line)
        return
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={`h3-${idx}`}>{renderInline(line.replace('### ', ''))}</h3>)
      } else if (line.startsWith('## ')) {
        elements.push(<h3 key={`h2-${idx}`}>{renderInline(line.replace('## ', ''))}</h3>)
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={`li-${idx}`} style={{ marginLeft: '1.25rem' }}>
            {renderInline(line.replace('- ', ''))}
          </li>
        )
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={`num-li-${idx}`} style={{ marginLeft: '1.25rem' }}>
            {renderInline(line.replace(/^\d+\.\s/, ''))}
          </li>
        )
      } else if (line.trim().length > 0) {
        elements.push(<p key={`p-${idx}`}>{renderInline(line)}</p>)
      }
    })

    return elements
  }

  return (
    <section id="blog" className={`${styles.blog} ${isStandalone ? styles.standaloneBlog : ''}`}>
      {/* Floating 3D Clay Shapes */}
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapeCapsule}`}
        animate={{ y: [0, -32, 0], rotate: [-10, 15, -10] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${styles.clayShape} ${styles.clayShapeOrb}`}
        animate={{ y: [0, 26, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="section-wrap"
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.08 }}
      >
        {isStandalone && (
          <nav aria-label="Breadcrumb" className={styles.blogBreadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.blogBreadcrumbSep}>/</span>
            <span className={styles.blogBreadcrumbCurrent}>Technical Blog</span>
          </nav>
        )}

        <motion.span className="section-tag" variants={fadeIn('down', 0)}>
          ✦ Articles &amp; Insights
        </motion.span>

        <motion.h2 className={styles.heading} variants={fadeIn('up', 0)}>
          Technical <span className={styles.accent}>Articles.</span>
        </motion.h2>

        <motion.p className={styles.sub} variants={fadeIn('up', 0.1)}>
          Engineering writeups on artificial intelligence, computer vision, web architecture, and systems development.
        </motion.p>

        {/* Controls: Search & Category Pills */}
        <motion.div className={styles.controls} variants={fadeIn('up', 0.15)}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search articles by title, topic, or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.categories}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ''}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className={styles.activeCategoryPill}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={styles.categoryText}>{cat}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Dynamic Articles Grid with Smooth Motion Cards */}
        <div className={styles.grid}>
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <motion.article
                key={post.id}
                className={styles.articleCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                onClick={(e) => {
                  if (!e.target.closest('a')) {
                    setSelectedPost(post)
                  }
                }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.cardMeta}>
                  <span className={`${styles.categoryTag} ${styles[`tag_${post.color}`]}`}>
                    {post.category}
                  </span>
                  <div className={styles.metaInfo}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.cardTitleLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>

                <div className={styles.cardFoot}>
                  <div className={styles.tagsList}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.tagItem}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.readBtn}
                    aria-label={`Read article: ${post.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Article <span>↗</span>
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No matching articles found</h3>
              <p className={styles.emptyDesc}>
                Try adjusting your search query or switching to another category tab.
              </p>
              <button
                type="button"
                className={styles.resetFilterBtn}
                onClick={() => {
                  setActiveCategory('All')
                  setSearchQuery('')
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Responsive Pagination Controls */}
        {filteredPosts.length > 0 && totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              Showing <span className={styles.pageHighlight}>{(safeCurrentPage - 1) * postsPerPage + 1}–{Math.min(safeCurrentPage * postsPerPage, filteredPosts.length)}</span> of <span className={styles.pageHighlight}>{filteredPosts.length}</span> articles
            </div>

            <div className={styles.paginationControls}>
              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className={`${styles.pageNavBtn} ${safeCurrentPage === 1 ? styles.pageNavBtnDisabled : ''}`}
                aria-label="Previous page"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span className={styles.pageNavText}>Previous</span>
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = pageNum === safeCurrentPage
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`${styles.pageNumberBtn} ${isActive ? styles.pageNumberBtnActive : ''}`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <motion.div
                          className={styles.activePagePill}
                          layoutId="activeBlogPagePill"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <span className={styles.pageNumberText}>{pageNum}</span>
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className={`${styles.pageNavBtn} ${safeCurrentPage === totalPages ? styles.pageNavBtnDisabled : ''}`}
                aria-label="Next page"
              >
                <span className={styles.pageNavText}>Next</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* View Full Blog Archive Link (On Home Page) */}
        {!isStandalone && (
          <div className={styles.exploreAllWrap}>
            <Link href="/blog" className={styles.exploreAllBtn}>
              <span>Explore All 12 Technical Articles &amp; Archives</span>
              <span>↗</span>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Interactive Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.modalCloseBtn}
                onClick={() => setSelectedPost(null)}
                aria-label="Close article"
              >
                ✕
              </button>

              <div className={styles.modalHeader}>
                <span className={styles.modalCategory}>{selectedPost.category}</span>
                <h2 className={styles.modalTitle}>{selectedPost.title}</h2>

                <div className={styles.modalMeta}>
                  <div className={styles.modalAuthor}>
                    <span className={styles.authorDot} />
                    <span>Om Prakash Behera</span>
                  </div>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className={styles.articleBody}>
                {renderFormattedContent(selectedPost.content)}
              </div>

              <div className={styles.modalFooterActions}>
                <button
                  type="button"
                  className={styles.resetFilterBtn}
                  onClick={() => setSelectedPost(null)}
                >
                  Close Reader
                </button>
                <Link
                  href={`/blog/${selectedPost.slug}`}
                  className={styles.modalFullPageBtn}
                >
                  Open Dedicated Article Page ↗
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
