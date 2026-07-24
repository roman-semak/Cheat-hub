'use client'

import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'cheatHubUser'
const SYNC_KEY_STORAGE = 'cheatHubSyncKey'

export type ProgressStatus = 'solved' | 'attempted'

export interface SubmissionRecord {
  slug: string
  code: string
  language: string
  status: 'Accepted' | 'Wrong Answer'
  runtime?: number
  createdAt: string
}

// Per-quiz progress. `answers[questionIndex] = chosenOptionIndex`.
export interface QuizProgress {
  answers: Record<number, number>
}

export interface UserData {
  username: string
  progress: Record<string, ProgressStatus>
  submissions: SubmissionRecord[]
  quizzes: Record<string, QuizProgress>
  updatedAt: string
}

function emptyData(): UserData {
  return { username: '', progress: {}, submissions: [], quizzes: {}, updatedAt: '' }
}

// In-memory snapshot, kept in sync with localStorage. `useSyncExternalStore`
// reads from this so every component re-renders on any write.
let snapshot: UserData = emptyData()
let loaded = false
const listeners = new Set<() => void>()

// Combined snapshot exposed to `useSyncExternalStore`. It bundles the user data
// with sync status so status-only changes still trigger re-renders. `getSnapshot`
// must return a STABLE reference between changes, so we cache and only rebuild it
// inside `notify()`.
interface StoreSnapshot {
  data: UserData
  syncState: SyncState
  lastSyncedAt: string
}
let cached: StoreSnapshot = { data: snapshot, syncState: 'idle', lastSyncedAt: '' }
const SERVER_SNAPSHOT: StoreSnapshot = {
  data: emptyData(),
  syncState: 'idle',
  lastSyncedAt: '',
}

function rebuildCache() {
  cached = { data: snapshot, syncState, lastSyncedAt }
}

function notify() {
  rebuildCache()
  listeners.forEach((l) => l())
}

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

function normalizeQuizzes(value: unknown): Record<string, QuizProgress> {
  if (!value || typeof value !== 'object') return {}
  const out: Record<string, QuizProgress> = {}
  for (const [id, q] of Object.entries(value as Record<string, unknown>)) {
    const answers =
      q && typeof q === 'object' && (q as QuizProgress).answers &&
      typeof (q as QuizProgress).answers === 'object'
        ? ((q as QuizProgress).answers as Record<number, number>)
        : {}
    out[id] = { answers }
  }
  return out
}

export function normalize(value: unknown): UserData {
  const base = emptyData()
  if (!value || typeof value !== 'object') return base
  const v = value as Partial<UserData>
  return {
    username: typeof v.username === 'string' ? v.username : '',
    progress:
      v.progress && typeof v.progress === 'object'
        ? (v.progress as Record<string, ProgressStatus>)
        : {},
    submissions: Array.isArray(v.submissions) ? v.submissions : [],
    quizzes: normalizeQuizzes(v.quizzes),
    updatedAt: typeof v.updatedAt === 'string' ? v.updatedAt : '',
  }
}

function ensureLoaded() {
  if (!loaded && isBrowser()) {
    snapshot = loadFromStorage()
    loaded = true
    rebuildCache()
    // Kick off a remote pull once, if a sync key is configured.
    void maybeInitialSync()
  }
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
  })
  next.updatedAt = new Date().toISOString()
  persist(next)
  schedulePush()
}

// ---- store subscription (for useSyncExternalStore) ----

function subscribe(listener: () => void): () => void {
  ensureLoaded()
  listeners.add(listener)
  // Sync across tabs/windows.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = loadFromStorage()
      notify()
    }
  }
  if (isBrowser()) window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    if (isBrowser()) window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): StoreSnapshot {
  ensureLoaded()
  return cached
}

