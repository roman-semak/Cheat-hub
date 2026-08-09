// AUTO-GENERATED from CheetSheet/react/{index,cheatsheet}.html.
// Prose preserved as sanitized HTML blocks (styled via .cheat-prose) +
// extracted code blocks. Re-running the parser overwrites this file.
import type { TopicContent } from './types'

export const reactContent: TopicContent = {
  "slug": "react",
  "sections": [
    {
      "id": "hooks-deep-dive",
      "title": "🪝 Hooks — Deep Dive",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">useEffect — правила <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// Lifecycle analogy:</span>\n<span class=\"fn\">useEffect</span>(() => {\n  <span class=\"cmt\">// componentDidMount + componentDidUpdate</span>\n  <span class=\"kw\">return</span> () => { <span class=\"cmt\">/* componentWillUnmount */</span> };\n}, [dep]);        <span class=\"cmt\">// [] = тільки mount/unmount</span>\n                  <span class=\"cmt\">// без [] = кожен рендер</span>\n                  <span class=\"cmt\">// [dep] = при зміні dep</span></pre>\n    <pre><span class=\"cmt\">// Stale closure bug!</span>\n<span class=\"fn\">useEffect</span>(() => {\n  <span class=\"kw\">const</span> id = <span class=\"fn\">setInterval</span>(() => {\n    <span class=\"fn\">setCount</span>(count + <span class=\"num\">1</span>);  <span class=\"cmt\">// ❌ stale count=0</span>\n  }, <span class=\"num\">1000</span>);\n  <span class=\"kw\">return</span> () => <span class=\"fn\">clearInterval</span>(id);\n}, []);\n\n<span class=\"cmt\">// ✅ Functional update</span>\n<span class=\"fn\">setCount</span>(c => c + <span class=\"num\">1</span>);</pre>\n  </div><h3 class=\"topic\">useMemo / useCallback — коли використовувати <span class=\"tag tag-pit\">PITFALL</span></h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Hook</th><th>✅ Має сенс</th><th>❌ Не потрібно</th></tr>\n      <tr><td><strong>useMemo</strong></td><td>Дороге обчислення (filter 10k items), посилання для memo-компонента</td><td>Прості concat, тривіальні обчислення</td></tr>\n      <tr><td><strong>useCallback</strong></td><td>Функція йде в memo-компонент як prop або в dep array іншого hook</td><td>Локальні обробники на простих елементах</td></tr>\n      <tr><td><strong>React.memo</strong></td><td>Компонент ре-рендериться часто, рендер дорогий, props стабільні</td><td>Простий компонент, рідкісні оновлення</td></tr>\n    </table>\n  </div><h3 class=\"topic\">useRef — 3 use cases</h3><div class=\"grid3\">\n    <div class=\"card\"><h4>1. DOM ref</h4><pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> inputRef = <span class=\"fn\">useRef</span>&lt;HTMLInputElement&gt;(<span class=\"kw\">null</span>);\n<span class=\"cmt\">// &lt;input ref={inputRef} /&gt;</span>\ninputRef.current?.<span class=\"fn\">focus</span>();</pre></div>\n    <div class=\"card blue\"><h4>2. Mutable без ре-рендеру</h4><pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> timerRef = <span class=\"fn\">useRef</span>&lt;NodeJS.Timeout&gt;();\ntimerRef.current = <span class=\"fn\">setTimeout</span>(fn, <span class=\"num\">1000</span>);\n<span class=\"cmt\">// зміна .current не тригерить рендер</span></pre></div>\n    <div class=\"card green\"><h4>3. \"Живе\" значення в effect</h4><pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> valueRef = <span class=\"fn\">useRef</span>(value);\nvalueRef.current = value;\n<span class=\"cmt\">// effect завжди читає актуальне</span></pre></div>\n  </div><h3 class=\"topic\">useLayoutEffect vs useEffect</h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>useEffect (async)</h4><p>Виконується <strong>після</strong> paint. Не блокує браузер. Використовуй в 95% випадків.</p></div>\n    <div class=\"card yellow\"><h4>useLayoutEffect (sync)</h4><p>Виконується <strong>до</strong> paint, після DOM mutations. Для читання layout/dimensions, уникнення flash.</p></div>\n  </div><h3 class=\"topic\">useReducer vs useState</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// useState — для незалежних простих значень</span>\n<span class=\"kw\">const</span> [name, setName] = <span class=\"fn\">useState</span>(<span class=\"str\">''</span>);\n<span class=\"kw\">const</span> [loading, setLoading] = <span class=\"fn\">useState</span>(<span class=\"kw\">false</span>);</pre>\n    <pre><span class=\"cmt\">// useReducer — пов'язаний складний state</span>\n<span class=\"kw\">const</span> [state, dispatch] = <span class=\"fn\">useReducer</span>(reducer, {\n  data: <span class=\"kw\">null</span>, loading: <span class=\"kw\">false</span>, error: <span class=\"kw\">null</span>\n});\ndispatch({ type: <span class=\"str\">'FETCH_START'</span> });\ndispatch({ type: <span class=\"str\">'FETCH_SUCCESS'</span>, payload: data });</pre>\n  </div>"
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Custom Hooks <span class="tag tag-key">KEY</span></h3>
  <p>Функція, що починається з <code>use</code>, може викликати інші хуки всередині — і відповідає тим самим правилам хуків (не в умовах/циклах). Виносить <strong>логіку</strong> (стан, ефекти, підписки), а не UI — назад повертає дані/функції, компонент лишається "тупим".</p>
  <div class="grid2">
    <div class="card"><h4>useDebouncedValue</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useDebouncedValue</span>&lt;T&gt;(value: T, ms = <span class="num">300</span>) {
  <span class="kw">const</span> [debounced, setDebounced] = <span class="fn">useState</span>(value);
  <span class="fn">useEffect</span>(() => {
    <span class="kw">const</span> id = <span class="fn">setTimeout</span>(() => <span class="fn">setDebounced</span>(value), ms);
    <span class="kw">return</span> () => <span class="fn">clearTimeout</span>(id);
  }, [value, ms]);
  <span class="kw">return</span> debounced;
}</pre></div>
    <div class="card blue"><h4>useObservable (RxJS у хуку) — Sigma-тема</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useObservable</span>&lt;T&gt;(source$: Observable&lt;T&gt;, initial: T) {
  <span class="kw">const</span> [value, setValue] = <span class="fn">useState</span>(initial);
  <span class="fn">useEffect</span>(() => {
    <span class="kw">const</span> sub = source$.<span class="fn">subscribe</span>(setValue);
    <span class="kw">return</span> () => sub.<span class="fn">unsubscribe</span>();  <span class="cmt">// cleanup — обов'язково!</span>
  }, [source$]);
  <span class="kw">return</span> value;
}
<span class="cmt">// presence$, debouncedSearch$ і т.п. стають звичайним React-значенням</span></pre></div>
  </div>`
        }
      ]
    },
    {
      "id": "react-18-features",
      "title": "⚡ React 18+ Features",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Reconciliation (Fiber) <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card\"><h4>Дві фази</h4>\n      <p><strong>Render phase</strong> — можна переривати. Будує work-in-progress tree. Чисті функції, ніяких side-effects.</p>\n      <p style=\"margin-top:8px\"><strong>Commit phase</strong> — синхронна. DOM mutations, refs, useLayoutEffect, useEffect.</p>\n    </div>\n    <div class=\"card blue\"><h4>Правила reconciliation</h4>\n      <p>Різні типи → знести та побудувати з нуля.</p>\n      <p>Однакові типи → reuse, оновити props.</p>\n      <p>Списки → match по <code>key</code>. <strong>key={index} = баги!</strong></p>\n    </div>\n  </div><h3 class=\"topic\">useTransition + useDeferredValue <span class=\"tag tag-new\">React 18</span></h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// useTransition — для дій</span>\n<span class=\"kw\">const</span> [isPending, startTransition] = <span class=\"fn\">useTransition</span>();\n\n<span class=\"fn\">startTransition</span>(() => {\n  <span class=\"fn\">setFiltered</span>(items.<span class=\"fn\">filter</span>(i => i.includes(q)));\n});\n<span class=\"cmt\">// Urgent: input оновлюється відразу</span>\n<span class=\"cmt\">// Non-urgent: filter defer'иться</span></pre>\n    <pre><span class=\"cmt\">// useDeferredValue — для значень</span>\n<span class=\"kw\">const</span> [query, setQuery] = <span class=\"fn\">useState</span>(<span class=\"str\">''</span>);\n<span class=\"kw\">const</span> deferredQuery = <span class=\"fn\">useDeferredValue</span>(query);\n\n<span class=\"cmt\">// deferredQuery оновлюється коли є час</span>\n<span class=\"cmt\">// query — одразу (input responsive)</span>\n<span class=\"jsx\">&lt;</span><span class=\"fn\">SearchResults</span> query={deferredQuery} <span class=\"jsx\">/&gt;</span></pre>\n  </div><h3 class=\"topic\">Automatic Batching <span class=\"tag tag-new\">React 18</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// React 17: тільки event handlers\n// React 18: СКРІЗЬ (setTimeout, fetch, promises)\nsetTimeout(() => {\n  setCount(c => c + 1);      // React 18: один ре-рендер!\n  setName('Roman');           // React 17: два ре-рендери\n}, 0);\n\n// Вимкнути батчинг: flushSync()\nimport { flushSync } from 'react-dom';\nflushSync(() => setCount(c + 1));  // sync render"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">&lt;StrictMode&gt; — подвійний виклик лише в dev <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> <code>&lt;StrictMode&gt;</code> — це runtime-перемикач ЛИШЕ для development-збірки. Він навмисно ДВІЧІ викликає render-функцію компонента, тіло <code>useState</code>/<code>useMemo</code>/<code>useReducer</code> initializer'и, і — з React 18 — mount-фазу effects (mount → unmount → mount знову) на кожному компоненті всередині себе. <strong>Навіщо:</strong> викрити нечисті (impure) компоненти й ефекти без cleanup ще під час розробки, поки їх легко пофіксити, а не коли вони вже зламали concurrent-рендеринг у проді.</p><div class=\"alert alert-good\">\n            <strong>У продакшн-білді (<code>next build</code> / <code>vite build --mode production</code>) StrictMode нічого не подвоює.</strong> Це <em>runtime</em>-поведінка, що існує ТІЛЬКИ в dev-режимі — на відміну від Angular <code>--strict</code>, який є суто compile-time перевіркою й ніяк не змінює runtime (див. Angular → Architecture &amp; Bootstrap → Strict Mode).</div>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "function Counter() {\n  console.log('render');           // у dev під StrictMode виведе ДВІЧІ підряд\n\n  useEffect(() => {\n    console.log('mount');          // dev: mount → unmount → mount (двічі теж)\n    return () => console.log('unmount');\n  }, []);\n\n  const [state] = useState(() => {\n    console.log('init');           // lazy initializer також викликається двічі\n    return 0;\n  });\n\n  return <div>{state}</div>;\n}\n\n// ⚠️ Це виявляє ефекти БЕЗ cleanup — без StrictMode такий баг непомітний у dev,\n// але призводить до подвійних підписок/запитів у concurrent-режимі прод-рантайму:\nuseEffect(() => {\n  const id = setInterval(tick, 1000); // ❌ немає clearInterval → StrictMode покаже 2 інтервали\n}, []);\n\nuseEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);     // ✅ cleanup — StrictMode проходить чисто\n}, []);\n\n// Ввімкнення (App Router / Next.js): next.config.js → reactStrictMode: true (default)\n// Або вручну: <React.StrictMode><App /></React.StrictMode>"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"interview-tips\">\n            <div class=\"interview-tips-title\">🎤 На співбесіді часто запитують</div>\n            <ul>\n              <li>StrictMode впливає на прод-білд? → \"Ні — подвійні виклики лише в dev; прод-білд рендерить і викликає ефекти один раз.\"</li>\n              <li>Навіщо StrictMode подвоює рендер? → \"Виявити нечисті компоненти (side effects у тілі рендеру) заздалегідь, поки concurrent features (React 18+) на них не спіткнулись.\"</li>\n              <li>StrictMode в Angular є? → \"Немає прямого аналога. Angular --strict — compile-time TS/template перевірки, не runtime double-invoke.\"</li>\n            </ul>\n          </div>"
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Чому компонент ре-рендериться <span class="tag tag-key">KEY</span></h3>
  <p>Чотири тригери: (1) зміна власного <code>state</code>, (2) ре-рендер батька — <strong>дитина рендериться теж, навіть якщо її пропи не змінились</strong> (без <code>React.memo</code>), (3) зміна значення <code>Context</code>, яке вона споживає, (4) force update (<code>useReducer</code> dispatch того ж значення все одно триггерить рендер, на відміну від <code>useState</code> з тим самим значенням — React бейлить лише <code>useState</code>).</p>
  <div class="grid2">
    <div class="card red"><h4>❌ "Проп не змінився, а ре-рендер стався"</h4><pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">Parent</span>() {
  <span class="kw">const</span> [count, setCount] = <span class="fn">useState</span>(<span class="num">0</span>);
  <span class="kw">return</span> (
    <span class="jsx">&lt;&gt;</span>
      <span class="jsx">&lt;button</span> onClick={() =&gt; <span class="fn">setCount</span>(c =&gt; c+<span class="num">1</span>)}<span class="jsx">&gt;</span>{count}<span class="jsx">&lt;/button&gt;</span>
      <span class="jsx">&lt;</span><span class="fn">Child</span> label=<span class="str">"static"</span> <span class="jsx">/&gt;</span>  <span class="cmt">// проп не змінюється,</span>
    <span class="jsx">&lt;/&gt;</span>                                     <span class="cmt">// але Child теж рендериться!</span>
  );
}</pre></div>
    <div class="card green"><h4>✅ React.memo рве ланцюжок</h4><pre style="font-size:10.5px"><span class="kw">const</span> Child = React.<span class="fn">memo</span>(<span class="kw">function</span> <span class="fn">Child</span>({ label }) {
  <span class="kw">return</span> <span class="jsx">&lt;div&gt;</span>{label}<span class="jsx">&lt;/div&gt;</span>;
});
<span class="cmt">// Тепер Child ре-рендериться тільки якщо label реально змінився</span></pre></div>
  </div>
  <h3 class="topic">key={index} — конкретний баг <span class="tag tag-pit">PITFALL</span></h3>
  <p>Список інпутів з <code>key={index}</code>: видали/встав рядок посередині — React зіставляє елементи <strong>за позицією key</strong>, а не за змістом. Значення інпутів "перестрибують" на сусідні рядки, бо DOM-вузол переюзається для іншого айтема. Фікс — стабільний унікальний <code>key</code> (id даних, не індекс масиву).</p>`
        }
      ]
    },
    {
      id: 'performance-deep-dive',
      title: '🚀 Performance Deep Dive',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React.memo — коли працює, коли ні <span class="tag tag-key">KEY</span></h3>
  <p><code>React.memo</code> порівнює пропи <strong>поверхнево</strong> (<code>Object.is</code> по кожному ключу) і скіпає ре-рендер, якщо всі рівні. Не рятує, якщо проп — новий об'єкт/масив/функція на кожен рендер батька (референс завжди інший). Можна передати власний компаратор — але це рідко потрібно і легко зламати непомітно.</p>`,
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
  </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Профілювання — React DevTools Profiler <span class="tag tag-key">KEY</span></h3>
  <p>Вкладка <strong>Profiler</strong>: запиши взаємодію → <strong>Flamegraph</strong> показує, які компоненти рендерились і скільки це коштувало; <strong>Ranked</strong> сортує за тривалістю. Клік на компонент → секція <strong>"Why did this render?"</strong> (треба увімкнути в налаштуваннях) називає точну причину: hook changed, props changed, parent rendered.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span>Робочий процес на співбесіді/у реальності: спершу профілюй, потім оптимізуй. <code>useMemo</code>/<code>memo</code> навмання без вимірювання — передчасна оптимізація, яка додає складність без гарантованого ефекту.</span></div>`,
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
  </div>`,
        },
      ],
    },
    {
      id: 'state-context',
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
    <div class="card red"><h4>❌ Не годиться</h4><p>Часті оновлення (курсор миші, значення інпуту, real-time дані) — <strong>кожна зміна ре-рендерить УСІХ споживачів</strong> дерева під Provider, незалежно від того, яку частину value вони читають.</p></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Пом'якшення: розбий великий контекст на кілька менших за частотою зміни
<UserContext.Provider value={user}>       {/* рідко змінюється */}
  <ThemeContext.Provider value={theme}>   {/* рідко змінюється */}
    <CursorContext.Provider value={cursor}> {/* часто — тримай окремо, менше споживачів */}
      <App />
    </CursorContext.Provider>
  </ThemeContext.Provider>
</UserContext.Provider>

// І мемоізуй value — інакше новий {} на кожен рендер Provider'а рве memo споживачів
const value = useMemo(() => ({ user, setUser }), [user]);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">RxJS-в-React — коли потоки кращі за useEffect</h3>
  <div class="card blue"><p>Комбінування кількох async-джерел з операторами (<code>debounceTime</code>, <code>switchMap</code>, <code>combineLatest</code>) читабельніше й декларативніше, ніж вкладені <code>useEffect</code> з ручним cleanup — типово для presence-статусів, debounced search, синхронізації кількох сокетів. Обгортається в <code>useObservable</code> (див. Hooks — Deep Dive → Custom Hooks) і далі виглядає як звичайний React-стан.</p></div>`,
        },
      ],
    },
    {
      "id": "tanstack-query",
      "title": "🔄 TanStack Query",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Філософія: Server State ≠ Client State <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Anti-pattern (useEffect + useState)</h4>\n      <pre style=\"font-size:10.5px\"><span class=\"fn\">useEffect</span>(() => {\n  <span class=\"fn\">setLoading</span>(<span class=\"kw\">true</span>);\n  <span class=\"fn\">fetch</span>(<span class=\"str\">'/api/users'</span>)\n    .<span class=\"fn\">then</span>(r => r.<span class=\"fn\">json</span>())\n    .<span class=\"fn\">then</span>(setUsers)\n    .<span class=\"fn\">catch</span>(setError)\n    .<span class=\"fn\">finally</span>(() => <span class=\"fn\">setLoading</span>(<span class=\"kw\">false</span>));\n}, []);</pre>\n    </div>\n    <div class=\"card green\"><h4>✅ useQuery</h4>\n      <pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> { data, isLoading, error, refetch } = <span class=\"fn\">useQuery</span>({\n  queryKey: [<span class=\"str\">'users'</span>],\n  queryFn: () => <span class=\"fn\">fetchUsers</span>(),\n  staleTime: <span class=\"num\">5</span> * <span class=\"num\">60</span> * <span class=\"num\">1000</span>,  <span class=\"cmt\">// 5min</span>\n  gcTime: <span class=\"num\">10</span> * <span class=\"num\">60</span> * <span class=\"num\">1000</span>,   <span class=\"cmt\">// cacheTime</span>\n});</pre>\n    </div>\n  </div><h3 class=\"topic\">useMutation + Optimistic Updates <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const mutation = useMutation({\n  mutationFn: (todo: Todo) => createTodo(todo),\n  onMutate: async (newTodo) => {\n    await queryClient.cancelQueries({ queryKey: ['todos'] });\n    const previous = queryClient.getQueryData(['todos']);\n    queryClient.setQueryData(['todos'], old => [...old, newTodo]);  // optimistic!\n    return { previous };\n  },\n  onError: (err, newTodo, context) => {\n    queryClient.setQueryData(['todos'], context.previous);  // rollback\n  },\n  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] })\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">QueryKey — best practices</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Ієрархія: [resource, id, filters]\nqueryKey: ['users']                               // список\nqueryKey: ['users', userId]                        // один юзер\nqueryKey: ['users', userId, 'posts']              // пости юзера\nqueryKey: ['users', { page, filter, sort }]        // з параметрами\n\n// Invalidate по префіксу:\nqueryClient.invalidateQueries({ queryKey: ['users'] }); // всі users queries"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Корисні опції</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Опція</th><th>Default</th><th>Що робить</th></tr>\n      <tr><td><code>staleTime</code></td><td>0</td><td>Час до \"застарівання\". 0 = refetch при фокусі/mount</td></tr>\n      <tr><td><code>gcTime</code></td><td>5 min</td><td>Час до видалення з кешу після відписки</td></tr>\n      <tr><td><code>retry</code></td><td>3</td><td>К-сть retry при помилці</td></tr>\n      <tr><td><code>refetchOnWindowFocus</code></td><td>true</td><td>Refetch при поверненні на вкладку</td></tr>\n      <tr><td><code>enabled</code></td><td>true</td><td>false = не виконувати (чекати на умову)</td></tr>\n      <tr><td><code>select</code></td><td>—</td><td>Transform data перед поверненням у компонент</td></tr>\n      <tr><td><code>placeholderData</code></td><td>—</td><td>Дані-заглушка поки завантажується (keepPreviousData)</td></tr>\n    </table>\n  </div>"
        }
      ]
    },
    {
      "id": "zustand",
      "title": "🐻 Zustand",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Базовий store</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { create } from 'zustand';\n\ninterface BearState {\n  bears: number;\n  addBear: () => void;\n  reset: () => void;\n}\n\nexport const useBearStore = create<BearState>()((set) => ({\n  bears: 0,\n  addBear: () => set(state => ({ bears: state.bears + 1 })),\n  reset: () => set({ bears: 0 }),\n}));"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Selectors — уникай зайвих ре-рендерів <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// ❌ Ре-рендер при будь-якій зміні store</span>\n<span class=\"kw\">const</span> store = <span class=\"fn\">useBearStore</span>();\n<span class=\"kw\">const</span> bears = store.bears;</pre>\n    <pre><span class=\"cmt\">// ✅ Ре-рендер тільки при зміні bears</span>\n<span class=\"kw\">const</span> bears = <span class=\"fn\">useBearStore</span>(state => state.bears);\n\n<span class=\"cmt\">// Multiple fields — useShallow</span>\n<span class=\"kw\">import</span> { useShallow } <span class=\"kw\">from</span> <span class=\"str\">'zustand/react/shallow'</span>;\n<span class=\"kw\">const</span> { bears, fish } = <span class=\"fn\">useBearStore</span>(<span class=\"fn\">useShallow</span>(\n  state => ({ bears: state.bears, fish: state.fish })\n));</pre>\n  </div><h3 class=\"topic\">Slices Pattern (великий store)</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// userSlice.ts\nexport const createUserSlice = (set) => ({\n  user: null,\n  setUser: (user) => set({ user }),\n});\n\n// store.ts\nexport const useStore = create()((...args) => ({\n  ...createUserSlice(...args),\n  ...createCartSlice(...args),\n}));"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Middleware</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { devtools, persist, immer } from 'zustand/middleware';\n\nconst useStore = create(\n  devtools(              // Redux DevTools\n    persist(            // localStorage\n      immer((set) => ({  // мутабельні апдейти\n        items: [],\n        addItem: (item) => set(state => { state.items.push(item) }),\n      })),\n      { name: 'my-store' }\n    )\n  )\n);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Zustand vs Context <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Context для часто змінних даних</h4><p>Кожна зміна = ре-рендер ВСІХ споживачів. Навіть якщо вони не використовують змінену частину.</p></div>\n    <div class=\"card green\"><h4>✅ Zustand (або Jotai/Recoil)</h4><p>Гранулярні selectors. Ре-рендер тільки якщо вибрана частина state змінилась.</p></div>\n  </div>"
        }
      ]
    },
    {
      id: 'patterns',
      title: '🧩 Patterns',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Composition over inheritance <span class="tag tag-key">KEY</span></h3>
  <p>React не має класового наслідування компонентів — переюз через <strong>композицію</strong>: <code>children</code>, слоти-пропи, compound components (набір компонентів, що діляться неявним станом через Context).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Compound components — Tabs.Root ділиться станом через Context
const TabsCtx = createContext<{ active: string; setActive: (id: string) => void } | null>(null);

function Root({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsCtx.Provider value={{ active, setActive }}>{children}</TabsCtx.Provider>;
}
function Tab({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(TabsCtx)!;
  return <button onClick={() => ctx.setActive(id)} aria-selected={ctx.active === id}>{children}</button>;
}
export const Tabs = { Root, Tab };

// <Tabs.Root defaultTab="a"><Tabs.Tab id="a">A</Tabs.Tab><Tabs.Tab id="b">B</Tabs.Tab></Tabs.Root>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Render props / HOC — легасі-патерни</h3>
  <p>До хуків (React &lt;16.8) це були єдині способи переюзати stateful-логіку між компонентами. Хуки закрили ~95% цих кейсів простіше й без "wrapper hell". HOC ще трапляється для наскрізних речей на межі компонента (напр. обгортання в error boundary, injectу пропів з роутера в legacy-коді).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Render prop (legacy)
<MouseTracker render={({ x, y }) => <span>{x}, {y}</span>} />

// HOC (legacy)
const withAuth = (Component) => (props) =>
  useAuth().user ? <Component {...props} /> : <Redirect to="/login" />;

// Сучасний еквівалент — custom hook
const { x, y } = useMouseTracker();
const user = useAuth();
if (!user) return <Redirect to="/login" />;`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Controlled vs Uncontrolled</h3>
  <div class="grid2">
    <div class="card"><h4>Controlled</h4><pre style="font-size:10.5px"><span class="kw">const</span> [v, setV] = <span class="fn">useState</span>(<span class="str">''</span>);
<span class="jsx">&lt;input</span> value={v} onChange={e =&gt; <span class="fn">setV</span>(e.target.value)} <span class="jsx">/&gt;</span>
<span class="cmt">// React — source of truth, ре-рендер щокеystroke</span></pre></div>
    <div class="card blue"><h4>Uncontrolled</h4><pre style="font-size:10.5px"><span class="kw">const</span> ref = <span class="fn">useRef</span>&lt;HTMLInputElement&gt;(<span class="kw">null</span>);
<span class="jsx">&lt;input</span> ref={ref} defaultValue=<span class="str">""</span> <span class="jsx">/&gt;</span>
<span class="cmt">// DOM — source of truth, читаєш ref.current.value при сабміті</span></pre></div>
  </div>
  <p>Uncontrolled + <code>ref</code> виправданий для великих форм (сотні полів) — без ре-рендеру всієї форми на кожен keystroke; react-hook-form побудований саме на цьому.</p>
  <h3 class="topic">Container / Presentational — межа розмилась</h3>
  <p>До хуків: Container (клас, логіка/дані) рендерить Presentational (функція, тільки UI). Зараз логіка виноситься в <strong>custom hook</strong>, а не в окремий container-компонент — один функціональний компонент викликає хук і рендерить UI. Розділення лишається корисним як <em>ідея</em> (розділяй "звідки дані" і "як показати"), але не як обов'язкова пара файлів/компонентів.</p>
  <h3 class="topic">Error Boundaries <span class="tag tag-pit">PITFALL</span></h3>
  <p>Ловлять помилки рендеру дочірнього дерева. Досі <strong>тільки клас-компонент</strong> — немає хук-еквівалента <code>getDerivedStateFromError</code>/<code>componentDidCatch</code>. На практиці беруть готову бібліотеку <code>react-error-boundary</code> замість написання класу вручну.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<ErrorPage />} onError={(e) => logError(e)}>
  <RiskyWidget />
