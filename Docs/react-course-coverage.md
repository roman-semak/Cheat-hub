# Покриття курсу React JS (Sigma Software) у Cheat Hub

**Дата аудиту:** 2026-09-13 · **Задача:** Tasks/archive/task-006-react-course-coverage-audit.md
**Програма курсу:** [react-course-sigma-software.md](react-course-sigma-software.md)

Кожен модуль зіставлено з двома речами:

- **Теорія.** Секції шпаргалок, де тема пояснена з прикладами й попапом «Питання на співбесіді». Посилання мають вигляд `/<topic>#<section-id>`.
- **Живий код.** Місця в самому застосунку, де концепцію реально застосовано.

Позначки: ✅ покрито · ✅➕ прогалину закрито під час аудиту · ⚠️ TODO.

| # | Модуль | Теорія (секції) | Живий код у проєкті | Статус |
|---|---|---|---|---|
| 1 | Вступ: інструменти, SPA/MPA/PWA, фреймворки, переваги React | `/javascript#web-app-architectures`, `/react#history-versions`, `/react#library-vs-framework`, `/react#tooling-vite`, `/ide#nodejs-runtime`, `/ide#chrome-devtools-tour`, `/git` | `package.json` (npm-скрипти), `next.config.js` | ✅ |
| 2 | Основи JS: об'єкти, масиви, функції, async, ES6+, якість коду | `/javascript#functions-closures-scope`, `#closures-deep-dive`, `#async-promises-event-loop`, `#destructuring-array-object-patterns`, `#built-in-objects-map-set-array-object-methods`, `#modules-esm-vs-cjs`, `/ide#linters-formatters` | `src/lib/runner.ts` (vm, async-таймаут), `scripts/*.ts` | ✅ |
| 3 | DOM та BOM: події, навігація, storage, browser API | `/javascript#dom-events-traversal`, `#bom-storage-history`, `#browser-apis-fetch-abortcontroller-intersectionobserver`, `#service-worker` | `src/lib/cheatsheet/useReadTracking.ts`, `useScrollSpy.ts` (IntersectionObserver), `useSectionHash.ts` (location.hash / History API), `src/lib/userStore.ts` (localStorage) | ✅ |
| 4 | Знайомство з React: концепції, VirtualDOM, компоненти, DevTools | `/react#fundamentals-components-jsx`, `#fundamentals-component-anatomy`, `#internals-reconciliation`, `#internals-render-commit`, `#react-devtools` | `src/components/**`: вся UI-частина | ✅ |
| 5 | JSX та рендеринг: події, списки, умовний рендер, refs, fragments, render props | `/react#fundamentals-components-jsx` (Fragment), `#jsx-synthetic-events`, `#fundamentals-lists-conditionals`, `#hooks-useref`, `#patterns` (render props, HOC) | `src/components/cheatsheet/ContentBlocks.tsx` (рендер за типом блока), `MermaidBlock.tsx` (`useRef` як лічильник запусків поза рендером) | ✅ |
| 6 | Стан і props: stateful/stateless, потік даних, PropTypes, анти-патерни | `/react#fundamentals-props-state` (Stateful vs Stateless, PropTypes), `#state-boundaries`, `#patterns` (boolean-prop proliferation, cloneElement) | `src/components/ui/Badge.tsx` (stateless), `ProfilePanel.tsx` (stateful) | ✅ |
| 7 | Життєвий цикл | `/react#lifecycle-class-vs-functional`, `#internals-render-commit`, `#hooks-deep-dive` (useEffect cleanup) | `useReadTracking.ts` (підписка + cleanup в `useEffect`) | ✅ |
| 8 | Форми та валідація, пакети | `/react#forms-controlled-uncontrolled`, `#forms-formdata-native` (react-hook-form + Zod, Formik як легасі) | `src/components/profile/ProfilePanel.tsx` (форма логіну) | ✅ |
| 9 | Маршрутизація: History API, React Router | `/react#react-router`, `/javascript#bom-storage-history`, `/react#nextjs-app-router` | `src/app/(hub)/**` (файловий роутинг App Router), `useSectionHash.ts` | ✅ |
| 10 | Redux: архітектура, thunk/saga, структура | `/react#state-redux` (RTK, thunk, saga, createAsyncThunk), `#state-zustand`, `#state-tanstack-query`, `#state-rxjs` | Redux свідомо не використано (див. нижче); `src/lib/userStore.ts` | ✅ |
| 11 | Hooks API: вбудовані, кастомні, практики, анти-патерни | `/react#hooks-why`, `#hooks-usestate-patterns`, `#hooks-catalog-full`, `#hooks-deep-dive`, `#hooks-concurrent`, `#hooks-custom`, `#memoization-concept` | `src/lib/cheatsheet/use*.ts` (6 кастомних хуків), `useUserStore` | ✅ |
| 12 | Взаємодія з сервером: Fetch, HTTP-пакети, auth | `/react#server-communication-auth` (fetch, axios, AbortController, токени), `#state-tanstack-query` | `src/app/api/auth/*`, `src/app/api/sync/route.ts`, `src/lib/auth.ts` (scrypt + HMAC-сесії), `src/app/api/run/route.ts` | ✅ |
| 13 | Стилізація та анімації | `/react#styling-approaches`, `#animation-techniques`, `#view-transitions` | `src/app/globals.css` + `tailwind.config.js` (Liquid Glass), `src/components/glass/*` | ✅ |
| 14 | Тестування, React Native, React VR, кар'єра | `/react#testing-react-components`, `/javascript#testing-jest-vitest-describetestexpect`, `/react#react-native-ecosystem` (з довідкою про React VR), `/react-native`, **`/react#career-growth`** | `scripts/verify-approaches.ts` (перевірка рішень прогоном тестів) | ✅➕ |

## Закриті прогалини

- **Модуль 14, кар'єрні поради.** Раніше тема не була покрита. Додано секцію `career-growth` («🧭 Після основ: кар'єрний шлях React-розробника») у `src/lib/cheatsheet/react.ts`. У ній: дорожня карта Junior→Middle→Senior, вимоги до портфоліо, етапи співбесіди та 3 питання в попапі.

Решта тем з програми вже мала повноцінні розділи з прикладами коду. Grep-перевірка підтвердила наявність PropTypes, Stateful/Stateless, redux-thunk/saga, react-hook-form, History API, SPA/MPA/PWA, Chrome DevTools, React VR тощо.

## Чому в самому застосунку немає Redux

Клієнтський стан тут малий і майже весь належить одному користувачеві: прогрес, прочитані секції, результати квізів. Тому його тримає `src/lib/userStore.ts`. Це модульний стор на `useSyncExternalStore`: з localStorage як сховищем і з дебаунсованим push на `/api/sync`. Зміни стану проходять через одну функцію `update()`, по суті це reducer без boilerplate. Контент статичний і рендериться на сервері, тож кешу серверного стану (Redux/RTK Query) немає. Сама архітектура Redux, middleware і коли її обирати описані в `/react#state-redux`.

## TODO

Відкритих прогалин немає.
