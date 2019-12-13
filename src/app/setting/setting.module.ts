import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { HomeComponent } from '../@component/setting/home/home.component';
import { DepartmentComponent } from '../@component/setting/department/department.component';
import { SalaryComponent } from '../@component/setting/salary/salary.component';
import { CompanyComponent } from '../@component/setting/company/company.component';
import { SharedModule } from '../@shared/shared/shared.module';
import { SalarySetupComponent } from '../@component/setting/salary-setup/salary-setup.component';
import { ExpenseComponent } from '../@component/setting/expense/expense.component';
import { LeaveComponent } from '../@component/setting/leave/leave.component';
import { SalarycreateComponent } from '../@component/setting/salarycreate/salarycreate.component';
import { RoleComponent } from '../@component/setting/role/role.component';
import { RolecreateComponent } from '../@component/setting/rolecreate/rolecreate.component';


@NgModule({
  declarations: [HomeComponent, DepartmentComponent, SalaryComponent, CompanyComponent, SalarySetupComponent, ExpenseComponent, LeaveComponent, SalarycreateComponent, RoleComponent, RolecreateComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
