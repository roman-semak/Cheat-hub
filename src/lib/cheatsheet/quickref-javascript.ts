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

  // ── Array / String методи для live coding ──────────────────────────────
  // Перенесено зі шпаргалки TODO/JS_Array_String_Methods_LiveCoding_UA.md.
  // MUT = мутує оригінал; NEW = повертає новий (immutable, безпечно для React).
  {
    label: 'Array · push / pop / shift / unshift',
    icon: '📥',
    entries: [
      { term: 'arr.push(x, …)', desc: 'додати в <b>кінець</b>, повертає нову довжину', chips: ['MUT', 'O(1)'] },
      { term: 'arr.pop()', desc: 'прибрати з <b>кінця</b>, повертає видалений елемент', chips: ['MUT', 'O(1)'] },
      { term: 'arr.unshift(x, …)', desc: 'додати на <b>початок</b>, повертає нову довжину', chips: ['MUT', 'O(n)'] },
      { term: 'arr.shift()', desc: 'прибрати з <b>початку</b>, повертає видалений елемент', chips: ['MUT', 'O(n)'] },
      {
        term: 'immutable-версії',
        desc: 'для React-стану — не мутуй, будуй новий масив',
        code: `const withEnd   = [...arr, x];   // push
const withStart = [x, ...arr];   // unshift
const noEnd     = arr.slice(0, -1); // pop
const noStart   = arr.slice(1);     // shift`,
      },
    ],
  },
  {
    label: 'Array · splice vs slice',
    icon: '✂️',
    entries: [
      {
        term: 'arr.splice(start, delCount, …add)',
        desc: 'вставка / видалення / заміна на місці; повертає масив <b>видалених</b>',
        chips: ['MUT', 'O(n)'],
        code: `const a = [1, 2, 3, 4, 5];
a.splice(1, 2);            // видалити 2 з index 1 → [1, 4, 5]
a.splice(1, 0, 'a', 'b');  // вставити без видалення
a.splice(1, 1, 'x');       // замінити 1 елемент
a.splice(-1, 1);           // видалити останній`,
      },
      {
        term: 'arr.slice(start?, end?)',
        desc: "витягти частину <code>[start, end)</code>; підтримує від'ємні індекси",
        chips: ['NEW', 'копія частини'],
        code: `arr.slice(1, 3);  // елементи 1..2
arr.slice(-2);    // останні 2
arr.slice();      // поверхнева копія всього`,
      },
      { term: 'arr.toSpliced(s, n, …x)', desc: 'як <code>splice</code>, але повертає новий масив', chips: ['NEW', 'ES2023'] },
      { term: '🎯 не плутати', desc: '<b>slice</b> = NEW (копія) · <b>splice</b> = MUT (вирізає/вставляє)' },
    ],
  },
  {
    label: 'Array · map / filter / reduce',
    icon: '🔄',
    entries: [
      { term: 'arr.map(fn)', desc: 'трансформувати кожен елемент', chips: ['NEW', 'O(n)'] },
      { term: 'arr.filter(pred)', desc: 'залишити ті, що проходять предикат', chips: ['NEW'] },
      { term: 'arr.reduce(fn, init)', desc: 'згорнути масив в одне значення', chips: ['NEW'] },
      { term: 'arr.reduceRight(fn, init)', desc: 'те саме, але з кінця', chips: ['NEW'] },
      { term: 'arr.flat(depth?)', desc: 'розплющити вкладені масиви; <code>flat(Infinity)</code> — повністю', chips: ['NEW'] },
      { term: 'arr.flatMap(fn)', desc: '<code>map</code> + <code>flat(1)</code> за один прохід', chips: ['NEW'] },
      {
        term: 'reduce · патерни',
        desc: 'найчастіше на співбесіді',
        code: `// сума
[1, 2, 3].reduce((acc, x) => acc + x, 0);           // 6

// групування (groupBy)
words.reduce((acc, w) => {
  (acc[w[0]] ??= []).push(w);   // нема ключа → створити масив
  return acc;
}, {});

// підрахунок частот
arr.reduce((acc, x) => {
  acc[x] = (acc[x] || 0) + 1;
  return acc;
}, {});`,
      },
    ],
  },
  {
    label: 'Array · find / includes / some',
    icon: '🔍',
    entries: [
      { term: 'arr.indexOf(x)', desc: 'індекс або <code>-1</code>; <code>===</code>, <b>не</b> знаходить <code>NaN</code>', chips: ['O(n)'] },
      { term: 'arr.lastIndexOf(x)', desc: 'те саме, з кінця', chips: ['O(n)'] },
      { term: 'arr.includes(x)', desc: 'boolean; <b>знаходить</b> <code>NaN</code>', chips: ['O(n)'] },
      { term: 'arr.find(pred)', desc: 'перший елемент за предикатом або <code>undefined</code>' },
      { term: 'arr.findIndex(pred)', desc: 'індекс за предикатом або <code>-1</code>' },
      { term: 'arr.findLast / findLastIndex', desc: 'те саме, з кінця', chips: ['ES2023'] },
      { term: 'arr.some(pred)', desc: 'чи <b>хоч один</b> проходить → boolean' },
      { term: 'arr.every(pred)', desc: 'чи <b>всі</b> проходять → boolean' },
    ],
  },
  {
    label: 'Array · sort / reverse',
    icon: '↕️',
    entries: [
      {
        term: 'arr.sort((a, b) => a - b)',
        desc: 'числа за зростанням. <b>Без компаратора</b> — лексикографічно (<code>10 &lt; 2</code>)',
        chips: ['MUT', 'O(n log n)'],
      },
      { term: 'arr.reverse()', desc: 'розвернути порядок', chips: ['MUT'] },
      { term: 'arr.toSorted(cmp?)', desc: 'immutable-сортування', chips: ['NEW', 'ES2023'] },
      { term: 'arr.toReversed()', desc: 'immutable-реверс', chips: ['NEW', 'ES2023'] },
      { term: '⚠️ React', desc: 'копіюй перед мутацією: <code>[...arr].sort(…)</code> або <code>toSorted</code>' },
    ],
  },
  {
    label: 'Array · concat / join / at / with',
    icon: '🧷',
    entries: [
      { term: 'arr.concat(other)', desc: "зʼєднати масиви · те саме: <code>[...a, ...b]</code>", chips: ['NEW'] },
      { term: "arr.join('-')", desc: 'масив → рядок <code>"1-2-3"</code>', chips: ['NEW'] },
      { term: 'arr.at(-1)', desc: "елемент за індексом, підтримує від'ємні", chips: ['ES2022'] },
      { term: "arr.with(i, x)", desc: 'копія із заміною одного індексу', chips: ['NEW', 'ES2023'] },
      { term: 'arr.fill(v, start?, end?)', desc: 'заповнити діапазон значенням', chips: ['MUT'] },
    ],
  },
  {
    label: 'Array · forEach / for-of',
    icon: '🔁',
    entries: [
      { term: 'arr.forEach((x, i) => …)', desc: 'побічні ефекти; нічого не повертає; <b>не переривається</b> (<code>break</code> не працює)' },
      { term: 'for (const x of arr)', desc: 'значення; можна <code>break</code> / <code>continue</code>' },
      { term: 'for (const [i, x] of arr.entries())', desc: 'індекс + значення' },
      { term: 'arr.keys() / arr.values()', desc: 'ітератори індексів / значень' },
      { term: '💡 достроковий вихід', desc: 'замість <code>forEach</code> — <code>for…of</code> або <code>some</code>' },
    ],
  },
  {
    label: 'Array · from / of / fill',
    icon: '🏗️',
    entries: [
      { term: 'Array.from({ length: n }, (_, i) => …)', desc: 'генерація масиву за формулою' },
      { term: "Array.from('abc')", desc: "з будь-якого iterable → <code>['a','b','c']</code>" },
      { term: 'Array.from(new Set(arr))', desc: 'dedupe через Set' },
      { term: 'Array.of(1, 2, 3)', desc: 'масив з переданих аргументів' },
      { term: 'Array(n).fill(0)', desc: 'n однакових значень' },
      { term: '[...Array(n).keys()]', desc: '<code>[0, 1, …, n-1]</code>' },
    ],
  },
  {
    label: 'Array · патерни (live coding)',
    icon: '💡',
    entries: [
      { term: 'dedupe', desc: 'унікальні елементи', code: `[...new Set(arr)];` },
      {
        term: 'перетин двох масивів',
        desc: 'O(n) через Set',
        code: `const set = new Set(arr2);
arr1.filter(x => set.has(x));`,
      },
      { term: 'max / min / сума', code: `Math.max(...arr);
Math.min(...arr);
arr.reduce((a, b) => a + b, 0);` },
      {
        term: 'chunk (групи по n)',
        code: `const chunk = (arr, n) =>
  Array.from(
    { length: Math.ceil(arr.length / n) },
    (_, i) => arr.slice(i * n, i * n + n),
  );`,
      },
      {
        term: 'масив ↔ Map / entries',
        code: `new Map(users.map(u => [u.id, u])); // індекс за ключем
Object.entries(obj);                // [[k, v], …]
Object.fromEntries(pairs);          // назад в обʼєкт`,
      },
    ],
  },
  {
    label: 'String · length / includes / match',
    icon: '🔡',
    entries: [
      { term: 'str.length · str[i] · str.at(-1)', desc: "довжина / символ / останній (від'ємні індекси, ES2022)" },
      { term: 'str.charCodeAt(i)', desc: "код символу (<code>'A'</code> → <code>65</code>); назад — <code>String.fromCharCode(65)</code>" },
      { term: 'str.codePointAt(i)', desc: 'для emoji / Unicode поза BMP' },
      { term: 'str.includes / indexOf / lastIndexOf', desc: 'boolean / індекс / індекс з кінця' },
      { term: 'str.startsWith / endsWith', desc: 'boolean' },
      { term: 'str.match / matchAll / search', desc: 'regex: збіг / усі збіги (ітератор, флаг <code>g</code>) / індекс першого' },
      { term: '⚠️ immutable', desc: 'рядки не змінюються — <b>усі методи повертають новий</b>' },
    ],
  },
  {
    label: 'String · slice / trim / pad / replace',
    icon: '🪄',
    entries: [
      { term: 'str.slice(start, end?)', desc: "<code>[start, end)</code>; від'ємні працюють — <b>використовуй це</b>", chips: ['NEW'] },
      { term: 'str.substring(a, b)', desc: "схоже, але від'ємні → <code>0</code>", chips: ['NEW'] },
      { term: 'str.substr(start, len)', desc: 'з індексу, задана довжина', chips: ['deprecated'] },
      { term: 'str.toUpperCase / toLowerCase', chips: ['NEW'] },
      { term: 'str.trim / trimStart / trimEnd', desc: 'прибрати пробіли', chips: ['NEW'] },
      { term: "str.padStart(5, '0') · padEnd(5, '.')", desc: "<code>'42'</code> → <code>'00042'</code> / <code>'42...'</code>", chips: ['NEW'] },
      { term: "str.repeat(3)", desc: "<code>'ab'</code> → <code>'ababab'</code>", chips: ['NEW'] },
      { term: "str.replace(a, b)", desc: 'замінити <b>перше</b> входження; <code>replace(/a/g, b)</code> — усі', chips: ['NEW'] },
      { term: "str.replaceAll(a, b)", desc: 'усі входження без regex', chips: ['NEW', 'ES2021'] },
    ],
  },
  {
    label: 'String · split / join + патерни',
    icon: '🧵',
    entries: [
      { term: "str.split('') / split(' ') / split(/\\s+/)", desc: 'рядок → масив символів / слів / за роздільником' },
      { term: "arr.join('')", desc: 'масив → рядок назад' },
      {
        term: '🎯 split → обробка → join',
        desc: 'основа string-задач: реверс, anagram, паліндром',
        code: `// реверс рядка (spread коректний для Unicode)
[...str].reverse().join('');

// паліндром
const isPalindrome = s => s === [...s].reverse().join('');

// anagram-check через сортування
const key = s => [...s].sort().join('');
key('listen') === key('silent'); // true

// capitalize / title case
str.charAt(0).toUpperCase() + str.slice(1);
str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

// прибрати не-літери (паліндром-задачі)
str.toLowerCase().replace(/[^a-z0-9]/g, '');

// порахувати слова
str.trim().split(/\\s+/).length;`,
      },
    ],
  },
  {
    label: 'Number ↔ String (число ↔ рядок)',
    icon: '🔢',
    entries: [
      { term: "Number('42') · +'42'", desc: 'рядок → число; унарний <code>+</code> — найшвидше' },
      { term: "parseInt('42px', 10) · parseFloat('3.14')", desc: 'парсить провідне число, ігнорує хвіст' },
      { term: 'String(42) · (42).toString() · `${42}`', desc: 'число → рядок' },
      { term: '(255).toString(16)', desc: "→ <code>'ff'</code> (інша система числення)" },
      { term: '(3.14159).toFixed(2)', desc: "→ <code>'3.14'</code> (рядок, з округленням)" },
    ],
  },
  {
    label: 'MUT vs NEW · правило React',
    icon: '⚠️',
    chips: [
      '<b>MUT (Array):</b> <code>push pop shift unshift splice sort reverse fill</code>',
      '<b>NEW (Array):</b> <code>map filter reduce slice concat flat flatMap toSorted toReversed toSpliced with join</code>',
      '<b>String:</b> усі методи NEW (рядки immutable)',
      '<b>React:</b> у стані ніколи MUT напряму → <code>[...arr]</code> / <code>toSorted</code> / <code>with</code>',
    ],
  },
  {
    label: 'Big-O основних операцій',
    icon: '⏱️',
    chips: [
      '<code>push</code> / <code>pop</code> — <b>O(1)</b>',
      '<code>shift</code> / <code>unshift</code> / <code>splice</code> — <b>O(n)</b> (зсув)',
      '<code>includes</code> / <code>indexOf</code> / <code>find</code> — <b>O(n)</b>',
      '<code>Set.has</code> / <code>Map.get</code> — <b>O(1)</b>',
      '<code>sort</code> — <b>O(n log n)</b>',
      '<code>map</code> / <code>filter</code> / <code>reduce</code> / <code>forEach</code> — <b>O(n)</b>',
      '<code>arr[i]</code> — <b>O(1)</b>',
    ],
  },
]
