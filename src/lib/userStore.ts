'use client'

import { useSyncExternalStore } from 'react'
import { type UserData, type SubmissionRecord, type ReadState, emptyData, normalize } from './userData'
import { downloadTextFile } from './download'

export type { ProgressStatus, SubmissionRecord, QuizProgress, ReadState, UserData } from './userData'
export { normalize } from './userData'

const STORAGE_KEY = 'cheatHubUser'
const AUTH_FLAG_KEY = 'cheatHubAuthUser'

export type SyncState = 'idle' | 'syncing' | 'synced' | 'error'

interface SyncSnapshot {
  authUsername: string | null
  syncState: SyncState
  lastSyncedAt: string
}

// In-memory snapshot, kept in sync with localStorage. `useSyncExternalStore`
// reads from this so every component re-renders on any write.
let snapshot: UserData = emptyData()
let loaded = false
const listeners = new Set<() => void>()

// Sync/auth state — kept separate from `UserData` itself so it's never
// written into localStorage or pushed to the server as part of the blob.
// Held as a single object (reassigned wholesale, like `snapshot` above) so
// `useSyncExternalStore` gets a stable reference between renders.
let syncSnapshot: SyncSnapshot = { authUsername: null, syncState: 'idle', lastSyncedAt: '' }
let pushTimer: ReturnType<typeof setTimeout> | null = null

function isBrowser() {
  return typeof window !== 'undefined'
}

function loadFromStorage(): UserData {
  if (!isBrowser()) return emptyData()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyData()
    const parsed = JSON.parse(raw)
    return normalize(parsed)
  } catch {
    return emptyData()
  }
}

function ensureLoaded() {
  if (!loaded && isBrowser()) {
    snapshot = loadFromStorage()
    loaded = true
    const storedAuth = window.localStorage.getItem(AUTH_FLAG_KEY)
    if (storedAuth) {
      syncSnapshot = { ...syncSnapshot, authUsername: storedAuth }
      void pullFromServer()
    }
  }
}

function notify() {
  listeners.forEach((l) => l())
}

function persist(next: UserData) {
  snapshot = next
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }
  notify()
}

function update(mutator: (draft: UserData) => UserData) {
  ensureLoaded()
  const next = mutator({
    ...snapshot,
    progress: { ...snapshot.progress },
    submissions: [...snapshot.submissions],
    quizzes: { ...snapshot.quizzes },
    readState: { ...snapshot.readState },
    seenNew: { ...snapshot.seenNew },
  })
  next.updatedAt = new Date().toISOString()
  persist(next)
  schedulePush()
}

// ---- remote sync ----

function setSyncState(next: SyncState) {
  syncSnapshot = {
    ...syncSnapshot,
    syncState: next,
    lastSyncedAt: next === 'synced' ? new Date().toISOString() : syncSnapshot.lastSyncedAt,
  }
  notify()
}

function schedulePush() {
  if (!syncSnapshot.authUsername || !isBrowser()) return
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => void pushToServer(), 1500)
}

async function pushToServer() {
  if (!syncSnapshot.authUsername) return
  setSyncState('syncing')
  try {
    const res = await fetch('/api/sync', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snapshot),
    })
    if (res.status === 401) {
      clearAuthLocally()
      return
    }
    if (!res.ok) throw new Error('push failed')
    setSyncState('synced')
  } catch {
    setSyncState('error')
  }
}

async function pullFromServer() {
  setSyncState('syncing')
  try {
    const res = await fetch('/api/sync')
    if (res.status === 401) {
      clearAuthLocally()
      return
    }
    if (!res.ok) throw new Error('pull failed')
    const data = await res.json()
    persist(normalize(data))
    setSyncState('synced')
  } catch {
    setSyncState('error')
  }
}

function clearAuthLocally() {
  syncSnapshot = { authUsername: null, syncState: 'idle', lastSyncedAt: syncSnapshot.lastSyncedAt }
  if (isBrowser()) window.localStorage.removeItem(AUTH_FLAG_KEY)
  notify()
}

async function login(username: string, password: string): Promise<{ error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const json = await res.json()
    if (!res.ok) return { error: json.error ?? 'Не вдалося увійти' }
    // Server data overwrites local — accepted last-write-wins simplification.
    // The authenticated username is folded into the persisted UserData (not
    // just the ephemeral authUsername flag) so it's part of the synced blob
    // and shows up as the display name wherever `data.username` is read.
    persist({ ...normalize(json.data), username: json.username })
    syncSnapshot = { ...syncSnapshot, authUsername: json.username }
    if (isBrowser()) window.localStorage.setItem(AUTH_FLAG_KEY, json.username)
    setSyncState('synced')
    return {}
  } catch {
    return { error: 'Не вдалося з’єднатися з сервером' }
  }
}

function logout() {
  void fetch('/api/auth/logout', { method: 'POST' })
  clearAuthLocally()
}

// ---- store subscription (for useSyncExternalStore) ----

function subscribe(listener: () => void): () => void {
  ensureLoaded()
  listeners.add(listener)
  // Sync across tabs/windows.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = loadFromStorage()
      listener()
    }
  }
  if (isBrowser()) window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    if (isBrowser()) window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): UserData {
  ensureLoaded()
  return snapshot
}

// Server/hydration snapshot. Must be the SAME reference on every call:
// returning a fresh emptyData() makes useSyncExternalStore see a new value each
// render ("The result of getServerSnapshot should be cached to avoid an
// infinite loop"). Safe to share — every write builds a new object, nothing
// mutates UserData in place.
const serverSnapshot: UserData = emptyData()

