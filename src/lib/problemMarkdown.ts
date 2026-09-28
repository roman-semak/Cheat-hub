// LeetCode descriptions reach us from scripts/import-leetcode.ts, whose
// HTML→Markdown pass strips <ul>/<li> tags but keeps LeetCode's tab indentation.
// A leading tab is an INDENTED CODE BLOCK in Markdown, so those bullets render
// as a <pre> that never wraps and gets clipped on narrow columns — it affects
// 466 of the 618 problems (conditions and constraints alike).
//
// Every one of the 2210 tab-indented lines in the catalog is prose, not code,
// so turning them back into list items is safe. Fixed here rather than in the
// data because src/data/problems.ts is auto-generated.
export function normalizeProblemMarkdown(text: string): string {
  if (!text) return ''
  let inFence = false
  return text
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence
        return line
      }
      if (inFence) return line
      // A tab (or the 4 spaces Markdown treats the same way) followed by real
      // content — the flattened remains of an <li>.
      const bullet = line.match(/^(?:\t|    )\s*(\S.*)$/)
      return bullet ? `- ${bullet[1]}` : line
    })
    .join('\n')
}
