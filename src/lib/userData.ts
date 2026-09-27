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

// Cheatsheet subsection read state, keyed by `${topicSlug}:${sectionId}`.
//   absent   — unread (grey ○)
//   'read'   — scrolled through or manually confirmed (green ✓)
//   'review' — the user flagged it to come back to (red ●)
// These three drive the marker; the user owns all of them (StatusMarker).
export type ReadState = 'read' | 'review'

export interface UserData {
  username: string
  progress: Record<string, ProgressStatus>
  submissions: SubmissionRecord[]
  quizzes: Record<string, QuizProgress>
  readState: Record<string, ReadState>
  // LEGACY: dismissals for the old platform-driven "new content" marker.
  // Nothing reads this any more — red now means the user's own "review" flag
  // (see ReadState). Kept so existing local/synced blobs round-trip unchanged.
  seenNew: Record<string, true>
  updatedAt: string
}

export function emptyData(): UserData {
  return {
    username: '',
    progress: {},
    submissions: [],
    quizzes: {},
    readState: {},
    seenNew: {},
    updatedAt: '',
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

function normalizeReadState(value: unknown): Record<string, ReadState> {
  if (!value || typeof value !== 'object') return {}
  const out: Record<string, ReadState> = {}
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (v === 'read' || v === 'review') out[key] = v
  }
  return out
}

function normalizeSeenNew(value: unknown): Record<string, true> {
  if (!value || typeof value !== 'object') return {}
  const out: Record<string, true> = {}
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (v === true) out[key] = true
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
    readState: normalizeReadState(v.readState),
    seenNew: normalizeSeenNew(v.seenNew),
    updatedAt: typeof v.updatedAt === 'string' ? v.updatedAt : '',
  }
}
