// Stamps src/lib/cheatsheet/contentManifest.generated.json with the first-seen
// date of every trackable content unit (prose section, leetcode section/task,
// practice task, lifehack, quickref block). The app reads this manifest to show
// the red "new content" dot next to units added since `newSince`.
//
//   npm run stamp:new              -> add any brand-new key with today's date
//   npm run stamp:new -- --baseline -> (re)seed the whole file: keys that already
//                                      existed at BASELINE_REF get a sentinel-old
//                                      date, everything newer gets today
//   npm run stamp:new -- --check    -> exit 1 if the manifest is missing any
//                                      current key (for CI)
//
// Run via tsx (see package.json) so it can import the .ts content modules.

import { execSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { quickRefBlockKeys } from '../src/lib/cheatsheet/quickrefKeys.ts'

const REPO_ROOT = resolve(import.meta.dirname, '..')
const CHEATSHEET_DIR = join(REPO_ROOT, 'src/lib/cheatsheet')
const MANIFEST_PATH = join(CHEATSHEET_DIR, 'contentManifest.generated.json')

// Parent of 74ad926 — the commit before the release batch we want marked "new".
const BASELINE_REF = '233081c'
// Any manifest date >= this shows the dot; anything older is treated as seen.
const NEW_SINCE = '2026-08-18'
const OLD_DATE = '2020-01-01'
const TODAY = new Date().toISOString().slice(0, 10)

// Prose TopicContent exports rendered by ProseTopicView, with the namespace
// used in both the manifest key and the userStore `seenNew` key. Cheat/links
// variants get a suffix because they share a `slug` with the prose version.
const PROSE_MODULES = [
  { file: 'react.ts', export: 'reactContent', ns: 'react' },
  { file: 'react-native.ts', export: 'reactNativeContent', ns: 'react-native' },
  { file: 'algorithms.ts', export: 'algorithmsContent', ns: 'algorithms' },
  { file: 'ide.ts', export: 'ideContent', ns: 'ide' },
  { file: 'angular.ts', export: 'angularContent', ns: 'angular' },
  { file: 'javascript.ts', export: 'javascriptContent', ns: 'javascript' },
  { file: 'javascript.ts', export: 'javascriptLinks', ns: 'javascript-links' },
  { file: 'fullstack.ts', export: 'fullstackContent', ns: 'fullstack' },
  { file: 'fullstack-cheat.ts', export: 'fullstackCheat', ns: 'fullstack-cheat' },
  { file: 'nextjs.ts', export: 'nextjsContent', ns: 'nextjs' },
  { file: 'nextjs.ts', export: 'nextjsCheat', ns: 'nextjs-cheat' },
  { file: 'git.ts', export: 'gitContent', ns: 'git' },
  { file: 'git.ts', export: 'gitCheat', ns: 'git-cheat' },
  { file: 'ai.ts', export: 'aiContent', ns: 'ai' },
  { file: 'ai.ts', export: 'aiCheat', ns: 'ai-cheat' },
  { file: 'architecture.ts', export: 'architectureContent', ns: 'architecture' },
  { file: 'architecture.ts', export: 'architectureCheat', ns: 'architecture-cheat' },
]

async function tryImport(dir, file) {
  const abs = join(dir, file)
  if (!existsSync(abs)) return null
  try {
    return await import(pathToFileURL(abs).href)
  } catch (err) {
    console.warn(`  skip ${file}: ${err.message}`)
    return null
  }
}

// Returns the full set of trackable keys for the content tree rooted at `dir`.
async function enumerateKeys(dir) {
  const keys = []
  const push = (k) => keys.push(k)

  // Prose sections
  const modCache = new Map()
  for (const { file, export: exp, ns } of PROSE_MODULES) {
    if (!modCache.has(file)) modCache.set(file, await tryImport(dir, file))
    const mod = modCache.get(file)
    const content = mod?.[exp]
    if (!content?.sections) continue
    for (const section of content.sections) {
      if (section?.id) push(`${ns}:${section.id}`)
    }
  }

  // LeetCode sections + tasks
  const leet = await tryImport(dir, 'leetcode.ts')
  for (const section of leet?.leetcodeData?.sections ?? []) {
    if (section?.id) push(`leetcode:${section.id}`)
    for (const task of section?.tasks ?? []) {
      if (task?.id) push(`leetcode-task:${task.id}`)
    }
  }

  // Practice tasks (re-export shim; flat file at older refs — both export `practiceTasks`)
  const practice = await tryImport(dir, 'practiceTasks.ts')
  for (const task of practice?.practiceTasks ?? []) {
    if (task?.id) push(`practice:${task.id}`)
  }

  // Lifehacks
  const life = await tryImport(dir, 'lifehacks.ts')
  for (const hack of life?.lifehacks ?? []) {
    if (hack?.id) push(`lifehack:${hack.id}`)
  }

  // QuickRef blocks (QUICKREF_BLOCKS only exists from the hub restructure onward)
  const qr = await tryImport(dir, 'quickref.ts')
  for (const [slug, blocks] of Object.entries(qr?.QUICKREF_BLOCKS ?? {})) {
    if (!Array.isArray(blocks)) continue
    quickRefBlockKeys(blocks).forEach((k) => push(`quickref:${slug}:${k}`))
  }

  // Assert uniqueness — a collision means two content units map to one key.
  const dupes = keys.filter((k, i) => keys.indexOf(k) !== i)
  if (dupes.length) {
    throw new Error(`Duplicate tracking keys: ${[...new Set(dupes)].join(', ')}`)
  }
  return keys.sort()
}

function readManifest() {
  if (!existsSync(MANIFEST_PATH)) return { newSince: NEW_SINCE, entries: {} }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
}

function writeManifest(entries) {
  const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)))
  const out = {
    $comment:
      'Generated by scripts/stamp-new-content.mjs. entries[key] = first-seen date. ' +
      'A key shows the red "new" dot when its date >= newSince and the user has not dismissed it.',
    newSince: NEW_SINCE,
    generatedAt: new Date().toISOString(),
    entries: sorted,
  }
  writeFileSync(MANIFEST_PATH, JSON.stringify(out, null, 2) + '\n')
}

