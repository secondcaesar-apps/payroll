import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../@component/setting/home/home.component';
import { DepartmentComponent } from '../@component/setting/department/department.component';
import { SalaryComponent } from '../@component/setting/salary/salary.component';
import { CompanyComponent } from '../@component/setting/company/company.component';
import { ExpenseComponent } from '../@component/setting/expense/expense.component';
import { LeaveComponent } from '../@component/setting/leave/leave.component';
import { SalarySetupComponent } from '../@component/setting/salary-setup/salary-setup.component';
import { SalarycreateComponent } from '../@component/setting/salarycreate/salarycreate.component';
import { RoleComponent } from '../@component/setting/role/role.component';
import { RolecreateComponent } from '../@component/setting/rolecreate/rolecreate.component';
import { LocationComponent } from '../@component/setting/location/location.component';


const routes: Routes = [
  { path: '', component: HomeComponent,children:[
    { path: 'company', component:CompanyComponent },
    { path: 'department', component:DepartmentComponent },
    { path: 'salary-group', component:SalarySetupComponent},

     { path: 'expense-setup', component:ExpenseComponent },
     { path: 'leave-setup', component:LeaveComponent },
     { path: 'salary-create', component:SalarycreateComponent },
     { path: 'roles', component:RoleComponent },
     { path: 'roles-create', component: RolecreateComponent},
     { path: 'location', component: LocationComponent},
  ] },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
