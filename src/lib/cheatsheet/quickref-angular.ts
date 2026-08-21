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
        term: 'ngAfterViewInit',
        desc: 'коли дочірні view/ViewChild вже готові',
        chips: ['після рендеру view'],
      },
      { term: 'ngOnDestroy', desc: 'unsubscribe/cleanup перед знищенням', chips: ['unmount'] },
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
      { term: 'async pipe', desc: 'авто subscribe/unsubscribe на Observable у шаблоні' },
      {
        term: 'takeUntilDestroyed()',
        desc: 'авто-unsubscribe при знищенні компонента/сервісу',
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
      { term: 'Subject', desc: 'без initial value; нові підписники не бачать минулих значень' },
      {
        term: 'BehaviorSubject(init)',
        desc: 'зберігає останнє значення, віддає одразу новим — <b>найчастіший для state</b>',
      },
      { term: 'ReplaySubject(n)', desc: 'replay n останніх значень новим підписникам' },
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
]
