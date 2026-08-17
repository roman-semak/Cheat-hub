# JS/TS — Senior Frontend Interview Шпаргалка

> Compact reference · core JavaScript & TypeScript для Senior/Tech Lead співбесіди

---

## 1️⃣ unknown vs any vs never

| Тип | Приймає значення | Використання без перевірки | Роль |
|---|---|---|---|
| `unknown` | будь-які | ні — треба narrowing | безпечний топ-тип |
| `any` | будь-які | так — перевірки вимкнено | втеча від типізації |
| `never` | жодних | — | низ-тип, недосяжний код |

```ts
let x: unknown = getData();
if (typeof x === "string") x.toUpperCase();  // треба звузити
```

> 💡 `unknown` замість `any` для API-відповідей, `JSON.parse`, `catch (e: unknown)`.
> ⚠️ `any` «заражає» — глушить перевірки навколо. Лише як тимчасовий люк для легасі.
> 📝 `never` — для функцій, що не повертають (throw), і exhaustiveness checks.

---

## 2️⃣ Discriminated Unions

Union, де кожен член має спільне **літеральне поле-дискримінатор**. За ним TS однозначно звужує тип.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };
```

Три складові: **спільне поле** (`kind`) + **літеральний тип** (`"circle"`, не `string`) + **union**.

### Exhaustiveness через never

```ts
switch (s.kind) {
  case "circle": return Math.PI * s.radius ** 2;
  case "square": return s.side ** 2;
  default:
    const _e: never = s;  // новий member → compile error
}
```

| Кейс | Приклад |
|---|---|
| Redux actions | `{ type: "increment" }` — reducer звужує по `type` |
| Async state | `{ status: "loading" } \| { status: "success"; data }` |
| WS-події | вхідні повідомлення з полем `type` — один switch |

> 💡 Ключова фраза: discriminated union = «make illegal states unrepresentable».

---

## 3️⃣ Type Narrowing

Звуження ширшого типу до конкретного через **control-flow analysis** — TS у кожній гілці знає точний тип.

| Спосіб | Для чого |
|---|---|
| `typeof x === "string"` | примітиви |
| `x instanceof Date` | класи / прототип |
| `"radius" in s` | наявність властивості |
| `s.kind === "circle"` | дискримінант (найнадійніше) |
| `Array.isArray(x)` | масиви |
| `x != null` | відсів null/undefined |

**User-defined type guard** — функція з предикатом `x is T`:

```ts
function isString(x: unknown): x is string {
  return typeof x === "string";
}
```

**Assertion function** — `asserts cond`, кидає й звужує далі по коду.

> ⚠️ `typeof null === "object"` — класичний баг, null не відсіється.
> ⚠️ Звуження «протікає» після await/у замиканні — TS може скинути його.

---

## 4️⃣ Hoisting: Declaration vs Expression

| Конструкція | Піднімається | До оголошення |
|---|---|---|
| `function foo(){}` | ім'я + тіло | ✅ виклик працює |
| `var x` | ім'я, `= undefined` | `undefined` |
| `var f = function(){}` | лише `var f` | `undefined`, виклик → TypeError |
| `let` / `const` | ім'я (без ініціалізації) | ❌ ReferenceError (TDZ) |
| `() => {}` у `const` | лише змінна (TDZ) | ❌ ReferenceError |

```js
console.log(a);  // undefined (var)
var a = 1;
console.log(b);  // ❌ ReferenceError (TDZ)
let b = 2;
```

> 💡 Hoisting піднімає **оголошення**, не **присвоєння**. Function declarations доступні цілком; expressions/arrow — ні (піднімається лише змінна-контейнер).
> 📝 «`let` не піднімається» — технічно неточно: піднімається, але блокований TDZ.

---

## 5️⃣ Closures

Функція + її **лексичне оточення**: внутрішня функція зберігає доступ до змінних зовнішньої навіть після її завершення.

```js
function makeCounter() {
  let count = 0;
  return () => ++count;   // замикає count
}
const inc = makeCounter();
inc(); // 1
inc(); // 2
```

Захоплюється **змінна (посилання)**, не значення на момент створення.

### Пастка var у циклі

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));  // 3,3,3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i));  // 0,1,2
```

