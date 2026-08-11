'use client'

import { RefObject, useEffect } from 'react'
import { markReadIfUnset } from '@/lib/userStore'

// Auto-marks a subsection as read once the sentinel at the end of its
// content ("`${id}-end`") has scrolled well into view — i.e. the user has
// scrolled past the whole block, not just glimpsed its heading.
export function useReadTracking(
  topicSlug: string,
  ids: string[],
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || ids.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.id.replace(/-end$/, '')
          markReadIfUnset(`${topicSlug}:${id}`)
          observer.unobserve(entry.target)
        })
      },
      { root, threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(`${id}-end`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [topicSlug, ids, rootRef])
}
