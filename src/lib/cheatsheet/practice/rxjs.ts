import type { PracticeTask } from '../types'

// RxJS / Angular-flavoured stream exercises.
export const rxjsTasks: PracticeTask[] = [
  {
    id: 'promise-to-observable',
    title: 'Promise → Observable (tap + catchError)',
    level: 'Senior',
    topic: 'RxJS',
    priority: 'mid',
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
    priority: 'high',
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
    title: 'Retry із експоненційним backoff (RxJS)',
    level: 'Senior',
    topic: 'RxJS',
    priority: 'high',
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
    priority: 'mid',
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
]
