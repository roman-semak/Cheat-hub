import type { QuickRefBlock } from './types'

// JS/TS quickref board — merges what used to be three separate dense-page
// columns (TypeScript, JavaScript, Event Loop & RxJS), since they all
// belong to the single `javascript` ("JS / TS") topic. Trailing blocks
// (Prototype chain onward) supplement gaps found in the old prose
// `javascriptCheat` sheet, condensed into the same compact style.
export const javascriptQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'Спец-типи',
    icon: '🏷️',
    entries: [
      { term: 'unknown', desc: 'приймає будь-що, але треба <b>звузити</b> перед використанням' },
      { term: 'any', desc: 'вимикає перевірку типів — уникай, «заражає» сусідній код' },
      { term: 'never', desc: 'тип без значень: недосяжний код або функція, що завжди throw' },
    ],
  },
  {
    label: 'Utility types · від найважливіших',
    icon: '🛠️',
    entries: [
      { term: 'Partial<T>', desc: 'усі поля <b>опційні</b>' },
      { term: 'Pick<T,K>', desc: 'новий тип лише з полів K' },
      { term: 'Omit<T,K>', desc: 'новий тип без полів K' },
      { term: 'Required<T>', desc: "усі поля <b>обов'язкові</b>" },
      { term: 'Readonly<T>', desc: 'усі поля <b>read-only</b>' },
      { term: 'Record<K,V>', desc: 'словник <code>{[key: K]: V}</code>' },
      { term: 'ReturnType<T>', desc: 'тип значення, яке повертає функція <code>T</code>' },
      { term: 'Parameters<T>', desc: 'тип кортежу аргументів функції <code>T</code>' },
      { term: 'Exclude<T,U>', desc: 'прибрати з union типи, що входять у <code>U</code>' },
      { term: 'Extract<T,U>', desc: 'залишити з union лише типи, що входять у <code>U</code>' },
      { term: 'NonNullable<T>', desc: 'прибрати <code>null</code> і <code>undefined</code>' },
    ],
  },
  {
    label: 'Generics (TS)',
    icon: '🧬',
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
    icon: '📚',
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
      {
        term: 'function foo() {}',
        desc: 'Declaration: hoisted цілим тілом; динамічний <code>this</code>; має <code>arguments</code>, <code>prototype</code>; можна <code>new</code>',
        code: `sayHi();                       // ✓ працює — declaration піднята цілком
function sayHi() {
  console.log("Hi", arguments); // власний arguments
}

function User(name) { this.name = name; }
new User("Ann");               // ✓ конструктор`,
      },
      {
        term: 'const foo = function () {}',
        desc: 'Expression: у TDZ до свого рядка; далі як declaration. Named FE — рекурсія + читабельні stack-trace',
        code: `greet();                       // ❌ ReferenceError — const у TDZ
const greet = function () {};

// Named Function Expression: імʼя видиме лише в тілі
const fact = function f(n: number): number {
  return n <= 1 ? 1 : n * f(n - 1); // рекурсія через 'f', не через 'fact'
};`,
      },
      {
        term: 'const foo = () => {}',
        desc: 'Arrow: лексичний <code>this</code> (<code>call/apply/bind</code> не діють), немає <code>arguments</code>/<code>new</code>/<code>prototype</code>',
        code: `class Timer {
  seconds = 0;
  start() {
    setInterval(() => { this.seconds++; }, 1000); // this = інстанс Timer
    // function () {...} тут → this === undefined (класичний баг)
  }
}

const A = () => {};
new A();                       // ❌ TypeError: A is not a constructor`,
      },
      {
        term: 'counter (closure)',
        desc: 'кожен виклик фабрики = ізольований приватний стан',
        code: `const makeCounter = () => {
  let n = 0;                    // приватна, живе в замиканні
  return () => ++n;
};

const a = makeCounter();
const b = makeCounter();
a(); a(); // 1, 2
b();      // 1 — власний n, не спільний з a`,
      },
    ],
  },
  {
    label: 'this: call / apply / bind',
    icon: '🎯',
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
    icon: '🔗',
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
      },
    ],
  },
  {
    label: 'Modules: ESM vs CJS',
    icon: '📦',
    chips: [
      '<b>ESM</b> import/export — static, tree-shakable, top-level await',
      '<b>CJS</b> require/module.exports — dynamic, важко tree-shake',
    ],
  },
  {
    label: 'Промic · P→F/R (Settled)',
    icon: '🤝',
    entries: [
      { term: '.all', desc: '<b>усі</b> fulfilled → масив значень; перший reject → одразу reject' },
      { term: '.allSettled', desc: 'чекає <b>всіх</b>, повертає статус кожного (fulfilled/rejected)' },
      { term: '.race', desc: 'результат <b>першого</b> settled — fulfill або reject' },
      { term: '.any', desc: 'результат <b>першого</b> fulfilled; reject лише якщо <b>всі</b> зафейлились' },
    ],
  },
  {
    label: 'Проміс-методи',
    icon: '⛓️',
    chips: ['<b>.then</b> onFulfilled, onRejected', '<b>.catch</b> onRejected', '<b>.finally</b> onSettled (завжди)'],
  },
  {
    label: 'debounce vs throttle',
    icon: '🐢',
    entries: [
      {
        term: 'debounce',
        desc: 'скидає таймер на кожен виклик → спрацьовує через N мс <b>тиші</b> (search input)',
        code: `function debounce<T extends unknown[]>(fn: (...a: T) => void, ms: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(t);                       // кожен новий виклик відсуває запуск
    t = setTimeout(() => fn(...args), ms);
  };
}`,
      },
      {
        term: 'throttle (leading)',
        desc: 'виконує одразу, далі ігнорує виклики N мс (scroll / resize)',
        code: `function throttle<T extends unknown[]>(fn: (...a: T) => void, ms: number) {
  let last = 0;
  return (...args: T) => {
    const now = Date.now();
    if (now - last >= ms) {                 // вікно відкрите — виконуємо
      last = now;
      fn(...args);
    }
  };
}`,
      },
      {
        term: 'throttle (trailing)',
        desc: 'те саме, але гарантує ще й <b>останній</b> виклик у кінці вікна',
        code: `function throttle<T extends unknown[]>(fn: (...a: T) => void, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  let last = 0;
  const run = (args: T) => {
    last = Date.now();
    fn(...args);
  };
  return (...args: T) => {
    const gap = Date.now() - last;
    clearTimeout(t);
    if (gap >= ms) run(args);               // вікно відкрите — одразу
    else t = setTimeout(() => run(args), ms - gap); // інакше — в кінці вікна
  };
}`,
      },
      {
        term: 'механіка',
        desc: 'debounce = <b>1 виклик</b> у кінці серії · throttle = рівномірно, <b>максимум раз</b> на N мс',
      },
    ],
  },
  {
    label: 'Патерни проєктування',
    icon: '🧩',
    chips: [
      '<b>Observer</b> — subject сповіщає підписників (DOM events, RxJS, Redux)',
      '<b>Factory</b> — ф-я приховує логіку створення обʼєктів',
      '<b>Singleton</b> — єдиний спільний інстанс',
      '<b>Proxy</b> — обгортка, перехоплює доступ до обʼєкта',
    ],
  },
  {
    label: 'Event Loop · порядок',
    icon: '🔄',
    entries: [
      { term: 'Call Stack', desc: 'синхронний код, LIFO' },
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
    label: 'Порядок виконання',
    icon: '⏳',
    chips: ['Promise <b>раніше</b> за <code>setTimeout(0)</code>'],
  },
  {
    label: 'RxJS · *Map',
    icon: '🌊',
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
    icon: '🗺️',
    chips: ['ключ будь-якого типу', 'зберігає порядок вставки', '<code>.get .has .delete .size</code>'],
  },
]
