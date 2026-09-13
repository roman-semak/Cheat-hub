import type { QuickRefBlock } from './types'

// AI (Claude Code / Anthropic SDK) quickref board — condensed from the old
// prose `aiCheat` sheet.
export const aiQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'Claude Code команди',
    icon: '⌨️',
    entries: [
      { term: '/help', desc: 'доступні команди та режими' },
      { term: '/plan', desc: 'Plan Mode: explore → design → review' },
      { term: '/code-review', chips: ['low', 'medium', 'high', 'ultra'], desc: 'review різної глибини' },
      { term: '/run', desc: 'запустити app (auto-detect типу проекту)' },
      { term: '/schedule', desc: 'cloud agent на cron' },
      { term: '/loop [interval]', desc: 'повторювати задачу на інтервалі' },
      { term: '/init', desc: 'згенерувати CLAUDE.md' },
    ],
  },
  {
    label: 'Prompt structure',
    icon: '✍️',
    entries: [
      {
        term: 'Role · Context · Task · Format · Constraints · Example',
        desc: 'ідеальний каркас промпту',
        code: `Role: You are a Senior Frontend Developer

Context: [Project overview, tech stack, architecture]

Task: [What to do — be specific]

Format: Return TypeScript

Constraints:
- Don't use X
- Must support Y
- No breaking changes

Example: [Expected output sample]`,
        codeLanguage: 'markdown',
      },
      { term: '❌ Vague', desc: '«Make this better» → ✓ «Optimize bundle size»' },
      { term: '❌ No context', desc: '«Write function» → ✓ «React hook for infinite scroll»' },
      { term: '❌ Over-constraining', desc: 'забагато правил → 3-4 ключові обмеження' },
    ],
  },
  {
    label: 'CLAUDE.md',
    icon: '📄',
    entries: [
      {
        term: 'Що включає',
        chips: ['overview + stack', 'структура', 'конвенції', 'типові задачі', 'ключові файли'],
        code: `# CLAUDE.md — Project Guide

## Project Overview
Next.js / React app. Purpose: ...

## Architecture
src/app — routes · src/components · src/lib

## Key Conventions
- Files: kebab-case
- Imports: absolute from @/

## Run locally
npm install && npm run dev`,
        codeLanguage: 'markdown',
      },
      { term: 'НЕ включає', desc: '<b>секрети</b>, API keys, credentials' },
    ],
  },
  {
    label: '.claude/settings.json',
    icon: '🔧',
    entries: [
      {
        term: 'model / permissions / hooks / mcpServers',
        desc: 'конфіг на рівні проекту',
        code: `{
  "model": "claude-opus-5",
  "permissions": { "allow": ["Bash(npm run test:*)"] },
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit", "hooks": [{ "type": "command", "command": "npm run lint" }] }
    ]
  },
  "mcpServers": {
    "github": { "command": "npx", "args": ["@modelcontextprotocol/server-github"] }
  }
}`,
        codeLanguage: 'json',
      },
    ],
  },
  {
    label: 'Hooks',
    icon: '🪝',
    entries: [
      { term: 'PreToolUse', desc: 'перед викликом інструмента — валідація / блок' },
      { term: 'PostToolUse', desc: 'після — lint, format, тести' },
      { term: 'Notification / Stop', desc: 'сповіщення (Slack), коли Claude закінчив' },
    ],
  },
  {
    label: 'Loops & Scheduling',
    icon: '🔁',
    entries: [
      {
        term: '/loop <interval> <cmd|prompt>',
        chips: ['s', 'm', 'h'],
        desc: 'без інтервалу — модель сама обирає темп',
        code: `/loop 5m /babysit-prs          # слеш-команда кожні 5 хв
/loop 30s перевір статус деплою # промпт кожні 30 с
/loop /code-review              # dynamic, self-paced
# зупинити: Escape або «stop the loop»`,
        codeLanguage: 'bash',
      },
      { term: 'Use cases', chips: ['моніторинг деплою', 'polling CI', 'PR babysit', 'статус-чеки'] },
      { term: 'loop vs /schedule', desc: '<b>loop</b> — локально в сесії · <b>schedule</b> — cloud cron без тебе' },
    ],
  },
  {
    label: 'Security',
    icon: '🔒',
    entries: [
      { term: '❌ Never share', chips: ['.env', 'API keys', 'DB passwords', 'SSH keys', 'PII'] },
      { term: '✓ Safe', chips: ['CLAUDE.md', 'source code', 'tests & docs', 'architecture'] },
      {
        term: '.gitignore',
        desc: 'AI-sensitive файли',
        code: `.env*
credentials.json
**/*.key
**/*.pem
private/`,
        codeLanguage: 'bash',
      },
    ],
  },
  {
    label: 'Anthropic SDK',
    icon: '⚛️',
    entries: [
      {
        term: 'messages.create',
        chips: ['npm i @anthropic-ai/sdk'],
        code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // ANTHROPIC_API_KEY з env

const msg = await client.messages.create({
  model: 'claude-opus-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }],
});`,
      },
      {
        term: 'Streaming',
        desc: 'токени по мірі генерації',
        code: `const stream = client.messages.stream({ model, max_tokens, messages });
stream.on('text', (text) => process.stdout.write(text));
const final = await stream.finalMessage();`,
      },
      {
        term: 'Prompt caching',
        chips: ["cache_control: { type: 'ephemeral' }"],
        desc: 'кешує великий стабільний префікс (system, документи)',
        code: `system: [{
  type: 'text',
  text: 'Large context...',
  cache_control: { type: 'ephemeral' },
}]`,
      },
    ],
  },
  {
    label: 'Agent Skills — рівні',
    icon: '🎓',
    entries: [
      { term: '1. Instruction file', desc: 'один <code>SKILL.md</code>: шапка + вільний текст' },
      { term: '2. Fixed workflow', desc: 'зафіксований процес + верифікація' },
      { term: '3. Description-роутер', desc: 'опис вирішує, чи скіл вантажиться (progressive disclosure)' },
      { term: '4. Розбиття на файли', desc: 'довідки й скрипти — за умовою в тілі' },
      { term: '5. Права й середовище', desc: 'allowed-tools, модель, субагент' },
      { term: '6. Evals', desc: 'кейси + раннер, 3-5 прогонів, LLM-суддя окремо' },
      { term: '7. Плагін', desc: 'версія, авто-оновлення, Marketplace' },
    ],
  },
  {
    label: 'Skills — діагностика',
    icon: '🩺',
    entries: [
      { term: 'Не вмикається', desc: 'рівень 3 — опис нерелевантний / вузький' },
      { term: 'Вмикається зайво', desc: 'рівень 3 — опис занадто широкий' },
      { term: 'Різні результати', desc: 'рівень 2 — немає фіксованого workflow' },
      { term: '«Зробив», але ні', desc: 'рівень 2/6 — немає верифікації / evals' },
    ],
  },
  {
    label: 'Співбесіда',
    icon: '🎯',
    entries: [
      {
        term: '✓ Green flags',
        desc: 'AI як pair programmer для review і планування; CLAUDE.md для контексту; перевіряю тестами',
      },
      { term: '❌ Red flags', desc: '«AI пише весь код», «не рев\'юю output», «ділюсь секретами»' },
      { term: 'AI помиляється?', desc: 'так — тому тести + ручний review' },
      { term: 'AI робить лінивим?', desc: 'ні — фокус на дизайні й архітектурі, не на boilerplate' },
    ],
  },
]
