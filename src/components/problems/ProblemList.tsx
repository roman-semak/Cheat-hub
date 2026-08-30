'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/glass/GlassCard'

interface Problem {
  id: number
  slug: string
  title: string
  difficulty: string
  summary?: string
  tags?: string[]
}

interface ProblemListProps {
  problems: Problem[]
  solvedSlugs: string[]
}

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
} as const

type SortOption = 'default' | 'a-z' | 'z-a' | 'easiest' | 'hardest'
type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard'

const HIDE_SOLVED_KEY = 'problemsHideSolved'

export function ProblemList({ problems, solvedSlugs }: ProblemListProps) {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all')
  const [hideSolved, setHideSolved] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('default')

  useEffect(() => {
    try {
      if (localStorage.getItem(HIDE_SOLVED_KEY) === '1') setHideSolved(true)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(HIDE_SOLVED_KEY, hideSolved ? '1' : '0')
    } catch {}
  }, [hideSolved])

  const solvedSet = useMemo(() => new Set(solvedSlugs), [solvedSlugs])

  const filteredAndSorted = useMemo(() => {
    let result = [...problems]

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      const diffMap = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
      result = result.filter((p) => p.difficulty === diffMap[difficultyFilter])
    }

    // Hide solved toggle
    if (hideSolved) {
      result = result.filter((p) => !solvedSet.has(p.slug))
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(term))
    }

    // Sorting
    if (sortBy === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'z-a') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    } else if (sortBy === 'easiest') {
      const diffOrder = { Easy: 1, Medium: 2, Hard: 3 }
      result.sort((a, b) => diffOrder[a.difficulty as keyof typeof diffOrder] - diffOrder[b.difficulty as keyof typeof diffOrder])
    } else if (sortBy === 'hardest') {
      const diffOrder = { Easy: 1, Medium: 2, Hard: 3 }
      result.sort((a, b) => diffOrder[b.difficulty as keyof typeof diffOrder] - diffOrder[a.difficulty as keyof typeof diffOrder])
    }

    return result
  }, [problems, difficultyFilter, hideSolved, searchTerm, sortBy, solvedSet])

  if (problems.length === 0) {
    return (
      <GlassCard variant="dark" className="text-center">
        <p className="text-slate-300">No problems found.</p>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-4 w-full">
      {/* Filters and Search */}
      <div className="glass-subtle rounded-xl p-4 space-y-3">
        {/* Difficulty Filters */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'easy', 'medium', 'hard'] as DifficultyFilter[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                difficultyFilter === diff
                  ? 'glass text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {diff === 'all' ? 'All' : diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>

        {/* Status and Sort */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={hideSolved}
            onClick={() => setHideSolved((v) => !v)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              hideSolved ? 'glass text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span
              className={`inline-flex h-4 w-7 items-center rounded-full p-0.5 transition-colors ${
                hideSolved ? 'bg-emerald-400/80' : 'bg-slate-600/60'
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full bg-white transition-transform ${
                  hideSolved ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </span>
            Приховати пройдені
          </button>

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-1 rounded-lg bg-slate-900/50 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1 rounded-lg bg-slate-900/50 text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              <option value="default">Default</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="easiest">Easiest</option>
              <option value="hardest">Hardest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Problem List */}
      <div className="grid gap-2">
        {filteredAndSorted.length === 0 ? (
          <GlassCard variant="dark" className="text-center">
            <p className="text-slate-300 text-sm">No problems match your filters.</p>
          </GlassCard>
        ) : (
          filteredAndSorted.map((problem) => {
            const isSolved = solvedSet.has(problem.slug)
            const hasTooltip = Boolean(problem.summary || problem.tags?.length)
            return (
              <div key={problem.id} className="group/row relative">
                <Link href={`/problems/${problem.slug}`}>
                  <div
                    className={`rounded-xl p-3 hover:glass cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                      isSolved
                        ? 'glass-subtle border-l-2 border-emerald-400'
                        : 'glass-subtle'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {isSolved && <span className="text-emerald-400 text-lg">✓</span>}
                      <span className={`font-medium truncate text-sm ${isSolved ? 'text-slate-400' : 'text-slate-100'}`}>
                        {problem.title}
                      </span>
                    </div>
                    <Badge
                      variant={difficultyColors[problem.difficulty as keyof typeof difficultyColors]}
                      className="whitespace-nowrap flex-shrink-0 text-xs"
                    >
                      {problem.difficulty}
                    </Badge>
                  </div>
                </Link>

                {hasTooltip && (
                  <div className="pointer-events-none absolute left-0 top-full z-20 mt-1 w-80 max-w-[90vw] rounded-lg border border-white/10 bg-slate-900/95 p-3 text-xs opacity-0 shadow-xl backdrop-blur transition-opacity duration-150 group-hover/row:opacity-100">
                    {problem.summary && (
                      <p className="text-slate-300">
                        <span className="font-semibold text-slate-100">Що зробити: </span>
                        {problem.summary}
                      </p>
                    )}
                    {problem.tags && problem.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1">
                        <span className="font-semibold text-slate-100">Що використати:</span>
                        {problem.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
