import type { ReactNode } from 'react'
import { problems } from '@/data/problems'
import { ProblemNavShell, type ProblemNavItem } from '@/components/problems/ProblemNavShell'

// Lightweight nav list — catalog order, same mapping approach as
// src/app/(hub)/problems/page.tsx. Static data only, no DB.
const navItems: ProblemNavItem[] = problems.map((p) => ({
  slug: p.slug,
  title: p.title,
  difficulty: p.difficulty,
}))

export default function ProblemsLayout({ children }: { children: ReactNode }) {
  return <ProblemNavShell items={navItems}>{children}</ProblemNavShell>
}
