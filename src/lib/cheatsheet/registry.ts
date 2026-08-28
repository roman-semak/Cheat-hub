import type { TopicMeta, TopicSlug, Accent } from './types'

// Single source of truth for the topic list — drives both the hub cards and
// the sidebar navigation. Adding a topic = one entry here + one data module.
export const TOPICS: TopicMeta[] = [
  {
    slug: 'algorithms',
    title: 'Алгоритми',
    icon: '🧠',
    blurb:
      'Структури даних та алгоритмічні патерни для LeetCode: опис, коли застосовувати, складність.',
    accent: 'teal',
    formats: ['extended'],
    badges: ['Структури даних', 'Патерни'],
  },
  {
    slug: 'leetcode',
    title: 'Практика',
    icon: '🧩',
    blurb:
      'Практика коду: LeetCode-редактор, шпаргалка JS/TS та інтерв’ю-завдання рівня Middle/Senior.',
    accent: 'orange',
    formats: ['practice', 'extended', 'cheatsheet', 'tasks'],
    badges: ['LeetCode', 'Шпаргалка', 'Інтерв’ю'],
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    icon: '🏗️',
    blurb:
      'Патерни, принципи, SOLID — і system design: high-level архітектура, рендеринг, real-time, кешування, масштабування, observability.',
    accent: 'violet',
    formats: ['extended', 'cheatsheet'],
    badges: ['System Design', 'Патерни', 'Real-time'],
  },
  {
    slug: 'fullstack',
    title: 'Fullstack',
    icon: '🚀',
    blurb:
      'Backend-стек, бази даних, API, DevOps та system design — усе для співбесіди Senior Full Stack.',
    accent: 'fuchsia',
    formats: ['extended', 'cheatsheet', 'quiz'],
    badges: ['Backend', 'Бази даних', 'DevOps', 'System Design'],
  },
  {
    slug: 'react',
    title: 'React',
    icon: '⚛️',
    blurb: 'Хуки, рендеринг, стан і патерни сучасного React — від основ до Senior.',
    accent: 'cyan',
    formats: ['extended', 'quiz'],
  },
  {
    slug: 'react-native',
    title: 'React Native',
    icon: '📱',
    blurb:
      'Expo, навігація, нативні API та продуктивність — мобільний React від основ до Senior.',
    accent: 'blue',
    formats: ['extended'],
    badges: ['Expo', 'React Navigation', 'Hermes'],
  },
  {
    slug: 'nextjs',
    title: 'Next.js',
    icon: '▲',
    blurb:
      'App Router, Server Components, рендеринг, кешування та Server Actions поверх React.',
    accent: 'slate',
    formats: ['extended', 'cheatsheet', 'quiz'],
    badges: ['App Router', 'RSC', 'SSR/ISR'],
  },
  {
    slug: 'angular',
    title: 'Angular',
    icon: '🅰️',
    blurb: 'Компоненти, DI, RxJS, сигнали та екосистема Angular.',
    accent: 'rose',
    formats: ['extended', 'quiz'],
  },
  {
    slug: 'javascript',
    title: 'JS / TS',
    icon: '⚙️',
    blurb: 'JavaScript і TypeScript для senior-рівня співбесід.',
    accent: 'amber',
    formats: ['extended', 'links', 'quiz'],
  },
  {
    slug: 'git',
    title: 'Git',
    icon: '🔀',
    blurb: 'Команди, робочі процеси та вирішення конфліктів.',
    accent: 'emerald',
    formats: ['extended', 'cheatsheet'],
  },
  {
    slug: 'ai',
    title: 'AI',
    icon: '🤖',
    blurb: 'AI-інструменти та робота з Claude Code.',
    accent: 'indigo',
    formats: ['extended', 'cheatsheet'],
  },
  {
    slug: 'ide',
    title: 'IDE',
    icon: '🖥️',
    blurb: 'Найпоширеніші IDE та редактори для JS/TS розробки.',
    accent: 'sky',
    formats: ['extended'],
    badges: ['VS Code', 'Cursor', 'WebStorm'],
  },
  {
    slug: 'quickref',
    title: 'Шпаргалка',
    icon: '⚡',
    blurb:
      'Компактні quick-reference шпаргалки по темах: обери React, JS/TS чи Angular з меню.',
    accent: 'pink',
    formats: ['extended'],
  },
]

