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

