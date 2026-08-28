import type { PracticeTask } from '../types'

// Section A of the interview-prep checklist: hand-rolled JS/TS utilities
// (the "implement lodash/clsx from scratch" round).
export const jsUtilitiesTasks: PracticeTask[] = [
  {
    id: 'implement-debounce',
    title: 'debounce() — базовий + leading/trailing',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'high',
    tags: ['closures', 'timers', 'this', 'leading', 'trailing'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>debounce(fn, delay, options)</code> — повертає обгорнуту функцію, що викликає <code>fn</code> лише коли після останнього виклику минуло <code>delay</code> мс.</p>
      <ul class="list">
        <li>збережи правильний <code>this</code> і передай усі аргументи;</li>
        <li>додай метод <code>.cancel()</code> для скасування відкладеного виклику;</li>
        <li>підтримай <code>options.leading</code> (виклик на <strong>першому</strong> тригері) та <code>options.trailing</code> (виклик у <strong>кінці</strong> паузи, дефолт <code>true</code>).</li>
      </ul>`,
    starterCode: `interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options: DebounceOptions = {},
) {
  // TODO: реалізуй. Поверни функцію з методом cancel().
}

// Приклад:
// const log = debounce((x) => console.log(x), 200);
// log(1); log(2); // виведе лише 2`,
    solution: `function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options: DebounceOptions = {},
) {
  const { leading = false, trailing = true } = options;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: unknown;

  function invoke() {
    fn.apply(lastThis, lastArgs as Parameters<T>);
    lastArgs = null;
  }

  function debounced(this: unknown, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;

    const callNow = leading && timer === null;
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      // trailing: викликаємо лише якщо були нові виклики після leading
      if (trailing && lastArgs) invoke();
    }, delay);

    if (callNow) invoke();
  }

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    lastArgs = null;
  };

  return debounced;
}`,
    explanation: `<ul class="list">
      <li>Замикання тримає <code>timer</code>, останні <code>args</code>/<code>this</code> між викликами.</li>
      <li>Звичайна <code>function</code> (не стрілка) для <code>debounced</code> — щоб <code>this</code> прив'язувався від виклику; далі <code>fn.apply(lastThis, lastArgs)</code>.</li>
      <li><code>leading</code>: викликаємо одразу, якщо таймера ще не було (<code>timer === null</code>). <code>trailing</code>: наприкінці паузи, і тільки якщо після leading-виклику були нові тригери (<code>lastArgs</code> не скинуто).</li>
      <li><code>leading:false, trailing:true</code> — класичний debounce; <code>leading:true, trailing:false</code> — фактично «викликати відразу, далі глушити».</li>
      <li><code>.cancel()</code> — типовий «senior»-штрих, який часто просять додати.</li>
    </ul>`,
  },
  {
    id: 'implement-throttle',
    title: 'throttle() — leading/trailing',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'high',
    tags: ['closures', 'timers', 'rate-limit'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>throttle(fn, interval)</code> — викликає <code>fn</code> не частіше ніж раз на <code>interval</code> мс, <strong>рівномірно</strong> пропускаючи виклики між ними.</p>
      <ul class="list">
        <li>перший виклик — одразу (leading);</li>
        <li>останній виклик у вікні — виконується наприкінці інтервалу (trailing), з найсвіжішими аргументами;</li>
        <li>додай <code>.cancel()</code>.</li>
      </ul>
      <p>У розборі поясни різницю з <code>debounce</code>.</p>`,
    starterCode: `function throttle<T extends (...args: any[]) => void>(fn: T, interval: number) {
  // TODO: leading + trailing, cancel()
}

// scroll/resize handler:
// window.addEventListener('scroll', throttle(onScroll, 100));`,
    solution: `function throttle<T extends (...args: any[]) => void>(fn: T, interval: number) {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: unknown;

  function throttled(this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    lastArgs = args;
    lastThis = this;

    const remaining = interval - (now - last);
    if (remaining <= 0) {
      // вікно вже пройшло — викликаємо одразу
      if (timer) { clearTimeout(timer); timer = null; }
      last = now;
      fn.apply(lastThis, lastArgs);
      lastArgs = null;
    } else if (!timer) {
      // заплануємо trailing-виклик на кінець поточного вікна
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        if (lastArgs) { fn.apply(lastThis, lastArgs); lastArgs = null; }
      }, remaining);
    }
  }

  throttled.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    last = 0;
    lastArgs = null;
  };

  return throttled;
}`,
    explanation: `<ul class="list">
      <li><code>throttle</code> гарантує <strong>регулярні</strong> виклики під час безперервного потоку подій (кожні <code>interval</code> мс); <code>debounce</code> — <strong>жодного</strong>, поки події не припиняться на <code>delay</code> мс.</li>
      <li>Scroll/resize/mousemove → throttle (плавне оновлення). Пошук/автозбереження/валідація → debounce (чекаємо паузу).</li>
      <li><code>remaining</code> рахуємо від <code>last</code> — це дає рівномірний темп, а не «пачки».</li>
      <li>Trailing через <code>setTimeout(remaining)</code>: останній виклик у вікні не губиться, спрацьовує з найновішими аргументами.</li>
    </ul>`,
  },
  {
    id: 'deep-clone',
    title: 'deepClone() — вкладені структури + цикли',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'high',
    tags: ['recursion', 'WeakMap', 'Date', 'structuredClone'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>deepClone(value)</code>:</p>
      <ul class="list">
        <li>примітиви повертаються як є;</li>
        <li>масиви та plain-об'єкти клонуються рекурсивно;</li>
        <li>підтримка <code>Date</code>, <code>Map</code>, <code>Set</code>;</li>
        <li><strong>edge:</strong> циклічні посилання — не має бути нескінченної рекурсії (використай <code>WeakMap</code>).</li>
      </ul>`,
    starterCode: `function deepClone<T>(value: T, seen = new WeakMap()): T {
  // TODO: примітиви, масиви, об'єкти, Date/Map/Set, циклічні посилання
  return value;
}`,
    solution: `function deepClone<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  // 1. Примітиви та функції — повертаємо як є
  if (value === null || typeof value !== 'object') return value;

  // 2. Циклічне посилання — вже клонували цей об'єкт
  if (seen.has(value as object)) return seen.get(value as object) as T;

  // 3. Спеціальні типи
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (value instanceof Map) {
    const result = new Map();
    seen.set(value as object, result);
    value.forEach((v, k) => result.set(k, deepClone(v, seen)));
    return result as T;
  }
  if (value instanceof Set) {
    const result = new Set();
    seen.set(value as object, result);
    value.forEach((v) => result.add(deepClone(v, seen)));
    return result as T;
  }

  // 4. Масиви та plain-об'єкти
  const result: any = Array.isArray(value) ? [] : {};
  seen.set(value as object, result); // реєструємо ДО рекурсії — інакше цикл зациклиться
  for (const key of Reflect.ownKeys(value as object)) {
    result[key] = deepClone((value as any)[key], seen);
  }
  return result as T;
}`,
    explanation: `<ul class="list">
      <li><code>WeakMap</code> «оригінал → клон» розриває цикли: перед тим як рекурсивно клонувати поля, реєструємо клон, тож повторна зустріч того самого об'єкта поверне готове посилання.</li>
      <li><code>typeof value !== 'object'</code> відсіює всі примітиви одним рядком (<code>null</code> обробляємо окремо — <code>typeof null === 'object'</code>).</li>
      <li><code>Date</code>/<code>Map</code>/<code>Set</code> потребують окремих гілок — простий обхід ключів їх не скопіює.</li>
      <li><strong>У проді:</strong> нативний <code>structuredClone()</code> робить усе це (крім функцій і DOM-вузлів) — але на співбесіді хочуть побачити ручну реалізацію з <code>WeakMap</code>.</li>
    </ul>`,
  },
  {
    id: 'deep-equal',
    title: 'deepEqual() — глибоке порівняння',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'high',
    tags: ['recursion', 'equality', 'NaN'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>deepEqual(a, b)</code> — <code>true</code>, якщо структури повністю рівні за значенням:</p>
      <ul class="list">
        <li>примітиви — <code>Object.is</code> (щоб <code>NaN === NaN</code>);</li>
        <li>масиви — однакова довжина й порядок;</li>
        <li>об'єкти — однаковий набір ключів і рівні значення;</li>
        <li>різні типи / <code>null</code> vs об'єкт — <code>false</code>.</li>
      </ul>`,
    starterCode: `function deepEqual(a: unknown, b: unknown): boolean {
  // TODO
  return a === b;
}`,
    solution: `function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true; // примітиви + одне й те саме посилання; NaN === NaN

  if (
    typeof a !== 'object' || a === null ||
    typeof b !== 'object' || b === null
  ) {
    return false;
  }

  const aIsArr = Array.isArray(a);
  if (aIsArr !== Array.isArray(b)) return false;

  if (aIsArr) {
    if ((a as unknown[]).length !== (b as unknown[]).length) return false;
    return (a as unknown[]).every((v, i) => deepEqual(v, (b as unknown[])[i]));
  }

  const aKeys = Object.keys(a as object);
  const bKeys = Object.keys(b as object);
  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      deepEqual((a as any)[key], (b as any)[key]),
  );
}`,
    explanation: `<ul class="list">
      <li><code>Object.is</code> замість <code>===</code>: коректно порівнює <code>NaN</code> і розрізняє <code>+0</code>/<code>-0</code> (для більшості задач це бажана поведінка).</li>
      <li>Після відсіювання примітивів обидва — об'єкти. Перевіряємо, що обидва або масиви, або ні.</li>
      <li>Для об'єктів: спершу однакова <strong>кількість</strong> ключів, потім кожен ключ з <code>a</code> має бути в <code>b</code> з глибоко рівним значенням.</li>
      <li>Обмеження цієї версії: не порівнює <code>Map</code>/<code>Set</code>/<code>Date</code> та циклічні структури — на співбесіді достатньо озвучити ці межі.</li>
    </ul>`,
  },
  {
    id: 'event-emitter',
    title: 'EventEmitter — on / off / emit / once',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'mid',
    tags: ['pub-sub', 'Map', 'Set', 'unsubscribe'],
    prompt: `<p><strong>Завдання:</strong> реалізуй клас <code>EventEmitter</code>:</p>
      <ul class="list">
        <li><code>on(event, handler)</code> — підписка; повертає функцію <code>unsubscribe</code>;</li>
        <li><code>off(event, handler)</code> — відписка;</li>
        <li><code>emit(event, ...args)</code> — виклик усіх обробників;</li>
        <li><code>once(event, handler)</code> — обробник, що спрацьовує рівно один раз.</li>
      </ul>`,
    starterCode: `type Handler = (...args: any[]) => void;

class EventEmitter {
  // TODO: on / off / emit / once; on повертає unsubscribe
}`,
    solution: `type Handler = (...args: any[]) => void;

class EventEmitter {
  private listeners = new Map<string, Set<Handler>>();

  on(event: string, handler: Handler): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler);
    return () => this.off(event, handler); // зручний unsubscribe
  }

  off(event: string, handler: Handler): void {
    this.listeners.get(event)?.delete(handler);
  }

  emit(event: string, ...args: any[]): void {
    // копія — щоб handler, який відписується під час emit, не зламав ітерацію
    for (const handler of [...(this.listeners.get(event) ?? [])]) {
      handler(...args);
    }
  }

  once(event: string, handler: Handler): () => void {
    const wrapper: Handler = (...args) => {
      this.off(event, wrapper);
      handler(...args);
    };
    return this.on(event, wrapper);
  }
}`,
    explanation: `<ul class="list">
      <li><code>Map&lt;event, Set&lt;handler&gt;&gt;</code>: <code>Set</code> автоматично дедуплікує обробники й дає O(1) <code>delete</code>.</li>
      <li><code>on</code> повертає <code>unsubscribe</code> — сучасний патерн (як <code>addEventListener</code> у RxJS/React), не треба тримати посилання на handler для <code>off</code>.</li>
      <li><code>once</code> реалізовано через обгортку, яка спершу відписує себе, потім викликає оригінал — інакше рекурсивний <code>emit</code> у handler'і викличе його двічі.</li>
      <li>В <code>emit</code> ітеруємо по <strong>копії</strong> <code>Set</code>: типовий баг — handler відписується (або підписує новий) під час <code>emit</code>, мутуючи <code>Set</code> під час циклу.</li>
    </ul>`,
  },
  {
    id: 'curry',
    title: 'curry() — каррінг довільної арності',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'mid',
    tags: ['closures', 'fn.length', 'recursion'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>curry(fn)</code>: <code>const add = (a,b,c) =&gt; a+b+c</code> → <code>curry(add)(1)(2)(3)</code>, <code>curry(add)(1,2)(3)</code> і <code>curry(add)(1)(2,3)</code> — усі повертають <code>6</code>.</p>
      <p>Арність визначаємо через <code>fn.length</code>.</p>`,
    starterCode: `function curry<T extends (...args: any[]) => any>(fn: T) {
  // TODO
}`,
    solution: `function curry<T extends (...args: any[]) => any>(fn: T) {
  return function curried(this: unknown, ...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(this, args); // зібрали достатньо — викликаємо
    }
    // ще не вистачає — повертаємо функцію, що добере решту
    return (...rest: any[]) => curried.apply(this, [...args, ...rest]);
  };
}`,
    explanation: `<ul class="list">
      <li><code>fn.length</code> — кількість оголошених параметрів (без rest / з дефолтами не рахує). Це «мета», скільки аргументів зібрати.</li>
      <li>Якщо накопичених аргументів <code>&gt;=</code> арності — викликаємо <code>fn</code>; інакше повертаємо функцію, яка додасть решту й рекурсивно викличе <code>curried</code>.</li>
      <li><code>[...args, ...rest]</code> — акумуляція часткових аргументів у замиканні.</li>
      <li>Практичний сенс: спеціалізація функцій (<code>const add5 = curry(add)(5)</code>) і зручна композиція в point-free стилі.</li>
    </ul>`,
  },
  {
    id: 'once',
    title: 'once() — виклик рівно один раз',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'mid',
    tags: ['closures', 'memo', 'this'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>once(fn)</code> — повертає функцію, що викликає <code>fn</code> лише при <strong>першому</strong> зверненні, а далі повертає <strong>закешований</strong> перший результат (не викликаючи <code>fn</code> знову). Збережи <code>this</code> та аргументи.</p>`,
    starterCode: `function once<T extends (...args: any[]) => any>(fn: T): T {
  // TODO
  return fn;
}`,
    solution: `function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  } as T;
}`,
    explanation: `<ul class="list">
      <li>Прапорець <code>called</code> у замиканні — «шлагбаум»; <code>result</code> тримає перше значення.</li>
      <li>Окремий boolean, а не перевірка <code>result === undefined</code> — бо <code>fn</code> легітимно може повернути <code>undefined</code>.</li>
      <li>Типове застосування: одноразова ініціалізація (підключення до БД, singleton-конфіг, лог депрекейшена).</li>
      <li>Споріднене з <code>memoize</code>, але без урахування аргументів — «перший результат назавжди».</li>
    </ul>`,
  },
  {
    id: 'pipe-compose',
    title: 'pipe() / compose() — композиція функцій',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'mid',
    tags: ['reduce', 'composition', 'fp'],
    prompt: `<p><strong>Завдання:</strong> реалізуй:</p>
      <ul class="list">
        <li><code>pipe(...fns)</code> — застосовує функції <strong>зліва направо</strong>: <code>pipe(f, g)(x) === g(f(x))</code>;</li>
        <li><code>compose(...fns)</code> — <strong>справа наліво</strong>: <code>compose(f, g)(x) === f(g(x))</code>.</li>
      </ul>
      <p>Перша функція може бути багатоаргументною.</p>`,
    starterCode: `function pipe(...fns: Array<(arg: any) => any>) {
  // TODO
}

function compose(...fns: Array<(arg: any) => any>) {
  // TODO
}`,
    solution: `function pipe(...fns: Array<(...args: any[]) => any>) {
  return (...args: any[]) =>
    fns.reduce<any>((acc, fn, i) => (i === 0 ? fn(...args) : fn(acc)), undefined);
}

function compose(...fns: Array<(...args: any[]) => any>) {
  return pipe(...fns.reverse());
}

// або без reverse:
// const compose = (...fns) => (...args) =>
//   fns.reduceRight((acc, fn, i) =>
//     i === fns.length - 1 ? fn(...args) : fn(acc), undefined);`,
    explanation: `<ul class="list">
      <li><code>pipe</code> = <code>reduce</code> зліва направо: перша функція отримує всі аргументи, кожна наступна — результат попередньої.</li>
      <li><code>compose</code> = те саме, але <code>reduceRight</code> (або <code>pipe</code> з розвернутим списком) — математичний запис <code>f ∘ g</code>.</li>
      <li>Практика: <code>const process = pipe(trim, toLowerCase, slugify)</code> — читабельний конвеєр перетворень.</li>
      <li>Redux <code>compose</code> застосовує middleware саме так; RxJS <code>pipe</code> — той самий принцип для операторів.</li>
    </ul>`,
  },
  {
    id: 'classnames',
    title: 'classNames() — утиліта (clsx)',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'low',
    tags: ['strings', 'arguments', 'objects'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>classNames(...args)</code> — збирає рядок CSS-класів:</p>
      <ul class="list">
        <li>рядки й числа — додаються як є;</li>
        <li>об'єкти <code>{ active: true, disabled: false }</code> → додається ключ, якщо значення truthy;</li>
        <li>масиви — обробляються рекурсивно;</li>
        <li><code>falsy</code> (<code>null</code>, <code>undefined</code>, <code>false</code>, <code>0</code>, <code>''</code>) — ігноруються.</li>
      </ul>
      <p><code>classNames('btn', { active: true }, ['lg', null])</code> → <code>'btn active lg'</code>.</p>`,
    starterCode: `type ClassValue =
  | string | number | null | undefined | boolean
  | Record<string, boolean>
  | ClassValue[];

function classNames(...args: ClassValue[]): string {
  // TODO
  return '';
}`,
    solution: `function classNames(...args: ClassValue[]): string {
  const out: string[] = [];

  for (const arg of args) {
    if (!arg) continue; // falsy — пропускаємо

    if (typeof arg === 'string' || typeof arg === 'number') {
      out.push(String(arg));
    } else if (Array.isArray(arg)) {
      const inner = classNames(...arg); // рекурсія
      if (inner) out.push(inner);
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) out.push(key);
      }
    }
  }

  return out.join(' ');
}`,
    explanation: `<ul class="list">
      <li>Один прохід по <code>arguments</code> з розгалуженням за <code>typeof</code> / <code>Array.isArray</code>.</li>
      <li><code>if (!arg) continue</code> одразу відсіює всі falsy — включно з <code>false</code> від тернарників у JSX (<code>cond && 'class'</code>).</li>
      <li>Об'єкт: додаємо <strong>ключ</strong>, коли значення truthy — це основний зручний кейс у React (<code>{ 'is-open': isOpen }</code>).</li>
      <li>Рекурсія для масивів дозволяє передавати <code>classNames(base, [conditional, another])</code>.</li>
    </ul>`,
  },
  {
    id: 'get-path',
    title: "get(obj, 'a.b.c', default)",
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'low',
    tags: ['path', 'reduce', 'optional-chaining'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>get(obj, path, defaultValue?)</code> — безпечний доступ по шляху:</p>
      <ul class="list">
        <li><code>path</code> — рядок <code>'a.b.c'</code> або масив <code>['a', 'b', 0]</code>;</li>
        <li>підтримка індексів масивів: <code>'a.list[0].name'</code>;</li>
        <li>якщо будь-яка ланка <code>null</code>/<code>undefined</code> — повертаємо <code>defaultValue</code> (або <code>undefined</code>).</li>
      </ul>`,
    starterCode: `function get<T = unknown>(
  obj: unknown,
  path: string | Array<string | number>,
  defaultValue?: T,
): T | undefined {
  // TODO
  return defaultValue;
}`,
    solution: `function get<T = unknown>(
  obj: unknown,
  path: string | Array<string | number>,
  defaultValue?: T,
): T | undefined {
  const keys = Array.isArray(path)
    ? path
    : path
        .replace(/\\[(\\w+)\\]/g, '.$1') // a[0].b -> a.0.b
        .split('.')
        .filter(Boolean);

  let current: any = obj;
  for (const key of keys) {
    if (current == null) return defaultValue; // null або undefined
    current = current[key];
  }

  return current === undefined ? defaultValue : current;
}`,
    explanation: `<ul class="list">
      <li>Нормалізуємо <code>path</code> до масиву ключів: <code>[key]</code> → <code>.key</code>, потім split по крапці.</li>
      <li>Цикл спускається по ланках; <code>current == null</code> (нестрога рівність) ловить і <code>null</code>, і <code>undefined</code> — далі йти нема куди.</li>
      <li>Наприкінці <code>undefined</code> замінюємо на <code>defaultValue</code>, але <code>null</code>/<code>0</code>/<code>''</code> лишаємо — це валідні значення.</li>
      <li>Нативний аналог — optional chaining (<code>obj?.a?.b?.c ?? def</code>), але <code>get</code> корисний для <strong>динамічного</strong> шляху, відомого лише в рантаймі.</li>
    </ul>`,
  },
  {
    id: 'set-path',
    title: "set(obj, 'a.b.c', value)",
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'low',
    tags: ['path', 'immutability', 'recursion'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>set(obj, path, value)</code> — записує <code>value</code> по шляху, створюючи проміжні об'єкти за потреби. Зроби <strong>імутабельну</strong> версію: повертає новий об'єкт, не мутуючи вхідний (як для оновлення React-стану).</p>`,
    starterCode: `function set<T extends object>(
  obj: T,
  path: string | Array<string | number>,
  value: unknown,
): T {
  // TODO: імутабельно, створюючи проміжні рівні
  return obj;
}`,
    solution: `function set<T extends object>(
  obj: T,
  path: string | Array<string | number>,
  value: unknown,
): T {
  const keys = Array.isArray(path) ? path : path.split('.').filter(Boolean);
  if (keys.length === 0) return obj;

  const [head, ...rest] = keys;
  const clone: any = Array.isArray(obj) ? [...obj] : { ...obj }; // shallow copy рівня

  clone[head] =
    rest.length === 0
      ? value
      : set(
          (obj as any)[head] != null && typeof (obj as any)[head] === 'object'
            ? (obj as any)[head]
            : {},
          rest,
          value,
        );

  return clone;
}`,
    explanation: `<ul class="list">
      <li>Рекурсія «по одній ланці»: на кожному рівні робимо <strong>shallow-копію</strong> (<code>{...obj}</code>), змінюємо лише один ключ.</li>
      <li>Копіюються тільки об'єкти <em>вздовж шляху</em> — сусідні гілки лишаються тим самим посиланням (structural sharing, як в Immer / Redux).</li>
      <li>Якщо проміжна ланка не об'єкт (або відсутня) — створюємо новий <code>{}</code>.</li>
      <li>Саме такий підхід дозволяє <code>React.memo</code> / <code>useMemo</code> бачити зміну лише там, де вона реально сталась.</li>
    </ul>`,
  },
  {
    id: 'memoize',
    title: 'memoize() — кеш за аргументами',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'mid',
    tags: ['closures', 'cache', 'Map'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>memoize(fn)</code>, який кешує результат <code>fn</code> за аргументами: повторний виклик з тими самими аргументами повертає значення з кешу, не викликаючи <code>fn</code> знову.</p>
      <p>Достатньо підтримати серіалізовані аргументи (числа/рядки). У розборі згадай обмеження підходу з <code>JSON.stringify</code>-ключем.</p>`,
    starterCode: `function memoize<A extends unknown[], R>(fn: (...args: A) => R) {
  // TODO: повернути мемоізовану версію fn
}

// const slow = (a: number, b: number) => { /* дорого */ return a + b; };
// const fast = memoize(slow);
// fast(2, 3); // рахує
// fast(2, 3); // з кешу`,
    solution: `function memoize<A extends unknown[], R>(fn: (...args: A) => R) {
  const cache = new Map<string, R>();

  return (...args: A): R => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}`,
    explanation: `<ul class="list">
      <li>Замикання тримає <code>Map</code> кешу між викликами.</li>
      <li><code>JSON.stringify(args)</code> — простий ключ для примітивних аргументів.</li>
      <li><strong>Обмеження:</strong> не працює коректно для аргументів-об'єктів (різний порядок ключів, функції, <code>undefined</code>), циклічних структур та дуже великих аргументів. Для об'єктів беруть <code>WeakMap</code> або кастомний key-resolver.</li>
    </ul>`,
  },
  {
    id: 'this-binding-bug',
    title: 'Полагодити втрачений this',
    level: 'Middle',
    topic: 'JS Utilities',
    priority: 'mid',
    tags: ['this', 'bind', 'arrow'],
    prompt: `<p><strong>Проблема:</strong> у класі <code>Counter</code> кнопка викликає <code>increment</code>, але <code>this.count</code> — <code>undefined</code>, а лічильник не росте.</p>
      <p><strong>Завдання:</strong> знайди причину і полагодь (мінімум два способи). Поясни, чому контекст губиться при передачі методу як колбека.</p>`,
    starterCode: `class Counter {
  count = 0;

  increment() {
    this.count++;         // TypeError: Cannot read properties of undefined
    render(this.count);
  }

  mount(btn: HTMLButtonElement) {
    // this губиться: метод передається як «відірваний» колбек
    btn.addEventListener('click', this.increment);
  }
}`,
    solution: `// Спосіб 1 — прив'язати у mount:
btn.addEventListener('click', this.increment.bind(this));

// Спосіб 2 — стрілкова обгортка (зберігає лексичний this):
btn.addEventListener('click', () => this.increment());

// Спосіб 3 — оголосити метод як стрілкове поле класу:
class Counter {
  count = 0;
  increment = () => {   // this завжди прив'язаний до інстанса
    this.count++;
    render(this.count);
  };
}`,
    explanation: `<ul class="list">
      <li><code>this</code> у звичайному методі визначається <strong>способом виклику</strong>. <code>addEventListener('click', this.increment)</code> передає «голу» функцію — при кліку <code>this</code> буде <code>undefined</code> (strict mode) або <code>element</code>.</li>
      <li><code>.bind(this)</code> жорстко фіксує контекст; стрілкова обгортка бере <code>this</code> лексично.</li>
      <li>Стрілкове <strong>поле класу</strong> — найзручніше для колбеків, бо метод створюється вже прив'язаним (ціна — окрема функція на кожен інстанс).</li>
    </ul>`,
  },
]
