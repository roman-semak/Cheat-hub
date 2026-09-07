import type { QuickRefBlock } from './types'

// Angular's quickref board. Core blocks authored fresh for the dense card
// format; trailing blocks (Forms onward) supplement gaps found in the old
// prose `angularCheat` sheet (angular.ts), condensed into the same style.
export const angularQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'Change Detection',
    icon: '🔍',
    entries: [
      {
        term: 'Zone.js',
        desc: 'патчить async API (setTimeout, addEventListener), щоб знати коли запускати CD',
      },
      { term: 'Default CD', desc: 'перевіряє <b>усе</b> дерево компонентів на кожну подію' },
      {
        term: 'OnPush',
        desc: 'перевіряє лише при зміні <b>reference</b> @Input, власній події або async pipe',
      },
      {
        term: 'ChangeDetectorRef',
        desc: '<code>markForCheck()</code> / <code>detectChanges()</code> — ручний контроль CD',
      },
    ],
  },
  {
    label: 'DI & Services',
    icon: '💉',
    entries: [
      {
        term: "@Injectable({providedIn:'root'})",
        desc: 'singleton на весь застосунок, tree-shakable',
      },
      {
        term: 'providers у @Component',
        desc: 'новий екземпляр сервісу на компонент/піддерево',
      },
      { term: 'InjectionToken', desc: "DI-токен для примітивів/інтерфейсів без класу" },
      { term: 'inject()', desc: 'функціональний DI поза конструктором' },
    ],
  },
  {
    label: 'Lifecycle hooks',
    icon: '⏱️',
    entries: [
      { term: 'ngOnChanges', desc: 'на зміну будь-якого @Input', chips: ['перед ngOnInit'] },
      { term: 'ngOnInit', desc: 'один раз, після першого ngOnChanges', chips: ['mount'] },
      {
        term: 'ngDoCheck',
        desc: 'на <b>кожен</b> цикл CD — власна логіка порівняння; дорого, тримати мікроскопічним',
        chips: ['щоцикл'],
      },
      {
        term: 'ngAfterContentInit',
        desc: 'коли спроєктований контент (<code>ng-content</code>) готовий — тут доступний <code>@ContentChild</code>',
        chips: ['один раз'],
      },
      {
        term: 'ngAfterViewInit',
        desc: 'коли дочірні view/ViewChild вже готові',
        chips: ['після рендеру view'],
      },
      {
        term: 'ngAfterViewChecked',
        desc: 'після кожної перевірки view; зміна стану тут → <code>ExpressionChangedAfterItHasBeenCheckedError</code>',
        chips: ['щоцикл'],
      },
      { term: 'ngOnDestroy', desc: 'unsubscribe/cleanup перед знищенням', chips: ['unmount'] },
    ],
  },
  {
    label: 'Lifecycle: Create → Update → Destroy',
    icon: '📍',
    phases: [
      {
        phase: 'Create',
        desc: 'створення інстансу і перший рендер',
        hooks: [
          'constructor / inject()',
          'ngOnChanges — 1й раз',
          'ngOnInit',
          'ngAfterContentInit',
          'ngAfterViewInit',
        ],
        classic: 'тут — стартовий fetch, підписки',
        accentHex: '#5fae86',
      },
      {
        phase: 'Update',
        desc: 'кожен цикл change detection',
        hooks: [
          'ngOnChanges — на зміну @Input',
          'ngDoCheck',
          'ngAfterContentChecked',
          'ngAfterViewChecked',
        ],
        classic: 'тут нічого не мутувати — ExpressionChanged…Error',
        accentHex: '#6b9bd1',
      },
      {
        phase: 'Destroy',
        desc: 'компонент видаляється з дерева',
        hooks: [
          'ngOnDestroy',
          'DestroyRef.onDestroy(fn)',
          'takeUntilDestroyed() — авто',
          'cleanup: unsubscribe, clearInterval, removeEventListener',
        ],
        classic: 'не прибрав — memory leak',
        accentHex: '#c2785f',
      },
    ],
  },
  {
    label: 'Signals & RxJS в Angular',
    icon: '📡',
    entries: [
      {
        term: 'signal()',
        desc: 'реактивне значення без Zone.js; CD реагує на його читання',
      },
      {
        term: 'computed()',
        desc: 'похідний signal, кешується, рахується лише при зміні залежностей',
      },
      {
        term: 'effect()',
        desc: 'side-effect на зміну сигналів, які він читає; <b>не</b> для похідного стану — для нього <code>computed()</code>',
        code: `readonly userId = signal(1);

constructor() {
  // перезапускається щоразу, коли зміниться userId
  effect(() => console.log('user:', this.userId()));

  // ❌ не писати в сигнал усередині effect — цикл
  // effect(() => this.total.set(this.a() + this.b()));
  // ✅ для цього є computed()
}`,
      },
      {
        term: 'linkedSignal()',
        desc: 'writable computed: похідний від джерела, але його можна перезаписати локально (v19+)',
      },
      { term: 'async pipe', desc: 'авто subscribe/unsubscribe на Observable у шаблоні' },
      {
        term: 'takeUntilDestroyed()',
        desc: 'авто-unsubscribe при знищенні компонента/сервісу',
      },
      {
        term: 'toSignal(obs$)',
        desc: 'Observable → Signal; сам відписується, у шаблоні не потрібен <code>async</code>',
        code: `// потрібен initialValue, інакше тип буде T | undefined
readonly user = toSignal(this.store.user$, { initialValue: null });

// у шаблоні: {{ user()?.name }}  — без async pipe`,
      },
      {
        term: 'toObservable(sig)',
        desc: 'Signal → Observable; коли над сигналом треба debounce/switchMap',
        code: `readonly query = signal('');

readonly results$ = toObservable(this.query).pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(q => this.api.search(q)),
);`,
      },
    ],
  },
  {
    label: 'RxJS: Hot vs Cold, Subjects',
    icon: '🌊',
    entries: [
      {
        term: 'Cold Observable',
        desc: 'новий producer на кожного subscriber — <code>HttpClient.get()</code>; 2× async pipe = 2 запити',
      },
      {
        term: 'Hot Observable',
        desc: 'один спільний producer — Subject, fromEvent, WebSocket',
      },
      {
        term: 'Observable vs Subject',
        desc: 'Observable — <b>лише продюсер</b>, ззовні в нього не пушнеш. Subject — і продюсер, і споживач: має <code>next()</code>, тому завжди hot і мультикастить',
        code: `// Observable: значення визначає сам продюсер усередині
const obs$ = new Observable(sub => sub.next(1));
// obs$.next(2);  ❌ такого методу немає

// Subject: пушить будь-хто, хто має посилання
const subj$ = new Subject<number>();
subj$.subscribe(v => console.log(v));
subj$.next(2);   // ✅ мультикаст усім підписникам

// ❗ Тому назовні з сервісу віддають asObservable(),
// щоб ніхто чужий не зміг зробити .next()`,
      },
      { term: 'Subject', desc: 'без initial value; нові підписники не бачать минулих значень' },
      {
        term: 'BehaviorSubject(init)',
        desc: 'зберігає останнє значення, віддає одразу новим — <b>найчастіший для state</b>',
      },
      { term: 'ReplaySubject(n)', desc: 'replay n останніх значень новим підписникам' },
      {
        term: 'AsyncSubject',
        desc: 'віддає <b>лише останнє</b> значення і лише при <code>complete()</code>; рідкісний',
      },
    ],
  },
  {
    label: 'RxJS: Flattening — switchMap & Co',
    icon: '🔀',
    entries: [
      {
        term: 'switchMap',
        desc: 'скасовує попередній, лишає лише новий',
        chips: ['search / autocomplete'],
      },
      {
        term: 'mergeMap',
        desc: 'усі паралельно, порядок не гарантований',
        chips: ['незалежні запити'],
      },
      {
        term: 'concatMap',
        desc: 'ставить у чергу, зберігає порядок',
        chips: ['послідовні save'],
      },
      {
        term: 'exhaustMap',
        desc: 'ігнорує нові, поки поточний не завершився',
        chips: ['submit-кнопка'],
      },
      {
        term: 'shareReplay(1)',
        desc: 'один запит на всіх + буфер останнього — лік від cold-дублів',
        chips: ['кеш HTTP'],
      },
    ],
  },
  {
    label: 'Standalone components',
    icon: '🧱',
    entries: [
      {
        term: 'standalone: true',
        desc: 'компонент сам оголошує залежності; з <b>v19 — за замовчуванням</b>, прапорець можна не писати',
        code: `@Component({
  selector: 'app-user-card',
  // standalone: true — дефолт з v19, писати не треба
  imports: [DatePipe, RouterLink],   // залежності самого компонента
  template: '<a [routerLink]="link">{{ date | date }}</a>',
})
export class UserCardComponent {}`,
      },
      {
        term: 'imports: [...]',
        desc: 'усе, що вживається в шаблоні: пайпи, директиви, інші standalone-компоненти. Забув — помилка компіляції, а не тиха порожнеча',
      },
      {
        term: 'bootstrapApplication()',
        desc: 'старт застосунку без <code>AppModule</code>; провайдери — через <code>provideXxx()</code>-функції',
        code: `bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
  ],
});`,
      },
      {
        term: 'Чому краще за NgModule',
        desc: 'явний граф залежностей → кращий tree-shaking, менше boilerplate, простіший lazy-load через <code>loadComponent</code>',
      },
      {
        term: 'ng g @angular/core:standalone',
        desc: 'офіційна схематика міграції; ганяється тричі: конвертація → прибрати зайві NgModule → перевести bootstrap',
      },
    ],
  },
  {
    label: 'Control flow: @if / @for / @switch',
    icon: '🎛️',
    entries: [
      {
        term: '@if / @else if / @else',
        desc: 'вбудований у компілятор; <code>as</code>-аліас зручний для <code>async</code>',
        code: `@if (user(); as u) {
  <p>{{ u.name }}</p>
} @else if (loading()) {
  <app-spinner />
} @else {
  <p>Немає даних</p>
}`,
      },
      {
        term: '@for (… ; track …)',
        desc: '<b><code>track</code> обовʼязковий</b> — компілятор не пропустить без нього; є блок <code>@empty</code>',
        code: `@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>Список порожній</li>
}

// ❗ track item.id — реюз DOM
// ❌ track $index на списку, що сортується/фільтрується,
//    зводить оптимізацію нанівець`,
      },
      {
        term: '$index, $first, $last…',
        desc: 'контекстні змінні <code>@for</code>: <code>$index $first $last $even $odd $count</code>; аліас через <code>let</code>',
      },
      {
        term: '@switch / @case / @default',
        desc: 'без fall-through і без <code>break</code>; порівняння суворе (<code>===</code>)',
        code: `@switch (status()) {
  @case ('loading') { <app-spinner /> }
  @case ('error')   { <app-error /> }
  @default          { <app-content /> }
}`,
      },
      {
        term: 'Чому краще за директиви',
        desc: 'не треба імпортувати <code>CommonModule</code>, менший бандл, точніше звужуються типи в шаблоні',
      },
    ],
  },
  {
    label: 'Старий синтаксис: *ngIf / *ngFor → @if / @for',
    icon: '➡️',
    chips: [
      '<b>*ngIf="c"</b> → <b>@if (c) { }</b>',
      '<b>*ngIf="c; else tpl"</b> → <b>@else { }</b> — без <code>ng-template</code>',
      '<b>*ngFor + trackBy</b> → <b>@for (… ; track …)</b>',
      '<b>*ngSwitch</b> → <b>@switch / @case / @default</b>',
      '<b>ng-container / ng-template</b> — <b>лишаються</b>, не deprecated',
      'міграція: <code>ng generate @angular/core:control-flow</code>',
    ],
  },
  {
    label: '@defer — deferrable views',
    icon: '⏳',
    entries: [
      {
        term: '@defer',
        desc: 'lazy-вантажить <b>шматок шаблону</b> окремим chunkʼом; дефернути можна лише <b>standalone</b>-залежності',
        code: `@defer (on viewport) {
  <app-heavy-chart [data]="data()" />
} @placeholder (minimum 500ms) {
  <div class="skeleton"></div>
} @loading (after 100ms; minimum 1s) {
  <app-spinner />
} @error {
  <p>Не вдалося завантажити</p>
}`,
      },
      {
        term: '@placeholder',
        desc: 'що показувати до спрацювання тригера; <code>minimum</code> тримає його мінімум N мс проти мерехтіння',
      },
      {
        term: '@loading',
        desc: '<code>after</code> — не показувати спінер перші N мс (швидкий chunk встигне); <code>minimum</code> — тримати не менше N мс',
      },
      { term: '@error', desc: 'фолбек, якщо chunk не завантажився (offline, 404 на assets)' },
      {
        term: '@defer vs lazy route',
        desc: '<code>@defer</code> — шматок сторінки; <code>loadComponent</code> — цілий сегмент маршруту. Доповнюють одне одного',
      },
    ],
  },
  {
    label: '@defer: тригери (triggers)',
    icon: '🎯',
    chips: [
      '<b>on idle</b> — дефолт: коли браузер вільний',
      '<b>on viewport</b> — вʼїхав у вʼюпорт (можна <code>on viewport(ref)</code>)',
      '<b>on interaction</b> — click / keydown',
      '<b>on hover</b> — mouseover / focus',
      '<b>on timer(5s)</b> — через заданий час',
      '<b>on immediate</b> — одразу після рендеру сторінки',
      '<b>when expr</b> — власна умова (булевий вираз)',
      '<b>prefetch on …</b> — завантажити наперед, показати пізніше',
      '<b>hydrate on …</b> (v19) — incremental hydration під SSR',
    ],
  },
  {
    label: 'DI: ієрархія інжекторів (injector tree)',
    icon: '🌳',
    entries: [
      {
        term: 'ElementInjector',
        desc: 'створюється на компоненті/директиві з <code>providers: []</code>; свій інстанс на компонент і його піддерево',
      },
      {
        term: 'EnvironmentInjector',
        desc: 'рівень застосунку/роуту: <code>bootstrapApplication({providers})</code>, <code>providers</code> у <code>Route</code>',
      },
      {
        term: 'Порядок резолву',
        desc: 'свій Element → батьківські Element → Environment → root → <code>NullInjector</code> → помилка <b>NG0201</b>',
        code: `// NG0201: No provider for XService!
// Означає: дійшли до NullInjector і не знайшли токен.
// Перевір: providedIn:'root', або providers у компоненті/роуті,
// або чи не інжектиш у контекст, що створився раніше провайдера.`,
      },
      {
        term: "providedIn: 'root' | 'platform' | 'any'",
        desc: "<code>root</code> — singleton на застосунок (tree-shakable); <code>platform</code> — на кілька застосунків на сторінці; <code>any</code> — свій інстанс на кожен lazy-інжектор",
      },
      {
        term: '@Self / @SkipSelf / @Optional / @Host',
        desc: 'модифікатори пошуку: лише свій рівень / пропустити свій / <code>null</code> замість помилки / зупинитись на host-компоненті',
      },
    ],
  },
  {
    label: 'Forms',
    icon: '📝',
    entries: [
      {
        term: 'Reactive Forms',
        desc: 'FormGroup/FormControl/FormArray — type-safe (v14+), легко тестувати, повний контроль',
        chips: ['рекомендовано'],
      },
      {
        term: 'Template-Driven',
        desc: 'ngModel — простіше для дрібних форм, важче тестувати',
      },
      {
        term: 'ControlValueAccessor',
        desc: 'інтерфейс для кастомного form-контролу (writeValue/registerOnChange/registerOnTouched)',
      },
    ],
  },
  {
    label: 'Testing',
    icon: '🧪',
    entries: [
      {
        term: 'TestBed',
        desc: 'configureTestingModule + createComponent + <code>fixture.detectChanges()</code> (initial CD)',
      },
      {
        term: 'OnPush у тестах',
        desc: '<code>detectChanges()</code> без <code>markForCheck()</code> може не побачити зміну — пастка',
      },
    ],
  },
  {
    label: 'Performance: 7 важелів Angular',
    icon: '🚀',
    entries: [
      {
        term: 'OnPush change detection',
        desc: 'менше перевірок дерева — компонент перевіряється лише на зміну <b>посилання</b> @Input, власну подію чи async pipe',
        chips: ['перший важіль'],
      },
      {
        term: 'track у @for',
        desc: 'перевикористання DOM замість перестворення — O(n) замість O(n²) на великих списках',
        chips: ['обовʼязковий'],
      },
      {
        term: 'Signals / computed',
        desc: 'fine-grained CD: оновлюється лише те місце шаблону, що читає сигнал, а не весь компонент',
        chips: ['zoneless'],
      },
      {
        term: 'Virtual scrolling (CDK)',
        desc: 'рендер лише видимих рядків великого списку — решта не існує в DOM',
        chips: ['@angular/cdk'],
        code: `import { ScrollingModule } from '@angular/cdk/scrolling';

// itemSize — висота рядка в px, обовʼязкова для fixed-size стратегії
<cdk-virtual-scroll-viewport itemSize="48" class="h-96">
  <div *cdkVirtualFor="let row of rows; trackBy: trackById">
    {{ row.name }}
  </div>
</cdk-virtual-scroll-viewport>`,
      },
      {
        term: '@defer / lazy routes',
        desc: 'менший початковий бандл, кращий LCP — код їде окремим chunkʼом і лише коли потрібен',
      },
      {
        term: 'runOutsideAngular',
        desc: 'часті події (scroll, mousemove, rAF) без CD — Zone не тригериться на кожен тік',
        code: `private readonly zone = inject(NgZone);

ngAfterViewInit() {
  this.zone.runOutsideAngular(() => {
    window.addEventListener('mousemove', this.onMove);
  });
}

private onMove = (e: MouseEvent) => {
  this.x = e.clientX;                  // без CD — дешево
  if (this.shouldCommit(e)) {
    this.zone.run(() => this.commit()); // назад у зону, коли треба оновити UI
  }
};`,
      },
      {
        term: 'Pure pipe замість методу в шаблоні',
        desc: 'мемоізація: <code>{{ getTotal(items) }}</code> виконується <b>щоцикл CD</b>, pure pipe — лише при зміні посилання аргументу',
      },
    ],
  },
  {
    label: 'Bundle optimization',
    icon: '📦',
    entries: [
      {
        term: "loadComponent / loadChildren",
        desc: 'lazy-роути розбивають застосунок на chunkʼи — початковий бандл менший',
        code: `export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent),
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/routes'),
  },
];`,
      },
      {
        term: 'Tree-shaking',
        desc: "standalone + <code>providedIn: 'root'</code> прибирають невикористане; потрібні статичні ESM-імпорти",
        chips: ['лише prod build'],
      },
      {
        term: 'Bundle analysis',
        desc: '<code>source-map-explorer</code> / esbuild metafile — знайти роздуті залежності; <code>budgets</code> в <code>angular.json</code> ловлять регрес у CI',
        code: `ng build --stats-json
npx source-map-explorer dist/**/*.js

// esbuild-білдер: metafile → https://esbuild.github.io/analyze/
ng build --configuration production
npx esbuild-visualizer --metadata dist/stats.json`,
      },
      {
        term: 'NgOptimizedImage (ngSrc)',
        desc: 'lazy за замовчуванням, <code>priority</code> для LCP-картинки, автоматичний <code>srcset</code> — прямо бʼє по LCP',
        code: `import { NgOptimizedImage } from '@angular/common';

// priority → preload + fetchpriority=high; лише для LCP-зображення
<img ngSrc="/hero.jpg" width="1200" height="630" priority alt="Hero" />

// решта — lazy автоматично; width/height обовʼязкові (проти CLS)
<img ngSrc="/thumb.jpg" width="200" height="200" alt="Thumb" />`,
      },
    ],
  },
  {
    label: 'Memory leaks: причини і ліки',
    icon: '🧹',
    entries: [
      {
        term: 'Незакрита subscription',
        desc: 'причина №1: колбек замикає компонент, компонент знищено — а він живий у памʼяті',
        chips: ['interval, WebSocket, router.events'],
      },
      {
        term: 'addEventListener без remove',
        desc: 'слухач на <code>window</code>/<code>document</code> переживає компонент — прибирати в <code>ngOnDestroy</code>',
      },
      {
        term: 'setInterval без clearInterval',
        desc: 'таймер тікає далі й тримає замикання на знищений компонент',
      },
      {
        term: 'shareReplay({refCount:false})',
        desc: 'на <b>нескінченному</b> джерелі тримає підписку на producer назавжди, навіть коли підписників нуль',
      },
      {
        term: 'Ліки — за пріоритетом',
        desc: '① <code>async</code> pipe → ② <code>takeUntilDestroyed()</code> → ③ <code>takeUntil(destroy$)</code> → ④ ручний <code>unsubscribe()</code>',
        code: `// ① найкраще — підписки взагалі немає в TS
// template: <li *ngFor="let u of users$ | async">

// ② імперативна логіка
this.ws.messages$.pipe(takeUntilDestroyed()).subscribe(...);

// поза injection context — явний DestroyRef
private readonly destroyRef = inject(DestroyRef);
interval(1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();`,
      },
      {
        term: 'Як шукати',
        desc: 'DevTools → Memory: heap snapshot до/після навігації, порівняти retained size і <b>detached DOM nodes</b>',
      },
    ],
  },
]
