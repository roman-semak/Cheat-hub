// Generates real JSON test cases for every problem in src/data/problems.ts and
// writes them to the committed sidecar src/data/testcases.generated.json
// (keyed by slug). scripts/merge-leetcode-catalog.ts then folds the sidecar into
// problems.ts, so this is the source of truth for `testCases`.
//
//   npm run gen:testcases                 # full run, resumes from the sidecar
//   npm run gen:testcases -- --report     # print the coverage / failure summary
//   npm run gen:testcases -- --only=two-sum,add-two-numbers
//   npm run gen:testcases -- --limit=25 --force
//
// Inputs come from LeetCode (leetcode-query). Expected outputs are produced by
// running the doocs/leetcode reference solution through the same vm executor the
// app uses (src/lib/runner.ts).
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import LeetCode from 'leetcode-query'
import { transform } from 'sucrase'
import { problems } from '../src/data/problems'
import { executeInVm } from '../src/lib/runner'
import {
  parseExampleTestcases,
  buildAdapter,
  SANDBOX_PRELUDE,
  type CompactSignature,
} from '../src/lib/leetcode-shapes'

interface MetaData {
  name: string
  params?: { name: string; type: string }[]
  return: { type: string }
  classname?: string
}

const SIDECAR = resolve('src/data/testcases.generated.json')
const RATE_LIMIT_MS = 350
const RAW = 'https://raw.githubusercontent.com/doocs/leetcode/main/solution'
const API = 'https://api.github.com/repos/doocs/leetcode/contents/solution'

interface Case {
  input: string
  expected: string
}
interface SidecarEntry {
  cases?: Case[]
  /** LeetCode signature — the app runner needs it to feed ListNode/void problems. */
  meta?: CompactSignature
  status: 'ok' | 'no-solution' | 'no-metadata' | 'design' | 'parse-failed' | 'exec-failed'
  note?: string
  generatedAt: string
}
type Sidecar = Record<string, SidecarEntry>

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

function bucket(n: number): string {
  const lo = Math.floor(n / 100) * 100
  const pad = (x: number) => String(x).padStart(4, '0')
  return `${pad(lo)}-${pad(lo + 99)}`
}

const bucketListings = new Map<string, Promise<string[]>>()
async function listBucket(b: string): Promise<string[]> {
  if (!bucketListings.has(b)) {
    bucketListings.set(
      b,
      fetch(`${API}/${b}`, { headers: { 'User-Agent': 'gen-testcases' } })
        .then((r) => (r.ok ? r.json() : []))
        .then((d: unknown) =>
          Array.isArray(d) ? (d as { name: string }[]).map((x) => x.name) : [],
        )
        .catch(() => []),
    )
  }
  return bucketListings.get(b)!
}

/** Fetch the doocs reference solution (TS preferred, JS fallback). */
async function fetchReferenceSolution(
  frontendId: number,
  title: string,
): Promise<string | null> {
  const b = bucket(frontendId)
  const id4 = String(frontendId).padStart(4, '0')
  const candidates = [`${id4}.${title}`]

  const listed = await listBucket(b)
  const match = listed.find((name) => name.startsWith(`${id4}.`))
  if (match && !candidates.includes(match)) candidates.push(match)

  for (const folder of candidates) {
    for (const file of ['Solution.ts', 'Solution.js']) {
      const url = `${RAW}/${b}/${encodeURIComponent(folder)}/${file}`
      const res = await fetch(url)
      if (res.ok) return await res.text()
    }
  }
  return null
}

