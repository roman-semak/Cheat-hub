import type { Metadata } from 'next'
import { leetcodeData } from '@/lib/cheatsheet/leetcode'
import { LeetcodeView } from '@/components/cheatsheet/LeetcodeView'

export const metadata: Metadata = {
  title: 'LeetCode — Розширена',
  description:
    'NeetCode 250 — база задач для live-coding інтерв’ю: назва, що робити, короткий підхід, складність.',
}

export default function LeetcodeExtendedPage() {
  return <LeetcodeView data={leetcodeData} />
}
