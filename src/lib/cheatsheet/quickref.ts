import type { QuickRefBlock, TopicSlug } from './types'
import { reactQuickRefBlocks } from './quickref-react'
import { javascriptQuickRefBlocks } from './quickref-javascript'
import { angularQuickRefBlocks } from './quickref-angular'
import { nextjsQuickRefBlocks } from './quickref-nextjs'
import { leetcodeQuickRefBlocks } from './quickref-leetcode'
import { architectureQuickRefBlocks } from './quickref-architecture'
import { fullstackQuickRefBlocks } from './quickref-fullstack'
import { gitQuickRefBlocks } from './quickref-git'
import { aiQuickRefBlocks } from './quickref-ai'

// Every cheat sheet in the "Шпаргалка" hub, in menu order. Each has its own
// dense quickref board (see quickref-<slug>.ts) rendered at /quickref/<slug>.
export const QUICKREF_TOPICS: TopicSlug[] = [
  'react',
  'javascript',
  'angular',
  'nextjs',
  'leetcode',
  'architecture',
  'fullstack',
  'git',
  'ai',
]

export const QUICKREF_BLOCKS: Partial<Record<TopicSlug, QuickRefBlock[]>> = {
  react: reactQuickRefBlocks,
  javascript: javascriptQuickRefBlocks,
  angular: angularQuickRefBlocks,
  nextjs: nextjsQuickRefBlocks,
  leetcode: leetcodeQuickRefBlocks,
  architecture: architectureQuickRefBlocks,
  fullstack: fullstackQuickRefBlocks,
  git: gitQuickRefBlocks,
  ai: aiQuickRefBlocks,
}

export interface CheatsheetEntry {
  slug: TopicSlug
  href: string
  /** Overrides the topic title where it would read wrong in a list of sheets. */
  label?: string
}

const LABELS: Partial<Record<TopicSlug, string>> = { leetcode: 'LeetCode' }

// Single source of truth for the "Шпаргалка" section: sidebar sub-links, the
// quickref tab bar, the hub card and the sitemap all read this. Labels/icons
// come from getTopic(slug), so nothing is duplicated here.
export const CHEATSHEET_ENTRIES: CheatsheetEntry[] = QUICKREF_TOPICS.map((slug) => ({
  slug,
  href: `/quickref/${slug}`,
  label: LABELS[slug],
}))

export const CHEATSHEET_HREFS = new Set(CHEATSHEET_ENTRIES.map((e) => e.href))
