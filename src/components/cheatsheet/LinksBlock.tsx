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
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-subtle group relative flex items-center gap-2 rounded-full border border-white/10 py-2 pl-2.5 pr-3.5 no-underline transition-colors hover:border-indigo-400/50 hover:no-underline"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-600">
              <ExternalLink size={12} className="text-white" />
            </span>
            <span className="text-sm font-medium text-slate-100 group-hover:text-white">
              {item.title}
            </span>

            {/* Details on hover — hidden in the body, revealed as a floating tooltip */}
            <span
              role="tooltip"
              className="glass-subtle pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 translate-y-1 rounded-lg border border-white/10 p-3 text-left text-xs leading-relaxed text-slate-300 opacity-0 shadow-xl transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100"
            >
              {item.description}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
