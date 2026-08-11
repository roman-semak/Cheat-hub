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
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що таке Vite <span class="tag tag-key">KEY</span></h3>
  <p>Dev-сервер + білд-інструмент. У розробці Vite віддає файли як нативні ES-модулі прямо браузеру (компілює/трансформує лише файл, який реально запитав браузер, через esbuild — миттєвий старт і HMR незалежно від розміру проєкту). Для продакшн-білда використовує Rollup — трясе дерево (tree-shaking), об'єднує чанки.</p>
  <h3 class="topic">Хто був до Vite</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Інструмент</th><th>Статус</th><th>Проблема</th></tr>
      <tr><td><strong>Create React App (CRA)</strong></td><td>❌ Офіційно deprecated (2023)</td><td>Webpack під капотом без конфігурації — на великих проєктах dev-старт і HMR ставали дуже повільними</td></tr>
      <tr><td><strong>Webpack (вручну)</strong></td><td>Живий, але рідше для нових проєктів</td><td>Бандлить усе перед стартом dev-сервера — час старту росте з розміром проєкту</td></tr>
    </table>
  </div>
  <h3 class="topic">Альтернативи Vite сьогодні</h3>
  <div class="grid2">
    <div class="card"><h4>Next.js</h4><p>Не просто бандлер — фреймворк поверх React з роутингом/SSR/RSC (Block 6-7). Обирають, коли потрібен той самий React + сервер-рендеринг з коробки.</p></div>
    <div class="card blue"><h4>Rspack / Turbopack</h4><p>Webpack-сумісні бандлери на Rust — швидші за Webpack, орієнтовані на існуючі Webpack-конфіги (Turbopack — двигун під капотом Next.js).</p></div>
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
  <p>Це часто плутають на співбесіді, кажучи "Virtual DOM" про все одразу — насправді це <strong>три різні дерева</strong> з різним часом життя:</p>
  <div class="grid3">
    <div class="card"><h4>1. Element tree</h4><p>Результат <code>createElement</code> (з JSX). Легкий плейн-обʼєкт. <strong>Перестворюється щорендеру заново</strong> — "Virtual DOM" у побутовому сенсі.</p></div>
    <div class="card blue"><h4>2. Fiber tree</h4><p>Внутрішня структура React (Block 1). <strong>Персистентна</strong> — живе між рендерами, саме її React diff'ить і зберігає в ній стан хуків.</p></div>
    <div class="card green"><h4>3. DOM tree</h4><p>Реальні браузерні вузли. Оновлюється мінімально, точково — лише те, що показав diff Fiber-дерева.</p></div>
  </div>
  <div class="alert good"><span class="icon">✅</span><span>Element tree відкидається й будується заново на кожен рендер (дешево — плейн-обʼєкти). Fiber tree — довгоживуча структура, яку React звіряє зі свіжим element tree, щоб порахувати мінімальний патч для DOM tree. Детально про Fiber — розділ "Reconciliation, Virtual DOM, Fiber" нижче.</span></div>
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Чим element tree відрізняється від Fiber tree? → element tree перестворюється щорендеру (дешеві плейн-обʼєкти), Fiber tree персистентна і зберігає стан між рендерами — саме її React diff'ить.</li>
      <li>Чому <code>&lt;&gt;...&lt;/&gt;</code> іноді не підходить у <code>.map()</code>? → коротка форма не приймає <code>key</code>, а список без key ламає reconciliation (Block 1) — потрібен повний <code>&lt;React.Fragment key={...}&gt;</code>.</li>
    </ul>
  </div>`,
        },
      ],
    },
    {
      id: 'fundamentals-component-anatomy',
      title: '🧩 Анатомія компонента: шаблон, стилі, зображення',
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
  <div class="alert good"><span class="icon">✅</span><span>Файли, що лежать у <code>public/</code> (Vite) — копіюються as-is, доступні по кореневому шляху (<code>/logo.png</code>) БЕЗ імпорту. Файли поруч з компонентом — завжди через <code>import</code>, щоб бандлер їх обробив (оптимізація, хешування, tree-shaking невикористаних).</span></div>`,
        },
      ],
    },
    {
      id: 'styling-approaches',
      title: '🎨 Styled Components та Tailwind',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Чому <code>console.log(count)</code> одразу після <code>setCount</code> показує старе значення? → "setState асинхронний відносно поточної функції — планує рендер, не мутує змінну зараз".</li>
      <li>Чим props відрізняються від state? → "props — ззовні, read-only, дитина не міняє; state — внутрішній, змінюваний через свій setter".</li>
      <li>Навіщо потрібен <code>children</code>? → "композиція — компонент-обгортка не знає вміст, просто рендерить те, що передали".</li>
    </ul>
  </div>`,
        },
      ],
    },
    {
      id: 'fundamentals-lists-conditionals',
      title: '🔁 Списки, умовний рендеринг, форми',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Чому не можна <code>key={Math.random()}</code>? → "новий key щорендеру = React вважає елемент новим щоразу — знищує й пересоздає DOM-вузол, втрачає стан/фокус".</li>
      <li>Що виведе <code>{'{'}0 &amp;&amp; &lt;Badge/&gt;{'}'}</code>? → "0" в DOM — типова пастка з fallback-through значеннями в JSX.</li>
    </ul>
  </div>`,
        },
      ],
    },
    /* ============================= BLOCK 1 — REACT INTERNALS ============================= */
    {
      id: 'internals-reconciliation',
      title: '🌳 Reconciliation, Virtual DOM, Fiber',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Virtual DOM — зачем <span class="tag tag-key">KEY</span></h3>
  <p>Пряма робота з реальним DOM повільна (reflow/repaint). React будує легкий JS-опис дерева UI (<strong>Virtual DOM</strong> — дерево React-елементів з <code>createElement</code>), порівнює нову версію зі старою (<strong>diffing</strong>) і застосовує до справжнього DOM тільки мінімальний набір змін (<strong>reconciliation</strong>).</p>
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Що таке Virtual DOM насправді? → "не технологія прискорення сама по собі — це JS-структура даних, що дозволяє порахувати мінімальний diff перед тим, як чіпати повільний реальний DOM".</li>
      <li>Чим небезпечний <code>key={index}</code>? → конкретний приклад з інпутами/чекбоксами, що "перестрибують" значення при реордері.</li>
    </ul>
  </div>`,
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
          html: `<div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Назви 4 причини ре-рендеру компонента → власний state, ре-рендер батька, зміна Context, force update через useReducer.</li>
      <li>Що змінилось у batching в React 18? → раніше батчинг лише в React-обробниках подій, тепер — всюди (таймери, проміси, нативні листенери).</li>
      <li>StrictMode впливає на прод-білд? → ні, лише dev, подвійні виклики — щоб виявити нечисті ефекти заздалегідь.</li>
    </ul>
  </div>`,
        },
      ],
    },
    /* ============================= BLOCK 2 — HOOKS DEEP DIVE ============================= */
    {
      id: 'hooks-deep-dive',
      title: '🪝 Hooks — Deep Dive',
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
  <h3 class="topic">useMemo / useCallback — коли реально треба <span class="tag tag-pit">PITFALL</span></h3><div class="table-wrap">
    <table>
      <tr><th>Hook</th><th>✅ Має сенс</th><th>❌ Передчасна оптимізація</th></tr>
      <tr><td><strong>useMemo</strong></td><td>Дороге обчислення (filter/sort 10k items), стабільне посилання для memo-компонента</td><td>Прості конкатенації, тривіальні обчислення — сам виклик useMemo дорожчий</td></tr>
      <tr><td><strong>useCallback</strong></td><td>Функція йде в memo-компонент як prop, або в dep array іншого hook</td><td>Локальний onClick на звичайному <code>&lt;button&gt;</code></td></tr>
      <tr><td><strong>React.memo</strong></td><td>Компонент рендериться часто, рендер дорогий, props стабільні</td><td>Простий компонент, рідкісні оновлення (Block 3 — деталі)</td></tr>
    </table>
  </div>
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Що таке stale closure і як його уникнути? → приклад з setInterval + functional update / useRef.</li>
      <li>Коли useReducer краще за useState? → коли наступний стан залежить від попереднього складним чином, або переходи станів треба тестувати ізольовано від UI.</li>
    </ul>
  </div>`,
        },
      ],
    },
    {
      id: 'hooks-concurrent',
      title: '⚡ useTransition / useDeferredValue',
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
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Custom Hooks <span class="tag tag-key">KEY</span></h3>
  <p>Функція, що починається з <code>use</code>, може викликати інші хуки всередині — і підпорядковується тим самим правилам хуків (не в умовах/циклах/вкладених функціях). Виносить <strong>логіку</strong> (стан, ефекти, підписки), а не UI — компонент, що її використовує, лишається "тупим" (тонкий шар рендеру).</p>
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
  <div class="alert warn"><span class="icon">⚠️</span><span>Custom hook — не про "перевикористання UI" (для цього компоненти), а про <strong>перевикористання stateful-логіки</strong>. Кожен виклик хука в різних компонентах створює <em>ізольований</em> стан — вони не діляться значенням між собою.</span></div>`,
        },
      ],
    },
    {
      id: 'lifecycle-class-vs-functional',
      title: '🔄 Lifecycle компонента: Class vs Functional',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Який єдиний lifecycle-метод обов'язковий у класовому компоненті? → <code>render</code>.</li>
      <li>Чим один <code>useEffect</code> кращий за пару <code>componentDidMount</code>/<code>componentDidUpdate</code>? → не дублює логіку, dependency array сама вирішує "mount чи update" замість ручного порівняння <code>prevProps</code>.</li>
      <li>Що з lifecycle досі не має хук-еквівалента? → <code>componentDidCatch</code>/<code>getDerivedStateFromError</code> (Error Boundary, Block 5).</li>
    </ul>
  </div>`,
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
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React.memo — коли працює, коли ні <span class="tag tag-key">KEY</span></h3>
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>memo не допоміг — з чого почнеш дебаг? → "спершу Profiler + Why did this render, а не здогадки; типова причина — новий референс пропу".</li>
      <li>Коли virtualization справді потрібна? → списки в сотні-тисячі DOM-вузлів; для 20-50 елементів — зайва складність.</li>
    </ul>
  </div>`,
        },
      ],
    },
    {
      id: 'react-devtools',
      title: '🔍 React DevTools як Senior',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Як швидко перевірити гіпотезу "цей компонент ре-рендериться забагато" без Profiler? → "Highlight updates when components render" у Components tab — візуальна рамка на кожен рендер.</li>
      <li>Що показує "Why did this render?" → точну причину конкретного ре-рендеру: зміна props, зміна хука, чи просто ре-рендер батька.</li>
    </ul>
  </div>`,
        },
      ],
    },
    /* ============================= BLOCK 4 — STATE MANAGEMENT ============================= */
    {
      id: 'state-boundaries',
      title: '🧭 Межі стану та Context',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Чим кеш TanStack Query відрізняється від Redux/Zustand стору? → "це не клієнтський стан, а кеш серверних даних зі своїм життєвим циклом (stale/fresh, invalidate, refetch) — тримати серверні дані у Zustand означає вручну реалізовувати те, що Query дає з коробки".</li>
      <li>Що робить staleTime: 0 за замовчуванням? → кожен новий mount/фокус вікна триггерить background refetch, навіть якщо дані в кеші є — UI показує кешовані одразу, потім оновлює.</li>
    </ul>
  </div>`,
        },
      ],
    },
    {
      id: 'state-rxjs',
      title: '🌊 RxJS у React',
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
          html: `<h3 class="topic">Controlled vs Uncontrolled</h3><div class="grid2">
    <div class="card"><h4>Controlled</h4><pre style="font-size:10.5px"><span class="jsx">&lt;input</span> value={v} onChange={e =&gt; <span class="fn">setV</span>(e.target.value)} <span class="jsx">/&gt;</span>
<span class="cmt">// React — джерело правди. Валідація/маска в реальному часі,</span>
<span class="cmt">// умовне вимкнення submit — усе легко.</span></pre></div>
    <div class="card blue"><h4>Uncontrolled</h4><pre style="font-size:10.5px"><span class="jsx">&lt;input</span> ref={ref} defaultValue=<span class="str">""</span> <span class="jsx">/&gt;</span>
<span class="cmt">// DOM — джерело правди, читаєш через ref.current.value.</span>
<span class="cmt">// Менше ре-рендерів — придатно для великих форм (react-hook-form).</span></pre></div>
  </div>
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
          html: `<div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Чому немає хука для Error Boundary? → потребує lifecycle-методів рендер-фази (getDerivedStateFromError), яких у функціональній моделі хуків немає — рендер компонента не може "зловити" помилку самого себе.</li>
      <li>Controlled чи uncontrolled для великої форми з 50 полями? → uncontrolled/react-hook-form — controlled ре-рендерить форму на кожен keystroke.</li>
    </ul>
  </div>`,
        },
      ],
    },
    /* ============================= BLOCK 6 — NEXT.JS RENDER MODELS ============================= */
    {
      id: 'nextjs-render-models',
      title: '🖥️ Next.js: рендер-моделі',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>SSR і RSC — це одне й те саме? → ні: SSR — коли рендериться HTML; RSC — де взагалі виконується компонент (сервер, ніколи не в бандлі клієнта).</li>
      <li>Чому не можна передати onClick з Server у Client Component як проп у зворотньому напрямку (Client → Server)? → пропи серіалізуються, функції не серіалізуються — сервер не може отримати посилання на клієнтську функцію.</li>
    </ul>
  </div>`,
        },
      ],
    },
    /* ============================= BLOCK 7 — NEXT.JS APP ROUTER ============================= */
    {
      id: 'nextjs-app-router',
      title: '▲ Next.js App Router',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Що заважає забути перевірити авторизацію в Server Action? → нічого, це відповідальність розробника — Action виглядає як звичайна функція, але викликається з клієнта як ендпоінт.</li>
      <li>4 рівні кешування Next.js — назви й різницю → Request Memoization / Data Cache / Full Route Cache / Router Cache, сервер vs клієнт, per-request vs persistent.</li>
    </ul>
  </div>`,
        },
      ],
    },
    /* ============================= BLOCK 8 — REACT 19 / FUTURE ============================= */
    {
      id: 'react-19-future',
      title: '✨ React 19 / майбутнє',
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
  <div class="interview-tips">
    <div class="interview-tips-title">🎤 На співбесіді часто запитують</div>
    <ul>
      <li>Чим use() відрізняється від await у Server Component? → use() можна викликати умовно і в Client Components (для Context/переданого Promise), await у Server Component — ні для Client.</li>
      <li>React Compiler означає "більше не треба знати useMemo"? → ні — для співбесіди й для дебагу edge-case'ів розуміння ручної мемоізації лишається обов'язковим.</li>
    </ul>
  </div>`,
        },
      ],
    },
  ],
}

/* =========================================================================
 * Шпаргалка — ті самі секції/id/порядок, стисло: таблиці + короткий код,
 * без розлогих пояснень і interview-tips (ті лишились у reactContent).
 * ========================================================================= */
export const reactCheat: TopicContent = {
  slug: 'react',
  sections: [
    {
      id: 'history-versions',
      title: '📜 Історія версій React',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>2013 — open-source реліз. 2017 (v16) — Fiber. 2019 (v16.8) — Hooks. 2020 (v17) — "no new features". 2022 (v18) — Concurrent rendering, automatic batching, перші Server Components. 2024 (v19) — Actions, <code>use()</code>, React Compiler.</p>`,
        },
      ],
    },
    {
      id: 'library-vs-framework',
      title: '📚 Бібліотека чи фреймворк? + Virtual DOM',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>React — бібліотека: ти викликаєш React, не навпаки (inversion of control лишається на тобі). Router/HTTP/state — окремі бібліотеки на вибір. Angular — фреймворк, диктує структуру й сам викликає твій код. Virtual DOM: легкий JS-опис UI, React рахує diff і застосовує мінімум змін до реального DOM.</p>`,
        },
      ],
    },
    {
      id: 'tooling-vite',
      title: '🧰 Vite та інструменти збірки',
      blocks: [
        {
          kind: 'code',
          language: 'bash',
          code: `npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev

# CRA — deprecated (Webpack, повільний HMR). Альтернативи: Next.js, Rspack, Turbopack.
# index.html — точка входу (не в public/), src/main.tsx — createRoot(...).render()`,
        },
      ],
    },
    {
      id: 'tooling-vscode',
      title: '🖥️ React + VS Code',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>ES7+ React/Redux/React-Native Snippets — <code>rfc</code>/<code>rafce</code> (функціональний), <code>rcc</code> (класовий). + Prettier, ESLint (<code>eslint-plugin-react-hooks</code>), Auto Rename Tag, Tailwind CSS IntelliSense.</p>`,
        },
      ],
    },
    {
      id: 'fundamentals-components-jsx',
      title: '🧱 Компоненти та JSX',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Компонент = функція, повертає JSX. JSX → <code>React.createElement(type, props, ...children)</code>, не HTML. <code>{'{ }'}</code> — лише вирази, не statements (<code>if</code>/<code>for</code>). Атрибути camelCase (<code>className</code>, <code>onClick</code>). Один кореневий елемент або <code>&lt;&gt;...&lt;/&gt;</code>.</p>
  <p><strong>Три дерева:</strong> Element tree (перестворюється щорендеру) → Fiber tree (персистентна, її React diff'ить) → DOM tree (реальні вузли, оновлюються мінімально). <strong>Fragment:</strong> <code>&lt;&gt;...&lt;/&gt;</code> без key, <code>&lt;React.Fragment key={id}&gt;</code> у <code>.map()</code>.</p>`,
        },
      ],
    },
    {
      id: 'fundamentals-component-anatomy',
      title: '🧩 Анатомія компонента: шаблон, стилі, зображення',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `import styles from './UserCard.module.css';   // CSS Modules — локально скоуплені класи
import avatarFallback from './avatar-fallback.png'; // бандлер повертає URL

export function UserCard({ name, avatarUrl }: Props) {
  return (
    <div className={styles.card}>
      <img className={styles.avatar} src={avatarUrl ?? avatarFallback} alt={\`Аватар \${name}\`} />
      <span className={styles.name}>{name}</span>
    </div>
  );
}
// public/ — файли as-is, БЕЗ імпорту. Поруч з компонентом — завжди через import.`,
        },
      ],
    },
    {
      id: 'styling-approaches',
      title: '🎨 Styled Components та Tailwind',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th></th><th>styled-components</th><th>Tailwind</th></tr>
      <tr><td>Runtime вартість</td><td>Так</td><td>Ні (звичайний CSS)</td></tr>
      <tr><td>Props → стилі</td><td>Природно (<code>\${'$'}{p =&gt; ...}</code>)</td><td>Через <code>clsx</code>/<code>cn</code></td></tr>
    </table></div>
  <p>Vite + Tailwind: <code>npm install tailwindcss @tailwindcss/vite</code> → додати <code>tailwindcss()</code> у <code>vite.config.ts</code> plugins → <code>@import "tailwindcss";</code> в CSS.</p>`,
        },
      ],
    },
    {
      id: 'fundamentals-props-state',
      title: '📦 Props, State та події',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Props — read-only, згори вниз; "наверх" — через callback-проп. <code>children</code> — спеціальний проп для композиції. <code>useState</code>: <code>setX(v)</code> планує ре-рендер, не мутує змінну одразу — <code>console.log</code> одразу після покаже старе значення. Функціональний апдейт: <code>setX(x =&gt; x + 1)</code>. Controlled input: <code>value</code> + <code>onChange</code> з React-стану.</p>
  <p><strong>Stateless</strong> — чиста функція від props, немає власного <code>useState</code>. <strong>Stateful</strong> — має внутрішню памʼять. До хуків такий "без стану" компонент називався SFC (stateless functional component).</p>`,
        },
      ],
    },
    {
      id: 'fundamentals-lists-conditionals',
      title: '🔁 Списки, умовний рендеринг, форми',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Умовний рендеринг: тернарник, <code>&amp;&amp;</code> (⚠️ <code>count &amp;&amp; ...</code> з <code>count=0</code> виведе "0" в DOM), early return. Списки: <code>.map()</code> + стабільний <code>key</code> (не index, не random). Форма: <code>onSubmit</code> + <code>e.preventDefault()</code>.</p>`,
        },
      ],
    },
    {
      id: 'internals-reconciliation',
      title: '🌳 Reconciliation, Virtual DOM, Fiber',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Virtual DOM — JS-дерево елементів; React рахує diff і застосовує мінімум змін до реального DOM. Різний тип елемента → знести й перебудувати; однаковий → перевикористати. <code>key</code> — зіставлення елементів списку між рендерами; <code>key={index}</code> при реордері "зсуває" стан/значення інпутів на сусідні елементи. Fiber — переписаний reconciler (React 16+): дерево fiber-вузлів замість рекурсії, дозволяє переривати рендер.</p>
  <p><strong>Fiber-вузол vs DOM-вузол:</strong> Fiber несе <code>type</code>/<code>key</code>/<code>child</code>-<code>sibling</code>-<code>return</code>-звʼязки/<code>alternate</code> (посилання на попередній рендер)/<code>memoizedState</code> (хуки, за позицією!) — нічого з цього немає в тупому DOM-вузлі.</p>`,
        },
      ],
    },
    {
      id: 'internals-render-commit',
      title: '🎬 Render vs Commit фази',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>Фаза</th><th>Що</th><th>Переривна?</th></tr>
      <tr><td>Render</td><td>Виклик тіл компонентів, diff. Має бути чистою (без side-effects)</td><td>Так</td></tr>
      <tr><td>Commit</td><td>DOM-мутації, refs, useLayoutEffect (до paint), useEffect (після paint)</td><td>Ні, синхронна</td></tr>
    </table></div>
  <p>Side-effects — лише в <code>useEffect</code>, не в тілі компонента: render може викликатись повторно/відкидатись.</p>`,
        },
      ],
    },
    {
      id: 'internals-rerenders-batching',
      title: '🔄 Тригери ре-рендеру, Batching, StrictMode',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>4 тригери ре-рендеру: власний state, ре-рендер батька (без <code>memo</code> — і дитина теж), зміна Context, <code>useReducer</code> dispatch (навіть тим самим значенням — на відміну від <code>useState</code>, який бейлить). Batching (React 18): групування апдейтів стану скрізь (не лише в React-обробниках) — <code>flushSync</code> вимикає вручну. StrictMode — подвійний виклик рендеру/ефектів (і <code>console.log</code> теж!) <strong>лише в dev</strong>, викриває ефекти без cleanup. Обгортається один раз навколо кореня (<code>&lt;React.StrictMode&gt;</code>), у Next.js — увімкнено дефолтно.</p>
  <p><strong>StrictMode ≠ <code>'use strict'</code>:</strong> StrictMode — React-компонент, лише dev, подвоює рендер/ефекти. <code>'use strict'</code> — директива JS-мови, діє завжди (dev і прод), забороняє небезпечні конструкції. Нічого спільного, крім слова "strict".</p>`,
        },
      ],
    },
    {
      id: 'hooks-deep-dive',
      title: '🪝 Hooks — Deep Dive',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>Hook</th><th>Суть</th></tr>
      <tr><td><code>useEffect</code></td><td>[] mount/unmount, [dep] при зміні, без масиву — щорендеру. Stale closure → функціональний апдейт або useRef</td></tr>
      <tr><td><code>useMemo/useCallback</code></td><td>Дороге обчислення / стабільний референс для memo — не для тривіальних операцій</td></tr>
      <tr><td><code>useRef</code></td><td>DOM-ref, мутабельне значення без ре-рендеру, "живе" значення в effect</td></tr>
      <tr><td><code>useLayoutEffect</code></td><td>Синхронно до paint (layout/dimensions) — <code>useEffect</code> для решти 95%</td></tr>
      <tr><td><code>useReducer</code></td><td>Складний повʼязаний state, явні action-переходи</td></tr>
    </table></div>`,
        },
      ],
    },
    {
      id: 'hooks-concurrent',
      title: '⚡ useTransition / useDeferredValue',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><code>useTransition</code> — обгортає функцію-апдейт як неурочну (<code>startTransition(fn)</code> + <code>isPending</code>). <code>useDeferredValue</code> — те саме для готового значення ззовні. Обидва — non-urgent частина оновлення може перериватись урочнішою (React 18 concurrent rendering).</p>`,
        },
      ],
    },
    {
      id: 'hooks-custom',
      title: '🧵 Custom Hooks',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Функція <code>useXxx</code>, що викликає інші хуки — виносить stateful-логіку, не UI. Кожен виклик — ізольований стан (не шариться між компонентами). Приклади: <code>useDebouncedValue</code>, <code>useObservable</code> (RxJS у хуку).</p>`,
        },
      ],
    },
    {
      id: 'lifecycle-class-vs-functional',
      title: '🔄 Lifecycle компонента: Class vs Functional',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>Класовий метод</th><th>Хук-еквівалент</th></tr>
      <tr><td><code>constructor</code> (init state)</td><td><code>useState(initial)</code></td></tr>
      <tr><td><code>componentDidMount</code></td><td><code>useEffect(fn, [])</code></td></tr>
      <tr><td><code>componentDidUpdate</code></td><td><code>useEffect(fn, [dep])</code></td></tr>
      <tr><td><code>componentWillUnmount</code></td><td>return-функція з <code>useEffect</code></td></tr>
      <tr><td><code>shouldComponentUpdate</code></td><td><code>React.memo</code></td></tr>
      <tr><td><code>componentDidCatch</code></td><td>немає — Error Boundary й досі лише клас</td></tr>
    </table></div>
  <p>Фази: Mount → Update (на кожен ре-рендер) → Unmount. Єдиний обов'язковий метод класу — <code>render</code>. VS Code: сніпет <code>rcc</code> — класовий компонент, <code>rfc</code>/<code>rafce</code> — функціональний.</p>`,
        },
      ],
    },
    {
      id: 'performance-deep-dive',
      title: '🚀 Performance',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Метрика</th><th>Винуватець</th><th>Фікс</th></tr>
      <tr><td>LCP</td><td>важке hero-зображення, CSR</td><td>next/image priority, SSR/SSG</td></tr>
      <tr><td>CLS</td><td>медіа без width/height, FOUT</td><td>next/font, зарезервований розмір</td></tr>
      <tr><td>INP</td><td>важкі обробники, великий bundle</td><td>useTransition, code splitting</td></tr>
    </table>
  </div>
  <p><strong>Parent→Child→Grandchild:</strong> без memo — клік по стану Parent ре-рендерить усі три (каскад "згори вниз"). <code>memo(Child)</code> — Child бачить незмінні пропи й не виконується, тому Grandchild усередині нього взагалі не викликається. memo = межа, що зупиняє каскад у конкретному місці дерева.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// memo не рятує від нового референсу щорендеру — стабілізуй:
const style = useMemo(() => ({ color: 'red' }), []);
const onSelect = useCallback((id) => doSomething(id), []);
const Row = React.memo(RowImpl);

// Code splitting
const Settings = React.lazy(() => import('./Settings'));
<Suspense fallback={<Spinner />}>{show && <Settings />}</Suspense>

// Virtualization (react-window) — рендер лише видимих рядків
<FixedSizeList height={600} itemCount={items.length} itemSize={40}>
  {({ index, style }) => <div style={style}>{items[index].title}</div>}
</FixedSizeList>

// DevTools Profiler → Flamegraph/Ranked/"Why did this render?" — профілюй перед оптимізацією`,
        },
      ],
    },
    {
      id: 'react-devtools',
      title: '🔍 React DevTools як Senior',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><strong>Components tab:</strong> дерево + props/state/hooks конкретного вузла, inline-редагування, "Highlight updates when components render" (⚙️) — візуальна рамка на кожен реальний ре-рендер, <code>$r</code> у консолі — доступ до обраного компонента.</p>
  <p><strong>Profiler tab:</strong> Record → взаємодія → Stop → Flamegraph/Ranked + "Why did this render?". Воркфлоу: виявити (highlight updates) → виміряти (Profiler) → діагностувати (why did this render) → виправити (memo/стабілізація) → перевиміряти.</p>`,
        },
      ],
    },
    {
      id: 'state-boundaries',
      title: '🧭 Межі стану та Context',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Стан</th><th>Інструмент</th></tr>
      <tr><td>Локальний</td><td>useState/useReducer</td></tr>
      <tr><td>Серверний</td><td>TanStack Query</td></tr>
      <tr><td>UI глобальний</td><td>Zustand / Context (рідкісні оновлення!)</td></tr>
      <tr><td>URL</td><td>useSearchParams</td></tr>
    </table>
  </div>
  <p><strong>Context:</strong> будь-яка зміна value ре-рендерить УСІХ споживачів — не для частих оновлень. Розбивай на кілька контекстів + <code>useMemo</code> на value.</p>`,
        },
      ],
    },
    {
      id: 'state-zustand',
      title: '🐻 Zustand',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  addBear: () => set(state => ({ bears: state.bears + 1 })),
}));

