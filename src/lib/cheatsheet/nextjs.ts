// Next.js topic — як Next.js використовується разом з React (Senior Frontend).
// Prose preserved as sanitized HTML blocks (styled via .cheat-prose) +
// extracted code blocks, same model as react.ts.
import type { TopicContent } from './types'

export const nextjsContent: TopicContent = {
  slug: 'nextjs',
  sections: [
    {
      id: 'nextjs-overview',
      title: '🧭 Next.js поверх React',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">React — це бібліотека, Next.js — фреймворк <span class="tag tag-key">KEY</span></h3>
  <p>React сам по собі відповідає лише за <strong>рендеринг UI</strong> (компоненти, стан, reconciliation). Усе інше — роутинг, рендеринг на сервері, бандлінг, оптимізацію — ти збираєш сам. <strong>Next.js</strong> дає це з коробки і додає модель <strong>React Server Components (RSC)</strong>.</p>
  <div class="table-wrap">
    <table>
      <tr><th>Завдання</th><th>Чистий React (SPA)</th><th>Next.js</th></tr>
      <tr><td>Роутинг</td><td>react-router (ручний)</td><td>File-based (app/ folder)</td></tr>
      <tr><td>Рендеринг</td><td>CSR (порожній HTML + JS)</td><td>SSR / SSG / ISR / RSC</td></tr>
      <tr><td>Data fetching</td><td>useEffect / TanStack Query</td><td>async Server Components + fetch</td></tr>
      <tr><td>Bundling</td><td>Vite / Webpack (налаштовуєш)</td><td>Вбудований (Turbopack/Webpack)</td></tr>
      <tr><td>SEO / metadata</td><td>react-helmet, обмежено</td><td>Metadata API, повний контроль</td></tr>
      <tr><td>Оптимізації</td><td>Ручні</td><td>next/image, next/font, code-split</td></tr>
    </table>
  </div>
  <h3 class="topic">App Router vs Pages Router</h3>
  <div class="grid2">
    <div class="card green"><h4>app/ (App Router) — сучасний</h4>
      <p>Server Components за замовчуванням, layouts, streaming, Server Actions. Рекомендований для нових проєктів (Next.js 13+).</p>
    </div>
    <div class="card"><h4>pages/ (Pages Router) — legacy</h4>
      <p><code>getServerSideProps</code> / <code>getStaticProps</code>, усі компоненти клієнтські. Ще підтримується, але нові фічі йдуть в App Router.</p>
    </div>
  </div>
  <h3 class="topic">Коли обирати Next.js</h3>
  <p>✅ Потрібні SEO / SSR / швидкий first paint, контент-сайти, e-commerce, дашборди з server-data. ❌ Суто внутрішній інструмент за авторизацією, де SEO не потрібен, — звичайний React SPA (Vite) може бути простішим.</p>`,
        },
      ],
    },
    {
      id: 'server-client-components',
      title: '🧩 Server vs Client Components',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Дві моделі компонентів <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>Server Component</th><th>Client Component</th></tr>
      <tr><td><strong>За замовчуванням</strong></td><td>✅ Так (в app/)</td><td>❌ Потрібен 'use client'</td></tr>
      <tr><td><strong>async/await</strong></td><td>✅</td><td>❌</td></tr>
      <tr><td><strong>useState / useEffect</strong></td><td>❌</td><td>✅</td></tr>
      <tr><td><strong>onClick / event handlers</strong></td><td>❌</td><td>✅</td></tr>
      <tr><td><strong>DB / fs / секрети</strong></td><td>✅</td><td>❌</td></tr>
      <tr><td><strong>Потрапляє в JS bundle</strong></td><td>❌ (нуль JS на клієнт)</td><td>✅</td></tr>
      <tr><td><strong>Browser API (window)</strong></td><td>❌</td><td>✅</td></tr>
    </table>
  </div>
  <p><strong>Правило:</strong> залишай Server Component за замовчуванням; познач <code>'use client'</code> лише там, де потрібні інтерактивність, стан або browser API. <code>'use client'</code> ставиться на <em>межі</em> — усе дерево під ним стає клієнтським.</p>
  <h3 class="topic">Композиція: Server всередині Client <span class="tag tag-pit">PITFALL</span></h3>
  <div class="grid2">
    <div class="card red"><h4>❌ import Server у Client</h4>
      <p>Client Component не може <code>import</code>-увати Server Component напряму — він "втягне" його в bundle і втратить server-only можливості.</p>
    </div>
    <div class="card green"><h4>✅ Передавай через children / slots</h4>
      <p>Server Component рендериться на сервері й передається в Client Component як <code>children</code> (вже готовий React-вузол).</p>
    </div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// ✅ Pattern: Client-обгортка приймає Server-children
// app/page.tsx — Server Component
export default async function Page() {
  const user = await getUser();          // server-only
  return (
    <ClientShell>
      {/* ServerProfile рендериться на сервері, передається готовим */}
      <ServerProfile user={user} />
    </ClientShell>
  );
}

// client-shell.tsx
'use client';
export function ClientShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);     // інтерактив тут
  return <div onClick={() => setOpen(o => !o)}>{open && children}</div>;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Props серіалізуються</h3>
  <div class="alert warn">
    <span class="icon">⚠️</span>
    <span>Props від Server → Client Component мають бути <strong>серіалізовними</strong> (string, number, plain object, Promise). <strong>Функції, класи, Date з методами</strong> передати не можна — це частий питання на співбесіді.</span>
  </div>`,
        },
      ],
    },
    {
      id: 'routing',
      title: '🗂️ App Router — роутинг',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">File conventions <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card"><h4>Спеціальні файли в app/</h4>
      <pre style="font-size:10.5px">app/
  layout.tsx        <span class="cmt">← спільний каркас (persistent)</span>
  page.tsx          <span class="cmt">← UI маршруту (публічний URL)</span>
  loading.tsx       <span class="cmt">← Suspense fallback</span>
  error.tsx         <span class="cmt">← error boundary ('use client')</span>
  not-found.tsx     <span class="cmt">← 404 UI</span>
  route.ts          <span class="cmt">← API endpoint (GET/POST...)</span>
  template.tsx      <span class="cmt">← як layout, але re-mount на навігації</span></pre>
    </div>
    <div class="card blue"><h4>Сегменти маршрутів</h4>
      <pre style="font-size:10.5px">app/blog/[slug]/page.tsx   <span class="cmt">← /blog/hello</span>
app/shop/[...all]/page.tsx <span class="cmt">← catch-all</span>
app/(marketing)/about      <span class="cmt">← route group (без URL)</span>
app/@modal/page.tsx        <span class="cmt">← parallel route (slot)</span>
app/(.)photo/[id]          <span class="cmt">← intercepting route</span></pre>
    </div>
  </div>
  <h3 class="topic">layout.tsx — вкладені каркаси</h3>
  <p>Layouts <strong>не ре-маунтяться</strong> при навігації між дочірніми сторінками (стан зберігається). <code>template.tsx</code> навпаки — створюється заново. Root layout (<code>app/layout.tsx</code>) обов'язковий і містить <code>&lt;html&gt;</code>/<code>&lt;body&gt;</code>.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// app/blog/[slug]/page.tsx — динамічний маршрут
export default async function Post({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return <article>{post.title}</article>;
}

// Прегенерація статичних шляхів на build
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// Динамічні <title>/<meta> per-route
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return { title: post.title, description: post.excerpt };
}`,
        },
      ],
    },
    {
      id: 'rendering-caching',
      title: '🎨 Рендеринг і кешування',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Режими рендерингу <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Mode</th><th>Як у Next.js</th><th>Коли</th></tr>
      <tr><td><strong>SSG</strong> (static)</td><td>default; <code>fetch</code> кешується</td><td>Блог, маркетинг, docs</td></tr>
      <tr><td><strong>ISR</strong></td><td><code>next: { revalidate: 60 }</code></td><td>Новини, товари — оновлення без re-build</td></tr>
      <tr><td><strong>SSR</strong> (dynamic)</td><td><code>cache: 'no-store'</code> / cookies()</td><td>Персоналізація, auth</td></tr>
      <tr><td><strong>CSR</strong></td><td><code>'use client'</code> + TanStack/useEffect</td><td>Інтерактивні дашборди</td></tr>
    </table>
  </div>
  <p>Маршрут стає <strong>dynamic</strong> автоматично, якщо ти читаєш <code>cookies()</code>, <code>headers()</code>, <code>searchParams</code> або робиш <code>fetch</code> з <code>no-store</code>. Інакше він <strong>static</strong>.</p>
  <h3 class="topic">Чотири рівні кешу <span class="tag tag-new">App Router</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Кеш</th><th>Де</th><th>Що кешує</th><th>Скидання</th></tr>
      <tr><td>Request Memoization</td><td>Сервер (1 рендер)</td><td>Однакові <code>fetch</code> у дереві</td><td>Авто (кінець запиту)</td></tr>
      <tr><td>Data Cache</td><td>Сервер (persist)</td><td>Результати <code>fetch</code></td><td>revalidate / tag</td></tr>
      <tr><td>Full Route Cache</td><td>Сервер (build)</td><td>HTML + RSC payload</td><td>revalidatePath</td></tr>
      <tr><td>Router Cache</td><td>Клієнт (memory)</td><td>RSC payload навігації</td><td>router.refresh()</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Керування кешем через fetch
await fetch(url);                          // default: кешується (SSG)
await fetch(url, { cache: 'no-store' });   // завжди свіже (SSR)
await fetch(url, { next: { revalidate: 60 } });        // ISR: 60s
await fetch(url, { next: { tags: ['posts'] } });        // tag-based

// Інвалідація після мутації (Server Action / route handler)
import { revalidatePath, revalidateTag } from 'next/cache';
revalidateTag('posts');         // усі fetch з цим тегом
revalidatePath('/blog');        // конкретний маршрут

// Segment config — на рівні файлу page.tsx / layout.tsx
export const dynamic = 'force-dynamic';   // вимкнути статику
export const revalidate = 3600;           // ISR за замовчуванням`,
        },
      ],
    },
    {
      id: 'data-fetching',
      title: '📡 Завантаження даних',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Server Components fetch'ать напряму <span class="tag tag-key">KEY</span></h3>
  <div class="grid2">
    <div class="card red"><h4>❌ SPA-звичка</h4>
      <p>useEffect → setState → loading-спінер. Дані тягнуться <em>після</em> завантаження JS на клієнті (waterfall, поганий LCP).</p>
    </div>
    <div class="card green"><h4>✅ Next.js Server Component</h4>
      <p>Компонент <code>async</code>, <code>await fetch()</code> прямо в тілі. Дані вже в HTML — нуль клієнтського JS для цього.</p>
    </div>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Паралельний fetch — запускай ДО await (уникаєш waterfall)
export default async function Page() {
  const userPromise = getUser();        // не await тут
  const postsPromise = getPosts();
  const [user, posts] = await Promise.all([userPromise, postsPromise]);
  return <Profile user={user} posts={posts} />;
}

// Streaming: швидке — одразу, повільне — стрімиться через Suspense
import { Suspense } from 'react';
export default function Dashboard() {
  return (
    <>
      <Header />                                  {/* миттєво */}
      <Suspense fallback={<Skeleton />}>
        <SlowWidget />                            {/* стрімиться окремо */}
      </Suspense>
    </>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">loading.tsx = автоматичний Suspense</h3>
  <p>Файл <code>loading.tsx</code> у сегменті автоматично обгортає <code>page.tsx</code> у <code>&lt;Suspense&gt;</code> — поки async-сторінка вантажиться, показується fallback.</p>
  <h3 class="topic">Де ще потрібен TanStack Query?</h3>
  <div class="grid2">
    <div class="card"><h4>Server fetch</h4>
      <p>Початкові дані сторінки, SEO-контент, усе що можна отримати на сервері. Дешевше і швидше.</p>
    </div>
    <div class="card blue"><h4>TanStack Query (клієнт)</h4>
      <p>Часті оновлення, polling, optimistic UI, infinite scroll, дані що залежать від інтерактиву. Server fetch і Query чудово <strong>співіснують</strong>.</p>
    </div>
  </div>`,
        },
      ],
    },
    {
      id: 'server-actions',
      title: '⚡ Server Actions і мутації',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">'use server' — мутації без API-роутів <span class="tag tag-new">Next 14</span></h3>
  <p>Server Action — це async-функція з директивою <code>'use server'</code>, яку можна викликати прямо з клієнта (форма або обробник). Next.js сам створює endpoint. Ідеально для мутацій + ревалідації.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');   // ⚠️ завжди перевіряй права!

  const title = formData.get('title') as string;
  await db.todo.create({ data: { title } });
  revalidatePath('/todos');                          // оновити кеш UI
}

// form.tsx (Client Component) — прогресивне покращення форм
'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitBtn() {
  const { pending } = useFormStatus();               // стан відправки
  return <button disabled={pending}>{pending ? '...' : 'Add'}</button>;
}

export function TodoForm() {
  return (
    <form action={createTodo}>
      <input name="title" />
      <SubmitBtn />
    </form>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">useOptimistic — миттєвий UI</h3>
  <p>Хук <code>useOptimistic</code> показує результат до завершення Server Action і відкочує при помилці — UX як у TanStack optimistic updates, але вбудовано.</p>
  <div class="alert warn">
    <span class="icon">⚠️</span>
    <span><strong>Безпека:</strong> Server Action — це публічний endpoint. <strong>Завжди</strong> перевіряй авторизацію та валідуй вхідні дані (zod) усередині дії — клієнтські перевірки можна обійти.</span>
  </div>
  <h3 class="topic">Next.js 15: async request APIs <span class="tag tag-new">Next 15</span></h3>
  <p><code>params</code>, <code>searchParams</code>, <code>cookies()</code>, <code>headers()</code> та <code>draftMode()</code> стали <strong>асинхронними</strong> (повертають <code>Promise</code>) — у Next.js 14 вони були синхронними. Потрібен <code>await</code> у Server Component/Route Handler або <code>use()</code> у Client Component.</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Next.js 14 — params синхронний
export default function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}

// Next.js 15 — params/searchParams стали Promise
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;      // ⚠️ обов'язковий await
  return <div>{slug}</div>;
}

// cookies() / headers() теж асинхронні з Next 15
import { cookies } from 'next/headers';
const cookieStore = await cookies();
const theme = cookieStore.get('theme');`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Зміна дефолту кешування <span class="tag tag-new">Next 15</span></h3>
  <div class="alert warn">
    <span class="icon">⚠️</span>
    <span><strong>fetch більше не кешується за замовчуванням:</strong> у Next 14 дефолт — <code>force-cache</code>; у Next 15 дефолт — <code>no-store</code>. <code>GET</code> Route Handlers теж більше не кешуються автоматично. Явний opt-in: <code>fetch(url, { cache: 'force-cache' })</code> або <code>export const dynamic = 'force-static'</code>.</span>
  </div>
  <div class="alert warn">
    <span class="icon">⚠️</span>
    <span><strong>Міграція легасі-коду:</strong> синхронний доступ до <code>params</code>/<code>cookies()</code> ще працює через сумісний шар з deprecation-попередженням, але код варто перевести на <code>await</code> — інакше зламається в майбутніх мажорних версіях.</span>
  </div>`,
        },
      ],
    },
    {
      id: 'navigation-hooks',
      title: '🔗 Навігація та хуки',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Навігація <span class="tag tag-key">KEY</span></h3>
  <p><code>&lt;Link&gt;</code> робить client-side навігацію + автоматичний <strong>prefetch</strong> у viewport. Для програмної навігації — хуки з <code>next/navigation</code> (App Router), <strong>не</strong> з <code>next/router</code> (це Pages Router).</p>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `'use client';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function Nav() {
  const router = useRouter();
  const pathname = usePathname();              // '/blog/hello'
  const params = useSearchParams();            // ?q=react -> params.get('q')

  return (
    <>
      <Link href="/blog" prefetch>Blog</Link>
      <button onClick={() => router.push('/login')}>Login</button>
      <button onClick={() => router.refresh()}>Оновити server data</button>
    </>
  );
}

// Server-side редіректи (у Server Components / Actions)
import { redirect, notFound } from 'next/navigation';
if (!user) redirect('/login');
if (!post) notFound();`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Route Handlers (API)</h3>
  <p><code>app/api/users/route.ts</code> експортує <code>GET</code>/<code>POST</code>/... що повертають <code>Response</code>. Заміна <code>pages/api</code>. Корисні для webhooks, REST для зовнішніх клієнтів — для внутрішніх мутацій частіше беруть Server Actions.</p>
  <h3 class="topic">middleware.ts</h3>
  <p>Виконується на <strong>edge</strong> перед матчингом маршруту — auth-гейти, редіректи, A/B, i18n, заголовки. Один файл у корені проєкту з функцією <code>middleware()</code> + <code>config.matcher</code>.</p>`,
        },
      ],
    },
    {
      id: 'performance-prod',
      title: '🚀 Перформанс і прод',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Вбудовані оптимізації <span class="tag tag-key">KEY</span></h3>
  <div class="grid3">
    <div class="card"><h4>next/image</h4>
      <p>Авто lazy-load, resize, WebP/AVIF, запобігання CLS через <code>width/height</code>.</p>
    </div>
    <div class="card blue"><h4>next/font</h4>
      <p>Self-host шрифтів на build, нуль layout shift, без запитів до Google на рантаймі.</p>
    </div>
    <div class="card green"><h4>next/script</h4>
      <p><code>strategy</code>: beforeInteractive / afterInteractive / lazyOnload для сторонніх скриптів.</p>
    </div>
  </div>
  <h3 class="topic">Metadata API + SEO</h3>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `// Статичні метадані
export const metadata = {
  title: 'Cheat Hub',
  description: '...',
  openGraph: { title: 'Cheat Hub', images: ['/og.png'] },
};

// Env: тільки NEXT_PUBLIC_* потрапляють у клієнтський bundle
const api = process.env.NEXT_PUBLIC_API_URL;   // ✅ доступно в браузері
const secret = process.env.DB_PASSWORD;          // server-only

// Runtime: edge (швидкий, обмежений API) vs node (повний)
export const runtime = 'edge';                   // або 'nodejs' (default)`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Edge vs Node runtime</h3>
  <div class="grid2">
    <div class="card"><h4>Node.js (default)</h4><p>Повний Node API, npm-пакети, важчий cold start. Для DB-доступу, fs, важкої логіки.</p></div>
    <div class="card blue"><h4>Edge</h4><p>Дуже швидкий cold start, ближче до користувача, обмежений API (немає нативного fs). Для middleware, легких API.</p></div>
  </div>`,
        },
      ],
    },
    {
      id: 'gotchas-interview',
      title: '⚠️ Підводні камені та питання співбесіди',
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Топ gotcha'и <span class="tag tag-pit">PITFALL</span></h3>
  <div class="alert warn">
    <span class="icon">⚠️</span>
    <span><strong>Hydration mismatch:</strong> Server і Client рендер відрізняються (<code>Date.now()</code>, <code>window</code>, <code>Math.random()</code>, локаль). Рішення: <code>suppressHydrationWarning</code> або рендер browser-only контенту в <code>useEffect</code>.</span>
  </div>
  <div class="alert warn">
    <span class="icon">⚠️</span>
    <span><strong>Bundle leak від 'use client':</strong> директива на "корені" фічі робить усе дерево клієнтським. Тримай <code>'use client'</code> якнайглибше (на листках-кнопках), Server-вузли передавай через <code>children</code>.</span>
  </div>
  <div class="alert warn">
    <span class="icon">⚠️</span>
    <span><strong>Server-only код у Client:</strong> секрети/DB у компоненті без межі можуть просочитись. Використовуй пакет <code>server-only</code>, щоб import у клієнт впав на build.</span>
  </div>
  <h3 class="topic">Часті питання співбесіди</h3>
  <div class="table-wrap">
    <table>
      <tr><th>Питання</th><th>Коротка відповідь</th></tr>
      <tr><td>RSC vs SSR — різниця?</td><td>SSR рендерить HTML на сервері (потім гідрація всього). RSC не шлють JS компонента на клієнт взагалі — тільки серіалізований payload.</td></tr>
      <tr><td>Що робить 'use client'?</td><td>Позначає межу: компонент і його дерево гідруються на клієнті, можуть мати стан/ефекти/handlers.</td></tr>
      <tr><td>SSG vs ISR vs SSR?</td><td>SSG — на build; ISR — статика + фонове revalidate; SSR — на кожен запит.</td></tr>
      <tr><td>Server Actions vs Route Handlers?</td><td>Actions — типобезпечні мутації прямо з форм/компонентів + ревалідація; Route Handlers — публічний REST/webhooks.</td></tr>
      <tr><td>Як інвалідувати кеш?</td><td>revalidatePath / revalidateTag (сервер), router.refresh() (клієнт).</td></tr>
      <tr><td>Чому дані не оновлюються?</td><td>Спрацював Data Cache / Full Route Cache — додай revalidate або no-store.</td></tr>
    </table>
  </div>`,
        },
      ],
    },
  ],
}

