// One-off generator: exports every Problem row from prisma/dev.db into the
// static data module src/data/problems.ts (the DB-less deployment source).
// Re-run with: npx tsx scripts/export-problems.ts
// Afterwards run `npm run merge:leetcode` to re-apply the NeetCode catalog.
import { createClient } from '@libsql/client'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderModule } from './lib/serialize-problems'

const DB_URL = 'file:prisma/dev.db'
const OUT = resolve('src/data/problems.ts')

async function main() {
  const db = createClient({ url: DB_URL })
  const { rows } = await db.execute('SELECT * FROM Problem ORDER BY id')

  writeFileSync(OUT, renderModule(rows as Record<string, unknown>[]), 'utf8')
  console.log(`Wrote ${rows.length} problems to ${OUT}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
