## 1. What is a Directive

A directive is a class that modifies the behavior, appearance, or structure of the DOM.

Directives are instructions in the DOM that tell Angular how to transform or manipulate elements.

## 2. Why Directives Exist

HTML is static. Angular apps are dynamic.

Directives let you:

- Add/ remove elements
- Change style or classes
- Control rendering logic
- Attach custom behavior to DOM elements

## 3. Types of Directives in Angular

Angular has 3 types:

1. Component Directives
2. Structural Directives
3. Attribute Directives

We focus mainly on **Structural** and **Attribute**.

## 4. Component Directive

Concept:

A Component is technically a directive with:

- A template
- Styles
- Logic

```ts
@Component({
    selector:'app-user',
    template: `<h1>User</h1>`
})
export class UserComponent {}
```

Every component is a directive, but not every directive is a component.

## 5. Structure Directives(`*`)

Concept:

Strucutral directive **change the strucutre of the DOM** by:

- Adding elements
- Removing elements
- Replacing elements

Key Feature:

- Prefixed with `*`
- Use `<ng-template>` internally

## 5.1 `*ngIf`

Syntax:

```html
<p *ngIf="isLoggedIn">Welcome</p>
```
Component:

```ts
isLoggedIn = true;
```

## What Angular Actually Does ?

```html
<ng-template [ngIf]="isLoggedIn">
    <p>Welcome</p>
</ng-template>
```

Key Point:

`*ngIf` physically removes elements from the DOM.

## 5.2 `*ngIf` with else

```html
<p *ngIf="isLoggedIn; else loggedOut">Welcome</p>

<ng-template #loggedOut>
    <p>Please login</p>
<ng-template>
```

## 5.3 `*ngFor`

Syntax:

```html
<li *ngFor="let user of users;">
```

Component:

```ts
users = [
    {name: 'A'},
    {name: 'B'}
];
```

Common Variables:

- `index`
- `first`
- `last`
- `even`
- `odd`

`trackBy` (VERY IMPORTANT)

```html
<li *ngFor="let user of users; trackBy: trackById">
```

```ts
trackById(index:number,user:any){
    return user.id;
}
```

`trackBy` improves performance by preventing unnecesarry DOM re-creation.

## 5.4 `*ngSwitch`

```html
<div [ngSwitch]="role">
    <p *ngSwitchCase="'admin'">Admin</p>
    <p *ngSwitchCase="'user'">User</p>
    <p *ngSwitchDefault>Guest</p>
</div>
```

## 6. Attribute Directives

Concept:

Attribute directives change appearance or behavior of an element.

They do **not** remove elements from DOM.


## 6.1 `ngClass`

```html
<div [ngClass]="{ active: isActive, disabled: isDisabled }"></div>
```

```ts
isActive = true;
isDisabled = false;
```

## 6.2 `ngStyle`

```html
<div [ngStyle]="{ color:color, 'font-size.px: size }"></div>
```

## 6.3 Custom Attribute Directive

### step 1: Create Directive

```ts
@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(private el:ElementRef){
        this.el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```

### Usage:

```html
<p appHighlight>Highlighted Text</p>
```
Direct DOM access using ElementRef is discouraged. Prefer Renderer2.

## Using Renderer2 (Correct Way)

```ts
constructor(private el: ElementRef, private renderer: Renderer2){
    this.renderer.setStyle(
        this.el.nativeElement,
        'backgroundColor',
        'yellow'
    );
}
```

## 7. Structural vs Attribute Directives

| Feature | Strucutral | Attribute |
|---------|------------|-----------|
| Changes DOM structure | Yes | No |
| Prefix  | `*` | No |
| Example | `nIf`, `ngFor` | `ngClass`, `ngStyle` |

## Common Pitfalls 

- Multiple strucutral directives on one element
- Forgetting trackBy
- Using `ngIf` instead of CSS hide when DOM reuse is needed
- Direct DOM manipulation without Renderer2

## Interview Follow Up Questions

1. Why only one structural directive per element?
2. Difference bw `ngIf` and `[hidden]`
3. How `*` syntax works internally
4. Why trackBy matters