// AUTO-GENERATED from CheetSheet/javascript/quiz.html. Re-running overwrites.
import type { QuizData } from './types'

export const javascriptQuiz: QuizData = {
  "title": "JS / TS Quiz",
  "questions": [
    {
      "id": "q1",
      "question": "Що виведе цей код?<code>console.log(\"1\");\nsetTimeout(() => console.log(\"2\"), 0);\nPromise.resolve().then(() => console.log(\"3\"));\nconsole.log(\"4\");</code>",
      "options": [
        "1, 2, 3, 4",
        "1, 4, 3, 2",
        "1, 4, 2, 3",
        "1, 3, 4, 2"
      ],
      "correct": 1,
      "explanation": "Синхронний код виконується першим: <strong>1, 4</strong>. Потім мікротаски (Promise.then): <strong>3</strong>. Потім макротаски (setTimeout): <strong>2</strong>. Мікротаски завжди мають вищий пріоритет."
    },
    {
      "id": "q2",
      "question": "Як правильно паралельно виконати кілька async операцій?",
      "options": [
        "await fetchA(); await fetchB(); await fetchC();",
        "const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);",
        "Promise.race([fetchA(), fetchB(), fetchC()]).then(...)",
        "async function all() { return fetchA() || fetchB() || fetchC(); }"
      ],
      "correct": 1,
      "explanation": "<strong>await один за одним</strong> — послідовно, загальний час = сума часів. <strong>Promise.all()</strong> — паралельно, загальний час = час найдовшої операції. Для незалежних запитів завжди використовуй Promise.all()."
    },
    {
      "id": "q3",
      "question": "Що повертає async функція?",
      "options": [
        "Завжди значення яке вона повертає",
        "Завжди Promise, навіть якщо синхронне значення",
        "Promise тільки якщо є await всередину",
        "Спеціальний AsyncIterator"
      ],
      "correct": 1,
      "explanation": "<code>async function foo() { return 42; }</code> повертає <code>Promise.resolve(42)</code>. Будь-яка async функція завжди огортає return-значення в Promise."
    },
    {
      "id": "q4",
      "question": "Що виведе цей код?<code>const obj = { name: \"Alice\", greet: function() { return this.name; } };\nconst fn = obj.greet;\nconsole.log(fn());</code>",
      "options": [
        "\"Alice\"",
        "\"undefined\"",
        "undefined",
        "TypeError"
      ],
      "correct": 2,
      "explanation": "При присвоєнні функція \"відривається\" від об'єкта. При виклику без контексту this === window/global, де name не визначено, тому повертається <code>undefined</code> (не рядок)."
    },
    {
      "id": "q5",
      "question": "Яка різниця між call, apply та bind?",
      "options": [
        "Вони однакові",
        "call/apply негайно викликають; bind повертає нову функцію з фіксованим this",
        "bind негайно викликає; call/apply повертають функцію",
        "Використовуються в різних контекстах"
      ],
      "correct": 1,
      "explanation": "<code>fn.call(ctx, a, b)</code> — виклик з аргументами поштучно. <code>fn.apply(ctx, [a, b])</code> — те саме, але масивом. <code>fn.bind(ctx)</code> — повертає нову функцію з прив'язаним this."
    },
    {
      "id": "q6",
      "question": "Чому можна змінити this у стрілковій функції?",
      "options": [
        "Можна через call()",
        "Можна через bind()",
        "Не можна, захоплює this лексично і ігнорує call/apply/bind",
        "Можна в strict mode"
      ],
      "correct": 2,
      "explanation": "Стрілкові функції не мають власного this. Вони захоплюють this з оточуючого скоупу під час ВИЗНАЧЕННЯ. Тому call/apply/bind не можуть змінити їхній this — перший аргумент просто ігнорується."
    },
    {
      "id": "q7",
      "question": "Що виведе цей код?<code>for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}</code>",
      "options": [
        "0, 1, 2",
        "3, 3, 3",
        "0, 0, 0",
        "undefined, undefined, undefined"
      ],
      "correct": 1,
      "explanation": "<code>var</code> має функціональний скоуп. Всі три closure'и захоплюють ОДНУ змінну i. Loop завершується з i === 3, тому виводиться 3, 3, 3. Рішення: замінити var на let."
    },
    {
      "id": "q8",
      "question": "Що таке closure (замикання)?",
      "options": [
        "Функція без параметрів",
        "Функція яка захоплює змінні з зовнішніх скоупів",
        "Функція яка повертає інший об'єкт",
        "Метод класу"
      ],
      "correct": 1,
      "explanation": "Closure — це функція разом зі змінними з зовнішніх скоупів. Навіть після виходу зовнішньої функції, closure зберігає посилання на захоплені змінні. Основа для data privacy, memoization, partial application."
    },
    {
      "id": "q9",
      "question": "В чому різниця між function declaration та expression?",
      "options": [
        "Вони однакові",
        "Declaration повністю hoisted; expression — лише змінна (TDZ)",
        "Expression не може бути анонімною",
        "Declaration не може бути присвоєна"
      ],
      "correct": 1,
      "explanation": "<code>function foo(){}</code> — hoisted повністю. <code>const foo = function(){}</code> — hoisting змінної (TDZ). Виклик до рядка: declaration = OK, expression = TypeError."
    },
    {
      "id": "q10",
      "question": "Яке з тверджень про typeof оператор НЕВІРНЕ?",
      "options": [
        "typeof undefined === \"undefined\"",
        "typeof null === \"object\"",
        "typeof [] === \"array\"",
        "typeof {} === \"object\""
      ],
      "correct": 2,
      "explanation": "typeof [] повертає <code>\"object\"</code>, не \"array\" (це баг мови). Щоб перевірити Array використовуй Array.isArray(). <code>typeof null === \"object\"</code> — також історичний баг (null є примітивом)."
    },
    {
      "id": "q11",
      "question": "Яка різниця між == та ===?",
      "options": [
        "Вони однакові",
        "== робить type coercion; === сурова рівність без перетворень",
        "Вони використовуються в різних браузерах",
        "=== тільки для чисел"
      ],
      "correct": 1,
      "explanation": "<code>5 == \"5\"</code> → true (coercion). <code>5 === \"5\"</code> → false (різні типи). <strong>Рекомендація:</strong> завжди використовуй === для уникнення неочікуваних результатів."
    },
    {
      "id": "q12",
      "question": "Що повертає Number(\"10\") vs parseInt(\"10\")?",
      "options": [
        "Обидва повертають 10",
        "Number() краще парсить рядки та об'єкти; parseInt() парсить префіксно",
        "Один парсить float, інший — цілі",
        "parseInt() завжди повертає null"
      ],
      "correct": 1,
      "explanation": "<code>Number(\"10\")</code> → 10, <code>Number(\"10px\")</code> → NaN. <code>parseInt(\"10px\")</code> → 10 (парсить префікс, ігнорує суфікс). parseInt краще для parse рядків з одиницями."
    },
    {
      "id": "q13",
      "question": "Коли використовувати Singleton паттерн?",
      "options": [
        "Завжди для всіх класів",
        "Для об'єктів яких має бути рівно один екземпляр (наприклад, дітабаза клієнт)",
        "Тільки для функцій",
        "Singleton deprecated"
      ],
      "correct": 1,
      "explanation": "<strong>Singleton</strong> — паттерн що гарантує лише один екземпляр класу. Приклади: logger, config manager, database connection pool. Реалізація: статичний методgit getInstance() який кешує інстанс."
    },
    {
      "id": "q14",
      "question": "Що таке Observer паттерн?",
      "options": [
        "Спостереження за змінами типу",
        "Один об'єкт (Subject) сповіщає кількох спостерігачів (Observers) про зміни",
        "Клас яка спостерігає за DOM",
        "Функція що слідкує за мережею"
      ],
      "correct": 1,
      "explanation": "<strong>Observer</strong> — один об'єкт стає Source of Truth, кілька Observers \"слухають\" його змін. JavaScript Event API використовує цей паттерн. RxJS Subject це також Observer паттерн."
    },
    {
      "id": "q15",
      "question": "Як реалізувати Module паттерн?",
      "options": [
        "Використовувати клас",
        "IIFE (Immediately-Invoked Function Expression) для енкапсуляції приватних змінних",
        "Только export statement",
        "Module не існує в JavaScript"
      ],
      "correct": 1,
      "explanation": "<code>(function() { const private = \"...\"; return { public() {} }; })()</code> — IIFE обов'язує приватні змінні. Сучасне рішення: ES6 modules (import/export)."
    },
    {
      "id": "q16",
      "question": "Як утворюється прототипна ланцюг?",
      "options": [
        "Через класи",
        "Об'єкт має [[Prototype]] посилання на інший об'єкт; ланцюг слідує крок за кроком вверх до Object.prototype",
        "Через constructor",
        "Автоматично при кожній операції"
      ],
      "correct": 1,
      "explanation": "Пошук властивості: якщо не знайдено на об'єкті, JavaScript шукає на [[Prototype]], потім [[Prototype]]'s [[Prototype]], тощо до null (кінець ланцюга). <code>Object.getPrototypeOf(obj)</code> — отримати потипний."
    },
    {
      "id": "q17",
      "question": "В чому різниця між Class та Function Constructor?",
      "options": [
        "Класи швидші",
        "Class синтаксис — це синтаксичний цукор для Function Constructor; обидва використовують прототипи",
        "Класи мають методи, Function Constructor ні",
        "Function Constructor не hoist, Class hoist"
      ],
      "correct": 1,
      "explanation": "class MyClass {} — це просто красивіший синтаксис для function MyClass() {}. Під капотом обидва використовують прототипи. class має власні тонкощі (методи не для перебору, automatic strict mode)."
    },
    {
      "id": "q18",
      "question": "Що робить super() в конструкторі дочірнього класу?",
      "options": [
        "Необов'язково",
        "Викликає конструктор батька і інітіалізує батківські властивості",
        "Видаляє батківські методи",
        "Тільки для множинного спадкування"
      ],
      "correct": 1,
      "explanation": "<strong>super()</strong> — обов'язковий в дочірньому класі перед цим. Коли викликаються інічіалізує this через батіків конструктор. Без super() або цей буде undefined."
    },
    {
      "id": "q19",
      "question": "Що повертає generator функція при виклику?",
      "options": [
        "Значення яке yield'ує",
        "Generator object — об'єкт з .next() методом",
        "Array всіх yield'ів",
        "Undefined"
      ],
      "correct": 1,
      "explanation": "<code>function* gen() { yield 1; }</code>. При виклику <code>gen()</code> повертає Generator object. Кожний виклик .next() поверає { value, done }. Generator ліниво обчислює значення (не виконує весь код одразу)."
    },
    {
      "id": "q20",
      "question": "Що таке [Symbol.iterator]?",
      "options": [
        "Фіксована властивість",
        "Добре-відома Symbol яка робить об'єкт iterable для for...of циклів",
        "Метод для копіювання",
        "Функція для сортування"
      ],
      "correct": 1,
      "explanation": "Об'єкт з [Symbol.iterator] методом може бути використаний у for...of. <code>for (const x of obj) {}</code> викликає obj[Symbol.iterator]() і послідовно викликає .next() до done === true."
    },
    {
      "id": "q21",
      "question": "Як призупинити виконання в generator і передати дані?",
      "options": [
        "Через setTimeout",
        "Через yield; отримати дані назад через .next(value) в наступному виклику",
        "Impossible",
        "Через async/await"
      ],
      "correct": 1,
      "explanation": "<code>const x = yield waiting;</code> — пауза. При <code>.next(10)</code> x отримує 10. Це дозволяє двобічну комунікацію між caller та generator."
    },
    {
      "id": "q22",
      "question": "Яка різниця між ESM (import/export) та CJS (require)?",
      "options": [
        "Вони однакові",
        "ESM — асинхронне статичне завантаження; CJS — синхронне динамічне завантаження",
        "ESM для браузера, CJS для Node",
        "CJS новіше"
      ],
      "correct": 1,
      "explanation": "<code>import x from \"module\"</code> (ESM) — статична, асинхронна. <code>require(\"module\")</code> (CJS) — синхронна, може бути умовна. ESM — стандарт, CJS — Node.js legacy."
    },
    {
      "id": "q23",
      "question": "Що робить export default?",
      "options": [
        "Експортує всі експорти",
        "Експортує одну основну експортпропоновуючи їй імпортувати без фігурних дужок",
        "Експортує функцію",
        "Усуває всі інші експорти"
      ],
      "correct": 1,
      "explanation": "<code>export default MyClass;</code> дозволяє <code>import MyClass from \"module\"</code> (без {}). Named export: <code>export { a, b };</code> вимагає <code>import { a, b } from \"module\"</code>."
    },
    {
      "id": "q24",
      "question": "Коли використовувати dynamic import()?",
      "options": [
        "Ніколи, статичний import краще",
        "Для lazy loading модулів, умовного завантаження, розділення bundle на chunks",
        "Тільки в Node.js",
        "Для рівня"
      ],
      "correct": 1,
      "explanation": "<code>import(\"./module.js\").then(m => m.default())</code> — асинхронно завантажує модуль. Корисно для lazy-loading за маршрутом, code splitting, умовного завантаження."
    },
    {
      "id": "q25",
      "question": "Що таке JIT компіляція у V8?",
      "options": [
        "Компіляція при натисканні кнопки",
        "Just-In-Time — V8 компілює гарячий код до машинного коду для прискорення",
        "Компіляція на сервері",
        "Не існує в JavaScript"
      ],
      "correct": 1,
      "explanation": "<strong>JIT</strong> — V8 спостерігає за яким кодом часто виконується (hot paths), компілює його до машинного коду замість інтерпретації. Це прискорює execution в кілька разів для loops, рекурсії."
    },
    {
      "id": "q26",
      "question": "Як Hidden Classes впливають на performance?",
      "options": [
        "Вони конфіденційні",
        "V8 аналізує properties об'єкту в його shape; якщо shape змінюється часто, властивості не оптимізуються",
        "Вони впливають на privacy",
        "Ніяк не впливають"
      ],
      "correct": 1,
      "explanation": "V8 кешує \"shape\" об'єкту (яких properties у якому порядку). Якщо додавати properties динамічно або змінювати shape — optimizations скидаються. <strong>Вета:</strong> ініціалізуй все properties в constructor."
    },
    {
      "id": "q27",
      "question": "Як ArrayBuffer та TypedArray покращують performance?",
      "options": [
        "Вони повільніше",
        "ArrayBuffer — неінтерпретована пам'ять; TypedArray — типізований доступ, швидше для крупномасштабних даних та WebGL",
        "Тільки для браузера",
        "Немає жодної різниці"
      ],
      "correct": 1,
      "explanation": "<code>Uint8Array, Float32Array</code> — доступ до сирої пам'яті з фіксованою типізацією. Набагато швидше ніж звичайні Array для великих наборів даних, binary дані, WebGL текстури."
    },
    {
      "id": "q28",
      "question": "Як обробити помилку в async/await?",
      "options": [
        "try/finally блок",
        "try/catch/finally блок",
        "throw після await",
        "Помилки не трапляються"
      ],
      "correct": 1,
      "explanation": "<code>try { await asyncFn(); } catch (e) { ... } finally { ... }</code> — помилка у promise відловлюється catch. Без catch помилка просто rejected promise."
    },
    {
      "id": "q29",
      "question": "Яка різниця між throw new Error() та throw \"message\"?",
      "options": [
        "Обидва однакові",
        "Error об'єкт має stack trace; рядок тільки текст",
        "Рядок краще",
        "Можна кидати тільки об'єкти"
      ],
      "correct": 1,
      "explanation": "<strong>throw new Error(\"msg\")</strong> — об'єкт з message, stack trace (file, line), name. <strong>throw \"msg\"</strong> — тільки рядок, без контексту. Рекомендація: завжди кидай Error об'єкти або підкласи."
    },
    {
      "id": "q30",
      "question": "Як створити custom Error клас?",
      "options": [
        "Неможна",
        "class MyError extends Error { constructor(msg) { super(msg); this.name = \"MyError\"; } }",
        "Тільки звичайні Error",
        "Через throw об'єкт"
      ],
      "correct": 1,
      "explanation": "<code>class NotFoundError extends Error { ... }</code> дозволяє специфічні помилки. При catch можна перевірити <code>if (e instanceof NotFoundError) { ... }</code>"
    },
    {
      "id": "q31",
      "question": "Що з цього є regex флагом?",
      "options": [
        "a, b, c",
        "g (global), i (case-insensitive), m (multiline), s (dotAll)",
        "x, y, z",
        "Флагів нема"
      ],
      "correct": 1,
      "explanation": "<code>/pattern/gi</code> — флаги: g (всі збіги), i (ignore case), m (^ та $ для line), s (. матчить newline). Сумуються: <code>/x/gim</code>"
    },
    {
      "id": "q32",
      "question": "Коли використовувати lookahead та lookbehind?",
      "options": [
        "Ніколи",
        "Lookahead (?=) та lookbehind (?<=) — zero-width assertions для умовного матчину без захоплення тексту",
        "Тільки для parsing",
        "Застарілі"
      ],
      "correct": 1,
      "explanation": "<code>/\\d+(?=px)/</code> матчить числа перед \"px\" без захоплення \"px\". <code>/(?<=@)\\w+/</code> матчить слова після \"@\". Zero-width — не додають до результату."
    },
    {
      "id": "q33",
      "question": "Що таке named groups у regex?",
      "options": [
        "Групи з назвами",
        "/(?&lt;year&gt;\\d{4})-(?&lt;month&gt;\\d{2})/ — дозволяє доступ до groups.year замість groups[1]",
        "Тільки для коментарів",
        "Не існує"
      ],
      "correct": 1,
      "explanation": "<code>/(?&lt;name&gt;\\w+)/.exec(\"Alice\").groups.name</code> → \"Alice\". Робить regex більш readable та відповідним до структури."
    },
    {
      "id": "q34",
      "question": "Яка різниця між Map та Object?",
      "options": [
        "Вони однакові",
        "Map — будь-які типи ключів, методи .get/.set, ітерабельна; Object — строкові ключі, нема методів доступу",
        "Object швидше",
        "Map deprecated"
      ],
      "correct": 1,
      "explanation": "<code>map.set(obj, value)</code> — об'єкт як ключ. <code>obj.key = value</code> конвертує ключ на string. Map краще для key-value пари, Object для структури."
    },
    {
      "id": "q35",
      "question": "Як Array.from() відрізняється від spread operator?",
      "options": [
        "Вони однакові",
        "Array.from() тільки для iterable; spread працює з iterable та array-like",
        "Spread оператор старший",
        "Array.from() тільки для strings"
      ],
      "correct": 1,
      "explanation": "<code>Array.from(\"hello\")</code> → [\"h\",\"e\",\"l\",\"l\",\"o\"]. <code>[...\"hello\"]</code> — те саме. Array.from() більш експлицитна, може приймати map функцію другим параметром."
    },
    {
      "id": "q36",
      "question": "Що означає Object.freeze()?",
      "options": [
        "Видаляє об'єкт",
        "Робить об'єкт immutable — не можна додавати/видаляти/змінювати properties",
        "Кешує об'єкт",
        "Тільки для масивів"
      ],
      "correct": 1,
      "explanation": "<code>Object.freeze(obj)</code> — заморожує surface level. Nested об'єкти все ще мutable. Для deep freeze потрібна рекурсія.<code>Object.isFrozen()</code> — перевіряє."
    },
    {
      "id": "q37",
      "question": "Що робить fetch() в порівнянні з XMLHttpRequest?",
      "options": [
        "XMLHttpRequest новіший",
        "fetch() — modern Promise-based API; XMLHttpRequest — старо, callback-based, більш boilerplate",
        "fetch() не підтримується в old браузерах без polyfill",
        "Вони для різних задач"
      ],
      "correct": 1,
      "explanation": "<code>fetch(url).then(r => r.json())</code> — чистіше. XMLHttpRequest вимагав boilerplate. fetch() modern standard (AbortController, headers, streams support)."
    },
    {
      "id": "q38",
      "question": "Як AbortController скасовує fetch запити?",
      "options": [
        "Не можна скасувати",
        "Створи AbortController, передай signal в fetch, виклич abort() щоб скасувати",
        "Використовуй timeout",
        "Тільки для старих браузерів"
      ],
      "correct": 1,
      "explanation": "<code>const ac = new AbortController(); fetch(url, { signal: ac.signal }); ac.abort();</code> — скасовує запит. Корисно для пошуку що скасовується при новому запиті."
    },
    {
      "id": "q39",
      "question": "Що таке IntersectionObserver?",
      "options": [
        "Спостереження за помилками",
        "API для виявлення видимості елемента на viewport; корисна для lazy loading, infinite scroll",
        "Міжбраузерна сумісність",
        "Спостереження за мережею"
      ],
      "correct": 1,
      "explanation": "<code>new IntersectionObserver((entries) => { ... }).observe(el);</code> — callback коли el видимий/невидимий. Набагато ефективніше ніж слухати scroll event."
    },
    {
      "id": "q40",
      "question": "Як писати unit тести з Jest?",
      "options": [
        "test(\"name\", () => { ... }); expect(result).toBe(expected);",
        "Обидва варіанти: test() або it()",
        "Тільки за допомогою describe()",
        "Jest не підтримує unit тести"
      ],
      "correct": 1,
      "explanation": "<code>test(\"should do X\", () => { ... })</code> або <code>it(\"should do X\", () => { ... })</code>. expect() — assertion. Jest має вбудовані matchers: toBe, toEqual, toContain, тощо."
    },
    {
      "id": "q41",
      "question": "Як мокувати модуль з Jest?",
      "options": [
        "jest.mock(\"module\", () => ({ ... }))",
        "jest.mock() фіксує модуль навіть в інших тестах — вимикає з jest.unmock() або clearMocks()",
        "Неможна мокувати",
        "Тільки з Sinon"
      ],
      "correct": 1,
      "explanation": "<code>jest.mock(\"./db\", () => ({ query: jest.fn() }))</code> — замінює модуль. jest.mock() має глобальний scope, впливає на наступні тести. Очищувати: <code>jest.clearAllMocks()</code>"
    },
    {
      "id": "q42",
      "question": "Як тестувати async функції в Jest?",
      "options": [
        "Просто return promise",
        "Або return promise, або done callback, або async/await в тесті",
        "Неможна тестувати async",
        "Тільки з timers"
      ],
      "correct": 1,
      "explanation": "<code>test(\"\", async () => { await fetchData(); expect(...).toBe(...); })</code> або <code>test(\"\", () => { return fetchData().then(...); })</code>. Jest чекає на resolved promise перед завершенням."
    },
    {
      "id": "q43",
      "question": "Чому Symbol потрібен?",
      "options": [
        "Для константних",
        "Symbol — унікальний тип; два Symbol('x') не рівні; використовуються для приватних properties та well-known symbols",
        "Для типізації",
        "Symbol deprecated"
      ],
      "correct": 1,
      "explanation": "<code>const sym = Symbol(\"desc\");</code> → унікальний. <code>Symbol.iterator, Symbol.hasInstance</code> — well-known symbols для мови features. Не перелічуються у for...in (приватні)."
    },
    {
      "id": "q44",
      "question": "Як створити custom iterable об'єкт?",
      "options": [
        "Додати метод .iterate()",
        "Реалізувати [Symbol.iterator]() метод що повертає { next() } об'єкт",
        "Неможна",
        "Тільки arrays"
      ],
      "correct": 1,
      "explanation": "<code>const obj = { [Symbol.iterator]() { return { next() { ... } }; } };</code> дозволяє <code>for (const x of obj) {}</code>. Метод повинен повертати iterator (об'єкт з next() методом)."
    },
    {
      "id": "q45",
      "question": "Що означає Symbol.asyncIterator?",
      "options": [
        "Для синхронноїIterації",
        "Well-known symbol для async for...await циклів; дозволяє async generators",
        "Тільки для сервера",
        "Не існує"
      ],
      "correct": 1,
      "explanation": "<code>async for (const x of asyncIterable) {}</code> використовує [Symbol.asyncIterator](). Асинхронний generator: <code>async function* gen() { yield await fetch(...); }</code>"
    },
    {
      "id": "q46",
      "question": "Як реалізувати debounce функцію?",
      "options": [
        "setTimeout без delay",
        "Затримка виконання доки не зупинились viклики на час delay; кожен новий виклик скидає timer",
        "Обмеження виклик на кожну секунду",
        "Асинхронна обгортка"
      ],
      "correct": 1,
      "explanation": "<code>function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }</code> — типова pattern для пошуку, resize обробників."
    },
    {
      "id": "q47",
      "question": "Яка різниця між debounce та throttle?",
      "options": [
        "Вони однакові",
        "Debounce затримує та скидає; throttle виконує максимум раз за interval (лід-то один раз на інтервал)",
        "Throttle для тестування",
        "Debounce застарілий"
      ],
      "correct": 1,
      "explanation": "Debounce: виконує після зупинки. Throttle: максимум один раз за 1s навіть якщо много викликів. Throttle — scroll/resize, debounce — search input."
    },
    {
      "id": "q48",
      "question": "Як реалізувати TaskQueue для послідовного запиту async задач?",
      "options": [
        "Просто масив",
        "Черга яка чекає на completion кожної задачі перед наступною; корисна для серіальної обробки",
        "Неможна",
        "Тільки с Promise.all"
      ],
      "correct": 1,
      "explanation": "<code>class TaskQueue { async run(fn) { await this.waitForCurrent; this.waitForCurrent = fn(); } }</code> — послідовне виконання. Альтернатива: reduce з promises."
    }
  ]
}
