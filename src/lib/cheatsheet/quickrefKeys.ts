import type { QuickRefBlock } from './types'

// Stable-ish tracking key for one quick-reference block.
//
// QuickRef blocks have no authored `id` (they're rendered by array index), but
// most carry a human `label`. We derive the key from the label so it survives
// reordering; we fall back to the index when there's no label, and disambiguate
// pure-label collisions with an index suffix.
//
// Shared by QuickRefTopicView (renders the "new" dot) and the stamp-new-content
// script (enumerates keys for the manifest) so the two can never drift.
export function quickRefBlockKey(block: QuickRefBlock, index: number): string {
  const label = 'label' in block ? block.label : undefined
  if (!label) return `i${index}`
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
  return slug || `i${index}`
}

// Given a whole block list, returns the per-block keys with collisions resolved
// (a `-{index}` suffix is appended only to the 2nd+ block that produced the
// same base key).
export function quickRefBlockKeys(blocks: QuickRefBlock[]): string[] {
  const seen = new Map<string, number>()
  return blocks.map((block, index) => {
    const base = quickRefBlockKey(block, index)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}-${index}`
  })
}
