# RxJS (Angular)

> Senior+ рівень. Пояснення українською, код і терміни англійською.

---

## 1. Що це і навіщо

**RxJS** (Reactive Extensions for JavaScript) — бібліотека для роботи з **асинхронними потоками даних** через патерн **Observable**. Замість того щоб думати про одиничні значення (Promise = одне значення в майбутньому), RxJS оперує **потоками** — послідовністю значень у часі, які можна трансформувати, комбінувати й фільтрувати декларативно.

Angular використовує RxJS **всюди**: `HttpClient`, `Router`, `Reactive Forms`, `EventEmitter`, `async` pipe. Тому для Angular-розробника це не опція, а фундамент.

> 🎯 Ключова фраза: Observable — це **lazy push-based collection** значень у часі. "Lazy" (нічого не робить без підписки), "push" (джерело саме проштовхує значення підписнику).

---

## 2. Observable vs Promise (must-know)

| | Promise | Observable |
|---|---|---|
| К-сть значень | **одне** | **0..∞** (потік) |
| Lazy/eager | eager (виконується одразу) | **lazy** (лише при subscribe) |
| Скасування | ❌ не можна | ✅ `unsubscribe()` |
| Оператори | .then/.catch | 100+ операторів (map, filter, ...) |
| Retry/повтор | вручну | вбудовано (`retry`, `retryWhen`) |
| Синхр/асинхр | завжди async | може бути обидва |

```ts
// Promise — одне значення, eager
const p = fetch('/api');  // вже пішов запит

// Observable — lazy, нічого не станеться без subscribe
const obs$ = this.http.get('/api');  // запиту ЩЕ немає
obs$.subscribe(data => console.log(data));  // ТЕПЕР пішов
```

> 💡 Топ-питання: "Різниця Promise vs Observable?" → одне vs багато значень, eager vs lazy, скасовуваність, оператори.

---

## 3. Ключові поняття

- **Observable** — джерело потоку (producer).
- **Observer** — споживач: `{ next, error, complete }`.
- **Subscription** — зв'язок; `unsubscribe()` розриває його.
- **Operator** — чиста функція, що трансформує Observable в новий.
- **Subject** — Observable + Observer одночасно (можна і слухати, і пушити).

```ts
const sub = source$.subscribe({
  next: (val) => console.log(val),   // кожне значення
  error: (err) => console.error(err),// помилка (термінує потік)
  complete: () => console.log('done'),// завершення (термінує потік)
});
sub.unsubscribe();  // припинити слухати
```

> ⚠️ Потік термінується назавжди після `error` або `complete`. Далі значень не буде.

---

## 4. Створення Observables

```ts
of(1, 2, 3);                    // синхронно емітить значення
from([1, 2, 3]);                // з масиву/Promise/iterable
fromEvent(button, 'click');     // з DOM-подій
interval(1000);                 // кожну секунду: 0,1,2...
timer(2000);                    // раз через 2с
throwError(() => new Error());  // потік з помилкою
EMPTY;                          // одразу complete без значень
```

---

## 5. Оператори — категорії (треба знати основні)

### 5.1 Transformation
```ts
map(x => x * 2)          // трансформувати кожне значення
scan((acc, x) => acc + x, 0)  // як reduce, але емітить проміжні (акумулятор)
```

### 5.2 Filtering
```ts
filter(x => x > 5)       // пропустити ті, що не проходять
take(3)                  // перші 3 і complete
takeUntil(destroy$)      // поки не емітить destroy$ (для unsubscribe-патерну)
debounceTime(300)        // ігнорувати, поки не буде паузи 300мс (search-as-you-type)
distinctUntilChanged()   // пропустити повтори підряд
first() / last()
```

### 5.3 Flattening (higher-order — НАЙВАЖЛИВІШЕ)
Коли значення сам породжує Observable (напр. кожен клік → HTTP-запит). Як "розплющити" Observable of Observables:

