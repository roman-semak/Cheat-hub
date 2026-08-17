import type { QuickRefContent } from './types'

// Dense, single-screen, cross-topic interview quick-reference.
// Started as a 1:1 port of the Docs/index.html mockup, then deepened per
// user feedback: visual grouping per block, timing/signature chips on
// entries, reordered+expanded TS utility types, clearer this/WeakMap/Promise
// explanations, event-loop queue examples, RxJS signatures, and an Angular
// column.
export const quickRefContent: QuickRefContent = {
  title: 'Шпаргалка',
  subtitle: 'React + TypeScript + JavaScript + Event Loop/RxJS + Angular — interview cheatsheet',
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
            { term: 'render', desc: 'reconcile', inline: true, chips: ['синхронно'] },
            {
              term: 'useLayoutEffect',
              desc: 'синхр. <b>до</b> paint, вимір DOM',
              chips: ['до paint'],
            },
            {
              term: 'useEffect',
              desc: 'асинхр. <b>після</b> paint; cleanup',
              chips: ['після paint'],
            },
          ],
        },
        {
          label: 'Hooks',
          entries: [
            { term: 'useState', desc: 'стан', inline: true, chips: ['render'] },
            { term: 'useReducer', desc: 'reducer', inline: true, chips: ['render'] },
            { term: 'useMemo', desc: 'кеш значення', inline: true, chips: ['render, deps'] },
            { term: 'useCallback', desc: 'кеш ф-ї', inline: true, chips: ['render, deps'] },
            {
              term: 'useRef',
              desc: 'мутабельне, <b>не</b> тригерить render',
              chips: ['без re-render'],
            },
            {
              term: 'useContext',
              desc:
                "підписка на найближчий <code>Provider</code> вище по дереву; ре-рендер при <b>кожній</b> зміні value, навіть без memo",
              chips: ['на зміну value'],
            },
          ],
        },
        {
          label: 'useEffect: масив залежностей',
          entries: [
            { term: '(немає масиву)', desc: 'ефект виконується <b>після кожного</b> рендеру', inline: true },
            { term: '[]', desc: 'лише один раз, при <b>mount</b>', inline: true },
            { term: '[dep]', desc: 'повторно при зміні <code>dep</code>', inline: true },
            {
              term: 'return fn',
              desc: 'cleanup — перед наступним запуском ефекту або при <b>unmount</b>',
              inline: true,
            },
          ],
        },
        {
          label: 'Що тригерить re-render ⟵',
          chips: ['змінився state', 'змінились props', 'рендериться батько (parent)', 'змінився context'],
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
            { term: 'unknown', desc: 'приймає будь-що, але треба <b>звузити</b> перед використанням' },
            { term: 'any', desc: 'вимикає перевірку типів — уникай, «заражає» сусідній код' },
            { term: 'never', desc: 'тип без значень: недосяжний код або функція, що завжди throw' },
          ],
        },
        {
          label: 'Utility types · від найважливіших',
          entries: [
            { term: 'Partial<T>', desc: 'усі поля <b>опційні</b>', inline: true },
            { term: 'Pick<T,K>', desc: 'новий тип лише з полів K', inline: true },
            { term: 'Omit<T,K>', desc: 'новий тип без полів K', inline: true },
            { term: 'Required<T>', desc: "усі поля <b>обов'язкові</b>", inline: true },
            { term: 'Readonly<T>', desc: 'усі поля <b>read-only</b>', inline: true },
            { term: 'Record<K,V>', desc: 'словник <code>{[key: K]: V}</code>', inline: true },
            {
              term: 'ReturnType<T>',
              desc: 'тип значення, яке повертає функція <code>T</code>',
            },
            {
              term: 'Parameters<T>',
              desc: 'тип кортежу аргументів функції <code>T</code>',
            },
            {
              term: 'Exclude<T,U>',
              desc: 'прибрати з union типи, що входять у <code>U</code>',
            },
            {
              term: 'Extract<T,U>',
              desc: 'залишити з union лише типи, що входять у <code>U</code>',
            },
            {
              term: 'NonNullable<T>',
              desc: 'прибрати <code>null</code> і <code>undefined</code>',
              inline: true,
            },
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
            {
              term: 'Hoisting',
              desc:
                '<b>оголошення</b> (не значення) підняті вгору scope; <code>var</code> → <code>undefined</code>, <code>let</code>/<code>const</code> → TDZ до ініціалізації',
            },
            {
              term: 'Closure',
              desc:
                'функція «пам\'ятає» лексичне оточення навіть після завершення зовнішньої ф-ї — основа приватних змінних, каррінгу, мемоізації',
            },
          ],
        },
        {
          label: 'this: call / apply / bind',
          entries: [
            {
              term: '.call',
              desc: 'викликає одразу, this + аргументи <b>по одному</b>',
              chips: ['fn.call(thisArg, a, b)'],
            },
            {
              term: '.apply',
              desc: 'викликає одразу, this + аргументи <b>масивом</b>',
              chips: ['fn.apply(thisArg, [a, b])'],
            },
            {
              term: '.bind',
              desc: '<b>не</b> викликає — повертає нову функцію із зафіксованим this',
              chips: ['fn.bind(thisArg)'],
            },
            {
              term: 'WeakMap / WeakSet',
              desc:
                "ключі — лише об'єкти; немає сильного посилання → <b>не</b> блокують GC; не ітеруються (нема <code>.size</code>/<code>.forEach</code>)",
            },
          ],
        },
        {
          label: 'Promise · P→F/R (Settled)',
          entries: [
            {
              term: '.all',
              desc: '<b>усі</b> fulfilled → масив значень; перший reject → одразу reject',
            },
            {
              term: '.allSettled',
              desc: 'чекає <b>всіх</b>, повертає статус кожного (fulfilled/rejected)',
            },
            {
              term: '.race',
              desc: 'результат <b>першого</b> settled — fulfill або reject',
            },
            {
              term: '.any',
              desc: 'результат <b>першого</b> fulfilled; reject лише якщо <b>всі</b> зафейлились',
            },
          ],
        },
        {
          label: 'Проміс-методи',
          chips: ['<b>.then</b> onFulfilled, onRejected', '<b>.catch</b> onRejected', '<b>.finally</b> onSettled (завжди)'],
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
            { term: 'Call Stack', desc: 'синхронний код, LIFO', inline: true },
            {
              term: 'Microtask Q',
              desc: 'вищий пріоритет — виконується <b>повністю</b> перед наступним macrotask',
              chips: ['Promise .then/.catch/.finally', 'queueMicrotask', 'MutationObserver'],
            },
            {
              term: 'Macrotask Q',
              desc: 'по одному за тик, вже після мікротасків',
              chips: ['setTimeout / setInterval', 'UI events', 'I/O'],
            },
          ],
        },
        {
          chips: ['Promise <b>раніше</b> за <code>setTimeout(0)</code>'],
        },
        {
          label: 'RxJS · *Map',
          entries: [
            {
              term: 'switchMap',
              desc: 'скасовує попередній inner-observable — typeahead, HTTP-запити в Angular',
              chips: ['project: (v) => Observable'],
            },
            {
              term: 'mergeMap',
              desc: 'запускає <b>усі</b> inner-observables паралельно, без скасування',
              chips: ['project: (v) => Observable'],
            },
            {
              term: 'concatMap',
              desc: 'запускає <b>послідовно</b>, зберігає порядок (ORDER) — напр. черга HTTP-запитів',
              chips: ['project: (v) => Observable'],
            },
            {
              term: 'exhaustMap',
              desc: 'ігнорує нові значення, поки активний попередній inner-observable',
              chips: ['project: (v) => Observable'],
            },
          ],
        },
        {
          label: 'Map (структура даних)',
          chips: ['ключ будь-якого типу', 'зберігає порядок вставки', '<code>.get .has .delete .size</code>'],
        },
      ],
    },
    {
      id: 'angular',
      title: 'Angular',
      accentHex: '#c97a6a',
      blocks: [
        {
          label: 'Change Detection',
          entries: [
            {
              term: 'Zone.js',
              desc: 'патчить async API (setTimeout, addEventListener), щоб знати коли запускати CD',
            },
            { term: 'Default CD', desc: 'перевіряє <b>усе</b> дерево компонентів на кожну подію' },
            {
              term: 'OnPush',
              desc: 'перевіряє лише при зміні <b>reference</b> @Input, власній події або async pipe',
            },
            {
              term: 'ChangeDetectorRef',
              desc: '<code>markForCheck()</code> / <code>detectChanges()</code> — ручний контроль CD',
            },
          ],
        },
        {
          label: 'DI & Services',
          entries: [
            {
              term: "@Injectable({providedIn:'root'})",
              desc: 'singleton на весь застосунок, tree-shakable',
            },
            {
              term: 'providers у @Component',
              desc: 'новий екземпляр сервісу на компонент/піддерево',
            },
            { term: 'InjectionToken', desc: "DI-токен для примітивів/інтерфейсів без класу" },
            { term: 'inject()', desc: 'функціональний DI поза конструктором' },
          ],
        },
        {
          label: 'Lifecycle hooks',
          entries: [
            { term: 'ngOnChanges', desc: 'на зміну будь-якого @Input', chips: ['перед ngOnInit'] },
            { term: 'ngOnInit', desc: 'один раз, після першого ngOnChanges', chips: ['mount'] },
            {
              term: 'ngAfterViewInit',
              desc: 'коли дочірні view/ViewChild вже готові',
              chips: ['після рендеру view'],
            },
            { term: 'ngOnDestroy', desc: 'unsubscribe/cleanup перед знищенням', chips: ['unmount'] },
          ],
        },
        {
          label: 'Signals & RxJS в Angular',
          entries: [
            {
              term: 'signal()',
              desc: 'реактивне значення без Zone.js; CD реагує на його читання',
            },
            {
              term: 'computed()',
              desc: 'похідний signal, кешується, рахується лише при зміні залежностей',
            },
            { term: 'async pipe', desc: 'авто subscribe/unsubscribe на Observable у шаблоні' },
            {
              term: 'takeUntilDestroyed()',
              desc: 'авто-unsubscribe при знищенні компонента/сервісу',
            },
          ],
        },
      ],
    },
  ],
}
