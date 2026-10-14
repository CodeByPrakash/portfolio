/**
 * Markdown Response Filtering & Transformation System for Prakash AI Assistant
 * - Normalizes localhost and full domain URLs into internal Next.js routes
 * - Detects pseudo-card code blocks and transforms them into interactive Card tokens
 * - Cleans non-breaking hyphens, special unicode symbols, and formatting artifacts
 * - Ensures correct WhatsApp phone number and messaging links
 */

export function filterMarkdownResponse(rawContent = '') {
  if (!rawContent || typeof rawContent !== 'string') {
    return ''
  }

  let text = rawContent

  // 1. Replace localhost:3000 / localhost:3001 / localhost:3002 / omprakashbehera.me with root paths
  text = text.replace(/https?:\/\/(localhost:\d+|omprakashbehera\.me)(\/[^\s)]+)/g, '$2')

  // 2. Normalize WhatsApp number if wrong placeholder was used
  text = text.replace(/wa\.me\/(919938000000|\+919938000000)/g, 'wa.me/917205252871')

  // 3. Filter pseudo-card blocks wrapped in backticks (e.g. `\nInteractive Project Cost Estimator...\n`)
  // Estimator Action Card
  text = text.replace(
    /`\s*Interactive Project Cost Estimator[\s\S]*?\[Open Cost Estimator\]\([^)]+\)\s*`/gi,
    '\n[card:action:estimator]\n'
  )
  text = text.replace(
    /```[\s\S]*?Interactive Project Cost Estimator[\s\S]*?```/gi,
    '\n[card:action:estimator]\n'
  )

  // Direct Connect / Contact Action Card
  text = text.replace(
    /`\s*Direct Connect with Prakash[\s\S]*?\[Email\]\([^)]+\)\s*`/gi,
    '\n[card:action:contact]\n'
  )
  text = text.replace(
    /```[\s\S]*?Direct Connect with Prakash[\s\S]*?```/gi,
    '\n[card:action:contact]\n'
  )

  // 4. Normalize unicode non-breaking hyphens (U+2011) to standard hyphens
  text = text.replace(/\u2011/g, '-')

  // 5. Clean up duplicate card tokens if model accidentally outputs multiple
  text = text.replace(/(\[card:[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+\])(\s*\1)+/g, '$1')

  // 6. Security Defense: Strip any leaked programming code or algorithm blocks
  text = text.replace(
    /```(?:python|javascript|typescript|js|ts|jsx|tsx|bash|sh|c\+\+|cpp|c|java|sql|php|ruby|rust|go|html|css|json|pseudocode|algo|algorithm)?\s*[\r\n]+[\s\S]*?```/gi,
    '\n*[Code and algorithm generation is restricted. Explore Om Prakash\'s [Projects](/projects) or hire him for development via [Services & Pricing](/services).]*\n'
  )

  return text
}