export function getTopic(slug: TopicSlug): TopicMeta | undefined {
  return TOPICS.find((t) => t.slug === slug)
}

export const FORMAT_LABELS: Record<string, string> = {
  extended: 'Розширена',
  cheatsheet: 'Шпаргалка',
  quiz: 'Квіз',
  practice: 'LeetCode',
  tasks: 'Практичні завдання',
  links: 'Посилання',
}

// Path for a topic format. practice -> /problems (shared editor), extended ->
// /slug, others -> /slug/<format>.
export function formatHref(slug: TopicSlug, format: string): string {
  if (format === 'practice') return '/problems'
  return format === 'extended' ? `/${slug}` : `/${slug}/${format}`
}

// Primary route for a topic = its first declared format. Lets a topic open on
// something other than the extended view (e.g. LeetCode opens on Practice).
export function topicHref(topic: TopicMeta): string {
  return formatHref(topic.slug, topic.formats[0])
}

// Tailwind class fragments per accent. Static strings so Tailwind keeps them.
export const ACCENT: Record<
  Accent,
  { text: string; border: string; ring: string; gradient: string; dot: string }
> = {
  indigo: {
    text: 'text-indigo-300',
    border: 'hover:border-indigo-400/60',
    ring: 'ring-indigo-400/40',
    gradient: 'from-indigo-500 to-indigo-700',
    dot: 'bg-indigo-400',
  },
  cyan: {
    text: 'text-cyan-300',
    border: 'hover:border-cyan-400/60',
    ring: 'ring-cyan-400/40',
    gradient: 'from-cyan-500 to-blue-600',
    dot: 'bg-cyan-400',
  },
  blue: {
    text: 'text-blue-300',
    border: 'hover:border-blue-400/60',
    ring: 'ring-blue-400/40',
    gradient: 'from-blue-500 to-blue-700',
    dot: 'bg-blue-400',
  },
  violet: {
    text: 'text-violet-300',
    border: 'hover:border-violet-400/60',
    ring: 'ring-violet-400/40',
    gradient: 'from-violet-500 to-purple-700',
    dot: 'bg-violet-400',
  },
  emerald: {
    text: 'text-emerald-300',
    border: 'hover:border-emerald-400/60',
    ring: 'ring-emerald-400/40',
    gradient: 'from-emerald-500 to-green-700',
    dot: 'bg-emerald-400',
  },
  amber: {
    text: 'text-amber-300',
    border: 'hover:border-amber-400/60',
    ring: 'ring-amber-400/40',
    gradient: 'from-amber-400 to-yellow-600',
    dot: 'bg-amber-400',
  },
  rose: {
    text: 'text-rose-300',
    border: 'hover:border-rose-400/60',
    ring: 'ring-rose-400/40',
    gradient: 'from-rose-500 to-red-700',
    dot: 'bg-rose-400',
  },
  orange: {
    text: 'text-orange-300',
    border: 'hover:border-orange-400/60',
    ring: 'ring-orange-400/40',
    gradient: 'from-orange-500 to-orange-700',
    dot: 'bg-orange-400',
  },
  sky: {
    text: 'text-sky-300',
    border: 'hover:border-sky-400/60',
    ring: 'ring-sky-400/40',
    gradient: 'from-sky-500 to-blue-600',
    dot: 'bg-sky-400',
  },
  teal: {
    text: 'text-teal-300',
    border: 'hover:border-teal-400/60',
    ring: 'ring-teal-400/40',
    gradient: 'from-teal-500 to-emerald-600',
    dot: 'bg-teal-400',
  },
  fuchsia: {
    text: 'text-fuchsia-300',
    border: 'hover:border-fuchsia-400/60',
    ring: 'ring-fuchsia-400/40',
    gradient: 'from-fuchsia-500 to-pink-700',
    dot: 'bg-fuchsia-400',
  },
  slate: {
    text: 'text-slate-200',
    border: 'hover:border-slate-300/60',
    ring: 'ring-slate-300/40',
    gradient: 'from-slate-500 to-slate-700',
    dot: 'bg-slate-300',
  },
  pink: {
    text: 'text-pink-300',
    border: 'hover:border-pink-400/60',
    ring: 'ring-pink-400/40',
    gradient: 'from-pink-500 to-rose-700',
    dot: 'bg-pink-400',
  },
}
