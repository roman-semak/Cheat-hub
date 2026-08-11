import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { hashPassword, verifyPassword, signSession } from '@/lib/auth'

export const runtime = 'nodejs'

// Logs in against an existing account, or transparently creates one if the
// username isn't taken yet — the client only exposes a single combined
// "log in" action, so first-time users don't need a separate register step.
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
      return NextResponse.json({ error: 'Missing username or password' }, { status: 400 })
    }
    const trimmedUsername = username.trim()

    const existing = await db.user.findUnique({ where: { username: trimmedUsername } })

    let user
    if (!existing) {
      user = await db.user.create({
        data: { username: trimmedUsername, passwordHash: hashPassword(password), data: '{}' },
      })
    } else {
      if (!verifyPassword(password, existing.passwordHash)) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
      }
      user = existing
    }

    const token = signSession(user.username)
    ;(await cookies()).set('cheatHubSession', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return NextResponse.json(
      { username: user.username, data: JSON.parse(user.data) },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error logging in:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
