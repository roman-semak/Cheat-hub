// Dumps every topic and quickref board to .md-export/ using the SAME
// serializer the in-app "Завантажити MD" button calls, so eyeballing the files
// here is equivalent to clicking every button.
//
// Also prints a census of wrappers that fell through to the transparent
// fallback — that's how you find authoring markup toMarkdown has no rule for.
//
//   npm run export:md
//   npm run export:md -- --census    (census only, no files written)
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { reactContent } from '../src/lib/cheatsheet/react'
import { angularContent } from '../src/lib/cheatsheet/angular'
import { javascriptContent, javascriptLinks } from '../src/lib/cheatsheet/javascript'
import { nextjsContent } from '../src/lib/cheatsheet/nextjs'
import { reactNativeContent } from '../src/lib/cheatsheet/react-native'
import { fullstackContent } from '../src/lib/cheatsheet/fullstack'
import { architectureContent } from '../src/lib/cheatsheet/architecture'
import { gitContent } from '../src/lib/cheatsheet/git'
import { aiContent } from '../src/lib/cheatsheet/ai'
import { ideContent } from '../src/lib/cheatsheet/ide'
import { algorithmsContent } from '../src/lib/cheatsheet/algorithms'
import { QUICKREF_TOPICS, QUICKREF_BLOCKS } from '../src/lib/cheatsheet/quickref'
import { getTopic } from '../src/lib/cheatsheet/registry'
import { topicToMarkdown, quickRefToMarkdown } from '../src/lib/cheatsheet/toMarkdown'
import type { TopicContent } from '../src/lib/cheatsheet/types'

const OUT = resolve('.md-export')
const censusOnly = process.argv.includes('--census')

const TOPICS: { content: TopicContent; file: string; path: string }[] = [
  { content: reactContent, file: 'cheat-hub-react.md', path: '/react' },
  { content: angularContent, file: 'cheat-hub-angular.md', path: '/angular' },
  { content: javascriptContent, file: 'cheat-hub-javascript.md', path: '/javascript' },
  { content: javascriptLinks, file: 'cheat-hub-javascript-links.md', path: '/javascript/links' },
  { content: nextjsContent, file: 'cheat-hub-nextjs.md', path: '/nextjs' },
  { content: reactNativeContent, file: 'cheat-hub-react-native.md', path: '/react-native' },
  { content: fullstackContent, file: 'cheat-hub-fullstack.md', path: '/fullstack' },
  { content: architectureContent, file: 'cheat-hub-architecture.md', path: '/architecture' },
  { content: gitContent, file: 'cheat-hub-git.md', path: '/git' },
  { content: aiContent, file: 'cheat-hub-ai.md', path: '/ai' },
  { content: ideContent, file: 'cheat-hub-ide.md', path: '/ide' },
  { content: algorithmsContent, file: 'cheat-hub-algorithms.md', path: '/algorithms' },
]

const unknown = new Map<string, number>()
const onUnknown = (tag: string, className: string) => {
  const key = `${tag}.${className}`
  unknown.set(key, (unknown.get(key) ?? 0) + 1)
}

if (!censusOnly) {
  rmSync(OUT, { recursive: true, force: true })
  mkdirSync(OUT, { recursive: true })
}

let files = 0

for (const { content, file, path } of TOPICS) {
  const meta = getTopic(content.slug)
  if (!meta) throw new Error(`no topic meta for ${content.slug}`)
  const markdown = topicToMarkdown(content, meta, { path, onUnknown })
  if (!censusOnly) writeFileSync(resolve(OUT, file), markdown)
  files += 1
  console.log(`${file.padEnd(36)} ${content.sections.length} sections, ${markdown.length} chars`)
}

for (const slug of QUICKREF_TOPICS) {
  const blocks = QUICKREF_BLOCKS[slug]
  const meta = getTopic(slug)
  if (!blocks || !meta) continue
  const markdown = quickRefToMarkdown(blocks, meta, { path: `/quickref/${slug}`, onUnknown })
  const file = `quickref-${slug}.md`
  if (!censusOnly) writeFileSync(resolve(OUT, file), markdown)
  files += 1
  console.log(`${file.padEnd(36)} ${blocks.length} blocks, ${markdown.length} chars`)
}

console.log(`\n${files} files${censusOnly ? ' (census only)' : ` → ${OUT}`}`)

if (unknown.size) {
  console.log('\nUnhandled wrappers (tag.class × count):')
  for (const [key, count] of [...unknown.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(5)}  ${key}`)
  }
} else {
  console.log('\nNo unhandled wrappers.')
}
