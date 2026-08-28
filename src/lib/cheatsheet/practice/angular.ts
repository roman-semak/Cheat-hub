import type { PracticeTask } from '../types'

// Angular change-detection / RxJS-lifecycle debugging exercises.
export const angularTasks: PracticeTask[] = [
  {
    id: 'angular-onpush-not-updating',
    title: 'OnPush не бачить зміни',
    level: 'Senior',
    topic: 'Angular',
    priority: 'mid',
    tags: ['ChangeDetectionStrategy', 'OnPush', 'immutability'],
    prompt: `<p><strong>Проблема:</strong> <code>TodoListComponent</code> з <code>ChangeDetectionStrategy.OnPush</code> не оновлюється, коли батько додає новий todo — новий елемент не з'являється на екрані.</p>
      <p><strong>Завдання:</strong> полагодь <code>addTodo()</code> так, щоб список оновлювався, <strong>не</strong> знімаючи <code>OnPush</code> з <code>TodoListComponent</code>.</p>`,
    starterCode: `import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface Todo { id: number; text: string; }

@Component({
  selector: 'app-todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <ul>
      <li *ngFor="let todo of todos">{{ todo.text }}</li>
    </ul>
  \`,
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
}

@Component({
  selector: 'app-todo-page',
  template: \`
    <app-todo-list [todos]="todos"></app-todo-list>
    <button (click)="addTodo()">Додати</button>
  \`,
})
export class TodoPageComponent {
  todos: Todo[] = [{ id: 1, text: 'Купити молоко' }];
  private nextId = 2;

  addTodo() {
    // TODO: новий todo не з'являється в списку — OnPush не бачить зміну
    this.todos.push({ id: this.nextId, text: \`Завдання \${this.nextId++}\` });
  }
}`,
    solution: `addTodo() {
  // імутабельне оновлення: новий масив, нове посилання
  this.todos = [...this.todos, { id: this.nextId, text: \`Завдання \${this.nextId++}\` }];
}`,
    explanation: `<ul class="list">
      <li><code>OnPush</code> перевіряє компонент лише коли змінюється <strong>посилання</strong> на <code>@Input()</code>-значення (або спрацьовує подія всередині самого компонента чи <code>async</code>-пайп). Мутація масиву через <code>push</code> не змінює посилання — <code>TodoListComponent</code> вважає, що <code>todos</code> ті самі, і CD пропускається.</li>
      <li>Імутабельне оновлення (<code>[...this.todos, newItem]</code>) створює новий масив з новим посиланням → Angular бачить зміну <code>@Input()</code>, і плановий CD-прохід підхоплює <code>TodoListComponent</code>.</li>
      <li>Альтернатива без зміни підходу до даних — інжектувати <code>ChangeDetectorRef</code> у <code>TodoListComponent</code> і викликати <code>markForCheck()</code> вручну, але це змушує батьківський компонент фактично знати про внутрішній CD дочірнього — імутабельність зазвичай простіший і чистіший варіант.</li>
    </ul>`,
  },
  {
    id: 'angular-subscription-leak',
    title: 'Витік підписки (memory leak)',
    level: 'Middle',
    topic: 'Angular',
    priority: 'mid',
    tags: ['Subscription', 'takeUntil', 'ngOnDestroy'],
    prompt: `<p><strong>Проблема:</strong> <code>UserBadgeComponent</code> підписується на довгоживучий <code>currentUser$</code> у <code>ngOnInit</code> і ніколи не відписується. Кожне створення/знищення компонента (наприклад, при навігації) додає нову підписку — витік пам'яті.</p>
      <p><strong>Завдання:</strong> полагодь так, щоб підписка коректно скасовувалась при знищенні компонента.</p>`,
    starterCode: `import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({ selector: 'app-user-badge', template: \`<span>{{ userName }}</span>\` })
export class UserBadgeComponent implements OnInit {
  userName = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    // TODO: підписка ніколи не скасовується — витік при кожному створенні компонента
    this.userService.currentUser$.subscribe((user) => {
      this.userName = user?.name ?? 'Гість';
    });
  }
}`,
    solution: `import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from './user.service';

@Component({ selector: 'app-user-badge', template: \`<span>{{ userName }}</span>\` })
export class UserBadgeComponent implements OnInit, OnDestroy {
  userName = '';
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.userName = user?.name ?? 'Гість';
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
    explanation: `<ul class="list">
      <li><code>currentUser$</code> — довгоживучий стрім (сервіс-singleton), він сам ніколи не завершується (<code>complete</code>), тож підписка живе, доки її явно не скасувати — на відміну від, наприклад, одноразового HTTP-запиту.</li>
      <li>Патерн <code>destroy$</code> + <code>takeUntil</code>: у <code>ngOnDestroy</code> емітимо в <code>destroy$</code>, і <code>takeUntil</code> автоматично відписує всі підписки, підключені через <code>.pipe(takeUntil(this.destroy$))</code> у цьому компоненті — не треба вручну зберігати кожну <code>Subscription</code>.</li>
      <li>Сучасна альтернатива (Angular 16+) — функція <code>takeUntilDestroyed()</code> з <code>@angular/core/rxjs-interop</code>, яка робить те саме без ручного <code>Subject</code>/<code>ngOnDestroy</code>.</li>
    </ul>`,
  },
  {
    id: 'angular-custom-validator',
    title: 'Кастомний валідатор реактивної форми',
    level: 'Middle',
    topic: 'Angular',
    priority: 'low',
    tags: ['ReactiveForms', 'ValidatorFn', 'FormGroup'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>passwordsMatchValidator: ValidatorFn</code> для <code>FormGroup</code> з полями <code>password</code> і <code>confirmPassword</code>: якщо значення різні — помилка <code>passwordMismatch: true</code> на контролі <code>confirmPassword</code>; якщо однакові — помилка знімається (не чіпаючи інші можливі помилки цього контролу, наприклад <code>required</code>).</p>`,
    starterCode: `import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: реалізуй валідатор, який перевіряє, що password === confirmPassword.
export const passwordsMatchValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  return null;
};

// Використання:
// new FormGroup({
//   password: new FormControl(''),
//   confirmPassword: new FormControl(''),
// }, { validators: passwordsMatchValidator });`,
    solution: `export const passwordsMatchValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  if (!password || !confirmPassword) return null;

  const mismatch = password.value !== confirmPassword.value;

  const errors = { ...confirmPassword.errors };
  if (mismatch) {
    errors['passwordMismatch'] = true;
  } else {
    delete errors['passwordMismatch'];
  }
  confirmPassword.setErrors(Object.keys(errors).length ? errors : null);

  return mismatch ? { passwordMismatch: true } : null;
};`,
    explanation: `<ul class="list">
      <li><code>ValidatorFn</code> на рівні <code>FormGroup</code> отримує саму групу (не одне поле) — це дозволяє звіряти значення двох контролів між собою (cross-field validation).</li>
      <li>Валідатор має повертати <code>null</code>, коли все ок, і об'єкт <code>ValidationErrors</code> — коли ні; щоб помилка показувалась саме під полем <code>confirmPassword</code> (а не тільки на групі), її додатково виставляють через <code>confirmPassword.setErrors(...)</code>.</li>
      <li>Важливо не затерти інші можливі помилки контролу (наприклад, <code>Validators.required</code>) — тому <code>errors</code> збирають через spread наявних <code>confirmPassword.errors</code>, а не перезаписують напряму.</li>
      <li>У шаблоні: <code>*ngIf="form.get('confirmPassword')?.errors?.['passwordMismatch']"</code>.</li>
    </ul>`,
  },
  {
    id: 'angular-expression-changed-error',
    title: 'ExpressionChangedAfterItHasBeenCheckedError',
    level: 'Senior',
    topic: 'Angular',
    priority: 'mid',
    tags: ['ChangeDetection', 'lifecycle', 'ngAfterViewInit'],
    prompt: `<p><strong>Проблема:</strong> <code>WidgetComponent</code> рахує <code>isReady</code> у <code>ngAfterViewInit</code> і одразу отримує в dev-режимі <code>ExpressionChangedAfterItHasBeenCheckedError</code>.</p>
      <p><strong>Завдання:</strong> поясни причину помилки і полагодь код (достатньо одного коректного способу).</p>`,
    starterCode: `import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-widget',
  template: \`
    <div #box>Контент</div>
    <p>Готово: {{ isReady }}</p>
  \`,
})
export class WidgetComponent implements AfterViewInit {
  @ViewChild('box') box!: ElementRef<HTMLDivElement>;
  isReady = false;

  ngAfterViewInit() {
    // TODO: у dev-режимі кидає ExpressionChangedAfterItHasBeenCheckedError,
    // бо ми змінюємо стан, який уже "прочитаний" у поточному CD-циклі
    this.isReady = this.box.nativeElement.offsetHeight > 0;
  }
}`,
    solution: `ngAfterViewInit() {
  // відкладаємо зміну в мікротаску — вона потрапить у НАСТУПНИЙ CD-цикл
  Promise.resolve().then(() => {
    this.isReady = this.box.nativeElement.offsetHeight > 0;
  });
}

// Альтернатива — примусово перевірити компонент у тому ж циклі:
// constructor(private cdr: ChangeDetectorRef) {}
// ngAfterViewInit() {
//   this.isReady = this.box.nativeElement.offsetHeight > 0;
//   this.cdr.detectChanges();
// }`,
    explanation: `<ul class="list">
      <li><code>ngAfterViewInit</code> виконується вже <strong>після</strong> того, як Angular перевірив (CD) дерево компонентів у цьому проході. Синхронна зміна забайндженої в шаблоні властивості всередині нього розходиться зі значенням, яке CD щойно «затвердив».</li>
      <li>У dev-режимі Angular робить додатковий контрольний прохід і порівнює значення — розбіжність кидає <code>ExpressionChangedAfterItHasBeenCheckedError</code> (у production цієї помилки не буде, але сам дизайн лишається «неправильним», можливий 1-кадровий visual glitch).</li>
      <li><strong>Фікс 1 (мікротаска):</strong> відкласти зміну через <code>Promise.resolve().then(...)</code> (або <code>setTimeout(0)</code>) — вона відбудеться вже в наступному CD-циклі, без конфлікту з поточним.</li>
      <li><strong>Фікс 2 (детермінований):</strong> викликати <code>this.cdr.detectChanges()</code> одразу після зміни — примусово «дочистити» поточний компонент у тому ж проході, без відкладання.</li>
    </ul>`,
  },
]