| Оператор | Стратегія | Коли |
|---|---|---|
| **switchMap** | скасувати попередній, взяти новий | **search/autocomplete** (актуальний лише останній) |
| **mergeMap** | усі паралельно | незалежні запити (не важить порядок) |
| **concatMap** | по черзі, зберігаючи порядок | послідовні операції (порядок важливий) |
| **exhaustMap** | ігнорувати нові, поки поточний не завершився | **submit-кнопка** (захист від подвійного кліку) |

```ts
// switchMap — класика autocomplete
searchInput$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.api.search(query))  // скасовує попередній запит
).subscribe(results => this.results = results);
```

> 🎯 Це топ-питання Angular-інтерв'ю: "різниця switchMap/mergeMap/concatMap/exhaustMap?" Знай кожен + коли який. switchMap для пошуку, exhaustMap для submit — канонічні приклади.

### 5.4 Combination
```ts
combineLatest([a$, b$])  // останні значення з кожного при будь-якій зміні
forkJoin([a$, b$])       // як Promise.all — чекає complete усіх, дає останні
merge(a$, b$)            // об'єднати потоки в один
zip(a$, b$)              // попарно за індексом
withLatestFrom(other$)   // взяти останнє з іншого при еміті основного
startWith(initial)       // почати з початкового значення
```

### 5.5 Error handling
```ts
catchError(err => of(fallback))       // перехопити, повернути fallback-потік
retry(3)                               // повторити N разів при помилці
retryWhen(...)                         // складніша логіка ретраю (backoff)
```

---

## 6. Memory leaks — головна пастка (критично)

Незакрита підписка = **memory leak**. Observable тримає посилання на колбек, який замикає компонент → компонент не збирається GC.

### Способи уникнути (від найкращого):

**1. `async` pipe (найкращий — авто-unsubscribe)**
```html
<div>{{ data$ | async }}</div>
<!-- Angular сам підписується і відписується при знищенні компонента -->
```

**2. `takeUntilDestroyed()` (Angular 16+)**
```ts
data$.pipe(takeUntilDestroyed()).subscribe(...);
// авто-unsubscribe при знищенні (використовує DestroyRef)
```

**3. `takeUntil(destroy$)` (класичний до v16)**
```ts
private destroy$ = new Subject<void>();

ngOnInit() {
  this.data$.pipe(takeUntil(this.destroy$)).subscribe(...);
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

**4. Ручний `unsubscribe()`** — найгірше (легко забути, багатослівно).

> 💡 Правило: **надавай перевагу `async` pipe** — він декларативний і не тече. Ручні підписки — лише коли треба імперативна логіка, і тоді обов'язково `takeUntilDestroyed`/`takeUntil`.

---

## 7. Subjects (сімейство)

`Subject` — і Observable, і Observer. Використовується для мультикастингу і ручного пушингу значень.

| Тип | Поведінка |
|---|---|
| **Subject** | без початкового значення; нові підписники бачать лише майбутні еміти |
| **BehaviorSubject** | тримає **поточне** значення; новий підписник одразу отримує останнє. Потрібне початкове |
| **ReplaySubject** | реплеїть N останніх значень новим підписникам |
| **AsyncSubject** | емітить лише останнє значення при complete |

```ts
// BehaviorSubject — найчастіший для стану (state)
private state$ = new BehaviorSubject<User | null>(null);
readonly user$ = this.state$.asObservable();  // тільки для читання ззовні

setUser(u: User) { this.state$.next(u); }  // пуш нового значення
get current() { return this.state$.value; } // синхронний доступ до поточного
```

> 🎯 `BehaviorSubject` — основа простих state-сервісів у Angular (те, на чому будуються Akita/elf під капотом).

---

## 8. Hot vs Cold Observables (складніше питання)

- **Cold** — продюсер створюється **на кожну підписку**; кожен підписник отримує власне виконання (напр. `http.get` — окремий запит на кожен subscribe).
- **Hot** — продюсер спільний; підписники ділять один потік (напр. `fromEvent`, `Subject`).

```ts
// Cold — 2 підписки = 2 HTTP-запити
const cold$ = this.http.get('/api');
cold$.subscribe(); cold$.subscribe();  // ДВА запити!

