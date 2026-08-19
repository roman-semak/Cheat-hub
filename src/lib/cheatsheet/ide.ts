// IDE topic — огляд найпоширеніших IDE/редакторів для JS/TS розробки.
// Контент авторський (не auto-generated). Рендериться через ProseTopicView →
// ContentBlocks: підтримуються блоки 'paragraph' (HTML у .cheat-prose) та
// 'code'. Картки/алерти/гриди — це HTML-класи всередині paragraph
// (.grid2, .card.green/.card.red, .alert/.alert.good), як у решті топіків.
import type { TopicContent } from './types'

export const ideContent: TopicContent = {
  slug: 'ide',
  intro: [
    {
      kind: 'paragraph',
      html: '<p><strong>IDE (Integrated Development Environment)</strong> — середовище, що поєднує редактор коду, автодоповнення, дебагер, інтеграцію з системою контролю версій та інші інструменти. Нижче — три найпоширеніші середовища для JavaScript/TypeScript розробки. Статистика популярності наведена за <strong>Stack Overflow Developer Survey 2024</strong>.</p>',
    },
  ],
  sections: [
    /* ---------- VS Code ---------- */
    {
      id: 'vs-code',
      title: '🟦 Visual Studio Code',
      interviewQuestions: [
        {
          question: 'Чому VS Code, попри те що написаний на Electron (тобто фактично веб-технології), не сприймається як «повільний» на відміну від багатьох інших Electron-застосунків?',
          answer: 'Основний текстовий редактор побудований на Monaco Editor — окремо оптимізованому компоненті з віртуалізацією рендеру (рендериться лише видима частина файлу) і ефективною інкрементальною токенізацією для підсвітки синтаксису, а не наївним рендером усього DOM-дерева файлу. Важкі операції (мовний сервер, git) винесені в окремі процеси, тому UI-потік лишається чутливим.',
        },
        {
          question: 'Яку роль відіграє Language Server Protocol (LSP) у VS Code, і чому це рішення дозволило масштабувати підтримку мов без переписування редактора?',
          answer: 'LSP стандартизує протокол комунікації між редактором і «мовним сервером» (autocomplete, go-to-definition, діагностика) — редактору не потрібно знати внутрішню специфіку кожної мови, він просто спілкується за єдиним протоколом. Це дозволило спільноті додавати підтримку нових мов, реалізуючи лише сервер, без зміни коду самого редактора.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <h3 class="topic">Хто і що</h3>
            <p><strong>Хто:</strong> розробники всіх рівнів — від новачків до senior; найширша аудиторія на ринку. <strong>Що:</strong> безкоштовний кросплатформний редактор коду (формально редактор, а не повна IDE) на базі <code>Electron</code>, що набуває можливостей IDE через розширення.</p>
            <h3 class="topic">Чому і для чого</h3>
            <p><strong>Чому:</strong> легкий, швидкий старт, безкоштовний і має величезну екосистему розширень. <strong>Для чого:</strong> веброзробка (JS/TS, React, Node.js), а також Python, Go та майже будь-яка мова через відповідні extensions і language servers.</p>
            <h3 class="topic">Ким створений</h3>
            <p><strong>Microsoft</strong>, перший реліз — <strong>2015</strong>. Open-source (ядро на <code>TypeScript</code>, ліцензія MIT).</p>
            <h3 class="topic">Як використовується</h3>
            <p>Встановлюється локально; функціональність нарощується розширеннями (ESLint, Prettier, мовні сервери). «З коробки» — вбудовані Git, інтегрований термінал, дебагер та спільне редагування (Live Share).</p>
          `,
        },
        {
          kind: 'paragraph',
          html: '<div class="alert"><strong>📊 Статистика (SO Survey 2024):</strong> ~<strong>74%</strong> розробників обирають VS Code — найпопулярніше середовище розробки у світі.</div>',
        },
        {
          kind: 'paragraph',
          html: `
            <div class="grid2">
              <div class="card green">
                <h4>✅ Хороші сторони</h4>
                <ul>
                  <li>Безкоштовний і open-source</li>
                  <li>Величезний marketplace розширень</li>
                  <li>Легкий, швидкий старт, крос-платформа</li>
                  <li>Вбудовані Git, термінал, дебагер</li>
                  <li>Активний розвиток і велика спільнота</li>
                </ul>
              </div>
              <div class="card red">
                <h4>⚠️ Погані сторони</h4>
                <ul>
                  <li>На великих проєктах поступається повноцінним IDE за глибиною рефакторингу</li>
                  <li>«Extension hell» — конфлікти та перевантаження розширеннями</li>
                  <li>Electron → помітне споживання RAM</li>
                  <li>Телеметрія Microsoft (альтернатива — VSCodium)</li>
                </ul>
              </div>
            </div>
          `,
        },
      ],
    },

    /* ---------- Cursor ---------- */
    {
      id: 'cursor',
      title: '🟣 Cursor',
      interviewQuestions: [
        {
          question: 'Чим AI-редактор на кшталт Cursor принципово відрізняється від VS Code з підключеним AI-розширенням?',
          answer: 'Cursor побудований як форк VS Code з AI, вбудованим на рівні ядра редактора (глибша інтеграція з індексацією кодової бази, контекстом редагування, multi-file diff-застосуванням), тоді як розширення в звичайному VS Code працює в межах Extension API, обмеженого тим, що цей API взагалі дозволяє — глибина інтеграції з внутрішнім станом редактора різна.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <h3 class="topic">Хто і що</h3>
            <p><strong>Хто:</strong> розробники, які активно використовують AI у щоденній роботі. <strong>Що:</strong> AI-first редактор коду — форк <code>VS Code</code> з глибокою інтеграцією великих мовних моделей (LLM).</p>
            <h3 class="topic">Чому і для чого</h3>
            <p><strong>Чому:</strong> AI-автодоповнення (Tab), чат із усією кодовою базою та агентний режим (Composer/Agent) для багатофайлових змін. <strong>Для чого:</strong> пришвидшення розробки — генерація, рефакторинг, пояснення коду та навігація великими репозиторіями за допомогою AI.</p>
            <h3 class="topic">Ким створений</h3>
            <p><strong>Anysphere</strong>, перший реліз — <strong>2023</strong>.</p>
            <h3 class="topic">Як використовується</h3>
            <p>Працює як VS Code (сумісний з його розширеннями та темами), додаючи AI-функції; дозволяє обирати модель (Claude, GPT тощо) і має <code>Privacy mode</code> для коду, що не повинен залишати машину.</p>
          `,
        },
        {
          kind: 'paragraph',
          html: '<div class="alert"><strong>📊 Статистика (SO Survey 2024):</strong> Cursor уперше зʼявився серед AI-інструментів розробників. Частка ще невелика порівняно з VS Code, але швидко зростає — один з лідерів категорії AI-редакторів.</div>',
        },
        {
          kind: 'paragraph',
          html: `
            <div class="grid2">
              <div class="card green">
                <h4>✅ Хороші сторони</h4>
                <ul>
                  <li>Найкраща AI-інтеграція «з коробки»</li>
                  <li>Сумісність з екосистемою розширень VS Code</li>
                  <li>Агентний режим для масштабних багатофайлових змін</li>
                  <li>Швидке впровадження нових AI-можливостей</li>
                </ul>
              </div>
              <div class="card red">
                <h4>⚠️ Погані сторони</h4>
                <ul>
                  <li>Платні тарифи за AI (Pro)</li>
                  <li>Відставання від upstream VS Code за версіями</li>
                  <li>Залежність від хмарних AI-провайдерів (приватність, vendor lock)</li>
                  <li>Ризик надмірної довіри до AI-генерованого коду</li>
                </ul>
              </div>
            </div>
          `,
        },
      ],
    },

    /* ---------- WebStorm / JetBrains ---------- */
    {
      id: 'webstorm-jetbrains',
      title: '🟠 WebStorm / JetBrains',
      interviewQuestions: [
        {
          question: 'Чим статичний аналіз WebStorm відрізняється від LSP-базованого підходу VS Code, і які в цього трейд-оффи?',
          answer: 'WebStorm використовує власний, вбудований у продукт індексатор і аналізатор коду (не зовнішній мовний сервер за протоколом), що дає глибшу, специфічну для JS/TS аналітику «з коробки» (рефакторинги, розумніший autocomplete) без потреби встановлювати й конфігурувати окремі мовні сервери. Ціна — важчий, повільніший стартовий індексинг великих проєктів і менша гнучкість/розширюваність порівняно з відкритою екосистемою LSP-серверів VS Code.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <h3 class="topic">Хто і що</h3>
            <p><strong>Хто:</strong> професійні JS/TS розробники та команди, які цінують потужний рефакторинг і надійність. <strong>Що:</strong> повноцінна комерційна IDE для JS/TS (<code>WebStorm</code>) із сімейства JetBrains (IntelliJ IDEA, PyCharm та ін.) на платформі IntelliJ.</p>
            <h3 class="topic">Чому і для чого</h3>
            <p><strong>Чому:</strong> глибокий статичний аналіз, найкращий у класі рефакторинг, навігація та інтегровані інструменти (дебагер, test runner, VCS, бази даних). <strong>Для чого:</strong> великі й складні frontend/Node проєкти, де критична надійність автоматичних рефакторингів і цілісне розуміння проєкту.</p>
            <h3 class="topic">Ким створений</h3>
            <p><strong>JetBrains</strong>; WebStorm — з <strong>2010</strong> (платформа IntelliJ — з 2001).</p>
            <h3 class="topic">Як використовується</h3>
            <p>Працює «з коробки» без ручного складання середовища: індексація проєкту, розумне автодоповнення, інспекції, рефакторинги (<code>Rename</code>, <code>Extract</code>, <code>Move</code>), інтеграція з Git/Docker/БД. З 2024 безкоштовний для некомерційного використання.</p>
          `,
        },
        {
          kind: 'paragraph',
          html: '<div class="alert"><strong>📊 Статистика (SO Survey 2024):</strong> IDE сімейства JetBrains стабільно посідають друге місце після VS Code (IntelliJ IDEA ~28%, WebStorm — кілька відсотків серед спеціалізованих JS/TS середовищ).</div>',
        },
        {
          kind: 'paragraph',
          html: `
            <div class="grid2">
              <div class="card green">
                <h4>✅ Хороші сторони</h4>
                <ul>
                  <li>Найкращий рефакторинг і навігація на ринку</li>
                  <li>Глибокий аналіз коду «з коробки», без налаштувань</li>
                  <li>Інтегровані інструменти (debug, тести, VCS, БД)</li>
                  <li>Надійність на великих і складних проєктах</li>
                </ul>
              </div>
              <div class="card red">
                <h4>⚠️ Погані сторони</h4>
                <ul>
                  <li>Платний для комерційного використання (підписка)</li>
                  <li>Важчий, повільніший старт та індексація проєкту</li>
                  <li>Високе споживання RAM/CPU</li>
                  <li>Крутіша крива входу порівняно з VS Code</li>
                </ul>
              </div>
            </div>
          `,
        },
      ],
    },

    /* ---------- Лінтери, форматери та якість коду ---------- */
    {
      id: 'linters-formatters',
      title: '🔍 Лінтери, форматери та якість коду',
      interviewQuestions: [
        {
          question: 'ESLint vs Prettier — хто за що відповідає?',
          answer: 'ESLint — статичний аналіз логіки та якості коду: ловить баги, анти-патерни, порушення правил (невикористані змінні, заборонені конструкції). Prettier — суто форматування (вигляд): відступи, лапки, переноси, крапки з комою, без розуміння сенсу коду. Це різні задачі, тому в реальному проєкті потрібні обидва інструменти, налаштовані так, щоб не конфліктувати.',
        },
        {
          question: 'Як прибрати конфлікт між ESLint і Prettier, коли обидва намагаються керувати форматуванням?',
          answer: 'У ESLint є власні форматувальні правила (quotes, indent, semi), які можуть суперечити Prettier. Рішення — поставити пакет <code>eslint-config-prettier</code> останнім у конфігу: він вимикає всі форматувальні правила ESLint, і форматом одноосібно керує Prettier. Два підходи до запуску: окремо (ESLint — якість, Prettier — формат, швидше) або через <code>eslint-plugin-prettier</code>, який ганяє Prettier як ESLint-правило (зручний єдиний --fix, але повільніше).',
        },
        {
          question: 'SonarQube vs ESLint — навіщо потрібні обидва?',
          answer: 'ESLint — швидкий локальний лінт одного файлу на pre-commit/CI, ловить конкретні порушення правил. SonarQube працює поверх ESLint/Prettier, а не замість них: рахує проєктні метрики в часі (cyclomatic complexity, дублювання коду, покриття тестами), класифікує знахідки на Bugs/Vulnerabilities/Code Smells і може заблокувати merge через Quality Gate — поріг, який PR має пройти (напр. coverage на новому коді ≥ 80%, 0 нових Bugs/Vulnerabilities, duplication &lt; 3%).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <div style="background: #1a1f2e; border-left: 4px solid #007acc; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
              <p><strong>Linter (ESLint):</strong> аналізує <em>логіку та якість</em> коду — ловить баги, анти-патерни, порушення правил (напр. невикористані змінні, заборонені API).</p>
              <p><strong>Formatter (Prettier):</strong> відповідає лише за <em>вигляд</em> — відступи, лапки, переноси, крапки з комою. Не дивиться на сенс коду.</p>
            </div>
            <h3 class="topic">Linter vs Formatter — навіщо взагалі <span class="tag tag-key">KEY</span></h3>
            <p>Єдиний стиль у команді (нема суперечок на code review про «табуляцію vs пробіли»), баги ловляться <em>до</em> рантайму, автофікс (<code>--fix</code>) економить час, а CI-гейти не пускають «брудний» код у main.</p>
            <div class="grid2">
              <div class="alert good"><strong>Лінтер ловить:</strong> невикористані змінні/імпорти, <code>any</code>, забуті <code>await</code>, мутації, потенційні баги.</div>
              <div class="alert good"><strong>Форматер ловить:</strong> довжину рядка, одинарні/подвійні лапки, відступи, trailing commas, переноси — суто оформлення, без оцінки логіки.</div>
            </div>
            <h3 class="topic">Prettier — форматування</h3>
            <p>Opinionated-форматер: переписує код за мінімальним набором опцій, прибираючи дискусії про стиль. Конфіг — <code>.prettierrc</code>. Форматування «на збереженні» + у pre-commit hook.</p>
          `,
        },
        {
          kind: 'code',
          language: 'json',
          caption: '.prettierrc',
          code: `{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "bracketSpacing": true
}`,
        },
        {
          kind: 'code',
          language: 'json',
          caption: '.vscode/settings.json — формат на збереженні',
          code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`,
        },
        {
          kind: 'paragraph',
          html: `
            <h3 class="topic">ESLint + Prettier разом без конфліктів <span class="tag tag-pit">PITFALL</span></h3>
            <p>У ESLint є власні форматувальні правила (<code>quotes</code>, <code>indent</code>, <code>semi</code>), які <em>сваряться</em> з Prettier — один хоче так, інший інакше. Рішення — віддати все форматування Prettier, а ESLint лишити тільки про якість коду.</p>
          `,
        },
        {
          kind: 'code',
          language: 'typescript',
          code: `// Вимкнути всі форматувальні правила ESLint, що конфліктують з Prettier
npm i -D eslint-config-prettier

// eslint.config.js — додати ОСТАННІМ у масив, щоб перекрив решту
const prettier = require("eslint-config-prettier");
module.exports = [ /* ...інші конфіги */, prettier ];`,
        },
        {
          kind: 'paragraph',
          html: `
            <div class="alert warn"><strong>Два підходи:</strong> (1) запускати їх <em>окремо</em> — ESLint для якості, Prettier для формату (рекомендовано, швидше). (2) <code>eslint-plugin-prettier</code> — ганяти Prettier <em>як</em> ESLint-правило: зручно одним <code>--fix</code>, але повільніше і «шумить» помилками форматування серед логічних. У будь-якому разі потрібен <code>eslint-config-prettier</code>, щоб прибрати дублювання.</div>
            <h3 class="topic">Stylelint &amp; EditorConfig</h3>
            <div class="grid2">
              <div>
                <p><strong>Stylelint</strong> — лінтер для CSS/SCSS (порядок властивостей, заборона <code>!important</code>, дублікати, невідомі одиниці). Конфіг <code>.stylelintrc</code>.</p>
                <pre>// .stylelintrc.json
{ "extends": "stylelint-config-standard-scss" }</pre>
              </div>
              <div>
                <p><strong>EditorConfig</strong> — рівень нижче лінтера: узгоджує базові налаштування IDE для всіх (відступи, charset, кінці рядків), незалежно від редактора.</p>
                <pre># .editorconfig
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
insert_final_newline = true</pre>
              </div>
            </div>
            <h3 class="topic">SonarQube — якість коду в CI <span class="tag tag-key">KEY</span></h3>
            <p>SonarQube — платформа статичного аналізу, що працює <em>поверх</em> ESLint/Prettier, а не замість них: рахує технічний борг, тримає історію метрик у часі й може заблокувати merge через <strong>Quality Gate</strong>. Класифікує знахідки на <strong>Bugs</strong> (ймовірно зламана логіка), <strong>Vulnerabilities</strong> (security-ризики) і <strong>Code Smells</strong> (погана підтримуваність — не баг, але ускладнює зміни).</p>
          `,
        },
        {
          kind: 'code',
          language: 'ini',
          caption: 'sonar-project.properties',
          code: `sonar.projectKey=my-app
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts,**/*.test.ts
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.exclusions=**/*.spec.ts,**/node_modules/**

# .github/workflows/ci.yml (фрагмент) — крок аналізу після тестів
- run: npm run test -- --coverage
- name: SonarQube Scan
  uses: sonarsource/sonarqube-scan-action@v2
  env:
    SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><strong>Quality Gate:</strong> набір порогів (напр. coverage on new code ≥ 80%, 0 нових Bugs/Vulnerabilities, duplication &lt; 3%), які PR має пройти, щоб merge був дозволений — це «останній бар'єр» окремо від ESLint-гейту в CI. <strong>SonarQube vs ESLint:</strong> ESLint — швидкий локальний лінт одного файлу на pre-commit; SonarQube — проєктний аналіз з історією трендів, дашбордом і гейтом на PR.</div>`,
        },
      ],
    },

    /* ---------- Node.js ---------- */
    {
      id: 'nodejs-runtime',
      title: '🟢 Node.js — рантайм для JS поза браузером',
      interviewQuestions: [
        {
          question: 'Що технічно дозволяє Node.js виконувати JavaScript поза браузером, і які частини він забирає в V8, а які додає сам?',
          answer: 'Node.js бере рушій виконання JS (парсинг, JIT-компіляція, garbage collection) напряму з <strong>V8</strong> — того самого движка, що в Chrome. Сам Node.js додає те, чого немає в браузерному V8: доступ до файлової системи (<code>fs</code>), мереж (<code>net</code>/<code>http</code>), процесів ОС (<code>process</code>, <code>child_process</code>) — і власний <strong>event loop</strong> на бібліотеці <code>libuv</code> (написаній на C), який відповідає за неблокуючий I/O (файли, мережа, таймери), відсутній у специфікації самого JS.',
        },
        {
          question: 'Чим event loop у Node.js відрізняється від event loop у браузері — зокрема, які там є додаткові фази?',
          answer: 'Браузерний event loop (спрощено) — call stack → microtasks (Promise) → один macrotask за раз (setTimeout, UI-подія) → рендер. Node.js через <code>libuv</code> має явно виділені <strong>фази</strong> в одному циклі: <code>timers</code> (спрацьовані <code>setTimeout</code>/<code>setInterval</code>) → <code>pending callbacks</code> → <code>poll</code> (I/O-події, тут очікування нових) → <code>check</code> (<code>setImmediate</code>) → <code>close callbacks</code>. Мікротаски (Promise, <code>process.nextTick</code>) виконуються між <em>кожною</em> фазою, а не лише раз на макротаск, причому <code>process.nextTick</code> має вищий пріоритет навіть за Promise-мікротаски.',
        },
        {
          question: 'У чому різниця між CommonJS (<code>require</code>) і ESM (<code>import</code>) у Node.js на рівні того, коли резолвляться залежності?',
          answer: 'CommonJS резолвить і виконує <code>require()</code> <strong>синхронно й у момент виконання коду</strong> (можна викликати <code>require</code> умовно всередині <code>if</code>), кожен модуль обгортається у функцію з <code>module.exports</code>. ESM (<code>import</code>) резолвиться <strong>статично</strong> ще до виконання коду (аналіз графу імпортів наперед) — це і дає tree-shaking, і водночас забороняє умовний/динамічний <code>import</code> у топ-рівневому вигляді (є окремий асинхронний <code>import()</code>-вираз для динамічного випадку). Node.js визначає формат файлу за розширенням (<code>.cjs</code>/<code>.mjs</code>) або полем <code>"type"</code> у <code>package.json</code>.',
        },
        {
          question: 'Чому CPU-важка синхронна операція (напр. складний <code>for</code>-цикл) блокує геть усі HTTP-запити в Node.js-сервері одночасно, тоді як I/O-операції (читання файлу, запит до БД) — ні?',
          answer: 'Node.js виконує JS-код в <strong>одному</strong> потоці (single-threaded для JS-логіки) — поки виконується синхронний код, event loop фізично не може обробити нічого іншого, включно з новими вхідними запитами. I/O-операції не блокують, тому що вони делеговані <code>libuv</code>, який виконує їх у власному пулі потоків (або через асинхронні системні виклики ОС) і лише сповіщає event loop колбеком, коли результат готовий — сам JS-потік увесь цей час вільний обробляти інші запити. Тому CPU-важкі обчислення в Node.js виносять у <code>worker_threads</code> або окремий процес, а не покладаються на "асинхронність" — вона рятує лише I/O.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <h3 class="topic">Хто і що</h3>
            <p><strong>Хто:</strong> будь-хто, хто пише JS/TS поза браузером — бекенд, CLI-тулінг, скрипти збірки. <strong>Що:</strong> рантайм-середовище для виконання JavaScript поза браузером, побудоване на движку <code>V8</code> (тому самому, що в Chrome).</p>
            <h3 class="topic">Чому і для чого</h3>
            <p><strong>Чому:</strong> той самий JS/TS і на фронтенді, і на бекенді (спільні типи, спільна команда), величезна екосистема <code>npm</code>, неблокуючий I/O добре підходить для мережевих сервісів. <strong>Для чого:</strong> бекенд-сервери (Express/Nest/Fastify), інструменти збірки (Vite/Webpack самі працюють у Node), CLI-утиліти, скрипти автоматизації.</p>
            <h3 class="topic">Ким створений</h3>
            <p><strong>Ryan Dahl</strong>, перший реліз — <strong>2009</strong>. Сьогодні розвивається під egis <strong>OpenJS Foundation</strong>.</p>
            <h3 class="topic">Як використовується</h3>
            <p>Встановлюється локально (напряму або через <code>nvm</code> для керування версіями); залежності — через <code>npm</code>/<code>yarn</code>/<code>pnpm</code> і <code>package.json</code>. Запуск файлу — <code>node script.js</code>; для довготривалих серверів — процес-менеджер (<code>pm2</code>) чи контейнеризація.</p>
          `,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Event loop — де ховається неблокуючий I/O <span class="tag tag-key">KEY</span></h3>
  <p>JS-код у Node виконується в одному потоці, але важкий I/O (файли, мережа, БД) не блокує його — робота делегується <code>libuv</code> (пул потоків/асинхронні системні виклики ОС), а результат повертається колбеком через event loop, коли готовий.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'Синхронний код блокує ВСІХ; асинхронний I/O — ні',
          code: `const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/blocking') {
    // ❌ Синхронний важкий цикл — блокує ВЕСЬ сервер, жоден інший запит
    // не обробиться, поки цей цикл не завершиться
    let sum = 0;
    for (let i = 0; i < 5_000_000_000; i++) sum += i;
    res.end(String(sum));
  } else {
    // ✅ fs.readFile — асинхронний, делегований libuv,
    // потік вільний обробляти інші запити, поки читається файл
    require('fs').readFile('./data.json', (err, data) => res.end(data));
  }
}).listen(3000);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">CommonJS vs ESM у Node.js</h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>CommonJS</th><th>ESM</th></tr>
      <tr><td>Синтаксис</td><td><code>require()</code> / <code>module.exports</code></td><td><code>import</code> / <code>export</code></td></tr>
      <tr><td>Резолвинг</td><td>Синхронний, у момент виконання (можна умовно)</td><td>Статичний, наперед — вмикає tree-shaking</td></tr>
      <tr><td>Як увімкнути в Node</td><td>За замовчуванням / <code>.cjs</code></td><td><code>"type": "module"</code> у package.json / <code>.mjs</code></td></tr>
    </table>
  </div>
  <h3 class="topic">npm — реєстр і керування залежностями</h3>
  <p><code>package.json</code> описує залежності й скрипти; <code>package-lock.json</code> фіксує точні версії для відтворюваних інсталяцій. <code>npm scripts</code> — стандартний спосіб визначити команди проєкту (<code>npm run build</code>).</p>`,
        },
        {
          kind: 'code',
          language: 'json',
          caption: 'package.json — мінімальний приклад',
          code: `{
  "name": "my-app",
  "type": "module",
  "scripts": {
    "dev": "node --watch server.js",
    "build": "tsc",
    "test": "vitest"
  },
  "dependencies": { "express": "^4.19.0" }
}`,
        },
      ],
    },

    /* ---------- Chrome DevTools ---------- */
    {
      id: 'chrome-devtools-tour',
      title: '🔧 Chrome DevTools — огляд панелей',
      interviewQuestions: [
        {
          question: 'Чим брейкпоінт, поставлений у вкладці Sources, кориснішиий за <code>console.log</code> для дебагу складної логіки?',
          answer: '<code>console.log</code> показує значення лише в тих точках коду, де ти заздалегідь здогадався його вставити — і для нового припущення доводиться змінювати код і перезапускати. Брейкпоінт зупиняє виконання <em>в реальному часі</em> на будь-якому рядку без зміни коду, дає доступ до Scope-панелі (усі локальні/closure/глобальні змінні на цей момент), Call Stack (весь ланцюжок викликів, що привів сюди), і дозволяє покроково виконувати код (Step over/into/out), змінюючи стан на льоту через консоль тут-таки, у контексті зупиненого виконання.',
        },
        {
          question: 'Як за допомогою вкладки Network відрізнити повільний бекенд від повільного парсингу/рендерингу на клієнті?',
          answer: 'Вкладка Network показує waterfall-діаграму кожного запиту з розбивкою фаз: <strong>TTFB</strong> (Time to First Byte — час до першого байта відповіді, це і є "як довго думав бекенд"), і час на завантаження/парсинг самої відповіді вже клієнтом. Якщо TTFB великий — проблема на сервері (повільний запит до БД, важка бізнес-логіка); якщо TTFB малий, а сторінка все одно повільна — шукати треба у вкладці Performance (парсинг JS, layout, paint), а не в мережі.',
        },
        {
          question: 'Що показує flame chart у вкладці Performance, і як за ним знайти "довгу задачу" (long task), що блокує UI?',
          answer: 'Flame chart — горизонтальні бари по осі часу, де кожен блок — виконання JS-функції, вкладеність по вертикалі показує стек викликів (хто кого викликав). "Довга задача" — синхронний блок виконання головного потоку довше ~50мс, під час якого браузер не може обробити взаємодію користувача (клік, скрол) чи перемалювати кадр — на flame chart це виглядає як суцільний широкий блок без розривів; клік на нього показує саме яка функція займала весь цей час.',
        },
        {
          question: 'Чим вкладка Application корисна для дебагу проблем із кешуванням/офлайн-режимом (PWA), окрім перегляду localStorage?',
          answer: 'Application показує стан усіх сховищ клієнта в одному місці — <code>localStorage</code>/<code>sessionStorage</code>/<code>IndexedDB</code>/cookies — і додатково статус зареєстрованого <strong>Service Worker</strong> (активний/очікує оновлення) та вміст <strong>Cache Storage</strong> (які саме запити закешовані офлайн-логікою). Це дозволяє відрізнити "дані застарілі, бо старий service worker досі активний" від "дані застарілі, бо неправильна кеш-стратегія" — без цієї вкладки довелось би здогадуватись наосліп.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">П'ять панелей, які використовуються найчастіше <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Панель</th><th>Для чого</th></tr>
      <tr><td><strong>Elements</strong></td><td>Живий DOM-інспектор — редагування HTML/CSS на льоту, підсвітка box-model, computed styles</td></tr>
      <tr><td><strong>Console</strong></td><td>Виконання JS у контексті сторінки, логи, помилки зі стек-трейсом</td></tr>
      <tr><td><strong>Sources</strong></td><td>Дебагер: брейкпоінти, Scope/Call Stack, step over/into/out, live edit коду</td></tr>
      <tr><td><strong>Network</strong></td><td>Усі мережеві запити: waterfall, заголовки, тіло відповіді, TTFB, розмір, статус</td></tr>
      <tr><td><strong>Performance</strong></td><td>Профайлер: flame chart виконання JS, layout/paint, FPS, довгі задачі (long tasks)</td></tr>
      <tr><td><strong>Application</strong></td><td>localStorage/sessionStorage/IndexedDB/cookies, Service Workers, Cache Storage, manifest.json (PWA)</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Sources — дебаг без console.log <span class="tag tag-pit">PITFALL</span></h3>
  <p>Брейкпоінт зупиняє виконання на конкретному рядку в реальному часі: <strong>Scope</strong>-панель показує всі локальні/closure/глобальні змінні на цей момент, <strong>Call Stack</strong> — увесь ланцюжок викликів, що привів сюди. Умовний брейкпоінт (клік правою кнопкою → "Add conditional breakpoint") зупиняє лише коли вираз істинний — рятує в циклі з тисячею ітерацій, де баг лише на 999-й.</p>
  <h3 class="topic">Network — де саме "повільно"</h3>
  <p><strong>TTFB</strong> (Time to First Byte) відділяє повільний бекенд від повільного клієнта: великий TTFB → сервер; малий TTFB, але сторінка все одно гальмує → дивитись Performance, не Network. Фільтр <code>Disable cache</code> і симуляція повільної мережі (<code>Slow 3G</code>) — стандартні прийоми перед деплоєм.</p>
  <h3 class="topic">Performance — long tasks і flame chart</h3>
  <p>Записаний профіль показує flame chart: широкий суцільний блок без розривів довше ~50мс — "довга задача", що блокує UI (клік по ньому — точна функція-винуватець). <strong>FPS-мітр</strong> зверху показує проблемні кадри (нижче 60fps) під час взаємодії/скролу.</p>`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">💡</span><span><strong>Command Menu</strong> (<code>Cmd/Ctrl+Shift+P</code> у відкритих DevTools) — швидкий доступ до рідше використовуваних команд без пошуку по меню: "Capture screenshot", "Show Coverage", "Disable JavaScript" тощо.</span></div>`,
        },
      ],
    },
  ],
}
