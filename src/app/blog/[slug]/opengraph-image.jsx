import { ImageResponse } from 'next/og'
import fs from 'node:fs'
import path from 'node:path'
import { BLOG_POSTS } from '../../../data/blogPosts'

export const alt = 'Om Prakash Behera — Technical Article Preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Category color mappings
const CATEGORY_COLORS = {
  'Artificial Intelligence': { bg: 'rgba(255, 107, 0, 0.18)', border: '#FF6B00', text: '#FF8C33' },
  'Computer Vision': { bg: 'rgba(16, 185, 129, 0.18)', border: '#10B981', text: '#34D399' },
  'Systems': { bg: 'rgba(139, 92, 246, 0.18)', border: '#8B5CF6', text: '#A78BFA' },
  'Web Development': { bg: 'rgba(59, 130, 246, 0.18)', border: '#3B82F6', text: '#60A5FA' },
  'Security & Infrastructure': { bg: 'rgba(239, 68, 68, 0.18)', border: '#EF4444', text: '#F87171' },
}

export default async function Image({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug) || {
    title: 'Technical Article Deep Dive',
    excerpt: 'Comprehensive engineering article and architecture breakdown by Om Prakash Behera.',
    category: 'Artificial Intelligence',
    date: '2026',
    readTime: '7 min read',
    tags: ['AI', 'Engineering', 'FullStack'],
  }

  // Load avatar image as base64 data URI for 100% reliable offline / build-time rendering in Satori
  let avatarDataUri = ''
  try {
    const avatarPath = path.join(process.cwd(), 'public', 'omprakash.png')
    if (fs.existsSync(avatarPath)) {
      const avatarBuffer = fs.readFileSync(avatarPath)
      avatarDataUri = `data:image/png;base64,${avatarBuffer.toString('base64')}`
    }
  } catch (e) {
    // Fallback to absolute URL if filesystem read fails
    avatarDataUri = 'https://omprakashbehera.me/omprakash.png'
  }

  const catStyle = CATEGORY_COLORS[post.category] || CATEGORY_COLORS['Artificial Intelligence']
  const wordCount = post.content ? post.content.split(/\s+/).length + post.title.split(/\s+/).length : 1200

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '54px 64px',
          background: 'linear-gradient(135deg, #090B0E 0%, #12161F 45%, #0B0E14 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow Accents */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 0, 0.28) 0%, rgba(255, 107, 0, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '250px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(59, 130, 246, 0) 70%)',
          }}
        />

        {/* Top Bar: Author Avatar, Identity & Category Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          {/* Author Identity with Photo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {avatarDataUri ? (
              <img
                src={avatarDataUri}
                alt="Om Prakash Behera"
                width="64"
                height="64"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2.5px solid #FF6B00',
                  boxShadow: '0 0 16px rgba(255, 107, 0, 0.5)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#FF6B00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '20px',
                  color: '#ffffff',
                }}
              >
                OPB
              </div>
            )}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                }}
              >
                Om Prakash Behera
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#9CA3AF',
                  letterSpacing: '0.3px',
                }}
              >
                BTech CSE @ GCEK • Full-Stack &amp; AI Developer (@CodeByPrakash)
              </span>
            </div>
          </div>

          {/* Category Pill */}
          <div
            style={{
              padding: '8px 22px',
              borderRadius: '9999px',
              background: catStyle.bg,
              border: `1.5px solid ${catStyle.border}`,
              color: catStyle.text,
              fontSize: '15px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {post.category}
          </div>
        </div>

        {/* Center: Article Title & Excerpt */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 2,
            maxWidth: '1070px',
          }}
        >
          <h1
            style={{
              fontSize: post.title.length > 55 ? '40px' : '46px',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#F9FAFB',
              margin: 0,
              letterSpacing: '-0.025em',
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: '#D1D5DB',
              lineHeight: 1.45,
              margin: 0,
              maxWidth: '1000px',
            }}
          >
            {post.excerpt}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: '15px',
              color: '#9CA3AF',
              marginTop: '4px',
            }}
          >
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>{wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span style={{ color: '#FF8C33' }}>omprakashbehera.me</span>
          </div>
        </div>

        {/* Bottom Bar: Tags & Read CTA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '18px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  fontSize: '14px',
                  color: '#E5E7EB',
                  fontWeight: 600,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FF6B00',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            <span>Read on omprakashbehera.me</span>
            <span style={{ fontSize: '20px' }}>↗</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
