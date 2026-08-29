import { problems } from '@/data/problems'
import { stripMarkdown } from '@/lib/utils'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { ProblemsView } from '@/components/problems/ProblemsView'

export const metadata = pageMetadata({
  title: 'Задачі',
  description:
    'Каталог задач з алгоритмів на JavaScript та TypeScript: умова, підказки, розбір і рішення — розв’язуй прямо в редакторі коду.',
  path: '/problems',
})

export default function ProblemsPage() {
  const list = problems.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    difficulty: p.difficulty,
    summary: stripMarkdown(p.description, 140), // «що зробити»
    tags: JSON.parse(p.tags) as string[], // «що використати»
  }))

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Головна', path: '/' },
          { name: 'Задачі', path: '/problems' },
        ])}
      />
      <ProblemsView problems={list} />
    </>
  )
}
