import { MetadataRoute } from 'next'
import { problems } from '@/data/problems'
import { TOPICS, formatHref } from '@/lib/cheatsheet/registry'
import { QUICKREF_TOPICS } from '@/lib/cheatsheet/quickref'
import { absoluteUrl, SITE_URL } from '@/lib/seo'
import manifest from '@/lib/cheatsheet/contentManifest.generated.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentUpdatedAt = new Date(manifest.generatedAt)
  const buildDate = new Date()

  // Cheat-sheet topic pages. `practice` maps to /problems (emitted once below);
  // the bare /quickref path is a redirect. Dedupe by resolved path.
  const seen = new Set<string>(['/problems', '/quickref'])
  const topicEntries: MetadataRoute.Sitemap = []
  for (const topic of TOPICS) {
    for (const format of topic.formats) {
      const path = formatHref(topic.slug, format)
      if (seen.has(path)) continue
      seen.add(path)
      topicEntries.push({
        url: absoluteUrl(path),
        lastModified: contentUpdatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  const quickrefEntries: MetadataRoute.Sitemap = QUICKREF_TOPICS.map((topic) => ({
    url: absoluteUrl(`/quickref/${topic}`),
    lastModified: contentUpdatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const problemEntries: MetadataRoute.Sitemap = problems.map((problem) => ({
    url: absoluteUrl(`/problems/${problem.slug}`),
    lastModified: buildDate,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/problems'),
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...topicEntries,
    ...quickrefEntries,
    ...problemEntries,
  ]
}
