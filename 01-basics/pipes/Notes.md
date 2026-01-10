## 1. What is a Pipe

A **pipe** is used to **transform data in the template** before displaying it.

Pipes transform input data into a desired output format for the view.

Key rule:

- Pipes are **template-only**
- They do not modify original data

## 2. Why Pipes Exist

Without pipes:
- Formatting logic goes into the component
- Templates become messy or unreadable

With pipes:

- Clean templates
- Reusable transformations
- Better separation of concerns

## 3. Pipe Syntax

```ts
{{ value | pipeName }}
```

With parameters:

```ts
{{ value | pipeName:param1:param2 }}
```

## 4. Built-In Pipes

### 4.1 `DatePipe`

```html
{{ today | date:'short' }}
{{ today | date:'dd/MM/yyyy' }}
```

```ts
today = new Date();
```

## 4.2 `UpperCasePipe` and `LowerCasePipe`

```html
{{ name | uppercase }}
{{ name | lowercase }}
```

## 4.3 `CurrencyPipe`

```html
{{ price | currency: 'INR' }}
```

## 4.4 `DecimalPipe`

```html
{{ value | number:'1.2-3' }}
```

## 4.5 `PercentPipe`

```html
{{ completion | percent }}
```

## 4.6 `JsonPipe` (Debugging)

```ts
<pre>{{ user | json }}</pre>
```

JsonPipe is often used for debugging template data.

## 5. Chaining Pipes

```ts
{{ name | lowercase | titlecase }}
```

Execution:

- Left to right

## 6. Pure vs Impure Pipes (VERY IMPORTANT)

### 6.3 Pure Pipes(Default)

Concept: 

- Executes only when **input reference changes**
- High performance

Examples:

- string
- number
- new array reference

```ts 
@Pipe({ name:'myPipe' })
```

Pure pipes run only on reference changes, not internal mutations.

## 6.4 Impure Pipes

Concept:

- Executes on **every change detection cycle**
- Slower

```ts
@Pipe({
    name: 'myPipe',
    pure: false
})
```

Use Cases:

- Filtering arrays
- Sorting lists dynamically

**Impure pipes can cause performance issues**.

## 7. Custom Pipe (Step-By-Step)

### Step 1: Create Pipe

```ts
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name:'shorten'
})

export class ShortenPipe implements PipeTransform {
    transform(value: string, limit: number = 10): string {
        if(!value) return '';
        return value.length > limit ? value.slice(0, limit) + '...' : value;
    }
}
```

### Step 2: Use Pipe

```html
<p>{{ description | shorten:15 }}</p>
```

## 8. Pipes vs Methods in Template

❌ Bad:

```html
<p>{{ getFormatttedDate() }}</p>
```

Why bad: 
- Method runs on every change detection

✅ Good:

```html
<p>{{ date | date:'short' }}</p>
```

Pipes are preferred over template methods for performance reasons.

## 9. Async Pipe (VERY IMPORTANT)

Concept:

- Handles Observables and Promises
- Automatically subscribes and unsubscribes

```html
<p>{{ user$ | async }}</p>
```

```ts
user$ = this.userService.getUsers();
```

Benefits:
- Prevent memory leaks
- Cleaner code

Async pipe handles subscription lifecycle automatically.