import { NextResponse } from 'next/server'
import { ASSISTANT_SYSTEM_PROMPT } from '../../../data/assistantKnowledge'

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const body = await req.json()
    const { messages = [] } = body

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 })
    }

    // Ensure system prompt is present at the beginning
    const hasSystem = messages.some((m) => m.role === 'system')
    const finalMessages = hasSystem
      ? messages
      : [{ role: 'system', content: ASSISTANT_SYSTEM_PROMPT }, ...messages]

    // Target endpoint
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
