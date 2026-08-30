import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProblemBySlug, problems } from '@/data/problems'
import { stripMarkdown } from '@/lib/utils'
import { breadcrumbJsonLd, learningResourceJsonLd, pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { GlassNavbar } from '@/components/glass/GlassNavbar'
import { ProblemDescription } from '@/components/problems/ProblemDescription'
import { CodeEditor } from '@/components/editor/CodeEditor'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }))
}

// problems.ts is the complete, closed set — anything else is a real 404.
export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const problem = getProblemBySlug(slug)

  if (!problem) {
    return {}
  }

  const tags = JSON.parse(problem.tags) as string[]
  const cleanDescription = stripMarkdown(problem.description, 160)

  return {
    ...pageMetadata({
      title: problem.title,
      description: cleanDescription,
      path: `/problems/${slug}`,
      type: 'article',
      image: `/problems/${slug}/opengraph-image.png`,
      locale: 'en_US',
    }),
    keywords: tags,
  }
}

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params

  const problem = getProblemBySlug(slug)

  if (!problem) {
    notFound()
  }

  const testCases = JSON.parse(problem.testCases)
  const tags = JSON.parse(problem.tags) as string[]
  const companies = JSON.parse(problem.companies)

  return (
    <>
      <JsonLd
        data={[
          learningResourceJsonLd({
            name: problem.title,
            description: stripMarkdown(problem.description, 500),
            path: `/problems/${slug}`,
            educationalLevel: problem.difficulty,
            keywords: tags.join(', '),
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Problems', path: '/problems' },
            { name: problem.title, path: `/problems/${slug}` },
          ]),
        ]}
      />
      <GlassNavbar
        href="/problems"
        links={[{ label: 'Усі задачі', href: '/problems' }]}
      />
      <main className="min-h-screen" lang="en">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[calc(100vh-120px)]">
            {/* Left side: Problem description */}
            <div className="overflow-y-auto pr-4 custom-scrollbar">
              <ProblemDescription
                title={problem.title}
                difficulty={problem.difficulty}
                description={problem.description}
                tags={tags}
                companies={companies}
                editorial={problem.editorial}
                solution={problem.solution}
                approach={problem.approach}
              />
            </div>

            {/* Right side: Code editor */}
            <div className="overflow-hidden flex flex-col min-h-[520px] lg:min-h-0">
              <CodeEditor
                starterCode={problem.starterCode}
                testCases={testCases}
                problemSlug={problem.slug}
              />
            </div>
          </div>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.3);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.5);
          }
        `}</style>
      </main>
    </>
  )
}
