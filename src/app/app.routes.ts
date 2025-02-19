import { Routes } from '@angular/router'
import { Login } from './pages/login/login.component'
import { Signup } from './pages/signup/signup.component'
import { Dashboard } from './pages/dashboard/dashboard.component'
import { AuthUserGuard } from './guards/auth.user.guard'
import { AuthNonuserGuard } from './guards/auth.nonuser.guard'
import { Database } from './pages/dashboard/database/database.component'
import { Inbox } from './pages/dashboard/inbox/inbox.component'

export const routes: Routes = [
  {
    path: '',
    component: Login,
    canActivate: [AuthNonuserGuard],
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthUserGuard],
    children: [
      { path: 'database', component: Database },
      { path: 'inbox', component: Inbox },
      { path: '**', redirectTo: 'database', pathMatch: 'full' }
    ]
  },
  {
    path: 'register',
    component: Signup,
    canActivate: [AuthNonuserGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
