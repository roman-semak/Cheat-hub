import type { Metadata } from 'next'
import { reactQuiz } from '@/lib/cheatsheet/react-quiz'
import { getTopic } from '@/lib/cheatsheet/registry'
import { Quiz } from '@/components/cheatsheet/Quiz'

const meta = getTopic('react')!

export const metadata: Metadata = {
  title: `${meta.title} — Квіз`,
  description: `Перевір знання з теми ${meta.title}.`,
}

export default function Page() {
  return <Quiz data={reactQuiz} quizId="react" />
}
