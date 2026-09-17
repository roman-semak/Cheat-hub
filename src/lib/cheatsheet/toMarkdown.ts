// Markdown export for cheatsheet content.
//
// Topic prose is authored as raw HTML strings (`paragraph`/`note` blocks render
// via dangerouslySetInnerHTML), so getting a `.md` file out means converting
// that HTML — tables, lists, pre-highlighted <pre>, and the authoring wrappers
// from .cheat-prose (.card / .grid2 / .alert / .tag / .changelog).
//
// IMPORTANT: only ever reach this module through `await import()` from a click
// handler. A static import would pull node-html-parser (~35 kB) into every
// topic page's initial chunk, for a feature nobody uses until they click.
import { parse, type HTMLElement, type Node } from 'node-html-parser'
import type {
  ContentBlock,
  FlashcardItem,
  NoteTone,
  QuickRefBlock,
  QuickRefEntry,
  TopicContent,
  TopicMeta,
  TopicSection,
  TopicSlug,
} from './types'
import { isChipRow, isHooksCatalogBlock, isLifecycleBlock, quickRefBlockKeys } from './quickrefKeys'

export interface MarkdownOptions {
  // Fence language for a bare <pre> we can't guess. Per-topic default below.
  defaultLanguage?: string
  // Reported for every element that fell through to the transparent fallback
  // with a class we have no rule for — used by `npm run export:md` to find gaps.
  onUnknown?: (tag: string, className: string) => void
}

// Mirrors the per-topic default from scripts/cheatsheet/parse-prose.js, which
// produced this content in the first place.
const DEFAULT_LANGUAGE: Partial<Record<TopicSlug, string>> = {
  react: 'tsx',
  'react-native': 'tsx',
  nextjs: 'tsx',
  angular: 'typescript',
  javascript: 'typescript',
  architecture: 'typescript',
  fullstack: 'typescript',
  algorithms: 'javascript',
  git: 'bash',
  ai: 'bash',
  ide: 'bash',
}

interface Ctx {
  defaultLanguage: string
  listDepth: number
  onUnknown?: (tag: string, className: string) => void
}

function makeCtx(opts?: MarkdownOptions): Ctx {
  return {
    defaultLanguage: opts?.defaultLanguage ?? 'typescript',
    listDepth: 0,
    onUnknown: opts?.onUnknown,
  }
}

// ---------------------------------------------------------------- entities ---

// &amp; must be decoded LAST, otherwise `&amp;lt;` collapses to `<` instead of
// the literal `&lt;` the author wrote.
const NAMED: Record<string, string> = { lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

export function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&(lt|gt|quot|apos|nbsp);/g, (_, name: string) => NAMED[name])
    .replace(/&amp;/g, '&')
}

// Placeholder for <br> so whitespace tidying can't eat it; resolved last.
const HARD_BREAK = '\u0000'

// Deliberately conservative: escaping * and _ across 280+ Ukrainian paragraphs
// produces more noise than it prevents. Only the characters that would actually
// change how the text parses.
function escapeText(text: string): string {
  return text.replace(/([\\`[\]])/g, '\\$1').replace(/<(?=[a-zA-Z/!])/g, '\\<')
}

function collapseWhitespace(text: string): string {
  return text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ')
}

// ------------------------------------------------------------- node access ---

function isElement(node: Node): node is HTMLElement {
  return node.nodeType === 1
}

function isText(node: Node): boolean {
  return node.nodeType === 3
}

function tagOf(el: HTMLElement): string {
  return (el.rawTagName ?? '').toLowerCase()
}

function classesOf(el: HTMLElement): string[] {
  return (el.classNames ?? '').split(/\s+/).filter(Boolean)
}

function hasClass(el: HTMLElement, name: string): boolean {
  return classesOf(el).includes(name)
}

function elementChildren(el: HTMLElement): HTMLElement[] {
  return el.childNodes.filter(isElement)
}

// ----------------------------------------------------------------- inline ----

const INLINE_TAGS = new Set([
  'a',
  'abbr',
  'b',
  'br',
  'code',
  'em',
  'i',
  'img',
  'kbd',
  'mark',
  's',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'u',
])

const TAG_BADGES: Record<string, string> = {
  'tag-key': 'KEY',
  'tag-new': 'NEW',
  'tag-pit': 'PITFALL',
}

function inlineOf(nodes: Node[], ctx: Ctx): string {
  let out = ''
  for (const node of nodes) {
    if (isText(node)) {
      out += escapeText(collapseWhitespace(node.text))
      continue
    }
    if (!isElement(node)) continue
    out += inlineOfElement(node, ctx)
  }
  return out
}

// Wraps without trapping the emphasis marker against a space, which would stop
// it from parsing as emphasis at all.
function emphasise(inner: string, marker: string): string {
  const core = inner.trim()
  if (!core) return inner
  const lead = inner.startsWith(' ') ? ' ' : ''
  const trail = inner.endsWith(' ') ? ' ' : ''
  return `${lead}${marker}${core}${marker}${trail}`
}

function codeSpan(raw: string): string {
  const text = collapseWhitespace(raw).trim()
  if (!text) return ''
  const longestRun = Math.max(0, ...[...text.matchAll(/`+/g)].map((m) => m[0].length))
  const ticks = '`'.repeat(longestRun + 1)
  const pad = /^`|`$/.test(text) ? ' ' : ''
  return `${ticks}${pad}${text}${pad}${ticks}`
}

