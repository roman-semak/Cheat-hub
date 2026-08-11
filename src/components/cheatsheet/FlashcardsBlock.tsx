'use client'

import { useState } from 'react'
import type { FlashcardItem } from '@/lib/cheatsheet/types'

// Grid of click-to-flip Q&A cards. Front shows the question, back the answer;
// clicking toggles a per-card flip (CSS 3D transform, see .flip-card* in globals.css).
export function FlashcardsBlock({ items }: { items: FlashcardItem[] }) {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <FlipCard key={i} item={item} />
      ))}
    </div>
  )
}

function FlipCard({ item }: { item: FlashcardItem }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label="Клікни, щоб перевернути картку"
      className="flip-card h-44 w-full text-left"
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-face flip-card-front">
          <span className="flip-card-label">Питання</span>
          <p
            className="text-sm text-slate-100"
            dangerouslySetInnerHTML={{ __html: item.question }}
          />
        </div>
        <div className="flip-card-face flip-card-back">
          <span className="flip-card-label">Відповідь</span>
          <p
            className="text-sm text-slate-100"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </div>
      </div>
    </button>
  )
}
