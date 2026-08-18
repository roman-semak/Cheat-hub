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
  <p><strong>Головний вектор 2013 → 2024:</strong> від "бібліотеки для рендерингу View у MVC" → до власної рантайм-моделі з конкурентним рендерингом і серверними компонентами. Найбільший зсув для щоденної роботи — <strong>Hooks (2019)</strong>: класи перестали бути обов'язковими для стану/lifecycle (детально — розділ "Lifecycle: Class vs Functional" нижче).</p>`,
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
      <tr><td><strong>ES7+ React/Redux/React-Native Snippets</strong></td><td>Сніпети <code>rfc</code>/<code>rafce</code> — функціональний компонент за секунду; <code>rcc</code> — класовий (легасі-проєкти, Block "Lifecycle")</td></tr>
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
      <tr><td><code>rcc</code></td><td>React Class Component</td><td>Класовий компонент з методом <code>render()</code> (легасі, розділ "Lifecycle" вище)</td></tr>
    </table>
  </div>
  <h3 class="topic"><code>rfc</code> vs <code>rcc</code> — приклад</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// rfc / rafce → генерує:
export default function ComponentName() {
  return <div>ComponentName</div>;
}

// rcc → генерує (класовий, легасі — детально в розділі Lifecycle):
import React, { Component } from 'react';

export default class ComponentName extends Component {
  render() {
    return <div>ComponentName</div>;
  }
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
  <p>Компонент <strong>stateful</strong> — має власний <code>useState</code>/<code>useReducer</code> усередині, "пам'ятає" щось між рендерами. Компонент <strong>stateless</strong> — чиста функція від <code>props</code>: однакові пропи завжди дають однаковий вивід, немає внутрішньої памʼяті. До хуків (до 2019) такий компонент офіційно називався <strong>"stateless functional component" (SFC)</strong> — термін лишився в старих статтях/книгах, хоча сьогодні "функціональний компонент" вже не означає автоматично "без стану" (з хуками функціональний компонент може бути так само stateful, як і класовий).</p>
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
  `,
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
      title: '🔄 Тригери ре-рендеру, Batching, StrictMode',
      interviewQuestions: [
        {
          question: 'Що таке batching, і чим автоматичний batching у React 18 відрізняється від того, що було в React 17?',
          answer: 'Batching — об\'єднання кількох викликів <code>setState</code> в один ре-рендер замість окремого ре-рендеру на кожен виклик. У React 17 batching працював лише всередині React-обробників подій; у <code>setTimeout</code>, промісах чи нативних обробниках кожен <code>setState</code> викликав окремий рендер. React 18 з <code>createRoot</code> робить batching <strong>автоматичним усюди</strong>, незалежно від контексту виклику.',
        },
        {
          question: 'Навіщо потрібен <code>StrictMode</code> і чому в ньому компоненти рендеряться двічі в dev-режимі?',
          answer: '<code>StrictMode</code> навмисно подвоює виклик рендер-функцій та деяких ефектів у dev-режимі, щоб виявити неідемпотентні побічні ефекти в тілі компонента чи витоки в ефектах без cleanup — речі, які стануть реальними багами в concurrent-режимі, де React теж може повторно викликати рендер. У production-збірці подвійний виклик відсутній.',
        },
        {
          question: `Назви 4 причини ре-рендеру компонента`,
          answer: `власний state, ре-рендер батька, зміна Context, force update через useReducer.`,
        },
        {
          question: `Що змінилось у batching в React 18?`,
          answer: `раніше батчинг лише в React-обробниках подій, тепер — всюди (таймери, проміси, нативні листенери).`,
        },
        {
          question: `StrictMode впливає на прод-білд?`,
          answer: `ні, лише dev, подвійні виклики — щоб виявити нечисті ефекти заздалегідь.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Чому компонент ре-рендериться <span class="tag tag-key">KEY</span></h3>
  <p>Чотири тригери: (1) зміна власного <code>state</code>, (2) ре-рендер батька — <strong>дитина рендериться теж, навіть якщо її пропи не змінились</strong> (без <code>React.memo</code>, Block 3), (3) зміна значення <code>Context</code>, яке вона споживає (Block 4), (4) <code>useReducer</code> dispatch того самого значення все одно триггерить рендер — на відміну від <code>useState</code> з тим самим значенням, де React <strong>бейлить</strong> (пропускає ре-рендер через <code>Object.is</code>-порівняння).</p>
  <div class="grid2">
    <div class="card red"><h4>❌ "Проп не змінився, а ре-рендер стався"</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">Parent</span>() {
  <span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);
  <span class="kw">return</span> (
    <span class="jsx">&lt;&gt;</span>
      <span class="jsx">&lt;button</span> onClick={() =&gt; <span class="fn">setCount</span>(c=&gt;c+<span class="num">1</span>)}<span class="jsx">&gt;</span>{count}<span class="jsx">&lt;/button&gt;</span>
      <span class="jsx">&lt;</span><span class="fn">Child</span> label=<span class="str">"static"</span> <span class="jsx">/&gt;</span>  <span class="cmt">// проп не міняється,</span>
    <span class="jsx">&lt;/&gt;</span>                                     <span class="cmt">// Child все одно рендериться!</span>
  );
}</pre></div>
    <div class="card green"><h4>✅ React.memo рве ланцюжок</h4><pre style="font-size:10.5px"><span class="kw">const</span> Child = React.<span class="fn">memo</span>(<span class="kw">function</span> <span class="fn">Child</span>({ label }) {
  <span class="kw">return</span> <span class="jsx">&lt;div&gt;</span>{label}<span class="jsx">&lt;/div&gt;</span>;
});
<span class="cmt">// Тепер Child ре-рендериться тільки якщо label реально змінився</span>
<span class="cmt">// (детальніше про memo і чому він часто "не працює" — Block 3)</span></pre></div>
  </div>
  <h3 class="topic">Automatic Batching <span class="tag tag-new">React 18</span></h3>`,
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
flushSync(() => setCount(c => c + 1));  // синхронний рендер одразу після цього виклику`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">&lt;StrictMode&gt; — подвійний виклик лише в dev <span class="tag tag-key">KEY</span></h3>
  <p><strong>Що це:</strong> runtime-перемикач ЛИШЕ для development-збірки. Навмисно ДВІЧІ викликає тіло компонента, <code>useState</code>/<code>useMemo</code>/<code>useReducer</code> initializer'и і (React 18+) mount-фазу effects (mount → unmount → mount). <strong>Навіщо:</strong> викрити нечисті компоненти й ефекти без cleanup ще в розробці, поки легко пофіксити.</p>
  <div class="alert good"><span class="icon">✅</span><span><strong>У продакшн-білді нічого не подвоюється</strong> — це суто dev-поведінка, на відміну, наприклад, від Angular <code>--strict</code>, який є compile-time перевіркою і ніяк не змінює runtime.</span></div>
  <h3 class="topic">Як вмикати і прийнята конвенція <span class="tag tag-key">KEY</span></h3>
  <p>Обгортається <strong>один раз, навколо кореня застосунку</strong> — не розкидано по окремих компонентах. У Vite/CRA-подібному застосунку — навколо <code>&lt;App /&gt;</code> у точці входу; у Next.js App Router увімкнено <strong>за замовчуванням</strong> (<code>reactStrictMode: true</code> — дефолтна поведінка <code>next.config.js</code>, вимикати навмисно не рекомендують).</p>
  <div class="grid2">
    <pre><span class="cmt">// main.tsx (Vite) — один раз, навколо кореня</span>
