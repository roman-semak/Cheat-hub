// AUTO-GENERATED from CheetSheet/angular/quiz.html. Re-running overwrites.
import type { QuizData } from './types'

export const angularQuiz: QuizData = {
  "title": "Angular Quiz",
  "questions": [
    {
      "id": "q1",
      "question": "Що таке <code>ChangeDetectionStrategy.OnPush</code>?",
      "options": [
        "Angular перевіряє компонент при кожній події в додатку",
        "Angular перевіряє компонент лише коли змінюються Input-посилання, спрацьовує async pipe або явно викликається markForCheck()",
        "Angular ніколи не перевіряє компонент автоматично",
        "Angular перевіряє компонент лише при ручному виклику detectChanges()"
      ],
      "correct": 1,
      "explanation": "<strong>OnPush</strong> запускає перевірку в чотирьох випадках: Input-посилання змінилось (===), спрацював async pipe, виникла DOM-подія всередині компонента, або явно викликано <code>markForCheck()</code> / <code>detectChanges()</code>."
    },
    {
      "id": "q2",
      "question": "В чому різниця між <code>markForCheck()</code> та <code>detectChanges()</code>?",
      "options": [
        "Вони роблять те саме, просто різні назви",
        "markForCheck() помічає компонент і всіх предків для перевірки на наступному циклі; detectChanges() синхронно запускає перевірку для поточного піддерева",
        "detectChanges() помічає компонент для наступного циклу; markForCheck() запускає перевірку негайно",
        "markForCheck() використовується тільки з Signals; detectChanges() — тільки з RxJS"
      ],
      "correct": 1,
      "explanation": "<strong>markForCheck()</strong> — асинхронний: ставить позначку на компонент та всіх предків, перевірка станеться в наступному циклі Angular. <strong>detectChanges()</strong> — синхронний: негайно запускає CD для поточного компонента і нащадків."
    },
    {
      "id": "q3",
      "question": "Що відбудеться з OnPush компонентом, якщо змінити властивість об'єкта (не посилання), який передається через @Input?",
      "options": [
        "Angular автоматично виявить мутацію і перерендерить компонент",
        "Angular NOT виявить зміну, бо перевіряється лише посилання (===), не вміст об'єкта",
        "OnPush обходить це через deep equality check",
        "Angular кине помилку про заборонену мутацію"
      ],
      "correct": 1,
      "explanation": "OnPush використовує <code>===</code> для порівняння Input. Мутація об'єкта (наприклад <code>obj.name = \"new\"</code>) не змінює посилання, тому Angular не запустить CD. Рішення: передавати нові об'єкти (spread: <code>{ ...obj, name: \"new\" }</code>) або викликати <code>markForCheck()</code>."
    },
    {
      "id": "q4",
      "question": "Що поверне наступний код?<code>const count = signal(0);\nconst double = computed(() => count() * 2);\ncount.set(5);\nconsole.log(double());</code>",
      "options": [
        "0",
        "5",
        "10",
        "Помилка: computed не оновлюється після set()"
      ],
      "correct": 2,
      "explanation": "<code>computed()</code> — lazy: перераховується лише коли зчитується після того, як залежність змінилась. Після <code>count.set(5)</code> при наступному зчитанні <code>double()</code> поверне <code>5 * 2 = 10</code>."
    },
    {
      "id": "q5",
      "question": "Яка правильна причина NE використовувати <code>effect()</code> для синхронізації стану між двома сигналами?",
      "options": [
        "effect() занадто повільний для синхронізації",
        "effect() може спричинити нескінченні цикли та є anti-pattern для derivation — для цього існує computed()",
        "effect() не може читати інші сигнали всередині себе",
        "effect() виконується синхронно, що ламає Angular CD"
      ],
      "correct": 1,
      "explanation": "<code>effect()</code> призначений для side-effects (логування, DOM-маніпуляції поза Angular, запити). Для derived state слід використовувати <code>computed()</code>, який гарантує мемоізацію та відсутність циклічних залежностей."
    },
    {
      "id": "q6",
      "question": "Що робить <code>input()</code> (Angular 17.1+) на відміну від <code>@Input()</code>?",
      "options": [
        "Вони ідентичні, лише різний синтаксис",
        "input() повертає Signal&lt;T&gt;, що дозволяє реактивно отримувати значення без підписки чи OnChanges",
        "input() підтримує тільки примітивні типи",
        "input() автоматично відписується від зовнішніх Observable"
      ],
      "correct": 1,
      "explanation": "<code>input()</code> повертає <code>InputSignal&lt;T&gt;</code> — тільки для читання сигнал. Значення можна використовувати в <code>computed()</code>, <code>effect()</code> або в шаблоні. Це усуває потребу в <code>ngOnChanges</code> та робить потік даних явним і реактивним."
    },
    {
      "id": "q7",
      "question": "Яка різниця між providedIn: 'root' та providedIn: 'platform'?",
      "options": [
        "Вони ідентичні, обидва створюють singleton",
        "'root' синглтон на рівні AppModule; 'platform' — глобальний синглтон, спільний для всіх додатків на сторінці",
        "'platform' для тестування, 'root' для продакшену",
        "'root' для injector, 'platform' для providers array"
      ],
      "correct": 1,
      "explanation": "<code>providedIn: 'root'</code> — синглтон на рівні bootstrap Angular app. <code>providedIn: 'platform'</code> — глобальний синглтон, спільний навіть якщо на сторінці кілька Angular додатків. Рідко використовується, але важливо для MFE та multi-bootstrap сценаріїв."
    },
    {
      "id": "q8",
      "question": "Що робить @Optional() декоратор?",
      "options": [
        "Дозволяє пропустити параметр в конструкторі",
        "Якщо сервіс не знайдено, инжектор повертає null замість кидання помилки",
        "Робить параметр не обов'язковим для рендерення",
        "Дозволяє використовувати 0 або undefined як дефолт"
      ],
      "correct": 1,
      "explanation": "<code>@Optional()</code> змінює поведінку инжектора: якщо залежність не знайдена (немає provider), замість помилки DI повертає <code>null</code>. Корисно для вибіркових залежностей, наприклад конфіг який може не існувати."
    },
    {
      "id": "q9",
      "question": "В чому різниця між providedIn та providers array?",
      "options": [
        "providedIn тільки для Injectables, providers array — для всього",
        "providedIn — дерево-шейкінг дружній, ліниве завантаження; providers array — їх все завантажується",
        "Вони ідентичні за функціональністю",
        "providedIn для модулів, providers для компонентів"
      ],
      "correct": 1,
      "explanation": "<code>@Injectable({providedIn: 'root'})</code> дозволяє bundler видалити невикористаний код (tree-shaking). <code>providers: [SomeService]</code> в модулі/компоненті завантажує завжди. Рекомендація: використовувати <code>providedIn</code> для максимальної оптимізації."
    },
    {
      "id": "q10",
      "question": "В чому ключова різниця між <code>switchMap</code> та <code>concatMap</code>?",
      "options": [
        "switchMap зберігає порядок запитів; concatMap скасовує попередні",
        "switchMap скасовує попередній inner observable при новому значенні; concatMap ставить в чергу і чекає завершення кожного",
        "Вони однакові, різна лише назва",
        "concatMap паралельно виконує всі inner observables; switchMap — послідовно"
      ],
      "correct": 1,
      "explanation": "<strong>switchMap</strong> — при кожному новому outer-значенні відписується від попереднього inner. Ідеальний для пошуку в реальному часі. <strong>concatMap</strong> — ставить inner в чергу, чекає завершення. Ідеальний для послідовних операцій де важливий порядок (наприклад, завантаження файлів по черзі)."
    },
    {
      "id": "q11",
      "question": "Яке з тверджень про <code>shareReplay(1)</code> є небезпечним пасткою?",
      "options": [
        "shareReplay(1) завжди автоматично завершується коли всі підписники відписались",
        "shareReplay(1) без { refCount: true } НЕ відписується від source навіть коли нуль підписників — може спричинити memory leak",
        "shareReplay(1) кешує лише одне значення, тому не підходить для HTTP-запитів",
        "shareReplay(1) не сумісний з async pipe в Angular"
      ],
      "correct": 1,
      "explanation": "<code>shareReplay(1)</code> за замовчуванням має <code>refCount: false</code>, тому підписка на source зберігається нескінченно. Щоб уникнути memory leak, використовуй <code>shareReplay({ bufferSize: 1, refCount: true })</code> — тоді відписка відбудеться коли останній підписник відписується."
    },
    {
      "id": "q12",
      "question": "Яка різниця між <code>Subject</code> та <code>BehaviorSubject</code>?",
      "options": [
        "BehaviorSubject може мати кількох підписників; Subject — лише одного",
        "Subject не зберігає поточне значення, нові підписники пропускають попередні емісії; BehaviorSubject має початкове значення і завжди емітує останнє значення при підписці",
        "Subject — hot observable; BehaviorSubject — cold",
        "BehaviorSubject кешує всі попередні значення; Subject — лише останнє"
      ],
      "correct": 1,
      "explanation": "<strong>Subject</strong>: нові підписники не отримують нічого від попередніх емісій. <strong>BehaviorSubject(initialValue)</strong>: вимагає початкове значення, нові підписники негайно отримують останнє збережене значення. Використовуй BehaviorSubject коли підписник ЗАВЖДИ повинен мати актуальний стан."
    },
    {
      "id": "q13",
      "question": "Що робить GuardResult.REDIRECT?",
      "options": [
        "Отримувач автоматично перенаправляється на повернутий URL",
        "Повідомляє router що перехід дозволений",
        "Скасовує навігацію і повертається на попередню сторінку",
        "GuardResult.REDIRECT не існує у новій Angular"
      ],
      "correct": 0,
      "explanation": "<code>GuardResult.REDIRECT</code> (функціональні guard у Angular 15+) дозволяє безпосередньо перенаправити користувача на інший URL прямо з guard-а. Приклад: <code>return redirect('/login')</code> якщо користувач не авторизований."
    },
    {
      "id": "q14",
      "question": "Коли виконується canActivateChild guard?",
      "options": [
        "Перед активацією батьківського маршруту",
        "Перед активацією будь-якого дочірнього маршруту",
        "Тільки для lazy-loaded модулів",
        "При деактивації дочірніх маршрутів"
      ],
      "correct": 1,
      "explanation": "<code>canActivateChild</code> виконується перед входом до будь-якого дочірнього маршруту батька. На відміну від <code>canActivate</code> який перевіряє сам маршрут, <code>canActivateChild</code> контролює доступ до всіх нащадків."
    },
    {
      "id": "q15",
      "question": "Що таке lazy loading в Angular routing?",
      "options": [
        "Завантаження маршруту при необхідності замість вкупи з главним бандлом",
        "Динамічне додавання маршрутів в runtime",
        "Кешування раніше завантажених маршрутів",
        "Відкладене рендерення компонентів"
      ],
      "correct": 0,
      "explanation": "Lazy loading — техніка де модулі (особливо feature модулі) завантажуються тільки коли користувач перейде на відповідний маршрут. Зменшує initial bundle size і прискорює завантаження додатку. Синтаксис: <code>{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }</code>"
    },
    {
      "id": "q16",
      "question": "Яка різниця між HttpClient та старим Http?",
      "options": [
        "HttpClient новіший, підтримує RxJS 6+",
        "HttpClient повертає Observable&lt;T&gt; замість Observable&lt;Response&gt;; не вимагає .json() виклику",
        "HttpClient більш потужний, Http застарілий",
        "Вони однакові, HttpClient просто тонка обгортка"
      ],
      "correct": 1,
      "explanation": "<code>HttpClient</code> (з Angular 4.3+) автоматично парсить JSON у відповіді та типізує результат. Стара <code>Http</code> повертала <code>Response</code> об'єкт, вимагала явного <code>.json()</code> виклику. <code>HttpClient</code> — рекомендований, старий <code>Http</code> — deprecated."
    },
    {
      "id": "q17",
      "question": "Як функціональні interceptors (Angular 15+) отримують наступний обробник в ланцюзі?",
      "options": [
        "Через параметр HttpRequest",
        "Через HttpEvent",
        "Через другий параметр next: HttpHandlerFn функції",
        "Automatycallyoсет всі interceptors"
      ],
      "correct": 2,
      "explanation": "Функціональний interceptor має сигнатуру <code>(req: HttpRequest&lt;unknown&gt;, next: HttpHandlerFn) => Observable&lt;HttpEvent&lt;unknown&gt;&gt;</code>. <code>next</code> — це функція яка передає запит наступному interceptor'у в ланцюзі (або бекенду якщо це останній)."
    },
    {
      "id": "q18",
      "question": "Що робить error interceptor який повертає <code>throwError()</code>?",
      "options": [
        "Ловить помилку і пробує перезавантажити запит",
        "Пробрасує помилку далі в Observable ланцюзі, але може логувати або трансформувати помилку",
        "Скасовує запит",
        "Перенаправляє користувача на сторінку помилки"
      ],
      "correct": 1,
      "explanation": "Error interceptor з <code>catchError</code> може логувати, трансформувати, або пробросити помилку далі через <code>throwError()</code>. Підписник на HTTP call отримає відхилену Observable і зможе обробити помилку через <code>.subscribe(..., error => {})</code>"
    },
    {
      "id": "q19",
      "question": "Який паттерн краще для повторного запиту при помилці мережі?",
      "options": [
        "error interceptor з try/catch",
        "retry() оператор з exponential backoff логікою",
        "setTimeout в subscribe",
        "Перезавантажування сторінки"
      ],
      "correct": 1,
      "explanation": "<code>catchError(() => of(null).pipe(delay(...), switchMap(() => retryRequest())))</code> або використання <code>retry({ count: 3, delay: 1000 })</code> оператору. Це дозволяє автоматично повторити запит без ручного втручання, з затримкою та інкрементальним backoff."
    },
    {
      "id": "q20",
      "question": "Коли використовувати forkJoin замість Promise.all для множинних HTTP запитів?",
      "options": [
        "Promise.all завжди краще для HTTP",
        "forkJoin чекає на всі Observable завершення; обидва працюють з Angular HttpClient але forkJoin більш declarative",
        "forkJoin для тестування, Promise.all для продакшену",
        "Различий немає"
      ],
      "correct": 1,
      "explanation": "<code>forkJoin([req1$, req2$, req3$])</code> чекає завершення всіх Observable і емітує масив результатів. <code>Promise.all()</code> також чекає, але для Promise. З RxJS naturальніше використовувати <code>forkJoin</code> оскільки HttpClient вже повертає Observable."
    },
    {
      "id": "q21",
      "question": "Що таке CORS та як Angular допомагає з цим?",
      "options": [
        "Cross-Origin Resource Sharing — браузерний механізм безпеки",
        "Angular автоматично вирішує CORS проблеми на клієнті",
        "Backend повинен дозволити запити через Access-Control-Allow-Origin header",
        "Перевіряється в interceptor"
      ],
      "correct": 0,
      "explanation": "<strong>CORS</strong> — браузерний механізм безпеки. Angular не може його \"вирішити\" оскільки обмеження діють на браузері. Рішення: backend мусить повернути правильні CORS header-и (<code>Access-Control-Allow-Origin</code>, <code>Access-Control-Allow-Methods</code> тощо) або використовувати server-side proxy."
    },
    {
      "id": "q22",
      "question": "Як встановити асинхронний валідатор на FormControl?",
      "options": [
        "Додати в second array параметр конструктора FormControl",
        "Передати функцію яка повертає Observable<ValidationErrors | null> в другій параметр",
        "Використовувати setAsyncValidators() метод",
        "Асинхронні валідатори неможливі"
      ],
      "correct": 1,
      "explanation": "<code>new FormControl('', Validators.required, [asyncEmailValidator])</code> — third параметр array асинхронних валідаторів. Или через setter: <code>ctrl.setAsyncValidators(asyncValidator)</code>. Функція повинна повернути <code>Observable<ValidationErrors | null></code>"
    },
    {
      "id": "q23",
      "question": "Що таке FormArray і коли його використовувати?",
      "options": [
        "Масив primitive значень",
        "Масив FormGroup/FormControl для динамічних списків (наприклад, список items форми)",
        "Синтаксичний цукор для перебору form controls",
        "Deprecated в користь FormGroup"
      ],
      "correct": 1,
      "explanation": "<code>FormArray</code> — контейнер для динамічного числа <code>FormGroup</code> / <code>FormControl</code>. Ідеальний для сценаріїв типу \"додати ще один товар\" у shopping cart. Має методи <code>push(), removeAt(), clear()</code> для управління."
    },
    {
      "id": "q24",
      "question": "Яка функція statusChanges на FormControl чи FormGroup?",
      "options": [
        "Повертає поточний статус (VALID/INVALID)",
        "Observable який емітує при кожній зміні статусу валідації",
        "Callback функція при змені стану",
        "Метод для примусової перевалідації"
      ],
      "correct": 1,
      "explanation": "<code>form.statusChanges</code> — <code>Observable&lt;string&gt;</code> яка емітує при кожній змінц статусу форми (VALID → INVALID, тощо). Корисна для відключення/включення кнопки Submit в залежності від стану форми."
    },
    {
      "id": "q25",
      "question": "В якому порядку виконуються lifecycle hooks?",
      "options": [
        "constructor → ngOnInit → ngOnChanges → ngAfterViewInit",
        "constructor → ngOnChanges (якщо @Input) → ngOnInit → ngAfterViewInit",
        "ngOnInit → ngOnChanges → ngAfterViewInit → ngAfterContentInit",
        "Порядок випадковий"
      ],
      "correct": 1,
      "explanation": "Правильний порядок: <code>constructor</code> → <code>ngOnChanges</code> (якщо є @Input) → <code>ngOnInit</code> → <code>ngAfterContentInit</code> → <code>ngAfterViewInit</code>. Важливо: <code>ngOnChanges</code> до <code>ngOnInit</code>, не після."
    },
    {
      "id": "q26",
      "question": "Коли використовувати ngOnDestroy?",
      "options": [
        "Для видалення DOM елементів",
        "Для відписки від Observable, очищення таймерів, звільнення ресурсів",
        "Завжди, інакше буде memory leak",
        "Никогда, Angular автоматично очищує"
      ],
      "correct": 1,
      "explanation": "<code>ngOnDestroy</code> викликається перед тим як Angular видалить компонент. Використовуй для: відписки від Observable (якщо не використовуєш async pipe), clearInterval(), cancel запитів, видалення event listener-ів. Angular НЕ робить це автоматично."
    },
    {
      "id": "q27",
      "question": "Що таке ngAfterViewInit?",
      "options": [
        "Hook коли Content (ng-content) ініціалізовано",
        "Hook коли View компонента (template) повністю ініціалізовано і дочірні компоненти render-а",
        "Hook для ініціалізації @Input properties",
        "Hook для чистки ресурсів"
      ],
      "correct": 1,
      "explanation": "<code>ngAfterViewInit</code> — оптимальне місце для доступу до <code>@ViewChild</code> / <code>@ViewChildren</code> компонентів і template reference variables. На цьому етапі DOM повністю ready."
    },
    {
      "id": "q28",
      "question": "Як отримати посилання на DOM-елемент, спроєктований через <code>&lt;ng-content&gt;</code>?",
      "options": [
        "Через @Input параметр",
        "Через @ContentChild декоратор",
        "Не можна, <code>&lt;ng-content&gt;</code> — тільки для шаблону",
        "Через ElementRef інжекцію"
      ],
      "correct": 1,
      "explanation": "<code>@ContentChild('myRef') myElement: ElementRef</code> дає доступ до елемента з template reference variable <code>#myRef</code>, спроєктованого через <code>&lt;ng-content&gt;</code>. <code>@ViewChild</code> — для дочірніх компонентів у шаблоні (не projected)."
    },
    {
      "id": "q29",
      "question": "Що таке named slots в ng-content?",
      "options": [
        "Feature для старших версій Angular",
        "<ng-content select=\".selector\"> — спосіб розподілу різних частин projected content за правилом селектора",
        "Альтернатива до @Input",
        "Тільки для Template-driven форм"
      ],
      "correct": 1,
      "explanation": "Named slots дозволяють мати кілька <code>&lt;ng-content&gt;</code> в батька з різними селекторами. Приклад: <code>&lt;ng-content select=\"[header]\"&gt;</code> і <code>&lt;ng-content select=\"[body]\"&gt;</code>. Батько використовує: <code>&lt;custom-component&gt;&lt;div header&gt;...&lt;/div&gt;&lt;div body&gt;...&lt;/div&gt;&lt;/custom-component&gt;</code>"
    },
    {
      "id": "q30",
      "question": "Яка різниця між ViewChild та ContentChild?",
      "options": [
        "Одне й те саме",
        "@ViewChild ловить дочірні компоненти у шаблоні батька; @ContentChild ловить елементи, передані через <code>&lt;ng-content&gt;</code>",
        "@ViewChild для @Input, @ContentChild для @Output",
        "@ViewChild — лише для Elements, @ContentChild — для Components"
      ],
      "correct": 1,
      "explanation": "<code>@ViewChild(ChildComponent)</code> — шукає у шаблоні батька. <code>@ContentChild(ChildComponent)</code> — шукає у projected content (<code>&lt;ng-content&gt;</code>). Важливо розрізняти View (template батька) і Content (те що батько отримує ззовні)."
    },
    {
      "id": "q31",
      "question": "Як trackBy функція в *ngFor покращує performance?",
      "options": [
        "Визначає унікальний ID для кожного елемента, дозволяючи Angular переиспользовать DOM nodes замість пересоздання",
        "Сортує список автоматично",
        "Кешує результати",
        "trackBy не впливає на performance"
      ],
      "correct": 0,
      "explanation": "<code>*ngFor=\"let item of items; trackBy: trackByFn\"</code> де <code>trackByFn = (i, item) => item.id</code>. Без trackBy Angular видаляє/створює DOM на кожну зміну. З trackBy повторно використовує DOM якщо item існує (за ID), оновлює лише дані. Критично для великих списків."
    },
    {
      "id": "q32",
      "question": "Що таке lazy loading modules?",
      "options": [
        "Завантаження модулів при запуску додатку",
        "Розділення додатку на чанки і завантаження їх по-потребі (lazy routes)",
        "Кешування модулів в browser",
        "Асинхронне завантаження компонентів"
      ],
      "correct": 1,
      "explanation": "Lazy loading modules скорочує initial bundle. Синтаксис: <code>loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)</code>. Модуль завантажується тільки коли користувач перейде на маршрут. Значно прискорює перше завантаження додатку."
    },
    {
      "id": "q33",
      "question": "Як OnPush change detection покращує performance?",
      "options": [
        "Запускається більш часто",
        "Компонент перевіряється лише при змінах Input або events, не при кожній зміні в додатку. Скорочує перевірки для stateless компонентів.",
        "Вимикає CD повністю",
        "Прискорює роботу рендерера"
      ],
      "correct": 1,
      "explanation": "За замовчуванням Angular робить CD на всьому дереві при будь-якій зміні. <code>ChangeDetectionStrategy.OnPush</code> — CD тільки для цього компонента і нащадків, тільки при змінах Input/events. На додатках з сотнями компонентів дає значне прискорення."
    },
    {
      "id": "q34",
      "question": "В чому суть NgRx?",
      "options": [
        "ORM бібліотека для бази даних",
        "Reactive state management — actions → reducers → selectors для centralized state",
        "HTTP клієнт",
        "Router бібліотека"
      ],
      "correct": 1,
      "explanation": "<strong>NgRx</strong> — Redux-like pattern: User action → dispatched to store → processed by reducer → new state → selected by components. Придає структуру до state management в complex додатках, розділяє concerns, ліпше testable."
    },
    {
      "id": "q35",
      "question": "Яка альтернатива NgRx в Angular 17+?",
      "options": [
        "BehaviorSubject + сервіс",
        "Signals + Signal Store (мінімалістична альтернатива з reactive state)",
        "Обидва однакові",
        "Няма альтернативи"
      ],
      "correct": 1,
      "explanation": "<code>@ngrx/signals</code> (v17+) та <code>Signal Store</code> — більш вгодлива альтернатива NgRx для простих state management сценаріїв. Менше boilerplate ніж NgRx, родна інтеграція з Signals."
    },
    {
      "id": "q36",
      "question": "Що таке selector в NgRx?",
      "options": [
        "CSS селектор",
        "Функція для витягування специфічної частини state з store, з мемоізацією",
        "Redux middleware",
        "Event handler"
      ],
      "correct": 1,
      "explanation": "<code>const selectUserName = createSelector(selectUserState, (user) => user.name)</code>. Selectors витягають дані з store з вбудованою мемоізацією (не перевизивають коли не змінились). Рекомендується завжди використовувати selectors замість прямого доступу до store."
    },
    {
      "id": "q37",
      "question": "Яка різниця між TestBed та ComponentFixture?",
      "options": [
        "Вони одно і теж",
        "TestBed — інжектор для налаштування тесту; ComponentFixture — wrapper навколо компонента з методами для тестування",
        "TestBed для integration, ComponentFixture для unit",
        "ComponentFixture для шаблону, TestBed для скрипту"
      ],
      "correct": 1,
      "explanation": "<code>TestBed.createComponent(MyComponent)</code> повертає <code>ComponentFixture&lt;MyComponent&gt;</code> — об'єкт з <code>.componentInstance</code>, <code>.nativeElement</code>, <code>.detectChanges()</code>, <code>.whenStable()</code> для тестування."
    },
    {
      "id": "q38",
      "question": "Коли викликати fixture.detectChanges() в тесті?",
      "options": [
        "Ніколи, Angular робить автоматично",
        "Тільки для async операцій",
        "На початку тесту і після zmian в компоненті для запуску CD",
        "Для тестування change detection механізму"
      ],
      "correct": 2,
      "explanation": "<code>fixture.detectChanges()</code> запускає change detection цикл (як browser change detection але в тесті). Необхідна для: ініціалізації шаблону, оновлення UI після змін properties, запуску lifecycle hooks. Без неї жодних bind-ів не станеться."
    },
    {
      "id": "q39",
      "question": "Як мокувати HTTP запити в тестах?",
      "options": [
        "HttpTestingController з @angular/common/http/testing",
        "Mock-об'єкти вручну",
        "Реальні запити до бекенду",
        "Тестування HTTP неможливо"
      ],
      "correct": 0,
      "explanation": "<code>HttpTestingController</code> — інструмент для перехоплення HTTP запитів в тестах. <code>httpMock.expectOne(url).flush(mockData)</code>. Дозволяє тестувати HTTP-залежні сервіси без реального бекенду."
    },
    {
      "id": "q40",
      "question": "Як Angular запобігає XSS атакам?",
      "options": [
        "Не запобігає, це задача бекенду",
        "Автоматично sanitize HTML через DomSanitizer",
        "Property binding [innerHTML] автоматично очищується від небезпечного HTML",
        "Вимикає JavaScript в templates"
      ],
      "correct": 2,
      "explanation": "<code>[innerHTML]=\"userContent\"</code> автоматично очищується через DomSanitizer (видаляються небезпечні теги/атрибути). Інтерполяція <code>{{ userContent }}</code> завжди текстова (безпечна). Для довіреного HTML слід явно використовувати <code>bypassSecurityTrustHtml()</code>, але це рідко."
    },
    {
      "id": "q41",
      "question": "Що таке CSRF токен та як його захищатися?",
      "options": [
        "Cross-Site Request Forgery — атака при якій зловмисник може зробити запит від вашого імені",
        "Token для аутентифікації",
        "Механізм для шифрування даних",
        "CSRF не існує в сучасному web"
      ],
      "correct": 0,
      "explanation": "CSRF атака використовує піддельно сформований запит від вашого браузера до уязвимого сайту. Захист: backend генерує унікальний CSRF токен, клієнт включає його в POST/DELETE запити. Angular HttpClient автоматично читає токен з cookie та додає в header."
    },
    {
      "id": "q42",
      "question": "Чому опасна <code>[innerHTML]</code> та як її безпечно використовувати?",
      "options": [
        "[innerHTML] абсолютно безпечна",
        "Вразлива до XSS; якщо потрібен HTML використовуй DomSanitizer.sanitize() або bypassSecurityTrustHtml() для довіреного контенту",
        "[innerHTML] обов'язково вимикає зв'язки",
        "Можна безпечно передавати user input напряму"
      ],
      "correct": 1,
      "explanation": "<code>[innerHTML]=\"userInput\"</code> де userInput потенційно небезпечний HTML — XSS уязвимість. Рішення: використовувати <code>sanitize(userInput)</code> або вверити контент через <code>bypassSecurityTrustHtml()</code> тільки для контроль фінованого контенту."
    },
    {
      "id": "q43",
      "question": "Що таке Server-Side Rendering (SSR)?",
      "options": [
        "Рендеринг компонентів на браузері",
        "Рендеринг шаблонів на сервері з повертанням HTML; браузер отримує готовий HTML замість blank page",
        "Збереження стану на сервері",
        "Кешування шаблонів"
      ],
      "correct": 1,
      "explanation": "<code>ng build --configuration production</code> генерує Angular додаток, SSR враховує <code>npm run build:ssr</code> яка робить server-side рендеринг. Переваги: кращий SEO, швидше первісне завантаження (FCP), кращий UX без white screen."
    },
    {
      "id": "q44",
      "question": "Що таке hydration?",
      "options": [
        "Збереження даних",
        "Процес коли браузер бере готовий HTML із сервера, приєднує JavaScript і робить його інтерактивним",
        "Завантаження додатку",
        "Синхронізація з сервером"
      ],
      "correct": 1,
      "explanation": "<strong>Hydration</strong> — браузер отримує готовий HTML від сервера, потім завантажує Angular runtime (JS) і додає event listener-и, інтерактивність. Важливо: браузерний DOM повинен збігатися з server-rendered HTML інакше hydration зламається."
    },
    {
      "id": "q45",
      "question": "Як тестувати SSR додаток локально?",
      "options": [
        "Немає способу",
        "npm run build:ssr && npm run serve:ssr",
        "ng serve --mode=ssr",
        "ng build && ng serve"
      ],
      "correct": 1,
      "explanation": "<code>npm run build:ssr</code> — білду SSR додаток, <code>npm run serve:ssr</code> — запустити Node сервер локально. Це дозволяє тестувати hydration до deploy на production сервер."
    },
    {
      "id": "q46",
      "question": "Яка різниця між development та production build?",
      "options": [
        "Вони однакові, лише вибір в конфігурації",
        "Production: tree-shaking, minification, optimization; development: source maps, unminified для дебагу",
        "Development не включає bundle аналіз",
        "Production для localhost, development для production сервера"
      ],
      "correct": 1,
      "explanation": "<code>ng build --configuration production</code> запускає: tree-shaking (видаління невикористаного коду), мініфікація (скорочення імен), uglification (обфускація), AOT compilation. Development білд більший, повільніший, але легше дебагити. Production — мінімум 5-10x менший бандл."
    },
    {
      "id": "q47",
      "question": "Як встановити environment-specific конфігурації (dev vs prod)?",
      "options": [
        "Хардкод-ити URL в компонентах",
        "Використовувати environment.ts файлів: environment.ts (dev) та environment.prod.ts (prod); angular.json файл управляє заміною",
        "Можна тільки змінні середовища",
        "Angular не підтримує environment конфи"
      ],
      "correct": 1,
      "explanation": "<code>src/environments/environment.ts</code> та <code>src/environments/environment.prod.ts</code>. У <code>angular.json</code> налаштувати <code>fileReplacements</code> щоб dev білд використовував dev env. Компоненти імпортують <code>import { environment } from '@env'</code> і отримають правильний конфіг автоматично."
    },
    {
      "id": "q48",
      "question": "Як дозволити CORS на staging server?",
      "options": [
        "Angular вирішує це на клієнті",
        "Backend повинен повернути правильні CORS header-и; у development можна використовувати proxy в angular.json",
        "Це неможливо",
        "Завжди блокується браузером"
      ],
      "correct": 1,
      "explanation": "Development proxy в <code>proxy.conf.json</code> + <code>ng serve --proxy-config proxy.conf.json</code> дозволяє обійти CORS на localhost. Production: backend повинен повернути <code>Access-Control-Allow-Origin: https://yourdomain.com</code> та інші необхідні header-и."
    },
    {
      "id": "q49",
      "question": "Коли вперше була випущена Angular?",
      "options": [
        "2010",
        "2016 (v2)",
        "2014 (v1 AngularJS)",
        "2020"
      ],
      "correct": 2,
      "explanation": "<strong>AngularJS</strong> (v1) — вперше 2009. <strong>Angular</strong> (v2+) переписана в TypeScript — вперше 2016. Сучасна версія — Angular 19 (2024)."
    },
    {
      "id": "q50",
      "question": "Яка основна мета фреймворку Angular?",
      "options": [
        "Побудова REST API",
        "Single-Page Application (SPA) — динамічні веб-додатки з TypeScript, компонентна архітектура, DI, RxJS",
        "Тільки для мобільних",
        "Шаблонізатор HTML"
      ],
      "correct": 1,
      "explanation": "<strong>Angular</strong> — повнофункціональний фреймворк для SPAs з: компонентна архітектура, powerful templating, built-in routing, HTTP client, forms, testing tools, DI, RxJS, change detection, SSR, CLI."
    },
    {
      "id": "q51",
      "question": "Angular vs React vs Vue: яка відмінність?",
      "options": [
        "Вони однакові",
        "Angular — повний фреймворк; React — UI library + ecosystem; Vue — середній шлях легший для новачків",
        "React для мобільних, Angular для web",
        "Vue найсучаснішій"
      ],
      "correct": 1,
      "explanation": "<strong>Angular:</strong> full-featured, enterprise, TypeScript-first, learning curve. <strong>React:</strong> бібліотека, flexibility, велика комюніті, JSX. <strong>Vue:</strong> простіша syntaxis, single-file components, компромісс між простотою і потужністю."
    },
    {
      "id": "q52",
      "question": "Що робить main.ts?",
      "options": [
        "Бізнес-логіка додатку",
        "Entry point: импортує AppModule і запускає bootstrap з platform browser",
        "HTML шаблон",
        "CSS стилі"
      ],
      "correct": 1,
      "explanation": "<code>main.ts</code> — entry point. Зазвичай: <code>platformBrowserDynamic().bootstrapModule(AppModule)</code>. Це ліниво завантажує модулі і ініціалізує DI контейнер."
    },
    {
      "id": "q53",
      "question": "Яка структура типового Angular додатку?",
      "options": [
        "Немає правильної структури",
        "src/ → app/ (компоненти, сервіси), assets/, styles/; angular.json налаштування; package.json залежності",
        "Всі файли в корені",
        "Тільки компоненти"
      ],
      "correct": 1,
      "explanation": "Рекомендована структура: <code>src/app/</code> (модулі/компоненти/сервіси), <code>src/assets/</code> (статичні), <code>src/styles/</code> (глобальні стилі), <code>src/environments/</code> (конфіги), root files: <code>main.ts, index.html, styles.css</code>"
    },
    {
      "id": "q54",
      "question": "Що таке NgModule?",
      "options": [
        "Файл конфігурації",
        "Контейнер для організації пов'язаних компонентів, сервісів, директив з declarations, providers, imports, exports",
        "Компонент",
        "Директива"
      ],
      "correct": 1,
      "explanation": "<strong>NgModule</strong> (@NgModule декоратор) — організаційна одиниця. Дозволяє групувати пов'язаний код, контролювати доступ (exports), керувати залежностями (imports, providers). AppModule — root модуль, часто feature модулі для різних частин додатку."
    },
    {
      "id": "q55",
      "question": "Чим WebdriverIO принципово відрізняється від Protractor?",
      "options": [
        "Нічим, це той самий інструмент з новою назвою",
        "WebdriverIO — незалежний від Angular E2E-фреймворк поверх протоколу WebDriver; Protractor був жорстко зав'язаний на Angular internals і deprecated",
        "WebdriverIO працює лише з Firefox",
        "WebdriverIO — це unit-тест фреймворк, а не E2E"
      ],
      "correct": 1,
      "explanation": "Protractor був офіційним E2E-інструментом Angular, але жорстко залежав від Angular-internals (waiting strategy на дайджест-цикл) і Selenium; команда Angular його deprecated. <strong>WebdriverIO</strong> — незалежний, крос-фреймворковий E2E-раннер поверх WebDriver-протоколу, підтримує будь-який фронтенд і навіть мобільні пристрої через Appium."
    },
    {
      "id": "q56",
      "question": "Які ключові слова Gherkin використовує Cucumber для опису сценарію в <code>.feature</code>-файлі?",
      "options": [
        "describe / it / expect",
        "Given / When / Then",
        "test / assert / mock",
        "Arrange / Act / Assert"
      ],
      "correct": 1,
      "explanation": "Gherkin-синтаксис Cucumber описує сценарій людською мовою через <strong>Given</strong> (початковий стан), <strong>When</strong> (дія користувача) і <strong>Then</strong> (очікуваний результат). Кожен рядок мапиться на step definition у коді — так сценарій читає весь крос-функціональний тім, а не лише розробники."
    },
    {
      "id": "q57",
      "question": "Що таке Quality Gate у SonarQube?",
      "options": [
        "Місце, де зберігаються токени доступу",
        "Набір порогів якості (coverage, нові bugs/vulnerabilities, duplication), які PR має пройти, щоб merge був дозволений",
        "Інша назва для ESLint-конфігу",
        "Функція, доступна лише у платній версії"
      ],
      "correct": 1,
      "explanation": "<strong>Quality Gate</strong> — набір умов (напр. coverage on new code ≥ 80%, 0 нових Bugs/Vulnerabilities, duplication нижче порогу), які SonarQube перевіряє на кожному аналізі. Якщо PR не проходить Quality Gate — merge блокується, це «останній бар'єр» якості окремо від ESLint-гейту в CI."
    }
  ]
}
