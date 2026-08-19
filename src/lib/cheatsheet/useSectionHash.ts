'use client'

import { RefObject, useEffect } from 'react'

// 'instant' (not 'auto') is required to bypass the container's CSS
// scroll-behavior: smooth (the `scroll-smooth` class) — 'auto' defers to
// that CSS and animates across the whole page.
function scrollSectionIntoView(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
}

// Scrolls the section named by the URL hash into view — once on mount (so a
// deep link, e.g. /react#hooks-catalog-full, restores the reading position
// instead of landing at the top) and again on `hashchange` (address-bar edit
// or back/forward within the same page load; our own replaceState-driven
// sync doesn't fire this event, so it never fights the scroll-spy).
export function useRestoreSectionScroll(ids: string[], scrollRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    // Captured synchronously, before useSectionHashSync's own mount effect
    // can overwrite the hash with the scroll-spy's still-unresolved initial
    // activeId (hook order guarantees this effect body runs first).
    const initialId = decodeURIComponent(window.location.hash.slice(1))

    // Deferred two frames: content above the target (code blocks, etc.) can
    // still resize right after mount, which would leave an immediate jump
    // short of the target.
    let cleanup = () => cancelAnimationFrame(raf1)
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        if (initialId && ids.includes(initialId)) scrollSectionIntoView(initialId)
      })
      cleanup = () => cancelAnimationFrame(raf2)
    })

    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (id && ids.includes(id)) scrollSectionIntoView(id)
    }
    window.addEventListener('hashchange', onHashChange)

    return () => {
      cleanup()
      window.removeEventListener('hashchange', onHashChange)
    }
    // `ids` is stable per topic; scrollRef never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef])
}

// Keeps the URL hash in sync with the currently active section as the reader
// scrolls, using replaceState so it never adds history entries or triggers a
// Next.js navigation.
export function useSectionHashSync(activeId: string) {
  useEffect(() => {
    if (!activeId) return
    if (window.location.hash.slice(1) === activeId) return
    window.history.replaceState(null, '', `#${activeId}`)
  }, [activeId])
}
