// AUTO-GENERATED from CheetSheet/architecture/{index,cheatsheet}.html.
// Prose preserved as sanitized HTML blocks (styled via .cheat-prose) +
// extracted code blocks. Re-running the parser overwrites this file.
import type { TopicContent } from './types'

export const architectureContent: TopicContent = {
  "slug": "architecture",
  "sections": [
    {
      "id": "solid-principles",
      "title": "🧱 SOLID Principles",
      interviewQuestions: [
        {
          "question": "Наведи приклад порушення Single Responsibility у типовому React/Angular-компоненті, який ти реально бачив у продакшн-коді.",
          "answer": "Компонент, що одночасно робить fetch даних, форматує їх для відображення, і рендерить UI — «God component». Зміна формату API (причина №1) чи зміна дизайну (причина №2) обидві вимагають правки одного файлу, хоча це не пов'язані причини змін. Розв'язання — винести fetch у хук/сервіс, форматування в утиліту, залишивши компонент відповідальним лише за рендер."
        },
        {
          "question": "Чим Dependency Inversion відрізняється від простого «переданого через props сервісу», і чому це не одне й те саме?",
          "answer": "Dependency Inversion — залежність від <strong>абстракції</strong> (інтерфейсу), а не від конкретної реалізації; сам факт передачі об'єкта через props не гарантує інверсію, якщо компонент типізований під конкретний клас, а не інтерфейс. Справжня інверсія дозволяє підмінити реалізацію (мок у тестах, інший провайдер оплати) без зміни коду компонента, що її споживає."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n    <div class=\"card\"><h4>S — Single Responsibility</h4>\n      <p>Клас/функція має одну причину для зміни. Компонент або рендерить, або фетчить, або керує станом — не все разом.</p>\n      <pre style=\"font-size:10.5px\"><span class=\"cmt\">// ❌ God component</span>\n<span class=\"kw\">function</span> <span class=\"fn\">UserPage</span>() { <span class=\"cmt\">/* fetch + format + render */</span> }\n\n<span class=\"cmt\">// ✅ Split</span>\n<span class=\"kw\">function</span> <span class=\"fn\">useUser</span>() { <span class=\"cmt\">/* fetch */</span> }\n<span class=\"kw\">function</span> <span class=\"fn\">UserCard</span>({ user }) { <span class=\"cmt\">/* render */</span> }</pre>\n    </div>\n    <div class=\"card blue\"><h4>O — Open/Closed</h4>\n      <p>Відкритий для розширення, закритий для модифікації. Composition over modification.</p>\n      <pre style=\"font-size:10.5px\"><span class=\"cmt\">// ❌ if/else для кожного типу</span>\n<span class=\"cmt\">// ✅ Plugin pattern / Strategy</span>\n<span class=\"kw\">const</span> renderers = {\n  circle: CircleRenderer,\n  rect: RectRenderer\n};\nrenderers[shape.type]?.(<span class=\"fn\">render</span>);</pre>\n    </div>\n    <div class=\"card green\"><h4>L — Liskov Substitution</h4>\n      <p>Дочірній тип має бути замінним на батьківський без порушення логіки. Уникай override що змінює поведінку.</p>\n    </div>\n    <div class=\"card yellow\"><h4>I — Interface Segregation</h4>\n      <p>Краще кілька специфічних інтерфейсів ніж один загальний. Компоненти не мають залежати від props що не використовують.</p>\n    </div>\n    <div class=\"card red\" style=\"grid-column: span 2\"><h4>D — Dependency Inversion</h4>\n      <p>Залежати від абстракцій, не від конкретних реалізацій. Передавай сервіси через props/context/inject(), не імпортуй напряму.</p>\n      <pre style=\"font-size:10.5px\"><span class=\"cmt\">// ❌ Конкретна залежність</span>\n<span class=\"kw\">import</span> { StripePayment } <span class=\"kw\">from</span> <span class=\"str\">'./stripe'</span>;\n\n<span class=\"cmt\">// ✅ Абстракція</span>\n<span class=\"kw\">interface</span> PaymentProvider { <span class=\"fn\">charge</span>(amount: <span class=\"type\">number</span>): Promise&lt;<span class=\"type\">void</span>&gt; }\n<span class=\"kw\">function</span> <span class=\"fn\">Checkout</span>({ payment }: { payment: PaymentProvider }) { ... }</pre>\n    </div>\n  </div>"
        }
      ]
    },
    {
      "id": "design-patterns-у-frontend",
      "title": "🎨 Design Patterns у Frontend",
      interviewQuestions: [
        {
          "question": "Коли Factory Pattern виправданий у фронтенд-коді, а коли це зайва абстракція над простим <code>new</code>?",
          "answer": "Factory виправдана, коли логіка створення об'єкта нетривіальна й може змінюватись (вибір конкретного класу залежно від runtime-умови, як у прикладі з <code>createUser(role)</code>), або коли створення потрібно замокати в тестах. Якщо об'єкт завжди створюється однаково без варіативності — обгортання в фабрику лише додає непотрібний рівень непрямоти."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Functional Patterns</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// Composition (compose / pipe)</span>\n<span class=\"kw\">const</span> pipe = (...fns) => x => fns.<span class=\"fn\">reduce</span>((v, f) => <span class=\"fn\">f</span>(v), x);\n\n<span class=\"kw\">const</span> process = <span class=\"fn\">pipe</span>(\n  <span class=\"fn\">validate</span>,\n  <span class=\"fn\">normalize</span>,\n  <span class=\"fn\">transform</span>\n);\n<span class=\"fn\">process</span>(rawData);</pre>\n    <pre><span class=\"cmt\">// Currying</span>\n<span class=\"kw\">const</span> multiply = (a: <span class=\"type\">number</span>) => (b: <span class=\"type\">number</span>) => a * b;\n<span class=\"kw\">const</span> double = <span class=\"fn\">multiply</span>(<span class=\"num\">2</span>);\n<span class=\"fn\">double</span>(<span class=\"num\">5</span>); <span class=\"cmt\">// 10</span>\n\n<span class=\"cmt\">// Partial application</span>\n<span class=\"kw\">const</span> addTax = (rate: <span class=\"type\">number</span>, price: <span class=\"type\">number</span>) => price * (<span class=\"num\">1</span> + rate);\n<span class=\"kw\">const</span> addUkrTax = addTax.<span class=\"fn\">bind</span>(<span class=\"kw\">null</span>, <span class=\"num\">0.2</span>);\n<span class=\"fn\">addUkrTax</span>(<span class=\"num\">100</span>); <span class=\"cmt\">// 120</span></pre>\n  </div><h3 class=\"topic\">Observer / Pub-Sub / EventEmitter</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Minimal EventEmitter\nclass EventBus {\n  private listeners = new Map<string, Set<Function>>();\n  on(event: string, fn: Function) {\n    if (!this.listeners.has(event)) this.listeners.set(event, new Set());\n    this.listeners.get(event)!.add(fn);\n    return () => this.off(event, fn);  // unsubscribe fn\n  }\n  off(event: string, fn: Function) { this.listeners.get(event)?.delete(fn); }\n  emit(event: string, data?: unknown) { this.listeners.get(event)?.forEach(fn => fn(data)); }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Factory Pattern</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Замість new MyClass() напряму\nfunction createUser(role: 'admin' | 'viewer'): User {\n  const base = { id: generateId(), createdAt: new Date() };\n  if (role === 'admin') return { ...base, permissions: ['read', 'write', 'delete'] };\n  return { ...base, permissions: ['read'] };\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Strategy Pattern</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "interface SortStrategy { sort<T>(arr: T[]): T[]; }\n\nclass DataGrid {\n  constructor(private strategy: SortStrategy) {}\n  setStrategy(s: SortStrategy) { this.strategy = s; }\n  render<T>(data: T[]) { return this.strategy.sort(data); }\n}\n// Swap algorithm без зміни DataGrid → Open/Closed"
        }
      ]
    },
    {
      "id": "state-management-decision-matrix",
      "title": "📊 State Management — Decision Matrix",
      interviewQuestions: [
        {
          "question": "За якими критеріями ти обираєш між локальним <code>useState</code>, підняттям стану вгору, Context і зовнішнім стором (Zustand/Redux)?",
          "answer": "Локальний <code>useState</code> — якщо стан потрібен лише одному компоненту. Підняття вгору — якщо потрібен кільком сусіднім компонентам з одним спільним предком і рідко змінюється. Context — для рідко змінюваних, широко розповсюджених даних (тема, локаль, автентифікований користувач). Зовнішній стор — коли стан складний, часто змінюється, потрібен поза деревом React, або потрібна селективна підписка без ре-рендеру всього піддерева."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Типи state <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card\"><h4>🖥️ Server State</h4>\n      <ul class=\"list\">\n        <li>Живе на сервері, кешується локально</li>\n        <li>Асинхронне, може бути stale</li>\n        <li>Потребує sync, refetching, invalidation</li>\n        <li><strong>Інструмент: TanStack Query / SWR</strong></li>\n      </ul>\n    </div>\n    <div class=\"card blue\"><h4>💾 Client State</h4>\n      <ul class=\"list\">\n        <li>UI state (modal open, sidebar collapsed)</li>\n        <li>User preferences, form state</li>\n        <li>Синхронне, локальне</li>\n        <li><strong>Інструмент: useState / Zustand / Context</strong></li>\n      </ul>\n    </div>\n  </div><h3 class=\"topic\">Коли і що використовувати</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Ситуація</th><th>Рішення</th><th>Чому</th></tr>\n      <tr><td>Локальний UI state (1-2 компоненти)</td><td>useState</td><td>Найпростіше, не потрібно більше</td></tr>\n      <tr><td>Складний пов'язаний state</td><td>useReducer</td><td>Передбачувані transitions</td></tr>\n      <tr><td>Props drilling 3+ рівні</td><td>Context або Zustand</td><td>Context якщо рідко змінюється, Zustand якщо часто</td></tr>\n      <tr><td>Глобальний часто змінний state</td><td>Zustand</td><td>Гранулярні selectors, без Context re-render проблем</td></tr>\n      <tr><td>Серверні дані</td><td>TanStack Query</td><td>Кеш, refetch, deduplicate, stale-while-revalidate</td></tr>\n      <tr><td>Complex workflows / undo-redo</td><td>Redux Toolkit</td><td>DevTools, time-travel, middleware ecosystem</td></tr>\n      <tr><td>Atomic state (Recoil-like)</td><td>Jotai</td><td>Fine-grained atoms, чудово для форм</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Optimistic Updates pattern</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Принцип: оновити UI одразу, rollback якщо помилка\nasync function toggleLike(postId: string) {\n  // 1. Зберегти поточний стан\n  const prev = queryClient.getQueryData(['posts', postId]);\n  \n  // 2. Оновити оптимістично\n  queryClient.setQueryData(['posts', postId], old => ({ ...old, liked: !old.liked }));\n  \n  try {\n    await api.toggleLike(postId);     // 3. Реальний запит\n  } catch {\n    queryClient.setQueryData(['posts', postId], prev); // 4. Rollback\n  }\n}"
        }
      ]
    },
    {
      "id": "component-design",
      "title": "🧩 Component Design",
      interviewQuestions: [
        {
          "question": "Чим «розумні» (container) і «дурні» (presentational) компоненти відрізняються, і чи актуальний цей поділ у епоху хуків?",
          "answer": "Container-компоненти керують станом і логікою (fetch, обробники), presentational — лише відображають дані через props без власного стану. З хуками ця межа частіше проводиться не між компонентами, а між компонентом і custom hook — логіка виноситься в хук, компонент лишається переважно presentational, тому фізичне розділення на два файли/компоненти менш обов'язкове, ніж раніше, але принцип поділу відповідальностей лишається актуальним."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Smart vs Presentational (Container/Dumb)</h3><div class=\"grid2\">\n    <div class=\"card green\"><h4>✅ Presentational (Dumb)</h4>\n      <ul class=\"list\">\n        <li>Тільки props → UI</li>\n        <li>Без прямих API calls / store</li>\n        <li>Легко тестувати (pure render)</li>\n        <li>Reusable у Storybook</li>\n      </ul>\n    </div>\n    <div class=\"card blue\"><h4>Container (Smart)</h4>\n      <ul class=\"list\">\n        <li>Знає про store, API, router</li>\n        <li>Передає data і callbacks у Dumb</li>\n        <li>Може бути async (Server Components)</li>\n        <li>Не реusable, але легко замінити</li>\n      </ul>\n    </div>\n  </div><div class=\"alert good\">\n    <span class=\"icon\">💡</span>\n    <span><strong>Сучасний підхід:</strong> \"Smart/Dumb\" — не жорстке правило. Добре мати Dumb leaf components і Smart/Container ближче до route рівня. Але hooks дозволяють \"Smart\" логіку без \"Smart\" component обгортки.</span>\n  </div><h3 class=\"topic\">Composition over Props Drilling</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// ❌ Prop drilling</span>\n<span class=\"kw\">function</span> <span class=\"fn\">App</span>() {\n  <span class=\"kw\">return</span> &lt;<span class=\"fn\">Page</span> user={user} /&gt;;\n}\n<span class=\"kw\">function</span> <span class=\"fn\">Page</span>({ user }) {\n  <span class=\"kw\">return</span> &lt;<span class=\"fn\">Sidebar</span> user={user} /&gt;;\n}\n<span class=\"kw\">function</span> <span class=\"fn\">Sidebar</span>({ user }) {\n  <span class=\"kw\">return</span> &lt;<span class=\"fn\">Avatar</span> user={user} /&gt;;  <span class=\"cmt\">// прокидаємо через 3 рівні</span>\n}</pre>\n    <pre><span class=\"cmt\">// ✅ Composition</span>\n<span class=\"kw\">function</span> <span class=\"fn\">App</span>() {\n  <span class=\"kw\">return</span> (\n    &lt;<span class=\"fn\">Page</span>&gt;\n      &lt;<span class=\"fn\">Sidebar</span>&gt;\n        &lt;<span class=\"fn\">Avatar</span> user={user} /&gt;  <span class=\"cmt\">// знає про user</span>\n      &lt;/<span class=\"fn\">Sidebar</span>&gt;\n    &lt;/<span class=\"fn\">Page</span>&gt;\n  );\n}\n<span class=\"cmt\">// Page і Sidebar приймають children</span></pre>\n  </div><h3 class=\"topic\">Feature-based vs Layer-based структура</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// ✅ Feature-based (рекомендовано)</span>\nsrc/\n  features/\n    auth/\n      components/\n      hooks/\n      api/\n      store/\n    dashboard/\n      ...\n    products/\n      ...\n  shared/        <span class=\"cmt\">← cross-feature utilities</span>\n    ui/\n    utils/</pre>\n    <pre><span class=\"cmt\">// Layer-based (заплутується зі зростанням)</span>\nsrc/\n  components/    <span class=\"cmt\">← всі компоненти разом</span>\n  hooks/         <span class=\"cmt\">← всі hooks</span>\n  services/      <span class=\"cmt\">← всі API calls</span>\n  store/         <span class=\"cmt\">← весь state</span>\n<span class=\"cmt\">// При зміні фічі — правиш 4+ папки</span></pre>\n  </div>"
        }
      ]
    },
    {
      "id": "performance-patterns",
      "title": "⚡ Performance Patterns",
      interviewQuestions: [
        {
          "question": "Які патерни ти застосуєш для оптимізації рендеру великого списку з інтерактивними елементами, окрім <code>React.memo</code>?",
          "answer": "Віртуалізація (рендер лише видимих елементів), мемоізація обробників через <code>useCallback</code> зі стабільними залежностями (щоб не «зривати» <code>memo</code> дочірніх елементів), винесення часто змінюваного стану (наприклад, hover) на рівень окремого елемента замість батьківського списку, і code-splitting важких дочірніх компонентів через <code>lazy</code>/<code>Suspense</code>."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Core Web Vitals</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Метрика</th><th>Що вимірює</th><th>Ціль</th><th>Як покращити</th></tr>\n      <tr><td><strong>LCP</strong> (Largest Contentful Paint)</td><td>Час до largest visible element</td><td>&lt; 2.5s</td><td>Preload fonts/images, SSR, CDN</td></tr>\n      <tr><td><strong>INP</strong> (Interaction to Next Paint)</td><td>Затримка відповіді на взаємодію</td><td>&lt; 200ms</td><td>Defer non-urgent JS, useTransition</td></tr>\n      <tr><td><strong>CLS</strong> (Cumulative Layout Shift)</td><td>Стабільність layout</td><td>&lt; 0.1</td><td>Задавати size для images/video/ads</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Code Splitting стратегії</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Route-based (Next.js — автоматично)\n// React — React.lazy()\nconst Dashboard = React.lazy(() => import('./Dashboard'));\n\n// Component-based (важкі компоненти)\nconst HeavyChart = React.lazy(() => import('./HeavyChart'));\n\n// On interaction\nbutton.addEventListener('click', async () => {\n  const { processData } = await import('./heavy-processing');\n  processData(data);\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Virtual Scrolling — коли потрібно</h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Без virtualization (1000+ items)</h4><p>DOM має тисячі вузлів. Scroll — laggy. Layout thrashing. Memory через дах.</p></div>\n    <div class=\"card green\"><h4>✅ react-virtuoso / react-window</h4><p>Рендерить тільки visible items. DOM — ~20-30 вузлів незалежно від розміру списку.</p></div>\n  </div><h3 class=\"topic\">Layout Thrashing <span class=\"tag tag-pit\">PITFALL</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// ❌ Read → Write → Read → Write (примусові reflow)\nelements.forEach(el => {\n  const h = el.offsetHeight;   // Read — може тригерити reflow\n  el.style.height = h + 'px'; // Write\n});\n\n// ✅ Batch reads, then batch writes\nconst heights = elements.map(el => el.offsetHeight); // All reads\nelements.forEach((el, i) => el.style.height = heights[i] + 'px'); // All writes"
        }
      ]
    },
    {
      "id": "security-basics",
      "title": "🔒 Security Basics",
      interviewQuestions: [
        {
          "question": "Які базові правила безпеки фронтенд-розробник має застосовувати за замовчуванням, не чекаючи на security-рев'ю?",
          "answer": "Ніколи не довіряти вхідним даним користувача при рендері як HTML (уникати <code>dangerouslySetInnerHTML</code>/<code>innerHTML</code> без санітизації), не зберігати чутливі токени в localStorage, валідувати й на клієнті, і на сервері, не покладатись на приховування UI-елементів як механізм авторизації (сервер має перевіряти права незалежно від того, що показано в інтерфейсі)."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"table-wrap\">\n    <table>\n      <tr><th>Вразливість</th><th>Що це</th><th>Захист</th></tr>\n      <tr><td><strong>XSS</strong></td><td>Injection шкідливого JS через user input</td><td>Ніколи dangerouslySetInnerHTML без sanitize. CSP заголовки. React escapes за замовчуванням.</td></tr>\n      <tr><td><strong>CSRF</strong></td><td>Запит від злочинного сайту від імені юзера</td><td>SameSite=Strict cookie. CSRF tokens. Double-submit cookie pattern.</td></tr>\n      <tr><td><strong>Clickjacking</strong></td><td>Прихований iframe поверх сайту</td><td>X-Frame-Options: DENY. CSP frame-ancestors.</td></tr>\n      <tr><td><strong>Sensitive data в URL</strong></td><td>Токени/id в query params → логи/history</td><td>POST body або header. Не передавай секрети в URL.</td></tr>\n      <tr><td><strong>Expose secrets</strong></td><td>API keys в frontend bundle</td><td>Серверні змінні без NEXT_PUBLIC_. Server Actions. Backend proxy.</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Cookie security attributes</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Атрибут</th><th>Що робить</th></tr>\n      <tr><td><code>HttpOnly</code></td><td>Cookie недоступна через JS (document.cookie). Захист від XSS.</td></tr>\n      <tr><td><code>Secure</code></td><td>Передається тільки по HTTPS.</td></tr>\n      <tr><td><code>SameSite=Strict</code></td><td>Не передається з cross-site запитами. Захист від CSRF.</td></tr>\n      <tr><td><code>SameSite=Lax</code></td><td>Дозволяє top-level navigation, блокує XHR/fetch cross-site.</td></tr>\n      <tr><td><code>Partitioned</code></td><td>Third-party cookie ізольована per top-level site (CHIPS).</td></tr>\n    </table>\n  </div>"
        }
      ]
    },
    {
      "id": "quick-interview-answers",
      "title": "🎯 Quick Interview Answers",
      interviewQuestions: [
        {
          "question": "Як коротко й структуровано відповісти на відкрите архітектурне питання типу «як би ти спроєктував систему X» за обмежений час співбесіди?",
          "answer": "Спершу уточнити вимоги й обмеження (30 секунд), потім назвати 2-3 ключові архітектурні рішення з коротким обґрунтуванням «чому», а не намагатись покрити все одразу — глибина в кількох важливих рішеннях цінується вище за поверхневий огляд усієї системи. Закінчити згадкою про очевидні трейд-оффи власного рішення — це показує зрілість, а не лише знання патернів."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Топ питань з архітектури</h3><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як масштабувати React застосунок?</h4>\n    <p>Feature-based структура → Lazy loading → Code splitting по routes → TanStack Query для server state → Zustand для client state → React.memo + селектори де потрібно → Virtualization для великих списків → Monorepо (Turborepo) якщо кілька apps.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Context vs Zustand — коли що?</h4>\n    <p>Context — для рідко змінних даних (theme, locale, auth user). Якщо щось змінюється часто (cart, notifications, real-time) — Zustand, бо Context ре-рендерить всіх споживачів при будь-якій зміні.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як зробити компонент performant?</h4>\n    <p>1) Профайлер спочатку — знайти реальну проблему. 2) State нижче — не піднімай вище ніж потрібно. 3) Composition — Server Components + Client листи. 4) React.memo + useCallback якщо є виміряна проблема. 5) Virtualization для списків 500+.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Що таке hydration mismatch і як уникнути?</h4>\n    <p>Server HTML відрізняється від першого client render. Причини: Date.now(), Math.random(), window checks, user-specific data. Рішення: useEffect для browser-only коду, suppressHydrationWarning для timestamp-like елементів, перевіряти typeof window !== 'undefined'.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як ти організуєш API calls?</h4>\n    <p>Service layer (api/ папка з fetch-функціями) → TanStack Query hooks з queryKey + queryFn → Shared error handling у queryClient → TypeScript типи з бекенду (zod validation або code-gen). Ніяких raw fetch в компонентах.</p>\n  </div><div class=\"card\">\n    <h4>❓ Micro-frontends — коли виправдано?</h4>\n    <p>Різні команди з різними deploy cycles. Legacy migration (поступово). Різні tech stacks. Overhead: bundle duplication, routing complexity, shared state між apps. Альтернатива: Nx monorepo зі shared libraries — часто достатньо.</p>\n  </div>"
        }
      ]
    }
  ]
}

