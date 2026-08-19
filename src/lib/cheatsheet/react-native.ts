// React Native — мобільний React, від основ до Senior.
// Розширена версія (reactNativeContent) поверх спільної структури секцій.
// Формат контенту — TopicContent/ContentBlock (types.ts).
//
// Курс передбачає, що читач вже знає React (компонентна модель, хуки, стан) —
// див. react.ts. Тут — лише те, що́ дійсно інше на мобільному: рендерер,
// стилі/layout, навігація, нативні API, продуктивність, дебаг, тестування,
// деплой. Короткий вступ "той самий React, інший рендерер" — секція
// react-native-ecosystem у react.ts.

import type { TopicContent } from './types'

export const reactNativeContent: TopicContent = {
  slug: 'react-native',
  intro: [
    {
      kind: 'paragraph',
      html: `<p>Цей курс — доповнення до курсу React, не повтор. Компонентна модель, JSX, хуки, стан, Context, реконсиляція — вже розкриті в курсі React і тут не повторюються. Якщо ще не бачив короткий вступ "той самий React, інший рендерер" (Fabric/TurboModules/JSI, Expo) — він у курсі React, секція <strong>📱 React Native та поза-браузерні рендерери</strong>. Тут — лише те, що дійсно інше на мобільному.</p>`,
    },
  ],
  sections: [
    /* ============================= PHASE A — SETUP & STRUCTURE ============================= */
    {
      id: 'rn-carryover-vs-different',
      title: '🔄 Що переноситься з React 1:1, а що інше',
      interviewQuestions: [
        {
          question: 'Назви три речі, які на співбесіді про React Native типово плутають "виглядає інакше" з "працює інакше" — тобто де насправді нічого нового вчити не треба.',
          answer: '<strong>Хуки й компонентна модель</strong> — <code>useState</code>/<code>useEffect</code>/кастомні хуки working без змін. <strong>State-менеджери</strong> — Redux/Zustand/TanStack Query не залежать від DOM, підключаються так само. <strong>Форм-бібліотеки</strong> — <code>react-hook-form</code> + <code>zod</code> валідують дані незалежно від того, чи інпут рендериться в <code>&lt;input&gt;</code> чи <code>&lt;TextInput&gt;</code>. Різниця — лише в тому, <em>які теги</em> ти передаєш у ці незмінні API.',
        },
        {
          question: 'Що з переліку типово ламається при першому портуванні React-компонента на React Native, і чому?',
          answer: 'Три класичні пастки: (1) голий текстовий вузол поза <code>&lt;Text&gt;</code> — рантайм-помилка, бо RN не має text-вузлів DOM; (2) CSS-in-JS/Tailwind-класи — не існує CSS-каскаду, лише <code>StyleSheet</code>-об\'єкти; (3) <code>&lt;a href&gt;</code>/History API для навігації — немає URL-рядка, навігація йде через стек екранів (React Navigation / Expo Router).',
        },
        {
          question: 'Якщо команда вже має React-застосунок і хоче mobile-версію — що з існуючого коду реально перевикористовується, а що доведеться писати заново?',
          answer: 'Перевикористовується <strong>бізнес-логіка</strong>: hooks без DOM-залежностей, API-клієнти (fetch/axios), валідаційні схеми, більшість state-менеджменту — усе це можна винести у спільний пакет (monorepo, напр. Turborepo) і імпортувати з обох застосунків. Заново пишеться <strong>UI-шар</strong>: усі компоненти з DOM-тегами, стилі (CSS → StyleSheet), навігація, і будь-який код, що торкається браузерних API (<code>localStorage</code>, <code>document</code>, <code>window</code>).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Один компонентний рушій, дві поверхні рендерингу <span class="tag tag-key">KEY</span></h3>
  <p>React Native — не окрема мова чи окремий React. Той самий движок (JSX → Fiber-реконсиляція → коміт) працює однаково; змінюється лише <strong>рендерер</strong>, у який Fiber коммітить дерево. Це означає: усе, що не залежить від DOM/CSS/браузерних API, переноситься між React web та React Native буквально без змін.</p>
  <div class="grid2">
    <div class="card green">
      <h4>✅ Переноситься без змін</h4>
      <ul class="list">
        <li>JSX, хуки (<code>useState</code>, <code>useEffect</code>, <code>useMemo</code>, кастомні хуки)</li>
        <li>Props/state, Context, реконсиляція та правила ре-рендерів</li>
        <li>Redux / Zustand / TanStack Query / RxJS — жодних DOM-залежностей</li>
        <li><code>react-hook-form</code> + <code>zod</code> — валідація не знає, який тег під капотом</li>
        <li>TypeScript-типи, бізнес-логіка, API-клієнти (fetch/axios)</li>
      </ul>
    </div>
    <div class="card yellow">
      <h4>🔁 Принципово інше</h4>
      <ul class="list">
        <li>Немає DOM/CSS — <code>StyleSheet</code> замість каскаду, Flexbox-підмножина</li>
        <li>Навігація — стек екранів (React Navigation/Expo Router), не URL/History API</li>
        <li>Нативні модулі, дозволи, платформо-специфічний код</li>
        <li>Збірка та деплой — Metro/EAS замість Vite/Webpack + статичний хостинг</li>
        <li>Дебаг- і тест-тулінг — React Native DevTools, Detox/Maestro замість браузерних devtools/Playwright</li>
      </ul>
    </div>
  </div>
  <div class="alert"><span class="icon">📎</span><span>Короткий вступ "той самий React, інший рендерер" (Fabric/TurboModules/JSI, Expo) — у курсі React, секція <strong>📱 React Native та поза-браузерні рендерери</strong>. Цей курс іде далі — у практичну мобільну розробку.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-setup-expo-vs-bare',
      title: '🚀 Expo vs Bare workflow',
      interviewQuestions: [
        {
          question: 'У чому конкретно різниця між "Expo" і "bare React Native CLI" — і чому офіційна документація сьогодні рекомендує Expo за замовчуванням для нових проєктів?',
          answer: 'Bare workflow — це голий React Native: ти сам володієш папками <code>ios/</code>/<code>android/</code>, сам інтегруєш нативні залежності через Xcode/Android Studio, сам збираєш навігацію й доступ до нативних API з нуля. Expo — надбудова: готові universal-бібліотеки (камера, локація, сповіщення), file-based routing (Expo Router), збірка в хмарі (EAS) без локального Xcode, і <strong>config plugins</strong> — спосіб додати нативний код без ручного редагування нативних проєктів. Рекомендація Expo за замовчуванням — бо це прибирає роки накопиченого нативного tooling-болю, лишаючи "eject" у bare як опцію на випадок нестандартної нативної потреби.',
        },
        {
          question: 'Проєкт стартував на Expo (managed workflow). Команді знадобився нативний SDK, якого немає серед Expo-модулів і немає готового config plugin. Які є варіанти, і чи означає це відмову від Expo?',
          answer: 'Ні — Expo Development Builds/Continuous Native Generation (prebuild) дозволяють додати будь-який нативний код, лишаючись у екосистемі Expo: (1) знайти/написати config plugin, що модифікує нативний проєкт при <code>expo prebuild</code>; (2) якщо плагіна нема — написати власний нативний модуль і підключити його через prebuild. Повна відмова від Expo (bare CLI з нуля) потрібна рідко — Expo сьогодні не "легка пісочниця", а повноцінний production-tooling з можливістю дотягнутись до нативного шару.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Дві точки старту <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>Expo (рекомендовано)</th><th>Bare workflow</th></tr>
      <tr><td>Старт</td><td><code>npx create-expo-app@latest</code></td><td><code>npx @react-native-community/cli init</code></td></tr>
      <tr><td>Нативні проєкти</td><td>Приховані, керуються через config plugins + prebuild</td><td>Повний доступ і відповідальність — <code>ios/</code>, <code>android/</code> у репозиторії</td></tr>
      <tr><td>Збірка</td><td>Хмарна (EAS Build) — без локального Xcode/Android Studio</td><td>Локальна, потрібні Xcode + Android Studio</td></tr>
      <tr><td>Навігація/API</td><td>Готові universal-бібліотеки, Expo Router</td><td>Збираєш сам з community-пакетів</td></tr>
      <tr><td>Коли обирати</td><td>Типовий старт нового проєкту</td><td>Нестандартні нативні вимоги поза Expo config plugins</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'bash',
          caption: 'Старт нового проєкту',
          code: `# Expo — рекомендований шлях
npx create-expo-app@latest my-app
cd my-app
npx expo start          # QR-код -> Expo Go на телефоні, або симулятор

# Bare React Native CLI — коли потрібен повний контроль над нативним кодом
npx @react-native-community/cli init MyApp
cd MyApp
npx react-native run-ios       # потребує Xcode
npx react-native run-android   # потребує Android Studio`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert good"><span class="icon">✅</span><span>Практичний висновок: "Expo — це лише для прототипів" — застаріле уявлення. Сьогодні Expo Development Builds + EAS покривають production-сценарії, включно з кастомним нативним кодом; bare CLI лишається нішевим вибором для команд із дуже специфічними нативними вимогами поза межами config-plugin-екосистеми.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-project-structure-metro',
      title: '📁 Структура проєкту та Metro-бандлер',
      interviewQuestions: [
        {
          question: 'Чим Metro (бандлер React Native) принципово відрізняється від Vite/Webpack, і чому web-інтуїція про code-splitting тут не застосовна напряму?',
          answer: 'Metro збирає <strong>єдиний JS-бандл</strong> для мобільного рантайму — немає браузерної моделі "завантажити chunk по кліку": увесь JS має бути в застосунку від старту (route-based lazy-import можливий, але не для зменшення initial network payload, як у вебі — мобільний застосунок і так весь встановлений локально). Головна суперсила Metro — <strong>платформо-усвідомлений resolver</strong>: файл <code>Button.ios.tsx</code> автоматично резолвиться замість <code>Button.tsx</code> на iOS-збірці, без жодного конфігу бандлера.',
        },
        {
          question: 'Що таке Fast Refresh у React Native, і чим він відрізняється від звичайного Hot Module Replacement у вебі?',
          answer: 'Fast Refresh — те саме зерно ідеї, що й React Fast Refresh у web (Vite/CRA): зберігає React-стан компонента при редагуванні файлу, повний ре-маунт лише при синтаксичній помилці або зміні, що React не може безпечно застосувати "на льоту". Різниця з веб-HMR — це не браузерний WebSocket до dev-сервера, а протокол Metro поверх з\'єднання з нативним рантаймом (Expo Go / dev-client), тому й working однаково на симуляторі й фізичному пристрої в тій самій Wi-Fi мережі.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'text',
          caption: 'Типова структура Expo-проєкту (Expo Router)',
          code: `my-app/
├── app/                  # файлова навігація — папка = маршрут (Expo Router)
│   ├── (tabs)/
│   │   ├── _layout.tsx   # спільний layout для табів
│   │   └── index.tsx     # головний екран таба
│   └── _layout.tsx       # кореневий layout застосунку
├── components/
├── assets/
├── app.json              # конфіг Expo (ім'я, іконка, splash, плагіни)
├── eas.json               # профілі збірки EAS (build/submit)
└── metro.config.js        # кастомізація резолвера/трансформера Metro`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Metro vs Vite/Webpack</h3>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>Vite/Webpack (React web)</th><th>Metro (React Native)</th></tr>
      <tr><td>Ціль</td><td>Браузер — множинні chunk'и, lazy-load по мережі</td><td>Мобільний рантайм — єдиний JS-бандл, встановлений локально</td></tr>
      <tr><td>Платформо-резолюція</td><td>Немає (одна платформа — браузер)</td><td><code>.ios.tsx</code>/<code>.android.tsx</code> резолвиться автоматично</td></tr>
      <tr><td>Dev-оновлення</td><td>HMR через WebSocket до dev-сервера</td><td>Fast Refresh через Metro dev-сервер + нативний рантайм</td></tr>
      <tr><td>Production-вихід</td><td>Статичні файли на CDN</td><td>JS-бандл, запакований у нативний app-бінарник (+ OTA-оновлення)</td></tr>
    </table>
  </div>`,
        },
      ],
    },

    /* ============================= PHASE B — CORE UI COMPONENTS ============================= */
    {
      id: 'rn-core-view-text',
      title: '🧱 View & Text — базові будівельні блоки',
      interviewQuestions: [
        {
          question: 'Розробник переносить веб-компонент на React Native і отримує помилку "Text strings must be rendered within a <Text> component". У чому причина, і чому такого класу помилок не існує в React DOM?',
          answer: 'У DOM голий текстовий вузол (<code>&lt;div&gt;Привіт&lt;/div&gt;</code>) — валідний, браузер сам знає, як його рендерити. У React Native кожен нативний UI-компонент — окремий native view з фіксованою поведінкою; <code>&lt;Text&gt;</code> — єдиний компонент, що вміє рендерити рядки символів (шрифти, перенос рядків, вибір тексту). <code>&lt;View&gt;</code> — контейнер layout\'у й не має жодної логіки для тексту, тому будь-який текст поза <code>&lt;Text&gt;</code> — рантайм-помилка, а не тиха деградація.',
        },
        {
          question: 'Чим <View> відрізняється від <div> з точки зору моделі відображення?',
          answer: 'У DOM <code>&lt;div&gt;</code> за замовчуванням <code>display: block</code>, а inline-елементи (<code>&lt;span&gt;</code>) поводяться інакше. У React Native <strong>усе — flex-контейнер</strong>: немає block/inline-розрізнення, немає "нормального потоку" документа — layout завжди рахується через Flexbox. <code>&lt;View&gt;</code> сам по собі — просто прямокутник без стилів за замовчуванням.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Правило №1: текст лише в &lt;Text&gt; <span class="tag tag-pit">PIT</span></h3>
  <p><code>&lt;View&gt;</code> — аналог <code>&lt;div&gt;</code> для layout, але без блоку/inline-розрізнення: усе всередині — flex-контейнер за замовчуванням. <code>&lt;Text&gt;</code> — єдиний спосіб вивести символи на екран; на відміну від DOM, де текст може "просто лежати" всередині будь-якого елемента.</p>
  <div class="alert warn"><span class="icon">⚠️</span><span><strong>Типова помилка:</strong> <code>&lt;View&gt;Привіт&lt;/View&gt;</code> кине "Text strings must be rendered within a &lt;Text&gt; component" — навіть якщо текст прийшов з умовного рендеру (<code>{count &amp;&amp; 'є елементи'}</code> теж має бути обгорнутий, а <code>{count &amp;&amp; &lt;Text&gt;є елементи&lt;/Text&gt;}</code> — правильно).</span></div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'View + Text — мінімальний приклад',
          code: `import { View, Text } from 'react-native';

function Greeting({ name }: { name: string }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Привіт, {name}!</Text>
      {/* Text успадковує стилі шрифту від батьківського Text, але НЕ від View */}
      <Text>
        Вкладений <Text style={{ fontWeight: 'bold' }}>жирний</Text> текст — ок.
      </Text>
    </View>
  );
}`,
        },
      ],
    },
    {
      id: 'rn-core-input-pressable',
      title: '👆 TextInput, Pressable/Touchable, Button, Switch',
      interviewQuestions: [
        {
          question: 'Чому в React Native <TextInput> використовує onChangeText, а не onChange з event.target.value, як у web-<input>?',
          answer: 'Немає DOM <code>event.target</code> — немає реального input-елемента браузера з <code>.value</code>. RN напряму передає у колбек уже готовий рядок: <code>onChangeText={(text) => setValue(text)}</code>. Це не query "гірший" API — навпаки, простіший, бо прибирає весь ритуал <code>event.target.value</code>, властивий DOM-моделі.',
        },
        {
          question: 'В екосистемі RN є TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback і Pressable. Що з цього вважається сучасним стандартом і чому?',
          answer: '<code>Pressable</code> — сучасний уніфікований API (з RN 0.63+), що замінює всю Touchable-родину: дає гранулярні колбеки (<code>onPressIn</code>/<code>onPressOut</code>/<code>onLongPress</code>), функцію-стиль <code>style={({ pressed }) => ...}</code> для feedback без Animated, і краще узгоджену поведінку між платформами. Touchable*-компоненти лишаються в кодовій базі для сумісності, але для нового коду — завжди <code>Pressable</code>.',
        },
        {
          question: 'Чому кастомна стилізація <Button> обмежена, і що використовують замість нього, коли потрібен нестандартний дизайн?',
          answer: '<code>Button</code> — тонка обгортка над нативним платформовим кнопковим віджетом (щоб виглядати "рідно" з коробки), тому приймає лише <code>color</code>/<code>title</code>, без довільного <code>style</code> для форми/паддінгів/шрифту. Для будь-якого кастомного дизайну — <code>Pressable</code> + власний <code>&lt;View&gt;</code>/<code>&lt;Text&gt;</code> всередині, повний контроль над зовнішнім виглядом.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Контрольований TextInput + Pressable з feedback-стилем',
          code: `import { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';

function LoginForm() {
  const [email, setEmail] = useState('');

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <TextInput
        value={email}
        onChangeText={setEmail}          // не onChange(event) — одразу рядок
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
      />
      <Pressable
        onPress={() => console.log(email)}
        style={({ pressed }) => ({
          opacity: pressed ? 0.6 : 1,      // feedback без Animated
          backgroundColor: '#4f46e5',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
        })}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Увійти</Text>
      </Pressable>
    </View>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Компонент</th><th>Статус</th><th>Коли</th></tr>
      <tr><td><code>Pressable</code></td><td>Сучасний стандарт</td><td>Завжди для нового коду</td></tr>
      <tr><td><code>TouchableOpacity</code></td><td>Legacy, працює</td><td>Старий код, простий opacity-feedback</td></tr>
      <tr><td><code>TouchableHighlight</code></td><td>Legacy</td><td>Рідко — підсвітка фону при натисканні</td></tr>
      <tr><td><code>Button</code></td><td>Обмежена стилізація</td><td>Швидкий нативний-вигляд без кастомного дизайну</td></tr>
      <tr><td><code>Switch</code></td><td>Boolean-toggle</td><td>Той самий API, що <code>&lt;input type="checkbox"&gt;</code> по суті</td></tr>
    </table>
  </div>`,
        },
      ],
    },
    {
      id: 'rn-core-scrollview-lists',
      title: '📜 ScrollView vs FlatList/SectionList',
      interviewQuestions: [
        {
          question: 'Чому не можна просто завжди використовувати ScrollView замість FlatList, якщо обидва "показують список і скролять"?',
          answer: '<code>ScrollView</code> рендерить <strong>усі дочірні елементи одразу</strong> — для 20 елементів це нормально, для 2000 — застосунок споживає пам\'ять і час рендеру на елементи, яких користувач ще не побачив. <code>FlatList</code> — <strong>віртуалізований</strong> список: рендерить лише елементи у видимій області (+ невеликий буфер), перевикористовуючи views при скролі. Правило: відомий, короткий, статичний контент — <code>ScrollView</code>; будь-який список змінної/великої довжини — <code>FlatList</code>.',
        },
        {
          question: 'Навіщо FlatList потрібен окремий проп keyExtractor, якщо в React вже є key на елементах масиву?',
          answer: '<code>FlatList</code> не рендерить JSX-масив напряму — він приймає <code>data</code> (масив значень) і <code>renderItem</code> (функцію), тому немає JSX-елементів з <code>key</code>-пропом, куди React міг би зазирнути. <code>keyExtractor</code> — явний спосіб сказати FlatList, як обчислити стабільний ключ для кожного елемента <code>data</code>, потрібний для того самого reconciliation-механізму, що й <code>key</code> у звичайних списках.',
        },
        {
          question: 'Коли обирати SectionList замість FlatList?',
          answer: 'Коли дані природно згруповані з заголовками секцій (наприклад, контакти за літерою алфавіту, замовлення за датою) — <code>SectionList</code> приймає масив <code>{ title, data }</code> і рендерить sticky section headers "з коробки", зберігаючи ту саму віртуалізацію, що й <code>FlatList</code>.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'FlatList — базовий API',
          code: `import { FlatList, Text, View } from 'react-native';

type User = { id: string; name: string };

function UserList({ users }: { users: User[] }) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text>{item.name}</Text>
        </View>
      )}
      ListEmptyComponent={<Text>Немає користувачів</Text>}
    />
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert"><span class="icon">💡</span><span>API-рівень тут — базовий. Реальна продуктивність FlatList (<code>getItemLayout</code>, <code>windowSize</code>, мемоізація рядків, FlashList) — окрема секція <strong>📊 Продуктивність FlatList</strong> далі в курсі.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-core-image-media',
      title: '🖼️ Image, ActivityIndicator, Modal',
      interviewQuestions: [
        {
          question: 'Веброзробник очікує, що <Image source={{ uri: url }} /> сам підбере розмір під оригінальне зображення, як <img> у браузері. Чому це не так у React Native?',
          answer: 'Браузер знає intrinsic-розмір файлу до layout\'у, бо завантажує й декодує зображення синхронно з парсингом HTML. React Native рахує layout <strong>до</strong> того, як мережеве зображення завантажилось — тому для віддалених <code>{ uri }</code>-джерел <code>width</code>/<code>height</code> потрібно задавати явно в стилях; без них <code>Image</code> займе нульовий розмір. Локальні зображення через <code>require()</code> — виняток, їхній розмір відомий на етапі збірки.',
        },
        {
          question: 'Чим Modal у React Native відрізняється від модалки у вебі, зробленої через position: fixed + z-index?',
          answer: 'У React Native немає CSS <code>z-index</code>/stacking context у тому вигляді, як у вебі — <code>Modal</code> рендериться в окремому нативному UI-шарі поверх усього застосунку (native overlay), а не позиціюванням у тому самому DOM-дереві. Це надійніше (нема конфліктів stacking context), але й означає, що Modal — не звичайний компонент у дереві стилів, а окрема точка входу зі своїми пропами (<code>animationType</code>, <code>transparent</code>, <code>onRequestClose</code>).',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Image з явним розміром + ActivityIndicator для завантаження',
          code: `import { useState } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';

function Avatar({ uri }: { uri: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ width: 64, height: 64 }}>
      {loading && <ActivityIndicator style={{ position: 'absolute' }} />}
      <Image
        source={{ uri }}
        style={{ width: 64, height: 64, borderRadius: 32 }} // розмір ОБОВ'ЯЗКОВИЙ для {uri}
        onLoadEnd={() => setLoading(false)}
        resizeMode="cover"
      />
    </View>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><strong>Gotcha:</strong> локальні зображення через <code>require('./logo.png')</code> розмір знають автоматично; мережеві <code>{ uri: 'https://...' }</code> — ні. Без явних <code>width</code>/<code>height</code> у стилі зображення просто не з\'явиться на екрані.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-core-platform-widgets',
      title: '🤖🍎 Платформо-специфічні компоненти',
      interviewQuestions: [
        {
          question: 'Навіщо React Native взагалі надає компоненти на кшталт ActionSheetIOS чи ToastAndroid, якщо мета кросплатформності — писати один код?',
          answer: 'Кросплатформність React Native означає "один компонентний рушій", а не "ідентичний UX на обох платформах" — деякі UI-патерни (Android Toast, iOS action sheet) настільки вкорінені в платформові гайдлайни, що користувачі очікують саме їх. RN дає прямий доступ до цих нативних API, а не намагається їх ре-імплементувати кросплатформно — вибір компромісу лишається за розробником: платформо-специфічний UX чи уніфікований (напр. власна bottom-sheet-бібліотека для обох платформ).',
        },
        {
          question: 'Як правильно перевірити дозвіл камери на Android перед використанням API, що його потребує?',
          answer: '<code>PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)</code> повертає проміс зі статусом (<code>granted</code>/<code>denied</code>/<code>never_ask_again</code>) — перевірка й запит роблять асинхронно <em>перед</em> викликом самого API, а не "post factum" catch помилки. На iOS еквівалентний механізм — декларація у <code>Info.plist</code> + системний запит при першому виклику (детальніше — секція про дозволи далі в курсі).',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Android-only</th><th>Призначення</th></tr>
      <tr><td><code>BackHandler</code></td><td>Перехоплення апаратної/жестової кнопки "назад"</td></tr>
      <tr><td><code>PermissionsAndroid</code></td><td>Запит runtime-дозволів (Android 6+ permission model)</td></tr>
      <tr><td><code>ToastAndroid</code></td><td>Короткочасне спливаюче повідомлення (нативний Android Toast)</td></tr>
      <tr><td><code>TouchableNativeFeedback</code></td><td>Ripple-ефект при натисканні (Material Design)</td></tr>
      <tr><td><code>DrawerLayoutAndroid</code></td><td>Висувна бічна панель (нативний Android drawer)</td></tr>
    </table>
  </div>
  <div class="table-wrap">
    <table>
      <tr><th>iOS-only</th><th>Призначення</th></tr>
      <tr><td><code>ActionSheetIOS</code></td><td>Нативний action sheet / share sheet знизу екрана</td></tr>
      <tr><td><code>SafeAreaView</code></td><td>Відступи під notch/home-indicator (уникнути перекриття системним UI)</td></tr>
      <tr><td><code>InputAccessoryView</code></td><td>Панель над клавіатурою (напр. кнопка "Готово")</td></tr>
    </table>
  </div>`,
        },
      ],
    },

    /* ============================= PHASE C — STYLING & LAYOUT ============================= */
    {
      id: 'rn-styling-model',
      title: '🎨 StyleSheet — чому це не CSS',
      interviewQuestions: [
        {
          question: 'Навіщо потрібен StyleSheet.create, якщо в об\'єкт стилю можна передати звичайний JS-об\'єкт напряму: style={{ padding: 16 }}?',
          answer: '<code>StyleSheet.create</code> реєструє стилі й повертає <strong>числові id</strong> (у Старій архітектурі це дозволяло серіалізувати стиль через bridge як число, а не JSON-об\'єкт при кожному рендері; у Fabric/JSI виграш менший, але патерн лишився ідіоматичним). Практична причина лишається: валідація форми стилю на етапі створення, і звична роль "це стиль, а не inline-об\'єкт" для лінтерів/автокомпліту. Inline <code>style={{ }}</code> так само валідний і часто потрібен для динамічних значень — обидва підходи комбінують масивом <code>style={[styles.base, dynamic]}</code>.',
        },
        {
          question: 'Чи успадковують стилі дочірні View-компоненти від батьківського View, як у CSS-каскаді?',
          answer: 'Ні — <strong>каскаду немає</strong>. Кожен <code>View</code> стилізується незалежно; єдиний виняток — <code>Text</code> усередині <code>Text</code>: шрифтові властивості (<code>fontSize</code>, <code>color</code>, <code>fontWeight</code>) успадковуються від батьківського <code>Text</code>, але не від <code>View</code>. Це усвідомлене архітектурне рішення — прибирає непередбачуваність каскаду, ціною повторення спільних стилів (звідки й патерн спільних <code>StyleSheet</code>-об\'єктів/дизайн-токенів).',
        },
        {
          question: 'У чому різниця в одиницях вимірювання між CSS (px/rem/%) і React Native стилями?',
          answer: 'У RN числове значення без одиниці — це <strong>density-independent pixels (dp)</strong>, автоматично масштабовані під щільність екрана пристрою (аналог CSS <code>px</code> у "логічних" пікселях, не фізичних). Немає <code>rem</code>/<code>em</code> (нема кореневого шрифту, від якого рахувати), немає CSS-змінних (заміна — JS-константи/дизайн-токени), медіа-запитів немає взагалі — за адаптивність відповідають <code>Dimensions</code>/<code>useWindowDimensions</code> у JS.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<h3 class="topic">StyleSheet — підмножина CSS, не CSS <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>CSS-можливість</th><th>React Native</th></tr>
      <tr><td>Каскад/успадкування</td><td>Немає (крім шрифтових властивостей у вкладених <code>Text</code>)</td></tr>
      <tr><td>Селектори (<code>.class:hover</code>)</td><td>Немає — стиль лише через <code>style</code>-проп, стан через JS (<code>pressed</code> у <code>Pressable</code>)</td></tr>
      <tr><td>Медіа-запити</td><td>Немає — <code>useWindowDimensions()</code> у JS</td></tr>
      <tr><td>Одиниці (px, rem, %)</td><td>Числа = dp; <code>%</code> підтримується для деяких властивостей</td></tr>
      <tr><td>Композиція стилів</td><td>Масив: <code>style={[base, condition && override]}</code></td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'StyleSheet.create + композиція стилів масивом',
          code: `import { StyleSheet, View, Text } from 'react-native';

function Card({ active }: { active: boolean }) {
  return (
    <View style={[styles.card, active && styles.cardActive]}>
      <Text style={styles.title}>Заголовок</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#f3f4f6' },
  cardActive: { backgroundColor: '#e0e7ff', borderColor: '#4f46e5', borderWidth: 1 },
  title: { fontSize: 16, fontWeight: '600' },
});`,
        },
      ],
    },
    {
      id: 'rn-flexbox-layout',
      title: '📐 Flexbox — інша модель за замовчуванням',
      interviewQuestions: [
        {
          question: 'Найпоширеніша пастка веброзробника, що вперше верстає в React Native: він пише flexDirection: "row" там, де очікував поведінку "за замовчуванням", і layout ламається. Чому?',
          answer: 'У CSS Flexbox <code>flex-direction</code> за замовчуванням — <code>row</code>. У React Native — <strong>протилежне значення за замовчуванням: <code>column</code></strong>. Тобто те, що в CSS вимагало б явного <code>flex-direction: column</code>, у RN — поведінка "з коробки"; і навпаки, горизонтальний ряд елементів завжди потребує явного <code>flexDirection: \'row\'</code>.',
        },
        {
          question: 'Чому в React Native немає display: block/inline, і як це впливає на верстку порівняно з вебом?',
          answer: 'Кожен <code>View</code> — flex-контейнер за замовчуванням (<code>display: flex</code> неявно), без "нормального потоку документа" з блоковими/inline-елементами. Немає ситуації "текст обтікає картинку" чи "елементи стоять в рядок, бо inline" — будь-яке горизонтальне розташування задається явним <code>flexDirection: \'row\'</code> на контейнері.',
        },
        {
          question: 'Як у React Native правильно реагувати на розмір екрана/орієнтацію без медіа-запитів?',
          answer: '<code>useWindowDimensions()</code> — хук, що повертає поточні <code>width</code>/<code>height</code> вікна і <strong>реактивно оновлюється</strong> при повороті екрана чи зміні розміру (напр. split-screen на планшетах), на відміну від статичного одноразового виклику <code>Dimensions.get(\'window\')</code>. Логіку "інший layout на планшеті/при landscape" пишуть у JS через порівняння цих значень, а не CSS media queries.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'flexDirection: column за замовчуванням vs явний row',
          code: `import { View, Text, useWindowDimensions } from 'react-native';

function ProfileHeader() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    // column — стандартна поведінка View, row тут треба вказати явно
    <View style={{ flexDirection: isTablet ? 'row' : 'column', gap: 12 }}>
      <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#ddd' }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Ada Lovelace</Text>
        <Text style={{ color: '#666' }}>@ada</Text>
      </View>
    </View>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span><strong>Gotcha списком:</strong> (1) <code>flexDirection: 'column'</code> — за замовчуванням, на відміну від CSS; (2) <code>flex: 1</code> в RN не має "auto"-базового розміру як у CSS <code>flex-grow</code> — поводиться радше як <code>flex: 1 1 0</code>; (3) відступи під notch/home-indicator — окремо через <code>SafeAreaView</code>/<code>useSafeAreaInsets</code>, Flexbox цього не знає.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-animation',
      title: '🎞️ Animated API vs Reanimated',
      interviewQuestions: [
        {
          question: 'Що робить проп useNativeDriver: true в Animated.timing, і чому це критично для плавності анімації?',
          answer: 'За замовчуванням <code>Animated</code> рахує кожен кадр анімації на <strong>JS-потоці</strong> й пересилає нативному UI щокадру — якщо JS-потік у цей момент зайнятий (мережевий колбек, важкий рендер), кадри "дропаються" й анімація смикається. <code>useNativeDriver: true</code> одноразово серіалізує всю анімацію (start/end значення, тайминг, easing) і передає її нативному UI-потоку, який далі виконує її самостійно — без залежності від завантаження JS-потоку. Обмеження: працює лише для непереверстальних властивостей (<code>transform</code>, <code>opacity</code>), не для layout-властивостей типу <code>width</code>/<code>height</code>.',
        },
        {
          question: 'Навіщо взагалі з\'явився Reanimated, якщо Animated + useNativeDriver вже виносить анімацію на UI-потік?',
          answer: '<code>useNativeDriver</code> вирішує лише "де виконується вже готова анімація" — саму <strong>логіку</strong> (коли й з якими параметрами її запустити) все одно рахує JS-потік, що недостатньо для gesture-driven анімацій (свайпи, drag), де кожен кадр залежить від живого дотику пальця. <strong>Reanimated</strong> вводить <em>worklets</em> — невеликі JS-функції, що компілюються й виконуються <strong>напряму на UI-потоці</strong> через JSI, без жодного round-trip до JS-потоку на кожен кадр — тому дає плавність навіть при повністю зайнятому JS-потоці.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Animated.timing з useNativeDriver — fade-in',
          code: `import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

function FadeInBox() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true, // тайминг рахує UI-потік, не JS
    }).start();
  }, [opacity]);

  return <Animated.View style={{ opacity, width: 100, height: 100, backgroundColor: '#4f46e5' }} />;
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th></th><th>Animated (з useNativeDriver)</th><th>Reanimated</th></tr>
      <tr><td>Де живе логіка</td><td>JS-потік (лише виконання — на UI)</td><td>UI-потік напряму (worklets через JSI)</td></tr>
      <tr><td>Найкраще для</td><td>Прості переходи: fade, scale, slide</td><td>Жестові взаємодії: drag, swipe-to-dismiss, паралакс на скролі</td></tr>
      <tr><td>Залежність</td><td>Вбудований у react-native</td><td>Окремий пакет <code>react-native-reanimated</code> (часто разом з Gesture Handler)</td></tr>
    </table>
  </div>`,
        },
      ],
    },

    /* ============================= PHASE D — NAVIGATION ============================= */
    {
      id: 'rn-navigation-react-navigation',
      title: '🧭 React Navigation — Stack/Tabs/Drawer',
      interviewQuestions: [
        {
          question: 'У React web навігація — це синхронізація URL з UI через History API. Як влаштована навігація в React Native, якщо немає URL-рядка?',
          answer: 'Немає адресного рядка й History API — навігація в React Navigation це <strong>стек екранів у пам\'яті</strong>: <code>navigation.navigate(\'Profile\')</code> додає екран на верх стека, <code>navigation.goBack()</code> знімає його. Кожен навігатор (<code>createNativeStackNavigator</code>, <code>createBottomTabNavigator</code>, <code>createDrawerNavigator</code>) — окрема структура даних, що керує своїм набором екранів; вони компонуються один в одного (таб всередині стека, стек всередині drawer) для складної навігації.',
        },
        {
          question: 'Як типізувати параметри маршруту в React Navigation з TypeScript, і навіщо це потрібно?',
          answer: 'Визначається тип-мапа <code>type RootStackParamList = { Home: undefined; Profile: { userId: string } }</code>, яка передається дженериком у навігатор і в проп-типи екрана (<code>NativeStackScreenProps&lt;RootStackParamList, \'Profile\'&gt;</code>). Без цього <code>navigation.navigate(\'Profile\', { userId })</code> і <code>route.params.userId</code> — <code>any</code>, і одруківка в назві екрана чи пропущений обов\'язковий параметр ловиться лише в рантаймі на пристрої, а не компілятором.',
        },
        {
          question: 'Чим "route param" у React Navigation концептуально відрізняється від URL-параметра в react-router?',
          answer: 'Функціонально схожі (обидва передають дані конкретному екрану/сторінці), але route param в React Navigation живе <strong>лише в пам\'яті стека навігації</strong> — його не можна скопіювати як посилання, поділитись чи забукмаркати; це не частина адресованого ресурсу, як URL. Для "адресованої" навігації (deep links, поділитись посиланням на екран) React Navigation окремо конфігурує <code>linking</code>-схему, що мапить URL-схеми на маршрути стека.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Типізований Stack Navigator',
          code: `import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return <Button title="Профіль" onPress={() => navigation.navigate('Profile', { userId: '42' })} />;
}

function ProfileScreen({ route }: NativeStackScreenProps<RootStackParamList, 'Profile'>) {
  return <Text>User: {route.params.userId}</Text>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>react-router (web)</th><th>React Navigation (RN)</th></tr>
      <tr><td>URL-рядок</td><td>Стек екранів у пам'яті</td></tr>
      <tr><td><code>&lt;Link to="/profile/42"&gt;</code></td><td><code>navigation.navigate('Profile', { userId: '42' })</code></td></tr>
      <tr><td>URL-параметр (<code>useParams</code>)</td><td>Route param (<code>route.params</code>)</td></tr>
      <tr><td>Кнопка "назад" браузера</td><td><code>navigation.goBack()</code> / апаратна кнопка (Android)</td></tr>
      <tr><td>Nested routes</td><td>Nested navigators (Stack у Tab у Drawer)</td></tr>
    </table>
  </div>`,
        },
      ],
    },
    {
      id: 'rn-navigation-expo-router',
      title: '🗂️ Expo Router — файлова навігація',
      interviewQuestions: [
        {
          question: 'Розробник вже знає App Router у Next.js. Що з цієї ментальної моделі переноситься на Expo Router майже без змін?',
          answer: 'Сама ідея "структура папок = структура маршрутів" і роль <code>_layout.tsx</code> як спільного layout\'у для вкладених маршрутів — <strong>той самий принцип</strong>, що <code>layout.tsx</code> у Next.js App Router. <code>app/(tabs)/index.tsx</code> у Expo Router й <code>app/(marketing)/page.tsx</code> у Next.js — обидва використовують дужкові папки-групи для організації маршрутів без впливу на URL/шлях.',
        },
        {
          question: 'Якщо Expo Router дає файлову навігацію "з коробки", навіщо взагалі знати React Navigation окремо?',
          answer: 'Expo Router <strong>побудований поверх React Navigation</strong> — це шар файлової конвенції над тими самими стек/таб/drawer-навігаторами, а не заміна. Типізовані route params, деталі поведінки стека, кастомні transition — усе це в кінцевому підсумку керується примітивами React Navigation; Expo Router лише генерує конфігурацію навігаторів з структури файлів.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'text',
          caption: 'Файлова структура -> маршрути (Expo Router)',
          code: `app/
├── _layout.tsx           # кореневий layout (аналог root layout.tsx у Next.js)
├── (tabs)/
│   ├── _layout.tsx        # таб-бар, спільний для index.tsx і profile.tsx
│   ├── index.tsx          # маршрут "/"
│   └── profile.tsx        # маршрут "/profile"
└── post/
    └── [id].tsx            # динамічний маршрут "/post/42"`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Динамічний маршрут — той самий useLocalSearchParams замість useParams',
          code: `// app/post/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>Пост #{id}</Text>;
}`,
        },
      ],
    },

    /* ============================= PHASE E — DATA, NETWORKING & STATE ============================= */
    {
      id: 'rn-networking-fetch-auth',
      title: '🌐 Fetch на мобільному — без CORS, без cookies',
      interviewQuestions: [
        {
          question: 'Веб-застосунок покладається на httpOnly-cookie для авторизації. Що з цього підходу переноситься на React Native, а що доведеться переробити?',
          answer: 'Нічого не переноситься напряму — <strong>httpOnly cookie не існує</strong> в мобільному рантаймі так, як у браузері: немає автоматичного cookie jar, прикріпленого до кожного fetch-запиту на той самий домен. Токен потрібно явно зберігати (<code>SecureStore</code>/Keychain, не звичайний AsyncStorage — токени чутливі) і явно додавати в кожен запит як <code>Authorization: Bearer &lt;token&gt;</code> заголовок. Це означає ручний рефреш-токен flow там, де браузер робив би це "непомітно" через cookie.',
        },
        {
          question: 'Чому CORS-помилки, звичні у веброзробці, не виникають у React Native?',
          answer: 'CORS — політика браузера (same-origin policy), що обмежує JS-код на одній сторінці робити запити на інший origin без явного дозволу сервера. React Native не рендерить сторінки в браузерному рушії — мережеві запити йдуть через нативний HTTP-клієнт ОС, який не має поняття "origin сторінки" й не застосовує CORS. Практичний наслідок: бекенд, що віддає CORS-помилку веб-клієнту, буде без проблем доступний з мобільного застосунку — CORS ніколи не був захистом самого сервера, лише браузерним обмеженням клієнта.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th></th><th>React web</th><th>React Native</th></tr>
      <tr><td>Fetch API</td><td><code>fetch()</code>/axios</td><td>Той самий <code>fetch()</code>/axios — без змін</td></tr>
      <tr><td>CORS</td><td>Блокує cross-origin запити без дозволу сервера</td><td>Не застосовується — немає browser origin</td></tr>
      <tr><td>Авторизація</td><td>httpOnly cookie (браузер керує автоматично)</td><td>Токен у заголовку <code>Authorization</code>, збережений вручну</td></tr>
      <tr><td>Безпечне сховище токена</td><td>httpOnly cookie (недоступний для JS)</td><td><code>expo-secure-store</code> / iOS Keychain / Android Keystore</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Токен у заголовку замість cookie',
          code: `import * as SecureStore from 'expo-secure-store';

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await SecureStore.getItemAsync('authToken');
  return fetch(\`https://api.example.com\${path}\`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? \`Bearer \${token}\` : '',
    },
  });
}`,
        },
      ],
    },
    {
      id: 'rn-state-management-carryover',
      title: '🗃️ Redux/Zustand/TanStack Query — переносяться як є',
      interviewQuestions: [
        {
          question: 'Команда переносить веб-застосунок на Redux Toolkit на React Native. Що з логіки стору доведеться переписати?',
          answer: 'Практично нічого — <code>createSlice</code>, reducers, selectors, RTK Query — увесь цей код <strong>не має DOM-залежностей</strong> і працює в React Native незмінно; <code>&lt;Provider store={store}&gt;</code> обгортає застосунок так само. Єдине, що дійсно RN-специфічне — <strong>шар персистентності</strong>: <code>redux-persist</code> за замовчуванням використовує <code>localStorage</code>, якого в RN немає, тому потрібен адаптер (<code>redux-persist/lib/storage</code> з AsyncStorage замість web-storage).',
        },
        {
          question: 'localStorage не існує в React Native. Чим його замінюють, і чи є різниця між варіантами для звичайних даних і для секретів (токенів)?',
          answer: '<code>AsyncStorage</code> (<code>@react-native-async-storage/async-storage</code>) — асинхронний key-value store, найближчий аналог <code>localStorage</code> за API, підходить для несекретних даних (кеш, налаштування UI). Для чутливих даних (токени, паролі) — <code>expo-secure-store</code>, що використовує апаратно захищене сховище ОС (Keychain на iOS, Keystore на Android), а не звичайний файл на диску, як AsyncStorage. <code>react-native-mmkv</code> — ще одна опція, значно швидша за AsyncStorage (синхронний доступ через JSI), популярна для великих обсягів кешу.',
        },
        {
          question: 'Як TanStack Query персистить кеш між перезапусками застосунку на мобільному, якщо localStorage недоступний?',
          answer: '<code>persistQueryClient</code> з <code>@tanstack/query-async-storage-persister</code> серіалізує кеш query client в AsyncStorage (замість браузерного <code>localStorage</code>-персистера), відновлюючи його при наступному запуску застосунку — сам API (<code>useQuery</code>, <code>useMutation</code>, інвалідація, stale-time) лишається ідентичним до web-версії.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Zustand + AsyncStorage-персистентність',
          code: `import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartStore {
  items: string[];
  addItem: (id: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (id) => set((s) => ({ items: [...s.items, id] })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage), // єдина RN-специфічна деталь
    },
  ),
);`,
        },
      ],
    },
    {
      id: 'rn-forms',
      title: '📝 Форми на мобільному',
      interviewQuestions: [
        {
          question: 'У вебі форма може відправлятись через нативний <form onSubmit> з FormData. Як це влаштовано в React Native, де немає <form>?',
          answer: 'Немає HTML-елемента <code>&lt;form&gt;</code> і немає <code>FormData</code> як механізму зібрати значення форми "з коробки" — RN-форма це просто набір контрольованих <code>TextInput</code>, значення яких вручну збираються у стан компонента (або через <code>react-hook-form</code>, що не залежить від DOM-специфічного <code>FormData</code> й тому переноситься без змін). Відправка — звичайний <code>fetch</code> з <code>JSON.stringify</code> зібраного об\'єкта, ініційований натисканням <code>Pressable</code>, а не подією <code>submit</code>.',
        },
        {
          question: 'Клавіатура на мобільному перекриває нижній TextInput форми. Яким компонентом це вирішують, і чому це взагалі не проблема у вебі?',
          answer: 'У вебі браузер сам скролить viewport, щоб фокусний інпут лишався видимим над віртуальною клавіатурою. У RN такої автоматики немає — <code>KeyboardAvoidingView</code> (з <code>behavior="padding"</code> на iOS чи <code>"height"</code> на Android) відсуває контент вгору, звільняючи місце під клавіатуру; для довших форм комбінують зі <code>ScrollView</code>, щоб можна було проскролити до захованих полів.',
        },
        {
          question: 'Чи можна досвід TextInput покращити так само, як HTML input type="email"/"tel" підказує браузеру відповідну клавіатуру?',
          answer: 'Так — <code>keyboardType</code> (<code>"email-address"</code>, <code>"numeric"</code>, <code>"phone-pad"</code>) перемикає розкладку клавіатури так само, як HTML <code>type</code>; <code>returnKeyType="next"</code> + <code>onSubmitEditing</code> дозволяють перейти фокусом на наступне поле натисканням клавіші "Далі" на клавіатурі — ручна імітація того, що в HTML-формі дає природний tab-порядок.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'react-hook-form + zod — той самий API, інші теги під капотом',
          code: `import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { View, TextInput, KeyboardAvoidingView, Platform, Pressable, Text } from 'react-native';

const schema = z.object({
  email: z.string().email(),
});

function LoginForm() {
  const { control, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              returnKeyType="done"
            />
            {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
          </View>
        )}
      />
      <Pressable onPress={handleSubmit((data) => console.log(data))}>
        <Text>Увійти</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}`,
        },
      ],
    },

    /* ============================= PHASE F — PLATFORM-SPECIFIC & NATIVE ============================= */
    {
      id: 'rn-platform-specific-code',
      title: '🎛️ Platform.OS, Platform.select, .ios/.android файли',
      interviewQuestions: [
        {
          question: 'Є два способи розгалужувати код по платформах у React Native — Platform.select всередині файлу і окремі .ios.tsx/.android.tsx файли. Коли який обрати?',
          answer: '<code>Platform.select({ ios: ..., android: ... })</code> — для локальних, невеликих відмінностей (одна стильова властивість, один рядок логіки) всередині спільного компонента. Окремі файли <code>Button.ios.tsx</code>/<code>Button.android.tsx</code> — коли реалізації настільки різні, що спільний код втрачає сенс (різна структура компонента, різні залежності); Metro автоматично резолвить потрібний файл під час збірки конкретної платформи, імпорт лишається однаковий: <code>import Button from \'./Button\'</code>.',
        },
        {
          question: 'Чим Platform.OS === "ios" відрізняється в поведінці від медіа-запиту в CSS з точки зору коли він обчислюється?',
          answer: '<code>Platform.OS</code> — статичне значення, відоме на етапі збірки/старту застосунку (пристрій не змінює операційну систему в рантаймі), тому це radically простіше за CSS media queries, які реагують на динамічні зміни viewport. Практичний наслідок: <code>Platform.select</code>-логіку можна безпечно винести за межі компонента (не в рендер-функцію) без втрати реактивності — вона однаково не зміниться за життя застосунку.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Platform.select — локальна відмінність всередині одного файлу',
          code: `import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
    android: { elevation: 4 }, // Android не має shadow-властивостей, лише elevation
  }),
});`,
        },
        {
          kind: 'code',
          language: 'text',
          caption: 'Платформо-специфічні файли — Metro резолвить автоматично',
          code: `components/
├── Button.tsx          # спільний fallback (web/інші платформи)
├── Button.ios.tsx       # використається лише на iOS-збірці
└── Button.android.tsx   # використається лише на Android-збірці

// В обох випадках імпорт однаковий:
import Button from './Button';`,
        },
      ],
    },
    {
      id: 'rn-device-apis-permissions',
      title: '🔐 Дозволи та нативні API пристрою',
      interviewQuestions: [
        {
          question: 'Опиши типовий асинхронний flow запиту дозволу камери в Expo-застосунку — чому не можна просто викликати API камери й обробити помилку, якщо дозволу немає?',
          answer: 'Правильний патерн — <strong>запит дозволу перед</strong> використанням API, не post-factum catch: <code>const { status } = await Camera.requestCameraPermissionsAsync()</code>, перевірка <code>status === \'granted\'</code>, і лише тоді рендер UI камери; якщо відмовлено — показати пояснювальний UI з можливістю повторного запиту чи посиланням у системні налаштування. Виклик камери без цього flow або впаде з нативною помилкою, або (гірше) мовчки нічого не покаже — платформи очікують явний permission-handshake до доступу до чутливих API.',
        },
        {
          question: 'Як в React Native відкрити зовнішній застосунок чи посилання (наприклад, номер телефону чи іншу програму) з JS-коду?',
          answer: '<code>Linking.openURL(\'tel:+380...\')</code> чи <code>Linking.openURL(\'https://...\')</code> — той самий API, що обробляє й звичайні http(s)-посилання (відкриває системний браузер), і кастомні URL-схеми інших застосунків. <code>Linking.canOpenURL()</code> дозволяє заздалегідь перевірити, чи є застосунок, здатний обробити схему, перш ніж намагатись її відкрити.',
        },
        {
          question: 'Push-сповіщення — це просто "API виклик, і сповіщення приходить"? Що насправді потрібно налаштувати?',
          answer: 'Ні — потрібен повний ланцюжок: (1) запит дозволу на сповіщення (<code>Notifications.requestPermissionsAsync</code>), (2) отримання унікального push-токена пристрою (<code>getExpoPushTokenAsync</code>), (3) відправка цього токена на бекенд для зберігання, (4) бекенд відправляє сповіщення через сервіс (Expo Push Service / FCM / APNs), використовуючи збережений токен. JS-код на клієнті відповідає лише за перші два кроки й обробку вхідних сповіщень (foreground/background handlers).',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Типовий permission-request хук (Expo Camera)',
          code: `import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

function useCameraPermission() {
  const [granted, setGranted] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setGranted(status === 'granted');
    })();
  }, []);

  return granted; // null = ще запитується, true/false = результат
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert"><span class="icon">💡</span><span>Огляд навмисно поверхневий — камера/локація/сповіщення/Linking мають десятки нюансів кожен. Мета секції — знати <em>форму</em> flow (запит → перевірка статусу → гілка UI), а не запам'ятати кожен API напам'ять.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-native-modules-turbomodules',
      title: '🔧 Коли писати нативний модуль',
      interviewQuestions: [
        {
          question: 'Команда потребує SDK, якого немає ні в Expo, ні у вигляді community-пакета. Які є варіанти, у порядку зростання складності?',
          answer: '(1) <strong>Expo config plugin</strong> — якщо потрібно лише модифікувати нативний проєкт (додати permission, налаштування) без нового JS-API; (2) <strong>community-пакет</strong> — часто вже хтось обгорнув потрібний нативний SDK, варто перевірити перед написанням свого; (3) <strong>власний нативний модуль/TurboModule</strong> — коли нічого з готового не підходить, пишеться нативний код (Swift/Kotlin) з JS-інтерфейсом і підключається через Expo prebuild або bare CLI.',
        },
        {
          question: 'Чому ця секція не пояснює наново, як влаштовані Fabric/TurboModules/JSI зсередини?',
          answer: 'Тому що це — той самий матеріал, що вже розкритий у короткому вступі курсу React (секція "📱 React Native та поза-браузерні рендерери"): New Architecture, перехід від bridge до прямих JSI-викликів. Ця секція — практичний, споживацький погляд: <em>коли</em> в принципі потрібен нативний модуль, а не як він влаштований зсередини.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="alert"><span class="icon">📎</span><span>Внутрішній механізм (Fabric-рендерер, TurboModules, JSI замість bridge) — розкритий у курсі React, секція <strong>📱 React Native та поза-браузерні рендерери</strong>. Ця секція навмисно не повторює той матеріал.</span></div>
  <h3 class="topic">Нативний модуль — це єдина область без React-аналога <span class="tag tag-key">KEY</span></h3>
  <p>Усе інше в цьому курсі (навігація, форми, стан, стилі) — так чи інакше має концептуальний відповідник у React web. Нативний модуль — виняток: код на Swift/Kotlin, що виставляє JS-інтерфейс через TurboModule-специфікацію, не має жодної паралелі в браузерному React, бо у веброзробки просто немає рівня "нативної платформи" під браузером.</p>`,
        },
      ],
    },

    /* ============================= PHASE G — PERFORMANCE & DEBUGGING ============================= */
    {
      id: 'rn-performance-hermes-threads',
      title: '⚙️ Hermes, JS-потік vs UI-потік',
      interviewQuestions: [
        {
          question: 'Що таке Hermes, і чому він став JS-рушієм за замовчуванням у React Native замість JavaScriptCore?',
          answer: 'Hermes — JS-рушій, розроблений Meta спеціально під мобільні обмеження: <strong>прекомпілює JS у байткод на етапі збірки</strong> (замість парсингу й компіляції JS-тексту при кожному старті застосунку, як робить JSC), що дає помітно швидший час старту застосунку й менший розмір бінарника. Ціна — деякі рантайм JS-фічі можуть відставати від найсвіжіших специфікацій, але для типового RN-коду це непомітно.',
        },
        {
          question: 'Поясни модель "JS-потік vs UI-потік" у React Native — чому заблокований JS-потік ламає саме жести й анімації, а не весь застосунок одразу?',
          answer: 'RN виконує JS-логіку (обробники подій, стан, рендер-функції) на <strong>окремому JS-потоці</strong>, тоді як фактичний native UI (малювання, композиція шарів) — на <strong>UI-потоці</strong> ОС. Якщо JS-потік зайнятий важким обчисленням, UI-потік продовжує малювати вже застосовані зміни — застосунок не "заморожується" повністю, але <em>нові</em> взаємодії (натискання, жести, анімації, керовані з JS) не обробляються, доки JS-потік не звільниться. Це і є мотивація <code>useNativeDriver</code>/Reanimated — перенести анімаційну логіку туди, де вона не залежить від завантаженості JS-потоку.',
        },
        {
          question: 'Чи означає New Architecture (Fabric) відмову від моделі "JS-потік окремо, UI-потік окремо"?',
          answer: 'Ні, розділення потоків лишається — New Architecture змінює <em>як</em> вони спілкуються: замість асинхронного bridge з JSON-серіалізацією (стара архітектура) — прямі синхронні виклики через JSI. Це зменшує затримку й накладні витрати комунікації між потоками, але фундаментальна модель "JS окремо від UI" не зникає — саме тому продуктивність списків/анімацій все одно вимагає уваги до того, який код на якому потоці виконується.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Потік</th><th>Відповідає за</th><th>Що його блокує</th></tr>
      <tr><td>JS-потік</td><td>Обробники подій, стан, рендер-функції, бізнес-логіка</td><td>Важкі синхронні обчислення, великі парсинги JSON, необмежені цикли</td></tr>
      <tr><td>UI-потік (native)</td><td>Малювання, композиція шарів, обробка низькорівневих жестів</td><td>Дуже рідко — лише важкий кастомний нативний код</td></tr>
    </table>
  </div>
  <div class="alert good"><span class="icon">✅</span><span><strong>Hermes за замовчуванням</strong> у сучасних Expo/RN-проєктах — вмикати вручну зазвичай не потрібно.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-performance-lists',
      title: '📊 Продуктивність FlatList — virtualization на практиці',
      interviewQuestions: [
        {
          question: 'FlatList зі списком у 500 елементів тормозить при скролі. Rядок містить renderItem={({ item }) => <Row item={item} onPress={() => handlePress(item.id)} />}. Що тут не так, і як виправити?',
          answer: 'Inline arrow-функція в <code>renderItem</code> створює <strong>новий</strong> компонент/пропси на кожен рендер батька — навіть якщо сам <code>Row</code> обгорнутий у <code>React.memo</code>, memo не рятує, бо <code>onPress</code>-пропс завжди новий за референсом. Виправлення: винести <code>Row</code> в окремий мемоізований компонент, передавати <code>id</code> замість inline-колбека (або обгорнути колбек у <code>useCallback</code> зі стабільними залежностями), і задати стабільний <code>keyExtractor</code>.',
        },
        {
          question: 'Що робить getItemLayout, і чому його додавання може суттєво пришвидшити скрол до довільної позиції?',
          answer: 'За замовчуванням FlatList <strong>вимірює</strong> розмір кожного елемента асинхронно під час рендеру, щоб знати, куди скролити. Якщо всі елементи мають <strong>однакову, наперед відому висоту</strong>, <code>getItemLayout={(data, index) => ({ length, offset: length * index, index })}</code> дозволяє FlatList обчислити позицію будь-якого елемента миттєво, без вимірювання — критично для <code>scrollToIndex</code> і взагалі пришвидшує первинний рендер великих списків.',
        },
        {
          question: 'Проп windowSize контролює, скільки "екранів" контенту FlatList тримає відрендереним поза видимою областю. Які практичні наслідки зменшення чи збільшення цього значення?',
          answer: 'Менший <code>windowSize</code> — менше пам\'яті й швидший початковий рендер, але швидкий скрол ризикує "проскочити" ще невідрендерені елементи (короткий blank-спалах). Більший <code>windowSize</code> — плавніший швидкий скрол ціною більшого споживання пам\'яті/CPU на підтримку буфера. Разом з <code>initialNumToRender</code> (скільки елементів рендерити одразу при монтуванні) і <code>maxToRenderPerBatch</code> (скільки додавати за один "кадр" скролу) — це основний набір ручок тюнінгу продуктивності списку.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'До/після: мемоізація рядка + стабільний колбек',
          code: `// ❌ ДО — новий компонент/пропси на кожен рендер батька
<FlatList
  data={items}
  renderItem={({ item }) => (
    <Row item={item} onPress={() => handlePress(item.id)} />
  )}
/>

// ✅ ПІСЛЯ — мемоізований Row + стабільний колбек
const Row = memo(function Row({ item, onPress }: RowProps) {
  return <Pressable onPress={() => onPress(item.id)}>{/* ... */}</Pressable>;
});

function List({ items }: { items: Item[] }) {
  const handlePress = useCallback((id: string) => {
    /* ... */
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Row item={item} onPress={handlePress} />}
      getItemLayout={(_, index) => ({ length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index })}
    />
  );
}`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert"><span class="icon">💡</span><span><strong>FlashList</strong> (Shopify) — drop-in заміна FlatList з переробленим алгоритмом віртуалізації, що не потребує ручного тюнінгу <code>windowSize</code>/<code>getItemLayout</code> для більшості випадків. Вартий розгляду для списків з тисячами елементів, де ручний тюнінг FlatList вже вичерпав себе.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-debugging-devtools',
      title: '🔍 React Native DevTools, Fast Refresh, крашрепортинг',
      interviewQuestions: [
        {
          question: 'Що таке React Native DevTools, і як вони співвідносяться з React DevTools для веба?',
          answer: 'React Native DevTools — офіційний вбудований дебагер (сучасна заміна ролі, яку раніше частково закривав сторонній Flipper): дає інспектор React-дерева компонентів/пропсів/хуків, той самий досвід, що й браузерне розширення React DevTools, плюс мережеву вкладку та breakpoint-дебаг JS-коду — усе під’єднане до Metro dev-сервера, працює й на симуляторі, і на фізичному пристрої в тій самій мережі.',
        },
        {
          question: 'Чим крашрепортинг у мобільному застосунку (наприклад, Sentry) концептуально відрізняється від відстеження помилок у вебі?',
          answer: 'У вебі помилка зазвичай означає зламану сторінку, яку користувач може оновити. На мобільному нативний краш може <strong>вбити весь застосунок</strong> без можливості "просто перезавантажити сторінку", і трапляється це вже поза межами JS (нативний код, пам\'ять) — тому мобільний крашрепортинг збирає й нативні crash-логи (symbolication нативного стек-трейсу), а не лише JS-помилки, спіймані React Error Boundary.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th>Інструмент</th><th>Роль</th></tr>
      <tr><td>React Native DevTools</td><td>Інспектор компонентів/пропсів/хуків, мережа, breakpoints — вбудований дебагер</td></tr>
      <tr><td>Fast Refresh</td><td>HMR-еквівалент: зберігає стан компонента при редагуванні файлу</td></tr>
      <tr><td>Sentry (чи аналог)</td><td>Крашрепортинг: JS-помилки + нативні краші з символізованим стек-трейсом</td></tr>
    </table>
  </div>`,
        },
      ],
    },

    /* ============================= PHASE H — TESTING ============================= */
    {
      id: 'rn-testing-unit',
      title: '🧪 Jest + React Native Testing Library',
      interviewQuestions: [
        {
          question: 'Розробник, що знає React Testing Library для веба, пише перший тест на React Native Testing Library. Що зі знайомого API переноситься без змін?',
          answer: 'Query-API — <strong>той самий підхід "guided by accessibility"</strong>: <code>getByText</code>, <code>getByRole</code>, <code>fireEvent</code>, <code>waitFor</code> — фактично ідентичний mental model і в багатьох випадках однакові назви функцій. Різниця в тому, <em>що</em> ти запитуєш: замість DOM-вузлів RNTL працює з деревом нативних компонентів (<code>View</code>/<code>Text</code>/<code>TextInput</code>), тому селектор на кшталт <code>getByRole(\'button\')</code> мапиться на <code>Pressable</code>/<code>accessibilityRole="button"</code>, а не на HTML <code>&lt;button&gt;</code>.',
        },
        {
          question: 'Тест на компонент, що використовує AsyncStorage, падає з "AsyncStorage is null" у тестовому середовищі Jest. Чому, і як це виправити?',
          answer: 'Jest виконується в Node.js, без реального мобільного рантайму — нативні модулі (AsyncStorage, камера, будь-який TurboModule) фізично не існують у тестовому середовищі, бо вони реалізовані нативним кодом, якого нема на CI/dev-машині. Виправлення — явний мок: <code>jest.mock(\'@react-native-async-storage/async-storage\', () =&gt; require(\'@react-native-async-storage/async-storage/jest/async-storage-mock\'))</code>, або аналогічний ручний мок для кастомних нативних модулів; фреймворки типу <code>jest-expo</code> вже постачають преконфігуровані моки для типових Expo-модулів.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'tsx',
          caption: 'RNTL — той самий query-API, що RTL у вебі',
          code: `import { render, screen, fireEvent } from '@testing-library/react-native';
import LoginForm from './LoginForm';

test('показує помилку при невалідному email', () => {
  render(<LoginForm />);

  fireEvent.changeText(screen.getByPlaceholderText('you@example.com'), 'not-an-email');
  fireEvent.press(screen.getByText('Увійти'));

  expect(screen.getByText(/некоректний email/i)).toBeTruthy();
});`,
        },
        {
          kind: 'paragraph',
          html: `<div class="alert warn"><span class="icon">⚠️</span><span>Будь-який нативний модуль (AsyncStorage, камера, push-сповіщення) у Jest-середовищі потребує явного моку — Node.js не має доступу до реального нативного рантайму.</span></div>`,
        },
      ],
    },
    {
      id: 'rn-testing-e2e',
      title: '🤖 E2E: Detox та Maestro',
      interviewQuestions: [
        {
          question: 'Чому Cypress/Playwright, звичні для E2E у вебі, не застосовні до React Native, і що використовують замість них?',
          answer: 'Cypress/Playwright керують <strong>браузером</strong> — driвають реальний DOM через CDP/WebDriver-подібні протоколи. У React Native немає браузера чи DOM для драйву — потрібен інструмент, що вміє взаємодіяти з мобільним симулятором/пристроєм на рівні native UI. <strong>Detox</strong> і <strong>Maestro</strong> — два основні E2E-інструменти під цю задачу, кожен з різним компромісом gray-box vs black-box.',
        },
        {
          question: 'У чому принципова різниця підходів Detox і Maestro до E2E-тестування?',
          answer: '<strong>Detox</strong> — gray-box: інтегрується напряму в застосунок під час збірки, синхронізується з внутрішнім станом (мережеві запити, анімації, чергу подій), що дає високу стабільність тестів (мало flaky-тестів через timing), але вимагає повної нативної збірки під тести. <strong>Maestro</strong> — black-box: керує застосунком ззовні через YAML-описані флоу (натискання, введення тексту, асерти на видимий текст), без інтеграції в код застосунку — простіший і швидший у налаштуванні, ціною трохи меншого контролю над timing-нюансами.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="table-wrap">
    <table>
      <tr><th></th><th>Detox</th><th>Maestro</th></tr>
      <tr><td>Підхід</td><td>Gray-box — інтегрується в застосунок</td><td>Black-box — керує ззовні через YAML</td></tr>
      <tr><td>Стабільність</td><td>Висока — синхронізація з внутрішнім станом</td><td>Хороша, простіші флоу менш крихкі</td></tr>
      <tr><td>Налаштування</td><td>Складніше — потребує нативної збірки під тести</td><td>Швидко — CLI + YAML-файл, без інтеграції в код</td></tr>
      <tr><td>Найкраще для</td><td>Великі команди, критичні флоу, CI з повним контролем</td><td>Швидкий старт, менші команди, прості smoke-тести</td></tr>
    </table>
  </div>`,
        },
        {
          kind: 'code',
          language: 'text',
          caption: 'Maestro — декларативний YAML-флоу',
          code: `# login.yaml
appId: com.example.myapp
---
- launchApp
- tapOn: "Email"
- inputText: "user@example.com"
- tapOn: "Увійти"
- assertVisible: "Вітаємо"`,
        },
      ],
    },

    /* ============================= PHASE I — DEPLOYMENT & FUTURE ============================= */
    {
      id: 'rn-deployment-eas',
      title: '🚢 EAS Build/Submit та OTA-оновлення',
      interviewQuestions: [
        {
          question: 'Чим EAS Build відрізняється від "локальної збірки" через Xcode/Android Studio, і чому це особливо цінно для команд на macOS-less машинах?',
          answer: 'EAS Build — <strong>хмарна</strong> збірка: <code>eas build --platform ios</code> запускає нативну збірку на серверах Expo (включно з macOS-раннерами для iOS), не потребуючи локального Xcode. Це знімає найбільший біль bare-розробки на не-macOS машинах (Xcode вимагає macOS) і уніфікує збірку в CI без потреби тримати парк macOS-раннерів самостійно.',
        },
        {
          question: 'Що можуть, а що НЕ можуть OTA-оновлення (expo-updates / EAS Update) — і чому це обмеження, а не недолік реалізації?',
          answer: 'OTA-оновлення доставляють <strong>лише JS-бандл</strong> (і статичні асети) напряму користувачам, минаючи ревʼю в App Store/Play Store — виправлення багів у JS-логіці чи UI можна викотити за хвилини. Але <strong>нативний код змінити OTA не можна</strong> — новий native module, зміна нативної залежності, оновлення самого RN — усе це вимагає нової збірки й повного циклу ревʼю в сторі. Це не обмеження реалізації, а свідоме архітектурне рішення: сторінки App Store навмисно вимагають ревʼю саме нативного коду з міркувань безпеки платформи.',
        },
        {
          question: 'Навіщо потрібні "build profiles" в eas.json (наприклад, development/preview/production)?',
          answer: 'Кожен профіль задає різну конфігурацію збірки під різні цілі: <code>development</code> — збірка з dev-client для локальної розробки з живим Metro; <code>preview</code> — internal-distribution збірка для QA/стейкхолдерів без публікації в сторі; <code>production</code> — фінальна збірка під App Store/Play Store зі своїми env-змінними й підписами. Це той самий принцип, що dev/staging/production-конфіги у web-CI, застосований до нативної збірки.',
        },
      ],
      blocks: [
        {
          kind: 'code',
          language: 'json',
          caption: 'eas.json — профілі збірки',
          code: `{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal" },
    "production": { "autoIncrement": true }
  }
}`,
        },
        {
          kind: 'code',
          language: 'bash',
          caption: 'Типовий цикл: збірка, публікація в сторі, OTA-оновлення',
          code: `eas build --platform all --profile production   # нативна збірка в хмарі
eas submit --platform ios                        # відправка на ревʼю в App Store
eas update --branch production                    # OTA: JS-фікс без нової збірки`,
        },
      ],
    },
    {
      id: 'rn-future-new-architecture',
      title: '🔮 New Architecture, майбутнє RN',
      interviewQuestions: [
        {
          question: 'Наскільки New Architecture (Fabric/TurboModules) — це "майбутнє" React Native станом на сьогодні, чи вже поточний стандарт?',
          answer: 'New Architecture — вже <strong>стандартна конфігурація за замовчуванням</strong> для нових RN/Expo-проєктів, не експериментальна фіча. Стара bridge-архітектура лишається в застосунках, що ще не мігрували, але напрямок екосистеми (бібліотеки, туторіали, дефолтні шаблони) уже орієнтований на Fabric/TurboModules/JSI як базову лінію.',
        },
        {
          question: 'Як конкурентні фічі React (useTransition, Suspense, Actions) співвідносяться з React Native — переносяться так само "безкоштовно", як хуки й стан?',
          answer: 'React Native ділить те саме "React ядро" (Fiber-реконсилер), тож базові concurrent-примітиви (<code>useTransition</code>, <code>useDeferredValue</code>) концептуально доступні. Але частина найновіших фіч React (Server Components, серверні Actions) спроєктована навколо мережевої моделі веб-фреймворків (Next.js) і поки не має прямого еквівалента в мобільному рантаймі, де немає "сервера, що рендерить UI" у тому самому сенсі — це territoria, що активно досліджується екосистемою, а не усталений патерн.',
        },
        {
          question: 'Чому Expo сьогодні описують не як "зручний стартовий шаблон", а як усе більш стандартну модель дистрибуції React Native?',
          answer: 'Тому що Expo Development Builds + EAS зняли головне історичне обмеження ("Expo — лише для простих застосунків без нативного коду") — сьогодні Expo підтримує кастомний нативний код через prebuild/config plugins, зберігаючи зручність managed workflow. Тренд екосистеми (офіційна документація, дефолтні команди CLI, нові фічі спершу для Expo) закріплює Expo як типову точку входу, а не нішевий інструмент для прототипів.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<div class="alert"><span class="icon">📎</span><span>Деталі самого механізму New Architecture (Fabric-рендерер, TurboModules, JSI замість bridge) — курс React, секція <strong>📱 React Native та поза-браузерні рендерери</strong>. Тут — лише напрямок руху екосистеми, важливий для орієнтації на співбесіді про "куди рухається платформа".</span></div>`,
        },
      ],
    },
  ],
}
