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
          question: `Навіщо моделювати async-стан як discriminated union замість набору полів <code>isLoading</code>/<code>error</code>/<code>data</code>?`,
          answer: `Набір незалежних опціональних полів дозволяє <em>impossible states</em> — <code>{ isLoading: true, data, error }</code> компілюється, хоча це нонсенс. Discriminated union (<code>{ status: 'loading' } | { status: 'success'; data } | { status: 'error'; error }</code>) робить нелегальні комбінації невимовними: <code>data</code> існує <strong>тільки</strong> при <code>status === 'success'</code>, і компілятор це гарантує. Гасло — <strong>«make impossible states impossible»</strong>.`,
        },
        {
          question: `Що дає exhaustiveness checking через <code>never</code> / <code>assertNever</code>, і чому це сильний сигнал на співбесіді?`,
          answer: `У <code>default</code> гілці <code>switch</code> присвоюєш значення змінній типу <code>never</code> (<code>const _x: never = shape</code>). Поки всі варіанти оброблені, <code>shape</code> у <code>default</code> звужений до <code>never</code> і присвоєння валідне. Додаєш новий член union — і <strong>кожен</strong> <code>switch</code> без відповідного <code>case</code> перестає компілюватись. Компілятор стає чеклистом рефакторингу. Згадка <code>assertNever</code> показує, що кандидат реально працював з DU.`,
        },
        {
          question: `Перелічи механізми type narrowing і поясни, чому custom type predicate (<code>x is T</code>) потенційно небезпечний.`,
          answer: `<code>typeof</code> (примітиви), <code>instanceof</code> (класи), <code>in</code> (наявність властивості), перевірка дискримінатора, truthiness, equality narrowing, <code>!= null</code>. Custom predicate <code>function isCat(p): p is Cat</code> — це <em>обіцянка</em> компілятору, яку він <strong>не перевіряє</strong>: якщо тіло функції бреше, отримаєш рантайм-баг без жодного warning. TS 5.5+ уміє інферити прості предикати автоматично, що безпечніше.`,
        },
        {
          question: `Interface vs abstract class — у чому принципова різниця і коли брати що?`,
          answer: `<code>interface</code> — суто <em>compile-time</em> контракт форми, стирається при компіляції (нуль рантайм-коду), клас реалізує <strong>кілька</strong> через <code>implements</code>. <code>abstract class</code> — <em>runtime</em> конструкція: має реалізацію методів, стан, конструктор, <code>private</code>/<code>protected</code>, <code>static</code>; успадкувати можна <strong>один</strong> через <code>extends</code>; працює <code>instanceof</code>. Правило: починай з interface, переходь на abstract class, коли з'являється <strong>спільна реалізація або стан</strong> (напр. Template Method pattern).`,
        },
        {
          question: `Чому в Angular DI <code>interface</code> не може бути токеном провайдера?`,
          answer: `Interface стирається при компіляції — у рантаймі його просто не існує, тому немає значення, яке можна передати як DI-токен. Використовують або <code>abstract class</code> як абстракцію (<code>{ provide: AbstractService, useClass: ConcreteService }</code>), або <code>InjectionToken</code>. Це практична демонстрація різниці compile-time vs runtime.`,
        },
        {
          question: `Що станеться, якщо в <code>interface B extends A</code> перевизначити поле несумісним типом — і чим це відрізняється від <code>A &amp; { … }</code>?`,
          answer: `<code>extends</code> запускає перевірку сумісності: несумісне перевизначення (<code>x: number</code> → <code>x: string</code>) — <strong>помилка компіляції одразу</strong>. Intersection <code>A &amp; { x: string }</code> помилки не дає — поле <code>x</code> тихо стає <code>never</code> (<code>number &amp; string</code>), і баг випливає лише там, де в це поле щось присвоюють. Тому для ієрархій <code>interface extends</code> дає раніші й зрозуміліші помилки.`,
        },
        {
          question: `Чому доповнити глобальний <code>Window</code> чи типи бібліотеки можна тільки через <code>interface</code>?`,
          answer: `Це <strong>declaration merging</strong> — кілька оголошень одного <code>interface</code> з тим самим ім'ям зливаються в одне. <code>type</code>-alias так не вміє: повторне оголошення = «Duplicate identifier». Тому augmentation (<code>declare global { interface Window { … } }</code>, <code>declare module</code>) працює лише з <code>interface</code>. Зворотний бік — відкритість: хтось ззовні може непомітно домержити поле у твій <code>interface</code>.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5 typeof</span>\n            <span class=\"ver ver-ts2\">TS 2.x</span>\n            <span class=\"ver ver-ts5\">TS 5.x satisfies</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія (ES5 → TS 5.x)</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Динамічна типізація, typeof, слабе порівняння</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 2</span><span class=\"changelog-text\">Interfaces, type aliases, type inference</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 4</span><span class=\"changelog-text\">Variadic tuples, const type parameters</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 5 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> satisfies operator для перевірки типів</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Type System в TypeScript:</strong></p>\n            <p>JavaScript — динамічна мова. TypeScript додає статичну типізацію. Типи живуть тільки у TS.</p>\n            <p><strong>Type vs Interface:</strong></p>\n            <ul class=\"list\">\n              <li><strong>Interface:</strong> для об'єктів, merging, extends, декларативні</li>\n              <li><strong>Type:</strong> універсально, union/intersection, більше гнучкі</li>\n              <li><strong>Discriminated Unions:</strong> union + літеральне поле-дискримінатор → «make impossible states impossible»</li>\n              <li><strong>Type narrowing:</strong> typeof, instanceof, in, дискримінатор, type predicates (is), asserts</li>\n            </ul>\n          </div><h3 class=\"topic\">Базові типи & unknown/any/never <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> TypeScript базові типи для контролю типів. unknown — безпечна any (потребує type guard). any — відімкнути type checking. never — значення які ніколи не повертаються. <strong>Навіщо:</strong> Розуміти різниці для правильної типізації. unknown краще за any.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "let num: number = 42;\nlet str: string = \"hello\";\nlet unknown: unknown = 123; // Безпечна\nlet any: any = 456; // ⚠️ Уникай!\nlet nev: never = null; // Неможливий тип"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Unknown vs Any vs Never — Таблиця</h3><p><strong>Що це:</strong> Три спеціальні типи з різним поведінням. <strong>Навіщо:</strong> Вибір правильного типу для безпечності і функціональності. any — лінивий вихід. unknown — безпечниший. never — для impossible values.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Тип</th><th>Опис</th><th>Юз-кейс</th></tr>\n              <tr><td>unknown</td><td>Безпечна \"будь-що\" — потрібна перевірка типу</td><td>catch блоки, parse результати</td></tr>\n              <tr><td>any</td><td>Вимкнути типобезпеку повністю (лінива)</td><td>Legacy код, quick fixes (УНИКАЙ!)</td></tr>\n              <tr><td>never</td><td>Тип, який ніколи не буває (dead code)</td><td>Impossible states, exhaustiveness checks</td></tr>\n            </table>\n          </div>"
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Discriminated Unions & Type Narrowing <span class="tag tag-key">KEY</span></h3><p><strong>Що це:</strong> union кількох типів зі спільним <em>літеральним</em> полем-дискримінатором (<code>status</code>, <code>kind</code>, <code>type</code>), за значенням якого TS однозначно розрізняє варіант. <strong>Type narrowing</strong> — звуження ширшого типу до конкретнішого за рантайм-перевіркою. <strong>Навіщо:</strong> головна ідея — <strong>«make impossible states impossible»</strong>: замість набору незалежних булевих/опціональних полів, що дають нелегальні комбінації, моделюєш стан як union легальних станів.</p><p><strong>Три складові DU:</strong></p><ul class="list"><li>спільна властивість у кожному члені (дискримінатор);</li><li>її тип — <em>літеральний</em> (<code>'success'</code>, не <code>string</code>);</li><li>union цих типів.</li></ul>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `// ❌ impossible states: { isLoading: true, data, error } — компілюється, але нонсенс
interface State { isLoading: boolean; data?: User; error?: Error }

// ✅ discriminated union — лише легальні стани
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }   // data існує ТІЛЬКИ тут
  | { status: 'error'; error: Error };`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Narrowing по дискримінатору</h3><p><code>switch</code> або <code>if</code> по полю-дискримінатору — TS <strong>автоматично</strong> звужує тип у кожній гілці: доступні лише поля відповідного варіанту, звернення до чужого поля = помилка компіляції.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rect'; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2; // s звужений до circle
    case 'square': return s.side ** 2;
    case 'rect':   return s.width * s.height;
  }
}`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Exhaustiveness — Senior маркер</h3><p>Компілятор гарантує, що оброблені <strong>всі</strong> варіанти: у <code>default</code> присвоюєш <code>s</code> змінній типу <code>never</code>. Додаєш новий член union (<code>{ kind: 'triangle' }</code>) → кожен <code>switch</code> без нового <code>case</code> перестає компілюватись. Компілятор стає чеклистом рефакторингу. Часто виносять у хелпер <code>assertNever</code>.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `function assertNever(x: never): never {
  throw new Error('Unexpected: ' + JSON.stringify(x));
}

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.side ** 2;
    case 'rect':   return s.width * s.height;
    default:       return assertNever(s); // помилка компіляції, якщо забув case
  }
}`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Усі механізми narrowing</h3><div class="table-wrap"><table><tr><th>Механізм</th><th>Для чого</th><th>Приклад</th></tr><tr><td><code>typeof</code></td><td>примітиви</td><td><code>if (typeof v === 'string') v.padStart(5)</code></td></tr><tr><td><code>instanceof</code></td><td>класи</td><td><code>if (err instanceof TypeError) …</code></td></tr><tr><td><code>in</code></td><td>наявність властивості</td><td><code>if ('permissions' in u) // u: Admin</code></td></tr><tr><td>дискримінатор</td><td>discriminated unions</td><td><code>if (s.kind === 'circle') …</code></td></tr><tr><td>truthiness</td><td>відсів <code>null</code>/<code>undefined</code>/<code>0</code>/<code>''</code></td><td><code>if (name) name.toUpperCase()</code></td></tr><tr><td>equality</td><td>спільний тип двох змінних</td><td><code>if (x === y) { /* спільний тип тут */ }</code></td></tr><tr><td><code>!= null</code></td><td>виключає і <code>null</code>, і <code>undefined</code></td><td><code>if (v != null) …</code></td></tr></table></div>`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Custom type guards & asserts</h3><p><strong>Type predicate</strong> (<code>arg is Type</code>) — власний guard, коли вбудованих мало. <strong>⚠️ Небезпека:</strong> predicate — це <em>обіцянка</em> компілятору, яку він <strong>не перевіряє</strong>; збрешеш у тілі — рантайм-баг без warning. TS 5.5+ інферить прості предикати сам. <strong>Assertion functions</strong> (<code>asserts val is T</code>) кидають виняток, якщо тип не той — після виклику тип звужений.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `type Cat = { type: 'cat'; meow(): void };
type Dog = { type: 'dog'; bark(): void };

function isCat(p: Cat | Dog): p is Cat {   // type predicate — обіцянка, не перевірка
  return p.type === 'cat';
}

function assertIsString(v: unknown): asserts v is string {
  if (typeof v !== 'string') throw new Error('Not a string');
}

