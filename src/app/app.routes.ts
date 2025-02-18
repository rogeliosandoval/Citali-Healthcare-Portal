import { Routes } from '@angular/router'
import { Login } from './pages/login/login.component'
import { Dashboard } from './pages/dashboard/dashboard.component'
import { Database } from './pages/dashboard/database/database.component'
import { Inbox } from './pages/dashboard/inbox/inbox.component'

export const routes: Routes = [
  {
    path: '',
    component: Login,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: 'database', component: Database },
      { path: 'inbox', component: Inbox },
      { path: '**', redirectTo: 'database', pathMatch: 'full' }
    ]
  }
]
