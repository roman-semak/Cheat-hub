import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-10">
        <h1 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-6xl font-bold text-transparent">
          404
        </h1>
        <p className="mt-4 text-slate-300">Такої сторінки не існує або її перенесли.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            На головну
          </Link>
          <Link
            href="/problems"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 hover:border-white/30"
          >
            До задач
          </Link>
        </div>
      </div>
    </main>
  )
}
