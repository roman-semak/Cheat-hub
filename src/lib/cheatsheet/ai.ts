// AUTO-GENERATED from CheetSheet/ai/{index,cheatsheet}.html.
// Prose preserved as sanitized HTML blocks (styled via .cheat-prose) +
// extracted code blocks. Re-running the parser overwrites this file.
import type { TopicContent } from './types'

export const aiContent: TopicContent = {
  "slug": "ai",
  "sections": [
    {
      "id": "ai-tools-landscape",
      "title": "🗺️ AI Tools Landscape",
      interviewQuestions: [
        {
          "question": "Чим агентні AI-інструменти (Claude Code, Cursor у agent-режимі) принципово відрізняються від автодоповнення на кшталт GitHub Copilot?",
          "answer": "Автодоповнення пропонує наступний рядок/блок коду в межах поточного файлу, залишаючи всі рішення й дії (запуск тестів, редагування кількох файлів, git-операції) розробнику. Агентний інструмент отримує задачу високого рівня й самостійно планує та виконує послідовність дій — читає код, редагує кілька файлів, запускає команди, перевіряє результат — тобто працює ітеративно до досягнення мети, а не видає одну пропозицію."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>2025+ году:</strong> LLM-driven development стає стандартом. Вибір інструменту залежить від workflow, IDE, та вимог до приватності.</p><h3 class=\"topic\">Основні гравці <span class=\"tag tag-key\">KEY</span></h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Інструмент</th><th>Основа</th><th>Формати</th><th>Переваги</th><th>Обмеження</th></tr>\n              <tr>\n                <td><strong>Claude Code</strong></td>\n                <td>Claude 3.x</td>\n                <td>CLI, Web, IDE ext.</td>\n                <td>Plan Mode, CLAUDE.md, Memory, Agent, Workflow</td>\n                <td>API-based, потребує інтернету</td>\n              </tr>\n              <tr>\n                <td><strong>GitHub Copilot</strong></td>\n                <td>GPT-4</td>\n                <td>IDE ext., CLI</td>\n                <td>Native в GitHub, встроєний у VS Code</td>\n                <td>Менше контексту, без Planning</td>\n              </tr>\n              <tr>\n                <td><strong>Cursor</strong></td>\n                <td>Claude / GPT</td>\n                <td>IDE (Electron)</td>\n                <td>Localsearch, @mentions, inline edit</td>\n                <td>IDE-bound, не поширюється на CLI</td>\n              </tr>\n              <tr>\n                <td><strong>Windsurf</strong></td>\n                <td>Claude</td>\n                <td>IDE (Electron)</td>\n                <td>Cascade flows, collaborative IDE</td>\n                <td>Нова платформа, менш стабільна</td>\n              </tr>\n            </table>\n          </div><h3 class=\"topic\">Use Case: Обирай інструмент</h3><ul class=\"list\">\n            <li><strong>Claude Code CLI:</strong> локальні commands, Bash scripts, git workflows, CLAUDE.md context</li>\n            <li><strong>Copilot IDE ext.:</strong> quick inline completions, на роботі (GitHub integration)</li>\n            <li><strong>Cursor IDE:</strong> full project context, локальне searching, large refactors</li>\n            <li><strong>Windsurf IDE:</strong> collaborative editing, нові проекти з нуля</li>\n          </ul><div class=\"interview-tips\">\n            <div class=\"interview-tips-title\">🎯 Інтерв'ю-готівність</div>\n            <ul>\n              <li>Розповідай, який інструмент обираєш та <strong>чому</strong> (контекст, workflow, приватність)</li>\n              <li>Демонстрація: \"Я використовую Claude Code для цього проекту, оскільки CLAUDE.md документує нашу архітектуру\"</li>\n              <li>Не говори \"AI пише мій код\" — скажи \"AI як pair programmer, я приймаю рішення\"</li>\n            </ul>\n          </div>"
        }
      ]
    },
    {
      "id": "prompt-engineering",
      "title": "✍️ Prompt Engineering",
      interviewQuestions: [
        {
          "question": "Чому «дай більше контексту» — не завжди правильна порада для покращення відповіді AI-асистента з кодом?",
          "answer": "Надлишковий, нерелевантний контекст (весь файл замість потрібної функції, невідповідні частини кодової бази) розмиває увагу моделі й може погіршити якість відповіді точно так само, як забагато інформації заплутує людину. Ефективний промпт дає <em>релевантний</em> і сфокусований контекст — конкретний файл/функцію, очікуваний результат, обмеження — а не максимальний обсяг."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Якість AI-результату залежить на 80% від якості промпту. Структурований промпт = якісні результати.</p><h3 class=\"topic\">Anatomy of a Perfect Prompt <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n            <div class=\"card\">\n              <h4>1️⃣ Role (Роль)</h4>\n              <p>Визначити контекст AI. <code>You are a Senior Frontend developer</code>, <code>You are a TypeScript expert</code></p>\n            </div>\n            <div class=\"card\">\n              <h4>2️⃣ Context (Контекст)</h4>\n              <p>Передати інформацію про проект. CLAUDE.md, архітектуру, попередній код.</p>\n            </div>\n            <div class=\"card\">\n              <h4>3️⃣ Task (Завдання)</h4>\n              <p>Що саме потрібно зробити. \"Implement X\", \"Fix bug in Y\", \"Refactor Z\".</p>\n            </div>\n            <div class=\"card\">\n              <h4>4️⃣ Format (Формат)</h4>\n              <p>Як повинен виглядати результат. \"Return Markdown\", \"Write TypeScript\", \"Return JSON\".</p>\n            </div>\n            <div class=\"card\">\n              <h4>5️⃣ Constraints (Обмеження)</h4>\n              <p>Що НЕ робити. \"Don't use eval\", \"No breaking changes\", \"Must be accessible\".</p>\n            </div>\n            <div class=\"card\">\n              <h4>6️⃣ Examples (Приклади)</h4>\n              <p>Few-shot learning. Дай 1-2 приклада очікуваного результату.</p>\n            </div>\n          </div><h3 class=\"topic\">Приклад: Добрий промпт</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// GOOD: Full context + constraints + format\nYou are a Senior Frontend developer working on a React 18 e-commerce app.\nWe use TypeScript, Zustand for state, and TailwindCSS.\n\nContext: We have a ProductCard component that shows items.\nUsers report that the \"Add to Cart\" button causes layout shift.\n\nTask: Fix the layout shift without changing the component API.\n\nConstraints:\n- Don't add external dependencies\n- Must support RTL languages\n- Button must be accessible (aria-labels)\n- No CSS-in-JS (use Tailwind only)\n\nFormat: Return the fixed component as TypeScript JSX.\n\nExample: The button should load state without skeleton, just change text + disable."
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Anti-Patterns (Чого уникати)</h3><ul class=\"list\">\n            <li><strong>Vague:</strong> \"Make this better\" → <strong>Specific:</strong> \"Reduce bundle size by lazy-loading routes\"</li>\n            <li><strong>No context:</strong> \"Write a function\" → <strong>With context:</strong> \"Write a React hook for infinite scroll\"</li>\n            <li><strong>No constraints:</strong> → Tell AI what NOT to do (no deps, must be secure, etc.)</li>\n            <li><strong>Over-constraining:</strong> \"Do X, but not Y, but also not Z\" → Keep it simple, prioritize constraints</li>\n          </ul><h3 class=\"topic\">Chain-of-Thought Prompting</h3><p>Для складних завдань: попроси AI думати поетапно.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "Let's think step-by-step:\n1. What are the current issues?\n2. What's the root cause?\n3. What are 3 possible solutions?\n4. Which solution is best? Why?\n5. Implement the solution with code."
        }
      ]
    },
    {
      "id": "claude-code-basics",
      "title": "🤖 Claude Code — Basics",
      interviewQuestions: [
        {
          "question": "Чим CLI-агент на кшталт Claude Code відрізняється від чат-інтерфейсу для роботи з кодом за реальним доступом до проєкту?",
          "answer": "CLI-агент має пряму дію на файлову систему й термінал поточного проєкту — може читати, редагувати файли, виконувати команди й бачити реальний результат (вивід тестів, помилки компіляції), а не працює лише з текстом, вставленим користувачем у чат. Це дозволяє агенту самостійно перевіряти власну роботу (запустити тести після зміни), чого чат-інтерфейс без інтеграції зробити не може."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>Claude Code</strong> — official Anthropic CLI + Web + IDE extension для локальної та хмарної AI-допомоги.</p><h3 class=\"topic\">Встановлення & Setup <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# macOS\nbrew install anthropics/claude-code/claude-code\n\n# Або скачати з https://claude.ai/code\nclaude --version"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Основні команди</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Команда</th><th>Назва</th><th>Використання</th></tr>\n              <tr><td><code>/help</code></td><td>Допомога</td><td>Показує доступні слеш-команди</td></tr>\n              <tr><td><code>/plan</code></td><td>Plan Mode</td><td>Розпочати структурований план перед реалізацією</td></tr>\n              <tr><td><code>/review</code></td><td>Code Review</td><td>Ревʼю коду з різними рівнями (low/medium/high/ultra)</td></tr>\n              <tr><td><code>/run</code></td><td>Run</td><td>Запустити app (автоматично оцінює project type)</td></tr>\n              <tr><td><code>/fix</code></td><td>Quick Fix</td><td>Швидкий фікс + застосування (без review)</td></tr>\n              <tr><td><code>/explain</code></td><td>Explain</td><td>Пояснити обраний код</td></tr>\n              <tr><td><code>/schedule</code></td><td>Schedule</td><td>Запланувати cloud agent на cron schedule</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Modes</h3><ul class=\"list\">\n            <li><strong>Auto Mode (default):</strong> Claude автоматично виконує команди, пише код, запускає тести</li>\n            <li><strong>Plan Mode (<code>/plan</code>):</strong> Спочатку робить план, чекає затвердження, потім реалізує</li>\n            <li><strong>Interactive:</strong> Передача між режимами при необхідності</li>\n          </ul><h3 class=\"topic\">Permission Model</h3><div class=\"grid2\">\n            <div class=\"card\">\n              <h4>Readonly</h4>\n              <p>Читання файлів, grep, Bash queries. Затвердження не потрібне.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Write</h4>\n              <p>Редагування, нові файли. Потребує permission prompt.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Execute</h4>\n              <p>Запуск команд (npm, python, git push). Затвердження потрібне.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Safe Operations</h4>\n              <p>Деякі операції (mv, rm) завжди потребують подтвердження.</p>\n            </div>\n          </div><h3 class=\"topic\">Keybindings</h3><ul class=\"list\">\n            <li><strong>Cmd+Enter (Mac) / Ctrl+Enter (Win):</strong> Submit prompt</li>\n            <li><strong>Escape:</strong> Stop Claude execution</li>\n            <li><strong>Cmd+K (Web):</strong> Open command palette</li>\n            <li><strong>Customize:</strong> <code>~/.claude/keybindings.json</code></li>\n          </ul>"
        }
      ]
    },
    {
      "id": "agent-skills-maturity-levels",
      "title": "🎓 Agent Skills — 7 рівнів зрілості",
      interviewQuestions: [
        {
          "question": "Чому «недетермінованість агента» — головна причина писати evals, а не просто довіряти одному вдалому прогону?",
          "answer": "Той самий промт двічі поспіль може дати два різні результати, тому один вдалий прогін нічого не доводить — це може бути випадковість, а не властивість скіла. <strong>Evals</strong> ганяють кожен кейс 3-5 разів і дивляться на стабільність результату, а не на факт одного проходження; тільки так можна відрізнити систематично працюючий скіл від скіла, що просто «повезло» один раз."
        },
        {
          "question": "Навіщо workflow типу Bug Hunter вимагає мінімум дві гіпотези причини бага, а не одну?",
          "answer": "З однією гіпотезою агент схильний підганяти докази під готову відповідь (confirmation bias) — знайти щось, що «типу підтверджує», і зупинитись, навіть якщо справжня причина інша. Дві незалежні гіпотези змушують явно порівняти докази за і проти кожної, перш ніж відкидати одну з них, що знижує ризик закрити баг «не тим» фіксом."
        },
        {
          "question": "Чому LLM-суддя в evals має бути окремим субагентом, а не тим самим агентом, що виконував задачу?",
          "answer": "Якщо агент, який написав звіт чи фікс, сам оцінює власний результат за рубрикою, він майже завжди <strong>поставить собі залік</strong> — немає незалежної точки зору, а модель схильна виправдовувати власні рішення заднім числом. Суддя, запущений як окремий субагент з власним контекстним вікном, бачить лише вихід і критерії оцінки, без контексту «чому я так зробив», і тому оцінює результат, а не намір."
        },
        {
          "question": "Чим опис (description) скіла принципово відрізняється від решти тіла інструкції з погляду того, що бачить модель до виклику — і чому занадто широкий опис так само шкідливий, як занадто вузький?",
          "answer": "До виклику скіла модель тримає в контексті лише каталог імен і описів (Progressive Disclosure) — саме <code>description</code> вирішує, чи скіл взагалі підвантажиться; решта тіла інструкції в цей момент моделі просто не видно. Занадто вузький опис не спрацьовує там, де мав би (скіл «мовчить» у половині релевантних випадків), а занадто широкий вмикає повний, дорогий workflow навіть на прості запити, для яких вистачило б короткої відповіді (overtriggering) — обидві крайності однаково ламають маршрутизацію."
        }
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>Agent Skill</strong> — папка з файлом <code>SKILL.md</code>: шапка (name + description) і тіло-інструкція, яку підвантажує агент, коли задача підходить під опис. Технічно все просто, але <strong>Skills Bench</strong> і дослідження одного інженера Google DeepMind показали цифри, які варто знати перед тим, як писати ще один скіл.</p><h3 class=\"topic\">Чому це важливо <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\"><div class=\"card\"><h4>📊 47 000+ скілів</h4><p>Стільки лежить у відкритих репозиторіях. Тестів немає майже в жодного — переважну більшість написала сама модель, без верифікації людиною.</p></div><div class=\"card\"><h4>📉 Гірше, ніж без скіла</h4><p>Skills Bench: скіли, які модель згенерувала собі сама, <strong>погіршували</strong> результат агента порівняно з відсутністю скіла взагалі.</p></div><div class=\"card\"><h4>📈 34% → 50%</h4><p>Скіли, написані вручну людьми, підняли success rate на тих самих задачах з 34% до 50%.</p></div><div class=\"card\"><h4>🎲 Недетермінованість</h4><p>Один і той самий промт двічі поспіль може дати різні відповіді. Без evals неможливо відрізнити «скіл кривий» від «задача важка для моделі».</p></div></div><p>Наслідок: коли скіл спрацював погано, рефлекс — дописати ще абзац («дій уважно», «не роби помилок»). Текст росте, поведінка не змінюється, бо прикметники не відповідають на питання <em>що робити наступним кроком</em>. Нижче — сім рівнів зрілості скіла, кожен закриває конкретну діру попереднього.</p><h3 class=\"topic\">7 рівнів одним поглядом</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Рівень</th><th>Назва</th><th>Що додається</th></tr>\n              <tr><td>1</td><td>Instruction file</td><td>Один <code>SKILL.md</code>: шапка + вільний текст</td></tr>\n              <tr><td>2</td><td>Fixed workflow</td><td>Зафіксований процес + крок верифікації (failing test до фікса)</td></tr>\n              <tr><td>3</td><td>Description-роутер</td><td>Опис вмикає скіл сам, без ручного виклику (Progressive Disclosure)</td></tr>\n              <tr><td>4</td><td>Розбиття на файли</td><td>Довідки й скрипти підвантажуються за умовою, не завжди</td></tr>\n              <tr><td>5</td><td>Права й середовище</td><td>Дозволені інструменти, модель, режим запуску, субагент</td></tr>\n              <tr><td>6</td><td>Evals</td><td>Ізольовані тесткейси, 3-5 прогонів, LLM-суддя окремим субагентом</td></tr>\n              <tr><td>7</td><td>Пакет / плагін</td><td>Версія, авто-оновлення, evals на кожну зміну, Marketplace</td></tr>\n            </table>\n          </div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Рівень 1 — Instruction file</h3><p>Папка скіла з одним файлом <code>SKILL.md</code>: шапка з іменем і описом, під нею — вільний текст інструкції. Технічно вже робочий скіл — агент читає файл і виконує. Але три запуски можуть дати три різні результати.</p><ul class=\"list\">\n            <li>Інструменти ніде не перелічені — flow може бути яким завгодно</li>\n            <li>Незрозуміло, що є результатом: висновок у чат, зміна коду, чи PR</li>\n            <li>Більшість скілів не лише починаються на цьому рівні — вони тут <strong>залишаються назавжди</strong></li>\n          </ul><div class=\"alert warn\">\n            ⚠️ <strong>Anti-pattern:</strong> коли агент помиляється, рефлекс — дописати прикметник: «розберися уважно», «дій як сеньйор», «не роби помилок». Текст зростає, поведінка залишається тою самою — прикметники не відповідають на питання «що робити наступним кроком».\n          </div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Рівень 2 — Fixed workflow <span class=\"tag tag-key\">KEY</span></h3><p>Замість прикметників у тіло скіла записується цілий процес — агент втрачає право вирішувати сам. Приклад — «Bug Hunter»: мета — знайти найімовірнішу причину і підтвердити її доказами.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "name: bug-hunter\ndescription: Investigate production bugs and confirm root cause before touching code\n\nWorkflow:\n1. Розділи факти від припущень (лог, стектрейс, репро-кроки — окремо від здогадок)\n2. Сформулюй щонайменше 2 гіпотези причини\n3. Перевір кожну, запиши результат перевірки\n4. Спростовані гіпотези відкинь; якщо всі спростовані — повернись до кроку 2\n5. Мінімальний фікс лише під підтверджену причину\n\nHard rule: немає підтвердженої причини → немає фікса."
        },
        {
          "kind": "paragraph",
          "html": "<p>Дві гіпотези — не випадково: з однією агент підганяє докази під готову відповідь. <strong>Крок верифікації</strong> обов'язковий для будь-якої задачі, не лише коду: мінімальний failing test пишеться <em>до</em> фікса, спершу падає на живому прогоні, і тільки зелений стан після фікса підтверджує, що причину справді полагодили.</p><div class=\"alert info\">\n            💡 Правила в файлі не гарантують виконання — агент може пропустити перевірку або написати «тести пройшли», не запустивши їх. Це закриває тільки Рівень 6 (Evals).\n          </div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Рівень 3 — Description як роутер <span class=\"tag tag-key\">KEY</span></h3><p>До виклику модель не тримає весь <code>SKILL.md</code> у контексті — вона бачить лише каталог: імена й описи скілів (<strong>Progressive Disclosure</strong>). Якщо опис релевантний запиту — вантажиться повна інструкція, якщо ні — файл лишається незавантаженим, а контекст чистим.</p><div class=\"grid3\">\n            <div class=\"card\"><h4>1. Коли вмикатись</h4><p>На які задачі скіл реагує</p></div>\n            <div class=\"card\"><h4>2. Сигнали</h4><p>Конкретні юзкейси / формулювання запиту</p></div>\n            <div class=\"card\"><h4>3. Куди не лізти</h4><p>Явна межа — де скіл не має спрацьовувати</p></div>\n          </div><p>Дослідження: половина всіх фейлів — це непоганий скіл, який просто <strong>не увімкнувся</strong>, коли був потрібен (запит недостатньо детальний або опис нерелевантний). Зворотна сторона — <strong>overtriggering</strong>: занадто широкий опис («для роботи з багами») вмикає повне розслідування навіть на просте «глянь лог», хоча вистачило б короткої відповіді.</p>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Рівень 4 — Розбиття на файли</h3><p>Тіло, що розпухло від workflow, стратегій дебагу й конвенцій логів, агент читає щоразу цілком, навіть коли конкретна задача цього не потребує — а контекст не безкоштовний. Рішення — другий шар Progressive Disclosure: опис агент бачить завжди, тіло вантажить після спрацювання, а окремі файли відкриває лише тоді, коли доходить до умови в тілі.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "skill/\n├── SKILL.md              # опис + workflow з умовами\n├── references/\n│   ├── debug-strategy.md   # \"перед гіпотезами — прочитай це\"\n│   ├── log-conventions.md  # \"якщо проблема з network — прочитай це\"\n│   └── architecture.md     # \"якщо баг перетинає кілька сервісів — прочитай це\"\n└── scripts/\n    └── check-logs.sh       # детермінована рутина — в контекст іде лише результат"
        },
        {
          "kind": "paragraph",
          "html": "<p>Без умови в тілі агент не знає, коли файл відкривати: або тягне все щоразу, або ігнорує довідку зовсім. Скрипти виносять усю детерміновану роботу — вони виконуються щоразу однаково і не їдять токенів, бо в контекст потрапляє лише результат.</p><div class=\"alert info\">\n            💡 Не розкладай завчасно: якщо скіл і так читається за хвилину, розбиття на п'ять файлів і папок — передчасна оптимізація.\n          </div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Рівень 5 — Права й середовище <span class=\"tag tag-key\">KEY</span></h3><p>«Не чіпай код під час аналізу» в тілі скіла — це побажання, не заборона. Справжнє обмеження ставить середовище: дозволяй рівно стільки прав, скільки треба на конкретну операцію.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# frontmatter скіла\nallowed-tools: [Read, Grep, Bash(git log:*)]   # без Write/Edit під час аналізу\nmodel: claude-sonnet     # дешевша модель на рутинні перевірки\nreasoning-effort: high   # глибина міркування для складного аналізу\ntrigger: manual          # лише /skill-name, ніколи автоматично (напр. deploy)"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\"><div class=\"card\"><h4>Субагент</h4><p>Скіл може викликати окремого агента з власним контекстним вікном і правами — той копається в коді, витрачає контекст, а в основну розмову повертає лише висновок.</p></div><div class=\"card\"><h4>Два типи скілів</h4><p><strong>Тимчасові</strong> — вчать новому API/SDK, застарівають, коли модель підтягує свіжі дані. <strong>Домовленість команди</strong> — задають конвенцію (формат звіту, куди писати); живуть, доки живе сама домовленість.</p></div></div>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Рівень 6 — Evals <span class=\"tag tag-key\">KEY</span></h3><p>Досі перевірка скіла була «на око»: запустили, начебто влаштувало. З цього рівня скіл міряють цифрами. Eval — один файл кейсів + один скрипт-раннер, без фреймворку.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// кейс\n{\n  prompt: \"глянь чому падає checkout на проді\",   // як написала б жива людина\n  shouldTrigger: true,                             // чи мав скіл увімкнутись\n  checks: [\"git diff порожній до підтвердження причини\", \"звіт містить ≥2 гіпотези\"]\n}\n\n// runner (псевдокод)\nfor (const testCase of cases) {\n  for (let run = 0; run < 5; run++) {              // 3-5 прогонів — модель недетермінована\n    const dir = cloneCleanRepo();                  // ізольований каталог, без слідів попереднього чату\n    const result = await agent(testCase.prompt, { cwd: dir });\n    verdict(deterministicChecks(result), judge(result, testCase)); // судить ОКРЕМИЙ субагент\n  }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<p>Судити результат може або детермінована перевірка (git diff, grep ключових слів), або LLM-суддя з рубрикою балів — обов'язково <strong>окремий субагент</strong>: той самий агент, що виконував задачу, судячи себе, майже завжди поставить залік. Поріг (напр. 7/10) визначає, чи кейс зарахований.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Набір кейсів</th><th>Кількість</th><th>Навіщо</th></tr>\n              <tr><td>Happy path</td><td>10-25</td><td>Скіл точно має спрацювати на цьому промті</td></tr>\n              <tr><td>Negative</td><td>~5</td><td>Скіл НЕ має спрацювати — перевірка на overtriggering</td></tr>\n              <tr><td>Реальні промти</td><td>перші в черзі</td><td>Нічого не заміняє живі дані з роботи</td></tr>\n            </table>\n          </div><p>Кожен кейс — ізольований чистий каталог (агент інакше підгляне готову відповідь у попередньому чаті й тест пройде, не давши жодної інформації) і 3-5 прогонів (один прогін нічого не доводить). Коли кейсів стає багато — <strong>Promptfoo</strong>, <strong>Inspect AI</strong> (UK AI Security Institute, складні агентні сценарії), <strong>DeepEval</strong> (юніт-тести на Python) або <strong>Braintrust</strong> (дешборди для команди). Але старт — файл і скрипт.</p>"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Рівень 7 — Пакет / плагін</h3><p>Папка, передана колезі в слак, живе своїм життям: стара версія, щось зламалось — незрозуміло де. Плагін — контейнер, що пакує скіл, скрипти, evals і довідку з версією й авто-оновленням; колега ставить його однією командою й отримує ту саму версію.</p><ul class=\"list\">\n            <li>Evals лежать поруч зі скілом і ганяються на <strong>кожну</strong> зміну — одне змінене речення в промті може непомітно зламати кейс, у diff цього не видно</li>\n            <li>Розповсюдження — Marketplace: git-репозиторій, оформлений за спецправилами, з <code>manifest.json</code></li>\n          </ul><div class=\"interview-tips\">\n            <div class=\"interview-tips-title\">🎯 Практика прямо зараз</div>\n            <ul>\n              <li>Відкрий скіл, яким користуєшся найчастіше — на якому він рівні?</li>\n              <li>Якщо на 1-2 — нормально, там зараз більшість індустрії</li>\n              <li>5 тестових промтів (happy + negative) можна написати за один вечір, без нового інструментарію</li>\n            </ul>\n          </div>"
        }
      ]
    },
    {
      "id": "context-claudemd",
      "title": "📄 Context & CLAUDE.md",
      interviewQuestions: [
        {
          "question": "Навіщо потрібен файл на кшталт CLAUDE.md у корені репозиторію, якщо AI-асистент і так може прочитати код проєкту?",
          "answer": "Код показує <em>що</em> є в проєкті, але не завжди <em>чому</em> (нетривіальні конвенції, причини архітектурних рішень, які команди запускати для тестів/білду) — CLAUDE.md дає стисле, явне пояснення цих неявних правил одразу, без потреби, щоб агент вгадував їх методом спроб і помилок або перечитував весь код щоразу заново."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>AI працює краще, коли має повний контекст. CLAUDE.md — твій договір з AI.</p><h3 class=\"topic\">Що таке CLAUDE.md <span class=\"tag tag-key\">KEY</span></h3><p>Файл у корені проєкту, який документує для Claude:</p><ul class=\"list\">\n            <li><strong>Project Overview:</strong> Що це проект, його мета</li>\n            <li><strong>Architecture:</strong> Як організована кодова база</li>\n            <li><strong>Development Tasks:</strong> Як виконувати типові операції</li>\n            <li><strong>Key Files:</strong> Де знаходяться найважливіші файли</li>\n            <li><strong>Conventions:</strong> Code style, naming, patterns</li>\n          </ul><h3 class=\"topic\">Мінімальна структура CLAUDE.md</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# CLAUDE.md — Project Guide\n\n## Project Overview\nNext.js 14 e-commerce with TypeScript + Tailwind + Zustand.\n\n## Architecture\n```\nsrc/\n├── app/           # Next.js 14 app router\n├── components/    # Reusable React components\n├── lib/           # Utils, hooks, services\n├── styles/        # Global CSS\n```\n\n## Development Tasks\n\n### Add a new page\n1. Create `app/pages/[name]/page.tsx`\n2. Export default React component\n3. Add route to navigation\n\n## Key Conventions\n- Files: kebab-case (good-component.tsx)\n- Imports: absolute paths from src/\n- No prop drilling; use Zustand for state"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Memory System</h3><p>Claude Code зберігає контекст про проект у <code>~/.claude/projects/[project-id]/memory/</code>:</p><ul class=\"list\">\n            <li><strong>user_role.md:</strong> Хто ти (Senior Dev, Junior, тощо)</li>\n            <li><strong>feedback_testing.md:</strong> Як ти обираєш тести</li>\n            <li><strong>project_status.md:</strong> Поточні ініціативи, deadlines</li>\n            <li><strong>reference_github.md:</strong> Де знаходяться resources (Linear, Figma, тощо)</li>\n          </ul><div class=\"alert info\">\n            💡 Напиши `/remember` щоб Claude зберіг факт для майбутніх бесід цим проектом.\n          </div><h3 class=\"topic\">.claude/settings.json</h3><p>Project-level конфіг для Claude Code:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// .claude/settings.json\n{\n  \"model\": \"claude-opus-4-8\",\n  \"defaultPermissionMode\": \"ask\",\n  \"hooks\": {\n    \"pre-tool-use\": [\n      { \"tool\": \"Bash\", \"command\": \"npm run lint\" }\n    ]\n  },\n  \"mcpServers\": {\n    \"github\": { \"command\": \"npx @modelcontextprotocol/server-github\" }\n  }\n}"
        }
      ]
    },
    {
      "id": "plan-mode-task-decomposition",
      "title": "🗂️ Plan Mode & Task Decomposition",
      interviewQuestions: [
        {
          "question": "Чому для складних задач корисно розділяти «режим планування» й «режим виконання» при роботі з AI-агентом?",
          "answer": "Розділення дозволяє людині перевірити й скоригувати підхід агента <em>до</em> того, як він почне вносити реальні зміни в код — виправити помилковий план значно дешевше, ніж відкотити вже застосовані, потенційно неправильні редагування кількох файлів. Це той самий принцип, що й код-рев'ю дизайну перед імплементацією у звичайній інженерній практиці."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Для складних завдань: план краще за імпровізацію. План — договір між tobою і Claude.</p><h3 class=\"topic\">Workflow <span class=\"tag tag-key\">KEY</span></h3><ol style=\"color: #94a3b8; padding-left: 20px;\">\n            <li><code>/plan</code> → Claude пропонує план</li>\n            <li>Ти переглядаєш план, задаєш питання</li>\n            <li>Claude показує final plan</li>\n            <li>Ти твердишь OK → Claude реалізує</li>\n            <li>Claude автоматично перевіряє результати</li>\n          </ol><h3 class=\"topic\">Фази планування</h3><div class=\"grid3\">\n            <div class=\"card\">\n              <h4>Phase 1: Exploration</h4>\n              <p>Claude читає коди, шукає існуючі паттерни, розуміє контекст.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Phase 2: Design</h4>\n              <p>Пропонує архітектуру, альтернативи, торгівлю.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Phase 3: Implementation</h4>\n              <p>Пише код, запускає тести, перевіряє результати.</p>\n            </div>\n          </div><h3 class=\"topic\">TodoWrite для трекінгу</h3><p>Розбити завдання на підзадачі:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "- [ ] Read current architecture\n- [ ] Design new component structure\n- [ ] Implement Component A\n- [ ] Implement Component B\n- [ ] Add tests\n- [ ] Code review"
        },
        {
          "kind": "paragraph",
          "html": "<p>Claude автоматично чекає завдання у міру прогресу.</p><h3 class=\"topic\">Коли використовувати Plan Mode</h3><ul class=\"list\">\n            <li>Великі рефактори (розбити > 3 файлів)</li>\n            <li>Нові features з невизначеною архітектурою</li>\n            <li>Performance optimizations (потребує аналізу)</li>\n            <li>Security hardening (потребує review процесу)</li>\n          </ul><p><strong>Не потрібен план для:</strong> простих багфіксів, нових функцій в ізольованих файлах, документації.</p>"
        }
      ]
    },
    {
      "id": "multi-agent-workflows",
      "title": "🕸️ Multi-Agent & Workflows",
      interviewQuestions: [
        {
          "question": "Коли має сенс делегувати частину задачі окремому суб-агенту замість того, щоб один агент робив усе послідовно?",
          "answer": "Делегування виправдане для незалежних, паралелізовних підзадач (наприклад, дослідження кількох різних частин кодової бази одночасно) або коли підзадача потребує великого обсягу проміжної роботи (читання багатьох файлів), результат якої можна стиснути в короткий звіт — це береже основний контекст головного агента від переповнення нерелевантними деталями."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Для паралельної роботи: розподіли завдання між агентами. Workflows — детерміністична оркестрація.</p><h3 class=\"topic\">Agent Tool <span class=\"tag tag-key\">KEY</span></h3><p>Spawn subagent для одного завдання:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// Запустити одного агента\nawait agent(\"Find all React hooks usage in project\", {\n  agentType: \"Explore\",\n  label: \"Scan React hooks\"\n});\n\n// Запустити 3 агента паралельно\nconst [findings1, findings2, findings3] = await Promise.all([\n  agent(\"Task 1\"),\n  agent(\"Task 2\"),\n  agent(\"Task 3\")\n]);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Типи агентів</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Тип</th><th>Коли використовувати</th><th>Інструменти</th></tr>\n              <tr><td>claude</td><td>Default для будь-якого завдання</td><td>All</td></tr>\n              <tr><td>Explore</td><td>Пошук файлів, grep, дослідження</td><td>Readonly only</td></tr>\n              <tr><td>code-reviewer</td><td>Independent code review</td><td>All</td></tr>\n              <tr><td>Plan</td><td>Архітектурне планування</td><td>Readonly mostly</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Workflow Tool — Детерміністична оркестрація</h3><p>Для складної multi-step роботи з циклами, умовами, паралельними потоками:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "export const meta = {\n  name: 'audit-performance',\n  description: 'Find N slowest functions, verify with profiler',\n  phases: [\n    { title: 'Scan', detail: 'grep for performance issues' },\n    { title: 'Verify', detail: 'run profiler' },\n  ]\n};\n\nphase('Scan');\nconst findings = await agent('Find slowest functions', {schema: FINDINGS});\n\nphase('Verify');\nconst verified = await pipeline(\n  findings.items,\n  (item) => agent(`Verify ${item.fn}`, {schema: VERDICT})\n);\n\nreturn verified.filter(v => v.isReal);"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">pipeline() vs parallel()</h3><ul class=\"list\">\n            <li><strong>pipeline():</strong> Послідовні етапи, кожен item проходить усі етапи (no barrier). Підходить для multi-stage processing.</li>\n            <li><strong>parallel():</strong> Запустити все разом, чекати на всі. Бар'єр між паралельними завданнями.</li>\n          </ul>"
        }
      ]
    },
    {
      "id": "mcp-servers",
      "title": "🔌 MCP Servers",
      interviewQuestions: [
        {
          "question": "Яку проблему вирішує Model Context Protocol (MCP), і чому це краще за те, щоб кожен AI-інструмент мав власну, несумісну інтеграцію із зовнішніми сервісами?",
          "answer": "MCP визначає єдиний, відкритий протокол для підключення AI-асистента до зовнішніх джерел даних та інструментів (бази даних, API, файлові системи) — сервіс, що реалізує MCP-сервер один раз, стає доступним будь-якому MCP-сумісному клієнту, замість того щоб кожен вендор AI-інструменту писав власну proprietary-інтеграцію під кожен зовнішній сервіс окремо."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>MCP (Model Context Protocol)</strong> — стандарт для підключення зовнішніх сервісів до Claude.</p><h3 class=\"topic\">Вбудовані MCP Сервери <span class=\"tag tag-key\">KEY</span></h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>MCP</th><th>Функціональність</th><th>Налаштування</th></tr>\n              <tr>\n                <td><strong>Gmail</strong></td>\n                <td>Читання, пошук, надсилання emailів</td>\n                <td><code>mcp__claude_ai_Gmail__authenticate</code></td>\n              </tr>\n              <tr>\n                <td><strong>Google Calendar</strong></td>\n                <td>Читання, створення, видалення подій</td>\n                <td>Синхронізація з Google Account</td>\n              </tr>\n              <tr>\n                <td><strong>Google Drive</strong></td>\n                <td>Доступ до файлів, Sheets, Docs</td>\n                <td>OAuth integration</td>\n              </tr>\n              <tr>\n                <td><strong>Notion</strong></td>\n                <td>Читання, створення, оновлення сторінок</td>\n                <td>Notion API token</td>\n              </tr>\n            </table>\n          </div><h3 class=\"topic\">Налаштування MCP в .claude/settings.json</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// .claude/settings.json\n{\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx @modelcontextprotocol/server-github\",\n      \"args\": [],\n      \"env\": {\n        \"GITHUB_TOKEN\": \"ghp_...\"\n      }\n    },\n    \"notion\": {\n      \"command\": \"npx @modelcontextprotocol/server-notion\",\n      \"env\": {\n        \"NOTION_API_KEY\": \"secret_...\"\n      }\n    }\n  }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Популярні MCP для розробників</h3><ul class=\"list\">\n            <li><strong>GitHub:</strong> Читання issues, PRs, commits, branch management</li>\n            <li><strong>Linear (або Jira):</strong> Синхронізація з tracking</li>\n            <li><strong>Slack:</strong> Отправка сообщений, читання історії</li>\n            <li><strong>Puppeteer:</strong> Browser automation (E2E тестування)</li>\n            <li><strong>Figma:</strong> Доступ до design files (дерівня кольорів, типографіки)</li>\n          </ul>"
        }
      ]
    },
    {
      "id": "hooks-automation",
      "title": "🪝 Hooks & Automation",
      interviewQuestions: [
        {
          "question": "Чим hooks в AI-асистенті (виконання команди на певну подію) концептуально схожі на git hooks чи CI-пайплайни?",
          "answer": "Усі три — механізм <em>автоматичного, детермінованого</em> запуску коду у відповідь на подію в робочому процесі, без потреби покладатись на те, що людина (чи модель) щоразу згадає виконати цю дію вручну. Це переносить відповідальність за повторювані перевірки/дії з пам'яті/дисципліни розробника на інфраструктуру, що не забуває й не пропускає кроки."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Hooks — скрипти, що виконуються автоматично при певних подіях. Автоматизуй повторювані задачі.</p><h3 class=\"topic\">Типи Hooks <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid3\">\n            <div class=\"card\">\n              <h4>pre-tool-use</h4>\n              <p>Перед виконанням команди (перед Bash, Edit, Write)</p>\n            </div>\n            <div class=\"card\">\n              <h4>post-tool-use</h4>\n              <p>Після виконання команди</p>\n            </div>\n            <div class=\"card\">\n              <h4>notification</h4>\n              <p>Кога Claude завершив роботу / вичерпав контекст</p>\n            </div>\n          </div><h3 class=\"topic\">Приклади Hooks</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// .claude/settings.json\n{\n  \"hooks\": {\n    \"pre-tool-use\": [\n      {\n        \"tool\": \"Bash\",\n        \"command\": \"npm run lint\",\n        \"description\": \"Run linter before every Bash command\"\n      },\n      {\n        \"tool\": \"Edit\",\n        \"command\": \"git add -A && git commit -m 'auto: before edit'\",\n        \"description\": \"Auto-commit before file edits\"\n      }\n    ],\n    \"post-tool-use\": [\n      {\n        \"tool\": \"Bash\",\n        \"command\": \"npm run format && npm run test\",\n        \"description\": \"Format and test after Bash\"\n      }\n    ]\n  }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Notification Hooks (Slack, Discord)</h3><p>Отправляй повідомлення коли Claude кінчив работу:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "\"notification\": {\n  \"webhookUrl\": \"https://hooks.slack.com/services/...\",\n  \"message\": \"Claude finished. Check ~/output.txt\"\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Best Practices</h3><ul class=\"list\">\n            <li><strong>Keep hooks light:</strong> Не запускай довги процеси (тестування можна, але не 10 хвилин)</li>\n            <li><strong>Idempotent:</strong> Хук можна запустити кілька разів без побічних ефектів</li>\n            <li><strong>Fast feedback:</strong> Хук должен завершитися за < 5 секунд</li>\n            <li><strong>Log results:</strong> Зберігай output хуків для debug</li>\n          </ul>"
        }
      ]
    },
    {
      "id": "loops-recurring-tasks",
      "title": "🔁 Loops — Повторювані завдання",
      interviewQuestions: [
        {
          "question": "Чим повторюваний AI-агентний процес (наприклад, періодична перевірка стану CI) відрізняється від класичного cron-завдання?",
          "answer": "Cron-завдання виконує завжди той самий фіксований скрипт. Повторюваний агентний процес на кожній ітерації може <em>розуміти контекст</em> поточного стану (що змінилось з минулого разу, чи є нові помилки) і адаптувати свої наступні дії відповідно, а не сліпо повторювати той самий детермінований код незалежно від ситуації."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><code>/loop</code> запускає промпт або слеш-команду <strong>повторювано на інтервалі</strong> прямо в поточній сесії. Ідеально для <em>polling</em>: моніторинг деплою, стеження за CI, PR-babysitting, періодичні статус-чеки — все, що треба «перевіряти раз за разом», поки не зміниться стан.</p><h3 class=\"topic\">Два режими <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n            <div class=\"card\">\n              <h4>⏱️ Фіксований інтервал</h4>\n              <p><code>/loop 5m /foo</code> — виконує команду кожні N часу. Одиниці: <code>s</code> (секунди), <code>m</code> (хвилини), <code>h</code> (години).</p>\n            </div>\n            <div class=\"card\">\n              <h4>🧠 Dynamic (self-paced)</h4>\n              <p><code>/loop /foo</code> без інтервалу — модель <strong>сама обирає темп</strong> і вирішує, коли прокинутись для наступної ітерації.</p>\n            </div>\n          </div><h3 class=\"topic\">Синтаксис</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Фіксований інтервал: слеш-команда кожні 5 хв\n/loop 5m /babysit-prs\n\n# Промпт кожні 30 секунд\n/loop 30s перевір статус деплою, скажи коли білд зелений\n\n# Dynamic mode (без інтервалу) — модель сама обирає темп\n/loop /code-review"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Коли використовувати</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Сценарій</th><th>Приклад</th></tr>\n              <tr><td>Моніторинг деплою</td><td><code>/loop 1m перевір деплой, пінгуй коли live</code></td></tr>\n              <tr><td>Polling CI</td><td><code>/loop 2m перевір статус GitHub Actions</code></td></tr>\n              <tr><td>Стеження за PR</td><td><code>/loop 10m /babysit-prs</code></td></tr>\n              <tr><td>Періодичні статус-чеки</td><td><code>/loop 5m онови summary відкритих задач</code></td></tr>\n              <tr><td>Чекання на зовнішню подію</td><td><code>/loop дочекайся поки черга спорожніє</code></td></tr>\n            </table>\n          </div><h3 class=\"topic\">Як зупинити</h3><ul class=\"list\">\n            <li><strong>Escape</strong> — перервати активну ітерацію</li>\n            <li>Сказати <strong>«stop the loop»</strong> — завершити цикл повністю</li>\n            <li>Луп живе лише <strong>поки сесія відкрита</strong> — закриєш термінал, і він зупиниться</li>\n          </ul>"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert info\">\n            💡 <strong>Loop vs Schedule:</strong> <code>/loop</code> — локальний, працює в поточній сесії, поки термінал відкрито. <code>/schedule</code> — це cloud cron-agent, що виконується у хмарі <strong>без тебе</strong>. Обирай <code>/loop</code> для інтерактивного polling тут-і-зараз, а <code>/schedule</code> — для фонових повторюваних задач за розкладом.\n          </div>"
        }
      ]
    },
    {
      "id": "code-review-with-ai",
      "title": "🔍 Code Review with AI",
      interviewQuestions: [
        {
          "question": "У чому реальна цінність AI-рев'ю коду для сеньйора, якщо він і сам здатний знайти більшість проблем?",
          "answer": "AI-рев'ю не заміняє експертизу сеньйора щодо архітектурних і бізнес-рішень, але ефективне як перший, швидкий прохід — ловить механічні проблеми (невикористані змінні, очевидні edge cases, невідповідність конвенціям) до того, як людина витратить час на код-рев'ю, звільняючи увагу рев'юера-людини для справді складних, контекстозалежних питань."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><code>/code-review</code> — структурований ревʼю коду з різними рівнями глибини.</p><h3 class=\"topic\">Рівні Review <span class=\"tag tag-key\">KEY</span></h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Рівень</th><th>Глибина</th><th>Час</th><th>Використання</th></tr>\n              <tr>\n                <td><strong>low</strong></td>\n                <td>Критичні bugs, security issues</td>\n                <td>30 sec</td>\n                <td>Quick check перед merge</td>\n              </tr>\n              <tr>\n                <td><strong>medium</strong></td>\n                <td>Bugs + style + performance</td>\n                <td>2 min</td>\n                <td>Default для PR review</td>\n              </tr>\n              <tr>\n                <td><strong>high</strong></td>\n                <td>Все + design patterns + архітектура</td>\n                <td>5 min</td>\n                <td>Senior code review</td>\n              </tr>\n              <tr>\n                <td><strong>ultra</strong></td>\n                <td>Cloud multi-agent review (на claude.ai)</td>\n                <td>10+ min</td>\n                <td>Critical features, перед release</td>\n              </tr>\n            </table>\n          </div><h3 class=\"topic\">Використання</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// Code review з рівнем\n/code-review low     # Quick check\n/code-review         # Default (medium)\n/code-review high    # Deep review\n\n// Modes\n/code-review --comment   # Пост findings у PR comments (GitHub)\n/code-review --fix       # Авто-фікс issues + apply to working tree"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Що Claude добре ревʼює</h3><ul class=\"list\">\n            <li><strong>✓ Logic errors:</strong> null checks, edge cases, off-by-one</li>\n            <li><strong>✓ Security:</strong> XSS, SQL injection, CSRF, auth bypasses</li>\n            <li><strong>✓ Performance:</strong> O(n²) loops, unnecessary re-renders, memory leaks</li>\n            <li><strong>✓ Reuse:</strong> Duplicate code, existing utilities</li>\n            <li><strong>✓ Style:</strong> Consistency, naming, types</li>\n          </ul><h3 class=\"topic\">Що ПОТРІБНО перевіряти вручну</h3><ul class=\"list\">\n            <li><strong>Business logic:</strong> Тільки ви знаєте requirements</li>\n            <li><strong>Design decisions:</strong> AI не знає context вашого проекту</li>\n            <li><strong>User experience:</strong> Тестуй в браузері</li>\n            <li><strong>Performance benchmarks:</strong> Профіль реальних даних</li>\n          </ul>"
        }
      ]
    },
    {
      "id": "security-privacy",
      "title": "🔒 Security & Privacy",
      interviewQuestions: [
        {
          "question": "Які ризики безпеки/приватності варто враховувати, підключаючи AI-агента з прямим доступом до кодової бази й терміналу?",
          "answer": "Ризик ненавмисного витоку секретів (агент може прочитати <code>.env</code>-файл чи credentials, якщо явно не обмежити доступ), ризик виконання деструктивних команд без належного підтвердження, і ризик prompt injection — коли зловмисний вміст у файлі чи відповіді зовнішнього сервісу намагається змінити поведінку агента. Тому агентні інструменти мають чіткі межі дозволів і підтвердження для ризикованих операцій."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>AI не бачить все. Деякі файли НЕ давай Claude.</p><h3 class=\"topic\">Що НЕ давати AI <span class=\"tag tag-key\">KEY</span></h3><div class=\"grid2\">\n            <div class=\"card\">\n              <h4>.env файли</h4>\n              <p>Ніколи, ніколи не давай secrets. API keys, DB passwords — конфіденційно.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Private algorithms</h4>\n              <p>Якщо бізнес-логіка proprietary — не надсилай алгоритм</p>\n            </div>\n            <div class=\"card\">\n              <h4>PII (Personally Identifiable Info)</h4>\n              <p>Реальні імена, email адреси, phone numbers користувачів</p>\n            </div>\n            <div class=\"card\">\n              <h4>Financial / Medical data</h4>\n              <p>Реальні числа балансів, діагнози, будь які sensitive дані</p>\n            </div>\n          </div><h3 class=\"topic\">.gitignore за AI-sensitive файлів</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": ".env                    # Secrets\n.env.local\n.env.*.local\ncredentials.json        # Google, AWS\nprivate/                # Proprietary algorithms\n**/*.key                # SSH, encryption keys\n**/*.pem"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Permission Mode</h3><p>Claude Code має 3 режими доступу:</p><ul class=\"list\">\n            <li><strong>ask:</strong> Claude просить дозволу перед Write/Execute (default)</li>\n            <li><strong>allow:</strong> Дозволити все автоматично (використовувати обережно!)</li>\n            <li><strong>deny:</strong> Заборонити всі Write/Execute (тільки читання)</li>\n          </ul>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// .claude/settings.json\n{\n  \"defaultPermissionMode\": \"ask\",  # Попроси дозвіл\n  \"allowlist\": [\"Bash:npm run test\", \"Edit:src/**\"]\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Sandbox Mode</h3><p>By default Claude не може запустити виконання поза sandbox. Але для деяких операцій (AWS, production deploy) потребуватиме явного <code>dangerouslyDisableSandbox: true</code>.</p><div class=\"alert warn\">\n            ⚠️ <strong>Ніколи не давай dangerouslyDisableSandbox у production!</strong> Використовуй лише для локального development.\n          </div>"
        }
      ]
    },
    {
      "id": "ai-у-frontend-проектах",
      "title": "⚛️ AI у Frontend-проектах",
      interviewQuestions: [
        {
          "question": "Як AI-асистенти змінюють щоденну роботу фронтенд-розробника — прискорюють написання коду чи змінюють сам характер роботи?",
          "answer": "Найбільший ефект — не швидше набирання коду, а зниження вартості дослідницької роботи (пошук по незнайомій кодовій базі, розуміння чужого коду, рутинний рефакторинг за патерном) — розробник більше часу проводить у ролі рев'юера й архітектора рішень, менше — у ролі того, хто вручну набирає кожен рядок."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Як вбудувати AI можливості в твій React/Next app.</p><h3 class=\"topic\">Anthropic SDK Setup <span class=\"tag tag-key\">KEY</span></h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "npm install @anthropic-ai/sdk"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Streaming у React</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "import { Anthropic } from '@anthropic-ai/sdk';\n\nexport function ChatComponent() {\n  const [response, setResponse] = useState('');\n\n  const handleSubmit = async (prompt) => {\n    const stream = await client.messages.stream({\n      model: 'claude-opus-4-8',\n      max_tokens: 1024,\n      messages: [{ role: 'user', content: prompt }],\n    });\n\n    for await (const chunk of stream) {\n      if (chunk.type === 'content_block_delta') {\n        setResponse(r => r + chunk.delta.text);\n      }\n    }\n  };\n\n  return <div>{response}</div>;\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Tool Use (Function Calling)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// AI може викликати твої функції\nconst tools = [{\n  name: 'get_user_info',\n  description: 'Get user profile info',\n  input_schema: {\n    type: 'object',\n    properties: {\n      user_id: { type: 'string' }\n    }\n  }\n}];\n\nconst response = await client.messages.create({\n  model: 'claude-opus-4-8',\n  max_tokens: 1024,\n  tools: tools,\n  messages: [{ role: 'user', content: 'What's my name?' }]\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Prompt Caching (Вартість оптимізація)</h3><p>Для частих запитів з однаковим контекстом: кешуй промпти.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "// Перший запит: 0.3$ (записує кеш)\nconst response = await client.messages.create({\n  model: 'claude-opus-4-8',\n  system: [{\n    type: 'text',\n    text: 'You are a helpful assistant',\n    cache_control: { type: 'ephemeral' }  # ← Кешувати\n  }],\n  messages: [...]\n});\n\n// Наступні запити: 0.1$ (використовують кеш)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Rate Limits & Token Budgets</h3><ul class=\"list\">\n            <li><strong>RPM (Requests Per Minute):</strong> Залежить від плану (free: 3, paid: 600)</li>\n            <li><strong>TPM (Tokens Per Minute):</strong> Вхідні + вихідні tokens (free: 40k, paid: 1M)</li>\n            <li><strong>Контроль:</strong> Кешування, batch processing, rate limiting на frontend</li>\n          </ul>"
        }
      ]
    },
    {
      "id": "interview-як-говорити-про-ai",
      "title": "🎯 Interview: Як говорити про AI",
      interviewQuestions: [
        {
          "question": "Як грамотно відповісти на питання інтерв'юера «як ти використовуєш AI-інструменти в роботі», щоб це прозвучало як сильна сторона, а не як залежність від інструменту?",
          "answer": "Показати конкретні, усвідомлені сценарії використання (дослідження незнайомого коду, чорновий рефакторинг, генерація тестів) із явним наголосом на тому, що фінальні архітектурні рішення й перевірка коректності лишаються за розробником — інтерв'юера цікавить розуміння меж інструменту й вміння критично оцінювати його вивід, а не сам факт використання AI."
        },
        {
          "question": "Чи варто применшувати використання AI-асистентів на співбесіді через побоювання, що це виглядатиме як брак навичок?",
          "answer": "Ні — приховування реального робочого процесу створює ризик неузгодженості, якщо про це запитають прямо, і сучасна індустрія сприймає ефективне використання AI-інструментів як навичку, а не слабкість. Важливіше показати, що кандидат розуміє <em>чому</em> AI дав саме таку відповідь і вміє її верифікувати, ніж заперечувати використання інструменту взагалі."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Нерідко інтерв'юери питають про AI-usage. Готуйся правильно.</p><h3 class=\"topic\">Правильні відповіді <span class=\"tag tag-key\">KEY</span></h3><div class=\"interview-tips\">\n            <div class=\"interview-tips-title\">✓ Green Flags</div>\n            <ul>\n              <li>\"Я використовую Claude Code як pair programmer для code review, архітектурного planning, та швидкого прототипування. Я приймаю всі рішення, AI — помічник.\"</li>\n              <li>\"У проектах я налаштовую CLAUDE.md, щоб AI розумів контекст нашої архітектури та конвенції.\"</li>\n              <li>\"Для код review я запускаю /code-review high перед merge, потім вручну перевіряю результати.\"</li>\n              <li>\"Я використовую Plan Mode для великих рефакторів, що розбивають їх на менші, перевіровані кроки.\"</li>\n            </ul>\n          </div><h3 class=\"topic\">Неправильні відповіді <span class=\"tag tag-key\">KEY</span></h3><div class=\"alert warn\">\n            ⚠️ <strong>Red Flags (НЕ говори це):</strong>\n            <ul style=\"color: #fcd34d; list-style: none; padding: 0; margin: 8px 0 0 0;\">\n              <li>❌ \"AI пише більшість мого коду, я тільки review\"</li>\n              <li>❌ \"Я ніколи не перевіряю код перед merge\"</li>\n              <li>❌ \"Claude завжди має рацію, я не ставлю питань\"</li>\n              <li>❌ \"Я даю AI мій .env та secrets\"</li>\n            </ul>\n          </div><h3 class=\"topic\">Демонстрація на інтерв'ю</h3><p>Якщо просять показати як ти використовуєш AI:</p><ol style=\"color: #94a3b8; padding-left: 20px;\">\n            <li>Відкрий Claude Code у терміналі</li>\n            <li>Покажи CLAUDE.md проекту (демонструй контекст)</li>\n            <li>Покажи <code>~/.claude/projects/[name]/memory/</code> (память про проект)</li>\n            <li>Запусти <code>/review low</code> на якомусь файлу (покажи результати)</li>\n            <li>Обговори як ти використовуєш Plan Mode для великих завдань</li>\n          </ol><h3 class=\"topic\">Контрольні питання від інтерв'юера</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Питання</th><th>Хороша відповідь</th></tr>\n              <tr>\n                <td>Як AI може помилятися?</td>\n                <td>\"AI іноді генерує логічні помилки або поверхневу критику. Я завжди verificирую результати за допомогою тестів та manual review.\"</td>\n              </tr>\n              <tr>\n                <td>Чи не робить AI розробників ліниво?</td>\n                <td>\"Навпаки — я можу фокусуватися на design decisions та архітектурі, замість шаблонного кодування. Дозволяє писати більше якісного коду швидше.\"</td>\n              </tr>\n              <tr>\n                <td>Як ти залишаєшся в курсі новинок без AI?</td>\n                <td>\"AI — інструмент, а не заміна навчанню. Я читаю dokumenty, дивлюсь talks, експериментую з новими фічами. AI прискорює learning curve.\"</td>\n              </tr>\n            </table>\n          </div><h3 class=\"topic\">Остаточна демонстрація: Performance Problem Solving</h3><p>Якщо дають live-coding task:</p><ol style=\"color: #94a3b8; padding-left: 20px;\">\n            <li>Скажи: \"Я використовую Claude Code для цього — дозвіл?\"</li>\n            <li>Запусти <code>/plan</code> для деталізації</li>\n            <li>Напиши промпт з повним контекстом (тип проблеми, constraints)</li>\n            <li>Дозволь Claude генерувати варіанти</li>\n            <li>Вибери найкращий, але ВРУЧНУ перевір логіку</li>\n            <li>Запусти тести (не полігайся 100% на AI)</li>\n          </ol><div class=\"interview-tips\">\n            <div class=\"interview-tips-title\">💡 Запаморий формулу</div>\n            <ul>\n              <li><strong>AI як помічник,</strong> не як author</li>\n              <li><strong>Твої рішення,</strong> не AI suggestions</li>\n              <li><strong>Вручна verify,</strong> потім довіряй</li>\n              <li><strong>CLAUDE.md для контексту,</strong> не для секретів</li>\n            </ul>\n          </div>"
        }
      ]
    }
  ]
}

