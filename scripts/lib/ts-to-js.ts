// Converts a doocs/LeetCode reference solution to plain JavaScript.
//
// The popup in the app shows JS only, so every `solution` we store must be JS:
// scripts/generate-solutions.ts runs fetched code through here before writing
// the sidecar, scripts/merge-leetcode-catalog.ts re-applies it to every row it
// renders into src/data/problems.ts, and scripts/normalize-solutions.ts uses it
// to migrate / audit what is already committed.
//
// Idempotent: code that is already JS comes back unchanged.
import { transform } from 'sucrase'

/**
 * doocs ships the TypeScript flavour of the LeetCode node-definition header
 * comment (`class ListNode { val: number … }`). Rewrite it into the JavaScript
 * flavour LeetCode itself shows (`function ListNode(val, next) { … }`), so the
 * popup carries no type syntax at all — not even inside comments.
 */
function rewriteNodeDefComments(code: string): string {
  return code.replace(/\/\*\*[\s\S]*?\*\//g, (block) => {
    const classMatch = block.match(/^\s*\*\s*class\s+(\w+)\s*\{\s*$/m)
    const ctorMatch = block.match(/^\s*\*\s*constructor\s*\(([^)]*)\)\s*\{\s*$/m)
    if (!classMatch || !ctorMatch) return block

    const name = classMatch[1]
    const params = ctorMatch[1]
      .split(',')
      .map((p) => p.trim().replace(/[?:].*$/s, '').trim())
      .filter(Boolean)

    // ` *         this.val = (val===undefined ? 0 : val)` -> the body lines.
    const body = block
      .split('\n')
      .map((line) => line.match(/^\s*\*\s+(this\.\w+\s*=.*)$/)?.[1])
      .filter((l): l is string => Boolean(l))
    if (body.length === 0) return block

    // Everything above the `class` line (e.g. "Definition for a binary tree node.").
    const lead = block
      .split('\n')
      .slice(1, block.split('\n').findIndex((l) => /\*\s*class\s+\w+\s*\{/.test(l)))
      .map((l) => l.replace(/\s+$/, ''))
      .filter((l) => l.trim() !== '*')

    return [
      '/**',
      ...lead,
      ` * function ${name}(${params.join(', ')}) {`,
      ...body.map((l) => ` *     ${l}`),
      ' * }',
      ' */',
    ].join('\n')
  })
}

/** Strip TypeScript syntax, keeping the original formatting and modern JS. */
export function toJavaScript(code: string): string {
  // `disableESTransforms` keeps `?.` / `??` as-is; without it sucrase rewrites
  // them and prepends `_optionalChain` / `_nullishCoalesce` helper declarations.
  const js = transform(rewriteNodeDefComments(code), {
    transforms: ['typescript'],
    disableESTransforms: true,
  }).code

  // Removing a top-level `interface` / `type` leaves an extra blank line behind.
  return js.replace(/\n{3,}/g, '\n\n').trim()
}
