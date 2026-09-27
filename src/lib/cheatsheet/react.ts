// AUTO-GENERATED from a cleaned Markdown export.
// Source: Tasks/cheat-hub-react-cleaned.md
// Regenerate with: npx tsx scripts/import-topic-markdown.ts <file.md> react
// Prose is sanitized HTML styled by .cheat-prose (globals.css).
import type { TopicContent } from './types'

export const reactContent: TopicContent = {
  "slug": "react",
  "intro": [
    {
      "kind": "paragraph",
      "html": "<p>Хуки, рендеринг, стан і патерни сучасного React — від основ до Senior.</p>\n<p>Гайд побудований як шлях від &quot;пишу перший компонент&quot; до &quot;поясню, чому він ре-рендерився&quot; на Senior-співбесіді. Блоки 0–1 — фундамент, 2–5 — поглиблений React, 6–8 — Next.js та найсвіжіше. Кожен розділ має практичні приклади й блок <strong>🎤 На співбесіді часто запитують</strong> — саме там питання, які реально ставлять.</p>"
    }
  ],
  "sections": [
    {
      "id": "history-versions",
      "title": "📜 Історія версій React",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><code>v0.3 · 2013</code> · <code>v15 · 2016</code> · <code>v16 · 2017</code> · <code>v16.8 · 2019</code> · <code>v17 · 2020</code> · <code>v18 · 2022</code> · <code>v19 · 2024 ✦</code></p>\n<p><strong>🕐 Історія</strong></p>\n<ul class=\"list\">\n<li><strong>2013</strong> — Open-source реліз (Facebook) — Virtual DOM як основна ідея, ще з домішками Flux</li>\n<li><strong>2015</strong> — React Native — той самий компонентний підхід для мобільних застосунків</li>\n<li><strong>2016 · v15</strong> — Останній реліз перед переписом реконсилера — стабільна, але синхронна модель рендерингу</li>\n<li><strong>2017 · v16</strong> — Fiber-архітектура (повний переписаний реконсилер), Fragments, Error Boundaries, Portals</li>\n<li><strong>2019 · v16.8</strong> — <strong>Hooks</strong> — useState/useEffect/... Функціональні компоненти отримують стан без класів</li>\n<li><strong>2020 · v17</strong> — &quot;No new features&quot; реліз — підготовка до поступових апгрейдів, новий JSX transform (без ручного <code>import React</code>)</li>\n<li><strong>2022 · v18</strong> — Concurrent rendering, automatic batching, <code>useTransition</code>/<code>useDeferredValue</code>, Suspense для data fetching, перші Server Components</li>\n<li><strong>2024 · v19 ✦</strong> — <strong>Поточна:</strong> Actions, <code>use()</code>, <code>useActionState</code>, <code>useOptimistic</code>, React Compiler (RC)</li>\n</ul>\n<p><strong>Головний вектор 2013 → 2024:</strong> від &quot;бібліотеки для рендерингу View у MVC&quot; → до власної рантайм-моделі з конкурентним рендерингом і серверними компонентами. Найбільший зсув для щоденної роботи — <strong>Hooks (2019)</strong>: класи перестали бути обов'язковими для стану/lifecycle (детально — розділ &quot;🏛️ Class vs Functional&quot; нижче).</p>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що змінилось у переході від React 17 до React 18, і чому це переламний реліз?",
          "answer": "React 18 ввів <strong>concurrent rendering</strong> як фундамент: <code>createRoot</code> замість <code>ReactDOM.render</code>, автоматичний <strong>batching</strong> усіх оновлень, нові хуки <code>useTransition</code>/<code>useDeferredValue</code>/<code>useId</code>, Suspense для SSR. До 18 усе рендерилось синхронно й блокуюче."
        },
        {
          "question": "Чим React 19 відрізняється концептуально від попередніх мажорних версій?",
          "answer": "Зміщує фокус з клієнтських оптимізацій на <strong>full-stack модель</strong>: Actions (<code>useActionState</code>/<code>useFormStatus</code>/<code>useOptimistic</code>), стабільні Server Components/Functions, <code>use()</code> для читання проміс/контексту під час рендеру, <code>ref</code> як звичайний prop (без <code>forwardRef</code>)."
        }
      ]
    },
    {
      "id": "library-vs-framework",
      "title": "📚 Бібліотека чи фреймворк? + Virtual DOM",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Чому React — бібліотека, а не фреймворк <span class=\"tag tag-key\">KEY</span></h3>\n<p>Ключова відмінність — <strong>хто кого викликає (inversion of control)</strong>. З фреймворком (Angular) твій код вбудовується у чужий &quot;скелет&quot;: фреймворк визначає структуру проєкту, routing, HTTP, forms, DI — і сам викликає твій код у визначених точках. З бібліотекою (React) — навпаки: <strong>ти сам вирішуєш архітектуру</strong> і викликаєш React там, де потрібен UI-рендеринг; router, HTTP-клієнт, state-менеджер — окремі бібліотеки, які ти підбираєш сам (Next.js/TanStack Router, TanStack Query, Zustand — усе це вибір, а не частина &quot;коробки&quot;).</p>"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\"><div class=\"card blue\"><h4>Framework (Angular)</h4>\n<p>&quot;Не дзвони нам, ми подзвонимо тобі&quot; — DI-контейнер, модулі, lifecycle hooks викликаються фреймворком за жорсткими правилами.</p></div><div class=\"card green\"><h4>Library (React)</h4>\n<p>Ти пишеш звичайний JS/TS-застосунок і <em>імпортуєш</em> React там, де потрібен декларативний UI. Решта архітектури — твій вибір.</p></div><div class=\":\"><div class=\"alert good\"><span class=\"icon\">✅</span><p> Практичний наслідок для співбесіди: &quot;React-екосистема&quot; (Next.js, React Router, TanStack) існує саме тому, що сам React навмисно не вирішує ці питання — на відміну від Angular, де вони вбудовані.</p></div>\n<h3 class=\"topic\">Virtual DOM — 30-секундна версія</h3>\n<p>Робота з реальним DOM напряму — повільна (reflow/repaint на кожну зміну). React будує легкий JS-опис UI (Virtual DOM), порівнює нову версію зі старою і застосовує до справжнього DOM лише мінімальний набір змін. <strong>Це вступ</strong> — повний механізм (Fiber, reconciliation, diffing-правила) — у розділі &quot;Reconciliation, Virtual DOM, Fiber&quot; нижче.</p></div></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому React позиціонують як бібліотеку, а не фреймворк, і які практичні наслідки для команди?",
          "answer": "Бібліотека вирішує одну задачу — рендеринг UI за станом — і не нав'язує роутинг, data fetching чи структуру. Наслідок: команда сама обирає стек (гнучкість, але й ризик неузгоджених рішень), тому великі команди часто стандартизують на фреймворку поверх React (Next.js)."
        },
        {
          "question": "Що таке Virtual DOM і чи є він причиною швидкодії React?",
          "answer": "Це легковагове дерево JS-об'єктів, що описує бажаний UI. Сам по собі <strong>не джерело швидкодії</strong> (прямі DOM-операції можуть бути швидшими) — реальна цінність у декларативній моделі («який стан → який UI») плюс можливості батчити й пріоритизувати оновлення."
        }
      ]
    },
    {
      "id": "tooling-vite",
      "title": "🧰 Vite та інструменти збірки",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Що таке Vite <span class=\"tag tag-key\">KEY</span></h3>\n<p>Dev-сервер + білд-інструмент. У розробці Vite віддає файли як нативні ES-модулі прямо браузеру (компілює/трансформує лише файл, який реально запитав браузер, через esbuild — миттєвий старт і HMR незалежно від розміру проєкту). Для продакшн-білда використовує Rollup — трясе дерево (tree-shaking), об'єднує чанки.</p>\n<h3 class=\"topic\">Хто був до Vite</h3>\n<p><span class=\"tag tag-pit\">LEGACY</span> <strong>Create React App (CRA)</strong> — офіційний starter від Meta (2016–2023, <strong>❌ deprecated</strong>). Webpack під капотом, схований від розробника; тонкого контролю нема без <code>eject</code>. <strong>Webpack (вручну)</strong> — найпопулярніший бандлер 2015–2020: бандлить <strong>увесь</strong> граф залежностей ДО старту dev-сервера, тому холодний старт росте лінійно з проєктом. Досі в legacy-базах і Next.js Pages Router.</p>\n<h3 class=\"topic\">⚡ Vite — детально</h3>\n<p><strong>Vite — Evan You (автор Vue), 2020.</strong> Рушій: dev — нативні ES-модулі + esbuild (Go) для pre-bundling залежностей; prod — Rollup (нові версії переходять на Rolldown — Rust-порт).</p>\n<ul class=\"list\">\n<li><strong>Dev:</strong> сервер стартує без бандлінгу. Браузер сам запитує <code>import</code>-и, Vite трансформує лише запитаний файл (JSX/TS → JS). Залежності з <code>node_modules</code> один раз пре-бандляться esbuild у кеш <code>node_modules/.vite</code>.</li>\n<li><strong>HMR:</strong> інвалідовується лише змінений модуль і його межа (React Fast Refresh через <code>@vitejs/plugin-react</code>) — швидкість не залежить від розміру проєкту.</li>\n<li><strong>Prod:</strong> Rollup — tree-shaking, code-splitting за <code>import()</code>, мінифікація, хешовані імена.</li>\n</ul>\n<p><strong>Сильні сторони:</strong> миттєвий старт, мінімальна конфігурація, величезна екосистема плагінів (сумісна з Rollup), фундамент для Vitest, Remix/React Router v7, Astro, SvelteKit.<br>\n<strong>Обмеження:</strong> dev і prod — різні збірники (рідкісні «працює в dev, ламається в build»); тисячі дрібних модулів = водоспад запитів при першому завантаженні.<br>\n<strong>Коли обирати:</strong> новий SPA / бібліотека компонентів / клієнтський React без потреби в SSR з коробки.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// vite.config.ts\nimport { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  resolve: { alias: { '@': '/src' } },\n  server: { port: 5173, proxy: { '/api': 'http://localhost:3000' } },\n})"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert\"><span class=\"icon\">💡</span><p> Env-змінні в клієнті — лише з префіксом <code>VITE_</code> і через <code>import.meta.env.VITE_API_URL</code>, а не <code>process.env</code>.</p></div>\n<h3 class=\"topic\">Решта інструментів — коротко</h3>\n<ul class=\"list\">\n<li><strong>▲ Next.js</strong> (Vercel, 2016) — не бандлер, а <strong>фреймворк</strong> поверх React: Turbopack (дефолт з Next.js 16) + SWC. Файловий роутинг (App/Pages Router), SSR/SSG/ISR/стрімінг/Server Actions на рівні сегмента, вбудовані <code>next/image</code>/<code>next/font</code>/middleware/API routes. Деталі — розділи &quot;Next.js&quot; нижче. Обирати: потрібні SSR/SEO, публічні сторінки, fullstack.</li>\n<li><strong>🚀 Turbopack</strong> (Vercel, 2022, Rust) — наступник Webpack від автора Webpack. Інкрементальність на рівні функцій (кешується результат кожної операції) + lazy bundling у dev + persistent-кеш. Stable для <code>next dev</code>/<code>next build</code>, дефолт у Next.js 16. Фактично не існує окремо від Next.js; кастомні Webpack-плагіни (не loader'и) не підтримуються.</li>\n<li><strong>🦀 Rspack</strong> (ByteDance, 2023, Rust) — Webpack-сумісний за API (той самий <code>config</code>, більшість loader'ів/плагінів). Ядро на Rust з паралелізмом, вбудований SWC-loader; Module Federation працює. У 5–10× швидше build/HMR. Обирати: великий Webpack-конфіг, який дорого переписувати, або мікрофронтенди. Обгортка zero-config — Rsbuild.</li>\n<li><strong>📦 Parcel</strong> (Devon Govett, 2017, v2 частково Rust/SWC) — «zero-config»: точка входу — будь-який файл, Parcel сам знаходить залежності й трансформери, ставить відсутні плагіни. Агресивний диск-кеш. Обирати: прототип/демо/навчання, без конфігу взагалі. Мінус: менша спільнота, «магія» ускладнює дебаг.</li>\n</ul>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Інструмент</th>\n<th>Тип</th>\n<th>Швидкість dev-старту</th>\n<th>Коли обирати</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Vite</td>\n<td>Dev-сервер + Rollup</td>\n<td>Дуже висока (ESM, без бандлінгу)</td>\n<td>Новий SPA-проєкт за замовчуванням</td>\n</tr>\n<tr>\n<td>Webpack</td>\n<td>Бандлер</td>\n<td>Низька на великих проєктах</td>\n<td>Legacy-підтримка, специфічні плагіни без аналогів</td>\n</tr>\n<tr>\n<td>CRA</td>\n<td>Starter (Webpack)</td>\n<td>Низька</td>\n<td>❌ Не обирати — deprecated</td>\n</tr>\n<tr>\n<td>Next.js</td>\n<td>Фреймворк (Turbopack всередині)</td>\n<td>Висока</td>\n<td>Потрібен SSR/RSC/роутинг з коробки</td>\n</tr>\n<tr>\n<td>Turbopack</td>\n<td>Бандлер (Rust)</td>\n<td>Найвища (функція-рівнева інкрементальність)</td>\n<td>Разом з Next.js; ще не для standalone поза ним</td>\n</tr>\n<tr>\n<td>Rspack</td>\n<td>Бандлер (Rust, Webpack-сумісний)</td>\n<td>Висока</td>\n<td>Міграція з великого Webpack-конфіга без переписування</td>\n</tr>\n<tr>\n<td>Parcel</td>\n<td>Бандлер (zero-config)</td>\n<td>Середня</td>\n<td>Малі проєкти/прототипи, де не хочеться писати конфіг</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Створення проєкту — покроково</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "npm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\nnpm run dev          # dev-сервер з HMR, за замовчуванням localhost:5173\n\n# Структура після створення:\n# index.html          ← точка входу (НЕ в public/, на відміну від CRA!)\n# src/main.tsx         ← createRoot(...).render(<App />)\n# src/App.tsx\n# vite.config.ts       ← плагіни (@vitejs/plugin-react), aliases, dev-сервер"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому індустрія перейшла з CRA на Vite?",
          "answer": "CRA (Webpack) пересобирав весь бандл при кожній зміні — dev-старт і HMR деградували з ростом проєкту. Vite в dev не бандлить взагалі (ES-модулі напряму через esbuild, у 10–100× швидший), а для prod використовує Rollup. CRA офіційно deprecated."
        },
        {
          "question": "У чому різниця між dev-сервером Vite та prod-збіркою з точки зору браузера?",
          "answer": "У dev браузер отримує нативні ESM «як є», трансформація on-demand через esbuild лише для запитаних файлів — миттєвий холодний старт. У prod Vite перемикається на Rollup (tree-shaking, chunking, мінифікація) — тобто dev і prod використовують <strong>різні збірники</strong>."
        }
      ]
    },
    {
      "id": "tooling-vscode",
      "title": "🖥️ React + VS Code",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Обов'язкові розширення <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Розширення</th>\n<th>Навіщо</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>ES7+ React/Redux/React-Native Snippets</strong></td>\n<td>Сніпети <code>rfc</code>/<code>rafce</code> — функціональний компонент за секунду (<code>rcc</code> — класовий, лише для легасі)</td>\n</tr>\n<tr>\n<td><strong>Prettier</strong></td>\n<td>Автоформатування — прибирає суперечки про стиль коду в команді</td>\n</tr>\n<tr>\n<td><strong>ESLint</strong></td>\n<td>Лінтинг у реальному часі (<code>eslint-plugin-react-hooks</code> ловить порушення Rules of Hooks до рантайму)</td>\n</tr>\n<tr>\n<td><strong>Auto Rename Tag</strong></td>\n<td>Перейменування відкриваючого JSX-тега автоматично перейменовує закриваючий</td>\n</tr>\n<tr>\n<td><strong>Tailwind CSS IntelliSense</strong></td>\n<td>Автодоповнення utility-класів + підсвітка кольорів (якщо проєкт на Tailwind)</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Що таке сніпет і абревіатури <span class=\"tag tag-key\">KEY</span></h3>\n<p>VS Code <strong>сніпет</strong> — текстовий префікс, що після <code>Tab</code>/<code>Enter</code> розгортається у заготовку коду з tab-stops. Розширення ES7+ додає React-сніпети:</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Префікс</th>\n<th>Розшифровка</th>\n<th>Що генерує</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>rfc</code></td>\n<td>React Functional Component</td>\n<td>Функціональний компонент, <code>export default function</code></td>\n</tr>\n<tr>\n<td><code>rafce</code></td>\n<td>React Arrow Function Component Export</td>\n<td>Те саме, але стрілкова функція з <code>export default</code> зверху</td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// rfc / rafce → генерує:\nexport default function ComponentName() {\n  return <div>ComponentName</div>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Корисні налаштування <code>settings.json</code></h3>"
        },
        {
          "kind": "code",
          "language": "json",
          "code": "{\n  \"editor.formatOnSave\": true,\n  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",\n  \"editor.codeActionsOnSave\": { \"source.fixAll.eslint\": \"explicit\" },\n  \"editor.quickSuggestions\": { \"strings\": true } // автодоповнення в className/JSX-атрибутах\n}"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Які VS Code розширення/налаштування ти вважаєш обов'язковими для React і чому?",
          "answer": "ESLint + Prettier (з <code>eslint-plugin-react-hooks</code> — ловить порушення правил хуків до рантайму), TypeScript-плагін, snippet/IntelliSense для JSX. Плагін хуків критичний, бо умовний виклик хука — баг, що проявляється як плутанина у стані, а не одразу."
        }
      ]
    },
    {
      "id": "fundamentals-components-jsx",
      "title": "🧱 Компоненти та JSX",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Компонент — це просто функція <span class=\"tag tag-key\">KEY</span></h3>\n<p>React-компонент — звичайна JS-функція, що приймає об'єкт <code>props</code> і повертає опис UI (JSX). Ім'я компонента <strong>завжди з великої літери</strong> — так React відрізняє компонент (<code>&lt;Button/&gt;</code>) від HTML-тега (<code>&lt;button/&gt;</code>).</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Greeting({ name }: { name: string }) {\n  return <h1>Привіт, {name}!</h1>;\n}\n// Використання:\n<Greeting name=\"Роман\" />"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// JSX — це НЕ HTML. Це синтаксичний цукор над:\nReact.createElement(\n  'h1',\n  null,\n  'Привіт, ', name, '!'\n);\n// createElement повертає плейн-обʼєкт (React element),\n// не DOM-вузол. React будує з них дерево і сам малює DOM."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">JSX — правила <span class=\"tag tag-pit\">PITFALL</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Правило</th>\n<th>Приклад</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Один кореневий елемент</td>\n<td><code>&lt;&gt;...&lt;/&gt;</code> (Fragment) якщо треба обгорнути кілька без зайвого <code>div</code></td>\n</tr>\n<tr>\n<td><code>{'{ }'}</code> — вихід у JS-вираз</td>\n<td><code>{'{'}user.name{'}'}</code>, <code>{'{'}items.map(...){'}'}</code> — тільки <em>вирази</em>, не <code>if</code>/<code>for</code> (statements)</td>\n</tr>\n<tr>\n<td>Атрибути — camelCase</td>\n<td><code>className</code> замість <code>class</code>, <code>onClick</code> замість <code>onclick</code></td>\n</tr>\n<tr>\n<td>Кожен тег закритий</td>\n<td><code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code> — самозакривні теги обов'язково з <code>/</code></td>\n</tr>\n<tr>\n<td>Стилі — обʼєкт</td>\n<td><code>style={{'{{'} color: 'red' {'}}'}}</code> — подвійні дужки: зовнішні JSX, внутрішні — обʼєкт</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Умова &quot;if&quot; не працює в JSX напряму</strong> — <code>if</code> це statement, а всередині <code>{'{ }'}</code> можна лише вираз. Тому умовний рендеринг робиться через тернарник/<code>&amp;&amp;</code>/винесену змінну (детально — наступний розділ).</p></div>\n<h3 class=\"topic\">Навіщо взагалі JSX <span class=\"tag tag-key\">KEY</span></h3>\n<p>JSX створили, бо розмітка й логіка, що її генерує, нерозривно пов'язані — React обрав тримати їх <strong>разом в одному файлі</strong>, а не змушувати писати <code>React.createElement</code> вручну. Компілятор (Babel/SWC) перетворює JSX на виклики функції ще до рантайму — сам React ніколи &quot;не бачить&quot; JSX, лише результат.</p>\n<h3 class=\"topic\">Три дерева: Element tree → Fiber tree → DOM tree <span class=\"tag tag-key\">KEY</span></h3>\n<p>Це часто плутають, кажучи &quot;Virtual DOM&quot; про все одразу — насправді це <strong>три різні дерева</strong> з різним часом життя й призначенням.</p>"
        },
        {
          "kind": "paragraph",
          "html": "<pre><code class=\"language-tsx\">// Коротка форма — найчастіша\nreturn (\n  &lt;&gt;\n    &lt;dt&gt;{term}&lt;/dt&gt;\n    &lt;dd&gt;{description}&lt;/dd&gt;\n  &lt;/&gt;\n);\n// ⚠️ коротка форма НЕ приймає key — потрібна повна\n```tsx\n// Повна форма — коли потрібен key (у .map())\n{items.map(item =&gt; (\n  &lt;React.Fragment key={item.id}&gt;\n    &lt;dt&gt;{item.term}&lt;/dt&gt;\n    &lt;dd&gt;{item.description}&lt;/dd&gt;\n  &lt;/React.Fragment&gt;\n))}</code></pre><div class=\"grid3\"><div class=\"card blue\"><h4>1. Element tree</h4>\n<p>Результат <code>createElement</code> (з JSX). Легкий плейн-обʼєкт. <strong>Перестворюється щорендеру заново</strong> — &quot;Virtual DOM&quot; у побутовому сенсі.</p></div><div class=\"card yellow\"><h4>2. Fiber tree</h4>\n<p>Внутрішня структура React. <strong>Персистентна</strong> — живе між рендерами, саме її React diff'ить і зберігає в ній стан хуків.</p></div><div class=\"card green\"><h4>3. DOM tree</h4>\n<p>Реальні браузерні вузли. Оновлюється мінімально, точково — лише те, що показав diff Fiber-дерева.</p></div><pre><code></code></pre><div class=\":\"><p><strong>Element tree</strong> — плейн-обʼєкт <code>{'{'} type, props, key, ref {'}'}</code> (точна форма — розділ &quot;Virtual DOM&quot; нижче). Без методів/підписок; щойно React його звірив з Fiber-деревом — збирається GC.<br>\n<strong>Fiber tree</strong> — персистентна структура з полями (<code>type</code>, <code>key</code>, <code>child</code>/<code>sibling</code>/<code>return</code>, <code>alternate</code>, <code>memoizedState</code>) — повна таблиця в розділі &quot;Reconciliation, Virtual DOM, Fiber&quot; нижче; тут головне: це <strong>єдине</strong> дерево з трьох, що памʼятає щось між рендерами.<br>\n<strong>DOM tree</strong> — застосування diff'у до реальних <code>Node</code> (<code>appendChild</code>/<code>setAttribute</code>/…). Сеньйорський нюанс: <code>react-reconciler</code> <strong>не знає нічого про DOM</strong> — він рендерить у Fiber-дерево й викликає абстрактний &quot;host config&quot;. <code>react-dom</code> — лише одна реалізація (браузер); той самий reconciler з іншим host дає <code>react-native</code> чи <code>react-three-fiber</code>. DOM tree — лише один з можливих host'ів.</p>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Element tree відкидається й будується заново щорендеру (дешево — плейн-обʼєкти). Fiber tree — довгоживуча структура, яку React звіряє зі свіжим element tree, щоб порахувати мінімальний патч для конкретного host.</p></div>\n<h3 class=\"topic\">Fragment — варіанти <span class=\"tag tag-key\">KEY</span></h3>\n<p>Компонент повинен повернути один кореневий вузол. Fragment групує кілька елементів <strong>без зайвого DOM-вузла</strong>.</p>\n<pre><code></code></pre></div></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "JSX компілюється у виклики функцій — які саме, і чим це відрізняється у класичному та новому трансформі?",
          "answer": "Класичний трансформ компілює <code>&lt;div /&gt;</code> у <code>React.createElement('div', null)</code> (файл мусив імпортувати <code>React</code>). Новий automatic runtime (React 17+) компілює у <code>jsx</code>/<code>jsxs</code> з <code>react/jsx-runtime</code>, що імпортується автоматично — звідси зникла потреба в <code>import React</code> заради JSX."
        },
        {
          "question": "Чому не можна повертати два JSX-елементи без обгортки, і які обгортки найдешевші?",
          "answer": "JSX-вираз має резолвитись в одне значення, тому сусідні елементи без кореня — синтаксична помилка. Найдешевше — <code>&lt;&gt;...&lt;/&gt;</code> (Fragment): не створює зайвого DOM-вузла й не впливає на <code>:nth-child</code>, на відміну від <code>&lt;div&gt;</code>."
        },
        {
          "question": "Чим element tree відрізняється від Fiber tree?",
          "answer": "element tree перестворюється щорендеру (дешеві плейн-обʼєкти), Fiber tree персистентна і зберігає стан між рендерами — саме її React diff'ить."
        },
        {
          "question": "Чому <code>&lt;&gt;...&lt;/&gt;</code> іноді не підходить у <code>.map()</code>?",
          "answer": "Коротка форма не приймає <code>key</code>, а список без key ламає reconciliation — потрібен повний <code>&lt;React.Fragment key={...}&gt;</code>."
        }
      ]
    },
    {
      "id": "fundamentals-component-anatomy",
      "title": "🧩 Анатомія компонента: шаблон, стилі, зображення",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Мінімальний компонент end-to-end <span class=\"tag tag-key\">KEY</span></h3>\n<p>Реальний файл компонента містить: імпорти (React — не обов'язково з новим JSX transform, типи, стилі, картинки), функцію-компонент, <code>export</code>. Конвенція іменування файлу — збігається з іменем компонента.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// UserCard.tsx\nimport type { FC } from 'react';\nimport styles from './UserCard.module.css';   // CSS Modules — класи скоуплені локально\nimport avatarFallback from './avatar-fallback.png'; // бандлер повертає URL, не бінарник\n\ninterface UserCardProps {\n  name: string;\n  avatarUrl?: string;\n}\n\nexport const UserCard: FC<UserCardProps> = ({ name, avatarUrl }) => {\n  return (\n    <div className={styles.card}>\n      <img\n        className={styles.avatar}\n        src={avatarUrl ?? avatarFallback}\n        alt={`Аватар ${name}`}\n      />\n      <span className={styles.name}>{name}</span>\n    </div>\n  );\n};"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Що тут важливо <span class=\"tag tag-pit\">PITFALL</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Що</th>\n<th>Чому саме так</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Компонент повертає <strong>один</strong> JSX-вираз</td>\n<td>JSX-вираз — плейн-обʼєкт</td>\n</tr>\n<tr>\n<td>Імпорт картинки <code>import img from './x.png'</code></td>\n<td>Бандлер підміняє імпорт на URL до файлу в білді (з хешем) — рядковий шлях без імпорту працює лише з <code>public/</code></td>\n</tr>\n<tr>\n<td><code>CSS Modules</code> (<code>*.module.css</code>)</td>\n<td>Класи локально скоуплені — <code>styles.card</code> компілюється в унікальний хеш, без конфліктів імен</td>\n</tr>\n<tr>\n<td><code>alt</code> на <code>&lt;img&gt;</code></td>\n<td>Доступність — вимога a11y-лінтерів, не забаганка</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Файли в <code>public/</code> (Vite) копіюються as-is, доступні по кореневому шляху (<code>/logo.png</code>) БЕЗ імпорту. Файли поруч з компонентом — завжди через <code>import</code>, щоб бандлер їх обробив (оптимізація, хешування, tree-shaking).</p></div>\n<h3 class=\"topic\">Робота з картинками — повні правила <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Спосіб</th>\n<th>Синтаксис</th>\n<th>Що отримуєш</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Статичний import</td>\n<td><code>import img from './x.png'</code></td>\n<td>Рядок-URL (з хешем у prod)</td>\n</tr>\n<tr>\n<td><code>public/</code></td>\n<td><code>&lt;img src=&quot;/logo.png&quot;&gt;</code></td>\n<td>URL напряму, без обробки бандлером</td>\n</tr>\n<tr>\n<td>SVG як URL</td>\n<td><code>import icon from './icon.svg'</code></td>\n<td>Рядок-URL — як PNG/JPG</td>\n</tr>\n<tr>\n<td>SVG як компонент (SVGR)</td>\n<td><code>import { ReactComponent as Icon } from './icon.svg'</code></td>\n<td>JSX-компонент — стилізується <code>fill</code>/<code>stroke</code> через CSS/props</td>\n</tr>\n</tbody>\n</table></div>\n<p>Бандлер автоматично інлайнить <strong>дрібні</strong> файли (типово &lt;4KB) у base64 data-URI — без окремого запиту. Більші лишаються окремими файлами з власним URL і кешем.</p>\n<h4>⚠️ Динамічний шлях — пастка <span class=\"tag tag-pit\">PITFALL</span></h4>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ НЕ працює — бандлер аналізує imports\n// статично, рядок з name невідомий на build-time\nimport img from `./images/${name}.png`;\n\n// ✅ new URL — бандлер розуміє цей патерн\nconst src = new URL(\n  `./images/${name}.png`, import.meta.url\n).href;"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> У Next.js для оптимізації зображень (lazy-loading, responsive <code>srcset</code>, WebP/AVIF) є <code>&lt;Image&gt;</code> з <code>next/image</code> (згадувався в &quot;Performance Deep Dive&quot;) — заміна <code>&lt;img&gt;</code>, а не альтернатива способам імпорту вище.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Як організувати файлову структуру React-компонента, щоб вона масштабувалась?",
          "answer": "Колокація: <code>ComponentName/index.tsx</code> + <code>ComponentName.module.css</code> + асети поруч, а не в глобальних <code>/styles</code>/<code>/assets</code>. Знижує когнітивне навантаження і спрощує видалення фічі — видаляєш папку без пошуку «осиротілих» файлів."
        }
      ]
    },
    {
      "id": "styling-approaches",
      "title": "🎨 Styled Components та Tailwind",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">styled-components — CSS-in-JS <span class=\"tag tag-key\">KEY</span></h3>\n<p>Стилі описуються прямо в JS через tagged template literals — компонент і стилі в одному файлі, стилі можуть залежати від <code>props</code>.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import styled from 'styled-components';\n\nconst Button = styled.button<{ variant?: 'primary' | 'danger' }>`\n  padding: 8px 16px;\n  border-radius: 6px;\n  background: ${p => (p.variant === 'danger' ? '#ef4444' : '#6366f1')};\n  color: white;\n\n  &:hover { opacity: 0.9; }\n`;\n\n// <Button variant=\"danger\" onClick={onDelete}>Delete</Button>\n// Клас генерується на льоту, унікальний — конфліктів немає,\n// але це runtime-вартість: парсинг шаблонів + вставка <style> при mount"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Tailwind CSS — утилітарний підхід</h3>\n<p>Замість написання CSS-правил — готові utility-класи прямо в <code>className</code>. Немає runtime-вартості (звичайний CSS, згенерований на build-time) і немає проблеми іменування класів.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "npm install tailwindcss @tailwindcss/vite"
        },
        {
          "kind": "code",
          "language": "ts",
          "code": "// vite.config.ts\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport tailwindcss from '@tailwindcss/vite';\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n});"
        },
        {
          "kind": "code",
          "language": "css",
          "code": "/* src/index.css — один рядок замість окремого tailwind.config.js для базового кейсу */\n@import \"tailwindcss\";"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "export function Button({ children }: { children: React.ReactNode }) {\n  return (\n    <button className=\"rounded-md bg-indigo-600 px-4 py-2 text-white hover:opacity-90\">\n      {children}\n    </button>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Коли що обрати</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>styled-components</th>\n<th>Tailwind</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Runtime вартість</td>\n<td>Так — генерація стилів у браузері</td>\n<td>Ні — звичайний CSS, згенерований на білді</td>\n</tr>\n<tr>\n<td>Стилі, залежні від props</td>\n<td>Природно (<code>${p =&gt; ...}</code>)</td>\n<td>Через умовну конкатенацію класів (<code>clsx</code>/<code>cn</code>)</td>\n</tr>\n<tr>\n<td>Крива навчання</td>\n<td>Звичайний CSS-синтаксис</td>\n<td>Треба вивчити назви утиліт</td>\n</tr>\n<tr>\n<td>Розмір бандла</td>\n<td>Бібліотека + рантайм</td>\n<td>Лише використані класи (purge на білді)</td>\n</tr>\n</tbody>\n</table></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Які trade-off'и між CSS-in-JS та Tailwind у продакшн-застосунку?",
          "answer": "Styled Components дає повну ізоляцію стилів і динаміку на props, але додає рантайм-вартість (генерація класів під рендер, більший bundle, повільніший SSR). Tailwind — статичний CSS без рантайму: клас відомий на збірці, purge прибирає невикористане; продуктивність вища, але HTML «зашумлений» довгими класами."
        },
        {
          "question": "Чому у 2024–2026 переходять від CSS-in-JS до zero-runtime (Tailwind, vanilla-extract, CSS Modules)?",
          "answer": "Рантайм-вартість CSS-in-JS помітна на великих сторінках з динамічними стилями (кожен рендер може перегенеровувати класи/style-теги), плюс гірша сумісність із RSC, де компонент не завжди виконується в браузері й не може покладатись на рантайм-генерацію стилів."
        }
      ]
    },
    {
      "id": "animation-techniques",
      "title": "🎞️ Техніки анімації в React",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">CSS transition / @keyframes — базовий рівень <span class=\"tag tag-key\">KEY</span></h3>\n<p>Найдешевший спосіб анімувати: декларативно, без JS-рантайму. <code>transition</code> — для переходу між двома станами (hover); <code>@keyframes</code> + <code>animation</code> — для послідовності кроків або нескінченних циклів (спінер, пульсація).</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Тільки transform/opacity — щоб анімація йшла на compositor-шарі, повз layout/paint\nfunction FadeInButton() {\n  const [hovered, setHovered] = useState(false);\n  return (\n    <button\n      onMouseEnter={() => setHovered(true)}\n      onMouseLeave={() => setHovered(false)}\n      style={{\n        transform: hovered ? 'scale(1.05)' : 'scale(1)',\n        transition: 'transform 150ms ease-out',\n      }}\n    >\n      Hover me\n    </button>\n  );\n}\n\n/* @keyframes у CSS-файлі — для нескінченних/багатокрокових анімацій */\n/* .spinner { animation: spin 1s linear infinite; }\n   @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } */"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Framer Motion — коли CSS не вистачає</h3>\n<p>Декларативний API поверх Web Animations: <code>&lt;motion.div&gt;</code> замість тега, пропи <code>initial</code>/<code>animate</code>/<code>exit</code>. Головна перевага над CSS — <strong>анімація виходу</strong> (компонент доанімовується перед реальним видаленням з DOM) і <strong>layout-анімації</strong> (зміна позиції/розміру анімується автоматично через FLIP).</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { motion, AnimatePresence } from 'framer-motion';\n\nfunction Toast({ message, onClose }: { message: string; onClose(): void }) {\n  return (\n    <AnimatePresence>\n      {message && (\n        <motion.div\n          initial={{ opacity: 0, y: -20 }}\n          animate={{ opacity: 1, y: 0 }}\n          exit={{ opacity: 0, y: -20 }}       // AnimatePresence чекає завершення exit\n          transition={{ duration: 0.2 }}       // перш ніж React реально видалить елемент\n        >\n          {message}\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n}\n\n// layout-анімація \"з коробки\": <motion.div layout>{card}</motion.div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Коли що обрати</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>CSS transition/keyframes</th>\n<th>Framer Motion</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Простий hover/fade/показати-сховати</td>\n<td>✅ Достатньо, 0 залежностей</td>\n<td>Надлишково</td>\n</tr>\n<tr>\n<td>Анімація виходу (exit) при анмаунті</td>\n<td>❌ Не працює — DOM-вузол зникає миттєво</td>\n<td>✅ <code>AnimatePresence</code></td>\n</tr>\n<tr>\n<td>Layout-анімація (зміна позиції/розміру)</td>\n<td>❌ Потребує ручного FLIP</td>\n<td>✅ <code>layout</code> проп</td>\n</tr>\n<tr>\n<td>Drag / spring-фізика / жести</td>\n<td>❌</td>\n<td>✅ вбудовано</td>\n</tr>\n<tr>\n<td>Розмір бандла</td>\n<td>0 KB</td>\n<td>+30-40 KB (gzip)</td>\n</tr>\n</tbody>\n</table></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому анімація <code>transform</code>/<code>opacity</code> «дешева», а <code>width</code>/<code>top</code>/<code>margin</code> — «дорога»?",
          "answer": "<code>width</code>/<code>top</code>/<code>margin</code> запускають <strong>layout (reflow)</strong> → <strong>paint</strong> → <strong>composite</strong> — три важкі стадії на кадр. <code>transform</code>/<code>opacity</code> обробляються лише на стадії <strong>composite</strong>, часто на GPU, без layout/paint — тому саме їх рекомендують для 60fps (напр. <code>transform: translateX()</code> замість <code>left</code>)."
        },
        {
          "question": "Чим підхід CSS-анімації відрізняється від Framer Motion, і коли CSS вже недостатньо?",
          "answer": "CSS <code>transition</code>/<code>@keyframes</code> — декларативні, дешеві, ідеальні для простих переходів стану, без JS-рантайму. Але CSS не вміє анімувати анмаунт (елемент зникає миттєво), координувати кілька елементів (layout/spring/drag) чи реверсувати перехід — для цього Framer додає JS-рантайм (<code>AnimatePresence</code>, <code>layout</code> проп)."
        },
        {
          "question": "Що таке FLIP-техніка і яку проблему вона вирішує?",
          "answer": "FLIP (First, Last, Invert, Play) анімує зміну <em>позиції/розміру через layout</em> (напр. картка переїжджає в іншу колонку), яку CSS transition не бере: зняти позицію до (First) і після (Last), інвертувати різницю через <code>transform</code> (Invert), прибрати transform і дати браузеру доанімувати дешевим <code>transform</code> (Play). На цій ідеї побудований <code>layout</code>-проп Framer Motion."
        }
      ]
    },
    {
      "id": "fundamentals-props-state",
      "title": "📦 Props, State та події",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Props — однонаправлений потік даних <span class=\"tag tag-key\">KEY</span></h3>\n<p>Дані рухаються <strong>тільки згори вниз</strong>: батько передає props дитині, дитина не може напряму змінити props батька (вони <em>read-only</em>). Щоб дитина &quot;повідомила&quot; щось наверх — батько передає їй callback як проп.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Parent() {\n  const [count, setCount] = useState(0);\n  return <Counter value={count}\n    onIncrement={() => setCount(c => c + 1)} />;\n}"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Counter({ value, onIncrement }: Props) {\n  // value — тільки читання, onIncrement — \"канал наверх\"\n  return <button onClick={onIncrement}>{value}</button>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\"><code>children</code> — особливий проп</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Card({ children }: { children: React.ReactNode }) {\n  return <div className=\"card\">{children}</div>;\n}\n// <Card><p>будь-який JSX</p></Card> — children = <p>...</p>\n// Це основа композиції — компонент не знає, ЩО всередині, лише \"де\"."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">useState — локальний стан <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const [count, setCount] = useState(0);\n// count — поточне значення (read-only знімок)\n// setCount — єдиний спосіб його змінити\nsetCount(count + 1);      // \"постав нове значення\"\nsetCount(c => c + 1);  // функціональна форма — безпечна при кількох апдейтах підряд"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Виклик setState планує РЕ-РЕНДЕР, не мутує змінну одразу.\nfunction onClick() {\n  setCount(count + 1);\n  console.log(count); // ❗ старе значення — рендер ще не стався\n}\n// Це не \"баг\" — це модель: render функція завжди бачить\n// стан ЦЬОГО рендеру (детальніше — closures)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Stateful vs Stateless <span class=\"tag tag-key\">KEY</span></h3>\n<p>Компонент <strong>stateful</strong> — має власний <code>useState</code>/<code>useReducer</code>, &quot;пам'ятає&quot; щось між рендерами. <strong>stateless</strong> — чиста функція від <code>props</code>: однакові пропи → однаковий вивід, без внутрішньої памʼяті. До хуків такий компонент називали <strong>&quot;stateless functional component&quot; (SFC)</strong> — термін лишився в старих статтях; сьогодні &quot;функціональний компонент&quot; вже не означає &quot;без стану&quot;.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Stateless — нічого не памʼятає між рендерами\nfunction Avatar({ url, alt }: Props) {\n  return <img src={url} alt={alt} />;\n}\n// Stateful — власна памʼять (чи завантажилось зображення)\nfunction Avatar({ url, alt }: Props) {\n  const [loaded, setLoaded] = useState(false);\n  return <img src={url} alt={alt} onLoad={() => setLoaded(true)} />;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Контрольований input</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const [text, setText] = useState('');\n<input value={text} onChange={e => setText(e.target.value)} />\n// value з React-стану = React \"керує\" полем — це \"controlled\".\n// Без value — DOM сам тримає своє значення (uncontrolled)."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">PropTypes — легасі перевірка типів <span class=\"tag tag-pit\">LEGACY</span></h3>\n<p>До TypeScript пакет <code>prop-types</code> був стандартним способом валідувати форму props <strong>у рантаймі</strong>: React у dev порівнював реальні props зі &quot;схемою&quot; й друкував попередження при невідповідності. Сьогодні в TS-проєкті цю роль виконує компілятор — PropTypes лишається лише в легасі JS-базі без TS.</p>"
        },
        {
          "kind": "code",
          "language": "jsx",
          "code": "// PropTypes (JavaScript, без TypeScript)\nimport PropTypes from 'prop-types';\n\nfunction UserCard({ name, age, onSelect }) {\n  return <div onClick={onSelect}>{name} ({age})</div>;\n}\n\nUserCard.propTypes = {\n  name: PropTypes.string.isRequired,\n  age: PropTypes.number,          // не required — може бути undefined\n  onSelect: PropTypes.func,\n};\n// Невідповідність ловиться лише коли компонент РЕАЛЬНО відрендериться\n\n// TypeScript — той самий контракт, але compile-time\ninterface UserCardProps {\n  name: string;\n  age?: number;\n  onSelect?: () => void;\n}\nfunction UserCard({ name, age, onSelect }: UserCardProps) { /* ... */ }"
        }
      ],
      "interviewQuestions": [
        {
          "question": "У чому фундаментальна різниця між props і state, і чому їх змішування — типова помилка?",
          "answer": "<code>props</code> — вхідні дані ззовні, які компонент <strong>не може змінювати сам</strong>; <code>state</code> — внутрішні дані, якими він керує через <code>useState</code>/<code>useReducer</code>, і зміна яких викликає ре-рендер. Типова помилка — копіювати prop у local state (<code>useState(props.value)</code>), що розриває синхронізацію з батьком при подальших оновленнях prop."
        },
        {
          "question": "Чому <code>onClick={handleClick()}</code> — баг, а <code>onClick={handleClick}</code> — правильно?",
          "answer": "<code>onClick={handleClick()}</code> викликає функцію під час рендеру й передає обробнику <em>результат</em> (часто <code>undefined</code>), а <code>handleClick</code> виконується щорендеру. Правильно — посилання: <code>onClick={handleClick}</code> або <code>onClick={() =&gt; handleClick(arg)}</code> для аргументів."
        },
        {
          "question": "Чому <code>console.log(count)</code> одразу після <code>setCount</code> показує старе значення?",
          "answer": "setState асинхронний відносно поточної функції — планує рендер, не мутує змінну зараз."
        },
        {
          "question": "Чим props відрізняються від state?",
          "answer": "props — ззовні, read-only, дитина не міняє; state — внутрішній, змінюваний через свій setter."
        },
        {
          "question": "Навіщо потрібен <code>children</code>?",
          "answer": "Композиція — компонент-обгортка не знає вміст, просто рендерить те, що передали."
        },
        {
          "question": "Що таке PropTypes і чому в TS-проєкті вони не потрібні?",
          "answer": "PropTypes — рантайм-перевірка типів props у чистому JS: у dev React виводить попередження при невідповідності. TS перевіряє <strong>під час компіляції</strong> (до запуску) + дає автодоповнення в IDE, тому в TS-проєкті типи оголошуються інтерфейсом, а PropTypes стає зайвим подвійним джерелом правди."
        }
      ]
    },
    {
      "id": "jsx-synthetic-events",
      "title": "⚡ SyntheticEvent та делегування подій",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">SyntheticEvent — крос-браузерна обгортка <span class=\"tag tag-key\">KEY</span></h3>\n<p>Кожен обробник у JSX (<code>onClick</code>, <code>onChange</code>, ...) отримує не нативну <code>Event</code>, а <code>SyntheticEvent</code> — обгортку з тим самим API (<code>target</code>, <code>preventDefault()</code>, <code>stopPropagation()</code>), але однаковою поведінкою в усіх браузерах. Доступ до нативної події — через <code>event.nativeEvent</code>.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function SearchInput() {\n  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n    console.log(e.target.value);      // SyntheticEvent API — однаково в кожному браузері\n    console.log(e.nativeEvent);       // справжня DOM-подія, якщо потрібна\n  }\n  return <input onChange={handleChange} />;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Делегування подій — один слухач замість тисячі</h3>\n<p>React не вішає окремий <code>addEventListener</code> на кожен елемент з <code>onClick</code>. Замість цього — <strong>один</strong> слухач на кореневому контейнері на кожен тип події; коли подія спливає туди, React через фібер-дерево визначає, який компонент мав її обробити, і викликає колбек. 1000 елементів з <code>onClick</code> = 1 нативний слухач; елементи можна вільно додавати/видаляти без ручного (де)реєстрування.</p>\n<h3 class=\"topic\">stopPropagation — пастка на межі React/DOM <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p><code>e.stopPropagation()</code> зупиняє спливання лише <strong>всередині React</strong>-делегування. Сторонній <code>addEventListener</code>, підключений напряму, усе одно може отримати подію — React-делегування й нативне DOM-спливання це окремі механізми.</p>\n<h3 class=\"topic\">preventDefault() vs stopPropagation() <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><code>preventDefault()</code> — скасовує <strong>дефолтну дію браузера</strong> (submit, перехід по <code>&lt;a href&gt;</code>, галочка чекбокса). <strong>Не</strong> впливає на спливання.</li>\n<li><code>stopPropagation()</code> — зупиняє <strong>подальше спливання</strong> по дереву. <strong>Не</strong> скасовує дефолтну дію.</li>\n</ul>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Потрібні обидва ефекти — виклич обидва методи. У React <code>return false</code> з обробника (на відміну від jQuery) <strong>не</strong> робить ні того, ні іншого.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що таке SyntheticEvent і навіщо React обгортає нативні події?",
          "answer": "Легка крос-браузерна обгортка над DOM-подією з <strong>однаковим API в усіх браузерах</strong>. Причини: узгодженість API незалежно від браузера + продуктивність — усі обробники реєструються через <strong>один</strong> слухач на корені (делегування), який React сам маршрутизує."
        },
        {
          "question": "Як влаштоване делегування подій у React (куди вішаються нативні слухачі)?",
          "answer": "React (17+) реєструє <strong>один</strong> нативний слухач на кореневому DOM-контейнері (раніше — на <code>document</code>) на кожен тип події. При спливанні до кореня React через мапу фібер-дерева визначає потрібний колбек. Дешевше при багатьох елементах (1000 кнопок = 1 слухач) і працює з динамічно доданими елементами без пере-підписування."
        },
        {
          "question": "Чому <code>stopPropagation()</code> не завжди зупиняє нативне спливання при змішуванні з <code>addEventListener</code>?",
          "answer": "React обробляє свою синтетичну систему окремо від нативного DOM. <code>stopPropagation()</code> зупиняє спливання <strong>всередині React-делегування</strong>, але подія могла дійти до кореневого нативного слухача чи до сторонніх обробників, підписаних напряму — звідси неочевидні баги при співіснуванні React і нативного коду."
        },
        {
          "question": "Різниця між <code>preventDefault()</code> і <code>stopPropagation()</code>, і що робить <code>return false</code>?",
          "answer": "<code>preventDefault()</code> скасовує дефолтну дію браузера, не чіпає спливання; <code>stopPropagation()</code> навпаки. Ортогональні — потрібні обидва, викликай обидва. <code>return false</code> у React (на відміну від jQuery) не робить нічого з цього."
        }
      ]
    },
    {
      "id": "fundamentals-lists-conditionals",
      "title": "🔁 Списки, умовний рендеринг, форми",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Умовний рендеринг</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "{isLoggedIn ? <Dashboard /> : <Login />}       // тернарник\n{unreadCount > 0 && <Badge count={unreadCount} />}   // && — показати або нічого\nif (loading) return <Spinner />; return <Content />; // рання early-return"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Пастка <code>&amp;&amp;</code> з числом:</strong> <code>{'{'}count &amp;&amp; &lt;Badge/&gt;{'}'}</code> — якщо <code>count === 0</code>, у DOM виведеться <strong>&quot;0&quot;</strong> (falsy, але не boolean). Фікс: <code>count &gt; 0 &amp;&amp; ...</code> або <code>Boolean(count) &amp;&amp; ...</code>.</p></div>\n<h3 class=\"topic\">Списки та <code>key</code> <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "<ul>\n  {users.map(user => (\n    <li key={user.id}>{user.name}</li>\n  ))}\n</ul>\n// key — стабільний ідентифікатор, за яким React зіставляє елементи\n// між рендерами. Без key (або key={index}) — баги при вставці/видаленні\n// посередині списку. Повне пояснення — розділ Reconciliation нижче."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\"><code>key</code> поза списками — скидання стану <span class=\"tag tag-key\">KEY</span></h3>\n<p>Зміна <code>key</code> на компоненті каже React: це «інший» екземпляр — старий демонтується (з усім станом/ефектами), новий монтується з нуля. Найчистіший спосіб «перезапустити» піддерево при зміні сутності — без <code>useEffect</code>, що вручну скидає кожне поле.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Профіль перемикається — форму треба скинути під нового користувача\n<ProfileForm key={userId} userId={userId} />\n// userId змінився → стара форма демонтована, нова — з чистим станом"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Форма — базовий приклад</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function LoginForm() {\n  const [email, setEmail] = useState('');\n\n  function handleSubmit(e: React.FormEvent) {\n    e.preventDefault();    // без цього — full page reload\n    login(email);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      <button type=\"submit\">Увійти</button>\n    </form>\n  );\n}"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому не можна індекс масиву як <code>key</code> у динамічних списках, і коли це прийнятно?",
          "answer": "<code>key</code> — те, за чим React ідентифікує, який елемент відповідає якому DOM-вузлу між рендерами. Якщо список змінює порядок чи додає/видаляє елементи посередині, а <code>key</code> — індекс, стан (напр. значення <code>&lt;input&gt;</code>) лишається прив'язаним до позиції, а не до логічного елемента. Індекс прийнятний лише для статичних незмінних списків."
        },
        {
          "question": "Які проблеми дає рендер великих списків без віртуалізації і як їх діагностувати?",
          "answer": "Тисячі DOM-вузлів одразу збільшують час первинного рендеру, памʼять і вартість кожного reconciliation-проходу. Діагностика — Profiler покаже довгий commit; рішення — віртуалізація (<code>react-window</code>/<code>@tanstack/react-virtual</code>), що рендерить лише видимі елементи."
        },
        {
          "question": "Чому не можна <code>key={Math.random()}</code>?",
          "answer": "Новий key щорендеру = React вважає елемент новим щоразу — знищує й пересоздає DOM-вузол, втрачає стан/фокус."
        },
        {
          "question": "Що виведе <code>{'{'}0 &amp;&amp; &lt;Badge/&gt;{'}'}</code>?",
          "answer": "&quot;0&quot; в DOM — типова пастка з fallback-through значеннями в JSX."
        }
      ]
    },
    {
      "id": "internals-reconciliation",
      "title": "🌳 Reconciliation, Virtual DOM, Fiber",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Virtual DOM — навіщо <span class=\"tag tag-key\">KEY</span></h3>\n<p>Пряма робота з реальним DOM повільна (reflow/repaint). React будує легкий JS-опис дерева UI (<strong>Virtual DOM</strong> — дерево елементів з <code>createElement</code>), порівнює нову версію зі старою (<strong>diffing</strong>) і застосовує до DOM тільки мінімальний набір змін (<strong>reconciliation</strong>).</p>\n<h3 class=\"topic\">Що це насправді за структура даних</h3>\n<p>Virtual DOM — не &quot;тіньова копія DOM&quot;, а звичайний плейн-обʼєкт JS. Ось що повертає <code>createElement</code>:</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "<div className=\"card\">\n  <span>Привіт</span>\n</div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// createElement('div', {className:'card'}, ...) поверне:\n{\n  type: 'div',\n  key: null,\n  ref: null,\n  props: {\n    className: 'card',\n    children: { type: 'span', props: { children: 'Привіт' } }\n  }\n}\n// Просто дані. Жодного звʼязку з реальним DOM API."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Diffing — евристика O(n), не оптимальний алгоритм <span class=\"tag tag-key\">KEY</span></h3>\n<p>Точний &quot;мінімальний edit distance&quot; між деревами — <strong>O(n³)</strong>, непридатний для UI. React свідомо йде на компроміс — евристичний <strong>O(n)</strong> на двох припущеннях:</p>\n<ol>\n<li><strong>Порівняння лише на одному рівні</strong> — React ніколи не шукає, чи &quot;переїхало&quot; піддерево в інше місце дерева; порівнює тільки елементи на тій самій позиції в тій самій батьківській ноді.</li>\n<li><strong>Різний тип → повний ремаунт</strong> — замість &quot;адаптувати&quot; <code>&lt;div&gt;</code> під <code>&lt;span&gt;</code>, простіше знести піддерево й побудувати заново.</li>\n</ol>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Це <strong>не недолік</strong>, а свідомий trade-off: рідкісні edge-кейси обмінюються на швидкість для 60 fps. Правила <code>key</code> і &quot;різний тип = ремаунт&quot; нижче — прямий наслідок цих двох припущень.</p></div>\n<h3 class=\"topic\">Поширена помилка: &quot;Virtual DOM = завжди швидше&quot; <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>Virtual DOM <strong>не</strong> швидший за прямі DOM-операції сам по собі — акуратний vanilla-JS, що точково міняє 3 вузли, обжене React у мікробенчмарку. Реальна вигода — у <strong>батчингу</strong>: замість &quot;20 змін стану → 20 DOM-мутацій&quot;, React збирає їх в одну діф-фазу → один мінімальний патч, плюс декларативний код без ручного відстеження &quot;що вже змінено&quot;.</p>\n<h3 class=\"topic\">Правила diffing-алгоритму</h3>\n<ul class=\"list\">\n<li><strong>Різний тип елемента</strong> — було <code>&lt;div&gt;</code>, стало <code>&lt;span&gt;</code> (або компонент → інший) — React <strong>знищує старе піддерево повністю</strong> й будує нове (стан втрачається).</li>\n<li><strong>Однаковий тип</strong> — той самий тег/компонент — React <strong>перевикористовує</strong> DOM-вузол, оновлює лише змінені атрибути. Стан зберігається.</li>\n</ul>\n<h3 class=\"topic\"><code>key</code> у списках — чому саме <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>Без <code>key</code> React зіставляє елементи <strong>за позицією</strong>. Вставка/видалення посередині зсуває наступні позиції — React думає, що змінився контент кожного елемента після точки вставки. З <code>index</code> як key — та сама проблема.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ key={index}: інпути \"стрибають\"\nlist = [A, B, C], keys = [0,1,2]\n// видалили A (з інпутом \"A-text\") → list = [B, C], keys = [0,1]\n// React: \"елемент key=0 змінив контент з A на B\" → перевикористовує вузол\n// значення інпуту \"A-text\" лишається — тепер під B!\n\n// ✅ key={item.id}: коректно\nkeys = [idA, idB, idC] → видалили A → keys = [idB, idC]\n// React бачить: вузла key=idA більше немає → unmount саме його; решта — як є"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> <code>key={index}</code> прийнятний <strong>лише</strong> якщо список статичний (не сортується/фільтрується) і без стану в елементах.</p></div>\n<h3 class=\"topic\">Fiber-архітектура <span class=\"tag tag-key\">KEY</span></h3>\n<p>Fiber (з React 16) — переписаний reconciler. Кожному елементу відповідає <strong>Fiber-вузол</strong> — обʼєкт з інформацією про компонент, props/state і, головне, <strong>звʼязками</strong> (child/sibling/return, як однозв'язний список замість рекурсивного стека). Це дозволяє React <strong>переривати</strong> рендеринг, віддавати керування браузеру (щоб не блокувати анімації/інпут) і продовжувати пізніше — чого не міг старий рекурсивний Stack reconciler.</p>\n<ul class=\"list\">\n<li><strong>До Fiber (React ≤15):</strong> синхронний рекурсивний прохід усього дерева; великий апдейт блокує main thread цілком.</li>\n<li><strong>З Fiber (React 16+):</strong> робота розбита на одиниці; React може зупинитись між ними, дати браузеру обробити подію, продовжити — основа Concurrent features.</li>\n</ul>\n<h3 class=\"topic\">Fiber Tree vs DOM Tree — що несе Fiber-вузол <span class=\"tag tag-key\">KEY</span></h3>\n<p>DOM-вузол — &quot;тупий&quot; опис розмітки. Fiber-вузол несе <strong>бухгалтерію React</strong>:</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Поле Fiber-вузла</th>\n<th>Навіщо</th>\n<th>Є в DOM?</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>type</code></td>\n<td>Тег ('div') або посилання на функцію-компонент</td>\n<td>Частково (tagName)</td>\n</tr>\n<tr>\n<td><code>key</code></td>\n<td>Ідентичність елемента в списку між рендерами</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><code>child / sibling / return</code></td>\n<td>Звʼязки дерева як однозв'язний список — обхід без рекурсії, переривний</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><code>alternate</code></td>\n<td>Посилання на Fiber попереднього рендеру — звідси diffing (current vs work-in-progress)</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><code>memoizedState</code></td>\n<td>Зв'язний список станів усіх хуків (по черзі виклику!)</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><code>pendingProps / memoizedProps</code></td>\n<td>Нові пропи vs застосовані на минулому рендері — основа diff</td>\n<td>❌</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Саме <code>memoizedState</code> — причина, чому <strong>порядок виклику хуків має бути стабільним</strong> (Rules of Hooks): React зіставляє хуки за позицією у зв'язному списку, а не за іменем змінної.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що таке Fiber і навіщо React відмовився від stack-реконсилятора?",
          "answer": "Fiber (React 16) — reconciler, де кожен елемент представлений вузлом з посиланнями на батька/дитину/сусіда, що дозволяє <strong>перервати й відновити</strong> узгодження по частинах замість синхронного рекурсивного проходу, який блокував main thread. Це фундамент concurrent-фіч (пріоритети рендеру)."
        },
        {
          "question": "Чим diffing React відрізняється від класичного tree-diff, і чому це компроміс?",
          "answer": "Класичний — O(n³); React — евристичний O(n) з двома припущеннями: (1) елементи різного типу дають різні дерева, (2) <code>key</code> підказує стабільність у списку. Швидко для типових UI, але може давати неоптимальні (хоч і коректні) результати при нетиповій зміні структури."
        },
        {
          "question": "Чи Virtual DOM завжди швидший за прямий DOM?",
          "answer": "Ні. Для поодиноких точкових мутацій прямий DOM може бути швидшим — VDOM додає накладні на створення об'єктів і diffing. Перевага — при <em>множинних</em> оновленнях: React батчить їх в один прохід і застосовує мінімальний набір DOM-операцій."
        },
        {
          "question": "Що таке Virtual DOM насправді?",
          "answer": "Не технологія прискорення, а JS-структура даних, що дозволяє порахувати мінімальний diff перед тим, як чіпати повільний реальний DOM."
        },
        {
          "question": "Чому diffing — O(n), а не точний O(n³)?",
          "answer": "React жертвує рідкісними edge-кейсами (переїзд піддерева між рівнями) заради швидкості, порівнюючи лише в межах одного рівня."
        },
        {
          "question": "Чим небезпечний <code>key={index}</code>?",
          "answer": "Конкретний приклад з інпутами/чекбоксами, що &quot;перестрибують&quot; значення при реордері (див. вище)."
        }
      ]
    },
    {
      "id": "internals-render-commit",
      "title": "🎬 Render vs Commit фази",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Дві фази роботи React <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><strong>1. Render (Reconciliation):</strong> React викликає тіла компонентів, будує work-in-progress Fiber-дерево, рахує diff. <strong>Можна переривати</strong> й <strong>відкидати</strong> без наслідків. <strong>Має бути чистою функцією</strong> — без мутацій зовнішнього стану, без side-effects (fetch, підписки, ручні DOM-мутації).</li>\n<li><strong>2. Commit:</strong> React застосовує зміни до реального DOM. <strong>Синхронна</strong>, не переривається. Тут: DOM-мутації, оновлення <code>refs</code>, <code>useLayoutEffect</code> (синхронно, до paint), а після paint — <code>useEffect</code> (асинхронно).</li>\n</ul>\n<h3 class=\"topic\">Чому side-effects заборонені в render <span class=\"tag tag-pit\">PITFALL</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ side-effect прямо в render\nfunction Profile({ userId }) {\n  fetch('/api/user/' + userId); // !!! render може викликатись кілька разів\n  return <div>...</div>;        // (StrictMode, Concurrent-переривання) — fetch зайвий раз\n}\n\n// ✅ side-effect у commit-фазі, через useEffect\nfunction Profile({ userId }) {\n  useEffect(() => { fetch('/api/user/' + userId); }, [userId]);\n  return <div>...</div>;   // гарантовано один раз на реальний commit\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Render-фазу React може почати, перервати й почати заново — work-in-progress рендер, що не дійшов до commit, ніколи не показується користувачу, і його side-effects не повинні бути видимими ззовні.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чим Render відрізняється від Commit, і чому це важливо для побічних ефектів?",
          "answer": "Render — виклик функцій компонентів і побудова Fiber-дерева; <strong>може бути перервана</strong> й не повинна мати side-effects (компонент може викликатись кілька разів за один логічний рендер). Commit — застосування до DOM + <code>useLayoutEffect</code>/<code>useEffect</code>; синхронна, не переривається."
        },
        {
          "question": "Чому <code>useEffect</code> безпечний для side-effects, а тіло компонента — ні?",
          "answer": "Тіло виконується в Render-фазі, яку React може перервати/повторити/відкинути — side-effect там міг би виконатись кілька разів або на «викинутому» результаті. <code>useEffect</code> запускається лише після Commit, рівно один раз на реально застосований рендер."
        }
      ]
    },
    {
      "id": "internals-rerenders-batching",
      "title": "⚡ Automatic Batching (React 18)",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Automatic Batching <span class=\"tag tag-new\">React 18</span></h3>\n<p>Batching — об'єднання кількох <code>setState</code> в межах одного тику в <strong>один</strong> ре-рендер. React 17 батчив лише всередині обробників подій; у <code>setTimeout</code>, промісах, нативних слухачах кожен <code>setState</code> давав окремий рендер. React 18 (<code>createRoot</code>) батчить <strong>скрізь</strong>.</p>\n<p>Що тригерить ре-рендер (власний state, батько, Context, <code>useReducer</code>) і як поводиться <code>&lt;StrictMode&gt;</code> — розділ «🔄 Життєвий цикл і події компонента» нижче.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// React 17: батчинг тільки в React event handlers\n// React 18: батчинг СКРІЗЬ (setTimeout, fetch/promise, native event listeners)\nsetTimeout(() => {\n  setCount(c => c + 1);      // React 18: ОДИН ре-рендер на обидва апдейти\n  setName('Roman');           // React 17: ДВА окремих ре-рендери\n}, 0);\n\n// Явно вимкнути батчинг (рідко) — flushSync()\nimport { flushSync } from 'react-dom';\nflushSync(() => { setOpen(true); });  // React синхронно рендерить + комітить тут\ntooltipRef.current.scrollIntoView();  // ← DOM уже оновлений"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Bailout — коли ре-рендеру не буде</h3>\n<p>Якщо <code>setState</code> отримує значення, рівне поточному за <code>Object.is</code>, React може «вийти» ще до рендеру дочірніх (<em>bailout</em>). Але сам компонент один раз усе одно викликається — тому <code>setState</code> у тілі рендеру без умови = нескінченний цикл, навіть якщо значення однакове.</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Batching стосується і React 19 Actions / <code>use()</code>: кілька <code>setState</code> у межах transition чи в async-екшені після <code>await</code> так само групуються. <code>flushSync</code> — виняток «мені потрібен DOM негайно», не інструмент за замовчуванням.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що таке batching і чим автоматичний batching у React 18 відрізняється від React 17?",
          "answer": "Batching — об'єднання кількох <code>setState</code> в один ре-рендер. React 17 батчив лише в обробниках подій; у <code>setTimeout</code>/промісах/нативних обробниках — окремий рендер на кожен. React 18 з <code>createRoot</code> робить batching <strong>автоматичним усюди</strong>."
        },
        {
          "question": "Як вимкнути batching і навіщо?",
          "answer": "<code>flushSync(() =&gt; setX(...))</code> з <code>react-dom</code> синхронно рендерить і комітить одразу. Потрібно рідко — коли наступний рядок має прочитати вже оновлений DOM (виміряти позицію, сфокусувати щойно показаний елемент). У 99% випадків batching бажаний."
        }
      ]
    },
    {
      "id": "hooks-why",
      "title": "🪝 Хуки: навіщо і правила",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Проблема до хуків (React &lt;16.8, 2019) <span class=\"tag tag-key\">KEY</span></h3>\n<p>Класи були єдиним способом дати компоненту стан і lifecycle. Дві болі:</p>\n<ol>\n<li><strong>Перевикористання stateful-логіки — лише через &quot;wrapper hell&quot;:</strong> переюзати логіку (підписка, debounce, auth-check) можна було лише через HOC/render-props — кожна обгортка додавала рівень у дереві й шар пропів.</li>\n<li><strong>Логіка розкидана по методах, а не по фічах:</strong> один lifecycle-метод містив код кількох незвʼязаних речей, а той самий &quot;fetch&quot;-код дублювався в методі оновлення.</li>\n</ol>\n<p><strong>Хуки (React 16.8)</strong> вирішили обидві: логіку можна винести у звичайну функцію (custom hook) без обгортки в дереві, і повʼязаний код (state + effect) живе поруч.</p>\n<h3 class=\"topic\">Звідки назва &quot;hook&quot;</h3>\n<p>Функція &quot;чіпляється&quot; (hooks into) за внутрішній механізм React — стан і lifecycle — ззовні, без класової ієрархії. Буквально &quot;гачок&quot; у React-рантайм.</p>\n<h3 class=\"topic\">Хук vs звичайна функція — принципова різниця <span class=\"tag tag-key\">KEY</span></h3>\n<p>У хука є доступ до <strong>персистентного слоту памʼяті</strong>, привʼязаного до конкретного Fiber-вузла (<code>memoizedState</code> — зв'язний список), який <strong>переживає</strong> кожен рендер саме цього компонента. Звичайна функція, викликана двічі, стартує &quot;з нуля&quot;.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function makeCounter() {\n  let count = 0;         // живе, поки живе замикання, не привʼязано до Fiber\n  return () => ++count;\n}\n// Викликана в тілі компонента — count скидається щорендеру\n\nconst [count, setCount] = useState(0);\n// значення живе в memoizedState ЦЬОГО Fiber-вузла, React повертає\n// його на кожному рендері — можливо ЛИШЕ у функції-компоненті/хуку"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> Хук отримує доступ до React-рантайму (слоту в Fiber-дереві), звичайна функція — ні. Тому хуки не можна &quot;просто викликати&quot; будь-де — звідси <strong>Правила хуків</strong>.</p></div>\n<h3 class=\"topic\">Два правила хуків <span class=\"tag tag-key\">KEY</span></h3>\n<ol>\n<li><strong>Лише на верхньому рівні</strong> — ніколи всередині <code>if</code>/циклів/вкладених функцій/<code>try-catch</code>/після раннього <code>return</code>. Хуки викликаються в <strong>однаковому порядку на кожному рендері</strong>.</li>\n<li><strong>Лише з React-функцій</strong> — компоненти або custom hooks. Ніколи зі звичайних JS-функцій, методів класу чи колбека поза компонентом.</li>\n</ol>\n<h3 class=\"topic\">Чому саме так — звʼязок з Fiber <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>React зіставляє хуки між рендерами <strong>за позицією виклику</strong> у зв'язному списку <code>memoizedState</code> — не за іменем змінної. Умовний виклик хука зсуває позицію <strong>усіх наступних</strong> хуків — React підставляє їм чужі значення.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ ЗЛАМАНО — умовний виклик хука\nfunction Profile({ userId }: Props) {\n  if (userId) {\n    const [name, setName] = useState('');   // хук #1 — умовний!\n  }\n  const [loading, setLoading] = useState(false); // хук #2 (або #1, залежно від userId!)\n  // Рендер 1 (userId є): порядок = [name, loading]\n  // Рендер 2 (userId falsy): порядок = [loading] → loading бере слот name — стан \"поїхав\"\n}\n\n// ✅ ПРАВИЛЬНО — хук завжди викликається, умова ВСЕРЕДИНІ\nfunction Profile({ userId }: Props) {\n  const [name, setName] = useState('');       // завжди хук #1\n  const [loading, setLoading] = useState(false); // завжди хук #2\n  useEffect(() => {\n    if (!userId) return;      // умова всередині ефекту, не навколо хука\n    fetchName(userId).then(setName);\n  }, [userId]);\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> Ловиться до рантайму: <code>eslint-plugin-react-hooks</code> (правило <code>rules-of-hooks</code>). Друге правило того ж плагіна, <code>exhaustive-deps</code>, стежить за коректністю dependency-масивів.</p></div>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> React Compiler автоматизує мемоізацію, але <strong>не скасовує</strong> ці два правила — виклик хука досі мусить бути передбачуваним і на верхньому рівні.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Яку проблему класів вирішили хуки, окрім «менше boilerplate»?",
          "answer": "<strong>Logic reuse:</strong> у класах переюзати stateful-логіку можна було лише через HOC/render props → «wrapper hell» і заплутане джерело props. Хуки виносять логіку в custom hook і композують без додаткових шарів у дереві."
        },
        {
          "question": "Чим виклик custom hook відрізняється від виклику функції-утиліти?",
          "answer": "Custom hook має доступ до <strong>персистентного слоту памʼяті</strong> поточного Fiber-вузла — може всередині викликати <code>useState</code>/<code>useEffect</code>, і значення переживають рендери. Звичайна функція стартує з нуля. Тому хук викликається лише з тіла компонента/хука й на верхньому рівні — ідентичність визначається позицією виклику."
        },
        {
          "question": "Чому хуки не можна викликати в умовах/циклах/вкладених функціях?",
          "answer": "React відстежує хуки за <strong>порядком виклику</strong>, а не за іменем (внутрішньо — зв'язний список на fiber-вузлі). Умовний виклик зсуває порядок між рендерами й прив'язує стан не до того хука — це реальна десинхронізація, не варнінг."
        },
        {
          "question": "Як обійти ситуацію, коли хук «умовно» потрібен?",
          "answer": "Хук викликається завжди, безумовно, а <em>умовною</em> робиться логіка всередині: напр. завжди <code>useEffect</code>, але підписку/запит обгорнути в <code>if</code>; або розбити компонент на два (умовний рендер обгортки, а не умовний виклик хука)."
        }
      ]
    },
    {
      "id": "hooks-usestate-patterns",
      "title": "🔢 useState: оновлювачі та ініціалізація",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">State — це знімок, не «жива» змінна <span class=\"tag tag-key\">KEY</span></h3>\n<p>У межах одного рендеру значення зі <code>useState</code> заморожене. Усі замикання цього рендеру (обробники, ефекти, таймери) «бачать» саме це значення. Це модель: рендер — чиста функція від пропів і знімка стану.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// 1. Функціональний оновлювач — обовʼязковий при кількох апдейтах / в async\nfunction Counter() {\n  const [n, setN] = useState(0);\n  function addThree() {\n    setN(n + 1); setN(n + 1); setN(n + 1);  // усі три читають n===0 → підсумок: 1\n    // setN(v => v + 1) тричі → підсумок: 3\n  }\n  useEffect(() => {\n    const id = setInterval(() => setN(v => v + 1), 1000); // ✅ не залежить від n\n    return () => clearInterval(id);\n  }, []);              // порожній масив — бо оновлювач не читає n напряму\n}\n\n// 2. Lazy initializer — важкий старт рахується один раз\nconst [tree, setTree] = useState(() => parseHugeJSON(raw));   // не parseHugeJSON(raw)\n\n// 3. Обʼєкт у state — заміна, не мутація\nsetForm(f => ({ ...f, email: value }));   // ✅ новий обʼєкт\n// form.email = value; setForm(form);     // ❌ той самий референс → рендер не спрацює"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Кілька <code>useState</code> vs один обʼєкт vs <code>useReducer</code></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Ситуація</th>\n<th>Вибір</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Незалежні поля, що змінюються окремо</td>\n<td>кілька <code>useState</code> — простіше</td>\n</tr>\n<tr>\n<td>Поля завжди змінюються разом (напр. <code>{x, y}</code>)</td>\n<td>один <code>useState</code>-обʼєкт</td>\n</tr>\n<tr>\n<td>Наступний стан залежить від попереднього, багато переходів</td>\n<td><code>useReducer</code> — переходи в одному місці, легше тестувати</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Правило: якщо в <code>onChange</code> ти читаєш поточний стан, щоб порахувати наступний — майже завжди має бути оновлювач-функція.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Коли <code>setX(x + 1)</code> і <code>setX(v =&gt; v + 1)</code> дають різний результат?",
          "answer": "Коли за один цикл потрібно кілька оновлень поспіль або оновлення йде із замикання (таймер, проміс). <code>setX(x + 1)</code> двічі → <code>+1</code> (обидва читають той самий <code>x</code>); <code>setX(v =&gt; v + 1)</code> двічі → <code>+2</code> (React передає найсвіжіше значення з черги)."
        },
        {
          "question": "Чим <code>useState(() =&gt; init())</code> відрізняється від <code>useState(init())</code>?",
          "answer": "<code>useState(init())</code> викликає <code>init()</code> на <strong>кожному</strong> рендері й одразу відкидає результат — марна робота. <code>useState(() =&gt; init())</code> (lazy) React викликає рівно раз, при монтуванні."
        },
        {
          "question": "Чому <code>console.log(x)</code> одразу після <code>setX</code> друкує старе значення?",
          "answer": "<code>x</code> — <strong>знімок</strong> стану для конкретного рендеру, незмінний до його кінця. <code>setX</code> не мутує <code>x</code>, а планує наступний рендер. Нове значення — лише як нова змінна <code>x</code> у наступному рендері."
        }
      ]
    },
    {
      "id": "hooks-catalog-full",
      "title": "📋 Повний каталог хуків",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Мапа всіх хуків за категоріями. Ті, що мають детальний розбір в інших розділах (useEffect/useLayoutEffect/useReducer/StrictMode — «🔄 Життєвий цикл»; useMemo/useCallback — «🧠 Мемоізація»; useRef — «🎯 useRef»; useTransition/useDeferredValue — свій розділ), тут — коротким рядком з переходом.</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Хук</th>\n<th>Категорія</th>\n<th>З версії</th>\n<th>Навіщо</th>\n<th>Edge case</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>useState</code></td>\n<td>State</td>\n<td>16.8</td>\n<td>Локальний стан, незалежні прості значення</td>\n<td>Lazy initializer — <code>useState(() =&gt; expensive())</code></td>\n</tr>\n<tr>\n<td><code>useReducer</code></td>\n<td>State</td>\n<td>16.8</td>\n<td>Складний повʼязаний state, явні action-переходи</td>\n<td>Детально — «🔄 Життєвий цикл» (свій lazy-init)</td>\n</tr>\n<tr>\n<td><code>useEffect</code></td>\n<td>Effect</td>\n<td>16.8</td>\n<td>Side-effects після paint (fetch, підписки)</td>\n<td>Детально — «🔄 Життєвий цикл» (stale closures, cleanup)</td>\n</tr>\n<tr>\n<td><code>useLayoutEffect</code></td>\n<td>Effect</td>\n<td>16.8</td>\n<td>Синхронно до paint — читання layout</td>\n<td>Детально — «🔄 Життєвий цикл»</td>\n</tr>\n<tr>\n<td><code>useInsertionEffect</code></td>\n<td>Effect</td>\n<td>18</td>\n<td>Вставка <code>&lt;style&gt;</code> ДО useLayoutEffect — для CSS-in-JS бібліотек</td>\n<td>Не для прикладного коду — немає доступу до refs</td>\n</tr>\n<tr>\n<td><code>useRef</code></td>\n<td>Ref</td>\n<td>16.8</td>\n<td>DOM-ref / мутабельне значення без ре-рендеру</td>\n<td>Детально — «🎯 useRef»</td>\n</tr>\n<tr>\n<td><code>useImperativeHandle</code></td>\n<td>Ref</td>\n<td>16.8</td>\n<td>Кастомізує, що батько бачить через <code>ref</code> (з <code>forwardRef</code> або React 19 <code>ref</code>-проп)</td>\n<td>Легко зловживати — імперативний API має лишатись винятком</td>\n</tr>\n<tr>\n<td><code>useMemo</code></td>\n<td>Performance</td>\n<td>16.8</td>\n<td>Кешує дороге обчислення / стабільний референс</td>\n<td>Детально — «🧠 Мемоізація» (не гарантія!)</td>\n</tr>\n<tr>\n<td><code>useCallback</code></td>\n<td>Performance</td>\n<td>16.8</td>\n<td>Кешує референс функції</td>\n<td>Детально — «🧠 Мемоізація»</td>\n</tr>\n<tr>\n<td><code>useContext</code></td>\n<td>Context</td>\n<td>16.8</td>\n<td>Читає значення найближчого Provider</td>\n<td>Ре-рендер на <strong>будь-яку</strong> зміну value провайдера (розділ &quot;Межі стану та Context&quot;)</td>\n</tr>\n<tr>\n<td><code>useTransition</code></td>\n<td>Concurrent</td>\n<td>18</td>\n<td>Неурочна дія (функція-апдейт)</td>\n<td>Детально — «useTransition / useDeferredValue»</td>\n</tr>\n<tr>\n<td><code>useDeferredValue</code></td>\n<td>Concurrent</td>\n<td>18</td>\n<td>Неурочне значення (ззовні)</td>\n<td>Детально — «useTransition / useDeferredValue»</td>\n</tr>\n<tr>\n<td><code>useId</code></td>\n<td>Misc</td>\n<td>18</td>\n<td>Унікальний id, стабільний між сервером і клієнтом</td>\n<td><code>Math.random()</code>/лічильник ламається при SSR (hydration mismatch); <code>useId</code> однаковий на сервері й клієнті</td>\n</tr>\n<tr>\n<td><code>useSyncExternalStore</code></td>\n<td>Misc</td>\n<td>18</td>\n<td>Коректна підписка на зовнішнє джерело стану поза React</td>\n<td>На ньому побудований Zustand; tearing-safe у concurrent, на відміну від <code>useEffect</code>+<code>useState</code></td>\n</tr>\n<tr>\n<td><code>useDebugValue</code></td>\n<td>Misc</td>\n<td>16.8</td>\n<td>Мітка custom hook у React DevTools</td>\n<td>Працює лише в custom hooks — суто DX</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Нішеві хуки — мінімальний приклад</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// useId — стабільний id для звʼязки label ↔ input (і для aria-*)\nfunction Field({ label }: { label: string }) {\n  const id = useId();\n  return <><label htmlFor={id}>{label}</label><input id={id} /></>;\n  // ❌ не для ключів списку — id один на компонент, не на елемент\n}\n\n// useSyncExternalStore — підписка на джерело поза React без tearing\nfunction useOnlineStatus() {\n  return useSyncExternalStore(\n    (cb) => {\n      window.addEventListener('online', cb);\n      window.addEventListener('offline', cb);\n      return () => {\n        window.removeEventListener('online', cb);\n        window.removeEventListener('offline', cb);\n      };\n    },\n    () => navigator.onLine,          // getSnapshot (клієнт)\n    () => true,                      // getServerSnapshot (SSR)\n  );\n}\n\n// useDebugValue — мітка custom hook у DevTools\nfunction useUser(id: string) {\n  const user = /* ... */;\n  useDebugValue(user ? user.name : 'loading');\n  return user;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <code>useImperativeHandle</code> — приклад у «🎯 useRef». <code>useInsertionEffect</code> у прикладному коді не викликають — це API для авторів CSS-in-JS.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Які хуки рідко потрібні у продуктовому коді і чому існують?",
          "answer": "<code>useImperativeHandle</code>, <code>useDebugValue</code>, <code>useId</code>, <code>useSyncExternalStore</code>. Перший — для контрольованого імперативного API (<code>.focus()</code> на кастомному wrapper'і); <code>useSyncExternalStore</code> — коректна підписка на поза-React сховище без tearing у concurrent (на ньому побудований Zustand)."
        },
        {
          "question": "Чому підписку на зовнішнє джерело краще через <code>useSyncExternalStore</code>, а не <code>useEffect</code>+<code>useState</code>?",
          "answer": "Ручний <code>useEffect</code> підписується <strong>після</strong> paint — між рендером і ефектом видно застаріле значення, а в concurrent різні частини дерева можуть відрендеритись з різними значеннями (tearing). <code>useSyncExternalStore</code> читає <code>getSnapshot</code> синхронно під рендер (весь рендер бачить одне значення) + має <code>getServerSnapshot</code> для SSR."
        }
      ]
    },
    {
      "id": "memoization-concept",
      "title": "🧠 Мемоізація та референсна стабільність",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Що таке мемоізація — загальна техніка <span class=\"tag tag-key\">KEY</span></h3>\n<p>Мемоізація — класична техніка з CS: <strong>кешуй результат обчислення, ключем — його вхідні дані</strong>. Наступного разу з тими самими вхідними даними — поверни збережений результат. Плата — памʼять; вигода — CPU. Мінімальна реалізація (класичне питання — написати самому):</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function memoize<Args extends unknown[], R>(fn: (...args: Args) => R) {\n  const cache = new Map<string, R>();\n  return (...args: Args): R => {\n    const key = JSON.stringify(args);       // ключ кешу — вхідні дані\n    if (cache.has(key)) return cache.get(key)!;\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n}\nconst fastSquare = memoize((n: number) => n * n);\nfastSquare(5); // рахує\nfastSquare(5); // з кешу, миттєво — той самий \"ключ\" (5)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Одна ідея, три &quot;одиниці&quot; кешування в React <span class=\"tag tag-key\">KEY</span></h3>\n<p><code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code> — НЕ три окремі концепції, а <strong>та сама</strong> схема &quot;кеш за ключем&quot;:</p>\n<ul class=\"list\">\n<li><strong>useMemo</strong> — кешує <strong>значення</strong>. Ключ — deps-масив. <code>useMemo(fn, deps)</code> ≈ <code>memoize(fn)</code> з ключем <code>deps</code>.</li>\n<li><strong>useCallback</strong> — кешує <strong>посилання на функцію</strong> — окремий випадок useMemo (<code>useCallback(fn, deps)</code> ≈ <code>useMemo(() =&gt; fn, deps)</code>).</li>\n<li><strong>React.memo</strong> — кешує <strong>результат рендеру компонента</strong>. Ключ — props.</li>\n</ul>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Елемент схеми &quot;кеш за ключем&quot;</th>\n<th>У React</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Ключ кешу</td>\n<td>Deps-масив (useMemo/useCallback) або props (React.memo)</td>\n</tr>\n<tr>\n<td>Порівняння ключа</td>\n<td><code>Object.is</code> по кожному елементу (не глибоке!)</td>\n</tr>\n<tr>\n<td>Інвалідація</td>\n<td>Ключ змінився → перерахувати; не змінився → віддати кеш</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Не плутати зі схожими словами <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p><code>memoizedState</code> у Fiber-вузлі — <strong>не</strong> ця техніка: це слот &quot;останнє відоме значення хука&quot;, без ключа й інвалідації. А Next.js <strong>Request Memoization</strong> — навпаки, справжній приклад цієї схеми (дедуплікація однакових <code>fetch</code> у межах одного рендеру, ключ — URL+опції). React Compiler автоматизує застосування цієї схеми. <code>useRef</code> — стабільний контейнер, але <strong>не</strong> кеш-за-ключем.</p>\n<h3 class=\"topic\">useMemo / useCallback — коли реально треба <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p><code>useMemo(fn, deps)</code> кешує <strong>значення</strong> <code>fn()</code>; <code>useCallback(fn, deps)</code> — саму <strong>функцію</strong>. Обидва не безкоштовні (порівняння <code>deps</code> + зберігання кешу коштує). Виправдані, коли: (а) обчислення справді важке, або (б) стабільність референсу критична — проп до <code>React.memo</code>-компонента чи залежність іншого хука. Інакше — складність без користі; спершу профілюй.</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>useMemo — підказка, не гарантія [PITFALL]:</strong> React залишає за собою право <strong>відкинути</strong> закешоване значення й порахувати заново (напр. звільнити память). Код <strong>не повинен покладатись</strong> на useMemo для коректності — лише для продуктивності. Потрібна гарантія &quot;рівно раз&quot; — <code>useRef</code> з лінивою ініціалізацією або <code>useEffect</code>.</p></div>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>useCallback не «чинить» сам себе [PITFALL]:</strong> референс стабільний, лише якщо стабільні ВСІ значення в dependency array. Якщо один з deps — новий обʼєкт/масив щорендеру, <code>useCallback</code> поверне нову функцію.</p></div>\n<h3 class=\"topic\">React.memo — коли працює, коли ні <span class=\"tag tag-key\">KEY</span></h3>\n<p>Та сама схема &quot;кеш за ключем&quot;, ключ — <strong>props</strong>. Порівнює <strong>поверхнево</strong> (<code>Object.is</code> по кожному ключу) і скіпає ре-рендер, якщо всі рівні. Не рятує, якщо проп — новий обʼєкт/масив/функція на кожен рендер батька. Можна передати власний компаратор — рідко потрібно і легко зламати.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const Row = React.memo(\n  function Row({ item, onSelect }: RowProps) {\n    return <li onClick={() => onSelect(item.id)}>{item.title}</li>;\n  },\n  (prev, next) => prev.item.id === next.item.id && prev.item.title === next.item.title,\n  // кастомний компаратор — true = \"пропи рівні, скіпнути рендер\"\n  // ⚠️ забудеш порівняти якийсь проп — компонент застрягне зі старими даними\n);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Референсна стабільність — головна причина, чому memo &quot;не працює&quot; <span class=\"tag tag-pit\">PITFALL</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ Новий референс щорендеру\nfunction Parent() {\n  const [n, setN] = useState(0);\n  return <Row style={{ color: 'red' }}  // новий {} щоразу\n    onSelect={(id) => doSomething(id)} // нова функція щоразу\n  />;               // memo(Row) все одно ре-рендериться\n}\n\n// ✅ Стабілізовано useMemo/useCallback\nfunction Parent() {\n  const [n, setN] = useState(0);\n  const style = useMemo(() => ({ color: 'red' }), []);\n  const onSelect = useCallback((id) => doSomething(id), []);\n  return <Row style={style} onSelect={onSelect} />;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Як саме ре-рендериться дерево — покроковий приклад <span class=\"tag tag-key\">KEY</span></h3>\n<p>Дерево з трьох рівнів: <code>Parent</code> (тримає <code>useState</code>) → <code>Child</code> → <code>Grandchild</code>. Жоден проп не змінюється — лише <code>Parent</code> оновлює власний стан.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Parent() {\n  const [count, setCount] = useState(0);\n  return (\n    <>\n      <button onClick={() => setCount(c => c + 1)}>{count}</button>\n      <Child label=\"static\" />                 {/* проп НЕ змінюється */}\n    </>\n  );\n}\nfunction Child({ label }: { label: string }) { return <Grandchild label={label} />; }\nfunction Grandchild({ label }: { label: string }) { return <span>{label}</span>; }"
        },
        {
          "kind": "paragraph",
          "html": "<ul class=\"list\">\n<li><strong>❌ Без memo:</strong> клік → <code>setCount</code> → <code>Parent</code> ре-рендериться → <strong>за замовчуванням React рендерить усе піддерево</strong> → <code>Child</code> рендериться → всередині повертає <code>&lt;Grandchild&gt;</code> → <code>Grandchild</code> теж. Три рендери на клік, хоча <code>label</code> не змінився.</li>\n<li><strong>✅ memo(Child):</strong> при кліку <code>Parent</code> рендериться (власний state), <code>Child</code> отримує ре-рендер-запит, але <code>React.memo</code> бачить <code>label=&quot;static&quot;</code> не змінився → <strong>&quot;not rendering&quot;</strong>. Оскільки <code>Child</code> не виконався — <code>Grandchild</code> <strong>взагалі не викликається</strong>, каскад зупинився на межі.</li>\n</ul>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <code>memo</code> — <strong>межа (boundary)</strong>, а не глобальний перемикач: зупиняє поширення ре-рендеру в тому місці дерева, де стоїть. Досить поставити перед &quot;важким&quot; піддеревом, яке не залежить від того, що змінюється вище.</p></div>\n<p>Як знайти зайвий ре-рендер (Profiler, &quot;Why did this render?&quot;) — розділи &quot;Performance Deep Dive&quot; та &quot;React DevTools як Senior&quot; нижче.</p>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Поясни мемоізацію (без React), і чому useMemo/useCallback/React.memo — одна ідея.",
          "answer": "Мемоізація — кешування результату за ключем вхідних даних (памʼять в обмін на швидкість). У React ця схема застосована до трьох «одиниць»: <code>useMemo</code> кешує значення (ключ — deps), <code>useCallback</code> — посилання на функцію (той самий useMemo), <code>React.memo</code> — результат рендеру (ключ — props). В усіх трьох ключ порівнюється через Object.is/поверхнево."
        },
        {
          "question": "Fiber-поле memoizedState — це та сама техніка, що useMemo?",
          "answer": "Ні. memoizedState — &quot;слот останнього значення&quot; хука, без ключа й інвалідації. useMemo/useCallback/React.memo — справжній кеш-за-ключем з умовою скидання (зміна deps/props). Схожа за назвою, але окрема — як і Next.js Request Memoization, що навпаки є справжнім кешем-за-ключем."
        },
        {
          "question": "Коли <code>React.memo</code> реально допомагає, а коли лише додає витрати?",
          "answer": "Корисний для «важких» компонентів зі стабільними props. Якщо компонент дешевий або props (об'єкти/функції/масиви) створюються заново щоразу — <code>memo</code> лише додає витрати на поверхневе порівняння, бо воно все одно «провалиться»."
        },
        {
          "question": "<code>memo</code> не допоміг — з чого почнеш дебаг?",
          "answer": "Спершу <strong>виміряти</strong>: Profiler → «Why did this render?» назве причину (<code>props changed</code>/<code>hooks changed</code>/<code>parent rendered</code>). Найчастіше — <strong>новий референс пропу</strong> щорендеру (інлайновий <code>{}</code>/стрілка), що провалює поверхневе порівняння. Далі — стабілізувати проп через <code>useMemo</code>/<code>useCallback</code> або підняти вище."
        }
      ]
    },
    {
      "id": "hooks-deep-dive",
      "title": "🔄 Життєвий цикл і події компонента",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Три фази життя компонента <span class=\"tag tag-key\">KEY</span></h3>\n<p>Кожен компонент проходить: <strong>Mount</strong> (перше створення й вставка в DOM) → <strong>Update</strong> (на кожен ре-рендер: зміна props/state/context) → <strong>Unmount</strong> (видалення з DOM). Класи виражали це методами (<code>componentDidMount</code> тощо); функціональні — через <code>useEffect</code> і порядок виконання тіла функції.</p>"
        },
        {
          "kind": "mermaid",
          "code": "flowchart LR\n  S[\"Компонент<br/>оголошено в JSX\"] --> MOUNT[\"🟢 MOUNT<br/>перший рендер +<br/>вставка у DOM\"]\n  MOUNT --> UPDATE[\"🔵 UPDATE<br/>ре-рендер на зміну<br/>props / state / context\"]\n  UPDATE -->|\"знову змінилось\"| UPDATE\n  UPDATE --> UNMOUNT[\"🔴 UNMOUNT<br/>прибрано з DOM +<br/>cleanup ефектів\"]\n  MOUNT -->|\"прибрано одразу\"| UNMOUNT"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Тіло функції = render-фаза (чиста, без side-effects); усе інше робить React у commit-фазі. Побічні ефекти живуть лише в useEffect.</strong></p>"
        },
        {
          "kind": "mermaid",
          "code": "flowchart TB\n  subgraph MOUNT[\"🟢 MOUNT — один раз\"]\n    M1[\"Виклик тіла функції<br/>render-фаза: чиста, повертає JSX\"] --> M2[\"React комітить DOM<br/>+ присвоює refs\"]\n    M2 --> M3[\"useLayoutEffect<br/>синхронно, ДО paint\"]\n    M3 --> M4[\"🖌️ Браузер малює екран\"]\n    M4 --> M5[\"useEffect<br/>асинхронно, ПІСЛЯ paint\"]\n  end\n  subgraph UPDATE[\"🔵 UPDATE — на кожну зміну props / state / context\"]\n    U1[\"Повторний виклик тіла функції\"] --> U2[\"React диффить і комітить<br/>лише те, що змінилось\"]\n    U2 --> U3[\"Залежності useEffect змінились?<br/>ТАК → cleanup старого ефекту, потім новий запуск<br/>НІ → ефект пропускається\"]\n  end\n  subgraph UNMOUNT[\"🔴 UNMOUNT — один раз\"]\n    X1[\"React прибирає вузол з DOM\"] --> X2[\"Запуск УСІХ cleanup-функцій<br/>return з useEffect / useLayoutEffect\"]\n  end\n  M5 --> U1\n  U3 -->|\"знову змінились props / state\"| U1\n  U3 --> X1"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert\"><span class=\"icon\">🧭</span><p> Як читати діаграму: <strong>тіло функції викликається на кожній фазі Mount і Update</strong> — функціональний аналог <code>render()</code>. А <strong>коли</strong> спрацює ефект, вирішує масив залежностей: <code>useEffect(fn, [])</code> = лише Mount + Unmount; <code>useEffect(fn, [dep])</code> = Mount + кожен Update, де змінився <code>dep</code>; <code>useEffect(fn)</code> без масиву = після кожного рендеру.</p></div>\n<h3 class=\"topic\">1. MOUNT — що відбувається за першим разом</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Крок</th>\n<th>Що робить React</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Виклик тіла функції</td>\n<td>render-фаза — чиста, повертає JSX; тут <strong>не можна</strong> side-effects</td>\n</tr>\n<tr>\n<td>Commit у DOM</td>\n<td>React вставляє вузли, присвоює <code>ref.current</code></td>\n</tr>\n<tr>\n<td><code>useLayoutEffect</code></td>\n<td>синхронно, <strong>ДО</strong> paint — читання layout / синхронні правки DOM без «флешу»</td>\n</tr>\n<tr>\n<td>🖌️ Paint</td>\n<td>браузер малює екран</td>\n</tr>\n<tr>\n<td><code>useEffect</code></td>\n<td>асинхронно, <strong>ПІСЛЯ</strong> paint — fetch, підписки, аналітика (95% випадків)</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">2. RE-RENDER — 4 тригери <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Тригер</th>\n<th>Деталь</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Власний <code>state</code></td>\n<td><code>setState</code> тим самим значенням → React <strong>бейлить</strong> (<code>Object.is</code>)</td>\n</tr>\n<tr>\n<td>Ре-рендер батька</td>\n<td>дитина рендериться <strong>теж</strong>, навіть якщо пропи не змінились — доки не стоїть <code>React.memo</code></td>\n</tr>\n<tr>\n<td>Зміна <code>Context</code></td>\n<td>усі споживачі провайдера ре-рендеряться на будь-яку зміну <code>value</code></td>\n</tr>\n<tr>\n<td><code>useReducer</code> dispatch</td>\n<td>тригерить рендер <strong>навіть тим самим значенням</strong> — на відміну від <code>useState</code></td>\n</tr>\n</tbody>\n</table></div>\n<p>Кілька <code>setState</code> в одному тику зливаються в один ре-рендер (batching) — розділ «⚡ Automatic Batching».</p>\n<h3 class=\"topic\">useReducer vs useState — коли який</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// useState — незалежні прості значення\nconst [name, setName] = useState('');\nconst [loading, setLoading] = useState(false);\n\n// useReducer — повʼязаний складний state, переходи через явні action-и\nconst [state, dispatch] = useReducer(reducer, { data: null, loading: false, error: null });\ndispatch({ type: 'FETCH_START' });\ndispatch({ type: 'FETCH_SUCCESS', payload: data });"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// useReducer має lazy-варіант — третій аргумент \"init\" застосовується до initialArg раз при mount\nfunction init(initialCount: number) {\n  return { count: initialCount, history: [] };  // дороге обчислення initial-стану\n}\nconst [state, dispatch] = useReducer(reducer, initialCount, init);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">3. Зміна залежностей ефекту <span class=\"tag tag-key\">KEY</span></h3>\n<p>Коли значення в <code>deps</code> змінилось: React спершу викликає <strong>cleanup попереднього</strong> запуску, потім запускає ефект <strong>наново</strong> з актуальним замиканням. Якщо <code>deps</code> не змінились — ефект пропускається. Порівняння — <code>Object.is</code> (поверхнево): новий обʼєкт/масив/функція щорендеру «змінює» залежність — типова причина зайвих запусків і нескінченних циклів.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Lifecycle-аналогія:\nuseEffect(() => {\n  // componentDidMount + componentDidUpdate\n  return () => { /* componentWillUnmount */ };\n}, [dep]);        // [] = mount/unmount; без масиву = кожен рендер; [dep] = при зміні dep\n\n// Stale closure bug!\nuseEffect(() => {\n  const id = setInterval(() => {\n    setCount(count + 1);  // ❌ stale count=0 назавжди\n  }, 1000);\n  return () => clearInterval(id);\n}, []);\n// ✅ Функціональний апдейт — не залежить від closure\nsetCount(c => c + 1);"
        },
        {
          "kind": "paragraph",
          "html": "<p>Ще один обхід stale closure — «живе» значення в <code>useRef</code> (розділ «🎯 useRef»). Лінтер <code>exhaustive-deps</code> стежить за повнотою масиву.</p>\n<h3 class=\"topic\">useLayoutEffect vs useEffect</h3>\n<ul class=\"list\">\n<li><strong>useEffect (асинхронний)</strong> — після paint. Не блокує браузер. 95% випадків (fetch, підписки, аналітика).</li>\n<li><strong>useLayoutEffect (синхронний)</strong> — до paint, одразу після DOM-мутацій. Для читання layout/dimensions і синхронних правок DOM — уникнути візуального «флешу».</li>\n</ul>\n<h3 class=\"topic\">4. useEffect cleanup — механізм <span class=\"tag tag-key\">KEY</span></h3>\n<p>Cleanup — функція, яку <strong>повертає</strong> колбек <code>useEffect</code>. React кличе її <strong>перед кожним наступним запуском</strong> ефекту і <strong>при розмонтуванні</strong> — щоб прибрати все, що ефект «відкрив».</p>\n<p><strong>Коли cleanup спрацьовує:</strong> перед повторним запуском (змінилась залежність); при unmount; у dev зі <code>&lt;StrictMode&gt;</code> — додатково після першого «пробного» mount.</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Setup (що ефект відкрив)</th>\n<th>Cleanup (що повернути)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>setInterval</code> / <code>setTimeout</code></td>\n<td><code>clearInterval</code> / <code>clearTimeout</code></td>\n</tr>\n<tr>\n<td><code>addEventListener</code></td>\n<td><code>removeEventListener</code> — <strong>та сама функція!</strong></td>\n</tr>\n<tr>\n<td><code>fetch</code> / async-запит</td>\n<td><code>AbortController.abort()</code></td>\n</tr>\n<tr>\n<td><code>WebSocket</code> / subscription</td>\n<td><code>.close()</code> / <code>unsubscribe()</code></td>\n</tr>\n<tr>\n<td>Observer (Intersection / Resize / Mutation)</td>\n<td><code>.disconnect()</code></td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Event listener — та сама референція в add і remove\nuseEffect(() => {\n  const onResize = () => setWidth(window.innerWidth);\n  window.addEventListener('resize', onResize);\n  return () => window.removeEventListener('resize', onResize);\n}, []);\n\n// Async fetch — race-condition guard + AbortController\nuseEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal })\n    .then(r => r.json())\n    .then(setData)\n    .catch(e => { if (e.name !== 'AbortError') throw e; }); // ігнор скасування\n  return () => controller.abort();  // скасувати при зміні url / unmount\n}, [url]);\n\n// Альтернатива без abort — прапорець-guard (запит усе одно доходить):\nuseEffect(() => {\n  let active = true;\n  fetchData().then(d => { if (active) setData(d); });\n  return () => { active = false; };  // ігнорувати stale-відповідь\n}, [url]);\n\n// Subscription — WebSocket / RxJS / Centrifugo\nuseEffect(() => {\n  const sub = channel.subscribe(onMessage);\n  return () => sub.unsubscribe();\n}, [channel]);"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Типові помилки cleanup [PITFALL]:</strong> порожній cleanup там, де потрібен (витік слухача/інтервалу); <code>useEffect(async () =&gt; …)</code> повертає Promise, а не cleanup (оголошуй <code>async</code> усередині, ефект лишай синхронним); різні референції в add/remove; оновлення стану після unmount (знімається <code>AbortController</code>/<code>active</code>-guard).</p></div>\n<p>Повний приклад <code>fetch</code> + <code>AbortController</code> з автентифікацією — розділ «🌐 Fetch, axios...»; мапінг cleanup ↔ <code>componentWillUnmount</code> — «🏛️ Class vs Functional».</p>\n<h3 class=\"topic\">5. UNMOUNT</h3>\n<p>React прибирає вузол з DOM і запускає <strong>всі</strong> cleanup-функції з <code>useEffect</code>/<code>useLayoutEffect</code> цього компонента (і піддерева). Після цього таймери зупинені, слухачі зняті, підписки закриті, запити скасовані.</p>\n<h3 class=\"topic\">6. &lt;StrictMode&gt; — подвійний виклик лише в dev <span class=\"tag tag-key\">KEY</span></h3>\n<p>Runtime-перемикач ЛИШЕ для dev-збірки. Навмисно ДВІЧІ викликає тіло компонента, ініціалізатори <code>useState</code>/<code>useMemo</code>/<code>useReducer</code> і (React 18+) mount-фазу ефектів — <code>mount → unmount → mount</code>. <strong>Навіщо:</strong> викрити нечисті компоненти й ефекти без cleanup у розробці. Це той самий сценарій, що React виконує в concurrent-режимі прода.</p>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>У продакшн-білді нічого не подвоюється.</strong> Правильна реакція на подвійний <code>mount</code>/<code>fetch</code> у dev — не «прибрати <code>&lt;StrictMode&gt;</code>», а зробити ефект <strong>ідемпотентним</strong>: cleanup + <code>AbortController</code>. Забутий cleanup → після двох <code>mount</code> без <code>unmount</code> отримаєш два інтервали / дубльовані підписки.</p></div>\n<p>Обгортається <strong>один раз, навколо кореня</strong> (у Vite/CRA — навколо <code>&lt;App /&gt;</code>; у Next.js App Router увімкнено за замовчуванням).</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Подвоюється не лише ефект — будь-який <code>console.log</code> у тілі компонента/ефекті виведеться <strong>двічі</strong>.</p></div>\n<h3 class=\"topic\">StrictMode (React) vs <code>'use strict'</code> (JavaScript) — не плутати <span class=\"tag tag-pit\">PITFALL</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th><code>&lt;React.StrictMode&gt;</code></th>\n<th><code>'use strict'</code></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Що це</td>\n<td>React-компонент (JSX-обгортка)</td>\n<td>Директива мови JavaScript</td>\n</tr>\n<tr>\n<td>Хто виконує</td>\n<td>React runtime</td>\n<td>JS-рушій (V8 та ін.)</td>\n</tr>\n<tr>\n<td>Діє де</td>\n<td>Лише в dev-збірці</td>\n<td>Завжди — dev і прод однаково</td>\n</tr>\n<tr>\n<td>Що робить</td>\n<td>Подвоює рендер/ефекти, щоб виявити нечистоту</td>\n<td>Забороняє небезпечні конструкції, робить мовчазні помилки винятками</td>\n</tr>\n<tr>\n<td>Стосунок</td>\n<td>Жодного — випадковий збіг слова &quot;strict&quot;. <code>'use strict'</code> і так увімкнений в ES-модулях.</td>\n<td></td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Counter() {\n  console.log('render');           // dev + StrictMode: ДВІЧІ підряд\n  useEffect(() => {\n    console.log('mount');          // dev: mount → unmount → mount\n    return () => console.log('unmount');\n  }, []);\n  return <div />;\n}\n\n// Виявляє ефекти БЕЗ cleanup:\nuseEffect(() => { const id = setInterval(tick, 1000); }, []);          // ❌ StrictMode: \"2 інтервали\"\nuseEffect(() => { const id = setInterval(tick, 1000); return () => clearInterval(id); }, []); // ✅"
        },
        {
          "kind": "paragraph",
          "html": "<p>Як це виглядало в класових методах і повна мапа метод → хук — розділ «🏛️ Class vs Functional».</p>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Як зіставити <code>componentDidMount</code>/<code>componentDidUpdate</code>/<code>componentWillUnmount</code> з <code>useEffect</code>?",
          "answer": "Один <code>useEffect(fn, [])</code> = <code>componentDidMount</code> + <code>componentWillUnmount</code> (cleanup). <code>useEffect(fn, [dep])</code> покриває <code>componentDidUpdate</code>, але запускається і після <em>монтування</em> теж. Головна зміна мислення: не «в яку фазу», а «від яких значень залежить»."
        },
        {
          "question": "Назви причини ре-рендеру.",
          "answer": "Чотири: (1) власний <code>state</code>; (2) ре-рендер батька (дитина рендериться теж, доки не стоїть <code>memo</code>); (3) зміна <code>Context</code>, який споживає; (4) <code>useReducer</code> dispatch навіть тим самим значенням. Зміна пропу — не окремий пункт, діє через (2)."
        },
        {
          "question": "Навіщо <code>&lt;StrictMode&gt;</code> і чому компоненти монтуються двічі в dev?",
          "answer": "Навмисно подвоює виклик тіла, ініціалізаторів і mount-фазу ефектів (mount→unmount→mount) — щоб виявити неідемпотентність рендеру й ефекти без cleanup. Це те, що ламається в concurrent-режимі прода. У production подвоєння немає."
        },
        {
          "question": "Що таке stale closure у <code>useEffect</code> і як уникнути?",
          "answer": "Колбек «замикає» значення на момент створення. Якщо ефект запустився раз (<code>[]</code>) і всередині <code>setInterval</code> читає <code>count</code> — назавжди бачить <code>count</code> з першого рендеру. Виходи: функціональний апдейт (<code>setCount(c =&gt; c+1)</code>), додати в <code>deps</code> (перезапуск з актуальним замиканням, не забути cleanup), або «живе» значення в <code>useRef</code>."
        },
        {
          "question": "Навіщо <code>AbortController</code>, якщо є прапорець <code>active</code>?",
          "answer": "<code>active</code>-guard лише <em>ігнорує</em> застарілу відповідь — запит усе одно доходить до сервера. <code>controller.abort()</code> реально <strong>рве мережевий запит</strong>, звільняє слот у пулі й зупиняє парсинг тіла. На швидких перемиканнях (autocomplete) відчутно економить трафік."
        },
        {
          "question": "Що не так з <code>useEffect(async () =&gt; { … })</code>?",
          "answer": "<code>async</code>-стрілка завжди повертає <strong>Promise</strong>, а React очікує <code>undefined</code> або cleanup-функцію — Promise cleanup-ом не трактується (ворнінг, cleanup не спрацює). Правильно: оголосити <code>async</code>-функцію <strong>всередині</strong> й викликати, а колбек лишити синхронним і повернути справжній cleanup."
        }
      ]
    },
    {
      "id": "hooks-useref",
      "title": "🎯 useRef — детально",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Що це та базова механіка <span class=\"tag tag-key\">KEY</span></h3>\n<p><code>useRef</code> — хук, що повертає <strong>мутабельний контейнер</strong> <code>{ current: value }</code>, який зберігається між рендерами й <strong>не викликає ре-рендер</strong> при зміні. Два застосування: доступ до DOM-вузлів і зберігання значень, що мають пережити рендери, але не впливати на UI.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const ref = useRef(initialValue);\nref.current;            // читання\nref.current = newValue; // запис — НЕ тригерить ре-рендер"
        },
        {
          "kind": "paragraph",
          "html": "<p><code>useRef(x)</code> повертає <strong>той самий об'єкт</strong> на кожному рендері. Змінюєш <code>.current</code> — значення живе далі, але React про це «не знає».</p>"
        },
        {
          "kind": "mermaid",
          "code": "flowchart LR\n  A[\"setState(x)\"] --> B[\"React ставить<br/>оновлення в чергу\"]\n  B --> C[\"🔵 Ре-рендер<br/>наступний рендер бачить x\"]\n  C --> D[\"🖼️ UI оновлено\"]\n  E[\"ref.current = x\"] --> F[\"🔴 Значення змінено<br/>синхронно, одразу\"]\n  F --> G[\"UI НЕ оновлюється<br/>React не знає про зміну\"]"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">useRef vs useState <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>useState</th>\n<th>useRef</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Зміна тригерить ре-рендер</td>\n<td>✅ так</td>\n<td>❌ ні</td>\n</tr>\n<tr>\n<td>Зберігається між рендерами</td>\n<td>✅ так</td>\n<td>✅ так</td>\n</tr>\n<tr>\n<td>Оновлення</td>\n<td>асинхронне (наступний рендер)</td>\n<td>синхронне (одразу)</td>\n</tr>\n<tr>\n<td>Читання в тому ж тику</td>\n<td>старе значення</td>\n<td>нове значення</td>\n</tr>\n<tr>\n<td>Для чого</td>\n<td>дані, що впливають на UI</td>\n<td>дані «поза» UI, DOM-посилання</td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const [count, setCount] = useState(0);\nsetCount(5); console.log(count); // 0 — оновиться лише в наступному рендері\n\nconst countRef = useRef(0);\ncountRef.current = 5; console.log(countRef.current); // 5 — синхронно; UI не оновиться"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Застосування 1 — імперативний доступ до DOM</strong></p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Input() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  useEffect(() => { inputRef.current?.focus(); }, []);   // імперативний доступ до DOM\n  return <input ref={inputRef} />;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<p>Типові кейси: <code>focus()</code>, <code>scrollIntoView()</code>, <code>getBoundingClientRect</code>, інтеграція з не-React бібліотеками (canvas, відеоплеєри, чарти, карти).</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <code>ref</code> на елементі = <code>null</code> до монтування. Звертайся до <code>.current</code> в <code>useEffect</code>/обробниках, <strong>не під час рендеру</strong>.</p></div>\n<p><strong>Застосування 2 — значення, що переживають рендери</strong></p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// id інтервалу — треба зберегти для cleanup, але UI від нього не залежить\nconst timerRef = useRef<ReturnType<typeof setInterval> | null>(null);\nuseEffect(() => {\n  timerRef.current = setInterval(tick, 1000);\n  return () => { if (timerRef.current) clearInterval(timerRef.current); };\n}, []);\n\n// попереднє значення prop / state\nfunction usePrevious<T>(value: T) {\n  const ref = useRef<T>();\n  useEffect(() => { ref.current = value; });  // оновлюємо ПІСЛЯ рендеру\n  return ref.current;                          // повертаємо старе\n}"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Застосування 3 — обхід stale closure: ref завжди читає актуальне значення</strong></p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Chat() {\n  const [messages, setMessages] = useState<Msg[]>([]);\n  const messagesRef = useRef(messages);\n  messagesRef.current = messages;   // тримаємо ref свіжим на кожному рендері\n  useEffect(() => {\n    socket.on('event', () => {\n      console.log(messagesRef.current.length); // завжди актуальний\n    });\n    return () => socket.off('event');\n  }, []);   // порожні deps, але через ref бачимо свіже значення\n}"
        },
        {
          "kind": "paragraph",
          "html": "<p>Колбек із порожнім <code>deps</code> замикається на значеннях першого рендеру (<strong>stale closure</strong>). <code>ref.current</code> — той самий об'єкт на всіх рендерах, тож читання дає завжди актуальне значення без перепідписки. Мінус: ref <strong>не реактивний</strong> — на саму зміну так не зреагуєш, лише прочитаєш свіже при наступному виклику.</p>\n<h3 class=\"topic\">Критичні правила <span class=\"tag tag-pit\">PITFALL</span></h3>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Не читай / не пиши <code>.current</code> під час рендеру.</strong> Рендер має бути чистим. Мутація ref у тілі робить його непередбачуваним (Concurrent Mode, StrictMode). Виняток — лінива ініціалізація. Усе інше — в <code>useEffect</code>/обробниках.</p></div>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Зміна ref не оновлює UI.</strong> Якщо чекаєш перемальовування — тобі потрібен <code>useState</code>.</p></div>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Не роби ref «тіньовим станом»</strong> для даних, що впливають на рендер — UI розсинхронізується з даними до наступного ре-рендеру.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Лінива ініціалізація важкого значення\n// ❌ useRef(new ExpensiveThing()) — аргумент обчислюється на КОЖНОМУ рендері\n// ✅ ініціалізуй умовно — конструктор виконається рівно раз\nconst ref = useRef<ExpensiveThing | null>(null);\nif (ref.current === null) {\n  ref.current = new ExpensiveThing();\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">forwardRef — ref на власний компонент</h3>\n<p>Не можна навісити <code>ref</code> на функціональний компонент напряму — до React 19 потрібен <code>forwardRef</code>:</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);\n// тепер <Input ref={myRef} /> працює"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> <span class=\"tag tag-new\">React 19</span> <code>ref</code> можна передавати як звичайний prop — <code>forwardRef</code> більше не обов'язковий. Кастомізація того, що батько бачить через <code>ref</code> — <code>useImperativeHandle</code>.</p></div>\n<h3 class=\"topic\">useRef vs useMemo — щоб не плутати</h3>\n<ul class=\"list\">\n<li><strong>useMemo(() =&gt; obj, deps)</strong> — перераховує при зміні <code>deps</code>. Для <strong>похідних значень</strong>. Кеш React може відкинути — не гарантія.</li>\n<li><strong>useRef(obj)</strong> — <strong>ніколи</strong> не перераховує. Чистий контейнер зі стабільним <code>.current</code> на весь час життя.</li>\n</ul>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>Ключова фраза для співбесіди:</strong> <code>useRef</code> — мутабельний контейнер <code>{ current }</code>, стабільний між рендерами, зміна якого не тригерить ре-рендер. Два застосування: імперативний доступ до DOM і зберігання значень поза циклом рендеру (id таймерів, попередні значення, обхід stale closure). Головна відмінність від state: ref оновлюється синхронно й тихо. Не читати/писати <code>.current</code> під час рендеру (крім лінивої ініціалізації).</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "У чому головна відмінність <code>useRef</code> від <code>useState</code>?",
          "answer": "<code>useRef</code> повертає мутабельний контейнер <code>{ current }</code>, зміна якого <strong>синхронна й «тиха»</strong> — не планує ре-рендер, нове значення видно одразу. <code>useState</code> оновлюється <strong>асинхронно</strong> й <strong>тригерить ре-рендер</strong>. Правило: значення впливає на UI — <code>useState</code>; живе «поза UI» (id таймера, попереднє значення, DOM-вузол) — <code>useRef</code>."
        },
        {
          "question": "Чому не можна читати/писати <code>.current</code> під час рендеру, і єдиний виняток?",
          "answer": "Рендер має бути <strong>чистою функцією</strong> — мутація ref у тілі ламається в Concurrent Mode/StrictMode. Читати/писати треба в <code>useEffect</code>/обробниках. Виняток — <strong>лінива ініціалізація</strong> (<code>if (ref.current === null) ref.current = createOnce()</code>), бо вона ідемпотентна."
        },
        {
          "question": "Що не так з <code>useRef(new ExpensiveThing())</code> і як ініціалізувати важкий об'єкт раз?",
          "answer": "Аргумент обчислюється на <strong>кожному</strong> рендері (решта результатів відкидається). Правильно: <code>const ref = useRef(null)</code> + <code>if (ref.current === null) ref.current = new ExpensiveThing()</code>."
        },
        {
          "question": "Як <code>useRef</code> рятує від stale closure при порожньому deps?",
          "answer": "<code>ref</code> — <strong>той самий об'єкт</strong> на всіх рендерах; оновлюючи <code>ref.current = value</code> щорендеру, читання всередині «застряглого» колбека дає актуальне значення без перепідписки. На відміну від функціонального апдейту чи deps, ref не перезапускає ефект і не тригерить ре-рендер — але й не реактивний."
        },
        {
          "question": "useRef чи useMemo для стабільного мутабельного значення на весь час життя?",
          "answer": "<code>useRef</code>. <code>useMemo</code> — для <strong>похідних значень</strong>, і React може відкинути його кеш будь-коли. <code>useRef</code> гарантує один <code>.current</code> назавжди й дозволяє мутувати."
        },
        {
          "question": "Чому не можна навісити <code>ref</code> на функціональний компонент і що змінилось у React 19?",
          "answer": "До React 19 <code>ref</code> — не звичайний prop: React перехоплює його. Щоб пробросити до DOM-вузла — <code>forwardRef((props, ref) =&gt; …)</code>. У React 19 <code>ref</code> став звичайним пропом (<code>props.ref</code>), <code>forwardRef</code> більше не обов'язковий."
        }
      ]
    },
    {
      "id": "hooks-concurrent",
      "title": "⚡ useTransition / useDeferredValue",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Concurrent features <span class=\"tag tag-new\">React 18</span></h3>\n<p>Обидва хуки позначають частину оновлення як <strong>неурочну (non-urgent)</strong> — React рендерить її з нижчим пріоритетом і може перервати заради урочнішого оновлення (наступного натискання клавіші). Практичне застосування Fiber-переривності.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// useTransition — для ДІЙ (функцій)\nconst [isPending, startTransition] = useTransition();\nstartTransition(() => {\n  setFiltered(items.filter(i => i.includes(q)));\n});\n// Urgent: сам input оновлюється відразу; Non-urgent: важкий filter — deferred, isPending=true\n\n// useDeferredValue — для ЗНАЧЕНЬ\nconst [query, setQuery] = useState('');\nconst deferredQuery = useDeferredValue(query);\n// deferredQuery оновлюється, коли React має час; query — миттєво\n<SearchResults query={deferredQuery} />"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> Вибір: є функція, яку викликаєш сам (сеттер) → <code>useTransition</code>. Є готове значення (проп ззовні) → <code>useDeferredValue</code>.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Повний патерн: миттєвий інпут + низькопріоритетний важкий список\nfunction Search({ allItems }: { allItems: Item[] }) {\n  const [query, setQuery] = useState('');\n  const [isPending, startTransition] = useTransition();\n  function onChange(e: React.ChangeEvent<HTMLInputElement>) {\n    setQuery(e.target.value);           // urgent\n    startTransition(() => {\n      setResults(filterExpensive(allItems, e.target.value)); // низькопріоритетно\n    });\n  }\n  return (\n    <>\n      <input value={query} onChange={onChange} />\n      <ul style={{ opacity: isPending ? 0.6 : 1 }}>{/* ... */}</ul>\n    </>\n  );\n}\n\n// Той самий результат без окремого state — useDeferredValue:\nfunction Search({ allItems }: { allItems: Item[] }) {\n  const [query, setQuery] = useState('');\n  const deferredQuery = useDeferredValue(query);\n  const results = useMemo(\n    () => filterExpensive(allItems, deferredQuery),\n    [allItems, deferredQuery],\n  );\n  const isStale = query !== deferredQuery;\n  return <>{/* input керується query, список — results */}</>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Чому це не дебаунс <span class=\"tag tag-key\">KEY</span></h3>\n<p>Дебаунс <em>відкладає</em> роботу на фіксований таймер — чекаєш умовні 300 мс, навіть якщо процесор вільний. Transition роботу <strong>не відкладає</strong>: React починає рендер одразу, але з правом перервати, щойно прилетить урочніше оновлення. На швидкій машині список оновиться майже миттєво, на повільній — плавно деградує, без магічної константи.</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <code>startTransition</code> має містити <strong>синхронний</strong> <code>setState</code>. <code>await</code> усередині «розриває» transition. Для async-роботи в React 19 <code>useTransition</code> приймає async-функцію (Actions). Transition не робить <code>filterExpensive</code>/fetch швидшим — лише знижує пріоритет рендеру результату.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Яку UX-проблему вирішує <code>useTransition</code> і чим відрізняється від дебаунсу?",
          "answer": "Позначає оновлення стану як <strong>низькопріоритетне</strong>: React рендерить його у фоні, не блокуючи термінові оновлення, і перериває незавершений рендер новішим. На відміну від дебаунсу (просто <em>відкладає</em> на таймер), transition дозволяє терміновим оновленням «обганяти» перерваний рендер миттєво, без штучної затримки."
        },
        {
          "question": "Коли <code>useDeferredValue</code> замість <code>useTransition</code>?",
          "answer": "<code>useTransition</code> — коли ти <strong>ініціюєш</strong> оновлення (керуєш setState). <code>useDeferredValue</code> — коли значення приходить <strong>ззовні</strong> (проп, контекст) і ти не керуєш моментом зміни, напр. важкий список результатів, де інпут має лишатись чутливим."
        }
      ]
    },
    {
      "id": "hooks-custom",
      "title": "🧵 Custom Hooks",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Custom Hooks <span class=\"tag tag-key\">KEY</span></h3>\n<p>Функція, що починається з <code>use</code>, може викликати інші хуки всередині — і підпорядковується правилам хуків. Виносить <strong>логіку</strong> (стан, ефекти, підписки), а не UI — компонент лишається &quot;тупим&quot; (тонкий шар рендеру).</p>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>Префікс <code>use</code> — не стиль, а вимога.</strong> Саме за ним <code>eslint-plugin-react-hooks</code> розпізнає функцію як хук. Без префікса лінтер не перевірить порядок викликів усередині.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// useDebouncedValue\nfunction useDebouncedValue<T>(value: T, ms = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), ms);\n    return () => clearTimeout(id);\n  }, [value, ms]);\n  return debounced;\n}\n\n// useObservable (RxJS у хуку)\nfunction useObservable<T>(source$: Observable<T>, initial: T) {\n  const [value, setValue] = useState(initial);\n  useEffect(() => {\n    const sub = source$.subscribe(setValue);\n    return () => sub.unsubscribe();  // cleanup — обовʼязково!\n  }, [source$]);\n  return value;\n}\n\n// usePrevious\nfunction usePrevious<T>(value: T) {\n  const ref = useRef<T>();\n  useEffect(() => { ref.current = value; });  // записується ПІСЛЯ рендеру\n  return ref.current;   // \"значення з минулого рендеру\"\n}\n\n// useLocalStorage\nfunction useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    if (typeof window === 'undefined') return initial; // SSR guard!\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initial;\n  });\n  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);\n  return [value, setValue] as const;\n}\n\n// useOnClickOutside\nfunction useOnClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {\n  useEffect(() => {\n    const listener = (e: MouseEvent) => {\n      if (!ref.current?.contains(e.target as Node)) handler();\n    };\n    document.addEventListener('mousedown', listener);\n    return () => document.removeEventListener('mousedown', listener); // без cleanup — memory leak\n  }, [ref, handler]);\n}\n\n// useMediaQuery — через useSyncExternalStore (коректно під concurrent)\nfunction useMediaQuery(query: string) {\n  return useSyncExternalStore(\n    onChange => {\n      const mql = matchMedia(query);\n      mql.addEventListener('change', onChange);\n      return () => mql.removeEventListener('change', onChange);\n    },\n    () => matchMedia(query).matches   // getSnapshot\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Плюси й мінуси</h3>\n<ul class=\"list\">\n<li><strong>✅ Плюси:</strong> перевикористання логіки без обгортки в дереві (на відміну від HOC); тестується ізольовано (<code>renderHook</code>); композиція — hook може викликати інші hooks.</li>\n<li><strong>❌ Мінуси / edge cases:</strong> <strong>stale closures</strong> всередині хука (та сама проблема, захована на рівень абстракції глибше); <strong>нестабільний референс, що повертається</strong> — якщо хук повертає новий обʼєкт/масив/функцію щовиклику, кожен споживач отримує &quot;змінений&quot; проп щорендеру — ламає <code>memo</code>/dep-array.</li>\n</ul>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Custom hook — не про &quot;перевикористання UI&quot; (для цього компоненти), а про <strong>перевикористання stateful-логіки</strong>. Кожен виклик хука в різних компонентах створює <em>ізольований</em> стан.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "За яким принципом виносити логіку у custom hook?",
          "answer": "Коли stateful-логіка (підписка, таймер, fetch, синхронізація) <strong>повторюється в кількох компонентах</strong> або достатньо самодостатня, щоб тестувати й іменувати окремо. Якщо логіка одноразова й тісно повʼязана з рендером — виносити заради «чистоти» це зайва абстракція."
        },
        {
          "question": "Чи custom hook створює ізольований стан для кожного компонента?",
          "answer": "Так. Кожен виклик у різних компонентах (або інстансах) отримує <strong>власну, незалежну</strong> копію стану — хук просто викликає <code>useState</code>/<code>useEffect</code> у контексті поточного fiber-рендеру; спільного сховища немає (на відміну від синглтон-стору)."
        }
      ]
    },
    {
      "id": "lifecycle-class-vs-functional",
      "title": "🏛️ Class vs Functional",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Фази життя, події, cleanup і StrictMode — розділ «🔄 Життєвий цикл» вище. Тут лише <strong>історична довідка</strong>: класові компоненти сьогодні не пишуть (виняток — Error Boundary), але легасі-код з ними ще трапляється.</p>\n<h3 class=\"topic\">Класовий lifecycle → хук <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Класовий метод</th>\n<th>Хук-еквівалент</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>constructor</code> (ініціалізація state)</td>\n<td><code>useState(initial)</code> / <code>useState(() =&gt; initial)</code></td>\n</tr>\n<tr>\n<td><code>render</code></td>\n<td>тіло функціонального компонента (так само чисте)</td>\n</tr>\n<tr>\n<td><code>componentDidMount</code></td>\n<td><code>useEffect(fn, [])</code></td>\n</tr>\n<tr>\n<td><code>componentDidUpdate</code></td>\n<td><code>useEffect(fn, [dep])</code></td>\n</tr>\n<tr>\n<td><code>componentWillUnmount</code></td>\n<td>return-функція з <code>useEffect</code></td>\n</tr>\n<tr>\n<td><code>shouldComponentUpdate</code></td>\n<td><code>React.memo</code></td>\n</tr>\n<tr>\n<td><code>this.state</code> з кількох полів</td>\n<td>кілька <code>useState</code> або один <code>useReducer</code></td>\n</tr>\n<tr>\n<td><code>componentDidCatch</code> / <code>getDerivedStateFromError</code></td>\n<td>— хука немає; Error Boundary лишається класовим</td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Те, для чого в класі були constructor + componentDidMount +\n// componentDidUpdate(prevProps) з ручним звірянням prevProps.userId:\nfunction UserProfile({ userId }: Props) {\n  const [user, setUser] = useState<User | null>(null);\n  useEffect(() => {\n    const controller = new AbortController();\n    fetchUser(userId, controller.signal).then(setUser);\n    return () => controller.abort();      // <- componentWillUnmount\n  }, [userId]);                            // <- mount + update на зміну userId\n  return <div>{user?.name}</div>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> Головна перевага — <code>componentDidMount</code>/<code>componentDidUpdate</code> часто дублювали той самий код (логіку «зробити X при mount і при зміні Y» писали двічі). Один <code>useEffect(fn, [dep])</code> покриває обидва випадки.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому один <code>useEffect(fn, [dep])</code> кращий за пару lifecycle-методів?",
          "answer": "Логіку «зробити X при першому рендері і при зміні <code>dep</code>» в класі писали <strong>двічі</strong> (<code>componentDidMount</code> + <code>componentDidUpdate</code> з ручним звірянням <code>prevProps</code>). Один <code>useEffect(fn, [dep])</code> покриває обидва декларативно, без дублювання й без ризику нескінченного циклу."
        },
        {
          "question": "Що з lifecycle досі не має хук-еквівалента?",
          "answer": "<code>componentDidCatch</code>/<code>getDerivedStateFromError</code> — Error Boundary. Ловити помилки рендеру піддерева можна лише класом (або <code>react-error-boundary</code>); хука немає."
        },
        {
          "question": "Навіщо знати класовий API, якщо нові компоненти на ньому не пишуть?",
          "answer": "Щоб читати легасі-код і розуміти співрозмовника. Весь класовий lifecycle зводиться до короткої мапи на хуки; нового коду на класах не пишуть — виняток лише Error Boundary."
        }
      ]
    },
    {
      "id": "performance-deep-dive",
      "title": "🚀 Performance Deep Dive",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><code>React.memo</code>, референсна стабільність і покроковий каскад ре-рендеру — розділ «🧠 Мемоізація» (Block 2). Тут — <strong>як виміряти</strong> й окремі техніки: профілювання, code splitting, віртуалізація, Core Web Vitals.</p>\n<h3 class=\"topic\">Профілювання — React DevTools Profiler <span class=\"tag tag-key\">KEY</span></h3>\n<p>Вкладка <strong>Profiler</strong>: запиши взаємодію → <strong>Flamegraph</strong> показує, які компоненти рендерились і скільки коштувало; <strong>Ranked</strong> сортує за тривалістю. Клік на компонент → <strong>&quot;Why did this render?&quot;</strong> (увімкнути в налаштуваннях) називає причину: hook changed, props changed, parent rendered.</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Робочий процес: спершу <strong>профілюй</strong>, потім оптимізуй. <code>useMemo</code>/<code>memo</code> навмання без вимірювання — передчасна оптимізація.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Code splitting — React.lazy + Suspense\nconst Settings = React.lazy(() => import('./Settings'));\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      {showSettings && <Settings />}   {/* JS-чанк вантажиться лише тут */}\n    </Suspense>\n  );\n}\n\n// List virtualization — react-window: рендеримо тільки видимі рядки\nimport { FixedSizeList } from 'react-window';\nfunction BigList({ items }: { items: Item[] }) {\n  return (\n    <FixedSizeList height={600} width=\"100%\" itemCount={items.length} itemSize={40}>\n      {({ index, style }) => <div style={style}>{items[index].title}</div>}\n    </FixedSizeList>\n  );\n}\n// 10 000 <div> у DOM vs ~20 видимих — критично для довгих списків/таблиць"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Core Web Vitals</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Метрика</th>\n<th>Що міряє</th>\n<th>Типовий винуватець</th>\n<th>Що робить frontend</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>LCP</strong></td>\n<td>Час до відмальовки найбільшого елементу</td>\n<td>Важке hero-зображення, повільний сервер, render-blocking JS</td>\n<td><code>next/image</code> priority, преконект, code splitting, SSR/SSG замість CSR</td>\n</tr>\n<tr>\n<td><strong>CLS</strong></td>\n<td>Візуальна &quot;стрибучість&quot; макету</td>\n<td>Зображення/реклама без розмірів, шрифт FOUT</td>\n<td><code>width/height</code> на медіа, <code>next/font</code>, skeleton замість пустого блоку</td>\n</tr>\n<tr>\n<td><strong>INP</strong></td>\n<td>Затримка відгуку на взаємодію (замінив FID)</td>\n<td>Важкі синхронні обробники, великий JS bundle, довгі рендери</td>\n<td><code>useTransition</code>, дебаунс, розбиття важкої роботи, memo/virtualization</td>\n</tr>\n</tbody>\n</table></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чим знайти реальну причину зайвих ре-рендерів, а не гадати?",
          "answer": "React DevTools Profiler з «Highlight updates» покаже, які компоненти й чому ре-рендерились (порівняння props/state/hooks); для прода — <code>&lt;Profiler&gt;</code> API з <code>onRender</code>. Гадати за симптомами — помилка джуна; сеньйор спершу вимірює."
        },
        {
          "question": "Коли <code>React.lazy</code> + <code>Suspense</code> дає виграш, а коли плодить waterfall?",
          "answer": "Виграш — коли відкладений код <strong>важкий і не потрібен на першому екрані</strong> (окремі маршрути, модалки, важкі залежності). Шкода — коли дробиш те, що майже завжди потрібне одразу: браузер робить окремі послідовні запити (waterfall). Межу став на кордонах навігації/взаємодії, не «на кожен компонент»."
        },
        {
          "question": "Коли virtualization справді потрібна?",
          "answer": "Коли в DOM одночасно сотні–тисячі вузлів (довгі списки/таблиці). Для 20–50 елементів <code>react-window</code> — зайва складність (втрата пошуку по сторінці, складніший a11y, «стрибки»), що не окупається."
        }
      ]
    },
    {
      "id": "react-devtools",
      "title": "🔍 React DevTools як Senior",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Дві вкладки, дві мети <span class=\"tag tag-key\">KEY</span></h3>\n<p>Розширення додає дві панелі: <strong>⚛️ Components</strong> — інспекція дерева й даних; <strong>⚛️ Profiler</strong> — вимірювання продуктивності в часі. Разом покривають &quot;що зараз у стані/пропах&quot; і &quot;чому щось повільне&quot;.</p>\n<h3 class=\"topic\">Вкладка Components</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Фіча</th>\n<th>Навіщо</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Дерево компонентів</td>\n<td>Клік на вузол → <code>props</code>, <code>state</code>, список хуків у порядку виклику (з поточними значеннями)</td>\n</tr>\n<tr>\n<td>Inline-редагування</td>\n<td>Змінити props/state прямо в панелі й одразу побачити результат</td>\n</tr>\n<tr>\n<td>🔍 Search</td>\n<td>Пошук компонента за іменем</td>\n</tr>\n<tr>\n<td>&quot;Highlight updates when components render&quot;</td>\n<td>⚙️ — обводить компонент рамкою на кожен ре-рендер. Найшвидший спосіб побачити зайві ре-рендери без Profiler</td>\n</tr>\n<tr>\n<td><code>$r</code> у консолі</td>\n<td>Після кліку на компонент — <code>$r</code> у Console дає доступ до його instance</td>\n</tr>\n<tr>\n<td>Іконка ⚛️ джерела</td>\n<td>Показує файл/компонент-власник (owner) вузла</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Сеньйорський воркфлоу: Components + Profiler разом</h3>\n<ol>\n<li><strong>Виявити</strong> — &quot;Highlight updates&quot; → взаємодій → видно, який компонент &quot;блимає&quot; частіше за очікуване.</li>\n<li><strong>Виміряти</strong> — Profiler → Record → повтори взаємодію → Stop → Flamegraph/Ranked показують тривалість.</li>\n<li><strong>Діагностувати</strong> — клік на компонент у Flamegraph → &quot;Why did this render?&quot; — причина: <code>props changed</code>/<code>hooks changed</code>/<code>parent rendered</code>.</li>\n<li><strong>Виправити й перевірити</strong> — <code>memo</code>/стабілізація референсу/віртуалізація → знову Profile → порівняй до/після, а не &quot;здається швидше&quot;.</li>\n</ol>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Interactions-трекінг у Profiler (запис конкретної взаємодії, а не всієї сесії) дає чистіший вимір.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що показує Profiler, і як відрізнити «повільний рендер» від «зайвого»?",
          "answer": "Profiler фіксує кожен коміт: тривалість рендеру кожного компонента + причину ре-рендеру. «Повільний рендер» — компонент рендериться довго (важкі обчислення); «зайвий» — рендериться швидко, але <em>занадто часто</em>, хоча вихід не змінюється. Різні проблеми з різними рішеннями (мемоізація обчислень vs компонента/props)."
        },
        {
          "question": "Як швидко перевірити «цей компонент ре-рендериться забагато» без Profiler?",
          "answer": "&quot;Highlight updates when components render&quot; у Components — візуальна рамка на кожен рендер."
        },
        {
          "question": "Що показує &quot;Why did this render?&quot;",
          "answer": "Точну причину конкретного ре-рендеру: зміна props, зміна хука, чи просто ре-рендер батька."
        }
      ]
    },
    {
      "id": "state-boundaries",
      "title": "🧭 Межі стану та Context",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Де живе стан <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Тип стану</th>\n<th>Приклад</th>\n<th>Інструмент</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Локальний</strong></td>\n<td>відкрито/закрито dropdown, значення інпуту</td>\n<td><code>useState</code> / <code>useReducer</code></td>\n</tr>\n<tr>\n<td><strong>Серверний</strong></td>\n<td>список юзерів, дані з API</td>\n<td>TanStack Query (кеш, а не &quot;стан&quot;)</td>\n</tr>\n<tr>\n<td><strong>UI / клієнтський глобальний</strong></td>\n<td>тема, стан кошика, sidebar collapsed</td>\n<td>Zustand / Context</td>\n</tr>\n<tr>\n<td><strong>URL</strong></td>\n<td>фільтри, пагінація, вкладка</td>\n<td><code>useSearchParams</code> — переживає перезавантаження, шариться лінком</td>\n</tr>\n</tbody>\n</table></div>\n<p>Найчастіша помилка: тримати серверні дані в <code>useState</code>+<code>useEffect</code> (втрачаєш кеш/дедуплікацію/інвалідацію) або URL-стан у <code>useState</code> (втрачаєш share-by-link і back-button).</p>\n<h3 class=\"topic\">Context API — коли достатньо, коли ні <span class=\"tag tag-pit\">PITFALL</span></h3>\n<ul class=\"list\">\n<li><strong>✅ Годиться:</strong> рідкісні оновлення — тема, локаль, авторизований юзер, feature flags. Дерево споживачів не надто велике.</li>\n<li><strong>❌ Не годиться:</strong> часті оновлення (позиція курсора, стан форми, реалтайм) — <strong>будь-яка</strong> зміна value ре-рендерить <strong>УСІХ</strong> споживачів, навіть тих, кому потрібна незмінна частина.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Пастка: один Context на все = зайві ре-рендери\nconst AppContext = createContext<{ user: User; theme: Theme } | null>(null);\n// зміна theme ре-рендерить усіх, кому потрібен лише user\n\n// Фікс: розбити на кілька контекстів за частотою зміни\nconst UserContext = createContext<User | null>(null);\nconst ThemeContext = createContext<Theme>('dark');\n\n// + useMemo на value, інакше новий об'єкт-обгортка щорендеру \"зраджує\" memo:\nconst value = useMemo(() => ({ user, theme }), [user, theme]);\n<AppContext.Provider value={value}>{children}</AppContext.Provider>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Окремо значення, окремо диспетчер</h3>\n<p>Розбий не лише за частотою, а й на <strong>state-контекст</strong> і <strong>dispatch-контекст</strong>. <code>dispatch</code> зі <code>useReducer</code> стабільний назавжди — компоненти, яким потрібен лише він (кнопки-дії), не ре-рендеряться при зміні стану.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// \"Локальний Redux\" — useReducer + два контексти\nconst CartStateContext = createContext<CartState | null>(null);\nconst CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null);\n\nfunction CartProvider({ children }: { children: React.ReactNode }) {\n  const [state, dispatch] = useReducer(cartReducer, initialCart);\n  return (\n    <CartStateContext value={state}>\n      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>\n    </CartStateContext>\n  );\n}\n\n// Кнопка \"додати\" читає лише dispatch → не ре-рендериться на зміну кошика\nfunction AddButton({ id }: { id: string }) {\n  const dispatch = use(CartDispatchContext)!;\n  return <button onClick={() => dispatch({ type: 'add', id })}>+</button>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Коли контекст перестає бути інструментом: багато шматків стану, потрібна селективна підписка на поле, часті оновлення з великим деревом споживачів — це вже стор із селекторами (розділ «🐻 Zustand»).</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Як визначити рівень дерева, на якому має жити стан («межі стану»)?",
          "answer": "Стан піднімається лише настільки високо, наскільки потрібно спільному предку компонентів, яким він реально потрібен (lifting state up), і не вище — інакше кожна зміна тригерить ре-рендер усього піддерева. Якщо стан потрібен глибоко вкладеним компонентам без проміжного використання — це кандидат на Context/зовнішній стор, а не проп-дрилінг."
        },
        {
          "question": "Чому надмірний Context для часто змінюваного стану — антипатерн?",
          "answer": "Кожна зміна значення в <code>Provider</code> ре-рендерить <strong>усі</strong> компоненти-споживачі незалежно від того, яку частину вони використовують — Context не має селективної підписки. Для частого/великого стану це каскад зайвих ре-рендерів; краще стор із селекторами (Zustand, Redux) або розбиття на дрібніші контексти."
        }
      ]
    },
    {
      "id": "state-redux",
      "title": "🔴 Redux — архітектура та middleware",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Redux — три принципи <span class=\"tag tag-key\">KEY</span></h3>\n<ol>\n<li><strong>Single source of truth</strong> — увесь стан застосунку в одному об'єкті (<code>store</code>). Спрощує дебаг, серіалізацію, SSR-гідратацію.</li>\n<li><strong>State is read-only</strong> — єдиний спосіб змінити стан — <code>dispatch(action)</code>, plain-об'єкт із полем <code>type</code>. Ніхто не мутує стан напряму.</li>\n<li><strong>Зміни — лише через pure reducers</strong> — <code>(state, action) =&gt; newState</code>: чиста функція, не мутує <code>state</code>, повертає новий об'єкт.</li>\n</ol>\n<h3 class=\"topic\">Односторонній потік даних</h3>\n<p><code>UI подія → dispatch(action) → middleware (опційно) → reducer → новий state → підписники (useSelector) ре-рендеряться</code>. Цей цикл — причина, чому Redux DevTools вміють time-travel debugging.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Vanilla Redux — reducer, actions, store (без Toolkit, щоб побачити фундамент)\ntype CounterAction =\n  | { type: 'counter/increment' }\n  | { type: 'counter/decrement' }\n  | { type: 'counter/addBy'; payload: number };\n\nfunction counterReducer(state = { value: 0 }, action: CounterAction) {\n  switch (action.type) {\n    case 'counter/increment': return { value: state.value + 1 };\n    case 'counter/decrement': return { value: state.value - 1 };\n    case 'counter/addBy':     return { value: state.value + action.payload };\n    default: return state; // невідомий action — повернути state як є\n  }\n}\n\nimport { createStore } from 'redux';\nconst store = createStore(counterReducer);\nstore.subscribe(() => console.log(store.getState()));\nstore.dispatch({ type: 'counter/increment' }); // { value: 1 }"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Підключення до React — useSelector / useDispatch</h3>\n<p>Сучасний спосіб (React-Redux 7.1+) — хуки замість HOC <code>connect</code>. <code>useSelector</code> підписує компонент на зріз стану (ре-рендер лише якщо результат селектора змінився за <code>===</code>), <code>useDispatch</code> повертає <code>dispatch</code>.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { Provider } from 'react-redux';\n<Provider store={store}><App /></Provider>\n\nimport { useSelector, useDispatch } from 'react-redux';\nfunction Counter() {\n  const value = useSelector((state: RootState) => state.counter.value);\n  const dispatch = useDispatch();\n  return (\n    <button onClick={() => dispatch({ type: 'counter/increment' })}>{value}</button>\n  );\n}\n// вузький селектор — ре-рендер лише при зміні value (та сама ідея, що й у Zustand)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Middleware — де живе асинхронність <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>Reducer синхронний і чистий — у ньому не можна викликати API. Middleware перехоплює action між <code>dispatch</code> і reducer, тому саме там виконують side-effect <em>перед</em> тим, як у reducer прийде готовий plain-object action.</p>\n<ul class=\"list\">\n<li><strong>redux-thunk</strong> — action creator повертає <strong>функцію</strong> <code>(dispatch, getState) =&gt; {...}</code>. Імперативний async/await. Простий, вбудований у RTK за замовчуванням.</li>\n<li><strong>redux-saga</strong> — окремий generator-процес, що &quot;слухає&quot; actions і <em>декларативно описує</em> ефекти (<code>call</code>, <code>put</code>, <code>takeLatest</code>). Складніший, але дає скасування, оркестрацію, легше тестування.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// redux-thunk — асинхронний action creator\nfunction fetchUser(id: number) {\n  return async (dispatch: AppDispatch, getState: () => RootState) => {\n    dispatch({ type: 'user/loading' });\n    try {\n      const res = await fetch(`/api/users/${id}`);\n      dispatch({ type: 'user/loaded', payload: await res.json() });\n    } catch (err) {\n      dispatch({ type: 'user/error', payload: String(err) });\n    }\n  };\n}\n// dispatch(fetchUser(1)) — thunk middleware розпізнає функцію (не plain object) і викликає її\n\n// redux-saga — той самий сценарій декларативно\nimport { call, put, takeLatest } from 'redux-saga/effects';\nfunction* fetchUserSaga(action: { type: string; payload: number }) {\n  try {\n    yield put({ type: 'user/loading' });\n    const user = yield call(fetch, `/api/users/${action.payload}`);\n    yield put({ type: 'user/loaded', payload: yield call([user, 'json']) });\n  } catch (err) {\n    yield put({ type: 'user/error', payload: String(err) });\n  }\n}\nfunction* rootSaga() {\n  // takeLatest автоматично скасовує попередній fetchUserSaga — цього немає у thunk\n  yield takeLatest('user/fetch', fetchUserSaga);\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Структурування проєкту — ducks vs Redux Toolkit</h3>\n<p><strong>Класична структура</strong> (Redux ≤3): окремі папки <code>actions/</code>, <code>reducers/</code>, <code>types/</code> — для однієї фічі стрибаєш між файлами. <strong>Ducks-паттерн</strong>: типи, action creators і reducer однієї фічі — в одному файлі. <strong>Redux Toolkit</strong> зробив ducks стандартом: <code>createSlice</code> генерує все з одного опису.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "src/features/\n  counter/\n    counterSlice.ts   ← actions + reducer + types в одному файлі (ducks)\n  user/\n    userSlice.ts\n    userSaga.ts        ← якщо фіча має складну async-оркестрацію"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Redux Toolkit — сучасний стандарт <span class=\"tag tag-key\">KEY</span></h3>\n<p>&quot;Класичний&quot; Redux зі switch-reducer'ами і ручними action creators — <strong>застарілий стиль</strong>. Сьогодні пишуть на <strong>Redux Toolkit (RTK)</strong> — офіційно рекомендований спосіб:</p>\n<ul class=\"list\">\n<li><strong>createSlice</strong> — генерує reducer + actions автоматично з одного опису (ducks як стандарт).</li>\n<li><strong>Immer під капотом</strong> — пишеш &quot;мутуючий&quot; код, виходить immutable-оновлення.</li>\n<li><strong>configureStore</strong> — DevTools, thunk, перевірки на мутації/несеріалізовність з коробки.</li>\n<li><strong>createAsyncThunk</strong> — формалізує thunk (генерує <code>pending</code>/<code>fulfilled</code>/<code>rejected</code>).</li>\n<li><strong>RTK Query</strong> — вбудований data-fetching/caching (конкурент TanStack Query); здебільшого <em>усуває потребу</em> писати thunks для server state.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// RTK — той самий counter без boilerplate\nimport { createSlice, configureStore } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; },        // Immer → immutable\n    addBy: (state, action: { payload: number }) => { state.value += action.payload; },\n  },\n});\n\nexport const { increment, addBy } = counterSlice.actions; // автогенеровані\nconst store = configureStore({ reducer: { counter: counterSlice.reducer } });"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Server state vs client state <span class=\"tag tag-key\">KEY</span></h3>\n<p>Сильний сигнал seniority — розрізняти два типи стану і не тримати серверний у Redux:</p>\n<ul class=\"list\">\n<li><strong>Server state</strong> — асинхронний кеш чужих даних: refetch, інвалідація, дедуплікація, retry → <strong>TanStack Query / RTK Query</strong>.</li>\n<li><strong>Client / UI state</strong> — синхронний, &quot;власний&quot;: фільтри, візард, крос-компонентні взаємодії → <strong>Redux/RTK / Zustand / Context</strong>.</li>\n</ul>\n<h3 class=\"topic\">Коли Redux НЕ потрібен</h3>\n<ul class=\"list\">\n<li>Стан переважно <strong>server state</strong> → TanStack Query / RTK Query.</li>\n<li>Простий локальний стан → <code>useState</code> / <code>useReducer</code> + Context.</li>\n<li>Малий/середній застосунок без складних крос-компонентних взаємодій.</li>\n</ul>\n<p><strong>Бери Redux/RTK</strong>, коли: складний client state між багатьма несуміжними частинами UI; потрібна відстежуваність змін (time-travel, аудит); велика команда з вимогою суворої передбачуваності.</p>\n<h3 class=\"topic\">Redux vs альтернативи</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Рішення</th>\n<th>Тип стану</th>\n<th>Boilerplate</th>\n<th>Коли</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Redux Toolkit</td>\n<td>client (складний)</td>\n<td>середній</td>\n<td>велике SPA, аудит змін</td>\n</tr>\n<tr>\n<td>Zustand</td>\n<td>client</td>\n<td>мінімальний</td>\n<td>легша альтернатива, менше церемоній</td>\n</tr>\n<tr>\n<td>Context + useReducer</td>\n<td>локальний/середній</td>\n<td>малий</td>\n<td>без зовнішньої бібліотеки</td>\n</tr>\n<tr>\n<td>TanStack Query</td>\n<td>server</td>\n<td>малий</td>\n<td>fetch/cache/sync з бекендом</td>\n</tr>\n<tr>\n<td>Jotai / Recoil</td>\n<td>atomic</td>\n<td>малий</td>\n<td>дрібнозернистий реактивний стан</td>\n</tr>\n</tbody>\n</table></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Суть трьох принципів Redux, і чому reducer має бути чистою функцією?",
          "answer": "Один store — єдине джерело правди для дебагу/серіалізації; стан не мутується напряму, а замінюється новим об'єктом через reducer — це вмикає time-travel і предиктивність. Reducer має бути <strong>чистим</strong> (без side-effects, мутацій, <code>Math.random()</code>/<code>Date.now()</code>) — інакше ламається порівняння через референс (<code>===</code>), на якому тримається memoization у <code>useSelector</code>/<code>React.memo</code>."
        },
        {
          "question": "Навіщо middleware, якщо store і так підтримує dispatch?",
          "answer": "Reducer має лишатись синхронним і чистим — API туди не засунеш. Middleware — прошарок між <code>dispatch(action)</code> і reducer, що перехоплює action <em>до</em> нього: там side-effects (HTTP, логування), а в reducer іде готовий plain-object. Без middleware у store можна dispatch-нути лише plain object — не функцію/Promise."
        },
        {
          "question": "Чим redux-saga відрізняється від redux-thunk?",
          "answer": "Thunk — action creator повертає <strong>функцію</strong> з <code>dispatch</code>/<code>getState</code>, імперативний async/await, кожен незалежний. Saga — <strong>generator</strong>-«watcher» поруч зі store: <em>описує</em> ефект декларативним об'єктом (<code>call</code>, <code>put</code>, <code>takeLatest</code>), що дає вбудоване скасування, оркестрацію (<code>race</code>/<code>all</code>) і легше тестування (перевіряєш ефект-об'єкт без моків)."
        },
        {
          "question": "Коли обирають saga замість thunk?",
          "answer": "Коли потрібна оркестрація складних async-сценаріїв: автоскасування (<code>takeLatest</code>), debounce/throttle на action, узгодження паралельних запитів, WebSocket-підписки, retry з бекоффом. Якщо логіка «дій → запит → dispatch» — thunk простіший; ціна saga — крутіша крива входу."
        },
        {
          "question": "Що таке ducks і чим відрізняється від класичної структури?",
          "answer": "Класична групує файли за <em>роллю</em> (усі типи в одній папці, reducers в іншій) — для однієї фічі стрибаєш між 3+ файлами. Ducks — за <em>фічею</em>: типи, action creators і reducer однієї фічі в одному файлі. RTK зробив ducks офіційним: <code>createSlice</code> генерує все з одного опису."
        },
        {
          "question": "Чому «класичний» Redux застарілий і що дає RTK?",
          "answer": "RTK — <strong>офіційно рекомендований</strong> спосіб. Прибирає boilerplate: <code>createSlice</code> (actions + types + reducer з опису), <strong>Immer</strong> (пишеш &quot;мутуючий&quot; код → immutable), <code>configureStore</code> (DevTools/thunk/перевірки), <code>createAsyncThunk</code> (async), <code>RTK Query</code> (fetch/caching). Концепції ті самі — без ручної церемонії."
        },
        {
          "question": "Чому Redux не має тримати server state і що використовувати?",
          "answer": "Server state — асинхронний кеш чужих даних: потрібні refetch, інвалідація, дедуплікація, stale-while-revalidate, retry. Redux цього «з коробки» не робить — довелось би писати thunks + reducers + селектори руками. <strong>TanStack Query</strong>/<strong>RTK Query</strong> дають це декларативно. Redux/RTK лишається для складного синхронного <strong>client/UI state</strong>."
        }
      ]
    },
    {
      "id": "state-zustand",
      "title": "🐻 Zustand",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Що це <span class=\"tag tag-key\">KEY</span></h3>\n<p><strong>Zustand</strong> — мінімалістичний state-manager (~1 КБ). Один store через <code>create()</code>, компоненти читають <em>зрізи</em> через хук-селектор (<code>useStore(s =&gt; s.x)</code>). Під капотом — <code>useSyncExternalStore</code>, тому store живе <strong>поза React-деревом</strong> і не потребує <code>Provider</code>.</p>\n<p>За позицією — між «тільки Context» і «повний Redux»: менше boilerplate, ніж у Redux, і гранулярніші підписки, ніж у Context.</p>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>Коли брати:</strong> глобальний <em>клієнтський</em> стан, який ділять далекі компоненти й для якого Context ре-рендерить забагато — тема, кошик, авторизація, крос-компонентний UI-стан. <strong>Не</strong> для серверного кешу — це TanStack Query.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Базовий store\nimport { create } from 'zustand';\ninterface BearState { bears: number; addBear: () => void; reset: () => void; }\nexport const useBearStore = create<BearState>()((set) => ({\n  bears: 0,\n  addBear: () => set(state => ({ bears: state.bears + 1 })),\n  reset: () => set({ bears: 0 }),\n}));"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Selectors — уникай зайвих ре-рендерів <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ Ре-рендер при БУДЬ-ЯКІЙ зміні store\nconst store = useBearStore();\nconst bears = store.bears;\n\n// ✅ Ре-рендер тільки при зміні bears\nconst bears = useBearStore(state => state.bears);\n\n// Кілька полів — useShallow\nimport { useShallow } from 'zustand/react/shallow';\nconst { bears, fish } = useBearStore(useShallow(\n  state => ({ bears: state.bears, fish: state.fish })\n));"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Zustand vs Context <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><strong>❌ Context для часто змінних даних:</strong> кожна зміна = ре-рендер ВСІХ споживачів.</li>\n<li><strong>✅ Zustand (або Jotai/Recoil):</strong> гранулярні selectors поза React-деревом. Ре-рендер лише якщо вибрана частина state справді змінилась.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Slices pattern — великий store, розбитий на частини\nexport const createUserSlice = (set) => ({ user: null, setUser: (user) => set({ user }) });\nexport const useStore = create()((...args) => ({\n  ...createUserSlice(...args),\n  ...createCartSlice(...args),\n}));\n\n// Middleware\nimport { devtools, persist, immer } from 'zustand/middleware';\nconst useStore = create(\n  devtools(              // Redux DevTools\n    persist(              // localStorage\n      immer((set) => ({   // мутабельні апдейти під капотом — immutable назовні\n        items: [],\n        addItem: (item) => set(state => { state.items.push(item) }),\n      })),\n      { name: 'my-store' }\n    )\n  )\n);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">partialize — обирай, що зберігати в localStorage <span class=\"tag tag-key\">KEY</span></h3>\n<p>Мідлвар <code>persist</code> за замовчуванням серіалізує <strong>увесь</strong> store. <code>partialize</code> звужує до вибраних полів — не персисти токени/секрети чи ефемерний UI-стан.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const useCartStore = create(\n  persist(\n    (set, get) => ({\n      items: [],\n      ui: { isDrawerOpen: false }, // ефемерний UI-стан — не варто персистити\n      addItem: (item) => set(state => ({ items: [...state.items, item] })),\n    }),\n    {\n      name: 'cart-storage',\n      partialize: (state) => ({ items: state.items }), // тільки items у localStorage\n      // ⚠️ ніколи не персисти токени/паролі/PII без явного шифрування\n    }\n  )\n);\n\n// getState()/setState() — доступ до store ПОЗА React-деревом\nexport function getCartTotal() {\n  const items = useCartStore.getState().items; // без хука, без ре-рендеру\n  return items.reduce((sum, i) => sum + i.price, 0);\n}\n\n// підписка поза React (напр. аналітика на кожну зміну)\nuseCartStore.subscribe((state) => {\n  analytics.track('cart_changed', { count: state.items.length });\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Redux Toolkit — контраст <span class=\"tag tag-key\">KEY</span></h3>\n<p>RTK — офіційний, «opinionated» спосіб писати Redux (<code>createSlice</code> генерує actions+reducer, <code>configureStore</code> підключає DevTools і middleware) — повний приклад у розділі «🔴 Redux» вище. На контраст із Zustand він дає те, чого Zustand навмисно не нав'язує: сувору структуру actions/reducers і потужний time-travel debugging, а RTK Query — вбудований кеш серверного стану поверх того самого store. Zustand же виграє мінімалізмом і гранулярними селекторами без <code>Provider</code>.</p>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чим підхід Zustand до підписки відрізняється від Context і чому вирішує зайві ре-рендери?",
          "answer": "Zustand використовує <code>useSyncExternalStore</code> із селекторами: компонент підписується на <em>конкретний зріз</em> (<code>useStore(s =&gt; s.user)</code>) і ре-рендериться лише коли саме він змінюється (<code>Object.is</code>), тоді як Context ре-рендерить усіх споживачів на будь-яку зміну value незалежно від того, яка частина їм потрібна."
        },
        {
          "question": "Недоліки Zustand порівняно з Redux у великому додатку?",
          "answer": "Менш «structured out of the box» — немає нативного DevTools time-travel, строгих конвенцій щодо actions/reducers (хоч є мідлвари). У великих командах це ризик неузгоджених патернів, тоді як Redux нав'язує єдиний передбачуваний спосіб мутації через reducers."
        },
        {
          "question": "Навіщо <code>partialize</code> у persist?",
          "answer": "Без нього в localStorage потрапляє весь store, включно з ефемерним UI-станом чи чутливими даними. <code>partialize</code> звужує серіалізацію до явно перелічених полів."
        },
        {
          "question": "Як звернутись до Zustand-стору поза React?",
          "answer": "<code>useBearStore.getState()</code>/<code>.setState()</code> читають/оновлюють без хука й підписки — корисно в утилітах чи обробниках поза компонентами, де немає render-циклу."
        }
      ]
    },
    {
      "id": "state-tanstack-query",
      "title": "🔄 TanStack Query",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Філософія: Server State ≠ Client State <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ Anti-pattern (useEffect + useState)\nuseEffect(() => {\n  setLoading(true);\n  fetch('/api/users').then(r => r.json()).then(setUsers).catch(setError).finally(() => setLoading(false));\n}, []);\n// немає кешу, дедуплікації, інвалідації, retry, refetch-on-focus\n\n// ✅ useQuery\nconst { data, isLoading, error, refetch } = useQuery({\n  queryKey: ['users'],\n  queryFn: () => fetchUsers(),\n  staleTime: 5 * 60 * 1000,  // 5 хв\n  gcTime: 10 * 60 * 1000,   // раніше cacheTime\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">useMutation + Optimistic Updates <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const mutation = useMutation({\n  mutationFn: (todo: Todo) => createTodo(todo),\n  onMutate: async (newTodo) => {\n    await queryClient.cancelQueries({ queryKey: ['todos'] });\n    const previous = queryClient.getQueryData(['todos']);\n    queryClient.setQueryData(['todos'], old => [...old, newTodo]);  // optimistic!\n    return { previous };\n  },\n  onError: (err, newTodo, context) => {\n    queryClient.setQueryData(['todos'], context.previous);  // rollback\n  },\n  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] })\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">queryKey — ієрархія</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "queryKey: ['users']                          // список\nqueryKey: ['users', userId]                   // один юзер\nqueryKey: ['users', userId, 'posts']          // пости юзера\nqueryKey: ['users', { page, filter, sort }]   // з параметрами\n// Invalidate по префіксу — усі \"users\"-запити разом:\nqueryClient.invalidateQueries({ queryKey: ['users'] });"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Корисні опції</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Опція</th>\n<th>Default</th>\n<th>Що робить</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>staleTime</code></td>\n<td>0</td>\n<td>Час до &quot;застарівання&quot;. 0 = refetch при фокусі/mount</td>\n</tr>\n<tr>\n<td><code>gcTime</code></td>\n<td>5 хв</td>\n<td>Час до видалення з кешу після відписки останнього спостерігача</td>\n</tr>\n<tr>\n<td><code>retry</code></td>\n<td>3</td>\n<td>К-сть retry при помилці</td>\n</tr>\n<tr>\n<td><code>refetchOnWindowFocus</code></td>\n<td>true</td>\n<td>Refetch при поверненні на вкладку</td>\n</tr>\n<tr>\n<td><code>enabled</code></td>\n<td>true</td>\n<td>false = не виконувати (залежні запити)</td>\n</tr>\n<tr>\n<td><code>select</code></td>\n<td>—</td>\n<td>Трансформація data перед поверненням</td>\n</tr>\n<tr>\n<td><code>placeholderData</code></td>\n<td>—</td>\n<td>Дані-заглушка (keepPreviousData — без &quot;миготіння&quot; при пагінації)</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">isLoading vs isFetching <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><strong>isLoading</strong> — <code>true</code> лише під час <strong>першого</strong> запиту, коли в кеші немає даних — доречний повний skeleton/спінер.</li>\n<li><strong>isFetching</strong> — <code>true</code> при <strong>БУДЬ-ЯКОМУ</strong> запиті, включно з тихим фоновим refetch — старі дані вже показані, доречний лише невеликий індикатор &quot;оновлюється&quot;.</li>\n</ul>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому TanStack Query — «server state manager», а не data-fetching інструмент?",
          "answer": "Server state належить джерелу поза застосунком, асинхронний, може застаріти без відома клієнта, поділяється між компонентами. Query бере на себе кешування, дедуплікацію, фонове оновлення (refetch on focus/reconnect), інвалідацію, retry — проблеми, яких немає у client state (useState), де дані завжди «свіжі»."
        },
        {
          "question": "Як Query вирішує waterfall і race condition при швидкій зміні параметрів?",
          "answer": "Кешування за <code>queryKey</code> дозволяє паралельно ініціювати незалежні запити замість послідовних <code>await</code>. Race condition вирішується автоматично: бібліотека ігнорує відповідь застарілого запиту, якщо <code>queryKey</code> вже змінився — знімає ручне відстеження «чи запит ще актуальний»."
        },
        {
          "question": "Чим кеш Query відрізняється від Redux/Zustand стору?",
          "answer": "Це не клієнтський стан, а кеш серверних даних зі своїм життєвим циклом (stale/fresh, invalidate, refetch) — тримати серверні дані у Zustand означає вручну реалізовувати те, що Query дає з коробки."
        },
        {
          "question": "Що робить <code>staleTime: 0</code> за замовчуванням?",
          "answer": "Кожен новий mount/фокус вікна тригерить background refetch, навіть якщо дані в кеші є — UI показує кешовані одразу, потім оновлює."
        },
        {
          "question": "Чим <code>isLoading</code> відрізняється від <code>isFetching</code> і яку помилку робить розробник?",
          "answer": "<code>isLoading</code> — true лише коли для <code>queryKey</code> ще немає кешу (перший запит). <code>isFetching</code> — true при будь-якому запиті, включно з тихими фоновими. Помилка — прив'язати повноекранний спінер до <code>isFetching</code>: він блимає навіть коли дані на екрані."
        }
      ]
    },
    {
      "id": "state-rxjs",
      "title": "🌊 RxJS у React",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Коли потоки кращі за useEffect <span class=\"tag tag-key\">KEY</span></h3>\n<p>Для одноразового fetch — <code>useEffect</code>/TanStack Query достатньо. RxJS виправдовує себе, коли є <strong>кілька джерел подій у часі</strong>, які треба комбінувати, дебаунсити, скасовувати, перемикати: presence-статуси, debounced search з відміною попереднього запиту, WebSocket-потоки, drag&amp;drop.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Debounced search з автоматичною відміною застарілого запиту\nconst search$ = new Subject<string>();\nconst results$ = search$.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap(query => query ? searchApi(query) : of([])),\n  // switchMap сам скасовує попередній HTTP-запит при новому query —\n  // те, що вручну довелось би робити через AbortController у useEffect\n);\nconst results = useObservable(results$, []);   // через useObservable custom hook\n<input onChange={e => search$.next(e.target.value)} />"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Observable vs Promise</h3>\n<p>Observable — потік подій у часі, ліниво (не починає до підписки), може видати 0+ значень. Promise — одне значення, запускається одразу.</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>Observable</th>\n<th>Promise</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Lazy/Eager</td>\n<td>Lazy (subscribe запускає)</td>\n<td>Eager (виконується одразу)</td>\n</tr>\n<tr>\n<td>Single/Multiple</td>\n<td>Багато значень</td>\n<td>Одне значення</td>\n</tr>\n<tr>\n<td>Cancellation</td>\n<td>unsubscribe()</td>\n<td>Нема нативної підтримки</td>\n</tr>\n<tr>\n<td>Sync/Async</td>\n<td>І те, і те</td>\n<td>Завжди async</td>\n</tr>\n<tr>\n<td>Оператори</td>\n<td>Багата екосистема</td>\n<td>then/catch — обмежено</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Hot vs Cold + share()</h3>\n<p>Cold Observable — кожен підписник отримує власний потік (нові HTTP-запити). Hot Observable — один потік для всіх. <code>share()</code> перетворює Cold на Hot — щоб уникнути дублювання запитів.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const cold$ = interval(1000); // кожен subscribe рестартує лічильник\ncold$.subscribe(v => console.log('A', v)); // A: 0, 1, 2...\ncold$.subscribe(v => console.log('B', v)); // B: 0, 1, 2... (окремо)\n\nconst hot$ = fromEvent(button, 'click');    // одне виконання, всі ділять\nhot$.subscribe(() => console.log('A'));\nhot$.subscribe(() => console.log('B'));\n\nconst shared$ = interval(1000).pipe(share()); // cold → hot (Multicast)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Flattening Operators — Decision Matrix <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Оператор</th>\n<th>Поведінка</th>\n<th>Use Case</th>\n<th>Приклад</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>switchMap</td>\n<td>Скасовує попередній, емітить найновіший</td>\n<td>Пошук, автокомпліт, зміна маршруту</td>\n<td>input → API search</td>\n</tr>\n<tr>\n<td>mergeMap</td>\n<td>Паралельні внутрішні Observable</td>\n<td>Завантаження файлів, конкурентні запити</td>\n<td>items → паралельні POST</td>\n</tr>\n<tr>\n<td>concatMap</td>\n<td>Черга (по одному)</td>\n<td>Послідовні операції, важливий порядок</td>\n<td>черга form-submit</td>\n</tr>\n<tr>\n<td>exhaustMap</td>\n<td>Ігнорує нове, поки виконується</td>\n<td>Кнопка логіну (double-submit)</td>\n<td>click → POST (ігнор кліків під час запиту)</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Subject Variants</h3>\n<p>Subject — Observable+Observer одночасно. BehaviorSubject зберігає останнє значення. ReplaySubject буферизує N значень. AsyncSubject видає лише останнє при завершенні.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const subject = new Subject<string>();\nsubject.next('hello');\nsubject.subscribe(v => console.log(v)); // пізній підписник: нічого (hot)\n\nconst behavior = new BehaviorSubject('initial');\nbehavior.next('new');\nbehavior.subscribe(v => console.log(v)); // 'new' (пізній отримує останнє)\n\nconst replay = new ReplaySubject(3);\nreplay.next(1); replay.next(2); replay.next(3); replay.next(4);\nreplay.subscribe(v => console.log(v)); // 2, 3, 4 (останні 3)\n\nconst asyncSubj = new AsyncSubject();\nasyncSubj.next(1); asyncSubj.next(2); asyncSubj.complete();\nasyncSubj.subscribe(v => console.log(v)); // 2"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Оператори — що робить кожен <span class=\"tag tag-key\">KEY</span></h3>\n<p>Довідник найуживаніших. Flattening (<code>switchMap</code>/<code>mergeMap</code>/<code>concatMap</code>/<code>exhaustMap</code>) — вище.</p>\n<p><strong>Creation:</strong> <code>of(a,b)</code> (значення по черзі, тоді complete), <code>from(arr|promise|iterable)</code>, <code>fromEvent(el,'click')</code> (hot), <code>interval(ms)</code>/<code>timer(delay,period)</code>, <code>EMPTY</code> (одразу complete), <code>throwError(() =&gt; err)</code>, <code>defer(fn)</code> (ліниво на кожну підписку).</p>\n<p><strong>Transformation:</strong> <code>map(fn)</code>, <code>scan(fn,seed)</code> (як reduce, емітить проміжний акумулятор), <code>reduce(fn,seed)</code> (ОДИН результат при complete), <code>toArray()</code>.</p>\n<p><strong>Filtering:</strong> <code>filter(pred)</code>, <code>take(n)</code>/<code>first()</code>/<code>last()</code>, <code>takeUntil(notifier$)</code> (класична відписка), <code>skip(n)</code>, <code>debounceTime(ms)</code>, <code>throttleTime(ms)</code>, <code>distinctUntilChanged()</code>.</p>\n<p><strong>Combination:</strong> <code>combineLatest([a$,b$])</code> (останні всіх на будь-яку зміну), <code>forkJoin([a$,b$])</code> (останні лише коли ВСІ complete, як Promise.all), <code>merge(a$,b$)</code> (паралельно), <code>concat(a$,b$)</code> (послідовно), <code>zip(a$,b$)</code> (парує за індексом), <code>withLatestFrom(b$)</code>, <code>startWith(v)</code>.</p>\n<p><strong>Utility &amp; Multicasting:</strong> <code>tap(fn)</code> (side-effect/лог), <code>delay(ms)</code>, <code>finalize(fn)</code> (при complete АБО error), <code>timeout(ms)</code>, <code>share()</code>/<code>shareReplay(n)</code> (cold → hot; shareReplay кешує n останніх).</p>\n<h3 class=\"topic\">Error Handling — catchError, retry, throwError <span class=\"tag tag-key\">KEY</span></h3>\n<p>У потоці помилка — <em>термінальна</em> подія: після <code>error</code> Observable завершується. <code>catchError</code> перехоплює й дає відновитись.</p>\n<ul class=\"list\">\n<li><strong>catchError МУСИТЬ повернути Observable</strong> — стає продовженням потоку: <code>of(fallback)</code>, <code>EMPTY</code> (тихо завершити), <code>throwError(() =&gt; err)</code> (перекинути далі).</li>\n<li><strong>Місце важливе.</strong> <code>catchError</code> <em>всередині</em> <code>switchMap</code> ловить помилку лише внутрішнього запиту — зовнішній потік живе далі. <code>catchError</code> <em>в кінці</em> pipe — після нього весь потік мертвий.</li>\n<li><strong>retry</strong> перепідписується при помилці: <code>retry(3)</code> або <code>retry({ count, delay })</code> для backoff.</li>\n<li><strong>finalize</strong> спрацьовує і на complete, і на error — для <code>loading = false</code>.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { of, EMPTY, throwError, timer } from 'rxjs';\nimport { catchError, retry, switchMap, finalize } from 'rxjs/operators';\n\n// 1) Відновлення значенням — потік живе далі\nfetchUser().pipe(catchError(err => { console.error(err); return of(GUEST_USER); }));\n\n// 2) Тихо проковтнути → EMPTY\nsource$.pipe(catchError(() => EMPTY));\n\n// 3) Перекинути далі (обгорнути помилку)\nsource$.pipe(catchError(err => throwError(() => new AppError('load failed', err))));\n\n// 4) Місце catchError: ВСЕРЕДИНІ switchMap — search$ не «вмирає»\nsearch$.pipe(switchMap(q => searchApi(q).pipe(catchError(() => of([])))));\n// ❌ catchError у кінці pipe — перша помилка вбила б увесь search$\n\n// 5) Retry з backoff + гарантований cleanup\nfetchData().pipe(\n  retry({ count: 3, delay: (_err, i) => timer(2 ** i * 500) }), // 0.5s, 1s, 2s\n  catchError(() => of(null)),\n  finalize(() => setLoading(false))\n);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">forkJoin замість Promise.all <span class=\"tag tag-key\">KEY</span></h3>\n<p><code>forkJoin({ a: a$, b: b$ })</code> чекає, поки <em>всі</em> джерела завершаться (<code>complete</code>), і одноразово емітить останні значення — як <code>Promise.all</code>.</p>\n<ul class=\"list\">\n<li><strong>Promise.all</strong> — приймає масив Promise. Один reject → весь одразу reject.</li>\n<li><strong>forkJoin</strong> — приймає масив/об'єкт Observable. Джерело, що НЕ завершується (<code>interval()</code> без <code>take</code>, <code>BehaviorSubject</code>), «підвішує» forkJoin назавжди.</li>\n</ul>\n<div class=\"alert bad\"><span class=\"icon\">❌</span><p> <strong>Типова пастка:</strong> <code>forkJoin</code> із <code>BehaviorSubject</code>/нескінченним потоком ніколи не емітить. Додай <code>take(1)</code>, або візьми <code>combineLatest</code>, якщо потрібні поточні значення без очікування complete.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "forkJoin({ profile: getProfile(), settings: getSettings(), perms: getPermissions() })\n  .subscribe(({ profile, settings, perms }) => { /* усі три готові одночасно */ });\n\n// ❌ Пастка: джерело без complete підвішує forkJoin\nforkJoin({ user: userSubject /* BehaviorSubject — ніколи не complete! */, data: getData() })\n  .subscribe(() => {}); // ніколи не спрацює\n// ✅ Фікс — гарантувати complete\nforkJoin({ user: userSubject.pipe(take(1)), data: getData() }).subscribe(() => {});"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> Правило: один запит, залежний від пропу/id → <code>useEffect</code>/Query. Потік подій у часі з комбінуванням/скасуванням/дебаунсом → RxJS у custom hook.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Навіщо RxJS у React, якщо є Promises/async-await?",
          "answer": "RxJS моделює <strong>потоки подій у часі</strong> (кліки, WebSocket, ввід), а не одноразові значення. Оператори (<code>debounceTime</code>, <code>switchMap</code>, <code>combineLatest</code>) декларативно комбінують/скасовують/трансформують послідовності — задачі, які на <code>async/await</code> вимагали б ручного керування таймерами й прапорцями."
        },
        {
          "question": "Як інтегрувати Observable з рендер-циклом без витоків підписки?",
          "answer": "Підписку створюють у <code>useEffect</code> і повертають <code>unsubscribe()</code> як cleanup, інакше при розмонтуванні підписка живе далі. Для конвертації в React-стан часто беруть <code>useSyncExternalStore</code> замість <code>useState</code>+<code>useEffect</code> (коректно під concurrent)."
        },
        {
          "question": "Чим <code>switchMap</code> відрізняється від <code>mergeMap</code>/<code>concatMap</code> і чому це причина race condition?",
          "answer": "<code>switchMap</code> скасовує попередній внутрішній потік при новому значенні — ідеально для пошуку-по-вводу. <code>mergeMap</code> — всі паралельно без скасування, <code>concatMap</code> — послідовно. <code>mergeMap</code> замість <code>switchMap</code> для запитів, залежних від останнього вводу, може дати застарілу відповідь <em>після</em> свіжої."
        },
        {
          "question": "Чим Observable відрізняється від Promise?",
          "answer": "Observable — лінивий (не починає до підписки), 0+ значень з часом, скасовується через <code>unsubscribe()</code>. Promise — жадібний (виконується одразу), рівно одне значення, нативно не скасовується."
        },
        {
          "question": "Що має повертати <code>catchError</code> і чому місце в pipe критичне?",
          "answer": "МУСИТЬ повернути Observable — продовження потоку: <code>of(fallback)</code>, <code>EMPTY</code>, <code>throwError</code>. Всередині <code>switchMap</code> ловить помилку лише внутрішнього запиту (зовнішній живе), у кінці pipe — після нього весь потік мертвий."
        },
        {
          "question": "Чим Hot Observable відрізняється від Cold і як <code>share()</code> пов'язаний?",
          "answer": "Cold запускає власне виконання на кожну підписку (HTTP-запити) — два підписники = два виконання. Hot — одне спільне виконання (події, <code>fromEvent</code>). <code>share()</code> перетворює cold на hot, щоб уникнути дублювання роботи."
        },
        {
          "question": "Чим BehaviorSubject відрізняється від Subject?",
          "answer": "Subject нічого не памʼятає — пізній підписник отримує лише майбутні емісії. BehaviorSubject зберігає останнє значення (потребує початкового) і одразу видає його новому підписнику — природно для поточного стану (авторизований юзер, тема)."
        }
      ]
    },
    {
      "id": "patterns",
      "title": "🧩 Patterns",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Composition over inheritance <span class=\"tag tag-key\">KEY</span></h3>\n<p>React не має класичного наслідування компонентів — і не має бути. Замість &quot;Button extends BaseButton&quot; — компонент приймає <code>children</code> або спеціалізовані пропи-слоти. <strong>Compound components</strong> — набір компонентів, що діляться неявним станом через Context.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Compound components — спільний стан через Context, гнучкий склад ззовні\nconst TabsContext = createContext<{ active: string; setActive: (id: string) => void } | null>(null);\nfunction Tabs({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) {\n  const [active, setActive] = useState(defaultTab);\n  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;\n}\nTabs.Tab = function Tab({ id, children }: { id: string; children: React.ReactNode }) {\n  const ctx = useContext(TabsContext)!;\n  return <button onClick={() => ctx.setActive(id)} data-active={ctx.active === id}>{children}</button>;\n};\n// <Tabs defaultTab=\"a\"><Tabs.Tab id=\"a\">A</Tabs.Tab><Tabs.Tab id=\"b\">B</Tabs.Tab></Tabs>\n// споживач сам вирішує порядок/кількість табів"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Слоти через пропи-<code>ReactNode</code> <span class=\"tag tag-key\">KEY</span></h3>\n<p>Коли компонент має кілька «дірок» (хедер, футер, панель), не тулиш усе в <code>children</code> — приймаєш кілька пропів <code>React.ReactNode</code>.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Page({ header, sidebar, children }: {\n  header: React.ReactNode; sidebar: React.ReactNode; children: React.ReactNode;\n}) {\n  return (\n    <div className=\"layout\">\n      <header>{header}</header>\n      <aside>{sidebar}</aside>\n      <main>{children}</main>\n    </div>\n  );\n}\n// <Page header={<Logo />} sidebar={<Nav />}><Article /></Page>\n\n// ❌ Анти-патерн: React.cloneElement, щоб \"доштовхнути\" пропи в children — крихко.\n// ✅ Замість цього — Context (compound components) або render-prop через children:\nfunction Toggle({ children }: { children: (on: boolean, toggle: () => void) => React.ReactNode }) {\n  const [on, setOn] = useState(false);\n  return <>{children(on, () => setOn(v => !v))}</>;\n}\n\n// Provider-компонент — інкапсулює createContext + стан в одному місці\nfunction ThemeProvider({ children }: { children: React.ReactNode }) {\n  const [theme, setTheme] = useState<'light' | 'dark'>('light');\n  const value = useMemo(() => ({ theme, setTheme }), [theme]);\n  return <ThemeContext value={value}>{children}</ThemeContext>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Легасі-патерни — одним абзацом</h3>\n<p><strong>HOC</strong> (<code>withAuth(Component)</code>) і <strong>render props</strong> вирішували «перевикористати логіку без наслідування» до хуків. Custom hooks замінили ~95% застосувань — та сама логіка без обгортки в дереві й без «wrapper hell». <strong>Container / Presentational</strong>: логіку тепер виносять у custom hook. У новому коді не пишуться — лише читаються в легасі.</p>\n<p><strong>Controlled vs Uncontrolled inputs</strong> — окремий розділ нижче.</p>\n<h3 class=\"topic\">Error Boundary <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>Єдиний випадок, де досі потрібен клас: хука-еквівалента <code>getDerivedStateFromError</code> немає. На практиці беруть <code>react-error-boundary</code>. Ловить помилки рендеру піддерева <strong>нижче себе</strong> — не ловить помилки в обробниках подій, асинхронному коді чи самому Error Boundary.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { ErrorBoundary } from 'react-error-boundary';\n<ErrorBoundary fallback={<ErrorPage />} onError={(error, info) => logToSentry(error, info)}>\n  <RiskyWidget />\n</ErrorBoundary>\n// ⚠️ НЕ ловить: помилки в onClick/onChange (try/catch там), async (fetch .catch()), SSR."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Уникай boolean-prop proliferation <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>Коли компонент накопичує незалежні boolean/enum-пропи (<code>size</code>, <code>variant</code>, <code>outlined</code>, <code>rounded</code>, <code>disabled</code>...), кількість комбінацій росте експоненційно — багато з них ніхто не тестував. Композиція (окремі компоненти або явний <code>variant</code>-union) звужує API до підтримуваних варіантів.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ Стос boolean-пропів\n<Button size=\"lg\" variant=\"primary\" outlined rounded disabled={isLoading} />\n// outlined + variant=\"primary\" + rounded — валідна комбінація? компонент мусить розрулювати всі\n\n// ✅ Композиція / явний variant\n<PrimaryButton size=\"lg\" disabled={isLoading}>Save</PrimaryButton>\ntype ButtonVariant = 'primary-outlined-rounded' | 'primary-solid' | 'ghost';\n<Button variant=\"primary-outlined-rounded\" />  // неможливо скласти \"битий\" варіант"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чим Compound Components відрізняються від композиції через children, і коли обрати?",
          "answer": "Compound Components (<code>&lt;Tabs&gt;&lt;Tabs.List&gt;&lt;Tabs.Panel&gt;</code>) діляться неявним станом через Context, зберігаючи гнучкий API без десятків props. Виправдані для UI-«сімей», де набір/порядок дітей варіюється (акордеони, таби, меню), зайві для простих самодостатніх компонентів."
        },
        {
          "question": "Чим Render Props відрізняється від custom hooks і чому хуки їх витіснили?",
          "answer": "Render Props передає функцію-рендерер як prop (<code>&lt;DataProvider render={data =&gt; ...}&gt;</code>), додаючи рівень вкладеності («wrapper hell» при комбінуванні). Custom hooks дають ту саму логіку без обгортки в дереві — просто виклик функції, тому Render Props сьогодні рідко (legacy/бібліотеки до-хукової епохи)."
        },
        {
          "question": "Чому немає хука для Error Boundary?",
          "answer": "Потребує lifecycle-методів (<code>getDerivedStateFromError</code>), яких у функціональній моделі немає — рендер компонента не може &quot;зловити&quot; помилку самого себе."
        },
        {
          "question": "Чому 'boolean-prop proliferation' — антипатерн?",
          "answer": "Кожен новий незалежний boolean/enum-проп множить кількість комбінацій, які компонент теоретично має обробити, хоча підтримується мала підмножина. Композиція або явний <code>variant</code>-union звужують API до валідних, протестованих станів."
        },
        {
          "question": "Коли іменовані слоти-пропи замість <code>children</code>, і чому <code>cloneElement</code> поганий?",
          "answer": "Слоти-пропи <code>React.ReactNode</code> — коли кілька незалежних «дірок» (children довелося б розбирати за позицією/типом). <code>cloneElement</code> крихкий (залежить від форми дитини), погано типізується, ламається при обгортанні у фрагмент. Для спільного стану — Context, для параметризованого рендеру — render-prop."
        }
      ]
    },
    {
      "id": "forms-controlled-uncontrolled",
      "title": "📝 Controlled vs Uncontrolled Inputs",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Дві моделі — хто &quot;володіє&quot; значенням <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Controlled\nconst [value, setValue] = useState('');\n<input value={value} onChange={e => setValue(e.target.value)} />\n\n// Uncontrolled\nconst ref = useRef<HTMLInputElement>(null);\n<input ref={ref} defaultValue=\"\" />\n// читаєш при потребі: ref.current.value"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">React DOM vs браузерний DOM — хто насправді керує <span class=\"tag tag-pit\">PITFALL</span></h3>\n<ul class=\"list\">\n<li><strong>Controlled — React &quot;перемагає&quot; браузер щорендеру:</strong> DOM-вузол МАЄ власну <code>value</code>, але React на кожному рендері <strong>примусово перезаписує</strong> її зі стану. Те, що на екрані, — завжди відображення React-стану.</li>\n<li><strong>Uncontrolled — браузер лишається джерелом правди:</strong> React ставить <code>defaultValue</code> раз при mount і після цього <strong>ніколи не чіпає</strong> стан вузла. React дізнається значення лише через <code>ref.current.value</code>.</li>\n</ul>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Тому controlled input ніколи не &quot;розсинхронізується&quot; з React-станом, навіть при швидкому наборі — немає окремого &quot;браузерного&quot; значення, з яким можна розійтись.</p></div>\n<h3 class=\"topic\"><code>ref</code> для uncontrolled-полів</h3>\n<p><code>useRef</code> детально — розділ &quot;🎯 useRef&quot;. Тут форм-специфічний патерн: або окремий ref на кожне поле, або <strong>один ref на весь <code>&lt;form&gt;</code></strong> і читання всіх полів через <code>FormData</code> замість ref-на-кожен-інпут.</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <code>input[type=&quot;file&quot;]</code> — принципово <strong>завжди uncontrolled</strong>. З безпеки браузер не дозволяє JS програмно встановлювати значення файлового інпуту — тільки читання через <code>ref</code>/<code>FormData</code>.</p></div>\n<h3 class=\"topic\">Порівняння й вердикт <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>Controlled</th>\n<th>Uncontrolled</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Ре-рендер на кожен keystroke</td>\n<td>Так</td>\n<td>Ні</td>\n</tr>\n<tr>\n<td>Валідація/маска в реальному часі</td>\n<td>Природно</td>\n<td>Складніше (слухати input вручну)</td>\n</tr>\n<tr>\n<td>Умовний UI (submit disabled, лічильник)</td>\n<td>Тривіально</td>\n<td>Потрібен окремий слухач</td>\n</tr>\n<tr>\n<td>Продуктивність на великих формах (50+)</td>\n<td>Погіршується</td>\n<td>Не залежить від кількості полів</td>\n</tr>\n<tr>\n<td><code>input[type=&quot;file&quot;]</code></td>\n<td>❌ Неможливо</td>\n<td>✅ Єдиний варіант</td>\n</tr>\n<tr>\n<td>Типова бібліотека</td>\n<td>Ручний useState / Formik (легасі)</td>\n<td>react-hook-form</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>Вердикт:</strong> маленька форма (1-5 полів) з живою валідацією/умовним UI → controlled. Велика форма, форма з файлами, або продуктивність під питанням → uncontrolled (найчастіше — react-hook-form), а не ручні refs на кожне поле.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Різниця між controlled і uncontrolled input, трейд-оффи на великій формі?",
          "answer": "Controlled — значення керується React-станом (<code>value</code>+<code>onChange</code>), кожне натискання = ре-рендер; повний контроль (валідація/форматування на льоту), але при десятках полів впливає на продуктивність. Uncontrolled — значення в DOM, читається через <code>ref</code> за потреби; менше ре-рендерів, але складніша live-валідація."
        },
        {
          "question": "Чому React Hook Form віддає перевагу uncontrolled?",
          "answer": "Уникає ре-рендеру форми на кожне натискання в кожному полі — RHF підписує поля через <code>ref</code> і керує валідацією поза render-циклом, синхронізуючи в React лише за потреби (сабміт, помилка). Суттєвий виграш на великих формах."
        },
        {
          "question": "Чому controlled input ніколи не &quot;відстає&quot; від вводу?",
          "answer": "React перезаписує DOM-значення власним станом щорендеру — немає окремого браузерного значення, з яким можна розійтись."
        },
        {
          "question": "Чому <code>input[type=&quot;file&quot;]</code> не можна зробити controlled?",
          "answer": "Безпека браузера: JS не може програмно підставити довільний файл у value файлового інпуту."
        }
      ]
    },
    {
      "id": "forms-formdata-native",
      "title": "📋 Форми: збір даних, валідація, бібліотеки",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Робота з даними форми — три рівні, кожен наступний потрібен лише коли попереднього не вистачає:</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Рівень</th>\n<th>Інструмент</th>\n<th>Достатньо для</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Збір значень</td>\n<td>нативний <code>FormData</code> / <code>&lt;form action&gt;</code> (React 19)</td>\n<td>будь-яка форма — заміна <code>useState</code> на кожне поле</td>\n</tr>\n<tr>\n<td>Перевірка</td>\n<td>HTML5-атрибути + Constraint Validation API + Zod</td>\n<td>1–10 полів, проста крос-польова логіка</td>\n</tr>\n<tr>\n<td>Керування станом форми</td>\n<td>react-hook-form / TanStack Form</td>\n<td>десятки полів, динамічні масиви, складна умовна валідація</td>\n</tr>\n</tbody>\n</table></div>\n<p>Хто «володіє» значенням (controlled vs uncontrolled, <code>input[type=file]</code>) — розділ «Controlled vs Uncontrolled Inputs» вище.</p>\n<h3 class=\"topic\">FormData — нативний збір значень <span class=\"tag tag-key\">KEY</span></h3>\n<p><code>FormData</code> — вбудований у браузер обʼєкт, що збирає значення <strong>усіх</strong> названих (<code>name=&quot;...&quot;</code>) полів за один виклик — заміна ref-на-кожен-інпут.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function ContactForm() {\n  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    const data = new FormData(e.currentTarget);   // ref не потрібен — форма з події\n    data.get('email');              // одне значення: string | File | null\n    data.getAll('interests');       // масив — для checkbox-груп з тим самим name\n    data.get('avatar') as File;     // файл із <input type=\"file\">\n    Object.fromEntries(data);       // { email: '...', name: '...' } — плейн-обʼєкт\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input name=\"email\" type=\"email\" />\n      <input name=\"avatar\" type=\"file\" />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">React 19 Actions — <code>&lt;form action={'{'}fn{'}'}&gt;</code></h3>\n<p>У React 19 форма приймає <strong>функцію</strong> в <code>action</code> — вона отримує зібраний <code>FormData</code>, форма скидається після успіху, а робота може виконуватись на сервері (Server Action). Той самий <code>FormData</code> є в <code>action</code> React Router; деталі — розділ «React 19».</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "async function updateName(formData: FormData) {\n  'use server';                                  // Server Action (Next.js App Router)\n  await db.user.update({ name: formData.get('name') });\n}\nfunction ProfileForm() {\n  const [state, action, isPending] = useActionState(updateName, null);\n  return (\n    <form action={action}>\n      <input name=\"name\" />\n      <SubmitButton />\n    </form>\n  );\n}\nfunction SubmitButton() {\n  const { pending } = useFormStatus();            // стан найближчої <form> — без пропсів\n  return <button disabled={pending}>{pending ? 'Збереження…' : 'Зберегти'}</button>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Нативна HTML5-валідація <span class=\"tag tag-key\">KEY</span></h3>\n<p>Атрибути <code>required</code>, <code>pattern</code>, <code>min</code>/<code>max</code>, <code>type=&quot;email&quot;</code> — браузер валідує без JS. Constraint Validation API дає програмний доступ: <code>input.checkValidity()</code> (bool, без UI), <code>input.reportValidity()</code> (нативна підказка), <code>input.setCustomValidity('текст')</code> (власне повідомлення).</p>\n<h3 class=\"topic\">Коли валідувати — три стратегії</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Момент</th>\n<th>UX</th>\n<th>Коли доречно</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>onChange</code></td>\n<td>Миттєвий фідбек, може дратувати посеред вводу</td>\n<td>Індикатори сили пароля, лічильник символів</td>\n</tr>\n<tr>\n<td><code>onBlur</code></td>\n<td>Валідація при виході з поля — не заважає</td>\n<td>Найпоширеніший баланс для текстових полів</td>\n</tr>\n<tr>\n<td><code>onSubmit</code></td>\n<td>Усе одразу в момент сабміту</td>\n<td>Прості форми, або фінальна перевірка поверх onBlur</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Error state і фокус на невалідному полі <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>Стан помилок тримай <strong>окремо</strong> від значень полів (<code>{ fieldName: message }</code>) й оновлюй лише змінений запис — інакше форма «сіпається». Після невдалого сабміту — фокус на перше невалідне поле й ARIA-звʼязок помилки з інпутом.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function useFormErrors() {\n  const [errors, setErrors] = useState<Record<string, string>>({});\n  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});\n  function validate(data: Record<string, string>) {\n    const next: Record<string, string> = {};\n    if (!data.email) next.email = 'Обовʼязкове поле';\n    setErrors(next);\n    const firstInvalid = Object.keys(next)[0];\n    if (firstInvalid) fieldRefs.current[firstInvalid]?.focus(); // ⚠️ a11y — легко забути\n    return Object.keys(next).length === 0;\n  }\n  return { errors, fieldRefs, validate };\n}\n\n<input name=\"email\" ref={el => { fieldRefs.current.email = el; }}\n  aria-invalid={!!errors.email}\n  aria-describedby={errors.email ? 'email-error' : undefined} />\n{errors.email && <span id=\"email-error\" role=\"alert\">{errors.email}</span>}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Фокус на перше невалідне поле й <code>aria-invalid</code>/<code>aria-describedby</code> — не косметика, а a11y-поведінка: користувачі screen reader/клавіатури інакше не дізнаються, де помилка.</p></div>\n<h3 class=\"topic\">Zod — одна схема на клієнт і сервер <span class=\"tag tag-key\">KEY</span></h3>\n<p>Ключове правило безпеки: клієнтська валідація — лише для UX, серверна — обовʼязкова завжди. Щоб не писати правила двічі — <strong>одна Zod-схема</strong> в окремому файлі, який імпортують і компонент, і Server Action / API-роут.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// signupSchema.ts — імпортується І в компонент, І в API-роут / Server Action\nimport { z } from 'zod';\nexport const signupSchema = z.object({\n  email: z.string().email('Невалідний email'),\n  age: z.coerce.number().min(18, 'Мінімум 18 років'),  // coerce — FormData дає рядки\n});\nexport type SignupInput = z.infer<typeof signupSchema>;  // тип зі схеми, без дублювання\n\n// будь-де (клієнт або сервер):\nconst parsed = signupSchema.safeParse(Object.fromEntries(formData));\nif (!parsed.success) {\n  parsed.error.flatten().fieldErrors;   // { email: ['Невалідний email'], ... }\n} else {\n  parsed.data;                          // типізовано як SignupInput\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Бібліотеки — коли ручного вже мало</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Підхід</th>\n<th>Модель</th>\n<th>Статус</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Vanilla <code>useState</code> / <code>FormData</code></td>\n<td>Controlled по полю / нативний збір</td>\n<td>Ок для 1–3 полів, росте боляче</td>\n</tr>\n<tr>\n<td><strong>react-hook-form</strong></td>\n<td>Uncontrolled (refs) + Zod</td>\n<td>✅ Актуальний стандарт для будь-чого складнішого</td>\n</tr>\n<tr>\n<td>Formik</td>\n<td>Controlled, обгортка над useState</td>\n<td>Легасі — витіснений RHF через продуктивність</td>\n</tr>\n<tr>\n<td>TanStack Form</td>\n<td>Type-safe, framework-agnostic ядро</td>\n<td>Новіший гравець, зростає, поки не домінує</td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { signupSchema } from './signupSchema';   // та сама схема, що й на сервері\n\nfunction SignupForm() {\n  const { register, handleSubmit, formState: { errors } } = useForm({\n    resolver: zodResolver(signupSchema),  // валідація — схемою, не вручну\n  });\n  return (\n    <form onSubmit={handleSubmit(data => submit(data))}>\n      <input {...register('email')} />       {/* register = ref + name під капотом */}\n      {errors.email && <span>{errors.email.message}</span>}\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}\n// register() повертає { name, ref, onChange, onBlur } — uncontrolled, мінімум ре-рендерів"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>Вердикт:</strong> проста форма (1–5 полів) → нативний <code>FormData</code> + Zod, без бібліотеки. Складніше за 2–3 поля, з файлами/динамічними полями/потребою в продуктивності → <strong>react-hook-form + Zod</strong>: одна схема (перевикористовна на бекенді), продуктивність не деградує, TS-типи зі схеми.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Де робити валідацію — клієнт, сервер, обидва?",
          "answer": "Клієнтська — для UX (миттєвий фідбек), але <strong>ніколи не джерело істини для безпеки</strong> (клієнт можна обійти прямим запитом). Серверна обовʼязкова завжди — єдиний надійний барʼєр. Дублювати ключові правила на обох рівнях, ідеально через спільну Zod-схему."
        },
        {
          "question": "Переваги нативного <code>FormData</code> над <code>useState</code> на кожне поле?",
          "answer": "Збирає всі значення одним викликом без окремого <code>useState</code>/<code>onChange</code> на кожне поле — менше boilerplate і ре-рендерів. У зв'язці з React 19 Actions (<code>&lt;form action={fn}&gt;</code>) FormData передає дані у Server Action без ручної серіалізації."
        },
        {
          "question": "Як показати помилки, щоб форма не «сіпалась»?",
          "answer": "Стан помилок окремо від значень (<code>{ fieldName: message }</code>), оновлювати лише змінений запис. Бібліотеки (RHF) ізолюють ре-рендер поля через підписку по імені, тому помилка в одному інпуті не ре-рендерить усю форму й не збиває фокус."
        },
        {
          "question": "Коли нативний підхід замість бібліотеки?",
          "answer": "Для простих форм (1-3 поля, без складної крос-польової валідації чи динамічних масивів) — залежність бібліотеки не окупається. Для десятків полів, вкладених масивів, складної умовної валідації — бібліотека економить більше, ніж коштує."
        }
      ]
    },
    {
      "id": "react-router",
      "title": "🧭 React Router",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Що це і навіщо <span class=\"tag tag-key\">KEY</span></h3>\n<p>React сам по собі не має роутера (конкретний наслідок &quot;бібліотека, а не фреймворк&quot;). React Router — де-факто стандартна бібліотека для клієнтського роутингу в SPA: зіставляє URL з деревом компонентів, синхронізує адресний рядок і навігацію без повного перезавантаження.</p>\n<h3 class=\"topic\">Який роутер обрати <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><strong>Декларативний API (легасі):</strong> <code>&lt;BrowserRouter&gt;</code> + <code>&lt;Routes&gt;</code>/<code>&lt;Route&gt;</code> у JSX. Досі працює, але без вбудованого <code>loader</code>/<code>action</code> — дані тягнеш вручну через <code>useEffect</code>.</li>\n<li><strong>Data Router API — актуальний стандарт ✅:</strong> <code>createBrowserRouter([...])</code> + <code>&lt;RouterProvider&gt;</code>. Конфіг маршрутів — масив обʼєктів, що розблоковує <code>loader</code>/<code>action</code>/<code>errorElement</code>. Рекомендований з v6.4+, стандарт і в v7 (після злиття з Remix).</li>\n</ul>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Функція</th>\n<th>Коли обирати</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>createBrowserRouter</code></td>\n<td>Стандартний вибір для браузерного SPA — HTML5 History API, чисті URL</td>\n</tr>\n<tr>\n<td><code>createHashRouter</code></td>\n<td>Той самий API, URL виду <code>/#/path</code> — коли сервер не налаштований на SPA-фолбек</td>\n</tr>\n<tr>\n<td><code>createMemoryRouter</code></td>\n<td>Без адресного рядка, історія в памʼяті. Для тестів і не-браузерних середовищ</td>\n</tr>\n<tr>\n<td><code>createStaticRouter</code> / <code>createStaticHandler</code></td>\n<td>Серверна пара для SSR React Router поза Next.js</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Основні концепції</h3>\n<ul class=\"list\">\n<li><strong><code>&lt;Link&gt;</code> / <code>&lt;NavLink&gt;</code></strong> — клієнтська навігація без перезавантаження (перехоплює клік, оновлює History API). <code>NavLink</code> — плюс автоматичний <code>className</code>/<code>style</code> для активного маршруту.</li>\n<li><strong><code>&lt;Outlet&gt;</code></strong> — місце в layout-роуті, куди рендериться <strong>дочірній</strong> зматчений маршрут — основа вкладеного роутингу (спільний layout не перемонтовується).</li>\n<li><strong><code>useNavigate</code></strong> — програмна навігація (<code>navigate('/success')</code>).</li>\n<li><strong><code>useParams</code> / <code>useLocation</code></strong> — динамічні сегменти (<code>/users/:id</code> → <code>{ id }</code>); поточний шлях/query/hash.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const router = createBrowserRouter([\n  {\n    path: '/',\n    element: <Layout />,          // спільний UI (nav, sidebar)\n    children: [\n      { index: true, element: <Home /> },\n      { path: 'users/:id', element: <UserProfile /> }, // :id — динамічний сегмент\n    ],\n  },\n]);\n\nfunction Layout() {\n  return (\n    <>\n      <nav><NavLink to=\"/\">Home</NavLink></nav>\n      <Outlet />   {/* сюди рендериться Home АБО UserProfile залежно від URL */}\n    </>\n  );\n}\nfunction UserProfile() {\n  const { id } = useParams();    // '42' з /users/42\n  return <div>User #{id}</div>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">loader — дані через роутер <span class=\"tag tag-key\">KEY</span></h3>\n<p>Функція <code>loader</code> на роуті виконується <strong>до</strong> рендеру компонента — дані готові в момент першого рендеру, замість &quot;змонтувався → useEffect → fetch → спінер&quot;. Читаються через <code>useLoaderData()</code>.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const router = createBrowserRouter([\n  {\n    path: 'users/:id',\n    element: <UserProfile />,\n    loader: async ({ params }) => {\n      const res = await fetch(`/api/users/${params.id}`);\n      if (!res.ok) throw new Response('Not Found', { status: 404 }); // → errorElement\n      return res.json();\n    },\n  },\n]);\nfunction UserProfile() {\n  const user = useLoaderData();   // дані вже тут, без useEffect і спінера на mount\n  return <div>{user.name}</div>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> <code>loader</code> ≠ TanStack Query — <code>loader</code> вирішує &quot;коли завантажити&quot; (до рендеру, паралельно з code-splitting), Query — &quot;як кешувати/інвалідувати/дедуплікувати&quot;. Часто разом: <code>loader</code> &quot;прогріває&quot; Query-кеш.</p></div>\n<h3 class=\"topic\">action — мутації через роутер <span class=\"tag tag-key\">KEY</span></h3>\n<p>Компонент <code>&lt;Form&gt;</code> (з react-router) сабмітить дані на <code>action</code> роуту замість ручного <code>onSubmit</code>+<code>preventDefault</code>+<code>fetch</code>. Progressive enhancement — форма працює навіть без JS.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const router = createBrowserRouter([\n  {\n    path: 'users/:id/edit',\n    element: <EditUser />,\n    action: async ({ request, params }) => {\n      const formData = await request.formData();\n      await fetch(`/api/users/${params.id}`, { method: 'PATCH', body: formData });\n      return redirect(`/users/${params.id}`);  // навігація прямо з action\n    },\n  },\n]);\nfunction EditUser() {\n  const errors = useActionData();  // результат action (напр. помилки валідації)\n  return (\n    <Form method=\"post\">\n      <input name=\"name\" />\n      {errors?.name && <span>{errors.name}</span>}\n      <button type=\"submit\">Save</button>\n    </Form>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <code>action</code>/<code>loader</code> React Router — не те саме, що React 19 <code>useActionState</code>/Actions. Та сама ідея (форма → серверна дія → результат), різні шари: React Router — бібліотека роутингу з власною data-моделлю; React 19 Actions — вбудовані в React core.</p></div>\n<h3 class=\"topic\">React Router vs Next.js App Router — коли що</h3>\n<ul class=\"list\">\n<li><strong>React Router</strong> — чистий SPA, клієнтський роутинг, сам обираєш data-layer. Гнучкіше, але кешування/SSR/бандлінг збираєш сам.</li>\n<li><strong>Next.js App Router</strong> — файлова маршрутизація, RSC, кешування й SSR &quot;з коробки&quot; — менше рішень, але й менше гнучкості поза конвенціями.</li>\n</ul>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чим декларативний React Router відрізняється від File-based роутингу Next.js?",
          "answer": "React Router будує маршрути з JSX-дерева <code>&lt;Route&gt;</code> (або об'єктної конфігурації) — повний програмний контроль (умовні/вкладені маршрути), ціна — гнучкість замість конвенції. File-based Next.js виводить маршрути з файлової структури — швидше зорієнтуватись, менше boilerplate, але менш гнучко для нетипових сценаріїв."
        },
        {
          "question": "Як React Router реалізує lazy-loading маршрутів і чому це важливо?",
          "answer": "Через <code>React.lazy()</code> + <code>&lt;Suspense&gt;</code> (або вбудований <code>lazy</code>-loader у Data Router) код кожного маршруту виноситься в окремий чанк, завантажується лише при переході. Без цього весь JS усіх сторінок — в одному початковому бандлі, що збільшує TTI."
        }
      ]
    },
    {
      "id": "server-communication-auth",
      "title": "🌐 Fetch, axios та автентифікація на клієнті",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">fetch — пастка з &quot;успішними&quot; помилками <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p><code>fetch</code> потрапляє в <code>catch</code> лише при мережевому збої — HTTP 404/500 це для нього &quot;успішна&quot; відповідь, яку треба перевірити через <code>response.ok</code> (<code>true</code> для 200-299).</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// fetch + AbortController — скасування застарілого запиту\nasync function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {\n  const res = await fetch(url, { signal });\n  if (!res.ok) {\n    throw new Error(`HTTP ${res.status}: ${res.statusText}`); // fetch САМ не кидає на 404/500\n  }\n  return res.json();\n}\n\nfunction useSearch(query: string) {\n  const [results, setResults] = useState<Item[]>([]);\n  useEffect(() => {\n    const controller = new AbortController();\n    fetchJson<Item[]>(`/api/search?q=${query}`, controller.signal)\n      .then(setResults)\n      .catch((err) => { if (err.name !== 'AbortError') console.error(err); });\n    return () => controller.abort(); // cleanup: новий query → скасувати попередній\n  }, [query]);\n  return results;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">axios — навіщо поверх fetch <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><strong>fetch (нативний):</strong> 0 залежностей; не кидає на 4xx/5xx (треба <code>response.ok</code>); ручна серіалізація JSON; скасування через <code>AbortController</code>.</li>\n<li><strong>axios:</strong> reject на будь-якому статусі поза 2xx (простий <code>try/catch</code>); автоматична серіалізація JSON; <strong>interceptors</strong> (централізовані request/response хуки); вбудоване скасування, таймаути.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// axios interceptors — підстановка токена й обробка 401 в одному місці\nimport axios from 'axios';\nconst api = axios.create({ baseURL: '/api' });\n\napi.interceptors.request.use((config) => {\n  const token = getAccessToken();\n  if (token) config.headers.Authorization = `Bearer ${token}`;\n  return config;\n});\n\napi.interceptors.response.use(\n  (res) => res,\n  async (error) => {\n    if (error.response?.status === 401) {\n      await refreshAccessToken();      // одна спроба оновити токен...\n      return api.request(error.config); // ...і повторити оригінальний запит\n    }\n    return Promise.reject(error);\n  },\n);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Автентифікація на клієнті — де зберігати токен <span class=\"tag tag-pit\">PITFALL</span></h3>\n<ul class=\"list\">\n<li><strong>⚠️ localStorage</strong> — доступний з будь-якого JS → вразливий до <strong>XSS</strong> (вкрадений скрипт читає токен). Простий, але для чутливих токенів — ризик.</li>\n<li><strong>✅ HttpOnly cookie</strong> — недоступний з JS (XSS не прочитає). Але автоматично летить із кожним запитом на домен → вразливий до <strong>CSRF</strong>, тому потрібні <code>SameSite=Strict/Lax</code> + CSRF-токен.</li>\n</ul>\n<p>Практичний компроміс: короткоживучий <strong>access token</strong> у пам'яті (React-стан/модуль-змінна) + довгоживучий <strong>refresh token</strong> у HttpOnly-cookie для тихого оновлення.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Protected route — редірект ДО рендеру приватного контенту, без \"спалаху\"\nfunction RequireAuth({ children }: { children: React.ReactNode }) {\n  const { user, isLoading } = useAuth();\n  const location = useLocation();\n  if (isLoading) return <Spinner />; // ще не знаємо статус — нічого не рендеримо\n  if (!user) {\n    return <Navigate to=\"/login\" state={{ from: location }} replace />; // replace: без зайвого history\n  }\n  return children;\n}\n// Приватний <Dashboard> взагалі НЕ монтується, поки перевірка не пройшла —\n// на відміну від \"відрендерити й редіректнути в useEffect\", де контент промайне"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому &quot;fetch не кидає на 404/500&quot; — пастка, і чим axios інакше?",
          "answer": "<code>fetch</code> резолвить проміс для <strong>будь-якої</strong> відповіді сервера (навіть 404/500); помилкою вважає лише мережевий збій. Перевіряти через <code>response.ok</code>. axios автоматично кидає (reject) для статусу поза 2xx, тобто <code>try/catch</code> навколо axios ловить HTTP-помилки без ручної перевірки."
        },
        {
          "question": "Навіщо AbortController з fetch і типова помилка?",
          "answer": "Дозволяє скасувати in-flight запит (<code>abort()</code>) — критично в <code>useEffect</code> з частими залежностями (пошук, зміна параметра), інакше застарілі відповіді приходять <em>після</em> свіжих і перезаписують стан. Типова помилка — не повертати cleanup з <code>abort()</code>, через що компонент після демонтажу викликає <code>setState</code> на неактуальний результат."
        },
        {
          "question": "Чим interceptor axios відрізняється від ручної обгортки fetch?",
          "answer": "Реєструється <strong>один раз</strong> глобально й застосовується до <strong>кожного</strong> запиту/відповіді — зручно централізувати токен, логування, 401. З голим <code>fetch</code> немає перехоплення — доводиться писати обгортку (<code>apiFetch</code>) навколо кожного виклику або патчити глобальний <code>fetch</code>."
        },
        {
          "question": "Чому JWT у localStorage ризиковано і як HttpOnly-cookie вирішує (і яку проблему створює)?",
          "answer": "localStorage доступний з будь-якого JS — XSS може прочитати токен. HttpOnly-cookie <strong>недоступний з JS</strong> (лише браузер додає його). Натомість cookie летить із <strong>кожним</strong> запитом на домен, включно з ініційованими сторонньою сторінкою — це CSRF, від якого захищаються <code>SameSite=Strict/Lax</code> + CSRF-токен."
        },
        {
          "question": "Як реалізувати protected route без &quot;спалаху&quot; приватного контенту?",
          "answer": "Обгортковий компонент (<code>RequireAuth</code>) перевіряє автентифікацію <em>до</em> рендеру дочірнього маршруту через <code>&lt;Navigate to=&quot;/login&quot; /&gt;</code> замість умовного рендеру всередині сторінки — React Router не монтує приватний компонент, поки перевірка не завершена. Помилка — відрендерити приватну сторінку й лише в <code>useEffect</code> редіректнути (контент промайне в DOM)."
        }
      ]
    },
    {
      "id": "nextjs-render-models",
      "title": "🖥️ Next.js: рендер-моделі",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">CSR / SSR / SSG / ISR <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Mode</th>\n<th>Коли рендериться HTML</th>\n<th>Коли доречно</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>CSR</strong></td>\n<td>У браузері, після завантаження JS</td>\n<td>Дашборди, інтерактивні частини за автентифікацією</td>\n</tr>\n<tr>\n<td><strong>SSR</strong></td>\n<td>На сервері, на кожен запит</td>\n<td>Персоналізовані сторінки, дані, що часто міняються</td>\n</tr>\n<tr>\n<td><strong>SSG</strong></td>\n<td>На сервері, під час білда, один раз</td>\n<td>Blog posts, marketing pages — контент майже не міняється</td>\n</tr>\n<tr>\n<td><strong>ISR</strong></td>\n<td>Як SSG, але перегенерується у фоні через <code>revalidate</code></td>\n<td>Новини, каталог товарів — часто, але не real-time</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">RSC — не те саме, що SSR <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>SSR — <strong>коли</strong> рендериться HTML (сервер vs браузер) — про час і місце. RSC (React Server Components) — <strong>де живе компонент</strong>: Server Component ніколи не потрапляє в JS-бандл клієнта, його код і залежності виконуються лише на сервері й не гідруються. SSR-компонент — звичайний Client Component, просто його <em>перший</em> рендер відбувся на сервері для HTML, а потім він гідрується.</p>\n<h3 class=\"topic\">Serialization через &quot;use client&quot; межу <span class=\"tag tag-key\">KEY</span></h3>\n<p>Пропи із Server Component у Client Component серіалізуються (як JSON) — <strong>не можна</strong> передати функції, класи, <code>Date</code>, Symbol. Виняток: сам <code>children</code> (JSX-дерево) можна — Server Component може лишатись &quot;невидимим&quot; деревом усередині Client Component через children.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// app/page.tsx — Server Component\nexport default function Page() {\n  return (\n    <>\n      <Header />                                    {/* Відразу */}\n      <Suspense fallback={<DashboardSkeleton />}>\n        <SlowDashboard />                          {/* Стрімиться окремо */}\n      </Suspense>\n    </>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Hydration mismatch:</strong> якщо серверний і клієнтський рендер відрізняються (<code>Date.now()</code>, <code>window</code>, <code>Math.random()</code> у рендері) — React лається. Фікс: <code>suppressHydrationWarning</code> на вузлі або перенести browser-only контент у <code>useEffect</code>.</p></div>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Bundle leak:</strong> <code>&quot;use client&quot;</code> на &quot;корені&quot; фічі тягне у клієнтський бандл усі дочірні модулі-імпорти. Client Component отримує Server Component лише через <code>children</code>-проп, ніколи через прямий <code>import</code>.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Різниця між SSR, SSG, ISR, CSR — коли кожну?",
          "answer": "CSR — рендеринг у браузері, найгірший для SEO/першого фарбування, для приватних дашбордів. SSR — HTML на сервері на кожен запит, для персоналізованого/часто змінного. SSG — HTML раз під час білду, макс швидкість, для майже незмінного (маркетинг). ISR — SSG з фоновим ревалідейшном (<code>revalidate</code>), компроміс швидкості й свіжості."
        },
        {
          "question": "Що таке RSC і чим принципово відрізняються від SSR?",
          "answer": "SSR виконує рендер на сервері для <em>початкового</em> HTML, але код все одно потрапляє в клієнтський бандл для гідратації. RSC — компоненти, які виконуються <strong>виключно на сервері</strong> й ніколи не потрапляють у клієнтський JS: їхній код і залежності не завантажуються браузером — суттєве зменшення бандла для неінтерактивних частин."
        },
        {
          "question": "SSR і RSC — одне й те саме?",
          "answer": "Ні: SSR — коли рендериться HTML; RSC — де взагалі виконується компонент (сервер, ніколи не в бандлі клієнта)."
        },
        {
          "question": "Чому не можна передати onClick з Server у Client Component?",
          "answer": "Пропи серіалізуються, функції не серіалізуються — сервер не може отримати посилання на клієнтську функцію."
        }
      ]
    },
    {
      "id": "nextjs-app-router",
      "title": "▲ Next.js App Router",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Server vs Client Components <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>Server Component</th>\n<th>Client Component</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Default</strong></td>\n<td>✅ Так</td>\n<td>❌ Потрібен 'use client'</td>\n</tr>\n<tr>\n<td><strong>async/await у тілі</strong></td>\n<td>✅</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><strong>useState/useEffect</strong></td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td><strong>Event handlers</strong></td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td><strong>DB/FS доступ напряму</strong></td>\n<td>✅</td>\n<td>❌</td>\n</tr>\n<tr>\n<td><strong>Йде в JS bundle</strong></td>\n<td>❌ (не йде!)</td>\n<td>✅</td>\n</tr>\n<tr>\n<td><strong>Browser APIs</strong></td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">File conventions</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "app/\n  layout.tsx        ← спільний layout (persistent)\n  page.tsx          ← UI роуту\n  loading.tsx       ← Suspense fallback\n  error.tsx         ← error boundary ('use client'!)\n  not-found.tsx     ← 404\n  route.ts          ← API Route Handler\n  template.tsx      ← ре-маунт при навігації (vs layout)"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Server Actions\n'use server';\nexport async function deletePost(id: string) {\n  const session = await getSession();\n  if (!session) throw new Error('Unauthorized');\n  await db.post.delete({ where: { id } });\n  revalidatePath('/posts');\n}\n// ⚠️ ЗАВЖДИ перевіряй права всередині Server Action — це публічний HTTP-ендпоінт."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Динамічні сегменти <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Папка</th>\n<th>URL, що матчить</th>\n<th><code>params</code></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>app/users/[id]/page.tsx</code></td>\n<td><code>/users/42</code></td>\n<td><code>{'{'} id: '42' {'}'}</code></td>\n</tr>\n<tr>\n<td><code>app/docs/[...slug]/page.tsx</code></td>\n<td><code>/docs/a/b/c</code> (1+)</td>\n<td><code>{'{'} slug: ['a','b','c'] {'}'}</code></td>\n</tr>\n<tr>\n<td><code>app/docs/[[...slug]]/page.tsx</code></td>\n<td><code>/docs</code> теж (0+)</td>\n<td><code>{'{'} slug: undefined {'}'}</code> для <code>/docs</code></td>\n</tr>\n<tr>\n<td><code>app/(marketing)/about/page.tsx</code></td>\n<td><code>/about</code> — <code>(marketing)</code> НЕ в URL</td>\n<td>Route group — лише для організації файлів/layout</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Навігація: <code>next/link</code> і клієнтські хуки</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import Link from 'next/link';\n<Link href=\"/users/42\">Профіль</Link>\n// клієнтська навігація без full reload + автоматичний prefetch у viewport\n\n'use client';\nimport { useRouter, usePathname, useSearchParams } from 'next/navigation';\nconst router = useRouter();       // router.push('/x'), router.refresh()\nconst pathname = usePathname();    // '/users/42'\nconst params = useSearchParams();  // ?tab=posts → params.get('tab')"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\"><span class=\"icon\">✅</span><p> У Server Component (<code>page.tsx</code> за замовчуванням) <code>params</code>/<code>searchParams</code> приходять як <strong>пропи</strong> — <code>useRouter</code>/<code>usePathname</code> непотрібні й недоступні. Клієнтські хуки — лише для Client Components.</p></div>\n<p>Просунуті/рідкісні конвенції — parallel routes (<code>@slot</code>) та intercepting routes (<code>(.)folder</code>, модалка з власним URL) — за межами типового Senior-інтерв'ю, знати про існування достатньо.</p>\n<h3 class=\"topic\">Route Handlers</h3>\n<p><code>route.ts</code> у будь-якій папці <code>app/</code> — повноцінний API-ендпоінт (<code>GET</code>/<code>POST</code>/... іменовані експорти), співіснує з <code>page.tsx</code> у тій самій папці лише якщо різні сегменти шляху.</p>\n<h3 class=\"topic\">Caching layers — найзаплутаніша тема Next <span class=\"tag tag-pit\">PITFALL</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Кеш</th>\n<th>Де</th>\n<th>Що кешує</th>\n<th>Як інвалідувати</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Request Memoization</strong></td>\n<td>Сервер, час одного рендеру</td>\n<td>Дедуплікація однакових <code>fetch</code> у дереві</td>\n<td>Сам минає після рендеру</td>\n</tr>\n<tr>\n<td><strong>Data Cache</strong></td>\n<td>Сервер, персистентний</td>\n<td>Результат <code>fetch</code> між запитами/деплоями</td>\n<td><code>revalidatePath/Tag</code>, <code>fetch(..., { next: { revalidate } })</code></td>\n</tr>\n<tr>\n<td><strong>Full Route Cache</strong></td>\n<td>Сервер, persist</td>\n<td>HTML+RSC payload статичних роутів</td>\n<td>Ребілд, або динамічний роут (opt-out)</td>\n</tr>\n<tr>\n<td><strong>Router Cache</strong></td>\n<td>Клієнт, in-memory</td>\n<td>RSC payload відвіданих роутів для back/forward</td>\n<td>Хард-рефреш, <code>router.refresh()</code></td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">React.cache() та Next.js after() <span class=\"tag tag-new\">Next.js 15</span></h3>\n<ul class=\"list\">\n<li><strong>React.cache()</strong> — Next.js автоматично дедуплікує однакові <code>fetch</code> у межах рендеру (Request Memoization). Але довільна async-робота (прямий запит до БД, ORM) такого не отримує. <code>cache()</code> обгортає функцію так, щоб повторні виклики з тими самими аргументами в межах рендеру поверталися з одного результату.</li>\n<li><strong>after()</strong> — планує роботу, що виконається <strong>після</strong> відправлення відповіді (логування, аналітика, інвалідація) — не затримує відповідь.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { cache } from 'react';\nimport { after } from 'next/server';\n\nconst getUser = cache(async (id: string) => db.user.findUnique({ where: { id } }));\n// getUser('42') викликаний 5 разів у дереві за один рендер → запит до БД лише раз\n\nexport async function updateProfileAction(formData: FormData) {\n  'use server';\n  await db.profile.update(/* ... */);\n  after(() => {                        // ПІСЛЯ того, як відповідь пішла користувачу\n    logAnalyticsEvent('profile_updated');\n    revalidateSearchIndex();\n  });\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Уникнення waterfall-запитів <span class=\"tag tag-pit\">PITFALL</span></h3>\n<p>У Server Component послідовний <code>await</code> легко стає прихованою проблемою: кожен наступний запит стартує лише після попереднього, хоча вони незалежні.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ Waterfall — послідовно (~400ms)\nasync function Page() {\n  const user = await getUser();     // 200ms\n  const posts = await getPosts();    // +200ms, хоча не залежить від user\n}\n\n// ✅ Паралельно — Promise.all (~200ms)\nasync function Page() {\n  const [user, posts] = await Promise.all([getUser(), getPosts()]);\n}\n\n// Частина залежить, частина ні — \"start early, await late\":\nasync function Page() {\n  const postsPromise = getPosts();     // стартував одразу, ще НЕ await\n  const user = await getUser();       // паралельно з postsPromise\n  const posts = await postsPromise;    // вже майже готовий\n}"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чим App Router відрізняється від Pages Router окрім файлової структури?",
          "answer": "App Router — на RSC за замовчуванням (серверні, доки не <code>'use client'</code>), вкладені layouts зі збереженням стану, паралельні/перехоплюючі маршрути, стрімінг через Suspense на рівні сегментів. Pages Router — усі компоненти клієнтські за замовчуванням, рендер-модель на рівні сторінки (<code>getServerSideProps</code>/<code>getStaticProps</code>), без гранулярного стрімінгу."
        },
        {
          "question": "Що означає <code>'use client'</code> — чи весь піддерево більше не рендериться на сервері?",
          "answer": "Позначає межу — усе, що <em>імпортується</em> з файлу, стає частиною клієнтського бандла й гідратується. Але це не відмова від SSR: клієнтський компонент усе одно рендериться на сервері раз для початкового HTML, потім гідрується. «Client» стосується бандлінгу й інтерактивності, а не відсутності серверного рендеру."
        },
        {
          "question": "Що заважає забути перевірити авторизацію в Server Action?",
          "answer": "Нічого, це відповідальність розробника — Action виглядає як звичайна функція, але викликається з клієнта як ендпоінт."
        },
        {
          "question": "4 рівні кешування Next.js.",
          "answer": "Request Memoization / Data Cache / Full Route Cache / Router Cache — сервер vs клієнт, per-request vs persistent."
        },
        {
          "question": "Навіщо React.cache(), якщо Next.js вже дедуплікує fetch?",
          "answer": "<code>fetch</code> дедуплікується завдяки внутрішньому патчу Next.js. Будь-яка інша async-робота (прямий запит до БД через ORM, сторонній SDK) патчу не має. <code>React.cache()</code> дає той самий per-request дедуп <em>вручну</em> для довільної async-функції."
        },
        {
          "question": "Чим Promise.all рятує від waterfall у Server Component і коли незастосовна?",
          "answer": "Послідовні <code>await</code> для незалежних джерел змушують кожен запит чекати попередній. <code>Promise.all</code> стартує обидва одразу. Незастосовно, якщо другий запит реально залежить від значення першого — тоді waterfall неминучий за дизайном."
        }
      ]
    },
    {
      "id": "react-19-future",
      "title": "✨ React 19 / майбутнє",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">React 19 — нове <span class=\"tag tag-new\">React 19</span></h3>\n<h3 class=\"topic\"><code>use()</code> — читання Promise / Context під час рендеру</h3>\n<p>Не хук: можна викликати умовно, в циклі, після early return. Читає <code>Promise</code> (suspend до resolve, найближчий <code>&lt;Suspense&gt;</code> показує fallback, помилку ловить Error Boundary) або <code>Context</code>.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {\n  const comments = use(commentsPromise);   // suspends до resolve — без useState для loading\n  return <ul>{comments.map(c => <li key={c.id}>{c.text}</li>)}</ul>;\n}\nfunction Toolbar() {\n  if (isHidden) return null;               // useContext() тут кинув би помилку\n  const theme = use(ThemeContext);         // use() можна після early return\n  return <div className={theme} />;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\"><code>useActionState</code> — форма + pending + помилка в одному хуку</h3>\n<p>Обгортає async-функцію (Server Action чи звичайну). Форма працює навіть без JS через нативний <code>&lt;form action&gt;</code>.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "async function updateName(prev: State, formData: FormData): Promise<State> {\n  const error = await saveName(formData.get('name'));\n  return error ? { error } : { ok: true };\n}\nfunction Form() {\n  const [state, formAction, isPending] = useActionState(updateName, {});\n  return (\n    <form action={formAction}>\n      <input name=\"name\" />\n      <button disabled={isPending}>Save</button>\n      {state.error && <p>{state.error}</p>}\n    </form>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\"><code>useOptimistic</code> — миттєве UI до відповіді сервера</h3>\n<p>Показує очікуваний результат одразу; при помилці React сам відкочує до реального стану.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Todos({ todos }: { todos: Todo[] }) {\n  const [optimistic, addOptimistic] = useOptimistic(\n    todos,\n    (state, newText: string) => [...state, { id: 'temp', text: newText, pending: true }],\n  );\n  async function action(formData: FormData) {\n    const text = formData.get('text') as string;\n    addOptimistic(text);               // UI оновлюється негайно\n    await saveTodo(text);              // помилка → optimistic відкотиться\n  }\n  return <form action={action}>{/* рендер optimistic */}</form>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\"><code>useFormStatus</code> — статус батьківської <code>&lt;form&gt;</code> без props-drilling</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function SubmitButton() {\n  const { pending } = useFormStatus();  // стан <form>, всередині якої відрендерений\n  return <button disabled={pending}>{pending ? 'Збереження…' : 'Зберегти'}</button>;\n}\n// <form action={action}><SubmitButton /></form>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\"><code>ref</code> як звичайний проп + <code>&lt;Context&gt;</code> як провайдер</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// React 19: forwardRef більше не потрібен — ref просто проп\nfunction Input({ ref, ...props }: React.ComponentProps<'input'>) {\n  return <input ref={ref} {...props} />;\n}\n// <Context> сам є провайдером — <Context.Provider> тепер зайве\nconst ThemeContext = createContext<Theme>('light');\n<ThemeContext value=\"dark\">{children}</ThemeContext>   // не <ThemeContext.Provider>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">React Compiler</h3>\n<p>Build-time інструмент, що автоматично вставляє мемоізацію (еквівалент <code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code>) там, де компілятор бачить сенс — без ручного розставляння. Опційний, поступово стабілізується. <strong>Для співбесіди все одно треба розуміти ручну оптимізацію</strong> — Compiler не замінює розуміння referential stability, лише автоматизує рутину.</p>\n<h3 class=\"topic\">Next.js 15 — зміни</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Async Request APIs\n// Next 14: const { id } = params;\n// Next 15: асинхронні (готують до стрімінгової моделі)\nconst { id } = await params;\nconst cookieStore = await cookies();"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Дефолт кешування змінився:</strong> <code>fetch</code> та GET Route Handlers <strong>більше не кешуються за замовчуванням</strong> (раніше — force-cache). Явно вмикай через <code>cache: 'force-cache'</code>.</p>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що таке <code>use()</code> і чим відрізняється від <code>useEffect</code> для проміс-подібних значень?",
          "answer": "<code>use()</code> — не хук (можна умовно, в циклах) — примітив, що читає значення проміса/контексту <strong>синхронно під час рендеру</strong>, інтегруючись із Suspense: якщо проміс не резолвнувся, компонент «підвішується», найближчий <code>&lt;Suspense&gt;</code> показує fallback. На відміну від <code>useEffect</code>, не потрібен окремий стан для loading/error."
        },
        {
          "question": "Чим React 19 Actions спрощують форми порівняно з <code>useState</code>+<code>try/catch</code>?",
          "answer": "<code>useActionState</code> об'єднує стан форми, pending і помилки в один хук навколо async-функції, автоматично керуючи progressive enhancement (форма працює без JS). <code>useOptimistic</code> показує очікуваний результат до підтвердження й автоматично відкочує при помилці — без ручного «оптимістичний vs підтверджений»."
        },
        {
          "question": "Чим use() відрізняється від await у Server Component?",
          "answer": "use() можна викликати умовно і в Client Components (для Context/переданого Promise); await у Server Component — ні для Client."
        },
        {
          "question": "React Compiler означає &quot;більше не треба знати useMemo&quot;?",
          "answer": "Ні — для співбесіди й дебагу edge-case'ів розуміння ручної мемоізації лишається обов'язковим."
        },
        {
          "question": "Навіщо <code>useFormStatus</code>, якщо <code>useActionState</code> вже повертає <code>isPending</code>?",
          "answer": "<code>useActionState</code> дає <code>isPending</code> у компоненті, що <strong>оголошує</strong> екшен. <code>useFormStatus</code> читає стан найближчої батьківської <code>&lt;form&gt;</code> зсередини будь-якого дочірнього компонента — кнопка/спінер дізнається про pending без props-drilling. Обмеження: хук має бути в компоненті <em>всередині</em> <code>&lt;form&gt;</code>."
        },
        {
          "question": "Що змінилось з <code>forwardRef</code> у React 19?",
          "answer": "<code>ref</code> став звичайним пропом (<code>function Input({ ref }) {…}</code> замість <code>forwardRef</code>). <code>forwardRef</code> ще працює для сумісності, але не потрібен. Так само <code>&lt;Context&gt;</code> рендериться напряму як провайдер, без <code>&lt;Context.Provider&gt;</code>."
        }
      ]
    },
    {
      "id": "view-transitions",
      "title": "🎬 View Transitions API",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Компонент &lt;ViewTransition&gt; <span class=\"tag tag-new\">React 19.2+</span></h3>\n<p>Раніше плавні переходи вимагали ручного <code>document.startViewTransition()</code> і синхронізації з React-рендером. Компонент <code>&lt;ViewTransition&gt;</code> з <code>react</code> робить це декларативно: обгортаєш вміст, React сам призначає <code>view-transition-name</code> і викликає браузерний API — <strong>ти ніколи не звертаєшся до <code>startViewTransition()</code> напряму</strong>.</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Правило розміщення:</strong> <code>&lt;ViewTransition&gt;</code> має бути <em>найзовнішнішою</em> обгорткою — з'являтися в DOM раніше за будь-який інший вузол свого піддерева, — щоб enter/exit спрацювали.</p></div>\n<h3 class=\"topic\">4 тригери анімації <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Тригер</th>\n<th>Коли</th>\n<th>Приклад</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>enter</code></td>\n<td>Вузол вперше вставлено в DOM</td>\n<td>Новий елемент списку</td>\n</tr>\n<tr>\n<td><code>exit</code></td>\n<td>Вузол вперше видалено з DOM</td>\n<td>Toast закрився</td>\n</tr>\n<tr>\n<td><code>update</code></td>\n<td>Мутація всередині або зсув сусідів (reflow)</td>\n<td>Розмір/позиція картки змінились</td>\n</tr>\n<tr>\n<td><code>share</code></td>\n<td>Іменований VT демонтується, і VT з тим самим <code>name</code> монтується в тому самому переході</td>\n<td>Мініатюра → фото (морфінг)</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Активують перехід лише <code>startTransition</code>, <code>useDeferredValue</code> та розкриття <code>&lt;Suspense&gt;</code>-межі. Звичайний <code>setState</code> оновлює DOM миттєво, без анімації.</p></div>\n<h3 class=\"topic\">Чек-лист розпізнавання патерна <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Патерн</th>\n<th>Сигнал</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Shared element</strong></td>\n<td>&quot;Той самий об'єкт іде глибше&quot; — однаковий <code>name</code> на елементі, що демонтується, і на тому, що монтується</td>\n</tr>\n<tr>\n<td><strong>Suspense reveal</strong></td>\n<td>&quot;Дані завантажились&quot; — контент виходить із fallback</td>\n</tr>\n<tr>\n<td><strong>List identity</strong></td>\n<td>&quot;Ті самі елементи переставились&quot; — стабільний <code>key</code> на кожному айтемі</td>\n</tr>\n<tr>\n<td><strong>State change</strong></td>\n<td>&quot;Щось з'явилось/зникло&quot; — прості enter/exit без спільного <code>name</code></td>\n</tr>\n<tr>\n<td><strong>Route change</strong></td>\n<td>Перехід на рівні цілої сторінки</td>\n</tr>\n</tbody>\n</table></div>\n<h3 class=\"topic\">Стилізація через CSS pseudo-elements</h3>\n<p>Браузер робить знімки &quot;до&quot; і &quot;після&quot; і монтує їх як псевдоелементи, які стилізуються звичайним CSS/<code>@keyframes</code>:</p>\n<ul class=\"list\">\n<li><code>::view-transition-old(name)</code> — знімок &quot;до&quot;</li>\n<li><code>::view-transition-new(name)</code> — знімок &quot;після&quot;</li>\n<li><code>::view-transition-group(name)</code> — контейнер, що анімує позицію/розмір</li>\n<li><code>::view-transition-image-pair(name)</code> — пара old+new разом (crossfade)</li>\n</ul>\n<h3 class=\"topic\">Next.js та доступність</h3>\n<p>У Next.js потрібен прапорець <code>experimental.viewTransition</code>; проп <code>transitionTypes</code> на <code>next/link</code>/<code>useRouter().push()</code> дозволяє позначити тип переходу (<code>&quot;forward&quot;</code> vs <code>&quot;back&quot;</code>).</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Завжди супроводжуй анімації <code>@media (prefers-reduced-motion: reduce)</code> — для частини користувачів анімації переходів мають бути вимкнені чи спрощені.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { unstable_ViewTransition as ViewTransition } from 'react';\n\nfunction PhotoGrid({ photos }: { photos: Photo[] }) {\n  return (\n    <div className=\"grid\">\n      {photos.map(photo => (\n        // спільний name → морфінг у деталі при переході на /photo/[id]\n        <ViewTransition key={photo.id} name={`photo-${photo.id}`}>\n          <Link href={`/photo/${photo.id}`}>\n            <img src={photo.thumbUrl} alt={photo.title} />\n          </Link>\n        </ViewTransition>\n      ))}\n    </div>\n  );\n}\nfunction PhotoDetail({ photo }: { photo: Photo }) {\n  return (\n    <ViewTransition name={`photo-${photo.id}`}>  {/* той самий name — \"той самий об'єкт\" */}\n      <img src={photo.fullUrl} alt={photo.title} />\n    </ViewTransition>\n  );\n}"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що робить <code>&lt;ViewTransition&gt;</code> і чим відрізняється від ручного <code>startViewTransition()</code>?",
          "answer": "Декларативна обгортка: React сам призначає <code>view-transition-name</code> і викликає <code>startViewTransition()</code> під капотом у потрібний момент, синхронізуючи анімацію зі станом. Ручний виклик — імперативний API, який треба координувати самому (легко розсинхронізувати знімок &quot;до&quot; з оновленням DOM)."
        },
        {
          "question": "Чому <code>&lt;ViewTransition&gt;</code>, вкладений у звичайний <code>&lt;div&gt;</code>, може не анімуватися?",
          "answer": "Правило розміщення: має бути найзовнішнішою обгорткою, щоб зафіксувати enter/exit. Якщо вкладений у <code>&lt;div&gt;</code>, яка сама не входить/виходить із DOM, React не бачить структурної зміни на потрібному рівні."
        },
        {
          "question": "Які тригери (enter/exit/update/share) активуються звичайним setState?",
          "answer": "Жоден — потрібні <code>startTransition</code>, <code>useDeferredValue</code> або розкриття Suspense-межі. Лише тоді React обгортає DOM-мутацію у <code>startViewTransition()</code>."
        },
        {
          "question": "Що таке &quot;shared element transition&quot; і як React визначає &quot;один і той самий&quot; елемент?",
          "answer": "Спільне ім'я (<code>name</code>) на двох <code>&lt;ViewTransition&gt;</code>, з яких один демонтується, а інший монтується в одному переході — React трактує це як морфінг &quot;того самого об'єкта&quot; (мініатюра → фото), а не окремі enter+exit."
        }
      ]
    },
    {
      "id": "testing-react-components",
      "title": "🧪 Тестування React-компонентів",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Тестуй поведінку, а не імплементацію <span class=\"tag tag-key\">KEY</span></h3>\n<p>Філософія сучасного тестування (Kent C. Dodds): <em>«чим більше твої тести нагадують те, як софтом користуються насправді, тим більше впевненості вони дають»</em>. Тестуй <strong>behavior</strong> — що бачить і робить користувач, — а не <strong>implementation details</strong> (внутрішній стан, назви методів, кількість ре-рендерів).</p>\n<ul class=\"list\">\n<li><strong>❌ Implementation details</strong> — ламається при рефакторингу без зміни поведінки. Enzyme заохочував саме це (<code>.state()</code>, <code>.instance()</code>, <code>shallow</code>).</li>\n<li><strong>✅ Behavior</strong> — переживає рефакторинг (клас → хуки). Знайти по ролі/тексту, клікнути, перевірити, що на екрані.</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// ❌ Implementation details — ламається при рефакторингу\nexpect(wrapper.state('isOpen')).toBe(true);\n// ✅ Behavior — виживає рефакторинг\nawait user.click(screen.getByRole('button', { name: /open menu/i }));\nexpect(screen.getByRole('menu')).toBeVisible();"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Testing Trophy — не піраміда</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Шар</th>\n<th>Обсяг</th>\n<th>Чим</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Static</td>\n<td>база</td>\n<td>TypeScript, ESLint</td>\n</tr>\n<tr>\n<td>Unit</td>\n<td>помірно</td>\n<td>утиліти, хуки, reducer'и</td>\n</tr>\n<tr>\n<td><strong>Integration</strong></td>\n<td><strong>більшість</strong></td>\n<td>рендер компонента з реальними дітьми, взаємодія, перевірка результату (RTL)</td>\n</tr>\n<tr>\n<td>E2E</td>\n<td>мало</td>\n<td>Playwright — критичні flow у реальному браузері</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Найбільше впевненості на одиницю зусиль дають <strong>integration-тести</strong> — основна маса тестів фронту.</p></div>\n<h3 class=\"topic\">Стек (2026)</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Інструмент</th>\n<th>Роль</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Vitest</strong></td>\n<td>Test runner — швидший за Jest, нативний ESM, ділить конфіг з Vite</td>\n</tr>\n<tr>\n<td><strong>Jest</strong></td>\n<td>Test runner — досі поширений (Next legacy, CRA)</td>\n</tr>\n<tr>\n<td><strong>React Testing Library</strong></td>\n<td>Рендер + запити до DOM</td>\n</tr>\n<tr>\n<td><code>@testing-library/user-event</code></td>\n<td>Симуляція взаємодії (краще за <code>fireEvent</code>)</td>\n</tr>\n<tr>\n<td><code>@testing-library/jest-dom</code></td>\n<td>Matchers: <code>toBeInTheDocument</code>, <code>toBeVisible</code></td>\n</tr>\n<tr>\n<td><strong>MSW</strong></td>\n<td>Мокання мережі на рівні network</td>\n</tr>\n<tr>\n<td><strong>Playwright</strong></td>\n<td>E2E у реальному браузері</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <strong>Enzyme мертвий</strong> — немає підтримки React 18+. Behavior-testing через RTL — стандарт.</p></div>\n<h3 class=\"topic\">Queries: getBy / queryBy / findBy <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Варіант</th>\n<th>Якщо елемента нема</th>\n<th>Async</th>\n<th>Use case</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>getBy…</code></td>\n<td>кидає error</td>\n<td>ні</td>\n<td>елемент має бути зараз</td>\n</tr>\n<tr>\n<td><code>queryBy…</code></td>\n<td>повертає <code>null</code></td>\n<td>ні</td>\n<td>перевірка <strong>відсутності</strong></td>\n</tr>\n<tr>\n<td><code>findBy…</code></td>\n<td>кидає error (після таймауту)</td>\n<td>так</td>\n<td>елемент з'явиться async</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Порядок пріоритету</strong> (сигнал seniority): <code>getByRole</code> → <code>getByLabelText</code> → <code>getByPlaceholderText</code> → <code>getByText</code> → … → <code>getByTestId</code> (останній resort).</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const btn = screen.getByRole('button', { name: /submit/i });   // є зараз\nexpect(screen.queryByText('Error')).not.toBeInTheDocument();    // відсутність\nconst item = await screen.findByText('Loaded');                 // async поява"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">userEvent &gt; fireEvent</h3>\n<p><code>fireEvent.change(input, …)</code> диспатчить <em>одну</em> синтетичну подію. <code>userEvent</code> імітує реальну послідовність (<code>focus → keydown → input → keyup</code>, pointer-події на клік) — ловить баги, яких одна подія не покаже. <code>userEvent</code> v14+ асинхронний.</p>\n<div class=\"alert\"><span class=\"icon\">🧭</span><p> <strong>AAA-патерн:</strong> Arrange (<code>render</code> + <code>userEvent.setup()</code>) → Act (взаємодія) → Assert (перевірка DOM).</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\n\ntest('показує помилку при невалідному email', async () => {\n  const user = userEvent.setup();            // Arrange\n  render(<SignupForm />);\n  await user.type(screen.getByLabelText(/email/i), 'not-an-email');  // Act\n  await user.click(screen.getByRole('button', { name: /submit/i }));\n  // Assert: findBy — асинхронний, чекає появи помилки\n  expect(await screen.findByText(/невалідний email/i)).toBeInTheDocument();\n  expect(screen.queryByText(/успішно/i)).not.toBeInTheDocument();  // queryBy — відсутність\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Async + мережа через MSW</h3>\n<p>Не мокай <code>fetch</code> вручну — перехоплюй на рівні мережі. Компонент виконує <strong>справжній</strong> запит, підміняється лише транспорт, тому тестується весь шлях. Той самий mock працює в тестах, Storybook і dev — на відміну від <code>jest.mock('axios')</code>.</p>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <code>afterEach(() =&gt; server.resetHandlers())</code> — обов'язково: скидає per-test оверайди, інакше тести течуть один в одного.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { http, HttpResponse } from 'msw';\nimport { setupServer } from 'msw/node';\n\nconst server = setupServer(\n  http.get('/api/users/:id', ({ params }) => HttpResponse.json({ id: params.id, name: 'Ada' })),\n);\nbeforeAll(() => server.listen());\nafterEach(() => server.resetHandlers());   // ізоляція тестів!\nafterAll(() => server.close());\n\ntest('рендерить користувача після завантаження', async () => {\n  render(<UserProfile userId=\"1\" />);\n  expect(await screen.findByText('Ada')).toBeInTheDocument();\n});\ntest('показує помилку при 500', async () => {\n  server.use(http.get('/api/users/:id', () => new HttpResponse(null, { status: 500 })));\n  render(<UserProfile userId=\"1\" />);\n  expect(await screen.findByText(/щось пішло не так/i)).toBeInTheDocument();\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">waitFor / findBy / act</h3>\n<ul class=\"list\">\n<li><code>await screen.findByText('Done')</code> — чекаєш появу елемента</li>\n<li><code>await waitFor(() =&gt; expect(mockFn).toHaveBeenCalled())</code> — довільна умова</li>\n<li><code>await waitForElementToBeRemoved(() =&gt; screen.queryByText(/loading/i))</code> — зникнення</li>\n</ul>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> Warning <code>&quot;not wrapped in act(...)&quot;</code> майже завжди = <strong>забув <code>await</code></strong> на async-оновленні стану. RTL авто-обгортає <code>render</code> і <code>userEvent</code>.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { renderHook, act, waitFor } from '@testing-library/react';\n\ntest('useCounter збільшує значення', () => {\n  const { result } = renderHook(() => useCounter(0));\n  act(() => result.current.increment());  // act потрібен явно поза event-handler\n  expect(result.current.count).toBe(1);\n});\ntest('useFetch завантажує дані', async () => {\n  const { result } = renderHook(() => useFetch('/api/data'));\n  expect(result.current.status).toBe('loading');\n  await waitFor(() => expect(result.current.status).toBe('success'));\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Провайдери: custom render wrapper</h3>\n<p>Реальні компоненти залежать від context/router/store. Senior-патерн — власний <code>render</code>, що загортає UI в провайдери з тестовими налаштуваннями (<code>retry: false</code> у QueryClient, <code>MemoryRouter</code>).</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// test-utils.tsx\nfunction customRender(ui: React.ReactElement, { route = '/', ...options } = {}) {\n  const queryClient = new QueryClient({\n    defaultOptions: { queries: { retry: false } },  // не ретраїти в тестах!\n  });\n  const Wrapper = ({ children }: { children: React.ReactNode }) => (\n    <QueryClientProvider client={queryClient}>\n      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>\n    </QueryClientProvider>\n  );\n  return render(ui, { wrapper: Wrapper, ...options });\n}\nexport * from '@testing-library/react';\nexport { customRender as render };  // тести імпортують render звідси"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Антипатерни — що НЕ тестувати</h3>\n<ul class=\"list\">\n<li><strong>Implementation details</strong> — state, назви функцій, кількість ре-рендерів</li>\n<li><strong>Сторонні бібліотеки</strong> — не тестуй, що React Router навігує; тестуй, що <em>твій</em> код реагує</li>\n<li><strong>Дитячі компоненти</strong> — зазвичай не мокай (це integration); мокай лише важке/зовнішнє (карти, чарти, платіжні iframe) через <code>vi.mock()</code></li>\n<li><strong>Великі snapshot-тести</strong> — нічого не ловлять; точково для малих виводів</li>\n<li><code>container.querySelector('.class')</code> — прив'язка до CSS крихка, юзай role/text</li>\n<li><strong>Coverage-driven</strong> — 100% coverage ≠ якість</li>\n</ul>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>a11y:</strong> <code>getByRole</code> вже змушує писати доступний markup; додатково — <code>jest-axe</code>: <code>expect(await axe(container)).toHaveNoViolations()</code>.</p></div>\n<div class=\"alert\"><span class=\"icon\">⏱️</span><p> <strong>Debounce/throttle:</strong> <code>vi.useFakeTimers()</code> + <code>vi.advanceTimersByTime(300)</code>; з <code>userEvent</code> v14 — <code>setup({ advanceTimers: vi.advanceTimersByTime })</code>, наприкінці <code>vi.useRealTimers()</code>.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { axe } from 'jest-axe';\n\ntest('немає порушень доступності', async () => {\n  const { container } = render(<SignupForm />);\n  expect(await axe(container)).toHaveNoViolations();\n});\ntest('debounce: запит іде один раз після паузи', async () => {\n  vi.useFakeTimers();\n  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });\n  render(<Search />);\n  await user.type(screen.getByRole('searchbox'), 'react');\n  vi.advanceTimersByTime(300);\n  expect(fetchSpy).toHaveBeenCalledTimes(1);\n  vi.useRealTimers();\n});"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чому RTL свідомо не дає доступу до внутрішнього стану (на відміну від Enzyme)?",
          "answer": "Філософія: &quot;чим більше тести нагадують реальне використання, тим більше впевненості&quot;. Тест, що читає <code>state</code> чи викликає приватний метод, лишається зеленим навіть при повному переписуванні реалізації — це тест <em>деталей реалізації</em>, а не поведінки. RTL надає лише API, доступний користувачу."
        },
        {
          "question": "Різниця між <code>getBy</code>, <code>queryBy</code>, <code>findBy</code>?",
          "answer": "<code>getBy*</code> — синхронний, кидає помилку одразу (елемент має бути зараз). <code>queryBy*</code> — синхронний, повертає <code>null</code> (єдиний спосіб перевірити <strong>відсутність</strong>). <code>findBy*</code> — асинхронний, ретраїть до таймауту (елемент з'явиться після async-дії)."
        },
        {
          "question": "Чому <code>userEvent</code> кращий за <code>fireEvent</code>?",
          "answer": "<code>fireEvent</code> диспатчить <em>одну</em> сиру подію. <code>userEvent</code> імітує <strong>повний ланцюг</strong> реальної взаємодії (<code>keydown→keypress→input→keyup</code> на ввід; <code>pointerdown→mousedown→focus→mouseup→click</code>), плюс перевіряє видимість/disabled — ловить баги, які <code>fireEvent</code> пропускає. v14+ асинхронний (<code>await</code>)."
        },
        {
          "question": "Як тестувати кастомний хук без JSX?",
          "answer": "Через <code>renderHook</code> — монтує хук у мінімальному тестовому компоненті й повертає <code>result.current</code> + <code>rerender</code>/<code>act</code>. Зміни стану всередині хука треба обгортати в <code>act()</code>, інакше React попереджає й DOM може не синхронізуватись."
        },
        {
          "question": "Чим MSW відрізняється від <code>jest.mock('./api')</code>?",
          "answer": "<code>jest.mock</code> підміняє JS-модуль — компонент викликає мок-функцію; тест перевіряє лише виклик з правильними аргументами. MSW перехоплює запит на мережевому рівні — компонент виконує <strong>реальний</strong> <code>fetch</code>, підміняється лише мережа, тому тестується весь шлях (URL, заголовки, статус) як у проді."
        }
      ]
    },
    {
      "id": "i18n-localization",
      "title": "🌐 Локалізація (i18n) React-застосунку",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">i18n · l10n · locale — три різні речі <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><strong>i18n (internationalization)</strong> — <em>підготовка</em> коду: винесення рядків, плюрал-правила, формати дат/чисел, RTL. Раз, розробником.</li>\n<li><strong>l10n (localization)</strong> — <em>власне переклад</em> під locale (uk-UA, en-US). Робота перекладачів.</li>\n<li><strong>locale</strong> — мова + регіон: <code>en-US</code> ≠ <code>en-GB</code> (формат дати, валюта, розділювачі тисяч).</li>\n</ul>\n<div class=\"alert\"><span class=\"icon\">💡</span><p> Сигнал seniority — розуміти, що i18n це <strong>не просто словник рядків</strong>, а плюрал-правила, формати, напрямок тексту, SEO і code-splitting перекладів.</p></div>\n<h3 class=\"topic\">Вибір бібліотеки</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Бібліотека</th>\n<th>Коли обирати</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>react-i18next</strong> (+ i18next)</td>\n<td>Дефолт для SPA/CSR. Найбагатша екосистема: detection, backend-loading, namespaces</td>\n</tr>\n<tr>\n<td><strong>react-intl</strong> (FormatJS)</td>\n<td>Суворі ICU-повідомлення, enterprise</td>\n</tr>\n<tr>\n<td><strong>next-intl</strong> / <strong>next-i18next</strong></td>\n<td>Next.js: App Router → <code>next-intl</code>, Pages Router → <code>next-i18next</code></td>\n</tr>\n<tr>\n<td><strong>Lingui</strong></td>\n<td>Компіляція повідомлень, менший рантайм, DX з макросами</td>\n</tr>\n<tr>\n<td>Нативний <code>Intl</code> API</td>\n<td>Форматування дат/чисел/множини <em>без</em> бібліотеки</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> Дефолт: <strong>react-i18next</strong> для SPA, <strong>next-intl</strong> для Next.js App Router.</p></div>\n<h3 class=\"topic\">Структура перекладів + namespaces</h3>\n<p><strong>Namespaces</strong> (<code>common</code>, <code>auth</code>, <code>checkout</code>) — розбивка словника на модулі: логічна структура + можливість вантажити лише потрібний файл. Прямий аналог feature-based модулів.</p>"
        },
        {
          "kind": "code",
          "language": "json",
          "code": "// src/locales/en/common.json — вкладені ключі та плюрал-форми\n{\n  \"greeting\": \"Hello, {{name}}!\",\n  \"cart\": {\n    \"empty\": \"Your cart is empty\",\n    \"items_one\": \"{{count}} item\",\n    \"items_other\": \"{{count}} items\"\n  }\n}"
        },
        {
          "kind": "code",
          "language": "js",
          "code": "// i18n.js — ініціалізація react-i18next\nimport i18n from 'i18next';\nimport { initReactI18next } from 'react-i18next';\nimport LanguageDetector from 'i18next-browser-languagedetector';\nimport HttpBackend from 'i18next-http-backend';\n\ni18n\n  .use(HttpBackend)        // lazy-load JSON по мережі\n  .use(LanguageDetector)   // визначити мову: localStorage -> navigator -> ...\n  .use(initReactI18next)\n  .init({\n    fallbackLng: 'en',\n    supportedLngs: ['en', 'uk'],\n    ns: ['common', 'auth'],\n    defaultNS: 'common',\n    interpolation: { escapeValue: false }, // React вже екранує XSS\n    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },\n  });\nexport default i18n;"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Використання в компоненті + перемикання мови\nimport { useTranslation } from 'react-i18next';\nfunction Header() {\n  const { t, i18n } = useTranslation('common');\n  return (\n    <header>\n      <h1>{t('greeting', { name: 'Roman' })}</h1>\n      <button onClick={() => i18n.changeLanguage('uk')}>UA</button>\n      <button onClick={() => i18n.changeLanguage('en')}>EN</button>\n    </header>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Плюралізація — не пиши власну логіку <span class=\"tag tag-key\">KEY</span></h3>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> <code>count === 1 ? 'item' : 'items'</code> ламається для мов зі складними правилами: українська/польська/російська мають <strong>3 форми</strong>, арабська — 6.</p></div>\n<p>i18next обирає форму за <strong>CLDR plural rules</strong> через нативний <code>Intl.PluralRules</code> — за суфіксами ключів <code>_one</code>/<code>_few</code>/<code>_many</code>/<code>_other</code>.</p>"
        },
        {
          "kind": "code",
          "language": "json",
          "code": "{\n  \"en\": { \"items_one\": \"{{count}} item\", \"items_other\": \"{{count}} items\" },\n  \"uk\": {\n    \"items_one\": \"{{count}} товар\",\n    \"items_few\": \"{{count}} товари\",\n    \"items_many\": \"{{count}} товарів\"\n  }\n}"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "t('items', { count: 1 }); // \"1 товар\"\nt('items', { count: 3 }); // \"3 товари\"\nt('items', { count: 5 }); // \"5 товарів\""
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">&lt;Trans&gt; — JSX усередині перекладу</h3>\n<p>Як перекласти <code>&quot;Click &lt;a&gt;here&lt;/a&gt; to continue&quot;</code> не розриваючи рядок (що ламає порядок слів)? <code>&lt;Trans&gt;</code> лишає розмітку в JSX, а переклад містить лише <strong>індекси</strong> дочірніх елементів.</p>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// JSX\n<Trans i18nKey=\"terms\">\n  I accept the <a href=\"/terms\">terms and conditions</a>\n</Trans>\n// uk/common.json → { \"terms\": \"Я приймаю <1>умови та положення</1>\" }"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Формати дат, чисел, валют — через <code>Intl</code>, не хардкод</h3>"
        },
        {
          "kind": "code",
          "language": "js",
          "code": "new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'EUR' }).format(1234.5); // \"1 234,50 €\"\nnew Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date());            // \"August 30, 2026\"\nnew Intl.RelativeTimeFormat('uk', { numeric: 'auto' }).format(-1, 'day');              // \"вчора\"\n\n// i18next прокидує ці опції через formatParams:\nt('price', { val: 1234.5, formatParams: { val: { style: 'currency', currency: 'EUR' } } });"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">RTL — арабська, іврит</h3>\n<p>Два кроки: (1) виставити напрямок на <code>&lt;html&gt;</code> при зміні мови, (2) писати CSS через <strong>logical properties</strong> — тоді layout дзеркалиться сам.</p>\n<div class=\"alert\"><span class=\"icon\">🧭</span><p> <code>margin-inline-start</code> замість <code>margin-left</code>, <code>padding-inline-end</code> замість <code>padding-right</code>, <code>text-align: start</code> замість <code>left</code>.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "useEffect(() => {\n  document.dir = i18n.dir(); // 'ltr' | 'rtl' — i18next знає напрямок locale\n}, [i18n.language]);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Продуктивність: lazy-load перекладів</h3>\n<ul class=\"list\">\n<li><strong>HttpBackend</strong> вантажить JSON по потребі (<code>loadPath</code>)</li>\n<li><strong>Namespace on demand:</strong> <code>useTranslation('checkout')</code> завантажить <code>checkout.json</code> лише коли компонент відрендериться</li>\n<li><strong>Code splitting:</strong> у головний бандл не потрапляє жоден переклад, лише активна locale</li>\n</ul>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const { t, ready } = useTranslation('checkout');\nif (!ready) return <Spinner />;  // namespace ще вантажиться"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Next.js специфіка + SEO <span class=\"tag tag-key\">KEY</span></h3>\n<p><strong>App Router (<code>next-intl</code>):</strong> locale у сегменті шляху (<code>/uk/about</code>), <code>middleware.ts</code> для detection/редіректу, переклади резолвляться на сервері в Server Components → у HTML <em>до</em> гідрації.</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>SEO must-have</th>\n<th>Навіщо</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>&lt;html lang={locale}&gt;</code></td>\n<td>Пошуковик і screen reader знають мову сторінки</td>\n</tr>\n<tr>\n<td><code>hreflang</code> alternate-теги</td>\n<td>Google показує правильну мовну версію</td>\n</tr>\n<tr>\n<td>Локалізовані URL (<code>/uk/...</code>)</td>\n<td>Кожна мова — окремий індексований URL; <strong>не</strong> query-параметр</td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// app/[locale]/page.tsx — переклад на сервері\nimport { useTranslations } from 'next-intl';\nexport default function Page() {\n  const t = useTranslations('common');\n  return <h1>{t('greeting', { name: 'Roman' })}</h1>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">TypeScript: типобезпечні ключі</h3>"
        },
        {
          "kind": "code",
          "language": "ts",
          "code": "// i18next.d.ts — t('wrong.key') дає помилку компіляції + автокомпліт\nimport 'i18next';\nimport common from './locales/en/common.json';\ndeclare module 'i18next' {\n  interface CustomTypeOptions {\n    defaultNS: 'common';\n    resources: { common: typeof common };\n  }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Процес і тулінг</h3>\n<ul class=\"list\">\n<li><strong>Не редагуй переклади вручну в проді</strong> — TMS: Lokalise, Crowdin, Phrase</li>\n<li><strong>Структуровані ключі</strong> (<code>cart.empty</code>), а не англійський текст як ID</li>\n<li><code>i18next-parser</code> витягує ключі з коду → знаходить пропущені й невикористані (lint)</li>\n<li><strong>Fallback chain:</strong> <code>uk → en → ключ</code>. Ніколи не показуй сирий ключ у проді</li>\n</ul>\n<div class=\"alert warn\"><span class=\"icon\">⚠️</span><p> У тестах <strong>не мокай <code>t</code> як <code>key =&gt; key</code></strong> — це ховає баги інтерполяції та плюралів. Використовуй реальний instance з мінімальним тестовим словником.</p></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { I18nextProvider } from 'react-i18next';\nimport i18n from './test-i18n';\ni18n.init({ lng: 'en', resources: { en: { common: { greeting: 'Hi {{name}}' } } } });\n\ntest('вітає користувача на активній мові', () => {\n  render(<I18nextProvider i18n={i18n}><Header /></I18nextProvider>);\n  expect(screen.getByText('Hi Roman')).toBeInTheDocument();\n});"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Різниця між i18n, l10n і locale, і чому <code>en-US ≠ en-GB</code>?",
          "answer": "<strong>i18n</strong> — підготовка коду (винесення рядків, плюрали, формати, RTL), раз розробником. <strong>l10n</strong> — власне переклад під locale, робота перекладачів. <strong>locale</strong> — мова + регіон: <code>en-US</code>/<code>en-GB</code> мають різний формат дати, валюту, розділювачі. Форматувати треба за повною locale."
        },
        {
          "question": "Чому <code>count === 1 ? &quot;item&quot; : &quot;items&quot;</code> — баг і як правильно?",
          "answer": "Припускає 2 форми, але українська/польська/російська мають <strong>3</strong> (one/few/many), арабська — 6. Правильно — CLDR plural rules через <code>Intl.PluralRules</code>: i18next обирає форму за суфіксом ключа (<code>_one</code>/<code>_few</code>/<code>_many</code>/<code>_other</code>) за <code>count</code> і locale."
        },
        {
          "question": "Як вставити посилання всередину перекладеного речення, не розриваючи рядок?",
          "answer": "Компонент <code>&lt;Trans&gt;</code>: розмітка лишається в JSX, переклад містить лише <strong>індекси</strong> дочірніх елементів (<code>&lt;1&gt;текст&lt;/1&gt;</code>). Перекладач редагує суцільний рядок з плейсхолдерами, розробник не конкатенує (що ламає порядок слів)."
        },
        {
          "question": "Чому не можна заімпортувати всі словники всіх мов і як це вирішують?",
          "answer": "Кожна мова + namespace = кілобайти в бандлі; 10 мов × 5 модулів роздують first load. Рішення: <strong>lazy-load</strong> — <code>i18next-http-backend</code> вантажить по потребі; <code>useTranslation(&quot;checkout&quot;)</code> підтягує лише при рендері; у головний бандл — лише активна locale."
        },
        {
          "question": "Чому для Next.js локалізовані URL + переклад на сервері кращі за client-side?",
          "answer": "Переклад у Server Components у <strong>HTML до гідрації</strong> — пошуковик і користувач без JS бачать перекладене одразу (client-only i18n віддає порожні ключі в SSR-HTML). Локалізований URL — окрема індексована сторінка на мову (на відміну від <code>?lang=uk</code>, який Google ігнорує). Плюс <code>&lt;html lang&gt;</code> і <code>hreflang</code>."
        }
      ]
    },
    {
      "id": "react-native-ecosystem",
      "title": "📱 React Native та поза-браузерні рендерери",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">React Native — той самий React, інший рендерер <span class=\"tag tag-key\">KEY</span></h3>\n<p>Компонентна модель, JSX, хуки, реконсиляція — ідентичні React DOM. Відмінність — <strong>куди</strong> React рендерить дерево: замість DOM-вузлів React Native промальовує справжні нативні UI-компоненти iOS/Android через власний рендерер.</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>React DOM</th>\n<th>React Native</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Що рендериться</td>\n<td>DOM-вузли (<code>div</code>, <code>span</code>)</td>\n<td>Нативні UI-компоненти (<code>UIView</code>/<code>android.view</code>)</td>\n</tr>\n<tr>\n<td>Розмітка</td>\n<td><code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;button&gt;</code></td>\n<td><code>&lt;View&gt;</code>, <code>&lt;Text&gt;</code>, <code>&lt;Pressable&gt;</code></td>\n</tr>\n<tr>\n<td>Стилі</td>\n<td>CSS / CSS-in-JS / Tailwind</td>\n<td><code>StyleSheet</code> — підмножина Flexbox, без CSS-каскаду</td>\n</tr>\n<tr>\n<td>Навігація</td>\n<td>React Router / Next.js</td>\n<td>React Navigation (свій стек екранів, не History API)</td>\n</tr>\n</tbody>\n</table></div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Той самий компонентний код — інші теги замість DOM-елементів\nimport { View, Text, Pressable, StyleSheet } from 'react-native';\nfunction Counter() {\n  const [count, setCount] = useState(0); // useState — той самий хук\n  return (\n    <View style={styles.container}>\n      <Text style={styles.label}>{count}</Text>\n      <Pressable onPress={() => setCount(c => c + 1)}>\n        <Text>+1</Text>\n      </Pressable>\n    </View>\n  );\n}\nconst styles = StyleSheet.create({\n  container: { flexDirection: 'row', alignItems: 'center', gap: 8 },\n  label: { fontSize: 18, fontWeight: 'bold' },\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Expo — стандартний старт для React Native</h3>\n<p><strong>Expo</strong> — набір інструментів над React Native (CLI, готові нативні модулі, OTA-оновлення без ре-білду, збірка в хмарі), що прибирає потребу одразу возитись з Xcode/Android Studio. Типова відправна точка для нового RN-проєкту; &quot;eject&quot; у голий RN CLI лишається опцією, коли потрібен нативний модуль поза екосистемою Expo.</p>\n<div class=\"alert\"><span class=\"icon\">📜</span><p> <strong>Історична довідка — React VR:</strong> експериментальний фреймворк Meta (2017) для WebVR/3D — офіційно припинено (поглинений React 360, який теж не розвивається). Сьогодні для VR/3D у вебі — <code>react-three-fiber</code> (React-рендерер поверх Three.js). Питання про React VR зазвичай перевіряє знання, що технологія застаріла.</p></div>\n<ul class=\"list\">\n<li><a href=\"/react-native\">📱 React Native — повний курс</a> — Expo vs bare workflow, Flexbox-стилі, навігація, нативні API та дозволи, Hermes і продуктивність списків, тестування (Detox/Maestro) та деплой через EAS.</li>\n</ul>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Що React Native &quot;перевикористовує&quot; від React, а що інше?",
          "answer": "Перевикористовується <strong>модель компонентів</strong> — JSX, <code>props</code>/<code>state</code>, хуки, реконсиляція/Fiber — ідентично. Інше — <strong>рендерер</strong>: замість DOM-вузлів рендерить нативні UI-компоненти (<code>&lt;View&gt;</code> → <code>UIView</code>/<code>android.view.View</code>), замість CSS — Flexbox через <code>StyleSheet</code>. React — &quot;мова опису дерева UI й моделі оновлень&quot;, а куди воно промальовується — питання рендерера."
        },
        {
          "question": "Що таке &quot;New Architecture&quot; (Fabric + TurboModules) і яку проблему моста вона вирішує?",
          "answer": "Стара архітектура спілкувалась між JS і нативним UI через асинхронний <strong>bridge</strong> (JSON-серіалізація) — затримка й &quot;бутилкове горлечко&quot; для UI високої частоти (жести, анімації, скрол). Fabric і TurboModules переходять на <strong>JSI (JavaScript Interface)</strong> — прямі синхронні виклики без серіалізації, що прибирає затримку й дозволяє JS напряму тримати посилання на нативні об'єкти."
        }
      ]
    },
    {
      "id": "career-growth",
      "title": "🧭 Після основ: кар'єрний шлях React-розробника",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Знання React — лише половина. Друга — вміти <strong>показати</strong> це знання й розвивати системно.</p>\n<h3 class=\"topic\">Дорожня карта навичок <span class=\"tag tag-key\">KEY</span></h3>\n<ul class=\"list\">\n<li><strong>Junior → Middle:</strong> TypeScript без <code>any</code>, хуки й кастомні хуки, форми + валідація (RHF + Zod), роутинг, робота з API (TanStack Query), базові тести (RTL), Git-флоу з PR і code review.</li>\n<li><strong>Middle → Senior:</strong> внутрішня модель рендеру й продуктивність (Profiler, мемоізація за вимірами), архітектура стану, Next.js App Router і RSC, a11y, безпека (XSS, зберігання токенів), CI/CD, System Design фронтенду, менторинг.</li>\n</ul>\n<h3 class=\"topic\">Портфоліо, яке читають</h3>\n<ul class=\"list\">\n<li><strong>1–2 доведені до кінця проєкти</strong> замість десяти туторіальних клонів: задеплоєні, з README (що, навіщо, стек, як запустити, скриншот) і осмисленою історією комітів.</li>\n<li>Показуй <strong>рішення</strong>, а не лише UI: чому обрано такий state-менеджер, як оброблено помилки/завантаження, які тести.</li>\n<li>Внесок в open source (навіть документація/баг) і технічні нотатки/статті — сигнал, що ти вмієш пояснювати.</li>\n</ul>\n<h3 class=\"topic\">Підготовка до співбесіди</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Етап</th>\n<th>Що перевіряють</th>\n<th>Як готуватись</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Теорія JS/React</td>\n<td>Closures, event loop, реконсиляція, хуки, стан</td>\n<td>Розділи «Теорія» + попапи «Питання на співбесіді»</td>\n</tr>\n<tr>\n<td>Live coding</td>\n<td>Компонент або кастомний хук за 30–45 хв, алгоритми</td>\n<td>Практичні задачі та LeetCode; проговорюй міркування вголос</td>\n</tr>\n<tr>\n<td>System Design</td>\n<td>Архітектура фронтенду: стан, кешування, рендер-модель, API</td>\n<td>Розділ «Архітектура», починай з вимог і обмежень</td>\n</tr>\n<tr>\n<td>Behavioral</td>\n<td>Командна робота, конфлікти, помилки, відповідальність</td>\n<td>3–5 історій у форматі STAR заздалегідь</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"alert good\"><span class=\"icon\">✅</span><p> <strong>Порада:</strong> після кожної співбесіди записуй питання, на яких «плавав», і закривай їх до наступної — найшвидший цикл зворотного зв'язку.</p></div>"
        }
      ],
      "interviewQuestions": [
        {
          "question": "Чим middle React-розробник відрізняється від senior, окрім років?",
          "answer": "Middle <strong>впевнено реалізує фічу</strong> в існуючій архітектурі (хуки, стан, роутинг, тести). Senior <strong>відповідає за рішення</strong>: обирає межі стану (server vs client, що в URL), бачить ціну абстракції наперед, пояснює <em>чому</em> компонент ре-рендериться і як виміряти (Profiler), помічає ризики (race conditions, a11y, безпека) і розвантажує команду (code review, документація, менторинг). Хороша відповідь — з конкретним прикладом."
        },
        {
          "question": "Як тримаєшся в курсі змін React і що тягнеш у прод?",
          "answer": "Первинні джерела: <code>react.dev/blog</code>, RFC-репозиторій, changelog Next.js. Нову можливість спершу пробую в pet-проєкті/ізольованій гілці, дивлюсь на <strong>стабільність API, підтримку екосистеми</strong> і на те, яку <em>реальну</em> проблему вона знімає. У прод — поступово, за feature-flag, з метриками до/після. «Нове» саме по собі не аргумент."
        },
        {
          "question": "Розкажи про технічне рішення, про яке пізніше пошкодував.",
          "answer": "Перевіряє <strong>рефлексію</strong>. Структура (STAR): контекст → яке рішення і чому здавалось правильним → як проявилась проблема (метрика/баги/швидкість) → як виправив → який висновок. Погана відповідь — «таких не було» чи звинувачення інших; хороша — чесний trade-off (напр. передчасна універсальна абстракція, що обросла boolean-пропсами)."
        }
      ]
    }
  ]
}
