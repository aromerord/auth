import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: ()=> import ('./modules/auth/auth.module').then( m => m.AuthModule) },
  { path: 'admin', loadChildren: ()=> import ('./modules/admin/admin.module').then( m => m.AdminModule) },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
