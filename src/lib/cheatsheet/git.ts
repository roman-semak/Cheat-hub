// AUTO-GENERATED from CheetSheet/git/{index,cheatsheet}.html.
// Prose preserved as sanitized HTML blocks (styled via .cheat-prose) +
// extracted code blocks. Re-running the parser overwrites this file.
import type { TopicContent } from './types'

export const gitContent: TopicContent = {
  "slug": "git",
  "sections": [
    {
      "id": "git-internals",
      "title": "🔍 Git Internals",
      interviewQuestions: [
        {
          "question": "З яких трьох базових типів об'єктів складається Git-репозиторій на рівні файлової системи, і як вони пов'язані між собою?",
          "answer": "Blob (вміст файлу), tree (снапшот структури директорії — список blob'ів і піддерев з іменами), і commit (посилання на один tree + метадані: автор, повідомлення, батьківські коміти). Кожен об'єкт адресується SHA-1/SHA-256 хешем свого вмісту — тому Git фактично є content-addressable файловою системою, а гілка — це просто вказівник (файл із хешем) на конкретний commit."
        },
        {
          "question": "Чому Git вважається «content-addressable», і яка практична перевага з цього випливає?",
          "answer": "Об'єкт зберігається й адресується за хешем свого власного вмісту — ідентичний вміст (навіть в різних файлах чи комітах) завжди дає той самий хеш і зберігається в репозиторії лише один раз (дедуплікація на рівні вмісту). Практична перевага — цілісність: будь-яка зміна вмісту об'єкта змінює його хеш, тому пошкодження чи підміну даних легко виявити."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"version-row\">\n            <span class=\"ver ver-223\">v2.23 (2019)</span>\n            <span class=\"ver ver-238\">v2.38 (2022)</span>\n            <span class=\"ver ver-243\">v2.43 (2023) ✦</span>\n          </div><div class=\"changelog changelog-past\">\n            <div class=\"changelog-title\">🕐 Історія</div>\n            <div class=\"changelog-row\"><span class=\"chver\">2005</span><span class=\"changelog-text\">Git створений Linus Torvalds для Linux kernel versioning</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2012</span><span class=\"changelog-text\">Поширення у open-source спільноті (GitHub, GitLab)</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2022</span><span class=\"changelog-text\">v2.38 — покращення pack-objects, performance boost</span></div>\n            <div class=\"changelog-row\"><span class=\"chver\">2023 ✦</span><span class=\"changelog-text\"><strong>Поточна:</strong> v2.43 — experimental sparse index improvements</span></div>\n          </div><p><strong>Git —</strong> distributed version control system, який зберігає моментальні знімки (snapshots) файлів у спеціальних структурах даних.</p><h3 class=\"topic\">Object Database (Sha-1 хеш) <span class=\"tag tag-key\">KEY</span></h3><p>Git зберігає всі об'єкти у директорії <code>.git/objects</code>. Кожен об'єкт ідентифікується SHA-1 хешем (40 символів, hex). Об'єкти are content-addressable: однаковий вміст → однаковий SHA-1.</p><div class=\"grid3\">\n            <div class=\"card\">\n              <h4>Blob (Binary Large Object)</h4>\n              <p>File content only. SHA-1(type + size + content). Не зберігає filename, permissions, або metadata — тільки вміст.</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Edge case:</strong> Порожній файл (0 bytes) має фіксований SHA-1 <code>e69de29</code> (мнемоніка: \"every 69... de 29\" = 0 bytes).</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Content-addressable:</strong> Два файли з однаковим вмістом в різних папках = один blob (вбудована дедуплікація).</p>\n              <code style=\"font-size: 10px;\">git hash-object -w file.txt</code>\n            </div>\n            <div class=\"card\">\n              <h4>Tree (Directory Snapshot)</h4>\n              <p>Directory structure. Зберігає refs на blobs та subtrees: filename → blob/tree SHA-1 + mode (100644 file, 100755 executable, 040000 dir).</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Snapshot не diff:</strong> Tree це повний знімок каталогу, не delta від батька.</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Перегляд:</strong> <code>git cat-file -p HEAD^{tree}</code> або <code>git ls-tree -r HEAD</code></p>\n            </div>\n            <div class=\"card\">\n              <h4>Commit (Snapshot in Time)</h4>\n              <p>References tree SHA + parent SHA(s) + author + committer + message + timestamp. Create операція: 1) write all blob objects, 2) write tree, 3) write commit.</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Author vs Committer:</strong> Author = original writer, Committer = person doing the commit (rebase/amend змінює committer).</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Merge commits:</strong> Мають 2+ parents (non-merge = 1 parent).</p>\n            </div>\n          </div><h3 class=\"topic\">Tag Object (Annotated Tags)</h3><p>Четвертий тип об'єкта: окремий Git object для annotated tag (не lightweight tag). Зберігає tagger, message, timestamp. Lightweight tag — просто ref на commit SHA.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git tag -a v1.0 -m \"Release\"   # Annotated (object)\ngit tag v1.0                  # Lightweight (just ref)\ngit cat-file -p v1.0          # Show tag object"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Pack Files & Garbage Collection</h3><p>Loose objects (в `.git/objects/XX/YYYYYY`) → `git gc` пакує їх у `.git/objects/pack/` для ефективності.</p><div class=\"alert good\">\n            ✓ <strong>Performance:</strong> Packed objects займають менше місця, Git автоматично коли набирається ~7000 loose objects.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Edge case — reflog & unreachable objects:</strong> `git reflog expire` + `git gc` видаляє unreachable commits (orphaned). Якщо commit не на гілці та не у reflog — він буде видалений через 30 днів!\n          </div><h3 class=\"topic\">DAG Struktur (Directed Acyclic Graph) <span class=\"tag tag-key\">KEY</span></h3><p>Commits формують DAG — спрямований граф без циклів. Кожен commit вказує на батька (parent), формуючи ланцюг. Неможливо побудувати цикл (SHA залежить від parent — це гарантує acyclicity).</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "main    HEAD\n  ↓       ↓\n┌─ C3 (merge commit, 2 parents)\n│  ├─→ parent1: C2\n│  └─→ parent2: C1b\n│\nC2 ← C1b ← C0b (feature branch)\n│\nC1 ← C0 (main branch)\n\n# Non-merge commits = 1 parent, merge commits = 2+ parents"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\">\n            ✓ <strong>DAG guarantee:</strong> SHA-1 залежить від parent SHA, тому цикли неможливі. Історія завжди безпечна і непорушна.\n          </div><h4 style=\"font-size: 13px; color: #cbd5e1; margin-top: 12px;\">Edge case: Octopus Merge (3+ Parents)</h4>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Merge 3 branches одночасно\ngit merge feature1 feature2 feature3\n# Creates commit з 3 parents"
        },
        {
          "kind": "paragraph",
          "html": "<h4 style=\"font-size: 13px; color: #cbd5e1; margin-top: 12px;\">SHA-256 Migration</h4><p style=\"font-size: 12px;\">Git планує перехід з SHA-1 (128 bit collision vulnerability) на SHA-256. Поточне як ExperimentalFeature у git 2.29+. Edge case: репо з SHA-1 та SHA-256 commits одночасно під час міграції.</p><h3 class=\"topic\">Plumbing vs Porcelain (Low-level vs User-friendly)</h3><p><strong>Plumbing</strong> = низькорівневі команди для роботи з Git object database. <strong>Porcelain</strong> = людячні інтерфейси зверху.</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Plumbing (low-level)</th><th>What it does</th><th>Porcelain (user-friendly)</th></tr>\n              <tr><td><code>git hash-object -w</code></td><td>Write blob to database</td><td><code>git add</code></td></tr>\n              <tr><td><code>git cat-file -p</code></td><td>Read object from database</td><td><code>git show</code></td></tr>\n              <tr><td><code>git update-ref</code></td><td>Update ref (move HEAD/branch)</td><td><code>git branch</code>, <code>git checkout</code></td></tr>\n              <tr><td><code>git write-tree</code></td><td>Create tree from index</td><td><code>git commit</code></td></tr>\n              <tr><td><code>git commit-tree</code></td><td>Create commit object directly</td><td><code>git commit</code></td></tr>\n            </table>\n          </div><p><strong>Вивчення Git зсередини:</strong> Низькорівневі команди корисні для розуміння, але на практиці ніколи не потрібні.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Example: manually creating objects (NOT recommended)\necho \"test content\" | git hash-object -w --stdin    # Create blob\ngit cat-file -p abc123                               # Read blob\ngit cat-file -t abc123                               # Check object type\ngit ls-tree -r HEAD                                  # Traverse tree"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Object Database Location & Cleanup</h3><p><code>.git/objects</code> структура: <code>XX/YYYYYY...</code> (XX = перші 2 символи SHA, YYYYYY... = решта 38). Loose objects — один файл на об'єкт.</p><div class=\"alert warn\">\n            ⚠️ <strong>Edge case — corrupted objects:</strong> `git fsck --full` знаходить corrupted/missing objects. Якщо знайдені — репо пошкоджений, потрібен backup.\n          </div>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git gc                           # Garbage collection: пакування + optimization\ngit gc --aggressive              # Більш агресивна оптимізація (повільніше)\ngit count-objects -v             # Show stats на objects\ngit fsck --full                  # Integrity check"
        }
      ]
    },
    {
      "id": "three-trees-model-key",
      "title": "🌳 Three Trees Model KEY",
      interviewQuestions: [
        {
          "question": "Поясни модель трьох дерев Git (working directory, index/staging area, HEAD) і навіщо потрібен проміжний staging area?",
          "answer": "Working directory — файли, які ти реально редагуєш; index (staging area) — «чернетка» наступного коміту, куди потрапляє через <code>git add</code>; HEAD — останній коміт поточної гілки. Staging area дозволяє формувати коміт вибірково (додати лише частину змінених файлів чи навіть частину змін у файлі через <code>git add -p</code>), не комітячи все відразу, що дає атомарні, логічно згруповані коміти."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>Three Trees</strong> — фундаментальна концепція Git для розуміння lifecycle файлів. Три \"версії\" твого коду існують одночасно:</p><div class=\"grid3\">\n            <div class=\"card\">\n              <h4>1. Working Directory</h4>\n              <p>Твоя локальна файлова система на диску. Файли можуть бути: untracked (новий), modified (змінений), або unchanged (як в HEAD).</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><code>git status</code> компарує Working Dir vs Staging Index для \"Changes not staged\".</p>\n            </div>\n            <div class=\"card\">\n              <h4>2. Staging Index (Cache)</h4>\n              <p>Буфер між WD та HEAD. <code>git add</code> копіює зміни сюди. Бінарний файл `.git/index` (не текстовий).</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Partial staging:</strong> <code>git add -p</code> дозволяє staged тільки певні hunks одного файлу.</p>\n            </div>\n            <div class=\"card\">\n              <h4>3. HEAD (Commit History)</h4>\n              <p>Останній commit вашої поточної гілки. Зберігається як ref у `.git/refs/heads/`. HEAD сам по собі — ref на цей ref.</p>\n              <p style=\"font-size: 11px; color: #8b949e;\"><strong>Detached HEAD:</strong> Коли HEAD вказує прямо на commit SHA замість гілки.</p>\n            </div>\n          </div>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "Working Directory ──add──→ Staging Index ──commit──→ HEAD\n      ↑                           ↑                      ↑\n   Те що ти                   То що буде               Останній\n   редагував                 комітитись               commit"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Як git reset впливає на Three Trees <span class=\"tag tag-key\">KEY</span></h3><p><code>git reset</code> переміщує HEAD та (опціонально) Staging Index та Working Directory. У залежності від флага:</p><div class=\"table-wrap\">\n            <table>\n              <tr><th>Command</th><th>Working Dir</th><th>Staging Index</th><th>HEAD</th><th>Real Use Case</th></tr>\n              <tr><td><code>git reset --soft HEAD~1</code></td><td>✗ (не змінює)</td><td>✗ (не змінює)</td><td>✓ назад на 1 коміт</td><td>Маєш 3 WIP коміти → сховай їх у staging → один clean commit</td></tr>\n              <tr><td><code>git reset HEAD file.js</code><br>(--mixed)</td><td>✗ (не змінює)</td><td>✓ скидає</td><td>✗ (не змінює)</td><td>Зробив <code>git add .</code> помилково → скидаємо один файл</td></tr>\n              <tr><td><code>git reset --hard HEAD~1</code></td><td>✓ скидає</td><td>✓ скидає</td><td>✓ назад на 1 коміт</td><td>\"Все зламав, повніст відновити\" (НЕБЕЗПЕЧНО!)</td></tr>\n            </table>\n          </div><p><strong>Критична пам'ятка:</strong> <code>--soft</code> і <code>--mixed</code> НЕ видаляють зміни у Working Directory — зміни залишаються, просто переміщуються між tree levels.</p><h4 style=\"font-size: 13px; color: #cbd5e1; margin-top: 12px;\">Edge Cases Reset</h4><div class=\"alert warn\">\n            ⚠️ <strong>--hard на public гілці:</strong> Якщо вже pushed й reset --hard → всі collaborators мають стару версію. Потім потрібен `git push --force` (але це конфліктує з їх роботою!).\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Uncommitted changes втрачаються:</strong> `git reset --hard` видаляє Working Dir changes НАЗАВЖДИ (якщо не stash перед reset).\n          </div><div class=\"alert good\">\n            ✓ <strong>Відновлення через reflog:</strong> Після неправильного reset → `git reflog` показує всі рухи HEAD → `git reset --hard abc123` для відновлення.\n          </div><h3 class=\"topic\">Різниця: reset vs revert vs restore vs clean</h3><div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong><code>git reset abc123</code></strong>\n              <p>Переміщує HEAD (± index/WD). ЗМІНЮЄ історію.</p>\n              <pre style=\"margin-top: 8px; font-size: 10px;\">git reset --soft HEAD~1   <span class=\"cmt\"># Keep changes</span>\ngit reset HEAD file.js     <span class=\"cmt\"># Unstage</span>\ngit reset --hard HEAD~2    <span class=\"cmt\"># Dangerous!</span></pre>\n              <p style=\"font-size: 11px; color: #f59e0b; margin-top: 6px;\">⚠️ НЕБЕЗПЕЧНА для shared гілок (змінює SHA)</p>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong><code>git revert abc123</code></strong>\n              <p>Створює НОВИЙ коміт, який відміняє попередній.</p>\n              <pre style=\"margin-top: 8px; font-size: 10px;\">git revert HEAD           <span class=\"cmt\"># Undo last commit</span>\ngit revert abc123..xyz789  <span class=\"cmt\"># Revert range</span></pre>\n              <p style=\"font-size: 11px; color: #34d399; margin-top: 6px;\">✓ Безпечна для public (додає commit, не змінює)</p>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong><code>git restore</code> (git 2.23+)</strong>\n              <p>Скасовує зміни у Working Dir або Index. НЕ рухає HEAD!</p>\n              <pre style=\"margin-top: 8px; font-size: 10px;\">git restore file.js           <span class=\"cmt\"># Discard WD</span>\ngit restore --staged file.js  <span class=\"cmt\"># Unstage</span>\ngit restore --source=HEAD~2 file.js  <span class=\"cmt\"># From older</span></pre>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong><code>git clean -fd</code></strong>\n              <p>Видаляє untracked файли + пусті директорії.</p>\n              <pre style=\"margin-top: 8px; font-size: 10px;\">git clean -n            <span class=\"cmt\"># Dry-run (preview)</span>\ngit clean -fd            <span class=\"cmt\"># Force delete</span>\ngit clean -fdx           <span class=\"cmt\"># Include .gitignored</span></pre>\n              <p style=\"font-size: 11px; color: #f59e0b; margin-top: 6px;\">⚠️ Безповоротно! (не у git history)</p>\n            </div>\n          </div><h3 class=\"topic\">Detached HEAD State</h3><p>Зазвичай HEAD вказує на гілку (напр. `HEAD → main → commit abc123`). Але можна checkout на конкретний commit SHA:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git checkout abc123        # Detached HEAD!\n# Output: \"You are in 'detached HEAD' state.\"\n# Будь-які коміти тут → не на гілці → можуть загубитись!\n\ngit checkout -b new-branch  # Зберегти як гілка"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case — detached HEAD + new commits:</strong> Якщо коміти на detached HEAD і потім checkout на іншу гілку → коміти \"orphaned\" (видалені за 30 днів через reflog expiration).\n          </div><p style=\"font-size: 11px; color: #8b949e; margin-top: 8px;\"><strong>CI/CD scenario:</strong> Часто `git checkout sha` у CI вводить detached HEAD. Це нормально для читання, але не для розробки.</p>"
        }
      ]
    },
    {
      "id": "branching-strategies",
      "title": "🌿 Branching Strategies",
      interviewQuestions: [
        {
          "question": "Чим Trunk-Based Development відрізняється від GitFlow, і чому багато сучасних команд з CI/CD переходять саме на trunk-based?",
          "answer": "GitFlow тримає довгоживучі гілки (develop, release, feature) з рідкими злиттями — це створює великі, ризиковані merge'і й затримує інтеграцію. Trunk-Based Development тримає короткоживучі feature-гілки (дні, не тижні) і часто зливає в main — менші, простіші для рев'ю diff'и, швидший feedback loop, що узгоджується з continuous deployment, де кожен merge потенційно одразу йде в прод."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Правильна стратегія гілкування критична для командної роботи та CI/CD. Вибір залежить від розміру команди, релізного циклу та культури.</p><h3 class=\"topic\">Git Flow (semver + scheduled releases)</h3><p>Vincent Driessen's branching model. Для проєктів з версіонованими релізами та довгим preparation періодом.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "main:      ─── v1.0 ─────────────┬──────── v2.0 ────────►\n                    ↑                ↓ (hotfix)\n                (release)        ┌────┘\n                    │            │  hotfix/2.0.1\ndevelop:   ────────┴────┬────────┴────────┬──────────────────►\n                feature/x   release/2.0  ├─ feature/y\n                                         └─ feature/z"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong>Гілки & Lifecycle:</strong>\n              <ul class=\"list\" style=\"font-size: 11.5px;\">\n                <li><code>main</code> — production (tagged releases)</li>\n                <li><code>develop</code> — integration (next release)</li>\n                <li><code>feature/x</code> → develop (merge --no-ff)</li>\n                <li><code>release/</code> → main + develop (versioning)</li>\n                <li><code>hotfix/</code> → main + develop (critical fixes)</li>\n              </ul>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 6px;\">\n              <strong>Коли обирати:</strong>\n              <p style=\"font-size: 12px;\">✓ Великі проєкти (5+ людей)<br>✓ Versioned releases (v1.0, v2.0)<br>✓ Long release cycles<br>✗ Continuous deployment<br>✗ Малі teams або стартапи</p>\n            </div>\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Edge case — feature conflict:</strong> Довго-жиючі feature branches конфліктують з develop. Потрібна частостина синхронізація `git merge develop` в feature.\n          </div><h3 class=\"topic\">GitHub Flow (simpler, trunk-based)</h3><div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong>Цикл:</strong>\n              <ul class=\"list\" style=\"font-size: 11.5px;\">\n                <li>1. Create feature branch від main</li>\n                <li>2. Push → GitHub</li>\n                <li>3. Open Pull Request</li>\n                <li>4. Code review + discuss</li>\n                <li>5. Merge → auto-deploy to staging/prod</li>\n              </ul>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 6px;\">\n              <strong>Коли обирати:</strong>\n              <p style=\"font-size: 12px;\">✓ Стартапи, SaaS<br>✓ Continuous deployment<br>✓ Малі teams (2-5)<br>✓ Fast iteration<br>✗ Версіоновані releases</p>\n            </div>\n          </div><p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Branch Protection:</strong> GitHub/GitLab дозволяє require PR reviews, status checks, linear history. `main` завжди deployable.</p><p style=\"font-size: 12px; color: #8b949e;\"><strong>CODEOWNERS:</strong> файл `.github/CODEOWNERS` дозволяє auto-assign reviews на PR.</p><h3 class=\"topic\">Trunk-Based Development (monolithic branch)</h3><p>Всі розробники push до `main` декілька разів на день. Нема long-lived feature branches (max 1-2 дні). Feature toggles замість бранчей.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "main:  ─── A → B → C → D → E → F → G ──────────►\n       (кожен commit від іншої людини, не branches)"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\">\n            ✓ <strong>Переваги:</strong> Мінімум merge конфліктів, проста СІ/СД, швидка інтеграція.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Вимоги:</strong> Сильні тести, feature toggles (LaunchDarkly), дисципліна команди. Великий feature (>2 дні) → розділити на smaller pieces.\n          </div><p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Feature toggles:</strong> Замість `if (branchName == 'feature') { new code }` → `if (featureToggle.enabled) { new code }`. Дозволяє deploy incomplete features за флагом.</p><h3 class=\"topic\">Release Train (enterprise)</h3><p>Для великих організацій (банки, мобільні) з фіксованими датами релізу (квартально, місячно). Нараховується окремий `release-X.Y` branch за 2-4 тижні до релізу.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "main:     ─── ... ─── release-2.0 ─── release-3.0 ──────►\n                        ↓ (feature freeze)  ↓\n                    📦 v2.0               📦 v3.0\n                    (stabilization)       (stabilization)"
        },
        {
          "kind": "paragraph",
          "html": "<p style=\"font-size: 12px; color: #8b949e;\"><strong>Timeline:</strong> Features merge до release branch → stabilization period (bug fixes only) → release day → merge back до main.</p><div class=\"interview-tips\">\n            <div class=\"interview-tips-title\">💡 На інтерв'ю</div>\n            <ul>\n              <li><strong>Поясни вибір:</strong> Чому у вашої компанії Git Flow, а не GitHub Flow? (Релізні цикли, розмір команди)</li>\n              <li><strong>Merge vs Rebase:</strong> Що ви обираєте? Чому? (Git Flow → merge; trunk-based → rebase)</li>\n              <li><strong>PR review culture:</strong> Як вірифікуєте PR перед merge? (Testing, linting, code review)</li>\n            </ul>\n          </div>"
        }
      ]
    },
    {
      "id": "merge-strategies-key",
      "title": "🔀 Merge Strategies KEY",
      interviewQuestions: [
        {
          "question": "Чим merge commit відрізняється від fast-forward merge, і коли Git обирає кожен варіант автоматично?",
          "answer": "Fast-forward можливий, коли поточна гілка не отримала жодного нового коміту з моменту відгалуження — Git просто пересуває вказівник гілки вперед без створення нового коміту, історія лишається лінійною. Якщо обидві гілки розійшлись (є нові коміти в обох), Git створює merge commit із двома батьками, що об'єднує історії — це необхідно, коли лінійне «пересування» вказівника вже неможливе."
        },
        {
          "question": "Чим squash merge відрізняється від звичайного merge, і які трейд-оффи цього підходу для історії проєкту?",
          "answer": "Squash merge об'єднує всі коміти feature-гілки в один коміт при злитті в main — історія main лишається чистою, один PR = один коміт. Ціна — втрачається детальна історія окремих кроків розробки всередині feature-гілки (для дебагу через <code>git bisect</code> це означає меншу гранулярність), тому вибір squash vs merge — компроміс між чистотою історії й деталізацією для майбутнього дебагу."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Коли дві гілки розходяться й потрібно їх обʼєднати, Git вибирає алгоритм merge залежно від history shape та флагів.</p><h3 class=\"topic\">Fast-Forward Merge (linear)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Linear: main is ancestor of feature\nmain:    C0 → C1\n                ↘\nfeature:        C2 → C3 ← HEAD\n\n# git merge feature (from main)\nmain:    C0 → C1 → C2 → C3"
        },
        {
          "kind": "paragraph",
          "html": "<p>Коли feature гілка є \"ahead\" main без паралельних змін → Git просто переміщує HEAD. Жодного merge commit!</p><div class=\"grid2\">\n            <div><strong>✓ Плюси:</strong> Лінійна історія, чиста</div>\n            <div><strong>✗ Мінуси:</strong> Не видно, що був merge</div>\n          </div><p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><code>git merge --no-ff feature</code> — примусово створити merge commit навіть при FF. Корисно для збереження branching information.</p><div class=\"alert warn\">\n            ⚠️ <strong>Edge case — FF impossible:</strong> Якщо main просунувся вперед паралельно (C0 → C1a / C1b) → FF неможливий, буде 3-way merge.\n          </div><h3 class=\"topic\">3-Way Merge (recursive / ort algorithm)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Паралельні гілки (дивергентні)\nmain:    C0 → C1 ──┐\n                   ├─→ C3 (merge commit, 2 parents)\nfeature: C0 → C2 ──┘\n\n# MRCA = C0 (Most Recent Common Ancestor)\n# Git: compare (C1 vs C0) + (C2 vs C0) → create C3"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>MRCA = Most Recent Common Ancestor:</strong> Останній commit, що існує в обох гілках. Git порівнює зміни від MRCA до кожної гілки, потім merge логіку.</p><div class=\"grid2\">\n            <div class=\"card\">\n              <h4>Recursive (до v2.26)</h4>\n              <p>Повільніший, може мати непередбачувані результати при >2 батьків (octopus merge).</p>\n            </div>\n            <div class=\"card\">\n              <h4>ORT (v2.26+, дефолт)</h4>\n              <p>Оптимізована. Швидша, лучше обробляє конфлікти, більш передбачувана.</p>\n            </div>\n          </div><p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><code>git config merge.algorithm ort</code> — встановити глобально.</p><h3 class=\"topic\">Octopus Merge (3+ Parents)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git merge branch1 branch2 branch3   # Merge 3 branches at once\n# Creates commit з 3 parents (rare)"
        },
        {
          "kind": "paragraph",
          "html": "<p style=\"font-size: 12px;\">Octopus merge неможливий, якщо є конфлікти → потрібен manual resolve з `git merge branch1 branch2` потім `git merge branch3`.</p><h3 class=\"topic\">Squash Merge (compress history)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Feature з багатьма WIP коміти\nfeature: C1 (WIP) → C2 (refactor) → C3 (fix) → C_HEAD\n\n# git merge --squash feature\nmain: C0 → C_squashed (staged, NOT commited)"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Важливо:</strong> `git merge --squash` НЕ автоматично commits! Потрібен `git commit` вручну.</p><div class=\"grid2\">\n            <div><strong>Use case:</strong> Feature commits are WIP → main потребує 1 clean commit</div>\n            <div><strong>⚠️ Edge case:</strong> Squash губить авторство (author = person doing merge)</div>\n          </div>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git merge --squash feature\ngit commit -m \"Add feature X with all changes from feature branch\""
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Conflict Resolution & Tools <span class=\"tag tag-key\">KEY</span></h3><p>Коли обидві гілки змінили те ж місце → Git не може автоматично вирішити:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "<<<<<<< HEAD\n  main version\n=======\n  feature version\n>>>>>>> feature"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Вручне вирішення:</strong> Відредагувати файл, залишити потрібну версію (або комбо), потім:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git add file.js          # Mark as resolved\ngit commit               # Complete merge"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Mergetool GUI:</strong> <code>git mergetool</code> запускає configured tool (VS Code, meld, vimdiff).</p><h3 class=\"topic\">git rerere (Reuse Recorded Resolution)</h3><p>Git запам'ятовує вирішення merge/rebase конфліктів, потім повторно застосовує на подібні конфлікти.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git config --global rerere.enabled true\n# Тепер Git автоматично запам'ятовує + повторно застосовує рішення"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge cases конфліктів:</strong>\n            <ul class=\"list\" style=\"font-size: 11.5px;\">\n              <li>Binary file conflict (не merge, вибирай версію)</li>\n              <li>Submodule conflict (commit SHA не збігається)</li>\n              <li>chmod conflict (permissions на Windows vs Unix)</li>\n            </ul>\n          </div>"
        }
      ]
    },
    {
      "id": "rebase-key",
      "title": "♻️ Rebase KEY",
      interviewQuestions: [
        {
          "question": "Чим rebase відрізняється від merge з точки зору історії, і чому rebase небезпечний для публічних (вже запушених і розшарених) гілок?",
          "answer": "Rebase переписує коміти feature-гілки так, ніби вони були зроблені поверх нового HEAD main — результат лінійна історія без merge commit, але кожен переписаний коміт отримує <strong>новий хеш</strong>. Якщо гілку вже розшарили з іншими розробниками, rebase створює розбіжність між їхньою локальною історією і твоєю переписаною — наступний pull призведе до дублювання комітів чи конфліктів, тому rebase публічних гілок вважається антипатерном (»don't rebase what you've pushed»)."
        },
        {
          "question": "Що таке interactive rebase, і які типові задачі він вирішує перед відкриттям PR?",
          "answer": "<code>git rebase -i</code> дозволяє переписати список комітів feature-гілки: об'єднати кілька комітів в один (squash), змінити повідомлення коміту (reword), переставити порядок, чи видалити коміт повністю (drop) — типово використовується, щоб «прибрати» історію (коміти на кшталт «wip», «fix typo») перед тим, як показати чисту, логічну послідовність змін у PR для рев'ю."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p><strong>Rebase —</strong> перебудова гілки поверх іншої точки. Замість merge commit, переписує commit history як лінійну послідовність. Використовує cherry-pick внутрішньо.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Before\nmain:    C0 → C1 ────────────────►\nfeature:      ↘ C2 → C3 → C4\n\n# git rebase main (від feature)\nmain:    C0 → C1 ───────────────►\n             ↓\nfeature:      C1 → C2' → C3' → C4'  (new SHAs)"
        },
        {
          "kind": "paragraph",
          "html": "<p>Rebase переписує SHA кожного коміту (залежить від parent), тому коміти отримують нові SHAs (C2 → C2', C3 → C3', C4 → C4').</p><h3 class=\"topic\">Rebase vs Merge (порівняння)</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Аспект</th><th>Merge</th><th>Rebase</th></tr>\n              <tr><td>Історія</td><td>Містить merge commits</td><td>Лінійна, ніяких merge commits</td></tr>\n              <tr><td>Безпека</td><td>Безпечна для public гілок</td><td>НЕБЕЗПЕЧНА для public гілок (змінює історію!)</td></tr>\n              <tr><td>Читаність</td><td>Складніша (видно паралельні розробки)</td><td>Чиста, логічна послідовність</td></tr>\n              <tr><td>Коміти</td><td>Один merge commit + оригінальні</td><td>Переписані коміти з новими SHA-1</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Interactive Rebase (git rebase -i) <span class=\"tag tag-key\">KEY</span></h3><p>Переписати послідовність/вміст/messages коміти. Запускає editor з todo-list:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Rebase last 3 commits\ngit rebase -i HEAD~3\n\n# Editor opens (vi/nano/code depending on git config):\npick a1b2c3 Fix bug #123\nsquash d4e5f6 Typo in comment\nreword 7g8h9i Refactor module\ndrop   j10k11l WIP temp file\nexec npm test"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong>Команди rebase -i:</strong>\n              <ul class=\"list\" style=\"font-size: 11px;\">\n                <li><code>pick</code> = use commit</li>\n                <li><code>reword</code> = use, edit message</li>\n                <li><code>squash</code> = use, meld into prev</li>\n                <li><code>fixup</code> = like squash, discard msg</li>\n                <li><code>edit</code> = use, but stop for amending</li>\n              </ul>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 6px;\">\n              <strong>Більше команд:</strong>\n              <ul class=\"list\" style=\"font-size: 11px;\">\n                <li><code>drop</code> = remove commit</li>\n                <li><code>exec</code> = run shell between</li>\n                <li><code>break</code> = stop for manual edits</li>\n                <li><code>label</code> / <code>reset</code> = advanced</li>\n              </ul>\n            </div>\n          </div><h4 style=\"font-size: 13px; color: #cbd5e1; margin-top: 12px;\">Autosquash (Smart Squashing)</h4><p>Якщо коміт message починається з `fixup!` або `squash!` → Git автоматично переортодує в rebase -i:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git commit -m \"fixup! Fix bug #123\"    # Auto-reorder + squash\ngit commit -m \"squash! Refactor\"     # Auto-reorder + squash\ngit rebase -i --autosquash HEAD~5"
        },
        {
          "kind": "paragraph",
          "html": "<h4 style=\"font-size: 13px; color: #cbd5e1; margin-top: 12px;\">Rebase z Конфліктом</h4>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git rebase --continue    # After fixing conflict + git add\ngit rebase --abort       # Cancel rebase, restore orig\ngit rebase --skip        # Skip current commit"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Rebase --onto (advanced)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Scenario: створив feature з develop, але want it on main\ndevelop:  A → B → C ─────────►\n                     ↘\nfeature:              D → E → F\n\n# git rebase --onto main develop feature\nmain:     X → Y ──────────────►\n                    ↘\nfeature:            D' → E' → F'"
        },
        {
          "kind": "paragraph",
          "html": "<h4 style=\"font-size: 13px; color: #cbd5e1; margin-top: 12px;\">Rebase --rebase-merges</h4><p>Зазвичай rebase зрівнює merge commits. З `--rebase-merges` — зберігає merge topology:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git rebase --rebase-merges main   # Preserve merge history"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Edge Cases Rebase <span class=\"tag tag-pit\">ВАЖЛИВО</span></h3><div class=\"alert warn\">\n            ⚠️ <strong>The Golden Rule:</strong> <code>git rebase</code> НЕ ВИКОРИСТОВУВАТИ для public гілок! Якщо інші залежать від твоєї гілки → rebase змінює SHA → конфлікти у всіх.\n          </div><p style=\"font-size: 12px; margin-top: 8px;\"><strong>Safe rule:</strong> Rebase only на ваших локальних гілках ДО push, або ДО merge до main.</p><div class=\"alert warn\">\n            ⚠️ <strong>Force Push Etiquette:</strong> Після rebase on pushed branch → потрібен `git push --force-with-lease`. Це ж чем `--force`, але безопаснее — перевіряє, чи хтось не пушив між тим.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Rebase Loop (Duplication):</strong> Якщо cherry-pick commit, потім rebase → commit appears TWICE. Уникайте cherry-pick + rebase на одних і тих же коміти.\n          </div><div class=\"section\" id=\"history\">\n          <h2 class=\"section-title\"><span>🕐</span> History Rewriting <span class=\"tag tag-pit\">ADVANCED</span></h2>\n          <p>Переписати або очистити commit history. ВАЖЛИВО: тільки на non-public гілках, поки не pushed!</p>\n\n          <h3 class=\"topic\">git commit --amend</h3>\n          <p>Модифікує останній commit HEAD. Можна додати файли або змінити message. Амінд змінює SHA!</p>\n          <pre>git add forgotten_file.txt\ngit commit --amend --no-edit       <span class=\"cmt\"># Add file, keep message</span>\n\ngit commit --amend -m \"Better msg\"  <span class=\"cmt\"># Change message only</span>\n\ngit commit --amend --allow-empty    <span class=\"cmt\"># Amend empty commit</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge case:</strong> Amend НЕ можна для старіших комітів (тільки HEAD) → використовуй `rebase -i` для інших. Якщо уже pushed → потрібен force-with-lease.\n          </div>\n          <h3 class=\"topic\">git reflog (рятівник)</h3>\n          <p>Журнал всіх рухів HEAD. Рятує, якщо скасував неправильний reset/rebase. Reflog локальний (не передається через clone)!</p>\n          <pre>git reflog                         <span class=\"cmt\"># Show all HEAD movements</span>\n<span class=\"cmt\">ba2d3c6 HEAD@{0}: reset: moving to ba2d3c6</span>\n<span class=\"cmt\">a1b2c3d HEAD@{1}: commit: Fix critical bug</span>\n<span class=\"cmt\">7g8h9i0 HEAD@{2}: rebase: finished</span>\n<span class=\"cmt\">xyz1234 HEAD@{3}: checkout: moving from main to feature</span>\n\ngit reset --hard a1b2c3d    <span class=\"cmt\"># Restore to that commit!</span>\ngit reflog expire --expire=now --all    <span class=\"cmt\"># Clear reflog (90d default)</span></pre>\n          <div class=\"alert good\">\n            ✓ <strong>Recovery lifesaver:</strong> Навіть після `git reset --hard` або `git rebase --abort` → reflog рятує!\n          </div>\n          <p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>TTL:</strong> Reflog keep 90 дні (config: `gc.reflogExpire`), orphaned commits — 30 днів, потім `git gc` видаляє.</p>\n\n          <h3 class=\"topic\">git filter-repo (Remove from All History)</h3>\n          <p><strong>Сценарій:</strong> Акцидентально committed secret / великий binary file → потрібно видалити з ВСІЄЇ історії (всіх коміти).</p>\n          <pre><span class=\"cmt\"># Install: pip install git-filter-repo</span>\ngit filter-repo --path config/secrets.yml --invert-paths\n<span class=\"cmt\"># Removes secrets.yml від всіх commits</span>\n\ngit filter-repo --path large_file.iso --invert-paths\n<span class=\"cmt\"># Remove binary file</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Dangerous operation!</strong> Filter-repo переписує ВСІ SHA-1, потім потрібен:\n            <ul class=\"list\" style=\"font-size: 11px;\">\n              <li>Force push до remote (всі collaborators affected)</li>\n              <li>Всіх collaborators повинні `git clone` знов (не pull!)</li>\n              <li>GitHub може кешувати старі versions (secret rotation обов'язкова!)</li>\n            </ul>\n          </div>\n          <p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Альтернатива:</strong> BFG Repo Cleaner (Java-based, простіший синтаксис для secrets/large files).</p>\n          <div class=\"alert good\">\n            ✓ <strong>Не забути:</strong> Якщо secret скомітив → крім видалення з git, обов'язково зробити SECRET ROTATION (змінити пароль/API key)!\n          </div>\n        </div><div class=\"section\" id=\"cherry-stash\">\n          <h2 class=\"section-title\"><span>🍒</span> Cherry-pick & Stash</h2>\n          <h3 class=\"topic\">Cherry-pick (copy commits between branches)</h3>\n          <p>Копіює один/кілька коміти з однієї гілки на іншу. Переносить changes, але НЕ гілку.</p>\n          <pre>git cherry-pick abc123              <span class=\"cmt\"># Copy single commit</span>\ngit cherry-pick abc123..xyz789      <span class=\"cmt\"># Range (abc123, xyz789]</span>\ngit cherry-pick abc123 def456 ghi789 <span class=\"cmt\"># Multiple specific</span>\n\ngit cherry-pick -n abc123           <span class=\"cmt\"># Stage, no commit yet</span>\ngit cherry-pick -x abc123           <span class=\"cmt\"># Add \"cherry picked from\" footer</span></pre>\n          <p><strong>Use cases:</strong> Hotfix на stable branch, backport fix до older version, selective feature merge.</p>\n\n          <h3 class=\"topic\">Cherry-pick Edge Cases</h3>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Cherry-pick merge commit:</strong> Merge commit має 2 parents → треба вказати `-m 1` (mainline):\n            <pre>git cherry-pick -m 1 merge-commit-sha</pre>\n          </div>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Empty cherry-pick:</strong> Якщо changes вже в target branch → git пропускає. Використовуй `--allow-empty`.\n          </div>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Cherry-pick duplication:</strong> Якщо потім merge тієї ж гілки → changes appear TWICE (cherry-pick + merge). Уникайте cherry-pick + merge на сам коміті!\n          </div>\n\n          <h3 class=\"topic\">Stash (Temporary Storage)</h3>\n          <p>Зберігає незакомічені зміни (WD + staging) у буфер. Корисно для switch гілок без коміту.</p>\n          <pre>git stash push -m \"WIP: feature X\"   <span class=\"cmt\"># Save with message</span>\ngit stash list                        <span class=\"cmt\"># List all stashes</span>\ngit stash pop stash@{0}               <span class=\"cmt\"># Apply + delete from stash</span>\ngit stash apply stash@{0}             <span class=\"cmt\"># Apply, keep in stash</span>\ngit stash drop stash@{0}              <span class=\"cmt\"># Delete stash entry</span>\ngit stash show -p stash@{0}           <span class=\"cmt\"># View diff without apply</span></pre>\n\n          <h3 class=\"topic\">Stash Advanced</h3>\n          <pre>git stash push -p                   <span class=\"cmt\"># Interactive (pick hunks)</span>\ngit stash push -u                   <span class=\"cmt\"># Include untracked files</span>\ngit stash branch new-branch         <span class=\"cmt\"># Create branch from stash</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Stash pop конфлікт:</strong> Якщо stash не можна apply чисто → залишається у stash (не видаляється!). Потім `git stash drop` вручну.\n          </div>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Stash на неправильній гілці:</strong> Якщо apply stash на іншій гілці, ніж де його created → конфлікти. Краще `git stash branch` для безпеки.\n          </div>\n          <div class=\"alert good\">\n            ✓ <strong>Debugging tip:</strong> `git stash` можна використовувати для чистого тестування: stash → test → pop.\n          </div>\n        </div><div class=\"section\" id=\"remotes\">\n          <h2 class=\"section-title\"><span>🌐</span> Remote Operations</h2>\n          <h3 class=\"topic\">Origin vs Upstream</h3>\n          <div class=\"grid2\">\n            <div class=\"card\">\n              <h4>Origin</h4>\n              <p>Твоя копія repo (зазвичай на GitHub, твій fork). Default remote.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Upstream</h4>\n              <p>Оригінальний repo (напр., корпоративний). Для синхронізації з main project.</p>\n            </div>\n          </div>\n          <h3 class=\"topic\">Fetch vs Pull</h3>\n          <div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong><code>git fetch</code></strong>\n              <p>Завантажує remote commits у <code>origin/branch</code>, НЕ merge у local. Безпечна операція.</p>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 6px;\">\n              <strong><code>git pull</code></strong>\n              <p><code>git fetch</code> + <code>git merge</code>. Автоматично merge remote.</p>\n            </div>\n          </div>\n          <h3 class=\"topic\">Fork Workflow (open-source)</h3>\n          <div class=\"alert good\">\n            ✓ Fork upstream → clone your fork → add upstream remote → feature branch → pull request → upstream review & merge\n          </div>\n          <pre>git remote add upstream https://github.com/original/repo.git\ngit fetch upstream\ngit checkout -b fix/bug upstream/main\n<span class=\"cmt\"># Make commits</span>\ngit push origin fix/bug        <span class=\"cmt\"># Push на твої fork</span>\n<span class=\"cmt\"># Then open PR на upstream</span></pre>\n          <h3 class=\"topic\">Remote Tracking & Divergent Branches</h3>\n          <pre>git branch -u origin/main              <span class=\"cmt\"># Set tracking</span>\ngit branch -vv                         <span class=\"cmt\"># Show tracking info</span>\ngit push -u origin feature             <span class=\"cmt\"># Create + set tracking</span>\ngit push --all                         <span class=\"cmt\"># Push all branches</span>\ngit remote prune origin                <span class=\"cmt\"># Remove stale refs</span>\ngit fetch --prune                      <span class=\"cmt\"># Fetch + prune</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge case: Diverged branches</strong>\n            <pre>fatal: Need to specify how to reconcile divergent branches.\nYou can do so by running one of the following as the first operation\nbefore your next pull:\n  git pull --rebase\n  git pull --merge</pre>\n            <p style=\"font-size: 11px; margin-top: 4px;\">Стається, коли local + remote обидва змінили. Вирішення: <code>git config pull.rebase=true</code> глобально або локально.</p>\n          </div>\n        </div><div class=\"section\" id=\"hooks\">\n          <h2 class=\"section-title\"><span>🪝</span> Git Hooks</h2>\n          <p>Scripts, які запускаються на певних Git events. Зберігаються у <code>.git/hooks/</code>.</p>\n          <h3 class=\"topic\">Client Hooks</h3>\n          <div class=\"table-wrap\">\n            <table>\n              <tr><th>Hook</th><th>Коли</th><th>Use Case</th></tr>\n              <tr><td><code>pre-commit</code></td><td>Before commit creation</td><td>Lint, format check</td></tr>\n              <tr><td><code>prepare-commit-msg</code></td><td>After commit msg created</td><td>Modify message (JIRA ID)</td></tr>\n              <tr><td><code>commit-msg</code></td><td>After message is written</td><td>Validate format (conventional commits)</td></tr>\n              <tr><td><code>pre-push</code></td><td>Before push to remote</td><td>Run tests, prevent WIP push</td></tr>\n            </table>\n          </div>\n          <h3 class=\"topic\">Server Hooks</h3>\n          <p>На сервері (GitHub Actions, GitLab Runner). Тільки для bare repos:</p>\n          <pre>pre-receive   <span class=\"cmt\"># Before push accepted</span>\npost-receive  <span class=\"cmt\"># After successful push (deploy trigger)</span>\nupdate        <span class=\"cmt\"># Per-ref validation</span></pre>\n          <h3 class=\"topic\">Husky + lint-staged (modern approach)</h3>\n          <p>Замість bash scripts у `.git/hooks/` — використовуй JavaScript (husky) + lint-staged (runs only on staged files):</p>\n          <pre><span class=\"cmt\"># 1. Install</span>\nnpm install husky lint-staged --save-dev\nnpx husky install\n\n<span class=\"cmt\"># 2. Add hook</span>\nnpx husky add .husky/pre-commit \"npx lint-staged\"\n\n<span class=\"cmt\"># 3. package.json</span>\n\"lint-staged\": {\n  \"*.js\": \"eslint --fix\",\n  \"*.ts\": \"tsc --noEmit\",\n  \"*.md\": \"prettier --write\"\n}</pre>\n          <div class=\"alert good\">\n            ✓ <strong>Переваги husky:</strong> Hooks зберігаються в repo (.husky/ як звичайні файли), кожен contributor автоматично отримує при install.\n          </div>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge cases:</strong>\n            <ul class=\"list\" style=\"font-size: 11px;\">\n              <li>Hooks НЕ exec при `git commit --no-verify` (bypass!)</li>\n              <li>Slow pre-commit → блокує разробника. Використовуй lint-staged (тільки staged files)</li>\n              <li>Hooks НЕ exec у CI/CD (server-side validation краще)</li>\n              <li>Hooks не передаються через `.git/hooks/` (Git ігнорує). Husky вирішує через `.husky/` у repo</li>\n            </ul>\n          </div>\n        </div><div class=\"section\" id=\"submodules\">\n          <h2 class=\"section-title\"><span>📦</span> Submodules & Subtrees</h2>\n          <h3 class=\"topic\">Submodule (reference to external repo)</h3>\n          <p>Вкладаємо інший Git repo у папку як dependency. Зберігається як ref (commit SHA), не вся історія.</p>\n          <pre>git submodule add https://github.com/lib/awesome.git libs/awesome\n<span class=\"cmt\"># Creates .gitmodules (track in git) + libs/awesome/</span>\n\n<span class=\"cmt\"># In new clone:</span>\ngit submodule update --init --recursive\n\n<span class=\"cmt\"># Update submodule to latest</span>\ncd libs/awesome && git pull origin main\ncd .. && git add libs/awesome && git commit</pre>\n\n          <h3 class=\"topic\">Submodule Edge Cases (складно!)</h3>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Detached HEAD in submodule:</strong> Після `git submodule update`, submodule у detached HEAD state (HEAD вказує на commit SHA, не branch) → коміти на detached HEAD → загубляються при update!\n            <pre style=\"margin-top: 4px;\">cd libs/awesome && git checkout main  <span class=\"cmt\"># Fix it</span></pre>\n          </div>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Contributor забув push submodule:</strong> Parent вказує на SHA в submodule, якого нема на remote → `git submodule update` fails для інших.\n          </div>\n          <div class=\"alert warn\">\n            ⚠️ <strong>--remote flag:</strong> `git submodule update --remote` → update to latest remote (не до фіксованого SHA в parent). Від обережно — може дати unexpected changes.\n          </div>\n          <p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Nested submodules:</strong> `git clone --recurse-submodules` (новіший синтаксис `--recursive`) → recursive initialization.</p>\n\n          <h3 class=\"topic\">Subtree (merge history, simpler)</h3>\n          <p>Вбудовує ВСЮ історію іншого repo як папку. Складніше для updates, но простіше для collaborators.</p>\n          <pre>git subtree add --prefix=libs/awesome https://github.com/lib/awesome.git main\ngit subtree pull --prefix=libs/awesome https://github.com/lib/awesome.git main\ngit subtree push --prefix=libs/awesome https://github.com/lib/awesome.git main</pre>\n\n          <div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong>Submodule</strong>\n              <ul class=\"list\" style=\"font-size: 11px;\">\n                <li>History: тільки ref SHA</li>\n                <li>Requires: understanding submodules</li>\n                <li>Clone: --recurse-submodules</li>\n                <li>Update: git submodule update</li>\n              </ul>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong>Subtree</strong>\n              <ul class=\"list\" style=\"font-size: 11px;\">\n                <li>History: повна historія local</li>\n                <li>Requires: nothing special</li>\n                <li>Clone: normal clone</li>\n                <li>Update: git subtree pull</li>\n              </ul>\n            </div>\n          </div>\n        </div><div class=\"section\" id=\"bisect\">\n          <h2 class=\"section-title\"><span>🔬</span> Bisect & Debugging <span class=\"tag tag-key\">KEY</span></h2>\n          <h3 class=\"topic\">git bisect (binary search O(log N))</h3>\n          <p>Автоматично знаходить commit, який ввів bug, через бінарний пошук. О(log N) складність замість О(N)!</p>\n          <pre>git bisect start\ngit bisect bad            <span class=\"cmt\"># HEAD contains bug</span>\ngit bisect good v1.0      <span class=\"cmt\"># v1.0 was good</span>\n<span class=\"cmt\"># Git checks out middle commit</span>\n\n<span class=\"cmt\"># Test it:</span>\ngit bisect good           <span class=\"cmt\"># This commit is OK</span>\n<span class=\"cmt\"># or:</span>\ngit bisect bad            <span class=\"cmt\"># This commit has bug</span>\n\n<span class=\"cmt\"># Repeat (binary search converges)</span>\ngit bisect reset          <span class=\"cmt\"># Exit bisect, return to orig branch</span></pre>\n\n          <h3 class=\"topic\">Automated Bisect (git bisect run)</h3>\n          <p>Запускає test script на кожному коміті автоматично. Test мусить return 0 (good) або non-zero (bad):</p>\n          <pre>git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0\ngit bisect run npm test     <span class=\"cmt\"># Automation!</span>\n<span class=\"cmt\"># Output: \"commit abc123 first bad commit\"</span></pre>\n\n          <h3 class=\"topic\">Bisect Edge Cases</h3>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Merge commits:</strong> Git може обрати merge commit для тестування (складно). Використовуй `git bisect skip`.\n          </div>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Slow tests:</strong> Якщо тести на кожен commit == 1 хв × log(1000) commits = ~10 хвилин. Accelerate або skip.\n          </div>\n          <pre>git bisect skip              <span class=\"cmt\"># Skip merge commit</span>\ngit bisect skip abc123 def456  <span class=\"cmt\"># Skip range</span></pre>\n          <h3 class=\"topic\">git blame (who changed what)</h3>\n          <pre>git blame src/app.js\n<span class=\"cmt\">abc123d Петро    (2024-01-15) exports.start = function() {</span>\n<span class=\"cmt\">def456e Марія    (2024-01-20)   console.log('Starting...')</span>\n\ngit blame -L 10,20 file.js    <span class=\"cmt\"># Only lines 10-20</span>\ngit blame -w file.js          <span class=\"cmt\"># Ignore whitespace changes</span>\ngit blame -C file.js          <span class=\"cmt\"># Copy detection (moved code)</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge case:</strong> Blame показує merge commit (не оригінальний автор) → використовуй `git log -p` для глибокого аналізу.\n          </div>\n\n          <h3 class=\"topic\">Pickaxe search (git log -S \"string\")</h3>\n          <p>Знаходить commits, де кількість рядка змінилась (add/delete):</p>\n          <pre>git log -S \"secretToken\" --oneline   <span class=\"cmt\"># Shows all commits with this string change</span>\ngit log -p -S \"token\"                 <span class=\"cmt\"># With patch diff</span>\ngit log -G \"pattern\" --                 <span class=\"cmt\"># Regex version</span></pre>\n\n          <h3 class=\"topic\">git log Advanced</h3>\n          <pre>git log --author=\"Петро\" --since=\"2 weeks ago\"\ngit log --grep=\"fix\" --oneline\ngit log -p --follow src/file.js     <span class=\"cmt\"># Follow renames</span>\ngit log --diff-filter=D --name-only  <span class=\"cmt\"># Only deleted files</span>\ngit log --all --graph --oneline --decorate  <span class=\"cmt\"># Visual tree</span></pre>\n\n          <h3 class=\"topic\">Debugging Mindmap</h3>\n          <div class=\"alert good\">\n            ✓ <strong>Which commit introduced bug?</strong> → `git bisect`<br>\n            ✓ <strong>Who changed this line?</strong> → `git blame`<br>\n            ✓ <strong>When was this string added?</strong> → `git log -S \"string\"`<br>\n            ✓ <strong>Visualize branch history?</strong> → `git log --all --graph`<br>\n            ✓ <strong>Find file history?</strong> → `git log -p --follow file`\n          </div>\n        </div><div class=\"section\" id=\"tags\">\n          <h2 class=\"section-title\"><span>🏷️</span> Tags & Releases</h2>\n          <h3 class=\"topic\">Lightweight vs Annotated Tags</h3>\n          <div class=\"table-wrap\">\n            <table>\n              <tr><th>Type</th><th>Storage</th><th>Create</th><th>Use case</th></tr>\n              <tr><td>Lightweight</td><td>Just ref SHA (pointer)</td><td><code>git tag v1.0</code></td><td>Local, temporary</td></tr>\n              <tr><td>Annotated</td><td>Full Git object (tagger, msg, date)</td><td><code>git tag -a v1.0 -m \"Release\"</code></td><td>Public releases, signing</td></tr>\n            </table>\n          </div>\n\n          <h3 class=\"topic\">Signing & Verification (GPG)</h3>\n          <pre>git tag -s v1.0 -m \"Release v1.0\"    <span class=\"cmt\"># Sign with GPG key</span>\ngit tag -v v1.0                       <span class=\"cmt\"># Verify signature</span>\ngit verify-tag v1.0                   <span class=\"cmt\"># Detailed verification</span></pre>\n\n          <h3 class=\"topic\">Semantic Versioning (MAJOR.MINOR.PATCH-PRERELEASE)</h3>\n          <pre>v1.2.3          - MAJOR=1 (breaking), MINOR=2 (feature), PATCH=3 (bugfix)\nv1.2.3-alpha.1  - Pre-release (alpha, beta, rc)\nv1.2.3+20240115 - Build metadata (optional)</pre>\n          <p><strong>Rules:</strong> `v1.0.0` is major release. `v0.x.x` = unstable (breaking changes OK without major bump). Повинна бути консистентна (з/без `v` prefix).</p>\n\n          <h3 class=\"topic\">git describe (auto-versioning)</h3>\n          <p>Знаходить найближчий tag до HEAD, показує distance + hash:</p>\n          <pre>git describe --tags                    <span class=\"cmt\"># v1.2.0-5-gabc123</span>\n<span class=\"cmt\"># Meaning: 5 commits after v1.2.0, hash abc123</span>\n\ngit describe --tags --always --abbrev=0  <span class=\"cmt\"># Just tag name</span></pre>\n\n          <h3 class=\"topic\">Changelog & Conventional Commits</h3>\n          <p><strong>Conventional Commits:</strong> Стандартизований format для commit messages:</p>\n          <pre><span class=\"cmt\"># Pattern: type(scope): description</span>\nfeat(auth): add JWT support\nfix(api): handle null responses\ndocs: update README\nBREAKING CHANGE: rename endpoint /users → /auth/users</pre>\n          <p>З conventional commits → можна auto-bump semver + generate changelog:</p>\n          <pre>feat:  → MINOR bump\nfix:   → PATCH bump\nBREAKING CHANGE: → MAJOR bump</pre>\n          <p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Інструменти:</strong> `semantic-release`, `standard-version`, `changelogen` автоматизують версіонування + changelog.</p>\n\n          <h3 class=\"topic\">Tags не fetchяться за замовчуванням</h3>\n          <pre>git fetch --tags              <span class=\"cmt\"># Fetch all tags explicitly</span>\ngit fetch origin tag v1.0     <span class=\"cmt\"># Fetch single tag</span>\ngit push origin v1.0          <span class=\"cmt\"># Push single tag</span>\ngit push origin --tags        <span class=\"cmt\"># Push all tags</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge case: Moving a tag</strong> → `git tag -f v1.0 HEAD` (force), потім `git push --force origin v1.0`. Небажано для public tags!\n          </div>\n        </div><div class=\"section\" id=\"large-repos\">\n          <h2 class=\"section-title\"><span>🚀</span> Large Repos & Performance <span class=\"tag tag-pit\">ADVANCED</span></h2>\n          <p>Massive repos (Monorepos — 100GB+, millions commits, 1M+ files) потребують спеціальних techniques. Альтернатива: split на microrepos.</p>\n\n          <h3 class=\"topic\">Shallow Clone (--depth, --single-branch)</h3>\n          <p>Завантажує тільки недавню історію (не весь DAG):</p>\n          <pre>git clone --depth 1 https://github.com/huge/repo.git        <span class=\"cmt\"># Only latest</span>\ngit clone --depth 50 --single-branch https://github.com/huge/repo.git  <span class=\"cmt\"># Faster</span>\n\ngit fetch --deepen 10                                              <span class=\"cmt\"># Expand history</span>\ngit fetch --unshallow                                              <span class=\"cmt\"># Full history</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge cases shallow clone:</strong>\n            <ul class=\"list\" style=\"font-size: 11px;\">\n              <li><code>git log</code> показує порізану історію</li>\n              <li>Push з shallow → операції можуть fail (parent не знайденаbez спільної історії)</li>\n              <li><code>git describe</code> на shallow → непередбачувані результати</li>\n            </ul>\n          </div>\n\n          <h3 class=\"topic\">Sparse Checkout (download only needed dirs)</h3>\n          <p>Завантажує тільки конкретні папки, не весь repo. Значно прискорює clone/checkout:</p>\n          <pre>git clone --no-checkout https://github.com/huge/repo.git\ncd repo && git sparse-checkout init\ngit sparse-checkout set \"src/components/**\" \"docs/**\"\ngit checkout main\n<span class=\"cmt\"># Disk має тільки src/components/ та docs/ (решта virtual)</span></pre>\n          <p style=\"font-size: 12px;\">Cone mode (fast pattern matching) vs full regex. `init --cone` по замовчуванню.</p>\n\n          <h3 class=\"topic\">Git Worktree (parallel work, no context switch)</h3>\n          <p>Кілька working trees від одного repo (без context switch):</p>\n          <pre>git worktree add ../app-v2 main        <span class=\"cmt\"># New worktree</span>\ngit worktree add -b hotfix ../fixes main  <span class=\"cmt\"># New branch too</span>\n\ngit worktree list                          <span class=\"cmt\"># All worktrees</span>\ngit worktree lock ../app-v2               <span class=\"cmt\"># Prevent removal</span>\ngit worktree remove ../app-v2             <span class=\"cmt\"># Delete worktree</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge case: Can't checkout same branch twice</strong> — один worktree per branch. Якщо один worktree на main, другий НЕ може бути на main.\n          </div>\n\n          <h3 class=\"topic\">Git LFS (Large File Storage)</h3>\n          <p>Для бінарних файлів (images, videos, models). Зберігає pointer у Git, файли на LFS сервері:</p>\n          <pre>git lfs install                  <span class=\"cmt\"># One-time setup</span>\ngit lfs track \"*.psd\" \"*.mp4\"   <span class=\"cmt\"># Add to .gitattributes</span>\ngit add *.psd && git commit     <span class=\"cmt\"># Pointer committed, not file</span>\n\ngit lfs fetch --all             <span class=\"cmt\"># Download all LFS files</span>\ngit lfs migrate import --include=\"*.psd\"  <span class=\"cmt\"># Convert existing history</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge case: LFS not installed contributor:</strong> Клонує файли як text pointers (не бінарні) → parse errors. LFS мусить бути у всіх.\n          </div>\n\n          <h3 class=\"topic\">Scalar (Microsoft's monorepo solution)</h3>\n          <p>Built-in optimizations для giant Azure Repos (millions commits). Покращує `git status`, sparse-checkout, incremental indexing.</p>\n          <pre>scalar clone https://github.com/Azure/azure-sdk-for-go.git\n<span class=\"cmt\"># Auto-config: sparse-checkout, partial-clone, virtual filesystem</span></pre>\n        </div><div class=\"section\" id=\"config\">\n          <h2 class=\"section-title\"><span>⚙️</span> Advanced Config & Aliases</h2>\n          <h3 class=\"topic\">Config Levels & Priority</h3>\n          <p>Git шукає config у порядку (останній перебиває попередній):</p>\n          <pre>1. /etc/gitconfig           (system, all users)\n2. ~/.gitconfig             (global, your account)\n3. .git/config              (local, this repo)\n4. .git/config.worktree     (worktree-specific)\n\ngit config --system ...     <span class=\"cmt\"># System level (need sudo)</span>\ngit config --global ...     <span class=\"cmt\"># Your account</span>\ngit config --local ...      <span class=\"cmt\"># This repo (default)</span>\ngit config --show-origin user.name  <span class=\"cmt\"># See which file</span></pre>\n\n          <h3 class=\"topic\">Conditional Includes (per-directory config)</h3>\n          <p>Різні email/credentials залежно від папки:</p>\n          <pre><span class=\"cmt\"># ~/.gitconfig</span>\n[includeIf \"gitdir:~/work/\"]\n  path = ~/.gitconfig-work\n\n<span class=\"cmt\"># ~/.gitconfig-work</span>\n[user]\n  name = John Doe Work\n  email = john@company.com\n  signingKey = work-key</pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Edge case: First commit with wrong email</strong> → Conditional includes не reworked previous commits. Придетсяамед + force-push.\n          </div>\n\n          <h3 class=\"topic\">Useful Core Settings</h3>\n          <pre><span class=\"cmt\"># ~/.gitconfig</span>\n[core]\n  editor = code --wait      <span class=\"cmt\"># VS Code editor</span>\n  pager = delta             <span class=\"cmt\"># Better diffs (npm install delta)</span>\n  autocrlf = input          <span class=\"cmt\"># Linux/Mac (avoid CRLF)</span>\n  whitespace = fix,-indent-with-non-tab,trailing-space\n\n[push]\n  default = current         <span class=\"cmt\"># Push current branch</span>\n\n[pull]\n  rebase = true             <span class=\"cmt\"># Pull with rebase (not merge)</span>\n\n[merge]\n  conflictstyle = diff3     <span class=\"cmt\"># 3-way diff in conflicts</span>\n\n[init]\n  defaultBranch = main      <span class=\"cmt\"># New repos use main, not master</span></pre>\n\n          <h3 class=\"topic\">Aliases (shortcuts)</h3>\n          <pre><span class=\"cmt\"># ~/.gitconfig</span>\n[alias]\n  st = status\n  co = checkout\n  br = branch\n  ci = commit\n  unstage = restore --staged\n  last = log -1 HEAD\n  lg = log --graph --oneline --all --decorate\n  amend = commit --amend --no-edit\n  contrib = shortlog --summary --numbered\n  undo = reset --soft HEAD~1\n  fixup = !git add -A && git commit --amend --no-edit\n  force = push --force-with-lease</pre>\n\n          <h3 class=\"topic\">.gitignore Patterns & Edge Cases</h3>\n          <pre>*.log                   <span class=\"cmt\"># All .log files</span>\n/dist/                  <span class=\"cmt\"># Only dist/ in root</span>\nnode_modules/           <span class=\"cmt\"># Anywhere in tree</span>\n!important.log          <span class=\"cmt\"># Exception (MUST negate)</span>\n**/*.tmp                <span class=\"cmt\"># Recursive any depth</span>\n.env                    <span class=\"cmt\"># Environment secrets</span>\n*.swp                   <span class=\"cmt\"># Editor temps</span></pre>\n          <div class=\"alert warn\">\n            ⚠️ <strong>Файл вже tracked:</strong> `.gitignore` не влияє на уже-скомічені файли. Спочатку видалити:\n            <pre>git rm --cached file.txt  <span class=\"cmt\"># Remove from index, keep locally</span></pre>\n          </div>\n          <pre>git check-ignore -v file.txt  <span class=\"cmt\"># Debug: why is it ignored?</span></pre>\n\n          <h3 class=\"topic\">.gitattributes (line endings, diffs, merges)</h3>\n          <pre><span class=\"cmt\"># Auto line-ending conversion</span>\n* text=auto               <span class=\"cmt\"># Text files normalize on commit</span>\n*.js eol=lf               <span class=\"cmt\"># JS always Unix line-endings</span>\n\n<span class=\"cmt\"># Custom diff for binary files</span>\n*.psd diff=exiftool       <span class=\"cmt\"># PSD diffable via exif</span>\n*.docx diff=word          <span class=\"cmt\"># Word document diff</span>\n\n<span class=\"cmt\"># Merge strategy for specific files</span>\n*.json merge=union        <span class=\"cmt\"># Union merge (no conflicts)</span></pre>\n\n          <h3 class=\"topic\">Global .gitignore (per-user)</h3>\n          <p>Ignored everywhere для твоїх інструментів (IDE, OS files):</p>\n          <pre><span class=\"cmt\"># ~/.gitignore_global</span>\n.DS_Store               <span class=\"cmt\"># macOS</span>\n.vscode/                <span class=\"cmt\"># VS Code local settings</span>\n*.swp *.swo             <span class=\"cmt\"># Vim temps</span>\n.idea/                  <span class=\"cmt\"># JetBrains IDE</span>\n\n<span class=\"cmt\"># Tell git to use it</span>\ngit config --global core.excludesfile ~/.gitignore_global</pre>\n        </div><script src=\"../sidebar.js\"></script><script>\n    const contentEl = document.querySelector('.content');\n    const topicLinks = document.querySelectorAll('.topic-link');\n    const sections = document.querySelectorAll('.section');\n\n    const observer = new IntersectionObserver(\n      (entries) => {\n        entries.forEach(entry => {\n          if (entry.isIntersecting) {\n            const id = entry.target.id;\n            topicLinks.forEach(link => {\n              link.classList.toggle('active', link.dataset.target === id);\n            });\n          }\n        });\n      },\n      { root: contentEl, threshold: 0.4 }\n    );\n\n    sections.forEach(section => observer.observe(section));\n\n    topicLinks.forEach(link => {\n      link.addEventListener('click', () => {\n        const targetId = link.dataset.target;\n        const section = document.getElementById(targetId);\n        if (section) {\n          contentEl.scrollTo({ top: section.offsetTop, behavior: 'smooth' });\n        }\n      });\n    });\n  </script>"
        }
      ]
    },
    {
      "id": "history-rewriting-advanced",
      "title": "🕐 History Rewriting ADVANCED",
      interviewQuestions: [
        {
          "question": "Чим <code>git filter-branch</code>/<code>git filter-repo</code> відрізняється від звичайного interactive rebase за масштабом операції?",
          "answer": "Interactive rebase переписує невелику кількість останніх комітів (типово — комітів однієї feature-гілки). <code>filter-repo</code>/<code>filter-branch</code> переписує <strong>всю</strong> історію репозиторію за певним правилом (наприклад, видалити файл із секретом з усіх комітів коли-небудь) — це набагато масштабніша й ризикованіша операція, що змінює хеші абсолютно всіх наступних комітів і вимагає координації з усією командою для повторного клонування репозиторію."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Переписати або очистити commit history. ВАЖЛИВО: тільки на non-public гілках, поки не pushed!</p><h3 class=\"topic\">git commit --amend</h3><p>Модифікує останній commit HEAD. Можна додати файли або змінити message. Амінд змінює SHA!</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git add forgotten_file.txt\ngit commit --amend --no-edit       # Add file, keep message\n\ngit commit --amend -m \"Better msg\"  # Change message only\n\ngit commit --amend --allow-empty    # Amend empty commit"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case:</strong> Amend НЕ можна для старіших комітів (тільки HEAD) → використовуй `rebase -i` для інших. Якщо уже pushed → потрібен force-with-lease.\n          </div><h3 class=\"topic\">git reflog (рятівник)</h3><p>Журнал всіх рухів HEAD. Рятує, якщо скасував неправильний reset/rebase. Reflog локальний (не передається через clone)!</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git reflog                         # Show all HEAD movements\nba2d3c6 HEAD@{0}: reset: moving to ba2d3c6\na1b2c3d HEAD@{1}: commit: Fix critical bug\n7g8h9i0 HEAD@{2}: rebase: finished\nxyz1234 HEAD@{3}: checkout: moving from main to feature\n\ngit reset --hard a1b2c3d    # Restore to that commit!\ngit reflog expire --expire=now --all    # Clear reflog (90d default)"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\">\n            ✓ <strong>Recovery lifesaver:</strong> Навіть після `git reset --hard` або `git rebase --abort` → reflog рятує!\n          </div><p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>TTL:</strong> Reflog keep 90 дні (config: `gc.reflogExpire`), orphaned commits — 30 днів, потім `git gc` видаляє.</p><h3 class=\"topic\">git filter-repo (Remove from All History)</h3><p><strong>Сценарій:</strong> Акцидентально committed secret / великий binary file → потрібно видалити з ВСІЄЇ історії (всіх коміти).</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Install: pip install git-filter-repo\ngit filter-repo --path config/secrets.yml --invert-paths\n# Removes secrets.yml від всіх commits\n\ngit filter-repo --path large_file.iso --invert-paths\n# Remove binary file"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Dangerous operation!</strong> Filter-repo переписує ВСІ SHA-1, потім потрібен:\n            <ul class=\"list\" style=\"font-size: 11px;\">\n              <li>Force push до remote (всі collaborators affected)</li>\n              <li>Всіх collaborators повинні `git clone` знов (не pull!)</li>\n              <li>GitHub може кешувати старі versions (secret rotation обов'язкова!)</li>\n            </ul>\n          </div><p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Альтернатива:</strong> BFG Repo Cleaner (Java-based, простіший синтаксис для secrets/large files).</p><div class=\"alert good\">\n            ✓ <strong>Не забути:</strong> Якщо secret скомітив → крім видалення з git, обов'язково зробити SECRET ROTATION (змінити пароль/API key)!\n          </div>"
        }
      ]
    },
    {
      "id": "cherry-pick-stash",
      "title": "🍒 Cherry-pick & Stash",
      interviewQuestions: [
        {
          "question": "Коли варто використовувати <code>cherry-pick</code> замість повного merge чи rebase гілки?",
          "answer": "<code>cherry-pick</code> застосовують, коли потрібен лише <strong>один конкретний</strong> коміт з іншої гілки (наприклад, терміновий hotfix, який уже є в feature-гілці, але сама гілка ще не готова до повного злиття), без перенесення всієї історії тієї гілки — типовий кейс: бекпорт виправлення в release-гілку."
        },
        {
          "question": "Чим <code>git stash</code> відрізняється від коміту в тимчасову гілку для збереження незавершеної роботи?",
          "answer": "<code>stash</code> зберігає незакомічені зміни (working directory + опційно index) в окремому, невидимому в звичайній історії сховищі, дозволяючи миттєво повернутись до чистого working directory (наприклад, щоб терміново перемкнутись на іншу гілку) і потім відновити ці зміни через <code>stash pop</code> — швидше й менш «шумно» для історії, ніж створювати WIP-коміт і потім його скасовувати."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Cherry-pick (copy commits between branches)</h3><p>Копіює один/кілька коміти з однієї гілки на іншу. Переносить changes, але НЕ гілку.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git cherry-pick abc123              # Copy single commit\ngit cherry-pick abc123..xyz789      # Range (abc123, xyz789]\ngit cherry-pick abc123 def456 ghi789 # Multiple specific\n\ngit cherry-pick -n abc123           # Stage, no commit yet\ngit cherry-pick -x abc123           # Add \"cherry picked from\" footer"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Use cases:</strong> Hotfix на stable branch, backport fix до older version, selective feature merge.</p><h3 class=\"topic\">Cherry-pick Edge Cases</h3><div class=\"alert warn\">\n            ⚠️ <strong>Cherry-pick merge commit:</strong> Merge commit має 2 parents → треба вказати `-m 1` (mainline):\n            <pre>git cherry-pick -m 1 merge-commit-sha</pre>\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Empty cherry-pick:</strong> Якщо changes вже в target branch → git пропускає. Використовуй `--allow-empty`.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Cherry-pick duplication:</strong> Якщо потім merge тієї ж гілки → changes appear TWICE (cherry-pick + merge). Уникайте cherry-pick + merge на сам коміті!\n          </div><h3 class=\"topic\">Stash (Temporary Storage)</h3><p>Зберігає незакомічені зміни (WD + staging) у буфер. Корисно для switch гілок без коміту.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git stash push -m \"WIP: feature X\"   # Save with message\ngit stash list                        # List all stashes\ngit stash pop stash@{0}               # Apply + delete from stash\ngit stash apply stash@{0}             # Apply, keep in stash\ngit stash drop stash@{0}              # Delete stash entry\ngit stash show -p stash@{0}           # View diff without apply"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Stash Advanced</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git stash push -p                   # Interactive (pick hunks)\ngit stash push -u                   # Include untracked files\ngit stash branch new-branch         # Create branch from stash"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Stash pop конфлікт:</strong> Якщо stash не можна apply чисто → залишається у stash (не видаляється!). Потім `git stash drop` вручну.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Stash на неправильній гілці:</strong> Якщо apply stash на іншій гілці, ніж де його created → конфлікти. Краще `git stash branch` для безпеки.\n          </div><div class=\"alert good\">\n            ✓ <strong>Debugging tip:</strong> `git stash` можна використовувати для чистого тестування: stash → test → pop.\n          </div>"
        }
      ]
    },
    {
      "id": "remote-operations",
      "title": "🌐 Remote Operations",
      interviewQuestions: [
        {
          "question": "Чим <code>git fetch</code> відрізняється від <code>git pull</code>, і чому досвідчені розробники часто віддають перевагу явному fetch + merge/rebase?",
          "answer": "<code>fetch</code> лише завантажує нові коміти з remote у локальні remote-tracking гілки, не чіпаючи поточну робочу гілку. <code>pull</code> — це <code>fetch</code> одразу з автоматичним merge (або rebase, залежно від конфігурації) у поточну гілку. Явний <code>fetch</code> дозволяє спершу переглянути, що змінилось (<code>git log HEAD..origin/main</code>), перш ніж вирішувати, як саме інтегрувати зміни — менше несподіванок, ніж автоматичний pull."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Origin vs Upstream</h3><div class=\"grid2\">\n            <div class=\"card\">\n              <h4>Origin</h4>\n              <p>Твоя копія repo (зазвичай на GitHub, твій fork). Default remote.</p>\n            </div>\n            <div class=\"card\">\n              <h4>Upstream</h4>\n              <p>Оригінальний repo (напр., корпоративний). Для синхронізації з main project.</p>\n            </div>\n          </div><h3 class=\"topic\">Fetch vs Pull</h3><div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong><code>git fetch</code></strong>\n              <p>Завантажує remote commits у <code>origin/branch</code>, НЕ merge у local. Безпечна операція.</p>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 6px;\">\n              <strong><code>git pull</code></strong>\n              <p><code>git fetch</code> + <code>git merge</code>. Автоматично merge remote.</p>\n            </div>\n          </div><h3 class=\"topic\">Fork Workflow (open-source)</h3><div class=\"alert good\">\n            ✓ Fork upstream → clone your fork → add upstream remote → feature branch → pull request → upstream review & merge\n          </div>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git remote add upstream https://github.com/original/repo.git\ngit fetch upstream\ngit checkout -b fix/bug upstream/main\n# Make commits\ngit push origin fix/bug        # Push на твої fork\n# Then open PR на upstream"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Remote Tracking & Divergent Branches</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git branch -u origin/main              # Set tracking\ngit branch -vv                         # Show tracking info\ngit push -u origin feature             # Create + set tracking\ngit push --all                         # Push all branches\ngit remote prune origin                # Remove stale refs\ngit fetch --prune                      # Fetch + prune"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case: Diverged branches</strong>\n            <pre>fatal: Need to specify how to reconcile divergent branches.\nYou can do so by running one of the following as the first operation\nbefore your next pull:\n  git pull --rebase\n  git pull --merge</pre>\n            <p style=\"font-size: 11px; margin-top: 4px;\">Стається, коли local + remote обидва змінили. Вирішення: <code>git config pull.rebase=true</code> глобально або локально.</p>\n          </div>"
        }
      ]
    },
    {
      "id": "git-hooks",
      "title": "🪝 Git Hooks",
      interviewQuestions: [
        {
          "question": "Чим client-side git hooks (наприклад, pre-commit) відрізняються від CI-перевірок, і чи можна покладатись лише на них?",
          "answer": "Client-side хуки виконуються локально на машині розробника <em>до</em> того, як зміни потраплять у репозиторій (лінтинг, форматування, швидкі тести) — швидкий feedback, але їх можна обійти (<code>--no-verify</code>) або вони просто не встановлені в іншого розробника, оскільки хуки не версіонуються разом з репозиторієм за замовчуванням. Тому client-side хуки — зручність для UX розробки, а не гарантія якості; фінальний бар'єр завжди мають забезпечувати CI-перевірки на сервері."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Scripts, які запускаються на певних Git events. Зберігаються у <code>.git/hooks/</code>.</p><h3 class=\"topic\">Client Hooks</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Hook</th><th>Коли</th><th>Use Case</th></tr>\n              <tr><td><code>pre-commit</code></td><td>Before commit creation</td><td>Lint, format check</td></tr>\n              <tr><td><code>prepare-commit-msg</code></td><td>After commit msg created</td><td>Modify message (JIRA ID)</td></tr>\n              <tr><td><code>commit-msg</code></td><td>After message is written</td><td>Validate format (conventional commits)</td></tr>\n              <tr><td><code>pre-push</code></td><td>Before push to remote</td><td>Run tests, prevent WIP push</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Server Hooks</h3><p>На сервері (GitHub Actions, GitLab Runner). Тільки для bare repos:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "pre-receive   # Before push accepted\npost-receive  # After successful push (deploy trigger)\nupdate        # Per-ref validation"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Husky + lint-staged (modern approach)</h3><p>Замість bash scripts у `.git/hooks/` — використовуй JavaScript (husky) + lint-staged (runs only on staged files):</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# 1. Install\nnpm install husky lint-staged --save-dev\nnpx husky install\n\n# 2. Add hook\nnpx husky add .husky/pre-commit \"npx lint-staged\"\n\n# 3. package.json\n\"lint-staged\": {\n  \"*.js\": \"eslint --fix\",\n  \"*.ts\": \"tsc --noEmit\",\n  \"*.md\": \"prettier --write\"\n}"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert good\">\n            ✓ <strong>Переваги husky:</strong> Hooks зберігаються в repo (.husky/ як звичайні файли), кожен contributor автоматично отримує при install.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Edge cases:</strong>\n            <ul class=\"list\" style=\"font-size: 11px;\">\n              <li>Hooks НЕ exec при `git commit --no-verify` (bypass!)</li>\n              <li>Slow pre-commit → блокує разробника. Використовуй lint-staged (тільки staged files)</li>\n              <li>Hooks НЕ exec у CI/CD (server-side validation краще)</li>\n              <li>Hooks не передаються через `.git/hooks/` (Git ігнорує). Husky вирішує через `.husky/` у repo</li>\n            </ul>\n          </div>"
        }
      ]
    },
    {
      "id": "submodules-subtrees",
      "title": "📦 Submodules & Subtrees",
      interviewQuestions: [
        {
          "question": "Чим git submodule відрізняється від monorepo-підходу для розділення коду між кількома репозиторіями?",
          "answer": "Submodule зберігає посилання на конкретний коміт зовнішнього репозиторію всередині основного — кожен репозиторій лишається незалежним з власною історією, але синхронізація версій вимагає явного оновлення посилання і легко забувається/розходиться. Monorepo тримає весь код в одному репозиторії з єдиною історією — простіше атомарно змінювати кілька пакетів одночасно, але репозиторій зростає, і потрібні спеціальні інструменти (Nx, Turborepo) для інкрементальних білдів."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Submodule (reference to external repo)</h3><p>Вкладаємо інший Git repo у папку як dependency. Зберігається як ref (commit SHA), не вся історія.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git submodule add https://github.com/lib/awesome.git libs/awesome\n# Creates .gitmodules (track in git) + libs/awesome/\n\n# In new clone:\ngit submodule update --init --recursive\n\n# Update submodule to latest\ncd libs/awesome && git pull origin main\ncd .. && git add libs/awesome && git commit"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Submodule Edge Cases (складно!)</h3><div class=\"alert warn\">\n            ⚠️ <strong>Detached HEAD in submodule:</strong> Після `git submodule update`, submodule у detached HEAD state (HEAD вказує на commit SHA, не branch) → коміти на detached HEAD → загубляються при update!\n            <pre style=\"margin-top: 4px;\">cd libs/awesome && git checkout main  <span class=\"cmt\"># Fix it</span></pre>\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Contributor забув push submodule:</strong> Parent вказує на SHA в submodule, якого нема на remote → `git submodule update` fails для інших.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>--remote flag:</strong> `git submodule update --remote` → update to latest remote (не до фіксованого SHA в parent). Від обережно — може дати unexpected changes.\n          </div><p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Nested submodules:</strong> `git clone --recurse-submodules` (новіший синтаксис `--recursive`) → recursive initialization.</p><h3 class=\"topic\">Subtree (merge history, simpler)</h3><p>Вбудовує ВСЮ історію іншого repo як папку. Складніше для updates, но простіше для collaborators.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git subtree add --prefix=libs/awesome https://github.com/lib/awesome.git main\ngit subtree pull --prefix=libs/awesome https://github.com/lib/awesome.git main\ngit subtree push --prefix=libs/awesome https://github.com/lib/awesome.git main"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong>Submodule</strong>\n              <ul class=\"list\" style=\"font-size: 11px;\">\n                <li>History: тільки ref SHA</li>\n                <li>Requires: understanding submodules</li>\n                <li>Clone: --recurse-submodules</li>\n                <li>Update: git submodule update</li>\n              </ul>\n            </div>\n            <div style=\"background: #1a1f2e; border-left: 4px solid #10b981; padding: 12px; border-radius: 6px;\">\n              <strong>Subtree</strong>\n              <ul class=\"list\" style=\"font-size: 11px;\">\n                <li>History: повна historія local</li>\n                <li>Requires: nothing special</li>\n                <li>Clone: normal clone</li>\n                <li>Update: git subtree pull</li>\n              </ul>\n            </div>\n          </div>"
        }
      ]
    },
    {
      "id": "bisect-debugging-key",
      "title": "🔬 Bisect & Debugging KEY",
      interviewQuestions: [
        {
          "question": "Як працює <code>git bisect</code>, і чому це набагато швидше за ручний перегляд історії комітів для пошуку регресії?",
          "answer": "<code>bisect</code> виконує бінарний пошук по історії комітів: позначивши один коміт як «good» (без бага), інший як «bad» (з багом), Git автоматично чекаутить середній коміт між ними, і після твоєї відповіді (good/bad) звужує діапазон вдвічі щоразу — знаходить винний коміт за O(log n) перевірок замість лінійного перегляду всіх N комітів вручну."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">git bisect (binary search O(log N))</h3><p>Автоматично знаходить commit, який ввів bug, через бінарний пошук. О(log N) складність замість О(N)!</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git bisect start\ngit bisect bad            # HEAD contains bug\ngit bisect good v1.0      # v1.0 was good\n# Git checks out middle commit\n\n# Test it:\ngit bisect good           # This commit is OK\n# or:\ngit bisect bad            # This commit has bug\n\n# Repeat (binary search converges)\ngit bisect reset          # Exit bisect, return to orig branch"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Automated Bisect (git bisect run)</h3><p>Запускає test script на кожному коміті автоматично. Test мусить return 0 (good) або non-zero (bad):</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0\ngit bisect run npm test     # Automation!\n# Output: \"commit abc123 first bad commit\""
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Bisect Edge Cases</h3><div class=\"alert warn\">\n            ⚠️ <strong>Merge commits:</strong> Git може обрати merge commit для тестування (складно). Використовуй `git bisect skip`.\n          </div><div class=\"alert warn\">\n            ⚠️ <strong>Slow tests:</strong> Якщо тести на кожен commit == 1 хв × log(1000) commits = ~10 хвилин. Accelerate або skip.\n          </div>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git bisect skip              # Skip merge commit\ngit bisect skip abc123 def456  # Skip range"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">git blame (who changed what)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git blame src/app.js\nabc123d Петро    (2024-01-15) exports.start = function() {\ndef456e Марія    (2024-01-20)   console.log('Starting...')\n\ngit blame -L 10,20 file.js    # Only lines 10-20\ngit blame -w file.js          # Ignore whitespace changes\ngit blame -C file.js          # Copy detection (moved code)"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case:</strong> Blame показує merge commit (не оригінальний автор) → використовуй `git log -p` для глибокого аналізу.\n          </div><h3 class=\"topic\">Pickaxe search (git log -S \"string\")</h3><p>Знаходить commits, де кількість рядка змінилась (add/delete):</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git log -S \"secretToken\" --oneline   # Shows all commits with this string change\ngit log -p -S \"token\"                 # With patch diff\ngit log -G \"pattern\" --                 # Regex version"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">git log Advanced</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git log --author=\"Петро\" --since=\"2 weeks ago\"\ngit log --grep=\"fix\" --oneline\ngit log -p --follow src/file.js     # Follow renames\ngit log --diff-filter=D --name-only  # Only deleted files\ngit log --all --graph --oneline --decorate  # Visual tree"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Debugging Mindmap</h3><div class=\"alert good\">\n            ✓ <strong>Which commit introduced bug?</strong> → `git bisect`<br>\n            ✓ <strong>Who changed this line?</strong> → `git blame`<br>\n            ✓ <strong>When was this string added?</strong> → `git log -S \"string\"`<br>\n            ✓ <strong>Visualize branch history?</strong> → `git log --all --graph`<br>\n            ✓ <strong>Find file history?</strong> → `git log -p --follow file`\n          </div>"
        }
      ]
    },
    {
      "id": "tags-releases",
      "title": "🏷️ Tags & Releases",
      interviewQuestions: [
        {
          "question": "Чим annotated tag відрізняється від lightweight tag, і чому для релізів рекомендують саме annotated?",
          "answer": "Lightweight tag — просто іменований вказівник на коміт, без власних метаданих. Annotated tag — повноцінний Git-об'єкт із автором, датою, повідомленням і опційним GPG-підписом — дозволяє перевірити автентичність релізу криптографічно й зберігає контекст (чому саме цей коміт позначений як реліз), що критично для аудиту production-релізів."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Lightweight vs Annotated Tags</h3><div class=\"table-wrap\">\n            <table>\n              <tr><th>Type</th><th>Storage</th><th>Create</th><th>Use case</th></tr>\n              <tr><td>Lightweight</td><td>Just ref SHA (pointer)</td><td><code>git tag v1.0</code></td><td>Local, temporary</td></tr>\n              <tr><td>Annotated</td><td>Full Git object (tagger, msg, date)</td><td><code>git tag -a v1.0 -m \"Release\"</code></td><td>Public releases, signing</td></tr>\n            </table>\n          </div><h3 class=\"topic\">Signing & Verification (GPG)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git tag -s v1.0 -m \"Release v1.0\"    # Sign with GPG key\ngit tag -v v1.0                       # Verify signature\ngit verify-tag v1.0                   # Detailed verification"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Semantic Versioning (MAJOR.MINOR.PATCH-PRERELEASE)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "v1.2.3          - MAJOR=1 (breaking), MINOR=2 (feature), PATCH=3 (bugfix)\nv1.2.3-alpha.1  - Pre-release (alpha, beta, rc)\nv1.2.3+20240115 - Build metadata (optional)"
        },
        {
          "kind": "paragraph",
          "html": "<p><strong>Rules:</strong> `v1.0.0` is major release. `v0.x.x` = unstable (breaking changes OK without major bump). Повинна бути консистентна (з/без `v` prefix).</p><h3 class=\"topic\">git describe (auto-versioning)</h3><p>Знаходить найближчий tag до HEAD, показує distance + hash:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git describe --tags                    # v1.2.0-5-gabc123\n# Meaning: 5 commits after v1.2.0, hash abc123\n\ngit describe --tags --always --abbrev=0  # Just tag name"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Changelog & Conventional Commits</h3><p><strong>Conventional Commits:</strong> Стандартизований format для commit messages:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Pattern: type(scope): description\nfeat(auth): add JWT support\nfix(api): handle null responses\ndocs: update README\nBREAKING CHANGE: rename endpoint /users → /auth/users"
        },
        {
          "kind": "paragraph",
          "html": "<p>З conventional commits → можна auto-bump semver + generate changelog:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "feat:  → MINOR bump\nfix:   → PATCH bump\nBREAKING CHANGE: → MAJOR bump"
        },
        {
          "kind": "paragraph",
          "html": "<p style=\"font-size: 12px; color: #8b949e; margin-top: 8px;\"><strong>Інструменти:</strong> `semantic-release`, `standard-version`, `changelogen` автоматизують версіонування + changelog.</p><h3 class=\"topic\">Tags не fetchяться за замовчуванням</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git fetch --tags              # Fetch all tags explicitly\ngit fetch origin tag v1.0     # Fetch single tag\ngit push origin v1.0          # Push single tag\ngit push origin --tags        # Push all tags"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case: Moving a tag</strong> → `git tag -f v1.0 HEAD` (force), потім `git push --force origin v1.0`. Небажано для public tags!\n          </div>"
        }
      ]
    },
    {
      "id": "large-repos-performance-advanced",
      "title": "🚀 Large Repos & Performance ADVANCED",
      interviewQuestions: [
        {
          "question": "Які техніки застосовують для роботи з дуже великими Git-репозиторіями (мільйони файлів/комітів), коли звичайний clone стає непрактичним?",
          "answer": "Shallow clone (<code>--depth</code>, обмежена глибина історії), sparse checkout (завантаження лише потрібної частини файлового дерева замість усього репозиторію), і Git LFS (Large File Storage — зберігає вказівники на великі бінарні файли в самому репозиторії, а реальний вміст окремо) — усе це зменшує обсяг даних, які реально потрібно завантажити й тримати локально."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<p>Massive repos (Monorepos — 100GB+, millions commits, 1M+ files) потребують спеціальних techniques. Альтернатива: split на microrepos.</p><h3 class=\"topic\">Shallow Clone (--depth, --single-branch)</h3><p>Завантажує тільки недавню історію (не весь DAG):</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git clone --depth 1 https://github.com/huge/repo.git        # Only latest\ngit clone --depth 50 --single-branch https://github.com/huge/repo.git  # Faster\n\ngit fetch --deepen 10                                              # Expand history\ngit fetch --unshallow                                              # Full history"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge cases shallow clone:</strong>\n            <ul class=\"list\" style=\"font-size: 11px;\">\n              <li><code>git log</code> показує порізану історію</li>\n              <li>Push з shallow → операції можуть fail (parent не знайденаbez спільної історії)</li>\n              <li><code>git describe</code> на shallow → непередбачувані результати</li>\n            </ul>\n          </div><h3 class=\"topic\">Sparse Checkout (download only needed dirs)</h3><p>Завантажує тільки конкретні папки, не весь repo. Значно прискорює clone/checkout:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git clone --no-checkout https://github.com/huge/repo.git\ncd repo && git sparse-checkout init\ngit sparse-checkout set \"src/components/**\" \"docs/**\"\ngit checkout main\n# Disk має тільки src/components/ та docs/ (решта virtual)"
        },
        {
          "kind": "paragraph",
          "html": "<p style=\"font-size: 12px;\">Cone mode (fast pattern matching) vs full regex. `init --cone` по замовчуванню.</p><h3 class=\"topic\">Git Worktree (parallel work, no context switch)</h3><p>Кілька working trees від одного repo (без context switch):</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git worktree add ../app-v2 main        # New worktree\ngit worktree add -b hotfix ../fixes main  # New branch too\n\ngit worktree list                          # All worktrees\ngit worktree lock ../app-v2               # Prevent removal\ngit worktree remove ../app-v2             # Delete worktree"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case: Can't checkout same branch twice</strong> — один worktree per branch. Якщо один worktree на main, другий НЕ може бути на main.\n          </div><h3 class=\"topic\">Git LFS (Large File Storage)</h3><p>Для бінарних файлів (images, videos, models). Зберігає pointer у Git, файли на LFS сервері:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git lfs install                  # One-time setup\ngit lfs track \"*.psd\" \"*.mp4\"   # Add to .gitattributes\ngit add *.psd && git commit     # Pointer committed, not file\n\ngit lfs fetch --all             # Download all LFS files\ngit lfs migrate import --include=\"*.psd\"  # Convert existing history"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case: LFS not installed contributor:</strong> Клонує файли як text pointers (не бінарні) → parse errors. LFS мусить бути у всіх.\n          </div><h3 class=\"topic\">Scalar (Microsoft's monorepo solution)</h3><p>Built-in optimizations для giant Azure Repos (millions commits). Покращує `git status`, sparse-checkout, incremental indexing.</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "scalar clone https://github.com/Azure/azure-sdk-for-go.git\n# Auto-config: sparse-checkout, partial-clone, virtual filesystem"
        }
      ]
    },
    {
      "id": "advanced-config-aliases",
      "title": "⚙️ Advanced Config & Aliases",
      interviewQuestions: [
        {
          "question": "Навіщо сеньйори налаштовують власні Git-алiаси та глобальний <code>.gitignore</code>, а не покладаються лише на дефолтну конфігурацію?",
          "answer": "Аліаси (<code>git lg</code> для красивого логу, <code>git undo</code> для скасування останнього коміту) прибирають повторюваний boilerplate довгих команд, які інакше довелось би набирати чи гуглити щоразу. Глобальний <code>.gitignore</code> (для файлів IDE, ОС на кшталт <code>.DS_Store</code>) уникає забруднення кожного окремого репозиторію особистими налаштуваннями оточення, які не мають стосунку до самого проєкту."
        },
      ],
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Config Levels & Priority</h3><p>Git шукає config у порядку (останній перебиває попередній):</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "1. /etc/gitconfig           (system, all users)\n2. ~/.gitconfig             (global, your account)\n3. .git/config              (local, this repo)\n4. .git/config.worktree     (worktree-specific)\n\ngit config --system ...     # System level (need sudo)\ngit config --global ...     # Your account\ngit config --local ...      # This repo (default)\ngit config --show-origin user.name  # See which file"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Conditional Includes (per-directory config)</h3><p>Різні email/credentials залежно від папки:</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# ~/.gitconfig\n[includeIf \"gitdir:~/work/\"]\n  path = ~/.gitconfig-work\n\n# ~/.gitconfig-work\n[user]\n  name = John Doe Work\n  email = john@company.com\n  signingKey = work-key"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Edge case: First commit with wrong email</strong> → Conditional includes не reworked previous commits. Придетсяамед + force-push.\n          </div><h3 class=\"topic\">Useful Core Settings</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# ~/.gitconfig\n[core]\n  editor = code --wait      # VS Code editor\n  pager = delta             # Better diffs (npm install delta)\n  autocrlf = input          # Linux/Mac (avoid CRLF)\n  whitespace = fix,-indent-with-non-tab,trailing-space\n\n[push]\n  default = current         # Push current branch\n\n[pull]\n  rebase = true             # Pull with rebase (not merge)\n\n[merge]\n  conflictstyle = diff3     # 3-way diff in conflicts\n\n[init]\n  defaultBranch = main      # New repos use main, not master"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Aliases (shortcuts)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# ~/.gitconfig\n[alias]\n  st = status\n  co = checkout\n  br = branch\n  ci = commit\n  unstage = restore --staged\n  last = log -1 HEAD\n  lg = log --graph --oneline --all --decorate\n  amend = commit --amend --no-edit\n  contrib = shortlog --summary --numbered\n  undo = reset --soft HEAD~1\n  fixup = !git add -A && git commit --amend --no-edit\n  force = push --force-with-lease"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">.gitignore Patterns & Edge Cases</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "*.log                   # All .log files\n/dist/                  # Only dist/ in root\nnode_modules/           # Anywhere in tree\n!important.log          # Exception (MUST negate)\n**/*.tmp                # Recursive any depth\n.env                    # Environment secrets\n*.swp                   # Editor temps"
        },
        {
          "kind": "paragraph",
          "html": "<div class=\"alert warn\">\n            ⚠️ <strong>Файл вже tracked:</strong> `.gitignore` не влияє на уже-скомічені файли. Спочатку видалити:\n            <pre>git rm --cached file.txt  <span class=\"cmt\"># Remove from index, keep locally</span></pre>\n          </div>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "git check-ignore -v file.txt  # Debug: why is it ignored?"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">.gitattributes (line endings, diffs, merges)</h3>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# Auto line-ending conversion\n* text=auto               # Text files normalize on commit\n*.js eol=lf               # JS always Unix line-endings\n\n# Custom diff for binary files\n*.psd diff=exiftool       # PSD diffable via exif\n*.docx diff=word          # Word document diff\n\n# Merge strategy for specific files\n*.json merge=union        # Union merge (no conflicts)"
        },
        {
          "kind": "paragraph",
          "html": "<h3 class=\"topic\">Global .gitignore (per-user)</h3><p>Ignored everywhere для твоїх інструментів (IDE, OS files):</p>"
        },
        {
          "kind": "code",
          "language": "bash",
          "code": "# ~/.gitignore_global\n.DS_Store               # macOS\n.vscode/                # VS Code local settings\n*.swp *.swo             # Vim temps\n.idea/                  # JetBrains IDE\n\n# Tell git to use it\ngit config --global core.excludesfile ~/.gitignore_global"
        }
      ]
    }
  ]
}

