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

// Topic-specific preview metadata & mockups
const TOPIC_PREVIEWS = {
  'isro-bah-2026-exoplanet-detection-ml': {
    file: 'isro_transit_cnn.py',
    metricLabel: 'ROC-AUC SCORE',
    metricVal: '0.964',
    subMetric: 'Kepler DR25 Photometry',
    accentColor: '#A855F7',
    tech: ['1D-CNN', 'Kepler', 'BLS', 'Python'],
    snippet: 'model.fit(transit_flux, epochs=50)\n# 1D-CNN Ingress/Egress Symmetry\naccuracy = 96.4% | loss = 0.042',
  },
  'sih-2025-attendtrue-analytic': {
    file: 'attendtrue_vision.py',
    metricLabel: 'LIVENESS CONFIDENCE',
    metricVal: '99.2%',
    subMetric: 'Anti-Spoofing AI',
    accentColor: '#3B82F6',
    tech: ['OpenCV', 'Anti-Spoofing', 'Analytics', 'React'],
    snippet: 'verify_biometrics(student_id)\n# Anti-Spoofing Liveness Verified\nstatus = RECORDED (18ms)',
  },
  'mrs-ai-medicine-recommender-system': {
    file: 'mrs_diagnosis_svc.py',
    metricLabel: '1ST PRIZE WINNER',
    metricVal: '95.8%',
    subMetric: 'YOUTH@2050 Exhibition',
    accentColor: '#FF6B00',
    tech: ['SVC ML', 'Streamlit', 'Python', 'Flask'],
    snippet: 'predict_disease(symptoms)\n# Multi-Class SVC Model\nrecommend_pharma = True',
  },
  'cyberterminal-os-retro-modern-web-os': {
    file: 'terminal_kernel.sh',
    metricLabel: 'FRAME TELEMETRY',
    metricVal: '60 FPS',
    subMetric: 'CRT Shaders & HTOP',
    accentColor: '#22C55E',
    tech: ['Next.js', 'BASH', 'HTOP', 'Tailwind'],
    snippet: '$ htop --live-telemetry\n# VRAM: 4.2GB / 8GB (52%)\n$ neofetch --os CyberTerminal',
  },
  'media-pipe-ar-hand-gesture-canvas': {
    file: 'mediapipe_ar.ts',
    metricLabel: 'TRACKING POINTS',
    metricVal: '21 Joints',
    subMetric: 'Sub-15ms Latency',
    accentColor: '#10B981',
    tech: ['MediaPipe', 'Bézier', 'Canvas API', 'React'],
    snippet: 'detect_hand_landmarks(frame)\n# 21 3D Joint Keypoints\nrender_air_canvas(pinch_event)',
  },
  'unvoiced-isl-indian-sign-language-ai': {
    file: 'isl_translator.py',
    metricLabel: 'TRANSLATION SPEED',
    metricVal: '14ms',
    subMetric: 'Real-time Sign Voice',
    accentColor: '#8B5CF6',
    tech: ['OpenCV', 'ISL Dataset', 'TTS Engine', 'AI'],
    snippet: 'parse_isl_gesture(landmarks)\n# Sign-to-Speech Engine\ntts_output = "Welcome to GCEK"',
  },
  'stadium-ai-vision-crowd-density-monitoring': {
    file: 'stadium_yolo_v8.py',
    metricLabel: 'DENSITY ACCURACY',
    metricVal: '97.5%',
    subMetric: 'Homography Bird’s-Eye',
    accentColor: '#EF4444',
    tech: ['YOLOv8', 'Homography', 'Heatmap', 'PyTorch'],
    snippet: 'yolo.track(surveillance_feed)\n# Bird’s-Eye Heatmap Grid\nsurge_alert = LEVEL_0 (Normal)',
  },
  'local-llm-chatui-ollama-execution-layer': {
    file: 'llm_quantization.yaml',
    metricLabel: 'VRAM OFFLOAD',
    metricVal: '33/33',
    subMetric: 'GGUF 4-Bit Quantized',
    accentColor: '#3B82F6',
    tech: ['Ollama', 'GGUF', 'Llama-3', 'WebUI'],
    snippet: 'ollama run deepseek-r1:8b\n# GPU Layers Offloaded: 100%\ntokens/sec = 48.6 t/s',
  },
  'lstm-stock-price-predictor-time-series': {
    file: 'bilstm_forecasting.py',
    metricLabel: 'MAPE ACCURACY',
    metricVal: '94.2%',
    subMetric: 'Bi-LSTM + RSI + MACD',
    accentColor: '#FF6B00',
    tech: ['LSTM', 'Time Series', 'Keras', 'Pandas'],
    snippet: 'model.predict(ohlc_window)\n# Multi-Feature Technical Indicators\nforecast_direction = BULLISH',
  },
  'smartplacement-campus-readiness-predictor': {
    file: 'placement_engine.py',
    metricLabel: 'PREDICTION RATE',
    metricVal: '92.6%',
    subMetric: 'Student Gap Analysis',
    accentColor: '#10B981',
    tech: ['Scikit-Learn', 'Roadmaps', 'FastAPI', 'ML'],
    snippet: 'evaluate_readiness(student_profile)\n# Placement Readiness Index\nprob = 89.4% (Tier-1 Ready)',
  },
  'public-dns-switcher-network-orchestration': {
    file: 'dns_benchmarker.ps1',
    metricLabel: 'RTT BENCHMARK',
    metricVal: '< 8ms',
    subMetric: 'Windows Netsh Stack',
    accentColor: '#3B82F6',
    tech: ['PowerShell', 'Netsh', 'RTT Ping', 'CLI'],
    snippet: 'Test-DnsLatency -Servers 1.1.1.1, 8.8.8.8\n# Cloudflare Primary: 6.4ms\nSet-DnsAddress -Adapter "Wi-Fi"',
  },
  'biometric-face-recognition-sqlite-haar': {
    file: 'face_embedding_128d.py',
    metricLabel: 'MATCH ACCURACY',
    metricVal: '98.7%',
    subMetric: '128D Face Embeddings',
    accentColor: '#8B5CF6',
    tech: ['Haar Cascade', 'SQLite', '128D Vector', 'Python'],
    snippet: 'match_face(embedding_128d)\n# SQLite Cosine Distance < 0.38\nuser_auth = VERIFIED',
  },
}

