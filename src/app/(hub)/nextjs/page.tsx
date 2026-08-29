import { nextjsContent } from '@/lib/cheatsheet/nextjs'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('nextjs')!

export const metadata = topicMetadata('nextjs', 'extended')

export default function Page() {
  return <ProseTopicView content={nextjsContent} meta={meta} />
}
