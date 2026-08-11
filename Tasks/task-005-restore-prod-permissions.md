# Task 005: Повернути безпечні дозволи Claude Code для production

**Дата створення:** 2026-08-11
**Статус:** 📋 TODO

---

## 📌 Опис

Під час локальної розробки для проекту виставлено «повний bypass» дозволів Claude
Code — щоб не перепитувати кожну команду. Це зручно для dev, але **небезпечно для
production / shared / CI середовища** (жодних запобіжників: `git push --force`,
`rm -rf` тощо виконуються без питання).

Ця задача — нагадування **повернути безпечну конфігурацію** перед тим, як робити
проект спільним / деплоїти / давати доступ іншим.

Джерело зміни, яку треба відкотити: план
`~/.claude/plans/grep-ie-playwright-puppeteer-package-jso-ticklish-koala.md`.

---

## 📋 План виконання

### Крок 1: Відкотити режим дозволів
- [ ] У `.claude/settings.local.json` змінити `permissions.defaultMode`:
      `"bypassPermissions"` → `"default"` (з курованим allowlist) або `"dontAsk"`
- [ ] Прибрати top-level `"skipDangerousModePermissionPrompt": true`

### Крок 2: Додати запобіжники
- [ ] Додати `permissions.deny` на критичне:
      `"Bash(rm -rf /*)"`, `"Bash(git push --force*)"`, `"Bash(git push -f*)"`
- [ ] За потреби почистити надлишковий точковий `permissions.allow`
      (замінити на широкі wildcard-и: `Bash(git:*)`, `Bash(npm:*)`, `Bash(curl:*)` тощо)

### Крок 3: Верифікація
- [ ] `python3 -m json.tool .claude/settings.local.json` — JSON валідний
- [ ] Перезапустити Claude Code (режим читається на старті сесії)
- [ ] Пересвідчитися, що небезпечна команда (`git push --force`) знову блокується/питає
- [ ] Задокументувати результат у `task-004-restore-prod-permissions.done.md`

---

## 🔧 Файли для зміни

| Файл | Дія |
|---|---|
| `.claude/settings.local.json` | Переробити (defaultMode + deny + прибрати skip-flag) |

---

## ✅ Результати

[Заповнюється після виконання]

---

## 📝 Примітки

- Файл `.claude/settings.local.json` — gitignored, персональний; зміна лишається
  локальною для цього проекту.
- Режим дозволів застосовується **на старті нової сесії**, не на льоту.
- Виконувати цю задачу лише коли реально переходимо на production/shared — для
  щоденної локальної розробки поточний bypass зручніший.
