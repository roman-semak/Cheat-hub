import { redirect } from 'next/navigation'
import { QUICKREF_TOPICS } from '@/lib/cheatsheet/quickref'

export default function Page() {
  redirect(`/quickref/${QUICKREF_TOPICS[0]}`)
}
