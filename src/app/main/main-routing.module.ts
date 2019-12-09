import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../@component/home/home.component';
import { DashboardComponent } from '../@component/dashboard/dashboard.component';
import { EmployeeComponent } from '../@component/employee/employee.component';
import { BasicsalaryComponent } from '../@component/payroll/basicsalary/basicsalary.component';
import { PayrollComponent } from '../@component/payroll/payroll/payroll.component';
import { ReportsalaryComponent } from '../@component/payroll/reportsalary/reportsalary.component';
///employee payroll-reports

const routes: Routes = [
  {
    path: '', 
    component:HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'basic-salary', component: BasicsalaryComponent },
      { path: 'payroll', component: PayrollComponent },
      { path: 'payroll-reports', component: ReportsalaryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
