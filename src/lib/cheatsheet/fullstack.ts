// Fullstack topic — вичерпний довідник для frontend-розробника, який стає
// fullstack, та для підготовки до співбесіди Senior Full Stack Developer.
// Контент авторський (не auto-generated). Рендериться через ProseTopicView →
// ContentBlocks: блоки 'paragraph' (HTML у .cheat-prose), 'code' (інтерактивний
// CodeBlock з копіюванням) та 'note'. Картки/алерти/гриди — це HTML-класи
// всередині paragraph (.grid2/.grid3, .card.green/.card.red, .alert/.alert.warn),
// як у algorithms.ts та ide.ts. Кутові дужки в inline-коді HTML екрануються
// (&lt; &gt; &amp;); у блоках 'code' екранування НЕ потрібне (рендерить CodeBlock).
import type { TopicContent } from './types'

export const fullstackContent: TopicContent = {
  slug: 'fullstack',
  intro: [
    {
      kind: 'paragraph',
      html: `<p><strong>Full Stack Developer</strong> — розробник, який працює і над <strong>frontend</strong> (інтерфейс у браузері), і над <strong>backend</strong> (сервер, бізнес-логіка, дані), і дотичний до <strong>інфраструктури</strong> (бази даних, деплой, CI/CD). Для frontend-розробника шлях у fullstack — це насамперед опанування серверної частини: як влаштований HTTP, де й як зберігаються дані, як захистити застосунок і як вивести його у продакшн.</p>
        <p>Цей розділ — мапа того, що очікують від <strong>Senior</strong>: не «знати все напам'ять», а розуміти <em>trade-offs</em> (компроміси), вміти обґрунтувати вибір технології та спроєктувати систему під навантаження.</p>`,
    },
    {
      kind: 'paragraph',
      html: `<div class="alert"><strong>🧭 T-shaped профіль.</strong> Senior Fullstack — це «глибина в одному, ширина в усьому»: глибока експертиза в одному стеку (напр. TypeScript/Node + React) та робоче розуміння суміжних областей — БД, DevOps, безпека, архітектура. Співбесіда перевіряє саме ширину + здатність занурюватись на вимогу.</div>`,
    },
  ],
  sections: [
    /* ============ 1. Напрями та ролі ============ */
    {
      id: 'directions',
      title: '🧭 Напрями та ролі',
      interviewQuestions: [
        {
          question: 'Чому фронтенд-сеньйору варто розуміти бекенд-концепції, навіть якщо він не пише серверний код щодня?',
          answer: 'Сучасні фронтенд-фреймворки (Next.js, Remix) розмивають межу — фронтендер пише Server Actions, API routes, працює з кешуванням і базами напряму. Розуміння бекенд-обмежень (латентність, N+1 запити, транзакції) дозволяє приймати кращі архітектурні рішення на межі клієнт-сервер і ефективніше комунікувати з бекенд-командою.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>«Fullstack» — це парасолька над кількома реальними профілями. Розуміння, який саме fullstack потрібен команді, допомагає й на співбесіді, й у виборі вакансії.</p>
            <div class="grid3">
              <div class="card">
                <h4>Product Fullstack</h4>
                <p>Веде фічу «наскрізно»: UI → API → БД. Цінується швидкість і продуктове мислення. Стек зазвичай один (напр. TS усюди).</p>
              </div>
              <div class="card">
                <h4>BFF / API-розробник</h4>
                <p>Backend-for-Frontend: тонкий серверний шар, що агрегує дані для конкретного UI. GraphQL/tRPC, оркестрація мікросервісів.</p>
              </div>
              <div class="card">
                <h4>Platform / Infra-нахил</h4>
                <p>CI/CD, контейнери, observability, продуктивність. Менше UI, більше надійності та масштабування.</p>
              </div>
            </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Що очікують від Senior (а не Middle)</h3>
            <div class="grid2">
              <div class="card green">
                <h4>✅ Senior-сигнали</h4>
                <ul>
                  <li>Проєктує системи, а не лише пише ендпоінти</li>
                  <li>Думає про відмовостійкість, ідемпотентність, узгодженість даних</li>
                  <li>Обґрунтовує trade-offs (SQL vs NoSQL, monolith vs microservices)</li>
                  <li>Володіє безпекою (OWASP) та observability за замовчуванням</li>
                  <li>Менторить, рев'ює, впливає на технічні рішення</li>
                </ul>
              </div>
              <div class="card">
                <h4>🎯 Типові теми інтерв'ю</h4>
                <ul>
                  <li>System design (45–60 хв)</li>
                  <li>Глибокий backend: БД, кеш, черги, API</li>
                  <li>Безпека та автентифікація</li>
                  <li>DevOps-базис: Docker, CI/CD</li>
                  <li>Поведінкова секція: рішення та їх наслідки</li>
                </ul>
              </div>
            </div>`,
        },
      ],
    },

    /* ============ 2. Backend-мови та рантайми ============ */
    {
      id: 'backend-languages',
      title: '🗣️ Backend-мови та рантайми',
      interviewQuestions: [
        {
          question: 'Чому Node.js історично став популярним вибором саме для фронтенд-команд, що переходять у fullstack?',
          answer: 'Node.js дозволяє використовувати ту саму мову (JavaScript/TypeScript) і часто ті самі типи/утиліти на клієнті й сервері, знижуючи контекст-світчинг і дозволяючи ділитись кодом (валідаційні схеми, типи DTO) між фронтендом і бекендом без дублювання.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Backend пишуть багатьма мовами. Для frontend-розробника найприродніший вхід — <strong>Node.js (JS/TS)</strong>, бо мова та сама. Але Senior має розуміти ландшафт: коли й чому обирають інші.</p>
            <div class="grid2">
              <div class="card green">
                <h4>🟢 Node.js (JavaScript / TypeScript)</h4>
                <p><strong>Модель:</strong> однопотоковий event loop, неблокуючий I/O. Ідеальний для I/O-bound задач (API, реалтайм, проксі).</p>
                <p><strong>Чому fullstack:</strong> одна мова на клієнті й сервері, спільні типи (TS), величезна екосистема npm.</p>
                <p><strong>Слабко:</strong> CPU-bound задачі (важкі обчислення блокують loop → потрібні worker threads).</p>
              </div>
              <div class="card">
                <h4>🐍 Python</h4>
                <p><strong>Модель:</strong> синхронна за замовчуванням (+ async через asyncio). GIL обмежує справжню паралельність потоків.</p>
                <p><strong>Сильно:</strong> читабельність, дата-сайнс/ML, скрипти, швидке прототипування.</p>
                <p><strong>Фреймворки:</strong> Django, FastAPI, Flask.</p>
              </div>
              <div class="card">
                <h4>🐹 Go</h4>
                <p><strong>Модель:</strong> компільована, горутини (легкі потоки) + канали. Справжня паралельність.</p>
                <p><strong>Сильно:</strong> висока продуктивність, малий футпринт, статичний бінарник → ідеально для мікросервісів та CLI.</p>
                <p><strong>Слабко:</strong> лаконічність ціною багатослівності (verbose error handling).</p>
              </div>
              <div class="card">
                <h4>☕ Java / Kotlin (JVM)</h4>
                <p><strong>Модель:</strong> багатопотокова, JIT-компіляція, зріла JVM.</p>
                <p><strong>Сильно:</strong> enterprise, висока пропускна здатність, надійність, велика екосистема (Spring).</p>
                <p><strong>Слабко:</strong> багатослівність (менше з Kotlin), вищий поріг входу.</p>
              </div>
              <div class="card">
                <h4>🟣 C# / .NET</h4>
                <p><strong>Модель:</strong> багатопотокова, чудовий async/await (з якого, до речі, і взяли модель для JS).</p>
                <p><strong>Сильно:</strong> ASP.NET Core — швидкий і сучасний; крос-платформний; сильна типізація.</p>
                <p><strong>Де:</strong> enterprise, Windows-екосистема, ігри (Unity).</p>
              </div>
              <div class="card">
                <h4>🐘 PHP / 💎 Ruby</h4>
                <p><strong>PHP:</strong> досі величезна частка вебу (WordPress, Laravel). Сучасний PHP 8 — цілком пристойний.</p>
                <p><strong>Ruby:</strong> Rails — еталон «convention over configuration», швидкий старт продукту (GitHub, Shopify).</p>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'info',
          html: `<div class="alert"><strong>💬 На співбесіді.</strong> «Чому Node для нашого API?» — бо задача I/O-bound (читання/запис у БД та зовнішні сервіси), а не CPU-bound; одна мова на весь стек спрощує команду й шерінг типів. «А коли НЕ Node?» — важкі обчислення, потреба в справжній багатопотоковості, ML-пайплайни → Go / Python / JVM.</div>`,
        },
      ],
    },

    /* ============ 3. Backend-фреймворки ============ */
    {
      id: 'backend-frameworks',
      title: '🧱 Backend-фреймворки',
      interviewQuestions: [
        {
          question: 'У чому різниця між мінімалістичним фреймворком (Express/Fastify) і «батарейки включені» (NestJS) з точки зору команди, що масштабується?',
          answer: 'Express/Fastify дають мінімальний core і повну свободу вибору структури — швидко для маленьких сервісів, але команда сама встановлює конвенції, і вони можуть розходитись між розробниками. NestJS нав\'язує архітектуру (модулі, DI, декоратори, схожа на Angular) — вищий поріг входу, але узгодженість між великою кількістю розробників і сервісів вища «з коробки».',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Фреймворк дає маршрутизацію, middleware, валідацію, DI та структуру. Поділяють на <strong>мінімалістичні</strong> (ти збираєш стек сам) і <strong>«батарейки в комплекті»</strong> (усе з коробки).</p>
            <div class="grid3">
              <div class="card">
                <h4>Express (Node)</h4>
                <p>Де-факто стандарт, мінімалістичний, middleware-центричний. Гнучкий, але структуру будуєш сам.</p>
              </div>
              <div class="card">
                <h4>Fastify (Node)</h4>
                <p>Швидший за Express, схема-валідація (JSON Schema) з коробки, плагінна архітектура.</p>
              </div>
              <div class="card">
                <h4>NestJS (Node)</h4>
                <p>«Батарейки в комплекті»: DI, модулі, декоратори (як Angular), TS-first. Для великих структурованих застосунків.</p>
              </div>
              <div class="card">
                <h4>Django (Python)</h4>
                <p>Все включено: ORM, адмінка, auth, міграції. «Batteries included» для класичних вебзастосунків.</p>
              </div>
              <div class="card">
                <h4>FastAPI (Python)</h4>
                <p>Сучасний, async, авто-генерація OpenAPI з type hints + Pydantic-валідація. Дуже популярний для API.</p>
              </div>
              <div class="card">
                <h4>Spring Boot (Java)</h4>
                <p>Стандарт enterprise-Java: DI, потужна екосистема, конвенції, продакшн-фічі з коробки.</p>
              </div>
              <div class="card">
                <h4>ASP.NET Core (.NET)</h4>
                <p>Високопродуктивний, крос-платформний, сильна типізація, minimal APIs для лаконічних ендпоінтів.</p>
              </div>
              <div class="card">
                <h4>Gin / Echo (Go)</h4>
                <p>Легкі швидкі HTTP-фреймворки. Мінімум магії, максимум продуктивності.</p>
              </div>
              <div class="card">
                <h4>Rails / Laravel</h4>
                <p>Ruby on Rails та PHP Laravel — «convention over configuration», дуже швидкий продуктовий старт.</p>
              </div>
            </div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Мінімальний REST-ендпоінт: Express vs Fastify vs NestJS',
          code: `// Express — middleware-стиль
import express from 'express'
const app = express()
app.use(express.json())
app.get('/users/:id', async (req, res) => {
  const user = await db.user.findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'Not found' })
  res.json(user)
})
app.listen(3000)

// Fastify — схема-валідація з коробки
fastify.get('/users/:id', {
  schema: { params: { type: 'object', properties: { id: { type: 'string' } } } },
}, async (req) => db.user.findById(req.params.id))

// NestJS — декоратори + DI
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.findOne(id) // throw NotFoundException -> авто 404
  }
}`,
        },
      ],
    },

    /* ============ 4. HTTP та REST ============ */
    {
      id: 'http-rest',
      title: '🌐 HTTP та REST API',
      interviewQuestions: [
        {
          question: 'Чим PATCH відрізняється від PUT семантично, і чому плутанина між ними — типова помилка в REST API?',
          answer: 'PUT означає повну заміну ресурсу — клієнт надсилає весь об\'єкт, і будь-які поля, не вказані в тілі запиту, вважаються скинутими. PATCH — часткове оновлення, змінює лише перелічені поля. Використання PUT для часткового оновлення (як часто роблять помилково) ризикує випадково занулити поля, які клієнт не знав, що треба передати.',
        },
        {
          question: 'Чому статус-код 200 для помилки — погана практика, і які коди варто використовувати для типових ситуацій?',
          answer: 'Повернення 200 з тілом на кшталт <code>{ error: true }</code> ламає стандартну обробку помилок на клієнті (fetch/axios не кинуть виключення, кеш-проксі можуть кешувати «успішну» відповідь) і ускладнює моніторинг (алерти на 5xx не спрацюють). Коректно: 400 для невалідного запиту, 401/403 для авторизації, 404 для відсутнього ресурсу, 409 для конфлікту стану, 5xx для серверних помилок.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><strong>HTTP</strong> — фундамент вебу. Senior має точно розуміти методи, статус-коди, ідемпотентність та принципи дизайну REST.</p>
            <div class="grid2">
              <div class="card">
                <h4>HTTP-методи</h4>
                <ul>
                  <li><code>GET</code> — читання (безпечний, ідемпотентний, кешований)</li>
                  <li><code>POST</code> — створення (НЕ ідемпотентний)</li>
                  <li><code>PUT</code> — повна заміна (ідемпотентний)</li>
                  <li><code>PATCH</code> — часткове оновлення</li>
                  <li><code>DELETE</code> — видалення (ідемпотентний)</li>
                </ul>
              </div>
              <div class="card">
                <h4>Статус-коди</h4>
                <ul>
                  <li><strong>2xx</strong> — успіх (200 OK, 201 Created, 204 No Content)</li>
                  <li><strong>3xx</strong> — редірект (301, 304 Not Modified)</li>
                  <li><strong>4xx</strong> — помилка клієнта (400, 401, 403, 404, 409, 422, 429)</li>
                  <li><strong>5xx</strong> — помилка сервера (500, 502, 503, 504)</li>
                </ul>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'warn',
          html: `<div class="alert warn"><strong>⚠️ Часте питання: 401 vs 403.</strong> <code>401 Unauthorized</code> — ти не автентифікований (хто ти?). <code>403 Forbidden</code> — автентифікований, але немає прав (тобі сюди не можна). А <strong>ідемпотентність</strong> = повторний однаковий запит дає той самий результат без побічних ефектів (важливо для retry-логіки та мережевих збоїв).</div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Принципи REST та дизайн API</h3>
            <ul>
              <li><strong>Ресурси, не дії:</strong> <code>/users/123/orders</code>, а не <code>/getUserOrders</code>. Іменники в множині.</li>
              <li><strong>Стейтлес:</strong> кожен запит самодостатній; сервер не тримає сесійний стан між запитами (масштабованість).</li>
              <li><strong>Версіонування:</strong> <code>/api/v1/...</code> або через заголовок <code>Accept</code>.</li>
              <li><strong>Пагінація:</strong> cursor-based (стабільна для великих даних) vs offset-based (просто, але «дрейфує»).</li>
              <li><strong>Фільтри/сортування:</strong> через query-параметри: <code>?status=active&amp;sort=-createdAt&amp;limit=20</code>.</li>
              <li><strong>Узгоджені помилки:</strong> єдина форма тіла помилки (<code>{ error, code, details }</code>) на весь API.</li>
            </ul>`,
        },
      ],
    },

    /* ============ 5. GraphQL, gRPC, tRPC, realtime ============ */
    {
      id: 'graphql-rpc',
      title: '🔗 GraphQL, gRPC, tRPC, Realtime',
      interviewQuestions: [
        {
          question: 'Яку конкретну проблему REST API вирішує GraphQL, і яку нову проблему він при цьому створює?',
          answer: 'GraphQL вирішує over-fetching/under-fetching — клієнт запитує рівно ті поля, які йому потрібні, одним запитом замість кількох REST-ендпоінтів. Нова проблема — складність кешування на HTTP-рівні (усі запити зазвичай йдуть на один URL через POST, тому звичайний HTTP-кеш не працює) і ризик N+1-запитів на бекенді при наївній реалізації резолверів для вкладених полів.',
        },
        {
          question: 'Чим tRPC відрізняється від GraphQL з точки зору типобезпеки між клієнтом і сервером?',
          answer: 'tRPC дає end-to-end типізацію напряму через TypeScript — клієнт імпортує тип роутера сервера і отримує автокомпліт/перевірку типів без окремої схеми чи кодогенерації. GraphQL вимагає окрему схему (SDL) і зазвичай кодогенерацію для отримання типів на клієнті — потужніше для мультимовних/публічних API, але важче для простого TS-monorepo, де tRPC економить весь цей прошарок.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>REST — не єдиний спосіб спілкування клієнта й сервера. Senior знає альтернативи та коли вони доречні.</p>
            <div class="grid2">
              <div class="card">
                <h4>GraphQL</h4>
                <p>Одна точка входу, клієнт сам описує, які поля потрібні. Розв'язує <strong>over/under-fetching</strong>. Ціна: складність кешування, ризик N+1, потреба в обмеженні складності запитів.</p>
              </div>
              <div class="card">
                <h4>gRPC</h4>
                <p>Бінарний протокол на HTTP/2 + Protocol Buffers. Дуже швидкий, строгий контракт, стрімінг. Ідеально для <strong>service-to-service</strong>, гірше для браузера напряму.</p>
              </div>
              <div class="card">
                <h4>tRPC</h4>
                <p>End-to-end типобезпека для TS-моноріпо без кодогенерації: типи з сервера «протікають» у клієнт. Чудово для fullstack-TS (Next.js).</p>
              </div>
              <div class="card">
                <h4>REST</h4>
                <p>Простий, кешований, універсальний, найкраща підтримка інструментів. Дефолт для публічних API.</p>
              </div>
            </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Realtime: коли потрібні «живі» дані</h3>
            <div class="grid3">
              <div class="card">
                <h4>WebSockets</h4>
                <p>Повний дуплекс, постійне з'єднання. Чати, ігри, спільне редагування, трейдинг.</p>
              </div>
              <div class="card">
                <h4>SSE (Server-Sent Events)</h4>
                <p>Однонапрямний потік сервер→клієнт поверх HTTP. Простіший за WS. Нотифікації, стрім токенів LLM, фіди.</p>
              </div>
              <div class="card">
                <h4>Polling / Long-polling</h4>
                <p>Періодичні запити. Найпростіше, але неефективно. Fallback, коли WS/SSE недоступні.</p>
              </div>
            </div>`,
        },
      ],
    },

    /* ============ 6. SQL ============ */
    {
      id: 'databases-sql',
      title: '🗄️ Реляційні бази (SQL)',
      interviewQuestions: [
        {
          question: 'Що таке N+1 query problem, і як її типово вирішують?',
          answer: 'Виникає, коли код спершу отримує список записів одним запитом, а потім для <em>кожного</em> запису робить окремий додатковий запит (наприклад, підтягнути автора для кожного поста в циклі) — N+1 запитів замість 1-2. Вирішується eager loading (JOIN або <code>include</code> в ORM) чи батчингом запитів (DataLoader у GraphQL) замість запиту в циклі.',
        },
        {
          question: 'Чим індекс у базі даних прискорює вибірку, і чому не варто індексувати взагалі всі колонки?',
          answer: 'Індекс — окрема впорядкована структура (зазвичай B-tree), що дозволяє знаходити рядки за значенням колонки за O(log n) замість повного скану таблиці. Ціна — кожен індекс уповільнює операції запису (INSERT/UPDATE/DELETE мають оновити й індекс теж) і займає додатковий дисковий простір, тому індексують лише колонки, які реально часто фігурують у WHERE/JOIN/ORDER BY.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><strong>SQL-бази</strong> (PostgreSQL, MySQL) зберігають дані у таблицях зі строгою схемою та зв'язками. Дефолтний вибір для більшості систем — передбачувані, надійні, з потужними запитами та транзакціями.</p>
            <div class="grid2">
              <div class="card">
                <h4>Ключові концепції</h4>
                <ul>
                  <li><strong>Схема</strong> — таблиці, колонки, типи, обмеження (constraints)</li>
                  <li><strong>Ключі</strong> — PRIMARY KEY, FOREIGN KEY (цілісність зв'язків)</li>
                  <li><strong>Нормалізація</strong> — усунення дублювання (1NF→3NF)</li>
                  <li><strong>JOIN</strong> — INNER / LEFT / RIGHT / FULL для об'єднання таблиць</li>
                </ul>
              </div>
              <div class="card">
                <h4>PostgreSQL vs MySQL</h4>
                <p><strong>Postgres:</strong> багатші типи (JSONB, arrays, гео), строгіша відповідність стандарту, потужні фічі — дефолт для нового проєкту.</p>
                <p><strong>MySQL:</strong> простіший, дуже поширений, швидкий на простих читаннях.</p>
              </div>
            </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Індекси — головний інструмент продуктивності</h3>
            <p>Індекс (зазвичай B-tree) пришвидшує пошук ціною місця та повільнішого запису. <strong>Правило:</strong> індексуй колонки у <code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>. Аналізуй план запиту через <code>EXPLAIN ANALYZE</code>. Композитні індекси чутливі до порядку колонок (left-most prefix).</p>`,
        },
        {
          kind: 'code',
          language: 'sql',
          caption: 'Транзакція + індекс + EXPLAIN',
          code: `-- Транзакція: усе або нічого (atomic переказ коштів)
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- або ROLLBACK при помилці

-- Індекс під частий фільтр + сортування
CREATE INDEX idx_orders_user_created
  ON orders (user_id, created_at DESC);

-- Перевірка, чи використовується індекс
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42 ORDER BY created_at DESC LIMIT 20;`,
        },
        {
          kind: 'note',
          tone: 'info',
          html: `<div class="alert"><strong>🔑 ACID</strong> — гарантії транзакцій: <strong>A</strong>tomicity (усе або нічого), <strong>C</strong>onsistency (інваріанти БД зберігаються), <strong>I</strong>solation (паралельні транзакції не «бачать» проміжний стан одна одної), <strong>D</strong>urability (зафіксоване переживе збій). <strong>Рівні ізоляції</strong> (від слабшого до сильнішого): Read Uncommitted → Read Committed (дефолт Postgres) → Repeatable Read → Serializable. Слабші рівні швидші, але припускають аномалії (dirty/non-repeatable read, phantom).</div>`,
        },
      ],
    },

    /* ============ 7. NoSQL ============ */
    {
      id: 'databases-nosql',
      title: '📦 NoSQL та CAP',
      interviewQuestions: [
        {
          question: 'Поясни CAP-теорему своїми словами і чому розподілена система не може одночасно гарантувати всі три властивості.',
          answer: 'CAP — Consistency (усі вузли бачать однакові дані одночасно), Availability (кожен запит отримує відповідь), Partition tolerance (система працює навіть при розриві мережі між вузлами). При реальному розриві мережі (partition неминучий у розподіленій системі) доводиться обирати між Consistency і Availability — не можна гарантувати обидва одночасно саме в момент розриву.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><strong>NoSQL</strong> — родина баз без строгої реляційної схеми, оптимізованих під конкретні патерни доступу та горизонтальне масштабування.</p>
            <div class="grid2">
              <div class="card">
                <h4>Типи NoSQL</h4>
                <ul>
                  <li><strong>Document</strong> (MongoDB) — JSON-документи, гнучка схема</li>
                  <li><strong>Key-Value</strong> (Redis, DynamoDB) — найшвидший доступ за ключем</li>
                  <li><strong>Wide-column</strong> (Cassandra) — масивні записи, висока доступність</li>
                  <li><strong>Graph</strong> (Neo4j) — зв'язки як перший клас (соцмережі, рекомендації)</li>
                </ul>
              </div>
              <div class="card">
                <h4>Коли обирати NoSQL</h4>
                <ul>
                  <li>Гнучка/змінна схема, напівструктуровані дані</li>
                  <li>Величезний масштаб запису та горизонтальний шардинг</li>
                  <li>Прості патерни доступу за ключем (кеш, сесії, фіди)</li>
                  <li>Документ читається/пишеться цілком (агрегати)</li>
                </ul>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'warn',
          html: `<div class="alert warn"><strong>🧮 CAP-теорема.</strong> У розподіленій системі під час мережевого розриву (<strong>P</strong>artition) ти обираєш між <strong>C</strong>onsistency (усі бачать однакові дані) та <strong>A</strong>vailability (система відповідає завжди). SQL зазвичай тяжіє до CP, багато NoSQL — до AP з <strong>eventual consistency</strong> (дані «зійдуться» згодом). На практиці це trade-off, а не «або/або» назавжди.</div>`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert"><strong>💬 SQL чи NoSQL?</strong> Дефолт — <strong>реляційна (Postgres)</strong>: транзакції, зв'язки, гнучкі запити, JSONB коли треба гнучкість. NoSQL — коли є конкретна причина: масштаб, патерн доступу або модель даних, які реляційна обслуговує погано. «Polyglot persistence» — нормально мати Postgres + Redis (кеш) + щось ще під спецзадачу.</div>`,
        },
      ],
    },

    /* ============ 8. ORM ============ */
    {
      id: 'orm',
      title: '🧩 ORM та доступ до даних',
      interviewQuestions: [
        {
          question: 'Які приховані витрати продуктивності може вносити ORM порівняно з написаним вручну SQL?',
          answer: 'ORM може генерувати неоптимальні запити (зайві JOIN, вибірка всіх колонок замість потрібних), приховувати N+1-проблему за зручним API (<code>post.author</code> виглядає як просте звернення до поля, а насправді робить окремий запит), і додавати накладні витрати на маппінг рядків у об\'єкти. Для гарячих шляхів (hot paths) сеньйори часто профілюють згенерований SQL і за потреби переходять на сирі запити.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><strong>ORM</strong> (Object-Relational Mapping) відображає таблиці на об'єкти мови, дає типобезпеку, міграції та зручні запити замість сирого SQL.</p>
            <div class="grid3">
              <div class="card">
                <h4>Prisma (TS)</h4>
                <p>Декларативна схема, авто-генерація типобезпечного клієнта, чудові міграції та DX. Дефолт для нового TS-проєкту.</p>
              </div>
              <div class="card">
                <h4>Drizzle (TS)</h4>
                <p>«SQL-like» типобезпечний query-builder, легкий, близький до SQL, edge-friendly.</p>
              </div>
              <div class="card">
                <h4>TypeORM (TS)</h4>
                <p>Класичний ORM з декораторами та патерном Active Record / Data Mapper.</p>
              </div>
              <div class="card">
                <h4>SQLAlchemy (Python)</h4>
                <p>Потужний, гнучкий, де-факто стандарт у Python.</p>
              </div>
              <div class="card">
                <h4>Hibernate / JPA (Java)</h4>
                <p>Зрілий enterprise-ORM зі складним кешуванням та lazy-loading.</p>
              </div>
              <div class="card">
                <h4>EF Core (.NET)</h4>
                <p>LINQ-запити, міграції, сильна інтеграція з ASP.NET.</p>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'bad',
          html: `<div class="alert warn"><strong>🐛 Проблема N+1 — класичне питання.</strong> Завантажуєш список з N записів, а потім для кожного робиш окремий запит за зв'язаними даними → 1 + N запитів замість 1–2. Рішення: <strong>eager loading</strong> (<code>include</code> у Prisma / <code>JOIN</code> / <code>DataLoader</code> у GraphQL — батчинг). Завжди дивись, скільки реальних SQL-запитів генерує ORM.</div>`,
        },
        {
          kind: 'code',
          language: 'typescript',
          caption: 'Prisma: схема, запит без N+1, транзакція',
          code: `// schema.prisma
// model User { id Int @id @default(autoincrement()) posts Post[] }
// model Post { id Int @id author User @relation(fields:[authorId],references:[id]) authorId Int }

// ❌ N+1: окремий запит на posts для кожного user
const users = await prisma.user.findMany()
for (const u of users) u.posts = await prisma.post.findMany({ where: { authorId: u.id } })

// ✅ Один запит з include (eager loading)
const usersWithPosts = await prisma.user.findMany({ include: { posts: true } })

// Транзакція: усе або нічого
await prisma.$transaction([
  prisma.account.update({ where: { id: 1 }, data: { balance: { decrement: 100 } } }),
  prisma.account.update({ where: { id: 2 }, data: { balance: { increment: 100 } } }),
])`,
        },
      ],
    },

    /* ============ 9. Auth ============ */
    {
      id: 'auth',
      title: '🔐 Автентифікація та авторизація',
      interviewQuestions: [
        {
          question: 'Чим автентифікація на основі JWT принципово відрізняється від сесій на сервері, і які трейд-оффи кожного підходу?',
          answer: 'Сесія зберігає стан на сервері (в базі/Redis) і клієнт лише тримає ідентифікатор сесії — сервер може миттєво відкликати доступ, видаливши запис. JWT — самодостатній підписаний токен, сервер нічого не зберігає (stateless, легше масштабувати горизонтально), але відкликати конкретний токен до завершення його терміну дії складно без додаткового denylist-механізму, що частково повертає stateless-перевагу назад.',
        },
        {
          question: 'Чому JWT для автентифікації в браузері рекомендують зберігати в httpOnly cookie, а не в localStorage?',
          answer: 'localStorage доступний з JavaScript, тому будь-який XSS на сторінці може вкрасти токен. httpOnly cookie взагалі недоступна з JS-коду (браузер сам додає її до запитів), тому XSS не може її прочитати — залишається ризик CSRF, який закривається окремо (SameSite-атрибут, CSRF-токен).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><strong>Автентифікація</strong> (authn) — «хто ти?». <strong>Авторизація</strong> (authz) — «що тобі можна?». Дві різні задачі, які часто плутають.</p>
            <div class="grid2">
              <div class="card">
                <h4>Sessions (стейтфул)</h4>
                <p>Сервер створює сесію, зберігає її (БД/Redis), клієнту віддає cookie з session id. Легко відкликати, але потрібне сховище та «липкість» до сервера/спільний стор.</p>
              </div>
              <div class="card">
                <h4>JWT (стейтлес)</h4>
                <p>Підписаний токен з claims; сервер не зберігає стан, лише перевіряє підпис. Масштабовано, але <strong>важко відкликати</strong> до закінчення терміну → короткий TTL + refresh-токени.</p>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'warn',
          html: `<div class="alert warn"><strong>🍪 Cookies для токенів.</strong> Зберігай токен у <code>HttpOnly</code> cookie (JS не дістане → захист від XSS-крадіжки), <code>Secure</code> (лише HTTPS), <code>SameSite=Lax/Strict</code> (захист від CSRF). Зберігання JWT у <code>localStorage</code> вразливе до XSS — поширена помилка.</div>`,
        },
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>OAuth 2.0 / OIDC</h4>
                <p><strong>OAuth2</strong> — делегований доступ (вхід через Google/GitHub) без передачі пароля. <strong>OIDC</strong> — шар ідентичності поверх OAuth2 (id_token). Authorization Code Flow + PKCE — стандарт для вебу/SPA.</p>
              </div>
              <div class="card">
                <h4>Авторизація (RBAC / ABAC)</h4>
                <p><strong>RBAC</strong> — права через ролі (admin/editor/viewer). <strong>ABAC</strong> — права через атрибути (час, відділ, власник ресурсу). Перевіряй права на <strong>сервері</strong> завжди, навіть якщо UI вже сховав кнопку.</p>
              </div>
            </div>
            <div class="alert"><strong>🔒 Паролі.</strong> Ніколи не зберігай у відкритому вигляді. Хешуй повільним адаптивним алгоритмом із сіллю: <code>bcrypt</code>, <code>argon2</code> або <code>scrypt</code>. Ніколи не <code>md5</code>/<code>sha256</code> без солі.</div>`,
        },
      ],
    },

    /* ============ 10. Кешування ============ */
    {
      id: 'caching',
      title: '⚡ Кешування',
      interviewQuestions: [
        {
          question: 'Чим кешування на рівні CDN відрізняється від кешування в Redis на бекенді, і коли застосовувати кожне?',
          answer: 'CDN кешує статичний або рідко змінюваний контент максимально близько до користувача географічно — знижує латентність і навантаження на origin-сервер для контенту, однакового для всіх/більшості користувачів. Redis кешує персоналізовані чи часто змінювані дані на рівні бекенда (результати важких запитів до БД, сесії) — ближче до джерела правди, з тоншим контролем інвалідації.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Кеш — найдешевший спосіб прискорити систему: зберігаємо результат дорогої операції, щоб не рахувати знову. Питання — <em>де</em> кешувати і <em>як інвалідувати</em>.</p>
            <div class="grid3">
              <div class="card">
                <h4>Рівні кешу</h4>
                <ul>
                  <li><strong>Browser</strong> — HTTP-кеш, Service Worker</li>
                  <li><strong>CDN</strong> — статика та edge-кеш близько до користувача</li>
                  <li><strong>App</strong> — Redis / in-memory</li>
                  <li><strong>DB</strong> — query cache, materialized views</li>
                </ul>
              </div>
              <div class="card">
                <h4>Стратегії</h4>
                <ul>
                  <li><strong>Cache-aside</strong> — застосунок сам читає/пише кеш (найпоширеніше)</li>
                  <li><strong>Write-through</strong> — пишемо в кеш і БД одночасно</li>
                  <li><strong>Write-behind</strong> — у кеш одразу, у БД асинхронно</li>
                </ul>
              </div>
              <div class="card">
                <h4>Redis-сценарії</h4>
                <ul>
                  <li>Кеш результатів запитів</li>
                  <li>Сесії, rate limiting</li>
                  <li>Черги (lists), pub/sub, лідерборди (sorted sets)</li>
                  <li>Розподілені локи</li>
                </ul>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'warn',
          html: `<div class="alert warn"><strong>🧨 Найскладніше — інвалідація.</strong> «There are only two hard things in CS: cache invalidation and naming things.» Інструменти: <strong>TTL</strong> (час життя), <strong>подієва інвалідація</strong> (скидаємо ключ при зміні даних), <strong>версіонування ключів</strong>. Стережись: <em>cache stampede</em> (тисячі запитів б'ють у БД, коли ключ протух одночасно) → lock / stale-while-revalidate / jitter у TTL.</div>`,
        },
      ],
    },

    /* ============ 11. Черги та асинхронність ============ */
    {
      id: 'queues',
      title: '📨 Черги та асинхронна обробка',
      interviewQuestions: [
        {
          question: 'Яку проблему вирішують черги повідомлень (наприклад, RabbitMQ/SQS), яку неможливо коректно вирішити прямим синхронним викликом?',
          answer: 'Черга розв\'язує (decouples) виробника й споживача в часі — виробник може продовжити роботу одразу, не чекаючи, поки повільна операція (надсилання email, обробка зображення) завершиться, а споживач обробляє повідомлення у власному темпі. Це також дає природну стійкість до тимчасової недоступності споживача — повідомлення просто чекають у черзі замість втрати запиту.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Не все треба робити в межах HTTP-запиту. Надсилання email, генерація звітів, обробка відео — це <strong>фонові задачі</strong>. Черга розв'язує (decouples) виробника й споживача та згладжує піки навантаження.</p>
            <div class="grid2">
              <div class="card">
                <h4>Інструменти</h4>
                <ul>
                  <li><strong>RabbitMQ</strong> — класичний брокер повідомлень, гнучка маршрутизація</li>
                  <li><strong>Kafka</strong> — log-стрім, величезна пропускна здатність, event sourcing, аналітика</li>
                  <li><strong>BullMQ</strong> (Redis) — прості черги задач у Node</li>
                  <li><strong>SQS</strong> — керована черга в AWS</li>
                </ul>
              </div>
              <div class="card">
                <h4>Навіщо</h4>
                <ul>
                  <li>Швидка відповідь користувачу (важке — у фон)</li>
                  <li>Згладжування піків (buffer)</li>
                  <li>Розв'язка сервісів (event-driven)</li>
                  <li>Ретраї та відмовостійкість</li>
                </ul>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'info',
          html: `<div class="alert"><strong>🔁 Гарантії доставки та ідемпотентність.</strong> Більшість черг дають <strong>at-least-once</strong> (повідомлення може прийти двічі) → споживач має бути <strong>ідемпотентним</strong> (повторна обробка не дублює ефект — напр. через unique id операції). Невдалі повідомлення після N ретраїв ідуть у <strong>DLQ</strong> (Dead Letter Queue) для розбору. «Exactly-once» — дорого й часто ілюзорно; на практиці = at-least-once + ідемпотентність.</div>`,
        },
      ],
    },

    /* ============ 12. Архітектура ============ */
    {
      id: 'architecture',
      title: '🏛️ Архітектура застосунку',
      interviewQuestions: [
        {
          question: 'Коли монолітна архітектура насправді краща за мікросервіси для команди, що починає новий проєкт?',
          answer: 'Монoліт простіший у розробці, тестуванні й деплої на старті — немає накладних витрат на мережеву комунікацію між сервісами, розподілені транзакції чи оркестрацію деплоїв. Мікросервіси виправдані, коли є реальна потреба в незалежному масштабуванні/деплої частин системи різними командами — передчасний перехід на мікросервіси в маленькій команді зазвичай лише додає складність без вигоди.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid3">
              <div class="card green">
                <h4>Monolith</h4>
                <p>Один деплой, одна кодова база. <strong>Плюси:</strong> просто почати, легко рефакторити, одна транзакція. <strong>Дефолт</strong> для старту й більшості продуктів.</p>
              </div>
              <div class="card">
                <h4>Modular Monolith</h4>
                <p>Моноліт із чіткими внутрішніми межами модулів. Золота середина: простота деплою + дисципліна границь.</p>
              </div>
              <div class="card">
                <h4>Microservices</h4>
                <p>Багато незалежних сервісів. <strong>Плюси:</strong> незалежний скейл/деплой, ізоляція збоїв. <strong>Ціна:</strong> розподілені транзакції, мережа, observability, складність.</p>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'warn',
          html: `<div class="alert warn"><strong>⚠️ Не починай з мікросервісів.</strong> Класична Senior-відповідь: <em>«monolith first»</em>. Мікросервіси розв'язують <strong>організаційні</strong> та масштабні проблеми, але приносять розподілену складність. Дроби моноліт, коли межі стали зрозумілими й команда/навантаження цього вимагають — не «за модою».</div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Патерни всередині сервісу</h3>
            <ul>
              <li><strong>Layered</strong> — controller → service → repository (поділ відповідальностей)</li>
              <li><strong>Hexagonal / Ports &amp; Adapters</strong> — бізнес-логіка в центрі, зовнішнє (БД, API) — через адаптери; легко тестувати й заміняти</li>
              <li><strong>DDD-основи</strong> — bounded contexts, aggregates, ubiquitous language</li>
              <li><strong>BFF</strong> — окремий backend під кожен тип клієнта (web/mobile)</li>
              <li><strong>API Gateway</strong> — єдина точка входу: роутинг, auth, rate limiting перед сервісами</li>
            </ul>`,
        },
      ],
    },

    /* ============ 13. Безпека ============ */
    {
      id: 'security',
      title: '🛡️ Безпека вебзастосунків',
      interviewQuestions: [
        {
          question: 'Чим XSS відрізняється від CSRF, і які захисти закривають кожну з цих загроз?',
          answer: 'XSS — впровадження зловмисного JavaScript у сторінку (через несанітизований ввід користувача), що виконується в контексті довіреного сайту; захист — санітизація виводу/CSP-заголовки. CSRF — змушування браузера користувача виконати небажану дію на сайті, де він вже автентифікований (через сторонню форму/запит); захист — SameSite cookies, CSRF-токени, перевірка Origin/Referer заголовків.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Безпека — обов'язкова Senior-компетенція. Орієнтир — <strong>OWASP Top 10</strong> (найпоширеніші вразливості).</p>
            <div class="grid2">
              <div class="card red">
                <h4>🎯 Ключові вразливості</h4>
                <ul>
                  <li><strong>Injection</strong> (SQLi) — параметризовані запити / ORM, ніколи не конкатенуй ввід</li>
                  <li><strong>XSS</strong> — екранування виводу, CSP, не довіряй <code>innerHTML</code></li>
                  <li><strong>CSRF</strong> — SameSite-cookies, CSRF-токени</li>
                  <li><strong>Broken Auth</strong> — сесії/токени, MFA, rate limit на логін</li>
                  <li><strong>Broken Access Control</strong> — перевірка прав на сервері для КОЖНОГО ресурсу</li>
                </ul>
              </div>
              <div class="card green">
                <h4>✅ Базова гігієна</h4>
                <ul>
                  <li>Валідація та санітизація всього вводу (напр. <code>zod</code>)</li>
                  <li>HTTPS/TLS усюди, HSTS</li>
                  <li>Секрети — в env/secret manager, НЕ в git</li>
                  <li>Принцип найменших привілеїв (least privilege)</li>
                  <li>Rate limiting та захист від брутфорсу</li>
                  <li>Оновлення залежностей (<code>npm audit</code>, Dependabot)</li>
                </ul>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'warn',
          html: `<div class="alert warn"><strong>🌐 CORS — часто плутають із безпекою.</strong> CORS не «захищає твій сервер» — це механізм <em>браузера</em>, що дозволяє/забороняє JS з іншого origin читати відповідь. Сервер лише оголошує дозволені origins. Ставити <code>Access-Control-Allow-Origin: *</code> на приватний API з credentials — помилка. CSRF — інша загроза (зловмисний сайт робить запит від імені користувача); захист — SameSite-cookies + токени.</div>`,
        },
      ],
    },

    /* ============ 14. Тестування ============ */
    {
      id: 'testing',
      title: '🧪 Тестування',
      interviewQuestions: [
        {
          question: 'Як тестова піраміда (unit → integration → e2e) допомагає прийняти рішення, скільки тестів якого типу писати?',
          answer: 'Unit-тести дешеві й швидкі — їх має бути найбільше, вони покривають ізольовану логіку. Integration-тести дорожчі (піднімають частину системи разом), їх менше, вони перевіряють взаємодію компонентів. E2E — найдорожчі й найповільніші (весь стек, реальний браузер), тому їх мінімум, лише для критичних користувацьких сценаріїв. Порушення піраміди (забагато повільних e2e) робить CI повільним і крихким.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p><strong>Піраміда тестів:</strong> багато дешевих unit-тестів унизу, менше інтеграційних, мало повільних e2e зверху.</p>
            <div class="grid3">
              <div class="card">
                <h4>Unit</h4>
                <p>Окрема функція/модуль ізольовано, залежності — моки. Швидко, багато. Jest, Vitest, pytest.</p>
              </div>
              <div class="card">
                <h4>Integration</h4>
                <p>Кілька частин разом: API + реальна БД (часто в Docker / testcontainers). Supertest, тест-БД.</p>
              </div>
              <div class="card">
                <h4>E2E</h4>
                <p>Сценарій користувача через увесь стек у браузері. Playwright, Cypress. Повільно — лише критичні шляхи.</p>
              </div>
            </div>`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert"><strong>💬 Senior-нюанси.</strong> Не женися за 100% coverage — це метрика, а не мета; тестуй поведінку, а не реалізацію. <strong>Contract-тести</strong> (Pact) перевіряють сумісність між сервісами. <strong>Test pyramid vs trophy</strong> — для UI-важких застосунків інтеграційні тести часто дають кращий ROI, ніж купа unit-ів. Тести мають бути детерміновані (без flaky).</div>`,
        },
      ],
    },

    /* ============ 15. DevOps ============ */
    {
      id: 'devops',
      title: '🐳 DevOps та інфраструктура',
      interviewQuestions: [
        {
          question: 'Навіщо потрібна контейнеризація (Docker), якщо застосунок і так можна задеплоїти на сервер напряму?',
          answer: 'Контейнер пакує застосунок разом з усіма залежностями й точною версією рантайму в ізольований, відтворюваний артефакт — усуває проблему «у мене працює» через різницю в оточенні між dev/staging/prod. Це також спрощує горизонтальне масштабування (однаковий контейнер запускається на будь-якій кількості вузлів) і відкат (попередній образ завжди доступний для миттєвого повернення).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>Контейнери (Docker)</h4>
                <p>Пакує застосунок + залежності в образ → «працює однаково всюди». <strong>Шари</strong> образу кешуються (порядок інструкцій у Dockerfile важливий). <strong>Multi-stage build</strong> → малий фінальний образ. <code>docker-compose</code> підіймає локально app+БД+Redis.</p>
              </div>
              <div class="card">
                <h4>Оркестрація (Kubernetes)</h4>
                <p>Керує контейнерами в масштабі: деплой, self-healing, auto-scaling, service discovery. Складний — для багатьох проєктів вистачає PaaS (Vercel, Render, Fly.io, ECS).</p>
              </div>
            </div>`,
        },
        {
          kind: 'code',
          language: 'dockerfile',
          caption: 'Multi-stage Dockerfile для Node-застосунку',
          code: `# 1) build-стадія
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) runtime-стадія — лише потрібне → малий образ
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">CI/CD та IaC</h3>
            <ul>
              <li><strong>CI</strong> — на кожен push: lint → test → build (GitHub Actions, GitLab CI). Швидкий зворотний зв'язок, захист main.</li>
              <li><strong>CD</strong> — автодеплой після проходження CI (staging → production). Стратегії: blue-green, canary, rolling.</li>
              <li><strong>IaC</strong> (Terraform, Pulumi) — інфраструктура як код: відтворювана, версіонована, рев'юється у PR.</li>
              <li><strong>12-factor app</strong> — конфіг в env, стейтлес-процеси, логи в stdout, dev/prod parity.</li>
            </ul>`,
        },
        {
          kind: 'code',
          language: 'yaml',
          caption: '.gitlab-ci.yml — типовий pipeline (GitLab CI)',
          code: `stages:
  - lint
  - test
  - build
  - deploy

lint:
  stage: lint
  script:
    - npm ci
    - npm run lint

test:
  stage: test
  script:
    - npm run test -- --coverage
  coverage: '/All files[^|]*\\|[^|]*\\s+([\\d.]+)/'

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - echo "deploy dist/ to production"
  environment: production
  only:
    - main`,
        },
      ],
    },

    /* ============ 16. Хмари ============ */
    {
      id: 'cloud',
      title: '☁️ Хмари та деплой',
      interviewQuestions: [
        {
          question: 'Чим serverless (наприклад, AWS Lambda) відрізняється від традиційного сервера, що працює постійно, і які в цього трейд-оффи?',
          answer: 'Serverless-функція запускається лише на конкретний запит і масштабується автоматично до нуля між запитами — платиш лише за реальне виконання, не за простій. Трейд-офф — cold start (затримка на «холодний» запуск невикористовуваної функції) і обмеження на тривалість виконання/стан між викликами, що не підходить для довгих з\'єднань (WebSocket) чи важких, довготривалих обчислень.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid3">
              <div class="card">
                <h4>Великі провайдери</h4>
                <p><strong>AWS</strong> (найбільший), <strong>GCP</strong>, <strong>Azure</strong>. Ключові сервіси скрізь схожі: compute (EC2/VM), object storage (S3), managed DB (RDS), serverless (Lambda), черги (SQS).</p>
              </div>
              <div class="card">
                <h4>Serverless / Edge</h4>
                <p>Функції без керування серверами, оплата за виклик, авто-скейл до нуля. Edge — код близько до користувача. Мінус: cold start, ліміти, vendor lock-in.</p>
              </div>
              <div class="card">
                <h4>PaaS</h4>
                <p>Vercel (Next.js), Netlify, Render, Railway, Fly.io. Деплой з git без керування інфрою — швидкий шлях у прод.</p>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'info',
          html: `<div class="alert"><strong>💡 Прагматизм.</strong> Не кожному проєкту потрібен AWS+Kubernetes. Для більшості продуктів PaaS (Vercel/Render) + managed Postgres + Redis покривають усе й економлять місяці DevOps-роботи. Складну інфру вмикай, коли є реальна потреба (масштаб, комплаєнс, контроль вартості).</div>`,
        },
      ],
    },

    /* ============ 17. Observability ============ */
    {
      id: 'observability',
      title: '📈 Observability',
      interviewQuestions: [
        {
          question: 'Чим observability відрізняється від звичайного логування, і чому «в нас є логи» не означає «у нас є observability»?',
          answer: 'Observability — це здатність <em>ставити нові питання</em> про стан системи без попереднього деплою додаткового логування, спираючись на три стовпи: логи, метрики (агреговані числові показники) і трейси (шлях запиту через розподілену систему). Розрізнені текстові логи без кореляції (trace id) між сервісами не дозволяють швидко відповісти «чому саме цей запит користувача був повільним» у мікросервісній архітектурі.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Коли система в проді — треба <em>бачити</em>, що в ній відбувається. <strong>Три стовпи observability:</strong></p>
            <div class="grid3">
              <div class="card">
                <h4>Logs (логи)</h4>
                <p>Дискретні події. <strong>Структуровані</strong> (JSON) з рівнями та <code>correlationId</code>. Агрегація: ELK, Loki, Datadog.</p>
              </div>
              <div class="card">
                <h4>Metrics (метрики)</h4>
                <p>Числові ряди в часі: RPS, латентність (p50/p95/p99), помилки, CPU/RAM. Prometheus + Grafana.</p>
              </div>
              <div class="card">
                <h4>Traces (трейси)</h4>
                <p>Шлях одного запиту через сервіси. OpenTelemetry, Jaeger. Незамінні в мікросервісах.</p>
              </div>
            </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">ELK Stack — агрегація логів</h3>
            <p>ELK — три компоненти, кожен зі своєю відповідальністю в конвеєрі логів:</p>
            <div class="grid3">
              <div class="card">
                <h4>Elasticsearch</h4>
                <p>Пошуковий движок і сховище — приймає структуровані (JSON) логи, індексує їх, дозволяє швидкий повнотекстовий пошук і агрегації по мільйонах записів.</p>
              </div>
              <div class="card">
                <h4>Logstash / Filebeat</h4>
                <p>Збір і доставка. <strong>Filebeat</strong> — легкий агент на кожному хості, читає лог-файли й пересилає далі. <strong>Logstash</strong> — важчий, парсить/трансформує/збагачує (grok-патерни, фільтри) перед записом в Elasticsearch.</p>
              </div>
              <div class="card">
                <h4>Kibana</h4>
                <p>Візуалізація поверх Elasticsearch — дашборди, пошук по логах, побудова графіків і алертів на основі запитів.</p>
              </div>
            </div>
            <p><strong>Типовий потік:</strong> <code>app пише JSON-логи в stdout → Filebeat читає файл/контейнерний лог → Logstash парсить і збагачує → Elasticsearch індексує → Kibana візуалізує</code>.</p>
            <div class="alert"><strong>💬 Коли що.</strong> Self-hosted ELK — повний контроль і безкоштовний рушій, але важкий у підтримці (Elasticsearch-кластер, диск, ресурси). <strong>Managed</strong> (Datadog, Grafana Cloud) — платно, але без DevOps-накладних витрат. <strong>Loki</strong> (Grafana) — легша альтернатива: індексує лише метадані/labels, а не повний текст логу — дешевша, але менш гнучкий пошук.</div>`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert"><strong>🔔 Ще:</strong> <strong>health-checks</strong> (<code>/healthz</code>, liveness/readiness для k8s), <strong>error tracking</strong> (Sentry — стектрейси + контекст помилок), <strong>алерти</strong> на SLO/SLI (напр. p99-латентність або error-rate вище порогу). Дивись на <strong>перцентилі</strong>, не на середнє: середня латентність бреше, p99 показує реальний «хвіст».</div>`,
        },
      ],
    },

    /* ============ 18. Масштабування ============ */
    {
      id: 'scaling',
      title: '📊 Продуктивність і масштабування',
      interviewQuestions: [
        {
          question: 'Чим горизонтальне масштабування відрізняється від вертикального, і чому горизонтальне зазвичай кращий довгостроковий вибір?',
          answer: 'Вертикальне масштабування — збільшення потужності одного сервера (більше CPU/RAM); має фізичну стелю і створює єдину точку відмови. Горизонтальне — додавання більшої кількості серверів, що працюють паралельно за балансувальником навантаження; практично необмежене масштабування й вища відмовостійкість, але вимагає, щоб застосунок був stateless (або стан виносився в спільне сховище), інакше запити до різних вузлів побачать різний стан.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>Vertical vs Horizontal</h4>
                <p><strong>Vertical</strong> (scale up) — потужніша машина. Просто, але є стеля й ризик single point of failure. <strong>Horizontal</strong> (scale out) — більше машин за <strong>load balancer</strong>. Безмежніше, але потребує <strong>стейтлес</strong>-сервісів.</p>
              </div>
              <div class="card">
                <h4>Масштабування БД</h4>
                <p><strong>Read replicas</strong> — розвантажують читання. <strong>Sharding</strong> — горизонтальний поділ даних за ключем. <strong>Connection pooling</strong> (PgBouncer) — БД не любить тисячі з'єднань.</p>
              </div>
            </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Типові вузькі місця та як шукати</h3>
            <ul>
              <li><strong>N+1 запити</strong> — найчастіша причина повільного API (див. ORM)</li>
              <li><strong>Відсутній індекс</strong> — full table scan; лови через <code>EXPLAIN</code> та повільні логи</li>
              <li><strong>Блокуючі операції в event loop</strong> (Node) — виноси в worker / чергу</li>
              <li><strong>Надмірне навантаження на БД</strong> — кеш (Redis), CDN для статики</li>
              <li><strong>Stateless-сервіси</strong> — умова горизонтального скейлу (сесії/файли — у Redis/S3, не на диск інстансу)</li>
            </ul>
            <div class="alert"><strong>📐 Спершу виміряй.</strong> «Premature optimization is the root of all evil.» Профілюй, знайди реальне вузьке місце (метрики, трейси, <code>EXPLAIN</code>), і лише тоді оптимізуй. Інакше витратиш час не там.</div>`,
        },
      ],
    },

    /* ============ 19. System Design ============ */
    {
      id: 'system-design',
      title: '🧠 System Design для співбесіди',
      interviewQuestions: [
        {
          question: 'Який перший крок при відповіді на system design питання на співбесіді, перш ніж малювати діаграму компонентів?',
          answer: 'Уточнити вимоги й масштаб: скільки користувачів, читання vs запис (read-heavy чи write-heavy), допустима затримка, чи потрібна строга консистентність. Кандидат, що одразу малює архітектуру без цих уточнень, ризикує спроєктувати рішення для іншого масштабу, ніж той, що мав на увазі інтерв\'юер — уточнюючі питання самі по собі демонструють сеньйорський рівень мислення.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>System Design — ключова Senior-секція (45–60 хв). Перевіряє не «правильну відповідь», а <strong>хід думки</strong>: як ти структуруєш невизначеність і обґрунтовуєш рішення.</p>
            <h3 class="topic">Каркас відповіді (структуруй вголос)</h3>
            <ol>
              <li><strong>Вимоги</strong> — функціональні + нефункціональні (масштаб, латентність, доступність). Уточнюй, не припускай.</li>
              <li><strong>Оцінки (estimations)</strong> — DAU, RPS, обсяг даних, read/write ratio. «Back-of-the-envelope».</li>
              <li><strong>API</strong> — ключові ендпоінти / контракт.</li>
              <li><strong>Модель даних</strong> — сутності, SQL чи NoSQL і <em>чому</em>.</li>
              <li><strong>High-level дизайн</strong> — клієнт → LB → сервіси → БД/кеш/черга. Намалюй.</li>
              <li><strong>Глибше + bottlenecks</strong> — кеш, шардинг, репліки, CDN, черги. Trade-offs.</li>
            </ol>`,
        },
        {
          kind: 'paragraph',
          html: `<div class="grid2">
              <div class="card">
                <h4>Класичні задачі</h4>
                <ul>
                  <li>URL shortener (хешування, redirect, аналітика)</li>
                  <li>News feed (fan-out on write vs read)</li>
                  <li>Rate limiter (token bucket у Redis)</li>
                  <li>Chat (WebSockets, presence, доставка)</li>
                  <li>Notification system (черги, fan-out)</li>
                </ul>
              </div>
              <div class="card">
                <h4>Концепції, які згадати</h4>
                <ul>
                  <li>Load balancing, horizontal scaling</li>
                  <li>Caching (де й що) + інвалідація</li>
                  <li>CAP, eventual consistency</li>
                  <li>Черги для розв'язки та піків</li>
                  <li>Idempotency, retries, graceful degradation</li>
                </ul>
              </div>
            </div>
            <div class="alert"><strong>💬 Головне.</strong> Веди діалог, проговорюй trade-offs, не мовчи. Немає «єдино правильної» архітектури — є обґрунтовані компроміси під вимоги. Почни просто, ускладнюй на вимогу інтерв'юера.</div>`,
        },
      ],
    },

    /* ============ 20. Чеклист співбесіди ============ */
    {
      id: 'interview-checklist',
      title: '✅ Senior-чеклист співбесіди',
      interviewQuestions: [
        {
          question: 'Що інтерв\'юер сеньйорського рівня оцінює насамперед у відповіді кандидата — правильну фінальну відповідь чи хід міркувань?',
          answer: 'Хід міркувань цінується вище за єдину «правильну» відповідь, особливо в system design і відкритих технічних питаннях — інтерв\'юера цікавить, чи кандидат уточнює вимоги, розглядає трейд-оффи, вміє аргументувати вибір і визнає обмеження свого рішення, а не просто відтворює завчену відповідь без розуміння контексту.',
        },
        {
          question: 'Який мінімальний чекліст тем варто освіжити перед senior fullstack-співбесідою?',
          answer: 'Три блоки. <strong>Backend-фундамент:</strong> HTTP-методи, статус-коди, ідемпотентність, REST-принципи; event loop у Node (чому однопотоковий і коли блокується); SQL vs NoSQL — коли що й чому, ACID, рівні ізоляції, CAP; індекси, EXPLAIN, проблема N+1; транзакції та узгодженість даних. <strong>Системні аспекти:</strong> кешування (рівні, стратегії, інвалідація, stampede); черги (навіщо, at-least-once, ідемпотентність, DLQ); auth (sessions vs JWT, OAuth2/OIDC, RBAC, cookie-флаги); безпека (OWASP Top 10, XSS/CSRF/SQLi, CORS); масштабування (horizontal/stateless, replicas, sharding, LB). <strong>Інженерна зрілість:</strong> тестова піраміда, contract-тести, детермінізм; Docker, CI/CD, IaC, 12-factor; observability (logs/metrics/traces, перцентилі, алерти); каркас відповіді для system design з trade-offs вголос; поведінкові приклади (рішення, наслідки, менторство, вплив).',
        },
      ],
      blocks: [
        {
          kind: 'note',
          tone: 'good',
          html: `<div class="alert good"><strong>🎯 Підхід Senior.</strong> На більшість питань правильна відповідь починається з <em>«залежить від…»</em> і завершується конкретним вибором з обґрунтуванням trade-off. Демонструй не енциклопедію, а <strong>інженерне судження</strong>: вимоги → варіанти → компроміс → рішення. Це й відрізняє Senior від Middle.</div>`,
        },
      ],
    },

    /* ============ 21. Soft skills та STAR ============ */
    {
      id: 'soft-skills-star',
      title: '🤝 Soft Skills, STAR та поведінкові питання',
      interviewQuestions: [
        {
          question: 'Що таке метод STAR для відповіді на поведінкові питання, і чому структура відповіді важлива не менше за сам зміст?',
          answer: 'STAR — Situation (контекст), Task (яке завдання стояло), Action (що конкретно зробив кандидат), Result (вимірний результат). Структура важлива, бо неструктурована відповідь на кшталт «ну, було складно, але ми впорались» не дає інтерв\'юеру конкретних фактів для оцінки — STAR змушує кандидата навести перевірювані деталі й власний внесок, а не загальні враження.',
        },
        {
          question: '«Розкажи про співпрацю з backend/QA/дизайном над спільною фічею» — на що інтерв\'юер дивиться в цій відповіді?',
          answer: 'Це питання про team player / крос-функціональну команду — фокус має бути на комунікації з іншими ролями, а не лише на власному коді.',
        },
        {
          question: '«Коли ти довів завдання до кінця попри перешкоди?» — що варто показати у відповіді?',
          answer: 'Це питання про ownership — покажи ініціативу без вказівки зверху й відповідальність за результат, а не лише за написаний код.',
        },
        {
          question: '«Коли технічне рішення довелось підлаштувати під потреби користувача/бізнесу?» — яка ідея стоїть за цим питанням?',
          answer: 'Це перевірка product mindset / customer focus — покажи, що бачиш далі тікета: вплив на онбординг, pricing чи конверсію.',
        },
        {
          question: '«Як ти допомагав менш досвідченому колезі?» — чого чекає інтерв\'юер?',
          answer: 'Це питання про mentoring — потрібен конкретний приклад code review чи парного програмування з вимірюваним результатом, а не загальна фраза «допомагаю колегам».',
        },
        {
          question: '«Коли ти помітив проблему, яку ніхто не просив вирішувати?» — що це перевіряє?',
          answer: 'Це питання про проактивність — приклад, де ти сам підняв технічний борг чи ризик і довів справу до рішення, без чужого запиту.',
        },
        {
          question: '«Розкажи про досвід, де довелось розібратись у backend/DevOps поза власною зоною» — навіщо це питають?',
          answer: 'Перевіряють готовність виходити за межі FE — покажи цікавість до суміжних областей і швидкість навчання нового, а не відмову «це не моя зона».',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Технічних скілів достатньо для проходження першого етапу, але на behavioral-секції оцінюють <em>як ти працюєш з людьми</em>: ownership, продуктове мислення, комунікація, менторство. Структуруй відповіді методом <strong>STAR</strong>.</p>
            <div class="grid2">
              <div class="card">
                <h4>STAR — структура</h4>
                <ul>
                  <li><strong>Situation</strong> — короткий контекст (проєкт, команда, обмеження)</li>
                  <li><strong>Task</strong> — що конкретно від тебе вимагалось</li>
                  <li><strong>Action</strong> — що ти зробив <em>особисто</em> (не «ми», а «я»)</li>
                  <li><strong>Result</strong> — вимірюваний наслідок + що засвоїв</li>
                </ul>
              </div>
              <div class="card">
                <h4>Приклад (конфлікт у команді)</h4>
                <p><strong>S:</strong> два розробники по-різному бачили архітектуру фічі, дедлайн наближався. <strong>T:</strong> потрібно було розблокувати рішення, не зіпсувавши стосунки в команді. <strong>A:</strong> організував 30-хв дизайн-рев'ю, попросив кожного викласти trade-offs письмово, запропонував гібрид і зафіксував рішення в ADR. <strong>R:</strong> фічу здали вчасно, підхід із письмовими trade-offs команда лишила собі для майбутніх спорів.</p>
              </div>
            </div>`,
        },
        {
          kind: 'note',
          tone: 'info',
          html: `<div class="alert"><strong>🧰 Інструменти співпраці (буде плюсом).</strong> <strong>Miro</strong> — колаборативна дошка для планування спринтів, ретро, user-flow та архітектурних діаграм у реальному часі з командою. <strong>Tableau</strong> — BI/data-visualization інструмент для дашбордів на основі бізнес-метрик; для фронтендера це радше «розумію, навіщо продукту потрібні дашборди й аналітика», ніж хендс-он навичка — досить вміти підтримати розмову про те, як фронтенд-події (аналітика, метрики) потрапляють у такі дашборди.</div>`,
        },
      ],
    },
  ],
}
