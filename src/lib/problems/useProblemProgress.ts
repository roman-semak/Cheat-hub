'use client'

import { useMemo } from 'react'
import { useUserStore } from '@/lib/userStore'
import type { ProgressStatus } from '@/lib/userData'

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]
export type DifficultyFilter = 'all' | Difficulty

export interface ProgressSlice {
  solved: number
  total: number
  /** 0–100, integer. */
  percent: number
}

export interface ProblemProgress {
  /** Catalog-scoped, per difficulty — what the three bars show. */
  byDifficulty: Record<Difficulty, ProgressSlice>
  /** Catalog-scoped overall — the Total tile and its bar. */
  all: ProgressSlice
  /**
   * Store-scoped marker counts, INCLUDING slugs no longer in the catalog.
   * This is what the reset buttons actually clear, so it must stay unfiltered:
   * scoping it to the catalog would make orphan markers invisible AND
   * unclearable. Two different questions, deliberately not merged.
   */
  stored: { solved: number; attempted: number }
}

/** Anything with a slug and a difficulty — keeps this decoupled from the page type. */
interface Countable {
  slug: string
  difficulty: string
}

const empty = (): ProgressSlice => ({ solved: 0, total: 0, percent: 0 })
const pct = (solved: number, total: number) =>
  total > 0 ? Math.round((Math.min(solved, total) / total) * 100) : 0

export function problemProgressFrom(
  progress: Record<string, ProgressStatus>,
  problems: Countable[],
): ProblemProgress {
  const byDifficulty: Record<Difficulty, ProgressSlice> = {
    Easy: empty(),
    Medium: empty(),
    Hard: empty(),
  }
  let allSolved = 0

  for (const problem of problems) {
    // `=== 'solved'` on purpose: normalize() passes `progress` through without
    // per-value validation, so a synced blob can hold arbitrary strings and
    // "anything not solved" would count garbage as attempted.
    const solved = progress[problem.slug] === 'solved'
    if (solved) allSolved += 1

    // An unknown difficulty still counts toward the total but lands in no
    // bucket, so a drift between `all.total` and the sum of the three buckets
    // is detectable rather than a silent miscount.
    const bucket = byDifficulty[problem.difficulty as Difficulty]
    if (!bucket) continue
    bucket.total += 1
    if (solved) bucket.solved += 1
  }

  for (const difficulty of DIFFICULTIES) {
    const slice = byDifficulty[difficulty]
    slice.percent = pct(slice.solved, slice.total)
  }

  let storedSolved = 0
  let storedAttempted = 0
  for (const status of Object.values(progress)) {
    if (status === 'solved') storedSolved += 1
    else if (status === 'attempted') storedAttempted += 1
  }

  return {
    byDifficulty,
    all: { solved: allSolved, total: problems.length, percent: pct(allSolved, problems.length) },
    stored: { solved: storedSolved, attempted: storedAttempted },
  }
}

// NOTE: keep Tailwind class names OUT of this module. `content` globs cover
// src/{pages,components,app} only, so a difficulty→colour map living here would
// be purged in a production build and every bar would render invisible.
export function useProblemProgress(problems: Countable[]): ProblemProgress {
  const { data } = useUserStore()
  // Memoising on `data.progress` identity is safe for the same reason as
  // useAllTopicProgress: every store write rebuilds the object wholesale.
  return useMemo(() => problemProgressFrom(data.progress, problems), [data.progress, problems])
}
