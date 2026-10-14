'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Send,
  Square,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  Building2,
  Rocket,
  Calculator,
  Brain,
  MessageSquare,
  ExternalLink,
  FolderGit2,
  Layers,
  ChevronRight,
} from 'lucide-react'
import TopModeSwitcher from '../../components/TopModeSwitcher'
import AssistantMessage from '../../components/assistant/AssistantMessage'
import { SUGGESTED_QUERIES } from '../../data/assistantKnowledge'
import styles from './AIPage.module.css'
import widgetStyles from '../../components/assistant/AssistantWidget.module.css'

const QUICK_STARTERS = [
  {
    title: 'Real Estate Website Cost',
    desc: 'Pricing, property filters, Google Maps & WhatsApp lead capture.',
    query: 'How much does a Real Estate website cost and what features are included?',
  },
  {
    title: 'HackVerse \'26 Platform',
    desc: '24H state tech fest portal, countdown telemetry & embargo engine.',
    query: 'Tell me about HackVerse \'26 and the digital platform Prakash built for it.',
  },
  {
    title: 'Project Cost Estimator',
    desc: 'Customize pages, CMS, animations & AI to calculate an instant quote.',
    query: 'How does the interactive project cost estimator work and what are the pricing tiers?',
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Custom RAG assistants, private local LLMs & computer vision.',
    query: 'What AI and Machine Learning solutions does Prakash offer?',
  },
  {
    title: 'Cafe & Restaurant Menus',
    desc: 'Digital food menus, table QR codes & instant kitchen dispatch.',
    query: 'Can you show me the Cafe & Restaurant website solution and pricing?',
  },
  {
    title: 'Hire Prakash / Contact',
    desc: 'Direct WhatsApp bridge, project timelines & contract availability.',
    query: 'How can I contact Prakash directly to discuss a freelance project or hire him?',
  },
]

