'use client'

import { useCallback, useMemo } from 'react'
import { useUserStore, cycleReadState } from '@/lib/userStore'
import type { ContentStatus } from '@/components/cheatsheet/StatusMarker'

export interface ContentStatusApi {
  statusOf: (key: string) => ContentStatus
  // unread → read → review → unread
  cycle: (key: string) => void
  // Does this view carry any marker at all? Drives the reset buttons, so they
  // only show when there is something to reset.
  hasRead: boolean
  hasReview: boolean
}

// Unifies the three marker states into one control. Pass every tracking key
// the current view renders, e.g. `react:history-versions`, `practice:<id>`,
// `quickref:react:<blockKey>`.
export function useContentStatus(keys: string[]): ContentStatusApi {
  const { data } = useUserStore()
  const readState = data.readState

  const keySig = keys.join(' ')

  const statusOf = useCallback(
    (key: string): ContentStatus => {
      const state = readState[key]
      if (state === 'read') return 'read'
      if (state === 'review') return 'review'
      return 'unread'
    },
    [readState],
  )

  const { hasRead, hasReview } = useMemo(
    () => ({
      hasRead: keys.some((k) => readState[k] === 'read'),
      hasReview: keys.some((k) => readState[k] === 'review'),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keySig, readState],
  )

  return { statusOf, cycle: cycleReadState, hasRead, hasReview }
}
