'use client'

import { useMemo } from 'react'
import { useUserStore } from '@/lib/userStore'
import type { ReadState } from '@/lib/userData'
import { TOPIC_COVERAGE } from './contentCounts.generated'
import type { TopicSlug } from './types'

export interface TopicProgress {
  /** Units marked ✓, clamped to `total`. */
  read: number
  /** Units marked ● — tracked but deliberately NOT part of the bar. */
  review: number
  total: number
  /** 0–100, integer. */
  percent: number
}

export type TopicProgressMap = Record<TopicSlug, TopicProgress>

// Flat [prefix, slug] pairs, longest first so `quickref:react:` always wins
// over any shorter prefix. Built once at module scope.
const PREFIXES: [string, TopicSlug][] = (
  Object.entries(TOPIC_COVERAGE) as [TopicSlug, { prefixes: string[] }][]
)
  .flatMap(([slug, c]) => c.prefixes.map((p): [string, TopicSlug] => [p, slug]))
  .sort((a, b) => b[0].length - a[0].length)

// Pure counter — one pass over readState for every topic at once. Exported so
// it can be exercised without React.
export function topicProgressFrom(readState: Record<string, ReadState>): TopicProgressMap {
  const tally = {} as Record<TopicSlug, { read: number; review: number }>
  for (const slug of Object.keys(TOPIC_COVERAGE) as TopicSlug[]) {
    tally[slug] = { read: 0, review: 0 }
  }

  for (const key of Object.keys(readState)) {
    // Every prefix ends in ':', so `react:` can never swallow `react-native:`.
    const hit = PREFIXES.find(([prefix]) => key.startsWith(prefix))
    if (!hit) continue // orphan key from content that no longer exists
    if (readState[key] === 'read') tally[hit[1]].read += 1
    else tally[hit[1]].review += 1
  }

  const out = {} as TopicProgressMap
  for (const slug of Object.keys(TOPIC_COVERAGE) as TopicSlug[]) {
    const { total } = TOPIC_COVERAGE[slug]
    // Clamp: a stale generated file (content removed, counts not regenerated)
    // must degrade to 100%, never to a >100% bar.
    const read = Math.min(tally[slug].read, total)
    out[slug] = {
      read,
      review: tally[slug].review,
      total,
      percent: total > 0 ? Math.round((read / total) * 100) : 0,
    }
  }
  return out
}

// Progress for all topics from a single pass. Call once per sidebar render and
// index by slug — not once per row.
//
// Memoising on `data.readState` identity is safe: every store write rebuilds
// that object wholesale (userStore's `update()` spreads it), nothing mutates
// it in place. So the pass runs once per marker change, not once per render.
export function useAllTopicProgress(): TopicProgressMap {
  const { data } = useUserStore()
  return useMemo(() => topicProgressFrom(data.readState), [data.readState])
}
