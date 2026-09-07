// Rewrites every `solution` in src/data/approaches.json as plain JavaScript
// (see scripts/lib/ts-to-js.ts). The popup ships JS only, so this is both the
// one-off migration for TypeScript already committed and a repeatable gate.
//
//   npm run normalize:solutions              # rewrite the sidecar in place
//   npm run normalize:solutions -- --check   # report only, non-zero exit if stale
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { toJavaScript } from './lib/ts-to-js'

const SIDECAR = resolve('src/data/approaches.json')

interface Entry {
  hint?: string
  complexity?: string
  solution?: string
  solutionSource?: 'doocs' | 'authored'
}

const CHECK = process.argv.slice(2).includes('--check')

if (!existsSync(SIDECAR)) {
  console.log('No approaches.json — nothing to normalize.')
  process.exit(0)
}

const sidecar = JSON.parse(readFileSync(SIDECAR, 'utf8')) as Record<string, Entry>

const converted: string[] = []
const failed: string[] = []

for (const [slug, entry] of Object.entries(sidecar)) {
  if (!entry.solution?.trim()) continue
  try {
    const js = toJavaScript(entry.solution)
    if (js !== entry.solution) {
      converted.push(slug)
      if (!CHECK) entry.solution = js
    }
  } catch (e) {
    failed.push(slug)
    console.log(`FAIL  ${slug} — ${e instanceof Error ? e.message.split('\n')[0] : e}`)
  }
}

if (CHECK) {
  console.log(
    `${converted.length} solution(s) still contain TypeScript, ${failed.length} failed to convert.`,
  )
  if (converted.length) {
    console.log('  ' + converted.slice(0, 40).join(', ') + (converted.length > 40 ? ' …' : ''))
  }
  if (converted.length || failed.length) process.exit(1)
  console.log('All sidecar solutions are plain JavaScript.')
} else {
  // Same on-disk shape as saveSidecar() in scripts/generate-solutions.ts.
  const sorted = Object.fromEntries(
    Object.entries(sidecar).sort(([a], [b]) => a.localeCompare(b)),
  )
  writeFileSync(SIDECAR, JSON.stringify(sorted, null, 2) + '\n', 'utf8')
  console.log(`Normalized ${converted.length} solution(s) to JavaScript -> ${SIDECAR}`)
  if (failed.length) {
    console.log(`Failed: ${failed.join(', ')}`)
    process.exit(1)
  }
  console.log('Next: npm run merge:leetcode && npm run verify:approaches')
}
