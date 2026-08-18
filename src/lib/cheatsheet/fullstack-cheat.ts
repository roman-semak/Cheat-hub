// Fullstack cheatsheet — стисла версія fullstack.ts для швидкого повторення
// перед співбесідою. Менше прози, більше карток-таблиць, снипетів та чеклистів.
// Той самий рендер (ProseTopicView → ContentBlocks). Кутові дужки inline-коду
// в HTML екрануються; у блоках 'code' — ні.
import type { TopicContent } from './types'

export const fullstackCheat: TopicContent = {
  slug: 'fullstack',
  intro: [
    {
      kind: 'paragraph',
      html: `<p>Швидка шпаргалка Senior Full Stack: ключові факти, цифри й снипети для повторення «за 15 хвилин до співбесіди». Деталі — у <strong>розширеній</strong> версії.</p>`,
    },
  ],
  sections: [
    /* ---------- HTTP ---------- */
    {
      id: 'http-cheat',
      title: '🌐 HTTP за 30 секунд',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>Методи</h4>
                <ul>
                  <li><code>GET</code> — read · safe · idempotent · cacheable</li>
                  <li><code>POST</code> — create · НЕ idempotent</li>
                  <li><code>PUT</code> — replace · idempotent</li>
                  <li><code>PATCH</code> — partial update</li>
                  <li><code>DELETE</code> — idempotent</li>
                </ul>
              </div>
              <div class="card">
                <h4>Коди, що питають</h4>
                <ul>
                  <li><code>200/201/204</code> — OK / Created / No Content</li>
                  <li><code>301/304</code> — Moved / Not Modified</li>
                  <li><code>400/401/403/404</code> — bad / authn / authz / missing</li>
                  <li><code>409/422/429</code> — conflict / unprocessable / too many</li>
                  <li><code>500/502/503/504</code> — server / gateway errors</li>
                </ul>
              </div>
            </div>
            <div class="alert"><strong>401</strong> = хто ти? (не залогінений) · <strong>403</strong> = тобі не можна (залогінений, без прав).</div>`,
        },
      ],
    },

    /* ---------- БД ---------- */
    {
      id: 'db-cheat',
      title: '🗄️ Бази даних',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>SQL коли</h4>
                <p>Зв'язки, транзакції, гнучкі запити, цілісність. <strong>Дефолт = Postgres.</strong></p>
              </div>
              <div class="card">
                <h4>NoSQL коли</h4>
                <p>Гнучка схема, масштаб запису, простий доступ за ключем, документ-агрегати.</p>
              </div>
            </div>
            <div class="alert"><strong>ACID:</strong> Atomicity · Consistency · Isolation · Durability. <strong>CAP:</strong> при partition обираєш Consistency АБО Availability. <strong>Ізоляція:</strong> Read Uncommitted → Read Committed → Repeatable Read → Serializable.</div>
            <div class="alert warn"><strong>N+1:</strong> 1 запит на список + N на зв'язки → eager load / JOIN / DataLoader. <strong>Індекс:</strong> на WHERE/JOIN/ORDER BY, перевіряй <code>EXPLAIN ANALYZE</code>.</div>`,
        },
        {
          kind: 'code',
          language: 'sql',
          caption: 'Транзакція та індекс',
          code: `BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

CREATE INDEX idx_orders_user ON orders (user_id, created_at DESC);
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;`,
        },
      ],
    },

    /* ---------- Auth ---------- */
    {
      id: 'auth-cheat',
      title: '🔐 Auth',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>Sessions</h4>
                <p>Стейтфул · сервер зберігає · легко відкликати · потрібен store (Redis).</p>
              </div>
              <div class="card">
                <h4>JWT</h4>
                <p>Стейтлес · підпис · масштабовано · важко відкликати → короткий TTL + refresh.</p>
              </div>
            </div>
            <div class="alert warn"><strong>Cookie-флаги:</strong> <code>HttpOnly</code> (anti-XSS) · <code>Secure</code> (HTTPS) · <code>SameSite</code> (anti-CSRF). НЕ зберігай JWT у <code>localStorage</code>.</div>
            <div class="alert"><strong>OAuth2</strong> = делегований доступ · <strong>OIDC</strong> = identity поверх OAuth2 · <strong>RBAC</strong> = права через ролі. Паролі: <code>bcrypt</code>/<code>argon2</code> + сіль.</div>`,
        },
      ],
    },

    /* ---------- Кеш + черги ---------- */
    {
      id: 'cache-queue-cheat',
      title: '⚡ Кеш та черги',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>Кеш</h4>
                <p><strong>Рівні:</strong> browser → CDN → app(Redis) → DB. <strong>Стратегії:</strong> cache-aside (дефолт), write-through, write-behind. <strong>Інвалідація:</strong> TTL + події. Стережись stampede.</p>
              </div>
              <div class="card">
                <h4>Черги</h4>
                <p>Розв'язка + піки + фонові задачі. RabbitMQ / Kafka / BullMQ / SQS. <strong>At-least-once</strong> → споживач має бути <strong>ідемпотентним</strong>; фейли → <strong>DLQ</strong>.</p>
              </div>
            </div>`,
        },
      ],
    },

    /* ---------- Безпека ---------- */
    {
      id: 'security-cheat',
      title: '🛡️ Безпека (OWASP)',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid3">
              <div class="card red">
                <h4>SQLi</h4>
                <p>Параметризовані запити / ORM. Ніколи не конкатенуй ввід.</p>
              </div>
              <div class="card red">
                <h4>XSS</h4>
                <p>Екрануй вивід, CSP, обережно з <code>innerHTML</code>.</p>
              </div>
              <div class="card red">
                <h4>CSRF</h4>
                <p>SameSite-cookies + CSRF-токени.</p>
              </div>
            </div>
            <div class="alert warn"><strong>CORS ≠ захист сервера</strong> — це механізм браузера про читання cross-origin відповідей. <strong>Access control</strong> перевіряй на сервері для кожного ресурсу. Секрети — в env, не в git. HTTPS усюди. Rate limiting на логін.</div>`,
        },
      ],
    },

    /* ---------- DevOps ---------- */
    {
      id: 'devops-cheat',
      title: '🐳 DevOps',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="alert"><strong>Docker:</strong> образ = app+залежності, шари кешуються, multi-stage → малий образ. <strong>CI:</strong> lint→test→build на push. <strong>CD:</strong> авто-деплой (blue-green / canary / rolling). <strong>IaC:</strong> Terraform. <strong>12-factor:</strong> конфіг в env, стейтлес, логи в stdout.</div>`,
        },
        {
          kind: 'code',
          language: 'bash',
          caption: 'Docker-команди першої потреби',
          code: `docker build -t app .
docker run -p 3000:3000 --env-file .env app
docker compose up -d          # підняти app + db + redis
docker ps && docker logs -f <id>
docker exec -it <id> sh`,
        },
      ],
    },

    /* ---------- System design ---------- */
    {
      id: 'sd-cheat',
      title: '🧠 System Design — каркас',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="alert good"><strong>Згадай:</strong> load balancing · horizontal/stateless · caching+інвалідація · CAP/eventual consistency · черги · idempotency/retries · graceful degradation. Проговорюй trade-offs вголос.</div>`,
        },
      ],
    },

    /* ---------- Final ---------- */
    {
      id: 'final-cheat',
      title: '🎯 Головне правило',
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="alert good"><strong>Правильна Senior-відповідь</strong> майже завжди = «залежить від…» → варіанти → trade-off → конкретне рішення з обґрунтуванням. Демонструй інженерне судження, а не енциклопедію.</div>`,
        },
      ],
    },
  ],
}