export const nextjsCheat: TopicContent = {
  slug: 'nextjs',
  sections: [
    {
      id: 'server-client-components',
      title: '🧩 Server vs Client',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th></th><th>Server</th><th>Client ('use client')</th></tr>
      <tr><td>За замовч.</td><td>✅</td><td>опт-ін</td></tr>
      <tr><td>async/await</td><td>✅</td><td>❌</td></tr>
      <tr><td>useState/effect</td><td>❌</td><td>✅</td></tr>
      <tr><td>onClick</td><td>❌</td><td>✅</td></tr>
      <tr><td>DB/секрети</td><td>✅</td><td>❌</td></tr>
      <tr><td>У JS bundle</td><td>❌</td><td>✅</td></tr>
    </table>
  </div>
  <p>Server у Client — лише через <code>children</code>, не <code>import</code>. Props мають бути серіалізовними.</p>`,
        },
      ],
    },
    {
      id: 'routing',
      title: '🗂️ Routing',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `app/layout.tsx     // спільний каркас (persistent)
app/page.tsx       // UI маршруту
app/loading.tsx    // Suspense fallback
app/error.tsx      // error boundary ('use client')
app/not-found.tsx  // 404
app/api/x/route.ts // GET/POST endpoint
app/blog/[slug]    // динамічний сегмент
app/(group)/about  // route group (без URL)

generateStaticParams()  // прегенерація шляхів
generateMetadata()      // динамічні <title>/<meta>`,
        },
      ],
    },
    {
      id: 'rendering-caching',
      title: '🎨 Рендеринг + кеш',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Mode</th><th>Як</th></tr>
      <tr><td>SSG</td><td>default fetch (кеш)</td></tr>
      <tr><td>ISR</td><td><code>next: { revalidate: 60 }</code></td></tr>
      <tr><td>SSR</td><td><code>cache: 'no-store'</code> / cookies()</td></tr>
      <tr><td>CSR</td><td><code>'use client'</code> + TanStack</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          code: `await fetch(url);                        // SSG (кеш)
await fetch(url, { cache: 'no-store' }); // SSR
await fetch(url, { next: { revalidate: 60 } });   // ISR
await fetch(url, { next: { tags: ['posts'] } });

revalidateTag('posts');     // інвалідація по тегу
revalidatePath('/blog');    // по маршруту
router.refresh();           // клієнтський Router Cache

export const dynamic = 'force-dynamic';
export const revalidate = 3600;`,
        },
      ],
    },
    {
      id: 'data-fetching',
      title: '📡 Data fetching',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `// async Server Component — fetch у тілі
export default async function Page() {
  const [u, p] = await Promise.all([getUser(), getPosts()]); // паралельно!
  return <Profile user={u} posts={p} />;
}

// Streaming
<Suspense fallback={<Skeleton />}><SlowWidget /></Suspense>
// loading.tsx = авто-Suspense для page.tsx

// Server fetch = початкові дані/SEO; TanStack = polling/optimistic/infinite`,
        },
      ],
    },
    {
      id: 'server-actions',
      title: '⚡ Server Actions',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `'use server';
export async function create(formData: FormData) {
  if (!(await getSession())) throw new Error('Unauthorized'); // перевір права!
  await db.todo.create({ data: { title: formData.get('title') } });
  revalidatePath('/todos');
}

// <form action={create}> + useFormStatus() (pending) + useActionState()
// useOptimistic() — миттєвий UI з відкатом

// Next.js 15: params/searchParams/cookies()/headers() → Promise
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;                   // await обов'язковий
}
const cookieStore = await cookies();                // теж await

// fetch більше НЕ кешується за замовчуванням (Next 14: force-cache → Next 15: no-store)
fetch(url, { cache: 'force-cache' });                // явний opt-in кешу`,
        },
      ],
    },
    {
      id: 'navigation-hooks',
      title: '🔗 Навігація',
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          code: `// next/navigation (App Router!) — НЕ next/router
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { redirect, notFound } from 'next/navigation';

<Link href="/blog" prefetch>Blog</Link>
router.push('/x'); router.refresh();
usePathname(); useSearchParams().get('q');
redirect('/login'); notFound();          // у Server Components/Actions`,
        },
      ],
    },
    {
      id: 'gotchas-interview',
      title: '⚠️ Gotchas',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><strong>Hydration mismatch:</strong> Date.now()/window/random на сервері ≠ клієнт → useEffect або suppressHydrationWarning.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Bundle leak:</strong> тримай 'use client' якнайглибше; Server-вузли — через children.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>RSC vs SSR:</strong> SSR = HTML + гідрація всього; RSC = нуль JS компонента на клієнт.</span></div>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Дані не оновлюються?</strong> Data/Full Route Cache → revalidate або no-store.</span></div>`,
        },
      ],
    },
  ],
}
