import type { QuickRefLifecycleBlock, QuickRefLifecyclePhase } from '@/lib/cheatsheet/types'

function PhaseCard({ phase, isLast }: { phase: QuickRefLifecyclePhase; isLast: boolean }) {
  return (
    <div className="relative pl-3">
      <div
        className="absolute left-0 top-0.5 h-full w-0.5 rounded-full"
        style={{ backgroundColor: isLast ? 'transparent' : `${phase.accentHex}40` }}
      />
      <div
        className="absolute left-[-3px] top-1 h-2 w-2 rounded-full"
        style={{ backgroundColor: phase.accentHex }}
      />
      <div className="pb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold" style={{ color: phase.accentHex }}>
            {phase.phase}
          </span>
          <span className="text-xs text-slate-400">{phase.desc}</span>
        </div>
        <div className="mt-1 flex flex-col gap-0.5">
          {phase.hooks.map((hook) => (
            <span key={hook} className="font-mono text-xs text-slate-300">
              {hook}
            </span>
          ))}
        </div>
        <div className="mt-1 text-[11px] italic text-slate-500">{phase.classic}</div>
      </div>
    </div>
  )
}

export function QuickRefLifecycleDiagram({ block }: { block: QuickRefLifecycleBlock }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
      {block.label && (
        <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{block.label}</div>
      )}
      <div className="flex flex-col">
        {block.phases.map((phase, i) => (
          <PhaseCard key={phase.phase} phase={phase} isLast={i === block.phases.length - 1} />
        ))}
      </div>
    </div>
  )
}
