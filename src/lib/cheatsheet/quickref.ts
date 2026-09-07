import type { QuickRefBlock, TopicSlug } from './types'
import { reactQuickRefBlocks } from './quickref-react'
import { javascriptQuickRefBlocks } from './quickref-javascript'
import { angularQuickRefBlocks } from './quickref-angular'

// Topics migrated into the "Шпаргалка" hub so far, in menu order. Each has
// its own dense/minimal quickref board (see quickref-<slug>.ts). More
// topics (Next.js, Git, AI, Architecture, Fullstack) join this list as they
// get migrated from their old prose `/<topic>/cheatsheet` pages.
export const QUICKREF_TOPICS: TopicSlug[] = ['react', 'javascript', 'angular']

export const QUICKREF_BLOCKS: Partial<Record<TopicSlug, QuickRefBlock[]>> = {
  react: reactQuickRefBlocks,
  javascript: javascriptQuickRefBlocks,
  angular: angularQuickRefBlocks,
}

export interface CheatsheetEntry {
  slug: TopicSlug
  href: string
  /** Overrides the topic title where it would read wrong in a list of sheets. */
  label?: string
}

// Every cheat sheet in the app, in menu order — the migrated quickref boards
// plus the not-yet-migrated prose pages at their own URLs. Single source of
// truth for the "Шпаргалка" section: sidebar sub-links, the quickref tab bar,
// the hub card and the sitemap all read this. Labels/icons come from
// getTopic(slug), so nothing is duplicated here. A topic moves from the tail
// to QUICKREF_TOPICS as its content is migrated (see Tasks/task-007).
export const CHEATSHEET_ENTRIES: CheatsheetEntry[] = [
  ...QUICKREF_TOPICS.map((slug) => ({ slug, href: `/quickref/${slug}` })),
  { slug: 'nextjs', href: '/nextjs/cheatsheet' },
  { slug: 'leetcode', href: '/leetcode/cheatsheet', label: 'LeetCode' },
  { slug: 'architecture', href: '/architecture/cheatsheet' },
  { slug: 'fullstack', href: '/fullstack/cheatsheet' },
  { slug: 'git', href: '/git/cheatsheet' },
  { slug: 'ai', href: '/ai/cheatsheet' },
]

export const CHEATSHEET_HREFS = new Set(CHEATSHEET_ENTRIES.map((e) => e.href))
