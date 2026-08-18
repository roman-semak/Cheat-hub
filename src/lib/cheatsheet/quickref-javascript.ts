import type { QuickRefBlock } from './types'

// JS/TS quickref board — merges what used to be three separate dense-page
// columns (TypeScript, JavaScript, Event Loop & RxJS), since they all
// belong to the single `javascript` ("JS / TS") topic. Trailing blocks
// (Prototype chain onward) supplement gaps found in the old prose
// `javascriptCheat` sheet, condensed into the same compact style.
export const javascriptQuickRefBlocks: QuickRefBlock[] = [
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
      { term: 'ReturnType<T>', desc: 'тип значення, яке повертає функція <code>T</code>' },
      { term: 'Parameters<T>', desc: 'тип кортежу аргументів функції <code>T</code>' },
      { term: 'Exclude<T,U>', desc: 'прибрати з union типи, що входять у <code>U</code>' },
      { term: 'Extract<T,U>', desc: 'залишити з union лише типи, що входять у <code>U</code>' },
      { term: 'NonNullable<T>', desc: 'прибрати <code>null</code> і <code>undefined</code>', inline: true },
    ],
  },
  {
    label: 'Generics (TS)',
    entries: [
      {
        term: '<T>',
        desc: 'параметр типу — приймає будь-який тип, повертає той самий T',
        chips: ['function identity&lt;T&gt;(v: T): T'],
      },
      {
        term: 'T extends X',
        desc: 'обмеження — дозволяє звертатись до полів X всередині ф-ї, T лишається конкретним на виході',
        chips: ['&lt;T extends {length:number}&gt;'],
      },
    ],
  },
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
    label: 'Prototype chain',
    entries: [
      {
        term: '[[Prototype]]',
        desc: 'внутрішнє посилання ОБ\'ЄКТА на свій прототип у ланцюжку пошуку властивостей',
      },
      {
        term: '.prototype',
        desc: 'властивість КОНСТРУКТОРА — визначає [[Prototype]] майбутніх інстансів через <code>new</code>',
      },
      {
        term: 'class',
        desc: 'синтаксичний цукор над prototype-ланцюжком, не нова модель успадкування',
        inline: true,
      },
    ],
  },
  {
    label: 'Modules: ESM vs CJS',
    chips: [
      '<b>ESM</b> import/export — static, tree-shakable, top-level await',
      '<b>CJS</b> require/module.exports — dynamic, важко tree-shake',
    ],
  },
  {
    label: 'Промic · P→F/R (Settled)',
    entries: [
      { term: '.all', desc: '<b>усі</b> fulfilled → масив значень; перший reject → одразу reject' },
      { term: '.allSettled', desc: 'чекає <b>всіх</b>, повертає статус кожного (fulfilled/rejected)' },
      { term: '.race', desc: 'результат <b>першого</b> settled — fulfill або reject' },
      { term: '.any', desc: 'результат <b>першого</b> fulfilled; reject лише якщо <b>всі</b> зафейлились' },
    ],
  },
  {
    label: 'Проміс-методи',
    chips: ['<b>.then</b> onFulfilled, onRejected', '<b>.catch</b> onRejected', '<b>.finally</b> onSettled (завжди)'],
  },
  {
    label: 'debounce vs throttle',
    entries: [
      {
        term: 'debounce',
        desc: 'чекай <b>кінця</b> активності — search input (не запит на кожен символ)',
        chips: ['clearTimeout + setTimeout(fn, ms)'],
      },
      {
        term: 'throttle',
        desc: 'максимум раз за N мс — scroll/resize listeners',
        chips: ['прапорець "waiting" + setTimeout(ms)'],
      },
    ],
  },
  {
    label: 'Патерни проєктування',
    chips: [
      '<b>Observer</b> — subject сповіщає підписників (DOM events, RxJS, Redux)',
      '<b>Factory</b> — ф-я приховує логіку створення обʼєктів',
      '<b>Singleton</b> — єдиний спільний інстанс',
      '<b>Proxy</b> — обгортка, перехоплює доступ до обʼєкта',
    ],
  },
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
]
