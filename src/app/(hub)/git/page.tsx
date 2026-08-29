import { gitContent } from '@/lib/cheatsheet/git'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('git')!

export const metadata = topicMetadata('git', 'extended')

export default function Page() {
  return <ProseTopicView content={gitContent} meta={meta} />
}
