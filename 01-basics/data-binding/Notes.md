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

