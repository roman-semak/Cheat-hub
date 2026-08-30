// Pulls a reference `solution` (the code shown in the "Solution" popup) from
// doocs/leetcode for every problem in src/data/problems.ts that has neither an
// existing `solution` nor one already in the approaches sidecar.
//
//   npm run gen:solutions                    # full run, resumes from the sidecar
//   npm run gen:solutions -- --report        # print coverage, do not fetch
//   npm run gen:solutions -- --only=two-sum,palindrome-number
//   npm run gen:solutions -- --limit=25 --force
//
// The original TypeScript is stored verbatim; it is transpiled once here only to
// confirm it parses. Prose hints + complexity are authored separately (by hand)
// into the same sidecar — this script never touches `hint` / `complexity`.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { transform } from 'sucrase'
import LeetCode from 'leetcode-query'
import { problems } from '../src/data/problems'
import { fetchReferenceSolution } from './lib/doocs'

/** Seeded problems predate the LeetCode import and kept short slugs. */
const SLUG_ALIASES: Record<string, string> = {
  'longest-substring-without-repeating':
    'longest-substring-without-repeating-characters',
}

const SIDECAR = resolve('src/data/approaches.json')
const RATE_LIMIT_MS = 300

interface Entry {
  hint?: string
  complexity?: string
  solution?: string
  solutionSource?: 'doocs' | 'authored'
}
type Sidecar = Record<string, Entry>

const args = process.argv.slice(2)
const flag = (name: string) => args.find((a) => a.startsWith(`--${name}`))
const REPORT = args.includes('--report')
const FORCE = args.includes('--force')
const LIMIT = flag('limit') ? parseInt(flag('limit')!.split('=')[1], 10) : Infinity
const ONLY = flag('only')
  ? new Set(flag('only')!.split('=')[1].split(',').map((s) => s.trim()))
  : null

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function loadSidecar(): Sidecar {
  if (!existsSync(SIDECAR)) return {}
  return JSON.parse(readFileSync(SIDECAR, 'utf8')) as Sidecar
}

function saveSidecar(data: Sidecar) {
  const sorted = Object.fromEntries(
    Object.entries(data).sort(([a], [b]) => a.localeCompare(b)),
  )
  writeFileSync(SIDECAR, JSON.stringify(sorted, null, 2) + '\n', 'utf8')
}

/** A problem needs no fetch when it already has code from any source. */
function hasSolution(slug: string, sidecar: Sidecar): boolean {
  const p = problems.find((x) => x.slug === slug)
  if (p?.solution && p.solution.trim()) return true
  const e = sidecar[slug]
  return Boolean(e?.solution && e.solution.trim())
}

function printReport(sidecar: Sidecar) {
  let withCode = 0
  let withHint = 0
  let full = 0
  const noCode: string[] = []
  const noHint: string[] = []
  for (const p of problems) {
    const code = hasSolution(p.slug, sidecar)
    const hint =
      Boolean(p.approach && p.approach.trim()) ||
      Boolean(sidecar[p.slug]?.hint && sidecar[p.slug]!.hint!.trim())
    if (code) withCode++
    else noCode.push(p.slug)
    if (hint) withHint++
    else noHint.push(p.slug)
    if (code && hint) full++
  }
  console.log(`\nCoverage over ${problems.length} problems:`)
  console.log(`  with solution code : ${withCode}`)
  console.log(`  with hint/approach : ${withHint}`)
  console.log(`  full popup (both)  : ${full}`)
  console.log(`\n--- no solution code (${noCode.length}) ---`)
  console.log('  ' + noCode.slice(0, 60).join(', ') + (noCode.length > 60 ? ` … +${noCode.length - 60}` : ''))
  console.log(`\n--- no hint/approach (${noHint.length}) ---`)
  console.log('  ' + noHint.slice(0, 60).join(', ') + (noHint.length > 60 ? ` … +${noHint.length - 60}` : ''))
}

async function main() {
  const sidecar = loadSidecar()

  if (REPORT) {
    printReport(sidecar)
    return
  }

  const lc = new LeetCode()

  const targets = problems.filter((p) => {
    if (ONLY) return ONLY.has(p.slug)
    if (!FORCE && hasSolution(p.slug, sidecar)) return false
    return true
  })

  console.log(
    `Fetching reference solutions for ${Math.min(targets.length, LIMIT)} problems ` +
      `(${problems.length} total)\n`,
  )

  let processed = 0
  let ok = 0
  for (const problem of targets) {
    if (processed >= LIMIT) break
    processed++
    process.stdout.write(`[${processed}] ${problem.slug} … `)

    let frontendId = parseInt(problem.frontendId ?? '', 10)
    let title = problem.title
    if (!frontendId) {
      try {
        await sleep(RATE_LIMIT_MS)
        const q = (await lc.problem(SLUG_ALIASES[problem.slug] ?? problem.slug)) as {
          questionFrontendId?: string
          title?: string
        }
        frontendId = parseInt(q?.questionFrontendId ?? '', 10)
        if (q?.title) title = q.title
      } catch {
        /* fall through to the no-id branch */
      }
    }
    if (!frontendId) {
      console.log('· no frontendId')
      continue
    }

    try {
      await sleep(RATE_LIMIT_MS)
      const raw = await fetchReferenceSolution(frontendId, title)
      if (!raw) {
        console.log('· not found on doocs')
        continue
      }
      try {
        transform(raw, { transforms: ['typescript'] })
      } catch (e) {
        console.log(`· parse failed (${e instanceof Error ? e.message.split('\n')[0] : e})`)
        continue
      }
      const entry: Entry = sidecar[problem.slug] ?? {}
      entry.solution = raw.trim()
      entry.solutionSource = 'doocs'
      sidecar[problem.slug] = entry
      ok++
      console.log('✓')
    } catch (e) {
      console.log(`✗ ${e instanceof Error ? e.message : String(e)}`)
    }
    if (processed % 20 === 0) saveSidecar(sidecar)
  }

  saveSidecar(sidecar)
  console.log(`\nDone. ${ok}/${processed} fetched. Sidecar: ${SIDECAR}`)
  console.log(`Next: npm run merge:leetcode && npm run verify:approaches`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
