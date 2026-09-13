# Turso vs Supabase для синхронізації прогресу (Task 004)

**Дата:** 2026-09-13 · **Контекст:** [Tasks/task-004-remote-sync-login.md](../Tasks/task-004-remote-sync-login.md)
**Ціни й ліміти:** звірено з turso.tech/pricing і supabase.com/pricing станом на вересень 2026.

## Що насправді потрібно Cheat Hub

Синхронізація в Cheat Hub мінімальна:

- **Одна таблиця.** `User`: `username`, `passwordHash`, JSON-блоб `data`, дати.
- **Два роути, п'ять запитів.** `src/app/api/auth/login/route.ts` робить `findUnique` і `create`, `src/app/api/sync/route.ts` робить `findUnique` двічі та `update`.
- **Навантаження дрібне.** Один користувач або кілька людей, пуш із дебаунсом 1.5 с.
- **Задачі в базі не лежать.** Застосунок читає їх зі статичного `src/data/problems.ts`. Prisma + SQLite (`prisma/dev.db`) лишаються лише для локального пайплайну `import-leetcode` → `export-problems` і `prisma/seed.ts`.

Отже, від бази потрібні три речі: зберігати один рядок на користувача, бути безкоштовною і не заважати локальному SQLite-пайплайну.

---

## Порівняння

| Критерій | Turso (libSQL) | Supabase (Postgres) |
|---|---|---|
| **Що це** | Хмарний SQLite (форк libSQL), HTTP-протокол | Керований Postgres + Auth, Storage, Realtime, REST API |
| **Free: бази/проєкти** | 100 баз | **2 активні проєкти** на акаунт |
| **Free: обсяг** | 5 GB | 500 MB на проєкт |
| **Free: трафік/запити** | 500 млн рядків читання, 10 млн запису на місяць | 5 GB egress, 50 000 MAU для Auth |
| **Простій** | Не засинає | **Пауза після 7 днів без активності**, відновлення вручну в дашборді |
| **Бекапи на Free** | Point-in-time restore за 1 день | Немає PITR (є на платних) |
| **Перший платний план** | Developer: $4.99/міс | Pro: від $25/міс |
| **Сумісність зі схемою** | SQLite, як і `prisma/dev.db`: **нуль змін** | Потрібен `provider = "postgresql"` або обхід Prisma (див. нижче) |
| **Стан коду** | **Уже інтегровано** (`src/lib/db.ts` через `@prisma/adapter-libsql`) | Нічого не написано |
| **Auth** | Своя: `src/lib/auth.ts` (scrypt + HMAC-cookie) | Можна взяти Supabase Auth (email, OAuth, magic link) |
| **Міграції** | Prisma Migrate не працює з `libsql://`, SQL застосовується вручну через `turso db shell` | `prisma migrate deploy` працює напряму (через direct URL, порт 5432) |
| **Serverless (Vercel)** | HTTP-клієнт, пулінг з'єднань не потрібен | Потрібен pooler Supavisor (порт 6543, `?pgbouncer=true`) для Prisma або supabase-js через REST |
| **Дашборд / перегляд даних** | Мінімальний веб-UI + `turso db shell` | Повноцінний Table Editor, SQL editor, логи |
| **Нове для тебе** | Новий акаунт, CLI, ще один сервіс | Уже знайомий інструмент, один акаунт на обидва проєкти |

---

## Що змінити в коді, якщо обрати Supabase

### Варіант A: supabase-js тільки в двох роутах (рекомендовано для Supabase)
Prisma і локальний SQLite лишаються як є, а до Supabase звертаються лише роути синхронізації.
1. `npm i @supabase/supabase-js`.
2. У Supabase SQL editor створити таблицю:
   ```sql
   create table "User" (
     id bigint generated always as identity primary key,
     username text not null unique,
     "passwordHash" text not null,
     data jsonb not null default '{}',
     "createdAt" timestamptz not null default now(),
     "updatedAt" timestamptz not null default now()
   );
   alter table "User" enable row level security; -- доступ лише через service role з сервера
   ```
3. Новий `src/lib/supabase.ts`: серверний клієнт з `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. Ключ **ніколи** не отримує префікс `NEXT_PUBLIC_`.
4. У `login/route.ts` і `sync/route.ts` замінити `db.user.*` на `supabase.from('User').select/insert/update`. `auth.ts` не змінюється.
5. З `db.ts` можна прибрати гілку `TURSO_*`.

Обсяг роботи: приблизно 1 новий файл і 2 відредаговані роути. Схема Prisma і скрипти імпорту лишаються без змін.

### Варіант B: Prisma → Postgres
Змінити `provider` на `postgresql`. У Prisma 5 провайдер один на всю схему, тому на Postgres переїдуть і `Problem`/`Submission`/`Progress`. Для локальних скриптів `import-leetcode` / `export-problems` / `seed` доведеться підняти Postgres (Docker або Supabase CLI) і перегенерувати міграції. **Для задачі з однією таблицею це невиправдано.**

### Варіант C: Supabase Auth замість своєї авторизації
Вхід по email або GitHub OAuth, RLS `auth.uid() = user_id`, а `src/lib/auth.ts` і login-роут не потрібні. Це найбільш «правильне» рішення, але воно змінює UX (username → email) і вимагає переписати `ProfilePanel.tsx` та `userStore.ts`. Має сенс, якщо колись з'являться реальні користувачі.

---

## Ризики Supabase саме в твоїй ситуації

1. **Ліміт 2 активних проєкти на Free.** Один уже зайнятий іншим проєктом. Якщо там два проєкти (наприклад, prod + staging), для Cheat Hub місця не буде. Можна або поставити одну з баз на паузу, або покласти таблицю `User` в існуючий проєкт (окрема схема `cheathub`). Останнє змішує дані двох застосунків.
2. **Пауза після тижня неактивності.** Pet-проєкт, який відкриваєш раз на кілька тижнів, засне, і синхронізація впаде з помилкою, доки не відновиш проєкт у дашборді. Turso так не засинає.
3. **Service role key на сервері.** Він обходить RLS, тож витік означає повний доступ до бази. У Turso токен теж дає доступ до всієї бази, але тільки до цієї однієї.

## Ризики Turso

1. Ще один акаунт і CLI, яким більше ніде не користуєшся.
2. Міграції вручну (`turso db shell < migration.sql`), бо Prisma Migrate не бачить `libsql://`. Зі стабільною однією таблицею це дрібниця.
3. Скромний дашборд: дані зручніше дивитися через `turso db shell`.

---

## Рекомендація

**Залишитися на Turso для Cheat Hub.** Код уже готовий і протестований. Схема SQLite збігається з локальною, база не засинає, а Free-план покриває потреби з великим запасом. Щоб завершити задачу 004, лишилося п'ять ручних кроків без жодного рядка коду.

**Supabase варто обрати**, якщо:
- на Free є вільний слот під проєкт (або ти вже на Pro, де ліміт проєктів не проблема і паузи немає);
- хочеш один дашборд на всі проєкти;
- плануєш реальну авторизацію через email/OAuth (варіант C).

У такому разі краще брати **варіант A**: supabase-js лише в двох роутах, без переведення Prisma на Postgres.
