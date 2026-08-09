import type { QuizData } from './types'

export const reactQuiz: QuizData = {
  title: 'React Quiz',
  questions: [
    {
      id: 'q1',
      question:
        'Чому key={index} у списку, порядок якого може змінюватись (drag & drop, сортування, видалення), вважається антипатерном?',
      options: [
        'React забороняє index як key і кине помилку',
        "React матчить елементи за key між рендерами; якщо key = index, а порядок змінився, React підв'яже старий DOM/стан до неправильного елемента",
        'index як key працює однаково добре — це міф',
        'key={index} сповільнює рендер, але не ламає стан',
      ],
      correct: 1,
      explanation:
        "React reconciliation матчить елементи списку по <code>key</code>. Якщо key = index, а елементи переставились/видалились, React вважає, що елемент з тим самим index — той самий елемент, і переносить на нього старий DOM/стан (наприклад значення input), хоча логічно це вже інший айтем. Рішення — стабільний унікальний id.",
    },
    {
      id: 'q2',
      question: 'У якій фазі React виконує useLayoutEffect?',
      options: [
        'Render phase, до побудови work-in-progress tree',
        'Commit phase, синхронно після DOM mutations, до paint браузера',
        'Після paint, асинхронно, як useEffect',
        'На сервері, під час SSR',
      ],
      correct: 1,
      explanation:
        'Commit phase синхронна: DOM mutations → refs → useLayoutEffect (до paint) → браузер малює → useEffect (після paint, асинхронно). Тому важкий код у useLayoutEffect може блокувати paint.',
    },
    {
      id: 'q3',
      question:
        'Чому в тілі функціонального компонента (render phase) не можна робити side-effects (fetch, підписки, мутації DOM)?',
      options: [
        'Це заборонено ESLint, але технічно працює',
        'Render phase може перериватися й повторюватися (concurrent features, StrictMode) — side-effect виконається кілька разів або на відкинутому дереві',
        'Side-effects дозволені, якщо обгорнути в useMemo',
        'React виконує render лише один раз за весь життєвий цикл компонента',
      ],
      correct: 1,
      explanation:
        'Render phase — «чиста» фаза: React може почати рендерити, перервати (concurrent features) і почати заново, або відкинути work-in-progress tree. Side-effect у тілі компонента виконається повторно/на відкинутому дереві. Side-effects мають жити в commit-фазі (useEffect/useLayoutEffect).',
    },
    {
      id: 'q4',
      question:
        'Дочірній компонент без React.memo отримує проп label="static", який ніколи не змінюється. Батько ре-рендериться (setState). Що станеться з дочірнім компонентом?',
      options: [
        'Не ре-рендериться, бо проп не змінився',
        'Ре-рендериться теж — ре-рендер батька рендерить усе піддерево, доки не зустріне React.memo',
        'React автоматично мемоізує компонент без пропсів, що змінюються',
        'Залежить від того, useState чи useReducer у батька',
      ],
      correct: 1,
      explanation:
        "Один із чотирьох тригерів ре-рендеру — ре-рендер батька. Дитина рендериться незалежно від того, чи змінились її пропи, якщо вона не обгорнута в React.memo. Це і є класичне питання «проп не змінився, а ре-рендер стався».",
    },
    {
      id: 'q5',
      question:
        'React 18: <code>setTimeout(() => { setCount(c => c+1); setName("X"); }, 0);</code>. Скільки ре-рендерів це викличе?',
      options: [
        'Два окремі ре-рендери (поведінка React 17)',
        'Один ре-рендер — React 18 автоматично батчить оновлення стану скрізь, не тільки в event handlers',
        'Жодного ре-рендеру, бо setTimeout поза React',
        'Помилка — не можна викликати два setState підряд',
      ],
      correct: 1,
      explanation:
        'React 18 розширив automatic batching на всі контексти: setTimeout, проміси, native event handlers — не лише React event handlers, як було в React 17. Обидва setState згрупуються в один ре-рендер. Примусово синхронний рендер — flushSync().',
    },
    {
      id: 'q6',
      question:
        'У чому баг цього коду?<code>useEffect(() => {\n  const id = setInterval(() => setCount(count + 1), 1000);\n  return () => clearInterval(id);\n}, []);</code>',
      options: [
        'clearInterval викликається неправильно',
        'Stale closure: ефект захопив count зі значенням на момент mount ([] deps), тому count завжди інкрементується від початкового значення',
        'setInterval не можна використовувати всередині useEffect',
        'Багу немає, код коректний',
      ],
      correct: 1,
      explanation:
        'Через порожній масив залежностей ефект створюється один раз при mount і «замикає» тодішнє значення count. Кожен тік інтервалу рахує count+1 від того самого застарілого значення. Фікс: функціональне оновлення <code>setCount(c => c + 1)</code>, яке не залежить від зовнішнього count.',
    },
    {
      id: 'q7',
      question: 'Коли useCallback реально потрібен?',
      options: [
        'На кожному обробнику onClick "про всяк випадок"',
        'Коли функція передається в React.memo-компонент як проп або в масив залежностей іншого хука — інакше нова референція щоразу зводить мемоізацію нанівець',
        'Тільки всередині useEffect',
        'useCallback завжди пришвидшує рендер незалежно від контексту',
      ],
      correct: 1,
      explanation:
        'useCallback має сенс, коли референційна стабільність функції впливає на щось інше: memo-компонент порівнює пропи через Object.is, або функція — залежність іншого useEffect/useMemo. На простому <button onClick={handler}> без memo — це передчасна оптимізація.',
    },
    {
      id: 'q8',
      question: 'Чим useRef відрізняється від useState для зберігання значення між рендерами?',
      options: [
        'useRef теж викликає ре-рендер при зміні .current, як useState',
        'Зміна ref.current НЕ тригерить ре-рендер — значення "живе" між рендерами, але компонент не оновлюється візуально',
        'useRef можна використовувати тільки для DOM-елементів',
        'useRef скидається при кожному ре-рендері, на відміну від useState',
      ],
      correct: 1,
      explanation:
        'useRef повертає мутабельний обʼєкт { current }, що переживає ре-рендери, але зміна .current НЕ спричиняє ре-рендер. Ідеально для timer id, попереднього значення пропу, «живого» значення всередині ефекту — того, що не має напряму впливати на UI.',
    },
    {
      id: 'q9',
      question: 'Коли useReducer кращий вибір, ніж useState?',
      options: [
        'Завжди, useReducer швидший',
        'Коли наступний стан залежить від кількох повʼязаних полів або від попереднього стану складним чином (dispatch({type, payload}) явно описує "що сталось")',
        'useReducer можна використовувати тільки з Redux',
        'useState не підтримує обʼєкти як стан',
      ],
      correct: 1,
      explanation:
        'useReducer добре підходить для складного, повʼязаного стану (форма з кількома полями, стан завантаження + дані + помилка), де логіка переходів явна й тестована окремо. useState — для незалежних простих значень. Обидва — просто інша форма локального стану, не заміна Redux.',
    },
    {
      id: 'q10',
      question: 'Коли варто обрати useLayoutEffect замість useEffect?',
      options: [
        'Завжди — він "сучасніший"',
        'Коли потрібно синхронно прочитати/змінити layout ДО того, як браузер намалює кадр — інакше користувач побачить мигання (flash of wrong layout)',
        'useLayoutEffect швидший для будь-яких side-effects',
        'Тільки для роботи з fetch-запитами',
      ],
      correct: 1,
      explanation:
        'useLayoutEffect виконується синхронно після DOM mutations, але до paint браузера — підходить для вимірювання/коригування layout (наприклад позиціонування тултіпа), де затримка в один кадр видима як мигання. У 95% випадків useEffect достатньо й не блокує рендер.',
    },
    {
      id: 'q11',
      question: 'У чому різниця між useTransition і useDeferredValue?',
      options: [
        'Це синоніми, різні лише назви',
        'useTransition обгортає ДІЮ (виклик setState), useDeferredValue відкладає саме ЗНАЧЕННЯ — обидва позначають оновлення як неспішне, даючи терміновим оновленням пройти першими',
        'useDeferredValue працює тільки з рядками',
        'useTransition можна використовувати лише в Server Components',
      ],
      correct: 1,
      explanation:
        'startTransition(() => setFiltered(...)) каже React: це оновлення не термінове, можна перервати заради термінового (набір тексту в input). useDeferredValue(value) робить те саме, але для конкретного значення, яке передається далі, без потреби обгортати сам setState.',
    },
    {
      id: 'q12',
      question: 'Яке правило ОБОВʼЯЗКОВЕ для custom hook?',
      options: [
        'Має повертати JSX',
        'Має починатися з "use" і дотримуватись Rules of Hooks (не в умовах/циклах) — компонується з інших хуків, виносить логіку, а не UI',
        'Може викликати хуки умовно, на відміну від звичайних хуків',
        'Має бути класовим компонентом всередині',
      ],
      correct: 1,
      explanation:
        'Custom hook — просто функція, що починається з "use" (конвенція для лінтера й React) і всередині викликає інші хуки за тими самими правилами (не в if/for). Повертає дані/функції — UI лишається в компоненті, що його викликає.',
    },
    {
      id: 'q13',
      question:
        'React.memo(Component) не допомагає, хоча пропи виглядають "однаковими" між рендерами. Найімовірніша причина?',
      options: [
        'React.memo зламаний у цій версії React',
        'Один з пропів — новий обʼєкт/масив/функція, створена інлайн при кожному рендері батька (наприклад style={{color:"red"}}) — Object.is бачить нову референцію',
        'React.memo працює тільки з класовими компонентами',
        'Компонент занадто маленький для мемоізації',
      ],
      correct: 1,
      explanation:
        'React.memo за замовчуванням порівнює пропи через Object.is (shallow). Інлайн-обʼєкти/масиви/функції — нова референція щоразу, тому «однакові за змістом» пропи вважаються різними. Фікс: useMemo/useCallback на стороні батька або винесення літералу за межі рендеру.',
    },
    {
      id: 'q14',
      question: 'Чому «референційна стабільність» — головна причина, чому memo іноді "не працює"?',
      options: [
        'Тому що JS порівнює обʼєкти за посиланням (referential equality), а не за глибоким вмістом, і саме на цьому побудована перевірка пропів у memo та deps хуків',
        'Тому що React використовує JSON.stringify для порівняння пропів',
        'Тому що памʼять браузера обмежена',
        'Це стосується лише TypeScript, не JavaScript',
      ],
      correct: 0,
      explanation:
        '{} !== {} у JS, навіть якщо вміст однаковий. memo, useMemo/useCallback deps, useEffect deps — усі використовують поверхневе порівняння за посиланням (Object.is). Розуміння цього — ключ до діагностики «зайвих» ре-рендерів і «нескінченних» useEffect.',
    },
    {
      id: 'q15',
      question: 'Що робить React.lazy у парі з Suspense?',
      options: [
        'Кешує результат fetch-запиту',
        'Відкладає завантаження JS-чанка компонента до моменту, коли він реально потрібен для рендеру — Suspense показує fallback, поки чанк вантажиться',
        'Автоматично мемоізує компонент',
        'Виконує компонент на сервері замість клієнта',
      ],
      correct: 1,
      explanation:
        "React.lazy(() => import('./Settings')) створює компонент, чий код підвантажується асинхронно окремим chunk'ом лише коли він потрібен (наприклад route change). Suspense fallback показується, доки import() резолвиться — основа route- і component-based code splitting.",
    },
    {
      id: 'q16',
      question:
        'Чому для списку з 10 000+ елементів критично використовувати virtualization (react-window)?',
      options: [
        'React не вміє рендерити більше 1000 DOM-вузлів',
        'Рендер і підтримка тисяч DOM-вузлів одночасно — дорого і для initial render, і для reconciliation при кожному оновленні; virtualization рендерить лише видимі елементи + невеликий буфер',
        'Virtualization потрібна тільки для мобільних пристроїв',
        'Це вимога SEO',
      ],
      correct: 1,
      explanation:
        'Без virtualization браузер має створити/тримати в DOM усі 10k вузлів — важкий initial render, повільний reconciliation, велике споживання памʼяті. react-window рендерить тільки те, що потрапляє у viewport (+ буфер), тримаючи DOM невеликим незалежно від розміру даних.',
    },
    {
      id: 'q17',
      question:
        'Яка з метрик Core Web Vitals вимірює затримку між взаємодією користувача (клік/тап) і наступним відмальованим кадром?',
      options: [
        'LCP (Largest Contentful Paint)',
        'CLS (Cumulative Layout Shift)',
        'INP (Interaction to Next Paint)',
        'TTFB (Time to First Byte)',
      ],
      correct: 2,
      explanation:
        'LCP — коли з\'являється найбільший контентний елемент (швидкість завантаження). CLS — наскільки «стрибає» layout під час завантаження. INP (замінив FID у 2024) — затримка між взаємодією й наступним кадром, напряму повʼязана з тим, наскільки React-рендери блокують main thread.',
    },
    {
      id: 'q18',
      question: 'React DevTools Profiler допомагає знайти...',
      options: [
        'Помилки типів TypeScript',
        'Які компоненти ре-рендерились під час запису, скільки це зайняло часу, і чому — головний інструмент для полювання на зайві ре-рендери',
        'Розмір бандла',
        'SQL-запити на бекенді',
      ],
      correct: 1,
      explanation:
        'Profiler записує коміти й показує flame chart/ranked chart компонентів, час рендеру кожного, і (з опцією «Record why each component rendered») причину — новий проп, новий стан, ре-рендер батька. Основний інструмент для практичного пошуку зайвих ре-рендерів, а не здогадок.',
    },
    {
      id: 'q19',
      question:
        'Дані користувача з /api/user, які теоретично можуть змінитись на сервері іншим клієнтом (наприклад в іншій вкладці), — це...',
      options: [
        'Client state — зберігай у Zustand',
        'Server state — керуй через TanStack Query (кеш, staleTime, інвалідація, refetch), а не через useState+useEffect',
        'URL state — виноси в query params',
        'Не має значення, useState підійде однаково добре',
      ],
      correct: 1,
      explanation:
        'Ключова архітектурна відповідь Senior-рівня: «де живе стан» залежить від його природи. Server state (дані, чиєю «справжньою» копією володіє сервер) належить TanStack Query/RSC-fetch — з кешуванням, staleTime, background refetch. Client state (UI-прапорці, форми) — useState/Zustand. URL state (фільтри, сторінка) — query params.',
    },
    {
      id: 'q20',
      question:
        'Чому Context API не рекомендують для стану, що змінюється часто (наприклад позиція курсора)?',
      options: [
        'Context не підтримує числові значення',
        'Будь-яка зміна значення Context ре-рендерить УСІХ споживачів (useContext) під Provider, незалежно від того, яку частину значення вони реально використовують',
        'Context працює тільки з класовими компонентами',
        'Це обмеження лише React Native',
      ],
      correct: 1,
      explanation:
        'На відміну від Zustand-селекторів (підписка на конкретний зріз стану), Context — «все або нічого»: кожен компонент, що викликає useContext(MyContext), ре-рендериться при БУДЬ-ЯКІЙ зміні значення Provider. Для часто змінюваного/великого стану це веде до масових зайвих ре-рендерів по дереву.',
    },
    {
      id: 'q21',
      question:
        'Навіщо в Zustand використовувати селектор useStore(s => s.count) замість useStore() без аргументів?',
      options: [
        'Без різниці, обидва варіанти однаково ефективні',
        'Селектор підписує компонент лише на зміну конкретного зрізу — компонент ре-рендериться тільки коли ЦЕ значення змінилось, а не при будь-якій зміні store',
        'Селектори потрібні лише для TypeScript-типізації',
        'useStore() без аргументів кидає помилку',
      ],
      correct: 1,
      explanation:
        'useStore() без селектора підписує компонент на ВЕСЬ store — будь-яка зміна будь-якого поля викликає ре-рендер. useStore(s => s.count) підписує тільки на count. Це основний спосіб уникнути зайвих ре-рендерів у великому store.',
    },
    {
      id: 'q22',
      question: 'У чому різниця між staleTime і gcTime (раніше cacheTime) у TanStack Query?',
      options: [
        'Це синоніми',
        'staleTime — скільки часу дані вважаються "свіжими" (не тригерять refetch при mount/фокусі); gcTime — скільки часу невикористані дані лишаються в кеші перед видаленням',
        'staleTime стосується лише мутацій, gcTime — лише запитів',
        'gcTime завжди має бути меншим за staleTime',
      ],
      correct: 1,
      explanation:
        'staleTime=0 (дефолт) означає, що дані одразу «застарілі» і refetch\'аться при кожному mount/поверненні фокуса, навіть якщо щойно завантажені. gcTime (5 хв дефолт) — скільки кеш живе ПІСЛЯ того, як усі компоненти, що юзали query, відписались. Це різні незалежні таймери.',
    },
    {
      id: 'q23',
      question:
        'Коли RxJS Observable краще за useEffect + useState для роботи з потоком подій (debounced search, WebSocket presence)?',
      options: [
        'RxJS завжди краще, useEffect застарів',
        'Коли потрібна композиція операторів у часі — debounce, switchMap (скасування попереднього запиту), merge кількох джерел — важко й крихко відтворювати вручну',
        'RxJS не можна використовувати в React взагалі',
        'Тільки коли компонент класовий',
      ],
      correct: 1,
      explanation:
        'Для простого «один ефект — одна дія» useEffect достатньо. Але коли потрібна композиція в часі (debounce → switchMap зі скасуванням попереднього запиту → merge з іншим потоком), RxJS-оператори роблять це декларативно, без ручного AbortController/таймерів. Результат «загортається» назад у React-стан через кастомний хук (useObservable).',
    },
    {
      id: 'q24',
      question:
        'Чому React пропагує composition (через children/props), а не class inheritance, для перевикористання UI-логіки?',
      options: [
        'React технічно не підтримує class extends для компонентів',
        'Композиція (передача children/render-функцій) гнучкіша й уникає проблем deep inheritance chains — крихкий базовий клас, неявні залежності між рівнями ієрархії',
        'Inheritance швидший за composition у продакшн-білді',
        'Це стосується лише TypeScript-проєктів',
      ],
      correct: 1,
      explanation:
        '«Composition over inheritance» — рекомендація React ще з класових часів. Замість Button extends BaseButton (крихка ієрархія, важко змінити поведінку одного рівня, не зачепивши інші), React заохочує compound components / children-composition: <Card><Card.Header/><Card.Body/></Card> — гнучкіше комбінується без жорсткої ієрархії.',
    },
    {
      id: 'q25',
      question:
        'Чому Render Props і HOC (Higher-Order Components) вважаються "легасі"-патернами в сучасному React?',
      options: [
        'Вони більше не працюють у React 18+',
        'Custom hooks вирішують ту саму задачу простіше — без "wrapper hell" (глибокої вкладеності компонентів) і неявного проброшування пропів',
        'Render props заборонені лінтером',
        'Вони працюють тільки з Class Components',
      ],
      correct: 1,
      explanation:
        'Render Props (<DataProvider render={data => ...}/>) і HOC (withData(Component)) — доеволюційні способи ділитися логікою між компонентами. Технічно й досі працюють, але створюють «wrapper hell» у React DevTools і неявні API. Custom hooks (useData()) дають ту саму логіку прямим викликом без обгорток.',
    },
    {
      id: 'q26',
      question: 'У чому ключова відмінність controlled input від uncontrolled?',
      options: [
        'Controlled input не можна валідувати',
        'Controlled: значення керується React-стейтом (value + onChange), React — source of truth; Uncontrolled: значення живе в DOM, React читає його через ref, коли потрібно',
        'Uncontrolled input не підтримує TypeScript',
        'Це стосується лише checkbox/radio, не text input',
      ],
      correct: 1,
      explanation:
        'Controlled — value={state}, onChange={e => setState(e.target.value)} — кожне натискання оновлює React-стан, який керує DOM. Uncontrolled — <input ref={inputRef} defaultValue=... /> — DOM сам тримає значення, React лізе туди через ref лише коли потрібно (submit). Uncontrolled простіший для великих форм без live-валідації.',
    },
    {
      id: 'q27',
      question: 'Чому межа між Container і Presentational компонентами "розмилась" з появою хуків?',
      options: [
        'Presentational компоненти більше не існують у React 18',
        'Раніше логіку й UI розділяли фізично різними компонентами; тепер custom hooks дозволяють винести логіку в окрему функцію, а UI лишається одним компонентом, що споживає хук',
        'Container-компоненти тепер обовʼязково класові',
        'Це застарілий термін, замінений на "Server Components"',
      ],
      correct: 1,
      explanation:
        'Патерн Container/Presentational фізично розділяв компоненти: один тягне дані/логіку, інший тільки рендерить UI за пропами. З хуками ту саму «логіку окремо від UI» можна отримати через useSomeData() всередині ОДНОГО компонента — розділення відповідальностей лишається, але вже логічне, не файлове.',
    },
    {
      id: 'q28',
      question: 'Чому Error Boundaries досі можна реалізувати ТІЛЬКИ через class component?',
      options: [
        'Для них немає хукового еквівалента componentDidCatch/getDerivedStateFromError у функціональних компонентах',
        'Функціональні компоненти технічно не можуть кидати помилки',
        'Error Boundaries застаріли, замінені на try/catch',
        'Хуки автоматично ловлять усі помилки рендеру',
      ],
      correct: 0,
      explanation:
        'Error Boundary використовує lifecycle-методи componentDidCatch (side-effect: логування) і static getDerivedStateFromError (рендер fallback UI) — на сьогодні немає хукового еквівалента. Один із небагатьох випадків, де class component і досі потрібен у сучасному функціональному React — часто через готову бібліотеку react-error-boundary.',
    },
  ],
}
