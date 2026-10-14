'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Sparkles,
  X,
  Send,
  Square,
  RotateCcw,
  Maximize2,
  Minimize2,
  Bot,
  User,
  ArrowRight,
  Building2,
  Rocket,
  Calculator,
  Brain,
} from 'lucide-react'
import AssistantMessage from './AssistantMessage'
import { SUGGESTED_QUERIES } from '../../data/assistantKnowledge'
import styles from './AssistantWidget.module.css'

const QUERY_ICONS = {
  Building2,
  Rocket,
  Calculator,
  Brain,
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const abortControllerRef = useRef(null)

  // Auto-scroll to bottom of chat
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto')
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, scrollToBottom])

  useEffect(() => {
    if (isStreaming) {
      scrollToBottom('smooth')
    }
  }, [messages, isStreaming, scrollToBottom])

  // Keyboard shortcut Ctrl/Cmd + K to toggle assistant
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Send message handler
  const handleSend = async (textToSend) => {
    const prompt = (textToSend || input).trim()
    if (!prompt || isStreaming) return

    setInput('')

    // Create user message
    const userMessage = { role: 'user', content: prompt }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    // Placeholder for assistant response
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

    // Setup abort controller
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

  // Stop active generation
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsStreaming(false)
    }
  }

  // Clear chat session
  const handleClear = () => {
    if (isStreaming) handleStop()
    setMessages([])
  }

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. FLOATING LAUNCHER BUTTON (Bottom-Right)
          ───────────────────────────────────────────────────────────── */}
      {!isOpen && (
        <div className={styles.launcherWrapper}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={styles.invitationPill}
          >
            <span className={styles.pulseDot} />
            <span>Ask Prakash AI</span>
            <kbd className={styles.shortcutKbd}>Ctrl+K</kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            className={styles.launcherBtn}
          >
            <Sparkles className={styles.sparkleIcon} />
            <span className={styles.onlineBadge} />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING CHAT WINDOW
          ───────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className={`${styles.chatWindow} ${isExpanded ? styles.chatWindowExpanded : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Prakash AI Assistant"
        >
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatarBox}>
                <Bot size={22} />
                <span className={styles.avatarStatus} />
              </div>
              <div className={styles.titleArea}>
                <div className={styles.titleRow}>
                  <h3 className={styles.titleText}>Prakash AI</h3>
                  <span className={styles.modelBadge}>gpt-oss:120b</span>
                </div>
                <p className={styles.subtitleText}>Portfolio &amp; Services Intelligence</p>
              </div>
            </div>

            <div className={styles.headerActions}>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear conversation"
                  className={styles.iconBtn}
                >
                  <RotateCcw size={15} />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                title={isExpanded ? 'Restore size' : 'Expand window'}
                className={styles.iconBtn}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className={styles.iconBtn}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesContainer}>
            {messages.length === 0 ? (
              <div className={styles.welcomeWrap}>
                <div className={styles.welcomeIconBox}>
                  <Sparkles size={28} />
                </div>
                <h4 className={styles.welcomeTitle}>How can I help you today?</h4>
                <p className={styles.welcomeDesc}>
                  Ask me about Prakash&apos;s background, projects, full-stack and AI services, pricing
                  tiers, or calculate an instant estimate.
                </p>

                <div className={styles.suggestedHeader}>Suggested Inquiries</div>
                <div className={styles.queryList}>
                  {SUGGESTED_QUERIES.map((sq, idx) => {
                    const Icon = QUERY_ICONS[sq.icon] || Sparkles
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(sq.query)}
                        className={styles.queryCard}
                      >
                        <div className={styles.queryLeft}>
                          <div className={styles.queryIconBox}>
                            <Icon size={15} />
                          </div>
                          <span className={styles.queryLabel}>{sq.label}</span>
                        </div>
                        <ArrowRight size={14} className={styles.queryArrow} />
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isUser = msg.role === 'user'

                return (
                  <div
                    key={index}
                    className={`${styles.messageRow} ${isUser ? styles.userRow : styles.assistantRow}`}
                  >
                    {!isUser && (
                      <div className={styles.botAvatarSmall}>
                        <Bot size={16} />
                      </div>
                    )}

                    <div className={isUser ? styles.userBubble : styles.assistantBubble}>
                      {isUser ? (
                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                      ) : (
                        <AssistantMessage
                          content={msg.content}
                          thinking={msg.thinking}
                          isStreamingThinking={msg.isStreamingThinking}
                          isStreamingContent={msg.isStreamingContent}
                          duration={msg.duration}
                          onNavigate={() => {
                            if (window.innerWidth < 640) {
                              setIsOpen(false)
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className={styles.chatFooter}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className={styles.inputForm}
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
                placeholder="Ask about projects, pricing, AI systems..."
                className={styles.chatTextarea}
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStop}
                  title="Stop generating"
                  className={styles.stopBtn}
                >
                  <Square size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  title="Send message"
                  className={styles.sendBtn}
                >
                  <Send size={16} />
                </button>
              )}
            </form>

            <div className={styles.disclaimerRow}>
              <span>Press Enter to send • Shift+Enter for newline</span>
              <span className={styles.brandTag}>CodeByPrakash AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
