const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '../..')
const LC = path.join(ROOT, 'CheetSheet/leetcode')
const indexHtml = fs.readFileSync(path.join(LC, 'index.html'), 'utf8')
const cheatHtml = fs.readFileSync(path.join(LC, 'cheatsheet.html'), 'utf8')
const dbProblems = JSON.parse(fs.readFileSync('/tmp/db-problems.json', 'utf8'))

// Ordered sections (id + emoji) taken from index.html topics-panel.
const SECTION_ORDER = [
  ['arrays-hashing', '1️⃣', 'Arrays & Hashing'],
  ['two-pointers', '2️⃣', 'Two Pointers'],
  ['sliding-window', '3️⃣', 'Sliding Window'],
  ['stack', '4️⃣', 'Stack'],
  ['binary-search', '5️⃣', 'Binary Search'],
  ['linked-list', '6️⃣', 'Linked List'],
  ['trees', '7️⃣', 'Trees'],
  ['tries', '8️⃣', 'Tries'],
  ['heap', '9️⃣', 'Heap / Priority Queue'],
  ['backtracking', '🔟', 'Backtracking'],
  ['graphs', '1️⃣1️⃣', 'Graphs'],
  ['advanced-graphs', '1️⃣2️⃣', 'Advanced Graphs'],
  ['dp-1d', '1️⃣3️⃣', '1-D DP'],
  ['dp-2d', '1️⃣4️⃣', '2-D DP'],
  ['greedy', '1️⃣5️⃣', 'Greedy'],
  ['intervals', '1️⃣6️⃣', 'Intervals'],
  ['math-geometry', '1️⃣7️⃣', 'Math & Geometry'],
  ['bit-manipulation', '1️⃣8️⃣', 'Bit Manipulation'],
]

function decode(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

function stripTags(s) {
  return decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
}

function norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// --- DB matching ---
const slugSet = new Set(dbProblems.map((p) => p.slug))
const titleMap = new Map()
for (const p of dbProblems) titleMap.set(norm(p.title), p.slug)

function practiceSlug(name) {
  const n = norm(name)
  if (titleMap.has(n)) return titleMap.get(n)
  // try a slug guess: kebab of name
  const guess = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  if (slugSet.has(guess)) return guess
  return undefined
}

const DIFF_MAP = { e: 'Easy', m: 'Medium', h: 'Hard', easy: 'Easy', medium: 'Medium', hard: 'Hard' }

// --- Parse index.html full cards: map "<number>" -> {desc, hint, complexity, code} ---
const fullCards = new Map()
{
  const cardRe = /<div class="task-card">([\s\S]*?)<\/div>\s*<\/div>/g
  // Each task-card ends with </details></div> ; simpler: split by '<div class="task-card">'
  const parts = indexHtml.split('<div class="task-card">').slice(1)
  for (const part of parts) {
    const titleM = part.match(/<span class="task-title">([^<]*)<\/span>/)
    if (!titleM) continue
    const rawTitle = stripTags(titleM[1])
    const numM = rawTitle.match(/#(\d+)/)
    const number = numM ? parseInt(numM[1], 10) : null
    const descM = part.match(/<p class="task-desc">([\s\S]*?)<\/p>/)
    const hintM = part.match(/<div class="hint-box">([\s\S]*?)<\/div>/)
    const sumM = part.match(/<summary>([\s\S]*?)<\/summary>/)
    const codeM = part.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/)
    const complexity = sumM ? stripTags(sumM[1]).replace(/^TypeScript\s*[—-]\s*/, '') : undefined
    const entry = {
      desc: descM ? stripTags(descM[1]).replace(/^💡\s*/, '') : undefined,
      hint: hintM ? stripTags(hintM[1]).replace(/^💡\s*/, '') : undefined,
      complexity,
      code: codeM ? decode(codeM[1]).trim() : undefined,
    }
    if (number != null) fullCards.set(number, entry)
  }
}

// --- Parse cheatsheet.html sections ---
const sections = []
{
  const sectionParts = cheatHtml.split('<div class="cheat-section">').slice(1)
  sectionParts.forEach((part, i) => {
    const order = SECTION_ORDER[i]
    if (!order) return
    const [id, emoji, titleClean] = order
    const h2M = part.match(/<h2>([\s\S]*?)<\/h2>/)
    const h2 = h2M ? stripTags(h2M[1]) : ''
    const countM = h2.match(/\((\d+)\)/)
    const count = countM ? parseInt(countM[1], 10) : undefined

    const tasks = []
    const taskParts = part.split('<div class="cheat-task">').slice(1)
    for (const tp of taskParts) {
      const numM = tp.match(/<span class="task-num">([^<]*)<\/span>/)
      const nameM = tp.match(/<span class="task-name">([^<]*)<\/span>/)
      const diffM = tp.match(/<span class="task-diff diff-([emh])">/)
      const hintM = tp.match(/<div class="task-hint">([\s\S]*?)<\/div>/)
      if (!nameM) continue
      const name = stripTags(nameM[1])
      const numRaw = numM ? stripTags(numM[0]) : ''
      const number = numRaw ? parseInt(numRaw.replace(/[^\d]/g, ''), 10) : 0
      const difficulty = diffM ? DIFF_MAP[diffM[1]] : 'Easy'
      const hint = hintM ? stripTags(hintM[1]) : undefined
      const full = number ? fullCards.get(number) : undefined
      const task = {
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `t-${number}`,
        number: number || 0,
        title: name,
        difficulty,
        hint: (full && full.hint) || hint,
        description: full ? full.desc : undefined,
        complexity: full ? full.complexity : undefined,
        code: full ? full.code : undefined,
        practiceSlug: practiceSlug(name),
      }
      // prune undefined
      Object.keys(task).forEach((k) => task[k] === undefined && delete task[k])
      tasks.push(task)
    }

    sections.push({ id, index: i + 1, emoji, title: titleClean, count, tasks })
  })
}

// --- Emit TS ---
const header = `// AUTO-GENERATED from CheetSheet/leetcode/{index,cheatsheet}.html.
// Hand-edit with care — re-running the parser script will overwrite this file.
import type { LeetcodeData } from './types'

export const leetcodeData: LeetcodeData = `

const out = header + JSON.stringify({ sections }, null, 2) + '\n'
fs.writeFileSync(path.join(ROOT, 'src/lib/cheatsheet/leetcode.ts'), out)

const totalTasks = sections.reduce((a, s) => a + s.tasks.length, 0)
const withCode = sections.reduce((a, s) => a + s.tasks.filter((t) => t.code).length, 0)
const withSlug = sections.reduce((a, s) => a + s.tasks.filter((t) => t.practiceSlug).length, 0)
console.log(`sections=${sections.length} tasks=${totalTasks} withCode=${withCode} withPracticeSlug=${withSlug}`)
console.log(sections.map((s) => `${s.title}: ${s.tasks.length}`).join('\n'))
