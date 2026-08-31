# Content Projection & ViewChild (Angular)

> Senior+ рівень. Пояснення українською, код і терміни англійською.

---

## Частина 1 — Content Projection

## 1. Що це

**Content Projection** — механізм, що дозволяє компоненту приймати **розмітку ззовні** (від батька) і вставляти її у визначені місця свого шаблону через `<ng-content>`. Це Angular-аналог **`children`** у React або "slots" у Web Components/Vue.

Навіщо: створювати **гнучкі, переюзабельні** компоненти-обгортки (Card, Modal, Panel), де вміст задає споживач, а компонент керує структурою/стилями.

```ts
// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>   <!-- сюди вставиться контент ззовні -->
    </div>
  `,
})
export class CardComponent {}
```
```html
<!-- використання -->
<app-card>
  <h2>Title</h2>       <!-- цей контент спроектується в <ng-content> -->
  <p>Body text</p>
</app-card>
```

> 🎯 Ключова фраза: content projection = передача розмітки від батька в дитину через `<ng-content>`; аналог `children` у React.

---

## 2. Single-slot projection

Один `<ng-content>` без атрибутів — приймає **весь** переданий контент.

```html
<ng-content></ng-content>
```

---

## 3. Multi-slot projection (`select`)

Кілька `<ng-content>` з атрибутом `select` — розкладають контент по слотах за CSS-селектором:

```ts
@Component({
  selector: 'app-panel',
  template: `
    <header><ng-content select="[panel-title]"></ng-content></header>
    <main><ng-content select=".panel-body"></ng-content></main>
    <footer><ng-content></ng-content></footer>  <!-- решта (default slot) -->
  `,
})
export class PanelComponent {}
```
```html
<app-panel>
  <h1 panel-title>Header</h1>       <!-- → header slot (за атрибутом) -->
  <div class="panel-body">Body</div> <!-- → main slot (за класом) -->
  <button>OK</button>                 <!-- → footer (default, без select) -->
</app-panel>
```

`select` приймає будь-який CSS-селектор: атрибут `[attr]`, клас `.class`, тег `tagname`, компонент `app-x`.

> ⚠️ `<ng-content>` без `select` — це "catch-all" для контенту, що не підійшов під інші слоти. Один default-slot на компонент.

---

## 4. Ключова властивість: проектований контент належить БАТЬКУ

Це найважливіший концепт для інтерв'ю. Спроектований контент:
- **Створюється й керується батьком**, не дитиною.
- Прив'язки (`{{ }}`, `[prop]`) у ньому обчислюються в **контексті батька**, а не компонента-обгортки.
- Change detection для нього — частина батьківського дерева.

```html
<!-- parentValue належить батьку, не app-card -->
<app-card>{{ parentValue }}</app-card>
```

Тому в multi-slot компоненті ти не можеш "дотягтись" до внутрішніх змінних обгортки з проектованого контенту — він живе в scope батька.

---

## 5. `ngProjectAs` — проекція складних структур

Коли обгортаєш контент (напр. `<ng-container>`) і треба, щоб він потрапив у певний слот попри свій селектор:

```html
<ng-container ngProjectAs="[panel-title]">
  <h1>Dynamically projected as title</h1>
