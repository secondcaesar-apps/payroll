import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../@component/setting/home/home.component';
import { DepartmentComponent } from '../@component/setting/department/department.component';
import { SalaryComponent } from '../@component/setting/salary/salary.component';
import { CompanyComponent } from '../@component/setting/company/company.component';


const routes: Routes = [
  { path: '', component: HomeComponent,children:[
    { path: 'company', component:CompanyComponent },
    { path: 'department', component:DepartmentComponent },
    { path: 'salary-group', component:SalaryComponent },
  ] },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
