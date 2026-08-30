// React — методичка від основ до Senior.
// Розширена версія (reactContent) + шпаргалка (reactCheat) поверх спільної
// структури секцій. Формат контенту — TopicContent/ContentBlock (types.ts).
import type { TopicContent } from './types'

export const reactContent: TopicContent = {
  slug: 'react',
  intro: [
    {
      kind: 'paragraph',
      html: `<p>Гайд побудований як шлях від "пишу перший компонент" до "поясню, чому він ре-рендерився" на Senior-співбесіді. Блоки 0–1 — фундамент, 2–5 — поглиблений React, 6–8 — Next.js та найсвіжіше. Кожен розділ має практичні приклади й блок <strong>🎤 На співбесіді часто запитують</strong> — саме там питання, які реально ставлять.</p>`,
    },
  ],
  sections: [
    /* ============================= BLOCK -1 — BIG PICTURE & TOOLING ============================= */
    {
      id: 'history-versions',
      title: '📜 Історія версій React',
      interviewQuestions: [
        {
          question: 'Що змінилось у переході від React 17 до React 18, і чому це вважається переламним релізом?',
          answer: 'React 18 ввів <strong>concurrent rendering</strong> як фундамент: <code>createRoot</code> замість <code>ReactDOM.render</code>, автоматичний <strong>batching</strong> для всіх оновлень (не лише в React-обробниках), нові хуки <code>useTransition</code>/<code>useDeferredValue</code>/<code>useId</code>, та Suspense для data fetching на сервері (<code>renderToPipeableStream</code>). До 18 паралельний рендеринг був недоступний — усе рендерилось синхронно й блокуюче.',
        },
        {
          question: 'Чим React 19 відрізняється концептуально від попередніх мажорних версій?',
          answer: 'React 19 зміщує фокус з <em>клієнтських оптимізацій</em> на <strong>full-stack модель</strong>: Actions (<code>useActionState</code>, <code>useFormStatus</code>, <code>useOptimistic</code>) для форм і мутацій, стабільні Server Components/Server Functions, <code>use()</code> для читання проміс/контексту прямо під час рендеру, і відмову від <code>forwardRef</code> — <code>ref</code> тепер звичайний prop.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="version-row">
    <span class="ver ver-15">v0.3 · 2013</span>
    <span class="ver ver-16">v15 · 2016</span>
    <span class="ver ver-17">v16 · 2017</span>
    <span class="ver ver-18">v16.8 · 2019</span>
    <span class="ver ver-19">v17 · 2020</span>
    <span class="ver ver-20">v18 · 2022</span>
    <span class="ver ver-21">v19 · 2024 ✦</span>
  </div>
  <div class="changelog changelog-past">
    <div class="changelog-title">🕐 Історія</div>
    <div class="changelog-row"><span class="chver">2013</span><span class="changelog-text">Open-source реліз (Facebook) — Virtual DOM як основна ідея, ще з домішками Flux</span></div>
    <div class="changelog-row"><span class="chver">2015</span><span class="changelog-text">React Native — той самий компонентний підхід для мобільних застосунків</span></div>
    <div class="changelog-row"><span class="chver">2016 · v15</span><span class="changelog-text">Останній реліз перед переписом реконсилера — стабільна, але синхронна модель рендерингу</span></div>
    <div class="changelog-row"><span class="chver">2017 · v16</span><span class="changelog-text">Fiber-архітектура (повний переписаний реконсилер), Fragments, Error Boundaries, Portals</span></div>
    <div class="changelog-row"><span class="chver">2019 · v16.8</span><span class="changelog-text"><strong>Hooks</strong> — useState/useEffect/... Функціональні компоненти отримують стан без класів</span></div>
    <div class="changelog-row"><span class="chver">2020 · v17</span><span class="changelog-text">"No new features" реліз — підготовка до поступових апгрейдів, новий JSX transform (без ручного <code>import React</code>)</span></div>
    <div class="changelog-row"><span class="chver">2022 · v18</span><span class="changelog-text">Concurrent rendering, automatic batching, <code>useTransition</code>/<code>useDeferredValue</code>, Suspense для data fetching, перші Server Components</span></div>
    <div class="changelog-row"><span class="chver">2024 · v19 ✦</span><span class="changelog-text"><strong>Поточна:</strong> Actions, <code>use()</code>, <code>useActionState</code>, <code>useOptimistic</code>, React Compiler (RC)</span></div>
  </div>
  <p><strong>Головний вектор 2013 → 2024:</strong> від "бібліотеки для рендерингу View у MVC" → до власної рантайм-моделі з конкурентним рендерингом і серверними компонентами. Найбільший зсув для щоденної роботи — <strong>Hooks (2019)</strong>: класи перестали бути обов'язковими для стану/lifecycle (детально — розділ "🏛️ Class vs Functional" нижче).</p>`,
        },
      ],
    },
    {
      id: 'library-vs-framework',
      title: '📚 Бібліотека чи фреймворк? + Virtual DOM',
      interviewQuestions: [
        {
          question: 'Чому React офіційно позиціонують як бібліотеку, а не фреймворк, і які практичні наслідки цього для команди?',
          answer: 'Бібліотека вирішує <strong>одну задачу</strong> — рендеринг UI за станом — і не нав\'язує роутинг, data fetching чи структуру проєкту. Наслідок: команда сама обирає роутер, стейт-менеджер, збірку — це гнучкість, але й ризик неузгоджених рішень між проєктами; тому великі команди часто стандартизують на фреймворку поверх React (Next.js) саме щоб закрити ці прогалини.',
        },
        {
          question: 'Що таке Virtual DOM і чи є він причиною того, що React швидкий?',
          answer: 'Virtual DOM — це легковагове дерево JS-об\'єктів, що описує бажаний UI. Сам по собі він <strong>не є джерелом швидкодії</strong> — прямі DOM-операції можуть бути навіть швидшими за diffing. Реальна цінність VDOM — <em>декларативна модель програмування</em> (пишеш «який стан → який UI», а не послідовність мутацій) плюс можливість батчити та пріоритизувати оновлення перед застосуванням до реального DOM.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Чому React — бібліотека, а не фреймворк <span class="tag tag-key">KEY</span></h3>
  <p>Ключова відмінність — <strong>хто кого викликає (inversion of control)</strong>. З фреймворком (Angular) твій код вбудовується у чужий "скелет": фреймворк визначає структуру проєкту, routing, HTTP, forms, DI — і сам викликає твій код у визначених точках. З бібліотекою (React) — навпаки: <strong>ти сам вирішуєш архітектуру</strong> і викликаєш React там, де потрібен UI-рендеринг; router, HTTP-клієнт, state-менеджер — окремі бібліотеки, які ти підбираєш сам (Next.js/TanStack Router, TanStack Query, Zustand — усе це вибір, а не частина "коробки").</p>
  <div class="grid2">
    <div class="card"><h4>Framework (Angular)</h4><p>"Не дзвони нам, ми подзвонимо тобі" — DI-контейнер, модулі, lifecycle hooks викликаються фреймворком за жорсткими правилами.</p></div>
    <div class="card blue"><h4>Library (React)</h4><p>Ти пишеш звичайний JS/TS-застосунок і <em>імпортуєш</em> React там, де потрібен декларативний UI. Решта архітектури — твій вибір.</p></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Практичний наслідок для співбесіди: "React-екосистема" (Next.js, React Router, TanStack) існує саме тому, що сам React навмисно не вирішує ці питання — на відміну від Angular, де вони вбудовані.</span></div>
  <h3 class="topic">Virtual DOM — 30-секундна версія</h3>
  <p>Робота з реальним DOM напряму — повільна (reflow/repaint на кожну зміну). React будує легкий JS-опис UI (Virtual DOM), порівнює нову версію зі старою і застосовує до справжнього DOM лише мінімальний набір змін. <strong>Це вступ</strong> — повний механізм (Fiber, reconciliation, diffing-правила) — у розділі "Reconciliation, Virtual DOM, Fiber" нижче.</p>`,
        },
      ],
    },
    {
      id: 'tooling-vite',
      title: '🧰 Vite та інструменти збірки',
      interviewQuestions: [
        {
          question: 'Чому індустрія масово перейшла з Create React App на Vite?',
          answer: 'CRA використовував Webpack без code-splitting конфігурації з коробки й пересобирав весь бандл при кожній зміні — dev-старт і HMR деградували з ростом проєкту. Vite в dev-режимі не бандлить взагалі: віддає ES-модулі напряму браузеру через <code>esbuild</code> (написаний на Go, у 10-100x швидший за JS-бандлери), а для production-збірки використовує Rollup. CRA офіційно deprecated.',
        },
        {
          question: 'У чому різниця між dev-сервером Vite та production-збіркою з точки зору того, що виконує браузер?',
          answer: 'У dev Vite віддає нативні ESM-модулі «як є» — трансформація (JSX, TS) відбувається on-demand через esbuild лише для файлів, які реально запитує браузер, тому холодний старт майже миттєвий незалежно від розміру проєкту. У production Vite перемикається на Rollup: tree-shaking, chunking, мінифікація — тобто dev і prod використовують <strong>різні збірники</strong>, а не один інструмент у двох режимах.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що таке Vite <span class="tag tag-key">KEY</span></h3>
  <p>Dev-сервер + білд-інструмент. У розробці Vite віддає файли як нативні ES-модулі прямо браузеру (компілює/трансформує лише файл, який реально запитав браузер, через esbuild — миттєвий старт і HMR незалежно від розміру проєкту). Для продакшн-білда використовує Rollup — трясе дерево (tree-shaking), об'єднує чанки.</p>
  <h3 class="topic">Хто був до Vite</h3>
  <div class="grid2">
    <div class="card red"><h4>Create React App (CRA)</h4><p>Офіційний starter від Meta (2016-2023, <strong>❌ deprecated</strong>). Webpack під капотом, повністю схований від розробника — зручно для старту, але жодного тонкого контролю над конфігурацією без <code>eject</code> (незворотній розрив "коробки").</p></div>
    <div class="card"><h4>Webpack (вручну)</h4><p>Найпопулярніший бандлер 2015-2020. Бандлить <strong>увесь</strong> граф залежностей ще ДО старту dev-сервера — час холодного старту росте лінійно з розміром проєкту. Досі домінує в legacy-кодовій базі й Next.js Pages Router.</p></div>
  </div>
  <h3 class="topic">Сучасні інструменти — по одному <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card blue"><h4>Vite (Evan You, автор Vue)</h4><p>Dev — нативні ES-модулі напряму браузеру (0 бандлінгу для старту), esbuild лише для pre-bundling залежностей. Прод — Rollup. Стандарт для нових SPA-проєктів на 2024+.</p></div>
    <div class="card green"><h4>Next.js (Vercel)</h4><p>Не просто бандлер — повноцінний фреймворк поверх React із роутингом/SSR/RSC (Block 6-7). Обирають, коли потрібен React + сервер-рендеринг з коробки, а не лише швидкий dev-сервер для SPA.</p></div>
    <div class="card yellow"><h4>Turbopack (Vercel, Rust)</h4><p>Наступник Webpack від тієї ж команди, що робить Next.js — саме він працює під капотом <code>next dev</code>/<code>next build</code> у нових версіях Next.js. Inkremental-компіляція на рівні функцій, а не файлів.</p></div>
    <div class="card"><h4>Rspack (ByteDance, Rust)</h4><p>Webpack-сумісний за API (той самий <code>webpack.config.js</code> здебільшого працює) — дає змогу мігрувати з Webpack на швидший рушій майже без переписування конфігурації.</p></div>
    <div class="card blue"><h4>Parcel</h4><p>"Zero-config" бандлер — узагалі без конфіг-файлу для типового проєкту, автоматично визначає, що і як бандлити. Менш популярний за Vite сьогодні, але історично був першим "просто працює" інструментом.</p></div>
  </div>
  <div class="table-wrap">
    <table>
      <tr><th>Інструмент</th><th>Тип</th><th>Швидкість dev-старту</th><th>Коли обирати</th></tr>
      <tr><td>Vite</td><td>Dev-сервер + Rollup</td><td>Дуже висока (ESM, без бандлінгу)</td><td>Новий SPA-проєкт за замовчуванням</td></tr>
      <tr><td>Webpack</td><td>Бандлер</td><td>Низька на великих проєктах</td><td>Legacy-підтримка, специфічні плагіни без аналогів</td></tr>
      <tr><td>CRA</td><td>Starter (Webpack)</td><td>Низька</td><td>❌ Не обирати — deprecated</td></tr>
      <tr><td>Next.js</td><td>Фреймворк (Turbopack всередині)</td><td>Висока</td><td>Потрібен SSR/RSC/роутинг з коробки</td></tr>
      <tr><td>Turbopack</td><td>Бандлер (Rust)</td><td>Найвища (функція-рівнева інкрементальність)</td><td>Разом з Next.js; ще не для standalone-використання поза ним</td></tr>
      <tr><td>Rspack</td><td>Бандлер (Rust, Webpack-сумісний)</td><td>Висока</td><td>Міграція з великого Webpack-конфіга без переписування</td></tr>
      <tr><td>Parcel</td><td>Бандлер (zero-config)</td><td>Середня</td><td>Малі проєкти/прототипи, де не хочеться писати конфіг взагалі</td></tr>
    </table>
  </div>
  <h3 class="topic">Створення проєкту — покроково</h3>`,
        },
        {
          kind: 'code',
          language: 'bash',
          code: `npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev          # dev-сервер з HMR, за замовчуванням localhost:5173

# Структура після створення:
# index.html          ← точка входу (НЕ в public/, на відміну від CRA!)
# src/main.tsx         ← createRoot(...).render(<App />)
# src/App.tsx
# vite.config.ts       ← плагіни (@vitejs/plugin-react), aliases, dev-сервер`,
        },
      ],
    },
    {
      id: 'tooling-vscode',
      title: '🖥️ React + VS Code',
      interviewQuestions: [
        {
          question: 'Які VS Code розширення чи налаштування ти вважаєш обов\'язковими для продуктивної роботи з React і чому саме вони?',
          answer: 'Мінімум: ESLint + Prettier (з <code>eslint-plugin-react-hooks</code> — ловить порушення правил хуків ще до рантайму), TypeScript-плагін для type-checking у редакторі, і snippet/IntelliSense для JSX. <code>eslint-plugin-react-hooks</code> критичний саме тому, що порушення правил хуків (умовний виклик, виклик у циклі) — це баги, які не завжди падають одразу, а проявляються як плутанина у стані.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Обов'язкові розширення <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Розширення</th><th>Навіщо</th></tr>
      <tr><td><strong>ES7+ React/Redux/React-Native Snippets</strong></td><td>Сніпети <code>rfc</code>/<code>rafce</code> — функціональний компонент за секунду (<code>rcc</code> — класовий, лише для легасі)</td></tr>
      <tr><td><strong>Prettier</strong></td><td>Автоформатування — прибирає суперечки про стиль коду в команді</td></tr>
      <tr><td><strong>ESLint</strong></td><td>Лінтинг у редакторі в реальному часі (правила Rules of Hooks — <code>eslint-plugin-react-hooks</code> ловить порушення до рантайму)</td></tr>
      <tr><td><strong>Auto Rename Tag</strong></td><td>Перейменування відкриваючого JSX-тега автоматично перейменовує закриваючий</td></tr>
      <tr><td><strong>Tailwind CSS IntelliSense</strong></td><td>Автодоповнення utility-класів + підсвітка кольорів (якщо проєкт на Tailwind)</td></tr>
    </table>
  </div>
  <h3 class="topic">Що таке сніпет і що означають ці абревіатури <span class="tag tag-key">KEY</span></h3>
  <p>VS Code <strong>сніпет</strong> — текстовий префікс, який після вводу й натискання <code>Tab</code>/<code>Enter</code> розгортається у заготовку коду з полями для заповнення (tab-stops). Розширення ES7+ Snippets додає готові React-сніпети:</p>
  <div class="table-wrap">
    <table>
      <tr><th>Префікс</th><th>Розшифровка</th><th>Що генерує</th></tr>
      <tr><td><code>rfc</code></td><td>React Functional Component</td><td>Функціональний компонент, <code>export default function</code></td></tr>
      <tr><td><code>rafce</code></td><td>React Arrow Function Component Export</td><td>Те саме, але як стрілкова функція з <code>export default</code> одразу зверху</td></tr>
    </table>
  </div>
  <h3 class="topic"><code>rfc</code> — приклад</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// rfc / rafce → генерує:
export default function ComponentName() {
  return <div>ComponentName</div>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Корисні налаштування <code>settings.json</code></h3>`,
        },
        {
          kind: 'code',
          language: 'json',
          code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "editor.quickSuggestions": { "strings": true } // автодоповнення в className/JSX-атрибутах
}`,
        },
      ],
    },
    /* ============================= BLOCK 0 — FUNDAMENTALS ============================= */
    {
      id: 'fundamentals-components-jsx',
      title: '🧱 Компоненти та JSX',
      interviewQuestions: [
        {
          question: 'JSX компілюється у виклики функцій — які саме, і чим це відрізняється у класичному та новому JSX-трансформі?',
          answer: 'Класичний трансформ компілює <code>&lt;div /&gt;</code> у <code>React.createElement(\'div\', null)</code>, тому файл мусив імпортувати <code>React</code> навіть без прямого використання. Новий automatic JSX runtime (React 17+) компілює у виклик <code>jsx</code>/<code>jsxs</code> з <code>react/jsx-runtime</code>, який імпортується автоматично — звідси зникла потреба у <code>import React from \'react\'</code> лише заради JSX.',
        },
        {
          question: 'Чому в React не можна повертати два JSX-елементи без обгортки, і які варіанти обгортки є найдешевшими?',
          answer: 'JSX-вираз повинен резолвитись в один <code>React.createElement</code>-виклик (одне значення), тому кілька сусідніх елементів без спільного кореня — синтаксична помилка. Найдешевший варіант — <code>&lt;&gt;...&lt;/&gt;</code> (Fragment): не створює зайвого DOM-вузла й не впливає на CSS-селектори на кшталт <code>:nth-child</code>, на відміну від обгортки в <code>&lt;div&gt;</code>.',
        },
        {
          question: `Чим element tree відрізняється від Fiber tree?`,
          answer: `element tree перестворюється щорендеру (дешеві плейн-обʼєкти), Fiber tree персистентна і зберігає стан між рендерами — саме її React diff'ить.`,
        },
        {
          question: `Чому <code>&lt;&gt;...&lt;/&gt;</code> іноді не підходить у <code>.map()</code>?`,
          answer: `коротка форма не приймає <code>key</code>, а список без key ламає reconciliation (Block 1) — потрібен повний <code>&lt;React.Fragment key={...}&gt;</code>.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Компонент — це просто функція <span class="tag tag-key">KEY</span></h3>
  <p>React-компонент — звичайна JS-функція, що приймає об'єкт <code>props</code> і повертає опис UI (JSX). Ім'я компонента <strong>завжди з великої літери</strong> — так React відрізняє компонент (<code>&lt;Button/&gt;</code>) від звичайного HTML-тега (<code>&lt;button/&gt;</code>).</p>
  <div class="grid2">
    <pre><span class="kw">function</span> <span class="fn">Greeting</span>({ name }: { name: <span class="type">string</span> }) {
  <span class="kw">return</span> <span class="jsx">&lt;h1&gt;</span>Привіт, {name}!<span class="jsx">&lt;/h1&gt;</span>;
}
<span class="cmt">// Використання:</span>
<span class="jsx">&lt;</span><span class="fn">Greeting</span> name=<span class="str">"Роман"</span> <span class="jsx">/&gt;</span></pre>
    <pre><span class="cmt">// JSX — це НЕ HTML. Це синтаксичний цукор над:</span>
React.<span class="fn">createElement</span>(
  <span class="str">'h1'</span>,
  <span class="kw">null</span>,
  <span class="str">'Привіт, '</span>, name, <span class="str">'!'</span>
);
<span class="cmt">// createElement повертає плейн-обʼєкт (React element),</span>
<span class="cmt">// не DOM-вузол. React будує з них дерево і сам малює DOM.</span></pre>
  </div>
  <h3 class="topic">JSX — правила <span class="tag tag-pit">PITFALL</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Правило</th><th>Приклад</th></tr>
      <tr><td>Один кореневий елемент</td><td><code>&lt;&gt;...&lt;/&gt;</code> (Fragment) якщо треба обгорнути кілька без зайвого <code>div</code></td></tr>
      <tr><td><code>{'{ }'}</code> — вихід у JS-вираз</td><td><code>{'{'}user.name{'}'}</code>, <code>{'{'}items.map(...){'}'}</code> — тільки <em>вирази</em>, не <code>if</code>/<code>for</code> (statements)</td></tr>
      <tr><td>Атрибути — camelCase</td><td><code>className</code> замість <code>class</code>, <code>onClick</code> замість <code>onclick</code></td></tr>
      <tr><td>Кожен тег закритий</td><td><code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code> — самозакривні теги обов'язково з <code>/</code></td></tr>
      <tr><td>Стилі — обʼєкт</td><td><code>style={{'{{'} color: 'red' {'}}'}}</code> — подвійні дужки: зовнішні JSX, внутрішні — обʼєкт</td></tr>
    </table>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Умова "if" не працює в JSX напряму</strong> — <code>if</code> це statement, а всередині <code>{'{ }'}</code> можна лише вираз. Тому умовний рендеринг робиться через тернарник/<code>&amp;&amp;</code>/винесену змінну (детально — наступний розділ).</span></div>
  <h3 class="topic">Навіщо взагалі JSX <span class="tag tag-key">KEY</span></h3>
  <p>JSX створили, бо розмітка й логіка, що її генерує, нерозривно пов'язані — React обрав тримати їх <strong>разом в одному файлі</strong> (на відміну від класичного "розділення шаблону і логіки"), а не змушувати писати <code>React.createElement</code> вручну. Компілятор (Babel/SWC) перетворює JSX на виклики функції ще до рантайму — сам React ніколи "не бачить" JSX, лише результат.</p>
  <h3 class="topic">Три дерева: Element tree → Fiber tree → DOM tree <span class="tag tag-key">KEY</span></h3>
  <p>Це часто плутають на співбесіді, кажучи "Virtual DOM" про все одразу — насправді це <strong>три різні дерева</strong> з різним часом життя й різним призначенням.</p>
  <div class="grid3">
    <div class="card"><h4>1. Element tree</h4><p>Результат <code>createElement</code> (з JSX). Легкий плейн-обʼєкт. <strong>Перестворюється щорендеру заново</strong> — "Virtual DOM" у побутовому сенсі.</p></div>
    <div class="card blue"><h4>2. Fiber tree</h4><p>Внутрішня структура React (Block 1). <strong>Персистентна</strong> — живе між рендерами, саме її React diff'ить і зберігає в ній стан хуків.</p></div>
    <div class="card green"><h4>3. DOM tree</h4><p>Реальні браузерні вузли. Оновлюється мінімально, точково — лише те, що показав diff Fiber-дерева.</p></div>
  </div>
  <h3 class="topic">1. Element tree — детально</h3>
  <p>Плейн-обʼєкт <code>{'{'} type, props, key, ref {'}'}</code> (точна форма — розділ "Virtual DOM" нижче, там же й приклад для конкретного JSX). Не має жодного методу, підписки чи посилання на попередній рендер — щойно React його прочитав і звірив з Fiber-деревом, він більше не потрібен і збирається garbage collector'ом.</p>
  <h3 class="topic">2. Fiber tree — детально</h3>
  <p>Персистентна структура з власними полями (<code>type</code>, <code>key</code>, <code>child</code>/<code>sibling</code>/<code>return</code>, <code>alternate</code>, <code>memoizedState</code>) — повна таблиця з поясненням кожного поля вже розібрана в розділі "Reconciliation, Virtual DOM, Fiber" нижче, тут лише важливо запамʼятати її роль у трійці: це <strong>єдине</strong> дерево з трьох, що памʼятає щось між рендерами.</p>
  <h3 class="topic">3. DOM tree — детально, і звідки береться React DOM</h3>
  <p>Останній крок — застосування diff'у до реальних <code>Node</code>-обʼєктів браузера (<code>appendChild</code>, <code>setAttribute</code>, <code>removeChild</code>). Цікавий сеньйорський нюанс: сам механізм diffing (пакет <code>react-reconciler</code>) — <strong>не знає нічого про DOM</strong>. Він рендерить у Fiber-дерево і викликає абстрактний "host config" — набір функцій "як створити вузол", "як його оновити", "як видалити". <code>react-dom</code> — лише одна реалізація цього host config (для браузера). Той самий reconciler з іншим host config дає <code>react-native</code> (host = нативні iOS/Android-вʼюхи) чи <code>react-three-fiber</code> (host = обʼєкти WebGL-сцени). DOM tree — не "фінальна мета" React у принципі, а лише той конкретний host, що використовує <code>react-dom</code>.</p>
  <div class="alert good"><span class="icon">✅</span><span>Element tree відкидається й будується заново на кожен рендер (дешево — плейн-обʼєкти). Fiber tree — довгоживуча структура, яку React звіряє зі свіжим element tree, щоб порахувати мінімальний патч для конкретного host (DOM tree — лише один з можливих). Детально про Fiber — розділ "Reconciliation, Virtual DOM, Fiber" нижче.</span></div>
  <h3 class="topic">Fragment — варіанти <span class="tag tag-key">KEY</span></h3>
  <p>Компонент повинен повернути один кореневий вузол. Fragment дозволяє згрупувати кілька елементів <strong>без зайвого DOM-вузла</strong> (жодного <code>&lt;div&gt;</code> у результаті).</p>
  <div class="grid2">
    <pre><span class="cmt">// Коротка форма — найчастіша</span>
<span class="kw">return</span> (
  <span class="jsx">&lt;&gt;</span>
    <span class="jsx">&lt;dt&gt;</span>{term}<span class="jsx">&lt;/dt&gt;</span>
    <span class="jsx">&lt;dd&gt;</span>{description}<span class="jsx">&lt;/dd&gt;</span>
  <span class="jsx">&lt;/&gt;</span>
);
<span class="cmt">// ⚠️ коротка форма НЕ приймає key — потрібна повна</span></pre>
    <pre><span class="cmt">// Повна форма — коли потрібен key (у .map())</span>
{items.<span class="fn">map</span>(item =&gt; (
  <span class="jsx">&lt;React.Fragment</span> key={item.id}<span class="jsx">&gt;</span>
    <span class="jsx">&lt;dt&gt;</span>{item.term}<span class="jsx">&lt;/dt&gt;</span>
    <span class="jsx">&lt;dd&gt;</span>{item.description}<span class="jsx">&lt;/dd&gt;</span>
  <span class="jsx">&lt;/React.Fragment&gt;</span>
))}</pre>
  </div>
  `,
        },
      ],
    },
    {
      id: 'fundamentals-component-anatomy',
      title: '🧩 Анатомія компонента: шаблон, стилі, зображення',
      interviewQuestions: [
        {
          question: 'Як організувати файлову структуру React-компонента (шаблон, стилі, зображення), щоб вона масштабувалась у великому проєкті?',
          answer: 'Типовий підхід — колокація: <code>ComponentName/index.tsx</code> + <code>ComponentName.module.css</code> (або styled-файл) + асети поруч, а не в глобальних <code>/styles</code> чи <code>/assets</code>. Це знижує когнітивне навантаження (все, що стосується компонента, в одній папці) і спрощує видалення фічі — просто видаляєш папку без пошуку «осиротілих» файлів по всьому проєкту.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Мінімальний компонент end-to-end <span class="tag tag-key">KEY</span></h3>
  <p>Реальний файл компонента зазвичай містить: імпорти (React — не обов'язково з новим JSX transform, типи, стилі, картинки), саму функцію-компонент, і <code>export</code>. Конвенція іменування файлу — збігається з іменем компонента (<code>UserCard.tsx</code> → <code>UserCard</code>).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// UserCard.tsx
import type { FC } from 'react';
import styles from './UserCard.module.css';   // CSS Modules — класи скоуплені локально
import avatarFallback from './avatar-fallback.png'; // бандлер повертає URL, не бінарник

interface UserCardProps {
  name: string;
  avatarUrl?: string;
}

export const UserCard: FC<UserCardProps> = ({ name, avatarUrl }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={avatarUrl ?? avatarFallback}
        alt={\`Аватар \${name}\`}
      />
      <span className={styles.name}>{name}</span>
    </div>
  );
};`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що тут важливо <span class="tag tag-pit">PITFALL</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Що</th><th>Чому саме так</th></tr>
      <tr><td>Компонент повертає <strong>один</strong> JSX-вираз</td><td>Функція — рано чи пізно <code>return</code>, JSX-вираз — плейн-обʼєкт (Block вище)</td></tr>
      <tr><td>Імпорт картинки <code>import img from './x.png'</code></td><td>Бандлер (Vite/Webpack) підміняє імпорт на URL до файлу в білді (з хешем для кешування) — не можна просто вказати рядковий шлях без імпорту, якщо файл не в <code>public/</code></td></tr>
      <tr><td><code>CSS Modules</code> (<code>*.module.css</code>)</td><td>Класи локально скоуплені — <code>styles.card</code> компілюється в унікальний хеш-клас, немає конфліктів імен між компонентами</td></tr>
      <tr><td><code>alt</code> на <code>&lt;img&gt;</code></td><td>Доступність — не стилістична забаганка, а вимога a11y-лінтерів</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Файли, що лежать у <code>public/</code> (Vite) — копіюються as-is, доступні по кореневому шляху (<code>/logo.png</code>) БЕЗ імпорту. Файли поруч з компонентом — завжди через <code>import</code>, щоб бандлер їх обробив (оптимізація, хешування, tree-shaking невикористаних).</span></div>
  <h3 class="topic">Робота з картинками — повні правила <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Спосіб</th><th>Синтаксис</th><th>Що отримуєш</th></tr>
      <tr><td>Статичний import</td><td><code>import img from './x.png'</code></td><td>Рядок-URL (з хешем у продакшн-білді)</td></tr>
      <tr><td><code>public/</code></td><td><code>&lt;img src="/logo.png"&gt;</code></td><td>URL напряму, без обробки бандлером — файл переживає білд "як є"</td></tr>
      <tr><td>SVG як URL</td><td><code>import icon from './icon.svg'</code></td><td>Рядок-URL — та сама поведінка, що й PNG/JPG</td></tr>
      <tr><td>SVG як компонент (SVGR)</td><td><code>import { ReactComponent as Icon } from './icon.svg'</code></td><td>Готовий JSX-компонент — можна стилізувати <code>fill</code>/<code>stroke</code> через CSS/props, а не лише через <code>&lt;img&gt;</code></td></tr>
    </table>
  </div>
  <div class="grid2">
    <div class="card blue"><h4>Інлайнінг маленьких зображень</h4><p>Бандлер (Vite/Webpack) автоматично конвертує <strong>дрібні</strong> файли (типово &lt;4KB) у base64 data-URI прямо всередині JS/CSS — жодного окремого мережевого запиту. Більші файли лишаються окремими файлами з власним URL і кешем.</p></div>
    <div class="card red"><h4>⚠️ Динамічний шлях — пастка <span class="tag tag-pit">PITFALL</span></h4><pre style="font-size:10.5px"><span class="cmt">// ❌ НЕ працює — бандлер аналізує imports</span>
<span class="cmt">// статично, рядок з name невідомий на build-time</span>
<span class="kw">import</span> img <span class="kw">from</span> <span class="str">\`./images/\${name}.png\`</span>;

<span class="cmt">// ✅ new URL — бандлер розуміє цей патерн</span>
<span class="kw">const</span> src = <span class="kw">new</span> <span class="fn">URL</span>(
  <span class="str">\`./images/\${name}.png\`</span>, import.meta.url
).href;</pre></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>У Next.js для оптимізації зображень (lazy-loading, responsive <code>srcset</code>, автоформат WebP/AVIF) є спеціальний <code>&lt;Image&gt;</code> з <code>next/image</code> — вже згадувався в розділі "Performance Deep Dive" (Core Web Vitals, LCP) — це заміна звичайного <code>&lt;img&gt;</code>, а не альтернатива описаним вище способам імпорту.</span></div>`,
        },
      ],
    },
    {
      id: 'styling-approaches',
      title: '🎨 Styled Components та Tailwind',
      interviewQuestions: [
        {
          question: 'Якіträde-off\'и між CSS-in-JS (Styled Components) та Tailwind у продакшн React-застосунку?',
          answer: 'Styled Components дає повну ізоляцію стилів і динамічні значення на основі props, але додає рантайм-вартість (генерація класів під час рендеру, більший bundle, повільніший SSR без спеціальних налаштувань). Tailwind — це статичний CSS без рантайму: клас відомий на етапі збірки, PurgeCSS/JIT прибирає невикористане, тому продуктивність вища, але HTML стає «зашумленим» довгими рядками класів.',
        },
        {
          question: 'Чому багато команд у 2024-2026 переходять від CSS-in-JS до zero-runtime рішень (Tailwind, vanilla-extract, CSS Modules)?',
          answer: 'Основна причина — рантайм-вартість CSS-in-JS стає помітною на великих сторінках із багатьма динамічними стилями (кожен рендер може перегенеровувати класи/style-теги), а також гірша сумісність із React Server Components, де компонент не завжди виконується у браузері й не може покладатись на рантайм-бібліотеку для генерації стилів на льоту.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">styled-components — CSS-in-JS <span class="tag tag-key">KEY</span></h3>
  <p>Стилі описуються прямо в JS через tagged template literals — компонент і його стилі живуть в одному файлі, стилі можуть залежати від <code>props</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import styled from 'styled-components';

const Button = styled.button<{ variant?: 'primary' | 'danger' }>\`
  padding: 8px 16px;
  border-radius: 6px;
  background: \${p => (p.variant === 'danger' ? '#ef4444' : '#6366f1')};
  color: white;

  &:hover { opacity: 0.9; }
\`;

// <Button variant="danger" onClick={onDelete}>Delete</Button>
// Клас генерується на льоту, унікальний — конфліктів імен немає,
// але це runtime-вартість: парсинг шаблонів + вставка <style> у DOM при mount`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Tailwind CSS — утилітарний підхід</h3>
  <p>Замість написання CSS-правил — готові utility-класи прямо в <code>className</code>. Немає runtime-вартості (звичайний CSS-файл, згенерований на build-time) і немає проблеми іменування класів.</p>
  <h3 class="topic">Підключення до React + Vite — покроково</h3>`,
        },
        {
          kind: 'code',
          language: 'bash',
          code: `npm install tailwindcss @tailwindcss/vite`,
        },
        {
          kind: 'code',
          language: 'ts',
          code: `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
        },
        {
          kind: 'code',
          language: 'css',
          code: `/* src/index.css — один рядок замість окремого tailwind.config.js для базового кейсу */
@import "tailwindcss";`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Готово — utility-класи одразу доступні
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:opacity-90">
      {children}
    </button>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Коли що обрати</h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>styled-components</th><th>Tailwind</th></tr>
      <tr><td>Runtime вартість</td><td>Так — генерація стилів у браузері</td><td>Ні — звичайний CSS, згенерований на білді</td></tr>
      <tr><td>Стилі, залежні від props</td><td>Природно (<code>\${p => ...}</code>)</td><td>Через умовну конкатенацію класів (<code>clsx</code>/<code>cn</code>)</td></tr>
      <tr><td>Крива навчання</td><td>Звичайний CSS-синтаксис</td><td>Треба вивчити назви утиліт</td></tr>
      <tr><td>Розмір бандла</td><td>Бібліотека + рантайм</td><td>Лише використані класи (purge на білді)</td></tr>
    </table>
  </div>`,
        },
      ],
    },
    {
      id: 'animation-techniques',
      title: '🎞️ Техніки анімації в React',
      interviewQuestions: [
        {
          question: 'Чому анімація властивостей <code>transform</code>/<code>opacity</code> вважається "дешевою" для браузера, а анімація <code>width</code>/<code>top</code>/<code>margin</code> — "дорогою"?',
          answer: 'Зміна <code>width</code>, <code>top</code>, <code>margin</code> запускає <strong>layout (reflow)</strong> — браузер має перерахувати геометрію всього піддерева й часто сторінки, потім перемалювати (<strong>paint</strong>), потім скомпонувати шари (<strong>composite</strong>) — три важкі стадії на кожен кадр. <code>transform</code> і <code>opacity</code> можна обробити лише на стадії <strong>composite</strong>, часто на GPU, без layout/paint — тому саме ці дві властивості рекомендують для 60fps-анімацій (напр. замість <code>left</code> для руху — <code>transform: translateX()</code>).',
        },
        {
          question: 'У чому різниця в підходах між CSS-анімацією/transition і бібліотекою на кшталт Framer Motion, і коли CSS вже недостатньо?',
          answer: 'CSS <code>transition</code>/<code>@keyframes</code> — декларативні й дешеві, ідеальні для простих переходів стану (hover, fade, показати/сховати), не потребують JS-рантайму. Але CSS не вміє: анімувати між анмаунтом/маунтом компонента (елемент зникає з DOM миттєво, transition не встигає відпрацювати), координувати анімацію кількох елементів (layout-анімації, spring-фізика, drag), чи реагувати на React-стан складнішим способом (перерваний/реверсований перехід). Framer Motion додає JS-рантайм саме для цих сценаріїв: <code>AnimatePresence</code> тримає елемент у DOM до завершення exit-анімації, <code>layout</code> проп анімує зміну позиції/розміру автоматично.',
        },
        {
          question: 'Що таке FLIP-техніка анімації, і яку проблему вона вирішує там, де звичайний CSS transition безсилий?',
          answer: 'FLIP (First, Last, Invert, Play) вирішує анімацію зміни <em>позиції/розміру через layout-зміну</em> (напр. картка переміщується в іншу колонку списку) — властивості на кшталт "позиція в грід-лейауті" взагалі не анімуються через CSS transition. Техніка: зняти позицію <strong>до</strong> зміни (First) і <strong>після</strong> (Last), інвертувати різницю через <code>transform</code> так, щоб елемент візуально лишився на старому місці (Invert), а тоді прибрати transform, дозволивши браузеру доанімувати перехід уже дешевим <code>transform</code> (Play) — саме на цій ідеї побудований <code>layout</code>-проп Framer Motion.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">CSS transition / @keyframes — базовий рівень <span class="tag tag-key">KEY</span></h3>
  <p>Найдешевший спосіб анімувати: декларативно, без JS-рантайму, браузер сам інтерполює кадри. <code>transition</code> — для переходу між двома станами (напр. hover); <code>@keyframes</code> + <code>animation</code> — для послідовності кроків або нескінченних циклів (спінер, пульсація).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Тільки transform/opacity — щоб анімація йшла на compositor-шарі, повз layout/paint
function FadeInButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 150ms ease-out',
      }}
    >
      Hover me
    </button>
  );
}

/* @keyframes у CSS-файлі/CSS Modules — для нескінченних/багатокрокових анімацій */
/* .spinner { animation: spin 1s linear infinite; }
   @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } */`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Framer Motion — коли CSS не вистачає</h3>
  <p>Декларативний API поверх Web Animations: <code>&lt;motion.div&gt;</code> замість звичайного тега, анімовані пропи <code>initial</code>/<code>animate</code>/<code>exit</code>. Головна перевага над голим CSS — <strong>анімація виходу</strong> (компонент встигає доанімуватись перед тим, як React його реально видалить з DOM) і <strong>layout-анімації</strong> (зміна позиції/розміру між рендерами анімується автоматично).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { motion, AnimatePresence } from 'framer-motion';

function Toast({ message, onClose }: { message: string; onClose(): void }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}       // AnimatePresence чекає завершення exit
          transition={{ duration: 0.2 }}       // перш ніж React реально видалить елемент
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// layout-анімація "з коробки" — переміщення картки між колонками
// <motion.div layout>{card}</motion.div> — Framer сам порахує FLIP-трансформацію`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Коли що обрати</h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>CSS transition/keyframes</th><th>Framer Motion</th></tr>
      <tr><td>Простий hover/fade/показати-сховати</td><td>✅ Достатньо, 0 залежностей</td><td>Надлишково</td></tr>
      <tr><td>Анімація виходу (exit) при анмаунті</td><td>❌ Не працює — DOM-вузол зникає миттєво</td><td>✅ <code>AnimatePresence</code></td></tr>
      <tr><td>Layout-анімація (зміна позиції/розміру)</td><td>❌ Потребує ручного FLIP</td><td>✅ <code>layout</code> проп</td></tr>
      <tr><td>Drag / spring-фізика / жести</td><td>❌</td><td>✅ вбудовано</td></tr>
      <tr><td>Розмір бандла</td><td>0 KB</td><td>+30-40 KB (gzip)</td></tr>
    </table>
  </div>`,
        },
      ],
    },
    {
      id: 'fundamentals-props-state',
      title: '📦 Props, State та події',
      interviewQuestions: [
        {
          question: 'У чому фундаментальна різниця між props і state, і чому змішування цих понять — типова помилка джуна?',
          answer: '<code>props</code> — це вхідні дані, які компонент отримує ззовні і <strong>не може змінювати сам</strong> (однонаправлений потік даних); <code>state</code> — внутрішні дані, якими компонент керує сам через <code>useState</code>/<code>useReducer</code>, і зміна яких викликає ре-рендер. Типова помилка — копіювати prop у local state (<code>useState(props.value)</code>) «про всяк випадок», що розриває синхронізацію з батьківським компонентом при подальших оновленнях prop.',
        },
        {
          question: 'Чому <code>onClick={handleClick()}</code> — це баг, а <code>onClick={handleClick}</code> — правильний варіант?',
          answer: '<code>onClick={handleClick()}</code> викликає функцію одразу під час рендеру і передає обробнику <em>результат</em> виклику (часто <code>undefined</code>), а не саму функцію — тобто клік ніколи не спрацює так, як очікувалось, а <code>handleClick</code> виконається на кожному рендері. Правильно передавати посилання на функцію: <code>onClick={handleClick}</code>, або стрілкову функцію <code>onClick={() => handleClick(arg)}</code>, якщо потрібні аргументи.',
        },
        {
          question: `Чому <code>console.log(count)</code> одразу після <code>setCount</code> показує старе значення?`,
          answer: `setState асинхронний відносно поточної функції — планує рендер, не мутує змінну зараз.`,
        },
        {
          question: `Чим props відрізняються від state?`,
          answer: `props — ззовні, read-only, дитина не міняє; state — внутрішній, змінюваний через свій setter.`,
        },
        {
          question: `Навіщо потрібен <code>children</code>?`,
          answer: `композиція — компонент-обгортка не знає вміст, просто рендерить те, що передали.`,
        },
        {
          question: 'Що таке PropTypes, і чому в TypeScript-проєкті вони практично не потрібні?',
          answer: 'PropTypes — рантайм-перевірка типів props у чистому JavaScript (до TS/замість нього): у dev-режимі React виводить попередження в консоль, якщо переданий проп не відповідає оголошеній формі. Головна відмінність від TypeScript — PropTypes перевіряє <strong>під час виконання</strong> (ловить помилку лише коли компонент реально відрендерився з неправильним пропом), тоді як TS перевіряє <strong>під час компіляції</strong>, до запуску коду, і додатково дає автодоповнення в IDE. У TS-проєкті типи props оголошуються інтерфейсом, і PropTypes стає зайвим подвійним джерелом правди.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Props — однонаправлений потік даних <span class="tag tag-key">KEY</span></h3>
  <p>Дані рухаються <strong>тільки згори вниз</strong>: батько передає props дитині, дитина не може напряму змінити props батька (вони <em>read-only</em>). Щоб дитина "повідомила" щось наверх — батько передає їй callback-функцію як проп.</p>
  <div class="grid2">
    <pre><span class="kw">function</span> <span class="fn">Parent</span>() {
  <span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);
  <span class="kw">return</span> <span class="jsx">&lt;</span><span class="fn">Counter</span> value={count}
    onIncrement={() =&gt; <span class="fn">setCount</span>(c =&gt; c + <span class="num">1</span>)} <span class="jsx">/&gt;</span>;
}</pre>
    <pre><span class="kw">function</span> <span class="fn">Counter</span>({ value, onIncrement }: Props) {
  <span class="cmt">// value — тільки читання, onIncrement — "канал наверх"</span>
  <span class="kw">return</span> <span class="jsx">&lt;button</span> onClick={onIncrement}<span class="jsx">&gt;</span>{value}<span class="jsx">&lt;/button&gt;</span>;
}</pre>
  </div>
  <h3 class="topic"><code>children</code> — особливий проп</h3>
  <pre><span class="kw">function</span> <span class="fn">Card</span>({ children }: { children: React.ReactNode }) {
  <span class="kw">return</span> <span class="jsx">&lt;div</span> className=<span class="str">"card"</span><span class="jsx">&gt;</span>{children}<span class="jsx">&lt;/div&gt;</span>;
}
<span class="cmt">// &lt;Card&gt;&lt;p&gt;будь-який JSX&lt;/p&gt;&lt;/Card&gt; — children = &lt;p&gt;...&lt;/p&gt;</span>
<span class="cmt">// Це основа композиції (Block 5) — компонент не знає, ЩО всередині,</span>
<span class="cmt">// лише "де" — так пишуться Layout/Modal/Card без жорсткої залежності від вмісту.</span></pre>
  <h3 class="topic">useState — локальний стан <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <pre><span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);
<span class="cmt">// count — поточне значення (read-only знімок)</span>
<span class="cmt">// setCount — єдиний спосіб його змінити</span>
<span class="fn">setCount</span>(count + <span class="num">1</span>);      <span class="cmt">// "постав нове значення"</span>
<span class="fn">setCount</span>(c =&gt; c + <span class="num">1</span>);  <span class="cmt">// функціональна форма — безпечна</span>
                              <span class="cmt">// при кількох апдейтах підряд</span></pre>
    <pre><span class="cmt">// Виклик setState планує РЕ-РЕНДЕР, не мутує змінну одразу.</span>
<span class="kw">function</span> <span class="fn">onClick</span>() {
  <span class="fn">setCount</span>(count + <span class="num">1</span>);
  console.<span class="fn">log</span>(count); <span class="cmt">// ❗ старе значення — рендер ще не стався</span>
}
<span class="cmt">// Це не "баг" — це модель: render функція завжди бачить</span>
<span class="cmt">// стан ЦЬОГО рендеру (детальніше — closures, Block 1/2)</span></pre>
  </div>
  <h3 class="topic">Stateful vs Stateless <span class="tag tag-key">KEY</span></h3>
  <p>Компонент <strong>stateful</strong> — має власний <code>useState</code>/<code>useReducer</code> усередині, "пам'ятає" щось між рендерами. Компонент <strong>stateless</strong> — чиста функція від <code>props</code>: однакові пропи завжди дають однаковий вивід, немає внутрішньої памʼяті. До хуків (до 2019) такий компонент називали <strong>"stateless functional component" (SFC)</strong> — термін лишився в старих статтях; сьогодні "функціональний компонент" вже не означає автоматично "без стану".</p>
  <div class="grid2">
    <div class="card blue"><h4>Stateless</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">Avatar</span>({ url, alt }: Props) {
  <span class="cmt">// нічого не памʼятає між рендерами —</span>
  <span class="cmt">// весь вивід залежить тільки від props</span>
  <span class="kw">return</span> <span class="jsx">&lt;img</span> src={url} alt={alt} <span class="jsx">/&gt;</span>;
}</pre></div>
    <div class="card green"><h4>Stateful</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">Avatar</span>({ url, alt }: Props) {
  <span class="kw">const</span> [loaded, setLoaded] = <span class="fn">useState</span>(<span class="kw">false</span>);
  <span class="cmt">// власна памʼять — чи вже завантажилось зображення</span>
  <span class="kw">return</span> <span class="jsx">&lt;img</span> src={url} alt={alt}
    onLoad={() =&gt; <span class="fn">setLoaded</span>(<span class="kw">true</span>)} <span class="jsx">/&gt;</span>;
}</pre></div>
  </div>
  <h3 class="topic">Контрольований input</h3>
  <pre><span class="kw">const</span> [text, setText] = <span class="fn">useState</span>(<span class="str">''</span>);
<span class="jsx">&lt;input</span> value={text} onChange={e =&gt; <span class="fn">setText</span>(e.target.value)} <span class="jsx">/&gt;</span>
<span class="cmt">// value з React-стану = React "керує" тим, що показано в полі —</span>
<span class="cmt">// це і є "controlled". Без value — DOM сам тримає своє значення (uncontrolled).</span></pre>
  <h3 class="topic">PropTypes — легасі перевірка типів <span class="tag tag-pit">LEGACY</span></h3>
  <p>До поширення TypeScript пакет <code>prop-types</code> був стандартним способом валідувати форму props <strong>у рантаймі</strong>: React у dev-режимі порівнював реальні props із заявленою "схемою" й друкував попередження в консоль при невідповідності (напр. <code>required</code>-проп не передали, або передали рядок замість числа). Сьогодні в TS-проєкті цю роль повністю виконує компілятор — PropTypes лишається лише в легасі JS-кодовій базі без TypeScript.</p>`,
        },
        {
          kind: 'code',
          language: 'jsx',
          caption: 'PropTypes — рантайм (JS без TS) vs TS-інтерфейс — компайл-тайм',
          code: `// PropTypes (JavaScript, без TypeScript)
import PropTypes from 'prop-types';

function UserCard({ name, age, onSelect }) {
  return <div onClick={onSelect}>{name} ({age})</div>;
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,          // не required — може бути undefined
  onSelect: PropTypes.func,
};
// Невідповідність ловиться лише коли компонент РЕАЛЬНО відрендериться
// з неправильним пропом — попередження в консолі, не помилка збірки

// TypeScript — той самий контракт, але compile-time
interface UserCardProps {
  name: string;
  age?: number;
  onSelect?: () => void;
}
function UserCard({ name, age, onSelect }: UserCardProps) { /* ... */ }
// Помилка типу підсвічується в IDE ДО запуску, ще й з автодоповненням`,
        },
      ],
    },
    {
      id: 'jsx-synthetic-events',
      title: '⚡ SyntheticEvent та делегування подій',
      interviewQuestions: [
        {
          question: 'Що таке SyntheticEvent у React, і навіщо React обгортає нативні DOM-події замість того, щоб передавати їх напряму?',
          answer: '<code>SyntheticEvent</code> — легка крос-браузерна обгортка над нативною DOM-подією з <strong>однаковим API в усіх браузерах</strong> (навіть там, де нативні події історично відрізнялись). React обгортає події з двох причин: узгодженість API незалежно від браузера, і продуктивність — усі обробники подій реєструються не на кожному DOM-вузлі окремо, а через <strong>один</strong> слухач на корені дерева (делегування), який React сам маршрутизує до потрібного обробника через синтетичну систему подій.',
        },
        {
          question: 'Як влаштоване делегування подій у React (на які вузли реально вішаються нативні <code>addEventListener</code>), і чим це відрізняється від наївного підходу "обробник на кожен елемент"?',
          answer: 'React (з версії 17+) реєструє <strong>один</strong> нативний слухач на кореневому DOM-контейнері застосунку (раніше — на <code>document</code>) для кожного типу події, а не окремий слухач на кожному елементі з <code>onClick</code>. Коли подія спливає до кореня, React визначає, який віртуальний "обробник" мав спрацювати, за допомогою внутрішньої мапи фібер-дерева, і викликає відповідний колбек. Це різко дешевше при великій кількості інтерактивних елементів (список із 1000 кнопок = 1 нативний слухач, а не 1000) і дозволяє коректно працювати з динамічно доданими/видаленими елементами без ручного пере-підписування.',
        },
        {
          question: 'Чому <code>event.stopPropagation()</code> усередині React-обробника не завжди зупиняє спливання нативної DOM-події так, як очікує розробник, що змішує React-обробники з ручним <code>addEventListener</code>?',
          answer: 'React обробляє свою внутрішню (синтетичну) систему спливання окремо від нативного DOM-дерева. <code>stopPropagation()</code> на <code>SyntheticEvent</code> зупиняє спливання <strong>всередині React-делегування</strong> (інші React-обробники вище по дереву не викличуться), але подія вже могла встигнути дійти до кореневого нативного слухача чи до сторонніх обробників, підписаних напряму через <code>addEventListener</code> поза React — тому в проєктах, де React-код співіснує з нативним/сторонніми бібліотеками на тому ж DOM-дереві, це джерело неочевидних багів.',
        },
        {
          question: 'У чому різниця між <code>preventDefault()</code> і <code>stopPropagation()</code>, і що (не) робить <code>return false</code> з React-обробника?',
          answer: '<code>preventDefault()</code> скасовує дефолтну дію браузера для події (перезавантаження при submit, перехід по посиланню, галочка чекбокса), але не чіпає спливання. <code>stopPropagation()</code> навпаки — зупиняє спливання до батьківських обробників, але дефолтну дію браузера не скасовує. Це ортогональні речі: потрібні обидва ефекти — викликай обидва методи. <code>return false</code> у React (на відміну від inline-хендлерів чи jQuery) не робить нічого з цього — це просто повернене значення, яке React ігнорує.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">SyntheticEvent — крос-браузерна обгортка <span class="tag tag-key">KEY</span></h3>
  <p>Кожен обробник у JSX (<code>onClick</code>, <code>onChange</code>, ...) отримує не нативну <code>Event</code>, а <code>SyntheticEvent</code> — обгортку з тим самим API (<code>target</code>, <code>preventDefault()</code>, <code>stopPropagation()</code>), але однаковою поведінкою в усіх браузерах. Доступ до нативної події — через <code>event.nativeEvent</code>, якщо справді потрібно.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function SearchInput() {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);      // SyntheticEvent API — однаково в кожному браузері
    console.log(e.nativeEvent);       // справжня DOM-подія, якщо потрібна
  }
  return <input onChange={handleChange} />;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Делегування подій — один слухач замість тисячі</h3>
  <p>React не вішає окремий нативний <code>addEventListener</code> на кожен елемент з <code>onClick</code>. Замість цього — <strong>один</strong> слухач на кореневому контейнері застосунку на кожен тип події; коли подія спливає туди, React сам визначає (через фібер-дерево), який компонент мав її обробити, і викликає відповідний колбек.</p>
  <div class="grid2">
    <div class="card red"><h4>❌ Наївний підхід</h4><p>1000 елементів з <code>onclick</code> у ванільному JS = 1000 нативних слухачів у пам'яті, кожен окремо треба знімати при видаленні елемента.</p></div>
    <div class="card green"><h4>✅ React-делегування</h4><p>1000 елементів з <code>onClick</code> = 1 нативний слухач на корені; React сам маршрутизує подію до правильного колбека, елементи можна вільно додавати/видаляти без ручного (де)реєстрування слухачів.</p></div>
  </div>
  <h3 class="topic">stopPropagation — пастка на межі React/DOM <span class="tag tag-pit">PITFALL</span></h3>
  <p><code>e.stopPropagation()</code> зупиняє спливання лише <strong>всередині React</strong>-делегування. Якщо на тому ж DOM-дереві є сторонній <code>addEventListener</code>, підключений напряму (не через React), він усе одно може отримати подію — React-делегування й нативне DOM-спливання це окремі механізми.</p>
  <h3 class="topic">preventDefault() vs stopPropagation() <span class="tag tag-key">KEY</span></h3>
  <p>Два незалежні методи події, які часто плутають — вони роблять зовсім різне і не замінюють одне одного.</p>
  <div class="grid2">
    <div class="card blue"><h4><code>preventDefault()</code></h4><p>Скасовує <strong>дефолтну дію браузера</strong> для цієї події: submit форми (перезавантаження сторінки), перехід по <code>&lt;a href&gt;</code>, встановлення галочки в чекбоксі, контекстне меню на <code>contextmenu</code>. <strong>Не</strong> впливає на спливання — батьківські обробники все одно спрацюють.</p></div>
    <div class="card green"><h4><code>stopPropagation()</code></h4><p>Зупиняє <strong>подальше спливання</strong> події по дереву — обробники на батьківських елементах не викличуться. <strong>Не</strong> скасовує дефолтну дію браузера: форма з <code>onSubmit</code>, у якому лише <code>stopPropagation()</code>, усе одно перезавантажить сторінку.</p></div>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span>Потрібні обидва ефекти одразу — виклич обидва методи. У React <code>return false</code> з обробника (на відміну від старого jQuery) <strong>не</strong> робить ні того, ні іншого.</span></div>`,
        },
      ],
    },
    {
      id: 'fundamentals-lists-conditionals',
      title: '🔁 Списки, умовний рендеринг, форми',
      interviewQuestions: [
        {
          question: 'Чому не можна використовувати індекс масиву як <code>key</code> у динамічних списках, і коли це все ж прийнятно?',
          answer: '<code>key</code> — це те, за чим React ідентифікує, який елемент відповідає якому DOM-вузлу між рендерами. Якщо список змінює порядок, додає/видаляє елементи посередині, а <code>key</code> — це індекс, React може «переплутати» елементи: стан (наприклад, значення <code>&lt;input&gt;</code>) залишиться прив\'язаним до позиції, а не до логічного елемента. Індекс прийнятний лише для статичних, незмінних списків без вставки/видалення/сортування.',
        },
        {
          question: 'Які проблеми може створити рендер великих списків без віртуалізації, і як їх діагностувати?',
          answer: 'Рендер тисяч DOM-вузлів одразу збільшує час первинного рендеру, споживання пам\'яті та вартість кожного наступного reconciliation-проходу (навіть якщо змінився один елемент, React усе одно проходить по всьому дереву при перевірці). Діагностика — React DevTools Profiler покаже аномально довгий commit; рішення — віртуалізація (<code>react-window</code>/<code>@tanstack/react-virtual</code>), що рендерить лише видимі елементи.',
        },
        {
          question: `Чому не можна <code>key={Math.random()}</code>?`,
          answer: `новий key щорендеру = React вважає елемент новим щоразу — знищує й пересоздає DOM-вузол, втрачає стан/фокус.`,
        },
        {
          question: `Що виведе <code>{'{'}0 &amp;&amp; &lt;Badge/&gt;{'}'}</code>?`,
          answer: `"0" в DOM — типова пастка з fallback-through значеннями в JSX.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Умовний рендеринг</h3>
  <div class="grid3">
    <div class="card"><h4>Тернарник</h4><pre style="font-size:10.5px">{isLoggedIn
  ? <span class="jsx">&lt;Dashboard /&gt;</span>
  : <span class="jsx">&lt;Login /&gt;</span>}</pre></div>
    <div class="card blue"><h4>&amp;&amp; — показати або нічого</h4><pre style="font-size:10.5px">{unreadCount &gt; <span class="num">0</span> &amp;&amp;
  <span class="jsx">&lt;Badge count={unreadCount} /&gt;</span>}</pre></div>
    <div class="card yellow"><h4>Рання early-return</h4><pre style="font-size:10.5px"><span class="kw">if</span> (loading) <span class="kw">return</span> <span class="jsx">&lt;Spinner /&gt;</span>;
<span class="kw">return</span> <span class="jsx">&lt;Content /&gt;</span>;</pre></div>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Пастка <code>&amp;&amp;</code> з числом:</strong> <code>{'{'}count &amp;&amp; &lt;Badge/&gt;{'}'}</code> — якщо <code>count === 0</code>, у DOM виведеться <strong>"0"</strong> (falsy, але не boolean), а не "нічого". Фікс: <code>count &gt; 0 &amp;&amp; ...</code> або <code>Boolean(count) &amp;&amp; ...</code>.</span></div>
  <h3 class="topic">Списки та <code>key</code> <span class="tag tag-key">KEY</span></h3>
  <pre><span class="jsx">&lt;ul&gt;</span>
  {users.<span class="fn">map</span>(user =&gt; (
    <span class="jsx">&lt;li</span> key={user.id}<span class="jsx">&gt;</span>{user.name}<span class="jsx">&lt;/li&gt;</span>
  ))}
<span class="jsx">&lt;/ul&gt;</span>
<span class="cmt">// key — стабільний ідентифікатор, за яким React зіставляє елементи</span>
<span class="cmt">// між рендерами. Без key (або key={index}) — баги при вставці/видаленні</span>
<span class="cmt">// посередині списку. Повне пояснення "чому саме" — Block 1 (Reconciliation).</span></pre>
  <h3 class="topic"><code>key</code> поза списками — скидання стану <span class="tag tag-key">KEY</span></h3>
  <p>Зміна <code>key</code> на компоненті каже React: це «інший» екземпляр — старий демонтується (з усім станом, ефектами, незакоммічені інпути), новий монтується з нуля. Це найчистіший спосіб «перезапустити» піддерево при зміні сутності — без <code>useEffect</code>, що вручну скидає кожне поле.</p>
  <pre><span class="cmt">// Профіль перемикається — форму треба скинути під нового користувача</span>
<span class="jsx">&lt;ProfileForm</span> key={userId} userId={userId} <span class="jsx">/&gt;</span>
<span class="cmt">// userId змінився → стара форма демонтована, нова — з чистим станом</span></pre>
  <h3 class="topic">Форма — базовий приклад</h3>
  <pre><span class="kw">function</span> <span class="fn">LoginForm</span>() {
  <span class="kw">const</span> [email, setEmail] = <span class="fn">useState</span>(<span class="str">''</span>);

  <span class="kw">function</span> <span class="fn">handleSubmit</span>(e: React.FormEvent) {
    e.<span class="fn">preventDefault</span>();    <span class="cmt">// без цього — full page reload</span>
    <span class="fn">login</span>(email);
  }

  <span class="kw">return</span> (
    <span class="jsx">&lt;form</span> onSubmit={handleSubmit}<span class="jsx">&gt;</span>
      <span class="jsx">&lt;input</span> value={email} onChange={e =&gt; <span class="fn">setEmail</span>(e.target.value)} <span class="jsx">/&gt;</span>
      <span class="jsx">&lt;button</span> type=<span class="str">"submit"</span><span class="jsx">&gt;</span>Увійти<span class="jsx">&lt;/button&gt;</span>
    <span class="jsx">&lt;/form&gt;</span>
  );
}</pre>
  `,
        },
      ],
    },
    /* ============================= BLOCK 1 — REACT INTERNALS ============================= */
    {
      id: 'internals-reconciliation',
      title: '🌳 Reconciliation, Virtual DOM, Fiber',
      interviewQuestions: [
        {
          question: 'Поясни своїми словами, що таке Fiber і навіщо React відмовився від старого stack-реконсилятора.',
          answer: 'Fiber — це переписаний у React 16 алгоритм узгодження, де кожен елемент дерева представлений вузлом (fiber) з посиланнями на батька/дитину/сусіда, що дозволяє <strong>перервати й відновити</strong> роботу узгодження по частинах, замість синхронного рекурсивного проходу «до кінця», який блокував головний потік. Це фундамент для concurrent-фіч: React може призупинити низькопріоритетний рендер заради термінового (наприклад, введення тексту).',
        },
        {
          question: 'Чим diffing-алгоритм React відрізняється від «класичного» алгоритму порівняння дерев, і чому це компроміс, а не ідеальне рішення?',
          answer: 'Класичний tree-diff має складність O(n³); React використовує евристичний O(n)-алгоритм із двома припущеннями: (1) елементи різного типу дають різні дерева (просто розбирає старе й будує нове), (2) <code>key</code> підказує стабільність елементів у списку. Це компроміс — швидко для типових UI-патернів, але може давати неоптимальні (хоч і коректні) результати, якщо структура дерева змінюється нетипово.',
        },
        {
          question: 'Чи можна сказати, що Virtual DOM завжди швидший за пряму роботу з реальним DOM? Обґрунтуй.',
          answer: 'Ні. Для поодиноких точкових мутацій пряма робота з DOM може бути швидшою — VDOM додає накладні витрати на створення об\'єктів і diffing. Перевага VDOM проявляється при <em>множинних, складно скоординованих</em> оновленнях: React батчить їх в один прохід і застосовує мінімальний набір реальних DOM-операцій, замість того щоб розробнику вручну відстежувати, що саме змінилось.',
        },
        {
          question: `Що таке Virtual DOM насправді?`,
          answer: `не технологія прискорення сама по собі — це JS-структура даних, що дозволяє порахувати мінімальний diff перед тим, як чіпати повільний реальний DOM.`,
        },
        {
          question: `Virtual DOM завжди швидший за прямі DOM-операції?`,
          answer: `ні, точковий vanilla-JS може обігнати React в мікробенчмарку; реальна вигода — батчинг і декларативність, не сира швидкість.`,
        },
        {
          question: `Чому diffing — O(n), а не точний O(n³) edit distance?`,
          answer: `React жертвує рідкісними edge-кейсами (переїзд піддерева між рівнями) заради швидкості, порівнюючи лише в межах одного рівня.`,
        },
        {
          question: `Чим небезпечний <code>key={index}</code>?`,
          answer: `конкретний приклад з інпутами/чекбоксами, що "перестрибують" значення при реордері.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Virtual DOM — зачем <span class="tag tag-key">KEY</span></h3>
  <p>Пряма робота з реальним DOM повільна (reflow/repaint). React будує легкий JS-опис дерева UI (<strong>Virtual DOM</strong> — дерево React-елементів з <code>createElement</code>), порівнює нову версію зі старою (<strong>diffing</strong>) і застосовує до справжнього DOM тільки мінімальний набір змін (<strong>reconciliation</strong>).</p>
  <h3 class="topic">Що це насправді за структура даних</h3>
  <p>Virtual DOM — не "тіньова копія DOM", а звичайнісінький плейн-обʼєкт JS. Ось що реально повертає <code>createElement</code>:</p>
  <div class="grid2">
    <pre><span class="jsx">&lt;div</span> className=<span class="str">"card"</span><span class="jsx">&gt;</span>
  <span class="jsx">&lt;span&gt;</span>Привіт<span class="jsx">&lt;/span&gt;</span>
<span class="jsx">&lt;/div&gt;</span></pre>
    <pre><span class="cmt">// createElement('div', {className:'card'}, ...) поверне:</span>
{
  type: <span class="str">'div'</span>,
  key: <span class="kw">null</span>,
  ref: <span class="kw">null</span>,
  props: {
    className: <span class="str">'card'</span>,
    children: { type: <span class="str">'span'</span>, props: { children: <span class="str">'Привіт'</span> } }
  }
}
<span class="cmt">// Просто дані. Жодного звʼязку з реальним DOM API.</span></pre>
  </div>
  <h3 class="topic">Diffing — евристика O(n), не оптимальний алгоритм <span class="tag tag-key">KEY</span></h3>
  <p>Математично точний "мінімальний edit distance" між двома деревами — задача <strong>O(n³)</strong>, непридатна для UI, що оновлюється щокадру. React свідомо йде на компроміс — евристичний алгоритм <strong>O(n)</strong> на двох припущеннях:</p>
  <div class="grid2">
    <div class="card"><h4>1. Порівняння лише на одному рівні</h4><p>React ніколи не шукає, чи "переїхало" піддерево в інше місце дерева (інший рівень вкладеності) — порівнює тільки елементи на тій самій позиції в тій самій батьківській ноді.</p></div>
    <div class="card blue"><h4>2. Різний тип → повний ремаунт</h4><p>Замість намагатись "адаптувати" <code>&lt;div&gt;</code> під <code>&lt;span&gt;</code> — простіше й швидше знести піддерево й побудувати заново (те саме правило, що нижче в таблиці diffing).</p></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Це <strong>не недолік</strong> — свідомий trade-off: рідкісні edge-кейси (напр. піддерево реально "переїхало" на інший рівень і втрачає стан там, де могло б зберегтись) обмінюються на швидкість, достатню для 60 fps на реальних UI. Саме тому й існують правила <code>key</code> і "різний тип = ремаунт" нижче — вони прямий наслідок цих двох припущень, а не довільні вимоги.</span></div>
  <h3 class="topic">Поширена помилка: "Virtual DOM = завжди швидше" <span class="tag tag-pit">PITFALL</span></h3>
  <p>Virtual DOM <strong>не</strong> швидший за прямі DOM-операції сам по собі — акуратно написаний vanilla-JS скрипт, що точково міняє 3 потрібні вузли, обжене React у мікробенчмарку: React все одно спершу будує element tree, диффить, і лише потім чіпає DOM — це додаткова робота, не її відсутність. Реальна вигода — у <strong>батчингу</strong>: замість "20 змін стану → 20 прямих DOM-мутацій", React збирає їх в одну діф-фазу → один мінімальний патч, плюс декларативний код без ручного відстеження "що вже змінено в DOM" програмістом.</p>
  <h3 class="topic">Правила diffing-алгоритму</h3>
  <div class="grid2">
    <div class="card"><h4>Різний тип елемента</h4><p>Було <code>&lt;div&gt;</code>, стало <code>&lt;span&gt;</code> (або компонент → інший компонент) — React <strong>знищує старе піддерево повністю</strong> й будує нове з нуля (стан втрачається, unmount → mount).</p></div>
    <div class="card blue"><h4>Однаковий тип</h4><p>Той самий тег/компонент — React <strong>перевикористовує</strong> DOM-вузол/instance, оновлює лише змінені атрибути/props. Стан зберігається.</p></div>
  </div>
  <h3 class="topic"><code>key</code> у списках — чому саме <span class="tag tag-pit">PITFALL</span></h3>
  <p>Без <code>key</code> React зіставляє елементи списку <strong>за позицією</strong>. Вставка/видалення елемента посередині зсуває всі наступні позиції — React думає, що змінився контент кожного елемента після точки вставки, а не що додався один новий. З <code>index</code> як key — та сама проблема (index теж "позиція").</p>
  <div class="grid2">
    <div class="card red"><h4>❌ key={index}: інпути "стрибають"</h4><pre style="font-size:10.5px">list = [A, B, C], keys = [0,1,2]
<span class="cmt">// видалили A (з інпутом-значенням "A-text")</span>
list = [B, C],   keys = [0,1]
<span class="cmt">// React: "елемент з key=0 змінив контент з A на B"</span>
<span class="cmt">// → перевикористовує DOM-вузол B, а не видаляє вузол A</span>
<span class="cmt">// значення інпуту "A-text" лишається — тепер під B!</span></pre></div>
    <div class="card green"><h4>✅ key={item.id}: коректно</h4><pre style="font-size:10.5px">keys = [idA, idB, idC]
<span class="cmt">// видалили A → keys = [idB, idC]</span>
<span class="cmt">// React бачить: вузла з key=idA більше немає → unmount саме його</span>
<span class="cmt">// вузли idB/idC — той самий key → перевикористані як є</span></pre></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span><code>key={index}</code> прийнятний, <strong>лише</strong> якщо список статичний (ніколи не сортується/фільтрується/не змінює порядок) і без стану в елементах.</span></div>
  `,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Fiber-архітектура <span class="tag tag-key">KEY</span></h3>
  <p>Fiber (з React 16) — переписаний reconciler. Кожному React-елементу відповідає <strong>Fiber-вузол</strong> — обʼєкт з інформацією про компонент, його props/state і, головне, <strong>звʼязками</strong> (child/sibling/return, як однозв'язний список замість рекурсивного стека викликів). Це дозволяє React <strong>переривати</strong> роботу з рендерингу, віддавати керування браузеру (щоб не блокувати анімації/інпут) і продовжувати пізніше — чого не міг старий рекурсивний "Stack reconciler".</p>
  <div class="grid2">
    <div class="card"><h4>До Fiber (React ≤15)</h4><p>Reconciliation — синхронний рекурсивний прохід всього дерева. Великий апдейт блокує main thread цілком, поки не завершиться.</p></div>
    <div class="card blue"><h4>З Fiber (React 16+)</h4><p>Робота розбита на одиниці (fiber units). React може зупинитись між ними, дати браузеру обробити подію/анімацію, і продовжити — основа для Concurrent features (<code>useTransition</code> та ін., Block 2).</p></div>
  </div>
  <h3 class="topic">Fiber Tree vs DOM Tree — що саме несе Fiber-вузол <span class="tag tag-key">KEY</span></h3>
  <p>DOM-вузол — "тупий" опис розмітки (тег, атрибути, діти). Fiber-вузол — набагато товстіший обʼєкт: окрім опису UI, він несе <strong>бухгалтерію самого React</strong> — з чого й видно, чому React не може просто "ходити по DOM" і мусить тримати власне дерево.</p>
  <div class="table-wrap">
    <table>
      <tr><th>Поле Fiber-вузла</th><th>Навіщо</th><th>Є в DOM-вузлі?</th></tr>
      <tr><td><code>type</code></td><td>Тег ('div') або посилання на функцію-компонент</td><td>Частково (tagName)</td></tr>
      <tr><td><code>key</code></td><td>Ідентичність елемента в списку між рендерами</td><td>❌ Немає</td></tr>
      <tr><td><code>child / sibling / return</code></td><td>Звʼязки дерева як однозв'язний список — дозволяють обхід без рекурсії, переривний</td><td>❌ DOM використовує інше внутрішнє представлення обходу</td></tr>
      <tr><td><code>alternate</code></td><td>Посилання на Fiber-вузол <strong>попереднього</strong> рендеру — звідси й diffing (порівняння "current" і "work-in-progress" дерев)</td><td>❌ Немає поняття "попередній стан"</td></tr>
      <tr><td><code>memoizedState</code></td><td>Зв'язний список станів усіх хуків цього компонента (по черзі виклику!)</td><td>❌ Немає</td></tr>
      <tr><td><code>pendingProps / memoizedProps</code></td><td>Нові пропи (ще не застосовані) vs застосовані на минулому рендері — основа diff</td><td>❌ Немає</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Саме <code>memoizedState</code> — причина, чому <strong>порядок виклику хуків має бути стабільним</strong> (Rules of Hooks): React зіставляє хуки з їхніми значеннями за позицією у зв'язному списку Fiber-вузла, а не за іменем змінної.</span></div>`,
        },
      ],
    },
    {
      id: 'internals-render-commit',
      title: '🎬 Render vs Commit фази',
      interviewQuestions: [
        {
          question: 'Чим фаза Render відрізняється від фази Commit, і чому це розділення важливе для розуміння побічних ефектів?',
          answer: 'Render-фаза — це виклик функцій компонентів і побудова нового Fiber-дерева; вона <strong>може бути перервана</strong> React\'ом (concurrent mode) і не повинна мати побічних ефектів (мутації, запити) — тому компонент може викликатись кілька разів за один логічний рендер. Commit-фаза — застосування змін до реального DOM і виклик <code>useLayoutEffect</code>/<code>useEffect</code>; вона синхронна й не переривається.',
        },
        {
          question: 'Чому <code>useEffect</code> вважається безпечним місцем для побічних ефектів, а безпосередньо тіло компонента — ні?',
          answer: 'Тіло компонента виконується під час Render-фази, яка може бути перервана, повторена або відкинута React\'ом (наприклад, при Suspense чи concurrent-переривання) — побічний ефект там міг би виконатись кілька разів або на «викинутому» результаті. <code>useEffect</code> гарантовано запускається лише після Commit, коли DOM вже оновлено, тобто рівно один раз на реально застосований рендер.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Дві фази роботи React <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card"><h4>1. Render (Reconciliation)</h4>
      <p>React викликає тіла компонентів, будує work-in-progress Fiber-дерево, рахує diff. <strong>Можна переривати</strong> (Concurrent Mode) і навіть <strong>відкидати</strong> без наслідків.</p>
      <p style="margin-top:8px"><strong>Має бути чистою функцією:</strong> без мутацій зовнішнього стану, без side-effects (fetch, підписки, ручні DOM-мутації) — саме тому вони заборонені прямо в тілі компонента.</p>
    </div>
    <div class="card blue"><h4>2. Commit</h4>
      <p>React застосовує пораховані зміни до реального DOM. <strong>Синхронна</strong>, не переривається. Тут виконуються: DOM-мутації, оновлення <code>refs</code>, <code>useLayoutEffect</code> (синхронно, до paint), а після paint — <code>useEffect</code> (асинхронно).</p>
    </div>
  </div>
  <h3 class="topic">Чому side-effects заборонені в render <span class="tag tag-pit">PITFALL</span></h3>
  <div class="grid2">
    <pre><span class="cmt">// ❌ side-effect прямо в render</span>
<span class="kw">function</span> <span class="fn">Profile</span>({ userId }) {
  <span class="fn">fetch</span>(<span class="str">'/api/user/'</span> + userId); <span class="cmt">// !!!</span>
  <span class="kw">return</span> <span class="jsx">&lt;div&gt;</span>...<span class="jsx">&lt;/div&gt;</span>;
}
<span class="cmt">// render може викликатись кілька разів на один</span>
<span class="cmt">// "логічний" рендер (StrictMode, Concurrent-переривання,</span>
<span class="cmt">// відкинутий і перерахований рендер) — fetch піде зайвий раз</span></pre>
    <pre><span class="cmt">// ✅ side-effect у commit-фазі, через useEffect</span>
<span class="kw">function</span> <span class="fn">Profile</span>({ userId }) {
  <span class="fn">useEffect</span>(() =&gt; {
    <span class="fn">fetch</span>(<span class="str">'/api/user/'</span> + userId);
  }, [userId]);   <span class="cmt">// гарантовано один раз на реальний commit</span>
  <span class="kw">return</span> <span class="jsx">&lt;div&gt;</span>...<span class="jsx">&lt;/div&gt;</span>;
}</pre>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span>Render-фазу React може почати, перервати (віддати пріоритет терміновішому оновленню) і почати заново — <strong>work-in-progress рендер, що не дійшов до commit, ніколи не показується користувачу</strong> і його наслідки (side-effects) не повинні бути видимими ззовні.</span></div>`,
        },
      ],
    },
    {
      id: 'internals-rerenders-batching',
      title: '⚡ Automatic Batching (React 18)',
      interviewQuestions: [
        {
          question: 'Що таке batching, і чим автоматичний batching у React 18 відрізняється від того, що було в React 17?',
          answer: 'Batching — об\'єднання кількох викликів <code>setState</code> в один ре-рендер замість окремого ре-рендеру на кожен виклик. У React 17 batching працював лише всередині React-обробників подій; у <code>setTimeout</code>, промісах чи нативних обробниках кожен <code>setState</code> викликав окремий рендер. React 18 з <code>createRoot</code> робить batching <strong>автоматичним усюди</strong>, незалежно від контексту виклику.',
        },
        {
          question: 'Як вимкнути batching для конкретного оновлення і навіщо це буває треба?',
          answer: '<code>flushSync(() =&gt; setX(...))</code> з <code>react-dom</code> змушує React синхронно відрендерити й закомітити результат одразу після виклику. Потрібно рідко — типово коли наступний рядок коду має прочитати вже оновлений DOM (виміряти позицію, сфокусувати щойно показаний елемент). У 99% випадків batching бажаний, тож <code>flushSync</code> — виняток, не інструмент за замовчуванням.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Automatic Batching <span class="tag tag-new">React 18</span></h3>
  <p>Batching — об'єднання кількох викликів <code>setState</code> в межах одного тику в <strong>один</strong> ре-рендер. React 17 батчив лише всередині своїх обробників подій; у <code>setTimeout</code>, промісах і нативних слухачах кожен <code>setState</code> давав окремий рендер. React 18 (<code>createRoot</code>) батчить <strong>скрізь</strong>, незалежно від контексту виклику.</p>
  <p style="font-size:12.5px;opacity:.75">Що саме тригерить ре-рендер (власний state, батько, Context, <code>useReducer</code>) і як поводиться <code>&lt;StrictMode&gt;</code> — розділ «🔄 Життєвий цикл і події компонента» нижче.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// React 17: батчинг тільки в React event handlers
// React 18: батчинг СКРІЗЬ (setTimeout, fetch/promise, native event listeners)
setTimeout(() => {
  setCount(c => c + 1);      // React 18: ОДИН ре-рендер на обидва апдейти
  setName('Roman');           // React 17: ДВА окремих ре-рендери
}, 0);

// Явно вимкнути батчинг (рідко потрібно) — flushSync()
import { flushSync } from 'react-dom';
flushSync(() => {
  setOpen(true);          // React синхронно рендерить + комітить тут
});
tooltipRef.current.scrollIntoView();  // ← DOM уже оновлений, можна міряти/скролити`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Bailout — коли ре-рендеру не буде взагалі</h3>
  <p>Якщо <code>setState</code> отримує значення, рівне поточному за <code>Object.is</code>, React може «вийти» ще до рендеру дочірніх компонентів (<em>bailout</em>). Але сам компонент один раз усе одно викликається — тому <code>setState</code> у тілі рендеру без умови = нескінченний цикл, навіть якщо значення однакове.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span>Batching стосується і React 19 Actions / <code>use()</code>: кілька <code>setState</code> у межах одного transition чи в async-екшені після <code>await</code> так само групуються в один ре-рендер. <code>flushSync</code> лишається винятком «мені потрібен DOM негайно», а не інструментом за замовчуванням.</span></div>`,
        },
      ],
    },
    /* ============================= BLOCK 2 — HOOKS DEEP DIVE ============================= */
    {
      id: 'hooks-why',
      title: '🪝 Хуки: навіщо і правила',
      interviewQuestions: [
        {
          question: 'Яку конкретну проблему класових компонентів вирішили хуки, окрім «менше boilerplate»?',
          answer: 'Головна проблема — <strong>logic reuse</strong>: у класах повторно використати stateful-логіку (підписка на подію, таймер, fetch) між компонентами можна було лише через HOC або render props, що призводило до «wrapper hell» і ускладнювало трасування, звідки приходять props. Хуки дозволяють винести таку логіку в звичайну функцію (custom hook) і композювати без додаткових шарів у дереві компонентів.',
        },
        {
          question: 'Чим виклик custom hook принципово відрізняється від виклику звичайної функції-утиліти?',
          answer: 'Custom hook має доступ до <strong>персистентного слоту памʼяті</strong> поточного Fiber-вузла — він може всередині викликати <code>useState</code>/<code>useEffect</code>/<code>useRef</code>, і ці значення переживають рендери саме цього компонента. Звичайна функція такої памʼяті не має: кожен виклик стартує з нуля. Саме тому хук можна викликати лише з тіла компонента чи іншого хука і лише на верхньому рівні — його ідентичність визначається порядковою позицією виклику, а не імʼям.',
        },
        {
          question: 'Чому хуки не можна викликати всередині умов, циклів чи вкладених функцій?',
          answer: 'React відстежує стан хуків не за іменем, а за <strong>порядком виклику</strong> в кожному рендері (внутрішньо — пов\'язаний список на fiber-вузлі). Якщо виклик хука обумовлений (наприклад, <code>if (cond) useState()</code>), порядок може відрізнятись між рендерами, і React прив\'яже стан не до того хука — це не варнінг, а реальна десинхронізація стану.',
        },
        {
          question: 'Як обійти ситуацію, коли за бізнес-логікою хук потрібно викликати «умовно» (наприклад, лише для одного з варіантів UI)?',
          answer: 'Хук викликається завжди, безумовно, а <em>умовною</em> робиться логіка всередині нього або використання результату: наприклад, завжди викликати <code>useEffect</code>, але саму підписку/запит обгорнути в <code>if</code> усередині callback\'а; або розбити компонент на два (умовний рендер компонента-обгортки, а не умовний виклик хука).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Проблема до хуків (React &lt;16.8, 2019) <span class="tag tag-key">KEY</span></h3>
  <p>Класи були єдиним способом дати компоненту стан і lifecycle. Це створювало дві конкретні болі:</p>
  <div class="grid2">
    <div class="card red"><h4>1. Перевикористання stateful-логіки — лише через "wrapper hell"</h4><p>Хотів переюзати логіку (підписка, debounce, auth-check) в кількох компонентах — доводилось обгортати компонент у HOC або render-props (Block 5, розділ "Patterns"). Кожна така обгортка — ще один рівень у дереві React DevTools, ще один шар пропів, що "просвічують" крізь усі обгортки.</p></div>
    <div class="card red"><h4>2. Логіка розкидана по методах, а не по фічах</h4><p>Один lifecycle-метод містив код кількох незвʼязаних речей (fetch, аналітика, підписка), а той самий "fetch"-код доводилось дублювати в методі оновлення — коротка мапа класового API на хуки в розділі "🏛️ Class vs Functional" нижче.</p></div>
  </div>
  <p><strong>Хуки (React 16.8, 2019)</strong> вирішили обидві: логіку можна винести у звичайну функцію (custom hook, розділ нижче) без жодної обгортки в дереві компонентів, і повʼязаний код (state + effect для нього) живе поруч в одному місці, а не розкиданий по lifecycle-методах.</p>
  <h3 class="topic">Звідки назва "hook"</h3>
  <p>Функція "чіпляється" (hooks into) за внутрішній механізм React — стан і lifecycle компонента — ззовні, без класової ієрархії. Це не метафора з DOM чи подіями браузера, а буквально "гачок" у React-рантайм.</p>
  <h3 class="topic">Хук vs звичайна функція — принципова різниця <span class="tag tag-key">KEY</span></h3>
  <p>Хук — не просто "функція, яку можна викликати". У хука є доступ до <strong>персистентного слоту памʼяті</strong>, привʼязаного до конкретного Fiber-вузла (<code>memoizedState</code> — зв'язний список, розділ "Reconciliation, Virtual DOM, Fiber" вище), який <strong>переживає</strong> кожен наступний рендер саме цього компонента. Звичайна функція, викликана двічі, не має такої памʼяті — кожен виклик стартує "з нуля", без звʼязку з попереднім.</p>
  <div class="grid2">
    <div class="card blue"><h4>Звичайна функція</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">makeCounter</span>() {
  <span class="kw">let</span> count = <span class="num">0</span>;  <span class="cmt">// живе, поки живе замикання,</span>
  <span class="kw">return</span> () =&gt; ++count;  <span class="cmt">// не привʼязано до Fiber-вузла</span>
}
<span class="cmt">// Викликана в тілі компонента — count скидається щорендеру,</span>
<span class="cmt">// бо немає звʼязку з конкретним "місцем" у Fiber-дереві</span></pre></div>
    <div class="card green"><h4>useState — хук</h4><pre style="font-size:10.5px"><span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);
<span class="cmt">// значення живе в memoizedState ЦЬОГО Fiber-вузла,</span>
<span class="cmt">// React повертає його на кожному наступному рендері —</span>
<span class="cmt">// саме тому це можливо ЛИШЕ у функції-компоненті/хуку,</span>
<span class="cmt">// що React викликає й відстежує сам (детально — наступний розділ)</span></pre></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Це і є відповідь на "чим хук відрізняється від функції": хук отримує доступ до React-рантайму (конкретно — до слоту в Fiber-дереві поточного компонента), звичайна функція — ні. Саме тому хуки не можна "просто взяти й викликати" будь-де — звідси <strong>Правила хуків</strong> нижче.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Два правила хуків <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card"><h4>1. Лише на верхньому рівні</h4><p>Ніколи всередині <code>if</code>/циклів/вкладених функцій/<code>try-catch</code>/після раннього <code>return</code>. Хуки викликаються в <strong>однаковому порядку на кожному рендері</strong>.</p></div>
    <div class="card blue"><h4>2. Лише з React-функцій</h4><p>Функції-компоненти або інші custom hooks. Ніколи — зі звичайних JS-функцій, методів класу, чи колбека, визначеного поза компонентом.</p></div>
  </div>
  <h3 class="topic">Чому саме так — звʼязок з Fiber <span class="tag tag-pit">PITFALL</span></h3>
  <p>React зіставляє хуки між рендерами <strong>за позицією виклику</strong> у зв'язному списку <code>memoizedState</code> Fiber-вузла — не за іменем змінної (див. «Хук vs звичайна функція» вище). Умовний виклик хука зсуває позицію <strong>усіх наступних</strong> хуків у тому ж компоненті — і React підставляє їм чужі значення.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// ❌ ЗЛАМАНО — умовний виклик хука
function Profile({ userId }: Props) {
  if (userId) {
    const [name, setName] = useState('');   // хук #1 — умовний!
  }
  const [loading, setLoading] = useState(false); // хук #2 (або #1, залежно від userId!)

  // Рендер 1 (userId є): порядок хуків = [name, loading]
  // Рендер 2 (userId стало falsy): порядок хуків = [loading]
  // React бере значення зі слоту #1 для "loading" — це насправді старе значення "name"!
  // Результат: loading несподівано містить рядок замість boolean, стан "поїхав"
}

// ✅ ПРАВИЛЬНО — хук завжди викликається, умова йде ВСЕРЕДИНУ
function Profile({ userId }: Props) {
  const [name, setName] = useState('');       // завжди хук #1
  const [loading, setLoading] = useState(false); // завжди хук #2

  useEffect(() => {
    if (!userId) return;      // умова всередині ефекту, не навколо хука
    fetchName(userId).then(setName);
  }, [userId]);
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">✅</span><span>Ловиться до рантайму: <code>eslint-plugin-react-hooks</code> (правило <code>rules-of-hooks</code>) — вже в рекомендованому наборі розширення ES7+ Snippets (розділ "React + VS Code" вище). Друге правило того ж плагіна, <code>exhaustive-deps</code>, стежить за коректністю dependency-масивів <code>useEffect</code>/<code>useMemo</code>/<code>useCallback</code>.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span>React Compiler (розділ "React 19 / майбутнє" вище) автоматизує мемоізацію, але <strong>не скасовує</strong> ці два правила — виклик хука досі мусить бути передбачуваним і на верхньому рівні, компілятор аналізує код статично й не "зрозуміє" динамічний порядок хуків.</span></div>
  `,
        },
      ],
    },
    {
      id: 'hooks-usestate-patterns',
      title: '🔢 useState: оновлювачі та ініціалізація',
      interviewQuestions: [
        {
          question: 'Коли <code>setX(x + 1)</code> і <code>setX(v => v + 1)</code> дають різний результат?',
          answer: 'Коли за один цикл потрібно кілька оновлень поспіль або оновлення відбувається із замикання (таймер, проміс, обробник події, що вже "бачить" застарілий <code>x</code>). <code>setX(x + 1)</code> двічі поспіль дасть <code>+1</code>: обидва виклики читають той самий <code>x</code> з поточного рендеру. <code>setX(v => v + 1)</code> двічі дасть <code>+2</code>: React передає в апдейтер найсвіжіше значення з черги.',
        },
        {
          question: 'Чим <code>useState(() => init())</code> відрізняється від <code>useState(init())</code>?',
          answer: '<code>useState(init())</code> викликає <code>init()</code> на <strong>кожному</strong> рендері й одразу відкидає результат після першого — марна робота, а якщо це читання <code>localStorage</code> чи важкий розрахунок, то ще й помітна. <code>useState(() => init())</code> (lazy initializer) React викликає рівно один раз, при монтуванні.',
        },
        {
          question: 'Чому <code>console.log(x)</code> одразу після <code>setX(...)</code> друкує старе значення?',
          answer: 'Змінна <code>x</code> — це <strong>знімок</strong> стану для конкретного рендеру, вона незмінна до кінця цього рендеру. <code>setX</code> не мутує <code>x</code>, а планує наступний рендер з новим значенням. Нове значення побачиш лише як нову змінну <code>x</code> у тілі наступного рендеру.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">State — це знімок, не «жива» змінна <span class="tag tag-key">KEY</span></h3>
  <p>У межах одного рендеру значення зі <code>useState</code> заморожене. Усі замикання, створені під час цього рендеру (обробники, ефекти, таймери), «бачать» саме це значення — навіть якщо викликаються пізніше. Це не баг, а модель: рендер — чиста функція від пропів і знімка стану.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// 1. Функціональний оновлювач — обовʼязковий при кількох апдейтах / в async
function Counter() {
  const [n, setN] = useState(0);
  function addThree() {
    setN(n + 1);        // усі три читають n === 0
    setN(n + 1);        // → підсумок: 1
    setN(n + 1);
    // setN(v => v + 1) тричі → підсумок: 3
  }
  useEffect(() => {
    const id = setInterval(() => setN(v => v + 1), 1000); // ✅ не залежить від n
    return () => clearInterval(id);
  }, []);              // порожній масив — бо оновлювач не читає n напряму
}

// 2. Lazy initializer — важкий старт рахується один раз
const [tree, setTree] = useState(() => parseHugeJSON(raw));   // не parseHugeJSON(raw)

// 3. Обʼєкт у state — заміна, не мутація
setForm(f => ({ ...f, email: value }));   // ✅ новий обʼєкт
// form.email = value; setForm(form);     // ❌ той самий референс → рендер не спрацює`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Кілька <code>useState</code> vs один обʼєкт vs <code>useReducer</code></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Ситуація</th><th>Вибір</th></tr>
      <tr><td>Незалежні поля, що змінюються окремо</td><td>кілька <code>useState</code> — простіше, не треба спред щоразу</td></tr>
      <tr><td>Поля завжди змінюються разом (напр. <code>{x, y}</code> позиція)</td><td>один <code>useState</code>-обʼєкт</td></tr>
      <tr><td>Наступний стан залежить від попереднього, багато типів переходів</td><td><code>useReducer</code> — переходи в одному місці, легше тестувати (розділ «🔄 Життєвий цикл і події компонента»)</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Правило: якщо в <code>onChange</code> ти читаєш поточний стан, щоб порахувати наступний — майже завжди має бути оновлювач-функція. <code>exhaustive-deps</code> тоді ще й прибирає стан із масивів залежностей <code>useEffect</code>/<code>useCallback</code>.</span></div>`,
        },
      ],
    },
    {
      id: 'hooks-catalog-full',
      title: '📋 Повний каталог хуків',
      interviewQuestions: [
        {
          question: 'Які React-хуки ти б виділив як такі, що рідко потрібні у звичайному продуктовому коді, і чому вони взагалі існують?',
          answer: '<code>useImperativeHandle</code>, <code>useDebugValue</code>, <code>useId</code>, <code>useSyncExternalStore</code> — нішеві. <code>useImperativeHandle</code> потрібен для контрольованого імперативного API компонента (кастомний input-wrapper з методом <code>.focus()</code>); <code>useSyncExternalStore</code> — коректний спосіб підписатись на зовнішнє (поза-React) сховище стану без tearing у concurrent-режимі — на ньому побудовані бібліотеки на кшталт Zustand.',
        },
        {
          question: 'Чому підписку на зовнішнє джерело краще робити через <code>useSyncExternalStore</code>, а не через <code>useEffect</code> + <code>useState</code>?',
          answer: 'Ручний <code>useEffect</code> підписується <strong>після</strong> paint — між першим рендером і спрацюванням ефекту компонент показує застаріле значення, а в concurrent-режимі різні частини дерева можуть відрендеритись з різними значеннями одного джерела (tearing). <code>useSyncExternalStore</code> читає <code>getSnapshot</code> синхронно під час рендеру й гарантує, що весь рендер бачить одне узгоджене значення; плюс має окремий <code>getServerSnapshot</code> для SSR.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Мапа всіх хуків React за категоріями. Ті, що мають детальний розбір в інших розділах (useEffect, useLayoutEffect, useReducer, StrictMode — «🔄 Життєвий цикл і події компонента»; useMemo/useCallback — «🧠 Мемоізація та референсна стабільність»; useRef — «🎯 useRef — детально»; useTransition/useDeferredValue — «useTransition / useDeferredValue»), тут — коротким рядком з переходом. Решта — <strong>лише тут</strong>, повністю.</p>
  <div class="table-wrap">
    <table>
      <tr><th>Хук</th><th>Категорія</th><th>З якої версії</th><th>Навіщо</th><th>Edge case</th></tr>
      <tr><td><code>useState</code></td><td>State</td><td>16.8</td><td>Локальний стан, незалежні прості значення</td><td>Lazy initializer — <code>useState(() =&gt; expensive())</code>, інакше <code>expensive()</code> виконується щорендеру, навіть якщо результат використано лише при mount</td></tr>
      <tr><td><code>useReducer</code></td><td>State</td><td>16.8</td><td>Складний повʼязаний state, явні action-переходи</td><td>Детально — «🔄 Життєвий цикл і події компонента» (є свій lazy-init нюанс)</td></tr>
      <tr><td><code>useEffect</code></td><td>Effect</td><td>16.8</td><td>Side-effects після paint (fetch, підписки)</td><td>Детально — «🔄 Життєвий цикл і події компонента» (stale closures, cleanup)</td></tr>
      <tr><td><code>useLayoutEffect</code></td><td>Effect</td><td>16.8</td><td>Синхронно до paint — читання layout</td><td>Детально — «🔄 Життєвий цикл і події компонента»</td></tr>
      <tr><td><code>useInsertionEffect</code></td><td>Effect</td><td>18</td><td>Вставка <code>&lt;style&gt;</code> ДО useLayoutEffect — лише для CSS-in-JS бібліотек (styled-components, розділ "Styling" вище)</td><td>Не для прикладного коду — немає доступу до refs, призначений виключно авторам бібліотек стилізації</td></tr>
      <tr><td><code>useRef</code></td><td>Ref</td><td>16.8</td><td>DOM-ref / мутабельне значення без ре-рендеру</td><td>Детально — розділ "🎯 useRef — детально"</td></tr>
      <tr><td><code>useImperativeHandle</code></td><td>Ref</td><td>16.8</td><td>Кастомізує, що саме батько бачить через <code>ref</code> на дочірній компонент (у парі з <code>forwardRef</code> або React 19 <code>ref</code>-як-проп)</td><td>Легко зловживати — імперативний API (<code>focus()</code>, <code>reset()</code>) в React мусить лишатись винятком, не звичкою; 95% кейсів вирішуються звичайним потоком props/state</td></tr>
      <tr><td><code>useMemo</code></td><td>Performance</td><td>16.8</td><td>Кешує дороге обчислення / стабільний референс</td><td>Детально — «🧠 Мемоізація та референсна стабільність» (не гарантія!)</td></tr>
      <tr><td><code>useCallback</code></td><td>Performance</td><td>16.8</td><td>Кешує референс функції</td><td>Детально — «🧠 Мемоізація та референсна стабільність»</td></tr>
      <tr><td><code>useContext</code></td><td>Context</td><td>16.8</td><td>Читає значення найближчого Provider вище по дереву</td><td>Компонент, що споживає Context, ре-рендериться на <strong>будь-яку</strong> зміну value провайдера — навіть якщо реально використовує лише одне поле з обʼєкта value (детально — розділ "Межі стану та Context")</td></tr>
      <tr><td><code>useTransition</code></td><td>Concurrent</td><td>18</td><td>Неурочна дія (функція-апдейт)</td><td>Детально — розділ "useTransition / useDeferredValue"</td></tr>
      <tr><td><code>useDeferredValue</code></td><td>Concurrent</td><td>18</td><td>Неурочне значення (ззовні)</td><td>Детально — розділ "useTransition / useDeferredValue"</td></tr>
      <tr><td><code>useId</code></td><td>Misc</td><td>18</td><td>Унікальний id, стабільний між сервером і клієнтом — для <code>&lt;label htmlFor&gt;</code>/ARIA-атрибутів</td><td><code>Math.random()</code>/лічильник у модулі для генерації id ламається при SSR — сервер і клієнт рахують по-різному → hydration mismatch (розділ "Next.js: рендер-моделі"). <code>useId</code> гарантовано однаковий на сервері й клієнті</td></tr>
      <tr><td><code>useSyncExternalStore</code></td><td>Misc</td><td>18</td><td>Коректна підписка на зовнішнє джерело стану поза React (браузерні API, стан-менеджери)</td><td>Це те, на чому <strong>всередині</strong> побудований Zustand-хук (розділ "Zustand" вище) — гарантує коректність під час concurrent-рендерингу (tearing-safe), на відміну від ручного <code>useEffect</code> + <code>useState</code> для підписки</td></tr>
      <tr><td><code>useDebugValue</code></td><td>Misc</td><td>16.8</td><td>Підписує custom hook міткою в React DevTools (розділ вище)</td><td>Працює лише в custom hooks, ефекту в звичайному компоненті не має — суто DX для авторів бібліотек хуків</td></tr>
    </table>
  </div>
  <h3 class="topic">Нішеві хуки — мінімальний робочий приклад</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// useId — стабільний id для звʼязки label ↔ input (і для aria-*)
function Field({ label }: { label: string }) {
  const id = useId();
  return <><label htmlFor={id}>{label}</label><input id={id} /></>;
  // ❌ не для ключів списку — id один на компонент, не на елемент
}

// useSyncExternalStore — підписка на джерело поза React без tearing.
// Приклад: чи онлайн браузер
function useOnlineStatus() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('online', cb);
      window.addEventListener('offline', cb);
      return () => {
        window.removeEventListener('online', cb);
        window.removeEventListener('offline', cb);
      };
    },
    () => navigator.onLine,          // getSnapshot (клієнт)
    () => true,                      // getServerSnapshot (SSR)
  );
}

// useDebugValue — мітка custom hook у DevTools
function useUser(id: string) {
  const user = /* ... */;
  useDebugValue(user ? user.name : 'loading');
  return user;
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><code>useImperativeHandle</code> — окремий приклад у розділі «🎯 useRef — детально». <code>useInsertionEffect</code> у прикладному коді не викликають — це API для авторів CSS-in-JS.</span></div>`,
        },
      ],
    },
    {
      id: 'memoization-concept',
      title: '🧠 Мемоізація та референсна стабільність',
      interviewQuestions: [
        {
          question: 'Поясни мемоізацію як загальну техніку (без React), а потім покажи, чому useMemo, useCallback і React.memo — це насправді одна й та сама ідея.',
          answer: 'Мемоізація — кешування результату обчислення за ключем вхідних даних: наступний виклик з тим самим ключем повертає кеш замість повторного обчислення (памʼять в обмін на швидкість). У React ця сама схема застосована до трьох різних "одиниць": <code>useMemo</code> кешує значення (ключ — deps-масив), <code>useCallback</code> кешує посилання на функцію (той самий useMemo під капотом), <code>React.memo</code> кешує РЕЗУЛЬТАТ РЕНДЕРУ компонента (ключ — props). В усіх трьох: ключ порівнюється через Object.is/поверхнево, зміна ключа = інвалідація кешу.',
        },
        {
          question: 'Fiber-поле memoizedState теж називається "мемоізація" — це та сама техніка, що useMemo?',
          answer: 'Ні, і це поширена плутанина через збіг слова. memoizedState — просто "слот останнього відомого значення" хука в Fiber-вузлі, без ключа й без інвалідації за замовчуванням. useMemo/useCallback/React.memo — справжній кеш-за-ключем із чіткою умовою скидання (зміна deps/props). Схожа за назвою, але окрема від них річ — Next.js Request Memoization, навпаки, це саме кешування-за-ключем (дедуплікація однакових fetch у межах одного рендеру за URL+опціями як ключем).',
        },
        {
          question: 'Коли <code>React.memo</code> реально допомагає, а коли лише додає накладні витрати без користі?',
          answer: '<code>React.memo</code> корисний для «важких» компонентів (дорогий рендер), чиї props стабільні між рендерами батька частіше, ніж змінюються. Якщо компонент дешевий у рендері або props (особливо об\'єкти/функції/масиви) створюються заново щоразу — <code>memo</code> лише додає витрати на поверхневе порівняння props без жодної економії, бо порівняння все одно «провалиться» і рендер відбудеться.',
        },
        {
          question: '<code>memo</code> не допоміг — з чого почнеш дебаг?',
          answer: 'Спершу <strong>виміряти</strong>, не гадати: React DevTools Profiler → «Why did this render?» назве причину (<code>props changed</code> / <code>hooks changed</code> / <code>parent rendered</code>). Найчастіша причина — <strong>новий референс пропу</strong> щорендеру батька (інлайновий <code>{}</code> / стрілка), який провалює поверхневе порівняння <code>memo</code>. Далі — стабілізувати той проп через <code>useMemo</code>/<code>useCallback</code> або підняти його вище, щоб не створювався в тілі батька.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що таке мемоізація — загальна техніка <span class="tag tag-key">KEY</span></h3>
  <p>Мемоізація — не React-специфічна концепція, а класична техніка з CS: <strong>кешуй результат обчислення, ключем — його вхідні дані</strong>. Наступного разу з тими самими вхідними даними — поверни збережений результат замість повторного обчислення. Плата — памʼять під кеш; вигода — заощаджений CPU. Ось мінімальна реалізація поза React (класичне питання на співбесіді — написати самому):</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function memoize<Args extends unknown[], R>(fn: (...args: Args) => R) {
  const cache = new Map<string, R>();

  return (...args: Args): R => {
    const key = JSON.stringify(args);       // ключ кешу — вхідні дані
    if (cache.has(key)) return cache.get(key)!;  // є в кеші — не рахуємо заново

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = (n: number) => { /* важке обчислення */ return n * n; };
const fastSquare = memoize(slowSquare);
fastSquare(5); // рахує
fastSquare(5); // з кешу, миттєво — той самий "ключ" (5)`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Одна ідея, три "одиниці" кешування в React <span class="tag tag-key">KEY</span></h3>
  <p>Побачивши схему вище, легко впізнати її ще тричі — <code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code> НЕ три окремі концепції для зазубрювання, а <strong>та сама</strong> схема "кеш за ключем", застосована до різних речей:</p>
  <div class="grid3">
    <div class="card"><h4>useMemo</h4><p>Кешує <strong>значення</strong>. Ключ — deps-масив. <code>useMemo(fn, deps)</code> ≈ <code>memoize(fn)</code> з ключем <code>deps</code>.</p></div>
    <div class="card blue"><h4>useCallback</h4><p>Кешує <strong>посилання на функцію</strong> — окремий випадок useMemo (<code>useCallback(fn, deps)</code> ≈ <code>useMemo(() =&gt; fn, deps)</code>).</p></div>
    <div class="card green"><h4>React.memo</h4><p>Кешує <strong>результат рендеру компонента</strong>. Ключ — props. "Аргументи" (props) ті самі → пропускаємо повторний виклик функції-компонента, як і в memoize().</p></div>
  </div>
  <div class="table-wrap">
    <table>
      <tr><th>Елемент схеми "кеш за ключем"</th><th>У React</th></tr>
      <tr><td>Ключ кешу</td><td>Deps-масив (useMemo/useCallback) або props (React.memo)</td></tr>
      <tr><td>Порівняння ключа</td><td><code>Object.is</code> по кожному елементу (не глибоке порівняння!)</td></tr>
      <tr><td>Інвалідація кешу</td><td>Ключ змінився → перерахувати/перерендерити; не змінився → віддати кеш</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Це і є "єдина концепція": щойно зрозуміло <code>memoize()</code> вище, <code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code> — не три різні API для завчання, а один патерн, застосований до значення, функції й компонента відповідно.</span></div>
  <h3 class="topic">Не плутати зі схожими словами <span class="tag tag-pit">PITFALL</span></h3>
  <p><code>memoizedState</code> у Fiber-вузлі (розділ "Reconciliation, Virtual DOM, Fiber" вище) — <strong>не</strong> ця техніка: це просто слот "останнє відоме значення хука", без ключа й без умови інвалідації. А от Next.js <strong>Request Memoization</strong> (розділ "Next.js App Router" нижче) — навпаки, СПРАВЖНІЙ приклад тієї самої схеми: дедуплікація однакових <code>fetch</code>-викликів у межах одного рендеру, де ключ — URL + опції запиту.</p>
  <p>React Compiler (розділ "React 19 / майбутнє") автоматизує застосування саме цієї схеми — розставляє мемоізацію за тебе, не змінюючи самої ідеї. <code>useRef</code> — стабільний контейнер, але <strong>не</strong> кеш-за-ключем: окремий розділ "🎯 useRef — детально" нижче.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">useMemo / useCallback — коли реально треба <span class="tag tag-pit">PITFALL</span></h3>
  <p><code>useMemo(fn, deps)</code> кешує <strong>значення</strong> <code>fn()</code>; <code>useCallback(fn, deps)</code> кешує саму <strong>функцію</strong>. Обидва не безкоштовні — порівняння <code>deps</code> і зберігання кешу теж коштує. Виправдані, коли: (а) обчислення справді важке, або (б) стабільність референсу критична — проп до <code>React.memo</code>-компонента чи залежність іншого хука. Інакше — складність без вимірної користі, тож спершу профілюй (розділ "Performance Deep Dive").</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>useMemo — підказка, не гарантія <span class="tag tag-pit">PITFALL</span>:</strong> React офіційно залишає за собою право <strong>відкинути</strong> закешоване значення й порахувати заново (наприклад, щоб звільнити память) навіть якщо залежності не змінились. Код <strong>не повинен покладатись</strong> на useMemo для коректності (напр. мутація об'єкта всередині обчислення "бо воно виконається лише раз") — лише для продуктивності. Якщо потрібна гарантія "виконати рівно раз" — <code>useRef</code> з лінивою ініціалізацією (розділ "🎯 useRef — детально") або <code>useEffect</code>.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>useCallback не "чинить" сам себе <span class="tag tag-pit">PITFALL</span>:</strong> референс функції лишається стабільним, лише якщо стабільні ВСІ значення в її dependency array. Якщо один з deps — новий обʼєкт/масив щорендеру (див. «Референсна стабільність» нижче), <code>useCallback</code> все одно поверне нову функцію — сама наявність <code>useCallback</code> нічого не гарантує без стабільності залежностей.</span></div>
  <h3 class="topic">React.memo — коли працює, коли ні <span class="tag tag-key">KEY</span></h3>
  <p><code>React.memo</code> — та сама схема "кеш за ключем", тільки ключ — <strong>props компонента</strong>. Порівнює пропи <strong>поверхнево</strong> (<code>Object.is</code> по кожному ключу) і скіпає ре-рендер, якщо всі рівні. Не рятує, якщо проп — новий обʼєкт/масив/функція на кожен рендер батька (референс завжди інший). Можна передати власний компаратор — рідко потрібно і легко зламати непомітно.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `const Row = React.memo(
  function Row({ item, onSelect }: RowProps) {
    return <li onClick={() => onSelect(item.id)}>{item.title}</li>;
  },
  (prev, next) => prev.item.id === next.item.id && prev.item.title === next.item.title,
  // кастомний компаратор — true = "пропи рівні, скіпнути рендер"
  // ⚠️ якщо забудеш порівняти якийсь проп — компонент застрягне зі старими даними
);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Референсна стабільність — головна причина, чому memo "не працює" <span class="tag tag-pit">PITFALL</span></h3>
  <div class="grid2">
    <div class="card red"><h4>❌ Новий референс щорендеру</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">Parent</span>() {
  <span class="kw">const</span> [n, setN] = <span class="fn">useState</span>(<span class="num">0</span>);
  <span class="kw">return</span> <span class="jsx">&lt;</span><span class="fn">Row</span> style={{ color: <span class="str">'red'</span> }}  <span class="cmt">// новий {} щоразу</span>
    onSelect={(id) =&gt; <span class="fn">doSomething</span>(id)} <span class="cmt">// нова функція щоразу</span>
  <span class="jsx">/&gt;</span>;               <span class="cmt">// memo(Row) все одно ре-рендериться</span>
}</pre></div>
    <div class="card green"><h4>✅ Стабілізовано useMemo/useCallback</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">Parent</span>() {
  <span class="kw">const</span> [n, setN] = <span class="fn">useState</span>(<span class="num">0</span>);
  <span class="kw">const</span> style = <span class="fn">useMemo</span>(() =&gt; ({ color: <span class="str">'red'</span> }), []);
  <span class="kw">const</span> onSelect = <span class="fn">useCallback</span>((id) =&gt; <span class="fn">doSomething</span>(id), []);
  <span class="kw">return</span> <span class="jsx">&lt;</span><span class="fn">Row</span> style={style} onSelect={onSelect} <span class="jsx">/&gt;</span>;
}</pre></div>
  </div>
  <h3 class="topic">Як саме ре-рендериться дерево — покроковий приклад <span class="tag tag-key">KEY</span></h3>
  <p>Дерево з трьох рівнів: <code>Parent</code> тримає <code>useState</code>, рендерить <code>Child</code>, той рендерить <code>Grandchild</code>. Жоден проп між ними реально не змінюється — лише <code>Parent</code> оновлює свій власний стан.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <Child label="static" />                 {/* проп НЕ змінюється */}
    </>
  );
}
function Child({ label }: { label: string }) {
  return <Grandchild label={label} />;          {/* проп НЕ змінюється */}
}
function Grandchild({ label }: { label: string }) {
  return <span>{label}</span>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="grid2">
    <div class="card red"><h4>❌ Без memo — усі три рендеряться</h4>
      <p>Клік по кнопці → <code>setCount</code> → <code>Parent</code> ре-рендериться (власний state — тригер #1, розділ «Життєвий цикл і події компонента» нижче). <strong>За замовчуванням React рендерить усе піддерево під ним</strong> — <code>Child</code> рендериться (тригер "ре-рендер батька"), і оскільки <code>Child</code> сам повертає <code>&lt;Grandchild&gt;</code> у своєму тілі, <code>Grandchild</code> рендериться теж. Три рендери на клік, хоча <code>label</code> ніде не змінився.</p>
    </div>
    <div class="card green"><h4>✅ memo(Child) зупиняє каскад на першому кордоні</h4>
      <p>Обгорни лише <code>Child</code> в <code>React.memo</code>. При кліку: <code>Parent</code> рендериться (не уникнути — власний state), <code>Child</code> отримує ре-рендер-запит від батька, але <code>React.memo</code> порівнює його пропи (<code>label="static"</code> — не змінився) і <strong>каже React: "not rendering"</strong>. Оскільки сам <code>Child</code> не виконався — <code>Grandchild</code> усередині нього <strong>взагалі не викликається</strong>, каскад зупинився на межі.</p>
    </div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span><code>memo</code> — це <strong>межа (boundary)</strong>, а не глобальний перемикач: він зупиняє поширення ре-рендеру рівно в тому місці дерева, де стоїть, і не потребує обгортати кожен компонент — досить поставити його перед "важким" піддеревом, яке не залежить від того, що змінюється вище.</span></div>
  <p style="font-size:12.5px;opacity:.75">Як знайти зайвий ре-рендер на практиці (Profiler, "Why did this render?") — розділи "Performance Deep Dive" та "React DevTools як Senior" нижче.</p>`,
        },
      ],
    },
    {
      id: 'hooks-deep-dive',
      title: '🔄 Життєвий цикл і події компонента',
      interviewQuestions: [
        {
          question: 'Як зіставити <code>componentDidMount</code>, <code>componentDidUpdate</code> і <code>componentWillUnmount</code> з <code>useEffect</code>?',
          answer: 'Один <code>useEffect(fn, [])</code> покриває <code>componentDidMount</code> (запускається раз після монтування) + <code>componentWillUnmount</code> (функція, повернута з <code>fn</code>, — cleanup). <code>useEffect(fn, [dep])</code> покриває <code>componentDidUpdate</code>, але з відмінністю: ефект запускається і після <em>монтування</em> теж, тоді як <code>componentDidUpdate</code> — лише після оновлень. Головна зміна мислення: не «в яку фазу», а «від яких значень залежить».',
        },
        {
          question: 'Назви причини, з яких компонент ре-рендериться.',
          answer: 'Чотири: (1) змінився власний <code>state</code>; (2) ре-рендернувся батько — дитина рендериться теж, навіть якщо її пропи не змінились (доки не стоїть <code>React.memo</code>); (3) змінилось значення <code>Context</code>, яке компонент споживає; (4) <code>useReducer</code> dispatch — навіть тим самим значенням (на відміну від <code>useState</code> тим самим значенням, де React бейлить через <code>Object.is</code>). Зміна пропу сама по собі не окремий пункт — вона діє через (2).',
        },
        {
          question: 'Навіщо потрібен <code>&lt;StrictMode&gt;</code> і чому в ньому компоненти рендеряться / монтуються двічі в dev?',
          answer: 'StrictMode навмисно подвоює виклик тіла компонента, ініціалізаторів <code>useState</code>/<code>useReducer</code> і mount-фазу ефектів (mount → unmount → mount) — щоб виявити неідемпотентність у рендері та ефекти без cleanup ще в розробці. Це саме те, що ламається в concurrent-режимі прода. У production подвоєння немає.',
        },
        {
          question: 'Що таке stale closure у <code>useEffect</code> і як його уникнути?',
          answer: 'Колбек ефекту «замикає» значення пропсів/стейту на момент свого створення. Якщо ефект запустився один раз (<code>[]</code>), а всередині є <code>setInterval</code>/підписка, що читає <code>count</code> — вона назавжди бачитиме <code>count</code> з першого рендеру. Виходи: <strong>функціональний апдейт</strong> (<code>setCount(c =&gt; c + 1)</code>), додати значення в <code>deps</code> (ефект перезапуститься з актуальним замиканням — не забути cleanup), або тримати «живе» значення в <code>useRef</code> і читати <code>ref.current</code>.',
        },
        {
          question: 'Навіщо <code>AbortController</code> в ефекті, якщо вже є прапорець <code>active</code>?',
          answer: '<code>active</code>-guard лише <em>ігнорує</em> застарілу відповідь — сам запит усе одно доходить до сервера, тримає з\'єднання й може впертись у rate-limit. <code>controller.abort()</code> реально <strong>рве мережевий запит</strong>, звільняє слот у пулі з\'єднань і зупиняє парсинг тіла. На швидких перемиканнях (autocomplete, пагінація) це відчутно економить трафік і навантаження на бекенд.',
        },
        {
          question: 'Що не так з <code>useEffect(async () =&gt; { … })</code>?',
          answer: '<code>async</code>-стрілка завжди повертає <strong>Promise</strong>, а React очікує від колбека ефекту або <code>undefined</code>, або cleanup-функцію — Promise він cleanup-ом трактувати не вміє (буде ворнінг, cleanup не спрацює). Правильно: оголосити <code>async</code>-функцію <strong>всередині</strong> ефекту й одразу викликати її, а сам колбек лишити синхронним і повернути з нього справжній cleanup (<code>AbortController.abort()</code>).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Три фази життя компонента <span class="tag tag-key">KEY</span></h3>
  <p>Кожен компонент проходить: <strong>Mount</strong> (перше створення й вставка в DOM) → <strong>Update</strong> (повторюється на кожен ре-рендер: зміна props / state / context) → <strong>Unmount</strong> (видалення з DOM). Класові компоненти виражали це явними методами (<code>componentDidMount</code> тощо — розділ «🏛️ Class vs Functional» нижче); функціональні — через <code>useEffect</code> і порядок виконання самого тіла функції. Нижче — кожна подія покроково.</p>`,
        },
        {
          kind: 'mermaid',
          caption:
            'Три стани життя: Mount (один раз) → Update (цикл — повторюється на кожну зміну props / state / context) → Unmount (один раз).',
          code: `flowchart LR
  S["Компонент<br/>оголошено в JSX"] --> MOUNT["🟢 MOUNT<br/>перший рендер +<br/>вставка у DOM"]
  MOUNT --> UPDATE["🔵 UPDATE<br/>ре-рендер на зміну<br/>props / state / context"]
  UPDATE -->|"знову змінилось"| UPDATE
  UPDATE --> UNMOUNT["🔴 UNMOUNT<br/>прибрано з DOM +<br/>cleanup ефектів"]
  MOUNT -->|"прибрано одразу"| UNMOUNT`,
        },
        {
          kind: 'mermaid',
          caption:
            'Що саме виконується на кожному кроці у функціональному компоненті. Тіло функції = render-фаза (чиста, без side-effects); усе інше робить React у commit-фазі. Побічні ефекти живуть лише в useEffect — бо render-фазу React може перервати чи повторити (розділ «Render vs Commit фази» вище).',
          code: `flowchart TB
  subgraph MOUNT["🟢 MOUNT — один раз"]
    M1["Виклик тіла функції<br/>render-фаза: чиста, повертає JSX"] --> M2["React комітить DOM<br/>+ присвоює refs"]
    M2 --> M3["useLayoutEffect<br/>синхронно, ДО paint"]
    M3 --> M4["🖌️ Браузер малює екран"]
    M4 --> M5["useEffect<br/>асинхронно, ПІСЛЯ paint"]
  end
  subgraph UPDATE["🔵 UPDATE — на кожну зміну props / state / context"]
    U1["Повторний виклик тіла функції"] --> U2["React диффить і комітить<br/>лише те, що змінилось"]
    U2 --> U3["Залежності useEffect змінились?<br/>ТАК → cleanup старого ефекту, потім новий запуск<br/>НІ → ефект пропускається"]
  end
  subgraph UNMOUNT["🔴 UNMOUNT — один раз"]
    X1["React прибирає вузол з DOM"] --> X2["Запуск УСІХ cleanup-функцій<br/>return з useEffect / useLayoutEffect"]
  end
  M5 --> U1
  U3 -->|"знову змінились props / state"| U1
  U3 --> X1`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">🧭</span><span>Як читати діаграму: <strong>тіло функції викликається на кожній фазі Mount і Update</strong> — це і є функціональний аналог <code>render()</code>. А <strong>коли</strong> спрацює ефект, вирішує масив залежностей: <code>useEffect(fn, [])</code> = лише Mount + Unmount; <code>useEffect(fn, [dep])</code> = Mount + кожен Update, де змінився <code>dep</code>; <code>useEffect(fn)</code> без масиву = після кожного рендеру. Чому side-effects заборонені прямо в тілі — розділ «🎬 Render vs Commit фази» вище.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">1. MOUNT — що відбувається за першим разом</h3>
  <div class="table-wrap"><table>
    <tr><th>Крок</th><th>Що робить React</th></tr>
    <tr><td>Виклик тіла функції</td><td>render-фаза — чиста, повертає JSX; тут <strong>не можна</strong> робити side-effects</td></tr>
    <tr><td>Commit у DOM</td><td>React вставляє вузли, присвоює <code>ref.current</code></td></tr>
    <tr><td><code>useLayoutEffect</code></td><td>синхронно, <strong>ДО</strong> paint — для читання layout / синхронних правок DOM без візуального «флешу»</td></tr>
    <tr><td>🖌️ Paint</td><td>браузер малює екран</td></tr>
    <tr><td><code>useEffect</code></td><td>асинхронно, <strong>ПІСЛЯ</strong> paint — fetch, підписки, аналітика (95% випадків)</td></tr>
  </table></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">2. RE-RENDER — 4 тригери <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap"><table>
    <tr><th>Тригер</th><th>Деталь</th></tr>
    <tr><td>Власний <code>state</code></td><td><code>setState</code> тим самим значенням → React <strong>бейлить</strong> (пропускає ре-рендер, <code>Object.is</code>-порівняння)</td></tr>
    <tr><td>Ре-рендер батька</td><td>дитина рендериться <strong>теж</strong>, навіть якщо її пропи не змінились — доки не стоїть <code>React.memo</code> (розділ «🧠 Мемоізація та референсна стабільність» вище)</td></tr>
    <tr><td>Зміна <code>Context</code></td><td>усі споживачі провайдера ре-рендеряться на будь-яку зміну <code>value</code> (розділ «🧭 Межі стану та Context»)</td></tr>
    <tr><td><code>useReducer</code> dispatch</td><td>тригерить рендер <strong>навіть тим самим значенням</strong> — на відміну від <code>useState</code></td></tr>
  </table></div>
  <p style="font-size:12.5px;opacity:.75">Кілька <code>setState</code> в одному тику зливаються в один ре-рендер (batching) — розділ «⚡ Automatic Batching» вище.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">useReducer vs useState — коли який</h3><div class="grid2">
    <pre><span class="cmt">// useState — незалежні прості значення</span>
<span class="kw">const</span> [name, setName] = <span class="fn">useState</span>(<span class="str">''</span>);
<span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">false</span>);</pre>
    <pre><span class="cmt">// useReducer — повʼязаний складний state,</span>
<span class="cmt">// перехід між станами через явні action-и</span>
<span class="kw">const</span> [state, dispatch] = <span class="fn">useReducer</span>(reducer, {
  data: <span class="kw">null</span>, loading: <span class="kw">false</span>, error: <span class="kw">null</span>
});
<span class="fn">dispatch</span>({ type: <span class="str">'FETCH_START'</span> });
<span class="fn">dispatch</span>({ type: <span class="str">'FETCH_SUCCESS'</span>, payload: data });</pre>
  </div>
  <h3 class="topic">useReducer — третій аргумент, lazy init</h3>
  <pre><span class="cmt">// Як і useState(() => expensive()), useReducer має lazy-варіант —</span>
<span class="cmt">// третій аргумент "init" застосовується до initialArg лише ОДИН раз при mount</span>
<span class="kw">function</span> <span class="fn">init</span>(initialCount: <span class="type">number</span>) {
  <span class="kw">return</span> { count: initialCount, history: [] };  <span class="cmt">// дороге обчислення initial-стану</span>
}
<span class="kw">const</span> [state, dispatch] = <span class="fn">useReducer</span>(reducer, initialCount, init);
<span class="cmt">// без цього довелось би рахувати початковий стан щорендеру назовні хука</span></pre>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">3. Зміна залежностей ефекту <span class="tag tag-key">KEY</span></h3>
  <p>Коли значення в <code>deps</code> змінилось: React спершу викликає <strong>cleanup попереднього</strong> запуску, потім запускає ефект <strong>наново</strong> з актуальним замиканням. Якщо <code>deps</code> не змінились — ефект пропускається цілком. Порівняння — <code>Object.is</code> по кожному елементу (поверхнево): новий обʼєкт/масив/функція щорендеру «змінює» залежність, навіть якщо логічно значення те саме — типова причина зайвих запусків і нескінченних циклів.</p>
  <div class="grid2">
    <pre><span class="cmt">// Lifecycle-аналогія:</span>
<span class="fn">useEffect</span>(() =&gt; {
  <span class="cmt">// componentDidMount + componentDidUpdate</span>
  <span class="kw">return</span> () =&gt; { <span class="cmt">/* componentWillUnmount */</span> };
}, [dep]);        <span class="cmt">// [] = лише mount/unmount</span>
                  <span class="cmt">// без масиву = кожен рендер</span>
                  <span class="cmt">// [dep] = при зміні dep</span></pre>
    <pre><span class="cmt">// Stale closure bug!</span>
<span class="fn">useEffect</span>(() =&gt; {
  <span class="kw">const</span> id = <span class="fn">setInterval</span>(() =&gt; {
    <span class="fn">setCount</span>(count + <span class="num">1</span>);  <span class="cmt">// ❌ stale count=0 назавжди</span>
  }, <span class="num">1000</span>);
  <span class="kw">return</span> () =&gt; <span class="fn">clearInterval</span>(id);
}, []);

<span class="cmt">// ✅ Функціональний апдейт — не залежить від closure</span>
<span class="fn">setCount</span>(c =&gt; c + <span class="num">1</span>);</pre>
  </div>
  <p style="font-size:12.5px;opacity:.75">Ще один обхід stale closure — «живе» значення в <code>useRef</code> (розділ «🎯 useRef — детально» нижче). Лінтер <code>exhaustive-deps</code> з <code>eslint-plugin-react-hooks</code> стежить за повнотою масиву.</p>
  <h3 class="topic">useLayoutEffect vs useEffect</h3><div class="grid2">
    <div class="card red"><h4>useEffect (асинхронний)</h4><p>Виконується <strong>після</strong> paint. Не блокує браузер. 95% випадків (fetch, підписки, аналітика).</p></div>
    <div class="card yellow"><h4>useLayoutEffect (синхронний)</h4><p>Виконується <strong>до</strong> paint, одразу після DOM-мутацій. Для читання layout/dimensions і синхронних правок DOM — уникнути візуального «флешу».</p></div>
  </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">4. useEffect cleanup — механізм <span class="tag tag-key">KEY</span></h3>
  <p>Cleanup — це функція, яку <strong>повертає</strong> колбек <code>useEffect</code>. React кличе її <strong>перед кожним наступним запуском</strong> ефекту і <strong>при розмонтуванні</strong> компонента — щоб прибрати все, що ефект «відкрив».</p>
  <p style="margin-top:6px"><strong>Коли cleanup спрацьовує:</strong></p>
  <ul>
    <li>перед повторним запуском ефекту — коли змінилась залежність із <code>deps</code>;</li>
    <li>при unmount компонента;</li>
    <li>у dev зі <code>&lt;StrictMode&gt;</code> — додатково після першого «пробного» mount (тому й видно <code>mount → unmount → mount</code>).</li>
  </ul>
  <div class="table-wrap">
    <table>
      <tr><th>Setup (що ефект відкрив)</th><th>Cleanup (що повернути)</th></tr>
      <tr><td><code>setInterval</code> / <code>setTimeout</code></td><td><code>clearInterval</code> / <code>clearTimeout</code></td></tr>
      <tr><td><code>addEventListener</code></td><td><code>removeEventListener</code> — <strong>та сама функція!</strong></td></tr>
      <tr><td><code>fetch</code> / async-запит</td><td><code>AbortController.abort()</code></td></tr>
      <tr><td><code>WebSocket</code> / subscription</td><td><code>.close()</code> / <code>unsubscribe()</code></td></tr>
      <tr><td>Observer (Intersection / Resize / Mutation)</td><td><code>.disconnect()</code></td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Event listener — та сама референція в add і remove',
          code: `useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);
// removeEventListener мусить отримати ТУ САМУ функцію, що й add —
// тому оголошуй onResize усередині ефекту, не інлайном у двох місцях.`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Async fetch — race-condition guard + AbortController',
          code: `useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(e => { if (e.name !== 'AbortError') throw e; }); // ігнор скасування
  return () => controller.abort();  // скасувати при зміні url / unmount
}, [url]);

// Альтернатива без abort — прапорець-guard (запит усе одно доходить):
useEffect(() => {
  let active = true;
  fetchData().then(d => { if (active) setData(d); });
  return () => { active = false; };  // ігнорувати stale-відповідь
}, [url]);`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Subscription — WebSocket / RxJS / Centrifugo',
          code: `useEffect(() => {
  const sub = channel.subscribe(onMessage);
  return () => sub.unsubscribe();
}, [channel]);`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><strong>Типові помилки cleanup <span class="tag tag-pit">PITFALL</span>:</strong>
  <ul style="margin:4px 0 0">
    <li><strong>Порожній cleanup там, де потрібен</strong> — забув <code>return</code> → витік слухача/інтервалу на кожен re-run ефекту.</li>
    <li><strong>Async-функція прямо в <code>useEffect</code></strong> — <code>useEffect(async () =&gt; …)</code> повертає Promise, а не cleanup. Оголошуй <code>async</code> усередині, ефект лишай синхронним.</li>
    <li><strong>Різні референції в add/remove</strong> — інлайнова стрілка в обох місцях → <code>removeEventListener</code> не спрацює.</li>
    <li><strong>Оновлення стану після unmount</strong> — <code>AbortController</code> або <code>active</code>-guard знімають це.</li>
  </ul></span></div>
  <p style="font-size:12.5px;opacity:.75">Повний приклад <code>fetch</code> + <code>AbortController</code> з автентифікацією — розділ «🌐 Fetch, axios та автентифікація на клієнті» нижче; мапінг cleanup ↔ <code>componentWillUnmount</code> — «🏛️ Class vs Functional» нижче.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">5. UNMOUNT</h3>
  <p>React прибирає вузол з DOM і запускає <strong>всі</strong> cleanup-функції, повернуті з <code>useEffect</code> / <code>useLayoutEffect</code> цього компонента (і його піддерева). Після цього посилання на компонент можна відпускати — таймери зупинені, слухачі зняті, підписки закриті, запити скасовані.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">6. &lt;StrictMode&gt; — подвійний виклик лише в dev <span class="tag tag-key">KEY</span></h3>
  <p><strong>Що це:</strong> runtime-перемикач ЛИШЕ для development-збірки. Навмисно ДВІЧІ викликає тіло компонента, ініціалізатори <code>useState</code>/<code>useMemo</code>/<code>useReducer</code> і (React 18+) mount-фазу ефектів — <code>mount → unmount → mount</code>. <strong>Навіщо:</strong> викрити нечисті компоненти й ефекти без cleanup ще в розробці, поки легко пофіксити. Це той самий сценарій, що React виконує в concurrent-режимі прода — тому баг, який StrictMode показує в dev, там стане реальним.</p>
  <div class="alert good"><span class="icon">✅</span><span><strong>У продакшн-білді нічого не подвоюється.</strong> Правильна реакція на подвійний <code>mount</code>/<code>fetch</code> у dev — не «прибрати <code>&lt;StrictMode&gt;</code>», а зробити ефект <strong>ідемпотентним</strong>: cleanup, який лишає рівно один активний слухач / інтервал / підписку, і <code>AbortController</code> для запитів. Забутий cleanup → після двох <code>mount</code> без <code>unmount</code> між ними отримаєш два інтервали / дубльовані підписки.</span></div>
  <p>Обгортається <strong>один раз, навколо кореня застосунку</strong>: у Vite/CRA — навколо <code>&lt;App /&gt;</code> у точці входу; у Next.js App Router увімкнено <strong>за замовчуванням</strong> (<code>reactStrictMode: true</code>).</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Подвоюється не лише сам ефект</strong> — будь-який <code>console.log</code> у тілі компонента чи в <code>useEffect</code> виведеться <strong>двічі поспіль</strong>. Це не баг логування — так само подвоюється весь код у цих точках.</span></div>
  <h3 class="topic">StrictMode (React) vs <code>'use strict'</code> (JavaScript) — не плутати <span class="tag tag-pit">PITFALL</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th><code>&lt;React.StrictMode&gt;</code></th><th><code>'use strict'</code></th></tr>
      <tr><td>Що це</td><td>React-компонент (JSX-обгортка)</td><td>Директива мови JavaScript</td></tr>
      <tr><td>Хто виконує</td><td>React runtime</td><td>JS-рушій (V8 та ін.)</td></tr>
      <tr><td>Діє де</td><td>Лише в development-збірці</td><td>Завжди — dev і прод однаково</td></tr>
      <tr><td>Що робить</td><td>Подвоює рендер/ефекти, щоб виявити нечистоту</td><td>Забороняє небезпечні конструкції, робить деякі мовчазні помилки винятками</td></tr>
      <tr><td>Стосунок один до одного</td><td colspan="2">Жодного — випадковий збіг слова "strict". <code>'use strict'</code> і так увімкнений автоматично в ES-модулях незалежно від StrictMode-компонента.</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function Counter() {
  console.log('render');           // dev + StrictMode: виведе ДВІЧІ підряд

  useEffect(() => {
    console.log('mount');          // dev: mount → unmount → mount (теж двічі)
    return () => console.log('unmount');
  }, []);

  return <div />;
}

// Виявляє ефекти БЕЗ cleanup — без StrictMode такий баг непомітний у dev,
// але в concurrent-рендерингу прода дає подвійні підписки/запити:
useEffect(() => {
  const id = setInterval(tick, 1000); // ❌ немає clearInterval → StrictMode покаже "2 інтервали"
}, []);

useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);     // ✅ cleanup — StrictMode проходить чисто
}, []);`,
        },
        {
          kind: 'paragraph',
          html: `<p style="font-size:12.5px;opacity:.75">Як це саме виглядало в класових методах (<code>componentDidMount</code>/<code>DidUpdate</code>/<code>WillUnmount</code>) і повна мапа метод → хук — розділ «🏛️ Class vs Functional» нижче.</p>`,
        },
      ],
    },
    {
      id: 'hooks-useref',
      title: '🎯 useRef — детально',
      interviewQuestions: [
        {
          question: 'У чому головна відмінність <code>useRef</code> від <code>useState</code>?',
          answer:
            '<code>useRef</code> повертає мутабельний контейнер <code>{ current }</code>, зміна якого <strong>синхронна й «тиха»</strong> — не планує ре-рендер, нове значення видно одразу в тому самому тику. <code>useState</code> оновлюється <strong>асинхронно</strong> (значення в поточному рендері «заморожене» до наступного) і <strong>тригерить ре-рендер</strong>. Правило вибору: якщо значення впливає на те, що бачить користувач — <code>useState</code>; якщо воно живе «поза UI» (id таймера, попереднє значення, DOM-вузол) — <code>useRef</code>.',
        },
        {
          question: 'Чому не можна читати/писати <code>.current</code> під час рендеру, і який єдиний виняток?',
          answer:
            'Рендер має бути <strong>чистою функцією</strong> пропсів і стейту. Мутація ref у тілі компонента робить результат рендеру залежним від побічного ефекту — це ламається в Concurrent Mode та StrictMode, де React може викликати тіло компонента двічі, перервати чи відкинути рендер. Читати/писати <code>.current</code> треба в <code>useEffect</code> або обробниках подій. Єдиний припустимий виняток — <strong>лінива ініціалізація</strong>: <code>if (ref.current === null) ref.current = createOnce()</code>, бо вона ідемпотентна й виконується фактично один раз.',
        },
        {
          question: 'Що не так з <code>useRef(new ExpensiveThing())</code> і як ініціалізувати важкий об\'єкт один раз?',
          answer:
            'Аргумент <code>useRef(...)</code> обчислюється на <strong>кожному рендері</strong> — <code>new ExpensiveThing()</code> створюватиметься щоразу, хоча використається лише перший результат (решта одразу відкидається). Правильно: <code>const ref = useRef(null)</code> і нижче <code>if (ref.current === null) ref.current = new ExpensiveThing()</code> — конструктор виконається рівно раз.',
        },
        {
          question: 'Як <code>useRef</code> рятує від stale closure при порожньому масиві залежностей?',
          answer:
            'Колбек, створений один раз (<code>[]</code> deps), назавжди замикається на значеннях першого рендеру. <code>ref</code> — це <strong>той самий об\'єкт</strong> на всіх рендерах; якщо на кожному рендері оновлювати <code>ref.current = value</code>, то читання <code>ref.current</code> усередині «застряглого» колбека дає актуальне значення без перепідписки. На відміну від <strong>функціонального апдейту</strong> (<code>setX(x =&gt; …)</code>) чи <strong>додавання в deps</strong> (перезапуск ефекту з новим замиканням), ref не перезапускає ефект і не тригерить ре-рендер — але й не є реактивним, тож не годиться, коли на зміну значення треба саме зреагувати.',
        },
        {
          question: 'useRef чи useMemo для стабільного мутабельного значення на весь час життя компонента?',
          answer:
            '<code>useRef</code>. <code>useMemo(() =&gt; obj, deps)</code> призначений для <strong>похідних значень</strong> і React офіційно може відкинути його кеш будь-коли — покладатись на нього для «створити рівно раз» не можна. <code>useRef</code> гарантує один і той самий <code>.current</code> назавжди й дозволяє його мутувати. <code>useMemo</code> доречний, коли значення <em>обчислюється</em> з інших і має перераховуватись при їх зміні.',
        },
        {
          question: 'Чому не можна навісити <code>ref</code> на функціональний компонент напряму і що змінилось у React 19?',
          answer:
            'До React 19 <code>ref</code> — не звичайний prop: React перехоплює його, і функціональний компонент його просто не отримує. Щоб пробросити <code>ref</code> до внутрішнього DOM-вузла, компонент треба обгорнути в <code>forwardRef((props, ref) =&gt; …)</code>. У <strong>React 19</strong> <code>ref</code> став звичайним пропом — його можна приймати як <code>props.ref</code>, і <code>forwardRef</code> більше не обов\'язковий.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що це та базова механіка <span class="tag tag-key">KEY</span></h3>
  <p><code>useRef</code> — хук, що повертає <strong>мутабельний контейнер</strong> <code>{ current: value }</code>, який зберігається між рендерами й <strong>не викликає ре-рендер</strong> при зміні. Два головні застосування: доступ до DOM-вузлів і зберігання значень, що мають пережити рендери, але не впливати на UI.</p>
  <pre><span class="kw">const</span> ref = <span class="fn">useRef</span>(initialValue);
ref.current;            <span class="cmt">// читання</span>
ref.current = newValue; <span class="cmt">// запис — НЕ тригерить ре-рендер</span></pre>
  <p><code>useRef(x)</code> повертає <strong>той самий об'єкт</strong> на кожному рендері. Змінюєш <code>.current</code> — значення живе далі, але React про це «не знає» й не перемальовує компонент.</p>`,
        },
        {
          kind: 'mermaid',
          caption:
            'Головна різниця: setState ставить оновлення в чергу й запускає ре-рендер; запис у ref.current відбувається синхронно й тихо — React про нього не дізнається.',
          code: `flowchart LR
  A["setState(x)"] --> B["React ставить<br/>оновлення в чергу"]
  B --> C["🔵 Ре-рендер<br/>наступний рендер бачить x"]
  C --> D["🖼️ UI оновлено"]
  E["ref.current = x"] --> F["🔴 Значення змінено<br/>синхронно, одразу"]
  F --> G["UI НЕ оновлюється<br/>React не знає про зміну"]`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">useRef vs useState <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>&nbsp;</th><th>useState</th><th>useRef</th></tr>
      <tr><td>Зміна тригерить ре-рендер</td><td>✅ так</td><td>❌ ні</td></tr>
      <tr><td>Зберігається між рендерами</td><td>✅ так</td><td>✅ так</td></tr>
      <tr><td>Оновлення</td><td>асинхронне (наступний рендер)</td><td>синхронне (одразу)</td></tr>
      <tr><td>Читання в тому ж тику</td><td>старе значення</td><td>нове значення</td></tr>
      <tr><td>Для чого</td><td>дані, що впливають на UI</td><td>дані «поза» UI, DOM-посилання</td></tr>
    </table>
  </div>
  <div class="grid2">
    <div class="card red"><h4>state — «заморожений» до наступного рендеру</h4><pre style="font-size:10.5px"><span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);
<span class="fn">setCount</span>(<span class="num">5</span>);
<span class="fn">console</span>.<span class="fn">log</span>(count); <span class="cmt">// 0 — оновиться лише в наступному рендері</span></pre></div>
    <div class="card green"><h4>ref — синхронно, але тихо</h4><pre style="font-size:10.5px"><span class="kw">const</span> countRef = <span class="fn">useRef</span>(<span class="num">0</span>);
countRef.current = <span class="num">5</span>;
<span class="fn">console</span>.<span class="fn">log</span>(countRef.current); <span class="cmt">// 5 — синхронно; UI при цьому не оновиться</span></pre></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Застосування 1 — імперативний доступ до DOM',
          code: `function Input() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();   // імперативний доступ до DOM
  }, []);

  return <input ref={inputRef} />;
}`,
        },
        {
          kind: 'paragraph',
          html: `<p><strong>Типові кейси:</strong> <code>focus()</code>, <code>scrollIntoView()</code>, вимірювання (<code>getBoundingClientRect</code>), інтеграція з не-React бібліотеками (canvas, відеоплеєри, чарти, карти).</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><code>ref</code> на елементі = <code>null</code> до монтування. Звертайся до <code>.current</code> в <code>useEffect</code> / обробниках подій, <strong>не під час рендеру</strong>.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Застосування 2 — значення, що переживають рендери (id таймера, попереднє значення)',
          code: `// id інтервалу — треба зберегти для cleanup, але UI від нього не залежить
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
useEffect(() => {
  timerRef.current = setInterval(tick, 1000);
  return () => { if (timerRef.current) clearInterval(timerRef.current); };
}, []);

// попереднє значення prop / state
function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => { ref.current = value; });  // оновлюємо ПІСЛЯ рендеру
  return ref.current;                          // повертаємо старе
}`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Застосування 3 — обхід stale closure: ref завжди читає актуальне значення',
          code: `function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;   // тримаємо ref свіжим на кожному рендері

  useEffect(() => {
    socket.on('event', () => {
      // messagesRef.current — завжди актуальний, на відміну від
      // messages, замкнутого на значенні першого рендеру
      console.log(messagesRef.current.length);
    });
    return () => socket.off('event');
  }, []);   // порожні deps, але через ref бачимо свіже значення
}`,
        },
        {
          kind: 'paragraph',
          html: `<p>Колбек із порожнім <code>deps</code> замикається на значеннях першого рендеру назавжди (<strong>stale closure</strong>). <code>ref.current</code> — той самий об'єкт на всіх рендерах, тож читання <code>ref.current</code> усередині такого колбека дає завжди актуальне значення без перепідписки. Мінус: ref <strong>не реактивний</strong> — на саму зміну значення так не зреагуєш, лише прочитаєш свіже при наступному виклику колбека.</p>
  <p style="font-size:12.5px;opacity:.75">Механіка замикань — розділ "Functions, Closures &amp; Scope" у топіку JavaScript; stale closure в <code>useEffect</code> та інші виходи (функціональний апдейт, deps) — розділ «🔄 Життєвий цикл і події компонента» вище.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Критичні правила <span class="tag tag-pit">PITFALL</span></h3>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Не читай / не пиши <code>.current</code> під час рендеру.</strong> Рендер має бути чистим. Мутація ref у тілі компонента робить його непередбачуваним для React (Concurrent Mode, StrictMode). Виняток — лінива ініціалізація (нижче). Усе інше — в <code>useEffect</code> або обробниках подій.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Зміна ref не оновлює UI.</strong> Якщо змінив <code>.current</code> і чекаєш перемальовування — це помилка вибору: тобі потрібен <code>useState</code>.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Не роби ref «тіньовим станом»</strong> для даних, що впливають на рендер — компонент показуватиме застарілі дані, доки якийсь ІНШИЙ стан не змусить його перерендеритись; UI розсинхронізується з даними.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Лінива ініціалізація важкого значення',
          code: `// ❌ useRef(new ExpensiveThing()) — аргумент обчислюється на КОЖНОМУ рендері
//    (результат після першого просто відкидається) — даремна робота

// ✅ ініціалізуй умовно — конструктор виконається рівно раз
const ref = useRef<ExpensiveThing | null>(null);
if (ref.current === null) {
  ref.current = new ExpensiveThing();
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">forwardRef — ref на власний компонент</h3>
  <p>Не можна навісити <code>ref</code> на функціональний компонент напряму — до React 19 потрібен <code>forwardRef</code>, щоб пробросити його всередину до DOM-вузла:</p>
  <pre><span class="kw">const</span> Input = <span class="fn">forwardRef</span>((props, ref) =&gt; &lt;<span class="fn">input</span> ref={ref} {...props} /&gt;);
<span class="cmt">// тепер &lt;Input ref={myRef} /&gt; працює</span></pre>
  <div class="alert good"><span class="icon">✅</span><span><span class="tag tag-new">React 19</span> <code>ref</code> можна передавати як звичайний prop — <code>forwardRef</code> більше не обов'язковий. Кастомізація того, що саме бачить батько через <code>ref</code> — <code>useImperativeHandle</code> (каталог хуків вище; детальніше — розділ "React 19 / майбутнє").</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">useRef vs useMemo — щоб не плутати</h3>
  <div class="grid2">
    <div class="card blue"><h4>useMemo(() =&gt; obj, deps)</h4><p>Перераховує при зміні <code>deps</code>. Для <strong>похідних значень</strong> — кешоване обчислення, що залежить від входів. Кеш React може відкинути — не гарантія.</p></div>
    <div class="card green"><h4>useRef(obj)</h4><p><strong>Ніколи</strong> не перераховує сам. Чистий контейнер зі стабільним <code>.current</code> на весь час життя компонента.</p></div>
  </div>
  <p>Для стабільного mutable-значення на весь час життя — <code>useRef</code>; для кешованого обчислення, що залежить від входів — <code>useMemo</code>.</p>
  <div class="alert good"><span class="icon">✅</span><span><strong>Ключова фраза для співбесіди:</strong> <code>useRef</code> — мутабельний контейнер <code>{ current }</code>, стабільний між рендерами, зміна якого не тригерить ре-рендер. Два застосування: імперативний доступ до DOM (через атрибут <code>ref</code>) і зберігання значень поза циклом рендеру — id таймерів, попередні значення, обхід stale closure. Головна відмінність від state: ref оновлюється синхронно й тихо, state — асинхронно й із перемальовуванням. Не читати/писати <code>.current</code> під час рендеру (крім лінивої ініціалізації) — рендер має лишатись чистим.</span></div>`,
        },
      ],
    },
    {
      id: 'hooks-concurrent',
      title: '⚡ useTransition / useDeferredValue',
      interviewQuestions: [
        {
          question: 'Яку конкретну UX-проблему вирішує <code>useTransition</code>, і чим він відрізняється від звичайного дебаунсу?',
          answer: '<code>useTransition</code> позначає оновлення стану як <strong>низькопріоритетне</strong>: React рендерить його у фоні, не блокуючи термінові оновлення (введення тексту, клік), і за потреби перериває незавершений низькопріоритетний рендер новішим. На відміну від дебаунсу, який просто <em>відкладає</em> виконання на таймер, transition дозволяє терміновим оновленням «обганяти» перерваний рендер миттєво, без штучної затримки.',
        },
        {
          question: 'Коли варто використовувати <code>useDeferredValue</code> замість <code>useTransition</code>?',
          answer: '<code>useTransition</code> застосовують, коли ти <strong>ініціюєш</strong> оновлення стану (керуєш setState). <code>useDeferredValue</code> застосовують, коли значення приходить <strong>ззовні</strong> (проп, контекст) і ти не керуєш моментом його зміни — наприклад, важкий список результатів пошуку, де сам текстовий інпут має лишатись миттєво чутливим, а рендер списку може відставати на кадр.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Concurrent features <span class="tag tag-new">React 18</span></h3>
  <p>Обидва хуки позначають частину оновлення як <strong>неурочну (non-urgent)</strong> — React рендерить її з нижчим пріоритетом і може перервати заради урочнішого оновлення (наприклад, наступного натискання клавіші). Це і є практичне застосування Fiber-переривності (Block 1).</p><div class="grid2">
    <pre><span class="cmt">// useTransition — для ДІЙ (функцій)</span>
<span class="kw">const</span> [isPending, startTransition] = <span class="fn">useTransition</span>();

<span class="fn">startTransition</span>(() =&gt; {
  <span class="fn">setFiltered</span>(items.<span class="fn">filter</span>(i =&gt; i.includes(q)));
});
<span class="cmt">// Urgent: сам input оновлюється відразу</span>
<span class="cmt">// Non-urgent: важкий filter — deferred, isPending=true поки триває</span></pre>
    <pre><span class="cmt">// useDeferredValue — для ЗНАЧЕНЬ</span>
<span class="kw">const</span> [query, setQuery] = <span class="fn">useState</span>(<span class="str">''</span>);
<span class="kw">const</span> deferredQuery = <span class="fn">useDeferredValue</span>(query);

<span class="cmt">// deferredQuery оновлюється, коли React має час</span>
<span class="cmt">// query — миттєво (input лишається responsive)</span>
<span class="jsx">&lt;</span><span class="fn">SearchResults</span> query={deferredQuery} <span class="jsx">/&gt;</span></pre>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Різниця у виборі: є функція, яку викликаєш сам (сеттер) → <code>useTransition</code>. Є готове значення (проп ззовні, не контролюєш сеттер) → <code>useDeferredValue</code>.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Повний патерн: миттєвий інпут + низькопріоритетний важкий список',
          code: `function Search({ allItems }: { allItems: Item[] }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);           // urgent — інпут оновлюється негайно
    startTransition(() => {
      // низькопріоритетно: якщо користувач друкує далі,
      // React викине цей рендер і почне новий
      setResults(filterExpensive(allItems, e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} />
      <ul style={{ opacity: isPending ? 0.6 : 1 }}>{/* ... */}</ul>
    </>
  );
}

// Той самий результат без окремого state — useDeferredValue:
function Search({ allItems }: { allItems: Item[] }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(
    () => filterExpensive(allItems, deferredQuery),  // рахується на "відстаючому" значенні
    [allItems, deferredQuery],
  );
  const isStale = query !== deferredQuery;
  return <>{/* input керується query, список — results */}</>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Чому це не дебаунс <span class="tag tag-key">KEY</span></h3>
  <p>Дебаунс <em>відкладає</em> роботу на фіксований таймер — навіть якщо процесор вільний, ти чекаєш умовні 300 мс. Transition роботу <strong>не відкладає</strong>: React починає рендер одразу, але з правом перервати його, щойно прилетить урочніше оновлення (наступна клавіша). На швидкій машині список оновиться майже миттєво, на повільній — плавно деградує, без магічної константи.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><code>startTransition</code> має містити <strong>синхронний</strong> <code>setState</code>. <code>await</code> усередині «розриває» transition — оновлення після нього вже урочне. Для async-роботи в React 19 <code>useTransition</code> приймає async-функцію (Actions, розділ «✨ React 19 / майбутнє»). І transition не робить сам <code>filterExpensive</code>/fetch швидшим — лише знижує пріоритет рендеру результату.</span></div>`,
        },
      ],
    },
    {
      id: 'hooks-custom',
      title: '🧵 Custom Hooks',
      interviewQuestions: [
        {
          question: 'За яким принципом варто виносити логіку у custom hook, а не залишати її в компоненті?',
          answer: 'Custom hook виправданий, коли stateful-логіка (підписка, таймер, fetch, синхронізація з зовнішнім джерелом) <strong>повторюється в кількох компонентах</strong> або коли вона достатньо самодостатня, щоб її можна було протестувати й іменувати окремо від UI. Якщо логіка використовується один раз і тісно пов\'язана з конкретним рендером — виносити її заради «чистоти» без реальної причини — це зайва абстракція.',
        },
        {
          question: 'Чи custom hook створює власний, ізольований стан для кожного компонента, який його викликає?',
          answer: 'Так. Кожен виклик custom hook у різних компонентах (або навіть у різних інстансах одного компонента) отримує <strong>власну, незалежну</strong> копію стану, бо хук — це просто функція, яка під капотом викликає <code>useState</code>/<code>useEffect</code> у контексті поточного fiber-рендеру; спільного сховища між викликами немає, на відміну від, наприклад, синглтон-стору.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Custom Hooks <span class="tag tag-key">KEY</span></h3>
  <p>Функція, що починається з <code>use</code>, може викликати інші хуки всередині — і підпорядковується тим самим правилам хуків (не в умовах/циклах/вкладених функціях, розділ «🪝 Хуки: навіщо і правила» вище). Виносить <strong>логіку</strong> (стан, ефекти, підписки), а не UI — компонент, що її використовує, лишається "тупим" (тонкий шар рендеру).</p>
  <div class="alert good"><span class="icon">✅</span><span><strong>Префікс <code>use</code> — не стиль, а вимога.</strong> Саме за ним <code>eslint-plugin-react-hooks</code> розпізнає функцію як хук і застосовує до неї Rules of Hooks-лінтинг. Назви функцію без цього префікса — і лінтер більше не перевірить порядок викликів усередині, навіть якщо вона викликає інші хуки.</span></div>
  <div class="grid2">
    <div class="card"><h4>useDebouncedValue</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useDebouncedValue</span>&lt;T&gt;(value: T, ms = <span class="num">300</span>) {
  <span class="kw">const</span> [debounced, setDebounced] = <span class="fn">useState</span>(value);
  <span class="fn">useEffect</span>(() =&gt; {
    <span class="kw">const</span> id = <span class="fn">setTimeout</span>(() =&gt; <span class="fn">setDebounced</span>(value), ms);
    <span class="kw">return</span> () =&gt; <span class="fn">clearTimeout</span>(id);
  }, [value, ms]);
  <span class="kw">return</span> debounced;
}</pre></div>
    <div class="card blue"><h4>useObservable (RxJS у хуку) — Sigma-тема</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useObservable</span>&lt;T&gt;(source$: Observable&lt;T&gt;, initial: T) {
  <span class="kw">const</span> [value, setValue] = <span class="fn">useState</span>(initial);
  <span class="fn">useEffect</span>(() =&gt; {
    <span class="kw">const</span> sub = source$.<span class="fn">subscribe</span>(setValue);
    <span class="kw">return</span> () =&gt; sub.<span class="fn">unsubscribe</span>();  <span class="cmt">// cleanup — обовʼязково!</span>
  }, [source$]);
  <span class="kw">return</span> value;
}
<span class="cmt">// presence$, debouncedSearch$ і т.п. стають звичайним React-значенням</span></pre></div>
  </div>
  <h3 class="topic">Ще приклади — найчастіші custom hooks у реальних проєктах</h3>
  <div class="grid2">
    <div class="card"><h4>usePrevious</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">usePrevious</span>&lt;T&gt;(value: T) {
  <span class="kw">const</span> ref = <span class="fn">useRef</span>&lt;T&gt;();
  <span class="fn">useEffect</span>(() =&gt; {
    ref.current = value;      <span class="cmt">// записується ПІСЛЯ рендеру,</span>
  });                         <span class="cmt">// тому під час рендеру ref.current — ще старе значення</span>
  <span class="kw">return</span> ref.current;   <span class="cmt">// "значення з минулого рендеру"</span>
}
<span class="cmt">// const prevCount = usePrevious(count);</span>
<span class="cmt">// if (count !== prevCount) { ... } — порівняння з минулим рендером</span></pre></div>
    <div class="card blue"><h4>useLocalStorage</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useLocalStorage</span>&lt;T&gt;(key: <span class="type">string</span>, initial: T) {
  <span class="kw">const</span> [value, setValue] = <span class="fn">useState</span>&lt;T&gt;(() =&gt; {
    <span class="kw">if</span> (<span class="kw">typeof</span> window === <span class="str">'undefined'</span>) <span class="kw">return</span> initial; <span class="cmt">// SSR guard!</span>
    <span class="kw">const</span> saved = localStorage.<span class="fn">getItem</span>(key);
    <span class="kw">return</span> saved ? JSON.<span class="fn">parse</span>(saved) : initial;
  });
  <span class="fn">useEffect</span>(() =&gt; {
    localStorage.<span class="fn">setItem</span>(key, JSON.<span class="fn">stringify</span>(value));
  }, [key, value]);
  <span class="kw">return</span> [value, setValue] <span class="kw">as const</span>;
}</pre></div>
    <div class="card green"><h4>useOnClickOutside</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useOnClickOutside</span>(
  ref: RefObject&lt;HTMLElement&gt;, handler: () =&gt; <span class="type">void</span>
) {
  <span class="fn">useEffect</span>(() =&gt; {
    <span class="kw">const</span> <span class="fn">listener</span> = (e: MouseEvent) =&gt; {
      <span class="kw">if</span> (!ref.current?.<span class="fn">contains</span>(e.target <span class="kw">as</span> Node)) handler();
    };
    document.<span class="fn">addEventListener</span>(<span class="str">'mousedown'</span>, listener);
    <span class="kw">return</span> () =&gt; document.<span class="fn">removeEventListener</span>(<span class="str">'mousedown'</span>, listener); <span class="cmt">// без cleanup — memory leak на кожен mount/unmount</span>
  }, [ref, handler]);
}</pre></div>
    <div class="card yellow"><h4>useMediaQuery</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useMediaQuery</span>(query: <span class="type">string</span>) {
  <span class="kw">return</span> <span class="fn">useSyncExternalStore</span>(
    onChange =&gt; {
      <span class="kw">const</span> mql = <span class="fn">matchMedia</span>(query);
      mql.<span class="fn">addEventListener</span>(<span class="str">'change'</span>, onChange);
      <span class="kw">return</span> () =&gt; mql.<span class="fn">removeEventListener</span>(<span class="str">'change'</span>, onChange);
    },
    () =&gt; <span class="fn">matchMedia</span>(query).matches   <span class="cmt">// getSnapshot</span>
  );
  <span class="cmt">// useSyncExternalStore, а не useEffect+useState — коректно</span>
  <span class="cmt">// під concurrent-рендерингом (каталог хуків вище)</span>
}</pre></div>
  </div>
  <h3 class="topic">Плюси й мінуси</h3>
  <div class="grid2">
    <div class="card green"><h4>✅ Плюси</h4><p>Перевикористання логіки без жодної обгортки в дереві компонентів (на відміну від HOC, розділ «🪝 Хуки: навіщо і правила» вище). Логіка тестується ізольовано (<code>renderHook</code> з testing-library). Композиція — custom hook може викликати інші custom hooks.</p></div>
    <div class="card red"><h4>❌ Мінуси / edge cases</h4><p><strong>Stale closures</strong> всередині самого хука — та сама проблема, що й у звичайному <code>useEffect</code> (розділ «🔄 Життєвий цикл і події компонента»), просто захована на рівень абстракції глибше — легше не помітити. <strong>Нестабільний референс, що повертається</strong> — якщо хук повертає новий обʼєкт/масив/функцію щовиклику (навіть без зміни даних), кожен компонент-споживач отримує "змінений" проп щорендеру — ламає <code>memo</code>/dep-array у споживача (розділ «🧠 Мемоізація та референсна стабільність») так само, як і звичайний нестабільний проп.</p></div>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span>Custom hook — не про "перевикористання UI" (для цього компоненти), а про <strong>перевикористання stateful-логіки</strong>. Кожен виклик хука в різних компонентах створює <em>ізольований</em> стан — вони не діляться значенням між собою.</span></div>`,
        },
      ],
    },
    {
      id: 'lifecycle-class-vs-functional',
      title: '🏛️ Class vs Functional',
      interviewQuestions: [
        {
          question: 'Чому один <code>useEffect(fn, [dep])</code> кращий за пару lifecycle-методів, які він замінює?',
          answer: 'Логіку «зробити X при першому рендері і при зміні <code>dep</code>» в класі доводилось писати <strong>двічі</strong> — у <code>componentDidMount</code> і в <code>componentDidUpdate</code> з ручним звірянням <code>prevProps</code>. Один <code>useEffect(fn, [dep])</code> покриває обидва випадки декларативно: React сам вирішує «mount чи update», код не дублюється, а без ручного порівняння немає й ризику нескінченного циклу оновлень.',
        },
        {
          question: 'Що з lifecycle досі не має повноцінного хук-еквівалента?',
          answer: '<code>componentDidCatch</code> / <code>getDerivedStateFromError</code> — механізм Error Boundary. Ловити помилки рендеру піддерева досі можна лише класовим компонентом (або обгорткою <code>react-error-boundary</code>); хука для цього немає — деталі в розділі «🧩 Patterns».',
        },
        {
          question: 'Навіщо взагалі знати класовий API, якщо нові компоненти на ньому не пишуть?',
          answer: 'Лише щоб читати легасі-код і розуміти співрозмовника на співбесіді. Весь класовий lifecycle зводиться до короткої мапи на хуки (нижче); нового коду на класах не пишуть — єдиний виняток це самі Error Boundary.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p style="font-size:12.5px;opacity:.75">Фази життя, події, cleanup і StrictMode — розділ «🔄 Життєвий цикл і події компонента» вище. Тут лише <strong>історична довідка</strong>: класові компоненти сьогодні не пишуть (виняток — Error Boundary), але легасі-код з ними ще трапляється.</p>
  <h3 class="topic">Класовий lifecycle → хук <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Класовий метод</th><th>Хук-еквівалент</th></tr>
      <tr><td><code>constructor</code> (ініціалізація state)</td><td><code>useState(initial)</code> / <code>useState(() => initial)</code></td></tr>
      <tr><td><code>render</code></td><td>тіло функціонального компонента (так само має бути чистим)</td></tr>
      <tr><td><code>componentDidMount</code></td><td><code>useEffect(fn, [])</code></td></tr>
      <tr><td><code>componentDidUpdate</code></td><td><code>useEffect(fn, [dep])</code></td></tr>
      <tr><td><code>componentWillUnmount</code></td><td>return-функція з <code>useEffect</code></td></tr>
      <tr><td><code>shouldComponentUpdate</code></td><td><code>React.memo</code> (розділ «🧠 Мемоізація та референсна стабільність»)</td></tr>
      <tr><td><code>this.state</code> з кількох полів</td><td>кілька <code>useState</code> або один <code>useReducer</code></td></tr>
      <tr><td><code>componentDidCatch</code> / <code>getDerivedStateFromError</code></td><td>— хука немає; Error Boundary лишається класовим</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Те, для чого в класі були constructor + componentDidMount +
// componentDidUpdate(prevProps) з ручним звірянням prevProps.userId:
function UserProfile({ userId }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchUser(userId, controller.signal).then(setUser);
    return () => controller.abort();      // <- componentWillUnmount
  }, [userId]);                            // <- mount + update на зміну userId в одному

  return <div>{user?.name}</div>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">✅</span><span>Головна практична перевага — <code>componentDidMount</code>/<code>componentDidUpdate</code> у класі часто дублювали той самий код, бо логіку «зробити X при mount і при зміні Y» писали двічі. Один <code>useEffect(fn, [dep])</code> покриває обидва випадки за визначенням залежностей.</span></div>`,
        },
      ],
    },
    /* ============================= BLOCK 3 — PERFORMANCE ============================= */
    {
      id: 'performance-deep-dive',
      title: '🚀 Performance Deep Dive',
      interviewQuestions: [
        {
          question: 'Які інструменти чи техніки ти використаєш, щоб знайти реальну причину зайвих ре-рендерів у великому додатку, а не гадати?',
          answer: 'React DevTools Profiler з увімкненим «Highlight updates» покаже, які компоненти й чому ре-рендерились (порівняння props/state/hooks у деталях коміту); для продакшн-профілювання — <code>&lt;Profiler&gt;</code> API з колбеком <code>onRender</code>. Гадати за симптомами («здається, тут щось повільне») — типова помилка джуна, тоді як сеньйор спершу вимірює.',
        },
        {
          question: 'Коли <code>React.lazy</code> + <code>Suspense</code> справді дає виграш, а коли лише плодить водоспади завантаження?',
          answer: 'Виграш — коли відкладений код <strong>справді важкий і не потрібен на першому екрані</strong>: окремі маршрути, модалки, рідко відкриті панелі, важкі залежності (редактор, чарти). Шкода — коли дробиш на дрібні чанки те, що майже завжди потрібне одразу: браузер робить окремі запити послідовно (waterfall), і сумарно виходить повільніше за один бандл. Межу розділу став на природних кордонах навігації/взаємодії, а не «на кожен компонент».',
        },
        {
          question: 'Коли virtualization справді потрібна?',
          answer: 'Коли в DOM одночасно опиняються <strong>сотні–тисячі</strong> вузлів (довгі списки, таблиці, стрічки) — тоді рендер і layout стають вузьким місцем. Для 20–50 елементів <code>react-window</code>/<code>react-virtual</code> — зайва складність (втрата нативного пошуку по сторінці, складніший a11y, «стрибки» при швидкому скролі), яка не окупається.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p style="font-size:12.5px;opacity:.75"><code>React.memo</code>, референсна стабільність і покроковий каскад ре-рендеру — розділ «🧠 Мемоізація та референсна стабільність» (Block 2). Тут — <strong>як виміряти</strong> й окремі техніки: профілювання, code splitting, віртуалізація, Core Web Vitals.</p>
  <h3 class="topic">Профілювання — React DevTools Profiler <span class="tag tag-key">KEY</span></h3>
  <p>Вкладка <strong>Profiler</strong>: запиши взаємодію → <strong>Flamegraph</strong> показує, які компоненти рендерились і скільки це коштувало; <strong>Ranked</strong> сортує за тривалістю. Клік на компонент → секція <strong>"Why did this render?"</strong> (треба увімкнути в налаштуваннях) називає точну причину: hook changed, props changed, parent rendered.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span>Робочий процес на співбесіді/у реальності: спершу <strong>профілюй</strong>, потім оптимізуй. <code>useMemo</code>/<code>memo</code> навмання без вимірювання — передчасна оптимізація, яка додає складність без гарантованого ефекту. Повний воркфлоу «виявити → виміряти → діагностувати → перевірити» — розділ «React DevTools як Senior» нижче.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Code splitting — React.lazy + Suspense
const Settings = React.lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      {showSettings && <Settings />}   {/* JS-чанк вантажиться лише тут */}
    </Suspense>
  );
}`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// List virtualization — react-window: рендеримо тільки видимі рядки
import { FixedSizeList } from 'react-window';

function BigList({ items }: { items: Item[] }) {
  return (
    <FixedSizeList height={600} width="100%" itemCount={items.length} itemSize={40}>
      {({ index, style }) => <div style={style}>{items[index].title}</div>}
    </FixedSizeList>
  );
}
// 10 000 <div> у DOM vs ~20 видимих — критично для довгих списків/таблиць`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Core Web Vitals</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Метрика</th><th>Що міряє</th><th>Типовий винуватець</th><th>Що робить frontend</th></tr>
      <tr><td><strong>LCP</strong></td><td>Час до відмальовки найбільшого елементу</td><td>Важке hero-зображення, повільний сервер, render-blocking JS</td><td><code>next/image</code> priority, преконект, code splitting, SSR/SSG замість CSR</td></tr>
      <tr><td><strong>CLS</strong></td><td>Візуальна "стрибучість" макету</td><td>Зображення/реклама без розмірів, шрифт FOUT</td><td><code>width/height</code> на медіа, <code>next/font</code> (без layout shift), skeleton замість пустого блоку</td></tr>
      <tr><td><strong>INP</strong></td><td>Затримка відгуку на взаємодію (замінив FID)</td><td>Важкі синхронні обробники, великий JS bundle, довгі рендери</td><td><code>useTransition</code>, дебаунс, розбиття важкої роботи, memo/virtualization</td></tr>
    </table>
  </div>
  `,
        },
      ],
    },
    {
      id: 'react-devtools',
      title: '🔍 React DevTools як Senior',
      interviewQuestions: [
        {
          question: 'Що конкретно показує вкладка Profiler у React DevTools, і як за нею відрізнити «повільний рендер» від «зайвого рендеру»?',
          answer: 'Profiler фіксує кожен коміт: тривалість рендеру кожного компонента та причину його ре-рендеру (зміна props/state/hooks/батько-компонент). «Повільний рендер» — компонент рендериться довго, бо всередині важкі обчислення; «зайвий рендер» — компонент рендериться швидко, але <em>занадто часто</em>, хоча його вихід не змінюється. Це дві різні проблеми з різними рішеннями (мемоізація обчислень vs мемоізація компонента/props).',
        },
        {
          question: `Як швидко перевірити гіпотезу "цей компонент ре-рендериться забагато" без Profiler?`,
          answer: `"Highlight updates when components render" у Components tab — візуальна рамка на кожен рендер.`,
        },
        {
          question: `Що показує "Why did this render?"`,
          answer: `точну причину конкретного ре-рендеру: зміна props, зміна хука, чи просто ре-рендер батька.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Дві вкладки, дві мети <span class="tag tag-key">KEY</span></h3>
  <p>Розширення браузера додає дві панелі: <strong>⚛️ Components</strong> — інспекція дерева й даних; <strong>⚛️ Profiler</strong> — вимірювання продуктивності в часі (вже згадувалась вище). Разом вони покривають і "що зараз у стані/пропах", і "чому щось повільне".</p>
  <h3 class="topic">Вкладка Components</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Фіча</th><th>Навіщо</th></tr>
      <tr><td>Дерево компонентів</td><td>Клік на вузол → праворуч видно <code>props</code>, <code>state</code>, і — окремо — список хуків у порядку виклику (з їхніми поточними значеннями)</td></tr>
      <tr><td>Inline-редагування</td><td>Можна змінити значення props/state прямо в панелі й одразу побачити результат — без правки коду</td></tr>
      <tr><td>🔍 Search</td><td>Пошук компонента за іменем у великому дереві</td></tr>
      <tr><td>"Highlight updates when components render"</td><td>Налаштування (⚙️) — обводить компонент кольоровою рамкою на кожен реальний ре-рендер прямо на сторінці. Найшвидший спосіб візуально побачити зайві ре-рендери без відкриття Profiler</td></tr>
      <tr><td><code>$r</code> у консолі браузера</td><td>Після кліку на компонент у DevTools — <code>$r</code> у Console дає доступ до його instance (props/state) прямо з JS-консолі</td></tr>
      <tr><td>Іконка ⚛️ джерела</td><td>Показує, який файл/компонент "власник" (owner) вузла — швидко знайти, де в коді він рендериться</td></tr>
    </table>
  </div>
  <h3 class="topic">Сеньйорський воркфлоу: Components + Profiler разом</h3>
  <div class="grid2">
    <div class="card"><h4>1. Виявити</h4><p>Увімкни "Highlight updates" → взаємодій зі сторінкою → візуально помітно, який компонент "блимає" частіше за очікуване.</p></div>
    <div class="card blue"><h4>2. Виміряти</h4><p>Profiler → Record → повтори взаємодію → Stop → Flamegraph/Ranked показують точну тривалість кожного рендеру.</p></div>
    <div class="card yellow"><h4>3. Діагностувати</h4><p>Клік на компонент у Flamegraph → "Why did this render?" (увімкнено в ⚙️) — точна причина: <code>props changed</code>, <code>hooks changed</code>, <code>parent rendered</code>.</p></div>
    <div class="card green"><h4>4. Виправити й перевірити</h4><p><code>memo</code>/стабілізація референсу/віртуалізація (Block 3) → знову Profile → порівняй тривалість до/після, а не "здається швидше".</p></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Interactions-трекінг у Profiler (запис конкретної взаємодії, а не всієї сесії) дає чистіший вимір — записуй одну дію (клік, ввід), а не хвилину довільного скролу.</span></div>
  `,
        },
      ],
    },
    /* ============================= BLOCK 4 — STATE MANAGEMENT ============================= */
    {
      id: 'state-boundaries',
      title: '🧭 Межі стану та Context',
      interviewQuestions: [
        {
          question: 'Як визначити правильний рівень дерева компонентів, на якому має жити конкретний шматок стану («межі стану»)?',
          answer: 'Правило — стан піднімається лише настільки високо, наскільки потрібно спільному предку компонентів, яким він реально потрібен (lifting state up), і не вище — інакше кожна зміна тригерить ре-рендер усього піддерева нижче. Якщо стан потрібен глибоко вкладеним компонентам без проміжного використання — це кандидат на Context або зовнішній стор, а не проп-дрилінг через кожен рівень.',
        },
        {
          question: 'Чому надмірне використання React Context для часто змінюваного стану вважається антипатерном?',
          answer: 'Кожна зміна значення в <code>Context.Provider</code> ре-рендерить <strong>усі</strong> компоненти-споживачі (<code>useContext</code>), незалежно від того, яку частину значення вони реально використовують — Context не має вбудованої селективної підписки. Для часто змінюваного або великого стану це створює каскад зайвих ре-рендерів; краще підходить стор із селекторами (Zustand, Redux) або розбиття на кілька дрібніших контекстів.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Де живе стан <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Тип стану</th><th>Приклад</th><th>Інструмент</th></tr>
      <tr><td><strong>Локальний</strong></td><td>відкрито/закрито dropdown, значення інпуту</td><td><code>useState</code> / <code>useReducer</code></td></tr>
      <tr><td><strong>Серверний</strong></td><td>список юзерів, дані з API</td><td>TanStack Query (кеш, а не "стан")</td></tr>
      <tr><td><strong>UI / клієнтський глобальний</strong></td><td>тема, стан кошика, sidebar collapsed</td><td>Zustand / Context</td></tr>
      <tr><td><strong>URL</strong></td><td>фільтри, пагінація, вкладка</td><td><code>useSearchParams</code> — переживає перезавантаження, шариться лінком</td></tr>
    </table>
  </div>
  <p>Найчастіша архітектурна помилка: тримати серверні дані в <code>useState</code>+<code>useEffect</code> (втрачаєш кеш/дедуплікацію/інвалідацію) або тримати URL-стан у <code>useState</code> (втрачаєш share-by-link і back-button).</p>
  <h3 class="topic">Context API — коли достатньо, коли ні <span class="tag tag-pit">PITFALL</span></h3>
  <div class="grid2">
    <div class="card green"><h4>✅ Годиться</h4><p>Рідкісні оновлення: тема, локаль, авторизований юзер, feature flags. Дерево споживачів не надто велике.</p></div>
    <div class="card red"><h4>❌ Не годиться</h4><p>Часті оновлення (позиція курсора, стан форми, реалтайм-дані) — <strong>будь-яка</strong> зміна value ре-рендерить <strong>УСІХ</strong> споживачів контексту, навіть тих, кому потрібна лише незмінна частина.</p></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Пастка: один Context на все = зайві ре-рендери
const AppContext = createContext<{ user: User; theme: Theme } | null>(null);
// зміна theme ре-рендерить усіх, кому потрібен лише user

// Фікс: розбити на кілька контекстів за частотою зміни
const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<Theme>('dark');

// + useMemo на value, інакше новий об'єкт-обгортка щорендеру
// провайдера "зраджує" memo-компоненти нижче:
const value = useMemo(() => ({ user, theme }), [user, theme]);
<AppContext.Provider value={value}>{children}</AppContext.Provider>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Окремо значення, окремо диспетчер</h3>
  <p>Розбий не лише за частотою, а й на <strong>state-контекст</strong> і <strong>dispatch-контекст</strong>. <code>dispatch</code> зі <code>useReducer</code> стабільний назавжди — компоненти, яким потрібен лише він (кнопки-дії), тоді не ре-рендеряться при зміні самого стану.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// "Локальний Redux" — useReducer + два контексти
const CartStateContext = createContext<CartState | null>(null);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <CartStateContext value={state}>
      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
    </CartStateContext>
  );
}

// Кнопка "додати" читає лише dispatch → не ре-рендериться на зміну кошика
function AddButton({ id }: { id: string }) {
  const dispatch = use(CartDispatchContext)!;
  return <button onClick={() => dispatch({ type: 'add', id })}>+</button>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span>Коли контекст перестає бути інструментом: багато різних шматків стану, потрібна селективна підписка на поле, часті оновлення з великим деревом споживачів — це вже стор із селекторами (розділ «🐻 Zustand»), а не набір контекстів.</span></div>`,
        },
      ],
    },
    {
      id: 'state-redux',
      title: '🔴 Redux — архітектура та middleware',
      interviewQuestions: [
        {
          question: 'У чому суть трьох принципів Redux (single source of truth, state is read-only, зміни лише через pure reducers), і чому reducer обов\'язково має бути чистою функцією?',
          answer: 'Один store на весь застосунок дає єдине джерело правди для дебагу й серіалізації; стан ніколи не мутується напряму, а замінюється новим об\'єктом через reducer — це вмикає time-travel debugging (можна відкотитись до будь-якого попереднього стану) і предиктивність (однаковий action + стан завжди дають однаковий результат). Reducer має бути <strong>чистою</strong> функцією (без side-effects, без мутацій вхідного стану, без <code>Math.random()</code>/<code>Date.now()</code> всередині) — інакше ламається порівняння через референс (<code>===</code>), на якому тримається memoization у <code>useSelector</code>/<code>React.memo</code>, і компоненти або не ре-рендеряться, коли треба, або ре-рендеряться зайве.',
        },
        {
          question: 'Навіщо Redux взагалі потрібен middleware, якщо store і так підтримує dispatch?',
          answer: 'Reducer зобов\'язаний лишатись синхронним і чистим, тож у нього не можна засунути виклик API. Middleware — це "прошарок" між <code>dispatch(action)</code> і reducer, який перехоплює action <em>до</em> того, як він туди дійде: там і виконуються side-effects (HTTP-запит, логування, аналітика), а в reducer передається вже звичайний plain-object action із готовими даними. Без middleware у store можна dispatch-нути лише plain object — не функцію і не Promise, тому thunk/saga в принципі не спрацювали б.',
        },
        {
          question: 'Чим redux-saga принципово відрізняється від redux-thunk у підході до асинхронності?',
          answer: 'Thunk — action creator повертає <strong>функцію</strong>, яка отримує <code>dispatch</code>/<code>getState</code> і імперативно керує async-логікою через <code>async</code>/<code>await</code> чи <code>.then()</code>, кожен thunk живе незалежно. Saga працює через <strong>generator-функції</strong> як окремий "watcher"-процес поруч зі store: замість того щоб виконувати ефект напряму, saga <em>описує</em> його декларативним об\'єктом-ефектом (<code>call</code>, <code>put</code>, <code>takeLatest</code>) — це дає вбудоване скасування запитів, оркестрацію кількох потоків (<code>race</code>, <code>all</code>) і легше тестування (перевіряєш, який ефект-об\'єкт згенеровано, не мокаючи реальний fetch).',
        },
        {
          question: 'Коли в реальному проєкті обирають redux-saga замість redux-thunk?',
          answer: 'Saga виправдана, коли потрібна оркестрація складних async-сценаріїв: автоскасування застарілого запиту при повторному вводі (<code>takeLatest</code>), debounce/throttle на action, узгодження кількох паралельних запитів (<code>all</code>/<code>race</code>), довготривалі процеси на кшталт WebSocket-підписок, retry з бекоффом. Якщо логіка — просто "дій → запит → dispatch результату", thunk простіший і достатній; ціна saga — крутіша крива входу (generators, ефекти-дескриптори замість звичайних промісів).',
        },
        {
          question: 'Що таке паттерн ducks для структурування Redux-проєкту і чим він відрізняється від класичної структури actions/reducers/types по окремих папках?',
          answer: 'Класична структура групує файли за <em>технічною роллю</em> — усі типи action в одній папці, усі reducers в іншій, тому для однієї фічі доводиться стрибати між 3+ файлами. Ducks — це структурування за <em>фічею</em>: типи action, action creators і reducer однієї фічі живуть в одному файлі, який експортує reducer за замовчуванням. Redux Toolkit фактично зробив ducks офіційним підходом — <code>createSlice</code> генерує action creators, action types і reducer з одного опису в одному файлі.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Redux — три принципи <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card"><h4>1. Single source of truth</h4><p>Увесь стан застосунку — в одному об'єкті (<code>store</code>). Спрощує дебаг, серіалізацію, SSR-гідратацію.</p></div>
    <div class="card"><h4>2. State is read-only</h4><p>Єдиний спосіб змінити стан — <code>dispatch(action)</code>, plain-об'єкт із полем <code>type</code>. Ніхто не мутує стан напряму.</p></div>
  </div>
  <div class="card" style="margin-top:8px"><h4>3. Зміни — лише через pure reducers</h4><p><code>(state, action) => newState</code> — чиста функція: не мутує <code>state</code>, а повертає новий об'єкт; однакові вхідні дані завжди дають однаковий результат.</p></div>
  <h3 class="topic">Односторонній потік даних</h3>
  <p><code>UI подія → dispatch(action) → middleware (опційно) → reducer → новий state → підписники (useSelector) ре-рендеряться</code>. Цей цикл — причина, чому Redux DevTools вміють time-travel debugging: кожен крок — знімок стану + action, що його спричинив.</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Vanilla Redux — reducer, actions, store (без Toolkit, щоб побачити фундамент)',
          code: `// actions.ts
type CounterAction =
  | { type: 'counter/increment' }
  | { type: 'counter/decrement' }
  | { type: 'counter/addBy'; payload: number };

// reducer.ts — чиста функція: не мутує state, повертає новий об'єкт
function counterReducer(state = { value: 0 }, action: CounterAction) {
  switch (action.type) {
    case 'counter/increment':
      return { value: state.value + 1 };
    case 'counter/decrement':
      return { value: state.value - 1 };
    case 'counter/addBy':
      return { value: state.value + action.payload };
    default:
      return state; // невідомий action — повернути state як є
  }
}

// store.ts
import { createStore } from 'redux';
const store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'counter/increment' }); // { value: 1 }`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Підключення до React — useSelector / useDispatch</h3>
  <p>Сучасний спосіб (з React-Redux 7.1+) — хуки замість HOC <code>connect(mapStateToProps, mapDispatchToProps)</code>. <code>useSelector</code> підписує компонент на зріз стану (ре-рендер лише якщо результат селектора змінився за <code>===</code>), <code>useDispatch</code> повертає функцію <code>dispatch</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// main.tsx
import { Provider } from 'react-redux';
<Provider store={store}><App /></Provider>

// Counter.tsx
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch({ type: 'counter/increment' })}>
      {value}
    </button>
  );
}
// useSelector з "вузьким" селектором — ре-рендер лише при зміні value,
// а не при будь-якій зміні всього store (та сама ідея, що й у Zustand-селекторах)`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Middleware — де живе асинхронність <span class="tag tag-pit">PITFALL</span></h3>
  <p>Reducer синхронний і чистий — у ньому не можна викликати API. Middleware перехоплює action між <code>dispatch</code> і reducer, тому саме там можна виконати побічний ефект <em>перед</em> тим, як у reducer прийде готовий plain-object action.</p>
  <div class="grid2">
    <div class="card green"><h4>redux-thunk</h4><p>Action creator повертає <strong>функцію</strong> <code>(dispatch, getState) =&gt; {'{'}...{'}'}</code>. Імперативний код на async/await. Простий, мінімум boilerplate, вбудований у Redux Toolkit за замовчуванням.</p></div>
    <div class="card"><h4>redux-saga</h4><p>Окремий generator-процес, що "слухає" actions і <em>декларативно описує</em> ефекти (<code>call</code>, <code>put</code>, <code>takeLatest</code>). Складніший, але дає скасування, оркестрацію, легше тестування без моків.</p></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'redux-thunk — асинхронний action creator',
          code: `// userActions.ts
function fetchUser(id: number) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({ type: 'user/loading' });
    try {
      const res = await fetch(\`/api/users/\${id}\`);
      const user = await res.json();
      dispatch({ type: 'user/loaded', payload: user });
    } catch (err) {
      dispatch({ type: 'user/error', payload: String(err) });
    }
  };
}

// Компонент: dispatch(fetchUser(1)) — thunk middleware розпізнає,
// що це функція (не plain object), і викликає її замість передачі в reducer`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'redux-saga — той самий сценарій декларативно',
          code: `import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchUserSaga(action: { type: string; payload: number }) {
  try {
    yield put({ type: 'user/loading' });
    const user = yield call(fetch, \`/api/users/\${action.payload}\`);
    yield put({ type: 'user/loaded', payload: yield call([user, 'json']) });
  } catch (err) {
    yield put({ type: 'user/error', payload: String(err) });
  }
}

function* rootSaga() {
  // takeLatest автоматично скасовує попередній fetchUserSaga,
  // якщо новий 'user/fetch' прилетів раніше, ніж завершився попередній —
  // цього немає "з коробки" у thunk-варіанті
  yield takeLatest('user/fetch', fetchUserSaga);
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Структурування проєкту — ducks vs Redux Toolkit</h3>
  <p><strong>Класична структура</strong> (Redux ≤3): окремі папки <code>actions/</code>, <code>reducers/</code>, <code>types/</code> — для однієї фічі стрибаєш між файлами. <strong>Ducks-паттерн</strong>: типи, action creators і reducer однієї фічі — в одному файлі. <strong>Redux Toolkit</strong> зробив ducks офіційним стандартом: <code>createSlice</code> генерує все з одного опису (детальний приклад RTK — у розділі Zustand нижче, як контраст підходів до стору).</p>
  <pre>src/features/
  counter/
    counterSlice.ts   ← actions + reducer + types в одному файлі (ducks)
  user/
    userSlice.ts
    userSaga.ts        ← якщо фіча має складну async-оркестрацію</pre>`,
        },
      ],
    },
    {
      id: 'state-zustand',
      title: '🐻 Zustand',
      interviewQuestions: [
        {
          question: 'Чим підхід Zustand до підписки на стан принципово відрізняється від React Context і чому це вирішує проблему зайвих ре-рендерів?',
          answer: 'Zustand використовує <code>useSyncExternalStore</code> із селекторами: компонент підписується на <em>конкретний зріз</em> стану (<code>useStore(s => s.user)</code>) і ре-рендериться лише коли саме цей зріз змінюється (порівняння через <code>Object.is</code> за замовчуванням), тоді як Context ре-рендерить усіх споживачів на будь-яку зміну значення провайдера незалежно від того, яка частина їм потрібна.',
        },
        {
          question: 'Які недоліки чи компроміси Zustand порівняно з Redux у великому продуктовому додатку?',
          answer: 'Zustand менш «structured out of the box» — немає нативного DevTools time-travel, middleware-екосистеми чи строгих конвенцій щодо actions/reducers (хоч є мідлвари, що це додають). У великих командах це може призвести до неузгоджених патернів роботи зі стором між різними частинами кодової бази, тоді як Redux нав\'язує єдиний, передбачуваний спосіб мутації стану через reducers.',
        },
        {
          question: `Навіщо потрібен partialize у persist-мідлварі Zustand?`,
          answer: `Без <code>partialize</code> у localStorage потрапляє весь store, включно з ефемерним UI-станом чи потенційно чутливими даними. <code>partialize</code> звужує серіалізацію до явно перелічених полів — свідомий вибір, що саме переживає перезавантаження сторінки.`,
        },
        {
          question: `Як звернутись до Zustand-стору поза React-компонентом, і навіщо це буває потрібно?`,
          answer: `<code>useBearStore.getState()</code>/<code>.setState()</code> читають і оновлюють store без хука і без підписки на ре-рендер — корисно у звичайних утилітах чи обробниках поза компонентами, де немає React render-циклу, але потрібен доступ до поточного стану.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що це <span class="tag tag-key">KEY</span></h3>
  <p><strong>Zustand</strong> — мінімалістичний state-manager (~1&nbsp;КБ). Один store створюється через <code>create()</code>, компоненти читають <em>зрізи</em> стану через хук-селектор (<code>useStore(s =&gt; s.x)</code>). Під капотом — <code>useSyncExternalStore</code> (розділ «📋 Повний каталог хуків»), тому store живе <strong>поза React-деревом</strong> і не потребує <code>Provider</code>.</p>
  <p>За позицією — між «тільки Context» і «повний Redux»: помітно менше boilerplate, ніж у Redux, і гранулярніші підписки, ніж у Context (немає ре-рендеру всіх споживачів на будь-яку зміну).</p>
  <div class="alert good"><span class="icon">✅</span><span><strong>Коли брати:</strong> глобальний <em>клієнтський</em> стан, який ділять далекі компоненти й для якого Context ре-рендерить забагато — тема, кошик, авторизація, крос-компонентний UI-стан. <strong>Не</strong> для серверного кешу (дані з API) — це TanStack Query (розділ нижче).</span></div>
  <h3 class="topic">Базовий store</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { create } from 'zustand';

interface BearState {
  bears: number;
  addBear: () => void;
  reset: () => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  addBear: () => set(state => ({ bears: state.bears + 1 })),
  reset: () => set({ bears: 0 }),
}));`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Selectors — уникай зайвих ре-рендерів <span class="tag tag-key">KEY</span></h3><div class="grid2">
    <pre><span class="cmt">// ❌ Ре-рендер при БУДЬ-ЯКІЙ зміні store</span>
<span class="kw">const</span> store = <span class="fn">useBearStore</span>();
<span class="kw">const</span> bears = store.bears;</pre>
    <pre><span class="cmt">// ✅ Ре-рендер тільки при зміні bears</span>
<span class="kw">const</span> bears = <span class="fn">useBearStore</span>(state =&gt; state.bears);

<span class="cmt">// Кілька полів — useShallow</span>
<span class="kw">import</span> { useShallow } <span class="kw">from</span> <span class="str">'zustand/react/shallow'</span>;
<span class="kw">const</span> { bears, fish } = <span class="fn">useBearStore</span>(<span class="fn">useShallow</span>(
  state =&gt; ({ bears: state.bears, fish: state.fish })
));</pre>
  </div>
  <h3 class="topic">Zustand vs Context <span class="tag tag-key">KEY</span></h3><div class="grid2">
    <div class="card red"><h4>❌ Context для часто змінних даних</h4><p>Кожна зміна = ре-рендер ВСІХ споживачів, навіть якщо вони не використовують змінену частину.</p></div>
    <div class="card green"><h4>✅ Zustand (або Jotai/Recoil)</h4><p>Гранулярні selectors поза React-деревом рендерингу контексту. Ре-рендер тільки якщо вибрана частина state справді змінилась.</p></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Slices pattern — великий store, розбитий на частини
// userSlice.ts
export const createUserSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});
// store.ts
export const useStore = create()((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args),
}));

// Middleware
import { devtools, persist, immer } from 'zustand/middleware';
const useStore = create(
  devtools(              // Redux DevTools
    persist(              // localStorage
      immer((set) => ({   // мутабельні апдейти під капотом — immutable назовні
        items: [],
        addItem: (item) => set(state => { state.items.push(item) }),
      })),
      { name: 'my-store' }
    )
  )
);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">partialize — обирай, що зберігати в localStorage <span class="tag tag-key">KEY</span></h3>
  <p>Мідлвар <code>persist</code> за замовчуванням серіалізує <strong>увесь</strong> store. <code>partialize</code> звужує це до вибраних полів — не персисти токени/секрети чи ефемерний UI-стан.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      ui: { isDrawerOpen: false }, // ефемерний UI-стан — не варто персистити
      addItem: (item) => set(state => ({ items: [...state.items, item] })),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }), // тільки items у localStorage
      // ⚠️ ніколи не персисти токени/паролі/PII без явного шифрування
    }
  )
);

// getState()/setState() — доступ до store ПОЗА React-деревом
// (утиліти, non-component код, обробники поза компонентами)
export function getCartTotal() {
  const items = useCartStore.getState().items; // без хука, без ре-рендеру
  return items.reduce((sum, i) => sum + i.price, 0);
}

// підписка поза React (напр. аналітика на кожну зміну)
useCartStore.subscribe((state) => {
  analytics.track('cart_changed', { count: state.items.length });
});`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Redux Toolkit — контраст <span class="tag tag-key">KEY</span></h3>
  <p>RTK — офіційний, «opinionated» спосіб писати Redux: <code>createSlice</code> генерує action creators і reducer з одного опису, <code>configureStore</code> підключає DevTools і корисні middleware з коробки. Дає те, чого Zustand навмисно не нав'язує — сувору структуру actions/reducers і потужний time-travel debugging.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as CartItem[] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // immer під капотом — можна "мутувати"
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

// RTK Query — аналог TanStack Query для серверного стану, з тим самим store
// createApi({ endpoints: (builder) => ({ getUsers: builder.query(...) }) })`,
        },
      ],
    },
    {
      id: 'state-tanstack-query',
      title: '🔄 TanStack Query',
      interviewQuestions: [
        {
          question: 'Чому TanStack Query називають «server state manager», а не звичайним data-fetching інструментом, і чим server state відрізняється від client state?',
          answer: 'Server state належить джерелу поза застосунком, асинхронний, може застаріти без відома клієнта і поділяється між кількома компонентами/вкладками. TanStack Query бере на себе кешування, дедуплікацію одночасних запитів, фонове оновлення (refetch on focus/reconnect), інвалідацію та retry — тобто вирішує проблеми, яких немає у звичайного client state (useState), де дані завжди «свіжі», бо ти сам ними керуєш.',
        },
        {
          question: 'Як TanStack Query вирішує проблему «водоспаду запитів» (waterfall) і гонки застарілих даних (race condition) при швидкій зміні параметрів запиту?',
          answer: 'Кешування за <code>queryKey</code> дозволяє паралельно ініціювати незалежні запити замість послідовних <code>await</code>-ланцюжків. Race condition при швидкій зміні параметрів (наприклад, пошуковий інпут) вирішується автоматично: бібліотека ігнорує відповідь застарілого запиту, якщо <code>queryKey</code> вже змінився і стартував новий запит — це знімає з розробника ручне відстеження «чи цей запит ще актуальний».',
        },
        {
          question: `Чим кеш TanStack Query відрізняється від Redux/Zustand стору?`,
          answer: `це не клієнтський стан, а кеш серверних даних зі своїм життєвим циклом (stale/fresh, invalidate, refetch) — тримати серверні дані у Zustand означає вручну реалізовувати те, що Query дає з коробки.`,
        },
        {
          question: `Що робить staleTime: 0 за замовчуванням?`,
          answer: `кожен новий mount/фокус вікна триггерить background refetch, навіть якщо дані в кеші є — UI показує кешовані одразу, потім оновлює.`,
        },
        {
          question: `Чим isLoading відрізняється від isFetching у useQuery, і яку UI-помилку робить розробник, якщо їх плутає?`,
          answer: `<code>isLoading</code> — true лише коли для цього <code>queryKey</code> ще немає жодних кешованих даних (перший запит). <code>isFetching</code> — true при будь-якому запиті, включно з тихими фоновими refetch, коли застарілі дані вже показані. Типова помилка — прив'язати повноекранний спінер до <code>isFetching</code>: він тоді блимає навіть коли дані вже на екрані.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Філософія: Server State ≠ Client State <span class="tag tag-key">KEY</span></h3><div class="grid2">
    <div class="card red"><h4>❌ Anti-pattern (useEffect + useState)</h4>
      <pre style="font-size:10.5px"><span class="fn">useEffect</span>(() =&gt; {
  <span class="fn">setLoading</span>(<span class="kw">true</span>);
  <span class="fn">fetch</span>(<span class="str">'/api/users'</span>)
    .<span class="fn">then</span>(r =&gt; r.<span class="fn">json</span>())
    .<span class="fn">then</span>(setUsers)
    .<span class="fn">catch</span>(setError)
    .<span class="fn">finally</span>(() =&gt; <span class="fn">setLoading</span>(<span class="kw">false</span>));
}, []);
<span class="cmt">// немає кешу, дедуплікації, інвалідації, retry, refetch-on-focus</span></pre>
    </div>
    <div class="card green"><h4>✅ useQuery</h4>
      <pre style="font-size:10.5px"><span class="kw">const</span> { data, isLoading, error, refetch } = <span class="fn">useQuery</span>({
  queryKey: [<span class="str">'users'</span>],
  queryFn: () =&gt; <span class="fn">fetchUsers</span>(),
  staleTime: <span class="num">5</span> * <span class="num">60</span> * <span class="num">1000</span>,  <span class="cmt">// 5 хв</span>
  gcTime: <span class="num">10</span> * <span class="num">60</span> * <span class="num">1000</span>,   <span class="cmt">// раніше cacheTime</span>
});</pre>
    </div>
  </div>
  <h3 class="topic">useMutation + Optimistic Updates <span class="tag tag-key">KEY</span></h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `const mutation = useMutation({
  mutationFn: (todo: Todo) => createTodo(todo),
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previous = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], old => [...old, newTodo]);  // optimistic!
    return { previous };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previous);  // rollback
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
});`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">queryKey — ієрархія</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `queryKey: ['users']                          // список
queryKey: ['users', userId]                   // один юзер
queryKey: ['users', userId, 'posts']          // пости юзера
queryKey: ['users', { page, filter, sort }]   // з параметрами

// Invalidate по префіксу — усі "users"-запити разом:
queryClient.invalidateQueries({ queryKey: ['users'] });`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Корисні опції</h3><div class="table-wrap">
    <table>
      <tr><th>Опція</th><th>Default</th><th>Що робить</th></tr>
      <tr><td><code>staleTime</code></td><td>0</td><td>Час до "застарівання". 0 = refetch при фокусі/mount</td></tr>
      <tr><td><code>gcTime</code></td><td>5 хв</td><td>Час до видалення з кешу після відписки останнього спостерігача</td></tr>
      <tr><td><code>retry</code></td><td>3</td><td>К-сть retry при помилці</td></tr>
      <tr><td><code>refetchOnWindowFocus</code></td><td>true</td><td>Refetch при поверненні на вкладку</td></tr>
      <tr><td><code>enabled</code></td><td>true</td><td>false = не виконувати (чекати на умову — залежні запити)</td></tr>
      <tr><td><code>select</code></td><td>—</td><td>Трансформація data перед поверненням у компонент</td></tr>
      <tr><td><code>placeholderData</code></td><td>—</td><td>Дані-заглушка поки завантажується (keepPreviousData — без "миготіння" при пагінації)</td></tr>
    </table>
  </div>
  <h3 class="topic">isLoading vs isFetching <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card red"><h4>isLoading</h4><p><code>true</code> лише під час <strong>першого</strong> запиту, коли в кеші взагалі немає даних — саме тоді доречний повний skeleton/спінер на місці контенту.</p></div>
    <div class="card green"><h4>isFetching</h4><p><code>true</code> при <strong>БУДЬ-ЯКОМУ</strong> запиті, включно з тихим фоновим refetch (focus, reconnect, invalidate) — старі/кешовані дані вже показані, тому доречний лише невеликий індикатор "оновлюється", а не повноекранний спінер.</p></div>
  </div>
  `,
        },
      ],
    },
    {
      id: 'state-rxjs',
      title: '🌊 RxJS у React',
      interviewQuestions: [
        {
          question: 'Навіщо взагалі використовувати RxJS у React, якщо є Promises/async-await?',
          answer: 'RxJS моделює <strong>потоки подій у часі</strong> (кліки, WebSocket-повідомлення, введення тексту), а не одноразові асинхронні значення, як Promise. Оператори (<code>debounceTime</code>, <code>switchMap</code>, <code>combineLatest</code>) дають декларативний спосіб комбінувати, скасовувати й трансформувати послідовності подій — задачі, які на голому <code>async/await</code> вимагали б ручного керування таймерами й прапорцями скасування.',
        },
        {
          question: 'Як правильно інтегрувати RxJS Observable зі стандартним React-рендер-циклом, щоб уникнути витоків підписки?',
          answer: 'Підписку створюють у <code>useEffect</code> і обов\'язково повертають функцію <code>unsubscribe()</code> як cleanup — інакше при розмонтуванні компонента підписка продовжить жити й намагатись оновити стан вже неіснуючого компонента. Для конвертації потоку в React-сумісний стан часто використовують <code>useSyncExternalStore</code> замість ручного <code>useState</code> + <code>useEffect</code>, щоб коректно працювати з concurrent-рендерингом.',
        },
        {
          question: 'Чим <code>switchMap</code> відрізняється від <code>mergeMap</code>/<code>concatMap</code>, і чому вибір неправильного оператора — типова причина race condition у продакшні?',
          answer: '<code>switchMap</code> скасовує попередній внутрішній потік при появі нового значення з джерела — ідеально для пошуку-по-вводу, де потрібна лише остання відповідь. <code>mergeMap</code> запускає всі внутрішні потоки паралельно без скасування, <code>concatMap</code> — послідовно, чекаючи завершення попереднього. Використання <code>mergeMap</code> замість <code>switchMap</code> для запитів, що залежать від останнього вводу користувача, може призвести до того, що застаріла відповідь прийде <em>після</em> свіжої й перезапише її.',
        },
        {
          question: 'Чим Observable принципово відрізняється від Promise?',
          answer: 'Observable — лінивий (не починає роботу до підписки) і може видати 0 і більше значень з часом; скасовується через <code>unsubscribe()</code>. Promise — жадібний (виконується одразу після створення), завжди рівно одне значення, нативно не скасовується.',
        },
        {
          question: 'Що має повертати <code>catchError</code>, і чому місце, де він стоїть у <code>pipe</code>, критично важливе?',
          answer: '<code>catchError</code> МУСИТЬ повернути Observable — він стає продовженням потоку після помилки: <code>of(fallback)</code> (відновитись значенням), <code>EMPTY</code> (тихо завершити) або <code>throwError(() => err)</code> (перекинути далі). Місце має значення: <code>catchError</code> <em>всередині</em> <code>switchMap</code> ловить помилку лише внутрішнього запиту — зовнішній потік (напр. поле пошуку) живе далі; <code>catchError</code> <em>в кінці</em> pipe ловить будь-що, але після нього весь потік мертвий.',
        },
        {
          question: 'Чим Hot Observable відрізняється від Cold, і як <code>share()</code> пов\'язаний з цим?',
          answer: 'Cold Observable запускає власне виконання на кожну підписку (типово для HTTP-запитів через <code>interval()</code>-подібні джерела) — два підписники отримують два незалежні виконання. Hot Observable — одне спільне виконання, яке всі підписники ділять (типово для подій, напр. <code>fromEvent</code>). <code>share()</code> перетворює cold-джерело на hot, щоб кілька підписників не спричиняли дублювання роботи (наприклад, дублікати HTTP-запитів).',
        },
        {
          question: 'Чим BehaviorSubject відрізняється від звичайного Subject?',
          answer: 'Звичайний Subject нічого не памʼятає — пізній підписник отримує лише майбутні емісії. BehaviorSubject завжди зберігає останнє значення (потребує початкового значення при створенні) і одразу видає його новому підписнику — тому природно підходить для представлення поточного стану (напр. авторизований користувач, тема).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Коли потоки кращі за useEffect <span class="tag tag-key">KEY</span></h3>
  <p>Для одноразового fetch — <code>useEffect</code>/TanStack Query достатньо. RxJS виправдовує себе, коли є <strong>кілька джерел подій у часі</strong>, які треба комбінувати, дебаунсити, скасовувати, перемикати: presence-статуси, debounced search з відміною попереднього запиту, WebSocket-потоки, drag&amp;drop-жести.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Debounced search з автоматичною відміною застарілого запиту
const search$ = new Subject<string>();

const results$ = search$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => query ? searchApi(query) : of([])),
  // switchMap сам скасовує попередній HTTP-запит при новому query —
  // те, що вручну довелось би робити через AbortController у useEffect
);

// у компоненті — через useObservable custom hook (Block 2)
const results = useObservable(results$, []);
<input onChange={e => search$.next(e.target.value)} />`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Observable vs Promise</h3>
  <p>Observable — потік подій у часі, ліниво (не починає до підписки), може видати 0+ значень. Promise — одне значення, запускається одразу.</p>
  <div class="table-wrap">
    <table>
      <tr><th>Feature</th><th>Observable</th><th>Promise</th></tr>
      <tr><td>Lazy/Eager</td><td>Lazy (subscribe запускає)</td><td>Eager (виконується одразу)</td></tr>
      <tr><td>Single/Multiple</td><td>Багато значень</td><td>Одне значення</td></tr>
      <tr><td>Cancellation</td><td>unsubscribe()</td><td>Нема нативної підтримки</td></tr>
      <tr><td>Sync/Async</td><td>І те, і те</td><td>Завжди async</td></tr>
      <tr><td>Оператори</td><td>Багата екосистема</td><td>then/catch — обмежено</td></tr>
    </table>
  </div>
  <h3 class="topic">Hot vs Cold + share()</h3>
  <p>Cold Observable — кожен підписник отримує власний потік (нові HTTP-запити). Hot Observable — один потік для всіх підписників. <code>share()</code> перетворює Cold на Hot — щоб уникнути дублювання запитів.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Cold Observable — кожен subscribe запускає власне виконання
const cold$ = interval(1000); // кожен subscribe рестартує лічильник

cold$.subscribe(v => console.log('A', v)); // A: 0, 1, 2...
cold$.subscribe(v => console.log('B', v)); // B: 0, 1, 2... (окремо)

// Hot Observable — одне виконання, всі підписники ділять його
const hot$ = fromEvent(button, 'click');
hot$.subscribe(() => console.log('A')); // обидва бачать той самий клік
hot$.subscribe(() => console.log('B'));

// Перетворити cold на hot
const shared$ = interval(1000).pipe(share()); // Multicast`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Flattening Operators — Decision Matrix <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Оператор</th><th>Поведінка</th><th>Use Case</th><th>Приклад</th></tr>
      <tr><td>switchMap</td><td>Скасовує попередній, емітить найновіший внутрішній</td><td>Пошук, автокомпліт, зміна маршруту</td><td>input → API search</td></tr>
      <tr><td>mergeMap</td><td>Паралельні внутрішні Observable</td><td>Завантаження файлів, конкурентні запити</td><td>items → паралельні POST</td></tr>
      <tr><td>concatMap</td><td>Черга (по одному)</td><td>Послідовні операції, важливий порядок</td><td>черга form-submit</td></tr>
      <tr><td>exhaustMap</td><td>Ігнорує нове, поки виконується</td><td>Кнопка логіну (запобігти double-submit)</td><td>click → POST (ігнорувати кліки під час запиту)</td></tr>
    </table>
  </div>
  <h3 class="topic">Subject Variants</h3>
  <p>Subject — Observable+Observer одночасно. BehaviorSubject зберігає останнє значення. ReplaySubject буферизує N значень. AsyncSubject видає лише останнє при завершенні.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Subject — розсилає всім підписникам
const subject = new Subject<string>();
subject.next('hello');
subject.subscribe(v => console.log(v)); // пізній підписник: нічого (hot)

// BehaviorSubject — пам'ятає останнє значення
const behavior = new BehaviorSubject('initial');
behavior.next('new');
behavior.subscribe(v => console.log(v)); // 'new' (пізній підписник отримує останнє)

// ReplaySubject — відтворює N значень
const replay = new ReplaySubject(3);
replay.next(1); replay.next(2); replay.next(3); replay.next(4);
replay.subscribe(v => console.log(v)); // 2, 3, 4 (останні 3)

// AsyncSubject — лише останнє значення при complete
const asyncSubj = new AsyncSubject();
asyncSubj.next(1); asyncSubj.next(2); asyncSubj.complete();
asyncSubj.subscribe(v => console.log(v)); // 2`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Оператори — що робить кожен <span class="tag tag-key">KEY</span></h3>
  <p>Довідник найуживаніших операторів. Деталі flattening (<code>switchMap</code>/<code>mergeMap</code>/<code>concatMap</code>/<code>exhaustMap</code>) — вище.</p>
  <p><strong>Creation — створюють Observable:</strong></p>
  <div class="table-wrap">
    <table>
      <tr><th>Оператор</th><th>Що робить</th></tr>
      <tr><td><code>of(a, b)</code></td><td>Емітить передані значення по черзі, тоді complete</td></tr>
      <tr><td><code>from(arr | promise | iterable)</code></td><td>Перетворює масив/Promise/ітерабельне на потік</td></tr>
      <tr><td><code>fromEvent(el, 'click')</code></td><td>Потік DOM-подій (hot)</td></tr>
      <tr><td><code>interval(ms)</code> / <code>timer(delay, period)</code></td><td>Числа за таймером; timer — із затримкою старту</td></tr>
      <tr><td><code>EMPTY</code></td><td>Одразу complete без жодного значення</td></tr>
      <tr><td><code>throwError(() => err)</code></td><td>Потік, що одразу падає з помилкою</td></tr>
      <tr><td><code>defer(fn)</code></td><td>Створює Observable ліниво — на кожну підписку заново</td></tr>
    </table>
  </div>
  <p><strong>Transformation — змінюють значення:</strong></p>
  <div class="table-wrap">
    <table>
      <tr><th>Оператор</th><th>Що робить</th></tr>
      <tr><td><code>map(fn)</code></td><td>Трансформує кожне значення</td></tr>
      <tr><td><code>scan(fn, seed)</code></td><td>Як reduce, але емітить проміжний акумулятор на кожному кроці</td></tr>
      <tr><td><code>reduce(fn, seed)</code></td><td>Акумулює й емітить ОДИН результат при complete</td></tr>
      <tr><td><code>toArray()</code></td><td>Збирає всі значення в масив (при complete)</td></tr>
    </table>
  </div>
  <p><strong>Filtering — пропускають/відкидають:</strong></p>
  <div class="table-wrap">
    <table>
      <tr><th>Оператор</th><th>Що робить</th></tr>
      <tr><td><code>filter(pred)</code></td><td>Пропускає лише ті, що проходять умову</td></tr>
      <tr><td><code>take(n)</code> / <code>first()</code> / <code>last()</code></td><td>Перші n / перше / останнє, тоді complete</td></tr>
      <tr><td><code>takeUntil(notifier$)</code></td><td>Емітить, доки notifier не спрацює (класична відписка)</td></tr>
      <tr><td><code>skip(n)</code></td><td>Пропускає перші n значень</td></tr>
      <tr><td><code>debounceTime(ms)</code></td><td>Емітить лише після паузи (search-input)</td></tr>
      <tr><td><code>throttleTime(ms)</code></td><td>Не частіше, ніж раз на ms</td></tr>
      <tr><td><code>distinctUntilChanged()</code></td><td>Ігнорує підряд однакові значення</td></tr>
    </table>
  </div>
  <p><strong>Combination — комбінують кілька потоків:</strong></p>
  <div class="table-wrap">
    <table>
      <tr><th>Оператор</th><th>Що робить</th></tr>
      <tr><td><code>combineLatest([a$, b$])</code></td><td>Останні значення всіх — на будь-яку зміну</td></tr>
      <tr><td><code>forkJoin([a$, b$])</code></td><td>Останні значення, але лише коли ВСІ complete (як Promise.all)</td></tr>
      <tr><td><code>merge(a$, b$)</code></td><td>Зливає потоки паралельно, у порядку надходження</td></tr>
      <tr><td><code>concat(a$, b$)</code></td><td>Послідовно: b$ лише після complete a$</td></tr>
      <tr><td><code>zip(a$, b$)</code></td><td>Парує значення за індексом</td></tr>
      <tr><td><code>withLatestFrom(b$)</code></td><td>На кожен a$ додає ПОТОЧНЕ b$</td></tr>
      <tr><td><code>startWith(v)</code></td><td>Емітить v першим, до решти</td></tr>
    </table>
  </div>
  <p><strong>Utility & Multicasting:</strong></p>
  <div class="table-wrap">
    <table>
      <tr><th>Оператор</th><th>Що робить</th></tr>
      <tr><td><code>tap(fn)</code></td><td>Side-effect (лог, дебаг) — не змінює значення</td></tr>
      <tr><td><code>delay(ms)</code></td><td>Затримує всі емісії</td></tr>
      <tr><td><code>finalize(fn)</code></td><td>Викликається при complete АБО error (cleanup, spinner off)</td></tr>
      <tr><td><code>timeout(ms)</code></td><td>Падає з помилкою, якщо немає емісії за ms</td></tr>
      <tr><td><code>share()</code> / <code>shareReplay(n)</code></td><td>cold → hot; shareReplay кешує n останніх для нових підписників</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Error Handling — catchError, retry, throwError <span class="tag tag-key">KEY</span></h3>
  <p>У потоці помилка — <em>термінальна</em> подія: після <code>error</code> Observable завершується й більше нічого не емітить. <code>catchError</code> перехоплює її й дає відновитись.</p>
  <ul class="list">
    <li><strong>catchError МУСИТЬ повернути Observable</strong> — він стає продовженням потоку після помилки. Варіанти: <code>of(fallback)</code> (відновитись значенням), <code>EMPTY</code> (тихо завершити), <code>throwError(() => err)</code> (перекинути далі).</li>
    <li><strong>Місце важливе.</strong> <code>catchError</code> <em>всередині</em> <code>switchMap</code> ловить помилку лише внутрішнього запиту — зовнішній потік (поле пошуку) живе далі. <code>catchError</code> <em>в кінці</em> pipe ловить будь-що, але після нього весь потік мертвий.</li>
    <li><strong>retry</strong> перепідписується на джерело при помилці: <code>retry(3)</code> або <code>retry({ count, delay })</code> для backoff.</li>
    <li><strong>finalize</strong> спрацьовує і на complete, і на error — ідеально для <code>loading = false</code>.</li>
    <li>У фреймворках з вбудованим HTTP-клієнтом (напр. Angular <code>HttpClient</code>) помилка часто обгортається у свій тип — остання лінія оборони тоді глобальний error-handler або interceptor.</li>
  </ul>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { of, EMPTY, throwError, timer } from 'rxjs';
import { catchError, retry, switchMap, finalize } from 'rxjs/operators';

// 1) Відновлення значенням — потік живе далі
fetchUser().pipe(
  catchError(err => {
    console.error(err);
    return of(GUEST_USER); // ✅ fallback; тип має збігатися з потоком
  })
);

// 2) Тихо проковтнути (нічого не емітити) → EMPTY
source$.pipe(catchError(() => EMPTY));

// 3) Перекинути далі (обгорнути помилку)
source$.pipe(
  catchError(err => throwError(() => new AppError('load failed', err)))
);

// 4) Місце catchError: ВСЕРЕДИНІ switchMap — search$ не «вмирає»
search$.pipe(
  switchMap(q =>
    searchApi(q).pipe(
      catchError(() => of([])) // помилка запиту → порожній результат, стрім живий
    )
  )
);
// ❌ Якби catchError стояв у кінці pipe — перша помилка вбила б увесь search$

// 5) Retry з backoff + гарантований cleanup
fetchData().pipe(
  retry({ count: 3, delay: (_err, i) => timer(2 ** i * 500) }), // 0.5s, 1s, 2s
  catchError(() => of(null)),
  finalize(() => setLoading(false)) // і на успіх, і на помилку
);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">forkJoin замість Promise.all <span class="tag tag-key">KEY</span></h3>
  <p><code>forkJoin({ a: a$, b: b$ })</code> чекає, поки <em>всі</em> джерела завершаться (<code>complete</code>), і одноразово емітить останні значення кожного — так само, як <code>Promise.all([a, b])</code> чекає всі проміси.</p>
  <div class="grid2">
    <div class="card blue"><h4>Promise.all</h4><p>Приймає масив Promise. Один reject → весь <code>Promise.all</code> одразу reject.</p></div>
    <div class="card purple"><h4>forkJoin</h4><p>Приймає масив/об'єкт Observable. Джерело, що НЕ завершується (напр. <code>interval()</code> без <code>take</code>, або <code>BehaviorSubject</code>), «підвішує» forkJoin назавжди — complete критичний.</p></div>
  </div>
  <div class="alert alert-bad"><strong>Типова пастка:</strong> <code>forkJoin</code> із <code>BehaviorSubject</code>/нескінченним потоком ніколи не емітить, бо той ніколи не complete. Додай <code>take(1)</code> до такого джерела, або візьми <code>combineLatest</code>, якщо потрібні саме поточні значення без очікування complete.</div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// forkJoin — паралельно, чекає ВСІХ, як Promise.all
forkJoin({
  profile: getProfile(),
  settings: getSettings(),
  perms: getPermissions(),
}).subscribe(({ profile, settings, perms }) => {
  // усі три готові одночасно
});

// Еквівалент на Promise.all
const [profile, settings, perms] = await Promise.all([
  fetch('/api/profile').then(r => r.json()),
  fetch('/api/settings').then(r => r.json()),
  fetch('/api/permissions').then(r => r.json()),
]);

// ❌ Пастка: джерело без complete підвішує forkJoin
forkJoin({
  user: userSubject,        // BehaviorSubject — ніколи не complete!
  data: getData(),
}).subscribe(() => {}); // ніколи не спрацює

// ✅ Фікс — гарантувати complete
forkJoin({
  user: userSubject.pipe(take(1)),
  data: getData(),
}).subscribe(() => {});`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">✅</span><span>Правило вибору: один асинхронний запит, залежний від пропу/id → <code>useEffect</code>/Query. Потік подій у часі з комбінуванням/скасуванням/дебаунсом → RxJS у custom hook.</span></div>`,
        },
      ],
    },
    /* ============================= BLOCK 5 — PATTERNS ============================= */
    {
      id: 'patterns',
      title: '🧩 Patterns',
      interviewQuestions: [
        {
          question: 'Чим Compound Components відрізняються від звичайної композиції через children, і коли варто обрати саме цей патерн?',
          answer: 'Compound Components (наприклад, <code>&lt;Tabs&gt;&lt;Tabs.List&gt;&lt;Tabs.Panel&gt;</code>) діляться неявним станом через Context між батьківським та дочірніми компонентами, зберігаючи гнучкий, декларативний API без передачі десятків props вручну. Патерн виправданий для UI-«сімей» компонентів, де порядок/набір дочірніх елементів варіюється (акордеони, таби, меню), але є зайвим для простих, самодостатніх компонентів.',
        },
        {
          question: 'Чим Render Props відрізняється від сучасного підходу через custom hooks для повторного використання логіки, і чому хуки здебільшого витіснили цей патерн?',
          answer: 'Render Props передає функцію-рендерер як prop (<code>&lt;DataProvider render={data =&gt; ...}&gt;</code>), щоб надати доступ до внутрішнього стану провайдера — але це додає рівень вкладеності в дереві компонентів («wrapper hell» при комбінуванні кількох). Custom hooks дають ту саму повторно використовувану логіку без обгортки в дереві — просто виклик функції всередині компонента, тому Render Props сьогодні застосовують рідко, переважно в legacy-коді або бібліотеках із до-хукової епохи.',
        },
        {
          question: `Чому немає хука для Error Boundary?`,
          answer: `потребує lifecycle-методів рендер-фази (getDerivedStateFromError), яких у функціональній моделі хуків немає — рендер компонента не може "зловити" помилку самого себе.`,
        },
        {
          question: `Чому 'boolean-prop proliferation' вважають антипатерном компонентного API?`,
          answer: `Кожен новий незалежний boolean/enum-проп подвоює (або більше) кількість комбінацій, які компонент теоретично повинен коректно обробити, хоча реально підтримується лише невелика підмножина. Композиція (окремі спеціалізовані компоненти) або явний <code>variant</code>-union звужують API до дійсно валідних, протестованих станів.`,
        },
        {
          question: `Коли обрати іменовані слоти-пропи (<code>header</code>, <code>sidebar</code>) замість одного <code>children</code>, і чому <code>React.cloneElement</code> — поганий вибір для передачі даних дітям?`,
          answer: `Слоти-пропи типу <code>React.ReactNode</code> потрібні, коли в компоненті кілька незалежних «дірок» для вмісту — <code>children</code> тоді довелося б розбирати за позицією або типом. <code>cloneElement</code>, щоб «доштовхнути» пропи в <code>children</code>, крихкий (залежить від точної форми дитини), погано типізується і ламається при обгортанні дитини у фрагмент/іншій компонент. Для спільного стану — Context (compound components), для параметризованого рендеру — render-prop через <code>children</code>-функцію.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Composition over inheritance <span class="tag tag-key">KEY</span></h3>
  <p>React не має класичного механізму наслідування компонентів — і не має бути. Замість "Button extends BaseButton" — компонент приймає <code>children</code> або спеціалізовані пропи-слоти. <strong>Compound components</strong> — набір компонентів, що діляться неявним станом через Context, і разом утворюють один "віджет".</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Compound components — спільний стан через Context, гнучкий склад ззовні
const TabsContext = createContext<{ active: string; setActive: (id: string) => void } | null>(null);

function Tabs({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}
Tabs.Tab = function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return <button onClick={() => ctx.setActive(id)} data-active={ctx.active === id}>{children}</button>;
};
// <Tabs defaultTab="a"><Tabs.Tab id="a">A</Tabs.Tab><Tabs.Tab id="b">B</Tabs.Tab></Tabs>
// споживач сам вирішує порядок/кількість табів — компонент не "знає" про них наперед`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Слоти через пропи-<code>ReactNode</code> <span class="tag tag-key">KEY</span></h3>
  <p>Коли компонент має кілька «дірок» для вмісту (хедер, футер, бічна панель), не тулиш усе в <code>children</code> — приймаєш кілька пропів типу <code>React.ReactNode</code>. Споживач передає готовий JSX, компонент лише розставляє його в розмітці.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Слоти — кілька іменованих "дірок" замість одного children
function Page({ header, sidebar, children }: {
  header: React.ReactNode; sidebar: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
// <Page header={<Logo />} sidebar={<Nav />}><Article /></Page>

// ❌ Анти-патерн: React.cloneElement, щоб "доштовхнути" пропи в children —
//    крихко (залежить від форми дитини), погано типізується.
// ✅ Замість цього — Context (compound components вище) або render-prop через children:
function Toggle({ children }: { children: (on: boolean, toggle: () => void) => React.ReactNode }) {
  const [on, setOn] = useState(false);
  return <>{children(on, () => setOn(v => !v))}</>;
}

// Provider-компонент як патерн — інкапсулює createContext + стан в одному місці
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext value={value}>{children}</ThemeContext>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Легасі-патерни — одним абзацом</h3>
  <p><strong>HOC</strong> (<code>withAuth(Component)</code>) і <strong>render props</strong> вирішували «перевикористати логіку без наслідування» до хуків. Custom hooks замінили ~95% застосувань — та сама логіка без обгортки в дереві й без «wrapper hell». <strong>Container / Presentational</strong>: логіку тепер виносять у custom hook, а не в окремий компонент-обгортку. У новому коді не пишуться — лише читаються в легасі.</p>
  <p><strong>Controlled vs Uncontrolled inputs</strong> — окремий детальний розділ "Controlled vs Uncontrolled Inputs" нижче (хто насправді володіє значенням, ref, FormData, verdict).</p>
  <h3 class="topic">Error Boundary <span class="tag tag-pit">PITFALL</span></h3>
  <p>Єдиний випадок, де досі потрібен клас: хука-еквівалента <code>getDerivedStateFromError</code> немає. На практиці беруть <code>react-error-boundary</code>. Ловить помилки рендеру піддерева <strong>нижче себе</strong> — не ловить помилки в обробниках подій, асинхронному коді чи самому Error Boundary.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary
  fallback={<ErrorPage />}
  onError={(error, info) => logToSentry(error, info)}
>
  <RiskyWidget />
</ErrorBoundary>

// ⚠️ НЕ ловить: помилки в onClick/onChange (звичайний try/catch там),
// помилки в асинхронному коді (fetch .catch()), SSR-помилки.`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Уникай boolean-prop proliferation <span class="tag tag-pit">PITFALL</span></h3>
  <p>Коли компонент накопичує дедалі більше незалежних boolean/enum-пропів (<code>size</code>, <code>variant</code>, <code>outlined</code>, <code>rounded</code>, <code>disabled</code>...), кількість можливих комбінацій росте експоненційно — багато з них ніхто не тестував і не мав на увазі як валідний стан. Композиція (окремі компоненти або явний <code>variant</code>-union замість стосу boolean'ів) звужує API до дійсно підтримуваних варіантів.</p>
  <div class="grid2">
    <div class="card red"><h4>❌ Стос boolean-пропів</h4>
      <pre><span class="jsx">&lt;Button</span>
  size=<span class="str">"lg"</span>
  variant=<span class="str">"primary"</span>
  outlined
  rounded
  disabled={isLoading}
<span class="jsx">/&gt;</span>
<span class="cmt">// outlined + variant="primary" + rounded — валідна комбінація?</span>
<span class="cmt">// компонент всередині мусить розрулювати всі перестановки</span></pre>
    </div>
    <div class="card green"><h4>✅ Композиція / явний variant</h4>
      <pre><span class="jsx">&lt;PrimaryButton</span> size=<span class="str">"lg"</span> disabled={isLoading}<span class="jsx">&gt;</span>
  Save
<span class="jsx">&lt;/PrimaryButton&gt;</span>

<span class="cmt">// або — union замість boolean-стосу</span>
<span class="kw">type</span> ButtonVariant = <span class="str">'primary-outlined-rounded'</span> | <span class="str">'primary-solid'</span> | <span class="str">'ghost'</span>;
<span class="jsx">&lt;Button</span> variant=<span class="str">"primary-outlined-rounded"</span> <span class="jsx">/&gt;</span>
<span class="cmt">// набір валідних станів явно перелічений — неможливо скласти "битий" варіант</span></pre>
    </div>
  </div>`,
        },
      ],
    },
    {
      id: 'forms-controlled-uncontrolled',
      title: '📝 Controlled vs Uncontrolled Inputs',
      interviewQuestions: [
        {
          question: 'У чому різниця між controlled і uncontrolled input, і які трейд-оффи має кожен підхід у формі з великою кількістю полів?',
          answer: 'Controlled input — значення повністю керується React-станом (<code>value</code> + <code>onChange</code>), кожне натискання клавіші тригерить ре-рендер; це дає повний контроль (валідація на льоту, форматування), але при десятках полів у одному компоненті може вплинути на продуктивність. Uncontrolled input зберігає значення в самому DOM, читається через <code>ref</code> лише за потреби (наприклад, при сабміті) — менше ре-рендерів, але складніше реалізувати live-валідацію.',
        },
        {
          question: 'Чому бібліотеки на кшталт React Hook Form віддають перевагу uncontrolled-підходу за замовчуванням?',
          answer: 'Uncontrolled-підхід уникає ре-рендеру батьківського компонента форми на кожне натискання клавіші в кожному полі — React Hook Form підписує поля через <code>ref</code> і керує валідацією/станом поза React-рендер-циклом, синхронізуючи назад у React лише коли це реально потрібно (сабміт, показ помилки). Це дає суттєвий виграш у продуктивності на великих формах порівняно з повністю controlled-підходом.',
        },
        {
          question: `Чому controlled input ніколи не "відстає" від того, що друкує користувач?`,
          answer: `React перезаписує DOM-значення власним станом щорендеру — немає окремого "справжнього" браузерного значення, з яким можна розійтись.`,
        },
        {
          question: `Чому input[type="file"] не можна зробити controlled?`,
          answer: `безпека браузера: JS не може програмно підставити довільний файл у value файлового інпуту.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Дві моделі — хто "володіє" значенням <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card"><h4>Controlled</h4><pre style="font-size:10.5px"><span class="kw">const</span> [value, setValue] = <span class="fn">useState</span>(<span class="str">''</span>);
<span class="jsx">&lt;input</span>
  value={value}
  onChange={e =&gt; <span class="fn">setValue</span>(e.target.value)}
<span class="jsx">/&gt;</span></pre></div>
    <div class="card blue"><h4>Uncontrolled</h4><pre style="font-size:10.5px"><span class="kw">const</span> ref = <span class="fn">useRef</span>&lt;HTMLInputElement&gt;(<span class="kw">null</span>);
<span class="jsx">&lt;input</span>
  ref={ref}
  defaultValue=<span class="str">""</span>
<span class="jsx">/&gt;</span>
<span class="cmt">// читаєш при потребі: ref.current.value</span></pre></div>
  </div>
  <h3 class="topic">React DOM vs браузерний DOM — хто насправді керує <span class="tag tag-pit">PITFALL</span></h3>
  <p>Це не просто "два стилі коду" — різна модель контролю над самим DOM-вузлом:</p>
  <div class="grid2">
    <div class="card red"><h4>Controlled — React "перемагає" браузер щорендеру</h4><p>DOM-вузол <code>&lt;input&gt;</code> технічно МАЄ власну внутрішню властивість <code>value</code> (як у будь-якого браузерного інпуту) — але React на кожному рендері <strong>примусово перезаписує</strong> її значенням зі стану. Вузол не має "власної памʼяті" в очах React: те, що показано на екрані, — завжди відображення React-стану, а не те, що "надрукував" браузер сам по собі.</p></div>
    <div class="card green"><h4>Uncontrolled — браузер лишається джерелом правди</h4><p>React ставить <code>defaultValue</code> лише один раз при mount і після цього <strong>ніколи не чіпає</strong> внутрішній стан DOM-вузла. Все, що вводить користувач, — суто браузерна поведінка; React дізнається про значення, лише коли явно запитає його через <code>ref.current.value</code>.</p></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Саме тому controlled input ніколи не "розсинхронізується" з React-станом, навіть при швидкому наборі тексту — немає окремого "браузерного" значення, з яким можна розійтись, бо React щорендеру перезаписує DOM-вузол своїм значенням наново.</span></div>
  <h3 class="topic"><code>ref</code> для uncontrolled-полів</h3>
  <p><code>useRef</code> сам по собі детально розібраний у розділі "🎯 useRef — детально" — тут важливий саме форм-специфічний патерн: або окремий ref на кожне поле, або <strong>один ref на весь <code>&lt;form&gt;</code></strong> і читання всіх полів разом через <code>FormData</code> (наступний розділ) замість ref-на-кожен-інпут.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><code>input[type="file"]</code> — принципово <strong>завжди uncontrolled</strong>. З міркувань безпеки браузер не дозволяє JS програмно встановлювати значення файлового інпуту (не можна "підсунути" довільний файл з диску користувача через <code>value</code>) — тільки читання через <code>ref</code>/<code>FormData</code>.</span></div>
  <h3 class="topic">Порівняння й вердикт <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>Controlled</th><th>Uncontrolled</th></tr>
      <tr><td>Ре-рендер на кожен keystroke</td><td>Так</td><td>Ні</td></tr>
      <tr><td>Валідація/маска в реальному часі</td><td>Природно</td><td>Складніше (слухати input-подію вручну)</td></tr>
      <tr><td>Умовний UI (submit disabled, лічильник символів)</td><td>Тривіально — значення вже в стані</td><td>Потрібен окремий слухач</td></tr>
      <tr><td>Продуктивність на великих формах (50+ полів)</td><td>Погіршується — кожен інпут ре-рендерить форму</td><td>Не залежить від кількості полів</td></tr>
      <tr><td><code>input[type="file"]</code></td><td>❌ Неможливо (браузерне обмеження)</td><td>✅ Єдиний варіант</td></tr>
      <tr><td>Типова бібліотека</td><td>Ручний useState або Formik (легасі)</td><td>react-hook-form</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span><strong>Вердикт:</strong> маленька форма (1-5 полів) з живою валідацією/умовним UI → controlled, просто й достатньо. Велика форма, форма з файлами, або продуктивність під питанням → uncontrolled (найчастіше — через react-hook-form, розділ "📋 Форми: збір даних, валідація, бібліотеки" нижче), а не ручні refs на кожне поле.</span></div>
  `,
        },
      ],
    },
    {
      id: 'forms-formdata-native',
      title: '📋 Форми: збір даних, валідація, бібліотеки',
      interviewQuestions: [
        {
          question: 'Де правильно робити валідацію форми — на клієнті, на сервері, чи обидва, і чому?',
          answer: 'Клієнтська валідація — для UX (миттєвий фідбек, менше зайвих запитів), але <strong>ніколи не є джерелом істини для безпеки</strong>, бо клієнтський код можна обійти (прямий запит до API). Серверна валідація обов\'язкова завжди — це єдиний надійний бар\'єр. Правильна практика — дублювати ключові правила на обох рівнях, ідеально через спільну схему (Zod), яку імпортують і клієнт, і сервер.',
        },
        {
          question: 'Які переваги дає нативний <code>FormData</code> API порівняно з ручним збором значень із controlled-полів через <code>useState</code> для кожного поля?',
          answer: '<code>FormData</code> збирає всі значення форми одним викликом (<code>new FormData(formElement)</code>) без потреби заводити окремий <code>useState</code> і <code>onChange</code>-обробник на кожне поле, зменшуючи boilerplate і кількість ре-рендерів. У зв\'язці з React 19 Actions (<code>&lt;form action={fn}&gt;</code>) FormData стає нативним способом передати дані форми у Server Action без ручної серіалізації.',
        },
        {
          question: 'Як показати помилки валідації користувачу так, щоб форма не «сіпалась» (не втрачала фокус/значення полів) при кожному ре-рендері?',
          answer: 'Стан помилок варто зберігати окремо від значень полів (наприклад, <code>errors</code> у форматі <code>{ fieldName: message }</code>) і оновлювати лише той запис, що змінився, а не пересобирати весь об\'єкт форми. Бібліотеки на кшталт React Hook Form ізолюють ре-рендер конкретного поля через підписку по імені поля, тому помилка в одному інпуті не викликає ре-рендер усієї форми і не збиває фокус користувача.',
        },
        {
          question: 'Коли варто обрати нативний підхід до форм (<code>useState</code> + <code>FormData</code>) замість бібліотеки (React Hook Form, Formik)?',
          answer: 'Нативний підхід виправданий для простих форм (1-3 поля, без складної крос-польової валідації чи динамічних масивів полів) — додаткова залежність і абстракція бібліотеки там не окупається. Для форм із десятками полів, вкладеними масивами, складною умовною валідацією чи потребою в продуктивності на великому масштабі бібліотека економить значно більше часу, ніж коштує її вивчення.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Робота з даними форми — три рівні, кожен наступний потрібен лише коли попереднього не вистачає:</p>
  <div class="table-wrap">
    <table>
      <tr><th>Рівень</th><th>Інструмент</th><th>Достатньо для</th></tr>
      <tr><td>Збір значень</td><td>нативний <code>FormData</code> / <code>&lt;form action&gt;</code> (React 19)</td><td>будь-яка форма — заміна <code>useState</code> на кожне поле</td></tr>
      <tr><td>Перевірка</td><td>HTML5-атрибути + Constraint Validation API + своя схема (Zod)</td><td>1–10 полів, проста крос-польова логіка</td></tr>
      <tr><td>Керування станом форми</td><td>react-hook-form / TanStack Form</td><td>десятки полів, динамічні масиви, складна умовна валідація</td></tr>
    </table>
  </div>
  <p style="font-size:12.5px;opacity:.75">Хто «володіє» значенням поля (controlled vs uncontrolled, <code>input[type=file]</code>) — окремий розділ «Controlled vs Uncontrolled Inputs» вище.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">FormData — нативний збір значень <span class="tag tag-key">KEY</span></h3>
  <p><code>FormData</code> — вбудований у браузер обʼєкт (не React-специфічний), що збирає значення <strong>усіх</strong> названих (<code>name="..."</code>) полів форми за один виклик — заміна ref-на-кожен-інпут для uncontrolled-форм.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);   // ref не потрібен — форма з події

    data.get('email');              // одне значення: string | File | null
    data.getAll('interests');       // масив — для checkbox-груп з тим самим name
    data.get('avatar') as File;     // файл із <input type="file">
    Object.fromEntries(data);       // { email: '...', name: '...' } — плейн-обʼєкт
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="avatar" type="file" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React 19 Actions — <code>&lt;form action={'{'}fn{'}'}&gt;</code></h3>
  <p>У React 19 форма приймає <strong>функцію</strong> в <code>action</code> — вона отримує зібраний <code>FormData</code> першим аргументом, форма скидається після успіху, а робота може виконуватись прямо на сервері (Server Action). Той самий <code>FormData</code> вже зустрічався в <code>action</code> React Router (розділ «React Router» вище); деталі — розділ «React 19 / майбутнє».</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `async function updateName(formData: FormData) {
  'use server';                                  // Server Action (Next.js App Router)
  await db.user.update({ name: formData.get('name') });
}

function ProfileForm() {
  const [state, action, isPending] = useActionState(updateName, null);
  return (
    <form action={action}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();            // стан найближчої <form> — без пропсів
  return <button disabled={pending}>{pending ? 'Збереження…' : 'Зберегти'}</button>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Нативна HTML5-валідація <span class="tag tag-key">KEY</span></h3>
  <p>Атрибути <code>required</code>, <code>pattern</code>, <code>min</code>/<code>max</code>, <code>type="email"</code> — браузер валідує безкоштовно, без жодного JS. Constraint Validation API дає програмний доступ: <code>input.checkValidity()</code> (bool, без UI), <code>input.reportValidity()</code> (показує нативну підказку браузера), <code>input.setCustomValidity('текст')</code> (власне повідомлення замість дефолтного).</p>
  <h3 class="topic">Коли валідувати — три стратегії</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Момент</th><th>UX</th><th>Коли доречно</th></tr>
      <tr><td><code>onChange</code></td><td>Миттєвий фідбек, але може дратувати посеред вводу ("email invalid" ще до того, як дописав)</td><td>Індикатори сили пароля, лічильник символів</td></tr>
      <tr><td><code>onBlur</code></td><td>Валідація при виході з поля — не заважає під час вводу</td><td>Найпоширеніший баланс для текстових полів</td></tr>
      <tr><td><code>onSubmit</code></td><td>Усе одразу в момент сабміту</td><td>Прості форми, або як фінальна перевірка поверх onBlur</td></tr>
    </table>
  </div>
  <h3 class="topic">Error state і фокус на невалідному полі <span class="tag tag-pit">PITFALL</span></h3>
  <p>Стан помилок тримай <strong>окремо</strong> від значень полів (<code>{ '{' } fieldName: message { '}' }</code>) й оновлюй лише змінений запис — інакше форма пересобирається й «сіпається». Після невдалого сабміту — фокус на перше невалідне поле й ARIA-звʼязок помилки з інпутом.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function useFormErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function validate(data: Record<string, string>) {
    const next: Record<string, string> = {};
    if (!data.email) next.email = 'Обовʼязкове поле';
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) fieldRefs.current[firstInvalid]?.focus(); // ⚠️ a11y — легко забути
    return Object.keys(next).length === 0;
  }
  return { errors, fieldRefs, validate };
}

// розмітка поля з помилкою:
<input
  name="email"
  ref={el => { fieldRefs.current.email = el; }}
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && <span id="email-error" role="alert">{errors.email}</span>}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span>Перенесення фокуса на перше невалідне поле й <code>aria-invalid</code>/<code>aria-describedby</code> — не косметика, а очікувана a11y-поведінка: користувачі screen reader / клавіатурної навігації інакше не дізнаються, де саме помилка. Легко забути, бо форма «технічно працює» й без цього.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Zod — одна схема на клієнт і сервер <span class="tag tag-key">KEY</span></h3>
  <p>Ключове правило безпеки: клієнтська валідація — лише для UX, серверна — обовʼязкова завжди. Щоб не писати правила двічі — <strong>одна Zod-схема</strong> в окремому файлі, який імпортують і компонент, і Server Action / API-роут.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// signupSchema.ts — імпортується І в компонент, І в API-роут / Server Action
import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Невалідний email'),
  age: z.coerce.number().min(18, 'Мінімум 18 років'),  // coerce — FormData дає рядки
});
export type SignupInput = z.infer<typeof signupSchema>;  // тип зі схеми, без дублювання

// будь-де (клієнт або сервер):
const parsed = signupSchema.safeParse(Object.fromEntries(formData));
if (!parsed.success) {
  parsed.error.flatten().fieldErrors;   // { email: ['Невалідний email'], ... }
} else {
  parsed.data;                          // типізовано як SignupInput
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Бібліотеки — коли ручного вже мало</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Підхід</th><th>Модель</th><th>Статус</th></tr>
      <tr><td>Vanilla <code>useState</code> / <code>FormData</code></td><td>Controlled по полю / нативний збір</td><td>Ок для 1–3 полів, росте боляче</td></tr>
      <tr><td><strong>react-hook-form</strong></td><td>Uncontrolled (refs) + Zod для схем</td><td>✅ Актуальний стандарт для будь-чого складнішого за тривіальну форму</td></tr>
      <tr><td>Formik</td><td>Controlled, обгортка над useState</td><td>Легасі — здебільшого витіснений react-hook-form через продуктивність</td></tr>
      <tr><td>TanStack Form</td><td>Type-safe, framework-agnostic ядро</td><td>Новіший гравець, зростає, поки не домінує</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from './signupSchema';   // та сама схема, що й на сервері

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),  // валідація — схемою, не вручну
  });

  return (
    <form onSubmit={handleSubmit(data => submit(data))}>
      <input {...register('email')} />       {/* register = ref + name під капотом */}
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
// register() повертає { name, ref, onChange, onBlur } — під капотом uncontrolled,
// мінімум ре-рендерів навіть на формі з 50+ полями`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">✅</span><span><strong>Вердикт:</strong> проста форма (1–5 полів) → нативний <code>FormData</code> + Zod-схема, без бібліотеки. Форма серйозніше за 2–3 поля, з файлами, динамічними полями чи потребою в продуктивності → <strong>react-hook-form + Zod</strong>: одна схема (перевикористовна на бекенді), продуктивність не деградує з кількістю полів, TS-типи виводяться зі схеми автоматично.</span></div>`,
        },
      ],
    },
    {
      id: 'react-router',
      title: '🧭 React Router',
      interviewQuestions: [
        {
          question: 'Чим декларативний підхід React Router (<code>&lt;Route&gt;</code> у JSX) відрізняється від File-based роутингу в Next.js, і які в кожного плюси?',
          answer: 'React Router будує маршрути з JSX-дерева <code>&lt;Route&gt;</code>-компонентів (або об\'єктної конфігурації), що дає повний програмний контроль над структурою (умовні маршрути, вкладеність, кастомна логіка) — ціна цього гнучкість замість конвенції. File-based роутинг Next.js виводить маршрути з файлової структури — швидше зорієнтуватись новачку, менше boilerplate, але менш гнучко для нетипових/динамічних сценаріїв маршрутизації.',
        },
        {
          question: 'Як React Router реалізує lazy-loading маршрутів, і чому це важливо для продуктивності великого SPA?',
          answer: 'Через <code>React.lazy()</code> + <code>&lt;Suspense&gt;</code> (або вбудований <code>lazy</code>-loader у Data Router API) код кожного маршруту виноситься в окремий чанк і завантажується лише коли користувач реально на нього переходить. Без цього весь JS усіх сторінок додатку потрапляє в один початковий бандл, що суттєво збільшує час до інтерактивності (TTI) при першому завантаженні.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що це і навіщо <span class="tag tag-key">KEY</span></h3>
  <p>React сам по собі не має роутера (розділ "Бібліотека чи фреймворк?" вище — конкретний наслідок цього факту). React Router — де-факто стандартна стороння бібліотека для клієнтського роутингу в SPA: зіставляє URL з деревом компонентів, синхронізує адресний рядок і навігацію без повного перезавантаження сторінки.</p>
  <h3 class="topic">Який роутер обрати — варіанти й актуальність <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card red"><h4>Декларативний API (легасі)</h4><p><code>&lt;BrowserRouter&gt;</code> + <code>&lt;Routes&gt;</code>/<code>&lt;Route&gt;</code> у JSX. Досі працює, багато старого коду на ньому — але без вбудованого <code>loader</code>/<code>action</code>, дані все одно тягнеш вручну через <code>useEffect</code>.</p></div>
    <div class="card green"><h4>Data Router API — актуальний стандарт ✅</h4><p><code>createBrowserRouter([...])</code> + <code>&lt;RouterProvider&gt;</code>. Конфіг маршрутів — масив обʼєктів, а не JSX-дерево — розблоковує <code>loader</code>/<code>action</code>/<code>errorElement</code> на рівні кожного роуту. Рекомендований підхід з React Router v6.4+, стандартна форма і в v7 (після злиття з Remix).</p></div>
  </div>
  <div class="table-wrap">
    <table>
      <tr><th>Функція</th><th>Коли обирати</th></tr>
      <tr><td><code>createBrowserRouter</code></td><td>Стандартний вибір для будь-якого браузерного SPA — HTML5 History API, чисті URL</td></tr>
      <tr><td><code>createHashRouter</code></td><td>Той самий Data Router API, але URL виду <code>/#/path</code> — коли сервер не налаштований на SPA-фолбек (статичний хостинг без rewrite-правил)</td></tr>
      <tr><td><code>createMemoryRouter</code></td><td>Без адресного рядка взагалі, історія — в памʼяті. Для тестів (Jest/Vitest) і не-браузерних середовищ</td></tr>
      <tr><td><code>createStaticRouter</code> / <code>createStaticHandler</code></td><td>Серверна пара для SSR React Router поза Next.js — фреймворк-агностичний SSR-сетап</td></tr>
    </table>
  </div>
  <h3 class="topic">Основні концепції</h3>
  <div class="grid2">
    <div class="card"><h4><code>&lt;Link&gt;</code> / <code>&lt;NavLink&gt;</code></h4><p>Клієнтська навігація без перезавантаження сторінки (перехоплює клік, оновлює History API). <code>NavLink</code> — те саме, плюс автоматичний <code>className</code>/<code>style</code> для активного маршруту.</p></div>
    <div class="card blue"><h4><code>&lt;Outlet&gt;</code></h4><p>Місце в батьківському (layout) роуті, куди рендериться <strong>дочірній</strong> зматчений маршрут — основа вкладеного роутингу: спільний layout (nav, sidebar) не перемонтовується при навігації між дочірніми сторінками.</p></div>
    <div class="card green"><h4><code>useNavigate</code></h4><p>Програмна навігація (після сабміту форми, редірект після успіху) — <code>const navigate = useNavigate(); navigate('/success')</code>.</p></div>
    <div class="card yellow"><h4><code>useParams</code> / <code>useLocation</code></h4><p><code>useParams()</code> — значення динамічних сегментів (<code>/users/:id</code> → <code>{'{'} id {'}'}</code>). <code>useLocation()</code> — поточний шлях/query/hash як обʼєкт.</p></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,          // спільний UI (nav, sidebar)
    children: [
      { index: true, element: <Home /> },
      { path: 'users/:id', element: <UserProfile /> }, // :id — динамічний сегмент
    ],
  },
]);

function Layout() {
  return (
    <>
      <nav><NavLink to="/">Home</NavLink></nav>
      <Outlet />   {/* сюди рендериться Home АБО UserProfile залежно від URL */}
    </>
  );
}

function UserProfile() {
  const { id } = useParams();    // '42' з /users/42
  return <div>User #{id}</div>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">loader — дані через роутер <span class="tag tag-key">KEY</span></h3>
  <p>Функція <code>loader</code> на роуті виконується <strong>до</strong> рендеру компонента — дані вже готові в момент першого рендеру, замість класичного "змонтувався → useEffect → fetch → спінер". Читаються через <code>useLoaderData()</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `const router = createBrowserRouter([
  {
    path: 'users/:id',
    element: <UserProfile />,
    loader: async ({ params }) => {
      const res = await fetch(\`/api/users/\${params.id}\`);
      if (!res.ok) throw new Response('Not Found', { status: 404 }); // → errorElement
      return res.json();
    },
  },
]);

function UserProfile() {
  const user = useLoaderData();   // дані вже тут, без useEffect і спінера на mount
  return <div>{user.name}</div>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">✅</span><span><code>loader</code> ≠ TanStack Query (розділ "TanStack Query" вище) — <code>loader</code> вирішує "коли завантажити" (до рендеру роуту, паралельно з code-splitting), Query вирішує "як кешувати/інвалідувати/дедуплікувати" довготривалі серверні дані. Часто використовують разом: <code>loader</code> лише "прогріває" Query-кеш і повертає проміс.</span></div>
  <h3 class="topic">action — мутації через роутер <span class="tag tag-key">KEY</span></h3>
  <p>Компонент <code>&lt;Form&gt;</code> (з react-router, не звичайний HTML-<code>&lt;form&gt;</code>) сабмітить дані на <code>action</code> роуту замість ручного <code>onSubmit</code>+<code>preventDefault</code>+<code>fetch</code>. Progressive enhancement — форма технічно працює навіть без JS (справжній HTTP-сабміт), React Router перехоплює клієнтськи, коли JS довантажився.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `const router = createBrowserRouter([
  {
    path: 'users/:id/edit',
    element: <EditUser />,
    action: async ({ request, params }) => {
      const formData = await request.formData();
      await fetch(\`/api/users/\${params.id}\`, { method: 'PATCH', body: formData });
      return redirect(\`/users/\${params.id}\`);  // навігація прямо з action
    },
  },
]);

function EditUser() {
  const errors = useActionData();  // результат action (напр. помилки валідації)
  return (
    <Form method="post">
      <input name="name" />
      {errors?.name && <span>{errors.name}</span>}
      <button type="submit">Save</button>
    </Form>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><code>action</code>/<code>loader</code> React Router — не те саме, що React 19 <code>useActionState</code>/Actions (розділ "React 19 / майбутнє" вище). Та сама ідея (форма → серверна дія → результат), але різні шари: React Router — бібліотека роутингу з власною data-моделлю; React 19 Actions — вбудовані в React core, не привʼязані до конкретного роутера.</span></div>
  <h3 class="topic">React Router vs Next.js App Router — коли що</h3>
  <div class="grid2">
    <div class="card blue"><h4>React Router</h4><p>Чистий SPA, клієнтський роутинг, сам обираєш data-layer (Query/loader/RTK Query). Гнучкіше, але кешування/SSR/бандлінг — окремі рішення, які треба зібрати самому.</p></div>
    <div class="card green"><h4>Next.js App Router</h4><p>Файлова маршрутизація, RSC, кешування й SSR "з коробки" (розділ "Next.js App Router" нижче) — менше рішень приймати самому, але й менше гнучкості поза межами конвенцій фреймворку.</p></div>
  </div>`,
        },
      ],
    },
    /* ============================= BLOCK 5.5 — СЕРВЕРНА ВЗАЄМОДІЯ ТА AUTH ============================= */
    {
      id: 'server-communication-auth',
      title: '🌐 Fetch, axios та автентифікація на клієнті',
      interviewQuestions: [
        {
          question: 'Чому "fetch не кидає помилку на HTTP 404/500" — типова пастка, і чим тут axios принципово поводиться інакше?',
          answer: '<code>fetch</code> резолвить проміс (не потрапляє в <code>catch</code>) для <strong>будь-якої</strong> відповіді, яку сервер взагалі відповів, — навіть 404 чи 500. Помилковим <code>fetch</code> вважає лише мережевий збій (немає з\'єднання, CORS-блок). Перевіряти успіх треба вручну через <code>response.ok</code>. axios, навпаки, автоматично кидає (reject) для будь-якого статусу поза діапазоном 2xx, тобто <code>try/catch</code> навколо axios-запиту й справді ловить HTTP-помилки без ручної перевірки.',
        },
        {
          question: 'Навіщо потрібен AbortController у парі з fetch, і яка типова помилка з ним пов\'язана в React-компонентах?',
          answer: '<code>AbortController</code> дозволяє скасувати in-flight запит (<code>controller.abort()</code>) — критично у <code>useEffect</code> з залежностями, що часто змінюються (пошук по мірі вводу, зміна параметра), інакше застарілі відповіді можуть прийти <em>після</em> свіжих і перезаписати актуальний стан ("race condition" застарілих запитів). Типова помилка — не повертати cleanup-функцію з <code>useEffect</code>, яка викликає <code>abort()</code>, через що компонент після демонтажу все одно намагається викликати <code>setState</code> на результат запиту, що вже неактуальний.',
        },
        {
          question: 'Чим інтерцептор axios (<code>interceptors.request/response</code>) відрізняється від того, як доводиться руками обгортати кожен виклик fetch для однакової задачі (напр. підстановка Authorization-заголовка)?',
          answer: 'Інтерцептор axios реєструється <strong>один раз</strong> глобально на інстансі й автоматично застосовується до <strong>кожного</strong> запиту/відповіді через цей інстанс — зручно централізувати підстановку токена, логування, редірект на 401. З голим <code>fetch</code> немає вбудованого механізму перехоплення: доводиться самому писати обгортку-функцію (<code>apiFetch</code>) навколо кожного виклику або патчити глобальний <code>fetch</code>, що менш прозоро й легше забути застосувати в новому місці коду.',
        },
        {
          question: 'Чому зберігати JWT у <code>localStorage</code> вважають ризикованим, і як HttpOnly-cookie вирішує цю проблему — і яку нову проблему створює натомість?',
          answer: '<code>localStorage</code> доступний з будь-якого JS-коду на сторінці — тому будь-яка успішна XSS-атака (впроваджений сторонній скрипт) може прочитати токен і вкрасти сесію. <code>HttpOnly</code>-cookie взагалі <strong>недоступний з JavaScript</strong> (тільки браузер автоматично додає його до запитів), тому XSS не може його прочитати. Натомість cookie автоматично прикріплюється до <strong>кожного</strong> запиту на цей домен, включно з тими, що ініціює стороння сторінка (форма/скрипт на іншому сайті) — це відкриває CSRF, від якого захищаються окремо: <code>SameSite=Strict/Lax</code> + CSRF-токен.',
        },
        {
          question: 'Як правильно реалізувати захищений маршрут (protected route) у React Router, щоб неавторизований користувач не побачив навіть миттєвий "спалах" приватного контенту?',
          answer: 'Обгортковий компонент (напр. <code>RequireAuth</code>) перевіряє стан автентифікації <em>до</em> рендеру дочірнього маршруту через <code>&lt;Navigate to="/login" /&gt;</code> замість умовного рендеру всередині сторінки — так React Router взагалі не монтує приватний компонент, поки перевірка не завершена. Типова помилка — спершу відрендерити приватну сторінку і лише в <code>useEffect</code> перевірити токен і зробити редірект: між першим рендером і спрацюванням ефекту приватний контент встигає промайнути в DOM.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">fetch — пастка з "успішними" помилками <span class="tag tag-pit">PITFALL</span></h3>
  <p><code>fetch</code> потрапляє в <code>catch</code> лише при мережевому збої — HTTP 404/500 це для нього "успішна" відповідь, яку треба перевірити вручну через <code>response.ok</code> (<code>true</code> для статусів 200-299).</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'fetch + AbortController — скасування застарілого запиту в React',
          code: `async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    // fetch САМ не кидає помилку на 404/500 — перевіряємо вручну
    throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
  }
  return res.json();
}

function useSearch(query: string) {
  const [results, setResults] = useState<Item[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchJson<Item[]>(\`/api/search?q=\${query}\`, controller.signal)
      .then(setResults)
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err); // ігноруємо власне скасування
      });

    return () => controller.abort(); // cleanup: новий query → скасувати попередній запит
  }, [query]);

  return results;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">axios — навіщо в проєктах поверх fetch <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card"><h4>fetch (нативний)</h4><ul><li>0 залежностей, стандарт браузера</li><li>не кидає помилку на 4xx/5xx — треба <code>response.ok</code></li><li>ручна серіалізація JSON (<code>.json()</code>) і заголовків</li><li>скасування через <code>AbortController</code> — окремий API</li></ul></div>
    <div class="card green"><h4>axios (бібліотека)</h4><ul><li>reject на будь-якому статусі поза 2xx — простий <code>try/catch</code></li><li>автоматична серіалізація JSON обидва боки</li><li><strong>interceptors</strong> — централізовані request/response хуки</li><li>вбудоване скасування (<code>AbortController</code> як опція), таймаути</li></ul></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'axios interceptors — підстановка токена й обробка 401 в одному місці',
          code: `import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Request interceptor — виконується перед КОЖНИМ запитом через цей інстанс
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Response interceptor — централізована реакція на 401 (протух токен)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshAccessToken(); // одна спроба оновити токен...
      return api.request(error.config); // ...і повторити оригінальний запит
    }
    return Promise.reject(error);
  },
);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Автентифікація на клієнті — де зберігати токен <span class="tag tag-pit">PITFALL</span></h3>
  <div class="grid2">
    <div class="card red"><h4>⚠️ localStorage</h4><p>Доступний з будь-якого JS на сторінці → вразливий до <strong>XSS</strong> (вкрадений скрипт читає токен). Простий у використанні, але для чутливих токенів — ризик.</p></div>
    <div class="card green"><h4>✅ HttpOnly cookie</h4><p>Недоступний з JS — XSS не може прочитати. Але автоматично летить із кожним запитом на домен → вразливий до <strong>CSRF</strong>, тому потрібні <code>SameSite=Strict/Lax</code> + CSRF-токен.</p></div>
  </div>
  <p>Практичний компроміс у продакшн-застосунках: короткоживучий <strong>access token</strong> у пам'яті (React-стан/модуль-змінна, зникає при перезавантаженні) + довгоживучий <strong>refresh token</strong> у HttpOnly-cookie для тихого оновлення access token.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Protected route — редірект ДО рендеру приватного контенту, без "спалаху"',
          code: `function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Spinner />; // ще не знаємо статус — нічого не рендеримо
  if (!user) {
    // replace: true — щоб /login не додавав зайвий запис в history (back не веде назад у приват)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
// Приватний <Dashboard> взагалі НЕ монтується, поки перевірка не пройшла —
// на відміну від "відрендерити й редіректнути в useEffect", де контент встигає промайнути`,
        },
      ],
    },
    /* ============================= BLOCK 6 — NEXT.JS RENDER MODELS ============================= */
    {
      id: 'nextjs-render-models',
      title: '🖥️ Next.js: рендер-моделі',
      interviewQuestions: [
        {
          question: 'Поясни різницю між SSR, SSG, ISR і CSR — коли обрати кожну модель?',
          answer: 'CSR — весь рендеринг у браузері, найгірший для SEO/першого фарбування, підходить для приватних дашбордів. SSR — HTML генерується на сервері на кожен запит, підходить для персоналізованого/часто змінного контенту. SSG — HTML генерується один раз під час білду, максимальна швидкість, для контенту що майже не змінюється (маркетингові сторінки). ISR — SSG з періодичним фоновим ревалідейшном (<code>revalidate</code>), компроміс: швидкість статики + свіжість без повного ребілду.',
        },
        {
          question: 'Що таке React Server Components і чим вони принципово відрізняються від SSR, який існував і до RSC?',
          answer: 'SSR лише виконує рендер на сервері для <em>початкового</em> HTML, після чого весь код все одно потрапляє в клієнтський бандл для гідратації. RSC — компоненти, які виконуються <strong>виключно на сервері</strong> й ніколи не потрапляють у клієнтський JS-бандл: їхній код (і залежності) взагалі не завантажується браузером, що дає суттєве зменшення розміру бандла для частин UI, яким не потрібна інтерактивність.',
        },
        {
          question: `SSR і RSC — це одне й те саме?`,
          answer: `ні: SSR — коли рендериться HTML; RSC — де взагалі виконується компонент (сервер, ніколи не в бандлі клієнта).`,
        },
        {
          question: `Чому не можна передати onClick з Server у Client Component як проп у зворотньому напрямку (Client`,
          answer: `Server)? → пропи серіалізуються, функції не серіалізуються — сервер не може отримати посилання на клієнтську функцію.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">CSR / SSR / SSG / ISR <span class="tag tag-key">KEY</span></h3><div class="table-wrap">
    <table>
      <tr><th>Mode</th><th>Коли рендериться HTML</th><th>Коли доречно</th></tr>
      <tr><td><strong>CSR</strong></td><td>У браузері, після завантаження JS</td><td>Дашборди, інтерактивні частини за автентифікацією</td></tr>
      <tr><td><strong>SSR</strong></td><td>На сервері, на кожен запит</td><td>Персоналізовані сторінки, дані, що часто міняються</td></tr>
      <tr><td><strong>SSG</strong></td><td>На сервері, під час білда, один раз</td><td>Blog posts, marketing pages — контент майже не міняється</td></tr>
      <tr><td><strong>ISR</strong></td><td>Як SSG, але перегенерується у фоні через <code>revalidate</code></td><td>Новини, каталог товарів — часто, але не real-time</td></tr>
    </table>
  </div>
  <h3 class="topic">RSC — не те саме, що SSR <span class="tag tag-pit">PITFALL</span></h3>
  <p>SSR — <strong>коли</strong> рендериться HTML (на сервері vs у браузері) — про час і місце. RSC (React Server Components) — <strong>де живе компонент</strong> взагалі: Server Component ніколи не потрапляє в JS-бандл клієнта, його код і залежності виконуються лише на сервері й ніколи не гідруються. SSR-компонент — це звичайний Client Component, просто його <em>перший</em> рендер відбувся на сервері для HTML, а потім він гідрується і живе в браузері.</p>
  <h3 class="topic">Serialization через "use client" межу <span class="tag tag-key">KEY</span></h3>
  <p>Пропи, що йдуть із Server Component у Client Component, серіалізуються (як JSON) — <strong>не можна</strong> передати функції, класи, <code>Date</code>-об'єкти напряму, Symbol. Виняток: сам <code>children</code> (JSX-дерево) можна передати — Server Component може лишатись "невидимим" деревом усередині Client Component через children.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// app/page.tsx — Server Component
export default function Page() {
  return (
    <>
      <Header />                                    {/* Відразу */}
      <Suspense fallback={<DashboardSkeleton />}>
        <SlowDashboard />                          {/* Стрімиться окремо */}
      </Suspense>
    </>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><strong>Hydration mismatch:</strong> якщо серверний і клієнтський рендер відрізняються (<code>Date.now()</code>, <code>window</code>, <code>Math.random()</code> у рендері) — React лається на mismatch. Фікс: <code>suppressHydrationWarning</code> на конкретному вузлі або перенести browser-only контент у <code>useEffect</code>.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Bundle leak:</strong> <code>"use client"</code> на "корені" фічі тягне за собою у клієнтський бандл усі дочірні модулі-імпорти. Client Component може отримати Server Component лише через <code>children</code>-проп, ніколи через прямий <code>import</code>.</span></div>
  `,
        },
      ],
    },
    /* ============================= BLOCK 7 — NEXT.JS APP ROUTER ============================= */
    {
      id: 'nextjs-app-router',
      title: '▲ Next.js App Router',
      interviewQuestions: [
        {
          question: 'Чим App Router принципово відрізняється від Pages Router окрім файлової структури?',
          answer: 'App Router будується на React Server Components за замовчуванням (компоненти серверні, доки явно не позначені <code>\'use client\'</code>), підтримує вкладені layouts зі збереженням стану між навігаціями, паралельні та перехоплюючі маршрути (<code>@slot</code>, <code>(.)segment</code>), та стрімінг через Suspense на рівні сегментів маршруту. Pages Router — усі компоненти клієнтські за замовчуванням, рендер-модель обирається на рівні цілої сторінки (<code>getServerSideProps</code>/<code>getStaticProps</code>), без гранулярного стрімінгу.',
        },
        {
          question: 'Що означає директива <code>\'use client\'</code>, і чи означає вона, що весь піддерево під нею більше не рендериться на сервері?',
          answer: '<code>\'use client\'</code> позначає межу — усе, що <em>імпортується</em> з цього файлу, стає частиною клієнтського бандла і гідратується в браузері. Але це не означає повну відмову від серверного рендерингу: клієнтський компонент все одно рендериться на сервері один раз для генерації початкового HTML (SSR), а потім гідратується на клієнті — «client component» стосується бандлінгу й інтерактивності, а не відсутності серверного рендеру взагалі.',
        },
        {
          question: `Що заважає забути перевірити авторизацію в Server Action?`,
          answer: `нічого, це відповідальність розробника — Action виглядає як звичайна функція, але викликається з клієнта як ендпоінт.`,
        },
        {
          question: `4 рівні кешування Next.js — назви й різницю`,
          answer: `Request Memoization / Data Cache / Full Route Cache / Router Cache, сервер vs клієнт, per-request vs persistent.`,
        },
        {
          question: `Навіщо React.cache() потрібен окремо, якщо Next.js вже автоматично дедуплікує fetch?`,
          answer: `<code>fetch</code> дедуплікується автоматично лише завдяки внутрішньому патчу Next.js (Request Memoization). Будь-яка інша асинхронна робота — прямий запит до БД через ORM, виклик стороннього SDK — такого патчу не має. <code>React.cache()</code> дає той самий per-request дедуп <em>вручну</em> для довільної async-функції: повторні виклики з однаковими аргументами в межах одного рендер-проходу повертають закешований результат.`,
        },
        {
          question: `Чим Promise.all-паралелізація рятує від waterfall-запитів у Server Component, і коли вона незастосовна?`,
          answer: `Послідовні <code>await</code> для незалежних джерел даних змушують кожен наступний запит чекати завершення попереднього, хоча вони могли б виконуватись одночасно. <code>Promise.all</code> стартує обидва одразу й чекає обидва результати паралельно. Незастосовно, якщо другий запит реально залежить від значення першого — тоді waterfall неминучий за дизайном.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Server vs Client Components <span class="tag tag-key">KEY</span></h3><div class="table-wrap">
    <table>
      <tr><th></th><th>Server Component</th><th>Client Component</th></tr>
      <tr><td><strong>Default</strong></td><td>✅ Так</td><td>❌ Потрібен 'use client'</td></tr>
      <tr><td><strong>async/await у тілі</strong></td><td>✅</td><td>❌</td></tr>
      <tr><td><strong>useState/useEffect</strong></td><td>❌</td><td>✅</td></tr>
      <tr><td><strong>Event handlers</strong></td><td>❌</td><td>✅</td></tr>
      <tr><td><strong>DB/FS доступ напряму</strong></td><td>✅</td><td>❌</td></tr>
      <tr><td><strong>Йде в JS bundle</strong></td><td>❌ (не йде!)</td><td>✅</td></tr>
      <tr><td><strong>Browser APIs</strong></td><td>❌</td><td>✅</td></tr>
    </table>
  </div>
  <h3 class="topic">File conventions</h3><div class="grid2">
    <div class="card"><h4>app/ structure</h4>
      <pre style="font-size:10.5px">app/
  layout.tsx        <span class="cmt">← спільний layout (persistent)</span>
  page.tsx          <span class="cmt">← UI роуту</span>
  loading.tsx       <span class="cmt">← Suspense fallback</span>
  error.tsx         <span class="cmt">← error boundary ('use client'!)</span>
  not-found.tsx     <span class="cmt">← 404</span>
  route.ts          <span class="cmt">← API Route Handler</span>
  template.tsx      <span class="cmt">← ре-маунт при навігації (vs layout)</span></pre>
    </div>
    <div class="card blue"><h4>Server Actions</h4>
      <pre style="font-size:10.5px"><span class="str">'use server'</span>;

<span class="kw">export async function</span> <span class="fn">deletePost</span>(id: <span class="type">string</span>) {
  <span class="kw">const</span> session = <span class="kw">await</span> <span class="fn">getSession</span>();
  <span class="kw">if</span> (!session) <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">'Unauthorized'</span>);
  <span class="kw">await</span> db.post.<span class="fn">delete</span>({ where: { id } });
  <span class="fn">revalidatePath</span>(<span class="str">'/posts'</span>);
}
<span class="cmt">// ⚠️ ЗАВЖДИ перевіряй права всередині Server Action —</span>
<span class="cmt">// це, по суті, публічний HTTP-ендпоінт з зручним синтаксисом.</span></pre>
    </div>
  </div>
  <h3 class="topic">Динамічні сегменти <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Папка</th><th>URL, що матчить</th><th><code>params</code></th></tr>
      <tr><td><code>app/users/[id]/page.tsx</code></td><td><code>/users/42</code></td><td><code>{'{'} id: '42' {'}'}</code></td></tr>
      <tr><td><code>app/docs/[...slug]/page.tsx</code></td><td><code>/docs/a/b/c</code> (1+ сегментів)</td><td><code>{'{'} slug: ['a','b','c'] {'}'}</code></td></tr>
      <tr><td><code>app/docs/[[...slug]]/page.tsx</code></td><td><code>/docs</code> теж матчить (0+ сегментів)</td><td><code>{'{'} slug: undefined {'}'}</code> для <code>/docs</code></td></tr>
      <tr><td><code>app/(marketing)/about/page.tsx</code></td><td><code>/about</code> — <code>(marketing)</code> НЕ потрапляє в URL</td><td>Route group — лише для організації файлів/layout, не для URL-сегментів</td></tr>
    </table>
  </div>
  <h3 class="topic">Навігація: <code>next/link</code> і клієнтські хуки</h3>
  <div class="grid2">
    <pre><span class="kw">import</span> Link <span class="kw">from</span> <span class="str">'next/link'</span>;

<span class="jsx">&lt;Link</span> href=<span class="str">"/users/42"</span><span class="jsx">&gt;</span>Профіль<span class="jsx">&lt;/Link&gt;</span>
<span class="cmt">// клієнтська навігація без full reload +</span>
<span class="cmt">// автоматичний prefetch роуту, щойно лінк у viewport —</span>
<span class="cmt">// на відміну від звичайного &lt;a&gt;, який просто перезавантажить сторінку</span></pre>
    <pre><span class="str">'use client'</span>;
<span class="kw">import</span> { useRouter, usePathname, useSearchParams } <span class="kw">from</span> <span class="str">'next/navigation'</span>;

<span class="kw">const</span> router = <span class="fn">useRouter</span>();     <span class="cmt">// router.push('/x'), router.refresh()</span>
<span class="kw">const</span> pathname = <span class="fn">usePathname</span>();  <span class="cmt">// '/users/42'</span>
<span class="kw">const</span> params = <span class="fn">useSearchParams</span>(); <span class="cmt">// ?tab=posts → params.get('tab')</span></pre>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>У Server Component (<code>page.tsx</code> за замовчуванням, таблиця вище) <code>params</code>/<code>searchParams</code> приходять як звичайні <strong>пропи</strong> функції — <code>useRouter</code>/<code>usePathname</code> непотрібні й недоступні. Клієнтські хуки навігації — лише для Client Components, де потрібна програмна навігація чи реакція на зміну URL у реальному часі.</span></div>
  <p style="font-size:12.5px;opacity:.75">Просунуті/рідкісні конвенції — parallel routes (<code>@slot</code>, кілька незалежних піддерев в одному layout) та intercepting routes (<code>(.)folder</code>, показ роуту "поверх" поточного, напр. модалка з власним URL) — за межами типового Senior-інтерв'ю, знати про існування достатньо.</p>
  <h3 class="topic">Route Handlers</h3>
  <p><code>route.ts</code> у будь-якій папці <code>app/</code> — повноцінний API-ендпоінт (<code>GET</code>/<code>POST</code>/... іменовані експорти), співіснує з <code>page.tsx</code> у тій самій папці лише якщо різні сегменти шляху.</p>
  <h3 class="topic">Caching layers — найзаплутаніша тема Next <span class="tag tag-pit">PITFALL</span></h3><div class="table-wrap">
    <table>
      <tr><th>Кеш</th><th>Де</th><th>Що кешує</th><th>Як інвалідувати</th></tr>
      <tr><td><strong>Request Memoization</strong></td><td>Сервер, час одного рендеру</td><td>Дедуплікація однакових <code>fetch</code> у дереві компонентів</td><td>Сам минає після рендеру</td></tr>
      <tr><td><strong>Data Cache</strong></td><td>Сервер, персистентний</td><td>Результат <code>fetch</code> між запитами/деплоями</td><td><code>revalidatePath/Tag</code>, <code>fetch(..., {'{'} next: {'{'} revalidate {'}'} {'}'})</code></td></tr>
      <tr><td><strong>Full Route Cache</strong></td><td>Сервер, persist</td><td>Згенерований HTML+RSC payload статичних роутів</td><td>Ребілд, або динамічний роут (opt-out)</td></tr>
      <tr><td><strong>Router Cache</strong></td><td>Клієнт, in-memory</td><td>RSC payload відвіданих роутів для миттєвої back/forward навігації</td><td>Хард-рефреш, <code>router.refresh()</code></td></tr>
    </table>
  </div>
  <h3 class="topic">React.cache() та Next.js after() <span class="tag tag-new">Next.js 15</span></h3>
  <div class="grid2">
    <div class="card blue"><h4>React.cache()</h4>
      <p>Next.js автоматично дедуплікує однакові виклики <code>fetch</code> у межах одного рендеру (Request Memoization з таблиці вище). Але довільна асинхронна робота — прямий запит до БД, виклик ORM — такої дедуплікації не отримує. <code>cache()</code> обгортає функцію так, щоб повторні виклики з тими самими аргументами в межах одного рендер-проходу поверталися з одного результату, а не викликали роботу заново.</p>
    </div>
    <div class="card purple"><h4>after()</h4>
      <p>Планує роботу, яка виконається <strong>після</strong> того, як відповідь вже пішла користувачу — логування, аналітика, інвалідація кешу. На відміну від звичайного <code>await</code> у Server Action чи Route Handler, ця робота більше не затримує відповідь користувачу.</p>
    </div>
  </div>
  <pre><span class="kw">import</span> { cache } <span class="kw">from</span> <span class="str">'react'</span>;
<span class="kw">import</span> { after } <span class="kw">from</span> <span class="str">'next/server'</span>;

<span class="cmt">// React.cache() — дедуплікація ДОВІЛЬНОЇ async-роботи, не лише fetch</span>
<span class="kw">const</span> getUser = <span class="fn">cache</span>(<span class="kw">async</span> (id: <span class="type">string</span>) =&gt; {
  <span class="kw">return</span> db.user.<span class="fn">findUnique</span>({ where: { id } });
});
<span class="cmt">// getUser('42') викликаний 5 разів у дереві компонентів за один рендер</span>
<span class="cmt">// → запит до БД піде лише один раз</span>

<span class="kw">export async function</span> <span class="fn">updateProfileAction</span>(formData: FormData) {
  <span class="str">'use server'</span>;
  <span class="kw">await</span> db.profile.<span class="fn">update</span>(<span class="cmt">/* ... */</span>);

  <span class="cmt">// after() — виконається ПІСЛЯ того, як відповідь вже пішла користувачу</span>
  <span class="fn">after</span>(() =&gt; {
    <span class="fn">logAnalyticsEvent</span>(<span class="str">'profile_updated'</span>);
    <span class="fn">revalidateSearchIndex</span>();
  });
}</pre>
  <h3 class="topic">Уникнення waterfall-запитів <span class="tag tag-pit">PITFALL</span></h3>
  <p>У Server Component можна писати послідовний <code>await</code> як у звичайному async-коді — і це легко перетворюється на приховану проблему: кожен наступний запит стартує лише після завершення попереднього, хоча вони не залежать один від одного.</p>
  <div class="grid2">
    <div class="card red"><h4>❌ Waterfall — послідовно</h4>
      <pre><span class="kw">async function</span> <span class="fn">Page</span>() {
  <span class="kw">const</span> user = <span class="kw">await</span> <span class="fn">getUser</span>();     <span class="cmt">// 200ms</span>
  <span class="kw">const</span> posts = <span class="kw">await</span> <span class="fn">getPosts</span>();    <span class="cmt">// +200ms</span>
  <span class="cmt">// разом ~400ms, хоча posts не залежить від user</span>
}</pre>
    </div>
    <div class="card green"><h4>✅ Паралельно — Promise.all</h4>
      <pre><span class="kw">async function</span> <span class="fn">Page</span>() {
  <span class="kw">const</span> [user, posts] = <span class="kw">await</span> Promise.<span class="fn">all</span>([
    <span class="fn">getUser</span>(),
    <span class="fn">getPosts</span>(),
  ]);
  <span class="cmt">// разом ~200ms — обидва запити стартують одночасно</span>
}</pre>
    </div>
  </div>
  <p><strong>Частина запитів залежить, частина ні</strong> — стартуй проміс одразу, а <code>await</code> став пізніше ("start early, await late"):</p>
  <pre><span class="kw">async function</span> <span class="fn">Page</span>() {
  <span class="kw">const</span> postsPromise = <span class="fn">getPosts</span>();     <span class="cmt">// стартував одразу, ще НЕ await</span>
  <span class="kw">const</span> user = <span class="kw">await</span> <span class="fn">getUser</span>();       <span class="cmt">// виконується паралельно з postsPromise</span>
  <span class="kw">const</span> posts = <span class="kw">await</span> postsPromise;    <span class="cmt">// вже майже готовий, чекаємо мінімально</span>
}</pre>
  `,
        },
      ],
    },
    /* ============================= BLOCK 8 — REACT 19 / FUTURE ============================= */
    {
      id: 'react-19-future',
      title: '✨ React 19 / майбутнє',
      interviewQuestions: [
        {
          question: 'Що таке <code>use()</code> у React 19, і чим він відрізняється від хуків на кшталт <code>useEffect</code> для роботи з проміс-подібними значеннями?',
          answer: '<code>use()</code> — не хук у класичному розумінні (можна викликати умовно, в циклах) — це примітив, що читає значення проміса чи контексту <strong>синхронно під час рендеру</strong>, інтегруючись із Suspense: якщо проміс ще не резолвнувся, компонент «підвішується», і найближчий <code>&lt;Suspense&gt;</code> показує fallback. На відміну від <code>useEffect</code>, тут не потрібен окремий стан для loading/error — це бере на себе Suspense/Error Boundary.',
        },
        {
          question: 'Чим React 19 Actions (<code>useActionState</code>, <code>useOptimistic</code>) спрощують роботу з формами порівняно з ручним керуванням через <code>useState</code> + <code>try/catch</code>?',
          answer: '<code>useActionState</code> об\'єднує стан форми, статус pending і обробку помилок в один хук навколо async-функції (Server Action чи звичайної), автоматично керуючи прогресивним посиленням (форма працює навіть без JS через нативний <code>action</code>). <code>useOptimistic</code> дозволяє миттєво показати очікуваний результат мутації до підтвердження сервером і автоматично відкотити його при помилці — без ручного дублювання стану «оптимістичний vs підтверджений».',
        },
        {
          question: `Чим use() відрізняється від await у Server Component?`,
          answer: `use() можна викликати умовно і в Client Components (для Context/переданого Promise), await у Server Component — ні для Client.`,
        },
        {
          question: `React Compiler означає "більше не треба знати useMemo"?`,
          answer: `ні — для співбесіди й для дебагу edge-case'ів розуміння ручної мемоізації лишається обов'язковим.`,
        },
        {
          question: 'Навіщо <code>useFormStatus</code>, якщо <code>useActionState</code> вже повертає <code>isPending</code>?',
          answer: '<code>useActionState</code> дає <code>isPending</code> у тому компоненті, що <strong>оголошує</strong> екшен. <code>useFormStatus</code> читає стан найближчої батьківської <code>&lt;form&gt;</code> зсередини будь-якого дочірнього компонента — тобто кнопка чи спінер у власному файлі дізнається про pending без props-drilling. Обмеження: хук має викликатись у компоненті, відрендереному <em>всередині</em> <code>&lt;form&gt;</code>, а не в тому, що її рендерить.',
        },
        {
          question: 'Що змінилось з <code>forwardRef</code> у React 19?',
          answer: '<code>ref</code> став звичайним пропом функціонального компонента — <code>function Input({ ref }) {…}</code> замість <code>forwardRef((props, ref) => …)</code>. <code>forwardRef</code> ще працює для сумісності, але в новому коді не потрібен. Так само <code>&lt;Context&gt;</code> тепер можна рендерити напряму як провайдер, без <code>&lt;Context.Provider&gt;</code>.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React 19 — нове <span class="tag tag-new">React 19</span></h3>
  <p>Кожна фіча — окремо, з мінімальним прикладом.</p>
  <h3 class="topic"><code>use()</code> — читання Promise / Context під час рендеру</h3>
  <p>Не хук: можна викликати умовно, в циклі, після early return. Читає <code>Promise</code> (suspend до resolve, найближчий <code>&lt;Suspense&gt;</code> показує fallback, помилку ловить Error Boundary) або <code>Context</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise);   // suspends до resolve — без useState для loading
  return <ul>{comments.map(c => <li key={c.id}>{c.text}</li>)}</ul>;
}

function Toolbar() {
  if (isHidden) return null;               // useContext() тут кинув би помилку
  const theme = use(ThemeContext);         // use() можна після early return
  return <div className={theme} />;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic"><code>useActionState</code> — форма + pending + помилка в одному хуку</h3>
  <p>Обгортає async-функцію (Server Action чи звичайну). Форма працює навіть без JS через нативний <code>&lt;form action&gt;</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `async function updateName(prev: State, formData: FormData): Promise<State> {
  const error = await saveName(formData.get('name'));
  return error ? { error } : { ok: true };
}

function Form() {
  const [state, formAction, isPending] = useActionState(updateName, {});
  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic"><code>useOptimistic</code> — миттєве UI до відповіді сервера</h3>
  <p>Показує очікуваний результат одразу; при помилці екшену React сам відкочує до реального стану — без ручного «оптимістичний vs підтверджений».</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function Todos({ todos }: { todos: Todo[] }) {
  const [optimistic, addOptimistic] = useOptimistic(
    todos,
    (state, newText: string) => [...state, { id: 'temp', text: newText, pending: true }],
  );
  async function action(formData: FormData) {
    const text = formData.get('text') as string;
    addOptimistic(text);               // UI оновлюється негайно
    await saveTodo(text);              // помилка → optimistic відкотиться
  }
  return <form action={action}>{/* рендер optimistic */}</form>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic"><code>useFormStatus</code> — статус батьківської <code>&lt;form&gt;</code> без props-drilling</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Компонент кнопки читає стан форми, всередині якої він відрендерений —
// не отримуючи isPending пропом через кілька рівнів.
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Збереження…' : 'Зберегти'}</button>;
}
// <form action={action}><SubmitButton /></form>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic"><code>ref</code> як звичайний проп + <code>&lt;Context&gt;</code> як провайдер</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// React 19: forwardRef більше не потрібен — ref просто проп
function Input({ ref, ...props }: React.ComponentProps<'input'>) {
  return <input ref={ref} {...props} />;
}

// <Context> сам є провайдером — <Context.Provider> тепер зайве
const ThemeContext = createContext<Theme>('light');
<ThemeContext value="dark">{children}</ThemeContext>   // не <ThemeContext.Provider>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React Compiler</h3>
  <p>Build-time інструмент, що автоматично вставляє мемоізацію (еквівалент <code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code>) там, де компілятор бачить сенс — без ручного розставляння. Опційний, поступово стабілізується. <strong>Для співбесіди все одно треба розуміти ручну оптимізацію</strong> (Block 3) — Compiler не замінює розуміння referential stability, лише автоматизує рутину.</p>
  <h3 class="topic">Next.js 15 — зміни</h3>
  <div class="grid2">
    <div class="card"><h4>Async Request APIs</h4><pre style="font-size:10.5px"><span class="cmt">// Next 14: синхронні</span>
<span class="kw">const</span> { id } = params;
<span class="cmt">// Next 15: асинхронні (готують до майбутньої</span>
<span class="cmt">// стрімінгової моделі рендерингу)</span>
<span class="kw">const</span> { id } = <span class="kw">await</span> params;
<span class="kw">const</span> cookieStore = <span class="kw">await</span> <span class="fn">cookies</span>();</pre></div>
    <div class="card yellow"><h4>Дефолт кешування змінився</h4><p><code>fetch</code> та GET Route Handlers <strong>більше не кешуються за замовчуванням</strong> (раніше — force-cache). Явно вмикай через <code>cache: 'force-cache'</code> там, де кешування дійсно потрібне.</p></div>
  </div>
  `,
        },
      ],
    },
    {
      id: 'view-transitions',
      title: '🎬 View Transitions API',
      interviewQuestions: [
        {
          question: `Що робить компонент <ViewTransition> з react, і чим він відрізняється від виклику document.startViewTransition() вручну?`,
          answer: `<code>&lt;ViewTransition&gt;</code> — декларативна обгортка: React сам призначає елементам всередині <code>view-transition-name</code> і викликає <code>startViewTransition()</code> під капотом у потрібний момент рендеру, синхронізуючи анімацію зі станом React. Ручний виклик <code>startViewTransition()</code> — імперативний браузерний API, який треба координувати самостійно з циклом рендеру (легко розсинхронізувати знімок "до" з фактичним оновленням DOM).`,
        },
        {
          question: `Чому <ViewTransition>, вкладений усередину звичайного <div>, може не анімуватися при вході/виході?`,
          answer: `Правило розміщення: <code>&lt;ViewTransition&gt;</code> має бути найзовнішнішою обгorткою — з'являтися в DOM раніше за будь-який інший вузол свого піддерева, — щоб зафіксувати enter/exit. Якщо він вкладений усередину <code>&lt;div&gt;</code>, яка сама не входить/виходить із DOM, React не бачить структурної зміни на потрібному рівні, і перехід не спрацьовує.`,
        },
        {
          question: `Які з 4 тригерів анімації (enter/exit/update/share) активуються звичайним setState?`,
          answer: `Жоден — View Transitions потребують, щоб оновлення відбулось через <code>startTransition</code>, <code>useDeferredValue</code> або розкриття Suspense-межі. Лише тоді React обгортає DOM-мутацію у <code>startViewTransition()</code>, і спрацьовує один із чотирьох тригерів: <code>enter</code>, <code>exit</code>, <code>update</code> (мутація/зсув сусідів) чи <code>share</code> (той самий <code>name</code> демонтується і монтується в одному переході — морфінг).`,
        },
        {
          question: `Що таке "shared element transition", і як React визначає, що два <ViewTransition> — це "один і той самий" елемент?`,
          answer: `Спільне ім'я (<code>name</code>) на двох <code>&lt;ViewTransition&gt;</code>, з яких один демонтується, а інший монтується в межах одного переходу — React трактує це як морфінг "того самого об'єкта" (наприклад, мініатюра в гріді → фото на сторінці деталей), а не як окремі enter+exit.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Компонент &lt;ViewTransition&gt; <span class="tag tag-new">React 19.2+</span></h3>
  <p>Раніше плавні переходи між станами UI вимагали ручного виклику браузерного <code>document.startViewTransition()</code> і акуратної синхронізації з React-рендером. Компонент <code>&lt;ViewTransition&gt;</code> з <code>react</code> робить це декларативно: обгортаєш вміст, а React сам призначає йому <code>view-transition-name</code> і викликає браузерний API в потрібний момент — <strong>ти ніколи не звертаєшся до <code>startViewTransition()</code> напряму</strong>.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Правило розміщення:</strong> <code>&lt;ViewTransition&gt;</code> має бути <em>найзовнішнішою</em> обгorткою — з'являтися в DOM раніше за будь-який інший вузол свого піддерева, — щоб enter/exit спрацювали. Обгортання його всередину звичайного <code>&lt;div&gt;</code>, яка сама не монтується/демонтується, ламає це правило.</span></div>
  <h3 class="topic">4 тригери анімації <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Тригер</th><th>Коли</th><th>Приклад</th></tr>
      <tr><td><code>enter</code></td><td>Вузол вперше вставлено в DOM</td><td>Новий елемент списку з'явився</td></tr>
      <tr><td><code>exit</code></td><td>Вузол вперше видалено з DOM</td><td>Toast закрився, елемент видалено</td></tr>
      <tr><td><code>update</code></td><td>Мутація всередині або зсув сусідів (reflow)</td><td>Розмір/позиція картки змінились</td></tr>
      <tr><td><code>share</code></td><td>Іменований VT демонтується, і VT з тим самим <code>name</code> монтується в тому самому переході</td><td>Мініатюра → фото на сторінці деталей (морфінг)</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Активують перехід лише <code>startTransition</code>, <code>useDeferredValue</code> та розкриття <code>&lt;Suspense&gt;</code>-межі. Звичайний <code>setState</code> оновлює DOM миттєво, без анімації.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Чек-лист розпізнавання патерна <span class="tag tag-key">KEY</span></h3>
  <p>Перш ніж писати CSS, визнач, який із 5 патернів перед тобою — це визначає, чи потрібне спільне <code>name</code>, чи достатньо enter/exit:</p>
  <div class="table-wrap">
    <table>
      <tr><th>Патерн</th><th>Сигнал</th></tr>
      <tr><td><strong>Shared element</strong></td><td>"Той самий об'єкт іде глибше" — однаковий <code>name</code> на елементі, що демонтується, і на тому, що монтується</td></tr>
      <tr><td><strong>Suspense reveal</strong></td><td>"Дані завантажились" — контент, що виходить із fallback</td></tr>
      <tr><td><strong>List identity</strong></td><td>"Ті самі елементи переставились" — стабільний <code>key</code> на кожному айтемі списку</td></tr>
      <tr><td><strong>State change</strong></td><td>"Щось з'явилось/зникло" — прості enter/exit без спільного <code>name</code></td></tr>
      <tr><td><strong>Route change</strong></td><td>Перехід на рівні цілої сторінки</td></tr>
    </table>
  </div>
  <h3 class="topic">Стилізація через CSS pseudo-elements</h3>
  <p>Браузер робить знімки "до" і "після" і монтує їх як псевдоелементи, які стилізуються звичайним CSS/<code>@keyframes</code>:</p>
  <ul>
    <li><code>::view-transition-old(name)</code> — знімок стану "до"</li>
    <li><code>::view-transition-new(name)</code> — знімок стану "після"</li>
    <li><code>::view-transition-group(name)</code> — контейнер, що анімує позицію/розмір</li>
    <li><code>::view-transition-image-pair(name)</code> — пара old+new разом (crossfade)</li>
  </ul>
  <h3 class="topic">Next.js та доступність</h3>
  <p>У Next.js потрібен прапорець <code>experimental.viewTransition</code> у <code>next.config.js</code>; проп <code>transitionTypes</code> на <code>next/link</code>/<code>useRouter().push()</code> дозволяє позначити тип переходу (напр. <code>"forward"</code> vs <code>"back"</code>) і по-різному стилізувати напрямок навігації.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span>Завжди супроводжуй анімації <code>@media (prefers-reduced-motion: reduce)</code> — для частини користувачів анімації переходів мають бути вимкнені чи спрощені.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { unstable_ViewTransition as ViewTransition } from 'react';

function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid">
      {photos.map(photo => (
        // спільний name → морфінг у деталі при переході на /photo/[id]
        <ViewTransition key={photo.id} name={\`photo-\${photo.id}\`}>
          <Link href={\`/photo/\${photo.id}\`}>
            <img src={photo.thumbUrl} alt={photo.title} />
          </Link>
        </ViewTransition>
      ))}
    </div>
  );
}

function PhotoDetail({ photo }: { photo: Photo }) {
  return (
    // той самий name на іншій сторінці — React бачить це як "той самий об'єкт"
    <ViewTransition name={\`photo-\${photo.id}\`}>
      <img src={photo.fullUrl} alt={photo.title} />
    </ViewTransition>
  );
}`,
        },
      ],
    },
    /* ============================= BLOCK 7 — ТЕСТУВАННЯ ТА ЕКОСИСТЕМА ============================= */
    {
      id: 'testing-react-components',
      title: '🧪 Тестування React-компонентів',
      interviewQuestions: [
        {
          question: 'Чому React Testing Library свідомо не дає доступу до внутрішнього стану компонента чи його інстансу (на відміну від старого Enzyme з <code>shallow</code>/<code>.state()</code>)?',
          answer: 'Філософія RTL — "чим більше твої тести нагадують те, як застосунок використовує користувач, тим більше впевненості вони дають". Тест, що читає внутрішній <code>state</code> чи викликає приватний метод напряму, лишається зеленим навіть якщо повністю переписати реалізацію компонента (з класу на хуки, змінити назву стейта) — це тест <em>деталей реалізації</em>, а не поведінки. RTL надає лише API, доступний і користувачу: знайти текст/роль на екрані, клікнути, ввести текст, перевірити, що з\'явилось на екрані.',
        },
        {
          question: 'У чому різниця між <code>getBy</code>, <code>queryBy</code> і <code>findBy</code> у RTL, і коли використовувати кожен?',
          answer: '<code>getBy*</code> — синхронний пошук, кидає помилку одразу, якщо елемент не знайдено (для перевірки "елемент має бути на екрані вже зараз"). <code>queryBy*</code> — синхронний, повертає <code>null</code>, якщо не знайдено, замість помилки — єдиний правильний спосіб перевірити <strong>відсутність</strong> елемента (<code>expect(queryByText(...)).not.toBeInTheDocument()</code>; <code>getBy</code> тут би одразу впав з помилкою). <code>findBy*</code> — асинхронний (повертає проміс, ретраїть до таймауту) — для елементів, що з\'являються <em>після</em> асинхронної дії (запит, <code>setTimeout</code>).',
        },
        {
          question: 'Чому <code>userEvent</code> кращий за <code>fireEvent</code> за замовчуванням?',
          answer: '<code>fireEvent</code> диспатчить <em>одну</em> сиру DOM-подію (напр. <code>change</code>). <code>userEvent</code> імітує <strong>повний ланцюг</strong>, який породжує реальна взаємодія: на ввід літери — <code>keydown → keypress → input → keyup</code>, на клік — <code>pointerdown → mousedown → focus → mouseup → click</code>, плюс перевіряє, чи елемент видимий і не <code>disabled</code>. Тому <code>userEvent</code> ловить баги, які <code>fireEvent</code> пропускає (напр. обробник висить на <code>keydown</code>, а не на <code>change</code>). <code>userEvent</code> v14+ асинхронний — кожну дію треба <code>await</code>.',
        },
        {
          question: 'Як правильно тестувати кастомний хук, якщо в ньому немає JSX для рендеру?',
          answer: 'Через <code>renderHook</code> з <code>@testing-library/react</code> — він монтує хук у мінімальному тестовому компоненті-обгортці й повертає <code>result.current</code> (поточне значення, яке повернув хук) та <code>rerender</code>/<code>act</code> для симуляції оновлень. Зміни стану всередині хука (виклик функції, що робить <code>setState</code>) треба обгортати в <code>act()</code>, інакше React попереджає, що оновлення відбулось поза контрольованим тестовим середовищем, і DOM може не встигнути синхронізуватись до наступної перевірки.',
        },
        {
          question: 'Чим підхід MSW (Mock Service Worker) до тестування запитів у компонентах відрізняється від <code>jest.mock(\'./api\')</code>?',
          answer: '<code>jest.mock</code> підміняє сам JS-модуль з функцією запиту — компонент викликає вже не справжній <code>fetch</code>/<code>axios</code>, а мок-функцію; тест перевіряє лише те, що модуль викликаний з правильними аргументами. MSW перехоплює запит на мережевому рівні (сервіс-воркер чи Node-інтерсептор) — компонент виконує <strong>реальний</strong> <code>fetch</code>, і лише мережевий рівень підміняється, тому тестується весь шлях (серіалізація URL, заголовки, обробка помилкового статусу) так само, як у продакшні, а не лише "чи викликана функція".',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Тестуй поведінку, а не імплементацію <span class="tag tag-key">KEY</span></h3>
  <p>Головна філософія сучасного тестування React (Kent C. Dodds): <em>«чим більше твої тести нагадують те, як софтом користуються насправді, тим більше впевненості вони дають»</em>. Тестуй <strong>behavior</strong> — що бачить і робить користувач, — а не <strong>implementation details</strong>: внутрішній стан, назви методів, кількість ре-рендерів.</p>
  <div class="grid2">
    <div class="card red"><h4>❌ Implementation details</h4><p>Ламається при рефакторингу без зміни поведінки. Enzyme заохочував саме це (<code>.state()</code>, <code>.instance()</code>, <code>shallow</code>) → крихкі тести.</p></div>
    <div class="card green"><h4>✅ Behavior</h4><p>Переживає рефакторинг (клас → хуки, перейменування стейта). Знайти по ролі/тексту, клікнути, перевірити, що на екрані.</p></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Той самий сценарій: деталь реалізації проти поведінки',
          code: `// ❌ Implementation details — ламається при рефакторингу
expect(wrapper.state('isOpen')).toBe(true);

// ✅ Behavior — виживає рефакторинг
await user.click(screen.getByRole('button', { name: /open menu/i }));
expect(screen.getByRole('menu')).toBeVisible();`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Testing Trophy — не піраміда</h3>
  <p>Для фронтенду актуальніша модель за піраміду — <strong>Testing Trophy</strong> Кента Доддса:</p>
  <div class="table-wrap">
    <table>
      <tr><th>Шар</th><th>Обсяг</th><th>Чим</th></tr>
      <tr><td>Static</td><td>база</td><td>TypeScript, ESLint</td></tr>
      <tr><td>Unit</td><td>помірно</td><td>утиліти, хуки, reducer'и</td></tr>
      <tr><td><strong>Integration</strong></td><td><strong>більшість</strong></td><td>рендер компонента з реальними дітьми, взаємодія, перевірка результату (RTL)</td></tr>
      <tr><td>E2E</td><td>мало</td><td>Playwright — критичні flow у реальному браузері</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Найбільше впевненості на одиницю зусиль дають <strong>integration-тести</strong> — саме на них має припадати основна маса тестів фронту.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Стек (2026)</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Інструмент</th><th>Роль</th></tr>
      <tr><td><strong>Vitest</strong></td><td>Test runner — сучасний стандарт, швидший за Jest, нативний ESM, ділить конфіг трансформації з Vite</td></tr>
      <tr><td><strong>Jest</strong></td><td>Test runner — досі поширений (Next legacy, CRA)</td></tr>
      <tr><td><strong>React Testing Library</strong></td><td>Рендер + запити до DOM</td></tr>
      <tr><td><code>@testing-library/user-event</code></td><td>Симуляція взаємодії (краще за <code>fireEvent</code>)</td></tr>
      <tr><td><code>@testing-library/jest-dom</code></td><td>Matchers: <code>toBeInTheDocument</code>, <code>toBeVisible</code></td></tr>
      <tr><td><strong>MSW</strong></td><td>Мокання мережі на рівні network</td></tr>
      <tr><td><strong>Playwright</strong></td><td>E2E у реальному браузері</td></tr>
    </table>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Enzyme мертвий</strong> — немає підтримки React 18+. Behavior-testing через RTL — індустріальний стандарт.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Queries: getBy / queryBy / findBy <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Варіант</th><th>Якщо елемента нема</th><th>Async</th><th>Use case</th></tr>
      <tr><td><code>getBy…</code></td><td>кидає error</td><td>ні</td><td>елемент має бути зараз</td></tr>
      <tr><td><code>queryBy…</code></td><td>повертає <code>null</code></td><td>ні</td><td>перевірка <strong>відсутності</strong></td></tr>
      <tr><td><code>findBy…</code></td><td>кидає error (після таймауту)</td><td>так</td><td>елемент з'явиться async</td></tr>
    </table>
  </div>
  <p><strong>Порядок пріоритету запитів</strong> (сигнал seniority): <code>getByRole</code> → <code>getByLabelText</code> → <code>getByPlaceholderText</code> → <code>getByText</code> → … → <code>getByTestId</code> (останній resort — <code>data-testid</code> невидимий користувачу).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Три варіанти запиту — коли який',
          code: `const btn = screen.getByRole('button', { name: /submit/i });   // є зараз
expect(screen.queryByText('Error')).not.toBeInTheDocument();    // відсутність
const item = await screen.findByText('Loaded');                 // async поява`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">userEvent &gt; fireEvent</h3>
  <p><code>fireEvent.change(input, …)</code> диспатчить <em>одну</em> синтетичну подію. <code>userEvent</code> імітує реальну послідовність (<code>focus → keydown → input → keyup</code> на кожну літеру, pointer-події на клік) — ловить баги, яких одна подія не покаже. <code>userEvent</code> v14+ асинхронний; за замовчуванням завжди він.</p>
  <div class="alert"><span class="icon">🧭</span><span><strong>AAA-патерн:</strong> Arrange (<code>render</code> + <code>userEvent.setup()</code>) → Act (взаємодія) → Assert (перевірка DOM).</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Базовий приклад (AAA): рендер, взаємодія, асинхронне очікування',
          code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('показує помилку при невалідному email', async () => {
  const user = userEvent.setup();            // Arrange
  render(<SignupForm />);

  await user.type(screen.getByLabelText(/email/i), 'not-an-email');  // Act
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Assert: findBy — асинхронний, чекає появи помилки після валідації
  expect(await screen.findByText(/невалідний email/i)).toBeInTheDocument();
  // queryBy — правильний спосіб перевірити ВІДСУТНІСТЬ елемента
  expect(screen.queryByText(/успішно/i)).not.toBeInTheDocument();
});`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Async + мережа через MSW</h3>
  <p>Не мокай <code>fetch</code> вручну — перехоплюй на рівні мережі. Компонент виконує <strong>справжній</strong> запит, підміняється лише транспорт, тому тестується весь шлях (URL, заголовки, обробка статусу). Той самий mock працює в тестах, Storybook і dev — на відміну від <code>jest.mock('axios')</code>, не прив'язаний до конкретного HTTP-клієнта.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><code>afterEach(() =&gt; server.resetHandlers())</code> — обов'язково: скидає per-test оверайди (<code>server.use(…)</code>), інакше тести течуть один в одного.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users/:id', ({ params }) =>
    HttpResponse.json({ id: params.id, name: 'Ada' }),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());   // ізоляція тестів!
afterAll(() => server.close());

test('рендерить користувача після завантаження', async () => {
  render(<UserProfile userId="1" />);
  expect(await screen.findByText('Ada')).toBeInTheDocument();
});

test('показує помилку при 500', async () => {
  server.use(
    http.get('/api/users/:id', () => new HttpResponse(null, { status: 500 })),
  );
  render(<UserProfile userId="1" />);
  expect(await screen.findByText(/щось пішло не так/i)).toBeInTheDocument();
});`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">waitFor / findBy / act</h3>
  <ul>
    <li><code>await screen.findByText('Done')</code> — чекаєш появу елемента</li>
    <li><code>await waitFor(() =&gt; expect(mockFn).toHaveBeenCalled())</code> — довільна умова</li>
    <li><code>await waitForElementToBeRemoved(() =&gt; screen.queryByText(/loading/i))</code> — зникнення</li>
  </ul>
  <div class="alert warn"><span class="icon">⚠️</span><span>Warning <code>"not wrapped in act(...)"</code> майже завжди = <strong>забув <code>await</code></strong> на async-оновленні стану (<code>findBy</code>/<code>waitFor</code>). RTL авто-обгортає <code>render</code> і <code>userEvent</code> сам.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'renderHook: синхронний і async хук; result.current — свіже значення (getter)',
          code: `import { renderHook, act, waitFor } from '@testing-library/react';

test('useCounter збільшує значення', () => {
  const { result } = renderHook(() => useCounter(0));
  act(() => result.current.increment());  // act потрібен явно поза event-handler
  expect(result.current.count).toBe(1);
});

test('useFetch завантажує дані', async () => {
  const { result } = renderHook(() => useFetch('/api/data'));
  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current.status).toBe('success'));
});`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Провайдери: custom render wrapper</h3>
  <p>Реальні компоненти залежать від context / router / store. Senior-патерн — власний <code>render</code>, що загортає UI в потрібні провайдери з тестовими налаштуваннями (<code>retry: false</code> у QueryClient, <code>MemoryRouter</code> з початковим маршрутом).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// test-utils.tsx
function customRender(ui: React.ReactElement, { route = '/', ...options } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },  // не ретраїти в тестах!
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { customRender as render };  // тести імпортують render звідси, не з RTL`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Антипатерни — що НЕ тестувати</h3>
  <ul>
    <li><strong>Implementation details</strong> — state, назви функцій, кількість ре-рендерів</li>
    <li><strong>Сторонні бібліотеки</strong> — не тестуй, що React Router навігує; тестуй, що <em>твій</em> код реагує</li>
    <li><strong>Дитячі компоненти</strong> — зазвичай не мокай (це integration); мокай лише важке/зовнішнє (карти, чарти, платіжні iframe) через <code>vi.mock()</code></li>
    <li><strong>Великі snapshot-тести</strong> — нічого не ловлять, усі роблять <code>--update</code>. Точково для малих виводів</li>
    <li><code>container.querySelector('.class')</code> — прив'язка до CSS крихка, юзай role/text</li>
    <li><strong>Coverage-driven</strong> — 100% coverage ≠ якість</li>
  </ul>
  <div class="alert good"><span class="icon">✅</span><span><strong>a11y:</strong> <code>getByRole</code> вже змушує писати доступний markup; додатково — <code>jest-axe</code>: <code>expect(await axe(container)).toHaveNoViolations()</code>.</span></div>
  <div class="alert"><span class="icon">⏱️</span><span><strong>Debounce/throttle:</strong> <code>vi.useFakeTimers()</code> + <code>vi.advanceTimersByTime(300)</code>; з <code>userEvent</code> v14 — <code>setup({ advanceTimers: vi.advanceTimersByTime })</code>, наприкінці <code>vi.useRealTimers()</code>.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'a11y через jest-axe та fake timers для debounce',
          code: `import { axe } from 'jest-axe';

test('немає порушень доступності', async () => {
  const { container } = render(<SignupForm />);
  expect(await axe(container)).toHaveNoViolations();
});

test('debounce: запит іде один раз після паузи', async () => {
  vi.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  render(<Search />);
  await user.type(screen.getByRole('searchbox'), 'react');
  vi.advanceTimersByTime(300);

  expect(fetchSpy).toHaveBeenCalledTimes(1);
  vi.useRealTimers();
});`,
        },
      ],
    },
    {
      id: 'i18n-localization',
      title: '🌐 Локалізація (i18n) React-застосунку',
      interviewQuestions: [
        {
          question: 'У чому різниця між <code>i18n</code>, <code>l10n</code> і <code>locale</code>, і чому <code>en-US ≠ en-GB</code>?',
          answer: '<strong>i18n</strong> (internationalization) — <em>підготовка</em> коду: винесення рядків, підтримка плюрал-правил, форматів дат/чисел/валют, RTL. Робиться раз розробником. <strong>l10n</strong> (localization) — <em>власне переклад</em> під конкретну locale, робота перекладачів. <strong>locale</strong> — мова + регіон, а не лише мова: <code>en-US</code> і <code>en-GB</code> мають різний формат дати (<code>MM/DD</code> vs <code>DD/MM</code>), валюту ($ vs £), розділювачі тисяч. Тому форматувати треба за повною locale, а не за кодом мови.',
        },
        {
          question: 'Чому <code>count === 1 ? "item" : "items"</code> — це баг, і як робити плюралізацію правильно?',
          answer: 'Такий тернарник припускає 2 форми множини (як в англійській), але українська, польська, російська мають <strong>3 форми</strong> (one / few / many: «1 товар», «2 товари», «5 товарів»), арабська — 6. Правильно — <strong>CLDR plural rules</strong> через нативний <code>Intl.PluralRules</code>: i18next сам обирає форму за суфіксом ключа (<code>_one</code>/<code>_few</code>/<code>_many</code>/<code>_other</code>) залежно від <code>count</code> і активної locale. Власну логіку множини писати не треба ніколи.',
        },
        {
          question: 'Як вставити посилання чи <code>&lt;strong&gt;</code> всередину перекладеного речення, не розриваючи рядок на шматки?',
          answer: 'Компонент <code>&lt;Trans&gt;</code> з react-i18next: розмітка лишається в JSX, а переклад містить лише <strong>індекси</strong> дочірніх елементів (<code>&lt;1&gt;текст посилання&lt;/1&gt;</code>). i18next підставляє реальні елементи за позицією. Перекладач редагує суцільний рядок з плейсхолдерами, розробник не конкатенує <code>t("Click ") + &lt;a&gt; + t(" here")</code> (що ламає порядок слів у багатьох мовах).',
        },
        {
          question: 'Чому не можна просто заімпортувати всі JSON-словники всіх мов, і як це вирішують?',
          answer: 'Кожна мова + кожен namespace — це кілобайти в бандлі; 10 мов × 5 модулів у головному чанку роздують first load. Рішення: <strong>lazy-load</strong> — <code>i18next-http-backend</code> вантажить <code>/locales/{{lng}}/{{ns}}.json</code> по потребі; <code>useTranslation("checkout")</code> підтягує <code>checkout.json</code> лише коли компонент рендериться; у головний бандл не потрапляє жоден переклад, лише активна locale. Це частина роботи над bundle-size.',
        },
        {
          question: 'Чому для Next.js локалізовані URL-сегменти (<code>/uk/about</code>) + переклад на сервері кращі за client-side перемикання?',
          answer: 'Переклад у Server Components резолвиться на сервері й потрапляє в <strong>HTML до гідрації</strong> — пошуковик і користувач без JS бачать перекладений контент одразу (client-only i18n віддає порожні ключі в SSR-HTML). Локалізований URL — окрема індексована сторінка на мову, на відміну від <code>?lang=uk</code>, який Google ігнорує. Плюс обовʼязкові <code>&lt;html lang&gt;</code> і <code>hreflang</code> alternate-теги, щоб видача показувала правильну мовну версію.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">i18n · l10n · locale — три різні речі <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card blue"><h4>i18n — internationalization</h4><p><em>Підготовка</em> коду до перекладу: винесення рядків, плюрал-правила, формати дат/чисел, RTL. Раз, розробником.</p></div>
    <div class="card green"><h4>l10n — localization</h4><p><em>Власне переклад</em> під конкретну locale (uk-UA, en-US). Робота перекладачів, не коду.</p></div>
  </div>
  <p><strong>locale</strong> — мова + регіон, не лише мова: <code>en-US</code> ≠ <code>en-GB</code> (формат дати, валюта, розділювачі тисяч).</p>
  <div class="alert"><span class="icon">💡</span><span>Сигнал seniority — розуміти, що i18n це <strong>не просто словник рядків</strong>, а плюрал-правила, формати, напрямок тексту, SEO і code-splitting перекладів.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Вибір бібліотеки</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Бібліотека</th><th>Коли обирати</th></tr>
      <tr><td><strong>react-i18next</strong> (+ i18next)</td><td>Дефолт для SPA/CSR. Найбагатша екосистема: language detection, backend-loading, namespaces</td></tr>
      <tr><td><strong>react-intl</strong> (FormatJS)</td><td>Суворі ICU-повідомлення, промислове форматування; поширена в enterprise</td></tr>
      <tr><td><strong>next-intl</strong> / <strong>next-i18next</strong></td><td>Next.js: App Router → <code>next-intl</code>, Pages Router → <code>next-i18next</code></td></tr>
      <tr><td><strong>Lingui</strong></td><td>Компіляція повідомлень, менший рантайм, DX з макросами</td></tr>
      <tr><td>Нативний <code>Intl</code> API</td><td>Форматування дат/чисел/множини <em>без</em> бібліотеки — вбудований у браузер</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Дефолт: <strong>react-i18next</strong> для SPA, <strong>next-intl</strong> для Next.js App Router.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Структура перекладів + namespaces</h3>
  <p><strong>Namespaces</strong> (<code>common</code>, <code>auth</code>, <code>checkout</code>) — розбивка словника на модулі: логічна структура + можливість вантажити лише потрібний файл, а не весь словник. Прямий аналог feature-based модулів.</p>`,
        },
        {
          kind: 'code',
          language: 'json',
          caption: 'src/locales/en/common.json — вкладені ключі та плюрал-форми',
          code: `{
  "greeting": "Hello, {{name}}!",
  "cart": {
    "empty": "Your cart is empty",
    "items_one": "{{count}} item",
    "items_other": "{{count}} items"
  }
}`,
        },
        {
          kind: 'code',
          language: 'js',
          caption: 'i18n.js — ініціалізація react-i18next',
          code: `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)        // lazy-load JSON по мережі
  .use(LanguageDetector)   // визначити мову: localStorage -> navigator -> ...
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    ns: ['common', 'auth'],
    defaultNS: 'common',
    interpolation: { escapeValue: false }, // React вже екранує XSS
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  });

export default i18n;`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Використання в компоненті + перемикання мови',
          code: `import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation('common');

  return (
    <header>
      <h1>{t('greeting', { name: 'Roman' })}</h1>
      <button onClick={() => i18n.changeLanguage('uk')}>UA</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </header>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Плюралізація — не пиши власну логіку <span class="tag tag-key">KEY</span></h3>
  <div class="alert warn"><span class="icon">⚠️</span><span><code>count === 1 ? 'item' : 'items'</code> ламається для мов зі складними правилами: українська, польська, російська мають <strong>3 форми</strong>, арабська — 6.</span></div>
  <p>i18next обирає форму за <strong>CLDR plural rules</strong> через нативний <code>Intl.PluralRules</code> — за суфіксами ключів <code>_one</code> / <code>_few</code> / <code>_many</code> / <code>_other</code> залежно від <code>count</code> і активної locale.</p>`,
        },
        {
          kind: 'code',
          language: 'json',
          caption: 'Плюрал-ключі: en (2 форми) проти uk (3 форми)',
          code: `{
  "en": {
    "items_one": "{{count}} item",
    "items_other": "{{count}} items"
  },
  "uk": {
    "items_one": "{{count}} товар",
    "items_few": "{{count}} товари",
    "items_many": "{{count}} товарів"
  }
}`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Форму обирає i18next за CLDR — виклик однаковий',
          code: `t('items', { count: 1 }); // "1 товар"
t('items', { count: 3 }); // "3 товари"
t('items', { count: 5 }); // "5 товарів"`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">&lt;Trans&gt; — JSX усередині перекладу</h3>
  <p>Як перекласти <code>"Click &lt;a&gt;here&lt;/a&gt; to continue"</code> не розриваючи рядок на <code>t("Click ") + &lt;a&gt; + t(" here")</code> (це ламає порядок слів у багатьох мовах)? <code>&lt;Trans&gt;</code> лишає розмітку в JSX, а переклад містить лише <strong>індекси</strong> дочірніх елементів.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Індекс 1 = другий дочірній елемент (посилання)',
          code: `// JSX
<Trans i18nKey="terms">
  I accept the <a href="/terms">terms and conditions</a>
</Trans>

// uk/common.json
// { "terms": "Я приймаю <1>умови та положення</1>" }`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Формати дат, чисел, валют — через <code>Intl</code>, не хардкод</h3>
  <p>Не хардкодь формати рядками. Нативний <code>Intl</code> знає правила кожної locale: позицію символу валюти, розділювачі, порядок компонентів дати.</p>`,
        },
        {
          kind: 'code',
          language: 'js',
          caption: 'Нативний Intl API + інтеграція в i18next',
          code: `new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'EUR' })
  .format(1234.5);                    // "1 234,50 €"

new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
  .format(new Date());               // "August 30, 2026"

new Intl.RelativeTimeFormat('uk', { numeric: 'auto' })
  .format(-1, 'day');                // "вчора"

// i18next прокидує ці опції через formatParams:
t('price', {
  val: 1234.5,
  formatParams: { val: { style: 'currency', currency: 'EUR' } },
});`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">RTL — арабська, іврит</h3>
  <p>Два кроки: (1) виставити напрямок на <code>&lt;html&gt;</code> при зміні мови, (2) писати CSS через <strong>logical properties</strong> — тоді layout дзеркалиться сам, без окремого RTL-стайлшита.</p>
  <div class="alert"><span class="icon">🧭</span><span><code>margin-inline-start</code> замість <code>margin-left</code>, <code>padding-inline-end</code> замість <code>padding-right</code>, <code>text-align: start</code> замість <code>left</code>.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `useEffect(() => {
  document.dir = i18n.dir(); // 'ltr' | 'rtl' — i18next знає напрямок locale
}, [i18n.language]);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Продуктивність: lazy-load перекладів</h3>
  <ul>
    <li><strong>HttpBackend</strong> вантажить JSON по потребі (<code>loadPath</code>)</li>
    <li><strong>Namespace on demand:</strong> <code>useTranslation('checkout')</code> завантажить <code>checkout.json</code> лише коли компонент відрендериться</li>
    <li><strong>Code splitting:</strong> у головний бандл не потрапляє жоден переклад, лише активна locale</li>
  </ul>
  <div class="alert"><span class="icon">💡</span><span>Переклади — часто недооцінена вага бандла. Розбивка по namespaces + lazy-load — частина роботи над bundle-size.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'ready — namespace ще вантажиться',
          code: `const { t, ready } = useTranslation('checkout');
if (!ready) return <Spinner />;`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Next.js специфіка + SEO <span class="tag tag-key">KEY</span></h3>
  <p><strong>App Router (<code>next-intl</code>):</strong> locale у сегменті шляху (<code>/uk/about</code>), <code>middleware.ts</code> для detection і редіректу, переклади резолвляться на сервері в Server Components → у HTML <em>до</em> гідрації.</p>
  <div class="table-wrap">
    <table>
      <tr><th>SEO must-have</th><th>Навіщо</th></tr>
      <tr><td><code>&lt;html lang={locale}&gt;</code></td><td>Пошуковик і screen reader знають мову сторінки</td></tr>
      <tr><td><code>hreflang</code> alternate-теги</td><td>Google показує правильну мовну версію у видачі</td></tr>
      <tr><td>Локалізовані URL (<code>/uk/...</code>)</td><td>Кожна мова — окремий індексований URL; <strong>не</strong> query-параметр</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'app/[locale]/page.tsx — переклад на сервері',
          code: `import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('common');
  return <h1>{t('greeting', { name: 'Roman' })}</h1>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">TypeScript: типобезпечні ключі</h3>
  <p>Типізуй ключі, щоб <code>t('wrong.key')</code> давав помилку компіляції + автокомпліт по всіх наявних ключах:</p>`,
        },
        {
          kind: 'code',
          language: 'ts',
          caption: 'i18next.d.ts',
          code: `import 'i18next';
import common from './locales/en/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: { common: typeof common };
  }
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Процес і тулінг</h3>
  <ul>
    <li><strong>Не редагуй переклади вручну в проді</strong> — TMS (Translation Management System): Lokalise, Crowdin, Phrase</li>
    <li><strong>Структуровані ключі</strong> (<code>cart.empty</code>), а не англійський текст як ID — стабільніші при зміні формулювання</li>
    <li><code>i18next-parser</code> витягує ключі з коду → знаходить пропущені й невикористані переклади (lint)</li>
    <li><strong>Fallback chain:</strong> <code>uk → en → ключ</code>. Ніколи не показуй сирий ключ користувачу в проді</li>
  </ul>
  <div class="alert warn"><span class="icon">⚠️</span><span>У тестах <strong>не мокай <code>t</code> як <code>key =&gt; key</code></strong> — це ховає баги інтерполяції та плюралів. Використовуй реальний instance з мінімальним тестовим словником.</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Тест i18n — реальний instance, не мок t',
          code: `import { I18nextProvider } from 'react-i18next';
import i18n from './test-i18n';

i18n.init({
  lng: 'en',
  resources: { en: { common: { greeting: 'Hi {{name}}' } } },
});

test('вітає користувача на активній мові', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <Header />
    </I18nextProvider>,
  );
  expect(screen.getByText('Hi Roman')).toBeInTheDocument();
});`,
        },
      ],
    },
    {
      id: 'react-native-ecosystem',
      title: '📱 React Native та поза-браузерні рендерери',
      interviewQuestions: [
        {
          question: 'Що саме React Native "перевикористовує" від React, а що в ньому повністю інше порівняно з React DOM?',
          answer: 'Перевикористовується <strong>модель компонентів</strong> — JSX, <code>props</code>/<code>state</code>, хуки, реконсиляція/Fiber-планувальник працюють ідентично. Повністю інше — <strong>рендерер</strong>: замість DOM-вузлів (<code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>) React Native рендерить справжні нативні UI-компоненти платформи (<code>&lt;View&gt;</code> → <code>UIView</code> на iOS / <code>android.view.View</code> на Android), а замість CSS — підмножина Flexbox-стилів через <code>StyleSheet</code>. Тобто React — це "мова опису дерева інтерфейсу й моделі оновлень", а куди саме це дерево промальовується (DOM чи нативні віджети) — питання конкретного рендерера.',
        },
        {
          question: 'Що таке "New Architecture" (Fabric + TurboModules) у React Native, і яку проблему старого моста (bridge) вона вирішує?',
          answer: 'Стара архітектура спілкувалась між JS-потоком і нативним UI-потоком через асинхронний <strong>bridge</strong>, серіалізуючи виклики в JSON — це створювало затримку й "бутилкове горлечко" для UI, що вимагає високої частоти оновлень (жести, анімації, скрол). Fabric (новий рендерер) і TurboModules (нативні модулі) переходять на <strong>JSI (JavaScript Interface)</strong> — прямі синхронні виклики між JS і нативним кодом без серіалізації через міст, що прибирає затримку й дозволяє JS напряму тримати посилання на нативні об\'єкти.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React Native — той самий React, інший рендерер <span class="tag tag-key">KEY</span></h3>
  <p>Компонентна модель, JSX, хуки, реконсиляція — ідентичні React DOM. Відмінність — <strong>куди</strong> React рендерить дерево: замість DOM-вузлів у браузері React Native промальовує справжні нативні UI-компоненти iOS/Android через власний рендерер.</p>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>React DOM</th><th>React Native</th></tr>
      <tr><td>Що рендериться</td><td>DOM-вузли (<code>div</code>, <code>span</code>)</td><td>Нативні UI-компоненти (<code>UIView</code>/<code>android.view</code>)</td></tr>
      <tr><td>Розмітка</td><td><code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;button&gt;</code></td><td><code>&lt;View&gt;</code>, <code>&lt;Text&gt;</code>, <code>&lt;Pressable&gt;</code></td></tr>
      <tr><td>Стилі</td><td>CSS / CSS-in-JS / Tailwind</td><td><code>StyleSheet</code> — підмножина Flexbox, без CSS-каскаду</td></tr>
      <tr><td>Навігація</td><td>React Router / Next.js</td><td>React Navigation (свій стек екранів, не History API)</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Той самий компонентний код — інші теги замість DOM-елементів',
          code: `import { View, Text, Pressable, StyleSheet } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0); // useState — той самий хук

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{count}</Text>
      <Pressable onPress={() => setCount(c => c + 1)}>
        <Text>+1</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 18, fontWeight: 'bold' },
});`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Expo — стандартний старт для React Native</h3>
  <p><strong>Expo</strong> — набір інструментів і сервісів над React Native (CLI, готові нативні модулі, OTA-оновлення без ре-білду в сторі, збірка в хмарі), що прибирає потребу одразу возитись з Xcode/Android Studio. Сьогодні — типова відправна точка для нового RN-проєкту; "eject" у голий React Native CLI лишається опцією, коли потрібен нативний модуль поза екосистемою Expo.</p>
  <div class="alert"><span class="icon">📜</span><span><strong>Історична довідка — React VR:</strong> експериментальний фреймворк Meta (2017) для рендеру React-компонентів у WebVR/3D-сценах. Проєкт офіційно припинено — поглинений напрямом <strong>React 360</strong>, який також більше не розвивається. Сьогодні для VR/3D у вебі використовують <code>react-three-fiber</code> (React-рендерер поверх Three.js) — питання про React VR на співбесіді, як правило, перевіряє саме знання, що технологія застаріла.</span></div>`,
        },
        {
          kind: 'links',
          title: 'Хочеш глибше — окремий курс',
          items: [
            {
              href: '/react-native',
              title: '📱 React Native — повний курс',
              description:
                'Expo vs bare workflow, Flexbox-стилі, навігація (React Navigation / Expo Router), нативні API та дозволи, Hermes і продуктивність списків, тестування (Detox/Maestro) та деплой через EAS — усе, що не влізло в цей короткий вступ.',
            },
          ],
        },
      ],
    },
  ],
}