</ng-container>
```

---

## 6. Умовна проекція та перевірка наявності контенту

Щоб рендерити обгортку слота **лише якщо контент переданий** — трюк із `@ContentChild` або CSS `:empty`. Сучасніший підхід — перевіряти через `@ContentChild`/`contentChildren` (див. частину 2).

---

## Частина 2 — ViewChild / ContentChild

## 7. Чотири декоратори запитів (queries)

Angular дає **4 декоратори** для доступу до елементів/компонентів:

| Декоратор | Що дістає | Звідки |
|---|---|---|
| **`@ViewChild`** | один елемент/компонент | з **власного view** (шаблону компонента) |
| **`@ViewChildren`** | список (QueryList) | з власного view |
| **`@ContentChild`** | один елемент/компонент | зі **спроектованого контенту** (`<ng-content>`) |
| **`@ContentChildren`** | список (QueryList) | зі спроектованого контенту |

> 🎯 Ключова різниця: **View** = те, що в **моєму шаблоні**; **Content** = те, що **проектується ззовні** через ng-content. Це головне питання на розуміння.

---

## 8. `@ViewChild` — доступ до власного view

```ts
@Component({
  template: `
    <input #nameInput />
    <app-child></app-child>
  `,
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('nameInput') input!: ElementRef<HTMLInputElement>;  // за template ref
  @ViewChild(ChildComponent) child!: ChildComponent;             // за типом компонента

  ngAfterViewInit() {
    this.input.nativeElement.focus();  // DOM доступний ТУТ
    this.child.someMethod();            // виклик методу дочірнього компонента
  }
}
```

**Способи запиту:**
- Template reference variable: `@ViewChild('nameInput')`
- Тип компонента/директиви: `@ViewChild(ChildComponent)`
- Provider token / директива.

**Timing:** доступний у **`ngAfterViewInit`**, не раніше (в `ngOnInit` ще `undefined`).

---

## 9. `static` опція (важливий нюанс)

```ts
@ViewChild('ref', { static: true })  el!: ElementRef;   // доступний у ngOnInit
@ViewChild('ref', { static: false }) el!: ElementRef;   // доступний у ngAfterViewInit (дефолт)
```

- **`static: true`** — запит виконується **до** першого CD, доступний у `ngOnInit`. Працює лише для елементів, що **не** всередині `*ngIf`/`*ngFor` (статичних).
- **`static: false`** (дефолт) — після CD, доступний у `ngAfterViewInit`. Потрібен для динамічних (умовних) елементів.

> ⚠️ Часте питання. Дефолт `static: false` — безпечний для більшості випадків. `static: true` — лише коли елемент гарантовано статичний і потрібен рано.

---

## 10. `@ContentChild` — доступ до спроектованого контенту

```ts
@Component({
  selector: 'app-tabs',
  template: `<ng-content></ng-content>`,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    console.log(this.tabs.length);  // усі <app-tab>, проектовані ззовні
    this.tabs.first.activate();
  }
}
```
```html
<app-tabs>
  <app-tab>One</app-tab>
  <app-tab>Two</app-tab>  <!-- ці таби — projected content, ловляться @ContentChildren -->
</app-tabs>
```

**Timing:** доступний у **`ngAfterContentInit`** (не `ngAfterViewInit`).

> 💡 Це фундамент **compound component pattern** (Tabs/Tab, Accordion/Panel) — батько-обгортка керує колекцією проектованих дочірніх компонентів.

---

## 11. QueryList — динамічна колекція

`@ViewChildren`/`@ContentChildren` повертають **`QueryList`** — не звичайний масив, а реактивну колекцію:

```ts
@ViewChildren(ItemComponent) items!: QueryList<ItemComponent>;

ngAfterViewInit() {
  this.items.forEach(...);
  this.items.changes.subscribe(list => {  // реагує на додавання/видалення!
    console.log('items changed', list.length);
  });
}
```

- `.changes` — Observable, емітить при зміні колекції (напр. `*ngFor` додав елемент).
- `.first`, `.last`, `.length`, `.toArray()`, `.forEach()`.

> ⚠️ Не заміняй `QueryList` на масив — втратиш реактивність `.changes`.

---

## 12. Timing — зведена таблиця (критично)

| Запит | Доступний у |
|---|---|
| `@ViewChild` / `@ViewChildren` | **`ngAfterViewInit`** (або `ngOnInit` з `static: true`) |
| `@ContentChild` / `@ContentChildren` | **`ngAfterContentInit`** |

Логіка: спершу ініціалізується контент (`AfterContentInit`), потім view (`AfterViewInit`) — тому content-запити готові раніше.

---

## 13. Сучасний підхід — Signal Queries (Angular 17.2+)

Нові signal-based запити замінюють декоратори, доступні реактивно без timing-проблем:

```ts
// замість @ViewChild
input = viewChild<ElementRef>('nameInput');       // signal
items = viewChildren(ItemComponent);              // signal of array
tab = contentChild(TabComponent);
tabs = contentChildren(TabComponent);

// required-варіант (кидає, якщо не знайдено)
input = viewChild.required<ElementRef>('nameInput');

// використання — як signal:
effect(() => {
  const el = this.input();  // реактивно, без AfterViewInit
  el?.nativeElement.focus();
});
```

Переваги: реактивні (працюють у `computed`/`effect`), без залежності від хуків, типобезпечніші.

> 🎯 Сучасний сигнал: знати, що signal queries (`viewChild`, `contentChild`) — новий рекомендований спосіб, декоратори — legacy-стиль (досі валідний).

---

## 14. Пастки

- **Плутати View і Content** — `@ViewChild` не бачить проектований контент, `@ContentChild` не бачить власний шаблон. Головна помилка.
- **Доступ до `@ViewChild` у `ngOnInit`** → `undefined` (треба `ngAfterViewInit` або `static: true`).
- **Доступ до `@ContentChild` у `ngAfterViewInit`** замість `ngAfterContentInit` (працює, але концептуально пізно; для init-логіки — content-хук).
- **Зміна стану через ViewChild після CD** → `ExpressionChangedAfterItHasBeenCheckedError`.
- **QueryList → масив** → втрата `.changes`-реактивності.
- **Прямий DOM-доступ через `nativeElement`** — уникай, де можна (Renderer2 для SSR-safe маніпуляцій); прямий доступ ламає SSR/безпеку.
- **`static: true` на елементі всередині `*ngIf`** → `undefined` (динамічний елемент вимагає `static: false`).

---

## ✅ Чеклист "знаю тему на Senior"

- [ ] Content projection = `<ng-content>`, аналог `children`/slots
- [ ] Single vs multi-slot (`select` за CSS-селектором)
- [ ] Default slot (ng-content без select) як catch-all
- [ ] Проектований контент належить БАТЬКУ (scope, CD, bindings)
- [ ] `ngProjectAs` для складних структур
- [ ] 4 запити: ViewChild(ren) vs ContentChild(ren)
- [ ] View = власний шаблон; Content = проектоване ззовні
- [ ] ViewChild timing: ngAfterViewInit (+ static: true → ngOnInit)
- [ ] ContentChild timing: ngAfterContentInit
- [ ] static: true vs false + обмеження (не в *ngIf)
- [ ] QueryList + `.changes` реактивність
- [ ] Compound component pattern (Tabs/Tab) через ContentChildren
- [ ] Signal queries (viewChild/contentChild) — сучасна заміна
- [ ] Пастки: View vs Content, timing, Renderer2 vs nativeElement
