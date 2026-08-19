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
  // ─────────────────────────── React ───────────────────────────
  {
    id: 'react-fetch-user-retry',
    title: 'Fetch користувача з ретраями',
    level: 'Middle',
    topic: 'React',
    tags: ['useEffect', 'useState', 'retry', 'error handling'],
    language: 'tsx',
    prompt: `<p><strong>Дано:</strong> функція <code>fetchUser()</code> — вона <em>рандомно</em> (через <code>setTimeout</code>) або резолвиться з даними користувача (<code>name</code>, <code>email</code>), або відхиляється з помилкою. Змінювати саму <code>fetchUser</code> не можна.</p>
      <p><strong>Завдання:</strong> реалізуй компонент <code>UserProfile</code>, який:</p>
      <ul class="list">
        <li>при монтуванні викликає <code>fetchUser()</code>;</li>
        <li>якщо запит <strong>успішний</strong> — показує ім'я та email користувача;</li>
        <li>якщо <strong>перша</strong> спроба провалилась — показує проміжний текст (наприклад, «Не вдалося завантажити, повторюємо…») і <strong>повторює</strong> запит ще раз;</li>
        <li>якщо провалилась і <strong>друга</strong> спроба (два фейли поспіль) — показує фінальний текст помилки і <strong>більше не робить запитів</strong> (без нескінченних ретраїв).</li>
      </ul>`,
    starterCode: `interface User {
  name: string;
  email: string;
}

// Задана функція — не змінювати. Рандомно (~40%) відхиляє проміс.
function fetchUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.4) {
        reject(new Error('Network error'));
      } else {
        resolve({ name: 'Іван Петренко', email: 'ivan@example.com' });
      }
    }, 500);
  });
}

function UserProfile() {
  // TODO:
  // 1. Викликати fetchUser() при монтуванні компонента.
  // 2. Якщо успіх — показати ім'я та email.
  // 3. Якщо 1-ша спроба невдала — показати текст "Не вдалося завантажити, повторюємо…"
  //    і повторити запит ще раз.
  // 4. Якщо 2-га спроба теж невдала — показати текст "Не вдалося завантажити користувача"
  //    і зупинитись (без подальших запитів).

  return null;
}`,
    solution: `type Status = 'loading' | 'retrying' | 'success' | 'error';

function UserProfile() {
  const [status, setStatus] = useState<Status>('loading');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const data = await fetchUser();
          if (!cancelled) {
            setUser(data);
            setStatus('success');
          }
          return; // успіх — далі не пробуємо
        } catch {
          if (cancelled) return;
          setStatus(attempt === 1 ? 'retrying' : 'error');
        }
      }
    }

    load();
    return () => {
      cancelled = true; // не робити setState після unmount
    };
  }, []);

  if (status === 'loading') return <p>Завантаження…</p>;
  if (status === 'retrying') return <p>Не вдалося завантажити, повторюємо…</p>;
  if (status === 'error') return <p>Не вдалося завантажити користувача</p>;

  return (
    <div>
      <p>{user!.name}</p>
      <p>{user!.email}</p>
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li><code>for</code>-цикл з <code>await fetchUser()</code> усередині <code>useEffect</code> — просте й читабельне обмеження кількості спроб: 1 початкова + 1 ретрай, без рекурсії чи бібліотек.</li>
      <li>Статус — це <strong>одна</strong> змінна-«машина станів» (<code>'loading' | 'retrying' | 'success' | 'error'</code>), а не набір окремих boolean-прапорців (<code>isLoading</code>, <code>isError</code>, ...) — так неможливо потрапити в суперечливий стан («і завантаження, і помилка одночасно»).</li>
      <li><code>cancelled</code>-прапорець у cleanup-функції ефекту захищає від класичної помилки: <code>setState</code> викликається вже після того, як компонент розмонтувався (запит все ще "летить").</li>
      <li>Порожній масив залежностей <code>[]</code> — запит запускається рівно один раз при монтуванні, ретраї відбуваються <em>всередині</em> цього самого виклику ефекту, а не через повторний рендер/ефект.</li>
    </ul>`,
  },
  {
    id: 'react-memo-referential-equality',
    title: 'React.memo не рятує від зайвих рендерів',
    level: 'Senior',
    topic: 'React',
    tags: ['memo', 'useCallback', 'referential equality'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>Row</code> обгорнутий у <code>React.memo</code>, але при кліку на кнопку «tick» (стан, ніяк не пов'язаний зі списком) кожен <code>Row</code> все одно ре-рендериться.</p>
      <p><strong>Завдання:</strong> зроби так, щоб клік на «tick» <strong>не</strong> викликав ре-рендер жодного <code>Row</code>, не знімаючи <code>memo</code> з компонента.</p>`,
    starterCode: `import { memo, useState } from 'react';

interface RowProps {
  id: number;
  label: string;
  onSelect: (id: number) => void;
  style: React.CSSProperties;
}

const Row = memo(function Row({ id, label, onSelect, style }: RowProps) {
  console.log('render Row', id);
  return (
    <div style={style} onClick={() => onSelect(id)}>
      {label}
    </div>
  );
});

interface ListProps {
  items: { id: number; label: string }[];
  onSelectItem: (id: number) => void; // припускаємо: стабільна референція
}

function ItemList({ items, onSelectItem }: ListProps) {
  const [tick, setTick] = useState(0); // не пов'язано зі списком

  return (
    <div>
      <button onClick={() => setTick((t) => t + 1)}>tick: {tick}</button>
      {items.map((item) => (
        <Row
          key={item.id}
          id={item.id}
          label={item.label}
          onSelect={(id) => onSelectItem(id)} // TODO: нова функція щоразу
          style={{ padding: 8 }} // TODO: новий об'єкт щоразу
        />
      ))}
    </div>
  );
}`,
    solution: `const rowStyle: React.CSSProperties = { padding: 8 }; // hoisted — стабільне посилання

function ItemList({ items, onSelectItem }: ListProps) {
  const [tick, setTick] = useState(0);

  return (
    <div>
      <button onClick={() => setTick((t) => t + 1)}>tick: {tick}</button>
      {items.map((item) => (
        <Row
          key={item.id}
          id={item.id}
          label={item.label}
          onSelect={onSelectItem} // стабільна референція, id передається окремим пропом
          style={rowStyle}
        />
      ))}
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li><code>React.memo</code> робить shallow-порівняння пропів. Новий inline-об'єкт чи функція на кожен рендер батька — новий за посиланням, тож <code>Row</code> вважається «зміненим», навіть якщо дані ті самі.</li>
      <li><code>style</code> — статичний об'єкт, тож просто виносимо його за межі компонента (module-level константа) — нуль ре-рендерів через нього.</li>
      <li>Замість створення нової функції-обгортки для кожного item на кожному рендері батька, передаємо стабільний <code>onSelectItem</code> і сирий <code>id</code> окремо; сам виклик <code>onSelect(id)</code> формується вже всередині <code>Row</code> — там це не проблема, бо ця функція не є пропом, який порівнює <code>memo</code>.</li>
      <li>Якщо сам <code>onSelectItem</code> нестабільний (створюється вище по дереву), його теж треба обгорнути в <code>useCallback</code> — інакше проблема просто переїде на рівень вище.</li>
    </ul>`,
  },
  {
    id: 'react-stale-closure-interval',
    title: 'Застарілий closure в setInterval',
    level: 'Senior',
    topic: 'React',
    tags: ['useEffect', 'useRef', 'stale closure'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>Ticker</code> має рахувати секунди, але лічильник застряє на <code>1</code> й далі не росте.</p>
      <p><strong>Завдання:</strong> полагодь так, щоб <code>count</code> коректно інкрементувався щосекунди, а <code>setInterval</code> ставився <strong>один раз</strong> (без перезапуску ефекту на кожен рендер).</p>`,
    starterCode: `import { useEffect, useState } from 'react';

function Ticker() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // TODO: тут count завжди 0 (застарілий closure) — лічильник "застряг" на 1
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []); // навмисно порожній масив — інтервал ставиться один раз

  return <p>Count: {count}</p>;
}`,
    solution: `useEffect(() => {
  const id = setInterval(() => {
    setCount((c) => c + 1); // функціональне оновлення — не залежить від застарілого closure
  }, 1000);

  return () => clearInterval(id);
}, []);`,
    explanation: `<ul class="list">
      <li>Ефект (і, відповідно, <code>setInterval</code>) запускається лише один раз через <code>[]</code>, тож колбек назавжди «замкнутий» на значення <code>count</code> зі свого першого виклику — <code>0</code>.</li>
      <li><code>setCount(count + 1)</code> щоразу рахує <code>0 + 1</code> — тому лічильник показує сталу <code>1</code>.</li>
      <li>Функціональна форма <code>setCount(c =&gt; c + 1)</code> не читає зовнішню змінну — React сам передає актуальне значення, тож застарілий closure більше не заважає.</li>
      <li>Для складніших випадків (коли інтервалу потрібні кілька «свіжих» значень або функцій) типовий патерн — тримати актуальний колбек у <code>useRef</code> і викликати <code>ref.current()</code> всередині <code>setInterval</code>.</li>
    </ul>`,
  },
  {
    id: 'react-use-debounced-value',
    title: 'Кастомний хук useDebouncedValue',
    level: 'Middle',
    topic: 'React',
    tags: ['custom hook', 'useEffect', 'debounce'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> реалізуй хук <code>useDebouncedValue(value, delay)</code>, який повертає значення, що оновлюється лише через <code>delay</code> мс <strong>після</strong> того, як <code>value</code> перестав змінюватись (наприклад, для поля пошуку — не смикати API на кожне натискання клавіші).</p>`,
    starterCode: `import { useEffect, useState } from 'react';

function useDebouncedValue<T>(value: T, delay: number): T {
  // TODO: поверни значення, яке оновлюється лише через \`delay\` мс
  // після того, як \`value\` перестав змінюватись.
  return value;
}

// Приклад використання:
// const debouncedQuery = useDebouncedValue(query, 300);
// useEffect(() => { searchApi(debouncedQuery); }, [debouncedQuery]);`,
    solution: `function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // скидаємо попередній таймер при новій зміні value
  }, [value, delay]);

  return debounced;
}`,
    explanation: `<ul class="list">
      <li>Внутрішній стан <code>debounced</code> оновлюється не одразу, а лише через <code>setTimeout</code>.</li>
      <li>Кожна зміна <code>value</code> (чи <code>delay</code>) перезапускає ефект; cleanup-функція скасовує попередній таймер — саме в цьому суть debounce.</li>
      <li>При розмонтуванні компонента cleanup теж спрацює й прибере «висячий» таймер — витоку немає.</li>
      <li>Відрізняється від <code>debounce()</code> із секції JS/TS: там дебaунсили <em>виклик функції</em>; тут — <em>значення, що рендериться</em>, через власний React-хук.</li>
    </ul>`,
  },
  {
    id: 'react-stale-response-race',
    title: 'Race condition при зміні id (застаріла відповідь)',
    level: 'Senior',
    topic: 'React',
    tags: ['useEffect', 'race condition', 'cleanup'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>UserCard</code> отримує <code>userId</code> і завантажує користувача. При швидкій зміні <code>userId</code> (наприклад, клацання по списку) повільніша відповідь на СТАРИЙ запит може прийти пізніше і затерти дані вже нового користувача.</p>
      <p><strong>Завдання:</strong> полагодь так, щоб застосовувалась лише відповідь, що відповідає <strong>останньому</strong> запитаному <code>userId</code>.</p>`,
    starterCode: `import { useEffect, useState } from 'react';

interface User { id: number; name: string; }

declare function fetchUserById(id: number): Promise<User>; // затримка різна для різних id, не контролюється

function UserCard({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: якщо userId змінюється швидко, стара (повільніша) відповідь
    // може прийти пізніше і затерти дані вже нового користувача.
    fetchUserById(userId).then((data) => setUser(data));
  }, [userId]);

  if (!user) return <p>Завантаження…</p>;
  return <p>{user.name}</p>;
}`,
    solution: `function UserCard({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let ignore = false;
    setUser(null); // скидаємо, поки чекаємо новий запит

    fetchUserById(userId).then((data) => {
      if (!ignore) setUser(data); // застосовуємо лише якщо цей запит все ще актуальний
    });

    return () => {
      ignore = true; // при зміні userId (або unmount) позначаємо цей запит застарілим
    };
  }, [userId]);

  if (!user) return <p>Завантаження…</p>;
  return <p>{user.name}</p>;
}`,
    explanation: `<ul class="list">
      <li>Cleanup-функція <code>useEffect</code> виконується перед <strong>кожним</strong> повторним запуском ефекту (не лише при unmount) — саме там позначаємо попередній запит застарілим.</li>
      <li>Прапорець <code>ignore</code> — найпростіший спосіб захисту; для реальних HTTP-запитів варто ще й скасовувати сам fetch через <code>AbortController</code>, щоб не витрачати мережу даремно (React-стан і без цього вже в безпеці).</li>
      <li>Відрізняється від <code>react-fetch-user-retry</code>: там <code>cancelled</code>-прапорець захищав від <code>setState</code> після unmount під час <em>ретраїв одного запиту</em>; тут — від застосування <em>застарілої відповіді</em>, коли сам <code>userId</code> вже змінився кілька разів поспіль.</li>
    </ul>`,
  },
  // ─────────────────────────── Angular ───────────────────────────
  {
    id: 'angular-onpush-not-updating',
    title: 'OnPush не бачить зміни',
    level: 'Senior',
    topic: 'Angular',
    tags: ['ChangeDetectionStrategy', 'OnPush', 'immutability'],
    prompt: `<p><strong>Проблема:</strong> <code>TodoListComponent</code> з <code>ChangeDetectionStrategy.OnPush</code> не оновлюється, коли батько додає новий todo — новий елемент не з'являється на екрані.</p>
      <p><strong>Завдання:</strong> полагодь <code>addTodo()</code> так, щоб список оновлювався, <strong>не</strong> знімаючи <code>OnPush</code> з <code>TodoListComponent</code>.</p>`,
    starterCode: `import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface Todo { id: number; text: string; }

@Component({
  selector: 'app-todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <ul>
      <li *ngFor="let todo of todos">{{ todo.text }}</li>
    </ul>
  \`,
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
}

@Component({
  selector: 'app-todo-page',
  template: \`
    <app-todo-list [todos]="todos"></app-todo-list>
    <button (click)="addTodo()">Додати</button>
  \`,
})
export class TodoPageComponent {
  todos: Todo[] = [{ id: 1, text: 'Купити молоко' }];
  private nextId = 2;

  addTodo() {
    // TODO: новий todo не з'являється в списку — OnPush не бачить зміну
    this.todos.push({ id: this.nextId, text: \`Завдання \${this.nextId++}\` });
  }
}`,
    solution: `addTodo() {
  // імутабельне оновлення: новий масив, нове посилання
  this.todos = [...this.todos, { id: this.nextId, text: \`Завдання \${this.nextId++}\` }];
}`,
    explanation: `<ul class="list">
      <li><code>OnPush</code> перевіряє компонент лише коли змінюється <strong>посилання</strong> на <code>@Input()</code>-значення (або спрацьовує подія всередині самого компонента чи <code>async</code>-пайп). Мутація масиву через <code>push</code> не змінює посилання — <code>TodoListComponent</code> вважає, що <code>todos</code> ті самі, і CD пропускається.</li>
      <li>Імутабельне оновлення (<code>[...this.todos, newItem]</code>) створює новий масив з новим посиланням → Angular бачить зміну <code>@Input()</code>, і плановий CD-прохід підхоплює <code>TodoListComponent</code>.</li>
      <li>Альтернатива без зміни підходу до даних — інжектувати <code>ChangeDetectorRef</code> у <code>TodoListComponent</code> і викликати <code>markForCheck()</code> вручну, але це змушує батьківський компонент фактично знати про внутрішній CD дочірнього — імутабельність зазвичай простіший і чистіший варіант.</li>
    </ul>`,
  },
  {
    id: 'angular-subscription-leak',
    title: 'Витік підписки (memory leak)',
    level: 'Middle',
    topic: 'Angular',
    tags: ['Subscription', 'takeUntil', 'ngOnDestroy'],
    prompt: `<p><strong>Проблема:</strong> <code>UserBadgeComponent</code> підписується на довгоживучий <code>currentUser$</code> у <code>ngOnInit</code> і ніколи не відписується. Кожне створення/знищення компонента (наприклад, при навігації) додає нову підписку — витік пам'яті.</p>
      <p><strong>Завдання:</strong> полагодь так, щоб підписка коректно скасовувалась при знищенні компонента.</p>`,
    starterCode: `import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({ selector: 'app-user-badge', template: \`<span>{{ userName }}</span>\` })
export class UserBadgeComponent implements OnInit {
  userName = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    // TODO: підписка ніколи не скасовується — витік при кожному створенні компонента
    this.userService.currentUser$.subscribe((user) => {
      this.userName = user?.name ?? 'Гість';
    });
  }
}`,
    solution: `import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from './user.service';

@Component({ selector: 'app-user-badge', template: \`<span>{{ userName }}</span>\` })
export class UserBadgeComponent implements OnInit, OnDestroy {
  userName = '';
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.userName = user?.name ?? 'Гість';
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
    explanation: `<ul class="list">
      <li><code>currentUser$</code> — довгоживучий стрім (сервіс-singleton), він сам ніколи не завершується (<code>complete</code>), тож підписка живе, доки її явно не скасувати — на відміну від, наприклад, одноразового HTTP-запиту.</li>
      <li>Патерн <code>destroy$</code> + <code>takeUntil</code>: у <code>ngOnDestroy</code> емітимо в <code>destroy$</code>, і <code>takeUntil</code> автоматично відписує всі підписки, підключені через <code>.pipe(takeUntil(this.destroy$))</code> у цьому компоненті — не треба вручну зберігати кожну <code>Subscription</code>.</li>
      <li>Сучасна альтернатива (Angular 16+) — функція <code>takeUntilDestroyed()</code> з <code>@angular/core/rxjs-interop</code>, яка робить те саме без ручного <code>Subject</code>/<code>ngOnDestroy</code>.</li>
    </ul>`,
  },
  {
    id: 'angular-custom-validator',
    title: 'Кастомний валідатор реактивної форми',
    level: 'Middle',
    topic: 'Angular',
    tags: ['ReactiveForms', 'ValidatorFn', 'FormGroup'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>passwordsMatchValidator: ValidatorFn</code> для <code>FormGroup</code> з полями <code>password</code> і <code>confirmPassword</code>: якщо значення різні — помилка <code>passwordMismatch: true</code> на контролі <code>confirmPassword</code>; якщо однакові — помилка знімається (не чіпаючи інші можливі помилки цього контролу, наприклад <code>required</code>).</p>`,
    starterCode: `import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: реалізуй валідатор, який перевіряє, що password === confirmPassword.
export const passwordsMatchValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  return null;
};

// Використання:
// new FormGroup({
//   password: new FormControl(''),
//   confirmPassword: new FormControl(''),
// }, { validators: passwordsMatchValidator });`,
    solution: `export const passwordsMatchValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  if (!password || !confirmPassword) return null;

  const mismatch = password.value !== confirmPassword.value;

  const errors = { ...confirmPassword.errors };
  if (mismatch) {
    errors['passwordMismatch'] = true;
  } else {
    delete errors['passwordMismatch'];
  }
  confirmPassword.setErrors(Object.keys(errors).length ? errors : null);

  return mismatch ? { passwordMismatch: true } : null;
};`,
    explanation: `<ul class="list">
      <li><code>ValidatorFn</code> на рівні <code>FormGroup</code> отримує саму групу (не одне поле) — це дозволяє звіряти значення двох контролів між собою (cross-field validation).</li>
      <li>Валідатор має повертати <code>null</code>, коли все ок, і об'єкт <code>ValidationErrors</code> — коли ні; щоб помилка показувалась саме під полем <code>confirmPassword</code> (а не тільки на групі), її додатково виставляють через <code>confirmPassword.setErrors(...)</code>.</li>
      <li>Важливо не затерти інші можливі помилки контролу (наприклад, <code>Validators.required</code>) — тому <code>errors</code> збирають через spread наявних <code>confirmPassword.errors</code>, а не перезаписують напряму.</li>
      <li>У шаблоні: <code>*ngIf="form.get('confirmPassword')?.errors?.['passwordMismatch']"</code>.</li>
    </ul>`,
  },
  {
    id: 'angular-expression-changed-error',
    title: 'ExpressionChangedAfterItHasBeenCheckedError',
    level: 'Senior',
    topic: 'Angular',
    tags: ['ChangeDetection', 'lifecycle', 'ngAfterViewInit'],
    prompt: `<p><strong>Проблема:</strong> <code>WidgetComponent</code> рахує <code>isReady</code> у <code>ngAfterViewInit</code> і одразу отримує в dev-режимі <code>ExpressionChangedAfterItHasBeenCheckedError</code>.</p>
      <p><strong>Завдання:</strong> поясни причину помилки і полагодь код (достатньо одного коректного способу).</p>`,
    starterCode: `import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-widget',
  template: \`
    <div #box>Контент</div>
    <p>Готово: {{ isReady }}</p>
  \`,
})
export class WidgetComponent implements AfterViewInit {
  @ViewChild('box') box!: ElementRef<HTMLDivElement>;
  isReady = false;

  ngAfterViewInit() {
    // TODO: у dev-режимі кидає ExpressionChangedAfterItHasBeenCheckedError,
    // бо ми змінюємо стан, який уже "прочитаний" у поточному CD-циклі
    this.isReady = this.box.nativeElement.offsetHeight > 0;
  }
}`,
    solution: `ngAfterViewInit() {
  // відкладаємо зміну в мікротаску — вона потрапить у НАСТУПНИЙ CD-цикл
  Promise.resolve().then(() => {
    this.isReady = this.box.nativeElement.offsetHeight > 0;
  });
}

// Альтернатива — примусово перевірити компонент у тому ж циклі:
// constructor(private cdr: ChangeDetectorRef) {}
// ngAfterViewInit() {
//   this.isReady = this.box.nativeElement.offsetHeight > 0;
//   this.cdr.detectChanges();
// }`,
    explanation: `<ul class="list">
      <li><code>ngAfterViewInit</code> виконується вже <strong>після</strong> того, як Angular перевірив (CD) дерево компонентів у цьому проході. Синхронна зміна забайндженої в шаблоні властивості всередині нього розходиться зі значенням, яке CD щойно «затвердив».</li>
      <li>У dev-режимі Angular робить додатковий контрольний прохід і порівнює значення — розбіжність кидає <code>ExpressionChangedAfterItHasBeenCheckedError</code> (у production цієї помилки не буде, але сам дизайн лишається «неправильним», можливий 1-кадровий visual glitch).</li>
      <li><strong>Фікс 1 (мікротаска):</strong> відкласти зміну через <code>Promise.resolve().then(...)</code> (або <code>setTimeout(0)</code>) — вона відбудеться вже в наступному CD-циклі, без конфлікту з поточним.</li>
      <li><strong>Фікс 2 (детермінований):</strong> викликати <code>this.cdr.detectChanges()</code> одразу після зміни — примусово «дочистити» поточний компонент у тому ж проході, без відкладання.</li>
    </ul>`,
  },

  // ─────────────────────────── React Native ───────────────────────────
  {
    id: 'react-native-async-storage-hook',
    title: 'Типізований useAsyncStorage хук',
    level: 'Middle',
    topic: 'React Native',
    tags: ['AsyncStorage', 'useEffect', 'custom hook'],
    language: 'tsx',
    prompt: `<p><strong>Дано:</strong> AsyncStorage — асинхронний key-value store (аналог <code>localStorage</code> у React Native).</p>
      <p><strong>Завдання:</strong> реалізуй типізований хук <code>useAsyncStorage&lt;T&gt;(key: string, initialValue: T)</code>, який:</p>
      <ul class="list">
        <li>при монтуванні завантажує значення з AsyncStorage за <code>key</code> (JSON.parse), поки триває завантаження — повертає <code>loading: true</code>;</li>
        <li>якщо значення в сховищі немає — використовує <code>initialValue</code>;</li>
        <li>якщо <code>JSON.parse</code> впав (пошкоджені дані) — не кидає помилку назовні, а тихо повертається до <code>initialValue</code>;</li>
        <li>повертає <code>setValue</code>, яка одночасно оновлює React-стан <strong>і</strong> персистить нове значення (JSON.stringify) в AsyncStorage.</li>
      </ul>`,
    starterCode: `import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage<T>(key: string, initialValue: T) {
  // TODO:
  // 1. При монтуванні завантажити значення з AsyncStorage.getItem(key) і JSON.parse.
  //    Поки триває завантаження — loading: true.
  // 2. Якщо значення нема, або JSON.parse кидає помилку — використати initialValue.
  // 3. setValue: оновлює React-стан І пише в AsyncStorage.setItem(key, JSON.stringify(...)).

  return { value: initialValue, setValue: (v: T) => {}, loading: true };
}`,
    solution: `function useAsyncStorage<T>(key: string, initialValue: T) {
  const [value, setValueState] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (!cancelled && raw !== null) {
          setValueState(JSON.parse(raw) as T);
        }
      } catch {
        // пошкоджені дані в сховищі — тихо лишаємось на initialValue
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key]);

  const setValue = useCallback(
    (next: T) => {
      setValueState(next);
      AsyncStorage.setItem(key, JSON.stringify(next)).catch(() => {
        // best-effort персистентність — React-стан вже оновлено незалежно від диску
      });
    },
    [key],
  );

  return { value, setValue, loading };
}`,
    explanation: `<ul class="list">
      <li>Завантаження — в <code>useEffect</code> з <code>cancelled</code>-прапорцем (той самий патерн, що й для fetch-запитів) — захист від <code>setState</code> після розмонтування, якщо AsyncStorage.getItem ще не встиг відповісти.</li>
      <li><code>try/catch</code> навколо <code>JSON.parse</code> — пошкоджені/несумісні дані в сховищі (наприклад, після зміни формату між версіями застосунку) не повинні валити компонент, а мовчки відкочуються до <code>initialValue</code>.</li>
      <li><code>setValue</code> оновлює React-стан <strong>синхронно</strong>, а запис в AsyncStorage — асинхронний best-effort поруч: UI не чекає на диск, щоб відреагувати на зміну.</li>
      <li><code>useCallback</code> зі стабільною залежністю <code>[key]</code> — щоб <code>setValue</code> можна було безпечно передавати як пропс далі по дереву без зайвих ре-рендерів.</li>
    </ul>`,
  },
  {
    id: 'react-native-flatlist-rerender-fix',
    title: 'FlatList ре-рендерить усі рядки на кожен keystroke',
    level: 'Senior',
    topic: 'React Native',
    tags: ['FlatList', 'memo', 'useCallback', 'referential equality'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> екран показує <code>FlatList</code> з користувачами й поле пошуку над ним. При кожному натисканні клавіші в пошуку <strong>всі</strong> рядки списку ре-рендеряться — хоча сам список <code>users</code> не змінюється, змінюється лише незалежний <code>query</code>.</p>
      <p><strong>Завдання:</strong> знайди причину зайвих ре-рендерів рядків і виправ код (без зміни зовнішньої поведінки).</p>`,
    starterCode: `import { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';

interface User {
  id: string;
  name: string;
}

function UserListScreen({ users }: { users: User[] }) {
  const [query, setQuery] = useState('');

  const handlePress = (id: string) => {
    console.log('opened', id);
  };

  return (
    <View>
      <TextInput value={query} onChangeText={setQuery} placeholder="Пошук…" />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

// TODO: чому Pressable/Text у кожному рядку ре-рендериться при зміні query,
// хоча users і сам рядок не залежать від query? Виправ.`,
    solution: `import { useState, useCallback, memo } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';

interface User {
  id: string;
  name: string;
}

const Row = memo(function Row({ item, onPress }: { item: User; onPress: (id: string) => void }) {
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.name}</Text>
    </Pressable>
  );
});

function UserListScreen({ users }: { users: User[] }) {
  const [query, setQuery] = useState('');

  const handlePress = useCallback((id: string) => {
    console.log('opened', id);
  }, []);

  return (
    <View>
      <TextInput value={query} onChangeText={setQuery} placeholder="Пошук…" />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Row item={item} onPress={handlePress} />}
      />
    </View>
  );
}`,
    explanation: `<ul class="list">
      <li>Кожен рендер <code>UserListScreen</code> (а <code>setQuery</code> викликає саме його) створює <strong>новий</strong> inline-<code>renderItem</code> і новий inline <code>handlePress</code> — React Native не знає, що "логічно" це той самий рядок, бачить лише нові референси пропсів.</li>
      <li>Вихід рядка в окремий компонент <code>Row</code>, обгорнутий у <code>memo</code>, сам по собі <strong>не рятує</strong>, поки <code>onPress</code> — новий inline-колбек на кожен рендер батька: <code>memo</code> порівнює пропси поверхнево, а новий референс функції завжди "інший".</li>
      <li><code>useCallback(..., [])</code> для <code>handlePress</code> стабілізує референс між рендерами <code>UserListScreen</code> — тепер <code>memo</code> на <code>Row</code> справді бачить однакові пропси при незмінних <code>item</code>/<code>onPress</code> і пропускає ре-рендер.</li>
      <li><code>keyExtractor</code> додано явно — без нього FlatList падає назад на індекс масиву як ключ, що ламає reconciliation при сортуванні/фільтрації списку (тут не було в оригіналі — це супутній баг того ж класу).</li>
    </ul>`,
  },
  {
    id: 'react-native-appstate-polling-pause',
    title: 'Пауза поллінгу коли застосунок у фоні',
    level: 'Senior',
    topic: 'React Native',
    tags: ['AppState', 'useEffect', 'setInterval', 'cleanup'],
    language: 'tsx',
    prompt: `<p><strong>Дано:</strong> функція <code>fetchStatus()</code> — емулює запит статусу на бекенд (Promise).</p>
      <p><strong>Завдання:</strong> реалізуй хук <code>useStatusPolling(intervalMs: number)</code>, який:</p>
      <ul class="list">
        <li>поки застосунок <strong>активний</strong> (foreground) — викликає <code>fetchStatus()</code> кожні <code>intervalMs</code> мілісекунд і зберігає останній результат у стані;</li>
        <li>коли застосунок іде <strong>у фон</strong> (background/inactive) — зупиняє поллінг (без зайвих мережевих запитів, поки користувач не дивиться на екран);</li>
        <li>коли застосунок <strong>повертається</strong> на передній план — відновлює поллінг (одразу робить один запит, а не чекає повний інтервал);</li>
        <li>коректно чистить таймер і підписку на <code>AppState</code> при розмонтуванні.</li>
      </ul>`,
    starterCode: `import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

function useStatusPolling(intervalMs: number) {
  const [status, setStatus] = useState<string | null>(null);

  // TODO:
  // 1. Поки застосунок active — setInterval(fetchStatus, intervalMs), зберігати результат.
  // 2. AppState.addEventListener('change', ...) — на перехід у background/inactive зупиняти таймер.
  // 3. На повернення в active — одразу зробити один запит і відновити таймер.
  // 4. Прибрати і таймер, і підписку в cleanup.

  return status;
}

// Задана функція — не змінювати.
declare function fetchStatus(): Promise<string>;`,
    solution: `function useStatusPolling(intervalMs: number) {
  const [status, setStatus] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const poll = () => {
      fetchStatus().then(setStatus).catch(() => {});
    };

    const startPolling = () => {
      if (intervalRef.current) return; // вже йде
      poll(); // одразу один запит при (по)відновленні
      intervalRef.current = setInterval(poll, intervalMs);
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (AppState.currentState === 'active') startPolling();

    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        startPolling();
      } else {
        stopPolling();
      }
    });

    return () => {
      stopPolling();
      subscription.remove();
    };
  }, [intervalMs]);

  return status;
}`,
    explanation: `<ul class="list">
      <li><code>AppState.addEventListener('change', ...)</code> — RN-специфічний API без прямого web-аналога: браузерна вкладка не має поняття "згорнутий на іншому додатку", а мобільний застосунок постійно переходить active/background/inactive.</li>
      <li>Таймер зберігається в <code>useRef</code>, а не в стані — зміна таймера не повинна викликати ре-рендер; <code>intervalRef.current</code> також слугує "прапорцем", чи поллінг уже йде (захист від подвійного <code>setInterval</code> при кількох підряд <code>active</code>-подіях).</li>
      <li>При поверненні в <code>active</code> — одразу один запит <em>плюс</em> перезапуск таймера, а не чекання повного <code>intervalMs</code>: користувач очікує свіжі дані одразу після повернення в застосунок, а не через довільну затримку.</li>
      <li>Cleanup прибирає <strong>і</strong> таймер (<code>clearInterval</code>), <strong>і</strong> підписку (<code>subscription.remove()</code>) — пропуск будь-якого з двох лишає активний поллінг чи orphan-listener після розмонтування компонента.</li>
    </ul>`,
  },
]
