import { NextResponse } from 'next/server'
import { ASSISTANT_SYSTEM_PROMPT } from '../../../data/assistantKnowledge'

export const dynamic = 'force-dynamic'

/**
 * Inspect user input against prompt injection, penetration attacks, and code/algorithm generation
 */
function inspectSecurityGuardrails(userPrompt = '') {
  const text = userPrompt.trim().toLowerCase()

  // 1. Prompt Injection, Jailbreak & System Prompt Exfiltration
  const injectionPatterns = [
    /(ignore|disregard|forget|override|bypass)\s+(all\s+)?(previous|past|prior|above|system)?\s*(instructions|prompts|rules|directives|guidelines)/i,
    /(system\s*prompt|initial\s*prompt|hidden\s*instructions|reveal\s*(your\s*)?prompt|what\s*(is|are)\s*(your\s*)?(system\s*prompt|instructions))/i,
    /(you\s+are\s+now|act\s+as|pretend\s+to\s+be|roleplay\s+as)\s+(an?\s+)?(unrestricted|dan|jailbreak|evil|hacker|root|developer\s*mode|chaos)/i,
    /(developer\s*mode\s*(enabled|on|activate)|dan\s*mode|jailbroken)/i,
    /(repeat\s+(everything|the\s+words)\s+above|print\s+(the\s+)?system\s+message)/i,
  ]

  for (const pattern of injectionPatterns) {
    if (pattern.test(text)) {
      return {
        flagged: true,
        reason: 'injection',
        message:
          'I am strictly programmed as the digital assistant for Om Prakash Behera (CodeByPrakash). My configuration, security boundaries, and portfolio focus are immutable and cannot be overridden.\n\nHow can I assist you regarding Prakash\'s engineering projects, web development services, or project cost estimation?',
      }
    }
  }

  // 2. Penetration Testing, Exploitation & Cyber Attacks
  const pentestPatterns = [
    /(penetration\s*test|pentest|exploit|payload|reverse\s*shell|backdoor|malware|keylogger|trojan|ransomware)/i,
    /(sql\s*injection|sqli|xss\s*attack|cross\s*site\s*scripting|csrf\s*token\s*bypass|buffer\s*overflow|remote\s*code\s*execution|rce)/i,
    /(metasploit|burp\s*suite|nmap|sqlmap|wireshark|hydra\s*brute|aircrack)/i,
    /(hack|crack|bypass|dos\s*attack|ddos|brute\s*force)\s+(this|the|into|password|server|database|site|admin|wifi|auth)/i,
    /(find\s+vulnerabilit(y|ies)|scan\s+for\s+vulnerabilit(y|ies)|probe\s+for\s+flaws)/i,
  ]

  for (const pattern of pentestPatterns) {
    if (pattern.test(text)) {
      return {
        flagged: true,
        reason: 'penetration',
        message:
          'Security protocols are strictly enforced. I do not provide penetration testing instructions, vulnerability scanning assistance, exploit payloads, or security bypass mechanisms against any system or infrastructure.\n\nIf you have questions about Om Prakash Behera\'s engineering projects, secure web architecture, or client services, I would be glad to help!',
      }
    }
  }

  // 3. Code Generation, Algorithm & Pseudocode Requests
  const isAskingToProduceCode =
    /(write|generate|give\s*me|create|provide|show\s*me|print|output|produce)\s+(a\s+|the\s+|some\s+)?(code|script|program|implementation|function|algorithm|pseudocode|pscedo\s*code|pseudo-code)/i.test(text) ||
    /(write|generate|give\s*me|create|provide)\s+(a\s+|the\s+)?(python|javascript|typescript|c\+\+|java|c#|rust|golang|bash|shell|powershell|sql|php)\s+(script|code|function|program|solution|algorithm)/i.test(text) ||
    /(algorithm\s+(for|to)|pseudocode\s+(for|to)|code\s+for|code\s+to|write\s+code\s+to|how\s+to\s+code\s+a)\s+/i.test(text) ||
    /(solve\s+this\s+(leetcode|hackerrank|coding\s+question|coding\s+problem)|write\s+a\s+solution\s+in)/i.test(text) ||
    /(binary\s+search|bubble\s+sort|quick\s*sort|merge\s*sort|dijkstra|fibonacci\s+in|reverse\s+linked\s+list)\s*(code|algorithm|implementation|in\s+python|in\s+c\+\+|in\s+java|in\s+js)?/i.test(text)

  if (isAskingToProduceCode) {
    return {
      flagged: true,
      reason: 'code_generation',
      message:
        'I am programmed specifically as Om Prakash Behera\'s portfolio guide and am restricted from generating programming code, algorithms, pseudocode, or competitive programming solutions.\n\nHowever, I can explain the high-level architecture, tech stack, and engineering methodologies Om Prakash uses across his 30+ projects—or help you scope a custom software build.\n\n- Explore Prakash\'s work: [All Projects](/projects)\n- View development services: [Services & Pricing](/services)\n- Calculate an instant estimate: [Project Cost Estimator](/services#estimator)\n- Direct WhatsApp: [Connect with Prakash](https://wa.me/917205252871)',
    }
  }

  return { flagged: false }
}

/**
 * Creates an SSE stream matching the expected model stream structure
 */
function createRefusalStream(content) {
  const encoder = new TextEncoder()
  const words = content.split(' ')

  const stream = new ReadableStream({
    async start(controller) {
      const chunkSize = 4
      for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize).join(' ') + (i + chunkSize < words.length ? ' ' : '')
        const dataPayload = {
          model: 'gpt-oss:120b',
          created_at: new Date().toISOString(),
          message: {
            role: 'assistant',
            content: chunk,
          },
          done: false,
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(dataPayload)}\n\n`))
      }

      const donePayload = {
        model: 'gpt-oss:120b',
        created_at: new Date().toISOString(),
        done: true,
      }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(donePayload)}\n\n`))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { messages = [] } = body

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 })
    }

    // 1. Sanitize incoming messages: discard any client-injected 'system' role
    const cleanHistory = messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) => ({ role: m.role, content: m.content.trim() }))

    if (cleanHistory.length === 0) {
      return NextResponse.json({ error: 'Valid user message is required.' }, { status: 400 })
    }

    // 2. Identify the last user message for perimeter security inspection
    const lastUserMsg = cleanHistory.filter((m) => m.role === 'user').pop()
    if (lastUserMsg) {
      const guardrailResult = inspectSecurityGuardrails(lastUserMsg.content)
      if (guardrailResult.flagged) {
        return createRefusalStream(guardrailResult.message)
      }
    }

    // 3. Anchor immutable system prompt at messages[0]
    const finalMessages = [
      { role: 'system', content: ASSISTANT_SYSTEM_PROMPT },
      ...cleanHistory,
    ]

    // 4. Target upstream endpoint
    const upstreamUrl = 'https://prixubot.vercel.app/api/chat'

    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: finalMessages,
        stream: true,
      }),
    })

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      const errorText = await upstreamResponse.text().catch(() => 'Unknown upstream error')
      console.error('PrixuBot Upstream Error:', upstreamResponse.status, errorText)
      return NextResponse.json(
        { error: `Assistant service temporarily unavailable (${upstreamResponse.status}).` },
        { status: 502 }
      )
    }

    // Pipe the SSE stream directly to the client
    return new Response(upstreamResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Error in /api/chat:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while communicating with the AI assistant.' },
      { status: 500 }
    )
  }
}
