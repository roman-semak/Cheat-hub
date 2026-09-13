import type { QuickRefBlock } from './types'

// Architecture quickref board — condensed from the old prose
// `architectureCheat` sheet (SOLID, patterns, state, performance, system
// design). Mermaid diagrams were flattened into ordered entries.
export const architectureQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'SOLID',
    icon: '🧱',
    entries: [
      {
        term: 'S — Single Responsibility',
        desc: 'одна причина для зміни: або рендер, або фетч, або стан',
        code: `// ❌ God component
function UserPage() { /* fetch + format + render */ }

// ✅ Split
function useUser() { /* fetch */ }
function UserCard({ user }) { /* render */ }`,
      },
      {
        term: 'O — Open/Closed',
        desc: 'розширюй, не модифікуй — Strategy / plugin-мапа замість if/else',
        code: `const renderers = {
  circle: CircleRenderer,
  rect: RectRenderer,
};
renderers[shape.type]?.(shape);`,
      },
      { term: 'L — Liskov Substitution', desc: 'нащадок замінний на батька без зміни поведінки' },
      { term: 'I — Interface Segregation', desc: 'кілька вузьких інтерфейсів; компонент не залежить від зайвих props' },
      {
        term: 'D — Dependency Inversion',
        desc: 'залежність від абстракції — через props / context / <code>inject()</code>',
        code: `// ❌ import { StripePayment } from './stripe';

// ✅
interface PaymentProvider { charge(amount: number): Promise<void> }
function Checkout({ payment }: { payment: PaymentProvider }) { ... }`,
      },
    ],
  },
  {
    label: 'Patterns',
    icon: '🎨',
    entries: [
      {
        term: 'pipe / compose',
        desc: 'ланцюжок чистих функцій',
        code: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const process = pipe(validate, normalize, transform);
process(rawData);`,
      },
      {
        term: 'Currying / partial',
        code: `const multiply = (a: number) => (b: number) => a * b;
const double = multiply(2);   // double(5) === 10

const addTax = (rate: number, price: number) => price * (1 + rate);
const addUkrTax = addTax.bind(null, 0.2);`,
      },
      {
        term: 'Observer / EventBus',
        desc: '<code>on</code> повертає unsubscribe',
        code: `class EventBus {
  private listeners = new Map<string, Set<Function>>();
  on(event: string, fn: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn);
    return () => this.off(event, fn);
  }
  off(event: string, fn: Function) { this.listeners.get(event)?.delete(fn); }
  emit(event: string, data?: unknown) { this.listeners.get(event)?.forEach((fn) => fn(data)); }
}`,
      },
      {
        term: 'Factory',
        desc: 'функція створює об’єкт замість прямого <code>new</code>',
        code: `function createUser(role: 'admin' | 'viewer'): User {
  const base = { id: generateId(), createdAt: new Date() };
  if (role === 'admin') return { ...base, permissions: ['read', 'write', 'delete'] };
  return { ...base, permissions: ['read'] };
}`,
      },
      {
        term: 'Strategy',
        desc: 'swap алгоритму без зміни класу → Open/Closed',
        code: `interface SortStrategy { sort<T>(arr: T[]): T[] }

class DataGrid {
  constructor(private strategy: SortStrategy) {}
  setStrategy(s: SortStrategy) { this.strategy = s; }
  render<T>(data: T[]) { return this.strategy.sort(data); }
}`,
      },
    ],
  },
  {
    label: 'State: який інструмент',
    icon: '📊',
    entries: [
      { term: 'Server state', desc: 'async, може бути stale, треба refetch/invalidation → <b>TanStack Query / SWR</b>' },
      { term: 'Client state', desc: 'UI, preferences, форми — синхронне → <b>useState / Zustand / Context</b>' },
      { term: 'useState', desc: 'локальний UI state 1-2 компонентів' },
      { term: 'useReducer', desc: "складний пов'язаний state, передбачувані transitions" },
      { term: 'Context', desc: 'drilling 3+ рівні, але <b>рідко</b> змінюється (theme, locale, auth)' },
      { term: 'Zustand', desc: 'глобальний <b>часто</b> змінний — гранулярні selectors без re-render усіх' },
      { term: 'Redux Toolkit', desc: 'складні workflows, undo-redo, DevTools, middleware' },
      { term: 'Jotai', desc: 'атомарний fine-grained state, форми' },
    ],
  },
  {
    label: 'Optimistic update',
    icon: '⚡',
    entries: [
      {
        term: 'snapshot → set → request → rollback',
        desc: 'UI оновлюється одразу, відкат при помилці',
        code: `async function toggleLike(postId: string) {
  const prev = queryClient.getQueryData(['posts', postId]);
  queryClient.setQueryData(['posts', postId], (old) => ({ ...old, liked: !old.liked }));
  try {
    await api.toggleLike(postId);
  } catch {
    queryClient.setQueryData(['posts', postId], prev);
  }
}`,
      },
    ],
  },
  {
    label: 'Component design',
    icon: '🧩',
    entries: [
      { term: 'Presentational', desc: 'props → UI, без API/store, легко тестувати, Storybook' },
      { term: 'Container', desc: 'знає store/API/router, передає data і callbacks; ближче до route' },
      { term: 'Hooks', desc: '«smart» логіка без smart-обгортки — правило не жорстке' },
      {
        term: 'Composition > drilling',
        desc: 'передавай <code>children</code> замість прокидання props через рівні',
        code: `function App() {
  return (
    <Page>
      <Sidebar>
        <Avatar user={user} />
      </Sidebar>
    </Page>
  );
}
// Page і Sidebar просто рендерять children`,
        codeLanguage: 'tsx',
      },
      {
        term: 'Feature-based',
        desc: '<code>features/auth/{components,hooks,api,store}</code> + <code>shared/</code>; layer-based → правиш 4+ папки',
      },
    ],
  },
  {
    label: 'Core Web Vitals',
    icon: '📏',
    entries: [
      { term: 'LCP', chips: ['< 2.5s'], desc: 'найбільший елемент → preload, SSR, CDN' },
      { term: 'INP', chips: ['< 200ms'], desc: 'відгук на взаємодію → defer JS, <code>useTransition</code>' },
      { term: 'CLS', chips: ['< 0.1'], desc: 'зсув layout → розміри для img/video/ads' },
    ],
  },
  {
    label: 'Performance',
    icon: '🏎️',
    entries: [
      {
        term: 'Code splitting',
        chips: ['route', 'component', 'on interaction'],
        desc: 'менше JS на старті',
        code: `const Dashboard = React.lazy(() => import('./Dashboard'));

button.addEventListener('click', async () => {
  const { processData } = await import('./heavy-processing');
  processData(data);
});`,
      },
      { term: 'Virtual scrolling', desc: '1000+ items → react-virtuoso / react-window, у DOM ~20-30 вузлів' },
      {
        term: 'Layout thrashing',
        desc: 'read/write чергуються → forced reflow; батч спершу reads, потім writes',
        code: `// ❌
elements.forEach((el) => { el.style.height = el.offsetHeight + 'px'; });

// ✅
const heights = elements.map((el) => el.offsetHeight);
elements.forEach((el, i) => { el.style.height = heights[i] + 'px'; });`,
      },
    ],
  },
  {
    label: 'Security',
    icon: '🔒',
    entries: [
      { term: 'XSS', desc: 'без <code>dangerouslySetInnerHTML</code> без sanitize; CSP; React екранує' },
      { term: 'CSRF', desc: 'SameSite cookie, CSRF tokens, double-submit' },
      { term: 'Clickjacking', desc: '<code>X-Frame-Options: DENY</code> / CSP <code>frame-ancestors</code>' },
      { term: 'Секрети в URL', desc: 'токени → body/header, не query (логи, history)' },
      { term: 'Секрети в bundle', desc: 'без <code>NEXT_PUBLIC_</code>, Server Actions, backend proxy' },
      { term: 'Cookie', chips: ['HttpOnly', 'Secure', 'SameSite=Strict|Lax', 'Partitioned'] },
    ],
  },
  {
    label: 'Micro-frontends',
    icon: '🧱',
    entries: [
      { term: 'Build-time', desc: 'npm-пакети в один бандл — просто, але спільний деплой' },
      { term: 'iframe', desc: 'повна ізоляція; важкий спільний стан, роутинг, SEO' },
      { term: 'Web Components', desc: 'framework-agnostic, Shadow DOM; складно типізувати' },
      {
        term: 'Module Federation',
        desc: 'рантайм-чанки, незалежні деплої, <code>shared</code> singleton React',
        code: `// host
new ModuleFederationPlugin({
  name: 'host',
  remotes: { checkout: 'checkout@https://checkout.example.com/remoteEntry.js' },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});

const CheckoutApp = React.lazy(() => import('checkout/CheckoutApp'));`,
      },
      { term: 'Server-side composition', desc: 'edge збирає HTML (Next.js Multi-Zones) — SEO, складна інфра' },
      { term: '⚠️ Не за замовчуванням', desc: 'це організаційна проблема; без неї — monorepo (Nx/Turborepo)' },
    ],
  },
  {
    label: 'System Design співбесіда',
    icon: '🧭',
    entries: [
      { term: '1. Вимоги', desc: 'функціональні + нефункціональні (масштаб, латентність, консистентність)' },
      { term: '2. Оцінки', desc: 'DAU, RPS read/write, обсяг даних' },
      { term: '3. API', desc: '3-5 ключових ендпоінтів' },
      { term: '4. Дані', desc: 'SQL / NoSQL і <b>чому</b>' },
      { term: '5. High-level', desc: 'клієнт → CDN/edge → LB → gateway/BFF → сервіси → БД/кеш/черги' },
      { term: '6. Deep-dive', desc: '1-2 компоненти за інтересом інтерв’юера' },
      { term: '7. Trade-offs', desc: 'підсумок + слабкі місця; грубий повний ескіз > ідеальна частина' },
    ],
  },
  {
    label: 'High-level блоки',
    icon: '🏗️',
    entries: [
      { term: 'BFF', desc: 'тонкий шар фронтенд-команди: агрегує сервіси, формат під клієнта' },
      { term: 'Stateless', desc: 'умова горизонтального скейлу; стан → Redis / S3 / БД' },
      { term: 'Черга', desc: "розв'язка, fan-out, ретраї; ціна — eventual consistency" },
    ],
  },
  {
    label: 'Рендеринг',
    icon: '🌐',
    entries: [
      { term: 'CSR', desc: 'приватна панель за логіном, без SEO' },
      { term: 'SSR', desc: 'персоналізовано + SEO + свіжі дані' },
      { term: 'SSG', desc: 'статичний контент (докси, маркетинг)' },
      { term: 'ISR', desc: 'змінюється, але однаковий для всіх' },
      { term: 'Streaming / RSC', desc: 'швидкий shell + менший бандл; SSR без стрімінгу не інтерактивний до гідрації' },
    ],
  },
  {
    label: 'API та дані',
    icon: '🔌',
    entries: [
      { term: 'tRPC', desc: 'один TS-репо, одна команда, типи наскрізь' },
      { term: 'GraphQL', desc: 'багато клієнтів, глибокі графи; ціна — кеш, N+1' },
      { term: 'REST', desc: 'публічне API, HTTP-кеш «з коробки»' },
      { term: 'Пагінація', desc: '<b>cursor</b> для стрічки; offset — лише «стрибнути на N»' },
      { term: 'Нормалізація', desc: 'сутності за id, списки як масиви id' },
    ],
  },
  {
    label: 'Real-time',
    icon: '📡',
    entries: [
      { term: 'Polling', desc: 'рідкі оновлення, секунди затримки ок' },
      { term: 'SSE', desc: 'сервер → клієнт: нотифікації, прогрес' },
      { term: 'WebSocket', desc: 'двонаправлено: чат, co-editing, presence' },
      { term: 'WebRTC', desc: 'P2P аудіо/відео' },
      { term: 'Reconnect', desc: 'exp backoff + jitter, cap ~30с, resume за Last-Event-ID' },
      { term: 'Масштаб WS', desc: 'sticky routing + pub/sub (Redis/NATS); дедуп за <code>event_id</code>' },
    ],
  },
  {
    label: 'Кеш і консистентність',
    icon: '🗃️',
    entries: [
      { term: 'Шари', desc: 'JS memory → Service Worker → HTTP-кеш → CDN → Redis → БД' },
      { term: 'SWR', desc: 'показати кеш миттєво, тихо оновити — дефолт' },
      { term: 'Інвалідація', desc: 'TTL → tag-based → event-based' },
      { term: 'CAP на фронті', desc: 'offline/optimistic = Availability; «read-your-writes» — компроміс' },
    ],
  },
  {
    label: 'Стійкість',
    icon: '📈',
    entries: [
      { term: 'Retry', desc: 'backoff + jitter, лише ідемпотентне, timeout на кожен запит' },
      { term: 'Idempotency key', desc: 'UUID на «Оплатити» — проти подвійного списання' },
      { term: 'Circuit breaker', desc: 'після серії фейлів → fallback (кеш / skeleton)' },
      { term: 'Graceful degradation', desc: 'error boundary на блок, feature flags / kill switch, offline-черга' },
    ],
  },
  {
    label: 'Observability',
    icon: '🔭',
    entries: [
      { term: 'CWV (field)', desc: 'LCP / INP / CLS за p75 по маршрутах' },
      { term: 'JS-помилки', desc: 'source maps + release-тег (git sha)' },
      { term: 'Tracing', desc: '<code>traceparent</code> з браузера (W3C Trace Context)' },
      { term: 'RUM vs синтетика', desc: '«що болить у проді» vs «чи не гірше після деплою»' },
      { term: 'SLI / SLO / error budget', desc: 'алерти на симптоми (p95 INP), не на причини (CPU)' },
    ],
  },
  {
    label: 'Типові задачі',
    icon: '🧪',
    entries: [
      { term: 'Стрічка новин', desc: 'fan-out on write vs on read → <b>гібрид</b> для зірок' },
      { term: 'Autocomplete', desc: 'debounce, <code>AbortController</code>, кеш за префіксом, ARIA combobox' },
      { term: 'Дашборд 50 віджетів', desc: 'error boundary на віджет, батч через BFF, lazy-mount' },
      { term: 'Спільний редактор', desc: 'CRDT (Yjs) / OT, WebSocket + awareness, офлайн persist' },
    ],
  },
  {
    label: 'Staff-level',
    icon: '🏛️',
    entries: [
      { term: 'Evolutionary architecture', desc: 'рішення під зміну, не «назавжди»' },
      { term: 'Fitness functions', desc: 'інваріанти як тести в CI (розмір бандла, межі імпортів)' },
      { term: 'Contract testing', desc: 'споживач описує контракт, ганяється в CI провайдера' },
      { term: 'Paved path', desc: 'найпростіший шлях = правильний + escape hatch' },
      { term: 'Strangler fig', desc: 'поступова заміна legacy' },
      { term: 'Вимір впливу', desc: 'adoption, DORA, зменшення toil' },
    ],
  },
  {
    label: 'Швидкі відповіді',
    icon: '🎯',
    entries: [
      {
        term: 'Масштабувати React-app?',
        desc: 'feature-based → lazy/code splitting → TanStack для server state → Zustand для client → memo де виміряно → virtualization → monorepo',
      },
      { term: 'Context vs Zustand?', desc: 'Context — рідкі зміни; часті — Zustand (Context ре-рендерить усіх споживачів)' },
      { term: 'Performant компонент?', desc: 'profiler → state нижче → composition/RSC → memo лише з вимірами → virtualization' },
      { term: 'Hydration mismatch?', desc: 'Date/random/window на сервері ≠ клієнт → useEffect, suppressHydrationWarning' },
      { term: 'Організація API calls?', desc: 'api/ service layer → Query hooks → спільний error handling → типи (zod / codegen)' },
    ],
  },
]
