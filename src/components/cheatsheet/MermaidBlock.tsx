'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type mermaidApi from 'mermaid'

// Renders a Mermaid diagram (flowchart / sequence / ER / …) from its source.
// Mermaid is loaded via a dynamic import so it stays out of the main bundle and
// never runs during SSR (it needs the DOM + dompurify). Tuned to the Liquid
// Glass palette. On a parse error the raw source is shown instead of vanishing.

let loader: Promise<typeof mermaidApi> | null = null

function loadMermaid() {
  if (!loader) {
    loader = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        fontFamily: 'inherit',
        theme: 'base',
        themeVariables: {
          darkMode: true,
          background: '#0f172a',
          primaryColor: '#1e293b',
          primaryBorderColor: '#818cf8',
          primaryTextColor: '#e2e8f0',
          secondaryColor: '#312e81',
          tertiaryColor: '#164e63',
          lineColor: '#94a3b8',
          textColor: '#cbd5e1',
          mainBkg: '#1e293b',
          nodeBorder: '#818cf8',
          clusterBkg: 'rgba(255,255,255,0.03)',
          clusterBorder: 'rgba(255,255,255,0.15)',
          actorBkg: '#1e293b',
          actorBorder: '#818cf8',
          actorTextColor: '#e2e8f0',
          signalColor: '#94a3b8',
          signalTextColor: '#cbd5e1',
          labelBoxBkgColor: '#1e293b',
          labelBoxBorderColor: '#818cf8',
          noteBkgColor: '#312e81',
          noteTextColor: '#e2e8f0',
          noteBorderColor: '#818cf8',
        },
      })
      return mermaid
    })
  }
  return loader
}

export function MermaidBlock({ code, caption }: { code: string; caption?: string }) {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const base = `mmd-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const runRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    // Fresh id per run so a StrictMode double-invoke never collides on the id.
    const id = `${base}-${(runRef.current += 1)}`
    loadMermaid()
      .then((mermaid) => mermaid.render(id, code))
      .then(({ svg }) => {
        if (cancelled) return
        setSvg(svg)
        setError(null)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setSvg(null)
        setError(err instanceof Error ? err.message : String(err))
      })
      .finally(() => {
        // Mermaid can leave a temp node behind on a failed render.
        document.getElementById(id)?.remove()
        document.getElementById(`d${id}`)?.remove()
      })
    return () => {
      cancelled = true
    }
  }, [code, base])

  if (error) {
    return (
      <figure className="mermaid-block">
        <p className="mb-2 text-xs text-amber-300">Не вдалося відрендерити діаграму: {error}</p>
        <pre>
          <code>{code}</code>
        </pre>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className="mermaid-block">
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p className="text-xs text-slate-500">Рендер діаграми…</p>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
