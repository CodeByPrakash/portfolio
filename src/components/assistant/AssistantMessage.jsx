'use client'

import React from 'react'
import Link from 'next/link'
import { ExternalLink, Copy, Check } from 'lucide-react'
import ThinkingBlock from './ThinkingBlock'
import CardRenderer from './CardRenderer'
import { filterMarkdownResponse } from '../../utils/markdownFilter'
import styles from './AssistantWidget.module.css'

export default function AssistantMessage({
  content = '',
  thinking = '',
  isStreamingThinking = false,
  isStreamingContent = false,
  duration = null,
  onNavigate,
}) {
  // 1. Filter and normalize response content
  const filteredContent = filterMarkdownResponse(content)

  // 2. Extract card tokens: [card:type:id]
  const cardRegex = /\[card:([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+)\]/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = cardRegex.exec(filteredContent)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        value: filteredContent.slice(lastIndex, match.index),
      })
    }
    parts.push({
      type: 'card',
      key: `${match[1]}:${match[2]}`,
    })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < filteredContent.length) {
    parts.push({
      type: 'text',
      value: filteredContent.slice(lastIndex),
    })
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Reasoning / Thought Process Box */}
      {(thinking || isStreamingThinking) && (
        <ThinkingBlock
          thinking={thinking}
          isStreaming={isStreamingThinking}
          duration={duration}
        />
      )}

      {/* Message Content & Interactive Cards */}
      <div>
        {parts.map((part, pIdx) => {
          if (part.type === 'card') {
            return (
              <CardRenderer
                key={`card-${pIdx}-${part.key}`}
                cardKey={part.key}
                onNavigate={onNavigate}
              />
            )
          }

          return (
            <div key={`text-${pIdx}`}>
              <FormattedMarkdown text={part.value} onNavigate={onNavigate} />
            </div>
          )
        })}

        {isStreamingContent && <span className={styles.streamingCursor} />}
      </div>
    </div>
  )
}

function FormattedMarkdown({ text = '', onNavigate }) {
  if (!text) return null

  const rawLines = text.split('\n')
  const elements = []
  let inCodeBlock = false
  let codeBuffer = []
  let codeLanguage = ''

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i]

    // Code blocks ```
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeBuffer.join('\n')}
            language={codeLanguage}
          />
        )
        codeBuffer = []
        codeLanguage = ''
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLanguage = line.trim().slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      continue
    }

    // Markdown Table Detection
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      // Collect consecutive table lines
      const tableLines = [line]
      let nextIdx = i + 1
      while (
        nextIdx < rawLines.length &&
        rawLines[nextIdx].trim().startsWith('|') &&
        rawLines[nextIdx].trim().endsWith('|')
      ) {
        tableLines.push(rawLines[nextIdx])
        nextIdx++
      }

      // If at least 2 lines and 2nd line is separator |---|
      if (tableLines.length >= 2 && /^\|[\s-:]+\|/.test(tableLines[1].trim())) {
        elements.push(
          <MarkdownTable
            key={`tbl-${i}`}
            lines={tableLines}
            onNavigate={onNavigate}
          />
        )
        i = nextIdx - 1
        continue
      }
    }

    // Horizontal Rule (--- or ***)
    if (/^(\s*[-*_]\s*){3,}$/.test(line.trim())) {
      elements.push(<hr key={`hr-${i}`} className={styles.hrDivider} />)
      continue
    }

    // Empty lines
    if (!line.trim()) {
      elements.push(<div key={`sp-${i}`} style={{ height: 6 }} />)
      continue
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(
        <h4
          key={`h3-${i}`}
          style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', margin: '12px 0 4px 0' }}
        >
          {renderInlineFormatting(line.slice(4), onNavigate)}
        </h4>
      )
      continue
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3
          key={`h2-${i}`}
          style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FF8533', margin: '14px 0 6px 0' }}
        >
          {renderInlineFormatting(line.slice(3), onNavigate)}
        </h3>
      )
      continue
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h2
          key={`h1-${i}`}
          style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', margin: '16px 0 8px 0' }}
        >
          {renderInlineFormatting(line.slice(2), onNavigate)}
        </h2>
      )
      continue
    }

    // Bullet points (- or * or •)
    if (/^[-*•]\s+/.test(line.trim())) {
      const bulletText = line.trim().replace(/^[-*•]\s+/, '')
      elements.push(
        <div key={`li-${i}`} className={styles.bulletRow}>
          <span className={styles.bulletDot} />
          <div style={{ flex: 1 }}>{renderInlineFormatting(bulletText, onNavigate)}</div>
        </div>
      )
      continue
    }

    // Numbered lists (1. , 2. )
    const numMatch = line.trim().match(/^(\d+)\.\s*(.*)/)
    if (numMatch) {
      elements.push(
        <div key={`ol-${i}`} className={styles.numRow}>
          <span className={styles.numIndex}>{numMatch[1]}.</span>
          <div style={{ flex: 1 }}>{renderInlineFormatting(numMatch[2], onNavigate)}</div>
        </div>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} style={{ margin: '4px 0', lineHeight: 1.6 }}>
        {renderInlineFormatting(line, onNavigate)}
      </p>
    )
  }

  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <CodeBlock key="code-end" code={codeBuffer.join('\n')} language={codeLanguage} />
    )
  }

  return <>{elements}</>
}

