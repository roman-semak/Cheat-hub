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
    },
    {
      "id": "q49",
      "question": "У Webpack — у чому різниця між loader і plugin?",
      "options": [
        "Це синоніми",
        "Loader трансформує окремий файл перед бандлингом (напр. TS → JS); plugin втручається у весь процес збірки (напр. генерація HTML, extract CSS)",
        "Plugin працює тільки в dev-режимі",
        "Loader налаштовується в package.json, а plugin — у webpack.config.js"
      ],
      "correct": 1,
      "explanation": "<strong>Loader</strong> (напр. <code>ts-loader</code>, <code>css-loader</code>) — трансформує вміст одного файлу на етапі, коли Webpack його читає. <strong>Plugin</strong> (напр. <code>HtmlWebpackPlugin</code>) — підключається до ширшого життєвого циклу збірки: може генерувати нові файли, оптимізувати весь бандл, виносити частини в окремі файли."
    },
    {
      "id": "q50",
      "question": "У чому головна практична відмінність pnpm від npm/yarn при встановленні залежностей?",
      "options": [
        "pnpm працює лише з TypeScript-проєктами",
        "pnpm зберігає пакети в єдиному content-addressable сховищі й лінкує їх symlinks замість копіювання в кожен node_modules",
        "pnpm не підтримує package.json",
        "Різниці немає, це лише інша команда для тих самих дій"
      ],
      "correct": 1,
      "explanation": "npm/yarn копіюють кожен пакет у <code>node_modules</code> кожного проєкту (дублювання на диску). <strong>pnpm</strong> тримає один спільний store і лінкує файли symlinks/hardlinks — швидше, менше місця, і строгіша (non-flat) структура <code>node_modules</code> усуває phantom dependencies. Особливо виграшно у monorepo/workspaces."
    },
    {
      "id": "q51",
      "question": "Де зберігається сам об'єкт при <code>const user = { name: 'A' };</code>, а де — посилання на нього?",
      "options": [
        "І об'єкт, і посилання — в heap",
        "Об'єкт — у heap, посилання (зв'язування `user`) — у stack",
        "Об'єкт — у stack, посилання — у heap",
        "І об'єкт, і посилання — в stack, якщо об'єкт маленький"
      ],
      "correct": 1,
      "explanation": "Примітиви й посилання на об'єкти лежать у <strong>stack</strong> (call frame), а самі об'єкти/масиви/функції — у <strong>heap</strong>, бо їхній розмір може змінюватись і невідомий заздалегідь."
    },
    {
      "id": "q52",
      "question": "Чому в JS не використовують наївний reference counting для garbage collection?",
      "options": [
        "Тому що це надто швидко і не дає рушію \"відпочити\"",
        "Тому що він не звільняє циклічні посилання (об'єкти, що взаємно посилаються один на одного)",
        "Тому що reference counting несумісний з prototype chain",
        "JS насправді використовує лише reference counting"
      ],
      "correct": 1,
      "explanation": "При reference counting лічильник циклічно пов'язаних об'єктів ніколи не досягає нуля, навіть якщо ззовні на цикл ніхто не посилається — вони \"течуть\". V8 натомість використовує <strong>reachability</strong> (mark-and-sweep): недосяжний від roots цикл звільняється повністю."
    },
    {
      "id": "q53",
      "question": "Що таке \"weak generational hypothesis\", на якій базується generational GC у V8?",
      "options": [
        "Більшість об'єктів живуть дуже довго, тому їх варто одразу класти в Old Space",
        "Більшість об'єктів \"вмирають молодими\" — живуть дуже коротко",
        "WeakMap завжди швидший за Map",
        "Об'єкти без посилань автоматично стають weak references"
      ],
      "correct": 1,
      "explanation": "Гіпотеза: переважна більшість алокованих об'єктів стають недосяжними майже одразу (тимчасові змінні, проміжні обчислення). Тому вигідно часто й швидко перевіряти лише молоду пам'ять (Scavenge), а не сканувати весь heap."
    },
    {
      "id": "q54",
      "question": "У чому різниця між Scavenge та Mark-Sweep-Compact у V8?",
      "options": [
        "Це синоніми одного й того ж алгоритму",
        "Scavenge — швидкий copying-алгоритм для малого New Space; Mark-Sweep-Compact — рідший прохід з ущільненням для великого Old Space",
        "Scavenge працює тільки в Node.js, Mark-Sweep-Compact — тільки в браузері",
        "Mark-Sweep-Compact завжди швидший, тому що не копіює дані"
      ],
      "correct": 1,
      "explanation": "<strong>Scavenge</strong> — copying-алгоритм для New Space (from-space → to-space), швидкий, бо живих об'єктів мало. <strong>Mark-Sweep-Compact</strong> — для великого Old Space: позначити живе, замести мертве, за потреби ущільнити фрагментовану пам'ять."
    },
    {
      "id": "q55",
      "question": "Які три фази виконує алгоритм mark-and-sweep (з compaction)?",
      "options": [
        "Copy → Paste → Delete",
        "Allocate → Free → Reallocate",
        "Mark → Sweep → Compact",
        "Scan → Index → Cache"
      ],
      "correct": 2,
      "explanation": "<strong>Mark</strong> — обхід графа від roots, позначення досяжного. <strong>Sweep</strong> — звільнення непозначеного. <strong>Compact</strong> — пересування живих об'єктів для усунення фрагментації пам'яті (переважно в Old Space)."
    },
    {
      "id": "q56",
      "question": "Чому WeakMap краще підходить для кешу метаданих DOM-вузлів, ніж звичайний Map?",
      "options": [
        "WeakMap швидший за Map при читанні",
        "WeakMap тримає ключі \"слабко\": коли DOM-вузол стає недосяжним деінде, запис у кеші зникає сам — без ручного видалення",
        "WeakMap дозволяє ітерацію for...of, а Map — ні",
        "Різниці немає, WeakMap — просто застаріла назва Map"
      ],
      "correct": 1,
      "explanation": "У звичайному <code>Map</code> ключ — strong reference: DOM-вузол не звільниться, навіть якщо його видалили зі сторінки, поки він є ключем у Map. <code>WeakMap</code> тримає ключ слабко — вузол і повʼязані дані зникають разом, коли вузол більше нізвідки не досяжний."
    },
    {
      "id": "q57",
      "question": "Що таке \"detached DOM node\" і чому це проблема продуктивності?",
      "options": [
        "Вузол без CSS-стилів",
        "Вузол, видалений з DOM-дерева, але на який JS усе ще тримає посилання — тому GC не може його звільнити",
        "Вузол всередині <template>, який ще не вставлений у документ",
        "Вузол, до якого не прив'язано жодного event listener"
      ],
      "correct": 1,
      "explanation": "Якщо елемент видалили з DOM (<code>.remove()</code>), але кеш/замикання досі посилаються на нього, він лишається досяжним для GC, хоча на сторінці його вже немає — класична причина зростання heap у SPA."
    },
    {
      "id": "q58",
      "question": "Що виведе цей код?<code>const a = { x: 1 };\nconst b = { ...a };\nb.x = 2;\nconsole.log(a.x, b.x);</code>",
      "options": [
        "2 2",
        "1 1",
        "1 2",
        "undefined 2"
      ],
      "correct": 2,
      "explanation": "Spread (<code>{...a}</code>) створює <strong>shallow copy</strong>: новий об'єкт з тими самими значеннями верхнього рівня. Оскільки <code>x</code> — примітив, він копіюється за значенням, тому зміна <code>b.x</code> не впливає на <code>a.x</code>: результат <strong>1 2</strong>."
    },
    {
      "id": "q59",
      "question": "Чим structuredClone() відрізняється від shallow copy через spread (<code>{...obj}</code>)?",
      "options": [
        "Це те саме, просто інший синтаксис",
        "structuredClone() рекурсивно копіює все дерево об'єкта (deep copy), тоді як spread копіює лише верхній рівень",
        "structuredClone() працює тільки з масивами",
        "Spread завжди повільніший за structuredClone()"
      ],
      "correct": 1,
      "explanation": "<code>{...obj}</code> — shallow copy: вкладені об'єкти/масиви залишаються спільними посиланнями з оригіналом. <code>structuredClone(obj)</code> — deep copy: рекурсивно клонує все дерево, роблячи копію повністю незалежною (але не вміє клонувати функції та DOM-вузли)."
    },
    {
      "id": "q60",
      "question": "Чи можна примусово викликати garbage collection у стандартному JS-коді?",
      "options": [
        "Так, через global.gc() завжди доступний у будь-якому середовищі",
        "Ні, публічного API для форсування GC немає; delete/= null лише прибирають посилання",
        "Так, через Object.forceGC()",
        "Так, GC запускається кожного разу при виклику console.log()"
      ],
      "correct": 1,
      "explanation": "У JS немає стандартного способу примусово запустити GC (Node дозволяє це лише з флагом <code>--expose-gc</code>, і то для дебагу/тестів). <code>delete obj.prop</code> чи <code>obj = null</code> прибирають посилання — коли і чи звільниться памʼять, вирішує сам рушій."
    },
    {
      "id": "q61",
      "question": "Що станеться при спробі викликати клас без <code>new</code>, напр. <code>const a = Animal();</code>?",
      "options": [
        "Виконається так само, як звичайна функція",
        "TypeError: Class constructor cannot be invoked without 'new'",
        "Поверне undefined без помилок",
        "Автоматично додасть new під капотом"
      ],
      "correct": 1,
      "explanation": "На відміну від constructor function (яка просто виконується, з <code>this</code> = undefined у strict mode), клас, оголошений через <code>class</code>, кидає <code>TypeError</code> при виклику без <code>new</code> — це вбудована перевірка."
    },
    {
      "id": "q62",
      "question": "Чому цей код кидає ReferenceError?<code>class Dog extends Animal {\n  constructor(name) {\n    this.name = name; // ReferenceError\n    super(name);\n  }\n}</code>",
      "options": [
        "this недоступний у класах узагалі",
        "У конструкторі підкласу this ініціалізується лише після виклику super() — звернення до this раніше заборонене",
        "Треба спочатку оголосити name як поле класу",
        "extends вимагає, щоб super() був останнім рядком"
      ],
      "correct": 1,
      "explanation": "У класі з <code>extends</code> <code>this</code> створює батьківський конструктор. Доки <code>super()</code> не викликано, <code>this</code> перебуває в TDZ — будь-яке звернення до нього кидає <code>ReferenceError</code>."
    },
    {
      "id": "q63",
      "question": "Чим private field <code>#balance</code> у класі відрізняється від конвенції <code>_balance</code>?",
      "options": [
        "Нічим — обидва просто приховані за конвенцією іменування",
        "#balance недоступне ззовні класу на рівні мови (SyntaxError при спробі доступу), _balance — лише угода між розробниками, технічно публічне",
        "_balance швидший за #balance у V8",
        "#balance можна перевизначити в підкласі, _balance — ні"
      ],
      "correct": 1,
      "explanation": "<code>#field</code> (ES2022) — справжня інкапсуляція на синтаксичному рівні: <code>obj.#balance</code> ззовні класу кидає SyntaxError. <code>_field</code> — лише конвенція, яка нічого технічно не забороняє."
    },
    {
      "id": "q64",
      "question": "Кому належить <code>static</code>-метод у класі — інстанції чи самому класу?",
      "options": [
        "Кожній інстанції окремо, як звичайний метод",
        "Самому класу — викликається як ClassName.method(), без створення інстанції через new",
        "Прототипу класу, як і звичайні методи",
        "Global object, як звичайна функція"
      ],
      "correct": 1,
      "explanation": "<code>static</code> members (методи й поля) належать самому класу, а не instance — доступні через <code>ClassName.member</code> без <code>new</code>. Типово для utility-методів, лічильників, factory-методів."
    },
    {
      "id": "q65",
      "question": "Що станеться, якщо підклас не оголошує власний constructor?<code>class Cat extends Animal {\n  meow() { console.log('Meow'); }\n}\nnew Cat('Tom');</code>",
      "options": [
        "Помилка компіляції — constructor обов'язковий",
        "this.name лишиться undefined, аргумент 'Tom' ігнорується",
        "Рушій підставляє дефолтний конструктор constructor(...args) { super(...args) } — 'Tom' дійде до Animal-конструктора",
        "Cat не зможе мати жодних полів"
      ],
      "correct": 2,
      "explanation": "Якщо конструктор не оголошено явно, JS підставляє дефолтний, що прокидає всі аргументи в <code>super(...args)</code>. Тому <code>new Cat('Tom')</code> коректно передасть <code>'Tom'</code> у <code>Animal</code>'s constructor."
    },
    {
      "id": "q66",
      "question": "Чи можна використати клас у коді до рядка, де його оголошено (як з function declaration)?",
      "options": [
        "Так, класи повністю hoisted, як function declarations",
        "Ні, класи взагалі не hoisted",
        "Клас technically hoisted, але потрапляє в Temporal Dead Zone — звернення до нього до оголошення кидає ReferenceError",
        "Залежить від того, extends клас щось чи ні"
      ],
      "correct": 2,
      "explanation": "На відміну від <code>function</code> declaration (повний hoisting, можна викликати раніше), клас <em>hoisted</em>, але лишається в TDZ до виконання рядка оголошення — використання раніше кидає <code>ReferenceError</code>, так само як <code>let</code>/<code>const</code>."
    }
  ]
}