async function baselineKeys() {
  const tmp = mkdtempSync(join(tmpdir(), 'cheat-base-'))
  execSync(`git archive ${BASELINE_REF} src/lib/cheatsheet | tar -x -C "${tmp}"`, {
    cwd: REPO_ROOT,
    stdio: ['ignore', 'ignore', 'inherit'],
  })
  return enumerateKeys(join(tmp, 'src/lib/cheatsheet'))
}

async function main() {
  const mode = process.argv.includes('--baseline')
    ? 'baseline'
    : process.argv.includes('--check')
      ? 'check'
      : 'update'

  console.log(`stamp-new-content: ${mode}`)
  const current = await enumerateKeys(CHEATSHEET_DIR)
  console.log(`  ${current.length} trackable keys in HEAD`)

  if (mode === 'check') {
    const { entries } = readManifest()
    const missing = current.filter((k) => !(k in entries))
    if (missing.length) {
      console.error(`  ${missing.length} key(s) missing from manifest — run: npm run stamp:new`)
      missing.slice(0, 20).forEach((k) => console.error(`    ${k}`))
      process.exit(1)
    }
    console.log('  manifest is up to date')
    return
  }

  let entries
  if (mode === 'baseline') {
    const old = new Set(await baselineKeys())
    console.log(`  ${old.size} keys existed at ${BASELINE_REF}`)
    entries = {}
    for (const k of current) entries[k] = old.has(k) ? OLD_DATE : TODAY
    const fresh = current.filter((k) => !old.has(k)).length
    console.log(`  ${fresh} key(s) stamped new (${TODAY})`)
  } else {
    entries = { ...readManifest().entries }
    let added = 0
    for (const k of current) {
      if (!(k in entries)) {
        entries[k] = TODAY
        added++
      }
    }
    const orphans = Object.keys(entries).filter((k) => !current.includes(k))
    if (orphans.length) console.warn(`  ${orphans.length} manifest key(s) no longer in content (kept)`)
    console.log(`  ${added} new key(s) stamped ${TODAY}`)
  }

  writeManifest(entries)
  console.log(`  wrote ${MANIFEST_PATH.replace(REPO_ROOT + '/', '')}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
