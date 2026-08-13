---
name: cheatsheet-interview-questions
description: Ensure every section added or substantially edited in a cheatsheet Теорія (extended) topic file — react.ts, angular.ts, javascript.ts, nextjs.ts, fullstack.ts, architecture.ts, git.ts, ai.ts, algorithms.ts, ide.ts — carries a populated interviewQuestions array, so its end-of-section interview-questions popup always renders. Use when the user asks to add a new cheatsheet section, expand an existing one, or add interview questions to a topic.
tools: Read, Write, Edit, Grep, Glob
---

# Cheatsheet Interview Questions

Guarantees that every "Теорія" section in the cheatsheet ends with a clickable
"Питання на співбесіді" block — a popup of senior-frontend interview Q&A for
that section's topic. The block is not authored by hand each time; it renders
automatically for any section that carries a non-empty `interviewQuestions`
array. This skill's job is making sure that array always gets written.

## Structure (source of truth)

```
src/lib/cheatsheet/types.ts
  TopicSection {
    id, title, emoji?, blocks,
    interviewQuestions?: FlashcardItem[]   # { question: string; answer: string } — both HTML-capable
  }

src/components/cheatsheet/InterviewQuestionsBlock.tsx   # trigger + popup (tab-strip / prev-next), renders from the array alone
src/components/cheatsheet/ProseTopicView.tsx             # renders it after ContentBlocks, once per section, if the array is non-empty

src/lib/cheatsheet/
  react.ts        -> reactContent (Теорія, needs the field) / reactCheat (Шпаргалка, must NOT get it)
  angular.ts      -> angularContent / angularCheat
  javascript.ts   -> javascriptContent / javascriptCheat
  nextjs.ts       -> nextjsContent / nextjsCheat
  fullstack.ts    -> fullstackContent (no Cheat export in this file)
  architecture.ts -> architectureContent / architectureCheat
  git.ts          -> gitContent / gitCheat
  ai.ts           -> aiContent / aiCheat
  ide.ts          -> ideContent (extended-only, no Cheat)
  algorithms.ts   -> algorithmsContent (extended-only, no Cheat)
```

**Golden rule.** Every `TopicSection` inside a `*Content` (Теорія) export must
ship with a non-empty `interviewQuestions: FlashcardItem[]` — this is what
makes the block appear, nothing else needs touching. Sections inside a
`*Cheat` (Шпаргалка) export must **never** get this field — the short
cheatsheet page stays condensed/quick-reference by design (same underlying
`ProseTopicView` component renders both; the field alone decides whether the
block shows).

## Workflow — Add or extend a section

1. Write/edit the section's `blocks` as usual (no change to that process).
2. Add an `interviewQuestions` array to the same section object, placed
   anywhere before `blocks` for readability (key order doesn't matter to TS).
   Write 2-4 Q&A pairs, scaled to how deep/important the section is:
   - `question` — phrased the way a senior-frontend interviewer would actually
     ask it (not a textbook heading).
   - `answer` — HTML string, senior-depth (the "why", not just the "what"),
     using the same inline-markup conventions already used elsewhere in these
     files (`<strong>`, `<code>`, `<em>`, occasional `<ul>`), in Ukrainian.
3. Double-check the field landed on the `*Content` object for that topic, not
   on the matching `*Cheat` section with the same `id`/`title` (both exist in
   most files — they share section ids, so search results can be ambiguous;
   confirm by line range / which `export const ...Content` you're inside).
4. Nothing else to do — no component, no wiring, no new file. The popup
   renders automatically via `ProseTopicView.tsx` the next time that page is
   loaded.

## Conventions recap

- Ukrainian, HTML-capable `answer` (matches `FlashcardItem`/`QuizQuestion.explanation` conventions elsewhere in the codebase).
- 2-4 questions per section; deeper/more interview-relevant sections (internals, hooks, performance, state management) lean toward 3, small/tooling sections toward 2.
- Reuse the existing `FlashcardItem` type — never introduce a parallel `{question, answer}` interface for this.
- Never add `interviewQuestions` to a `*Cheat` export.
- When creating a brand-new topic file from scratch, apply the same rule to every section of its `*Content` export before considering the topic done.
