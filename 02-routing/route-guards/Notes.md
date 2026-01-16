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

## 6. CanActivateChild

### Purpose

Protects child routes.
```ts
{ 
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
        { path: 'users', component: UsersComponent},
        { path: 'settings', component: SettingsComponent}
    ]
}
```

Avoid repeating CanActivate on each child route.

## 7. CanDeactivate (Prevent Leaving)

Purpose:
Prevents navigation away from a route.

Use Case:
Unsaved form data

### Step 1: Create Interface

```ts
export interface CanComponentDeactivate {
    canDeactivate: ()=> boolean;
}
```

### Step 2: Guard

```ts
@Injectable({ providedIn: 'root' })
export class UnsavedGuard
    implements CanDeactivate<CanComponentDeactivate> {
        canDeactivate(component:CanComponentDeactivate): boolean {
            return component.canDeactivate()
            ? true
            : confirm('You have unsaved changes. Leave?');
        }
}
```

### Step 3: Component

```ts
canDeactivate(): boolean {
    return !this.isFormDirty;
}
```

### Step 4: Apply

```ts
path: 'edit',
component: EditComponent,
canDeactivate: [UnsavedGuard]
```

## 8. CanLoad (Lazy Loading Protection)

Purpose:
Prevents lazy-loaded modules from loading.

```ts
@Injectable({ providedIn: 'root' })
export class AdminLoadGuard implements CanLoad {

    canLoad(): boolean {
        return this.authService.isAdmin();
    }
}
```

```ts
{
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule),
    canLoad: [AdminLoadGuard]
}
```

CanLoad prevents the module bundle from even downloading.

## 9. Resolve (Data Before Route Load)

Purpose:
Fetches data before component loads.

```ts
@Injectable({ providedIn:'root'})
export class UserResolver implements Resolve<User>{

    resolve(): Observable<User>{
        return this.userService.getUser();
    }
}
```

```ts
{
    path: 'profile',
    component: ProfileComponent,
    resolve: { user: UserResolver }
}
```

Access data:

```ts
this.route.data.subscribe(data=>{
    console.log(data['user']);
});
```

Resolve ensures data is ready before rendering.

## 10. Guard Execution Order

1. CanLoad
2. CanActivate
3. CanActivateChild
4. Resolve
5. Component Init
6. CanDeactivate (on exit)

## 11. Common Pitfalls

- Using CanActivate instead of CanLoad for lazy modules
- Forgetting to return boolean/observable
- Heavy logic inside guards
- API calls without caching

## 12. Interview Rapid Q&A

Q: CanActivate vs CanLoad
A: CanLoad prevents module download, CanActivate blocks navigation

Q: CanDeactivate use case
A: Prevent losing unsaved changes.

Q: Can guards be async
A: Yes, observables and promises.