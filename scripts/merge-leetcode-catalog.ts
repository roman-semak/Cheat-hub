// Enriches src/data/problems.ts with the NeetCode-250 catalog
// (src/lib/cheatsheet/leetcode.ts):
//   - matched problems  -> get an `approach` write-up (+ `solution` if missing)
//   - unmatched tasks   -> appended as stub problems (no real test cases)
//
// Idempotent: keyed by slug, safe to re-run. Run after export-problems.ts.
//   npx tsx scripts/merge-leetcode-catalog.ts
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { problems } from '../src/data/problems'
import { leetcodeData } from '../src/lib/cheatsheet/leetcode'
import { renderModule } from './lib/serialize-problems'
import type { Section, TaskCard } from '../src/lib/cheatsheet/types'

const OUT = resolve('src/data/problems.ts')
const TESTCASES = resolve('src/data/testcases.generated.json')
const APPROACHES = resolve('src/data/approaches.json')

const FIELDS = [
  'slug', 'title', 'frontendId', 'difficulty', 'acRate', 'description',
  'tags', 'companies', 'starterCode', 'testCases', 'solution', 'editorial',
  'approach', 'signature',
] as const

type Row = Record<string, unknown>

function toRow(p: Record<string, unknown>): Row {
  const r: Row = {}
  for (const f of FIELDS) if (p[f] != null && p[f] !== '') r[f] = p[f]
  return r
}

function buildApproach(task: { hint?: string; complexity?: string }): string {
  const parts: string[] = []
  if (task.hint) parts.push(task.hint.trim())
  if (task.complexity) parts.push(`**Складність:** ${task.complexity.trim()}`)
  return parts.join('\n\n')
}

const rows: Row[] = problems.map((p) => toRow(p as unknown as Record<string, unknown>))
const bySlug = new Map<string, Row>(rows.map((r) => [String(r.slug), r]))

let matched = 0
let stubs = 0

for (const section of leetcodeData.sections as Section[]) {
  for (const task of section.tasks) {
    const approach = buildApproach(task)
    const target =
      (task.practiceSlug && bySlug.get(task.practiceSlug)) || bySlug.get(task.id)

    if (target) {
      if (approach) target.approach = approach
      if (!target.solution && task.code) target.solution = task.code
      matched++
      continue
    }

    const stub: Row = {
      slug: task.id,
      title: task.title,
      difficulty: task.difficulty,
      description: task.description ?? '',
      tags: JSON.stringify([section.title]),
      companies: '[]',
      starterCode: '',
      testCases: '[{"input":"placeholder","expected":"placeholder"}]',
    }
    if (task.number > 0) stub.frontendId = String(task.number)
    if (task.code) stub.solution = task.code
    if (approach) stub.approach = approach

    rows.push(stub)
    bySlug.set(task.id, stub)
    stubs++
  }
}

// Fold in the hand/script-maintained approaches sidecar
// (src/data/approaches.json): fills `approach` (UA hint + complexity) and
// `solution` for problems the NeetCode catalog does not cover. The catalog is
// applied first, so it wins on conflicts.
let approaches = 0
if (existsSync(APPROACHES)) {
  const extra = JSON.parse(readFileSync(APPROACHES, 'utf8')) as Record<
    string,
    { hint?: string; complexity?: string; solution?: string }
  >
  for (const [slug, e] of Object.entries(extra)) {
    const row = bySlug.get(slug)
    if (!row) continue
    const approach = buildApproach(e)
    if (approach && !row.approach) {
      row.approach = approach
      approaches++
    }
    if (e.solution && !row.solution) row.solution = e.solution
  }
}

// Fold in generated test cases (src/data/testcases.generated.json is the source
// of truth for `testCases`, produced by scripts/generate-testcases.ts).
let withTests = 0
if (existsSync(TESTCASES)) {
  const sidecar = JSON.parse(readFileSync(TESTCASES, 'utf8')) as Record<
    string,
    {
      status: string
      cases?: { input: string; expected: string }[]
      meta?: { name: string; paramTypes: string[]; returnType: string }
    }
  >
  for (const [slug, entry] of Object.entries(sidecar)) {
    const row = bySlug.get(slug)
    if (!row) continue
    if (entry.status === 'ok' && entry.cases?.length) {
      row.testCases = JSON.stringify(entry.cases)
      if (entry.meta) row.signature = JSON.stringify(entry.meta)
      withTests++
    } else {
      // Status regressed (no-metadata / no-solution / exec-failed / …): drop any
      // test cases + signature folded in by an earlier run so the app falls back
      // to the "no tests yet" note instead of judging against stale data.
      row.testCases = '[]'
      delete row.signature
    }
  }
}

// Normalise the legacy placeholder stub to an empty array so the app can cleanly
// detect "no test cases yet" (see hasRealTestCases in src/lib/runner.ts).
for (const row of rows) {
  if (
    typeof row.testCases === 'string' &&
    row.testCases.includes('"placeholder"')
  ) {
    row.testCases = '[]'
  }
}

writeFileSync(OUT, renderModule(rows), 'utf8')
console.log(
  `Merged catalog: ${matched} matched, ${stubs} stubs, +${approaches} approaches, ${withTests} with generated test cases, ${rows.length} problems total -> ${OUT}`,
)
