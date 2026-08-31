import type { QuickRefBlock } from './types'

// React's quickref board. Core blocks were authored fresh for the dense
// card format; the trailing blocks (Мемоізація onward) supplement gaps
// found in the old prose `reactCheat` sheet (react.ts), condensed into the
// same compact style rather than ported 1:1.
export const reactQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'Основи',
    icon: '🧬',
    entries: [
      { term: 'Reconciliation', desc: 'diffing нового Virtual DOM зі старим' },
      { term: 'key', desc: 'стабільна ідентичність у списку' },
      { term: 'Derived state', desc: 'рахуй зі state/props, не зберігай' },
      { term: 'Suspense', desc: 'fallback поки діти не готові' },
    ],
  },
  {
    label: 'Virtual DOM & дерева',
    icon: '🌳',
    entries: [
      {
        term: 'Virtual DOM',
        desc:
          "легкий JS-об'єкт, що описує UI («віртуалізація»); React оновлює в реальному DOM лише різницю",
      },
      { term: 'Element tree', desc: 'результат createElement/JSX — яким UI МАЄ бути' },
      {
        term: 'Fiber tree',
        desc: 'внутрішня work-in-progress структура (child/sibling/return) — для планування й переривання',
      },
      { term: 'DOM tree', desc: 'реальні вузли браузера — оновлюються лише на commit' },
    ],
  },
  {
    label: 'Lifecycle: Mount → Update → Unmount',
    icon: '📍',
    phases: [
      {
        phase: 'Mount',
        desc: 'перший рендер в DOM',
        hooks: [
          'useState(init)',
          'useReducer(init)',
          'useRef(init)',
          'useMemo — 1й раз',
          'useEffect(fn, [])',
        ],
        classic: '= componentDidMount',
        accentHex: '#5fae86',
      },
      {
        phase: 'Update',
        desc: 'state/props змінились',
        hooks: [
          'useEffect(fn, [deps])',
          'useLayoutEffect',
          'useMemo(fn, [deps])',
          'useCallback(fn, [deps])',
          're-run на зміні deps',
        ],
        classic: '= componentDidUpdate',
        accentHex: '#6b9bd1',
      },
      {
        phase: 'Unmount',
        desc: 'видалення з DOM',
        hooks: ['return () => {...}', 'всередині useEffect', 'cleanup: відписки, clearInterval, abort'],
        classic: '= componentWillUnmount',
        accentHex: '#c2785f',
      },
    ],
  },
  {
    label: 'Повний каталог хуків',
    icon: '🎣',
    hooks: [
      {
        hook: 'useState',
        when: 'Mount + Update',
        why: 'Локальний стан, незалежні прості значення',
        example: 'const [count, setCount] = useState(0);',
      },
      {
        hook: 'useReducer',
        when: 'Mount + Update',
        why: 'Складний повʼязаний стан, явні action-переходи',
        example: 'const [state, dispatch] = useReducer(reducer, initial);',
      },
      {
        hook: 'useEffect',
        when: 'Update (після paint) + Unmount (cleanup)',
        why: 'Side-effects після paint: fetch, підписки',
        example:
          'useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);',
      },
      {
        hook: 'useLayoutEffect',
        when: 'Update (до paint) + Unmount (cleanup)',
        why: 'Синхронне читання/зміна layout перед фарбуванням',
        example: 'useLayoutEffect(() => {\n  el.current.style.opacity = "1";\n}, []);',
      },
      {
        hook: 'useInsertionEffect',
        when: 'До useLayoutEffect',
        why: 'Вставка <style> — лише для CSS-in-JS бібліотек',
        example: 'useInsertionEffect(() => {\n  insertStyleRule(rule);\n}, [rule]);',
      },
      {
        hook: 'useRef',
        when: 'Будь-коли, без re-render',
        why: 'DOM-ref або мутабельне значення без ре-рендеру',
        example: 'const inputRef = useRef<HTMLInputElement>(null);',
      },
      {
        hook: 'useImperativeHandle',
        when: 'Mount + Update, з forwardRef',
        why: 'Кастомізує імперативний API компонента через ref',
        example:
          'useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current?.focus(),\n}));',
      },
      {
        hook: 'useMemo',
        when: 'Render, якщо змінились deps',
        why: 'Кешує дороге обчислення / стабільний референс',
        example: 'const sorted = useMemo(() => sort(list), [list]);',
      },
      {
        hook: 'useCallback',
        when: 'Render, якщо змінились deps',
        why: 'Кешує посилання на функцію',
        example: 'const onClick = useCallback(() => doThing(id), [id]);',
      },
      {
        hook: 'useContext',
        when: 'На зміну value у Provider',
        why: 'Читає значення найближчого Provider вище по дереву',
        example: 'const theme = useContext(ThemeContext);',
      },
      {
        hook: 'useTransition',
        when: 'Update (неурочна дія)',
        why: 'Позначає оновлення як low-priority, не блокує UI',
        example: 'const [isPending, startTransition] = useTransition();',
      },
      {
        hook: 'useDeferredValue',
        when: 'Update (неурочне значення)',
        why: 'Відкладає ре-рендер важкого дерева',
        example: 'const deferred = useDeferredValue(query);',
      },
      {
        hook: 'useId',
        when: 'Mount (стабільний SSR/CSR)',
        why: 'Унікальний id для <label htmlFor>/ARIA — без hydration mismatch',
        example: 'const id = useId();',
      },
      {
        hook: 'useSyncExternalStore',
        when: 'Mount + на кожну зміну store',
        why: 'Tearing-safe підписка на зовнішнє (поза-React) джерело стану',
        example: 'const state = useSyncExternalStore(subscribe, getSnapshot);',
      },
      {
        hook: 'useDebugValue',
        when: 'Лише в custom hooks (DX)',
        why: 'Підписує custom hook міткою в React DevTools',
        example: "useDebugValue(isOnline ? 'Online' : 'Offline');",
      },
    ],
  },
  {
    label: 'useEffect: масив залежностей',
    icon: '📦',
    chips: [
      '<b>нема масиву</b> → після кожного рендеру',
      '<b>[]</b> → раз на mount',
      '<b>[dep]</b> → на зміні <code>dep</code>',
      '<b>return fn</b> → cleanup: перед наступним запуском / unmount',
    ],
  },
  {
    label: 'Race condition (async у useEffect)',
    icon: '🏁',
    entries: [
      {
        term: 'проблема',
        desc: 'швидка зміна deps → 2+ fetch-и; повільніший (старий) резолвиться <b>останнім</b> → у стані застарілі дані',
      },
      {
        term: 'fix: ignore-флаг',
        desc: 'у cleanup ставиш <code>ignore = true</code>, після <code>await</code> — <code>if (!ignore) setState(…)</code>',
        chips: [
          'useEffect(() =&gt; { let ignore = false; fetchX(id).then(r =&gt; { if (!ignore) setData(r); }); return () =&gt; { ignore = true; }; }, [id]);',
        ],
      },
      {
        term: 'fix: AbortController',
        desc: 'реально скасовує запит: <code>fetch(url, { signal })</code>, у cleanup — <code>controller.abort()</code>',
      },
      {
        term: 'бібліотеки',
        desc: 'TanStack Query / SWR роблять це самі — виграє останній <code>queryKey</code>',
      },
    ],
  },
  {
    label: 'Що тригерить re-render ⟵',
    icon: '⚡',
    chips: ['змінився state', 'змінились props', 'рендериться батько (parent)', 'змінився context'],
  },
  {
    label: 'Мемоізація: одна ідея, 3 механізми',
    icon: '🧠',
    entries: [
      { term: 'useMemo', desc: 'кеш <b>значення</b>, ключ — deps-масив' },
      {
        term: 'useCallback',
        desc: 'кеш <b>посилання на функцію</b> — окремий випадок useMemo',
      },
      { term: 'React.memo', desc: 'кеш <b>результату рендеру</b> компонента, ключ — props' },
    ],
  },
  {
    label: 'Правила хуків',
    icon: '📏',
    chips: [
      'лише на <b>верхньому рівні</b> (не в if/циклах)',
      'лише з компонентів або custom hooks',
      'лінтиться <code>eslint-plugin-react-hooks</code>',
    ],
  },
  {
    label: 'Патерни',
    icon: '🧩',
    chips: [
      'Compound components (спільний стан через Context)',
      'Render props / HOC — <b>legacy</b>, хуки замінили ~95%',
      'Custom hook замість container-компонента',
      'Error Boundary — <b>лише клас</b> (getDerivedStateFromError)',
    ],
  },
  {
    label: 'Controlled vs Uncontrolled inputs',
    icon: '🎛️',
    entries: [
      {
        term: 'Controlled',
        desc: 'React володіє значенням; ре-рендер на кожен keystroke; краще для 1-5 полів + жива валідація',
      },
      {
        term: 'Uncontrolled',
        desc: "браузер володіє, React читає через ref; краще для великих форм/файлів (input[type='file'])",
      },
    ],
  },
  {
    label: 'Екосистема',
    icon: '🌐',
    entries: [
      {
        term: 'Zustand',
        desc: '<code>useStore(s =&gt; s.x)</code> — селектор, гранулярний ре-рендер замість підписки на весь store',
      },
      {
        term: 'TanStack Query',
        desc: 'кеш запитів за <code>queryKey</code>: <code>staleTime</code>/<code>gcTime</code>, useMutation з optimistic update',
      },
      {
        term: 'React Router',
        desc: 'Data Router API (<code>createBrowserRouter</code> + <code>loader</code>/<code>action</code>) замість useEffect+спінер',
      },
    ],
  },
  {
    label: 'Продуктивність',
    icon: '⚡',
    entries: [
      {
        term: 'Virtualization',
        desc: 'рендер лише видимих елементів списку (<code>react-window</code> / <code>react-virtuoso</code>) — DOM лишається ~20-30 вузлів незалежно від розміру списку',
      },
      {
        term: 'Масштабування застосунку',
        desc: 'feature-based структура → lazy loading / code splitting по routes → TanStack Query (server state) + Zustand (client state) → memo/селектори де виміряно потрібно → virtualization для великих списків → monorepo (Turborepo), якщо кілька apps',
      },
    ],
  },
]
