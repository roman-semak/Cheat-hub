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
          "html": "<h3 class=\"topic\">Core Web Vitals</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Метрика</th><th>Що вимірює</th><th>Ціль</th><th>Як покращити</th></tr>\n      <tr><td><strong>LCP</strong> (Largest Contentful Paint)</td><td>Час до largest visible element</td><td>&lt; 2.5s</td><td>Preload fonts/images, SSR, CDN</td></tr>\n      <tr><td><strong>INP</strong> (Interaction to Next Paint)</td><td>Затримка відповіді на взаємодію</td><td>&lt; 200ms</td><td>Defer non-urgent JS, useTransition</td></tr>\n      <tr><td><strong>CLS</strong> (Cumulative Layout Shift)</td><td>Стабільність layout</td><td>&lt; 0.1</td><td>Задавати size для images/video/ads</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Code Splitting стратегії</h3><p>Розбиваємо бандл на менші чанки, що вантажаться лише коли реально потрібні — менше JS для парсингу на старті, швидший TTI. <strong>Route-based</strong> — по сторінках (Next.js робить це автоматично для кожного route). <strong>Component-based</strong> — важкі, рідко потрібні компоненти (модалки, редактори, графіки), окремо від основного бандла. <strong>On interaction</strong> — довантаження коду в момент кліку/наведення, коли компонент навіть не змонтований до цього.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Route-based (Next.js — автоматично)\n// React — React.lazy()\nconst Dashboard = React.lazy(() => import('./Dashboard'));\n\n// Component-based (важкі компоненти)\nconst HeavyChart = React.lazy(() => import('./HeavyChart'));\n\n// On interaction\nbutton.addEventListener('click', async () => {\n  const { processData } = await import('./heavy-processing');\n  processData(data);\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Virtual Scrolling — коли потрібно</h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Без virtualization (1000+ items)</h4><p>DOM має тисячі вузлів. Scroll — laggy. Layout thrashing. Memory через дах.</p></div>\n    <div class=\"card green\"><h4>✅ react-virtuoso / react-window</h4><p>Рендерить тільки visible items. DOM — ~20-30 вузлів незалежно від розміру списку.</p></div>\n  </div><h3 class=\"topic\">Layout Thrashing <span class=\"tag tag-pit\">PITFALL</span></h3><p>Виникає, коли читання layout-властивості (<code>offsetHeight</code>, <code>getBoundingClientRect</code>...) чергується із записом стилю в циклі: кожне читання після запису змушує браузер синхронно перерахувати layout (forced synchronous reflow), замість одного разу в кінці кадру. На великих списках/DOM-деревах це особливо помітно як «підвисання» скролу чи анімації.</p>"
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
      "id": "micro-frontends",
      "title": "🧩 Micro-frontends",
      interviewQuestions: [
        {
          "question": "Коли розбиття фронтенду на кілька незалежно деплойованих micro-frontends виправдане, а коли це зайва складність?",
          "answer": "Виправдано, коли кілька команд працюють над різними частинами продукту з різними релізними циклами, потрібна поступова міграція legacy-застосунку без «великого вибуху», або частини системи навмисно на різних стеках. Overhead — дублювання залежностей у бандлі, складніший роутинг між «острівцями», ускладнений спільний стан і UX-узгодженість (дизайн-система, версії React). Якщо команда одна й стек один — Nx/Turborepo монорепо зі спільними бібліотеками зазвичай закриває ті самі болі простіше."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>Micro-frontends</strong> — архітектурний підхід, коли фронтенд збирається з кількох незалежно розроблюваних і деплойованих частин (окремими командами, часто на різних стеках), а не як один моноліт. Мета та сама, що й у мікросервісів на бекенді: незалежні деплої, ізоляція збоїв, свобода вибору технологій для кожної команди.</p><h3 class=\"topic\">Підходи до інтеграції</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Підхід</th><th>Як працює</th><th>Плюси / мінуси</th></tr>\n      <tr><td><strong>Build-time</strong></td><td>Кожна частина — npm-пакет, host збирає все в один бандл під час білда</td><td>Просто, типобезпечно; але деплой лише разом з host — незалежність релізів втрачається</td></tr>\n      <tr><td><strong>iframe</strong></td><td>Кожна частина — окрема сторінка у власному iframe</td><td>Повна ізоляція CSS/JS; важкий спільний стан, роутинг, SEO, «шви» в UX між частинами</td></tr>\n      <tr><td><strong>Web Components</strong></td><td>Кожна частина — custom element з власним Shadow DOM</td><td>Framework-agnostic, ізоляція стилів; складніше типізувати пропси/події між частинами</td></tr>\n      <tr><td><strong>Module Federation</strong></td><td>Webpack 5 / Vite вантажить чанки інших застосунків у рантаймі</td><td>Незалежні деплої, спільні залежності (React) не дублюються; потрібна дисципліна версіонування shared-пакетів</td></tr>\n      <tr><td><strong>Server-side composition</strong></td><td>Edge/gateway (напр. Next.js Multi-Zones) збирає HTML з кількох застосунків</td><td>Добре для SEO і швидкого First Paint; складніша інфраструктура на edge</td></tr>\n    </table>\n  </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// webpack.config.js — host застосунок споживає remote\nnew ModuleFederationPlugin({\n  name: 'host',\n  remotes: {\n    checkout: 'checkout@https://checkout.example.com/remoteEntry.js',\n  },\n  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },\n});\n\n// remote застосунок (checkout) — що саме віддає назовні\nnew ModuleFederationPlugin({\n  name: 'checkout',\n  filename: 'remoteEntry.js',\n  exposes: { './CheckoutApp': './src/CheckoutApp' },\n  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },\n});\n\n// host — динамічний імпорт remote-компонента\nconst CheckoutApp = React.lazy(() => import('checkout/CheckoutApp'));"
        },
        {
          "kind": "note",
          "tone": "warn",
          "html": "<div class=\"alert warn\"><strong>⚠️ Не за замовчуванням.</strong> Micro-frontends розв'язують організаційну проблему (кілька команд/деплоїв), а не технічну. Ціна — дублювання інфраструктури, складніший CI/CD, узгодження дизайн-системи між частинами. Якщо цієї організаційної проблеми немає — простіший monorepo (Nx/Turborepo) зі спільними пакетами дає ту саму модульність без рантайм-складності.</div>"
        }
      ]
    },
    {
      "id": "system-design-interview",
      "title": "🧭 Як проходити System Design співбесіду",
      interviewQuestions: [
        {
          "question": "Інтерв'юер каже «спроєктуй Twitter» — які твої перші 3-5 хвилин, перш ніж малювати бокси?",
          "answer": "Уточнити <strong>обсяг і напрям</strong>: які фічі в скоупі (стрічка? пости? лайки? DM?), скільки користувачів і DAU, read-heavy чи write-heavy, цільова латентність і доступність, чи потрібна строга консистентність. Далі — <strong>оцінки на пальцях</strong> (RPS на читання/запис, обсяг даних на рік). Лише після цього — API-контракт і high-level діаграма. Кандидат, що одразу малює архітектуру, ризикує спроєктувати рішення не під той масштаб — самі уточнюючі питання вже демонструють сеньйорність."
        },
        {
          "question": "Як розподілити ~45 хвилин на system design так, щоб не «зависнути» в одному місці?",
          "answer": "Орієнтовно: ~5 хв вимоги + оцінки, ~5 хв API та модель даних, ~10-15 хв high-level дизайн, ~15-20 хв deep-dive у 1-2 компоненти, які цікавлять інтерв'юера, ~5 хв trade-offs і підсумок. Ключове — <strong>не полірувати першу частину до ідеалу</strong>: краще мати грубий повний ескіз і поглиблюватись за сигналами інтерв'юера, ніж детально спроєктувати модель даних і не дійти до масштабування."
        },
        {
          "question": "Навіщо взагалі рахувати «back-of-the-envelope» числа, якщо це все одно приблизно?",
          "answer": "Числа <strong>керують архітектурними рішеннями</strong>: 100 RPS і 100k RPS — це різні світи (одна БД vs шардинг + черги + кеш). Оцінка обсягу даних показує, чи влізе індекс у пам'ять, чи потрібен CDN, чи витримає одна нода. Це не про точність, а про <em>порядок величини</em>, який відсікає невідповідні рішення й показує, що ти проєктуєш під реальність, а не абстрактно."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<p>System Design — Senior/Staff-секція (зазвичай 45-60 хв). Перевіряють не «правильну відповідь» (її немає), а <strong>структуру мислення</strong>: як ти працюєш з невизначеністю, обґрунтовуєш рішення й бачиш trade-offs.</p>
            <h3 class="topic">Каркас відповіді — проговорюй уголос</h3>
            <ol>
              <li><strong>Вимоги</strong> — функціональні (що робить система) + нефункціональні (масштаб, латентність, доступність, консистентність). Уточнюй, не припускай.</li>
              <li><strong>Оцінки</strong> — DAU, RPS (читання/запис), обсяг даних, read/write ratio. «На пальцях».</li>
              <li><strong>API</strong> — 3-5 ключових ендпоінтів або GraphQL-операцій, контракт.</li>
              <li><strong>Модель даних</strong> — сутності, SQL чи NoSQL і <em>чому</em>.</li>
              <li><strong>High-level дизайн</strong> — клієнт → edge/CDN → gateway/BFF → сервіси → сховища/кеш/черги. Намалюй.</li>
              <li><strong>Deep-dive</strong> — 1-2 компоненти детально за інтересом інтерв'юера; вузькі місця, кеш, шардинг, черги.</li>
              <li><strong>Trade-offs + підсумок</strong> — назви слабкі місця власного рішення. Це ознака зрілості.</li>
            </ol>`
        },
        {
          "kind": "mermaid",
          "caption": "Порядок відповіді; на будь-якому кроці можна повернутись і уточнити вимоги",
          "code": `flowchart LR
  A["1 · Вимоги"] --> B["2 · Оцінки"]
  B --> C["3 · API"]
  C --> D["4 · Модель даних"]
  D --> E["5 · High-level"]
  E --> F["6 · Deep-dive"]
  F --> G["7 · Trade-offs"]
  F -. уточнення .-> A`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Числа, які варто знати напам'ять</h3>
            <div class="table-wrap">
              <table>
                <tr><th>Величина</th><th>Порядок</th></tr>
                <tr><td>Секунд на добу</td><td>~86 400 (≈ 10⁵)</td></tr>
                <tr><td>1 млн запитів/добу</td><td>≈ 12 RPS (рівномірно), пік ×3-5</td></tr>
                <tr><td>Читання з пам'яті / SSD / мережі в ДЦ</td><td>~100 нс / ~100 мкс / ~500 мкс</td></tr>
                <tr><td>Round-trip Європа↔США</td><td>~150 мс</td></tr>
                <tr><td>Бюджет JS на сторінку (mobile)</td><td>~150-200 КБ gzip до інтерактиву</td></tr>
                <tr><td>Рядок у БД (типовий)</td><td>~1 КБ → 1 млрд рядків ≈ 1 ТБ</td></tr>
              </table>
            </div>
            <div class="alert warn"><strong>⚠️ Часта помилка.</strong> Витратити 20 хвилин на ідеальну модель даних і не дійти до масштабування та trade-offs. Тримай перший прохід грубим і повним.</div>`
        }
      ]
    },
    {
      "id": "high-level-architecture",
      "title": "🏗️ High-level архітектура веб-системи",
      interviewQuestions: [
        {
          "question": "Що таке BFF (Backend for Frontend) і яку конкретну проблему фронтенду він вирішує?",
          "answer": "BFF — тонкий серверний шар, <strong>що належить фронтенд-команді</strong> й агрегує/переформатовує дані кількох downstream-сервісів під потреби конкретного клієнта. Вирішує: over-fetching і водоспад запитів з браузера (один виклик BFF замість 5 до мікросервісів), різні потреби web vs mobile, приховування внутрішньої топології сервісів, місце для клієнт-специфічної логіки (кеш, згортання полів, auth-обмін). Ціна — ще один сервіс у деплої й ризик, що BFF розповзеться в бізнес-логіку."
        },
        {
          "question": "Чому «stateless-сервіси» — умова горизонтального масштабування, і де тоді живе стан?",
          "answer": "Якщо інстанс тримає стан у пам'яті (сесія, завантажені файли, лічильники), то запити користувача мусять потрапляти на ту саму ноду (sticky sessions), а падіння ноди втрачає стан — це блокує вільне додавання/зняття інстансів за LB. Stateless-сервіс виносить стан у <strong>спільні сховища</strong>: сесії/кеш — Redis, файли — S3/blob, черги — Kafka/SQS, дані — БД. Тоді будь-який інстанс обробляє будь-який запит, і масштаб — це просто «додати нод»."
        },
        {
          "question": "Навіщо черга (Kafka/SQS) між сервісами, якщо можна викликати сервіс напряму?",
          "answer": "Черга дає <strong>розв'язку в часі й навантаженні</strong>: producer не чекає на consumer, пікові сплески згладжуються (consumer розгрібає у своєму темпі), падіння consumer не роняє producer (повідомлення чекають). Плюс fan-out (один івент → багато підписників) і ретраї. Ціна — eventual consistency (результат не миттєвий), складніше дебажити, потрібна ідемпотентність consumer'ів. Синхронний виклик кращий, коли клієнту потрібен результат <em>зараз</em>."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<p>Типова веб-система — це кілька шарів між користувачем і даними. Frontend-інженеру важливо розуміти <strong>весь ланцюг</strong>: де кешується запит, чому TTFB такий, куди дівається стан, як деградує система при піку.</p>`
        },
        {
          "kind": "mermaid",
          "caption": "High-level потік запиту: клієнт → edge → gateway/BFF → сервіси → сховища/черги",
          "code": `flowchart TB
  U["Клієнт<br/>браузер / застосунок"] --> CDN["CDN + Edge<br/>статика · кеш · SSR на межі"]
  CDN --> LB["Load Balancer"]
  LB --> BFF["API Gateway / BFF"]
  BFF --> AUTH["Auth"]
  BFF --> USERS["Users"]
  BFF --> FEED["Feed"]
  BFF --> SEARCH["Search"]
  BFF --> PAY["Payments"]
  USERS --> DB[("PostgreSQL")]
  FEED --> CACHE[("Redis")]
  FEED --> Q["Черга · Kafka / SQS"]
  SEARCH --> ES[("Search index")]
  PAY --> DB
  Q --> W["Воркери<br/>fan-out · email · аналітика"]`
        },
        {
          "kind": "paragraph",
          "html": `<div class="grid2">
              <div class="card blue"><h4>🖥️ Де живе frontend</h4>
                <ul class="list">
                  <li>UI, рендеринг, клієнтський стан, роутинг</li>
                  <li>SSR/RSC на Node/edge, BFF-шар</li>
                  <li>Кеш відповідей (TanStack Query), optimistic UI</li>
                  <li>Телеметрія: RUM, CWV, помилки</li>
                </ul>
              </div>
              <div class="card"><h4>⚙️ Дотик до backend</h4>
                <ul class="list">
                  <li>API-контракт, версіонування, пагінація</li>
                  <li>Auth-потік (OAuth/OIDC, сесії, токени)</li>
                  <li>Ідемпотентність, ретраї, rate limiting</li>
                  <li>Черги для важких/асинхронних операцій</li>
                </ul>
              </div>
            </div>
            <div class="table-wrap">
              <table>
                <tr><th>Компонент</th><th>Роль</th><th>Чому важливо фронтенду</th></tr>
                <tr><td><strong>CDN</strong></td><td>Роздача статики й кешованих відповідей близько до користувача</td><td>LCP, TTFB; cache-headers, інвалідація при деплої</td></tr>
                <tr><td><strong>Load Balancer</strong></td><td>Розподіл трафіку між інстансами, health-checks</td><td>Rolling-деплой без даунтайму, sticky sessions для WS</td></tr>
                <tr><td><strong>API Gateway / BFF</strong></td><td>Єдина точка входу, агрегація, auth, rate limit</td><td>Один запит замість водоспаду; клієнт-специфічний формат</td></tr>
                <tr><td><strong>Кеш (Redis)</strong></td><td>Гарячі дані, сесії, лічильники, rate-limit токени</td><td>Пояснює, чому дані іноді stale; де інвалідація</td></tr>
                <tr><td><strong>Черга</strong></td><td>Асинхронна обробка, розв'язка, згладжування піків</td><td>Чому результат не миттєвий (eventual consistency)</td></tr>
                <tr><td><strong>Blob storage (S3)</strong></td><td>Файли, зображення, відео</td><td>Presigned upload напряму з браузера, повз бекенд</td></tr>
              </table>
            </div>
            <div class="alert"><span class="icon">📚</span> <span>Глибше про backend-шар (БД, індекси, реплікація, DevOps, CI/CD) — тема <strong>Fullstack</strong> (<code>/fullstack</code>).</span></div>`
        }
      ]
    },
    {
      "id": "rendering-delivery",
      "title": "🌐 Рендеринг і доставка",
      interviewQuestions: [
        {
          "question": "Як обрати між CSR, SSR, SSG та ISR для конкретної сторінки?",
          "answer": "За <strong>свіжістю даних × персоналізацією × трафіком</strong>. Статичний маркетинг/докси — <strong>SSG</strong> (збілдив раз, роздаєш з CDN). Контент, що змінюється, але однаковий для всіх (каталог, стаття) — <strong>ISR/SSG з ревалідацією</strong>. Персоналізована, SEO-важлива сторінка (стрічка, дашборд з даними) — <strong>SSR</strong> (краще streaming/RSC). Приватна панель за логіном без SEO — <strong>CSR</strong> достатньо (shell з CDN + дані по API). Часто на одній сторінці змішано: статичний каркас + динамічні острівці."
        },
        {
          "question": "Що таке «hydration cost» і чому streaming SSR / RSC його зменшують?",
          "answer": "Класичний SSR віддає готовий HTML, але потім браузер має завантажити <em>весь</em> JS сторінки й «оживити» дерево (навісити слухачі, відновити стан) — до кінця гідрації сторінка виглядає готовою, але не реагує (поганий INP/TBT). <strong>Streaming SSR</strong> віддає HTML частинами по мірі готовності даних і гідратує вибірково. <strong>RSC</strong> йде далі: серверні компоненти <em>не</em> відправляють свій JS у бандл узагалі — клієнту їде лише результат + JS тільки для інтерактивних острівців."
        },
        {
          "question": "Навіщо рендерити на edge, а не на origin-сервері?",
          "answer": "Edge-функції виконуються в POP-ах CDN близько до користувача — менший RTT для SSR-відповіді (TTFB), особливо для географічно розкиданої аудиторії. Добре для легкого рендеру, персоналізації, A/B, редіректів, geo-логіки. Обмеження: жорсткі ліміти CPU/пам'яті/часу, урізаний runtime (не повний Node), холодний доступ до БД у своєму регіоні — тому важкі запити до даних часто лишають на origin, а на edge роблять шар композиції/кешу."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Стратегія</th><th>Коли HTML створюється</th><th>Плюси</th><th>Мінуси</th></tr>
                <tr><td><strong>CSR</strong></td><td>У браузері, після завантаження JS</td><td>Просто, дешевий хостинг, багатий інтерактив</td><td>Поганий SEO, повільний перший контент, порожній HTML</td></tr>
                <tr><td><strong>SSR</strong></td><td>На сервері на кожен запит</td><td>SEO, свіжі дані, швидкий FCP</td><td>Навантаження на сервер, TTFB залежить від даних, hydration cost</td></tr>
                <tr><td><strong>SSG</strong></td><td>Під час білда</td><td>Найшвидше, роздача з CDN, стійкість</td><td>Дані «застигли» на момент білда, довгий білд на багато сторінок</td></tr>
                <tr><td><strong>ISR</strong></td><td>Білд + фонова ревалідація за TTL/тегом</td><td>Свіжість SSG без ребілда всього</td><td>Перший після інвалідації бачить stale; складніша ментальна модель</td></tr>
                <tr><td><strong>Streaming SSR</strong></td><td>На сервері, частинами (Suspense)</td><td>Швидкий shell, дані доїжджають потоком</td><td>Складніше кешувати, потрібна підтримка інфраструктури</td></tr>
                <tr><td><strong>RSC</strong></td><td>Сервер (0 JS) + клієнт для острівців</td><td>Менший бандл, дані на сервері без API</td><td>Нова модель, межа server/client, кешування RSC-payload</td></tr>
              </table>
            </div>`
        },
        {
          "kind": "mermaid",
          "caption": "Streaming SSR / RSC: браузер отримує shell одразу, дані — потоком",
          "code": `sequenceDiagram
  participant B as Браузер
  participant E as Edge / CDN
  participant O as Origin (RSC)
  B->>E: GET /dashboard
  E->>O: cache miss → forward
  O-->>E: HTML shell + head (одразу)
  E-->>B: стрім shell → перший paint
  O-->>E: Suspense-чанк 1 (дані готові)
  E-->>B: стрім чанк 1
  O-->>E: Suspense-чанк 2
  E-->>B: стрім чанк 2 → повна сторінка
  B->>B: селективна гідрація по мірі надходження`
        },
        {
          "kind": "paragraph",
          "html": `<div class="grid3">
              <div class="card"><h4>CDN-кеш</h4><p>Статика й публічні відповіді з <code>Cache-Control</code>. Інвалідація хешем у назві файлу (immutable) або purge за тегом при деплої.</p></div>
              <div class="card"><h4>Islands / часткова гідрація</h4><p>Гідратуємо лише інтерактивні шматки (пошук, кошик), решта — статичний HTML. Astro, RSC, Qwik (resumability).</p></div>
              <div class="card"><h4>Метрики</h4><p>SSR тисне на <strong>TTFB</strong>; великий бандл — на <strong>LCP/INP</strong>. Streaming покращує TTFB-до-контенту, RSC — розмір бандла.</p></div>
            </div>`
        }
      ]
    },
    {
      "id": "api-data-layer",
      "title": "🔌 API та шар даних для фронтенду",
      interviewQuestions: [
        {
          "question": "REST, GraphQL чи tRPC — за якими критеріями обираєш для нового продукту?",
          "answer": "<strong>tRPC</strong> — коли фронт і бек в одному репозиторії на TypeScript і одна команда: нульова кодогенерація, типи «протікають» наскрізь. <strong>GraphQL</strong> — коли багато різних клієнтів з різними потребами до даних, глибокі графи зв'язків, проблема over/under-fetching; ціна — кешування, N+1 на резолверах, складність. <strong>REST</strong> — публічне API, багато сторонніх споживачів, потрібне HTTP-кешування «з коробки», простота й передбачуваність. Часто REST/tRPC для власного застосунку + окремий стабільний REST/GraphQL для партнерів."
        },
        {
          "question": "Чим cursor-based пагінація краща за offset для нескінченної стрічки?",
          "answer": "Offset (<code>LIMIT 20 OFFSET 400</code>) має дві проблеми: (1) <strong>дрейф</strong> — якщо між сторінками щось вставили/видалили, елементи зсуваються, і користувач бачить дублі або пропуски; (2) <strong>деградація</strong> — БД мусить прочитати й відкинути всі 400 рядків. Cursor (keyset) передає «останній побачений ключ» (<code>created_at + id</code>) і робить <code>WHERE (created_at, id) &lt; (?, ?)</code> — стабільно під конкурентними записами й швидко (index seek). Мінус — не можна стрибнути на «сторінку 50»."
        },
        {
          "question": "Що конкретно робить кеш-шар типу TanStack Query, чого не дає простий useEffect + fetch?",
          "answer": "Дедуплікація однакових запитів у польоті, кеш за <code>queryKey</code> зі <strong>stale-while-revalidate</strong> (показати старе, тихо оновити), фонова ревалідація (на фокус вікна, реконект), інвалідація за ключем/тегом після мутації, retry з backoff, пагінація/інфініт-скрол зі збереженням попередніх сторінок, <code>optimistic updates</code> з rollback, garbage collection невикористаних даних. Усе це вручну на <code>useEffect</code> — це сотні рядків крихкого коду з race conditions."
        }
      ],
      "blocks": [
        {
          "kind": "mermaid",
          "caption": "BFF-патерн: кожен клієнт має свій агрегувальний шар над спільними сервісами",
          "code": `flowchart LR
  W["Web app"] --> WB["Web BFF"]
  M["Mobile app"] --> MB["Mobile BFF"]
  WB --> C1["Catalog"]
  WB --> C2["Reviews"]
  WB --> C3["Inventory"]
  MB --> C1
  MB --> C3
  N["BFF: агрегація + формат<br/>+ auth-обмін + кеш"]`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Пагінація — три підходи</h3>
            <div class="table-wrap">
              <table>
                <tr><th>Підхід</th><th>Механізм</th><th>Стабільність під записами</th><th>Стрибок на сторінку N</th></tr>
                <tr><td>Offset</td><td><code>LIMIT n OFFSET m</code></td><td>❌ дрейфує</td><td>✅ так</td></tr>
                <tr><td>Cursor / keyset</td><td><code>WHERE (sort_key) &lt; last_seen</code></td><td>✅ стабільна</td><td>❌ лише вперед/назад</td></tr>
                <tr><td>Page-token (opaque)</td><td>Сервер кодує стан курсора в токен</td><td>✅ стабільна</td><td>❌ лише послідовно</td></tr>
              </table>
            </div>
            <h3 class="topic">Шар даних на клієнті</h3>
            <ul class="list">
              <li><strong>Нормалізація</strong> — зберігати сутності за id (як міні-БД), а списки — як масиви id; одне джерело правди, оновлення сутності бачать усі екрани.</li>
              <li><strong>Дедуплікація</strong> запитів у польоті за ключем.</li>
              <li><strong>Optimistic updates</strong> — оновити UI до відповіді сервера, rollback при помилці.</li>
              <li><strong>Інвалідація</strong> за ключем/тегом після мутації замість ручного <code>refetch</code>.</li>
            </ul>`
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": `// Optimistic update з rollback (TanStack Query)
const mutation = useMutation({
  mutationFn: toggleLike,
  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ['post', postId] });
    const prev = queryClient.getQueryData(['post', postId]);
    queryClient.setQueryData(['post', postId], (p: Post) => ({
      ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1),
    }));
    return { prev, postId };                       // контекст для rollback
  },
  onError: (_e, _v, ctx) => {
    if (ctx) queryClient.setQueryData(['post', ctx.postId], ctx.prev);
  },
  onSettled: (_d, _e, postId) =>
    queryClient.invalidateQueries({ queryKey: ['post', postId] }),
});`
        }
      ]
    },
    {
      "id": "realtime-systems",
      "title": "⚡ Real-time системи",
      interviewQuestions: [
        {
          "question": "Polling, SSE чи WebSocket — як обрати транспорт для конкретної фічі?",
          "answer": "<strong>Polling</strong> (раз на N сек) — коли оновлення рідкі й затримка в секунди ок (статус замовлення): простий, працює скрізь, дешево. <strong>SSE</strong> — сервер→клієнт стрім, лише текст, автореконект з коробки, працює поверх HTTP/2: нотифікації, стрічка подій, прогрес. <strong>WebSocket</strong> — двонаправлений, низька латентність: чат, спільне редагування, ігри, presence. Правило: не бери WS, якщо не потрібен канал <em>від клієнта</em> в реальному часі — SSE простіший в експлуатації."
        },
        {
          "question": "Як правильно робити reconnect для WebSocket, щоб не покласти власний сервер?",
          "answer": "<strong>Експоненційний backoff з jitter</strong>: 1с, 2с, 4с, 8с… з випадковою добавкою, щоб тисячі клієнтів після збою мережі не перепідключались синхронно (thundering herd) і не задідосили сервер. Плюс: cap на максимальний інтервал (~30с), скидання лічильника після успішного з'єднання, зупинка спроб коли вкладка прихована (<code>visibilitychange</code>), і <strong>resume</strong> — передати last-event-id, щоб сервер дослав пропущені події замість повного релоуду стану."
        },
        {
          "question": "Як масштабувати WebSocket-сервер на мільйон одночасних з'єднань?",
          "answer": "З'єднання stateful, тож: (1) багато інстансів за LB зі <strong>sticky routing</strong> (з'єднання прив'язане до ноди); (2) <strong>pub/sub-шина</strong> (Redis, NATS, Kafka) між нодами — повідомлення для користувача публікується в шину, а нода, де сидить його сокет, доставляє; (3) presence і «хто в якій кімнаті» — у Redis; (4) обмеження на з'єднання/повідомлення на клієнта (backpressure), graceful drain при деплої. Часто виносять у окремий realtime-gateway-сервіс."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Транспорт</th><th>Напрям</th><th>Латентність</th><th>Коли брати</th></tr>
                <tr><td>Short polling</td><td>клієнт тягне</td><td>= інтервал</td><td>Рідкі оновлення, простота, сумісність</td></tr>
                <tr><td>Long polling</td><td>клієнт тягне, сервер тримає</td><td>низька</td><td>Fallback, коли WS/SSE недоступні</td></tr>
                <tr><td>SSE</td><td>сервер → клієнт</td><td>низька</td><td>Нотифікації, стрічки, прогрес, лічильники</td></tr>
                <tr><td>WebSocket</td><td>двонаправлений</td><td>найнижча</td><td>Чат, co-editing, presence, ігри</td></tr>
                <tr><td>WebRTC</td><td>peer-to-peer</td><td>найнижча</td><td>Аудіо/відео, великий обсяг між клієнтами</td></tr>
              </table>
            </div>`
        },
        {
          "kind": "mermaid",
          "caption": "WebSocket: handshake, heartbeat, і reconnect з backoff + resume",
          "code": `sequenceDiagram
  participant C as Клієнт
  participant S as WS-сервер
  C->>S: HTTP Upgrade (handshake)
  S-->>C: 101 Switching Protocols
  loop кожні 30с
    C->>S: ping
    S-->>C: pong
  end
  Note over C,S: мережа зникла
  C->>C: onclose → backoff 1s,2s,4s… + jitter
  C->>S: reconnect (Last-Event-ID)
  S-->>C: дослати пропущені події`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Гарантії доставки</h3>
            <div class="grid2">
              <div class="card"><h4>At-least-once + ідемпотентність</h4><p>Сервер може дослати повідомлення двічі після реконекту. Клієнт дедуплікує за <code>event_id</code>. Найпоширеніший практичний вибір.</p></div>
              <div class="card"><h4> Order &amp; gaps</h4><p>Монотонний <code>seq</code>: якщо клієнт бачить розрив — запитує снапшот/догін. Без цього UI «стрибає».</p></div>
            </div>
            <div class="alert"><strong>💡 Presence</strong> (хто онлайн / друкує) — окрема підсистема: TTL-ключі в Redis + періодичний heartbeat; при відпадінні сокета запис сам протухає.</div>`
        }
      ]
    },
    {
      "id": "caching-consistency",
      "title": "🗃️ Кешування та консистентність",
      interviewQuestions: [
        {
          "question": "Назви шари кешу між React-компонентом і рядком у БД — і хто кожен інвалідовує.",
          "answer": "Пам'ять JS (TanStack Query / Apollo) — інвалідує застосунок за ключем після мутації; Service Worker Cache — інвалідує SW-скрипт за версією; HTTP-кеш браузера — за <code>Cache-Control</code>/<code>ETag</code>; CDN edge — purge за тегом при деплої/зміні контенту; edge KV / origin cache — TTL + подієва інвалідація; кеш застосунку (Redis) — TTL + інвалідація на запис; БД — джерело правди. Ключове на співбесіді: <strong>назвати, ХТО і КОЛИ інвалідовує кожен шар</strong>, бо саме тут баги зі stale-даними."
        },
        {
          "question": "Що таке stale-while-revalidate і чому це майже завжди правильний дефолт для UI?",
          "answer": "Показати кешоване (навіть протухле) значення <em>миттєво</em>, а паралельно тихо зробити запит і оновити, якщо змінилось. UI ніколи не «моргає» спінером для даних, які користувач уже бачив, але й не показує вічно старе. Компроміс: кілька секунд користувач може бачити трохи застарілі дані — прийнятно для 95% екранів (стрічка, профіль, список). Не підходить там, де потрібна точність <em>тут і зараз</em>: баланс перед переказом, залишок товару на кроці оплати."
        },
        {
          "question": "Як CAP-теорема проявляється на фронтенді, хоча це «про розподілені БД»?",
          "answer": "Офлайн-first застосунок або optimistic UI — це вибір <strong>Availability над Consistency</strong> під час розділення (немає мережі): показуємо/приймаємо зміни локально, знаючи, що потім доведеться мерджити конфлікти. «Read-your-writes» — компроміс: після власної мутації читаємо з локального кешу/лідера, щоб користувач бачив свою зміну, навіть якщо репліки ще не наздогнали. Тобто фронтенд постійно приймає рішення «показати швидко й можливо неточно» vs «зачекати й точно»."
        }
      ],
      "blocks": [
        {
          "kind": "mermaid",
          "caption": "Ланцюг кешу: запит проходить шари зверху вниз до першого «свіжого» влучення",
          "code": `flowchart LR
  A["Пам'ять JS<br/>TanStack Query"] --> B["Service Worker<br/>Cache API"]
  B --> C["HTTP-кеш браузера<br/>ETag · Cache-Control"]
  C --> D["CDN edge"]
  D --> E["Edge KV /<br/>origin cache"]
  E --> F["Кеш застосунку<br/>Redis"]
  F --> G[("БД — джерело правди")]`
        },
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Шар</th><th>Типовий TTL</th><th>Інвалідація</th></tr>
                <tr><td>TanStack Query</td><td>секунди-хвилини (staleTime)</td><td><code>invalidateQueries</code> за ключем після мутації</td></tr>
                <tr><td>Service Worker</td><td>до оновлення SW</td><td>Версія кешу в назві, <code>skipWaiting</code></td></tr>
                <tr><td>HTTP-кеш</td><td><code>max-age</code> / <code>immutable</code></td><td>Хеш у назві файлу; <code>ETag</code> + 304</td></tr>
                <tr><td>CDN</td><td>хвилини-дні</td><td>Purge за тегом/шляхом при деплої</td></tr>
                <tr><td>Redis (застосунок)</td><td>секунди-години</td><td>Del ключа на запис; або коротший TTL</td></tr>
              </table>
            </div>
            <h3 class="topic">Стратегії інвалідації</h3>
            <div class="grid3">
              <div class="card"><h4>TTL</h4><p>Просто, але вікно неузгодженості = TTL. Добре для «не критично свіжого».</p></div>
              <div class="card"><h4>Tag-based</h4><p>Мутація «товар X» → purge усіх кешів з тегом <code>product:X</code>. Точно, потребує інфраструктури тегів.</p></div>
              <div class="card"><h4>Event-based</h4><p>Сервіс публікує «X змінився» → підписники чистять свій кеш. Найсвіжіше, найскладніше.</p></div>
            </div>
            <div class="alert warn"><strong>⚠️ «There are only two hard things…»</strong> Інвалідація кешу — місце №1 для багів зі stale UI. Завжди вмій відповісти: «цей екран показує дані станом на коли?»</div>`
        }
      ]
    },
    {
      "id": "scaling-resilience",
      "title": "📈 Масштабування, стійкість, degradation",
      interviewQuestions: [
        {
          "question": "Клієнт робить запит, сервер відповів 500 — які рівні захисту має мати фронтенд, перш ніж показати «Щось пішло не так»?",
          "answer": "(1) <strong>Retry з backoff + jitter</strong> для ідемпотентних/транзієнтних помилок (429, 503, network), обмежена кількість; (2) <strong>circuit breaker</strong> — після N підряд помилок перестати бити в мертвий сервіс на X секунд, щоб не додавати навантаження й швидко показати fallback; (3) <strong>fallback</strong> — кешовані дані, скелетон, часткова UI без цього блоку; (4) <strong>error boundary</strong> — ізолювати падіння одного віджета, не роняючи всю сторінку; (5) телеметрія події. «Щось пішло не так» — це останній рівень."
        },
        {
          "question": "Навіщо фронтенду ідемпотентність, якщо це «серверна тема»?",
          "answer": "Фронтенд <strong>генерує idempotency key</strong> (UUID на «Оплатити») і шле його з запитом та з кожним retry. Якщо перша спроба дійшла до сервера, але відповідь загубилась у мережі, retry з тим самим ключем не створить другий платіж — сервер поверне результат першого. Без цього подвійний клік або авто-retry на таймауті = подвійне списання. Це прямий обов'язок клієнта в потоках з побічними ефектами."
        },
        {
          "question": "Що таке graceful degradation на прикладі складної сторінки?",
          "answer": "Дашборд з 8 віджетів: якщо сервіс аналітики лежить, показуємо 7 віджетів + плейсхолдер «дані тимчасово недоступні» на восьмому, а не порожню сторінку. Якщо впав WebSocket — переходимо на polling раз на 30с з банером «оновлення сповільнені». Якщо повільна мережа — вантажимо текст і критичний UI, відкладаємо картинки й важкі графіки. Система <strong>звужує функціональність, а не вимикається</strong>."
        }
      ],
      "blocks": [
        {
          "kind": "mermaid",
          "caption": "Ланцюг обробки збою: retry → circuit breaker → fallback → error boundary",
          "code": `flowchart TB
  R["Запит до API"] --> T{"Успіх?"}
  T -->|так| OK["Рендер даних"]
  T -->|ні| RT{"Retry < N<br/>і помилка транзієнтна?"}
  RT -->|так| BO["Backoff + jitter"] --> R
  RT -->|ні| CB{"Circuit breaker<br/>відкритий?"}
  CB -->|так| FB["Fallback:<br/>кеш · skeleton · часткова UI"]
  CB -->|ні| EB["Error boundary<br/>+ телеметрія"]`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Оцінка навантаження — «на пальцях» для фронтенду</h3>
            <ul class="list">
              <li><strong>Трафік:</strong> 5 млн DAU × 20 запитів/сесія ÷ 86 400 с ≈ 1150 RPS середньо, пік ×5 ≈ 6k RPS до API.</li>
              <li><strong>Bundle budget:</strong> ціль ≤ 170 КБ JS gzip до інтерактиву на 4G/mid-tier телефоні (~3-4 с).</li>
              <li><strong>CDN egress:</strong> 6 млн переглядів/добу × 400 КБ сторінка ≈ 2.4 ТБ/добу трафіку статики.</li>
              <li><strong>WS:</strong> 200k одночасних → потрібен pub/sub + кілька realtime-нод, ~кожна тримає десятки тисяч сокетів.</li>
            </ul>
            <div class="grid2">
              <div class="card green"><h4>Патерни стійкості</h4>
                <ul class="list">
                  <li>Retry + backoff + jitter (лише ідемпотентне)</li>
                  <li>Circuit breaker / bulkhead (ізоляція)</li>
                  <li>Timeout на кожен запит (не «вічний» спінер)</li>
                  <li>Idempotency keys для мутацій</li>
                </ul>
              </div>
              <div class="card blue"><h4>Graceful degradation</h4>
                <ul class="list">
                  <li>Error boundary навколо кожного незалежного блоку</li>
                  <li>Fallback на кеш / останнє відоме значення</li>
                  <li>Feature flags / kill switch для важких фіч</li>
                  <li>Offline-first: черга дій, sync при поверненні мережі</li>
                </ul>
              </div>
            </div>`
        }
      ]
    },
    {
      "id": "load-balancing",
      "title": "⚖️ Load Balancer",
      interviewQuestions: [
        {
          "question": "У чому різниця між L4 і L7 load balancer'ом і чому для фронтенду важливіший L7?",
          "answer": "<strong>L4</strong> працює на рівні TCP/UDP — бачить лише IP і порт, розподіляє пакети, не заглядаючи в контент (швидший, простіший). <strong>L7</strong> розбирає HTTP: URL path, host, заголовки, cookie — і на цій основі маршрутизує (<code>/api/*</code> → один пул, <code>/images/*</code> → інший), робить <strong>SSL termination</strong>, стиснення, кешування, rate limiting. Для фронтенду L7 цікавіший, бо саме на ньому будують <strong>path-based routing</strong> для мікросервісів/мікрофронтендів, <strong>A/B-тести й canary</strong> за cookie/header, і zero-downtime деплої."
        },
        {
          "question": "Що не так зі sticky sessions і що казати замість них на інтерв'ю?",
          "answer": "Sticky sessions (session affinity) прив'язують клієнта до конкретного сервера через cookie або IP hash — потрібні, коли сервер тримає стан сесії в пам'яті. Це <strong>милиця</strong>: ламає рівномірність балансування, заважає масштабуванню й rolling-деплою (вивід інстансу вбиває сесії на ньому). Правильна відповідь: зробити backend <strong>stateless</strong>, а стан винести назовні — сесії в Redis/shared cache, автентифікацію в JWT (стан у клієнта). Тоді будь-який інстанс обробляє будь-який запит, і LB балансує вільно."
        },
        {
          "question": "Чому WebSocket-трафік за load balancer'ом — окрема проблема, і як її вирішувати?",
          "answer": "WS — це довгоживучі з'єднання: Round Robin розподілить <em>кількість</em> з'єднань рівно, але навантаження перекоситься, бо одні сокети активні, інші сплять. Тому беруть <strong>Least Connections</strong>. Друга проблема — стан з'єднання: якщо realtime-нода тримає підписки локально, падіння ноди губить їх усі. Рішення — <strong>stateless pub/sub</strong> (Redis, Centrifugo, NATS): нода лише реле, підписки й фан-аут живуть у брокері, тож будь-яка нода віддасть будь-яке повідомлення."
        },
        {
          "question": "Що таке consistent hashing і навіщо він, якщо є звичайний hash % N?",
          "answer": "При <code>hash % N</code> зміна кількості серверів (N → N±1) перетасовує <strong>майже всі</strong> ключі — для розподіленого кешу це масовий cache miss і шторм на БД. Consistent hashing розкладає і сервери, і ключі на одне хеш-кільце; ключ іде на найближчий сервер за годинниковою стрілкою. Додавання/видалення сервера зачіпає лише <strong>~1/N ключів</strong> (сусідній сегмент кільця), решта лишається на місці. Віртуальні вузли (vnodes) вирівнюють розподіл. Це основа Redis cluster, CDN, шардингу."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Що це і навіщо</h3>
            <p><strong>Load Balancer (LB)</strong> — це <strong>reverse proxy</strong>, що розподіляє вхідний трафік між кількома ідентичними інстансами застосунку (backends / upstream). Він робить можливим <strong>horizontal scaling</strong> і прибирає single point of failure на рівні застосунку.</p>
            <div class="grid2">
              <div class="card blue"><h4>Що дає LB</h4>
                <ul class="list">
                  <li><strong>Scalability</strong> — більше RPS, ніж витягне один сервер</li>
                  <li><strong>High availability</strong> — впав інстанс → трафік іде на живі</li>
                  <li><strong>Performance</strong> — рівне навантаження, нижча латентність</li>
                  <li><strong>Maintainability</strong> — rolling / blue-green деплой без даунтайму</li>
                </ul>
              </div>
              <div class="card green"><h4>Де стоїть у картині</h4>
                <ul class="list">
                  <li>Clients → DNS / CDN → <strong>LB</strong> → пул stateless-серверів → DB / Cache / Queue</li>
                  <li>Часто не один: <strong>L4 LB</strong> на вході → <strong>L7 LB / API Gateway</strong> глибше → сервіси</li>
                  <li>CDN спереду віддає <em>статику</em> географічно; LB — <em>динаміку</em> до застосунку</li>
                </ul>
              </div>
            </div>`
        },
        {
          "kind": "mermaid",
          "caption": "Ланцюг трафіку: CDN → L4 LB → L7 LB → пул stateless-інстансів, стан назовні",
          "code": `flowchart TB
  C["Clients (browsers)"] --> DNS["DNS / CDN<br/>(статика, edge-кеш)"]
  DNS --> L4["L4 LB<br/>TCP/IP · швидкий розподіл"]
  L4 --> L7["L7 LB / API Gateway<br/>path routing · SSL termination · rate limit"]
  L7 --> S1["Instance 1"]
  L7 --> S2["Instance 2"]
  L7 --> S3["Instance 3"]
  S1 --> R["Redis: сесії · pub/sub"]
  S2 --> R
  S3 --> R
  S1 --> DB[("DB / Cache / Queue")]
  S2 --> DB
  S3 --> DB`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">L4 vs L7 — must-know розрізнення</h3>
            <div class="table-wrap">
              <table>
                <tr><th></th><th>L4 (transport)</th><th>L7 (application)</th></tr>
                <tr><td>Рівень</td><td>TCP / UDP (IP + порт)</td><td>HTTP / HTTPS (URL, headers, cookies)</td></tr>
                <tr><td>Що бачить</td><td>пакети, не контент</td><td>повний HTTP-запит: path, host, заголовки</td></tr>
                <tr><td>Рішення на основі</td><td>IP / порт</td><td>URL path, host, cookie, method</td></tr>
                <tr><td>Швидкість</td><td>швидший (менше парсингу)</td><td>трохи повільніший (аналіз контенту)</td></tr>
                <tr><td>Можливості</td><td>простий розподіл</td><td>routing за шляхом, SSL termination, кеш, стиснення, rate limit</td></tr>
                <tr><td>Приклад</td><td>AWS NLB</td><td>AWS ALB, Nginx, HAProxy (L7 mode)</td></tr>
              </table>
            </div>
            <div class="alert good"><span class="icon">💡</span> <span>L7-рішення: <code>/api/*</code> → backend-пул, <code>/images/*</code> → інший пул; A/B testing за cookie; canary за header. Це те, що фронтенд реально бачить у роботі з мікрофронтендами та feature-роллаутами.</span></div>`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Алгоритми балансування</h3>
            <div class="table-wrap">
              <table>
                <tr><th>Алгоритм</th><th>Як працює</th><th>Коли</th></tr>
                <tr><td><strong>Round Robin</strong></td><td>по черзі на кожен сервер</td><td>сервери рівні, запити однорідні</td></tr>
                <tr><td><strong>Weighted Round Robin</strong></td><td>більше на потужніші (ваги)</td><td>різна потужність інстансів</td></tr>
                <tr><td><strong>Least Connections</strong></td><td>на сервер з найменшою к-стю активних з'єднань</td><td>довгі/нерівномірні з'єднання (WebSocket!)</td></tr>
                <tr><td><strong>Least Response Time</strong></td><td>на найшвидший (мін. латентність)</td><td>оптимізація latency</td></tr>
                <tr><td><strong>IP Hash</strong></td><td>сервер за хешем IP клієнта</td><td>потрібна «прив'язка» клієнта (sticky)</td></tr>
                <tr><td><strong>Consistent Hashing</strong></td><td>хеш-кільце, мінімум перерозподілу при зміні к-сті вузлів</td><td>розподілені кеші, sharding</td></tr>
              </table>
            </div>
            <div class="alert"><span class="icon">🎯</span> <span><strong>Consistent hashing</strong> — часте follow-up питання. При <code>hash % N</code> зміна кількості серверів перетасовує майже всі ключі; на хеш-кільці — лише ~1/N. Критично для Redis cluster і CDN.</span></div>`
        },
        {
          "kind": "paragraph",
          "html": `<div class="grid2">
              <div class="card"><h4>📌 Sticky sessions (session affinity)</h4>
                <p><strong>Проблема:</strong> сервер тримає сесію в пам'яті → наступний запит юзера має потрапити на той самий сервер (LB прив'язує через cookie / IP hash).</p>
                <p><strong>Але це антипатерн.</strong> Правильно: backend <strong>stateless</strong>, стан назовні — сесії в Redis, токени в JWT. Тоді будь-який інстанс обробить будь-який запит, LB балансує вільно, легко масштабувати.</p>
              </div>
              <div class="card"><h4>🩺 Health checks</h4>
                <p><strong>Active</strong> — LB періодично пінгує <code>GET /health</code> і виводить з ротації тих, хто не відповідає.</p>
                <p><strong>Passive</strong> — LB стежить за реальними запитами; сервер сипле помилки/таймаути → позначається нездоровим.</p>
                <p>Health-endpoint часто перевіряє й залежності (БД, кеш), а не лише «процес живий».</p>
              </div>
              <div class="card"><h4>♻️ Redundancy самого LB</h4>
                <p>LB не має бути SPOF: <strong>active-passive</strong> (резервний перебирає через failover, VIP + heartbeat), <strong>active-active</strong> (кілька LB одночасно, трафік ділиться DNS / anycast), <strong>DNS load balancing</strong> (round robin по IP перед самими LB).</p>
              </div>
              <div class="card"><h4>➕ Що L7 LB часто робить іще</h4>
                <p>SSL/TLS termination (розшифровка на LB, далі HTTP — і там же сертифікати), gzip/brotli, кеш статики, rate limiting / DDoS-захист, request routing (path/host), метрики трафіку й латентності.</p>
              </div>
            </div>`
        },
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Frontend-специфічні дотики</h3>
            <ul class="list">
              <li><strong>CDN vs LB:</strong> CDN балансує й кешує <em>статику</em> географічно (edge); LB балансує <em>динамічні</em> запити до застосунку. Часто в парі: CDN спереду, LB для origin.</li>
              <li><strong>WebSocket + LB:</strong> довгі з'єднання → <strong>Least Connections</strong> + stateless pub/sub, щоб інстанси не тримали стан з'єднання локально (Centrifugo / Redis).</li>
              <li><strong>A/B / canary на L7:</strong> LB/edge маршрутизує % трафіку на нову версію за cookie/header — та сама ідея, що feature flags, але на рівні інфраструктури.</li>
              <li><strong>Blue-green / rolling deploy:</strong> LB виводить старі інстанси й вводить нові без даунтайму (zero-downtime switch між версіями).</li>
              <li><strong>Vercel / edge network:</strong> фактично managed LB + CDN — деплой на Vercel це робота поверх цієї абстракції.</li>
            </ul>
            <div class="alert good"><span class="icon">🗣️</span> <span><strong>Скелет відповіді на інтерв'ю (крок «scaling»):</strong> «Один сервер не витримає навантаження і є SPOF, тому ставлю LB перед пулом stateless-інстансів. L7 для path-routing і SSL termination; Least Connections для WS, Round Robin для звичайного HTTP. Сесійний стан — у Redis, щоб не потрібні були sticky sessions. Health checks виводять хворі інстанси; сам LB в active-passive. Статику й географію віддаю CDN спереду.» Чесна межа: «Руками в проді LB конфігурував DevOps — я розумію роль і працюю поверх (Vercel edge, CDN, WS за балансуванням).»</span></div>`
        }
      ]
    },
    {
      "id": "observability",
      "title": "🔭 Observability та продуктивність у проді",
      interviewQuestions: [
        {
          "question": "Чим RUM відрізняється від синтетичного моніторингу і навіщо потрібні обидва?",
          "answer": "<strong>RUM</strong> (Real User Monitoring) — метрики з браузерів реальних користувачів: справжні пристрої, мережі, гео, розподіл (p75/p95), а не середнє. Показує, що болить <em>насправді</em>. <strong>Синтетика</strong> — бот ганяє сценарії за розкладом з фіксованого оточення: стабільна база для порівняння реліз-до-релізу, ловить регресії до того, як їх побачать користувачі, працює для рідкісних сторінок без трафіку. RUM каже «що зараз погано в проді», синтетика — «чи не стало гірше після мого деплою»."
        },
        {
          "question": "Помилка в проді: у Sentry стектрейс на мініфікованому коді. Що має бути налаштовано?",
          "answer": "<strong>Source maps</strong> завантажуються в трекер під час білда (з release-версією), але <em>не</em> роздаються публічно. Кожен реліз тегується (<code>release: git-sha</code>), щоб трекер зіставив помилку з правильними мапами й показав оригінальні файли/рядки, а також показав «в якому релізі з'явилось». Плюс — завантаження джерел прибирається з публічного CDN, щоб не віддавати вихідний код."
        },
        {
          "question": "Що таке distributed tracing і як фронтенд у ньому бере участь?",
          "answer": "Один користувацький клік породжує ланцюг: браузер → BFF → 3 сервіси → БД. Tracing зшиває це в один <strong>trace</strong> зі span'ами на кожному кроці — видно, де саме 800 мс. Фронтенд <strong>починає trace</strong> і передає <code>traceparent</code> (W3C Trace Context) заголовком у кожен запит; бекенд-сервіси його підхоплюють і додають свої span'и. Без участі клієнта trace «починається» лише на BFF, і ти не бачиш мережу та рендер."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<p>«Observability» — здатність зрозуміти, <em>що</em> і <em>чому</em> відбувається в проді, не додаючи новий код. Три джерела: <strong>метрики</strong> (числа в часі), <strong>логи</strong> (події), <strong>трейси</strong> (шлях одного запиту крізь систему).</p>`
        },
        {
          "kind": "mermaid",
          "caption": "Конвеєр телеметрії: браузер → збір → обробка → сховище → дашборди й алерти",
          "code": `flowchart LR
  BR["Браузер SDK<br/>RUM · CWV · errors · traces"] --> ING["Collector / ingest"]
  ING --> PIPE["Обробка<br/>семплінг · збагачення · дедуп"]
  PIPE --> STORE[("Сховище<br/>метрики / логи / трейси")]
  STORE --> DASH["Дашборди"]
  STORE --> ALERT["Alerting<br/>на симптоми (SLO)"]`
        },
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Що</th><th>Інструмент</th><th>Ключове</th></tr>
                <tr><td>Core Web Vitals (field)</td><td><code>web-vitals</code> → аналітика</td><td>LCP / INP / CLS за p75, сегментовано по маршруту й пристрою</td></tr>
                <tr><td>JS-помилки</td><td>Sentry / Rollbar</td><td>Source maps + release; групування; breadcrumbs</td></tr>
                <tr><td>Distributed tracing</td><td>OpenTelemetry</td><td><code>traceparent</code> з браузера; span на fetch і рендер</td></tr>
                <tr><td>Продуктова аналітика</td><td>Amplitude / PostHog</td><td>Події користувача → воронки, retention</td></tr>
                <tr><td>Session replay</td><td>PostHog / FullStory</td><td>Відтворити баг; маскувати PII</td></tr>
              </table>
            </div>
            <h3 class="topic">SLI / SLO / error budget</h3>
            <ul class="list">
              <li><strong>SLI</strong> — вимірюваний показник (напр. % запитів дашборда з LCP &lt; 2.5с).</li>
              <li><strong>SLO</strong> — ціль на SLI (напр. 95% за 28 днів).</li>
              <li><strong>Error budget</strong> — дозволені 5%; вичерпали — фокус на надійність замість фіч.</li>
            </ul>
            <div class="alert"><strong>💡 Алерти — на симптоми, не на причини.</strong> «p95 INP &gt; 500 мс 10 хв поспіль» (болить користувачу), а не «CPU 80%» (може бути нормою). Інакше — alert fatigue.</div>`
        }
      ]
    },
    {
      "id": "system-design-case-studies",
      "title": "🧩 Розбір типових задач",
      interviewQuestions: [
        {
          "question": "«Спроєктуй стрічку новин» — у чому головний trade-off, який інтерв'юер хоче почути?",
          "answer": "<strong>Fan-out on write vs on read.</strong> On write (push): при публікації поста запис кладеться в матеріалізовані стрічки всіх фоловерів — читання миттєве, але публікація дорога, і «зірка» з 50 млн фоловерів кладе систему. On read (pull): пост пишеться один раз, стрічка збирається в момент запиту з усіх підписок — дешевий запис, дорогі й повільні читання. Практика — <strong>гібрид</strong>: push для звичайних, pull для акаунтів із мільйонами фоловерів, злиття на клієнті/BFF."
        },
        {
          "question": "«Спроєктуй autocomplete для пошуку» — які фронтенд-специфічні рішення назвати?",
          "answer": "Debounce вводу (~150-250 мс), скасування застарілих запитів (<code>AbortController</code> / <code>switchMap</code>), захист від race («відповідь на застарілий запит перезаписує свіжий»), кеш за префіксом (набрав «rea» → «reac» — фільтруємо локально), мінімальна довжина запиту, keyboard-навігація + ARIA (<code>combobox</code>, <code>aria-activedescendant</code>), обмеження частоти на сервер, edge-кеш популярних префіксів, показ stale-результатів поки вантажиться новий."
        },
        {
          "question": "Дашборд із 50 незалежних віджетів — як спроєктувати, щоб не було 50 водоспадних запитів і однієї точки відмови?",
          "answer": "Кожен віджет — незалежний блок зі своїм запитом, <strong>error boundary</strong> й скелетоном (падіння одного не роняє інші). Запити <strong>батчаться</strong> через BFF (<code>POST /dashboard/batch</code> з переліком віджетів) або GraphQL — один round-trip. <strong>Віртуалізація</strong> / lazy-mount: вантажимо дані лише для віджетів у в'юпорті. Спільні довідники — один запит, шаринг через кеш. Пріоритезація: критичні KPI спочатку, важкі графіки — потоково."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Мок-walkthrough: real-time аналітичний дашборд</h3>
            <ol>
              <li><strong>Вимоги.</strong> Хто користувач (внутрішні аналітики, ~2k)? Скільки віджетів на екран (10-30)? Наскільки «real-time» (оновлення раз на 5-10 с достатньо)? Історична глибина (90 днів)? SEO — ні (за логіном).</li>
              <li><strong>Оцінки.</strong> 2k користувачів × 20 віджетів × оновлення/10с ≈ 4k запитів/с на піку → потрібен агрегувальний шар і кеш, «в лоб» у сирі таблиці не піде.</li>
              <li><strong>API.</strong> <code>POST /dashboard/batch</code> (список віджетів → дані одним викликом) + SSE <code>/dashboard/stream</code> для інкрементів. Пагінація для drill-down таблиць — cursor.</li>
              <li><strong>Модель даних.</strong> Сирі події → передагреговані rollup-таблиці (по хвилині/годині) у колонковому сховищі; клієнт майже завжди читає rollup, не сирі рядки.</li>
              <li><strong>High-level.</strong> Браузер → CDN (shell, CSR за логіном) → BFF (агрегація, кеш у Redis 5-10 с) → analytics-сервіс → OLAP-сховище; SSE-нода за pub/sub для інкрементів.</li>
              <li><strong>Deep-dive.</strong> Кожен віджет: <code>useQuery</code> з <code>staleTime</code> ≈ інтервал, error boundary, skeleton. Батч на BFF згортає N віджетів у 1 запит. Оновлення — SSE-патчі в кеш (не повний refetch). Віртуалізація списку віджетів.</li>
              <li><strong>Trade-offs.</strong> Rollup = дані з лагом до 1 хв (ок для аналітики, не для алертингу). Кеш BFF 10 с = усі бачать однакове з точністю до 10 с. SSE замість WS — простіше, бо канал від клієнта не потрібен.</li>
            </ol>`
        },
        {
          "kind": "mermaid",
          "caption": "Стрічка новин: fan-out on write (push) vs on read (pull)",
          "code": `flowchart TB
  subgraph WRITE["Fan-out on write (push)"]
    P1["Автор постить"] --> F1["Запис у стрічку<br/>кожного фоловера"]
    F1 --> R1["Читання: миттєве<br/>(готовий список)"]
  end
  subgraph READ["Fan-out on read (pull)"]
    P2["Автор постить"] --> F2["Один запис у БД"]
    F2 --> R2["Читання: зібрати стрічку<br/>з усіх підписок"]
  end`
        },
        {
          "kind": "paragraph",
          "html": `<div class="grid2">
              <div class="card"><h4>📝 Спільний редактор (Google Docs-like)</h4>
                <p><strong>Рішення:</strong> CRDT (Yjs) або OT для злиття правок; WebSocket + awareness для presence/курсорів; локальна persist (IndexedDB) для офлайну; сервер — реле + снапшоти.</p>
                <p><strong>Trade-off:</strong> CRDT простіший у p2p і офлайні, але більший обсяг метаданих; OT компактніший, але складний сервер.</p>
              </div>
              <div class="card"><h4>🎨 Design system у масштабі</h4>
                <p><strong>Рішення:</strong> монорепо, версіоновані пакети, токени як єдине джерело, візуальні регрес-тести (Chromatic), codemods для міграцій, канал підтримки + внески від продуктових команд.</p>
                <p><strong>Trade-off:</strong> сувора централізація гальмує команди; повна свобода вбиває консистентність — потрібен «paved path» + escape hatch.</p>
              </div>
              <div class="card"><h4>🖼️ Галерея зображень / відео</h4>
                <p><strong>Рішення:</strong> адаптивні розміри (<code>srcset</code>), сучасні формати (AVIF/WebP), CDN-трансформації, lazy-load + <code>IntersectionObserver</code>, blur-up placeholder, віртуалізація сітки.</p>
                <p><strong>Trade-off:</strong> агресивна оптимізація якості економить трафік, але додає складність пайплайну й ризик артефактів.</p>
              </div>
              <div class="card"><h4>⌨️ Autocomplete / typeahead</h4>
                <p><strong>Рішення:</strong> debounce, <code>AbortController</code>, кеш за префіксом, захист від race, ARIA <code>combobox</code>, edge-кеш популярних запитів.</p>
                <p><strong>Trade-off:</strong> коротший debounce = чутливіше, але більше запитів і race-ситуацій.</p>
              </div>
            </div>`
        }
      ]
    },
    {
      "id": "staff-level-architecture",
      "title": "🏛️ Staff-level: крос-командна архітектура",
      interviewQuestions: [
        {
          "question": "Чим system design відповідь Staff-інженера відрізняється від Senior на тому ж питанні?",
          "answer": "Senior проєктує <em>систему</em>; Staff проєктує <em>як кілька команд будуватимуть і розвиватимуть систему роками</em>. З'являються: межі власності (хто за що відповідає), контракти між командами й сумісність, стратегія міграції (strangler fig замість «великого переписування»), evolutionary architecture (рішення, які легко змінити пізніше), вплив на організацію (Conway), вимір ефекту (adoption, DORA, зменшення toil). Staff менше малює бокси, більше говорить про людей, контракти й час."
        },
        {
          "question": "Що таке «fitness functions» в evolutionary architecture і навіщо вони?",
          "answer": "Автоматизовані перевірки архітектурних властивостей, що <strong>виконуються в CI</strong> як тести: «бандл головного маршруту ≤ 200 КБ», «жоден пакет UI не імпортує з feature-шару», «немає циклічних залежностей між модулями», «p95 час білда ≤ X». Архітектура «розмивається» поступово й непомітно — fitness functions роблять деградацію видимою одразу, як звичайний failing test, замість того щоб виявити її через рік."
        },
        {
          "question": "Consumer-driven contract testing — яку проблему вирішує на межі команд?",
          "answer": "Коли фронтенд-команда залежить від API іншої команди, зміна на бекенді може тихо зламати клієнт — а e2e-тести повільні й крихкі. При CDC споживач (фронт) описує <strong>очікуваний контракт</strong> (які поля, формати він реально використовує), цей контракт ганяється проти бекенду в його CI. Бекенд дізнається про поломку <em>до</em> деплою, і тільки для того, що реально споживається, а не для всієї схеми. Pact — типовий інструмент."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<p>На Staff-рівні співбесіда зсувається з «намалюй систему» до «як команда/організація <strong>будує і змінює</strong> систему протягом років». Архітектура тут — це насамперед <em>межі, контракти й напрям</em>, а не діаграма компонентів.</p>`
        },
        {
          "kind": "mermaid",
          "caption": "Закон Конвея: межі команд віддзеркалюються в межах модулів/сервісів",
          "code": `flowchart LR
  subgraph Org["Організація"]
    T1["Команда Checkout"]
    T2["Команда Search"]
    T3["Команда Platform"]
  end
  subgraph Sys["Система"]
    M1["Checkout сервіс / модуль"]
    M2["Search сервіс / модуль"]
    M3["Design system · CI · SDK"]
  end
  T1 --- M1
  T2 --- M2
  T3 --- M3`
        },
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Практика</th><th>Суть</th><th>Навіщо</th></tr>
                <tr><td><strong>Evolutionary architecture</strong></td><td>Рішення, оптимізовані під зміну, а не під «правильність назавжди»</td><td>Вимоги міняються; ціна помилки = ціна розвороту</td></tr>
                <tr><td><strong>Fitness functions</strong></td><td>Архітектурні інваріанти як тести в CI</td><td>Робить поступову деградацію видимою одразу</td></tr>
                <tr><td><strong>Contract testing (CDC)</strong></td><td>Споживач описує контракт, він ганяється в CI провайдера</td><td>Ловить поломки на межі команд до деплою</td></tr>
                <tr><td><strong>Design-system governance</strong></td><td>Paved path + escape hatch, внески від команд, регрес-тести</td><td>Консистентність без «пляшкового горлечка» з однієї команди</td></tr>
                <tr><td><strong>Platform / paved path</strong></td><td>Найпростіший шлях = правильний шлях (шаблони, SDK, дефолти)</td><td>Масштабує кращі практики без ручного контролю</td></tr>
                <tr><td><strong>RFC / ADR</strong></td><td>Письмові пропозиції та зафіксовані рішення з контекстом</td><td>Асинхронне узгодження; «чому» переживає авторів</td></tr>
                <tr><td><strong>Strangler fig</strong></td><td>Поступова заміна legacy за фічами через проксі/роутинг</td><td>Уникнути ризикованого «великого переписування»</td></tr>
                <tr><td><strong>Build vs buy</strong></td><td>Чи це наша диференціація? Вартість володіння?</td><td>Не будувати те, що не є конкурентною перевагою</td></tr>
              </table>
            </div>
            <div class="alert good"><span class="icon">📊</span> <span><strong>Вимір впливу Staff-роботи:</strong> adoption (скільки команд перейшло на paved path), DORA-метрики (частота деплоїв, lead time, MTTR, change failure rate), зменшення toil (годин ручної роботи), скорочення часу онбордингу. «Я зробив бібліотеку» — слабко; «5 команд мігрували, час на нову фічу впав удвічі» — сильно.</span></div>`
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
          "html": "<h3 class=\"topic\">Топ питань з архітектури</h3><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як масштабувати React застосунок?</h4>\n    <p>Feature-based структура → Lazy loading → Code splitting по routes → TanStack Query для server state → Zustand для client state → React.memo + селектори де потрібно → Virtualization для великих списків → Monorepо (Turborepo) якщо кілька apps.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Context vs Zustand — коли що?</h4>\n    <p>Context — для рідко змінних даних (theme, locale, auth user). Якщо щось змінюється часто (cart, notifications, real-time) — Zustand, бо Context ре-рендерить всіх споживачів при будь-якій зміні.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як зробити компонент performant?</h4>\n    <p>1) Профайлер спочатку — знайти реальну проблему. 2) State нижче — не піднімай вище ніж потрібно. 3) Composition — Server Components + Client листи. 4) React.memo + useCallback якщо є виміряна проблема. 5) Virtualization для списків 500+.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Що таке hydration mismatch і як уникнути?</h4>\n    <p>Server HTML відрізняється від першого client render. Причини: Date.now(), Math.random(), window checks, user-specific data. Рішення: useEffect для browser-only коду, suppressHydrationWarning для timestamp-like елементів, перевіряти typeof window !== 'undefined'.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як ти організуєш API calls?</h4>\n    <p>Service layer (api/ папка з fetch-функціями) → TanStack Query hooks з queryKey + queryFn → Shared error handling у queryClient → TypeScript типи з бекенду (zod validation або code-gen). Ніяких raw fetch в компонентах.</p>\n  </div><div class=\"card\">\n    <h4>❓ Micro-frontends — коли виправдано?</h4>\n    <p>Коротко: різні команди з різними deploy cycles, поступова legacy-міграція, різні tech stacks. Підходи інтеграції (Module Federation, iframe, Web Components) і trade-offs — у розділі «🧩 Micro-frontends» вище.</p>\n  </div>"
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
          "html": "<h3 class=\"topic\">Core Web Vitals</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Метрика</th><th>Що вимірює</th><th>Ціль</th><th>Як покращити</th></tr>\n      <tr><td><strong>LCP</strong> (Largest Contentful Paint)</td><td>Час до largest visible element</td><td>&lt; 2.5s</td><td>Preload fonts/images, SSR, CDN</td></tr>\n      <tr><td><strong>INP</strong> (Interaction to Next Paint)</td><td>Затримка відповіді на взаємодію</td><td>&lt; 200ms</td><td>Defer non-urgent JS, useTransition</td></tr>\n      <tr><td><strong>CLS</strong> (Cumulative Layout Shift)</td><td>Стабільність layout</td><td>&lt; 0.1</td><td>Задавати size для images/video/ads</td></tr>\n    </table>\n  </div><h3 class=\"topic\">Code Splitting стратегії</h3><p>Розбиваємо бандл на менші чанки, що вантажаться лише коли реально потрібні — менше JS для парсингу на старті, швидший TTI. <strong>Route-based</strong> — по сторінках (Next.js робить це автоматично для кожного route). <strong>Component-based</strong> — важкі, рідко потрібні компоненти (модалки, редактори, графіки), окремо від основного бандла. <strong>On interaction</strong> — довантаження коду в момент кліку/наведення, коли компонент навіть не змонтований до цього.</p>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// Route-based (Next.js — автоматично)\n// React — React.lazy()\nconst Dashboard = React.lazy(() => import('./Dashboard'));\n\n// Component-based (важкі компоненти)\nconst HeavyChart = React.lazy(() => import('./HeavyChart'));\n\n// On interaction\nbutton.addEventListener('click', async () => {\n  const { processData } = await import('./heavy-processing');\n  processData(data);\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Virtual Scrolling — коли потрібно</h3><div class=\"grid2\">\n    <div class=\"card red\"><h4>❌ Без virtualization (1000+ items)</h4><p>DOM має тисячі вузлів. Scroll — laggy. Layout thrashing. Memory через дах.</p></div>\n    <div class=\"card green\"><h4>✅ react-virtuoso / react-window</h4><p>Рендерить тільки visible items. DOM — ~20-30 вузлів незалежно від розміру списку.</p></div>\n  </div><h3 class=\"topic\">Layout Thrashing <span class=\"tag tag-pit\">PITFALL</span></h3><p>Виникає, коли читання layout-властивості (<code>offsetHeight</code>, <code>getBoundingClientRect</code>...) чергується із записом стилю в циклі: кожне читання після запису змушує браузер синхронно перерахувати layout (forced synchronous reflow), замість одного разу в кінці кадру. На великих списках/DOM-деревах це особливо помітно як «підвисання» скролу чи анімації.</p>"
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
      "id": "micro-frontends",
      "title": "🧩 Micro-frontends",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>Micro-frontends</strong> — архітектурний підхід, коли фронтенд збирається з кількох незалежно розроблюваних і деплойованих частин (окремими командами, часто на різних стеках), а не як один моноліт. Мета та сама, що й у мікросервісів на бекенді: незалежні деплої, ізоляція збоїв, свобода вибору технологій для кожної команди.</p><h3 class=\"topic\">Підходи до інтеграції</h3><div class=\"table-wrap\">\n    <table>\n      <tr><th>Підхід</th><th>Як працює</th><th>Плюси / мінуси</th></tr>\n      <tr><td><strong>Build-time</strong></td><td>Кожна частина — npm-пакет, host збирає все в один бандл під час білда</td><td>Просто, типобезпечно; але деплой лише разом з host — незалежність релізів втрачається</td></tr>\n      <tr><td><strong>iframe</strong></td><td>Кожна частина — окрема сторінка у власному iframe</td><td>Повна ізоляція CSS/JS; важкий спільний стан, роутинг, SEO, «шви» в UX між частинами</td></tr>\n      <tr><td><strong>Web Components</strong></td><td>Кожна частина — custom element з власним Shadow DOM</td><td>Framework-agnostic, ізоляція стилів; складніше типізувати пропси/події між частинами</td></tr>\n      <tr><td><strong>Module Federation</strong></td><td>Webpack 5 / Vite вантажить чанки інших застосунків у рантаймі</td><td>Незалежні деплої, спільні залежності (React) не дублюються; потрібна дисципліна версіонування shared-пакетів</td></tr>\n      <tr><td><strong>Server-side composition</strong></td><td>Edge/gateway (напр. Next.js Multi-Zones) збирає HTML з кількох застосунків</td><td>Добре для SEO і швидкого First Paint; складніша інфраструктура на edge</td></tr>\n    </table>\n  </div>"
        },
        {
          "kind": "code",
          "language": "typescript",
          "code": "// webpack.config.js — host застосунок споживає remote\nnew ModuleFederationPlugin({\n  name: 'host',\n  remotes: {\n    checkout: 'checkout@https://checkout.example.com/remoteEntry.js',\n  },\n  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },\n});\n\n// remote застосунок (checkout) — що саме віддає назовні\nnew ModuleFederationPlugin({\n  name: 'checkout',\n  filename: 'remoteEntry.js',\n  exposes: { './CheckoutApp': './src/CheckoutApp' },\n  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },\n});\n\n// host — динамічний імпорт remote-компонента\nconst CheckoutApp = React.lazy(() => import('checkout/CheckoutApp'));"
        },
        {
          "kind": "note",
          "tone": "warn",
          "html": "<div class=\"alert warn\"><strong>⚠️ Не за замовчуванням.</strong> Micro-frontends розв'язують організаційну проблему (кілька команд/деплоїв), а не технічну. Ціна — дублювання інфраструктури, складніший CI/CD, узгодження дизайн-системи між частинами. Якщо цієї організаційної проблеми немає — простіший monorepo (Nx/Turborepo) зі спільними пакетами дає ту саму модульність без рантайм-складності.</div>"
        }
      ]
    },
    {
      "id": "system-design-interview",
      "title": "🧭 Як проходити System Design співбесіду",
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<h3 class="topic">Каркас (уголос)</h3>
            <ol>
              <li>Вимоги: функц. + нефункц. (масштаб, латентність, консистентність). Уточнюй.</li>
              <li>Оцінки: DAU, RPS (read/write), обсяг даних.</li>
              <li>API: 3-5 ключових ендпоінтів.</li>
              <li>Модель даних: SQL / NoSQL і <em>чому</em>.</li>
              <li>High-level: клієнт → edge → gateway/BFF → сервіси → сховища/кеш/черги.</li>
              <li>Deep-dive: 1-2 компоненти за інтересом інтерв'юера.</li>
              <li>Trade-offs + підсумок (назви слабкі місця).</li>
            </ol>
            <div class="alert warn"><strong>⚠️</strong> Не поліруй першу частину — краще грубий повний ескіз, ніж ідеальна модель даних без масштабування.</div>`
        },
        {
          "kind": "mermaid",
          "code": `flowchart LR
  A["Вимоги"] --> B["Оцінки"] --> C["API"] --> D["Дані"] --> E["High-level"] --> F["Deep-dive"] --> G["Trade-offs"]`
        }
      ]
    },
    {
      "id": "high-level-architecture",
      "title": "🏗️ High-level архітектура веб-системи",
      "blocks": [
        {
          "kind": "mermaid",
          "code": `flowchart TB
  U["Клієнт"] --> CDN["CDN + Edge"] --> LB["Load Balancer"] --> BFF["Gateway / BFF"]
  BFF --> S1["Auth"]
  BFF --> S2["Users"]
  BFF --> S3["Feed"]
  S2 --> DB[("SQL")]
  S3 --> CACHE[("Redis")]
  S3 --> Q["Черга"]
  Q --> W["Воркери"]`
        },
        {
          "kind": "paragraph",
          "html": `<ul class="list">
              <li><strong>BFF</strong> — тонкий шар фронтенд-команди: агрегує сервіси в 1 виклик, формат під клієнта.</li>
              <li><strong>Stateless-сервіси</strong> — умова горизонтального скейлу; стан → Redis / S3 / черга / БД.</li>
              <li><strong>Черга</strong> — розв'язка в часі й навантаженні, fan-out, ретраї; ціна — eventual consistency.</li>
              <li>Глибше про backend — тема <strong>Fullstack</strong> (<code>/fullstack</code>).</li>
            </ul>`
        }
      ]
    },
    {
      "id": "rendering-delivery",
      "title": "🌐 Рендеринг і доставка",
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Стратегія</th><th>Коли</th></tr>
                <tr><td>CSR</td><td>Приватна панель за логіном, без SEO</td></tr>
                <tr><td>SSR</td><td>Персоналізовано + SEO + свіжі дані</td></tr>
                <tr><td>SSG</td><td>Статичний контент (докси, маркетинг)</td></tr>
                <tr><td>ISR</td><td>Контент, що змінюється, однаковий для всіх</td></tr>
                <tr><td>Streaming SSR / RSC</td><td>Швидкий shell + менший бандл + дані потоком</td></tr>
              </table>
            </div>
            <p><strong>Hydration cost:</strong> класичний SSR виглядає готовим, але не реагує до кінця гідрації (INP/TBT). Streaming гідратує вибірково; RSC не шле JS серверних компонентів узагалі.</p>`
        }
      ]
    },
    {
      "id": "api-data-layer",
      "title": "🔌 API та шар даних",
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<div class="grid3">
              <div class="card"><h4>tRPC</h4><p>Один TS-репозиторій, одна команда. Типи наскрізь, 0 кодогенерації.</p></div>
              <div class="card"><h4>GraphQL</h4><p>Багато клієнтів з різними потребами, глибокі графи. Ціна — кеш, N+1.</p></div>
              <div class="card"><h4>REST</h4><p>Публічне API, сторонні споживачі, HTTP-кеш «з коробки».</p></div>
            </div>
            <ul class="list">
              <li><strong>Пагінація:</strong> cursor/keyset для стрічки (стабільна, швидка); offset лише для «стрибнути на сторінку N».</li>
              <li><strong>Кеш-шар</strong> (TanStack Query): дедуп, SWR, інвалідація за ключем, optimistic + rollback, retry.</li>
              <li><strong>Нормалізація:</strong> сутності за id, списки як масиви id — одне джерело правди.</li>
            </ul>`
        }
      ]
    },
    {
      "id": "realtime-systems",
      "title": "⚡ Real-time системи",
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Транспорт</th><th>Коли</th></tr>
                <tr><td>Polling</td><td>Рідкі оновлення, затримка в секунди ок</td></tr>
                <tr><td>SSE</td><td>Сервер→клієнт стрім: нотифікації, прогрес</td></tr>
                <tr><td>WebSocket</td><td>Двонаправлено: чат, co-editing, presence</td></tr>
                <tr><td>WebRTC</td><td>P2P аудіо/відео</td></tr>
              </table>
            </div>
            <ul class="list">
              <li><strong>Reconnect:</strong> експоненційний backoff + jitter, cap ~30с, resume за Last-Event-ID.</li>
              <li><strong>Масштаб WS:</strong> sticky routing + pub/sub (Redis/NATS) між нодами; presence — TTL-ключі.</li>
              <li><strong>Доставка:</strong> at-least-once + дедуп за <code>event_id</code>; монотонний <code>seq</code> для розривів.</li>
            </ul>`
        }
      ]
    },
    {
      "id": "caching-consistency",
      "title": "🗃️ Кешування та консистентність",
      "blocks": [
        {
          "kind": "mermaid",
          "code": `flowchart LR
  A["JS memory"] --> B["Service Worker"] --> C["HTTP-кеш"] --> D["CDN"] --> E["Redis"] --> F[("БД")]`
        },
        {
          "kind": "paragraph",
          "html": `<ul class="list">
              <li><strong>SWR</strong> — показати кешоване миттєво, тихо оновити. Дефолт для 95% екранів.</li>
              <li><strong>Інвалідація:</strong> TTL (просто) → tag-based (точно) → event-based (найсвіжіше, найскладніше).</li>
              <li><strong>CAP на фронті:</strong> offline/optimistic = Availability над Consistency; «read-your-writes» — компроміс.</li>
              <li>Завжди вмій відповісти: «цей екран показує дані станом на коли?»</li>
            </ul>`
        }
      ]
    },
    {
      "id": "scaling-resilience",
      "title": "📈 Масштабування, стійкість, degradation",
      "blocks": [
        {
          "kind": "mermaid",
          "code": `flowchart TB
  R["Запит"] --> T{"Успіх?"}
  T -->|так| OK["Рендер"]
  T -->|ні| RT{"Retry?"}
  RT -->|так| BO["Backoff + jitter"] --> R
  RT -->|ні| CB{"Circuit breaker?"}
  CB -->|так| FB["Fallback: кеш / skeleton"]
  CB -->|ні| EB["Error boundary + телеметрія"]`
        },
        {
          "kind": "paragraph",
          "html": `<ul class="list">
              <li><strong>Retry</strong> + backoff + jitter — лише ідемпотентне; timeout на кожен запит.</li>
              <li><strong>Idempotency key</strong> (UUID на «Оплатити») з кожним retry — проти подвійного списання.</li>
              <li><strong>Graceful degradation:</strong> error boundary на кожен блок, fallback на кеш, feature flags / kill switch, offline-first черга дій.</li>
            </ul>`
        }
      ]
    },
    {
      "id": "observability",
      "title": "🔭 Observability та продуктивність у проді",
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<div class="table-wrap">
              <table>
                <tr><th>Що</th><th>Ключове</th></tr>
                <tr><td>CWV (field)</td><td>LCP / INP / CLS за p75, сегментовано по маршруту</td></tr>
                <tr><td>JS-помилки</td><td>Source maps + release-тег (git-sha)</td></tr>
                <tr><td>Tracing</td><td><code>traceparent</code> з браузера (W3C Trace Context)</td></tr>
                <tr><td>RUM vs синтетика</td><td>«що болить у проді» vs «чи не стало гірше після деплою»</td></tr>
              </table>
            </div>
            <p><strong>SLI/SLO/error budget:</strong> ціль на показник → вичерпали бюджет помилок → фокус на надійність. Алерти — на симптоми (p95 INP), не на причини (CPU).</p>`
        }
      ]
    },
    {
      "id": "system-design-case-studies",
      "title": "🧩 Розбір типових задач",
      "blocks": [
        {
          "kind": "paragraph",
          "html": `<div class="grid2">
              <div class="card"><h4>Стрічка новин</h4><p>Fan-out on write (push, дороге писання) vs on read (pull, дороге читання) → <strong>гібрид</strong> для зірок.</p></div>
              <div class="card"><h4>Autocomplete</h4><p>Debounce, <code>AbortController</code>, кеш за префіксом, захист від race, ARIA combobox.</p></div>
              <div class="card"><h4>Дашборд 50 віджетів</h4><p>Незалежні блоки + error boundary, батч-запит через BFF, віртуалізація / lazy-mount.</p></div>
              <div class="card"><h4>Спільний редактор</h4><p>CRDT (Yjs) / OT, WebSocket + awareness, локальна persist для офлайну, снапшоти на сервері.</p></div>
            </div>`
        },
        {
          "kind": "mermaid",
          "code": `flowchart LR
  W["Fan-out on write"] --> WR["читання швидке · писання дороге"]
  R["Fan-out on read"] --> RR["писання дешеве · читання дороге"]`
        }
      ]
    },
    {
      "id": "staff-level-architecture",
      "title": "🏛️ Staff-level: крос-командна архітектура",
      "blocks": [
        {
          "kind": "mermaid",
          "code": `flowchart LR
  T1["Команда Checkout"] --- M1["Checkout модуль"]
  T2["Команда Search"] --- M2["Search модуль"]
  T3["Команда Platform"] --- M3["Design system · CI · SDK"]`
        },
        {
          "kind": "paragraph",
          "html": `<ul class="list">
              <li><strong>Evolutionary architecture</strong> — рішення під зміну, не «правильні назавжди».</li>
              <li><strong>Fitness functions</strong> — архітектурні інваріанти як тести в CI (розмір бандла, межі імпортів).</li>
              <li><strong>Contract testing (CDC)</strong> — споживач описує контракт, ганяється в CI провайдера.</li>
              <li><strong>Paved path</strong> — найпростіший шлях = правильний (шаблони, SDK, дефолти) + escape hatch.</li>
              <li><strong>Strangler fig</strong> — поступова заміна legacy замість «великого переписування».</li>
              <li><strong>Вимір впливу:</strong> adoption, DORA-метрики, зменшення toil — не «зробив бібліотеку».</li>
            </ul>`
        }
      ]
    },
    {
      "id": "quick-interview-answers",
      "title": "🎯 Quick Interview Answers",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Топ питань з архітектури</h3><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як масштабувати React застосунок?</h4>\n    <p>Feature-based структура → Lazy loading → Code splitting по routes → TanStack Query для server state → Zustand для client state → React.memo + селектори де потрібно → Virtualization для великих списків → Monorepо (Turborepo) якщо кілька apps.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Context vs Zustand — коли що?</h4>\n    <p>Context — для рідко змінних даних (theme, locale, auth user). Якщо щось змінюється часто (cart, notifications, real-time) — Zustand, бо Context ре-рендерить всіх споживачів при будь-якій зміні.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як зробити компонент performant?</h4>\n    <p>1) Профайлер спочатку — знайти реальну проблему. 2) State нижче — не піднімай вище ніж потрібно. 3) Composition — Server Components + Client листи. 4) React.memo + useCallback якщо є виміряна проблема. 5) Virtualization для списків 500+.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Що таке hydration mismatch і як уникнути?</h4>\n    <p>Server HTML відрізняється від першого client render. Причини: Date.now(), Math.random(), window checks, user-specific data. Рішення: useEffect для browser-only коду, suppressHydrationWarning для timestamp-like елементів, перевіряти typeof window !== 'undefined'.</p>\n  </div><div class=\"card\" style=\"margin-bottom:12px\">\n    <h4>❓ Як ти організуєш API calls?</h4>\n    <p>Service layer (api/ папка з fetch-функціями) → TanStack Query hooks з queryKey + queryFn → Shared error handling у queryClient → TypeScript типи з бекенду (zod validation або code-gen). Ніяких raw fetch в компонентах.</p>\n  </div><div class=\"card\">\n    <h4>❓ Micro-frontends — коли виправдано?</h4>\n    <p>Коротко: різні команди з різними deploy cycles, поступова legacy-міграція, різні tech stacks. Підходи інтеграції (Module Federation, iframe, Web Components) і trade-offs — у розділі «🧩 Micro-frontends» вище.</p>\n  </div>"
        }
      ]
    }
  ]
}
