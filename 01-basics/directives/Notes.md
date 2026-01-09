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