</ErrorBoundary>
// Не ловить: помилки в event handlers, async код, SSR-помилки, помилки самого boundary`,
        },
      ],
    },
    {
      id: 'react-19',
      title: '✨ React 19',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Actions <span class="tag tag-new">React 19</span></h3>
  <p><code>async</code>-функція, яку можна передати в <code>&lt;form action&gt;</code> або викликати в transition. React сам керує pending-станом, помилками й послідовністю (навіть кілька submit підряд не гонять один одного). Детально Server Actions у Next.js — див. Next.js → Server Actions і мутації. Там же — Next.js 15 breaking changes: <code>params</code>/<code>searchParams</code>/<code>cookies()</code>/<code>headers()</code> стали <code>Promise</code>, і <code>fetch</code> більше не кешується за замовчуванням.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// use() — читає Promise або Context, МОЖНА умовно (на відміну від звичайних хуків)
function Profile({ userPromise }: { userPromise: Promise<User> }) {
  if (!userPromise) return null;      // ✅ хуки так не можна, use() — можна
  const user = use(userPromise);      // "призупиняє" компонент до resolve (як Suspense)
  return <div>{user.name}</div>;
}

// useActionState — форма + результат + pending в одному хуку
const [state, formAction, isPending] = useActionState(
  async (prevState, formData: FormData) => {
    const res = await createUser(formData);
    return res.error ? { error: res.error } : { success: true };
  },
  { error: null },
);
// <form action={formAction}>...<button disabled={isPending}>Save</button></form>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React Compiler <span class="tag tag-new">RC / опційний</span></h3>
  <p>Build-time плагін: сам додає memoization (еквівалент ручних <code>useMemo</code>/<code>useCallback</code>/<code>React.memo</code>) аналізуючи код компонента. Мета — прибрати ручну оптимізацію як джерело багів (забутий dep у масиві залежностей). Не означає "не вчити useMemo" для співбесіди — розуміння <em>чому</em> компілятор це робить і коли ручна оптимізація й досі потрібна (об'єкти поза рендером, складні кейси) все ще питають.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span>Статус на серпень 2026: React Compiler — production-ready в React 19, опційний (incremental adoption), потребує ESLint-плагін для перевірки "compiler-safe" коду (чисті компоненти, дотримання Rules of Hooks).</span></div>`,
        },
      ],
    },
    {
      "id": "nextjs-app-router",
      "title": "▲ Next.js App Router",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Server vs Client Components <span class=\"tag tag-key\">KEY</span></h3><div class=\"table-wrap\">\n    <table>\n      <tr><th></th><th>Server Component</th><th>Client Component</th></tr>\n      <tr><td><strong>Default</strong></td><td>✅ Так</td><td>❌ Потрібен 'use client'</td></tr>\n      <tr><td><strong>async/await</strong></td><td>✅</td><td>❌</td></tr>\n      <tr><td><strong>useState/useEffect</strong></td><td>❌</td><td>✅</td></tr>\n      <tr><td><strong>Event handlers</strong></td><td>❌</td><td>✅</td></tr>\n      <tr><td><strong>DB/FS доступ</strong></td><td>✅</td><td>❌</td></tr>\n      <tr><td><strong>У JS bundle</strong></td><td>❌ (не йде!)</td><td>✅</td></tr>\n      <tr><td><strong>Browser APIs</strong></td><td>❌</td><td>✅</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Rendering modes</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Mode</th><th>Next.js</th><th>Коли</th></tr>\n      <tr><td><strong>SSR</strong></td><td><code>cache: 'no-store'</code> або dynamic</td><td>Персоналізовані сторінки, auth</td></tr>\n      <tr><td><strong>SSG</strong></td><td><code>cache: 'force-cache'</code> (default)</td><td>Blog posts, marketing pages</td></tr>\n      <tr><td><strong>ISR</strong></td><td><code>next: { revalidate: 60 }</code></td><td>Новини, продукти — часті але не real-time</td></tr>\n      <tr><td><strong>CSR</strong></td><td>'use client' + useEffect/TanStack</td><td>Дашборди, інтерактивні части</td></tr>\n    </table>\n  </div><h3 class=\"topic\">File conventions</h3><div class=\"grid2\">\n    <div class=\"card\"><h4>app/ structure</h4>\n      <pre style=\"font-size:10.5px\">app/\n  layout.tsx        <span class=\"cmt\">← shared layout (persistent)</span>\n  page.tsx          <span class=\"cmt\">← route UI</span>\n  loading.tsx       <span class=\"cmt\">← Suspense fallback</span>\n  error.tsx         <span class=\"cmt\">← error boundary ('use client'!)</span>\n  not-found.tsx     <span class=\"cmt\">← 404</span>\n  route.ts          <span class=\"cmt\">← API Route Handler</span>\n  template.tsx      <span class=\"cmt\">← re-mount on nav (vs layout)</span></pre>\n    </div>\n    <div class=\"card blue\"><h4>Server Actions</h4>\n      <pre style=\"font-size:10.5px\"><span class=\"str\">'use server'</span>;\n\n<span class=\"kw\">export async function</span> <span class=\"fn\">deletePost</span>(id: string) {\n  <span class=\"kw\">const</span> session = <span class=\"kw\">await</span> <span class=\"fn\">getSession</span>();\n  <span class=\"kw\">if</span> (!session) <span class=\"kw\">throw new</span> <span class=\"fn\">Error</span>(<span class=\"str\">'Unauthorized'</span>);\n  <span class=\"kw\">await</span> db.post.<span class=\"fn\">delete</span>({ where: { id } });\n  <span class=\"fn\">revalidatePath</span>(<span class=\"str\">'/posts'</span>);\n}\n<span class=\"cmt\">// ⚠️ ЗАВЖДИ перевіряй права в Server Actions!</span></pre>\n    </div>\n  </div><h3 class=\"topic\">Streaming + Suspense</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// app/page.tsx — Server Component\nexport default function Page() {\n  return (\n    <>\n      <Header />                                    {/* Відразу */}\n      <Suspense fallback={<DashboardSkeleton />}>\n        <SlowDashboard />                          {/* Стрімиться окремо */}\n      </Suspense>\n    </>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n    <span class=\"icon\">⚠️</span>\n    <span><strong>Gotcha:</strong> Hydration mismatch — якщо Server і Client рендер відрізняються (Date.now(), window, Math.random()). Використовуй <code>suppressHydrationWarning</code> або <code>useEffect</code> для browser-only контенту.</span>\n  </div><div class=\"alert warn\">\n    <span class=\"icon\">⚠️</span>\n    <span><strong>Bundle leak:</strong> 'use client' на \"корінь\" фічі = всі дочірні модулі йдуть в bundle. Client Components можуть отримувати Server Components тільки через <code>children</code>, не через import!</span>\n  </div>"
        }
      ]
    }
  ]
}

