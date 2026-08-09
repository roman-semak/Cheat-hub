import type { Metadata } from 'next'
import { nextjsQuiz } from '@/lib/cheatsheet/nextjs-quiz'
import { getTopic } from '@/lib/cheatsheet/registry'
import { Quiz } from '@/components/cheatsheet/Quiz'

const meta = getTopic('nextjs')!

export const metadata: Metadata = {
  title: `${meta.title} — Квіз`,
  description: `Перевір знання з теми ${meta.title}.`,
}

export default function Page() {
  return <Quiz data={nextjsQuiz} quizId="nextjs" />
}
