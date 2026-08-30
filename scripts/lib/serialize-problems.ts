// Shared serializer for the static problem data module (src/data/problems.ts).
// Used by scripts/export-problems.ts (DB -> file) and
// scripts/merge-leetcode-catalog.ts (catalog upsert). Keeping one copy here
// means the file format stays identical no matter which generator wrote it.

export const HEADER = `// Static problem data. Replaces the database for the DB-less deployment.
// \`tags\`, \`companies\` and \`testCases\` are kept as JSON strings to match the
// shape the Prisma layer used to return, so consuming pages keep using
// \`JSON.parse(...)\` unchanged.
//
// AUTO-GENERATED from prisma/dev.db by scripts/export-problems.ts, then enriched
// by scripts/merge-leetcode-catalog.ts (adds \`approach\` + NeetCode-catalog
// stubs). Do not edit by hand; re-run the generators instead.

export interface StaticProblem {
  id: number
  slug: string
  title: string
  frontendId?: string
  difficulty: string
  acRate?: number
  description: string
  tags: string
  companies: string
  starterCode: string
  testCases: string
  solution?: string
  editorial?: string
  approach?: string
}

`

export const FOOTER = `
export const problems: StaticProblem[] = rawProblems.map((p, i) => ({
  id: i + 1,
  ...p,
}))

export function getProblemBySlug(slug: string): StaticProblem | undefined {
  return problems.find((p) => p.slug === slug)
}
`

const str = (v: unknown) => JSON.stringify(v == null ? '' : String(v))
const has = (v: unknown) => v != null && String(v).trim() !== ''

/** Serialize one problem row (any object with the StaticProblem string fields). */
export function serialize(row: Record<string, unknown>): string {
  const lines: string[] = ['  {']
  lines.push(`    slug: ${str(row.slug)},`)
  lines.push(`    title: ${str(row.title)},`)
  if (has(row.frontendId)) lines.push(`    frontendId: ${str(row.frontendId)},`)
  lines.push(`    difficulty: ${str(row.difficulty)},`)
  if (row.acRate != null) lines.push(`    acRate: ${Number(row.acRate)},`)
  lines.push(`    description: ${str(row.description)},`)
  lines.push(`    tags: ${str(row.tags)},`)
  lines.push(`    companies: ${str(row.companies)},`)
  lines.push(`    starterCode: ${str(row.starterCode)},`)
  lines.push(`    testCases: ${str(row.testCases)},`)
  if (has(row.solution)) lines.push(`    solution: ${str(row.solution)},`)
  if (has(row.editorial)) lines.push(`    editorial: ${str(row.editorial)},`)
  if (has(row.approach)) lines.push(`    approach: ${str(row.approach)},`)
  lines.push('  },')
  return lines.join('\n')
}

/** Render the full module text from an ordered list of rows. */
export function renderModule(rows: Record<string, unknown>[]): string {
  const body =
    "const rawProblems: Omit<StaticProblem, 'id'>[] = [\n" +
    rows.map(serialize).join('\n') +
    '\n]\n'
  return HEADER + body + FOOTER
}
