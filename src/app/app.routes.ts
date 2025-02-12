import { Routes } from '@angular/router'
import { Login } from './pages/login/login.component'

export const routes: Routes = [
  {
    path: '',
    component: Login,
    pathMatch: 'full'
  }
]