// Зробити hot/shared — share/shareReplay
const shared$ = this.http.get('/api').pipe(shareReplay(1));
shared$.subscribe(); shared$.subscribe();  // ОДИН запит, результат розшарено
```

> 💡 `shareReplay(1)` — часто для кешування HTTP-результату між кількома підписниками.

---

## 9. Практичні патерни в Angular

### 9.1 Autocomplete (канонічний)
```ts
this.results$ = this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(q => this.api.search(q)),
);
// у шаблоні: *ngFor="let r of results$ | async"
```

### 9.2 Комбінування залежних запитів
```ts
this.data$ = this.route.params.pipe(
  switchMap(({ id }) => this.api.getUser(id)),
  switchMap(user => this.api.getPosts(user.id)),
);
```

### 9.3 Паралельні запити
```ts
forkJoin({
  user: this.api.getUser(id),
  settings: this.api.getSettings(id),
}).subscribe(({ user, settings }) => { ... });
```

### 9.4 Похідний стан
```ts
this.total$ = combineLatest([this.items$, this.taxRate$]).pipe(
  map(([items, tax]) => calc(items, tax))
);
```

---

## 10. Пастки

- **Nested subscribe** (subscribe усередині subscribe) → антипатерн; використовуй `switchMap`/`concatMap`.
  ```ts
  // ❌ погано
  a$.subscribe(a => b$.subscribe(b => ...));
  // ✅ добре
  a$.pipe(switchMap(a => b$)).subscribe(...);
  ```
- **Забута unsubscribe** → memory leak (розділ 6).
- **Cold observable = дубльовані HTTP** без `shareReplay`.
- **Мутація значень у потоці** замість immutable-трансформацій.
- **`switchMap` там, де треба `concatMap`** → втрата запитів, які треба було зберегти (напр. послідовні save).
- **Побічні ефекти в `map`** замість `tap` — `map` для трансформації, `tap` для side-effects (логування).
- **Підписка заради присвоєння** замість `async` pipe → зайвий imperative-код і ризик leak.

---

## 11. RxJS vs Signals (Angular 16+, актуальний контекст)

Angular додав **Signals** — простіший примітив для **синхронного стану**. Це не заміна RxJS, а доповнення:

- **Signals** — синхронний стан UI (лічильники, форми, derived-значення), fine-grained reactivity, без підписок/leaks.
- **RxJS** — асинхронні потоки/події в часі (HTTP, debounce, комбінування, скасування, складна оркестрація).

Інтероп: `toSignal(obs$)` і `toObservable(signal)` — мости між світами.

> 🎯 Сучасна відповідь: "Signals для синхронного стану, RxJS для async-потоків і складної оркестрації подій. Вони співіснують, є офіційний інтероп."

---

## ✅ Чеклист "знаю тему на Senior"

- [ ] Observable = lazy push-based потік значень у часі
- [ ] Observable vs Promise (одне/багато, eager/lazy, cancel, оператори)
- [ ] Observer (next/error/complete), Subscription, unsubscribe
- [ ] Створення: of/from/fromEvent/interval/timer
- [ ] Flattening: switchMap/mergeMap/concatMap/exhaustMap — коли який
- [ ] Filtering: debounceTime/distinctUntilChanged/takeUntil
- [ ] Combination: combineLatest/forkJoin/merge/zip
- [ ] Error: catchError/retry
- [ ] Memory leaks: async pipe > takeUntilDestroyed > takeUntil > manual
- [ ] Subjects: Subject/BehaviorSubject/ReplaySubject/AsyncSubject
- [ ] Hot vs Cold + shareReplay
- [ ] Патерни: autocomplete (switchMap), forkJoin, derived state
- [ ] Пастки: nested subscribe, leak, cold-дублі, map vs tap
- [ ] RxJS vs Signals + інтероп (toSignal/toObservable)
