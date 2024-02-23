import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: ()=> import ('./modules/auth/auth.module').then( m => m.AuthModule) },
  { path: 'admin', 
    loadChildren: ()=> import ('./modules/admin/admin.module').then( m => m.AdminModule), 
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
