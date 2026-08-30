// Shared doocs/leetcode reference-solution fetcher.
// Used by scripts/generate-testcases.ts (expected outputs) and
// scripts/generate-solutions.ts (the `solution` code shown in the popup).

export const RAW = 'https://raw.githubusercontent.com/doocs/leetcode/main/solution'
export const API = 'https://api.github.com/repos/doocs/leetcode/contents/solution'

/** doocs groups problems into 100-wide folders, e.g. `0000-0099`. */
export function bucket(n: number): string {
  const lo = Math.floor(n / 100) * 100
  const pad = (x: number) => String(x).padStart(4, '0')
  return `${pad(lo)}-${pad(lo + 99)}`
}

const bucketListings = new Map<string, Promise<string[]>>()

/** List the folder names inside one doocs bucket (cached, best-effort). */
export function listBucket(b: string): Promise<string[]> {
  if (!bucketListings.has(b)) {
    bucketListings.set(
      b,
      fetch(`${API}/${b}`, { headers: { 'User-Agent': 'gen-scripts' } })
        .then((r) => (r.ok ? r.json() : []))
        .then((d: unknown) =>
          Array.isArray(d) ? (d as { name: string }[]).map((x) => x.name) : [],
        )
        .catch(() => []),
    )
  }
  return bucketListings.get(b)!
}

/** Fetch the doocs reference solution (TS preferred, JS fallback). */
export async function fetchReferenceSolution(
  frontendId: number,
  title: string,
): Promise<string | null> {
  const b = bucket(frontendId)
  const id4 = String(frontendId).padStart(4, '0')
  const candidates = [`${id4}.${title}`]

  const listed = await listBucket(b)
  const match = listed.find((name) => name.startsWith(`${id4}.`))
  if (match && !candidates.includes(match)) candidates.push(match)

  for (const folder of candidates) {
    for (const file of ['Solution.ts', 'Solution.js']) {
      const url = `${RAW}/${b}/${encodeURIComponent(folder)}/${file}`
      const res = await fetch(url)
      if (res.ok) return await res.text()
    }
  }
  return null
}
