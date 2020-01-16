

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './@component/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', redirectTo: 'main/dashboard', pathMatch: 'full' },
  {
    path: 'main', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  { path: 'main/settings', redirectTo: 'main/settings/company', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }