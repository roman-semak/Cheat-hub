# Cheat Hub

## Overview
Cheat Hub — платформа для підготовки до співбесід: LeetCode-подібний редактор коду
для вирішення задач на JavaScript/TypeScript (Monaco Editor, запуск тестів,
результати) плюс багатотемний хаб шпаргалок і теорії. Раніше проект називався
«LeetCode Local Platform».

**Статус:** ✅ MVP готовий до використання

## Tech Stack
- **Frontend:** Next.js 16 (Turbopack) + TypeScript + React 19
- **Styling:** Tailwind CSS v3 + Liquid Glass (custom design system)
- **UI Components:** Custom Badge, Button + Glass components
- **Code Editor:** Monaco Editor (@monaco-editor/react)
- **Database:** SQLite via Prisma ORM
- **Code Execution:** Node.js child_process via API route
- **Font:** Inter + JetBrains Mono (Google Fonts)

## Project Structure

```
/cheat-hub
├── prisma/
│   ├── schema.prisma          # Prisma schema (Problem, Submission, Progress)
│   ├── seed.ts                # Seed script з 3 приклад-задачами
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage - список задач
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Tailwind + Liquid Glass styles
│   │   ├── problems/[slug]/
│   │   │   └── page.tsx       # Problem detail page
│   │   └── api/
│   │       └── run/route.ts   # Code executor API endpoint
│   ├── components/
│   │   ├── glass/             # Liquid Glass components
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GlassPanel.tsx
│   │   │   └── GlassNavbar.tsx
│   │   ├── ui/                # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   └── Badge.tsx
│   │   ├── editor/
│   │   │   ├── CodeEditor.tsx # Monaco editor wrapper
│   │   │   └── TestResults.tsx
│   │   └── problems/
│   │       ├── ProblemList.tsx
│   │       └── ProblemDescription.tsx
│   └── lib/
│       ├── db.ts              # Prisma client singleton
│       ├── runner.ts          # Code execution logic
│       └── utils.ts           # cn() utility
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Key Features

### 1. Problem List Page (`/`)
- Список всіх задач з складністю (Easy/Medium/Hard)
- Компоненти: GlassNavbar + ProblemList
- Server-side fetch з Prisma

### 2. Problem Detail Page (`/problems/[slug]`)
- Split layout: опис ліворуч, редактор праворуч
- **ProblemDescription:** заголовок, теги, компанії, опис, editorial, solution
- **CodeEditor:** Monaco Editor + мова вибір (JS/TS)
- TestResults: display результатів з color-coding

### 3. Code Runner API (`POST /api/run`)
```
Request:
{
  "code": "var twoSum = function(...) { ... }",
  "language": "javascript",
  "testCases": [
    {"input": "[[2,7,11,15], 9]", "expected": "[0,1]"}
  ]
}

Response:
{
  "results": [
    {"passed": true, "input": "...", "expected": "...", "actual": "..."}
  ]
}
```

### 4. Database Schema
```sql
Problem {
  id, slug, title, difficulty, description,
  tags (JSON), companies (JSON),
  starterCode, testCases (JSON),
  solution?, editorial?
}

Submission {
  id, problemId, code, language, status, runtime, createdAt
}

Progress {
  problemId, status, updatedAt
}
```

## Design System: Liquid Glass

**Color Palette:**
- Background: `bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950`
- Text: `text-slate-100` (foreground)
- Accent: `indigo-400` to `cyan-400` (gradient)
- Glass: `rgba(255,255,255,0.08)` + `backdrop-blur-2xl`

**Components:**
- `.glass` - світлий glass ефект
- `.glass-dark` - темний glass ефект  
- `.glass-subtle` - delicate variant
- `.glass-light` - alias для `.glass`

## Running

```bash
# Development server
npm run dev                    # http://localhost:5001

# Database
npx prisma migrate dev         # Migrate schema
npx tsx prisma/seed.ts         # Seed with sample problems
npx prisma studio             # Prisma UI

# Build
npm run build
npm start
```

## Sample Problems (Seeded)
1. **Two Sum** (Easy) - Array, Hash Table
2. **Reverse String** (Easy) - String, Two Pointers
3. **Contains Duplicate** (Easy) - Array, Hash Table

Кожна задача має: опис, приклади, обмеження, editorial, solution, test cases.

## API Testing

```bash
# Test code runner
curl -X POST http://localhost:5001/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "var twoSum = function(nums, target) { ... }",
    "language": "javascript",
    "testCases": [{"input": "[[2,7,11,15], 9]", "expected": "[0,1]"}]
  }'
