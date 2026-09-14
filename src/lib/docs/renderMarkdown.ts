// Renders a Markdown document from Docs/ into HTML segments for the in-app
// docs pages. markdown-it handles everything except ```mermaid fences, which
// are split out so the client-side MermaidBlock can draw them.
import MarkdownIt from 'markdown-it'
import { highlight } from '@/lib/cheatsheet/highlight'

export type DocSegment = { kind: 'html'; html: string } | { kind: 'mermaid'; code: string }

const md = new MarkdownIt({
  html: true, // <details>/<summary> in the source
  linkify: true,
  highlight: (code, lang) => (lang ? highlight(code, lang) : ''),
})

// Wrap tables so the existing .cheat-prose .table-wrap styling applies.
md.renderer.rules.table_open = () => '<div class="table-wrap"><table>'
md.renderer.rules.table_close = () => '</table></div>'

// Relative repo links (../README.md, react-course-coverage.md) have no route in
// the app — render them as inline code instead of a 404 link. External links
// open in a new tab.
const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

function isRepoRelative(href: string) {
  return href.endsWith('.md') || href.startsWith('../') || href.startsWith('./')
}

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') ?? ''
  if (isRepoRelative(href)) {
    // Mark the matching link_close so it emits </code>.
    let depth = 0
    for (let i = idx + 1; i < tokens.length; i += 1) {
      if (tokens[i].type === 'link_open') depth += 1
      if (tokens[i].type === 'link_close') {
        if (depth === 0) {
          tokens[i].meta = { ...(tokens[i].meta ?? {}), asCode: true }
          break
        }
        depth -= 1
      }
    }
    return '<code>'
  }
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet('target', '_blank')
    tokens[idx].attrSet('rel', 'noopener noreferrer')
  }
  return defaultLinkOpen(tokens, idx, options, env, self)
}

const defaultLinkClose =
  md.renderer.rules.link_close ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.link_close = (tokens, idx, options, env, self) =>
  tokens[idx].meta?.asCode ? '</code>' : defaultLinkClose(tokens, idx, options, env, self)

const MERMAID_FENCE = /```mermaid\s*\n([\s\S]*?)\n```/g

// Splits `source` into rendered-HTML segments and raw Mermaid sources, in
// document order.
export function renderMarkdown(source: string): DocSegment[] {
  const segments: DocSegment[] = []
  let last = 0
  for (const match of source.matchAll(MERMAID_FENCE)) {
    const before = source.slice(last, match.index)
    if (before.trim()) segments.push({ kind: 'html', html: md.render(before) })
    segments.push({ kind: 'mermaid', code: match[1].trim() })
    last = match.index + match[0].length
  }
  const rest = source.slice(last)
  if (rest.trim()) segments.push({ kind: 'html', html: md.render(rest) })
  return segments
}
