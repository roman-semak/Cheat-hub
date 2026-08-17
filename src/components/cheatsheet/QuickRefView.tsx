import type { QuickRefBlock, QuickRefColumn, QuickRefContent, QuickRefGroup } from '@/lib/cheatsheet/types'

function isChipRow(block: QuickRefBlock): block is Extract<QuickRefBlock, { chips: string[] }> {
  return 'chips' in block
}

function QuickRefGroupBlock({ group }: { group: QuickRefGroup }) {
  return (
    <div className="flex flex-col gap-1">
      {group.label && (
        <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {group.label}
        </div>
      )}
      <div className="flex flex-col gap-1">
        {group.entries.map((entry) =>
          entry.inline ? (
            <div key={entry.term} className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-mono font-semibold text-slate-200">{entry.term}</span>
              {entry.desc && (
                <span
                  className="text-right text-slate-400"
                  dangerouslySetInnerHTML={{ __html: entry.desc }}
                />
              )}
            </div>
          ) : (
            <div key={entry.term} className="text-xs leading-snug">
              <span className="font-mono font-semibold text-slate-200">{entry.term}</span>
              {entry.desc && (
                <div
                  className="mt-0.5 text-[11px] text-slate-400"
                  dangerouslySetInnerHTML={{ __html: entry.desc }}
                />
              )}
            </div>
          ),
        )}
      </div>
    </div>
  )
}

function QuickRefChips({ block }: { block: Extract<QuickRefBlock, { chips: string[] }> }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-1.5">
        {block.chips.map((chip, i) => (
          <span
            key={i}
            className="rounded-md bg-white/5 px-1.5 py-0.5 text-[11px] text-slate-400 [&_b]:font-semibold [&_b]:text-slate-200 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: chip }}
          />
        ))}
      </div>
    </div>
  )
}

function QuickRefColumnCard({ column }: { column: QuickRefColumn }) {
  return (
    <div
      className="glass-subtle flex flex-col gap-2.5 rounded-2xl border-t-2 p-4"
      style={{ borderTopColor: column.accentHex }}
    >
      <h2 className="text-sm font-bold" style={{ color: column.accentHex }}>
        {column.title}
      </h2>
      {column.blocks.map((block, i) =>
        isChipRow(block) ? (
          <QuickRefChips key={i} block={block} />
        ) : (
          <QuickRefGroupBlock key={i} group={block} />
        ),
      )}
    </div>
  )
}

export function QuickRefView({ content }: { content: QuickRefContent }) {
  return (
    <div className="px-6 py-8 md:px-10">
      <header className="mb-6">
        <h1 className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-3xl font-bold text-transparent">
          {content.title}
        </h1>
        {content.subtitle && <p className="mt-2 text-slate-400">{content.subtitle}</p>}
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {content.columns.map((column) => (
          <QuickRefColumnCard key={column.id} column={column} />
        ))}
      </div>
    </div>
  )
}