function getServerSnapshot(): StoreSnapshot {
  return SERVER_SNAPSHOT
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

export function resetData() {
  persist(emptyData())
  schedulePush()
}

export function exportJson() {
  ensureLoaded()
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const name = snapshot.username ? snapshot.username.replace(/\s+/g, '-') : 'data'
  a.href = url
  a.download = `cheat-hub-${name}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function importJson(file: File): Promise<void> {
  const text = await file.text()
  const parsed = JSON.parse(text)
  persist(normalize(parsed))
  schedulePush()
}

// ---- remote sync (Upstash-backed /api/state) ----

export type SyncState = 'idle' | 'syncing' | 'synced' | 'disabled' | 'error'

let syncState: SyncState = 'idle'
let lastSyncedAt = ''
let pushTimer: ReturnType<typeof setTimeout> | null = null
let initialSyncDone = false

function setSyncState(next: SyncState) {
  syncState = next
  notify()
}

export function getSyncKey(): string {
  if (!isBrowser()) return ''
  return window.localStorage.getItem(SYNC_KEY_STORAGE) ?? ''
}

export function setSyncKey(key: string) {
  if (!isBrowser()) return
  const trimmed = key.trim()
  if (trimmed) window.localStorage.setItem(SYNC_KEY_STORAGE, trimmed)
  else window.localStorage.removeItem(SYNC_KEY_STORAGE)
  setSyncState('idle')
}

// Union merge — never lose data when both sides diverged.
export function mergeUserData(a: UserData, b: UserData): UserData {
  // progress: union, prefer 'solved' over 'attempted'.
  const progress: Record<string, ProgressStatus> = { ...a.progress }
  for (const [slug, status] of Object.entries(b.progress)) {
    if (progress[slug] === 'solved' || status === 'solved') progress[slug] = 'solved'
    else progress[slug] = status
  }

  // submissions: concat + dedupe by (slug, createdAt), newest first.
  const seen = new Set<string>()
  const submissions = [...a.submissions, ...b.submissions]
    .filter((s) => {
      const key = `${s.slug}|${s.createdAt}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((x, y) => (x.createdAt < y.createdAt ? 1 : -1))

  // quizzes: per-id union of answers.
  const quizzes: Record<string, QuizProgress> = {}
  for (const id of new Set([...Object.keys(a.quizzes), ...Object.keys(b.quizzes)])) {
    quizzes[id] = {
      answers: { ...(b.quizzes[id]?.answers ?? {}), ...(a.quizzes[id]?.answers ?? {}) },
    }
  }

  const newer = (a.updatedAt || '') >= (b.updatedAt || '') ? a : b
  return {
    username: a.username || b.username,
    progress,
    submissions,
    quizzes,
    updatedAt: newer.updatedAt || new Date().toISOString(),
  }
}

async function pull(): Promise<'ok' | 'disabled' | 'error'> {
  const key = getSyncKey()
  if (!key) return 'disabled'
  try {
    const res = await fetch('/api/state', {
      method: 'GET',
      headers: { 'x-sync-secret': key },
      cache: 'no-store',
    })
    if (res.status === 501) return 'disabled'
    if (!res.ok) return 'error'
    const remote = normalize(await res.json())
    ensureLoaded()
    persist(mergeUserData(snapshot, remote))
    return 'ok'
  } catch {
    return 'error'
  }
}

async function push(): Promise<'ok' | 'disabled' | 'error'> {
  const key = getSyncKey()
  if (!key) return 'disabled'
  try {
    ensureLoaded()
    const res = await fetch('/api/state', {
      method: 'PUT',
      headers: { 'content-type': 'application/json', 'x-sync-secret': key },
      body: JSON.stringify(snapshot),
    })
    if (res.status === 501) return 'disabled'
    if (!res.ok) return 'error'
    return 'ok'
  } catch {
    return 'error'
  }
}

function schedulePush() {
  if (!isBrowser() || !getSyncKey()) return
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    pushTimer = null
    void push().then((r) => {
      if (r === 'ok') {
        lastSyncedAt = new Date().toISOString()
        setSyncState('synced')
      } else if (r === 'error') {
        setSyncState('error')
      }
    })
  }, 1500)
}

async function maybeInitialSync() {
  if (initialSyncDone || !isBrowser() || !getSyncKey()) return
  initialSyncDone = true
  await syncNow()
}

// Manual full sync: pull (merge) then push the merged result.
export async function syncNow(): Promise<SyncState> {
  if (!getSyncKey()) {
    setSyncState('disabled')
    return 'disabled'
  }
  setSyncState('syncing')
  const pulled = await pull()
  if (pulled === 'disabled') {
    setSyncState('disabled')
    return 'disabled'
  }
  if (pulled === 'error') {
    setSyncState('error')
    return 'error'
  }
  const pushed = await push()
  if (pushed === 'ok') {
    lastSyncedAt = new Date().toISOString()
    setSyncState('synced')
    return 'synced'
  }
  setSyncState(pushed === 'disabled' ? 'disabled' : 'error')
  return pushed === 'disabled' ? 'disabled' : 'error'
}

// ---- React hook ----

export function useUserStore() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hydrated = loaded
  return {
    data: store.data,
    hydrated,
    setUsername,
    markSolved,
    markAttempted,
    addSubmission,
    setQuizAnswer,
    resetQuiz,
    resetData,
    exportJson,
    importJson,
    // sync
    syncState: store.syncState,
    lastSyncedAt: store.lastSyncedAt,
    getSyncKey,
    setSyncKey,
    syncNow,
  }
}