function getServerSnapshot(): UserData {
  return serverSnapshot
}

const serverSyncSnapshot: SyncSnapshot = { authUsername: null, syncState: 'idle', lastSyncedAt: '' }

function getSyncSnapshot(): SyncSnapshot {
  ensureLoaded()
  return syncSnapshot
}

function getServerSyncSnapshot(): SyncSnapshot {
  return serverSyncSnapshot
}

// ---- public actions ----

export function setUsername(name: string) {
  update((d) => ({ ...d, username: name }))
}

export function markSolved(slug: string) {
  update((d) => ({ ...d, progress: { ...d.progress, [slug]: 'solved' } }))
}

export function markAttempted(slug: string) {
  update((d) => {
    // Never downgrade an already-solved problem.
    if (d.progress[slug] === 'solved') return d
    return { ...d, progress: { ...d.progress, [slug]: 'attempted' } }
  })
}

export function addSubmission(rec: SubmissionRecord) {
  update((d) => ({ ...d, submissions: [rec, ...d.submissions] }))
}

// Record a quiz answer. No-op if that question was already answered (answers
// lock once chosen, mirroring the Quiz UI).
export function setQuizAnswer(quizId: string, questionIndex: number, optionIndex: number) {
  update((d) => {
    const existing = d.quizzes[quizId] ?? { answers: {} }
    if (existing.answers[questionIndex] !== undefined) return d
    return {
      ...d,
      quizzes: {
        ...d.quizzes,
        [quizId]: { answers: { ...existing.answers, [questionIndex]: optionIndex } },
      },
    }
  })
}

export function resetQuiz(quizId: string) {
  update((d) => ({
    ...d,
    quizzes: { ...d.quizzes, [quizId]: { answers: {} } },
  }))
}

// Cycles a cheatsheet unit's marker: unread → read → review → unread.
// All three states are the user's own.
export function cycleReadState(key: string) {
  update((d) => {
    const readState = { ...d.readState }
    const current = d.readState[key]
    if (current === 'read') readState[key] = 'review'
    else if (current === 'review') delete readState[key]
    else readState[key] = 'read'
    return { ...d, readState }
  })
}

// Auto-mark-as-read from scroll tracking. No-op if the key already has a
// state (read or review), so it never clobbers a manual "needs review" flag.
export function markReadIfUnset(key: string) {
  update((d) => {
    if (d.readState[key] !== undefined) return d
    return { ...d, readState: { ...d.readState, [key]: 'read' as ReadState } }
  })
}

// Clears the green ✓ for every section of one topic. Red "review" flags
// survive — they're a separate axis with their own reset.
export function resetReadStateForTopic(topicSlug: string) {
  update((d) => {
    const prefix = `${topicSlug}:`
    const readState = Object.fromEntries(
      Object.entries(d.readState).filter(([key, v]) => !(key.startsWith(prefix) && v === 'read')),
    )
    return { ...d, readState }
  })
}

// Clears the red "review" flags for one topic, leaving green ✓ alone.
export function resetReviewForTopic(topicSlug: string) {
  update((d) => {
    const prefix = `${topicSlug}:`
    const readState = Object.fromEntries(
      Object.entries(d.readState).filter(([key, v]) => !(key.startsWith(prefix) && v === 'review')),
    )
    return { ...d, readState }
  })
}

// Clears every marker for an explicit list of keys (one section / group), in
// a single store write. No-op if none of them carry any state.
export function resetReadStateForKeys(keys: string[]) {
  update((d) => {
    const toClear = keys.filter((k) => d.readState[k] !== undefined)
    if (toClear.length === 0) return d
    const readState = { ...d.readState }
    for (const k of toClear) delete readState[k]
    return { ...d, readState }
  })
}

// Clears every marker for one topic in a single store write — both green ✓
// and red ● (any readState key under `prefix`).
export function resetTopicStatus(prefix: string) {
  update((d) => {
    const readState = Object.fromEntries(
      Object.entries(d.readState).filter(([key]) => !key.startsWith(prefix)),
    )
    return { ...d, readState }
  })
}

// Clears every marker (✓ and ●) across all topics. Task progress and
// quizzes are untouched.
export function resetAllReadState() {
  update((d) => ({ ...d, readState: {} }))
}

export function resetData() {
  persist(emptyData())
  schedulePush()
}

export function exportJson() {
  ensureLoaded()
  const name = snapshot.username ? snapshot.username.replace(/\s+/g, '-') : 'data'
  downloadTextFile(
    JSON.stringify(snapshot, null, 2),
    `cheat-hub-${name}.json`,
    'application/json',
  )
}

export async function importJson(file: File): Promise<void> {
  const text = await file.text()
  const parsed = JSON.parse(text)
  persist(normalize(parsed))
  schedulePush()
}

// ---- React hook ----

export function useUserStore() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const sync = useSyncExternalStore(subscribe, getSyncSnapshot, getServerSyncSnapshot)
  const hydrated = loaded
  return {
    data,
    hydrated,
    ...sync,
    setUsername,
    markSolved,
    markAttempted,
    addSubmission,
    setQuizAnswer,
    resetQuiz,
    cycleReadState,
    markReadIfUnset,
    resetAllReadState,
    resetData,
    exportJson,
    importJson,
    login,
    logout,
  }
}
