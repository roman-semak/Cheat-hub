export type ProgressStatus = 'solved' | 'attempted'

export interface SubmissionRecord {
  slug: string
  code: string
  language: string
  status: 'Accepted' | 'Wrong Answer'
  runtime?: number
  createdAt: string
}

// The reader's own accepted solution for one problem, kept separately from the
// `submissions` history: history is capped (see addSubmission), and a cap must
// never be able to evict the one thing the reader asked us to keep.
export interface SavedSolution {
  code: string
  language: string
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
  // Latest accepted solution per problem slug. One entry per solved problem,
  // so this is bounded by the problem count and never trimmed.
  solutions: Record<string, SavedSolution>
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
    solutions: {},
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

function normalizeSolutions(value: unknown): Record<string, SavedSolution> {
  if (!value || typeof value !== 'object') return {}
  const out: Record<string, SavedSolution> = {}
  for (const [slug, v] of Object.entries(value as Record<string, unknown>)) {
    const s = v as Partial<SavedSolution>
    if (s && typeof s.code === 'string' && typeof s.language === 'string') {
      out[slug] = { code: s.code, language: s.language, createdAt: s.createdAt ?? '' }
    }
  }
  return out
}

// One-time backfill for blobs written before `solutions` existed: the accepted
// code is already sitting in the submission history, so lift the newest one per
// slug across. Runs only while `solutions` is empty, and must happen BEFORE
// addSubmission's cap can trim that history away.
function backfillSolutions(submissions: SubmissionRecord[]): Record<string, SavedSolution> {
  const out: Record<string, SavedSolution> = {}
  // `submissions` is newest-first, so the first hit per slug is the latest.
  for (const s of submissions) {
    if (s?.status !== 'Accepted' || typeof s.code !== 'string') continue
    if (out[s.slug]) continue
    out[s.slug] = { code: s.code, language: s.language ?? 'javascript', createdAt: s.createdAt ?? '' }
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
  const submissions = Array.isArray(v.submissions) ? v.submissions : []
  const solutions = normalizeSolutions(v.solutions)
  return {
    username: typeof v.username === 'string' ? v.username : '',
    progress:
      v.progress && typeof v.progress === 'object'
        ? (v.progress as Record<string, ProgressStatus>)
        : {},
    submissions,
    // Only for blobs written before `solutions` existed. Keyed on the field
    // being absent, not empty, so a legitimately empty map is never re-filled
    // from history — which also keeps a future clearSolution() from being
    // undone on the next reload.
    solutions: v.solutions === undefined ? backfillSolutions(submissions) : solutions,
    quizzes: normalizeQuizzes(v.quizzes),
    readState: normalizeReadState(v.readState),
    seenNew: normalizeSeenNew(v.seenNew),
    updatedAt: typeof v.updatedAt === 'string' ? v.updatedAt : '',
  }
}
