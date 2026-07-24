import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { Redis } from '@upstash/redis'

export const runtime = 'nodejs'

// Single shared bucket — this is a personal, single-user platform.
const STATE_KEY = 'cheathub:state'

function getConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? ''
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? ''
  const secret = process.env.SYNC_SECRET ?? ''
  return { url, token, secret }
}

// Constant-time-ish comparison to avoid leaking the secret via timing.
function secretMatches(provided: string, expected: string): boolean {
  if (!expected) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

// Returns a configured client, or null when sync is not set up.
function getRedis() {
  const { url, token, secret } = getConfig()
  if (!url || !token || !secret) return null
  return new Redis({ url, token })
}

function authorized(request: NextRequest): boolean {
  const { secret } = getConfig()
  const provided = request.headers.get('x-sync-secret') ?? ''
  return secretMatches(provided, secret)
}

export async function GET(request: NextRequest) {
  const redis = getRedis()
  if (!redis) {
    return NextResponse.json({ enabled: false }, { status: 501 })
  }
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await redis.get(STATE_KEY)
    return NextResponse.json(data ?? {}, { status: 200 })
  } catch (error) {
    console.error('Error reading state:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const redis = getRedis()
  if (!redis) {
    return NextResponse.json({ enabled: false }, { status: 501 })
  }
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }
    await redis.set(STATE_KEY, body)
    return NextResponse.json(body, { status: 200 })
  } catch (error) {
    console.error('Error writing state:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