// ❌ useBearStore() — ре-рендер при будь-якій зміні store
// ✅ useBearStore(state => state.bears) — селектор, гранулярний ре-рендер
// useShallow для кількох полів; slices pattern для великого store;
// middleware: devtools / persist / immer`,
        },
      ],
    },
    {
      id: 'state-tanstack-query',
      title: '🔄 TanStack Query',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `const { data, isLoading } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000,
});

const mutation = useMutation({
  mutationFn: createTodo,
  onMutate: async (t) => { /* optimistic setQueryData + return { previous } */ },
  onError: (e, t, ctx) => { /* rollback з ctx.previous */ },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
});
// staleTime — коли "застаріє", gcTime — коли видалиться з кешу, enabled — умовний запуск`,
        },
      ],
    },
    {
      id: 'state-rxjs',
      title: '🌊 RxJS у React',
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Один запит → <code>useEffect</code>/Query. Потік подій у часі (debounce, switchMap-скасування, комбінування кількох джерел) → RxJS у custom hook (<code>useObservable</code>).</p>`,
        },
      ],
    },
    {
      id: 'patterns',
      title: '🧩 Patterns',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `// Compound components — спільний стан через Context
const Tabs = { Root, Tab }; // <Tabs.Root><Tabs.Tab id="a">...

// Render props / HOC — legacy, хуки замінили в ~95% випадків
<MouseTracker render={({x,y}) => <span>{x},{y}</span>} />
const withAuth = (C) => (p) => useAuth().user ? <C {...p}/> : <Redirect/>;

// Controlled vs Uncontrolled
<input value={v} onChange={e => setV(e.target.value)} />   // controlled
<input ref={ref} defaultValue="" />                          // uncontrolled (великі форми)

// Container/Presentational → логіка тепер у custom hook, не в окремому container

// Error Boundary — ЛИШЕ клас (getDerivedStateFromError/componentDidCatch)
import { ErrorBoundary } from 'react-error-boundary';
<ErrorBoundary fallback={<ErrorPage />}><RiskyWidget /></ErrorBoundary>`,
        },
      ],
    },
    {
      id: 'nextjs-render-models',
      title: '🖥️ Next.js: рендер-моделі',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Mode</th><th>Коли</th></tr>
      <tr><td>CSR</td><td>Дашборди, інтерактивні частини</td></tr>
      <tr><td>SSR</td><td>Персоналізовані сторінки, auth</td></tr>
      <tr><td>SSG</td><td>Blog/marketing — статичний контент</td></tr>
      <tr><td>ISR (<code>revalidate</code>)</td><td>Часті, але не real-time дані</td></tr>
    </table>
  </div>
  <p>RSC ≠ SSR: SSR — <em>коли</em> рендериться HTML; RSC — <em>де живе</em> компонент (сервер, ніколи не в клієнтському бандлі). Пропи через <code>"use client"</code> межу — серіалізуються (без функцій/класів), крім <code>children</code>.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span>Hydration mismatch — <code>Date.now()</code>/<code>window</code>/<code>Math.random()</code> у рендері. Fix: <code>suppressHydrationWarning</code> або <code>useEffect</code>.</span></div>`,
        },
      ],
    },
    {
      id: 'nextjs-app-router',
      title: '▲ Next.js App Router',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th></th><th>Server</th><th>Client</th></tr>
      <tr><td>Default</td><td>✅</td><td>❌ 'use client'</td></tr>
      <tr><td>useState/Effect</td><td>❌</td><td>✅</td></tr>
      <tr><td>У JS bundle</td><td>❌</td><td>✅</td></tr>
    </table>
  </div>
  <div class="table-wrap">
    <table>
      <tr><th>Кеш</th><th>Де</th><th>Інвалідація</th></tr>
      <tr><td>Request Memoization</td><td>Сервер, per-request</td><td>Сама минає</td></tr>
      <tr><td>Data Cache</td><td>Сервер, persist</td><td>revalidatePath/Tag</td></tr>
      <tr><td>Full Route Cache</td><td>Сервер, persist</td><td>Ребілд / dynamic opt-out</td></tr>
      <tr><td>Router Cache</td><td>Клієнт, in-memory</td><td>router.refresh()</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `'use server';
export async function deletePost(id: string) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized'); // ⚠️ завжди перевіряй права
  await db.post.delete({ where: { id } });
  revalidatePath('/posts');
}`,
        },
      ],
    },
    {
      id: 'react-19-future',
      title: '✨ React 19 / майбутнє',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `// Actions — async у <form action>, React керує pending/помилками
// use() — читає Promise/Context, можна умовно (на відміну від хуків)
const user = use(userPromise);

// useActionState — форма + результат + pending
const [state, formAction, isPending] = useActionState(fn, initial);

// useOptimistic — миттєвий UI до підтвердження сервера

// React Compiler — авто useMemo/useCallback/memo на build-time (опційно)
// Next 15: async params/cookies(), fetch більше НЕ кешується за замовчуванням`,
        },
      ],
    },
  ],
}