export const architectureCheat: TopicContent = {
  "slug": "architecture",
  "sections": [
    {
      "id": "solid-principles",
      "title": "🧱 SOLID Principles",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n    <div class=\"card\"><h4>S — Single Responsibility</h4>\n      <p>Клас/функція має одну причину для зміни. Компонент або рендерить, або фетчить, або керує станом — не все разом.</p>\n      <pre style=\"font-size:10.5px\"><span class=\"cmt\">// ❌ God component</span>\n<span class=\"kw\">function</span> <span class=\"fn\">UserPage</span>() { <span class=\"cmt\">/* fetch + format + render */</span> }\n\n<span class=\"cmt\">// ✅ Split</span>\n<span class=\"kw\">function</span> <span class=\"fn\">useUser</span>() { <span class=\"cmt\">/* fetch */</span> }\n<span class=\"kw\">function</span> <span class=\"fn\">UserCard</span>({ user }) { <span class=\"cmt\">/* render */</span> }</pre>\n    </div>\n    <div class=\"card blue\"><h4>O — Open/Closed</h4>\n      <p>Відкритий для розширення, закритий для модифікації. Composition over modification.</p>\n      <pre style=\"font-size:10.5px\"><span class=\"cmt\">// ❌ if/else для кожного типу</span>\n<span class=\"cmt\">// ✅ Plugin pattern / Strategy</span>\n<span class=\"kw\">const</span> renderers = {\n  circle: CircleRenderer,\n  rect: RectRenderer\n};\nrenderers[shape.type]?.(<span class=\"fn\">render</span>);</pre>\n    </div>\n    <div class=\"card green\"><h4>L — Liskov Substitution</h4>\n      <p>Дочірній тип має бути замінним на батьківський без порушення логіки. Уникай override що змінює поведінку.</p>\n    </div>\n    <div class=\"card yellow\"><h4>I — Interface Segregation</h4>\n      <p>Краще кілька специфічних інтерфейсів ніж один загальний. Компоненти не мають залежати від props що не використовують.</p>\n    </div>\n    <div class=\"card red\" style=\"grid-column: span 2\"><h4>D — Dependency Inversion</h4>\n      <p>Залежати від абстракцій, не від конкретних реалізацій. Передавай сервіси через props/context/inject(), не імпортуй напряму.</p>\n      <pre style=\"font-size:10.5px\"><span class=\"cmt\">// ❌ Конкретна залежність</span>\n<span class=\"kw\">import</span> { StripePayment } <span class=\"kw\">from</span> <span class=\"str\">'./stripe'</span>;\n\n<span class=\"cmt\">// ✅ Абстракція</span>\n<span class=\"kw\">interface</span> PaymentProvider { <span class=\"fn\">charge</span>(amount: <span class=\"type\">number</span>): Promise&lt;<span class=\"type\">void</span>&gt; }\n<span class=\"kw\">function</span> <span class=\"fn\">Checkout</span>({ payment }: { payment: PaymentProvider }) { ... }</pre>\n    </div>\n  </div>"
        }
      ]
    },
    {
      "id": "design-patterns-у-frontend",
      "title": "🎨 Design Patterns у Frontend",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Functional Patterns</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// Composition (compose / pipe)</span>\n<span class=\"kw\">const</span> pipe = (...fns) => x => fns.<span class=\"fn\">reduce</span>((v, f) => <span class=\"fn\">f</span>(v), x);\n\n<span class=\"kw\">const</span> process = <span class=\"fn\">pipe</span>(\n  <span class=\"fn\">validate</span>,\n  <span class=\"fn\">normalize</span>,\n  <span class=\"fn\">transform</span>\n);\n<span class=\"fn\">process</span>(rawData);</pre>\n    <pre><span class=\"cmt\">// Currying</span>\n<span class=\"kw\">const</span> multiply = (a: <span class=\"type\">number</span>) => (b: <span class=\"type\">number</span>) => a * b;\n<span class=\"kw\">const</span> double = <span class=\"fn\">multiply</span>(<span class=\"num\">2</span>);\n<span class=\"fn\">double</span>(<span class=\"num\">5</span>); <span class=\"cmt\">// 10</span>\n\n<span class=\"cmt\">// Partial application</span>\n<span class=\"kw\">const</span> addTax = (rate: <span class=\"type\">number</span>, price: <span class=\"type\">number</span>) => price * (<span class=\"num\">1</span> + rate);\n<span class=\"kw\">const</span> addUkrTax = addTax.<span class=\"fn\">bind</span>(<span class=\"kw\">null</span>, <span class=\"num\">0.2</span>);\n<span class=\"fn\">addUkrTax</span>(<span class=\"num\">100</span>); <span class=\"cmt\">// 120</span></pre>\n  </div><h3 class=\"topic\">Observer / Pub-Sub / EventEmitter</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Minimal EventEmitter\nclass EventBus {\n  private listeners = new Map<string, Set<Function>>();\n  on(event: string, fn: Function) {\n    if (!this.listeners.has(event)) this.listeners.set(event, new Set());\n    this.listeners.get(event)!.add(fn);\n    return () => this.off(event, fn);  // unsubscribe fn\n  }\n  off(event: string, fn: Function) { this.listeners.get(event)?.delete(fn); }\n  emit(event: string, data?: unknown) { this.listeners.get(event)?.forEach(fn => fn(data)); }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Factory Pattern</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Замість new MyClass() напряму\nfunction createUser(role: 'admin' | 'viewer'): User {\n  const base = { id: generateId(), createdAt: new Date() };\n  if (role === 'admin') return { ...base, permissions: ['read', 'write', 'delete'] };\n  return { ...base, permissions: ['read'] };\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Strategy Pattern</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "interface SortStrategy { sort<T>(arr: T[]): T[]; }\n\nclass DataGrid {\n  constructor(private strategy: SortStrategy) {}\n  setStrategy(s: SortStrategy) { this.strategy = s; }\n  render<T>(data: T[]) { return this.strategy.sort(data); }\n}\n// Swap algorithm без зміни DataGrid → Open/Closed"
        }
      ]
    },
    {
      "id": "state-management-decision-matrix",
      "title": "📊 State Management — Decision Matrix",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Типи state <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n    <div class=\"card\"><h4>🖥️ Server State</h4>\n      <ul class=\"list\">\n        <li>Живе на сервері, кешується локально</li>\n        <li>Асинхронне, може бути stale</li>\n        <li>Потребує sync, refetching, invalidation</li>\n        <li><strong>Інструмент: TanStack Query / SWR</strong></li>\n      </ul>\n    </div>\n    <div class=\"card blue\"><h4>💾 Client State</h4>\n      <ul class=\"list\">\n        <li>UI state (modal open, sidebar collapsed)</li>\n        <li>User preferences, form state</li>\n        <li>Синхронне, локальне</li>\n        <li><strong>Інструмент: useState / Zustand / Context</strong></li>\n      </ul>\n    </div>\n  </div><h3 class=\"topic\">Коли і що використовувати</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Ситуація</th><th>Рішення</th><th>Чому</th></tr>\n      <tr><td>Локальний UI state (1-2 компоненти)</td><td>useState</td><td>Найпростіше, не потрібно більше</td></tr>\n      <tr><td>Складний пов'язаний state</td><td>useReducer</td><td>Передбачувані transitions</td></tr>\n      <tr><td>Props drilling 3+ рівні</td><td>Context або Zustand</td><td>Context якщо рідко змінюється, Zustand якщо часто</td></tr>\n      <tr><td>Глобальний часто змінний state</td><td>Zustand</td><td>Гранулярні selectors, без Context re-render проблем</td></tr>\n      <tr><td>Серверні дані</td><td>TanStack Query</td><td>Кеш, refetch, deduplicate, stale-while-revalidate</td></tr>\n      <tr><td>Complex workflows / undo-redo</td><td>Redux Toolkit</td><td>DevTools, time-travel, middleware ecosystem</td></tr>\n      <tr><td>Atomic state (Recoil-like)</td><td>Jotai</td><td>Fine-grained atoms, чудово для форм</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Optimistic Updates pattern</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Принцип: оновити UI одразу, rollback якщо помилка\nasync function toggleLike(postId: string) {\n  // 1. Зберегти поточний стан\n  const prev = queryClient.getQueryData(['posts', postId]);\n  \n  // 2. Оновити оптимістично\n  queryClient.setQueryData(['posts', postId], old => ({ ...old, liked: !old.liked }));\n  \n  try {\n    await api.toggleLike(postId);     // 3. Реальний запит\n  } catch {\n    queryClient.setQueryData(['posts', postId], prev); // 4. Rollback\n  }\n}"
        }
      ]
    },
    {
      "id": "component-design",
      "title": "🧩 Component Design",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Smart vs Presentational (Container/Dumb)</h3><div class=\"grid2\">\n    <div class=\"card green\"><h4>✅ Presentational (Dumb)</h4>\n      <ul class=\"list\">\n        <li>Тільки props → UI</li>\n        <li>Без прямих API calls / store</li>\n        <li>Легко тестувати (pure render)</li>\n        <li>Reusable у Storybook</li>\n      </ul>\n    </div>\n    <div class=\"card blue\"><h4>Container (Smart)</h4>\n      <ul class=\"list\">\n        <li>Знає про store, API, router</li>\n        <li>Передає data і callbacks у Dumb</li>\n        <li>Може бути async (Server Components)</li>\n        <li>Не реusable, але легко замінити</li>\n      </ul>\n    </div>\n  </div><div class=\"alert good\">\n    <span class=\"icon\">💡</span>\n    <span><strong>Сучасний підхід:</strong> \"Smart/Dumb\" — не жорстке правило. Добре мати Dumb leaf components і Smart/Container ближче до route рівня. Але hooks дозволяють \"Smart\" логіку без \"Smart\" component обгортки.</span>\n  </div><h3 class=\"topic\">Composition over Props Drilling</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// ❌ Prop drilling</span>\n<span class=\"kw\">function</span> <span class=\"fn\">App</span>() {\n  <span class=\"kw\">return</span> &lt;<span class=\"fn\">Page</span> user={user} /&gt;;\n}\n<span class=\"kw\">function</span> <span class=\"fn\">Page</span>({ user }) {\n  <span class=\"kw\">return</span> &lt;<span class=\"fn\">Sidebar</span> user={user} /&gt;;\n}\n<span class=\"kw\">function</span> <span class=\"fn\">Sidebar</span>({ user }) {\n  <span class=\"kw\">return</span> &lt;<span class=\"fn\">Avatar</span> user={user} /&gt;;  <span class=\"cmt\">// прокидаємо через 3 рівні</span>\n}</pre>\n    <pre><span class=\"cmt\">// ✅ Composition</span>\n<span class=\"kw\">function</span> <span class=\"fn\">App</span>() {\n  <span class=\"kw\">return</span> (\n    &lt;<span class=\"fn\">Page</span>&gt;\n      &lt;<span class=\"fn\">Sidebar</span>&gt;\n        &lt;<span class=\"fn\">Avatar</span> user={user} /&gt;  <span class=\"cmt\">// знає про user</span>\n      &lt;/<span class=\"fn\">Sidebar</span>&gt;\n    &lt;/<span class=\"fn\">Page</span>&gt;\n  );\n}\n<span class=\"cmt\">// Page і Sidebar приймають children</span></pre>\n  </div><h3 class=\"topic\">Feature-based vs Layer-based структура</h3><div class=\"grid2\">\n    <pre><span class=\"cmt\">// ✅ Feature-based (рекомендовано)</span>\nsrc/\n  features/\n    auth/\n      components/\n      hooks/\n      api/\n      store/\n    dashboard/\n      ...\n    products/\n      ...\n  shared/        <span class=\"cmt\">← cross-feature utilities</span>\n    ui/\n    utils/</pre>\n    <pre><span class=\"cmt\">// Layer-based (заплутується зі зростанням)</span>\nsrc/\n  components/    <span class=\"cmt\">← всі компоненти разом</span>\n  hooks/         <span class=\"cmt\">← всі hooks</span>\n  services/      <span class=\"cmt\">← всі API calls</span>\n  store/         <span class=\"cmt\">← весь state</span>\n<span class=\"cmt\">// При зміні фічі — правиш 4+ папки</span></pre>\n  </div>"
        }
      ]
    },
    {
      "id": "performance-patterns",
      "title": "⚡ Performance Patterns",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Core Web Vitals</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Метрика</th><th>Що вимірює</th><th>Ціль</th><th>Як покращити</th></tr>\n      <tr><td><strong>LCP</strong> (Largest Contentful Paint)</td><td>Час до largest visible element</td><td>&lt; 2.5s</td><td>Preload fonts/images, SSR, CDN</td></tr>\n      <tr><td><strong>INP</strong> (Interaction to Next Paint)</td><td>Затримка відповіді на взаємодію</td><td>&lt; 200ms</td><td>Defer non-urgent JS, useTransition</td></tr>\n      <tr><td><strong>CLS</strong> (Cumulative Layout Shift)</td><td>Стабільність layout</td><td>&lt; 0.1</td><td>Задавати size для images/video/ads</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Code Splitting стратегії</h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Route-based (Next.js — автоматично)\n// React — React.lazy()\nconst Dashboard = React.lazy(() => import('./Dashboard'));\n\n// Component-based (важкі компоненти)\nconst HeavyChart = React.lazy(() => import('./HeavyChart'));\n\n// On interaction\nbutton.addEventListener('click', async () => {\n  const { processData } = await import('./heavy-processing');\n  processData(data);\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Virtual Scrolling — коли потрібно</h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Без virtualization (1000+ items)</h4><p>DOM має тисячі вузлів. Scroll — laggy. Layout thrashing. Memory через дах.</p></div>\n    <div class=\"card green\"><h4>✅ react-virtuoso / react-window</h4><p>Рендерить тільки visible items. DOM — ~20-30 вузлів незалежно від розміру списку.</p></div>\n  </div><h3 class=\"topic\">Layout Thrashing <span class=\"tag tag-pit\">PITFALL</span></h3>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// ❌ Read → Write → Read → Write (примусові reflow)\nelements.forEach(el => {\n  const h = el.offsetHeight;   // Read — може тригерити reflow\n  el.style.height = h + 'px'; // Write\n});\n\n// ✅ Batch reads, then batch writes\nconst heights = elements.map(el => el.offsetHeight); // All reads\nelements.forEach((el, i) => el.style.height = heights[i] + 'px'); // All writes"
        }
      ]
    },
    {
      "id": "security-basics",
      "title": "🔒 Security Basics",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"table-wrap\">\n    <table>\n      <tr><th>Вразливість</th><th>Що це</th><th>Захист</th></tr>\n      <tr><td><strong>XSS</strong></td><td>Injection шкідливого JS через user input</td><td>Ніколи dangerouslySetInnerHTML без sanitize. CSP заголовки. React escapes за замовчуванням.</td></tr>\n      <tr><td><strong>CSRF</strong></td><td>Запит від злочинного сайту від імені юзера</td><td>SameSite=Strict cookie. CSRF tokens. Double-submit cookie pattern.</td></tr>\n      <tr><td><strong>Clickjacking</strong></td><td>Прихований iframe поверх сайту</td><td>X-Frame-Options: DENY. CSP frame-ancestors.</td></tr>\n      <tr><td><strong>Sensitive data в URL</strong></td><td>Токени/id в query params → логи/history</td><td>POST body або header. Не передавай секрети в URL.</td></tr>\n      <tr><td><strong>Expose secrets</strong></td><td>API keys в frontend bundle</td><td>Серверні змінні без NEXT_PUBLIC_. Server Actions. Backend proxy.</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Cookie security attributes</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Атрибут</th><th>Що робить</th></tr>\n      <tr><td><code>HttpOnly</code></td><td>Cookie недоступна через JS (document.cookie). Захист від XSS.</td></tr>\n      <tr><td><code>Secure</code></td><td>Передається тільки по HTTPS.</td></tr>\n      <tr><td><code>SameSite=Strict</code></td><td>Не передається з cross-site запитами. Захист від CSRF.</td></tr>\n      <tr><td><code>SameSite=Lax</code></td><td>Дозволяє top-level navigation, блокує XHR/fetch cross-site.</td></tr>\n      <tr><td><code>Partitioned</code></td><td>Third-party cookie ізольована per top-level site (CHIPS).</td></tr>\n    </table>\n  </div>"
        }
      ]
    },
    {
      "id": "quick-interview-answers",
      "title": "🎯 Quick Interview Answers",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Топ питань з архітектури</h3><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як масштабувати React застосунок?</h4>\n    <p>Feature-based структура → Lazy loading → Code splitting по routes → TanStack Query для server state → Zustand для client state → React.memo + селектори де потрібно → Virtualization для великих списків → Monorepо (Turborepo) якщо кілька apps.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Context vs Zustand — коли що?</h4>\n    <p>Context — для рідко змінних даних (theme, locale, auth user). Якщо щось змінюється часто (cart, notifications, real-time) — Zustand, бо Context ре-рендерить всіх споживачів при будь-якій зміні.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як зробити компонент performant?</h4>\n    <p>1) Профайлер спочатку — знайти реальну проблему. 2) State нижче — не піднімай вище ніж потрібно. 3) Composition — Server Components + Client листи. 4) React.memo + useCallback якщо є виміряна проблема. 5) Virtualization для списків 500+.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Що таке hydration mismatch і як уникнути?</h4>\n    <p>Server HTML відрізняється від першого client render. Причини: Date.now(), Math.random(), window checks, user-specific data. Рішення: useEffect для browser-only коду, suppressHydrationWarning для timestamp-like елементів, перевіряти typeof window !== 'undefined'.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як ти організуєш API calls?</h4>\n    <p>Service layer (api/ папка з fetch-функціями) → TanStack Query hooks з queryKey + queryFn → Shared error handling у queryClient → TypeScript типи з бекенду (zod validation або code-gen). Ніяких raw fetch в компонентах.</p>\n  </div><div class=\"card\">\n    <h4>❓ Micro-frontends — коли виправдано?</h4>\n    <p>Різні команди з різними deploy cycles. Legacy migration (поступово). Різні tech stacks. Overhead: bundle duplication, routing complexity, shared state між apps. Альтернатива: Nx monorepo зі shared libraries — часто достатньо.</p>\n  </div>"
        }
      ]
    }
  ]
}
