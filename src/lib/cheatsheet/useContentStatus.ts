'use client'

import { useCallback, useMemo } from 'react'
import { useUserStore, cycleReadState, markSeen } from '@/lib/userStore'
import type { ContentStatus } from '@/components/cheatsheet/StatusMarker'
import { useNewContent } from './useNewContent'

// A trackable content unit. `newKey` addresses the manifest + `seenNew`;
// `readKey` addresses `readState`. They're the same string everywhere except
// prose cheat/links variants (which share read-state with the prose page but
// need their own "new" namespace).
export interface StatusPair {
  newKey: string
  readKey: string
}

export const sameKey = (key: string): StatusPair => ({ newKey: key, readKey: key })

export interface ContentStatusApi {
  statusOf: (pair: StatusPair) => ContentStatus
  cycle: (pair: StatusPair) => void
  // Clear the "new" flag without touching read-state (e.g. on "open").
  dismissNew: (pair: StatusPair) => void
  hasRecent: boolean
  markAllSeen: () => void
}

// Unifies the "new" marker and the read-state toggle into one 3-state control.
// Pass every pair the current view renders.
export function useContentStatus(pairs: StatusPair[]): ContentStatusApi {
  const { data } = useUserStore()
  const readState = data.readState

  const newKeySig = pairs.map((p) => p.newKey).join(' ')
  const newKeys = useMemo(
    () => pairs.map((p) => p.newKey),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newKeySig],
  )
  const { isNew, hasRecent, markAllSeen } = useNewContent(newKeys)

  const statusOf = useCallback(
    (pair: StatusPair): ContentStatus => {
      if (isNew(pair.newKey)) return 'new'
      return readState[pair.readKey] === 'read' ? 'read' : 'unread'
    },
    [isNew, readState],
  )

  const cycle = useCallback(
    (pair: StatusPair) => {
      if (isNew(pair.newKey)) {
        markSeen(pair.newKey) // new → unread
      } else {
        cycleReadState(pair.readKey) // unread ↔ read
      }
    },
    [isNew],
  )

  const dismissNew = useCallback(
    (pair: StatusPair) => {
      if (isNew(pair.newKey)) markSeen(pair.newKey)
    },
    [isNew],
  )

  return { statusOf, cycle, dismissNew, hasRecent, markAllSeen }
}
