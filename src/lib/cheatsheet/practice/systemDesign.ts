import type { PracticeTask } from '../types'

// Section H of the interview-prep checklist: frontend system design.
// These are DISCUSSION cards — no code editor; `solution` is a structured
// reference answer (rendered as HTML prose), `explanation` = talking points.
export const systemDesignTasks: PracticeTask[] = [
  {
    id: 'design-autofill-extension',
    title: 'Autofill / браузерне розширення (MV3)',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'high',
    tags: ['browser extension', 'MV3', 'content script', 'security'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй функцію автозаповнення форм (логін/картки) для браузерного розширення менеджера паролів на Manifest V3 (домен Dashlane).</p>
      <p><strong>Що уточнити на початку:</strong></p>
      <ul class="list">
        <li>які поля автозаповнюємо (креденшли, платіжки, адреси), скільки на сторінці збережених айтемів;</li>
        <li>UX: інлайн-дропдаун у полі vs іконка vs команда з попапу;</li>
        <li>де ключ шифрування — чи розблоковано сховище на момент автозаповнення;</li>
        <li>підтримка iframe / SPA-навігації / динамічних форм;</li>
        <li>обмеження MV3: service worker замість persistent background.</li>
      </ul>`,
    solution: `<h3>Архітектура (MV3)</h3>
      <ul class="list">
        <li><strong>Content script</strong> (в контексті сторінки, ізольований world): детектує форми, малює UI автозаповнення (Shadow DOM, щоб CSS сторінки не заважав), заповнює поля, шле події користувача.</li>
        <li><strong>Service worker</strong> (фоновий, ефемерний): тримає розшифрований vault у пам'яті <em>тільки поки анлокнутий</em>, відповідає на запити «дай айтеми для origin X», керує auto-lock таймером. Прокидається на подію, тож стан має бути відновлюваним.</li>
        <li><strong>Popup / options</strong>: анлок, налаштування, список айтемів.</li>
        <li>Обмін — <code>chrome.runtime.sendMessage</code> / <code>port</code>; жодних креденшлів у content script довше, ніж треба на вставку.</li>
      </ul>
      <h3>Потік автозаповнення</h3>
      <ol class="list">
        <li>Content script знаходить поля (евристики: <code>type</code>, <code>autocomplete</code>, <code>name</code>/<code>id</code>, <code>aria-label</code>, підписи).</li>
        <li>Запит у service worker: «айтеми для <code>window.location.origin</code>».</li>
        <li>SW звіряє origin із <em>збереженим</em> URL айтема (точний домен, не підрядок), повертає метадані (без секретів або із секретами лише на момент вставки).</li>
        <li>Користувач <strong>явно</strong> обирає айтем у дропдауні → SW віддає значення → content script заповнює, диспатчить <code>input</code>/<code>change</code> (щоб React/Angular-форми оновились).</li>
      </ol>
      <h3>Безпека (головне)</h3>
      <ul class="list">
        <li><strong>Ніколи</strong> не автозаповнювати без взаємодії користувача — інакше невидимі поля крадуть креденшли (clickjacking, off-screen inputs).</li>
        <li>Перевіряти видимість і розмір поля; ігнорувати <code>hidden</code> / нульові / за межами в'юпорта.</li>
        <li>Точний матчинг origin; окремо трактувати <code>http</code> vs <code>https</code>; попереджати про заповнення на неHTTPS.</li>
        <li>Захист від фішингу схожих доменів; не заповнювати на iframe з іншого origin, ніж top-frame (або явний opt-in).</li>
        <li>Секрети в пам'яті мінімальний час; чистити змінні; не логувати; не класти у <code>localStorage</code>/DOM-атрибути.</li>
        <li>Auto-lock: за таймером, при сплячці системи, при закритті браузера.</li>
      </ul>
      <h3>Edge cases</h3>
      <ul class="list">
        <li>SPA: <code>MutationObserver</code> + перехоплення history API для повторної детекції форм.</li>
        <li>Мультистепові логіни (спершу email, потім пароль на іншому «екрані»).</li>
        <li>Кілька збережених акаунтів на один сайт → список у дропдауні.</li>
        <li>Service worker «помер» під час флоу → ідемпотентні повідомлення, відновлення стану анлоку.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Головний акцент:</strong> «взаємодія користувача обов'язкова» + «мінімізуй час життя секрету в пам'яті» + «точний матчинг origin». Це те, що очікують почути на security-домені.</li>
      <li>Покажи розуміння обмежень MV3: service worker ефемерний, тож не можна покладатись на in-memory стан без стратегії відновлення.</li>
      <li>Згадай Shadow DOM для ізоляції UI та диспатч синтетичних подій для сумісності з фреймворк-формами.</li>
      <li>Трейд-оф: агресивна детекція форм = кращий UX, але більше хибних спрацювань і поверхня для зловживань.</li>
    </ul>`,
  },
  {
    id: 'design-secure-vault-ui',
    title: 'Secure vault UI',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'high',
    tags: ['security', 'virtualization', 'crypto', 'auto-lock'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй UI сховища паролів: список із тисяч зашифрованих записів, пошук, перегляд/редагування, генератор паролів.</p>
      <p><strong>Що уточнити:</strong> модель шифрування (zero-knowledge? де деривується ключ?), скільки записів у типового користувача, офлайн-режим, шаринг записів, платформи (web / extension / desktop).</p>`,
    solution: `<h3>Модель даних і шифрування</h3>
      <ul class="list">
        <li><strong>Zero-knowledge:</strong> ключ деривується з master-паролю (Argon2id / PBKDF2 з високим iteration count) на клієнті; сервер зберігає лише blob'и шифротексту.</li>
        <li>Кожен запис шифрується окремо (item key), item keys — під vault key. Це дає <strong>on-demand розшифровку</strong>: у списку тримаємо тільки розшифровані метадані (назва, домен, іконка), а пароль розшифровуємо лише коли запис відкрили.</li>
        <li>Розшифровані секрети — в пам'яті мінімальний час, поза React-стейтом де можливо; очищати при закритті деталей.</li>
      </ul>
      <h3>Продуктивність списку</h3>
      <ul class="list">
        <li><strong>Віртуалізація</strong> (react-window / TanStack Virtual): рендеримо ~20 видимих рядків із тисяч.</li>
        <li>Пошук/фільтр — по <em>розшифрованих метаданих</em> в пам'яті; для дуже великих сховищ — індекс (напр. по домену) або веб-воркер, щоб не блокувати main thread на розшифровці.</li>
        <li>Ліниве завантаження іконок сайтів; плейсхолдери.</li>
      </ul>
      <h3>Auto-lock і сесія</h3>
      <ul class="list">
        <li>Lock за таймером бездіяльності, при блокуванні ОС, згортанні, закритті вкладки (configurable).</li>
        <li>При lock: очистити ключі та розшифровані дані з пам'яті, показати екран анлоку, зберегти лише зашифрований стан.</li>
        <li>Biometric / OS unlock як швидкий шлях (ключ у secure enclave / <code>navigator.credentials</code>).</li>
      </ul>
      <h3>Офлайн і синхронізація</h3>
      <ul class="list">
        <li>Локальна зашифрована копія (IndexedDB) для офлайн-доступу; sync при відновленні мережі.</li>
        <li>Конфлікти — версіонування записів, last-write-wins із журналом або merge на рівні полів.</li>
      </ul>
      <h3>Дрібниці, які помічають</h3>
      <ul class="list">
        <li>Не класти паролі в <code>value</code> звичайного <code>&lt;input&gt;</code> без потреби; вимкнути браузерний автозаповнювач і менеджери; <code>autocomplete="off"</code>, копіювання з авто-очищенням буфера.</li>
        <li>Не рендерити секрет у DOM, поки не натиснули «показати»; маскування.</li>
        <li>CSP, відсутність inline-скриптів, захист від XSS (будь-який XSS = злив розшифрованого сховища).</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Три опорні тези:</strong> on-demand розшифровка (не тримати все розшифрованим), віртуалізація списку, агресивний auto-lock з очищенням пам'яті.</li>
      <li>Підкресли: у zero-knowledge моделі XSS катастрофічний — тому CSP і санітизація не «nice to have», а core requirement.</li>
      <li>Трейд-оф: індексований пошук швидший, але індекс — це ще одна структура з чутливими даними, яку треба шифрувати/очищати.</li>
    </ul>`,
  },
  {
    id: 'design-realtime-sync-ui',
    title: 'Real-time sync UI',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'mid',
    tags: ['websocket', 'reconnect', 'conflict resolution', 'offline'],
    prompt: `<p><strong>Сценарій:</strong> спільне редагування (дошка задач / документ), де кілька користувачів бачать зміни одне одного «наживо».</p>
      <p><strong>Що уточнити:</strong> тип даних (структурований список vs вільний текст), скільки одночасних редакторів, чи потрібен офлайн, наскільки критична втрата змін, латентність.</p>`,
    solution: `<h3>Транспорт</h3>
      <ul class="list">
        <li><strong>WebSocket</strong> для двостороннього real-time; fallback на SSE + POST або long-polling.</li>
        <li>Heartbeat (ping/pong) для детекції «мертвих» з'єднань.</li>
        <li><strong>Reconnect</strong>: exponential backoff + jitter; після реконекту — ресинк (запросити зміни з останнього відомого <code>version</code>/<code>cursor</code>).</li>
      </ul>
      <h3>Модель синхронізації</h3>
      <ul class="list">
        <li><strong>Структуровані дані</strong> (задачі, поля): операції-патчі + версіонування; сервер — джерело істини, присвоює монотонний <code>version</code>.</li>
        <li><strong>Вільний текст</strong>: CRDT (Yjs / Automerge) або OT — конкурентні правки зливаються без втрат.</li>
        <li><strong>Optimistic UI</strong>: застосовуємо зміну локально одразу, шлемо на сервер, при відхиленні — rollback + повідомлення.</li>
      </ul>
      <h3>Конфлікти</h3>
      <ul class="list">
        <li>Різні поля одного айтема → merge по полях.</li>
        <li>Те саме поле → last-write-wins із таймстемпом, або показати «X теж редагує» і дати вибір.</li>
        <li>Видалення vs редагування → «tombstone» + нотифікація.</li>
        <li>Presence: хто онлайн, хто що редагує (курсори/локи на рівні поля).</li>
      </ul>
      <h3>Офлайн</h3>
      <ul class="list">
        <li>Черга вихідних операцій у IndexedDB; при реконекті — програти по порядку, обробити конфлікти.</li>
        <li>Показувати стан: «синхронізовано» / «зберігається» / «офлайн, N незбережених змін».</li>
      </ul>
      <h3>UI-дрібниці</h3>
      <ul class="list">
        <li>Дебаунс/батчинг вихідних операцій (не слати на кожну літеру).</li>
        <li>Анімація появи чужих змін, щоб не «смикати» контент під курсором.</li>
        <li>Не перезаписувати поле, яке користувач саме редагує (focus guard).</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Ключове рішення:</strong> тип даних диктує стратегію — структуровані патчі + версії для списків, CRDT/OT для тексту. Не пропонуй CRDT для всього.</li>
      <li>Обов'язково згадай reconnect із backoff + ресинк по версії, і optimistic UI з rollback.</li>
      <li>Presence і focus-guard — те, що відрізняє «працює в демо» від «працює вживу».</li>
      <li>Трейд-оф: optimistic UI = миттєвий відгук, але треба чесно обробляти rollback, інакше користувач втрачає довіру.</li>
    </ul>`,
  },
  {
    id: 'design-data-table-architecture',
    title: 'Архітектура таблиці великих даних',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'mid',
    tags: ['virtualization', 'server pagination', 'performance'],
    prompt: `<p><strong>Сценарій:</strong> таблиця на 100k–1M рядків: сортування, фільтри по колонках, вибір рядків, редагування комірок, експорт.</p>
      <p><strong>Що уточнити:</strong> дані з сервера чи все на клієнті, як часто оновлюються, скільки колонок, чи потрібні групування/агрегації, мобільна версія.</p>`,
    solution: `<h3>Дані: сервер, не клієнт</h3>
      <ul class="list">
        <li>1M рядків не тримають у пам'яті браузера. <strong>Серверна пагінація</strong>: сортування, фільтрація, пошук — на бекенді.</li>
        <li>API: <code>?sort=...&filter=...&cursor=...&limit=...</code>; <strong>keyset-пагінація</strong> (cursor), не <code>OFFSET</code> — стабільно й швидко на глибоких сторінках.</li>
        <li>Кеш сторінок на клієнті (React Query / SWR) з інвалідацією при зміні sort/filter.</li>
      </ul>
      <h3>Рендер: віртуалізація</h3>
      <ul class="list">
        <li>Віртуалізація рядків (і колонок, якщо їх десятки) — у DOM лише видиме вікно + буфер.</li>
        <li>«Windowed infinite scroll» або справжня пагінація зі скролбаром пропорційної висоти.</li>
        <li>Фіксовані заголовки/перші колонки — окремі шари, синхронізований scroll.</li>
      </ul>
      <h3>Взаємодія</h3>
      <ul class="list">
        <li><strong>Вибір рядків через фільтр</strong>: «вибрано всі 240k, що відповідають фільтру» — зберігаємо предикат, не масив id.</li>
        <li>Редагування комірки: optimistic update + patch-запит; підсвітка «зберігається/помилка».</li>
        <li>Експорт великого обсягу — на сервері (генерація файлу + лінк), не в браузері.</li>
      </ul>
      <h3>Продуктивність</h3>
      <ul class="list">
        <li>Мемоізація рядків/комірок (<code>React.memo</code> + стабільні колбеки).</li>
        <li>Дебаунс фільтрів; скасування застарілих запитів (<code>AbortController</code>).</li>
        <li>CSS <code>content-visibility</code> / <code>contain</code> для позаекранних секцій.</li>
        <li>Уникати layout thrashing при вимірюваннях висоти рядків.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Головне:</strong> «дані на сервері + віртуалізація + keyset-пагінація». Клієнтська обробка 1M рядків — одразу червоний прапорець.</li>
      <li>Класна деталь: «вибрати всі за фільтром» зберігати як предикат, а не список id.</li>
      <li>Трейд-оф: клієнтська фільтрація = миттєва, але не масштабується; серверна = масштабується, але латентність і складніший стан (loading/stale).</li>
    </ul>`,
  },
  {
    id: 'design-checkout-flow',
    title: 'Checkout / subscription flow',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'mid',
    tags: ['payments', '3DS', 'idempotency', 'state machine'],
    prompt: `<p><strong>Сценарій:</strong> флоу оплати підписки: вибір плану → дані картки → 3D Secure → підтвердження. Гроші не можна списати двічі й не можна «загубити» успішну оплату.</p>
      <p><strong>Що уточнити:</strong> провайдер (Stripe?), одноразова оплата чи рекурентна, які методи оплати, чи є trial, регіони/валюти, SCA-вимоги.</p>`,
    solution: `<h3>Стан як явна машина станів</h3>
      <p><code>idle → collecting → submitting → requires_action (3DS) → confirming → success | error</code></p>
      <ul class="list">
        <li>Кожен стан — що показуємо, які кнопки активні, чи можна закрити модалку.</li>
        <li>Заборонити повторний сабміт у <code>submitting</code>/<code>confirming</code> (disable + guard).</li>
      </ul>
      <h3>Токенізація і безпека</h3>
      <ul class="list">
        <li>Дані картки <strong>ніколи</strong> не торкаються нашого бекенду: Stripe Elements / hosted fields → PaymentMethod token на клієнті.</li>
        <li>PCI-скоуп мінімальний; наш сервер оперує лише токенами й <code>PaymentIntent</code>.</li>
      </ul>
      <h3>Idempotency</h3>
      <ul class="list">
        <li>Клієнт генерує <code>idempotencyKey</code> (UUID) <em>один раз на спробу оплати</em>, шле з кожним ретраєм того самого запиту.</li>
        <li>Сервер + провайдер за цим ключем не створюють другий charge — захист від подвійного кліку, реконекту, ретраю після таймауту.</li>
      </ul>
      <h3>3D Secure / SCA</h3>
      <ul class="list">
        <li>Бекенд повертає <code>requires_action</code> → клієнт викликає <code>stripe.confirmCardPayment</code> (модалка банку) → повторне підтвердження на бекенді.</li>
        <li>Обробити всі гілки: успіх, відмова банку, таймаут, закриття вікна користувачем.</li>
      </ul>
      <h3>Надійність результату</h3>
      <ul class="list">
        <li>Джерело істини про оплату — <strong>webhook</strong> від провайдера на бекенд, не відповідь у браузері (користувач міг закрити вкладку).</li>
        <li>Клієнт після оплати полить статус підписки / чекає push; показує «оплата обробляється», якщо webhook ще не прийшов.</li>
        <li>Екран успіху — тільки коли підписка реально активна на бекенді.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Три речі, які мусиш назвати:</strong> idempotency key на спробу, токенізація на клієнті (картка не йде на наш сервер), webhook як джерело істини про результат.</li>
      <li>Явна машина станів для 3DS — покажи, що продумав <code>requires_action</code> і всі гілки відмов/таймаутів.</li>
      <li>Трейд-оф: показувати успіх одразу по відповіді браузера = швидше, але ризик «фантомного» успіху; чекати webhook = надійніше, але потрібен проміжний стан «обробляється».</li>
    </ul>`,
  },
  {
    id: 'design-onboarding-wizard',
    title: 'Onboarding wizard',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'low',
    tags: ['state machine', 'persistence', 'analytics', 'forms'],
    prompt: `<p><strong>Сценарій:</strong> багатокроковий онбординг (5–8 кроків): профіль, налаштування, запрошення команди, інтеграції. Користувач може вийти й повернутись, кроки залежать від попередніх відповідей.</p>
      <p><strong>Що уточнити:</strong> чи можна пропускати кроки, чи гілкується флоу, де зберігати прогрес (сервер/локально), A/B тести кроків, мобільна версія.</p>`,
    solution: `<h3>Модель флоу</h3>
      <ul class="list">
        <li><strong>Стейт-машина / граф кроків</strong>, а не масив із індексом: наступний крок — функція від зібраних відповідей (гілкування: «я соло» → пропустити «запросити команду»).</li>
        <li>Декларативний опис: <code>steps[]</code> з <code>id</code>, <code>canEnter(answers)</code>, <code>next(answers)</code>, <code>optional</code>.</li>
        <li>Кожен крок — самодостатній компонент; wizard-контейнер керує навігацією й прогресом.</li>
      </ul>
      <h3>Персист прогресу</h3>
      <ul class="list">
        <li>Зберігати відповіді <strong>інкрементально на сервер</strong> після кожного кроку (PATCH) — щоб повернення з іншого пристрою продовжило з того ж місця.</li>
        <li>Локальний чернетковий кеш (localStorage) як буфер на випадок офлайну / перезавантаження.</li>
        <li>При вході рахувати «де користувач зупинився» з серверного стану.</li>
      </ul>
      <h3>Валідація й UX</h3>
      <ul class="list">
        <li>Валідація на рівні кроку перед <code>next()</code>; не блокувати «Назад».</li>
        <li>Індикатор прогресу (крок N з M, де M — динамічний через гілкування).</li>
        <li>Дозволити «зробити пізніше» для optional-кроків із нагадуванням.</li>
        <li>Deep-link на конкретний крок (для листів «завершіть налаштування»).</li>
      </ul>
      <h3>Аналітика</h3>
      <ul class="list">
        <li>Події: <code>step_viewed</code>, <code>step_completed</code>, <code>step_skipped</code>, <code>wizard_abandoned</code> — з <code>stepId</code> і часом.</li>
        <li>Це дає воронку: де відвалюються → що спрощувати.</li>
        <li>A/B: варіант кроку як частина конфіга флоу, щоб не форкати логіку.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Головна теза:</strong> флоу — це граф/стейт-машина, керована відповідями, а не лінійний масив. Це відповідає на «кроки залежать від попередніх».</li>
      <li>Інкрементальний персист на сервер + локальний буфер — щоб «вийшов і повернувся» працювало між пристроями.</li>
      <li>Аналітика по кроках = воронка abandonment; згадай це, це product-thinking.</li>
      <li>Трейд-оф: зберігати після кожного кроку = більше запитів, але не втрачаємо прогрес; зберігати в кінці = простіше, але ризиковано.</li>
    </ul>`,
  },
  {
    id: 'design-design-system-component',
    title: 'Компонент дизайн-системи',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'low',
    tags: ['design system', 'a11y', 'API design', 'composition'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй переюзабельний компонент дизайн-системи (напр. <code>Button</code> або <code>Select</code>), яким користуватимуться десятки команд.</p>
      <p><strong>Що уточнити:</strong> який саме компонент, які варіанти/розміри, контрольований чи ні, SSR, темізація, цільові фреймворки, рівень кастомізації.</p>`,
    solution: `<h3>API дизайн</h3>
      <ul class="list">
        <li><strong>Варіанти через пропси</strong> (<code>variant</code>, <code>size</code>, <code>tone</code>) — обмежений enum, не «бульбашка булевих» (<code>isPrimary</code>, <code>isLarge</code>, <code>isDanger</code>…).</li>
        <li>Прокидати <code>...rest</code> на кореневий елемент + <code>ref</code> forwarding — щоб не блокувати <code>aria-*</code>, <code>data-*</code>, обробники.</li>
        <li>Для складних — <strong>compound components</strong> (<code>Select</code>, <code>Select.Option</code>) або headless + стилі окремо.</li>
        <li>Контрольований і неконтрольований режими (<code>value</code>/<code>defaultValue</code> + <code>onChange</code>).</li>
        <li><code>asChild</code> / polymorphic <code>as</code> для рендеру як інший елемент (<code>Button</code> як <code>&lt;a&gt;</code>).</li>
      </ul>
      <h3>Доступність (не опційно)</h3>
      <ul class="list">
        <li>Правильна семантика (<code>&lt;button&gt;</code>, не <code>&lt;div onClick&gt;</code>); фокус-стилі; keyboard-навігація за WAI-ARIA APG.</li>
        <li><code>Select</code>: <code>role</code>, <code>aria-expanded</code>, <code>aria-activedescendant</code>, typeahead, Esc, focus-trap у меню.</li>
        <li>Тести a11y (axe) у CI; перевірка контрасту токенів.</li>
      </ul>
      <h3>Темізація і стилі</h3>
      <ul class="list">
        <li>Дизайн-токени через CSS-змінні → темізація без re-build, підтримка dark mode.</li>
        <li>Ізоляція стилів (CSS Modules / vanilla-extract / CSS-in-JS з SSR); не протікати в глобал.</li>
        <li>Слоти для кастомних класів (<code>className</code> merge), але без можливості зламати layout.</li>
      </ul>
      <h3>Якість і DX</h3>
      <ul class="list">
        <li>Строга типізація пропсів; JSDoc; Storybook із усіма станами.</li>
        <li>Візуальні регрес-тести (Chromatic); unit на поведінку/a11y.</li>
        <li>Семвер + changelog; codemod'и для breaking changes.</li>
        <li>Bundle: tree-shakeable, мінімум залежностей, <code>"sideEffects": false</code>.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Опорні тези:</strong> обмежені enum-варіанти замість булевих прапорців, ref-forwarding + <code>...rest</code>, a11y за APG як вимога, токени через CSS-змінні.</li>
      <li>Для складних компонентів згадай headless / compound — це показує зрілість у композиції.</li>
      <li>DX-частина (Storybook, візуальні тести, семвер, codemods) відрізняє «компонент» від «дизайн-системи, якою користуються десятки команд».</li>
      <li>Трейд-оф: більше точок кастомізації = гнучкіше, але легше зламати консистентність і важче підтримувати.</li>
    </ul>`,
  },
  {
    id: 'design-news-feed-ui',
    title: 'Стрічка новин (feed)',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'high',
    tags: ['feed', 'pagination', 'fan-out', 'real-time', 'optimistic'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй фронтенд нескінченної стрічки (пости, лайки, коментарі, оновлення в реальному часі).</p>
      <p><strong>Що уточнити:</strong> обсяг (скільки постів/сесія), джерело сортування (хронологія чи ранжування), наскільки «real-time» (нові пости зверху одразу?), медіа у постах, офлайн-перегляд, скільки фоловерів у типового автора.</p>`,
    solution: `<h3>Завантаження та пагінація</h3>
      <ul class="list">
        <li><strong>Cursor/keyset-пагінація</strong> (не offset) — стабільна під конкурентними вставками; курсор = <code>(rank_or_time, id)</code> останнього елемента.</li>
        <li><code>IntersectionObserver</code>-sentinel за 1-2 екрани до кінця → префетч наступної сторінки.</li>
        <li>Кеш сторінок у пам'яті (TanStack Query <code>useInfiniteQuery</code>); не тримати весь список у DOM — <strong>віртуалізація</strong> (react-virtuoso) для довгих сесій.</li>
        <li>Скидання/збереження позиції скролу при поверненні на стрічку (scroll restoration).</li>
      </ul>
      <h3>Real-time оновлення</h3>
      <ul class="list">
        <li>Нові пости не «встрибують» у в'юпорт — банер «N нових постів ↑», вставка по кліку (інакше збиває читання й скрол).</li>
        <li>Транспорт: SSE або WS-канал «нові події для стрічки X»; лічильник нових — з polling як fallback.</li>
        <li>Лайки/коментарі інших користувачів — патч у кеш за <code>postId</code>, не повний refetch.</li>
      </ul>
      <h3>Взаємодія (лайк, коментар)</h3>
      <ul class="list">
        <li><strong>Optimistic update</strong> з rollback; дедаунс швидких повторних кліків; ідемпотентність на сервері за <code>(userId, postId)</code>.</li>
        <li>Коментарі — окрема пагінована під-стрічка, лінива підвантажка.</li>
      </ul>
      <h3>Backend-дотик (згадати)</h3>
      <ul class="list">
        <li><strong>Fan-out on write</strong> (матеріалізована стрічка на фоловера) — швидке читання, дороге писання, проблема «зірок».</li>
        <li><strong>Fan-out on read</strong> — дешеве писання, збірка стрічки в запиті.</li>
        <li>Практика — гібрид: push для звичайних авторів, pull для мільйонників, злиття на BFF/клієнті.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Опорні тези:</strong> cursor-пагінація, віртуалізація, банер «нові пости» замість автоскролу, optimistic-лайки з ідемпотентністю, патчі в кеш замість refetch.</li>
      <li>Головний trade-off, який хоче почути інтерв'юер — <strong>fan-out on write vs on read</strong> і гібрид.</li>
      <li>Трейд-оф UX: агресивний real-time = «живо», але збиває читання; консервативний = спокійніше, але стрічка «застигла».</li>
    </ul>`,
  },
  {
    id: 'design-collab-editor',
    title: 'Спільний редактор (CRDT/OT, presence)',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'mid',
    tags: ['CRDT', 'OT', 'WebSocket', 'offline', 'presence'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй спільне редагування документа в реальному часі (кілька курсорів, presence, офлайн).</p>
      <p><strong>Що уточнити:</strong> тип контенту (простий текст / rich-text / канва), скільки одночасних редакторів, чи потрібен повний офлайн, історія версій, дозволи (viewer/editor/comment).</p>`,
    solution: `<h3>Модель конкурентних правок</h3>
      <ul class="list">
        <li><strong>CRDT</strong> (Yjs, Automerge) — правки комутативні, зливаються без центрального арбітра; чудово для p2p та офлайну; ціна — метадані (tombstones), розмір документа.</li>
        <li><strong>OT</strong> (як у Google Docs) — компактніше, але потрібен розумний сервер, що трансформує операції відносно одна одної; складніше реалізувати правильно.</li>
        <li>Для більшості нових продуктів — CRDT (Yjs) через готову екосистему й офлайн «з коробки».</li>
      </ul>
      <h3>Транспорт і сервер</h3>
      <ul class="list">
        <li>WebSocket-канал на документ; сервер — реле оновлень + періодичні <strong>снапшоти</strong> (щоб новий клієнт не програвав тисячі дельт).</li>
        <li>Sticky-роутинг з'єднань документа на одну ноду або спільна pub/sub-шина між нодами.</li>
        <li>Дозволи перевіряються на сервері при кожному застосуванні операції, не лише в UI.</li>
      </ul>
      <h3>Presence і курсори</h3>
      <ul class="list">
        <li>Окремий ефемерний канал (Yjs <em>awareness</em>): позиція курсора, виділення, ім'я, колір; TTL — зникає при відпадінні.</li>
        <li>Throttle оновлень курсора (~50-100 мс), інтерполяція руху.</li>
      </ul>
      <h3>Офлайн</h3>
      <ul class="list">
        <li>Локальна persist (IndexedDB); правки в офлайні застосовуються локально, синхронізуються при поверненні мережі — CRDT зливає без конфлікт-діалогів.</li>
        <li>Індикатор стану синхронізації; обмеження на розмір несинхронізованих змін.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Опорні тези:</strong> CRDT vs OT і чому CRDT для нового продукту; снапшоти + дельти; awareness-канал окремо від документа; IndexedDB для офлайну.</li>
      <li>Трейд-оф: CRDT простіший у злитті й офлайні, але важчий за метаданими; OT компактніший ціною складного сервера.</li>
      <li>Згадай історію версій (періодичні іменовані снапшоти) і дозволи на рівні сервера.</li>
    </ul>`,
  },
  {
    id: 'design-notifications-center',
    title: 'Центр сповіщень',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'mid',
    tags: ['real-time', 'WebSocket', 'read-state', 'sync', 'badge'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй центр сповіщень (дзвіночок з лічильником, список, «прочитано», push).</p>
      <p><strong>Що уточнити:</strong> типи сповіщень, обсяг на користувача, крос-девайс синхронізація read-state, web push / email, групування («5 людей лайкнули»), retention.</p>`,
    solution: `<h3>Доставка й лічильник</h3>
      <ul class="list">
        <li>WS/SSE-канал «нові сповіщення»; <code>unreadCount</code> приходить окремо й оновлюється інкрементально.</li>
        <li>Fallback — polling лічильника раз на 30-60с; при фокусі вкладки — одразу.</li>
        <li>Web Push (Service Worker) для сповіщень поза вкладкою; дедуплікація з in-app доставкою за <code>notificationId</code>.</li>
      </ul>
      <h3>Read-state і синхронізація</h3>
      <ul class="list">
        <li>Read-state — <strong>на сервері</strong>, не лише локально: прочитав на телефоні → на десктопі лічильник теж впав.</li>
        <li>Операції: <code>markRead(ids)</code>, <code>markAllRead(before: timestamp)</code>; optimistic у UI, підтвердження від сервера.</li>
        <li>WS-подія <code>read-state-changed</code> на інші сесії того ж користувача.</li>
      </ul>
      <h3>Список і групування</h3>
      <ul class="list">
        <li>Cursor-пагінація; groupування схожих подій на бекенді або на клієнті («X та ще 4»).</li>
        <li>Віртуалізація для довгих списків; ліниве підвантаження при скролі.</li>
      </ul>
      <h3>Edge cases</h3>
      <ul class="list">
        <li>Race: сповіщення прийшло по WS одночасно з push — дедуп за id.</li>
        <li>Лічильник розсинхронився → періодична звірка з сервером (source of truth).</li>
        <li>Дуже старі непрочитані → cap на відображуваний лічильник («99+»).</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Опорні тези:</strong> read-state на сервері + крос-девайс sync, окремий <code>unreadCount</code>, дедуп in-app vs push, optimistic mark-read.</li>
      <li>Трейд-оф: тримати повний список у клієнті — швидко, але дорого по пам'яті; тягнути по сторінках — економно, але лічильник треба рахувати окремо.</li>
      <li>Згадай періодичну звірку лічильника як захист від розсинхрону.</li>
    </ul>`,
  },
  {
    id: 'design-large-dashboard',
    title: 'Дашборд із 50+ віджетів',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'mid',
    tags: ['dashboard', 'batching', 'virtualization', 'error boundary', 'BFF'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй дашборд, де на екрані десятки незалежних віджетів (графіки, KPI, таблиці), кожен зі своїм джерелом даних.</p>
      <p><strong>Що уточнити:</strong> хто користувач, кількість віджетів, наскільки «живі» дані (real-time чи оновлення раз на N хв), конфігурованість (drag-and-drop розкладка), історична глибина.</p>`,
    solution: `<h3>Уникнути водоспаду 50 запитів</h3>
      <ul class="list">
        <li><strong>Батчинг</strong>: <code>POST /dashboard/batch</code> з переліком віджетів у в'юпорті → одна відповідь; або GraphQL — один запит із фрагментами.</li>
        <li><strong>Lazy-mount</strong> за <code>IntersectionObserver</code>: віджети поза екраном не роблять запит, поки не наблизяться.</li>
        <li>Спільні довідники (список проєктів, юзерів) — один запит, шаринг через кеш за ключем.</li>
        <li>Пріоритезація: критичні KPI спочатку, важкі графіки — потоково/відкладено.</li>
      </ul>
      <h3>Ізоляція відмов</h3>
      <ul class="list">
        <li>Кожен віджет — <strong>error boundary</strong> + власний skeleton; падіння одного не роняє дашборд.</li>
        <li>Часткова відповідь батчу: віджет A — дані, віджет B — помилка → рендеримо A, показуємо retry на B.</li>
      </ul>
      <h3>Продуктивність рендеру</h3>
      <ul class="list">
        <li>Мемоізація віджетів (<code>React.memo</code> + стабільні пропси); важкі чарти — <code>lazy</code> + code-split бібліотеки візуалізації.</li>
        <li>Оновлення даних — патч у стор конкретного віджета, без ре-рендеру решти.</li>
        <li>Real-time — один WS/SSE-канал на дашборд, роздача патчів по <code>widgetId</code> (не канал на віджет).</li>
      </ul>
      <h3>Конфігурованість</h3>
      <ul class="list">
        <li>Розкладка (позиції, розміри) — окремий легкий запит; зміни зберігаються debounced.</li>
        <li>Реєстр типів віджетів (<code>type → компонент + схема запиту</code>) — розширюваність без правки ядра.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Опорні тези:</strong> батч-запит через BFF, lazy-mount за в'юпортом, error boundary на кожен віджет, один real-time канал на дашборд.</li>
      <li>Трейд-оф: батчинг зменшує round-trips, але робить кеш грубішим (уся відповідь інвалідовується разом) — можна дробити батчі за пріоритетом.</li>
      <li>Згадай реєстр типів віджетів як спосіб масштабувати без переписування ядра.</li>
    </ul>`,
  },
  {
    id: 'design-offline-first-pwa',
    title: 'Offline-first PWA',
    level: 'Senior',
    topic: 'System Design',
    format: 'discussion',
    priority: 'low',
    tags: ['PWA', 'service worker', 'IndexedDB', 'background sync', 'conflict'],
    prompt: `<p><strong>Сценарій:</strong> спроєктуй застосунок, що повноцінно працює офлайн (перегляд + створення/редагування), із синхронізацією при поверненні мережі.</p>
      <p><strong>Що уточнити:</strong> які дані потрібні офлайн (усі чи «мої»), обсяг, чи можливе редагування тих самих записів кількома пристроями, критичність втрати даних, платформи.</p>`,
    solution: `<h3>Шар кешу й даних</h3>
      <ul class="list">
        <li><strong>Service Worker</strong>: app shell — cache-first (immutable-ассети за хешем); API-читання — stale-while-revalidate; навігація — network-first з офлайн-fallback-сторінкою.</li>
        <li><strong>IndexedDB</strong> — локальна «база»: сутності + черга незастосованих мутацій (outbox pattern).</li>
        <li>UI читає завжди з локального шару; мережа лише оновлює його — тоді офлайн/онлайн виглядають однаково.</li>
      </ul>
      <h3>Синхронізація мутацій</h3>
      <ul class="list">
        <li>Кожна мутація → запис в outbox з <code>clientMutationId</code> (ідемпотентність) і базовою версією запису.</li>
        <li><strong>Background Sync API</strong> (або retry при <code>online</code>-евенті) розгрібає чергу по порядку.</li>
        <li>Сервер відхиляє застарілу базову версію → клієнт отримує 409 і запускає resolve.</li>
      </ul>
      <h3>Конфлікти</h3>
      <ul class="list">
        <li>Last-write-wins — просто, але втрачає зміни; годиться для некритичних полів.</li>
        <li>Field-level merge — зливати незалежні поля; конфлікт лише на тому самому полі.</li>
        <li>CRDT — для складного спільного контенту (нотатки, списки).</li>
        <li>Ручний resolve-UI — коли автоматика небезпечна (гроші, критичні дані).</li>
      </ul>
      <h3>UX</h3>
      <ul class="list">
        <li>Явний індикатор: онлайн / офлайн / N змін очікують синхронізації.</li>
        <li>Оптимістичні зміни позначені («буде синхронізовано»); заборона дій, що потребують сервера (оплата).</li>
        <li>Оновлення SW — банер «доступна нова версія», не примусовий релоуд.</li>
      </ul>`,
    explanation: `<ul class="list">
      <li><strong>Опорні тези:</strong> UI читає з локального шару, outbox pattern + <code>clientMutationId</code>, Background Sync, стратегія конфліктів під тип даних.</li>
      <li>Трейд-оф: повний офлайн усіх даних = складна синхронізація й місце на диску; офлайн лише «моїх» даних — простіше й зазвичай достатньо.</li>
      <li>Згадай версіонування записів (optimistic concurrency) як основу виявлення конфліктів.</li>
    </ul>`,
  },
]
