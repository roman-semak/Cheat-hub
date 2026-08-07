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
        }
      ]
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
        }
      ]
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
