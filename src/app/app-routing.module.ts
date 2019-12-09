

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './@component/login/login.component';
const routes: Routes = [
 // { path: '', component: LoginComponent },
  { path: '', redirectTo: 'main/dashboard', pathMatch: 'full' },
  {
    path: 'main', 
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }