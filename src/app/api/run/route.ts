import { NextRequest, NextResponse } from 'next/server'
import { runCode } from '@/lib/runner'

export const runtime = 'nodejs'
export const maxDuration = 30

interface RunRequest {
  code: string
  language: 'javascript' | 'typescript'
  testCases: Array<{ input: string; expected: string }>
  signature?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RunRequest = await request.json()

    const { code, language, testCases, signature } = body

    if (!code || !language || !testCases) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const results = await runCode(code, language, testCases, signature)

    return NextResponse.json({ results }, { status: 200 })
  } catch (error) {
    console.error('Error running code:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    )
  }
}