export const gitCheat: TopicContent = {
  "slug": "git",
  "sections": [
    {
      "id": "базові-команди",
      "title": "📚 Базові команди",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Ініціалізація & Клонування</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">init</div>git init</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">clone</div>git clone &lt;url&gt;</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">clone depth</div>git clone --depth 1 &lt;url&gt;</div>\n        </div>\n        <div class=\"card\">\n          <h4>Status & Viewing</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">status</div>git status</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">diff</div>git diff            # Unstaged<br>git diff --staged  # Staged</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">log</div>git log --oneline -10</div>\n        </div>\n      </div><div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Staging & Committing</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">add files</div>git add file.txt<br>git add .</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">add interactive</div>git add -p</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">commit</div>git commit -m \"message\"</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">amend last</div>git commit --amend --no-edit</div>\n        </div>\n        <div class=\"card\">\n          <h4>View Commits</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">show commit</div>git show abc123</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">log graph</div>git log --all --graph --oneline</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">log search</div>git log -S \"string\" --oneline</div>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "гілки-branches",
      "title": "🌿 Гілки (Branches)",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid3\">\n        <div class=\"card\">\n          <h4>Manage Branches</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">list</div>git branch</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">list remote</div>git branch -a</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">create</div>git branch feature/x</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">delete</div>git branch -d feature/x</div>\n        </div>\n        <div class=\"card\">\n          <h4>Switch & Merge</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">checkout</div>git checkout branch<br>git switch branch</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">checkout -b</div>git checkout -b feature</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">merge</div>git merge feature</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">merge squash</div>git merge --squash feature</div>\n        </div>\n        <div class=\"card\">\n          <h4>Rebase & Track</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">rebase</div>git rebase main</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">rebase -i</div>git rebase -i HEAD~3</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">set upstream</div>git branch -u origin/main</div>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "remote-operations",
      "title": "🌐 Remote Operations",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid3\">\n        <div class=\"card\">\n          <h4>Remote Setup</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">list remotes</div>git remote -v</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">add remote</div>git remote add upstream &lt;url&gt;</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">rename</div>git remote rename old new</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">remove</div>git remote remove origin</div>\n        </div>\n        <div class=\"card\">\n          <h4>Fetch & Pull</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">fetch</div>git fetch origin<br>git fetch --all</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">fetch + merge</div>git pull origin main</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">pull rebase</div>git pull --rebase origin main</div>\n        </div>\n        <div class=\"card\">\n          <h4>Push</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">push</div>git push origin branch</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">push -u</div>git push -u origin feature</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">force push</div>git push --force-with-lease</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">push all</div>git push --all</div>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "stash-cherry-pick",
      "title": "🍒 Stash & Cherry-pick",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Stash (Save WIP)</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">stash</div>git stash push -m \"WIP: feature\"</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">stash list</div>git stash list</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">stash pop</div>git stash pop            # Remove<br>git stash apply         # Keep</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">stash partial</div>git stash push -p</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">drop stash</div>git stash drop stash@{0}</div>\n        </div>\n        <div class=\"card\">\n          <h4>Cherry-pick</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">pick commit</div>git cherry-pick abc123</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">pick range</div>git cherry-pick abc123..xyz789</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">pick no-commit</div>git cherry-pick -n abc123</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">continue</div>git cherry-pick --continue<br>git cherry-pick --abort</div>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "скасування-змін",
      "title": "↩️ Скасування змін",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid3\">\n        <div class=\"card\">\n          <h4>Unstage & Restore</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">unstage file</div>git restore --staged file</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">discard WD</div>git restore file</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">clean</div>git clean -fd</div>\n        </div>\n        <div class=\"card\">\n          <h4>Undo Commits</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">reset soft</div>git reset --soft HEAD~1</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">reset hard</div>git reset --hard HEAD~1</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">revert</div>git revert abc123</div>\n        </div>\n        <div class=\"card\">\n          <h4>Recovery</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">reflog</div>git reflog</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">recover</div>git reset --hard abc123</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">remove from history</div>git filter-repo --path file --invert-paths</div>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "теги-releases",
      "title": "🏷️ Теги & Releases",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Create & Manage Tags</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">lightweight</div>git tag v1.0</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">annotated</div>git tag -a v1.0 -m \"Release v1.0\"</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">sign tag</div>git tag -s v1.0 -m \"Release\"</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">list tags</div>git tag -l</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">delete</div>git tag -d v1.0</div>\n        </div>\n        <div class=\"card\">\n          <h4>Push & Verify</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">push tags</div>git push origin v1.0<br>git push --tags</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">verify signature</div>git tag -v v1.0</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">delete remote</div>git push origin --delete v1.0</div>\n        </div>\n      </div><div class=\"page-break\"></div>"
        }
      ]
    },
    {
      "id": "просунуті-команди",
      "title": "🔬 Просунуті команди",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid3\">\n        <div class=\"card\">\n          <h4>Bisect (Debug)</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">start bisect</div>git bisect start<br>git bisect bad<br>git bisect good v1.0</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">mark status</div>git bisect good<br>git bisect bad</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">auto test</div>git bisect run ./test.sh</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">exit</div>git bisect reset</div>\n        </div>\n        <div class=\"card\">\n          <h4>Blame & Search</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">blame</div>git blame file.js</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">blame range</div>git blame -L 10,20 file.js</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">pickaxe</div>git log -S \"token\" --oneline</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">by function</div>git blame -L :funcName file.js</div>\n        </div>\n        <div class=\"card\">\n          <h4>Submodules</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">add</div>git submodule add &lt;url&gt; dir</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">clone + init</div>git clone --recursive &lt;url&gt;</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">update</div>git submodule update --init --recursive</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">foreach</div>git submodule foreach git pull</div>\n        </div>\n      </div><div class=\"grid3\">\n        <div class=\"card\">\n          <h4>Worktree</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">add</div>git worktree add ../app-v2 main</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">list</div>git worktree list</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">remove</div>git worktree remove ../app-v2</div>\n        </div>\n        <div class=\"card\">\n          <h4>LFS (Large Files)</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">install</div>git lfs install</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">track</div>git lfs track \"*.psd\"</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">status</div>git lfs status</div>\n        </div>\n        <div class=\"card\">\n          <h4>Sparse Checkout</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">init</div>git sparse-checkout init</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">set dirs</div>git sparse-checkout set src/ docs/</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">disable</div>git sparse-checkout disable</div>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "конфігурація-аліаси",
      "title": "⚙️ Конфігурація & Аліаси",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Config</h4>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">global user</div>git config --global user.name \"John\"<br>git config --global user.email \"john@example.com\"</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">local user</div>git config --local user.email \"john@company.com\"</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">list all</div>git config --list</div>\n          <div class=\"cmd-block\"><div class=\"cmd-label\">edit .gitconfig</div>git config --global --edit</div>\n        </div>\n        <div class=\"card\">\n          <h4>Useful Aliases (.gitconfig)</h4>\n          <pre style=\"margin: 8px 0;\">[alias]\n  st = status\n  co = checkout\n  br = branch\n  ci = commit\n  unstage = restore --staged\n  last = log -1 HEAD\n  lg = log --graph --oneline\n  amend = commit --amend --no-edit\n  contrib = shortlog -sn</pre>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "gitignore-gitattributes",
      "title": "📝 .gitignore & .gitattributes",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>.gitignore Patterns</h4>\n          <pre style=\"margin: 8px 0;\">*.log\n*.tmp\nnode_modules/\n/dist/\n**/*.bak\n!important.log\n.env\n.DS_Store</pre>\n        </div>\n        <div class=\"card\">\n          <h4>.gitattributes</h4>\n          <pre style=\"margin: 8px 0;\">* text=auto\n*.js eol=lf\n*.md diff=markdown\n*.xlsx binary\n*.jar binary</pre>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "git-hooks-husky",
      "title": "🎯 Git Hooks (Husky)",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid2\">\n        <div class=\"card\">\n          <h4>Client Hooks (Run Locally)</h4>\n          <ul class=\"list\" style=\"font-size: 11px;\">\n            <li><code>pre-commit</code> — Lint, format (git add)</li>\n            <li><code>prepare-commit-msg</code> — Modify message</li>\n            <li><code>commit-msg</code> — Validate format</li>\n            <li><code>pre-push</code> — Run tests before push</li>\n          </ul>\n        </div>\n        <div class=\"card\">\n          <h4>Husky Setup</h4>\n          <pre style=\"margin: 8px 0;\">npm install husky --save-dev\nnpx husky install\nnpx husky add .husky/pre-commit \"npm run lint\"</pre>\n        </div>\n      </div>"
        }
      ]
    },
    {
      "id": "best-practices",
      "title": "💡 Best Practices",
      "blocks": [
        {
          "kind": "paragraph",
          "html": "<div class=\"grid3\">\n        <div class=\"card\">\n          <h4>Commit Message</h4>\n          <ul class=\"list\" style=\"font-size: 11px;\">\n            <li>Imperative mood: \"Add feature\"</li>\n            <li>Max 50 chars title</li>\n            <li>Blank line before body</li>\n            <li>Reference issues: \"Fixes #123\"</li>\n            <li>Conventional: feat:, fix:, docs:</li>\n          </ul>\n        </div>\n        <div class=\"card\">\n          <h4>Branching</h4>\n          <ul class=\"list\" style=\"font-size: 11px;\">\n            <li>Name branches clearly</li>\n            <li>feature/, fix/, docs/</li>\n            <li>Short-lived branches (< 2 weeks)</li>\n            <li>Delete after merge</li>\n            <li>Review before merge</li>\n          </ul>\n        </div>\n        <div class=\"card\">\n          <h4>Workflow</h4>\n          <ul class=\"list\" style=\"font-size: 11px;\">\n            <li>Fetch regularly</li>\n            <li>Rebase > merge (local)</li>\n            <li>Merge > rebase (shared)</li>\n            <li>Tag releases</li>\n            <li>Keep main deployable</li>\n          </ul>\n        </div>\n      </div><div class=\"alert good\" style=\"margin-top: 30px;\">\n        <span class=\"icon\">✓</span>\n        <div>\n          <strong>Git is NOT just GitHub:</strong> Git is the version control system (local), GitHub is a hosting service. Learn git commands, not GUI buttons.\n        </div>\n      </div><div style=\"text-align: center; margin-top: 40px; color: #8b949e; font-size: 11px;\">\n        <p>🔀 Git Cheatsheet — Interactive version at /git/index.html — Last updated: 2026-06-14</p>\n      </div>"
        }
      ]
    }
  ]
}
