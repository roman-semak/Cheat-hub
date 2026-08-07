'use client'

import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'cheatHubUser'

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
  }
}

function persist(next: UserData) {
  snapshot = next
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }
  listeners.forEach((l) => l())
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

function getServerSnapshot(): UserData {
  return emptyData()
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
}

// ---- React hook ----

export function useUserStore() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hydrated = loaded
  return {
    data,
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
  }
}
