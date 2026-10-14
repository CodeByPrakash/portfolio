'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Brain, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import styles from './AssistantWidget.module.css'

export default function ThinkingBlock({ thinking = '', isStreaming = false, duration = null }) {
  const [isOpen, setIsOpen] = useState(isStreaming)
  const scrollRef = useRef(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    let timer = null
    if (isStreaming) {
      setIsOpen(true)
      const startTime = Date.now()
      timer = setInterval(() => {
        setElapsed(((Date.now() - startTime) / 1000).toFixed(1))
      }, 100)
    } else {
      if (timer) clearInterval(timer)
      const timeout = setTimeout(() => {
        setIsOpen(false)
      }, 600)
      return () => clearTimeout(timeout)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isStreaming])

  // Auto-scroll thoughts as they stream
  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [thinking, isStreaming])

  if (!thinking && !isStreaming) {
    return null
  }

  const displayTime = duration ? duration.toFixed(1) : elapsed

  return (
    <div className={styles.thinkingBlock}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.thinkingToggleBtn}
      >
        <div className={styles.thinkingStatus}>
          {isStreaming ? (
            <>
              <span className={styles.pulseDot} />
              <Brain size={14} className={styles.thinkingActiveText} />
              <span className={styles.thinkingActiveText}>Thinking...</span>
              <span className={styles.timerChip}>{displayTime}s</span>
            </>
          ) : (
            <>
              <Sparkles size={14} style={{ color: '#F59E0B' }} />
              <span>Thought process</span>
              {duration ? <span className={styles.timerChip}>{duration.toFixed(1)}s</span> : null}
            </>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.6875rem' }}>
          <span>{isOpen ? 'Hide' : 'Show reasoning'}</span>
          {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </div>
      </button>

      {isOpen && (
        <div ref={scrollRef} className={styles.thinkingBody}>
          {thinking}
          {isStreaming && <span className={styles.thinkingCursor} />}
        </div>
      )}
    </div>
  )
}
