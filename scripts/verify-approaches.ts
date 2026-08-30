// Quality gate for src/data/approaches.json: runs every sidecar `solution`
// through the same executor the app uses (src/lib/runner.ts) against the
// generated test cases, so a broken reference solution never reaches the popup.
//
//   npm run verify:approaches
//   npm run verify:approaches -- --only=two-sum,palindrome-number
//
// Exit code is non-zero when any checkable solution fails.
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { problems } from '../src/data/problems'
import { runCode } from '../src/lib/runner'
import type { CompactSignature } from '../src/lib/leetcode-shapes'

const SIDECAR = resolve('src/data/approaches.json')
const TESTCASES = resolve('src/data/testcases.generated.json')

interface Entry {
  solution?: string
  solutionSource?: string
}
interface TcEntry {
  status: string
  cases?: { input: string; expected: string }[]
  meta?: CompactSignature
}

const args = process.argv.slice(2)
const only = args.find((a) => a.startsWith('--only'))
const ONLY = only
  ? new Set(only.split('=')[1].split(',').map((s) => s.trim()))
  : null

async function main() {
  if (!existsSync(SIDECAR)) {
    console.log('No approaches.json — nothing to verify.')
    return
  }
  const sidecar = JSON.parse(readFileSync(SIDECAR, 'utf8')) as Record<string, Entry>
  const tc = existsSync(TESTCASES)
    ? (JSON.parse(readFileSync(TESTCASES, 'utf8')) as Record<string, TcEntry>)
    : {}

  let pass = 0
  let fail = 0
  let skip = 0
  const failures: string[] = []

  for (const [slug, entry] of Object.entries(sidecar)) {
    if (ONLY && !ONLY.has(slug)) continue
    if (!entry.solution?.trim()) continue

    const problem = problems.find((p) => p.slug === slug)
    const t = tc[slug]
    if (!problem || !t || t.status !== 'ok' || !t.cases?.length) {
      skip++
      console.log(`SKIP  ${slug} (no ok test cases)`)
      continue
    }

    const signature = t.meta ? JSON.stringify(t.meta) : problem.signature
    try {
      const results = await runCode(entry.solution, 'typescript', t.cases, signature)
      const failed = results.filter((r) => !r.passed)
      if (failed.length === 0) {
        pass++
        console.log(`PASS  ${slug} (${results.length})`)
      } else {
        fail++
        failures.push(slug)
        const f = failed[0]
        console.log(
          `FAIL  ${slug} — ${failed.length}/${results.length}; ` +
            `in=${f.input} exp=${f.expected} got=${f.actual ?? f.error}`,
        )
      }
    } catch (e) {
      fail++
      failures.push(slug)
      console.log(`FAIL  ${slug} — ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  console.log(`\n${pass} pass, ${fail} fail, ${skip} skipped (unverifiable)`)
  if (fail > 0) {
    console.log(`Failing: ${failures.join(', ')}`)
    process.exit(1)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
