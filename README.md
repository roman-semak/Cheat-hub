# Cheat Hub

> An interview-prep playground that pairs a LeetCode-style in-browser code editor with a multi-topic cheatsheet hub — all wrapped in a custom "Liquid Glass" UI.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)](https://cheat-hub.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

**🔗 Live demo:** [cheat-hub.vercel.app](https://cheat-hub.vercel.app)

---

## Overview

**Cheat Hub** is a full-stack [Next.js](https://nextjs.org/) (App Router) application for
software-interview preparation. It has two complementary pillars:

1. **Code Practice** — solve LeetCode-style problems in a Monaco editor, run your solution
   against test cases, and track progress — entirely in the browser.
2. **Cheatsheet Hub** — browse curated, structured notes across 8 engineering topics, with
   extended deep-dives, quick-reference cheatsheets, and interactive quizzes.

It's aimed at developers prepping for JavaScript/TypeScript interviews who want both *active
recall* (solving problems) and *passive review* (cheatsheets) in one place. The project also
doubles as a portfolio piece showcasing a modern Next.js + React 19 stack and a bespoke
glassmorphism design system.

> ℹ️ The project was previously called "LeetCode Local Platform". Some internal docs and
> historical task notes still use the old name; this README and [CLAUDE.md](CLAUDE.md)
> reflect the current Cheat Hub identity.

---

## Features

### 🧩 Code Practice
- **Monaco editor** with JavaScript/TypeScript support and a language switcher
  ([CodeEditor.tsx](src/components/editor/CodeEditor.tsx)).
- **Run** (test without saving) and **Submit** (persist to browser) against per-problem test cases.
- **Sandboxed runner** — code is transpiled with `sucrase` and executed in a Node `vm`
  context with a 5-second timeout ([api/run/route.ts](src/app/api/run/route.ts),
  [runner.ts](src/lib/runner.ts)).
- **Color-coded test results** ([TestResults.tsx](src/components/editor/TestResults.tsx)).
- **Split layout** problem page: description (with Editorial/Solution dialogs) beside the editor
  ([problems/[slug]/page.tsx](src/app/problems/%5Bslug%5D/page.tsx)).

### 📚 Cheatsheet Hub
- **8 topics** driven by a central registry
  ([registry.ts](src/lib/cheatsheet/registry.ts)): LeetCode, Architecture, React, Angular,
  JavaScript/TypeScript, Git, AI, IDE.
- **Multiple formats per topic:** `extended` deep-dive (`/{topic}`), quick `cheatsheet`
  (`/{topic}/cheatsheet`), and `quiz` (`/{topic}/quiz`, for Angular & JavaScript).
- **JS/TS lifehacks** view with live search over snippets
  ([LifehacksView.tsx](src/components/cheatsheet/LifehacksView.tsx)).
- **Scroll-spy navigation** for long content with a sticky topic sidebar
  ([useScrollSpy.ts](src/lib/cheatsheet/useScrollSpy.ts)).

### ✨ Platform
- **Liquid Glass design system** — dark slate→indigo gradient, frosted-glass cards/panels, and
  per-topic accent colors ([src/components/glass/](src/components/glass/), [globals.css](src/app/globals.css)).
- **Browser-side progress** — solved/attempted status and submissions stored in `localStorage`
  via `useSyncExternalStore`, synced across tabs ([userStore.ts](src/lib/userStore.ts)).
- **DB-less on Vercel** — problems are served from static data so the app runs without a
  database in production ([problems.ts](src/data/problems.ts)).
- **SEO & PWA ready** — `robots.ts`, `sitemap.ts`, `manifest.ts`, and dynamic OpenGraph images.

---

## Tech stack

| Area | Technologies |
| --- | --- |
| **Framework** | Next.js 14 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 3, `tailwindcss-animate`, `class-variance-authority`, custom Liquid Glass CSS |
| **Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Code execution** | `sucrase` (TS→JS transpile), Node `vm` (sandbox) |
| **Data / ORM** | Prisma 5, SQLite (local), Turso/libSQL via `@prisma/adapter-libsql` (prod) |
| **UI primitives** | Radix Dialog, `lucide-react` icons |
| **Content rendering** | `markdown-it`, `highlight.js` |
| **Tooling** | ESLint 9, `tsx`, PostCSS, Autoprefixer |
| **Deployment** | Vercel |

---

## Project structure

```
src/
├── app/
│   ├── (hub)/              # Hub home + topic pages (extended/cheatsheet/quiz), problems list, profile
│   ├── problems/[slug]/    # Problem detail page (description + Monaco editor) + OG image
│   ├── api/run/route.ts    # Code execution endpoint (POST /api/run)
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── globals.css         # Tailwind + Liquid Glass + cheatsheet prose styles
│   └── robots.ts · sitemap.ts · manifest.ts · opengraph-image.tsx   # SEO/PWA
├── components/
│   ├── glass/              # GlassCard, GlassPanel, GlassNavbar
│   ├── ui/                 # Badge, Button, dialog
│   ├── editor/             # CodeEditor, TestResults
│   ├── problems/           # ProblemDescription, ProblemList, ProblemsView
│   └── cheatsheet/         # Views, cards, content-block renderers, sidebars
├── lib/
│   ├── cheatsheet/         # registry.ts, types.ts + per-topic content modules
│   ├── db.ts               # Prisma client (SQLite locally / Turso in prod)
│   ├── runner.ts           # vm-based code runner
│   ├── userStore.ts        # localStorage progress store
│   └── utils.ts            # cn() helper
├── data/
│   └── problems.ts         # Static problem catalog (getProblemBySlug)
prisma/
├── schema.prisma           # Problem · Submission · Progress models
└── seed.ts                 # Seed sample problems
```

---

## Getting started

### Prerequisites
- **Node.js 20+** and npm
- The repo includes an [.npmrc](.npmrc) with `legacy-peer-deps=true` (React 19 peer ranges).

### 1. Install
```bash
git clone <repo-url>
cd leetCode
npm install
```
> `postinstall` runs `prisma generate` automatically.

### 2. Configure environment
```bash
cp .env.example .env
```
The defaults run against a local SQLite file — no extra setup needed for development.

### 3. Set up the database (local)
```bash
npm run prisma:migrate    # apply schema → creates prisma/dev.db
npm run prisma:seed       # seed sample problems
```

### 4. Run the dev server
```bash
npm run dev
```
Open **http://localhost:5001**.

---

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port **5001** |
| `npm run build` | Production build |
| `npm run start` | Serve the production build on port **5001** |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate the Prisma client |
| `npm run prisma:migrate` | Apply migrations (`prisma migrate dev`) |
| `npm run prisma:seed` | Seed sample problems |

---

## Environment variables

See [.env.example](.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes (local) | SQLite connection string, e.g. `file:./dev.db` |
| `TURSO_DATABASE_URL` | Prod only | When set, the app uses Turso (libSQL) via the Prisma driver adapter |
| `TURSO_AUTH_TOKEN` | Prod only | Auth token for the Turso database |
| `LEETCODE_SESSION` | Optional | Only needed when importing problems via `leetcode-query` |

---

## How it works

- **Code runner.** `POST /api/run` receives `{ code, language, testCases }`. TypeScript is
  transpiled to JS with `sucrase`, the entry function name is detected from the source, and each
  test case runs inside an isolated Node `vm` context with a 5s timeout. Actual output is
  JSON-compared against the expected value. See [runner.ts](src/lib/runner.ts).
- **Cheatsheet content model.** Each topic is declared in
  [registry.ts](src/lib/cheatsheet/registry.ts) (slug, title, icon, accent, available formats)
  and backed by a typed content module under [src/lib/cheatsheet/](src/lib/cheatsheet/). Generic
  renderers turn typed content blocks (headings, paragraphs, code, notes, grids, changelogs) into
  the UI, so adding a topic is mostly data, not components.
- **Data & progress strategy.** Problems are read from static data
  ([problems.ts](src/data/problems.ts)) so production needs no database. The Prisma layer
  ([db.ts](src/lib/db.ts)) uses local SQLite in development and switches to Turso when
  `TURSO_DATABASE_URL` is present. User progress lives entirely in the browser via `localStorage`
  ([userStore.ts](src/lib/userStore.ts)).

---

## Deployment

The app is deployed on **Vercel** ([cheat-hub.vercel.app](https://cheat-hub.vercel.app)).

- Runs **DB-less** by default: problems come from static data and progress is browser-side, so no
  database provisioning is required.
- `next.config.ts` keeps Prisma/libSQL packages external from the serverless bundle so they load
  natively at runtime.
- To enable a persistent backend, set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in the Vercel
  project environment.

---

## Roadmap

- [ ] Import problems from a public LeetCode dataset
- [ ] Richer progress tracking & submission history
- [ ] Difficulty filter, search, and company-tag filtering
- [ ] Discussion / comments section
- [ ] Timer & interview mode
- [ ] Custom problem-creation UI

---

## ⚠️ Security note

The code runner uses Node's `vm` module, which is **not** a hardened sandbox. It is intended for
local/trusted use only. For an untrusted, multi-user deployment, replace it with a proper sandbox
(e.g. [Judge0](https://judge0.com/), isolated containers, or a microVM).

---

## License

Released under the **MIT License** — _add a [LICENSE](LICENSE) file to make this official._