export const reactCheat: TopicContent = {
  "slug": "react",
  "sections": [
    {
      "id": "hooks-deep-dive",
      "title": "🪝 Hooks — Deep Dive",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">useEffect — правила <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// Lifecycle analogy:</span>\n<span class=\"fn\">useEffect</span>(() => {\n  <span class=\"cmt\">// componentDidMount + componentDidUpdate</span>\n  <span class=\"kw\">return</span> () => { <span class=\"cmt\">/* componentWillUnmount */</span> };\n}, [dep]);        <span class=\"cmt\">// [] = тільки mount/unmount</span>\n                  <span class=\"cmt\">// без [] = кожен рендер</span>\n                  <span class=\"cmt\">// [dep] = при зміні dep</span></pre>\n    <pre><span class=\"cmt\">// Stale closure bug!</span>\n<span class=\"fn\">useEffect</span>(() => {\n  <span class=\"kw\">const</span> id = <span class=\"fn\">setInterval</span>(() => {\n    <span class=\"fn\">setCount</span>(count + <span class=\"num\">1</span>);  <span class=\"cmt\">// ❌ stale count=0</span>\n  }, <span class=\"num\">1000</span>);\n  <span class=\"kw\">return</span> () => <span class=\"fn\">clearInterval</span>(id);\n}, []);\n\n<span class=\"cmt\">// ✅ Functional update</span>\n<span class=\"fn\">setCount</span>(c => c + <span class=\"num\">1</span>);</pre>\n  </div><h3 class=\"topic\">useMemo / useCallback — коли використовувати <span class=\"tag tag-pit\">PITFALL</span></h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Hook</th><th>✅ Має сенс</th><th>❌ Не потрібно</th></tr>\n      <tr><td><strong>useMemo</strong></td><td>Дороге обчислення (filter 10k items), посилання для memo-компонента</td><td>Прості concat, тривіальні обчислення</td></tr>\n      <tr><td><strong>useCallback</strong></td><td>Функція йде в memo-компонент як prop або в dep array іншого hook</td><td>Локальні обробники на простих елементах</td></tr>\n      <tr><td><strong>React.memo</strong></td><td>Компонент ре-рендериться часто, рендер дорогий, props стабільні</td><td>Простий компонент, рідкісні оновлення</td></tr>\n    </table>\n  </div><h3 class=\"topic\">useRef — 3 use cases</h3><div class=\"grid3\">\n    <div class=\"card\"><h4>1. DOM ref</h4><pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> inputRef = <span class=\"fn\">useRef</span>&lt;HTMLInputElement&gt;(<span class=\"kw\">null</span>);\n<span class=\"cmt\">// &lt;input ref={inputRef} /&gt;</span>\ninputRef.current?.<span class=\"fn\">focus</span>();</pre></div>\n    <div class=\"card blue\"><h4>2. Mutable без ре-рендеру</h4><pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> timerRef = <span class=\"fn\">useRef</span>&lt;NodeJS.Timeout&gt;();\ntimerRef.current = <span class=\"fn\">setTimeout</span>(fn, <span class=\"num\">1000</span>);\n<span class=\"cmt\">// зміна .current не тригерить рендер</span></pre></div>\n    <div class=\"card green\"><h4>3. \"Живе\" значення в effect</h4><pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> valueRef = <span class=\"fn\">useRef</span>(value);\nvalueRef.current = value;\n<span class=\"cmt\">// effect завжди читає актуальне</span></pre></div>\n  </div><h3 class=\"topic\">useLayoutEffect vs useEffect</h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>useEffect (async)</h4><p>Виконується <strong>після</strong> paint. Не блокує браузер. Використовуй в 95% випадків.</p></div>\n    <div class=\"card yellow\"><h4>useLayoutEffect (sync)</h4><p>Виконується <strong>до</strong> paint, після DOM mutations. Для читання layout/dimensions, уникнення flash.</p></div>\n  </div><h3 class=\"topic\">useReducer vs useState</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// useState — для незалежних простих значень</span>\n<span class=\"kw\">const</span> [name, setName] = <span class=\"fn\">useState</span>(<span class=\"str\">''</span>);\n<span class=\"kw\">const</span> [loading, setLoading] = <span class=\"fn\">useState</span>(<span class=\"kw\">false</span>);</pre>\n    <pre><span class=\"cmt\">// useReducer — пов'язаний складний state</span>\n<span class=\"kw\">const</span> [state, dispatch] = <span class=\"fn\">useReducer</span>(reducer, {\n  data: <span class=\"kw\">null</span>, loading: <span class=\"kw\">false</span>, error: <span class=\"kw\">null</span>\n});\ndispatch({ type: <span class=\"str\">'FETCH_START'</span> });\ndispatch({ type: <span class=\"str\">'FETCH_SUCCESS'</span>, payload: data });</pre>\n  </div>"
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Custom Hooks</h3><div class="grid2">
    <pre style="font-size:10.5px"><span class="kw">function</span> <span class="fn">useDebouncedValue</span>&lt;T&gt;(v: T, ms=<span class="num">300</span>) {
  <span class="kw">const</span> [d, setD] = <span class="fn">useState</span>(v);
  <span class="fn">useEffect</span>(() => {
    <span class="kw">const</span> id = <span class="fn">setTimeout</span>(() => <span class="fn">setD</span>(v), ms);
    <span class="kw">return</span> () => <span class="fn">clearTimeout</span>(id);
  }, [v, ms]);
  <span class="kw">return</span> d;
}</pre>
    <pre style="font-size:10.5px"><span class="cmt">// useObservable — RxJS у хуку</span>
<span class="kw">function</span> <span class="fn">useObservable</span>&lt;T&gt;(src$: Observable&lt;T&gt;, init: T) {
  <span class="kw">const</span> [v, setV] = <span class="fn">useState</span>(init);
  <span class="fn">useEffect</span>(() => {
    <span class="kw">const</span> sub = src$.<span class="fn">subscribe</span>(setV);
    <span class="kw">return</span> () => sub.<span class="fn">unsubscribe</span>();
  }, [src$]);
  <span class="kw">return</span> v;
}</pre>
  </div>`
        }
      ]
    },
    {
      "id": "react-18-features",
      "title": "⚡ React 18+ Features",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Reconciliation (Fiber) <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card\"><h4>Дві фази</h4>\n      <p><strong>Render phase</strong> — можна переривати. Будує work-in-progress tree. Чисті функції, ніяких side-effects.</p>\n      <p style=\"margin-top:8px\"><strong>Commit phase</strong> — синхронна. DOM mutations, refs, useLayoutEffect, useEffect.</p>\n    </div>\n    <div class=\"card blue\"><h4>Правила reconciliation</h4>\n      <p>Різні типи → знести та побудувати з нуля.</p>\n      <p>Однакові типи → reuse, оновити props.</p>\n      <p>Списки → match по <code>key</code>. <strong>key={index} = баги!</strong></p>\n    </div>\n  </div><h3 class=\"topic\">useTransition + useDeferredValue <span class=\"tag tag-new\">React 18</span></h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// useTransition — для дій</span>\n<span class=\"kw\">const</span> [isPending, startTransition] = <span class=\"fn\">useTransition</span>();\n\n<span class=\"fn\">startTransition</span>(() => {\n  <span class=\"fn\">setFiltered</span>(items.<span class=\"fn\">filter</span>(i => i.includes(q)));\n});\n<span class=\"cmt\">// Urgent: input оновлюється відразу</span>\n<span class=\"cmt\">// Non-urgent: filter defer'иться</span></pre>\n    <pre><span class=\"cmt\">// useDeferredValue — для значень</span>\n<span class=\"kw\">const</span> [query, setQuery] = <span class=\"fn\">useState</span>(<span class=\"str\">''</span>);\n<span class=\"kw\">const</span> deferredQuery = <span class=\"fn\">useDeferredValue</span>(query);\n\n<span class=\"cmt\">// deferredQuery оновлюється коли є час</span>\n<span class=\"cmt\">// query — одразу (input responsive)</span>\n<span class=\"jsx\">&lt;</span><span class=\"fn\">SearchResults</span> query={deferredQuery} <span class=\"jsx\">/&gt;</span></pre>\n  </div><h3 class=\"topic\">Automatic Batching <span class=\"tag tag-new\">React 18</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// React 17: тільки event handlers\n// React 18: СКРІЗЬ (setTimeout, fetch, promises)\nsetTimeout(() => {\n  setCount(c => c + 1);      // React 18: один ре-рендер!\n  setName('Roman');           // React 17: два ре-рендери\n}, 0);\n\n// Вимкнути батчинг: flushSync()\nimport { flushSync } from 'react-dom';\nflushSync(() => setCount(c + 1));  // sync render"
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Чому ре-рендер?</h3><p>State (own) · ре-рендер батька (без <code>memo</code> — і дитина теж!) · зміна Context · force update. <code>key={index}</code> у списку з реордером = значення інпутів "стрибають" між рядками — юзай стабільний id.</p>`
        }
      ]
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
  </div>`,
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

// DevTools Profiler → Flamegraph/Ranked/"Why did this render?"`,
        },
      ],
    },
    {
      id: 'state-context',
      title: '🧭 Межі стану',
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
      "id": "tanstack-query",
      "title": "🔄 TanStack Query",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Філософія: Server State ≠ Client State <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Anti-pattern (useEffect + useState)</h4>\n      <pre style=\"font-size:10.5px\"><span class=\"fn\">useEffect</span>(() => {\n  <span class=\"fn\">setLoading</span>(<span class=\"kw\">true</span>);\n  <span class=\"fn\">fetch</span>(<span class=\"str\">'/api/users'</span>)\n    .<span class=\"fn\">then</span>(r => r.<span class=\"fn\">json</span>())\n    .<span class=\"fn\">then</span>(setUsers)\n    .<span class=\"fn\">catch</span>(setError)\n    .<span class=\"fn\">finally</span>(() => <span class=\"fn\">setLoading</span>(<span class=\"kw\">false</span>));\n}, []);</pre>\n    </div>\n    <div class=\"card green\"><h4>✅ useQuery</h4>\n      <pre style=\"font-size:10.5px\"><span class=\"kw\">const</span> { data, isLoading, error, refetch } = <span class=\"fn\">useQuery</span>({\n  queryKey: [<span class=\"str\">'users'</span>],\n  queryFn: () => <span class=\"fn\">fetchUsers</span>(),\n  staleTime: <span class=\"num\">5</span> * <span class=\"num\">60</span> * <span class=\"num\">1000</span>,  <span class=\"cmt\">// 5min</span>\n  gcTime: <span class=\"num\">10</span> * <span class=\"num\">60</span> * <span class=\"num\">1000</span>,   <span class=\"cmt\">// cacheTime</span>\n});</pre>\n    </div>\n  </div><h3 class=\"topic\">useMutation + Optimistic Updates <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "const mutation = useMutation({\n  mutationFn: (todo: Todo) => createTodo(todo),\n  onMutate: async (newTodo) => {\n    await queryClient.cancelQueries({ queryKey: ['todos'] });\n    const previous = queryClient.getQueryData(['todos']);\n    queryClient.setQueryData(['todos'], old => [...old, newTodo]);  // optimistic!\n    return { previous };\n  },\n  onError: (err, newTodo, context) => {\n    queryClient.setQueryData(['todos'], context.previous);  // rollback\n  },\n  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] })\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">QueryKey — best practices</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// Ієрархія: [resource, id, filters]\nqueryKey: ['users']                               // список\nqueryKey: ['users', userId]                        // один юзер\nqueryKey: ['users', userId, 'posts']              // пости юзера\nqueryKey: ['users', { page, filter, sort }]        // з параметрами\n\n// Invalidate по префіксу:\nqueryClient.invalidateQueries({ queryKey: ['users'] }); // всі users queries"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Корисні опції</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Опція</th><th>Default</th><th>Що робить</th></tr>\n      <tr><td><code>staleTime</code></td><td>0</td><td>Час до \"застарівання\". 0 = refetch при фокусі/mount</td></tr>\n      <tr><td><code>gcTime</code></td><td>5 min</td><td>Час до видалення з кешу після відписки</td></tr>\n      <tr><td><code>retry</code></td><td>3</td><td>К-сть retry при помилці</td></tr>\n      <tr><td><code>refetchOnWindowFocus</code></td><td>true</td><td>Refetch при поверненні на вкладку</td></tr>\n      <tr><td><code>enabled</code></td><td>true</td><td>false = не виконувати (чекати на умову)</td></tr>\n      <tr><td><code>select</code></td><td>—</td><td>Transform data перед поверненням у компонент</td></tr>\n      <tr><td><code>placeholderData</code></td><td>—</td><td>Дані-заглушка поки завантажується (keepPreviousData)</td></tr>\n    </table>\n  </div>"
        }
      ]
    },
    {
      "id": "zustand",
      "title": "🐻 Zustand",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Базовий store</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { create } from 'zustand';\n\ninterface BearState {\n  bears: number;\n  addBear: () => void;\n  reset: () => void;\n}\n\nexport const useBearStore = create<BearState>()((set) => ({\n  bears: 0,\n  addBear: () => set(state => ({ bears: state.bears + 1 })),\n  reset: () => set({ bears: 0 }),\n}));"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Selectors — уникай зайвих ре-рендерів <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// ❌ Ре-рендер при будь-якій зміні store</span>\n<span class=\"kw\">const</span> store = <span class=\"fn\">useBearStore</span>();\n<span class=\"kw\">const</span> bears = store.bears;</pre>\n    <pre><span class=\"cmt\">// ✅ Ре-рендер тільки при зміні bears</span>\n<span class=\"kw\">const</span> bears = <span class=\"fn\">useBearStore</span>(state => state.bears);\n\n<span class=\"cmt\">// Multiple fields — useShallow</span>\n<span class=\"kw\">import</span> { useShallow } <span class=\"kw\">from</span> <span class=\"str\">'zustand/react/shallow'</span>;\n<span class=\"kw\">const</span> { bears, fish } = <span class=\"fn\">useBearStore</span>(<span class=\"fn\">useShallow</span>(\n  state => ({ bears: state.bears, fish: state.fish })\n));</pre>\n  </div><h3 class=\"topic\">Slices Pattern (великий store)</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// userSlice.ts\nexport const createUserSlice = (set) => ({\n  user: null,\n  setUser: (user) => set({ user }),\n});\n\n// store.ts\nexport const useStore = create()((...args) => ({\n  ...createUserSlice(...args),\n  ...createCartSlice(...args),\n}));"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Middleware</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "import { devtools, persist, immer } from 'zustand/middleware';\n\nconst useStore = create(\n  devtools(              // Redux DevTools\n    persist(            // localStorage\n      immer((set) => ({  // мутабельні апдейти\n        items: [],\n        addItem: (item) => set(state => { state.items.push(item) }),\n      })),\n      { name: 'my-store' }\n    )\n  )\n);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Zustand vs Context <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Context для часто змінних даних</h4><p>Кожна зміна = ре-рендер ВСІХ споживачів. Навіть якщо вони не використовують змінену частину.</p></div>\n    <div class=\"card green\"><h4>✅ Zustand (або Jotai/Recoil)</h4><p>Гранулярні selectors. Ре-рендер тільки якщо вибрана частина state змінилась.</p></div>\n  </div>"
        }
      ]
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
      id: 'react-19',
      title: '✨ React 19',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `// Actions — async-функція у <form action>, React керує pending/помилками
// use() — читає Promise/Context, можна умовно (на відміну від хуків)
const user = use(userPromise);

// useActionState — форма + результат + pending
const [state, formAction, isPending] = useActionState(fn, initial);
// <form action={formAction}><button disabled={isPending}>Save</button></form>

// React Compiler — авто useMemo/useCallback/memo на build-time
// RC, опційний, все одно треба розуміти ручну оптимізацію для співбесіди`,
        },
      ],
    },
    {
      "id": "nextjs-app-router",
      "title": "▲ Next.js App Router",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Server vs Client Components <span class=\"tag tag-key\">KEY</span></h3><div class=\"table-wrap\">\n    <table>\n      <tr><th></th><th>Server Component</th><th>Client Component</th></tr>\n      <tr><td><strong>Default</strong></td><td>✅ Так</td><td>❌ Потрібен 'use client'</td></tr>\n      <tr><td><strong>async/await</strong></td><td>✅</td><td>❌</td></tr>\n      <tr><td><strong>useState/useEffect</strong></td><td>❌</td><td>✅</td></tr>\n      <tr><td><strong>Event handlers</strong></td><td>❌</td><td>✅</td></tr>\n      <tr><td><strong>DB/FS доступ</strong></td><td>✅</td><td>❌</td></tr>\n      <tr><td><strong>У JS bundle</strong></td><td>❌ (не йде!)</td><td>✅</td></tr>\n      <tr><td><strong>Browser APIs</strong></td><td>❌</td><td>✅</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Rendering modes</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Mode</th><th>Next.js</th><th>Коли</th></tr>\n      <tr><td><strong>SSR</strong></td><td><code>cache: 'no-store'</code> або dynamic</td><td>Персоналізовані сторінки, auth</td></tr>\n      <tr><td><strong>SSG</strong></td><td><code>cache: 'force-cache'</code> (default)</td><td>Blog posts, marketing pages</td></tr>\n      <tr><td><strong>ISR</strong></td><td><code>next: { revalidate: 60 }</code></td><td>Новини, продукти — часті але не real-time</td></tr>\n      <tr><td><strong>CSR</strong></td><td>'use client' + useEffect/TanStack</td><td>Дашборди, інтерактивні части</td></tr>\n    </table>\n  </div><h3 class=\"topic\">File conventions</h3><div class=\"grid2\">\n    <div class=\"card\"><h4>app/ structure</h4>\n      <pre style=\"font-size:10.5px\">app/\n  layout.tsx        <span class=\"cmt\">← shared layout (persistent)</span>\n  page.tsx          <span class=\"cmt\">← route UI</span>\n  loading.tsx       <span class=\"cmt\">← Suspense fallback</span>\n  error.tsx         <span class=\"cmt\">← error boundary ('use client'!)</span>\n  not-found.tsx     <span class=\"cmt\">← 404</span>\n  route.ts          <span class=\"cmt\">← API Route Handler</span>\n  template.tsx      <span class=\"cmt\">← re-mount on nav (vs layout)</span></pre>\n    </div>\n    <div class=\"card blue\"><h4>Server Actions</h4>\n      <pre style=\"font-size:10.5px\"><span class=\"str\">'use server'</span>;\n\n<span class=\"kw\">export async function</span> <span class=\"fn\">deletePost</span>(id: string) {\n  <span class=\"kw\">const</span> session = <span class=\"kw\">await</span> <span class=\"fn\">getSession</span>();\n  <span class=\"kw\">if</span> (!session) <span class=\"kw\">throw new</span> <span class=\"fn\">Error</span>(<span class=\"str\">'Unauthorized'</span>);\n  <span class=\"kw\">await</span> db.post.<span class=\"fn\">delete</span>({ where: { id } });\n  <span class=\"fn\">revalidatePath</span>(<span class=\"str\">'/posts'</span>);\n}\n<span class=\"cmt\">// ⚠️ ЗАВЖДИ перевіряй права в Server Actions!</span></pre>\n    </div>\n  </div><h3 class=\"topic\">Streaming + Suspense</h3>"
        },
        {
          "kind": "code",
          "language": "tsx",
          "code": "// app/page.tsx — Server Component\nexport default function Page() {\n  return (\n    <>\n      <Header />                                    {/* Відразу */}\n      <Suspense fallback={<DashboardSkeleton />}>\n        <SlowDashboard />                          {/* Стрімиться окремо */}\n      </Suspense>\n    </>\n  );\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n    <span class=\"icon\">⚠️</span>\n    <span><strong>Gotcha:</strong> Hydration mismatch — якщо Server і Client рендер відрізняються (Date.now(), window, Math.random()). Використовуй <code>suppressHydrationWarning</code> або <code>useEffect</code> для browser-only контенту.</span>\n  </div><div class=\"alert warn\">\n    <span class=\"icon\">⚠️</span>\n    <span><strong>Bundle leak:</strong> 'use client' на \"корінь\" фічі = всі дочірні модулі йдуть в bundle. Client Components можуть отримувати Server Components тільки через <code>children</code>, не через import!</span>\n  </div>"
        }
      ]
    }
  ]
}
