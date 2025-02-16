import { Routes } from '@angular/router'
import { Login } from './pages/login/login.component'
import { Dashboard } from './pages/dashboard/dashboard.component'

export const routes: Routes = [
  {
    path: '',
    component: Login,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard,
  }
]
