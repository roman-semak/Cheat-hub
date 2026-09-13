import type { QuickRefBlock } from './types'

// Git quickref board — condensed from the old prose `gitCheat` sheet.
export const gitQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'Старт',
    icon: '🚀',
    entries: [
      { term: 'git init', desc: 'новий репозиторій' },
      { term: 'git clone <url>', chips: ['--depth 1'], desc: 'shallow — без історії' },
      { term: 'git status', desc: 'стан working dir та staging' },
      { term: 'git diff', chips: ['--staged'], desc: 'unstaged / staged зміни' },
    ],
  },
  {
    label: 'Staging & Commit',
    icon: '📦',
    entries: [
      { term: 'git add .', desc: 'застейджити все' },
      { term: 'git add -p', desc: 'інтерактивно, по шматках' },
      { term: 'git commit -m "msg"', desc: 'коміт' },
      { term: 'git commit --amend --no-edit', desc: 'дописати в останній коміт' },
    ],
  },
  {
    label: 'Історія',
    icon: '📜',
    entries: [
      { term: 'git log --oneline -10', desc: 'коротко останні 10' },
      { term: 'git log --all --graph --oneline', desc: 'граф усіх гілок' },
      { term: 'git log -S "token"', desc: 'pickaxe — коміти, що додали/прибрали рядок' },
      { term: 'git show <sha>', desc: 'вміст коміту' },
      { term: 'git blame -L 10,20 file', chips: ['-L :funcName'], desc: 'хто змінив рядки' },
    ],
  },
  {
    label: 'Гілки',
    icon: '🌿',
    entries: [
      { term: 'git branch', chips: ['-a'], desc: 'список (з remote)' },
      { term: 'git switch -c feature', desc: 'створити + перейти (= checkout -b)' },
      { term: 'git branch -d feature', desc: 'видалити змерджену' },
      { term: 'git branch -u origin/main', desc: 'встановити upstream' },
    ],
  },
  {
    label: 'Merge & Rebase',
    icon: '🔀',
    entries: [
      { term: 'git merge feature', desc: 'merge-коміт, історія зберігається' },
      { term: 'git merge --squash feature', desc: 'усі коміти одним' },
      { term: 'git rebase main', desc: 'перенести коміти поверх main — лінійна історія' },
      {
        term: 'git rebase -i HEAD~3',
        desc: 'pick / squash / reword / drop останніх 3',
        code: `pick   a1b2c3 feat: add form
squash d4e5f6 fix typo
reword 789abc feat: validation`,
        codeLanguage: 'bash',
      },
      { term: 'Правило', desc: '<b>rebase</b> — локально, <b>merge</b> — у спільних гілках' },
    ],
  },
  {
    label: 'Remote',
    icon: '🌐',
    entries: [
      { term: 'git remote -v', desc: 'список remotes' },
      { term: 'git remote add upstream <url>', desc: 'додати remote' },
      { term: 'git fetch --all', desc: 'стягнути без злиття' },
      { term: 'git pull --rebase origin main', desc: 'fetch + rebase замість merge' },
      { term: 'git push -u origin feature', desc: 'push + upstream' },
      { term: 'git push --force-with-lease', desc: 'безпечний force — не перетре чужі коміти' },
    ],
  },
  {
    label: 'Stash',
    icon: '🗃️',
    entries: [
      { term: 'git stash push -m "WIP"', chips: ['-p'], desc: 'відкласти зміни (частково)' },
      { term: 'git stash list', desc: 'список stash' },
      { term: 'git stash pop', desc: 'застосувати + видалити · <code>apply</code> — залишити' },
      { term: 'git stash drop stash@{0}', desc: 'видалити запис' },
    ],
  },
  {
    label: 'Cherry-pick',
    icon: '🍒',
    entries: [
      { term: 'git cherry-pick <sha>', desc: 'скопіювати коміт у поточну гілку' },
      { term: 'git cherry-pick a..b', desc: 'діапазон комітів' },
      { term: 'git cherry-pick -n <sha>', desc: 'без автокоміту' },
      { term: '--continue / --abort', desc: 'після конфлікту' },
    ],
  },
  {
    label: 'Скасування',
    icon: '↩️',
    entries: [
      { term: 'git restore --staged file', desc: 'unstage' },
      { term: 'git restore file', desc: 'відкинути зміни в working dir' },
      { term: 'git clean -fd', desc: 'видалити untracked файли/папки' },
      { term: 'git reset --soft HEAD~1', desc: 'скасувати коміт, зміни лишаються staged' },
      { term: 'git reset --hard HEAD~1', desc: '<b>знищити</b> коміт і зміни' },
      { term: 'git revert <sha>', desc: 'новий коміт-антипод — безпечно для спільних гілок' },
    ],
  },
  {
    label: 'Recovery',
    icon: '🛟',
    entries: [
      { term: 'git reflog', desc: 'журнал руху HEAD — знайти «втрачений» коміт' },
      { term: 'git reset --hard <sha>', desc: 'повернутись на знайдений коміт' },
      { term: 'git filter-repo --path file --invert-paths', desc: 'вичистити файл з усієї історії' },
    ],
  },
  {
    label: 'Теги',
    icon: '🏷️',
    entries: [
      { term: 'git tag v1.0', desc: 'lightweight' },
      { term: 'git tag -a v1.0 -m "Release"', chips: ['-s'], desc: 'annotated (підписаний)' },
      { term: 'git push origin v1.0', chips: ['--tags'], desc: 'відправити тег(и)' },
      { term: 'git push origin --delete v1.0', desc: 'видалити на remote' },
    ],
  },
  {
    label: 'Bisect',
    icon: '🔬',
    entries: [
      {
        term: 'git bisect start',
        desc: 'бінарний пошук коміту з багом',
        code: `git bisect start
git bisect bad            # поточний — зламаний
git bisect good v1.0      # тут працювало
# ...перевіряй і позначай good / bad
git bisect run ./test.sh  # або автоматично
git bisect reset`,
        codeLanguage: 'bash',
      },
    ],
  },
  {
    label: 'Просунуте',
    icon: '🧰',
    entries: [
      { term: 'git worktree add ../app-v2 main', desc: 'друга робоча копія без клону' },
      { term: 'git submodule update --init --recursive', desc: 'підтягнути сабмодулі' },
      { term: 'git sparse-checkout set src/ docs/', desc: 'чекаут лише частини monorepo' },
      { term: 'git lfs track "*.psd"', desc: 'великі бінарники через LFS' },
    ],
  },
  {
    label: 'Config & aliases',
    icon: '⚙️',
    entries: [
      { term: 'git config --global user.name', chips: ['--local'], desc: 'ім\'я/email глобально або на репо' },
      { term: 'git config --list', desc: 'уся конфігурація' },
      {
        term: '[alias]',
        desc: 'скорочення в <code>.gitconfig</code>',
        code: `[alias]
  st = status
  co = checkout
  unstage = restore --staged
  last = log -1 HEAD
  lg = log --graph --oneline
  amend = commit --amend --no-edit`,
        codeLanguage: 'ini',
      },
    ],
  },
  {
    label: '.gitignore / .gitattributes',
    icon: '📝',
    entries: [
      {
        term: '.gitignore',
        chips: ['node_modules/', '/dist/', '**/*.bak', '!keep.log', '.env'],
        code: `*.log
node_modules/
/dist/
**/*.bak
!important.log
.env
.DS_Store`,
        codeLanguage: 'bash',
      },
      {
        term: '.gitattributes',
        chips: ['* text=auto', '*.js eol=lf', '*.xlsx binary'],
        desc: 'нормалізація EOL, бінарні файли',
      },
    ],
  },
  {
    label: 'Hooks (Husky)',
    icon: '🎯',
    entries: [
      { term: 'pre-commit', desc: 'lint / format' },
      { term: 'commit-msg', desc: 'валідація формату повідомлення' },
      { term: 'pre-push', desc: 'тести перед push' },
      {
        term: 'Husky setup',
        code: `npm install husky --save-dev
npx husky init
echo "npm run lint" > .husky/pre-commit`,
        codeLanguage: 'bash',
      },
    ],
  },
  {
    label: 'Best practices',
    icon: '💡',
    chips: [
      'imperative: <b>Add feature</b>',
      'заголовок ≤ 50 символів',
      'Conventional: <code>feat:</code> <code>fix:</code> <code>docs:</code>',
      '<code>Fixes #123</code>',
      '<code>feature/</code> <code>fix/</code> гілки',
      'короткі гілки, видаляй після merge',
      'main завжди deployable',
      'теги на релізи',
    ],
  },
]