```

## Development Notes

### Problem data pipeline (DB-less)

The app reads problems from the static module `src/data/problems.ts`, **not** the
DB. That file is AUTO-GENERATED — do not hand-edit it. Pipeline:

1. `scripts/import-leetcode.ts` — pulls problem metadata + JS starter code from
   LeetCode into `prisma/dev.db` (needs `LEETCODE_SESSION`). Never writes
   `testCases` (LeetCode's API has no expected outputs).
2. `scripts/export-problems.ts` — dumps `prisma/dev.db` → `src/data/problems.ts`.
3. `npm run merge:leetcode` (`scripts/merge-leetcode-catalog.ts`) — folds in the
   NeetCode-250 `approach` write-ups, the `src/data/approaches.json` sidecar
   (see below), **and** `testCases` from `src/data/testcases.generated.json`.
   **Always run this after step 2.**

### Popup solutions — `src/data/approaches.json` (source of truth)

Fills the "Solution" popup (`approach` = UA hint + `**Складність:**` line, and
`solution` = reference code) for problems the NeetCode-250 catalog does not
cover. Keyed by slug; committed; the catalog wins on conflicts.

- `npm run gen:solutions` (`scripts/generate-solutions.ts`) — pulls the doocs
  reference `solution` (original TS, verified to parse) for every problem
  lacking one. Resumable; `-- --report` prints coverage, `-- --only=` / `--force`
  / `--limit=` scope a subset. Falls back to a LeetCode query for the
  `frontendId` when `problems.ts` has none.
- `hint` + `complexity` are **hand-authored** (Ukrainian, style like the Two Sum
  catalog entry) directly into the JSON — `gen:solutions` never touches them.
- `npm run verify:approaches` (`scripts/verify-approaches.ts`) — runs every
  sidecar `solution` through `src/lib/runner.ts` against
  `testcases.generated.json`; non-zero exit on any FAIL. Run after editing.

Entry shape: `{ hint?, complexity?, solution?, solutionSource?: "doocs"|"authored" }`.
The shared doocs fetcher lives in `scripts/lib/doocs.ts`
(used by `gen:testcases` too).

### Test cases — `src/data/testcases.generated.json` (source of truth)

Generated by `npm run gen:testcases` (`scripts/generate-testcases.ts`):
inputs come from LeetCode `exampleTestcases`; expected outputs are produced by
running the doocs/leetcode reference solution through the app's `vm` executor
(`src/lib/runner.ts`). Keyed by slug; resumable; `-- --report` prints coverage,
`-- --only=slug1,slug2` / `-- --force` re-run a subset.

Format per case:
- `input` — a **JSON array of the positional arguments**, e.g. `"[[2,7,11,15],9]"`,
  `"[[1,2,3,0,0,0],3,[2,5,6],3]"`, `"[\"()[]{}\"]"`.
- `expected` — JSON of the return value, e.g. `"[0,1]"`. For in-place problems
  that return `void` (`merge`, `reverseString`, …) it is the JSON of the
  **mutated first argument**. `ListNode`/`TreeNode` values are array-serialised.

The runner always calls `fn(...JSON.parse(input))`. Problems with an empty
`testCases` array (`design`/`no-solution`/`parse-failed` in the sidecar) render a
"no tests yet" note instead of Run/Submit — see `hasRealTestCases` in
`src/lib/runner.ts` and `hasTests` in `page.tsx` / `CodeEditor.tsx`.

Known limitation: comparison is exact-string, so problems with multiple valid
answers (e.g. `3sum` ordering) are judged against the reference solution's order.

### Monaco Editor Configuration
Located: `src/components/editor/CodeEditor.tsx`
- Theme: `vs-dark`
- Languages: JavaScript, TypeScript
- Options: fontSize 13, minimap disabled, padding

### Cheatsheet content: status marker (new / unread / read)
Each trackable content unit (prose `TopicSection`, LeetCode section/task,
`PracticeTask`, `Lifehack`, quickref block) carries one 3-state marker
(`StatusMarker`, driven by `useContentStatus`): 🔴 new → ○ unread → ✓ read.
After adding/renaming a unit, run `npm run stamp:new` to record its first-seen
date in `src/lib/cheatsheet/contentManifest.generated.json` and commit it —
units dated on/after `newSince` that the user hasn't dismissed show 🔴
(`--check` fails the build if the manifest is stale). "new" clears only on
click (scroll auto-read skips new sections); `read`/`seen` state lives in
`UserData.readState` / `UserData.seenNew` (localStorage + `/api/sync`).

## Known Limitations

1. **Code Runner** - виконується локально на Node.js, не є sandboxed (для продакшну потрібен Judge0 або аналог)
2. **Monaco Editor** - client-side component, потребує браузера (SSR обмежений)
3. **Test Input Format** - потребує валідного JSON (помилка парсингу = FAIL)
4. **Performance** - 5 сек timeout на код выконання

## Future Enhancements

- [ ] Import problems з публічного датасету (LeetCode JSON dataset)
- [ ] Progress tracking (solved/attempted/todo)
- [ ] User sessions & submissions history
- [ ] Difficulty filter & search
- [ ] Company tag filtering
- [ ] Discussion/Comments section
- [ ] Timer & interview mode
- [ ] Leaderboard
- [ ] Custom problem creation UI

## File Ownership
- **Frontend:** `src/app`, `src/components`
- **Backend:** `src/lib/db.ts`, `src/app/api`, `prisma/`
- **Styling:** `src/app/globals.css`, `tailwind.config.js`
- **Design System:** `src/components/glass/`

## Debugging

```bash
# View database
npx prisma studio

# Check migrations
ls -la prisma/migrations/

# View server logs
tail -f /tmp/dev.log

# Clear Node modules if needed
rm -rf node_modules package-lock.json && npm install --legacy-peer-deps
```

---

**Created:** May 22, 2026  
**Last Updated:** August 31, 2026  
**Platform:** macOS, Node 24.16.0, npm 11.13.0
