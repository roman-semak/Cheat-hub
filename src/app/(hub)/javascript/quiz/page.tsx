import type { Metadata } from 'next'
import { javascriptQuiz } from '@/lib/cheatsheet/javascript-quiz'
import { getTopic } from '@/lib/cheatsheet/registry'
import { Quiz } from '@/components/cheatsheet/Quiz'

const meta = getTopic('javascript')!

export const metadata: Metadata = {
  title: `${meta.title} — Квіз`,
  description: `Перевір знання з теми ${meta.title}.`,
}

export default function Page() {
  return <Quiz data={javascriptQuiz} quizId="javascript" />
}