`var` — одна змінна на цикл; `let` — нове зв'язування на кожну ітерацію.

> 💡 Застосування: приватний стан, React-хуки (`useState`/`useRef`), currying, колбеки.

---

## 6️⃣ Closures → Memory Leaks

Замикання тримає **весь** scope живим, поки жива функція. Не звільнив посилання → витік.

| Джерело витоку | Рішення |
|---|---|
| Слухач без `removeEventListener` | зняти слухач / `AbortController` |
| Активний `setInterval` | `clearInterval` |
| Detached DOM з живим посиланням | обнулити `ref = null` |
| Великі дані в замиканні | `WeakMap`/`WeakRef` |

### Stale closure у React

```js
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, []);  // ⚠️ count заморожено на першому рендері
```

Рішення: додати в deps, functional update (`setCount(c => c+1)`), або `useRef`.

> 📝 У React stale closure — не витік, а **застаріле значення** через порожні deps.

---

## 7️⃣ .call() / .apply() / .bind()

| Метод | Викликає одразу | Аргументи | Повертає |
|---|---|---|---|
| `.call()` | ✅ так | списком через кому | результат |
| `.apply()` | ✅ так | масивом (**a**pply→**a**rray) | результат |
| `.bind()` | ❌ ні | списком (частково) | нову прив'язану функцію |

```js
greet.call(user, "Hi", "!");
greet.apply(user, ["Hi", "!"]);
const bound = greet.bind(user);  // виклик пізніше
```

> ⚠️ Arrow-функції ігнорують усі три — `this` береться лексично.
> ⚠️ `new` сильніший за `bind`; повторний `bind` не змінює `this`.
> 💡 Втрата `this` у колбеку (`setTimeout(obj.method)`) → `.bind(obj)` або arrow-поле.

---

## 8️⃣ Garbage Collection

JS GC працює за **досяжністю (reachability)** від коренів, не reference counting.

**Roots:** глобальний об'єкт, локальні змінні в стеку, активні замикання.

### Mark-and-Sweep

1. **Mark** — обхід графа від коренів, позначення досяжних.
2. **Sweep** — звільнення непозначеного.

> 📝 Чому не reference counting: не збирає **циклічні посилання** (A↔B). Mark-and-sweep — недосяжний цикл просто не позначиться.

### Generational GC (V8)

| Покоління | Що | Збирання |
|---|---|---|
| Young | нові об'єкти | часто, швидко (Scavenge) |
| Old | довгожителі | рідко, mark-sweep-compact |

**Incremental** (порції) + **concurrent** (окремі потоки) — щоб мінімізувати stop-the-world паузи.

> ⚠️ Витоки = ненавмисна досяжність: слухачі, таймери, замикання, detached DOM, ростучі кеші.

---

## 9️⃣ WeakMap / WeakSet / WeakRef

Тримають **слабкі посилання** — не заважають GC зібрати об'єкт.

