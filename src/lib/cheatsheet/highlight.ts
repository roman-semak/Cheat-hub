// Shared syntax-highlighting helper for cheat-sheet code rendering.
// Registers only the languages we ship to keep the bundle small, and exposes a
// single highlight() used by both CodeBlock and QuickRefTopicView.
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import sql from 'highlight.js/lib/languages/sql'
import json from 'highlight.js/lib/languages/json'
import ini from 'highlight.js/lib/languages/ini'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('json', json)
hljs.registerLanguage('ini', ini)

// Map our content languages onto a registered hljs language.
const LANG_MAP: Record<string, string> = {
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'javascript',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  html: 'xml',
  xml: 'xml',
  css: 'css',
  sql: 'sql',
  json: 'json',
  ini: 'ini',
}

const escapeHtml = (code: string) =>
  code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Returns highlighted HTML for `code`, falling back to escaped plain text when
// the language is unknown or highlighting fails.
export function highlight(code: string, language = 'typescript'): string {
  const lang = LANG_MAP[language.toLowerCase()]
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(code, { language: lang }).value
    } catch {
      /* fall through to escaped plain text */
    }
  }
  return escapeHtml(code)
}
