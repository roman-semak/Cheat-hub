import type { QuickRefContent } from './types'

// Content ported 1:1 from the Docs/index.html mockup — a dense,
// single-screen, cross-topic quick-reference for interview prep.
export const quickRefContent: QuickRefContent = {
  title: 'Шпаргалка',
  subtitle: 'React + JS / TS — interview cheatsheet',
  columns: [
    {
      id: 'react',
      title: 'React',
      accentHex: '#6db3d0',
      blocks: [
        {
          entries: [
            { term: 'Reconciliation', desc: 'diffing нового Virtual DOM зі старим' },
            { term: 'key', desc: 'стабільна ідентичність у списку' },
            { term: 'Derived state', desc: 'рахуй зі state/props, не зберігай' },
            { term: 'Suspense', desc: 'fallback поки діти не готові' },
          ],
        },
        {
          label: 'Lifecycle',
          entries: [
            { term: 'render', desc: 'reconcile', inline: true },
            { term: 'useLayoutEffect', desc: 'синхр. <b>до</b> paint, вимір DOM' },
            { term: 'useEffect', desc: 'асинхр. <b>після</b> paint; cleanup' },
          ],
        },
        {
          label: 'Hooks',
          entries: [
            { term: 'useState', desc: 'стан', inline: true },
            { term: 'useReducer', desc: 'reducer', inline: true },
            { term: 'useMemo', desc: 'кеш значення', inline: true },
            { term: 'useCallback', desc: 'кеш ф-ї', inline: true },
            { term: 'useRef', desc: 'мутабельне, <b>не</b> тригерить render' },
            { term: 'useContext', desc: 'Provider', inline: true },
          ],
        },
        {
          label: 'useEffect deps',
          chips: ['<b>—</b> кожен', '<b>[]</b> mount', '<b>[dep]</b> зміна', '<b>return</b> cleanup'],
        },
        {
          label: 'Rerender ⟵',
          chips: ['state', 'props', 'батько', 'context'],
        },
      ],
    },
    {
      id: 'typescript',
      title: 'TypeScript',
      accentHex: '#8b96c9',
      blocks: [
        {
          label: 'Спец-типи',
          entries: [
            { term: 'unknown', desc: 'звузити перед використанням' },
            { term: 'any', desc: 'вимикає перевірку — уникай' },
            { term: 'never', desc: "немає значень: throw / недосяжне" },
          ],
        },
        {
          label: 'Utility types',
          entries: [
            { term: 'Partial<T>', desc: 'опційні', inline: true },
            { term: 'Required<T>', desc: "обов'язкові", inline: true },
            { term: 'Readonly<T>', desc: 'read-only', inline: true },
            { term: 'Pick<T,K>', desc: 'вибрати K', inline: true },
            { term: 'Omit<T,K>', desc: 'виключити K', inline: true },
            { term: 'Record<K,V>', desc: 'словник <code>&lt;"admin"|"user",V&gt;</code>' },
          ],
        },
      ],
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      accentHex: '#d0b06a',
      blocks: [
        {
          label: 'Core',
          entries: [
            { term: 'Hoisting', desc: 'оголошення підняті вгору scope' },
            { term: 'Closure', desc: 'доступ до батьк. scope після завершення' },
          ],
        },
        {
          label: 'this',
          entries: [
            { term: '.call', desc: 'this + аргументи по одному' },
            { term: '.apply', desc: 'this + аргументи масивом' },
            { term: '.bind', desc: 'нова ф-я з this, <b>не</b> викликає' },
            { term: 'Weak*', desc: 'Map/Set/Ref — не блокують GC' },
          ],
        },
        {
          label: 'Promise · P→F/R (Settled)',
          entries: [
            { term: '.all', desc: 'всі, падає на 1-му reject' },
            { term: '.allSettled', desc: 'всі, статус кожного' },
            { term: '.race', desc: '1-й settled (fulfill/reject)' },
            { term: '.any', desc: '1-й fulfilled', inline: true },
          ],
        },
        {
          chips: ['<b>.then</b> onF,onR', '<b>.catch</b> onR', '<b>.finally</b> onS'],
        },
      ],
    },
    {
      id: 'event-loop-rxjs',
      title: 'Loop & RxJS',
      accentHex: '#b98cc4',
      blocks: [
        {
          label: 'Event Loop · порядок',
          entries: [
            { term: 'Call Stack', desc: 'синхр.', inline: true },
            { term: 'Microtask Q', desc: 'Promise — <b>вищий пріоритет</b>' },
            { term: 'Macrotask Q', desc: 'setTimeout, події, I/O' },
          ],
        },
        {
          chips: ['Promise <b>раніше</b> за <code>setTimeout(0)</code>'],
        },
        {
          label: 'RxJS · *Map',
          entries: [
            { term: 'switchMap', desc: 'скасовує попередній — typeahead' },
            { term: 'mergeMap', desc: 'усі паралельно' },
            { term: 'concatMap', desc: 'послідовно, ORDER' },
            { term: 'exhaustMap', desc: 'ігнорує нові поки активний' },
          ],
        },
        {
          label: 'Map',
          chips: ['ключ будь-який', 'порядок', '<code>.get .has .delete</code>'],
        },
      ],
    },
  ],
}
