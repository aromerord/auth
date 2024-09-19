import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { adminGuard } from './core/guards/admin/admin.guard';

export const routes: Routes = [ 
  {
    path: 'registro',
    loadComponent: () => import('./modules/auth/pages/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./modules/profile/pages/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./modules/users/pages/users/users.component').then(c => c.UsersComponent),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];


