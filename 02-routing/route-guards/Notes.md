## 1. What are Route Guards

**Route Guards** control **access to routes**.

Route guards decide whether navigation to or from a route is allowed.

They are used for:

- Authentication
- Authorization
- Preventing accidental navigation
- Lazy-load protection

## 2. Why Route Guards Are Needed

Without guards:

- Anyone can access protected routes via URL
- Unsaved changes can be lost
- Lazy-loading modules can be abused

Guards enforce **business rules at navigation time**.

## 3. Types of Route Guards (Very Important)

1. CanActivate 
2. CanActivateChild
3. CanDeactivate
4. CanLoad
5. Resolve (often grouped with guards)

## 4. CanActivate(Most Common)

### Purpose

Controls **whether a route can be activated**.

### Example Use Case

- User must be logged in to access `/dashboard`


### Step 1: Create Guard

```ts
@Injectable({ providedIn:'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router){}
    canActivate():boolean {
        if(this.authService.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
```

## Step 2: Apply Guard

```ts
{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
}
```

`CanActivate` runs before route activation.

## 5. CanActivate with Observable/Promise

```ts
canActivate(): Observable<boolean>{
    return this.authService.isAuthenticated$;
}
```

Angular waits for:

- boolean
- Observable<boolean>
- Promise<boolean>

