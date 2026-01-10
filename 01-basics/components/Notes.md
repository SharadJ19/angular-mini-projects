## 1. What is a Component

A **component** is the **building block of an Angular application**.

A component control a part of the UI using a class, template, and styles.

Every Angular app is a **tree of components**.

## 2. Component Anatomy

## 2.1 Component Parts

A component consists of:

1. Decorator `@Component`
2. Class (business logic)
3. Template(HTML)
4. Styles (CSS)

```ts
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    name = 'Sharad';
}
```

## 2.2 Selector Types

```ts
selector: 'app-user'     // element selector (recommended)
selector: '[app-user]'   // attribute selector
selector: '.app-user'    // class selector
```

Element selectors are preferred for clarity and consistency.

## 3. Component Lifecycle (VERY IMPORTANT)

## Lifecycle Order (Interview Favourite)

1. `constructor`
2. `ngOnChanges`
3. `ngOnInit`
4. `ngDoCheck`
5. `ngAfterContentInit`
6. `ngAfterContentChecked`
7. `ngAfterViewInit`
8. `ngAfterViewChecked`
9. `ngOnDestroy`

## 3.1 `ngOnInit`

```ts
ngOnInit(){
    // API calls
    // Initialization logic
}
```

Use for:

- Fetching data
- Initial setup

## 3.2 `ngOnChanges`

```ts
ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
}
```

Runs when:
- `@Input()` value changes

## 3.3 `ngOnDestroy`

```ts
ngOnDestroy(){
    this.subscription.unsubsribe();
}
```

Use for:
- Cleanup
- Preventing memory leaks

## 4. Component Communication (CRUCIAL)

## 4.1 Parent -> Child (`@Input`)

```ts
Parent -> Child (`@Input`)
```

```html
<app-child [username]="name"></app-child>
```

## 4.2 Child -> Parent (`@Output`)

```ts
@Output() notify = new EventEmitter<string>();

sendData(){
    this.notify.emit('Hello Parent');
}
```

```html
<app-child (notify)="onNotify($event)"></app-child>
```

## 4.3 ViewChild

```ts
@ViewChild('inputRef') input!: ElementRef;
```

Used to:
- Access child component or DOM element

## 5. Component vs Directive vs Pipe

| Feature | Component | Directive | Pipe |
|---------|-----------|-----------|------|
| Template | Yes | No | No |
| DOM Control | Yes | Yes | No |
| Data Transform | No | No | Yes | 


## 6. Smart vs Dumb Components

### Smart (Container)

- Handles logic
- API calls 
- State management

### Dumb (Presentational)

- Only UI
- Uses `@Input` and `@Output`

Dumb components improve reusability and testability.

## 7. Change Detection in Components

### Default Strategy 

- Runs on every event

### OnPush Strategy

```ts
changeDetection: ChangeDetectionStrategy.OnPush
```

Triggers only when:

- `@Input()` reference changes
- Event inside component
- Observable emits

OnPush improves performance by reducing change detection cycles.

## 8. Component Styling

### View Encapsulation

```ts
encapsulation: ViewEncapsulation.Emulated
```

Types:

- Emulated(default)
- None
- ShadowDom

## 9. Common Pitfalls

- Putting logic in template
- Not unsubscribing from observables
- Overusing two-way binding
- Not using OnPush for large apps

## 10. Interview Questions

1. Difference bw constructor and `ngOnInit`
2. Why EventEmitter is not for services
3. When to use OnPush
4. How Angular destroys components
