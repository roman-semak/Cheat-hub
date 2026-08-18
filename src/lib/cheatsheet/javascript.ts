// AUTO-GENERATED from CheetSheet/javascript/{index,cheatsheet}.html.
// Prose preserved as sanitized HTML blocks (styled via .cheat-prose) +
// extracted code blocks. Re-running the parser overwrites this file.
import type { TopicContent } from './types'

export const javascriptContent: TopicContent = {
  "slug": "javascript",
  "sections": [
    {
      "id": "type-system-interfaces",
      "title": "🧩 Type System & Interfaces",
      interviewQuestions: [
        {
          "question": "Чим <code>interface</code> відрізняється від <code>type</code> у TypeScript, і коли це реально має значення?",
          "answer": "Обидва здебільшого взаємозамінні для опису форми об'єкта, але <code>interface</code> підтримує declaration merging (повторне оголошення доповнює попереднє) і краще підходить для публічних API бібліотек, де споживачі можуть розширювати тип. <code>type</code> може описувати union/intersection/mapped types, чого <code>interface</code> не вміє. На практиці різниця стає важливою в бібліотечному коді, де потрібне розширення типів ззовні."
        },
        {
          "question": "Що таке structural typing в TypeScript, і чим це принципово відрізняється від nominal typing (наприклад, у Java)?",
          "answer": "TypeScript порівнює типи за <strong>формою</strong> (набором полів і їхніх типів), а не за іменем оголошення — два різні інтерфейси з однаковими полями взаємозамінні. У nominal typing два класи з ідентичною структурою, але різними іменами, несумісні без явного успадкування. Це дає TypeScript гнучкість, але й ризик випадкової сумісності типів, які концептуально не мають бути взаємозамінними."
        },
        {
          question: `Interface vs abstract class?`,
          answer: `interface = compile-time форма, стирається, кілька через implements; abstract class = runtime, з реалізацією/станом/конструктором, один через extends, не інстанціюється.`,
        },
        {
          question: `В чому різниця unknown і any?`,
          answer: `unknown потребує перевірки типу, any ні. Use unknown у catch блоках (TS 4.0+).`,
        },
        {
          question: `Як ти використовуєш discriminated unions?`,
          answer: `Структури (status + data) для type narrowing без type guards.`,
        },
        {
          question: `Коли використовуєш satisfies?`,
          answer: `Коли потрібна перевірка типу, але збереження точного літерального типу значення.`,
        },
        {
          question: `Поясни type narrowing.`,
          answer: `typeof/instanceof для розпізнання типу всередину if/else, потім TS звужує тип.`,
        },
        {
          question: `Що таке type predicate (is)?`,
          answer: `Custom функція, яка повертає boolean і говорить TS-у про результуючий тип.`,
        },
        {
          question: `Як структурувати API response типи?`,
          answer: `Discriminated unions з status полем + type predicate функції для парсингу.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5 typeof</span>\n            <span class=\"ver ver-ts2\">TS 2.x</span>\n            <span class=\"ver ver-ts5\">TS 5.x satisfies</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія (ES5 → TS 5.x)</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Динамічна типізація, typeof, слабе порівняння</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 2</span><span class=\"changelog-text\">Interfaces, type aliases, type inference</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 4</span><span class=\"changelog-text\">Variadic tuples, const type parameters</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 5 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> satisfies operator для перевірки типів</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Type System в TypeScript:</strong></p>\n            <p>JavaScript — динамічна мова. TypeScript додає статичну типізацію. Типи живуть тільки у TS.</p>\n            <p><strong>Type vs Interface:</strong></p>\n            <ul class=\"list\">\n              <li><strong>Interface:</strong> для об'єктів, merging, extends, декларативні</li>\n              <li><strong>Type:</strong> універсально, union/intersection, більше гнучкі</li>\n              <li><strong>Discriminated Unions:</strong> тип + поле для розрізнення</li>\n              <li><strong>Type narrowing:</strong> typeof, instanceof, in, type predicates (is)</li>\n            </ul>\n          </div><h3 class=\"topic\">Базові типи & unknown/any/never <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> TypeScript базові типи для контролю типів. unknown — безпечна any (потребує type guard). any — відімкнути type checking. never — значення які ніколи не повертаються. <strong>Навіщо:</strong> Розуміти різниці для правильної типізації. unknown краще за any.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "let num: number = 42;\nlet str: string = \"hello\";\nlet unknown: unknown = 123; // Безпечна\nlet any: any = 456; // ⚠️ Уникай!\nlet nev: never = null; // Неможливий тип"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Unknown vs Any vs Never — Таблиця</h3><p><strong>Що це:</strong> Три спеціальні типи з різним поведінням. <strong>Навіщо:</strong> Вибір правильного типу для безпечності і функціональності. any — лінивий вихід. unknown — безпечниший. never — pentru impossible values.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Тип</th><th>Опис</th><th>Юз-кейс</th></tr>\n              <tr><td>unknown</td><td>Безпечна \"будь-що\" — потрібна перевірка типу</td><td>catch блоки, parse результати</td></tr>\n              <tr><td>any</td><td>Вимкнути типобезпеку повністю (лінива)</td><td>Legacy код, quick fixes (УНИКАЙ!)</td></tr>\n              <tr><td>never</td><td>Тип, який ніколи не буває (dead code)</td><td>Impossible states, exhaustiveness checks</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Discriminated Unions & Type Narrowing</h3><p><strong>Що це:</strong> Discriminated Union — union з common property щоб розрізнити. Type narrowing — звужувати тип через type guards (typeof, instanceof, in, is). <strong>Навіщо:</strong> Type-safe обробка різних типів. Аналог pattern matching.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "type Result =\n  | { status: 'success'; data: string }\n  | { status: 'error'; error: Error };\n\nif (result.status === 'success') {\n  console.log(result.data); // TS узнає, що це string\n}\n\n// Type narrowing techniques\nif (typeof val === 'string') { // val is string }\nif (err instanceof Error) { // err is Error }\nif ('email' in obj) { // obj has email }"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-warn\"><strong>⚠️ Дві реальні пастки narrowing:</strong> <code>typeof null === 'object'</code> — класичний баг мови (historical artifact) — typeof-перевірка НЕ відсіює null, потрібна окрема явна перевірка <code>x !== null</code>. І: звуження типу «протікає» — губиться після <code>await</code> або всередині вкладеного замикання, бо TS не гарантує незмінність значення за час асинхронної паузи.</div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">satisfies operator (TS 4.9+)</h3><p><strong>Що це:</strong> satisfies перевіряє, що значення відповідає типу БЕЗ змінення його вихідного типу. <strong>Навіщо:</strong> Перевірка типу при збереженні specificity (наприклад, literal types).</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// satisfies перевіряє тип, не ховаючи значення\nconst colors = {\n  red: '#ff0000',\n  green: '#00ff00'\n} satisfies Record<string, string>;\n\n// colors.red має тип '#ff0000', не string\nconst redValue: typeof colors.red = '#ff0000'; // OK"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Template literal types</h3><p><strong>Що це:</strong> Template literal types дозволяють створювати типи з строк. type Greeting = `Hello, ${string}`. <strong>Навіщо:</strong> Точна типізація строк (наприклад, routing paths, event names).</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "type EventName = `on${Capitalize<'click'>}`; // \"onClick\"\ntype Sizes = `${'small' | 'large'}-${'dark' | 'light'}`;\n// \"small-dark\" | \"small-light\" | \"large-dark\" | \"large-light\""
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Abstract class vs Interface <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> обидва задають «контракт», але в різних площинах. <strong>Interface</strong> — суто <em>compile-time</em> опис форми: стирається при компіляції, без реалізації чи стану; клас може реалізувати <strong>кілька</strong> інтерфейсів. <strong>Abstract class</strong> — <em>runtime</em> конструкція: може мати готові методи, поля, конструктор і модифікатори доступу, але його <strong>не можна</strong> інстанціювати (<code>new</code>), і успадкувати можна лише <strong>один</strong>. <strong>Навіщо:</strong> interface — коли потрібна лише форма чи кілька контрактів; abstract class — коли треба ділити спільну <em>реалізацію</em> та стан між нащадками.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th></th><th>Interface</th><th>Abstract class</th></tr>\n              <tr><td>Існує в рантаймі</td><td>Ні (стирається)</td><td>Так (це клас)</td></tr>\n              <tr><td>Реалізація методів</td><td>Ні, лише сигнатури</td><td>Так (+ abstract-методи без тіла)</td></tr>\n              <tr><td>Поля / стан</td><td>Лише опис, без значень</td><td>Так, реальні поля</td></tr>\n              <tr><td>Конструктор</td><td>Ні</td><td>Так</td></tr>\n              <tr><td>private/protected</td><td>Ні (усе публічне)</td><td>Так</td></tr>\n              <tr><td>Скільки можна взяти</td><td><code>implements</code> кількох</td><td><code>extends</code> лише одного</td></tr>\n              <tr><td>Можна <code>new</code></td><td>—</td><td>Ні (тільки нащадка)</td></tr>\n            </table>\n          </div><p><strong>Правило:</strong> потрібна <em>лише форма</em> або кілька контрактів → interface; треба <em>ділити код/стан</em> → abstract class. Часто разом: abstract class <code>implements</code> interface.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Interface — контракт форми (compile-time, стирається)\ninterface Repository<T> {\n  findById(id: string): T | null;\n  save(entity: T): void;\n}\n\n// Abstract class — спільна реалізація + abstract-«дірки»\nabstract class BaseRepository<T> implements Repository<T> {\n  protected items = new Map<string, T>();          // стан\n\n  findById(id: string): T | null {                 // готова реалізація\n    return this.items.get(id) ?? null;\n  }\n  abstract save(entity: T): void;                  // нащадок мусить дореалізувати\n}\n\nclass UserRepository extends BaseRepository<User> { // extends — лише один\n  save(user: User) { this.items.set(user.id, user); }\n}\n\n// ❌ new BaseRepository() — помилка: abstract не інстанціюється\n// Клас може реалізувати КІЛЬКА інтерфейсів:\nclass Service implements Repository<User>, Disposable { /* ... */ }"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у TS 6+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Runtime type reflection, enum deprecation, better type narrowing</span></div></div>"
        }
      ]
    },
    {
      "id": "functions-closures-scope",
      "title": "🔧 Functions, Closures & Scope",
      interviewQuestions: [
        {
          "question": "Поясни, як замикання (closure) дозволяють реалізувати приватний стан у JavaScript без класів.",
          "answer": "Функція, оголошена всередині іншої функції, зберігає доступ до змінних зовнішньої функції навіть після її завершення (лексичне середовище не звільняється, доки на нього є посилання). Це дозволяє створити «приватну» змінну, доступну лише через повернуті функції-геттери/сеттери — сама змінна не досяжна ззовні напряму, класична реалізація модульного патерну до появи <code>class</code> з приватними полями."
        },
        {
          "question": "Яка класична помилка з <code>var</code> у циклі й замиканнях, і чому <code>let</code> її вирішує без додаткового коду?",
          "answer": "<code>var</code> має функціональну область видимості — всі ітерації циклу ділять одну й ту саму змінну, тому асинхронні колбеки (наприклад, у <code>setTimeout</code>) бачать її фінальне значення після завершення циклу, а не значення на момент своєї ітерації. <code>let</code> створює нову прив'язку змінної на кожну ітерацію блоку, тому кожне замикання захоплює власну копію."
        },
        {
          question: `Поясни hoisting.`,
          answer: `Function declarations підіймаються повністю, var — undefined, let/const — TDZ error.`,
        },
        {
          question: `Що таке closure?`,
          answer: `Функція + доступ до батьківської області. Утримує дані в пам'яті. Memory leak ризик.`,
        },
        {
          question: `Чому IIFE?`,
          answer: `Ізоляція змінних, module pattern, уникнення забруднення global scope.`,
        },
        {
          question: `Overloading у TS: як це працює?`,
          answer: `Multiple signatures для type checking, одна implementation для runtime.`,
        },
        {
          question: `Currying vs partial application?`,
          answer: `Currying = все аргументи по одному, partial = кілька за раз.`,
        },
        {
          question: `Як запобігти memory leaks у closures?`,
          answer: `Явно очисти посилання (= null), використовуй WeakMap для кешу.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5</span>\n            <span class=\"ver ver-es6\">ES6 arrows</span>\n            <span class=\"ver ver-ts4\">TS 4.x overloads</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Function declaration, expression, hoisting, this</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Arrow functions, default/rest params</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 5 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> Typed this параметри, overloads</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Closures:</strong> Функції мають доступ до змінних батьківської області.</p>\n            <p><strong>Scope Chain:</strong> Local → Function → Global</p>\n            <p><strong>TDZ (Temporal Dead Zone):</strong> let/const до декларації — ReferenceError</p>\n            <p><strong>Hoisting:</strong> function декларації підіймаються, вирази — ні.</p>\n          </div><h3 class=\"topic\">Hoisting: Declaration vs Expression <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Hoisting — процес коли JavaScript рушій рухає декларації на верх scope. function declaration піднімається повністю (можеш викликати раніше). var піднімається але = undefined. let/const НЕ хойстаються (TDZ — Temporal Dead Zone). <strong>Навіщо:</strong> Розуміти execution order. Уникнути undefined errors.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th></th><th>Function Declaration</th><th>Function Expression</th><th>Arrow Function</th></tr>\n              <tr><td>Hoisting</td><td>✓ Full (Whole function)</td><td>✗ TDZ (undefined)</td><td>✗ TDZ</td></tr>\n              <tr><td>Can use before declare</td><td>✓ Yes</td><td>✗ No (ReferenceError)</td><td>✗ No</td></tr>\n              <tr><td>this binding</td><td>Dynamic</td><td>Dynamic</td><td>Lexical</td></tr>\n            </table>\n          </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Function declaration: hoisted\nsayHi(); // \"Hi\" ✓\nfunction sayHi() {\n  console.log(\"Hi\");\n}\n\n// Function expression: TDZ\nsayHi(); // ReferenceError ✗\nconst sayHi = () => {\n  console.log(\"Hi\");\n};"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Closures & Memory Leaks</h3><p><strong>Що це:</strong> Closure — функція яка має доступ до батьківської scope. Closure тримає reference на батьківські змінні навіть після завершення. <strong>Навіщо:</strong> Використовувати closures для private data (factory pattern). Уникнути case де closure випадково тримає великий об'єкт в пам'яті.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "function makeCounter() {\n  let count = 0; // Closure утримує це\n  return {\n    inc: () => ++count,\n    get: () => count,\n    reset: () => count = 0\n  };\n}\nconst counter = makeCounter();\ncounter.inc(); // 1\ncounter.inc(); // 2\n\n// Уникнути memory leak: явно очисти посилання\nlet largeData = new Array(1000000);\nconst fn = () => largeData;\nlargeData = null; // Дозволяє GC"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Arrow function — чим саме відрізняється <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> arrow function — не просто коротший синтаксис, а функція БЕЗ власного <code>this</code>, <code>arguments</code>, <code>super</code> і <code>prototype</code>. Детальний розбір усіх правил визначення <code>this</code> — у розділі «Корисні посилання» нижче. <strong>Навіщо:</strong> знати, коли arrow function підходить (callback, де треба лексичний <code>this</code>), а коли ні (метод об'єкта, конструктор, обробник, де <code>this</code> має бути динамічним).</p><ul class=\"list\">\n            <li><strong>this:</strong> лексичний, береться із зовнішньої (батьківської) області як звичайна змінна — <code>.bind()/.call()/.apply()</code> на неї НЕ впливають.</li>\n            <li><strong>arguments:</strong> немає власного — читає <code>arguments</code> з батьківської функції (або кидає ReferenceError на верхньому рівні). Use <code>...rest</code> замість цього.</li>\n            <li><strong>new:</strong> не може бути конструктором — <code>new ArrowFn()</code> кидає <code>TypeError</code>.</li>\n            <li><strong>prototype:</strong> відсутній — <code>arrowFn.prototype === undefined</code>.</li>\n          </ul>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "const obj = {\n  name: 'Roman',\n  regular() { return this.name; },        // this = obj (метод-виклик)\n  arrow: () => this?.name,                 // this = зовнішній scope, НЕ obj!\n};\nobj.regular(); // 'Roman'\nobj.arrow();   // undefined (this лексичний, узятий ззовні обʼєкта)\n\nfunction RegularFn() { this.x = 1; }\nnew RegularFn(); // OK\n\nconst ArrowFn = () => { this.x = 1; };\nnew ArrowFn(); // ❌ TypeError: ArrowFn is not a constructor"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">IIFE (Immediately Invoked Function Expression)</h3><p><strong>Що це:</strong> (function() { })() — функція яка викликається одразу після визначення. Створює новий scope. <strong>Навіщо:</strong> Legacy спосіб уникнути глобального scope. Сьогодні використовується рідко (modules замість).</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// IIFE: змінні ізольовані від global scope\n(function() {\n  const secret = \"private\";\n  window.expose = () => secret;\n})();\n\n// Використання у модулях (Module Pattern)\nconst Module = (() => {\n  let data = 0;\n  return {\n    increment: () => ++data,\n    getValue: () => data\n  };\n})();"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Function Overloading (TS)</h3><p><strong>Що це:</strong> TypeScript дозволяє оголошувати кілька сигнатур для однієї функції. Реалізація обробляє усі cases. <strong>Навіщо:</strong> Type-safe функції з різними параметрами. Більш точна документація.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Multiple signatures, one implementation\nfunction process(x: string): string;\nfunction process(x: number): number;\nfunction process(x: string | number): string | number {\n  if (typeof x === 'string') return x.toUpperCase();\n  return x * 2;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Currying & Partial Application</h3><p><strong>Що це:</strong> Currying — перетворення function(a,b,c) на function(a)(b)(c). Partial application — функція що повертає функцію з деякими параметрами зафіксованими. <strong>Навіщо:</strong> Функціональне програмування. Composition. Reusability.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Currying: функція повертає функцію\nfunction curry(fn) {\n  return function(...args1) {\n    if (args1.length >= fn.length) return fn(...args1);\n    return (...args2) => curry(fn)(...args1, ...args2);\n  };\n}\n\nconst add = (a, b, c) => a + b + c;\nconst curriedAdd = curry(add);\ncurriedAdd(1)(2)(3); // 6"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Partial application syntax (potential), pipe operator, better function composition</span></div></div>"
        }
      ]
    },
    {
      "id": "this-binding-callapplybind",
      "title": "🎯 This Binding & call/apply/bind",
      interviewQuestions: [
        {
          "question": "Чим стрілкові функції відрізняються від звичайних з точки зору <code>this</code>, і чому це важливо для React/Angular-обробників подій?",
          "answer": "Звичайна функція отримує <code>this</code> динамічно, залежно від того, <em>як</em> її викликали (метод об'єкта, callback, і т.д.) — тому переданий як callback метод втрачає контекст. Стрілкова функція не має власного <code>this</code> — вона бере його лексично з оточення, де була оголошена, тому клас-методи, оголошені як стрілкові властивості, безпечно передавати як обробники подій без ручного <code>.bind()</code>."
        },
        {
          "question": "У чому різниця між <code>call</code>, <code>apply</code> і <code>bind</code>?",
          "answer": "Усі три явно задають <code>this</code> для виклику функції. <code>call(thisArg, arg1, arg2)</code> викликає функцію одразу з аргументами через кому; <code>apply(thisArg, [args])</code> — те саме, але аргументи масивом; <code>bind(thisArg)</code> не викликає функцію одразу, а повертає <strong>нову</strong> функцію з назавжди зафіксованим <code>this</code>, яку можна викликати пізніше."
        },
        {
          question: `Яка різниця між call, apply, bind?`,
          answer: `call/apply одразу, apply з масивом, bind пізніше з partial app.`,
        },
        {
          question: `Поясни this binding priorities.`,
          answer: `new > call/apply/bind > arrow > method call > global.`,
        },
        {
          question: `Arrow functions і this: чому вони різні?`,
          answer: `Arrow використовує батьківський this лексично, regular функції — динамічна.`,
        },
        {
          question: `Як це використовується у React?`,
          answer: `this.method.bind(this) у constructor, або arrow fields для auto-binding.`,
        },
        {
          question: `Lost context при callback?`,
          answer: `Метод втрачає this коли передається як callback. Розв'язання: bind, arrow field, або bind() на місці.`,
        },
        {
          question: `Function binding у class libraries (jQuery)?`,
          answer: `$.proxy(), _.bindAll(), або стрілки для сучасного коду.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5 call/apply</span>\n            <span class=\"ver ver-es6\">ES6 arrow functions</span>\n            <span class=\"ver ver-es2022\">ES2022 class fields</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">call(), apply(), bind() для управління this</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Arrow functions мають лексичний this</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2022 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> Private fields, класові поля як alternative до bind</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>This Binding Rules — за пріоритетом:</strong></p>\n            <ol style=\"padding-left: 20px; color: #94a3b8;\">\n              <li><strong>new</strong> binding (constructor) — this = new instance</li>\n              <li><strong>call/apply/bind</strong> (explicit) — this = перший аргумент</li>\n              <li><strong>Arrow functions</strong> — лексичний this (батьківський контекст, NOT changeable)</li>\n              <li><strong>Method call</strong> (obj.method()) — this = obj</li>\n              <li><strong>Global/undefined</strong> — this = window (sloppy) або undefined (strict)</li>\n            </ol>\n          </div><h3 class=\"topic\">This Context Cases <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> this — залежить від того як функція викликається. Method call: this = object. Function call: this = undefined (strict) або window. Arrow: this = lexical. Constructor: this = new object. <strong>Навіщо:</strong> Розуміти контекст. Избежать неочікуваних thisErrors.</p><div class=\"grid3\">\n            <div class=\"card blue\">\n              <h4>Global context</h4>\n              <pre><span class=\"kw\">function</span> <span class=\"fn\">test</span>() {\n  console.<span class=\"fn\">log</span>(<span class=\"kw\">this</span>);\n}\n<span class=\"fn\">test</span>();\n<span class=\"cmt\">// undefined (strict)</span>\n<span class=\"cmt\">// window (sloppy)</span></pre>\n            </div>\n            <div class=\"card blue\">\n              <h4>Method call</h4>\n              <pre><span class=\"kw\">const</span> obj = {\n  name: <span class=\"str\">\"Alice\"</span>,\n  <span class=\"fn\">greet</span>() {\n    <span class=\"kw\">return</span> <span class=\"kw\">this</span>.name;\n  }\n};\nobj.<span class=\"fn\">greet</span>();\n<span class=\"cmt\">// \"Alice\"</span></pre>\n            </div>\n            <div class=\"card blue\">\n              <h4>Constructor (new)</h4>\n              <pre><span class=\"kw\">class</span> User {\n  <span class=\"fn\">constructor</span>(name) {\n    <span class=\"kw\">this</span>.name = name;\n  }\n}\n<span class=\"kw\">const</span> u = <span class=\"kw\">new</span> <span class=\"fn\">User</span>(<span class=\"str\">\"Bob\"</span>);\n<span class=\"cmt\">// this = u</span></pre>\n            </div>\n          </div><h3 class=\"topic\">Arrow Functions vs Regular Functions</h3><p><strong>Що це:</strong> Arrow functions NOT мають власного this (lexical). NOT мають arguments object. NOT можуть бути constructors. Regular можуть. <strong>Навіщо:</strong> Arrow для callbacks і коли потрібен lexical this. Regular для methods and constructors.</p><div class=\"grid2\">\n            <pre><span class=\"cmt\">// Regular: динамічний this</span>\n<span class=\"kw\">const</span> obj = {\n  x: <span class=\"num\">10</span>,\n  <span class=\"fn\">test</span>: <span class=\"kw\">function</span>() {\n    <span class=\"fn\">setTimeout</span>(<span class=\"kw\">function</span>() {\n      console.<span class=\"fn\">log</span>(<span class=\"kw\">this</span>.x);\n    }, <span class=\"num\">100</span>);\n  }\n};\nobj.<span class=\"fn\">test</span>();\n<span class=\"cmt\">// undefined (this = undefined)</span></pre>\n            <pre><span class=\"cmt\">// Arrow: лексичний this</span>\n<span class=\"kw\">const</span> obj = {\n  x: <span class=\"num\">10</span>,\n  <span class=\"fn\">test</span>: <span class=\"kw\">function</span>() {\n    <span class=\"fn\">setTimeout</span>(() => {\n      console.<span class=\"fn\">log</span>(<span class=\"kw\">this</span>.x);\n    }, <span class=\"num\">100</span>);\n  }\n};\nobj.<span class=\"fn\">test</span>();\n<span class=\"cmt\">// 10 (this = obj)</span></pre>\n          </div><h3 class=\"topic\">call(), apply(), bind() — Порівняння <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Методи для управління this контекстом. call(obj, a, b) одразу. apply(obj, [a,b]) одразу. bind(obj, a, b) повертає нову функцію. <strong>Навіщо:</strong> Контролювати контекст. Useful для callbacks і inheritance.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Метод</th><th>Синтаксис</th><th>Виклик?</th><th>Аргументи</th><th>Використання</th></tr>\n              <tr><td>call()</td><td>fn.call(obj, a, b)</td><td>✓ Одразу</td><td>Список</td><td>Окремі аргументи</td></tr>\n              <tr><td>apply()</td><td>fn.apply(obj, [a,b])</td><td>✓ Одразу</td><td>Масив</td><td>Spread arguments</td></tr>\n              <tr><td>bind()</td><td>fn.bind(obj)(a, b)</td><td>✗ Пізніше</td><td>Як call</td><td>Partial app, callbacks</td></tr>\n            </table>\n          </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "function greet(greeting, punctuation) {\n  return greeting + \" \" + this.name + punctuation;\n}\n\nconst user = { name: \"Alice\" };\n\n// call — одразу, перелік аргів\ngreet.call(user, \"Hi\", \"!\"); // \"Hi Alice!\"\n\n// apply — одразу, масив аргів\ngreet.apply(user, [\"Hey\", \"?\"]); // \"Hey Alice?\"\n\n// bind — пізніше, повна контроль\nconst boundGreet = greet.bind(user);\nboundGreet(\"Hello\", \".\"); // \"Hello Alice.\"\n\n// bind з передзаповленням аргів (partial app)\nconst boundHello = greet.bind(user, \"Hello\");\nboundHello(\"!!!\"); // \"Hello Alice!!!\""
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Bind у класах & React</h3><p><strong>Що це:</strong> У класах методи втрачають this при передачі як callbacks. bind(this) фіксує це. Arrow fields автоматично мають правильний this. <strong>Навіщо:</strong> React event handlers потребують цього. Class methods як callbacks.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Old way: bind у constructor\nclass Button {\n  constructor(label) {\n    this.label = label;\n    this.handleClick = this.handleClick.bind(this);\n  }\n  handleClick() { console.log(this.label); }\n}\n\n// Modern: arrow field (ES2022)\nclass Button {\n  label = \"Click me\";\n  handleClick = () => {\n    console.log(this.label); // this = Button instance\n  };\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Common Pitfalls</h3><p><strong>Що це:</strong> Найчастіші помилки з this: забути bind. Очікувати window як this у strict mode. Передавати method без контексту. <strong>Навіщо:</strong> Знати типичні pitfalls для уникнення runtime errors.</p><div class=\"grid2\">\n            <div class=\"card red\">\n              <h4>❌ Lost context</h4>\n              <pre><span class=\"kw\">const</span> obj = {\n  name: <span class=\"str\">\"Alice\"</span>,\n  <span class=\"fn\">greet</span>() {\n    <span class=\"kw\">return</span> <span class=\"kw\">this</span>.name;\n  }\n};\n<span class=\"kw\">const</span> fn = obj.greet;\n<span class=\"fn\">fn</span>();\n<span class=\"cmt\">// undefined!</span>\n<span class=\"cmt\">// this = global</span></pre>\n            </div>\n            <div class=\"card green\">\n              <h4>✅ Preserved context</h4>\n              <pre><span class=\"kw\">const</span> obj = {\n  name: <span class=\"str\">\"Alice\"</span>,\n  <span class=\"fn\">greet</span>() {\n    <span class=\"kw\">return</span> <span class=\"kw\">this</span>.name;\n  }\n};\n<span class=\"kw\">const</span> fn = obj.greet.<span class=\"fn\">bind</span>(obj);\n<span class=\"fn\">fn</span>();\n<span class=\"cmt\">// \"Alice\"</span></pre>\n            </div>\n          </div><div class=\"alert warn\">\n            <span class=\"icon\">⚠️</span>\n            <span><strong>Interview Trap:</strong> Arrow functions НЕ мають своїх call/apply/bind — вони завжди використовують батьківський this. Це ЧАСТО питання на інтерв'ю.</span>\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Potential \"this\" improvements, better error messages for this type parameters</span></div></div>"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-warn\"><strong>⚠️ new сильніший за bind, повторний bind не діє:</strong> якщо привʼязану через <code>.bind(obj)</code> функцію викликати через <code>new</code>, this всередині буде НОВИМ обʼєктом, а не obj — new-binding переважає explicit-binding. І: виклик <code>.bind()</code> вдруге на вже привʼязаній функції (<code>fn.bind(obj1).bind(obj2)</code>) не перепризначає this — воно залишається obj1, бо перший bind вже створив нову функцію з назавжди зафіксованим контекстом.</div>"
        }
      ]
    },
    {
      "id": "async-promises-event-loop",
      "title": "⚡ Async, Promises & Event Loop",
      interviewQuestions: [
        {
          "question": "Поясни різницю між microtask queue і macrotask queue, і чому проміси завжди виконуються раніше за <code>setTimeout(fn, 0)</code>.",
          "answer": "Після кожної macrotask (наприклад, обробки таймера чи події) event loop повністю спустошує microtask queue (проміси, <code>queueMicrotask</code>), перш ніж перейти до наступної macrotask (черга таймерів, I/O). Тому навіть <code>setTimeout(fn, 0)</code>, запланований раніше за <code>Promise.resolve().then(fn2)</code>, виконається пізніше — мікротаски завжди мають пріоритет над наступною макротаскою."
        },
        {
          "question": "Чим <code>async/await</code> відрізняється від ланцюжка <code>.then()</code> лише синтаксично, чи є семантичні відмінності?",
          "answer": "Синтаксично <code>async/await</code> — це цукор над промісами (транспілюється у стан-машину на generator'ах або еквівалент), семантика виконання та сама. Практична відмінність — обробка помилок: <code>try/catch</code> навколо <code>await</code> природно ловить і синхронні, і асинхронні помилки в одному місці, тоді як з <code>.then()</code> потрібен окремий <code>.catch()</code>, і легше пропустити обробку помилки в середині ланцюжка."
        },
        {
          question: `Поясни Event Loop.`,
          answer: `Call Stack → Microtasks (Promise, queueMicrotask) → Macrotasks (setTimeout) → Repeat. Microtasks ЗАВЖДИ раньше!`,
        },
        {
          question: `Якого порядку виконання? console.log, Promise, setTimeout?`,
          answer: `Sync → Microtasks → Macrotasks. Classic interview question!`,
        },
        {
          question: `Promise.all vs allSettled?`,
          answer: `all() fails на першій помилці, allSettled() чекає всі й повертає {status, value/reason}.`,
        },
        {
          question: `Promise.race для timeout?`,
          answer: `race([fetch, timeout promise]) для обмеження часу очікування.`,
        },
        {
          question: `Async/await під капотом?`,
          answer: `Syntactic sugar над Promise. await приймає Promise й паузує execution поки не resolve.`,
        },
        {
          question: `Top-level await?`,
          answer: `Доступна тільки в modules (type: module), не у scripts. Потребує .js/.mjs файлів.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es6\">ES6 Promise</span>\n            <span class=\"ver ver-es2017\">ES2017 async/await</span>\n            <span class=\"ver ver-es2024\">ES2024 Promise.all</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Callbacks (callback hell)</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Promise (then/catch/finally)</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2017</span><span class=\"changelog-text\">async/await (syntactic sugar)</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2024 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> Promise.withResolvers(), Promise.any()</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Event Loop (3 черги — CRITICAL для інтерв'ю):</strong></p>\n            <ol style=\"padding-left: 20px;\">\n              <li><strong>Call Stack:</strong> синхронний JavaScript код, виконується спочатку</li>\n              <li><strong>Microtask Queue:</strong> Promise callbacks (then/catch), queueMicrotask(), MutationObserver</li>\n              <li><strong>Macrotask Queue:</strong> setTimeout, setInterval, setImmediate, I/O, requestAnimationFrame</li>\n            </ol>\n            <p><strong>ВАЖНЕ:</strong> Microtask виконується РАНІШЕ macrotask! Call Stack → All Microtasks → One Macrotask → All Microtasks...</p>\n          </div><h3 class=\"topic\">Event Loop Execution Order <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Event Loop: call stack → microtask queue (Promise) → macrotask queue (setTimeout). Порядок: синхронний код → microtasks → один macrotask → microtasks → ... <strong>Навіщо:</strong> Розуміти коли код виконується. Predict async behavior.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "console.log('1'); // Call Stack (FIRST)\n\nsetTimeout(() => console.log('2'), 0); // Macrotask\n\nPromise.resolve().then(() => console.log('3')); // Microtask\n\nconsole.log('4'); // Call Stack\n\n// Output: 1, 4, 3, 2"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Promise vs async/await <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> async/await — синтаксичний sugar над Promise. async function повертає Promise. await чекає на Promise. <strong>Навіщо:</strong> async/await читаєміший за .then() chains. Easier error handling з try/catch.</p><div class=\"grid2\">\n            <pre><span class=\"fn\">fetch</span>(<span class=\"str\">'/api'</span>)\n  .<span class=\"fn\">then</span>(r => r.<span class=\"fn\">json</span>())\n  .<span class=\"fn\">then</span>(data => console.<span class=\"fn\">log</span>(data))\n  .<span class=\"fn\">catch</span>(e => console.<span class=\"fn\">error</span>(e));\n\n<span class=\"cmt\">// Chaining, harder to read</span></pre>\n            <pre><span class=\"kw\">async</span> <span class=\"kw\">function</span> <span class=\"fn\">getData</span>() {\n  <span class=\"kw\">try</span> {\n    <span class=\"kw\">const</span> r = <span class=\"kw\">await</span> <span class=\"fn\">fetch</span>(<span class=\"str\">'/api'</span>);\n    <span class=\"kw\">const</span> data = <span class=\"kw\">await</span> r.<span class=\"fn\">json</span>();\n    console.<span class=\"fn\">log</span>(data);\n  } <span class=\"kw\">catch</span> (e) {}\n}\n\n<span class=\"cmt\">// Linear, easier to read</span></pre>\n          </div><h3 class=\"topic\">Promise Combinators</h3><p><strong>Що це:</strong> Promise.all() (всі), Promise.race() (перший), Promise.allSettled() (всі результати), Promise.any() (перший успішний). <strong>Навіщо:</strong> Управління кількома Promise одночасно. Різні сценарії: очікувати всіх, першого, будь-якого успіху.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Метод</th><th>Поведінка</th><th>Помилка?</th><th>Use case</th></tr>\n              <tr><td>Promise.all()</td><td>Чекає всі, або fail при першій помилці</td><td>1st error stops</td><td>Паралельні запити, всі потрібні</td></tr>\n              <tr><td>Promise.allSettled()</td><td>Чекає всі (success або fail)</td><td>Ніколи не fails</td><td>Результати без зупинки на помилці</td></tr>\n              <tr><td>Promise.race()</td><td>Перша завершена wins</td><td>First rejection</td><td>Timeout, гонка (race)</td></tr>\n              <tr><td>Promise.any()</td><td>Перша успішна (ES2021)</td><td>Всі failed = AggregateError</td><td>Альтернативні джерела</td></tr>\n            </table>\n          </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Promise.all — всі або нічого\nconst [user, posts] = await Promise.all([\n  fetch('/user').then(r => r.json()),\n  fetch('/posts').then(r => r.json())\n]);\n\n// Promise.allSettled — всі результати\nconst results = await Promise.allSettled([p1, p2, p3]);\n// [{status: 'fulfilled', value}, {status: 'rejected', reason}]\n\n// Promise.race — перша wins\nconst first = await Promise.race([\n  fetch(url),\n  new Promise((_, rej) =>\n    setTimeout(() => rej(new Error('timeout')), 5000)\n  )\n]);\n\n// Promise.any — перша успішна (ES2021)\nconst first = await Promise.any([p1, p2, p3]);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Top-level await & Async Context</h3><p><strong>Що це:</strong> Top-level await дозволяє await у модулі top-level (не в функції). Потребує type: module в package.json. <strong>Навіщо:</strong> Ініціалізація модулів з async операціями. Simpler code без wrapper функції.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Top-level await (ES2022, modules only)\nconst data = await fetch('/api').then(r => r.json());\n\n// Async IIFE (для non-module контексту)\n(async () => {\n  const data = await fetch('/api').then(r => r.json());\n})();"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Top-level await improvements, AbortSignal enhancements, structured concurrency</span></div></div>"
        }
      ]
    },
    {
      "id": "prototypes-classes",
      "title": "🏛️ Prototypes & Classes",
      interviewQuestions: [
        {
          "question": "Що таке прототипний ланцюжок, і чим <code>class</code> у JS відрізняється від класів у класичних ООП-мовах?",
          "answer": "Кожен об'єкт має внутрішнє посилання <code>[[Prototype]]</code> на інший об'єкт; при зверненні до властивості, якої немає на самому об'єкті, JS шукає її вгору по ланцюжку прототипів. <code>class</code> у JS — синтаксичний цукор над цим самим прототипним механізмом (не окрема система типів, як у Java) — <code>class Dog extends Animal</code> під капотом все одно налаштовує <code>Dog.prototype.__proto__ = Animal.prototype</code>."
        },
        {
          "question": "Чому <code>Object.create(null)</code> іноді використовують замість <code>{}</code> для об'єктів-словників?",
          "answer": "<code>{}</code> успадковує <code>Object.prototype</code> з методами на кшталт <code>toString</code>, <code>hasOwnProperty</code>, <code>constructor</code> — якщо об'єкт використовується як довільний словник із ключами від користувача, ключ на кшталт <code>\"toString\"</code> може конфліктувати зі спадкованим методом. <code>Object.create(null)</code> створює об'єкт без прототипу взагалі — чистий словник без ризику таких колізій."
        },
        {
          question: `Поясни prototype chain.`,
          answer: `obj → [[Prototype]] → Proto.prototype → Object.prototype → null. Lookup йде вгору по chain.`,
        },
        {
          question: `Class vs Constructor Function?`,
          answer: `Class — синтаксичний цукор. Під капотом те ж саме, але cleaner API.`,
        },
        {
          question: `Super у constructor?`,
          answer: `ОБОВ'ЯЗКОВО у extends класі! super(args) це заклик батьківського constructor.`,
        },
        {
          question: `Private fields vs методи?`,
          answer: `#field приватна, _method конвенція (не реально приватна). Use # для інкапсуляції.`,
        },
        {
          question: `Object.create для inheritance?`,
          answer: `Встановлює [[Prototype]]. Розв'язує reference sharing проблеми у prototype assignment.`,
        },
        {
          question: `instanceof як працює?`,
          answer: `Перевіряє, чи obj.[[Prototype]] chain містить Constructor.prototype.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5 prototypes</span>\n            <span class=\"ver ver-es6\">ES6 class</span>\n            <span class=\"ver ver-es2022\">ES2022 private #</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Prototype-based, constructor functions</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Class syntax (sugar over prototypes), super</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2022 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> Private fields (#), static fields</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Prototype Chain:</strong> obj → [[Prototype]] → Prototype.prototype → Object.prototype → null</p>\n            <p><strong>Object.create():</strong> Встановлює [[Prototype]] явно</p>\n            <p><strong>Super:</strong> Посилається на батьківський клас методи та constructor</p>\n            <p><strong>Private fields:</strong> # префікс, недоступні ззовні (ES2022)</p>\n          </div><h3 class=\"topic\">Class Inheritance <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> class Child extends Parent. super() викликає батьківський конструктор. super.method() викликає батьківський метод. <strong>Навіщо:</strong> Перевикористання коду. Ієрархія. Polymorphism.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    console.log(this.name + \" makes sound\");\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    super.speak(); // Call parent\n    console.log(\"Woof!\");\n  }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Prototype Chain детально</h3><p><strong>Що це:</strong> Кожен об'єкт має __proto__ який вказує на прототип. При пошуку властивості JavaScript йде вгору по chain. <strong>Навіщо:</strong> Розуміти як inheritance працює під капотом. Пошук властивостей.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Manual prototype chain\nfunction Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.speak = function() {\n  console.log(this.name);\n};\n\nfunction Dog(name) {\n  Animal.call(this, name);\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\n\nconst dog = new Dog(\"Rex\");\ndog.speak(); // \"Rex\" (via prototype chain)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Object.create() vs new vs class</h3><p><strong>Що це:</strong> Object.create(proto) — створює об'єкт з явним прототипом. new Constructor() — викликає конструктор. class — синтаксичний sugar над new. <strong>Навіщо:</strong> Розуміти різні способи створення об'єктів. Коли який використовувати.</p><div class=\"grid3\">\n            <pre><span class=\"cmt\">// Object.create</span>\n<span class=\"kw\">const</span> parent = {\n  x: <span class=\"num\">10</span>\n};\n<span class=\"kw\">const</span> child = Object.<span class=\"fn\">create</span>(parent);\nchild.y = <span class=\"num\">20</span>;\n<span class=\"cmt\">// [[Prototype]] = parent</span></pre>\n            <pre><span class=\"cmt\">// Constructor function</span>\n<span class=\"kw\">function</span> <span class=\"fn\">Parent</span>(x) {\n  <span class=\"kw\">this</span>.x = x;\n}\n<span class=\"kw\">const</span> child = <span class=\"kw\">new</span> <span class=\"fn\">Parent</span>(<span class=\"num\">10</span>);\nchild.y = <span class=\"num\">20</span>;\n<span class=\"cmt\">// [[Prototype]] = Parent.prototype</span></pre>\n            <pre><span class=\"cmt\">// Class (modern)</span>\n<span class=\"kw\">class</span> Parent {\n  <span class=\"fn\">constructor</span>(x) {\n    <span class=\"kw\">this</span>.x = x;\n  }\n}\n<span class=\"kw\">const</span> child = <span class=\"kw\">new</span> <span class=\"fn\">Parent</span>(<span class=\"num\">10</span>);\n<span class=\"cmt\">// Same as constructor</span></pre>\n          </div><h3 class=\"topic\">Private Fields (ES2022) <span class=\"tag tag-new\">NEW</span></h3><p><strong>Що це:</strong> #field — справді приватне поле (не можливо від'їхати через [name]). Раніше була лише конвенція _field. <strong>Навіщо:</strong> Справжня інкапсуляція. Зовнішній код не може доступати #fields.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "class User {\n  #password; // Private field (not accessible outside)\n  name; // Public field (default)\n\n  constructor(name, pass) {\n    this.name = name;\n    this.#password = pass;\n  }\n\n  checkPassword(guess) {\n    return guess === this.#password;\n  }\n}\n\nconst user = new User(\"Alice\", \"secret\");\nconsole.log(user.name); // \"Alice\"\nconsole.log(user.#password); // SyntaxError!"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Static methods & fields</h3><p><strong>Що це:</strong> static method/field належать класу, не instance. Доступні без new. <strong>Навіщо:</strong> Utility методи. Константи. Factory методи.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "class MathUtils {\n  static PI = 3.14159;\n\n  static square(x) {\n    return x * x;\n  }\n}\n\nMathUtils.square(5); // 25\nMathUtils.PI; // 3.14159"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Records/Tuples (potential), decorator improvements, better private field optimization</span></div></div>"
        }
      ]
    },
    {
      "id": "modules-esm-vs-cjs",
      "title": "📦 Modules (ESM vs CJS)",
      interviewQuestions: [
        {
          "question": "Чим ESM (<code>import</code>/<code>export</code>) відрізняється від CommonJS (<code>require</code>) на рівні виконання, а не лише синтаксису?",
          "answer": "ESM-імпорти статично аналізуються <em>до</em> виконання коду (це дозволяє tree-shaking — бандлер бачить, що реально використовується) і є асинхронними за специфікацією. CommonJS <code>require</code> — синхронний виклик функції під час виконання, тому граф залежностей неможливо повністю визначити статично, і tree-shaking для CJS-модулів значно обмеженіший."
        },
        {
          "question": "Що таке циклічна залежність між модулями, і чим вона по-різному поводиться в ESM і CJS?",
          "answer": "У CJS циклічна залежність повертає <strong>частково заповнений</strong> об'єкт module.exports на момент циклу (модуль, що імпортує, отримує лише те, що вже було експортовано до циклічного require). У ESM завдяки live bindings (посилання на змінну, а не копія значення) циклічні залежності часто працюють коректніше — значення «доганяє» реальне після повного виконання обох модулів, за умови, що воно не використовується одразу під час ініціалізації."
        },
        {
          question: `CommonJS vs ESM?`,
          answer: `CJS синхронна, ESM асинхронна. CJS у Node, ESM browser-первая й стандартна.`,
        },
        {
          question: `Tree-shaking працює тільки з ESM?`,
          answer: `Так! CommonJS динамічна, ESM статична (bundlers аналізують код).`,
        },
        {
          question: `Circular dependencies у ESM?`,
          answer: `ESM обробляє вони краще через deferred evaluation. CJS може мати проблеми.`,
        },
        {
          question: `Dynamic import як практичне використання?`,
          answer: `Code splitting, lazy loading. Async, returns Promise з module exports.`,
        },
        {
          question: `import.meta для чого?`,
          answer: `Metadata про модуль (URL, main flag). У Node: dirname, filename через import.meta.url.`,
        },
        {
          question: `Top-level await як обмеження?`,
          answer: `Тільки у ESM modules, потребує await import() у non-module контексті.`,
        },
        {
          question: `Loader vs Plugin у Webpack?`,
          answer: `Loader трансформує окремий файл перед бандлингом (per-file); Plugin втручається у весь процес збірки (напр. генерація HTML, extract CSS, оптимізація).`,
        },
        {
          question: `Чим pnpm відрізняється від npm/yarn?`,
          answer: `Спільний content-addressable store + symlinks замість копій файлів у кожен проєкт — швидше, менше місця на диску, і сувора структура node_modules унеможливлює phantom dependencies.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">CommonJS</span>\n            <span class=\"ver ver-es6\">ES6 ESM</span>\n            <span class=\"ver ver-es2020\">ES2020 import.meta</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">Node</span><span class=\"changelog-text\">CommonJS (require) — синхронно</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">ESM (import) — асинхронно, top-level</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2024 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> Dual package, import attributes</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>CommonJS vs ESM:</strong> CJS синхронна (Node runtime), ESM асинхронна (browser-first, static).</p>\n            <p><strong>Tree-shaking:</strong> Тільки ESM дозволяє static analysis для видалення unused коду (bundlers).</p>\n            <p><strong>Circular deps:</strong> ESM краще обробляє через deferred evaluation.</p>\n            <p><strong>Top-level await:</strong> Тільки ESM modules, не scripts.</p>\n          </div><h3 class=\"topic\">CommonJS vs ESM</h3><p><strong>Що це:</strong> CommonJS (require/module.exports) — синхронний, Node.js default. ESM (import/export) — асинхронний, static. <strong>Навіщо:</strong> ESM переважає (tree-shaking, static analysis). Але CJS ще використовується в старому коді.</p><div class=\"grid2\">\n            <pre><span class=\"cmt\">// CommonJS</span>\n<span class=\"kw\">const</span> mod = <span class=\"fn\">require</span>(<span class=\"str\">'./module'</span>);\nmodule.exports = { foo: <span class=\"num\">1</span> };</pre>\n            <pre><span class=\"cmt\">// ESM</span>\n<span class=\"kw\">import</span> mod <span class=\"kw\">from</span> <span class=\"str\">'./module.js'</span>;\n<span class=\"kw\">export</span> <span class=\"kw\">const</span> foo = <span class=\"num\">1</span>;</pre>\n          </div><h3 class=\"topic\">Dynamic import & import.meta <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> import(path) — динамічно завантажує модуль (повертає Promise). import.meta.url — URL поточного модулю. <strong>Навіщо:</strong> Lazy loading модулів. Умовний import. Metadata.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Dynamic import (runtime, returns Promise)\nconst m = await import('./module.js');\nm.someFunction();\n\n// Conditional import\nconst mod = isDev\n  ? await import('./debug.js')\n  : await import('./prod.js');\n\n// import.meta (module metadata)\nconsole.log(import.meta.url); // file:///path/module.js\nconsole.log(import.meta.main); // true if main module\nconsole.log(import.meta.dirname); // directory path (Node.js)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Circular Dependencies</h3><p><strong>Що це:</strong> A imports B, B imports A. Це часто проблема. CJS частково вирішує через require порядок. ESM має проблеми з circular. <strong>Навіщо:</strong> Архітектура яка уникає circular. Refactor якщо траплення.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// a.js\nexport { foo };\nimport { bar } from './b.js';\nconst foo = () => bar();\n\n// b.js\nexport { bar };\nimport { foo } from './a.js';\nconst bar = () => foo();\n\n// ESM обробляє граціозно через top-level evaluation"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Tree-shaking & bundler optimization</h3><p><strong>Що це:</strong> Tree-shaking — видалення невикористаного коду при bundlingu. Потребує ESM (static). <strong>Навіщо:</strong> Менший bundle. ESM краще за CJS для tree-shaking.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// utils.js (ESM)\nexport const used = () => \"yes\";\nexport const unused = () => \"never imported\";\n\n// main.js\nimport { used } from './utils.js';\n\n// Bundler (Webpack, Vite) видаляє unused() з bundle"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Build Tools & Bundlers — Webpack <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Webpack — bundler, що будує граф залежностей з <strong>entry</strong>-точки й пакує все (JS, CSS, зображення) в <strong>output</strong>-бандли. <strong>Loaders</strong> трансформують файли перед бандлингом (напр. <code>ts-loader</code> компілює TS, <code>css-loader</code> обробляє imports у CSS). <strong>Plugins</strong> втручаються в увесь процес збірки ширше за loaders (напр. <code>HtmlWebpackPlugin</code> генерує <code>index.html</code>, <code>MiniCssExtractPlugin</code> виносить CSS в окремі файли). <strong>Навіщо:</strong> один бандл/набір чанків замість сотень окремих файлів у браузері; code splitting і tree-shaking зменшують розмір; <strong>HMR</strong> (Hot Module Replacement) підмінює модулі в рантаймі без повного релоаду сторінки під час розробки.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// webpack.config.js (мінімальний приклад)\nmodule.exports = {\n  entry: './src/index.ts',\n  output: { filename: 'bundle.[contenthash].js', path: __dirname + '/dist' },\n  module: {\n    rules: [\n      { test: /\\.ts$/, use: 'ts-loader', exclude: /node_modules/ },\n      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },\n    ],\n  },\n  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],\n  optimization: {\n    splitChunks: { chunks: 'all' }, // code splitting — виносить спільний код (vendor) в окремий чанк\n  },\n  devServer: { hot: true }, // HMR у dev-режимі\n};"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Сучасні альтернативи:</strong> Webpack лишається найгнучкішим і найпоширенішим у legacy/enterprise проєктах (Angular CLI досі підтримує його поряд з esbuild), але нові проєкти дедалі частіше обирають швидші інструменти на основі native-бінарників.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Інструмент</th><th>Мова рушія</th><th>Швидкість dev-старту</th><th>Де типово</th></tr>\n              <tr><td>Webpack</td><td>JS</td><td>Повільніше (особливо на великих проєктах)</td><td>Enterprise, CRA-legacy, кастомна конфігурація</td></tr>\n              <tr><td>Vite</td><td>esbuild (Go) + Rollup для build</td><td>Дуже швидко (native ESM у dev)</td><td>React/Vue SPA, нові проєкти</td></tr>\n              <tr><td>esbuild</td><td>Go</td><td>Найшвидший бандлер</td><td>Angular CLI application builder</td></tr>\n              <tr><td>Turbopack</td><td>Rust</td><td>Швидко, інкрементальний кеш</td><td>Next.js (з v13+, дефолт у v15+)</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Package Managers — npm vs yarn vs pnpm</h3><p><strong>Що це:</strong> усі три встановлюють залежності з <code>package.json</code>, але по-різному зберігають <code>node_modules</code>. <strong>npm/yarn classic</strong> копіюють кожен пакет у <code>node_modules</code> кожного проєкту (дублювання на диску) і історично «сплющували» дерево залежностей — звідси <em>phantom dependencies</em> (пакет доступний у коді, хоч і не вказаний у власному <code>package.json</code>, бо його підняв інший пакет). <strong>pnpm</strong> зберігає всі версії пакетів в одному <strong>content-addressable store</strong> на диску і лінкує їх у <code>node_modules</code> через symlinks/hardlinks — економія диска й швидша установка, а суворіша (non-flat) структура <code>node_modules</code> унеможливлює phantom dependencies. <strong>Навіщо:</strong> pnpm особливо виграє в монорепо (<strong>workspaces</strong>) — спільний store для всіх пакетів репозиторію.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "# npm — копіює пакети в node_modules кожного проєкту\nnpm install\n\n# pnpm — лінкує з єдиного content-addressable store\npnpm install\n\n# pnpm workspaces (монорепо) — pnpm-workspace.yaml\npackages:\n  - 'apps/*'\n  - 'packages/*'\n\n# Встановити залежність лише в один workspace-пакет\npnpm --filter @myorg/web add axios"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Import attributes (with JSON), module federation standards, better interop</span></div></div>"
        }
      ]
    },
    {
      "id": "generics-typescript-expanded",
      "title": "🔬 Generics (TypeScript) — EXPANDED",
      interviewQuestions: [
        {
          "question": "Навіщо потрібні generics, якщо можна просто типізувати параметр як <code>any</code> чи <code>unknown</code>?",
          "answer": "<code>any</code> вимикає перевірку типів взагалі — компілятор нічого не гарантує про зв'язок між вхідним і вихідним значенням. Generic (<code>function identity&lt;T&gt;(x: T): T</code>) зберігає цей зв'язок: TypeScript знає, що результат — той самий тип, що й вхід, і виявить помилку, якщо код спробує використати результат неправильно. <code>unknown</code> безпечніший за <code>any</code>, але вимагає звуження типу перед використанням і не зберігає зв'язок між входом/виходом функції."
        },
        {
          question: `Поясни Generics у TS.`,
          answer: `Type-параметри для перевикористовуваного коду. T розв'язується з аргументу, constraints — через extends.`,
        },
        {
          question: `Keyof як працює?`,
          answer: `Отримує union всіх ключів типу. keyof { name, age } = "name" | "age".`,
        },
        {
          question: `Conditional types для чого?`,
          answer: `T extends U ? A : B — типове розгалуження на основі умови.`,
        },
        {
          question: `Infer у conditional types?`,
          answer: `Ключове слово <code>infer</code> усередині conditional type дозволяє «захопити» й іменувати частину типу для використання у гілці true. Наприклад, <code>type ReturnType&lt;T&gt; = T extends (...args: any[]) =&gt; infer R ? R : never</code> — <code>infer R</code> захоплює тип результату функції.`,
        },
        {
          question: `Mapped types як їх використати?`,
          answer: `Трансформувати кожне поле типу: { [K in keyof T]: T[K] }, з додаванням prefix/suffix.`,
        },
        {
          question: `Generic defaults (TS 5.0)?`,
          answer: `&lt;T = string&gt; встановлює default тип, якщо не передано явно.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-ts2\">TS 2.x</span>\n            <span class=\"ver ver-ts4\">TS 4.x const types</span>\n            <span class=\"ver ver-ts5\">TS 5.x defaults ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 2</span><span class=\"changelog-text\">Basic generics, constraints, keyof</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 4</span><span class=\"changelog-text\">Const type params, variadic tuples, as const</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 5 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> Generic defaults, better inference, NoInfer</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Generics:</strong> Дозволяють писати перевикористовуваний код, зберігаючи типобезпеку.</p>\n            <p><strong>Type parameters розв'язуються через інференцію:</strong> TS узнає T з аргументу функції.</p>\n            <p><strong>Constraints (extends):</strong> Обмежувати які типи можуть бути T.</p>\n            <p><strong>Generic defaults:</strong> Default T = string якщо не передано.</p>\n          </div><h3 class=\"topic\">Generic Functions & Types <span class=\"tag tag-key\">KEY</span></h3><strong>Що це:</strong><T> — параметри типу. function identity</T><strong>Навіщо:</strong>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Generic function\nfunction identity<T>(val: T): T {\n  return val;\n}\n\n// Generic with default (TS 5.0)\nfunction process<T = string>(val: T): T {\n  return val;\n}\n\n// Generic type\ninterface Box<T> {\n  content: T;\n  getValue(): T;\n}\n\n// Generic class\nclass Stack<T> {\n  #items: T[] = [];\n  push(v: T) { this.#items.push(v); }\n  pop(): T | undefined { return this.#items.pop(); }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Generic Constraints (extends)</h3><strong>Що це:</strong><T extends string> — T може бути тільки string. </T><strong>Навіщо:</strong>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// T має мати length\nfunction getLength<T extends { length: number }>(val: T) {\n  return val.length;\n}\n\n// T має бути string | number\nfunction process<T extends string | number>(val: T): T {\n  return val;\n}\n\n// T повинно бути key of U\nfunction getProperty<U, K extends keyof U>(obj: U, key: K): U[K] {\n  return obj[key];\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">keyof, typeof, Conditional Types</h3><p><strong>Що це:</strong> keyof T — об'єднання ключів типу. typeof value — тип значення. T extends U ? A : B — умовний тип. <strong>Навіщо:</strong> Advanced type manipulation. Meta-programming.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// keyof — отримати ключі\ntype Keys<T> = keyof T;\ntype UserKeys = Keys<{ name: string; age: number }>;\n// \"name\" | \"age\"\n\n// typeof — отримати тип значення\nconst config = { port: 3000, debug: true };\ntype ConfigType = typeof config;\n// { port: number; debug: boolean }\n\n// Conditional types — T extends U ? A : B\ntype IsString<T> = T extends string ? true : false;\ntype Test = IsString<\"hello\">; // true"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Infer — Розпаковування типів</h3><strong>Що це:</strong><strong>Навіщо:</strong>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Отримати тип з Promise<T>\ntype Unwrap<T> = T extends Promise<infer U> ? U : T;\ntype A = Unwrap<Promise<string>>; // string\n\n// Отримати return type з функції\ntype RetVal<F> = F extends (...args: any[]) => infer R ? R : never;\ntype X = RetVal<() => number>; // number\n\n// Розпакувати array element type\ntype ElementOf<T> = T extends (infer E)[] ? E : never;"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Mapped Types — { [K in keyof T]: ... }</h3><strong>Що це:</strong><strong>Навіщо:</strong>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Зробити всі поля readonly\ntype Readonly<T> = {\n  readonly [K in keyof T]: T[K];\n};\n\n// Зробити всі поля optional\ntype Partial<T> = {\n  [K in keyof T]?: T[K];\n};\n\n// Додати префікс до всіх ключів\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у TS 6+</div><div class=\"changelog-row\"><span class=\"chver\">TS 6</span><span class=\"changelog-text\">Generic constraint inference, pattern matching for types</span></div></div>"
        }
      ]
    },
    {
      "id": "utility-types-typescript-expanded",
      "title": "🛠️ Utility Types (TypeScript) — EXPANDED",
      interviewQuestions: [
        {
          "question": "Чим <code>Partial&lt;T&gt;</code> відрізняється від <code>Required&lt;T&gt;</code>, і для якого типового сценарію кожен із них?",
          "answer": "<code>Partial&lt;T&gt;</code> робить усі поля типу необов'язковими — типовий кейс: об'єкт із даними для часткового оновлення (PATCH-запит, форма редагування, де не всі поля змінюються). <code>Required&lt;T&gt;</code> — навпаки, робить усі поля обов'язковими, навіть якщо в оригінальному типі вони були опціональними — корисно, коли потрібно гарантувати, що об'єкт повністю заповнений перед відправкою (наприклад, після валідації форми)."
        },
        {
          "question": "Як побудований <code>Pick&lt;T, K&gt;</code> «під капотом» через mapped types?",
          "answer": "<code>Pick&lt;T, K extends keyof T&gt;</code> реалізований приблизно як <code>{ [P in K]: T[P] }</code> — mapped type, що ітерується по union-типу ключів <code>K</code> і для кожного бере відповідний тип поля з <code>T</code>. Розуміння цього патерну дозволяє писати власні utility types (наприклад, <code>Nullable&lt;T&gt;</code> чи <code>DeepPartial&lt;T&gt;</code>) замість покладання лише на вбудовані."
        },
        {
          question: `Поясни Partial та Required.`,
          answer: `Partial робить поля optional (?), Required робить обов'язковими. Inverse операції.`,
        },
        {
          question: `Як Pick відрізняється від Omit?`,
          answer: `Pick: вибрати поля. Omit: вилучити поля. Обернені операції.`,
        },
        {
          question: `Exclude vs Extract у union?`,
          answer: `Exclude видаляє членів, Extract залишає членів. Фільтрування union типів.`,
        },
        {
          question: `Record vs Map — що обрати?`,
          answer: `Record/object: фіксована форма, JSON-серіалізація, читання за відомим ключем. Map: часті add/delete, не-string ключі, .size та ітерація. Record&lt;Union, V&gt; ще й перевіряє повноту ключів.`,
        },
        {
          question: `Record&lt;string, V&gt; чи index signature?`,
          answer: `Це те саме (Record — цукор над mapped type). Обережно: доступ за неіснуючим ключем дає V, а не undefined — рятує noUncheckedIndexedAccess.`,
        },
        {
          question: `ReturnType для function overloads?`,
          answer: `ReturnType ловить першу перевантаження. Для всіх потрібна це/типів.`,
        },
        {
          question: `DeepReadonly для API contracts?`,
          answer: `Рекурсивно readonly всі вложені поля. Для immutable data structures.`,
        },
        {
          question: `Template Literal Types у генерації ключів?`,
          answer: `Капіталізація, префікси/суфікси. Сетери/гетери автоматично.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-ts2\">TS 2.1</span>\n            <span class=\"ver ver-ts3\">TS 3.0+</span>\n            <span class=\"ver ver-ts5\">TS 5.x ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 2</span><span class=\"changelog-text\">Partial, Readonly, Record, Pick, Omit</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 3</span><span class=\"changelog-text\">Exclude, Extract, ReturnType, InstanceType</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 5 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> NoInfer, const type params</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Utility Types:</strong> Вбудовані TS типи для типових трансформацій.</p>\n            <p><strong>DRY принцип:</strong> Не копіюй типи, використовуй mapping.</p>\n          </div><h3 class=\"topic\">Основні Utility Types <span class=\"tag tag-key\">KEY</span></h3><strong>Що це:</strong><T>, Readonly</T><T>, Omit</T><strong>Навіщо:</strong><div class=\"table-wrap\">\n            <table>\n              <tr><th>Type</th><th>Синтаксис</th><th>Що робить</th><th>Приклад</th></tr>\n              <tr><td>Partial</td><td>Partial&lt;T&gt;</td><td>Всі поля опціональні (?:)</td><td>Partial&lt;User&gt; → name?, age?</td></tr>\n              <tr><td>Required</td><td>Required&lt;T&gt;</td><td>Всі поля обов'язкові</td><td>Required&lt;Partial&lt;User&gt;&gt;</td></tr>\n              <tr><td>Readonly</td><td>Readonly&lt;T&gt;</td><td>Всі поля readonly</td><td>Readonly&lt;User&gt;</td></tr>\n              <tr><td>Pick</td><td>Pick&lt;T, K&gt;</td><td>Вибрати поля K</td><td>Pick&lt;User, \"name\"&gt;</td></tr>\n              <tr><td>Omit</td><td>Omit&lt;T, K&gt;</td><td>Вилучити поля K</td><td>Omit&lt;User, \"password\"&gt;</td></tr>\n              <tr><td>Exclude</td><td>Exclude&lt;T, U&gt;</td><td>Вилучити union U з T</td><td>Exclude&lt;A|B|C, B&gt; → A|C</td></tr>\n              <tr><td>Extract</td><td>Extract&lt;T, U&gt;</td><td>Залишити тільки U з T</td><td>Extract&lt;A|B|C, B&gt; → B</td></tr>\n              <tr><td>Record</td><td>Record&lt;K, V&gt;</td><td>Об'єкт з ключами K та значеннями V</td><td>Record&lt;\"a\"|\"b\", number&gt;</td></tr>\n              <tr><td>ReturnType</td><td>ReturnType&lt;F&gt;</td><td>Тип повернення функції F</td><td>ReturnType&lt;() => string&gt; → string</td></tr>\n              <tr><td>Parameters</td><td>Parameters&lt;F&gt;</td><td>Масив параметрів функції F</td><td>Parameters&lt;(x: string) => void&gt;</td></tr>\n              <tr><td>ThisType</td><td>ThisType&lt;T&gt;</td><td>Явно встановити this тип</td><td>Мікс для об'єктів</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Practical Examples</h3><p><strong>Що це:</strong> Real-world generics у кодзе. API responses, form handling, store. <strong>Навіщо:</strong> Практика для розуміння generics в дійсному коді.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Pick: вибір полів\ntype User = { name: string; email: string; password: string };\ntype UserPreview = Pick<User, 'name' | 'email'>; // { name; email }\n\n// Omit: вилучення полів\ntype PublicUser = Omit<User, 'password'>; // { name; email }\n\n// ReturnType: тип повернення\nfunction getData(): Promise<string> {}\ntype Data = ReturnType<typeof getData>; // Promise<string>\n\n// Record: об'єкт з фіксованими ключами\ntype Permissions = Record<'read' | 'write' | 'delete', boolean>;\n// { read: boolean; write: boolean; delete: boolean }"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Record&lt;K, V&gt; — детально та коли застосовувати <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> <code>Record&lt;K, V&gt;</code> — об'єкт, де всі ключі мають тип <code>K</code>, а всі значення — тип <code>V</code>. Це цукор над mapped type: <code>{ [P in K]: V }</code>. <strong>Навіщо:</strong> Типобезпечні словники/мапи та таблиці «ключ → значення», особливо коли множина ключів відома наперед.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// 1) Відкритий словник — ключі НЕ відомі наперед\nconst scores: Record<string, number> = { ihor: 5, olha: 12 };\n// те саме, що index signature:\nconst scores2: { [key: string]: number } = { ... };\n\n// 2) Закритий словник — ключі ВІДОМІ (union) → TS перевіряє повноту\ntype Section = 'angular' | 'react' | 'js';\nconst accent: Record<Section, string> = {\n  angular: '#dd0031',\n  react:   '#61dafb',\n  js:      '#f7df1e', // ❌ забув ключ або додав зайвий → помилка компіляції\n};"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"table-wrap\">\n            <table>\n              <tr><th>Підхід</th><th>Коли застосовувати</th><th>Переваги</th><th>Мінуси</th></tr>\n              <tr><td><strong>Record&lt;Union, V&gt;</strong></td><td>Ключі відомі наперед (skip/states/секції)</td><td>Перевірка повноти, автокомпліт ключів</td><td>Ключі мають бути статичними</td></tr>\n              <tr><td>Record&lt;string, V&gt; / index signature</td><td>Динамічні ключі (id, кеш, лічильники)</td><td>Просто, гнучко</td><td>Доступ дає V навіть для неіснуючих ключів</td></tr>\n              <tr><td><strong>Map&lt;K, V&gt;</strong></td><td>Часті add/delete, не-string ключі, важливий порядок/розмір</td><td>.size, ітерація, будь-які ключі, краще для частих мутацій</td><td>Не серіалізується в JSON напряму, важчий синтаксис</td></tr>\n              <tr><td><strong>interface / type</strong></td><td>Ключі різнорідні, значення РІЗНИХ типів</td><td>Кожне поле — свій тип</td><td>Багатослівно для однотипних значень</td></tr>\n            </table>\n          </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Record vs Map — головна евристика\n// Record/object: фіксована «форма», JSON, читання за відомим ключем\nconst config: Record<Section, boolean> = { angular: true, react: false, js: true };\n\n// Map: колекція, що часто росте/зменшується, ключ може бути об'єктом\nconst cache = new Map<HTMLElement, number>();\ncache.set(el, 1);  cache.size;  // зручні методи, будь-який тип ключа"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-warn\">\n            <strong>⚠️ Пастка:</strong> <code>Record&lt;string, V&gt;</code> вважає, що будь-який ключ існує — <code>scores['nope']</code> має тип <code>number</code>, а в рантаймі це <code>undefined</code>. Для безпеки вмикай <code>noUncheckedIndexedAccess</code> у tsconfig — тоді тип стане <code>number | undefined</code>.\n          </div><h3 class=\"topic\">Advanced Patterns</h3><p><strong>Що це:</strong> Higher-order types, type-level функції, distributive conditionals. <strong>Навіщо:</strong> Advanced meta-programming. Rare але powerful.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Exclude для фільтрування union\ntype NonUndefined<T> = Exclude<T, undefined>;\ntype X = NonUndefined<string | undefined>; // string\n\n// Extract для отримання конкретного типу\ntype OnlyFunctions<T> = Extract<T, Function>;\ntype Y = OnlyFunctions<string | (() => void)>; // () => void\n\n// InstanceType: отримати instance тип з constructor\ntype UserInstance = InstanceType<typeof User>;"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Deep Readonly & Template Literal Types</h3><p><strong>Що це:</strong> Recursively readonly. Template literal типи для строк. <strong>Навіщо:</strong> Immutability. String literal types.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Глибокий Readonly для nested об'єктів\ntype DeepReadonly<T> = {\n  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];\n};\nconst config: DeepReadonly<Config> = // Все глибоко readonly\n\n// Template Literal Types (TS 4.4+)\ntype Setters<T> = {\n  [K in keyof T as `set${Capitalize<string & K>}`]: (v: T[K]) => void\n};\ntype UserSetters = Setters<{ name: string }>; // { setName: (v) => void }"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Оптимізація:</strong> Використовуй Utility Types щоб уникнути дублювання. Pick/Omit краще за ручне переписування типів.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у TS 6+</div><div class=\"changelog-row\"><span class=\"chver\">TS 6</span><span class=\"changelog-text\">Better Utility Type inference, stricter template literal types</span></div></div>"
        }
      ]
    },
    {
      "id": "error-handling-trycatchfinally-custom-errors",
      "title": "⚠️ Error Handling — try/catch/finally & Custom Errors",
      interviewQuestions: [
        {
          "question": "Навіщо створювати власні класи помилок (<code>class ValidationError extends Error</code>) замість того, щоб завжди кидати звичайний <code>Error</code>?",
          "answer": "Кастомний клас помилки дозволяє розрізняти типи помилок через <code>instanceof</code> у <code>catch</code>-блоці й реагувати по-різному (наприклад, показати валідаційне повідомлення користувачу, але залогувати й повторити мережеву помилку). Без цього доводиться парсити текст повідомлення рядком, що крихко й ненадійно."
        },
        {
          "question": "Чи виконується блок <code>finally</code>, якщо в <code>try</code> стався <code>return</code>, а в <code>catch</code> — ще один <code>return</code>?",
          "answer": "Так, <code>finally</code> виконується завжди — навіть якщо <code>try</code> чи <code>catch</code> вже викликали <code>return</code>. Якщо <code>finally</code> сам містить <code>return</code>, він <strong>перекриє</strong> будь-яке значення, повернуте з <code>try</code>/<code>catch</code> — тонкий і небезпечний edge case, тому <code>return</code> у <code>finally</code> вважається антипатерном."
        },
        {
          question: `Різниця try/catch та Promise.catch?`,
          answer: `try/catch для синхронного коду і async/await. Promise.catch для Promise chains.`,
        },
        {
          question: `Для чого finally блок?`,
          answer: `Cleanup код що виконується завжди. Закриття файлів, відпуск ресурсів, clear timers.`,
        },
        {
          question: `Як перехопити throw у catch?`,
          answer: `instanceof для type checking. Розрізняй Error types (TypeError, RangeError).`,
        },
        {
          question: `Error.cause для чого потрібен?`,
          answer: `Chain контекст помилок. Оригінальна помилка у причині для логування.`,
        },
        {
          question: `unknown vs any у catch?`,
          answer: `unknown безпечніше. Не можеш звертатись до properties без type guard.`,
        },
        {
          question: `Custom Error класи у production?`,
          answer: `Так! Розрізняй ValidationError, NotFoundError, DatabaseError для lepшої обробки.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5</span>\n            <span class=\"ver ver-es2019\">ES2019</span>\n            <span class=\"ver ver-es2022\">ES2022 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">try/catch/finally, throw, Error constructor</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2019</span><span class=\"changelog-text\">Error.toString(), stack traces</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2022 ✦</span><span class=\"changelog-text\">Error.cause, optional catch binding</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Error Handling:</strong> Механізм try/catch для контролю вихідних помилок.</p>\n            <p><strong>Best Practice:</strong> Розрізняй типи помилок, використовуй finally для cleanup.</p>\n          </div><h3 class=\"topic\">try/catch/finally Structure <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> try { } catch (e) { } finally { }. finally виконується ЗАВЖДИ (навіть при return у catch). <strong>Навіщо:</strong> Cleanup. Resource management (close file, disconnect).</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Базовий блок try/catch/finally\ntry {\n  // Код що може викинути помилку\n  riskyOperation();\n} catch (error) {\n  // Обробка помилки\n  console.error(error.message);\n} finally {\n  // Завжди виконується (cleanup)\n  cleanup();\n}\n\n// ES2019: Optional catch binding (без 'error' якщо не потрібен)\ntry {\n  someCode();\n} catch {\n  // error не використовується\n  console.log('Помилка сталась');\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Error Types & instanceof Checking</h3><p><strong>Що це:</strong> Error, TypeError, ReferenceError, SyntaxError, RangeError. instanceof дозволяє перевірити тип. <strong>Навіщо:</strong> Різна обробка для різних errors. Специфічне recovery.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Вбудовані типи помилок\ntry {\n  throw new TypeError('Expected string');\n} catch (e) {\n  if (e instanceof TypeError) {\n    console.log('Type error:', e.message);\n  } else if (e instanceof RangeError) {\n    console.log('Range error:', e.message);\n  } else if (e instanceof SyntaxError) {\n    console.log('Syntax error');\n  }\n}\n\n// Вбудовані типи: Error, TypeError, ReferenceError, SyntaxError\n// RangeError, EvalError, URIError"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Custom Error Classes & Error.cause</h3><p><strong>Що це:</strong> class MyError extends Error { }. Error.cause (ES2022) — link to original error. <strong>Навіщо:</strong> Domain-specific errors. Error chaining для debugging.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Custom Error розширенням\nclass ValidationError extends Error {\n  constructor(message, fieldName) {\n    super(message);\n    this.name = 'ValidationError';\n    this.fieldName = fieldName;\n    Error.captureStackTrace(this, this.constructor);\n  }\n}\n\n// ES2022: Error.cause для контексту (cause chain)\ntry {\n  fetchData();\n} catch (originalError) {\n  throw new Error('Failed to load data', {\n    cause: originalError // Контекст оригінальної помилки\n  });\n}\n\n// Доступ до cause\ntry {\n  doSomething();\n} catch (e) {\n  console.error(e.message, e.cause); // Повна ланцюг помилок\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Async Error Handling & unknown Type</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Async/await з try/catch\nasync function loadUser(id) {\n  try {\n    const response = await fetch(`/api/user/${id}`);\n    if (!response.ok) throw new Error('Not found');\n    return await response.json();\n  } catch (error) {\n    // error теоретично може бути any\n    const msg = error instanceof Error ? error.message : 'Unknown';\n    console.error(msg);\n  }\n}\n\n// TS 4.0+: unknown у catch (краще за any)\ntry {\n  risky();\n} catch (error: unknown) {\n  // Не можемо обращаться до properties без type guard\n  if (error instanceof Error) {\n    console.log(error.message); // Безпечно\n  }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-warn\">\n            <strong>Обережно:</strong> catch binding у JS/TS теоретично може ловити not-Error об'єкти. Завжди перевіри instanceof Error перед доступом до properties.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Better error stack traces, Error.stackTraceLimit improvements</span></div></div>"
        }
      ]
    },
    {
      "id": "iterators-generators-yield-async-generators",
      "title": "🔄 Iterators & Generators — yield & Async Generators",
      interviewQuestions: [
        {
          "question": "Що таке ітераційний протокол (<code>Symbol.iterator</code>), і як він дозволяє власним об'єктам працювати з <code>for...of</code>?",
          "answer": "Об'єкт вважається ітерованим, якщо має метод <code>[Symbol.iterator]</code>, що повертає ітератор — об'єкт із методом <code>next()</code>, який на кожен виклик повертає <code>{ value, done }</code>. Реалізувавши цей метод на власному класі (наприклад, кастомній колекції), можна використовувати <code>for...of</code>, spread-оператор і деструктуризацію так само природно, як із масивами."
        },
        {
          "question": "Чим генератор (<code>function*</code>) простіший за ручну реалізацію ітератора через <code>Symbol.iterator</code>?",
          "answer": "Генератор автоматично реалізує весь протокол ітератора — виклик <code>yield</code> призупиняє виконання й повертає значення, а стан функції (локальні змінні, позиція виконання) зберігається між викликами <code>next()</code> без ручного відстеження прапорців чи індексів, які довелось би писати вручну при реалізації <code>next()</code> напряму."
        },
        {
          question: `Iterator protocol та Symbol.iterator?`,
          answer: `Об'єкт з [Symbol.iterator]() повинен мати .next() метод. for...of використовує це.`,
        },
        {
          question: `Функція generator відрізняється від звичайної?`,
          answer: `function* з yield. Повертає iterator, не результат. Лінива передача значень.`,
        },
        {
          question: `yield.send() як працює?`,
          answer: `Передача значень у generator. g.next(5) встановлює a = 5 для yield a.`,
        },
        {
          question: `Async generators для чого?`,
          answer: `Потокова обробка async операцій. for await...of замість while + Promise.`,
        },
        {
          question: `yield* для делегування?`,
          answer: `Yields всі значення іншого generator. Композиція generators.`,
        },
        {
          question: `Generator.throw() та return()?`,
          answer: `throw вкидає помилку. return() завершує generator та return значення.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es6\">ES6</span>\n            <span class=\"ver ver-es2018\">ES2018</span>\n            <span class=\"ver ver-es2024\">ES2024 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Iterator protocol, for...of, Generator functions (function*)</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2018</span><span class=\"changelog-text\">Async iterators, for await...of, async generators</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2024 ✦</span><span class=\"changelog-text\">Better async iterator pooling, performance improvements</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Iterator Protocol:</strong> Об'єкти з .next() методом для поступової передачі значень.</p>\n            <p><strong>Generator Functions:</strong> function* з yield для лінивого обчислення.</p>\n          </div><h3 class=\"topic\">Iterator Protocol <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Iterator має методи next() який повертає { value, done }. Iterable має [Symbol.iterator](). <strong>Навіщо:</strong> for...of loops потребують iterator. Кастомні ітеровані об'єкти.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Ручна реалізація iterator\nconst iterator = {\n  next() {\n    return { value: 1, done: false };\n  }\n};\n\n// Об'єкт з [Symbol.iterator] є iterable\nconst arr = [1, 2, 3];\nconst iter = arr[Symbol.iterator](); // Отримати iterator\nconsole.log(iter.next()); // { value: 1, done: false }\nconsole.log(iter.next()); // { value: 2, done: false }\nconsole.log(iter.next()); // { value: 3, done: false }\nconsole.log(iter.next()); // { value: undefined, done: true }"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Generator Functions & yield</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Базовий generator\nfunction* counter() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconst gen = counter();\nconsole.log(gen.next()); // { value: 1, done: false }\nconsole.log(gen.next()); // { value: 2, done: false }\n\n// Generator у for...of циклі\nfor (const val of counter()) {\n  console.log(val); // 1, 2, 3\n}\n\n// Передача значень у yield.send()\nfunction* sum() {\n  const a = yield; // Чекає на .next(value)\n  const b = yield;\n  yield a + b;\n}\nconst g = sum();\ng.next(); // { value: undefined, done: false }\ng.next(5); // a = 5, { value: undefined, done: false }\ng.next(3); // b = 3, { value: 8, done: false }"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Async Generators & for await...of</h3><p><strong>Що це:</strong> async function* з await yield. Повертає AsyncIterator. for await...of. <strong>Навіщо:</strong> Async streams. API polling. Real-time data.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Async generator: function* + async\nasync function* fetchPages() {\n  for (let page = 1; page <= 3; page++) {\n    const response = await fetch(`/api/page/${page}`);\n    const data = await response.json();\n    yield data; // Поступова передача\n  }\n}\n\n// for await...of для async iterables\nfor await (const page of fetchPages()) {\n  console.log(page); // Обробка кожної сторінки\n}\n\n// Generator делегування (yield*)\nfunction* combined() {\n  yield* counter(); // Делегувати весь generator\n  yield 'end';\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Використання:</strong> Generators для лінивого обчислення, async generators для потокової обробки даних від API.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Pipeline operator for generators, better async iterator composition</span></div></div>"
        }
      ]
    },
    {
      "id": "destructuring-array-object-patterns",
      "title": "📦 Destructuring — Array & Object Patterns",
      interviewQuestions: [
        {
          "question": "Як деструктуризація з дефолтними значеннями допомагає уникнути перевірок <code>undefined</code> для параметрів функції?",
          "answer": "<code>function fn({ limit = 10, offset = 0 } = {})</code> одразу задає значення за замовчуванням для кожного поля об'єкта-параметра і для самого об'єкта (якщо функцію викликали взагалі без аргументів) — це замінює кілька рядків ручних перевірок <code>if (options.limit === undefined) ...</code> одним декларативним виразом у сигнатурі функції."
        },
        {
          question: `Array destructuring та пропуск елементів?`,
          answer: `Пусті комами: [a, , c]. Пропускає другий елемент.`,
        },
        {
          question: `Rest properties (...rest) в об'єктах?`,
          answer: `Зібрати решту ключів. { id, ...rest } = user: rest має все крім id.`,
        },
        {
          question: `Rename при destructuring?`,
          answer: `{ name: nameAlias } = obj. nameAlias = obj.name (переім'яновування).`,
        },
        {
          question: `Default values та undefined?`,
          answer: `{ x = 10 } = { x: undefined }; x = 10 (undefined активує default).`,
        },
        {
          question: `Nested destructuring синтаксис?`,
          answer: `{ user: { name, address: { city } } } = data. Глибокі pattern matching.`,
        },
        {
          question: `Function params із destructuring?`,
          answer: `function({name, age = 25}) {}. API clarity, можна помилитись параметри.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es6\">ES6</span>\n            <span class=\"ver ver-es2018\">ES2018</span>\n            <span class=\"ver ver-es2024\">ES2024 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Array and Object destructuring, default values</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2018</span><span class=\"changelog-text\">Rest properties (...rest) for objects</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2024 ✦</span><span class=\"changelog-text\">Computed keys in destructuring patterns</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Destructuring:</strong> Синтаксис для розпакування значень з масивів та об'єктів.</p>\n            <p><strong>Benefit:</strong> Більш компактний код, легше читається.</p>\n          </div><h3 class=\"topic\">Array Destructuring <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Базовий array destructuring\nconst [a, b, c] = [1, 2, 3];\nconsole.log(a, b, c); // 1 2 3\n\n// Пропуск елементів\nconst [first, , third] = [1, 2, 3];\nconsole.log(first, third); // 1 3\n\n// Rest element (...rest)\nconst [head, ...tail] = [1, 2, 3, 4];\nconsole.log(head, tail); // 1 [2, 3, 4]\n\n// Default values\nconst [x = 10, y = 20] = [1];\nconsole.log(x, y); // 1 20\n\n// Swap без temp variable\n[a, b] = [b, a]; // a та b обмінялись"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Object Destructuring</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Базовий object destructuring\nconst { name, age } = { name: 'John', age: 30 };\nconsole.log(name, age); // 'John' 30\n\n// Rename за допомогою ':'\nconst { name: personName, age: personAge } = user;\nconsole.log(personName); // 'John'\n\n// Default values\nconst { status = 'active', role = 'user' } = {};\nconsole.log(status, role); // 'active' 'user'\n\n// Rest properties (ES2018)\nconst { id, ...rest } = { id: 1, name: 'John', age: 30 };\nconsole.log(rest); // { name: 'John', age: 30 }\n\n// Nested destructuring\nconst { user: { name, address: { city } } } = data;\nconsole.log(name, city);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Function Parameters & Advanced Patterns</h3><p><strong>Що це:</strong> function({ name, age }) { }. Destructure parameters. <strong>Навіщо:</strong> чіткі параметри. Optional params з default.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Destructuring у function parameters\nfunction displayUser({ name, age = 25 }) {\n  console.log(`${name}, age ` + age);\n}\ndisplayUser({ name: 'Alice' }); // 'Alice, age 25'\n\n// Array destructuring у parameters\nfunction sum([a, b]) {\n  return a + b;\n}\nsum([5, 3]); // 8\n\n// Computed property names (ES2024+)\nconst key = 'name';\nconst { [key]: value } = { name: 'John' };\nconsole.log(value); // 'John'\n\n// Destructuring з default до undefined\nconst { missing = 'default' } = {};\n// missing = 'default' (undefined змінює default)"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Best Practice:</strong> Використовуй destructuring у function params для API clarity. Явне показує які поля очікуються.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Pattern matching improvements, better nested destructuring</span></div></div>"
        }
      ]
    },
    {
      "id": "design-patterns-observer-factory-singleton-proxy",
      "title": "🏗️ Design Patterns — Observer, Factory, Singleton, Proxy",
      interviewQuestions: [
        {
          "question": "Наведи приклад, де JS-екосистема сама використовує патерн Observer, навіть якщо розробник не пише його вручну.",
          "answer": "DOM Events (<code>addEventListener</code>) — класичний Observer: слухачі підписуються на подію, диспетчер (елемент) сповіщає всіх підписників при її виникненні, не знаючи наперед, скільки їх і хто вони. RxJS Observable — той самий патерн, формалізований у бібліотеку з операторами для комбінування й трансформації потоків подій."
        },
        {
          "question": "Чому Singleton вважається антипатерном у сучасному фронтенд-коді, попри свою простоту?",
          "answer": "Singleton створює приховану глобальну залежність, яку важко замінити в тестах (мокнути) чи ізолювати між кількома незалежними інстансами застосунку (наприклад, у SSR, де кожен запит має отримати власний стан, а не ділити один глобальний об'єкт між усіма користувачами). Явна ін'єкція залежності (через DI-контейнер чи просто параметр) дає той самий «єдиний екземпляр там, де треба», але без прихованого глобального стану."
        },
        {
          question: `Observer pattern для чого?`,
          answer: `Decoupling. Subject не знає деталей observers. Сповіщення при зміні.`,
        },
        {
          question: `Factory vs Constructor?`,
          answer: `Factory може логіку створення, вибір підкласів. Для складного об'єктного створення.`,
        },
        {
          question: `Singleton antipattern?`,
          answer: `Так, ускладнює тестування. Для logger/config ок, для бізнес-логіки - краще DI.`,
        },
        {
          question: `Strategy pattern для чого?`,
          answer: `Runtime вибір алгоритму. Платежні системи, сортування, compression.`,
        },
        {
          question: `Decorator vs Inheritance?`,
          answer: `Decorator більш гнучкий, дозволяє composition. Динамічне додання функціональності.`,
        },
        {
          question: `Proxy для валідації/логування?`,
          answer: `Так! Перехоплення set/get. Validation proxy, logging proxy, caching proxy.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5+</span>\n            <span class=\"ver ver-es6\">ES6</span>\n            <span class=\"ver ver-es2022\">ES2022 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5+</span><span class=\"changelog-text\">Closure-based patterns, IIFE for modules</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Classes, Symbols, WeakMap for private data</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2022 ✦</span><span class=\"changelog-text\">Private fields (#), static blocks</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Design Patterns:</strong> Повторювальні рішення для типових задач.</p>\n            <p><strong>Benefit:</strong> Код легше читається, maintainable, масштабується.</p>\n          </div><h3 class=\"topic\">Observer Pattern <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Subject + Observers. Subject notify observers при зміні. <strong>Навіщо:</strong> Event handling. MVC/MVVM. Reactive programming.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Observer: Subject сповіщає Observers про зміни\nclass Subject {\n  constructor() {\n    this.observers = [];\n  }\n  attach(observer) {\n    this.observers.push(observer);\n  }\n  detach(observer) {\n    this.observers = this.observers.filter(obs => obs !== observer);\n  }\n  notify(data) {\n    this.observers.forEach(obs => obs.update(data));\n  }\n}\n\nclass Observer {\n  update(data) {\n    console.log('Observer notified:', data);\n  }\n}\n\nconst subject = new Subject();\nconst obs1 = new Observer();\nsubject.attach(obs1);\nsubject.notify({ event: 'update' }); // Оповіщення всіх"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Factory & Singleton Patterns</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Factory: функція/метод для створення об'єктів\nclass DatabaseFactory {\n  static create(type) {\n    switch (type) {\n      case 'mysql': return new MySQLDB();\n      case 'mongo': return new MongoDB();\n      default: throw new Error('Unknown DB');\n    }\n  }\n}\nconst db = DatabaseFactory.create('mysql');\n\n// Singleton: тільки один instance\nclass Database {\n  static #instance = null;\n  constructor() {\n    if (Database.#instance) return Database.#instance;\n    Database.#instance = this;\n  }\n  static getInstance() {\n    return Database.#instance || new Database();\n  }\n}\nconst db1 = Database.getInstance();\nconst db2 = Database.getInstance();\nconsole.log(db1 === db2); // true"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Strategy & Decorator Patterns</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Strategy: вибір алгоритму у runtime\nclass PaymentProcessor {\n  constructor(strategy) {\n    this.strategy = strategy;\n  }\n  process(amount) {\n    return this.strategy.pay(amount);\n  }\n}\n\nclass CreditCardStrategy {\n  pay(amount) { return `Credit card: ${amount}`; }\n}\nclass PayPalStrategy {\n  pay(amount) { return `PayPal: ${amount}`; }\n}\n\nconst processor = new PaymentProcessor(new CreditCardStrategy());\nprocessor.process(100); // 'Credit card: 100'\n\n// Decorator: додання функціональності до об'єкта\nclass CoffeeMachine {\n  brew() { return 'Coffee'; }\n}\n\nclass SugarDecorator {\n  constructor(coffee) { this.coffee = coffee; }\n  brew() { return this.coffee.brew() + ' + Sugar'; }\n}\n\nlet coffee = new CoffeeMachine();\ncoffee = new SugarDecorator(coffee); // Обгортання\nconsole.log(coffee.brew()); // 'Coffee + Sugar'"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Module & Proxy Patterns</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Module: інкапсуляція та приватні данні (IIFE)\nconst Module = (() => {\n  let privateData = 'secret';\n  return {\n    getPublic: () => return 'public',\n    getPrivate: () => return privateData\n  };\n})();\n\n// Proxy: перехоплення операцій на об'єкті\nconst user = { name: 'John', age: 30 };\nconst proxyUser = new Proxy(user, {\n  get(target, prop) {\n    console.log(`Reading ${prop}`);\n    return target[prop];\n  },\n  set(target, prop, value) {\n    console.log(`Setting ${prop} = ${value}`);\n    target[prop] = value;\n    return true;\n  }\n});\nproxyUser.name = 'Jane'; // 'Setting name = Jane'"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Практика:</strong> Observer для event handling, Factory для об'єктного створення, Singleton для shared resources (БД, Logger).\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Better pattern matching syntax, advanced decorator proposals</span></div></div>"
        }
      ]
    },
    {
      "id": "built-in-objects-map-set-array-object-methods",
      "title": "⚙️ Built-in Objects — Map, Set, Array, Object Methods",
      interviewQuestions: [
        {
          "question": "Коли варто використовувати <code>Map</code> замість звичайного об'єкта <code>{}</code> як словник?",
          "answer": "<code>Map</code> дозволяє використовувати ключі будь-якого типу (не лише рядки/символи, як в об'єкта — можна об'єкт чи функцію як ключ), зберігає порядок вставки гарантовано, має властивість <code>.size</code> без ручного підрахунку, і не має ризику колізії з успадкованими властивостями прототипу (<code>toString</code>, <code>constructor</code>), на відміну від <code>{}</code>."
        },
        {
          "question": "Чим <code>Set</code> корисний для дедуплікації масиву, і чи зберігає він порядок елементів?",
          "answer": "<code>[...new Set(array)]</code> — найкоротший спосіб отримати унікальні значення масиву, бо <code>Set</code> за визначенням не допускає дублікатів (порівняння через SameValueZero, схоже на <code>===</code>, але <code>NaN</code> вважається рівним <code>NaN</code>). Порядок ітерації зберігається — це порядок вставки, тобто перше входження кожного унікального значення."
        },
        {
          question: `Map vs Object у JS?`,
          answer: `Map: будь-які ключі, .size, ітерована. Object: швидше для малих, String/Symbol ключі.`,
        },
        {
          question: `WeakMap для чого?`,
          answer: `Слабкі посилання. Приватні дані в class (WeakMap для private fields), caching з GC.`,
        },
        {
          question: `Object.keys() для об'єкта vs Map.keys()?`,
          answer: `Object.keys повертає масив. Map.keys() повертає iterator.`,
        },
        {
          question: `Array.flatMap vs map+flat?`,
          answer: `flatMap ефективніше, один проход. flat для багаторівневого nesting.`,
        },
        {
          question: `Object.assign shallow vs deep clone?`,
          answer: `Object.assign shallow copy. Для deep clone: structuredClone() або JSON.parse(stringify()).`,
        },
        {
          question: `JSON.stringify з replacer?`,
          answer: `Filter поля при серіалізації. (key, value) => value.secret ? undefined : value.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5</span>\n            <span class=\"ver ver-es6\">ES6</span>\n            <span class=\"ver ver-es2019\">ES2019 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Object, Array, String methods (forEach, map, filter)</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Map, Set, WeakMap, WeakSet; Array.from(), Array.of()</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2019 ✦</span><span class=\"changelog-text\">flatMap, flat, Object.fromEntries</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Built-in Objects:</strong> Вбудовані типи та методи для маніпуляції даними.</p>\n            <p><strong>Map/Set:</strong> Більш гнучкі за Object для зберігання даних.</p>\n          </div><h3 class=\"topic\">Map vs Object <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Map: будь-які ключі, .size, ітерована, методи get/set/has. Object: рядки/symbol ключі, length property, з'явився раніше. <strong>Навіщо:</strong> Map для k-v зберігання з non-string keys.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Object: ключі завжди рядки/symbols\nconst obj = { name: 'John', 1: 'one' };\nconsole.log(Object.keys(obj)); // ['1', 'name'] - ключ 1 перетворюється на '1'\n\n// Map: будь-які ключі (об'єкти, числа, функції)\nconst map = new Map();\nmap.set(1, 'one');\nmap.set({ id: 1 }, 'obj');\nmap.set(Function, 'fn');\nconsole.log(map.size); // 3 (точна кількість)\n\n// Map методи\nmap.has(1); // true\nmap.get(1); // 'one'\nmap.delete(1); // true\nmap.clear(); // очистити всі\n\n// Ітерація\nfor (const [key, value] of map) {\n  console.log(key, value);\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Set, WeakMap, WeakSet <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> <code>Set</code> — унікальні значення; <code>WeakMap</code>/<code>WeakSet</code> — колекції зі <strong>слабкими</strong> посиланнями на ключі-об'єкти. <strong>Навіщо (weak):</strong> ключ, на який більше ніхто «сильно» не посилається, <strong>не блокує GC</strong> — запис зникає автоматично разом з об'єктом, тож вони не течуть пам'яттю.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th></th><th>Map</th><th>WeakMap</th></tr>\n              <tr><td>Ключі</td><td>будь-що</td><td>лише об'єкти</td></tr>\n              <tr><td>Тримає ключ від GC</td><td>так (strong)</td><td>ні (weak)</td></tr>\n              <tr><td>Ітерується / <code>.size</code></td><td>так</td><td>ні — не можна перелічити</td></tr>\n              <tr><td>Кейс</td><td>звичайний словник</td><td>метадані/кеш, «прив'язані» до об'єкта</td></tr>\n            </table>\n          </div><p><strong>Чому WeakMap не ітерується:</strong> вміст може зникнути будь-якої миті (GC), тож перелік був би недетермінованим — API навмисно його не дає.</p><p><strong>Коли брати:</strong> приватні дані інстанса, кеш обчислень за ключем-об'єктом, позначки «вже оброблено» для DOM-вузлів/об'єктів — без ризику витоку, коли об'єкт приберуть.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Set: унікальні значення (без дублікатів)\nconst set = new Set([1, 2, 2, 3]);\nconsole.log(set.size); // 3 (дублікат 2 вилучено)\nset.add(4);\nset.has(1); // true\n\n// WeakMap: ключі - об'єкти (слабкі посилання)\nconst weakMap = new WeakMap();\nlet obj = { id: 1 };\nweakMap.set(obj, 'data');\n// Коли obj видалено, запис у weakMap також видаляється (GC)\n\n// WeakSet: унікальні об'єкти (слабкі посилання)\nconst weakSet = new WeakSet();\nweakSet.add(obj);\nweakSet.has(obj); // true"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Array Methods — Essential Operations</h3><p><strong>Що це:</strong> map, filter, reduce, reduceRight, find, findIndex, flat, flatMap, at(). <strong>Навіщо:</strong> Functional programming. Transform arrays. Composition.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Transformation методи\nconst arr = [1, 2, 3, 4];\narr.map(x => x * 2); // [2, 4, 6, 8]\narr.filter(x => x > 2); // [3, 4]\narr.reduce((sum, x) => sum + x, 0); // 10\narr.flatMap(x => [x, x * 2]); // [1, 2, 2, 4, ...]\n\n// Search методи\narr.find(x => x > 2); // 3 (перший element)\narr.findIndex(x => x > 2); // 2 (індекс)\narr.indexOf(2); // 1\narr.includes(3); // true\n\n// Mutating методи (зміняють оригінальний масив)\narr.push(5); // додати в кінець\narr.pop(); // видалити з кінця\narr.shift(); // видалити з початку\narr.unshift(0); // додати в початок\narr.reverse(); // розвернути\narr.sort((a, b) => a - b); // сортувати"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Object Methods & JSON Handling</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Object методи для маніпуляції об'єктами\nconst user = { name: 'John', age: 30 };\nObject.keys(user); // ['name', 'age']\nObject.values(user); // ['John', 30]\nObject.entries(user); // [['name', 'John'], ['age', 30]]\n\n// Object.assign для merge\nObject.assign({}, user, { city: 'NYC' }); // { name, age, city }\n\n// Object.fromEntries (ES2019) - зворотне до entries\nObject.fromEntries([['name', 'John'], ['age', 30]]); // { name, age }\n\n// JSON операції\nJSON.stringify(user); // '{\"name\":\"John\",\"age\":30}'\nJSON.parse('{\"name\":\"John\",\"age\":30}'); // {name: 'John', age: 30}\n\n// JSON.stringify з replacer та space (pretty-print)\nJSON.stringify(user, null, 2); // красивий вивід"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-warn\">\n            <strong>Обережно:</strong> Object.assign не робить deep clone. Використовуй structuredClone() або lodash.cloneDeep() для глибокого клонування.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Record and Tuple types (immutable collections), better Map/Set composition</span></div></div>"
        }
      ]
    },
    {
      "id": "browser-apis-fetch-abortcontroller-intersectionobserver",
      "title": "🌐 Browser APIs — Fetch, AbortController, IntersectionObserver",
      interviewQuestions: [
        {
          "question": "Навіщо потрібен <code>AbortController</code> при роботі з <code>fetch</code>, і яку конкретну проблему він вирішує в React/Angular-компонентах?",
          "answer": "Без скасування запит, ініційований у компоненті, що розмонтувався (наприклад, користувач швидко перейшов на іншу сторінку), все одно завершується і намагається оновити стан вже неіснуючого компонента — попередження в консолі або витік пам'яті. <code>AbortController.signal</code>, переданий у <code>fetch</code>, дозволяє викликати <code>controller.abort()</code> у cleanup-функції ефекту й коректно скасувати незавершений запит."
        },
        {
          "question": "Чим <code>IntersectionObserver</code> кращий за ручне відстеження скролу (<code>scroll</code>-подія + обчислення <code>getBoundingClientRect</code>) для lazy-loading чи infinite scroll?",
          "answer": "<code>IntersectionObserver</code> асинхронний і не блокує головний потік — браузер сам ефективно обчислює перетин елемента з viewport, замість того щоб JS-код синхронно рахував геометрію на кожен <code>scroll</code>-івент (який може спрацьовувати десятки разів за секунду й змушувати layout thrashing при читанні <code>getBoundingClientRect</code>)."
        },
        {
          question: `Fetch vs XMLHttpRequest?`,
          answer: `Fetch Promise-based, cleaner API, краще з async/await. XHR legacy.`,
        },
        {
          question: `AbortController для чого?`,
          answer: `Скасування in-flight requests. Race conditions, cleanup при unmount (React).`,
        },
        {
          question: `requestAnimationFrame vs setTimeout?`,
          answer: `rAF синхронізує з refresh rate браузера. Для анімацій краще rAF.`,
        },
        {
          question: `IntersectionObserver performance?`,
          answer: `Ефективніше за scroll listener. Нативно оптимізовано браузером.`,
        },
        {
          question: `Web Workers для фонових операцій?`,
          answer: `Так! Важкі обчислення, сортування великих масивів не блокують UI.`,
        },
        {
          question: `CORS та Fetch?`,
          answer: `Fetch слідує CORS policy. credentials: 'include' для cookies, mode: 'cors' для cross-origin.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-html5\">HTML5</span>\n            <span class=\"ver ver-2015\">2015+</span>\n            <span class=\"ver ver-2022\">2022 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">HTML5</span><span class=\"changelog-text\">XMLHttpRequest, setTimeout, basic DOM APIs</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2015+</span><span class=\"changelog-text\">Fetch API, Promise-based, AbortController, IntersectionObserver</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2022 ✦</span><span class=\"changelog-text\">Concurrent fetch, requestIdleCallback, PerformanceObserver</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Browser APIs:</strong> Асинхронні API для мережі, rendering, DOM спостереження.</p>\n            <p><strong>Key APIs:</strong> Fetch, AbortController, requestAnimationFrame, IntersectionObserver.</p>\n          </div><h3 class=\"topic\">Fetch API & AbortController <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> fetch(url) повертає Promise. AbortController для cancellation (signal). <strong>Навіщо:</strong> HTTP запити. Cancel на unmount. Timeout.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Базовий Fetch\nfetch('/api/users')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\n\n// Async/await з error handling\nasync function getUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error('Not found');\n    return await res.json();\n  } catch (e) {\n    console.error('API error:', e.message);\n  }\n}\n\n// AbortController для скасування requests\nconst controller = new AbortController();\nconst timeout = setTimeout(() => controller.abort(), 5000);\ntry {\n  const res = await fetch('/api/data', {\n    signal: controller.signal\n  });\n} catch (e) {\n  if (e.name === 'AbortError') console.log('Request cancelled');\n} finally {\n  clearTimeout(timeout);\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">requestAnimationFrame & Performance</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// requestAnimationFrame для плавної анімації\nlet x = 0;\nfunction animate() {\n  x += 1;\n  element.style.left = x + 'px';\n  if (x < 300) {\n    requestAnimationFrame(animate);\n  }\n}\nanimate();\n\n// Batch операції з requestAnimationFrame\nconst queue = [];\nfunction scheduleUpdate(fn) {\n  queue.push(fn);\n  requestAnimationFrame(() => {\n    queue.forEach(f => f());\n    queue.length = 0;\n  });\n}\n\n// Performance API для вимірювання\nperformance.mark('start');\ndoWork();\nperformance.mark('end');\nperformance.measure('duration', 'start', 'end');\nconsole.log(performance.getEntriesByName('duration')[0].duration);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">IntersectionObserver & Web Workers</h3><p><strong>Що це:</strong> Спостерігає коли елемент видимий в viewport. Callback при intersection. <strong>Навіщо:</strong> Lazy-load images. Infinite scroll. Visibility tracking.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// IntersectionObserver для lazy-loading, infinite scroll\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      console.log('Element visible!');\n      // Load content, lazy load image\n      entry.target.src = entry.target.dataset.src;\n    }\n  });\n}, {\n  threshold: 0.1, // 10% видимості\n  rootMargin: '50px' // Спостереження раніше на 50px\n});\n\ndocument.querySelectorAll('.lazy-image').forEach(el => observer.observe(el));\n\n// Web Workers для важких операцій (окремий thread)\n// main.js\nconst worker = new Worker('worker.js');\nworker.postMessage({ data: largeArray });\nworker.onmessage = (e) => console.log('Result:', e.data);\n\n// worker.js\nself.onmessage = (e) => {\n  const result = expensiveComputation(e.data);\n  self.postMessage(result);\n};"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Best Practice:</strong> Fetch + AbortController для запитів, requestAnimationFrame для анімацій, IntersectionObserver для спостереження видимості.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025+</span><span class=\"changelog-text\">Service Worker improvements, Fetch Priority API, better concurrent fetches</span></div></div>"
        }
      ]
    },
    {
      "id": "testing-jest-vitest-describetestexpect",
      "title": "✅ Testing — Jest, Vitest, describe/test/expect",
      interviewQuestions: [
        {
          "question": "Чим Vitest відрізняється від Jest настільки, що багато нових проєктів обирають саме його?",
          "answer": "Vitest побудований на тому ж рушії, що й Vite (esbuild/Rollup), тому ділить конфігурацію трансформації коду з основним білдом застосунку — не потрібен окремий babel/ts-jest конфіг для тестів. Запуск тестів суттєво швидший завдяки ESM-нативному підходу й smart watch-режиму, що перезапускає лише тести, залежні від зміненого файлу."
        },
        {
          "question": "Чим мокання (<code>vi.mock</code>/<code>jest.mock</code>) модуля відрізняється від мокання окремої функції через spy, і коли що застосовувати?",
          "answer": "Мок модуля підміняє <strong>увесь</strong> імпортований модуль (усі його експорти) — корисно, коли тестований код звертається до зовнішньої залежності (API-клієнт, файлова система), яку в юніт-тесті не можна викликати по-справжньому. Spy на окремій функції (<code>vi.spyOn</code>) підміняє чи відстежує виклики конкретного методу, зберігаючи решту модуля реальною — точніший інструмент, коли потрібно замокати лише одну поведінку, не чіпаючи інші."
        },
        {
          question: `Jest vs Vitest?`,
          answer: `Vitest швидше, ESM support, Vite-native. Jest хороший для legacy projects.`,
        },
        {
          question: `jest.fn() vs jest.spyOn()?`,
          answer: `fn() створює mock. spyOn() шпигує на існуючий метод, зберігаючи оригінал.`,
        },
        {
          question: `Mock модуля правильно?`,
          answer: `jest.mock перед import. mockResolvedValue для async, mockReturnValue для sync.`,
        },
        {
          question: `Async тести як писати?`,
          answer: `return Promise або async/await. Jest чекає resolution.`,
        },
        {
          question: `Snapshots для чого?`,
          answer: `Перевірити output не змінився. Для UI, API responses. Потребує review при оновленні.`,
        },
        {
          question: `Code coverage target?`,
          answer: `Aim for 80%+ coverage. Critical paths 100%, utilities 70%.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-jest\">Jest</span>\n            <span class=\"ver ver-vitest\">Vitest</span>\n            <span class=\"ver ver-2024\">2024 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">Jest 2015</span><span class=\"changelog-text\">Mocha, Jasmine, Jest founded by Facebook</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">Vitest 2021</span><span class=\"changelog-text\">Vite-native testing, lightning-fast, ESM support</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2024 ✦</span><span class=\"changelog-text\">Improved snapshots, better error messages</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Testing Frameworks:</strong> Jest та Vitest для unit/integration testing.</p>\n            <p><strong>Key concepts:</strong> describe, test, expect, mocking, async tests.</p>\n          </div><h3 class=\"topic\">Jest/Vitest Basics <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// describe: групування тестів\ndescribe('Math utilities', () => {\n  test('addition works', () => {\n    expect(1 + 1).toBe(2);\n  });\n\n  test('array includes', () => {\n    expect([1, 2, 3]).toContain(2);\n  });\n\n  test('object matching', () => {\n    expect({ name: 'John' }).toEqual({ name: 'John' });\n  });\n});\n\n// setup/teardown\nbeforeEach(() => {\n  // Запускається перед кожним тестом\n});\n\nafterEach(() => {\n  // Cleanup після тесту\n});\n\nbeforeAll(() => {\n  // Один раз перед усіма тестами\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Mocking & Spying</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// jest.fn(): mock function\nconst mockFn = jest.fn((x) => x * 2);\nexpect(mockFn(5)).toBe(10);\nexpect(mockFn).toHaveBeenCalledWith(5);\nexpect(mockFn).toHaveBeenCalledTimes(1);\n\n// jest.mock(): mock модуль\njest.mock('./api', () => ({\n  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: 'John' })\n}));\n\n// jest.spyOn(): spy на метод об'єкта\nconst consoleSpy = jest.spyOn(console, 'log');\nconsole.log('Hello');\nexpect(consoleSpy).toHaveBeenCalledWith('Hello');\nconsoleSpy.mockRestore();"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Async Testing & Snapshots</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Async тести з async/await\ntest('fetches user', async () => {\n  const user = await fetchUser(1);\n  expect(user.name).toBe('John');\n});\n\n// Обробка Promise rejection\ntest('rejects on error', async () => {\n  await expect(failingFn()).rejects.toThrow();\n});\n\n// Snapshots для UI/API responses\ntest('component renders', () => {\n  const tree = render(<Component />);\n  expect(tree).toMatchSnapshot();\n  // Порівнює з попереднім snapshot\n});"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Best Practice:</strong> Пиши тести біля коду (*.test.js). Mock external API. Використовуй describe для групування. Async/await для читаємості.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Better snapshot diffing, improved watch mode, faster initialization</span></div></div>"
        }
      ]
    },
    {
      "id": "performance-v8-pipeline-jit-hidden-classes-devtools",
      "title": "⚡ Performance — V8 Pipeline, JIT, Hidden Classes, DevTools",
      interviewQuestions: [
        {
          "question": "Що таке hidden classes у V8, і чому непослідовне створення об'єктів однієї «форми» шкодить продуктивності?",
          "answer": "V8 оптимізує доступ до властивостей об'єктів, групуючи об'єкти з однаковим набором і порядком властивостей у «прихований клас» — доступ до властивості такого об'єкта компілюється в швидкий офсет-доступ, схожий на статично типізовані мови. Якщо однотипні об'єкти створюються з різним порядком полів або поля додаються динамічно після створення, V8 не може перевикористати той самий hidden class, і оптимізація деградує до повільнішого dictionary-mode доступу."
        },
        {
          question: `V8 JIT compilation як працює?`,
          answer: `Ignition интерпретує. Hot code → TurboFan оптимізує. Deoptimize при type mismatch.`,
        },
        {
          question: `Hidden classes для чого?`,
          answer: `Fast property access. V8 групує об'єкти з однаковою структурою. Порядок полів важливий!`,
        },
        {
          question: `Як мінімізувати deoptimization?`,
          answer: `Consistentні типи у функціях. Уникай dinamichen property assignment.`,
        },
        {
          question: `Memory leak closure для чого?`,
          answer: `Closure утримує scope. Grandes data у listeners = memory leak. removeEventListener або null assign.`,
        },
        {
          question: `Performance.now() vs Date.now()?`,
          answer: `now() мікросекунди, Date.now() мілісекунди. now() для точних бенчмарків.`,
        },
        {
          question: `DevTools Profiling як користуватись?`,
          answer: `Performance tab → record → do action → stop. Подивись за Long Tasks, layout thrashing.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-v8\">V8 Engine</span>\n            <span class=\"ver ver-modern\">Modern JS</span>\n            <span class=\"ver ver-2024\">2024 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">V8 2008</span><span class=\"changelog-text\">Google Chrome engine, JIT compilation, hidden classes</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">Modern</span><span class=\"changelog-text\">Baseline JIT, TurboFan optimizer, Ignition interpreter</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2024 ✦</span><span class=\"changelog-text\">Maglev JIT, faster startup, better GC</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Performance:</strong> Розуміння V8 execution для оптимізації коду.</p>\n            <p><strong>Key concepts:</strong> JIT, hidden classes, garbage collection, profiling.</p>\n          </div><h3 class=\"topic\">V8 Execution Pipeline <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// V8 pipeline: Parse → Ignition (interpreter) → TurboFan (optimizing JIT)\n// 1. Parsing: JS string → AST\n// 2. Ignition: AST → bytecode (fast startup)\n// 3. Profiling: Ignition зберігає тип-інформацію\n// 4. TurboFan: hot code → оптимізований native code\n// 5. Deoptimization: якщо типи змінилися (type feedback failure)\n\n// Hot code (понад 1000 iterations) отримує TurboFan optimization\nfunction add(a, b) {\n  return a + b; // На першому виклику: Ignition\n}                 // На 1000+ викликах: TurboFan компілює до native\n\n// Deoptimization: мінусторона для производства\nfunction process(x) {\n  return x + 1; // Оптимізовано для number\n}\nprocess(5); // Fast\nprocess('abc'); // Deoptimize! TurboFan перекомпілює"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Hidden Classes & Object Shape Optimization</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// V8 використовує \"hidden classes\" для оптимізації доступу до полів\nfunction createUser(name, age) {\n  return { name, age }; // Одна hidden class для всіх об'єктів\n}\n\n// ПОГАНО: різні properties в різному порядку\nfunction badExample(flag) {\n  const obj = {};\n  if (flag) {\n    obj.a = 1; obj.b = 2; // Hidden class 1\n  } else {\n    obj.b = 2; obj.a = 1; // Hidden class 2 (!)\n  }\n  return obj;\n}\n\n// ДОБРЕ: одна структура\nfunction goodExample(flag) {\n  const obj = { a: null, b: null };\n  if (flag) {\n    obj.a = 1; obj.b = 2;\n  } else {\n    obj.a = 3; obj.b = 4;\n  }\n  return obj; // Одна hidden class весь час\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Garbage Collection — як працює <span class=\"tag tag-key\">KEY</span></h3><p><strong>Коротко:</strong> V8 звільняє пам'ять об'єктів, недосяжних від коренів (reachability), генераційним Mark-and-Sweep. Повний розбір — stack vs heap, фази Mark/Sweep/Compact, типові memory leaks з кодом, порівняння/копіювання об'єктів та флешкартки для повторення — дивись секцію <strong>«🧠 Heap та управління пам'яттю»</strong> нижче ⬇.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Monitoring memory (DevTools Performance tab)\n// 1. Take heap snapshot\n// 2. Look for detached DOM nodes, retained objects\n// 3. Track allocation timeline"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">DevTools Profiling & Performance API</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Performance.now() для точного timing\nconst start = performance.now();\nexpensiveWork();\nconst end = performance.now();\nconsole.log(`Took ${end - start}ms`);\n\n// performance.mark() та measure() для бенчмарків\nperformance.mark('render-start');\nrenderComponent();\nperformance.mark('render-end');\nperformance.measure('render', 'render-start', 'render-end');\n\n// Console.time() для швидкої перевірки\nconsole.time('myOperation');\ndoSomething();\nconsole.timeEnd('myOperation'); // Вивід: myOperation: 15ms"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-warn\">\n            <strong>Обережно:</strong> Deoptimization неправильних типів може убити performance. Тримай consistentні типи у функціях. Профільний реальний код у DevTools, не вгадуй!\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у V8 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025+</span><span class=\"changelog-text\">Maglev further optimizations, faster TurboFan, better GC latency</span></div></div>"
        }
      ]
    },
    {
      "id": "heap-memory-management",
      "title": "🧠 Heap та управління пам'яттю",
      interviewQuestions: [
        {
          "question": "Як влаштований garbage collector у V8 (generational GC), і чому «молоді» об'єкти збираються частіше за «старі»?",
          "answer": "V8 ділить heap на young generation (нові, здебільшого короткоживучі об'єкти) і old generation. Young generation збирається часто швидким scavenger-алгоритмом, бо за статистикою більшість об'єктів помирають молодими (гіпотеза генераційності). Об'єкти, що пережили кілька циклів збирання в young generation, переносяться (tenuring) в old generation, яка збирається рідше, повільнішим mark-sweep-compact алгоритмом, бо там очікується менше сміття."
        },
        {
          "question": "Наведи типовий приклад витоку пам'яті в SPA, пов'язаний із замиканнями чи глобальними колекціями.",
          "answer": "Кешування DOM-елементів чи даних компонента в глобальному <code>Map</code>/масиві без видалення запису при знищенні компонента — посилання в глобальній колекції тримає весь об'єкт (і все, на що він посилається через замикання) живим у пам'яті навіть після того, як компонент видалено з DOM і логічно мав би бути зібраний garbage collector'ом."
        },
        {
          question: `Чи <code>delete obj.prop</code> одразу звільняє пам'ять?`,
          answer: `Ні. <code>delete</code> лише прибирає властивість з об'єкта; саме значення звільниться, тільки якщо на нього більше немає інших посилань, і то не миттєво, а коли до нього дійде GC.`,
        },
        {
          question: `<code>for (var i...)</code> vs <code>for (let i...)</code> у замиканнях всередині циклу з <code>setTimeout</code> — яка різниця для пам'яті?`,
          answer: `<code>var</code> створює одну спільну змінну на весь цикл (усі замикання ділять один heap-слот); <code>let</code> створює нове лексичне зв'язування на кожну ітерацію — N окремих (маленьких) об'єктів-оточень замість одного спільного.`,
        },
        {
          question: `Чи <code>WeakRef</code> + <code>FinalizationRegistry</code> гарантують, коли спрацює callback?`,
          answer: `Ні, специфікація свідомо не гарантує ні коли, ні чи взагалі спрацює finalizer (рушій може не викликати його, якщо процес завершується раніше) — для логіки, критичної для коректності, покладатись на це не можна, лише для допоміжного clean-up/діагностики.`,
        },
        {
          question: `Чи звільняється замикання, якщо воно посилається лише на одну змінну з великого scope?`,
          answer: `У сучасних рушіях (V8) — частково оптимізовано: якщо аналіз показує, що замикання використовує лише частину змінних оточення, невикористані інколи звільняються раніше. Але покладатись на це не варто — краще явно «звузити» захоплення (див. приклад «Замикання захоплює зайве» вище).`,
        },
        {
          question: `Чи <code>structuredClone</code> копіює прототип об'єкта?`,
          answer: `Ні, результат — plain object (втрачається прототипний ланцюг і клас); для класів/кастомних прототипів потрібне ручне клонування.`,
        },
        {
          question: `Чи можна отримати memory leak із самим WeakMap?`,
          answer: `Так, якщо значення (не ключ!) містить сильне посилання назад на щось довгоживуче — сам WeakMap лише робить слабким посилання на ключ, а не на все, що зберігається у значенні.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Концепція — швидке повторення <span class=\"tag tag-key\">KEY</span></h3><p><strong>Stack (стек виконання):</strong> зберігає call frames — примітивні значення, посилання (адреси) на об'єкти, параметри функцій. Виділення й звільнення автоматичне, у LIFO-порядку при вході/виході з функції — швидко, фіксований розмір.</p><p><strong>Heap (купа):</strong> зберігає самі об'єкти, масиви, функції, замикання — все, чий розмір заздалегідь невідомий або може змінюватись. Виділення динамічне; звільненням керує Garbage Collector.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Де</th><th>Що зберігається</th><th>Хто керує</th></tr>\n              <tr><td>Stack</td><td>примітиви (number, string, boolean, undefined, null, symbol, bigint), посилання на об'єкти, call frames</td><td>рушій, автоматично (LIFO)</td></tr>\n              <tr><td>Heap</td><td>object/array/function/Map/Set/Date... — самі структури даних</td><td>Garbage Collector</td></tr>\n            </table>\n          </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "Примітиви за значенням vs об'єкти за посиланням",
          "code": "const a = 10;                // 10 лежить прямо у stack-слоті `a`\nconst b = a;                  // копія значення — b і a незалежні\nb + 1;\nconsole.log(a, b);            // 10 10 (b не змінився від зміни a і навпаки)\n\nconst obj1 = { x: 1 };        // { x: 1 } лежить у heap\nconst obj2 = obj1;             // у stack копіюється лише ПОСИЛАННЯ (адреса)\nobj2.x = 2;\nconsole.log(obj1.x);           // 2 — obj1 і obj2 вказують на той самий об'єкт у heap"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Модель пам'яті V8 — New Space / Old Space</h3><p>V8 ділить heap на кілька просторів (spaces); два ключові для співбесіди:</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Простір</th><th>Що там</th><th>Розмір</th><th>Як часто чиститься</th></tr>\n              <tr><td><strong>New Space</strong> (young generation)</td><td>щойно створені об'єкти</td><td>малий (кілька MB), 2 семіпростори</td><td>дуже часто — Scavenge</td></tr>\n              <tr><td><strong>Old Space</strong> (old generation)</td><td>об'єкти, що «пережили» кілька Scavenge-циклів</td><td>великий</td><td>рідко — Mark-Sweep-Compact</td></tr>\n            </table>\n          </div><p>Є ще Large Object Space (об'єкти понад ~1MB минають New Space одразу) і Code Space (скомпільований код) — але на співбесіді зазвичай достатньо New/Old.</p>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Глибше занурення — generational GC <span class=\"tag tag-key\">KEY</span></h3><p><strong>Weak generational hypothesis:</strong> більшість об'єктів «вмирають молодими» — живуть дуже коротко (тимчасові змінні, проміжні обчислення). Тому вигідно окремо й часто перевіряти лише «молоду» пам'ять, а не сканувати весь heap щоразу — звідси поділ на покоління з різними алгоритмами й частотою запуску.</p><div class=\"grid2\">\n            <div class=\"card blue\"><h4>⚡ Scavenge (New Space)</h4><p>Copying-алгоритм: New Space поділений на <em>from-space</em> і <em>to-space</em>. Живі об'єкти копіюються з from → to (ущільнюючись), решта простору вважається вільною. Швидко, бо живих об'єктів у молодому поколінні зазвичай мало. Об'єкт, що пережив 2 Scavenge-цикли, «підвищується» (promotion) в Old Space.</p></div>\n            <div class=\"card yellow\"><h4>🐢 Mark-Sweep-Compact (Old Space)</h4><p>Old Space великий і здебільшого заповнений живими об'єктами — copying тут дорогий. Тому: Mark → Sweep → Compact. Працює рідше, інкрементально й паралельно, щоб мінімізувати stop-the-world паузи на main thread.</p></div>\n          </div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Три фази mark-and-sweep</h3><ul class=\"list\">\n            <li><strong>1. Mark</strong> — обхід графа об'єктів від roots (globals, стек викликів, замикання); усе досяжне позначається як «живе».</li>\n            <li><strong>2. Sweep</strong> — прохід по heap: усе непозначене вважається сміттям і повертається у вільну пам'ять.</li>\n            <li><strong>3. Compact</strong> (переважно в Old Space, не завжди) — живі об'єкти пересуваються ближче один до одного, щоб усунути фрагментацію й звільнити суцільні блоки пам'яті під майбутні алокації.</li>\n          </ul>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Reachability замість reference counting — чому цикли не течуть</h3><p><strong>Reference counting</strong> (наївний підхід): кожен об'єкт зберігає лічильник посилань на себе; коли лічильник = 0 — об'єкт звільняється. Проблема: <strong>цикл</strong> із двох об'єктів, що посилаються один на одного, ніколи не досягне 0, навіть якщо ззовні на нього ніхто не посилається — memory leak.</p><p><strong>Reachability (V8):</strong> об'єкт живий не тому, що на нього щось посилається, а тому, що до нього є шлях <em>від roots</em>. Цикл без зовнішнього шляху від roots — недосяжний цілком, і mark-and-sweep звільнить обидва об'єкти разом.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "Циклічне посилання все одно збирається",
          "code": "function makeCycle() {\n  const a: { other?: unknown } = {};\n  const b: { other?: unknown } = {};\n  a.other = b;\n  b.other = a; // цикл: a -> b -> a\n  return 'no external references kept';\n}\n\nmakeCycle();\n// Після виходу з функції ні `a`, ні `b` не досяжні від жодного root —\n// попри взаємне посилання, GC звільнить обидва об'єкти.\n// Наївний reference counting тут «протік» би: лічильник кожного = 1, ніколи не 0."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Memory leaks на практиці <span class=\"tag tag-pit\">PIT</span></h3><p>Витік пам'яті в JS — це не «GC зламався», а об'єкт, що <strong>лишається досяжним ненавмисно</strong>. П'ять найчастіших патернів:</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "1. Забутий event listener",
          "code": "// ❌ Забутий event listener\nfunction attach() {\n  const hugeData = new Array(1_000_000).fill('x');\n  const handler = () => console.log(hugeData.length);\n  window.addEventListener('resize', handler);\n  // handler і замкнений hugeData живуть, поки є listener,\n  // навіть якщо власник handler давно \"видалений\" зі сторінки\n}\n\n// ✅ Прибираємо, коли більше не потрібно\nfunction attachFixed() {\n  const hugeData = new Array(1_000_000).fill('x');\n  const handler = () => console.log(hugeData.length);\n  window.addEventListener('resize', handler);\n  return () => window.removeEventListener('resize', handler); // cleanup\n}"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "2. Таймер із замиканням",
          "code": "// ❌ setInterval тримає замикання живим необмежено довго\nfunction startPolling(bigPayload: unknown) {\n  setInterval(() => {\n    sendBeacon(bigPayload); // bigPayload недосяжний іншим шляхом, крім цього таймера\n  }, 5000);\n  // немає clearInterval — таймер (і bigPayload) живе, поки живе процес\n}\n\n// ✅ Зберігаємо id і чистимо\nfunction startPollingFixed(bigPayload: unknown) {\n  const id = setInterval(() => sendBeacon(bigPayload), 5000);\n  return () => clearInterval(id);\n}"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "3. Замикання захоплює зайве",
          "code": "// ❌ Замикання захоплює весь largeConfig, хоча треба лише один прапорець\nfunction makeLogger(largeConfig: { debug: boolean }) {\n  return () => console.log(largeConfig.debug);\n  // largeConfig (весь об'єкт) лишається живим, поки живе повернута функція\n}\n\n// ✅ Витягуємо тільки потрібне значення ДО створення замикання\nfunction makeLoggerFixed(largeConfig: { debug: boolean }) {\n  const { debug } = largeConfig; // largeConfig можна звільнити одразу після цього\n  return () => console.log(debug);\n}"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "4. Detached DOM node",
          "code": "// ❌ Detached DOM node — вузол видалено з дерева, але JS все ще тримає посилання\nconst cache: Record<string, HTMLElement | null> = {};\nfunction cacheNode(id: string) {\n  cache[id] = document.getElementById(id);\n}\ncacheNode('sidebar');\ndocument.getElementById('sidebar')?.remove(); // видалили з DOM...\n// ...але cache.sidebar досі посилається на нього — \"detached\", але не GC'd\n\n// ✅ Прибираємо посилання разом із видаленням з DOM\ndelete cache['sidebar'];"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "5. Глобальний кеш → WeakMap",
          "code": "// ❌ Кеш на звичайному Map росте вічно — ключі (DOM-вузли/об'єкти) ніколи\n// не звільняться, поки живий сам Map\nconst metaCache = new Map<HTMLElement, unknown>();\nfunction setMeta(el: HTMLElement, data: unknown) {\n  metaCache.set(el, data); // strong reference на el — el не збереться, навіть видаливши з DOM\n}\n\n// ✅ WeakMap — ключі тримаються \"слабко\": коли el стає недосяжним деінде,\n// пара {el: data} автоматично прибирається GC\nconst metaCacheWeak = new WeakMap<HTMLElement, unknown>();\nfunction setMetaFixed(el: HTMLElement, data: unknown) {\n  metaCacheWeak.set(el, data);\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\"><strong>Правило:</strong> якщо ключ кешу — об'єкт/DOM-вузол і ти хочеш, щоб запис у кеші сам зникав разом з об'єктом — використовуй <code>WeakMap</code> (пари ключ→значення) або <code>WeakSet</code> (множина об'єктів). Обидва не enumerable (немає <code>.size</code>, <code>.keys()</code>, <code>for...of</code>) — саме тому, що вміст може зникнути в будь-який момент.</div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Порівняння та копіювання об'єктів</h3><p><code>{} === {}</code> → <code>false</code>. Оператори порівняння для об'єктів (<code>===</code>, <code>==</code>) порівнюють <em>посилання</em> (адреси в heap), а не вміст. Два різні літерали — це два різні об'єкти в heap, навіть з однаковим вмістом.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "{} === {} та порівняння за посиланням",
          "code": "console.log({} === {});                 // false — різні об'єкти в heap\nconsole.log([] === []);                  // false — так само\n\nconst obj = { x: 1 };\nconst same = obj;\nconsole.log(obj === same);               // true — те саме посилання\n\nconsole.log(JSON.stringify({ a: 1 }) === JSON.stringify({ a: 1 })); // true — порівнюємо РЯДКИ, не об'єкти"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "Мутація крізь спільне посилання",
          "code": "function addItem(cart: { items: string[] }, item: string) {\n  cart.items.push(item); // мутує оригінальний масив у heap!\n  return cart;\n}\n\nconst cart1 = { items: [] as string[] };\nconst cart2 = addItem(cart1, 'apple');\nconsole.log(cart1 === cart2);     // true — той самий об'єкт\nconsole.log(cart1.items);          // ['apple'] — cart1 теж змінився, хоч його \"не чіпали напряму\""
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Shallow copy (spread) vs deep copy (structuredClone)</h3><p><strong>Shallow copy</strong> (<code>{...obj}</code>, <code>[...arr]</code>, <code>Object.assign</code>) створює новий «верхній» об'єкт, але вкладені об'єкти/масиви всередині — ті самі посилання, що й в оригіналі.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "caption": "Shallow vs deep copy",
          "code": "const original = { name: 'Alice', address: { city: 'Kyiv' } };\n\nconst shallow = { ...original };\nshallow.name = 'Bob';                  // не впливає на original — top-level поле скопійоване\nshallow.address.city = 'Lviv';          // ⚠️ впливає і на original.address.city!\nconsole.log(original.address.city);     // 'Lviv' — address досі те саме посилання\n\nconst deep = structuredClone(original);\ndeep.address.city = 'Odesa';\nconsole.log(original.address.city);      // 'Lviv' — deep clone повністю незалежний\n\n// structuredClone НЕ вміє: функції, DOM-вузли, прототипні ланцюги, Symbol-властивості\n// (кине DataCloneError) — для таких кейсів потрібне ручне клонування."
        },
        {
          "kind": "flashcards",
          "items": [
            {
              "question": "Чи рахує JS посилання для GC (reference counting)?",
              "answer": "Ні. V8 використовує <strong>reachability</strong> (mark-and-sweep): об'єкт живий, поки є шлях до нього від roots. Саме це дозволяє коректно звільняти цикли посилань, на яких наївний reference counting «зависає»."
            },
            {
              "question": "Де зберігається значення const-об'єкта, наприклад <code>const user = { name: 'A' }</code>?",
              "answer": "Саме <strong>зв'язування</strong> <code>user</code> (посилання/адреса) лежить у стеку виклику; сам об'єкт <code>{ name: 'A' }</code> — у heap. <code>const</code> забороняє змінити, куди вказує <code>user</code>, але не забороняє мутувати вміст об'єкта в heap."
            },
            {
              "question": "Що таке detached DOM node?",
              "answer": "DOM-вузол, видалений з дерева документа (<code>.remove()</code> або заміна батька), але на який JS десь досі тримає посилання (напр. у кеші чи замиканні) — тому GC не може його звільнити, хоча на сторінці його вже немає."
            },
            {
              "question": "Навіщо потрібен WeakMap?",
              "answer": "Для кешів/метаданих, прив'язаних до об'єктів (часто DOM-вузлів), де запис має автоматично зникати разом з об'єктом-ключем — без ручного видалення й без ризику витоку пам'яті."
            },
            {
              "question": "Чому <code>{} === {}</code> дорівнює false?",
              "answer": "<code>===</code> для об'єктів порівнює посилання (адреси в heap), а не вміст. Це два різні об'єкти — навіть з однаковим (порожнім) вмістом."
            },
            {
              "question": "Чим Scavenge відрізняється від Mark-Sweep-Compact?",
              "answer": "Scavenge — швидкий copying-алгоритм для малого New Space (молоді об'єкти). Mark-Sweep-Compact — повільніший, рідший прохід для великого Old Space, що додатково ущільнює пам'ять (compact), щоб уникнути фрагментації."
            },
            {
              "question": "Чи можна форсувати garbage collection в JS?",
              "answer": "Ні, у стандартному рушії немає публічного API для примусового запуску GC (Node з флагом <code>--expose-gc</code> — виняток для дебагу/тестів). <code>= null</code> чи <code>delete</code> лише прибирають посилання — звільняти пам'ять вирішує GC."
            },
            {
              "question": "У чому різниця shallow copy й deep copy?",
              "answer": "Shallow copy (<code>{...obj}</code>) копіює лише верхній рівень — вкладені об'єкти лишаються спільними посиланнями. Deep copy (<code>structuredClone</code>) рекурсивно копіює все дерево, роблячи копію повністю незалежною."
            },
            {
              "question": "Чому цикл із двох об'єктів, що посилаються один на одного, не викликає memory leak в JS?",
              "answer": "Бо GC перевіряє reachability від roots, а не лічильник посилань: якщо ззовні на цикл ніхто не посилається, обидва об'єкти недосяжні й будуть зібрані разом, попри взаємне посилання."
            },
            {
              "question": "Що станеться, якщо <code>structuredClone</code> отримає об'єкт із методом (функцією)?",
              "answer": "Кине <code>DataCloneError</code> — функції (як і DOM-вузли, Symbol-ключі) не підтримуються алгоритмом structured clone; такі поля треба клонувати/обробляти вручну."
            }
          ]
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Каверзні питання <span class=\"tag tag-pit\">PIT</span></h3>"
        }
      ]
    },
    {
      "id": "symbols-custom-iterables-well-known-symbols",
      "title": "🔑 Symbols & Custom Iterables — Well-Known Symbols",
      interviewQuestions: [
        {
          "question": "Навіщо потрібен тип <code>Symbol</code>, якщо для унікальних ключів можна використовувати рядки?",
          "answer": "<code>Symbol()</code> завжди створює <strong>гарантовано унікальне</strong> значення, навіть якщо опис (перший аргумент) збігається з іншим символом — на відміну від рядка, де колізія ключів (<code>\"id\"</code> від двох різних бібліотек) можлива й непередбачувана. Symbols також не перелічуються в звичайному <code>for...in</code>/<code>Object.keys</code>, що робить їх зручними для «прихованих» службових властивостей об'єкта, які не мають заважати серіалізації чи ітерації."
        },
        {
          question: `Symbol унікальність как це працює?`,
          answer: `Кожен Symbol('id') унікальний, навіть при однаковій description.`,
        },
        {
          question: `Symbol.iterator для чого?`,
          answer: `Робить об'єкт iterable. for...of використовує це. Необхідно для custom collections.`,
        },
        {
          question: `Symbol vs private fields (#)?`,
          answer: `Symbol не бачиться Object.keys(). # більш зручно у class. Обидва скривають properties.`,
        },
        {
          question: `Symbol.toStringTag для чого?`,
          answer: `Кастомізувати [object Type]. Для ідентифікації custom classes в Object.prototype.toString().`,
        },
        {
          question: `Symbol.hasInstance для instanceof?`,
          answer: `Custom instanceof поведення. obj instanceof MyClass викликає MyClass[Symbol.hasInstance]().`,
        },
        {
          question: `Symbol.toPrimitive для coercion?`,
          answer: `hint = 'number'/'string'/'default'. Контролює як об'єкт конвертується у примітив.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es6\">ES6</span>\n            <span class=\"ver ver-es2019\">ES2019</span>\n            <span class=\"ver ver-es2024\">ES2024 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Symbols introduced, Symbol.iterator, Symbol.toStringTag</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2019</span><span class=\"changelog-text\">Symbol.toLocaleString, Symbol.matchAll</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2024 ✦</span><span class=\"changelog-text\">Better Symbol.dispose integration</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Symbols:</strong> Унікальні примітивні значення для key скритих властивостей.</p>\n            <p><strong>Well-Known Symbols:</strong> Symbol.iterator, Symbol.toStringTag, Symbol.hasInstance та інші.</p>\n          </div><h3 class=\"topic\">Symbols & Symbol.iterator <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Базовий Symbol\nconst sym1 = Symbol('id');\nconst sym2 = Symbol('id');\nconsole.log(sym1 === sym2); // false (кожен Symbol унікальний)\n\n// Symbol для приватних властивостей\nconst privateKey = Symbol('private');\nconst obj = {};\nobj[privateKey] = 'secret';\nconsole.log(Object.keys(obj)); // [] (Symbol не перераховується)\n\n// Symbol.iterator для custom iterables\nconst iterable = {\n  [Symbol.iterator]() {\n    let count = 0;\n    return {\n      next: () => ({\n        value: count++,\n        done: count > 3\n      })\n    };\n  }\n};\n\nfor (const val of iterable) {\n  console.log(val); // 0, 1, 2\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Well-Known Symbols & Custom Behaviors</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Symbol.toStringTag для користувацьких toString()\nclass CustomClass {\n  get [Symbol.toStringTag]() {\n    return 'CustomClass';\n  }\n}\nconst obj = new CustomClass();\nconsole.log(Object.prototype.toString.call(obj)); // '[object CustomClass]'\n\n// Symbol.hasInstance для instanceof перевірки\nclass MyClass {\n  static [Symbol.hasInstance](obj) {\n    return obj && obj.special === true;\n  }\n}\nconst obj2 = { special: true };\nconsole.log(obj2 instanceof MyClass); // true (custom logic)\n\n// Symbol.toPrimitive для type coercion\nconst obj3 = {\n  [Symbol.toPrimitive](hint) {\n    if (hint === 'number') return 42;\n    if (hint === 'string') return 'hello';\n    return true;\n  }\n};\nconsole.log(+obj3); // 42\nconsole.log(String(obj3)); // 'hello'"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Use Case:</strong> Symbols для приватних властивостей (альтернатива # приватним полям). Custom iterables для specialization.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Symbol.dispose for async cleanup, better Symbol introspection</span></div></div>"
        }
      ]
    },
    {
      "id": "regular-expressions-flags-lookahead-named-groups-matchall",
      "title": "🔍 Regular Expressions — Flags, Lookahead, Named Groups, matchAll",
      interviewQuestions: [
        {
          "question": "Чим named capturing groups (<code>(?&lt;year&gt;\\d{4})</code>) кращі за звичайні нумеровані групи для читабельності коду?",
          "answer": "Іменована група дозволяє звертатись до результату через <code>match.groups.year</code> замість <code>match[1]</code> — код одразу самодокументований і не ламається, якщо порядок груп у регулярному виразі згодом зміниться (нумеровані індекси довелось би перераховувати вручну)."
        },
        {
          question: `Flags для чого? g, i, m різниця?`,
          answer: `g (global, всі матчі), i (ignore case), m (multiline, ^ $ для кожної лінії).`,
        },
        {
          question: `exec vs match vs test?`,
          answer: `test (boolean), match (масив матчів), exec (детальна інформація з groups).`,
        },
        {
          question: `Lookahead (?=...) vs lookbehind?`,
          answer: `Lookahead: матч якщо наступне. Lookbehind: матч якщо попереднє.`,
        },
        {
          question: `Named groups для чого?`,
          answer: `Читаємість. groups.year замість [1]. Для складних patterns з багатьма групами.`,
        },
        {
          question: `matchAll для чого?`,
          answer: `Отримати ВСІ матчі з groups за один виклик. for...of для ітерації.`,
        },
        {
          question: `Чому regex з прапорцем g у циклі іноді пропускає збіги?`,
          answer: `lastIndex зберігається на об'єкті між викликами; свіжий regex-літерал на кожну ітерацію або скидання lastIndex=0 вирішує це.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5</span>\n            <span class=\"ver ver-es2018\">ES2018</span>\n            <span class=\"ver ver-es2024\">ES2024 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Basic regex, flags (g, i, m), exec, test, match</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2018</span><span class=\"changelog-text\">Lookahead (?=...), lookbehind (?&lt;=...), named groups (?&lt;name&gt;...)</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2024 ✦</span><span class=\"changelog-text\">Unicode handling improvements, better regex optimizations</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Regular Expressions:</strong> Pattern matching для strings.</p>\n            <p><strong>Advanced:</strong> Lookahead, lookbehind, named groups, Unicode support.</p>\n          </div><h3 class=\"topic\">Basic Regex & Flags <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Flags: g (global), i (ignore case), m (multiline)\nconst str = 'Hello HELLO hello';\n/hello/i.test(str); // true (ignore case)\nstr.match(/hello/gi); // ['Hello', 'HELLO', 'hello']\n\n// exec() для отримання інформації про матч\nconst regex = /(\\w+)@(\\w+\\.\\w+)/g;\nconst email = 'john@example.com';\nconst match = regex.exec(email);\n// match[0] = 'john@example.com'\n// match[1] = 'john' (група 1)\n// match[2] = 'example.com' (група 2)\n\n// test() для простої перевірки\n/^\\d{3}-\\d{3}-\\d{4}$/.test('555-123-4567'); // true"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Lookahead & Lookbehind Assertions</h3><p><strong>Що це:</strong> ?= (lookahead), ?! (negative), ?<= (lookbehind), ?<! (negative). Assertion без consuming. <strong>Навіщо:</strong> Complex pattern matching. Conditional matching.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Positive lookahead (?=...) - матч якщо наступне = pattern\nconst str = 'price: $100, value: $50';\nstr.match(/\\$\\d+(?= )/g); // ['$100'] - матч $ якщо після пробіл\n\n// Negative lookahead (?!...) - матч якщо наступне != pattern\nstr.match(/\\$\\d+(?! )/g); // ['$50'] - матч $ якщо НЕ пробіл\n\n// Positive lookbehind (?<=...) - матч якщо попереднє = pattern (ES2018)\n/(?<=\\$)\\d+/g.exec('price $100 total'); // ['100'] - матч цифр після $\n\n// Negative lookbehind (?<!...) - матч якщо попереднє != pattern\nconst password = 'pass123word456';\npassword.match(/(?<![a-z])\\d+/g); // ['123', '456'] - цифри не після буквИ"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Named Groups & matchAll</h3><strong>Що це:</strong><strong>Навіщо:</strong>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Named groups (?<name>...) для дескриптивного доступу\nconst dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nconst date = '2024-12-25';\nconst groups = dateRegex.exec(date).groups;\nconsole.log(groups.year, groups.month, groups.day); // 2024 12 25\n\n// matchAll() (ES2020) для отримання всіх матчів з groups\nconst text = 'john@example.com, jane@test.org';\nconst emailRegex = /(?<user>\\w+)@(?<domain>\\w+\\.\\w+)/g;\nfor (const match of text.matchAll(emailRegex)) {\n  console.log(match.groups.user, match.groups.domain);\n}\n// 'john' 'example.com'\n// 'jane' 'test.org'"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-warn\">\n            <strong>Обережно:</strong> Regex може бути дорогим для продуктивності. Уникай backreferences і complex quantifiers. Профілюй regex на великих inputs.\n          </div><div class=\"alert alert-warn\"><strong>⚠️ lastIndex та ReDoS:</strong> при прапорці <code>g</code> рушій зберігає <code>lastIndex</code> НА САМОМУ regex-об'єкті між викликами <code>test()</code>/<code>exec()</code> — повторний виклик того самого regex шукає з позиції, де зупинився минулого разу, а не з початку рядка; типове джерело хитрих багів у циклах. Окремо: catastrophic backtracking (вкладені квантифікатори на кшталт <code>(a+)+</code>) може призвести до ReDoS — експоненційного часу виконання й зависання на певних вхідних рядках.</div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Unicode property escapes expansion, better backtracking prevention</span></div></div>"
        }
      ]
    },
    {
      "id": "advanced-async-patterns-debounce-throttle-taskqueue-promisewithresolvers",
      "title": "🚀 Advanced Async Patterns — debounce, throttle, TaskQueue, Promise.withResolvers",
      interviewQuestions: [
        {
          "question": "Чим debounce відрізняється від throttle, і який типовий UI-кейс для кожного?",
          "answer": "Debounce відкладає виконання функції, доки не пройде вказана пауза без нових викликів — скидає таймер на кожен новий виклик (типовий кейс — пошуковий інпут: запит відправляється лише коли користувач перестав друкувати). Throttle гарантує виконання не частіше, ніж раз на заданий інтервал, незалежно від кількості викликів (типовий кейс — обробник <code>scroll</code>/<code>resize</code>, де потрібні регулярні, але не надто часті оновлення)."
        },
        {
          "question": "Що дає <code>Promise.withResolvers()</code> порівняно зі старим патерном ручного створення «зовнішнього» проміса?",
          "answer": "До цього методу, щоб отримати <code>resolve</code>/<code>reject</code> поза виконавчою функцією проміса, доводилось створювати проміжні змінні й присвоювати їх усередині колбека конструктора (<code>new Promise((res, rej) => { resolve = res; reject = rej })</code>) — незручно й легко переплутати. <code>Promise.withResolvers()</code> одразу повертає <code>{ promise, resolve, reject }</code> одним викликом, без обхідного патерну."
        },
        {
          question: `debounce vs throttle?`,
          answer: `debounce: чекай кінця (search). throttle: максимум раз за N ms (scroll).`,
        },
        {
          question: `TaskQueue для чого?`,
          answer: `Послідовне виконання async. Уникай race conditions. Request limit (одночасно 1).`,
        },
        {
          question: `Promise.withResolvers() преимущество?`,
          answer: `Cleaner API. resolve/reject поза конструктором. Нижче callback hell.`,
        },
        {
          question: `Promise.all vs allSettled?`,
          answer: `all: fail на першій помилці. allSettled: чекай всіх (handle partial failures).`,
        },
        {
          question: `Promise.race для чого?`,
          answer: `Timeout реалізація. Перша завершена вигравань. Race умови контролю.`,
        },
        {
          question: `Як запобігти callback hell в chains?`,
          answer: `async/await замість .then chains. Более читаємо, лінійно.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es6\">ES6 Promises</span>\n            <span class=\"ver ver-es2017\">ES2017 async/await</span>\n            <span class=\"ver ver-es2024\">ES2024 ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Promise constructor, .then/.catch/.finally</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2017</span><span class=\"changelog-text\">async/await syntax, Promise.all/race/allSettled</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES2024 ✦</span><span class=\"changelog-text\">Promise.withResolvers(), better Promise composition</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Advanced Async:</strong> Утиліти для контролю асинхронних операцій.</p>\n            <p><strong>Key Patterns:</strong> debounce, throttle, TaskQueue, Promise.withResolvers.</p>\n          </div><h3 class=\"topic\">debounce & throttle <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// debounce: викликай функцію тільки після N ms відсутності викликів\nfunction debounce(fn, delay) {\n  let timeout;\n  return function (...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => fn(...args), delay);\n  };\n}\n\n// Приклад: пошук з затримкою\nconst search = debounce(async (query) => {\n  const results = await fetchResults(query);\n  displayResults(results);\n}, 300);\n\ninput.addEventListener('input', (e) => search(e.target.value));\n\n// throttle: викликай функцію максимум один раз за N ms\nfunction throttle(fn, delay) {\n  let lastCall = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      fn(...args);\n    }\n  };\n}\n\n// Приклад: scroll обробка\nconst handleScroll = throttle(() => {\n  console.log('Scroll event');\n}, 500);\n\nwindow.addEventListener('scroll', handleScroll);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">TaskQueue & Promise.withResolvers</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// TaskQueue для послідовного виконання async операцій\nclass TaskQueue {\n  constructor() {\n    this.queue = [];\n    this.running = false;\n  }\n\n  add(task) {\n    return new Promise((resolve, reject) => {\n      this.queue.push({ task, resolve, reject });\n      this.process();\n    });\n  }\n\n  async process() {\n    if (this.running || this.queue.length === 0) return;\n    this.running = true;\n\n    const { task, resolve, reject } = this.queue.shift();\n    try {\n      const result = await task();\n      resolve(result);\n    } catch (e) {\n      reject(e);\n    }\n\n    this.running = false;\n    this.process();\n  }\n}\n\n// Використання\nconst queue = new TaskQueue();\nqueue.add(async () => await fetchAPI('/api/1'));\nqueue.add(async () => await fetchAPI('/api/2')); // Послідовно!\n\n// Promise.withResolvers() (ES2024)\nconst { promise, resolve, reject } = Promise.withResolvers();\nsetTimeout(() => resolve(42), 1000);\nconst result = await promise; // 42\n\n// Раніше потрібно було: new Promise((resolve, reject) => {...})\n// Тепер просто: Promise.withResolvers() (cleaner API)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Promise Composition & Error Handling</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Promise.all: чекай всіх, fail на першій помилці\ntry {\n  const [user, posts, comments] = await Promise.all([\n    fetchUser(1),\n    fetchPosts(1),\n    fetchComments(1)\n  ]);\n} catch (e) {\n  console.error('One of them failed');\n}\n\n// Promise.allSettled: чекай всіх, не fail на помилці\nconst results = await Promise.allSettled([\n  fetchUser(1),\n  fetchUser(2),\n  fetchUser(3)\n]);\n// [{ status: 'fulfilled', value: {...} }, { status: 'rejected', reason: Error }]\n\n// Promise.race: першу завершену (success або fail)\nconst winner = await Promise.race([\n  fetchWithTimeout(3000),\n  fetchWithRetry()\n]); // Яка швидша"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert alert-good\">\n            <strong>Best Practice:</strong> debounce для search/input, throttle для scroll/resize. TaskQueue для послідовного виконання. Promise.allSettled для всіх результатів без fail.\n          </div><div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у ES2025+</div><div class=\"changelog-row\"><span class=\"chver\">ES2025</span><span class=\"changelog-text\">Async context managers, better Promise pooling primitives</span></div></div>"
        }
      ]
    },
  ]
}

// Окрема сторінка формату "Посилання" (peer до Extended/Cheatsheet/Quiz) —
// раніше жило як останній scroll-розділ javascriptContent.
export const javascriptLinks: TopicContent = {
  slug: 'javascript',
  intro: [
    {
      kind: 'paragraph',
      html: '<p>Статті, специфікації та офіційна документація, які варто прочитати повністю за посиланням — тут лише короткий орієнтир, чому вони варті часу. Наведи курсор на посилання, щоб побачити опис.</p>',
    },
  ],
  sections: [
    {
      id: 'korysni-posylannya',
      title: '🔗 Корисні посилання',
      interviewQuestions: [
        {
          question: 'Як ти особисто слідкуєш за змінами в мові/специфікації JS та TypeScript, щоб не відстати від актуальних практик?',
          answer: 'Регулярний перегляд TC39 proposals (які фічі на якій стадії — stage 3/4 варто вже знати), release notes TypeScript і V8 blog для змін у рушії, плюс практика перевіряти незнайомі API на caniuse/MDN перед використанням у продакшн-коді, а не покладатись на застарілі знання.',
        },
        {
          question: 'Наскільки важливо для сеньйора вміти читати офіційну специфікацію (ECMA-262) чи документацію рушія, а не лише статті-пояснення?',
          answer: "Статті часто спрощують чи застарівають швидше за офіційні джерела; специфікація й документація рушія (наприклад, V8 blog) — першоджерело істини для тонких деталей поведінки (порядок виконання мікротасок, edge cases coercion), які саме такі деталі часто перевіряють на співбесідах сеньйорського рівня.",
        },
      ],
      blocks: [
        {
          kind: 'links',
          items: [
            {
              href: 'https://dou.ua/forums/topic/59216/',
              title: 'Раз і назавжди про this в JS людською мовою',
              description: "Розбір this через 4 послідовні критерії, які застосовує рушій JS: (1) arrow function? — this лексичний; (2) було explicit-прив'язування — .bind()/.call()/.apply()?; (3) спосіб виклику — new / метод об'єкта / самостійний виклик; (4) якщо самостійний виклик — strict mode (undefined) чи sloppy mode (window). Arrow function ігнорує всі інші правила.",
            },
            {
              href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
              title: 'MDN — Promise, повний довідник',
              description: 'Офіційний опис усіх станів Promise, комбінаторів (all/allSettled/race/any) і чому відхилений проміс без обробника кидає unhandledrejection — першоджерело, а не переказ.',
            },
            {
              href: 'https://javascript.info/event-loop',
              title: 'javascript.info — Event Loop: мікро- і макрозадачі',
              description: 'Покроковий розбір, чому мікрозадачі (Promise-колбеки) завжди виконуються раніше наступного макрозавдання (setTimeout) — з візуалізацією черг, а не лише формулюванням правила.',
            },
            {
              href: 'https://v8.dev/blog/fast-properties',
              title: 'V8 blog — Fast properties in V8 (Hidden Classes)',
              description: "Як V8 оптимізує доступ до властивостей об'єктів через приховані класи (hidden classes) і чому непослідовне створення однотипних об'єктів (різний порядок полів) деоптимізує код.",
            },
            {
              href: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
              title: 'TypeScript Handbook — Narrowing',
              description: "Офіційний розділ про звуження типів: control-flow analysis, typeof/instanceof/in guards, user-defined type predicates (x is T) — основа для дискримінованих union.",
            },
            {
              href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
              title: 'TypeScript Handbook — Utility Types',
              description: 'Повний перелік вбудованих utility types (Partial, Pick, Omit, Record, ReturnType...) з прикладами — швидше й точніше за будь-який переказ.',
            },
            {
              href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management',
              title: 'MDN — Memory Management',
              description: "Офіційний опис моделі памʼяті JS: reachability, mark-and-sweep, чому reference counting не збирає цикли — база для впевненої відповіді про GC на співбесіді.",
            },
            {
              href: 'https://tc39.es/process-document/',
              title: 'TC39 — TC39 Process (стадії пропозицій)',
              description: "Як нова фіча мови проходить шлях від ідеї (Stage 0) до стандарту (Stage 4) — розуміння цього процесу пояснює, чому одні фічі вже можна використовувати в проді, а інші — ще ні.",
            },
          ],
        },
      ],
    },
  ],
}

export const javascriptCheat: TopicContent = {
  slug: 'javascript',
  sections: [
    {
      id: 'type-system-interfaces',
      title: '🧩 Type System & Interfaces',
      interviewQuestions: [
        {
          question: 'Чому <code>typeof null === "object"</code> вважається класичним багом мови, і як він впливає на type narrowing?',
          answer: 'Це historical artifact JS (помилка в оригінальній реалізації 1995 року, яку не можна виправити без поламки сумісності). Наслідок для TS: перевірка <code>typeof x === "object"</code> НЕ відсіює <code>null</code> — потрібна окрема явна перевірка <code>x !== null</code> перед або разом з typeof-guard.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">unknown vs any vs never <span class="tag tag-key">KEY</span></h3><div class="table-wrap"><table>
      <tr><th>Тип</th><th>Приймає значення</th><th>Використання без перевірки</th><th>Роль</th></tr>
      <tr><td><code>unknown</code></td><td>будь-які</td><td>ні — треба narrowing</td><td>безпечний топ-тип</td></tr>
      <tr><td><code>any</code></td><td>будь-які</td><td>так — перевірки вимкнено</td><td>втеча від типізації</td></tr>
      <tr><td><code>never</code></td><td>жодних</td><td>—</td><td>низ-тип, недосяжний код</td></tr>
      <tr><td><code>void</code></td><td>—</td><td>функція нічого не повертає</td><td>ширше за never (все ж undefined)</td></tr>
    </table></div>
  <p><code>unknown</code> замість <code>any</code> для API-відповідей, <code>JSON.parse</code>, <code>catch (e: unknown)</code>. <code>never</code> — для функцій, що не повертають (throw), і exhaustiveness checks.</p>
  <h3 class="topic">Discriminated Unions <span class="tag tag-key">KEY</span></h3>
  <p>Union, де кожен член має спільне <strong>літеральне поле-дискримінатор</strong>. Три складові: спільне поле + літеральний тип (<code>'circle'</code>, не <code>string</code>) + union. Ключова фраза: «make illegal states unrepresentable».</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.side ** 2;
    default:
      const _e: never = s;   // новий member Shape → compile error тут
  }
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Narrowing — способи звуження</h3><div class="table-wrap"><table>
      <tr><th>Спосіб</th><th>Для чого</th></tr>
      <tr><td><code>typeof x === 'string'</code></td><td>примітиви</td></tr>
      <tr><td><code>x instanceof Date</code></td><td>класи / прототип</td></tr>
      <tr><td><code>'radius' in s</code></td><td>наявність властивості</td></tr>
      <tr><td><code>s.kind === 'circle'</code></td><td>дискримінант (найнадійніше)</td></tr>
      <tr><td>user-defined guard: <code>x is T</code></td><td>власна логіка звуження</td></tr>
      <tr><td>assertion function: <code>asserts cond</code></td><td>кидає й звужує далі по коду</td></tr>
    </table></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><code>typeof null === 'object'</code> — класичний баг, <code>null</code> не відсіється через <code>typeof</code>. І: звуження «протікає» (втрачається) після <code>await</code> або всередині замикання — TS може скинути раніше встановлений тип.</span></div>
  <h3 class="topic">Abstract class vs Interface</h3><div class="table-wrap"><table>
      <tr><th></th><th>Interface</th><th>Abstract class</th></tr>
      <tr><td>Рантайм</td><td>Ні (стирається)</td><td>Так</td></tr>
      <tr><td>Реалізація / стан</td><td>Ні</td><td>Так (+ abstract-методи)</td></tr>
      <tr><td>Кількість</td><td><code>implements</code> кількох</td><td><code>extends</code> одного</td></tr>
    </table></div>`,
        },
      ],
    },
    {
      id: 'functions-closures-scope',
      title: '🔧 Functions, Closures & Scope',
      interviewQuestions: [
        {
          question: 'Що саме захоплює замикання — значення змінної на момент створення, чи саму змінну?',
          answer: 'Саму змінну (посилання/binding), не її значення на момент створення функції. Тому <code>var</code> у циклі дає одне спільне звʼязування на всі ітерації (класична пастка "3,3,3"), а <code>let</code> створює нове звʼязування щоразу.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Hoisting: Declaration vs Expression <span class="tag tag-key">KEY</span></h3><div class="table-wrap"><table>
      <tr><th>Конструкція</th><th>Піднімається</th><th>До оголошення</th></tr>
      <tr><td><code>function foo(){}</code></td><td>імʼя + тіло</td><td>✅ виклик працює</td></tr>
      <tr><td><code>var x</code></td><td>імʼя, <code>= undefined</code></td><td><code>undefined</code></td></tr>
      <tr><td><code>var f = function(){}</code></td><td>лише <code>var f</code></td><td><code>undefined</code>, виклик → TypeError</td></tr>
      <tr><td><code>let</code> / <code>const</code></td><td>імʼя (без ініціалізації)</td><td>❌ ReferenceError (TDZ)</td></tr>
    </table></div>
  <p>Hoisting піднімає <strong>оголошення</strong>, не <strong>присвоєння</strong>. «<code>let</code> не піднімається» — технічно неточно: піднімається, але блокований TDZ.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `console.log(a);  // undefined (var)
var a = 1;
console.log(b);  // ❌ ReferenceError (TDZ)
let b = 2;`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Closures <span class="tag tag-key">KEY</span></h3><div class="grid2">
    <pre><span class="cmt">// Bug: var в циклі</span>
<span class="kw">for</span> (<span class="kw">var</span> i = <span class="num">0</span>; i &lt; <span class="num">3</span>; i++) {
  <span class="fn">setTimeout</span>(() =&gt; <span class="fn">console</span>.<span class="fn">log</span>(i), <span class="num">0</span>);
}
<span class="cmt">// Output: 3, 3, 3 ❌ — var одна змінна на цикл</span>

<span class="cmt">// Fix: let — нове звʼязування на кожну ітерацію</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="num">0</span>; i &lt; <span class="num">3</span>; i++) {
  <span class="fn">setTimeout</span>(() =&gt; <span class="fn">console</span>.<span class="fn">log</span>(i), <span class="num">0</span>);
}
<span class="cmt">// Output: 0, 1, 2 ✅</span></pre>
    <pre><span class="cmt">// Замикання захоплює ЗМІННУ (посилання), не значення</span>
<span class="kw">function</span> <span class="fn">makeCounter</span>() {
  <span class="kw">let</span> count = <span class="num">0</span>;
  <span class="kw">return</span> () =&gt; ++count;
}
<span class="kw">const</span> inc = <span class="fn">makeCounter</span>();
<span class="fn">inc</span>(); <span class="cmt">// 1</span>
<span class="fn">inc</span>(); <span class="cmt">// 2 — count живе, поки жива inc</span></pre>
  </div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'memoize — класичний приклад на закриттях',
          code: `function memoize<Args extends unknown[], R>(fn: (...args: Args) => R) {
  const cache = new Map<string, R>();
  return (...args: Args): R => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key)!;
  };
}`,
        },
      ],
    },
    {
      id: 'this-binding-callapplybind',
      title: '🎯 This Binding & call/apply/bind',
      interviewQuestions: [
        {
          question: 'Метод обʼєкта передали як колбек окремо (напр. <code>setTimeout(obj.method)</code>) — чому <code>this</code> губиться, і як це виправити?',
          answer: '<code>this</code> визначається способом ВИКЛИКУ, а не місцем визначення методу. Відʼєднавши <code>obj.method</code> від <code>obj</code> (передавши як окреме значення), викликач втрачає "обʼєкт перед крапкою" — implicit binding зникає, this стає undefined/global. Фікс: <code>.bind(obj)</code> або стрілкове поле класу (яке лексично захоплює this).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">this — 4 правила</h3><div class="table-wrap"><table>
      <tr><th>Rule</th><th>this =</th></tr>
      <tr><td>Default</td><td>undefined (strict) / global (sloppy)</td></tr>
      <tr><td>Implicit</td><td>Обʼєкт перед крапкою</td></tr>
      <tr><td>Explicit</td><td>call/apply/bind перший аргумент</td></tr>
      <tr><td><code>new</code></td><td>Новий обʼєкт</td></tr>
      <tr><td>Arrow</td><td>Лексичний this (не змінюється жодним з вищих правил!)</td></tr>
    </table></div>
  <h3 class="topic">.call() / .apply() / .bind() <span class="tag tag-key">KEY</span></h3><div class="table-wrap"><table>
      <tr><th>Метод</th><th>Викликає одразу</th><th>Аргументи</th><th>Повертає</th></tr>
      <tr><td><code>.call()</code></td><td>✅ так</td><td>списком через кому</td><td>результат</td></tr>
      <tr><td><code>.apply()</code></td><td>✅ так</td><td>масивом</td><td>результат</td></tr>
      <tr><td><code>.bind()</code></td><td>❌ ні</td><td>списком (частково)</td><td>нову привʼязану функцію</td></tr>
    </table></div>
  <div class="alert warn"><span class="icon">⚠️</span><span>Arrow-функції ігнорують усі три — <code>this</code> береться лексично, bind/call/apply на неї не діють. <code>new</code> сильніший за <code>bind</code>; повторний <code>.bind()</code> не перепризначає <code>this</code> вдруге.</span></div>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `const obj = {
  name: 'Roman',
  greet() { console.log(this.name); },              // ✅ implicit
  greetArrow: () => console.log(this?.name),         // ❌ лексичний this
};

const fn = obj.greet;
fn();          // undefined — implicit binding втрачено при відʼєднанні
fn.call(obj);  // 'Roman' — explicit binding`,
        },
      ],
    },
    {
      id: 'async-promises-event-loop',
      title: '⚡ Async, Promises & Event Loop',
      interviewQuestions: [
        {
          question: 'Чому <code>Promise.all</code> vs <code>Promise.allSettled</code> — не взаємозамінні, а рішення для різних задач?',
          answer: '<code>Promise.all</code> — fail-fast: якщо хоч один проміс відхилиться, весь виклик одразу reject, результати успішних гілок втрачаються. <code>Promise.allSettled</code> ніколи не reject — чекає завершення ВСІХ (успішних і невдалих) і повертає масив статусів. Вибір залежить від того, чи потрібні часткові результати при частковому провалі.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Event Loop <span class="tag tag-key">KEY</span></h3><div class="table-wrap"><table>
      <tr><th>Черга</th><th>Що потрапляє</th><th>Пріоритет</th></tr>
      <tr><td><strong>Call Stack</strong></td><td>Поточний sync код</td><td>Виконується зараз</td></tr>
      <tr><td><strong>Microtask Queue</strong></td><td>Promise.then/catch, queueMicrotask</td><td>🔴 Найвищий — дренується повністю після кожної macrotask</td></tr>
      <tr><td><strong>Macrotask Queue</strong></td><td>setTimeout, DOM events, I/O</td><td>🟡 Одна за раз</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `console.log('1');                                 // sync
setTimeout(() => console.log('2'), 0);            // macrotask
Promise.resolve().then(() => console.log('3'));   // microtask
queueMicrotask(() => console.log('4'));           // microtask
console.log('5');                                 // sync
// OUTPUT: 1, 5, 3, 4, 2`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Promise — стани <span class="tag tag-key">KEY</span></h3><div class="table-wrap"><table>
      <tr><th>Стан</th><th>Опис</th></tr>
      <tr><td><code>pending</code></td><td>початковий, ще не resolved</td></tr>
      <tr><td><code>fulfilled</code></td><td>успіх, отримав value</td></tr>
      <tr><td><code>rejected</code></td><td>помилка, отримав reason</td></tr>
    </table></div>
  <p><strong>Settled</strong> = fulfilled або rejected. Перехід односторонній і одноразовий — повторний <code>resolve()</code>/<code>reject()</code> ігнорується.</p>
  <h3 class="topic">Promise combinators</h3><div class="table-wrap"><table>
      <tr><th>Метод</th><th>Resolve коли</th><th>Reject коли</th><th>Use case</th></tr>
      <tr><td><code>Promise.all([])</code></td><td>Всі resolved</td><td>Будь-який rejected</td><td>Паралельні незалежні запити (fail-fast)</td></tr>
      <tr><td><code>Promise.allSettled([])</code></td><td>Всі завершились</td><td>Ніколи</td><td>Всі результати навіть при помилках</td></tr>
      <tr><td><code>Promise.race([])</code></td><td>Перший settled</td><td>Перший rejected</td><td>Timeout pattern</td></tr>
      <tr><td><code>Promise.any([])</code></td><td>Перший resolved</td><td>Всі rejected (AggregateError)</td><td>Перший успішний з кількох джерел</td></tr>
    </table></div>
  <div class="alert warn"><span class="icon">⚠️</span><span>Забув <code>resolve</code>/<code>reject</code> на якійсь гілці → проміс лишається <code>pending</code> назавжди («зависання»).</span></div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Типова пастка: await послідовно замість паралельно',
          code: `// ❌ Послідовно (повільніше) — другий await чекає на перший
async function loadSlow() {
  const a = await fetchA();
  const b = await fetchB();
  return [a, b];
}

// ✅ Паралельно — обидва запити стартують одразу
async function loadFast() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
  return [a, b];
}

// Timeout через AbortController
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);
try {
  await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timeout);
}`,
        },
      ],
    },
    {
      id: 'prototypes-classes',
      title: '🏛️ Prototypes & Classes',
      interviewQuestions: [
        {
          question: 'Чим <code>.prototype</code> відрізняється від внутрішнього <code>[[Prototype]]</code> обʼєкта?',
          answer: '<code>.prototype</code> — властивість самого КОНСТРУКТОРА (функції/класу), що визначає, яким буде <code>[[Prototype]]</code> кожного інстанція, створеного через <code>new</code>. <code>[[Prototype]]</code> — внутрішнє посилання КОНКРЕТНОГО обʼєкта на його прототип у ланцюжку (читається через <code>Object.getPrototypeOf</code>). Тобто перше — "шаблон для майбутніх інстанцій", друге — "фактичний зв\'язок цього обʼєкта".',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Prototype Chain <span class="tag tag-key">KEY</span></h3>
  <p>Ланцюг <code>[[Prototype]]</code>-посилань, яким рушій піднімається під час пошуку властивості до першого збігу або <code>null</code>. <code>[[Prototype]]</code> — внутрішнє посилання самого обʼєкта; <code>.prototype</code> — властивість <strong>конструктора</strong>, що стає <code>[[Prototype]]</code> для інстанцій через <code>new</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `function User(name) { this.name = name; }
User.prototype.greet = function () { return 'Hi ' + this.name; };
const u = new User('R');

Object.getPrototypeOf(u) === User.prototype;  // true
u instanceof User;                             // true — User.prototype у ланцюжку

// Lookup: u → u.__proto__ (User.prototype) → Object.prototype → null
// hasOwnProperty — лише власні; for...in — і успадковані enumerable`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Class vs Constructor Function <span class="tag tag-key">KEY</span></h3><div class="table-wrap"><table>
      <tr><th></th><th>class</th><th>constructor function</th></tr>
      <tr><td>Hoisting</td><td>Hoisted, але TDZ</td><td>Повністю hoisted</td></tr>
      <tr><td>Strict mode</td><td>Завжди, автоматично</td><td>Лише якщо явно 'use strict'</td></tr>
      <tr><td>Методи на прототипі</td><td>Non-enumerable</td><td>Enumerable (видно у for...in)</td></tr>
      <tr><td>Виклик без <code>new</code></td><td>❌ TypeError</td><td>Виконається, this = undefined/global</td></tr>
      <tr><td>Private fields (<code>#</code>)</td><td>✅</td><td>❌</td></tr>
      <tr><td>extends/super</td><td>✅ вбудовано</td><td>Вручну через Object.create/.call</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Private fields (#), static, inheritance',
          code: `class User {
  #password;              // істинна приватність — SyntaxError ззовні класу
  static count = 0;       // на класі, не на інстанції

  constructor(name, pass) {
    this.name = name;
    this.#password = pass;
    User.count++;
  }
  checkPassword(guess) { return guess === this.#password; }
}

class Admin extends User {
  constructor(name, pass, level) {
    super(name, pass);    // ОБОВ'ЯЗКОВО перед this — інакше ReferenceError
    this.level = level;
  }
}

new User('Alice', 'x').name; // 'Alice'
User.count;                  // 1 — static, доступ без new`,
        },
        {
          kind: 'flashcards',
          items: [
            {
              question: 'Що станеться, якщо викликати клас без <code>new</code>, напр. <code>Animal()</code>?',
              answer: '<strong>TypeError</strong>: Class constructor cannot be invoked without \'new\'. Constructor function натомість просто виконається (this = undefined у strict mode).',
            },
            {
              question: 'Чому <code>super()</code> обовʼязковий перед використанням <code>this</code> у підкласі?',
              answer: 'У класі з <code>extends</code> <code>this</code> ініціалізується батьківським конструктором — звернення до <code>this</code> до <code>super()</code> кидає ReferenceError.',
            },
            {
              question: 'Чим <code>#field</code> відрізняється від конвенції <code>_field</code>?',
              answer: '<code>#field</code> — недоступне ззовні на мовному рівні (SyntaxError). <code>_field</code> — лише конвенція, технічно публічне поле.',
            },
          ],
        },
      ],
    },
    {
      id: 'modules-esm-vs-cjs',
      title: '📦 Modules (ESM vs CJS)',
      interviewQuestions: [
        {
          question: 'Чому tree-shaking практично неможливий для CommonJS, але природний для ES Modules?',
          answer: 'ESM-імпорти статичні — граф залежностей відомий бандлеру ще до виконання коду (compile time), тож невикористаний експорт можна безпечно вирізати. CommonJS <code>require()</code> — звичайний виклик функції, що може ховатись за умовою чи динамічним рядком (<code>require(path)</code>) — статичний аналіз не може гарантовано визначити, що саме буде імпортовано, тож бандлер змушений лишати весь модуль.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th></th><th>ES Modules (ESM)</th><th>CommonJS (CJS)</th></tr>
      <tr><td>Синтаксис</td><td><code>import/export</code></td><td><code>require/module.exports</code></td></tr>
      <tr><td>Час резолюції</td><td>Static (compile time)</td><td>Dynamic (runtime)</td></tr>
      <tr><td>Tree-shaking</td><td>✅ Так</td><td>❌ Важко</td></tr>
      <tr><td>Top-level await</td><td>✅</td><td>❌</td></tr>
      <tr><td>Circular deps</td><td>Live bindings</td><td>Кешовані копії</td></tr>
      <tr><td>Dynamic import</td><td><code>import('./m')</code> → Promise</td><td><code>require('./m')</code> sync</td></tr>
    </table></div>`,
        },
      ],
    },
    {
      id: 'generics-typescript-expanded',
      title: '🔬 Generics (TypeScript)',
      interviewQuestions: [
        {
          question: 'Навіщо потрібен <code>extends</code> у generic-обмеженні (<code>&lt;T extends HasLength&gt;</code>), якщо generic і так приймає будь-який тип?',
          answer: 'Без обмеження компілятор знає лише, що T — "якийсь тип", і забороняє звертатись до будь-яких полів усередині функції (бо не всі типи їх мають). <code>extends HasLength</code> звужує T до типів, що гарантовано мають <code>.length</code> — тепер компілятор дозволяє <code>a.length</code> усередині функції, зберігаючи при цьому конкретний тип T на виході (а не звужуючи його до самого HasLength).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Generic Functions & Constraints <span class="tag tag-key">KEY</span></h3>
  <p><code>extends</code> обмежує, які типи допустимі для generic-параметра — без цього TS дозволяє передати будь-що, включно з типами без потрібних полів.</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `function identity<T>(value: T): T { return value; }

interface HasLength { length: number; }
function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest('abc', 'de');       // ✅ string має length
longest([1, 2], [3]);       // ✅ масив має length
longest(5, 10);              // ❌ number не має length`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Mapped Types + infer</h3>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `// Mapped type — трансформує кожне поле T
type Optional<T> = { [K in keyof T]?: T[K] };

// Conditional type + infer — "розпакувати" тип зсередини іншого
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type FirstArg<T> = T extends (arg: infer A, ...rest: any[]) => any ? A : never;`,
        },
      ],
    },
    {
      id: 'utility-types-typescript-expanded',
      title: '🛠️ Utility Types (TypeScript)',
      interviewQuestions: [
        {
          question: 'Чим <code>Record&lt;K, V&gt;</code> як compile-time тип відрізняється від рантайм-структури <code>Map&lt;K, V&gt;</code>?',
          answer: '<code>Record</code> — це лише тип для звичайного JS-обʼєкта (вигляду key → V) — існує тільки на етапі компіляції, стирається в рантаймі, серіалізується напряму в JSON. <code>Map</code> — реальна структура даних із власними методами (<code>.get/.set/.has</code>), що існує й у рантаймі, підтримує будь-який тип ключа (не лише string/symbol) і не серіалізується в JSON без ручного перетворення.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>Тип</th><th>Що робить</th></tr>
      <tr><td><code>Partial&lt;T&gt;</code></td><td>поля → опційні</td></tr>
      <tr><td><code>Required&lt;T&gt;</code></td><td>поля → обовʼязкові</td></tr>
      <tr><td><code>Readonly&lt;T&gt;</code></td><td>поля → тільки читання</td></tr>
      <tr><td><code>Pick&lt;T,K&gt;</code></td><td>лишити поля K</td></tr>
      <tr><td><code>Omit&lt;T,K&gt;</code></td><td>прибрати поля K</td></tr>
      <tr><td><code>Record&lt;K,V&gt;</code></td><td>обʼєкт K→V (словники)</td></tr>
      <tr><td><code>Exclude&lt;U,X&gt;</code></td><td>union мінус X</td></tr>
      <tr><td><code>Extract&lt;U,X&gt;</code></td><td>перетин union з X</td></tr>
      <tr><td><code>NonNullable&lt;T&gt;</code></td><td>мінус null/undefined</td></tr>
      <tr><td><code>ReturnType&lt;T&gt;</code></td><td>тип результату функції</td></tr>
      <tr><td><code>Parameters&lt;T&gt;</code></td><td>кортеж параметрів</td></tr>
      <tr><td><code>Awaited&lt;T&gt;</code></td><td>розгорнути Promise</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `type UserForm = Partial<Omit<User, 'id' | 'createdAt'>>;
type Store = Record<number, User>;

// Template literal types
type EventName = \`on\${Capitalize<string>}\`;      // onClick, onHover...
type Route = \`/\${string}\`;                        // '/users', '/posts'...`,
        },
        {
          kind: 'paragraph',
          html: `<p>Більшість побудовані на mapped/conditional types (розділ Generics вище) — за потреби пишеш власний аналог.</p>
  <h3 class="topic">tsconfig — важливі опції</h3><div class="table-wrap"><table>
      <tr><th>Опція</th><th>Що робить</th></tr>
      <tr><td><code>strict: true</code></td><td>Вмикає всі strict-режими (strictNullChecks, noImplicitAny...)</td></tr>
      <tr><td><code>noUncheckedIndexedAccess</code></td><td><code>arr[i]</code> → <code>T | undefined</code>, а не просто <code>T</code></td></tr>
      <tr><td><code>noImplicitReturns</code></td><td>Помилка, якщо не всі гілки повертають значення</td></tr>
    </table></div>`,
        },
      ],
    },
    {
      id: 'error-handling-trycatchfinally-custom-errors',
      title: '⚠️ Error Handling — try/catch/finally & Custom Errors',
      interviewQuestions: [
        {
          question: 'Чому тип помилки в TypeScript-блоці catch(e: unknown), а не Error, і як з цим коректно працювати?',
          answer: 'JS дозволяє кинути (throw) буквально будь-яке значення, не лише Error (throw "text", throw 42 — технічно валідно) — тому TS не може гарантувати, що спіймане в catch буде саме Error. Коректний підхід: явна перевірка instanceof Error перед доступом до .message/.stack, з fallback (напр. String(e)) для нестандартних кидків.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">try/catch/finally <span class="tag tag-key">KEY</span></h3>
  <p><code>finally</code> виконується завжди — навіть якщо в <code>try</code>/<code>catch</code> є <code>return</code> (значення з <code>finally</code>'s <code>return</code> перекриє попереднє, якщо там теж є <code>return</code> — рідкісна, але реальна пастка).</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Custom Error класи',
          code: `class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';       // інакше буде просто 'Error'
    Object.setPrototypeOf(this, ValidationError.prototype); // для instanceof у старих таргетах
  }
}

try {
  throw new ValidationError('Email invalid', 'email');
} catch (e) {
  if (e instanceof ValidationError) console.log(e.field);
  else throw e;                          // не своя помилка — прокинути далі
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Error.cause & async errors</h3>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `// Error.cause (ES2022) — зберегти оригінальну причину при обгортанні
try {
  await fetchUser(id);
} catch (err) {
  throw new Error('Failed to load user', { cause: err });
}

// catch (e: unknown) — тип помилки в TS завжди unknown, не Error
catch (e: unknown) {
  const message = e instanceof Error ? e.message : String(e);
}`,
        },
      ],
    },
    {
      id: 'iterators-generators-yield-async-generators',
      title: '🔄 Iterators & Generators — yield & Async Generators',
      interviewQuestions: [
        {
          question: 'У чому принципова різниця виконання generator-функції порівняно зі звичайною функцією?',
          answer: 'Звичайна функція виконується від початку до кінця за один прохід при виклику. Generator-функція при виклику НЕ виконує тіло одразу — повертає ітератор, і тіло виконується поступово, порціями між викликами .next(), зупиняючись на кожному yield і зберігаючи весь локальний стан (замикання) до наступного виклику.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Iterator Protocol</h3>
  <p>Обʼєкт ітерований, якщо має <code>[Symbol.iterator]()</code>, що повертає iterator з <code>.next()</code> → <code>{'{'} value, done {'}'}</code>. Generator-функції (<code>function*</code>) реалізують цей протокол автоматично.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `function* counter() {
  let i = 0;
  while (true) yield i++;
}
const gen = counter();
gen.next(); // { value: 0, done: false }
gen.next(); // { value: 1, done: false }

// Async generator — потоки з await всередині
async function* streamData(source) {
  for (const chunk of source) yield await process(chunk);
}
for await (const item of streamData(source)) { /* ... */ }`,
        },
      ],
    },
    {
      id: 'destructuring-array-object-patterns',
      title: '📦 Destructuring — Array & Object Patterns',
      interviewQuestions: [
        {
          question: 'Чому вираз count ?? 0 і count || 0 дають різний результат саме коли count дорівнює 0, і яка з них правильна для лічильника?',
          answer: '?? перевіряє лише null/undefined — якщо count вже дорівнює 0 (валідне число), ?? його не чіпає, лишає 0. || перевіряє будь-яку falsy-цінність, включно з 0, — тому || замінить справжній нуль на дефолтне значення, що для лічильника майже завжди є багом. Для значень, де 0 — легітимний результат, правильний вибір — ??.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
    <div><h3 class="topic">Destructuring</h3><pre><span class="cmt">// Object: rename + default</span>
<span class="kw">const</span> { name: n = <span class="str">'anon'</span>, age } = user;
<span class="cmt">// Array: пропуск елементів</span>
<span class="kw">const</span> [first, , third] = arr;
<span class="cmt">// Nested</span>
<span class="kw">const</span> { a: { b: { c } } } = obj;</pre></div>
    <div><h3 class="topic">Spread / Rest</h3><pre><span class="kw">const</span> arr2 = [...arr1, newItem];
<span class="kw">const</span> obj2 = { ...obj1, key: val };
<span class="kw">function</span> <span class="fn">sum</span>(...nums) {
  <span class="kw">return</span> nums.<span class="fn">reduce</span>((a,b) =&gt; a+b, <span class="num">0</span>);
}</pre></div>
  </div>
  <h3 class="topic">Optional Chaining + Nullish Coalescing <span class="tag tag-pit">PITFALL</span></h3>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `user?.address?.city    // undefined якщо будь-що null/undefined
arr?.[0]                // масив може бути undefined
fn?.()                   // виклик лише якщо fn існує

val ?? 'default'         // ТІЛЬКИ null/undefined → default
val || 'default'         // будь-який falsy (0, '', false) → default
// ⚠️ count ?? 0 → 0 лишається 0, якщо count вже 0. count || 0 замінить і 0, і '' — типовий баг`,
        },
      ],
    },
    {
      id: 'design-patterns-observer-factory-singleton-proxy',
      title: '🏗️ Design Patterns — Observer, Factory, Singleton, Proxy',
      interviewQuestions: [
        {
          question: 'Яка найчастіша практична помилка в реалізації Observer pattern, і чим вона небезпечна?',
          answer: 'Незняті підписки (відсутній виклик unsubscribe/cleanup-функції) — subject тримає посилання на observer навіть після того, як він логічно більше не потрібен (напр. компонент розмонтувався). Це пряма причина memory leak: observer і все, що він захоплює через замикання, лишається живим, поки живий subject.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Observer Pattern <span class="tag tag-key">KEY</span></h3>
  <p>Subject тримає список observers і автоматично сповіщає їх про зміни — «один-до-багатьох» зі слабкою звʼязністю. Фундамент: DOM-події, RxJS, Redux <code>store.subscribe</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `class Subject {
  #observers = new Set();
  subscribe(o) { this.#observers.add(o); return () => this.#observers.delete(o); }
  notify(data) { this.#observers.forEach(o => o.update(data)); }
}
// ⚠️ Головна пастка — витоки через незняті підписки. Cleanup обов'язковий.`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Factory Pattern</h3>
  <p>Функція/метод, що створює й повертає обʼєкти, приховуючи логіку створення — замість прямого <code>new</code>. На фронтенді: <code>createStore</code> (Zustand/Redux), RxJS creation operators.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `function createShape(kind, opts) {
  switch (kind) {
    case 'circle': return new Circle(opts.radius);
    case 'square': return new Square(opts.side);
  }
}
// Клієнт не знає конкретний клас — лише інтерфейс. Вибір типу — в рантаймі.`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Proxy</h3>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `const p = new Proxy(target, {
  get(obj, key) { return track(obj, key); },      // перехопити читання
  set(obj, key, val) { trigger(key); obj[key] = val; return true; }, // перехопити запис
});
// Основа реактивності у Vue 3 та подібних бібліотеках`,
        },
      ],
    },
    {
      id: 'built-in-objects-map-set-array-object-methods',
      title: '⚙️ Built-in Objects — Map, Set, Array, Object Methods',
      interviewQuestions: [
        {
          question: 'Яким алгоритмом порівняння Map і Set вважають два ключі/значення однаковими, і чим це відрізняється від звичайного ===?',
          answer: 'SameValueZero — практично те саме, що ===, з єдиним винятком: NaN === NaN дає false, а SameValueZero вважає NaN рівним самому собі. Тому Set може містити лише один NaN (другий вважається дублікатом), хоча NaN === NaN у звичайному коді завжди false.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Map & Set <span class="tag tag-key">KEY</span></h3>
  <p><strong>Map</strong> — ключ→значення з ключами будь-якого типу. <strong>Set</strong> — унікальні значення. Обидва iterable, зберігають порядок вставлення, порівнюють через <strong>SameValueZero</strong> (<code>NaN === NaN</code> тут true, обʼєкти — за посиланням).</p>
  <h3 class="topic">Map vs Object</h3><div class="table-wrap"><table>
      <tr><th></th><th>Map</th><th>Object</th></tr>
      <tr><td>Ключі</td><td>будь-який тип</td><td>string / symbol</td></tr>
      <tr><td>Розмір</td><td><code>.size</code></td><td><code>Object.keys().length</code></td></tr>
      <tr><td>Продуктивність</td><td>часті add/delete</td><td>статичні записи</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `const unique = [...new Set([1, 1, 2, 3])];  // [1,2,3] — O(1) has() замість O(n) includes()
const m = new Map([['a', 1]]);
m.set('b', 2).set('c', 3);                    // set() чейниться

Object.keys(obj) / Object.values(obj) / Object.entries(obj)
Object.fromEntries(m)                          // Map → Object
Object.assign(target, src)                     // shallow merge, мутує
Object.freeze(obj)                             // shallow immutable
structuredClone(original)                      // deep clone (Date/Map/Set/RegExp — не функції/DOM)`,
        },
      ],
    },
    {
      id: 'browser-apis-fetch-abortcontroller-intersectionobserver',
      title: '🌐 Browser APIs — Fetch, AbortController, IntersectionObserver',
      interviewQuestions: [
        {
          question: 'Чому IntersectionObserver вважається кращим рішенням для lazy-loading зображень, ніж ручний listener на scroll?',
          answer: 'scroll-listener спрацьовує синхронно на кожен піксель прокрутки й змушує вручну рахувати getBoundingClientRect() (форсований reflow) для кожного елемента — дорого й блокує main thread. IntersectionObserver рахує перетин асинхронно, у власному потоці браузера, і сповіщає лише при реальній зміні видимості — на порядки дешевше при великій кількості елементів.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>API</th><th>Навіщо</th></tr>
      <tr><td><strong>AbortController</strong></td><td>Скасування fetch/будь-якої async-операції ззовні — <code>controller.abort()</code>, слухається через <code>signal</code></td></tr>
      <tr><td><strong>IntersectionObserver</strong></td><td>Дізнатись, коли елемент увійшов у viewport — lazy-loading зображень, infinite scroll, без scroll-листенерів</td></tr>
      <tr><td><strong>requestAnimationFrame</strong></td><td>Виклик перед кожним кадром (~60fps) — для анімацій, синхронізовано з рендерингом браузера</td></tr>
      <tr><td><strong>Event Delegation</strong></td><td>Один listener на батьківському елементі замість N на дітях — <code>event.target</code> для ідентифікації</td></tr>
      <tr><td><strong>localStorage / sessionStorage</strong></td><td>localStorage — до явного очищення; sessionStorage — до закриття вкладки. Обидва ~5MB, синхронні, лише рядки</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();  // скасовує запит, fetch кине AbortError

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) loadImage(e.target); });
});
observer.observe(imgElement);`,
        },
      ],
    },
    {
      id: 'testing-jest-vitest-describetestexpect',
      title: '✅ Testing — Jest, Vitest, describe/test/expect',
      interviewQuestions: [
        {
          question: 'Чим toBe відрізняється від toEqual, і чому використання не тієї з них — типова причина хибно-падаючих тестів на обʼєктах?',
          answer: 'toBe — строга рівність через Object.is (===), для обʼєктів/масивів це порівняння за посиланням. toEqual — глибоке порівняння вмісту, рекурсивно звіряє поля. Тест виду expect(getUser()).toBe({ name: "R" }) впаде завжди, навіть якщо дані ідентичні — два різні літерали обʼєктів ніколи не є тим самим посиланням; для порівняння вмісту потрібен саме toEqual.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>Блок</th><th>Роль</th></tr>
      <tr><td><code>describe</code></td><td>Групує повʼязані тести</td></tr>
      <tr><td><code>test</code> / <code>it</code></td><td>Один тест-кейс</td></tr>
      <tr><td><code>expect(x).toBe(y)</code></td><td>Строга рівність (<code>Object.is</code>)</td></tr>
      <tr><td><code>expect(x).toEqual(y)</code></td><td>Глибока рівність (для обʼєктів/масивів)</td></tr>
      <tr><td><code>beforeEach</code> / <code>afterEach</code></td><td>Setup/teardown навколо кожного тесту</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });
});

// Mocking
const fetchMock = vi.fn().mockResolvedValue({ data: 'ok' });
expect(fetchMock).toHaveBeenCalledWith(url);

// Snapshot — фіксує вивід, порівнює при наступних запусках
expect(render(<Card />)).toMatchSnapshot();`,
        },
      ],
    },
    {
      id: 'performance-v8-pipeline-jit-hidden-classes-devtools',
      title: '⚡ Performance — V8 Pipeline, JIT, Hidden Classes, DevTools',
      interviewQuestions: [
        {
          question: 'Чому створення однотипних обʼєктів у різному порядку полів (напр. іноді спершу x потім y, іноді навпаки) деоптимізує код у V8?',
          answer: 'V8 призначає обʼєктам "hidden class" на основі точної послідовності доданих полів — обʼєкти з тим самим набором полів у ТОМУ САМОМУ порядку діляться одним hidden class і отримують швидкий доступ до властивостей (як до масиву за індексом). Різний порядок створення означає різні hidden classes для, по суті, однакових за формою обʼєктів — рушій втрачає можливість оптимізувати доступ і деоптимізує до повільнішого словникового режиму.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Hidden Classes (Fast Properties) <span class="tag tag-key">KEY</span></h3>
  <p>V8 оптимізує доступ до властивостей обʼєктів через приховані класи (аналог класу в class-based мовах) — обʼєкти з однаковою «формою» (той самий набір полів у тому самому порядку) діляться одним hidden class, доступ до полів стає майже таким же швидким, як до масиву.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `// ❌ Деоптимізація — різний порядок створення полів = різні hidden classes
function bad(a, b) { const o = {}; o.x = a; o.y = b; return o; }
function bad2(a, b) { const o = {}; o.y = b; o.x = a; return o; }

// ✅ Однакова "форма" з самого початку — один hidden class
function good(x, y) { return { x, y }; }`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">V8 Execution Pipeline</h3>
  <p>Parse → Ignition (bytecode-інтерпретатор, швидкий старт) → гарячий код профілюється → TurboFan (JIT-компіляція в оптимізований машинний код). Деоптимізація (bailout) назад в bytecode стається, якщо припущення профілювальника порушені (напр. тип аргументу раптом змінився).</p>
  <h3 class="topic">DevTools Profiling</h3>
  <p>Performance-таб: Flame chart показує стек викликів у часі; Memory-таб: heap snapshot для пошуку витоків (порівняння двох знімків до/після дії).</p>`,
        },
      ],
    },
    {
      id: 'heap-memory-management',
      title: "🧠 Heap та управління пам'яттю",
      interviewQuestions: [
        {
          question: 'Чому mark-and-sweep коректно збирає циклічні посилання (A тримає B, B тримає A), а reference counting — ні?',
          answer: 'Reference counting звільняє обʼєкт лише коли лічильник посилань на нього падає до нуля — у циклі A↔B лічильник кожного завжди мінімум 1 (посилання одне на одного), навіть якщо ззовні на пару вже ніхто не посилається, тож лічильник ніколи не досягає нуля. Mark-and-sweep натомість перевіряє не лічильник, а ДОСЯЖНІСТЬ від коренів (globals, стек) — якщо до циклу A↔B немає жодного шляху ззовні, обидва просто не позначаються як досяжні й прибираються разом.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
    <div>
      <h3 class="topic">Stack vs Heap</h3>
      <div class="table-wrap"><table>
        <tr><th>Stack</th><th>Heap</th></tr>
        <tr><td>примітиви, посилання, call frames</td><td>обʼєкти/масиви/функції (значення)</td></tr>
        <tr><td>LIFO, автоматично</td><td>динамічно, керує GC</td></tr>
      </table></div>
      <h3 class="topic">Common Memory Leaks</h3>
      <div class="card red"><h4>❌ Часті причини витоку памʼяті</h4>
        <p>• Event listeners без removeEventListener</p>
        <p>• setInterval/setTimeout без clear*</p>
        <p>• Closures, що захоплюють зайве</p>
        <p>• Detached DOM nodes в JS-посиланнях</p>
        <p>• Глобальний кеш (Map) без обмеження розміру → рятує WeakMap</p>
      </div>
    </div>
    <div>
      <h3 class="topic">WeakMap / WeakSet / WeakRef</h3>
      <pre style="font-size:10.5px"><span class="cmt">// WeakMap — приватні дані до обʼєктів</span>
<span class="kw">const</span> cache = <span class="kw">new</span> WeakMap();
cache.<span class="fn">set</span>(domNode, computedData);
<span class="cmt">// Якщо domNode GC → запис автоматично зникає</span>

<span class="cmt">// WeakRef — слабке посилання</span>
<span class="kw">const</span> ref = <span class="kw">new</span> WeakRef(target);
<span class="kw">const</span> obj = ref.<span class="fn">deref</span>(); <span class="cmt">// може бути undefined</span></pre>
      <h3 class="topic">GC — як працює</h3>
      <ul class="list">
        <li><strong>Reachability, не reference counting:</strong> живе те, до чого є шлях від коренів — тому цикли посилань не течуть.</li>
        <li><strong>Mark → Sweep → Compact:</strong> позначити досяжне → замести решту → ущільнити Old Space.</li>
        <li><strong>V8 generational:</strong> young (Scavenge, часто) → old (Mark-Sweep-Compact, рідко), інкрементально.</li>
      </ul>
    </div>
  </div>`,
        },
        {
          kind: 'flashcards',
          items: [
            {
              question: 'Чи рахує JS посилання для GC (reference counting)?',
              answer: 'Ні. V8 використовує <strong>reachability</strong> (mark-and-sweep): обʼєкт живий, поки є шлях до нього від roots — це дозволяє коректно звільняти цикли посилань, на відміну від reference counting.',
            },
            {
              question: 'Навіщо WeakMap, якщо є Map?',
              answer: 'Для кешів/метаданих, привʼязаних до обʼєктів (DOM-вузлів), де запис має автоматично зникати разом з ключем при GC — Map тримає strong reference і блокує збирання ключа назавжди.',
            },
            {
              question: 'Shallow copy vs deep copy?',
              answer: 'Shallow (<code>{...obj}</code>) копіює лише верхній рівень — вкладені обʼєкти лишаються спільними посиланнями. Deep (<code>structuredClone</code>) копіює все дерево незалежно (але не клонує функції/DOM-вузли).',
            },
          ],
        },
      ],
    },
    {
      id: 'symbols-custom-iterables-well-known-symbols',
      title: '🔑 Symbols & Custom Iterables — Well-Known Symbols',
      interviewQuestions: [
        {
          question: 'Чому спред-оператор ([...obj]) чи for...of не працюють на звичайному обʼєкті, хоча прекрасно працюють на масиві?',
          answer: 'Обидва механізми покладаються на протокол ітерації — наявність методу [Symbol.iterator] у обʼєкта. Масив (і Map/Set/String) реалізує цей метод "з коробки" на своєму прототипі. Звичайний object літерал — ні, тому потрібно реалізувати [Symbol.iterator]() самостійно (найпростіше — generator-методом), щоб зробити його ітерованим.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Symbol <span class="tag tag-key">KEY</span></h3>
  <p>Унікальний незмінний примітив — <code>Symbol('id') === Symbol('id')</code> дає <code>false</code>. Навіщо: неконфліктні ключі, «приховані» властивості (не видно в <code>for...in</code>/<code>Object.keys</code>/<code>JSON</code>), well-known symbols (гачки поведінки рушія).</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `const range = {
  from: 1, to: 5,
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) yield i;
  },
};
[...range];  // [1,2,3,4,5] — звичайний об'єкт стає ітерованим

// Symbol.asyncIterator + for await...of — асинхронні потоки (пагіновані API)`,
        },
        {
          kind: 'paragraph',
          html: `<p><code>Array</code>/<code>String</code>/<code>Map</code>/<code>Set</code> ітеровані з коробки; звичайний обʼєкт — ні, доки не реалізуєш <code>[Symbol.iterator]</code>.</p>`,
        },
      ],
    },
    {
      id: 'regular-expressions-flags-lookahead-named-groups-matchall',
      title: '🔍 Regular Expressions — Flags, Lookahead, Named Groups, matchAll',
      interviewQuestions: [
        {
          question: 'Чому виклик regex.test(str) у циклі з одним і тим самим regex-обʼєктом та прапорцем g може дати неочікувані результати?',
          answer: 'Коли regex має прапорець g, рушій зберігає властивість lastIndex НА САМОМУ ОБʼЄКТІ regex між викликами test()/exec() — кожен наступний виклик шукає збіг, починаючи не з початку рядка, а з lastIndex попереднього виклику. У циклі це виглядає як "то true, то false" для того самого рядка. Фікс: створювати новий regex-літерал на кожну ітерацію або скидати lastIndex = 0 вручну.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>Прапорець</th><th>Дія</th></tr>
      <tr><td><code>g</code></td><td>усі збіги</td></tr>
      <tr><td><code>i</code></td><td>без регістру</td></tr>
      <tr><td><code>m</code></td><td><code>^</code>/<code>$</code> на кожен рядок</td></tr>
      <tr><td><code>s</code></td><td><code>.</code> матчить <code>\\n</code></td></tr>
      <tr><td><code>y</code></td><td>sticky (від lastIndex)</td></tr>
    </table></div>
  <div class="table-wrap"><table>
      <tr><th>Блок</th><th>Значення</th></tr>
      <tr><td><code>(?:..)</code> / <code>(?&lt;n&gt;..)</code></td><td>non-capturing / named group</td></tr>
      <tr><td><code>(?=..)</code> / <code>(?&lt;=..)</code></td><td>lookahead / lookbehind</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          code: `'John Smith'.replace(/(\\w+) (\\w+)/, '$2 $1');  // 'Smith John'

// Named groups + matchAll
const re = /(?<year>\\d{4})-(?<month>\\d{2})/g;
for (const m of '2024-01, 2024-02'.matchAll(re)) {
  console.log(m.groups.year, m.groups.month);
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><code>lastIndex</code> з прапорцем <code>g</code> зберігається між викликами <code>test</code>/<code>exec</code> на тому самому regex-обʼєкті — хитрі баги в циклах. Catastrophic backtracking (<code>(a+)+</code>) → ReDoS, зависання; уникай вкладених квантифікаторів.</span></div>`,
        },
      ],
    },
    {
      id: 'advanced-async-patterns-debounce-throttle-taskqueue-promisewithresolvers',
      title: '🚀 Advanced Async Patterns — debounce, throttle, TaskQueue, Promise.withResolvers',
      interviewQuestions: [
        {
          question: 'Search input і scroll listener — чому для першого правильний вибір debounce, а для другого throttle?',
          answer: 'Для search має сенс чекати, поки користувач ЗАКІНЧИТЬ вводити (debounce скидає таймер на кожен новий символ і запускає запит лише після паузи) — проміжні запити на кожну літеру не потрібні. Для scroll потрібен регулярний, але обмежений за частотою фідбек під час БЕЗПЕРЕРВНОЇ дії (throttle гарантує виклик не частіше ніж раз на N мс) — debounce тут спрацював би лише один раз, аж коли скрол повністю зупиниться, що для UI-реакцій на скрол занадто рідко.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap"><table>
      <tr><th>Патерн</th><th>Коли</th></tr>
      <tr><td><strong>debounce</strong></td><td>Чекай кінця активності — search input (не запускати запит на кожен символ)</td></tr>
      <tr><td><strong>throttle</strong></td><td>Максимум раз за N мс — scroll/resize листенери</td></tr>
      <tr><td><strong>TaskQueue</strong></td><td>Послідовне виконання async — уникнути race conditions, лімітувати паралелізм</td></tr>
    </table></div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `function debounce<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function throttle<T extends (...a: any[]) => void>(fn: T, ms: number) {
  let waiting = false;
  return (...args: Parameters<T>) => {
    if (waiting) return;
    fn(...args);
    waiting = true;
    setTimeout(() => (waiting = false), ms);
  };
}

// Promise.withResolvers() (ES2024) — resolve/reject поза конструктором
const { promise, resolve, reject } = Promise.withResolvers<string>();
// ...десь в іншому місці: resolve('done')`,
        },
      ],
    },
  ]
}