| | Що тримає | Доступ | Ітерується | Ключі-примітиви |
|---|---|---|---|---|
| `WeakMap` | пари ключ(об'єкт)→значення | `get` | ні | ні |
| `WeakSet` | об'єкти | `has` | ні | ні |
| `WeakRef` | один об'єкт | `.deref()` | — | ні |

```js
const meta = new WeakMap();
meta.set(node, { clicks: 0 });  // дані живуть, поки живий node
```

> 📝 Не ітеруються бо наявність залежить від таймінгу GC (недетерміновано) — `.size`/перелік зламали б передбачуваність.
> ⚠️ `WeakRef` — інструмент останнього вибору; не будуй логіку на таймінгу GC.
> 💡 Застосування: метадані/кеш, прив'язані до DOM-вузла чи об'єкта.

---

## 🔟 Class

Синтаксичний цукор над прототипною моделлю. `typeof Class === "function"`, методи в `prototype`.

```js
class User {
  #secret = 42;              // приватне поле (справжня приватність)
  static version = "1.0";    // на класі, не екземплярі
  constructor(name) { this.name = name; }
  greet() { return `Hi, ${this.name}`; }   // → User.prototype
}
```

### Наслідування

```js
class Admin extends User {
  constructor(n, lvl) { super(n); this.level = lvl; }
  greet() { return `${super.greet()} (admin)`; }
}
```

> 📝 `#field` — істинна приватність (рушій, не угода `_`). `static` — на класі. Arrow-поле — фіксує `this`.
> ⚠️ Тіло класу завжди strict mode; клас у TDZ (не hoisted); не викликати без `new`.

---

## 1️⃣1️⃣ Class vs Constructor Function

Той самий прототипний механізм, але клас — не «чистий» цукор.

| | Constructor Function | Class |
|---|---|---|
| Виклик без `new` | тихий баг | TypeError |
| Hoisting | повний | TDZ |
| Strict mode | за контекстом | завжди |
| Методи в `for...in` | видно | приховані |
| Наслідування | `call` + `Object.create` вручну | `extends`/`super` |
| Приватні `#` | немає (замикання/`_`) | є |

```js
// стара ручна робота, яку робить extends:
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;
```

> 💡 Для нового коду — `class` (new-guard, `extends`/`super`, справжня приватність). Function-конструктори — розуміти для легасі.

---

## 1️⃣2️⃣ Promise — стани

| Стан | Опис |
|---|---|
| `pending` | початковий, ще не resolved |
| `fulfilled` | успіх, отримав value (`resolve`) |
| `rejected` | помилка, отримав reason (`reject`) |

**Settled** = fulfilled **або** rejected (не окремий стан).

```js
const p = new Promise((resolve, reject) => {
  resolve("first");
  resolve("second");  // ігнорується — вже settled
});
```

| Метод | Реагує на |
|---|---|
| `.then(onF, onR)` | fulfilled / rejected |
| `.catch(fn)` | rejected |
| `.finally(fn)` | будь-який settled |

> ⚠️ Перехід односторонній і одноразовий — після settled стан і значення заморожені.
> ⚠️ Забув `resolve`/`reject` на гілці → pending назавжди («зависання»).

---

## 1️⃣3️⃣ Prototype Chain

Ланцюг `[[Prototype]]`-посилань, яким рушій піднімається під час пошуку властивості до першого збігу або `null`.

```
u → User.prototype → Object.prototype → null
```

**Розрізняй:**
- `[[Prototype]]` — внутрішнє посилання самого об'єкта (`Object.getPrototypeOf`).
- `.prototype` — властивість **конструктора**; стає `[[Prototype]]` для екземплярів через `new`.

```js
function User(name) { this.name = name; }
User.prototype.greet = function () {};
const u = new User("R");
Object.getPrototypeOf(u) === User.prototype;  // true
```

| Інструмент | Що робить |
|---|---|
| `hasOwnProperty` | лише власні, ігнорує ланцюг |
| `for...in` | і успадковані enumerable |
| `Object.keys` | лише власні |
| `Object.create(proto)` | об'єкт із заданим прототипом |

> 💡 Методи живуть у `Constructor.prototype` — діляться між інстансами, не копіюються. `class`/`extends` — цукор над цим.

---

## 1️⃣4️⃣ Utility Types (TS)

Вбудовані дженерики для трансформації типів (DRY).

| Тип | Що робить |
|---|---|
| `Partial<T>` | поля → опційні |
| `Required<T>` | поля → обов'язкові |
| `Readonly<T>` | поля → тільки читання |
| `Pick<T,K>` | лишити поля `K` |
| `Omit<T,K>` | прибрати поля `K` |
| `Record<K,V>` | об'єкт `K→V` (словники) |
| `Exclude<U,X>` | union мінус `X` |
| `Extract<U,X>` | перетин union з `X` |
| `NonNullable<T>` | мінус null/undefined |
| `ReturnType<T>` | тип результату функції |
| `Parameters<T>` | кортеж параметрів |
| `Awaited<T>` | розгорнути Promise |

```ts
type UserForm = Partial<Omit<User, "id" | "createdAt">>;
type Store = Record<number, User>;
```

> 💡 Більшість побудовані на mapped/conditional types — за потреби пишеш власний аналог.

---

## 1️⃣5️⃣ Factory Pattern

Функція/метод, що створює й повертає об'єкти, приховуючи логіку створення. Замість прямого `new`.

```js
function createUser(name, role) {
  return { name, role, greet: () => `Hi, ${name}` };
}
```

**Factory function** — приватність через замикання «безкоштовно», без `this`-пасток.
**Factory method** — обирає тип за параметром:

```js
function createShape(kind, opts) {
  switch (kind) {
    case "circle": return new Circle(opts.radius);
    case "square": return new Square(opts.side);
  }
}
```

| | Прямий `new` | Factory |
|---|---|---|
| Клієнт знає клас | так | ні (лише інтерфейс) |
| Вибір типу в рантаймі | ні | так |
| Логіка створення | розмазана | в одному місці |

> 💡 На фронтенді: `createStore` (Zustand/Redux), Angular `useFactory` DI, RxJS creation operators (`of`, `from`).

---

## 1️⃣6️⃣ Map & Set

**Map** — ключ→значення з ключами будь-якого типу. **Set** — унікальні значення. Обидва iterable, зберігають порядок вставлення.

```js
const m = new Map();
m.set(objKey, "val").set(1, "a");  // set чейниться
m.get(objKey);

const unique = [...new Set([1, 1, 2, 3])];  // дедуплікація → [1,2,3]
```

| Метод Map | Дія |
|---|---|
| `set/get/has/delete` | базові операції |
| `clear` | очистити |
| `size` | кількість (властивість) |
| `keys/values/entries` | ітератори |
| `forEach((v,k)=>)` | ⚠️ value перший |

> 📝 Обидва порівнюють через **SameValueZero**: `NaN === NaN`, об'єкти за посиланням.
> 💡 Set — O(1) `has` замість O(n) `includes`. Для метаданих без блокування GC — Weak-варіанти.

---

## 1️⃣7️⃣ Map vs Object

| | Map | Object |
|---|---|---|
| Ключі | будь-який тип | string / symbol |
| Порядок | завжди вставлення | числові сортуються |
| Розмір | `.size` | `Object.keys().length` |
| Ітерація | iterable, `for...of` | через `Object.*` |
| Прототип-ключі | немає | успадковує (`toString`) |
| JSON | вручну (`[...map]`) | напряму |
| Продуктивність | часті add/delete | статичні записи |

```js
const obj = Object.fromEntries(m);        // Map → Object
const map = new Map(Object.entries(obj)); // Object → Map
```

> 💡 Map — динамічні словники, ключі-об'єкти, порядок, часті add/delete. Object — JSON, фіксована структура, доступ через літерал.

---

## 1️⃣8️⃣ Record & array-like родичі

**`Record<K, V>`** — utility type для об'єкта-словника (не рантайм-структура як Map).

```ts
type Lang = "en" | "uk" | "pl";
const greetings: Record<Lang, string> = { en: "Hi", uk: "Привіт", pl: "Cześć" };
// ❌ забув ключ → compile error
```

### Схожі структури в JS

| Структура | Що |
|---|---|
| TypedArrays | `Int32Array`, `Uint8Array` — бінарні дані |
| `ArrayBuffer`/`DataView` | сирий буфер байтів |
| `URLSearchParams`/`Headers`/`FormData` | Map-подібні API |
| `NodeList`/`HTMLCollection`/`arguments` | array-like (не масиви) |

```js
Array.from(document.querySelectorAll("div"));  // array-like → масив
```

> 💡 `Record` найкорисніший з union літералів — TS гарантує exhaustiveness. Compile-time тип над об'єктом → серіалізується в JSON.

---

## 1️⃣9️⃣ Observer Pattern

Subject тримає список observers і **автоматично сповіщає** їх про зміни. Зв'язок «один-до-багатьох» зі слабкою зв'язністю.

```js
class Subject {
  #observers = new Set();
  subscribe(o) { this.#observers.add(o); return () => this.#observers.delete(o); }
  notify(data) { this.#observers.forEach(o => o.update(data)); }
}
```

| | Observer | Pub/Sub |
|---|---|---|
| Зв'язок | subject знає observers | через брокер |
| Обізнаність | сторони пов'язані | не знають одне одного |

> 💡 Фундамент: DOM-події (`addEventListener`), RxJS, Redux `store.subscribe`, сигнали, WebSockets/Centrifugo.
> ⚠️ Головна пастка — витоки через незняті підписки. Cleanup обов'язковий (`unsubscribe`/`takeUntil`/`useEffect` return).

---

## 2️⃣0️⃣ Symbols & Custom Iterables

**Symbol** — унікальний незмінний примітив. `Symbol("id") === Symbol("id")` → `false`.

Навіщо: неконфліктні ключі, «приховані» властивості (не видно в `for...in`/`Object.keys`/`JSON`), **well-known symbols** (гачки поведінки рушія).

### Custom Iterable

Об'єкт ітерований, якщо має `[Symbol.iterator]()` → iterator із `next()` → `{ value, done }`.

```js
const range = {
  from: 1, to: 5,
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) yield i;
  },
};
[...range];  // [1,2,3,4,5]
```

> 📝 `Array`/`String`/`Map`/`Set` ітеровані з коробки; звичайний **об'єкт — ні**.
> 💡 `Symbol.asyncIterator` + `for await...of` — асинхронні потоки (пагіновані API).

---

## 2️⃣1️⃣ Regular Expressions

| Прапорець | Дія |
|---|---|
| `g` | усі збіги |
| `i` | без регістру |
| `m` | `^`/`$` на кожен рядок |
| `s` | `.` матчить `\n` |
| `u` | unicode |
| `y` | sticky (від `lastIndex`) |

| Блок | Значення |
|---|---|
| `\d \w \s` | цифра / word / пробіл |
| `* + ?` | 0+, 1+, 0-1 |
| `{n,m}` | від n до m |
| `^ $ \b` | початок / кінець / межа слова |
| `(?:..)` `(?<n>..)` | non-capturing / named |
| `(?=..)` `(?<=..)` | lookahead / lookbehind |

```js
"John Smith".replace(/(\w+) (\w+)/, "$2 $1");  // "Smith John"
```

> ⚠️ `lastIndex` з `g` зберігається між викликами `test`/`exec` на тому ж об'єкті — хитрі баги в циклах.
> ⚠️ Catastrophic backtracking (`(a+)+`) → ReDoS, зависання. Уникай вкладених квантифікаторів.

---

## ⚠️ Senior-інсайти наостанок

> ⚠️ **unknown, не any** — для невідомих типів; `any` глушить перевірки навколо себе.
> ⚠️ **never для exhaustiveness** — новий union-member ламає білд, не рантайм.
> ⚠️ **Cleanup усюди** — слухачі, інтервали, підписки; інакше витоки через живу досяжність.
> 💡 **Illegal states unrepresentable** — discriminated unions + narrowing замість булевих прапорців.
> 💡 **Prototype chain** — методи в `prototype`, не в кожному інстансі; `class` — цукор над цим.
