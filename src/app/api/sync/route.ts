import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifySession } from '@/lib/auth'
import { normalize } from '@/lib/userData'

export const runtime = 'nodejs'

async function getAuthedUsername(): Promise<string | null> {
  const token = (await cookies()).get('cheatHubSession')?.value
  return verifySession(token)
}

export async function GET() {
  try {
    const username = await getAuthedUsername()
    if (!username) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await db.user.findUnique({ where: { username } })
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    return NextResponse.json(JSON.parse(user.data), { status: 200 })
  } catch (error) {
    console.error('Error reading sync data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const username = await getAuthedUsername()
    if (!username) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const existing = await db.user.findUnique({ where: { username } })
    if (!existing) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    const normalized = normalize(body)
    await db.user.update({
      where: { username },
      data: { data: JSON.stringify(normalized) },
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Error writing sync data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
