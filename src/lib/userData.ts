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

// Cheatsheet subsection read state. 'read' = scrolled through or manually
// confirmed; absent = unread. Keyed by `${topicSlug}:${sectionId}`.
// Combined with `seenNew` this drives the 3-state marker: new → unread → read.
// (The legacy 'review' value is migrated to 'read' on load — see normalizeReadState.)
export type ReadState = 'read'

export interface UserData {
  username: string
  progress: Record<string, ProgressStatus>
  submissions: SubmissionRecord[]
  quizzes: Record<string, QuizProgress>
  readState: Record<string, ReadState>
  // Set of "new content" keys the user has dismissed (the red • marker).
  // Keyed the same way as `readState` for prose sections; namespaced
  // (`practice:`, `leetcode:`, `lifehack:`, `quickref:`) for other surfaces.
  // Presence = "I've seen this"; absence + a recent manifest date = still new.
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
    // 'review' is legacy — fold it into 'read' (the user had already read it).
    if (v === 'read' || v === 'review') out[key] = 'read'
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
