## 1. What is Data Binding?

Data binding is the mechanism that connects:
- **Component class(TypeScript)**
- **Template(HTML)**

it keeps **data and UI in sync**.

Data binding defines how data flows between the component and the view.

## 2. Why Data Binding Exists

Without data binding:

- we manually read DOM values
- we manually update the DOM

With Angular:

- UI updates automatically when data changes
- component state updates automatically from user input


## 3. Types of Data Binding in Angular

Angular has 4 main types:
1. Interpolation
2. Property Binding
3. Event Binding
4. Two-Way Binding

## 4. Interpolation -> `{{}}`

Concept:

Used to display component data in HTML
One-way: Component -> Template

Syntax:

`<h1>{{ title }}</h1>`

Component:

```ts
export class AppComponent {
    title = 'R&D Intern';
}
```


How it Works:

- Angular evaluates the expression inside {{ }}
- converts it to a string
- Renders it in the DOM

Rules:

- Only expressions, not statements
- No Loops, if, assignments

Valid:

```ts
{{ user.name }}
{{ count + 1 }}
{{ isLoggedIn ? 'Yes': 'No' }}
```
Invalid:

```ts
{{ if(a > b) }}
{{ let x = 10 }}
```

## 5. Property Binding -> `[property]`

Concept:

- Binds DOM property to component value
- One-Way: Component -> Template

Syntax:

```html
<img [src]="imageUrl">
<button [disabled]="isDisabled">Click</button>
```

Component:

```ts
export class AppComponent {
    imageUrl = 'logo.png';
    isDisabled = true;
}
export class AppComponent {
```

### Why Not Interpolation Here ? 

Interpolation:

`<img src="{{ imageUrl }}">`

Property binding:

`<img [src]="imageUrl">`

Difference:

- Interpolation sets attribute
- Property binding sets DOM property (correct way)

Use property binding when binding non-string values like boolean, objects, arrays.


## 6. Event Binding -> `(event)`

Concept:

- Handles user actions
- One-way: Template -> Component

Syntax:

```html
<button (click)="onClick()">Click</button>
<input (input)="onInput($event)">
```

Component:

```ts
export class AppComponent {
    onClick(){
        console.log("Button Clicked!");
    }
    onInput(event: Event){
        const value = (event.target as HTMLInputElement).value;
        console.log(value);
    }
}
```

`$event`
- contains the **native DOM event**
- Type depends on event (MouseEvent, KeyboardEvent, etc.)


## 7. Two-Way Binding -> `[()]`

Concept:

- Combines **property + event binding**
- Data flows **both ways**

Syntax:

```ts
<input [(ngModel)]="username">
<p>{{ username }}</p>
```
Component:

```ts
export class AppComponent{
    username='';
}
```

### What's Happening Internally?

```html
<input
      [value]="username">
      (input)="username = $event.target.value">
```

Angular just shortens this.

### Important Requirement

We must impot FormsModule:

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[FormsModule]
})
export class AppModule{}
```

`[(ngModel)]` works only with FormsModule.


## 8. Summary Table

| Type | Syntax | Direction |
|------|--------|-----------|
| Interpolation | `{{ value }}` | Component -> View |
| Property Binding | `[property]` | Component -> View |
| Event Binding | `(event)` | View -> Component |
| Two-Way Binding | `[(ngModel)]` | Both |


## 9. Common Pitfalls

- Using interpolation instead of property binding for booleans
- Forgetting `FormsModule`
- Writing logic inside templates
- overusing two-way binding (bad for large apps)

## 10. Interview Follow Up Questions

1. Difference bw attribute vs property
2. How Angular detects changes (Change Detection)
3. Why two-way binding is discouraged in large apps
4. How reactive forms replace `ngModel`
