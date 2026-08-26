import { ImageResponse } from 'next/og'

export const alt = 'Om Prakash Behera — Computer Science Engineer & Full-Stack AI Developer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
            top: '-80px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 0, 0.3) 0%, rgba(255, 107, 0, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0) 70%)',
          }}
        />

        {/* Top Bar */}
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
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: '#FF6B00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '20px',
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
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  color: '#ffffff',
                }}
              >
                OMPRAKASH BEHERA
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#9CA3AF',
                }}
              >
                CodeByPrakash • Government College of Engineering Kalahandi
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#4ADE80',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4ADE80',
              }}
            />
            <span>Available for Work &amp; Collaborations</span>
          </div>
        </div>

        {/* Center: Main Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#FF6B00',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Computer Science Engineer &amp; AI Developer
          </span>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#F9FAFB',
              margin: 0,
              letterSpacing: '-0.02em',
              maxWidth: '960px',
            }}
          >
            Building Intelligent Systems For All.
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#9CA3AF',
              margin: 0,
              maxWidth: '850px',
              lineHeight: 1.5,
            }}
          >
            AI/ML Architectures • Computer Vision • Full-Stack Web Applications • 30+ Projects • 100+ GitHub Repositories
          </p>
        </div>

        {/* Bottom Bar: Stats & Link */}
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
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#FF6B00' }}>3+</span>
              <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Years Experience</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#3B82F6' }}>30+</span>
              <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Projects Built</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#A855F7' }}>100+</span>
              <span style={{ fontSize: '13px', color: '#9CA3AF' }}>GitHub Repos</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#22C55E' }}>1st Prize</span>
              <span style={{ fontSize: '13px', color: '#9CA3AF' }}>YOUTH@2050 Winner</span>
            </div>
          </div>

          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#F3F4F6',
            }}
          >
            https://omprakashbehera.me
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