function inlineOfElement(el: HTMLElement, ctx: Ctx): string {
  const tag = tagOf(el)

  switch (tag) {
    case 'code':
      return codeSpan(el.textContent)
    case 'strong':
    case 'b':
      return emphasise(inlineOf(el.childNodes, ctx), '**')
    case 'em':
    case 'i':
      return emphasise(inlineOf(el.childNodes, ctx), '*')
    case 'br':
      return HARD_BREAK
    case 'img': {
      const src = el.getAttribute('src')
      if (!src) return ''
      return `![${el.getAttribute('alt') ?? ''}](${src})`
    }
    case 'a': {
      const inner = inlineOf(el.childNodes, ctx)
      const href = el.getAttribute('href')
      // Angular/JSX bindings inside code samples look like anchors but aren't.
      if (!href || href.startsWith('[') || href.startsWith('{')) return inner
      return `[${inner || href}](${href})`
    }
    case 'span': {
      const badge = classesOf(el).find((c) => c in TAG_BADGES)
      if (badge) {
        const text = el.textContent.trim() || TAG_BADGES[badge]
        return `**[${text}]**`
      }
      return inlineOf(el.childNodes, ctx)
    }
    default:
      return inlineOf(el.childNodes, ctx)
  }
}

function tidyInline(text: string): string {
  return text
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// -------------------------------------------------------------- block level ---

// Wrappers that exist purely for layout — the markdown keeps their children and
// drops the box. Listed so `onUnknown` only fires for classes we haven't seen.
const TRANSPARENT_CLASSES = new Set([
  'card',
  'cards',
  'grid',
  'grid2',
  'grid3',
  'list',
  'table-wrap',
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'orange',
  'topic',
  'icon',
  'section',
  'wrap',
])

function childBlocks(el: HTMLElement, ctx: Ctx): string[] {
  const out: string[] = []
  let inline = ''
  const flush = () => {
    const text = tidyInline(inline)
    if (text) out.push(text)
    inline = ''
  }

  for (const node of el.childNodes) {
    if (isText(node)) {
      inline += escapeText(collapseWhitespace(node.text))
      continue
    }
    if (!isElement(node)) continue
    if (INLINE_TAGS.has(tagOf(node))) {
      inline += inlineOfElement(node, ctx)
      continue
    }
    flush()
    out.push(...blockOf(node, ctx))
  }

  flush()
  return out
}

function blockquote(markdown: string): string {
  return markdown
    .split('\n')
    .map((line) => (line.trim() ? `> ${line}` : '>'))
    .join('\n')
}

function headingOf(el: HTMLElement, ctx: Ctx): string {
  const level = Math.min(6, Math.max(3, Number(tagOf(el).slice(1)) || 3))
  const text = tidyInline(inlineOf(el.childNodes, ctx)).replace(/\n+/g, ' ')
  if (!text) return ''
  return `${'#'.repeat(level)} ${text}`
}

function listBlock(el: HTMLElement, ordered: boolean, ctx: Ctx): string {
  const indent = '  '.repeat(ctx.listDepth)
  const nested: Ctx = { ...ctx, listDepth: ctx.listDepth + 1 }
  const lines: string[] = []
  let index = 1

  for (const li of elementChildren(el)) {
    if (tagOf(li) !== 'li') continue
    const chunks = childBlocks(li, nested)
    if (!chunks.length) continue
    const marker = ordered ? `${index++}. ` : '- '
    const [first, ...rest] = chunks
    lines.push(indent + marker + first.replace(/\n/g, `\n${indent}  `))
    for (const chunk of rest) {
      // A nested list already carries its own indent; anything else is padded
      // to line up under the marker.
      const padded = chunk.startsWith(' ')
        ? chunk
        : chunk
            .split('\n')
            .map((line) => `${indent}  ${line}`)
            .join('\n')
      lines.push(padded)
    }
  }

  return lines.join('\n')
}

function fence(code: string, language: string): string {
  const longestRun = Math.max(2, ...[...code.matchAll(/`+/g)].map((m) => m[0].length))
  const ticks = '`'.repeat(longestRun + 1)
  return `${ticks}${language}\n${code}\n${ticks}`
}

function guessLanguage(code: string, fallback: string): string {
  const head = code.trimStart()
  if (/^(git|npm|npx|yarn|pnpm|node|docker|curl|cd|mkdir|export|\$|#!)\b/.test(head)) return 'bash'
  if (head.startsWith('{') && /"\s*:/.test(head)) return 'json'
  if (/<\/[a-zA-Z]|\/>/.test(code)) return 'tsx'
  return fallback
}

// node-html-parser treats <pre> as a block-text element: its single child holds
// the inner markup verbatim. We must strip the highlight spans BEFORE decoding —
// `pre.text` decodes first, which turns an authored `&lt;h1&gt;` into a real tag
// that the tag-strip then deletes, silently corrupting the sample.
function preBlock(el: HTMLElement, ctx: Ctx): string[] {
  const raw = el.rawText
  const stripped = raw.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '')
  const code = decodeEntities(stripped)
    .replace(/\u00a0/g, ' ')
    .replace(/^\n+/, '')
    .replace(/\s+$/, '')
  if (!code) return []
  const declared = raw.match(/class="[^"]*\b(?:language|lang)-([\w+#-]+)/)?.[1]
  return [fence(code, declared ?? guessLanguage(code, ctx.defaultLanguage))]
}

function cellText(cell: HTMLElement, ctx: Ctx): string {
  return inlineOf(cell.childNodes, ctx)
    .replace(/\|/g, '\\|')
    .replace(new RegExp(`[${HARD_BREAK}\\n]+`, 'g'), '<br>')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

function tableBlock(el: HTMLElement, ctx: Ctx): string[] {
  const rows: { cells: string[]; header: boolean }[] = []

  for (const tr of el.querySelectorAll('tr')) {
    const cells: string[] = []
    let header = false
    for (const cell of elementChildren(tr)) {
      const tag = tagOf(cell)
      if (tag !== 'td' && tag !== 'th') continue
      if (tag === 'th') header = true
      const span = Math.max(1, Number(cell.getAttribute('colspan')) || 1)
      cells.push(cellText(cell, ctx))
      // A spanning cell has no pipe-table equivalent; pad so the row keeps its
      // column count (react.ts:1752 is the only occurrence).
      for (let i = 1; i < span; i += 1) cells.push('')
    }
    if (cells.length) rows.push({ cells, header })
  }

  if (!rows.length) return []

  const width = Math.max(...rows.map((r) => r.cells.length))
  const pad = (cells: string[]) => [...cells, ...Array(width - cells.length).fill('')]
  const line = (cells: string[]) => `| ${pad(cells).join(' | ')} |`

  const head = rows[0].header ? rows[0] : null
  const body = head ? rows.slice(1) : rows
  const separator = `| ${Array(width).fill('---').join(' | ')} |`

  return [
    [
      line(head ? head.cells : Array(width).fill('')),
      separator,
      ...body.map((r) => line(r.cells)),
    ].join('\n'),
  ]
}

function changelogBlock(el: HTMLElement, ctx: Ctx): string[] {
  const out: string[] = []
  const title = el.querySelector('.changelog-title')
  if (title) {
    const text = tidyInline(inlineOf(title.childNodes, ctx))
    if (text) out.push(`**${text}**`)
  }
  const rows = el.querySelectorAll('.changelog-row').map((row) => changelogRow(row, ctx))
  const list = rows.filter(Boolean).join('\n')
  if (list) out.push(list)
  return out
}

function changelogRow(el: HTMLElement, ctx: Ctx): string {
  const version = el.querySelector('.chver')?.textContent.trim()
  const text = el.querySelector('.changelog-text')
  const body = text ? tidyInline(inlineOf(text.childNodes, ctx)) : tidyInline(inlineOf(el.childNodes, ctx))
  if (!body) return ''
  return version ? `- **${version}** — ${body}` : `- ${body}`
}

function versionRow(el: HTMLElement): string[] {
  const badges = el
    .querySelectorAll('span')
    .map((span) => span.textContent.trim())
    .filter(Boolean)
    .map((text) => `\`${text}\``)
  return badges.length ? [badges.join(' · ')] : []
}

// Authors routinely open a note/alert with their own emoji ("🧭 T-shaped
// профіль"). Adding a tone icon on top of that reads as a stutter.
function startsWithEmoji(markdown: string): boolean {
  return /^[*_>\s]*\p{Extended_Pictographic}/u.test(markdown)
}

const ALERT_ICONS: { match: string[]; icon: string }[] = [
  { match: ['good', 'alert-good', 'ok'], icon: '✅' },
  { match: ['warn', 'alert-warn', 'warning'], icon: '⚠️' },
  { match: ['bad', 'alert-bad', 'error'], icon: '❌' },
]

function alertBlock(el: HTMLElement, ctx: Ctx): string[] {
  // Most alerts carry their own <span class="icon">, and it's more specific than
  // the class-derived one (an `alert good` often opens with 💡). Take it out of
  // the body so we don't print two icons.
  const iconEl = elementChildren(el).find((child) => hasClass(child, 'icon'))
  const authored = iconEl?.textContent.trim()
  if (iconEl) el.removeChild(iconEl)

  const classes = classesOf(el)
  const icon = authored || ALERT_ICONS.find((a) => a.match.some((m) => classes.includes(m)))?.icon || 'ℹ️'
  const body = childBlocks(el, ctx).join('\n\n')
  if (!body) return []
  return [blockquote(startsWithEmoji(body) ? body : `${icon} ${body}`)]
}

function blockOf(el: HTMLElement, ctx: Ctx): string[] {
  const tag = tagOf(el)

  switch (tag) {
    case 'pre':
      return preBlock(el, ctx)
    case 'table':
      return tableBlock(el, ctx)
    case 'ul':
    case 'ol': {
      const list = listBlock(el, tag === 'ol', ctx)
      return list ? [list] : []
    }
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const heading = headingOf(el, ctx)
      return heading ? [heading] : []
    }
    case 'hr':
      return ['---']
    case 'blockquote': {
      const body = childBlocks(el, ctx).join('\n\n')
      return body ? [blockquote(body)] : []
    }
    case 'script':
    case 'style':
      return []
    default:
      break
  }

  if (hasClass(el, 'alert')) return alertBlock(el, ctx)
  if (hasClass(el, 'changelog')) return changelogBlock(el, ctx)
  if (hasClass(el, 'changelog-row')) {
    const row = changelogRow(el, ctx)
    return row ? [row] : []
  }
  if (hasClass(el, 'version-row')) return versionRow(el)

  // Unknown wrapper: keep the children, drop the box. Nothing is ever lost —
  // the worst case is flatter formatting.
  const unknown = classesOf(el).filter((c) => !TRANSPARENT_CLASSES.has(c))
  if (unknown.length) ctx.onUnknown?.(tag, unknown.join(' '))
  return childBlocks(el, ctx)
}

function finalize(markdown: string): string {
  return markdown
    .split(HARD_BREAK)
    .join('  \n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// -------------------------------------------------------------- public API ---

// Full block-level conversion of an authored prose HTML string.
export function htmlToMarkdown(html: string, opts?: MarkdownOptions): string {
  if (!html || !html.trim()) return ''
  const ctx = makeCtx(opts)
  return finalize(childBlocks(parse(html), ctx).join('\n\n'))
}

// Inline-only conversion, for HTML fields that are always single-line
// (QuickRefEntry.desc, chips, flashcard questions).
export function inlineHtmlToMarkdown(html: string, opts?: MarkdownOptions): string {
  if (!html || !html.trim()) return ''
  const ctx = makeCtx(opts)
  return inlineOf(parse(html).childNodes, ctx)
    .split(HARD_BREAK)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// For fields that are PLAIN TEXT on the page (`{value}` in JSX) — running these
// through the HTML parser would silently eat `<T>` and `git clone <url>`.
export function escapeMarkdownText(text: string): string {
  return escapeText(text)
}

// Tag-free, entity-decoded, UNESCAPED text — for content that goes inside a
// code span, where markdown escapes would render as literal backslashes.
export function htmlToPlainText(html: string): string {
  if (!html || !html.trim()) return ''
  return collapseWhitespace(parse(html).textContent).trim()
}

// QuickRef chips are a mixed bag: some are prose with authored <b>/<code>
// emphasis, some are bare code (`--depth 1`, `< 2.5s`). A code span is the
// closest markdown has to the pill they are on the page — but the choice is
// made per row, not per chip, so one prose chip can't leave its neighbours
// looking like code.
function chipsToMarkdown(chips: string[], opts?: MarkdownOptions): string[] {
  const rich = chips.map((chip) => inlineHtmlToMarkdown(chip, opts)).filter(Boolean)
  if (rich.some((chip) => /\*\*|`/.test(chip))) return rich
  return chips.map((chip) => codeSpan(htmlToPlainText(chip))).filter(Boolean)
}

const NOTE_ICONS: Record<NoteTone, string> = {
  info: 'ℹ️',
  good: '✅',
  bad: '❌',
  warn: '⚠️',
}

function questionsToMarkdown(items: FlashcardItem[], opts?: MarkdownOptions): string {
  return items
    .map((item, i) => {
      const question = inlineHtmlToMarkdown(item.question, opts)
      const answer = htmlToMarkdown(item.answer, opts)
      return [`**${i + 1}. ${question}**`, answer].filter(Boolean).join('\n\n')
    })
    .filter(Boolean)
    .join('\n\n')
}

export function blockToMarkdown(block: ContentBlock, opts?: MarkdownOptions): string {
  switch (block.kind) {
    case 'paragraph':
      return htmlToMarkdown(block.html, opts)

    case 'note': {
      const body = htmlToMarkdown(block.html, opts)
      if (!body) return ''
      // The html's own `.alert` class already produced a blockquote (and wins —
      // it's what actually renders on the page, tone can disagree with it).
      if (body.startsWith('>')) return body
      if (!block.title && startsWithEmoji(body)) return blockquote(body)
      const head = `${NOTE_ICONS[block.tone]}${block.title ? ` **${block.title}**` : ''}`
      return blockquote(`${head}\n\n${body}`)
    }

    case 'code': {
      const body = fence(block.code.replace(/\s+$/, ''), block.language)
      return block.caption ? `**${block.caption}**\n\n${body}` : body
    }

    case 'mermaid': {
      const body = fence(block.code.replace(/\s+$/, ''), 'mermaid')
      return block.caption ? `**${block.caption}**\n\n${body}` : body
    }

    case 'links': {
      const items = block.items
        .map((item) => {
          const description = item.description ? ` — ${inlineHtmlToMarkdown(item.description, opts)}` : ''
          return `- [${item.title}](${item.href})${description}`
        })
        .join('\n')
      return block.title ? `**${block.title}**\n\n${items}` : items
    }

    case 'tabs':
      return block.tabs
        .map((tab) => [`#### ${tab.label}`, htmlToMarkdown(tab.html, opts)].filter(Boolean).join('\n\n'))
        .join('\n\n')

    case 'flashcards':
      return questionsToMarkdown(block.items, opts)

    case 'heading': {
      const tag = block.tag ? ` **[${block.tag}]**` : ''
      return `${'#'.repeat(block.level + 1)} ${block.text}${tag}`
    }

    case 'grid':
      return blocksToMarkdown(block.items, opts)

    case 'versionRow':
      return block.badges.map((badge) => `\`${badge.label}\``).join(' · ')

    case 'changelog': {
      const rows = block.rows.map((row) => `- **${row.version}** — ${row.text}`).join('\n')
      return [`**${block.title}**`, rows].filter(Boolean).join('\n\n')
    }

    default: {
      // Exhaustiveness guard: a new ContentBlock variant fails the build here
      // rather than silently vanishing from the export.
      const never: never = block
      void never
      return ''
    }
  }
}

export function blocksToMarkdown(blocks: ContentBlock[], opts?: MarkdownOptions): string {
  return blocks
    .map((block) => blockToMarkdown(block, opts))
    .filter(Boolean)
    .join('\n\n')
}

export function sectionToMarkdown(section: TopicSection, opts?: MarkdownOptions): string {
  const emoji = section.emoji && !section.title.startsWith(section.emoji) ? `${section.emoji} ` : ''
  const parts = [`## ${emoji}${section.title}`, blocksToMarkdown(section.blocks, opts)]

  if (section.interviewQuestions?.length) {
    parts.push('### 🎤 Питання на співбесіді', questionsToMarkdown(section.interviewQuestions, opts))
  }

  return parts.filter(Boolean).join('\n\n')
}

function topicOptions(slug: TopicSlug, opts?: MarkdownOptions): MarkdownOptions {
  return { ...opts, defaultLanguage: opts?.defaultLanguage ?? DEFAULT_LANGUAGE[slug] ?? 'typescript' }
}

function exportFooter(path?: string): string {
  const date = new Date().toISOString().slice(0, 10)
  return `> Cheat Hub${path ? ` · ${path}` : ''} · експортовано ${date}`
}

export function topicToMarkdown(
  content: TopicContent,
  meta: TopicMeta,
  opts?: MarkdownOptions & { path?: string },
): string {
  const resolved = topicOptions(content.slug, opts)
  const head = [`# ${meta.icon} ${meta.title}`, meta.blurb, exportFooter(opts?.path)]
    .filter(Boolean)
    .join('\n\n')

  const body = [
    content.intro?.length ? blocksToMarkdown(content.intro, resolved) : '',
    ...content.sections.map((section) => sectionToMarkdown(section, resolved)),
  ].filter(Boolean)

  return finalize([head, ...body].join('\n\n---\n\n')) + '\n'
}

// ------------------------------------------------------------- quick refs ----

function quickRefEntry(entry: QuickRefEntry, opts?: MarkdownOptions): string {
  const rendered = entry.chips?.length ? chipsToMarkdown(entry.chips, opts) : []
  const chips = rendered.length ? ` (${rendered.join(', ')})` : ''
  const desc = entry.desc ? ` — ${inlineHtmlToMarkdown(entry.desc, opts)}` : ''
  // `term` is plain text on the page — parsing it as HTML would eat `<T>`.
  const head = `- ${codeSpan(entry.term)}${chips}${desc}`
  if (!entry.code) return head
  const body = fence(entry.code.replace(/\s+$/, ''), entry.codeLanguage ?? 'typescript')
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n')
  return `${head}\n\n${body}`
}

export function quickRefBlockToMarkdown(
  block: QuickRefBlock,
  fallbackLabel: string,
  opts?: MarkdownOptions,
): string {
  const label = ('label' in block && block.label) || fallbackLabel
  const head = `## ${'icon' in block && block.icon ? `${block.icon} ` : ''}${label}`

  if (isLifecycleBlock(block)) {
    const phases = block.phases.map((phase) =>
      [
        `### ${escapeMarkdownText(phase.phase)} — ${escapeMarkdownText(phase.desc)}`,
        phase.hooks.map((hook) => `- ${codeSpan(hook)}`).join('\n'),
        phase.classic ? `_${escapeMarkdownText(phase.classic)}_` : '',
      ]
        .filter(Boolean)
        .join('\n\n'),
    )
    return [head, ...phases].join('\n\n')
  }

  if (isHooksCatalogBlock(block)) {
    // Bullets rather than a table: a GFM cell can't hold a fenced example, and
    // splitting the examples out would break the hook↔example pairing.
    const hooks = block.hooks.map((row) => {
      const bullet = `- ${codeSpan(row.hook)} — _${escapeMarkdownText(row.when)}_ — ${escapeMarkdownText(row.why)}`
      if (!row.example) return bullet
      const body = fence(row.example.replace(/\s+$/, ''), row.exampleLanguage ?? 'tsx')
        .split('\n')
        .map((line) => `  ${line}`)
        .join('\n')
      return `${bullet}\n\n${body}`
    })
    return [head, hooks.join('\n')].join('\n\n')
  }

  if (isChipRow(block)) {
    const chips = chipsToMarkdown(block.chips, opts)
    return [head, chips.map((chip) => `- ${chip}`).join('\n')].filter(Boolean).join('\n\n')
  }

  const entries = block.entries.map((entry) => quickRefEntry(entry, opts))
  return [head, entries.join('\n')].join('\n\n')
}

export function quickRefToMarkdown(
  blocks: QuickRefBlock[],
  meta: TopicMeta,
  opts?: MarkdownOptions & { path?: string },
): string {
  const keys = quickRefBlockKeys(blocks)
  const head = [`# ${meta.icon} ${meta.title} — Шпаргалка`, exportFooter(opts?.path)].join('\n\n')
  const body = blocks.map((block, i) => quickRefBlockToMarkdown(block, keys[i], opts))
  return finalize([head, ...body].join('\n\n---\n\n')) + '\n'
}