createRoot(document.<span class="fn">getElementById</span>(<span class="str">'root'</span>)!).<span class="fn">render</span>(
  <span class="jsx">&lt;React.StrictMode&gt;</span>
    <span class="jsx">&lt;App /&gt;</span>
  <span class="jsx">&lt;/React.StrictMode&gt;</span>
);</pre>
    <pre><span class="cmt">// next.config.js — увімкнено за замовчуванням</span>
<span class="kw">const</span> nextConfig = {
  reactStrictMode: <span class="kw">true</span>, <span class="cmt">// дефолт, зазвичай не чіпають</span>
};</pre>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Подвоюється не лише сам ефект</strong> — будь-який <code>console.log</code> у тілі компонента чи в <code>useEffect</code>, викликаному в StrictMode, виведеться в консоль <strong>двічі поспіль</strong>. Це не помилка логування — так само подвоюється весь код, що виконується в цих точках.</span></div>
  <h3 class="topic">StrictMode (React) vs <code>'use strict'</code> (JavaScript) — не плутати <span class="tag tag-pit">PITFALL</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th><code>&lt;React.StrictMode&gt;</code></th><th><code>'use strict'</code></th></tr>
      <tr><td>Що це</td><td>React-компонент (JSX-обгортка)</td><td>Директива мови JavaScript (рядок на початку файлу/функції)</td></tr>
      <tr><td>Хто виконує</td><td>React runtime</td><td>JS-рушій (V8 та ін.)</td></tr>
      <tr><td>Діє де</td><td>Лише в development-збірці</td><td>Завжди, у будь-якому середовищі — dev і прод однаково</td></tr>
      <tr><td>Що робить</td><td>Подвоює рендер/ефекти, щоб виявити нечистоту</td><td>Забороняє небезпечні конструкції (неоголошені змінні, дублікати параметрів), робить деякі мовчазні помилки такими, що кидають виняток</td></tr>
      <tr><td>Стосунок один до одного</td><td colspan="2">Жодного — випадковий збіг слова "strict". <code>'use strict'</code> і так увімкнений автоматично в ES-модулях (весь сучасний React/TS-код) незалежно від StrictMode-компонента.</td></tr>
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

