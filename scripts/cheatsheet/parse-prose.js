const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')

const ROOT = path.resolve(__dirname, '../..')
const SRC = path.join(ROOT, 'CheetSheet')

const TOPICS = [
  { slug: 'react', lang: 'tsx' },
  { slug: 'angular', lang: 'typescript' },
  { slug: 'javascript', lang: 'typescript' },
  { slug: 'architecture', lang: 'typescript' },
  { slug: 'git', lang: 'bash' },
  { slug: 'ai', lang: 'bash' },
]

function decode(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

function slugify(s) {
  return (
    s
      // drop emoji / symbols, keep latin/cyrillic/digits/space/dash
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '') || 'section'
  )
}

function titleText(h2) {
  return h2.text.replace(/\s+/g, ' ').trim()
}

// Is this node a code block (a <pre> or wrapper whose only meaningful child is a <pre>)?
function findPre(node) {
  if (node.tagName === 'PRE') return node
  if (node.querySelector) {
    const pre = node.querySelector('pre')
    // treat as code block only if the node is basically just the pre
    if (pre && node.text.replace(/\s/g, '') === pre.text.replace(/\s/g, '')) return pre
  }
  return null
}

function parseFile(file, lang) {
  const html = fs.readFileSync(file, 'utf8')
  // Default options keep <pre> as a raw-text element (its rawText holds the
  // highlight <span>s). We strip those tags ourselves for extracted code.
  // Prose blocks keep the spans via outerHTML (styled by .cheat-prose).
  const root = parse(html)

  const titles = root.querySelectorAll('.section-title')
  const usedIds = new Set()
  const sections = []

  for (const h2 of titles) {
    const title = titleText(h2)
    let id = slugify(title)
    let n = 2
    while (usedIds.has(id)) id = `${slugify(title)}-${n++}`
    usedIds.add(id)

    // Collect sibling nodes after the h2, until the next section-title.
    const blocks = []
    let htmlBuf = ''
    const flush = () => {
      const t = htmlBuf.trim()
      if (t) blocks.push({ kind: 'paragraph', html: t })
      htmlBuf = ''
    }

    let node = h2.nextElementSibling
    while (node) {
      if (node.classList && node.classList.contains('section-title')) break
      const pre = findPre(node)
      if (pre) {
        flush()
        // pre.innerHTML holds raw text incl. highlight <span>s — strip tags.
        const raw = pre.innerHTML !== undefined ? pre.innerHTML : pre.rawText
        const code = decode(String(raw).replace(/<[^>]+>/g, ''))
          .replace(/\n+$/g, '')
          .replace(/^\n+/, '')
        if (code.trim()) blocks.push({ kind: 'code', language: lang, code })
      } else {
        htmlBuf += node.outerHTML
      }
      node = node.nextElementSibling
    }
    flush()

    if (blocks.length) sections.push({ id, title, blocks })
  }

  return sections
}

function parseTopic({ slug, lang }) {
  const extended = parseFile(path.join(SRC, slug, 'index.html'), lang)
  const cheatPath = path.join(SRC, slug, 'cheatsheet.html')
  const cheat = fs.existsSync(cheatPath) ? parseFile(cheatPath, lang) : []

  const out =
    `// AUTO-GENERATED from CheetSheet/${slug}/{index,cheatsheet}.html.\n` +
    `// Prose preserved as sanitized HTML blocks (styled via .cheat-prose) +\n` +
    `// extracted code blocks. Re-running the parser overwrites this file.\n` +
    `import type { TopicContent } from './types'\n\n` +
    `export const ${slug}Content: TopicContent = ` +
    JSON.stringify({ slug, sections: extended }, null, 2) +
    `\n\nexport const ${slug}Cheat: TopicContent = ` +
    JSON.stringify({ slug, sections: cheat }, null, 2) +
    '\n'
  fs.writeFileSync(path.join(ROOT, `src/lib/cheatsheet/${slug}.ts`), out)
  const cb = (ss) => ss.reduce((a, s) => a + s.blocks.filter((b) => b.kind === 'code').length, 0)
  return { slug, ext: extended.length, cheat: cheat.length, code: cb(extended) + cb(cheat) }
}

for (const t of TOPICS) {
  const r = parseTopic(t)
  console.log(`${r.slug}: extended=${r.ext} cheat=${r.cheat} codeBlocks=${r.code}`)
}
