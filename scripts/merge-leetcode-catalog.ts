// Enriches src/data/problems.ts with the NeetCode-250 catalog
// (src/lib/cheatsheet/leetcode.ts):
//   - matched problems  -> get an `approach` write-up (+ `solution` if missing)
//   - unmatched tasks   -> appended as stub problems (no real test cases)
//
// Idempotent: keyed by slug, safe to re-run. Run after export-problems.ts.
//   npx tsx scripts/merge-leetcode-catalog.ts
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { problems } from '../src/data/problems'
import { leetcodeData } from '../src/lib/cheatsheet/leetcode'
import { renderModule } from './lib/serialize-problems'
import type { Section, TaskCard } from '../src/lib/cheatsheet/types'

const OUT = resolve('src/data/problems.ts')

const FIELDS = [
  'slug', 'title', 'frontendId', 'difficulty', 'acRate', 'description',
  'tags', 'companies', 'starterCode', 'testCases', 'solution', 'editorial',
  'approach',
] as const

type Row = Record<string, unknown>

function toRow(p: Record<string, unknown>): Row {
  const r: Row = {}
  for (const f of FIELDS) if (p[f] != null && p[f] !== '') r[f] = p[f]
  return r
}

function buildApproach(task: TaskCard): string {
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

writeFileSync(OUT, renderModule(rows), 'utf8')
console.log(
  `Merged catalog: ${matched} matched, ${stubs} stubs, ${rows.length} problems total -> ${OUT}`,
)