// Це виявляє ефекти БЕЗ cleanup — без StrictMode такий баг непомітний у dev,
// але в concurrent-рендерингу прода призводить до подвійних підписок/запитів:
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
          html: ``,
        },
      ],
    },
    /* ============================= BLOCK 2 — HOOKS DEEP DIVE ============================= */
    {
      id: 'hooks-why',
      title: '🪝 Навіщо хуки: яку проблему вирішують',
      interviewQuestions: [
        {
          question: 'Яку конкретну проблему класових компонентів вирішили хуки, окрім «менше boilerplate»?',
          answer: 'Головна проблема — <strong>logic reuse</strong>: у класах повторно використати stateful-логіку (підписка на подію, таймер, fetch) між компонентами можна було лише через HOC або render props, що призводило до «wrapper hell» і ускладнювало трасування, звідки приходять props. Хуки дозволяють винести таку логіку в звичайну функцію (custom hook) і композювати без додаткових шарів у дереві компонентів.',
        },
        {
          question: 'Чому хуки вважаються кращим рішенням, ніж <code>this</code>-прив\'язка методів у класових компонентах?',
          answer: '<code>this</code> у JS не прив\'язаний лексично — метод класу, переданий як callback (<code>onClick={this.handleClick}</code>), втрачає контекст, якщо не забінджений вручну в конструкторі або не оголошений як стрілкова властивість класу. Це джерело постійних багів у класах. Хуки — звичайні функції-замикання, де <code>this</code> взагалі не задіяний, тому такого класу помилок не існує.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Проблема до хуків (React &lt;16.8, 2019) <span class="tag tag-key">KEY</span></h3>
  <p>Класи були єдиним способом дати компоненту стан і lifecycle. Це створювало дві конкретні болі:</p>
  <div class="grid2">
    <div class="card red"><h4>1. Перевикористання stateful-логіки — лише через "wrapper hell"</h4><p>Хотів переюзати логіку (підписка, debounce, auth-check) в кількох компонентах — доводилось обгортати компонент у HOC або render-props (Block 5, розділ "Patterns"). Кожна така обгортка — ще один рівень у дереві React DevTools, ще один шар пропів, що "просвічують" крізь усі обгортки.</p></div>
    <div class="card red"><h4>2. Логіка розкидана по методах, а не по фічах</h4><p><code>componentDidMount</code> міг мати код для трьох незвʼязаних речей (fetch, аналітика, підписка) в одному методі — і той самий "fetch"-код доводилось дублювати в <code>componentDidUpdate</code> (детально — розділ "Lifecycle: Class vs Functional" вище, там же й <code>this</code>-binding).</p></div>
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
  <div class="alert good"><span class="icon">✅</span><span>Це і є відповідь на "чим хук відрізняється від функції": хук отримує доступ до React-рантайму (конкретно — до слоту в Fiber-дереві поточного компонента), звичайна функція — ні. Саме тому хуки не можна "просто взяти й викликати" будь-де — звідси Правила хуків (наступний розділ).</span></div>`,
        },
      ],
    },
    {
      id: 'hooks-rules',
      title: '📏 Правила хуків: коли не можна викликати',
      interviewQuestions: [
        {
          question: 'Чому хуки не можна викликати всередині умов, циклів чи вкладених функцій?',
          answer: 'React відстежує стан хуків не за іменем, а за <strong>порядком виклику</strong> в кожному рендері (внутрішньо — пов\'язаний список на fiber-вузлі). Якщо виклик хука обумовлений (наприклад, <code>if (cond) useState()</code>), порядок може відрізнятись між рендерами, і React прив\'яже стан не до того хука — це не варнінг, а реальна десинхронізація стану.',
        },
        {
          question: 'Як обійти ситуацію, коли за бізнес-логікою хук потрібно викликати «умовно» (наприклад, лише для одного з варіантів UI)?',
          answer: 'Хук викликається завжди, безумовно, а <em>умовною</em> робиться логіка всередині нього або використання результату: наприклад, завжди викликати <code>useEffect</code>, але саму підписку/запит обгорнути в <code>if</code> усередині callback\'а; або розбити компонент на два (умовний рендер компонента-обгортки, а не умовний виклик хука).',
        },
        {
          question: `Що станеться, якщо викликати useState всередині if?`,
          answer: `наведи приклад із конкретним "зсувом" значень між слотами, а не просто "так не можна".`,
        },
        {
          question: `Чим ловиться порушення Rules of Hooks до рантайму?`,
          answer: `eslint-plugin-react-hooks, правило rules-of-hooks.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Два правила <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card"><h4>1. Лише на верхньому рівні</h4><p>Ніколи всередині <code>if</code>/циклів/вкладених функцій/<code>try-catch</code>/після раннього <code>return</code>. Хуки викликаються в <strong>однаковому порядку на кожному рендері</strong>.</p></div>
    <div class="card blue"><h4>2. Лише з React-функцій</h4><p>Функції-компоненти або інші custom hooks. Ніколи — зі звичайних JS-функцій, методів класу, чи колбека, визначеного поза компонентом.</p></div>
  </div>
  <h3 class="topic">Чому саме так — звʼязок з Fiber <span class="tag tag-pit">PITFALL</span></h3>
  <p>React зіставляє хуки між рендерами <strong>за позицією виклику</strong> у зв'язному списку <code>memoizedState</code> Fiber-вузла — не за іменем змінної (розділ вище). Умовний виклик хука зсуває позицію <strong>усіх наступних</strong> хуків у тому ж компоненті — і React підставляє їм чужі значення.</p>`,
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
      id: 'hooks-catalog-full',
      title: '📋 Повний каталог хуків',
      interviewQuestions: [
        {
          question: 'Які React-хуки ти б виділив як такі, що рідко потрібні у звичайному продуктовому коді, і чому вони взагалі існують?',
          answer: '<code>useImperativeHandle</code>, <code>useDebugValue</code>, <code>useId</code>, <code>useSyncExternalStore</code> — нішеві. <code>useImperativeHandle</code> потрібен для контрольованого імперативного API компонента (кастомний input-wrapper з методом <code>.focus()</code>); <code>useSyncExternalStore</code> — коректний спосіб підписатись на зовнішнє (поза-React) сховище стану без tearing у concurrent-режимі — на ньому побудовані бібліотеки на кшталт Zustand.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Мапа всіх хуків React за категоріями. Ті, що мають детальний розбір нижче (useEffect, useMemo/useCallback, useRef, useLayoutEffect, useReducer — розділ "Hooks — Deep Dive"; useTransition/useDeferredValue — розділ "useTransition / useDeferredValue"), тут — коротким рядком з переходом. Решта — <strong>лише тут</strong>, повністю.</p>
  <div class="table-wrap">
    <table>
      <tr><th>Хук</th><th>Категорія</th><th>З якої версії</th><th>Навіщо</th><th>Edge case</th></tr>
      <tr><td><code>useState</code></td><td>State</td><td>16.8</td><td>Локальний стан, незалежні прості значення</td><td>Lazy initializer — <code>useState(() =&gt; expensive())</code>, інакше <code>expensive()</code> виконується щорендеру, навіть якщо результат використано лише при mount</td></tr>
      <tr><td><code>useReducer</code></td><td>State</td><td>16.8</td><td>Складний повʼязаний state, явні action-переходи</td><td>Детально — "Hooks — Deep Dive" (є свій lazy-init нюанс)</td></tr>
      <tr><td><code>useEffect</code></td><td>Effect</td><td>16.8</td><td>Side-effects після paint (fetch, підписки)</td><td>Детально — "Hooks — Deep Dive" (stale closures)</td></tr>
      <tr><td><code>useLayoutEffect</code></td><td>Effect</td><td>16.8</td><td>Синхронно до paint — читання layout</td><td>Детально — "Hooks — Deep Dive"</td></tr>
      <tr><td><code>useInsertionEffect</code></td><td>Effect</td><td>18</td><td>Вставка <code>&lt;style&gt;</code> ДО useLayoutEffect — лише для CSS-in-JS бібліотек (styled-components, розділ "Styling" вище)</td><td>Не для прикладного коду — немає доступу до refs, призначений виключно авторам бібліотек стилізації</td></tr>
      <tr><td><code>useRef</code></td><td>Ref</td><td>16.8</td><td>DOM-ref / мутабельне значення без ре-рендеру</td><td>Детально — "Hooks — Deep Dive"</td></tr>
      <tr><td><code>useImperativeHandle</code></td><td>Ref</td><td>16.8</td><td>Кастомізує, що саме батько бачить через <code>ref</code> на дочірній компонент (у парі з <code>forwardRef</code> або React 19 <code>ref</code>-як-проп)</td><td>Легко зловживати — імперативний API (<code>focus()</code>, <code>reset()</code>) в React мусить лишатись винятком, не звичкою; 95% кейсів вирішуються звичайним потоком props/state</td></tr>
      <tr><td><code>useMemo</code></td><td>Performance</td><td>16.8</td><td>Кешує дороге обчислення / стабільний референс</td><td>Детально — "Hooks — Deep Dive" (не гарантія!)</td></tr>
      <tr><td><code>useCallback</code></td><td>Performance</td><td>16.8</td><td>Кешує референс функції</td><td>Детально — "Hooks — Deep Dive"</td></tr>
      <tr><td><code>useContext</code></td><td>Context</td><td>16.8</td><td>Читає значення найближчого Provider вище по дереву</td><td>Компонент, що споживає Context, ре-рендериться на <strong>будь-яку</strong> зміну value провайдера — навіть якщо реально використовує лише одне поле з обʼєкта value (детально — розділ "Межі стану та Context")</td></tr>
      <tr><td><code>useTransition</code></td><td>Concurrent</td><td>18</td><td>Неурочна дія (функція-апдейт)</td><td>Детально — розділ "useTransition / useDeferredValue"</td></tr>
      <tr><td><code>useDeferredValue</code></td><td>Concurrent</td><td>18</td><td>Неурочне значення (ззовні)</td><td>Детально — розділ "useTransition / useDeferredValue"</td></tr>
      <tr><td><code>useId</code></td><td>Misc</td><td>18</td><td>Унікальний id, стабільний між сервером і клієнтом — для <code>&lt;label htmlFor&gt;</code>/ARIA-атрибутів</td><td><code>Math.random()</code>/лічильник у модулі для генерації id ламається при SSR — сервер і клієнт рахують по-різному → hydration mismatch (розділ "Next.js: рендер-моделі"). <code>useId</code> гарантовано однаковий на сервері й клієнті</td></tr>
      <tr><td><code>useSyncExternalStore</code></td><td>Misc</td><td>18</td><td>Коректна підписка на зовнішнє джерело стану поза React (браузерні API, стан-менеджери)</td><td>Це те, на чому <strong>всередині</strong> побудований Zustand-хук (розділ "Zustand" вище) — гарантує коректність під час concurrent-рендерингу (tearing-safe), на відміну від ручного <code>useEffect</code> + <code>useState</code> для підписки</td></tr>
      <tr><td><code>useDebugValue</code></td><td>Misc</td><td>16.8</td><td>Підписує custom hook міткою в React DevTools (розділ вище)</td><td>Працює лише в custom hooks, ефекту в звичайному компоненті не має — суто DX для авторів бібліотек хуків</td></tr>
    </table>
  </div>`,
        },
      ],
    },
    {
      id: 'memoization-concept',
      title: '🧠 Мемоізація: єдина концепція',
      interviewQuestions: [
        {
          question: 'Поясни мемоізацію як загальну техніку (без React), а потім покажи, чому useMemo, useCallback і React.memo — це насправді одна й та сама ідея.',
          answer: 'Мемоізація — кешування результату обчислення за ключем вхідних даних: наступний виклик з тим самим ключем повертає кеш замість повторного обчислення (памʼять в обмін на швидкість). У React ця сама схема застосована до трьох різних "одиниць": <code>useMemo</code> кешує значення (ключ — deps-масив), <code>useCallback</code> кешує посилання на функцію (той самий useMemo під капотом), <code>React.memo</code> кешує РЕЗУЛЬТАТ РЕНДЕРУ компонента (ключ — props). В усіх трьох: ключ порівнюється через Object.is/поверхнево, зміна ключа = інвалідація кешу.',
        },
        {
          question: 'Fiber-поле memoizedState теж називається "мемоізація" — це та сама техніка, що useMemo?',
          answer: 'Ні, і це поширена плутанина через збіг слова. memoizedState — просто "слот останнього відомого значення" хука в Fiber-вузлі, без ключа й без інвалідації за замовчуванням. useMemo/useCallback/React.memo — справжній кеш-за-ключем із чіткою умовою скидання (зміна deps/props). Схожа за назвою, але окрема від них річ — Next.js Request Memoization, навпаки, це саме кешування-за-ключем (дедуплікація однакових fetch у межах одного рендеру за URL+опціями як ключем).',
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
    <div class="card blue"><h4>useCallback</h4><p>Кешує <strong>посилання на функцію</strong> — окремий випадок useMemo (детально, з формулою еквівалентності — розділ "Hooks — Deep Dive" нижче).</p></div>
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
  <p>Детальні API, edge cases і pitfalls кожного з трьох — <code>useMemo</code>/<code>useCallback</code> у розділі "Hooks — Deep Dive" нижче, <code>React.memo</code> у розділі "Performance Deep Dive". React Compiler (розділ "React 19 / майбутнє") автоматизує застосування саме цієї схеми — розставляє мемоізацію за тебе, не змінюючи самої ідеї.</p>`,
        },
      ],
    },
    {
      id: 'hooks-deep-dive',
      title: '🪝 Hooks — Deep Dive',
      interviewQuestions: [
        {
          question: 'Чому масив залежностей <code>useEffect</code>/<code>useMemo</code>/<code>useCallback</code> порівнюється по-різному з масивом об\'єктів у стейті — які тут підводні камені?',
          answer: 'React порівнює кожен елемент масиву залежностей через <code>Object.is</code> (поверхнево, а не глибоко). Якщо залежність — новий об\'єкт/масив/функція, створений щорендеру (наприклад, <code>{ id }</code> в JSX-виклику), ефект/мемоізація спрацьовуватиме щоразу, навіть якщо «логічно» значення не змінилось — типова причина зайвих ре-рендерів чи нескінченних циклів у <code>useEffect</code>.',
        },
        {
          question: 'У чому різниця між <code>useMemo</code> і <code>useCallback</code>, і коли передчасна мемоізація шкодить більше, ніж допомагає?',
          answer: '<code>useMemo</code> мемоізує <em>значення</em>, <code>useCallback</code> — <em>посилання на функцію</em> (по суті, <code>useCallback(fn, deps)</code> еквівалентний <code>useMemo(() => fn, deps)</code>). Обидва самі по собі не безкоштовні — порівняння залежностей і зберігання кешу теж коштує. Мемоізація виправдана, коли обчислення справді важке або коли стабільність посилання критична (проп до <code>React.memo</code>-компонента, залежність іншого хука) — інакше вона додає складність без вимірної користі.',
        },
        {
          question: `Що таке stale closure і як його уникнути?`,
          answer: `приклад з setInterval + functional update / useRef.`,
        },
        {
          question: `Коли useReducer краще за useState?`,
          answer: `коли наступний стан залежить від попереднього складним чином, або переходи станів треба тестувати ізольовано від UI.`,
        },
        {
          question: `Чи можна покладатись на useMemo для коректності коду (не лише продуктивності)?`,
          answer: `ні, React може відкинути кеш у будь-який момент — це підказка (hint), не гарантія.`,
        },
        {
          question: `useCallback обгортає функцію — референс точно стабільний?`,
          answer: `лише якщо стабільні всі deps; нестабільна залежність все одно дає нову функцію щорендеру.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">useEffect — правила <span class="tag tag-key">KEY</span></h3><div class="grid2">
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
  <p style="font-size:12.5px;opacity:.75">Обидва хуки нижче — конкретне застосування єдиної схеми "кеш за ключем" (розділ "Мемоізація: єдина концепція" вище).</p>
  <h3 class="topic">useMemo / useCallback — коли реально треба <span class="tag tag-pit">PITFALL</span></h3><div class="table-wrap">
    <table>
      <tr><th>Hook</th><th>✅ Має сенс</th><th>❌ Передчасна оптимізація</th></tr>
      <tr><td><strong>useMemo</strong></td><td>Дороге обчислення (filter/sort 10k items), стабільне посилання для memo-компонента</td><td>Прості конкатенації, тривіальні обчислення — сам виклик useMemo дорожчий</td></tr>
      <tr><td><strong>useCallback</strong></td><td>Функція йде в memo-компонент як prop, або в dep array іншого hook</td><td>Локальний onClick на звичайному <code>&lt;button&gt;</code></td></tr>
      <tr><td><strong>React.memo</strong></td><td>Компонент рендериться часто, рендер дорогий, props стабільні</td><td>Простий компонент, рідкісні оновлення (Block 3 — деталі)</td></tr>
    </table>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>useMemo — підказка, не гарантія <span class="tag tag-pit">PITFALL</span>:</strong> React офіційно залишає за собою право <strong>відкинути</strong> закешоване значення й порахувати заново (наприклад, щоб звільнити память) навіть якщо залежності не змінились. Код <strong>не повинен покладатись</strong> на useMemo для коректності (напр. мутація об'єкта всередині обчислення "бо воно виконається лише раз") — лише для продуктивності. Якщо потрібна гарантія "виконати рівно раз" — <code>useRef</code> з lazy-ініціалізацією або <code>useEffect</code>.</span></div>
  <h3 class="topic">useRef — 3 use cases</h3><div class="grid3">
    <div class="card"><h4>1. DOM ref</h4><pre style="font-size:10.5px"><span class="kw">const</span> inputRef = <span class="fn">useRef</span>&lt;HTMLInputElement&gt;(<span class="kw">null</span>);
<span class="cmt">// &lt;input ref={inputRef} /&gt;</span>
inputRef.current?.<span class="fn">focus</span>();</pre></div>
    <div class="card blue"><h4>2. Mutable без ре-рендеру</h4><pre style="font-size:10.5px"><span class="kw">const</span> timerRef = <span class="fn">useRef</span>&lt;NodeJS.Timeout&gt;();
timerRef.current = <span class="fn">setTimeout</span>(fn, <span class="num">1000</span>);
<span class="cmt">// зміна .current НЕ тригерить рендер</span></pre></div>
    <div class="card green"><h4>3. "Живе" значення в effect</h4><pre style="font-size:10.5px"><span class="kw">const</span> valueRef = <span class="fn">useRef</span>(value);
valueRef.current = value;
<span class="cmt">// effect завжди читає актуальне значення</span>
<span class="cmt">// (обхід stale closure без зміни dep array)</span></pre></div>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Антипатерн useRef <span class="tag tag-pit">PITFALL</span>:</strong> зберігати в ref значення, яке <strong>повинно</strong> відображатись в UI. Зміна <code>.current</code> не тригерить ре-рендер — компонент показує застарілі дані, доки якийсь ІНШИЙ стан не змусить його перерендеритись. Якщо значення впливає на те, що бачить користувач — це <code>useState</code>, не <code>useRef</code>.</span></div>
  <h3 class="topic">useLayoutEffect vs useEffect</h3><div class="grid2">
    <div class="card red"><h4>useEffect (асинхронний)</h4><p>Виконується <strong>після</strong> paint. Не блокує браузер. Використовуй в 95% випадків (fetch, підписки, аналітика).</p></div>
    <div class="card yellow"><h4>useLayoutEffect (синхронний)</h4><p>Виконується <strong>до</strong> paint, одразу після DOM-мутацій. Потрібен для читання layout/dimensions і синхронних правок DOM — уникнути візуального "флешу".</p></div>
  </div>
  <h3 class="topic">useReducer vs useState</h3><div class="grid2">
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
<span class="cmt">// без цього довелось би рахувати початковий стан щорендеру назовні хука</span></pre>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>useCallback не "чинить" сам себе <span class="tag tag-pit">PITFALL</span>:</strong> референс функції лишається стабільним, лише якщо стабільні ВСІ значення в її dependency array. Якщо один з deps — новий обʼєкт/масив щорендеру (Block 3, referential stability), <code>useCallback</code> все одно поверне нову функцію — сама наявність <code>useCallback</code> нічого не гарантує без стабільності залежностей.</span></div>
  `,
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
  <p>Функція, що починається з <code>use</code>, може викликати інші хуки всередині — і підпорядковується тим самим правилам хуків (не в умовах/циклах/вкладених функціях, розділ "Правила хуків" вище). Виносить <strong>логіку</strong> (стан, ефекти, підписки), а не UI — компонент, що її використовує, лишається "тупим" (тонкий шар рендеру).</p>
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
    <div class="card green"><h4>✅ Плюси</h4><p>Перевикористання логіки без жодної обгортки в дереві компонентів (на відміну від HOC, розділ "Навіщо хуки" вище). Логіка тестується ізольовано (<code>renderHook</code> з testing-library). Композиція — custom hook може викликати інші custom hooks.</p></div>
    <div class="card red"><h4>❌ Мінуси / edge cases</h4><p><strong>Stale closures</strong> всередині самого хука — та сама проблема, що й у звичайному <code>useEffect</code> (розділ "Hooks — Deep Dive"), просто захована на рівень абстракції глибше — легше не помітити. <strong>Нестабільний референс, що повертається</strong> — якщо хук повертає новий обʼєкт/масив/функцію щовиклику (навіть без зміни даних), кожен компонент-споживач отримує "змінений" проп щорендеру — ламає <code>memo</code>/dep-array у споживача (Block 3, referential stability) так само, як і звичайний нестабільний проп.</p></div>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span>Custom hook — не про "перевикористання UI" (для цього компоненти), а про <strong>перевикористання stateful-логіки</strong>. Кожен виклик хука в різних компонентах створює <em>ізольований</em> стан — вони не діляться значенням між собою.</span></div>`,
        },
      ],
    },
    {
      id: 'lifecycle-class-vs-functional',
      title: '🔄 Lifecycle компонента: Class vs Functional',
      interviewQuestions: [
        {
          question: 'Як зіставити <code>componentDidMount</code>, <code>componentDidUpdate</code> і <code>componentWillUnmount</code> з <code>useEffect</code>?',
          answer: 'Один <code>useEffect(fn, [])</code> покриває <code>componentDidMount</code> (запускається раз після монтування) + <code>componentWillUnmount</code> (функція, повернута з <code>fn</code>, — cleanup). <code>useEffect(fn, [dep])</code> без порожнього масиву покриває <code>componentDidUpdate</code>, але з важливою відмінністю: ефект запускається і після <em>монтування</em> теж, тоді як <code>componentDidUpdate</code> — лише після оновлень.',
        },
        {
          question: 'Чому в класових компонентах було легко випадково створити нескінченний цикл оновлень у <code>componentDidUpdate</code>, і як хуки цьому запобігають?',
          answer: '<code>componentDidUpdate</code> викликає <code>setState</code> без умови порівняння — і кожен <code>setState</code> знову тригерить <code>componentDidUpdate</code>, тому розробник мусив вручну звіряти <code>prevProps</code>/<code>prevState</code>. У <code>useEffect</code> це вирішується декларативно масивом залежностей — ефект перезапускається лише коли значення в масиві реально змінились (за <code>Object.is</code>), а не при кожному ре-рендері.',
        },
        {
          question: `Який єдиний lifecycle-метод обов'язковий у класовому компоненті?`,
          answer: `<code>render</code>.`,
        },
        {
          question: `Чим один <code>useEffect</code> кращий за пару <code>componentDidMount</code>/<code>componentDidUpdate</code>?`,
          answer: `не дублює логіку, dependency array сама вирішує "mount чи update" замість ручного порівняння <code>prevProps</code>.`,
        },
        {
          question: `Що з lifecycle досі не має хук-еквівалента?`,
          answer: `<code>componentDidCatch</code>/<code>getDerivedStateFromError</code> (Error Boundary, Block 5).`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Три фази життя компонента <span class="tag tag-key">KEY</span></h3>
  <p>Кожен компонент проходить: <strong>Mount</strong> (перше створення й вставка в DOM) → <strong>Update</strong> (повторюється на кожен ре-рендер: зміна props/state/context) → <strong>Unmount</strong> (видалення з DOM). Класові компоненти виражали це явними методами; функціональні — тим самим через <code>useEffect</code> та порядок виконання самого тіла функції.</p>`,
        },
        {
          kind: 'code',
          language: 'text',
          code: `MOUNT                       UPDATE (на кожен ре-рендер)         UNMOUNT
  │                              │                                    │
  constructor                   (props/state/context змінились)      │
  │                              │                                    │
  getDerivedStateFromProps      getDerivedStateFromProps              │
  │                              │                                    │
  render                        shouldComponentUpdate (false → стоп)  │
  │                              │                                    │
  (React оновлює DOM)           render                                │
  │                              │                                    │
  componentDidMount             (React оновлює DOM)                   │
                                 │                                    │
                                 getSnapshotBeforeUpdate               │
                                 │                                    │
                                 componentDidUpdate            componentWillUnmount`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Методи класового компонента — що важливо, що ні</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Метод</th><th>Фаза</th><th>Важливість</th><th>Навіщо</th></tr>
      <tr><td><code>constructor</code></td><td>Mount</td><td><span class="tag tag-key">KEY</span></td><td>Ініціалізація <code>this.state</code>, біндинг методів (<code>this.onClick = this.onClick.bind(this)</code>)</td></tr>
      <tr><td><code>render</code></td><td>Mount + Update</td><td><span class="tag tag-key">KEY</span></td><td>Єдиний обов'язковий метод — повертає JSX. Має бути чистим (як render-фаза функціонального компонента)</td></tr>
      <tr><td><code>componentDidMount</code></td><td>Mount</td><td><span class="tag tag-key">KEY</span></td><td>Side-effects після першого рендеру: fetch, підписки, робота з DOM-нодою</td></tr>
      <tr><td><code>componentDidUpdate</code></td><td>Update</td><td><span class="tag tag-key">KEY</span></td><td>Side-effects після кожного оновлення — типово порівнює <code>prevProps</code>/<code>prevState</code> вручну, щоб не зациклитись</td></tr>
      <tr><td><code>componentWillUnmount</code></td><td>Unmount</td><td><span class="tag tag-key">KEY</span></td><td>Cleanup: відписки, таймери — аналог return-функції з <code>useEffect</code></td></tr>
      <tr><td><code>shouldComponentUpdate</code></td><td>Update</td><td>Середня</td><td>Ручний контроль пропуску ре-рендеру — попередник <code>React.memo</code> (Block 3)</td></tr>
      <tr><td><code>getDerivedStateFromProps</code></td><td>Mount + Update</td><td>Низька</td><td>Рідкісний кейс: state, що залежить від props — сьогодні частіше просто рахують значення прямо в render, без стану</td></tr>
      <tr><td><code>getSnapshotBeforeUpdate</code></td><td>Update</td><td>Низька</td><td>Зчитати DOM (напр. scroll-позицію) ДО того, як React його змінить — рідкісний UI-кейс</td></tr>
      <tr><td><code>componentDidCatch</code></td><td>—</td><td>Нішева, але незамінна</td><td>Error Boundary (Block 5) — досі без хук-еквівалента</td></tr>
    </table>
  </div>
  <h3 class="topic">Class vs Functional — той самий компонент</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Класовий (rcc-сніпет VS Code) — типовий "до хуків" компонент
class UserProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    fetchUser(this.props.userId).then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {           // ручне порівняння!
      fetchUser(this.props.userId).then(user => this.setState({ user }));
    }
  }

  componentWillUnmount() {
    this.subscription?.unsubscribe();
  }

  render() {
    return <div>{this.state.user?.name}</div>;
  }
}

// Функціональний (rfc-сніпет) — та сама логіка, без дублювання fetch-виклику
function UserProfile({ userId }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
    return () => subscription?.unsubscribe();
  }, [userId]);  // dependency array = componentDidMount + componentDidUpdate злиті в одне

  return <div>{user?.name}</div>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Мапа lifecycle-методів на хуки <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Класовий метод</th><th>Хук-еквівалент</th></tr>
      <tr><td><code>constructor</code> (ініціалізація state)</td><td><code>useState(initialValue)</code></td></tr>
      <tr><td><code>componentDidMount</code></td><td><code>useEffect(() => {'{'} ... {'}'}, [])</code></td></tr>
      <tr><td><code>componentDidUpdate</code></td><td><code>useEffect(() => {'{'} ... {'}'}, [dep])</code></td></tr>
      <tr><td><code>componentDidMount + componentDidUpdate</code> разом</td><td><code>useEffect</code> без правильного розділення — саме тому в класах треба було вручну звіряти <code>prevProps</code></td></tr>
      <tr><td><code>componentWillUnmount</code></td><td>return-функція з <code>useEffect</code></td></tr>
      <tr><td><code>shouldComponentUpdate</code></td><td><code>React.memo</code> (Block 3) — для всього компонента</td></tr>
      <tr><td><code>this.state</code> кілька полів</td><td>кілька <code>useState</code> АБО один <code>useReducer</code></td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Головна практична перевага хуків тут — <code>componentDidMount</code>/<code>componentDidUpdate</code> у класі часто дублювали один і той самий код (як у прикладі вище), бо логіку "зробити X при mount і при зміні Y" доводилось писати двічі. Один <code>useEffect(fn, [dep])</code> покриває обидва випадки за визначенням залежностей.</span></div>
  `,
        },
        {
          kind: 'flashcards',
          items: [
            {
              question: 'Що замінює <code>componentDidMount</code> у функціональному компоненті?',
              answer: '<code>useEffect(() => { ... }, [])</code> — порожній масив залежностей = один раз при mount.',
            },
            {
              question: 'Що замінює <code>componentWillUnmount</code>?',
              answer: 'Функція, яку повертає <code>useEffect</code> (cleanup) — <code>useEffect(() => { return () => { ... } }, [])</code>.',
            },
            {
              question: 'Який метод — попередник <code>React.memo</code>?',
              answer: '<code>shouldComponentUpdate</code> — ручне рішення, чи пропускати ре-рендер класового компонента.',
            },
            {
              question: 'Чому в класі часто дублювали код у <code>componentDidMount</code> і <code>componentDidUpdate</code>?',
              answer: 'Бо "зробити X при mount і при зміні пропу" — одна логічна дія, розбита на два окремі методи; <code>useEffect(fn, [dep])</code> покриває обидва одним викликом.',
            },
            {
              question: 'Який lifecycle-метод досі не має хук-еквівалента?',
              answer: '<code>componentDidCatch</code> / <code>getDerivedStateFromError</code> — Error Boundary й досі мусить бути класом.',
            },
            {
              question: 'Що робить VS Code сніпет <code>rcc</code>? А <code>rfc</code>?',
              answer: '<code>rcc</code> генерує класовий компонент (<code>extends React.Component</code>), <code>rfc</code>/<code>rafce</code> — функціональний компонент за секунду.',
            },
          ],
        },
      ],
    },
    /* ============================= BLOCK 3 — PERFORMANCE ============================= */
    {
      id: 'performance-deep-dive',
      title: '🚀 Performance Deep Dive',
      interviewQuestions: [
        {
          question: 'Коли <code>React.memo</code> реально допомагає, а коли лише додає накладні витрати без користі?',
          answer: '<code>React.memo</code> корисний для «важких» компонентів (дорогий рендер), чиї props стабільні між рендерами батька частіше, ніж змінюються. Якщо компонент дешевий у рендері або props (особливо об\'єкти/функції/масиви) створюються заново щоразу — <code>memo</code> лише додає витрати на поверхневе порівняння props без жодної економії, бо порівняння все одно «провалиться» і рендер відбудеться.',
        },
        {
          question: 'Які інструменти чи техніки ти використаєш, щоб знайти реальну причину зайвих ре-рендерів у великому додатку, а не гадати?',
          answer: 'React DevTools Profiler з увімкненим «Highlight updates» покаже, які компоненти й чому ре-рендерились (порівняння props/state/hooks у деталях коміту); для продакшн-профілювання — <code>&lt;Profiler&gt;</code> API з колбеком <code>onRender</code>. Гадати за симптомами («здається, тут щось повільне») — типова помилка джуна, тоді як сеньйор спершу вимірює.',
        },
        {
          question: `memo не допоміг — з чого почнеш дебаг?`,
          answer: `спершу Profiler + Why did this render, а не здогадки; типова причина — новий референс пропу.`,
        },
        {
          question: `Коли virtualization справді потрібна?`,
          answer: `списки в сотні-тисячі DOM-вузлів; для 20-50 елементів — зайва складність.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p style="font-size:12.5px;opacity:.75">Та сама схема "кеш за ключем", що й useMemo/useCallback (розділ "Мемоізація: єдина концепція", Block 2) — тут ключ не deps-масив, а props компонента.</p>
  <h3 class="topic">React.memo — коли працює, коли ні <span class="tag tag-key">KEY</span></h3>
  <p><code>React.memo</code> порівнює пропи <strong>поверхнево</strong> (<code>Object.is</code> по кожному ключу) і скіпає ре-рендер, якщо всі рівні. Не рятує, якщо проп — новий обʼєкт/масив/функція на кожен рендер батька (референс завжди інший). Можна передати власний компаратор — рідко потрібно і легко зламати непомітно.</p>`,
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
          html: `<h3 class="topic">Referential stability — головна причина, чому memo "не працює"</h3>
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
      <p>Клік по кнопці → <code>setCount</code> → <code>Parent</code> ре-рендериться (власний state, тригер #1 з розділу вище). <strong>За замовчуванням React рендерить усе піддерево під ним</strong> — <code>Child</code> рендериться (тригер "ре-рендер батька"), і оскільки <code>Child</code> сам повертає <code>&lt;Grandchild&gt;</code> у своєму тілі, <code>Grandchild</code> рендериться теж. Три рендери на клік, хоча <code>label</code> ніде не змінився.</p>
    </div>
    <div class="card green"><h4>✅ memo(Child) зупиняє каскад на першому кордоні</h4>
      <p>Обгорни лише <code>Child</code> в <code>React.memo</code>. При кліку: <code>Parent</code> рендериться (не уникнути — власний state), <code>Child</code> отримує ре-рендер-запит від батька, але <code>React.memo</code> порівнює його пропи (<code>label="static"</code> — не змінився) і <strong>каже React: "not rendering"</strong>. Оскільки сам <code>Child</code> не виконався — <code>Grandchild</code> усередині нього <strong>взагалі не викликається</strong>, каскад зупинився на межі.</p>
    </div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span><code>memo</code> — це <strong>межа (boundary)</strong>, а не глобальний перемикач: він зупиняє поширення ре-рендеру рівно в тому місці дерева, де стоїть, і не потребує обгортати кожен компонент — досить поставити його перед "важким" піддеревом, яке не залежить від того, що змінюється вище.</span></div>
  <h3 class="topic">Профілювання — React DevTools Profiler <span class="tag tag-key">KEY</span></h3>
  <p>Вкладка <strong>Profiler</strong>: запиши взаємодію → <strong>Flamegraph</strong> показує, які компоненти рендерились і скільки це коштувало; <strong>Ranked</strong> сортує за тривалістю. Клік на компонент → секція <strong>"Why did this render?"</strong> (треба увімкнути в налаштуваннях) називає точну причину: hook changed, props changed, parent rendered.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span>Робочий процес на співбесіді/у реальності: спершу <strong>профілюй</strong>, потім оптимізуй. <code>useMemo</code>/<code>memo</code> навмання без вимірювання — передчасна оптимізація, яка додає складність без гарантованого ефекту.</span></div>`,
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
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Базовий store</h3>`,
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
          html: `<h3 class="topic">Render props / HOC — легасі-патерни</h3>
  <p>Обидва вирішували "як перевикористати логіку без наслідування" до хуків. Custom hooks замінили ~95% їх застосувань — прямолінійніше й без "wrapper hell" (глибокої вкладеності HOC-обгорток у React DevTools).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Render props — legacy
<MouseTracker render={({ x, y }) => <span>{x}, {y}</span>} />

// HOC — legacy
const withAuth = (Component) => (props) =>
  useAuth().user ? <Component {...props} /> : <Redirect to="/login" />;

// Той самий кейс сьогодні — custom hook, без обгортки в дереві компонентів:
function useMouse() { /* ...повертає { x, y } */ }
function Profile() {
  const requireAuth = useRequireAuth(); // редірект усередині хука
  const { x, y } = useMouse();
  return <span>{x}, {y}</span>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<p><strong>Controlled vs Uncontrolled inputs</strong> — окремий детальний розділ "Controlled vs Uncontrolled Inputs" нижче (хто насправді володіє значенням, ref, FormData, verdict).</p>
  <h3 class="topic">Container / Presentational — межа розмилась</h3>
  <p>До хуків: Container-компонент тримав стан/логіку, Presentational — лише рендерив пропи. Сьогодні логіка виноситься в <strong>custom hook</strong> (Block 2), а не в окремий компонент-обгортку — той самий поділ відповідальностей, але без зайвого шару в дереві компонентів.</p>
  <h3 class="topic">Error Boundaries — лише класові <span class="tag tag-pit">PITFALL</span></h3>
  <p>Немає хук-еквівалента <code>componentDidCatch</code>/<code>getDerivedStateFromError</code> — Error Boundary досі мусить бути класовим компонентом (або обгорткою на кшталт <code>react-error-boundary</code>, яка сама є класом всередині). Ловить помилки рендерингу дерева <strong>нижче себе</strong> — не ловить помилки в обробниках подій, асинхронному коді, самому Error Boundary.</p>`,
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
          html: ``,
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
  <p><code>useRef</code> сам по собі детально розібраний у розділі "Hooks — Deep Dive" (3 use cases) — тут важливий саме форм-специфічний патерн: або окремий ref на кожне поле, або <strong>один ref на весь <code>&lt;form&gt;</code></strong> і читання всіх полів разом через <code>FormData</code> (наступний розділ) замість ref-на-кожен-інпут.</p>
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
  <div class="alert good"><span class="icon">✅</span><span><strong>Вердикт:</strong> маленька форма (1-5 полів) з живою валідацією/умовним UI → controlled, просто й достатньо. Велика форма, форма з файлами, або продуктивність під питанням → uncontrolled (найчастіше — через react-hook-form, розділ "Нативний підхід vs бібліотеки" нижче), а не ручні refs на кожне поле.</span></div>
  `,
        },
      ],
    },
    {
      id: 'forms-formdata-native',
      title: '📦 FormData — нативний API',
      interviewQuestions: [
        {
          question: 'Які переваги дає нативний <code>FormData</code> API порівняно з ручним збором значень із controlled-полів через <code>useState</code> для кожного поля?',
          answer: '<code>FormData</code> збирає всі значення форми одним викликом (<code>new FormData(formElement)</code>) без потреби заводити окремий <code>useState</code> і <code>onChange</code>-обробник на кожне поле, зменшуючи boilerplate і кількість ре-рендерів. У зв\'язці з React 19 Actions (<code>&lt;form action={fn}&gt;</code>) FormData стає нативним способом передати дані форми у Server Action без ручної серіалізації.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що це <span class="tag tag-key">KEY</span></h3>
  <p><code>FormData</code> — вбудований у браузер обʼєкт (не React-специфічний), що збирає значення <strong>усіх</strong> названих полів форми за один виклик — заміна ref-на-кожен-інпут для uncontrolled-форм.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = new FormData(formRef.current!);

    data.get('email');              // одне значення
    data.getAll('interests');       // масив — для checkbox-груп з тим самим name
    Object.fromEntries(data);       // { email: '...', name: '...' } — плейн-обʼєкт
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">✅</span><span>Це <strong>той самий</strong> <code>FormData</code>, що вже зустрічався в <code>action</code> React Router (розділ "React Router" вище) і в Server Actions/React 19 Actions (розділ "React 19 / майбутнє") — там форма (найчастіше <code>&lt;Form&gt;</code>/<code>&lt;form action={'{'}fn{'}'}&gt;</code>) автоматично збирає <code>FormData</code> й передає готовим першим аргументом у функцію, без ручного <code>new FormData(...)</code>.</span></div>`,
        },
      ],
    },
    {
      id: 'forms-validation-errors',
      title: '✅ Валідація та обробка помилок',
      interviewQuestions: [
        {
          question: 'Де правильно робити валідацію форми — на клієнті, на сервері, чи обидва, і чому?',
          answer: 'Клієнтська валідація — для UX (миттєвий фідбек, менше зайвих запитів), але <strong>ніколи не є джерелом істини для безпеки</strong>, бо клієнтський код можна обійти (прямий запит до API). Серверна валідація обов\'язкова завжди — це єдиний надійний бар\'єр. Правильна практика — дублювати ключові правила на обох рівнях, ідеально через спільну схему (Zod), яку імпортують і клієнт, і сервер.',
        },
        {
          question: 'Як показати помилки валідації користувачу так, щоб форма не «сіпалась» (не втрачала фокус/значення полів) при кожному ре-рендері?',
          answer: 'Стан помилок варто зберігати окремо від значень полів (наприклад, <code>errors</code> у форматі <code>{ fieldName: message }</code>) і оновлювати лише той запис, що змінився, а не пересобирати весь об\'єкт форми. Бібліотеки на кшталт React Hook Form ізолюють ре-рендер конкретного поля через підписку по імені поля, тому помилка в одному інпуті не викликає ре-рендер усієї форми і не збиває фокус користувача.',
        },
        {
          question: `onChange чи onBlur для валідації email?`,
          answer: `onBlur — не заважає вводу, дає фідбек після завершення поля; onChange для миттєвих індикаторів (сила пароля).`,
        },
        {
          question: `Навіщо aria-invalid/aria-describedby на полі з помилкою?`,
          answer: `зв'язує поле з текстом помилки для screen reader — без цього невізуальний користувач не отримає фідбек про помилку взагалі.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Нативна HTML5-валідація <span class="tag tag-key">KEY</span></h3>
  <p>Атрибути <code>required</code>, <code>pattern</code>, <code>min</code>/<code>max</code>, <code>type="email"</code> — браузер валідує безкоштовно, без жодного JS. Constraint Validation API дає програмний доступ: <code>input.checkValidity()</code> (bool, без UI), <code>input.reportValidity()</code> (показує нативну підказку браузера), <code>input.setCustomValidity('текст')</code> (власне повідомлення замість дефолтного).</p>
  <h3 class="topic">Коли валідувати — три стратегії</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Момент</th><th>UX</th><th>Коли доречно</th></tr>
      <tr><td><code>onChange</code></td><td>Миттєвий фідбек, але може дратувати посеред вводу ("email invalid" ще до того, як дописав)</td><td>Індикатори сили пароля, лічильник символів</td></tr>
      <tr><td><code>onBlur</code></td><td>Валідація при виході з поля — не заважає під час вводу</td><td>Найпоширеніший баланс — "перевірки на фокус", про які питав користувач</td></tr>
      <tr><td><code>onSubmit</code></td><td>Усе одразу в момент сабміту</td><td>Прості форми, або як фінальна перевірка поверх onBlur</td></tr>
    </table>
  </div>
  <h3 class="topic">Error state і фокус на невалідному полі <span class="tag tag-pit">PITFALL</span></h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function useFormErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleSubmit(data: Record<string, string>) {
    const nextErrors: Record<string, string> = {};
    if (!data.email) nextErrors.email = 'Обовʼязкове поле';
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) fieldRefs.current[firstInvalid]?.focus(); // ⚠️ легко забути — a11y-очікування
  }

  return { errors, fieldRefs, handleSubmit };
}

// <input
//   name="email"
//   ref={el => (fieldRefs.current.email = el)}
//   aria-invalid={!!errors.email}
//   aria-describedby={errors.email ? 'email-error' : undefined}
// />
// {errors.email && <span id="email-error">{errors.email}</span>}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span>Перенесення фокуса на перше невалідне поле після невдалого сабміту — не косметика, а очікувана a11y-поведінка (користувачі screen reader/клавіатурної навігації інакше не дізнаються, де саме помилка). Легко забути, бо форма "технічно працює" й без цього.</span></div>
  `,
        },
      ],
    },
    {
      id: 'forms-libraries',
      title: '📚 Нативний підхід vs бібліотеки',
      interviewQuestions: [
        {
          question: 'Коли варто обрати нативний підхід до форм (useState + FormData) замість бібліотеки (React Hook Form, Formik)?',
          answer: 'Нативний підхід виправданий для простих форм (1-3 поля, без складної крос-польової валідації чи динамічних масивів полів) — додаткова залежність і абстракція бібліотеки там не окупається. Для форм із десятками полів, вкладеними масивами, складною умовною валідацією чи потребою в продуктивності на великому масштабі бібліотека економить значно більше часу, ніж коштує її вивчення.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Підхід</th><th>Модель</th><th>Статус</th></tr>
      <tr><td>Vanilla <code>useState</code></td><td>Controlled, по полю</td><td>Ок для 1-3 полів, росте боляче</td></tr>
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
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Невалідний email'),
  age: z.number().min(18, 'Мінімум 18 років'),
});

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),  // валідація — схемою, не вручну
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
          html: `<div class="alert good"><span class="icon">✅</span><span><strong>Вердикт:</strong> react-hook-form + Zod — типова сучасна пара для будь-якої форми серйозніше за 2-3 поля: схема валідації одна (можна перевикористати на бекенді), продуктивність не деградує з кількістю полів, TypeScript-типи виводяться зі схеми автоматично.</span></div>`,
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
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React 19 — нове <span class="tag tag-new">React 19</span></h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Actions — async-функція просто у <form action>,
// React сам керує pending/помилками/оптимістичними апдейтами
async function submitAction(formData: FormData) {
  'use server';
  await saveName(formData.get('name'));
}
<form action={submitAction}>...</form>

// use() — читає Promise або Context, можна викликати УМОВНО
// (на відміну від звичайних хуків, яким заборонено бути в if)
function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise); // suspends до resolve
  return <ul>{comments.map(c => <li key={c.id}>{c.text}</li>)}</ul>;
}

// useOptimistic — миттєве UI-оновлення до підтвердження сервера
const [optimisticTodos, addOptimistic] = useOptimistic(
  todos,
  (state, newTodo) => [...state, newTodo]
);

// useActionState — форма + результат + pending в одному хуку
const [state, formAction, isPending] = useActionState(submitAction, initialState);
// <form action={formAction}><button disabled={isPending}>Save</button></form>`,
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
  ],
}
