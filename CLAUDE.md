# LeetCode Local Platform

## Overview
Local LeetCode-like platform для вирішення задач на JavaScript/TypeScript. Платформа дозволяє користувачам переглядати задачі, писати код в Monaco Editor, запускати тести й отримувати результати.

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
/leetCode
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

### Adding New Problems
Edit `prisma/seed.ts`, додати в `sampleProblems` array:
```typescript
{
  slug: 'unique-slug',
  title: 'Problem Title',
  difficulty: 'Easy|Medium|Hard',
  description: '...',
  tags: JSON.stringify([...]),
  companies: JSON.stringify([...]),
  starterCode: '...',
  testCases: JSON.stringify([{input, expected}]),
  solution: '...',
  editorial: '...'
}
```

Потім: `npx tsx prisma/seed.ts`

### Test Case Format
- `input` - JSON string (e.g., `"[[2,7,11,15], 9]"`)
- `expected` - JSON string (e.g., `"[0,1]"`)

Wrapper автоматично парсить JSON і вивільює результат.

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
**Last Updated:** June 17, 2026  
**Platform:** macOS, Node 24.16.0, npm 11.13.0
