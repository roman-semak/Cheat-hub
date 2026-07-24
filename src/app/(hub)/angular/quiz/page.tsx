import type { Metadata } from 'next'
import { angularQuiz } from '@/lib/cheatsheet/angular-quiz'
import { getTopic } from '@/lib/cheatsheet/registry'
import { Quiz } from '@/components/cheatsheet/Quiz'

const meta = getTopic('angular')!

export const metadata: Metadata = {
  title: `${meta.title} — Квіз`,
  description: `Перевір знання з теми ${meta.title}.`,
}

export default function Page() {
  return <Quiz data={angularQuiz} quizId="angular" />
}
