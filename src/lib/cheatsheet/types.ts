// Shared types for the cheat-sheet content layer.
// Content from the original static CheetSheet project is represented as typed
// data modules (see leetcode.ts, react.ts, ...) and rendered by generic
// React components under src/components/cheatsheet/.

export type TopicSlug =
  | 'architecture'
  | 'react'
  | 'react-native'
  | 'nextjs'
  | 'angular'
  | 'javascript'
  | 'git'
  | 'ai'
  | 'leetcode'
  | 'ide'
  | 'algorithms'
  | 'fullstack'
  | 'quickref'

export type TopicFormat = 'extended' | 'cheatsheet' | 'quiz' | 'practice' | 'tasks' | 'links'

export type Accent =
  | 'indigo'
  | 'cyan'
  | 'violet'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'orange'
  | 'sky'
  | 'teal'
  | 'fuchsia'
  | 'slate'
  | 'pink'
  | 'blue'

export interface TopicMeta {
  slug: TopicSlug
  title: string
  icon: string // emoji
  blurb: string // short description for the hub card
  accent: Accent
  formats: TopicFormat[]
  badges?: string[] // small tags on the hub card
}

/* ---------- LeetCode (structured) ---------- */

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface TaskCard {
  id: string // stable key, e.g. "contains-duplicate"
  number: number // LeetCode problem number (#217)
  title: string // "Contains Duplicate"
  difficulty: Difficulty
  description?: string // task description (may contain inline code)
  hint?: string // approach / hint box
  complexity?: string // "Time O(n), Space O(n)"
  code?: string // TypeScript solution (raw)
  language?: string // defaults to 'typescript'
  practiceSlug?: string // -> /problems/{slug} when a DB problem exists
  placeholder?: boolean // true for "see Notion" stubs without full content
}

export interface Section {
  id: string // anchor + scroll-spy target, e.g. "arrays-hashing"
  index: number // 1..18
  emoji: string
  title: string // "Arrays & Hashing"
  count?: number // declared problem count
  tasks: TaskCard[]
}

export interface LeetcodeData {
  sections: Section[]
}

/* ---------- Practice tasks (interview-style exercises) ---------- */

export type PracticeLevel = 'Middle' | 'Senior'
export type PracticeTopic =
  | 'JS Utilities'
  | 'Arrays & Strings'
  | 'Async'
  | 'React Components'
  | 'React Hooks'
  | 'React Debugging'
  | 'DOM'
  | 'System Design'
  | 'RxJS'
  | 'Angular'
  | 'React Native'

// 'discussion' cards hide the code editor and render `solution` as HTML prose
// (system-design style questions — the "answer" is talking points, not code).
export type PracticeFormat = 'code' | 'discussion'

// Mirrors the 🔴/🟡/🟢 priority markers from the interview-prep checklist.
export type PracticePriority = 'high' | 'mid' | 'low'

export interface PracticeTask {
  id: string // stable key, e.g. 'promise-to-observable'
  title: string // 'Promise → Observable'
  level: PracticeLevel
  topic: PracticeTopic // used for grouping / filtering
  format?: PracticeFormat // defaults to 'code'
  priority?: PracticePriority // shown as a coloured dot in the master list
  tags?: string[] // ['switchMap', 'catchError'] — used for search
  prompt: string // task description (HTML, rendered via .cheat-prose)
  starterCode?: string // code shown in the editor (contains // TODO); omitted for 'discussion'
  solution: string // reference solution (code, or HTML prose for 'discussion')
  explanation?: string // approach / why (HTML)
  language?: string // defaults to 'typescript'
}

/* ---------- Lifehacks (LeetCode cheatsheet) ---------- */

export interface LifehackCategory {
  id: string // 'strings', 'arrays', ...
  title: string // 'Рядки'
  emoji?: string
}

export interface Lifehack {
  id: string // stable key, e.g. 'last-char-slice'
  title: string // 'Останній символ рядка'
  category: string // id from LifehackCategory
  code: string // "str.slice(-1)"
  language?: string // defaults to 'typescript'
  note?: string // short explanation (may contain inline <code>)
  tags?: string[] // ['slice', 'string'] — used for search
}

