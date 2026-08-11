import type { ContentBlock } from '@/lib/cheatsheet/types'
import { CodeBlock } from './CodeBlock'
import { LinksBlock } from './LinksBlock'
import { FlashcardsBlock } from './FlashcardsBlock'

// Renders the block model used by prose topics. Most prose is preserved as
// sanitized HTML (styled by .cheat-prose); code blocks get the interactive
// CodeBlock treatment (collapsible + copy).
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="cheat-prose">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'code':
            return (
              <CodeBlock
                key={i}
                code={block.code}
                language={block.language}
                summary={block.caption ?? `Код (${block.language})`}
                defaultOpen
              />
            )
          case 'paragraph':
          case 'note':
            return (
              <div key={i} dangerouslySetInnerHTML={{ __html: (block as { html: string }).html }} />
            )
          case 'heading': {
            const Tag = block.level === 2 ? 'h2' : 'h3'
            return <Tag key={i}>{block.text}</Tag>
          }
          case 'links':
            return <LinksBlock key={i} title={block.title} items={block.items} />
          case 'flashcards':
            return <FlashcardsBlock key={i} items={block.items} />
          default:
            return null
        }
      })}
    </div>
  )
}