export default function AIPageClient() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)

  const messagesEndRef = useRef(null)
  const scrollAreaRef = useRef(null)
  const inputRef = useRef(null)
  const abortControllerRef = useRef(null)

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior,
      })
    } else if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: 'nearest' })
    }
  }, [])

  useEffect(() => {
    scrollToBottom('auto')
    inputRef.current?.focus()
  }, [scrollToBottom])

  useEffect(() => {
    if (isStreaming) {
      scrollToBottom('smooth')
    }
  }, [messages, isStreaming, scrollToBottom])

  const handleSend = async (textToSend) => {
    const prompt = (textToSend || input).trim()
    if (!prompt || isStreaming) return

    setInput('')

    const userMessage = { role: 'user', content: prompt }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    const assistantIndex = updatedMessages.length
    const startTime = Date.now()

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: '',
        thinking: '',
        isStreamingThinking: true,
        isStreamingContent: false,
        duration: null,
      },
    ])

    setIsStreaming(true)

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let accumulatedThinking = ''
      let accumulatedContent = ''
      let thinkingEndTime = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || !trimmed.startsWith('data:')) continue

          const dataStr = trimmed.slice(5).trim()
          if (dataStr === '[DONE]') continue

          try {
            const parsed = JSON.parse(dataStr)
            const msg = parsed.message

            if (msg?.thinking) {
              accumulatedThinking += msg.thinking
              setMessages((prev) => {
                const next = [...prev]
                if (next[assistantIndex]) {
                  next[assistantIndex] = {
                    ...next[assistantIndex],
                    thinking: accumulatedThinking,
                    isStreamingThinking: true,
                    isStreamingContent: false,
                  }
                }
                return next
              })
            }

            if (msg?.content) {
              if (!thinkingEndTime) {
                thinkingEndTime = Date.now()
              }
              accumulatedContent += msg.content
              setMessages((prev) => {
                const next = [...prev]
                if (next[assistantIndex]) {
                  next[assistantIndex] = {
                    ...next[assistantIndex],
                    content: accumulatedContent,
                    isStreamingThinking: false,
                    isStreamingContent: true,
                    duration: thinkingEndTime ? (thinkingEndTime - startTime) / 1000 : null,
                  }
                }
                return next
              })
            }

            if (parsed.done) {
              setMessages((prev) => {
                const next = [...prev]
                if (next[assistantIndex]) {
                  next[assistantIndex] = {
                    ...next[assistantIndex],
                    isStreamingThinking: false,
                    isStreamingContent: false,
                    duration: thinkingEndTime ? (thinkingEndTime - startTime) / 1000 : null,
                  }
                }
                return next
              })
            }
          } catch (e) {
            // Ignore malformed chunks
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Chat error:', err)
        setMessages((prev) => {
          const next = [...prev]
          if (next[assistantIndex]) {
            next[assistantIndex] = {
              ...next[assistantIndex],
              content:
                next[assistantIndex].content ||
                'I encountered a temporary connection issue. Please feel free to ask again or reach Prakash directly on WhatsApp or Email!',
              isStreamingThinking: false,
              isStreamingContent: false,
            }
          }
          return next
        })
      }
    } finally {
      setIsStreaming(false)
      abortControllerRef.current = null
      setTimeout(() => scrollToBottom('smooth'), 100)
    }
  }

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsStreaming(false)
    }
  }

  const handleClear = () => {
    if (isStreaming) handleStop()
    setMessages([])
  }

  return (
    <div className={styles.pageContainer} data-lenis-prevent>
      {/* ─── Mode Switcher at the very top (Sticky) ─── */}
      <TopModeSwitcher forceMode="ai" sticky />

      {/* ─── Full Studio Layout ─── */}
      <div className={styles.studioLayout} data-lenis-prevent>
        {/* Left Sidebar */}
        <aside className={styles.sidebar} data-lenis-prevent>
          <div>
            <div className={styles.sidebarHeader}>
              <div className={styles.studioAvatar}>
                <Bot size={24} />
                <span className={styles.studioStatus} />
              </div>
              <div>
                <h2 className={styles.studioTitle}>Prakash AI Studio</h2>
                <span className={styles.studioBadge}>gpt-oss:120b</span>
              </div>
            </div>

            <div className={styles.sectionLabel}>Knowledge Base Grounding</div>
            <div className={styles.groundingList}>
              <div className={styles.groundingItem}>
                <span className={styles.groundingDot} />
                <span>30+ Full-Stack Projects</span>
              </div>
              <div className={styles.groundingItem}>
                <span className={styles.groundingDot} />
                <span>Services &amp; Pricing Catalog</span>
              </div>
              <div className={styles.groundingItem}>
                <span className={styles.groundingDot} />
                <span>Live Interactive Cost Estimator</span>
              </div>
              <div className={styles.groundingItem}>
                <span className={styles.groundingDot} />
                <span>HackVerse &apos;26 &amp; ISRO BAH PS-07</span>
              </div>
            </div>

            <div className={styles.sectionLabel}>Quick Inquiries</div>
            <div className={styles.quickPromptsList}>
              {QUICK_STARTERS.slice(0, 4).map((qs, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(qs.query)}
                  className={styles.promptPill}
                >
                  <span>{qs.title}</span>
                  <ChevronRight size={13} style={{ color: '#78716C' }} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sidebarFooter}>
            <Link href="/" className={styles.navLinkSecondary}>
              <User size={14} />
              <span>Personal Portfolio</span>
            </Link>
            <Link href="/services" className={styles.navLinkSecondary}>
              <Layers size={14} />
              <span>Services &amp; Pricing</span>
            </Link>
            <Link href="/projects" className={styles.navLinkSecondary}>
              <FolderGit2 size={14} />
              <span>Projects Archive</span>
            </Link>
          </div>
        </aside>

        {/* Main Chat Stage */}
        <main className={styles.mainStage}>
          {/* Header */}
          <div className={styles.mainHeader}>
            <div className={styles.headerTitle}>Prakash Conversational Intelligence</div>
            <div className={styles.headerMeta}>
              {messages.length > 0 && (
                <button type="button" onClick={handleClear} className={styles.clearBtn}>
                  <RotateCcw size={13} />
                  <span>Clear Conversation</span>
                </button>
              )}
              <a
                href="https://wa.me/917205252871?text=Hi%20Prakash,%20I%20am%20exploring%20your%20portfolio%20AI%20and%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.clearBtn}
                style={{ color: '#22C55E', borderColor: 'rgba(34, 197, 94, 0.3)' }}
              >
                <MessageSquare size={13} />
                <span>WhatsApp Prakash</span>
              </a>
            </div>
          </div>

          {/* Messages Scroll Thread */}
          <div ref={scrollAreaRef} className={styles.messagesScrollArea} data-lenis-prevent>
            {messages.length === 0 ? (
              <div className={styles.heroWelcome}>
                <div className={styles.heroIconBox}>
                  <Sparkles size={34} />
                </div>
                <h1 className={styles.heroHeading}>
                  Ask <span className={styles.heroHeadingAccent}>Prakash AI</span> Anything
                </h1>
                <p className={styles.heroSub}>
                  Grounded with the complete engineering portfolio, service catalog, pricing models,
                  and real-time cost estimation.
                </p>

                <div className={styles.starterGrid}>
                  {QUICK_STARTERS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(item.query)}
                      className={styles.starterCard}
                    >
                      <div className={styles.starterTitle}>{item.title}</div>
                      <div className={styles.starterDesc}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isUser = msg.role === 'user'

                return (
                  <div
                    key={index}
                    className={`${widgetStyles.messageRow} ${
                      isUser ? widgetStyles.userRow : widgetStyles.assistantRow
                    }`}
                  >
                    {!isUser && (
                      <div className={widgetStyles.botAvatarSmall}>
                        <Bot size={16} />
                      </div>
                    )}

                    <div
                      className={isUser ? widgetStyles.userBubble : widgetStyles.assistantBubble}
                      style={{ maxWidth: isUser ? '75%' : '85%' }}
                    >
                      {isUser ? (
                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                      ) : (
                        <AssistantMessage
                          content={msg.content}
                          thinking={msg.thinking}
                          isStreamingThinking={msg.isStreamingThinking}
                          isStreamingContent={msg.isStreamingContent}
                          duration={msg.duration}
                        />
                      )}
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Sticky Input Card */}
          <div className={styles.inputTrayWrapper}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className={styles.inputCard}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                rows={1}
                placeholder="Ask about website costs, projects, AI solutions, or estimate a build..."
                className={styles.inputField}
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStop}
                  title="Stop generating"
                  className={styles.stopButton}
                >
                  <Square size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  title="Send message"
                  className={styles.sendButton}
                >
                  <Send size={16} />
                </button>
              )}
            </form>

            <div className={styles.trayFooterText}>
              <span>Press Enter to send • Shift+Enter for newline</span>
              <span className={styles.powerTag}>CodeByPrakash • gpt-oss:120b</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
