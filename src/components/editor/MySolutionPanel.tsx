'use client'

import { useMemo } from 'react'
import 'highlight.js/styles/github-dark.css'
import { Check, RotateCcw } from 'lucide-react'
import { useUserStore } from '@/lib/userStore'
import { highlight } from '@/lib/cheatsheet/highlight'
import { Button } from '@/components/ui/Button'
import type { SavedSolution } from '@/lib/userData'

// Reads the solution the reader saved by hitting Submit. Falls back to the
// newest Accepted entry in the submission history, which is how blobs written
// before `solutions` existed still show something (see backfillSolutions).
export function useSavedSolution(slug: string): SavedSolution | null {
  const { data } = useUserStore()
  return useMemo(() => {
    const saved = data.solutions[slug]
    if (saved) return saved
    const accepted = data.submissions.find((s) => s.slug === slug && s.status === 'Accepted')
    if (!accepted) return null
    return { code: accepted.code, language: accepted.language, createdAt: accepted.createdAt }
  }, [data.solutions, data.submissions, slug])
}

export function MySolutionPanel({
  slug,
  solved,
  onRestore,
}: {
  slug: string
  solved: boolean
  onRestore: (code: string, language: string) => void
}) {
  const solution = useSavedSolution(slug)

  const html = useMemo(
    () => (solution ? highlight(solution.code, solution.language) : ''),
    [solution],
  )

  if (!solution) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center">
        <p className="max-w-sm text-sm text-slate-400">
          {solved
            ? // Run also marks a problem solved, but only Submit stores the code —
              // so "solved with nothing saved" is a real and confusing state.
              'Задача позначена пройденою, але збереженого коду немає: Run теж зараховує задачу, а зберігає лише Submit. Натисни Submit — рішення з’явиться тут.'
            : 'Розв’яжи задачу і натисни Submit — твоє рішення збережеться тут і переживе перезавантаження.'}
        </p>
      </div>
    )
  }

  const savedAt = solution.createdAt ? new Date(solution.createdAt) : null

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
          <Check size={13} /> Accepted
        </span>
        <span className="text-xs text-slate-400">{solution.language}</span>
        {savedAt && !Number.isNaN(savedAt.getTime()) && (
          <span className="text-xs text-slate-500">
            {savedAt.toLocaleString('uk-UA', { dateStyle: 'medium', timeStyle: 'short' })}
          </span>
        )}
        <Button
          onClick={() => {
            if (confirm('Замінити поточний код у редакторі збереженим рішенням?')) {
              onRestore(solution.code, solution.language)
            }
          }}
          variant="ghost"
          size="sm"
          title="Підставити збережене рішення назад у редактор"
          className="ml-auto inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200"
        >
          <RotateCcw size={14} /> Відновити в редактор
        </Button>
      </div>
      <pre className="custom-scrollbar flex-1 overflow-auto bg-black/40 p-3 text-[13px] leading-relaxed">
        <code
          className="hljs bg-transparent p-0 font-mono"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  )
}
