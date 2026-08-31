# Lifecycle Hooks (Angular)

> Senior+ рівень. Пояснення українською, код і терміни англійською.

---

## 1. Що це

**Lifecycle hooks** — методи-хуки, які Angular викликає в певні моменти життя компонента/директиви: від створення, через оновлення, до знищення. Вони дають "точки входу", де можна виконати ініціалізацію, реагувати на зміни `@Input()`, працювати з DOM після рендеру і прибирати ресурси перед знищенням.

Кожен хук має інтерфейс (`OnInit`, `OnDestroy` тощо) — імплементувати його не обов'язково, але це best practice (типобезпека + читабельність).

> 🎯 Ключова фраза: hooks — це впорядкована послідовність колбеків, прив'язана до change detection; більшість викликаються **під час CD-циклу**, тому важливо знати їх порядок і що можна робити в кожному.

---

## 2. Повний порядок виконання (must-know)

```
constructor  (не хук, але перший)
      ↓
ngOnChanges       ← перед ngOnInit + при кожній зміні @Input()
      ↓
ngOnInit          ← раз, після першого ngOnChanges
      ↓
ngDoCheck         ← кожен CD-цикл (custom change detection)
      ↓
ngAfterContentInit    ← раз, після проекції контенту (<ng-content>)
      ↓
ngAfterContentChecked ← кожен CD після перевірки контенту
      ↓
ngAfterViewInit       ← раз, після ініціалізації view + дочірніх view
      ↓
ngAfterViewChecked    ← кожен CD після перевірки view
      ↓
        ... (компонент живе, цикли повторюються) ...
      ↓
ngOnDestroy       ← раз, перед знищенням
```

> ⚠️ Це топ-питання: знати **точний порядок** і які викликаються **раз**, а які **щоцикл**.

---

## 3. Хуки детально

### `constructor` (не lifecycle hook)
Викликається при створенні класу. Тут — **лише DI (dependency injection)**, не логіка.
```ts
constructor(private http: HttpClient) {}  // тільки інжект залежностей
```
> ⚠️ У constructor `@Input()` ще **не доступні** (undefined). Ініціалізацію, що залежить від inputs → в `ngOnInit`.