async function generateForProblem(
  lc: InstanceType<typeof LeetCode>,
  slug: string,
  title: string,
): Promise<SidecarEntry> {
  const now = new Date().toISOString()
  const q = (await lc.problem(slug)) as {
    metaData?: string
    exampleTestcases?: string
    questionFrontendId?: string
  }

  if (!q?.metaData) {
    return { status: 'no-metadata', generatedAt: now }
  }

  let meta: MetaData
  try {
    meta = JSON.parse(q.metaData) as MetaData
  } catch {
    return { status: 'no-metadata', generatedAt: now, note: 'metaData not JSON' }
  }

  if (meta.classname || !meta.params) {
    return { status: 'design', generatedAt: now, note: 'class-based / design problem' }
  }

  let inputs: string[]
  try {
    inputs = parseExampleTestcases(q.exampleTestcases ?? '', meta.params.length)
    if (inputs.length === 0) throw new Error('no example testcases')
  } catch (e) {
    return {
      status: 'parse-failed',
      generatedAt: now,
      note: e instanceof Error ? e.message : String(e),
    }
  }

  const frontendId = parseInt(q.questionFrontendId ?? '', 10)
  if (!frontendId) {
    return { status: 'no-solution', generatedAt: now, note: 'no frontendId' }
  }

  const referenceRaw = await fetchReferenceSolution(frontendId, title)
  if (!referenceRaw) {
    return { status: 'no-solution', generatedAt: now }
  }

  let reference: string
  try {
    reference = transform(referenceRaw, { transforms: ['typescript'] }).code
  } catch (e) {
    return {
      status: 'exec-failed',
      generatedAt: now,
      note: `reference transpile: ${e instanceof Error ? e.message.split('\n')[0] : String(e)}`,
    }
  }

  const signature: CompactSignature = {
    name: meta.name,
    paramTypes: meta.params!.map((p) => p.type),
    returnType: meta.return.type,
  }

  // Prelude is always injected (identity conversions for non-node shapes).
  const code = `${SANDBOX_PRELUDE}\n${reference}\n${buildAdapter(meta.name, signature)}`

  const cases: Case[] = []
  for (const input of inputs) {
    // executeInVm spreads its args array into the callee; `__run` wants the
    // whole positional-args array as a single parameter, so wrap it once.
    const { result, error } = executeInVm(
      code,
      '__run',
      JSON.stringify([JSON.parse(input)]),
    )
    if (error !== undefined || result === undefined) {
      return {
        status: 'exec-failed',
        generatedAt: now,
        note: error ?? 'no result from reference solution',
      }
    }
    cases.push({ input, expected: result })
  }

  return { status: 'ok', cases, meta: signature, generatedAt: now }
}

function printReport(sidecar: Sidecar) {
  const byStatus = new Map<string, string[]>()
  for (const p of problems) {
    const entry = sidecar[p.slug]
    const status = entry?.status ?? 'missing'
    if (!byStatus.has(status)) byStatus.set(status, [])
    byStatus.get(status)!.push(p.slug)
  }
  console.log(`\nCoverage over ${problems.length} problems:\n`)
  for (const [status, slugs] of [...byStatus.entries()].sort()) {
    console.log(`  ${status.padEnd(14)} ${slugs.length}`)
  }
  console.log('')
  for (const [status, slugs] of byStatus.entries()) {
    if (status === 'ok') continue
    console.log(`--- ${status} (${slugs.length}) ---`)
    for (const slug of slugs.slice(0, 60)) {
      console.log(`  ${slug}${sidecar[slug]?.note ? ` — ${sidecar[slug]!.note}` : ''}`)
    }
    if (slugs.length > 60) console.log(`  … +${slugs.length - 60} more`)
  }
}

async function main() {
  const sidecar = loadSidecar()

  if (REPORT) {
    printReport(sidecar)
    return
  }

  const lc = new LeetCode()
  let processed = 0
  let ok = 0

  const targets = problems.filter((p) => {
    if (ONLY) return ONLY.has(p.slug)
    if (FORCE) return true
    return sidecar[p.slug]?.status !== 'ok'
  })

  console.log(
    `Generating test cases for ${Math.min(targets.length, LIMIT)} problems ` +
      `(${problems.length} total, ${Object.values(sidecar).filter((e) => e.status === 'ok').length} already ok)\n`,
  )

  for (const problem of targets) {
    if (processed >= LIMIT) break
    processed++
    process.stdout.write(`[${processed}] ${problem.slug} … `)
    try {
      await sleep(RATE_LIMIT_MS)
      const entry = await generateForProblem(lc, problem.slug, problem.title)
      sidecar[problem.slug] = entry
      if (entry.status === 'ok') {
        ok++
        console.log(`✓ ${entry.cases!.length} cases`)
      } else {
        console.log(`· ${entry.status}${entry.note ? ` (${entry.note})` : ''}`)
      }
    } catch (e) {
      console.log(`✗ ${e instanceof Error ? e.message : String(e)}`)
      sidecar[problem.slug] = {
        status: 'exec-failed',
        generatedAt: new Date().toISOString(),
        note: e instanceof Error ? e.message : String(e),
      }
    }
    if (processed % 20 === 0) saveSidecar(sidecar)
  }

  saveSidecar(sidecar)
  console.log(`\nDone. ${ok}/${processed} newly generated. Sidecar: ${SIDECAR}`)
  console.log(`Run "npm run gen:testcases -- --report" for the full breakdown.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
