import type { PracticeTask } from './types'

// Interview-style practice exercises ("fix / complete / solve") in the spirit of
// live-coding rounds. Static study cards: the editor is editable so you can
// attempt a solution, then reveal the reference answer — nothing is executed.
// Mix of RxJS/Angular and general senior JS/TS problems.
export const practiceTasks: PracticeTask[] = [
  // ─────────────────────────── RxJS / Angular ───────────────────────────
  {
    id: 'promise-to-observable',
    title: 'Promise → Observable (tap + catchError)',
    level: 'Senior',
    topic: 'RxJS',
    tags: ['from', 'switchMap', 'tap', 'catchError'],
    prompt: `<p><strong>Що дано:</strong> дві функції <code>fetchUser()</code> та <code>fetchOrders(userId)</code> емулюють відповідь бекенду через <code>Promise</code>. Їх чіпати не треба.</p>
      <p><strong>Завдання:</strong> реалізуй третю функцію <code>loadUserData()</code>, яка:</p>
      <ul class="list">
        <li>перетворює <code>fetchUser()</code> (Promise) на <strong>Observable</strong>;</li>
        <li>через <code>switchMap</code> дозавантажує замовлення користувача (<code>fetchOrders</code>);</li>
        <li>через <code>tap</code> зберігає результат у <code>this.cache</code> (side-effect);</li>
        <li>через <code>catchError</code> ловить помилку і повертає безпечний fallback <code>{ user: null, orders: [] }</code>;</li>
        <li>повертає <code>Observable</code> (підписку робить викликач).</li>
      </ul>
      <p>Типова помилка на співбесіді — <code>subscribe</code> всередині <code>subscribe</code> замість <code>switchMap</code>, та відсутність <code>catchError</code>.</p>`,
    starterCode: `import { Observable, from, of } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';

interface User { id: number; name: string; }
interface Order { id: number; total: number; }
interface UserData { user: User | null; orders: Order[]; }

// Емуляція бекенду — НЕ чіпати
function fetchUser(): Promise<User> {
  return new Promise((res) => setTimeout(() => res({ id: 1, name: 'Ada' }), 300));
}
function fetchOrders(userId: number): Promise<Order[]> {
  return new Promise((res) =>
    setTimeout(() => res([{ id: 10, total: 99 }, { id: 11, total: 40 }]), 300),
  );
}

class UserService {
  cache: UserData | null = null;

  // TODO: реалізуй метод. Поверни Observable<UserData>.
  loadUserData(): Observable<UserData> {
    return of({ user: null, orders: [] }); // замінити
  }
}`,
    solution: `loadUserData(): Observable<UserData> {
  return from(fetchUser()).pipe(
    switchMap((user) =>
      from(fetchOrders(user.id)).pipe(
        map((orders) => ({ user, orders })),
      ),
    ),
    tap((data) => {
      this.cache = data; // side-effect: кешуємо
    }),
    catchError((err) => {
      console.error('loadUserData failed', err);
      return of({ user: null, orders: [] }); // безпечний fallback
    }),
  );
}

// Викликач:
// service.loadUserData().subscribe((data) => console.log(data));`,
    explanation: `<ul class="list">
      <li><code>from(promise)</code> перетворює <code>Promise</code> на <code>Observable</code>, що емітить одне значення і завершується.</li>
      <li><code>switchMap</code> «розгортає» вкладений Observable і скасовує попередній — правильна заміна вкладених <code>subscribe</code>.</li>
      <li><code>tap</code> — для side-effects (кеш, логування) без зміни потоку.</li>
      <li><code>catchError</code> має повертати <strong>новий Observable</strong> (<code>of(...)</code>), інакше потік впаде з помилкою.</li>
    </ul>`,
  },
  {
    id: 'typeahead-search',
    title: 'Typeahead-пошук (debounce + switchMap)',
    level: 'Senior',
    topic: 'RxJS',
    tags: ['debounceTime', 'distinctUntilChanged', 'switchMap'],
    prompt: `<p><strong>Проблема:</strong> поле пошуку шле запит на кожне натискання клавіші — забагато запитів і «гонки» відповідей.</p>
      <p><strong>Завдання:</strong> побудуй потік із <code>input$</code> (рядки з поля), який:</p>
      <ul class="list">
        <li>чекає паузу в наборі — <code>debounceTime(300)</code>;</li>
        <li>ігнорує повтори — <code>distinctUntilChanged()</code>;</li>
        <li>скасовує попередній запит при новому — <code>switchMap</code>;</li>
        <li>не падає на помилці запиту — <code>catchError</code> → <code>of([])</code>.</li>
      </ul>`,
    starterCode: `import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

declare function searchApi(term: string): Observable<string[]>;

// input$ — потік значень з поля пошуку
function buildSearch(input$: Observable<string>): Observable<string[]> {
  // TODO: додай оператори так, щоб уникнути зайвих запитів і гонок
  return input$.pipe(
    switchMap((term) => searchApi(term)),
  );
}`,
    solution: `function buildSearch(input$: Observable<string>): Observable<string[]> {
  return input$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) =>
      searchApi(term).pipe(
        catchError(() => of([])), // локальний catch, потік живе далі
      ),
    ),
  );
}`,
    explanation: `<ul class="list">
      <li><code>debounceTime</code> + <code>distinctUntilChanged</code> різко зменшують кількість запитів.</li>
      <li><code>switchMap</code> скасовує in-flight запит, тож приходить лише відповідь на останній term — немає race condition.</li>
      <li><code>catchError</code> ставимо <strong>всередині</strong> <code>switchMap</code>, щоб помилка одного запиту не «вбила» весь потік поля.</li>
    </ul>`,
  },
  {
    id: 'retry-backoff',
    title: 'Retry із експоненційним backoff',
    level: 'Senior',
    topic: 'RxJS',
    tags: ['retry', 'timer', 'catchError'],
    prompt: `<p><strong>Завдання:</strong> обгорни нестабільний запит <code>request$</code> так, щоб він повторювався до <strong>3 разів</strong> із затримкою <code>1s, 2s, 4s</code> (експоненційно). Якщо всі спроби провалились — повернути <code>of(null)</code>.</p>
      <p>Використай сучасний <code>retry({ count, delay })</code> (RxJS 7.5+).</p>`,
    starterCode: `import { Observable, of, timer } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

declare const request$: Observable<Response>;

function resilient(): Observable<Response | null> {
  // TODO: 3 повтори, затримки 1s/2s/4s, fallback of(null)
  return request$;
}`,
    solution: `function resilient(): Observable<Response | null> {
  return request$.pipe(
    retry({
      count: 3,
      delay: (_err, retryCount) => timer(1000 * 2 ** (retryCount - 1)), // 1s, 2s, 4s
    }),
    catchError(() => of(null)),
  );
}`,
    explanation: `<ul class="list">
      <li>Об'єктна форма <code>retry({ count, delay })</code> дозволяє керувати паузою між спробами.</li>
      <li><code>delay</code> повертає Observable (тут <code>timer</code>), який визначає, коли робити наступну спробу.</li>
      <li><code>2 ** (retryCount - 1)</code> дає експоненту: спроби 1→1s, 2→2s, 3→4s.</li>
      <li><code>catchError</code> спрацьовує лише коли вичерпані всі повтори.</li>
    </ul>`,
  },
  {
    id: 'forkjoin-parallel',
    title: 'Паралельні запити (forkJoin)',
    level: 'Middle',
    topic: 'RxJS',
    tags: ['forkJoin', 'combineLatest'],
    prompt: `<p><strong>Завдання:</strong> завантаж <code>profile$</code>, <code>settings$</code> і <code>notifications$</code> <strong>паралельно</strong> і поверни один об'єкт <code>{ profile, settings, notifications }</code> лише коли всі три завершились.</p>
      <p>Поясни у розборі, чим <code>forkJoin</code> відрізняється від <code>combineLatest</code>.</p>`,
    starterCode: `import { Observable, forkJoin } from 'rxjs';

declare const profile$: Observable<Profile>;
declare const settings$: Observable<Settings>;
declare const notifications$: Observable<Note[]>;

interface Dashboard { profile: Profile; settings: Settings; notifications: Note[]; }

function loadDashboard(): Observable<Dashboard> {
  // TODO: паралельно, дочекатись усіх
  return null as any;
}`,
    solution: `function loadDashboard(): Observable<Dashboard> {
  return forkJoin({
    profile: profile$,
    settings: settings$,
    notifications: notifications$,
  });
}`,
    explanation: `<ul class="list">
      <li><code>forkJoin</code> емітить <strong>один раз</strong> — коли <em>усі</em> джерела <strong>завершились</strong> (бере останнє значення кожного). Ідеально для паралельних HTTP-запитів.</li>
      <li><code>combineLatest</code> емітить <strong>щоразу</strong>, коли будь-яке джерело видало нове значення (потрібно, щоб кожне вже емітнуло хоча б раз). Для «живих» стрімів, не для одноразового завантаження.</li>
      <li>Об'єктна форма <code>forkJoin({...})</code> зручніша за масив — ключі одразу іменовані.</li>
    </ul>`,
  },
  // ─────────────────────────── JS / TS ───────────────────────────
  {
    id: 'implement-debounce',
    title: 'Реалізувати debounce()',
    level: 'Middle',
    topic: 'JS/TS',
    tags: ['closures', 'timers', 'this'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>debounce(fn, delay)</code> — повертає обгорнуту функцію, що викликає <code>fn</code> лише коли після останнього виклику минуло <code>delay</code> мс.</p>
      <p><strong>Вимоги:</strong> зберегти правильний <code>this</code> і передати всі аргументи. Додай метод <code>.cancel()</code> для скасування відкладеного виклику.</p>`,
    starterCode: `function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  // TODO: реалізуй. Поверни функцію з методом cancel().
}

// Приклад:
// const log = debounce((x) => console.log(x), 200);
// log(1); log(2); // виведе лише 2`,
    solution: `function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  function debounced(this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args); // зберігаємо this та аргументи
    }, delay);
  }

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return debounced;
}`,
    explanation: `<ul class="list">
      <li>Замикання тримає <code>timer</code> між викликами.</li>
      <li>Звичайна <code>function</code> (не стрілка) для <code>debounced</code> — щоб <code>this</code> прив'язувався від виклику; далі <code>fn.apply(this, args)</code>.</li>
      <li>Стрілка всередині <code>setTimeout</code> навмисно — щоб узяти <code>this</code>/<code>args</code> із замикання.</li>
      <li><code>.cancel()</code> — типовий «senior»-штрих, який часто просять додати.</li>
    </ul>`,
  },
  {
    id: 'event-loop-order',
    title: 'Порядок виконання (event loop)',
    level: 'Senior',
    topic: 'Async',
    tags: ['microtask', 'setTimeout', 'promise'],
    prompt: `<p><strong>Завдання:</strong> не запускаючи код, випиши <strong>точний порядок</strong> виводу в консоль і поясни чому. Це класичне питання про мікротаски vs макротаски.</p>
      <p>У редакторі — код. Твоя відповідь: послідовність чисел/рядків та обґрунтування (мікротаски виконуються перед наступною макротаскою).</p>`,
    starterCode: `console.log('1: start');

setTimeout(() => console.log('2: timeout'), 0);

Promise.resolve()
  .then(() => console.log('3: promise A'))
  .then(() => console.log('4: promise B'));

(async () => {
  console.log('5: async start');
  await null;
  console.log('6: after await');
})();

console.log('7: end');

// Питання: у якому порядку зʼявиться вивід?`,
    solution: `// Порядок виводу:
// 1: start
// 5: async start      (синхронна частина async-функції виконується одразу)
// 7: end
// 3: promise A        (мікротаски)
// 6: after await      (продовження після await — теж мікротаска)
// 4: promise B        (наступна мікротаска в ланцюжку .then)
// 2: timeout          (макротаска — останньою)`,
    explanation: `<ul class="list">
      <li>Спершу виконується весь <strong>синхронний</strong> код: <code>1</code>, <code>5</code>, <code>7</code>. Тіло <code>async</code>-функції до першого <code>await</code> — синхронне.</li>
      <li>Далі спорожняється <strong>черга мікротасок</strong> (Promise <code>.then</code>, продовження після <code>await</code>): <code>3</code>, <code>6</code>, <code>4</code>.</li>
      <li>Порядок мікротасок — за моментом їх постановки в чергу: <code>promise A</code> ставиться раніше, ніж продовження <code>await</code>; <code>promise B</code> — уже після резолву <code>A</code>.</li>
      <li><strong>Макротаска</strong> <code>setTimeout</code> (<code>2</code>) — лише коли черга мікротасок порожня.</li>
    </ul>`,
  },
  {
    id: 'this-binding-bug',
    title: 'Полагодити втрачений this',
    level: 'Middle',
    topic: 'JS/TS',
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
  {
    id: 'promise-pool',
    title: 'Promise.all із лімітом конкурентності',
    level: 'Senior',
    topic: 'Async',
    tags: ['promise', 'concurrency', 'pool'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>mapLimit(items, limit, worker)</code>, який виконує <code>worker(item)</code> для всіх елементів, але <strong>не більше <code>limit</code></strong> одночасно, і повертає результати <strong>у порядку вхідних елементів</strong>.</p>
      <p>Це часте senior-питання: <code>Promise.all</code> запускає все відразу — треба обмежити паралелізм (rate-limit / захист бекенду).</p>`,
    starterCode: `async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  // TODO: не більше \`limit\` одночасних worker(); порядок результатів = порядок items
  return [];
}`,
    solution: `async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;

  async function runner() {
    while (next < items.length) {
      const current = next++;            // атомарно «беремо» індекс
      results[current] = await worker(items[current], current);
    }
  }

  // Запускаємо min(limit, N) воркерів; кожен тягне наступний елемент
  const pool = Array.from({ length: Math.min(limit, items.length) }, runner);
  await Promise.all(pool);
  return results;
}`,
    explanation: `<ul class="list">
      <li>Замість запуску всіх промісів одразу — <code>limit</code> «воркерів», кожен у циклі бере наступний вільний індекс.</li>
      <li>Спільний лічильник <code>next</code> у замиканні гарантує, що елемент обробиться рівно один раз (JS однопотоковий — гонки на <code>next++</code> немає).</li>
      <li>Результати пишемо за індексом → порядок збережено попри різний час виконання.</li>
    </ul>`,
  },
  {
    id: 'memoize',
    title: 'Реалізувати memoize()',
    level: 'Middle',
    topic: 'JS/TS',
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
]
