import type { QuickRefBlock } from './types'

// Next.js (App Router) quickref board — condensed from the old prose
// `nextjsCheat` sheet into the dense card format.
export const nextjsQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'Server vs Client',
    icon: '🧩',
    entries: [
      { term: 'Server Component', desc: '<b>за замовчуванням</b>; async/await, DB/секрети, <b>0 JS</b> у бандлі' },
      {
        term: "'use client'",
        desc: 'опт-ін: useState/useEffect, onClick, browser API — потрапляє в JS bundle',
      },
      {
        term: 'Server у Client',
        desc: 'лише через <code>children</code>, не <code>import</code>; props мають бути <b>серіалізовними</b>',
        code: `// ClientShell.tsx
'use client';
export function ClientShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div onClick={() => setOpen(!open)}>{children}</div>;
}

// page.tsx (Server)
<ClientShell>
  <ServerWidget />   {/* рендериться на сервері */}
</ClientShell>`,
        codeLanguage: 'tsx',
      },
      { term: 'RSC vs SSR', desc: 'SSR = HTML + гідрація всього; RSC = нуль JS компонента на клієнт' },
    ],
  },
  {
    label: 'Routing · файли app/',
    icon: '🗂️',
    entries: [
      { term: 'layout.tsx', desc: 'спільний каркас, <b>persistent</b> між переходами' },
      { term: 'page.tsx', desc: 'UI маршруту' },
      { term: 'loading.tsx', desc: 'авто-Suspense fallback для page' },
      { term: 'error.tsx', desc: "error boundary, обов'язково <code>'use client'</code>" },
      { term: 'not-found.tsx', desc: '404 сегмента' },
      { term: 'api/x/route.ts', desc: 'endpoint: <code>export async function GET/POST</code>' },
      { term: '[slug]', desc: 'динамічний сегмент · <code>[...slug]</code> catch-all' },
      { term: '(group)', desc: 'route group — організація без впливу на URL' },
    ],
  },
  {
    label: 'Генерація',
    icon: '🏗️',
    entries: [
      {
        term: 'generateStaticParams()',
        desc: 'прегенерація шляхів динамічного сегмента на білді',
        code: `export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}`,
      },
      {
        term: 'generateMetadata()',
        desc: 'динамічні <code>&lt;title&gt;</code>/<code>&lt;meta&gt;</code>',
        code: `export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post.title, description: post.excerpt };
}`,
      },
    ],
  },
  {
    label: 'Рендеринг + кеш',
    icon: '🎨',
    entries: [
      { term: 'SSG', chips: ["fetch(url, { cache: 'force-cache' })"], desc: 'статика на білді' },
      { term: 'ISR', chips: ['next: { revalidate: 60 }'], desc: 'статика + фонове оновлення' },
      { term: 'SSR', chips: ["cache: 'no-store'", 'cookies()'], desc: 'рендер на кожен запит' },
      { term: 'CSR', chips: ["'use client'", 'TanStack Query'], desc: 'дані на клієнті' },
      {
        term: 'Інвалідація',
        desc: '<code>revalidateTag</code> · <code>revalidatePath</code> · <code>router.refresh()</code>',
        code: `await fetch(url, { next: { tags: ['posts'] } });

revalidateTag('posts');     // інвалідація по тегу
revalidatePath('/blog');    // по маршруту
router.refresh();           // клієнтський Router Cache

export const dynamic = 'force-dynamic';
export const revalidate = 3600;`,
      },
    ],
  },
  {
    label: 'Data fetching',
    icon: '📡',
    entries: [
      {
        term: 'async Server Component',
        desc: 'fetch прямо в тілі; незалежні запити — <b>паралельно</b>',
        code: `export default async function Page() {
  const [u, p] = await Promise.all([getUser(), getPosts()]);
  return <Profile user={u} posts={p} />;
}`,
        codeLanguage: 'tsx',
      },
      {
        term: 'Streaming',
        desc: '<code>&lt;Suspense&gt;</code> навколо повільного блоку — shell віддається одразу',
        code: `<Suspense fallback={<Skeleton />}>
  <SlowWidget />
</Suspense>`,
        codeLanguage: 'tsx',
      },
      { term: 'Server fetch vs TanStack', desc: 'сервер — початкові дані/SEO; TanStack — polling/optimistic/infinite' },
    ],
  },
  {
    label: 'Server Actions',
    icon: '⚡',
    entries: [
      {
        term: "'use server'",
        desc: 'мутація на сервері, викликається з форми; <b>перевіряй права</b> всередині',
        code: `'use server';
export async function create(formData: FormData) {
  if (!(await getSession())) throw new Error('Unauthorized');
  await db.todo.create({ data: { title: formData.get('title') } });
  revalidatePath('/todos');
}

// <form action={create}>`,
      },
      { term: 'useFormStatus()', desc: '<code>pending</code> стан форми' },
      { term: 'useActionState()', desc: 'результат/помилка action у стейті' },
      { term: 'useOptimistic()', desc: 'миттєвий UI з відкатом' },
    ],
  },
  {
    label: 'Next.js 15 зміни',
    icon: '🆕',
    entries: [
      {
        term: 'params → Promise',
        desc: '<code>params</code>, <code>searchParams</code>, <code>cookies()</code>, <code>headers()</code> — треба <code>await</code>',
        code: `export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
const cookieStore = await cookies();`,
      },
      {
        term: 'fetch не кешується',
        desc: "Next 14: force-cache → Next 15: no-store; кеш — явний opt-in <code>cache: 'force-cache'</code>",
      },
    ],
  },
  {
    label: 'Навігація',
    icon: '🔗',
    entries: [
      { term: 'next/navigation', desc: 'App Router — <b>НЕ</b> <code>next/router</code>' },
      { term: '<Link href prefetch>', desc: 'клієнтський перехід + prefetch' },
      { term: 'useRouter()', chips: ["push('/x')", 'refresh()', 'back()'] },
      { term: 'usePathname()', desc: 'поточний шлях' },
      { term: 'useSearchParams()', chips: ["get('q')"] },
      { term: 'redirect() / notFound()', desc: 'у Server Components / Actions' },
    ],
  },
  {
    label: 'Gotchas',
    icon: '⚠️',
    entries: [
      {
        term: 'Hydration mismatch',
        desc: '<code>Date.now()</code>/window/random на сервері ≠ клієнт → useEffect або <code>suppressHydrationWarning</code>',
      },
      { term: 'Bundle leak', desc: "тримай <code>'use client'</code> якнайглибше; Server-вузли — через children" },
      { term: 'Дані не оновлюються', desc: 'Data / Full Route Cache → revalidate або no-store' },
    ],
  },
]