export const aiCheat: TopicContent = {
  "slug": "ai",
  "sections": [
    {
      "id": "claude-code-commands",
      "title": "⌨️ Claude Code Commands",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid3\">\n        <div class=\"card\">\n          <h4>/help</h4>\n          <p>Показує доступні команди та режими</p>\n        </div>\n        <div class=\"card\">\n          <h4>/plan</h4>\n          <p>Запустити Plan Mode: explore → design → review</p>\n        </div>\n        <div class=\"card\">\n          <h4>/review [low|medium|high|ultra]</h4>\n          <p>Code review з різними рівнями глибини</p>\n        </div>\n        <div class=\"card\">\n          <h4>/run</h4>\n          <p>Запустити app (auto-detect project type)</p>\n        </div>\n        <div class=\"card\">\n          <h4>/fix</h4>\n          <p>Швидкий фікс + авто-застосування</p>\n        </div>\n        <div class=\"card\">\n          <h4>/explain</h4>\n          <p>Пояснити обраний код</p>\n        </div>\n        <div class=\"card\">\n          <h4>/schedule</h4>\n          <p>Запланувати cloud agent на cron</p>\n        </div>\n        <div class=\"card\">\n          <h4>/remember</h4>\n          <p>Збергти факт у memory для проекту</p>\n        </div>\n        <div class=\"card\">\n          <h4>/loop [interval]</h4>\n          <p>Запустити завдання на інтервалі</p>\n        </div>\n      </div><div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "prompt-engineering-quick-reference",
      "title": "✍️ Prompt Engineering — Quick Reference",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"card\">\n        <h4>Perfect Prompt Structure</h4>\n        <pre><span class=\"kw\">Role:</span> You are a Senior [Frontend] Developer\n\n<span class=\"kw\">Context:</span> [Project overview, tech stack, architecture]\n\n<span class=\"kw\">Task:</span> [What to do — be specific]\n\n<span class=\"kw\">Format:</span> Return [TypeScript|Markdown|JSON]\n\n<span class=\"kw\">Constraints:</span>\n- [Don't use X]\n- [Must support Y]\n- [No breaking changes]\n\n<span class=\"kw\">Example:</span> [Expected output sample]</pre>\n      </div><h3 class=\"topic\">Anti-Patterns</h3><ul class=\"list\">\n        <li><strong>❌ Vague:</strong> \"Make this better\" → <strong>✓ Specific:</strong> \"Optimize bundle size\"</li>\n        <li><strong>❌ No context:</strong> \"Write function\" → <strong>✓ With context:</strong> \"React hook for infinite scroll\"</li>\n        <li><strong>❌ Over-constraining:</strong> Too many rules → Keep 3-4 key constraints</li>\n      </ul><div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "claudemd-template",
      "title": "📄 CLAUDE.md Template",
      "blocks": [
        {
          "kind": "code",
          "language": "bash",
          "code": "# CLAUDE.md — Project Guide\n\n## Project Overview\n[Next.js 14 / React 18 / Vue 3 app. Purpose: e-commerce / internal tool / etc]\n\n## Architecture\n```\nsrc/\n├── app/           # Routes\n├── components/    # React components\n├── lib/           # Utils, hooks\n├── styles/        # CSS\n```\n\n## Key Conventions\n- Files: kebab-case\n- Imports: absolute from @/\n- No prop drilling; Zustand for state\n\n## Development Tasks\n\n### Add new page\n1. Create `app/pages/[name]/page.tsx`\n2. Export React component\n3. Add route to nav\n\n### Run locally\n```\nnpm install\nnpm run dev\n```"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">What CLAUDE.md Includes</h3><ul class=\"list\">\n        <li>Project overview (tech stack, purpose)</li>\n        <li>Folder structure & architecture</li>\n        <li>Code conventions (naming, imports, patterns)</li>\n        <li>How to perform common tasks</li>\n        <li>Key files & their purposes</li>\n        <li><strong>NOT:</strong> Secrets, API keys, credentials</li>\n      </ul><div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "claudesettingsjson-config",
      "title": "🔧 .claude/settings.json Config",
      "blocks": [
        {
          "kind": "code",
          "language": "bash",
          "code": "// Project-level config\n{\n  \"model\": \"claude-opus-4-8\",\n  \"defaultPermissionMode\": \"ask\",\n  \"hooks\": {\n    \"pre-tool-use\": [\n      { \"tool\": \"Bash\", \"command\": \"npm run lint\" }\n    ],\n    \"post-tool-use\": [\n      { \"tool\": \"Bash\", \"command\": \"npm run test\" }\n    ]\n  },\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx @modelcontextprotocol/server-github\",\n      \"env\": { \"GITHUB_TOKEN\": \"ghp_...\" }\n    }\n  }\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "hooks-quick-setup",
      "title": "🪝 Hooks Quick Setup",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Auto-lint before edit</h4>\n          <pre><span class=\"str\">\"pre-tool-use\"</span>: [{\n  <span class=\"str\">\"tool\"</span>: <span class=\"str\">\"Edit\"</span>,\n  <span class=\"str\">\"command\"</span>: <span class=\"str\">\"npm run lint --fix\"</span>\n}]</pre>\n        </div>\n        <div class=\"card\">\n          <h4>Auto-test after Bash</h4>\n          <pre><span class=\"str\">\"post-tool-use\"</span>: [{\n  <span class=\"str\">\"tool\"</span>: <span class=\"str\">\"Bash\"</span>,\n  <span class=\"str\">\"command\"</span>: <span class=\"str\">\"npm run test\"</span>\n}]</pre>\n        </div>\n      </div><h3 class=\"topic\">Notification (Slack)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "\"notification\": {\n  \"webhookUrl\": \"https://hooks.slack.com/...\",\n  \"message\": \"Claude finished work\"\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "loops-scheduling",
      "title": "🔁 Loops & Scheduling",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Syntax</h4>\n          <pre><span class=\"kw\">/loop</span> &lt;interval&gt; &lt;cmd|prompt&gt;\n\n<span class=\"str\">5m /babysit-prs</span>   → кожні 5 хв\n<span class=\"str\">30s check deploy</span>  → кожні 30 сек\n<span class=\"str\">/code-review</span>      → dynamic (self-paced)</pre>\n          <p><strong>interval</strong> = <code>s</code>/<code>m</code>/<code>h</code>. Без нього — модель сама обирає темп.</p>\n        </div>\n        <div class=\"card\">\n          <h4>Use cases</h4>\n          <ul class=\"list\">\n            <li>Моніторинг деплою</li>\n            <li>Polling CI / GitHub Actions</li>\n            <li>PR babysit (<code>/babysit-prs</code>)</li>\n            <li>Періодичні статус-чеки</li>\n          </ul>\n          <p><strong>Loop</strong> = локальний, у сесії. <strong>/schedule</strong> = cloud cron без тебе.</p>\n        </div>\n      </div><h3 class=\"topic\">Приклади</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Слеш-команда кожні 5 хв\n/loop 5m /babysit-prs\n\n# Промпт кожні 30 секунд\n/loop 30s перевір статус деплою\n\n# Dynamic mode — без інтервалу\n/loop /code-review\n\n# Зупинити: Escape або «stop the loop»"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "security-checklist",
      "title": "🔒 Security Checklist",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>❌ Never Share</h4>\n          <ul class=\"list\">\n            <li>.env files</li>\n            <li>API keys</li>\n            <li>DB passwords</li>\n            <li>Private SSH keys</li>\n            <li>PII (user data)</li>\n          </ul>\n        </div>\n        <div class=\"card\">\n          <h4>✓ Safe to Share</h4>\n          <ul class=\"list\">\n            <li>CLAUDE.md</li>\n            <li>Source code</li>\n            <li>Tests & docs</li>\n            <li>Public APIs</li>\n            <li>Architecture</li>\n          </ul>\n        </div>\n      </div><h3 class=\"topic\">.gitignore для AI-sensitive</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": ".env*\ncredentials.json\n**/*.key\n**/*.pem\nprivate/\n.vscode/settings.json"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "anthropic-sdk-setup",
      "title": "⚛️ Anthropic SDK Setup",
      "blocks": [
        {
          "kind": "code",
          "language": "bash",
          "code": "# Install\nnpm install @anthropic-ai/sdk\n\n# Basic usage\nimport { Anthropic } from '@anthropic-ai/sdk';\n\nconst client = new Anthropic({\n  apiKey: process.env.ANTHROPIC_API_KEY\n});\n\nconst response = await client.messages.create({\n  model: 'claude-opus-4-8',\n  max_tokens: 1024,\n  messages: [{ role: 'user', content: 'Hello' }]\n});"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Streaming</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "const stream = await client.messages.stream({...});\nfor await (const chunk of stream) {\n  console.log(chunk.delta.text);\n}"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Prompt Caching</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "system: [{\n  type: 'text',\n  text: 'Large context...',\n  cache_control: { type: 'ephemeral' }\n}]"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "agent-skills-quick-reference",
      "title": "🎓 Agent Skills — Quick Reference",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid3\">\n        <div class=\"card\">\n          <h4>1. Instruction file</h4>\n          <p>Один <code>SKILL.md</code>: шапка + вільний текст. Три запуски — три різні результати.</p>\n        </div>\n        <div class=\"card\">\n          <h4>2. Fixed workflow</h4>\n          <p>Зафіксований процес + верифікація: failing test до фікса, без причини — без фікса.</p>\n        </div>\n        <div class=\"card\">\n          <h4>3. Description-роутер</h4>\n          <p>Опис вирішує, чи скіл вантажиться (Progressive Disclosure). Не занадто вузько, не занадто широко.</p>\n        </div>\n        <div class=\"card\">\n          <h4>4. Розбиття на файли</h4>\n          <p>Довідки й скрипти — за умовою в тілі, не завжди разом з основним промтом.</p>\n        </div>\n        <div class=\"card\">\n          <h4>5. Права й середовище</h4>\n          <p>allowed-tools, модель, режим запуску (auto/manual), виклик субагента.</p>\n        </div>\n        <div class=\"card\">\n          <h4>6. Evals</h4>\n          <p>Файл кейсів + скрипт-раннер. 3-5 прогонів/кейс, LLM-суддя окремим субагентом.</p>\n        </div>\n        <div class=\"card\">\n          <h4>7. Пакет / плагін</h4>\n          <p>Версія, авто-оновлення, evals на кожну зміну, Marketplace.</p>\n        </div>\n      </div><h3 class=\"topic\">Перше, що перевірити</h3><div class=\"table-wrap\">\n        <table>\n          <tr><th>Симптом</th><th>Ймовірний рівень-причина</th></tr>\n          <tr><td>Скіл узагалі не вмикається</td><td>3 — опис нерелевантний / занадто вузький</td></tr>\n          <tr><td>Вмикається там, де не треба</td><td>3 — опис занадто широкий (overtriggering)</td></tr>\n          <tr><td>Різні результати на однаковий запит</td><td>2 — немає фіксованого workflow</td></tr>\n          <tr><td>Каже «зробив», але не зробив</td><td>2/6 — немає кроку верифікації або evals</td></tr>\n        </table>\n      </div><div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "interview-preparation",
      "title": "🎯 Interview Preparation",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"card\">\n        <h4>✓ Green Flags (Say These)</h4>\n        <ul class=\"list\">\n          <li>\"I use Claude Code as a pair programmer for review and planning\"</li>\n          <li>\"I set up CLAUDE.md to give AI proper context\"</li>\n          <li>\"I run /code-review before merging\"</li>\n          <li>\"I verify AI suggestions with tests\"</li>\n          <li>\"AI helps me focus on architecture, not boilerplate\"</li>\n        </ul>\n      </div><div class=\"alert warn\">\n        <strong>❌ Red Flags (Never Say)</strong>\n        <ul style=\"list-style: none; padding: 0; margin: 0; color: #fcd34d;\">\n          <li>• \"AI writes all my code\"</li>\n          <li>• \"I don't review AI output\"</li>\n          <li>• \"I share secrets with Claude\"</li>\n          <li>• \"Claude is always right\"</li>\n        </ul>\n      </div><h3 class=\"topic\">Demo on Interview</h3><ol style=\"color: #94a3b8; padding-left: 20px; margin: 8px 0;\">\n        <li>Open Claude Code in terminal</li>\n        <li>Show <strong>CLAUDE.md</strong> (demonstrate context)</li>\n        <li>Run <code>/review low</code> (show analysis)</li>\n        <li>Show <strong>memory/</strong> folder (persistent learning)</li>\n        <li>Explain Plan Mode for complex tasks</li>\n      </ol><h3 class=\"topic\">Common Questions & Answers</h3><div class=\"table-wrap\">\n        <table>\n          <tr><th>Question</th><th>Answer</th></tr>\n          <tr>\n            <td>How does AI make mistakes?</td>\n            <td>AI generates incorrect logic sometimes. I always verify with tests and manual review.</td>\n          </tr>\n          <tr>\n            <td>Doesn't AI make devs lazy?</td>\n            <td>No — I focus on design decisions and architecture, not boilerplate. Better code faster.</td>\n          </tr>\n          <tr>\n            <td>How do you stay current without AI?</td>\n            <td>AI is a tool, not replacement. I read docs, experiment, and use AI to accelerate learning.</td>\n          </tr>\n        </table>\n      </div>"
        }
      ]
    }
  ]
}
