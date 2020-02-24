import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../@component/home/home.component';
import { DashboardComponent } from '../@component/dashboard/dashboard.component';
import { EmployeeComponent } from '../@component/employee/employee.component';
import { BasicsalaryComponent } from '../@component/payroll/basicsalary/basicsalary.component';
import { PayrollComponent } from '../@component/payroll/payroll/payroll.component';
import { ReportsalaryComponent } from '../@component/payroll/reportsalary/reportsalary.component';
import { AssetsComponent } from '../@component/assets/assets.component';
import { CreateEmployerComponent } from '../@component/create-employer/create-employer.component';
import { ReadOneEmployeeComponent } from '../@component/read-one-employee/read-one-employee.component'
import { ContactComponent } from '../@component/contact/contact.component';
import { CreatecontactComponent } from '../@component/createcontact/createcontact.component';
import { UserDashboardComponent } from '../@component/user-dashboard/user-dashboard.component';
import { UserExpenseComponent } from '../@component/user-expense/user-expense.component';
import { UserPayrollComponent } from '../@component/user-payroll/user-payroll.component';
import { UserLeaveComponent } from '../@component/user-leave/user-leave.component';
import { UserProfileComponent } from '../@component/user-profile/user-profile.component';
import { GeneratePayrollComponent } from '../@component/generate-payroll/generate-payroll.component';
import { ReportComponent } from '../@component/report/report.component';
import { PayslipComponent } from '../@component/payroll/payslip/payslip.component';
import { ControlComponent } from '../@component/control/control.component';
import { FinanceComponent } from '../@component/finance/finance.component';
import { CeoComponent } from '../@component/ceo/ceo.component';
import { ApprovalComponent } from '../@component/approval/approval.component';
import { TrainingComponent } from '../@component/setting/training/training.component';
const routes: Routes = [

    {
      path: '',
      component: HomeComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'employee', component: EmployeeComponent },
        { path: 'basic-salary', component: BasicsalaryComponent },
        { path: 'payroll', component: PayrollComponent },
        { path: 'payroll-reports', component: ReportsalaryComponent },
        { path: 'assets', component: AssetsComponent },
        { path: 'assets', component: AssetsComponent },
        { path: 'create-employer', component: CreateEmployerComponent },
        { path: 'read-employer', component: ReadOneEmployeeComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'create-contact', component: CreatecontactComponent },
        { path: 'user-dahboard', component: UserDashboardComponent },
        { path: 'user-expense', component: UserExpenseComponent },
        { path: 'user-payroll', component: UserPayrollComponent },
        { path: 'user-profile', component: UserProfileComponent },
        { path: 'user-leave', component: UserLeaveComponent },
        { path: 'generate-payroll', component: GeneratePayrollComponent },
        { path: 'report', component: ReportComponent },
        { path: 'payslip', component: PayslipComponent },
        { path: 'control', component: ControlComponent },
        { path: 'finance', component: FinanceComponent },
        { path: 'ceo', component: CeoComponent },
        { path: 'Approvals', component: ApprovalComponent },
        { path: 'training', component: TrainingComponent },
        {
          path: 'settings',
          loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)
        },
        { path: 'settings', redirectTo: 'settings/company', pathMatch: 'full' },
      ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
