## 1. What is Routing in Angular

**Routing** allows navigation bw different views/components without reloading the page.

Routing allows navigation bw different views/components **without reloading the page**.

This is what makes Angular a **Single Page Application (SPA)**.

## 2. Why Routing is Needed

Without routing:
- Entire page reloads on navigation
- Bad UX
- Slower Performance

With Angular Router:
- Client Side Navigation
- Faster Transitions
- State preserved

## 3. Angular Router Building Blocks

### Core Concepts:

1. Routes - URL to component mapping
2. RouterModule - Angular routing engine
3. RouterOutlet - Placeholder for rendering components
4. RouterLink - Navigation directive

## 4. Setting Up Basic Routing

### Step 1: Create Routes

```ts
import { NgModule } from `@angular/core`;
import { RouterModule, Routes } from `@angular/router`;
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
```

`forRoot()` is used once in the root module.

### Step 2: Register Routing Module

```ts
@NgModule ({
    imports: [
        BrowserModule,
        AppRoutingModule
    ]
})
export class AppModule {}
```

### Step 3: Add Router Outlet 

```html
<router-outlet></router-outlet>
```

Key Point:

`router-outlet` is where routed components load.
