import { leetcodeData } from '@/lib/cheatsheet/leetcode'
import { pageMetadata } from '@/lib/seo'
import { LeetcodeView } from '@/components/cheatsheet/LeetcodeView'

export const metadata = pageMetadata({
  title: 'LeetCode — Розширена',
  description:
    'NeetCode 250 — база задач для live-coding інтерв’ю: назва, що робити, короткий підхід, складність.',
  path: '/leetcode',
})

export default function LeetcodeExtendedPage() {
  return <LeetcodeView data={leetcodeData} />
}
