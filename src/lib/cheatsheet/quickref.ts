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
