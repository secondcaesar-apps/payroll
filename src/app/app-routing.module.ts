import { MainModule } from './main/main.module';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './@component/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', redirectTo: 'main/dashboard', pathMatch: 'full' },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () =>  {return MainModule;},
    data:{preload:true}
  },
  { path: 'main/settings', redirectTo: 'main/settings/company', pathMatch: 'full',data:{preload:true} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
