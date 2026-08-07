import { ExternalLink } from 'lucide-react'
import type { ContentBlock } from '@/lib/cheatsheet/types'

type LinksBlockData = Omit<Extract<ContentBlock, { kind: 'links' }>, 'kind'>

export function LinksBlock({ title, items }: LinksBlockData) {
  return (
    <div className="my-6">
      {title && (
        <h3 className="mb-3 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-lg font-semibold text-transparent">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-subtle group flex items-start gap-3 rounded-xl border border-white/10 p-4 no-underline transition-colors hover:border-indigo-400/50 hover:no-underline"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-600">
              <ExternalLink size={15} className="text-white" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-slate-100 group-hover:text-white">
                {item.title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-400">
                {item.description}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
