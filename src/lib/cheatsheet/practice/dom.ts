import type { PracticeTask } from '../types'

// Section G of the interview-prep checklist: DOM / vanilla JS
// (less common for a React role, but still asked).
export const domTasks: PracticeTask[] = [
  {
    id: 'event-delegation',
    title: 'Event delegation — один listener на батька',
    level: 'Middle',
    topic: 'DOM',
    priority: 'mid',
    tags: ['events', 'bubbling', 'closest', 'dataset'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>delegate(root, selector, eventType, handler)</code> — вішає <strong>один</strong> слухач на <code>root</code>, але <code>handler</code> викликається лише коли подія прийшла від елемента, що відповідає <code>selector</code> (або його нащадка). У <code>handler</code> передавай сам матчнутий елемент.</p>
      <p>Поясни переваги перед навішуванням слухача на кожен елемент.</p>`,
    starterCode: `function delegate(
  root: HTMLElement,
  selector: string,
  eventType: string,
  handler: (event: Event, target: HTMLElement) => void,
): () => void {
  // TODO: один listener; повернути функцію відписки
  return () => {};
}`,
    solution: `function delegate(
  root: HTMLElement,
  selector: string,
  eventType: string,
  handler: (event: Event, target: HTMLElement) => void,
): () => void {
  const listener = (event: Event) => {
    const start = event.target as HTMLElement | null;
    // піднімаємось від target вгору, але не вище root
    const match = start?.closest(selector) as HTMLElement | null;
    if (match && root.contains(match)) {
      handler(event, match);
    }
  };

  root.addEventListener(eventType, listener);
  return () => root.removeEventListener(eventType, listener);
}

// delegate(list, 'li[data-id]', 'click', (e, li) => {
//   console.log('clicked item', li.dataset.id);
// });`,
    explanation: `<ul class="list">
      <li>Механізм — <strong>спливання (bubbling)</strong>: подія з внутрішнього елемента доходить до <code>root</code>, де її й ловить єдиний слухач.</li>
      <li><code>event.target.closest(selector)</code> знаходить найближчого предка (або сам target), що матчить селектор — працює навіть якщо клікнули по вкладеній іконці всередині <code>&lt;li&gt;</code>.</li>
      <li>Переваги: (1) <strong>один</strong> слухач замість N — менше пам'яті; (2) працює для елементів, доданих у DOM <em>пізніше</em>, без повторного навішування; (3) простіше прибирати (одна відписка).</li>
      <li>Не спрацює для подій, що не спливають (<code>focus</code>, <code>blur</code> — треба <code>focusin</code>/<code>focusout</code>, або capture-фаза).</li>
    </ul>`,
  },
  {
    id: 'custom-query-selector',
    title: 'Проста власна реалізація querySelector',
    level: 'Senior',
    topic: 'DOM',
    priority: 'low',
    tags: ['DOM', 'recursion', 'parser'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>$(selector, root = document.body)</code> — підтримка простих селекторів: тег (<code>div</code>), <code>.class</code>, <code>#id</code> і їх поєднання (<code>div.card</code>), а також нащадковий комбінатор через пробіл (<code>ul li</code>). Повертає <strong>перший</strong> збіг або <code>null</code>. Без <code>querySelector</code>.</p>`,
    starterCode: `function $(selector: string, root: Element | Document = document): Element | null {
  // TODO: tag / .class / #id / "a b" (нащадок)
  return null;
}`,
    solution: `function matchesSimple(el: Element, part: string): boolean {
  // part = 'div.card#main' -> перевіряємо всі шматки
  const tag = part.match(/^[a-z0-9]+/i)?.[0];
  const id = part.match(/#([\\w-]+)/)?.[1];
  const classes = [...part.matchAll(/\\.([\\w-]+)/g)].map((m) => m[1]);

  if (tag && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
  if (id && el.id !== id) return false;
  if (classes.some((c) => !el.classList.contains(c))) return false;
  return true;
}

function $(selector: string, root: Element | Document = document): Element | null {
  const parts = selector.trim().split(/\\s+/); // 'ul li' -> ['ul', 'li']

  function search(node: Element | Document, depth: number): Element | null {
    for (const child of Array.from(node.children ?? node.childNodes)) {
      if (!(child instanceof Element)) continue;

      if (matchesSimple(child, parts[depth])) {
        if (depth === parts.length - 1) return child; // останній рівень — знайшли
        const deeper = search(child, depth + 1);
        if (deeper) return deeper;
      }
      // навіть якщо не match — шукаємо потрібний рівень глибше
      const anywhere = search(child, depth);
      if (anywhere) return anywhere;
    }
    return null;
  }

  return search(root, 0);
}`,
    explanation: `<ul class="list">
      <li><code>matchesSimple</code> розбирає один «складений» селектор на тег / id / класи регулярками і перевіряє елемент по всіх критеріях.</li>
      <li>Нащадковий комбінатор: розбиваємо по пробілах на рівні, рекурсивно спускаємось — знайшовши <code>parts[0]</code>, шукаємо <code>parts[1]</code> серед його нащадків.</li>
      <li>DFS по <code>children</code>; на кожному вузлі пробуємо і «просунутись» на наступний рівень селектора, і продовжити пошук поточного рівня глибше.</li>
      <li>Реальний движок селекторів (Sizzle / браузерний) значно складніший: комбінатори <code>&gt;</code>, <code>+</code>, <code>~</code>, псевдокласи, атрибути, і матчинг йде <em>справа наліво</em> для швидкості.</li>
    </ul>`,
  },
  {
    id: 'dom-traversal',
    title: 'DOM traversal — BFS / DFS',
    level: 'Middle',
    topic: 'DOM',
    priority: 'low',
    tags: ['tree', 'BFS', 'DFS', 'queue', 'stack'],
    prompt: `<p><strong>Завдання:</strong> реалізуй обхід DOM-піддерева:</p>
      <ul class="list">
        <li><code>traverseDFS(root, visit)</code> — рекурсивно / через стек;</li>
        <li><code>traverseBFS(root, visit)</code> — через чергу, рівень за рівнем;</li>
        <li><code>findAll(root, predicate)</code> — зібрати всі елементи, що задовольняють умову.</li>
      </ul>`,
    starterCode: `function traverseDFS(root: Element, visit: (el: Element) => void): void {
  // TODO
}

function traverseBFS(root: Element, visit: (el: Element) => void): void {
  // TODO
}`,
    solution: `function traverseDFS(root: Element, visit: (el: Element) => void): void {
  visit(root);
  for (const child of root.children) {
    traverseDFS(child, visit); // pre-order
  }
}

function traverseBFS(root: Element, visit: (el: Element) => void): void {
  const queue: Element[] = [root];
  while (queue.length) {
    const el = queue.shift()!;      // з голови черги
    visit(el);
    queue.push(...el.children);      // діти — в хвіст
  }
}

function findAll(root: Element, predicate: (el: Element) => boolean): Element[] {
  const out: Element[] = [];
  traverseDFS(root, (el) => {
    if (predicate(el)) out.push(el);
  });
  return out;
}`,
    explanation: `<ul class="list">
      <li><strong>DFS</strong> — стек (або рекурсія): йдемо вглиб до листя, потім назад. Порядок pre-order збігається з порядком елементів у документі.</li>
      <li><strong>BFS</strong> — черга: спершу всі діти рівня 1, потім рівня 2… Корисно, коли потрібен «найближчий» збіг за глибиною.</li>
      <li>Складність обох — <code>O(n)</code> за кількістю вузлів; BFS тримає в пам'яті цілий рівень, DFS — лише глибину.</li>
      <li>Браузерний аналог — <code>TreeWalker</code> / <code>NodeIterator</code>, але ручний обхід питають, щоб перевірити розуміння BFS/DFS.</li>
    </ul>`,
  },
  {
    id: 'vdom-diff',
    title: 'Спрощений Virtual DOM diff',
    level: 'Senior',
    topic: 'DOM',
    priority: 'low',
    tags: ['virtual dom', 'reconciliation', 'diff', 'recursion'],
    prompt: `<p><strong>Завдання:</strong> для спрощеного VDOM (<code>{ type, props, children }</code> або рядок) реалізуй <code>diff(oldNode, newNode)</code> → список патчів, та <code>patch(domNode, patches)</code>, що їх застосовує.</p>
      <ul class="list">
        <li>різний <code>type</code> → REPLACE;</li>
        <li>той самий <code>type</code> → оновити змінені <code>props</code>, рекурсивно порівняти <code>children</code> за індексом;</li>
        <li>прибрати зайві / додати нові діти.</li>
      </ul>
      <p>Senior-задача — достатньо озвучити алгоритм і накидати кістяк.</p>`,
    starterCode: `type VNode = string | { type: string; props: Record<string, unknown>; children: VNode[] };

type Patch =
  | { kind: 'REPLACE'; node: VNode }
  | { kind: 'TEXT'; text: string }
  | { kind: 'PROPS'; set: Record<string, unknown>; remove: string[] }
  | { kind: 'CHILDREN'; children: (Patch[] | null)[] };

function diff(oldNode: VNode | undefined, newNode: VNode | undefined): Patch[] {
  // TODO
  return [];
}`,
    solution: `function diff(oldNode: VNode | undefined, newNode: VNode | undefined): Patch[] {
  // видалення
  if (newNode === undefined) return [{ kind: 'REPLACE', node: '' }];
  // додавання / зміна типу
  if (oldNode === undefined) return [{ kind: 'REPLACE', node: newNode }];

  if (typeof oldNode === 'string' || typeof newNode === 'string') {
    if (oldNode !== newNode) {
      return typeof newNode === 'string'
        ? [{ kind: 'TEXT', text: newNode }]
        : [{ kind: 'REPLACE', node: newNode }];
    }
    return [];
  }

  if (oldNode.type !== newNode.type) {
    return [{ kind: 'REPLACE', node: newNode }];
  }

  const patches: Patch[] = [];

  // props
  const set: Record<string, unknown> = {};
  const remove: string[] = [];
  for (const key of Object.keys(newNode.props)) {
    if (newNode.props[key] !== oldNode.props[key]) set[key] = newNode.props[key];
  }
  for (const key of Object.keys(oldNode.props)) {
    if (!(key in newNode.props)) remove.push(key);
  }
  if (Object.keys(set).length || remove.length) {
    patches.push({ kind: 'PROPS', set, remove });
  }

  // children — попарно за індексом
  const len = Math.max(oldNode.children.length, newNode.children.length);
  const childPatches: (Patch[] | null)[] = [];
  for (let i = 0; i < len; i++) {
    const cp = diff(oldNode.children[i], newNode.children[i]);
    childPatches.push(cp.length ? cp : null);
  }
  if (childPatches.some(Boolean)) {
    patches.push({ kind: 'CHILDREN', children: childPatches });
  }

  return patches;
}`,
    explanation: `<ul class="list">
      <li><strong>Евристики O(n)</strong> (як у React): порівнюємо вузли лише <em>на тій самій позиції</em>; різний <code>type</code> → повна заміна піддерева, без спроби «переставити».</li>
      <li>Той самий <code>type</code>: обчислюємо мінімальний набір змін props (що додати/оновити vs що прибрати) і рекурсивно дифимо дітей за індексом.</li>
      <li>Саме тому в реальному React потрібні <code>key</code> — вони дозволяють зіставляти дітей за ідентичністю, а не за позицією (інакше вставка на початок = «зміна всіх»).</li>
      <li><code>patch()</code> обходить DOM паралельно зі списком патчів і застосовує їх: <code>replaceChild</code>, <code>setAttribute</code>/<code>removeAttribute</code>, <code>nodeValue</code>, рекурсія по <code>childNodes</code>.</li>
    </ul>`,
  },
]
