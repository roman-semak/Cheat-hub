// Markdown → TopicContent: the reverse of src/lib/cheatsheet/toMarkdown.ts.
//
// Takes a topic exported with `npm run export:md`, edited by hand, and rewrites
// the topic module from it. Section ids are NOT in the markdown, so they are
// carried over from the existing module by matching titles — a mismatch aborts
// rather than silently breaking anchors (`/react#<id>`) and the reader's
// ✓ / ● markers, which are keyed `${slug}:${sectionId}`.
//
//   npx tsx scripts/import-topic-markdown.ts <file.md> <slug> [--dry]
//
// Known lossy edges (the exporter flattened them, markdown can't carry them
// back): `.card` / `.grid2` layout, `tabs` blocks and `links` blocks all come
// back as ordinary prose.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import MarkdownIt from 'markdown-it'
import type { ContentBlock, FlashcardItem, TopicContent, TopicSection } from '../src/lib/cheatsheet/types'

const [, , fileArg, slugArg, ...rest] = process.argv
if (!fileArg || !slugArg) {
  console.error('usage: tsx scripts/import-topic-markdown.ts <file.md> <slug> [--dry]')
  process.exit(1)
}
const dry = rest.includes('--dry')

// `breaks: true`: the export writes each paragraph on one line, so a single
// newline inside one is a line the author broke deliberately — keep it.
const md = new MarkdownIt({ html: true, linkify: false, typographer: false, breaks: true })

