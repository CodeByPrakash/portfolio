import { ImageResponse } from 'next/og'
import { BLOG_POSTS } from '../../../data/blogPosts'

export const alt = 'Om Prakash Behera — Technical Article Preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug) || {
    title: 'Technical Article Deep Dive',
    category: 'Engineering',
    date: '2026',
    readTime: '7 min read',
    tags: ['AI', 'Engineering'],
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          background: 'linear-gradient(135deg, #090B0E 0%, #151921 50%, #0D1117 100%)',
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
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 0, 0.25) 0%, rgba(255, 107, 0, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '300px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0) 70%)',
          }}
        />

        {/* Top Bar: Brand & Category Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#FF6B00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '18px',
                color: '#ffffff',
                letterSpacing: '1px',
              }}
            >
              OPB
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: '#ffffff',
                }}
              >
                OMPRAKASH BEHERA
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#9CA3AF',
                  letterSpacing: '0.5px',
                }}
              >
                CodeByPrakash • Engineering Deep Dive
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 107, 0, 0.15)',
              border: '1.5px solid rgba(255, 107, 0, 0.4)',
              color: '#FF8C33',
              fontSize: '16px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {post.category}
          </div>
        </div>

        {/* Center: Article Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 2,
            maxWidth: '1060px',
          }}
        >
          <h1
            style={{
              fontSize: post.title.length > 60 ? '42px' : '48px',
              fontWeight: 800,
              lineHeight: 1.22,
              color: '#F9FAFB',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '17px',
              color: '#9CA3AF',
            }}
          >
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>omprakashbehera.me</span>
          </div>
        </div>

        {/* Bottom Bar: Tags & Author Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
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
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '14px',
                  color: '#D1D5DB',
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
              fontWeight: 600,
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
