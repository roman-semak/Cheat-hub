import type { Metadata } from 'next'
import { fullstackQuiz } from '@/lib/cheatsheet/fullstack-quiz'
import { getTopic } from '@/lib/cheatsheet/registry'
import { Quiz } from '@/components/cheatsheet/Quiz'

const meta = getTopic('fullstack')!

export const metadata: Metadata = {
  title: `${meta.title} — Квіз`,
  description: `Перевір знання з теми ${meta.title}.`,
}

export default function Page() {
  return <Quiz data={fullstackQuiz} quizId="fullstack" />
}