### `ngOnChanges(changes: SimpleChanges)`
Викликається **перед** `ngOnInit` і **при кожній зміні `@Input()`**. Отримує об'єкт із попереднім/поточним значенням.
```ts
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    console.log(changes['userId'].previousValue, changes['userId'].currentValue);
    this.loadUser(changes['userId'].currentValue);
  }
}
```
> 💡 Тільки для `@Input()`. Спрацьовує на зміну **reference** (для об'єктів — мутація не тригерить, як і в OnPush).

### `ngOnInit()`
Викликається **раз**, після першого `ngOnChanges`. Тут — **основна ініціалізація**: HTTP-запити, підписки, налаштування.
```ts
ngOnInit() {
  this.user$ = this.api.getUser(this.userId);  // inputs вже доступні
}
```
> 🎯 Чому не в constructor: у ngOnInit `@Input()` уже встановлені, компонент "готовий". Constructor — для DI, ngOnInit — для логіки.

### `ngDoCheck()`
Викликається на **кожен** CD-цикл. Custom change detection — коли треба зловити зміни, які Angular не бачить автоматично (напр. мутація об'єкта при OnPush).
```ts
ngDoCheck() {
  if (this.item.name !== this.prevName) {  // ручна перевірка мутації
    this.prevName = this.item.name;
    this.recompute();
  }
}
```
> ⚠️ **Дорогий** — викликається дуже часто. Тримай легким, інакше вб'єш перф. Здебільшого не потрібен; альтернатива — immutable + OnPush.

### `ngAfterContentInit()` / `ngAfterContentChecked()`
Пов'язані з **проекцією контенту** (`<ng-content>`) — коли батько передає розмітку в дитину.
- `AfterContentInit` — раз, коли спроектований контент ініціалізовано.
- `AfterContentChecked` — щоцикл після його перевірки.
- Тут доступні `@ContentChild`/`@ContentChildren`.

### `ngAfterViewInit()` / `ngAfterViewChecked()`
Пов'язані з **власним view** компонента і дочірніми компонентами.
- `AfterViewInit` — раз, після ініціалізації view. Тут доступні `@ViewChild`/`@ViewChildren` і **можна працювати з DOM**.
- `AfterViewChecked` — щоцикл після перевірки view.
```ts
@ViewChild('canvas') canvas!: ElementRef;
ngAfterViewInit() {
  const ctx = this.canvas.nativeElement.getContext('2d');  // DOM готовий
}
```
> ⚠️ **Топ-пастка:** зміна binding у `ngAfterViewInit` → `ExpressionChangedAfterItHasBeenCheckedError` (у dev). Бо CD вже перевірив view, а ти міняєш стан. Фікс: `setTimeout`, `Promise.resolve().then()`, або `cdr.detectChanges()`.

### `ngOnDestroy()`
Викликається **раз**, перед знищенням компонента. Тут — **прибирання ресурсів**:
```ts
ngOnDestroy() {
  this.destroy$.next();       // завершити RxJS-підписки
  this.destroy$.complete();
  clearInterval(this.timer);  // очистити таймери
  window.removeEventListener('resize', this.handler);  // зняти listeners
}
```
> 🎯 Критично для уникнення **memory leaks** — незакриті підписки/таймери/listeners тримають компонент живим.

---

## 4. Init vs Checked — ключова різниця

- **`...Init`** хуки (`ngAfterContentInit`, `ngAfterViewInit`) — викликаються **один раз** після першої ініціалізації.
- **`...Checked`** хуки (`ngAfterContentChecked`, `ngAfterViewChecked`) — викликаються **щоцикл** CD після перевірки.

Тому важку логіку клади в `...Init` (раз), а не в `...Checked` (щоразу — перф-ризик).

---

## 5. Раз vs щоцикл (швидкий референс)

| Хук | Частота |
|---|---|
| `ngOnChanges` | при кожній зміні @Input (+ перед init) |
| `ngOnInit` | **раз** |
| `ngDoCheck` | **щоцикл** |
| `ngAfterContentInit` | **раз** |
| `ngAfterContentChecked` | **щоцикл** |
| `ngAfterViewInit` | **раз** |
| `ngAfterViewChecked` | **щоцикл** |
| `ngOnDestroy` | **раз** |

---

## 6. Практичні правила (де що робити)

| Задача | Хук |
|---|---|
| DI (інжект сервісів) | `constructor` |
| Ініціалізація, HTTP, підписки | `ngOnInit` |
| Реакція на зміну `@Input()` | `ngOnChanges` |
| Робота з DOM / `@ViewChild` | `ngAfterViewInit` |
| Робота зі спроектованим контентом / `@ContentChild` | `ngAfterContentInit` |
| Прибирання (unsubscribe, timers, listeners) | `ngOnDestroy` |
| Custom change detection (рідко) | `ngDoCheck` |

---

## 7. Сучасні альтернативи (Angular 16+, актуально)

### `takeUntilDestroyed()` замість ручного ngOnDestroy
```ts
// Замість destroy$ + ngOnDestroy:
this.data$.pipe(takeUntilDestroyed()).subscribe(...);
// або з DestroyRef поза injection context:
constructor(private destroyRef: DestroyRef) {}
this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(...);
```

### `afterNextRender` / `afterRender` (16+)
Нові хуки для роботи з DOM, безпечні для SSR (виконуються лише в браузері, не на сервері) — часткова заміна `ngAfterViewInit` для DOM-логіки.

### Signals зменшують потребу в хуках
З signal-based підходом багато логіки (derived state, реакція на зміни) робиться через `computed`/`effect` замість `ngOnChanges`/`ngDoCheck`.
```ts
userId = input<string>();           // signal input
user = computed(() => this.load(this.userId()));  // авто-реакція без ngOnChanges
```

---

## 8. Пастки

- **Логіка в constructor замість ngOnInit** → `@Input()` ще undefined.
- **HTTP/підписки без cleanup** → memory leak (потрібен `ngOnDestroy` / `takeUntilDestroyed`).
- **Зміна стану в `ngAfterViewInit`** → `ExpressionChangedAfterItHasBeenCheckedError`.
- **Важка логіка в `...Checked`/`ngDoCheck`** → перф-проблеми (викликаються щоцикл).
- **`ngOnChanges` при мутації об'єкта** → не спрацює (потрібна нова reference).
- **Робота з `@ViewChild` у `ngOnInit`** → ще недоступний (тільки з `ngAfterViewInit`).
- **Забути про SSR** → DOM-код у `ngAfterViewInit` падає на сервері; використовуй `afterNextRender` або перевірку платформи.

---

## ✅ Чеклист "знаю тему на Senior"

- [ ] Порядок: constructor → ngOnChanges → ngOnInit → ngDoCheck → AfterContentInit/Checked → AfterViewInit/Checked → ngOnDestroy
- [ ] constructor = тільки DI; inputs недоступні
- [ ] ngOnInit = основна ініціалізація (inputs готові)
- [ ] ngOnChanges = реакція на @Input (reference-based)
- [ ] ngAfterViewInit = DOM / @ViewChild
- [ ] ngAfterContentInit = @ContentChild / проекція
- [ ] ngOnDestroy = cleanup (leaks!)
- [ ] Init (раз) vs Checked (щоцикл)
- [ ] ExpressionChangedError при зміні стану після CD-перевірки
- [ ] ngDoCheck дорогий, тримати легким
- [ ] Сучасне: takeUntilDestroyed, afterNextRender, signals замість частини хуків
- [ ] Пастки: constructor vs ngOnInit, ViewChild timing, SSR