/**
 * Responsive Markdown Table Renderer
 * Supports <br> tags, multi-line features, bold, and links inside cells
 */
function MarkdownTable({ lines, onNavigate }) {
  if (!lines || lines.length < 2) return null

  const parseRow = (rowLine) => {
    return rowLine
      .trim()
      .slice(1, -1) // remove leading and trailing |
      .split('|')
      .map((col) => col.trim())
  }

  const headers = parseRow(lines[0])
  const rows = lines.slice(2).map(parseRow)

  return (
    <div className={styles.markdownTableWrapper}>
      <table className={styles.markdownTable}>
        <thead>
          <tr>
            {headers.map((th, thIdx) => (
              <th key={thIdx} className={styles.tableTh}>
                {renderInlineFormatting(th, onNavigate)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className={styles.tableRow}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className={styles.tableTd}>
                  <TableCellContent text={cell} onNavigate={onNavigate} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Handles HTML <br> or <br/> tags inside table cells
 */
function TableCellContent({ text, onNavigate }) {
  if (!text) return null

  // Split on <br> or <br/> or <br />
  const lines = text.split(/<br\s*\/?>/gi)

  return (
    <div>
      {lines.map((l, idx) => {
        const trimmed = l.trim()
        if (!trimmed) return null

        // Check if line starts with a bullet symbol like • or -
        const isBullet = /^[-*•]\s*/.test(trimmed)
        const cleanText = trimmed.replace(/^[-*•]\s*/, '')

        if (isBullet) {
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 6,
                margin: '3px 0',
                fontSize: '0.78rem',
              }}
            >
              <span style={{ color: '#FF8533', fontSize: '0.8rem', lineHeight: 1 }}>•</span>
              <div>{renderInlineFormatting(cleanText, onNavigate)}</div>
            </div>
          )
        }

        return (
          <div key={idx} style={{ margin: '2px 0' }}>
            {renderInlineFormatting(trimmed, onNavigate)}
          </div>
        )
      })}
    </div>
  )
}

function renderInlineFormatting(str, onNavigate) {
  if (!str) return null

  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g
  const parts = str.split(tokenRegex)

  return parts.map((part, idx) => {
    if (!part) return null

    // Markdown link: [Label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const label = linkMatch[1]
      let url = linkMatch[2]

      // Normalize localhost
      url = url.replace(/^https?:\/\/(localhost:\d+|omprakashbehera\.me)/, '')

      const isInternal = url.startsWith('/') || url.startsWith('#')

      if (isInternal) {
        return (
          <Link
            key={idx}
            href={url}
            onClick={() => onNavigate && onNavigate(url)}
            className={styles.internalLink}
          >
            {label}
          </Link>
        )
      }

      return (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
        >
          <span>{label}</span>
          <ExternalLink size={11} />
        </a>
      )
    }

    // Bold text
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={idx} style={{ color: '#FFFFFF', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      )
    }

    // Inline code
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={idx} className={styles.inlineCode}>
          {part.slice(1, -1)}
        </code>
      )
    }

    return part
  })
}

function CodeBlock({ code, language }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.codeBlockContainer}>
      <div className={styles.codeBlockHeader}>
        <span>{language || 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            color: copied ? '#22C55E' : '#A8A29E',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: '0.6875rem',
          }}
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className={styles.codeBlockPre}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
