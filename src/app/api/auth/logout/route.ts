import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'

export async function POST() {
  ;(await cookies()).delete('cheatHubSession')
  return NextResponse.json({ ok: true }, { status: 200 })
}
