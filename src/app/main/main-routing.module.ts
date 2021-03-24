import { ReadLoanComponent } from './../@component/read-loan/read-loan.component';
import { TimelinelistComponent } from './../@component/timelinelist/timelinelist.component';
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
import { UserProfileComponent } from '../@component/user-profile/user-profile.component';
import { GeneratePayrollComponent } from '../@component/generate-payroll/generate-payroll.component';
import { ReportComponent } from '../@component/report/report.component';
import { PayslipComponent } from '../@component/payroll/payslip/payslip.component';
import { ControlComponent } from '../@component/control/control.component';
import { FinanceComponent } from '../@component/finance/finance.component';
import { CeoComponent } from '../@component/ceo/ceo.component';
import { ApprovalComponent } from '../@component/approval/approval.component';
import { TrainingComponent } from '../@component/setting/training/training.component';
import { TrainingApprovalComponent } from '../@component/training-approval/training-approval.component';
import { LoanComponent } from '../@component/loan/loan.component';
import { LoanApprovalComponent } from '../@component/loan-approval/loan-approval.component';
import { ProcessformComponent } from '../@component/processform/processform.component';
import { UserLeaveComponent } from '../@component/LEAVES/user-leave/user-leave.component';
import { MreportComponent } from '../@component/mreport/mreport.component';
import { LoantimelineComponent } from '../@component/loantimeline/loantimeline.component';
import { EditComponent } from '../@component/edit/edit.component';
import { CreateLeaveTabComponent } from '../@component/LEAVES/create-leave-tab/create-leave-tab.component';
import { LeaveTabComponent } from '../@component/LEAVES/leave-tab/leave-tab.component';
import { LeaveApprovalTabComponent } from '../@component/LEAVES/leave-approval-tab/leave-approval-tab.component';
import { DisplayComponent } from '../@component/display/display.component';
import { SurveyComponent } from '../@component/survey/survey.component';
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
        // { path: 'cl', component: CreateLeaveTabComponent },
        // { path: 'ml', component: LeaveTabComponent },
        // { path: 'al', component: LeaveApprovalTabComponent },
//
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
        { path: 'training-approval', component: TrainingApprovalComponent },
        { path: 'yearlyreport', component: TimelinelistComponent },
        { path: 'loan', component: LoanComponent },
        { path: 'loan-approval', component: ReadLoanComponent },
        { path: 'process/:id/:api/:value', component: ProcessformComponent },
        { path: 'display/:id/:api/:value', component: DisplayComponent },
        { path: 'edit/:id/:api/:value', component: EditComponent },
        { path: 'timeline/:id/:api/:value', component: LoantimelineComponent },
        { path: 'loan-flow', component: LoanApprovalComponent },
        { path: 'survey', component: SurveyComponent },
        //SurveyComponent
        { path: 'mreport/:id', component: MreportComponent },
        {
          path: 'settings',
          loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)
        },
        { path: 'settings', redirectTo: 'settings/company', pathMatch: 'full' },
      ]
  },
]
//MreportComponent
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