const FENCE = /^\s*(`{3,}|~{3,})/
const QA_HEADING = '### 🎤 Питання на співбесіді'

// ---------------------------------------------------------------- helpers ---

// Splits on a heading level while ignoring anything inside a fenced block —
// code samples legitimately contain lines starting with #.
function splitOnHeading(lines: string[], marker: string) {
  const head: string[] = []
  const chunks: { title: string; body: string[] }[] = []
  let fence: string | null = null
  let current: { title: string; body: string[] } | null = null

  for (const line of lines) {
    const f = line.match(FENCE)
    if (f) {
      if (fence === null) fence = f[1]
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null
    }
    if (fence === null && line.startsWith(marker)) {
      current = { title: line.slice(marker.length).trim(), body: [] }
      chunks.push(current)
      continue
    }
    ;(current ? current.body : head).push(line)
  }
  return { head, chunks }
}

function stripSeparators(lines: string[]): string[] {
  return lines.filter((l) => l.trim() !== '---')
}

function trimBlank(lines: string[]): string[] {
  const out = [...lines]
  while (out.length && !out[0].trim()) out.shift()
  while (out.length && !out[out.length - 1].trim()) out.pop()
  return out
}

// Re-applies the .cheat-prose authoring classes that globals.css styles.
function dressHtml(html: string): string {
  let out = html

  out = out.replace(/<h3>/g, '<h3 class="topic">')
  out = out.replace(/<ul>/g, '<ul class="list">')
  out = out.replace(/<table>/g, '<div class="table-wrap"><table>')
  out = out.replace(/<\/table>/g, '</table></div>')

  // `**[KEY]**` → the badge span it came from. KEY and the warning badges have
  // their own classes; anything else is a version badge (`[React 19]`).
  const TAG_CLASS: Record<string, string> = { KEY: 'tag-key', PITFALL: 'tag-pit', LEGACY: 'tag-pit' }
  out = out.replace(/<strong>\[([^\]]+)\]<\/strong>/g, (_, name: string) => {
    const cls = TAG_CLASS[name] ?? 'tag-new'
    return `<span class="tag ${cls}">${name}</span>`
  })

  // Blockquotes carry an alert tone via their leading emoji.
  const TONES: [RegExp, string][] = [
    [/^\s*✅/, 'alert good'],
    [/^\s*⚠️?/, 'alert warn'],
    [/^\s*❌/, 'alert bad'],
  ]
  out = out.replace(/<blockquote>\s*([\s\S]*?)\s*<\/blockquote>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '')
    const tone = TONES.find(([re]) => re.test(text))?.[1] ?? 'alert'
    const icon = text.trim().match(/^(\p{Extended_Pictographic}️?)/u)?.[1]
    const body = icon ? inner.replace(icon, '') : inner
    return `<div class="${tone}">${icon ? `<span class="icon">${icon}</span>` : ''}${body.trim()}</div>`
  })

  return out.trim()
}

const CONTAINER_OPEN = /^(:{3,})\s*(\S.*)$/
const CONTAINER_CLOSE = /^(:{3,})\s*$/

// `:::: grid2` / `::: card red` — the card-grid containers the exporter emits
// (see toMarkdown.ts). Rendered as one HTML blob so a card keeps its <pre>
// inline, exactly as the markup was authored before the round trip.
function renderContainers(lines: string[]): string {
  const out: string[] = []
  let prose: string[] = []
  let fence: string | null = null
  let open: { marker: string; info: string; body: string[] } | null = null
  let depth = 0

  const flushProse = () => {
    const html = renderProse(prose)
    if (html) out.push(html)
    prose = []
  }

  for (const line of lines) {
    const f = line.match(FENCE)
    if (f) {
      if (fence === null) fence = f[1]
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null
    }

    if (fence === null && open) {
      if (CONTAINER_OPEN.test(line)) depth += 1
      else if (CONTAINER_CLOSE.test(line)) {
        if (depth === 0) {
          const cls = open.info.trim().replace(/\s+/g, ' ')
          out.push(`<div class="${cls}">${renderContainers(open.body)}</div>`)
          open = null
          continue
        }
        depth -= 1
      }
      open.body.push(line)
      continue
    }

    if (fence === null) {
      const m = line.match(CONTAINER_OPEN)
      if (m) {
        flushProse()
        open = { marker: m[1], info: m[2], body: [] }
        depth = 0
        continue
      }
      if (CONTAINER_CLOSE.test(line)) continue
    }

    prose.push(line)
  }

  flushProse()
  if (open) out.push(`<div class="${open.info.trim()}">${renderContainers(open.body)}</div>`)
  return out.join('')
}

function renderProse(lines: string[]): string {
  const text = trimBlank(stripSeparators(lines)).join('\n')
  if (!text.trim()) return ''
  return dressHtml(md.render(text))
}

function renderInline(text: string): string {
  return md.renderInline(text.trim())
}

// ------------------------------------------------------------------ blocks ---

// Prose between fenced blocks becomes one `paragraph`; each fence becomes its
// own `code` (or `mermaid`) block, mirroring how ContentBlocks renders them.
function toBlocks(lines: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = []
  let prose: string[] = []
  let fence: string | null = null
  let lang = ''
  let code: string[] = []
  // A container swallows everything until it closes — including fences, which
  // stay inline <pre> inside the card rather than becoming their own block.
  let container = 0

  const flushProse = () => {
    const html = prose.some((l) => CONTAINER_OPEN.test(l))
      ? renderContainers(prose)
      : renderProse(prose)
    if (html) blocks.push({ kind: 'paragraph', html })
    prose = []
  }

  for (const line of lines) {
    const f = line.match(FENCE)

    if (container > 0) {
      if (f) {
        if (fence === null) fence = f[1]
        else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null
      } else if (fence === null) {
        if (CONTAINER_OPEN.test(line)) container += 1
        else if (CONTAINER_CLOSE.test(line)) container -= 1
      }
      prose.push(line)
      if (container === 0) flushProse()
      continue
    }

    if (fence === null && !f && CONTAINER_OPEN.test(line)) {
      flushProse()
      container = 1
      prose.push(line)
      continue
    }

    if (fence === null && f) {
      flushProse()
      fence = f[1]
      lang = line.trim().slice(f[1].length).trim()
      code = []
      continue
    }
    if (fence !== null) {
      if (f && f[1][0] === fence[0] && f[1].length >= fence.length) {
        const body = code.join('\n').replace(/\s+$/, '')
        if (body) {
          blocks.push(
            lang === 'mermaid'
              ? { kind: 'mermaid', code: body }
              : { kind: 'code', language: lang || 'tsx', code: body },
          )
        }
        fence = null
        continue
      }
      code.push(line)
      continue
    }
    prose.push(line)
  }

  flushProse()
  return blocks
}

// `**N. Question**` followed by its answer paragraph(s).
function toQuestions(lines: string[]): FlashcardItem[] {
  const out: FlashcardItem[] = []
  let current: { q: string; a: string[] } | null = null

  for (const line of trimBlank(stripSeparators(lines))) {
    const m = line.match(/^\*\*\d+\.\s*([\s\S]*?)\*\*\s*$/)
    if (m) {
      if (current) out.push({ question: renderInline(current.q), answer: renderInline(current.a.join(' ').trim()) })
      current = { q: m[1], a: [] }
      continue
    }
    if (current && line.trim()) current.a.push(line.trim())
  }
  if (current) out.push({ question: renderInline(current.q), answer: renderInline(current.a.join(' ').trim()) })
  return out
}

// -------------------------------------------------------------------- main ---

const source = readFileSync(resolve(fileArg), 'utf8').split('\n')
const { head, chunks } = splitOnHeading(source, '## ')

// Preamble: the `# Title`, the blurb and the export footer are all regenerated
// on the next export, so only real intro prose is kept.
const introLines = head.filter(
  (l) => !l.startsWith('# ') && !/^>\s*Cheat Hub\b/.test(l),
)
const intro = toBlocks(introLines)

const existing = require(resolve('src/lib/cheatsheet', `${slugArg}.ts`)) as Record<string, TopicContent>
const previous = Object.values(existing).find((v) => v && typeof v === 'object' && 'sections' in v)
if (!previous) throw new Error(`no TopicContent export in ${slugArg}.ts`)

const idByTitle = new Map(previous.sections.map((s) => [s.title, s.id]))
const missing = chunks.filter((c) => !idByTitle.has(c.title))
if (missing.length) {
  console.error(`✗ ${missing.length} section title(s) have no match in ${slugArg}.ts — ids would be lost:`)
  missing.forEach((m) => console.error(`   ${JSON.stringify(m.title)}`))
  process.exit(1)
}

const sections: TopicSection[] = chunks.map((chunk) => {
  const { head: body, chunks: qa } = splitOnHeading(chunk.body, QA_HEADING)
  const section: TopicSection = {
    id: idByTitle.get(chunk.title)!,
    title: chunk.title,
    blocks: toBlocks(body),
  }
  const questions = qa.length ? toQuestions(qa[0].body) : []
  if (questions.length) section.interviewQuestions = questions
  return section
})

const content: TopicContent = { slug: previous.slug, ...(intro.length ? { intro } : {}), sections }

const exportName = Object.keys(existing).find((k) => existing[k] === previous)!
const out = `// AUTO-GENERATED from a cleaned Markdown export.
// Source: ${fileArg}
// Regenerate with: npx tsx scripts/import-topic-markdown.ts <file.md> ${slugArg}
// Prose is sanitized HTML styled by .cheat-prose (globals.css).
import type { TopicContent } from './types'

export const ${exportName}: TopicContent = ${JSON.stringify(content, null, 2)}
`

const target = resolve('src/lib/cheatsheet', `${slugArg}.ts`)
const codeBlocks = sections.flatMap((s) => s.blocks).filter((b) => b.kind === 'code' || b.kind === 'mermaid').length
console.log(`${chunks.length} sections · ${sections.flatMap((s) => s.blocks).length} blocks (${codeBlocks} code/mermaid) · ${sections.filter((s) => s.interviewQuestions?.length).length} with interview questions`)
if (dry) {
  console.log(`(dry run — ${target} untouched, ${out.length} chars would be written)`)
} else {
  writeFileSync(target, out)
  console.log(`→ ${target} (${out.length} chars)`)
}
