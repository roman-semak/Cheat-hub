---
name: task-manager
description: Manage this project's Tasks/ workflow — create numbered task files from TEMPLATE.md, maintain the .task-counter JSON journal (nextId/active/archived), archive completed tasks to Tasks/archive/ (never delete), and reconcile IDs/statuses. Use when the user asks to create a task, mark a task done/archive it, check task status, update the task counter, tidy the Tasks folder, or resolve duplicate task IDs.
tools: Read, Write, Edit, Bash, Glob
---

# Task Manager

Automates the repeatable lifecycle of the project's `Tasks/` folder so these steps
never have to be done by hand again.

## Structure (source of truth)

```
Tasks/
├── README.md            # short intro
├── SYSTEM.md            # system description
├── TEMPLATE.md          # template every new task is generated from
├── .task-counter        # JSON journal (see schema below)
├── task-NNN-<slug>.md   # ACTIVE tasks live in the root (TODO / IN_PROGRESS)
└── archive/
    └── task-NNN-<slug>.md[.done.md]   # completed (✅ DONE) tasks
```

**Golden rule — history is never deleted.** Completed tasks are *moved* to
`Tasks/archive/`, not removed. Never `rm` a task file.

## `.task-counter` schema

```json
{
  "nextId": 6,
  "totalCreated": 5,
  "active":   ["004", "005"],
  "archived": ["001", "002", "003"]
}
```

- `nextId` — ID the next new task will use.
- `totalCreated` — total tasks ever created (never decreases).
- `active` — IDs of task files currently in the `Tasks/` root.
- `archived` — IDs of task files in `Tasks/archive/`.
- IDs are strings, zero-padded to 3 digits (`"004"`).

**Backward compatibility:** if `.task-counter` contains a bare number (e.g. `4`),
treat that number as `nextId` and migrate the file to the JSON shape on the first
write, deriving `active`/`archived` by scanning the folders.

Read it with `jq`:
```bash
jq -r '.nextId' Tasks/.task-counter
```

## Workflow A — Create a task

1. Read `nextId` from `Tasks/.task-counter` (handle the bare-number legacy case).
2. Make a slug from the title: lowercase, spaces→`-`, ASCII/kebab, keep it short.
3. Create `Tasks/task-<nextId>-<slug>.md` from `Tasks/TEMPLATE.md` with:
   - `# Task <nextId>: <Title>`
   - `**Дата створення:** <today YYYY-MM-DD>` (get today via `date +%F`)
   - `**Статус:** 📋 TODO`
   - a real plan filled into the template's steps (don't leave placeholders).
4. Update `.task-counter`: `nextId += 1`, `totalCreated += 1`, append the new ID
   to `active`.
5. Report the created path to the user.

## Workflow B — Complete & archive a task

1. In the task file set `**Статус:** ✅ DONE` (add `**Дата завершення:** <today>`).
   Optionally create/keep the `task-NNN-<slug>.done.md` results file.
2. Move every file for that ID into `Tasks/archive/`:
   - tracked in git → `git mv Tasks/task-NNN-*.md Tasks/archive/`
   - untracked → plain `mv`
   Check per file: `git ls-files --error-unmatch <file>` (exit 0 = tracked).
3. Update `.task-counter`: move the ID from `active` to `archived`.
4. Report what was archived.

## Workflow C — Reconcile / audit

Run when asked to "check tasks", tidy the folder, or when something looks off
(this is the step that resolves a duplicate-ID collision like two `task-004`s).

1. List `Tasks/task-*.md` (root) and `Tasks/archive/task-*.md`.
2. Parse each file's `# Task <ID>:` and `**Статус:**` line.
3. Compare against `.task-counter` and flag:
   - **Duplicate IDs** — two files share an ID → ask the user which keeps the ID;
     renumber the other to `nextId` (rename file + its `# Task N:` heading), then
     bump the counter.
   - **Orphan files** — a task file not listed in `active`/`archived` → add it.
   - **Status mismatch** — a `✅ DONE` file still in the root → offer Workflow B;
     an active file carrying a completion date → surface it.
   - **Counter drift** — `nextId` ≤ any existing ID → raise `nextId` above the max.
4. Never delete or overwrite without confirmation. When a file's stated status
   contradicts reality (e.g. marked DONE but the user says it's unfinished), ask —
   don't assume the header is correct.
5. Rewrite `.task-counter` to the reconciled state and summarize changes.

## Optional — focused commit

If the user wants it committed, stage **only** Tasks-related paths and commit with
a `chore(tasks): ...` message — do not sweep in unrelated working-tree changes:

```bash
git add Tasks/.task-counter Tasks/README.md Tasks/SYSTEM.md \
        Tasks/task-*.md Tasks/archive/
git commit -m "chore(tasks): <what changed>"
```

## Conventions recap

- Never delete a task — archive only.
- Dates: `YYYY-MM-DD`, always today's real date (`date +%F`).
- IDs: 3-digit zero-padded strings.
- Read a target file before overwriting/moving; on any ID conflict, ask the user.
- Keep `.task-counter` valid JSON — validate with `jq . Tasks/.task-counter` after
  each write.
