'use client'

import { useEffect, useMemo, useState } from 'react'
import { ProblemList } from '@/components/problems/ProblemList'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useUserStore } from '@/lib/userStore'
import {
  DIFFICULTIES,
  useProblemProgress,
  type Difficulty,
  type DifficultyFilter,
} from '@/lib/problems/useProblemProgress'
import { cn } from '@/lib/utils'

interface Problem {
  id: number
  slug: string
  title: string
  difficulty: string
  summary?: string
  tags?: string[]
}

export function ProblemsView({ problems }: { problems: Problem[] }) {
  const { data } = useUserStore()

  const solvedSlugs = useMemo(
    () =>
      Object.entries(data.progress)
        .filter(([, status]) => status === 'solved')
        .map(([slug]) => slug),
    [data.progress],
  )

  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const { byDifficulty, all } = useProblemProgress(problems)

  // The store's server snapshot is empty, so the first paint computes 0% for
  // every bar. Snap to the real width instead of sweeping 0→N on every load.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Практика</h1>
        <p className="text-sm text-slate-400">
          Розв’язуй задачі в редакторі з автоматичною перевіркою тестів.
        </p>
      </div>

      <div className="glass-subtle rounded-xl p-6 mb-8">
        <div className="grid grid-cols-4 gap-4">
          <StatTile
            label="Total"
            slice={all}
            numClass="text-emerald-400"
            barClass="bg-emerald-400"
            dimmed={difficulty !== 'all'}
            active={false}
            animate={mounted}
          />
          {DIFFICULTIES.map((level) => (
            <StatTile
              key={level}
              label={level}
              slice={byDifficulty[level]}
              numClass={TILE[level].num}
              barClass={TILE[level].bar}
              dimmed={difficulty !== 'all' && difficulty !== level}
              active={difficulty === level}
              animate={mounted}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Problem List
        </h2>
        <ProblemList
          problems={problems}
          solvedSlugs={solvedSlugs}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
      </div>
    </div>
  )
}

// These class strings must stay in a file the Tailwind `content` globs cover
// (src/{pages,components,app}). The same map under src/lib would be purged in a
// production build and every bar would render with an invisible fill.
const TILE: Record<Difficulty, { num: string; bar: string }> = {
  Easy: { num: 'text-green-300', bar: 'bg-green-400' },
  Medium: { num: 'text-yellow-300', bar: 'bg-yellow-400' },
  Hard: { num: 'text-red-300', bar: 'bg-red-400' },
}

function StatTile({
  label,
  slice,
  numClass,
  barClass,
  dimmed,
  active,
  animate,
}: {
  label: string
  slice: { solved: number; total: number; percent: number }
  numClass: string
  barClass: string
  dimmed: boolean
  active: boolean
  animate: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-lg p-2 transition-all duration-200',
        active && 'bg-white/[0.06] ring-1 ring-white/20',
        dimmed && 'opacity-40',
      )}
    >
      <p className="mb-1 text-xs text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-slate-100">
        <span className={numClass}>{slice.solved}</span>
        <span className="text-slate-500">/</span>
        <span className={numClass}>{slice.total}</span>
      </p>
      <ProgressBar
        value={slice.solved}
        max={slice.total}
        percent={slice.percent}
        label={`${label}: розв’язано ${slice.solved} з ${slice.total}`}
        trackClassName="bg-white/10"
        fillClassName={barClass}
        animate={animate}
        className="mt-2"
      />
    </div>
  )
}
