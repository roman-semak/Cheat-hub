# React + Next.js — Roadmap просунутих тем (Senior prep)

> Фокус: internals, performance, patterns. Базу (JSX, props, базові хуки) пропущено — вона вже в руках.
> Мета: підготовка до Senior/Middle Front-End співбесіди (React/TS, акцент Sigma).

---

## Блок 1 — React internals (як воно працює під капотом)

Найважливіший блок для Senior. Питають не "що таке useState", а "чому компонент ререндериться".

- [ ] **Reconciliation і Virtual DOM** — як React вирішує, що перемалювати; роль `key` (index як key — антипатерн)
- [ ] **Fiber-архітектура** — що це, навіщо, як дає переривчастий рендеринг
- [ ] **Render vs Commit фази** — що відбувається в кожній, чому side-effects не можна в render
- [ ] **Тригери ререндеру** — state change, parent re-render, context change; "проп не змінився, а ререндер стався"
- [ ] **Batching** — автоматичне групування оновлень стану, що змінилось у React 18

---

## Блок 2 — Хуки поглиблено

- [ ] **useEffect** — модель залежностей, cleanup, коли ефект зайвий; "як зробити fetch без useEffect" (→ Server Components / TanStack)
- [ ] **useMemo / useCallback** — коли реально треба vs передчасна оптимізація; референсна рівність
- [ ] **useRef** — не тільки DOM: збереження значення між рендерами без ререндеру
- [ ] **useReducer** — коли замість useState; патерн для складного стану
- [ ] **useLayoutEffect vs useEffect** — різниця в таймінгу, коли перший обовʼязковий
- [ ] **useTransition / useDeferredValue** — Concurrent features, неблокуючі оновлення
- [ ] **Custom hooks** — правила, композиція, винесення RxJS у хук (Sigma-тема)

---

## Блок 3 — Performance (диференціатор)

Sigma цінує perf. Реальний досвід bundle-оптимізації (Arena Pulse, Mythical Marketplace) — розкрити.

- [ ] **React.memo** — коли працює, коли ні, кастомний порівнювач
- [ ] **Профілювання** — React DevTools Profiler, як знайти зайві ререндери
- [ ] **Referential stability** — чому обʼєкти/масиви в пропсах вбивають memo
- [ ] **Code splitting** — `React.lazy`, `Suspense`, динамічні імпорти
- [ ] **List virtualization** — довгі списки (react-window), чому критично
- [ ] **Core Web Vitals** — LCP, CLS, INP і що з ними робить frontend

---

## Блок 4 — State management (архітектурне мислення)

- [ ] **Межі: локальний / серверний / UI-стан** — головна архітектурна відповідь. Server state (TanStack) ≠ client state (Zustand) ≠ URL state
- [ ] **Context API** — коли достатньо, чому не для частих оновлень (ререндери всіх споживачів)
- [ ] **Zustand** — модель стору, селектори, чому легший за Redux
- [ ] **TanStack Query** — кеш як стан, staleTime, інвалідація, optimistic updates
- [ ] **RxJS-в-React** — коли потоки кращі за useEffect (Sigma-тема): presence, debounced search

---

## Блок 5 — Patterns

- [ ] **Composition over inheritance** — children, compound components
- [ ] **Render props / HOC** — легасі-патерни (знати для питання про еволюцію)
- [ ] **Controlled vs uncontrolled** компоненти — форми
- [ ] **Container / Presentational** — чому межа розмилась із хуками
- [ ] **Error boundaries** — обробка помилок, чому поки що тільки класові

---

## Блок 6 — Next.js: рендер-моделі (Senior-must)

Тут копають найглибше на Next.js-ролях.

- [ ] **CSR / SSR / SSG / ISR** — різниця, коли що; `revalidate`
- [ ] **RSC (React Server Components)** — що це, чому не те саме, що SSR; серверні vs клієнтські компоненти
- [ ] **`"use client"` межа** — де проходить, що можна передавати через неї (серіалізація)
- [ ] **Streaming + Suspense** — прогресивний рендеринг
- [ ] **Hydration** — що це, типові mismatch-помилки, `next/dynamic` з `ssr: false`

---

## Блок 7 — Next.js App Router

- [ ] **File-based routing** — layouts, templates, route groups, parallel/intercepting routes
- [ ] **Data fetching** — fetch-кешування, `cache`, статичні vs динамічні дані
- [ ] **Server Actions** — мутації без API-роутів, коли доречні
- [ ] **Route handlers** — API всередині Next
- [ ] **Caching layers** — Router Cache, Full Route Cache, Data Cache (найзаплутаніша тема Next)

---

## Блок 8 — React 19 / майбутнє (свіжість)

- [ ] **React 19 нове** — Actions, `use()`, `useOptimistic`, `useActionState`
- [ ] **React Compiler** — що автоматизує (кінець ручним useMemo?), поточний статус
- [ ] **Next 15 зміни** — async request APIs, зміна дефолту кешування (майбутня міграція TeamHub)

---

## Порядок вивчення

Рекомендований кістяк Senior-інтервʼю: **Блок 1 → 6 → 4 → 3** (internals → рендер-моделі → стан → perf).
Блоки 2, 5, 7, 8 — паралельно.

**Фільтр:** не вчити все підряд. Пройтись по списку, познати "поясню впевнено" vs "плаваю". Вчити тільки друге.
Ймовірні прогалини під поточний досвід: internals (Блок 1), Concurrent features (Блок 2), React 19 (Блок 8) —
рідше в щоденній роботі, але любимі на співбесідах. Блоки 4, 6, 7 переважно вже в руках з Arena Pulse.