export default async function Image({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug) || {
    title: 'Technical Article Deep Dive',
    excerpt: 'Comprehensive engineering article and architecture breakdown by Om Prakash Behera.',
    category: 'AI & ML',
    date: '2026',
    readTime: '8 min read',
    tags: ['AI', 'Engineering', 'FullStack'],
  }

  // Load avatar image as base64 data URI
  let avatarDataUri = ''
  try {
    const avatarPath = path.join(process.cwd(), 'public', 'omprakash.png')
    if (fs.existsSync(avatarPath)) {
      const avatarBuffer = fs.readFileSync(avatarPath)
      avatarDataUri = `data:image/png;base64,${avatarBuffer.toString('base64')}`
    }
  } catch (e) {
    avatarDataUri = 'https://omprakashbehera.me/omprakash.png'
  }

  const preview = TOPIC_PREVIEWS[slug] || {
    file: 'architecture_core.py',
    metricLabel: 'ENGINEERING SPEC',
    metricVal: 'Production',
    subMetric: 'Full-Stack Architecture',
    accentColor: '#FF6B00',
    tech: post.tags ? post.tags.slice(0, 4) : ['Engineering', 'AI', 'Systems'],
    snippet: '# Production Architecture Pipeline\nstatus = DEPLOYED (100% Verified)',
  }

  const wordCount = post.content ? post.content.split(/\s+/).length + post.title.split(/\s+/).length : 1200

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '48px 56px',
          background: 'linear-gradient(135deg, #07090D 0%, #11151F 50%, #0A0D14 100%)',
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
            right: '250px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${preview.accentColor}33 0%, rgba(0, 0, 0, 0) 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-90px',
            left: '-60px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 0, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
          }}
        />

        {/* ─── LEFT COLUMN: Author & Article Details (640px) ─── */}
        <div
          style={{
            width: '640px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          {/* Author Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {avatarDataUri ? (
              <img
                src={avatarDataUri}
                alt="Om Prakash Behera"
                width="56"
                height="56"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2.5px solid #FF6B00',
                  boxShadow: '0 0 14px rgba(255, 107, 0, 0.45)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FF6B00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '18px',
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
                gap: '1px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.4px',
                  }}
                >
                  Om Prakash Behera
                </span>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(255, 107, 0, 0.2)',
                    border: '1px solid #FF6B00',
                    color: '#FF8C33',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {post.category}
                </span>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                }}
              >
                BTech CSE @ GCEK • Full-Stack &amp; AI Developer (@CodeByPrakash)
              </span>
            </div>
          </div>

          {/* Center: Title & Synopsis */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '8px 0',
            }}
          >
            <h1
              style={{
                fontSize: post.title.length > 55 ? '32px' : '36px',
                fontWeight: 900,
                lineHeight: 1.22,
                color: '#F9FAFB',
                margin: 0,
                letterSpacing: '-0.025em',
                maxWidth: '620px',
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontSize: '15px',
                color: '#CBD5E1',
                lineHeight: 1.48,
                margin: 0,
                maxWidth: '600px',
              }}
            >
              {post.excerpt}
            </p>
          </div>

          {/* Bottom Bar: Meta + Tags */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '13px',
                color: '#94A3B8',
              }}
            >
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{wordCount.toLocaleString()} words</span>
              <span>•</span>
              <span style={{ color: '#FF6B00', fontWeight: 600 }}>omprakashbehera.me</span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '12px',
                    color: '#E2E8F0',
                    fontWeight: 600,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Dynamic Blog Visual Preview Card (420px) ─── */}
        <div
          style={{
            width: '420px',
            height: '490px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            borderRadius: '22px',
            background: 'linear-gradient(145deg, #131824 0%, #0F131D 100%)',
            border: `1.5px solid ${preview.accentColor}55`,
            boxShadow: `0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px ${preview.accentColor}22, inset 1px 1px 2px rgba(255, 255, 255, 0.1)`,
            zIndex: 2,
            position: 'relative',
          }}
        >
          {/* Mockup Card Header (macOS Dots + File Name) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '14px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
            </div>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: preview.accentColor,
                fontWeight: 700,
              }}
            >
              {preview.file}
            </span>
          </div>

          {/* Center Metric Display Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              borderRadius: '14px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: `1px solid ${preview.accentColor}33`,
              margin: '8px 0',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#94A3B8',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {preview.metricLabel}
            </span>
            <span
              style={{
                fontSize: '36px',
                fontWeight: 900,
                color: preview.accentColor,
                lineHeight: 1.1,
                margin: '4px 0',
              }}
            >
              {preview.metricVal}
            </span>
            <span
              style={{
                fontSize: '12px',
                color: '#CBD5E1',
              }}
            >
              {preview.subMetric}
            </span>
          </div>

          {/* Live Code / Architecture Snippet */}
          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              background: '#07090F',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              fontFamily: 'monospace',
              fontSize: '11.5px',
              color: '#A5F3FC',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}
          >
            {preview.snippet}
          </div>

          {/* Tech Stack Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              paddingTop: '8px',
            }}
          >
            {preview.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: `${preview.accentColor}18`,
                  border: `1px solid ${preview.accentColor}44`,
                  color: '#F1F5F9',
                  fontSize: '10.5px',
                  fontWeight: 700,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