function f(x: unknown) {
  assertIsString(x);
  x.toUpperCase(); // після assert — x: string
}`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Патерни в React</h3><p><code>useReducer</code>: і <code>State</code>, і <code>Action</code> — обидва discriminated unions. <code>reducer</code> робить <code>switch (action.type)</code> з <code>default: return assertNever(action)</code> — додаєш екшен, компілятор показує всі місця. У JSX <code>switch (state.status)</code>: <code>data</code> гарантовано є в гілці <code>'success'</code>. Ще один патерн — <strong>discriminated props</strong>: <code>{ variant: 'link'; href } | { variant: 'button'; onClick }</code> робить нелегальні комбінації пропсів помилкою компіляції.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `type State =
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: string };

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':   return { status: 'loading' };
    case 'FETCH_SUCCESS': return { status: 'success', data: action.payload };
    case 'FETCH_ERROR':   return { status: 'error', error: action.error };
    default: return assertNever(action);
  }
}`
        },
        {
          "kind": "paragraph",
          "html": `<div class="alert alert-warn"><strong>⚠️ Пастки narrowing / DU:</strong><ul class="list"><li><strong>не-літеральний дискримінатор</strong> — <code>kind: string</code> замість <code>kind: 'circle'</code> ламає narrowing;</li><li><strong>забутий <code>as const</code></strong> — <code>{ kind: 'circle' }</code> розширюється до <code>{ kind: string }</code>;</li><li>звуження <strong>«тече»</strong> — губиться після <code>await</code> чи виклику функції, що <em>могла</em> змінити змінну;</li><li><code>typeof null === 'object'</code> — <code>typeof</code> не відсіює <code>null</code>, потрібна окрема перевірка;</li><li><code>data!.name</code> (non-null assertion) глушить помилку, але нічого не перевіряє — краще guard.</li></ul></div>`
        },
        {
          "kind": "paragraph",
          "html": `<div class="alert"><strong>Зв'язок (follow-up на співбесіді):</strong> зовнішні дані приймай як <code>unknown</code> і звужуй через guards/схему. <code>never</code> — тип «неможливого значення», порожній union = <code>never</code>, основа exhaustiveness. <strong>Zod <code>discriminatedUnion</code></strong> — рантайм-валідація + точний TS-тип за дискримінатором з одного джерела: <code>z.discriminatedUnion('status', [z.object({ status: z.literal('success'), data: UserSchema }), …])</code>.</div>`
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
          "html": `<h3 class="topic">interface vs type <span class="tag tag-key">KEY</span></h3><p>Обидва описують <strong>форму (shape)</strong> типів і в ~90% випадків взаємозамінні для об'єктів. Але:</p><ul class="list"><li><strong><code>interface</code></strong> — спеціалізований для <em>об'єктних форм</em> і класів. Підтримує <strong>declaration merging</strong> і <code>extends</code>. Трохи кращі повідомлення про помилки.</li><li><strong><code>type</code></strong> (type alias) — <em>ширший</em>: описує <strong>будь-що</strong> — union, intersection, tuple, примітиви, mapped/conditional types, функції.</li></ul><div class="alert">🎯 <strong>Rule of thumb:</strong> <code>interface</code> для публічних об'єктних контрактів і форм, які можуть розширюватись; <code>type</code> — коли треба union, intersection, tuple або утилітарні/обчислювані типи. Для простого об'єкта прийнятні обидва — головне консистентність у команді.</div>`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Що вміє тільки <code>type</code></h3><ul class="list"><li><strong>Union types</strong> — <code>'idle' | 'loading' | 'success' | 'error'</code>, <code>string | number</code>;</li><li><strong>Tuple types</strong> — <code>[number, number]</code>, <code>[key: string, value: number]</code>;</li><li><strong>Примітиви й аліаси</strong> — <code>type Age = number</code>;</li><li><strong>Mapped types</strong> — <code>{ [K in keyof T]?: T[K] }</code>;</li><li><strong>Conditional types</strong> — <code>T extends U ? X : Y</code>;</li><li><strong>Utility-типи</strong> (<code>Partial</code>, <code>Pick</code>, <code>Omit</code>, <code>Record</code>, <code>ReturnType</code>) — усі це type aliases.</li></ul><p>Тому для будь-якої «обчислюваної» типової логіки — тільки <code>type</code>.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `// Union
type Status = 'idle' | 'loading' | 'success' | 'error';
type ID = string | number;
// interface так НЕ вміє

// Tuple
type Point = [number, number];
type Entry = [key: string, value: number];

// Примітив-аліас
type Age = number;

// Mapped
type Optional<T> = { [K in keyof T]?: T[K] };

// Conditional
type NonNull<T> = T extends null | undefined ? never : T;`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Що вміє тільки <code>interface</code> — declaration merging</h3><p>Кілька оголошень одного <code>interface</code> <strong>зливаються</strong> в одне. У <code>type</code> так → помилка «Duplicate identifier».</p><p><strong>Навіщо:</strong> розширення сторонніх/глобальних типів. Класика — доповнити глобальний <code>Window</code> чи типи бібліотеки. Це можливо <strong>лише</strong> через interface merging.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `interface User { name: string }
interface User { age: number }
// User === { name: string; age: number }

type User2 = { name: string };
// type User2 = { age: number };  // ❌ Error: Duplicate identifier 'User2'

// Global augmentation
declare global {
  interface Window {
    myAnalytics: (event: string) => void;
  }
}`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Спільне (обидва вміють)</h3><ul class="list"><li><strong>Розширення</strong> — <code>interface</code> через <code>extends</code>, <code>type</code> через intersection <code>&</code>;</li><li><strong>Кросова сумісність</strong> — <code>interface</code> може <code>extends</code> об'єктний <code>type</code>, і навпаки <code>type</code> може перетинати <code>interface</code> через <code>&</code>;</li><li><strong><code>implements</code> класом</strong> — і <code>interface</code>, і об'єктний <code>type</code>;</li><li><strong>Generics</strong> — <code>interface Box&lt;T&gt;</code> / <code>type Box&lt;T&gt;</code>.</li></ul>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `// extends vs intersection
interface Animal { name: string }
interface Dog extends Animal { breed: string }

type Animal2 = { name: string };
type Dog2 = Animal2 & { breed: string };

// кросова сумісність
type Base = { id: string };
interface Extended extends Base { name: string }   // ✅ interface extends type

interface Named { name: string }
type WithName = Named & { age: number };            // ✅ type intersects interface

// implements — обидва
interface Serializable { serialize(): string }
class Doc implements Serializable { serialize() { return '...'; } }

// generics — обидва
interface Box<T> { value: T }
type Box2<T> = { value: T };`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Тонкі відмінності (сигнали seniority)</h3><ul class="list"><li><strong><code>extends</code> vs <code>&</code> при конфлікті</strong> — <code>interface extends</code> <em>перевіряє сумісність</em> і кидає помилку одразу; intersection <code>&</code> <em>мовчки</em> створює тип, де конфліктне примітивне поле стає <code>never</code> (баг ховається).</li><li><strong>Продуктивність компілятора</strong> — <code>interface</code> кешується як іменований тип; складні <code>&</code>-intersection можуть перераховуватись. Помітно лише на дуже великих кодбазах — але це причина, чому TS Handbook радить <code>interface</code> за замовчуванням.</li><li><strong>Повідомлення про помилки</strong> — з іменованим <code>interface</code> читабельніші: TS показує назву, а не розгорнуту структуру великого intersection.</li><li><strong>Розширюваність = і плюс, і ризик</strong> — merging потужний, але це відкритість до модифікації ззовні. Для суворо закритих контрактів <code>type</code> безпечніший.</li></ul>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `interface A { x: number }
interface B extends A { x: string }   // ❌ Error: incompatible (одразу видно)

type A2 = { x: number };
type B2 = A2 & { x: string };         // 😶 без помилки, але x: never (баг ховається)`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Офіційна рекомендація vs реальність</h3><ul class="list"><li><strong>TS Handbook:</strong> «If you don't know which to use, use <code>interface</code>. Use <code>type</code> when you need features it provides.»</li><li><strong>React-екосистема:</strong> багато команд і частина типів React широко юзають <code>type</code> — особливо для props, бо часто потрібні union'и/intersection'и.</li><li><strong>Practical consensus:</strong> узгодь у команді через ESLint <code>@typescript-eslint/consistent-type-definitions</code>, щоб не було мішанини.</li></ul>`
        },
        {
          "kind": "paragraph",
          "html": `<div class="grid2">
    <div class="card"><h4>Бери <code>interface</code>, коли</h4><ul class="list"><li>публічний API/контракт об'єкта, що може розширюватись;</li><li>форма для <code>class implements</code>;</li><li>треба augment сторонні/глобальні типи (merging);</li><li>об'єктні ієрархії з <code>extends</code>.</li></ul></div>
    <div class="card blue"><h4>Бери <code>type</code>, коли</h4><ul class="list"><li>union / intersection / tuple / примітив;</li><li>mapped / conditional / utility типи;</li><li>тип функції як окремий аліас: <code>type Handler = (e: Event) =&gt; void</code>;</li><li>хочеш «закритий» тип без ризику merging.</li></ul></div>
  </div>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `// type — популярніше для props (часто потрібні union'и)
type ButtonProps = { variant: 'primary' | 'ghost'; onClick: () => void };

// interface — теж норм, зручно extends нативні атрибути
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}`
        },
        {
          "kind": "paragraph",
          "html": `<div class="alert alert-warn"><strong>⚠️ Пастки:</strong><ul class="list"><li><strong>метод vs властивість</strong> — синтаксис методу (<code>fn(): void</code>) вмикає bivariance-перевірку параметрів; для строгості пиши властивість (<code>fn: () =&gt; void</code>);</li><li><strong>очікувати merging від <code>type</code></strong> — його немає, буде «Duplicate identifier»;</li><li><strong><code>&</code> замість <code>extends</code> для конфліктних типів</strong> → тихий <code>never</code>, схований баг;</li><li><strong>мішати стилі без правила</strong> — знижує читабельність; увімкни ESLint-правило.</li></ul></div>`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Як подавати на співбесіді</h3><ul class="list"><li><strong>Практичне правило:</strong> за замовчуванням <code>interface</code> для об'єктних контрактів (props, DTO, service shapes) — кращі помилки, <code>extends</code>, можливість augment. <code>type</code> — коли треба union (напр. discriminated union для async-станів), intersection, tuple або utility-типи.</li><li><strong>Discriminated unions:</strong> async-стани — це <code>type State = {…} | {…}</code>, union, тому тільки <code>type</code>. Прямий зв'язок з «make impossible states impossible».</li><li><strong>Global augmentation:</strong> розширення <code>Window</code> чи типів бібліотек — через <code>interface</code> merging, бо <code>type</code> так не вміє.</li></ul>`
        },
        {
          "kind": "paragraph",
          "html": `<div class="alert"><strong>✅ Чеклист «знаю тему на Senior»</strong><ul class="list"><li>обидва описують форму; <code>type</code> ширший;</li><li>тільки <code>type</code>: union, intersection, tuple, примітиви, mapped, conditional, utility;</li><li>тільки <code>interface</code>: declaration merging (+ global augmentation);</li><li><code>extends</code> (interface) vs <code>&</code> (type intersection);</li><li>кросова сумісність: interface extends type і навпаки;</li><li><code>extends</code> дає ранню помилку при конфлікті; <code>&</code> дає тихий <code>never</code>;</li><li><code>interface</code> трохи ефективніший для компілятора (великі кодбази);</li><li>офіційна рекомендація: <code>interface</code> за замовчуванням, <code>type</code> за потребою;</li><li>React props — обидва ок (<code>type</code> популярніше для union'ів);</li><li>consistency через ESLint <code>consistent-type-definitions</code>.</li></ul></div>`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Abstract class vs Interface <span class="tag tag-key">KEY</span></h3><p><strong>Суть в одному реченні:</strong> <strong>interface</strong> — це про <em>що</em> (форма, compile-time, повністю стирається, нуль рантайм-коду). <strong>abstract class</strong> — про <em>що + як</em> (форма + спільна реалізація + стан + ідентичність у рантаймі). interface описує лише сигнатури; abstract class може містити готові методи, поля, конструктор і залишати частину <code>abstract</code> для нащадків.</p><div class="table-wrap">
            <table>
              <tr><th>Критерій</th><th>Interface</th><th>Abstract class</th></tr>
              <tr><td>Рантайм</td><td>Ні — стирається (type-only)</td><td>Так — існує як JS-клас</td></tr>
              <tr><td>Реалізація методів / стан</td><td>Ні, лише сигнатури</td><td>Так — тіла методів, ініціалізовані поля</td></tr>
              <tr><td>Конструктор</td><td>Ні</td><td>Так</td></tr>
              <tr><td><code>private</code>/<code>protected</code>, <code>static</code></td><td>Ні (усе публічне)</td><td>Так</td></tr>
              <tr><td>Скільки можна взяти</td><td><code>implements A, B, C</code> — кілька</td><td><code>extends</code> — лише один</td></tr>
              <tr><td>Declaration merging</td><td>Так (повторне оголошення доповнює)</td><td>Ні (помилка)</td></tr>
              <tr><td><code>instanceof</code> у рантаймі</td><td>Ні (нема на що перевіряти)</td><td>Так</td></tr>
              <tr><td><code>new</code></td><td>—</td><td>Ні — тільки нащадка</td></tr>
            </table>
          </div><p><strong>Structural vs nominal:</strong> TS порівнює типи за <em>структурою</em> — клас задовольняє interface навіть без явного <code>implements</code> (на відміну від Java/C# з nominal typing).</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `// Interface — контракт форми (compile-time, стирається)
interface Repository<T> {
  findById(id: string): T | null;
  save(entity: T): void;
}

// Abstract class — спільна реалізація + abstract-«дірки»
abstract class BaseRepository<T> implements Repository<T> {
  protected items = new Map<string, T>();          // стан

  findById(id: string): T | null {                 // готова реалізація
    return this.items.get(id) ?? null;
  }
  abstract save(entity: T): void;                  // нащадок мусить дореалізувати
}

class UserRepository extends BaseRepository<User> { // extends — лише один
  save(user: User) { this.items.set(user.id, user); }
}

// new BaseRepository()          → помилка: abstract не інстанціюється
// repo instanceof BaseRepository → ✅ працює (клас існує в рантаймі)
// x instanceof Repository       → ✗ не компілюється (interface стерто)
class Service implements Repository<User>, Disposable { /* кілька interface */ }`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Коли що обирати</h3><p><strong>Rule of thumb:</strong> починай з <strong>interface</strong> (контракти: props, DTO, service contracts, публічний API бібліотеки). Переходь на <strong>abstract class</strong> тоді, коли з'являється <em>спільна реалізація або стан</em>, що дублюється між класами — базовий репозиторій, template method. Обидва інструменти вторинні до композиції: <em>«prefer composition over inheritance»</em>, ієрархію тримай пласкою.</p>`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Template Method Pattern — канонічний use case</h3><p>Abstract class задає <strong>скелет алгоритму</strong>, нащадки заповнюють кроки-«дірки». Interface так не вміє — він не може зафіксувати сам алгоритм.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `abstract class DataExporter {
  export(data: unknown[]): string {          // template method — фіксований алгоритм
    const header = this.formatHeader();
    const rows = data.map(d => this.formatRow(d));
    return [header, ...rows].join('\\n');
  }
  protected abstract formatHeader(): string;  // «дірки» для нащадків
  protected abstract formatRow(item: unknown): string;
}

class CsvExporter extends DataExporter {
  protected formatHeader() { return 'id,name'; }
  protected formatRow(item: any) { return \`\${item.id},\${item.name}\`; }
}`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Гібрид: interface + abstract base</h3><p>Промислова практика — <strong>interface як публічний контракт</strong>, abstract class як <em>необов'язкова</em> базова реалізація для зручності. Споживач залежить від interface (<strong>Dependency Inversion</strong>), реалізація може або наслідувати базовий клас, або імплементувати interface напряму.</p>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `interface Logger { log(msg: string): void; error(msg: string): void }

abstract class BaseLogger implements Logger {
  abstract log(msg: string): void;
  error(msg: string) { this.log(\`ERROR: \${msg}\`); }  // готове — нащадкам менше писати
}

class ConsoleLogger extends BaseLogger {
  log(msg: string) { console.log(msg); }               // error успадковано безкоштовно
}`
        },
        {
          "kind": "paragraph",
          "html": `<div class="alert alert-warn"><strong>⚠️ Пастки:</strong><ul class="list"><li><strong>interface для рантайму</strong> (<code>instanceof</code>, DI-токени) не спрацює — стирається. <strong>Angular DI:</strong> interface не може бути токеном — потрібен клас або <code>InjectionToken</code>; abstract class часто і є DI-абстракцією: <code>{ provide: AbstractService, useClass: ConcreteService }</code>;</li><li><strong>fragile base class</strong> — глибока ієрархія abstract class крихка: зміна базового ламає всіх нащадків;</li><li>плутати <code>implements</code> (контракт) і <code>extends</code> (реалізація);</li><li>abstract class, де всі методи <code>abstract</code> і нема реалізації — це фактично interface, але дорожчий (рантайм-код). Тоді бери interface.</li></ul></div>`
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
          question: `Виклик функції <em>до</em> її оголошення: коли буде <code>TypeError</code>, а коли <code>ReferenceError</code>?`,
          answer: `Залежить від форми. <strong>Function declaration</strong> піднімається повністю — виклик вище оголошення просто працює. <strong>Function expression через <code>var</code></strong>: піднімається лише оголошення змінної зі значенням <code>undefined</code>, тому виклик = <code>undefined()</code> → <strong><code>TypeError</code></strong> (<code>x is not a function</code>). <strong>Через <code>const</code>/<code>let</code></strong>: змінна в <strong>TDZ</strong> (Temporal Dead Zone) до рядка оголошення → <strong><code>ReferenceError</code></strong>. Розрізнення цих двох помилок — типова деталь, що виділяє кандидата.`,
        },
        {
          question: `Чим <code>this</code> у звичайній функції відрізняється від <code>this</code> у стрілковій, і які 4 правила визначають <code>this</code> для звичайної?`,
          answer: `Звичайна функція має <strong>динамічний</strong> <code>this</code> — визначається тим, <em>як</em> її викликали: (1) метод <code>obj.fn()</code> → <code>this = obj</code>; (2) проста функція <code>fn()</code> → <code>undefined</code> у strict / <code>globalThis</code> у non-strict; (3) <code>new fn()</code> → новий інстанс; (4) <code>fn.call/apply/bind(ctx)</code> → <code>this = ctx</code> явно. Стрілкова <strong>не має власного <code>this</code></strong> — бере його лексично з місця оголошення, і <code>call/apply/bind</code> на неї не впливають. Тому стрілка — для колбеків (зберегти зовнішній <code>this</code>), звичайна — для методів, де <code>this</code> має бути динамічним.`,
        },
        {
          question: `Чого саме позбавлена стрілкова функція і чому її не можна викликати через <code>new</code>?`,
          answer: `У стрілки немає власних <code>this</code>, <code>arguments</code>, <code>super</code>, <code>new.target</code>, немає властивості <code>prototype</code> і немає внутрішнього методу <code>[[Construct]]</code>. Саме відсутність <code>[[Construct]]</code> і <code>prototype</code> робить <code>new ArrowFn()</code> → <code>TypeError: not a constructor</code>. Також стрілка не може бути генератором (<code>function*</code>). Практичний наслідок: стрілку не використовують як метод об'єкта/прототипу, що читає <code>this</code>, і як конструктор-фабрику.`,
        },
        {
          question: `Навіщо потрібен Named Function Expression (<code>const f = function named() {…}</code>), якщо ім'я не витікає назовні?`,
          answer: `Ім'я видиме <strong>лише всередині тіла</strong> функції. Два зиски: (1) <strong>рекурсія</strong> за внутрішнім іменем не залежить від зовнішньої змінної, яку могли перепризначити чи яка може бути відсутня (напр. функція передана як колбек); (2) <strong>кращі stack traces</strong> — анонімні функції показуються як <code>anonymous</code>, named FE — зі своїм іменем. Згадка NFE на співбесіді — сигнал глибини.`,
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-es5\">ES5</span>\n            <span class=\"ver ver-es6\">ES6 arrows</span>\n            <span class=\"ver ver-ts4\">TS 4.x overloads</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Хронологія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES5</span><span class=\"changelog-text\">Function declaration, expression, hoisting, this</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">ES6</span><span class=\"changelog-text\">Arrow functions, default/rest params</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">TS 5 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> Typed this параметри, overloads</span></div>\n          </div><div style=\"background: #1a1f2e; border-left: 4px solid #f7df1e; padding: 16px; border-radius: 6px; margin-bottom: 20px;\">\n            <p><strong>Closures:</strong> Функції мають доступ до змінних батьківської області.</p>\n            <p><strong>Scope Chain:</strong> Local → Function → Global</p>\n            <p><strong>TDZ (Temporal Dead Zone):</strong> let/const до декларації — ReferenceError</p>\n            <p><strong>Hoisting:</strong> function декларації підіймаються, вирази — ні.</p>\n          </div><h3 class=\"topic\">Hoisting: Declaration vs Expression <span class=\"tag tag-key\">KEY</span></h3><p><strong>Що це:</strong> Hoisting — процес коли JavaScript рушій рухає декларації на верх scope. function declaration піднімається повністю (можеш викликати раніше). var піднімається але = undefined. let/const НЕ хойстаються (TDZ — Temporal Dead Zone). <strong>Навіщо:</strong> Розуміти execution order. Уникнути undefined errors.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th></th><th>Function Declaration</th><th>Function Expression</th><th>Arrow Function</th></tr>\n              <tr><td>Hoisting</td><td>✓ Full (Whole function)</td><td>✗ TDZ (undefined)</td><td>✗ TDZ</td></tr>\n              <tr><td>Can use before declare</td><td>✓ Yes</td><td>✗ No (ReferenceError)</td><td>✗ No</td></tr>\n              <tr><td>this binding</td><td>Dynamic</td><td>Dynamic</td><td>Lexical</td></tr>\n              <tr><td>arguments</td><td>✓ власний</td><td>✓ власний</td><td>✗ (бере з оточення)</td></tr>\n              <tr><td>new (constructor)</td><td>✓</td><td>✓</td><td>✗ TypeError</td></tr>\n              <tr><td>prototype property</td><td>✓</td><td>✓</td><td>✗ немає</td></tr>\n              <tr><td>super / new.target</td><td>✓</td><td>✓</td><td>✗ (лексично)</td></tr>\n              <tr><td>generator (function*)</td><td>✓</td><td>✓</td><td>✗</td></tr>\n              <tr><td>Named</td><td>завжди named</td><td>named / anon</td><td>лише через змінну</td></tr>\n            </table>\n          </div>"
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
          kind: 'paragraph',
          html: `<h3 class="topic">Hoisting — TypeError vs ReferenceError <span class="tag tag-key">KEY</span></h3>
  <p><strong>Що це:</strong> function declaration піднімається <em>цілим тілом</em> — виклик вище оголошення працює. Function expression піднімає <em>лише змінну</em>, тому поведінка залежить від того, чим оголошено.</p>
  <div class="table-wrap">
    <table>
      <tr><th>Форма</th><th>Виклик до оголошення</th></tr>
      <tr><td><code>function greet(){}</code></td><td>✓ працює (тіло підняте)</td></tr>
      <tr><td><code>var greet = function(){}</code></td><td><code>greet</code> === <code>undefined</code> → <strong>TypeError</strong> (<code>greet is not a function</code>)</td></tr>
      <tr><td><code>const/let greet = …</code></td><td>змінна в <strong>TDZ</strong> → <strong>ReferenceError</strong></td></tr>
    </table>
  </div>
  <div class="alert"><span class="icon">💡</span><span>На інтерв'ю точна відповідь — розрізняти <strong>TypeError</strong> (<code>var</code>) і <strong>ReferenceError</strong> (<code>const</code>/<code>let</code> TDZ). Це деталь, яка виділяє.</span></div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">4 правила визначення <code>this</code> для звичайних функцій</h3>
  <p><code>this</code> у звичайній функції — <strong>динамічний</strong>, визначається тим, <em>як</em> викликано, не де оголошено. Повний розбір <code>call/apply/bind</code> — у розділі «🎯 This Binding» нижче.</p>
  <ul class="list">
    <li><strong>Метод</strong> <code>obj.fn()</code> → <code>this = obj</code></li>
    <li><strong>Проста функція</strong> <code>fn()</code> → <code>undefined</code> (strict) / <code>globalThis</code> (non-strict)</li>
    <li><strong><code>new fn()</code></strong> → <code>this =</code> новий інстанс</li>
    <li><strong><code>fn.call/apply/bind(ctx)</code></strong> → <code>this = ctx</code> явно</li>
  </ul>
  <p>Стрілкова функція ігнорує всі чотири — бере <code>this</code> лексично з оточення на момент оголошення.</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'this: динамічний (regular) vs лексичний (arrow)',
          code: `const obj = {
  name: 'Roman',
  regular() { return this.name; },
};
obj.regular();            // 'Roman' — this = obj
const fn = obj.regular;
fn();                     // undefined (strict) — this загублено

// Arrow РЯТУЄ в колбеках — зберігає зовнішній this:
class Timer {
  seconds = 0;
  start() {
    setInterval(() => { this.seconds++; }, 1000); // this = інстанс Timer
    // з function () {...} тут this був би undefined — класичний баг
  }
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Named Function Expression (NFE)</h3>
  <p><strong>Що це:</strong> function expression з іменем, видимим <em>лише всередині власного тіла</em>. <strong>Навіщо:</strong> рекурсія без залежності від зовнішньої змінної (яку могли перепризначити) + кращі stack traces (не <code>anonymous</code>).</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `const factorial = function fact(n: number): number {
  return n <= 1 ? 1 : n * fact(n - 1); // ім'я 'fact' видиме ТІЛЬКИ тут
};
factorial(5); // 120
// fact;      // ❌ ReferenceError — ім'я не витікає в зовнішній scope`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React-специфіка <span class="tag tag-pit">PITFALL</span></h3>
  <p>Компонент можна оголосити обома способами: <code>function Button() {}</code> (hoisted, named у React DevTools) або <code>const Button = () => …</code> (треба оголосити вище використання).</p>
  <p><strong>Пастка perf:</strong> inline-стрілка в JSX (<code>onClick={() => doThing(id)}</code>) створює <strong>нову референцію щорендер</strong> → діти в <code>React.memo</code> ре-рендеряться, бо referential equality зламана. Фікс — <code>useCallback</code> або винести handler. Але не оптимізуй передчасно: для простих випадків inline-стрілка нормальна.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Пастки</h3>
  <ul class="list">
    <li><strong>Arrow як метод об'єкта/прототипу з <code>this</code></strong> → <code>this</code> не той (лексичний, не <code>obj</code>).</li>
    <li><strong>Arrow як class property</strong> прив'язує <code>this</code> до інстансу (зручно для handlers), але кладеться на <strong>кожен інстанс</strong>, не на <code>prototype</code> → трохи більше пам'яті, не видно в prototype chain.</li>
    <li><strong>Одно-рядкова arrow з <code>{}</code></strong> — це блок, не implicit return: <code>x => { x * 2 }</code> повертає <code>undefined</code>. Для об'єкта — <code>x => ({ ... })</code>.</li>
    <li><strong><code>arguments</code> в arrow</strong> → бере з оточення або <code>ReferenceError</code>. Використовуй <code>...rest</code>.</li>
  </ul>`,
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"changelog changelog-future\"><div class=\"changelog-title\">🔮 Що буде у 2025+</div><div class=\"changelog-row\"><span class=\"chver\">2025</span><span class=\"changelog-text\">Partial application syntax (potential), pipe operator, better function composition</span></div></div>"
        }
      ]
    },
    {
      id: 'closures-deep-dive',
      title: '🔒 Closures — глибокий розбір',
      interviewQuestions: [
        {
          question: `«Кожна функція в JS — це closure» — правда чи ні?`,
          answer: `Технічно так: кожна функція має посилання на лексичне оточення, де її створено, тож має доступ до зовнішнього scope. Але <strong>термін</strong> "closure" вживають, коли функція <em>переживає</em> свій зовнішній контекст і продовжує тримати доступ до його змінних (повернена назовні, збережена, передана як колбек). Формула: <strong>closure = function + lexical environment</strong>.`,
        },
        {
          question: `Чому <code>for (var i…) setTimeout(() => console.log(i))</code> друкує <code>3 3 3</code>, і чому <code>let</code> це виправляє без іншого коду?`,
          answer: `<code>var</code> має <strong>function scope</strong> — усі три колбеки замикають <em>ту саму</em> змінну <code>i</code>; на момент виконання таймерів цикл завершився і <code>i === 3</code>. <code>let</code> має <strong>block scope</strong> і специфікація створює <strong>нову прив'язку <code>i</code> на кожну ітерацію</strong> (з копіюванням значення попередньої) — кожне замикання захоплює власну. Pre-ES6 фікс — IIFE, що бере копію <code>i</code> у параметр.`,
        },
        {
          question: `Два виклики <code>createCounter()</code> — вони ділять стан?`,
          answer: `Ні. Кожен виклик зовнішньої функції створює <strong>новий</strong> лексичний environment зі своїм <code>count</code>, тому лічильники повністю ізольовані. Це і є основа module pattern / приватного стану: змінна доступна лише через повернуті замикання, ззовні — <code>undefined</code>.`,
        },
        {
          question: `У чому корінь stale closure в <code>useEffect</code> і три способи це полагодити?`,
          answer: `Кожен рендер React створює <strong>новий scope</strong> зі своїм <code>count</code>. Колбек в <code>useEffect(() => {…}, [])</code> замкнув <code>count</code> <em>першого</em> рендеру (0) і більше не оновлюється, бо ефект не перестворювався. Фікси: (1) додати <code>count</code> у deps — ефект перестворюється зі свіжим замиканням; (2) functional update <code>setCount(c => c + 1)</code> — не залежить від замкненого значення; (3) <code>useRef</code>, який оновлюють щорендер (<code>ref.current = count</code>) і читають у колбеку. Масив залежностей у хуках існує саме <em>через</em> замикання.`,
        },
        {
          question: `<code>this</code> — це частина closure?`,
          answer: `Ні. <code>this</code> визначається динамічно за call-site (для звичайних функцій), не замикається лексично як звичайна змінна. Виняток — стрілкова функція бере <code>this</code> лексично, але це <em>окремий</em> механізм (<code>[[ThisMode]]: lexical</code>), а не closure над змінною <code>this</code>.`,
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Визначення <span class="tag tag-key">KEY</span></h3>
  <p><strong>Closure</strong> — функція разом із посиланнями на її <strong>лексичне оточення</strong>. Функція "пам'ятає" змінні зі scope, у якому була <em>створена</em>, навіть після того, як цей scope завершив виконання. Змінна живе не в стеку (не зникає при поверненні), а в купі (heap), поки на неї є посилання.</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `function outer() {
  const secret = 42;           // локальна змінна outer
  return function inner() {
    return secret;             // inner "замикає" secret
  };
}
const fn = outer();            // outer завершився...
fn();                          // 42 — secret досі живий через closure`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Як це працює під капотом</h3>
  <ul class="list">
    <li>При створенні функції JS зберігає внутрішнє посилання <code>[[Environment]]</code> на scope, де функцію <strong>оголошено</strong> (лексично, не де викликано).</li>
    <li>Під час виконання resolve змінних іде по <strong>scope chain</strong>: локальний → зовнішній (через <code>[[Environment]]</code>) → … → global.</li>
    <li>Якщо зовнішня функція завершилась, але внутрішня жива, GC <strong>не збирає</strong> ті змінні зовнішнього scope, на які є посилання — вони переїжджають у heap.</li>
  </ul>
  <div class="alert warn"><span class="icon">⚠️</span><span>Closure має вартість пам'яті: замкнені змінні не звільняються, доки живе функція, що їх тримає.</span></div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Лексичний scope — за місцем оголошення, не виклику',
          code: `const x = 'global';
function outer() {
  const x = 'outer';
  function inner() { return x; }  // бере x з місця ОГОЛОШЕННЯ
  return inner;
}
outer()();  // 'outer' — не 'global'`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Класичний баг: <code>var</code> у циклі <span class="tag tag-key">KEY</span></h3>
  <p><code>var</code> має function scope — усі колбеки замикають <strong>ту саму</strong> <code>i</code>. <code>let</code> створює нову прив'язку на кожну ітерацію; IIFE захоплює копію в параметр.</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `// ❌ Проблема
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

// ✅ Фікс 1 — let (block scope, нова i на ітерацію)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// ✅ Фікс 2 — IIFE (pre-ES6), захоплює копію i в j
for (var k = 0; k < 3; k++) {
  ((j) => setTimeout(() => console.log(j), 100))(k); // 0, 1, 2
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Практичні патерни</h3>
  <div class="grid2">
    <div class="card"><h4>Privacy / module</h4><p>Приватна змінна, доступна лише через повернуті методи.</p></div>
    <div class="card"><h4>Function factory</h4><p>Параметризована функція, що замикає конфіг.</p></div>
    <div class="card"><h4>Memoize</h4><p><code>cache</code> живе в closure між викликами.</p></div>
    <div class="card"><h4>Debounce / throttle</h4><p><code>timer</code> — стан між викликами через closure.</p></div>
    <div class="card"><h4>Currying</h4><p>Кожен рівень замикає попередній аргумент.</p></div>
    <div class="card"><h4>once</h4><p><code>called</code> + <code>result</code> у closure.</p></div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'debounce, memoize, once — стан живе в замиканні',
          code: `function debounce<T extends unknown[]>(fn: (...a: T) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;      // стан між викликами
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function memoize<A, R>(fn: (arg: A) => R) {
  const cache = new Map<A, R>();                 // кеш у closure
  return (arg: A): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function once<T extends unknown[], R>(fn: (...a: T) => R) {
  let called = false, result: R;
  return (...args: T): R => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Closures у React — stale closure <span class="tag tag-pit">PITFALL</span></h3>
  <p>Кожен рендер = новий scope зі своїм <code>count</code>. Колбек в <code>useEffect</code> з <code>[]</code> замкнув <code>count</code> першого рендеру і не оновлюється. Масив залежностей існує саме <em>через</em> замикання — він каже React, коли перестворити функцію з актуальним лексичним оточенням.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // ❌ ЗАВЖДИ 0 — замкнув count з першого рендеру
    }, 1000);
    return () => clearInterval(id);
  }, []); // порожні deps

  // Фікси:
  // 1) }, [count]);                 — ефект перестворюється зі свіжим count
  // 2) setCount(c => c + 1);        — functional update, не залежить від замикання
  // 3) const ref = useRef(count);   — ref.current = count щорендер, читаємо ref.current
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Closures і memory leaks</h3>
  <p>Замикання можуть тримати живими великі об'єкти й підписки. Реальні витоки:</p>
  <ul class="list">
    <li>Event listeners, що замикають компонент/DOM і не знімаються — <code>removeEventListener</code> у cleanup.</li>
    <li>Таймери / інтервали без очистки.</li>
    <li>Підписки (WebSocket, RxJS), що замикають стан — <code>unsubscribe</code> / <code>takeUntil</code>.</li>
  </ul>
  <p><code>useEffect</code> cleanup вирішує те саме в React, що <code>unsubscribe</code> в RxJS.</p>`,
        },
      ],
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
        {
          question: `Чим SWC відрізняється від Babel, і чим він НЕ є (попри те, що часто називають 'бандлером')?`,
          answer: `SWC — компілятор на Rust (транспіляція TS/JSX/нового синтаксису в сумісний JS), а не бандлер — він не будує граф залежностей і не пакує файли разом. Він конкурує з Babel, а не з Webpack/Vite/esbuild-як-бандлерами; Next.js використовує SWC замість Babel для транспіляції.`,
        },
        {
          question: `З яких етапів складається типовий production build pipeline, окрім бандлінгу?`,
          answer: `Послідовно: поліфіли за browserslist → транспіляція (Babel/SWC) → tree-shaking → мінізфікація/mangling (Terser) → source maps → gzip/brotli-компресія. Пропуск будь-якого етапу — типова причина або зайвого ваги бандла, або несумісності зі старими браузерами.`,
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
          "html": "<p><strong>Сучасні альтернативи:</strong> Webpack лишається найгнучкішим і найпоширенішим у legacy/enterprise проєктах (Angular CLI досі підтримує його поряд з esbuild), але нові проєкти дедалі частіше обирають швидші інструменти на основі native-бінарників.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Інструмент</th><th>Мова рушія</th><th>Швидкість dev-старту</th><th>Де типово</th></tr>\n              <tr><td>Webpack</td><td>JS</td><td>Повільніше (особливо на великих проєктах)</td><td>Enterprise, CRA-legacy, кастомна конфігурація</td></tr>\n              <tr><td>Vite</td><td>esbuild (Go) + Rollup для build</td><td>Дуже швидко (native ESM у dev)</td><td>React/Vue SPA, нові проєкти</td></tr>\n              <tr><td>esbuild</td><td>Go</td><td>Найшвидший бандлер</td><td>Angular CLI application builder</td></tr>\n              <tr><td>Turbopack</td><td>Rust</td><td>Швидко, інкрементальний кеш</td><td>Next.js (з v13+, дефолт у v15+)</td></tr>\n              <tr><td>SWC</td><td>Rust</td><td>Дуже швидкий (компілятор, не бандлер)</td><td>Заміна Babel у Next.js; плагін для Vite/Webpack</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Package Managers — npm vs yarn vs pnpm</h3><p><strong>Що це:</strong> усі три встановлюють залежності з <code>package.json</code>, але по-різному зберігають <code>node_modules</code>. <strong>npm/yarn classic</strong> копіюють кожен пакет у <code>node_modules</code> кожного проєкту (дублювання на диску) і історично «сплющували» дерево залежностей — звідси <em>phantom dependencies</em> (пакет доступний у коді, хоч і не вказаний у власному <code>package.json</code>, бо його підняв інший пакет). <strong>pnpm</strong> зберігає всі версії пакетів в одному <strong>content-addressable store</strong> на диску і лінкує їх у <code>node_modules</code> через symlinks/hardlinks — економія диска й швидша установка, а суворіша (non-flat) структура <code>node_modules</code> унеможливлює phantom dependencies. <strong>Навіщо:</strong> pnpm особливо виграє в монорепо (<strong>workspaces</strong>) — спільний store для всіх пакетів репозиторію.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "# npm — копіює пакети в node_modules кожного проєкту\nnpm install\n\n# pnpm — лінкує з єдиного content-addressable store\npnpm install\n\n# pnpm workspaces (монорепо) — pnpm-workspace.yaml\npackages:\n  - 'apps/*'\n  - 'packages/*'\n\n# Встановити залежність лише в один workspace-пакет\npnpm --filter @myorg/web add axios"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Повний build pipeline — послідовність етапів</h3><p>Tree-shaking (вище) — лише один із кроків. Типовий production-білд проходить послідовно кілька перетворень:</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>#</th><th>Етап</th><th>Що робить</th></tr>\n              <tr><td>1</td><td>Поліфіли (core-js + browserslist)</td><td><code>browserslist</code> визначає цільові браузери → підключаються лише потрібні поліфіли</td></tr>\n              <tr><td>2</td><td>Транспіляція (Babel/SWC)</td><td>Новий синтаксис (TS, JSX, останній ES) → сумісний JS для цільових браузерів</td></tr>\n              <tr><td>3</td><td>Tree-shaking</td><td>Видалення невикористаного експортованого коду (лише для ESM)</td></tr>\n              <tr><td>4</td><td>Мініфікація (Terser)</td><td>Видалення пробілів/коментарів, mangling — коротші імена змінних</td></tr>\n              <tr><td>5</td><td>Source maps</td><td>Карта відповідності мінікоду → оригінального джерела для дебагу</td></tr>\n              <tr><td>6</td><td>Компресія (gzip/brotli)</td><td>Стиснення для передачі по мережі</td></tr>\n            </table>\n          </div>"
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
        {
          question: `Чому Singleton і React Context часто плутають, хоча вони вирішують різні задачі?`,
          answer: `Обидва здаються способом уникнути 'prop drilling'. Але Singleton — гарантія РІВНО одного інстансу на модульному рівні (прихована залежність, важко тестувати ізольовано). Context — лише механізм розповсюдження значення деревом компонентів; можна змонтувати кілька <code>&lt;Provider&gt;</code> з різними значеннями одночасно.`,
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
          "html": "<div class=\"alert alert-warn\"><span class=\"icon\">⚠️</span><span><strong>Singleton ≠ React Context.</strong> Singleton гарантує РІВНО один інстанс на весь застосунок (модульний рівень, прихована глобальна залежність, важко мокати в тестах). React Context — механізм <em>розповсюдження</em> значення деревом компонентів, а не сам по собі механізм єдиного інстансу: можна змонтувати кілька <code>&lt;Provider&gt;</code> з РІЗНИМИ значеннями одночасно в різних піддеревах. Їх плутають, бо обидва «уникають прокидання пропів по всьому дереву», але вирішують різні задачі.</span></div>"
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
      id: 'core-data-structures',
      title: '🗂️ Структури даних (CS) у JS/TS',
      interviewQuestions: [
        {
          question: 'Як hash-таблиця влаштована всередині, і чому середня складність операцій O(1), а гірша — O(n)? Що таке load factor і rehash?',
          answer: 'Всередині — масив «бакетів». Хеш-функція перетворює ключ на число, за модулем довжини масиву це дає індекс бакета — тож доступ іде напряму, без перебору. Коли два різні ключі дають один бакет (колізія), їх зберігають разом: <strong>ланцюжком</strong> (список/масив у бакеті) або <strong>відкритою адресацією</strong> (кладуть у наступний вільний слот). У середньому в бакеті 0–1 елемент → O(1); якщо хеш поганий і всі ключі впали в один бакет, операція вироджується в лінійний пошук по ланцюжку → O(n). <code>load factor</code> = записи / бакети; коли він перевищує поріг (типово ~0.75), масив бакетів збільшують і <strong>всі</strong> ключі перехешовують під новий розмір (<code>rehash</code>, разова O(n)) — саме тому <code>Map.set</code> це <em>амортизоване</em> O(1).',
        },
        {
          question: 'Object чи Map як словник — у чому реальна різниця, і коли що брати?',
          answer: '<code>Map</code>: ключі будь-якого типу (об\'єкт, функція, число — не лише рядок), гарантований порядок вставки при ітерації, <code>.size</code> без ручного підрахунку, немає колізій з успадкованими іменами (<code>toString</code>, <code>constructor</code>), оптимізований під часті додавання/видалення. <code>Object</code>: ключі лише string/symbol (число мовчки стає рядком), швидший літерал і доступ через прихований клас для <strong>малого фіксованого</strong> набору відомих полів, зручна деструктуризація та JSON. Правило: динамічний набір пар, що росте/зменшується в рантаймі, або нерядкові ключі → <code>Map</code>; структура запису з відомими полями → <code>Object</code>.',
        },
        {
          question: 'Чому array.shift() — це O(n), і як зробити чергу з O(1) на видалення в JS?',
          answer: '<code>shift()</code> прибирає нульовий елемент і <strong>зсуває всі інші</strong> на одну позицію вліво (переіндексація), тому вартість пропорційна довжині — O(n). Для O(1)-черги: (1) не робити <code>shift</code>, а тримати індекс голови (<code>const first = q[head++]</code>) і періодично обрізати масив; (2) реалізація на двозв\'язному списку з вказівниками на голову й хвіст; (3) кільцевий буфер фіксованого розміру. <code>push</code> у кінець лишається амортизованим O(1) у будь-якому варіанті.',
        },
        {
          question: 'Коли брати Heap / Priority Queue замість того, щоб просто відсортувати масив?',
          answer: 'Коли потрібен <strong>лише екстремум</strong> (min/max) або <strong>top-K</strong>, а не повний порядок, і дані надходять/змінюються динамічно. Повне сортування — O(n log n) і його треба повторювати після кожної вставки. Купа дає peek за O(1), вставку й зняття екстремуму за O(log n), тож потоковий top-K — O(n log k), медіана потоку (дві купи) — O(log n) на елемент, Dijkstra бере наступний найближчий вузол за O(log n). У JS вбудованої немає, тому на співбесіді або пишуть бінарну купу на масиві (<code>sift-up</code>/<code>sift-down</code>, діти за індексами <code>2i+1</code>/<code>2i+2</code>), або емулюють через відсортовану вставку, якщо K малий.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <p>Класичні структури даних із курсу CS — але подані як воно є в JS/TS: що це, коли брати, складність (Big-O) і як виглядає в мові. API-деталі <code>Map</code>/<code>Set</code>/<code>Array</code> — вище в розділі «Built-in Objects»; тут — структури як концепції.</p>
            <div class="grid2">
              <div class="card">
                <h4>Hash Table — <code>Map</code> / <code>Object</code> / <code>Set</code></h4>
                <p>Хеш-функція перетворює ключ на індекс бакета в масиві → доступ без перебору. Колізії розв'язують <strong>ланцюжками</strong> (список у бакеті) або <strong>відкритою адресацією</strong> (наступний вільний слот). Коли заповненість (load factor) переходить поріг — масив бакетів збільшують і всі ключі перехешовують (rehash).</p>
                <p><strong>Коли:</strong> підрахунок частот, «бачив раніше», Two Sum, дедуплікація, кеш, індекс за ключем.</p>
                <p><strong>Big-O:</strong> вставка / пошук / видалення O(1) у середньому · O(n) у гіршому (усі ключі в один бакет).</p>
                <pre><code>const m = new Map();
m.set('a', 1); m.get('a'); m.has('a'); m.delete('a');
const seen = new Set(); seen.add(x); seen.has(x);</code></pre>
              </div>

              <div class="card">
                <h4>Dynamic Array — <code>Array</code></h4>
                <p>JS-масив = зростаючий масив: рушій тримає суцільний блок і збільшує місткість, коли воно закінчується — тому <code>push</code> це <strong>амортизоване</strong> O(1). Операції не з кінця зсувають хвіст.</p>
                <p><strong>Коли:</strong> прямий доступ за індексом, ітерація, база для two pointers / sliding window.</p>
                <p><strong>Big-O:</strong> доступ O(1) · <code>push</code>/<code>pop</code> O(1) аморт. · <code>shift</code>/<code>unshift</code>/<code>splice</code> O(n) · пошук значення O(n).</p>
                <pre><code>const a = [1, 2, 3];
a.push(4);          // O(1) аморт.
a.splice(1, 0, 9);  // O(n) — зсув хвоста
// діри (a[100]=1) → «розріджений» масив, повільніше</code></pre>
              </div>

              <div class="card">
                <h4>Linked List (зв'язний список)</h4>
                <p>Вузли зі значенням і посиланням <code>next</code> (одно-) чи ще й <code>prev</code> (двозв'язний). Немає суцільної пам'яті й індексів — лише хід по посиланнях.</p>
                <p><strong>Коли:</strong> O(1) вставка/видалення, коли вже тримаєш вузол; реверс списку; виявлення циклу (Floyd — повільний + швидкий вказівник); основа LRU.</p>
                <p><strong>Big-O:</strong> доступ / пошук O(n) · вставка / видалення за вузлом O(1).</p>
                <pre><code>class ListNode {
  constructor(val) { this.val = val; this.next = null; }
}</code></pre>
              </div>

              <div class="card">
                <h4>Stack (стек, LIFO)</h4>
                <p>Останній прийшов — перший вийшов. У JS — звичайний масив: <code>push</code> / <code>pop</code> / <code>at(-1)</code>.</p>
                <p><strong>Коли:</strong> валідація дужок, монотонний стек, ітеративний DFS, історія/undo, обчислення виразів.</p>
                <p><strong>Big-O:</strong> push / pop / peek O(1).</p>
                <pre><code>const st = [];
st.push(x); st.pop(); const top = st.at(-1);</code></pre>
              </div>

              <div class="card">
                <h4>Queue / Deque (черга)</h4>
                <p>FIFO: перший прийшов — перший вийшов; deque — обидва кінці. Пастка: <code>array.shift()</code> це <strong>O(n)</strong> (зсуває всі елементи). Для O(1) — тримай індекс голови, двозв'язний список або кільцевий буфер.</p>
                <p><strong>Коли:</strong> BFS, обхід по рівнях, черга задач, sliding-window maximum (монотонна черга).</p>
                <p><strong>Big-O:</strong> enqueue / dequeue O(1) (з індексом голови) · <code>shift()</code> O(n).</p>
                <pre><code>const q = []; let head = 0;
q.push(x);                // enqueue
const first = q[head++];  // dequeue, O(1)</code></pre>
              </div>

              <div class="card">
                <h4>Set — множина унікальних</h4>
                <p>Лише унікальні значення, порівняння — SameValueZero (як <code>===</code>, але <code>NaN</code> дорівнює <code>NaN</code>). Порядок ітерації = порядок вставки.</p>
                <p><strong>Коли:</strong> дедуплікація (<code>[...new Set(a)]</code>), швидка перевірка належності, операції над множинами.</p>
                <p><strong>Big-O:</strong> add / has / delete O(1) у середньому.</p>
                <pre><code>const s = new Set([1, 2, 2, 3]);  // {1,2,3}
const inter = [...a].filter(x =&gt; b.has(x));</code></pre>
              </div>

              <div class="card">
                <h4>Heap / Priority Queue</h4>
                <p>Бінарна купа — повне дерево на масиві, де батько ≤ (min-heap) обох дітей; корінь = екстремум. Вбудованої в JS немає — пишуть на масиві: <code>sift-up</code> при вставці, <code>sift-down</code> при знятті кореня. Діти вузла <code>i</code> — <code>2i+1</code>, <code>2i+2</code>.</p>
                <p><strong>Коли:</strong> top-K, k-й найбільший, медіана потоку (дві купи), Dijkstra / A*, злиття k відсортованих списків, планувальник за пріоритетом.</p>
                <p><strong>Big-O:</strong> push / pop O(log n) · peek O(1) · побудова з масиву O(n).</p>
                <pre><code>// peek = heap[0]
// push: у кінець + sift-up
// pop:  heap[0] = останній; sift-down</code></pre>
              </div>

              <div class="card">
                <h4>Binary Tree / BST</h4>
                <p>Вузли з <code>left</code>/<code>right</code>. У BST: ліве піддерево &lt; вузол &lt; праве — <code>in-order</code> обхід дає відсортовану послідовність.</p>
                <p><strong>Коли:</strong> ієрархії, впорядкований пошук/діапазони, обходи (in/pre/post-order, BFS по рівнях), парсери.</p>
                <p><strong>Big-O:</strong> пошук / вставка O(h): O(log n) збалансоване, O(n) якщо виродилось у список.</p>
                <pre><code>class TreeNode {
  constructor(val) { this.val = val; this.left = this.right = null; }
}</code></pre>
              </div>

              <div class="card">
                <h4>Trie (префіксне дерево)</h4>
                <p>Дерево, де ребро — символ, а шлях від кореня — префікс. Спільні префікси зберігаються один раз.</p>
                <p><strong>Коли:</strong> автодоповнення, перевірка префікса/слова у словнику, пошук по сітці слів, T9.</p>
                <p><strong>Big-O:</strong> вставка / пошук O(L), де L — довжина ключа (не залежить від кількості слів).</p>
                <pre><code>const root = { children: {}, end: false };
// для кожного символу: спускайся/створюй node.children[c]</code></pre>
              </div>

              <div class="card">
                <h4>Graph (граф)</h4>
                <p>Вузли + ребра. Найпоширеніше подання в JS — список суміжності через <code>Map</code>: вузол → масив сусідів. Матриця суміжності — коли граф щільний або треба O(1) перевірка ребра.</p>
                <p><strong>Коли:</strong> зв'язність, найкоротший шлях (BFS для незваженого), цикли, топологічне сортування, залежності, острови на сітці.</p>
                <p><strong>Big-O:</strong> обхід DFS/BFS O(V + E) · пам'ять списку суміжності O(V + E).</p>
                <pre><code>const g = new Map();
const addEdge = (u, v) =&gt; {
  if (!g.has(u)) g.set(u, []);
  g.get(u).push(v);
};</code></pre>
              </div>

              <div class="card">
                <h4>LRU Cache</h4>
                <p>Кеш фіксованого розміру, що витісняє <strong>найдавніше використаний</strong> запис. Трюк у JS: <code>Map</code> зберігає порядок вставки, тож «свіжість» = позиція. На <code>get</code> — <code>delete</code> + повторний <code>set</code> (ключ стає останнім); при переповненні видаляємо перший ключ.</p>
                <p><strong>Коли:</strong> кеш запитів/обчислень, класичний інтерв'ю-таск (LeetCode 146).</p>
                <p><strong>Big-O:</strong> <code>get</code> / <code>put</code> O(1).</p>
                <pre><code>get(k) {
  if (!m.has(k)) return -1;
  const v = m.get(k);
  m.delete(k); m.set(k, v);   // «підняти»
  return v;
}</code></pre>
              </div>
            </div>
          `,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `// ── Hash Table з нуля (chaining + rehash) ──────────────────────
class HashTable<V> {
  private buckets: [string, V][][] = Array.from({ length: 8 }, () => []);
  private count = 0;

  private hash(key: string): number {
    let h = 0;
    for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) | 0;
    return Math.abs(h) % this.buckets.length;
  }

  set(key: string, value: V): void {
    const bucket = this.buckets[this.hash(key)];
    const pair = bucket.find(([k]) => k === key);
    if (pair) { pair[1] = value; return; }
    bucket.push([key, value]);
    if (++this.count / this.buckets.length > 0.75) this.rehash();
  }

  get(key: string): V | undefined {
    return this.buckets[this.hash(key)].find(([k]) => k === key)?.[1];
  }

  private rehash(): void {
    const entries = this.buckets.flat();
    this.buckets = Array.from({ length: this.buckets.length * 2 }, () => []);
    this.count = 0;
    for (const [k, v] of entries) this.set(k, v);
  }
}

// ── LRU Cache на Map (порядок вставки = свіжість) ──────────────
class LRUCache<K, V> {
  private m = new Map<K, V>();
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    if (!this.m.has(key)) return undefined;
    const v = this.m.get(key)!;
    this.m.delete(key);
    this.m.set(key, v);                       // перемістити в «найсвіжіші»
    return v;
  }

  put(key: K, value: V): void {
    if (this.m.has(key)) this.m.delete(key);
    this.m.set(key, value);
    if (this.m.size > this.capacity) {
      this.m.delete(this.m.keys().next().value!); // викинути найдавніший
    }
  }
}`,
        },
      ],
    },
    {
      id: 'web-app-architectures',
      title: '🏗️ SPA vs MPA vs PWA',
      interviewQuestions: [
        {
          question: 'У чому фундаментальна різниця між SPA та MPA на рівні того, що відбувається при переході між "сторінками"?',
          answer: 'MPA (Multi-Page Application) — кожен перехід це повний запит на сервер, сервер повертає новий готовий HTML-документ, браузер повністю перезавантажує сторінку (весь JS/CSS стан втрачається, повторно виконується парсинг/рендер із нуля). SPA (Single-Page Application) — початково завантажується один HTML-документ, а подальша "навігація" відбувається клієнтським JS: підвантажуються лише дані (JSON через fetch), DOM оновлюється точково через віртуальний DOM/фреймворк, URL міняється через History API без реального запиту сторінки — стан застосунку (відкриті модалки, скрол, форми) зберігається між "переходами".',
        },
        {
          question: 'Які конкретні недоліки SPA-підходу, через які MPA чи гібридні рішення (SSR/Next.js) досі актуальні?',
          answer: 'Перше завантаження SPA повільніше — браузер має завантажити й виконати весь JS-бандл <em>перед</em> тим, як з\'явиться змістовний контент (порожній <code>&lt;div id="root"&gt;</code> до гідратації). SEO історично страждало — пошукові боти, що не виконують JS, бачили порожню сторінку (сучасні Google-краулери JS виконують, але не всі боти й соцмережеві прев\'ю це вміють). Це і привело до SSR/SSG-гібридів (Next.js App Router — розділ нижче), які поєднують серверний перший рендер зі SPA-подібною клієнтською навігацією після гідратації.',
        },
        {
          question: 'Що технічно перетворює звичайний SPA/MPA-сайт на PWA (Progressive Web App), і які можливості це відкриває?',
          answer: 'Два обов\'язкові технічні елементи: <strong>Web App Manifest</strong> (JSON-файл з іконками, назвою, кольором теми — дозволяє "встановити" сайт на домашній екран як застосунок) і <strong>Service Worker</strong> (окремий JS-потік, що перехоплює мережеві запити й може кешувати відповіді — звідси офлайн-доступ і швидший повторний візит). Разом вони дають: роботу без мережі (кешовані ресурси/дані), push-сповіщення, встановлення без App Store/Google Play, іконку на домашньому екрані — при цьому це все ще звичайний вебсайт, доступний за URL.',
        },
        {
          question: 'Чи є SPA і PWA взаємовиключними поняттями, чи їх можна поєднувати — і як?',
          answer: 'Ні, це ортогональні виміри: SPA/MPA — про <em>модель навігації</em> (де рендериться контент при переході), PWA — про <em>набір можливостей поверх готового сайту</em> (офлайн, встановлюваність, push). Більшість реальних PWA — це SPA з доданими manifest.json + service worker (React/Vue SPA, який додатково кешує ресурси й реєструє service worker), хоча технічно й MPA-сайт може стати PWA, якщо додати ті самі два елементи.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">MPA — Multi-Page Application (класична модель)</h3>
  <p>Кожен клік по посиланню = новий HTTP-запит на сервер → сервер рендерить і повертає повний HTML-документ → браузер повністю перезавантажує сторінку. Простіше для SEO (боту доступний готовий HTML одразу), але кожен перехід "з нуля" — весь клієнтський JS-стан втрачається.</p>
  <h3 class="topic">SPA — Single-Page Application <span class="tag tag-key">KEY</span></h3>
  <p>Один HTML-документ завантажується один раз; подальша навігація — клієнтський JS підвантажує лише дані (JSON) і точково оновлює DOM, URL змінюється через <strong>History API</strong> (<code>pushState</code>) без реального запиту сторінки. Швидша навігація після першого завантаження, стан застосунку не втрачається — ціна: важче перше завантаження і SEO вимагає додаткових рішень (SSR).</p>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Порівняння</h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>MPA</th><th>SPA</th></tr>
      <tr><td>Перехід між "сторінками"</td><td>Повний HTTP-запит + перезавантаження</td><td>Клієнтський JS, без перезавантаження</td></tr>
      <tr><td>Перше завантаження</td><td>Швидше (готовий HTML одразу)</td><td>Повільніше (спершу весь JS-бандл)</td></tr>
      <tr><td>Навігація після першого завантаження</td><td>Повільніше (кожен раз з нуля)</td><td>Швидше (лише дані, DOM не з нуля)</td></tr>
      <tr><td>SEO "з коробки"</td><td>✅ Готовий HTML для будь-якого бота</td><td>⚠️ Потребує SSR/SSG для надійного SEO</td></tr>
      <tr><td>Стан застосунку між переходами</td><td>Втрачається щоразу</td><td>Зберігається (React-стан, скрол, модалки)</td></tr>
      <tr><td>Приклад</td><td>Класичний Wordpress-сайт, Django SSR</td><td>Gmail, Trello, React SPA</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">PWA — Progressive Web App</h3>
  <p>Не альтернатива SPA/MPA, а <strong>набір можливостей поверх</strong> готового сайту: офлайн-доступ, встановлюваність на домашній екран, push-сповіщення. Два обов'язкові елементи:</p>
  <div class="grid2">
    <div class="card"><h4>Web App Manifest</h4><p>JSON з назвою, іконками, кольором теми, <code>display: standalone</code> — дозволяє браузеру запропонувати "встановити" сайт як застосунок.</p></div>
    <div class="card"><h4>Service Worker</h4><p>Окремий JS-потік, що перехоплює мережеві запити й може відповідати з кешу — звідси офлайн-режим і швидший повторний візит.</p></div>
  </div>
  <p>Service Worker виконується у власному контексті — <strong>без доступу до DOM</strong> і без спільної пам'яті зі сторінкою (лише <code>postMessage</code>) — і живе своїм життєвим циклом: <code>install</code> (кешування статичних ресурсів), <code>activate</code> (очищення старих кешів), далі <code>fetch</code>/<code>message</code> події на кожен мережевий запит чи повідомлення від сторінки. Він переживає закриття вкладки і навіть перезапуск браузера, тому саме він — а не звичайний JS сторінки — приймає push-сповіщення та фонову синхронізацію, коли сайт не відкритий.</p>`,
        },
        {
          kind: 'code',
          language: 'json',
          caption: 'manifest.json — мінімальний набір для встановлюваності',
          code: `{
  "name": "My App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#6366f1",
  "icons": [{ "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }]
}`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Реєстрація service worker + базове кешування',
          code: `// main.ts — реєстрація
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js — перехоплення запитів, кеш "спершу мережа, потім кеш при офлайні"
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});`,
        },
      ],
    },
    {
      id: 'dom-events-traversal',
      title: '🌳 DOM — навігація, події, делегування',
      interviewQuestions: [
        {
          question: 'Чим <code>event.target</code> відрізняється від <code>event.currentTarget</code> в обробнику події, навішеному на елемент-контейнер?',
          answer: '<code>event.target</code> — конкретний DOM-елемент, на якому подія реально сталась (напр. кнопка всередині списку, по якій клікнули), незмінний протягом усього спливання. <code>event.currentTarget</code> — елемент, на якому <em>саме зараз виконується</em> обробник (той, на якому викликали <code>addEventListener</code>), і його значення різне залежно від того, на якому рівні спливання виконується код. Для делегування подій (обробник на батьку, клік десь усередині) саме <code>event.target</code> каже, який конкретно дочірній елемент викликав подію.',
        },
        {
          question: 'Що таке делегування подій (event delegation), і чому воно ефективніше за навішування окремого обробника на кожен елемент списку?',
          answer: 'Замість <code>addEventListener</code> на кожному з N елементів списку, один обробник вішається на спільного батька (напр. <code>&lt;ul&gt;</code>) — оскільки події спливають (<em>bubbling</em>) від дочірнього елемента вгору по дереву, батьківський обробник ловить клік по будь-якому <code>&lt;li&gt;</code> й визначає конкретний елемент через <code>event.target.closest(\'li\')</code>. Переваги: 1 слухач замість N (менше пам\'яті), автоматично працює для елементів, доданих у DOM <em>пізніше</em> (динамічний список) — без делегування довелось би вручну підписувати кожен новододаний елемент.',
        },
        {
          question: 'У чому різниця між фазами capturing і bubbling у моделі DOM-подій, і як явно підписатись на фазу занурення?',
          answer: 'Подія проходить дерево в три фази: <strong>capturing</strong> (від <code>window</code> униз до цільового елемента), потім <strong>target</strong> (на самому елементі), потім <strong>bubbling</strong> (від елемента вгору до <code>window</code>) — за замовчуванням <code>addEventListener</code> підписується на фазу bubbling. Щоб перехопити подію на фазі занурення (раніше за дочірні обробники), треба передати третій аргумент <code>true</code> (або <code>{ capture: true }</code>) — рідко потрібно на практиці, але типове питання на розуміння моделі.',
        },
        {
          question: 'Чим <code>childNodes</code> відрізняється від <code>children</code>, і чому це часте джерело багів при обході DOM?',
          answer: '<code>node.childNodes</code> повертає <strong>усі</strong> дочірні вузли, включно з текстовими вузлами (пробіли/переноси рядків між тегами в розмітці — теж окремі текстові вузли) й коментарями. <code>node.children</code> повертає лише дочірні елементи (теги), ігноруючи текстові вузли й коментарі. Код, що очікує лише елементи, але використовує <code>childNodes</code>, часто ламається на "порожніх" текстових вузлах, яких розробник не очікував побачити в колекції.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Навігація по DOM-дереву</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Властивість/метод</th><th>Що повертає</th></tr>
      <tr><td><code>parentElement</code> / <code>parentNode</code></td><td>Батьківський елемент / вузол (може бути не-елементом, напр. <code>document</code>)</td></tr>
      <tr><td><code>children</code></td><td>Лише дочірні <strong>елементи</strong> (без текстових вузлів/коментарів)</td></tr>
      <tr><td><code>childNodes</code></td><td>Усі дочірні вузли, включно з текстовими й коментарями</td></tr>
      <tr><td><code>nextElementSibling</code> / <code>previousElementSibling</code></td><td>Сусідній елемент того ж рівня</td></tr>
      <tr><td><code>closest(selector)</code></td><td>Найближчий предок (або сам елемент), що збігається з селектором</td></tr>
      <tr><td><code>querySelector(selector)</code> / <code>querySelectorAll</code></td><td>Перший / усі нащадки за CSS-селектором</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `const list = document.querySelector('.todo-list')!;

// Створення й вставка вузла
const item = document.createElement('li');
item.textContent = 'Купити молоко';
list.appendChild(item);
// list.insertBefore(item, list.firstChild) — вставити на початок
// item.remove() — видалити елемент

// Навігація
item.parentElement;              // <ul class="todo-list">
item.closest('.todo-list');      // найближчий предок за селектором (сам себе теж перевіряє)
list.children.length;            // кількість <li> (без текстових вузлів)
list.childNodes.length;          // зазвичай БІЛЬШЕ — текстові вузли переносів рядків теж рахуються`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Bubbling, capturing, делегування подій <span class="tag tag-key">KEY</span></h3>
  <p>Подія проходить три фази: <strong>capturing</strong> (зверху вниз до цілі) → <strong>target</strong> → <strong>bubbling</strong> (знизу вгору від цілі). <code>addEventListener</code> за замовчуванням слухає bubbling-фазу.</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Делегування — 1 обробник замість N, працює й для елементів, доданих пізніше',
          code: `// ❌ Наївно: обробник на кожен <li> — не спрацює на нові елементи, додані пізніше
document.querySelectorAll('.todo-item').forEach((el) =>
  el.addEventListener('click', handleClick),
);

// ✅ Делегування: 1 обробник на контейнері, спрацьовує завдяки bubbling
list.addEventListener('click', (event) => {
  const item = (event.target as HTMLElement).closest('.todo-item');
  if (!item) return; // клік був не по todo-item (напр. по проміжку)
  console.log('Клікнутий елемент:', item.dataset.id);
});
// Працює навіть для .todo-item, доданих через appendChild ПІСЛЯ підписки —
// делегування не залежить від того, коли елемент з'явився в DOM

// Capturing-фаза — явно, третім аргументом
container.addEventListener('click', handler, { capture: true });`,
        },
      ],
    },
    {
      id: 'bom-storage-history',
      title: '🪟 BOM — window, storage, History API',
      interviewQuestions: [
        {
          question: 'Чим localStorage відрізняється від sessionStorage і від cookies за часом життя, обсягом і тим, чи дані відправляються на сервер?',
          answer: '<code>localStorage</code> — переживає закриття браузера, дані видаляються лише явно (JS-кодом чи користувачем); обсяг ~5-10MB; НЕ відправляється на сервер автоматично. <code>sessionStorage</code> — той самий API, але живе лише в межах однієї вкладки і зникає при її закритті (навіть та сама сторінка в новій вкладці отримує порожній sessionStorage). <code>cookies</code> — набагато менший обсяг (~4KB), час життя задається явно (<code>expires</code>/<code>max-age</code>), і головна відмінність — cookie <strong>автоматично додається до кожного HTTP-запиту</strong> на відповідний домен, тому саме cookies (а не localStorage) використовують для даних, які має бачити сервер (сесія, auth).',
        },
        {
          question: 'Чому localStorage вважається небезпечним місцем для зберігання чутливих токенів?',
          answer: 'localStorage доступний із будь-якого JS, що виконується на сторінці, — включно зі шкідливим скриптом, впровадженим через XSS-вразливість. На відміну від <code>HttpOnly</code>-cookie (недоступного з JS взагалі), будь-який успішний XSS на сторінці може прочитати <code>localStorage.getItem(\'token\')</code> і вкрасти сесію користувача.',
        },
        {
          question: 'Що таке BOM (Browser Object Model), і чим він принципово відрізняється від DOM?',
          answer: 'DOM — це представлення структури <em>документа</em> (HTML-дерева) як об\'єктів, з яким працюють через <code>document</code>. BOM — ширше поняття, об\'єкти, що представляють сам <em>браузер</em> як середовище: <code>window</code> (глобальний об\'єкт, батько всього іншого, включно з <code>document</code>), <code>navigator</code> (інформація про браузер/пристрій), <code>location</code> (поточний URL), <code>history</code> (стек навігації), <code>screen</code>. DOM технічно є частиною BOM (<code>window.document</code>), але на співбесіді їх розділяють: DOM — "про контент сторінки", BOM — "про сам браузер/вкладку".',
        },
        {
          question: 'Як <code>history.pushState()</code> дозволяє SPA міняти URL без перезавантаження сторінки, і чим це відрізняється від зміни <code>window.location.href</code>?',
          answer: '<code>window.location.href = url</code> ініціює справжню навігацію — браузер робить новий HTTP-запит і повністю перезавантажує сторінку. <code>history.pushState(state, \'\', url)</code> лише додає новий запис в стек історії браузера й міняє видимий URL у адресному рядку, <strong>без</strong> запиту на сервер і без перезавантаження — саме на цьому побудовані React Router/будь-який SPA-роутер (<code>createBrowserRouter</code>, розділ React Router вище). Кнопка "назад" браузера після цього викликає подію <code>popstate</code>, яку роутер слухає, щоб відповідно оновити UI без перезавантаження.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Browser Storage — localStorage vs sessionStorage vs cookies <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>localStorage</th><th>sessionStorage</th><th>cookie</th></tr>
      <tr><td>Час життя</td><td>Назавжди (до явного видалення)</td><td>До закриття вкладки</td><td>Задається явно (<code>expires</code>)</td></tr>
      <tr><td>Обсяг</td><td>~5-10MB</td><td>~5-10MB</td><td>~4KB</td></tr>
      <tr><td>Надсилається на сервер</td><td>❌ Ні</td><td>❌ Ні</td><td>✅ Автоматично з кожним запитом на домен</td></tr>
      <tr><td>Доступ з JS</td><td>Так</td><td>Так</td><td>Так, якщо немає <code>HttpOnly</code></td></tr>
      <tr><td>Типове застосування</td><td>Налаштування UI, кеш даних клієнта</td><td>Дані одного кроку/вкладки (майстер форм)</td><td>Auth-сесія, дані для сервера</td></tr>
    </table>
  </div>
  <div class="alert warn"><span class="icon">⚠️</span><span>Чутливі токени (auth) не варто класти в <code>localStorage</code> — доступний будь-якому XSS-скрипту. <code>HttpOnly</code>-cookie безпечніший саме тому, що взагалі не читається з JS (детальніше — розділ "Fetch, axios та автентифікація" вище).</span></div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `// localStorage / sessionStorage — однаковий API, різне "час життя"
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');   // 'dark'
localStorage.removeItem('theme');
localStorage.setItem('user', JSON.stringify({ id: 1 })); // тільки рядки — об'єкти серіалізувати самому

// Cookie — низькорівневий рядковий API (без окремих методів get/set)
document.cookie = 'theme=dark; max-age=3600; path=/; SameSite=Lax';
console.log(document.cookie); // 'theme=dark; otherCookie=...' — усі cookie одним рядком`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">window, navigator, location — Browser Object Model</h3>
  <p><strong>BOM</strong> — об'єкти, що представляють сам браузер (не документ): <code>window</code> — глобальний об'єкт-контейнер для всього іншого; <code>navigator</code> — інформація про браузер/пристрій; <code>location</code> — поточний URL; <code>history</code> — стек навігації.</p>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `window.innerWidth, window.innerHeight;      // розмір viewport
navigator.userAgent;                          // рядок ідентифікації браузера (ненадійний для feature-detection)
navigator.onLine;                             // чи є мережа
navigator.clipboard.writeText('текст');       // Clipboard API

location.href;         // повний поточний URL
location.pathname;     // '/users/42'
location.search;       // '?tab=posts'
new URLSearchParams(location.search).get('tab'); // 'posts' — правильний спосіб парсити query-параметри

// History API — основа клієнтського роутингу SPA
history.pushState({ page: 1 }, '', '/users/42'); // новий запис в історії, URL міняється, БЕЗ перезавантаження
history.replaceState({}, '', '/users/43');       // замінює поточний запис (без нового в стеку)
window.addEventListener('popstate', (e) => {
  // спрацьовує на кнопку "назад/вперед" браузера — SPA-роутер тут оновлює UI
  console.log('Навігація на:', location.pathname, e.state);
});`,
        },
      ],
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
        {
          question: `Чому React Testing Library рекомендує getByRole понад getByTestId?`,
          answer: `Порядок пріоритету запитів RTL слідує за тим, як реальний користувач (включно з тими, хто покладається на screen reader чи клавіатуру) сприймає сторінку. <code>data-testid</code> — деталь розмітки, невидима нікому, крім тесту, тому це запасний варіант лише для випадків, де немає доступного способу однозначно знайти елемент.`,
        },
        {
          question: `У чому реальна перевага MSW над jest.mock() для тестування компонента, що робить fetch?`,
          answer: `MSW перехоплює запит на мережевому рівні — компонент виконує справжній <code>fetch</code>/<code>axios</code>-виклик і отримує замокану відповідь так, ніби вона прийшла з мережі. <code>jest.mock()</code> підміняє модуль цілком, обходячи мережевий рівень — швидше, але не перевіряє інтеграцію з реальним HTTP-клієнтом.`,
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
          "html": "<h3 class=\"topic\">React Testing Library — query за пріоритетом <span class=\"tag tag-key\">KEY</span></h3><p>Філософія RTL: <strong>тести мають нагадувати, як користувач взаємодіє з UI, а не перевіряти внутрішній стан компонента</strong> — тому немає прямого доступу до state/props, лише до DOM, яким користувач насправді бачить сторінку.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Пріоритет</th><th>Query</th><th>Чому саме так</th></tr>\n              <tr><td>1</td><td><code>getByRole</code></td><td>Найближче до того, як сторінку сприймає screen reader / клавіатурна навігація — accessibility-first</td></tr>\n              <tr><td>2</td><td><code>getByLabelText</code></td><td>Форми — так само, як лейбл асоціюється з полем для користувача</td></tr>\n              <tr><td>3</td><td><code>getByText</code></td><td>Видимий текст — те, що бачить користувач, не деталі розмітки</td></tr>\n              <tr><td>4</td><td><code>getByTestId</code></td><td>Останній засіб — <code>data-testid</code> нічого не каже про доступність, лише «милиця» для складних кейсів</td></tr>\n            </table>\n          </div><h3 class=\"topic\">getBy / queryBy / findBy</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th></th><th>Якщо не знайдено</th><th>0 / 1 / багато</th><th>Sync/Async</th><th>Коли</th></tr>\n              <tr><td><code>getBy...</code></td><td>Кидає помилку</td><td>1 — інакше throw</td><td>Sync</td><td>Елемент вже має бути в DOM</td></tr>\n              <tr><td><code>queryBy...</code></td><td>Повертає <code>null</code></td><td>0 або 1</td><td>Sync</td><td>Перевірити, що елемента НЕМАЄ</td></tr>\n              <tr><td><code>findBy...</code></td><td>Кидає помилку (після timeout)</td><td>1</td><td>Async (Promise)</td><td>Елемент з'явиться пізніше (після фетчу/анімації)</td></tr>\n            </table>\n          </div><div class=\"alert alert-good\">\n            <strong>userEvent vs fireEvent:</strong> <code>userEvent</code> симулює <em>реалістичну</em> послідовність подій (click = pointerdown+mousedown+focus+mouseup+click), тому виявляє баги, яких одна подія не покаже — обирай його за замовчуванням. <code>fireEvent</code> диспатчить один сирий DOM-event напряму — швидше, але не відповідає тому, що насправді робить браузер при взаємодії користувача.\n          </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\n\ntest('submits the form with entered name', async () => {\n  const user = userEvent.setup();\n  render(<SignupForm onSubmit={mockSubmit} />);\n\n  // getByRole — доступний спосіб знайти поле й кнопку\n  await user.type(screen.getByRole('textbox', { name: /name/i }), 'Alice');\n  await user.click(screen.getByRole('button', { name: /submit/i }));\n\n  expect(mockSubmit).toHaveBeenCalledWith({ name: 'Alice' });\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">jsdom — де насправді виконуються ці тести</h3><p><code>jsdom</code> симулює DOM у Node.js (без реального браузера) — <code>document</code>, <code>window</code>, події існують, але <strong>немає реального layout/рендерингу</strong> (розміри елементів, справжній CSS-каскад, анімації не рахуються по-справжньому). Тому unit/integration-тести на RTL+jsdom швидкі й дешеві, але для впевненості, що застосунок реально працює у справжньому браузері, потрібен E2E на Playwright/Cypress з реальним браузерним рушієм.</p><h3 class=\"topic\">MSW vs jest.mock()</h3><div class=\"alert alert-warn\">\n            <strong>MSW (Mock Service Worker)</strong> перехоплює запити на рівні мережі (Service Worker у браузері / interceptor у Node) — код застосунку робить справжній <code>fetch</code>/<code>axios</code>-виклик, і не знає, що відповідь замокана. Реалістичніше, працює однаково незалежно від того, яким клієнтом іде запит. <code>jest.mock()</code>/<code>vi.mock()</code> натомість підміняє <strong>цілий модуль</strong> у графі імпортів — швидше й простіше для ізольованих юніт-тестів, але тестує вже не той код, що піде в проді.\n          </div>"
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
