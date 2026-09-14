import { readFileSync } from 'node:fs'
import path from 'node:path'
import { pageMetadata } from '@/lib/seo'
import { renderMarkdown } from '@/lib/docs/renderMarkdown'
import { CopyMarkdownButton } from '@/components/docs/CopyMarkdownButton'
import { MermaidBlock } from '@/components/cheatsheet/MermaidBlock'

const SOURCE = path.join('Docs', 'project-structure.md')

export const metadata = pageMetadata({
  title: 'Структура проєкту',
  description: 'Схема розділів Cheat Hub: навігація, маршрути, дані та карта коду.',
  path: '/docs/project-structure',
  robots: { index: false, follow: true },
})

// Static page: the Markdown is read once at build time, so the Docs/ file
// stays the single source of truth without shipping a copy into src/.
export default function ProjectStructurePage() {
  const markdown = readFileSync(path.join(process.cwd(), SOURCE), 'utf8')
  // The page header already shows the title, so drop the document's own H1
  // from the rendered body. The copy button still gets the full file.
  const segments = renderMarkdown(markdown.replace(/^# .*\n/, ''))

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
            📐 Структура проєкту
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Джерело: <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-xs text-cyan-300">{SOURCE}</code>.
            Кнопка копіює весь markdown цієї сторінки.
          </p>
        </div>
        <CopyMarkdownButton markdown={markdown} />
      </header>

      <article className="cheat-prose md-doc">
        {segments.map((segment, i) =>
          segment.kind === 'mermaid' ? (
            <MermaidBlock key={i} code={segment.code} />
          ) : (
            <div key={i} dangerouslySetInnerHTML={{ __html: segment.html }} />
          ),
        )}
      </article>
    </div>
  )
}