/* ---------- Prose topics (block model) ---------- */

export type BlockTag = 'KEY' | 'NEW' | 'TIP'
export type NoteTone = 'info' | 'good' | 'bad' | 'warn'

export interface FlashcardItem {
  question: string // may contain inline <code>
  answer: string // may contain inline <code>
}

export type ContentBlock =
  | { kind: 'heading'; level: 2 | 3; text: string; tag?: BlockTag }
  | { kind: 'paragraph'; html: string }
  | { kind: 'code'; language: string; code: string; caption?: string }
  | { kind: 'mermaid'; code: string; caption?: string } // Mermaid diagram source, rendered client-side
  | { kind: 'note'; tone: NoteTone; title?: string; html: string }
  | { kind: 'grid'; columns: 2 | 3; items: ContentBlock[] }
  | { kind: 'versionRow'; badges: { label: string; tone?: string }[] }
  | {
      kind: 'changelog'
      phase: 'past' | 'future'
      title: string
      rows: { version: string; text: string }[]
    }
  | {
      kind: 'links'
      title?: string
      items: { href: string; title: string; description: string }[]
    }
  | { kind: 'flashcards'; items: FlashcardItem[] }

export interface TopicSection {
  id: string // anchor / scroll-spy target
  title: string
  emoji?: string
  blocks: ContentBlock[]
  interviewQuestions?: FlashcardItem[] // senior-frontend Q&A shown in the end-of-section popup
}

export interface TopicContent {
  slug: TopicSlug
  intro?: ContentBlock[]
  sections: TopicSection[]
}

/* ---------- Quick reference (dense cross-topic grid) ---------- */

export interface QuickRefEntry {
  term: string
  desc?: string // HTML string (dangerouslySetInnerHTML), may contain inline <b>/<code>
  chips?: string[] // small pill badges right after the term, e.g. call signature or timing
}

export interface QuickRefGroup {
  label?: string // small uppercase label above a group, e.g. "Hooks"
  icon?: string // emoji shown in the compact section-nav row
  entries: QuickRefEntry[]
}

export interface QuickRefChipRow {
  label?: string // small uppercase label above the chip row, e.g. "Map"
  icon?: string // emoji shown in the compact section-nav row
  chips: string[] // rendered as pill chips, may contain inline <b>/<code>
}

export interface QuickRefLifecyclePhase {
  phase: string // 'Mount'
  desc: string // 'Перший рендер в DOM'
  hooks: string[] // ['useState(init)', 'useEffect(fn, [])']
  classic: string // '= componentDidMount'
  accentHex: string
}

export interface QuickRefLifecycleBlock {
  label?: string
  icon?: string // emoji shown in the compact section-nav row
  phases: QuickRefLifecyclePhase[]
}

export interface QuickRefHookRow {
  hook: string
  when: string // lifecycle state(s) it fires in, e.g. 'Mount + Update'
  why: string
  example: string // short usage code snippet, shown in a popup
  exampleLanguage?: string // defaults to 'tsx'
}

export interface QuickRefHooksCatalogBlock {
  label?: string
  icon?: string // emoji shown in the compact section-nav row
  hooks: QuickRefHookRow[]
}

export type QuickRefBlock =
  | QuickRefGroup
  | QuickRefChipRow
  | QuickRefLifecycleBlock
  | QuickRefHooksCatalogBlock

export interface QuickRefColumn {
  id: string
  title: string
  accentHex: string // muted custom color, independent of the app's ACCENT palette
  blocks: QuickRefBlock[]
}

export interface QuickRefContent {
  title: string
  subtitle?: string
  columns: QuickRefColumn[]
}

/* ---------- Quiz ---------- */

export interface QuizQuestion {
  id: string
  question: string // may contain inline <code>
  options: string[]
  correct: number // index into options
  explanation: string // HTML
}

export interface QuizData {
  title: string
  questions: QuizQuestion[]
}
