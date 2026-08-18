'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const GAP_PX = 12 // matches gap-3

const BREAKPOINTS: [minWidth: number, count: number][] = [
  [1536, 5],
  [1024, 3],
  [640, 2],
]

// Tracks the current column count for the shared masonry breakpoints used by
// every quickref masonry board (topic-of-blocks, or previously columns-of-topics).
export function useColumnCount(): number {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const queries = BREAKPOINTS.map(
      ([minWidth, c]) => [window.matchMedia(`(min-width: ${minWidth}px)`), c] as const,
    )
    const update = () => {
      const match = queries.find(([mq]) => mq.matches)
      setCount(match ? match[1] : 1)
    }
    update()
    queries.forEach(([mq]) => mq.addEventListener('change', update))
    return () => queries.forEach(([mq]) => mq.removeEventListener('change', update))
  }, [])

  return count
}

function assignColumns(ids: string[], heights: number[], count: number): string[][] {
  const buckets: string[][] = Array.from({ length: count }, () => [])
  const bucketHeights = new Array(count).fill(0)
  ids.forEach((id, i) => {
    const shortest = bucketHeights.indexOf(Math.min(...bucketHeights))
    buckets[shortest].push(id)
    bucketHeights[shortest] += (heights[i] ?? 0) + GAP_PX
  })
  return buckets
}

// Greedy masonry: walk items in order, always dropping the next one into the
// column that's currently shortest — so a short column's slack gets used by
// later items instead of being stranded by a table-like fixed-row layout
// (which is all CSS Grid/flex-wrap can do once a row wraps).
export function useMasonry(ids: string[], columnCount: number) {
  const itemEls = useRef<Map<string, HTMLDivElement>>(new Map())
  const [buckets, setBuckets] = useState<string[][]>(() => [ids])
  // `ids` is commonly rebuilt (new array reference) on every render by
  // callers — key off its actual values instead, so the effect below only
  // re-runs when the ids truly change, not on every render.
  const idsKey = ids.join('|')

  // Item heights only depend on their (fixed) column width, not on which
  // bucket they land in, so measuring whatever was rendered last is always
  // representative of the true height.
  useLayoutEffect(() => {
    const heights = ids.map((id) => itemEls.current.get(id)?.offsetHeight ?? 0)
    setBuckets(assignColumns(ids, heights, columnCount))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount, idsKey])

  const itemRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) itemEls.current.set(id, el)
    else itemEls.current.delete(id)
  }

  return { buckets, itemRef }
}
