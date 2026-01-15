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

## 5. Navigating bw Routes

### 5.1 RouterLink (Preferred)

```html
<a routerLink="/about">About</a>
```

With active class:
```html
<a routerLink="/about" routerLinkActive>About</a>
```

### 5.2 Programmatic Navigation

```ts
constructor(private router: Router){}

goToAbout(){
    this.router.navigate(['/about']);
}
```

Used when navigation depend on logic.

## 6. Route Parameters


### 6.1 Define Route with Param

```ts
{ path: 'user/:id', component: UserComponent }
```

### 6.2 Read Param

```ts
constructor (private route: ActivatedRoute) {}
ngOnInit(){
    this.route.params.subscribe(params=>{
        console.log(params['id']);
    });
}
```

Alternate(snapshot):

```ts
const id = this.route.snapshot.paramMap.get('id');
```

Comparision:
`snapshot` ->  one-time
`params` -> reacts to changes

## 7. Query Parameters

### Navigation

```ts
this.router.navigate(['user'], {
    queryParams: {page:1}
});
```

### Reading

```ts
this.route.queryParams.subscribe(params => 
{
    console.log(params['page']);
});
```

Difference:
Route params are mandatory, query params are optional.

